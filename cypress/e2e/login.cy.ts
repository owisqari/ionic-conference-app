// cypress/e2e/login.cy.ts

describe("Login Page User Flow", () => {
  // This test verifies that the login page loads correctly when visited directly.
  it("should display the login page with username, password, and action buttons", () => {
    cy.visit("/login");
    cy.url().should("include", "/login");
    cy.get("page-login").should("exist");
    cy.get('ion-input[name="username"]').should("be.visible");
    cy.get('ion-input[name="password"]').should("be.visible");
    cy.get("[data-login-form-submit-button]").should("be.visible");
    cy.get("[data-signup-form-submit-button]").should("be.visible");
  });

  it("should show validation errors when form is submitted empty", () => {
    cy.visit("/login");
    cy.get("[data-login-form-submit-button]").click();
    cy.get('ion-input[name="username"]').should("have.class", "ion-invalid");
    cy.get('ion-input[name="password"]').should("have.class", "ion-invalid");
    cy.url().should("include", "/login");
  });

  it("should allow a user to log in and navigate to the schedule page", () => {
    cy.visit("/login");
    cy.get('ion-input[name="username"]').type("testuser");
    cy.get('ion-input[name="password"]').type("testpassword");
    cy.get("[data-login-form-submit-button]").click();
    cy.url().should("include", "/app/tabs/schedule");
    cy.get("ion-title").contains("Schedule").should("be.visible");
  });

  it("should navigate to the signup page when the signup button is clicked", () => {
    cy.visit("/login");
    cy.get("[data-signup-form-submit-button]").click();
    cy.url().should("include", "/signup");
    cy.get("page-signup").should("exist");
  });
});
