var WorkflowService = require('../utils/workflow.so');
var workflowService = new WorkflowService();

var data = require('../data/workflows.do');

var constants = require('../utils/constants');
var AuthService = require('../utils/auth.so');
var authService = new AuthService();

describe('Workflow E2E', function() {

  before('login', function() {
    authService.openPortal();
    authService.loginPortal(constants.auth.usernames.TREVER_SMITH,
      constants.auth.DEFAULT_PASSWORD);
    authService.checkPortalLoginWasSuccessful();
  });

  describe('SETUP', function() {
    step('create workflows', function() {
      workflowService.create(data.workflows.UPDATE1);
      workflowService.create(data.workflows.DELETE);
      workflowService.create(data.workflows.CANCEL);
      workflowService.create(data.workflows.SEARCH);
    });
  });

  describe('CREATE', function() {
    step('create an empty{} workflow', function() {
      workflowService.create({}, true);
    });
    step('required field warinigs shown', function() {
      workflowService.expectWarningsPresent();
    });
    step('create ' + data.params.WORKFLOW_TCREATE + ' workflow', function() {
      workflowService.create(data.workflows.CREATE);
    });
    step('open ' + data.params.WORKFLOW_TCREATE + ' workflow', function() {
      workflowService.open(data.workflows.CREATE);
    });
    step('check ' + data.params.WORKFLOW_TCREATE + ' workflow details', function() {
      workflowService.expectDetailsToBe(data.workflows.CREATE);
    });
    step('check ' + data.params.WORKFLOW_TCREATE + ' workflow in list', function() {
      workflowService.expectToBeInList(data.workflows.CREATE);
    });
    xit('check ' + data.params.WORKFLOW_TCREATE + ' in workorder form', function() {
      // TODO
    });
  });

  describe('UPDATE', function() { // RAINCATCH-839
    step('create ' + data.params.WORKFLOW_TUPDATE1 + ' workflow', function() {
      workflowService.create(data.workflows.UPDATE1);
    });
    step('update ' + data.params.WORKFLOW_TUPDATE1 + ' workflow details', function() {
      workflowService.update(data.workflows.UPDATE1, data.workflows.UPDATE2);
    });
    step('check ' + data.params.WORKFLOW_TUPDATE2 + ' workflow details', function() {
      workflowService.expectDetailsToBe(data.workflows.UPDATE2);
    });
    step('check ' + data.params.WORKFLOW_TUPDATE + ' workflow in list', function() {
      workflowService.expectToBeInList(data.workflows.UPDATE2);
    });
    step('check ' + data.params.WORKFLOW_TUPDATE1 + ' workflow not in list', function() {
      workflowService.expectNotInTheList(data.workflows.UPDATE1);
    });
  });

  describe('CANCEL', function() {
    step('open ' + data.params.WORKFLOW_TCANCEL + ' workflow details', function() {
      workflowService.open(data.workflows.CANCEL);
    });
    step('press [delete] button', function() {
      workflowService.pressDeleteButton();
    });
    step('press [cancel] button', function() {
      workflowService.pressCancelButton();
    });
    step('check ' + data.params.WORKFLOW_TCANCEL + ' workflow in list', function() {
      workflowService.expectToBeInList(data.workflows.CANCEL);
    });
    step('press [new] button', function() {
      workflowService.pressNewButton();
    });
    step('press [cancel] button', function() {
      workflowService.pressNewCancelButton();
    });
    step('check [new] button visible', function() {
      workflowService.expectNewButtonIsPresent();
    });
    step('open ' + data.params.WORKFLOW_TCANCEL + ' workflow details', function() {
      workflowService.open(data.workflows.CANCEL);
    });
    step('press [edit] button', function() {
      workflowService.pressEditButton();
    });
    step('press [cancel] button', function() {
      workflowService.pressNewCancelButton();
    });
    xit('RAINCATCH-839: check ' + data.params.WORKFLOW_TCANCEL + ' workflow details', function() {
      workflowService.expectDetailsToBe(data.workflows.CANCEL);
    });
  });

  describe('SEARCH', function() {
    var searched;
    step('search field is visible and ' + data.params.WORKFLOW_TSEARCH + 'is searched', function() {
      searched = workflowService.search(data.workflows.SEARCH, 1);
    });
    step('check ' + data.params.WORKFLOW_TSEARCH + ' workflow in list', function() {
      workflowService.expectElementDetailsEqualTo(searched, data.workflows.SEARCH);
    });
    step('check ' + data.params.WORKFLOW_TDELETE + ' workflow not in list', function() {
      workflowService.expectElementDetailsNotEqualTo(searched, data.workflows.DELETE);
    });
    step('search reset to list all workflows', function() {
      workflowService.searchReset();
    });
  });

  describe('DELETE', function() {
    step('remove ' + data.params.WORKFLOW_TDELETE + ' workflow', function() {
      workflowService.remove(data.workflows.DELETE);
    });
    it('RAINCATCH-839: check ' + data.params.WORKFLOW_TDELETE + ' workflow not in list', function() {
      workflowService.expectNotInTheList(data.workflows.DELETE);
    });
    xit('check ' + data.params.WORKFLOW_TDELETE + ' not in workorder form', function() {
      // TODO
    });
  });

  describe('CLEANUP', function() {
    step('remove workflows', function() {
      workflowService.remove(data.workflows.CREATE);
      workflowService.remove(data.workflows.UPDATE1); // RAINCATCH-839 should be UPDATE2
      workflowService.remove(data.workflows.CANCEL);
      workflowService.remove(data.workflows.SEARCH);
    });
  });
});