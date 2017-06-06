var consts = require('../../utils/constants');
var utils = require('../../utils/utils');

var NewWorkerPage = function() {
  var workerFormSelector = 'form[name="workerForm"]';
  var locators = {
    workerForm: {
      self: element(by.css(workerFormSelector)),
      fields: {
        name: element(by.css(workerFormSelector + ' #workername')),
        username: element(by.css(workerFormSelector + ' #username')),
        password: element(by.css(workerFormSelector + ' #password')),
        banner: element(by.css(workerFormSelector + ' #banner')),
        avatar: element(by.css(workerFormSelector + ' #avatar')),
        phone: element(by.css(workerFormSelector + ' #phonenumber')),
        email: element(by.css(workerFormSelector + ' #email')),
        position: element(by.css(workerFormSelector + ' #position')),
      },
      dropdowns: {
        group: element(by.css(workerFormSelector + ' #group')),
      },
      warnings: {
        name: element(by.css(workerFormSelector + ' #workername[aria-invalid="true"]')),
        username: element(by.css(workerFormSelector + ' #username[aria-invalid="true"]')),
        phone: element(by.css(workerFormSelector + ' #phonenumber[aria-invalid="true"]')),
        email: element(by.css(workerFormSelector + ' #email[aria-invalid="true"]')),
        position: element(by.css(workerFormSelector + ' #position[aria-invalid="true"]')),
        group: element(by.css(workerFormSelector + ' #group[aria-invalid="true"]')),
      },
      buttons: {
        create: element(by.css(workerFormSelector + ' button[aria-label="Create Worker"]')),
        update: element(by.css(workerFormSelector + ' button[aria-label="Update Worker"]')),
        cancel: element(by.css('worker-form button[aria-label="Close"]'))
      }
    }
  };

  var commands = {
    navigate: function() {
      return browser.get(consts.HASH + consts.workers.URL_NEW);
    },
    selfCheck: function() {
      browser.getLocationAbsUrl().then(function(result) {
        utils.expectResultIsEquelTo(result, consts.workers.URL_NEW);
        return locators.workerForm.self.isPresent();
      }).then(function(result) {
        utils.expectResultIsTrue(result);
      });
    },
    // enter data into page fields
    enterName: function(name) {
      locators.workerForm.fields.name.sendKeys(name);
    },
    enterUsername: function(username) {
      locators.workerForm.fields.username.sendKeys(username);
    },
    enterPassword: function(password) {
      locators.workerForm.fields.password.sendKeys(password);
    },
    enterBanner: function(banner) {
      locators.workerForm.fields.banner.sendKeys(banner);
    },
    enterAvatar: function(avatar) {
      locators.workerForm.fields.avatar.sendKeys(avatar);
    },
    enterPhone: function(phone) {
      locators.workerForm.fields.phone.sendKeys(phone);
    },
    enterEmail: function(email) {
      locators.workerForm.fields.email.sendKeys(email);
    },
    enterPosition: function(position) {
      locators.workerForm.fields.position.sendKeys(position);
    },
    changePassword: function(password) {
      locators. workerForm.self.isPresent().then(function(result) {
        utils.expectResultIsTrue(result);
        return locators.workerForm.fields.password.clear();
      }).then(function(result) {
        utils.expectResultIsNull(result);
        locators.workerForm.fields.password.sendKeys(password);
      });
    }
  };

  return {
    locators, commands
  };
};

module.exports = NewWorkerPage();