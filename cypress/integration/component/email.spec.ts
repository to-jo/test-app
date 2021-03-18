import requirements from "../../requirements/requirements";

describe("Email field", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  context(requirements.jiraLink("MNA-1"), ()=> {
    it('should have the label of "email"', () => {
      cy.get('[data-cy="label-email"]').should("have.text", "email");
    });

    it("should display an error message if the email field is left empty", () => {
      cy.get('[data-cy="email-field"]').focus().blur();
      cy.get('[data-cy="error"]')
        .should("be.visible")
        .and("contain.text", "Please enter an email");
    });

    ["1234", '!"£"!', "test@test", "testtest.com"].forEach((value) => {
      it(
        "should display an error message if an invalid email is entered: " +
          value,
        () => {
          cy.get("[data-cy=email-field]").clear().type(value).blur();
          cy.get('[data-cy="error"]')
            .should("be.visible")
            .and("contain.text", "Please enter a valid email address");
        }
      );
    });

    it("should display an error message if more than 250 characters are entered into the email field", () => {

      cy.addContext("some additional context");

      cy.get("[data-cy=email-field]")
        .type(
          "dmztgIFgr2NnAQy35rzQsHqBVJ9K2BRPnjsIe3S9b6R8xfCDjT7Mgcj2jNavkgKZPX2U7B8p0bMtDKAhuzkdbZXebOBYqNPIeCQ2qMIt5T5eAfb8Uzmhwi6QfvBNAWCKAhHELwLX0FrnpdDfqEXFnUZGUFo0u1gnALdtPy09N0UnfiGyZilmnbR4I5Jzf9z6txjuuyZt5KZHmXqhpyVEG3N5OXTlpKjtf91Jd7KVl8r8vgS@r8PQsmZb.re"
        )
        .blur();
      cy.get('[data-cy="error"]')
        .should("be.visible")
        .and("contain.text", "Email must be less than 250 characters");
    });

    it.skip("should use message queues", function () {
      cy.addContext("some additional context");
    });

    context("some context for the below", () => {
      it("should do something we haven't written yet");
    });
  });
});
