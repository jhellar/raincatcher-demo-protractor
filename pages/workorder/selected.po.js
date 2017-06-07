var utils = require('../../utils/utils');

var SelectedWorkorderPage = function() {
  var locators = {
    workorderHeader: element(by.css('div.ng-scope.flex>md-toolbar>div>h3')),
    workorderDetails: element(by.css('workorder>md-list')).all(by.css('md-list-item')),
    workSummary: element(by.css('workorder>p')),
    workflow: element(by.css('md-card>md-card-title>md-card-title-text>span'))
  };

  var commands = {
    selfCheck: function(header) {
      return locators.workorderHeader.isPresent().then(function(result) {
        utils.expectResultIsTrue(result);
        return locators.workorderHeader.getText();
      }).then(function(result) {
        utils.expectResultIsEquelTo(result, header);
      });
    },
    getDetails: function() {
      return locators.workorderDetails.map(function(listItem) {
        var icon = listItem.element(by.css('md-icon')).getText();
        var h3 = listItem.element(by.css('div>h3')).getText();
        var p = listItem.element(by.css('div>p')).getText();
        return { icon, h3, p };
      });
    },
    getStatus: function(details) {
      var status = details.find(function(elem) {
        return elem.p === 'Status';
      });
      return status;
    },
    getCoordinates: function(details, address) {
      var coordinates = details.find(function(elem) {
        return elem.p === address;
      });
      return coordinates;
    },
    getFinishDate: function(details) {
      var finishDate = details.find(function(elem) {
        return elem.p === "Finish Date";
      });
      return finishDate;
    },
    getFinishTime: function(details) {
      var finishTime = details.find(function(elem) {
        return elem.p === "Finish Time";
      });
      return finishTime;
    },
    getAssignee: function(details) {
      var assignee = details.find(function(elem) {
        return elem.p === "Asignee";
      });
      return assignee;
    },
    getTitle: function(details) {
      var title = details.find(function(elem) {
        return elem.p === "Workorder";
      });
      return title;
    },
    getWorkSummary: function() {
      return locators.workSummary.getText();
    },
    getWorkflow: function() {
      return locators.workflow.getText();
    }
  };

  return {
    locators, commands
  };
};

module.exports = SelectedWorkorderPage();
