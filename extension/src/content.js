/**
 * Content script entry point / orchestrator.
 *
 * Wires the shortcut manager to the Issues and Pull Requests adapters.
 * Re-detects the current page on every shortcut press (not once at
 * script load) because GitHub navigates via Turbo/pjax without a full
 * reload, so a cached page type would go stale after in-app navigation.
 * The manifest loads this script repo-wide (not just on Issues/PR
 * URLs) so it's already running when the user soft-navigates into
 * Issues or PRs from elsewhere in the repo. shortcutManager's scope
 * guard (set below) keeps it a no-op outside Issues/PR pages; each
 * handler then checks the specific sub-page it needs on top of that.
 */
(function () {
  'use strict';

  const { selectors, helpOverlay, shortcutManager, issuesAdapter, pullRequestsAdapter } = window.GHA11yExt;

  let liveRegion = null;

  function announce(message) {
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.className = 'gh-a11y-ext-visually-hidden';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('role', 'status');
      document.body.appendChild(liveRegion);
    }
    // Clear first so repeated identical messages are still announced.
    liveRegion.textContent = '';
    window.setTimeout(() => {
      liveRegion.textContent = message;
    }, 50);
  }

  function currentContext() {
    const issuesPage = issuesAdapter.detectPage();
    if (issuesPage) return { workflow: 'issues', page: issuesPage };
    const prPage = pullRequestsAdapter.detectPage();
    if (prPage) return { workflow: 'pr', page: prPage };
    return null;
  }

  function goTo(targetLabel, finder) {
    const el = finder();
    if (el && selectors.focusElement(el)) {
      return;
    }
    announce('Could not find the ' + targetLabel + '. GitHub’s page layout may have changed.');
  }

  function notApplicable() {
    announce('This shortcut is not available on the current page.');
  }

  const SHORTCUTS = [
    {
      code: 'KeyF',
      combo: 'Alt+Shift+F',
      description: 'Focus the Issues filter / search field',
      run(ctx) {
        if (ctx && ctx.workflow === 'issues' && ctx.page === 'issues-list') {
          goTo('filter field', issuesAdapter.findFilter);
        } else {
          notApplicable();
        }
      }
    },
    {
      code: 'KeyI',
      combo: 'Alt+Shift+I',
      description: 'Focus the Issues list (first issue title)',
      run(ctx) {
        if (ctx && ctx.workflow === 'issues' && ctx.page === 'issues-list') {
          goTo('issue list', issuesAdapter.findFirstIssueLink);
        } else {
          notApplicable();
        }
      }
    },
    {
      code: 'KeyC',
      combo: 'Alt+Shift+C',
      description: 'Focus the comment / review editor (Issues or Pull Requests)',
      run(ctx) {
        if (ctx && ctx.workflow === 'issues' && ctx.page === 'issue-detail') {
          goTo('comment editor', issuesAdapter.findCommentEditor);
        } else if (ctx && ctx.workflow === 'pr' && ctx.page === 'pr-detail') {
          goTo('comment editor', pullRequestsAdapter.findCommentEditor);
        } else {
          notApplicable();
        }
      }
    },
    {
      code: 'KeyP',
      combo: 'Alt+Shift+P',
      description: 'Focus the main Pull Request area (tabs or PR list)',
      run(ctx) {
        if (ctx && ctx.workflow === 'pr') {
          goTo('Pull Request area', () => pullRequestsAdapter.findMainArea(ctx.page));
        } else {
          notApplicable();
        }
      }
    },
    {
      code: 'KeyH',
      combo: 'Alt+Shift+H',
      description: 'Open or close this shortcut help overlay',
      run() {
        helpOverlay.toggle(shortcutManager.describeAll());
      }
    }
  ];

  SHORTCUTS.forEach((entry) => {
    shortcutManager.register(entry.code, entry.combo, entry.description, () => entry.run(currentContext()));
  });

  // The scope guard makes shortcutManager skip dispatch entirely
  // (including preventDefault) outside Issues/PR pages, so it's safe to
  // always start the listener — it survives GitHub soft-navigating into
  // Issues/PRs from elsewhere in the repo without doing anything before that.
  shortcutManager.setScopeGuard(() => Boolean(currentContext()));
  shortcutManager.start();
})();
