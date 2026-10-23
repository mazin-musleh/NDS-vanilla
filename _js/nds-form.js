/* NDS.Form — public surface
 * Rides: (none — base component)
 * Requires:
 *   .nds-form-control:not(:has(> .nds-switch-toggle)):not(.nds-multiselect .nds-form-control) needs :scope > input, :scope > textarea, :scope > select, :scope > .nds-slider-track > input — the field gets no states, required mark or clear button
 *   .nds-form-control sits in .nds-form-container — no state, status or error shows
 *   .nds-form-control .nds-clear sits in .nds-form-action — the clear button is never wired
 *   .nds-form-control .nds-toggle-password sits in .nds-form-action — the show-password button is never wired
 *   .nds-auto-fill needs .nds-item — nothing is wired
 *   .nds-form is form — submit validation runs only on a <form>
 * Methods:
 *   NDS.Form.init()                       scan + initialize every .nds-form-container
 *   NDS.Form.create(el)                   initialize every field and form in el (el too);
 *                                          a <form class="nds-form"> gets submit validation
 *   NDS.Form.setStatus(el, status, {message, permanent})   set field status
 *                                          (a field carries 'error', 'help' or
 *                                          nothing; anything else renders neutral)
 *   NDS.Form.clearStatus(el)              clear it
 *   NDS.Form.getStatus(el)                read {status, message, isValid}
 *   NDS.Form.setState(el, name, add)      add/remove a field state ('required' also
 *                                          flips the inputs' required property)
 *   NDS.Form.refresh(el)                  re-sync after setting value/checked from JS: an input its
 *                                          field, any other element every field inside it
 *   NDS.Form.validate(el, opts)           validate everything → {valid, invalidFields, errors};
 *                                          el is the .nds-form or anything inside it — works on
 *                                          a non-<form> container too (see the Gotcha below)
 *   NDS.Form.validateField(el, check, opts)     one field by check, or its component's rule → {valid,
 *                                          message, …}, or null when none answers; opts {showMessage}
 *                                          (default on). Each component's validate(el) calls it
 * Events:
 *   nds:form:status             detail {status, message} — from the form container
 *   nds:form:validate           detail {valid, invalidFields, errors} — from the form, every
 *                               validate() run
 *   nds:form:valid              detail {waitUntil(promise)} — from the form, on a passing submit
 *   nds:form:invalid            detail {invalidFields, errors} — from the form, on a blocked submit
 * Hooks:
 *   data-required · data-min-checked · data-max-checked · data-error-message
 *   data-ajax · data-no-pending · data-message · data-feedback-target · data-loading-slot
 *   data-target · data-autofill-apply (auto-fill containers)
 * Gotchas:
 *   - Feedback needs no slot markup: setStatus creates the message element in the field's
 *     container. A bare data-feedback-target element anywhere inside the container overrides
 *     placement (a permanent position — footer below, header above); the container may instead
 *     carry data-feedback-target="<selector>" to pick the target. Hidden targets unhide while
 *     a message shows and re-hide when the last one clears.
 *   - Singleton shape: init() and create(el) only — no reinit().
 *   - A required custom select is validated through its hidden .nds-select-value carrier:
 *     author data-required on the .nds-select container. The readonly display input is
 *     never constraint-validated, so required on it does nothing.
 *   - A required .nds-upload counts its file rows (rows the checks rejected excluded):
 *     the upload script empties the file input after each pick, so it never carries required.
 *     A row still uploading blocks the submit on any upload, required or not.
 *   - A dropmenu picker (data-select-name) with data-required is checked the same way,
 *     through its hidden carrier; the error shows on the field that holds it.
 *   - An autocomplete with data-strict is checked at submit too: typed text must match a
 *     picked suggestion (mechanism and carve-outs in the autocomplete banner).
 *   - A .nds-phone, .nds-national-id or .nds-iban container is nds-formatted-input.js's field.
 *   - data-error-message on a field is the pattern's message only; on a group, the message
 *     when nothing is picked. Every other failure keeps its own message.
 *   - A blank setCustomValidity(' ') blocks the submit and outlines the field with no message:
 *     for a component that shows the cause itself (password's red chips). It beats native messages.
 *   - A readonly checkbox, radio or switch cannot change: NDS.field cancels the click that Space
 *     or an arrow key sends, since the browser ignores readOnly on those inputs.
 *   - refresh() dispatches nothing on the field but a phone's nds:phone:change (nds-formatted-input.js), so it cannot re-enter your own input handler. Setting
 *     input.value from JS notifies nothing on its own: call refresh() or dispatch input/change.
 *   - Forms owns the submit listener on every real <form class="nds-form">. data-ajax makes it
 *     preventDefault() after validation — the request is yours to send from nds:form:valid.
 *   - That automatic wiring is <form>-tags only: on any other element .nds-form is a layout
 *     marker (wizard step divs use it that way) and create() skips it — no submit validation,
 *     no nds:form:valid, silently. Can't use a <form> tag (one outer server form, a fragment)?
 *     Keep .nds-form on the container, call NDS.Form.validate(container) from your own
 *     trigger (the button's click), and branch on its {valid} result — validation works the
 *     same; only the automatic submit lifecycle is absent.
 *   - validate() is called synchronously at submit; keep it in the main bundle.
 *   - A native form reset (a reset button, form.reset(), React 19 after a form action) clears
 *     each field's status and re-syncs its chrome; each NDS field restores its own value.
 *   - A valid submit (AJAX too) and a reset hide a shown password again.
 *   - Pending: a sent form drops further submits and its submit button shows loading. A POST
 *     that loads a page in this tab is pending until the page goes (a page restored from the
 *     back cache is not); a POST answered by a download or a 204 never ends it, so that form
 *     takes data-no-pending. Otherwise only a waitUntil(promise) from nds:form:valid makes it
 *     pending, until the promise settles; call it in the listener, not after an await.
 */

(function () {
    'use strict';

    // English defaults; the assets/i18n/{lang}.json pack overrides them.
    var strings = NDS.i18n.getStrings('form', {
        min_value:           'Minimum value is {n}',
        max_value:           'Maximum value is {n}',
        no_arabic:         'Arabic characters are not allowed',
        loading:             'Loading',
        show_password:       'Show password',
        hide_password:       'Hide password',
    });

    // ==============================================
    // STATE PROPAGATION HOOKS
    // ==============================================

    var FORM_SCOPE = '.nds-form-container, .nds-form-group';
    // Where a status lives: the nearest of these.
    var STATUS_HOST = '.nds-form-container, .nds-form-group, .nds-feedback';
    var loadingRefs = new WeakMap();
    // An event whose part already showed the field's message: the status part leaves it up.
    var messagedEvents = new WeakSet();
    var pendingEnds = new WeakMap();
    var initializedForms = new WeakSet();

    // ── Loading state — form-scope opt-in ──────────────────────────────
    // Any consumer (autocomplete, remote-validate, custom fetch) can flip
    // data-state="loading" on the form-container or form-group; forms
    // owns the visual UX in one place. The spinner is an authored
    // [data-loading-slot] (not .nds-loading: a loading button carries that class), else a shell forms creates in
    // the field's last non-prefix .nds-form-action (a suffix on a stepper,
    // which has no plain slot: a new slot would squeeze the input), creating a
    // slot if there is none. Its own button, so no styled button is repurposed.
    // nds-btn's CSS renders the spinner from .nds-loading, which core mirrors from the token. Every other
    // button in those slots hides while loading; a prefix is never touched.
    // On exit, restore them; the .nds-clear button's visibility is
    // re-computed from the current input value.
    var LOADING_SLOTS = '.nds-form-action:not(.nds-prefix)';

    function ensureLoadingShell(formControl) {
        var shell = formControl.querySelector(LOADING_SLOTS + ' [data-loading-slot]');
        if (shell) return shell;
        var slots = formControl.querySelectorAll(LOADING_SLOTS);
        var action = slots[slots.length - 1];
        if (!action) {
            action = document.createElement('div');
            action.className = 'nds-form-action';
            formControl.appendChild(action);
        }
        shell = document.createElement('button');
        shell.type = 'button';
        shell.className = 'nds-btn nds-subtle nds-icon-only';
        shell.hidden = true;
        shell.disabled = true;  // inert affordance — keeps it out of the tab order while loading
        shell.setAttribute('data-loading-slot', '');
        strings.set(shell, 'aria-label', 'loading');
        shell.innerHTML = '<i class="nds-icon" aria-hidden="true"></i>';
        action.appendChild(shell);
        return shell;
    }

    function setLoading(el, on) {
        // A container's own control: an Editor's toolbar fields come first.
        var formControl = el.classList.contains('nds-form-container') ? NDS.field.findOwnControl(el) : el.querySelector('.nds-form-control');
        if (on) enterLoading(formControl); else exitLoading(formControl);
    }

    function enterLoading(formControl) {
        if (!formControl || loadingRefs.has(formControl)) return;
        var refs = { shell: ensureLoadingShell(formControl) };
        loadingRefs.set(formControl, refs);
        // Snapshot each sibling's resting hidden state, so exit restores it.
        refs.rest = new Map();
        formControl.querySelectorAll(LOADING_SLOTS).forEach(function(slot) {
            Array.prototype.forEach.call(slot.children, function(child) {
                if (child !== refs.shell) { refs.rest.set(child, child.hidden); child.hidden = true; }
            });
        });
        refs.shell.hidden = false;
        NDS.state.add(refs.shell, 'loading');
    }

    function exitLoading(formControl) {
        var refs = formControl && loadingRefs.get(formControl);
        if (!refs) return;
        loadingRefs.delete(formControl);
        NDS.state.remove(refs.shell, 'loading');
        refs.shell.hidden = true;
        var input = formControl.querySelector('input, textarea, select');
        var hasValue = !!(input && String(input.value || '').trim());
        refs.rest.forEach(function(wasHidden, child) {
            child.hidden = child.classList.contains('nds-clear') ? !hasValue : wasHidden;
        });
    }

    // nds-loading is the canon on every container, so the class spells loading too.
    NDS.state.onToggle('loading', FORM_SCOPE, setLoading, { className: 'nds-loading' });

    // ==============================================
    // UTILITY FUNCTIONS
    // ==============================================
    // A number field's min and max: a missing or blank bound is no bound.
    function getBounds(input) {
        var min = parseInt(input.min), max = parseInt(input.max);
        return { min: isNaN(min) ? -Infinity : min, max: isNaN(max) ? Infinity : max };
    }

    var numberRangeCheck = {
        validateNumberRange: function(input) {
            var value = parseInt(input.value);
            if (input.value === '' || isNaN(value)) return null;
            var bounds = getBounds(input), min = bounds.min, max = bounds.max;
            if (value < min) return { clamped: min, message: validator.getNumberRangeMessage('min', min) };
            if (value > max) return { clamped: max, message: validator.getNumberRangeMessage('max', max) };
            return null;
        },
    };

    // Where a field's message goes: its data-feedback-target selector, else the first marked
    // target it owns, else the field itself.
    function getFeedbackTarget(container) {
        var selector = container.getAttribute('data-feedback-target');
        if (selector) return container.querySelector(selector) || container;
        // Own the marked target — skip footers of NESTED form-containers (the editor's popover
        // fields sit in the toolbar BEFORE the field's own footer; same rationale as NDS.field.findOwnInput).
        var marked = container.querySelectorAll('[data-feedback-target]');
        for (var i = 0; i < marked.length; i++) {
            if (marked[i].closest(STATUS_HOST) === container) return marked[i];
        }
        return container;
    }

    // Keep the field's aria-describedby pointing at its CURRENT message only: strip
    // our earlier tokens, keep the consumer's, append `id` when given.
    function describeBy(input, id) {
        var ids = (input.getAttribute('aria-describedby') || '').split(/\s+/)
            .filter(function (token) { return token && token.indexOf('nds-fb-') !== 0; });
        if (id) ids.push(id);
        if (ids.length) input.setAttribute('aria-describedby', ids.join(' '));
        else input.removeAttribute('aria-describedby');
    }

    // ==============================================
    // STATUS MANAGEMENT API
    // ==============================================
    var statusManager = {
        set: function(options) {
            var element = options.element;
            var status = options.status;
            var message = options.message;

            if (!element) return false;

            var container = element.closest(STATUS_HOST);
            if (!container) return false;

            // Handle standalone feedback
            if (container.classList.contains('nds-feedback')) {
                if (status) {
                    NDS.status.set(container, status);
                    if (message) {
                        var messageElement = container.querySelector('.nds-feedback-message');
                        if (messageElement) {
                            messageElement.textContent = message;
                        }
                    }
                }
                return true;
            }

            // A field carries error, help, or nothing. Anything else still
            // renders its message, in the default colour with a polite announce
            // — the outline and the message tint are error-only signals. Help
            // is neutral gray too; it only swaps in the "?" icon.
            if (status && status !== 'error' && status !== 'help') status = 'neutral';

            if (status) {
                NDS.status.set(container, status);
                var feedback = null;
                if (message) {
                    container.setAttribute('data-message', message);

                    var target = getFeedbackTarget(container);

                    // No slot: right after the field's control row, not the container's end,
                    // so a row the field carries below it (a search box's suggestions) stays below.
                    var position = 'append';
                    var row = target === container && container.classList.contains('nds-form-container') && NDS.field.findOwnControl(container);
                    while (row && row.parentNode !== container) row = row.parentNode;
                    if (row) { target = row; position = 'after'; }

                    var defaults = {
                        position: position,
                        size: 'sm',
                        style: 'outline'
                    };
                    var feedbackOptions = Object.assign({}, defaults, options, {
                        target: target,
                        status: status
                    });
                    delete feedbackOptions.element;
                    feedback = NDS.Feedback.create(feedbackOptions);
                } else if (message === '') {
                    // A blank message (validator's blank custom error) drops the old one: the
                    // component shows the cause itself. An omitted message keeps it.
                    container.removeAttribute('data-message');
                    NDS.Feedback.dismissAll(container, { own: true });
                }

                // Accessibility
                var input = NDS.field.findOwnInput(container);
                if (input) {
                    input.setAttribute('aria-invalid', status === 'error' ? 'true' : 'false');
                    // Name the reason, not just the state: point the field at its message.
                    if (feedback) {
                        if (!feedback.id) feedback.id = NDS.getUniqueId('nds-fb-');
                        describeBy(input, feedback.id);
                    } else if (message === '') {
                        describeBy(input, null);
                    }
                }
            } else {
                return this.clear(container);
            }

            container.dispatchEvent(new CustomEvent('nds:form:status', {
                detail: { status: status, message: message },
                bubbles: true
            }));

            return true;
        },

        clear: function(element) {
            if (!element) return false;

            if (element.classList.contains('nds-feedback')) {
                NDS.status.clear(element);
                return true;
            }

            var container = element.closest(STATUS_HOST);
            if (!container) return false;

            NDS.status.clear(container);
            container.removeAttribute('data-message');

            NDS.Feedback.dismissAll(container, { own: true });

            var input = NDS.field.findOwnInput(container);
            if (input) {
                input.removeAttribute('aria-invalid');
                describeBy(input, null);
            }

            container.dispatchEvent(new CustomEvent('nds:form:status', {
                detail: { status: null, message: null },
                bubbles: true
            }));

            return true;
        },

        get: function(element) {
            if (!element) return { status: '', message: '', isValid: true };

            var container = element.closest(STATUS_HOST);
            if (!container) return { status: '', message: '', isValid: true };
            var status = NDS.status.get(container);
            return {
                status: status,
                message: container.getAttribute('data-message') || '',
                isValid: status !== 'error'
            };
        }
    };

    // ==============================================
    // VALIDATION MODULE
    // ==============================================

    var validator = {
        getNumberRangeMessage: function(type, value) {
            return strings.text(type === 'min' ? 'min_value' : 'max_value', { n: value });
        },

        // One field by its rule (or check, the component's own): the result each component's
        // validate() returns, its status shown when asked.
        validateField: function(el, check, options) {
            options = options || { showMessage: true };
            var result = NDS.validation.check(el, check);
            if (!result) return null;
            var shown = {};
            Object.keys(result).forEach(function(key) { if (key !== 'empty' && key !== 'focus') shown[key] = result[key]; });
            if (options.showMessage) {
                if (!shown.valid) statusManager.set({ element: el, status: 'error', message: shown.message });
                else statusManager.clear(el);
            }
            return shown;
        },

        // Runs every check, shows the outcome, focuses the first failure, reports.
        // Synchronous by contract: the submit handler reads the result to gate preventDefault.
        validateForm: function(formElement, options) {
            options = options || { showMessages: true, focusFirst: true };
            var form = formElement.closest('.nds-form') || formElement;
            var validationResult = NDS.validation.checkAll(form, { extra: getRangeMessage });
            // A field still waiting for its component: load what it waits for, so the next submit can pass.
            if (validationResult.pending) NDS.init.mount(form);

            if (options.showMessages) {
                validationResult.errors.forEach(function(e) { statusManager.set({ element: e.field, status: 'error', message: e.message }); });
                // A rule's field that passed drops the error it showed.
                validationResult.passed.forEach(function(el) { statusManager.clear(el); });
            }
            var first = validationResult.errors.find(function(e) { return e.input; });
            if (options.focusFirst && first) first.input.focus();

            var valid = validationResult.invalidFields.length === 0;
            form.dispatchEvent(new CustomEvent('nds:form:validate', {
                detail: { valid: valid, invalidFields: validationResult.invalidFields, errors: validationResult.errors },
                bubbles: true
            }));
            return { valid: valid, invalidFields: validationResult.invalidFields, errors: validationResult.errors };
        }
    };

    // A field that shows an error is checked again after its rule's events, so the message
    // follows the fix. One document listener per event name, added the first time a rule asks,
    // a rule from a later bundle included.
    var recheckOn = null;
    function syncShownMessages(e) {
        var target = e.target;
        if (!target || !target.closest) return;
        var seen = [];
        NDS.validation.rules.forEach(function(recheckRule) {
            if (recheckRule.on.indexOf(e.type) === -1) return;
            var el = target.closest(recheckRule.selector);
            if (!el || seen.indexOf(el) !== -1) return;
            seen.push(el);
            // The status sits on the field that holds el: a picker shows its message there.
            var holder = el.closest('.nds-form-container, .nds-form-group') || el;
            if (NDS.status.get(holder) !== '') validator.validateField(el);
        });
    }
    function addRecheckListeners() {
        if (recheckOn) return;
        recheckOn = {};
        NDS.validation.onRule(function(rule) {
            rule.on.forEach(function(type) {
                if (recheckOn[type]) return;
                recheckOn[type] = true;
                document.addEventListener(type, syncShownMessages);
            });
        });
    }

    // A number stepper's text input carries min/max that checkValidity ignores on type="text".
    function getRangeMessage(container, input) {
        if (!container.querySelector('.nds-number-increment, .nds-number-decrement')) return null;
        var rangeError = numberRangeCheck.validateNumberRange(input);
        return rangeError ? rangeError.message : null;
    }

    // ==============================================
    // FIELD PARTS (plugged into NDS.field)
    // ==============================================
    // Form's parts of every field, in the order they run after the base's own sync and the formatted
    // part (nds-formatted-input.js loads first): digits, the number stepper, the password, the native
    // select, the clear button, then the messages. Each handler sees every event of its name and
    // checks the target itself.
    var isActive = NDS.field.isActive;

    // The clear button shows while the field holds a value.
    function syncClear(input, formControl) {
        var clearButton = formControl.querySelector('.nds-clear');
        if (clearButton && input.type !== 'radio' && input.type !== 'checkbox') {
            clearButton.toggleAttribute('hidden', input.value.trim() === '');
        }
    }

    // A field's own message from its input: shown when invalid, dropped once valid. A field in a
    // group answers with its group, at submit.
    function validateInput(input, formControl) {
        var container = formControl.closest('.nds-form-container');
        if (container && container.closest('.nds-form-group')) return;
        var isInvalid = input.validity && !input.validity.valid;
        if (!container) return;
        if (isInvalid) {
            statusManager.set({ element: container, status: 'error', message: NDS.validation.getMessage(input) });
        } else if (NDS.status.get(container) === 'error') {
            statusManager.clear(container);
        }
    }

    // Digits: inputmode="numeric" takes Arabic digits as 0-9 and blocks the rest.
    NDS.field.addType('digits', {
        on: {
            beforeinput: function(e, context) {
                // A formatted field's part (nds-formatted-input.js) takes every insert on it.
                if (!context || (!e.isComposing && context.container && context.container.matches('.nds-phone, .nds-national-id, .nds-iban'))) return;
                if (context.input.readOnly || context.input.getAttribute('inputmode') !== 'numeric' || !e.data) return;
                var latin = NDS.toLatinDigits(e.data);
                if (latin === e.data && !/\D/.test(latin)) return;
                e.preventDefault();
                if (/\D/.test(latin)) return;
                var input = context.input;
                // A script insert skips maxlength, so trim to it here.
                if (input.maxLength >= 0) latin = latin.slice(0, Math.max(0, input.maxLength - input.value.length + (input.selectionEnd - input.selectionStart)));
                if (!latin) return;
                // A type="number" input has no selection API: the digit stays blocked there, as before.
                try { input.setRangeText(latin, input.selectionStart, input.selectionEnd, 'end'); } catch (_) { return; }
                input.dispatchEvent(new InputEvent('input', { inputType: e.inputType, data: latin, bubbles: true }));
            }
        }
    });

    // Number stepper: the buttons step, a held button repeats and speeds up, and blur clamps to min/max.
    var stepTiers = [[0, 1, 75], [1500, 10, 50]];   // [held for (ms), step multiplier, interval (ms)]
    var hold = null;
    function stepValue(btn, multiplier) {
        var formControl = btn.closest('.nds-form-control');
        var input = formControl && formControl.querySelector('input');
        if (!input || input.disabled || input.readOnly) return false;
        var current = parseInt(input.value) || 0;
        var bounds = getBounds(input), min = bounds.min, max = bounds.max;
        var step = (parseInt(input.step) || 1) * (multiplier || 1);
        var isIncrement = btn.classList.contains('nds-number-increment');
        var next = Math.max(min, Math.min(max, isIncrement ? current + step : current - step));
        var container = formControl.closest('.nds-form-container');
        if (next !== current) {
            if (container && NDS.status.get(container) === 'error') statusManager.clear(container);
            NDS.setValue(input, next, { change: false });
            return true;
        }
        if (container && NDS.status.get(container) !== 'error') {
            var message = validator.getNumberRangeMessage(isIncrement ? 'max' : 'min', isIncrement ? max : min);
            statusManager.set({ element: container, status: 'error', message: message });
        }
        return false;
    }
    function stopHold() {
        if (!hold) return;
        clearTimeout(hold.start);
        clearInterval(hold.repeat);
        hold.tiers.forEach(clearTimeout);
        hold = null;
    }
    // Simple class selectors first: every click off a field's own input passes through these parts.
    var findStepButton = function(target) {
        var btn = target && target.closest && target.closest('.nds-number-increment, .nds-number-decrement');
        return btn && btn.closest('.nds-form-control') ? btn : null;
    };
    NDS.field.addType('number', {
        around: {
            click: function(e) { var btn = findStepButton(e.target); if (btn) stepValue(btn); },
            pointerdown: function(e) {
                var btn = findStepButton(e.target);
                if (!btn || e.button !== 0) return;
                stopHold();
                var activeHold = hold = { btn: btn, tiers: [], repeat: null };
                // Step at one tier's pace, replacing the pace before; a later tier takes over at its time.
                var repeat = function(multiplier, speed) {
                    clearInterval(activeHold.repeat);
                    activeHold.repeat = setInterval(function() { stepValue(btn, multiplier); }, speed);
                };
                activeHold.start = setTimeout(function() {
                    repeat(stepTiers[0][1], stepTiers[0][2]);
                    stepTiers.slice(1).forEach(function(tier) {
                        activeHold.tiers.push(setTimeout(function() { repeat(tier[1], tier[2]); }, tier[0]));
                    });
                }, 400);
            }
        },
        on: {
            pointerup: stopHold,
            // pointerleave does not bubble: a pointerout to outside the held button stands in for it.
            pointerout: function(e) { if (hold && e.target.closest && e.target.closest('.nds-btn') === hold.btn && !hold.btn.contains(e.relatedTarget)) stopHold(); },
            focusout: function(e, context) {
                if (!context || !context.control.querySelector('.nds-number-increment, .nds-number-decrement')) return;
                var input = context.input;
                var value = parseInt(input.value);
                if (isNaN(value)) { if (input.value || input.validity.badInput) NDS.setValue(input, ''); return; }
                var rangeError = numberRangeCheck.validateNumberRange(input);
                if (rangeError) {
                    NDS.setValue(input, rangeError.clamped);
                    statusManager.set({ element: context.container, status: 'error', message: rangeError.message });
                    messagedEvents.add(e);
                }
            }
        }
    });

    // Password: the toggle shows the typed value; Arabic letters are stripped with a message. A sent or
    // reset form hides a shown password again (an invalid .nds-form stops its submit before here).
    function showPassword(toggle, show) {
        var input = toggle.closest('.nds-form-control').querySelector(':scope > input[type="password"], :scope > input[type="text"]');
        if (!input) return;
        input.type = show ? 'text' : 'password';
        toggle.classList.toggle('show', show);
        NDS.aria.label(toggle, strings.text(show ? 'hide_password' : 'show_password'));
    }
    var hideShown = function(e) {
        if ((e.type === 'reset' && e.defaultPrevented) || !e.target.querySelectorAll) return;
        e.target.querySelectorAll('.nds-toggle-password.show').forEach(function(passwordToggle) { showPassword(passwordToggle, false); });
    };
    NDS.field.addType('password', {
        // Remember the original type: the toggle swaps it.
        setupInput: function(input) { if (input.type === 'password') input.dataset.type = 'password'; },
        around: {
            click: function(e) {
                var toggle = e.target.closest && e.target.closest('.nds-toggle-password');
                if (!toggle || !toggle.closest('.nds-form-control .nds-form-action')) return;
                e.preventDefault();
                showPassword(toggle, !toggle.classList.contains('show'));
            }
        },
        on: {
            // Capture: runs before the field's own input listeners, so Password never counts a stripped letter.
            'input:capture': function(e, context) {
                if (!context || (context.input.type !== 'password' && context.input.dataset.type !== 'password')) return;
                var input = context.input;
                var cleaned = input.value.replace(/[؀-ۿ]/g, '');
                if (cleaned === input.value) return;
                NDS.setValue(input, cleaned, { change: false });
                messagedEvents.add(e);
                if (context.container) statusManager.set({ element: context.container, status: 'error', message: strings.text('no_arabic') });
            },
            submit: hideShown,
            reset: hideShown
        }
    });

    // Native select: the container's `open` state follows the menu, which the browser draws.
    var getNativeSelect = function(context) { return context && context.input.tagName === 'SELECT' ? (context.container || context.control) : null; };
    NDS.field.addType('select', {
        on: {
            mousedown: function(e, context) {
                var container = getNativeSelect(context);
                if (container) NDS.state.has(container, 'open') ? NDS.state.remove(container, 'open') : NDS.state.add(container, 'open');
            },
            keydown: function(e, context) {
                var container = getNativeSelect(context);
                if (!container) return;
                if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key) && !NDS.state.has(container, 'open')) NDS.state.add(container, 'open');
                else if (e.key === 'Escape' || e.key === 'Tab') NDS.state.remove(container, 'open');
            },
            focusout: function(e, context) { var container = getNativeSelect(context); if (container) NDS.state.remove(container, 'open'); },
            change: function(e, context) { var container = getNativeSelect(context); if (container) NDS.state.remove(container, 'open'); }
        }
    });

    // Clear button: empties the field and hands focus back to it, since the button hides itself.
    NDS.field.addType('clear', {
        around: {
            click: function(e) {
                var btn = e.target.closest && e.target.closest('.nds-clear');
                if (!btn || !btn.closest('.nds-form-control .nds-form-action')) return;
                e.preventDefault();
                var formControl = btn.closest('.nds-form-control');
                var inputs = formControl.querySelectorAll(':scope > input, :scope > textarea, :scope > select, :scope > .nds-slider-track > input');
                inputs.forEach(function(input) {
                    // Hidden inputs are component-owned carriers (taginput tags, restore seeds): clear resets
                    // the visible field, never the committed values.
                    if (input.type === 'hidden') return;
                    NDS.setValue(input, input.type === 'checkbox' || input.type === 'radio' ? false : '');
                    // No validation: clearing is an edit like typing, and must not raise "required".
                    NDS.field.refresh(input);
                });
                for (var i = 0; i < inputs.length; i++) {
                    if (inputs[i].type === 'hidden' || inputs[i].disabled) continue;
                    inputs[i].focus();
                    break;
                }
            }
        }
    });

    // Messages: typing drops a message, leaving the field checks it again once it shows an error,
    // and a reset clears every message. The clear button follows the value.
    NDS.field.addType('status', {
        setupInput: function(input, formControl) { syncClear(input, formControl); },
        refresh: function(input, formControl, opts) {
            syncClear(input, formControl);
            if (opts.validate) validateInput(input, formControl);
        },
        on: {
            focusout: function(e, context) {
                // The stepper's clamp message stays up.
                if (!context || messagedEvents.has(e) || !isActive(context.input)) return;
                syncClear(context.input, context.control);
                if (context.container && NDS.status.get(context.container) === 'error') validateInput(context.input, context.control);
            },
            input: function(e, context) {
                // A stripped letter keeps its message up.
                if (!context || messagedEvents.has(e)) return;
                syncClear(context.input, context.control);
                if (context.container && NDS.status.get(context.container) !== '') statusManager.clear(context.container);
                // A group without its own rule drops its message on input too.
                var group = context.control.closest('.nds-form-group');
                if (group && NDS.status.get(group) !== ''
                    && !group.hasAttribute('data-min-checked') && !group.hasAttribute('data-max-checked') && !group.hasAttribute('data-required')) {
                    statusManager.clear(group);
                }
            },
            change: function(e, context) {
                if (!context) return;
                syncClear(context.input, context.control);
                if (context.container && NDS.status.get(context.container) === 'error') validateInput(context.input, context.control);
            }
        }
    });
    NDS.field.onReset(document, function(form) {
        form.querySelectorAll('.nds-form-container[data-status], .nds-form-group[data-status]').forEach(function(el) {
            statusManager.clear(el);
        });
    });

    // Auto-fill: a chip fills its target field; data-autofill-apply also submits the search
    // (it sends Enter to the target).
    NDS.field.addType('autofill', {
        around: {
            click: function(e) {
                var item = e.target.closest && e.target.closest('.nds-item');
                if (!item || !item.closest('.nds-auto-fill[data-target]')) return;
                e.preventDefault();
                e.stopPropagation();
                var container = item.closest('.nds-auto-fill');
                var targetId = container.getAttribute('data-target');
                var itemText = item.textContent.trim().replace(/\s+/g, ' ');
                var target = document.getElementById(targetId)
                    || document.querySelector('[name="' + CSS.escape(targetId) + '"]')
                    || document.querySelector('[data-name="' + CSS.escape(targetId) + '"]');
                if (!target || !itemText) return;
                target.focus();
                NDS.setValue(target, itemText);
                NDS.field.refresh(target, { validate: true });
                if (container.hasAttribute('data-autofill-apply')) {
                    target.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
                }
            }
        }
    });

    // ==============================================
    // FORMS
    // ==============================================
    // A sent form takes no second submit until `until` settles or the page goes; its submit button spins meanwhile.
    function setPending(form, btn, until) {
        var mine = !!btn && !NDS.state.has(btn, 'loading');
        var end = function() {
            if (pendingEnds.get(form) !== end) return;
            pendingEnds.delete(form);
            if (mine) NDS.state.remove(btn, 'loading');
        };
        pendingEnds.set(form, end);
        if (mine) NDS.state.add(btn, 'loading');
        if (until) until.then(end);
    }

    // The submit listener stays on each <form>: a document one would change which of the page's own
    // submit listeners still run when the form is invalid.
    function setupForm(formElement) {
        var form = formElement.closest('.nds-form') || formElement;
        // .nds-form is also a layout marker on non-form elements (wizard step divs): only a real
        // <form> gets novalidate and a submit listener.
        if (form.tagName !== 'FORM' || initializedForms.has(form)) return;
        initializedForms.add(form);
        form.setAttribute('novalidate', '');

        form.addEventListener('submit', function(e) {
            var result = validator.validateForm(form, { showMessages: true, focusFirst: true });
            if (!result.valid) {
                e.preventDefault();
                e.stopPropagation();
                form.dispatchEvent(new CustomEvent('nds:form:invalid', {
                    detail: { invalidFields: result.invalidFields, errors: result.errors },
                    bubbles: true
                }));
                return false;
            }
            var waits = [];
            form.dispatchEvent(new CustomEvent('nds:form:valid', {
                detail: { waitUntil: function(promise) { waits.push(promise); } },
                bubbles: true
            }));
            if (waits.length) setPending(form, e.submitter, Promise.allSettled(waits));
            if (form.hasAttribute('data-ajax')) e.preventDefault();
        });
    }

    var windowWired = false;
    // The el itself counts: a sweep can start on a form, a group or a field.
    var getSelfAndInner = function(el, selector) {
        var inner = Array.from(el.querySelectorAll(selector));
        return el.matches && el.matches(selector) ? [el].concat(inner) : inner;
    };
    NDS.field.addType('forms', {
        create: function(el) {
            getSelfAndInner(el, '.nds-form').forEach(setupForm);
            addRecheckListeners();
            if (windowWired) return;
            windowWired = true;
            // A POST that loads a page in this tab is pending until the page goes. On window, after every
            // other listener: a script that cancelled the submit sends it itself. A GET twice does no harm.
            window.addEventListener('submit', function(e) {
                var form = e.target, submitter = e.submitter;
                if (!initializedForms.has(form) || pendingEnds.has(form) || e.defaultPrevented || form.hasAttribute('data-no-pending')) return;
                var readFormAttribute = function(attributeName) { return (submitter && submitter.getAttribute('form' + attributeName)) || form.getAttribute(attributeName) || ''; };
                if (readFormAttribute('method').toLowerCase() === 'post' && /^(_self)?$/i.test(readFormAttribute('target'))) setPending(form, submitter);
            });
            // Back on a page from the browser's cache: nothing it sent is pending.
            window.addEventListener('pageshow', function(e) {
                if (e.persisted) document.querySelectorAll('form').forEach(function(form) { if (pendingEnds.has(form)) pendingEnds.get(form)(); });
            });
        },
        on: {
            // A pending form drops the submit. Capture runs before the form's own listeners and a framework's root.
            'submit:capture': function(e) {
                if (pendingEnds.has(e.target)) { e.preventDefault(); e.stopImmediatePropagation(); }
            }
        }
    });

    // ==============================================
    // PUBLIC API
    // ==============================================
    NDS.Form = {
        // Core initialization
        init: function() { strings.load(); NDS.field.create(document.body); },
        create: NDS.field.create,

        // Status Management API
        setStatus: function(element, status, options) {
            return statusManager.set(Object.assign({}, options, { element: element, status: status }));
        },
        clearStatus: statusManager.clear.bind(statusManager),
        getStatus: statusManager.get.bind(statusManager),

        // State Management
        setState: function(element, stateName, add) {
            var container = element.closest('.nds-form-container') || element.closest('.nds-form-group') || element;
            add = add !== false;
            if (stateName === 'required') {
                if (add) container.setAttribute('data-required', '');
                else {
                    // .nds-required is the same mark: both go.
                    container.removeAttribute('data-required');
                    container.classList.remove('nds-required');
                }
                // Propagate to inputs, skip radios (always in groups, validated at group level). A field whose
                // value a component owns never stamps required.
                if (!NDS.validation.isOwned(container)) container.querySelectorAll('input, textarea, select').forEach(function(input) {
                    if (input.type !== 'radio') input.required = add;
                });
            } else {
                add ? NDS.state.add(container, stateName) : NDS.state.remove(container, stateName);
            }
        },

        // Re-sync a form-control's chrome (clear button, validation, radio-group
        // paint) after its value/checked is set programmatically. Call this — or
        // dispatch an input/change event — when changing a field's value from JS;
        // raw assignment alone no longer notifies the field. Dispatches nothing
        // itself, so it can't re-enter a caller's own input handler. No-op outside
        // a form-control.
        refresh: function(el) { NDS.field.refresh(el); },

        // Form Validation
        validate: validator.validateForm.bind(validator),
        // One field by its component's rule: each component's validate() calls it
        validateField: validator.validateField.bind(validator)
    };

})();
