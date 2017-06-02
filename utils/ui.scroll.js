/*
 @param element to be scrolled on page
 @return scrolled element
 Usage example:
 ui.scroll.scrollElemIntoView(ELEMENT);
*/
module.exports.scrollElemIntoView = function(element) {
  browser.executeScript('arguments[0].scrollIntoView();', element.getWebElement());
  return element;
};

/*
 @param element to be scrolled on page
 @return Promise of scrolled element
Usage example:
 ui.scroll.scrollElemIntoView(ELEMENT);
*/
module.exports.scrollElemIntoViewPromise = function(element) {
  return browser.executeScript('arguments[0].scrollIntoView();', element.getWebElement());
};