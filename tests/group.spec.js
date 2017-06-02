var GroupService = require('../utils/group.so');
var groupService = new GroupService();

var WorkerService = require('../utils/worker.so');
var workerService = new WorkerService();

var data = require('../data/groups.do');

var constants = require('../utils/constants');
var AuthService = require('../utils/auth.so');
var authService = new AuthService();

describe('Group E2E', function() {

  before('login', function() {
    authService.openPortal();
    authService.loginPortal(constants.auth.usernames.TREVER_SMITH,
      constants.auth.DEFAULT_PASSWORD);
    authService.checkPortalLoginWasSuccessful();
  });

  describe('SETUP', function() {
    step('create groups', function() {
      groupService.create(data.groups.UPDATE1);
      groupService.create(data.groups.DELETE);
      groupService.create(data.groups.CANCEL);
      groupService.create(data.groups.SEARCH);
      groupService.create(data.groups.ADD);
    });
  });

  describe('CREATE', function() {

    step('create an empty{} group', function() {
      groupService.create({}, true);
    });
    step('required field warinigs shown', function() {
      groupService.expectWarningsPresent();
    });
    step('create new ' + data.params.GROUP_TCREATE + ' group', function() {
      groupService.create(data.groups.CREATE);
    });
    xit('RAINCATCH-793: expect ' + data.params.GROUP_TCREATE + ' group details', function() {
      groupService.expectDetailsToBe(data.groups.CREATE);
    });
    step('expect ' + data.params.GROUP_TCREATE + ' group in list', function() {
      groupService.expectToBeInList(data.groups.CREATE);
    });
  });

  describe('UPDATE', function() {
    step('update ' + data.params.GROUP_TUPDATE1 + ' group details', function() {
      groupService.update(data.groups.UPDATE1, data.groups.UPDATE2);
    });
    xit('RAINCATCH-793: check ' + data.params.GROUP_TUPDATE2 + ' group details', function() {
      groupService.expectDetailsToBe(data.groups.UPDATE2);
    });
    step('check ' + data.params.GROUP_TUPDATE2 + ' group in list', function() {
      groupService.expectToBeInList(data.groups.UPDATE2);
    });
    step('check ' + data.params.GROUP_TUPDATE1 + ' group not in list', function() {
      groupService.expectNotInTheList(data.groups.UPDATE1);
    });
  });

  describe('CANCEL', function() {
    step('open ' + data.params.GROUP_TCANCEL + ' group details', function() {
      groupService.open(data.groups.CANCEL);
    });
    step('press [delete] button', function() {
      groupService.pressDeleteButton();
    });
    step('press [cancel] button', function() {
      groupService.pressCancelButton();
    });
    step('check ' + data.params.GROUP_TCANCEL + ' group in list', function() {
      groupService.expectToBeInList(data.groups.CANCEL);
    });
    step('press [new] button', function() {
      groupService.pressNewButton();
    });
    step('press [cancel] button', function() {
      groupService.pressNewCancelButton();
    });
    step('check [new] button visible', function() {
      groupService.expectNewButtonIsPresent();
    });
    step('open ' + data.params.GROUP_TCANCEL + ' group details', function() {
      groupService.open(data.groups.CANCEL);
    });
    step('press [edit] button', function() {
      groupService.pressEditButton();
    });
    step('press [cancel] button', function() {
      groupService.pressNewCancelButton();
    });
    xit('RAINCATCH-793: check ' + data.params.GROUP_TCANCEL + ' group details', function() {
      groupService.expectDetailsToBe(data.groups.CANCEL);
    });
  });

  describe('SEARCH', function() {
    var searched;
    step('search field is visible and ' + data.params.GROUP_TSEARCH + 'is searched', function() {
      searched = groupService.search(data.groups.SEARCH, 1);
    });
    step('check ' + data.params.GROUP_TSEARCH + ' group in list', function() {
      groupService.expectElementDetailsEqualTo(searched, data.groups.SEARCH);
    });
    step('check ' + data.params.GROUP_TDELETE + ' group not in list', function() {
      groupService.expectElementDetailsNotEqualTo(searched, data.groups.DELETE);
    });
    step('search reset to list all groups', function() {
      groupService.searchReset();
    });
  });

  describe('ADD WORKER TO GROUP', function() {
    step('create test worker', function() {
      workerService.create(data.workers.ADD);
    });
    step('open test group', function() {
      groupService.open(data.groups.ADD);
    });
    step('verify test worker is in list of test group', function() {
      groupService.verifyWorkerInList(data.workers.ADD);
    });
    step('remove test worker', function() {
      workerService.remove(data.workers.ADD);
    });
    step('open test group', function() {
      groupService.open(data.groups.ADD);
    });
    step('verify test worker is not in list of test group', function() {
      groupService.verifyWorkerNotInList(data.workers.ADD);
    });
  });

  describe('DELETE', function() {
    step('remove ' + data.params.GROUP_TDELETE + ' group', function() {
      groupService.remove(data.groups.DELETE);
    });
    step('check ' + data.params.GROUP_TDELETE + ' group not in list', function() {
      groupService.expectNotInTheList(data.groups.DELETE);
    });
  });

  describe('CLEANUP', function() {
    step('remove groups', function() {
      groupService.remove(data.groups.CREATE);
      groupService.remove(data.groups.UPDATE2);
      groupService.remove(data.groups.CANCEL);
      groupService.remove(data.groups.SEARCH);
      groupService.remove(data.groups.ADD);
    });
  });
});