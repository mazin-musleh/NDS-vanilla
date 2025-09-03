// Optimized and Expandable Calendar System for NDS
// This refactored version provides:
// 1. Modular architecture for easy Hijri calendar integration
// 2. Simplified state management
// 3. Cleaner event handling
// 4. Better performance with lazy initialization

(function() {
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
            formatDate: function(date) {
                var day = String(date.getDate()).padStart(2, '0');
                var month = String(date.getMonth() + 1).padStart(2, '0');
                var year = date.getFullYear();
                return day + '/' + month + '/' + year;
            },
            parseDate: function(dateString) {
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
            generateCalendarData: function(year, month) {
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
            getToday: function() {
                return new Date();
            },
            isSameDate: function(date1, date2) {
                return date1.getTime() === date2.getTime();
            }
        },
        
        // Hijri calendar - Core calendar data and mathematical functions only
        hijri: {
            type: 'hijri',
            monthNames: {
                ar: ['محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'],
                en: ['Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani', 'Jumada al-Ula', 'Jumada al-Akhirah', 'Rajab', 'Shaban', 'Ramadan', 'Shawwal', 'Dhu al-Qadah', 'Dhu al-Hijjah']
            },
            weekdayNames: {
                ar: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
                en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            },
            
            // Core mathematical conversion functions
            gregorianToJulianDay: function(year, month, day) {
                if (month <= 2) {
                    year -= 1;
                    month += 12;
                }
                var a = Math.floor(year / 100);
                var b = 2 - a + Math.floor(a / 4);
                return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + b - 1524.5;
            },
            
            julianDayToHijri: function(jd) {
                var hijriEpoch = 1948439.5;
                var daysSinceEpoch = jd - hijriEpoch;
                var averageYearLength = 354.367;
                var estimatedYear = Math.floor(daysSinceEpoch / averageYearLength) + 1;
                
                var yearStart = this.hijriYearStart(estimatedYear);
                if (jd < yearStart) {
                    estimatedYear -= 1;
                    yearStart = this.hijriYearStart(estimatedYear);
                }
                
                var nextYearStart = this.hijriYearStart(estimatedYear + 1);
                if (jd >= nextYearStart) {
                    estimatedYear += 1;
                    yearStart = nextYearStart;
                }
                
                var dayOfYear = Math.floor(jd - yearStart) + 1;
                var month = 1;
                var dayOfMonth = dayOfYear;
                
                for (var m = 1; m <= 12; m++) {
                    var monthLength = this.hijriMonthLength(estimatedYear, m);
                    if (dayOfMonth <= monthLength) {
                        month = m;
                        break;
                    }
                    dayOfMonth -= monthLength;
                }
                
                return {
                    year: estimatedYear,
                    month: month,
                    day: dayOfMonth
                };
            },
            
            julianDayToGregorian: function(jd) {
                var a = Math.floor(jd + 32044);
                var b = Math.floor((4 * a + 3) / 146097);
                var c = a - Math.floor((146097 * b) / 4);
                var d = Math.floor((4 * c + 3) / 1461);
                var e = c - Math.floor((1461 * d) / 4);
                var m = Math.floor((5 * e + 2) / 153);
                
                var day = Math.floor(e - Math.floor((153 * m + 2) / 5) + 1);
                var month = Math.floor(m + 3 - 12 * Math.floor(m / 10));
                var year = Math.floor(100 * b + d - 4800 + Math.floor(m / 10));
                
                return new Date(year, month - 1, day);
            },
            
            gregorianToHijri: function(gregorianDate) {
                try {
                    var jd = this.gregorianToJulianDay(
                        gregorianDate.getFullYear(),
                        gregorianDate.getMonth() + 1,
                        gregorianDate.getDate()
                    );
                    return this.julianDayToHijri(jd);
                } catch (error) {
                    return null;
                }
            },
            
            // Core Hijri calendar rules
            hijriYearStart: function(year) {
                var hijriEpoch = 1948439.5;
                var averageYearLength = 354.367;
                return hijriEpoch + (year - 1) * averageYearLength;
            },
            
            hijriMonthLength: function(year, month) {
                if (month < 1 || month > 12) return 0;
                var baseLengths = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
                var length = baseLengths[month - 1];
                if (month === 12 && this.isHijriLeapYear(year)) {
                    length += 1;
                }
                return length;
            },
            
            isHijriLeapYear: function(year) {
                var leapYears = [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29];
                var cyclePosition = ((year - 1) % 30) + 1;
                return leapYears.includes(cyclePosition);
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
        cacheElements: function(dateInput, formControl) {
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
        initializeState: function() {
            // Auto-detect calendar type based on container class or language
            var calendarType = 'gregorian';
            if (this.elements.container) {
                // Check for .hijri class on container
                if (this.elements.container.classList.contains('hijri')) {
                    calendarType = 'hijri';
                }
                // Or check for Arabic language as fallback
                else if (document.documentElement.lang === 'ar') {
                    calendarType = 'hijri';
                }
            }
            
            return {
                currentDate: new Date(),
                selectedDate: null,
                rangeStart: null,
                rangeEnd: null,
                isInitialized: false,
                calendarType: calendarType
            };
        },

        // Utility methods
        getLanguage: function() {
            return document.documentElement.lang === 'ar' ? 'ar' : 'en';
        },

        getCurrentCalendar: function() {
            return CalendarConfig[this.state.calendarType];
        },

        isRangeMode: function() {
            return this.elements.container.classList.contains('dateRange');
        },

        // Helper function to convert Hijri date to Gregorian date
        hijriDateToGregorianDate: function(hijriYear, hijriMonth, hijriDay) {
            try {
                var calendar = this.getCurrentCalendar();
                if (this.state.calendarType === 'hijri' && calendar.hijriYearStart) {
                    // Get the Julian Day for the start of the Hijri year
                    var yearStartJD = calendar.hijriYearStart(hijriYear);
                    
                    // Calculate the day of year for the target date
                    var dayOfYear = 0;
                    for (var m = 1; m < hijriMonth; m++) {
                        dayOfYear += calendar.hijriMonthLength(hijriYear, m);
                    }
                    dayOfYear += hijriDay - 1;
                    
                    // Convert to Gregorian
                    var targetJD = yearStartJD + dayOfYear;
                    return calendar.julianDayToGregorian(targetJD);
                }
            } catch (error) {
                return null;
            }
            return null;
        },

        // Helper function to convert Hijri year to approximate Gregorian date
        hijriYearToGregorianDate: function(hijriYear) {
            try {
                var calendar = this.getCurrentCalendar();
                if (this.state.calendarType === 'hijri' && calendar.hijriYearStart) {
                    // Get the Julian Day for the start of the Hijri year
                    var yearStartJD = calendar.hijriYearStart(hijriYear);
                    // Convert to Gregorian date (first day of the year)
                    var gregorianDate = calendar.julianDayToGregorian(yearStartJD);
                    
                    // Preserve the current month and day if possible, otherwise use mid-year
                    var currentHijri = calendar.gregorianToHijri(this.state.currentDate);
                    if (currentHijri) {
                        // Try to set the same month and day in the new year
                        var targetMonth = currentHijri.month;
                        var targetDay = Math.min(currentHijri.day, calendar.hijriMonthLength(hijriYear, targetMonth));
                        
                        // Calculate the JD for the target date
                        var dayOfYear = 0;
                        for (var m = 1; m < targetMonth; m++) {
                            dayOfYear += calendar.hijriMonthLength(hijriYear, m);
                        }
                        dayOfYear += targetDay - 1;
                        
                        var targetJD = yearStartJD + dayOfYear;
                        return calendar.julianDayToGregorian(targetJD);
                    }
                    
                    return gregorianDate;
                }
            } catch (error) {
                // Fallback: just return current date with different year
                var fallbackDate = new Date(this.state.currentDate);
                fallbackDate.setFullYear(hijriYear); // This won't be accurate but prevents errors
                return fallbackDate;
            }
            return null;
        },

        // UI-specific calendar methods
        generateCalendarData: function(year, month) {
            var calendar = this.getCurrentCalendar();
            
            if (this.state.calendarType === 'hijri') {
                return this.generateHijriCalendarData(calendar, year, month);
            } else {
                return calendar.generateCalendarData(year, month);
            }
        },
        
        generateHijriCalendarData: function(calendar, year, month) {
            try {
                var daysInMonth = calendar.hijriMonthLength(year, month);
                var yearStart = calendar.hijriYearStart(year);
                var dayOfYear = 0;
                
                for (var m = 1; m < month; m++) {
                    dayOfYear += calendar.hijriMonthLength(year, m);
                }
                
                var firstDayJD = yearStart + dayOfYear;
                var firstDayGregorian = calendar.julianDayToGregorian(firstDayJD);
                var startOffset = firstDayGregorian.getDay();
                
                return {
                    year: year,
                    month: month,
                    daysInMonth: daysInMonth,
                    startOffset: startOffset
                };
            } catch (error) {
                // Fallback to approximation
                var isOddMonth = month % 2 === 1;
                var isLeapYear = calendar.isHijriLeapYear(year);
                var daysInMonth = isOddMonth ? 30 : (month === 12 && isLeapYear) ? 30 : 29;
                var startOffset = ((year - 1400) * 11 + (month - 1) * 3) % 7;
                
                return {
                    year: year,
                    month: month,
                    daysInMonth: daysInMonth,
                    startOffset: startOffset
                };
            }
        },
        
        formatDate: function(date) {
            var calendar = this.getCurrentCalendar();
            
            if (this.state.calendarType === 'hijri') {
                var hijriDate = calendar.gregorianToHijri(date);
                if (!hijriDate) return '';
                
                var day = String(hijriDate.day).padStart(2, '0');
                var month = String(hijriDate.month).padStart(2, '0');
                var year = hijriDate.year;
                return day + '/' + month + '/' + year;
            } else {
                var day = String(date.getDate()).padStart(2, '0');
                var month = String(date.getMonth() + 1).padStart(2, '0');
                var year = date.getFullYear();
                return day + '/' + month + '/' + year;
            }
        },
        
        parseDate: function(dateString) {
            var calendar = this.getCurrentCalendar();
            var parts = dateString.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
            if (!parts) return null;
            
            var day = parseInt(parts[1], 10);
            var month = parseInt(parts[2], 10);
            var year = parseInt(parts[3], 10);
            
            if (this.state.calendarType === 'hijri') {
                if (month < 1 || month > 12 || day < 1) return null;
                
                try {
                    var yearStart = calendar.hijriYearStart(year);
                    var dayOfYear = 0;
                    
                    for (var m = 1; m < month; m++) {
                        dayOfYear += calendar.hijriMonthLength(year, m);
                    }
                    dayOfYear += day - 1;
                    
                    var jd = yearStart + dayOfYear;
                    return calendar.julianDayToGregorian(jd);
                } catch (error) {
                    return null;
                }
            } else {
                var testDate = new Date(year, month - 1, day);
                if (testDate.getDate() === day && 
                    testDate.getMonth() === month - 1 && 
                    testDate.getFullYear() === year) {
                    return testDate;
                }
                return null;
            }
        },
        
        isSameDate: function(date1, date2) {
            if (this.state.calendarType === 'hijri') {
                var calendar = this.getCurrentCalendar();
                var hijri1 = calendar.gregorianToHijri(date1);
                var hijri2 = calendar.gregorianToHijri(date2);
                
                if (!hijri1 || !hijri2) return false;
                
                return hijri1.year === hijri2.year && 
                       hijri1.month === hijri2.month && 
                       hijri1.day === hijri2.day;
            } else {
                return date1.getTime() === date2.getTime();
            }
        },
        
        // Initialize today's Hijri date using getHijriDate function
        initTodaysHijriDate: function() {
            var self = this;
            if (this.state.calendarType === 'hijri' && typeof window.getHijriDate === 'function') {
                window.getHijriDate(true, true).then(function(hijriData) {
                    if (hijriData) {
                        self.todaysHijriDate = {
                            day: hijriData.day,
                            month: hijriData.month, 
                            year: hijriData.year
                        };
                        // Re-render calendar to apply today highlighting with accurate date
                        if (self.state.isInitialized) {
                            self.renderCalendarDates();
                        }
                    }
                }).catch(function(error) {
                    console.warn('Could not get today\'s Hijri date:', error);
                });
            }
        },

        // Calendar lifecycle
        bindBasicEvents: function() {
            var self = this;
            
            // Toggle button
            if (this.elements.toggleBtn) {
                this.elements.toggleBtn.addEventListener('click', function() {
                    self.toggleDropdown();
                });
            }
            
            // Input click
            this.elements.input.addEventListener('click', function() {
                self.toggleDropdown();
            });

            // Outside click handler
            this.handlers.outsideClick = function(e) {
                self.handleOutsideClick(e);
            };
            document.addEventListener('click', this.handlers.outsideClick);

            // Prevent dropdown from closing when clicking inside
            if (this.elements.dropdown) {
                this.elements.dropdown.addEventListener('click', function(e) {
                    e.stopPropagation();
                    self.closeOtherDropdowns(e);
                });
            }
        },

        toggleDropdown: function() {
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

        initializeCalendar: function() {
            this.state.isInitialized = true;
            this.parseInitialValue();
            this.setupCalendarUI();
            this.bindCalendarEvents();
            this.setupLanguageObserver();
            this.initTodaysHijriDate(); // Initialize today's accurate Hijri date
            this.render();
        },

        deinitializeCalendar: function() {
            if (!this.state.isInitialized) return;
            
            this.cleanup();
            this.state.isInitialized = false;
        },

        // Main render method
        render: function() {
            this.renderDropdowns();
            this.renderWeekdays();
            this.renderButtonLabels();
            this.renderCalendarDates();
        },

        // Cleanup on close
        cleanup: function() {
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
        parseInitialValue: function() {
            var inputValue = this.elements.input.value.trim();
            if (!inputValue) return;

            var calendar = this.getCurrentCalendar();
            
            // Handle range format
            if (inputValue.includes(' - ')) {
                var rangeParts = inputValue.split(' - ');
                if (rangeParts.length === 2) {
                    var startDate = this.parseDate(rangeParts[0].trim());
                    var endDate = this.parseDate(rangeParts[1].trim());
                    
                    if (startDate && endDate) {
                        this.state.currentDate = new Date(startDate);
                        this.state.rangeStart = startDate;
                        this.state.rangeEnd = endDate;
                        return;
                    }
                }
            }
            
            // Handle single date format
            var parsedDate = this.parseDate(inputValue);
            if (parsedDate) {
                this.state.currentDate = new Date(parsedDate);
                this.state.selectedDate = parsedDate;
            }
        },

        // Setup calendar UI components
        setupCalendarUI: function() {
            this.updateDropdowns();
            this.renderWeekdays();
            this.renderButtonLabels();
        },

        // Bind calendar-specific events
        bindCalendarEvents: function() {
            this.bindNavigationEvents();
            this.bindDropdownEvents();
            this.bindActionEvents();
        },

        // Bind navigation events (prev/next month)
        bindNavigationEvents: function() {
            var self = this;
            
            if (this.elements.prevBtn) {
                this.elements.prevBtn.addEventListener('click', function() {
                    self.navigateMonth(-1);
                });
            }

            if (this.elements.nextBtn) {
                this.elements.nextBtn.addEventListener('click', function() {
                    self.navigateMonth(1);
                });
            }
        },
        
        // Safe month navigation to prevent month skipping
        navigateMonth: function(direction) {
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
        bindDropdownEvents: function() {
            this.bindMonthDropdown();
            this.bindYearDropdown();
        },

        // Bind month dropdown
        bindMonthDropdown: function() {
            if (!this.elements.monthDropdownBtn) return;
            
            var self = this;
            this.handlers.monthDropdown = function(e) {
                e.preventDefault();
                e.stopPropagation();
                self.toggleMonthDropdown();
            };
            
            this.elements.monthDropdownBtn.addEventListener('click', this.handlers.monthDropdown);
        },

        // Bind year dropdown
        bindYearDropdown: function() {
            if (!this.elements.yearDropdownBtn) return;
            
            var self = this;
            this.handlers.yearDropdown = function(e) {
                e.preventDefault();
                e.stopPropagation();
                self.toggleYearDropdown();
            };
            
            this.elements.yearDropdownBtn.addEventListener('click', this.handlers.yearDropdown);
        },

        // Bind action events (today/clear/save buttons)
        bindActionEvents: function() {
            var self = this;
            
            if (this.elements.todayBtn) {
                this.elements.todayBtn.addEventListener('click', function() {
                    self.selectToday();
                });
            }

            if (this.elements.clearBtn) {
                this.elements.clearBtn.addEventListener('click', function() {
                    self.clearSelection();
                });
            }

            if (this.elements.saveBtn) {
                this.elements.saveBtn.addEventListener('click', function() {
                    self.saveAndClose();
                });
            }
        },
        
        // Save and close calendar
        saveAndClose: function() {
            this.elements.dropdown.classList.add('hidden');
            this.elements.formControl.classList.remove('open');
            this.deinitializeCalendar();
        },

        // Toggle month dropdown
        toggleMonthDropdown: function() {
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
        toggleYearDropdown: function() {
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
        updateDropdowns: function() {
            if (!this.state.isInitialized) return;
            
            var calendar = this.getCurrentCalendar();
            var lang = this.getLanguage();
            
            if (this.elements.monthDropdownBtn) {
                var monthNames = calendar.monthNames[lang];
                if (this.state.calendarType === 'hijri') {
                    // For Hijri calendar, convert current date to Hijri and use Hijri month
                    var hijriDate = calendar.gregorianToHijri(this.state.currentDate);
                    if (hijriDate) {
                        this.elements.monthDropdownBtn.querySelector('.label').textContent = monthNames[hijriDate.month - 1];
                    } else {
                        // Fallback
                        this.elements.monthDropdownBtn.querySelector('.label').textContent = monthNames[this.state.currentDate.getMonth()];
                    }
                } else {
                    // For Gregorian calendar, use regular month
                    this.elements.monthDropdownBtn.querySelector('.label').textContent = monthNames[this.state.currentDate.getMonth()];
                }
            }
            
            if (this.elements.yearDropdownBtn) {
                if (this.state.calendarType === 'hijri') {
                    // For Hijri calendar, show Hijri year
                    var hijriDate = calendar.gregorianToHijri(this.state.currentDate);
                    if (hijriDate) {
                        this.elements.yearDropdownBtn.querySelector('.label').textContent = hijriDate.year;
                    } else {
                        // Fallback
                        this.elements.yearDropdownBtn.querySelector('.label').textContent = this.state.currentDate.getFullYear();
                    }
                } else {
                    // For Gregorian calendar, show Gregorian year
                    this.elements.yearDropdownBtn.querySelector('.label').textContent = this.state.currentDate.getFullYear();
                }
            }
        },

        // Render methods
        renderDropdowns: function() {
            this.updateDropdowns();
        },

        renderWeekdays: function() {
            var weekdaysContainer = this.elements.dropdown.querySelector('.calendar-weekdays');
            if (!weekdaysContainer) return;
            
            weekdaysContainer.innerHTML = '';
            
            var calendar = this.getCurrentCalendar();
            var lang = this.getLanguage();
            var weekdayNames = calendar.weekdayNames[lang];
            
            weekdayNames.forEach(function(name) {
                var weekdayElement = document.createElement('div');
                weekdayElement.className = 'weekday';
                weekdayElement.textContent = name;
                weekdaysContainer.appendChild(weekdayElement);
            });
        },

        renderButtonLabels: function() {
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

        renderCalendarDates: function() {
            if (!this.elements.datesContainer) return;
            
            this.elements.datesContainer.innerHTML = '';
            
            var calendar = this.getCurrentCalendar();
            var year, month;
            
            if (this.state.calendarType === 'hijri') {
                // For Hijri calendar, convert current date to Hijri and use Hijri year/month
                var hijriDate = calendar.gregorianToHijri(this.state.currentDate);
                if (hijriDate) {
                    year = hijriDate.year;
                    month = hijriDate.month;
                } else {
                    // Fallback to Gregorian
                    year = this.state.currentDate.getFullYear();
                    month = this.state.currentDate.getMonth();
                }
            } else {
                // For Gregorian calendar, use Gregorian year/month
                year = this.state.currentDate.getFullYear();
                month = this.state.currentDate.getMonth();
            }
            
            var calendarData = this.generateCalendarData(year, month);
            this.generateCalendarDates(calendarData);
        },

        // Calendar date generation
        generateCalendarDates: function(calendarData) {
            var self = this;
            var calendar = this.getCurrentCalendar();
            
            if (this.state.calendarType === 'hijri') {
                // For Hijri calendar, convert Hijri dates to Gregorian dates
                this.generateHijriCalendarDates(calendarData, calendar);
            } else {
                // For Gregorian calendar, use original logic
                this.generateGregorianCalendarDates(calendarData);
            }
        },
        
        // Generate calendar dates for Gregorian calendar
        generateGregorianCalendarDates: function(calendarData) {
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
        
        // Generate calendar dates for Hijri calendar
        generateHijriCalendarDates: function(calendarData, calendar) {
            var self = this;
            var yearStart = calendar.hijriYearStart(calendarData.year);
            
            // Calculate day of year for the start of current month
            var currentMonthDayOfYear = 0;
            for (var m = 1; m < calendarData.month; m++) {
                currentMonthDayOfYear += calendar.hijriMonthLength(calendarData.year, m);
            }
            
            // Previous month's trailing dates
            for (var i = 0; i < calendarData.startOffset; i++) {
                var dayOfYear = currentMonthDayOfYear - (calendarData.startOffset - i - 1);
                var jd = yearStart + dayOfYear;
                var prevDate = calendar.julianDayToGregorian(jd);
                // Calculate the actual Hijri day number for previous month dates
                var hijriForPrev = calendar.gregorianToHijri(prevDate);
                if (hijriForPrev) {
                    prevDate._hijriDay = hijriForPrev.day;
                } else {
                    // Fallback calculation for previous month
                    var prevMonth = calendarData.month - 1;
                    var prevYear = calendarData.year;
                    if (prevMonth < 1) {
                        prevMonth = 12;
                        prevYear -= 1;
                    }
                    var prevMonthLength = calendar.hijriMonthLength(prevYear, prevMonth);
                    prevDate._hijriDay = prevMonthLength - (calendarData.startOffset - i - 1);
                }
                this.createDateCell(prevDate, 'other-month');
            }
            
            // Current month dates
            for (var day = 1; day <= calendarData.daysInMonth; day++) {
                var dayOfYear = currentMonthDayOfYear + day;
                var jd = yearStart + dayOfYear;
                var currentDate = calendar.julianDayToGregorian(jd);
                // Store the Hijri day number directly since we know it should be 'day'
                currentDate._hijriDay = day;
                this.createDateCell(currentDate, 'current-month');
            }
            
            // Fill remaining cells
            var totalCells = 42; // 6 weeks * 7 days
            var usedCells = calendarData.startOffset + calendarData.daysInMonth;
            
            for (var j = 1; usedCells < totalCells; j++, usedCells++) {
                var dayOfYear = currentMonthDayOfYear + calendarData.daysInMonth + j;
                var jd = yearStart + dayOfYear;
                var nextDate = calendar.julianDayToGregorian(jd);
                // For next month dates, use the sequential day number directly
                // since the Hijri conversion might cross month boundaries incorrectly
                nextDate._hijriDay = j;
                this.createDateCell(nextDate, 'other-month');
            }
        },

        // Create individual date cell
        createDateCell: function(date, type) {
            var self = this;
            var btn = document.createElement('button');
            btn.className = 'nds-btn nds-btn-subtle date-cell';
            btn.type = 'button';
            
            // Determine day number to display
            var dayNumber;
            if (this.state.calendarType === 'hijri') {
                // For Hijri calendar, use pre-calculated Hijri day number if available
                if (date._hijriDay) {
                    dayNumber = date._hijriDay;
                } else {
                    // Fallback to conversion
                    var calendar = this.getCurrentCalendar();
                    var hijriDate = calendar.gregorianToHijri(date);
                    dayNumber = hijriDate ? hijriDate.day : date.getDate();
                }
            } else {
                // For Gregorian calendar, show Gregorian day number
                dayNumber = date.getDate();
            }
            
            btn.innerHTML = '<span class="label">' + dayNumber + '</span>';
            
            // Add appropriate classes
            if (type === 'other-month') {
                btn.classList.add('other-month');
            }
            
            // Check if today
            var isToday = false;
            var today = new Date();
            
            if (this.state.calendarType === 'hijri' && this.todaysHijriDate && date._hijriDay) {
                // Use accurate Hijri date from getHijriDate function if available
                var calendar = this.getCurrentCalendar();
                var dateHijri = calendar.gregorianToHijri(date);
                if (dateHijri) {
                    isToday = this.todaysHijriDate.year === dateHijri.year && 
                              this.todaysHijriDate.month === dateHijri.month && 
                              this.todaysHijriDate.day === dateHijri.day;
                }
            } else {
                // Fallback to regular date comparison
                isToday = this.isSameDate(date, today);
            }
            
            if (isToday) {
                btn.classList.add('today');
            }
            
            // Check selection states
            this.applySelectionStates(btn, date);
            
            // Add click handler
            btn.addEventListener('click', function() {
                self.selectDate(date);
            });
            
            this.elements.datesContainer.appendChild(btn);
        },

        // Apply selection states to date cell
        applySelectionStates: function(btn, date) {
            if (this.isRangeMode()) {
                this.applyRangeStates(btn, date);
            } else if (this.state.selectedDate && this.isSameDate(date, this.state.selectedDate)) {
                btn.classList.add('selected');
            }
        },

        // Apply range selection states
        applyRangeStates: function(btn, date) {
            var isRangeStart = this.state.rangeStart && this.isSameDate(date, this.state.rangeStart);
            var isRangeEnd = this.state.rangeEnd && this.isSameDate(date, this.state.rangeEnd);
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
        selectDate: function(date) {
            if (this.isRangeMode()) {
                this.handleRangeSelection(date);
            } else {
                this.state.selectedDate = new Date(date);
            }
            
            this.updateInput();
            this.renderCalendarDates();
        },

        selectToday: function() {
            console.log('=== TODAY BUTTON DEBUG ===');
            var self = this;
            var today = new Date();
            console.log('Calendar type:', this.state.calendarType);
            console.log('getHijriDate available:', typeof window.getHijriDate);
            
            if (this.state.calendarType === 'hijri' && typeof window.getHijriDate === 'function') {
                console.log('Calling getHijriDate(true, true)...');
                window.getHijriDate(true, true).then(function(hijriData) {
                    console.log('getHijriDate returned:', hijriData);
                    if (hijriData) {
                        // For Hijri calendar, navigate to the Hijri month and select the Hijri day
                        self.state.currentHijriMonth = hijriData.month;
                        self.state.currentHijriYear = hijriData.year;
                        self.state.currentDate = new Date(today.getFullYear(), today.getMonth(), 1);
                        
                        // Store today's Hijri date for highlighting and selection
                        self.todaysHijriDate = {
                            day: hijriData.day,
                            month: hijriData.month,
                            year: hijriData.year
                        };
                        
                        console.log('Set todaysHijriDate:', self.todaysHijriDate);
                        console.log('Set currentHijriMonth:', self.state.currentHijriMonth);
                        console.log('Set currentHijriYear:', self.state.currentHijriYear);
                        
                        // Find and select the day that's already highlighted as .today
                        self.updateDropdowns();
                        self.renderCalendarDates();
                        
                        // After rendering, find the today cell and select it
                        setTimeout(function() {
                            var todayCell = self.elements.datesContainer.querySelector('.date-cell.today');
                            if (todayCell) {
                                console.log('Found today cell, clicking it:', todayCell);
                                todayCell.click(); // This will trigger the normal date selection
                            } else {
                                console.log('No .today cell found, using fallback');
                                // Fallback to Gregorian date selection
                                if (self.isRangeMode()) {
                                    self.handleRangeSelection(today);
                                } else {
                                    self.state.selectedDate = new Date(today);
                                }
                                self.updateInput();
                            }
                        }, 10);
                        
                        return; // Exit early to avoid duplicate rendering
                    } else {
                        console.log('No hijriData, falling back...');
                        self.selectTodayFallback(today);
                    }
                }).catch(function(error) {
                    console.warn('Could not get today\'s Hijri date for today button:', error);
                    self.selectTodayFallback(today);
                });
            } else {
                console.log('Using fallback (Gregorian or no getHijriDate)');
                this.selectTodayFallback(today);
            }
        },
        
        selectTodayFallback: function(today) {
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

        clearSelection: function() {
            this.state.selectedDate = null;
            this.state.rangeStart = null;
            this.state.rangeEnd = null;
            this.elements.input.value = '';
            this.renderCalendarDates();
        },

        // Range selection logic
        handleRangeSelection: function(clickedDate) {
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
        updateInput: function() {
            var value = '';
            
            if (this.isRangeMode() && this.state.rangeStart) {
                value = this.formatDate(this.state.rangeStart);
                if (this.state.rangeEnd) {
                    value += ' - ' + this.formatDate(this.state.rangeEnd);
                }
            } else if (this.state.selectedDate) {
                value = this.formatDate(this.state.selectedDate);
            }
            
            this.elements.input.value = value;
        },

        updateCalendar: function() {
            this.renderCalendarDates();
        },

        // Handle outside clicks
        handleOutsideClick: function(e) {
            var self = this;
            setTimeout(function() {
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

        closeOtherDropdowns: function(e) {
            this.closeDropdownsIfClickedOutside(e.target);
        },

        closeDropdownsIfClickedOutside: function(clickedElement) {
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
        renderMonthOptions: function() {
            if (!this.elements.monthDropdownMenu) return;
            
            this.elements.monthDropdownMenu.innerHTML = '';
            
            var calendar = this.getCurrentCalendar();
            var lang = this.getLanguage();
            var monthNames = calendar.monthNames[lang];
            var self = this;
            
            monthNames.forEach(function(monthName, index) {
                var btn = document.createElement('button');
                btn.className = 'nds-btn nds-btn-subtle month-option';
                btn.setAttribute('role', 'menuitem');
                btn.setAttribute('data-value', index);
                btn.innerHTML = '<span class="label">' + monthName + '</span>';
                
                // Determine current month for comparison
                var currentMonth;
                if (self.state.calendarType === 'hijri') {
                    var hijriDate = calendar.gregorianToHijri(self.state.currentDate);
                    currentMonth = hijriDate ? (hijriDate.month - 1) : self.state.currentDate.getMonth();
                } else {
                    currentMonth = self.state.currentDate.getMonth();
                }
                
                if (index === currentMonth) {
                    btn.classList.add('selected');
                }
                
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    var monthValue = parseInt(this.dataset.value);
                    
                    if (self.state.calendarType === 'hijri') {
                        // For Hijri calendar, convert the selected month to an appropriate Gregorian date
                        var currentHijri = calendar.gregorianToHijri(self.state.currentDate);
                        if (currentHijri) {
                            // Use the selected Hijri month (monthValue + 1) with current year and day
                            var targetDay = Math.min(currentHijri.day, calendar.hijriMonthLength(currentHijri.year, monthValue + 1));
                            var approximateGregorianDate = self.hijriDateToGregorianDate(currentHijri.year, monthValue + 1, targetDay);
                            if (approximateGregorianDate) {
                                self.state.currentDate = approximateGregorianDate;
                            }
                        }
                    } else {
                        // For Gregorian calendar, directly set the month
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

        renderYearOptions: function() {
            if (!this.elements.yearDropdownMenu) return;
            
            this.elements.yearDropdownMenu.innerHTML = '';
            
            var yearRangeBefore = parseInt(this.elements.yearDropdownMenu.dataset.yearBefore) || 5;
            var yearRangeAfter = parseInt(this.elements.yearDropdownMenu.dataset.yearAfter) || 5;
            
            var calendar = this.getCurrentCalendar();
            var todayYear, currentYear, startYear, endYear;
            
            if (this.state.calendarType === 'hijri') {
                // For Hijri calendar, use Hijri years
                var todayHijri = calendar.gregorianToHijri(new Date());
                var currentHijri = calendar.gregorianToHijri(this.state.currentDate);
                
                if (todayHijri && currentHijri) {
                    todayYear = todayHijri.year;
                    currentYear = currentHijri.year;
                } else {
                    // Fallback if conversion fails
                    todayYear = new Date().getFullYear();
                    currentYear = this.state.currentDate.getFullYear();
                }
            } else {
                // For Gregorian calendar, use Gregorian years
                todayYear = new Date().getFullYear();
                currentYear = this.state.currentDate.getFullYear();
            }
            
            startYear = todayYear - yearRangeBefore;
            endYear = todayYear + yearRangeAfter;
            
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
                
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    var yearValue = parseInt(this.dataset.value);
                    
                    if (self.state.calendarType === 'hijri') {
                        // For Hijri calendar, we need to convert the year to a Gregorian equivalent
                        // and update the state.currentDate accordingly
                        var approximateGregorianDate = self.hijriYearToGregorianDate(yearValue);
                        if (approximateGregorianDate) {
                            self.state.currentDate = approximateGregorianDate;
                        }
                    } else {
                        // For Gregorian calendar, directly set the year
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

        // Scroll to selected options
        scrollToSelectedMonth: function() {
            var self = this;
            setTimeout(function() {
                var selectedOption = self.elements.monthDropdownMenu.querySelector('.month-option.selected');
                if (selectedOption) {
                    var dropdownRect = self.elements.monthDropdownMenu.getBoundingClientRect();
                    var optionRect = selectedOption.getBoundingClientRect();
                    var scrollTop = optionRect.top - dropdownRect.top + self.elements.monthDropdownMenu.scrollTop - (dropdownRect.height / 2) + (optionRect.height / 2);
                    self.elements.monthDropdownMenu.scrollTop = Math.max(0, scrollTop);
                }
            }, 10);
        },

        scrollToSelectedYear: function() {
            var self = this;
            setTimeout(function() {
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
        setupLanguageObserver: function() {
            var self = this;
            var languageObserver = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
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
        resetButtonStates: function() {
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
        resetState: function() {
            this.state.selectedDate = null;
            this.state.rangeStart = null;
            this.state.rangeEnd = null;
        },

        // Destroy instance
        destroy: function() {
            // Remove all event listeners
            if (this.handlers.outsideClick) {
                document.removeEventListener('click', this.handlers.outsideClick);
            }
            
            // Disconnect observers
            this.observers.forEach(function(observer) {
                observer.disconnect();
            });
            
            this.cleanup();
        }
    };

    // Integration with existing form initialization
    window.DatePickerCalendar = DatePickerCalendar;
    
})();