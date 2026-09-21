// @ts-check
const { test, expect } = require('./fixtures');

/**
 * Reproduction/regression smoke tests — not a replacement for manual
 * Keyboard-only / NVDA evaluation. Runs against the real
 * microsoft/vscode public repository, chosen for its size and
 * stability so an open issue/PR always exists; a failing test may
 * mean GitHub changed its UI rather than an extension defect.
 *
 * Content scripts run in an isolated JS world: `window.GHA11yExt`,
 * set by the extension, is NOT visible from `page.evaluate()`, which
 * runs in the page's main world (only the DOM itself — elements,
 * attributes, document.activeElement, dispatched events — is shared
 * across worlds). So these tests never introspect `window.GHA11yExt`;
 * they black-box test the real, DOM-visible effect of a shortcut (a
 * focus change) and retry the key press for a bounded time to absorb
 * content-script injection latency.
 *
 * The PR detail test targets a fixed PR (#1678) instead of whichever
 * one is currently first in the list: vscode is high-traffic enough
 * that the "first" PR keeps changing, and different PRs render at
 * different speeds. Pinning one keeps the test deterministic.
 */

const REPO = 'https://github.com/microsoft/vscode';
const STABLE_PR_URL = `${REPO}/pull/1678`;
const PR_TAB_LABELS = /^(Conversation|Commits|Checks|Files changed)\b/;

async function activeElementInfo(page) {
  return page.evaluate(() => {
    const el = document.activeElement;
    if (!el) return null;
    return {
      tag: el.tagName,
      role: el.getAttribute('role'),
      type: el.getAttribute('type'),
      href: el.getAttribute('href'),
      ariaCurrent: el.getAttribute('aria-current'),
      ariaLabel: el.getAttribute('aria-label'),
      placeholder: el.getAttribute('placeholder'),
      text: (el.textContent || '').trim()
    };
  });
}

/**
 * Press a shortcut repeatedly until `checkFn` reports success or the
 * retry budget is exhausted. Needed because content-script injection
 * (and thus shortcut-listener attachment) timing varies with system
 * load; polling the actual observable effect is more robust than a
 * fixed sleep.
 */
async function pressUntil(page, keys, checkFn, { retries = 10, intervalMs = 400 } = {}) {
  for (let i = 0; i < retries; i++) {
    await page.keyboard.press(keys);
    await page.waitForTimeout(intervalMs);
    if (await checkFn()) return true;
  }
  return false;
}

/** Navigate to a heavy, client-rendered detail page and let it settle. */
async function gotoDetailPage(page, url) {
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(800);
}

/** True if `info` (from activeElementInfo) looks like the Issues search/filter input. */
function looksLikeIssuesFilterInput(info) {
  if (!info) return false;
  const isTextInput = info.tag === 'INPUT' && ['combobox', 'textbox', null].includes(info.role);
  const looksLikeSearch = /search|filter/i.test(info.placeholder || info.ariaLabel || '');
  return isTextInput && looksLikeSearch;
}

test('Alt+Shift+F focuses the Issues filter/search field on the issues list', async ({ context }) => {
  const page = await context.newPage();
  await page.goto(`${REPO}/issues`, { waitUntil: 'domcontentloaded' });

  // Checks against findFilter()'s actual contract — a labeled search
  // input — not just "focus left <body>".
  const moved = await pressUntil(page, 'Alt+Shift+F', async () => looksLikeIssuesFilterInput(await activeElementInfo(page)));
  expect(moved, 'shortcut should focus the Issues search/filter input, not just any element').toBe(true);
});

test('Alt+Shift+I focuses the first issue title link on the issues list', async ({ context }) => {
  const page = await context.newPage();
  await page.goto(`${REPO}/issues`, { waitUntil: 'domcontentloaded' });

  // A plain href scan isn't enough here: pinned issues render before
  // the regular list and would look like "the first issue link" to a
  // naive query, but the extension doesn't target those. GitHub marks
  // regular issue rows with this data-testid regardless of pinning, so
  // anchoring to it stays independent of the extension's own selector
  // fallback chain while still matching what it actually lands on.
  const expectedHref = await page.evaluate(() => {
    const link = document.querySelector('[data-testid="issue-pr-title-link"]');
    return link ? link.getAttribute('href') : null;
  });
  test.skip(!expectedHref, 'No open issue found on the list to compare against');

  const moved = await pressUntil(page, 'Alt+Shift+I', async () => {
    const info = await activeElementInfo(page);
    return Boolean(info) && info.tag === 'A' && info.href === expectedHref;
  });
  expect(moved, 'shortcut should focus exactly the first issue title link, not an arbitrary one').toBe(true);
});

test('Alt+Shift+C focuses the comment editor on an issue detail page', async ({ context }) => {
  const listPage = await context.newPage();
  await listPage.goto(`${REPO}/issues`, { waitUntil: 'domcontentloaded' });
  const firstIssueHref = await listPage.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a[href*="/issues/"]'));
    const link = links.find((a) => /\/issues\/\d+$/.test(a.getAttribute('href') || ''));
    return link ? link.getAttribute('href') : null;
  });
  await listPage.close();
  test.skip(!firstIssueHref, 'No open issue found to derive a detail-page URL from');

  const page = await context.newPage();
  await gotoDetailPage(page, `https://github.com${firstIssueHref}`);

  // No GitHub login here, so there's no comment textarea to find — the
  // two branches below are NOT equally strong evidence. `hasTextarea`
  // checks the real target; the `else` branch only proves the
  // graceful-failure announcement fires, and says nothing about
  // whether the real editor is reachable when logged in. Manual,
  // authenticated Keyboard-only testing of that target is still open
  // (see docs/TODO.md).
  const hasTextarea = await page.evaluate(() => document.querySelectorAll('textarea').length > 0);

  if (hasTextarea) {
    const moved = await pressUntil(page, 'Alt+Shift+C', async () => {
      const info = await activeElementInfo(page);
      return Boolean(info) && ['TEXTAREA', 'INPUT'].includes(info.tag);
    });
    expect(moved, 'shortcut should focus the comment textarea').toBe(true);
  } else {
    const announced = await pressUntil(page, 'Alt+Shift+C', async () => {
      const text = await page.evaluate(() => {
        const live = document.querySelector('.gh-a11y-ext-visually-hidden[aria-live]');
        return live ? live.textContent : null;
      });
      return Boolean(text) && /could not find/i.test(text);
    });
    expect(
      announced,
      'unauthenticated session: extension should announce graceful failure (this does NOT validate the real, authenticated target)'
    ).toBe(true);
  }
});

test('Alt+Shift+P focuses the first PR link on the pull requests list', async ({ context }) => {
  const page = await context.newPage();
  await page.goto(`${REPO}/pulls`, { waitUntil: 'domcontentloaded' });

  const expectedHref = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a[href*="/pull/"]'));
    const link = links.find((a) => /\/pull\/\d+$/.test(a.getAttribute('href') || ''));
    return link ? link.getAttribute('href') : null;
  });
  test.skip(!expectedHref, 'No open PR found on the list to compare against');

  const moved = await pressUntil(page, 'Alt+Shift+P', async () => {
    const info = await activeElementInfo(page);
    return Boolean(info) && info.tag === 'A' && info.href === expectedHref;
  });
  expect(moved, 'shortcut should focus exactly the first PR link, not an arbitrary element').toBe(true);
});

test('Alt+Shift+P focuses the PR header navigation area on a PR detail page', async ({ context }) => {
  const page = await context.newPage();
  await gotoDetailPage(page, STABLE_PR_URL);

  // Wait for a real readiness signal (the "Conversation" tab
  // rendering) instead of a fixed delay — the page's main content can
  // take longer than a guessed timeout to show up.
  await page.getByRole('link', { name: 'Conversation' }).first().waitFor({ state: 'visible', timeout: 15000 });

  const moved = await pressUntil(page, 'Alt+Shift+P', async () => {
    const info = await activeElementInfo(page);
    if (!info || info.tag !== 'A') return false;
    // Mirrors findPrNavigationTarget()'s actual fallback order: GitHub's
    // PR header has no role="tab"/"tablist" right now, so this checks
    // for the real fallbacks instead — aria-current="page" on the
    // active tab link, or its visible text matching a known label.
    return info.ariaCurrent === 'page' || PR_TAB_LABELS.test(info.text);
  });
  expect(
    moved,
    'shortcut should focus a real PR header nav link (aria-current="page" or a Conversation/Commits/Checks/Files changed label), not merely leave <body>'
  ).toBe(true);
});

test('Alt+Shift+H opens an accessible help dialog and Escape restores focus to the trigger', async ({ context }) => {
  const page = await context.newPage();
  await page.goto(`${REPO}/issues`, { waitUntil: 'domcontentloaded' });

  // Use a link (via Alt+Shift+I) as the known trigger element rather
  // than the filter input: shortcuts are disabled while focus is in an
  // editable field, so opening help from inside the filter input would
  // never fire by design. Tag the trigger so we can confirm Escape
  // returns focus to that exact element, not just off <body>.
  const linkFocused = await pressUntil(page, 'Alt+Shift+I', async () => {
    const info = await activeElementInfo(page);
    return Boolean(info) && info.tag === 'A';
  });
  expect(linkFocused, 'setup: an issue link must be focused before testing the help dialog').toBe(true);
  await page.evaluate(() => document.activeElement.setAttribute('data-a11y-test-trigger', 'true'));

  const dialog = page.locator('#gh-a11y-ext-help-overlay');
  const opened = await pressUntil(page, 'Alt+Shift+H', async () => (await dialog.count()) > 0);
  expect(opened, 'Alt+Shift+H should open the help dialog').toBe(true);
  await expect(dialog).toHaveAttribute('role', 'dialog');
  await expect(dialog).toHaveAttribute('aria-modal', 'true');

  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);

  const restoredToTrigger = await page.evaluate(
    () => document.activeElement.getAttribute('data-a11y-test-trigger') === 'true'
  );
  expect(restoredToTrigger, 'focus should return to the exact element that opened the dialog, not just leave <body>').toBe(
    true
  );
});

test('Alt+Shift+F works after GitHub soft-navigates from the repo root into Issues', async ({ context }) => {
  const page = await context.newPage();
  await page.goto(REPO, { waitUntil: 'domcontentloaded' });

  // Click GitHub's own "Issues" tab. This is an in-app (Turbo) route
  // change, not a full reload, so it proves the content script was
  // already loaded on the repo root page and stays usable across it —
  // the actual behavior the M4 scope change relies on.
  const issuesLink = page.getByRole('link', { name: /^Issues/ }).first();
  await issuesLink.waitFor({ state: 'visible', timeout: 15000 });
  const navigated = page.waitForURL('**/issues', { timeout: 15000 });
  await issuesLink.click();
  await navigated;

  const moved = await pressUntil(page, 'Alt+Shift+F', async () => looksLikeIssuesFilterInput(await activeElementInfo(page)));
  expect(moved, 'shortcut should work immediately after the soft navigation, without a reload').toBe(true);
});

test('shortcuts stay inert and do not consume the key event on a non-Issues/PR page', async ({ context }) => {
  const page = await context.newPage();
  await page.goto(REPO, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);

  // The extension's listener runs in the isolated world's capture
  // phase. A bubble-phase listener added here (the page's main world)
  // still sees the same underlying Event object — including
  // defaultPrevented — since the DOM/event system, unlike JS globals,
  // is shared across worlds. If the extension ever consumed the event
  // outside its scope, this listener would see defaultPrevented=true.
  await page.evaluate(() => {
    window.__probeKeyLog = [];
    document.addEventListener('keydown', (e) => {
      if (e.altKey && e.shiftKey && (e.code === 'KeyF' || e.code === 'KeyH')) {
        window.__probeKeyLog.push({ code: e.code, defaultPrevented: e.defaultPrevented });
      }
    });
  });

  await page.evaluate(() => document.activeElement && document.activeElement.setAttribute('data-a11y-probe-initial', 'true'));

  await page.keyboard.press('Alt+Shift+F');
  await page.waitForTimeout(300);
  const focusUnchanged = await page.evaluate(
    () => document.activeElement && document.activeElement.getAttribute('data-a11y-probe-initial') === 'true'
  );
  expect(focusUnchanged, 'Alt+Shift+F should not move focus on an unrelated page').toBe(true);

  const liveRegionExists = await page.evaluate(() =>
    Boolean(document.querySelector('.gh-a11y-ext-visually-hidden[aria-live]'))
  );
  expect(liveRegionExists, 'no live region should be created on an unrelated page').toBe(false);

  await page.keyboard.press('Alt+Shift+H');
  await page.waitForTimeout(300);
  const dialogCount = await page.locator('#gh-a11y-ext-help-overlay').count();
  expect(dialogCount, 'Alt+Shift+H should not open the help dialog on an unrelated page').toBe(0);

  const keyLog = await page.evaluate(() => window.__probeKeyLog);
  expect(keyLog.length, 'both key events should still reach a page-level listener').toBe(2);
  expect(
    keyLog.every((entry) => entry.defaultPrevented === false),
    'the extension should not call preventDefault() on either key outside Issues/PR'
  ).toBe(true);
});
