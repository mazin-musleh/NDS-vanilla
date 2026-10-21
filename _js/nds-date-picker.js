/* NDS.DatePicker — public surface
 * Rides: nds-dropmenu (positioning, outside-click, top layer — the input drives open/close)
 *      · nds-forms (invalid-value status message under the field; soft)
 * Requires:
 *   .nds-date-input sits in .nds-form-control — the picker is not built
 * Methods:
 *   NDS.DatePicker.init() / .reinit()          attach a calendar to every .nds-date-input
 *   NDS.DatePicker.create(input, formControl)  build/return one instance — idempotent, null on
 *                                              bad markup; formControl is optional
 *   NDS.DatePicker.destroy(input)              tear one down — the NDS.init.destroy entry point
 *   NDS.DatePicker.CalendarConfig              the gregorian + hijri engines
 *                                              (parseDate / formatDate, on NDS.Date)
 *   NDS.DatePicker.Calendar                    the instance prototype (extension use)
 * Events:
 *   (none — a pick writes the input and dispatches a native `change`; listen on the input)
 * Hooks:
 *   on the .nds-form-container:  data-format (YYYY YY MM M DD D — also picks the
 *                                day/month/year mode; default: the nearest
 *                                data-date-format, else DD/MM/YYYY) · data-clearable (automatic
 *                                in range mode) · .nds-date-range
 *   data-calendar="hijri":       on the container or any ancestor (<html> too): Hijri months
 *                                (a prefilled value's year overrides it: up to 1500 reads as Hijri)
 *   .nds-date-value:             a hidden input in the container the picker fills with the day;
 *                                its own data-date-format / data-calendar, else the picker's.
 *                                Range: the first takes the start, the second the end;
 *                                a single date fills every one
 *   .date-picker-toggle:         the button that opens the calendar (none: a click on the
 *                                input opens it)
 *   on the .nds-date-input:      data-min-date · data-max-date (a date, `today`, or `today±N`
 *                                with d, m or y, counted in the field's calendar; a change
 *                                applies at once) · data-lang
 *                                data-year-before · data-year-after
 *   written by the picker:       data-picker-mode (container) · data-converted-date (input)
 * Gotchas:
 *   - Range mode is the `nds-date-range` class on the container; its value reads "start - end".
 *     Bounds are day-precision and use the picker's own format.
 *   - Hijri and Gregorian: the picker stamps the OTHER calendar's value in
 *     data-converted-date on the input.
 *   - "Today" follows <html data-timezone>; without it, the visitor's clock.
 *   - Hijri is Umm al-Qura, converted exactly by NDS.Date.
 */
(() => {
    'use strict';

    var hijriParts = new WeakMap();   // Date -> { day, month, year }

    /**
     * Clones a Date and preserves any attached Hijri metadata
     */
    function copyDateWithHijri(date) {
        var copy = new Date(date);
        var parts = hijriParts.get(date);
        if (parts && parts.day) hijriParts.set(copy, { day: parts.day, month: parts.month, year: parts.year });
        return copy;
    }

    // Write the Hijri trio onto a Gregorian Date and hand it back. This stamp is
    // the file's data contract — the month/year grids, getYearRange and
    // getDisplayDayNumber read it — so it lives in one place.
    function stampHijri(date, hYear, hMonth, hDay) {
        hijriParts.set(date, { day: hDay, month: hMonth, year: hYear });
        return date;
    }

    // The text of every cell / option button lives in a .nds-label span — that is
    // what _date-picker.scss targets inside a cell, and it drifted once when the
    // year grid set textContent on the button directly and fell out of the rule.
    // Built imperatively so the value flows through .textContent and never reaches
    // the HTML parser.
    function appendCellLabel(btn, text, extraClass) {
        var label = document.createElement('span');
        label.className = extraClass ? 'nds-label ' + extraClass : 'nds-label';
        label.textContent = text;
        btn.appendChild(label);
        return btn;
    }

    // English defaults; the assets/i18n/{lang}.json pack overrides them.
    var strings = NDS.i18n.strings('date-picker', {
        select_month: 'Select month',
        select_year: 'Select year',
        prev_month: 'Previous month',
        next_month: 'Next month',
        today: 'Today',
        close: 'Close',
        clear: 'Clear',
        save: 'Save',
        invalid: 'Invalid date — expected format {format}',
        before_min: 'Earliest allowed date is {date}',
        after_max: 'Latest allowed date is {date}',
        range_order: 'Start date must come before end date',
    });

    // Hijri <-> a local-midnight Date, through NDS.Date (Umm al-Qura).
    var HIJRI = { calendar: 'hijri', format: 'D/M/YYYY' };
    function toHijri(date) {
        var parts = NDS.Date.format(date, { calendar: 'hijri', format: 'D M YYYY' }).split(' ');
        return { day: +parts[0], month: +parts[1], year: +parts[2] };
    }
    // Stamped. Day 30 of a 29-day month clamps to the 29th.
    function fromHijri(year, month, day) {
        var date = NDS.Date.parse(day + '/' + month + '/' + year, HIJRI);
        if (!date && day > 29) {
            day = 29;
            date = NDS.Date.parse(day + '/' + month + '/' + year, HIJRI);
        }
        return stampHijri(date, year, month, day);
    }
    function getHijriMonthLength(year, month) {
        return NDS.Date.parse('30/' + month + '/' + year, HIJRI) ? 30 : 29;
    }

    // Today moved by n days, months or years, counted in the field's calendar. A day past the
    // target month's end becomes its last day: 31 March minus 1m is the last day of February.
    function shiftToday(amount, unit, hijri) {
        var today = NDS.Date.today();
        if (unit === 'd') return new Date(today.getFullYear(), today.getMonth(), today.getDate() + amount);
        var parts = hijri ? toHijri(today) : { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
        var totalMonths = parts.year * 12 + parts.month - 1 + (unit === 'y' ? amount * 12 : amount);
        var year = Math.floor(totalMonths / 12), month = totalMonths - year * 12 + 1;
        if (hijri) return fromHijri(year, month, Math.min(parts.day, getHijriMonthLength(year, month)));
        return new Date(year, month - 1, Math.min(parts.day, new Date(year, month, 0).getDate()));
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
    var calendarConfig = {
        gregorian: {
            type: 'gregorian',
            formatDate: function (date, format) {
                return NDS.Date.format(date, { format: format });
            },
            parseDate: function (dateString, format) {
                return NDS.Date.parse(dateString, { format: format });
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
            formatDate: function (date, format) {
                return NDS.Date.format(date, { calendar: 'hijri', format: format });
            },

            generateCalendarData: function (year, month) {
                var firstDay = fromHijri(year, month, 1);
                var daysInMonth = getHijriMonthLength(year, month);
                return {
                    year: year,
                    month: month,
                    firstDay: firstDay,
                    lastDay: fromHijri(year, month, daysInMonth),
                    daysInMonth: daysInMonth,
                    startOffset: firstDay.getDay()
                };
            },

            parseDate: function (dateString, format) {
                var date = NDS.Date.parse(dateString, { calendar: 'hijri', format: format });
                if (!date) return null;
                var hijriDate = toHijri(date);
                return stampHijri(date, hijriDate.year, hijriDate.month, hijriDate.day);
            },
        }
    };

    // UI Configuration
    var uiConfig = {
        selectors: {
            container: '.nds-form-container',
            dropdown: '.nds-date-picker-menu',
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
    function NdsDatePickerCalendar(dateInput, formControl) {
        // Success signal — createInstance gates the init-guard expando on it,
        // so a bailed construction stays eligible for a later reinit() sweep.
        this.valid = false;
        var container = formControl.closest(uiConfig.selectors.container);
        if (!container) {
            console.warn('NDS DatePicker: calendar container not found');
            return;
        }

        this.elements = {
            input: dateInput,
            formControl: formControl,
            container: container,
            toggleBtn: container.querySelector(uiConfig.selectors.toggleBtn)
        };

        this.state = this.initializeState();
        this._readBounds();
        this.isDropdownCreated = false;
        // Scopes listeners bound to elements the instance does not own (the
        // consumer's formControl), so destroy() releases them in one abort.
        this.instanceAbortController = new AbortController();

        // Bind events that need dropdown creation
        this.bindInitEvents();
        // Pre-filled values stamp validity at construction (silently) so a
        // server-rendered out-of-bounds value can't pass a pre-open submit.
        if (dateInput.value.trim()) this._validateInput(true);
        this._syncValueInputs();
        this.valid = true;
    }

    NdsDatePickerCalendar.prototype = {
        // Bind events that trigger dropdown creation
        bindInitEvents: function () {
            var self = this;

            // Handler to ensure dropdown exists before toggling
            var ensureDropdownAndToggle = function (e) {
                // Forms copies a readonly input to the field's state; the calendar button stays live.
                if (self.elements.input.disabled || NDS.state.has(self.elements.container, 'readonly')) return;
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

                    // Wire the form-control as an NDS.Dropmenu so we get
                    // open/close/auto-close-others/outside-click/escape for free.
                    // `data-dropmenu-no-click` — we drive toggle from the input
                    //   and toggle-button click handlers below.
                    // `data-dropmenu-no-keys` — calendar grid keyboard nav is
                    //   2D; NDS.Dropmenu's flat trigger/menu key handling would
                    //   conflict with both input typing and day-cell movement.
                    self.setupDropmenu();
                }

                // Toggle through the NDS.Dropmenu instance so auto-close-others
                // and other dropmenu invariants apply uniformly; the click anchors
                // the calendar under the pointer (anchor: 'cursor' in setupDropmenu).
                if (e) e.stopPropagation();
                self.dropmenuInstance.toggle(e);
            };

            var signal = this.instanceAbortController.signal;

            // The button opens the calendar, so a click in the input only places the cursor.
            // Markup with no button keeps the input as the trigger.
            (this.elements.toggleBtn || this.elements.input).addEventListener('click', ensureDropdownAndToggle, { signal: signal });

            // Fires for hand-typed edits AND picker commits (updateInput
            // dispatches 'change'). Attached on the input (target) so the
            // stamp lands before forms' document-level change delegation
            // reads validity.
            this.elements.input.addEventListener('change', function () {
                self._validateInput();
                self._syncValueInputs();
            }, { signal: signal });
            // A form reset restores the field after this event, and a hidden input keeps what JS wrote.
            // The old value's error goes too; Forms clears the message.
            var form = this.elements.input.form;
            if (form) form.addEventListener('reset', function () { setTimeout(function () { self._validateInput(true); self._syncValueInputs(); }); }, { signal: signal });
        },

        // Adopt NDS.Dropmenu for the calendar's open/close/escape/outside-click
        // lifecycle. The form-control becomes the dropmenu wrapper and the
        // dropdown becomes the dropmenu menu, placed by the dropmenu's own applyPosition.
        setupDropmenu: function () {
            var self = this;
            var formControl = this.elements.formControl;
            var dropdown = this.elements.dropdown;

            // Cursor anchoring: the native click handler is skipped (no click), so the
            // toggle handler passes its click to toggle(e).
            this.dropmenuInstance = NDS.Dropmenu.create(formControl, { menu: dropdown, click: false, keys: false, anchor: 'cursor' });

            // Calendar lifecycle hooks.
            // Guard `e.target !== formControl` — these events bubble, so the
            // inner month/year sub-dropmenus' open/close events would otherwise
            // re-init or tear down the calendar every time the user picks a
            // month or year.
            // Scoped to the instance controller: formControl is consumer-owned and
            // outlives destroy(), so an un-torn-down listener here would keep `self`
            // — and its detached dropdown — reachable, and would re-run
            // initializeCalendar() against detached nodes after a destroy/create cycle.
            var signal = this.instanceAbortController.signal;

            formControl.addEventListener('nds:dropmenu:opened', function (e) {
                if (e.target !== formControl) return;
                NDS.state.add(self.elements.container, 'open');
                // Its render places the panel against the built grid (_reposition).
                self.initializeCalendar();
            }, { signal: signal });

            formControl.addEventListener('nds:dropmenu:closed', function (e) {
                if (e.target !== formControl) return;
                NDS.state.remove(self.elements.container, 'open');
                self.cleanup();
            }, { signal: signal });
        },

        // Create dropdown DOM structure
        createDropdownDOM: function () {
            var dropdown = document.createElement('div');
            dropdown.className = 'nds-date-picker-menu';

            var lang = this.getLanguage();
            var calendarHtml =
                '<div class="nds-calendar-header">' +
                    '<div class="nds-calendar-title">' +
                        '<div class="nds-month-year-selectors">' +
                            '<div class="nds-dropmenu nds-month-dropmenu">' +
                                '<button class="nds-dropmenu-trigger nds-btn nds-subtle nds-menu-btn" aria-label="' + NDS.escapeHtml(strings.text('select_month', null, lang)) + '">' +
                                    '<span class="nds-label"></span>' +
                                '</button>' +
                                '<div class="nds-dropmenu-menu nds-month-dropmenu">' +
                                    '<div class="nds-dropmenu-scroll"></div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="nds-dropmenu nds-year-dropmenu">' +
                                '<button class="nds-dropmenu-trigger nds-btn nds-subtle nds-menu-btn" aria-label="' + NDS.escapeHtml(strings.text('select_year', null, lang)) + '">' +
                                    '<span class="nds-label"></span>' +
                                '</button>' +
                                '<div class="nds-dropmenu-menu nds-year-dropmenu">' +
                                    '<div class="nds-dropmenu-scroll"></div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="nds-calendar-month-switch">' +
                            '<button class="nds-btn nds-subtle nds-icon-only prev-month" type="button" aria-label="' + NDS.escapeHtml(strings.text('prev_month', null, lang)) + '">' +
                                '<i class="nds-icon nds-hgi-arrow-prev-02" aria-hidden="true"></i>' +
                            '</button>' +
                            '<button class="nds-btn nds-subtle nds-icon-only next-month" type="button" aria-label="' + NDS.escapeHtml(strings.text('next_month', null, lang)) + '">' +
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
                            '<span class="nds-label"></span>' +
                        '</button>' +
                        // Clear is opt-in via data-clearable on the container
                        // (or automatic in range mode — typical use case).
                        '<button class="nds-btn nds-subtle clear-btn" type="button">' +
                            '<span class="nds-label"></span>' +
                        '</button>' +
                    '</div>' +
                    '<div class="nds-calendar-action-end">' +
                        '<button class="nds-btn nds-subtle close-btn" type="button">' +
                            '<span class="nds-label"></span>' +
                        '</button>' +
                        '<button class="nds-btn nds-primary save-btn" type="button">' +
                            '<span class="nds-label"></span>' +
                        '</button>' +
                    '</div>' +
                '</div>';

            dropdown.innerHTML = calendarHtml;

            // Clear is opt-in — remove the button unless data-clearable or
            // range mode. Removed here (not hidden via CSS) so the shared
            // cache/handler paths simply see no element.
            var container = this.elements.container;
            var clearable = container.hasAttribute('data-clearable') || container.classList.contains('nds-date-range');
            if (!clearable) {
                var clearBtn = dropdown.querySelector('.clear-btn');
                if (clearBtn) clearBtn.remove();
            }

            // Insert dropdown after the input, inside the same parent (form-control)
            this.elements.input.insertAdjacentElement('afterend', dropdown);
        },

        // Remove dropdown DOM. Optional-chained on container: cacheElements
        // returns {} when the container is gone, and destroy() calls this — a
        // throw there would skip the rest of teardown.
        removeDropdownDOM: function () {
            var dropdown = this.elements.container?.querySelector(uiConfig.selectors.dropdown);
            if (dropdown) {
                dropdown.remove();
            }
        },

        // Cache DOM elements
        cacheElements: function (dateInput, formControl) {
            var container = formControl.closest(uiConfig.selectors.container);
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
                dropdown: uiConfig.selectors.dropdown,
                datesContainer: uiConfig.selectors.datesContainer
            };

            // Optional elements
            var optionalSelectors = {
                monthDropmenu: uiConfig.selectors.monthDropmenu,
                yearDropmenu: uiConfig.selectors.yearDropmenu,
                monthDropdownBtn: uiConfig.selectors.monthDropdownBtn,
                yearDropdownBtn: uiConfig.selectors.yearDropdownBtn,
                monthDropdownMenu: uiConfig.selectors.monthDropdownMenu,
                yearDropdownMenu: uiConfig.selectors.yearDropdownMenu,
                prevBtn: uiConfig.selectors.prevBtn,
                nextBtn: uiConfig.selectors.nextBtn,
                todayBtn: uiConfig.selectors.todayBtn,
                closeBtn: uiConfig.selectors.closeBtn,
                saveBtn: uiConfig.selectors.saveBtn
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

            // Conditional elements, cached silently: .clear-btn is removed by
            // createDropdownDOM when the picker isn't clearable, and a field with
            // no toggle button opens from the input.
            var clearEl = container.querySelector(uiConfig.selectors.clearBtn);
            if (clearEl) elements.clearBtn = clearEl;
            var toggleEl = container.querySelector(uiConfig.selectors.toggleBtn);
            if (toggleEl) elements.toggleBtn = toggleEl;

            return elements;
        },

        // Initialize calendar state
        initializeState: function () {
            var format = (this.elements.container && this.elements.container.getAttribute('data-format')) || NDS.Date.formatFor(this.elements.container);
            var mode = detectFormatMode(format);
            // Expose the mode as an attribute so CSS can gate the day grid /
            // month controls without JS reaching into the dropdown.
            if (this.elements.container) {
                this.elements.container.setAttribute('data-picker-mode', mode);
            }
            return {
                currentDate: NDS.Date.today(),
                selectedDate: null,
                rangeStart: null,
                rangeEnd: null,
                isInitialized: false,
                format: format,
                mode: mode,
                calendarType: this.detectCalendarType(format),
                minDate: null,
                maxDate: null
            };
        },

        // Parse min/max date bounds (day-precision, in the picker's own
        // format). Coexist with data-year-before/after — getYearRange
        // takes the tighter of the two at year granularity. Runs at init, on
        // each open and when either attribute changes, so a bound that follows
        // another field (check-out after check-in) needs no rebuild.
        _readBounds: function () {
            var format = this.state.format;
            var calendarType = this.state.calendarType;
            var calendar = calendarConfig[calendarType];
            // 'today' or 'today±N' (d, m or y; days by default) round-trips through the format, so it
            // carries the calendar's fields like a written date.
            var readBound = function (text) {
                if (!text) return null;
                var rel = /^today(?:([+-]\d+)([dmy])?)?$/.exec(text.trim());
                if (!rel) return calendar.parseDate(text, format);
                var day = shiftToday(+(rel[1] || 0), rel[2] || 'd', calendarType === 'hijri');
                return calendar.parseDate(calendar.formatDate(day, format), format);
            };
            this.state.minDate = readBound(this.elements.input.getAttribute('data-min-date'));
            this.state.maxDate = readBound(this.elements.input.getAttribute('data-max-date'));
            // Open at the nearest bound when the view falls outside [min, max] —
            // otherwise the month shown is entirely disabled.
            this.state.currentDate = this._clampToRange(this.state.currentDate);
        },

        // Day-precision membership test. Returns true when there is no bound.
        isDateAllowed: function (date) {
            if (this.state.minDate && date < this.state.minDate) return false;
            if (this.state.maxDate && date > this.state.maxDate) return false;
            return true;
        },

        // Month is offered in month-grid iff at least one of its days is
        // within [min, max]. Cheap check via first and last of month.
        isMonthAllowedForYear: function (year, monthIndex) {
            if (!this.state.minDate && !this.state.maxDate) return true;
            var isHijri = this.state.calendarType === 'hijri';
            var first, last;
            if (isHijri) {
                first = fromHijri(year, monthIndex, 1);
                last = fromHijri(year, monthIndex, getHijriMonthLength(year, monthIndex));
            } else {
                first = new Date(year, monthIndex, 1);
                last = new Date(year, monthIndex + 1, 0);
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
        // setCustomValidity — NDS.Form.validate / checkValidity then
        // gate the submit. Invalid commits also paint immediate footer
        // feedback (taginput's rejection shape) instead of waiting for
        // submit; clearing is owned by the forms layer (typing clears, blur
        // re-validates through the stamp). `silent` skips the footer paint —
        // used at construction so a pre-filled bad value blocks submit
        // without error chrome on first paint.
        _validateInput: function (silent) {
            var input = this.elements.input;
            var raw = input.value.trim();
            var message = raw ? this._validationError(raw) : '';
            input.setCustomValidity(message);
            if (message && !silent) {
                NDS.Form.setStatus(this.elements.container, 'error', { message: message });
            }
        },

        // Localized error for a non-empty typed value, or '' when valid.
        // Splits on the range separator symmetrically with parseInitialValue,
        // so anything the picker itself would accept validates clean.
        _validationError: function (raw) {
            var lang = this.getLanguage();
            var getMessage = function (key, vars) { return strings.text(key, vars, lang); };
            var format = this.state.format;
            var calendar = this.getCurrentCalendar();
            var parts = raw.split(' - ');
            if (parts.length > 2) return getMessage('invalid', { format: format });
            var dates = [];
            for (var i = 0; i < parts.length; i++) {
                var parsed = null;
                // hijri.parseDate throws (rather than returning null) on
                // impossible component values — same outcome: invalid.
                try { parsed = calendar.parseDate(parts[i].trim(), format); } catch (e) {}
                if (!parsed) return getMessage('invalid', { format: format });
                if (this.state.minDate && parsed < this.state.minDate) {
                    return getMessage('before_min', { date: calendar.formatDate(this.state.minDate, format) });
                }
                if (this.state.maxDate && parsed > this.state.maxDate) {
                    return getMessage('after_max', { date: calendar.formatDate(this.state.maxDate, format) });
                }
                dates.push(parsed);
            }
            if (dates.length === 2 && dates[0] > dates[1]) return getMessage('range_order');
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
            return NDS.Date.calendarFor(this.elements.container) === 'hijri' ? 'hijri' : 'gregorian';
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
            // The typed year picks the calendar: a Hijri year is 1500 or less.
            var greg = NDS.Date.parse(dateString, { format: format });
            var hijri = !greg && NDS.Date.parse(dateString, { format: format, calendar: 'hijri' });
            if (!greg && !hijri) return null;
            var year = greg ? greg.getFullYear() : toHijri(hijri).year;
            return year > 1500 ? 'gregorian' : 'hijri';
        },

        // Utility methods
        // The input's data-lang, then its lang, then the page's: the language of the calendar text.
        getLanguage: function () {
            var input = this.elements && this.elements.input;
            var raw = input && (input.getAttribute('data-lang') || input.lang);
            return raw ? raw.split('-')[0].toLowerCase() : NDS.lang;
        },

        getCurrentCalendar: function () {
            return calendarConfig[this.state.calendarType];
        },

        isRangeMode: function () {
            return this.elements.container.classList.contains('nds-date-range');
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
            if (this.state.calendarType === 'hijri' && hijriParts.get(date)?.day) {
                return hijriParts.get(date).day;
            }
            return date.getDate();
        },

        getMonthNames: function (lang) {
            return NDS.Date.monthNames(this.state.calendarType, lang);
        },

        isTodayDate: function (date) {
            // Per-render hoist: generateCalendarDates stamps _renderToday once per grid.
            return this.isSameDay(date, this._renderToday || NDS.Date.today());
        },

        getTodaysHijriDate: function () {
            return toHijri(NDS.Date.today());
        },

        initializeCalendar: function () {
            // Re-detect calendar type each time — with the picker's own format,
            // so value-based detection parses custom formats correctly.
            this.state.calendarType = this.detectCalendarType(this.state.format);
            this.state.isInitialized = true;
            this._readBounds();
            this.parseInitialValue();
            this.setupCalendarUI();
            this.bindCalendarEvents();
            this.setupLanguageObserver();
            this.render();
            this._renderWhenStringsLand();
        },

        // The picker's language may not have landed yet (its own data-lang, or a page
        // switched by script): render again once it does.
        _renderWhenStringsLand: function () {
            var self = this, lang = this.getLanguage();
            if (!strings.ready(lang)) strings.load(lang).then(function () {
                if (self.state.isInitialized) self.render();
            });
        },

        // Main render method
        render: function () {
            this.updateDropdowns();
            this.renderWeekdays();
            this.renderButtonLabels();
            this.renderCalendarDates();
            this.updateNavArrows();
        },

        // Panel teardown on close — instance state only.
        cleanup: function () {
            // One abort releases every calendar-panel listener: no per-listener bookkeeping to keep paired.
            if (this.panelAbortController) this.panelAbortController.abort();

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
            // Panel-lifetime controller: the calendar is rebuilt on every open, so
            // abort any prior generation's listeners before binding this one's.
            // cleanup() aborts it on close.
            if (this.panelAbortController) this.panelAbortController.abort();
            this.panelAbortController = new AbortController();
            this.bindNavigationEvents();
            this.bindDropdownEvents();
            this.bindActionEvents();
        },

        // Bind navigation events (prev/next month) + day-grid keyboard nav
        bindNavigationEvents: function () {
            var self = this;

            var signal = this.panelAbortController.signal;

            if (this.elements.prevBtn) {
                this.elements.prevBtn.addEventListener('click', function () {
                    self.navigate(-1);
                }, { signal: signal });
            }

            if (this.elements.nextBtn) {
                this.elements.nextBtn.addEventListener('click', function () {
                    self.navigate(1);
                }, { signal: signal });
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
                this.elements.datesContainer.addEventListener('keydown', function (e) {
                    self.handleGridKeydown(e);
                }, { signal: signal });
            }
        },

        // Move focus within the day grid by `offset` cells. If the target
        // would fall outside the rendered grid, navigate to the adjacent
        // month/year and focus the corresponding position after re-render.
        // `offset` is in cells (1 = next day, 7 = next week). Maintains the
        // roving tabindex: only the focused cell stays tabbable.
        focusDayCell: function (currentBtn, offset) {
            var cells = Array.from(this.elements.datesContainer.querySelectorAll('.nds-date-cell'));
            var index = cells.indexOf(currentBtn);
            if (index === -1) return;

            var target = index + offset;
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
            var newIndex = direction === -1
                ? newCells.length + target  // target is negative
                : target - newCells.length;
            newIndex = Math.max(0, Math.min(newCells.length - 1, newIndex));
            // Clear the auto-set tabindex=0 on the re-rendered grid's anchor
            // so we don't end up with two tabbable cells.
            newCells.forEach(function (cell) { cell.tabIndex = -1; });
            if (newCells[newIndex]) {
                newCells[newIndex].tabIndex = 0;
                newCells[newIndex].focus();
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
                case 'Home':
                case 'End': {
                    e.preventDefault();
                    // First / last day of the focused cell's week row (the grid starts on Sunday).
                    // Through focusDayCell, so the Tab stop moves with the focus.
                    var cells = this.elements.datesContainer.querySelectorAll('.nds-date-cell');
                    var index = Array.prototype.indexOf.call(cells, btn);
                    if (index === -1) return;
                    var weekStart = index - (index % 7);
                    var target = e.key === 'Home' ? weekStart : Math.min(cells.length - 1, weekStart + 6);
                    this.focusDayCell(btn, target - index);
                    break;
                }
                case 'PageUp': {
                    e.preventDefault();
                    // Shift = jump a year: step month-by-month (keeps each
                    // step's year-range clamp) with ONE render after the loop —
                    // rendering per step built and discarded 11 grids.
                    var stepsUp = e.shiftKey ? 12 : 1;
                    for (var upStep = 0; upStep < stepsUp; upStep++) if (!this._stepMonth(-1)) break;
                    this._refreshView();
                    this.focusFirstCurrentMonthDay();
                    break;
                }
                case 'PageDown': {
                    e.preventDefault();
                    var stepsDn = e.shiftKey ? 12 : 1;
                    for (var downStep = 0; downStep < stepsDn; downStep++) if (!this._stepMonth(1)) break;
                    this._refreshView();
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
                .querySelectorAll('.nds-date-cell').forEach(function (cell) { cell.tabIndex = -1; });
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

                this.state.currentDate = fromHijri(newYear, newMonth, 1);
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
            this._refreshView();
        },

        // After the viewed month or year moves: header labels, the grid, and the prev/next limits.
        _refreshView: function () {
            this.updateDropdowns();
            this.renderCalendarDates();
            this.updateNavArrows();
        },

        getCurrentHijriDate: function () {
            // If current date already has Hijri data, use it
            var parts = hijriParts.get(this.state.currentDate);
            if (parts?.month && parts.year) {
                return {
                    day: parts.day || 1,
                    month: parts.month,
                    year: parts.year
                };
            }

            return toHijri(this.state.currentDate);
        },

        // Bind dropdown events — initialize NDS.Dropmenu instances
        bindDropdownEvents: function () {
            var self = this;

            if (this.elements.monthDropmenu && !this.monthDropmenuInstance) {
                this.monthDropmenuInstance = NDS.Dropmenu.create(this.elements.monthDropmenu);
                this.elements.monthDropmenu.addEventListener('nds:dropmenu:opened', function () {
                    self.renderMonthOptions();
                    self.scrollToSelected(self.elements.monthDropdownMenu, '.nds-month-option');
                    // Re-measure after content is appended — applyPosition
                    // ran with an empty menu (width 0), so the inline width
                    // it wrote is wrong until we re-trigger positioning.
                    self.monthDropmenuInstance.applyPosition();
                }, { signal: this.instanceAbortController.signal });
            }

            if (this.elements.yearDropmenu && !this.yearDropmenuInstance) {
                this.yearDropmenuInstance = NDS.Dropmenu.create(this.elements.yearDropmenu);
                this.elements.yearDropmenu.addEventListener('nds:dropmenu:opened', function () {
                    self.renderYearOptions();
                    self.scrollToSelected(self.elements.yearDropdownMenu, '.nds-year-option');
                    self.yearDropmenuInstance.applyPosition();
                }, { signal: this.instanceAbortController.signal });
            }
        },

        // Bind action events (today/clear/save buttons)
        bindActionEvents: function () {
            var self = this;

            var signal = this.panelAbortController.signal;

            if (this.elements.todayBtn) {
                this.elements.todayBtn.addEventListener('click', function () {
                    self.selectToday();
                }, { signal: signal });
            }

            if (this.elements.closeBtn) {
                // Close = discard pending state and close the dropmenu. State
                // resets on next open via parseInitialValue, so nothing to do
                // here beyond closing — matches click-outside-to-cancel.
                this.elements.closeBtn.addEventListener('click', function () {
                    if (self.dropmenuInstance && self.dropmenuInstance.isOpen) {
                        self.dropmenuInstance.close();
                    }
                }, { signal: signal });
            }

            if (this.elements.clearBtn) {
                // Clear = wipe committed value + pending state, then close.
                // Opt-in via data-clearable on the container (auto-on for range).
                this.elements.clearBtn.addEventListener('click', function () {
                    self.clearSelection();
                }, { signal: signal });
            }

            if (this.elements.saveBtn) {
                this.elements.saveBtn.addEventListener('click', function () {
                    self.saveAndClose();
                }, { signal: signal });
            }
        },

        // Save and close calendar
        saveAndClose: function () {
            // Month/year mode has no day cell to click — synthesize a selection
            // from state.currentDate (the currently navigated month/year), with
            // day forced to 1 (and month to 1 in year mode) so the stored value
            // matches what NDS.Date.parse produces on the way back in.
            if (this.state.mode !== 'day' && !this.isRangeMode() && !this.state.selectedDate) {
                var date;
                if (this.state.calendarType === 'hijri') {
                    var hijriDate = this.getCurrentHijriDate();
                    date = fromHijri(hijriDate.year, this.state.mode === 'year' ? 1 : hijriDate.month, 1);
                } else {
                    date = new Date(this.state.currentDate);
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
            // year / range): selectDate and selectToday only change pending state.
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

            var weekdayNames = NDS.Date.weekdayNames(this.getLanguage());

            weekdayNames.forEach(function (name) {
                var weekdayElement = document.createElement('div');
                weekdayElement.className = 'nds-weekday';
                weekdayElement.textContent = name;
                weekdaysContainer.appendChild(weekdayElement);
            });
        },

        renderButtonLabels: function () {
            var lang = this.getLanguage();
            var map = { todayBtn: 'today', closeBtn: 'close', clearBtn: 'clear', saveBtn: 'save' };
            for (var key in map) {
                if (this.elements[key]) {
                    var el = this.elements[key].querySelector('.nds-label');
                    if (el) el.textContent = strings.text(map[key], null, lang);
                }
            }
        },

        renderCalendarDates: function () {
            if (!this.elements.datesContainer) return;

            var grid = this.elements.datesContainer;
            var prevIndex = grid.contains(document.activeElement)
                ? Array.prototype.indexOf.call(grid.querySelectorAll('button'), document.activeElement) : -1;
            var sameMode = this._renderedMode === this.state.mode;
            this._renderedMode = this.state.mode;

            grid.innerHTML = '';

            // Month/year modes render a picker grid in place of day cells.
            if (this.state.mode === 'month') {
                this.renderMonthGrid();
            } else if (this.state.mode === 'year') {
                this.renderYearGrid();
            } else {
                var calendar = this.getCurrentCalendar();
                var calendarData = calendar.generateCalendarData(
                    this.getCurrentYear(),
                    this.getCurrentMonth()
                );

                this.generateCalendarDates(calendarData);
            }

            // Emptying the grid dropped the focused cell: focus the one in its place, or the grid's tab stop.
            if (prevIndex > -1) {
                var buttons = grid.querySelectorAll('button');
                var target = (sameMode && buttons[prevIndex]) || grid.querySelector('[tabindex="0"]') || buttons[0];
                if (target) {
                    if (target.classList.contains('nds-date-cell')) {
                        grid.querySelectorAll('.nds-date-cell').forEach(function (cell) { cell.tabIndex = -1; });
                        target.tabIndex = 0;
                    }
                    target.focus();
                }
            }

            this._reposition();
        },

        /**
         * Re-place the panel after a render that changes its height. Stepping a
         * month does not: the day grid always fills 42 cells. Switching MODE
         * does — the month grid is 3x4 and the year grid its own size — and
         * placement was decided against the height at open, so without this the
         * panel keeps the old side and gap. It is also the first placement against
         * the built grid: the opened handler renders with the dropmenu already open.
         */
        _reposition: function () {
            if (this.dropmenuInstance && this.dropmenuInstance.isOpen) {
                this.dropmenuInstance.applyPosition();
            }
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
                var todayNow = NDS.Date.today();
                todaysMonth = todayNow.getMonth();
                todaysYear = todayNow.getFullYear();
            }

            // Selected month = state.selectedDate's month IF its year matches
            // the currently viewed year (grid is one year at a time).
            var selectedMonth = -1;
            if (this.state.selectedDate) {
                var selectedYear = isHijri ? hijriParts.get(this.state.selectedDate)?.year : this.state.selectedDate.getFullYear();
                if (selectedYear === currentYear) {
                    selectedMonth = isHijri
                        ? hijriParts.get(this.state.selectedDate)?.month
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
                appendCellLabel(btn, name, 'nds-truncate');

                if (monthValue === selectedMonth) {
                    NDS.state.add(btn, 'selected');
                } else if (monthValue === todaysMonth && currentYear === todaysYear) {
                    NDS.state.add(btn, 'today');
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
                selectedYear = isHijri ? hijriParts.get(this.state.selectedDate)?.year : this.state.selectedDate.getFullYear();
            }
            var todaysYear = isHijri ? this.getTodaysHijriDate().year : NDS.Date.today().getFullYear();

            for (var year = startYear; year <= endYear; year++) {
                var btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'nds-btn nds-subtle nds-date-cell';
                btn.setAttribute('data-value', year);
                appendCellLabel(btn, year);

                if (year === selectedYear) {
                    NDS.state.add(btn, 'selected');
                } else if (year === todaysYear) {
                    NDS.state.add(btn, 'today');
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
                var date = fromHijri(year, month, 1);
                this.state.currentDate = date;
                this.state.selectedDate = copyDateWithHijri(date);
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
            this._refreshView();
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
                this.state.currentDate = fromHijri(newYear, hijri.month, 1);
            } else {
                var newYearG = this.state.currentDate.getFullYear() + direction;
                if (newYearG < range.start || newYearG > range.end) return;
                // Day 1 in the same call — 29 February would roll into March in a non-leap year.
                this.state.currentDate.setFullYear(newYearG, this.state.currentDate.getMonth(), 1);
            }
            this._refreshView();
        },

        // Disable prev/next when the next step would go outside the year range.
        // Also disables Today when today itself falls outside [min, max]. Called
        // after every navigation and at the end of render(); silent when arrows
        // aren't present (year mode hides them).
        updateNavArrows: function () {
            if (this.elements.todayBtn) {
                this.elements.todayBtn.disabled = !this.isDateAllowed(NDS.Date.today());
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

        // 42 days from the month's first day; a Hijri cell reads its own day.
        generateCalendarDates: function (calendarData) {
            this._renderToday = NDS.Date.today();
            var first = calendarData.firstDay;
            var isHijri = this.state.calendarType === 'hijri';
            for (var i = -calendarData.startOffset; i < 42 - calendarData.startOffset; i++) {
                var date = new Date(first.getFullYear(), first.getMonth(), first.getDate() + i);
                if (isHijri) {
                    var hijriDate = toHijri(date);
                    stampHijri(date, hijriDate.year, hijriDate.month, hijriDate.day);
                }
                this.createDateCell(date, i < 0 || i >= calendarData.daysInMonth ? 'other-month' : 'current-month');
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
            // tokens, so the lookup iterates and filters via NDS.state.has rather
            // than embedding the tokens in attribute selectors. 'today' /
            // 'other-month' are component-private (non-vocab) tokens; selectors
            // over them stay as-is.
            var selected = null;
            for (var i = 0; i < cells.length; i++) {
                if (NDS.state.has(cells[i], 'selected') || NDS.state.has(cells[i], 'range-start')) {
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
            appendCellLabel(btn, this.getDisplayDayNumber(date));

            // Grid child is a slot wrapper: it paints the contiguous range
            // bar (slots tile with no column gap), the button keeps the circle.
            var slot = document.createElement('div');
            slot.className = 'nds-date-slot';
            slot.appendChild(btn);

            // State tokens, not classes — NDS.state writes data-state.
            if (type === 'other-month') {
                NDS.state.add(btn, 'other-month');
            }

            // Check if today using calendar-aware method
            if (this.isTodayDate(date)) {
                NDS.state.add(btn, 'today');
                NDS.aria.current(btn, 'date');
            }

            // Check selection states
            this.applySelectionStates(btn, date);
            // The grid shows the month, today and the pick by place and colour; the name says them.
            NDS.aria.label(btn, NDS.Date.format(date, {
                dateStyle: 'full', locale: this.getLanguage(),
                calendar: this.state.calendarType === 'hijri' ? 'hijri' : 'gregory',
            }));
            NDS.aria.pressed(btn, ['selected', 'range-start', 'range-end'].some(function (state) { return NDS.state.has(btn, state); }));

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
            } else if (this.state.selectedDate && this.isSameDay(date, this.state.selectedDate)) {
                NDS.state.add(btn, 'selected');
            }
        },

        // Apply range selection states
        applyRangeStates: function (btn, date) {
            var isRangeStart = this.state.rangeStart && this.isSameDay(date, this.state.rangeStart);
            var isRangeEnd = this.state.rangeEnd && this.isSameDay(date, this.state.rangeEnd);
            var isInRange = this.state.rangeStart && this.state.rangeEnd &&
                date > this.state.rangeStart && date < this.state.rangeEnd;

            if (isRangeStart) {
                NDS.state.add(btn, 'range-start');
            }

            if (isRangeEnd) {
                NDS.state.add(btn, 'range-end');
            }

            if (isInRange) {
                NDS.state.add(btn, 'in-range');
            }

            // Add visual continuity tokens for styling
            if (isRangeStart && this.state.rangeEnd) {
                NDS.state.add(btn, 'has-range-end');
            }
            if (isRangeEnd && this.state.rangeStart) {
                NDS.state.add(btn, 'has-range-start');
            }

            // Mirror the bar tokens onto the slot wrapper (it owns the range bar).
            var slot = btn.parentElement;
            if (slot && slot.classList.contains('nds-date-slot')) {
                if (isRangeStart) NDS.state.add(slot, 'range-start');
                if (isRangeEnd) NDS.state.add(slot, 'range-end');
                if (isInRange) NDS.state.add(slot, 'in-range');
                if (isRangeStart && this.state.rangeEnd) NDS.state.add(slot, 'has-range-end');
                if (isRangeEnd && this.state.rangeStart) NDS.state.add(slot, 'has-range-start');
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
            var today = NDS.Date.today();
            var isHijri = this.state.calendarType === 'hijri';
            if (isHijri) {
                var hijriDate = toHijri(today);
                stampHijri(today, hijriDate.year, hijriDate.month, hijriDate.day);
            }

            // In range mode, just navigate to today's month (preserve selection)
            if (!this.isRangeMode()) {
                this.state.selectedDate = copyDateWithHijri(today);
            }
            this.state.currentDate = isHijri ? fromHijri(hijriParts.get(today)?.year, hijriParts.get(today)?.month, 1) : new Date(today);

            this._refreshView();
            // Today only mutates state; Save commits (matches selectDate).
        },

        // Explicit erase — wipes the committed input value AND pending state,
        // dispatches change, and closes the picker. Immediate (not deferred to
        // Save) because the user's click IS the confirmation for erasing.
        clearSelection: function () {
            this.state.selectedDate = null;
            this.state.rangeStart = null;
            this.state.rangeEnd = null;
            delete this.elements.input.dataset.convertedDate;
            NDS.setValue(this.elements.input, '');
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

            NDS.setValue(this.elements.input, value);

            // Store converted date in dataset
            if (convertedValue) {
                this.elements.input.dataset.convertedDate = convertedValue;
            } else {
                delete this.elements.input.dataset.convertedDate;
            }
        },

        // Fill each .nds-date-value from the field's text, in its own format and calendar.
        // Text that does not parse empties it, so the server never gets a stale day.
        _syncValueInputs: function () {
            var outs = this.elements.container.querySelectorAll('.nds-date-value');
            if (!outs.length) return;
            var format = this.state.format;
            var type = this.detectCalendarType(format);
            var text = this.elements.input.value.trim();
            var range = this.isRangeMode(), parts = text.split(' - ');
            outs.forEach(function (out, i) {
                var date = null;
                var part = range ? parts[i] : text;
                try { date = part && calendarConfig[type].parseDate(part.trim(), format); } catch (e) {}
                var formatted = date ? NDS.Date.format(date, {
                    format: out.getAttribute('data-date-format') || format,
                    calendar: out.getAttribute('data-calendar') || (type === 'hijri' ? 'hijri' : 'gregory')
                }) : '';
                if (out.value !== formatted) NDS.setValue(out, formatted);
            });
        },

        // The other calendar's value, for data-converted-date.
        getConvertedDate: function (date) {
            if (!date) return '';
            var other = this.state.calendarType === 'hijri' ? 'gregorian' : 'hijri';
            return calendarConfig[other].formatDate(date, this.state.format);
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

            var monthNames = this.getMonthNames(this.getLanguage());
            var self = this;

            var isHijri = self.state.calendarType === 'hijri';
            var currentYear = self.getCurrentYear();

            monthNames.forEach(function (monthName, index) {
                var btn = document.createElement('button');
                btn.className = 'nds-btn nds-subtle nds-dropmenu-item nds-month-option';
                btn.setAttribute('role', 'menuitem');
                btn.setAttribute('data-value', index);
                appendCellLabel(btn, monthName);

                var isSelected = isHijri ?
                    (index + 1) === self.getCurrentMonth() : // For Hijri: compare (0-based index + 1) with 1-based month
                    index === self.getCurrentMonth();        // For Gregorian: compare 0-based with 0-based

                if (isSelected) {
                    NDS.state.add(btn, 'selected');
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

                        self._refreshView();
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
                : NDS.Date.today().getFullYear();
            var start = todayYear - yearRangeBefore;
            var end = todayYear + yearRangeAfter;

            if (this.state.minDate) {
                var minY = isHijri ? hijriParts.get(this.state.minDate)?.year : this.state.minDate.getFullYear();
                if (minY > start) start = minY;
            }
            if (this.state.maxDate) {
                var maxY = isHijri ? hijriParts.get(this.state.maxDate)?.year : this.state.maxDate.getFullYear();
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
                appendCellLabel(btn, year);

                if (year === currentYear) {
                    NDS.state.add(btn, 'selected');
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

                    self._refreshView();
                });

                self.elements.yearDropdownMenu.appendChild(btn);
            }
        },

        // Helper methods for Hijri date manipulation
        setHijriDatePart: function (property, value) {
            var hijriDate = this.getCurrentHijriDate();
            hijriDate[property] = value;
            this.state.currentDate = fromHijri(hijriDate.year, hijriDate.month, hijriDate.day);
        },

        // Center the 'selected'-state option in the dropmenu list. Candidates
        // are matched by selector then filtered via NDS.state.has — keeps
        // state-vocab queries out of the raw selector string.
        scrollToSelected: function (container, selector) {
            setTimeout(function () {
                var selected;
                var candidates = container.querySelectorAll(selector);
                for (var i = 0; i < candidates.length; i++) {
                    if (NDS.state.has(candidates[i], 'selected')) { selected = candidates[i]; break; }
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
        // (initializeCalendar), so release the
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
                    self._renderWhenStringsLand();
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
            // document-level outside-click listeners, and removeDropdownDOM()
            // below detaches the subtree they live in. Tearing them down while
            // still attached lets NDS.Dropmenu.destroy() unwind against live nodes.
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

            // Release the lang-attr subscriber registered in setupLanguageObserver.
            // Lives across open/close cycles (cleanup() doesn't drop it), so the
            // release belongs in destroy() — instance-lifetime, not panel-lifetime.
            if (this._offLangChange) { this._offLangChange(); this._offLangChange = null; }

            // Releases the dropmenu lifecycle listeners on the consumer's
            // formControl (setupDropmenu). That element outlives the instance, so
            // without this the handlers keep it — and the calendar — reachable.
            this.instanceAbortController.abort();

            var container = this.elements.container, input = this.elements.input;
            if (container) container.removeAttribute('data-picker-mode');
            // Nothing is left to clear the picker's own error, so it would block submit for good.
            // Only that one: a status forms or the page set stays.
            if (input && input.validity.customError) {
                input.setCustomValidity('');
                NDS.Form.clearStatus(container);
            }

            // Drop the back-ref on the input so the NdsDatePickerCalendar can
            // be GC'd. Without this the input retains a chain to all the
            // detached DOM nodes the calendar held.
            if (this.elements.input && this.elements.input.ndsDatePicker === this) {
                delete this.elements.input.ndsDatePicker;
            }

            // cleanup() first — it releases listeners on the dropdown's children,
            // so it needs them still attached. Then drop the dropdown subtree the
            // instance built. NDS.Dropmenu.destroy() un-stamps the month/year
            // wrappers, so leaving them behind would let a later
            // NDS.Dropmenu.reinit() adopt them as bare menus wired to no calendar.
            // isDropdownCreated resets so a re-created picker rebuilds from scratch.
            this.cleanup();
            this.removeDropdownDOM();
            this.isDropdownCreated = false;
        }
    };

    function createInstance(dateInput, formControl) {
        if (!dateInput) return null;
        if (dateInput.ndsDatePicker) return dateInput.ndsDatePicker;
        formControl = formControl || dateInput.closest('.nds-form-control');
        if (!formControl) return null;
        // A page with no picker at load never runs init(), so create() wires the bounds watch too.
        watchBounds();
        var instance = new NdsDatePickerCalendar(dateInput, formControl);
        if (!instance.valid) return null;
        dateInput.ndsDatePicker = instance;
        return instance;
    }

    // Self-driven: sweep every .nds-date-input and attach a calendar. create()
    // is idempotent (skips inputs already wired) so this is reinit-safe.
    function setupCalendar() {
        document.querySelectorAll('.nds-date-input').forEach((input) => createInstance(input));
    }

    var boundsWatched = false;
    function watchBounds() {
        if (boundsWatched) return;
        boundsWatched = true;
        // A new bound re-checks the value silently (submit shows the error) and redraws an open calendar.
        NDS.onAttrChange('.nds-date-input', ['data-min-date', 'data-max-date'], (inputs) => inputs.forEach((input) => {
            var instance = input.ndsDatePicker;
            if (!instance) return;
            instance._readBounds();
            instance._validateInput(true);
            if (instance.state.isInitialized) instance.render();
        }));
    }

    // Assigned at module eval so the loader's lazy stub resolves; the loader then
    // calls init() itself. Not the critical tier — this ships in nds-extras.min.js,
    // injected after the reveal.
    NDS.DatePicker = {
        Calendar: NdsDatePickerCalendar,
        CalendarConfig: calendarConfig,
        init: setupCalendar,
        reinit: setupCalendar,
        create: createInstance,
        destroy: (input) => {
            const instance = input?.ndsDatePicker;
            if (!instance) return false;
            instance.destroy();
            return true;
        }
    };

})();