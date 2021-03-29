@ci
Feature: can add a user

Scenario: successfully adding a user returns an _id and the data can be returned using the id
    Given url 'http://localhost:3001/addUser'
    And request {"firstName": "Jon","surname": "Smith","telephoneNumber": "01234567890", "email": "tj@test.com", "emailOptIn": true, "phoneOptin": true, "termAccepted": true}
    When method post
    Then status 200
    And match response == {"message": "New user inserted.","_id": "#notnull"}
    Given url 'http://localhost:3001/user/' + response._id
    When method get
    Then status 200
    And match response == [{"_id":"#string", "firstName": "Jon","surname": "Smith","telephoneNumber": "01234567890", "email": "tj@test.com", "emailOptIn": true, "phoneOptin": true, "termAccepted": true}]

Scenario Outline: validation of <test>
    Given url 'http://localhost:3001/addUser'
    And request <body>
    When method post
    Then status <responseCode>
    And match response == {"errors": [{"value": "#string","msg": "Invalid value","param": "#string","location": "body"}]}

Examples:
  | test | body | responseCode |
  | invalid email | {"firstName": "Jon","surname": "Smith","telephoneNumber": "01234567890", "email": "test.com", "emailOptIn": true, "phoneOptin": true, "termAccepted": true} | 400 |
  | invalid first name length | {"firstName": "T","surname": "Smith","telephoneNumber": "01234567890", "email": "tj@test.com", "emailOptIn": true, "phoneOptin": true, "termAccepted": true} | 400 |
  | invalid surname length | {"firstName": "Jon","surname": "J","telephoneNumber": "01234567890", "email": "tj@test.com", "emailOptIn": true, "phoneOptin": true, "termAccepted": true} | 400 |
  | invalid telephoneNumber length | {"firstName": "Jon","surname": "Smith","telephoneNumber": "01234", "email": "tj@test.com", "emailOptIn": true, "phoneOptin": true, "termAccepted": true} | 400 |
  | npn boolean email opt in | {"firstName": "Jon","surname": "Smith","telephoneNumber": "01234567890", "email": "tj@test.com", "emailOptIn": "xxxx", "phoneOptin": true, "termAccepted": true} | 400 |
  | non boolean telephone opt in | {"firstName": "Jon","surname": "Smith","telephoneNumber": "01234567890", "email": "tj@test.com", "emailOptIn": true, "phoneOptin": "xxxx", "termAccepted": true} | 400 |
  | non boolean terms accepted | {"firstName": "Jon","surname": "Smith","telephoneNumber": "01234567890", "email": "tj@test.com", "emailOptIn": true, "phoneOptin": true, "termAccepted": "xxxx"} | 400 |