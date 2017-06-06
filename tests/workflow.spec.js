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

  context('CREATE', function() {
    it('create an empty{} workflow', function() {
      workflowService.create({}, true);
    });
    it('required field warinigs shown', function() {
      workflowService.expectWarningsPresent();
    });
    it('create ' + data.params.WORKFLOW_TCREATE + ' workflow', function() {
      workflowService.create(data.workflows.CREATE);
    });
    it('open ' + data.params.WORKFLOW_TCREATE + ' workflow', function() {
      workflowService.open(data.workflows.CREATE);
    });
    it('check ' + data.params.WORKFLOW_TCREATE + ' workflow details', function() {
      workflowService.expectDetailsToBe(data.workflows.CREATE);
    });
    it('check ' + data.params.WORKFLOW_TCREATE + ' workflow in list', function() {
      workflowService.expectToBeInList(data.workflows.CREATE);
    });
    xit('check ' + data.params.WORKFLOW_TCREATE + ' in workorder form', function() {
      // TODO
    });
    after('remove ' + data.params.WORKFLOW_TCREATE + ' workflow', function() {
      workflowService.remove(data.workflows.CREATE);
    });
  });

  context('UPDATE', function() {
    before('create ' + data.params.WORKFLOW_TUPDATE1 + ' workflow', function() {
      workflowService.create(data.workflows.UPDATE1);
    });
    it('update ' + data.params.WORKFLOW_TUPDATE1 + ' workflow details', function() {
      workflowService.update(data.workflows.UPDATE1, data.workflows.UPDATE2);
    });
    it('check ' + data.params.WORKFLOW_TUPDATE2 + ' workflow details', function() {
      workflowService.expectDetailsToBe(data.workflows.UPDATE2);
    });
    it('check ' + data.params.WORKFLOW_TUPDATE + ' workflow in list', function() {
      workflowService.expectToBeInList(data.workflows.UPDATE2);
    });
    it('check ' + data.params.WORKFLOW_TUPDATE1 + ' workflow not in list', function() {
      workflowService.expectNotInTheList(data.workflows.UPDATE1);
    });
    after('remove ' + data.params.WORKFLOW_TUPDATE2 + ' workflow', function() {
      workflowService.remove(data.workflows.UPDATE2);
    });
  });

  context('CANCEL', function() {
    before('create ' + data.params.WORKFLOW_TCANCEL + ' workflow', function() {
      workflowService.create(data.workflows.CANCEL);
    });
    it('open ' + data.params.WORKFLOW_TCANCEL + ' workflow details', function() {
      workflowService.open(data.workflows.CANCEL);
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

  context('SEARCH', function() {
    var searched;
    before('create ' + data.params.WORKFLOW_TSEARCH + ' workflow', function() {
      workflowService.create(data.workflows.SEARCH);
    });
    it('search field is visible and ' + data.params.WORKFLOW_TSEARCH + 'is searched', function() {
      searched = workflowService.search(data.workflows.SEARCH, 1);
    });
    it('check ' + data.params.WORKFLOW_TSEARCH + ' workflow in list', function() {
      workflowService.expectElementDetailsEqualTo(searched, data.workflows.SEARCH);
    });
    it('check ' + data.params.WORKFLOW_TDELETE + ' workflow not in list', function() {
      workflowService.expectElementDetailsNotEqualTo(searched, data.workflows.DELETE);
    });
    it('search reset to list all workflows', function() {
      workflowService.searchReset();
    });
    after('remove ' + data.params.WORKFLOW_TSEARCH + ' workflow', function() {
      workflowService.remove(data.workflows.SEARCH);
    });
  });

  context('DELETE', function() {
    before('create ' + data.params.WORKFLOW_TDELETE + ' workflow', function() {
      workflowService.create(data.workflows.DELETE);
    });
    it('remove ' + data.params.WORKFLOW_TDELETE + ' workflow', function() {
      workflowService.remove(data.workflows.DELETE);
    });
    it('RAINCATCH-839: check ' + data.params.WORKFLOW_TDELETE + ' workflow not in list', function() {
      workflowService.expectNotInTheList(data.workflows.DELETE);
    });
    xit('check ' + data.params.WORKFLOW_TDELETE + ' not in workorder form', function() {
      // TODO
    });
  });
});