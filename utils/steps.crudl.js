module.exports.verifyDetails = function(params) {
  // expect(
  //   element(by.xpath('//workflow-detail/div/div/md-card[./md-card-content/workflow-step-detail/h2[contains(text(),"' + params.name + '")]]')).isPresent()
  // ).eventually.to.be.true;
  expect(
    element(by.xpath('//md-card[./md-card-content/workflow-step-detail/h2[contains(text(),"' + params.name + '")]]')).isPresent()
  ).eventually.to.be.true;
  // expect(
  //   element(by.xpath('//workflow-detail/div/div/md-card[./md-card-content/workflow-step-detail/h2[contains(text(),"' + params.name + '")]]/md-card-content/workflow-step-detail/md-list/md-list-item/div/p[contains(text(), "Step code")]/../h3[contains(text(), "' + params.code + '")]')).isPresent()
  // ).eventually.to.be.true;
  expect(
    element(by.xpath('//md-card[./md-card-content/workflow-step-detail/h2[contains(text(),"' + params.name + '")]]/md-card-content/workflow-step-detail/md-list/md-list-item/div/p[contains(text(), "Step code")]/../h3[contains(text(), "' + params.code + '")]')).isPresent()
  ).eventually.to.be.true;
  // expect(
  //   element(by.xpath('//workflow-detail/div/div/md-card[./md-card-content/workflow-step-detail/h2[contains(text(),"' + params.name + '")]]/md-card-content/workflow-step-detail/md-list/md-list-item/div/p[contains(text(), "FormId")]/../h3[contains(text(), "' + params.formId + '")]')).isPresent()
  // ).eventually.to.be.true;
  // expect(
  //   element(by.xpath('//workflow-detail/div/div/md-card[./md-card-content/workflow-step-detail/h2[contains(text(),"' + params.name + '")]]/md-card-content/workflow-step-detail/md-list/md-list-item/div/p[contains(text(), "View template")]/../h3[contains(text(), "' + params.view + '")]')).isPresent()
  // ).eventually.to.be.true;
  expect(
    element(by.xpath('//md-card[./md-card-content/workflow-step-detail/h2[contains(text(),"' + params.name + '")]]/md-card-content/workflow-step-detail/md-list/md-list-item/div/p[contains(text(), "View template")]/../h3[contains(text(), "' + params.view + '")]')).isPresent()
  ).eventually.to.be.true;
  // expect(
  //   element(by.xpath('//workflow-detail/div/div/md-card[./md-card-content/workflow-step-detail/h2[contains(text(),"' + params.name + '")]]/md-card-content/workflow-step-detail/md-list/md-list-item/div/p[contains(text(), "Form temlate")]/../h3[contains(text(), "' + params.form + '")]')).isPresent()
  // ).eventually.to.be.true;
  expect(
    element(by.xpath('//md-card[./md-card-content/workflow-step-detail/h2[contains(text(),"' + params.name + '")]]/md-card-content/workflow-step-detail/md-list/md-list-item/div/p[contains(text(), "Form template")]/../h3[contains(text(), "' + params.form + '")]')).isPresent()
  ).eventually.to.be.true;
};

module.exports.verifyIsNotInTheList = function(params) {
  expect($('#stepList').isPresent()).eventually.to.be.true;
  // expect(
  //   element(by.xpath('//workflow-detail/div/div/md-card[./md-card-content/workflow-step-detail/h2[contains(text(),"' + params.name + '")]]')).isPresent()
  // ).eventually.to.be.false;
  expect(
    element(by.xpath('//md-card[./md-card-content/workflow-step-detail/h2[contains(text(),"' + params.name + '")]]')).isPresent()
  ).eventually.to.be.false;

};