/**
 * NDS Backdrop API
 * Provides a single shared backdrop/overlay for all components
 * Simple singleton pattern - one backdrop element in DOM
 */

(function () {
  'use strict';

  // Single shared backdrop element
  let backdropElement = null;
  let currentConfig = null;
  let scrollY = 0;
  let isActive = false;

  /**
   * Initialize backdrop element (created once)
   */
  function initBackdrop() {
    if (backdropElement) return;

    backdropElement = document.createElement('div');
    backdropElement.className = 'nds-backdrop';
    backdropElement.setAttribute('data-nds-backdrop', 'true');
    document.body.appendChild(backdropElement);
  }

  /**
   * Apply inline styles for z-index only
   */
  function applyStyles(config) {
    if (!backdropElement) return;

    // Apply z-index as inline style
    backdropElement.style.zIndex = config.zIndex;

    // Add active data-state if currently active
    if (isActive) {
      backdropElement.setAttribute('data-state', 'active');
    }
  }

  /**
   * Handle backdrop click
   */
  function handleClick(e) {
    if (e.target === backdropElement && currentConfig?.onClick) {
      currentConfig.onClick();
    }
  }

  /**
   * Handle ESC key
   */
  function handleEscape(e) {
    if ((e.key === 'Escape' || e.key === 'Esc') && currentConfig?.onClick) {
      currentConfig.onClick();
    }
  }

  /**
   * Show backdrop with config
   */
  function show(config = {}) {
    initBackdrop();

    // If already active, close it first
    if (isActive) {
      hide();
    }

    // Set config defaults
    currentConfig = {
      zIndex: config.zIndex || 1100,
      onClick: config.onClick || null,
      onShow: config.onShow || null,
      onHide: config.onHide || null,
      preventScroll: config.preventScroll !== false,
      escapeClose: config.escapeClose !== false,
      clickToClose: config.clickToClose !== false
    };

    // Prevent body scroll
    if (currentConfig.preventScroll) {
      scrollY = window.pageYOffset;
      document.body.style.top = `-${scrollY}px`;
      document.body.setAttribute('data-state', 'backdrop');
    }

    // Apply inline styles
    applyStyles(currentConfig);

    // Show backdrop with animation
    backdropElement.style.display = 'block';
    backdropElement.offsetHeight; // Force reflow

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        backdropElement.setAttribute('data-state', 'active');
        isActive = true;

        // Attach event listeners
        if (currentConfig.clickToClose) {
          backdropElement.addEventListener('click', handleClick);
        }
        if (currentConfig.escapeClose) {
          document.addEventListener('keydown', handleEscape);
        }

        // Call onShow callback
        if (currentConfig.onShow) {
          currentConfig.onShow();
        }
      });
    });
  }

  /**
   * Hide backdrop
   */
  function hide() {
    if (!isActive || !backdropElement) return;

    // Remove event listeners
    backdropElement.removeEventListener('click', handleClick);
    document.removeEventListener('keydown', handleEscape);

    // Remove active data-state to trigger fade out
    backdropElement.removeAttribute('data-state');

    // Restore scroll
    if (currentConfig?.preventScroll) {
      document.body.removeAttribute('data-state');
      document.body.style.top = '';
      window.scrollTo(0, scrollY);
    }

    isActive = false;

    // Hide after animation completes
    setTimeout(() => {
      // Reset display style after animation
      backdropElement.style.display = '';

      // Call onHide callback
      if (currentConfig?.onHide) {
        currentConfig.onHide();
      }

      currentConfig = null;
    }, 300); // Match CSS transition
  }

  /**
   * Toggle backdrop
   */
  function toggle(config) {
    if (isActive) {
      hide();
    } else {
      show(config);
    }
  }

  /**
   * Check if backdrop is active
   */
  function getIsActive() {
    return isActive;
  }

  /**
   * Get backdrop element reference
   */
  function getElement() {
    initBackdrop();
    return backdropElement;
  }

  // Public API
  window.NDSBackdrop = {
    show,
    hide,
    toggle,
    isActive: getIsActive,
    getElement
  };

})();
