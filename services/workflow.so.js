var pageObject = require('../pages/workflow');

var nwp = pageObject.new;
var mwp = pageObject.main;
var swp = pageObject.selected;

var utils = require('../utils/utils');
var BaseService = require('./base.so');

var _ = require('lodash');

function WorkflowService() {
  pageObject.new.locators.itemForm = pageObject.new.locators.workflowForm;
  BaseService.call(this, pageObject);
}

utils.inherit(WorkflowService, BaseService);

/**
 * Clear specific fields on Workflow Form
 */
WorkflowService.prototype.clearOtherFields = _.noop;
/**
 * Search workflow in workflows list
 * @param {*} workflow to be searched
 */
WorkflowService.prototype.searchForItem = function(workflow, count) {
  return mwp.commands.search(workflow.title)
  .then(() => mwp.commands.count())
  .then((c) => utils.expectResultIsEquelTo(c, count));
};

/**
 * Check if all fields of Workflow Form are present
 */
WorkflowService.prototype.expectFieldsPresent = function() {
  return nwp.locators.workflowForm.self.isPresent()
  .then((result) => {
    utils.expectResultIsTrue(result);
    return utils.returnAllPromises(nwp.locators.workflowForm.fields, x => x.isPresent());
  })
  .then((results) => { // fields present
    utils.expectEachResultsIsTrue(results);
    return utils.returnAllPromises(nwp.locators.workflowForm.dropdowns, x => x.isPresent());
  })
  .then((results) => utils.expectEachResultsIsTrue(results));
};

/**
 * Compare actual workflow details with expected
 * @param {*} workflow to be compared to
 */
WorkflowService.prototype.expectDetailsToBe = function(workflow) { // TODO implement
  return swp.locators.workflowHeader.isPresent()
  .then((result) => {
    utils.expectResultIsTrue(result);
    return swp.locators.workflowHeader.getText();
  })
  .then((result) => {
    utils.expectResultIsEquelTo(result, workflow.title);
    return swp.locators.stepForm.self.isPresent();
  })
  .then((result) => utils.expectResultIsTrue(result));
};

WorkflowService.prototype.expectElementInfo = function(workflow) {
  return swp.locators.workflowHeader.isPresent()
  .then((result) => {
    utils.expectResultIsTrue(result);
    return swp.locators.workflowHeader.getText();
  })
  .then((result) => utils.expectResultIsEquelTo(result, workflow.title));
};

WorkflowService.prototype.expectElementDetails = function(promise, expected, expectFunc) {
  return promise.then((elem) => mwp.commands.getTitle(elem))
  .then((result) => expectFunc(result, expected.title));
};

WorkflowService.prototype.addStep = function(workflow, step, dummyParams) {
  dummyParams = dummyParams || false;
  return this.open(workflow)
  .then(() => swp.locators.stepForm.self.isPresent())
  .then((result) => utils.expectResultIsTrue(result))
  .then(() => {
    if (!dummyParams && swp.locators.stepForm.dropdowns) {
      // utils.sendKeysPromise(swp.locators.stepForm.dropdowns, step);
    }
  })
  .then(() => {
    if (!dummyParams && swp.locators.stepForm.fields) {
      utils.sendKeysPromise(swp.locators.stepForm.fields, step);
    }
  })
  .then(() => swp.locators.stepForm.buttons.add.click());
};

WorkflowService.prototype.updateStep = function(workflow, toUpdate, updatee) {
  return this.open(workflow)
  .then(() => swp.commands.getStepsDetails())
  .then((result) => {
    return result.findIndex(function(step) {
      return _.endsWith(step.h2, toUpdate.name);
    });
  })
  .then((idx) => swp.locators.workflowSteps.get(idx))
  .then((el) => el.element(by.css('md-card-actions>a[aria-label="Edit Step"]')).click())
  .then(() => utils.returnAllPromises(swp.locators.stepForm.fields, x => x.clear()))
  .then((results) => utils.expectEachResultsIsNull(results))
  .then(() => utils.sendKeysPromise(swp.locators.stepForm.fields, updatee))
  .then(() => swp.locators.stepForm.buttons.update.click());
};

WorkflowService.prototype.removeStep = function(workflow, toDelete) {
  return this.open(workflow)
  .then(() => swp.commands.getStepsDetails())
  .then((result) => {
    return result.findIndex(function(step) {
      return _.endsWith(step.h2, toDelete.name);
    });
  })
  .then((idx) => swp.locators.workflowSteps.get(idx))
  .then((el) => el.element(by.css('md-card-actions>button[aria-label="Delete Step"')).click())
  .then(() => utils.pressButton(mwp.locators.proceedButton));
};

WorkflowService.prototype.expectStepWarningsPresent = function() {
  return swp.locators.stepForm.self.isPresent()
  .then((result) => {
    utils.expectResultIsTrue(result);
    return utils.returnAllPromises(swp.locators.stepForm.warnings, x => x.isPresent());
  })
  .then((results) => utils.expectEachResultsIsTrue(results));
};

WorkflowService.prototype.expectStepDetailsToBe = function(workflow, expected) {
  return this.open(workflow)
  .then(() => swp.commands.getStepsDetails())
  .then((details) => {
    var idx = details.findIndex(function(step) {
      return _.endsWith(step.h2, expected.name);
    });
    return {details, idx};
  })
  .then((result) => {
    var stepCode = swp.commands.getStepCode(result.details, result.idx);
    utils.expectResultIsEquelTo(stepCode.h3, expected.code);
    var viewTemplate = swp.commands.getViewTemplate(result.details, result.idx);
    utils.expectResultIsEquelTo(viewTemplate.h3, expected.view);
    // var formId = swp.commands.getFormId(result.details, result.idx); // TODO
    // utils.expectResultIsEquelTo(formId.h3, expected.formId);
    var formTemplate = swp.commands.getFormTemplate(result.details, result.idx);
    utils.expectResultIsEquelTo(formTemplate.h3, expected.form);
  });
};

module.exports = WorkflowService;