// NDS Forms Controller - Form Control Logic
// File: nds-forms.js

(function () {
    'use strict';

    // Voice Recognition Module
    var VoiceRecognition = {
        audioFeedback: {
            context: null,

            init: function () {
                try {
                    this.context = new (window.AudioContext || window.webkitAudioContext)();
                } catch (e) {
                    this.context = null;
                }
            },

            playTone: function (frequency, duration) {
                if (!this.context) this.init();
                if (!this.context) return;

                try {
                    if (this.context.state === 'suspended') {
                        this.context.resume();
                    }

                    var osc = this.context.createOscillator();
                    var gain = this.context.createGain();
                    var now = this.context.currentTime;

                    osc.connect(gain).connect(this.context.destination);
                    osc.frequency.setValueAtTime(frequency, now);
                    osc.type = 'sine';

                    gain.gain.setValueAtTime(0.1, now);
                    gain.gain.exponentialRampToValueAtTime(0.01, now + duration / 1000);

                    osc.start(now);
                    osc.stop(now + duration / 1000);
                } catch (e) {
                    // Silent fail
                }
            },

            start: function () { this.playTone(800, 200); },
            end: function () { this.playTone(400, 300); },
            error: function () { this.playTone(200, 400); }
        },

        isSupported: function () {
            return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
        },

        getLanguage: function () {
            var lang = document.documentElement.lang || 'ar';
            return { ar: 'ar-SA', en: 'en-US' }[lang.split('-')[0]] || 'ar-SA';
        },

        create: function (options) {
            if (!this.isSupported()) return null;

            var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            var settings = Object.assign({
                continuous: false,
                interimResults: true,
                lang: this.getLanguage(),
                maxAlternatives: 1
            }, options);

            Object.assign(recognition, settings);
            return recognition;
        },

        startListening: function (recognition, callbacks) {
            if (!recognition) return;

            var finalTranscript = '';
            callbacks = callbacks || {};

            recognition.onstart = function () {
                VoiceRecognition.audioFeedback.start();
                if (callbacks.onStart) callbacks.onStart();
            };

            recognition.onresult = function (event) {
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

            recognition.onerror = function (event) {
                VoiceRecognition.audioFeedback.error();
                if (callbacks.onError) {
                    callbacks.onError(event.error);
                } else {
                    console.error('Speech recognition error:', event.error);
                }
            };

            recognition.onend = function () {
                VoiceRecognition.audioFeedback.end();
                if (callbacks.onEnd) callbacks.onEnd(finalTranscript);
            };

            recognition.start();
        },

        stopListening: function (recognition) {
            if (recognition) recognition.stop();
        }
    };

    // Utility functions
    function updateFormState(input, formControl) {
        var hasValue;
        
        if (input.type === 'checkbox' || input.type === 'radio') {
            hasValue = input.checked;
        } else {
            hasValue = input.value.trim() !== '';
        }

        formControl.classList.toggle('filled', hasValue);
        formControl.classList.toggle('disabled', input.disabled);

        // Show/hide clear button for text-based inputs only
        var clearButton = formControl.querySelector('.clear');
        if (clearButton && input.type !== 'radio' && input.type !== 'checkbox') {
            clearButton.classList.toggle('hidden', !hasValue);
        }
    }
    
    function updateRadioGroup(changedRadio, formControl) {
        if (changedRadio.type !== 'radio' || !changedRadio.name) return;
        
        var radioGroupContainer = changedRadio.closest('.nds-radio-group');
        if (!radioGroupContainer) return;
        
        var radioGroup = radioGroupContainer.querySelectorAll('input[type="radio"][name="' + changedRadio.name + '"]');
        radioGroup.forEach(function(radio) {
            if (radio !== changedRadio) {
                var radioFormControl = radio.closest('.nds-form-control');
                if (radioFormControl) {
                    updateFormState(radio, radioFormControl);
                }
            }
        });
    }

    function findPrimaryInput(container) {
        return container.querySelector('input[type="text"], input[type="email"], input[type="search"], textarea') ||
            container.querySelector('input, textarea');
    }

    function triggerEvents(element) {
        element.dispatchEvent(new Event('input', { bubbles: true }));
        element.dispatchEvent(new Event('change', { bubbles: true }));
    }

    // Auto-fill functionality
    function initAutoFillTags() {
        document.querySelectorAll('.nds-autoFill[data-target]').forEach(function (container) {
            var targetId = container.getAttribute('data-target');

            container.querySelectorAll('.nds-tag').forEach(function (tag) {
                if (tag._autoFillHandler) {
                    tag.removeEventListener('click', tag._autoFillHandler);
                }

                tag._autoFillHandler = function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    var tagText = (tag.textContent || tag.innerText).trim();
                    // Clean up excessive whitespace and normalize spaces
                    tagText = tagText.replace(/\s+/g, ' ');

                    var targetInput = document.getElementById(targetId) ||
                        document.querySelector('[name="' + targetId + '"]') ||
                        document.querySelector('[data-name="' + targetId + '"]');

                    if (targetInput && tagText) {
                        targetInput.value = tagText;
                        targetInput.focus();
                        triggerEvents(targetInput);

                        var formControl = targetInput.closest('.nds-form-control');
                        if (formControl) {
                            updateFormState(targetInput, formControl);
                        }
                    }
                };

                tag.addEventListener('click', tag._autoFillHandler);
            });
        });
    }


    // Form control functionality
    function initFormControlClasses() {
        document.querySelectorAll('.nds-form-control').forEach(function (formControl) {
            var inputElements = formControl.querySelectorAll('input, textarea, select');

            inputElements.forEach(function (input) {
                // Prevent duplicate event listeners
                if (input._ndsInitialized) return;
                input._ndsInitialized = true;

                // Mouse interaction
                input.addEventListener('mousedown', function () {
                    formControl.classList.add('active');
                });

                ['mouseup', 'mouseleave'].forEach(function (event) {
                    input.addEventListener(event, function () {
                        formControl.classList.remove('active');
                    });
                });

                // Focus states
                input.addEventListener('focus', function () {
                    formControl.classList.add('focus');
                });

                input.addEventListener('blur', function () {
                    formControl.classList.remove('focus');
                });

                // Value changes - use input for immediate feedback
                input.addEventListener('input', function () {
                    updateFormState(input, formControl);
                });

                // Also listen for change for form validation compatibility 
                input.addEventListener('change', function () {
                    updateFormState(input, formControl);
                    updateRadioGroup(input, formControl);
                });

                // Initialize state
                updateFormState(input, formControl);
                
                // Watch for all field status changes
                if (window.MutationObserver) {
                    var observer = new MutationObserver(function(mutations) {
                        mutations.forEach(function(mutation) {
                            if (mutation.type === 'attributes') {
                                var attr = mutation.attributeName;
                                if (attr === 'disabled' || attr === 'checked' || attr === 'value') {
                                    updateFormState(input, formControl);
                                    
                                    // Handle radio group updates for checked changes
                                    if (attr === 'checked') {
                                        updateRadioGroup(input, formControl);
                                    }
                                }
                            }
                        });
                    });
                    observer.observe(input, { 
                        attributes: true, 
                        attributeFilter: ['disabled', 'checked', 'value']
                    });
                }
                
                // Enhanced property change detection for programmatic updates
                try {
                    var originalValueDescriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(input), 'value');
                    var originalCheckedDescriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(input), 'checked');
                    
                    if (originalValueDescriptor && originalValueDescriptor.set) {
                        Object.defineProperty(input, 'value', {
                            get: originalValueDescriptor.get,
                            set: function(val) {
                                originalValueDescriptor.set.call(this, val);
                                updateFormState(this, formControl);
                            },
                            configurable: true
                        });
                    }
                    
                    if (originalCheckedDescriptor && originalCheckedDescriptor.set && (input.type === 'radio' || input.type === 'checkbox')) {
                        Object.defineProperty(input, 'checked', {
                            get: originalCheckedDescriptor.get,
                            set: function(val) {
                                var wasChecked = this.checked;
                                originalCheckedDescriptor.set.call(this, val);
                                updateFormState(this, formControl);
                                
                                // Handle radio group updates for programmatic changes
                                if (val && !wasChecked) {
                                    updateRadioGroup(this, formControl);
                                }
                            },
                            configurable: true
                        });
                    }
                } catch (e) {
                    console.warn('Property descriptor enhancement not supported:', e);
                }

                // Select dropdown open state handling
                if (input.tagName.toLowerCase() === 'select') {
                    initSelectDropdown(input, formControl);
                }
            });

            // Initialize form controls
            initVoiceInput(formControl);
            initPasswordToggle(formControl);
            initClearButton(formControl, inputElements);
        });
    }

    // Select dropdown functionality
    function initSelectDropdown(selectElement, formControl) {
        var isOpen = false;
        
        function updateOpenState() {
            formControl.classList.toggle('open', isOpen);
        }
        
        // Mouse interaction
        selectElement.addEventListener('mousedown', function (e) {
            isOpen = !isOpen;
            updateOpenState();
        });
        
        // Keyboard navigation
        selectElement.addEventListener('keydown', function (e) {
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
        
        // Auto-close events
        ['blur', 'change'].forEach(function(event) {
            selectElement.addEventListener(event, function () {
                isOpen = false;
                updateOpenState();
            });
        });
    }

    // Voice input functionality
    function initVoiceInput(formControl) {
        var voiceButton = formControl.querySelector('.nds-form-action .voiceInput');
        if (!voiceButton) return;

        if (VoiceRecognition.isSupported()) {
            var isListening = false;
            var currentRecognition = null;

            voiceButton.addEventListener('click', function () {
                if (isListening) {
                    VoiceRecognition.stopListening(currentRecognition);
                    return;
                }

                var primaryInput = findPrimaryInput(formControl);
                if (!primaryInput) return;

                currentRecognition = VoiceRecognition.create();
                if (!currentRecognition) return;

                primaryInput.focus();

                VoiceRecognition.startListening(currentRecognition, {
                    onStart: function () {
                        isListening = true;
                        voiceButton.classList.add('listening');
                        formControl.classList.add('voice-active');
                    },

                    onResult: function (result) {
                        primaryInput.value = result.isFinal ? result.final.trim() : result.interim;
                        if (result.isFinal) {
                            triggerEvents(primaryInput);
                            updateFormState(primaryInput, formControl);
                        }
                    },

                    onError: function (error) {
                        console.warn('Voice recognition error:', error);
                        isListening = false;
                        voiceButton.classList.remove('listening');
                        formControl.classList.remove('voice-active');
                    },

                    onEnd: function () {
                        isListening = false;
                        voiceButton.classList.remove('listening');
                        formControl.classList.remove('voice-active');
                    }
                });
            });
        } else {
            voiceButton.style.display = 'none';
        }
    }

    // Password toggle functionality
    function initPasswordToggle(formControl) {
        var passwordToggle = formControl.querySelector('.nds-form-action .toggle-password');
        if (!passwordToggle) return;

        passwordToggle.addEventListener('click', function (e) {
            e.preventDefault();
            
            var passwordInput = formControl.querySelector('input[type="password"], input[type="text"]');
            if (!passwordInput) return;
            
            var isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            passwordToggle.classList.toggle('show', isPassword);
            passwordToggle.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
        });
    }


    // Clear button functionality
    function initClearButton(formControl, inputElements) {
        var clearButton = formControl.querySelector('.nds-form-action .clear');
        if (!clearButton) return;

        clearButton.addEventListener('click', function (e) {
            e.preventDefault();
            
            inputElements.forEach(function (input) {
                if (input.type === 'checkbox' || input.type === 'radio') {
                    input.checked = false;
                } else {
                    input.value = '';
                }
                triggerEvents(input);
                updateFormState(input, formControl);
            });
        });
    }

    // Initialize all form functionality
    function init() {
        try {
            VoiceRecognition.audioFeedback.init();
            initFormControlClasses();
            initAutoFillTags();
        } catch (error) {
            console.error('NDS Forms initialization error:', error);
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Global exports for external access
    window.NDS = window.NDS || {};
    window.NDS.Forms = {
        VoiceRecognition: VoiceRecognition,
        reinit: init,
        updateFormState: updateFormState
    };
    
    // Backward compatibility
    window.VoiceRecognition = VoiceRecognition;
    window.reinitFormControlClasses = init;

})();