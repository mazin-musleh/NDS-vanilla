/* NDS.Slider — public surface
 * Rides: nds-numbers (locale, thousand separators and the currency mark on the value
 *        output; soft — the raw value shows without it)
 * Requires:
 *   .nds-slider-container:not(.nds-slider-range) needs .nds-slider-track — the fill never paints
 *   .nds-slider-container.nds-slider-range needs .nds-slider-min — the thumbs are not clamped and the fill never paints
 *   .nds-slider-container.nds-slider-range needs .nds-slider-max — the thumbs are not clamped and the fill never paints
 * Methods:
 *   NDS.Slider.init()          wire the delegated input listener; initialize every
 *                              .nds-slider-container
 *   NDS.Slider.reinit(el)      re-initialize one container, or all of them with no argument
 *   NDS.Slider.create(el)      initialize one container
 *   NDS.Slider.destroy(el)     release one container, or all of them with no argument
 * Events:
 *   (none — the native `input` event on the range input IS the signal; listen for that)
 * Hooks:
 *   (none to author — markup only: .nds-slider-container holding .nds-slider (or
 *    .nds-slider-min and .nds-slider-max in range mode), a .nds-slider-track, and
 *    .nds-slider-value (or -value-min / -value-max))
 * Gotchas:
 *   - The native <input type="range"> owns drag, keyboard, touch and screen-reader
 *     behaviour. Read input.value; there is no custom event and no getValue().
 *   - A readonly input ignores the step keys (browsers ignore readonly on a range input);
 *     data-state="readonly" on the container sets it through the forms script.
 *   - Range mode is the .nds-slider-range class on the container. The two thumbs are
 *     clamped so they can never cross.
 *   - Add .nds-number-format to the value element to opt into number formatting.
 *   - The value's width is reserved for the widest possible value so the bar does not
 *     jitter; .nds-stacked drops that reservation.
 */
/**
 * NDS Slider
 * Single or dual <input type="range"> with gradient fill + live value output.
 * Native input owns drag/keyboard/touch/SR — JS only paints the track fill
 * (--slider-fill-end for single, --slider-fill-start/end for range) and clamps
 * the two sibling inputs in range mode so they never invert.
 */

(function () {
    'use strict';

    var SENTINEL = 'data-nds-slider-initialized';
    var STEP_KEYS = /^(Arrow(Up|Down|Left|Right)|Home|End|Page(Up|Down))$/;
    var offResizes = new WeakMap();

    function getPercent(input) {
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
        if (el.classList.contains('nds-number-format') && NDS.Numbers && NDS.Numbers.format) NDS.Numbers.format(el);
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
        var width = clone.getBoundingClientRect().width;
        output.parentNode.removeChild(clone);
        if (width > 0) output.style.width = width + 'px';
    }

    function syncSingle(container) {
        var input = container.querySelector('.nds-slider');
        var track = container.querySelector('.nds-slider-track');
        if (!input || !track) return;
        // Single fills 0→value: set only the end stop; start defaults to 0%.
        track.style.setProperty('--slider-fill-end', getPercent(input) + '%');
        writeValue(container.querySelector('.nds-slider-value'), input.value);
    }

    function syncRange(container) {
        var minInput = container.querySelector('.nds-slider-min');
        var maxInput = container.querySelector('.nds-slider-max');
        if (!minInput || !maxInput) return;

        // Never let the thumbs cross: clamp the dragged one to the other's value.
        if (parseFloat(minInput.value) > parseFloat(maxInput.value)) {
            var clamped = document.activeElement === minInput ? minInput : maxInput;
            NDS.setValue(clamped, clamped === minInput ? maxInput.value : minInput.value);
        }

        var track = container.querySelector('.nds-slider-track');
        if (track) {
            track.style.setProperty('--slider-fill-start', getPercent(minInput) + '%');
            track.style.setProperty('--slider-fill-end',   getPercent(maxInput) + '%');
        }
        writeValue(container.querySelector('.nds-slider-value-min'), minInput.value);
        writeValue(container.querySelector('.nds-slider-value-max'), maxInput.value);
    }

    function syncSlider(container) {
        if (container.classList.contains('nds-slider-range')) {
            syncRange(container);
        } else {
            syncSingle(container);
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
    function syncReservation(container) {
        if (container.classList.contains('nds-stacked')) {
            container.querySelectorAll('.nds-slider-value').forEach(function (output) { output.style.width = ''; });
        } else {
            reserveAll(container);
        }
    }

    function setupContainer(container) {
        if (container.getAttribute(SENTINEL) === 'true') return;
        container.setAttribute(SENTINEL, 'true');
        syncSlider(container);
        // Cold-init: the pooled observer's initial callback applies the reservation
        // off the sync path and re-runs it on font-load / resize. .nds-stacked
        // toggles are handled by the onAttributeChange watcher in addDocumentListeners.
        if (offResizes.has(container)) offResizes.get(container)();
        offResizes.set(container, NDS.onElementResize(container, function () { syncReservation(container); }));
    }

    var bound = false;
    function addDocumentListeners() {
        if (bound) return;
        bound = true;
        document.addEventListener('input', function (e) {
            var target = e.target;
            if (!target || !target.matches || !target.matches('.nds-slider')) return;
            var container = target.closest('.nds-slider-container');
            if (container) syncSlider(container);
        });
        // A form reset moves the thumb back without an input event.
        NDS.field.onReset(document, function (form) { form.querySelectorAll('.nds-slider-container').forEach(syncSlider); });
        // Browsers ignore readonly on a range input, so the keys would still move it.
        document.addEventListener('keydown', function (e) {
            var target = e.target;
            if (target && target.readOnly && target.matches && target.matches('.nds-slider') && STEP_KEYS.test(e.key)) e.preventDefault();
        });
        // Toggling .nds-stacked (a class change) neither re-runs init nor fires a
        // resize — re-apply the reservation when a container's class changes.
        // onAttributeChange hands the callback a nodes array.
        NDS.onAttributeChange('.nds-slider-container', ['class'], function (containers) { containers.forEach(syncReservation); });
        // onDomAdd hands the callback a nodes array, not one element.
        NDS.onDomAdd('.nds-slider-container', function (nodes) { nodes.forEach(setupContainer); });
    }

    NDS.Slider = {
        init: function () {
            addDocumentListeners();
            document.querySelectorAll('.nds-slider-container').forEach(setupContainer);
        },
        reinit: function (el) {
            addDocumentListeners();
            var list = el ? [el] : document.querySelectorAll('.nds-slider-container');
            list.forEach(function (container) {
                container.removeAttribute(SENTINEL);
                setupContainer(container);
            });
        },
        destroy: function (el) {
            var list = el ? [el] : document.querySelectorAll('[' + SENTINEL + ']');
            list.forEach(function (container) {
                container.removeAttribute(SENTINEL);
                if (offResizes.has(container)) { offResizes.get(container)(); offResizes.delete(container); }
            });
            // ponytail: delegated input listener stays bound for the page lifetime —
            // reinit re-uses it. Upgrade to AbortController if a future variant
            // needs per-instance teardown (e.g. native vertical orientation).
        },
        // A page with no slider at load never runs init(), so create() binds the delegates too.
        create: function (el) { addDocumentListeners(); setupContainer(el); return el; }
    };
})();
