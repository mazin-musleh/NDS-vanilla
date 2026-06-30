/**
 * NDS Slider
 * Single or dual <input type="range"> with gradient fill + live value output.
 * Native input owns drag/keyboard/touch/SR — JS only paints the track fill
 * (--slider-fill-end for single, --slider-fill-start/end for range) and clamps
 * the two sibling inputs in range mode so they never invert.
 */

(function () {
    'use strict';
    if (!window.NDS) window.NDS = {};

    var SENTINEL = 'data-nds-slider-initialized';

    function pct(input) {
        var min = parseFloat(input.min);
        var max = parseFloat(input.max);
        if (isNaN(min)) min = 0;
        if (isNaN(max)) max = 100;
        if (max === min) return 0;
        return ((parseFloat(input.value) - min) / (max - min)) * 100;
    }

    // Soft dependency — Slider skips locale/currency formatting when NDS.Numbers
    // (a deferred, optional sibling) isn't bundled; the output keeps the raw value.
    function formatOutput(el) {
        if (NDS.Numbers && NDS.Numbers.format) NDS.Numbers.format(el);
    }

    // Re-format on every update: NDS.Numbers also paints the [data-currency]::after
    // icon, so the symbol stays put across drags. Slider itself knows nothing about
    // thousand-separators or locales; .nds-number-format on the output opts in.
    function writeValue(output, raw) {
        if (!output) return;
        output.textContent = raw;
        formatOutput(output);
    }

    // Reserve the output's width for the widest value the input can produce so
    // the inline (beside-bar) layout doesn't jitter as the value changes — the
    // bar's flex slot stays put. Measure off-DOM via a formatted clone (catches
    // currency / thousand-separator width). Harmless under .nds-stacked.
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
        formatOutput(clone);
        var w = clone.getBoundingClientRect().width;
        output.parentNode.removeChild(clone);
        if (w > 0) output.style.width = w + 'px';
    }

    function paintSingle(container) {
        var input = container.querySelector('.nds-slider');
        var track = container.querySelector('.nds-slider-track');
        if (!input || !track) return;
        // Single fills 0→value: set only the end stop; start defaults to 0%.
        track.style.setProperty('--slider-fill-end', pct(input) + '%');
        writeValue(container.querySelector('.nds-slider-value'), input.value);
    }

    function paintRange(container) {
        var minInput = container.querySelector('.nds-slider-min');
        var maxInput = container.querySelector('.nds-slider-max');
        if (!minInput || !maxInput) return;

        // Never let the thumbs cross: clamp the dragged one to the other's value.
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
            paintSingle(container);
        }
    }

    function reserveAll(container) {
        if (container.classList.contains('nds-slider-range')) {
            reserveWidth(container.querySelector('.nds-slider-min'), container.querySelector('.nds-slider-value-min'));
            reserveWidth(container.querySelector('.nds-slider-max'), container.querySelector('.nds-slider-value-max'));
        } else {
            reserveWidth(container.querySelector('.nds-slider'), container.querySelector('.nds-slider-value'));
        }
    }

    // Reserve the widest-value width in inline mode (keeps the bar from jittering),
    // or clear it under .nds-stacked (full-width bar — no reservation needed).
    function applyReservation(container) {
        if (container.classList.contains('nds-stacked')) {
            container.querySelectorAll('.nds-slider-value').forEach(function (o) { o.style.width = ''; });
        } else {
            reserveAll(container);
        }
    }

    function initOne(container) {
        if (container.getAttribute(SENTINEL) === 'true') return;
        container.setAttribute(SENTINEL, 'true');
        paint(container);
        // Cold-init: the pooled observer's initial callback applies the reservation
        // off the sync path and re-runs it on font-load / resize. .nds-stacked
        // toggles are handled by the onAttrChange watcher in bindOnce.
        if (container._sliderOffResize) container._sliderOffResize();
        if (NDS.onElementResize) container._sliderOffResize = NDS.onElementResize(container, function () { applyReservation(container); });
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
        // Toggling .nds-stacked (a class change) neither re-runs init nor fires a
        // resize — re-apply the reservation when a container's class changes.
        // onAttrChange hands the callback a nodes array.
        if (NDS.onAttrChange) NDS.onAttrChange('.nds-slider-container', ['class'], function (els) { els.forEach(applyReservation); });
    }

    NDS.Slider = {
        init: function () {
            bindOnce();
            document.querySelectorAll('.nds-slider-container').forEach(initOne);
            // onDOMAdd hands the callback a nodes array, not one element.
            NDS.onDOMAdd('.nds-slider-container', function (nodes) { nodes.forEach(initOne); });
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
            list.forEach(function (c) {
                c.removeAttribute(SENTINEL);
                if (c._sliderOffResize) { c._sliderOffResize(); delete c._sliderOffResize; }
            });
            // ponytail: delegated input listener stays bound for the page lifetime —
            // reinit re-uses it. Upgrade to AbortController if a future variant
            // needs per-instance teardown (e.g. native vertical orientation).
        },
        create: function (el) { initOne(el); return el; }
    };
})();
