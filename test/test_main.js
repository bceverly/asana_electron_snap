/*
 * Asana Electron - Tests
 * Copyright (C) 2026  Bryan Everly
 *
 * Licensed under the GNU General Public License v3.
 */

const { expect } = require('chai');
const path = require('path');
const fs = require('fs');

describe('Asana Electron', function () {

  describe('Package configuration', function () {
    let pkg;

    before(function () {
      pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
    });

    it('should have the correct application name', function () {
      expect(pkg.name).to.equal('asana-electron');
    });

    it('should specify main.js as the entry point', function () {
      expect(pkg.main).to.equal('main.js');
    });

    it('should have a GPL-3.0-only license', function () {
      expect(pkg.license).to.equal('GPL-3.0-only');
    });

    it('should list electron as a dev dependency', function () {
      expect(pkg.devDependencies).to.have.property('electron');
    });

    it('should have a start script that runs electron', function () {
      expect(pkg.scripts.start).to.include('electron');
    });
  });

  describe('Main process module', function () {
    let mainModule;

    before(function () {
      // Mock electron so we can require main.js without launching a window
      const mockElectron = {
        app: {
          on: function () {},
          quit: function () {}
        },
        BrowserWindow: function () {
          return {
            loadURL: function () {},
            on: function () {},
            webContents: {
              setWindowOpenHandler: function () {}
            }
          };
        },
        Menu: {
          buildFromTemplate: function () { return {}; },
          setApplicationMenu: function () {}
        },
        shell: {
          openExternal: function () {}
        }
      };

      // Inject mock into require cache
      require.cache[require.resolve('electron')] = {
        id: require.resolve('electron'),
        filename: require.resolve('electron'),
        loaded: true,
        exports: mockElectron
      };

      mainModule = require('../main');
    });

    it('should export the Asana URL', function () {
      expect(mainModule.ASANA_URL).to.equal('https://app.asana.com');
    });

    it('should export a createWindow function', function () {
      expect(mainModule.createWindow).to.be.a('function');
    });
  });

  describe('Project files', function () {
    it('should have a LICENSE file', function () {
      const exists = fs.existsSync(path.join(__dirname, '..', 'LICENSE'));
      expect(exists).to.be.true;
    });

    it('should have a README.md file', function () {
      const exists = fs.existsSync(path.join(__dirname, '..', 'README.md'));
      expect(exists).to.be.true;
    });

    it('should have a Makefile', function () {
      const exists = fs.existsSync(path.join(__dirname, '..', 'Makefile'));
      expect(exists).to.be.true;
    });

    it('should have a main.js entry point', function () {
      const exists = fs.existsSync(path.join(__dirname, '..', 'main.js'));
      expect(exists).to.be.true;
    });
  });
});
