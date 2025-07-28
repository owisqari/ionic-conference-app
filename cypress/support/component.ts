// cypress/support/component.ts

// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

import { mount } from "cypress/angular";

// --- ADDED/MODIFIED IMPORTS FOR IONIC/ANGULAR COMPONENT TESTING ---
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { provideIonicAngular } from "@ionic/angular/standalone"; // CRUCIAL FOR IONIC

// Augment the Cypress namespace to include type definitions for
// your custom command.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add("mount", (component, config) => {
  return mount(component, {
    ...config,
    // Add common providers/imports needed for your components here
    imports: [
      BrowserAnimationsModule, // Provides necessary animation providers
      RouterTestingModule, // Provides a testing module for Angular Router
      ...(config?.imports || []), // Preserve component-specific imports
    ],
    providers: [
      provideIonicAngular(), // Provides Ionic's core services and setup
      ...(config?.providers || []), // Preserve component-specific providers
    ],
  });
});

// Example use:
// cy.mount(MyComponent)
