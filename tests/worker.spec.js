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

  context('CREATE', function() {
    it('create an empty{} worker', function() {
      workerService.create({}, true);
    });
    it('required field warinigs shown', function() {
      workerService.expectWarningsPresent();
    });
    it('create ' + data.params.WORKER_TCREATE + ' worker', function() {
      workerService.create(data.workers.CREATE);
    });
    it('check ' + data.params.WORKER_TCREATE + ' worker details', function() {
      workerService.expectDetailsToBe(data.workers.CREATE);
    });
    it('check ' + data.params.WORKER_TCREATE + ' worker in list', function() {
      workerService.expectToBeInList(data.workers.CREATE);
    });
    xit('mobile App login as test worker', function() {
      // TODO
    });
    after('remove ' + data.params.WORKER_TCREATE + ' worker', function() {
      workerService.remove(data.workers.CREATE);
    });
  });

  context('UPDATE', function() {
    before('create ' + data.params.WORKER_TUPDATE1 + ' worker', function() {
      workerService.create(data.workers.UPDATE1);
    });
    it('update ' + data.params.WORKER_TUPDATE1 + ' worker details', function() {
      workerService.update(data.workers.UPDATE1, data.workers.UPDATE2);
    });
    it('check ' + data.params.WORKER_TUPDATE2 + ' worker details', function() {
      workerService.expectDetailsToBe(data.workers.UPDATE2);
    });
    it('check ' + data.params.WORKER_TUPDATE2 + ' worker in list', function() {
      workerService.expectToBeInList(data.workers.UPDATE2);
    });
    it('check ' + data.params.WORKER_TUPDATE1 + ' worker not in list', function() {
      workerService.expectNotInTheList(data.workers.UPDATE1);
    });
    xit('mobile App login with new worker', function() {
      // TODO
    });
    after('remove ' + data.params.WORKER_TUPDATE2 + ' worker', function() {
      workerService.remove(data.workers.UPDATE2);
    });
  });

  context('CANCEL', function() {
    before('create ' + data.params.WORKER_TCANCEL + ' worker', function() {
      workerService.create(data.workers.CANCEL);
    });
    it('open ' + data.params.WORKER_TCANCEL + ' worker details', function() {
      workerService.open(data.workers.CANCEL);
    });
    it('press [delete] button', function() {
      workerService.pressDeleteButton();
    });
    it('press [cancel] button', function() {
      workerService.pressCancelButton();
    });
    it('check ' + data.params.WORKER_TCANCEL + ' worker in list', function() {
      workerService.expectToBeInList(data.workers.CANCEL);
    });
    it('RAINCATCH-750: press [new] button', function() {
      workerService.pressNewButton();
    });
    it('RAINCATCH-750: press [cancel] button', function() {
      workerService.pressNewCancelButton();
    });
    it('check [new] button visible', function() {
      workerService.expectNewButtonIsPresent();
    });
    it('open ' + data.params.WORKER_TCANCEL + ' worker details', function() {
      workerService.open(data.workers.CANCEL);
    });
    it('RAINCATCH-750: press [edit] button', function() {
      workerService.pressEditButton();
    });
    it('RAINCATCH-750: press [cancel] button', function() {
      workerService.pressNewCancelButton();
    });
    it('check ' + data.params.WORKER_TCANCEL + ' worker details', function() {
      workerService.expectDetailsToBe(data.workers.CANCEL);
    });
    after('remove ' + data.params.WORKER_TCANCEL + ' worker', function() {
      workerService.remove(data.workers.CANCEL);
    });
  });

  context('SEARCH', function() {
    var searched;
    before('create ' + data.params.WORKER_TSEARCH + ' worker', function() {
      workerService.create(data.workers.SEARCH);
    });
    it('RAINCATCH-747: search field is visible and ' + data.params.WORKER_TSEARCH + 'is searched', function() {
      searched = workerService.search(data.workers.SEARCH); // RAINCATCH-747 search input is not reloading
      // other search mechanism is implemented for this test
    });
    it('check ' + data.params.WORKER_TSEARCH + ' worker in list', function() {
      workerService.expectElementDetailsEqualTo(searched, data.workers.SEARCH);
    });
    it('check ' + data.params.WORKER_TDELETE + ' worker not in list', function() {
      workerService.expectElementDetailsNotEqualTo(searched, data.workers.DELETE);
    });
    it('search reset to list all workers', function() {
      workerService.searchReset();
    });
    after('remove ' + data.params.WORKER_TSEARCH + ' worker', function() {
      workerService.remove(data.workers.SEARCH);
    });
  });

  context('DELETE', function() {
    before('create ' + data.params.WORKER_TDELETE + ' worker', function() {
      workerService.create(data.workers.DELETE);
    });
    it('remove ' + data.params.WORKER_TDELETE + ' worker', function() {
      workerService.remove(data.workers.DELETE);
    });
    it('check ' + data.params.WORKER_TDELETE + ' worker not in list', function() {
      workerService.expectNotInTheList(data.workers.DELETE);
    });
    xit('mobile App login as test worker', function() {
      // TODO
    });
  });
});