var pageObject = require('../pages/worker');

var nwp = pageObject.new;
var mwp = pageObject.main;
var swp = pageObject.selected;

var utils = require('../utils/utils');
var BaseService = require('./base.so');

var _ = require('lodash');

function WorkerService() {
  pageObject.new.locators.itemForm = pageObject.new.locators.workerForm;
  BaseService.call(this, pageObject);
}

utils.inherit(WorkerService, BaseService);

/**
 * Clear specific fields on Item Form
 */
WorkerService.prototype.clearOtherFields = _.noop;

/**
 * TODO this is with using search input
 * Search worker in workers list
 * @param {*} worker to be searched
 */
WorkerService.prototype.searchForItem = function(worker, count) {
  return mwp.commands.search(worker.name)
  .then(() => mwp.commands.count())
  .then((c) => utils.expectResultIsEquelTo(c, count));
};

/**
 * Check if all fields of Worker Form are present
 */
WorkerService.prototype.expectFieldsPresent = function() {
  return nwp.locators.workerForm.self.isPresent()
  .then((result) => {
    utils.expectResultIsTrue(result);
    return utils.returnAllPromises(nwp.locators.workerForm.fields, x => x.isPresent());
  })
  .then((results) => { // fields present
    utils.expectEachResultsIsTrue(results);
    return utils.returnAllPromises(nwp.locators.workerForm.dropdowns, x => x.isPresent());
  })
  .then((results) => utils.expectEachResultsIsTrue(results)); // dropdowns present
};

/**
 * Compare actual worker details with expected
 * @param {*} worker to be compared to
 */
WorkerService.prototype.expectDetailsToBe = function(worker) {
  return swp.commands.getDetails()
  .then((details) => {
    var username = swp.commands.getUsername(details);
    utils.expectResultIsEquelTo(username.h3, worker.username);
    var phoneNumber = swp.commands.getPhoneNumber(details);
    utils.expectResultIsEquelTo(phoneNumber.h3, worker.phonenumber);
    var email = swp.commands.getEmail(details);
    utils.expectResultIsEquelTo(email.h3, worker.email);
    var position = swp.commands.getPosition(details);
    utils.expectResultIsEquelTo(position.h3, worker.position);
    var group = swp.commands.getGroup(details);
    utils.expectResultIsEquelTo(group.h3, worker.group);
    // swp.commands.getNotes() // TODO add notes check
    // .then(function(notes) {
    //   utils.expectResultIsEquelTo(notes, worker.notes);
    // });
  });
};

WorkerService.prototype.expectElementInfo = function(worker) {
  return swp.locators.workerHeader.isPresent()
  .then((result) => {
    utils.expectResultIsTrue(result);
    return swp.locators.workerHeader.getText();
  })
  .then((result) => utils.expectResultIsEquelTo(result, 'Worker : ' + worker.name));
};

WorkerService.prototype.expectElementDetails = function(promise, expected, expectFunc) {
  return promise.then((elem) => {
    return Promise.all([
      mwp.commands.getFullName(elem)
      .then((result) => expectFunc(result, expected.name)),
      mwp.commands.getPosition(elem)
      .then((result) => expectFunc(result, expected.position))
    ]);
  });
};

WorkerService.prototype.verifyWorkorderInList = function(worker, workorder) { // TODO replace with protractor
  this.open(worker);
  swp.commands.openWorkordersPage();
  expect(
    element(by.xpath('//md-tab-content/div/md-content/md-list/md-list-item/button/div/div/h4[contains(text(),"' + workorder.title + '")]')).isPresent())
    .eventually.to.be.true;
  expect(
    element(by.xpath('//md-tab-content/div/md-content/md-list/md-list-item/button/div/div/p[contains(text(),"' + workorder.address + '")]')).isPresent())
    .eventually.to.be.true;
};

WorkerService.prototype.verifyWorkorderNotInList = function(worker, workorder) { // TODO replace with protractor
  this.open(worker);
  swp.commands.openWorkordersPage();
  expect(
    element(by.xpath('//md-tab-content/div/md-content/md-list/md-list-item/button/div/div/h4[contains(text(),"' + workorder.title + '")]')).isPresent())
    .eventually.to.be.false;
  expect(
    element(by.xpath('//md-tab-content/div/md-content/md-list/md-list-item/button/div/div/p[contains(text(),"' + workorder.address + '")]')).isPresent())
    .eventually.to.be.false;
};

module.exports = WorkerService;