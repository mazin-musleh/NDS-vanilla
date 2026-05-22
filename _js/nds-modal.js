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
  let initAC = null;

  // Tab focus trap — delegates to the shared NDS.trapFocus factory.
  // The arrow form re-evaluates `activeModal` on every Tab press, so this
  // single handler instance works across open/close cycles.
  const trapFocus = NDS.trapFocus(() => activeModal);

  /**
   * Open modal by ID or element
   */
  function open(target) {
    // Get modal element
    const modal = typeof target === 'string'
      ? document.getElementById(target)
      : target;

    if (!modal || !modal.classList.contains('nds-modal')) return;

    // Close existing modal if any
    if (activeModal) {
      close();
    }

    // Show backdrop
    NDS.Backdrop.show({
      zIndex: 1100,
      onClick: () => close()
    });

    // Show modal
    modal.removeAttribute('hidden');
    modal.setAttribute('aria-hidden', 'false');

    // Force reflow to ensure initial state is painted before transition
    modal.offsetHeight;

    // Use requestAnimationFrame to trigger animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        NDS.State.set(modal, 'open');
        modal.dispatchEvent(new CustomEvent('nds-modal-opened', { bubbles: true }));
      });
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
    modal.setAttribute('aria-hidden', 'true');

    // Tear down backdrop + modal only after the close animation finishes.
    // Backdrop.hide() runs a synchronous scrollLock.unlock() (full-page reflow);
    // keeping it out of the click frame is what holds the close INP down.
    setTimeout(() => {
      NDS.Backdrop.hide();
      modal.setAttribute('hidden', '');
      NDS.State.clear(modal);
      modal.dispatchEvent(new CustomEvent('nds-modal-closed', { bubbles: true }));
    }, NDS.transitionSpeed() + 100);

    activeModal = null;
  }

  /**
   * Initialize event listeners
   */
  function init() {
    if (document.body.hasAttribute('data-nds-modal-initialized')) return;

    // Soft dependency — modal init no-ops (with a loud console.error) if NDS.Backdrop
    // isn't bundled. Modal needs Backdrop's overlay layer to function; failing loudly
    // surfaces the bundle misconfiguration without crashing the whole page.
    if (!NDS.Backdrop) {
      console.error('NDSModal requires NDSBackdrop API. Please include nds-backdrop.js first.');
      return;
    }

    // Scope all document-level listeners to an AbortController so any future re-init
    // (e.g., NDS.Init.initializeComponent('modal') after removing the init marker)
    // detaches the prior batch atomically instead of stacking listeners.
    if (initAC) initAC.abort();
    initAC = new AbortController();
    const { signal } = initAC;

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
      if ((e.key === 'Escape' || e.key === 'Esc') && activeModal) {
        e.preventDefault();
        close();
      }
    }, { signal });

    document.body.setAttribute('data-nds-modal-initialized', 'true');
  }

  /**
   * Public API
   */
  NDS.Modal = {
    init,
    open,
    close,
    isOpen: () => activeModal !== null
  };

})();
