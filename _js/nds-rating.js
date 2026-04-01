/**
 * NDS Rating Component
 * Interactive star rating component with hover preview and keyboard navigation
 */
(() => {
  'use strict';

  // State helpers (same pattern as dropmenu)
  const parseStates = (el) =>
    new Set((el.getAttribute('data-state') || '').split(/\s+/).filter(Boolean));

  const addState = (el, ...states) => {
    const cur = parseStates(el);
    states.forEach(s => cur.add(s));
    el.setAttribute('data-state', [...cur].join(' '));
  };

  const removeState = (el, ...states) => {
    const cur = parseStates(el);
    states.forEach(s => cur.delete(s));
    cur.size ? el.setAttribute('data-state', [...cur].join(' '))
             : el.removeAttribute('data-state');
  };

  const hasState = (el, state) => parseStates(el).has(state);

  class NDSRating {
    constructor(element) {
      this.rating = element;
      this.stars = element.querySelectorAll('.nds-rating-star');
      this.currentRating = parseFloat(element.dataset.rating) || 0;

      // Set data-value on stars for delegation lookups
      for (let i = 0; i < this.stars.length; i++) {
        this.stars[i].dataset.value = i + 1;
        this.stars[i].setAttribute('aria-label', `${i + 1} star${i > 0 ? 's' : ''}`);
      }

      // Auto-detect interactive from button elements
      if (this.stars[0]?.tagName === 'BUTTON' && !hasState(this.rating, 'disabled')) {
        addState(this.rating, 'interactive');
      }

      if (hasState(this.rating, 'interactive') && !hasState(this.rating, 'disabled')) {
        this.init();
      } else {
        this.updateVisualState();
      }
    }

    init() {
      if (this._initialized) return;
      this._initialized = true;

      // Delegated listeners on the container
      this.rating.addEventListener('click', (e) => {
        const star = e.target.closest('.nds-rating-star');
        if (star && !hasState(this.rating, 'disabled')) this.setRating(+star.dataset.value);
      });

      this.rating.addEventListener('mouseenter', (e) => {
        const star = e.target.closest('.nds-rating-star');
        if (star && !hasState(this.rating, 'disabled')) this.showPreview(+star.dataset.value);
      }, true);

      this.rating.addEventListener('mouseleave', (e) => {
        const star = e.target.closest('.nds-rating-star');
        if (star && !hasState(this.rating, 'disabled')) this.hidePreview();
      }, true);

      this.rating.addEventListener('keydown', (e) => {
        const star = e.target.closest('.nds-rating-star');
        if (star && !hasState(this.rating, 'disabled')) this.handleKeyboard(e, +star.dataset.value);
      });

      this.updateVisualState();
    }

    setRating(value) {
      if (value === this.currentRating) return;
      this.currentRating = value;
      this.rating.dataset.rating = value;
      this.updateVisualState();

      this.rating.dispatchEvent(new CustomEvent('ratingChange', {
        detail: { rating: value, element: this.rating },
        bubbles: true
      }));
    }

    showPreview(value) {
      for (let i = 0; i < this.stars.length; i++) {
        if (i < value) addState(this.stars[i], 'preview');
        else removeState(this.stars[i], 'preview');
      }
    }

    hidePreview() {
      for (let i = 0; i < this.stars.length; i++) {
        removeState(this.stars[i], 'preview');
      }
    }

    updateVisualState() {
      const whole = Math.floor(this.currentRating);
      const hasHalf = (this.currentRating % 1) >= 0.3;

      for (let i = 0; i < this.stars.length; i++) {
        const states = [];
        if (i < whole) states.push('selected');
        if (hasHalf && i === whole) states.push('half');

        // Preserve preview state if present
        if (hasState(this.stars[i], 'preview')) states.push('preview');

        if (states.length) this.stars[i].setAttribute('data-state', states.join(' '));
        else this.stars[i].removeAttribute('data-state');
      }
    }

    handleKeyboard(e, value) {
      const idx = value - 1;
      const isRTL = NDS.isRTL;
      const last = this.stars.length - 1;

      switch(e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          this.setRating(value);
          break;

        case 'ArrowRight':
          e.preventDefault();
          if (isRTL) { if (idx > 0) this.stars[idx - 1].focus(); }
          else { if (idx < last) this.stars[idx + 1].focus(); }
          break;

        case 'ArrowLeft':
          e.preventDefault();
          if (isRTL) { if (idx < last) this.stars[idx + 1].focus(); }
          else { if (idx > 0) this.stars[idx - 1].focus(); }
          break;

        case 'ArrowUp':
          e.preventDefault();
          if (idx < last) this.stars[idx + 1].focus();
          break;

        case 'ArrowDown':
          e.preventDefault();
          if (idx > 0) this.stars[idx - 1].focus();
          break;

        case 'Home':
          e.preventDefault();
          this.stars[0].focus();
          break;

        case 'End':
          e.preventDefault();
          this.stars[last].focus();
          break;

        case 'Escape':
          e.preventDefault();
          e.target.blur();
          break;
      }
    }

    getRating() {
      return this.currentRating;
    }

    setValue(value) {
      if (value >= 0 && value <= this.stars.length) {
        this.setRating(value);
      }
    }

    setDisabled(disabled) {
      for (let i = 0; i < this.stars.length; i++) {
        this.stars[i].disabled = disabled;
        if (disabled) this.stars[i].setAttribute('aria-disabled', 'true');
        else this.stars[i].removeAttribute('aria-disabled');
      }

      if (disabled) {
        addState(this.rating, 'disabled');
        this.hidePreview();
      } else {
        removeState(this.rating, 'disabled');
        this.init();
      }
    }

    enable() {
      this.setDisabled(false);
    }

    isDisabled() {
      return hasState(this.rating, 'disabled') ||
             (this.stars[0] && this.stars[0].disabled);
    }
  }

  function initializeRatings() {
    const ratings = document.querySelectorAll('.nds-rating');
    for (let i = 0; i < ratings.length; i++) {
      if (!ratings[i].ndsRating) ratings[i].ndsRating = new NDSRating(ratings[i]);
    }
  }

  function enableRating(element) {
    if (!element.ndsRating) element.ndsRating = new NDSRating(element);
    element.ndsRating.enable();
  }

  NDS.Rating = {
    initializeRatings,
    init: initializeRatings,
    reinit: initializeRatings,
    enableRating,
  };

  NDS.onDOMAdd('.nds-rating', (nodes) => {
    for (let i = 0; i < nodes.length; i++) {
      if (!nodes[i].ndsRating) nodes[i].ndsRating = new NDSRating(nodes[i]);
    }
  });
})();
