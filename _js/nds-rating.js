/* NDS.Rating — public surface
 * Rides: (none — base component)
 * Requires:
 *   .nds-rating needs .nds-rating-star — there is nothing to show
 * Methods:
 *   NDS.Rating.init()              scan + initialize .nds-rating
 *   NDS.Rating.create(el)           instance one rating (returns the live one if there is
 *                                   already one)
 *   NDS.Rating.validate(el, opts)   the rating group's check → {valid, message, rating}; opts {showMessage}
 *   NDS.Rating.destroy(el)          undo create()
 *   NDS.Rating.enable(el)           build it if needed, then take it out of disabled
 *   NDS.Rating.getValue(el)         the score (0 for none, '' on a missed ref); el is the rating, its group or the hidden input
 *   NDS.Rating.setValue(el, value)  set the score (fires the event) → true; false when not 0..max or a missed ref
 *   NDS.Rating.clear(el)            no stars (0), fires the event → true; false on a missed ref
 *   instance.setValue(v)            set the rating (fires the event) → true; false when not 0..max
 *   instance.getValue()             the current value
 *   instance.clear()                no stars (0)
 *   instance.enable() / .disable() / .isDisabled()
 *   instance.destroy()
 * Events (bubble from the .nds-rating):
 *   nds:rating:change   detail {rating, value, element} — on every pick that changes the value
 * Hooks:
 *   data-rating   the current value on the root; the component writes the new value back
 *                 here on every pick
 *   data-rating-value   a hidden input in the root or its .nds-form-group: the component
 *                 writes the score into it (0 for none), so it posts with the form; a form
 *                 reset restores the first score. User Feedback shares the hook
 *   written by the component: data-value on each .nds-rating-star (its 1-based position);
 *                 on a display rating, role img and its score as the name, or aria-hidden
 *                 inside a button or a link; on an interactive one, role radiogroup, and on
 *                 each star role radio, aria-checked and one tab stop
 * Gotchas:
 *   - Interactive mode is auto-detected: <button> stars on a root that is not disabled
 *     gain data-state="interactive". Non-button stars stay display-only.
 *   - The stars show the score rounded to the nearest half: 4.2 is 4, 4.3 is 4.5, 4.8 is 5.
 *   - On an interactive rating the arrow keys pick the next or previous score, as radios do.
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
  const strings = NDS.i18n.getStrings('rating', {
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
      // Interactive stars are radios: one tab stop, and the picked one is announced as checked.
      if (this._isButtons && !element.hasAttribute('role')) element.setAttribute('role', 'radiogroup');
      for (let i = 0; i < this._stars.length; i++) {
        this._stars[i].dataset.value = i + 1;
        if (!this._isButtons) continue;
        this._stars[i].setAttribute('role', 'radio');
        strings.set(this._stars[i], 'aria-label', 'stars', { n: i + 1 });
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
      NDS.field.onReset(this.rating.closest('form'), () => this._setRating(this._startRating), { signal });

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
        detail: { rating: value, value, element: this.rating },
        bubbles: true
      }));
    }

    // A display rating reads as one image with its score: "3.5 of 5".
    _labelScore() {
      if (this._isButtons) return;
      // In a button or a link, the control's own text names the score.
      if (this.rating.parentElement?.closest('button, a')) { this.rating.setAttribute('aria-hidden', 'true'); return; }
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
      // The nearest half: 4.2 is 4 stars, 4.3 to 4.7 four and a half, 4.8 five.
      const halves = Math.round(this._currentRating * 2);
      const whole = Math.floor(halves / 2);
      const hasHalf = halves % 2 === 1;

      for (let i = 0; i < this._stars.length; i++) {
        const states = [];
        if (i < whole) states.push('selected');
        if (hasHalf && i === whole) states.push('half');

        // Preserve preview state if present
        if (hasState(this._stars[i], 'preview')) states.push('preview');

        NDS.state.set(this._stars[i], ...states);
        if (!this._isButtons) continue;
        // The tab stop is the checked star, or the first while none is.
        this._stars[i].setAttribute('aria-checked', String(i === whole - 1));
        this._stars[i].tabIndex = i === Math.max(whole - 1, 0) ? 0 : -1;
      }
    }

    _handleKeyboard(e, value) {
      const index = value - 1;
      const isRtl = NDS.isRtl;
      const last = this._stars.length - 1;
      // As radios do, an arrow both moves and picks.
      const pick = (i) => { if (i < 0 || i > last) return; this._setRating(i + 1); this._stars[i].focus(); };

      switch(e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          this._setRating(value);
          break;

        case 'ArrowRight':
          e.preventDefault();
          pick(isRtl ? index - 1 : index + 1);
          break;

        case 'ArrowLeft':
          e.preventDefault();
          pick(isRtl ? index + 1 : index - 1);
          break;

        case 'ArrowUp':
          e.preventDefault();
          pick(index + 1);
          break;

        case 'ArrowDown':
          e.preventDefault();
          pick(index - 1);
          break;

        case 'Home':
          e.preventDefault();
          pick(0);
          break;

        case 'End':
          e.preventDefault();
          pick(last);
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
      // Number, not parseFloat: '3abc' is refused, as in 1.12; '' and null are no score.
      const n = typeof value === 'number' || (typeof value === 'string' && value.trim()) ? Number(value) : NaN;
      if (!(n >= 0 && n <= this._stars.length)) return false;
      this._setRating(n);
      return true;
    }

    clear() {
      return this.setValue(0);
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

  const create = (element) => {
    element = NDS.resolveElement(element);
    return element && (element.ndsRating || (element.ndsRating = new NdsRating(element)));
  };

  function setupRatings() {
    document.querySelectorAll('.nds-rating').forEach(create);
  }

  // The rating from itself, an element inside it, or the group that holds it (the hidden input's).
  const findRating = (element) => {
    element = NDS.resolveElement(element);
    const root = element?.closest?.('.nds-rating')
      || element?.querySelector?.('.nds-rating')
      || element?.closest?.('.nds-form-group')?.querySelector('.nds-rating');
    return root ? create(root) : null;
  };

  function enable(element) {
    create(element)?.enable();
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
    validate: (el, opts) => NDS.Form.validateField(NDS.resolveElement(el)?.closest('.nds-form-group') || el, checkField, opts),
    create,
    destroy: (element) => NDS.resolveElement(element)?.ndsRating?.destroy(),
    enable: enable,
    getValue: (el) => findRating(el)?.getValue() ?? '',
    setValue: (el, value) => findRating(el)?.setValue(value) ?? false,
    clear: (el) => findRating(el)?.clear() ?? false,
  };

  NDS.onDomAdd('.nds-rating', (nodes) => nodes.forEach(create));

  NDS.onDomRemove('.nds-rating', (nodes) => nodes.forEach((el) => el.ndsRating?.destroy()));
})();
