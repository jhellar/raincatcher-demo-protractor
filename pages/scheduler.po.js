var consts = require('../utils/constants');
var utils = require('../utils');

var SchedulerPage = function() {
  /**
   *  The complete set of locators associated with the scheduler page
   */
  var locators = {
    header: element(by.css('.md-toolbar-tools h3 span')),
    toolbar: element(by.css('md-toolbar')),
    datePicker: element(by.css('.md-datepicker-input')),
    invalidDatepicker: element(by.css('.md-datepicker-invalid')),
    calendarPane: element(by.css('.md-datepicker-calendar-pane')),
    openCalendarIconButton: element(by.css('.md-datepicker-calendar-icon')),
    openCalendarTriangleButton: element(by.css('button[aria-label="Open calendar"]')),
    calendarCurrentDay: element(by.css('.md-calendar-date-today')),
    calendarSelectedDate: element(by.css('.md-calendar-selected-date')),
    workOrdersList: element(by.id('workorders-list')),
    workOrderListHeading: element(by.id('workorders-list')).element(by.css('.md-subhead')),
    workOrdersListItems: element(by.id('workorders-list')).all(by.css('schedule-workorder-chip')),
    workOrdersListHeadingValue: "Workorders",

    sideMenuButton: element(by.css('md-sidenav>md-list button[aria-label$="Scheduler"]'))
  };

  /**
   * Actions that are specific to elements only found on the scheduler page
   */
  var commands = {
    sideClick: function() {
      utils.ui.navigateToSection();
      return locators.sideMenuButton.click();
    },
    selfCheck: function() {
      return browser.getLocationAbsUrl().then(function(result) {
        utils.expect.resultIsEquelTo(result, consts.schedule.URL);
        return locators.header.isPresent();
      }).then(function(result) {
        utils.expect.resultIsTrue(result);
        return locators.toolbar.isPresent();
      }).then(function(result) {
        utils.expect.resultIsTrue(result);
        return locators.datePicker.isPresent();
      }).then(function(result) {
        utils.expect.resultIsTrue(result);
      });
    },
    openCalendarWithIcon: function() {
      locators.openCalendarIconButton.click();
    },
    openCalendarWithTriangleButton: function() {
      locators.openCalendarTriangleButton.click();
    },
    chooseCalendarPaneDate: function(locator) {
      locator.click();
    },
    createTableElementLocator: function(workerIndex, timeIndex) {
      var selector = '.wfm-scheduler-calendar table tbody tr:nth-child(' + workerIndex + ') td:nth-child(' + timeIndex + ')';
      return element(by.css(selector));
    },
    createNewDateLocator: function(newDayMonthDateYear) {
      var selector = '[aria-label="' + newDayMonthDateYear + '"]';
      return locators.calendarPane.element(by.css(selector));
    },
    createWorkorderLocator: function(workorderId) {
      return element(by.id(workorderId));
    }
  };

  return {
    locators, commands
  };
};

module.exports = SchedulerPage();