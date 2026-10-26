/* NDS.DatePicker — public surface
 * Rides: nds-dropmenu (positioning, outside-click, top layer — the toggle button, else the input, drives open/close)
 *      · nds-forms (invalid-value status message under the field)
 *      · nds-typing (shaped typing and paste in the input)
 * Requires:
 *   .nds-date-input sits in .nds-form-control — the picker is not built
 * Methods:
 *   NDS.DatePicker.init() / .reinit()          attach a calendar to every .nds-date-input
 *   NDS.DatePicker.create(input, formControl)  build/return one instance — idempotent, null on
 *                                              bad markup; formControl is optional
 *   NDS.DatePicker.destroy(input)              tear one down — the NDS.init.destroy entry point
 *   NDS.DatePicker.CalendarConfig              the gregorian + hijri engines
 *                                              (parseDate / formatDate, on NDS.Date)
 *   NDS.DatePicker.Calendar                    the instance class; its members are internal
 *   el.ndsDatePicker.destroy()                 instance: tear it down (what NDS.DatePicker.destroy calls)
 * Events:
 *   (none — a pick writes the input and dispatches a native `change`; listen on the input)
 * Hooks:
 *   on the .nds-form-container:  data-format (YYYY YY MM M DD D — also picks the
 *                                day/month/year mode; default: the nearest
 *                                data-date-format, else DD/MM/YYYY) · data-clearable (automatic
 *                                in range mode) · .nds-date-range
 *   data-calendar="hijri":       on the container or any ancestor (<html> too): Hijri months
 *                                (none: Gregorian). The value never picks the calendar: a date in
 *                                the other one, typed, pasted or shipped, is converted to it; one
 *                                the user wrote on change, with a neutral message naming it
 *   data-week-start:             sun … sat, on the container or any ancestor: the grid's first
 *                                column (none: Sunday)
 *   .nds-date-value:             a hidden input in the container the picker fills with the day;
 *                                its own data-date-format / data-calendar, else the picker's.
 *                                Range: the first takes the start, the second the end;
 *                                a single date fills every one
 *   .date-picker-toggle:         the button that opens the calendar (none: a click on the
 *                                input opens it)
 *   on the .nds-date-input:      data-min-date · data-max-date (a date, `today`, or `today±N`
 *                                with d, m or y, counted in the field's calendar; a change
 *                                applies at once) · data-lang
 *                                data-disabled-weekdays (sun … sat) · data-disabled-dates (dates in the
 *                                picker's format or YYYY-MM-DD, comma-separated): days that can't be
 *                                picked; a change applies at once
 *                                data-year-before · data-year-after
 *   written by the picker:       data-picker-mode (container) · data-converted-date (input)
 * Gotchas:
 *   - Range mode is the `nds-date-range` class on the container; its value reads "start - end".
 *     Bounds are day-precision and use the picker's own format.
 *   - Hijri and Gregorian: the picker stamps the OTHER calendar's value in
 *     data-converted-date on the input.
 *   - "Today" follows <html data-timezone>; without it, the visitor's clock.
 *   - Hijri is Umm al-Qura, converted exactly by NDS.Date.
 *   - Typing at the end is shaped to the format: digits only, separators added ("28051983" →
 *     "28/05/1983"); typing inside a whole date types over it, and inside one an edit broke
 *     inserts until the digits fill the format. Not with a month-name format (MMM, MMMM).
 *   - A month-name format (MMM, MMMM) cannot be read back: a picked date shows as invalid.
 *   - A pasted date, or a typed one on change, written another common way takes the format
 *     ("1983-05-28" → "28/05/1983"); year last reads day first unless the format is month first.
 *     Sets inputmode="decimal" unless the input has one.
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

    // One number per day, the same for every Date of that day (a Hijri stamp too).
    function getDayKey(date) {
        return date.getFullYear() * 10000 + date.getMonth() * 100 + date.getDate();
    }

    // Write the Hijri trio onto a Gregorian Date and hand it back. This stamp is
    // the file's data contract — the month/year grids, _getYearRange and
    // _getDisplayDayNumber read it — so it lives in one place.
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

    // A month or year button, in a grid or a menu. With no onPick it is disabled.
    function buildUnitButton(className, value, text, onPick, labelClass) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = className;
        btn.setAttribute('data-value', value);
        appendCellLabel(btn, text, labelClass);
        if (!onPick) btn.disabled = true;
        else btn.addEventListener('click', function (e) { e.preventDefault(); onPick(); });
        return btn;
    }

    // English defaults; the assets/i18n/{lang}.json pack overrides them.
    var strings = NDS.i18n.getStrings('date-picker', {
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
        unavailable: '{date} is not available. Pick another day',
        range_order: 'Start date must come before end date',
        converted_hijri: 'Converted from the Hijri date {date}',
        converted_gregory: 'Converted from the Gregorian date {date}',
    });

    // Hijri <-> a local-midnight Date, through NDS.Date (Umm al-Qura).
    function toHijri(date) {
        return NDS.Date.toParts(date, 'hijri');
    }
    // Stamped. Day 30 of a 29-day month clamps to the 29th.
    function fromHijri(year, month, day) {
        var date = NDS.Date.fromParts({ year: year, month: month, day: day }, 'hijri');
        if (!date && day > 29) {
            day = 29;
            date = NDS.Date.fromParts({ year: year, month: month, day: day }, 'hijri');
        }
        return stampHijri(date, year, month, day);
    }
    function getHijriMonthLength(year, month) {
        return NDS.Date.getMonthLength({ year: year, month: month }, 'hijri');
    }

    // Today moved by n days, months or years, counted in the field's calendar. A day past the
    // target month's end becomes its last day: 31 March minus 1m is the last day of February.
    function shiftToday(amount, unit, hijri) {
        var today = NDS.Date.getToday();
        if (unit === 'd') return new Date(today.getFullYear(), today.getMonth(), today.getDate() + amount);
        var calendar = hijri ? 'hijri' : 'gregory';
        var parts = NDS.Date.toParts(today, calendar);
        var totalMonths = parts.year * 12 + parts.month - 1 + (unit === 'y' ? amount * 12 : amount);
        var year = Math.floor(totalMonths / 12), month = totalMonths - year * 12 + 1;
        var day = Math.min(parts.day, NDS.Date.getMonthLength({ year: year, month: month }, calendar));
        return hijri ? fromHijri(year, month, day) : new Date(year, month - 1, day);
    }

    // Detect picker UI mode from the format string. Token presence drives it:
    // any D → day grid; only M+Y → month mode; only Y → year mode. Keeps the
    // format the single source of truth (no separate data-mode attribute).
    function detectFormatMode(format) {
        if (/D/.test(format)) return 'day';
        if (/M/.test(format)) return 'month';
        return 'year';
    }

    // Split keeps the tokens; longest first, so YYYY is not read as two YY.
    var DATE_TOKENS = /(YYYY|YY|MMMM|MMM|MM|M|DD|D)/;
    var isValidUnit = function (text, day) { return +text >= 1 && +text <= (day ? 31 : 12); };

    // The format's units for NDS.typing: a year is a fixed run; a day or month takes two digits (D and M
    // one or two), the first past 3 or 1 ending it.
    var getDateMask = function (format) {
        return NDS.typing.compile(format, DATE_TOKENS, function (token) {
            if (token[0] === 'Y') return { size: token.length };
            var day = token[0] === 'D';
            return { size: 2, open: token.length === 1, first: day ? 3 : 1, valid: function (text) { return isValidUnit(text, day); } };
        });
    };

    // A date written another common way, in the field's format: "1983-05-28", "28.5.1983", "28051983",
    // Arabic digits, a time or هـ after it. A year-last date reads day first unless the field is month
    // first, and the other order only when that day does not exist. NDS.Date reads and writes it, in
    // the calendar its year names (up to 1500: Hijri, as the picker reads a value), or converted
    // into `into` ('hijri' | 'gregory') when the field sets one. Null otherwise.
    function readLoose(text, format, into) {
        text = NDS.toLatinDigits(text).replace(/[\u200e\u200f\u061c]/g, '').trim()
            .replace(/\s*(هـ|ه|AH)$/i, '').replace(/[T\s]\d{1,2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:?\d{2})?$/, '');
        var tokens = format.split(DATE_TOKENS).filter(function (piece, index) { return index % 2; });
        var kinds = tokens.map(function (token) { return token[0]; });
        var groups, orders;
        if (/^\d+$/.test(text)) {
            // One run of digits: the format's units at full width, in its order.
            var i = 0;
            groups = tokens.map(function (token) { return text.slice(i, i += token[0] === 'Y' ? token.length : 2); });
            if (i !== text.length) return null;
            orders = [kinds];
        } else {
            groups = text.split(/[\/.\-\s,]+/);
            if (groups.length !== kinds.length || groups.some(function (group) { return !/^\d+$/.test(group); })) return null;
            var monthFirst = kinds.indexOf('M') < kinds.indexOf('D') && kinds[0] !== 'Y';
            var keep = function (order) { return order.filter(function (kind) { return kinds.indexOf(kind) >= 0; }); };
            orders = groups[0].length > 2 ? [keep(['Y', 'M', 'D'])] : [keep(monthFirst ? ['M', 'D', 'Y'] : ['D', 'M', 'Y']), keep(monthFirst ? ['D', 'M', 'Y'] : ['M', 'D', 'Y'])];
        }
        // Four digits are a year; two only in a YY field, as 20xx.
        var yearDigits = groups[orders[0].indexOf('Y')] || '';
        var year = yearDigits.length === 4 ? 'YYYY' : yearDigits.length === 2 && tokens.indexOf('YY') >= 0 ? 'YY' : null;
        // NDS.Date writes a year as a number, so 0500 would come back as 500.
        if (!year || (year === 'YYYY' && +yearDigits < 1000)) return null;
        var calendar = year === 'YYYY' && +yearDigits <= 1500 ? 'hijri' : 'gregory';
        for (var orderIndex = 0; orderIndex < orders.length; orderIndex++) {
            var date = NDS.Date.parse(groups.join('/'), { format: orders[orderIndex].join('/').replace('Y', year), calendar: calendar });
            if (date) return NDS.Date.format(date, { format: format, calendar: into || calendar });
        }
        return null;
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

    var SELECTORS = Object.freeze({
        container: '.nds-form-container',
        dropdown: '.nds-date-picker-menu',
        toggleButton: '.date-picker-toggle',
        monthDropmenu: '.nds-month-dropmenu',
        yearDropmenu: '.nds-year-dropmenu',
        monthDropdownButton: '.nds-month-dropmenu .nds-dropmenu-trigger',
        yearDropdownButton: '.nds-year-dropmenu .nds-dropmenu-trigger',
        monthDropdownMenu: '.nds-month-dropmenu .nds-dropmenu-scroll',
        yearDropdownMenu: '.nds-year-dropmenu .nds-dropmenu-scroll',
        prevButton: '.prev-month',
        nextButton: '.next-month',
        todayButton: '.today-btn',
        closeButton: '.close-btn',
        clearButton: '.clear-btn',
        saveButton: '.save-btn',
        datesContainer: '.nds-date-picker-dates'
    });

    // Calendar Instance Class
    function NdsDatePickerCalendar(dateInput, formControl) {
        // Success signal — createInstance gates the init-guard expando on it,
        // so a bailed construction stays eligible for a later reinit() sweep.
        this._valid = false;
        var container = formControl.closest(SELECTORS.container);
        if (!container) {
            console.warn('NDS DatePicker: calendar container not found');
            return;
        }

        this._elements = {
            input: dateInput,
            formControl: formControl,
            container: container,
            toggleButton: container.querySelector(SELECTORS.toggleButton)
        };

        this._state = this._getInitialState();
        this._readBounds();
        this._isDropdownCreated = false;
        // Scopes listeners bound to elements the instance does not own (the
        // consumer's formControl), so destroy() releases them in one abort.
        this.instanceAbortController = new AbortController();

        // Bind events that need dropdown creation
        this._addInitListeners();
        // A shipped value in another form or calendar takes the field's, and stamps validity at
        // construction (silently) so a server-rendered out-of-bounds value can't pass a pre-open submit.
        if (dateInput.value.trim()) { this._readTyped(); this._validateInput(true); }
        this._syncValueInputs();
        this._valid = true;
    }

    NdsDatePickerCalendar.prototype = {
        // Bind events that trigger dropdown creation
        _addInitListeners: function () {
            var self = this;

            // Handler to ensure dropdown exists before toggling
            var ensureDropdownAndToggle = function (e) {
                // Forms copies a readonly input to the field's state; the calendar button stays live.
                if (self._elements.input.disabled || NDS.state.has(self._elements.container, 'readonly')) return;
                if (!self._isDropdownCreated) {
                    // Create dropdown DOM
                    self._removeDropdown();
                    self._buildDropdown();

                    // Re-cache all elements
                    self._elements = self._cacheElements(self._elements.input, self._elements.formControl);
                    if (!self._elements.dropdown) {
                        console.error('NDS DatePicker: failed to create dropdown');
                        return;
                    }

                    self._isDropdownCreated = true;

                    // Wire the form-control as an NDS.Dropmenu so we get
                    // open/close/auto-close-others/outside-click/escape for free.
                    // `data-dropmenu-no-click` — we drive toggle from the input
                    //   and toggle-button click handlers below.
                    // `data-dropmenu-no-keys` — calendar grid keyboard nav is
                    //   2D; NDS.Dropmenu's flat trigger/menu key handling would
                    //   conflict with both input typing and day-cell movement.
                    self._setupDropmenu();
                }

                // Toggle through the NDS.Dropmenu instance so auto-close-others
                // and other dropmenu invariants apply uniformly; the click anchors
                // the calendar under the pointer (anchor: 'cursor' in _setupDropmenu).
                if (e) e.stopPropagation();
                self._dropmenuInstance.toggle(e);
            };

            var signal = this.instanceAbortController.signal;

            // The button opens the calendar, so a click in the input only places the cursor.
            // Markup with no button keeps the input as the trigger.
            (this._elements.toggleButton || this._elements.input).addEventListener('click', ensureDropdownAndToggle, { signal: signal });

            // Fires for hand-typed edits AND picker commits (_syncInput
            // dispatches 'change'). Attached on the input (target) so the
            // stamp lands before forms' document-level change delegation
            // reads validity.
            this._elements.input.addEventListener('change', function () {
                // A date converted from the other calendar says so: the user sees why the field changed.
                var typed = self._elements.input.value;
                if (self._readTyped()) {
                    var key = self._state.calendarType === 'hijri' ? 'converted_gregory' : 'converted_hijri';
                    NDS.Form.setStatus(self._elements.container, 'neutral', { message: strings.text(key, { date: typed.trim() }, self._getLanguage()) });
                }
                self._validateInput();
                self._syncValueInputs();
            }, { signal: signal });
            // A form reset restores the field after this event, and a hidden input keeps what JS wrote.
            // The old value's error goes too; Forms clears the message.
            NDS.field.onReset(this._elements.input.form, function () { self._readTyped(); self._validateInput(true); self._syncValueInputs(); }, { signal: signal });
            // Typing is shaped to the format (NDS.typing); a paste in any common form is that date, kept in
            // its own calendar until the change converts it, as a typed one is.
            if (!/MMM/.test(this._state.format)) NDS.typing.addTypingListeners(this._elements.input, {
                getMask: function () { return getDateMask(self._isRangeMode() ? self._state.format + ' - ' + self._state.format : self._state.format); },
                read: function (text) { return self._readDates(text, true); },
                signal: signal,
                decimal: true,
            });
        },

        // Text as the field's date (or range) in its format, through readLoose; null when it is none.
        // A date the user types or pastes in the other calendar is converted into the field's (the
        // value the page shipped, else the nearest data-calendar, else Gregorian), never switching it;
        // with keepCalendar, it stays in its own.
        _readDates: function (text, keepCalendar) {
            var format = this._state.format, into = keepCalendar ? null : this._state.calendarType === 'hijri' ? 'hijri' : 'gregory';
            var dates = this._isRangeMode() ? text.split(/\s+[-–—]\s+|\s+(?:to|إلى)\s+/) : [text];
            if (!text.trim() || dates.length > 2) return null;
            dates = dates.map(function (date) { return readLoose(date, format, into); });
            return dates.indexOf(null) >= 0 ? null : dates.join(' - ');
        },

        // A typed date written another common way takes the field's format, as the time picker reads
        // a time. Text it cannot read stays, for the invalid message. True when a date came from the other calendar.
        _readTyped: function () {
            var input = this._elements.input, value = this._readDates(input.value);
            if (value === null || value === input.value) return false;
            var converted = value !== this._readDates(input.value, true);
            NDS.setValue(input, value, { change: false });
            return converted;
        },

        // Adopt NDS.Dropmenu for the calendar's open/close/escape/outside-click
        // lifecycle. The form-control becomes the dropmenu wrapper and the
        // dropdown becomes the dropmenu menu, placed by the dropmenu's own syncPosition.
        _setupDropmenu: function () {
            var self = this;
            var formControl = this._elements.formControl;
            var dropdown = this._elements.dropdown;

            // Cursor anchoring: the native click handler is skipped (no click), so the
            // toggle handler passes its click to toggle(e).
            this._dropmenuInstance = NDS.Dropmenu.create(formControl, { menu: dropdown, click: false, keys: false, anchor: 'cursor' });

            // Calendar lifecycle hooks.
            // Guard `e.target !== formControl` — these events bubble, so the
            // inner month/year sub-dropmenus' open/close events would otherwise
            // re-init or tear down the calendar every time the user picks a
            // month or year.
            // Scoped to the instance controller: formControl is consumer-owned and
            // outlives destroy(), so an un-torn-down listener here would keep `self`
            // — and its detached dropdown — reachable, and would re-run
            // _setupPanel() against detached nodes after a destroy/create cycle.
            var signal = this.instanceAbortController.signal;

            formControl.addEventListener('nds:dropmenu:opened', function (e) {
                if (e.target !== formControl) return;
                NDS.state.add(self._elements.container, 'open');
                // Its render places the panel against the built grid (_reposition).
                self._setupPanel();
            }, { signal: signal });

            formControl.addEventListener('nds:dropmenu:closed', function (e) {
                if (e.target !== formControl) return;
                NDS.state.remove(self._elements.container, 'open');
                self._cleanup();
            }, { signal: signal });
        },

        // Create dropdown DOM structure
        _buildDropdown: function () {
            var dropdown = document.createElement('div');
            dropdown.className = 'nds-date-picker-menu';

            var lang = this._getLanguage();
            var calendarHtml =
                '<div class="nds-date-picker-header">' +
                    '<div class="nds-date-picker-title">' +
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
                        '<div class="nds-date-picker-month-switch">' +
                            '<button class="nds-btn nds-subtle nds-icon-only prev-month" type="button" aria-label="' + NDS.escapeHtml(strings.text('prev_month', null, lang)) + '">' +
                                '<i class="nds-icon nds-hgi-arrow-prev-02" aria-hidden="true"></i>' +
                            '</button>' +
                            '<button class="nds-btn nds-subtle nds-icon-only next-month" type="button" aria-label="' + NDS.escapeHtml(strings.text('next_month', null, lang)) + '">' +
                                '<i class="nds-icon nds-hgi-arrow-next-02" aria-hidden="true"></i>' +
                            '</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="nds-date-picker-body">' +
                    '<div class="nds-date-picker-weekdays"></div>' +
                    '<div class="nds-date-picker-dates"></div>' +
                '</div>' +
                '<div class="nds-date-picker-footer">' +
                    '<div class="nds-date-picker-action-start">' +
                        '<button class="nds-btn nds-secondary-outline today-btn" type="button">' +
                            '<span class="nds-label"></span>' +
                        '</button>' +
                        // Clear is opt-in via data-clearable on the container
                        // (or automatic in range mode — typical use case).
                        '<button class="nds-btn nds-subtle clear-btn" type="button">' +
                            '<span class="nds-label"></span>' +
                        '</button>' +
                    '</div>' +
                    '<div class="nds-date-picker-action-end">' +
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
            var container = this._elements.container;
            var clearable = container.hasAttribute('data-clearable') || container.classList.contains('nds-date-range');
            if (!clearable) {
                var clearButton = dropdown.querySelector('.clear-btn');
                if (clearButton) clearButton.remove();
            }

            // Insert dropdown after the input, inside the same parent (form-control)
            this._elements.input.insertAdjacentElement('afterend', dropdown);
        },

        // Remove dropdown DOM. Optional-chained on container: _cacheElements
        // returns {} when the container is gone, and destroy() calls this — a
        // throw there would skip the rest of teardown.
        _removeDropdown: function () {
            var dropdown = this._elements.container?.querySelector(SELECTORS.dropdown);
            if (dropdown) {
                dropdown.remove();
            }
        },

        // Cache DOM elements
        _cacheElements: function (dateInput, formControl) {
            var container = formControl.closest(SELECTORS.container);
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

            var required = ['dropdown', 'datesContainer'];
            var optional = ['monthDropmenu', 'yearDropmenu', 'monthDropdownButton', 'yearDropdownButton', 'monthDropdownMenu',
                'yearDropdownMenu', 'prevButton', 'nextButton', 'todayButton', 'closeButton', 'saveButton'];

            for (var i = 0; i < required.length; i++) {
                var element = container.querySelector(SELECTORS[required[i]]);
                if (!element) {
                    console.error('NDS DatePicker: required calendar element not found:', required[i], SELECTORS[required[i]]);
                    return {};
                }
                elements[required[i]] = element;
            }

            optional.forEach(function (key) {
                var element = container.querySelector(SELECTORS[key]);
                if (element) elements[key] = element;
                else console.warn('NDS DatePicker: optional calendar element not found:', key, SELECTORS[key]);
            });

            // Conditional elements, cached silently: .clear-btn is removed by
            // _buildDropdown when the picker isn't clearable, and a field with
            // no toggle button opens from the input.
            var clearEl = container.querySelector(SELECTORS.clearButton);
            if (clearEl) elements.clearButton = clearEl;
            var toggleEl = container.querySelector(SELECTORS.toggleButton);
            if (toggleEl) elements.toggleButton = toggleEl;

            return elements;
        },

        // Initialize calendar state
        _getInitialState: function () {
            var format = (this._elements.container && this._elements.container.getAttribute('data-format')) || NDS.Date.getFormat(this._elements.container);
            var mode = detectFormatMode(format);
            // Expose the mode as an attribute so CSS can gate the day grid /
            // month controls without JS reaching into the dropdown.
            if (this._elements.container) {
                this._elements.container.setAttribute('data-picker-mode', mode);
            }
            return {
                currentDate: NDS.Date.getToday(),
                selectedDate: null,
                rangeStart: null,
                rangeEnd: null,
                isInitialized: false,
                format: format,
                mode: mode,
                calendarType: this._detectCalendarType(),
                minDate: null,
                maxDate: null,
                disabledWeekdays: [],
                disabledDates: new Set()
            };
        },

        // Parse min/max date bounds (day-precision, in the picker's own
        // format). Coexist with data-year-before/after — _getYearRange
        // takes the tighter of the two at year granularity. Runs at init, on
        // each open and when either attribute changes, so a bound that follows
        // another field (check-out after check-in) needs no rebuild.
        _readBounds: function () {
            var format = this._state.format;
            var calendarType = this._state.calendarType;
            var calendar = calendarConfig[calendarType];
            // 'today' or 'today±N' (d, m or y; days by default) round-trips through the format, so it
            // carries the calendar's fields like a written date.
            var readBound = function (text) {
                if (!text) return null;
                var match = /^today(?:([+-]\d+)([dmy])?)?$/.exec(text.trim());
                if (!match) return calendar.parseDate(text, format);
                var day = shiftToday(+(match[1] || 0), match[2] || 'd', calendarType === 'hijri');
                return calendar.parseDate(calendar.formatDate(day, format), format);
            };
            this._state.minDate = readBound(this._elements.input.getAttribute('data-min-date'));
            this._state.maxDate = readBound(this._elements.input.getAttribute('data-max-date'));
            // Days that can't be picked: weekdays (sun … sat), and dates in the picker's format or
            // YYYY-MM-DD, comma-separated, so code can write a server's dates as they come.
            this._state.disabledWeekdays = NDS.Date.readWeekdays(this._elements.input.getAttribute('data-disabled-weekdays'));
            this._state.disabledDates = new Set();
            (this._elements.input.getAttribute('data-disabled-dates') || '').split(',').forEach((text) => {
                text = text.trim();
                if (!text) return;
                var day = calendar.parseDate(text, format) || NDS.Date.readDay(text);
                if (day) this._state.disabledDates.add(getDayKey(day));
                else console.warn('NDS DatePicker: data-disabled-dates: "' + text + '" is not a date in ' + format + ' or YYYY-MM-DD');
            });
            // Open at the nearest bound when the view falls outside [min, max] —
            // otherwise the month shown is entirely disabled.
            this._state.currentDate = this._clampToRange(this._state.currentDate);
        },

        // Day-precision membership test: within [min, max], and not an unavailable weekday or date.
        _isDateAllowed: function (date) {
            if (this._state.minDate && date < this._state.minDate) return false;
            if (this._state.maxDate && date > this._state.maxDate) return false;
            if (this._state.disabledWeekdays.includes(date.getDay())) return false;
            return !this._state.disabledDates.has(getDayKey(date));
        },

        // Off days can leave no day to pick in the month on view: show the next month that has one,
        // a year at most, else stay.
        _skipEmptyMonths: function () {
            var shown = this._state.currentDate;
            for (var i = 0; i < 12 && !this._hasDayToPick(); i++) {
                if (!this._stepMonth(1)) break;
            }
            if (!this._hasDayToPick()) this._state.currentDate = shown;
        },

        _hasDayToPick: function () {
            var year = this._getCurrentYear(), month = this._getCurrentMonth();
            var length = this._state.calendarType === 'hijri' ? getHijriMonthLength(year, month) : new Date(year, month + 1, 0).getDate();
            for (var day = 1; day <= length; day++) {
                if (this._isDateAllowed(this._makeDay(year, month, day))) return true;
            }
            return false;
        },

        // Month is offered in month-grid iff at least one of its days is
        // within [min, max]. Cheap check via first and last of month.
        _isMonthAllowed: function (year, monthIndex) {
            if (!this._state.minDate && !this._state.maxDate) return true;
            var isHijri = this._state.calendarType === 'hijri';
            var first, last;
            if (isHijri) {
                first = fromHijri(year, monthIndex, 1);
                last = fromHijri(year, monthIndex, getHijriMonthLength(year, monthIndex));
            } else {
                first = new Date(year, monthIndex, 1);
                last = new Date(year, monthIndex + 1, 0);
            }
            if (this._state.maxDate && first > this._state.maxDate) return false;
            if (this._state.minDate && last < this._state.minDate) return false;
            return true;
        },

        // Snap a date to the nearest bound if it's outside [min, max]. Used
        // by month/year commit paths where the picker synthesizes day=1 and
        // could land before minDate (or after maxDate).
        _clampToRange: function (date) {
            if (this._state.minDate && date < this._state.minDate) return copyDateWithHijri(this._state.minDate);
            if (this._state.maxDate && date > this._state.maxDate) return copyDateWithHijri(this._state.maxDate);
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
            var input = this._elements.input;
            var raw = input.value.trim();
            var message = raw ? this._validationError(raw) : '';
            input.setCustomValidity(message);
            if (message && !silent) {
                NDS.Form.setStatus(this._elements.container, 'error', { message: message });
            }
        },

        // Localized error for a non-empty typed value, or '' when valid.
        // Splits on the range separator symmetrically with _parseInitialValue,
        // so anything the picker itself would accept validates clean.
        _validationError: function (raw) {
            var lang = this._getLanguage();
            var getMessage = function (key, vars) { return strings.text(key, vars, lang); };
            var format = this._state.format;
            var calendar = this._getCurrentCalendar();
            var parts = raw.split(' - ');
            if (parts.length > 2) return getMessage('invalid', { format: format });
            var dates = [];
            for (var i = 0; i < parts.length; i++) {
                var parsed = calendar.parseDate(parts[i].trim(), format);
                if (!parsed) return getMessage('invalid', { format: format });
                if (this._state.minDate && parsed < this._state.minDate) {
                    return getMessage('before_min', { date: calendar.formatDate(this._state.minDate, format) });
                }
                if (this._state.maxDate && parsed > this._state.maxDate) {
                    return getMessage('after_max', { date: calendar.formatDate(this._state.maxDate, format) });
                }
                // A range may span unavailable days; its two ends may not be one.
                if (!this._isDateAllowed(parsed)) return getMessage('unavailable', { date: calendar.formatDate(parsed, format) });
                dates.push(parsed);
            }
            if (dates.length === 2 && dates[0] > dates[1]) return getMessage('range_order');
            return '';
        },

        // The nearest data-calendar, else Gregorian. The value never picks it: a date in the other
        // calendar is converted into this one (_readTyped).
        _detectCalendarType: function () {
            return NDS.Date.getCalendar(this._elements.container) === 'hijri' ? 'hijri' : 'gregorian';
        },

        // Utility methods
        // The input's data-lang, then the nearest lang, as the Calendar reads it: the language of the calendar text.
        _getLanguage: function () {
            var input = this._elements && this._elements.input;
            return NDS.i18n.resolveLang(input && (input.getAttribute('data-lang') || input.closest('[lang]')?.lang));
        },

        _getCurrentCalendar: function () {
            return calendarConfig[this._state.calendarType];
        },

        _isRangeMode: function () {
            return this._elements.container.classList.contains('nds-date-range');
        },

        // Simple helper methods
        _getCurrentMonth: function () {
            if (this._state.calendarType === 'hijri') {
                var hijriDate = this._getCurrentHijriDate();
                return hijriDate.month; // Keep as 1-based (1-12)
            }
            return this._state.currentDate.getMonth();
        },

        _getCurrentYear: function () {
            if (this._state.calendarType === 'hijri') {
                var hijriDate = this._getCurrentHijriDate();
                return hijriDate.year;
            }
            return this._state.currentDate.getFullYear();
        },

        _getDisplayDayNumber: function (date) {
            return (this._state.calendarType === 'hijri' && hijriParts.get(date)?.day) || date.getDate();
        },

        // A date's year in the field's calendar: a Hijri date reads its stamp.
        _getYear: function (date) {
            return this._state.calendarType === 'hijri' ? hijriParts.get(date)?.year : date.getFullYear();
        },

        _getTodaysYear: function () {
            return this._state.calendarType === 'hijri' ? this._getTodaysHijriDate().year : NDS.Date.getToday().getFullYear();
        },

        // Months count from 1 in Hijri and from 0 in a Date, as _getCurrentMonth returns them.
        _getFirstMonth: function () {
            return this._state.calendarType === 'hijri' ? 1 : 0;
        },

        // Day `day` of a month in the field's calendar, the month counted as _getCurrentMonth counts it.
        _makeDay: function (year, month, day) {
            return this._state.calendarType === 'hijri' ? fromHijri(year, month, day) : new Date(year, month, day);
        },

        // close() is not idempotent: only an open calendar closes.
        _closeCalendar: function () {
            if (this._dropmenuInstance && this._dropmenuInstance.isOpen) this._dropmenuInstance.close();
        },

        // The roving Tab stop: only the focused cell is tabbable.
        _focusCell: function (cell) {
            this._elements.datesContainer.querySelectorAll('.nds-date-cell').forEach(function (other) { other.tabIndex = -1; });
            cell.tabIndex = 0;
            cell.focus();
        },

        _getMonthNames: function (lang) {
            return NDS.Date.getMonthNames(this._state.calendarType, lang);
        },

        _isTodayDate: function (date) {
            // Per-render hoist: _buildDayCells stamps _renderToday once per grid.
            return this._isSameDay(date, this._renderToday || NDS.Date.getToday());
        },

        _getTodaysHijriDate: function () {
            return toHijri(NDS.Date.getToday());
        },

        _setupPanel: function () {
            // Each time: a script may change data-calendar between opens.
            this._state.calendarType = this._detectCalendarType();
            this._state.isInitialized = true;
            this._readBounds();
            this._parseInitialValue();
            if (!this._state.selectedDate && !this._state.rangeStart) this._skipEmptyMonths();
            this._addPanelListeners();
            this._setupLanguageObserver();
            this._render();
            this._renderWhenStringsLand();
        },

        // The picker's language may not have landed yet (its own data-lang, or a page
        // switched by script): render again once it does.
        _renderWhenStringsLand: function () {
            var self = this, lang = this._getLanguage();
            if (!strings.ready(lang)) strings.load(lang).then(function () {
                if (self._state.isInitialized) self._render();
            });
        },

        // Main render method
        _render: function () {
            this._setupPanelUi();
            this._renderCalendarDates();
            this._syncNavArrows();
        },

        // Panel teardown on close — instance state only.
        _cleanup: function () {
            // One abort releases every calendar-panel listener: no per-listener bookkeeping to keep paired.
            if (this.panelAbortController) this.panelAbortController.abort();

            // Close dropmenu instances — keep alive, reused on next calendar open
            if (this._monthDropmenuInstance && this._monthDropmenuInstance.isOpen) {
                this._monthDropmenuInstance.close();
            }
            if (this._yearDropmenuInstance && this._yearDropmenuInstance.isOpen) {
                this._yearDropmenuInstance.close();
            }

            // Clear rendered content
            if (this._elements.monthDropdownMenu) this._elements.monthDropdownMenu.innerHTML = '';
            if (this._elements.yearDropdownMenu) this._elements.yearDropdownMenu.innerHTML = '';
            if (this._elements.datesContainer) this._elements.datesContainer.innerHTML = '';

            // Reset all inline positioning styles
            if (this._elements.dropdown) {
                this._elements.dropdown.style.cssText = '';
            }

            // Reset states
            this._resetState();
            this._state.isInitialized = false;
        },

        // Parse initial input value
        _parseInitialValue: function () {
            // Clear pending selection state first — if the user closed the
            // picker without Save, this drops the un-committed pick so the
            // reopen reflects the committed input value exactly.
            this._resetState();

            var inputValue = this._elements.input.value.trim();
            if (!inputValue) return;

            var calendar = this._getCurrentCalendar();

            // Handle range format
            if (inputValue.includes(' - ')) {
                var rangeParts = inputValue.split(' - ');
                if (rangeParts.length === 2) {
                    var startDate = calendar.parseDate(rangeParts[0].trim(), this._state.format);
                    var endDate = calendar.parseDate(rangeParts[1].trim(), this._state.format);

                    if (startDate && endDate) {
                        // View anchor is a clamped COPY: an out-of-bounds value
                        // must not open a fully-disabled month, and the anchor
                        // must not alias rangeStart (month nav mutates it).
                        this._state.currentDate = this._clampToRange(copyDateWithHijri(startDate));
                        this._state.rangeStart = startDate;
                        this._state.rangeEnd = endDate;

                        var convertedStart = this._getConvertedDate(startDate);
                        var convertedEnd = this._getConvertedDate(endDate);
                        if (convertedStart && convertedEnd) {
                            this._elements.input.dataset.convertedDate = convertedStart + ' - ' + convertedEnd;
                        }
                        return;
                    }
                }
            }

            // Handle single date format
            var parsedDate = calendar.parseDate(inputValue, this._state.format);
            if (parsedDate) {
                // Clamped COPY — see the range branch above.
                this._state.currentDate = this._clampToRange(copyDateWithHijri(parsedDate));
                this._state.selectedDate = parsedDate;

                var convertedValue = this._getConvertedDate(parsedDate);
                if (convertedValue) {
                    this._elements.input.dataset.convertedDate = convertedValue;
                }
            }
        },

        // Setup calendar UI components
        _setupPanelUi: function () {
            this._syncDropdowns();
            this._renderWeekdays();
            this._renderButtonLabels();
        },

        // Bind calendar-specific events
        _addPanelListeners: function () {
            // Panel-lifetime controller: the calendar is rebuilt on every open, so
            // abort any prior generation's listeners before binding this one's.
            // cleanup() aborts it on close.
            if (this.panelAbortController) this.panelAbortController.abort();
            this.panelAbortController = new AbortController();
            this._addNavigationListeners();
            this._addDropdownListeners();
            this._addActionListeners();
        },

        // Bind navigation events (prev/next month) + day-grid keyboard nav
        _addNavigationListeners: function () {
            var self = this;

            var signal = this.panelAbortController.signal;

            if (this._elements.prevButton) {
                this._elements.prevButton.addEventListener('click', function () {
                    self._navigate(-1);
                }, { signal: signal });
            }

            if (this._elements.nextButton) {
                this._elements.nextButton.addEventListener('click', function () {
                    self._navigate(1);
                }, { signal: signal });
            }

            // 2D keyboard navigation for the day grid (WAI-ARIA Date Picker
            // Dialog pattern). Bound on the container so re-renders don't
            // require rebinding — events bubble from the focused day button.
            // Day mode only: month/year grids are 3/4-column, so the 7-column
            // arrow geometry (±7 rows, %7 Home/End) doesn't apply — and the
            // off-grid month step would silently shift the month
            // that Save synthesizes from. Their few cells stay plain tab-order
            // buttons.
            if (this._elements.datesContainer && this._state.mode === 'day') {
                this._elements.datesContainer.addEventListener('keydown', function (e) {
                    self._handleGridKeydown(e);
                }, { signal: signal });
            }
        },

        // Move focus within the day grid by `offset` cells. If the target
        // would fall outside the rendered grid, navigate to the adjacent
        // month/year and focus the corresponding position after re-render.
        // `offset` is in cells (1 = next day, 7 = next week). Maintains the
        // roving tabindex: only the focused cell stays tabbable.
        // step: how to walk past a day that can't be picked (a disabled button takes no focus);
        // the arrow's own direction unless given. Home and End walk back toward the start.
        _focusDayCell: function (cell, offset, step) {
            var cells = Array.from(this._elements.datesContainer.querySelectorAll('.nds-date-cell'));
            var index = cells.indexOf(cell);
            if (index === -1) return;
            step = step || (Math.abs(offset) === 7 ? offset : Math.sign(offset));

            var target = index + offset;
            while (target >= 0 && target < cells.length && cells[target].disabled) target += step;
            // Within the rendered 42-cell grid — focus directly.
            if (target >= 0 && target < cells.length) {
                this._focusCell(cells[target]);
                return;
            }

            // Outside the grid: navigate to the adjacent month, then re-pick
            // a cell at the equivalent position. The grid is 6 weeks × 7 days
            // = 42 cells; moving "off the top" by N cells = move into previous
            // month then focus index (42 + target). Moving "off the bottom" by
            // N = move into next month then focus index (target - 42).
            var direction = target < 0 ? -1 : 1;
            // At the year range's edge the month stays: so does the focus. So at a bound, when the
            // next month has no day to pick: the walk past the off days must not show it.
            var shown = this._state.currentDate;
            if (!this._stepMonth(direction)) return;
            if (!this._isMonthAllowed(this._getCurrentYear(), this._getCurrentMonth())) {
                this._state.currentDate = shown;
                return;
            }
            this._syncView();
            var newCells = Array.from(this._elements.datesContainer.querySelectorAll('.nds-date-cell'));
            var newIndex = direction === -1
                ? newCells.length + target  // target is negative
                : target - newCells.length;
            newIndex = Math.max(0, Math.min(newCells.length - 1, newIndex));
            while (newCells[newIndex] && newCells[newIndex].disabled) newIndex += step;
            // _focusCell also clears the re-rendered grid's own tab stop. No day to pick that
            // way: the grid's own tab stop, so the focus is not lost with the old grid.
            if (newCells[newIndex]) this._focusCell(newCells[newIndex]);
            else this._elements.datesContainer.querySelector('.nds-date-cell[tabindex="0"]')?.focus();
        },

        // WAI-ARIA Date Picker Dialog grid keys.
        _handleGridKeydown: function (e) {
            var btn = e.target.closest('.nds-date-cell');
            if (!btn) return;

            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    // RTL flips left/right semantics so the focus moves with
                    // the day order on screen.
                    this._focusDayCell(btn, NDS.isRtl ? 1 : -1);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this._focusDayCell(btn, NDS.isRtl ? -1 : 1);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this._focusDayCell(btn, -7);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this._focusDayCell(btn, 7);
                    break;
                case 'Home':
                case 'End': {
                    e.preventDefault();
                    // First / last day of the focused cell's week row.
                    // Through _focusDayCell, so the Tab stop moves with the focus.
                    var cells = this._elements.datesContainer.querySelectorAll('.nds-date-cell');
                    var index = Array.prototype.indexOf.call(cells, btn);
                    if (index === -1) return;
                    var weekStart = index - (index % 7);
                    var target = e.key === 'Home' ? weekStart : Math.min(cells.length - 1, weekStart + 6);
                    // An unavailable first or last day: the nearest day to pick, toward the focus.
                    this._focusDayCell(btn, target - index, e.key === 'Home' ? 1 : -1);
                    break;
                }
                case 'PageUp': {
                    e.preventDefault();
                    // Shift = jump a year: step month-by-month (keeps each
                    // step's year-range clamp) with ONE render after the loop —
                    // rendering per step built and discarded 11 grids.
                    var stepsUp = e.shiftKey ? 12 : 1;
                    for (var upStep = 0; upStep < stepsUp; upStep++) if (!this._stepMonth(-1)) break;
                    this._syncView();
                    this._focusFirstCurrentMonthDay();
                    break;
                }
                case 'PageDown': {
                    e.preventDefault();
                    var stepsDown = e.shiftKey ? 12 : 1;
                    for (var downStep = 0; downStep < stepsDown; downStep++) if (!this._stepMonth(1)) break;
                    this._syncView();
                    this._focusFirstCurrentMonthDay();
                    break;
                }
                // Enter / Space fall through to the native button click,
                // which _selectDate handles via the existing click listener.
            }
        },

        // After a PageUp/PageDown month switch, drop focus on the first day
        // of the new month so the user has somewhere to continue arrow nav.
        // Re-anchors the roving tabindex to the newly-focused cell.
        _focusFirstCurrentMonthDay: function () {
            if (!this._elements.datesContainer) return;
            var firstDay = this._elements.datesContainer.querySelector(
                '.nds-date-cell:not([data-state~="other-month"], :disabled)'
            );
            if (firstDay) this._focusCell(firstDay);
        },

        // Advance currentDate by one month WITHOUT rendering; returns false
        // when the step would leave the year range. Multi-step callers
        // (Shift+PageUp/Down) step N times and render once.
        _stepMonth: function (direction) {
            var range = this._getYearRange();
            var first = this._getFirstMonth();
            var month = this._getCurrentMonth() + direction;
            var year = this._getCurrentYear();
            if (month < first) { month = first + 11; year--; }
            else if (month > first + 11) { month = first; year++; }
            if (year < range.start || year > range.end) return false;
            // Day 1: a day-29..31 date would roll past the target month.
            this._state.currentDate = this._makeDay(year, month, 1);
            return true;
        },

        // Navigate month (unified for Gregorian and Hijri)
        _navigateMonth: function (direction) {
            if (!this._stepMonth(direction)) return;
            this._syncView();
        },

        // After the viewed month or year moves: header labels, the grid, and the prev/next limits.
        _syncView: function () {
            this._syncDropdowns();
            this._renderCalendarDates();
            this._syncNavArrows();
        },

        _getCurrentHijriDate: function () {
            // If current date already has Hijri data, use it
            var parts = hijriParts.get(this._state.currentDate);
            if (parts?.month && parts.year) {
                return {
                    day: parts.day || 1,
                    month: parts.month,
                    year: parts.year
                };
            }

            return toHijri(this._state.currentDate);
        },

        // Bind dropdown events — initialize NDS.Dropmenu instances
        _addDropdownListeners: function () {
            var self = this;

            if (this._elements.monthDropmenu && !this._monthDropmenuInstance) {
                this._monthDropmenuInstance = NDS.Dropmenu.create(this._elements.monthDropmenu);
                this._elements.monthDropmenu.addEventListener('nds:dropmenu:opened', function () {
                    self._renderMonthOptions();
                    self._scrollToSelected(self._elements.monthDropdownMenu, '.nds-month-option');
                    // Re-measure after content is appended — syncPosition
                    // ran with an empty menu (width 0), so the inline width
                    // it wrote is wrong until we re-trigger positioning.
                    self._monthDropmenuInstance.syncPosition();
                }, { signal: this.instanceAbortController.signal });
            }

            if (this._elements.yearDropmenu && !this._yearDropmenuInstance) {
                this._yearDropmenuInstance = NDS.Dropmenu.create(this._elements.yearDropmenu);
                this._elements.yearDropmenu.addEventListener('nds:dropmenu:opened', function () {
                    self._renderYearOptions();
                    self._scrollToSelected(self._elements.yearDropdownMenu, '.nds-year-option');
                    self._yearDropmenuInstance.syncPosition();
                }, { signal: this.instanceAbortController.signal });
            }
        },

        // Bind action events (today/clear/save buttons)
        _addActionListeners: function () {
            var self = this;
            var signal = this.panelAbortController.signal;
            // Close drops the pending pick (the next open re-reads the input), as an outside click does.
            // Clear wipes the value too; opt-in through data-clearable (always on for a range).
            var actions = { todayButton: '_selectToday', closeButton: '_closeCalendar', clearButton: '_clearSelection', saveButton: '_saveAndClose' };
            Object.keys(actions).forEach(function (key) {
                if (self._elements[key]) self._elements[key].addEventListener('click', function () { self[actions[key]](); }, { signal: signal });
            });
        },

        // Save and close calendar
        _saveAndClose: function () {
            // Month/year mode has no day cell to click — synthesize a selection
            // from state.currentDate (the currently navigated month/year), with
            // day forced to 1 (and month to 1 in year mode) so the stored value
            // matches what NDS.Date.parse produces on the way back in.
            if (this._state.mode !== 'day' && !this._isRangeMode() && !this._state.selectedDate) {
                var date = this._makeDay(this._getCurrentYear(), this._state.mode === 'year' ? this._getFirstMonth() : this._getCurrentMonth(), 1);
                // Same clamp _selectUnit applies — the synthesized day=1 can
                // land before minDate when the bound sits mid-month.
                this._state.selectedDate = this._clampToRange(date);
            }
            // Half-picked range commits as a single-day range (end = start) so
            // the input always carries the "start - end" shape in range mode.
            if (this._isRangeMode() && this._state.rangeStart && !this._state.rangeEnd) {
                this._state.rangeEnd = copyDateWithHijri(this._state.rangeStart);
            }
            // Commit pending state to the input on every save (day / month /
            // year / range): _selectDate and _selectToday only change pending state.
            this._syncInput();
            this._closeCalendar();
        },

        // Update dropdown labels
        _syncDropdowns: function () {
            if (!this._state.isInitialized) return;

            var lang = this._getLanguage();

            if (this._elements.monthDropdownButton) {
                var monthNames = this._getMonthNames(lang);
                var currentMonth = this._getCurrentMonth();
                // For Hijri: convert 1-based month to 0-based array index
                var monthIndex = this._state.calendarType === 'hijri' ? currentMonth - 1 : currentMonth;
                this._elements.monthDropdownButton.querySelector('.nds-label').textContent = monthNames[monthIndex];
            }

            if (this._elements.yearDropdownButton) {
                this._elements.yearDropdownButton.querySelector('.nds-label').textContent = this._getCurrentYear();
            }
        },

        // Render methods
        _renderWeekdays: function () {
            var weekdaysContainer = this._elements.dropdown.querySelector('.nds-date-picker-weekdays');
            if (!weekdaysContainer) return;

            weekdaysContainer.innerHTML = '';

            var weekdayNames = NDS.Date.getWeekdayNames(this._getLanguage(), NDS.Date.getWeekStart(this._elements.container));

            weekdayNames.forEach(function (name) {
                var weekdayElement = document.createElement('div');
                weekdayElement.className = 'nds-weekday';
                weekdayElement.textContent = name;
                weekdaysContainer.appendChild(weekdayElement);
            });
        },

        _renderButtonLabels: function () {
            var lang = this._getLanguage();
            var map = { todayButton: 'today', closeButton: 'close', clearButton: 'clear', saveButton: 'save' };
            for (var key in map) {
                if (this._elements[key]) {
                    var el = this._elements[key].querySelector('.nds-label');
                    if (el) el.textContent = strings.text(map[key], null, lang);
                }
            }
        },

        _renderCalendarDates: function () {
            if (!this._elements.datesContainer) return;

            var grid = this._elements.datesContainer;
            var prevIndex = grid.contains(document.activeElement)
                ? Array.prototype.indexOf.call(grid.querySelectorAll('button'), document.activeElement) : -1;
            var sameMode = this._renderedMode === this._state.mode;
            this._renderedMode = this._state.mode;

            grid.innerHTML = '';

            // Month/year modes render a picker grid in place of day cells.
            if (this._state.mode === 'month') {
                this._renderMonthGrid();
            } else if (this._state.mode === 'year') {
                this._renderYearGrid();
            } else {
                var calendar = this._getCurrentCalendar();
                var calendarData = calendar.generateCalendarData(
                    this._getCurrentYear(),
                    this._getCurrentMonth()
                );

                this._buildDayCells(calendarData);
            }

            // Emptying the grid dropped the focused cell: focus the one in its place, or the grid's tab stop.
            if (prevIndex > -1) {
                var buttons = grid.querySelectorAll('button');
                var target = (sameMode && buttons[prevIndex]) || grid.querySelector('[tabindex="0"]') || buttons[0];
                if (target && target.classList.contains('nds-date-cell')) this._focusCell(target);
                else if (target) target.focus();
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
            if (this._dropmenuInstance && this._dropmenuInstance.isOpen) {
                this._dropmenuInstance.syncPosition();
            }
        },

        // Month-mode body: 3×4 grid of months. Click sets state.selectedDate
        // (day forced to 1) so the value survives close-without-save reset and
        // Save commits it via the shared _syncInput path.
        _renderMonthGrid: function () {
            var self = this;
            var isHijri = this._state.calendarType === 'hijri';
            var monthNames = this._getMonthNames(this._getLanguage());
            var currentYear = this._getCurrentYear();

            // Today's month/year in the active calendar — the *viewed* month
            // (_getCurrentMonth) isn't today's, and a Hijri year never equals
            // a Gregorian getFullYear().
            var todaysMonth, todaysYear;
            if (isHijri) {
                var todaysHijri = this._getTodaysHijriDate();
                todaysMonth = todaysHijri.month;
                todaysYear = todaysHijri.year;
            } else {
                var todayNow = NDS.Date.getToday();
                todaysMonth = todayNow.getMonth();
                todaysYear = todayNow.getFullYear();
            }

            // Selected month = state.selectedDate's month IF its year matches
            // the currently viewed year (grid is one year at a time).
            var selectedMonth = -1;
            if (this._state.selectedDate && this._getYear(this._state.selectedDate) === currentYear) {
                selectedMonth = isHijri
                    ? hijriParts.get(this._state.selectedDate)?.month
                    : this._state.selectedDate.getMonth();
            }

            var first = this._getFirstMonth();
            monthNames.forEach(function (name, i) {
                var monthValue = i + first;
                var btn = buildUnitButton('nds-btn nds-subtle nds-date-cell', monthValue, name,
                    self._isMonthAllowed(currentYear, monthValue) && function () { self._selectUnit('month', monthValue); }, 'nds-truncate');

                if (monthValue === selectedMonth) {
                    NDS.state.add(btn, 'selected');
                } else if (monthValue === todaysMonth && currentYear === todaysYear) {
                    NDS.state.add(btn, 'today');
                }

                self._elements.datesContainer.appendChild(btn);
            });
        },

        // Year-mode body: grid of years derived from the same data-year-before
        // / data-year-after range the year dropmenu uses (single source of truth).
        _renderYearGrid: function () {
            var self = this;
            var range = this._getYearRange();
            var selectedYear = this._state.selectedDate ? this._getYear(this._state.selectedDate) : -1;
            var todaysYear = this._getTodaysYear();

            for (var year = range.start; year <= range.end; year++) {
                var btn = buildUnitButton('nds-btn nds-subtle nds-date-cell', year, year, this._selectUnit.bind(this, 'year', year));

                if (year === selectedYear) {
                    NDS.state.add(btn, 'selected');
                } else if (year === todaysYear) {
                    NDS.state.add(btn, 'today');
                }

                self._elements.datesContainer.appendChild(btn);
            }
        },

        // Shared month/year cell click: sets state.currentDate to the picked
        // unit (with lower units forced to 1) and mirrors it into
        // state.selectedDate so _saveAndClose commits without synthesizing.
        _selectUnit: function (unit, value) {
            var year = unit === 'year' ? value : this._getCurrentYear();
            var month = unit === 'month' ? value : (unit === 'year' ? this._getFirstMonth() : this._getCurrentMonth());
            this._state.currentDate = this._makeDay(year, month, 1);
            this._state.selectedDate = copyDateWithHijri(this._state.currentDate);
            // Clamp when the synthesized day=1 falls outside [min, max] — the
            // month/year cell was allowed (some day in it is in range), so
            // snap the committed date to the nearest bound.
            this._state.selectedDate = this._clampToRange(this._state.selectedDate);
            this._syncView();
        },

        // Prev/next dispatch — day mode nudges month, month mode nudges year,
        // year mode arrows are hidden by CSS so this branch is inert there.
        _navigate: function (direction) {
            if (this._state.mode === 'month') return this._navigateYear(direction);
            this._navigateMonth(direction);
        },

        _navigateYear: function (direction) {
            var range = this._getYearRange();
            var year = this._getCurrentYear() + direction;
            if (year < range.start || year > range.end) return;
            // Day 1: 29 February would roll into March in a non-leap year.
            this._state.currentDate = this._makeDay(year, this._getCurrentMonth(), 1);
            this._syncView();
        },

        // Disable prev/next when the next step would go outside the year range.
        // Also disables Today when today itself falls outside [min, max]. Called
        // after every navigation and at the end of render(); silent when arrows
        // aren't present (year mode hides them).
        _syncNavArrows: function () {
            if (this._elements.todayButton) {
                this._elements.todayButton.disabled = !this._isDateAllowed(NDS.Date.getToday());
            }
            if (!this._elements.prevButton || !this._elements.nextButton) return;
            var range = this._getYearRange();
            var currentYear = this._getCurrentYear();
            var atStart, atEnd;
            if (this._state.mode === 'month') {
                atStart = currentYear <= range.start;
                atEnd = currentYear >= range.end;
            } else {
                var currentMonth = this._getCurrentMonth();
                var firstMonth = this._getFirstMonth();
                atStart = currentYear <= range.start && currentMonth <= firstMonth;
                atEnd = currentYear >= range.end && currentMonth >= firstMonth + 11;
            }
            this._elements.prevButton.disabled = atStart;
            this._elements.nextButton.disabled = atEnd;
        },

        // 42 days from the week start on or before the month's first day; a Hijri cell reads its own day.
        _buildDayCells: function (calendarData) {
            this._renderToday = NDS.Date.getToday();
            var first = calendarData.firstDay;
            var isHijri = this._state.calendarType === 'hijri';
            var start = NDS.Date.getStartOfWeek(first, NDS.Date.getWeekStart(this._elements.container));
            for (var i = 0; i < 42; i++) {
                var date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
                if (isHijri) {
                    var hijriDate = toHijri(date);
                    stampHijri(date, hijriDate.year, hijriDate.month, hijriDate.day);
                }
                this._buildDateCell(date, date < first || date > calendarData.lastDay ? 'other-month' : 'current-month');
            }

            // Promote one cell to tabindex=0 so the user can Tab into the grid.
            this._setActiveDayCell();
        },

        // Roving tabindex anchor: pick the most meaningful cell to be the
        // tab-entry point. Priority: selected day → today (current month) →
        // first day of current month → first day to pick → first cell.
        _setActiveDayCell: function () {
            if (!this._elements.datesContainer) return;
            var cells = this._elements.datesContainer.querySelectorAll('.nds-date-cell');
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
            // A day that can't be picked takes no focus, so it is never the tab stop.
            var today = this._elements.datesContainer.querySelector(
                '.nds-date-cell[data-state~="today"]:not([data-state~="other-month"], :disabled)'
            );
            var firstCurrent = this._elements.datesContainer.querySelector(
                '.nds-date-cell:not([data-state~="other-month"], :disabled)'
            );
            var firstEnabled = this._elements.datesContainer.querySelector('.nds-date-cell:not(:disabled)');
            var anchor = selected || today || firstCurrent || firstEnabled || cells[0];
            anchor.tabIndex = 0;
        },

        // Create individual date cell
        _buildDateCell: function (date, type) {
            var self = this;
            var btn = document.createElement('button');
            btn.className = 'nds-btn nds-subtle nds-date-cell';
            btn.type = 'button';
            // Roving tabindex (WAI-ARIA grid pattern): all cells start
            // non-tabbable; _setActiveDayCell() promotes one cell per render
            // so Tab from outside the grid lands on the meaningful day
            // (selected / today / first day) instead of cycling all 42.
            btn.tabIndex = -1;

            // Day number display — built imperatively so the value flows through
            // .textContent (text-only) and never reaches the HTML parser.
            appendCellLabel(btn, this._getDisplayDayNumber(date));

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
            if (this._isTodayDate(date)) {
                NDS.state.add(btn, 'today');
                NDS.aria.current(btn, 'date');
            }

            // Check selection states
            this._syncSelectionStates(btn, date);
            // The grid shows the month, today and the pick by place and colour; the name says them.
            NDS.aria.label(btn, NDS.Date.getDayLabel(date, {
                locale: this._getLanguage(),
                calendar: this._state.calendarType === 'hijri' ? 'hijri' : 'gregory',
            }));
            NDS.aria.pressed(btn, ['selected', 'range-start', 'range-end'].some(function (state) { return NDS.state.has(btn, state); }));

            // Out-of-range days paint disabled and skip the click handler entirely.
            if (!this._isDateAllowed(date)) {
                btn.disabled = true;
            } else {
                btn.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    self._selectDate(date);
                });
            }

            this._elements.datesContainer.appendChild(slot);
        },

        // Apply selection states to date cell
        _syncSelectionStates: function (btn, date) {
            if (this._isRangeMode()) {
                this._syncRangeStates(btn, date);
            } else if (this._state.selectedDate && this._isSameDay(date, this._state.selectedDate)) {
                NDS.state.add(btn, 'selected');
            }
        },

        // Apply range selection states
        _syncRangeStates: function (btn, date) {
            var isRangeStart = this._state.rangeStart && this._isSameDay(date, this._state.rangeStart);
            var isRangeEnd = this._state.rangeEnd && this._isSameDay(date, this._state.rangeEnd);
            var isInRange = this._state.rangeStart && this._state.rangeEnd &&
                date > this._state.rangeStart && date < this._state.rangeEnd;

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
            if (isRangeStart && this._state.rangeEnd) {
                NDS.state.add(btn, 'has-range-end');
            }
            if (isRangeEnd && this._state.rangeStart) {
                NDS.state.add(btn, 'has-range-start');
            }

            // Mirror the bar tokens onto the slot wrapper (it owns the range bar).
            var slot = btn.parentElement;
            if (slot && slot.classList.contains('nds-date-slot')) {
                if (isRangeStart) NDS.state.add(slot, 'range-start');
                if (isRangeEnd) NDS.state.add(slot, 'range-end');
                if (isInRange) NDS.state.add(slot, 'in-range');
                if (isRangeStart && this._state.rangeEnd) NDS.state.add(slot, 'has-range-end');
                if (isRangeEnd && this._state.rangeStart) NDS.state.add(slot, 'has-range-start');
            }
        },

        // Date selection handlers
        _selectDate: function (date) {
            if (this._isRangeMode()) {
                this._selectRange(date);
            } else {
                this._state.selectedDate = copyDateWithHijri(date);
            }

            // Selection only mutates state — Save commits to the input.
            // Consumers listening for `change` on the input still get one event,
            // fired from _saveAndClose. Closing without Save discards the pending
            // pick (_parseInitialValue re-syncs state from input on next open).
            this._renderCalendarDates();
        },

        _selectToday: function () {
            var today = NDS.Date.getToday();
            var isHijri = this._state.calendarType === 'hijri';
            if (isHijri) {
                var hijriDate = toHijri(today);
                stampHijri(today, hijriDate.year, hijriDate.month, hijriDate.day);
            }

            // In range mode, just navigate to today's month (preserve selection)
            if (!this._isRangeMode()) {
                this._state.selectedDate = copyDateWithHijri(today);
            }
            this._state.currentDate = isHijri ? fromHijri(hijriDate.year, hijriDate.month, 1) : new Date(today);

            this._syncView();
            // Today only mutates state; Save commits (matches _selectDate).
        },

        // Explicit erase — wipes the committed input value AND pending state,
        // dispatches change, and closes the picker. Immediate (not deferred to
        // Save) because the user's click IS the confirmation for erasing.
        _clearSelection: function () {
            this._resetState();
            delete this._elements.input.dataset.convertedDate;
            NDS.setValue(this._elements.input, '');
            this._renderCalendarDates();
            this._closeCalendar();
        },

        // Range selection logic
        _selectRange: function (clickedDate) {
            if (!this._state.rangeStart || (this._state.rangeStart && this._state.rangeEnd)) {
                this._state.rangeStart = copyDateWithHijri(clickedDate);
                this._state.rangeEnd = null;
                this._state.selectedDate = copyDateWithHijri(clickedDate);
            } else if (this._state.rangeStart && !this._state.rangeEnd) {
                if (clickedDate >= this._state.rangeStart) {
                    this._state.rangeEnd = copyDateWithHijri(clickedDate);
                } else {
                    this._state.rangeEnd = copyDateWithHijri(this._state.rangeStart);
                    this._state.rangeStart = copyDateWithHijri(clickedDate);
                }
                this._state.selectedDate = copyDateWithHijri(this._state.rangeEnd);
            }
        },

        // Update input value
        _syncInput: function () {
            var calendar = this._getCurrentCalendar();
            var value = '';
            var convertedValue = '';

            if (this._isRangeMode() && this._state.rangeStart) {
                value = calendar.formatDate(this._state.rangeStart, this._state.format);
                convertedValue = this._getConvertedDate(this._state.rangeStart);
                if (this._state.rangeEnd) {
                    value += ' - ' + calendar.formatDate(this._state.rangeEnd, this._state.format);
                    convertedValue += ' - ' + this._getConvertedDate(this._state.rangeEnd);
                }
            } else if (this._state.selectedDate) {
                value = calendar.formatDate(this._state.selectedDate, this._state.format);
                convertedValue = this._getConvertedDate(this._state.selectedDate);
            }

            NDS.setValue(this._elements.input, value);

            // Store converted date in dataset
            if (convertedValue) {
                this._elements.input.dataset.convertedDate = convertedValue;
            } else {
                delete this._elements.input.dataset.convertedDate;
            }
        },

        // Fill each .nds-date-value from the field's text, in its own format and calendar.
        // Text that does not parse empties it, so the server never gets a stale day.
        _syncValueInputs: function () {
            var outs = this._elements.container.querySelectorAll('.nds-date-value');
            if (!outs.length) return;
            var format = this._state.format;
            var type = this._detectCalendarType();
            var text = this._elements.input.value.trim();
            // A day the field refuses (out of bounds, unavailable) is no value to send.
            if (text && this._validationError(text)) text = '';
            var range = this._isRangeMode(), parts = text.split(' - ');
            outs.forEach(function (out, i) {
                var part = range ? parts[i] : text;
                var date = part && calendarConfig[type].parseDate(part.trim(), format);
                var formatted = date ? NDS.Date.format(date, {
                    format: out.getAttribute('data-date-format') || format,
                    calendar: out.getAttribute('data-calendar') || (type === 'hijri' ? 'hijri' : 'gregory')
                }) : '';
                if (out.value !== formatted) NDS.setValue(out, formatted);
            });
        },

        // The other calendar's value, for data-converted-date.
        _getConvertedDate: function (date) {
            if (!date) return '';
            var other = this._state.calendarType === 'hijri' ? 'gregorian' : 'hijri';
            return calendarConfig[other].formatDate(date, this._state.format);
        },

        // Utility methods
        _isSameDay: function (date1, date2) {
            return date1.getDate() === date2.getDate() &&
                date1.getMonth() === date2.getMonth() &&
                date1.getFullYear() === date2.getFullYear();
        },

        // Dropdown rendering methods
        _renderMonthOptions: function () {
            if (!this._elements.monthDropdownMenu) return;

            this._elements.monthDropdownMenu.innerHTML = '';

            var self = this;
            var isHijri = this._state.calendarType === 'hijri';
            var currentYear = this._getCurrentYear();
            var currentMonth = this._getCurrentMonth();
            var first = this._getFirstMonth();

            this._getMonthNames(this._getLanguage()).forEach(function (monthName, index) {
                var month = index + first;
                // Same allowed-day check the month grid uses: a month is pickable when a day of it is in [min, max].
                var btn = buildUnitButton('nds-btn nds-subtle nds-dropmenu-item nds-month-option', index, monthName,
                    self._isMonthAllowed(currentYear, month) && function () {
                        if (isHijri) self._setHijriDatePart('month', month);
                        // Day 1: a day-29..31 date would roll past the target month.
                        else self._state.currentDate.setMonth(month, 1);
                        self._syncView();
                    });
                btn.setAttribute('role', 'menuitem');
                if (month === currentMonth) NDS.state.add(btn, 'selected');
                self._elements.monthDropdownMenu.appendChild(btn);
            });
        },

        // Shared year-range bounds — driven by input's data-year-before /
        // data-year-after, relative to today's year. Used by the year dropmenu,
        // the year-mode grid, and the prev/next navigation clamp. Coexists
        // with data-min-date / data-max-date — the tighter side wins.
        _getYearRange: function () {
            var yearRangeBefore = parseInt(this._elements.input.dataset.yearBefore, 10);
            if (isNaN(yearRangeBefore)) yearRangeBefore = 5; // isNaN, not || — "0" is a valid window
            // Omitted or 0 caps the year list at the current year (no future).
            var yearRangeAfter = parseInt(this._elements.input.dataset.yearAfter, 10) || 0;

            var todayYear = this._getTodaysYear();
            var start = todayYear - yearRangeBefore;
            var end = todayYear + yearRangeAfter;

            if (this._state.minDate) {
                var minYear = this._getYear(this._state.minDate);
                if (minYear > start) start = minYear;
            }
            if (this._state.maxDate) {
                var maxYear = this._getYear(this._state.maxDate);
                if (maxYear < end) end = maxYear;
            }
            return { start: start, end: end };
        },

        _renderYearOptions: function () {
            if (!this._elements.yearDropdownMenu) return;

            this._elements.yearDropdownMenu.innerHTML = '';

            var range = this._getYearRange();
            var currentYear = this._getCurrentYear();

            for (var year = range.start; year <= range.end; year++) {
                var btn = buildUnitButton('nds-btn nds-subtle nds-dropmenu-item nds-year-option', year, year, this._pickYear.bind(this, year));
                btn.setAttribute('role', 'menuitem');
                if (year === currentYear) NDS.state.add(btn, 'selected');
                this._elements.yearDropdownMenu.appendChild(btn);
            }
        },

        // The year menu's pick: the viewed month in that year.
        _pickYear: function (year) {
            if (this._state.calendarType === 'hijri') {
                this._setHijriDatePart('year', year);
            } else {
                // Day 1 first — Feb 29 would roll into March on non-leap years.
                this._state.currentDate.setDate(1);
                this._state.currentDate.setFullYear(year);
            }
            this._syncView();
        },

        // Helper methods for Hijri date manipulation
        _setHijriDatePart: function (property, value) {
            var hijriDate = this._getCurrentHijriDate();
            hijriDate[property] = value;
            this._state.currentDate = fromHijri(hijriDate.year, hijriDate.month, hijriDate.day);
        },

        // Center the 'selected'-state option in the dropmenu list. Candidates
        // are matched by selector then filtered via NDS.state.has — keeps
        // state-vocab queries out of the raw selector string.
        _scrollToSelected: function (container, selector) {
            setTimeout(function () {
                var selected;
                var candidates = container.querySelectorAll(selector);
                for (var i = 0; i < candidates.length; i++) {
                    if (NDS.state.has(candidates[i], 'selected')) { selected = candidates[i]; break; }
                }
                if (selected) {
                    var containerRect = container.getBoundingClientRect();
                    var selectedRect = selected.getBoundingClientRect();
                    container.scrollTop = Math.max(0, selectedRect.top - containerRect.top + container.scrollTop - (containerRect.height / 2) + (selectedRect.height / 2));
                }
            }, 10);
        },

        // Setup language observer.
        // _setupLanguageObserver runs every time the calendar is (re-)initialized
        // (_setupPanel), so release the
        // prior subscription before registering a new one — otherwise each
        // re-init stacks a fresh closure on the pool's array. The handle is
        // also released in destroy() so a calendar instance teardown drops
        // its lang-attr subscriber instead of leaking it for the page lifetime.
        _setupLanguageObserver: function () {
            if (this._offLangChange) this._offLangChange();
            var self = this;
            this._offLangChange = NDS.onAttributeChange('html', ['lang'], function () {
                if (self._state.isInitialized) {
                    self._renderWeekdays();
                    self._renderButtonLabels();
                    self._syncDropdowns();
                    self._renderWhenStringsLand();
                }
            });
        },

        // Reset state
        _resetState: function () {
            this._state.selectedDate = null;
            this._state.rangeStart = null;
            this._state.rangeEnd = null;
        },

        // Destroy instance
        destroy: function () {
            // Destroy inner month/year dropmenus FIRST — they hold their own
            // document-level outside-click listeners, and _removeDropdown()
            // below detaches the subtree they live in. Tearing them down while
            // still attached lets NDS.Dropmenu.destroy() unwind against live nodes.
            if (this._monthDropmenuInstance) {
                this._monthDropmenuInstance.destroy();
                this._monthDropmenuInstance = null;
            }
            if (this._yearDropmenuInstance) {
                this._yearDropmenuInstance.destroy();
                this._yearDropmenuInstance = null;
            }

            // Close before destroying so the dropmenu instance gets a chance
            // to fire its closed event (which runs cleanup() via the listener
            // wired in _setupDropmenu).
            if (this._dropmenuInstance) {
                this._closeCalendar();
                this._dropmenuInstance.destroy();
                this._dropmenuInstance = null;
            }

            // Release the lang-attr subscriber registered in _setupLanguageObserver.
            // Lives across open/close cycles (cleanup() doesn't drop it), so the
            // release belongs in destroy() — instance-lifetime, not panel-lifetime.
            if (this._offLangChange) { this._offLangChange(); this._offLangChange = null; }

            // Releases the dropmenu lifecycle listeners on the consumer's
            // formControl (_setupDropmenu). That element outlives the instance, so
            // without this the handlers keep it — and the calendar — reachable.
            this.instanceAbortController.abort();

            var container = this._elements.container, input = this._elements.input;
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
            if (this._elements.input && this._elements.input.ndsDatePicker === this) {
                delete this._elements.input.ndsDatePicker;
            }

            // cleanup() first — it releases listeners on the dropdown's children,
            // so it needs them still attached. Then drop the dropdown subtree the
            // instance built. NDS.Dropmenu.destroy() un-stamps the month/year
            // wrappers, so leaving them behind would let a later
            // NDS.Dropmenu.reinit() adopt them as bare menus wired to no calendar.
            // isDropdownCreated resets so a re-created picker rebuilds from scratch.
            this._cleanup();
            this._removeDropdown();
            this._isDropdownCreated = false;
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
        if (!instance._valid) return null;
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
        // A new bound or unavailable day re-checks the value silently (submit shows the error) and redraws an open calendar.
        NDS.onAttributeChange('.nds-date-input', ['data-min-date', 'data-max-date', 'data-disabled-weekdays', 'data-disabled-dates'], (inputs) => inputs.forEach((input) => {
            var instance = input.ndsDatePicker;
            if (!instance) return;
            instance._readBounds();
            instance._validateInput(true);
            instance._syncValueInputs();
            if (instance._state.isInitialized) instance._render();
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