var constants = require('./constants');
/**
 * Used to get the abbreviation of a month
 *
 * @param date - date object
 * @returns {string} - i.e. 'Jan'
 */
module.exports.getMonthAbbreviation = function(date) {
  var monthsAbr = constants.monthsAbbreviations;
  return monthsAbr[date.getMonth()];
};

/**
 * Used to get the month label as defined as "month year"
 *
 * @param date - date object
 * @returns {string} - i.e. "Jan 2017"
 */
module.exports.getMonthLabel = function(date) {
  return this.getMonthAbbreviation(date) + " " + date.getFullYear();
};

/**
 * Used to get the full text name of a month
 *
 * @param date - date object
 * @returns {string} - i.e. "January"
 */
module.exports.getMonthText = function(date) {
  var monthsText = constants.months;
  return monthsText[date.getMonth()];
};

/**
 * Used to get the text name of a day
 *
 * @param date - date object
 * @returns {string} - i.e. "Saturday"
 */
module.exports.getDayText = function(date) {
  var days = constants.days;
  return days[date.getDay()];
};

/**
 * Used to get a textual representation of "day month date year"
 *
 * @param date - date object
 * @returns {string} - i.e. "Friday April 7 2017"
 */
module.exports.getDayMonthDateYear = function(date) {
  return this.getDayText(date) + " " + this.getMonthText(date) + " " +
    date.getDate() + " " + date.getFullYear();
};


/**
 * Used to get a textual representation of a date defined as "year/month/day"
 *
 * @param date - date object
 * @returns {string}
 */
module.exports.getFullDateBigEndian = function(date) {
  return date.getFullYear() + "/" + this.getMonth(date) + "/" + date.getDate();
};

/**
 * Used to get a textual representation of a date defined as "month/date/year"
 *
 * @param date - date object
 * @returns {string} - i.e. "1/31/2017"
 */
module.exports.getFullDateLittleEndian = function(date) {
  return this.getMonth(date) + "/" + date.getDate() + "/" + date.getFullYear();
};

/**
 * Used to get a textual representation of a date defined as "date/month/year"
 *
 * @param date - date object
 * @returns {string} - i.e. "31/1/2017"
 */
module.exports.getFullDateMiddleEndian = function(date) {
  return date.getDate() + "/" + this.getMonth(date) + "/" + date.getFullYear();
};

/**
 * Used to get the date in a specified format
 *
 * @param date - date item
 * @param dateFormat - The format type for the returned date
 * @returns {string} -  Date in specified format or an error
 */
module.exports.getDateInFormat = function(date, dateFormat) {
  var constants = require('./constants');
  switch (dateFormat) {
  case constants.dateFormat.BIG_ENDIAN:
    return this.getFullDateBigEndian(date);
  case constants.dateFormat.LITTLE_ENDIAN:
    return this.getFullDateLittleEndian(date);
  case constants.dateFormat.MIDDLE_ENDIAN:
    return this.getFullDateMiddleEndian(date);
  default:
    throw Error('Error: Invalid date format passed. See /utils/constants.js' +
      ' dateFormat for available types of date format');
  }
};

/**
 * Used to get the current day date in format expected by protractor
 *
 * @param date - date object
 * @returns {string} - i.e. "21"
 */
module.exports.getDayDate = function(date) {
  return date.getDate().toString();
};

/**
 * Used to get current month number in a format expected by protractor
 *
 * @param date - date object
 * @returns {string} - i.e. "12"
 */
module.exports.getMonth = function(date) {
  return (date.getMonth() + 1).toString();
};

/**
 * Used to tell if a date is in the first or second half of the month
 *
 * @param date - date object
 * @returns {boolean} - true if we are in first 14 days of month
 */
module.exports.isFirstHalfOfMonth = function(date) {
  return date.getDate() < 15 ? true : false;
};

/**
 * Used to create a new date, offset from a date supplied by a specified amount
 * of days
 *
 * @param date - Date object
 * @param daysOffset - the amount of days to offset the new date from the date supplied
 * @returns {Date} - the new Date object representing the new date
 */
module.exports.createNewDate = function(date, daysOffset) {
  var newDate = new Date(date);
  newDate.setDate(newDate.getDate() + daysOffset);
  return newDate;
};

/**
 * Used to create a new date based on whether it is the first or second half of
 * a month. Adds the offset if in the first half of the month, takes the offset
 * away if in the second half of the month
 *
 * @param date - Date object
 * @param daysOffset - the amount of days to offset the new date from the date supplied
 * @returns {Date} - the new Date object representing the new date
 */
module.exports.determineNewDate = function(date, daysOffset) {
  return this.isFirstHalfOfMonth(date) ? this.createNewDate(date, daysOffset) : this.createNewDate(date, -(daysOffset));
};
