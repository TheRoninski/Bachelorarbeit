/**
 * Central keyboard shortcut dispatcher.
 *
 * All shortcuts use Alt+Shift+<letter>, which doesn't type a character
 * in standard layouts and isn't a default Chrome or GitHub binding, so
 * there's little risk of stepping on something else. They're still
 * disabled whenever focus is on an editable element, so they never
 * interrupt normal typing.
 */
(function () {
  'use strict';

  const registry = []; // { code, description, handler }

  function isEditableTarget(el) {
    if (!el) return false;
    const tag = el.tagName ? el.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return true;
    if (el.isContentEditable) return true;
    return false;
  }

  function register(code, comboLabel, description, handler) {
    registry.push({ code, comboLabel, description, handler });
  }

  function describeAll() {
    return registry.map((entry) => ({ combo: entry.comboLabel, description: entry.description }));
  }

  function onKeydown(event) {
    if (!event.altKey || !event.shiftKey || event.ctrlKey || event.metaKey) return;
    if (isEditableTarget(event.target)) return;

    const entry = registry.find((item) => item.code === event.code);
    if (!entry) return;

    event.preventDefault();
    event.stopPropagation();
    entry.handler(event);
  }

  function start() {
    // Keep start() idempotent in case initialization runs more than once.
    if (window.__ghA11yExtListenerAttached) return;
    window.__ghA11yExtListenerAttached = true;
    document.addEventListener('keydown', onKeydown, true);
  }

  function stop() {
    document.removeEventListener('keydown', onKeydown, true);
    window.__ghA11yExtListenerAttached = false;
  }

  window.GHA11yExt = window.GHA11yExt || {};
  window.GHA11yExt.shortcutManager = { register, describeAll, start, stop };
})();
