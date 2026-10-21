/* NDS.Modal — public surface
 * Rides: <dialog> through NDS.dialog, the core it shares with Panel (the top layer, the dim
 *        layer, an inert page, focus return)
 * Requires:
 *   [data-modal-target] points at .nds-modal via data-modal-target — the click opens nothing
 * Methods:
 *   NDS.Modal.init()            wire the delegated trigger and close handlers
 *   NDS.Modal.open(idOrEl)      open a dialog.nds-modal
 *   NDS.Modal.close()           close whatever is open — takes no argument
 *   NDS.Modal.isOpen()          is a modal open?
 *   NDS.Modal.destroy(root)     release an open modal inside root before its markup is
 *                               removed — closes it and drops the scroll lock at once.
 *                               NDS.init.destroy(view) calls it for you
 * Events (bubble from the .nds-modal):
 *   nds:modal:opened   detail (none) — after the open state paints
 *   nds:modal:closed   detail (none) — after the close animation finishes, not on the click
 * Hooks:
 *   data-modal-target   on a trigger — the id of the modal to open
 *   data-modal-close    on any control that should close it (.nds-modal-close works too)
 *   data-modal-static   on the .nds-modal — no Escape, no click outside. It closes only
 *                       through a [data-modal-close] control or NDS.Modal.close()
 *   data-state          open | closing — written by JS on the .nds-modal while it is
 *                       shown and while it animates out. Read-only for consumers
 * Gotchas:
 *   - The modal is a <dialog>. A div.nds-modal logs an error and does not open.
 *   - One modal at a time: open() closes the current one first.
 *   - Enter while the modal box itself has focus clicks the first .nds-primary button in .nds-card-actions.
 *   - open() focuses the first close control (or the modal itself); close() returns focus
 *     to whatever held it before the open.
 */
(function () {
  'use strict';

  let activeModal = null;
  let initAbortController = null;
  let openAbortController = null; // the open modal's own listeners; aborted when it closes
  let initDone = false;
  let opener = null; // element focused before the first open; the last close returns focus to it

  function open(target) {
    // A page with no modal at load never runs init(), so open() wires the close controls too.
    init();
    // fromTemplate covers an id still inside a <template>
    const modal = typeof target === 'string' ? NDS.fromTemplate(target) : target;
    if (!modal || !modal.classList.contains('nds-modal')) return;
    if (!(modal instanceof HTMLDialogElement)) {
      console.error('NDS Modal: .nds-modal must be a <dialog>.', modal);
      return;
    }

    // Already the active modal: re-assert the open state and stop.
    if (activeModal === modal) {
      NDS.state.set(modal, 'open');
      return;
    }
    if (activeModal) close();

    // Kept across a swap: the first modal's opener gets focus back.
    if (!opener) opener = document.activeElement;
    openAbortController = new AbortController();
    const { signal } = openAbortController;
    NDS.dialog.show(modal, signal);
    activeModal = modal;

    // The from-state paints first, so the CSS transition runs.
    NDS.afterPaint(() => {
      if (activeModal !== modal) return;
      NDS.state.set(modal, 'open');
      modal.dispatchEvent(new CustomEvent('nds:modal:opened', { bubbles: true }));
    });

    const isStatic = () => modal.hasAttribute('data-modal-static');
    const handleEscape = (e) => {
      // A dialog above it (a modal panel inside) answers instead.
      if (e.key !== 'Escape' || e.defaultPrevented || NDS.dialog.top() !== modal) return;
      // The native close skips the fade.
      e.preventDefault();
      if (!isStatic()) close();
    };
    // Focus on <body> (a click on plain text) never reaches the dialog's own listener.
    document.addEventListener('keydown', (e) => {
      if (!modal.contains(e.target)) handleEscape(e);
    }, { signal });
    // On the dialog, not document: a menu inside that handles Escape stops it first.
    modal.addEventListener('keydown', (e) => {
      handleEscape(e);
      // Enter on the box itself (focused when there is no close control) presses the primary action.
      if (e.key === 'Enter' && e.target === modal) {
        const primary = modal.querySelector('.nds-card-actions .nds-btn.nds-primary');
        if (primary) { e.preventDefault(); primary.click(); }
      }
    }, { signal });
    NDS.dialog.onOutside(modal, () => { if (!isStatic()) close(); }, signal);

    const focusTarget = modal.querySelector('[autofocus]') || modal.querySelector('[data-modal-close], .nds-modal-close') || modal;
    if (focusTarget === modal && !modal.hasAttribute('tabindex')) modal.tabIndex = -1;
    // Ring only if the opener had one: a script open at load otherwise paints it (Chrome treats pre-input focus as keyboard).
    focusTarget.focus({ preventScroll: true, focusVisible: !!opener?.matches?.(':focus-visible') });
  }

  // Close the dialog and, after the last modal, give the page back.
  function finish(modal) {
    NDS.dialog.close(modal);
    NDS.state.clear(modal);
    if (activeModal) return;
    // The browser hands focus back on close(); after a swap it aims at the closed first modal.
    const focused = document.activeElement;
    if (opener?.isConnected && (!focused || focused === document.body || focused.closest('dialog:not([open])'))) {
      opener.focus({ preventScroll: true });
    }
    opener = null;
  }

  function close() {
    const modal = activeModal;
    if (!modal) return;
    activeModal = null;
    openAbortController?.abort();
    NDS.dialog.hideMenus(modal);
    NDS.state.set(modal, 'closing');
    // The dialog stays in the top layer for the fade; the unlock reflow stays out of the click frame.
    setTimeout(() => {
      if (activeModal === modal) return; // re-opened during the fade
      finish(modal);
      modal.dispatchEvent(new CustomEvent('nds:modal:closed', { bubbles: true }));
    }, NDS.transitionSpeed() + 100);
  }

  /**
   * Release an open modal inside `root` before that markup is removed: the scroll lock
   * cannot survive the removal. Immediate, with no fade and no nds:modal:closed event —
   * the view is leaving, and re-entering app code mid-unmount is a hazard.
   */
  function destroy(root) {
    const modal = activeModal;
    if (!modal) return 0;
    const scope = root || document;
    if (scope !== document && scope !== modal && !scope.contains?.(modal)) return 0;
    activeModal = null;
    openAbortController?.abort();
    finish(modal);
    return 1;
  }

  function init() {
    if (initDone) return;
    // Init runs once (initDone latches), so there is no prior batch to abort.
    initAbortController = new AbortController();
    const { signal } = initAbortController;

    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-modal-target]');
      if (trigger) {
        e.preventDefault();
        open(trigger.getAttribute('data-modal-target'));
      }
    }, { signal });

    document.addEventListener('click', (e) => {
      if (e.target.closest('.nds-modal-close, [data-modal-close]')) {
        e.stopPropagation();
        close();
      }
    }, { signal });

    // A dialog closed without close(): a <form method="dialog">, or Chrome's repeat Escape.
    // close does not bubble, so capture hears it. It is queued: a modal open again by then is stale.
    document.addEventListener('close', (e) => {
      if (e.target !== activeModal || e.target.open) return;
      activeModal = null;
      openAbortController?.abort();
      finish(e.target);
      e.target.dispatchEvent(new CustomEvent('nds:modal:closed', { bubbles: true }));
    }, { capture: true, signal });

    initDone = true;
  }

  NDS.Modal = {
    init,
    open,
    close: () => close(),
    isOpen: () => activeModal !== null,
    destroy
  };

})();
