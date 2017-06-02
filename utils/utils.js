var _ = require('lodash');

var EC = protractor.ExpectedConditions;
var dragAndDropUtil = require('html-dnd').code;

module.exports.waitNotPresent = function(selector) {
  var elm = $(selector);
  return browser.wait(function() {
    return browser.isElementPresent(elm) //if element is already present, this line will evaluate to true
      .then(function(present) {
        return !present;
      }); // this modifies the previous line so that it evaluates to false until the element is no longer present
  }, 30000);
};

var waitPresent = function(selector) {
  var elm = $(selector);
  browser.wait(function() {
    return browser.isElementPresent(elm);
  }, 30000);
  expect(browser.isElementPresent(elm)).eventually.to.be.true;
};

var waitNotPresent = function(selector) {
  var elm = $(selector);
  return browser.wait(function() {
    return browser.isElementPresent(elm) //if element is already present, this line will evaluate to true
      .then(function(present) {
        return !present;
      }); // this modifies the previous line so that it evaluates to false until the element is no longer present
  }, 30000);
};

/**
 *
 * @param locator - any locator used to select an element
 * @param time - time in ms to wait
 */
var waitUntilClickable = function(locator, time) {
  time = time || 2000;
  browser.wait(EC.elementToBeClickable(locator), time);
};

/**
 *
 * @param locator - any locator used to select an element
 * @param time - time in ms to wait (default 2000)
 */
var waitUntilPresent = function(locator, time) {
  time = time || 2000;
  var message = "waiting for "  + time + "ms for" + locator.locator().toString() + "to be present";
  browser.wait(EC.presenceOf(locator), time, message);
  expect(locator.isPresent()).eventually.to.be.true;
};

/**
 *
 * @param locator - locator used to select an element
 * @param expectedValue - expected value to be retrieved by the locator
 */
var checkElementVisibilityAndValue = function(locator, expectedValue) {
  expect(locator.isPresent()).eventually.to.be.true;
  expect(locator.getText()).eventually.to.equal(expectedValue);
};

/**
 * Used to check visibility of a locator and also check that a particular
 * attribute of the element matches an expected value
 *
 * @param locator - locator used to select an element
 * @param selectedAttribute - the name of the attribute to check
 * @param expectedValue - expected value to be retrieved by the locator
 */
var checkElementVisibilityAndAttributeValue = function(locator, selectedAttribute, expectedValue) {
  expect(locator.isPresent()).eventually.to.be.true;
  expect(locator.getAttribute(selectedAttribute)).eventually.to.equal(expectedValue);
};

/**
 *
 * @param locators - array of selectors to test visibility of elements
 */
var checkElementsArePresent = function(locators) {
  for (var i = 0; i < locators.length; i++) {
    expect(locators[i].isPresent()).eventually.to.be.true;
  }
};

/**
 *
 * @param locators - array of selectors to get values from
 * @param expectedValues - the expected values to retrieve from the selectors
 */
var checkValuesAreCorrect = function(locators, expectedValues) {
  for (var i = 0; i < locators.length; i++) {
    expect(locators[i].getText()).eventually.to.equal(expectedValues[i]);
  }
};

/**
 *
 * @param locators - selector calling a list of items
 * @param expectedSize - expected size of the list
 */
var checkListSize = function(locators, expectedSize) {
  expect(locators.count()).eventually.to.equal(expectedSize);
};

/**
 * Used to return the text value associated with a particular item from a list
 *
 * @param listLocator - the locator associated with the list
 * @param index - the index of the list item to find
 * @param expectedValue - the expected text value
 */
var getAndCheckListItemTextValue = function(listLocator, index, expectedValue) {
  expect(listLocator.get(index).getText()).eventually.to.equal(expectedValue);
};

/**
 * Used to provide a utility for drag and drop functionality using the "HTML dnd"
 * library
 *
 * @param elementToMove
 * @param targetElement
 */
var dragAndDrop = function(elementToMove, targetElement) {
  browser.executeScript(dragAndDropUtil, elementToMove, targetElement);
};

/**
 *
 * @param locator - locator within the menu that is used to navigate to
 */
var navigateToSection = function(locator) {
  locator = locator || undefined;
  var menu = element(by.css("[aria-label*=Menu]"));
  menu.isDisplayed().then(function(isDisplayed) {
    if (isDisplayed) {
      menu.click();
    }
    if (locator) {
      locator.click();
    }
  });
};

/**
 * Utility to alow the use of a dropdown selector
 * @param  params - array of used values.
 * params[0] - dropdown locator
 * params[1] - option text value
 * params[2] - the panel that pops up ontaining the possible values
 * params[3] - locator to the selected value thats been selected
 */
var useDropdownSelector = function(params) {
  params[0].sendKeys(params[1]);
  this.waitUntilPresent(params[2]);
  params[3].click();
};

/**
 * Expect result is equal to actual value
 * @param {*} actual result
 * @param {*} expected expected result
 */
var expectResultIsEquelTo = function(actual, expected) {
  expect(actual).to.equal(expected);
};

/**
 * Expect result is not equal to actual value
 * @param {*} actual result
 * @param {*} expected expected result
 */
var expectResultIsNotEquelTo = function(actual, expected) {
  expect(actual).to.not.equal(expected);
};

/**
 * Expect each result of an operation should be true
 * @param {*} results
 */
var expectEachResultsIsTrue = function(results) {
  results.forEach(function(result) {
    expectResultIsTrue(result);
  });
};

/**
 * Expect each result of an operation should be false
 * @param {*} results
 */
var expectEachResultsIsFalse = function(results) {
  results.forEach(function(result) {
    expectResultIsFalse(result);
  });
};


/**
 * Expect each result of an operation should be null
 * @param {*} elements
 */
var expectEachResultsIsNull = function(results) {
  results.forEach(function(result) {
    expectResultIsNull(result);
  });
};

/**
 * Expect result to be true
 * @param {*} result
 */
var expectResultIsTrue = function(result) {
  expect(result).to.be.true;
};

/**
 * Expect result to be false
 * @param {*} result
 */
var expectResultIsFalse = function(result) {
  expect(result).to.be.false;
};

/**
 * Expect result to be null
 * @param {*} result
 */
var expectResultIsNull = function(result) {
  expect(result).to.be.null;
};

/**
 * Expect result to be null
 * @param {*} result
 */
var expectResultIsUndefined = function(result) {
  expect(result).to.be.undefined;
};

/**
 * Return promises from operation call on an each element
 * @param {*} elements to iterate through
 * @param {*} elemCallFunc to be called on each element
 */
var returnAllPromises = function(elements, elemCallFunc) {
  elemCallFunc = elemCallFunc || function(x) {
    return x;
  };
  var promises = _.map(elements, elemCallFunc);
  return Promise.all(promises);
};

var pressButton = function(button) {
  return button.isPresent().then(function(result) {
    expectResultIsTrue(result);
    button.click();
  }).then(function() {
    return button.isPresent();
  }).then(function(result) {
    expectResultIsFalse(result);
  });
};

var inherit = function(child, base, properties) {
  child.prototype = _.create(base.prototype, _.assign({
    '_super': base.prototype,
    'constructor': child
  }, properties));
};

var sendKeysPromise = function(elements, params) {
  var sendKeys = function(kvPair) {
    var element = kvPair.element;
    return element.sendKeys(kvPair.value);
  };
  var kvPairs = _.map(elements, function(element, key) {
    return {
      element: element, value: params[key]};
  });

  var promise = _.reduce(_.tail(kvPairs), function(prev, kvPair) {
    return prev.then(function() {
      return sendKeys(kvPair);
    });
  }, sendKeys(_.head(kvPairs)));

  return promise;
};

module.exports = {
  checkValuesAreCorrect,
  checkListSize,
  checkElementVisibilityAndValue,
  checkElementVisibilityAndAttributeValue,
  checkElementsArePresent,

  dragAndDrop,

  expectResultIsTrue,
  expectResultIsFalse,
  expectResultIsNull,

  expectResultIsEquelTo,
  expectResultIsNotEquelTo,

  expectEachResultsIsTrue,
  expectEachResultsIsFalse,
  expectEachResultsIsNull,
  expectResultIsUndefined,

  getAndCheckListItemTextValue,

  navigateToSection,

  returnAllPromises,

  waitPresent,
  waitUntilPresent,
  waitNotPresent,
  waitUntilClickable,

  useDropdownSelector,

  pressButton,

  inherit,
  sendKeysPromise
};
