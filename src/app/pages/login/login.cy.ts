import { LoginPage } from "./login";
import { FormsModule, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonInput,
  IonMenuButton,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/angular/standalone";

import { UserService } from "../../providers/user.service";
import { UserOptions } from "../../interfaces/user-options";

describe("LoginPage", () => {
  let mockRouter: Router;
  let mockUserService: UserService;

  beforeEach(() => {
    cy.mount(LoginPage, {
      imports: [
        FormsModule,
        NoopAnimationsModule,
        IonButton,
        IonButtons,
        IonCol,
        IonContent,
        IonHeader,
        IonInput,
        IonMenuButton,
        IonRow,
        IonTitle,
        IonToolbar,
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: UserService, useValue: mockUserService },
      ],
    });
  });

  it("should display the login page title", () => {
    cy.get("ion-title").should("contain.text", "Login");
  });

  it("should display the Ionic logo", () => {
    cy.get(".login-logo img")
      .should("have.attr", "src", "assets/img/appicon.svg")
      .and("have.attr", "alt", "Ionic Logo");
  });

  it("should have username and password input fields", () => {
    cy.get('ion-input[name="username"]').should("exist");
    cy.get('ion-input[name="password"]').should("exist");
  });

  it("should load the login page and display the form", () => {
    cy.visit("/login");
    cy.get("page-login").should("exist");

    cy.get("[data-login-form-submit-button]").should("be.visible");
  });

  it('should display "Login" and "Signup" buttons', () => {
    cy.wait(400);

    cy.get("[data-login-form-submit-button]").should("be.visible");
    cy.get("[data-signup-form-submit-button]").should("be.visible");
  });

  // it("should show validation error for username when submitted empty", () => {
  //   cy.get('ion-input[name="username"]').as("usernameInput");

  //   cy.get("ion-button").contains("Login").click();

  //   cy.get("@usernameInput").should("have.class", "ion-invalid");

  //   cy.get("@usernameInput")
  //     .shadow()
  //     .find(".input-bottom.sc-ion-input-md")
  //     .should("contain.text", "Username is required")
  //     .and("be.visible");
  // });

  // it("should show validation error for password when submitted empty", () => {
  //   cy.get('ion-input[name="password"]').as("passwordInput");

  //   // Click the login button without entering anything
  //   cy.get("ion-button").contains("Login").click();

  //   cy.get("@passwordInput").should("have.class", "ion-invalid");

  //   cy.get("@passwordInput")
  //     .shadow()
  //     .find(".input-bottom.sc-ion-input-md")
  //     .should("contain.text", "Password is required")
  //     .and("be.visible");
  // });

  // it("should call userService.login and navigate on successful login", () => {
  //   // Type into inputs
  //   cy.get('ion-input[name="username"]').type("user1");
  //   cy.get('ion-input[name="password"]').type("1234");

  //   // Click login button
  //   cy.get("ion-button").contains("Login").click();

  //   // Assert that UserService.login was called
  //   cy.wrap(mockUserService.login).should("have.been.calledWith", "testuser");

  //   // Assert that Router.navigateByUrl was called
  //   cy.wrap(mockRouter.navigateByUrl).should(
  //     "have.been.calledWith",
  //     "/app/tabs/schedule"
  //   );
  // });

  // it("should navigate to signup page when signup button is clicked", () => {
  //   cy.get("ion-button").contains("Signup").click();

  //   // Assert that Router.navigateByUrl was called with the signup path
  //   cy.wrap(mockRouter.navigateByUrl).should("have.been.calledWith", "/signup");
  // });

  // it("should not call login or navigate if form is invalid", () => {
  //   // Type only username, leaving password empty (making form invalid due to 'required' on password)
  //   cy.get('ion-input[name="username"]').type("testuser");

  //   cy.get("ion-button").contains("Login").click();

  //   // Assert that UserService.login was NOT called
  //   cy.wrap(mockUserService.login).should("not.have.been.called");
  //   // Assert that Router.navigateByUrl was NOT called
  //   cy.wrap(mockRouter.navigateByUrl).should("not.have.been.called");
  // });
});
