var utils = require('../../utils');

var SelectedGroupPage = function() {

  var locators = {
    groupHeader: element(by.css('div.ng-scope.flex>md-toolbar>div>h3')),
    groupDetails: element(by.css('group>md-list:nth-child(1)')).all(by.css('md-list-item')),
    membersDetails: element(by.css('group>md-list:nth-child(3)')).all(by.css('md-list-item'))
  };
  var commands = {
    selfCheck: function(header) {
      return locators.groupHeader.isPresent().then(function(result) {
        utils.expect.resultIsTrue(result);
        return locators.groupHeader.getText();
      }).then(function(result) {
        utils.expect.resultIsNotEquelTo(result, header);
      });
    },
    getDetails: function() {
      return locators.groupDetails.map(function(listItem) {
        var icon = listItem.element(by.css('md-icon')).getText();
        var h3 = listItem.element(by.css('div>h3')).getText();
        var p = listItem.element(by.css('div>p')).getText();
        return { icon, h3, p };
      });
    },
    getGroupId: function(details) {
      var groupId = details.find(function(elem) {
        return elem.p === 'Group id';
      });
      return groupId;
    },
    getName: function(details) {
      var userName = details.find(function(elem) {
        return elem.p === 'Group name';
      });
      return userName;
    },
    getRole: function(details) {
      var role = details.find(function(elem) {
        return elem.p === 'Role';
      });
      return role;
    }
  };
  // TODO get members details

  return {
    locators, commands
  };
};

module.exports = SelectedGroupPage();