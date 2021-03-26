import requirements from "../../requirements/requirements";

describe("Sign up for emails journey", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  context(requirements.jiraLink("MNA-1"), () => {
    it("should allow the user to sign up for emails by sending the users data correctly to the email service", () => {
      cy.get(":nth-child(1) > [data-cy=checkbox]").click();
      cy.get(":nth-child(2) > [data-cy=checkbox]").click();
      cy.get("[data-cy=first-name]").type("Tony");
      cy.get("[data-cy=surname]").type("Jones");
      cy.get("[data-cy=email-field]").type("test@waters.com");
      cy.get('[data-cy=telephone-number]').type("01234567890");
      cy.get(':nth-child(7) > [data-cy=checkbox]').click();
      cy.get('[data-testid=button]').click();
    });
  });
});
