// NDS Forms Controller - Form Control Logic
// File: nds-forms.js
// Optimized and simplified version

(function () {
    'use strict';

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

    var VOICE_TIMEOUT = 30000; // 30 seconds

    // ==============================================
    // VOICE RECOGNITION MODULE
    // ==============================================
    var VoiceRecognition = (function() {
        var audioContext = null;

        function initAudioContext() {
            if (!audioContext) {
                try {
                    audioContext = new (window.AudioContext || window.webkitAudioContext)();
                } catch (e) {
                    audioContext = null;
                }
            }
            return audioContext;
        }

        function playTone(frequency, duration) {
            var ctx = initAudioContext();
            if (!ctx) return;

            try {
                if (ctx.state === 'suspended') ctx.resume();

                var osc = ctx.createOscillator();
                var gain = ctx.createGain();
                var now = ctx.currentTime;

                osc.connect(gain).connect(ctx.destination);
                osc.frequency.setValueAtTime(frequency, now);
                osc.type = 'sine';

                gain.gain.setValueAtTime(0.1, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + duration / 1000);

                osc.start(now);
                osc.stop(now + duration / 1000);
            } catch (e) {
                // Silent fail
            }
        }

        return {
            audioFeedback: {
                init: initAudioContext,
                start: function() { playTone(800, 200); },
                end: function() { playTone(400, 300); },
                error: function() { playTone(200, 400); }
            },

            isSupported: function() {
                return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
            },

            getLanguage: function() {
                return NDS.isArabic ? 'ar-SA' : 'en-US';
            },

            create: function(options) {
                if (!this.isSupported()) return null;

                var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
                var detectedLang = this.getLanguage();

                Object.assign(recognition, {
                    continuous: false,
                    interimResults: true,
                    lang: detectedLang,
                    maxAlternatives: 1
                }, options || {});

                recognition._ndsLang = detectedLang;
                return recognition;
            },

            startListening: function(recognition, callbacks) {
                if (!recognition) return;

                var finalTranscript = '';
                callbacks = callbacks || {};

                recognition.onstart = function() {
                    VoiceRecognition.audioFeedback.start();
                    if (callbacks.onStart) callbacks.onStart();
                };

                recognition.onresult = function(event) {
                    var interimTranscript = '';

                    for (var i = event.resultIndex; i < event.results.length; i++) {
                        var transcript = event.results[i][0].transcript;
                        if (event.results[i].isFinal) {
                            finalTranscript += transcript;
                        } else {
                            interimTranscript += transcript;
                        }
                    }

                    if (callbacks.onResult) {
                        callbacks.onResult({
                            final: finalTranscript,
                            interim: interimTranscript,
                            isFinal: event.results[event.results.length - 1].isFinal
                        });
                    }
                };

                recognition.onerror = function(event) {
                    VoiceRecognition.audioFeedback.error();
                    if (callbacks.onError) callbacks.onError(event.error);
                };

                recognition.onend = function() {
                    VoiceRecognition.audioFeedback.end();
                    if (callbacks.onEnd) callbacks.onEnd(finalTranscript);
                };

                recognition.start();
            },

            stopListening: function(recognition) {
                if (recognition) recognition.stop();
            }
        };
    })();

    // ==============================================
    // UTILITY FUNCTIONS
    // ==============================================
    var Utils = {
        getCurrentLanguage: function() {
            return NDS.lang;
        },

        isArabic: function() {
            return NDS.isArabic;
        },

        debounce: function(func, wait) {
            var timeout;
            return function() {
                var context = this, args = arguments;
                clearTimeout(timeout);
                timeout = setTimeout(function() {
                    func.apply(context, args);
                }, wait);
            };
        },

        triggerEvents: function(element) {
            element.dispatchEvent(new Event('input', { bubbles: true }));
            element.dispatchEvent(new Event('change', { bubbles: true }));
        },

        findPrimaryInput: function(container) {
            return container.querySelector(':scope > input[type="text"], :scope > input[type="email"], :scope > input[type="search"], :scope > textarea') ||
                container.querySelector(':scope > input, :scope > textarea');
        }
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
                    container.setAttribute('data-status', status);
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
                container.setAttribute('data-status', status);
                if (message) {
                    container.setAttribute('data-message', message);
                }

                // Create feedback using NDSFeedback API
                if (NDS.Feedback && message) {
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
                element.removeAttribute('data-status');
                return true;
            }

            var container = this._findContainer(element);
            if (!container) return false;

            // Remove status attributes
            container.removeAttribute('data-status');
            container.removeAttribute('data-message');

            // Dismiss all feedback in container using NDSFeedback API
            if (NDS.Feedback) {
                NDS.Feedback.dismissAll(container);
            }

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
            return {
                status: container.getAttribute('data-status') || '',
                message: container.getAttribute('data-message') || '',
                isValid: container.getAttribute('data-status') !== 'error'
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
            var isArabic = Utils.isArabic();

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
                    ? 'المدخل قصير جداً (الحد الأدنى ' + input.minLength + ' حرف)'
                    : 'Input is too short (minimum ' + input.minLength + ' characters)';
            } else if (validity.tooLong) {
                return isArabic
                    ? 'المدخل طويل جداً (الحد الأقصى ' + input.maxLength + ' حرف)'
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
            var isArabic = Utils.isArabic();

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

            var customMessage = group.getAttribute('data-error-message');
            if (!isValid && customMessage) message = customMessage;

            if (options.showMessage) {
                if (!isValid) StatusManager.set({ element: group, status: 'error', message: message });
                else StatusManager.clear(group);
            }

            return { valid: isValid, checked: checkedCount, min: minChecked, max: maxChecked, message: message };
        },

        validateRadioGroup: function(groupElement, options) {
            options = options || { showMessage: true };

            var group = groupElement.closest('.nds-form-group') || groupElement;
            var radios = group.querySelectorAll('input[type="radio"]');
            var isSelected = Array.from(radios).some(function(r) { return r.checked; });

            var isRequired = group.hasAttribute('data-required') || group.classList.contains('nds-required');
            var isValid = !isRequired || isSelected;
            var message = '';
            var isArabic = Utils.isArabic();

            if (!isValid) {
                message = isArabic ? 'يرجى اختيار خيار واحد' : 'Please select an option';
            }

            var customMessage = group.getAttribute('data-error-message');
            if (!isValid && customMessage) message = customMessage;

            if (options.showMessage) {
                if (!isValid) StatusManager.set({ element: group, status: 'error', message: message });
                else StatusManager.clear(group);
            }

            return { valid: isValid, selected: isSelected, message: message };
        },

        validateOtpGroup: function(groupElement, options) {
            options = options || { showMessage: true };

            var group = groupElement.closest('.nds-form-group') || groupElement;
            var inputs = Array.from(group.querySelectorAll('.nds-otp-container input'));
            var isAllFilled = inputs.length > 0 && inputs.every(function(i) { return i.value.length === 1; });

            var isRequired = group.hasAttribute('data-required') || group.classList.contains('nds-required');
            var isValid = !isRequired || isAllFilled;
            var message = '';
            var isArabic = Utils.isArabic();

            if (!isValid) {
                message = isArabic ? 'يرجى إدخال رمز التحقق' : 'Please enter the verification code';
            }

            var customMessage = group.getAttribute('data-error-message');
            if (!isValid && customMessage) message = customMessage;

            if (options.showMessage) {
                if (!isValid) StatusManager.set({ element: group, status: 'error', message: message });
                else StatusManager.clear(group);
            }

            return { valid: isValid, filled: isAllFilled, message: message };
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

                // Skip OTP containers — validated as a group below
                if (container.classList.contains('nds-otp-container')) return;

                var input = container.querySelector('input, textarea, select');
                if (!input || input.disabled) return;

                if (!input.checkValidity()) {
                    invalidFields.push(container);
                    errors.push({
                        field: container,
                        input: input,
                        message: Validator.getMessage(input)
                    });

                    if (!firstInvalidInput) firstInvalidInput = input;
                    if (options.showMessages) {
                        StatusManager.set({ element: container, status: 'error', message: Validator.getMessage(input) });
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
    // FORM STATE MANAGEMENT
    // ==============================================
    var FormState = {
        updateDataState: function(container, stateName, add) {
            if (!container) return;

            var currentState = container.getAttribute('data-state') || '';
            var states = currentState.split(' ').filter(function(s) { return s.length > 0; });
            var stateIndex = states.indexOf(stateName);

            if (add && stateIndex === -1) {
                states.push(stateName);
            } else if (!add && stateIndex !== -1) {
                states.splice(stateIndex, 1);
            } else {
                return; // No change needed — skip DOM write
            }

            if (states.length > 0) {
                container.setAttribute('data-state', states.join(' '));
            } else {
                container.removeAttribute('data-state');
            }

            // Propagate loading state to clear button
            if (stateName === 'loading') {
                var formControl = container.classList.contains('nds-form-control')
                    ? container
                    : container.querySelector('.nds-form-control');
                if (formControl) {
                    var clearBtn = formControl.querySelector('.nds-form-action .clear');
                    if (clearBtn) {
                        if (add) {
                            clearBtn.removeAttribute('hidden');
                            FormState.updateDataState(clearBtn, 'loading', true);
                        } else {
                            FormState.updateDataState(clearBtn, 'loading', false);
                        }
                    }
                }
            }
        },

        update: function(input, formControl, skipValidation) {
            var hasValue = (input.type === 'checkbox' || input.type === 'radio')
                ? input.checked
                : input.value.trim() !== '';

            var formContainer = formControl.closest('.nds-form-container');

            // Update data-state on container
            if (formContainer) {
                FormState.updateDataState(formContainer, 'filled', hasValue);
                FormState.updateDataState(formContainer, 'disabled', input.disabled);
                FormState.updateDataState(formContainer, 'required', input.required);
            }

            // Show/hide clear button
            var clearButton = formControl.querySelector('.clear');
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
                var currentStatus = formContainer.getAttribute('data-status');
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
                FormState.updateDataState(formContainer, 'indeterminate', !!value);
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
                        FormState.update(radio, radioFormControl);
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

            // Mouse interaction - use data-state on container
            input.addEventListener('mousedown', function() {
                if (formContainer) {
                    FormState.updateDataState(formContainer, 'active', true);
                }
            });

            ['mouseup', 'mouseleave'].forEach(function(event) {
                input.addEventListener(event, function() {
                    if (formContainer) {
                        FormState.updateDataState(formContainer, 'active', false);
                    }
                });
            });

            // Focus states - use data-state on container
            input.addEventListener('focus', function() {
                if (formContainer) {
                    FormState.updateDataState(formContainer, 'focus', true);
                }
            });

            input.addEventListener('blur', function() {
                if (formContainer) {
                    FormState.updateDataState(formContainer, 'focus', false);
                    FormState.updateDataState(formContainer, 'typing', false);
                }
                // Only validate on blur if field already has an error (to clear it when fixed)
                var hasError = formContainer && formContainer.getAttribute('data-status') === 'error';
                FormState.update(input, formControl, !hasError);
            });

            // Typing state - indicates real user input
            input.addEventListener('keydown', function() {
                if (formContainer) {
                    FormState.updateDataState(formContainer, 'typing', true);
                }
            });

            input.addEventListener('paste', function() {
                if (formContainer) {
                    FormState.updateDataState(formContainer, 'typing', true);
                }
            });

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
                            var msg = Utils.isArabic() ? 'الأحرف العربية غير مسموح بها' : 'Arabic characters are not allowed';
                            StatusManager.set({ element: fc, status: 'error', message: msg });
                        }
                        return;
                    }
                }

                FormState.update(input, formControl, true);

                var formContainer = formControl.closest('.nds-form-container');
                if (formContainer && formContainer.hasAttribute('data-status')) {
                    StatusManager.clear(formContainer);
                }

                // Auto-clear group-level status on input (skip groups with own validation)
                var formGroup = formControl.closest('.nds-form-group');
                if (formGroup && formGroup.hasAttribute('data-status')
                    && !formGroup.hasAttribute('data-min-checked')
                    && !formGroup.hasAttribute('data-max-checked')
                    && !formGroup.hasAttribute('data-required')) {
                    StatusManager.clear(formGroup);
                }
            });

            // Change event - update state only, validate on submit
            input.addEventListener('change', function() {
                var hasError = formContainer && formContainer.getAttribute('data-status') === 'error';
                FormState.update(input, formControl, !hasError);
                FormState.updateRadioGroup(input);

                // Auto-clear indeterminate on user interaction
                if (input.type === 'checkbox' && !input.indeterminate) {
                    FormState.setIndeterminate(input, false);
                }
            });

            // Initialize state
            FormState.update(input, formControl, true);

            // Property change detection for programmatic updates
            this._setupPropertyWatchers(input, formControl);

            // Initialize specialized controls
            if (input.tagName.toLowerCase() === 'select') {
                this.initSelectDropdown(input, formControl);
            }
            if (input.classList.contains('nds-select-input')) {
                this.initCustomSelectDropdown(input, formControl);
            }
            if (input.classList.contains('nds-date-input')) {
                this.initDatePicker(input, formControl);
            }
        },

        _setupPropertyWatchers: function(input, formControl) {
            try {
                var proto = Object.getPrototypeOf(input);
                var valueDescriptor = Object.getOwnPropertyDescriptor(proto, 'value');
                var checkedDescriptor = Object.getOwnPropertyDescriptor(proto, 'checked');

                if (valueDescriptor && valueDescriptor.set) {
                    Object.defineProperty(input, 'value', {
                        get: valueDescriptor.get,
                        set: function(val) {
                            valueDescriptor.set.call(this, val);
                            FormState.update(this, formControl, true);
                        },
                        configurable: true
                    });
                }

                if (checkedDescriptor && checkedDescriptor.set && (input.type === 'radio' || input.type === 'checkbox')) {
                    Object.defineProperty(input, 'checked', {
                        get: checkedDescriptor.get,
                        set: function(val) {
                            var wasChecked = this.checked;
                            checkedDescriptor.set.call(this, val);
                            FormState.update(this, formControl, true);
                            if (val && !wasChecked) {
                                FormState.updateRadioGroup(this);
                            }
                        },
                        configurable: true
                    });
                }

                var disabledDescriptor = Object.getOwnPropertyDescriptor(proto, 'disabled');
                if (disabledDescriptor && disabledDescriptor.set) {
                    Object.defineProperty(input, 'disabled', {
                        get: disabledDescriptor.get,
                        set: function(val) {
                            disabledDescriptor.set.call(this, val);
                            FormState.update(this, formControl, true);
                        },
                        configurable: true
                    });
                }

                var requiredDescriptor = Object.getOwnPropertyDescriptor(proto, 'required');
                if (requiredDescriptor && requiredDescriptor.set) {
                    Object.defineProperty(input, 'required', {
                        get: requiredDescriptor.get,
                        set: function(val) {
                            requiredDescriptor.set.call(this, val);
                            FormState.update(this, formControl, true);
                        },
                        configurable: true
                    });
                }

            } catch (e) {
                // Silent fail if property definition not supported
            }
        },

        initSelectDropdown: function(selectElement, formControl) {
            var isOpen = false;

            function updateOpenState() {
                formControl.classList.toggle('open', isOpen);
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
            var options = formControl.querySelectorAll('.select-option');

            if (!dropdown || !options.length) return;

            var isOpen = false;
            var selectedValue = '';

            function updateOpenState() {
                formControl.classList.toggle('open', isOpen);

                if (isOpen) {
                    updateSelectedOptions();
                    // Measure with fixed + hidden to avoid extending the page
                    dropdown.style.cssText = 'visibility:hidden;position:fixed;top:0;left:0;';
                    dropdown.removeAttribute('hidden');

                    var dropdownHeight = dropdown.offsetHeight;
                    var fcRect = formControl.getBoundingClientRect();
                    var spaceBelow = window.innerHeight - fcRect.bottom;

                    // Clear measurement styles, apply direction override if needed
                    if (spaceBelow < dropdownHeight + 4 && fcRect.top > spaceBelow) {
                        dropdown.style.cssText = 'top:unset;bottom:100%;margin-bottom:4px;';
                    } else {
                        dropdown.style.cssText = '';
                    }

                    if (options[0]) options[0].focus();
                } else {
                    dropdown.setAttribute('hidden', '');
                    dropdown.style.cssText = '';
                }
            }

            function updateSelectedOptions() {
                options.forEach(function(option) {
                    option.classList.toggle('selected', option.dataset.value === selectedValue);
                });
            }

            function selectValue(value, text) {
                selectedValue = value;
                selectInput.value = text;
                if (hiddenInput) hiddenInput.value = value;
                updateSelectedOptions();
                closeDropdown();

                Utils.triggerEvents(selectInput);
                if (hiddenInput) Utils.triggerEvents(hiddenInput);

                FormState.update(selectInput, formControl);

                formControl.dispatchEvent(new CustomEvent('selectChange', {
                    detail: { value: value, text: text }
                }));
            }

            function openDropdown() {
                if (formControl.classList.contains('disabled') || selectInput.disabled) return;
                isOpen = true;
                updateOpenState();
            }

            function closeDropdown() {
                isOpen = false;
                updateOpenState();
            }

            function toggleDropdown() {
                isOpen ? closeDropdown() : openDropdown();
            }

            // Event listeners
            selectInput.addEventListener('click', function(e) {
                e.preventDefault();
                toggleDropdown();
            });

            options.forEach(function(option) {
                option.addEventListener('click', function(e) {
                    e.preventDefault();
                    var value = this.dataset.value || '';
                    var optionText = this.querySelector('.option-text');
                    var text = optionText ? optionText.textContent : value;
                    selectValue(value, text);
                    selectInput.focus();
                });

                option.addEventListener('keydown', function(e) {
                    var currentIndex = Array.from(options).indexOf(this);

                    switch(e.key) {
                        case 'Enter':
                        case ' ':
                            e.preventDefault();
                            var value = this.dataset.value || '';
                            var optionText = this.querySelector('.option-text');
                            var text = optionText ? optionText.textContent : value;
                            selectValue(value, text);
                            selectInput.focus();
                            break;
                        case 'ArrowDown':
                            e.preventDefault();
                            options[Math.min(currentIndex + 1, options.length - 1)].focus();
                            break;
                        case 'ArrowUp':
                            e.preventDefault();
                            options[Math.max(currentIndex - 1, 0)].focus();
                            break;
                        case 'Escape':
                            closeDropdown();
                            selectInput.focus();
                            break;
                    }
                });
            });

            selectInput.addEventListener('keydown', function(e) {
                if (selectInput.disabled) return;

                switch(e.key) {
                    case 'Enter':
                    case ' ':
                    case 'ArrowDown':
                        e.preventDefault();
                        if (!isOpen) {
                            openDropdown();
                        } else if (options[0]) {
                            options[0].focus();
                        }
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        if (isOpen && options.length > 0) {
                            options[options.length - 1].focus();
                        }
                        break;
                    case 'Escape':
                        if (isOpen) closeDropdown();
                        break;
                }
            });

            document.addEventListener('click', function(e) {
                if (!formControl.contains(e.target)) {
                    closeDropdown();
                }
            });

            // Initialize selected option
            var initialValue = (hiddenInput ? hiddenInput.value : '') || selectInput.value;
            if (initialValue) {
                var matchingOption = Array.from(options).find(function(opt) {
                    return opt.dataset.value === initialValue;
                });
                if (matchingOption) {
                    selectedValue = initialValue;
                    var optionText = matchingOption.querySelector('.option-text');
                    var text = optionText ? optionText.textContent : initialValue;
                    selectInput.value = text;
                    updateSelectedOptions();
                    FormState.update(selectInput, formControl);
                }
            }
        },

        initDatePicker: function(dateInput, formControl) {
            if (typeof DatePickerCalendar !== 'undefined') {
                new DatePickerCalendar(dateInput, formControl);
            }
        },

        initVoiceInput: function(formControl) {
            var voiceButton = formControl.querySelector('.nds-form-action .voiceInput');
            if (!voiceButton || !VoiceRecognition.isSupported()) {
                if (voiceButton) voiceButton.style.display = 'none';
                return;
            }

            var isListening = false;
            var recognition = null;
            var timeout = null;
            var input = Utils.findPrimaryInput(formControl);
            var originalPlaceholder = input ? input.placeholder : '';

            var isArabic = Utils.isArabic();
            var langName = isArabic ? 'العربية' : 'English';
            var startLabel = isArabic ? 'بدء إدخال الصوت (' + langName + ')' : 'Start voice input (' + langName + ')';
            var stopLabel = isArabic ? 'إيقاف إدخال الصوت' : 'Stop voice input';

            voiceButton.setAttribute('aria-label', startLabel);
            voiceButton.setAttribute('aria-pressed', 'false');
            voiceButton.title = startLabel;

            function showMessage(message, duration) {
                if (!input) return;
                input.placeholder = message;
                input.style.fontStyle = 'italic';
                input.style.opacity = '0.7';

                setTimeout(function() {
                    input.placeholder = originalPlaceholder;
                    input.style.fontStyle = '';
                    input.style.opacity = '';
                }, duration || 3000);
            }

            function stop() {
                isListening = false;
                if (recognition) {
                    try { recognition.abort(); } catch (e) {}
                    recognition = null;
                }
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }

                voiceButton.classList.remove('listening');
                voiceButton.setAttribute('aria-pressed', 'false');
                voiceButton.setAttribute('aria-label', startLabel);
                formControl.classList.remove('voice-active');

                if (input) {
                    input.style.fontStyle = '';
                    input.style.opacity = '';
                }
            }

            function start() {
                if (!input) return;

                recognition = VoiceRecognition.create();
                if (!recognition) return;

                isListening = true;
                voiceButton.classList.add('listening');
                voiceButton.setAttribute('aria-pressed', 'true');
                voiceButton.setAttribute('aria-label', stopLabel);
                formControl.classList.add('voice-active');
                input.focus();

                timeout = setTimeout(function() {
                    stop();
                    var msg = Utils.isArabic() ? 'انتهت مهلة إدخال الصوت' : 'Voice input timed out';
                    showMessage(msg, 4000);
                }, VOICE_TIMEOUT);

                VoiceRecognition.startListening(recognition, {
                    onResult: function(result) {
                        var value = result.isFinal ? result.final.trim() : result.interim;
                        input.style.fontStyle = result.isFinal ? '' : 'italic';
                        input.style.opacity = result.isFinal ? '' : '0.7';
                        input.value = value;

                        if (result.isFinal) {
                            stop();
                            Utils.triggerEvents(input);
                            FormState.update(input, formControl);
                        }
                    },
                    onError: function(error) {
                        stop();
                        var errorType = typeof error === 'string' ? error : (error && error.error);
                        var messages = {
                            ar: {
                                'no-speech': 'لم يتم اكتشاف صوت',
                                'not-allowed': 'مطلوب إذن الميكروفون',
                                'audio-capture': 'تم رفض الوصول للميكروفون',
                                'network': 'خطأ في الشبكة',
                                'aborted': 'تم إلغاء إدخال الصوت',
                                'language-not-supported': 'اللغة غير مدعومة',
                                'default': 'خطأ في إدخال الصوت'
                            },
                            en: {
                                'no-speech': 'No speech detected',
                                'not-allowed': 'Microphone permission required',
                                'audio-capture': 'Microphone access denied',
                                'network': 'Network error',
                                'aborted': 'Voice input cancelled',
                                'language-not-supported': 'Language not supported',
                                'default': 'Voice input error'
                            }
                        };
                        var lang = Utils.isArabic() ? 'ar' : 'en';
                        var msg = messages[lang][errorType] || messages[lang]['default'];
                        showMessage(msg);
                    },
                    onEnd: stop
                });
            }

            voiceButton.addEventListener('click', function() {
                if (isListening) {
                    stop();
                    VoiceRecognition.stopListening(recognition);
                } else {
                    start();
                }
            });
        },

        initPasswordToggle: function(formControl) {
            var passwordToggle = formControl.querySelector('.nds-form-action .toggle-password');
            if (!passwordToggle) return;

            passwordToggle.addEventListener('click', function(e) {
                e.preventDefault();

                var passwordInput = formControl.querySelector(':scope > input[type="password"], :scope > input[type="text"]');
                if (!passwordInput) return;

                var isPassword = passwordInput.type === 'password';
                passwordInput.type = isPassword ? 'text' : 'password';
                passwordToggle.classList.toggle('show', isPassword);
                passwordToggle.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
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

                switchTrack.addEventListener('mousedown', function() {
                    if (!switchInput.disabled && !switchElement.classList.contains('disabled')) {
                        if (formContainer) {
                            FormState.updateDataState(formContainer, 'active', true);
                        }
                    }
                });

                ['mouseup', 'mouseleave'].forEach(function(event) {
                    switchTrack.addEventListener(event, function() {
                        if (formContainer) {
                            FormState.updateDataState(formContainer, 'active', false);
                        }
                    });
                });

                switchTrack.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    if (switchInput.disabled || switchElement.classList.contains('disabled')) return;

                    switchInput.checked = !switchInput.checked;
                    Utils.triggerEvents(switchInput);
                    FormState.update(switchInput, formControl);

                    switchElement.dispatchEvent(new CustomEvent('switchChange', {
                        detail: { checked: switchInput.checked, value: switchInput.value, input: switchInput },
                        bubbles: true
                    }));
                });

                switchInput.addEventListener('keydown', function(e) {
                    if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();

                        if (!this.disabled && !switchElement.classList.contains('disabled')) {
                            this.checked = !this.checked;
                            Utils.triggerEvents(this);
                            FormState.update(this, formControl);

                            switchElement.dispatchEvent(new CustomEvent('switchChange', {
                                detail: { checked: this.checked, value: this.value, input: this },
                                bubbles: true
                            }));
                        }
                    }
                });

                var label = formControl.querySelector('label[for="' + switchInput.id + '"]');
                if (label && !switchElement.contains(label)) {
                    label.addEventListener('click', function(e) {
                        e.preventDefault();

                        if (!switchInput.disabled && !switchElement.classList.contains('disabled')) {
                            switchInput.checked = !switchInput.checked;
                            Utils.triggerEvents(switchInput);
                            FormState.update(switchInput, formControl);

                            switchElement.dispatchEvent(new CustomEvent('switchChange', {
                                detail: { checked: switchInput.checked, value: switchInput.value, input: switchInput },
                                bubbles: true
                            }));
                        }
                    });
                }

                FormState.update(switchInput, formControl, true);
            });
        },

        initClearButton: function(formControl, inputElements) {
            var clearButton = formControl.querySelector('.nds-form-action .clear');
            if (!clearButton) return;

            clearButton.addEventListener('click', function(e) {
                e.preventDefault();

                inputElements.forEach(function(input) {
                    if (input.type === 'checkbox' || input.type === 'radio') {
                        input.checked = false;
                    } else {
                        input.value = '';
                    }
                    Utils.triggerEvents(input);
                    FormState.update(input, formControl);
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
                    if (group.hasAttribute('data-status')) {
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
                    if (group.hasAttribute('data-status')) {
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

        // Handle data-state disabled/required - propagate to inputs
        var dataState = group.getAttribute('data-state') || '';
        var states = dataState.split(' ');
        var inputs = group.querySelectorAll('input[type="radio"], input[type="checkbox"], .nds-switch-input');
        if (states.indexOf('disabled') !== -1) {
            inputs.forEach(function(input) {
                input.setAttribute('disabled', '');
            });
        }
        if (states.indexOf('required') !== -1) {
            inputs.forEach(function(input) {
                input.setAttribute('required', '');
            });
        }
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
                        FormState.update(targetInput, formControl);
                    }
                }
            };

            item.addEventListener('click', item._autoFillHandler);
        });
    }

    // ==============================================
    // FEEDBACK OBSERVER
    // ==============================================
    function initFeedbackObserver() {
        var feedbackElements = document.querySelectorAll('.nds-feedback .msg');

        feedbackElements.forEach(function(msgElement) {
            var feedbackPlaceholder = msgElement.closest('.nds-feedback');
            var feedbackParent = feedbackPlaceholder ? feedbackPlaceholder.parentElement : null;

            if (!feedbackPlaceholder) return;

            var shouldToggleParent = false;
            if (feedbackParent) {
                var isFormContainer = feedbackParent.classList.contains('nds-form-footer') ||
                                     feedbackParent.classList.contains('nds-form-header');
                var isOnlyChild = feedbackParent.children.length === 1;
                shouldToggleParent = isFormContainer && isOnlyChild;
            }

            // Initial state
            var hasContent = msgElement.textContent.trim() !== '';
            feedbackPlaceholder.classList.toggle('show', hasContent);
            if (shouldToggleParent) {
                feedbackParent.classList.toggle('show', hasContent);
            }

            // Observe changes
            var observer = new MutationObserver(function() {
                var hasContent = msgElement.textContent.trim() !== '';
                feedbackPlaceholder.classList.toggle('show', hasContent);
                if (shouldToggleParent) {
                    feedbackParent.classList.toggle('show', hasContent);
                }
            });

            observer.observe(msgElement, {
                characterData: true,
                childList: true,
                subtree: true
            });
        });
    }

    // ==============================================
    // DYNAMIC CONTENT OBSERVER
    // ==============================================
    function initDynamicContentObserver() {
        if (window.NDS && window.NDS.Forms && window.NDS.Forms._dynamicObserver) {
            return;
        }

        NDS.onDOMAdd('.nds-form-control', function() { initFormControlClasses(); });
        NDS.onDOMAdd('.nds-auto-fill', function() { initInputAutoFill(); });
        NDS.onDOMAdd('.nds-file-upload', function(nodes) {
            if (window.NDS && window.NDS.Forms && window.NDS.Forms.FileUpload) {
                nodes.forEach(function(el) {
                    window.NDS.Forms.FileUpload.initFileUpload(el);
                });
            }
        });

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

            FormControls.initVoiceInput(formControl);
            FormControls.initPasswordToggle(formControl);
            FormControls.initClearButton(formControl, inputElements);
            FormControls.initSwitchControls(formControl);
        });

        // Initialize auto-fill containers
        var autoFillContainers = container.classList && container.classList.contains('nds-auto-fill')
            ? [container]
            : Array.from(container.querySelectorAll('.nds-auto-fill'));

        autoFillContainers.forEach(initAutoFillContainer);

        // Initialize file upload containers
        var fileUploadContainers = container.classList && container.classList.contains('nds-file-upload')
            ? [container]
            : Array.from(container.querySelectorAll('.nds-file-upload'));

        fileUploadContainers.forEach(function(uploadContainer) {
            if (window.NDS && window.NDS.Forms && window.NDS.Forms.FileUpload && window.NDS.Forms.FileUpload.initFileUpload) {
                window.NDS.Forms.FileUpload.initFileUpload(uploadContainer);
            }
        });

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

        // Restore autofocus — browser native autofocus may be lost during init
        var autofocusEl = container.querySelector('input[autofocus], textarea[autofocus], select[autofocus]');
        if (autofocusEl) {
            autofocusEl.focus();
            var fc = autofocusEl.closest('.nds-form-container');
            if (fc) FormState.updateDataState(fc, 'focus', true);
        }
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
        VoiceRecognition.audioFeedback.init();
        initFormControlClasses();
        initInputAutoFill();
        initDynamicContentObserver();
        initFeedbackObserver();
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

        // Checkbox Indeterminate State
        setIndeterminate: FormState.setIndeterminate.bind(FormState),

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

        // Utility
        VoiceRecognition: VoiceRecognition,

        // Mark as loaded
        _loaded: true
    };

})();
