// NDS Forms Controller - Form Control Logic
// File: nds-forms.js

(function () {
    'use strict';

    // Scroll field into view utility
    function scrollFieldIntoView(el) {
        // Wait for keyboard + layout to settle
        requestAnimationFrame(function() {
            requestAnimationFrame(function() {
                el.scrollIntoView({ block: "center", inline: "nearest", behavior: "smooth" });
            });
        });
    }

    // Global focusin listener for all form fields
    document.addEventListener("focusin", function(e) {
        var el = e.target;
        if (el.matches("input, textarea, select, [contenteditable='true']")) {
            scrollFieldIntoView(el);
        }
    });

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
    function updateFormState(input, formControl, skipValidation) {
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

        // Skip validation if requested (for input event while typing)
        if (skipValidation) {
            return;
        }

        // Add error state based on HTML5 validation
        var isInvalid = false;
        if (input.validity) {
            isInvalid = !input.validity.valid;
        }

        // IMPORTANT: Clear custom validation errors when HTML5 validation passes
        // This ensures aria-invalid doesn't keep the error state active
        if (!isInvalid && input.validationMessage) {
            input.setCustomValidity('');
        }

        formControl.classList.toggle('error', isInvalid);

        // Update error message in form footer
        updateErrorMessage(input, formControl, isInvalid);
    }

    // Update error message in feedback placeholder
    function updateErrorMessage(input, formControl, isInvalid) {
        var formContainer = formControl.closest('.nds-form-container');
        if (!formContainer) return;

        // Find the feedback placeholder (can be anywhere in form container)
        var feedbackPlaceholder = formContainer.querySelector('.nds-feedback');
        if (!feedbackPlaceholder) return;

        var msgElement = feedbackPlaceholder.querySelector('.msg');
        if (!msgElement) return;

        if (isInvalid) {
            var errorMessage = getValidationMessage(input);

            // Store original content ONLY if feedback is not currently in error state
            if (!msgElement._originalContent && !feedbackPlaceholder.classList.contains('error')) {
                msgElement._originalContent = msgElement.textContent;
            }

            // Add error class and show feedback
            feedbackPlaceholder.classList.add('error');
            feedbackPlaceholder.classList.remove('hidden');

            // Add nds-error class to icon if not present
            var iconElement = feedbackPlaceholder.querySelector('.nds-feedback-icon');
            if (iconElement && !iconElement.classList.contains('nds-error')) {
                iconElement.classList.add('nds-error');
            }

            // Update message text with error
            msgElement.textContent = errorMessage;

            // Set aria-describedby for accessibility
            if (!feedbackPlaceholder.id) {
                feedbackPlaceholder.id = 'error-' + (input.id || 'input-' + Date.now());
            }
            input.setAttribute('aria-describedby', feedbackPlaceholder.id);
            input.setAttribute('aria-invalid', 'true');
        } else {
            // Remove error class
            feedbackPlaceholder.classList.remove('error');

            // Remove nds-error class from icon
            var iconElement = feedbackPlaceholder.querySelector('.nds-feedback-icon');
            if (iconElement) {
                iconElement.classList.remove('nds-error');
            }

            // Restore original content if it was stored
            var hadOriginalContent = msgElement._originalContent !== undefined;
            if (hadOriginalContent) {
                msgElement.textContent = msgElement._originalContent;
                delete msgElement._originalContent; // Clean up stored reference

                // Check if restored content is not empty
                var msgText = msgElement.textContent.trim();
                if (msgText && msgText !== '') {
                    // Show feedback with restored original content
                    feedbackPlaceholder.classList.remove('hidden');
                } else {
                    // Restored content is empty, hide the feedback
                    feedbackPlaceholder.classList.add('hidden');
                }
            }
            // If no original content was stored, don't modify the hidden state
            // (preserve whatever visibility state it had before the error)

            input.removeAttribute('aria-describedby');
            input.removeAttribute('aria-invalid');
        }
    }

    // Get current language helper
    function getCurrentLanguage() {
        var htmlLang = document.documentElement.lang || 'en';
        return htmlLang.split('-')[0].toLowerCase();
    }

    // Get validation error message
    function getValidationMessage(input) {
        var validity = input.validity;

        // Check for custom validation message first
        if (input.hasAttribute('data-error-message')) {
            return input.getAttribute('data-error-message');
        }

        // Detect language at the time of error (delayed check)
        var isArabic = getCurrentLanguage() === 'ar';

        // Fallback to default messages based on validity state and language
        var errorMessage = '';

        if (validity.valueMissing) {
            errorMessage = isArabic ? 'هذا الحقل مطلوب' : 'This field is required';
        } else if (validity.typeMismatch) {
            if (input.type === 'email') {
                errorMessage = isArabic ? 'يرجى إدخال عنوان بريد إلكتروني صحيح' : 'Please enter a valid email address';
            } else if (input.type === 'url') {
                errorMessage = isArabic ? 'يرجى إدخال رابط صحيح' : 'Please enter a valid URL';
            }
        } else if (validity.tooShort) {
            errorMessage = isArabic
                ? 'المدخل قصير جداً (الحد الأدنى ' + input.minLength + ' حرف)'
                : 'Input is too short (minimum ' + input.minLength + ' characters)';
        } else if (validity.tooLong) {
            errorMessage = isArabic
                ? 'المدخل طويل جداً (الحد الأقصى ' + input.maxLength + ' حرف)'
                : 'Input is too long (maximum ' + input.maxLength + ' characters)';
        } else if (validity.rangeUnderflow) {
            errorMessage = isArabic
                ? 'القيمة يجب أن تكون على الأقل ' + input.min
                : 'Value must be at least ' + input.min;
        } else if (validity.rangeOverflow) {
            errorMessage = isArabic
                ? 'القيمة يجب ألا تزيد عن ' + input.max
                : 'Value must be no more than ' + input.max;
        } else if (validity.patternMismatch) {
            errorMessage = isArabic ? 'يرجى مطابقة التنسيق المطلوب' : 'Please match the requested format';
        } else {
            errorMessage = isArabic ? 'مدخل غير صحيح' : 'Invalid input';
        }

        return errorMessage;
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
    function initInputAutoFill() {
        // Find all auto-fill containers and initialize them
        document.querySelectorAll('.nds-autoFill[data-target]').forEach(function (container) {
            initAutoFillContainer(container);
        });
    }


    // Form control functionality
    function initFormControlClasses() {
        // Use the new container initialization approach
        initializeContainer(document.body);
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
                adjustDropdownPosition();
                // Focus first option for keyboard navigation
                if (options[0]) options[0].focus();
            } else {
                resetDropdownPosition();
            }
        }

        function adjustDropdownPosition() {
            // Wait for dropdown to be rendered
            setTimeout(function() {
                if (!dropdown || !formControl) return;

                // Get dropdown and form control positions
                var dropdownRect = dropdown.getBoundingClientRect();
                var formControlRect = formControl.getBoundingClientRect();
                var viewportHeight = window.innerHeight;
                var viewportWidth = window.innerWidth;

                // Calculate space below and above the input
                var spaceBelow = viewportHeight - formControlRect.bottom;
                var spaceAbove = formControlRect.top;
                var dropdownHeight = dropdownRect.height;

                // Vertical positioning: Check if there's not enough space below
                if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
                    // Position above the input
                    dropdown.style.top = 'unset';
                    dropdown.style.marginTop = 'unset';
                    dropdown.style.bottom = '100%';
                    dropdown.style.marginBottom = '4px';
                } else {
                    // Reset to default position (below the input)
                    dropdown.style.top = '';
                    dropdown.style.marginTop = '';
                    dropdown.style.bottom = '';
                    dropdown.style.marginBottom = '';
                }

                // Horizontal positioning: Check if dropdown goes off-screen
                var spaceOnRight = viewportWidth - dropdownRect.right;
                var spaceOnLeft = dropdownRect.left;

                // Check if dropdown goes off the right edge
                if (spaceOnRight < 0 && Math.abs(spaceOnRight) > 20) {
                    dropdown.style.left = 'auto';
                    dropdown.style.right = '0';
                }
                // Check if dropdown goes off the left edge
                else if (spaceOnLeft < 0 && Math.abs(spaceOnLeft) > 20) {
                    dropdown.style.right = 'auto';
                    dropdown.style.left = '0';
                }
                // Reset to default if it fits
                else {
                    dropdown.style.left = '';
                    dropdown.style.right = '';
                }
            }, 10);
        }

        function resetDropdownPosition() {
            if (!dropdown) return;

            // Reset all inline positioning styles
            dropdown.style.top = '';
            dropdown.style.marginTop = '';
            dropdown.style.bottom = '';
            dropdown.style.marginBottom = '';
            dropdown.style.left = '';
            dropdown.style.right = '';
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
        // Check hidden input first, then selectInput (for pre-populated forms)
        var initialValue = (hiddenInput ? hiddenInput.value : '') || selectInput.value;
        if (initialValue) {
            var matchingOption = Array.from(options).find(opt => opt.dataset.value === initialValue);
            if (matchingOption) {
                selectedValue = initialValue;
                var optionText = matchingOption.querySelector('.option-text');
                var text = optionText ? optionText.textContent : initialValue;
                // Update the visible input with the option text
                selectInput.value = text;
                updateSelectedOptions();
                // Update form state to show as filled
                updateFormState(selectInput, formControl);
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

    // Manual validation trigger
    function validateInput(input) {
        var formControl = input.closest('.nds-form-control');
        if (!formControl) return false;

        // Trigger HTML5 validation
        var isValid = input.checkValidity();

        // Update form state which will handle error display
        updateFormState(input, formControl);

        return isValid;
    }

    // Set custom error message
    function setCustomError(input, message) {
        var formControl = input.closest('.nds-form-control');
        if (!formControl) return;

        if (message) {
            input.setCustomValidity(message);
            input.setAttribute('aria-invalid', 'true');
        } else {
            input.setCustomValidity('');
            input.removeAttribute('aria-invalid');
        }

        updateFormState(input, formControl);
    }

    // Clear error state
    function clearError(input) {
        setCustomError(input, '');
    }

    // CRITICAL: Expose global API immediately (called by unified init system)
    window.NDS = window.NDS || {};
    window.NDS.Forms = {
        init: initializeAllForms,
        VoiceRecognition: VoiceRecognition,
        reinit: initializeAllForms,
        updateFormState: updateFormState,
        validateInput: validateInput,
        setCustomError: setCustomError,
        clearError: clearError,
        initializeContainer: initializeContainer,
        initializeDynamic: function(element) {
            // Alias for initializeContainer for backward compatibility
            initializeContainer(element);
        }
    };

    // Backward compatibility
    window.VoiceRecognition = VoiceRecognition;
    window.reinitFormControlClasses = initializeAllForms;

    // Mark forms script as loaded
    window.NDS.Forms._loaded = true;

    // Initialize feedback message observer to toggle show class
    function initFeedbackObserver() {
        var feedbackElements = document.querySelectorAll('.nds-feedback .msg');

        feedbackElements.forEach(function(msgElement) {
            var feedbackPlaceholder = msgElement.closest('.nds-feedback');
            var feedbackParent = feedbackPlaceholder ? feedbackPlaceholder.parentElement : null;

            if (!feedbackPlaceholder) return;

            // Check if parent should be toggled (only specific containers with feedback as only child)
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

            // Observe changes to message content
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

    function initializeAllForms() {
        VoiceRecognition.audioFeedback.init();
        initFormControlClasses();
        initInputAutoFill();
        initDynamicContentObserver();
        initFeedbackObserver();
        // File uploads are initialized by nds-fileUpload.js
    }

    // Note: Initialization now handled by nds-init.js unified system

    // Dynamic content observer to handle form controls added after page load
    function initDynamicContentObserver() {
        // Avoid creating multiple observers
        if (window.NDS && window.NDS.Forms && window.NDS.Forms._dynamicObserver) {
            return;
        }

        if (window.MutationObserver) {
            var observer = new MutationObserver(function(mutations) {
                var needsInit = false;
                var needsAutoFillInit = false;
                var needsFileUploadInit = false;

                mutations.forEach(function(mutation) {
                    if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach(function(node) {
                            if (node.nodeType === Node.ELEMENT_NODE) {
                                // Check if the added node is a form control or contains form controls
                                if (node.classList && node.classList.contains('nds-form-control')) {
                                    needsInit = true;
                                } else if (node.querySelectorAll && node.querySelectorAll('.nds-form-control').length > 0) {
                                    needsInit = true;
                                }

                                // Check for auto-fill containers
                                if (node.classList && node.classList.contains('nds-autoFill')) {
                                    needsAutoFillInit = true;
                                } else if (node.querySelectorAll && node.querySelectorAll('.nds-autoFill').length > 0) {
                                    needsAutoFillInit = true;
                                }

                                // Check for file upload containers
                                if (node.classList && node.classList.contains('nds-file-upload')) {
                                    needsFileUploadInit = true;
                                } else if (node.querySelectorAll && node.querySelectorAll('.nds-file-upload').length > 0) {
                                    needsFileUploadInit = true;
                                }
                            }
                        });
                    }
                });

                // Initialize only what's needed to avoid performance issues
                if (needsInit) {
                    initFormControlClasses();
                }
                if (needsAutoFillInit) {
                    initInputAutoFill();
                }
                if (needsFileUploadInit) {
                    initializeFileUploads();
                }
            });

            // Start observing
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });

            // Store observer reference to prevent duplicates
            if (!window.NDS.Forms) window.NDS.Forms = {};
            window.NDS.Forms._dynamicObserver = observer;
        }
    }

    // Utility function to initialize a specific container or element
    function initializeContainer(container) {
        if (!container) return;

        // Initialize form controls within the container
        var formControls = container.classList && container.classList.contains('nds-form-control') 
            ? [container] 
            : Array.from(container.querySelectorAll('.nds-form-control'));

        formControls.forEach(function(formControl) {
            // Skip elements inside code examples
            if (formControl.closest('code, .code-example')) {
                return;
            }
            
            var inputElements = formControl.querySelectorAll(':scope > input, :scope > textarea, :scope > select');

            inputElements.forEach(function (input) {
                // Skip if already initialized (check more carefully)
                if (input._ndsInitialized) return;
                input._ndsInitialized = true;

                // Apply all the same initialization as in initFormControlClasses
                initializeFormInput(input, formControl);
            });

            // Initialize specialized controls
            initVoiceInput(formControl);
            initPasswordToggle(formControl);
            initClearButton(formControl, inputElements);
            initSwitchControls(formControl);
        });

        // Initialize auto-fill containers
        var autoFillContainers = container.classList && container.classList.contains('nds-autoFill')
            ? [container]
            : Array.from(container.querySelectorAll('.nds-autoFill'));

        autoFillContainers.forEach(function(autoFillContainer) {
            initAutoFillContainer(autoFillContainer);
        });

        // Initialize file upload containers
        var fileUploadContainers = container.classList && container.classList.contains('nds-file-upload')
            ? [container]
            : Array.from(container.querySelectorAll('.nds-file-upload'));

        fileUploadContainers.forEach(function(uploadContainer) {
            // Initialize file upload using the separate nds-fileUpload.js module
            if (window.NDS && window.NDS.Forms && window.NDS.Forms.FileUpload && window.NDS.Forms.FileUpload.initFileUpload) {
                window.NDS.Forms.FileUpload.initFileUpload(uploadContainer);
            }
        });
    }

    // Extract form input initialization logic for reuse
    function initializeFormInput(input, formControl) {
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
            // Validate on blur (when user leaves the field)
            updateFormState(input, formControl);
        });

        // Value changes - clear previous errors but don't validate while typing
        input.addEventListener('input', function () {
            // Update UI (filled class, clear button)
            updateFormState(input, formControl, true);

            // If there was an error showing, clear it and restore original feedback
            var formContainer = formControl.closest('.nds-form-container');
            if (formContainer) {
                var feedbackPlaceholder = formContainer.querySelector('.nds-feedback');
                if (feedbackPlaceholder && feedbackPlaceholder.classList.contains('error')) {
                    feedbackPlaceholder.classList.remove('error');

                    var iconElement = feedbackPlaceholder.querySelector('.nds-feedback-icon');
                    if (iconElement) {
                        iconElement.classList.remove('nds-error');
                    }

                    var msgElement = feedbackPlaceholder.querySelector('.msg');
                    if (msgElement && msgElement._originalContent !== undefined) {
                        msgElement.textContent = msgElement._originalContent;
                        delete msgElement._originalContent;
                    }

                    formControl.classList.remove('error');
                    input.removeAttribute('aria-describedby');
                    input.removeAttribute('aria-invalid');
                }
            }
        });

        // Also listen for change for form validation compatibility
        input.addEventListener('change', function () {
            updateFormState(input, formControl);
            updateRadioGroup(input, formControl);
        });

        // Initialize state without validation on page load
        updateFormState(input, formControl, true);
        
        // Watch for all field status changes
        if (window.MutationObserver) {
            var inputObserver = new MutationObserver(function(mutations) {
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
            inputObserver.observe(input, {
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
    }

    // Extract auto-fill initialization logic for reuse
    function initAutoFillContainer(container) {
        if (!container) return;
        
        var targetId = container.getAttribute('data-target');
        if (!targetId) return;

        container.querySelectorAll('.nds-item').forEach(function (item) {
            if (item._autoFillHandler) {
                item.removeEventListener('click', item._autoFillHandler);
            }

            item._autoFillHandler = function (e) {
                e.preventDefault();
                e.stopPropagation();

                var itemText = (item.textContent || item.innerText).trim();
                // Clean up excessive whitespace and normalize spaces
                itemText = itemText.replace(/\s+/g, ' ');

                var targetInput = document.getElementById(targetId) ||
                    document.querySelector('[name="' + targetId + '"]') ||
                    document.querySelector('[data-name="' + targetId + '"]');

                if (targetInput && itemText) {
                    targetInput.value = itemText;
                    targetInput.focus();
                    triggerEvents(targetInput);

                    var formControl = targetInput.closest('.nds-form-control');
                    if (formControl) {
                        updateFormState(targetInput, formControl);
                    }
                }
            };

            item.addEventListener('click', item._autoFillHandler);
        });
    }


})();