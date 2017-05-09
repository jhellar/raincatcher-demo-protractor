var consts = require('../../utils/constants');
var utils = require('../../utils/utils');

var MainWorkorderPage = function() {
  var locators = {
    header: element(by.xpath('//h3/span[text()="Workorders"]')),

    emptyTitle: element(by.css('h2.md-title')),
    emptyBody: element(by.css('div p.md-body-1')),

    newButton: element(by.css('a[aria-label="New Workorder"]')),
    deleteButton: element(by.css('button[aria-label="Delete"]')),
    proceedButton: element(by.css('button[aria-label="Proceed"]')),
    editButton: element(by.css('a[aria-label="Edit"]')),
    cancelButton: element(by.css('button[aria-label="Cancel"]')),

    searchField: element(by.css('input[name="search"]')),
    summaryInfo: element(by.css('workorder>md-list')),
    search : element(by.css('workorder-list>form>input[name="search"]')),
    workorders: element.all(by.repeater('workorder in ctrl.workorders')),
    workorder: {
      title: by.css('div>div>h3'),
      address: by.css('div>div>p')
    },
    sideMenuButton: element(by.css('md-sidenav>md-list button[aria-label$="Workorders"]')),
  };

  var commands = {
    navigate: function() {
      return browser.get(consts.HASH + consts.workorders.URL);
    },
    sideClick: function() {
      utils.navigateToSection();
      return locators.sideMenuButton.click();
    },
    selfCheck: function() {
      return browser.getLocationAbsUrl().then(function(result) {
        utils.expectResultIsEquelTo(result, consts.workorders.URL);
        return locators.header.isPresent();
      }).then(function(result) {
        utils.expectResultIsTrue(result);
        return locators.emptyTitle.getText();
      }).then(function(result) {
        utils.expectResultIsEquelTo(result, consts.workorders.DEFAULT_HEADING);
        return locators.emptyBody.getText();
      }).then(function(result) {
        utils.expectResultIsEquelTo(result, consts.workorders.DEFAULT_BODY);
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
      return locators.workorders.count();
    },
    firstInTheList: function() {
      return locators.workorders.first();
    },
    lastInTheList: function() {
      return locators.workorders.last();
    },
    firstClick: function() {
      return locators.workorders.first().click();
    },
    getTitle: function(elem) {
      return elem.element(locators.workorder.title).getText();
    },
    getAddress: function(elem) {
      return elem.element(locators.workorder.address).getText();
    }
  };

  return {
    locators, commands
  };
};

module.exports = MainWorkorderPage();