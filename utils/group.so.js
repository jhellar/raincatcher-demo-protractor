var pageObject = require('../pages/group');

var ngp = pageObject.new;
var mgp = pageObject.main;
var sgp = pageObject.selected;

var utils = require('../utils/utils');
var BaseService = require('../utils/base.so');

var _ = require('lodash');

function GroupService() {
  pageObject.new.locators.itemForm = pageObject.new.locators.groupForm;
  BaseService.call(this, pageObject);
}

utils.inherit(GroupService, BaseService);

/**
 * Clear specific fields on Group Form
 */
GroupService.prototype.clearOtherFields = _.noop;
/**
 * Search group in groups list
 * @param {*} group to be searched
 */
GroupService.prototype.searchForItem = function(group, count) {
  return mgp.commands.search(group.name).then(function() {
    mgp.commands.count().then(function(c) {
      utils.expectResultIsEquelTo(c, count);
    });
  });
};

/**
 * Check if all fields of Group Form are present
 */
GroupService.prototype.expectFieldsPresent = function() {
  var isPresent = function(x) {
    return x.isPresent();
  };
  isPresent(ngp.locators.groupForm.self).then(function(result) {
    utils.expectResultIsTrue(result);
    return utils.returnAllPromises(ngp.locators.groupForm.fields, isPresent);
  }).then(function(results) { // fields present
    utils.expectEachResultsIsTrue(results);
    return utils.returnAllPromises(ngp.locators.groupForm.dropdowns, isPresent);
  }).then(function(results) { // dropdowns present
    utils.expectEachResultsIsTrue(results);
  });
};

/**
 * Compare actual group details with expected
 * @param {*} group to be compared to
 */
GroupService.prototype.expectDetailsToBe = function(group) {
  sgp.commands.getDetails()
  .then(function(details) {
    var name = sgp.commands.getName(details);
    utils.expectResultIsEquelTo(name.h3, group.name);
    var role = sgp.commands.getRole(details);
    utils.expectResultIsEquelTo(role.h3, _.toLower(group.role));
    // sgp.commands.getMembers() // TODO implement members check
    // .then(function(members) {
    //   utils.expectResultIsEquelTo(members, group.members);
    // });
  });
};

GroupService.prototype.expectElementInfo = function(group) {
  sgp.locators.groupHeader.isPresent().then(function(result) {
    utils.expectResultIsTrue(result);
    return sgp.locators.groupHeader.getText();
  }).then(function(result) {
    utils.expectResultIsEquelTo(result, group.name + ' Group');
  });
};

GroupService.prototype.expectElementDetails = function(promise, expected, expectFunc) {
  promise.then(function(elem) {
    mgp.commands.getName(elem).then(function(result) {
      expectFunc(result, expected.name);
    });
  });
};

GroupService.prototype.verifyWorkerInList = function(params) {
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

GroupService.prototype.verifyWorkerNotInList = function(params) {
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