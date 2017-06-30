var pageObject = require('../pages/workorder');

var nwp = pageObject.new;
var mwp = pageObject.main;
var swp = pageObject.selected;

var utils = require('../utils/utils');
var BaseService = require('./base.so');

var _ = require('lodash');

function WorkorderService() {
  pageObject.new.locators.itemForm = pageObject.new.locators.workorderForm;
  BaseService.call(this, pageObject);
}

utils.inherit(WorkorderService, BaseService);

/**
 * Clear specific fields on Item Form
 */
WorkorderService.prototype.clearOtherFields = function() {
  return Promise.all([
    // nwp.commands.clearStartDate(), // TODO
    // nwp.commands.clearStartTime(), // TODO
    nwp.commands.clearFinishDate(),
    nwp.commands.clearFinishTime()
  ]);
};

/**
 * Search workorder in workorders list
 * @param {*} workorder to be searched
 */
WorkorderService.prototype.searchForItem = function(workorder, count) {
  return pageObject.main.commands.search(workorder.title)
  .then(() => pageObject.main.commands.count())
  .then((c) => utils.expectResultIsEquelTo(c, count));
};

/**
 * Check if all fields of Workorder Form are present
 */
WorkorderService.prototype.expectFieldsPresent = function() {
  return nwp.locators.workorderForm.self.isPresent()
  .then((result) => {
    utils.expectResultIsTrue(result);
    return utils.returnAllPromises(nwp.locators.workorderForm.fields, x => x.isPresent());
  })
  .then((results) => { // fields present
    utils.expectEachResultsIsTrue(results);
    return utils.returnAllPromises(nwp.locators.workorderForm.dropdowns, x => x.isPresent());
  })
  .then((results) => { // dropdowns present
    utils.expectEachResultsIsTrue(results);
    return utils.returnAllPromises(nwp.locators.workorderForm.datetime, x => x.isPresent());
  })
  .then((results) => utils.expectEachResultsIsTrue(results));
};

/**
 * Compare actual workorder details with expected
 * @param {*} workorder to be compared to
 */
WorkorderService.prototype.expectDetailsToBe = function(workorder) {
  return swp.commands.getDetails()
  .then((details) => {
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
    return Promise.all([
      swp.commands.getWorkSummary()
      .then((summary) => utils.expectResultIsEquelTo(summary, workorder.summary)),
      swp.commands.getWorkflow()
      .then((workflow) => utils.expectResultIsEquelTo(workflow, 'Workflow: ' + workorder.workflow))
    ]);
  });
};

WorkorderService.prototype.expectElementInfo = function(workorder) {
  return swp.locators.workorderHeader.isPresent()
  .then((result) => {
    utils.expectResultIsTrue(result);
    return swp.locators.workorderHeader.getText();
  })
  .then((result) => utils.expectResultIsEquelTo(result, 'Work order : ' + workorder.title));
};

WorkorderService.prototype.expectElementDetails = function(promise, expected, expectFunc) {
  expectFunc = expectFunc || _.noop;
  return promise
  .then((elem) => {
    return Promise.all([
      mwp.commands.getTitle(elem)
      .then((result) => expectFunc(result, expected.title)),
      mwp.commands.getAddress(elem)
      .then((result) => expectFunc(result, expected.address))
    ]);
  });
};

module.exports = WorkorderService;