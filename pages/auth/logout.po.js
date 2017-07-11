var consts = require('../../utils/constants');
var utils = require('../../utils');

var LogoutPage = function() {
  var locators = {
    logoutButton: element(by.css('button[aria-label="Log out"]')),
    infoMessage: element(by.css('p.md-body-1')),
  };
  var commands = {
    selfCheck: function() {
      return browser.getLocationAbsUrl().then(function(result) {
        utils.expect.resultIsEquelTo(result, consts.logout.URL);
        return locators.logoutButton.isPresent();
      }).then(function(result) {
        utils.expect.resultIsTrue(result);
        return locators.infoMessage.isPresent();
      }).then(function(result) {
        utils.expect.resultIsTrue(result);
      });
    },
    logout: function() {
      locators.logoutButton.click();
    }
  };

  return {
    locators, commands
  };
};

module.exports = LogoutPage();
