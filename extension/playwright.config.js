// @ts-check
const { defineConfig } = require('@playwright/test');

/**
 * Loading an unpacked extension needs a persistent Chromium context
 * (see tests/fixtures.js), so tests run one at a time against the real
 * github.com instead of in parallel — GitHub's abuse detection doesn't
 * like a bunch of near-identical automated sessions at once. This is a
 * smoke/regression layer; it doesn't replace manual Keyboard-only or
 * NVDA testing.
 */
module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [['list']],
  use: {
    trace: 'retain-on-failure'
  }
});
