const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    "baseUrl": 'https://pushing-front.vercel.app/',
    watchForFileChanges: false,
    defaultCommandTimeout: 10000
  },
  env: {
    username: 'pushingit',
    password: '123456!',
  },
});
