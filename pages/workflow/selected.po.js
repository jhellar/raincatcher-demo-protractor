var utils = require('../../utils/utils');

var SelectedWorkflowPage = function() {

  var stepFormSelector = 'form[name="workflowStepForm"]';
  var locators = {
    workflowHeader: element(by.css('workflow-detail>md-toolbar>div>h3')),
    workflowSteps: element.all(by.repeater('step in wfdCtrl.workflow.steps')), // get all steps but not [Add Step]

    stepForm: {
      self: element(by.css(stepFormSelector)),
      fields: {
        // formId: element(by.css(stepFormSelector + ' #formId')),
        code: element(by.css(stepFormSelector + ' #code')),
        name: element(by.css(stepFormSelector + ' #name')),
        form: element(by.css(stepFormSelector + ' #form')),
        view: element(by.css(stepFormSelector + ' #view')),
      },
      dropdowns: {
        // no dropdowns in Step Form
      },
      buttons: {
        add: element(by.css(stepFormSelector + ' button[aria-label="Update step"]')), // BUG shoudl be Add step
        update: element(by.css(stepFormSelector + ' button[aria-label="Update step"]')),
      },
      warnings: {
        code: element(by.css(stepFormSelector + ' #code[aria-invalid="true"]')),
        name: element(by.css(stepFormSelector + ' #name[aria-invalid="true"]'))
      }
    }
  };
  var commands = {
    selfCheck: function(header) {
      return locators.workflowHeader.isPresent().then(function(result) {
        utils.expectResultIsTrue(result);
        return locators.workflowHeader.getText();
      }).then(function(result) {
        utils.expectResultIsNotEquelTo(result, header);
      });
    },
    getStepsDetails: function() {
      return locators.workflowSteps.map(function(stepUiDetail) {
        var stepUi = stepUiDetail.element(by.css('md-card-content>workflow-step-detail'));
        var h2 = stepUi.element(by.css('h2')).getText();
        var listItems = stepUi.element(by.css('md-list')).all(by.css('md-list-item'));
        var data = listItems.map(function(listItem) {
          var icon = listItem.element(by.css('md-icon')).getText();
          var h3 = listItem.element(by.css('div>h3')).getText();
          var p = listItem.element(by.css('div>p')).getText();
          return { icon, h3, p };
        });
        return {h2, data};
      });
    },
    getStepCode: function(details) {
      var stepCode = details.find(function(it) {
        return it.steps.p === 'Step code';
      });
      return stepCode;
    },
    getViewTemplate: function(details) {
      var viewTemplate = details.find(function(it) {
        return it.steps.p === 'View Template';
      });
      return viewTemplate;
    },
    getFormTemplate: function(details) {
      var formTemplate = details.find(function(it) {
        return it.steps.p === 'Form template';
      });
      return formTemplate;
    }
  };

  return {
    locators, commands
  };
};

module.exports = SelectedWorkflowPage();