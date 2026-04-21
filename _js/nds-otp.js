// NDS OTP Input Controller
// File: nds-otp.js

(function () {
    'use strict';

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
        if (hidden) hidden.value = getValue(group);
    }

    function isAllFilled(group) {
        var inputs = getOtpInputs(group);
        return inputs.length > 0 && inputs.every(function (i) { return i.value.length === 1; });
    }

    function focusAndComplete(group, inputs) {
        if (isAllFilled(group)) {
            inputs[inputs.length - 1].focus();
            dispatch(group, 'nds:otpComplete');
        }
    }

    function dispatch(group, eventName, extra) {
        var detail = { value: getValue(group) };
        if (extra) {
            for (var k in extra) detail[k] = extra[k];
        }
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

    function autoClearStatus(group) {
        if (NDS.Status.get(group) !== '') {
            NDS.Forms.clearStatus(group);
        }
    }

    // ==============================================
    // EVENT HANDLERS
    // ==============================================

    function handleInput(e, group) {
        autoClearStatus(group);
        var input = e.target;
        var inputs = getOtpInputs(group);
        var idx = inputs.indexOf(input);
        var digits = input.value.replace(/\D/g, '');

        if (digits.length > 1) {
            input.value = '';
            var last = distributeDigits(group, digits, idx);

            if (!isAllFilled(group)) {
                var next = inputs[last + 1];
                if (next) next.focus();
            } else {
                focusAndComplete(group, inputs);
            }
        } else {
            input.value = digits;

            if (digits.length === 1) {
                var next = inputs[idx + 1];
                if (next) {
                    next.focus();
                } else {
                    focusAndComplete(group, inputs);
                }
            }
        }

        syncHidden(group);
        dispatch(group, 'nds:otpChange', { filled: isAllFilled(group) });
    }

    function handlePaste(e, group) {
        e.preventDefault();
        autoClearStatus(group);
        var digits = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '');
        if (!digits.length) return;

        clearInputs(group);
        var inputs = getOtpInputs(group);
        var last = distributeDigits(group, digits, 0);

        if (!isAllFilled(group)) {
            var next = inputs[last + 1];
            if (next) next.focus();
        } else {
            focusAndComplete(group, inputs);
        }

        dispatch(group, 'nds:otpChange', { filled: isAllFilled(group) });
    }

    function handleBeforeInput(e, group, input, inputs) {
        if (!e.data || e.data.length <= 1) return;
        e.preventDefault();

        var digits = e.data.replace(/\D/g, '');
        if (!digits.length) return;

        var last = distributeDigits(group, digits, inputs.indexOf(input));

        if (!isAllFilled(group)) {
            var next = inputs[last + 1];
            if (next) next.focus();
        } else {
            focusAndComplete(group, inputs);
        }

        dispatch(group, 'nds:otpChange', { filled: isAllFilled(group) });
    }

    function handleKeydown(e, group) {
        var input = e.target;
        var inputs = getOtpInputs(group);
        var idx = inputs.indexOf(input);
        var isRTL = NDS.isRTL;

        autoClearStatus(group);

        switch (e.key) {
            case 'Backspace':
                e.preventDefault();
                input.value = '';
                syncHidden(group);
                if (inputs[idx - 1]) inputs[idx - 1].focus();
                dispatch(group, 'nds:otpChange', { filled: false });
                break;

            case 'Delete':
                e.preventDefault();
                input.value = '';
                syncHidden(group);
                if (inputs[idx + 1]) inputs[idx + 1].focus();
                dispatch(group, 'nds:otpChange', { filled: false });
                break;

            case 'ArrowLeft':
                e.preventDefault();
                var left = isRTL ? inputs[idx + 1] : inputs[idx - 1];
                if (left) left.focus();
                break;

            case 'ArrowRight':
                e.preventDefault();
                var right = isRTL ? inputs[idx - 1] : inputs[idx + 1];
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
        setTimeout(function () {
            if (document.activeElement === input) input.select();
        }, 0);
    }

    // ==============================================
    // INITIALIZATION
    // ==============================================

    function initOtpGroup(group) {
        if (!group || group._ndsOtpInit) return;
        group._ndsOtpInit = true;
        group._ndsOtpAC = new AbortController();
        var signal = group._ndsOtpAC.signal;

        var inputs = getOtpInputs(group);
        if (!inputs.length) return;

        inputs.forEach(function (input) {
            input.addEventListener('beforeinput', function (e) {
                handleBeforeInput(e, group, input, inputs);
            }, { signal: signal });
            input.addEventListener('input', function (e) { handleInput(e, group); }, { signal: signal });
            input.addEventListener('paste', function (e) { handlePaste(e, group); }, { signal: signal });
            input.addEventListener('keydown', function (e) { handleKeydown(e, group); }, { signal: signal });
            input.addEventListener('click', function (e) { handleClick(e, group); }, { signal: signal });
            input.addEventListener('focus', handleFocus, { signal: signal });
        });

        // Restore autofocus — browser native autofocus may be lost due to staggered init
        var autofocusInput = group.querySelector('input[autofocus]');
        if (autofocusInput) autofocusInput.focus();
    }

    // ==============================================
    // MAIN INIT
    // ==============================================

    function init() {
        document.querySelectorAll('.nds-otp-group').forEach(initOtpGroup);

        NDS.onDOMAdd('.nds-otp-group', function (nodes) {
            nodes.forEach(initOtpGroup);
        });

        NDS.onDOMRemove('.nds-otp-group', function (nodes) {
            nodes.forEach(function (group) {
                if (group._ndsOtpAC) {
                    group._ndsOtpAC.abort();
                    group._ndsOtpAC = null;
                }
                group._ndsOtpInit = false;
            });
        });
    }

    // ==============================================
    // PUBLIC API
    // ==============================================

    NDS.OTP = {
        init: init,

        getValue: function (group) {
            return getValue(group);
        },

        setValue: function (group, value) {
            clearInputs(group);
            distributeDigits(group, String(value).replace(/\D/g, ''), 0);
        },

        clear: function (group) {
            clearInputs(group);
            dispatch(group, 'nds:otpClear');
            var inputs = getOtpInputs(group);
            if (inputs[0]) inputs[0].focus();
        },

        _loaded: true
    };

})();
