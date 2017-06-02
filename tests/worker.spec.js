var scp = require('../pages/scheduler.po');
var mwp = require('../pages/worker/main.po');

var WorkerService = require('../utils/worker.so');
var workerService = new WorkerService();

var data = require('../data/workers.do');

var constants = require('../utils/constants');
var AuthService = require('../utils/auth.so');
var authService = new AuthService();

describe('Worker E2E', function() {

  before('login', function() {
    authService.openPortal();
    authService.loginPortal(constants.auth.usernames.TREVER_SMITH,
      constants.auth.DEFAULT_PASSWORD);
    authService.checkPortalLoginWasSuccessful();
  });

  describe('SETUP', function() {
    step('create workers', function() {
      workerService.create(data.workers.UPDATE1);
      workerService.create(data.workers.DELETE);
      workerService.create(data.workers.CANCEL);
      workerService.create(data.workers.SEARCH);
    });
  });

  describe('CREATE', function() {

    step('create an empty{} worker', function() {
      workerService.create({}, true);
    });
    step('required field warinigs shown', function() {
      workerService.expectWarningsPresent();
    });
    step('create new ' + data.params.WORKER_TCREATE + ' worker', function() {
      workerService.create(data.workers.CREATE);
    });
    step('check ' + data.params.WORKER_TCREATE + ' worker details', function() {
      workerService.expectDetailsToBe(data.workers.CREATE);
    });
    step('RAINCATCH-747: open schedule page', function() {
      scp.commands.sideClick();
      scp.commands.selfCheck();
    });
    step('RAINCATCH-747: open workers page', function() {
      mwp.commands.sideClick();
      mwp.commands.selfCheck();
    });
    step('check ' + data.params.WORKER_TCREATE + ' worker in list', function() {
      workerService.expectToBeInList(data.workers.CREATE);
    });
    xit('mobile App login as test worker', function() {
      // TODO
    });
  });

  describe('UPDATE', function() {
    step('update ' + data.params.WORKER_TUPDATE1 + ' worker details', function() {
      workerService.update(data.workers.UPDATE1, data.workers.UPDATE2);
    });
    step('check ' + data.params.WORKER_TUPDATE2 + ' worker details', function() {
      workerService.expectDetailsToBe(data.workers.UPDATE2);
    });
    step('RAINCATCH-747: open schedule page', function() {
      scp.commands.sideClick();
      scp.commands.selfCheck();
    });
    step('RAINCATCH-747: open workers page', function() {
      mwp.commands.sideClick();
      mwp.commands.selfCheck();
    });
    step('check ' + data.params.WORKER_TUPDATE2 + ' worker in list', function() {
      workerService.expectToBeInList(data.workers.UPDATE2);
    });
    step('check ' + data.params.WORKER_TUPDATE1 + ' worker not in list', function() {
      workerService.expectNotInTheList(data.workers.UPDATE1);
    });
    xit('mobile App login with new worker', function() {
      // TODO
    });
  });

  describe('CANCEL', function() {
    step('open ' + data.params.WORKER_TCANCEL + ' worker details', function() {
      workerService.open(data.workers.CANCEL);
    });
    step('press [delete] button', function() {
      workerService.pressDeleteButton();
    });
    step('press [cancel] button', function() {
      workerService.pressCancelButton();
    });
    step('check ' + data.params.WORKER_TCANCEL + ' worker in list', function() {
      workerService.expectToBeInList(data.workers.CANCEL);
    });
    xit('RAINCATCH-750: press [new] button', function() {
      workerService.pressNewButton();
    });
    xit('RAINCATCH-750: press [cancel] button', function() {
      workerService.pressNewCancelButton();
    });
    step('check [new] button visible', function() {
      workerService.expectNewButtonIsPresent();
    });
    step('open ' + data.params.WORKER_TCANCEL + ' worker details', function() {
      workerService.open(data.workers.CANCEL);
    });
    xit('RAINCATCH-750: press [edit] button', function() {
      workerService.pressEditButton();
    });
    xit('RAINCATCH-750: press [cancel] button', function() {
      workerService.pressNewCancelButton();
    });
    step('check ' + data.params.WORKER_TCANCEL + ' worker details', function() {
      workerService.expectDetailsToBe(data.workers.CANCEL);
    });
  });

  describe('SEARCH', function() {
    var searched;
    step('RAINCATCH-747: search field is visible and ' + data.params.WORKER_TSEARCH + 'is searched', function() {
      searched = workerService.search(data.workers.SEARCH); // RAINCATCH-747 search input is not reloading
      // other search mechanism is implemented for this test
    });
    step('check ' + data.params.WORKER_TSEARCH + ' worker in list', function() {
      workerService.expectElementDetailsEqualTo(searched, data.workers.SEARCH);
    });
    step('check ' + data.params.WORKER_TDELETE + ' worker not in list', function() {
      workerService.expectElementDetailsNotEqualTo(searched, data.workers.DELETE);
    });
    step('search reset to list all workers', function() {
      workerService.searchReset();
    });
  });

  describe('DELETE', function() {
    step('remove ' + data.params.WORKER_TDELETE + ' worker', function() {
      workerService.remove(data.workers.DELETE);
    });
    step('check ' + data.params.WORKER_TDELETE + ' worker not in list', function() {
      workerService.expectNotInTheList(data.workers.DELETE);
    });
    xit('mobile App login as test worker', function() {
      // TODO
    });
  });

  describe('CLEANUP', function() {
    step('remove workers', function() {
      workerService.remove(data.workers.CREATE);
      workerService.remove(data.workers.UPDATE2);
      workerService.remove(data.workers.CANCEL);
      workerService.remove(data.workers.SEARCH);
    });
  });
});