// type definitions for Cypress object "cy"
/// <reference types="cypress" />

// type definitions for custom commands like "createDefaultTodos"
/// <reference types="../../support" />
import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";


Given("I'm on the sign up page", () => {
  cy.visit('/')
})

When("I enter {string} into the surname field and click out", (value)=>{
    if(value) {
        cy.get("[data-cy=surname]").type(value).blur();
    } else {
        cy.get("[data-cy=surname]").focus().blur();
    }
})

Then("the {string} error message is visible", (errormessage)=>{
    cy.get('[data-cy="error"]')
    .should("be.visible")
    .and("contain.text", errormessage);
})

Then("the field should have a label of 'Surname'", ()=>{
    cy.get('[data-cy="label-Surname"]').should("have.text", "Surname");
})