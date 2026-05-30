// NDS Forms Controller - Form Control Logic
// File: nds-forms.js
// Optimized and simplified version

(function () {
    'use strict';

    // ==============================================
    // STATE PROPAGATION HOOKS
    // ==============================================

    var FORM_SCOPE = '.nds-form-container, .nds-form-group';

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

    NDS.State.onAdd('loading', FORM_SCOPE, function(el) {
        var fc = el.classList.contains('nds-form-control') ? el : el.querySelector('.nds-form-control');
        if (!fc) return;
        var clearBtn = fc.querySelector('.nds-form-action .nds-clear');
        if (clearBtn) {
            clearBtn.removeAttribute('hidden');
            NDS.State.add(clearBtn, 'loading');
        }
    });

    NDS.State.onRemove('loading', FORM_SCOPE, function(el) {
        var fc = el.classList.contains('nds-form-control') ? el : el.querySelector('.nds-form-control');
        if (!fc) return;
        var clearBtn = fc.querySelector('.nds-form-action .nds-clear');
        if (clearBtn) NDS.State.remove(clearBtn, 'loading');
    });

    // ==============================================
    // CONSTANTS
    // ==============================================
    var StatusTypes = {
        DEFAULT: '',
        ERROR: 'error',
        SUCCESS: 'success',
        WARNING: 'warning',
        INFO: 'info'
    };


    // ==============================================
    // UTILITY FUNCTIONS
    // ==============================================
    var Utils = {
        validateNumberRange: function(input) {
            var val = parseInt(input.value);
            if (input.value === '' || isNaN(val)) return null;
            var min = input.hasAttribute('min') ? parseInt(input.min) : 0;
            var max = input.hasAttribute('max') ? parseInt(input.max) : val;
            if (val < min) return { clamped: min, message: Validator.getNumberRangeMessage('min', min) };
            if (val > max) return { clamped: max, message: Validator.getNumberRangeMessage('max', max) };
            return null;
        },

        triggerEvents: function(element) {
            element.dispatchEvent(new Event('input', { bubbles: true }));
            element.dispatchEvent(new Event('change', { bubbles: true }));
        },
    };

    // ==============================================
    // STATUS MANAGEMENT API
    // ==============================================
    var StatusManager = {
        set: function(options) {
            var element = options.element;
            var status = options.status;
            var message = options.message;

            if (!element) return false;

            var container = this._findContainer(element);
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

            if (status) {
                // Set status on container
                NDS.Status.set(container, status);
                if (message) {
                    container.setAttribute('data-message', message);
                }

                // Create feedback using NDSFeedback API
                if (message) {
                    // Dynamic target selection using data-feedback-target attribute
                    var targetSelector = container.getAttribute('data-feedback-target');
                    var target = container;

                    if (targetSelector) {
                        var foundTarget = container.querySelector(targetSelector);
                        if (foundTarget) {
                            target = foundTarget;
                        }
                    } else {
                        var markedTarget = container.querySelector('[data-feedback-target]');
                        if (markedTarget) {
                            target = markedTarget;
                        }
                    }

                    var defaults = {
                        position: 'append',
                        size: 'sm',
                        style: 'outline'
                    };
                    var feedbackOptions = Object.assign({}, defaults, options, {
                        target: target
                    });
                    delete feedbackOptions.element;
                    NDS.Feedback.create(feedbackOptions);
                }

                // Accessibility
                var input = container.querySelector('input, textarea, select');
                if (input) {
                    input.setAttribute('aria-invalid', status === 'error' ? 'true' : 'false');
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
                // For standalone feedback, just remove data attributes
                NDS.Status.clear(element);
                return true;
            }

            var container = this._findContainer(element);
            if (!container) return false;

            // Remove status attributes
            NDS.Status.clear(container);
            container.removeAttribute('data-message');

            // Dismiss all feedback in container using NDSFeedback API
            NDS.Feedback.dismissAll(container);

            // Clear accessibility
            var input = container.querySelector('input, textarea, select');
            if (input) {
                input.removeAttribute('aria-invalid');
            }

            container.dispatchEvent(new CustomEvent('nds:statusChange', {
                detail: { status: null, message: null },
                bubbles: true
            }));

            return true;
        },

        get: function(element) {
            if (!element) return { status: '', message: '', isValid: true };

            var container = this._findContainer(element);
            var status = NDS.Status.get(container);
            return {
                status: status,
                message: container.getAttribute('data-message') || '',
                isValid: status !== 'error'
            };
        },

        _findContainer: function(element) {
            var selectors = '.nds-form-container, .nds-form-group, .nds-feedback';
            return (element.matches && element.matches(selectors))
                ? element
                : element.closest(selectors);
        }
    };

    // ==============================================
    // VALIDATION MODULE
    // ==============================================
    var Validator = {
        getMessage: function(input) {
            if (input.hasAttribute('data-error-message')) {
                return input.getAttribute('data-error-message');
            }

            var validity = input.validity;
            var isArabic = NDS.isArabic;

            if (validity.valueMissing) {
                return isArabic ? 'هذا الحقل مطلوب' : 'This field is required';
            } else if (validity.typeMismatch) {
                if (input.type === 'email') {
                    return isArabic ? 'يرجى إدخال عنوان بريد إلكتروني صحيح' : 'Please enter a valid email address';
                } else if (input.type === 'url') {
                    return isArabic ? 'يرجى إدخال رابط صحيح' : 'Please enter a valid URL';
                }
            } else if (validity.tooShort) {
                return isArabic
                    ? 'المدخل قصير جداً (الحد الأدنى ' + input.minLength + ')'
                    : 'Input is too short (minimum ' + input.minLength + ' characters)';
            } else if (validity.tooLong) {
                return isArabic
                    ? 'المدخل طويل جداً (الحد الأقصى ' + input.maxLength + ')'
                    : 'Input is too long (maximum ' + input.maxLength + ' characters)';
            } else if (validity.rangeUnderflow) {
                return isArabic
                    ? 'القيمة يجب أن تكون على الأقل ' + input.min
                    : 'Value must be at least ' + input.min;
            } else if (validity.rangeOverflow) {
                return isArabic
                    ? 'القيمة يجب ألا تزيد عن ' + input.max
                    : 'Value must be no more than ' + input.max;
            } else if (validity.patternMismatch) {
                return isArabic ? 'يرجى مطابقة التنسيق المطلوب' : 'Please match the requested format';
            }

            return isArabic ? 'مدخل غير صحيح' : 'Invalid input';
        },

        getNumberRangeMessage: function(type, value) {
            var isArabic = NDS.isArabic;
            if (type === 'min') return isArabic ? 'الحد الأدنى ' + value : 'Minimum value is ' + value;
            return isArabic ? 'الحد الأقصى ' + value : 'Maximum value is ' + value;
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

        validateCheckboxGroup: function(groupElement, options) {
            options = options || { showMessage: true };

            var group = groupElement.closest('.nds-form-group') || groupElement;
            var checkboxes = group.querySelectorAll('input[type="checkbox"]');
            var checkedCount = Array.from(checkboxes).filter(function(cb) { return cb.checked; }).length;

            // If data-required is set without data-min-checked, require at least 1
            var hasDataRequired = group.hasAttribute('data-required');
            var defaultMin = hasDataRequired ? 1 : 0;
            var minChecked = parseInt(group.getAttribute('data-min-checked') || defaultMin, 10);
            var maxChecked = parseInt(group.getAttribute('data-max-checked') || checkboxes.length, 10);

            var isValid = checkedCount >= minChecked && checkedCount <= maxChecked;
            var message = '';
            var isArabic = NDS.isArabic;

            if (!isValid) {
                if (checkedCount < minChecked) {
                    message = isArabic
                        ? 'يرجى اختيار ' + minChecked + ' خيارات على الأقل'
                        : 'Please select at least ' + minChecked + ' option(s)';
                } else {
                    message = isArabic
                        ? 'يرجى اختيار ' + maxChecked + ' خيارات كحد أقصى'
                        : 'Please select no more than ' + maxChecked + ' option(s)';
                }
            }

            return this._finishGroupValidation(group, options, isValid, message, { checked: checkedCount, min: minChecked, max: maxChecked });
        },

        validateRadioGroup: function(groupElement, options) {
            options = options || { showMessage: true };

            var group = groupElement.closest('.nds-form-group') || groupElement;
            var radios = group.querySelectorAll('input[type="radio"]');
            var isSelected = Array.from(radios).some(function(r) { return r.checked; });

            var isRequired = group.hasAttribute('data-required') || group.classList.contains('nds-required');
            var isValid = !isRequired || isSelected;
            var message = '';
            var isArabic = NDS.isArabic;

            if (!isValid) {
                message = isArabic ? 'يرجى اختيار خيار واحد' : 'Please select an option';
            }

            return this._finishGroupValidation(group, options, isValid, message, { selected: isSelected });
        },

        validateOtpGroup: function(groupElement, options) {
            options = options || { showMessage: true };

            var group = groupElement.closest('.nds-form-group') || groupElement;
            var inputs = Array.from(group.querySelectorAll('.nds-otp-container input'));
            var isAllFilled = inputs.length > 0 && inputs.every(function(i) { return i.value.length === 1; });

            var isValid = isAllFilled;
            var message = '';
            var isArabic = NDS.isArabic;

            if (!isValid) {
                message = isArabic ? 'يرجى إدخال جميع الأرقام' : 'Please enter all ' + inputs.length + ' digits';
            }

            return this._finishGroupValidation(group, options, isValid, message, { filled: isAllFilled });
        },

        validateForm: function(formElement, options) {
            options = options || { showMessages: true, focusFirst: true };

            var form = formElement.closest('.nds-form') || formElement;
            if (!form) return { valid: true, invalidFields: [], errors: [] };

            var invalidFields = [];
            var errors = [];
            var firstInvalidInput = null;

            // Helper function to check if an element is visible
            function isVisible(element) {
                if (!element) return false;
                // Check for hidden attribute on the element or any parent
                var current = element;
                while (current && current !== form) {
                    if (current.hasAttribute('hidden') || current.hidden) {
                        return false;
                    }
                    // Check computed style for display: none
                    var style = window.getComputedStyle(current);
                    if (style.display === 'none') {
                        return false;
                    }
                    current = current.parentElement;
                }
                return true;
            }

            // Validate form containers
            form.querySelectorAll('.nds-form-container').forEach(function(container) {
                // Skip hidden containers
                if (!isVisible(container)) return;

                // Skip containers validated at group level (OTP, radio, checkbox)
                if (container.classList.contains('nds-otp-container')) return;
                if (container.closest('.nds-form-group')) return;

                var input = container.querySelector('input, textarea, select');
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
                    invalidFields.push(container);
                    var msg = numberMsg || Validator.getMessage(input);
                    errors.push({
                        field: container,
                        input: input,
                        message: msg
                    });

                    if (!firstInvalidInput) firstInvalidInput = input;
                    if (options.showMessages) {
                        StatusManager.set({ element: container, status: 'error', message: msg });
                    }
                }
            });

            // Validate form groups (checkbox, radio)
            form.querySelectorAll('.nds-form-group[data-min-checked], .nds-form-group[data-max-checked], .nds-form-group[data-required], .nds-form-group.nds-required').forEach(function(group) {
                // Skip hidden groups
                if (!isVisible(group)) return;

                var hasCheckboxes = group.querySelector('input[type="checkbox"]');
                var hasRadios = group.querySelector('input[type="radio"]');

                if (group.classList.contains('nds-otp-group')) {
                    var result = Validator.validateOtpGroup(group, { showMessage: options.showMessages });
                    if (!result.valid) {
                        invalidFields.push(group);
                        var otpFirst = group.querySelector('.nds-otp-container input');
                        errors.push({ field: group, input: otpFirst, message: result.message });
                        if (!firstInvalidInput) firstInvalidInput = otpFirst;
                    }
                } else if (hasCheckboxes) {
                    var result = Validator.validateCheckboxGroup(group, { showMessage: options.showMessages });
                    if (!result.valid) {
                        invalidFields.push(group);
                        errors.push({ field: group, input: hasCheckboxes, message: result.message });
                        if (!firstInvalidInput) firstInvalidInput = hasCheckboxes;
                    }
                } else if (hasRadios) {
                    var result = Validator.validateRadioGroup(group, { showMessage: options.showMessages });
                    if (!result.valid) {
                        invalidFields.push(group);
                        errors.push({ field: group, input: hasRadios, message: result.message });
                        if (!firstInvalidInput) firstInvalidInput = hasRadios;
                    }
                }
            });

            if (options.focusFirst && firstInvalidInput) {
                firstInvalidInput.focus();
            }

            var isFormValid = invalidFields.length === 0;

            form.dispatchEvent(new CustomEvent('nds:formValidate', {
                detail: { valid: isFormValid, invalidFields: invalidFields, errors: errors },
                bubbles: true
            }));

            return {
                valid: isFormValid,
                invalidFields: invalidFields,
                errors: errors
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
                // Skip required propagation for radios/checkboxes — managed at group level
                if (input.type !== 'radio' && input.type !== 'checkbox') {
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

            // Validate
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
    // FORM CONTROLS INITIALIZATION
    // ==============================================
    var FormControls = {
        initializeInput: function(input, formControl) {
            if (input._ndsInitialized) return;
            input._ndsInitialized = true;

            // Remember original type for password fields
            if (input.type === 'password') input.dataset.type = 'password';

            // Auto-add required and aria-required if container has data-required attribute
            var formContainer = formControl.closest('.nds-form-container');
            if (formContainer && (formContainer.hasAttribute('data-required') || formContainer.classList.contains('nds-required'))) {
                if (!input.hasAttribute('required')) input.setAttribute('required', '');
                input.setAttribute('aria-required', 'true');
            }

            this._bindInteractionState(input, formControl, formContainer);
            this._bindInputProcessing(input, formControl, formContainer);
            this._syncInitialState(input, formControl, formContainer);
        },

        // data-state interaction machine (active/focus/typing) + blur-time
        // number clamp. statesActive() lives here because only these listeners
        // consult it.
        _bindInteractionState: function(input, formControl, formContainer) {
            // The select-input is `readonly` to prevent typing, but the field
            // is still interactive — clicking opens the dropdown. Treat it
            // as not-readonly for state-visualization purposes so it picks
            // up active/focus/filled like any other input.
            function statesActive() {
                return !input.readOnly || input.classList.contains('nds-select-input');
            }

            // Mouse interaction - use data-state on container
            input.addEventListener('mousedown', function() {
                if (formContainer && statesActive()) {
                    NDS.State.add(formContainer, 'active');
                }
            });

            ['mouseup', 'mouseleave'].forEach(function(event) {
                input.addEventListener(event, function() {
                    if (formContainer && statesActive()) {
                        NDS.State.remove(formContainer, 'active');
                    }
                });
            });

            // Focus states - use data-state on container
            input.addEventListener('focus', function() {
                if (formContainer && statesActive()) {
                    NDS.State.add(formContainer, 'focus');
                }
            });

            input.addEventListener('blur', function() {
                if (formContainer && statesActive()) {
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

                // Only validate on blur if field already has an error (to clear it when fixed)
                var hasError = formContainer && NDS.Status.get(formContainer) === 'error';
                if (statesActive()) FieldSync.update(input, formControl, !hasError);
            });

            // Typing state - indicates real user input
            input.addEventListener('keydown', function() {
                if (formContainer && statesActive()) {
                    NDS.State.add(formContainer, 'typing');
                }
            });

            input.addEventListener('paste', function() {
                if (formContainer) {
                    NDS.State.add(formContainer, 'typing');
                }
            });
        },

        // Value-processing listeners: numeric-only guard, input sanitize +
        // error-clear, and the change handler.
        _bindInputProcessing: function(input, formControl, formContainer) {
            // Numeric-only enforcement for inputmode="numeric"
            if (input.getAttribute('inputmode') === 'numeric') {
                input.addEventListener('beforeinput', function(e) {
                    if (e.data && /\D/.test(e.data)) e.preventDefault();
                });
            }

            // Input changes - clear errors but don't validate while typing
            input.addEventListener('input', function() {
                // Strip Arabic characters from password fields
                if (input.type === 'password' || input.dataset.type === 'password') {
                    var cleaned = input.value.replace(/[\u0600-\u06FF]/g, '');
                    if (cleaned !== input.value) {
                        input.value = cleaned;
                        var fc = formControl.closest('.nds-form-container');
                        if (fc) {
                            var msg = NDS.isArabic ? 'الأحرف العربية غير مسموح بها' : 'Arabic characters are not allowed';
                            StatusManager.set({ element: fc, status: 'error', message: msg });
                        }
                        return;
                    }
                }

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
            input.addEventListener('change', function() {
                var hasError = formContainer && NDS.Status.get(formContainer) === 'error';
                FieldSync.update(input, formControl, !hasError);
                FieldSync.updateRadioGroup(input);

                // Auto-clear indeterminate on user interaction
                if (input.type === 'checkbox' && !input.indeterminate) {
                    FieldSync.setIndeterminate(input, false);
                }
            });
        },

        // Two-way initial sync + specialized control dispatch.
        _syncInitialState: function(input, formControl, formContainer) {
            // Initialize state - two-way sync
            // Container → input: propagate data-required and pre-existing data-state
            if (formContainer) {
                if (formContainer.hasAttribute('data-required') && input.type !== 'radio') {
                    input.required = true;
                }
                NDS.State.apply(formContainer, 'disabled', 'readonly');
            }
            // Input → container: sync current input state to data-state
            FieldSync.update(input, formControl, true);

            // Initialize specialized controls
            if (input.tagName.toLowerCase() === 'select') {
                this.initSelectDropdown(input, formControl);
            }
            if (input.classList.contains('nds-select-input')) {
                this.initCustomSelectDropdown(input, formControl);
            }
            // Date inputs are wired by NDS.DatePicker's own loader-driven sweep
            // (selector .nds-date-input) — forms no longer reaches into it.
        },

        initSelectDropdown: function(selectElement, formControl) {
            var isOpen = false;
            var formContainer = formControl.closest('.nds-form-container') || formControl;

            function updateOpenState() {
                isOpen ? NDS.State.add(formContainer, 'open') : NDS.State.remove(formContainer, 'open');
            }

            selectElement.addEventListener('mousedown', function() {
                isOpen = !isOpen;
                updateOpenState();
            });

            selectElement.addEventListener('keydown', function(e) {
                var openKeys = ['ArrowDown', 'ArrowUp', 'Enter', ' '];
                var closeKeys = ['Escape', 'Tab'];

                if (openKeys.includes(e.key) && !isOpen) {
                    isOpen = true;
                    updateOpenState();
                } else if (closeKeys.includes(e.key)) {
                    isOpen = false;
                    updateOpenState();
                }
            });

            ['blur', 'change'].forEach(function(event) {
                selectElement.addEventListener(event, function() {
                    isOpen = false;
                    updateOpenState();
                });
            });
        },

        initCustomSelectDropdown: function(selectInput, formControl) {
            var dropdown = formControl.querySelector('.nds-select-dropdown');
            var hiddenInput = formControl.querySelector('.nds-select-value');
            var options = formControl.querySelectorAll('.nds-select-option');

            if (!dropdown || !options.length) return;

            // Augment the existing markup with NDS.Dropmenu hooks so we
            // inherit positioning (placeFixed + portal), animation,
            // outside-click, and keyboard nav from the dropmenu component
            // — same approach as nds-autocomplete. Author markup is
            // unchanged; the legacy `nds-select-*` classes stay alongside.
            formControl.classList.add('nds-dropmenu');
            // Skip dropmenu's own click-to-toggle on the trigger; the
            // <input> already drives toggle via its own listeners below.
            formControl.setAttribute('data-dropmenu-no-click', '');
            // Mark the input as the dropmenu trigger so focus restoration
            // on close (Escape, Tab past last item) lands back on the
            // focusable input rather than the form-control <div>.
            selectInput.classList.add('nds-dropmenu-trigger');
            // role="combobox" so the aria-expanded / aria-haspopup the
            // dropmenu stamps on the trigger are valid here — an <input>'s
            // default textbox role allows neither.
            selectInput.setAttribute('role', 'combobox');
            dropdown.classList.add('nds-dropmenu-menu');
            // The dropdown is shown/hidden via dropmenu's data-state, not
            // the `hidden` attribute, so strip it.
            dropdown.removeAttribute('hidden');

            // Inner scroll wrapper — dropmenu's `.nds-dropmenu-scroll`
            // styles handle max-height + overscroll-behavior.
            var optionsContainer = dropdown.querySelector('.nds-select-options');
            if (optionsContainer) optionsContainer.classList.add('nds-dropmenu-scroll');

            // Item class so dropmenu's keyboard nav + auto-close-on-click
            // pick the buttons up.
            options.forEach(function(option) {
                option.classList.add('nds-dropmenu-item');
            });

            var dropmenuInstance = NDS.Dropmenu.create(formControl);
            var formContainer = formControl.closest('.nds-form-container') || formControl;
            var selectedValue = '';

            function updateSelectedOptions() {
                options.forEach(function(option) {
                    if (option.dataset.value === selectedValue) {
                        NDS.State.add(option, 'selected');
                    } else {
                        NDS.State.remove(option, 'selected');
                    }
                });
            }

            function selectValue(value, text) {
                selectedValue = value;
                selectInput.value = text;
                if (hiddenInput) hiddenInput.value = value;
                updateSelectedOptions();

                Utils.triggerEvents(selectInput);
                if (hiddenInput) Utils.triggerEvents(hiddenInput);

                FieldSync.update(selectInput, formControl);

                formControl.dispatchEvent(new CustomEvent('selectChange', {
                    detail: { value: value, text: text }
                }));
            }

            // Mirror dropmenu open/close onto the form-container so the
            // arrow rotation rule and any consumer styling that hooks
            // `[data-state~="open"]` on `.nds-form-container` keeps working.
            formControl.addEventListener('nds:dropmenu:opened', function() {
                NDS.State.add(formContainer, 'open');
                updateSelectedOptions();
                if (options[0]) options[0].focus();
            });
            formControl.addEventListener('nds:dropmenu:closed', function() {
                NDS.State.remove(formContainer, 'open');
            });

            // Match the dropdown's min-width to the form-control before
            // opening — same approach autocomplete uses. Without this the
            // fixed-positioned menu sizes to its content rather than the
            // input it anchors to. Sync on focus so any subsequent open
            // path (mouse click via our handler, or keyboard via
            // dropmenu's own handleTriggerKeydown) uses the right width.
            function syncWidth() {
                dropdown.style.minWidth = formControl.offsetWidth + 'px';
            }
            selectInput.addEventListener('focus', syncWidth);

            // Click → toggle. Dropmenu's own click-to-toggle is disabled
            // via data-dropmenu-no-click, so this is the only click path.
            // syncWidth is redundant here for users who clicked (focus
            // fires first), but covers programmatic / direct-click cases
            // where focus might not have settled yet.
            selectInput.addEventListener('click', function(e) {
                if (selectInput.disabled) return;
                e.preventDefault();
                if (!dropmenuInstance.isOpen) syncWidth();
                dropmenuInstance.toggle();
            });

            // Scoped AbortController so per-option listeners can be
            // detached as a group if initCustomSelectDropdown is re-run.
            if (selectInput._ndsOptionsAC) selectInput._ndsOptionsAC.abort();
            selectInput._ndsOptionsAC = new AbortController();
            var optionsSignal = selectInput._ndsOptionsAC.signal;

            options.forEach(function(option) {
                option.addEventListener('click', function(e) {
                    e.preventDefault();
                    var value = this.dataset.value || '';
                    var optionText = this.querySelector('.nds-option-text');
                    var text = optionText ? optionText.textContent : value;
                    selectValue(value, text);
                    // Dropmenu's item-click handler auto-closes after
                    // 100ms; restore focus to the input after that. With
                    // `nds-dropmenu-trigger` on the input, dropmenu's
                    // close also calls trigger.focus() — this setTimeout
                    // is belt-and-braces for the "click-to-select" path.
                    setTimeout(function() { selectInput.focus(); }, 110);
                }, { signal: optionsSignal });
                // Enter/Space/Arrow/Home/End/Tab/Escape are all handled
                // by NDS.Dropmenu (handleTriggerKeydown for the input,
                // handleMenuKeydown for inside the menu) — no per-option
                // or input keydown wiring needed here.
            });

            // Initialize selected option
            var initialValue = (hiddenInput ? hiddenInput.value : '') || selectInput.value;
            if (initialValue) {
                var matchingOption = Array.from(options).find(function(opt) {
                    return opt.dataset.value === initialValue;
                });
                if (matchingOption) {
                    selectedValue = initialValue;
                    var optionText = matchingOption.querySelector('.nds-option-text');
                    var text = optionText ? optionText.textContent : initialValue;
                    selectInput.value = text;
                    updateSelectedOptions();
                    FieldSync.update(selectInput, formControl);
                }
            }
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
                NDS.aria.label(passwordToggle, isPassword ? 'Hide password' : 'Show password');
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
                    if (switchInput.disabled || switchElement.classList.contains('disabled')) return;
                    switchInput.checked = !switchInput.checked;
                    Utils.triggerEvents(switchInput);
                    FieldSync.update(switchInput, formControl);
                    switchElement.dispatchEvent(new CustomEvent('switchChange', {
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
                var min = input.hasAttribute('min') ? parseInt(input.min) : 0;
                var max = input.hasAttribute('max') ? parseInt(input.max) : current;
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
                    if (input.type === 'checkbox' || input.type === 'radio') {
                        input.checked = false;
                    } else {
                        input.value = '';
                    }
                    Utils.triggerEvents(input);
                    FieldSync.update(input, formControl);
                });
            });
        }
    };

    // ==============================================
    // GROUP VALIDATION INITIALIZATION
    // ==============================================
    function initCheckboxGroupValidation(group) {
        if (!group || group._checkGroupInitialized) return;
        group._checkGroupInitialized = true;

        var checkboxes = group.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(function(checkbox) {
            checkbox.addEventListener('change', function() {
                if (group.hasAttribute('data-min-checked') || group.hasAttribute('data-max-checked') || group.hasAttribute('data-required')) {
                    if (NDS.Status.get(group) !== '') {
                        Validator.validateCheckboxGroup(group);
                    }
                }
            });
        });
    }

    function initRadioGroupValidation(group) {
        if (!group || group._radioGroupInitialized) return;
        group._radioGroupInitialized = true;

        var radios = group.querySelectorAll('input[type="radio"]');
        radios.forEach(function(radio) {
            radio.addEventListener('change', function() {
                if (group.hasAttribute('data-required') || group.classList.contains('nds-required')) {
                    if (NDS.Status.get(group) !== '') {
                        Validator.validateRadioGroup(group);
                    }
                }
            });
        });
    }

    // ==============================================
    // GROUP STATE MANAGEMENT
    // ==============================================
    function initGroupState(group) {
        if (!group) return;

        // Handle data-required attribute - propagate to inputs
        // Note: For groups (radio, checkbox, switch), we DON'T add required to individual inputs
        // because the group is validated as a whole, not individual inputs
        // This prevents HTML5 validation from showing errors on each individual input
        if (group.hasAttribute('data-required') || group.hasAttribute('data-min-checked')) {
            // Groups are validated as a whole - don't add required to individual inputs
            // This applies to all group types: radio-group, check-group, switch-group
        }

        // Propagate initial data-state to inputs via hooks
        NDS.State.apply(group, 'disabled', 'readonly');
    }

    // ==============================================
    // FORM INITIALIZATION
    // ==============================================
    function initForm(formElement) {
        var form = formElement.closest('.nds-form') || formElement;
        if (!form || form._ndsFormInitialized) return;
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

        container.querySelectorAll('.nds-item').forEach(function(item) {
            if (item._autoFillHandler) {
                item.removeEventListener('click', item._autoFillHandler);
            }

            item._autoFillHandler = function(e) {
                e.preventDefault();
                e.stopPropagation();

                var itemText = (item.textContent || item.innerText).trim().replace(/\s+/g, ' ');

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
            if (formControl.closest('code, .code-example')) return;

            var inputElements = formControl.querySelectorAll(':scope > input, :scope > textarea, :scope > select');

            inputElements.forEach(function(input) {
                FormControls.initializeInput(input, formControl);
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
        StatusTypes: StatusTypes,
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
                container.querySelectorAll('input, textarea, select').forEach(function(input) {
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

        // OTP Group Validation
        validateOtpGroup: Validator.validateOtpGroup.bind(Validator),

        // Form Validation
        validateForm: Validator.validateForm.bind(Validator),
        initForm: initForm,

        // Mark as loaded
        _loaded: true
    };

})();
