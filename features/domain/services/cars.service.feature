Feature: Cars Service

  Scenario: Validate the parameters to query and return a list of cars
    Given Two parameters a car model and make
    When The validation and formatting of the parameters
    Then Should return an empty list or a list of cars following the parameters