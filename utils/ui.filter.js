var _ = require('lodash');

/*
 @param element with @attributeName with attribute text to contain @filterText
 @return Promise with filtered elements
 Usage example:
 [ELEMENTS].filter(ui.filter.byElementAttributeContains.bind({
        filterText: "Some text",
        attributeName: "src"
 }));
*/
module.exports.byElementAttributeContains = function(element) {
  return element.getAttribute(this.attributeName).then(function(value) {
    return _.includes(value, this.filterText);
  }.bind({
    filterText: this.filterText
  }));
};

/*
 @param element with @attributeName and @childElementLocator with attribute text to contain @filterText
 @return Promise with filtered elements
 Usage example:
  [ELEMENTS].filter(ui.filter.byChildElementAttributeContains.bind({
    filterText: "Some text,
    childElementLocator: "span",
    attributeName: "src"
 }));
*/
module.exports.byChildElementAttributeContains = function(element) {
  return element.element(this.childElementLocator).getAttribute(this.attributeName).then(function(value) {
    return _.includes(value, this.filterText);
  }.bind({
    filterText: this.filterText
  }));
};

/*
 @param element with @attributeName with attribute text to equal @filterText
 @return Promise with filtered elements
 Usage example:
  [ELEMENTS].filter(ui.filter.byElementAttributeEquals.bind({
    filterText: "Some text",
    attributeName: "src"
 }));
*/
module.exports.byElementAttributeEquals = function(element) {
  return element.getAttribute(this.attributeName).then(function(value) {
    return _.isEqual(value, this.filterText);
  }.bind({ filterText: this.filterText }));
};

/*
  @param element with @attributeName and @childElementLocator with attribute text to contain @filterText
 @return Promise with filtered elements
 Usage example:
  [ELEMENTS].filter(ui.filter.byChildElementAttributeEquals.bind({
    filterText: "Some text,
    childElementLocator: "span",
    attributeName: "src"
 }));
*/
module.exports.byChildElementAttributeEquals = function(element) {
  return element.element(this.childElementLocator).getAttribute(this.attributeName).then(function(value) {
    return _.isEqual(value, this.filterText);
  }.bind({ filterText: this.filterText }));
};