var utils = require('../../utils/utils');

var SelectedWorkerPage = function() {

  var locators = {
    workerHeader: element(by.css('worker-detail>md-toolbar>div>h3')),
    workerDetails: element(by.css('worker-detail worker>md-content>md-list')).all(by.css('md-list-item')),
    notes: element(by.css('worker-detail worker>md-content>md-list>p')),

    workordersPage: element(by.xpath('//md-tabs//md-tab-item[text()="Workorders"]')),
    informationPage: element(by.xpath('//md-tabs//md-tab-item[text()="Information"]')),
    workorderItem: element(by.css('.workorder-item')),
  };
  var commands = {
    selfCheck: function(header) {
      return locators.workerHeader.isPresent().then(function(result) {
        utils.expectResultIsTrue(result);
        return locators.workerHeader.getText();
      }).then(function(result) {
        utils.expectResultIsNotEquelTo(result, header);
      });
    },
    openWorkordersPage: function() {
      locators.workordersPage.isPresent().then(function(result) {
        utils.expectResultIsTrue(result);
        return locators.workordersPage.click();
      }).then(function(result) {
        utils.expectResultIsTrue(result);
        return locators.workorderItem.isPresent();
      }).then(function(result) {
        utils.expectResultIsTrue(result);
      });
    },
    getDetails: function() {
      return locators.workerDetails.map(function(listItem) {
        var icon = listItem.element(by.css('md-icon')).getText();
        var h3 = listItem.element(by.css('div>h3')).getText();
        var p = listItem.element(by.css('div>p')).getText();
        return { icon, h3, p };
      });
    },
    getWorkerId: function(details) {
      var workerId = details.find(function(elem) {
        return elem.p === 'Worker id';
      });
      return workerId;
    },
    getUsername: function(details) {
      var userName = details.find(function(elem) {
        return elem.p === 'Username';
      });
      return userName;
    },
    getPhoneNumber: function(details) {
      var phoneNumber = details.find(function(elem) {
        return elem.p === 'Phone Number';
      });
      return phoneNumber;
    },
    getEmail: function(details) {
      var email = details.find(function(elem) {
        return elem.p === 'Email';
      });
      return email;
    },
    getPosition: function(details) {
      var position = details.find(function(elem) {
        return elem.p === 'Position';
      });
      return position;
    },
    getGroup: function(details) {
      var group = details.find(function(elem) {
        return elem.p === 'Group';
      });
      return group;
    },
    getNotes: function() {
      return locators.notes.getText();
    }
  };

  return {
    locators, commands
  };
};

module.exports = SelectedWorkerPage();