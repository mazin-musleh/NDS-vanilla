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

    // Accurate "today" reference (from NDS.TimeDate) shared by every picker
    // instance for Hijri↔Gregorian conversions. Module-scoped — no readers
    // outside this file.
    var _accurateTodaysHijriDate = null;
    var _accurateTodaysGregorianDate = null;

    // Shared across both calendar systems
    var WEEKDAY_NAMES = {
        ar: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
        en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    };

    // Format token support for data-format="…". Tokens: YYYY, YY, MM, M, DD, D.
    // Longer tokens listed first so the alternation prefers YYYY over YY (regex
    // alternatives are tried in order at each position). Any character outside a
    // token is passed through literally.
    var DEFAULT_DATE_FORMAT = 'DD/MM/YYYY';
    var FORMAT_TOKEN_REGEX = /(YYYY|YY|MM|M|DD|D)/g;

    function applyDateFormat(format, values) {
        // values = { year, month, day } — month is 1-indexed
        return format.replace(FORMAT_TOKEN_REGEX, function (token) {
            switch (token) {
                case 'YYYY': return String(values.year);
                case 'YY':   return String(values.year).slice(-2);
                case 'MM':   return String(values.month).padStart(2, '0');
                case 'M':    return String(values.month);
                case 'DD':   return String(values.day).padStart(2, '0');
                case 'D':    return String(values.day);
            }
        });
    }

    // Cache parse regexes per format string — cheap, rebuilt only per new format.
    var _parseRegexCache = {};
    function getParseConfig(format) {
        if (_parseRegexCache[format]) return _parseRegexCache[format];
        var groupOrder = [];
        var escaped = format.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        var pattern = escaped.replace(FORMAT_TOKEN_REGEX, function (token) {
            groupOrder.push(token);
            switch (token) {
                case 'YYYY': return '(\\d{4})';
                case 'YY':   return '(\\d{2})';
                case 'MM':   return '(\\d{2})';
                case 'M':    return '(\\d{1,2})';
                case 'DD':   return '(\\d{2})';
                case 'D':    return '(\\d{1,2})';
            }
        });
        var config = { regex: new RegExp('^' + pattern + '$'), order: groupOrder };
        _parseRegexCache[format] = config;
        return config;
    }

    function parseWithFormat(str, format) {
        var config = getParseConfig(format);
        var match = str.match(config.regex);
        if (!match) return null;
        var values = { day: null, month: null, year: null };
        config.order.forEach(function (token, i) {
            var val = parseInt(match[i + 1], 10);
            if (token === 'YYYY') values.year = val;
            else if (token === 'YY') values.year = 2000 + val; // ponytail: 20xx window; add data-year-window if 19xx/21xx dates need parsing
            else if (token === 'MM' || token === 'M') values.month = val;
            else if (token === 'DD' || token === 'D') values.day = val;
        });
        // Year is required (there is no sensible default); month/day default
        // to 1 so month-only ('MM/YYYY') and year-only ('YYYY') formats parse.
        if (values.year === null) return null;
        if (values.month === null) values.month = 1;
        if (values.day === null) values.day = 1;
        return values;
    }

    // Detect picker UI mode from the format string. Token presence drives it:
    // any D → day grid; only M+Y → month mode; only Y → year mode. Keeps the
    // format the single source of truth (no separate data-mode attribute).
    function detectFormatMode(format) {
        if (/D/.test(format)) return 'day';
        if (/M/.test(format)) return 'month';
        return 'year';
    }

    // Calendar System Configuration
    var CalendarConfig = {
        gregorian: {
            type: 'gregorian',
            monthNames: {
                ar: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
                en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            },
            weekdayNames: WEEKDAY_NAMES,
            formatDate: function (date, format) {
                return applyDateFormat(format || DEFAULT_DATE_FORMAT, {
                    year: date.getFullYear(),
                    month: date.getMonth() + 1,
                    day: date.getDate()
                });
            },
            parseDate: function (dateString, format) {
                var vals = parseWithFormat(dateString, format || DEFAULT_DATE_FORMAT);
                if (!vals) return null;

                var testDate = new Date(vals.year, vals.month - 1, vals.day);
                if (testDate.getDate() === vals.day &&
                    testDate.getMonth() === vals.month - 1 &&
                    testDate.getFullYear() === vals.year) {
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

            formatDate: function (date, format) {
                var hijriDate;

                // Use attached Hijri data if available
                if (date._hijriDay && date._hijriMonth && date._hijriYear) {
                    hijriDate = createHijriDate(date._hijriDay, date._hijriMonth, date._hijriYear);
                } else {
                    // Convert Gregorian to Hijri
                    hijriDate = this.gregorianToHijri(date);
                }

                return applyDateFormat(format || DEFAULT_DATE_FORMAT, {
                    year: hijriDate.year,
                    month: hijriDate.month,
                    day: hijriDate.day
                });
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
                if (_accurateTodaysHijriDate && _accurateTodaysGregorianDate) {
                    try {
                        return this.gregorianToHijriUsingReference(gDate,
                            _accurateTodaysHijriDate, _accurateTodaysGregorianDate);
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
                    console.warn('NDS DatePicker: Hijri conversion via Intl failed, using mathematical fallback:', e.message);
                }

                // No approximation tier: the old Julian-day math could be days off.
                // Reaching here means Intl's islamic calendar is unavailable or
                // returned an unparsable shape — fail loudly rather than mis-date.
                console.error('NDS DatePicker: all Hijri conversion methods failed');
                throw new Error('Unable to convert Gregorian date to Hijri');
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
                if (_accurateTodaysHijriDate && _accurateTodaysGregorianDate) {
                    try {
                        result = this.convertUsingReference(hYear, hMonth, hDay,
                            _accurateTodaysHijriDate, _accurateTodaysGregorianDate);
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

            hijriToJulian: function (year, month, day) {
                // Approximate conversion
                var hijriEpoch = 1948439.5;
                var avgHijriYear = 354.367;
                
                var daysSinceEpoch = (year - 1) * avgHijriYear + 
                                   (month - 1) * 29.5 + 
                                   (day - 1);
                
                return hijriEpoch + daysSinceEpoch;
            },

            parseDate: function (dateString, format) {
                var vals = parseWithFormat(dateString, format || DEFAULT_DATE_FORMAT);
                if (!vals) return null;

                // Pure conversion - no offset involved
                var gregorianDate = this.hijriToGregorian(vals.year, vals.month, vals.day);

                // Attach original input as Hijri metadata
                gregorianDate._hijriDay = vals.day;
                gregorianDate._hijriMonth = vals.month;
                gregorianDate._hijriYear = vals.year;

                return gregorianDate;
            },
        }
    };

    // UI Configuration
    var UIConfig = {
        buttonLabels: {
            ar: { today: 'اليوم', close: 'إغلاق', clear: 'مسح', save: 'حفظ' },
            en: { today: 'Today', close: 'Close', clear: 'Clear', save: 'Save' }
        },
        // Stamped via setCustomValidity so NDS.Forms / checkValidity surface
        // them for hand-typed values the picker UI never allowed.
        validationMessages: {
            ar: {
                invalid: 'تاريخ غير صالح — الصيغة المطلوبة {format}',
                beforeMin: 'أقرب تاريخ متاح {date}',
                afterMax: 'آخر تاريخ متاح {date}',
                rangeOrder: 'تاريخ البداية يجب أن يسبق تاريخ النهاية'
            },
            en: {
                invalid: 'Invalid date — expected format {format}',
                beforeMin: 'Earliest allowed date is {date}',
                afterMax: 'Latest allowed date is {date}',
                rangeOrder: 'Start date must come before end date'
            }
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
            closeBtn: '.close-btn',
            clearBtn: '.clear-btn',
            saveBtn: '.save-btn',
            datesContainer: '.nds-calendar-dates'
        }
    };

    // Calendar Instance Class
    function DatePickerCalendar(dateInput, formControl) {
        // Success signal — createInstance gates the init-guard expando on it,
        // so a bailed construction stays eligible for a later reinit() sweep.
        this.valid = false;
        var container = formControl.closest(UIConfig.selectors.container);
        if (!container) {
            console.warn('NDS DatePicker: calendar container not found');
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
        this.isDropdownCreated = false;

        // Bind events that need dropdown creation
        this.bindInitEvents();
        // Pre-filled values stamp validity at construction (silently) so a
        // server-rendered out-of-bounds value can't pass a pre-open submit.
        if (dateInput.value.trim()) this._validateInput(true);
        this.valid = true;
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
                        console.error('NDS DatePicker: failed to create dropdown');
                        return;
                    }

                    self.isDropdownCreated = true;

                    // Wire the form-control as an NDSDropmenu so we get
                    // open/close/auto-close-others/outside-click/escape for free.
                    // `data-dropmenu-no-click` — we drive toggle from the input
                    //   and toggle-button click handlers below.
                    // `data-dropmenu-no-keys` — calendar grid keyboard nav is
                    //   2D; NDSDropmenu's flat trigger/menu key handling would
                    //   conflict with both input typing and day-cell movement.
                    self.setupDropmenu();
                }

                // Stash click x on the dropmenu instance so its applyPosition
                // horizontally anchors the calendar on the click point (wide
                // desktop inputs). Gated on `data-anchor-cursor` (set in
                // setupDropmenu) — the uniform cursor-anchor opt-in flag, since
                // the native click handler is skipped for this no-click consumer.
                // Keyboard-driven toggle (no mouse event) → null → trigger center.
                self.dropmenuInstance._lastClickX = (self.dropmenuInstance.dropmenu.hasAttribute('data-anchor-cursor')
                    && e && typeof e.clientX === 'number' && e.clientX > 0)
                    ? e.clientX
                    : null;

                // Toggle through the NDSDropmenu instance so auto-close-others
                // and other dropmenu invariants apply uniformly.
                if (e) e.stopPropagation();
                self.dropmenuInstance.toggle();
            };

            // Bind to input click only (focus will trigger click anyway)
            this.elements.input.addEventListener('click', ensureDropdownAndToggle);

            // Bind to toggle button if it exists
            if (this.elements.toggleBtn) {
                this.elements.toggleBtn.addEventListener('click', ensureDropdownAndToggle);
            }

            this.handlers.ensureDropdownAndToggle = ensureDropdownAndToggle;

            // Fires for hand-typed edits AND picker commits (updateInput
            // dispatches 'change'). Attached on the input (target) so the
            // stamp lands before forms' document-level change delegation
            // reads validity.
            this.handlers.inputChange = function () { self._validateInput(); };
            this.elements.input.addEventListener('change', this.handlers.inputChange);
        },

        // Adopt NDSDropmenu for the calendar's open/close/escape/outside-click
        // lifecycle. The form-control becomes the dropmenu wrapper and the
        // dropdown becomes the dropmenu menu; the instance's `applyPosition`
        // is swapped for the calendar's own (width-matched, no viewport clamp,
        // simple flip).
        setupDropmenu: function () {
            var self = this;
            var formControl = this.elements.formControl;
            var dropdown = this.elements.dropdown;

            formControl.classList.add('nds-dropmenu');
            formControl.setAttribute('data-dropmenu-no-click', '');
            formControl.setAttribute('data-dropmenu-no-keys', '');
            // Opt into cursor anchoring via the dropmenu's uniform flag. The
            // native click handler is skipped here (no-click), so the toggle
            // handler stashes _lastClickX itself — gated on this same attribute.
            formControl.setAttribute('data-anchor-cursor', '');
            dropdown.classList.add('nds-dropmenu-menu');

            this.dropmenuInstance = NDS.Dropmenu.create(formControl);

            // Calendar lifecycle hooks (replace the old toggleDropdown branches).
            // Guard `e.target !== formControl` — these events bubble, so the
            // inner month/year sub-dropmenus' open/close events would otherwise
            // re-init or tear down the calendar every time the user picks a
            // month or year.
            formControl.addEventListener('nds:dropmenu:opened', function (e) {
                if (e.target !== formControl) return;
                NDS.State.add(self.elements.container, 'open');
                self.initializeCalendar();
                // Calendar grid was empty when applyPosition first ran; re-run
                // after content is built so flip direction reflects real height.
                self.dropmenuInstance.applyPosition();
            });

            formControl.addEventListener('nds:dropmenu:closed', function (e) {
                if (e.target !== formControl) return;
                NDS.State.remove(self.elements.container, 'open');
                self.cleanup();
            });
        },

        // Create dropdown DOM structure
        createDropdownDOM: function () {
            var dropdown = document.createElement('div');
            dropdown.className = 'nds-date-picker-dropdown';

            var calendarHTML =
                '<div class="nds-calendar-header">' +
                    '<div class="nds-calendar-title">' +
                        '<div class="nds-month-year-selectors">' +
                            '<div class="nds-dropmenu nds-month-dropmenu">' +
                                '<button class="nds-dropmenu-trigger nds-btn nds-subtle nds-menu-btn" aria-label="Select month">' +
                                    '<span class="nds-label"></span>' +
                                '</button>' +
                                '<div class="nds-dropmenu-menu nds-month-dropmenu">' +
                                    '<div class="nds-dropmenu-scroll"></div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="nds-dropmenu nds-year-dropmenu">' +
                                '<button class="nds-dropmenu-trigger nds-btn nds-subtle nds-menu-btn" aria-label="Select year">' +
                                    '<span class="nds-label"></span>' +
                                '</button>' +
                                '<div class="nds-dropmenu-menu nds-year-dropmenu">' +
                                    '<div class="nds-dropmenu-scroll"></div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="nds-calendar-month-switch">' +
                            '<button class="nds-btn nds-subtle nds-icon-only prev-month" type="button" aria-label="Previous month">' +
                                '<i class="nds-icon nds-hgi-arrow-prev-02" aria-hidden="true"></i>' +
                            '</button>' +
                            '<button class="nds-btn nds-subtle nds-icon-only next-month" type="button" aria-label="Next month">' +
                                '<i class="nds-icon nds-hgi-arrow-next-02" aria-hidden="true"></i>' +
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
                        // Clear is opt-in via data-clearable on the container
                        // (or automatic in range mode — typical use case).
                        // Wiped in cacheElements when not enabled so the handler
                        // simply skips it.
                        '<button class="nds-btn nds-subtle clear-btn" type="button">' +
                            '<span class="nds-label">Clear</span>' +
                        '</button>' +
                    '</div>' +
                    '<div class="nds-calendar-action-end">' +
                        '<button class="nds-btn nds-subtle close-btn" type="button">' +
                            '<span class="nds-label">Close</span>' +
                        '</button>' +
                        '<button class="nds-btn nds-primary save-btn" type="button">' +
                            '<span class="nds-label">Save</span>' +
                        '</button>' +
                    '</div>' +
                '</div>';

            dropdown.innerHTML = calendarHTML;

            // Clear is opt-in — remove the button unless data-clearable or
            // range mode. Removed here (not hidden via CSS) so the shared
            // cache/handler paths simply see no element.
            var container = this.elements.container;
            var clearable = container.hasAttribute('data-clearable') || container.classList.contains('dateRange');
            if (!clearable) {
                var clearBtn = dropdown.querySelector('.clear-btn');
                if (clearBtn) clearBtn.remove();
            }

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
                console.warn('NDS DatePicker: calendar container not found');
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
                closeBtn: UIConfig.selectors.closeBtn,
                saveBtn: UIConfig.selectors.saveBtn
            };

            // Query required elements
            for (var key in requiredSelectors) {
                var element = container.querySelector(requiredSelectors[key]);
                if (!element) {
                    console.error('NDS DatePicker: required calendar element not found:', key, requiredSelectors[key]);
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
                    console.warn('NDS DatePicker: optional calendar element not found:', key, optionalSelectors[key]);
                }
            }

            // Conditional element — .clear-btn is removed from the DOM by
            // createDropdownDOM when the picker isn't clearable. Absence is
            // expected, so cache silently (no warn).
            var clearEl = container.querySelector(UIConfig.selectors.clearBtn);
            if (clearEl) elements.clearBtn = clearEl;

            return elements;
        },

        // Initialize calendar state
        initializeState: function () {
            var format = (this.elements.container && this.elements.container.getAttribute('data-format')) || DEFAULT_DATE_FORMAT;
            var mode = detectFormatMode(format);
            // Expose the mode as an attribute so CSS can gate the day grid /
            // month controls without JS reaching into the dropdown.
            if (this.elements.container) {
                this.elements.container.setAttribute('data-picker-mode', mode);
            }
            var calendarType = this.detectCalendarType(format);

            // Parse min/max date bounds (day-precision, in the picker's own
            // format). Coexist with data-year-before/after — getYearRange
            // takes the tighter of the two at year granularity.
            var calendar = CalendarConfig[calendarType];
            var minStr = this.elements.input.getAttribute('data-min-date');
            var maxStr = this.elements.input.getAttribute('data-max-date');
            var minDate = minStr ? calendar.parseDate(minStr, format) : null;
            var maxDate = maxStr ? calendar.parseDate(maxStr, format) : null;

            // Open at the nearest bound when today falls outside [min, max] —
            // otherwise the initial month is entirely disabled.
            var currentDate = getSaudiDateObject();
            if (maxDate && currentDate > maxDate) currentDate = copyDateWithHijri(maxDate);
            else if (minDate && currentDate < minDate) currentDate = copyDateWithHijri(minDate);

            return {
                currentDate: currentDate,
                selectedDate: null,
                rangeStart: null,
                rangeEnd: null,
                isInitialized: false,
                format: format,
                mode: mode,
                calendarType: calendarType,
                minDate: minDate,
                maxDate: maxDate
            };
        },

        // Day-precision membership test. Returns true when there is no bound.
        isDateAllowed: function (date) {
            if (this.state.minDate && date < this.state.minDate) return false;
            if (this.state.maxDate && date > this.state.maxDate) return false;
            return true;
        },

        // Month is offered in month-grid iff at least one of its days is
        // within [min, max]. Cheap check via first and last of month.
        isMonthAllowedForYear: function (year, monthIdx) {
            if (!this.state.minDate && !this.state.maxDate) return true;
            var isHijri = this.state.calendarType === 'hijri';
            var first, last;
            if (isHijri) {
                var calendar = CalendarConfig.hijri;
                first = calendar.hijriToGregorian(year, monthIdx, 1);
                var daysInMonth = calendar.getDaysInHijriMonth(year, monthIdx);
                last = calendar.hijriToGregorian(year, monthIdx, daysInMonth);
            } else {
                first = new Date(year, monthIdx, 1);
                last = new Date(year, monthIdx + 1, 0);
            }
            if (this.state.maxDate && first > this.state.maxDate) return false;
            if (this.state.minDate && last < this.state.minDate) return false;
            return true;
        },

        // Snap a date to the nearest bound if it's outside [min, max]. Used
        // by month/year commit paths where the picker synthesizes day=1 and
        // could land before minDate (or after maxDate).
        _clampToRange: function (date) {
            if (this.state.minDate && date < this.state.minDate) return copyDateWithHijri(this.state.minDate);
            if (this.state.maxDate && date > this.state.maxDate) return copyDateWithHijri(this.state.maxDate);
            return date;
        },

        // Constraint-validation bridge: hand-typed values bypass the picker
        // UI (disabled cells, bounds clamps), so every input 'change' stamps
        // setCustomValidity — NDS.Forms.validateForm / checkValidity then
        // gate the submit. Invalid commits also paint immediate footer
        // feedback (taginput's rejection shape) instead of waiting for
        // submit; clearing is owned by the forms layer (typing clears, blur
        // re-validates through the stamp). `silent` skips the footer paint —
        // used at construction so a pre-filled bad value blocks submit
        // without error chrome on first paint.
        _validateInput: function (silent) {
            var input = this.elements.input;
            var raw = input.value.trim();
            var msg = raw ? this._validationError(raw) : '';
            input.setCustomValidity(msg);
            if (msg && !silent) {
                // Soft dependency — NDS.Forms ships in the main bundle; the
                // footer feedback no-ops if a consumer bundle excludes it.
                NDS.Forms?.setStatus?.({ element: this.elements.container, status: 'error', message: msg });
            }
        },

        // Localized error for a non-empty typed value, or '' when valid.
        // Splits on the range separator symmetrically with parseInitialValue,
        // so anything the picker itself would accept validates clean.
        _validationError: function (raw) {
            var messages = UIConfig.validationMessages[this.getLanguage()];
            var format = this.state.format;
            var calendar = this.getCurrentCalendar();
            var parts = raw.split(' - ');
            if (parts.length > 2) return messages.invalid.replace('{format}', format);
            var dates = [];
            for (var i = 0; i < parts.length; i++) {
                var parsed = null;
                // hijri.parseDate throws (rather than returning null) on
                // impossible component values — same outcome: invalid.
                try { parsed = calendar.parseDate(parts[i].trim(), format); } catch (e) {}
                if (!parsed) return messages.invalid.replace('{format}', format);
                if (this.state.minDate && parsed < this.state.minDate) {
                    return messages.beforeMin.replace('{date}', calendar.formatDate(this.state.minDate, format));
                }
                if (this.state.maxDate && parsed > this.state.maxDate) {
                    return messages.afterMax.replace('{date}', calendar.formatDate(this.state.maxDate, format));
                }
                dates.push(parsed);
            }
            if (dates.length === 2 && dates[0] > dates[1]) return messages.rangeOrder;
            return '';
        },

        detectCalendarType: function (format) {
            // First check if there's an initial value to determine calendar type
            var inputValue = this.elements.input.value.trim();
            if (inputValue) {
                var detectedType = this.detectCalendarTypeFromValue(inputValue, format);
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

        detectCalendarTypeFromValue: function (inputValue, format) {
            // Handle range format
            if (inputValue.includes(' - ')) {
                var rangeParts = inputValue.split(' - ');
                if (rangeParts.length === 2) {
                    // Use the first date to determine calendar type
                    return this.detectCalendarTypeFromSingleValue(rangeParts[0].trim(), format);
                }
            }

            // Handle single date format
            return this.detectCalendarTypeFromSingleValue(inputValue, format);
        },

        detectCalendarTypeFromSingleValue: function (dateString, format) {
            var vals = parseWithFormat(dateString, format || DEFAULT_DATE_FORMAT);
            if (!vals) return null;

            // Hijri year heuristics (approximate ranges)
            if (vals.year >= 1400 && vals.year <= 1500) {
                // Likely Hijri (current era is around 1440s)
                return 'hijri';
            } else if (vals.year >= 1900 && vals.year <= 2100) {
                // Likely Gregorian
                return 'gregorian';
            }

            // If year is ambiguous, check for impossible Gregorian dates
            if (vals.month > 12) {
                // Invalid for both, but let's default to gregorian
                return 'gregorian';
            }

            // Default assumption based on year range
            return vals.year > 1500 ? 'gregorian' : 'hijri';
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
            return NDS.langKey;
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
            // Per-render hoist: generateCalendarDates stamps _renderToday once
            // per grid build so 42 cells don't each run the Intl timezone pass.
            return this.isSameDay(date, this._renderToday || getSaudiDateObject());
        },

        getTodaysHijriDate: function () {
            // Simple cache for today's Hijri date - API handles date validation internally
            if (!this._cachedTodaysHijriDate) {
                var self = this;

                NDS.TimeDate.getHijriDate(false, true).then(function(hijriData) {
                    if (hijriData && hijriData.day && hijriData.month && hijriData.year) {
                        self.storeAccurateHijriData(hijriData);
                        // Re-render calendar with accurate date
                        self.render();
                    }
                }).catch(function() {
                    // API failed, fallback handled below
                });

                // Return math fallback for initial render
                var today = getSaudiDateObject();
                this._cachedTodaysHijriDate = CalendarConfig.hijri.gregorianToHijri(today);
            }

            return this._cachedTodaysHijriDate;
        },

        initializeCalendar: function () {
            // Re-detect calendar type each time — with the picker's own format,
            // so value-based detection parses custom formats correctly.
            this.state.calendarType = this.detectCalendarType(this.state.format);
            this.state.isInitialized = true;

            // Get accurate Hijri date FIRST before parsing initial values —
            // ensures accurate conversions. NDS.TimeDate is a hard dependency
            // (ships in every build; the loader resolves it across bundles).
            if (this.state.calendarType === 'hijri') {
                this.initializeHijriCalendarWithParsing();
            } else {
                this.parseInitialValue();
                this.setupCalendarUI();
                this.bindCalendarEvents();
                this.setupLanguageObserver();
                this.fetchAccurateHijriReference();
                this.render();
            }
        },

        initializeHijriCalendarWithParsing: function () {
            var self = this;
            NDS.TimeDate.getHijriDate(false, true).then(function(hijriData) {
                self.storeAccurateHijriData(hijriData);
                self.completeCalendarSetup();
            }).catch(function() {
                self.completeCalendarSetup();
            });
        },

        fetchAccurateHijriReference: function () {
            var self = this;
            NDS.TimeDate.getHijriDate(false, true).then(function(hijriData) {
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
                _accurateTodaysHijriDate = hijriData;
                _accurateTodaysGregorianDate = getSaudiDateObject();

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
            this.updateNavArrows();
        },

        // Cleanup on close - Clear all cache
        cleanup: function () {
            // Remove event listeners for calendar-specific elements
            var handlers = ['todayBtn', 'closeBtn', 'clearBtn', 'saveBtn', 'prevBtn', 'nextBtn', 'gridKeydown'];
            var elements = ['todayBtn', 'closeBtn', 'clearBtn', 'saveBtn', 'prevBtn', 'nextBtn', 'datesContainer'];

            for (var i = 0; i < handlers.length; i++) {
                if (this.handlers[handlers[i]] && this.elements[elements[i]]) {
                    var ev = handlers[i] === 'gridKeydown' ? 'keydown' : 'click';
                    this.elements[elements[i]].removeEventListener(ev, this.handlers[handlers[i]]);
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
            _accurateTodaysHijriDate = null;
            _accurateTodaysGregorianDate = null;

            // Reset states
            this.resetState();
            this.state.isInitialized = false;
        },

        // Parse initial input value
        parseInitialValue: function () {
            // Clear pending selection state first — if the user closed the
            // picker without Save, this drops the un-committed pick so the
            // reopen reflects the committed input value exactly.
            this.state.selectedDate = null;
            this.state.rangeStart = null;
            this.state.rangeEnd = null;

            var inputValue = this.elements.input.value.trim();
            if (!inputValue) return;

            var calendar = this.getCurrentCalendar();

            // Handle range format
            if (inputValue.includes(' - ')) {
                var rangeParts = inputValue.split(' - ');
                if (rangeParts.length === 2) {
                    var startDate = calendar.parseDate(rangeParts[0].trim(), this.state.format);
                    var endDate = calendar.parseDate(rangeParts[1].trim(), this.state.format);

                    if (startDate && endDate) {
                        // View anchor is a clamped COPY: an out-of-bounds value
                        // must not open a fully-disabled month, and the anchor
                        // must not alias rangeStart (month nav mutates it).
                        this.state.currentDate = this._clampToRange(copyDateWithHijri(startDate));
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
            var parsedDate = calendar.parseDate(inputValue, this.state.format);
            if (parsedDate) {
                // Clamped COPY — see the range branch above.
                this.state.currentDate = this._clampToRange(copyDateWithHijri(parsedDate));
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

        // Bind navigation events (prev/next month) + day-grid keyboard nav
        bindNavigationEvents: function () {
            var self = this;

            if (this.elements.prevBtn) {
                this.handlers.prevBtn = function () {
                    self.navigate(-1);
                };
                this.elements.prevBtn.addEventListener('click', this.handlers.prevBtn);
            }

            if (this.elements.nextBtn) {
                this.handlers.nextBtn = function () {
                    self.navigate(1);
                };
                this.elements.nextBtn.addEventListener('click', this.handlers.nextBtn);
            }

            // 2D keyboard navigation for the day grid (WAI-ARIA Date Picker
            // Dialog pattern). Bound on the container so re-renders don't
            // require rebinding — events bubble from the focused day button.
            // Day mode only: month/year grids are 3/4-column, so the 7-column
            // arrow geometry (±7 rows, %7 Home/End) doesn't apply — and the
            // off-grid navigateMonth fallback would silently shift the month
            // that Save synthesizes from. Their few cells stay plain tab-order
            // buttons.
            if (this.elements.datesContainer && this.state.mode === 'day') {
                this.handlers.gridKeydown = function (e) {
                    self.handleGridKeydown(e);
                };
                this.elements.datesContainer.addEventListener('keydown', this.handlers.gridKeydown);
            }
        },

        // Move focus within the day grid by `offset` cells. If the target
        // would fall outside the rendered grid, navigate to the adjacent
        // month/year and focus the corresponding position after re-render.
        // `offset` is in cells (1 = next day, 7 = next week). Maintains the
        // roving tabindex: only the focused cell stays tabbable.
        focusDayCell: function (currentBtn, offset) {
            var cells = Array.from(this.elements.datesContainer.querySelectorAll('.nds-date-cell'));
            var idx = cells.indexOf(currentBtn);
            if (idx === -1) return;

            var target = idx + offset;
            var moveFocus = function (newBtn) {
                if (!newBtn) return;
                currentBtn.tabIndex = -1;
                newBtn.tabIndex = 0;
                newBtn.focus();
            };

            // Within the rendered 42-cell grid — focus directly.
            if (target >= 0 && target < cells.length) {
                moveFocus(cells[target]);
                return;
            }

            // Outside the grid: navigate to the adjacent month, then re-pick
            // a cell at the equivalent position. The grid is 6 weeks × 7 days
            // = 42 cells; moving "off the top" by N cells = move into previous
            // month then focus index (42 + target). Moving "off the bottom" by
            // N = move into next month then focus index (target - 42).
            var direction = target < 0 ? -1 : 1;
            this.navigateMonth(direction);
            var newCells = Array.from(this.elements.datesContainer.querySelectorAll('.nds-date-cell'));
            var newIdx = direction === -1
                ? newCells.length + target  // target is negative
                : target - newCells.length;
            newIdx = Math.max(0, Math.min(newCells.length - 1, newIdx));
            // Clear the auto-set tabindex=0 on the re-rendered grid's anchor
            // so we don't end up with two tabbable cells.
            newCells.forEach(function (c) { c.tabIndex = -1; });
            if (newCells[newIdx]) {
                newCells[newIdx].tabIndex = 0;
                newCells[newIdx].focus();
            }
        },

        // WAI-ARIA Date Picker Dialog grid keys.
        handleGridKeydown: function (e) {
            var btn = e.target.closest('.nds-date-cell');
            if (!btn) return;

            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    // RTL flips left/right semantics so the focus moves with
                    // the day order on screen.
                    this.focusDayCell(btn, NDS.isRTL ? 1 : -1);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.focusDayCell(btn, NDS.isRTL ? -1 : 1);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.focusDayCell(btn, -7);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.focusDayCell(btn, 7);
                    break;
                case 'Home': {
                    e.preventDefault();
                    // First day of the week the focused cell is on. Walk
                    // back until index % 7 === 0 (Sunday in the grid).
                    var cells = Array.from(this.elements.datesContainer.querySelectorAll('.nds-date-cell'));
                    var idx = cells.indexOf(btn);
                    if (idx === -1) return;
                    var weekStart = idx - (idx % 7);
                    cells[weekStart].focus();
                    break;
                }
                case 'End': {
                    e.preventDefault();
                    var cells2 = Array.from(this.elements.datesContainer.querySelectorAll('.nds-date-cell'));
                    var idx2 = cells2.indexOf(btn);
                    if (idx2 === -1) return;
                    var weekEnd = idx2 - (idx2 % 7) + 6;
                    cells2[Math.min(cells2.length - 1, weekEnd)].focus();
                    break;
                }
                case 'PageUp': {
                    e.preventDefault();
                    // Shift = jump a year: step month-by-month (keeps each
                    // step's year-range clamp) with ONE render after the loop —
                    // rendering per step built and discarded 11 grids.
                    var stepsUp = e.shiftKey ? 12 : 1;
                    for (var u = 0; u < stepsUp; u++) if (!this._stepMonth(-1)) break;
                    this.updateDropdowns();
                    this.renderCalendarDates();
                    this.updateNavArrows();
                    this.focusFirstCurrentMonthDay();
                    break;
                }
                case 'PageDown': {
                    e.preventDefault();
                    var stepsDn = e.shiftKey ? 12 : 1;
                    for (var d = 0; d < stepsDn; d++) if (!this._stepMonth(1)) break;
                    this.updateDropdowns();
                    this.renderCalendarDates();
                    this.updateNavArrows();
                    this.focusFirstCurrentMonthDay();
                    break;
                }
                // Enter / Space fall through to the native button click,
                // which selectDate handles via the existing click listener.
            }
        },

        // After a PageUp/PageDown month switch, drop focus on the first day
        // of the new month so the user has somewhere to continue arrow nav.
        // Re-anchors the roving tabindex to the newly-focused cell.
        focusFirstCurrentMonthDay: function () {
            if (!this.elements.datesContainer) return;
            var firstDay = this.elements.datesContainer.querySelector(
                '.nds-date-cell:not([data-state~="other-month"])'
            );
            if (!firstDay) return;
            this.elements.datesContainer
                .querySelectorAll('.nds-date-cell').forEach(function (c) { c.tabIndex = -1; });
            firstDay.tabIndex = 0;
            firstDay.focus();
        },

        // Advance currentDate by one month WITHOUT rendering; returns false
        // when the step would leave the year range. Multi-step callers
        // (Shift+PageUp/Down) step N times and render once.
        _stepMonth: function (direction) {
            var range = this.getYearRange();
            if (this.state.calendarType === 'hijri') {
                var hijri = this.getCurrentHijriDate();
                var newMonth = hijri.month + direction;
                var newYear = hijri.year;
                if (newMonth < 1) { newMonth = 12; newYear--; }
                else if (newMonth > 12) { newMonth = 1; newYear++; }
                if (newYear < range.start || newYear > range.end) return false;

                var calendar = this.getCurrentCalendar();
                var newDate = calendar.hijriToGregorian(newYear, newMonth, 1);
                newDate._hijriDay = 1;
                newDate._hijriMonth = newMonth;
                newDate._hijriYear = newYear;
                this.state.currentDate = newDate;
            } else {
                var month = this.state.currentDate.getMonth() + direction;
                var year = this.state.currentDate.getFullYear();
                if (month < 0) { month = 11; year--; }
                else if (month > 11) { month = 0; year++; }
                if (year < range.start || year > range.end) return false;
                // Atomic set with day 1 (matches the Hijri branch) — sequential
                // setMonth on a day-29..31 date would roll past the target month.
                this.state.currentDate.setFullYear(year, month, 1);
            }
            return true;
        },

        // Navigate month (unified for Gregorian and Hijri)
        navigateMonth: function (direction) {
            if (!this._stepMonth(direction)) return;
            this.updateDropdowns();
            this.renderCalendarDates();
            this.updateNavArrows();
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

            if (this.elements.monthDropmenu && !this.monthDropmenuInstance) {
                this.monthDropmenuInstance = NDS.Dropmenu.create(this.elements.monthDropmenu);
                this.elements.monthDropmenu.ndsDropmenu = this.monthDropmenuInstance;
                this.elements.monthDropmenu.addEventListener('nds:dropmenu:opened', function () {
                    self.renderMonthOptions();
                    self.scrollToSelected(self.elements.monthDropdownMenu, '.nds-month-option');
                    // Re-measure after content is appended — applyPosition
                    // ran with an empty menu (width 0), so the inline width
                    // it wrote is wrong until we re-trigger positioning.
                    self.monthDropmenuInstance.applyPosition();
                });
            }

            if (this.elements.yearDropmenu && !this.yearDropmenuInstance) {
                this.yearDropmenuInstance = NDS.Dropmenu.create(this.elements.yearDropmenu);
                this.elements.yearDropmenu.ndsDropmenu = this.yearDropmenuInstance;
                this.elements.yearDropmenu.addEventListener('nds:dropmenu:opened', function () {
                    self.renderYearOptions();
                    self.scrollToSelected(self.elements.yearDropdownMenu, '.nds-year-option');
                    self.yearDropmenuInstance.applyPosition();
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

            if (this.elements.closeBtn) {
                // Close = discard pending state and close the dropmenu. State
                // resets on next open via parseInitialValue, so nothing to do
                // here beyond closing — matches click-outside-to-cancel.
                this.handlers.closeBtn = function () {
                    if (self.dropmenuInstance && self.dropmenuInstance.isOpen) {
                        self.dropmenuInstance.close();
                    }
                };
                this.elements.closeBtn.addEventListener('click', this.handlers.closeBtn);
            }

            if (this.elements.clearBtn) {
                // Clear = wipe committed value + pending state, then close.
                // Opt-in via data-clearable on the container (auto-on for range).
                this.handlers.clearBtn = function () { self.clearSelection(); };
                this.elements.clearBtn.addEventListener('click', this.handlers.clearBtn);
            }

            if (this.elements.saveBtn) {
                this.handlers.saveBtn = function () { self.saveAndClose(); };
                this.elements.saveBtn.addEventListener('click', this.handlers.saveBtn);
            }
        },

        // Save and close calendar
        saveAndClose: function () {
            // Month/year mode has no day cell to click — synthesize a selection
            // from state.currentDate (the currently navigated month/year), with
            // day forced to 1 (and month to 1 in year mode) so the stored value
            // matches what parseWithFormat produces on the way back in.
            if (this.state.mode !== 'day' && !this.isRangeMode() && !this.state.selectedDate) {
                var date = copyDateWithHijri(this.state.currentDate);
                if (this.state.calendarType === 'hijri') {
                    if (this.state.mode === 'year') date._hijriMonth = 1;
                    date._hijriDay = 1;
                    var gEq = CalendarConfig.hijri.hijriToGregorian(
                        date._hijriYear, date._hijriMonth, date._hijriDay
                    );
                    date.setTime(gEq.getTime());
                } else {
                    if (this.state.mode === 'year') date.setMonth(0);
                    date.setDate(1);
                }
                // Same clamp _selectUnit applies — the synthesized day=1 can
                // land before minDate when the bound sits mid-month.
                this.state.selectedDate = this._clampToRange(date);
            }
            // Half-picked range commits as a single-day range (end = start) so
            // the input always carries the "start - end" shape in range mode.
            if (this.isRangeMode() && this.state.rangeStart && !this.state.rangeEnd) {
                this.state.rangeEnd = copyDateWithHijri(this.state.rangeStart);
            }
            // Commit pending state to the input on every save (day / month /
            // year / range) — selectDate + selectToday no longer auto-commit.
            this.updateInput();
            if (this.dropmenuInstance && this.dropmenuInstance.isOpen) {
                this.dropmenuInstance.close();
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
            var map = { todayBtn: labels.today, closeBtn: labels.close, clearBtn: labels.clear, saveBtn: labels.save };
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

            // Month/year modes render a picker grid in place of day cells.
            if (this.state.mode === 'month') return this.renderMonthGrid();
            if (this.state.mode === 'year') return this.renderYearGrid();

            var calendar = this.getCurrentCalendar();
            var calendarData = calendar.generateCalendarData(
                this.getCurrentYear(),
                this.getCurrentMonth()
            );

            this.generateCalendarDates(calendarData);
        },

        // Month-mode body: 3×4 grid of months. Click sets state.selectedDate
        // (day forced to 1) so the value survives close-without-save reset and
        // Save commits it via the shared updateInput path.
        renderMonthGrid: function () {
            var self = this;
            var isHijri = this.state.calendarType === 'hijri';
            var monthNames = this.getMonthNames(this.getLanguage());
            var currentYear = this.getCurrentYear();

            // Today's month/year in the active calendar — the *viewed* month
            // (getCurrentMonth) isn't today's, and a Hijri year never equals
            // a Gregorian getFullYear().
            var todaysMonth, todaysYear;
            if (isHijri) {
                var todaysHijri = this.getTodaysHijriDate();
                todaysMonth = todaysHijri.month;
                todaysYear = todaysHijri.year;
            } else {
                var todayNow = getSaudiDateObject();
                todaysMonth = todayNow.getMonth();
                todaysYear = todayNow.getFullYear();
            }

            // Selected month = state.selectedDate's month IF its year matches
            // the currently viewed year (grid is one year at a time).
            var selectedMonth = -1;
            if (this.state.selectedDate) {
                var selYear = isHijri ? this.state.selectedDate._hijriYear : this.state.selectedDate.getFullYear();
                if (selYear === currentYear) {
                    selectedMonth = isHijri
                        ? this.state.selectedDate._hijriMonth
                        : this.state.selectedDate.getMonth();
                }
            }

            monthNames.forEach(function (name, i) {
                // Hijri months are 1-based; Gregorian months are 0-based.
                var monthValue = isHijri ? i + 1 : i;
                var btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'nds-btn nds-subtle nds-date-cell';
                btn.setAttribute('data-value', monthValue);
                var monthLabel = document.createElement('span');
                monthLabel.className = 'nds-label nds-truncate';
                monthLabel.textContent = name;
                btn.appendChild(monthLabel);

                if (monthValue === selectedMonth) {
                    NDS.State.add(btn, 'selected');
                } else if (monthValue === todaysMonth && currentYear === todaysYear) {
                    NDS.State.add(btn, 'today');
                }

                if (!self.isMonthAllowedForYear(currentYear, monthValue)) {
                    btn.disabled = true;
                } else {
                    btn.addEventListener('click', function (e) {
                        e.preventDefault();
                        self._selectUnit('month', monthValue);
                    });
                }

                self.elements.datesContainer.appendChild(btn);
            });
        },

        // Year-mode body: grid of years derived from the same data-year-before
        // / data-year-after range the year dropmenu uses (single source of truth).
        renderYearGrid: function () {
            var self = this;
            var isHijri = this.state.calendarType === 'hijri';
            var range = this.getYearRange();
            var startYear = range.start;
            var endYear = range.end;
            var currentYear = this.getCurrentYear();
            var selectedYear = -1;
            if (this.state.selectedDate) {
                selectedYear = isHijri ? this.state.selectedDate._hijriYear : this.state.selectedDate.getFullYear();
            }
            var todaysYear = isHijri ? this.getTodaysHijriDate().year : getSaudiDateObject().getFullYear();

            for (var year = startYear; year <= endYear; year++) {
                var btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'nds-btn nds-subtle nds-date-cell';
                btn.setAttribute('data-value', year);
                btn.textContent = year;

                if (year === selectedYear) {
                    NDS.State.add(btn, 'selected');
                } else if (year === todaysYear) {
                    NDS.State.add(btn, 'today');
                }

                (function (y) {
                    btn.addEventListener('click', function (e) {
                        e.preventDefault();
                        self._selectUnit('year', y);
                    });
                })(year);

                self.elements.datesContainer.appendChild(btn);
            }
        },

        // Shared month/year cell click: sets state.currentDate to the picked
        // unit (with lower units forced to 1) and mirrors it into
        // state.selectedDate so saveAndClose commits without synthesizing.
        _selectUnit: function (unit, value) {
            var isHijri = this.state.calendarType === 'hijri';
            if (isHijri) {
                var year = unit === 'year' ? value : this.getCurrentYear();
                var month = unit === 'month' ? value : (unit === 'year' ? 1 : this.getCurrentMonth());
                var d = CalendarConfig.hijri.hijriToGregorian(year, month, 1);
                d._hijriDay = 1;
                d._hijriMonth = month;
                d._hijriYear = year;
                this.state.currentDate = d;
                this.state.selectedDate = copyDateWithHijri(d);
            } else {
                // Day forced to 1 FIRST — setMonth on a day-29..31 date rolls
                // into the following month before setDate could run.
                this.state.currentDate.setDate(1);
                if (unit === 'year') {
                    this.state.currentDate.setFullYear(value);
                    this.state.currentDate.setMonth(0);
                } else {
                    this.state.currentDate.setMonth(value);
                }
                this.state.selectedDate = new Date(this.state.currentDate);
            }
            // Clamp when the synthesized day=1 falls outside [min, max] — the
            // month/year cell was allowed (some day in it is in range), so
            // snap the committed date to the nearest bound.
            this.state.selectedDate = this._clampToRange(this.state.selectedDate);
            this.updateDropdowns();
            this.renderCalendarDates();
        },

        // Prev/next dispatch — day mode nudges month, month mode nudges year,
        // year mode arrows are hidden by CSS so this branch is inert there.
        navigate: function (direction) {
            if (this.state.mode === 'month') return this.navigateYear(direction);
            this.navigateMonth(direction);
        },

        navigateYear: function (direction) {
            var range = this.getYearRange();
            if (this.state.calendarType === 'hijri') {
                var hijri = this.getCurrentHijriDate();
                var newYear = hijri.year + direction;
                if (newYear < range.start || newYear > range.end) return;
                var calendar = this.getCurrentCalendar();
                var newDate = calendar.hijriToGregorian(newYear, hijri.month, 1);
                newDate._hijriDay = 1;
                newDate._hijriMonth = hijri.month;
                newDate._hijriYear = newYear;
                this.state.currentDate = newDate;
            } else {
                var newYearG = this.state.currentDate.getFullYear() + direction;
                if (newYearG < range.start || newYearG > range.end) return;
                this.state.currentDate.setFullYear(newYearG);
            }
            this.updateDropdowns();
            this.renderCalendarDates();
            this.updateNavArrows();
        },

        // Disable prev/next when the next step would go outside the year range.
        // Also disables Today when today itself falls outside [min, max]. Called
        // after every navigation and at the end of render(); silent when arrows
        // aren't present (year mode hides them).
        updateNavArrows: function () {
            if (this.elements.todayBtn) {
                // Day precision — bounds parse at midnight, so a time-stamped
                // "now" would read as past maxDate on the max day itself.
                var todayMid = getSaudiDateObject();
                todayMid.setHours(0, 0, 0, 0);
                this.elements.todayBtn.disabled = !this.isDateAllowed(todayMid);
            }
            if (!this.elements.prevBtn || !this.elements.nextBtn) return;
            var range = this.getYearRange();
            var currentYear = this.getCurrentYear();
            var atStart, atEnd;
            if (this.state.mode === 'month') {
                atStart = currentYear <= range.start;
                atEnd = currentYear >= range.end;
            } else {
                var isHijri = this.state.calendarType === 'hijri';
                var currentMonth = this.getCurrentMonth();
                var firstMonth = isHijri ? 1 : 0;
                var lastMonth = isHijri ? 12 : 11;
                atStart = currentYear <= range.start && currentMonth <= firstMonth;
                atEnd = currentYear >= range.end && currentMonth >= lastMonth;
            }
            this.elements.prevBtn.disabled = atStart;
            this.elements.nextBtn.disabled = atEnd;
        },

        // Calendar date generation (unified for Gregorian and Hijri)
        generateCalendarDates: function (calendarData) {
            this._renderToday = getSaudiDateObject();
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
            var nextMonth = calendarData.month + 1;
            var nextYear = calendarData.year;
            if (isHijri && nextMonth > 12) { nextMonth = 1; nextYear++; }

            for (var j = 1; usedCells < 42; j++, usedCells++) {
                this.createDateCell(makeDate(nextYear, nextMonth, j), 'other-month');
            }

            // Promote one cell to tabindex=0 so the user can Tab into the grid.
            this.setActiveDayCell();
        },

        // Roving tabindex anchor: pick the most meaningful cell to be the
        // tab-entry point. Priority: selected day → today (current month) →
        // first day of current month → first cell.
        setActiveDayCell: function () {
            if (!this.elements.datesContainer) return;
            var cells = this.elements.datesContainer.querySelectorAll('.nds-date-cell');
            if (!cells.length) return;

            // Find by state priority. 'selected' / 'range-start' are state-vocab
            // tokens, so the lookup iterates and filters via NDS.State.has rather
            // than embedding the tokens in attribute selectors. 'today' /
            // 'other-month' are component-private (non-vocab) tokens; selectors
            // over them stay as-is.
            var selected = null;
            for (var i = 0; i < cells.length; i++) {
                if (NDS.State.has(cells[i], 'selected') || NDS.State.has(cells[i], 'range-start')) {
                    selected = cells[i];
                    break;
                }
            }
            var today = this.elements.datesContainer.querySelector(
                '.nds-date-cell[data-state~="today"]:not([data-state~="other-month"])'
            );
            var firstCurrent = this.elements.datesContainer.querySelector(
                '.nds-date-cell:not([data-state~="other-month"])'
            );
            var anchor = selected || today || firstCurrent || cells[0];
            anchor.tabIndex = 0;
        },

        // Create individual date cell
        createDateCell: function (date, type) {
            var self = this;
            var btn = document.createElement('button');
            btn.className = 'nds-btn nds-subtle nds-date-cell';
            btn.type = 'button';
            // Roving tabindex (WAI-ARIA grid pattern): all cells start
            // non-tabbable; setActiveDayCell() promotes one cell per render
            // so Tab from outside the grid lands on the meaningful day
            // (selected / today / first day) instead of cycling all 42.
            btn.tabIndex = -1;

            // Day number display — built imperatively so the value flows through
            // .textContent (text-only) and never reaches the HTML parser.
            var dayLabel = document.createElement('span');
            dayLabel.className = 'nds-label';
            dayLabel.textContent = this.getDisplayDayNumber(date);
            btn.appendChild(dayLabel);

            // Grid child is a slot wrapper: it paints the contiguous range
            // bar (slots tile with no column gap), the button keeps the circle.
            var slot = document.createElement('div');
            slot.className = 'nds-date-slot';
            slot.appendChild(btn);

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

            // Out-of-range days paint disabled and skip the click handler entirely.
            if (!this.isDateAllowed(date)) {
                btn.disabled = true;
            } else {
                btn.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    self.selectDate(date);
                });
            }

            this.elements.datesContainer.appendChild(slot);
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

            // Mirror the bar tokens onto the slot wrapper (it owns the range bar).
            var slot = btn.parentElement;
            if (slot && slot.classList.contains('nds-date-slot')) {
                if (isRangeStart) NDS.State.add(slot, 'range-start');
                if (isRangeEnd) NDS.State.add(slot, 'range-end');
                if (isInRange) NDS.State.add(slot, 'in-range');
                if (isRangeStart && this.state.rangeEnd) NDS.State.add(slot, 'has-range-end');
                if (isRangeEnd && this.state.rangeStart) NDS.State.add(slot, 'has-range-start');
            }
        },

        // Date selection handlers
        selectDate: function (date) {
            if (this.isRangeMode()) {
                this.handleRangeSelection(date);
            } else {
                this.state.selectedDate = copyDateWithHijri(date);
            }

            // Selection only mutates state — Save commits to the input.
            // Consumers listening for `change` on the input still get one event,
            // fired from saveAndClose. Closing without Save discards the pending
            // pick (parseInitialValue re-syncs state from input on next open).
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
            // Today only mutates state; Save commits (matches selectDate).
        },

        // Explicit erase — wipes the committed input value AND pending state,
        // dispatches change, and closes the picker. Immediate (not deferred to
        // Save) because the user's click IS the confirmation for erasing.
        clearSelection: function () {
            this.state.selectedDate = null;
            this.state.rangeStart = null;
            this.state.rangeEnd = null;
            this.elements.input.value = '';
            this.elements.input.dispatchEvent(new Event('change', { bubbles: true }));
            this.renderCalendarDates();
            if (this.dropmenuInstance && this.dropmenuInstance.isOpen) {
                this.dropmenuInstance.close();
            }
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
                value = calendar.formatDate(this.state.rangeStart, this.state.format);
                convertedValue = this.getConvertedDate(this.state.rangeStart);
                if (this.state.rangeEnd) {
                    value += ' - ' + calendar.formatDate(this.state.rangeEnd, this.state.format);
                    convertedValue += ' - ' + this.getConvertedDate(this.state.rangeEnd);
                }
            } else if (this.state.selectedDate) {
                value = calendar.formatDate(this.state.selectedDate, this.state.format);
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

            var format = this.state.format;
            if (this.state.calendarType === 'hijri') {
                if (date._hijriDay && date._hijriMonth && date._hijriYear &&
                    _accurateTodaysHijriDate && _accurateTodaysGregorianDate) {
                    var accurateGregorian = CalendarConfig.hijri.convertUsingReference(
                        date._hijriYear, date._hijriMonth, date._hijriDay,
                        _accurateTodaysHijriDate, _accurateTodaysGregorianDate
                    );
                    return CalendarConfig.gregorian.formatDate(accurateGregorian, format);
                }
                return CalendarConfig.gregorian.formatDate(date, format);
            }

            // Gregorian → Hijri: formatDate handles conversion internally
            return CalendarConfig.hijri.formatDate(date, format);
        },

        // Utility methods
        isSameDay: function (date1, date2) {
            return date1.getDate() === date2.getDate() &&
                date1.getMonth() === date2.getMonth() &&
                date1.getFullYear() === date2.getFullYear();
        },

        // Dropdown rendering methods
        renderMonthOptions: function () {
            if (!this.elements.monthDropdownMenu) return;

            this.elements.monthDropdownMenu.innerHTML = '';

            var calendar = this.getCurrentCalendar();
            var lang = this.getLanguage();
            var monthNames = calendar.monthNames[lang];
            var self = this;

            var isHijri = self.state.calendarType === 'hijri';
            var currentYear = self.getCurrentYear();

            monthNames.forEach(function (monthName, index) {
                var btn = document.createElement('button');
                btn.className = 'nds-btn nds-subtle nds-dropmenu-item nds-month-option';
                btn.setAttribute('role', 'menuitem');
                btn.setAttribute('data-value', index);
                // Month label — built imperatively so the value flows through
                // .textContent (text-only) and never reaches the HTML parser.
                var monthLabel = document.createElement('span');
                monthLabel.className = 'nds-label';
                monthLabel.textContent = monthName;
                btn.appendChild(monthLabel);

                var isSelected = isHijri ?
                    (index + 1) === self.getCurrentMonth() : // For Hijri: compare (0-based index + 1) with 1-based month
                    index === self.getCurrentMonth();        // For Gregorian: compare 0-based with 0-based

                if (isSelected) {
                    NDS.State.add(btn, 'selected');
                }

                // Same allowed-day check the month grid uses — a month is only
                // pickable if at least one of its days falls inside [min, max].
                var monthCheckValue = isHijri ? index + 1 : index;
                if (!self.isMonthAllowedForYear(currentYear, monthCheckValue)) {
                    btn.disabled = true;
                } else {
                    btn.addEventListener('click', function (e) {
                        e.preventDefault();
                        var monthValue = parseInt(this.dataset.value);

                        if (isHijri) {
                            self.setHijriDatePart('month', monthValue + 1); // Convert 0-based dropdown index to 1-based Hijri month
                        } else {
                            // Day 1 — a day-29..31 date would roll past the target month.
                            self.state.currentDate.setMonth(monthValue, 1);
                        }

                        self.updateDropdowns();
                        self.renderCalendarDates();
                    });
                }

                self.elements.monthDropdownMenu.appendChild(btn);
            });
        },

        // Shared year-range bounds — driven by input's data-year-before /
        // data-year-after, relative to today's year. Used by the year dropmenu,
        // the year-mode grid, and the prev/next navigation clamp. Coexists
        // with data-min-date / data-max-date — the tighter side wins.
        getYearRange: function () {
            var yearRangeBefore = parseInt(this.elements.input.dataset.yearBefore, 10);
            if (isNaN(yearRangeBefore)) yearRangeBefore = 5; // isNaN, not || — "0" is a valid window
            // Omitted or 0 caps the year list at the current year (no future).
            var yearRangeAfter = parseInt(this.elements.input.dataset.yearAfter, 10) || 0;

            var isHijri = this.state.calendarType === 'hijri';
            var todayYear = isHijri
                ? this.getTodaysHijriDate().year
                : getSaudiDateObject().getFullYear();
            var start = todayYear - yearRangeBefore;
            var end = todayYear + yearRangeAfter;

            if (this.state.minDate) {
                var minY = isHijri ? this.state.minDate._hijriYear : this.state.minDate.getFullYear();
                if (minY > start) start = minY;
            }
            if (this.state.maxDate) {
                var maxY = isHijri ? this.state.maxDate._hijriYear : this.state.maxDate.getFullYear();
                if (maxY < end) end = maxY;
            }
            return { start: start, end: end };
        },

        renderYearOptions: function () {
            if (!this.elements.yearDropdownMenu) return;

            this.elements.yearDropdownMenu.innerHTML = '';

            var range = this.getYearRange();
            var startYear = range.start;
            var endYear = range.end;
            var currentYear = this.getCurrentYear();
            var self = this;

            for (var year = startYear; year <= endYear; year++) {
                var btn = document.createElement('button');
                btn.className = 'nds-btn nds-subtle nds-dropmenu-item nds-year-option';
                btn.setAttribute('role', 'menuitem');
                btn.setAttribute('data-value', year);
                // Year label — built imperatively to match the month-option /
                // date-cell shape elsewhere in this file. `year` is a loop
                // counter (numeric); textContent is purely cosmetic consistency.
                var yearLabel = document.createElement('span');
                yearLabel.className = 'nds-label';
                yearLabel.textContent = year;
                btn.appendChild(yearLabel);

                if (year === currentYear) {
                    NDS.State.add(btn, 'selected');
                }

                btn.addEventListener('click', function (e) {
                    e.preventDefault();
                    var yearValue = parseInt(this.dataset.value);

                    if (self.state.calendarType === 'hijri') {
                        self.setHijriDatePart('year', yearValue);
                    } else {
                        // Day 1 first — Feb 29 would roll into March on non-leap years.
                        self.state.currentDate.setDate(1);
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

        // Center the 'selected'-state option in the dropmenu list. Candidates
        // are matched by selector then filtered via NDS.State.has — keeps
        // state-vocab queries out of the raw selector string.
        scrollToSelected: function (container, selector) {
            setTimeout(function () {
                var selected;
                var candidates = container.querySelectorAll(selector);
                for (var i = 0; i < candidates.length; i++) {
                    if (NDS.State.has(candidates[i], 'selected')) { selected = candidates[i]; break; }
                }
                if (selected) {
                    var cr = container.getBoundingClientRect();
                    var sr = selected.getBoundingClientRect();
                    container.scrollTop = Math.max(0, sr.top - cr.top + container.scrollTop - (cr.height / 2) + (sr.height / 2));
                }
            }, 10);
        },

        // Setup language observer.
        // setupLanguageObserver runs every time the calendar is (re-)initialized
        // (initializeCalendar / completeCalendarSetup paths), so release the
        // prior subscription before registering a new one — otherwise each
        // re-init stacks a fresh closure on the pool's array. The handle is
        // also released in destroy() so a calendar instance teardown drops
        // its lang-attr subscriber instead of leaking it for the page lifetime.
        setupLanguageObserver: function () {
            if (this._offLangChange) this._offLangChange();
            var self = this;
            this._offLangChange = NDS.onAttrChange('html', ['lang'], function () {
                if (self.state.isInitialized) {
                    self.renderWeekdays();
                    self.renderButtonLabels();
                    self.updateDropdowns();
                }
            });
        },

        // Reset state
        resetState: function () {
            this.state.selectedDate = null;
            this.state.rangeStart = null;
            this.state.rangeEnd = null;
        },

        // Destroy instance
        destroy: function () {
            // Destroy inner month/year dropmenus FIRST — they hold their own
            // document-level outside-click listeners, and the outer destroy
            // below replaces formControl with a clone that detaches their
            // DOM. Tearing them down while still attached keeps NDSDropmenu's
            // own cleanup path (removeEventListener) unambiguous.
            if (this.monthDropmenuInstance) {
                this.monthDropmenuInstance.destroy();
                this.monthDropmenuInstance = null;
            }
            if (this.yearDropmenuInstance) {
                this.yearDropmenuInstance.destroy();
                this.yearDropmenuInstance = null;
            }

            // Close before destroying so the dropmenu instance gets a chance
            // to fire its closed event (which runs cleanup() via the listener
            // wired in setupDropmenu).
            if (this.dropmenuInstance) {
                if (this.dropmenuInstance.isOpen) this.dropmenuInstance.close();
                this.dropmenuInstance.destroy();
                this.dropmenuInstance = null;
            }

            // Remove persistent event listeners
            if (this.handlers.ensureDropdownAndToggle) {
                this.elements.input.removeEventListener('click', this.handlers.ensureDropdownAndToggle);
                if (this.elements.toggleBtn) {
                    this.elements.toggleBtn.removeEventListener('click', this.handlers.ensureDropdownAndToggle);
                }
            }
            if (this.handlers.inputChange) {
                this.elements.input.removeEventListener('change', this.handlers.inputChange);
            }

            // Release the lang-attr subscriber registered in setupLanguageObserver.
            // Lives across open/close cycles (cleanup() doesn't drop it), so the
            // release belongs in destroy() — instance-lifetime, not panel-lifetime.
            if (this._offLangChange) { this._offLangChange(); this._offLangChange = null; }

            // Drop the back-ref on the input so the DatePickerCalendar can
            // be GC'd. Without this the input retains a chain to all the
            // detached DOM nodes the calendar held.
            if (this.elements.input && this.elements.input._ndsDatePicker === this) {
                delete this.elements.input._ndsDatePicker;
            }

            this.cleanup();
        }
    };

    function createInstance(dateInput, formControl) {
        if (!dateInput) return null;
        if (dateInput._ndsDatePicker) return dateInput._ndsDatePicker;
        formControl = formControl || dateInput.closest('.nds-form-control');
        if (!formControl) return null;
        var instance = new DatePickerCalendar(dateInput, formControl);
        if (!instance.valid) return null;
        dateInput._ndsDatePicker = instance;
        return instance;
    }

    // Self-driven: sweep every .nds-date-input and attach a calendar. create()
    // is idempotent (skips inputs already wired) so this is reinit-safe.
    function initializeCalendar() {
        document.querySelectorAll('.nds-date-input').forEach((input) => createInstance(input));
    }

    // CRITICAL: Expose global API immediately (called by unified init system)
    if (typeof window !== 'undefined') {
        NDS.DatePicker = {
            DatePickerCalendar,
            CalendarConfig,
            createHijriDate,
            init: initializeCalendar,
            reinit: initializeCalendar,
            create: createInstance
        };
    }

    // Note: Initialization now handled by nds-loader.js unified system

})();