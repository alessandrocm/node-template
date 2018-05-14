const {Given, Then, When} = require('cucumber');
const expect = require('chai').expect;

Given(/^I open the site "([^"]*)"$/, function(url) {
  browser.url(url);
});

When(/^I click on the endpoint "([^"]*)"$/, function(endpoint) {
  const selector = this.mapEndpoint(endpoint);
  this.clickElement(selector);
});

When(/^I click on "([^"]*)" Try it out button$/, function(endpoint) {
  const selector = this.mapEndpoint(endpoint);
  const tryItOut = `${selector} button`;
  this.clickElement(tryItOut);
});

When(/^I edit the "([^"]*)" example model$/, function(endpoint) {
  const selector = this.mapEndpoint(endpoint);
  const bodyTextarea = `${selector} textarea.body-param__text`;
  this.clickElement(bodyTextarea);
  const json = browser
    .element(bodyTextarea)
    .getValue()
  ;

  const model = JSON.parse(json);
  const data = Object.entries(model)
    .reduce((newModel, [key, value]) => {
      newModel[key] = this.mapValue(key, value);
      return newModel;
    }, {})
  ;
  browser.setValue(bodyTextarea, JSON.stringify(data));

});

When(/^I execute the "([^"]*)" endpoint$/, function(endpoint) {
  const selector = this.mapEndpoint(endpoint);
  const executeButton = `${selector} button.execute`;
  this.clickElement(executeButton);
});

Then(/^I should see the swagger docs$/, function() {
  const title = browser
    .element('h2.title')
    .getText()
  ;

  expect(title).to.equal('Node Template API\n 1.0.0 ');

});

Then(/^I should see a "([^"]*)" response code for the "([^"]*)" endpoint$/, function(expectedCode, endpoint) {
  const selector = this.mapEndpoint(endpoint);
  const responseCode = `${selector} table.responses-table tr.response td.response-col_status`;
  const code = browser.element(responseCode).getText();

  expect(code).to.equal(expectedCode);
});
