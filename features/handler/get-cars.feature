Feature: Get Cars

  Scenario: Obtain cars by given parameters
    Given A car model and make
    When The model is a4 and the make is audi
    Then The data returned should be a list of audi a4