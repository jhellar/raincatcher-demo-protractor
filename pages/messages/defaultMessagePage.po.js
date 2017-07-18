var utils = require('../../utils');

var DefaultMessagesPage = function() {
  var locators = {
    emptyMessageHeading: element(by.css('h2.md-title')),
    emptyMessageBody: element(by.css('div p.md-body-1')),
    newMessageButton: element(by.css('[aria-label="New message"]')),
    defaultHeading: "No message selected.",
    defaultBody: "Select a message from the menu, or create a new message:"
  };

  var commands = {
    checkVisibility: function() {
      utils.wait.until(locators.emptyMessageHeading);
      utils.check.elementsArePresent([locators.emptyMessageBody,
        locators.newMessageButton]);
    },
    checkValues: function() {
      var elementlocators = [ locators.emptyMessageHeading, locators.emptyMessageBody ];
      var expectedValues = [ locators.defaultHeading, locators.defaultBody ];
      utils.check.valuesAreCorrect(elementlocators, expectedValues);
    },
    newMessage: function() {
      locators.newMessageButton.click();
    }
  };

  return {
    locators, commands
  };
};

module.exports = DefaultMessagesPage();
