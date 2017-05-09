var lop = require('../pages/login.po');
var scp = require('../pages/scheduler.po');

var cwp = require('../pages/worker/new.po');
var mwp = require('../pages/worker/main.po');

var WorkerService = require('../utils/worker.so');
var workerService = new WorkerService();

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

var utils = require('../utils/utils');

describe('Login into Portal App', function() {

  before('navigate to login page', function() {
    lop.commands.navigate();
    var progress = 'md-progress-circular';
    utils.waitNotPresent(progress);
  });
  it('login with wrong password', function() {
    lop.commands.selfCheck();
    lop.commands.login('daisy', 'xxx');
  });
  it('login error message visible', function() {
    utils.waitPresent(lop.selectors.loginErrorMessage);
    lop.commands.errMsgDisplayed();
  });
  it('login with correct password', function() {
    lop.commands.selfCheck();
    lop.commands.login('daisy', '123');
  });
  it('scheduler page is displayed', function() {
    utils.waitNotPresent(lop.selectors.logoutButton);
    scp.commands.selfCheck();
  });
  it('open user settings', function() {
    workerService.open({ name: 'Daisy Dialer' });
    expect(mwp.locators.editButton.isPresent()).eventually.to.be.true;
  });
  it('change user password', function() {
    mwp.locators.editButton.click();
    cwp.commands.changePassword('daisy');
    // cwp.locators.updateButton.click(); // BUG should be Update Button
    cwp.locators.createButton.click();
  });
  it('logout from portal', function() {
    lop.commands.logout();
    lop.commands.selfCheck();
  });
  it('login with new password', function() {
    lop.commands.login('daisy', 'daisy');
  });
  it('scheduler page is displayed', function() {
    utils.waitNotPresent(lop.selectors.logoutButton);
    scp.commands.selfCheck();
  });
  it('logout from portal', function() {
    lop.commands.logout();
    lop.commands.selfCheck();
  });
  it('login with old password', function() {
    lop.commands.login('daisy', '123');
  });
  it('login error message visible', function() {
    utils.waitPresent(lop.selectors.loginErrorMessage);
    lop.commands.errMsgDisplayed();
  });
});