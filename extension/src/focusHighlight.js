/**
 * Draws a temporary highlight around the element a shortcut moved
 * focus to. While the highlight is active, its outline uses the
 * extension's own color instead of the element's normal outline.
 * The colors are adjusted for GitHub's light and dark themes.
 */
(function () {
  'use strict';

  const HIGHLIGHT_CLASS = 'gh-a11y-ext-highlight';
  let currentEl = null;
  let removeTimer = null;

  function clear() {
    if (currentEl) {
      currentEl.classList.remove(HIGHLIGHT_CLASS);
      currentEl.removeEventListener('blur', clear);
    }
    currentEl = null;
    if (removeTimer) {
      clearTimeout(removeTimer);
      removeTimer = null;
    }
  }

  function highlight(el) {
    if (!el) return;
    clear();
    el.classList.add(HIGHLIGHT_CLASS);
    currentEl = el;
    el.addEventListener('blur', clear, { once: true });
    // Also clear on a timer in case blur never fires — e.g. the
    // element got removed from the DOM before it had a chance to blur.
    removeTimer = setTimeout(clear, 2500);
  }

  window.GHA11yExt = window.GHA11yExt || {};
  window.GHA11yExt.focusHighlight = { highlight, clear };
})();
