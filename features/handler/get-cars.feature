Feature: Get Cars

  Scenario: Obtain cars by given parameters
    Given A car model and make
    When The model is a4 and the make is audi
    Then The data returned should be a list of audi a4

  Scenario: Return an error if no parameters were provided
    When No car model and make were provided
    Then Should return a http server error message

  Scenario: Obtain a list of cars of the make provided if no model was specified
    Given A car make
    When The make is audi
    Then Return a list of cars from the audi make