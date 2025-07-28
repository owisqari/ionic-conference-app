import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "qtgszp",

  e2e: {
    baseUrl: "http://localhost:8100",
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "**/*.cy.ts",
  },
});
