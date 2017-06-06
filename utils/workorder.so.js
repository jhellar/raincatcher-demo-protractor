var pageObject = require('../pages/workorder');

var nwp = pageObject.new;
var mwp = pageObject.main;
var swp = pageObject.selected;

var utils = require('../utils/utils');
var BaseService = require('../utils/base.so');

var _ = require('lodash');

function WorkorderService() {
  pageObject.new.locators.itemForm = pageObject.new.locators.workorderForm;
  BaseService.call(this, pageObject);
}

utils.inherit(WorkorderService, BaseService);

/**
 * Select dropdowns from workorder form
 * @param {*} workorder details to be selected
 */
WorkorderService.prototype.selectDropdowns = function(workorder) {
  // TODO workorder type is default now
  // expect($('#workorderType')).isPresent().eventually.to.be.true;
  var workflow = element(by.xpath("//md-select-menu/md-content/md-option/div[contains(text(),'- " + workorder.workflow + "')]"));
  var assignee = element(by.xpath("//md-select-menu/md-content/md-option/div[starts-with(text(),'" + workorder.assignee + "')]"));
  var clickable = element(by.css('.md-select-menu-container.md-active'));

  nwp.locators.workorderForm.dropdowns.workflow.isPresent().then(function(result) {
    utils.expectResultIsTrue(result);
    nwp.locators.workorderForm.dropdowns.workflow.click();
  }).then(function() {
    return workflow.isPresent();
  }).then(function(result) {
    utils.expectResultIsTrue(result);
    utils.waitUntilClickable(clickable);
    workflow.click();
  }).then(function() {
    return nwp.locators.workorderForm.dropdowns.assignee.isPresent();
  }).then(function(result) {
    utils.expectResultIsTrue(result);
    nwp.locators.workorderForm.dropdowns.assignee.click();
  }).then(function() {
    return assignee.isPresent();
  }).then(function(result) {
    utils.expectResultIsTrue(result);
    utils.waitUntilClickable(clickable);
    assignee.click();
  });
};

/**
 * Fill workorder details into fields
 * @param {*} workorder to be created
 */
WorkorderService.prototype.fillInTheFields = function(workorder) {
  nwp.locators.workorderForm.self.isPresent().then(function(result) {
    utils.expectResultIsTrue(result);
    nwp.commands.enterTitle(workorder.title);
  }).then(function() {
    nwp.commands.enterAddress(workorder.address);
  }).then(function() {
    nwp.commands.enterLatitute(workorder.latitude);
  }).then(function() {
    nwp.commands.enterLongitude(workorder.longitude);
  }).then(function() {
  //   nwp.commands.enterStartDate(workorder.startDate); // TODO
  // }).then(function() {
  //   nwp.commands.enterStartTime(workorder.startTime); // TODO
  // }).then(function() {
    nwp.commands.enterFinishDate(workorder.finishDate);
  }).then(function() {
    nwp.commands.enterFinishTime(workorder.finishTime);
  }).then(function() {
    nwp.commands.enterSummary(workorder.summary);
  });
};

/**
 * Clear specific fields on Item Form
 */
WorkorderService.prototype.clearOtherFields = function() {
  // nwp.commands.clearStartDate(); // TODO
  // nwp.commands.clearStartTime(); // TODO
  nwp.commands.clearFinishDate();
  nwp.commands.clearFinishTime();
};

/**
 * Search workorder in workorders list
 * @param {*} workorder to be searched
 */
WorkorderService.prototype.searchForItem = function(workorder, count) {
  return pageObject.main.commands.search(workorder.title).then(function() {
    pageObject.main.commands.count().then(function(c) {
      utils.expectResultIsEquelTo(c, count);
    });
  });
};

/**
 * Check if all fields of Workorder Form are present
 */
WorkorderService.prototype.expectFieldsPresent = function() {
  var isPresent = function(x) {
    return x.isPresent();
  };
  // var pageObject = this.pageObject;
  isPresent(nwp.locators.workorderForm.self).then(function(result) {
    utils.expectResultIsTrue(result);
    return utils.returnAllPromises(nwp.locators.workorderForm.fields, isPresent);
  }).then(function(results) { // fields present
    utils.expectEachResultsIsTrue(results);
    return utils.returnAllPromises(nwp.locators.workorderForm.dropdowns, isPresent);
  }).then(function(results) { // dropdowns present
    utils.expectEachResultsIsTrue(results);
    return utils.returnAllPromises(nwp.locators.workorderForm.datetime, isPresent);
  }).then(function(results) { // date and time present
    utils.expectEachResultsIsTrue(results);
  });
};

/**
 * Compare actual workorder details with expected
 * @param {*} workorder to be compared to
 */
WorkorderService.prototype.expectDetailsToBe = function(workorder) {
  swp.commands.getDetails()
  .then(function(details) {
    var status = swp.commands.getStatus(details);
    utils.expectResultIsEquelTo(status.h3, workorder.status);
    var coordinates = swp.commands.getCoordinates(details, workorder.address);
    utils.expectResultIsEquelTo(coordinates.h3, workorder.latitude+', '+workorder.longitude);
    var title = swp.commands.getTitle(details);
    utils.expectResultIsEquelTo(title.h3, workorder.title);
    // var finishDate = swp.commands.getFinishDate(details); //  TODO check date format
    // utils.checkResultIsEquelTo(finishDate.h3, params.finishDate);
    var finishTime = swp.commands.getFinishTime(details);
    utils.expectResultIsEquelTo(finishTime.h3.substring(0, 5), workorder.finishTime.substring(0, 5));
    var assignee = swp.commands.getAssignee(details);
    utils.expectResultIsEquelTo(assignee.h3, workorder.assignee);
    swp.commands.getWorkSummary()
    .then(function(summary) {
      utils.expectResultIsEquelTo(summary, workorder.summary);
    });
    swp.commands.getWorkflow()
    .then(function(workflow) {
      utils.expectResultIsEquelTo(workflow, 'Workflow: ' + workorder.workflow);
    });
  });
};

WorkorderService.prototype.expectElementInfo = function(workorder) {
  swp.locators.workorderHeader.isPresent().then(function(result) {
    utils.expectResultIsTrue(result);
    return swp.locators.workorderHeader.getText();
  }).then(function(result) {
    utils.expectResultIsEquelTo(result, 'Work order : ' + workorder.title);
  });
};

WorkorderService.prototype.expectElementDetails = function(promise, expected, expectFunc) {
  expectFunc = expectFunc || _.noop;
  promise.then(function(elem) {
    mwp.commands.getTitle(elem).then(function(result) {
      expectFunc(result, expected.title);
    });
    mwp.commands.getAddress(elem).then(function(result) {
      expectFunc(result, expected.address);
    });
  });
};

module.exports = WorkorderService;