/**
 * NDS Modal Component
 * Simple modal dialog with backdrop overlay
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
  let scrollY = 0;

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
    const backdrop = typeof target === 'string'
      ? document.getElementById(target)
      : target.closest?.('.nds-modal-backdrop') || target;

    if (!backdrop) return;

    // Store scroll position and lock body
    scrollY = window.pageYOffset;
    document.body.style.top = `-${scrollY}px`;
    document.body.classList.add('nds-modal-active');

    // Show backdrop
    backdrop.style.display = 'flex';
    backdrop.offsetHeight; // Force reflow

    // Trigger animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        backdrop.classList.add('nds-modal-open');
        backdrop.setAttribute('aria-modal', 'true');

        const modal = backdrop.querySelector('.nds-modal');
        if (modal) {
          modal.setAttribute('aria-hidden', 'false');
          modal.dispatchEvent(new CustomEvent('nds-modal-opened', { bubbles: true }));
        }

        // Enable focus trap
        document.addEventListener('keydown', trapFocus);
      });
    });

    activeModal = backdrop;
  }

  /**
   * Close active modal
   */
  function close() {
    if (!activeModal) return;

    const modal = activeModal.querySelector('.nds-modal');

    // Disable focus trap
    document.removeEventListener('keydown', trapFocus);

    // Remove animation class
    activeModal.classList.remove('nds-modal-open');
    document.body.classList.remove('nds-modal-active');
    document.body.style.top = '';

    // Restore scroll
    window.scrollTo(0, scrollY);

    // Update ARIA
    activeModal.setAttribute('aria-modal', 'false');
    if (modal) {
      modal.setAttribute('aria-hidden', 'true');
      modal.dispatchEvent(new CustomEvent('nds-modal-closed', { bubbles: true }));
    }

    // Reset display after animation
    const backdrop = activeModal;
    setTimeout(() => {
      if (!backdrop.classList.contains('nds-modal-open')) {
        backdrop.style.display = '';
      }
    }, 300);

    activeModal = null;
  }

  /**
   * Initialize event listeners
   */
  function init() {
    if (document.body.hasAttribute('data-nds-modal-initialized')) return;

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

    // Backdrop clicks
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('nds-modal-backdrop')) {
        close();
      }
    });

    // ESC key
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
