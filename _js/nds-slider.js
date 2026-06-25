/**
 * NDS Slider
 * Single or dual <input type="range"> with gradient fill + live value output.
 * Native input owns drag/keyboard/touch/SR — JS only paints the CSS var
 * (--slider-fill for single, --slider-fill-start/end for range) and clamps
 * the two sibling inputs in range mode so they never invert.
 */

(function () {
    'use strict';
    if (!window.NDS) window.NDS = {};

    var TAG = 'NDS Slider:';
    var SENTINEL = 'data-nds-slider-initialized';

    function pct(input) {
        var min = parseFloat(input.min);
        var max = parseFloat(input.max);
        if (isNaN(min)) min = 0;
        if (isNaN(max)) max = 100;
        if (max === min) return 0;
        return ((parseFloat(input.value) - min) / (max - min)) * 100;
    }

    // Write the raw input value to an output, then let the Numbers utility own
    // formatting if the output opted in via .nds-number-format. That class also
    // paints the [data-currency]::after icon, so the symbol stays put across
    // updates. Slider knows nothing about thousand-separators or locales.
    function writeValue(output, raw) {
        if (!output) return;
        output.textContent = raw;
        if (window.NDS && NDS.Numbers && NDS.Numbers.format) NDS.Numbers.format(output);
    }

    // Reserve output width for the widest value the input can produce so the
    // flex row doesn't shift as the user drags — if width grew with text, the
    // bar's flex:1 slot would shrink and the thumb-edge fill calc would drift.
    // Measure off-DOM via cloneNode, formatted the same way the live output is.
    function reserveWidth(input, output) {
        if (!input || !output) return;
        var maxN = parseFloat(input.max);
        var minN = parseFloat(input.min);
        if (isNaN(maxN) && isNaN(minN)) return;
        var maxText = isNaN(maxN) ? '' : String(maxN);
        var minText = isNaN(minN) ? '' : String(minN);
        var widestRaw = maxText.length >= minText.length ? maxText : minText;
        var clone = output.cloneNode(false);
        clone.textContent = widestRaw;
        clone.style.cssText = 'position:absolute;visibility:hidden;width:auto;min-width:0;pointer-events:none;';
        output.parentNode.appendChild(clone);
        if (window.NDS && NDS.Numbers && NDS.Numbers.format) NDS.Numbers.format(clone);
        var w = clone.getBoundingClientRect().width;
        output.parentNode.removeChild(clone);
        if (w > 0) output.style.width = w + 'px';
    }

    function paintSingle(input) {
        input.style.setProperty('--slider-fill', pct(input) + '%');
        var control = input.closest('.nds-form-control');
        writeValue(control && control.querySelector('.nds-slider-value'), input.value);
    }

    function paintRange(container) {
        var minInput = container.querySelector('.nds-slider-min');
        var maxInput = container.querySelector('.nds-slider-max');
        if (!minInput || !maxInput) return;

        // Never let the two inputs invert. The currently-dragged thumb wins;
        // the other snaps to its value.
        if (parseFloat(minInput.value) > parseFloat(maxInput.value)) {
            if (document.activeElement === minInput) minInput.value = maxInput.value;
            else                                     maxInput.value = minInput.value;
        }

        var track = container.querySelector('.nds-slider-track');
        if (track) {
            track.style.setProperty('--slider-fill-start', pct(minInput) + '%');
            track.style.setProperty('--slider-fill-end',   pct(maxInput) + '%');
        }
        writeValue(container.querySelector('.nds-slider-value-min'), minInput.value);
        writeValue(container.querySelector('.nds-slider-value-max'), maxInput.value);
    }

    function paint(container) {
        if (container.classList.contains('nds-slider-range')) {
            paintRange(container);
        } else {
            var input = container.querySelector('.nds-slider');
            if (input) paintSingle(input);
        }
    }

    function reserveAll(container) {
        if (container.classList.contains('nds-slider-range')) {
            reserveWidth(container.querySelector('.nds-slider-min'), container.querySelector('.nds-slider-value-min'));
            reserveWidth(container.querySelector('.nds-slider-max'), container.querySelector('.nds-slider-value-max'));
        } else {
            var input = container.querySelector('.nds-slider');
            var out = container.querySelector('.nds-slider-value');
            reserveWidth(input, out);
        }
    }

    function initOne(container) {
        if (container.getAttribute(SENTINEL) === 'true') return;
        container.setAttribute(SENTINEL, 'true');
        reserveAll(container);
        paint(container);
    }

    var bound = false;
    function bindOnce() {
        if (bound) return;
        bound = true;
        document.addEventListener('input', function (e) {
            var t = e.target;
            if (!t || !t.matches || !t.matches('.nds-slider')) return;
            var c = t.closest('.nds-slider-container');
            if (c) paint(c);
        });
    }

    NDS.Slider = {
        init: function () {
            bindOnce();
            document.querySelectorAll('.nds-slider-container').forEach(initOne);
            if (NDS.onDOMAdd) NDS.onDOMAdd('.nds-slider-container', initOne);
            // eslint-disable-next-line no-console
            console.log(TAG, 'initialized');
        },
        reinit: function (el) {
            var list = el ? [el] : document.querySelectorAll('.nds-slider-container');
            list.forEach(function (c) {
                c.removeAttribute(SENTINEL);
                initOne(c);
            });
        },
        destroy: function (el) {
            var list = el ? [el] : document.querySelectorAll('[' + SENTINEL + ']');
            list.forEach(function (c) { c.removeAttribute(SENTINEL); });
            // ponytail: delegated listener stays bound for the page lifetime —
            // reinit re-uses it. Upgrade to AbortController if a future variant
            // needs per-instance teardown (e.g. native vertical orientation).
        },
        create: function (el) { initOne(el); return el; }
    };
})();
