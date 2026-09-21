// @ts-check
const base = require('@playwright/test');
const path = require('path');
const fs = require('fs');
const os = require('os');

const EXTENSION_PATH = path.join(__dirname, '..');

/**
 * Extension-loading fixture. Loading an unpacked extension only works
 * with a persistent Chromium context (no incognito, no plain
 * chromium.launch()), per Playwright's documented extension-testing
 * pattern. There is no background service worker in this MV3 extension
 * (see manifest.json), so no extension-id fixture is needed — tests
 * only rely on the content script that is injected on matching GitHub
 * URLs.
 */
const test = base.test.extend({
  context: async ({}, use) => {
    const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'gh-a11y-ext-'));
    const context = await base.chromium.launchPersistentContext(userDataDir, {
      headless: false,
      args: [`--disable-extensions-except=${EXTENSION_PATH}`, `--load-extension=${EXTENSION_PATH}`]
    });
    await use(context);
    // Always remove the temp profile, even if close() itself throws.
    try {
      await context.close();
    } finally {
      fs.rmSync(userDataDir, { recursive: true, force: true });
    }
  }
});

module.exports = { test, expect: base.expect };
