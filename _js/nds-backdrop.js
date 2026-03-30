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
  let activeCount = 0; // Track how many components are using the backdrop
  const transitionSpeed = () => (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nds-transition-speed')) || 0.2) * 1000;

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
    backdropElement.style.zIndex = config.zIndex;
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

    // Set config defaults
    const newConfig = {
      zIndex: config.zIndex || 1100,
      onClick: config.onClick || null,
      onShow: config.onShow || null,
      onHide: config.onHide || null,
      preventScroll: config.preventScroll !== false,
      escapeClose: config.escapeClose !== false,
      clickToClose: config.clickToClose !== false
    };

    // If already active, just update the configuration
    if (isActive) {
      // Increment counter for new component using backdrop
      activeCount++;

      // Remove old event listeners
      backdropElement.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleEscape);

      // Update config
      currentConfig = newConfig;

      // Re-apply styles with new config
      applyStyles(currentConfig);

      // Re-attach event listeners with new config
      if (currentConfig.clickToClose) {
        backdropElement.addEventListener('click', handleClick);
      }
      if (currentConfig.escapeClose) {
        document.addEventListener('keydown', handleEscape);
      }

      return;
    }

    // First time showing - set up everything
    currentConfig = newConfig;
    activeCount = 1; // Initialize counter

    // Apply inline styles
    applyStyles(currentConfig);

    // Mark active synchronously so hide() can always clean up body state
    isActive = true;

    // Show backdrop — delay active state and scroll lock after component transition
    backdropElement.style.display = 'block';
    const speed = transitionSpeed();
    setTimeout(() => {
      if (!isActive) return;
      backdropElement.setAttribute('data-state', 'active');
      if (currentConfig.preventScroll) {
        scrollY = window.pageYOffset;
        document.body.style.top = `-${scrollY}px`;
      }
      document.body.setAttribute('data-state', 'backdrop');
    }, speed);

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
  }

  /**
   * Hide backdrop
   */
  function hide() {
    if (!isActive || !backdropElement) return;

    // Decrement counter
    activeCount--;

    // If other components are still using the backdrop, don't hide it
    if (activeCount > 0) {
      return;
    }

    // Remove event listeners
    backdropElement.removeEventListener('click', handleClick);
    document.removeEventListener('keydown', handleEscape);

    isActive = false;

    // Remove active state — CSS handles opacity/blur removal
    backdropElement.removeAttribute('data-state');

    // Restore body state and scroll immediately
    document.body.removeAttribute('data-state');
    if (currentConfig?.preventScroll) {
      document.body.style.top = '';
      window.scrollTo(0, scrollY);
    }

    // Clean up display after component transition
    const speed = transitionSpeed();
    setTimeout(() => {
      if (isActive) return;
      backdropElement.style.display = '';
      if (currentConfig?.onHide) currentConfig.onHide();
      currentConfig = null;
      activeCount = 0;
    }, speed);
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
  NDS.Backdrop = {
    show,
    hide,
    toggle,
    isActive: getIsActive,
    getElement
  };

})();
