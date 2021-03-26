@storykey=MNA-1
Feature: surname field
    As a product owner i want to know peoples surnames so we can send personalised communications

    Background: visit site
        Given I'm on the sign up page

    Scenario Outline: entering <value> should display <error message>
        When I enter <value> into the surname field and click out
        Then the <error message> error message is visible

        Examples:
            | value  | error message                  |
            | ""     | "Please enter a surname"       |
            | "1234" | "please enter a valid surname" |
            | "!\"£\"!" | "please enter a valid surname" |
            | "t" | "Please enter a  surname of 2 characters or more" | 
            | "testtesttesttesttestt" | "Please enter a surname of 20 characters or less" |

    Scenario: Check the label of the surname field
        Then the field should have a label of 'Surname'