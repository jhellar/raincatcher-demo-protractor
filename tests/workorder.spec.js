var WorkorderService = require('../utils/workorder.so');
var workorderService = new WorkorderService();

var WorkerService = require('../utils/worker.so');
var workerService = new WorkerService();

var WorkflowService = require('../utils/workflow.so');
var workflowService = new WorkflowService();

var data = require('../data/workorders.do');

var constants = require('../utils/constants');
var AuthService = require('../utils/auth.so');
var authService = new AuthService();

describe('Workorder E2E', function() {

  before('LOGIN', function() {
    authService.openPortal();
    authService.loginPortal(constants.auth.usernames.TREVER_SMITH,
      constants.auth.DEFAULT_PASSWORD);
    authService.checkPortalLoginWasSuccessful();
  });

  describe('SETUP', function() {
    step('create workers', function() {
      workerService.create(data.workers.WORKER1);
      workerService.create(data.workers.WORKER2);
    });
    step('create workflows', function() {
      workflowService.create(data.workflows.WORKFLOW1);
      workflowService.create(data.workflows.WORKFLOW2);
    });
    step('create workorders', function() {
      workorderService.create(data.workorders.UPDATE1);
      workorderService.create(data.workorders.CANCEL);
      workorderService.create(data.workorders.SEARCH);
      workorderService.create(data.workorders.DELETE);
    });
  });

  describe('CREATE', function() {
    step('create an empty{} workorder', function() {
      workorderService.create({}, true);
    });
    step('check field warinigs shown', function() {
      workorderService.expectWarningsPresent();
    });
    step('create new ' + data.params.WORKORDER_TCREATE + ' workorder', function() {
      workorderService.create(data.workorders.CREATE);
    });
    step('open ' + data.params.WORKORDER_TCREATE + ' workorder', function() { //RAINCATCH-641
      workorderService.open(data.workorders.CREATE); // open workorder to see details
    });
    step('check ' + data.params.WORKORDER_TCREATE + ' workorder details', function() { //RAINCATCH-641
      workorderService.expectDetailsToBe(data.workorders.CREATE); // compare workorder details
    });
    step('check ' + data.params.WORKORDER_TCREATE + ' workorder in list', function() {
      workorderService.expectToBeInList(data.workorders.CREATE);
    });
    step('open ' + data.params.WORKER_TCRUDL1 + ' worker', function() {
      workerService.open(data.workers.WORKER1);
    });
    step('check ' + data.params.WORKORDER_TCREATE + ' workorder in ' + data.params.WORKER_TCRUDL1 + ' worker list', function() {
      workerService.verifyWorkorderInList(data.workers.WORKER1, data.workorders.CREATE);
    });
    xit('mobile App workorder in list', function() {
      // TODO
    });
  });

  describe('UPDATE', function() {
    step('update ' + data.params.WORKORDER_TUPDATE1 + ' workorder details', function() {
      workorderService.update(data.workorders.UPDATE1, data.workorders.UPDATE2);
    });
    step('open ' + data.params.WORKORDER_TUPDATE2 + ' workorder', function() { //RAINCATCH-641
      workorderService.open(data.workorders.UPDATE2); // open workorder to see details
    });
    step('check ' + data.params.WORKORDER_TUPDATE2 + ' workorder details', function() { //RAINCATCH-641
      workorderService.expectDetailsToBe(data.workorders.UPDATE2); // verify workorder details
    });
    step('check ' + data.params.WORKORDER_TUPDATE2 + ' workorder in list', function() {
      workorderService.expectToBeInList(data.workorders.UPDATE2);
    });
    step('check ' + data.params.WORKORDER_TUPDATE1 + ' workorder not in list', function() {
      workorderService.expectNotInTheList(data.workorders.UPDATE1);
    });
    step('open ' + data.params.WORKER_TCRUDL2 + ' worker', function() {
      workerService.open(data.workers.WORKER2);
    });
    step('check ' + data.params.WORKORDER_TUPDATE2 + ' workorder in ' + data.params.WORKER_TCRUDL2 + ' worker list', function() {
      workerService.verifyWorkorderInList(data.workers.WORKER2, data.workorders.UPDATE2);
    });
    xit('mobile App workorder in list', function() {
      // TODO
    });
  });

  describe('CANCEL', function() {
    step('open ' + data.params.WORKORDER_TCANCEL + ' workorder details', function() {
      workorderService.open(data.workorders.CANCEL);
    });
    step('press [delete] button', function() {
      workorderService.pressDeleteButton();
    });
    step('press [cancel] button', function() {
      workorderService.pressCancelButton();
    });
    step('check ' + data.params.WORKORDER_TCANCEL + ' workorder in list', function() {
      workorderService.expectToBeInList(data.workorders.CANCEL);
    });
    step('press [new] button', function() {
      workorderService.pressNewButton();
    });
    step('press [cancel] button', function() {
      workorderService.pressNewCancelButton();
    });
    step('check [new] button visible', function() {
      workorderService.expectNewButtonIsPresent();
    });
    step('open ' + data.params.WORKORDER_TCANCEL + ' workorder details', function() {
      workorderService.open(data.workorders.CANCEL);
    });
    step('press [edit] button', function() {
      workorderService.pressEditButton();
    });
    step('press [cancel] button', function() {
      workorderService.pressNewCancelButton();
    });
    step('check ' + data.params.WORKORDER_TCANCEL + ' workorder details', function() {
      workorderService.expectDetailsToBe(data.workorders.CANCEL);
    });
  });

  describe('SEARCH', function() {
    var searched;
    step('search field is visible and ' + data.params.WORKORDER_TSEARCH + 'is searched', function() {
      searched = workorderService.search(data.workorders.SEARCH, 1);
    });
    step('check ' + data.params.WORKORDER_TSEARCH + ' workorder in list', function() {
      workorderService.expectElementDetailsEqualTo(searched, data.workorders.SEARCH);
    });
    step('check ' + data.params.WORKORDER_TDELETE + ' workorder not in list', function() {
      workorderService.expectElementDetailsNotEqualTo(searched, data.workorders.DELETE);
    });
    step('search reset to list all workorders', function() {
      workorderService.searchReset();
    });
  });

  describe('DELETE', function() {
    step('remove ' + data.params.WORKORDER_TDELETE + ' workorder', function() {
      workorderService.remove(data.workorders.DELETE);
    });
    step('check ' + data.params.WORKORDER_TDELETE + ' workorder not in list', function() {
      workorderService.expectNotInTheList(data.workorders.DELETE);
    });
    step('check ' + data.params.WORKORDER_TDELETE + ' workorder in ' + data.params.WORKER_TCRUDL1 + ' worker list', function() {
      workerService.verifyWorkorderNotInList(data.workers.WORKER1, data.workorders.DELETE);
    });
    xit('mobile App workorder in list', function() {
      // TODO
    });
  });

  describe('CLEANUP', function() {
    step('remove workorders', function() {
      workorderService.remove(data.workorders.CREATE);
      workorderService.remove(data.workorders.CANCEL);
      workorderService.remove(data.workorders.SEARCH);
      workorderService.remove(data.workorders.UPDATE2);
    });
    step('remove workers', function() {
      workerService.remove(data.workers.WORKER1);
      workerService.remove(data.workers.WORKER2);
    });
    step('remove workflows', function() {
      workflowService.remove(data.workflows.WORKFLOW1);
      workflowService.remove(data.workflows.WORKFLOW2);
    });
  });
});