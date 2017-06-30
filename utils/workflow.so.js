var pageObject = require('../pages/workflow');

var nwp = pageObject.new;
var mwp = pageObject.main;
var swp = pageObject.selected;

var utils = require('../utils/utils');
var BaseService = require('../utils/base.so');

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
  return mwp.commands.search(workflow.title).then(function() {
    mwp.commands.count().then(function(c) {
      utils.expectResultIsEquelTo(c, count);
    });
  });
};

/**
 * Check if all fields of Workflow Form are present
 */
WorkflowService.prototype.expectFieldsPresent = function() {
  var isPresent = function(x) {
    return x.isPresent();
  };
  isPresent(nwp.locators.workflowForm.self).then(function(result) {
    utils.expectResultIsTrue(result);
    return utils.returnAllPromises(nwp.locators.workflowForm.fields, isPresent);
  }).then(function(results) { // fields present
    utils.expectEachResultsIsTrue(results);
    return utils.returnAllPromises(nwp.locators.workflowForm.dropdowns, isPresent);
  }).then(function(results) { // dropdowns present
    utils.expectEachResultsIsTrue(results);
  });
};

/**
 * Compare actual workflow details with expected
 * @param {*} workflow to be compared to
 */
WorkflowService.prototype.expectDetailsToBe = function(workflow) { // TODO implement
  return swp.locators.workflowHeader.isPresent().then(function(result) {
    utils.expectResultIsTrue(result);
    return swp.locators.workflowHeader.getText();
  }).then(function(result) {
    utils.expectResultIsEquelTo(result, workflow.title);
    return swp.locators.stepForm.self.isPresent();
  }).then(function(result) {
    utils.expectResultIsTrue(result);
  });
};

WorkflowService.prototype.expectElementInfo = function(workflow) { // TODO implement
  swp.locators.workflowHeader.isPresent().then(function(result) {
    utils.expectResultIsTrue(result);
    return swp.locators.workflowHeader.getText();
  }).then(function(result) {
    utils.expectResultIsEquelTo(result, workflow.title);
  });
};

WorkflowService.prototype.expectElementDetails = function(promise, expected, expectFunc) {
  promise.then(function(elem) {
    mwp.commands.getTitle(elem).then(function(result) {
      expectFunc(result, expected.title);
    });
  });
};

WorkflowService.prototype.addStep = function(workflow, step, dummyParams) {
  dummyParams = dummyParams || false;
  this.open(workflow).then(function() {
    return swp.locators.stepForm.self.isPresent();
  }).then(function(result) {
    utils.expectResultIsTrue(result);
  }).then(function() {
    if (!dummyParams && swp.locators.stepForm.dropdowns) {
      // utils.sendKeysPromise(swp.locators.stepForm.dropdowns, step);
    }
  }).then(function() {
    if (!dummyParams && swp.locators.stepForm.fields) {
      utils.sendKeysPromise(swp.locators.stepForm.fields, step);
    }
  }).then(function() {
    swp.locators.stepForm.buttons.add.click();
  });
};

WorkflowService.prototype.updateStep = function(workflow, toUpdate, updatee) {
  this.open(workflow).then(function() {
    return swp.commands.getStepsDetails();
  }).then(function(result) {
    return result.findIndex(function(step) {
      return _.endsWith(step.h2, toUpdate.name);
    });
  }).then(function(idx) {
    return swp.locators.workflowSteps.get(idx);
  }).then(function(el) {
    el.element(by.css('md-card-actions>a[aria-label="Edit Step"]')).click();
  }).then(function() { // dont forget to clear all fields here
    return utils.returnAllPromises(swp.locators.stepForm.fields, x => x.clear());
  }).then(function(results) {
    utils.expectEachResultsIsNull(results);
  }).then(function() {
    utils.sendKeysPromise(swp.locators.stepForm.fields, updatee);
  }).then(function() {
    swp.locators.stepForm.buttons.update.click();
  });
};

WorkflowService.prototype.removeStep = function(workflow, toDelete) {
  this.open(workflow).then(function() {
    return swp.commands.getStepsDetails();
  }).then(function(result) {
    return result.findIndex(function(step) {
      return _.endsWith(step.h2, toDelete.name);
    });
  }).then(function(idx) {
    return swp.locators.workflowSteps.get(idx);
  }).then(function(el) {
    el.element(by.css('md-card-actions>button[aria-label="Delete Step"')).click();
  }).then(function() {
    utils.pressButton(mwp.locators.proceedButton);
  });
};

WorkflowService.prototype.expectStepWarningsPresent = function() {
  var isPresent = function(x) {
    return x.isPresent();
  };
  isPresent(swp.locators.stepForm.self).then(function(result) {
    utils.expectResultIsTrue(result);
    return utils.returnAllPromises(swp.locators.stepForm.warnings, isPresent);
  }).then(function(results) {
    utils.expectEachResultsIsTrue(results);
  });
};

WorkflowService.prototype.expectStepDetailsToBe = function(workflow, expected) {
  this.open(workflow).then(function() {
    return swp.commands.getStepsDetails();
  }).then(function(details) {
    var idx = details.findIndex(function(step) {
      return _.endsWith(step.h2, expected.name);
    });
    return {details, idx};
  }).then(function(result) {
    var stepCode = swp.commands.getStepCode(result.details, result.idx);
    var viewTemplate = swp.commands.getViewTemplate(result.details, result.idx);
    var formId = swp.commands.getFormId(result.details, result.idx);
    var formTemplate = swp.commands.getFormTemplate(result.details, result.idx);
    return {stepCode, viewTemplate, formId, formTemplate};
  }).then(function(result) {
    utils.expectResultIsEquelTo(result.stepCode.h3, expected.code);
    utils.expectResultIsEquelTo(result.viewTemplate.h3, expected.view);
    // utils.expectResultIsEquelTo(result.formId.h3, expected.formId);
    utils.expectResultIsEquelTo(result.formTemplate.h3, expected.form);
  });
};

module.exports = WorkflowService;