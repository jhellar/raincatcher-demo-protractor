var data = require('../data/messages.do');
var messagesCrudl = require('../services/messages.so');
var newMessagePage = require('../pages/messages/newMessagePage.po');
var constants = require('../utils/constants');
var AuthService = require('../services/auth.so');
var authService = new AuthService();

describe('testing messages functionality in demo app', function() {
  before('navigate to login page', function() {
    authService.openPortal();
    authService.loginPortal(constants.auth.usernames.TREVER_SMITH,
      constants.auth.DEFAULT_PASSWORD);
    authService.checkPortalLoginWasSuccessful();
  });

  step('check we can see the messages section elements', function() {
    messagesCrudl.openMessages();
  });

  step('should be able to search a message and get its contents', function() {
    messagesCrudl.openMessages();
    messagesCrudl.searchForMessage(data.messages.SEARCH);
  });

  step('create a new message successfully', function() {
    var message = data.messages.CREATE;
    messagesCrudl.openMessages();
    messagesCrudl.createNewMessage(message);
    messagesCrudl.searchForMessage(message);
  });

  step('warn if "to" field is not selected', function() {
    messagesCrudl.openMessages();
    messagesCrudl.createNewMessage(data.messages.CREATE_INVALID_RECEIVER);
    newMessagePage.commands.checkForReceiverError();
  });

  step('warn if subject field is not selected', function() {
    messagesCrudl.openMessages();
    messagesCrudl.createNewMessage(data.messages.CREATE_INVALID_SUBJECT);
    newMessagePage.commands.checkForSubjectError();
  });

  step('warn if content field is not selected', function() {
    var message = data.messages.CREATE_INVALID_NO_CONTENT;
    messagesCrudl.openMessages();
    messagesCrudl.createNewMessage(message);
    newMessagePage.commands.checkForContentError(message.charCounter);
  });

  step('warn if content is too large', function() {
    var message = data.messages.CREATE_INVALID_EXCESSIVE_CONTENT;
    messagesCrudl.openMessages();
    messagesCrudl.createNewMessage(message);
    newMessagePage.commands.checkForContentError(message.charCounter);
  });
});
