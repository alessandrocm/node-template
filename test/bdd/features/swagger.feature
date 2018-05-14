Feature: Verify Swagger docs are accurate

Scenario: I can pull up the api swagger docs
  Given I open the site "http://localhost:3000/api-docs"
  Then I should see the swagger docs

Scenario: I can test creating users via swagger docs
  Given I open the site "http://localhost:3000/api-docs"
  When I click on the endpoint "POST /profiles"
  And I click on "POST /profiles" Try it out button
  And I edit the "POST /profiles" example model
  And I execute the "POST /profiles" endpoint
  Then I should see a "200" response code for the "POST /profiles" endpoint
