const { defineConfig } = require("cypress");
const { devServer } = require("@cypress/webpack-dev-server");
const webpackConfig = require("@angular-devkit/build-angular/src/utils/webpack-browser-config"); // This line is problematic if paths are wrong

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:8100", // For E2E tests
  },

  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
      webpackConfig: async () => {
        // This is where the error likely occurs
        // The `getAngularCliWebpackConfig` function might be receiving bad arguments
        // or there's an incompatibility in its internal path resolution.
        const angularWebpackConfig =
          await require("@cypress/angular/src/devServer").getAngularCliWebpackConfig();
        return angularWebpackConfig;
      },
    },
    specPattern: "**/*.cy.{js,jsx,ts,tsx}",
    indexHtmlFile: "cypress/support/component-index.html", // Example
  },
});
