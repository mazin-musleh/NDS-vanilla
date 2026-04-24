(() => {
    'use strict';

    /**
     * Helper to get current date in Saudi Arabia timezone (GMT+3)
     * Returns a Date object representing Saudi time
     */
    function getSaudiDateObject() {
        // Get current date/time components in Saudi Arabia timezone
        var now = new Date();
        var saudiTimeStr = now.toLocaleString('en-US', {
            timeZone: 'Asia/Riyadh',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        // Parse the string to create a Date object
        // Format: "MM/DD/YYYY, HH:mm:ss"
        var parts = saudiTimeStr.split(/, /);
        var dateParts = parts[0].split('/');
        var timeParts = parts[1].split(':');

        return new Date(
            parseInt(dateParts[2]), // year
            parseInt(dateParts[0]) - 1, // month (0-indexed)
            parseInt(dateParts[1]), // day
            parseInt(timeParts[0]), // hour
            parseInt(timeParts[1]), // minute
            parseInt(timeParts[2])  // second
        );
    }

    /**
     * Creates a unified Hijri date object structure
     * @param {number} day - Day of the month (1-30)
     * @param {number} month - Month of the year (1-12)
     * @param {number} year - Hijri year
     * @returns {Object} Hijri date object with day, month, year properties
     */
    function createHijriDate(day, month, year) {
        return {
            day: parseInt(day, 10) || null,
            month: parseInt(month, 10) || null,
            year: parseInt(year, 10) || null
        };
    }

    /**
     * Clones a Date and preserves any attached Hijri metadata
     */
    function copyDateWithHijri(date) {
        var copy = new Date(date);
        if (date._hijriDay) {
            copy._hijriDay = date._hijriDay;
            copy._hijriMonth = date._hijriMonth;
            copy._hijriYear = date._hijriYear;
        }
        return copy;
    }

    // Shared across both calendar systems
    var WEEKDAY_NAMES = {
        ar: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
        en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    };

    // Calendar System Configuration
    var CalendarConfig = {
        gregorian: {
            type: 'gregorian',
            monthNames: {
                ar: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
                en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            },
            weekdayNames: WEEKDAY_NAMES,
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
        },

        // Hijri calendar implementation
        hijri: {
            type: 'hijri',
            monthNames: {
                ar: ['محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'],
                en: ['Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani', 'Jumada al-Ula', 'Jumada al-Akhirah', 'Rajab', 'Shaban', 'Ramadan', 'Shawwal', 'Dhu al-Qadah', 'Dhu al-Hijjah']
            },
            weekdayNames: WEEKDAY_NAMES,

            formatDate: function (date) {
                var hijriDate;
                
                // Use attached Hijri data if available
                if (date._hijriDay && date._hijriMonth && date._hijriYear) {
                    hijriDate = createHijriDate(date._hijriDay, date._hijriMonth, date._hijriYear);
                } else {
                    // Convert Gregorian to Hijri
                    hijriDate = this.gregorianToHijri(date);
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

            /**
             * Converts Gregorian date to Hijri using accurate API reference with browser Intl fallback
             * @param {Date} gDate - Gregorian date to convert
             * @returns {Object} Hijri date object with day, month, year properties
             * @throws {Error} If date is invalid or conversion fails
             */
            gregorianToHijri: function (gDate) {
                // Simple validation
                if (!gDate || !(gDate instanceof Date) || isNaN(gDate.getTime())) {
                    throw new Error('Invalid date provided to gregorianToHijri');
                }

                // Try to use accurate today's date as reference if available
                if (window._accurateTodaysHijriDate && window._accurateTodaysGregorianDate) {
                    try {
                        return this.gregorianToHijriUsingReference(gDate,
                            window._accurateTodaysHijriDate, window._accurateTodaysGregorianDate);
                    } catch (e) {
                        // Continue to fallback methods
                    }
                }

                // Fallback to browser's Intl API
                try {
                    var hijriString = new Intl.DateTimeFormat('en-US-u-ca-islamic', {
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric'
                    }).format(gDate);

                    var parts = hijriString.split('/');
                    if (parts.length === 3) {
                        var day = parseInt(parts[1], 10);
                        var month = parseInt(parts[0], 10);
                        var year = parseInt(parts[2], 10);

                        // Validate parsed values
                        if (isNaN(day) || isNaN(month) || isNaN(year) ||
                            day < 1 || day > 30 || month < 1 || month > 12 || year < 1) {
                            throw new Error('Invalid Hijri date components');
                        }

                        return createHijriDate(day, month, year);
                    }
                } catch (e) {
                    console.warn('Hijri conversion via Intl failed, using mathematical fallback:', e.message);
                }

                // Mathematical fallback using Julian Day method
                try {
                    return this.julianToHijri(this.gregorianToJulian(gDate));
                } catch (e) {
                    console.error('All Hijri conversion methods failed:', e.message);
                    throw new Error('Unable to convert Gregorian date to Hijri');
                }
            },

            /**
             * Converts Hijri date to Gregorian using accurate today's date as reference
             * @param {number} hYear - Hijri year
             * @param {number} hMonth - Hijri month (1-12)
             * @param {number} hDay - Hijri day (1-30)
             * @returns {Date} Gregorian Date object
             * @throws {Error} If Hijri date components are invalid
             */
            hijriToGregorian: function (hYear, hMonth, hDay) {
                // Simple validation
                if (hYear < 1 || hMonth < 1 || hMonth > 12 || hDay < 1 || hDay > 30) {
                    throw new Error('Invalid Hijri date: ' + hDay + '/' + hMonth + '/' + hYear);
                }

                // Simple cache
                if (!this._hijriCache) this._hijriCache = {};
                var key = hYear + '-' + hMonth + '-' + hDay;
                if (this._hijriCache[key]) return new Date(this._hijriCache[key]);

                var result = null;

                // Try to use accurate today's date as reference if available
                if (window._accurateTodaysHijriDate && window._accurateTodaysGregorianDate) {
                    try {
                        result = this.convertUsingReference(hYear, hMonth, hDay,
                            window._accurateTodaysHijriDate, window._accurateTodaysGregorianDate);
                    } catch (e) {
                        // Continue to fallback methods
                    }
                }

                // Fallback to original conversion methods
                if (!result) {
                    try {
                        // Start with mathematical conversion as approximation
                        var jd = this.hijriToJulian(hYear, hMonth, hDay);
                        var approxDate = this.julianToGregorian(jd);

                        // Search around the approximate date to find the exact match
                        for (var offset = -3; offset <= 3; offset++) {
                            var testDate = new Date(approxDate);
                            testDate.setDate(approxDate.getDate() + offset);

                            var convertedBack = this.gregorianToHijri(testDate);
                            if (convertedBack &&
                                convertedBack.day === hDay &&
                                convertedBack.month === hMonth &&
                                convertedBack.year === hYear) {
                                result = testDate;
                                break;
                            }
                        }
                    } catch (e) {
                        // Continue to fallback
                    }

                    // Final fallback to original mathematical conversion
                    if (!result) {
                        var jd = this.hijriToJulian(hYear, hMonth, hDay);
                        result = this.julianToGregorian(jd);
                    }
                }

                // Cache the result
                this._hijriCache[key] = new Date(result);

                return result;
            },

            /**
             * Convert Hijri date using accurate today's date as reference
             * @param {number} hYear - Target Hijri year
             * @param {number} hMonth - Target Hijri month
             * @param {number} hDay - Target Hijri day
             * @param {Object} todaysHijri - Today's accurate Hijri date {day, month, year}
             * @param {Date} todaysGregorian - Today's Gregorian date
             * @returns {Date} Converted Gregorian date
             */
            convertUsingReference: function(hYear, hMonth, hDay, todaysHijri, todaysGregorian) {
                // Calculate difference in days between target date and today's date
                var targetHijriDays = this.hijriDateToDays(hYear, hMonth, hDay);
                var todayHijriDays = this.hijriDateToDays(todaysHijri.year, todaysHijri.month, todaysHijri.day);

                var daysDifference = targetHijriDays - todayHijriDays;

                // Create result date at noon to avoid timezone issues with weekday calculation
                var result = new Date(
                    todaysGregorian.getFullYear(),
                    todaysGregorian.getMonth(),
                    todaysGregorian.getDate(),
                    12, 0, 0
                );
                result.setDate(result.getDate() + daysDifference);

                return result;
            },

            /**
             * Convert Gregorian date to Hijri using accurate today's date as reference
             * @param {Date} gDate - Target Gregorian date
             * @param {Object} todaysHijri - Today's accurate Hijri date {day, month, year}
             * @param {Date} todaysGregorian - Today's Gregorian date
             * @returns {Object} Hijri date object with day, month, year properties
             */
            gregorianToHijriUsingReference: function(gDate, todaysHijri, todaysGregorian) {
                // Create dates at noon to avoid timezone boundary issues
                var targetDate = new Date(gDate.getFullYear(), gDate.getMonth(), gDate.getDate(), 12, 0, 0);
                var todayDate = new Date(todaysGregorian.getFullYear(), todaysGregorian.getMonth(), todaysGregorian.getDate(), 12, 0, 0);

                // Calculate difference in days and add to today's Hijri date
                var daysDifference = Math.round((targetDate.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24));
                return this.addDaysToHijriDate(todaysHijri, daysDifference);
            },

            /**
             * Convert Hijri date to a day number for calculation
             * @param {number} year - Hijri year
             * @param {number} month - Hijri month
             * @param {number} day - Hijri day
             * @returns {number} Total days since a reference point
             */
            hijriDateToDays: function(year, month, day) {
                var totalDays = 0;

                // Add days for complete years (approximate)
                totalDays += (year - 1) * 354.367;

                // Add days for complete months in current year
                for (var m = 1; m < month; m++) {
                    totalDays += this.getDaysInHijriMonth(year, m);
                }

                // Add days in current month
                totalDays += day - 1;

                return Math.round(totalDays);
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

                // Create date at noon Saudi time to avoid timezone issues with day-of-week
                return new Date(year, month - 1, day, 12, 0, 0);
            },

            julianToHijri: function (jd) {
                // Approximate conversion - Hijri epoch (July 16, 622 CE)
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

                // Pure conversion - no offset involved
                var gregorianDate = this.hijriToGregorian(year, month, day);
                
                // Attach original input as Hijri metadata
                gregorianDate._hijriDay = day;
                gregorianDate._hijriMonth = month;
                gregorianDate._hijriYear = year;

                return gregorianDate;
            },
        }
    };

    // UI Configuration
    var UIConfig = {
        buttonLabels: {
            ar: { today: 'اليوم', clear: 'مسح', save: 'حفظ' },
            en: { today: 'Today', clear: 'Clear', save: 'Save' }
        },
        selectors: {
            container: '.nds-form-container',
            dropdown: '.nds-date-picker-dropdown',
            toggleBtn: '.date-picker-toggle',
            monthDropmenu: '.nds-month-dropmenu',
            yearDropmenu: '.nds-year-dropmenu',
            monthDropdownBtn: '.nds-month-dropmenu .nds-dropmenu-trigger',
            yearDropdownBtn: '.nds-year-dropmenu .nds-dropmenu-trigger',
            monthDropdownMenu: '.nds-month-dropmenu .nds-dropmenu-scroll',
            yearDropdownMenu: '.nds-year-dropmenu .nds-dropmenu-scroll',
            prevBtn: '.prev-month',
            nextBtn: '.next-month',
            todayBtn: '.today-btn',
            clearBtn: '.clear-btn',
            saveBtn: '.save-btn',
            datesContainer: '.nds-calendar-dates'
        }
    };

    // Calendar Instance Class
    function DatePickerCalendar(dateInput, formControl) {
        var container = formControl.closest(UIConfig.selectors.container);
        if (!container) {
            console.warn('Calendar container not found');
            return;
        }

        this.elements = {
            input: dateInput,
            formControl: formControl,
            container: container,
            toggleBtn: container.querySelector(UIConfig.selectors.toggleBtn)
        };

        this.state = this.initializeState();
        this.handlers = {};
        this.observers = [];
        this.isDropdownCreated = false;

        // Bind events that need dropdown creation
        this.bindInitEvents();
    }

    DatePickerCalendar.prototype = {
        // Bind events that trigger dropdown creation
        bindInitEvents: function () {
            var self = this;

            // Handler to ensure dropdown exists before toggling
            var ensureDropdownAndToggle = function (e) {
                if (!self.isDropdownCreated) {
                    // Create dropdown DOM
                    self.removeDropdownDOM();
                    self.createDropdownDOM();

                    // Re-cache all elements
                    self.elements = self.cacheElements(self.elements.input, self.elements.formControl);
                    if (!self.elements.dropdown) {
                        console.error('Failed to create dropdown');
                        return;
                    }

                    self.isDropdownCreated = true;

                    // Bind dropdown events (including outside click) after a small delay
                    // to avoid catching the current click event
                    setTimeout(function() {
                        self.bindBasicEvents();
                    }, 0);
                }

                // Now toggle the dropdown
                self.toggleDropdown();
            };

            // Bind to input click only (focus will trigger click anyway)
            this.elements.input.addEventListener('click', ensureDropdownAndToggle);

            // Bind to toggle button if it exists
            if (this.elements.toggleBtn) {
                this.elements.toggleBtn.addEventListener('click', ensureDropdownAndToggle);
            }

            this.handlers.ensureDropdownAndToggle = ensureDropdownAndToggle;
        },

        // Create dropdown DOM structure
        createDropdownDOM: function () {
            var dropdown = document.createElement('div');
            dropdown.className = 'nds-date-picker-dropdown';
            NDS.State.set(dropdown, 'hidden');

            var calendarHTML =
                '<div class="nds-calendar-header">' +
                    '<div class="nds-calendar-title">' +
                        '<div class="nds-month-year-selectors">' +
                            '<div class="nds-dropmenu nds-month-dropmenu">' +
                                '<button class="nds-dropmenu-trigger nds-btn nds-subtle nds-menu-btn" aria-label="Select month">' +
                                    '<span class="nds-label"></span>' +
                                '</button>' +
                                '<div class="nds-dropmenu-menu">' +
                                    '<div class="nds-dropmenu-scroll"></div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="nds-dropmenu nds-year-dropmenu">' +
                                '<button class="nds-dropmenu-trigger nds-btn nds-subtle nds-menu-btn" aria-label="Select year">' +
                                    '<span class="nds-label"></span>' +
                                '</button>' +
                                '<div class="nds-dropmenu-menu">' +
                                    '<div class="nds-dropmenu-scroll"></div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="nds-calendar-month-switch">' +
                            '<button class="nds-btn nds-subtle prev-month" type="button" aria-label="Previous month">' +
                                '<i class="nds-icon nds-hgi-arrow-right-02" aria-hidden="true"></i>' +
                            '</button>' +
                            '<button class="nds-btn nds-subtle next-month" type="button" aria-label="Next month">' +
                                '<i class="nds-icon nds-hgi-arrow-left-02" aria-hidden="true"></i>' +
                            '</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="nds-calendar-body">' +
                    '<div class="nds-calendar-weekdays"></div>' +
                    '<div class="nds-calendar-dates"></div>' +
                '</div>' +
                '<div class="nds-calendar-footer">' +
                    '<div class="nds-calendar-action-start">' +
                        '<button class="nds-btn nds-secondary-outline today-btn" type="button">' +
                            '<span class="nds-label">Today</span>' +
                        '</button>' +
                    '</div>' +
                    '<div class="nds-calendar-action-end">' +
                        '<button class="nds-btn nds-subtle clear-btn" type="button">' +
                            '<span class="nds-label">Clear</span>' +
                        '</button>' +
                        '<button class="nds-btn nds-primary save-btn" type="button">' +
                            '<span class="nds-label">Save</span>' +
                        '</button>' +
                    '</div>' +
                '</div>';

            dropdown.innerHTML = calendarHTML;

            // Insert dropdown after the input, inside the same parent (form-control)
            this.elements.input.insertAdjacentElement('afterend', dropdown);
        },

        // Remove dropdown DOM
        removeDropdownDOM: function () {
            var dropdown = this.elements.container.querySelector(UIConfig.selectors.dropdown);
            if (dropdown) {
                dropdown.remove();
            }
        },

        // Cache DOM elements
        cacheElements: function (dateInput, formControl) {
            var container = formControl.closest(UIConfig.selectors.container);
            if (!container) {
                console.warn('Calendar container not found');
                return {};
            }

            // Cache elements with validation and fallback handling
            var elements = {
                container: container,
                input: dateInput,
                formControl: formControl
            };

            // Required elements
            var requiredSelectors = {
                dropdown: UIConfig.selectors.dropdown,
                datesContainer: UIConfig.selectors.datesContainer
            };

            // Optional elements
            var optionalSelectors = {
                toggleBtn: UIConfig.selectors.toggleBtn,
                monthDropmenu: UIConfig.selectors.monthDropmenu,
                yearDropmenu: UIConfig.selectors.yearDropmenu,
                monthDropdownBtn: UIConfig.selectors.monthDropdownBtn,
                yearDropdownBtn: UIConfig.selectors.yearDropdownBtn,
                monthDropdownMenu: UIConfig.selectors.monthDropdownMenu,
                yearDropdownMenu: UIConfig.selectors.yearDropdownMenu,
                prevBtn: UIConfig.selectors.prevBtn,
                nextBtn: UIConfig.selectors.nextBtn,
                todayBtn: UIConfig.selectors.todayBtn,
                clearBtn: UIConfig.selectors.clearBtn,
                saveBtn: UIConfig.selectors.saveBtn
            };

            // Query required elements
            for (var key in requiredSelectors) {
                var element = container.querySelector(requiredSelectors[key]);
                if (!element) {
                    console.error('Required calendar element not found:', key, requiredSelectors[key]);
                    return {};
                }
                elements[key] = element;
            }

            // Query optional elements
            for (var key in optionalSelectors) {
                var element = container.querySelector(optionalSelectors[key]);
                if (element) {
                    elements[key] = element;
                } else {
                    console.warn('Optional calendar element not found:', key, optionalSelectors[key]);
                }
            }

            return elements;
        },

        // Initialize calendar state
        initializeState: function () {
            return {
                currentDate: getSaudiDateObject(),
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
            
            // Check hijri class dynamically each time
            if (this.elements.container && this.elements.container.classList.contains('nds-hijri')) {
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
            // Check if the date input has a data-lang attribute
            if (this.elements && this.elements.input) {
                var dataLang = this.elements.input.getAttribute('data-lang');
                if (dataLang) {
                    return dataLang.split('-')[0].toLowerCase() === 'ar' ? 'ar' : 'en';
                }
                // Check if the date input has a lang attribute
                if (this.elements.input.lang) {
                    return this.elements.input.lang.split('-')[0].toLowerCase() === 'ar' ? 'ar' : 'en';
                }
            }
            // Fallback to document language
            return NDS.isArabic ? 'ar' : 'en';
        },

        getCurrentCalendar: function () {
            return CalendarConfig[this.state.calendarType];
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

        getDisplayDayNumber: function (date) {
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
                // Get today's Hijri date (cached)
                var todaysHijriDate = this.getTodaysHijriDate();
                if (todaysHijriDate && date._hijriDay) {
                    return date._hijriDay === todaysHijriDate.day &&
                        date._hijriMonth === todaysHijriDate.month &&
                        date._hijriYear === todaysHijriDate.year;
                }
            }
            var today = getSaudiDateObject();
            return this.isSameDay(date, today);
        },

        getTodaysHijriDate: function () {
            // Simple cache for today's Hijri date - API handles date validation internally
            if (!this._cachedTodaysHijriDate) {
                // Try to use global getHijriDate function if available
                if (typeof getHijriDate === 'function') {
                    var self = this;

                    getHijriDate(false, true).then(function(hijriData) {
                        if (hijriData && hijriData.day && hijriData.month && hijriData.year) {
                            // Cache the result
                            self._cachedTodaysHijriDate = hijriData;

                            // Store accurate reference data globally for conversions
                            window._accurateTodaysHijriDate = hijriData;
                            window._accurateTodaysGregorianDate = getSaudiDateObject();

                            // Save to currentDate for getCurrentHijriDate to use
                            self.state.currentDate._hijriDay = hijriData.day;
                            self.state.currentDate._hijriMonth = hijriData.month;
                            self.state.currentDate._hijriYear = hijriData.year;

                            // Re-render calendar with accurate date
                            self.render();
                        }
                    }).catch(function(e) {
                        // API failed, fallback handled below
                    });
                }

                // Return math fallback for initial render
                var today = getSaudiDateObject();
                this._cachedTodaysHijriDate = CalendarConfig.hijri.gregorianToHijri(today);
            }

            return this._cachedTodaysHijriDate;
        },

        // Calendar lifecycle
        bindBasicEvents: function () {
            var self = this;

            // Outside click handler
            this.handlers.outsideClick = function (e) {
                self.handleOutsideClick(e);
            };
            document.addEventListener('click', this.handlers.outsideClick);

            // Prevent dropdown from closing when clicking inside
            if (this.elements.dropdown) {
                this.handlers.dropdownClick = function (e) {
                    e.stopPropagation();
                };
                this.elements.dropdown.addEventListener('click', this.handlers.dropdownClick);
            }
        },

        toggleDropdown: function () {
            var isNowOpen = NDS.State.has(this.elements.dropdown, 'hidden');

            if (isNowOpen) {
                NDS.State.remove(this.elements.dropdown, 'hidden');
                NDS.State.add(this.elements.container, 'open');

                this.initializeCalendar();
                this.adjustDropdownPosition();
            } else {
                NDS.State.add(this.elements.dropdown, 'hidden');
                NDS.State.remove(this.elements.container, 'open');
                this.cleanup();
            }
        },

        adjustDropdownPosition: function () {
            var dropdown = this.elements.dropdown;
            var formControl = this.elements.formControl;

            if (!dropdown || !formControl) return;

            // Stage with fixed + hidden to avoid extending the page AND to
            // give NDS.flipPosition a non-zero menuRect to work with — the
            // dropdown is otherwise hidden via data-state.
            dropdown.style.cssText = 'visibility:hidden;position:fixed;top:0;left:0;';

            // respectNav: false — the dropdown is positioned inline beneath
            // its form-control sibling, so the sticky mainnav doesn't apply
            // as a top boundary.
            var p = NDS.flipPosition(formControl, dropdown, { respectNav: false });

            // Clear measurement styles, flip above if not enough space below
            if (p.spaceBelow < p.menuRect.height + 4 && p.triggerRect.top > p.spaceBelow) {
                dropdown.style.cssText = 'top:unset;margin-top:unset;bottom:100%;margin-bottom:4px;';
            } else {
                dropdown.style.cssText = '';
            }
        },

        initializeCalendar: function () {
            // Re-detect calendar type each time
            this.state.calendarType = this.detectCalendarType();
            this.state.isInitialized = true;

            // Get accurate Hijri date FIRST before parsing initial values
            // This ensures accurate conversions when parsing dates
            if (typeof getHijriDate === 'function' && this.state.calendarType === 'hijri') {
                this.initializeHijriCalendarWithParsing();
            } else {
                // For Gregorian calendar or when getHijriDate is unavailable
                this.parseInitialValue();
                this.setupCalendarUI();
                this.bindCalendarEvents();
                this.setupLanguageObserver();

                if (typeof getHijriDate === 'function') {
                    this.fetchAccurateHijriReference();
                }
                this.render();
            }
        },

        initializeHijriCalendarWithParsing: function () {
            var self = this;
            getHijriDate(false, true).then(function(hijriData) {
                self.storeAccurateHijriData(hijriData);
                self.completeCalendarSetup();
            }).catch(function() {
                self.completeCalendarSetup();
            });
        },

        fetchAccurateHijriReference: function () {
            var self = this;
            getHijriDate(false, true).then(function(hijriData) {
                self.storeAccurateHijriData(hijriData);
                if (self.state.selectedDate || self.state.rangeStart) {
                    self.updateInput();
                }
            }).catch(function() {});
        },

        // Helper to store accurate Hijri data and set global reference
        storeAccurateHijriData: function(hijriData) {
            if (hijriData && hijriData.day && hijriData.month && hijriData.year) {
                this._cachedTodaysHijriDate = hijriData;
                window._accurateTodaysHijriDate = hijriData;
                window._accurateTodaysGregorianDate = getSaudiDateObject();

                this.state.currentDate._hijriDay = hijriData.day;
                this.state.currentDate._hijriMonth = hijriData.month;
                this.state.currentDate._hijriYear = hijriData.year;
            }
        },

        // Helper to complete calendar setup after Hijri data fetch
        completeCalendarSetup: function() {
            this.parseInitialValue();
            this.setupCalendarUI();
            this.bindCalendarEvents();
            this.setupLanguageObserver();
            this.render();
        },

        // Main render method
        render: function () {
            this.updateDropdowns();
            this.renderWeekdays();
            this.renderButtonLabels();
            this.renderCalendarDates();
        },

        // Cleanup on close - Clear all cache
        cleanup: function () {
            // Remove event listeners for calendar-specific elements
            var handlers = ['todayBtn', 'clearBtn', 'saveBtn', 'prevBtn', 'nextBtn', 'dropdownClick'];
            var elements = ['todayBtn', 'clearBtn', 'saveBtn', 'prevBtn', 'nextBtn', 'dropdown'];

            for (var i = 0; i < handlers.length; i++) {
                if (this.handlers[handlers[i]] && this.elements[elements[i]]) {
                    this.elements[elements[i]].removeEventListener('click', this.handlers[handlers[i]]);
                    delete this.handlers[handlers[i]];
                }
            }

            // Close dropmenu instances — keep alive, reused on next calendar open
            if (this.monthDropmenuInstance && this.monthDropmenuInstance.isOpen) {
                this.monthDropmenuInstance.close();
            }
            if (this.yearDropmenuInstance && this.yearDropmenuInstance.isOpen) {
                this.yearDropmenuInstance.close();
            }

            // Note: Keep ensureDropdownAndToggle and outsideClick handlers - they persist

            // Clear rendered content
            if (this.elements.monthDropdownMenu) this.elements.monthDropdownMenu.innerHTML = '';
            if (this.elements.yearDropdownMenu) this.elements.yearDropdownMenu.innerHTML = '';
            if (this.elements.datesContainer) this.elements.datesContainer.innerHTML = '';

            // Reset all inline positioning styles
            if (this.elements.dropdown) {
                this.elements.dropdown.style.cssText = '';
            }

            // Clear ALL Hijri cache
            CalendarConfig.hijri._hijriCache = {};
            this._cachedTodaysHijriDate = null;
            window._accurateTodaysHijriDate = null;
            window._accurateTodaysGregorianDate = null;

            // Disconnect observers
            if (this.observers) {
                this.observers.forEach(function(observer) {
                    if (observer && observer.disconnect) observer.disconnect();
                });
                this.observers = [];
            }

            // Reset states
            this.resetButtonStates();
            this.resetState();
            this.state.isInitialized = false;
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
                        this.state.currentDate = startDate;
                        this.state.rangeStart = startDate;
                        this.state.rangeEnd = endDate;

                        var convertedStart = this.getConvertedDate(startDate);
                        var convertedEnd = this.getConvertedDate(endDate);
                        if (convertedStart && convertedEnd) {
                            this.elements.input.dataset.convertedDate = convertedStart + ' - ' + convertedEnd;
                        }
                        return;
                    }
                }
            }

            // Handle single date format
            var parsedDate = calendar.parseDate(inputValue);
            if (parsedDate) {
                this.state.currentDate = parsedDate;
                this.state.selectedDate = parsedDate;

                var convertedValue = this.getConvertedDate(parsedDate);
                if (convertedValue) {
                    this.elements.input.dataset.convertedDate = convertedValue;
                }
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
                this.handlers.prevBtn = function () {
                    self.navigateMonth(-1);
                };
                this.elements.prevBtn.addEventListener('click', this.handlers.prevBtn);
            }

            if (this.elements.nextBtn) {
                this.handlers.nextBtn = function () {
                    self.navigateMonth(1);
                };
                this.elements.nextBtn.addEventListener('click', this.handlers.nextBtn);
            }
        },

        // Navigate month (unified for Gregorian and Hijri)
        navigateMonth: function (direction) {
            if (this.state.calendarType === 'hijri') {
                var hijri = this.getCurrentHijriDate();
                hijri.month += direction;
                if (hijri.month < 1) { hijri.month = 12; hijri.year--; }
                else if (hijri.month > 12) { hijri.month = 1; hijri.year++; }

                var calendar = this.getCurrentCalendar();
                var newDate = calendar.hijriToGregorian(hijri.year, hijri.month, 1);
                newDate._hijriDay = 1;
                newDate._hijriMonth = hijri.month;
                newDate._hijriYear = hijri.year;
                this.state.currentDate = newDate;
            } else {
                var month = this.state.currentDate.getMonth() + direction;
                var year = this.state.currentDate.getFullYear();
                if (month < 0) { month = 11; year--; }
                else if (month > 11) { month = 0; year++; }
                this.state.currentDate.setFullYear(year);
                this.state.currentDate.setMonth(month);
            }

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
            return CalendarConfig.hijri.gregorianToHijri(this.state.currentDate);
        },

        // Bind dropdown events — initialize NDSDropmenu instances
        bindDropdownEvents: function () {
            var self = this;

            if (this.elements.monthDropmenu && NDS.Dropmenu && !this.monthDropmenuInstance) {
                this.monthDropmenuInstance = NDS.Dropmenu.create(this.elements.monthDropmenu);
                this.elements.monthDropmenu.ndsDropmenu = this.monthDropmenuInstance;
                this.elements.monthDropmenu.addEventListener('nds:dropmenu:opened', function () {
                    self.renderMonthOptions();
                    self.scrollToSelected(self.elements.monthDropdownMenu, '.nds-month-option[data-state~="selected"]');
                });
            }

            if (this.elements.yearDropmenu && NDS.Dropmenu && !this.yearDropmenuInstance) {
                this.yearDropmenuInstance = NDS.Dropmenu.create(this.elements.yearDropmenu);
                this.elements.yearDropmenu.ndsDropmenu = this.yearDropmenuInstance;
                this.elements.yearDropmenu.addEventListener('nds:dropmenu:opened', function () {
                    self.renderYearOptions();
                    self.scrollToSelected(self.elements.yearDropdownMenu, '.nds-year-option[data-state~="selected"]');
                });
            }
        },

        // Bind action events (today/clear/save buttons)
        bindActionEvents: function () {
            var self = this;

            if (this.elements.todayBtn) {
                this.handlers.todayBtn = function () { self.selectToday(); };
                this.elements.todayBtn.addEventListener('click', this.handlers.todayBtn);
            }

            if (this.elements.clearBtn) {
                this.handlers.clearBtn = function () { self.clearSelection(); };
                this.elements.clearBtn.addEventListener('click', this.handlers.clearBtn);
            }

            if (this.elements.saveBtn) {
                this.handlers.saveBtn = function () { self.saveAndClose(); };
                this.elements.saveBtn.addEventListener('click', this.handlers.saveBtn);
            }
        },

        // Save and close calendar (reuse close path from toggleDropdown)
        saveAndClose: function () {
            if (!NDS.State.has(this.elements.dropdown, 'hidden')) {
                this.toggleDropdown();
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
                this.elements.monthDropdownBtn.querySelector('.nds-label').textContent = monthNames[monthIndex];
            }

            if (this.elements.yearDropdownBtn) {
                this.elements.yearDropdownBtn.querySelector('.nds-label').textContent = this.getCurrentYear();
            }
        },

        // Render methods
        renderWeekdays: function () {
            var weekdaysContainer = this.elements.dropdown.querySelector('.nds-calendar-weekdays');
            if (!weekdaysContainer) return;

            weekdaysContainer.innerHTML = '';

            var calendar = this.getCurrentCalendar();
            var lang = this.getLanguage();
            var weekdayNames = calendar.weekdayNames[lang];

            weekdayNames.forEach(function (name) {
                var weekdayElement = document.createElement('div');
                weekdayElement.className = 'nds-weekday';
                weekdayElement.textContent = name;
                weekdaysContainer.appendChild(weekdayElement);
            });
        },

        renderButtonLabels: function () {
            var labels = UIConfig.buttonLabels[this.getLanguage()];
            var map = { todayBtn: labels.today, clearBtn: labels.clear, saveBtn: labels.save };
            for (var key in map) {
                if (this.elements[key]) {
                    var el = this.elements[key].querySelector('.nds-label');
                    if (el) el.textContent = map[key];
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

        // Calendar date generation (unified for Gregorian and Hijri)
        generateCalendarDates: function (calendarData) {
            var isHijri = this.state.calendarType === 'hijri';
            var calendar = isHijri ? this.getCurrentCalendar() : null;

            // Date factory: creates a date with Hijri metadata if needed
            function makeDate(year, month, day) {
                if (isHijri) {
                    var d = calendar.hijriToGregorian(year, month, day);
                    d._hijriDay = day;
                    d._hijriMonth = month;
                    d._hijriYear = year;
                    return d;
                }
                return new Date(year, month, day);
            }

            // Previous month trailing dates
            var prevMonth, prevYear;
            if (isHijri) {
                prevMonth = calendarData.month - 1;
                prevYear = calendarData.year;
                if (prevMonth < 1) { prevMonth = 12; prevYear--; }
                var daysInPrev = calendar.getDaysInHijriMonth(prevYear, prevMonth);
                for (var i = 0; i < calendarData.startOffset; i++) {
                    this.createDateCell(makeDate(prevYear, prevMonth, daysInPrev - (calendarData.startOffset - i - 1)), 'other-month');
                }
            } else {
                for (var i = 0; i < calendarData.startOffset; i++) {
                    this.createDateCell(new Date(calendarData.year, calendarData.month, 0 - (calendarData.startOffset - i - 1)), 'other-month');
                }
            }

            // Current month dates
            for (var day = 1; day <= calendarData.daysInMonth; day++) {
                this.createDateCell(makeDate(calendarData.year, calendarData.month, day), 'current-month');
            }

            // Fill remaining cells to 42
            var usedCells = calendarData.startOffset + calendarData.daysInMonth;
            var nextMonth = isHijri ? calendarData.month + 1 : calendarData.month + 1;
            var nextYear = calendarData.year;
            if (isHijri && nextMonth > 12) { nextMonth = 1; nextYear++; }

            for (var j = 1; usedCells < 42; j++, usedCells++) {
                this.createDateCell(makeDate(nextYear, nextMonth, j), 'other-month');
            }
        },

        // Create individual date cell
        createDateCell: function (date, type) {
            var self = this;
            var btn = document.createElement('button');
            btn.className = 'nds-btn nds-subtle nds-date-cell';
            btn.type = 'button';

            // Use helper method for day number display
            btn.innerHTML = '<span class="nds-label">' + this.getDisplayDayNumber(date) + '</span>';

            // Add appropriate classes
            if (type === 'other-month') {
                NDS.State.add(btn, 'other-month');
            }

            // Check if today using calendar-aware method
            if (this.isTodayDate(date)) {
                NDS.State.add(btn, 'today');
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
                NDS.State.add(btn, 'selected');
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

        // Check if date is in range considering calendar type
        isDateInRange: function (date, rangeStart, rangeEnd) {
            if (this.state.calendarType === 'hijri') {
                // For Hijri calendar, compare using Hijri metadata
                if (!date._hijriDay || !rangeStart._hijriDay || !rangeEnd._hijriDay) {
                    return false;
                }
                
                var dateValue = date._hijriYear * 10000 + date._hijriMonth * 100 + date._hijriDay;
                var startValue = rangeStart._hijriYear * 10000 + rangeStart._hijriMonth * 100 + rangeStart._hijriDay;
                var endValue = rangeEnd._hijriYear * 10000 + rangeEnd._hijriMonth * 100 + rangeEnd._hijriDay;
                
                return dateValue > startValue && dateValue < endValue;
            } else {
                // For Gregorian calendar, use regular date comparison
                return date > rangeStart && date < rangeEnd;
            }
        },

        // Apply range selection states
        applyRangeStates: function (btn, date) {
            var isRangeStart = this.state.rangeStart && this.isSameCalendarDate(date, this.state.rangeStart);
            var isRangeEnd = this.state.rangeEnd && this.isSameCalendarDate(date, this.state.rangeEnd);
            var isInRange = this.state.rangeStart && this.state.rangeEnd && 
                this.isDateInRange(date, this.state.rangeStart, this.state.rangeEnd);

            if (isRangeStart) {
                NDS.State.add(btn, 'range-start');
            }

            if (isRangeEnd) {
                NDS.State.add(btn, 'range-end');
            }

            if (isInRange) {
                NDS.State.add(btn, 'in-range');
            }

            // Add visual continuity tokens for styling
            if (isRangeStart && this.state.rangeEnd) {
                NDS.State.add(btn, 'has-range-end');
            }
            if (isRangeEnd && this.state.rangeStart) {
                NDS.State.add(btn, 'has-range-start');
            }
        },

        // Date selection handlers
        selectDate: function (date) {
            if (this.isRangeMode()) {
                this.handleRangeSelection(date);
            } else {
                this.state.selectedDate = copyDateWithHijri(date);
            }

            this.updateInput();
            this.renderCalendarDates();
        },

        selectToday: function () {
            var today = getSaudiDateObject();

            // For Hijri calendar, use accurate API data
            if (this.state.calendarType === 'hijri') {
                var todaysHijriDate = this.getTodaysHijriDate(); // Use accurate cached data
                today._hijriDay = todaysHijriDate.day;
                today._hijriMonth = todaysHijriDate.month;
                today._hijriYear = todaysHijriDate.year;
            }

            // In range mode, just navigate to today's month (preserve selection)
            if (!this.isRangeMode()) {
                this.state.selectedDate = copyDateWithHijri(today);
            }

            // Navigate to today's month
            if (this.state.calendarType === 'hijri') {
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
            if (!this.isRangeMode()) {
                this.updateInput();
            }
        },

        clearSelection: function () {
            this.state.selectedDate = null;
            this.state.rangeStart = null;
            this.state.rangeEnd = null;
            this.elements.input.value = '';
            this.elements.input.dispatchEvent(new Event('change', { bubbles: true }));
            this.renderCalendarDates();
        },

        // Range selection logic
        handleRangeSelection: function (clickedDate) {
            if (!this.state.rangeStart || (this.state.rangeStart && this.state.rangeEnd)) {
                this.state.rangeStart = copyDateWithHijri(clickedDate);
                this.state.rangeEnd = null;
                this.state.selectedDate = copyDateWithHijri(clickedDate);
            } else if (this.state.rangeStart && !this.state.rangeEnd) {
                if (clickedDate >= this.state.rangeStart) {
                    this.state.rangeEnd = copyDateWithHijri(clickedDate);
                } else {
                    this.state.rangeEnd = copyDateWithHijri(this.state.rangeStart);
                    this.state.rangeStart = copyDateWithHijri(clickedDate);
                }
                this.state.selectedDate = copyDateWithHijri(this.state.rangeEnd);
            }
        },

        // Update input value
        updateInput: function () {
            var calendar = this.getCurrentCalendar();
            var value = '';
            var convertedValue = '';

            if (this.isRangeMode() && this.state.rangeStart) {
                value = calendar.formatDate(this.state.rangeStart);
                convertedValue = this.getConvertedDate(this.state.rangeStart);
                if (this.state.rangeEnd) {
                    value += ' - ' + calendar.formatDate(this.state.rangeEnd);
                    convertedValue += ' - ' + this.getConvertedDate(this.state.rangeEnd);
                }
            } else if (this.state.selectedDate) {
                value = calendar.formatDate(this.state.selectedDate);
                convertedValue = this.getConvertedDate(this.state.selectedDate);
            }

            this.elements.input.value = value;
            this.elements.input.dispatchEvent(new Event('change', { bubbles: true }));

            // Store converted date in dataset
            if (convertedValue) {
                this.elements.input.dataset.convertedDate = convertedValue;
            } else {
                delete this.elements.input.dataset.convertedDate;
            }
        },

        // Get converted date for input dataset (opposite calendar format)
        getConvertedDate: function (date) {
            if (!date) return '';

            if (this.state.calendarType === 'hijri') {
                if (date._hijriDay && date._hijriMonth && date._hijriYear &&
                    window._accurateTodaysHijriDate && window._accurateTodaysGregorianDate) {
                    var accurateGregorian = CalendarConfig.hijri.convertUsingReference(
                        date._hijriYear, date._hijriMonth, date._hijriDay,
                        window._accurateTodaysHijriDate, window._accurateTodaysGregorianDate
                    );
                    return CalendarConfig.gregorian.formatDate(accurateGregorian);
                }
                return CalendarConfig.gregorian.formatDate(date);
            }

            // Gregorian → Hijri: formatDate handles conversion internally
            return CalendarConfig.hijri.formatDate(date);
        },

        // Utility methods
        isSameDay: function (date1, date2) {
            return date1.getDate() === date2.getDate() &&
                date1.getMonth() === date2.getMonth() &&
                date1.getFullYear() === date2.getFullYear();
        },

        // Handle outside clicks
        handleOutsideClick: function (e) {
            var self = this;
            var clickTarget = e.target;

            setTimeout(function () {
                // Don't process if clicked on input or toggle button
                if (clickTarget === self.elements.input ||
                    (self.elements.toggleBtn && self.elements.toggleBtn.contains(clickTarget))) {
                    return;
                }

                // Close entire calendar if clicked outside container
                if (self.isDropdownCreated && !self.elements.container.contains(clickTarget)) {
                    if (self.elements.dropdown) {
                        NDS.State.add(self.elements.dropdown, 'hidden');
                    }
                    NDS.State.remove(self.elements.container, 'open');
                    self.cleanup();
                }
            }, 0);
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
                btn.className = 'nds-btn nds-subtle nds-dropmenu-item nds-month-option';
                btn.setAttribute('role', 'menuitem');
                btn.setAttribute('data-value', index);
                btn.innerHTML = '<span class="nds-label">' + monthName + '</span>';

                var isSelected = self.state.calendarType === 'hijri' ?
                    (index + 1) === self.getCurrentMonth() : // For Hijri: compare (0-based index + 1) with 1-based month
                    index === self.getCurrentMonth();        // For Gregorian: compare 0-based with 0-based

                if (isSelected) {
                    NDS.State.add(btn, 'selected');
                }

                btn.addEventListener('click', function (e) {
                    e.preventDefault();
                    var monthValue = parseInt(this.dataset.value);

                    if (self.state.calendarType === 'hijri') {
                        self.setHijriDatePart('month', monthValue + 1); // Convert 0-based dropdown index to 1-based Hijri month
                    } else {
                        self.state.currentDate.setMonth(monthValue);
                    }

                    self.updateDropdowns();
                    self.renderCalendarDates();
                });

                self.elements.monthDropdownMenu.appendChild(btn);
            });
        },

        renderYearOptions: function () {
            if (!this.elements.yearDropdownMenu) return;

            this.elements.yearDropdownMenu.innerHTML = '';

            // Read year range from input element instead of dropdown menu
            var yearRangeBefore = parseInt(this.elements.input.dataset.yearBefore) || 5;
            var yearRangeAfter = parseInt(this.elements.input.dataset.yearAfter);

            // If yearRangeAfter is 0, null, or undefined, use current year as last year
            var useCurrentYearAsLast = yearRangeAfter === 0 || yearRangeAfter === null || isNaN(yearRangeAfter);
            if (isNaN(yearRangeAfter)) {
                yearRangeAfter = 5; // Default value if not specified
            }

            var currentYear = this.getCurrentYear();
            var startYear, endYear;

            if (this.state.calendarType === 'hijri') {
                // For Hijri calendar, use current Hijri year as reference
                var todaysHijriDate = this.getTodaysHijriDate();
                var todayHijriYear = todaysHijriDate.year;

                startYear = todayHijriYear - yearRangeBefore;
                endYear = useCurrentYearAsLast ? todayHijriYear : todayHijriYear + yearRangeAfter;
            } else {
                // For Gregorian calendar, use today's year as reference
                var todayYear = getSaudiDateObject().getFullYear();
                startYear = todayYear - yearRangeBefore;
                endYear = useCurrentYearAsLast ? todayYear : todayYear + yearRangeAfter;
            }

            var self = this;

            for (var year = startYear; year <= endYear; year++) {
                var btn = document.createElement('button');
                btn.className = 'nds-btn nds-subtle nds-dropmenu-item nds-year-option';
                btn.setAttribute('role', 'menuitem');
                btn.setAttribute('data-value', year);
                btn.innerHTML = '<span class="nds-label">' + year + '</span>';

                if (year === currentYear) {
                    NDS.State.add(btn, 'selected');
                }

                btn.addEventListener('click', function (e) {
                    e.preventDefault();
                    var yearValue = parseInt(this.dataset.value);

                    if (self.state.calendarType === 'hijri') {
                        self.setHijriDatePart('year', yearValue);
                    } else {
                        self.state.currentDate.setFullYear(yearValue);
                    }

                    self.updateDropdowns();
                    self.renderCalendarDates();
                });

                self.elements.yearDropdownMenu.appendChild(btn);
            }
        },

        // Helper methods for Hijri date manipulation
        setHijriDatePart: function (property, value) {
            var currentHijriDate = this.getCurrentHijriDate();
            currentHijriDate[property] = value;

            var calendar = this.getCurrentCalendar();
            var newDate = calendar.hijriToGregorian(currentHijriDate.year, currentHijriDate.month, currentHijriDate.day);
            newDate._hijriDay = currentHijriDate.day;
            newDate._hijriMonth = currentHijriDate.month;
            newDate._hijriYear = currentHijriDate.year;

            this.state.currentDate = newDate;
        },

        // Scroll to selected options
        scrollToSelected: function (container, selector) {
            setTimeout(function () {
                var selected = container.querySelector(selector);
                if (selected) {
                    var cr = container.getBoundingClientRect();
                    var sr = selected.getBoundingClientRect();
                    container.scrollTop = Math.max(0, sr.top - cr.top + container.scrollTop - (cr.height / 2) + (sr.height / 2));
                }
            }, 10);
        },

        // Setup language observer
        setupLanguageObserver: function () {
            var self = this;
            NDS.onAttrChange('html', ['lang'], function () {
                if (self.state.isInitialized) {
                    self.renderWeekdays();
                    self.renderButtonLabels();
                    self.updateDropdowns();
                }
            });
        },

        // Reset button states
        resetButtonStates: function () {
            if (this.monthDropmenuInstance && this.monthDropmenuInstance.isOpen) {
                this.monthDropmenuInstance.close();
            }
            if (this.yearDropmenuInstance && this.yearDropmenuInstance.isOpen) {
                this.yearDropmenuInstance.close();
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
            // Remove persistent event listeners
            if (this.handlers.ensureDropdownAndToggle) {
                this.elements.input.removeEventListener('click', this.handlers.ensureDropdownAndToggle);
                if (this.elements.toggleBtn) {
                    this.elements.toggleBtn.removeEventListener('click', this.handlers.ensureDropdownAndToggle);
                }
            }

            if (this.handlers.outsideClick) {
                document.removeEventListener('click', this.handlers.outsideClick);
            }

            // Disconnect observers
            if (this.observers) {
                this.observers.forEach(function (observer) {
                    observer.disconnect();
                });
            }

            this.cleanup();
        }
    };

    // No-op: calendar instances are created by nds-forms.js on each .nds-date-input
    function initializeCalendar() {}

    // CRITICAL: Expose global API immediately (called by unified init system)
    if (typeof window !== 'undefined') {
        window.DatePickerCalendar = DatePickerCalendar;
        NDS.DatePicker = {
            DatePickerCalendar,
            CalendarConfig,
            UIConfig,
            createHijriDate,
            init: initializeCalendar,
            reinit: initializeCalendar
        };
    }

    // Note: Initialization now handled by nds-loader.js unified system

})();