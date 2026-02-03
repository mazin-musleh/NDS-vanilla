/**
 * NDS Modal Component
 * Simple modal dialog with backdrop overlay using unified NDSBackdrop API
 *
 * Usage:
 * 1. Button trigger: <button data-modal-target="myModal">Open</button>
 * 2. Programmatic: window.NDSModal.open('myModal')
 * 3. Close: window.NDSModal.close()
 */

(function () {
  'use strict';

  // State
  let activeModal = null;

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
    window.NDSBackdrop.show({
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
        modal.setAttribute('data-state', 'open');
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
    modal.setAttribute('data-state', 'closing');
    modal.setAttribute('aria-hidden', 'true');

    // Hide backdrop
    window.NDSBackdrop.hide();

    // Hide modal after animation
    setTimeout(() => {
      modal.setAttribute('hidden', '');
      modal.removeAttribute('data-state');
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
    if (!window.NDSBackdrop) {
      console.error('NDSModal requires NDSBackdrop API. Please include nds-backdrop.js first.');
      return;
    }

    // Trigger buttons
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-modal-target]');
      if (trigger) {
        e.preventDefault();
        const targetId = trigger.getAttribute('data-modal-target');
        open(targetId);
      }
    });

    // Close buttons
    document.addEventListener('click', (e) => {
      if (e.target.closest('.nds-modal-close, [data-modal-close]')) {
        e.stopPropagation();
        close();
      }
    });

    // ESC key handling is now in backdrop, but keep this for additional modal-specific behavior
    document.addEventListener('keydown', (e) => {
      if ((e.key === 'Escape' || e.key === 'Esc') && activeModal) {
        e.preventDefault();
        close();
      }
    });

    document.body.setAttribute('data-nds-modal-initialized', 'true');
  }

  /**
   * Public API
   */
  window.NDSModal = {
    init,
    open,
    close,
    isOpen: () => activeModal !== null
  };

})();
