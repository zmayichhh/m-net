const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 6000,
  env: {
    url: "https://www.m-net.de/privatkunden/",
  },
  e2e: {
    specPattern: "cypress/integration/examples/*.js",
    setupNodeEvents,
  },
});
