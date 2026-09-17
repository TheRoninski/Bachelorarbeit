/**
 * Accessible help dialog listing the available shortcuts. This is a
 * real modal, so trapping Tab inside it is appropriate here — unlike
 * the rest of the extension, where we deliberately avoid focus traps.
 */
(function () {
  'use strict';

  const OVERLAY_ID = 'gh-a11y-ext-help-overlay';
  let dialogEl = null;
  let backdropEl = null;
  let triggerEl = null;
  let keydownHandler = null;

  function focusableChildren() {
    if (!dialogEl) return [];
    return Array.from(
      dialogEl.querySelectorAll('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])')
    ).filter((el) => window.GHA11yExt.selectors.isVisible(el) && !el.matches(':disabled'));
  }

  function trapFocus(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = focusableChildren();
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function buildDialog(shortcuts) {
    const backdrop = document.createElement('div');
    backdrop.className = 'gh-a11y-ext-overlay-backdrop';
    backdrop.addEventListener('mousedown', (event) => {
      if (event.target === backdrop) close();
    });

    const dialog = document.createElement('div');
    dialog.id = OVERLAY_ID;
    dialog.className = 'gh-a11y-ext-overlay-dialog';
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-labelledby', 'gh-a11y-ext-help-title');

    const heading = document.createElement('h2');
    heading.id = 'gh-a11y-ext-help-title';
    heading.textContent = 'Accessibility shortcuts';

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'gh-a11y-ext-overlay-close';
    closeBtn.setAttribute('aria-label', 'Close shortcut help');
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', close);

    const intro = document.createElement('p');
    intro.className = 'gh-a11y-ext-overlay-intro';
    intro.textContent =
      'These shortcuts move keyboard focus to a fixed target. They are disabled while typing in a text field.';

    const list = document.createElement('ul');
    list.className = 'gh-a11y-ext-overlay-list';
    shortcuts.forEach((item) => {
      const li = document.createElement('li');
      const kbd = document.createElement('kbd');
      kbd.textContent = item.combo;
      const desc = document.createElement('span');
      desc.textContent = ' – ' + item.description;
      li.appendChild(kbd);
      li.appendChild(desc);
      list.appendChild(li);
    });

    dialog.appendChild(closeBtn);
    dialog.appendChild(heading);
    dialog.appendChild(intro);
    dialog.appendChild(list);
    backdrop.appendChild(dialog);
    return { backdrop, dialog, closeBtn };
  }

  function open(shortcuts) {
    if (dialogEl) return; // already open
    triggerEl = document.activeElement;

    const { backdrop, dialog, closeBtn } = buildDialog(shortcuts);
    document.body.appendChild(backdrop);
    backdropEl = backdrop;
    dialogEl = dialog;

    keydownHandler = trapFocus;
    dialog.addEventListener('keydown', keydownHandler);

    closeBtn.focus();
  }

  function close() {
    if (!dialogEl) return;
    dialogEl.removeEventListener('keydown', keydownHandler);
    if (backdropEl && backdropEl.parentNode) backdropEl.parentNode.removeChild(backdropEl);
    dialogEl = null;
    backdropEl = null;
    keydownHandler = null;

    // Return focus to whatever triggered the dialog, if it's still
    // around and focusable; otherwise fall back to <body>. Only add a
    // tabindex if body doesn't already have one, and remove exactly
    // what we added right after focusing, so nothing is left behind.
    if (triggerEl && document.contains(triggerEl) && typeof triggerEl.focus === 'function') {
      triggerEl.focus();
    } else if (document.body) {
      const hadTabindex = document.body.hasAttribute('tabindex');
      if (!hadTabindex) {
        document.body.setAttribute('tabindex', '-1');
      }
      document.body.focus();
      if (!hadTabindex) {
        document.body.removeAttribute('tabindex');
      }
    }
    triggerEl = null;
  }

  function isOpen() {
    return Boolean(dialogEl);
  }

  function toggle(shortcuts) {
    if (isOpen()) {
      close();
    } else {
      open(shortcuts);
    }
  }

  window.GHA11yExt = window.GHA11yExt || {};
  window.GHA11yExt.helpOverlay = { open, close, toggle, isOpen };
})();
