var consts = require('../../utils/constants');
var utils = require('../../utils');

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
      utils.ui.navigateToSection();
      return locators.sideMenuButton.click();
    },
    selfCheck: function() {
      return browser.getLocationAbsUrl().then(function(result) {
        utils.expect.resultIsEquelTo(result, consts.workers.URL);
        return locators.header.isPresent();
      }).then(function(result) {
        utils.expect.resultIsTrue(result);
        return locators.emptyTitle.getText();
      }).then(function(result) {
        utils.expect.resultIsEquelTo(result, consts.workers.DEFAULT_HEADING);
        return locators.emptyBody.getText();
      }).then(function(result) {
        utils.expect.resultIsEquelTo(result, consts.workers.DEFAULT_BODY);
        return locators.newButton.isPresent();
      }).then(function(result) {
        utils.expect.resultIsTrue(result);
        return locators.search.isPresent();
      }).then(function(result) {
        utils.expect.resultIsTrue(result);
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
    first: function() {
      return locators.workers.first();
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
