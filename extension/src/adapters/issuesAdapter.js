/**
 * Handles the Issues list and Issue detail pages: finding the search
 * filter, the first issue in the list, and the comment box, so a
 * shortcut can jump straight there instead of relying on GitHub's own
 * tab order, which isn't always reliable in these areas.
 *
 * Page type is re-detected on every shortcut press rather than cached,
 * since GitHub moves between these views with Turbo and doesn't do a
 * full page reload.
 */
(function () {
  'use strict';

  const { firstMatch, findByRoleAndName, commonTargets } = window.GHA11yExt.selectors;

  function detectPage() {
    const path = window.location.pathname;
    if (/^\/[^/]+\/[^/]+\/issues\/\d+/.test(path)) return 'issue-detail';
    if (/^\/[^/]+\/[^/]+\/issues\/?$/.test(path)) return 'issues-list';
    return null;
  }

  function findFilter() {
    return firstMatch([
      () => findByRoleAndName(document, 'textbox', /search|filter/i),
      () => findByRoleAndName(document, 'combobox', /search|filter/i),
      '#js-issues-search',
      'input[name="q"]',
      '[data-testid="issues-search-input"]',
      '[data-testid*="search" i] input',
      'input[aria-label*="Search" i]',
      'input[placeholder*="Search" i]'
    ]);
  }

  function findFirstIssueLink() {
    return firstMatch([
      () => document.querySelector('[data-testid="issue-row"] a[data-testid="issue-pr-title-link"]'),
      '[data-testid="issue-pr-title-link"]',
      () => {
        const list = document.querySelector('[aria-label="Issues"], #issues-list, [data-testid="issues-list"]');
        return list ? list.querySelector('a') : null;
      },
      '.js-issue-row a.Link--primary',
      'div.js-navigation-container a.h4'
    ]);
  }

  window.GHA11yExt = window.GHA11yExt || {};
  window.GHA11yExt.issuesAdapter = {
    detectPage,
    findFilter,
    findFirstIssueLink,
    findCommentEditor: commonTargets.findCommentTextarea
  };
})();
