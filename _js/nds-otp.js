/* NDS.Otp — public surface
 * Rides: nds-forms (clears the field status as the user types; soft)
 * Requires:
 *   .nds-otp-group needs .nds-otp-container input — the group is not wired
 * Methods:
 *   NDS.Otp.init()                  wire every .nds-otp-group, and self-arm for late ones
 *   NDS.Otp.validate(el, opts)      the group's check → {valid, message, filled}; opts {showMessage}
 *   NDS.Otp.getValue(group)         the digits, joined
 *   NDS.Otp.setValue(group, value)  fill the boxes (non-digits stripped)
 *   NDS.Otp.clear(group)            empty the boxes, focus the first
 * Events (bubble from the .nds-otp-group; every detail carries `value`):
 *   nds:otp:change     detail {value, filled} — on every edit
 *   nds:otp:complete   detail {value} — the moment every box holds a digit
 *   nds:otp:clear      detail {value} — from clear() only
 * Hooks:
 *   (none — the group is markup: the inputs inside .nds-otp-container, plus an optional
 *    input[type="hidden"].nds-otp-value the component keeps in sync)
 * Gotchas:
 *   - Each box's aria-label is "Digit n of N" in the page's language, renumbered for the
 *     group; a label that is not that English stays.
 *   - setValue() writes the boxes and the hidden carrier but fires NO event.
 *   - A multi-digit paste spreads across the boxes from the focused one.
 *   - There is no reinit(): every init() sweeps, and later groups and boxes are picked up
 *     by the shared DOM bus. NDS.init.destroy(view) releases a group (group.ndsOtp).
 */
// NDS OTP Input Controller
// File: nds-otp.js

(function () {
    'use strict';

    // The two pool subscriptions are wired once: core does not dedup a re-run's.
    var subscribed = false;

    var strings = NDS.i18n.getStrings('otp', {
        digit: 'Digit {n} of {total}',
        otp_incomplete: 'Please enter all {n} digits',
    });
    // The English label with any numbers: a box copied from a shorter code still counts as unlabelled.
    var DEFAULT_LABEL = new RegExp('^' + strings.defaults.digit.replace(/\{\w+\}/g, '\\d+') + '$');

    // ==============================================
    // HELPERS
    // ==============================================

    function getOtpInputs(group) {
        return Array.from(group.querySelectorAll('.nds-otp-container input'));
    }

    function getHiddenInput(group) {
        return group.querySelector('input[type="hidden"].nds-otp-value') ||
               group.querySelector('input[type="hidden"]');
    }

    function getValue(group) {
        return getOtpInputs(group).map(function (i) { return i.value; }).join('');
    }

    function syncHidden(group) {
        var hidden = getHiddenInput(group);
        var value = getValue(group);
        if (hidden && hidden.value !== value) NDS.setValue(hidden, value);
    }

    function isAllFilled(group) {
        var inputs = getOtpInputs(group);
        return inputs.length > 0 && inputs.every(function (i) { return i.value.length === 1; });
    }

    function focusAndComplete(group, inputs) {
        if (isAllFilled(group)) {
            inputs[inputs.length - 1].focus();
            dispatch(group, 'nds:otp:complete');
        }
    }

    function dispatch(group, eventName, extra) {
        var detail = Object.assign({ value: getValue(group) }, extra);
        group.dispatchEvent(new CustomEvent(eventName, { detail: detail, bubbles: true }));
    }

    function distributeDigits(group, digits, startIndex) {
        var inputs = getOtpInputs(group);
        var last = startIndex || 0;

        for (var i = 0; i < digits.length && (startIndex + i) < inputs.length; i++) {
            inputs[startIndex + i].value = digits[i];
            last = startIndex + i;
        }

        syncHidden(group);
        return last;
    }

    function clearInputs(group) {
        getOtpInputs(group).forEach(function (i) { i.value = ''; });
        syncHidden(group);
    }

    function clearStaleStatus(group) {
        if (NDS.status.get(group) !== '') {
            NDS.Form.clearStatus(group);
        }
    }

    // ==============================================
    // EVENT HANDLERS
    // ==============================================

    function handleInput(e, group) {
        clearStaleStatus(group);
        var input = e.target;
        var inputs = getOtpInputs(group);
        var index = inputs.indexOf(input);
        var digits = NDS.toLatinDigits(input.value).replace(/\D/g, '');

        if (digits.length > 1) {
            input.value = '';
            var last = distributeDigits(group, digits, index);

            if (!isAllFilled(group)) {
                var next = inputs[last + 1];
                if (next) next.focus();
            } else {
                focusAndComplete(group, inputs);
            }
        } else {
            input.value = digits;

            if (digits.length === 1) {
                var next = inputs[index + 1];
                if (next) next.focus();
            }
        }

        syncHidden(group);
        // After the sync, so a submit from the listener posts every digit. Checked on every box: they can be filled out of order.
        if (digits.length === 1 && isAllFilled(group)) dispatch(group, 'nds:otp:complete');
        dispatch(group, 'nds:otp:change', { filled: isAllFilled(group) });
    }

    function handleBeforeInput(e, group, input, inputs) {
        // Multi-char insert = paste or autofill. Paste text rides on
        // dataTransfer (e.data is null for insertFromPaste), so fall back to it.
        // Handling it here lets the paste event itself proceed un-prevented —
        // calling preventDefault on `paste` trips the "prevents pasting" audit.
        var data = e.data || (e.dataTransfer && e.dataTransfer.getData('text')) || '';
        if (data.length <= 1) return;
        e.preventDefault();
        // No input event follows: drop a stale message here, as handleInput does.
        clearStaleStatus(group);

        var digits = NDS.toLatinDigits(data).replace(/\D/g, '');
        if (!digits.length) return;

        var last = distributeDigits(group, digits, inputs.indexOf(input));

        if (!isAllFilled(group)) {
            var next = inputs[last + 1];
            if (next) next.focus();
        } else {
            focusAndComplete(group, inputs);
        }

        dispatch(group, 'nds:otp:change', { filled: isAllFilled(group) });
    }

    function handleKeydown(e, group) {
        var input = e.target;
        var inputs = getOtpInputs(group);
        var index = inputs.indexOf(input);
        var isRtl = NDS.isRtl;

        clearStaleStatus(group);
        // preventDefault still: WebKit reads Backspace in a read-only field as Back.
        if (input.readOnly && (e.key === 'Backspace' || e.key === 'Delete')) { e.preventDefault(); return; }

        switch (e.key) {
            case 'Backspace':
                e.preventDefault();
                input.value = '';
                syncHidden(group);
                if (inputs[index - 1]) inputs[index - 1].focus();
                dispatch(group, 'nds:otp:change', { filled: false });
                break;

            case 'Delete':
                e.preventDefault();
                input.value = '';
                syncHidden(group);
                if (inputs[index + 1]) inputs[index + 1].focus();
                dispatch(group, 'nds:otp:change', { filled: false });
                break;

            case 'ArrowLeft':
                e.preventDefault();
                var left = isRtl ? inputs[index + 1] : inputs[index - 1];
                if (left) left.focus();
                break;

            case 'ArrowRight':
                e.preventDefault();
                var right = isRtl ? inputs[index - 1] : inputs[index + 1];
                if (right) right.focus();
                break;

            case 'ArrowUp':
            case 'ArrowDown':
                e.preventDefault();
                break;

            default:
                if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
                    input.select();
                }
                break;
        }
    }

    function handleClick(e, group) {
        var inputs = getOtpInputs(group);
        if (inputs.some(function (i) { return i.value; })) {
            e.target.select();
        } else if (inputs[0]) {
            inputs[0].focus();
        }
    }

    function handleFocus(e) {
        var input = e.target;
        // Macrotask yield — must land after the browser's own focus/click selection,
        // which a microtask would run before.
        setTimeout(function () {
            if (document.activeElement === input) input.select();
        }, 0);
    }

    // ==============================================
    // INITIALIZATION
    // ==============================================

    function setupOtpGroup(group) {
        if (!group || group.hasAttribute('data-nds-otp-initialized')) return;

        // Guard before stamping — a group whose inputs render late must stay
        // eligible for the onDomAdd re-arm, and the AC must not leak unaborted.
        var inputs = getOtpInputs(group);
        if (!inputs.length) return;

        group.setAttribute('data-nds-otp-initialized', '');
        var abortController = new AbortController();
        var signal = abortController.signal;
        group.ndsOtp = {
            boxes: inputs.length,
            destroy: function () {
                abortController.abort();
                group.removeAttribute('data-nds-otp-initialized');
                delete group.ndsOtp;
            }
        };

        // A form reset empties the boxes but not the hidden carrier: a hidden input's value is its attribute.
        NDS.field.onReset(inputs[0].form, function () { syncHidden(group); }, { signal: signal });

        inputs.forEach(function (input, i) {
            // Each box says its place in the page's language; a label the page wrote itself stays.
            var vars = { n: i + 1, total: inputs.length };
            var label = input.getAttribute('aria-label');
            if (!label || DEFAULT_LABEL.test(label)) strings.set(input, 'aria-label', 'digit', vars);
            input.addEventListener('beforeinput', function (e) {
                handleBeforeInput(e, group, input, inputs);
            }, { signal: signal });
            input.addEventListener('input', function (e) { handleInput(e, group); }, { signal: signal });
            input.addEventListener('keydown', function (e) { handleKeydown(e, group); }, { signal: signal });
            input.addEventListener('click', function (e) { handleClick(e, group); }, { signal: signal });
            input.addEventListener('focus', handleFocus, { signal: signal });
        });

        // Restore autofocus — browser native autofocus may be lost due to staggered init.
        // preventScroll: a plain focus() scrolls the element into view, forcing a
        // synchronous layout during the component-init burst.
        var autofocusInput = group.querySelector('input[autofocus]');
        if (autofocusInput) autofocusInput.focus({ preventScroll: true });
    }

    // ==============================================
    // MAIN INIT
    // ==============================================

    // Every run sweeps, so a view mounted later is wired too.
    function init() {
        document.querySelectorAll('.nds-otp-group').forEach(setupOtpGroup);
        if (subscribed) return;
        subscribed = true;

        // A box added to a wired group wires it again, so every box counts and carries its label.
        NDS.onDomAdd('.nds-otp-group, .nds-otp-container input', function (nodes) {
            new Set(Array.from(nodes, function (node) { return node.closest('.nds-otp-group'); })).forEach(function (group) {
                if (!group) return;
                if (group.ndsOtp) {
                    // Already wired with these boxes (init's sweep ran first): leave it, and its focus.
                    if (group.ndsOtp.boxes === getOtpInputs(group).length) return;
                    group.ndsOtp.destroy();
                }
                setupOtpGroup(group);
            });
        });

        NDS.onDomRemove('.nds-otp-group', function (nodes) {
            nodes.forEach(function (group) { if (group.ndsOtp) group.ndsOtp.destroy(); });
        });
    }

    // ==============================================
    // PUBLIC API
    // ==============================================

    // The field's check: NDS.validation runs it at submit, validate(el) is its public face.
    function checkField(group) {
        var inputs = Array.from(group.querySelectorAll('.nds-otp-container input'));
        var filled = inputs.length > 0 && inputs.every(function (i) { return i.value.length === 1; });
        return { valid: filled, message: filled ? '' : strings.text('otp_incomplete', { n: inputs.length }),
            empty: inputs.every(function (i) { return !i.value; }), filled: filled };
    }
    NDS.validation.addRule('.nds-form-group.nds-otp-group[data-min-checked], .nds-form-group.nds-otp-group[data-max-checked], .nds-form-group.nds-otp-group[data-required], .nds-form-group.nds-otp-group.nds-required',
        function (group) { return Object.assign(checkField(group), { focus: group.querySelector('.nds-otp-container input') }); },
        { on: ['input'] });

    NDS.Otp = {
        init: init,
        validate: function (el, opts) { return NDS.Form.validateField(el.closest('.nds-form-group') || el, checkField, opts); },

        getValue: getValue,

        setValue: function (group, value) {
            clearInputs(group);
            distributeDigits(group, NDS.toLatinDigits(value).replace(/\D/g, ''), 0);
        },

        clear: function (group) {
            clearInputs(group);
            dispatch(group, 'nds:otp:clear');
            var inputs = getOtpInputs(group);
            if (inputs[0]) inputs[0].focus();
        }
    };

})();
