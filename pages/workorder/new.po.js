var consts = require('../../utils/constants');
var utils = require('../../utils/utils');

var NewWorkorderPage = function() {
  var workorderFormSelector = 'form[name="workorderForm"]';
  var locators = {
    workorderForm: {
      self: element(by.css(workorderFormSelector)),
      fields: {
        title: element(by.css(workorderFormSelector + ' #inputTitle')),
        address: element(by.css(workorderFormSelector + ' #inputAddress')),
        latitude: element(by.css(workorderFormSelector + ' input[name="lattitude"]')),
        longitude: element(by.css(workorderFormSelector + ' input[name="longitude"]')), // ID is wrong in UI
        summary: element(by.css(workorderFormSelector + ' #inputSummary')),
      },
      dropdowns: {
        workflow: element(by.css(workorderFormSelector + ' #workflow')),
        assignee: element(by.css(workorderFormSelector + ' #assignee')),
      },
      datetime: {
        // startDate: element(by.css(workorderFormSelector + ' #inputStartDate')), // TODO
        // startTime: element(by.css(workorderFormSelector + ' #inputStartTime')), // TODO
        finishDate: element(by.css(workorderFormSelector + ' #inputFinishDate')),
        finishTime: element(by.css(workorderFormSelector + ' #inputFinishTime')),
      },
      warnings: {
        workflow: element(by.css(workorderFormSelector + ' [ng-messages="workorderForm.workflow.$error"] div')),
        title: element(by.css(workorderFormSelector + ' [ng-messages="workorderForm.title.$error"] div')),
        address: element(by.css(workorderFormSelector + ' [ng-messages="workorderForm.address.$error"] div')),
        latitude: element(by.css(workorderFormSelector + ' [ng-messages="workorderForm.lattitude.$error"] div')),
        longitude: element(by.css(workorderFormSelector + ' [ng-messages="workorderForm.longitude.$error"] div')),
        // startDate: element(by.css(workorderFormSelector + ' [ng-messages="workorderForm.startDate.$error"] div')), // TODO
        // startTime: element(by.css(workorderFormSelector + ' [ng-messages="workorderForm.startTime.$error"] div')), // TODO
        finishDate: element(by.css(workorderFormSelector + ' [ng-messages="workorderForm.finishDate.$error"] div')),
        finishTime: element(by.css(workorderFormSelector + ' [ng-messages="workorderForm.finishTime.$error"] div')),
        summary: element(by.css(workorderFormSelector + ' [ng-messages="workorderForm.summary.$error"] div')),
      },
      buttons: {
        create: element(by.css(workorderFormSelector + ' button[aria-label="Create Workorder"]')),
        update: element(by.css(workorderFormSelector + ' button[aria-label="Update Workorder"]')),
        cancel: element(by.css('workorder-form button[aria-label="Close"]'))
      }
    }
  };

  var commands = {

    navigate: function() {
      return browser.get(consts.HASH + consts.workorders.URL_NEW);
    },
    selfCheck: function() {
      browser.getLocationAbsUrl().then(function(result) {
        utils.expectResultIsEquelTo(result, consts.workorders.URL_NEW);
        return locators.workorderForm.self.isPresent();
      }).then(function(result) {
        utils.expectResultIsTrue(result);
      });
    },
    // enter data into page fields
    enterTitle: function(title) {
      return locators.workorderForm.fields.title.sendKeys(title);
    },
    enterAddress: function(address) {
      return locators.workorderForm.fields.address.sendKeys(address);
    },
    enterLatitute: function(latitude) {
      return locators.workorderForm.fields.latitude.sendKeys(latitude);
    },
    enterLongitude: function(longitude) {
      return locators.workorderForm.fields.longitude.sendKeys(longitude);
    },
    enterStartDate: function(finishDateEdit) {
      return locators.workorderForm.datetime.w.startDate.sendKeys(finishDateEdit);
    },
    enterStartTime: function(finishTime) {
      return locators.workorderForm.datetime.startTime.sendKeys(finishTime);
    },
    enterFinishDate: function(finishDateEdit) {
      return locators.workorderForm.datetime.finishDate.sendKeys(finishDateEdit);
    },
    enterFinishTime: function(finishTime) {
      return locators.workorderForm.datetime.finishTime.sendKeys(finishTime);
    },
    enterSummary: function(summary) {
      return locators.workorderForm.fields.summary.sendKeys(summary);
    },
    // clear date and time data
    clearStartDate() {
      locators.workorderForm.datetime.startDate.sendKeys(protractor.Key.BACK_SPACE + protractor.Key.TAB + protractor.Key.BACK_SPACE + protractor.Key.TAB + protractor.Key.BACK_SPACE);
    },
    clearStartTime() {
      locators.workorderForm.datetime.startTime.sendKeys(protractor.Key.BACK_SPACE + protractor.Key.TAB + protractor.Key.BACK_SPACE + protractor.Key.TAB + protractor.Key.BACK_SPACE);
    },
    clearFinishDate() {
      locators.workorderForm.datetime.finishDate.sendKeys(protractor.Key.BACK_SPACE + protractor.Key.TAB + protractor.Key.BACK_SPACE + protractor.Key.TAB + protractor.Key.BACK_SPACE);
    },
    clearFinishTime() {
      locators.workorderForm.datetime.finishTime.sendKeys(protractor.Key.BACK_SPACE + protractor.Key.TAB + protractor.Key.BACK_SPACE + protractor.Key.TAB + protractor.Key.BACK_SPACE);
    }
  };

  return {
    locators,
    commands
  };
};

module.exports = NewWorkorderPage();