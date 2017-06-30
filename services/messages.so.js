var navigationTab = require('../pages/navigation.po');
var commonMessagePage = require('../pages/messages/commonMessagePage.po');
var defaultMessagePage = require('../pages/messages/defaultMessagePage.po');
var newMessagePage = require('../pages/messages/newMessagePage.po');
var selectedMessagePage = require('../pages/messages/selectedMessagePage.po');

module.exports.openMessages = function() {
  navigationTab.navigateTo.messagesPage();
  defaultMessagePage.commands.checkVisibility();
  defaultMessagePage.commands.checkValues();
}
;

module.exports.searchForMessage = function(params) {
  commonMessagePage.commands.checkVisibility();
  commonMessagePage.commands.searchMessage(params.subject,
    params.numExpectedMessages);
  commonMessagePage.commands.getMessage(params.index);
  selectedMessagePage.commands.checkVisibility();
  selectedMessagePage.commands.checkMessageContents(params.subject,
    params.sender,
    params.receiver,
    params.status,
    params.content);
};

module.exports.createNewMessage = function(params) {
  defaultMessagePage.commands.newMessage();
  newMessagePage.commands.checkVisibility();
  newMessagePage.commands.createNewMessage(params.receiver,
    params.subject,
    params.content);
};