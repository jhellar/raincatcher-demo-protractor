var schedulerCrudl = require('../utils/scheduler.crudl');
var dateUtil = require('../utils/date.utils');
var data = require('../data/scheduler.do');
var constants = require('../utils/constants');
var AuthService = require('../utils/auth.so');
var authService = new AuthService();

describe('testing scheduler functionality in demo app', function() {
  var currentDate = new Date();
  var newDate = dateUtil.determineNewDate(currentDate, 2);
  var dateFormat = constants.dateFormat.LITTLE_ENDIAN; // Change this line to required date format

  before('login to the portal app', function() {
    authService.openPortal();
    authService.loginPortal(constants.auth.usernames.TREVER_SMITH,
      constants.auth.DEFAULT_PASSWORD);
    authService.checkPortalLoginWasSuccessful();
  });

  after('logout of portal app', function() {
    authService.navigateToPortalLogoutPage();
    authService.logoutOfPortal();
  });

  describe('Test Datepicker Interactions', function() {
    describe('Test Case - Read date from datepicker', function() {
      step('check the current date from the date picker', function() {
        schedulerCrudl.readDatePicker(currentDate, dateFormat);
      });
    });

    describe('Test Case - change date picker date', function() {
      step('should change the date picker date', function() {
        schedulerCrudl.changeDatepicker(newDate, dateFormat);
      });

      step('should show datepicker is new date', function() {
        schedulerCrudl.readDatePicker(newDate, dateFormat);
      });
    });
  });

  describe('Test Calendar Pane Interactions', function() {
    before('navigate away and bcak', function() {
      schedulerCrudl.navigateAway();
      schedulerCrudl.openScheduler();
    });

    describe('Test Case - Open the calendar with icon button and check current day is correct', function() {
      step('should open the calendar using the triangle button', function() {
        schedulerCrudl.openCalendar(constants.schedule.schedulerCalendarButton.ICON);
      });

      step('should check the current day is correct', function() {
        schedulerCrudl.checkCalendar(currentDate, currentDate);
      });
    });

    describe('Test Case - Open the calendar with triangle button and check current day is correct', function() {
      step('should open the calendar using the triangle button', function() {
        schedulerCrudl.openCalendar(constants.schedule.schedulerCalendarButton.TRIANGLE);
      });

      step('should check the current day is correct', function() {
        schedulerCrudl.checkCalendar(currentDate, currentDate);
      });
    });

    describe('Test Case - Selecting new date from the calendar', function() {
      step('should open the calendar', function() {
        schedulerCrudl.openCalendar(constants.schedule.schedulerCalendarButton.ICON);
      });

      step('calendar date should equal current date', function() {
        schedulerCrudl.checkCalendar(currentDate, currentDate);
      });

      step('should open the calendar', function() {
        schedulerCrudl.openCalendar(constants.schedule.schedulerCalendarButton.ICON);
      });

      step('should select a new date from the calendar', function() {
        schedulerCrudl.selectNewDateInCalendar(newDate);
      });

      step('new date should be displayed in datepicker', function() {
        schedulerCrudl.readDatePicker(newDate, dateFormat);
      });

      step('should open the calendar', function() {
        schedulerCrudl.openCalendar(constants.schedule.schedulerCalendarButton.ICON);
      });

      step('new date should be selected on the calendar', function() {
        schedulerCrudl.checkCalendar(currentDate, newDate);
      });
    });
  });

  describe('Test Workorder List Interactions', function() {
    before('navigate away and bcak', function() {
      schedulerCrudl.navigateAway();
      schedulerCrudl.openScheduler();
    });

    describe('Test Case - Check workorderlist size', function() {
      step('can read the number of workerders', function() {
        schedulerCrudl.checkWorkordersList(1);
      });
    });

    describe('Test Case - Can read a workorder list item', function() {
      step('can read a workorder list item', function() {
        schedulerCrudl.readWorkOrderListItem(0, data.workorder.NAME);
      });
    });
  });

  describe('Test Drag & Drop Functionality', function() {
    before('navigate away and bcak', function() {
      schedulerCrudl.navigateAway();
      schedulerCrudl.openScheduler();
    });

    describe('Test Case - Can drag and drop a workorder from list to table', function() {
      step('should be one item in the workorder list', function() {
        schedulerCrudl.checkWorkordersList(1);
      });

      step('should be able to drag a workorder to a specified time in the table for a particular worker', function() {
        schedulerCrudl.dragWorkorderToSchedule(0, data.workers.MAX_A_MILLION, data.times.SEVEN_AM);
      });

      step('should be no items in the workorder list', function() {
        schedulerCrudl.checkWorkordersList(0);
      });
    });

    describe('Test Case - reschedule workorder time', function() {
      step('should be able to drag a scheduled workorder to a new specified time in the table for a particular worker', function() {
        schedulerCrudl.rescheduleWorkorder(data.workorder.ID, data.workers.MAX_A_MILLION, data.times.THREE_PM);
      });
    });

    describe('Test Case - change workorder worker', function() {
      step('should be able to drag a scheduled workorder from a worker to a new worker', function() {
        schedulerCrudl.rescheduleWorkorder(data.workorder.ID, data.workers.DANNY_DOORMAN, data.times.THREE_PM);
      });
    });

    describe('Test Case - Can drag and drop workorder from table to list', function() {
      step('should be no items in the workorder list', function() {
        schedulerCrudl.checkWorkordersList(0);
      });

      step('should be able to drag a workorder to workorders list from table', function() {
        schedulerCrudl.dragWorkorderToWorkorderList(data.workorder.ID);
      });

      step('should be one items in the workorder list', function() {
        schedulerCrudl.checkWorkordersList(1);
      });
    });
  });
});
