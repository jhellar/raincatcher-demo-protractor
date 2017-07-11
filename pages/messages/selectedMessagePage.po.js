var utils = require('../../utils');

var SelectedMessagesPage = function() {
  var locators = {
    messageSubject: element(by.css('md-toolbar.content-toolbar div.md-toolbar-tools h3.ng-binding')),
    messageHeader: element(by.css('div.message-header')),
    messageHeaderItems: element(by.css('div.message div.message-header')).all(by.css('div')),
    messageContent: element(by.css('div.message p'))
  };

  var commands = {
    checkVisibility: function() {
      utils.wait.until(locators.messageSubject);
      utils.check.elementsArePresent([ locators.messageHeader,
        locators.messageContent]);
    },
    checkMessageContents: function(subject, sender, receiver, status, content) {
      var elementlocators = [ locators.messageSubject,
        locators.messageHeaderItems.get(0),
        locators.messageHeaderItems.get(1),
        locators.messageHeaderItems.get(2),
        locators.messageContent];
      if (receiver !== "") {
        receiver = " " + receiver;
      }
      var expectedValues = [ subject,
        'From: ' + sender,
        'To:' + receiver,
        'Status: ' +status,
        content ];
      utils.check.valuesAreCorrect(elementlocators, expectedValues);
    }
  };

  return {
    locators, commands
  };
};

module.exports = new SelectedMessagesPage();
