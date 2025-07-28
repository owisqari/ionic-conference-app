describe("Full User Journey: Signup, Login, and Favorite", () => {
  it("should allow a user to sign up, log in, favorite a session, and see it in the favorites list", () => {
    // Use a unique username for each test run to avoid conflicts
    const uniqueUsername = `testuser_${Date.now()}`;
    const password = "password123";

    // --- 1. Sign Up ---
    cy.visit("/signup");
    cy.get('ion-input[name="username"]').type(uniqueUsername);
    cy.get('ion-input[name="password"]').type(password);
    cy.contains("ion-button", "Create").click();
    cy.url().should("include", "/app/tabs/schedule");

    // --- Assert that the schedule has loaded and is not empty ---
    // Wait for the page to settle into one of two states: a list with items, or the "empty" message.
    cy.get(
      'ion-list#scheduleList ion-item, ion-list-header:contains("No Sessions Found")',
      { timeout: 10000 }
    ).should("exist");

    // Now check which state we are in.
    cy.get("body").then(($body) => {
      if (
        $body.find('ion-list-header:contains("No Sessions Found")').length > 0
      ) {
        // If the "empty" message is present, fail the test with a clear error.
        throw new Error(
          "Test failed: The schedule is empty after signup. Cannot test the favorite feature."
        );
      }
      // Otherwise, the list must have items, so we can proceed.
    });

    // --- 2. Log Out ---
    cy.get("ion-menu-button:visible").click();
    cy.get("ion-list").contains("Account").should("be.visible");
    cy.contains("ion-item", "Logout").click();
    cy.url().should("include", "/app/tabs/schedule");

    // --- 3. Log In ---
    cy.get("ion-menu-button:visible").click();
    cy.contains("ion-item", "Login").click();
    cy.url().should("include", "/login");
    cy.get('ion-input[name="username"]').type(uniqueUsername);
    cy.get('ion-input[name="password"]').type(password);
    cy.contains("ion-button", "Login").click();
    cy.url().should("include", "/app/tabs/schedule");

    // Wait for the content to load again and check that it's not empty
    cy.get(
      'ion-list#scheduleList ion-item, ion-list-header:contains("No Sessions Found")',
      { timeout: 10000 }
    ).should("exist");

    cy.get("body").then(($body) => {
      if (
        $body.find('ion-list-header:contains("No Sessions Found")').length > 0
      ) {
        throw new Error(
          "Test failed: The schedule is empty after login. Cannot test the favorite feature."
        );
      }
    });

    // --- 4. Favorite a Session ---
    // Get the name of the first session in the list to verify later
    let sessionName;
    cy.get("ion-list#scheduleList ion-item")
      .first()
      .find("h3")
      .then(($h3) => {
        sessionName = $h3.text();
      });

    // Favorite the first item
    cy.get("ion-item-sliding").first().realSwipe("left");
    cy.contains("ion-item-option", "Favorite").click();
    cy.get("ion-toast").should("be.visible");

    // --- 5. Verify in Favorites List ---
    cy.contains("ion-segment-button", "Favorites").click();

    // Check that the session name from step 4 now exists in the favorites list
    cy.get("ion-list#scheduleList").should("contain.text", sessionName);
  });
});
