const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const cucumber = require("@badeball/cypress-cucumber-preprocessor");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.giulianaflores.com.br",
    specPattern: "cypress/e2e/features/**/*.feature",
    supportFile: "cypress/support/e2e.js",
    async setupNodeEvents(on, config) {
      await cucumber.addCucumberPreprocessorPlugin(on, config);
      on("file:preprocessor", createBundler({
        plugins: [createEsbuildPlugin(config)],
      }));
      return config;
    },
  },
});
