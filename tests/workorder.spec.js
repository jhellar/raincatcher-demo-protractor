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
    it('create workers', function() {
      workerService.create(data.workers.WORKER1);
      workerService.create(data.workers.WORKER2);
    });
    it('create workflows', function() {
      workflowService.create(data.workflows.WORKFLOW1);
      workflowService.create(data.workflows.WORKFLOW2);
    });
    it('create workorders', function() {
      workorderService.create(data.workorders.UPDATE1);
      workorderService.create(data.workorders.CANCEL);
      workorderService.create(data.workorders.SEARCH);
      workorderService.create(data.workorders.DELETE);
    });
  });

  describe('CREATE', function() {
    it('create an empty{} workorder', function() {
      workorderService.create({}, true);
    });
    it('check field warinigs shown', function() {
      workorderService.expectWarningsPresent();
    });
    it('create new ' + data.params.WORKORDER_TCREATE + ' workorder', function() {
      workorderService.create(data.workorders.CREATE);
    });
    it('open ' + data.params.WORKORDER_TCREATE + ' workorder', function() { //RAINCATCH-641
      workorderService.open(data.workorders.CREATE); // open workorder to see details
    });
    it('check ' + data.params.WORKORDER_TCREATE + ' workorder details', function() { //RAINCATCH-641
      workorderService.expectDetailsToBe(data.workorders.CREATE); // compare workorder details
    });
    it('check ' + data.params.WORKORDER_TCREATE + ' workorder in list', function() {
      workorderService.expectToBeInList(data.workorders.CREATE);
    });
    it('open ' + data.params.WORKER_TCRUDL1 + ' worker', function() {
      workerService.open(data.workers.WORKER1);
    });
    it('check ' + data.params.WORKORDER_TCREATE + ' workorder in ' + data.params.WORKER_TCRUDL1 + ' worker list', function() {
      workerService.verifyWorkorderInList(data.workers.WORKER1, data.workorders.CREATE);
    });
    xit('mobile App workorder in list', function() {
      // TODO
    });
  });

  describe('UPDATE', function() {
    it('update ' + data.params.WORKORDER_TUPDATE1 + ' workorder details', function() {
      workorderService.update(data.workorders.UPDATE1, data.workorders.UPDATE2);
    });
    it('open ' + data.params.WORKORDER_TUPDATE2 + ' workorder', function() { //RAINCATCH-641
      workorderService.open(data.workorders.UPDATE2); // open workorder to see details
    });
    it('check ' + data.params.WORKORDER_TUPDATE2 + ' workorder details', function() { //RAINCATCH-641
      workorderService.expectDetailsToBe(data.workorders.UPDATE2); // verify workorder details
    });
    it('check ' + data.params.WORKORDER_TUPDATE2 + ' workorder in list', function() {
      workorderService.expectToBeInList(data.workorders.UPDATE2);
    });
    it('check ' + data.params.WORKORDER_TUPDATE1 + ' workorder not in list', function() {
      workorderService.expectNotInTheList(data.workorders.UPDATE1);
    });
    it('open ' + data.params.WORKER_TCRUDL2 + ' worker', function() {
      workerService.open(data.workers.WORKER2);
    });
    it('check ' + data.params.WORKORDER_TUPDATE2 + ' workorder in ' + data.params.WORKER_TCRUDL2 + ' worker list', function() {
      workerService.verifyWorkorderInList(data.workers.WORKER2, data.workorders.UPDATE2);
    });
    xit('mobile App workorder in list', function() {
      // TODO
    });
  });

  describe('CANCEL', function() {
    it('open ' + data.params.WORKORDER_TCANCEL + ' workorder details', function() {
      workorderService.open(data.workorders.CANCEL);
    });
    it('press [delete] button', function() {
      workorderService.pressDeleteButton();
    });
    it('press [cancel] button', function() {
      workorderService.pressCancelButton();
    });
    it('check ' + data.params.WORKORDER_TCANCEL + ' workorder in list', function() {
      workorderService.expectToBeInList(data.workorders.CANCEL);
    });
    it('press [new] button', function() {
      workorderService.pressNewButton();
    });
    it('press [cancel] button', function() {
      workorderService.pressNewCancelButton();
    });
    it('check [new] button visible', function() {
      workorderService.expectNewButtonIsPresent();
    });
    it('open ' + data.params.WORKORDER_TCANCEL + ' workorder details', function() {
      workorderService.open(data.workorders.CANCEL);
    });
    it('press [edit] button', function() {
      workorderService.pressEditButton();
    });
    it('press [cancel] button', function() {
      workorderService.pressNewCancelButton();
    });
    it('check ' + data.params.WORKORDER_TCANCEL + ' workorder details', function() {
      workorderService.expectDetailsToBe(data.workorders.CANCEL);
    });
  });

  describe('SEARCH', function() {
    var searched;
    it('search field is visible and ' + data.params.WORKORDER_TSEARCH + 'is searched', function() {
      searched = workorderService.search(data.workorders.SEARCH, 1);
    });
    it('check ' + data.params.WORKORDER_TSEARCH + ' workorder in list', function() {
      workorderService.expectElementDetailsEqualTo(searched, data.workorders.SEARCH);
    });
    it('check ' + data.params.WORKORDER_TDELETE + ' workorder not in list', function() {
      workorderService.expectElementDetailsNotEqualTo(searched, data.workorders.DELETE);
    });
    it('search reset to list all workorders', function() {
      workorderService.searchReset();
    });
  });

  describe('DELETE', function() {
    it('remove ' + data.params.WORKORDER_TDELETE + ' workorder', function() {
      workorderService.remove(data.workorders.DELETE);
    });
    it('check ' + data.params.WORKORDER_TDELETE + ' workorder not in list', function() {
      workorderService.expectNotInTheList(data.workorders.DELETE);
    });
    it('check ' + data.params.WORKORDER_TDELETE + ' workorder in ' + data.params.WORKER_TCRUDL1 + ' worker list', function() {
      workerService.verifyWorkorderNotInList(data.workers.WORKER1, data.workorders.DELETE);
    });
    xit('mobile App workorder in list', function() {
      // TODO
    });
  });

  describe('CLEANUP', function() {
    it('remove workorders', function() {
      workorderService.remove(data.workorders.CREATE);
      workorderService.remove(data.workorders.CANCEL);
      workorderService.remove(data.workorders.SEARCH);
      workorderService.remove(data.workorders.UPDATE2);
    });
    it('remove workers', function() {
      workerService.remove(data.workers.WORKER1);
      workerService.remove(data.workers.WORKER2);
    });
    it('remove workflows', function() {
      workflowService.remove(data.workflows.WORKFLOW1);
      workflowService.remove(data.workflows.WORKFLOW2);
    });
  });
});