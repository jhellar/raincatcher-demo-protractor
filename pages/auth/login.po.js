var consts = require('../../utils/constants');
var utils = require('../../utils/utils');

var LoginPage = function() {

  var locators = {
    fields: {
      usernameField: element(by.model('ctrl.username')),
      passwordField: element(by.model('ctrl.password')),
    },
    logoutButton: element(by.css('button[aria-label="Log in"]')),
    pageText: {
      heading: element(by.css('h1.md-headline')),
      infoMessage: element(by.css('p.md-body-1'))
    },
    warnings: {
      usernameWarningMessage: element(by.css('[ng-messages="loginForm.username.$error"]')),
      passwordWarningMessage: element(by.css('[ng-messages="loginForm.password.$error"]')),
      incorrectDetailsMessage: element(by.css('div[ng-message="error"]'))
    }
  };

  var commands = {
    navigate: function() {
      return browser.get(consts.HASH + consts.login.URL);
    },
    selfCheck: function() {
      return browser.getLocationAbsUrl().then(function(result) {
        utils.expectResultIsEquelTo(result, consts.login.URL);
        return locators.fields.usernameField.isPresent();
      }).then(function(result) {
        utils.expectResultIsTrue(result);
        return locators.fields.passwordField.isPresent();
      }).then(function(result) {
        utils.expectResultIsTrue(result);
        return locators.logoutButton.isPresent();
      }).then(function(result) {
        utils.expectResultIsTrue(result);
      });
    },
    clickLoginButton: function() {
      locators.logoutButton.click();
    },
    enterUsername: function(username) {
      locators.fields.usernameField.clear().sendKeys(username);
    },
    enterPassword: function(password) {
      locators.fields.passwordField.clear().sendKeys(password);
    },
    checkIncorrectDetailsMessage: function() {
      return locators.warnings.incorrectDetailsMessage.isPresent().then(function(result) {
        utils.expectResultIsTrue(result);
        return locators.warnings.incorrectDetailsMessage.getText().then(function(result) {
          utils.expectResultIsEquelTo(result, consts.login.AUTH_FAIL_MSG);
        });
      });
    },
    checkUsernameWarningMessage: function() {
      return locators.warnings.usernameWarningMessage.isPresent().then(function(result) {
        utils.expectResultIsTrue(result);
        return locators.warnings.usernameWarningMessage.getText().then(function(result) {
          utils.expectResultIsEquelTo(result, consts.login.USERNAME_MISSING_MSG);
        });
      });
    },
    checkPasswordWarningMessage: function() {
      return locators.warnings.passwordWarningMessage.isPresent().then(function(result) {
        utils.expectResultIsTrue(result);
        return locators.warnings.passwordWarningMessage.getText().then(function(result) {
          utils.expectResultIsEquelTo(result, consts.login.PASSWORD_MISSING_MSG);
        });
      });
    }
  };

  return {
    locators, commands
  };
};

module.exports = LoginPage();