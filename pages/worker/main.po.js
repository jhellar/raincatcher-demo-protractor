var consts = require('../../utils/constants');
var utils = require('../../utils/utils');

var MainWorkerPage = function() {

  var locators = {
    header: element(by.xpath('//h3/span[text()="Workers"]')),

    emptyTitle: element(by.css('h2.md-title')),
    emptyBody: element(by.css('div p.md-body-1')),

    newButton: element(by.css('a[aria-label="New worker"]')),
    deleteButton: element(by.css('button[aria-label="Delete"]')),
    proceedButton: element(by.css('button[aria-label="Proceed"]')),
    editButton: element(by.css('a[aria-label="Edit"]')),
    cancelButton: element(by.css('button[aria-label="Cancel"]')),

    searchField: element(by.css('input[name="search"]')),
    search : element(by.css('worker-list>form>input[name="search"]')),
    workers: element.all(by.repeater('user in ctrl.workers')),
    worker: {
      fullName: by.css('div>div>h3'),
      position: by.css('div>div>p')
    },

    sideMenuButton: element(by.css('md-sidenav>md-list button[aria-label$="Workers"]'))
  };

  var commands = {
    navigate: function() {
      return browser.get(consts.HASH + consts.workers.URL);
    },
    sideClick: function() {
      utils.navigateToSection();
      return locators.sideMenuButton.click();
    },
    selfCheck: function() {
      return browser.getLocationAbsUrl().then(function(result) {
        utils.expectResultIsEquelTo(result, consts.workers.URL);
        return locators.header.isPresent();
      }).then(function(result) {
        utils.expectResultIsTrue(result);
        return locators.emptyTitle.getText();
      }).then(function(result) {
        utils.expectResultIsEquelTo(result, consts.workers.DEFAULT_HEADING);
        return locators.emptyBody.getText();
      }).then(function(result) {
        utils.expectResultIsEquelTo(result, consts.workers.DEFAULT_BODY);
        return locators.newButton.isPresent();
      }).then(function(result) {
        utils.expectResultIsTrue(result);
        return locators.searchField.isPresent();
      }).then(function(result) {
        utils.expectResultIsTrue(result);
      });
    },
    search: function(text) {
      return locators.search.clear().then(function() {
        locators.search.sendKeys(text);
      });
    },
    count: function() {
      return locators.workers.count();
    },
    firstInTheList: function() {
      return locators.workers.first();
    },
    lastInTheList: function() {
      return locators.workers.last();
    },
    firstClick: function() {
      return locators.workers.first().click();
    },
    getFullName: function(elem) {
      return elem.element(locators.worker.fullName).getText();
    },
    getPosition: function(elem) {
      return elem.element(locators.worker.position).getText();
    }
  };

  return {
    locators, commands
  };
};

module.exports = MainWorkerPage();
