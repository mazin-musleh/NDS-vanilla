/**
 * NDS Progress Component
 * Reads data-value, data-max, data-num from .nds-progress-circle and .nds-progress-bar
 * Sets CSS custom properties and populates text for percentage & "out of" displays
 * Initial value is applied as the indicator scrolls into view (NDS.onIntersect)
 * so the fill animates where it's seen; reduced motion applies it immediately
 * Observes attribute changes via NDS.onAttrChange for live updates
 *
 * Data attributes (priority over inline style):
 *   data-value  — progress percentage (0–100), sets --progress-value
 *   data-max    — denominator for "out of" display (circle only), sets --progress-max
 *   data-num    — numerator for "out of" display (circle only), sets --progress-num
 *
 * Usage:
 *   <div class="nds-progress-circle nds-lg" data-value="75">
 *   <div class="nds-progress-circle nds-lg" data-num="3.75" data-max="5">
 *   <div class="nds-progress-bar nds-lg" data-value="65">
 *
 * API:
 *   NDS.Progress.setValue(el, 75)          — update progress value (circle or bar)
 *   NDS.Progress.setOutOf(el, 3.75, 5)    — update out-of display + value (circle)
 */
(() => {
    'use strict';

    const SEL = '.nds-progress-circle, .nds-progress-bar';
    const ATTRS = ['data-value', 'data-num', 'data-max'];

    function syncFromData(el) {
        if (el.closest('code, .code-example')) return;
        const num = parseFloat(el.dataset.num);
        const max = parseFloat(el.dataset.max);
        const value = parseFloat(el.dataset.value);

        // Out-of mode: data-num + data-max (circle only)
        if (!isNaN(num) && !isNaN(max) && max > 0) {
            el.style.setProperty('--progress-num', num);
            el.style.setProperty('--progress-max', max);
            el.style.setProperty('--progress-value', Math.min((num / max) * 100, 100));

            const numberEl = el.querySelector('.nds-progress-out-of .nds-progress-number');
            const ofEl = el.querySelector('.nds-progress-out-of .nds-progress-of');
            if (numberEl) numberEl.textContent = num;
            if (ofEl) ofEl.textContent = '/' + max;
        }
        // Percentage mode: data-value
        else if (!isNaN(value)) {
            el.style.setProperty('--progress-value', Math.min(value, 100));
        }
    }

    // Public API
    function setValue(el, value) { el.dataset.value = value; }
    function setOutOf(el, num, max) { el.dataset.num = num; el.dataset.max = max; }

    let _offAttrChange;

    function init() {
        const reduced = NDS.prefersReducedMotion;
        const canObserve = typeof IntersectionObserver !== 'undefined';

        document.querySelectorAll(SEL).forEach(el => {
            if (el.dataset.value == null && el.dataset.num == null) return;
            if (el.closest('code, .code-example')) return;

            // Reduced motion (or no observer support): show the value at once.
            if (reduced || !canObserve) { syncFromData(el); return; }

            // Otherwise leave it empty and let the fill sweep when the indicator
            // scrolls into view — setting the value triggers the CSS transition.
            if (el._ndsProgressOff) el._ndsProgressOff();
            el._ndsProgressOff = NDS.onIntersect(el, entry => {
                if (!entry.isIntersecting) return;
                el._ndsProgressOff();
                delete el._ndsProgressOff;
                syncFromData(el);
            }, { threshold: 0.5 });
        });

        if (_offAttrChange) _offAttrChange();
        _offAttrChange = NDS.onAttrChange(SEL, ATTRS, els => els.forEach(syncFromData));
    }

    NDS.Progress = { init, initCircle: syncFromData, setValue, setOutOf };
})();
