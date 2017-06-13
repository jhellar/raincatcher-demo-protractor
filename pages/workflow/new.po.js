var consts = require('../../utils/constants');
var utils = require('../../utils/utils');

var NewWorkflowPage = function() {
  var workflowFormSelector = 'form[name="workflowForm"]';
  var locators = {
    workflowForm: {
      self: element(by.css(workflowFormSelector)),
      fields : {
        title: element(by.css(workflowFormSelector + ' #title')),
      },
      warnings: {
        title: element(by.css(workflowFormSelector + ' #title[aria-invalid="true"]'))
      },
      buttons: {
        create: element(by.css(workflowFormSelector + ' button[aria-label="Create Workflow"]')),
        update: element(by.css(workflowFormSelector + ' button[aria-label="Update Workflow"]')),
        cancel: element(by.css('workflow-form button[aria-label="Close"]'))
      }
    }
  };

  var commands = {
    navigate: function() {
      return browser.get(consts.HASH + consts.workflows.URL_NEW);
    },
    selfCheck: function() {
      browser.getLocationAbsUrl().then(function(result) {
        utils.expectResultIsEquelTo(result, consts.workflows.URL_NEW);
        return locators.workflowForm.self.isPresent();
      }).then(function(result) {
        utils.expectResultIsTrue(result);
      });
    },
    enterTitle: function(title) {
      locators.workflowForm.fields.title.sendKeys(title);
    },
    clearTitle: function() {
      locators.workflowForm.fields.title.clear();
    },
    checkTitleWarningMessage: function() {
      return locators.workflowForm.warnings.title.isPresent().then(function(result) {
        utils.expectResultIsTrue(result);
        return locators.workflowForm.warnings.title.getText().then(function(result) {
          utils.expectResultIsEquelTo(result, consts.workflows.TITLE_MISSING_MSG); // TODO title message is required
        });
      });
    }
  };

  return {
    locators, commands
  };
};

module.exports = NewWorkflowPage();