/* NDS.TimePicker — public surface
 * Rides: nds-dropmenu (the panel's open/close, escape, outside-click, positioning)
 *      · nds-customselect (each unit inside the panel is a stock .nds-select)
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
    const TOKEN_PATTERNS = {
        HH: '(\\d{1,2})', H: '(\\d{1,2})', hh: '(\\d{1,2})', h: '(\\d{1,2})',
        mm: '(\\d{1,2})', ss: '(\\d{1,2})', A: MERIDIEM, a: MERIDIEM
    };

    // English defaults; the assets/i18n/{lang}.json pack overrides them.
    const strings = NDS.i18n.strings('time-picker', {
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

    const pad = (n) => String(n).padStart(2, '0');
    const latin = NDS.latinDigits;
    const isPM = (token) => /^(PM|pm|م)$/.test(token);

    // Token presence drives the panel, so the format string stays the single
    // source of truth — no data-mode, no data-12h.
    function unitsFor(format) {
        const units = ['hour', 'minute'];
        if (/ss/.test(format)) units.push('second');
        if (/[Aa]/.test(format)) units.push('meridiem');
        return units;
    }

    // Seconds since midnight — the one comparable form. Bounds and the carrier
    // are always 24h whatever data-format says.
    function parse24(str) {
        const m = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/.exec(String(str || '').trim());
        if (!m) return null;
        const h = +m[1], mi = +m[2], s = m[3] ? +m[3] : 0;
        if (h > 23 || mi > 59 || s > 59) return null;
        return h * 3600 + mi * 60 + s;
    }

    const parts = (secs) => ({
        h24: Math.floor(secs / 3600),
        m: Math.floor(secs / 60) % 60,
        s: secs % 60
    });

    function format24(secs, hasSeconds) {
        const p = parts(secs);
        return pad(p.h24) + ':' + pad(p.m) + (hasSeconds ? ':' + pad(p.s) : '');
    }

    // The localized display string the visible input shows.
    function formatDisplay(secs, format) {
        const p = parts(secs);
        const h12 = ((p.h24 + 11) % 12) + 1;
        const mer = strings.text(p.h24 >= 12 ? 'pm' : 'am');
        const map = {
            HH: pad(p.h24), H: String(p.h24), hh: pad(h12), h: String(h12),
            mm: pad(p.m), ss: pad(p.s), A: mer, a: mer.toLowerCase()
        };
        return format.replace(FORMAT_TOKEN_REGEX, (t) => map[t]);
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
            source += TOKEN_PATTERNS[token];
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
        const { re, order } = getParseConfig(format);
        const m = re.exec(String(text || ''));
        if (!m) return null;

        let h = 0, min = 0, sec = 0, mer = null, hour12 = false;
        order.forEach((token, i) => {
            const raw = m[i + 1];
            if (token === 'HH' || token === 'H') h = +raw;
            else if (token === 'hh' || token === 'h') { h = +raw; hour12 = true; }
            else if (token === 'mm') min = +raw;
            else if (token === 'ss') sec = +raw;
            else mer = raw;
        });

        if (hour12) {
            if (h < 1 || h > 12) return null;
            h = (h % 12) + (mer && isPM(mer) ? 12 : 0);
        } else if (h > 23) return null;
        if (min > 59 || sec > 59) return null;
        return h * 3600 + min * 60 + sec;
    }

    // Any common way to write a time, whatever the field's format: "1430", "14.30", "2:30 PM",
    // "٢:٣٠ م". Reads a paste, and a typed value the format's own parse rejects.
    const LOOSE = new RegExp('^(\\d{1,2})[:.]?(\\d{2})(?:[:.](\\d{2}))?\\s*' + MERIDIEM + '?$');
    function parseLoose(text) {
        const m = LOOSE.exec(latin(text || '').trim());
        if (!m) return null;
        let h = +m[1];
        const min = +m[2], sec = m[3] ? +m[3] : 0;
        if (m[4]) {
            if (h < 1 || h > 12) return null;
            h = (h % 12) + (isPM(m[4]) ? 12 : 0);
        } else if (h > 23) return null;
        if (min > 59 || sec > 59) return null;
        return h * 3600 + min * 60 + sec;
    }

    // What the field accepts — its own format, then any common form — so a paste, a typed
    // edit, a server prefill and the error message all agree.
    const parseAny = (text, format) => parseTyped(text, format) ?? parseLoose(text);

    // The one key typed for each meridiem, in both languages.
    const MER_KEY = { a: 'am', A: 'am', 'ص': 'am', p: 'pm', P: 'pm', 'م': 'pm' };
    const MERIDIEM_RUNS = new RegExp('\\d+|' + MERIDIEM, 'g');

    // Typing at the end → the format's shape: digits fill the units, separators appear on
    // their own, a meridiem key fills AM/PM. A single digit is padded when no unit can start
    // with it ("9" → "09:") or when a separator follows it ("2:" → "02:"). Stops at the
    // first unit not typed yet.
    function shapeTyped(text, format, hour12) {
        const s = latin(text);
        // Digit positions that a typed separator closes.
        let digits = '';
        const closed = new Set();
        for (let k = 0; k < s.length; k++) {
            if (/\d/.test(s[k])) digits += s[k];
            else if (/\d/.test(s[k - 1])) closed.add(digits.length - 1);
        }
        // The last one: a typed "p" after a shown "AM" switches it.
        const mer = MER_KEY[[...s].reverse().find((c) => MER_KEY[c])];
        let out = '', i = 0;
        for (const piece of format.split(FORMAT_TOKEN_REGEX)) {
            if (!piece) continue;
            if (piece === 'A' || piece === 'a') {
                if (!mer) break;
                out += piece === 'a' ? strings.text(mer).toLowerCase() : strings.text(mer);
            } else if (TOKEN_PATTERNS[piece]) {
                if (i >= digits.length) break;
                const maxFirst = /^[Hh]/.test(piece) ? (hour12 ? 1 : 2) : 5;
                let unit = +digits[i] > maxFirst || closed.has(i) ? '0' + digits[i++] : digits.slice(i, i += 2);
                // A second hour digit past the clock ("25", or "13"/"00" under 12h) is refused.
                if (unit.length === 2 && maxFirst < 5 && (hour12 ? +unit < 1 || +unit > 12 : +unit > 23)) unit = unit[0];
                out += unit;
                if (unit.length < 2) break;
            } else {
                out += piece;
            }
        }
        return out;
    }

    // Typing inside a shown value types over it, as a native time field does: the digit
    // replaces the one at the caret, the caret steps over separators, and a digit that
    // makes an impossible unit is refused, as at the end. Returns { value, caret } or null.
    function typeOver(value, pos, ch, format, hour12) {
        ch = latin(ch);
        const kinds = format.match(/HH|H|hh|h|mm|ss/g) || [];
        let n = 0;
        // Digit runs are the units, in the format's order; a meridiem word is the meridiem.
        // Only the words: any other separator ("." in hh.mm) is stepped over, not a run.
        const runs = [...value.matchAll(MERIDIEM_RUNS)].map((m) => ({
            start: m.index, end: m.index + m[0].length, text: m[0],
            kind: /\d/.test(m[0]) ? (kinds[n++] || 'mm')[0].toLowerCase() : 'a',
        }));
        const i = runs.findIndex((r) => r.end > pos);
        // Past the last unit: the same shaping as typing at the end.
        if (i < 0) return { value: shapeTyped(value + ch, format, hour12), caret: null };
        const run = runs[i];
        const set = (text, caret) => ({ value: value.slice(0, run.start) + text + value.slice(run.end), caret });
        if (MER_KEY[ch]) {
            const mer = runs.find((r) => r.kind === 'a');
            if (!mer) return null;
            const label = strings.text(MER_KEY[ch]);
            const text = format.split(FORMAT_TOKEN_REGEX).includes('a') ? label.toLowerCase() : label;
            return { value: value.slice(0, mer.start) + text + value.slice(mer.end), caret: pos };
        }
        // A typed separator steps over the one at the caret; any other key is refused.
        if (!/^\d$/.test(ch) || run.kind === 'a') return value[pos] === ch ? { value, caret: pos + 1 } : null;

        const hour = run.kind === 'h';
        const ok = (s) => +s >= (hour && hour12 ? 1 : 0) && +s <= (hour ? (hour12 ? 12 : 23) : 59);
        const next = runs[i + 1] ? runs[i + 1].start : value.length;
        const k = Math.max(0, pos - run.start);
        const text = run.text.slice(0, k) + ch + run.text.slice(k + 1);
        if (k === 0 && run.text.length === 2 && !ok(text)) {
            // No second digit can follow ("9" → "09"), or the old one can't: take the lowest that can ("29" → "20").
            if (+ch > (hour ? (hour12 ? 1 : 2) : 5)) return set('0' + ch, next);
            return set(ch + [...'0123456789'].find((s) => ok(ch + s)), run.start + 1);
        }
        if (!ok(text)) return null;
        return set(text, k >= text.length - 1 ? next : run.start + k + 1);
    }

    // Nearest still-enabled option to a value that just went out of bounds.
    function nearestEnabled(options, current) {
        const live = Array.from(options).filter((o) => !o.disabled);
        if (!live.length) return null;
        const c = Number(current);
        if (Number.isNaN(c)) return live[0];
        return live.reduce((best, o) =>
            Math.abs(Number(o.dataset.value) - c) < Math.abs(Number(best.dataset.value) - c) ? o : best);
    }

    // Every value and label below is generated here, never consumer text — so
    // one innerHTML for the panel beats ~100 imperative appends.
    function optionMarkup(value, label) {
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
    function unitMarkup(unit, label, optionsHTML) {
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
            +        '<div class="nds-select-options">' + optionsHTML + '</div>'
            +      '</div>'
            +    '</div>'
            +  '</div>';
    }

    // A form reset goes back to the time the page shipped: the hidden carrier keeps what a script wrote.
    function resetWithForm(picker, field) {
        const initial = picker.getValue();
        field.form?.addEventListener('reset', (e) => setTimeout(() => {
            if (!e.defaultPrevented) initial ? picker.setValue(initial) : picker.clear();
        }), { signal: picker.instanceAbortController.signal });
    }

    class TimePicker {
        constructor(input, formControl) {
            // Success signal — create() gates the expando on it, so a bailed
            // construction stays eligible for a later reinit() sweep.
            this.valid = false;
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
            this.uid = input.id || ('nds-time-picker-' + (++uid));

            this.format = container.getAttribute('data-format') || DEFAULT_FORMAT;
            this.units = unitsFor(this.format);
            this.hour12 = /h/.test(this.format);
            this.hasSeconds = this.units.includes('second');
            this.step = Math.min(60, Math.max(1, parseInt(container.getAttribute('data-step'), 10) || DEFAULT_STEP));
            this.min = parse24(input.getAttribute('data-min-time'));
            this.max = parse24(input.getAttribute('data-max-time'));

            // The picks are the source of truth and outlive the panel, which is
            // built lazily on first open.
            this.picks = { hour: null, minute: null, second: null, meridiem: null };
            this.unitEls = {};
            this.isPanelCreated = false;
            this._committing = false;

            // Scopes listeners bound to elements the instance does not own (the
            // consumer's formControl and input), so destroy() releases them in one abort.
            this.instanceAbortController = new AbortController();
            this.panelAbortController = new AbortController();

            this.bindInitEvents();
            this.setupLanguageObserver();

            // Seed from whichever side the server filled in — the carrier wins,
            // since it is the unambiguous one.
            const seeded = (this.elements.carrier && this.elements.carrier.value.trim())
                ? parse24(this.elements.carrier.value)
                : parseAny(input.value, this.format);
            if (seeded !== null && this._inBounds(seeded, seeded)) this._adopt(seeded);
            // A pre-filled bad value stamps validity silently so it can't pass a
            // pre-open submit without painting an error on first paint. Out of range is
            // shown but not adopted, as a typed one is — else the panel's bounds would snap
            // the picks away from what the input and carrier hold. Stamped from the seed
            // itself: a lossy display (hh:mm, no meridiem) can re-parse in range.
            else if (seeded !== null) {
                input.value = formatDisplay(seeded, this.format);
                input.setCustomValidity(this._boundsError(seeded));
            } else if (input.value.trim()) this._validateInput(true);
            resetWithForm(this, input);

            container.setAttribute('data-nds-time-picker-initialized', '');
            this.valid = true;
        }

        // ---- open / close ----------------------------------------------

        bindInitEvents() {
            const signal = this.instanceAbortController.signal;
            const openFrom = (e) => {
                // Forms copies a readonly input to the field's state; the toggle button stays live.
                if (this.elements.input.disabled || NDS.state.has(this.elements.container, 'readonly')) return;
                if (!this.isPanelCreated) {
                    this.createPanelDOM();
                    this.setupDropmenu();
                }
                if (e) e.stopPropagation();
                this.dropmenuInstance.toggle();
            };

            // The button opens the panel, so a click in the input only places the cursor.
            // Markup with no button keeps the input as the trigger.
            (this.elements.toggleBtn || this.elements.input).addEventListener('click', openFrom, { signal });

            // Fires for hand-typed edits AND our own commits. Attached on the
            // input so the validity stamp lands before forms' document-level
            // change delegation reads it.
            this.elements.input.addEventListener('change', () => {
                this._shaped = false;
                if (this._committing) return;
                this.readTyped();
            }, { signal });

            // Typing at the end is shaped; typing inside the value types over it (typeOver).
            // A delete keeps what the user wrote, so Backspace can remove an added separator.
            const input = this.elements.input;
            // decimal, not numeric: its keypad has a separator key, and forms blocks non-digits under numeric.
            if (!/[Aa]/.test(this.format) && !input.hasAttribute('inputmode')) {
                input.inputMode = 'decimal';
                this._ownInputMode = true;
            }
            input.addEventListener('input', (e) => {
                // A pasted time in any common form commits at once, in the field's format.
                if (e.inputType === 'insertFromPaste') {
                    const secs = parseAny(input.value, this.format);
                    if (secs !== null && this._inBounds(secs, secs)) this._adopt(secs);
                    return;
                }
                if (e.inputType !== 'insertText' || e.isComposing || input.selectionEnd !== input.value.length) return;
                const shaped = shapeTyped(input.value, this.format, this.hour12);
                if (shaped !== input.value) { input.value = shaped; this._shaped = true; }
            }, { signal });
            input.addEventListener('beforeinput', (e) => {
                if (e.inputType !== 'insertText' || e.isComposing || !e.data
                    || input.selectionEnd >= input.value.length) return;
                e.preventDefault();
                let value = input.value, caret = input.selectionStart;
                for (const ch of e.data) {
                    const r = typeOver(value, caret, ch, this.format, this.hour12);
                    if (!r) break;
                    value = r.value;
                    caret = r.caret ?? value.length;
                }
                if (value !== input.value) {
                    this._shaped = true;
                    // No inputType, so the shaping handler above skips it; Forms still hears it.
                    NDS.setValue(input, value, { change: false });
                }
                input.setSelectionRange(caret, caret);
            }, { signal });
            // WebKit sends no change on blur when a script wrote the last edit: send it here.
            input.addEventListener('blur', () => {
                if (this._shaped) input.dispatchEvent(new Event('change', { bubbles: true }));
            }, { signal });
        }

        // Adopt NDSDropmenu for the panel's open/close/escape/outside-click.
        // No click: the input and toggle drive the toggle, and a native click-toggle
        //   would fight the text caret.
        // No keys: the panel's keyboard belongs to the unit selects inside it;
        //   dropmenu's flat trigger keys would swallow typing.
        // Anchor start: the panel is content-width, and centred under a full-width
        //   field it reads as a mistake.
        setupDropmenu() {
            const formControl = this.elements.formControl;
            this.dropmenuInstance = NDS.Dropmenu.create(formControl, {
                menu: this.elements.panel, menuClass: 'nds-time-picker-menu', click: false, keys: false, anchor: 'start',
            });

            // Guard `e.target !== formControl`: these bubble, so the unit selects'
            // own open/close events would otherwise re-run this on every pick.
            // Panel-scoped, not instance-scoped: setupDropmenu re-runs on every
            // language rebuild, so instance scope would stack another pair each time.
            const signal = this.panelAbortController.signal;
            formControl.addEventListener('nds:dropmenu:opened', (e) => {
                if (e.target !== formControl) return;
                NDS.state.add(this.elements.container, 'open');
                this.applyBounds();
                this.dropmenuInstance.applyPosition();
            }, { signal });
            formControl.addEventListener('nds:dropmenu:closed', (e) => {
                if (e.target !== formControl) return;
                NDS.state.remove(this.elements.container, 'open');
            }, { signal });
        }

        // ---- panel ------------------------------------------------------

        optionsFor(unit) {
            if (unit === 'meridiem') return optionMarkup('am', strings.text('am')) + optionMarkup('pm', strings.text('pm'));

            const list = [];
            if (unit === 'hour') {
                for (let h = this.hour12 ? 1 : 0; h <= (this.hour12 ? 12 : 23); h++) list.push(h);
            } else if (unit === 'minute') {
                for (let m = 0; m < 60; m += this.step) list.push(m);
            } else {
                // ponytail: seconds always step 1 — data-step is a MINUTE grid, and
                // 00/15/30/45 seconds reads as a bug. data-second-step if anyone asks.
                for (let s = 0; s < 60; s++) list.push(s);
            }
            return list.map((n) => optionMarkup(n, pad(n))).join('');
        }

        createPanelDOM() {
            const panel = document.createElement('div');
            panel.className = 'nds-time-picker-panel';
            panel.innerHTML = '<div class="nds-time-picker-units">'
                + this.units.map((u) => unitMarkup(u, strings.text(u), this.optionsFor(u))).join('')
                + '</div>';

            // After the input, inside the same form-control — date-picker's shape.
            this.elements.input.insertAdjacentElement('afterend', panel);
            this.elements.panel = panel;

            const signal = this.panelAbortController.signal;
            this.unitEls = {};
            // Custom-select's delegated option-click listener installs in ITS init(),
            // which the loader skips when the page's only .nds-select-inputs are the
            // ones we just generated (it gates on a live querySelector). Idempotent.
            NDS.CustomSelect.init();
            this.units.forEach((u) => {
                const el = panel.querySelector('[data-time-picker-unit="' + u + '"]');
                this.unitEls[u] = el;
                // Before create(): custom-select reads the input while building.
                el.querySelector('.nds-select-input').id = this.uid + '-' + u;
                NDS.CustomSelect.create(el);
                // nds:custom-select:change fires on the form-control and does NOT
                // bubble, so it binds per unit, never on the panel.
                el.querySelector('.nds-form-control').addEventListener('nds:custom-select:change', (e) => {
                    this.onUnitChange(u, e.detail.value);
                }, { signal });
            });

            // Before syncUnits: it and applyBounds both no-op while this is false.
            this.isPanelCreated = true;
            this.syncUnits();
        }

        removePanelDOM() {
            Object.values(this.unitEls).forEach((el) => {
                const fc = el && el.querySelector('.nds-form-control');
                // Each unit's dropmenu holds a document-level click listener, so
                // it is destroyed before its wrapper is discarded.
                if (fc) NDS.CustomSelect.destroy(fc);
            });
            this.unitEls = {};
            if (this.elements.panel) this.elements.panel.remove();
            this.elements.panel = null;
            this.isPanelCreated = false;
        }

        _optionsOf(unit) {
            const fc = this.unitEls[unit] && this.unitEls[unit].querySelector('.nds-form-control');
            if (!fc) return [];
            return fc.querySelectorAll('.nds-select-option');
        }

        // Suppress the re-entrant commit path for the length of one write. Saves
        // and RESTORES rather than clearing: these nest (_adopt → syncUnits), and
        // a clear would drop an outer caller's guard mid-write — updateInput's own
        // change event would then re-parse the display it just wrote, which under a
        // lossy format (hh:mm, no meridiem token) writes back the wrong carrier.
        _quiet(fn) {
            const was = this._committing;
            this._committing = true;
            try { return fn(); } finally { this._committing = was; }
        }

        // Paint the current picks onto the unit selects. Guarded so the resulting
        // change events don't each run a partial commit.
        syncUnits() {
            if (!this.isPanelCreated) return;
            this._quiet(() => {
                this.units.forEach((u) => {
                    const value = this.picks[u];
                    if (value === null) { NDS.CustomSelect.clear(this.unitEls[u]); return; }
                    this._ensureOption(u, value);
                    NDS.CustomSelect.setValue(this.unitEls[u], value);
                });
            });
            this.applyBounds();
        }

        // ---- value ------------------------------------------------------

        onUnitChange(unit, value) {
            this.picks[unit] = value === '' ? null : value;
            if (this._committing) return;
            this.commit();
        }

        _complete() {
            return this.units.every((u) => this.picks[u] !== null);
        }

        _seconds() {
            if (!this._complete()) return null;
            let h = +this.picks.hour;
            if (this.hour12) h = (h % 12) + (this.picks.meridiem === 'pm' ? 12 : 0);
            return h * 3600 + (+this.picks.minute) * 60 + (this.hasSeconds ? +this.picks.second : 0);
        }

        // Split the picks out of a 24h value. Used by the constructor's seed, by
        // setValue and by a typed edit — self-guarding, since every one of them
        // must suppress the change-event round trip its updateInput would fire.
        _adopt(secs) {
            this._quiet(() => {
                const p = parts(secs);
                this.picks.hour = String(this.hour12 ? ((p.h24 + 11) % 12) + 1 : p.h24);
                this.picks.minute = String(p.m);
                this.picks.second = String(p.s);
                this.picks.meridiem = p.h24 >= 12 ? 'pm' : 'am';
                this.syncUnits();
                this.updateInput();
            });
        }

        // A unit pick's write — onUnitChange already skipped the re-entrant ones.
        commit() {
            this._quiet(() => {
                this.applyBounds();
                this.updateInput();
            });
        }

        // The one write path — a unit pick, a typed edit, setValue and clear all
        // funnel through it, so the panel, the input and the carrier cannot drift.
        updateInput() {
            const secs = this._seconds();
            const display = secs === null ? '' : formatDisplay(secs, this.format);
            const stable = secs === null ? '' : format24(secs, this.hasSeconds);
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
        readTyped() {
            const raw = this.elements.input.value.trim();
            if (!raw) { this.clear(); return; }
            const secs = parseAny(raw, this.format);
            if (secs === null || !this._inBounds(secs, secs)) { this._validateInput(); return; }
            this._adopt(secs);
        }

        getValue() {
            const secs = this._seconds();
            return secs === null ? '' : format24(secs, this.hasSeconds);
        }

        setValue(value) {
            const secs = parse24(value);
            if (secs === null || !this._inBounds(secs, secs)) return false;
            this._adopt(secs);
            return true;
        }

        clear() {
            this._quiet(() => {
                this.picks = { hour: null, minute: null, second: null, meridiem: null };
                this.syncUnits();
                this.updateInput();
            });
            return true;
        }

        // A value off the step grid (a server wrote 09:07 under step 15) gets its
        // own option in sorted position rather than being rounded away.
        _ensureOption(unit, value) {
            if (unit === 'meridiem') return;
            const options = this._optionsOf(unit);
            if (!options.length) return;
            if (Array.from(options).some((o) => o.dataset.value === value)) return;

            const box = options[0].parentNode;
            const btn = document.createElement('button');
            btn.type = 'button';
            // .nds-dropmenu-item too: custom-select stamps it at build, which has
            // already run by the time a late option is inserted.
            btn.className = 'nds-btn nds-subtle nds-select-option nds-dropmenu-item';
            btn.dataset.value = value;
            btn.innerHTML = '<span class="nds-option-text"><span class="nds-label">' + NDS.escapeHtml(pad(value)) + '</span></span>';
            box.insertBefore(btn, Array.from(box.children).find((o) => Number(o.dataset.value) > Number(value)) || null);
        }

        // ---- bounds -----------------------------------------------------

        _inBounds(lo, hi) {
            if (this.min !== null && hi < this.min) return false;
            if (this.max !== null && lo > this.max) return false;
            return true;
        }

        // 24h hour implied by the current picks, or null while it is unknowable.
        _pickedHour() {
            if (this.picks.hour === null) return null;
            if (!this.hour12) return +this.picks.hour;
            if (this.picks.meridiem === null) return null;
            return (+this.picks.hour % 12) + (this.picks.meridiem === 'pm' ? 12 : 0);
        }

        _allowed(unit, value) {
            if (unit === 'meridiem') {
                const base = value === 'pm' ? 12 : 0;
                return this._inBounds(base * 3600, (base + 11) * 3600 + 3599);
            }
            if (unit === 'hour') {
                // With the meridiem unpicked an hour survives if EITHER half-day
                // fits — narrowing happens once ص/م is chosen.
                const halves = this.hour12
                    ? (this.picks.meridiem === null ? ['am', 'pm'] : [this.picks.meridiem])
                    : [null];
                return halves.some((mer) => {
                    const h = mer === null ? +value : (+value % 12) + (mer === 'pm' ? 12 : 0);
                    return this._inBounds(h * 3600, h * 3600 + 3599);
                });
            }

            const h = this._pickedHour();
            if (h === null) return true;              // nothing to narrow against yet
            if (unit === 'minute') {
                const lo = h * 3600 + (+value) * 60;
                return this._inBounds(lo, lo + 59);
            }
            if (this.picks.minute === null) return true;
            const at = h * 3600 + (+this.picks.minute) * 60 + (+value);
            return this._inBounds(at, at);
        }

        // Walks the units in order, so a narrowed hour immediately narrows the
        // minutes below it (and a narrowed minute the seconds).
        applyBounds() {
            if (!this.isPanelCreated) return;
            if (this.min === null && this.max === null) return;

            this.units.forEach((u) => {
                const options = this._optionsOf(u);
                options.forEach((o) => { o.disabled = !this._allowed(u, o.dataset.value); });

                // A picked option that just went out of range would commit an
                // invalid time — snap to the nearest live one instead of clearing,
                // so the user keeps every other pick.
                const current = this.picks[u];
                if (current === null) return;
                const el = Array.from(options).find((o) => o.dataset.value === current);
                if (!el || !el.disabled) return;

                const near = nearestEnabled(options, current);
                this.picks[u] = near ? near.dataset.value : null;
                this._quiet(() => {
                    if (near) NDS.CustomSelect.setValue(this.unitEls[u], near.dataset.value);
                    else NDS.CustomSelect.clear(this.unitEls[u]);
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
            const msg = raw ? this._validationError(raw) : '';
            input.setCustomValidity(msg);
            if (msg && !silent) {
                NDS.Form.setStatus(this.elements.container, 'error', { message: msg });
            }
        }

        _validationError(raw) {
            const secs = parseAny(raw, this.format);
            return secs === null ? strings.text('invalid', { format: this.format }) : this._boundsError(secs);
        }

        _boundsError(secs) {
            if (this.min !== null && secs < this.min) {
                return strings.text('before_min', { time: formatDisplay(this.min, this.format) });
            }
            if (this.max !== null && secs > this.max) {
                return strings.text('after_max', { time: formatDisplay(this.max, this.format) });
            }
            return '';
        }

        // ---- lifecycle ---------------------------------------------------

        setupLanguageObserver() {
            this._offLangChange = NDS.onAttrChange('html', ['lang'], () => this._relocalize());
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
                this.cleanup();
                this.createPanelDOM();
                this.setupDropmenu();
                if (open) this.dropmenuInstance.open();
            }
            // Incomplete picks would write '' over what the user typed.
            if (this._complete()) this._quiet(() => this.updateInput());
        }

        // Per-open-cycle teardown: releases the panel's listeners and its DOM,
        // leaving the instance (and its picks) alive.
        cleanup() {
            this.panelAbortController.abort();
            this.panelAbortController = new AbortController();
            if (this.dropmenuInstance) {
                NDS.Dropmenu.destroy(this.elements.formControl);
                this.dropmenuInstance = null;
            }
            this.removePanelDOM();
        }

        destroy() {
            this.instanceAbortController.abort();
            if (this._offLangChange) {
                this._offLangChange();
                this._offLangChange = null;
            }
            this.cleanup();
            if (this._ownInputMode) this.elements.input.removeAttribute('inputmode');
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

    class TimeFields {
        constructor(group) {
            this.valid = false;
            const hour = group.querySelector('.nds-time-hour');
            const minute = group.querySelector('.nds-time-minute');
            if (!hour || !minute) {
                console.warn('NDS TimePicker: .nds-time-fields needs .nds-time-hour and .nds-time-minute');
                return;
            }
            this.elements = { container: group, hour, minute, carrier: group.querySelector('.nds-time-value') };
            this.min = parse24(group.getAttribute('data-min-time'));
            this.max = parse24(group.getAttribute('data-max-time'));
            this.value = '';
            this.instanceAbortController = new AbortController();
            this.bindEvents();

            // The carrier wins, as in field mode; boxes the server filled are the fallback.
            const carrier = this.elements.carrier;
            const seeded = parse24(carrier && carrier.value.trim() ? carrier.value : hour.value + ':' + minute.value);
            if (seeded !== null) this._adopt(seeded);
            else this._sync(true);
            resetWithForm(this, hour);

            group.setAttribute('data-nds-time-picker-initialized', '');
            this.valid = true;
        }

        bindEvents() {
            const { container, hour, minute } = this.elements;
            const signal = this.instanceAbortController.signal;
            const max = (box) => (box === hour ? 23 : 59);

            [hour, minute].forEach((box) => {
                // Typing replaces the box, so a full hour never blocks the next digit.
                box.addEventListener('focus', () => box.select(), { signal });

                // maxlength cuts a paste to two characters, so it is read here, whole.
                box.addEventListener('paste', (e) => {
                    if (box.readOnly) return;
                    const secs = parseLoose(e.clipboardData.getData('text'));
                    if (secs === null) return;
                    e.preventDefault();
                    this._adopt(secs);
                    minute.focus();
                }, { signal });

                box.addEventListener('input', (e) => {
                    const raw = latin(box.value);
                    let d = raw.replace(/\D/g, '');
                    if (e.inputType === 'insertText') {
                        // A digit no second digit can follow, or a typed separator, ends the box: "9" → "09".
                        if (d.length === 1 && (+d > (box === hour ? 2 : 5) || (box === hour && /\D/.test(raw)))) d = '0' + d;
                        // A second hour digit past the clock is refused, as in field mode.
                        if (d.length === 2 && +d > max(box)) d = d[0];
                    }
                    if (d !== box.value) box.value = d;
                    if (box === hour && d.length === 2 && e.inputType === 'insertText') minute.focus();
                    this._sync(true);
                }, { signal });

                box.addEventListener('keydown', (e) => {
                    // A selection counts for the arrows, so a selected box hands over in one press.
                    const atStart = box.selectionStart === 0;
                    const atEnd = box.selectionEnd === box.value.length;
                    // Read-only (Forms copies it from the group) stops the arrows, as it stops typing.
                    if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && !box.readOnly) {
                        e.preventDefault();
                        const n = box.value === '' ? 0 : +box.value + (e.key === 'ArrowUp' ? 1 : -1);
                        box.value = pad((n + max(box) + 1) % (max(box) + 1));
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

        _adopt(secs) {
            const p = parts(secs);
            this.elements.hour.value = pad(p.h24);
            this.elements.minute.value = pad(p.m);
            this._sync(true);
        }

        // The one write path: the boxes → the carrier and the validity stamp.
        _sync(silent) {
            const { container, hour, minute, carrier } = this.elements;
            const secs = parse24(hour.value + ':' + minute.value);
            let msg = '';
            if ((hour.value || minute.value) && secs === null) msg = strings.text('incomplete');
            else if (secs !== null && this.min !== null && secs < this.min) msg = strings.text('before_min', { time: format24(this.min) });
            else if (secs !== null && this.max !== null && secs > this.max) msg = strings.text('after_max', { time: format24(this.max) });

            // Forms reads the hour box's stamp at submit; an out-of-range time never reaches the carrier.
            hour.setCustomValidity(msg);
            const value = secs === null || msg ? '' : format24(secs);
            if (value !== this.value) {
                this.value = value;
                if (carrier) NDS.setValue(carrier, value);
            }
            // An error paints on leaving the group; a fixed value clears it at once.
            if (msg && !silent) NDS.Form.setStatus(container, 'error', { message: msg });
            else if (!msg && NDS.status.get(container) === 'error') NDS.Form.clearStatus(container);
        }

        getValue() { return this.value; }

        setValue(value) {
            const secs = parse24(value);
            if (secs === null || !this._inBounds(secs)) return false;
            this._adopt(secs);
            return true;
        }

        clear() {
            this.elements.hour.value = '';
            this.elements.minute.value = '';
            this._sync(true);
            return true;
        }

        _inBounds(secs) {
            return (this.min === null || secs >= this.min) && (this.max === null || secs <= this.max);
        }

        destroy() {
            this.instanceAbortController.abort();
            // As in field mode: nothing is left to clear the picker's own error.
            if (this.elements.hour.validity.customError) {
                this.elements.hour.setCustomValidity('');
                NDS.Form.clearStatus(this.elements.container);
            }
            this.elements.container.removeAttribute('data-nds-time-picker-initialized');
            delete this.elements.container.ndsTimePicker;
        }
    }

    // Consumers hold a box, the group or a wrapper around it.
    function groupOf(el) {
        if (!el || !el.closest) return null;
        if (el.querySelector && el.querySelector('.nds-time-input')) return null;
        return el.closest('.nds-time-fields') || (el.querySelector ? el.querySelector('.nds-time-fields') : null);
    }

    // Consumers hold the input, the form-control or the container.
    function inputOf(el) {
        if (!el || !el.closest) return null;
        if (el.classList.contains('nds-time-input')) return el;
        return el.querySelector ? el.querySelector('.nds-time-input') : null;
    }

    function create(input, formControl) {
        const group = groupOf(input);
        if (group) {
            if (!group.ndsTimePicker) {
                const instance = new TimeFields(group);
                if (instance.valid) group.ndsTimePicker = instance;
            }
            return group.ndsTimePicker || null;
        }
        const el = inputOf(input) || (input && input.closest ? input.closest('.nds-form-container')?.querySelector('.nds-time-input') : null);
        if (!el) return null;
        if (el.ndsTimePicker) return el.ndsTimePicker;
        const fc = formControl || el.closest('.nds-form-control');
        if (!fc) {
            console.warn('NDS TimePicker: .nds-form-control not found');
            return null;
        }
        const instance = new TimePicker(el, fc);
        if (!instance.valid) return null;
        el.ndsTimePicker = instance;
        return instance;
    }

    function init() {
        document.querySelectorAll('.nds-time-input, .nds-time-fields').forEach((el) => create(el));
    }

    const instanceOf = (el) => {
        const group = groupOf(el);
        if (group) return group.ndsTimePicker || null;
        const input = inputOf(el);
        return input ? input.ndsTimePicker || null : null;
    };

    // The boxes' check: NDS.validation runs it at submit, validate(el) is its public face. A field-mode
    // picker stamps setCustomValidity on its input, so the native pass covers it.
    // The picker stamps a typed error on the hour box.
    const fieldCheck = (group) => {
        const hour = group.querySelector('.nds-time-hour');
        const carrier = group.querySelector('.nds-time-value');
        const typedError = hour ? hour.validationMessage : '';
        const empty = !typedError && !(carrier && carrier.value);
        const msg = typedError || (empty && NDS.validation.isRequired(group) ? strings.text('required') : '');
        return { valid: !msg, message: msg, empty };
    };
    NDS.validation.addRule('.nds-form-group.nds-time-fields',
        (group) => Object.assign(fieldCheck(group), { focus: group.querySelector('.nds-time-hour') }),
        // A pick and typing both write the boxes and dispatch input and change.
        { on: ['input', 'change'] });

    NDS.TimePicker = {
        init: init,
        reinit: init,
        validate: (el, opts) => NDS.Form.validateField(el.closest('.nds-time-fields') || el, opts, fieldCheck),
        create: create,
        destroy: (el) => {
            const instance = instanceOf(el);
            if (!instance) return false;
            instance.destroy();
            return true;
        },
        setValue: (el, value) => { const i = instanceOf(el); return i ? i.setValue(value) : false; },
        getValue: (el) => { const i = instanceOf(el); return i ? i.getValue() : ''; },
        clear: (el) => { const i = instanceOf(el); return i ? i.clear() : false; }
    };
})();
