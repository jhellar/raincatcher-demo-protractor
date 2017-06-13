var utils = require('../utils/utils');

var NavigationTab = function() {
  var locators = {
    toggleNavButton: element(by.css('button[ng-click*="toggleSidenav"]')),
    navList: element(by.css('md-sidenav md-list')),
    navListItems: element(by.css('md-sidenav md-list')).all(by.css('md-list-item'))
  };

  var navigateTo = {
    schedulerPage: function() {
      utils.navigateToSection(locators.navListItems.get(0));
    },
    workordersPage: function() {
      utils.navigateToSection(locators.navListItems.get(1));
    },
    workersPage: function() {
      utils.navigateToSection(locators.navListItems.get(2));
    },
    groupsPage: function() {
      utils.navigateToSection(locators.navListItems.get(3));
    },
    mapPage: function() {
      utils.navigateToSection(locators.navListItems.get(4));
    },
    messagesPage: function() {
      utils.navigateToSection(locators.navListItems.get(5));
    },
    filesPage: function() {
      utils.navigateToSection(locators.navListItems.get(6));
    },
    workflowsPage: function() {
      utils.navigateToSection(locators.navListItems.get(7));
    },
    formsPage: function() {
      utils.navigateToSection(locators.navListItems.get(8));
    },
    analyticsPage: function() {
      utils.navigateToSection(locators.navListItems.get(9));
    },
    logoutPage: function() {
      utils.navigateToSection(locators.navListItems.last());
    }
  };

  return {
    locators, navigateTo
  };
};


module.exports = NavigationTab();