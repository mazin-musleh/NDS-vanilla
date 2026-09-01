/* NDS.Modal — public surface
 * Rides: nds-backdrop (the overlay layer, plus ESC and click-outside dismiss)
 * Methods:
 *   NDS.Modal.init()            wire the delegated trigger, close and ESC handlers
 *   NDS.Modal.open(idOrEl)      open a .nds-modal
 *   NDS.Modal.close()           close whatever is open — takes no argument
 *   NDS.Modal.isOpen()          is a modal open?
 *   NDS.Modal.destroy(root)     release an open modal inside root before its markup is
 *                               removed — drops the backdrop and the scroll lock at once.
 *                               NDS.Init.destroy(view) calls it for you
 * Events (bubble from the .nds-modal):
 *   nds:modal:opened   detail (none) — after the open state paints
 *   nds:modal:closed   detail (none) — after the close animation finishes, not on the click
 * Hooks:
 *   data-modal-target   on a trigger — the id of the modal to open
 *   data-modal-close    on any control that should close it (.nds-modal-close works too)
 *   data-modal-static   on the .nds-modal — no ESC, no backdrop click. It closes only
 *                       through a [data-modal-close] control or NDS.Modal.close()
 * Gotchas:
 *   - One modal at a time: open() closes the current one first.
 *   - nds-backdrop.js must be in the bundle. Without it init() and open() log an error
 *     and do nothing.
 */
/**
 * NDS Modal Component
 * Simple modal dialog with backdrop overlay using unified NDSBackdrop API
 *
 * Usage:
 * 1. Button trigger: <button data-modal-target="myModal">Open</button>
 * 2. Programmatic: NDS.Modal.open('myModal')
 * 3. Close: NDS.Modal.close()
 */

(function () {
  'use strict';

  // State
  let activeModal = null;
  let initAbortController = null;
  let _initDone = false;

  // Tab focus trap — delegates to the shared NDS.trapFocus factory.
  // The arrow form re-evaluates `activeModal` on every Tab press, so this
  // single handler instance works across open/close cycles.
  const trapFocus = NDS.trapFocus(() => activeModal);

  /**
   * Open modal by ID or element
   */
  function open(target) {
    // Get modal element — fromTemplate covers an id still inside a <template>
    const modal = typeof target === 'string'
      ? NDS.fromTemplate(target)
      : target;

    if (!modal || !modal.classList.contains('nds-modal')) return;

    // Soft dependency — same loud bail as init(): programmatic NDS.Modal.open()
    // must not TypeError when a consumer bundle excludes nds-backdrop.js.
    if (!NDS.Backdrop) {
      console.error('NDS Modal: requires NDSBackdrop API. Please include nds-backdrop.js first.');
      return;
    }

    // Already the active modal: re-assert the open state and stop (a framework
    // re-render can put [hidden] back). close()+show here would leave close()'s
    // deferred teardown to hide it again after the fade and pop the backdrop.
    if (activeModal === modal) {
      modal.removeAttribute('hidden');
      NDS.aria.hidden(modal, false);
      NDS.State.set(modal, 'open');
      return;
    }
    if (activeModal) close();

    // Show backdrop. A [data-modal-static] modal drops both dismiss paths, so
    // it closes only through a [data-modal-close] control or NDS.Modal.close()
    // — same contract as [data-panel-static].
    const isStatic = modal.hasAttribute('data-modal-static');

    NDS.Backdrop.show({
      zIndex: 1100,
      onClick: () => close(),
      escapeClose: !isStatic,
      clickToClose: !isStatic
    });

    // Show modal
    modal.removeAttribute('hidden');
    NDS.aria.hidden(modal, false);

    // Force reflow to ensure initial state is painted before transition
    modal.offsetHeight;

    // Schedule the open state for after the from-state paint so the CSS
    // transition fires instead of jumping.
    NDS.afterPaint(() => {
      NDS.State.set(modal, 'open');
      modal.dispatchEvent(new CustomEvent('nds:modal:opened', { bubbles: true }));
    });

    // Enable focus trap
    document.addEventListener('keydown', trapFocus);

    activeModal = modal;
  }

  /**
   * Close active modal
   */
  function close() {
    if (!activeModal) return;

    const modal = activeModal;

    // Disable focus trap
    document.removeEventListener('keydown', trapFocus);

    // Blur any focused element inside the modal to prevent aria-hidden warning
    if (document.activeElement && modal.contains(document.activeElement)) {
      document.activeElement.blur();
    }

    // Trigger closing animation
    NDS.State.set(modal, 'closing');
    NDS.aria.hidden(modal, true);

    // Tear down backdrop + modal only after the close animation finishes.
    // Backdrop.hide() runs a synchronous scrollLock.unlock() (full-page reflow);
    // keeping it out of the click frame is what holds the close INP down.
    setTimeout(() => {
      NDS.Backdrop.hide();
      // Re-opened during the fade: open() pushed a fresh backdrop owner, so the
      // pop above stays balanced and the modal must stay up.
      if (activeModal === modal) return;
      modal.setAttribute('hidden', '');
      NDS.State.clear(modal);
      modal.dispatchEvent(new CustomEvent('nds:modal:closed', { bubbles: true }));
    }, NDS.transitionSpeed() + 100);

    activeModal = null;
  }

  /**
   * Release an open modal whose element is inside `root`, before that markup is removed.
   *
   * The listeners this component installs are delegated on document and belong to the page,
   * not to any modal, so there is nothing per-element to release. What CANNOT survive the
   * removal is the open state: the backdrop is showing, the page is scroll-locked (body
   * carries an inline top offset), and the focus trap is reading `activeModal`. Remove the
   * markup without this and the app is left with an overlay it cannot dismiss and a page
   * that will not scroll — the modal element is gone, so nothing can call close().
   *
   * Teardown is immediate, with no closing animation and no nds:modal:closed event: the
   * view is leaving, so there is nothing to animate, and re-entering app code mid-unmount
   * is a hazard rather than a courtesy.
   */
  function destroy(root) {
    if (!activeModal) return 0;
    const scope = root || document;
    if (scope !== document && scope !== activeModal && !scope.contains?.(activeModal)) return 0;

    document.removeEventListener('keydown', trapFocus);
    NDS.Backdrop.hide();
    activeModal.setAttribute('hidden', '');
    NDS.State.clear(activeModal);
    activeModal = null;
    return 1;
  }

  /**
   * Initialize event listeners
   */
  function init() {
    if (_initDone) return;

    // Soft dependency — modal init no-ops (with a loud console.error) if NDS.Backdrop
    // isn't bundled. Modal needs Backdrop's overlay layer to function; failing loudly
    // surfaces the bundle misconfiguration without crashing the whole page.
    if (!NDS.Backdrop) {
      console.error('NDS Modal: requires NDSBackdrop API. Please include nds-backdrop.js first.');
      return;
    }

    // Document-level listeners scoped to one AbortController. Init runs once
    // (_initDone latches, never reset), so there is no prior batch to abort.
    initAbortController = new AbortController();
    const { signal } = initAbortController;

    // Trigger buttons
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-modal-target]');
      if (trigger) {
        e.preventDefault();
        const targetId = trigger.getAttribute('data-modal-target');
        open(targetId);
      }
    }, { signal });

    // Close buttons
    document.addEventListener('click', (e) => {
      if (e.target.closest('.nds-modal-close, [data-modal-close]')) {
        e.stopPropagation();
        close();
      }
    }, { signal });

    // ESC key handling is now in backdrop, but keep this for additional modal-specific behavior
    document.addEventListener('keydown', (e) => {
      if ((e.key === 'Escape' || e.key === 'Esc') && activeModal
          && !activeModal.hasAttribute('data-modal-static')) {
        e.preventDefault();
        close();
      }
    }, { signal });

    _initDone = true;
  }

  /**
   * Public API
   */
  NDS.Modal = {
    init,
    open,
    close,
    isOpen: () => activeModal !== null,
    destroy
  };

})();
