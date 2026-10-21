/* NDS.Rating — public surface
 * Rides: (none — base component)
 * Requires:
 *   .nds-rating needs .nds-rating-star — there is nothing to show
 * Methods:
 *   NDS.Rating.init() / .reinit()   scan + initialize .nds-rating
 *   NDS.Rating.create(el)           instance one rating (returns the live one if there is
 *                                   already one)
 *   NDS.Rating.validate(el, opts)   the rating group's check → {valid, message, rating}; opts {showMessage}
 *   NDS.Rating.destroy(el)          undo create()
 *   NDS.Rating.enable(el)           build it if needed, then take it out of disabled
 *   instance.setValue(v)            set the rating (fires the event)
 *   instance.getValue()             the current value
 *   instance.enable() / .disable() / .isDisabled()
 *   instance.destroy()
 * Events (bubble from the .nds-rating):
 *   nds:rating:change   detail {rating, element} — on every pick that changes the value
 * Hooks:
 *   data-rating   the current value on the root; the component writes the new value back
 *                 here on every pick
 *   data-rating-value   a hidden input in the root or its .nds-form-group: the component
 *                 writes the score into it (0 for none), so it posts with the form; a form
 *                 reset restores the first score. User Feedback shares the hook
 *   written by the component: data-value on each .nds-rating-star (its 1-based position)
 * Gotchas:
 *   - Interactive mode is auto-detected: <button> stars on a root that is not disabled
 *     gain data-state="interactive". Non-button stars stay display-only.
 *   - A fractional data-rating of .3 or more paints a half star.
 *   - Ratings added to or removed from the page are wired and torn down automatically.
 *   - The instance lives on the element as el.ndsRating.
 */
/**
 * NDS Rating Component
 * Interactive star rating component with hover preview and keyboard navigation
 */
(() => {
  'use strict';

  // English defaults; the assets/i18n/{lang}.json pack overrides them.
  const strings = NDS.i18n.strings('rating', {
    stars: { one: '{n} star', other: '{n} stars' },
    score: '{n} of {total}',
    rating_required: 'Please choose a rating',
  });

  // State helpers — delegated to NDS.state (nds-core.js)
  const { add: addState, remove: removeState, has: hasState } = NDS.state;

  class NdsRating {
    constructor(element) {
      this.rating = element;
      this._stars = element.querySelectorAll('.nds-rating-star');
      this._currentRating = parseFloat(element.dataset.rating) || 0;
      this._startRating = this._currentRating;
      // ponytail: one input per group; two ratings in one .nds-form-group share the first.
      this._valueInput = (element.closest('.nds-form-group') || element).querySelector('input[data-rating-value]');
      this._syncValue();

      this._isButtons = this._stars[0]?.tagName === 'BUTTON';
      // Set data-value on stars for delegation lookups; only a button star takes a name.
      for (let i = 0; i < this._stars.length; i++) {
        this._stars[i].dataset.value = i + 1;
        if (this._isButtons) strings.set(this._stars[i], 'aria-label', 'stars', { n: i + 1 });
      }
      this._labelScore();

      // Auto-detect interactive from button elements
      if (this._isButtons && !hasState(this.rating, 'disabled')) {
        addState(this.rating, 'interactive');
      }

      if (hasState(this.rating, 'interactive') && !hasState(this.rating, 'disabled')) {
        this.init();
      } else {
        this._syncVisualState();
      }
    }

    init() {
      if (this._initialized) return;
      this._initialized = true;
      this.abortController = new AbortController();
      const signal = this.abortController.signal;

      // Delegated listeners on the container
      this.rating.addEventListener('click', (e) => {
        const star = e.target.closest('.nds-rating-star');
        if (star && !hasState(this.rating, 'disabled')) this._setRating(+star.dataset.value);
      }, { signal });

      this.rating.addEventListener('mouseenter', (e) => {
        const star = e.target.closest('.nds-rating-star');
        if (star && !hasState(this.rating, 'disabled')) this._showPreview(+star.dataset.value);
      }, { capture: true, signal });

      this.rating.addEventListener('mouseleave', (e) => {
        const star = e.target.closest('.nds-rating-star');
        if (star && !hasState(this.rating, 'disabled')) this._hidePreview();
      }, { capture: true, signal });

      this.rating.addEventListener('keydown', (e) => {
        const star = e.target.closest('.nds-rating-star');
        if (star && !hasState(this.rating, 'disabled')) this._handleKeyboard(e, +star.dataset.value);
      }, { signal });

      // The browser restores the form after the reset event; a hidden input keeps what JS wrote.
      const form = this.rating.closest('form');
      if (form) form.addEventListener('reset', (e) => {
        setTimeout(() => { if (!e.defaultPrevented) this._setRating(this._startRating); });
      }, { signal });

      this._syncVisualState();
    }

    // Through NDS.setValue, so a framework binding on the input hears it.
    _syncValue() {
      const value = String(this._currentRating);
      if (this._valueInput && this._valueInput.value !== value) NDS.setValue(this._valueInput, value);
    }

    destroy() {
      if (this.abortController) { this.abortController.abort(); this.abortController = null; }
      this._initialized = false;
      if (this.rating.ndsRating === this) delete this.rating.ndsRating;   // create() then builds a fresh one
    }

    _setRating(value) {
      if (value === this._currentRating) return;
      this._currentRating = value;
      this.rating.dataset.rating = value;
      this._syncValue();
      this._labelScore();
      this._syncVisualState();

      this.rating.dispatchEvent(new CustomEvent('nds:rating:change', {
        detail: { rating: value, element: this.rating },
        bubbles: true
      }));
    }

    // A display rating reads as one image with its score: "3.5 of 5".
    _labelScore() {
      if (this._isButtons) return;
      if (!this.rating.hasAttribute('role')) this.rating.setAttribute('role', 'img');
      strings.set(this.rating, 'aria-label', 'score', { n: this._currentRating, total: this._stars.length });
    }

    _showPreview(value) {
      for (let i = 0; i < this._stars.length; i++) {
        if (i < value) addState(this._stars[i], 'preview');
        else removeState(this._stars[i], 'preview');
      }
    }

    _hidePreview() {
      for (let i = 0; i < this._stars.length; i++) {
        removeState(this._stars[i], 'preview');
      }
    }

    _syncVisualState() {
      const whole = Math.floor(this._currentRating);
      const hasHalf = (this._currentRating % 1) >= 0.3;

      for (let i = 0; i < this._stars.length; i++) {
        const states = [];
        if (i < whole) states.push('selected');
        if (hasHalf && i === whole) states.push('half');

        // Preserve preview state if present
        if (hasState(this._stars[i], 'preview')) states.push('preview');

        NDS.state.set(this._stars[i], ...states);
      }
    }

    _handleKeyboard(e, value) {
      const index = value - 1;
      const isRtl = NDS.isRTL;
      const last = this._stars.length - 1;

      switch(e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          this._setRating(value);
          break;

        case 'ArrowRight':
          e.preventDefault();
          if (isRtl) { if (index > 0) this._stars[index - 1].focus(); }
          else { if (index < last) this._stars[index + 1].focus(); }
          break;

        case 'ArrowLeft':
          e.preventDefault();
          if (isRtl) { if (index < last) this._stars[index + 1].focus(); }
          else { if (index > 0) this._stars[index - 1].focus(); }
          break;

        case 'ArrowUp':
          e.preventDefault();
          if (index < last) this._stars[index + 1].focus();
          break;

        case 'ArrowDown':
          e.preventDefault();
          if (index > 0) this._stars[index - 1].focus();
          break;

        case 'Home':
          e.preventDefault();
          this._stars[0].focus();
          break;

        case 'End':
          e.preventDefault();
          this._stars[last].focus();
          break;

        case 'Escape':
          e.preventDefault();
          e.target.blur();
          break;
      }
    }

    getValue() {
      return this._currentRating;
    }

    setValue(value) {
      if (value >= 0 && value <= this._stars.length) {
        this._setRating(value);
      }
    }

    _setDisabled(disabled) {
      for (let i = 0; i < this._stars.length; i++) {
        this._stars[i].disabled = disabled;
        if (disabled) NDS.aria.disabled(this._stars[i], true);
        else NDS.aria.disabled(this._stars[i], null);
      }

      if (disabled) {
        addState(this.rating, 'disabled');
        this._hidePreview();
      } else {
        removeState(this.rating, 'disabled');
        if (this._stars[0]?.tagName === 'BUTTON') addState(this.rating, 'interactive');
        this.init();
      }
    }

    enable() {
      this._setDisabled(false);
    }

    disable() {
      this._setDisabled(true);
    }

    isDisabled() {
      return hasState(this.rating, 'disabled') ||
             (this._stars[0] && this._stars[0].disabled);
    }
  }

  const create = (element) => element.ndsRating || (element.ndsRating = new NdsRating(element));

  function setupRatings() {
    document.querySelectorAll('.nds-rating').forEach(create);
  }

  function enableRating(element) {
    create(element).enable();
  }

  // The field's check: NDS.validation runs it at submit, validate(el) is its public face.
  // The stars are buttons, not form controls: the score lives on the .nds-rating root. Zero = nothing picked.
  const checkField = (group) => {
    const rating = group.querySelector('.nds-rating');
    const value = rating ? (rating.ndsRating ? rating.ndsRating.getValue() : Number(rating.dataset.rating) || 0) : 0;
    const valid = !NDS.validation.isRequired(group) || value > 0;
    return { valid, message: valid ? '' : strings.text('rating_required'), empty: value === 0, rating: value };
  };
  // The stars are buttons, so focus lands on the first one.
  NDS.validation.addRule('.nds-form-group[data-min-checked], .nds-form-group[data-max-checked], .nds-form-group[data-required], .nds-form-group.nds-required',
    (group) => (group.querySelector('.nds-rating') ? Object.assign(checkField(group), { focus: group.querySelector('.nds-rating-star') }) : null),
    { on: ['nds:rating:change'] });

  NDS.Rating = {
    init: setupRatings,
    reinit: setupRatings,
    validate: (el, opts) => NDS.Form.validateField(el.closest('.nds-form-group') || el, opts, checkField),
    create,
    destroy: (element) => element?.ndsRating?.destroy(),
    enable: enableRating,
  };

  NDS.onDOMAdd('.nds-rating', (nodes) => nodes.forEach(create));

  NDS.onDOMRemove('.nds-rating', (nodes) => nodes.forEach((el) => el.ndsRating?.destroy()));
})();
