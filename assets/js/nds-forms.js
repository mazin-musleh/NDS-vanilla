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
        var hasValue = (input.type === 'checkbox' || input.type === 'radio')
            ? input.checked
            : input.value.trim() !== '';

        formControl.classList.toggle('filled', hasValue);

        // Show/hide clear button based on input value
        var clearButton = formControl.querySelector('.clear');
        if (clearButton) {
            clearButton.classList.toggle('hidden', !hasValue);
        }
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

                // Value changes
                ['input', 'change'].forEach(function (event) {
                    input.addEventListener(event, function () {
                        updateFormState(input, formControl);
                    });
                });

                // Initialize state
                updateFormState(input, formControl);
            });

            // Voice input button
            var voiceButton = formControl.querySelector('.nds-form-action .voiceInput');
            if (voiceButton && VoiceRecognition.isSupported()) {
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
                            }
                        },

                        onError: function () {
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
            } else if (voiceButton) {
                voiceButton.style.display = 'none';
            }

            // Password toggle button
            var passwordToggle = formControl.querySelector('.nds-form-action .toggle-password');
            if (passwordToggle) {
                passwordToggle.addEventListener('click', function (e) {
                    e.preventDefault();
                    var passwordInput = formControl.querySelector('input[type="password"], input[type="text"]');
                    
                    if (passwordInput.type === 'password') {
                        passwordInput.type = 'text';
                        passwordToggle.classList.add('show');
                        passwordToggle.setAttribute('aria-label', 'Hide password');
                    } else {
                        passwordInput.type = 'password';
                        passwordToggle.classList.remove('show');
                        passwordToggle.setAttribute('aria-label', 'Show password');
                    }
                });
            }

            // File upload handling
            var fileInput = formControl.querySelector('.nds-file-input');
            if (fileInput) {
                var fileLabel = formControl.querySelector('.nds-file-label');
                var uploadText = fileLabel ? fileLabel.querySelector('.upload-text') : null;
                var fileClearBtn = formControl.querySelector('.nds-form-action .clear');
                
                fileInput.addEventListener('change', function () {
                    if (fileInput.files.length > 0) {
                        var fileCount = fileInput.files.length;
                        if (uploadText) {
                            uploadText.textContent = fileCount + ' file' + (fileCount > 1 ? 's' : '') + ' selected';
                        }
                        if (fileClearBtn) fileClearBtn.classList.remove('hidden');
                        formControl.classList.add('filled');
                    } else {
                        if (uploadText) uploadText.textContent = 'Choose files or drag and drop';
                        if (fileClearBtn) fileClearBtn.classList.add('hidden');
                        formControl.classList.remove('filled');
                    }
                });
                
                if (fileClearBtn) {
                    fileClearBtn.addEventListener('click', function (e) {
                        e.preventDefault();
                        fileInput.value = '';
                        if (uploadText) uploadText.textContent = 'Choose files or drag and drop';
                        fileClearBtn.classList.add('hidden');
                        formControl.classList.remove('filled');
                    });
                }
            }

            // Clear button
            var clearButton = formControl.querySelector('.nds-form-action .clear');
            if (clearButton) {
                clearButton.addEventListener('click', function () {
                    inputElements.forEach(function (input) {
                        if (input.type === 'checkbox' || input.type === 'radio') {
                            input.checked = false;
                        } else {
                            input.value = '';
                        }
                        triggerEvents(input);
                    });
                    formControl.classList.remove('filled');
                });
            }
        });
    }

    // Initialize
    function init() {
        VoiceRecognition.audioFeedback.init();
        initFormControlClasses();
        initAutoFillTags();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Global exports
    window.VoiceRecognition = VoiceRecognition;
    window.reinitFormControlClasses = init;

})();