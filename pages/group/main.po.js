var consts = require('../../utils/constants');
var utils = require('../../utils/utils');

var MainGroupPage = function() {
  var locators = {
    header: element(by.xpath('//h3/span[text()="Groups"]')),

    emptyTitle: element(by.css('h2.md-title')),
    emptyBody: element(by.css('div p.md-body-1')),

    newButton: element(by.xpath('//md-content//div/a[@aria-label="New group"]')),
    // newButton: element(by.css('md-content a[aria-label="New group"]')), // TODO this fails when circle button is visible
    deleteButton: element(by.css('button[aria-label="Delete"]')),
    proceedButton: element(by.css('button[aria-label="Proceed"]')),
    editButton: element(by.css('a[aria-label="Edit"]')),
    cancelButton: element(by.css('button[aria-label="Cancel"]')),
    // search : element(by.css('group-list>form>input[name="search"]')), // missing input name
    search : element(by.css('group-list>form>input#search')),
    // summaryInfo: 'group>md-list',
    groups: element.all(by.repeater('group in ctrl.groups')),
    group: {
      name: by.css('div>div>h3'),
    },
    sideMenuButton: element(by.css('md-sidenav>md-list button[aria-label$="Groups"]'))
  };

  var commands = {
    navigate: function() {
      return browser.get(consts.HASH + consts.groups.URL);
    },
    sideClick: function() {
      utils.navigateToSection();
      return locators.sideMenuButton.click();
    },
    selfCheck: function() {
      return browser.getLocationAbsUrl().then(function(result) {
        utils.expectResultIsEquelTo(result, consts.groups.URL);
        return locators.header.isPresent();
      }).then(function(result) {
        utils.expectResultIsTrue(result);
        return locators.emptyTitle.getText();
      }).then(function(result) {
        utils.expectResultIsEquelTo(result, consts.groups.DEFAULT_HEADING);
        return locators.emptyBody.getText();
      }).then(function(result) {
        utils.expectResultIsEquelTo(result, consts.groups.DEFAULT_BODY);
        return locators.newButton.isPresent();
      }).then(function(result) {
        utils.expectResultIsTrue(result);
        return locators.search.isPresent();
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
      return locators.groups.count();
    },
    first: function() {
      return locators.groups.first();
    },
    getName: function(elem) {
      return elem.element(locators.group.name).getText();
    }
  };

  return {
    locators, commands
  };
};

module.exports = MainGroupPage();
