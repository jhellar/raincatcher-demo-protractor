var WorkflowService = require('../services/workflow.so');
var workflowService = new WorkflowService();

var data = require('../data/steps.do');

var constants = require('../utils/constants');
var AuthService = require('../services/auth.so');
var authService = new AuthService();

describe('Steps E2E', function() {

  before('login', function() {
    authService.openPortal();
    authService.loginPortal(constants.auth.usernames.TREVER_SMITH,
      constants.auth.DEFAULT_PASSWORD);
    authService.checkPortalLoginWasSuccessful();
  });
  context('RUN TEST', function() {
    before('create workflows', function() {
      workflowService.create(data.workflows.WORKFLOW);
    });
    context('CREATE', function() {
      it('add ' + data.params.WORKFLOW_TCRUDL + ' empty{} step', function() {
        workflowService.addStep(data.workflows.WORKFLOW, {}, true);
      });
      it('required field warnigs shown', function() {
        workflowService.expectStepWarningsPresent();
      });
      it('add ' + data.params.WORKFLOW_TCRUDL + ' workflow steps', function() {
        workflowService.addStep(data.workflows.WORKFLOW, data.steps.CREATE);
      });
      it('check ' + data.params.STEP_TCREATE + ' step details', function() {
        workflowService.expectStepDetailsToBe(data.workflows.WORKFLOW, data.steps.CREATE);
      });
      xit('check ' + data.params.STEP_TCREATE + ' in ' + data.params.WORKFLOW_TCRUDL + ' workflow list', function() {
        // TODO
      });
      after('remove ' + data.params.STEP_TCREATE + ' step', function() {
        workflowService.removeStep(data.workflows.WORKFLOW, data.steps.CREATE);
        // workflowService.remove(data.workflows.WORKFLOW);
      });
    });

    context('UPDATE', function() {
      before('add ' + data.params.WORKFLOW_TCRUDL + ' workflow steps', function() {
        workflowService.addStep(data.workflows.WORKFLOW, data.steps.UPDATE1);
      });
      it('update ' + data.params.STEP_TUPDATE1 + ' step details', function() {
        workflowService.updateStep(data.workflows.WORKFLOW, data.steps.UPDATE1, data.steps.UPDATE2);
      });
      it('check ' + data.params.STEP_TUPDATE2 + ' step details', function() {
        workflowService.expectStepDetailsToBe(data.workflows.WORKFLOW, data.steps.UPDATE2);
      });
      xit('check ' + data.params.STEP_TUPDATE2 + ' in ' + data.params.WORKFLOW_TCRUDL + ' workflow list', function() {
        // TODO
      });
      xit('check ' + data.params.STEP_TUPDATE1 + ' not in ' + data.params.WORKFLOW_TCRUDL + ' workflow list', function() {
        // TODO
      });
      after('remove ' + data.params.STEP_TUPDATE2 + ' step', function() {
        workflowService.removeStep(data.workflows.WORKFLOW, data.steps.UPDATE2);
      });
    });

    context.skip('CANCEL', function() {
      before('add ' + data.params.WORKFLOW_TCRUDL + ' workflow steps', function() {
        workflowService.addStep(data.workflows.WORKFLOW, data.steps.CANCEL);
      });
      it('open ' + data.params.WORKFLOW_TCRUDL + ' workflow steps', function() {
        workflowService.open(data.workflows.WORKFLOW_TCRUDL);
      });
      it('press [delete] button', function() {
        workflowService.pressDeleteButton();
      });
      it('press [cancel] button', function() {
        workflowService.pressCancelButton();
      });
      it('check ' + data.params.WORKFLOW_TCANCEL + ' workflow in list', function() {
        workflowService.expectToBeInList(data.workflows.CANCEL);
      });
      it('press [new] button', function() {
        workflowService.pressNewButton();
      });
      it('press [cancel] button', function() {
        workflowService.pressNewCancelButton();
      });
      it('check [new] button visible', function() {
        workflowService.expectNewButtonIsPresent();
      });
      it('open ' + data.params.WORKFLOW_TCANCEL + ' workflow details', function() {
        workflowService.open(data.workflows.CANCEL);
      });
      it('press [edit] button', function() {
        workflowService.pressEditButton();
      });
      it('press [cancel] button', function() {
        workflowService.pressNewCancelButton();
      });
      it('RAINCATCH-839: check ' + data.params.WORKFLOW_TCANCEL + ' workflow details', function() {
        workflowService.expectDetailsToBe(data.workflows.CANCEL);
      });
      after('remove ' + data.params.WORKFLOW_TCANCEL + ' workflow', function() {
        workflowService.remove(data.workflows.CANCEL);
      });
    });

    context('DELETE', function() {
      before('add ' + data.params.WORKFLOW_TCRUDL + ' workflow steps', function() {
        workflowService.addStep(data.workflows.WORKFLOW, data.steps.DELETE);
      });
      it('remove ' + data.params.STEP_TDELETE + ' step from ' + data.params.WORKFLOW_TCRUDL, function() {
        workflowService.removeStep(data.workflows.WORKFLOW, data.steps.DELETE);
      });
      xit('check ' + data.params.STEP_TDELETE + ' step not in ' + data.params.WORKFLOW_TCRUDL + ' workflow list', function() {
        // TODO workflowService.verifyIsNotInTheList(data.steps.DELETE);
      });
    });
    after('remove workflows', function() {
      workflowService.remove(data.workflows.WORKFLOW);
    });
  });
});