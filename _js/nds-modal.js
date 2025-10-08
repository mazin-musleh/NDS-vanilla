/**
 * NDS Modal Component
 * Handles modal open/close, backdrop clicks, ESC key, focus trap, and accessibility
 */

(function () {
  'use strict';

  // Store currently active modal
  let activeModal = null;
  let previousFocusedElement = null;
  let focusableElements = [];
  let firstFocusable = null;
  let lastFocusable = null;

  /**
   * Initialize all modals on page load
   */
  function initModals() {
    // Find all modal triggers (buttons with data-modal-target)
    const triggers = document.querySelectorAll('[data-modal-target]');

    triggers.forEach(trigger => {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-modal-target');
        const modal = document.getElementById(targetId);
        if (modal) {
          openModal(modal);
        }
      });
    });

    // Initialize close buttons
    const closeButtons = document.querySelectorAll('.nds-modal-close, [data-modal-close]');
    closeButtons.forEach(button => {
      button.addEventListener('click', function (e) {
        e.stopPropagation();
        const modal = this.closest('.nds-modal-backdrop');
        if (modal) {
          closeModal();
        }
      });
    });

    // Backdrop click to close
    const backdrops = document.querySelectorAll('.nds-modal-backdrop');
    backdrops.forEach(backdrop => {
      backdrop.addEventListener('click', function (e) {
        // Only close if clicking the backdrop itself, not the modal content
        if (e.target === backdrop) {
          closeModal();
        }
      });
    });

    // ESC key to close
    document.addEventListener('keydown', handleEscKey);
  }

  /**
   * Open a modal
   * @param {HTMLElement} modal - The modal element to open
   */
  function openModal(modal) {
    if (!modal) return;

    // Store currently focused element (avoid storing body or null)
    const activeEl = document.activeElement;
    if (activeEl && activeEl !== document.body && activeEl.tagName !== 'BODY') {
      previousFocusedElement = activeEl;
    } else {
      previousFocusedElement = null;
    }

    // Find the backdrop (modal should be inside backdrop)
    let backdrop = modal.closest('.nds-modal-backdrop');
    if (!backdrop) {
      backdrop = modal;
    }

    // Set active modal
    activeModal = backdrop;

    // Open modal
    backdrop.classList.add('nds-modal-open');
    document.body.classList.add('nds-modal-active');

    // Set ARIA attributes
    modal.setAttribute('aria-hidden', 'false');
    backdrop.setAttribute('aria-modal', 'true');

    // Setup focus trap
    setupFocusTrap(modal);

    // Focus the modal or first focusable element
    setTimeout(() => {
      if (firstFocusable) {
        firstFocusable.focus();
      } else if (modal && modal.tabIndex === -1) {
        modal.tabIndex = -1;
        modal.focus();
      }
    }, 100);

    // Trigger custom event
    modal.dispatchEvent(new CustomEvent('nds-modal-opened', {
      bubbles: true,
      detail: { modal }
    }));
  }

  /**
   * Close the active modal
   */
  function closeModal() {
    if (!activeModal) return;

    const modal = activeModal.querySelector('.nds-modal');

    // CRITICAL: Move focus OUT of modal BEFORE setting aria-hidden
    // This prevents "aria-hidden on focused element" warning

    // Try to restore focus to original element
    let focusRestored = false;
    if (previousFocusedElement) {
      try {
        if (previousFocusedElement &&
            previousFocusedElement.focus &&
            typeof previousFocusedElement.focus === 'function' &&
            document.body.contains(previousFocusedElement)) {
          previousFocusedElement.focus();
          focusRestored = true;
        }
      } catch (e) {
        // Silently fail
      }
    }

    // If we couldn't restore focus, ensure focus leaves the modal
    if (!focusRestored) {
      // Move focus to body FIRST to remove it from modal
      if (document.body) {
        document.body.setAttribute('tabindex', '-1');
        document.body.focus();
        // Remove tabindex after focus
        setTimeout(() => {
          document.body.removeAttribute('tabindex');
        }, 100);
      }
    }

    // Close modal
    activeModal.classList.remove('nds-modal-open');
    document.body.classList.remove('nds-modal-active');

    // Set ARIA attributes AFTER focus has definitely moved
    // Double requestAnimationFrame ensures all focus events have processed
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (modal) {
          modal.setAttribute('aria-hidden', 'true');
        }
        const currentActiveModal = document.querySelector('.nds-modal-backdrop.nds-modal-open');
        if (!currentActiveModal && activeModal) {
          activeModal.setAttribute('aria-modal', 'false');
        }
      });
    });

    // Trigger custom event
    if (modal) {
      modal.dispatchEvent(new CustomEvent('nds-modal-closed', {
        bubbles: true,
        detail: { modal }
      }));
    }

    // Clear active modal
    activeModal = null;
    previousFocusedElement = null;
    focusableElements = [];
    firstFocusable = null;
    lastFocusable = null;
  }

  /**
   * Handle ESC key press to close modal
   * @param {KeyboardEvent} e - The keyboard event
   */
  function handleEscKey(e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      if (activeModal) {
        e.preventDefault();
        closeModal();
      }
    }
  }

  /**
   * Setup focus trap within modal
   * @param {HTMLElement} modal - The modal element
   */
  function setupFocusTrap(modal) {
    if (!modal) return;

    // Get all focusable elements
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(', ');

    focusableElements = Array.from(modal.querySelectorAll(focusableSelectors));

    if (focusableElements.length > 0) {
      firstFocusable = focusableElements[0];
      lastFocusable = focusableElements[focusableElements.length - 1];

      // Trap focus within modal
      modal.addEventListener('keydown', trapFocus);
    }
  }

  /**
   * Trap focus within modal on Tab key
   * @param {KeyboardEvent} e - The keyboard event
   */
  function trapFocus(e) {
    if (e.key !== 'Tab') return;

    // Shift + Tab
    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    }
    // Tab
    else {
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  }

  /**
   * Public API for programmatic modal control
   */
  window.NDSModal = {
    open: function (modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        openModal(modal);
      }
    },
    close: closeModal,
    isOpen: function () {
      return activeModal !== null;
    }
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initModals);
  } else {
    initModals();
  }

})();
