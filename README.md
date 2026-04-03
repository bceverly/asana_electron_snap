# Asana Electron

A lightweight Electron desktop application that wraps the [Asana](https://asana.com) project management web interface into a native desktop experience. Available as a snap package for Linux.

## Features

- Native desktop window for the Asana web application
- Application menu with standard Edit, View, and Navigate functions
- Keyboard shortcuts for navigation (Back, Forward, Home)
- External links open in your default browser
- Asana logo as the application icon

## Prerequisites

The following tools must be installed before building:

- **Node.js** (>= 18) and **npm** -- used to install dependencies and run the Electron app
- **GNU Make** -- used to drive all build, test, and packaging tasks
- **snapcraft** -- required for building the snap package (`sudo snap install snapcraft --classic`)
- **LXD** -- used by snapcraft to build snaps in an isolated container (`sudo snap install lxd && sudo lxd init --auto`)

On Ubuntu/Debian, Node.js and npm can be installed with:

```sh
sudo apt install nodejs npm
```

## Makefile Targets

| Target | Description |
|---|---|
| `make` | Install Node.js dependencies (equivalent to `make build`) |
| `make build` | Install Node.js dependencies |
| `make run` | Launch the Electron app locally for development |
| `make test` | Run the unit test suite |
| `make clean` | Remove `node_modules/` |
| `make snap` | Build the Electron app with electron-builder, then package it as a snap |
| `make snap-install` | Install the locally-built snap with `--dangerous` (unsigned) |
| `make snap-remove` | Uninstall the snap |
| `make snap-clean` | Remove all snap build artifacts (`dist/`, `snap/.snapcraft/`, `*.snap`) |

## Quick Start

Build and run locally:

```sh
make
make run
```

## Running the Tests

```sh
make test
```

The test suite verifies package configuration, module exports, license, and the presence of required project files.

## Building and Installing the Snap

```sh
make snap
make snap-install
```

The snap is built inside an LXD container via snapcraft. The resulting `.snap` file is installed locally with `--dangerous` since it is not signed by the Snap Store.

To uninstall:

```sh
make snap-remove
```

To clean up all snap build artifacts:

```sh
make snap-clean
```

## Troubleshooting

### Electron SUID Sandbox Error

If `make run` fails with a SUID sandbox error, fix the chrome-sandbox permissions:

```sh
sudo chown root:root node_modules/electron/dist/chrome-sandbox
sudo chmod 4755 node_modules/electron/dist/chrome-sandbox
```

### LXD Container Networking Timeout

If `make snap` fails with "Timed out waiting for networking to be ready", VPN or firewall software (e.g. NordLayer) may be adding nftables rules that block LXD bridge traffic. A helper script is provided:

```sh
./fix-lxd.sh
```

This script flushes conflicting nftables rules, cleans up stale LXD containers, and restarts LXD. You may need to re-run it after reconnecting to a VPN.

## Author

Bryan Everly

## License

This project is licensed under the GNU General Public License v3. See [LICENSE](LICENSE) for the full license text.
