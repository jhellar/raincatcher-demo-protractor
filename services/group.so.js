var pageObject = require('../pages/group');

var ngp = pageObject.new;
var mgp = pageObject.main;
var sgp = pageObject.selected;

var utils = require('../utils');
var BaseService = require('./base.so');

var _ = require('lodash');

function GroupService() {
  pageObject.new.locators.itemForm = pageObject.new.locators.groupForm;
  BaseService.call(this, pageObject);
}

utils.object.inherit(GroupService, BaseService);

/**
 * Clear specific fields on Group Form
 */
GroupService.prototype.clearOtherFields = _.noop;
/**
 * Search group in groups list
 * @param {*} group to be searched
 */
GroupService.prototype.searchForItem = function(group, count) {
  return mgp.commands.search(group.name)
    .then(() => mgp.commands.count())
    .then((c) => utils.expect.resultIsEquelTo(c, count));
};

/**
 * Check if all fields of Group Form are present
 */
GroupService.prototype.expectFieldsPresent = function() {
  ngp.locators.groupForm.self.isPresent()
  .then((result) => {
    utils.expect.resultIsTrue(result);
    return utils.promise.all(ngp.locators.groupForm.fields, x => x.isPresent());
  })
  .then((results) => { // fields present
    utils.expect.eachResultsIsTrue(results);
    return utils.promise.all(ngp.locators.groupForm.dropdowns, x => x.isPresent());
  })
  .then((results) => utils.expect.eachResultsIsTrue(results)); // dropdowns present
};

/**
 * Compare actual group details with expected
 * @param {*} group to be compared to
 */
GroupService.prototype.expectDetailsToBe = function(group) {
  sgp.commands.getDetails()
  .then((details) => {
    var name = sgp.commands.getName(details);
    utils.expect.resultIsEquelTo(name.h3, group.name);
    var role = sgp.commands.getRole(details);
    utils.expect.resultIsEquelTo(role.h3, _.toLower(group.role));
    // sgp.commands.getMembers() // TODO implement members check
    // .then(function(members) {
    //   utils.expect.resultIsEquelTo(members, group.members);
    // });
  });
};

GroupService.prototype.expectElementInfo = function(group) {
  sgp.locators.groupHeader.isPresent()
  .then((result) => {
    utils.expect.resultIsTrue(result);
    return sgp.locators.groupHeader.getText();
  })
  .then((result) => utils.expect.resultIsEquelTo(result, group.name + ' Group'));
};

GroupService.prototype.expectElementDetails = function(promise, expected, expectFunc) {
  return promise
  .then((elem) => mgp.commands.getName(elem))
  .then(function(result) {
    expectFunc(result, expected.name);
  });
};

GroupService.prototype.verifyWorkerInList = function(params) { // TODO replace with protractor
  expect(
    element(by.xpath('//group/md-toolbar/div/h3[contains(text(),"Members")]')).isPresent())
    .eventually.to.be.true;
  expect(
    element(by.xpath('//group/md-list/md-list-item/button/div/div/h3[contains(text(),"' + params.name + '")]')).isPresent())
    .eventually.to.be.true;
  expect(
    element(by.xpath('//group/md-list/md-list-item/button/div/div/p[contains(text(),"' + params.position + '")]')).isPresent())
    .eventually.to.be.true;
};

GroupService.prototype.verifyWorkerNotInList = function(params) { // TODO replace with protractor
  expect(
    element(by.xpath('//group/md-toolbar/div/h3[contains(text(),"Members")]')).isPresent())
    .eventually.to.be.true;
  expect(
    element(by.xpath('//group/md-list/md-list-item/button/div/div/h3[contains(text(),"' + params.name + '")]')).isPresent())
    .eventually.to.be.false;
  expect(
    element(by.xpath('//group/md-list/md-list-item/button/div/div/p[contains(text(),"' + params.position + '")]')).isPresent())
    .eventually.to.be.false;
};

module.exports = GroupService;