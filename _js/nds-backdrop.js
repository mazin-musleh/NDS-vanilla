/* NDS.Backdrop — public surface
 * Rides: (none — base component)
 * Methods:
 *   NDS.Backdrop.show(config)   raise the shared overlay and become its owner. config
 *                               {zIndex, onClick, onShow, onHide, preventScroll,
 *                               escapeClose, clickToClose, replace}
 *   NDS.Backdrop.hide()         release your turn — the previous owner takes the overlay
 *                               back, or it tears down when you were the last
 *   NDS.Backdrop.isActive()     is the overlay up?
 * Events:
 *   (none — pass onShow / onHide / onClick in the config instead)
 * Hooks:
 *   (none — there is nothing to author; the element is built on the first show())
 * Gotchas:
 *   - ONE overlay serves the whole page and show()/hide() form a STACK. Every show()
 *     needs its own hide(), or the layer underneath never gets its config back.
 *   - There is no init(): the component is not loader-registered. It builds its DOM on
 *     the first show().
 *   - config.replace swaps the CURRENT owner in place instead of stacking — for handing
 *     the overlay between sibling flyouts with no flicker.
 *   - preventScroll, escapeClose and clickToClose all default to true.
 *   - onClick is what ESC and an outside click call: no handler means no dismiss.
 */
/**
 * NDS Backdrop API
 * Provides a single shared backdrop/overlay for all components
 * Simple singleton pattern - one backdrop element in DOM
 */

(function () {
  'use strict';

  // Single shared backdrop element
  let backdropElement = null;
  // Ownership stack — nested consumers (panel → modal) push their config; when
  // the top consumer hides, the prior owner's config (zIndex, onClick,
  // listeners) is restored so the backdrop returns to serving the layer
  // beneath. A counter alone would keep the backdrop up but leave it stuck on
  // the last-in config, orphaning the underlying owner's dismiss handler.
  let stack = [];
  let isActive = false;

  const top = () => stack[stack.length - 1];

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
   * Handle backdrop click
   */
  function handleClick(e) {
    const cfg = top();
    if (e.target === backdropElement && cfg?.onClick) {
      cfg.onClick();
    }
  }

  /**
   * Handle ESC key
   */
  function handleEscape(e) {
    const cfg = top();
    if ((e.key === 'Escape' || e.key === 'Esc') && cfg?.onClick) {
      cfg.onClick();
    }
  }

  // Rebind listeners and zIndex to the current top-of-stack config. Called on
  // every push and after every non-terminal pop so the backdrop always speaks
  // for its actual current owner.
  function applyTop() {
    const cfg = top();
    if (!cfg) return;
    backdropElement.removeEventListener('click', handleClick);
    document.removeEventListener('keydown', handleEscape);
    backdropElement.style.zIndex = cfg.zIndex;
    if (cfg.clickToClose) {
      backdropElement.addEventListener('click', handleClick);
    }
    if (cfg.escapeClose) {
      document.addEventListener('keydown', handleEscape);
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

    const wasActive = isActive;
    // replace: swap the current top-of-stack owner in place (atomic hand-off),
    // instead of stacking on top. Used by mainnav to switch owners between
    // sibling flyouts without a tear-down/re-init flicker.
    if (config.replace && wasActive) stack.pop();
    stack.push(newConfig);
    applyTop();

    if (wasActive) return;

    // First time showing - set up everything
    // Mark active synchronously so hide() can always clean up body state
    isActive = true;

    // Show backdrop — delay active state and scroll lock after component transition
    backdropElement.style.display = 'block';
    const speed = NDS.transitionSpeed();
    setTimeout(() => {
      if (!isActive) return;
      NDS.State.set(backdropElement, 'active');
      if (newConfig.preventScroll) {
        NDS.scrollLock.lock();
      }
      NDS.State.set(document.body, 'backdrop');
    }, speed);

    // Call onShow callback
    if (newConfig.onShow) {
      newConfig.onShow();
    }
  }

  /**
   * Hide backdrop
   */
  function hide() {
    if (!isActive || !backdropElement) return;

    const popped = stack.pop();

    // If a prior owner is still on the stack, hand control back to it —
    // don't tear down.
    if (stack.length > 0) {
      applyTop();
      return;
    }

    // Last owner leaving — full teardown
    backdropElement.removeEventListener('click', handleClick);
    document.removeEventListener('keydown', handleEscape);

    isActive = false;

    // Remove active state — CSS handles opacity/blur removal
    NDS.State.clear(backdropElement);

    // Restore body state and scroll immediately
    NDS.State.clear(document.body);
    if (popped?.preventScroll) {
      NDS.scrollLock.unlock();
    }

    // Clean up display after component transition
    const speed = NDS.transitionSpeed();
    setTimeout(() => {
      if (isActive) return;
      backdropElement.style.display = '';
      if (popped?.onHide) popped.onHide();
    }, speed);
  }

  /**
   * Check if backdrop is active
   */
  function getIsActive() {
    return isActive;
  }

  // Public API. Backdrop is not loader-registered — it is consumed on demand
  // by modal / mainnav / sidemenu / ipv via show()/hide(), and lazily builds
  // its DOM on the first show(). No init() entry point.
  NDS.Backdrop = {
    show,
    hide,
    isActive: getIsActive
  };

})();
