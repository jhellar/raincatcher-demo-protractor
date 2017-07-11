var schedulerPage = require('../pages/scheduler.po');
var navigationTab = require('../pages/navigation.po');
var utils = require('../utils');
var dateUtil = require('../utils/date');
var constants = require('../utils/constants');
var AuthService = require('./auth.so');
var authService = new AuthService();

/**
 * Used to open the Scheduler section of the portal and check if we can see if
 * the expected elements are present
 */
module.exports.openScheduler = function() {
  navigationTab.navigateTo.schedulerPage();
  utils.wait.until(schedulerPage.locators.toolbar);
  utils.check.elementsArePresent([ schedulerPage.locators.header,
    schedulerPage.locators.datePicker,
    schedulerPage.locators.openCalendarIconButton,
    schedulerPage.locators.openCalendarTriangleButton,
    schedulerPage.locators.workOrdersList ]);
};

/**
 * Used to read the date from the datepicker element and check that it is equal
 * to an expected date
 *
 * @param date - date object that is expected the datepicker to display
 */
module.exports.readDatePicker = function(date, dateFormat) {
  utils.wait.until(schedulerPage.locators.datePicker);
  utils.check.elementVisibilityAndAttributeValue(schedulerPage.locators.datePicker,
    "value", dateUtil.getDateInFormat(date, dateFormat));
};

/**
 * Used to open the calendar pane in the Scheduler section either using the icon
 * or triangle buttons
 *
 * @param constantValue - constant value
 */
module.exports.openCalendar = function(constantValue) {
  switch (constantValue) {
  case constants.schedule.schedulerCalendarButton.ICON:
    schedulerPage.commands.openCalendarWithIcon();
    break;
  case constants.schedule.schedulerCalendarButton.TRIANGLE:
    schedulerPage.commands.openCalendarWithTriangleButton();
    break;
  default:
    throw Error("Error: illegal value entered. Use values from" +
      " schedulerCalendarButton in /utils/constants.js");
  }
  utils.wait.until(schedulerPage.locators.calendarPane);
};

/**
 * Used to select a new date from the calendar pane
 *
 * @param newDateObject - the new date to select in calendar
 */
module.exports.selectNewDateInCalendar = function(newDateObject) {
  var newDayMonthDateYear = dateUtil.getDayMonthDateYear(newDateObject);
  var locator = schedulerPage.commands.createNewDateLocator(newDayMonthDateYear);
  utils.wait.until(locator);
  locator.click();
};

/**
 * Used to check that we can see the calendar elements and that the values found
 * are equal to what is expected
 *
 * @param currentDateDateObject
 * @param selectedDayDateObject
 */
module.exports.checkCalendar = function(currentDateDateObject, selectedDayDateObject) {
  var currentAndSelectedDays = [ schedulerPage.locators.calendarCurrentDay,
    schedulerPage.locators.calendarSelectedDate ];
  var expectedValues = [ dateUtil.getDayDate(currentDateDateObject),
    dateUtil.getDayDate(selectedDayDateObject) ];
  utils.wait.until(currentAndSelectedDays[0]);
  utils.check.elementsArePresent(currentAndSelectedDays);
  utils.check.valuesAreCorrect(currentAndSelectedDays, expectedValues);
  schedulerPage.commands.chooseCalendarPaneDate(schedulerPage.locators.calendarSelectedDate);
};

/**
 * Used to check can we see the workorders panel elements such as the heading
 * and the workorders list
 *
 * @param expectedListSize - The expected number of elements in the workorders list
 */
module.exports.checkWorkordersList = function(expectedListSize) {
  utils.wait.until(schedulerPage.locators.workOrdersList);
  utils.check.elementVisibilityAndValue(schedulerPage.locators.workOrderListHeading,
    schedulerPage.locators.workOrdersListHeadingValue);
  utils.check.listSize(schedulerPage.locators.workOrdersListItems, expectedListSize);
};

/**
 * Used to get a specific workorder from the workorders list and check its title
 *
 * @param index - The index of the workorder in the workorders list
 * @param expectedValue - The expected title of the workorder
 */
module.exports.readWorkOrderListItem = function(index, expectedValue) {
  utils.wait.until(schedulerPage.locators.workOrdersList);
  utils.getAndCheckListItemTextValue(schedulerPage.locators.workOrdersListItems,
    index, expectedValue);
};

/**
 * Used to implement drag and drop functionality from workorders list to the
 * scheduler time panel
 *
 * @param workorderItemLocatorIndex - The index of the workorder in workorders list
 * @param workerIndex - number corresponding to selector index for workers
 * @param timeIndex - number corresponding to selector index for time
 */
module.exports.dragWorkorderToSchedule = function(workorderItemLocatorIndex, workerIndex, timeIndex) {
  var tableElementLocator = schedulerPage.commands.createTableElementLocator(workerIndex, timeIndex);
  utils.dragAndDrop(schedulerPage.locators.workOrdersListItems.get(workorderItemLocatorIndex),
    tableElementLocator);
};

/**
 * Used to implement drag and drop functionality from the scheduler time table
 * to the workorders list
 *
 * @param workorderId - id of the workorder chip to move
 */
module.exports.dragWorkorderToWorkorderList = function(workorderId) {
  var workorderLocator = schedulerPage.commands.createWorkorderLocator(workorderId);
  utils.wait.until(workorderLocator);
  utils.dragAndDrop(workorderLocator, schedulerPage.locators.workOrdersList);
};

/**
 * Used to reschedule a workorder by dragging and dropping from one element on
 * the table to another
 *
 * @param workorderId - id of the workorder
 * @param workerIndex - number corresponding to selector index for workers
 * @param timeIndex - number corresponding to selector index for time
 */
module.exports.rescheduleWorkorder = function(workorderId, workerIndex, timeIndex) {
  var tableElementLocator = schedulerPage.commands.createTableElementLocator(workerIndex, timeIndex);
  var workorderLocator = schedulerPage.commands.createWorkorderLocator(workorderId);
  utils.dragAndDrop(workorderLocator, tableElementLocator);
};

/**
 * Used to change date in date picker by changing date
 *
 * @param date - date object
 * @param dateFormat - date format constant
 */
module.exports.changeDatepicker = function(date, dateFormat) {
  var newDate = dateUtil.getDateInFormat(date, dateFormat);
  schedulerPage.locators.datePicker.clear().sendKeys(newDate);
};

/**
 * Navigate away from schedulerPage page. Destination is logout page
 */
module.exports.navigateAway = function() {
  authService.navigateToPortalLogoutPage();
};