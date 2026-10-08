/* NDS.Forms — public surface
 * Rides: (none — base component)
 * Methods:
 *   NDS.Forms.init()                       scan + initialize every .nds-form-container
 *   NDS.Forms.initializeContainer(el)      initialize one container
 *   NDS.Forms.initForm(form)               wire one .nds-form (submit validation)
 *   NDS.Forms.setStatus({element, status, message, permanent})   set field status
 *                                          (a field carries 'error', 'help' or
 *                                          nothing; anything else renders neutral)
 *   NDS.Forms.clearStatus(el)              clear it
 *   NDS.Forms.getStatus(el)                read {status, message}
 *   NDS.Forms.setState(el, name, add)      add/remove a field state ('required' also
 *                                          flips the inputs' required property)
 *   NDS.Forms.syncState(input)             re-sync a control's chrome after setting
 *                                          value/checked from JS
 *   NDS.Forms.setIndeterminate(cb, value)  set a checkbox's indeterminate state
 *   NDS.Forms.validateForm(el, opts)       validate everything → {valid, invalidFields, errors};
 *                                          el is the .nds-form or anything inside it — works on
 *                                          a non-<form> container too (see the Gotcha below)
 *   NDS.Forms.validateCheckboxGroup(group, opts)
 *   NDS.Forms.validateRadioGroup(group, opts)
 *   NDS.Forms.validateMultiselect(el, opts)
 *   NDS.Forms.validateTaginput(el, opts)
 *   NDS.Forms.validateOtpGroup(el, opts)
 *   NDS.Forms.initCheckboxGroupValidation(group) / .initRadioGroupValidation(group)
 *   NDS.Forms.initMultiselectValidation(el)      live-validation wiring for a group
 *   NDS.Forms.isNationalId(str) / .isIban(str)   the checksum rules behind .nds-national-id / .nds-iban
 * Events:
 *   nds:statusChange         detail {status, message} — from the form container
 *   nds:formValidate         detail {valid, invalidFields, errors} — from the form, every
 *                            validateForm() run
 *   nds:formValid            detail {} — from the form, on a passing submit
 *   nds:formInvalid          detail {invalidFields, errors} — from the form, on a blocked submit
 *   nds:switchChange         detail {checked, value, input} — from the .nds-switch element
 *   nds:indeterminateChange  detail {indeterminate} — from the checkbox
 * Hooks:
 *   data-required · data-min-checked · data-max-checked · data-error-message
 *   data-ajax · data-message · data-feedback-target · data-loading-slot
 *   data-target · data-autofill-apply (auto-fill containers)
 * Gotchas:
 *   - Feedback needs no slot markup: setStatus creates the message element in the field's
 *     container. A bare data-feedback-target element anywhere inside the container overrides
 *     placement (a permanent position — footer below, header above); the container may instead
 *     carry data-feedback-target="<selector>" to pick the target. Hidden targets unhide while
 *     a message shows and re-hide when the last one clears.
 *   - Singleton shape: init() and initializeContainer() only — no reinit(), no create().
 *   - A required custom select is validated through its hidden .nds-select-value carrier:
 *     author data-required on the .nds-select container. The readonly display input is
 *     never constraint-validated, so required on it does nothing.
 *   - A required .nds-file-upload counts its file rows (rows the checks rejected excluded):
 *     the upload script empties the file input after each pick, so it never carries required.
 *     A row still uploading blocks the submit on any upload, required or not.
 *   - A dropmenu picker (data-select-name) with data-required is checked the same way,
 *     through its hidden carrier; the error shows on the field that holds it.
 *   - An autocomplete with data-strict is checked at submit too: typed text must match a
 *     picked suggestion (mechanism and carve-outs in the autocomplete banner).
 *   - .nds-national-id and .nds-iban stamp setCustomValidity on input (and at init), so the
 *     checksum fails the field through checkValidity like any native rule. A pattern on the same
 *     input is redundant; data-error-message still wins.
 *   - A blank setCustomValidity(' ') blocks the submit and outlines the field with no message:
 *     for a component that shows the cause itself (password's red chips). It beats native messages.
 *   - A readonly checkbox, radio or switch cannot change: Forms cancels the click that Space
 *     or an arrow key sends, since the browser ignores readOnly on those inputs.
 *   - syncState() dispatches nothing, so it cannot re-enter your own input handler. Setting
 *     input.value from JS notifies nothing on its own: call syncState() or dispatch input/change.
 *   - Forms owns the submit listener on every real <form class="nds-form">. data-ajax makes it
 *     preventDefault() after validation — the request is yours to send from nds:formValid.
 *   - That automatic wiring is <form>-tags only: on any other element .nds-form is a layout
 *     marker (wizard step divs use it that way) and initForm() skips it — no submit validation,
 *     no nds:formValid, silently. Can't use a <form> tag (one outer server form, a fragment)?
 *     Keep .nds-form on the container, call NDS.Forms.validateForm(container) from your own
 *     trigger (the button's click), and branch on its {valid} result — validation works the
 *     same; only the automatic submit lifecycle is absent.
 *   - validateForm() is called synchronously at submit; keep it in the main bundle.
 *   - Never call form.reset(): nothing in NDS listens for the native reset event. Clear
 *     per field and syncState() each.
 */

// NDS Forms Controller - Form Control Logic

(function () {
    'use strict';

    // English defaults; the assets/i18n/{lang}.json pack overrides them.
    var strings = NDS.i18n.strings('forms', {
        required:            'This field is required',
        invalid:             'Invalid input',
        invalid_email:       'Please enter a valid email address',
        invalid_url:         'Please enter a valid URL',
        pattern:             'Please match the requested format',
        too_short:           'Input is too short (minimum {n} characters)',
        too_long:            'Input is too long (maximum {n} characters)',
        range_under:         'Value must be at least {n}',
        range_over:          'Value must be no more than {n}',
        min_value:           'Minimum value is {n}',
        max_value:           'Maximum value is {n}',
        invalid_national_id: 'Invalid national ID number',
        invalid_iban:        'Invalid IBAN',
        no_arabic:           'Arabic characters are not allowed',
        select_option:       'Please select an option',
        select_at_least:     { one: 'Please select at least 1 option', other: 'Please select at least {n} options' },
        select_at_most:      { one: 'Please select no more than 1 option', other: 'Please select no more than {n} options' },
        rating_required:     'Please choose a rating',
        tag_required:        'Please add at least one tag',
        file_required:       'Please add a file',
        upload_pending:      'Please wait for the upload to finish',
        pick_suggestion:     'Choose from the suggestions',
        otp_incomplete:      'Please enter all {n} digits',
        loading:             'Loading',
        show_password:       'Show password',
        hide_password:       'Hide password',
    });

    // ==============================================
    // STATE PROPAGATION HOOKS
    // ==============================================

    var FORM_SCOPE = '.nds-form-container, .nds-form-group';
    // Fields whose visible input never holds the value: required is checked on the wrapper, never stamped on the input.
    var NO_REQUIRED_STAMP = '.nds-taginput, .nds-file-upload';

    NDS.State.onAdd('disabled', FORM_SCOPE, function(el) {
        el.querySelectorAll('input, textarea, select').forEach(function(inp) { inp.disabled = true; });
        el.querySelectorAll('.nds-form-action .nds-btn').forEach(function(btn) {
            NDS.aria.disabled(btn, true);
            if (btn.tagName === 'BUTTON') btn.disabled = true;
        });
    });

    NDS.State.onRemove('disabled', FORM_SCOPE, function(el) {
        el.querySelectorAll('input, textarea, select').forEach(function(inp) { inp.disabled = false; });
        el.querySelectorAll('.nds-form-action .nds-btn').forEach(function(btn) {
            NDS.aria.disabled(btn, false);
            if (btn.tagName === 'BUTTON') btn.disabled = false;
        });
    });

    NDS.State.onAdd('readonly', FORM_SCOPE, function(el) {
        el.querySelectorAll('input, textarea, select').forEach(function(inp) { inp.readOnly = true; });
    });

    NDS.State.onRemove('readonly', FORM_SCOPE, function(el) {
        el.querySelectorAll('input, textarea, select').forEach(function(inp) { inp.readOnly = false; });
    });

    // ── Loading state — form-scope opt-in ──────────────────────────────
    // Any consumer (autocomplete, remote-validate, custom fetch) can flip
    // data-state="loading" on the form-container or form-group; forms
    // owns the visual UX in one place. The spinner is an authored
    // [data-loading-slot] / legacy .nds-loading, else a shell forms creates in
    // the field's last non-prefix .nds-form-action (a suffix on a stepper,
    // which has no plain slot: a new slot would squeeze the input), creating a
    // slot if there is none. Its own button, so no styled button is repurposed.
    // nds-btn's CSS renders the spinner from data-state="loading". Every other
    // button in those slots hides while loading; a prefix is never touched.
    // On exit, restore them; the .nds-clear button's visibility is
    // re-computed from the current input value.
    var LOADING_SLOTS = '.nds-form-action:not(.nds-prefix)';

    function _ensureLoadingShell(fc) {
        var shell = fc.querySelector(LOADING_SLOTS + ' :is([data-loading-slot], .nds-loading)');
        if (shell) return shell;
        var slots = fc.querySelectorAll(LOADING_SLOTS);
        var action = slots[slots.length - 1];
        if (!action) {
            action = document.createElement('div');
            action.className = 'nds-form-action';
            fc.appendChild(action);
        }
        shell = document.createElement('button');
        shell.type = 'button';
        shell.className = 'nds-btn nds-subtle';
        shell.hidden = true;
        shell.disabled = true;  // inert affordance — keeps it out of the tab order while loading
        shell.setAttribute('data-loading-slot', '');
        shell.setAttribute('aria-label', strings.t('loading'));
        shell.innerHTML = '<i class="nds-icon" aria-hidden="true"></i>';
        action.appendChild(shell);
        return shell;
    }

    NDS.State.onAdd('loading', FORM_SCOPE, function(el) {
        var fc = el.classList.contains('nds-form-control') ? el : el.querySelector('.nds-form-control');
        if (!fc || fc._ndsLoading) return;
        var refs = fc._ndsLoading = { shell: _ensureLoadingShell(fc) };
        // Snapshot each sibling's resting hidden state, so exit restores it.
        refs.rest = new Map();
        fc.querySelectorAll(LOADING_SLOTS).forEach(function(slot) {
            Array.prototype.forEach.call(slot.children, function(child) {
                if (child !== refs.shell) { refs.rest.set(child, child.hidden); child.hidden = true; }
            });
        });
        refs.shell.hidden = false;
        NDS.State.add(refs.shell, 'loading');
    });

    NDS.State.onRemove('loading', FORM_SCOPE, function(el) {
        var fc = el.classList.contains('nds-form-control') ? el : el.querySelector('.nds-form-control');
        var refs = fc && fc._ndsLoading;
        if (!refs) return;
        fc._ndsLoading = null;
        NDS.State.remove(refs.shell, 'loading');
        refs.shell.hidden = true;
        var input = fc.querySelector('input, textarea, select');
        var hasValue = !!(input && String(input.value || '').trim());
        refs.rest.forEach(function(wasHidden, child) {
            child.hidden = child.classList.contains('nds-clear') ? !hasValue : wasHidden;
        });
    });

    // ==============================================
    // UTILITY FUNCTIONS
    // ==============================================
    var Utils = {
        validateNumberRange: function(input) {
            var val = parseInt(input.value);
            if (input.value === '' || isNaN(val)) return null;
            var min = input.hasAttribute('min') ? parseInt(input.min) : -Infinity;
            var max = input.hasAttribute('max') ? parseInt(input.max) : Infinity;
            if (val < min) return { clamped: min, message: Validator.getNumberRangeMessage('min', min) };
            if (val > max) return { clamped: max, message: Validator.getNumberRangeMessage('max', max) };
            return null;
        },

        triggerEvents: NDS.triggerEvents,
    };

    // A form-container's OWN field — skips fields living inside a NESTED
    // form-container (the editor's link-popover URL input precedes the carrier
    // textarea in DOM order; a multiselect option checkbox belongs to its
    // check-container, not the wrapper being validated). Groups/feedback keep
    // the legacy first-match behavior.
    function ownField(container) {
        // Never a hidden carrier: a picker in the prefix slot puts one before the real input.
        var fields = container.querySelectorAll('input:not([type="hidden"]), textarea, select');
        if (!container.classList.contains('nds-form-container')) return fields[0] || null;
        for (var i = 0; i < fields.length; i++) {
            if (fields[i].closest('.nds-form-container') === container) return fields[i];
        }
        return null;
    }

    // Keep the field's aria-describedby pointing at its CURRENT message only: strip
    // our earlier tokens, keep the consumer's, append `id` when given.
    function describeBy(input, id) {
        var ids = (input.getAttribute('aria-describedby') || '').split(/\s+/)
            .filter(function (t) { return t && t.indexOf('nds-fb-') !== 0; });
        if (id) ids.push(id);
        if (ids.length) input.setAttribute('aria-describedby', ids.join(' '));
        else input.removeAttribute('aria-describedby');
    }

    // ==============================================
    // STATUS MANAGEMENT API
    // ==============================================
    var StatusManager = {
        set: function(options) {
            var element = options.element;
            var status = options.status;
            var message = options.message;

            if (!element) return false;

            var container = element.closest('.nds-form-container, .nds-form-group, .nds-feedback');
            if (!container) return false;

            // Handle standalone feedback
            if (container.classList.contains('nds-feedback')) {
                if (status) {
                    NDS.Status.set(container, status);
                    if (message) {
                        var msgElement = container.querySelector('.nds-feedback-message');
                        if (msgElement) {
                            msgElement.textContent = message;
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
                NDS.Status.set(container, status);
                var feedback = null;
                if (message) {
                    container.setAttribute('data-message', message);

                    // Create feedback using NDSFeedback API.
                    // Dynamic target selection using data-feedback-target attribute
                    var targetSelector = container.getAttribute('data-feedback-target');
                    var target = container;

                    if (targetSelector) {
                        var foundTarget = container.querySelector(targetSelector);
                        if (foundTarget) {
                            target = foundTarget;
                        }
                    } else {
                        // Own the marked target — skip footers of NESTED
                        // form-containers (the editor's popover fields sit in
                        // the toolbar BEFORE the field's own footer; same
                        // rationale as ownField above).
                        var marked = container.querySelectorAll('[data-feedback-target]');
                        for (var t = 0; t < marked.length; t++) {
                            if (marked[t].closest('.nds-form-container, .nds-form-group, .nds-feedback') === container) {
                                target = marked[t];
                                break;
                            }
                        }
                    }

                    var defaults = {
                        position: 'append',
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
                    // A blank message (Validator's blank custom error) drops the old one: the
                    // component shows the cause itself. An omitted message keeps it.
                    container.removeAttribute('data-message');
                    NDS.Feedback.dismissAll(container);
                }

                // Accessibility
                var input = ownField(container);
                if (input) {
                    input.setAttribute('aria-invalid', status === 'error' ? 'true' : 'false');
                    // Name the reason, not just the state: point the field at its message.
                    if (feedback) {
                        if (!feedback.id) feedback.id = NDS.uniqueId('nds-fb-');
                        describeBy(input, feedback.id);
                    } else if (message === '') {
                        describeBy(input, null);
                    }
                }
            } else {
                this.clear(container);
            }

            container.dispatchEvent(new CustomEvent('nds:statusChange', {
                detail: { status: status, message: message },
                bubbles: true
            }));

            return true;
        },

        clear: function(element) {
            if (!element) return false;

            if (element.classList.contains('nds-feedback')) {
                NDS.Status.clear(element);
                return true;
            }

            var container = element.closest('.nds-form-container, .nds-form-group, .nds-feedback');
            if (!container) return false;

            NDS.Status.clear(container);
            container.removeAttribute('data-message');

            NDS.Feedback.dismissAll(container);

            var input = ownField(container);
            if (input) {
                input.removeAttribute('aria-invalid');
                describeBy(input, null);
            }

            container.dispatchEvent(new CustomEvent('nds:statusChange', {
                detail: { status: null, message: null },
                bubbles: true
            }));

            return true;
        },

        get: function(element) {
            if (!element) return { status: '', message: '', isValid: true };

            var container = element.closest('.nds-form-container, .nds-form-group, .nds-feedback');
            if (!container) return { status: '', message: '', isValid: true };
            var status = NDS.Status.get(container);
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

    // A field is hidden if it — or any ancestor up to the form — carries
    // [hidden]/.hidden or computed display:none. Used to skip hidden fields
    // during validation (getComputedStyle is the submit-only read).
    function isFieldVisible(element, form) {
        if (!element) return false;
        var current = element;
        while (current && current !== form) {
            if (current.hasAttribute('hidden') || current.hidden) return false;
            if (window.getComputedStyle(current).display === 'none') return false;
            current = current.parentElement;
        }
        return true;
    }

    // Saudi national ID / iqama: 10 digits, first 1 or 2, Luhn check digit.
    function isNationalId(v) {
        if (!/^[12]\d{9}$/.test(v)) return false;
        var sum = 0;
        for (var i = 0; i < 10; i++) {
            var d = +v[i];
            if (i % 2 === 0) { d *= 2; if (d > 9) d -= 9; }
            sum += d;
        }
        return sum % 10 === 0;
    }

    // IBAN: country + check digits, then mod-97 of the rearranged, letters-to-numbers string === 1.
    function isIban(v) {
        if (!/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(v)) return false;
        var s = (v.slice(4) + v.slice(0, 4)).replace(/[A-Z]/g, function (c) { return c.charCodeAt(0) - 55; });
        var rem = 0;
        for (var i = 0; i < s.length; i++) rem = (rem * 10 + +s[i]) % 97;
        return rem === 1;
    }

    // .nds-national-id / .nds-iban: normalize the typed value and stamp the checksum result,
    // so checkValidity() (blur and submit) fails the field with a localized message. Empty = valid.
    function stampIdentifier(input) {
        var original = input.value, clean, ok, msg;
        if (input.classList.contains('nds-national-id')) {
            clean = original.replace(/[٠-٩]/g, function (c) { return c.charCodeAt(0) - 0x660; }).replace(/\D/g, '');
            ok = isNationalId(clean);
            msg = strings.t('invalid_national_id');
        } else if (input.classList.contains('nds-iban')) {
            clean = original.toUpperCase().replace(/[^A-Z0-9]/g, '');
            // Banking apps copy a Saudi IBAN without its SA: a value starting with a digit gets it back.
            if (/^\d/.test(clean)) clean = 'SA' + clean;
            ok = isIban(clean);
            msg = strings.t('invalid_iban');
        } else {
            return;
        }
        if (clean !== original) {
            var caret = Math.max(0, input.selectionStart - (original.length - clean.length));
            input.value = clean;
            try { input.setSelectionRange(caret, caret); } catch (_) {}
        }
        input.setCustomValidity(clean && !ok ? msg : '');
    }

    var Validator = {
        getMessage: function(input) {
            if (input.hasAttribute('data-error-message')) {
                return input.getAttribute('data-error-message');
            }

            var validity = input.validity;

            // A blank custom message: the component shows the cause itself (password's red chips).
            if (validity.customError && !input.validationMessage.trim()) return '';

            if (validity.valueMissing) {
                return strings.t('required');
            } else if (validity.typeMismatch) {
                if (input.type === 'email') {
                    return strings.t('invalid_email');
                } else if (input.type === 'url') {
                    return strings.t('invalid_url');
                }
            } else if (validity.tooShort) {
                return strings.t('too_short', { n: input.minLength });
            } else if (validity.tooLong) {
                return strings.t('too_long', { n: input.maxLength });
            } else if (validity.rangeUnderflow) {
                return strings.t('range_under', { n: input.min });
            } else if (validity.rangeOverflow) {
                return strings.t('range_over', { n: input.max });
            } else if (validity.patternMismatch) {
                return strings.t('pattern');
            } else if (validity.customError) {
                // setCustomValidity stamp — already localized by the stamping
                // component (e.g. date-picker format/bounds).
                return input.validationMessage;
            }

            return strings.t('invalid');
        },

        getNumberRangeMessage: function(type, value) {
            return strings.t(type === 'min' ? 'min_value' : 'max_value', { n: value });
        },

        // Shared tail for group validators: apply the data-error-message
        // override, dispatch the showMessage status update, and return the
        // merged result. Each validator supplies its distinct validity/message
        // computation, then hands off here.
        _finishGroupValidation: function(group, options, isValid, message, extra) {
            var customMessage = group.getAttribute('data-error-message');
            if (!isValid && customMessage) message = customMessage;

            if (options.showMessage) {
                if (!isValid) StatusManager.set({ element: group, status: 'error', message: message });
                else StatusManager.clear(group);
            }

            return Object.assign({ valid: isValid, message: message }, extra);
        },

        // Shared checked-count rule for checkbox-backed groups: min defaults
        // to 1 when the element is flagged required, max to the option count.
        _validateCheckedCount: function(group, checkboxes, options) {
            var checkedCount = Array.from(checkboxes).filter(function(cb) { return cb.checked; }).length;

            var hasRequired = group.hasAttribute('data-required') || group.classList.contains('nds-required');
            var minChecked = parseInt(group.getAttribute('data-min-checked') || (hasRequired ? 1 : 0), 10);
            var maxChecked = parseInt(group.getAttribute('data-max-checked') || checkboxes.length, 10);

            var isValid = checkedCount >= minChecked && checkedCount <= maxChecked;
            var message = '';
            if (!isValid) {
                var below = checkedCount < minChecked;
                message = strings.t(below ? 'select_at_least' : 'select_at_most', { n: below ? minChecked : maxChecked });
            }

            return this._finishGroupValidation(group, options, isValid, message, { checked: checkedCount, min: minChecked, max: maxChecked });
        },

        validateCheckboxGroup: function(groupElement, options) {
            options = options || { showMessage: true };
            var group = groupElement.closest('.nds-form-group') || groupElement;
            return this._validateCheckedCount(group, group.querySelectorAll('input[type="checkbox"]'), options);
        },

        validateRadioGroup: function(groupElement, options) {
            options = options || { showMessage: true };

            var group = groupElement.closest('.nds-form-group') || groupElement;
            var radios = group.querySelectorAll('input[type="radio"]');
            var isSelected = Array.from(radios).some(function(r) { return r.checked; });

            var isRequired = group.hasAttribute('data-required') || group.classList.contains('nds-required');
            var isValid = !isRequired || isSelected;
            var message = isValid ? '' : strings.t('select_option');

            return this._finishGroupValidation(group, options, isValid, message, { selected: isSelected });
        },

        // Rating: the stars are buttons, not form controls, so the score lives on
        // the .nds-rating root. Zero means nothing was picked.
        validateRatingGroup: function(groupElement, options) {
            options = options || { showMessage: true };

            var group = groupElement.closest('.nds-form-group') || groupElement;
            var rating = group.querySelector('.nds-rating');
            var value = 0;
            if (rating) {
                value = rating.ndsRating ? rating.ndsRating.getRating() : Number(rating.dataset.rating) || 0;
            }

            var isRequired = group.hasAttribute('data-required') || group.classList.contains('nds-required');
            var isValid = !isRequired || value > 0;
            var message = isValid ? '' : strings.t('rating_required');

            return this._finishGroupValidation(group, options, isValid, message, { rating: value });
        },

        // Multiselect: option checkboxes are the source of truth (no hidden
        // carrier); scoped to the nested dropmenu so nothing else in the
        // wrapper is counted.
        validateMultiselect: function(msElement, options) {
            options = options || { showMessage: true };
            var ms = msElement.closest('.nds-multiselect') || msElement;
            // Resolve the menu portal-aware, then scope to it: re-validation fires on
            // the multiselect's change event — i.e. while the menu is open, and a multiselect
            // in a modal/drawer/table cell has portaled it to <body> by then. A wrapper-
            // rooted `.nds-dropmenu-menu ...` walk counts zero there and reports invalid.
            var menu = NDS.querySelector(ms, '.nds-dropmenu-menu');
            return this._validateCheckedCount(ms, menu ? menu.querySelectorAll('input[type="checkbox"]') : [], options);
        },

        // Taginput: hidden inputs are the carriers (one per committed tag).
        // Typing field is empty at submit even when tags exist — can't feed
        // checkValidity. Required = at least one tag; max is enforced at
        // add-time by the widget, not re-checked here.
        validateTaginput: function(tiElement, options) {
            options = options || { showMessage: true };
            var ti = tiElement.closest('.nds-taginput') || tiElement;
            var hasRequired = ti.hasAttribute('data-required') || ti.classList.contains('nds-required');
            var count = ti.querySelectorAll('.nds-form-control > input[type="hidden"]').length;
            var isValid = !hasRequired || count > 0;
            var message = isValid ? '' : strings.t('tag_required');
            return this._finishGroupValidation(ti, options, isValid, message, { count: count });
        },

        // Upload: the script empties the file input after each pick, so required
        // counts the staged rows instead. A row the checks rejected does not count.
        // A row still uploading blocks every upload field, required or not: the
        // submit would go without that file.
        validateUpload: function(upElement, options) {
            options = options || { showMessage: true };
            var up = upElement.closest('.nds-file-upload') || upElement;
            var hasRequired = up.hasAttribute('data-required') || up.classList.contains('nds-required');
            var count = up.querySelectorAll('.nds-file-list .nds-file-item:not([data-status="error"])').length;
            var pending = !!up.querySelector('.nds-file-list .nds-file-item:is([data-state~="uploading"], [data-state~="processing"])');
            var isValid = !pending && (!hasRequired || count > 0);
            var message = isValid ? '' : strings.t(pending ? 'upload_pending' : 'file_required');
            return this._finishGroupValidation(up, options, isValid, message, { count: count, pending: pending });
        },

        // Custom select: the visible .nds-select-input is readonly — barred
        // from constraint validation, so checkValidity() always passes it.
        // The hidden .nds-select-value is the carrier that submits; required
        // reads it. Internal — reached via validateForm, not exported.
        validateCustomSelect: function(csElement, options) {
            options = options || { showMessage: true };
            var container = csElement.closest('.nds-select') || csElement;
            var carrier = container.querySelector('.nds-select-value');
            var hasRequired = container.hasAttribute('data-required') || container.classList.contains('nds-required');
            var isValid = !hasRequired || !!(carrier && carrier.value.trim());
            var message = isValid ? '' : strings.t('select_option');
            return this._finishGroupValidation(container, options, isValid, message, { value: carrier ? carrier.value : '' });
        },

        // Dropmenu picker (data-select-name): the pick lives in a hidden carrier,
        // which constraint validation skips. Internal — reached via validateForm.
        validateDropmenuSelect: function(dm, options) {
            options = options || { showMessage: true };
            // Own carrier only: a picker nested in this menu holds its own.
            var carrier = Array.prototype.find.call(dm.querySelectorAll('input[data-nds-select-value]'),
                function(el) { return el.closest('.nds-dropmenu') === dm; });
            var isValid = !!(carrier && carrier.value.trim());
            var message = isValid ? '' : strings.t('select_option');
            return this._finishGroupValidation(dm, options, isValid, message, { value: carrier ? carrier.value : '' });
        },

        // Autocomplete strict: data-strict says typed text must match a picked
        // suggestion. The hidden .nds-autocomplete-value carrier (JS-created at
        // build under data-strict) holds the last picked text; typing or clear
        // empties it. No carrier = the field never built (e.g. server-prefilled
        // and untouched) — sanctioned as-is. Empty text is the required rule's
        // business, not strict's. Internal — reached via validateForm.
        validateAutocomplete: function(acElement, options) {
            options = options || { showMessage: true };
            var container = acElement.closest('.nds-form-container') || acElement;
            var carrier = container.querySelector('.nds-autocomplete-value');
            var input = ownField(container);
            var text = input ? input.value.trim() : '';
            var isValid = !carrier || text === '' || carrier.value === text;
            var message = isValid ? '' : strings.t('pick_suggestion');
            return this._finishGroupValidation(container, options, isValid, message, { picked: !!(carrier && carrier.value) });
        },

        validateOtpGroup: function(groupElement, options) {
            options = options || { showMessage: true };

            var group = groupElement.closest('.nds-form-group') || groupElement;
            var inputs = Array.from(group.querySelectorAll('.nds-otp-container input'));
            var isAllFilled = inputs.length > 0 && inputs.every(function(i) { return i.value.length === 1; });

            var isValid = isAllFilled;
            var message = isValid ? '' : strings.t('otp_incomplete', { n: inputs.length });

            return this._finishGroupValidation(group, options, isValid, message, { filled: isAllFilled });
        },

        // Validate plain field containers (text/email/number/select/textarea).
        // Skips hidden fields, OTP containers, and group-managed fields; pushes
        // each invalid field + message onto the shared accumulator `acc`.
        _validateContainers: function(form, options, acc) {
            form.querySelectorAll('.nds-form-container').forEach(function(container) {
                if (!isFieldVisible(container, form)) return;

                // Skip containers validated at group level (OTP, radio, checkbox)
                if (container.classList.contains('nds-otp-container')) return;
                if (container.closest('.nds-form-group')) return;
                // Composite wrappers own their own validators — taginput's
                // typing field isn't the carrier, checkValidity would false-fail.
                if (container.matches(NO_REQUIRED_STAMP)) return;
                // Custom selects too: the readonly display input false-PASSES
                // checkValidity, so the carrier block in _validateGroups reads
                // the hidden .nds-select-value instead. Keyed on the carrier —
                // a native <select> in the same .nds-select shell stays here.
                if (container.querySelector('.nds-select-value')) return;

                var input = ownField(container);
                if (!input || input.disabled) return;

                var isInvalid = !input.checkValidity();
                var numberMsg = null;

                // Validate number input min/max (type="text" with increment/decrement buttons)
                if (!isInvalid && container.querySelector('.nds-number-increment, .nds-number-decrement')) {
                    var rangeError = Utils.validateNumberRange(input);
                    if (rangeError) {
                        isInvalid = true;
                        numberMsg = rangeError.message;
                    }
                }

                if (isInvalid) {
                    acc.invalidFields.push(container);
                    var msg = numberMsg || Validator.getMessage(input);
                    acc.errors.push({ field: container, input: input, message: msg });

                    if (!acc.firstInvalidInput) acc.firstInvalidInput = input;
                    if (options.showMessages) {
                        StatusManager.set({ element: container, status: 'error', message: msg });
                    }
                }
            });
        },

        // Validate OTP / checkbox / radio groups; pushes each invalid group +
        // message onto the shared accumulator `acc`.
        _validateGroups: function(form, options, acc) {
            form.querySelectorAll('.nds-form-group[data-min-checked], .nds-form-group[data-max-checked], .nds-form-group[data-required], .nds-form-group.nds-required').forEach(function(group) {
                if (!isFieldVisible(group, form)) return;

                var hasCheckboxes = group.querySelector('input[type="checkbox"]');
                var hasRadios = group.querySelector('input[type="radio"]');

                var result = null;
                var anchor = null;
                if (group.classList.contains('nds-otp-group')) {
                    result = Validator.validateOtpGroup(group, { showMessage: options.showMessages });
                    if (!result.valid) anchor = group.querySelector('.nds-otp-container input');
                } else if (hasCheckboxes) {
                    result = Validator.validateCheckboxGroup(group, { showMessage: options.showMessages });
                    anchor = hasCheckboxes;
                } else if (hasRadios) {
                    result = Validator.validateRadioGroup(group, { showMessage: options.showMessages });
                    anchor = hasRadios;
                } else if (group.querySelector('.nds-rating')) {
                    result = Validator.validateRatingGroup(group, { showMessage: options.showMessages });
                    // Anchor on the first star: the stars are buttons, so focusFirst lands on one.
                    anchor = group.querySelector('.nds-rating-star');
                }

                if (result && !result.valid) {
                    acc.invalidFields.push(group);
                    acc.errors.push({ field: group, input: anchor, message: result.message });
                    if (!acc.firstInvalidInput) acc.firstInvalidInput = anchor;
                }
            });

            // Multiselect wrappers: option checkboxes live inside a nested
            // dropmenu, so they're not caught by the .nds-form-group loop above.
            // Validate min/max/required at the wrapper level; anchor is the
            // dropdown trigger (the user's focusable target).
            form.querySelectorAll('.nds-multiselect[data-required], .nds-multiselect.nds-required, .nds-multiselect[data-min-checked], .nds-multiselect[data-max-checked]').forEach(function(ms) {
                if (!isFieldVisible(ms, form)) return;
                var result = Validator.validateMultiselect(ms, { showMessage: options.showMessages });
                if (!result.valid) {
                    var anchor = ms.querySelector('.nds-dropmenu-trigger');
                    acc.invalidFields.push(ms);
                    acc.errors.push({ field: ms, input: anchor, message: result.message });
                    if (!acc.firstInvalidInput) acc.firstInvalidInput = anchor;
                }
            });

            // Taginput wrappers: same pattern as multiselect — typing field
            // isn't the carrier, so _validateContainers can't feed it via
            // checkValidity. Anchor is the typing input (focusable).
            form.querySelectorAll('.nds-taginput[data-required], .nds-taginput.nds-required').forEach(function(ti) {
                if (!isFieldVisible(ti, form)) return;
                var result = Validator.validateTaginput(ti, { showMessage: options.showMessages });
                if (!result.valid) {
                    var anchor = ti.querySelector('.nds-form-control > input:not([type="hidden"])');
                    acc.invalidFields.push(ti);
                    acc.errors.push({ field: ti, input: anchor, message: result.message });
                    if (!acc.firstInvalidInput) acc.firstInvalidInput = anchor;
                }
            });

            // Uploads: same pattern, on every upload (a pending row blocks any of them).
            // Anchor is the Browse button (the file input is invisible).
            form.querySelectorAll('.nds-file-upload').forEach(function(up) {
                if (!isFieldVisible(up, form)) return;
                var result = Validator.validateUpload(up, { showMessage: options.showMessages });
                if (!result.valid) {
                    var anchor = up.querySelector('.nds-browse-btn') || up.querySelector('input[type="file"]');
                    acc.invalidFields.push(up);
                    acc.errors.push({ field: up, input: anchor, message: result.message });
                    if (!acc.firstInvalidInput) acc.firstInvalidInput = anchor;
                }
            });

            // Custom selects: same pattern — the readonly display input is
            // barred from constraint validation, so required reads the hidden
            // .nds-select-value carrier. Keyed on the carrier: a native
            // <select> shares the .nds-select shell and stays with
            // _validateContainers. Anchor is the display input (focusable).
            form.querySelectorAll('.nds-select[data-required], .nds-select.nds-required').forEach(function(cs) {
                if (!isFieldVisible(cs, form)) return;
                if (!cs.querySelector('.nds-select-value')) return;
                var result = Validator.validateCustomSelect(cs, { showMessage: options.showMessages });
                if (!result.valid) {
                    var anchor = cs.querySelector('.nds-select-input');
                    acc.invalidFields.push(cs);
                    acc.errors.push({ field: cs, input: anchor, message: result.message });
                    if (!acc.firstInvalidInput) acc.firstInvalidInput = anchor;
                }
            });

            // Dropmenu pickers: same pattern, keyed on the wrapper's data-required.
            // Anchor is the trigger (focusable).
            form.querySelectorAll('.nds-dropmenu[data-select-name][data-required]').forEach(function(dm) {
                if (!isFieldVisible(dm, form)) return;
                var result = Validator.validateDropmenuSelect(dm, { showMessage: options.showMessages });
                if (!result.valid) {
                    var anchor = dm.querySelector('.nds-dropmenu-trigger') || dm;
                    acc.invalidFields.push(dm);
                    acc.errors.push({ field: dm, input: anchor, message: result.message });
                    if (!acc.firstInvalidInput) acc.firstInvalidInput = anchor;
                }
            });

            // Autocomplete strict fields: typed-vs-picked check on the hidden
            // carrier. Skip taginput containers — assist mode makes one
            // container serve both components, and taginput owns its own
            // commit rejection at add-time.
            form.querySelectorAll('.nds-form-container[data-strict]').forEach(function(ac) {
                if (!isFieldVisible(ac, form)) return;
                if (ac.classList.contains('nds-taginput')) return;
                var result = Validator.validateAutocomplete(ac, { showMessage: options.showMessages });
                if (!result.valid) {
                    var anchor = ownField(ac);
                    acc.invalidFields.push(ac);
                    acc.errors.push({ field: ac, input: anchor, message: result.message });
                    if (!acc.firstInvalidInput) acc.firstInvalidInput = anchor;
                }
            });
        },

        // Thin orchestrator over both validation passes (shared accumulator),
        // then focus first-invalid + dispatch. Synchronous by contract — the
        // submit handler reads the result to gate preventDefault.
        validateForm: function(formElement, options) {
            options = options || { showMessages: true, focusFirst: true };

            var form = formElement.closest('.nds-form') || formElement;

            var acc = { invalidFields: [], errors: [], firstInvalidInput: null };

            this._validateContainers(form, options, acc);
            this._validateGroups(form, options, acc);

            if (options.focusFirst && acc.firstInvalidInput) {
                acc.firstInvalidInput.focus();
            }

            var isFormValid = acc.invalidFields.length === 0;

            form.dispatchEvent(new CustomEvent('nds:formValidate', {
                detail: { valid: isFormValid, invalidFields: acc.invalidFields, errors: acc.errors },
                bubbles: true
            }));

            return {
                valid: isFormValid,
                invalidFields: acc.invalidFields,
                errors: acc.errors
            };
        }
    };

    // ==============================================
    // FIELD STATE SYNC
    // ==============================================
    // Derives a field's container chrome from its input's DOM state — which
    // data-state tokens apply (disabled/readonly/required), clear-button
    // visibility, validation. The data-state token CRUD lives in core
    // (NDS.State); this is the form-specific policy layered on top of it.
    var FieldSync = {
        update: function(input, formControl, skipValidation) {
            var hasValue = (input.type === 'checkbox' || input.type === 'radio')
                ? input.checked
                : input.value.trim() !== '';

            var formContainer = formControl.closest('.nds-form-container');

            // Update data-state on container
            if (formContainer) {
                input.disabled ? NDS.State.add(formContainer, 'disabled') : NDS.State.remove(formContainer, 'disabled');
                // Skip readonly sync for select-input — its readonly prevents typing, not interaction
                if (!input.classList.contains('nds-select-input')) {
                    input.readOnly ? NDS.State.add(formContainer, 'readonly') : NDS.State.remove(formContainer, 'readonly');
                }
                // Skip required propagation for radios/checkboxes — managed at group level.
                // Skip for taginput and upload too: the wrapper's data-required is authoritative,
                // the input's required attr isn't (and mustn't be — see NO_REQUIRED_STAMP).
                // Same for custom selects: the readonly display input never carries
                // required — syncing from it would strip the container's authored attr.
                if (input.type !== 'radio' && input.type !== 'checkbox' && !formContainer.matches(NO_REQUIRED_STAMP)
                    && !input.classList.contains('nds-select-input')) {
                    formContainer.toggleAttribute('data-required', input.required);
                }
            }

            // Show/hide clear button
            var clearButton = formControl.querySelector('.nds-clear');
            if (clearButton && input.type !== 'radio' && input.type !== 'checkbox') {
                clearButton.toggleAttribute('hidden', !hasValue);
            }

            if (skipValidation) return;

            // Skip per-input validation for groups — validated at group level
            if (formContainer && formContainer.closest('.nds-form-group')) return;

            var isInvalid = input.validity && !input.validity.valid;

            // Clear custom validation when HTML5 validation passes
            if (!isInvalid && input.validationMessage) {
                input.setCustomValidity('');
            }

            // Update error message
            if (!formContainer) return;

            if (isInvalid) {
                StatusManager.set({ element: formContainer, status: 'error', message: Validator.getMessage(input) });
            } else {
                var currentStatus = NDS.Status.get(formContainer);
                if (currentStatus === 'error') {
                    StatusManager.clear(formContainer);
                }
            }
        },

        setIndeterminate: function(checkbox, value) {
            if (!checkbox || checkbox.type !== 'checkbox') return;

            checkbox.indeterminate = !!value;

            var formContainer = checkbox.closest('.nds-form-container');
            if (formContainer) {
                value ? NDS.State.add(formContainer, 'indeterminate') : NDS.State.remove(formContainer, 'indeterminate');
            }

            checkbox.dispatchEvent(new CustomEvent('nds:indeterminateChange', {
                detail: { indeterminate: !!value },
                bubbles: true
            }));
        },

        updateRadioGroup: function(changedRadio) {
            if (changedRadio.type !== 'radio' || !changedRadio.name) return;

            var radioGroupContainer = changedRadio.closest('.nds-form-group');
            if (!radioGroupContainer) return;

            var radioGroup = radioGroupContainer.querySelectorAll('input[type="radio"][name="' + changedRadio.name + '"]');
            radioGroup.forEach(function(radio) {
                if (radio !== changedRadio) {
                    var radioFormControl = radio.closest('.nds-form-control');
                    if (radioFormControl) {
                        FieldSync.update(radio, radioFormControl);
                    }
                }
            });
        }
    };

    // ==============================================
    // INPUT EVENT DELEGATION
    // ==============================================
    // Generic per-input chrome (active/focus/typing data-state, value
    // sanitize, validation) is wired ONCE at the document level rather than
    // per element — see installFormDelegation(). Each handler re-resolves the
    // owning form-control from the event target, reproducing the original
    // binding scope (a direct-child input/textarea/select of a non-code
    // `.nds-form-control`). Specialized controls (custom-select, number-input,
    // switch, password toggle, clear button, groups) keep their own
    // per-element wiring; only the generic chrome moved here.
    var _delegationInstalled = false;

    // The select-input is `readonly` to prevent typing but is still
    // interactive (click opens the dropdown), so treat it as active for
    // state-visualization. Recomputed per event — never cached.
    function statesActive(input) {
        return !input.readOnly || input.classList.contains('nds-select-input');
    }

    // Resolve the form-control an event belongs to, matching the original
    // `:scope > input/textarea/select` of a `.nds-form-control` not inside a
    // code sample. Returns null (handler no-ops) otherwise.
    function resolveControl(target) {
        if (!target || !target.matches || !target.matches('input, textarea, select')) return null;
        var formControl = target.parentElement;
        if (!formControl || !formControl.classList || !formControl.classList.contains('nds-form-control')) return null;
        if (formControl.closest('code')) return null;
        return { input: target, formControl: formControl, formContainer: formControl.closest('.nds-form-container') };
    }

    // A container's OWN control — the first .nds-form-control whose nearest
    // form-container ancestor IS this container (skips controls belonging to
    // nested containers, e.g. an editor's toolbar popover fields).
    function ownControl(container) {
        var controls = container.querySelectorAll('.nds-form-control');
        for (var i = 0; i < controls.length; i++) {
            if (controls[i].closest('.nds-form-container') === container) return controls[i];
        }
        return null;
    }

    function installFormDelegation() {
        if (_delegationInstalled) return;
        _delegationInstalled = true;
        var doc = document;

        // While a form-container is focus/active, mark its OWN control with a
        // single `target` gate. The container keeps the real state; `target`
        // just lets the CSS descendant match (container[state] .control[target])
        // reach that one control — through any layout wrapper, at any depth,
        // never a nested container's control. Fires for EVERY stamper (generic
        // delegation, editor, multiselect) since all go through NDS.State.
        var syncTarget = function(container) {
            var f = ownControl(container);
            if (!f) return;
            if (NDS.State.has(container, 'focus') || NDS.State.has(container, 'active'))
                NDS.State.add(f, 'target');
            else
                NDS.State.remove(f, 'target');
        };
        ['focus', 'active'].forEach(function(state) {
            NDS.State.onAdd(state, '.nds-form-container', syncTarget);
            NDS.State.onRemove(state, '.nds-form-container', syncTarget);
        });

        // Mouse press → `active` token. mousedown adds; mouseup/mouseout
        // remove. mouseout stands in for the old per-element mouseleave —
        // inputs have no element children, so mouseout fires only when the
        // pointer actually leaves the control.
        doc.addEventListener('mousedown', function(e) {
            var c = resolveControl(e.target);
            if (c && c.formContainer && statesActive(c.input)) NDS.State.add(c.formContainer, 'active');
        });
        ['mouseup', 'mouseout'].forEach(function(evt) {
            doc.addEventListener(evt, function(e) {
                var c = resolveControl(e.target);
                if (c && c.formContainer && statesActive(c.input)) NDS.State.remove(c.formContainer, 'active');
            });
        });

        // Focus / blur via the bubbling focusin / focusout.
        doc.addEventListener('focusin', function(e) {
            var c = resolveControl(e.target);
            if (c && c.formContainer && statesActive(c.input)) NDS.State.add(c.formContainer, 'focus');
        });
        doc.addEventListener('focusout', function(e) {
            var c = resolveControl(e.target);
            if (!c) return;
            var input = c.input, formControl = c.formControl, formContainer = c.formContainer;
            if (formContainer && statesActive(input)) {
                NDS.State.remove(formContainer, 'focus');
                NDS.State.remove(formContainer, 'typing');
            }
            // Clamp number input value to min/max on blur
            if (formControl.querySelector('.nds-number-increment, .nds-number-decrement')) {
                var val = parseInt(input.value);
                if (isNaN(val)) { input.value = ''; }
                else {
                    var rangeError = Utils.validateNumberRange(input);
                    if (rangeError) {
                        input.value = rangeError.clamped;
                        StatusManager.set({ element: formContainer, status: 'error', message: rangeError.message });
                    }
                }
            }
            // Only validate on blur if the field already has an error (to clear it when fixed)
            var hasError = formContainer && NDS.Status.get(formContainer) === 'error';
            if (statesActive(input)) FieldSync.update(input, formControl, !hasError);
        });

        // Typing state - indicates real user input
        doc.addEventListener('keydown', function(e) {
            var c = resolveControl(e.target);
            if (c && c.formContainer && statesActive(c.input)) NDS.State.add(c.formContainer, 'typing');
        });
        // The browser ignores readOnly on a checkbox or a radio, and the readonly CSS blocks only
        // the pointer: cancel the click that Space or an arrow key sends, so the value stays.
        doc.addEventListener('click', function(e) {
            var t = e.target;
            if (t.readOnly && (t.type === 'checkbox' || t.type === 'radio')) e.preventDefault();
        }, true);
        doc.addEventListener('paste', function(e) {
            var c = resolveControl(e.target);
            if (c && c.formContainer) NDS.State.add(c.formContainer, 'typing');
        });

        // Numeric-only enforcement for inputmode="numeric"
        doc.addEventListener('beforeinput', function(e) {
            var c = resolveControl(e.target);
            if (c && c.input.getAttribute('inputmode') === 'numeric' && e.data && /\D/.test(e.data)) e.preventDefault();
        });

        // Strip Arabic characters from password fields. Capture phase: runs before the field's own
        // input listeners, so Password never counts a stripped letter as a symbol.
        doc.addEventListener('input', function(e) {
            var c = resolveControl(e.target);
            if (!c || (c.input.type !== 'password' && c.input.dataset.type !== 'password')) return;
            var input = c.input;
            var cleaned = input.value.replace(/[\u0600-\u06FF]/g, '');
            if (cleaned === input.value) return;
            input.value = cleaned;
            e._ndsArabicStripped = true;
            var fc = c.formControl.closest('.nds-form-container');
            if (fc) {
                var msg = strings.t('no_arabic');
                StatusManager.set({ element: fc, status: 'error', message: msg });
            }
        }, true);

        // Input changes - clear errors but don't validate while typing
        doc.addEventListener('input', function(e) {
            var c = resolveControl(e.target);
            // A stripped letter keeps its error message up.
            if (!c || e._ndsArabicStripped) return;
            var input = c.input, formControl = c.formControl;

            // .nds-phone — local-format phone input paired with a separate
            // country-code prefix:
            //   1. allow only digits — strips spaces/dashes/+ from paste
            //   2. strip leading zero(s) — the local-format leading 0 is
            //      redundant when the country code is already prepended
            // The browser enforces any maxlength on the input itself.
            if (input.classList.contains('nds-phone')) {
                var caret = input.selectionStart;
                var original = input.value;
                var stripped = original.replace(/\D/g, '').replace(/^0+/, '');
                if (stripped !== original) {
                    var diff = original.length - stripped.length;
                    input.value = stripped;
                    try {
                        input.setSelectionRange(Math.max(0, caret - diff), Math.max(0, caret - diff));
                    } catch (_) {}
                }
            }

            stampIdentifier(input);

            FieldSync.update(input, formControl, true);

            var formContainer = formControl.closest('.nds-form-container');
            if (formContainer && NDS.Status.get(formContainer) !== '') {
                StatusManager.clear(formContainer);
            }

            // Auto-clear group-level status on input (skip groups with own validation)
            var formGroup = formControl.closest('.nds-form-group');
            if (formGroup && NDS.Status.get(formGroup) !== ''
                && !formGroup.hasAttribute('data-min-checked')
                && !formGroup.hasAttribute('data-max-checked')
                && !formGroup.hasAttribute('data-required')) {
                StatusManager.clear(formGroup);
            }
        });

        // Change event - update state only, validate on submit
        doc.addEventListener('change', function(e) {
            var c = resolveControl(e.target);
            if (!c) return;
            var input = c.input, formControl = c.formControl, formContainer = c.formContainer;
            var hasError = formContainer && NDS.Status.get(formContainer) === 'error';
            FieldSync.update(input, formControl, !hasError);
            FieldSync.updateRadioGroup(input);
            // Auto-clear indeterminate on user interaction
            if (input.type === 'checkbox' && !input.indeterminate) {
                FieldSync.setIndeterminate(input, false);
            }
        });

        // A rating group has no input to fire `input`, so its own event stands in
        // for the auto-clear above. Submit re-runs the rule, so clearing here is
        // only about dropping a stale message.
        doc.addEventListener('nds:rating:change', function(e) {
            var group = e.target.closest && e.target.closest('.nds-form-group');
            if (group && NDS.Status.get(group) !== '') StatusManager.clear(group);
        });
        // A pick answers "add a file"; a finished upload answers "wait".
        ['nds:upload:selected', 'nds:upload:success', 'nds:upload:error'].forEach(function(name) {
            doc.addEventListener(name, function(e) {
                if (NDS.Status.get(e.target) !== '') StatusManager.clear(e.target);
            });
        });
    }

    // ==============================================
    // FORM CONTROLS INITIALIZATION
    // ==============================================
    var FormControls = {
        initializeInput: function(input, formControl) {
            if (input._ndsInitialized) return;
            input._ndsInitialized = true;

            // Remember original type for password fields
            if (input.type === 'password') input.dataset.type = 'password';

            // Auto-add required and aria-required if container has data-required attribute.
            // Taginput's typing field isn't the carrier — never stamp `required` on it
            // (would false-fail checkValidity even when tags exist); aria-required still
            // announces requiredness on the interactive input.
            var formContainer = formControl.closest('.nds-form-container');
            if (formContainer && (formContainer.hasAttribute('data-required') || formContainer.classList.contains('nds-required'))) {
                if (!formContainer.matches(NO_REQUIRED_STAMP) && !input.hasAttribute('required')) {
                    input.setAttribute('required', '');
                }
                input.setAttribute('aria-required', 'true');
            }

            // Generic input listeners (active/focus/typing, sanitize,
            // validation) are wired once at the document level — see
            // installFormDelegation(). Only the initial sync + specialized
            // control dispatch is per-element.
            this._syncInitialState(input, formControl, formContainer);
        },

        // Two-way initial sync + specialized control dispatch.
        _syncInitialState: function(input, formControl, formContainer) {
            // Container → input: propagate pre-existing data-state
            if (formContainer) {
                NDS.State.apply(formContainer, 'disabled', 'readonly', 'loading');
            }
            // Input → container: sync current input state to data-state
            FieldSync.update(input, formControl, true);

            // Initialize specialized controls
            if (input.tagName.toLowerCase() === 'select') {
                this.initSelectDropdown(input, formControl);
            }
            // Custom selects (.nds-select-input) and date inputs (.nds-date-input)
            // are wired by their own loader-driven components (NDS.CustomSelect,
            // NDS.DatePicker) — forms no longer reaches into them.
        },

        initSelectDropdown: function(selectElement, formControl) {
            var formContainer = formControl.closest('.nds-form-container') || formControl;

            selectElement.addEventListener('mousedown', function() {
                NDS.State.has(formContainer, 'open')
                    ? NDS.State.remove(formContainer, 'open')
                    : NDS.State.add(formContainer, 'open');
            });

            selectElement.addEventListener('keydown', function(e) {
                var openKeys = ['ArrowDown', 'ArrowUp', 'Enter', ' '];
                var closeKeys = ['Escape', 'Tab'];

                if (openKeys.includes(e.key) && !NDS.State.has(formContainer, 'open')) {
                    NDS.State.add(formContainer, 'open');
                } else if (closeKeys.includes(e.key)) {
                    NDS.State.remove(formContainer, 'open');
                }
            });

            ['blur', 'change'].forEach(function(event) {
                selectElement.addEventListener(event, function() {
                    NDS.State.remove(formContainer, 'open');
                });
            });
        },

        initPasswordToggle: function(formControl) {
            var passwordToggle = formControl.querySelector('.nds-form-action .nds-toggle-password');
            if (!passwordToggle || passwordToggle._ndsPasswordToggle) return;
            passwordToggle._ndsPasswordToggle = true;

            passwordToggle.addEventListener('click', function(e) {
                e.preventDefault();

                var passwordInput = formControl.querySelector(':scope > input[type="password"], :scope > input[type="text"]');
                if (!passwordInput) return;

                var isPassword = passwordInput.type === 'password';
                passwordInput.type = isPassword ? 'text' : 'password';
                passwordToggle.classList.toggle('show', isPassword);
                NDS.aria.label(passwordToggle, strings.t(isPassword ? 'hide_password' : 'show_password'));
            });
        },

        initSwitchControls: function(formControl) {
            var switchElements = formControl.querySelectorAll('.nds-switch');
            if (!switchElements.length) return;

            switchElements.forEach(function(switchElement) {
                var switchInput = switchElement.querySelector('.nds-switch-input');
                var switchTrack = switchElement.querySelector('.nds-switch-track');

                if (!switchInput || !switchTrack || switchTrack._switchInitialized) return;
                switchTrack._switchInitialized = true;

                var formContainer = formControl.closest('.nds-form-container');

                // Toggle + notify — shared by track-click, keyboard, and label-click.
                function toggleSwitch() {
                    if (switchInput.disabled || switchInput.readOnly || switchElement.classList.contains('disabled')) return;
                    switchInput.checked = !switchInput.checked;
                    Utils.triggerEvents(switchInput);
                    FieldSync.update(switchInput, formControl);
                    switchElement.dispatchEvent(new CustomEvent('nds:switchChange', {
                        detail: { checked: switchInput.checked, value: switchInput.value, input: switchInput },
                        bubbles: true
                    }));
                }

                switchTrack.addEventListener('mousedown', function() {
                    if (!switchInput.disabled && !switchElement.classList.contains('disabled')) {
                        if (formContainer) {
                            NDS.State.add(formContainer, 'active');
                        }
                    }
                });

                ['mouseup', 'mouseleave'].forEach(function(event) {
                    switchTrack.addEventListener(event, function() {
                        if (formContainer) {
                            NDS.State.remove(formContainer, 'active');
                        }
                    });
                });

                switchTrack.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleSwitch();
                });

                switchInput.addEventListener('keydown', function(e) {
                    if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        toggleSwitch();
                    }
                });

                var label = formControl.querySelector('label[for="' + switchInput.id + '"]');
                if (label && !switchElement.contains(label)) {
                    label.addEventListener('click', function(e) {
                        e.preventDefault();
                        toggleSwitch();
                    });
                }

                FieldSync.update(switchInput, formControl, true);
            });
        },

        initNumberInput: function(formControl) {
            var buttons = formControl.querySelectorAll('.nds-number-increment, .nds-number-decrement');
            if (!buttons.length) return;

            function stepValue(btn, multiplier) {
                var input = formControl.querySelector('input');
                if (!input || input.disabled || input.readOnly) return false;

                var current = parseInt(input.value) || 0;
                var min = input.hasAttribute('min') ? parseInt(input.min) : -Infinity;
                var max = input.hasAttribute('max') ? parseInt(input.max) : Infinity;
                var step = (parseInt(input.step) || 1) * (multiplier || 1);
                var next = btn.classList.contains('nds-number-increment') ? current + step : current - step;

                next = Math.max(min, Math.min(max, next));
                var formContainer = formControl.closest('.nds-form-container');
                if (next !== current) {
                    if (formContainer && NDS.Status.get(formContainer) === 'error') {
                        StatusManager.clear(formContainer);
                    }
                    input.value = next;
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                    return true;
                }
                if (formContainer && NDS.Status.get(formContainer) !== 'error') {
                    var isIncrement = btn.classList.contains('nds-number-increment');
                    var msg = isIncrement ? Validator.getNumberRangeMessage('max', max) : Validator.getNumberRangeMessage('min', min);
                    StatusManager.set({ element: formContainer, status: 'error', message: msg });
                }
                return false;
            }

            // Acceleration tiers: [duration held (ms), step multiplier, interval (ms)]
            var tiers = [
                [0,    1,  75],
                [1500, 10, 50]
            ];

            buttons.forEach(function(btn) {
                if (btn._ndsNumberInit) return;
                btn._ndsNumberInit = true;

                var holdTimer = null;
                var holdInterval = null;
                var tierTimers = [];

                btn.addEventListener('click', function() { stepValue(btn); });

                btn.addEventListener('pointerdown', function(e) {
                    if (e.button !== 0) return;
                    var currentMultiplier = tiers[0][1];
                    var currentSpeed = tiers[0][2];

                    holdTimer = setTimeout(function() {
                        holdInterval = setInterval(function() { stepValue(btn, currentMultiplier); }, currentSpeed);

                        // Schedule tier upgrades. let-scoped `tier` gives each
                        // iteration its own binding — no closure-capture IIFE.
                        for (let t = 1; t < tiers.length; t++) {
                            const tier = tiers[t];
                            tierTimers.push(setTimeout(function() {
                                currentMultiplier = tier[1];
                                clearInterval(holdInterval);
                                holdInterval = setInterval(function() { stepValue(btn, currentMultiplier); }, tier[2]);
                            }, tier[0]));
                        }
                    }, 400);
                });

                function stopHold() {
                    clearTimeout(holdTimer);
                    clearInterval(holdInterval);
                    tierTimers.forEach(clearTimeout);
                    holdTimer = null;
                    holdInterval = null;
                    tierTimers = [];
                }

                btn.addEventListener('pointerup', stopHold);
                btn.addEventListener('pointerleave', stopHold);
            });
        },

        initClearButton: function(formControl, inputElements) {
            var clearButton = formControl.querySelector('.nds-form-action .nds-clear');
            if (!clearButton) return;
            if (clearButton._ndsClearInit) return;
            clearButton._ndsClearInit = true;

            clearButton.addEventListener('click', function(e) {
                e.preventDefault();

                inputElements.forEach(function(input) {
                    // Hidden inputs are component-owned carriers (taginput
                    // tags, restore seeds) — clear resets the visible field,
                    // never the committed values.
                    if (input.type === 'hidden') return;
                    if (input.type === 'checkbox' || input.type === 'radio') {
                        input.checked = false;
                    } else {
                        input.value = '';
                    }
                    Utils.triggerEvents(input);
                    // Skip validation: clearing is an edit like typing, so it must
                    // not raise "required" on a field the user just emptied. The
                    // input event above already cleared any error being shown.
                    FieldSync.update(input, formControl, true);
                });

                // The clear button hides itself once the field is empty, which
                // would drop focus to <body>. Hand it back to the field so the
                // user can keep typing.
                for (var i = 0; i < inputElements.length; i++) {
                    if (inputElements[i].type === 'hidden' || inputElements[i].disabled) continue;
                    inputElements[i].focus();
                    break;
                }
            });
        }
    };

    // ==============================================
    // GROUP VALIDATION INITIALIZATION
    // ==============================================
    // Shared wiring for checkbox/radio group re-validation: once per group,
    // each input's change re-runs the group validator — but only when the
    // group opts into validation (predicate, re-checked per event so runtime
    // attribute changes are honored) AND already shows a status, so the first
    // interaction never validates prematurely.
    function _initGroupValidation(group, flagKey, inputSelector, shouldValidate, validate) {
        if (!group || group[flagKey]) return;
        group[flagKey] = true;

        group.querySelectorAll(inputSelector).forEach(function(input) {
            input.addEventListener('change', function() {
                if (shouldValidate(group) && NDS.Status.get(group) !== '') {
                    validate(group);
                }
            });
        });
    }

    function initCheckboxGroupValidation(group) {
        _initGroupValidation(group, '_checkGroupInitialized', 'input[type="checkbox"]',
            function(g) { return g.hasAttribute('data-min-checked') || g.hasAttribute('data-max-checked') || g.hasAttribute('data-required'); },
            Validator.validateCheckboxGroup.bind(Validator));
    }

    function initRadioGroupValidation(group) {
        _initGroupValidation(group, '_radioGroupInitialized', 'input[type="radio"]',
            function(g) { return g.hasAttribute('data-required') || g.classList.contains('nds-required'); },
            Validator.validateRadioGroup.bind(Validator));
    }

    // Multiselect re-validation listens to the component's commit event, not
    // checkbox `change` — chip removal and reset uncheck programmatically
    // without dispatching change, so per-input listeners would miss them.
    function initMultiselectValidation(ms) {
        if (!ms || ms._msValidationInitialized) return;
        ms._msValidationInitialized = true;

        ms.addEventListener('nds:multiselect:change', function() {
            var opted = ms.hasAttribute('data-required') || ms.classList.contains('nds-required')
                || ms.hasAttribute('data-min-checked') || ms.hasAttribute('data-max-checked');
            if (opted && NDS.Status.get(ms) !== '') Validator.validateMultiselect(ms);
        });
    }

    // ==============================================
    // GROUP STATE MANAGEMENT
    // ==============================================
    function initGroupState(group) {
        if (!group) return;

        // Groups (radio/checkbox/switch) validate as a whole, so we deliberately
        // do NOT propagate data-required to individual inputs — that would make
        // HTML5 validation flag each input separately.

        // Propagate initial data-state to inputs via hooks
        NDS.State.apply(group, 'disabled', 'readonly');
    }

    // ==============================================
    // FORM INITIALIZATION
    // ==============================================
    function initForm(formElement) {
        var form = formElement.closest('.nds-form') || formElement;
        // .nds-form is a validation hook, but consumers also use it as a
        // layout-only marker on non-form elements (e.g. wizard step divs).
        // Only real <form>s get novalidate + a submit listener.
        if (form.tagName !== 'FORM') return;
        if (form._ndsFormInitialized) return;
        form._ndsFormInitialized = true;
        form.setAttribute('novalidate', '');

        form.addEventListener('submit', function(e) {
            var result = Validator.validateForm(form, { showMessages: true, focusFirst: true });

            if (!result.valid) {
                e.preventDefault();
                e.stopPropagation();

                form.dispatchEvent(new CustomEvent('nds:formInvalid', {
                    detail: { invalidFields: result.invalidFields, errors: result.errors },
                    bubbles: true
                }));

                return false;
            }

            form.dispatchEvent(new CustomEvent('nds:formValid', {
                detail: {},
                bubbles: true
            }));

            if (form.hasAttribute('data-ajax')) {
                e.preventDefault();
            }
        });
    }

    // ==============================================
    // AUTO-FILL INITIALIZATION
    // ==============================================
    function initAutoFillContainer(container) {
        if (!container) return;

        var targetId = container.getAttribute('data-target');
        if (!targetId) return;

        // Opt-in: data-autofill-apply makes a chip click also submit the search
        // (simulates Enter on the target) instead of only filling the field.
        var applyOnFill = container.hasAttribute('data-autofill-apply');

        container.querySelectorAll('.nds-item').forEach(function(item) {
            if (item._autoFillHandler) {
                item.removeEventListener('click', item._autoFillHandler);
            }

            item._autoFillHandler = function(e) {
                e.preventDefault();
                e.stopPropagation();

                var itemText = item.textContent.trim().replace(/\s+/g, ' ');

                var targetInput = document.getElementById(targetId) ||
                    document.querySelector('[name="' + targetId + '"]') ||
                    document.querySelector('[data-name="' + targetId + '"]');

                if (targetInput && itemText) {
                    targetInput.value = itemText;
                    targetInput.focus();
                    Utils.triggerEvents(targetInput);

                    var formControl = targetInput.closest('.nds-form-control');
                    if (formControl) {
                        FieldSync.update(targetInput, formControl);
                    }

                    if (applyOnFill) {
                        targetInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
                    }
                }
            };

            item.addEventListener('click', item._autoFillHandler);
        });
    }

    // ==============================================
    // DYNAMIC CONTENT OBSERVER
    // ==============================================
    function initDynamicContentObserver() {
        if (NDS.Forms._dynamicObserver) return;

        NDS.onDOMAdd('.nds-form-control', function() { initFormControlClasses(); });
        NDS.onDOMAdd('.nds-auto-fill', function() { initInputAutoFill(); });
        NDS.Forms._dynamicObserver = true;
    }

    // ==============================================
    // CONTAINER INITIALIZATION
    // ==============================================
    function initializeContainer(container) {
        if (!container) return;

        // Initialize form controls
        var formControls = container.classList && container.classList.contains('nds-form-control')
            ? [container]
            : Array.from(container.querySelectorAll('.nds-form-control'));

        formControls.forEach(function(formControl) {
            if (formControl.closest('code')) return;

            // A slider's inputs sit in its track, one level down.
            var inputElements = formControl.querySelectorAll(':scope > input, :scope > textarea, :scope > select, :scope > .nds-slider-track > input');

            inputElements.forEach(function(input) {
                FormControls.initializeInput(input, formControl);
                stampIdentifier(input);
            });

            FormControls.initPasswordToggle(formControl);
            FormControls.initNumberInput(formControl);
            FormControls.initClearButton(formControl, inputElements);
            FormControls.initSwitchControls(formControl);
        });

        // Initialize auto-fill containers
        var autoFillContainers = container.classList && container.classList.contains('nds-auto-fill')
            ? [container]
            : Array.from(container.querySelectorAll('.nds-auto-fill'));

        autoFillContainers.forEach(initAutoFillContainer);

        // Initialize form groups
        container.querySelectorAll('.nds-form-group').forEach(function(group) {
            initGroupState(group);
            if (group.querySelector('input[type="checkbox"]')) initCheckboxGroupValidation(group);
            if (group.querySelector('input[type="radio"]')) initRadioGroupValidation(group);
        });

        container.querySelectorAll('.nds-multiselect').forEach(initMultiselectValidation);

        // Initialize forms
        var forms = container.classList && container.classList.contains('nds-form')
            ? [container]
            : Array.from(container.querySelectorAll('.nds-form'));

        forms.forEach(initForm);

        // Restore autofocus — browser native autofocus may be lost during init.
        // preventScroll: a plain focus() scrolls the element into view, which
        // forces a synchronous layout in the middle of the component-init burst.
        var autofocusEl = container.querySelector('input[autofocus], textarea[autofocus], select[autofocus]');
        if (autofocusEl) {
            autofocusEl.focus({ preventScroll: true });
            var fc = autofocusEl.closest('.nds-form-container');
            if (fc) NDS.State.add(fc, 'focus');
        }

        // Reveal [hidden] FOUC-guard wrappers now their controls carry state.
        container.querySelectorAll(
            '.nds-form-group[hidden], .nds-form-container[hidden], .nds-form-action[hidden]'
        ).forEach(function(el) { el.removeAttribute('hidden'); });
    }

    // ==============================================
    // MAIN INITIALIZATION
    // ==============================================
    function initFormControlClasses() {
        initializeContainer(document.body);
    }

    function initInputAutoFill() {
        document.querySelectorAll('.nds-auto-fill[data-target]').forEach(initAutoFillContainer);
    }

    function initializeAllForms() {
        // initFormControlClasses() -> initializeContainer(document.body) already
        // sweeps .nds-auto-fill, so a separate initInputAutoFill() pass here would
        // re-init every auto-fill container at startup. The standalone pass stays
        // wired to the dynamic-content observer (initDynamicContentObserver) for
        // .nds-auto-fill nodes added after load.
        strings.load();
        installFormDelegation();
        initFormControlClasses();
        initDynamicContentObserver();
    }

    // ==============================================
    // PUBLIC API
    // ==============================================
    NDS.Forms = {
        // Core initialization
        init: initializeAllForms,
        initializeContainer: initializeContainer,

        // Status Management API
        setStatus: StatusManager.set.bind(StatusManager),
        clearStatus: StatusManager.clear.bind(StatusManager),
        getStatus: StatusManager.get.bind(StatusManager),

        // State Management
        setState: function(element, stateName, add) {
            var container = element.closest('.nds-form-container') || element.closest('.nds-form-group') || element;
            add = add !== false;
            if (stateName === 'required') {
                if (add) container.setAttribute('data-required', '');
                else container.removeAttribute('data-required');
                // Propagate to inputs, skip radios (always in groups, validated at group level)
                if (!container.matches(NO_REQUIRED_STAMP)) container.querySelectorAll('input, textarea, select').forEach(function(input) {
                    if (input.type !== 'radio') input.required = add;
                });
            } else {
                add ? NDS.State.add(container, stateName) : NDS.State.remove(container, stateName);
            }
        },

        // Re-sync a form-control's chrome (clear button, validation, radio-group
        // paint) after its value/checked is set programmatically. Call this — or
        // dispatch an input/change event — when changing a field's value from JS;
        // raw assignment alone no longer notifies the field. Dispatches nothing
        // itself, so it can't re-enter a caller's own input handler. No-op outside
        // a form-control.
        syncState: function(input) {
            if (!input || !input.closest) return;
            var formControl = input.closest('.nds-form-control');
            if (!formControl) return;
            FieldSync.update(input, formControl, true);
            if (input.type === 'radio' && input.checked) FieldSync.updateRadioGroup(input);
        },

        // Checkbox Indeterminate State
        setIndeterminate: FieldSync.setIndeterminate.bind(FieldSync),

        // Checkbox Group Validation
        validateCheckboxGroup: Validator.validateCheckboxGroup.bind(Validator),
        initCheckboxGroupValidation: initCheckboxGroupValidation,

        // Radio Group Validation
        validateRadioGroup: Validator.validateRadioGroup.bind(Validator),
        initRadioGroupValidation: initRadioGroupValidation,

        // Multiselect Validation
        validateMultiselect: Validator.validateMultiselect.bind(Validator),
        initMultiselectValidation: initMultiselectValidation,

        // Taginput Validation
        validateTaginput: Validator.validateTaginput.bind(Validator),

        // OTP Group Validation
        validateOtpGroup: Validator.validateOtpGroup.bind(Validator),

        // Form Validation
        validateForm: Validator.validateForm.bind(Validator),
        initForm: initForm,

        // Identifier checks (the .nds-national-id / .nds-iban rules, for your own code)
        isNationalId: isNationalId,
        isIban: isIban
    };

})();
