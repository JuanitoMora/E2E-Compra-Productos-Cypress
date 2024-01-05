const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
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
