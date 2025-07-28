// cypress/e2e/login.cy.ts

describe("Login Page User Flow", () => {
  // This test verifies that the login page loads correctly when visited directly.
  it("should display the login page with username, password, and action buttons", () => {
    // 1. Visit the login page directly.
    // In an E2E test, cy.visit() is the correct command to start a test.
    cy.visit("src/app/pages/login/login.html");

    // 2. Verify that the main component for the login page exists in the DOM.
    // This confirms the router has loaded the correct component.
    cy.get("page-login").should("exist");

    // 3. Check for the essential input fields.
    // It's best to select inputs by a stable attribute like 'name'.
    cy.get('ion-input[name="username"]').should("be.visible");
    cy.get('ion-input[name="password"]').should("be.visible");

    // 4. Check for the action buttons using the data attributes from your HTML.
    // These are excellent, stable selectors for testing.
    cy.get("[data-login-form-submit-button]").should("be.visible");
    cy.get("[data-signup-form-submit-button]").should("be.visible");
  });

  // This test simulates a user successfully logging in.
  it("should allow a user to log in and navigate to the schedule page", () => {
    // 1. Start at the login page.
    cy.visit("/login");

    // 2. Type valid credentials into the input fields.
    // Note: It's a best practice to use cy.env() or fixtures for test credentials
    // instead of hardcoding them, but this works for an example.
    cy.get('ion-input[name="username"]').type("testuser");
    cy.get('ion-input[name="password"]').type("testpassword");

    // 3. Click the login button.
    cy.get("[data-login-form-submit-button]").click();

    // 4. Assert that the URL has changed to the main application page.
    // This confirms the router.navigateByUrl call in your component worked.
    cy.url().should("include", "/app/tabs/schedule");

    // 5. (Optional but recommended) Assert that an element on the new page is visible.
    // This confirms the new page has rendered successfully. For example, check the schedule page title.
    cy.get("ion-title").contains("Schedule").should("be.visible");
  });

  // This test verifies the navigation to the signup page.
  it("should navigate to the signup page when the signup button is clicked", () => {
    // 1. Start at the login page.
    cy.visit("/login");

    // 2. Click the signup button.
    cy.get("[data-signup-form-submit-button]").click();

    // 3. Assert that the URL has changed to the signup page.
    cy.url().should("include", "/signup");

    // 4. (Optional but recommended) Verify that the signup page component has loaded.
    cy.get("page-signup").should("exist");
  });
});
