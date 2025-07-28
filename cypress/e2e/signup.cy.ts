describe("Signup Page User Flow", () => {
  it("should display the signup page with username, password, and create button", () => {
    cy.visit("/signup");
    cy.url().should("include", "/signup");
    cy.get("page-signup").should("exist");
    cy.get('ion-input[name="username"]').should("be.visible");
    cy.get('ion-input[name="password"]').should("be.visible");
    cy.contains("ion-button", "Create").should("be.visible");
  });

  it("should show validation errors when form is submitted empty", () => {
    cy.visit("/signup");
    cy.contains("ion-button", "Create").click();
    cy.get('ion-input[name="username"]').should("have.class", "ion-invalid");
    cy.get('ion-input[name="password"]').should("have.class", "ion-invalid");
    cy.url().should("include", "/signup");
  });

  it("should allow a user to sign up and navigate to the schedule page", () => {
    cy.visit("/signup");
    cy.get('ion-input[name="username"]').type("newuser");
    cy.get('ion-input[name="password"]').type("newpassword");
    cy.contains("ion-button", "Create").click();
    cy.url().should("include", "/app/tabs/schedule");
    cy.get("ion-title").contains("Schedule").should("be.visible");
  });
});
