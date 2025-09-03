// =====================================================
// NDS CALENDAR SYSTEM - AI IMPLEMENTATION GUIDE
// =====================================================
//
// SIMPLE HIJRI CALENDAR IMPLEMENTATION
// This module uses a SIMPLE approach that avoids overcomplication.
//
// KEY PRINCIPLE: KEEP IT SIMPLE
// ==============================
// - Calendar always uses JavaScript Date objects internally
// - Navigation, selection, ranges all work with standard Date objects
// - Hijri conversion happens ONLY at display boundaries
// - Don't overcomplicate with dual state management or complex math
//
// IMPLEMENTATION STRATEGY:
// ========================
// 
// 1. CALENDAR TYPE DETECTION:
//    - Container with class 'hijri' → Hijri calendar
//    - Otherwise → Gregorian calendar
//    - See detectCalendarType() function
//
// 2. WHAT WORKS AUTOMATICALLY:
//    - Calendar grid generation (uses standard Gregorian Date objects)
//    - Month/year navigation (single navigateMonth() method)
//    - Date selection, ranges, today button
//    - All UI interactions and event handlers
//
// 3. HIJRI DISPLAY CONVERSION:
//    - attachHijriData(): Uses browser's built-in Islamic calendar (Intl.DateTimeFormat)
//    - getDisplayDayNumber(): Shows _hijriDay if available, falls back to getDate()
//    - formatDate(): Shows Hijri format if _hijriDay/_hijriMonth/_hijriYear exist
//
// 4. WHAT'S ALREADY IMPLEMENTED:
//    ✅ CalendarConfig.hijri with Arabic/English month names
//    ✅ attachHijriData() using Intl.DateTimeFormat('en-US-u-ca-islamic')
//    ✅ Simple navigation that works for both calendar types
//    ✅ Display helpers that show Hijri when available
//    ✅ Circular reference fix (duplicated methods, not referenced)
//    ✅ Browser-based conversion (works for any date, not just today)
//
// 5. TESTING APPROACH:
//    - Test Gregorian calendar first (should work unchanged)
//    - Add 'hijri' class to container to test Hijri mode
//    - Verify dates display in Hijri format while navigation works normally
//    - No complex state management to debug
//
// 6. CRITICAL: AVOID OVERCOMPLICATION
//    - Don't add complex mathematical calculations
//    - Don't create dual calendar state systems
//    - Don't modify core Date object handling
//    - Use browser's built-in Islamic calendar (Intl.DateTimeFormat)
//    - Keep the calendar grid simple and standard
//
// 7. HIJRI CONVERSION DETAILS:
//    - NEVER use getHijriDate() - it only returns today's date, not arbitrary dates
//    - USE: Intl.DateTimeFormat('en-US-u-ca-islamic', {day: 'numeric', month: 'numeric', year: 'numeric'})
//    - This converts ANY date to Islamic calendar format
//    - Parse result as "month/day/year" format
//    - Works in all modern browsers, no external dependencies
//
// =====================================================

(function () {
    'use strict';

    // Calendar System Configuration
    var CalendarConfig = {
        gregorian: {
            type: 'gregorian',
            monthNames: {
                ar: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
                en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            },
            weekdayNames: {
                ar: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
                en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            },
            formatDate: function (date) {
                var day = String(date.getDate()).padStart(2, '0');
                var month = String(date.getMonth() + 1).padStart(2, '0');
                var year = date.getFullYear();
                return day + '/' + month + '/' + year;
            },
            parseDate: function (dateString) {
                var parts = dateString.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
                if (!parts) return null;

                var day = parseInt(parts[1], 10);
                var month = parseInt(parts[2], 10) - 1;
                var year = parseInt(parts[3], 10);

                var testDate = new Date(year, month, day);
                if (testDate.getDate() === day &&
                    testDate.getMonth() === month &&
                    testDate.getFullYear() === year) {
                    return testDate;
                }
                return null;
            },
            generateCalendarData: function (year, month) {
                var firstDay = new Date(year, month, 1);
                var lastDay = new Date(year, month + 1, 0);
                var startOfWeek = firstDay.getDay();

                return {
                    year: year,
                    month: month,
                    firstDay: firstDay,
                    lastDay: lastDay,
                    daysInMonth: lastDay.getDate(),
                    startOffset: startOfWeek
                };
            },
            getToday: function () {
                return new Date();
            },
            isSameDate: function (date1, date2) {
                return date1.getTime() === date2.getTime();
            }
        },

        // Hijri calendar implementation
        hijri: {
            type: 'hijri',
            monthNames: {
                ar: ['محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'],
                en: ['Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani', 'Jumada al-Ula', 'Jumada al-Akhirah', 'Rajab', 'Shaban', 'Ramadan', 'Shawwal', 'Dhu al-Qadah', 'Dhu al-Hijjah']
            },
            // Weekdays are same for both calendars
            weekdayNames: {
                ar: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
                en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            },

            formatDate: function (date) {
                // Use attached Hijri data if available, fallback to Gregorian format
                if (date._hijriDay && date._hijriMonth && date._hijriYear) {
                    return date._hijriDay + '/' + date._hijriMonth + '/' + date._hijriYear;
                }
                // Fallback to standard date format
                var day = String(date.getDate()).padStart(2, '0');
                var month = String(date.getMonth() + 1).padStart(2, '0');
                var year = date.getFullYear();
                return day + '/' + month + '/' + year;
            },

            generateCalendarData: function (year, month) {
                // Use standard Gregorian calendar grid, Hijri conversion happens at display
                var firstDay = new Date(year, month, 1);
                var lastDay = new Date(year, month + 1, 0);
                var startOfWeek = firstDay.getDay();

                return {
                    year: year,
                    month: month,
                    firstDay: firstDay,
                    lastDay: lastDay,
                    daysInMonth: lastDay.getDate(),
                    startOffset: startOfWeek
                };
            },


            // Common operations - duplicated to avoid circular references
            parseDate: function (dateString) {
                var parts = dateString.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
                if (parts) {
                    var day = parseInt(parts[1], 10);
                    var month = parseInt(parts[2], 10) - 1;
                    var year = parseInt(parts[3], 10);
                    var testDate = new Date(year, month, day);
                    if (testDate.getDate() === day &&
                        testDate.getMonth() === month &&
                        testDate.getFullYear() === year) {
                        return testDate;
                    }
                }
                return null;
            },
            getToday: function () {
                return new Date();
            },
            isSameDate: function (date1, date2) {
                return date1.getTime() === date2.getTime();
            }
        }
    };

    // UI Configuration
    var UIConfig = {
        buttonLabels: {
            ar: { today: 'اليوم', clear: 'مسح', save: 'حفظ' },
            en: { today: 'Today', clear: 'Clear', save: 'Save' }
        },
        selectors: {
            container: '.nds-date-picker',
            dropdown: '.nds-date-picker-dropdown',
            toggleBtn: '.date-picker-toggle',
            monthDropdownBtn: '.month-dropdown-btn',
            yearDropdownBtn: '.year-dropdown-btn',
            monthDropdownMenu: '.month-dropdown-menu',
            yearDropdownMenu: '.year-dropdown-menu',
            prevBtn: '.prev-month',
            nextBtn: '.next-month',
            todayBtn: '.today-btn',
            clearBtn: '.clear-btn',
            saveBtn: '.save-btn',
            datesContainer: '.calendar-dates'
        }
    };

    // Calendar Instance Class
    function DatePickerCalendar(dateInput, formControl) {
        this.elements = this.cacheElements(dateInput, formControl);
        if (!this.elements.dropdown) return;

        this.state = this.initializeState();
        this.handlers = {};
        this.observers = [];

        this.bindBasicEvents();
    }

    DatePickerCalendar.prototype = {
        // Cache DOM elements
        cacheElements: function (dateInput, formControl) {
            var container = formControl.closest(UIConfig.selectors.container);
            if (!container) return {};

            return {
                container: container,
                dropdown: container.querySelector(UIConfig.selectors.dropdown),
                toggleBtn: container.querySelector(UIConfig.selectors.toggleBtn),
                monthDropdownBtn: container.querySelector(UIConfig.selectors.monthDropdownBtn),
                yearDropdownBtn: container.querySelector(UIConfig.selectors.yearDropdownBtn),
                monthDropdownMenu: container.querySelector(UIConfig.selectors.monthDropdownMenu),
                yearDropdownMenu: container.querySelector(UIConfig.selectors.yearDropdownMenu),
                prevBtn: container.querySelector(UIConfig.selectors.prevBtn),
                nextBtn: container.querySelector(UIConfig.selectors.nextBtn),
                todayBtn: container.querySelector(UIConfig.selectors.todayBtn),
                clearBtn: container.querySelector(UIConfig.selectors.clearBtn),
                saveBtn: container.querySelector(UIConfig.selectors.saveBtn),
                datesContainer: container.querySelector(UIConfig.selectors.datesContainer),
                input: dateInput,
                formControl: formControl
            };
        },

        // Initialize calendar state
        initializeState: function () {
            return {
                currentDate: new Date(),
                selectedDate: null,
                rangeStart: null,
                rangeEnd: null,
                isInitialized: false,
                calendarType: this.detectCalendarType()
            };
        },

        detectCalendarType: function () {
            if (this.elements.container && this.elements.container.classList.contains('hijri')) {
                return 'hijri';
            }
            return 'gregorian';
        },

        // Utility methods
        getLanguage: function () {
            return document.documentElement.lang === 'ar' ? 'ar' : 'en';
        },

        getCurrentCalendar: function () {
            return CalendarConfig[this.state.calendarType];
        },

        isRangeMode: function () {
            return this.elements.container.classList.contains('dateRange');
        },

        // Simple helper methods
        getCurrentMonth: function () {
            return this.state.currentDate.getMonth();
        },

        getCurrentYear: function () {
            return this.state.currentDate.getFullYear();
        },

        getDisplayDayNumber: function (date, type) {
            if (this.state.calendarType === 'hijri' && date._hijriDay) {
                return date._hijriDay;
            }
            return date.getDate();
        },

        getMonthNames: function (lang) {
            var calendar = this.getCurrentCalendar();
            return calendar.monthNames[lang];
        },

        isTodayDate: function (date) {
            if (this.state.calendarType === 'hijri') {
                if (this.todaysHijriDate && date._hijriDay) {
                    return date._hijriDay === this.todaysHijriDate.day &&
                        date._hijriMonth === this.todaysHijriDate.month &&
                        date._hijriYear === this.todaysHijriDate.year;
                }
            }
            var today = new Date();
            return this.isSameDay(date, today);
        },

        attachHijriData: function (date) {
            // Simple: Only attach for Hijri calendars, only for display
            if (this.state.calendarType === 'hijri') {
                try {
                    // Use browser's built-in Islamic calendar conversion
                    var hijriString = new Intl.DateTimeFormat('en-US-u-ca-islamic', {
                        day: 'numeric', 
                        month: 'numeric', 
                        year: 'numeric'
                    }).format(date);
                    
                    // Parse the result (e.g., "9/15/1446" -> month/day/year)
                    var parts = hijriString.split('/');
                    if (parts.length === 3) {
                        date._hijriMonth = parseInt(parts[0], 10);
                        date._hijriDay = parseInt(parts[1], 10);
                        date._hijriYear = parseInt(parts[2], 10);
                    }
                } catch (e) {
                    // Fallback - just show Gregorian date
                }
            }
        },

        // Calendar lifecycle
        bindBasicEvents: function () {
            var self = this;

            // Toggle button
            if (this.elements.toggleBtn) {
                this.elements.toggleBtn.addEventListener('click', function () {
                    self.toggleDropdown();
                });
            }

            // Input click
            this.elements.input.addEventListener('click', function () {
                self.toggleDropdown();
            });

            // Outside click handler
            this.handlers.outsideClick = function (e) {
                self.handleOutsideClick(e);
            };
            document.addEventListener('click', this.handlers.outsideClick);

            // Prevent dropdown from closing when clicking inside
            if (this.elements.dropdown) {
                this.elements.dropdown.addEventListener('click', function (e) {
                    e.stopPropagation();
                    self.closeOtherDropdowns(e);
                });
            }
        },

        toggleDropdown: function () {
            var isNowOpen = this.elements.dropdown.classList.contains('hidden');
            this.elements.dropdown.classList.toggle('hidden');
            this.elements.formControl.classList.toggle('open', isNowOpen);

            if (isNowOpen) {
                if (!this.state.isInitialized) {
                    this.initializeCalendar();
                } else {
                    this.updateCalendar();
                }
            } else {
                this.deinitializeCalendar();
            }
        },

        initializeCalendar: function () {
            this.state.isInitialized = true;
            this.parseInitialValue();
            this.setupCalendarUI();
            this.bindCalendarEvents();
            this.setupLanguageObserver();
            this.render();
        },

        deinitializeCalendar: function () {
            if (!this.state.isInitialized) return;

            this.cleanup();
            this.state.isInitialized = false;
        },

        // Main render method
        render: function () {
            this.renderDropdowns();
            this.renderWeekdays();
            this.renderButtonLabels();
            this.renderCalendarDates();
        },

        // Cleanup on close
        cleanup: function () {
            // Remove calendar-specific event listeners
            if (this.handlers.monthDropdown) {
                this.elements.monthDropdownBtn.removeEventListener('click', this.handlers.monthDropdown);
            }
            if (this.handlers.yearDropdown) {
                this.elements.yearDropdownBtn.removeEventListener('click', this.handlers.yearDropdown);
            }

            // Clear rendered content
            if (this.elements.monthDropdownMenu) this.elements.monthDropdownMenu.innerHTML = '';
            if (this.elements.yearDropdownMenu) this.elements.yearDropdownMenu.innerHTML = '';
            if (this.elements.datesContainer) this.elements.datesContainer.innerHTML = '';

            // Reset button states
            this.resetButtonStates();

            // Clear state
            this.resetState();
        },

        // Parse initial input value
        parseInitialValue: function () {
            var inputValue = this.elements.input.value.trim();
            if (!inputValue) return;

            var calendar = this.getCurrentCalendar();

            // Handle range format
            if (inputValue.includes(' - ')) {
                var rangeParts = inputValue.split(' - ');
                if (rangeParts.length === 2) {
                    var startDate = calendar.parseDate(rangeParts[0].trim());
                    var endDate = calendar.parseDate(rangeParts[1].trim());

                    if (startDate && endDate) {
                        this.state.currentDate = new Date(startDate);
                        this.state.rangeStart = startDate;
                        this.state.rangeEnd = endDate;
                        return;
                    }
                }
            }

            // Handle single date format
            var parsedDate = calendar.parseDate(inputValue);
            if (parsedDate) {
                this.state.currentDate = new Date(parsedDate);
                this.state.selectedDate = parsedDate;
            }
        },

        // Setup calendar UI components
        setupCalendarUI: function () {
            this.updateDropdowns();
            this.renderWeekdays();
            this.renderButtonLabels();
        },

        // Bind calendar-specific events
        bindCalendarEvents: function () {
            this.bindNavigationEvents();
            this.bindDropdownEvents();
            this.bindActionEvents();
        },

        // Bind navigation events (prev/next month)
        bindNavigationEvents: function () {
            var self = this;

            if (this.elements.prevBtn) {
                this.elements.prevBtn.addEventListener('click', function () {
                    self.navigateMonth(-1);
                });
            }

            if (this.elements.nextBtn) {
                this.elements.nextBtn.addEventListener('click', function () {
                    self.navigateMonth(1);
                });
            }
        },

        // Simple month navigation - works for both calendar types
        navigateMonth: function (direction) {
            var year = this.state.currentDate.getFullYear();
            var month = this.state.currentDate.getMonth();

            // Calculate new month and year
            month += direction;
            if (month < 0) {
                month = 11;
                year--;
            } else if (month > 11) {
                month = 0;
                year++;
            }

            // Keep the same day, just change month/year - let Date constructor handle invalid dates
            this.state.currentDate.setFullYear(year);
            this.state.currentDate.setMonth(month);

            this.updateDropdowns();
            this.renderCalendarDates();
        },

        // Bind dropdown events
        bindDropdownEvents: function () {
            this.bindMonthDropdown();
            this.bindYearDropdown();
        },

        // Bind month dropdown
        bindMonthDropdown: function () {
            if (!this.elements.monthDropdownBtn) return;

            var self = this;
            this.handlers.monthDropdown = function (e) {
                e.preventDefault();
                e.stopPropagation();
                self.toggleMonthDropdown();
            };

            this.elements.monthDropdownBtn.addEventListener('click', this.handlers.monthDropdown);
        },

        // Bind year dropdown
        bindYearDropdown: function () {
            if (!this.elements.yearDropdownBtn) return;

            var self = this;
            this.handlers.yearDropdown = function (e) {
                e.preventDefault();
                e.stopPropagation();
                self.toggleYearDropdown();
            };

            this.elements.yearDropdownBtn.addEventListener('click', this.handlers.yearDropdown);
        },

        // Bind action events (today/clear/save buttons)
        bindActionEvents: function () {
            var self = this;

            if (this.elements.todayBtn) {
                this.elements.todayBtn.addEventListener('click', function () {
                    self.selectToday();
                });
            }

            if (this.elements.clearBtn) {
                this.elements.clearBtn.addEventListener('click', function () {
                    self.clearSelection();
                });
            }

            if (this.elements.saveBtn) {
                this.elements.saveBtn.addEventListener('click', function () {
                    self.saveAndClose();
                });
            }
        },

        // Save and close calendar
        saveAndClose: function () {
            this.elements.dropdown.classList.add('hidden');
            this.elements.formControl.classList.remove('open');
            this.deinitializeCalendar();
        },

        // Toggle month dropdown
        toggleMonthDropdown: function () {
            var isOpen = !this.elements.monthDropdownMenu.classList.contains('hidden');
            this.elements.monthDropdownMenu.classList.toggle('hidden');
            this.elements.monthDropdownBtn.setAttribute('aria-expanded', !isOpen);
            this.elements.monthDropdownBtn.classList.toggle('open', !isOpen);

            // Close year dropdown
            if (!isOpen) {
                this.elements.yearDropdownMenu.classList.add('hidden');
                this.elements.yearDropdownBtn.setAttribute('aria-expanded', 'false');
                this.elements.yearDropdownBtn.classList.remove('open');

                // Render month options and scroll to selected
                this.renderMonthOptions();
                this.scrollToSelectedMonth();
            }
        },

        // Toggle year dropdown
        toggleYearDropdown: function () {
            var isOpen = !this.elements.yearDropdownMenu.classList.contains('hidden');
            this.elements.yearDropdownMenu.classList.toggle('hidden');
            this.elements.yearDropdownBtn.setAttribute('aria-expanded', !isOpen);
            this.elements.yearDropdownBtn.classList.toggle('open', !isOpen);

            // Close month dropdown
            if (!isOpen) {
                this.elements.monthDropdownMenu.classList.add('hidden');
                this.elements.monthDropdownBtn.setAttribute('aria-expanded', 'false');
                this.elements.monthDropdownBtn.classList.remove('open');

                // Render year options and scroll to selected
                this.renderYearOptions();
                this.scrollToSelectedYear();
            }
        },

        // Update dropdown labels
        updateDropdowns: function () {
            if (!this.state.isInitialized) return;

            var lang = this.getLanguage();

            if (this.elements.monthDropdownBtn) {
                var monthNames = this.getMonthNames(lang);
                var currentMonth = this.getCurrentMonth();
                this.elements.monthDropdownBtn.querySelector('.label').textContent = monthNames[currentMonth];
            }

            if (this.elements.yearDropdownBtn) {
                this.elements.yearDropdownBtn.querySelector('.label').textContent = this.getCurrentYear();
            }
        },

        // Render methods
        renderDropdowns: function () {
            this.updateDropdowns();
        },

        renderWeekdays: function () {
            var weekdaysContainer = this.elements.dropdown.querySelector('.calendar-weekdays');
            if (!weekdaysContainer) return;

            weekdaysContainer.innerHTML = '';

            var calendar = this.getCurrentCalendar();
            var lang = this.getLanguage();
            var weekdayNames = calendar.weekdayNames[lang];

            weekdayNames.forEach(function (name) {
                var weekdayElement = document.createElement('div');
                weekdayElement.className = 'weekday';
                weekdayElement.textContent = name;
                weekdaysContainer.appendChild(weekdayElement);
            });
        },

        renderButtonLabels: function () {
            var lang = this.getLanguage();
            var labels = UIConfig.buttonLabels[lang];

            if (this.elements.todayBtn) {
                var todayLabelElement = this.elements.todayBtn.querySelector('.label');
                if (todayLabelElement) {
                    todayLabelElement.textContent = labels.today;
                }
            }

            if (this.elements.clearBtn) {
                var clearLabelElement = this.elements.clearBtn.querySelector('.label');
                if (clearLabelElement) {
                    clearLabelElement.textContent = labels.clear;
                }
            }

            if (this.elements.saveBtn) {
                var saveLabelElement = this.elements.saveBtn.querySelector('.label');
                if (saveLabelElement) {
                    saveLabelElement.textContent = labels.save;
                }
            }
        },

        renderCalendarDates: function () {
            if (!this.elements.datesContainer) return;

            this.elements.datesContainer.innerHTML = '';

            var calendar = this.getCurrentCalendar();
            var calendarData = calendar.generateCalendarData(
                this.getCurrentYear(),
                this.getCurrentMonth()
            );

            this.generateCalendarDates(calendarData);
        },

        // Calendar date generation
        generateCalendarDates: function (calendarData) {
            var self = this;

            // Previous month's trailing dates
            for (var i = 0; i < calendarData.startOffset; i++) {
                var prevDate = new Date(calendarData.year, calendarData.month, 0 - (calendarData.startOffset - i - 1));
                this.createDateCell(prevDate, 'other-month');
            }

            // Current month dates
            for (var day = 1; day <= calendarData.daysInMonth; day++) {
                var currentDate = new Date(calendarData.year, calendarData.month, day);
                this.createDateCell(currentDate, 'current-month');
            }

            // Fill remaining cells
            var totalCells = 42; // 6 weeks * 7 days
            var usedCells = calendarData.startOffset + calendarData.daysInMonth;

            for (var j = 1; usedCells < totalCells; j++, usedCells++) {
                var nextDate = new Date(calendarData.year, calendarData.month + 1, j);
                this.createDateCell(nextDate, 'other-month');
            }
        },

        // Create individual date cell
        createDateCell: function (date, type) {
            var self = this;
            var btn = document.createElement('button');
            btn.className = 'nds-btn nds-btn-subtle date-cell';
            btn.type = 'button';

            // Attach calendar-specific data
            this.attachHijriData(date);

            // Use helper method for day number display
            btn.innerHTML = '<span class="label">' + this.getDisplayDayNumber(date, type) + '</span>';

            // Add appropriate classes
            if (type === 'other-month') {
                btn.classList.add('other-month');
            }

            // Check if today using calendar-aware method
            if (this.isTodayDate(date)) {
                btn.classList.add('today');
            }

            // Check selection states
            this.applySelectionStates(btn, date);

            // Add click handler
            btn.addEventListener('click', function () {
                self.selectDate(date);
            });

            this.elements.datesContainer.appendChild(btn);
        },

        // Apply selection states to date cell
        applySelectionStates: function (btn, date) {
            if (this.isRangeMode()) {
                this.applyRangeStates(btn, date);
            } else if (this.state.selectedDate && this.isSameDay(date, this.state.selectedDate)) {
                btn.classList.add('selected');
            }
        },

        // Apply range selection states
        applyRangeStates: function (btn, date) {
            var isRangeStart = this.state.rangeStart && this.isSameDay(date, this.state.rangeStart);
            var isRangeEnd = this.state.rangeEnd && this.isSameDay(date, this.state.rangeEnd);
            var isInRange = this.state.rangeStart && this.state.rangeEnd &&
                date > this.state.rangeStart && date < this.state.rangeEnd;

            if (isRangeStart) {
                btn.classList.add('range-start');
            }

            if (isRangeEnd) {
                btn.classList.add('range-end');
            }

            if (isInRange) {
                btn.classList.add('in-range');
            }

            // Add visual continuity classes for styling
            if (isRangeStart && this.state.rangeEnd) {
                btn.classList.add('has-range-end');
            }
            if (isRangeEnd && this.state.rangeStart) {
                btn.classList.add('has-range-start');
            }
        },

        // Date selection handlers
        selectDate: function (date) {
            if (this.isRangeMode()) {
                this.handleRangeSelection(date);
            } else {
                this.state.selectedDate = new Date(date);
            }

            this.updateInput();
            this.renderCalendarDates();
        },

        selectToday: function () {
            var today = new Date();

            if (this.isRangeMode()) {
                this.handleRangeSelection(today);
            } else {
                this.state.selectedDate = new Date(today);
            }

            this.state.currentDate = new Date(today);
            this.updateDropdowns();
            this.renderCalendarDates();
            this.updateInput();
        },

        clearSelection: function () {
            this.state.selectedDate = null;
            this.state.rangeStart = null;
            this.state.rangeEnd = null;
            this.elements.input.value = '';
            this.renderCalendarDates();
        },

        // Range selection logic
        handleRangeSelection: function (clickedDate) {
            if (!this.state.rangeStart || (this.state.rangeStart && this.state.rangeEnd)) {
                this.state.rangeStart = new Date(clickedDate);
                this.state.rangeEnd = null;
                this.state.selectedDate = new Date(clickedDate);
            } else if (this.state.rangeStart && !this.state.rangeEnd) {
                if (clickedDate >= this.state.rangeStart) {
                    this.state.rangeEnd = new Date(clickedDate);
                } else {
                    this.state.rangeEnd = new Date(this.state.rangeStart);
                    this.state.rangeStart = new Date(clickedDate);
                }
                this.state.selectedDate = new Date(this.state.rangeEnd);
            }
        },

        // Update input value
        updateInput: function () {
            var calendar = this.getCurrentCalendar();
            var value = '';

            if (this.isRangeMode() && this.state.rangeStart) {
                value = calendar.formatDate(this.state.rangeStart);
                if (this.state.rangeEnd) {
                    value += ' - ' + calendar.formatDate(this.state.rangeEnd);
                }
            } else if (this.state.selectedDate) {
                value = calendar.formatDate(this.state.selectedDate);
            }

            this.elements.input.value = value;
        },

        // Utility methods
        isSameDay: function (date1, date2) {
            return date1.getDate() === date2.getDate() &&
                date1.getMonth() === date2.getMonth() &&
                date1.getFullYear() === date2.getFullYear();
        },

        updateCalendar: function () {
            this.renderCalendarDates();
        },

        // Handle outside clicks
        handleOutsideClick: function (e) {
            var self = this;
            setTimeout(function () {
                if (self.state.isInitialized && !self.elements.dropdown.classList.contains('hidden')) {
                    // Close dropdowns when clicking inside calendar but outside dropdowns
                    self.closeDropdownsIfClickedOutside(e.target);
                }

                // Close entire calendar if clicked outside container
                if (!self.elements.container.contains(e.target)) {
                    self.elements.dropdown.classList.add('hidden');
                    self.elements.formControl.classList.remove('open');
                    self.deinitializeCalendar();
                }
            }, 0);
        },

        closeOtherDropdowns: function (e) {
            this.closeDropdownsIfClickedOutside(e.target);
        },

        closeDropdownsIfClickedOutside: function (clickedElement) {
            // Close month dropdown if clicked outside it
            if (this.elements.monthDropdownMenu && !this.elements.monthDropdownMenu.classList.contains('hidden')) {
                var inMonthArea = this.elements.monthDropdownBtn && (
                    this.elements.monthDropdownBtn.contains(clickedElement) ||
                    this.elements.monthDropdownMenu.contains(clickedElement)
                );

                if (!inMonthArea) {
                    this.elements.monthDropdownMenu.classList.add('hidden');
                    this.elements.monthDropdownBtn.setAttribute('aria-expanded', 'false');
                    this.elements.monthDropdownBtn.classList.remove('open');
                }
            }

            // Close year dropdown if clicked outside it
            if (this.elements.yearDropdownMenu && !this.elements.yearDropdownMenu.classList.contains('hidden')) {
                var inYearArea = this.elements.yearDropdownBtn && (
                    this.elements.yearDropdownBtn.contains(clickedElement) ||
                    this.elements.yearDropdownMenu.contains(clickedElement)
                );

                if (!inYearArea) {
                    this.elements.yearDropdownMenu.classList.add('hidden');
                    this.elements.yearDropdownBtn.setAttribute('aria-expanded', 'false');
                    this.elements.yearDropdownBtn.classList.remove('open');
                }
            }
        },

        // Dropdown rendering methods
        renderMonthOptions: function () {
            if (!this.elements.monthDropdownMenu) return;

            this.elements.monthDropdownMenu.innerHTML = '';

            var calendar = this.getCurrentCalendar();
            var lang = this.getLanguage();
            var monthNames = calendar.monthNames[lang];
            var self = this;

            monthNames.forEach(function (monthName, index) {
                var btn = document.createElement('button');
                btn.className = 'nds-btn nds-btn-subtle month-option';
                btn.setAttribute('role', 'menuitem');
                btn.setAttribute('data-value', index);
                btn.innerHTML = '<span class="label">' + monthName + '</span>';

                if (index === self.state.currentDate.getMonth()) {
                    btn.classList.add('selected');
                }

                btn.addEventListener('click', function (e) {
                    e.preventDefault();
                    var monthValue = parseInt(this.dataset.value);
                    self.state.currentDate.setMonth(monthValue);
                    self.updateDropdowns();
                    self.renderCalendarDates();

                    // Close dropdown
                    self.elements.monthDropdownMenu.classList.add('hidden');
                    self.elements.monthDropdownBtn.setAttribute('aria-expanded', 'false');
                    self.elements.monthDropdownBtn.classList.remove('open');
                });

                self.elements.monthDropdownMenu.appendChild(btn);
            });
        },

        renderYearOptions: function () {
            if (!this.elements.yearDropdownMenu) return;

            this.elements.yearDropdownMenu.innerHTML = '';

            var yearRangeBefore = parseInt(this.elements.yearDropdownMenu.dataset.yearBefore) || 5;
            var yearRangeAfter = parseInt(this.elements.yearDropdownMenu.dataset.yearAfter) || 5;

            var todayYear = new Date().getFullYear();
            var startYear = todayYear - yearRangeBefore;
            var endYear = todayYear + yearRangeAfter;
            var currentYear = this.state.currentDate.getFullYear();

            var self = this;

            for (var year = startYear; year <= endYear; year++) {
                var btn = document.createElement('button');
                btn.className = 'nds-btn nds-btn-subtle year-option';
                btn.setAttribute('role', 'menuitem');
                btn.setAttribute('data-value', year);
                btn.innerHTML = '<span class="label">' + year + '</span>';

                if (year === currentYear) {
                    btn.classList.add('selected');
                }

                btn.addEventListener('click', function (e) {
                    e.preventDefault();
                    var yearValue = parseInt(this.dataset.value);
                    self.state.currentDate.setFullYear(yearValue);
                    self.updateDropdowns();
                    self.renderCalendarDates();

                    // Close dropdown
                    self.elements.yearDropdownMenu.classList.add('hidden');
                    self.elements.yearDropdownBtn.setAttribute('aria-expanded', 'false');
                    self.elements.yearDropdownBtn.classList.remove('open');
                });

                self.elements.yearDropdownMenu.appendChild(btn);
            }
        },

        // Scroll to selected options
        scrollToSelectedMonth: function () {
            var self = this;
            setTimeout(function () {
                var selectedOption = self.elements.monthDropdownMenu.querySelector('.month-option.selected');
                if (selectedOption) {
                    var dropdownRect = self.elements.monthDropdownMenu.getBoundingClientRect();
                    var optionRect = selectedOption.getBoundingClientRect();
                    var scrollTop = optionRect.top - dropdownRect.top + self.elements.monthDropdownMenu.scrollTop - (dropdownRect.height / 2) + (optionRect.height / 2);
                    self.elements.monthDropdownMenu.scrollTop = Math.max(0, scrollTop);
                }
            }, 10);
        },

        scrollToSelectedYear: function () {
            var self = this;
            setTimeout(function () {
                var selectedOption = self.elements.yearDropdownMenu.querySelector('.year-option.selected');
                if (selectedOption) {
                    var dropdownRect = self.elements.yearDropdownMenu.getBoundingClientRect();
                    var optionRect = selectedOption.getBoundingClientRect();
                    var scrollTop = optionRect.top - dropdownRect.top + self.elements.yearDropdownMenu.scrollTop - (dropdownRect.height / 2) + (optionRect.height / 2);
                    self.elements.yearDropdownMenu.scrollTop = Math.max(0, scrollTop);
                }
            }, 10);
        },

        // Setup language observer
        setupLanguageObserver: function () {
            var self = this;
            var languageObserver = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
                        if (self.state.isInitialized) {
                            self.renderWeekdays();
                            self.renderButtonLabels();
                            self.updateDropdowns();
                        }
                    }
                });
            });

            languageObserver.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['lang']
            });

            this.observers.push(languageObserver);
        },

        // Reset button states
        resetButtonStates: function () {
            if (this.elements.monthDropdownBtn) {
                this.elements.monthDropdownBtn.classList.remove('open');
                this.elements.monthDropdownBtn.setAttribute('aria-expanded', 'false');
            }
            if (this.elements.yearDropdownBtn) {
                this.elements.yearDropdownBtn.classList.remove('open');
                this.elements.yearDropdownBtn.setAttribute('aria-expanded', 'false');
            }
        },

        // Reset state
        resetState: function () {
            this.state.selectedDate = null;
            this.state.rangeStart = null;
            this.state.rangeEnd = null;
        },

        // Destroy instance
        destroy: function () {
            // Remove all event listeners
            if (this.handlers.outsideClick) {
                document.removeEventListener('click', this.handlers.outsideClick);
            }

            // Disconnect observers
            this.observers.forEach(function (observer) {
                observer.disconnect();
            });

            this.cleanup();
        }
    };

    // Integration with existing form initialization
    window.DatePickerCalendar = DatePickerCalendar;

})();