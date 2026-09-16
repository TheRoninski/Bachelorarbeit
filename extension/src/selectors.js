/**
 * Tries to find stable targets by role and accessible name first,
 * then falls back to test ids, DOM structure and finally CSS
 * selectors.
 */
(function () {
  'use strict';

  function isVisible(el) {
    if (!el || !(el instanceof Element)) return false;
    if (el.hasAttribute('hidden')) return false;
    if (el.closest('[hidden]')) return false;
    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') return false;
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  /**
   * Rough guess at an element's accessible name — not a real accname
   * computation, that's a spec of its own. Good enough to tell targets
   * apart by their label text.
   */
  function accessibleNameGuess(el) {
    if (!el) return '';
    const ariaLabel = el.getAttribute('aria-label');
    if (ariaLabel && ariaLabel.trim()) return ariaLabel.trim();
    const labelledBy = el.getAttribute('aria-labelledby');
    if (labelledBy) {
      const text = labelledBy
        .split(/\s+/)
        .map((id) => document.getElementById(id))
        .filter(Boolean)
        .map((n) => n.textContent || '')
        .join(' ')
        .trim();
      if (text) return text;
    }
    if ('placeholder' in el && el.placeholder) return el.placeholder.trim();
    if (el.title) return el.title.trim();
    return (el.textContent || '').trim();
  }

  function isNativelyFocusable(el) {
    const tag = el.tagName.toLowerCase();
    if (['a', 'button', 'input', 'textarea', 'select', 'summary'].includes(tag)) return true;
    if (el.hasAttribute('tabindex')) return true;
    if (el.isContentEditable) return true;
    return false;
  }

  function matchesRole(el, role) {
    const explicit = el.getAttribute('role');
    if (explicit) return explicit.split(/\s+/).includes(role);
    const tag = el.tagName.toLowerCase();
    if (role === 'textbox') {
      if (tag === 'textarea') return true;
      if (tag === 'input') {
        const type = (el.getAttribute('type') || 'text').toLowerCase();
        return ['text', 'search', 'email', ''].includes(type);
      }
      return false;
    }
    if (role === 'link') return tag === 'a' && el.hasAttribute('href');
    if (role === 'button') return tag === 'button';
    return false;
  }

  /** Find the first visible element with a given (explicit or implicit) role and, optionally, a name pattern. */
  function findByRoleAndName(root, role, namePattern) {
    const scope = root || document;
    const candidates = Array.from(scope.querySelectorAll('a, button, input, textarea, [role]'));
    for (const el of candidates) {
      if (!matchesRole(el, role)) continue;
      if (!isVisible(el)) continue;
      const name = accessibleNameGuess(el);
      if (!namePattern || namePattern.test(name)) return el;
    }
    return null;
  }

  /**
   * Tries each strategy (a CSS string or a finder function) in order
   * and returns the first visible match. GitHub changes its markup
   * from time to time, so one broken selector shouldn't stop the rest
   * of the fallback chain from working — a throwing strategy just gets
   * skipped.
   */
  function firstMatch(strategies) {
    for (const strategy of strategies) {
      try {
        const result = typeof strategy === 'function' ? strategy() : document.querySelector(strategy);
        if (result && isVisible(result)) return result;
      } catch (err) {
        continue;
      }
    }
    return null;
  }

  /**
   * Focuses an element safely. If it isn't normally focusable, we set
   * tabindex="-1" so .focus() works without adding another stop to the
   * normal Tab order. Only scrolls if the target isn't already visible,
   * and shows the highlight unless the caller opted out.
   */
  function focusElement(el, options) {
    if (!el) return false;
    const opts = options || {};
    if (el.tabIndex < 0 && !isNativelyFocusable(el)) {
      el.setAttribute('tabindex', '-1');
    }
    try {
      el.focus({ preventScroll: true });
    } catch (err) {
      return false;
    }
    // Scroll instantly, and only if the target isn't already visible —
    // avoids unnecessary motion and reduces focus disruption on
    // dynamically rendered pages.
    if (typeof el.scrollIntoView === 'function' && typeof el.getBoundingClientRect === 'function') {
      const rect = el.getBoundingClientRect();
      const inView = rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
      if (!inView) {
        el.scrollIntoView({ block: 'center', behavior: 'auto' });
      }
    }
    if (opts.highlight !== false && window.GHA11yExt && window.GHA11yExt.focusHighlight) {
      window.GHA11yExt.focusHighlight.highlight(el);
    }
    return document.activeElement === el;
  }

  /**
   * Issues and Pull Requests use basically the same comment box
   * markup, so this lives here once instead of being copy-pasted into
   * both adapters.
   */
  const commonTargets = {
    /** The comment/review textarea — same markup on Issue and PR conversation pages. */
    findCommentTextarea() {
      return firstMatch([
        () => findByRoleAndName(document, 'textbox', /comment/i),
        '#new_comment_field',
        'textarea[name="comment[body]"]',
        '[data-testid="comment-textarea"] textarea',
        '[data-testid="comment-textarea"]',
        'form.js-new-comment-form textarea',
        'textarea[aria-label*="comment" i]'
      ]);
    }
  };

  window.GHA11yExt = window.GHA11yExt || {};
  window.GHA11yExt.selectors = {
    isVisible,
    accessibleNameGuess,
    matchesRole,
    findByRoleAndName,
    firstMatch,
    focusElement,
    commonTargets
  };
})();
