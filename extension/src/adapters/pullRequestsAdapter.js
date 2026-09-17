/**
 * Handles the Pull Request list and PR detail pages: focusing the
 * header tabs (or the first PR row on the list) and the comment box.
 *
 * GitHub's PR header doesn't reliably expose role="tab"/"tablist", so
 * findPrNavigationTarget() tries that first in case it's there, then
 * falls back to `aria-current="page"` on the active tab link, and
 * finally to matching the tab link by its visible text (see
 * docs/KNOWLEDGE_BASE.md section 17 for the background on why).
 */
(function () {
  'use strict';

  const { firstMatch, findByRoleAndName, commonTargets } = window.GHA11yExt.selectors;

  const TAB_LABELS = /^(Conversation|Commits|Checks|Files changed)\b/;

  function detectPage() {
    const path = window.location.pathname;
    if (/^\/[^/]+\/[^/]+\/pull\/\d+/.test(path)) return 'pr-detail';
    if (/^\/[^/]+\/[^/]+\/pulls\/?$/.test(path)) return 'pr-list';
    return null;
  }

  function findPrNavigationTarget() {
    return firstMatch([
      () => {
        const activeTab = document.querySelector('[role="tab"][aria-selected="true"]');
        if (activeTab) return activeTab;
        return document.querySelector('[role="tab"]');
      },
      // More reliable than matching by label text below, since it
      // doesn't depend on exact accessible-name text.
      () => document.querySelector('a[aria-current="page"]'),
      () => findByRoleAndName(document, 'link', TAB_LABELS),
      '.tabnav-tabs [role="tab"]',
      '#partial-discussion-header nav a'
    ]);
  }

  function findFirstPrLink() {
    return firstMatch([
      '[data-testid="issue-pr-title-link"]',
      () => {
        const list = document.querySelector('[aria-label="Pull requests"], [data-testid="issues-list"]');
        return list ? list.querySelector('a') : null;
      },
      '.js-issue-row a.Link--primary'
    ]);
  }

  /** Central PR area: header nav target on the detail page, first PR row on the list page. */
  function findMainArea(pageType) {
    if (pageType === 'pr-detail') return findPrNavigationTarget();
    if (pageType === 'pr-list') return findFirstPrLink();
    return null;
  }

  window.GHA11yExt = window.GHA11yExt || {};
  window.GHA11yExt.pullRequestsAdapter = {
    detectPage,
    findMainArea,
    findCommentEditor: commonTargets.findCommentTextarea
  };
})();
