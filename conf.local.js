var env = require('./environment.js');
// Default local ports for Demo Apps
var portalAppDefaultPort = 9003;
var cloudAppDefaultPort = 8001;

exports.config = {
  allScriptsTimeout: env.allScriptsTimeout,
  baseUrl: // main URL for your Portal application under test
  'http://' + (process.env.PORTAL_URL || 'localhost') +
  ':' + (process.env.PORTAL_PORT || portalAppDefaultPort) +
  '/?url=http://' + (process.env.CLOUD_URL || 'localhost') +
  ':' + (process.env.CLOUD_PORT || cloudAppDefaultPort),

  capabilities: env.capabilities,

  framework: 'mocha',
  // spec patterns are relative to this directory.
  specs: [
    'tests/*.spec.js'
  ],

  mochaOpts: {
    ui: 'bdd',
    reporter: 'spec',
    slow: env.slowThreshold,
    timeout: env.mochaTimeout,
    bail: true,
    watch: true,
    require: require('mocha-steps')
  },

  onPrepare: function setup() {
    return browser.driver.executeScript(function() {
      window.sessionStorage.clear();
      window.localStorage.clear();
      return {
        width: window.screen.availWidth,
        height: window.screen.availHeight,
      };
    }).then(function(result) {
      console.log('Browser Max Window Size', result);
      // browser.driver.manage().window().maximize();
      browser.driver.manage().window().setSize(result.width, result.height);
    }).then(function() { // setup expect as global
      var chai = require('chai');
      var chaiAsPromised = require('chai-as-promised');
      chai.use(chaiAsPromised);
      global.expect = chai.expect;
    });
  }
};
