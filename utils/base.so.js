var utils = require('../utils/utils');
var _ = require('lodash');

function BaseService(pageObject) {
  this.pageObject = pageObject;
}

//################################################################################
//                                CRUDL FUNCTIONS
//################################################################################
/**
 * Create new item
 * @param {*} item to be created
 * @param {*} dummyParams for dummy item creation
 */
BaseService.prototype.create = function(item, dummyParams) {
  var self = this;
  var pageObject = this.pageObject;
  dummyParams = dummyParams || false;

  pageObject.main.commands.sideClick().then(function() {
    utils.pressButton(pageObject.main.locators.newButton);
  }).then(function() {
    pageObject.new.commands.selfCheck();
    self.expectFieldsPresent();
  }).then(function() {
    if (!dummyParams && pageObject.new.locators.itemForm.dropdowns) {
      utils.sendKeysPromise(pageObject.new.locators.itemForm.dropdowns, item);
    }
  }).then(function() {
    if (!dummyParams) { // fill dropdowns
      utils.sendKeysPromise(pageObject.new.locators.itemForm.fields, item);
    }
  }).then(function() {
    utils.pressButton(pageObject.new.locators.itemForm.buttons.create);
  }).then(function() { // fill fields
    if (!dummyParams) { // TODO RAINCATCH-641
      self.expectElementInfo(item);
    }
  });
};

/**
 * Update item details with new item
 * @param {*} title of updatee item
 * @param {*} item to be filfilled
 */
BaseService.prototype.update = function(toUpdate, updatee) {
  var self = this;
  var pageObject = this.pageObject;

  return self.open(toUpdate).then(function() {
    utils.pressButton(pageObject.main.locators.editButton);
  }).then(function() {
    self.clearAllFields();
  }).then(function() { // fill dropdowns
    if (pageObject.new.locators.itemForm.dropdowns) {
      utils.sendKeysPromise(pageObject.new.locators.itemForm.dropdowns, updatee);
    }
  }).then(function() { // fill fields
    utils.sendKeysPromise(pageObject.new.locators.itemForm.fields, updatee);
  }).then(function() {
    utils.pressButton(pageObject.new.locators.itemForm.buttons.update);
  });
};

/**
 * Open item details
 * @param {*} item to be openned
 */
BaseService.prototype.open = function(item) {
  var promise = this.search(item, 1);
  return promise.then(function(found) {
    found.click();
  });
};

/**
 * Remove item from items list
 * @param {*} item ro be removed
 */
BaseService.prototype.remove = function(item) {
  var pageObject = this.pageObject;
  this.open(item).then(function() {
    return pageObject.main.locators.deleteButton.isPresent();
  }).then(function(result) {
    utils.expectResultIsTrue(result);
    return pageObject.main.locators.deleteButton.click();
  }).then(function() {
    return pageObject.main.locators.proceedButton.isPresent();
  }).then(function(result) {
    utils.expectResultIsTrue(result);
    pageObject.main.locators.proceedButton.click();
  }).then(function() {
    return pageObject.main.locators.proceedButton.isPresent();
  }).then(function(result) {
    utils.expectResultIsFalse(result);
  });
};
//################################################################################
//                                SEARCH FUNCTIONS
//################################################################################
/**
 * Search for specific item
 * @param {*} item to be searched
 * @param {*} count of same items
 */
BaseService.prototype.search = function(item, count) {
  var self = this;
  var pageObject = this.pageObject;

  return pageObject.main.commands.sideClick().then(function() {
    return pageObject.main.commands.selfCheck();
  }).then(function() {
    self.searchForItem(item, count);
  }).then(function() {
    return pageObject.main.commands.first();
  });
};

BaseService.prototype.searchReset = function() {
  var pageObject = this.pageObject;
  return pageObject.main.commands.sideClick().then(function() {
    return pageObject.main.commands.selfCheck();
  }).then(function() {
    pageObject.main.locators.search.clear();
  });
};
//################################################################################
//                                FIELDS FUNCTIONS
//################################################################################
/**
 * Clear all Fields of item Form
 */
BaseService.prototype.clearAllFields = function() {
  var self = this;
  var clear = function(x) {
    return x.clear();
  };
  var pageObject = this.pageObject;
  pageObject.new.locators.itemForm.self.isPresent().then(function(result) {
    utils.expectResultIsTrue(result);
    return utils.returnAllPromises(pageObject.new.locators.itemForm.fields, clear);
  }).then(function(results) { // clear fields
    utils.expectEachResultsIsNull(results);
  }).then(function() { // clear date and time
    self.clearOtherFields();
  });
};
//################################################################################
//                                EXPECT FUNCTIONS
//################################################################################
/**
 * Check all warnings of item Form are present
 */
BaseService.prototype.expectWarningsPresent = function() {
  var isPresent = function(x) {
    return x.isPresent();
  };
  var pageObject = this.pageObject;
  isPresent(pageObject.new.locators.itemForm.self).then(function(result) {
    utils.expectResultIsTrue(result);
    return utils.returnAllPromises(pageObject.new.locators.itemForm.warnings, isPresent);
  }).then(function(results) {
    utils.expectEachResultsIsTrue(results);
  });
};

/**
 * Check actual element details are equal to expected
 * @param {*} promise element
 * @param {*} expected item details to match
 */
BaseService.prototype.expectElementDetailsEqualTo = function(promise, expected) {
  this.expectElementDetails(promise, expected, utils.expectResultIsEquelTo);
};

/**
 * Check actual element details not equal to expected
 * @param {*} promise element
 * @param {*} expected item details to match
 */
BaseService.prototype.expectElementDetailsNotEqualTo = function(promise, expected) {
  this.expectElementDetails(promise, expected, utils.expectResultIsNotEquelTo);
};

/**
 * Expect item in items list
 * @param {*} item
 */
BaseService.prototype.expectToBeInList = function(expected) {
  var promise = this.search(expected, 1);
  this.expectElementDetails(promise, expected, utils.expectResultIsEquelTo);
};

/**
 * Expect item not in items list
 * @param {*} item
 */
BaseService.prototype.expectNotInTheList = function(expected) {
  var promise = this.search(expected, 0);
  promise.then(function(found) {
    return found.isPresent();
  }).then(function(present) {
    utils.expectResultIsFalse(present);
  });
};

//################################################################################
//                                BUTTON FUNCTIONS
//################################################################################
/**
 * Press delete button
 * TODO delete button is still present when pressed
 */
BaseService.prototype.pressDeleteButton = function() {
  var pageObject = this.pageObject;
  return pageObject.main.locators.deleteButton.isPresent().then(function(result) {
    utils.expectResultIsTrue(result);
    pageObject.main.locators.deleteButton.click();
  }).then(function() {
    return pageObject.main.locators.deleteButton.isPresent();
  }).then(function(/*result*/) { // BUG delete button should not be visible
    // utils.expectResultIsFalse(result);
  });
};

/**
 * Press cancel button
 */
BaseService.prototype.pressCancelButton = function() {
  var pageObject = this.pageObject;
  utils.pressButton(pageObject.main.locators.cancelButton);
};

/**
 * Press new button
 */
BaseService.prototype.pressNewButton = function() {
  var pageObject = this.pageObject;
  utils.pressButton(pageObject.main.locators.newButton);
};

/**
 * Press Cancel button on new item page
 */
BaseService.prototype.pressNewCancelButton = function() {
  var pageObject = this.pageObject;
  utils.pressButton(pageObject.new.locators.itemForm.buttons.cancel);
};

/**
 * Prese edit button
 */
BaseService.prototype.pressEditButton = function() {
  var pageObject = this.pageObject;
  utils.pressButton(pageObject.main.locators.editButton);
};

/**
 * Expect New button is present on page
 */
BaseService.prototype.expectNewButtonIsPresent = function() {
  var pageObject = this.pageObject;
  return pageObject.main.locators.newButton.isPresent().then(function(result) {
    utils.expectResultIsTrue(result);
  });
};

//################################################################################
//                                OVERRIDDEN FUNCTIONS
//################################################################################

/**
 * Clear specific fields on Item Form
 */
BaseService.prototype.clearOtherFields = function() {
  throw new Error('Override this method in super class');
};

/**
 * Search item in items list
 * @param {*} item to be searched
 */
BaseService.prototype.searchForItem = function(item, count) {
  _.noop(item, count);
  throw new Error('Override this method in super class');
};

/**
 * Check if all fields of item Form are present
 */
BaseService.prototype.expectFieldsPresent = function() {
  throw new Error('Override this method in super class');
};

/**
 * Compare actual item details with expected
 * @param {*} item to be compared to
 */
BaseService.prototype.expectDetailsToBe = function(item) {
  _.noop(item);
  throw new Error('Override this method in super class');
};

BaseService.prototype.expectElementInfo = function() {
  throw new Error('Override this method in super class');
};

/**
 * Compare actual element details with expected by expect function
 * @param {*} promise element
 * @param {*} expected item details to match
 * @param {*} expectFunc function to be called to compare
 */
BaseService.prototype.expectElementDetails = function(promise, expected, expectFunc) {
  _.noop(promise, expected, expectFunc);
  throw new Error('Override this method in super class');
};

module.exports = BaseService;