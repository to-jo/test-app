import requirements from "../../requirements/requirements";

describe("surname field", () => {

  beforeEach(()=>{
    cy.visit("/");
  });

context(requirements.jiraLink('INFSAAS-3'),()=>{

    it('should have the label of "Surname"', () => {
      cy.get('[data-cy="label-Surname"]').should("have.text", "Surname");
    });

    it("should display an error message if the field is left empty", () => {
      cy.get('[data-cy="surname"]').focus().blur();
      cy.get('[data-cy="error"]')
        .should("be.visible")
        .and("contain.text", "Please enter a surname");
    });

    it("should display an error message if an invalid surname is entered", () => {
      cy.get("[data-cy=surname]").type("1234").blur();
      cy.get('[data-cy="error"]')
        .should("be.visible")
        .and("contain.text", "please enter a valid surname");

      cy.get("[data-cy=surname]").clear().type('!"£"!').blur();
      cy.get('[data-cy="error"]')
        .should("be.visible")
        .and("contain.text", "please enter a valid surname");
    });

    it("should display an error message if less than 2 alpha chars are entered", () => {
      cy.get("[data-cy=surname]").type("t").blur();
      cy.get('[data-cy="error"]')
        .should("be.visible")
        .and("contain.text", "Please enter a  surname of 2 characters or more");
    });

    it("should display an error message if more than 20 alpha chars are entered", () => {
      cy.get("[data-cy=surname]").type("testtesttesttesttestt").blur();
      cy.get('[data-cy="error"]')
        .should("be.visible")
        .and("contain.text", "Please enter a surname of 20 characters or less");
    });
  });
});
