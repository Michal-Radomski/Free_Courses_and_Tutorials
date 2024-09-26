import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    defaultCommandTimeout: 15000,
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
  },
});
