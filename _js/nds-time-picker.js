/* NDS.TimePicker — public surface
 * Rides: nds-dropmenu (the panel's open/close, escape, outside-click, positioning)
 *      · nds-customselect (each unit inside the panel is a stock .nds-select)
 *      · nds-typing (shaped typing and paste in the input)
 *      · nds-forms (invalid-value status message under the field; soft)
 * Methods:
 *   NDS.TimePicker.init() / .reinit()           attach a picker to every .nds-time-input
 *                                               and every .nds-time-fields group
 *   NDS.TimePicker.create(input, formControl)   build/return one instance — idempotent,
 *                                               null on bad markup; formControl is optional
 *   NDS.TimePicker.validate(el, opts)  the boxes' check → {valid, message}; opts {showMessage}
 *   NDS.TimePicker.destroy(el)                  tear one down — the NDS.init.destroy entry point
 *   NDS.TimePicker.setValue(el, '14:30')        commit a 24h value — false when unparsable
 *                                               or outside data-min-time/data-max-time
 *   NDS.TimePicker.getValue(el)                 the 24h value, '' until the time is complete
 *   NDS.TimePicker.clear(el)                    empty the field and every unit
 *   instance.elements                           {input, formControl, container, …}, read-only
 *   instance.isPanelCreated                     true once the panel is built (on first open)
 * Events:
 *   (none — a pick writes the input and dispatches native input + change; listen on the input)
 * Hooks:
 *   on the .nds-form-container:  data-format (HH H hh h mm ss A a — sets the display AND
 *                                which unit pickers the panel holds) · data-step (minute
 *                                step)
 *   .time-picker-toggle:         the button that opens the panel (none: a click on the
 *                                input opens it)
 *   on the .nds-time-input:      data-min-time · data-max-time (24h HH:mm[:ss], always)
 *   box mode — .nds-time-fields: an hour box .nds-time-hour and a minute box
 *                                .nds-time-minute, 24h only; data-min-time · data-max-time
 *                                on the group
 * Gotchas:
 *   - Box mode has no panel, no data-format and no seconds. Its error stamps the hour box,
 *     which nds-forms reads for the group at submit.
 *   - The visible input is DISPLAY ("02:30 م") and is typeable; the hidden .nds-time-value
 *     carries the stable 24h string and is the one that submits. Read getValue().
 *   - Typing at the end is shaped to the format: digits only, separators added, a/p
 *     (or the Arabic letters) for AM/PM. A mid-text edit is left as written. 24h formats
 *     get inputmode="decimal" unless the input sets its own. A typed separator after one
 *     digit pads it ("2:" → "02:"); any non-digit counts, so the keypad's "." works.
 *   - A paste commits at once when it reads as a time in any clock or digits ("2:30 PM"
 *     into HH:mm → 14:30); anything else waits for the blur's error.
 *   - Bounds are 24h whatever data-format says, matching <input type="time"> min/max.
 *   - The panel builds on FIRST OPEN. setValue()/getValue()/clear() work before that —
 *     the picks are held in JS, and the unit pickers are seeded from them when built.
 *   - The unit pickers deliberately carry NO .nds-select-value: nds-forms skips validating
 *     any container holding one, which would silently disable required on this field.
 *   - data-step filters which minute options exist; a value off the step grid (09:07) gets
 *     its own inserted option rather than being rounded away.
 */
(() => {
    'use strict';

    const DEFAULT_FORMAT = 'HH:mm';
    const DEFAULT_STEP = 5;

    // Only used to name the unit inputs when the field itself has no id.
    let uid = 0;

    // Longest first so the alternation prefers HH over H.
    const FORMAT_TOKEN_REGEX = /(HH|H|hh|h|mm|ss|A|a)/g;
    // Both languages always accepted on input — a visitor may paste "2:30 PM"
    // into an Arabic page, and rejecting it would be theatre.
    const MERIDIEM = '(AM|PM|am|pm|ص|م)';
    // Two-digit tokens parse lenient (\d{1,2}) and format strict (padded), so
    // "9:30" is accepted under HH:mm and written back as "09:30".
    const tokenPatterns = {
        HH: '(\\d{1,2})', H: '(\\d{1,2})', hh: '(\\d{1,2})', h: '(\\d{1,2})',
        mm: '(\\d{1,2})', ss: '(\\d{1,2})', A: MERIDIEM, a: MERIDIEM
    };

    // English defaults; the assets/i18n/{lang}.json pack overrides them.
    const strings = NDS.i18n.getStrings('time-picker', {
        hour: 'Hour',
        minute: 'Minute',
        second: 'Second',
        meridiem: 'AM/PM',
        am: 'AM',
        pm: 'PM',
        toggle: 'Pick a time',
        invalid: 'Invalid time — expected format {format}',
        incomplete: 'Enter the hour and the minute',
        before_min: 'Earliest allowed time is {time}',
        after_max: 'Latest allowed time is {time}',
        required: 'This field is required',
    });

    const pad = (value) => String(value).padStart(2, '0');
    const latin = NDS.toLatinDigits;
    const isPm = (token) => /^(PM|pm|م)$/.test(token);

    // Token presence drives the panel, so the format string stays the single
    // source of truth — no data-mode, no data-12h.
    function getUnits(format) {
        const units = ['hour', 'minute'];
        if (/ss/.test(format)) units.push('second');
        if (/[Aa]/.test(format)) units.push('meridiem');
        return units;
    }

    // Seconds since midnight — the one comparable form. Bounds and the carrier
    // are always 24h whatever data-format says.
    function parseClock(text) {
        const match = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/.exec(String(text || '').trim());
        if (!match) return null;
        const hour = +match[1], minute = +match[2], second = match[3] ? +match[3] : 0;
        if (hour > 23 || minute > 59 || second > 59) return null;
        return hour * 3600 + minute * 60 + second;
    }

    const getParts = (seconds) => ({
        h24: Math.floor(seconds / 3600),
        m: Math.floor(seconds / 60) % 60,
        s: seconds % 60
    });

    function formatClock(seconds, hasSeconds) {
        const clock = getParts(seconds);
        return pad(clock.h24) + ':' + pad(clock.m) + (hasSeconds ? ':' + pad(clock.s) : '');
    }

    // The localized display string the visible input shows.
    function formatDisplay(seconds, format) {
        const clock = getParts(seconds);
        const hour12 = ((clock.h24 + 11) % 12) + 1;
        const meridiem = strings.text(clock.h24 >= 12 ? 'pm' : 'am');
        const map = {
            HH: pad(clock.h24), H: String(clock.h24), hh: pad(hour12), h: String(hour12),
            mm: pad(clock.m), ss: pad(clock.s), A: meridiem, a: meridiem.toLowerCase()
        };
        return format.replace(FORMAT_TOKEN_REGEX, (token) => map[token]);
    }

    // Per-format regex + capture order, cached. Literals between tokens are
    // escaped so a format like "hh.mm A" can't smuggle in regex syntax.
    // A Map, not an object: a format named "constructor" would hit the prototype.
    const parseCache = new Map();
    function getParseConfig(format) {
        if (parseCache.has(format)) return parseCache.get(format);
        const order = [];
        let source = '';
        let last = 0;
        for (const { 0: token, index } of format.matchAll(FORMAT_TOKEN_REGEX)) {
            source += format.slice(last, index).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            source += tokenPatterns[token];
            order.push(token);
            last = index + token.length;
        }
        source += format.slice(last).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const config = { re: new RegExp('^\\s*' + source + '\\s*$'), order };
        parseCache.set(format, config);
        return config;
    }

    // Typed text → seconds since midnight, or null. Accepts either language's
    // meridiem and unpadded numbers.
    function parseTyped(text, format) {
        const { re: pattern, order } = getParseConfig(format);
        const match = pattern.exec(String(text || ''));
        if (!match) return null;

        let hour = 0, min = 0, second = 0, meridiem = null, hour12 = false;
        order.forEach((token, i) => {
            const raw = match[i + 1];
            if (token === 'HH' || token === 'H') hour = +raw;
            else if (token === 'hh' || token === 'h') { hour = +raw; hour12 = true; }
            else if (token === 'mm') min = +raw;
            else if (token === 'ss') second = +raw;
            else meridiem = raw;
        });

        if (hour12) {
            if (hour < 1 || hour > 12) return null;
            hour = (hour % 12) + (meridiem && isPm(meridiem) ? 12 : 0);
        } else if (hour > 23) return null;
        if (min > 59 || second > 59) return null;
        return hour * 3600 + min * 60 + second;
    }

    // Any common way to write a time, whatever the field's format: "1430", "14.30", "2:30 PM",
    // "٢:٣٠ م". Reads a paste, and a typed value the format's own parse rejects.
    const LOOSE = new RegExp('^(\\d{1,2})[:.]?(\\d{2})(?:[:.](\\d{2}))?\\s*' + MERIDIEM + '?$');
    function parseLoose(text) {
        const match = LOOSE.exec(latin(text || '').trim());
        if (!match) return null;
        let hour = +match[1];
        const min = +match[2], second = match[3] ? +match[3] : 0;
        if (match[4]) {
            if (hour < 1 || hour > 12) return null;
            hour = (hour % 12) + (isPm(match[4]) ? 12 : 0);
        } else if (hour > 23) return null;
        if (min > 59 || second > 59) return null;
        return hour * 3600 + min * 60 + second;
    }

    // What the field accepts — its own format, then any common form — so a paste, a typed
    // edit, a server prefill and the error message all agree.
    const parseAny = (text, format) => parseTyped(text, format) ?? parseLoose(text);

    // The one key typed for each meridiem, in both languages.
    const meridiemKeys = { a: 'am', A: 'am', 'ص': 'am', p: 'pm', P: 'pm', 'م': 'pm' };
    // Read when used: the language can change, and its pack lands late.
    const getMeridiemWords = () => [strings.text('am'), strings.text('pm'), 'AM', 'PM', 'am', 'pm', 'ص', 'م'];

    // The format's units for NDS.typing: each takes two digits (H and h one or two), an hour's first
    // past 2 (1 on a 12h clock) and a minute's past 5 ending it; A and a are the meridiem word.
    const getTimeMask = (format) => NDS.typing.compile(format, FORMAT_TOKEN_REGEX, (token) => {
        if (/[Aa]/.test(token)) {
            return { words: getMeridiemWords, keys: meridiemKeys, label: (name) => (token === 'a' ? strings.text(name).toLowerCase() : strings.text(name)) };
        }
        const hour = /h/i.test(token), hour12 = token[0] === 'h';
        const low = hour12 ? 1 : 0, top = hour ? (hour12 ? 12 : 23) : 59;
        return { size: 2, open: token.length === 1, first: hour ? (hour12 ? 1 : 2) : 5, valid: (text) => +text >= low && +text <= top };
    });

    // Nearest still-enabled option to a value that just went out of bounds.
    function findNearestEnabled(options, current) {
        const live = Array.from(options).filter((option) => !option.disabled);
        if (!live.length) return null;
        const target = Number(current);
        if (Number.isNaN(target)) return live[0];
        return live.reduce((best, option) =>
            Math.abs(Number(option.dataset.value) - target) < Math.abs(Number(best.dataset.value) - target) ? option : best);
    }

    // Every value and label below is generated here, never consumer text — so
    // one innerHTML for the panel beats ~100 imperative appends.
    function buildOptionMarkup(value, label) {
        return '<button type="button" class="nds-btn nds-subtle nds-select-option" data-value="' + value + '">'
            +     '<span class="nds-option-text"><span class="nds-label">' + NDS.escapeHtml(label) + '</span></span>'
            +  '</button>';
    }

    // No .nds-select-value carrier on purpose — see the banner. The picks live
    // in JS; these selects are the view.
    // nds-darker: the filled form-container variant (.nds-darker in _form.scss). The units
    // sit on the panel's own surface, so a bordered field on it reads as a box in
    // a box — the filled style separates them without extra CSS.
    // The id is not decoration: a form field with neither id nor name trips HTML
    // linters, and the canonical custom-select markup carries one. It is set as a
    // property by the caller, never interpolated here — it derives from the
    // consumer's input id, which is the one value on this panel we don't author.
    // NAME stays off on purpose so only .nds-time-value submits.
    function buildUnitMarkup(unit, label, optionsHtml) {
        // The placeholder is the VISIBLE hint and has to fit a compact box, while
        // the aria-label carries the real name. "AM/PM" measured 53px inside a
        // 54px box — one font change from clipping — so the meridiem shows a
        // neutral dash. The picked value ("AM", "م") is short and fits.
        label = NDS.escapeHtml(label);
        const placeholder = unit === 'meridiem' ? '--' : label;
        return '<div class="nds-form-container nds-select nds-darker" data-time-picker-unit="' + unit + '">'
            +    '<div class="nds-form-control">'
            +      '<input type="text" class="nds-input nds-select-input" readonly'
            +        ' placeholder="' + placeholder + '" aria-label="' + label + '">'
            +      '<div class="nds-select-dropdown" hidden>'
            +        '<div class="nds-select-options">' + optionsHtml + '</div>'
            +      '</div>'
            +    '</div>'
            +  '</div>';
    }

    // A form reset goes back to the time the page shipped: the hidden carrier keeps what a script wrote.
    function resetWithForm(picker, field) {
        const initial = picker.getValue();
        NDS.field.onReset(field.form, () => {
            initial ? picker.setValue(initial) : picker.clear();
        }, { signal: picker.instanceAbortController.signal });
    }

    class NdsTimePicker {
        constructor(input, formControl) {
            // Success signal — create() gates the expando on it, so a bailed
            // construction stays eligible for a later reinit() sweep.
            this._valid = false;
            const container = formControl.closest('.nds-form-container');
            if (!container) {
                console.warn('NDS TimePicker: .nds-form-container not found');
                return;
            }

            this.elements = {
                input: input,
                formControl: formControl,
                container: container,
                carrier: container.querySelector('.nds-time-value'),
                toggleBtn: container.querySelector('.time-picker-toggle')
            };

            // Derived from the field, so the unit ids survive a panel rebuild
            // (a lang change discards and re-creates the panel).
            this._uid = input.id || ('nds-time-picker-' + (++uid));

            this._format = container.getAttribute('data-format') || DEFAULT_FORMAT;
            this._units = getUnits(this._format);
            this._hour12 = /h/.test(this._format);
            this._hasSeconds = this._units.includes('second');
            this._step = Math.min(60, Math.max(1, parseInt(container.getAttribute('data-step'), 10) || DEFAULT_STEP));
            this._min = parseClock(input.getAttribute('data-min-time'));
            this._max = parseClock(input.getAttribute('data-max-time'));

            // The picks are the source of truth and outlive the panel, which is
            // built lazily on first open.
            this._picks = { hour: null, minute: null, second: null, meridiem: null };
            this._unitElements = {};
            this.isPanelCreated = false;
            this._committing = false;

            // Scopes listeners bound to elements the instance does not own (the
            // consumer's formControl and input), so destroy() releases them in one abort.
            this.instanceAbortController = new AbortController();
            this.panelAbortController = new AbortController();

            this._addInitListeners();
            this._setupLanguageObserver();

            // Seed from whichever side the server filled in — the carrier wins,
            // since it is the unambiguous one.
            const seeded = (this.elements.carrier && this.elements.carrier.value.trim())
                ? parseClock(this.elements.carrier.value)
                : parseAny(input.value, this._format);
            if (seeded !== null && this._isInBounds(seeded, seeded)) this._adopt(seeded);
            // A pre-filled bad value stamps validity silently so it can't pass a
            // pre-open submit without painting an error on first paint. Out of range is
            // shown but not adopted, as a typed one is — else the panel's bounds would snap
            // the picks away from what the input and carrier hold. Stamped from the seed
            // itself: a lossy display (hh:mm, no meridiem) can re-parse in range.
            else if (seeded !== null) {
                input.value = formatDisplay(seeded, this._format);
                input.setCustomValidity(this._getBoundsError(seeded));
            } else if (input.value.trim()) this._validateInput(true);
            resetWithForm(this, input);

            container.setAttribute('data-nds-time-picker-initialized', '');
            this._valid = true;
        }

        // ---- open / close ----------------------------------------------

        _addInitListeners() {
            const signal = this.instanceAbortController.signal;
            const openFrom = (e) => {
                // Forms copies a readonly input to the field's state; the toggle button stays live.
                if (this.elements.input.disabled || NDS.state.has(this.elements.container, 'readonly')) return;
                if (!this.isPanelCreated) {
                    this._buildPanel();
                    this._setupDropmenu();
                }
                if (e) e.stopPropagation();
                this._dropmenu.toggle();
            };

            // The button opens the panel, so a click in the input only places the cursor.
            // Markup with no button keeps the input as the trigger.
            (this.elements.toggleBtn || this.elements.input).addEventListener('click', openFrom, { signal });

            // Fires for hand-typed edits AND our own commits. Attached on the
            // input so the validity stamp lands before forms' document-level
            // change delegation reads it.
            this.elements.input.addEventListener('change', () => {
                if (this._committing) return;
                this._readTyped();
            }, { signal });

            // Typing is shaped to the format (NDS.typing); a paste in any common form is that time,
            // committed when in bounds. The seconds, not the display: hh:mm without A drops the PM.
            let pasted = null;
            NDS.typing.addTypingListeners(this.elements.input, {
                getMask: () => getTimeMask(this._format),
                read: (text) => {
                    pasted = parseAny(text, this._format);
                    return pasted === null ? null : formatDisplay(pasted, this._format);
                },
                adopt: () => {
                    if (!this._isInBounds(pasted, pasted)) return false;
                    this._adopt(pasted);
                    return true;
                },
                signal,
                decimal: !/[Aa]/.test(this._format),
            });
        }

        // Adopt NDS.Dropmenu for the panel's open/close/escape/outside-click.
        // No click: the input and toggle drive the toggle, and a native click-toggle
        //   would fight the text caret.
        // No keys: the panel's keyboard belongs to the unit selects inside it;
        //   dropmenu's flat trigger keys would swallow typing.
        // Anchor start: the panel is content-width, and centred under a full-width
        //   field it reads as a mistake.
        _setupDropmenu() {
            const formControl = this.elements.formControl;
            this._dropmenu = NDS.Dropmenu.create(formControl, {
                menu: this.elements.panel, menuClass: 'nds-time-picker-menu', click: false, keys: false, anchor: 'start',
            });

            // Guard `e.target !== formControl`: these bubble, so the unit selects'
            // own open/close events would otherwise re-run this on every pick.
            // Panel-scoped, not instance-scoped: _setupDropmenu re-runs on every
            // language rebuild, so instance scope would stack another pair each time.
            const signal = this.panelAbortController.signal;
            formControl.addEventListener('nds:dropmenu:opened', (e) => {
                if (e.target !== formControl) return;
                NDS.state.add(this.elements.container, 'open');
                this._syncBounds();
                this._dropmenu.syncPosition();
            }, { signal });
            formControl.addEventListener('nds:dropmenu:closed', (e) => {
                if (e.target !== formControl) return;
                NDS.state.remove(this.elements.container, 'open');
            }, { signal });
        }

        // ---- panel ------------------------------------------------------

        _buildOptions(unit) {
            if (unit === 'meridiem') return buildOptionMarkup('am', strings.text('am')) + buildOptionMarkup('pm', strings.text('pm'));

            const list = [];
            if (unit === 'hour') {
                for (let hour = this._hour12 ? 1 : 0; hour <= (this._hour12 ? 12 : 23); hour++) list.push(hour);
            } else if (unit === 'minute') {
                for (let minute = 0; minute < 60; minute += this._step) list.push(minute);
            } else {
                // ponytail: seconds always step 1 — data-step is a MINUTE grid, and
                // 00/15/30/45 seconds reads as a bug. data-second-step if anyone asks.
                for (let second = 0; second < 60; second++) list.push(second);
            }
            return list.map((value) => buildOptionMarkup(value, pad(value))).join('');
        }

        _buildPanel() {
            const panel = document.createElement('div');
            panel.className = 'nds-time-picker-panel';
            panel.innerHTML = '<div class="nds-time-picker-units">'
                + this._units.map((unit) => buildUnitMarkup(unit, strings.text(unit), this._buildOptions(unit))).join('')
                + '</div>';

            // After the input, inside the same form-control — date-picker's shape.
            this.elements.input.insertAdjacentElement('afterend', panel);
            this.elements.panel = panel;

            const signal = this.panelAbortController.signal;
            this._unitElements = {};
            // Custom-select's delegated option-click listener installs in ITS init(),
            // which the loader skips when the page's only .nds-select-inputs are the
            // ones we just generated (it gates on a live querySelector). Idempotent.
            NDS.CustomSelect.init();
            this._units.forEach((unit) => {
                const el = panel.querySelector('[data-time-picker-unit="' + unit + '"]');
                this._unitElements[unit] = el;
                // Before create(): custom-select reads the input while building.
                el.querySelector('.nds-select-input').id = this._uid + '-' + unit;
                NDS.CustomSelect.create(el);
                // nds:custom-select:change fires on the form-control and does NOT
                // bubble, so it binds per unit, never on the panel.
                el.querySelector('.nds-form-control').addEventListener('nds:custom-select:change', (e) => {
                    this._handleUnitChange(unit, e.detail.value);
                }, { signal });
            });

            // Before _syncUnits: it and _syncBounds both no-op while this is false.
            this.isPanelCreated = true;
            this._syncUnits();
        }

        _removePanel() {
            Object.values(this._unitElements).forEach((el) => {
                const formControl = el && el.querySelector('.nds-form-control');
                // Each unit's dropmenu holds a document-level click listener, so
                // it is destroyed before its wrapper is discarded.
                if (formControl) NDS.CustomSelect.destroy(formControl);
            });
            this._unitElements = {};
            if (this.elements.panel) this.elements.panel.remove();
            this.elements.panel = null;
            this.isPanelCreated = false;
        }

        _getOptions(unit) {
            const formControl = this._unitElements[unit] && this._unitElements[unit].querySelector('.nds-form-control');
            if (!formControl) return [];
            return formControl.querySelectorAll('.nds-select-option');
        }

        // Suppress the re-entrant commit path for the length of one write. Saves
        // and RESTORES rather than clearing: these nest (_adopt → _syncUnits), and
        // a clear would drop an outer caller's guard mid-write — _syncInput's own
        // change event would then re-parse the display it just wrote, which under a
        // lossy format (hh:mm, no meridiem token) writes back the wrong carrier.
        _runQuietly(fn) {
            const was = this._committing;
            this._committing = true;
            try { return fn(); } finally { this._committing = was; }
        }

        // Paint the current picks onto the unit selects. Guarded so the resulting
        // change events don't each run a partial commit.
        _syncUnits() {
            if (!this.isPanelCreated) return;
            this._runQuietly(() => {
                this._units.forEach((unit) => {
                    const value = this._picks[unit];
                    if (value === null) { NDS.CustomSelect.clear(this._unitElements[unit]); return; }
                    this._ensureOption(unit, value);
                    NDS.CustomSelect.setValue(this._unitElements[unit], value);
                });
            });
            this._syncBounds();
        }

        // ---- value ------------------------------------------------------

        _handleUnitChange(unit, value) {
            this._picks[unit] = value === '' ? null : value;
            if (this._committing) return;
            this._commit();
        }

        _complete() {
            return this._units.every((unit) => this._picks[unit] !== null);
        }

        _getSeconds() {
            if (!this._complete()) return null;
            let hour = +this._picks.hour;
            if (this._hour12) hour = (hour % 12) + (this._picks.meridiem === 'pm' ? 12 : 0);
            return hour * 3600 + (+this._picks.minute) * 60 + (this._hasSeconds ? +this._picks.second : 0);
        }

        // Split the picks out of a 24h value. Used by the constructor's seed, by
        // setValue and by a typed edit — self-guarding, since every one of them
        // must suppress the change-event round trip its _syncInput would fire.
        _adopt(seconds) {
            this._runQuietly(() => {
                const clock = getParts(seconds);
                this._picks.hour = String(this._hour12 ? ((clock.h24 + 11) % 12) + 1 : clock.h24);
                this._picks.minute = String(clock.m);
                this._picks.second = String(clock.s);
                this._picks.meridiem = clock.h24 >= 12 ? 'pm' : 'am';
                this._syncUnits();
                this._syncInput();
            });
        }

        // A unit pick's write — _handleUnitChange already skipped the re-entrant ones.
        _commit() {
            this._runQuietly(() => {
                this._syncBounds();
                this._syncInput();
            });
        }

        // The one write path — a unit pick, a typed edit, setValue and clear all
        // funnel through it, so the panel, the input and the carrier cannot drift.
        _syncInput() {
            const seconds = this._getSeconds();
            const display = seconds === null ? '' : formatDisplay(seconds, this._format);
            const stable = seconds === null ? '' : formatClock(seconds, this._hasSeconds);
            const input = this.elements.input;
            const carrier = this.elements.carrier;

            // Before the events: forms' input handler reads the validity, and a stale
            // message would keep an error painted on a value that is now valid.
            this._validateInput(false, display);
            // Carrier first: the field's events then find both written.
            if (carrier && carrier.value !== stable) NDS.setValue(carrier, stable);
            if (input.value !== display) NDS.setValue(input, display);
        }

        // A hand-typed edit: parse it, adopt it, and let the panel catch up.
        _readTyped() {
            const raw = this.elements.input.value.trim();
            if (!raw) { this.clear(); return; }
            const seconds = parseAny(raw, this._format);
            if (seconds === null || !this._isInBounds(seconds, seconds)) { this._validateInput(); return; }
            this._adopt(seconds);
        }

        getValue() {
            const seconds = this._getSeconds();
            return seconds === null ? '' : formatClock(seconds, this._hasSeconds);
        }

        setValue(value) {
            const seconds = parseClock(value);
            if (seconds === null || !this._isInBounds(seconds, seconds)) return false;
            this._adopt(seconds);
            return true;
        }

        clear() {
            this._runQuietly(() => {
                this._picks = { hour: null, minute: null, second: null, meridiem: null };
                this._syncUnits();
                this._syncInput();
            });
            return true;
        }

        // A value off the step grid (a server wrote 09:07 under step 15) gets its
        // own option in sorted position rather than being rounded away.
        _ensureOption(unit, value) {
            if (unit === 'meridiem') return;
            const options = this._getOptions(unit);
            if (!options.length) return;
            if (Array.from(options).some((option) => option.dataset.value === value)) return;

            const box = options[0].parentNode;
            const btn = document.createElement('button');
            btn.type = 'button';
            // .nds-dropmenu-item too: custom-select stamps it at build, which has
            // already run by the time a late option is inserted.
            btn.className = 'nds-btn nds-subtle nds-select-option nds-dropmenu-item';
            btn.dataset.value = value;
            btn.innerHTML = '<span class="nds-option-text"><span class="nds-label">' + NDS.escapeHtml(pad(value)) + '</span></span>';
            box.insertBefore(btn, Array.from(box.children).find((child) => Number(child.dataset.value) > Number(value)) || null);
        }

        // ---- bounds -----------------------------------------------------

        _isInBounds(low, high) {
            if (this._min !== null && high < this._min) return false;
            if (this._max !== null && low > this._max) return false;
            return true;
        }

        // 24h hour implied by the current picks, or null while it is unknowable.
        _getPickedHour() {
            if (this._picks.hour === null) return null;
            if (!this._hour12) return +this._picks.hour;
            if (this._picks.meridiem === null) return null;
            return (+this._picks.hour % 12) + (this._picks.meridiem === 'pm' ? 12 : 0);
        }

        _isAllowed(unit, value) {
            if (unit === 'meridiem') {
                const base = value === 'pm' ? 12 : 0;
                return this._isInBounds(base * 3600, (base + 11) * 3600 + 3599);
            }
            if (unit === 'hour') {
                // With the meridiem unpicked an hour survives if EITHER half-day
                // fits — narrowing happens once ص/م is chosen.
                const halves = this._hour12
                    ? (this._picks.meridiem === null ? ['am', 'pm'] : [this._picks.meridiem])
                    : [null];
                return halves.some((meridiem) => {
                    const hour24 = meridiem === null ? +value : (+value % 12) + (meridiem === 'pm' ? 12 : 0);
                    return this._isInBounds(hour24 * 3600, hour24 * 3600 + 3599);
                });
            }

            const pickedHour = this._getPickedHour();
            if (pickedHour === null) return true;              // nothing to narrow against yet
            if (unit === 'minute') {
                const low = pickedHour * 3600 + (+value) * 60;
                return this._isInBounds(low, low + 59);
            }
            if (this._picks.minute === null) return true;
            const at = pickedHour * 3600 + (+this._picks.minute) * 60 + (+value);
            return this._isInBounds(at, at);
        }

        // Walks the units in order, so a narrowed hour immediately narrows the
        // minutes below it (and a narrowed minute the seconds).
        _syncBounds() {
            if (!this.isPanelCreated) return;
            if (this._min === null && this._max === null) return;

            this._units.forEach((unit) => {
                const options = this._getOptions(unit);
                options.forEach((option) => { option.disabled = !this._isAllowed(unit, option.dataset.value); });

                // A picked option that just went out of range would commit an
                // invalid time — snap to the nearest live one instead of clearing,
                // so the user keeps every other pick.
                const current = this._picks[unit];
                if (current === null) return;
                const el = Array.from(options).find((option) => option.dataset.value === current);
                if (!el || !el.disabled) return;

                const near = findNearestEnabled(options, current);
                this._picks[unit] = near ? near.dataset.value : null;
                this._runQuietly(() => {
                    if (near) NDS.CustomSelect.setValue(this._unitElements[unit], near.dataset.value);
                    else NDS.CustomSelect.clear(this._unitElements[unit]);
                });
            });
        }

        // ---- validation --------------------------------------------------

        // Constraint-validation bridge: a hand-typed value bypasses the panel's
        // disabled options, so every change stamps setCustomValidity and
        // NDS.Form.validate / checkValidity gate the submit. `silent` skips
        // the footer paint — used at construction.
        _validateInput(silent, value = this.elements.input.value) {
            const input = this.elements.input;
            const raw = value.trim();
            const message = raw ? this._getValidationError(raw) : '';
            input.setCustomValidity(message);
            if (message && !silent) {
                NDS.Form.setStatus(this.elements.container, 'error', { message: message });
            }
        }

        _getValidationError(raw) {
            const seconds = parseAny(raw, this._format);
            return seconds === null ? strings.text('invalid', { format: this._format }) : this._getBoundsError(seconds);
        }

        _getBoundsError(seconds) {
            if (this._min !== null && seconds < this._min) {
                return strings.text('before_min', { time: formatDisplay(this._min, this._format) });
            }
            if (this._max !== null && seconds > this._max) {
                return strings.text('after_max', { time: formatDisplay(this._max, this._format) });
            }
            return '';
        }

        // ---- lifecycle ---------------------------------------------------

        _setupLanguageObserver() {
            this._offLangChange = NDS.onAttributeChange('html', ['lang'], () => this._relocalize());
            // Built before the pack landed: its AM/PM went out in English.
            if (!strings.ready()) this._relocalize();
        }

        // Rewrites the localized text; waits for the language's strings first.
        _relocalize() {
            if (!strings.ready()) {
                // One wait at a time; a destroy() while waiting nulls _offLangChange and ends it.
                if (!this._langLoad) this._langLoad = strings.load().then(() => {
                    this._langLoad = null;
                    if (this._offLangChange) this._relocalize();
                });
                return;
            }
            // The panel carries localized labels throughout; rebuilding it is
            // cheaper to reason about than patching six places.
            if (this.isPanelCreated) {
                const open = NDS.state.has(this.elements.container, 'open');
                this._cleanup();
                this._buildPanel();
                this._setupDropmenu();
                if (open) this._dropmenu.open();
            }
            // Incomplete picks would write '' over what the user typed.
            if (this._complete()) this._runQuietly(() => this._syncInput());
        }

        // Per-open-cycle teardown: releases the panel's listeners and its DOM,
        // leaving the instance (and its picks) alive.
        _cleanup() {
            this.panelAbortController.abort();
            this.panelAbortController = new AbortController();
            if (this._dropmenu) {
                NDS.Dropmenu.destroy(this.elements.formControl);
                this._dropmenu = null;
            }
            this._removePanel();
        }

        destroy() {
            this.instanceAbortController.abort();
            if (this._offLangChange) {
                this._offLangChange();
                this._offLangChange = null;
            }
            this._cleanup();
            NDS.state.remove(this.elements.container, 'open');
            // Nothing is left to clear the picker's own error, so it would block submit for good.
            // Only that one: a status forms or the page set stays.
            if (this.elements.input.validity.customError) {
                this.elements.input.setCustomValidity('');
                NDS.Form.clearStatus(this.elements.container);
            }
            this.elements.container.removeAttribute('data-nds-time-picker-initialized');
            delete this.elements.input.ndsTimePicker;
        }
    }

    // ---- box mode: .nds-time-fields, an hour box and a minute box, 24h only ----

    class NdsTimePickerFields {
        constructor(group) {
            this._valid = false;
            const hour = group.querySelector('.nds-time-hour');
            const minute = group.querySelector('.nds-time-minute');
            if (!hour || !minute) {
                console.warn('NDS TimePicker: .nds-time-fields needs .nds-time-hour and .nds-time-minute');
                return;
            }
            this._elements = { container: group, hour, minute, carrier: group.querySelector('.nds-time-value') };
            this._min = parseClock(group.getAttribute('data-min-time'));
            this._max = parseClock(group.getAttribute('data-max-time'));
            this._value = '';
            this.instanceAbortController = new AbortController();
            this._addEventListeners();

            // The carrier wins, as in field mode; boxes the server filled are the fallback.
            const carrier = this._elements.carrier;
            const seeded = parseClock(carrier && carrier.value.trim() ? carrier.value : hour.value + ':' + minute.value);
            if (seeded !== null) this._adopt(seeded);
            else this._sync(true);
            resetWithForm(this, hour);

            group.setAttribute('data-nds-time-picker-initialized', '');
            this._valid = true;
        }

        _addEventListeners() {
            const { container, hour, minute } = this._elements;
            const signal = this.instanceAbortController.signal;
            const getBoxMax = (box) => (box === hour ? 23 : 59);

            [hour, minute].forEach((box) => {
                // Typing replaces the box, so a full hour never blocks the next digit.
                box.addEventListener('focus', () => box.select(), { signal });

                // maxlength cuts a paste to two characters, so it is read here, whole.
                box.addEventListener('paste', (e) => {
                    if (box.readOnly) return;
                    const seconds = parseLoose(e.clipboardData.getData('text'));
                    if (seconds === null) return;
                    e.preventDefault();
                    this._adopt(seconds);
                    minute.focus();
                }, { signal });

                box.addEventListener('input', (e) => {
                    const raw = latin(box.value);
                    let digits = raw.replace(/\D/g, '');
                    if (e.inputType === 'insertText') {
                        // A digit no second digit can follow, or a typed separator, ends the box: "9" → "09".
                        if (digits.length === 1 && (+digits > (box === hour ? 2 : 5) || (box === hour && /\D/.test(raw)))) digits = '0' + digits;
                        // A second hour digit past the clock is refused, as in field mode.
                        if (digits.length === 2 && +digits > getBoxMax(box)) digits = digits[0];
                    }
                    if (digits !== box.value) box.value = digits;
                    if (box === hour && digits.length === 2 && e.inputType === 'insertText') minute.focus();
                    this._sync(true);
                }, { signal });

                box.addEventListener('keydown', (e) => {
                    // A selection counts for the arrows, so a selected box hands over in one press.
                    const atStart = box.selectionStart === 0;
                    const atEnd = box.selectionEnd === box.value.length;
                    // Read-only (Forms copies it from the group) stops the arrows, as it stops typing.
                    if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && !box.readOnly) {
                        e.preventDefault();
                        const stepped = box.value === '' ? 0 : +box.value + (e.key === 'ArrowUp' ? 1 : -1);
                        box.value = pad((stepped + getBoxMax(box) + 1) % (getBoxMax(box) + 1));
                        box.select();
                        this._sync(true);
                    } else if (box === minute && atStart && (e.key === 'ArrowLeft' || (e.key === 'Backspace' && !box.value))) {
                        e.preventDefault();
                        hour.focus();
                        hour.setSelectionRange(hour.value.length, hour.value.length);
                    } else if (box === hour && atEnd && e.key === 'ArrowRight') {
                        e.preventDefault();
                        minute.focus();
                        minute.setSelectionRange(0, 0);
                    }
                }, { signal });
            });

            // Leaving the group pads a single digit and paints any error.
            container.addEventListener('focusout', (e) => {
                if (container.contains(e.relatedTarget)) return;
                [hour, minute].forEach((box) => { if (/^\d$/.test(box.value)) box.value = '0' + box.value; });
                this._sync(false);
            }, { signal });
        }

        _adopt(seconds) {
            const clock = getParts(seconds);
            this._elements.hour.value = pad(clock.h24);
            this._elements.minute.value = pad(clock.m);
            this._sync(true);
        }

        // The one write path: the boxes → the carrier and the validity stamp.
        _sync(silent) {
            const { container, hour, minute, carrier } = this._elements;
            const seconds = parseClock(hour.value + ':' + minute.value);
            let message = '';
            if ((hour.value || minute.value) && seconds === null) message = strings.text('incomplete');
            else if (seconds !== null && this._min !== null && seconds < this._min) message = strings.text('before_min', { time: formatClock(this._min) });
            else if (seconds !== null && this._max !== null && seconds > this._max) message = strings.text('after_max', { time: formatClock(this._max) });

            // Forms reads the hour box's stamp at submit; an out-of-range time never reaches the carrier.
            hour.setCustomValidity(message);
            const value = seconds === null || message ? '' : formatClock(seconds);
            if (value !== this._value) {
                this._value = value;
                if (carrier) NDS.setValue(carrier, value);
            }
            // An error paints on leaving the group; a fixed value clears it at once.
            if (message && !silent) NDS.Form.setStatus(container, 'error', { message: message });
            else if (!message && NDS.status.get(container) === 'error') NDS.Form.clearStatus(container);
        }

        getValue() { return this._value; }

        setValue(value) {
            const seconds = parseClock(value);
            if (seconds === null || !this._isInBounds(seconds)) return false;
            this._adopt(seconds);
            return true;
        }

        clear() {
            this._elements.hour.value = '';
            this._elements.minute.value = '';
            this._sync(true);
            return true;
        }

        _isInBounds(seconds) {
            return (this._min === null || seconds >= this._min) && (this._max === null || seconds <= this._max);
        }

        destroy() {
            this.instanceAbortController.abort();
            // As in field mode: nothing is left to clear the picker's own error.
            if (this._elements.hour.validity.customError) {
                this._elements.hour.setCustomValidity('');
                NDS.Form.clearStatus(this._elements.container);
            }
            this._elements.container.removeAttribute('data-nds-time-picker-initialized');
            delete this._elements.container.ndsTimePicker;
        }
    }

    // Consumers hold a box, the group or a wrapper around it.
    function findGroup(el) {
        if (!el || !el.closest) return null;
        if (el.querySelector && el.querySelector('.nds-time-input')) return null;
        return el.closest('.nds-time-fields') || (el.querySelector ? el.querySelector('.nds-time-fields') : null);
    }

    // Consumers hold the input, the form-control or the container.
    function findInput(el) {
        if (!el || !el.closest) return null;
        if (el.classList.contains('nds-time-input')) return el;
        return el.querySelector ? el.querySelector('.nds-time-input') : null;
    }

    function create(input, formControl) {
        const group = findGroup(input);
        if (group) {
            if (!group.ndsTimePicker) {
                const instance = new NdsTimePickerFields(group);
                if (instance._valid) group.ndsTimePicker = instance;
            }
            return group.ndsTimePicker || null;
        }
        const el = findInput(input) || (input && input.closest ? input.closest('.nds-form-container')?.querySelector('.nds-time-input') : null);
        if (!el) return null;
        if (el.ndsTimePicker) return el.ndsTimePicker;
        const resolvedFormControl = formControl || el.closest('.nds-form-control');
        if (!resolvedFormControl) {
            console.warn('NDS TimePicker: .nds-form-control not found');
            return null;
        }
        const instance = new NdsTimePicker(el, resolvedFormControl);
        if (!instance._valid) return null;
        el.ndsTimePicker = instance;
        return instance;
    }

    function init() {
        document.querySelectorAll('.nds-time-input, .nds-time-fields').forEach((el) => create(el));
    }

    const getInstance = (el) => {
        const group = findGroup(el);
        if (group) return group.ndsTimePicker || null;
        const input = findInput(el);
        return input ? input.ndsTimePicker || null : null;
    };

    // The boxes' check: NDS.validation runs it at submit, validate(el) is its public face. A field-mode
    // picker stamps setCustomValidity on its input, so the native pass covers it.
    // The picker stamps a typed error on the hour box.
    const checkField = (group) => {
        const hour = group.querySelector('.nds-time-hour');
        const carrier = group.querySelector('.nds-time-value');
        const typedError = hour ? hour.validationMessage : '';
        const empty = !typedError && !(carrier && carrier.value);
        const message = typedError || (empty && NDS.validation.isRequired(group) ? strings.text('required') : '');
        return { valid: !message, message: message, empty };
    };
    NDS.validation.addRule('.nds-form-group.nds-time-fields',
        (group) => Object.assign(checkField(group), { focus: group.querySelector('.nds-time-hour') }),
        // A pick and typing both write the boxes and dispatch input and change.
        { on: ['input', 'change'] });

    NDS.TimePicker = {
        init: init,
        reinit: init,
        validate: (el, opts) => NDS.Form.validateField(el.closest('.nds-time-fields') || el, checkField, opts),
        create: create,
        destroy: (el) => {
            const instance = getInstance(el);
            if (!instance) return false;
            instance.destroy();
            return true;
        },
        setValue: (el, value) => { const i = getInstance(el); return i ? i.setValue(value) : false; },
        getValue: (el) => { const i = getInstance(el); return i ? i.getValue() : ''; },
        clear: (el) => { const i = getInstance(el); return i ? i.clear() : false; }
    };
})();
