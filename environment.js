module.exports = {
  // The address of a running selenium server.
  seleniumAddress:
  (process.env.SELENIUM_URL || 'http://localhost:4444/wd/hub'),

  allScriptsTimeout: 20000,
  slowThreshold: 5000,
  mochaTimeout: 60000,
  defaultPageLoadTimeout: 10000,
  defaultImplicitWait: 2000,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName':
    (process.env.TEST_BROWSER_NAME || 'chrome'),
    'version':
    (process.env.TEST_BROWSER_VERSION || 'ANY'),
    'chromeOptions': {
      prefs: {
        'credentials_enable_service': false,
        'profile': {
          'password_manager_enabled': false
        }
      },
      args: [
        'no-sandbox',
        'user-data-dir=/tmp/chrome',
        'no-default-browser-check',
        'unlimited-storage',
        'disable-cache',
        'disable-application-cache',
        'disable-offline-load-stale-cache',
        'disk-cache-size=0',
        'v8-cache-options=off'
      ],
    }
  },

  // Protractor interactive tests
  interactiveTestPort: 6969
};
