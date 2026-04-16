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

  /**
   * Simple focus trap handler
   */
  function trapFocus(e) {
    if (e.key !== 'Tab' || !activeModal) return;

    const focusable = activeModal.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    // Shift + Tab: if on first, go to last
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
    // Tab: if on last, go to first
    else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

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

    // Hide backdrop
    NDS.Backdrop.hide();

    // Hide modal after animation
    setTimeout(() => {
      modal.setAttribute('hidden', '');
      NDS.State.clear(modal);
      modal.dispatchEvent(new CustomEvent('nds-modal-closed', { bubbles: true }));
    }, 300);

    activeModal = null;
  }

  /**
   * Initialize event listeners
   */
  function init() {
    if (document.body.hasAttribute('data-nds-modal-initialized')) return;

    // Ensure NDSBackdrop is available
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
