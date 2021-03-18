
describe("First name field", () => {
  beforeEach(() => {
    cy.visit("/");
  });

    it('should have the label of "First Name"', () => {
      cy.get('[data-cy="label-First Name"]').should("have.text", "First Name");
    });

    it("should display an error message if the firstname field is left empty", () => {
      cy.get('[data-cy="first-name"]').focus().blur();
      cy.get('[data-cy="error"]')
        .should("be.visible")
        .and("contain.text", "Please enter a first name");
    });

    it("should display an error message if an invalid first name is entered", () => {
      cy.get("[data-cy=first-name]").type("1234").blur();
      cy.get('[data-cy="error"]')
        .should("be.visible")
        .and("contain.text", "please enter a valid first name");

      cy.get("[data-cy=first-name]").clear().type('!"£"!').blur();
      cy.get('[data-cy="error"]')
        .should("be.visible")
        .and("contain.text", "please enter a valid first name");
    });

    it("should display an error message if less than 2 alpha chars are entered into the first name field", () => {
      cy.get("[data-cy=first-name]").type("t").blur();
      cy.get('[data-cy="error"]')
        .should("be.visible")
        .and("contain.text", "Please enter a name of 2 characters or more");
    });

    it("should display an error message if more than 20 alpha chars are entered into the first name field", () => {
      cy.get("[data-cy=first-name]").type("testtesttesttesttestt").blur();
      cy.get('[data-cy="error"]')
        .should("be.visible")
        .and("contain.text", "Please enter a name of 20 characters or less");
    });
});
