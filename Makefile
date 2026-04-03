NPM ?= npm
NODE_MODULES = node_modules
SNAP_NAME = asana-electron

all: build

$(NODE_MODULES): package.json
	$(NPM) install
	@touch $(NODE_MODULES)

build: $(NODE_MODULES)

run: $(NODE_MODULES)
	$(NPM) start

test: $(NODE_MODULES)
	$(NPM) test

clean:
	rm -rf $(NODE_MODULES)

snap: build
	npx electron-builder --linux dir
	snapcraft pack

snap-install:
	sudo snap install --dangerous $(SNAP_NAME)_*.snap

snap-remove:
	sudo snap remove $(SNAP_NAME)

snap-clean:
	snapcraft clean 2>/dev/null; true
	rm -f $(SNAP_NAME)_*.snap
	rm -rf snap/.snapcraft dist

.PHONY: all build run test clean snap snap-install snap-remove snap-clean
