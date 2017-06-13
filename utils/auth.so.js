var pageObject = require('../pages/auth');
var loginPage = pageObject.login;
var schedulerPage = pageObject.scheduler;
var logoutPage = pageObject.logout;
var navigationTab = pageObject.navigate;
var cwp = require('../pages/worker/new.po');
var mwp = require('../pages/worker/main.po');

var WorkerService = require('./worker.so');
var workerService = new WorkerService();

var utils = require('./utils');
var _ = require('lodash');

/**
 * Service that is used to allow for testing of authentication to the raincatcher
 * demo cloud app
 * @constructor
 */
function AuthService() {

}


/**
 * Used to open the portal app in the browser and navigate to the portal login page
 * @return {*} navigates to the login page of portal
 */
AuthService.prototype.openPortal = function() {
  loginPage.commands.navigate();
  var progress = 'md-progress-circular';
  utils.waitNotPresent(progress);
  loginPage.commands.selfCheck();
};

/**
 * Used to perform the login action to the portal
 * @param  {string} username - users username
 * @param  {string} password - users password
 * @return {*} logs into portal
 */
AuthService.prototype.loginPortal = function(username, password) {
  if (username !== "") {
    loginPage.commands.enterUsername(username);
  }
  if (password !== "") {
    loginPage.commands.enterPassword(password);
  }
  loginPage.commands.clickLoginButton();
};

/**
 * Used to check whether login to the portal app was successful
 * @return {*} checks that portal login was successful
 */
AuthService.prototype.checkPortalLoginWasSuccessful = function() {
  utils.waitUntilPresent(schedulerPage.locators.header, 5000);
  schedulerPage.commands.selfCheck();
};

AuthService.prototype.confirmUserAuthneticationError = function() {
  loginPage.commands.checkIncorrectDetailsMessage();
};

/**
 * Used to check that the username required message is shown when a user tries
 * to login without entering a username
 * @return {*} checks that error message is displayed
 */
AuthService.prototype.confirmUsernameMissingError = function() {
  loginPage.commands.checkUsernameWarningMessage();
};

/**
 * Used to check that the password required message is shown when a user tries
 * to login without entering a password
 * @return {*} checks that error message is displayed
 */
AuthService.prototype.confirmPasswordMissingError = function() {
  loginPage.commands.checkPasswordWarningMessage();
};

/**
 * Used to open the the workers user settings
 * @return {*} opens worker settings page
 */
AuthService.prototype.openPortalUserSettings = function(userFullName) {
  workerService.open({ name: userFullName });
  return mwp.locators.editButton.isPresent().then(function(result) {
    utils.expectResultIsTrue(result);
  });
};

/**
 *
 * @returns {Promise<R>}
 */
AuthService.prototype.openUserUpdateScreen = function() {
  return mwp.locators.editButton.isPresent().then(function(result) {
    utils.expectResultIsTrue(result);
    return mwp.locators.editButton.click().then(function(result) {
      utils.expectResultIsNull(result);
      return cwp.locators.workerForm.buttons.update.isPresent().then(function(result) {
        utils.expectResultIsTrue(result);
      });
    });
  });
};

/**
 * Used to change the users password of a worker
 * @param  {String} newPassword The new password of the user
 * @return {*}      changes user password
 */
AuthService.prototype.changeUserPassword = function(newPassword) { // this method is broken
  return cwp.locators.workerForm.fields.password.sendKeys(newPassword).then(function(result) {
    utils.expectResultIsNull(result);
    return cwp.locators.workerForm.buttons.update.isPresent().then(function(result) {
      utils.expectResultIsTrue(result);
      return cwp.locators.workerForm.buttons.update.click().then(function(result) {
        utils.expectResultIsNull(result);
        return mwp.locators.editButton.isPresent().then(function(result) {
          utils.expectResultIsTrue(result);
        });
      });
    });
  });
};

/**
 * [openClient description]
 * @type {[type]}
 */
AuthService.prototype.openClient = _.noop;

/**
 * [loginClient description]
 * @type {[type]}
 */
AuthService.prototype.loginClient = _.noop;

/**
 * [checkClientLoginWasSuccessful description]
 * @type {[type]}
 */
AuthService.prototype.checkClientLoginWasSuccessful = _.noop;

/**
 * Used to navigate to the logout page
 * @return {*} navigates to the portal logout page
 */
AuthService.prototype.navigateToPortalLogoutPage = function() {
  navigationTab.navigateTo.logoutPage();
  utils.waitUntilPresent(logoutPage.locators.logoutButton);
  logoutPage.commands.selfCheck();
};

/**
 * Used to log out of the portal
 * @return {*} logos out of the portal
 */
AuthService.prototype.logoutOfPortal = function() {
  logoutPage.commands.logout();
};

/**
 * Used to check if logout operation was successful
 * @return {*} checks logout was successful
 */
AuthService.prototype.checkPortalLogoutWasSuccessful = function() {
  utils.waitUntilPresent(loginPage.locators.fields.usernameField);
  loginPage.commands.selfCheck();
};

/**
 * [logoutOfClient description]
 * @type {[type]}
 */
AuthService.prototype.logoutOfClient = _.noop;

/**
 * [checkClientLogoutWasSuccessful description]
 * @type {[type]}
 */
AuthService.prototype.checkClientLogoutWasSuccessful = _.noop;

module.exports = AuthService;