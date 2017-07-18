var utils = require('../../utils');

var CommonMessagePage = function() {
  var locators = {
    searchBox: element(by.id('search')),
    messageList: element(by.css('div.messages md-list')),
    messageListItems: element(by.css('div.messages md-list')).all(by.repeater('message in ctrl.list | reverse'))
  };

  var commands = {
    checkVisibility: function() {
      utils.wait.until(locators.searchBox);
      utils.check.elementsArePresent(locators.messageList);
    },
    // item can be sender or subject
    searchMessage: function(searchItem, numExpectedMessages) {
      locators.searchBox.sendKeys(searchItem);
      utils.check.listSize(locators.messageListItems, numExpectedMessages);
    },
    getMessage: function(index) {
      locators.messageListItems.get(index).click();
    }
  };

  return {
    locators, commands
  };
};

module.exports = CommonMessagePage();
