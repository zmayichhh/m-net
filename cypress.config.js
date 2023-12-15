const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 6000,
  env: {
    url: "https://www.m-net.de/privatkunden/",
  },
  e2e: {
    specPattern: "cypress/integration/examples/mnetAPI.js",
    baseUrl: "https://www.m-net.de/privatkunden/",
    setupNodeEvents(on, config) {},
  },
});
