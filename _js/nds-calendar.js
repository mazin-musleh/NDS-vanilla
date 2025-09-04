(function () {
    'use strict';

    // Unified Hijri date object structure
    function createHijriDate(day, month, year) {
        return {
            day: parseInt(day, 10) || null,
            month: parseInt(month, 10) || null,
            year: parseInt(year, 10) || null
        };
    }

    // Normalize Hijri date from any source (getHijriDate, Intl, etc.)
    function normalizeHijriDate(hijriObj) {
        if (!hijriObj) return null;
        
        var day = hijriObj.day || hijriObj.d || hijriObj.hDay;
        var month = hijriObj.month || hijriObj.m || hijriObj.hMonth;
        var year = hijriObj.year || hijriObj.y || hijriObj.hYear;
        
        return createHijriDate(day, month, year);
    }

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
                var hijriDate;
                
                // Use attached Hijri data if available
                if (date._hijriDay && date._hijriMonth && date._hijriYear) {
                    hijriDate = createHijriDate(date._hijriDay, date._hijriMonth, date._hijriYear);
                } else {
                    // Convert Gregorian to Hijri
                    hijriDate = this.gregorianToHijri(date);
                }
                
                // Apply offset correction for display
                var offsetDays = this.getOffsetCorrection();
                if (offsetDays !== 0) {
                    hijriDate = this.addDaysToHijriDate(hijriDate, offsetDays);
                }
                
                var day = String(hijriDate.day).padStart(2, '0');
                var month = String(hijriDate.month).padStart(2, '0');
                var year = hijriDate.year;
                return day + '/' + month + '/' + year;
            },

            generateCalendarData: function (year, month) {
                // For Hijri calendar, we need to work with Hijri dates
                var hijriFirstDay = this.hijriToGregorian(year, month, 1);
                var daysInHijriMonth = this.getDaysInHijriMonth(year, month);
                var startOfWeek = hijriFirstDay.getDay();

                return {
                    year: year,
                    month: month,
                    firstDay: hijriFirstDay,
                    lastDay: this.hijriToGregorian(year, month, daysInHijriMonth),
                    daysInMonth: daysInHijriMonth,
                    startOffset: startOfWeek
                };
            },

            // Hijri conversion functions
            gregorianToHijri: function (gDate) {
                // Don't call getHijriDate here, use browser's Intl or math conversion
                try {
                    var hijriString = new Intl.DateTimeFormat('en-US-u-ca-islamic', {
                        day: 'numeric', 
                        month: 'numeric', 
                        year: 'numeric'
                    }).format(gDate);
                    
                    var parts = hijriString.split('/');
                    if (parts.length === 3) {
                        return createHijriDate(
                            parseInt(parts[1], 10), // day
                            parseInt(parts[0], 10), // month 
                            parseInt(parts[2], 10)  // year
                        );
                    }
                } catch (e) {
                    // Fallback to mathematical conversion
                }
                
                // Mathematical fallback using Julian Day method
                return this.gregorianToHijriMath(gDate);
            },

            gregorianToHijriMath: function (gDate) {
                // Simplified mathematical conversion (approximate)
                var jd = this.gregorianToJulian(gDate);
                return this.julianToHijri(jd);
            },

            hijriToGregorian: function (hYear, hMonth, hDay) {
                // Use mathematical conversion via Julian Day
                var jd = this.hijriToJulian(hYear, hMonth, hDay);
                return this.julianToGregorian(jd);
            },

            getOffsetCorrection: function() {
                // Get offset from DOM context - will be called from calendar instance
                return 0; // Default, will be overridden in calendar instance
            },

            addDaysToHijriDate: function(hijriDate, days) {
                if (days === 0) return hijriDate;
                
                var result = createHijriDate(hijriDate.day, hijriDate.month, hijriDate.year);
                result.day += days;
                
                // Handle day overflow/underflow
                while (result.day > this.getDaysInHijriMonth(result.year, result.month)) {
                    result.day -= this.getDaysInHijriMonth(result.year, result.month);
                    result.month++;
                    if (result.month > 12) {
                        result.month = 1;
                        result.year++;
                    }
                }
                
                while (result.day < 1) {
                    result.month--;
                    if (result.month < 1) {
                        result.month = 12;
                        result.year--;
                    }
                    result.day += this.getDaysInHijriMonth(result.year, result.month);
                }
                
                return result;
            },

            getDaysInHijriMonth: function (year, month) {
                // Hijri months alternate between 29 and 30 days
                // Odd months (1,3,5,7,9,11) have 30 days, even months have 29
                // The 12th month (Dhu al-Hijjah) has 30 days in leap years
                if (month % 2 === 1) {
                    return 30; // Odd months
                } else if (month === 12 && this.isHijriLeapYear(year)) {
                    return 30; // Leap year Dhu al-Hijjah
                } else {
                    return 29; // Even months
                }
            },

            isHijriLeapYear: function (year) {
                // 11 leap years in every 30-year cycle
                return ((year * 11) + 14) % 30 < 11;
            },

            // Julian Day conversion helpers
            gregorianToJulian: function (date) {
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();
                
                if (month < 3) {
                    year--;
                    month += 12;
                }
                
                var a = Math.floor(year / 100);
                var b = 2 - a + Math.floor(a / 4);
                
                return Math.floor(365.25 * (year + 4716)) + 
                       Math.floor(30.6001 * (month + 1)) + 
                       day + b - 1524.5;
            },

            julianToGregorian: function (jd) {
                var a = jd + 32044;
                var b = Math.floor((4 * a + 3) / 146097);
                var c = a - Math.floor((146097 * b) / 4);
                
                var d = Math.floor((4 * c + 3) / 1461);
                var e = c - Math.floor((1461 * d) / 4);
                var m = Math.floor((5 * e + 2) / 153);
                
                var day = e - Math.floor((153 * m + 2) / 5) + 1;
                var month = m + 3 - 12 * Math.floor(m / 10);
                var year = 100 * b + d - 4800 + Math.floor(m / 10);
                
                return new Date(year, month - 1, day);
            },

            julianToHijri: function (jd) {
                // Approximate conversion - Hijri epoch is July 16, 622 CE (Julian Day 1948439.5)
                var hijriEpoch = 1948439.5;
                var daysSinceEpoch = jd - hijriEpoch;
                
                // Average Hijri year is about 354.367 days
                var avgHijriYear = 354.367;
                var year = Math.floor(daysSinceEpoch / avgHijriYear) + 1;
                
                // Rough calculation for month and day
                var daysIntoYear = daysSinceEpoch - ((year - 1) * avgHijriYear);
                var month = Math.floor(daysIntoYear / 29.5) + 1;
                var day = Math.floor(daysIntoYear % 29.5) + 1;
                
                // Ensure valid ranges
                if (month > 12) { month = 12; }
                if (month < 1) { month = 1; }
                if (day > 30) { day = 30; }
                if (day < 1) { day = 1; }
                
                return createHijriDate(day, month, year);
            },

            hijriToJulian: function (year, month, day) {
                // Approximate conversion
                var hijriEpoch = 1948439.5;
                var avgHijriYear = 354.367;
                
                var daysSinceEpoch = (year - 1) * avgHijriYear + 
                                   (month - 1) * 29.5 + 
                                   (day - 1);
                
                return hijriEpoch + daysSinceEpoch;
            },

            // Common operations - duplicated to avoid circular references
            parseDate: function (dateString) {
                var parts = dateString.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
                if (!parts) return null;

                var day = parseInt(parts[1], 10);
                var month = parseInt(parts[2], 10);
                var year = parseInt(parts[3], 10);

                // Remove offset correction from user input
                var hijriDate = createHijriDate(day, month, year);
                var offsetDays = this.getOffsetCorrection();
                if (offsetDays !== 0) {
                    hijriDate = this.addDaysToHijriDate(hijriDate, -offsetDays);
                }

                // Convert pure Hijri date to Gregorian
                var gregorianDate = this.hijriToGregorian(hijriDate.year, hijriDate.month, hijriDate.day);
                
                // Attach original user input as Hijri metadata
                gregorianDate._hijriDay = day;
                gregorianDate._hijriMonth = month;
                gregorianDate._hijriYear = year;

                return gregorianDate;
            },
            getToday: function () {
                // Don't call getHijriDate here - just return a regular Date
                // The calendar instance will handle Hijri conversion as needed
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
            // First check if there's an initial value to determine calendar type
            var inputValue = this.elements.input.value.trim();
            if (inputValue) {
                var detectedType = this.detectCalendarTypeFromValue(inputValue);
                if (detectedType) {
                    return detectedType;
                }
            }
            
            // Fallback to CSS class detection
            if (this.elements.container && this.elements.container.classList.contains('hijri')) {
                return 'hijri';
            }
            return 'gregorian';
        },

        detectCalendarTypeFromValue: function (inputValue) {
            // Handle range format
            if (inputValue.includes(' - ')) {
                var rangeParts = inputValue.split(' - ');
                if (rangeParts.length === 2) {
                    // Use the first date to determine calendar type
                    return this.detectCalendarTypeFromSingleValue(rangeParts[0].trim());
                }
            }
            
            // Handle single date format
            return this.detectCalendarTypeFromSingleValue(inputValue);
        },

        detectCalendarTypeFromSingleValue: function (dateString) {
            var parts = dateString.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
            if (!parts) return null;

            var day = parseInt(parts[1], 10);
            var month = parseInt(parts[2], 10);
            var year = parseInt(parts[3], 10);

            // Hijri year heuristics (approximate ranges)
            if (year >= 1400 && year <= 1500) {
                // Likely Hijri (current era is around 1440s)
                return 'hijri';
            } else if (year >= 1900 && year <= 2100) {
                // Likely Gregorian
                return 'gregorian';
            }

            // If year is ambiguous, check for impossible Gregorian dates
            if (month > 12) {
                // Invalid for both, but let's default to gregorian
                return 'gregorian';
            }

            // Default assumption based on year range
            return year > 1500 ? 'gregorian' : 'hijri';
        },

        // Utility methods
        getLanguage: function () {
            return document.documentElement.lang === 'ar' ? 'ar' : 'en';
        },

        getCurrentCalendar: function () {
            var calendar = CalendarConfig[this.state.calendarType];
            
            // Override offset correction method for Hijri calendar
            if (this.state.calendarType === 'hijri') {
                var self = this;
                calendar.getOffsetCorrection = function() {
                    // Check for offset correction in dataset attributes
                    var offsetValue = 0;
                    
                    // Check input element first
                    if (self.elements.input && self.elements.input.dataset.hijriOffset) {
                        offsetValue = parseInt(self.elements.input.dataset.hijriOffset, 10);
                    }
                    // Check container as fallback
                    else if (self.elements.container && self.elements.container.dataset.hijriOffset) {
                        offsetValue = parseInt(self.elements.container.dataset.hijriOffset, 10);
                    }
                    // Check form control as another fallback
                    else if (self.elements.formControl && self.elements.formControl.dataset.hijriOffset) {
                        offsetValue = parseInt(self.elements.formControl.dataset.hijriOffset, 10);
                    }
                    
                    // Ensure valid number, default to 0 if invalid
                    return isNaN(offsetValue) ? 0 : offsetValue;
                };
            }
            
            return calendar;
        },

        isRangeMode: function () {
            return this.elements.container.classList.contains('dateRange');
        },

        // Simple helper methods
        getCurrentMonth: function () {
            if (this.state.calendarType === 'hijri') {
                var hijriDate = this.getCurrentHijriDate();
                return hijriDate.month; // Keep as 1-based (1-12)
            }
            return this.state.currentDate.getMonth();
        },

        getCurrentYear: function () {
            if (this.state.calendarType === 'hijri') {
                var hijriDate = this.getCurrentHijriDate();
                return hijriDate.year;
            }
            return this.state.currentDate.getFullYear();
        },

        getDisplayDayNumber: function (date, type) {
            if (this.state.calendarType === 'hijri' && date._hijriDay) {
                var offsetDays = this.getCurrentCalendar().getOffsetCorrection();
                if (offsetDays !== 0) {
                    var originalHijri = createHijriDate(date._hijriDay, date._hijriMonth, date._hijriYear);
                    var offsetHijri = this.getCurrentCalendar().addDaysToHijriDate(originalHijri, offsetDays);
                    return offsetHijri.day;
                }
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
                // Get today's Hijri date (cached)
                var todaysHijriDate = this.getTodaysHijriDate();
                if (todaysHijriDate && date._hijriDay) {
                    return date._hijriDay === todaysHijriDate.day &&
                        date._hijriMonth === todaysHijriDate.month &&
                        date._hijriYear === todaysHijriDate.year;
                }
            }
            var today = new Date();
            return this.isSameDay(date, today);
        },

        getTodaysHijriDate: function () {
            // Cache today's Hijri date to avoid repeated calls
            if (!this._cachedTodaysHijriDate) {
                // Try to use global getHijriDate function if available
                if (typeof getHijriDate === 'function') {
                    try {
                        var hijriToday = getHijriDate(true, true);
                        var normalizedHijri = normalizeHijriDate(hijriToday);
                        if (normalizedHijri && normalizedHijri.day && normalizedHijri.month && normalizedHijri.year) {
                            this._cachedTodaysHijriDate = normalizedHijri;
                            return this._cachedTodaysHijriDate;
                        }
                    } catch (e) {
                        // Continue with conversion
                    }
                }
                
                // Fallback to mathematical conversion
                var calendar = this.getCurrentCalendar();
                var today = new Date();
                this._cachedTodaysHijriDate = calendar.gregorianToHijri(today);
            }
            
            return this._cachedTodaysHijriDate;
        },

        attachHijriData: function (date) {
            // Only attach for Hijri calendars
            if (this.state.calendarType === 'hijri') {
                // Skip if already has Hijri data
                if (date._hijriDay && date._hijriMonth && date._hijriYear) {
                    return;
                }
                
                var calendar = this.getCurrentCalendar();
                try {
                    // Use browser's built-in Islamic calendar conversion first
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
                        return;
                    }
                } catch (e) {
                    // Continue with mathematical conversion
                }
                
                // Fallback to mathematical conversion
                var hijriDate = calendar.gregorianToHijri(date);
                date._hijriDay = hijriDate.day;
                date._hijriMonth = hijriDate.month;
                date._hijriYear = hijriDate.year;
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
            // Clear cached Hijri date when initializing
            this._cachedTodaysHijriDate = null;
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
                // Preserve Hijri metadata on currentDate
                if (parsedDate._hijriDay) {
                    this.state.currentDate._hijriDay = parsedDate._hijriDay;
                    this.state.currentDate._hijriMonth = parsedDate._hijriMonth;
                    this.state.currentDate._hijriYear = parsedDate._hijriYear;
                }
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

        // Navigation for both calendar types
        navigateMonth: function (direction) {
            if (this.state.calendarType === 'hijri') {
                this.navigateHijriMonth(direction);
            } else {
                this.navigateGregorianMonth(direction);
            }
        },

        navigateGregorianMonth: function (direction) {
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

        navigateHijriMonth: function (direction) {
            // Get current Hijri date or convert from Gregorian
            var currentHijriDate = this.getCurrentHijriDate();
            
            currentHijriDate.month += direction;
            if (currentHijriDate.month < 1) {
                currentHijriDate.month = 12;
                currentHijriDate.year--;
            } else if (currentHijriDate.month > 12) {
                currentHijriDate.month = 1;
                currentHijriDate.year++;
            }

            // Convert back to Gregorian for internal storage
            var calendar = this.getCurrentCalendar();
            var newGregorianDate = calendar.hijriToGregorian(currentHijriDate.year, currentHijriDate.month, 1);
            newGregorianDate._hijriDay = 1;
            newGregorianDate._hijriMonth = currentHijriDate.month;
            newGregorianDate._hijriYear = currentHijriDate.year;
            
            this.state.currentDate = newGregorianDate;

            this.updateDropdowns();
            this.renderCalendarDates();
        },

        getCurrentHijriDate: function () {
            // If current date already has Hijri data, use it
            if (this.state.currentDate._hijriMonth && this.state.currentDate._hijriYear) {
                return {
                    day: this.state.currentDate._hijriDay || 1,
                    month: this.state.currentDate._hijriMonth,
                    year: this.state.currentDate._hijriYear
                };
            }
            
            // Convert current Gregorian date to Hijri
            var calendar = this.getCurrentCalendar();
            return calendar.gregorianToHijri(this.state.currentDate);
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
                // For Hijri: convert 1-based month to 0-based array index
                var monthIndex = this.state.calendarType === 'hijri' ? currentMonth - 1 : currentMonth;
                this.elements.monthDropdownBtn.querySelector('.label').textContent = monthNames[monthIndex];
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

            if (this.state.calendarType === 'hijri') {
                this.generateHijriCalendarDates(calendarData);
            } else {
                this.generateGregorianCalendarDates(calendarData);
            }
        },

        generateGregorianCalendarDates: function (calendarData) {
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

        generateHijriCalendarDates: function (calendarData) {
            var calendar = this.getCurrentCalendar();
            
            // Generate previous month dates
            var prevHijriMonth = calendarData.month - 1;
            var prevHijriYear = calendarData.year;
            if (prevHijriMonth < 1) {
                prevHijriMonth = 12;
                prevHijriYear--;
            }
            var daysInPrevMonth = calendar.getDaysInHijriMonth(prevHijriYear, prevHijriMonth);

            for (var i = 0; i < calendarData.startOffset; i++) {
                var day = daysInPrevMonth - (calendarData.startOffset - i - 1);
                var prevDate = calendar.hijriToGregorian(prevHijriYear, prevHijriMonth, day);
                // Ensure Hijri metadata is properly attached
                prevDate._hijriDay = day;
                prevDate._hijriMonth = prevHijriMonth;
                prevDate._hijriYear = prevHijriYear;
                this.createDateCell(prevDate, 'other-month');
            }

            // Current month dates
            for (var day = 1; day <= calendarData.daysInMonth; day++) {
                var currentDate = calendar.hijriToGregorian(calendarData.year, calendarData.month, day);
                // Ensure Hijri metadata is properly attached
                currentDate._hijriDay = day;
                currentDate._hijriMonth = calendarData.month;
                currentDate._hijriYear = calendarData.year;
                this.createDateCell(currentDate, 'current-month');
            }

            // Fill remaining cells with next month
            var totalCells = 42; // 6 weeks * 7 days
            var usedCells = calendarData.startOffset + calendarData.daysInMonth;
            var nextHijriMonth = calendarData.month + 1;
            var nextHijriYear = calendarData.year;
            if (nextHijriMonth > 12) {
                nextHijriMonth = 1;
                nextHijriYear++;
            }

            for (var j = 1; usedCells < totalCells; j++, usedCells++) {
                var nextDate = calendar.hijriToGregorian(nextHijriYear, nextHijriMonth, j);
                // Ensure Hijri metadata is properly attached
                nextDate._hijriDay = j;
                nextDate._hijriMonth = nextHijriMonth;
                nextDate._hijriYear = nextHijriYear;
                this.createDateCell(nextDate, 'other-month');
            }
        },

        // Create individual date cell
        createDateCell: function (date, type) {
            var self = this;
            var btn = document.createElement('button');
            btn.className = 'nds-btn nds-btn-subtle date-cell';
            btn.type = 'button';

            // Hijri data should already be attached by the calendar generation method
            // Don't call attachHijriData here as it might override existing data

            // Use helper method for day number display
            btn.innerHTML = '<span class="label">' + this.getDisplayDayNumber(date, type) + '</span>';

            // Add appropriate classes based on offset-corrected display
            if (this.state.calendarType === 'hijri' && date._hijriDay) {
                var offsetDays = this.getCurrentCalendar().getOffsetCorrection();
                if (offsetDays !== 0) {
                    var originalHijri = createHijriDate(date._hijriDay, date._hijriMonth, date._hijriYear);
                    var offsetHijri = this.getCurrentCalendar().addDaysToHijriDate(originalHijri, offsetDays);
                    if (offsetHijri.month !== this.getCurrentMonth()) {
                        btn.classList.add('other-month');
                    }
                } else if (type === 'other-month') {
                    btn.classList.add('other-month');
                }
            } else if (type === 'other-month') {
                btn.classList.add('other-month');
            }

            // Check if today using calendar-aware method
            if (this.isTodayDate(date)) {
                btn.classList.add('today');
            }

            // Check selection states
            this.applySelectionStates(btn, date);

            // Add click handler
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                self.selectDate(date);
            });

            this.elements.datesContainer.appendChild(btn);
        },

        // Apply selection states to date cell
        applySelectionStates: function (btn, date) {
            if (this.isRangeMode()) {
                this.applyRangeStates(btn, date);
            } else if (this.state.selectedDate && this.isSameCalendarDate(date, this.state.selectedDate)) {
                btn.classList.add('selected');
            }
        },

        // Compare dates considering calendar type
        isSameCalendarDate: function (date1, date2) {
            if (this.state.calendarType === 'hijri') {
                // For Hijri calendar, compare Hijri metadata
                return date1._hijriDay === date2._hijriDay &&
                       date1._hijriMonth === date2._hijriMonth &&
                       date1._hijriYear === date2._hijriYear;
            } else {
                // For Gregorian calendar, use regular date comparison
                return this.isSameDay(date1, date2);
            }
        },

        // Apply range selection states
        applyRangeStates: function (btn, date) {
            var isRangeStart = this.state.rangeStart && this.isSameCalendarDate(date, this.state.rangeStart);
            var isRangeEnd = this.state.rangeEnd && this.isSameCalendarDate(date, this.state.rangeEnd);
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
                var selectedDate = new Date(date);
                // Preserve Hijri metadata if present
                if (date._hijriDay) {
                    selectedDate._hijriDay = date._hijriDay;
                    selectedDate._hijriMonth = date._hijriMonth;
                    selectedDate._hijriYear = date._hijriYear;
                }
                this.state.selectedDate = selectedDate;
            }

            this.updateInput();
            this.renderCalendarDates();
        },

        selectToday: function () {
            var today = new Date();

            // For Hijri calendar, use the same conversion method as calendar generation
            if (this.state.calendarType === 'hijri') {
                var calendar = this.getCurrentCalendar();
                var todaysHijriDate = calendar.gregorianToHijri(today);
                today._hijriDay = todaysHijriDate.day;
                today._hijriMonth = todaysHijriDate.month;
                today._hijriYear = todaysHijriDate.year;
            }

            if (this.isRangeMode()) {
                this.handleRangeSelection(today);
            } else {
                var selectedDate = new Date(today);
                // Preserve Hijri metadata if present
                if (today._hijriDay) {
                    selectedDate._hijriDay = today._hijriDay;
                    selectedDate._hijriMonth = today._hijriMonth;
                    selectedDate._hijriYear = today._hijriYear;
                }
                this.state.selectedDate = selectedDate;
            }

            // Navigate to today's month for Hijri calendar
            if (this.state.calendarType === 'hijri') {
                // Set current date to show today's Hijri month
                var calendar = this.getCurrentCalendar();
                var todaysGregorianEquivalent = calendar.hijriToGregorian(today._hijriYear, today._hijriMonth, 1);
                todaysGregorianEquivalent._hijriDay = 1;
                todaysGregorianEquivalent._hijriMonth = today._hijriMonth;
                todaysGregorianEquivalent._hijriYear = today._hijriYear;
                this.state.currentDate = todaysGregorianEquivalent;
            } else {
                this.state.currentDate = new Date(today);
            }
            
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
            var self = this;
            
            function copyDateWithHijriData(sourceDate) {
                var newDate = new Date(sourceDate);
                if (sourceDate._hijriDay) {
                    newDate._hijriDay = sourceDate._hijriDay;
                    newDate._hijriMonth = sourceDate._hijriMonth;
                    newDate._hijriYear = sourceDate._hijriYear;
                }
                return newDate;
            }
            
            if (!this.state.rangeStart || (this.state.rangeStart && this.state.rangeEnd)) {
                this.state.rangeStart = copyDateWithHijriData(clickedDate);
                this.state.rangeEnd = null;
                this.state.selectedDate = copyDateWithHijriData(clickedDate);
            } else if (this.state.rangeStart && !this.state.rangeEnd) {
                if (clickedDate >= this.state.rangeStart) {
                    this.state.rangeEnd = copyDateWithHijriData(clickedDate);
                } else {
                    this.state.rangeEnd = copyDateWithHijriData(this.state.rangeStart);
                    this.state.rangeStart = copyDateWithHijriData(clickedDate);
                }
                this.state.selectedDate = copyDateWithHijriData(this.state.rangeEnd);
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

                var isSelected = self.state.calendarType === 'hijri' ? 
                    (index + 1) === self.getCurrentMonth() : // For Hijri: compare (0-based index + 1) with 1-based month
                    index === self.getCurrentMonth();        // For Gregorian: compare 0-based with 0-based
                
                if (isSelected) {
                    btn.classList.add('selected');
                }

                btn.addEventListener('click', function (e) {
                    e.preventDefault();
                    var monthValue = parseInt(this.dataset.value);
                    
                    if (self.state.calendarType === 'hijri') {
                        self.setHijriMonth(monthValue + 1); // Convert 0-based dropdown index to 1-based Hijri month
                    } else {
                        self.state.currentDate.setMonth(monthValue);
                    }
                    
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

            var currentYear = this.getCurrentYear();
            var startYear, endYear;

            if (this.state.calendarType === 'hijri') {
                // For Hijri calendar, use current Hijri year as reference
                startYear = currentYear - yearRangeBefore;
                endYear = currentYear + yearRangeAfter;
            } else {
                // For Gregorian calendar, use today's year as reference
                var todayYear = new Date().getFullYear();
                startYear = todayYear - yearRangeBefore;
                endYear = todayYear + yearRangeAfter;
            }

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
                    
                    if (self.state.calendarType === 'hijri') {
                        self.setHijriYear(yearValue);
                    } else {
                        self.state.currentDate.setFullYear(yearValue);
                    }
                    
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

        // Helper methods for Hijri date manipulation
        setHijriMonth: function (hijriMonth) {
            var currentHijriDate = this.getCurrentHijriDate();
            currentHijriDate.month = hijriMonth;
            
            var calendar = this.getCurrentCalendar();
            var newGregorianDate = calendar.hijriToGregorian(currentHijriDate.year, currentHijriDate.month, currentHijriDate.day);
            newGregorianDate._hijriDay = currentHijriDate.day;
            newGregorianDate._hijriMonth = currentHijriDate.month;
            newGregorianDate._hijriYear = currentHijriDate.year;
            
            this.state.currentDate = newGregorianDate;
        },

        setHijriYear: function (hijriYear) {
            var currentHijriDate = this.getCurrentHijriDate();
            currentHijriDate.year = hijriYear;
            
            var calendar = this.getCurrentCalendar();
            var newGregorianDate = calendar.hijriToGregorian(currentHijriDate.year, currentHijriDate.month, currentHijriDate.day);
            newGregorianDate._hijriDay = currentHijriDate.day;
            newGregorianDate._hijriMonth = currentHijriDate.month;
            newGregorianDate._hijriYear = currentHijriDate.year;
            
            this.state.currentDate = newGregorianDate;
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