var consts = require('../../utils/constants');
var utils = require('../../utils/utils');

var CreateGroupPage = function() {
  var groupFormSelector = 'form[name="groupForm"]';
  var locators = {
    groupForm: {
      self: element(by.css(groupFormSelector)),
      fields: {
        name: element(by.css(groupFormSelector + ' #groupname')),
      },
      dropdowns: {
        role: element(by.css(groupFormSelector + ' #assignee')),
      },
      warnings: {
        name: element(by.css('#groupname[aria-invalid="true"]')),
      },
      buttons: {
        create: element(by.css(groupFormSelector + ' button[aria-label="Create Group"]')),
        update: element(by.css(groupFormSelector + ' button[aria-label="Update Group"]')),
        cancel: element(by.css('group-form button[aria-label="Close"]'))
      }
    }
  };

  var commands = {
    navigate: function() {
      return browser.get(consts.HASH + consts.groups.URL_NEW);
    },
    selfCheck: function() {
      browser.getLocationAbsUrl().then(function(result) {
        utils.expectResultIsEquelTo(result, consts.groups.URL_NEW);
        return locators.groupForm.self.isPresent();
      }).then(function(result) {
        utils.expectResultIsTrue(result);
      });
    },
    enterName: function(name) {
      locators.groupForm.fields.name.sendKeys(name);
    },
    enterRole: function(role) {
      locators.groupForm.dropdowns.role.sendKeys(role);
    }
  };

  return {
    locators, commands
  };

};

module.exports = CreateGroupPage();