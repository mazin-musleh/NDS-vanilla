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
            var baseLang = lang.split('-')[0].toLowerCase();
            
            return baseLang === 'en' ? 'en-US' : 'ar-SA';
        },

        getLanguageInfo: function(lang) {
            return lang === 'en-US' ? 
                { name: 'English', dir: 'ltr' } : 
                { name: 'العربية', dir: 'rtl' };
        },

        create: function (options) {
            if (!this.isSupported()) return null;

            var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            var detectedLang = this.getLanguage();
            var langInfo = this.getLanguageInfo(detectedLang);
            
            var settings = Object.assign({
                continuous: false,
                interimResults: true,
                lang: detectedLang,
                maxAlternatives: 1
            }, options);

            Object.assign(recognition, settings);
            
            // Store language info for reference
            recognition._ndsLangInfo = langInfo;
            recognition._ndsDetectedLang = detectedLang;
            
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
        return container.querySelector(':scope > input[type="text"], :scope > input[type="email"], :scope > input[type="search"], :scope > textarea') ||
            container.querySelector(':scope > input, :scope > textarea');
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
            var inputElements = formControl.querySelectorAll(':scope > input, :scope > textarea, :scope > select');

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
                }

                // Select dropdown open state handling
                if (input.tagName.toLowerCase() === 'select') {
                    initSelectDropdown(input, formControl);
                }

                // Custom select dropdown handling
                if (input.classList.contains('nds-select-input')) {
                    initCustomSelectDropdown(input, formControl);
                }

                // Date picker handling
                if (input.classList.contains('nds-date-input')) {
                    initDatePicker(input, formControl);
                }
            });

            // Initialize form controls
            initVoiceInput(formControl);
            initPasswordToggle(formControl);
            initClearButton(formControl, inputElements);
            initSwitchControls(formControl);
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

    // Custom Select dropdown functionality
    function initCustomSelectDropdown(selectInput, formControl) {
        var dropdown = formControl.querySelector('.nds-select-dropdown');
        var hiddenInput = formControl.querySelector('.nds-select-value');
        var options = formControl.querySelectorAll('.select-option');
        
        if (!dropdown || !options.length) return;

        var isOpen = false;
        var selectedValue = '';
        
        function updateOpenState() {
            formControl.classList.toggle('open', isOpen);
            dropdown.classList.toggle('hidden', !isOpen);
            
            if (isOpen) {
                updateSelectedOptions();
                // Focus first option for keyboard navigation
                if (options[0]) options[0].focus();
            }
        }
        
        function updateSelectedOptions() {
            options.forEach(function(option) {
                var isSelected = option.dataset.value === selectedValue;
                option.classList.toggle('selected', isSelected);
            });
        }
        
        function selectValue(value, text) {
            selectedValue = value;
            selectInput.value = text;
            if (hiddenInput) {
                hiddenInput.value = value;
            }
            updateSelectedOptions();
            closeDropdown();
            
            // Trigger change events
            triggerEvents(selectInput);
            if (hiddenInput) {
                triggerEvents(hiddenInput);
            }
            
            // Update form state
            updateFormState(selectInput, formControl);
            
            // Dispatch custom change event
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
            if (isOpen) {
                closeDropdown();
            } else {
                openDropdown();
            }
        }

        // Click events
        selectInput.addEventListener('click', function(e) {
            e.preventDefault();
            toggleDropdown();
        });

        // Option selection
        options.forEach(function(option) {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                var value = this.dataset.value || '';
                var optionText = this.querySelector('.option-text');
                var text = optionText ? optionText.textContent : value;
                selectValue(value, text);
                selectInput.focus();
            });

            // Keyboard navigation for options
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
                        var nextIndex = Math.min(currentIndex + 1, options.length - 1);
                        options[nextIndex].focus();
                        break;
                        
                    case 'ArrowUp':
                        e.preventDefault();
                        var prevIndex = Math.max(currentIndex - 1, 0);
                        options[prevIndex].focus();
                        break;
                        
                    case 'Escape':
                        closeDropdown();
                        selectInput.focus();
                        break;
                }
            });
        });

        // Keyboard navigation for main input
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
                    if (isOpen) {
                        closeDropdown();
                    }
                    break;
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!formControl.contains(e.target)) {
                closeDropdown();
            }
        });

        // Initialize selected option if there's a value
        var initialValue = selectInput.value || (hiddenInput ? hiddenInput.value : '');
        if (initialValue) {
            var matchingOption = Array.from(options).find(opt => opt.dataset.value === initialValue);
            if (matchingOption) {
                selectedValue = initialValue;
                updateSelectedOptions();
            }
        }
    }


    // Date Picker functionality
    function initDatePicker(dateInput, formControl) {
        // Use the new modular calendar system
        if (typeof DatePickerCalendar !== 'undefined') {
            new DatePickerCalendar(dateInput, formControl);
        } else {
            console.warn('DatePickerCalendar not available. Make sure nds-calendar.js is loaded.');
        }
    }

    // Date picker initialization now uses the new modular calendar system
    // All functionality moved to nds-calendar.js for better maintainability

    // Voice input functionality - Simple approach
    function initVoiceInput(formControl) {
        var voiceButton = formControl.querySelector('.nds-form-action .voiceInput');
        if (!voiceButton || !VoiceRecognition.isSupported()) {
            if (voiceButton) voiceButton.style.display = 'none';
            return;
        }

        var isListening = false;
        var recognition = null;
        var timeout = null;
        var input = findPrimaryInput(formControl);
        var originalPlaceholder = input ? input.placeholder : '';
        
        // Language detection based on HTML lang attribute
        function getCurrentLanguage() {
            var htmlLang = document.documentElement.lang || 'ar';
            return htmlLang.split('-')[0].toLowerCase();
        }
        
        function isCurrentlyArabic() {
            return getCurrentLanguage() === 'ar';
        }
        
        var isArabic = isCurrentlyArabic();
        var voiceLang = isArabic ? 'ar-SA' : 'en-US';
        var langName = isArabic ? 'العربية' : 'English';

        // Setup button with language-aware labels
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

            // 30-second timeout
            timeout = setTimeout(function() {
                stop();
                var msg = isCurrentlyArabic() ? 'انتهت مهلة إدخال الصوت' : 'Voice input timed out';
                showMessage(msg, 4000);
            }, 30000);

            VoiceRecognition.startListening(recognition, {
                language: voiceLang,
                
                onStart: function() {
                    // Already handled in start()
                },

                onResult: function(result) {
                    var value = result.isFinal ? result.final.trim() : result.interim;
                    
                    input.style.fontStyle = result.isFinal ? '' : 'italic';
                    input.style.opacity = result.isFinal ? '' : '0.7';
                    input.value = value;
                    
                    if (result.isFinal) {
                        stop();
                        triggerEvents(input);
                        updateFormState(input, formControl);
                    }
                },

                onError: function(error) {
                    stop();
                    
                    var currentlyArabic = isCurrentlyArabic();
                    var errorMsg = currentlyArabic ? 'خطأ في إدخال الصوت' : 'Voice input error';
                    var errorType = typeof error === 'string' ? error : (error && error.error);
                    
                    if (errorType === 'no-speech') {
                        errorMsg = currentlyArabic ? 'لم يتم اكتشاف صوت' : 'No speech detected';
                    } else if (errorType === 'not-allowed') {
                        errorMsg = currentlyArabic ? 'مطلوب إذن الميكروفون' : 'Microphone permission required';
                    } else if (errorType === 'audio-capture') {
                        errorMsg = currentlyArabic ? 'تم رفض الوصول للميكروفون' : 'Microphone access denied';
                    } else if (errorType === 'network') {
                        errorMsg = currentlyArabic ? 'خطأ في الشبكة' : 'Network error';
                    } else if (errorType === 'aborted') {
                        errorMsg = currentlyArabic ? 'تم إلغاء إدخال الصوت' : 'Voice input cancelled';
                    } else if (errorType === 'language-not-supported') {
                        errorMsg = currentlyArabic ? 'اللغة غير مدعومة' : 'Language not supported';
                    }
                    
                    showMessage(errorMsg);
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
    }

    // Password toggle functionality
    function initPasswordToggle(formControl) {
        var passwordToggle = formControl.querySelector('.nds-form-action .toggle-password');
        if (!passwordToggle) return;

        passwordToggle.addEventListener('click', function (e) {
            e.preventDefault();
            
            var passwordInput = formControl.querySelector(':scope > input[type="password"], :scope > input[type="text"]');
            if (!passwordInput) return;
            
            var isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            passwordToggle.classList.toggle('show', isPassword);
            passwordToggle.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
        });
    }


    // Switch controls functionality
    function initSwitchControls(formControl) {
        var switchElements = formControl.querySelectorAll('.nds-switch');
        if (!switchElements.length) return;

        switchElements.forEach(function(switchElement) {
            var switchInput = switchElement.querySelector('.nds-switch-input');
            var switchTrack = switchElement.querySelector('.nds-switch-track');
            
            if (!switchInput || !switchTrack) return;

            // Prevent duplicate initialization
            if (switchTrack._switchInitialized) return;
            switchTrack._switchInitialized = true;

            // Add mouse interaction for active state
            switchTrack.addEventListener('mousedown', function(e) {
                if (!switchInput.disabled && !switchElement.classList.contains('disabled')) {
                    formControl.classList.add('active');
                }
            });

            // Remove active state on mouse events
            ['mouseup', 'mouseleave'].forEach(function(event) {
                switchTrack.addEventListener(event, function() {
                    formControl.classList.remove('active');
                });
            });

            // Make track clickable to toggle switch
            switchTrack.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Don't toggle if disabled
                if (switchInput.disabled || switchElement.classList.contains('disabled')) {
                    return;
                }

                // Toggle the checked state
                switchInput.checked = !switchInput.checked;
                
                // Trigger events to update form state
                triggerEvents(switchInput);
                updateFormState(switchInput, formControl);
                
                // Dispatch custom switch change event
                switchElement.dispatchEvent(new CustomEvent('switchChange', {
                    detail: { 
                        checked: switchInput.checked,
                        value: switchInput.value,
                        input: switchInput
                    },
                    bubbles: true
                }));
            });

            // Handle keyboard interaction on the input
            switchInput.addEventListener('keydown', function(e) {
                // Space or Enter should toggle the switch
                if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    
                    if (!this.disabled && !switchElement.classList.contains('disabled')) {
                        this.checked = !this.checked;
                        triggerEvents(this);
                        updateFormState(this, formControl);
                        
                        // Dispatch custom switch change event
                        switchElement.dispatchEvent(new CustomEvent('switchChange', {
                            detail: { 
                                checked: this.checked,
                                value: this.value,
                                input: this
                            },
                            bubbles: true
                        }));
                    }
                }
            });

            // Handle label clicks (if label is outside the switch)
            var label = formControl.querySelector('label[for="' + switchInput.id + '"]');
            if (label && !switchElement.contains(label)) {
                label.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    if (!switchInput.disabled && !switchElement.classList.contains('disabled')) {
                        switchInput.checked = !switchInput.checked;
                        triggerEvents(switchInput);
                        updateFormState(switchInput, formControl);
                        
                        // Dispatch custom switch change event
                        switchElement.dispatchEvent(new CustomEvent('switchChange', {
                            detail: { 
                                checked: switchInput.checked,
                                value: switchInput.value,
                                input: switchInput
                            },
                            bubbles: true
                        }));
                    }
                });
            }

            // Initialize state
            updateFormState(switchInput, formControl);
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
            initializeFileUploads();
        } catch (error) {
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            init();
        });
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
    
    // File Upload functionality
    function initializeFileUploads() {
        const fileUploadElements = document.querySelectorAll('.nds-file-upload');
        if (fileUploadElements.length === 0) {
        }
        fileUploadElements.forEach((element, index) => {
            initFileUpload(element);
        });
    }

    function initFileUpload(uploadContainer) {
        
        const fileInput = uploadContainer.querySelector('input[type="file"]');
        const dropZone = uploadContainer.querySelector('.nds-form-control');
        const fileList = uploadContainer.querySelector('.file-list');
        const uploadZone = uploadContainer.querySelector('.upload-zone');
        const browseBtn = uploadContainer.querySelector('.browse-btn');
        
        if (!fileInput) {
            return;
        }
        if (!dropZone) {
            return;
        }
        if (!fileList) {
            return;
        }
        // Note: isSingleFile is now checked dynamically in functions
        const isMultiple = fileInput.hasAttribute('multiple');
        let uploadedFiles = [];

        // Function to get current configuration (dynamic reading)
        function getConfig() {
            return {
                uploadUrl: uploadContainer.dataset.uploadUrl || null,
                autoUpload: uploadContainer.dataset.autoUpload === 'true',
                maxFileSize: parseInt(uploadContainer.dataset.maxFileSize) || 10 * 1024 * 1024, // 10MB default
                allowedTypes: uploadContainer.dataset.allowedTypes?.split(',') || null
            };
        }

        // Utility functions
        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }

        // Icon generation removed - using template icons instead


        function updateProgress(progressElement, percentage) {
            const circle = progressElement.querySelector('.progress-bar');
            const text = progressElement.querySelector('.progress-number');
            const circumference = 62.83; // 2 * Math.PI * 10
            const offset = circumference - (percentage / 100) * circumference;
            
            if (circle) circle.style.strokeDashoffset = offset;
            if (text) text.textContent = Math.round(percentage);
        }

        function createFileItem(fileData, index) {
            const file = fileData.file;
            const status = fileData.status || 'ready';
            
            // Find template within the current container
            const template = uploadContainer.querySelector('template');
            if (!template) {
                return document.createElement('div');
            }
            
            const fileItem = template.content.cloneNode(true).querySelector('.file-item');
            
            // Set appropriate classes and attributes
            if (status === 'uploading') {
                fileItem.className = 'file-item uploading';
            } else {
                fileItem.className = `file-item ${status}`;
            }
            
            fileItem.dataset.index = index;
            fileItem.dataset.fileId = fileData.id;
            
            // Update content
            const fileName = fileItem.querySelector('.file-name');
            const fileSize = fileItem.querySelector('.file-size');
            const fileType = fileItem.querySelector('.file-type');
            const fileStatus = fileItem.querySelector('.file-status');
            const fileIcon = fileItem.querySelector('.file-icon');
            const progressCircle = fileItem.querySelector('.progress-circle');
            const removeButton = fileItem.querySelector('.remove-file');
            const fileError = fileItem.querySelector('.file-error');
            const errorMessage = fileItem.querySelector('.error-message');
            
            if (fileName) fileName.textContent = file.name;
            if (fileSize) fileSize.textContent = formatFileSize(file.size);
            if (fileType) fileType.textContent = file.type || 'Unknown';
            if (fileStatus) fileStatus.textContent = getStatusText(status);
            if (removeButton) removeButton.setAttribute('data-file-id', fileData.id);
            
            // Handle icon vs progress bar vs error display
            if (status === 'uploading' || status === 'processing') {
                if (fileIcon) fileIcon.style.display = 'none';
                if (progressCircle) progressCircle.style.display = 'flex';
                if (fileError) fileError.style.display = 'none';
                
                // Add processing class to file item for processing status
                if (status === 'processing') {
                    fileItem.classList.add('processing');
                } else {
                    fileItem.classList.remove('processing');
                }
            } else if (status === 'error') {
                if (fileIcon) fileIcon.style.display = '';
                if (progressCircle) progressCircle.style.display = 'none';
                if (fileError && errorMessage) {
                    fileError.style.display = 'flex';
                    errorMessage.textContent = fileData.error || 'Upload failed';
                }
                fileItem.classList.add('error');
            } else {
                if (fileIcon) fileIcon.style.display = '';
                if (progressCircle) progressCircle.style.display = 'none';
                if (fileError) fileError.style.display = 'none';
                fileItem.classList.remove('error', 'processing');
            }
            
            // Update progress if uploading or processing
            if ((status === 'uploading' || status === 'processing') && fileData.progress > 0) {
                updateProgressInItem(fileItem, fileData.progress);
            }
            
            return fileItem;
        }
        
        function getStatusText(status) {
            const statusMap = {
                'ready': '',
                'uploading': 'Uploading...',
                'processing': 'Processing...',
                'complete': 'Complete',
                'error': 'Failed'
            };
            return statusMap[status] || '';
        }
        
        function updateProgressInItem(fileItem, progress) {
            const progressElement = fileItem.querySelector('.progress-circle');
            if (progressElement) {
                const circle = progressElement.querySelector('.progress-bar');
                const text = progressElement.querySelector('.progress-number');
                if (circle && text) {
                    const circumference = 62.83;
                    const offset = circumference - (progress / 100) * circumference;
                    circle.style.strokeDashoffset = offset;
                    text.textContent = Math.round(progress);
                }
            }
        }

        function updateFileList() {
            fileList.innerHTML = '';
            
            if (uploadedFiles.length > 0) {
                uploadedFiles.forEach((fileData, index) => {
                    const fileItem = createFileItem(fileData, index);
                    fileList.appendChild(fileItem);
                });
            }
        }

        function validateFile(file) {
            const config = getConfig();
            const errors = [];

            // Check file size
            if (file.size > config.maxFileSize) {
                errors.push(`File size exceeds ${formatFileSize(config.maxFileSize)}`);
            }

            // Check file type
            if (config.allowedTypes) {
                const fileExtension = file.name.split('.').pop().toLowerCase();
                if (!config.allowedTypes.includes(fileExtension)) {
                    errors.push(`File type .${fileExtension} not allowed`);
                }
            }

            return errors;
        }

        function handleFiles(files) {
            const fileArray = Array.from(files);
            const validFiles = [];
            const errors = [];


            // Validate files
            fileArray.forEach(file => {
                const fileErrors = validateFile(file);
                if (fileErrors.length === 0) {
                    validFiles.push({
                        file: file,
                        status: 'ready',
                        progress: 0,
                        id: Date.now() + '_' + Math.random().toString().substr(2, 6)
                    });
                } else {
                    errors.push({ file: file, errors: fileErrors });
                }
            });


            // Handle file storage based on upload type (check dynamically)
            const isSingleFile = uploadContainer.classList.contains('single-file');
            if (isSingleFile) {
                uploadedFiles = validFiles.slice(0, 1); // Replace with only first valid file
            } else {
                uploadedFiles = uploadedFiles.concat(validFiles);
            }

            // Get current config (dynamic)
            const config = getConfig();

            // Don't immediately show files in list if auto-upload is enabled
            // Let the upload process handle the display
            if (!(config.autoUpload && config.uploadUrl)) {
                updateFileList();
            }

            // Dispatch events
            if (validFiles.length > 0) {
                uploadContainer.dispatchEvent(new CustomEvent('filesSelected', {
                    detail: { 
                        files: validFiles.map(f => f.file),
                        allFiles: uploadedFiles.map(f => f.file),
                        fileData: validFiles
                    }
                }));

                // Auto-upload if configured
                if (config.autoUpload && config.uploadUrl) {
                    validFiles.forEach(fileData => uploadFile(fileData));
                } else {
                }
            }

            if (errors.length > 0) {
                uploadContainer.dispatchEvent(new CustomEvent('fileValidationError', {
                    detail: { errors: errors }
                }));
            }
        }

        function uploadFile(fileData) {
            const index = uploadedFiles.findIndex(f => f.id === fileData.id);
            if (index === -1) return;


            const formData = new FormData();
            formData.append('file', fileData.file);

            // Allow modification of form data before upload
            const beforeUploadEvent = new CustomEvent('beforeUpload', {
                bubbles: true,
                cancelable: true,
                detail: { 
                    fileData: fileData, 
                    formData: formData,
                    cancel: false
                }
            });
            uploadContainer.dispatchEvent(beforeUploadEvent);

            // Check if upload was cancelled
            if (beforeUploadEvent.detail.cancel) {
                return;
            }

            // Update status to uploading and show in list (only if not cancelled)
            uploadedFiles[index].status = 'uploading';
            updateFileList();

            const xhr = new XMLHttpRequest();

            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable) {
                    const percentComplete = (e.loaded / e.total) * 100;
                    uploadedFiles[index].progress = percentComplete;
                    
                    // Update progress bar
                    const fileItem = fileList.querySelector(`[data-index="${index}"]`);
                    const progressElement = fileItem?.querySelector('.progress-circle');
                    if (progressElement) {
                        updateProgress(progressElement, percentComplete);
                    }

                    uploadContainer.dispatchEvent(new CustomEvent('uploadProgress', {
                        detail: { 
                            fileData: fileData,
                            progress: percentComplete
                        }
                    }));
                }
            });

            xhr.addEventListener('load', () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    uploadedFiles[index].status = 'complete';
                    uploadedFiles[index].response = xhr.response;
                    
                    uploadContainer.dispatchEvent(new CustomEvent('uploadSuccess', {
                        detail: { 
                            fileData: fileData,
                            response: xhr.response
                        }
                    }));
                } else {
                    uploadedFiles[index].status = 'error';
                    uploadedFiles[index].error = xhr.statusText;
                    
                    uploadContainer.dispatchEvent(new CustomEvent('uploadError', {
                        detail: { 
                            fileData: fileData,
                            error: xhr.statusText,
                            status: xhr.status
                        }
                    }));
                }
                updateFileList();
            });

            xhr.addEventListener('error', () => {
                uploadedFiles[index].status = 'error';
                uploadedFiles[index].error = 'Network error';
                
                uploadContainer.dispatchEvent(new CustomEvent('uploadError', {
                    detail: { 
                        fileData: fileData,
                        error: 'Network error'
                    }
                }));
                updateFileList();
            });

            const config = getConfig();
            xhr.open('POST', config.uploadUrl);
            xhr.send(formData);
        }

        // Public API for manual upload
        uploadContainer.uploadFiles = function(files = null) {
            const filesToUpload = files || uploadedFiles.filter(f => f.status === 'ready');
            filesToUpload.forEach(fileData => uploadFile(fileData));
        };

        // Public controller for external file upload control
        const ndsFileUpload = {
            // File Management
            addFile: function(file, options = {}) {
                const fileData = {
                    file: file,
                    id: Date.now() + '_' + Math.random().toString().substr(2, 6),
                    status: options.status || 'ready',
                    progress: options.progress || 0,
                    error: options.error || null
                };
                
                const isSingleFile = uploadContainer.classList.contains('single-file');
                if (isSingleFile) {
                    uploadedFiles = [fileData];
                } else {
                    uploadedFiles.push(fileData);
                }
                
                updateFileList();
                return fileData.id;
            },
            
            removeFile: function(fileId) {
                const index = uploadedFiles.findIndex(f => f.id === fileId);
                if (index !== -1) {
                    uploadedFiles.splice(index, 1);
                    updateFileList();
                    return true;
                } else {
                }
                return false;
            },
            
            clearAllFiles: function() {
                uploadedFiles = [];
                updateFileList();
            },
            
            // Status Management
            setFileStatus: function(fileId, status, options = {}) {
                const file = uploadedFiles.find(f => f.id === fileId);
                if (file) {
                    file.status = status;
                    if (options.progress !== undefined) file.progress = options.progress;
                    if (options.error) file.error = options.error;
                    updateFileList();
                    return true;
                }
                return false;
            },
            
            setFileProgress: function(fileId, progress) {
                const file = uploadedFiles.find(f => f.id === fileId);
                if (file) {
                    file.progress = progress;
                    if (progress >= 100 && file.status === 'uploading') {
                        file.status = 'processing';
                    } else if (file.status !== 'uploading' && file.status !== 'processing') {
                        file.status = 'uploading';
                    }
                    
                    // Update UI efficiently - just update this file's progress
                    const fileItem = fileList.querySelector(`[data-file-id="${fileId}"]`);
                    if (fileItem) {
                        updateProgressInItem(fileItem, progress);
                        
                        // Update status if complete
                        if (progress >= 100) {
                            // Trigger full UI refresh for completion
                            updateFileList();
                        }
                    }
                    return true;
                }
                return false;
            },
            
            // File Information
            getFile: function(fileId) {
                return uploadedFiles.find(f => f.id === fileId) || null;
            },
            
            getAllFiles: function() {
                return [...uploadedFiles];
            },
            
            getFilesByStatus: function(status) {
                return uploadedFiles.filter(f => f.status === status);
            },
            
            // UI Control
            refreshUI: function() {
                updateFileList();
            },
            
            // Upload Control
            startUpload: function(fileId = null) {
                if (fileId) {
                    const fileData = uploadedFiles.find(f => f.id === fileId);
                    if (fileData) uploadFile(fileData);
                } else {
                    const readyFiles = uploadedFiles.filter(f => f.status === 'ready');
                    readyFiles.forEach(fileData => uploadFile(fileData));
                }
            },
            
            // Event Dispatching
            dispatchEvent: function(eventName, detail) {
                uploadContainer.dispatchEvent(new CustomEvent(eventName, { 
                    bubbles: true, 
                    detail: detail 
                }));
            }
        };

        // Store controller instance on the container for external access
        uploadContainer.ndsFileUpload = ndsFileUpload;

        // Event listeners
        fileInput.addEventListener('change', function(e) {
            const currentConfig = getConfig();
            if (e.target.files.length > 0) {
                handleFiles(e.target.files);
            } else {
            }
        });

        // Event delegation for remove buttons
        fileList.addEventListener('click', function(e) {
            const removeButton = e.target.closest('.remove-file');
            if (removeButton) {
                e.preventDefault();
                e.stopPropagation();
                const fileId = removeButton.getAttribute('data-file-id');
                const removedFile = uploadedFiles.find(f => f.id == fileId);
                
                if (removedFile) {
                    // Dispatch event before removing
                    uploadContainer.dispatchEvent(new CustomEvent('fileRemoved', {
                        detail: { fileData: removedFile, fileId: fileId }
                    }));
                    
                    ndsFileUpload.removeFile(fileId);
                } else {
                }
            }
        });

        // Drag and drop functionality
        let dragOverHandler, dragLeaveHandler, dropHandler, uploadZoneClickHandler;
        let dragListenersActive = false;

        function initDragAndDrop() {
            if (dropZone && uploadZone && uploadContainer.classList.contains('dropBox') && !dragListenersActive) {
                if (!dragOverHandler) {
                    dragOverHandler = function(e) {
                        e.preventDefault();
                        dropZone.classList.add('drag-over');
                        uploadContainer.classList.add('dropBoxActive');
                    };
                    
                    dragLeaveHandler = function(e) {
                        e.preventDefault();
                        if (!dropZone.contains(e.relatedTarget)) {
                            dropZone.classList.remove('drag-over');
                            uploadContainer.classList.remove('dropBoxActive');
                        }
                    };
                    
                    dropHandler = function(e) {
                        e.preventDefault();
                        dropZone.classList.remove('drag-over');
                        uploadContainer.classList.remove('dropBoxActive');
                        
                        const files = e.dataTransfer.files;
                        if (files.length > 0) {
                            handleFiles(files);
                        }
                    };
                    
                    uploadZoneClickHandler = function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        fileInput.click();
                    };
                }

                dropZone.addEventListener('dragover', dragOverHandler);
                dropZone.addEventListener('dragleave', dragLeaveHandler);
                dropZone.addEventListener('drop', dropHandler);
                uploadZone.addEventListener('click', uploadZoneClickHandler);
                dragListenersActive = true;
            }
        }

        function removeDragAndDrop() {
            if (dropZone && uploadZone && dragListenersActive) {
                dropZone.removeEventListener('dragover', dragOverHandler);
                dropZone.removeEventListener('dragleave', dragLeaveHandler);
                dropZone.removeEventListener('drop', dropHandler);
                uploadZone.removeEventListener('click', uploadZoneClickHandler);
                dropZone.classList.remove('drag-over');
                uploadContainer.classList.remove('dropBoxActive');
                dragListenersActive = false;
            }
        }

        function updateDragAndDrop() {
            removeDragAndDrop();
            initDragAndDrop();
        }

        // Initialize drag and drop
        initDragAndDrop();

        // Monitor dropBox class changes
        let lastDropBoxState = uploadContainer ? uploadContainer.classList.contains('dropBox') : false;
        
        setInterval(function() {
            if (uploadContainer) {
                const currentDropBoxState = uploadContainer.classList.contains('dropBox');
                if (currentDropBoxState !== lastDropBoxState) {
                    updateDragAndDrop();
                    lastDropBoxState = currentDropBoxState;
                }
            }
        }, 100);

        // Browse button functionality
        if (browseBtn) {
            browseBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                fileInput.click();
            });
        } else {
        }
    }

    // Backward compatibility
    window.VoiceRecognition = VoiceRecognition;
    window.reinitFormControlClasses = init;

    // Enhanced global exports
    window.NDS.Forms.FileUpload = {
        initializeFileUploads: initializeFileUploads,
        getInstance: function(element) {
            const uploadContainer = element.closest('.nds-file-upload');
            if (uploadContainer && uploadContainer.ndsFileUpload) {
                return uploadContainer.ndsFileUpload;
            }
            return null;
        },
        reinit: function() {
            initializeFileUploads();
        }
    };

    // Mark forms script as loaded
    window.NDS.Forms._loaded = true;

    // File uploads are now initialized as part of the main init() function

})();