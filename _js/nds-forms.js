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
        var datePickerContainer = formControl.closest('.nds-date-picker');
        if (!datePickerContainer) return;

        var dropdown = datePickerContainer.querySelector('.nds-date-picker-dropdown');
        var toggleBtn = datePickerContainer.querySelector('.date-picker-toggle');
        var monthDropdownBtn = datePickerContainer.querySelector('.month-dropdown-btn');
        var yearDropdownBtn = datePickerContainer.querySelector('.year-dropdown-btn');
        var monthDropdownMenu = datePickerContainer.querySelector('.month-dropdown-menu');
        var yearDropdownMenu = datePickerContainer.querySelector('.year-dropdown-menu');
        var prevBtn = datePickerContainer.querySelector('.prev-month');
        var nextBtn = datePickerContainer.querySelector('.next-month');
        var todayBtn = datePickerContainer.querySelector('.today-btn');
        var clearBtn = datePickerContainer.querySelector('.clear-btn');
        var datesContainer = datePickerContainer.querySelector('.calendar-dates');

        if (!dropdown) return;

        var currentDate = new Date();
        var selectedDate = null;
        var isRangeMode = datePickerContainer.classList.contains('dateRange');
        var rangeStart = null;
        var rangeEnd = null;
        var isInitialized = false;
        
        // Store event handlers for cleanup
        var monthDropdownHandler = null;
        var yearDropdownHandler = null;

        // Simple Gregorian calendar data
        var monthNames = {
            ar: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
            en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        };
        
        var weekdayNames = {
            ar: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
            en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        };
        
        var buttonLabels = {
            ar: {
                today: 'اليوم',
                clear: 'مسح'
            },
            en: {
                today: 'Today',
                clear: 'Clear'
            }
        };

        function toggleDropdown() {
            var isNowOpen = dropdown.classList.contains('hidden');
            dropdown.classList.toggle('hidden');
            formControl.classList.toggle('open', isNowOpen);
            
            if (isNowOpen) {
                // Initialize calendar on first open
                if (!isInitialized) {
                    initializeCalendar();
                } else {
                    updateCalendar();
                }
            } else {
                // De-initialize when closing
                deinitializeCalendar();
            }
        }

        function updateDropdowns() {
            // Only update if calendar is initialized
            if (!isInitialized) return;
            
            // Simple Gregorian calendar
            if (monthDropdownBtn) {
                var isArabic = document.documentElement.lang === 'ar';
                var monthNamesArray = isArabic ? monthNames.ar : monthNames.en;
                monthDropdownBtn.querySelector('.label').textContent = monthNamesArray[currentDate.getMonth()];
            }
            
            if (yearDropdownBtn) {
                yearDropdownBtn.querySelector('.label').textContent = currentDate.getFullYear();
            }
        }

        function handleRangeSelection(clickedDate) {
            // Check if range mode is enabled dynamically
            isRangeMode = datePickerContainer.classList.contains('dateRange');
            
            if (!isRangeMode) {
                // If not in range mode, treat as single date selection
                selectedDate = clickedDate;
                updateInput();
                updateCalendar();
                // Don't close calendar - let user close it manually
                return;
            }
            
            if (!rangeStart || (rangeStart && rangeEnd)) {
                // Start new range
                rangeStart = clickedDate;
                rangeEnd = null;
                updateCalendar();
            } else if (rangeStart && !rangeEnd) {
                // Complete the range
                if (clickedDate.getTime() >= rangeStart.getTime()) {
                    rangeEnd = clickedDate;
                } else {
                    // If clicked date is before start, swap them
                    rangeEnd = rangeStart;
                    rangeStart = clickedDate;
                }
                updateInput();
                updateCalendar();
                // Don't close calendar - let user close it manually or continue selecting
            }
        }

        function updateInput() {
            function formatDate(date) {
                // Simple Gregorian formatting
                var day = date.getDate().toString().padStart(2, '0');
                var month = (date.getMonth() + 1).toString().padStart(2, '0');
                var year = date.getFullYear();
                return day + '/' + month + '/' + year;
            }

            if (isRangeMode && rangeStart && rangeEnd) {
                dateInput.value = formatDate(rangeStart) + ' - ' + formatDate(rangeEnd);
                
                // Trigger events and update form state
                triggerEvents(dateInput);
                updateFormState(dateInput, formControl);
            } else if (!isRangeMode && selectedDate) {
                dateInput.value = formatDate(selectedDate);
                
                // Trigger events and update form state
                triggerEvents(dateInput);
                updateFormState(dateInput, formControl);
            }
        }

        function createDateButton(day, type) {
            var btn = document.createElement('button');
            btn.className = 'nds-btn nds-btn-subtle date-cell' + (type === 'other-month' ? ' other-month' : '');
            btn.type = 'button';
            btn.textContent = day;
            return btn;
        }

        function generateWeekdayHeaders() {
            var weekdaysContainer = dropdown.querySelector('.calendar-weekdays');
            if (!weekdaysContainer) return;
            
            weekdaysContainer.innerHTML = '';
            
            var isArabic = document.documentElement.lang === 'ar';
            var weekdayNamesArray = isArabic ? weekdayNames.ar : weekdayNames.en;
            
            weekdayNamesArray.forEach(function(name) {
                var weekdayElement = document.createElement('div');
                weekdayElement.className = 'weekday';
                weekdayElement.textContent = name;
                weekdaysContainer.appendChild(weekdayElement);
            });
        }

        function updateWeekdayHeaders() {
            generateWeekdayHeaders();
        }
        
        function updateButtonLabels() {
            var isArabic = document.documentElement.lang === 'ar';
            var labels = isArabic ? buttonLabels.ar : buttonLabels.en;
            
            // Update Today button
            if (todayBtn) {
                var todayLabelElement = todayBtn.querySelector('.label');
                if (todayLabelElement) {
                    todayLabelElement.textContent = labels.today;
                }
            }
            
            // Update Clear button
            if (clearBtn) {
                var clearLabelElement = clearBtn.querySelector('.label');
                if (clearLabelElement) {
                    clearLabelElement.textContent = labels.clear;
                }
            }
        }

        function updateCalendar() {
            if (!isInitialized || !datesContainer) return;
            
            // Check range mode dynamically
            isRangeMode = datePickerContainer.classList.contains('dateRange');
            
            // Simple calendar regeneration
            generateCalendarContent();
        }
        
        function generateCalendarContent() {
            // Only generate if calendar is initialized
            if (!isInitialized || !datesContainer) return;
            
            // Clear existing dates
            datesContainer.innerHTML = '';
            
            // Always use Gregorian calendar - keep it simple
            generateGregorianCalendar();
        }

        function generateGregorianCalendar() {
            var year = currentDate.getFullYear();
            var month = currentDate.getMonth();
            
            // First day of month and number of days
            var firstDay = new Date(year, month, 1).getDay();
            var daysInMonth = new Date(year, month + 1, 0).getDate();
            var daysInPrevMonth = new Date(year, month, 0).getDate();
            
            // Add previous month's trailing days
            for (var i = firstDay - 1; i >= 0; i--) {
                var day = daysInPrevMonth - i;
                var btn = createDateButton(day, 'other-month');
                datesContainer.appendChild(btn);
            }
            
            // Add current month's days
            for (var day = 1; day <= daysInMonth; day++) {
                var btn = createDateButton(day, 'current-month');
                var cellDate = new Date(year, month, day);
                
                // Check if today
                var today = new Date();
                if (cellDate.toDateString() === today.toDateString()) {
                    btn.classList.add('today');
                }
                
                // Check if selected (single date mode)
                if (!isRangeMode && selectedDate && cellDate.toDateString() === selectedDate.toDateString()) {
                    btn.classList.add('selected');
                }
                
                // Check if in range (range mode)
                if (isRangeMode) {
                    var isRangeStart = rangeStart && cellDate.toDateString() === rangeStart.toDateString();
                    var isRangeEnd = rangeEnd && cellDate.toDateString() === rangeEnd.toDateString();
                    var isInRange = rangeStart && rangeEnd && cellDate.getTime() > rangeStart.getTime() && cellDate.getTime() < rangeEnd.getTime();
                    
                    if (isRangeStart) {
                        btn.classList.add('range-start', 'selected');
                    }
                    if (isRangeEnd) {
                        btn.classList.add('range-end', 'selected');
                    }
                    if (isInRange) {
                        btn.classList.add('in-range');
                    }
                    
                    // Add visual continuity classes for styling
                    if (isRangeStart && rangeEnd) {
                        btn.classList.add('has-range-end');
                    }
                    if (isRangeEnd && rangeStart) {
                        btn.classList.add('has-range-start');
                    }
                }
                
                // Add click handler (use closure to capture cellDate)
                (function(date) {
                    btn.addEventListener('click', function() {
                        if (isRangeMode) {
                            handleRangeSelection(new Date(date));
                        } else {
                            selectedDate = new Date(date);
                            updateInput();
                            updateCalendar();
                            // Don't close calendar - let user close it manually
                        }
                    });
                })(cellDate);
                
                datesContainer.appendChild(btn);
            }
            
            // Add next month's leading days
            var totalCells = datesContainer.children.length;
            var remainingCells = 42 - totalCells; // 6 rows × 7 days
            for (var day = 1; day <= remainingCells && day <= 14; day++) {
                var btn = createDateButton(day, 'other-month');
                datesContainer.appendChild(btn);
            }
        }


        // Event listeners
        if (toggleBtn) {
            toggleBtn.addEventListener('click', toggleDropdown);
        }
        
        dateInput.addEventListener('click', toggleDropdown);

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            // Use setTimeout to ensure this runs after other click handlers
            setTimeout(function() {
                // Only handle dropdowns if calendar is initialized and open
                if (isInitialized && !dropdown.classList.contains('hidden')) {
                    var clickedElement = e.target;
                    
                    // Check if month dropdown should be closed
                    var monthDropdownOpen = monthDropdownMenu && !monthDropdownMenu.classList.contains('hidden');
                    if (monthDropdownOpen) {
                        var clickedInMonthArea = monthDropdownBtn && (
                            monthDropdownBtn.contains(clickedElement) || 
                            monthDropdownBtn === clickedElement
                        );
                        var clickedInMonthMenu = monthDropdownMenu && (
                            monthDropdownMenu.contains(clickedElement) || 
                            monthDropdownMenu === clickedElement
                        );
                        
                        // Close if clicked outside both button and menu
                        if (!clickedInMonthArea && !clickedInMonthMenu) {
                            monthDropdownMenu.classList.add('hidden');
                            monthDropdownBtn.setAttribute('aria-expanded', 'false');
                            monthDropdownBtn.classList.remove('open');
                        }
                    }
                    
                    // Check if year dropdown should be closed
                    var yearDropdownOpen = yearDropdownMenu && !yearDropdownMenu.classList.contains('hidden');
                    if (yearDropdownOpen) {
                        var clickedInYearArea = yearDropdownBtn && (
                            yearDropdownBtn.contains(clickedElement) || 
                            yearDropdownBtn === clickedElement
                        );
                        var clickedInYearMenu = yearDropdownMenu && (
                            yearDropdownMenu.contains(clickedElement) || 
                            yearDropdownMenu === clickedElement
                        );
                        
                        // Close if clicked outside both button and menu
                        if (!clickedInYearArea && !clickedInYearMenu) {
                            yearDropdownMenu.classList.add('hidden');
                            yearDropdownBtn.setAttribute('aria-expanded', 'false');
                            yearDropdownBtn.classList.remove('open');
                        }
                    }
                }
                
                // Then check if we should close the entire calendar
                if (!datePickerContainer.contains(e.target)) {
                    dropdown.classList.add('hidden');
                    formControl.classList.remove('open');
                    // De-initialize when closing
                    deinitializeCalendar();
                }
            }, 0);
        });
        
        // Prevent calendar dropdown from closing when clicking inside it, but close month/year dropdowns
        if (dropdown) {
            dropdown.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Close dropdowns when clicking on calendar content (but not on the dropdowns themselves)
                if (isInitialized) {
                    var clickedElement = e.target;
                    
                    // Check if clicked outside month dropdown
                    var clickedInMonthArea = monthDropdownBtn && (
                        monthDropdownBtn.contains(clickedElement) || 
                        monthDropdownBtn === clickedElement
                    );
                    var clickedInMonthMenu = monthDropdownMenu && (
                        monthDropdownMenu.contains(clickedElement) || 
                        monthDropdownMenu === clickedElement
                    );
                    
                    // Close month dropdown if not clicking in its area
                    if (monthDropdownMenu && !monthDropdownMenu.classList.contains('hidden') && 
                        !clickedInMonthArea && !clickedInMonthMenu) {
                        monthDropdownMenu.classList.add('hidden');
                        monthDropdownBtn.setAttribute('aria-expanded', 'false');
                        monthDropdownBtn.classList.remove('open');
                    }
                    
                    // Check if clicked outside year dropdown
                    var clickedInYearArea = yearDropdownBtn && (
                        yearDropdownBtn.contains(clickedElement) || 
                        yearDropdownBtn === clickedElement
                    );
                    var clickedInYearMenu = yearDropdownMenu && (
                        yearDropdownMenu.contains(clickedElement) || 
                        yearDropdownMenu === clickedElement
                    );
                    
                    // Close year dropdown if not clicking in its area
                    if (yearDropdownMenu && !yearDropdownMenu.classList.contains('hidden') && 
                        !clickedInYearArea && !clickedInYearMenu) {
                        yearDropdownMenu.classList.add('hidden');
                        yearDropdownBtn.setAttribute('aria-expanded', 'false');
                        yearDropdownBtn.classList.remove('open');
                    }
                }
            });
        }

        // Generate dropdown options dynamically
        function regenerateDropdownOptions() {
            // Only regenerate if calendar is initialized
            if (!isInitialized) return;
            
            // Regenerate month options
            if (monthDropdownMenu) {
                monthDropdownMenu.innerHTML = '';
                
                var isArabic = document.documentElement.lang === 'ar';
                var monthNamesArray = isArabic ? monthNames.ar : monthNames.en;
                    
                monthNamesArray.forEach(function(monthName, index) {
                        var btn = document.createElement('button');
                        btn.className = 'nds-btn nds-btn-subtle month-option';
                        btn.setAttribute('role', 'menuitem');
                        btn.setAttribute('data-value', index);
                        btn.innerHTML = '<span class="label">' + monthName + '</span>';
                        
                        // Mark current month as selected
                        if (index === currentDate.getMonth()) {
                            btn.classList.add('selected');
                        }
                        
                        btn.addEventListener('click', function(e) {
                            e.preventDefault();
                            var monthValue = parseInt(this.dataset.value);
                            
                            // No conversion - use Gregorian date directly
                            currentDate.setMonth(monthValue);
                            
                            updateDropdowns();
                            updateCalendar();
                            
                            // Close dropdown
                            monthDropdownMenu.classList.add('hidden');
                            monthDropdownBtn.setAttribute('aria-expanded', false);
                            
                            // Update selected state
                            monthDropdownMenu.querySelectorAll('.month-option').forEach(function(opt) {
                                opt.classList.remove('selected');
                            });
                            this.classList.add('selected');
                        });
                        
                        monthDropdownMenu.appendChild(btn);
                    });
            }
            
            // Regenerate year options
            if (yearDropdownMenu) {
                yearDropdownMenu.innerHTML = '';
                
                var currentYear, startYear, endYear;
                
                // Get year range from data attributes or use defaults
                var yearRangeBefore = parseInt(yearDropdownMenu.dataset.yearBefore) || 5;
                var yearRangeAfter = parseInt(yearDropdownMenu.dataset.yearAfter) || 5;
                
                // Simple Gregorian year range - always use current year (today) for range calculation
                var todayYear = new Date().getFullYear();
                startYear = todayYear - yearRangeBefore;
                endYear = todayYear + yearRangeAfter;
                
                // But keep the currently viewed year for selection highlighting
                currentYear = currentDate.getFullYear();
                
                generateYearOptions(startYear, endYear, currentYear);
            }
            
            function generateYearOptions(startYear, endYear, currentYear) {
                if (!yearDropdownMenu) return;
                
                
                // Validate inputs
                if (isNaN(startYear) || isNaN(endYear) || isNaN(currentYear)) {
                    return;
                }
                
                for (var year = startYear; year <= endYear; year++) {
                    var btn = document.createElement('button');
                    btn.className = 'nds-btn nds-btn-subtle year-option';
                    btn.setAttribute('role', 'menuitem');
                    btn.setAttribute('data-value', year);
                    
                    // Clean year display
                    btn.innerHTML = '<span class="label">' + year + '</span>';
                    
                    if (year === currentYear) {
                        btn.classList.add('selected');
                    }
                    
                    btn.addEventListener('click', function(e) {
                        e.preventDefault();
                        var yearValue = parseInt(this.dataset.value);
                        
                        // No conversion - use Gregorian date directly
                        currentDate.setFullYear(yearValue);
                        
                        updateDropdowns();
                        updateCalendar();
                        
                        // Close dropdown
                        yearDropdownMenu.classList.add('hidden');
                        yearDropdownBtn.setAttribute('aria-expanded', false);
                        
                        // Update selected state
                        yearDropdownMenu.querySelectorAll('.year-option').forEach(function(opt) {
                            opt.classList.remove('selected');
                        });
                        this.classList.add('selected');
                    });
                    
                    yearDropdownMenu.appendChild(btn);
                }
            }
        }

        // Month/Year dropdown functionality
        function initCalendarDropdowns() {
            // Remove existing listeners first
            if (monthDropdownHandler && monthDropdownBtn) {
                monthDropdownBtn.removeEventListener('click', monthDropdownHandler);
            }
            if (yearDropdownHandler && yearDropdownBtn) {
                yearDropdownBtn.removeEventListener('click', yearDropdownHandler);
            }
            
            // Month dropdown
            if (monthDropdownBtn && monthDropdownMenu) {
                monthDropdownHandler = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var isCurrentlyOpen = !monthDropdownMenu.classList.contains('hidden');
                    monthDropdownMenu.classList.toggle('hidden', isCurrentlyOpen);
                    monthDropdownBtn.setAttribute('aria-expanded', !isCurrentlyOpen);
                    monthDropdownBtn.classList.toggle('open', !isCurrentlyOpen);
                    
                    // Close year dropdown if opening month dropdown
                    if (!isCurrentlyOpen && !yearDropdownMenu.classList.contains('hidden')) {
                        yearDropdownMenu.classList.add('hidden');
                        yearDropdownBtn.setAttribute('aria-expanded', false);
                        yearDropdownBtn.classList.remove('open');
                    }
                    
                    // Scroll to selected month when opening
                    if (!isCurrentlyOpen) {
                        setTimeout(function() {
                            var selectedOption = monthDropdownMenu.querySelector('.month-option.selected');
                            if (selectedOption) {
                                // Calculate scroll position relative to dropdown menu
                                var dropdownRect = monthDropdownMenu.getBoundingClientRect();
                                var optionRect = selectedOption.getBoundingClientRect();
                                var scrollTop = optionRect.top - dropdownRect.top + monthDropdownMenu.scrollTop - (dropdownRect.height / 2) + (optionRect.height / 2);
                                monthDropdownMenu.scrollTop = Math.max(0, scrollTop);
                            }
                        }, 10);
                    }
                };
                
                monthDropdownBtn.addEventListener('click', monthDropdownHandler);
                
                // Month options are now generated dynamically
            }
            
            // Year dropdown
            if (yearDropdownBtn && yearDropdownMenu) {
                yearDropdownHandler = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var isCurrentlyOpen = !yearDropdownMenu.classList.contains('hidden');
                    yearDropdownMenu.classList.toggle('hidden', isCurrentlyOpen);
                    yearDropdownBtn.setAttribute('aria-expanded', !isCurrentlyOpen);
                    yearDropdownBtn.classList.toggle('open', !isCurrentlyOpen);
                    
                    // Close month dropdown if opening year dropdown
                    if (!isCurrentlyOpen && !monthDropdownMenu.classList.contains('hidden')) {
                        monthDropdownMenu.classList.add('hidden');
                        monthDropdownBtn.setAttribute('aria-expanded', false);
                        monthDropdownBtn.classList.remove('open');
                    }
                    
                    // Scroll to selected year when opening
                    if (!isCurrentlyOpen) {
                        setTimeout(function() {
                            var selectedOption = yearDropdownMenu.querySelector('.year-option.selected');
                            if (selectedOption) {
                                // Calculate scroll position relative to dropdown menu
                                var dropdownRect = yearDropdownMenu.getBoundingClientRect();
                                var optionRect = selectedOption.getBoundingClientRect();
                                var scrollTop = optionRect.top - dropdownRect.top + yearDropdownMenu.scrollTop - (dropdownRect.height / 2) + (optionRect.height / 2);
                                yearDropdownMenu.scrollTop = Math.max(0, scrollTop);
                            }
                        }, 10);
                    }
                };
                
                yearDropdownBtn.addEventListener('click', yearDropdownHandler);
                
                // Year options are now generated dynamically
            }
            
        }

        // Navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                currentDate.setMonth(currentDate.getMonth() - 1);
                updateDropdowns();
                updateCalendar();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                currentDate.setMonth(currentDate.getMonth() + 1);
                updateDropdowns();
                updateCalendar();
            });
        }

        // Today button
        if (todayBtn) {
            todayBtn.addEventListener('click', function() {
                var today = new Date();
                
                // Check if in range mode dynamically
                isRangeMode = datePickerContainer.classList.contains('dateRange');
                
                if (isRangeMode) {
                    // Use range selection logic
                    handleRangeSelection(today);
                } else {
                    // Single date selection
                    selectedDate = new Date(today);
                }
                
                // Navigate to today's month
                currentDate = new Date(today);
                
                // Update display
                updateDropdowns();
                updateCalendar();
                updateInput();
            });
        }

        // Clear button
        if (clearBtn) {
            clearBtn.addEventListener('click', function() {
                selectedDate = null;
                rangeStart = null;
                rangeEnd = null;
                dateInput.value = '';
                updateCalendar();
                updateFormState(dateInput, formControl);
            });
        }

        // Watch for class changes to update calendar dynamically
        var classObserver = null;
        var pollingInterval = null;
        
        if (window.MutationObserver) {
            classObserver = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        var wasRange = isRangeMode;
                        
                        // Check current range mode
                        isRangeMode = datePickerContainer.classList.contains('dateRange');
                        
                        // If range mode changed, update calendar (only if initialized)
                        if (wasRange !== isRangeMode && isInitialized) {
                            updateCalendar();
                        }
                    }
                });
            });
            
            classObserver.observe(datePickerContainer, {
                attributes: true,
                attributeFilter: ['class']
            });
        }

        // Polling backup to catch class changes (in case MutationObserver fails)
        var lastRangeState = isRangeMode;
        
        pollingInterval = setInterval(function() {
            var currentRangeState = datePickerContainer.classList.contains('dateRange');
            
            if (lastRangeState !== currentRangeState) {
                isRangeMode = currentRangeState;
                lastRangeState = currentRangeState;
                
                // Clear range selection when switching modes (only if initialized)
                if (isInitialized) {
                    rangeStart = null;
                    rangeEnd = null;
                    updateCalendar();
                }
            }
        }, 100); // Check every 100ms
        
        // Listen for language changes
        var languageObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
                    // Only update if calendar is initialized
                    if (isInitialized) {
                        regenerateDropdownOptions();
                        updateDropdowns();
                        updateWeekdayHeaders();
                        updateButtonLabels();
                    }
                }
            });
        });
        
        languageObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['lang']
        });

        // Store cleanup functions for potential future use
        datePickerContainer._datePickerCleanup = function() {
            if (classObserver) {
                classObserver.disconnect();
            }
            if (languageObserver) {
                languageObserver.disconnect();
            }
            if (pollingInterval) {
                clearInterval(pollingInterval);
            }
        };

        // Initialize calendar (called lazily on first use)
        function initializeCalendar() {
            // Mark as initialized first to allow functions to run
            isInitialized = true;
            
            // Check if input has a valid date value and use it
            var inputValue = dateInput.value.trim();
            var parsedDate = null;
            
            if (inputValue) {
                // Check if it's a date range (contains " - ")
                if (inputValue.includes(' - ')) {
                    var rangeParts = inputValue.split(' - ');
                    if (rangeParts.length === 2) {
                        // Parse start date
                        var startParts = rangeParts[0].trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
                        var endParts = rangeParts[1].trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
                        
                        if (startParts && endParts) {
                            // Parse and validate start date
                            var startDay = parseInt(startParts[1], 10);
                            var startMonth = parseInt(startParts[2], 10) - 1;
                            var startYear = parseInt(startParts[3], 10);
                            var startDate = new Date(startYear, startMonth, startDay);
                            
                            // Parse and validate end date
                            var endDay = parseInt(endParts[1], 10);
                            var endMonth = parseInt(endParts[2], 10) - 1;
                            var endYear = parseInt(endParts[3], 10);
                            var endDate = new Date(endYear, endMonth, endDay);
                            
                            if (startDate.getDate() === startDay && 
                                startDate.getMonth() === startMonth && 
                                startDate.getFullYear() === startYear &&
                                endDate.getDate() === endDay && 
                                endDate.getMonth() === endMonth && 
                                endDate.getFullYear() === endYear) {
                                
                                parsedDate = startDate;
                                rangeStart = new Date(startDate);
                                rangeEnd = new Date(endDate);
                            }
                        }
                    }
                } else {
                    // Try to parse single date in DD/MM/YYYY format
                    var dateParts = inputValue.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
                    if (dateParts) {
                        var day = parseInt(dateParts[1], 10);
                        var month = parseInt(dateParts[2], 10) - 1; // Month is 0-indexed
                        var year = parseInt(dateParts[3], 10);
                        
                        // Validate the date
                        var testDate = new Date(year, month, day);
                        if (testDate.getDate() === day && 
                            testDate.getMonth() === month && 
                            testDate.getFullYear() === year) {
                            parsedDate = testDate;
                        }
                    }
                }
            }
            
            // Set currentDate to parsed date or today
            if (parsedDate) {
                currentDate = new Date(parsedDate);
                selectedDate = new Date(parsedDate);
            } else {
                currentDate = new Date();
            }
            
            regenerateDropdownOptions();
            initCalendarDropdowns();
            updateDropdowns();
            generateWeekdayHeaders();
            updateButtonLabels();
            generateCalendarContent();
        }
        
        // De-initialize calendar and clean up all rendered data
        function deinitializeCalendar() {
            if (!isInitialized) return;
            
            // Remove event listeners
            if (monthDropdownHandler && monthDropdownBtn) {
                monthDropdownBtn.removeEventListener('click', monthDropdownHandler);
                monthDropdownHandler = null;
            }
            if (yearDropdownHandler && yearDropdownBtn) {
                yearDropdownBtn.removeEventListener('click', yearDropdownHandler);
                yearDropdownHandler = null;
            }
            
            // Clear all rendered content
            if (monthDropdownMenu) {
                monthDropdownMenu.innerHTML = '';
            }
            if (yearDropdownMenu) {
                yearDropdownMenu.innerHTML = '';
            }
            
            // Remove open classes from buttons
            if (monthDropdownBtn) {
                monthDropdownBtn.classList.remove('open');
                monthDropdownBtn.setAttribute('aria-expanded', 'false');
            }
            if (yearDropdownBtn) {
                yearDropdownBtn.classList.remove('open');
                yearDropdownBtn.setAttribute('aria-expanded', 'false');
            }
            if (datesContainer) {
                datesContainer.innerHTML = '';
            }
            
            // Clear weekday headers
            var weekdaysContainer = dropdown.querySelector('.calendar-weekdays');
            if (weekdaysContainer) {
                weekdaysContainer.innerHTML = '';
            }
            
            // Reset state variables
            selectedDate = null;
            rangeStart = null;
            rangeEnd = null;
            isRangeMode = datePickerContainer.classList.contains('dateRange');
            
            // Mark as not initialized
            isInitialized = false;
        }
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
            
            var passwordInput = formControl.querySelector(':scope > input[type="password"], :scope > input[type="text"]');
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