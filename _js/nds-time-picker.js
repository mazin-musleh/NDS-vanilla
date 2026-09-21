/* NDS.TimePicker — public surface
 * Rides: nds-dropmenu (the panel's open/close, escape, outside-click, positioning)
 *      · nds-customselect (each unit inside the panel is a stock .nds-select)
 *      · nds-forms (invalid-value status message under the field; soft)
 * Methods:
 *   NDS.TimePicker.init() / .reinit()           attach a picker to every .nds-time-input
 *   NDS.TimePicker.create(input, formControl)   build/return one instance — idempotent,
 *                                               null on bad markup; formControl is optional
 *   NDS.TimePicker.setValue(el, '14:30')        commit a 24h value — false when unparsable
 *                                               or outside data-min-time/data-max-time
 *   NDS.TimePicker.getValue(el)                 the 24h value, '' until the time is complete
 *   NDS.TimePicker.clear(el)                    empty the field and every unit
 *   NDS.TimePicker.TimePicker                   the instance prototype (extension use)
 * Events:
 *   (none — a pick writes the input and dispatches native input + change; listen on the input)
 * Hooks:
 *   on the .nds-form-container:  data-format (HH H hh h mm ss A a — sets the display AND
 *                                which unit pickers the panel holds) · data-step (minute
 *                                step) · data-required
 *   on the .nds-time-input:      data-min-time · data-max-time (24h HH:mm[:ss], always)
 * Gotchas:
 *   - The visible input is DISPLAY ("02:30 م") and is typeable; the hidden .nds-time-value
 *     carries the stable 24h string and is the one that submits. Read getValue().
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
    let _uid = 0;

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

    const LABELS = {
        ar: { hour: 'ساعة', minute: 'دقيقة', second: 'ثانية', meridiem: 'ص/م', am: 'ص', pm: 'م',
              toggle: 'اختيار الوقت' },
        en: { hour: 'Hour', minute: 'Minute', second: 'Second', meridiem: 'AM/PM', am: 'AM', pm: 'PM',
              toggle: 'Pick a time' }
    };
    const MESSAGES = {
        ar: { invalid: 'وقت غير صالح — الصيغة المطلوبة {format}',
              beforeMin: 'أقرب وقت متاح {time}', afterMax: 'آخر وقت متاح {time}' },
        en: { invalid: 'Invalid time — expected format {format}',
              beforeMin: 'Earliest allowed time is {time}', afterMax: 'Latest allowed time is {time}' }
    };

    const pad = (n) => String(n).padStart(2, '0');
    const labels = () => LABELS[NDS.langKey] || LABELS.en;
    const messages = () => MESSAGES[NDS.langKey] || MESSAGES.en;
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
        const L = labels();
        const h12 = ((p.h24 + 11) % 12) + 1;
        const mer = p.h24 >= 12 ? L.pm : L.am;
        const map = {
            HH: pad(p.h24), H: String(p.h24), hh: pad(h12), h: String(h12),
            mm: pad(p.m), ss: pad(p.s), A: mer, a: mer.toLowerCase()
        };
        return format.replace(FORMAT_TOKEN_REGEX, (t) => map[t]);
    }

    // Per-format regex + capture order, cached. Literals between tokens are
    // escaped so a format like "hh.mm A" can't smuggle in regex syntax.
    const _parseCache = {};
    function getParseConfig(format) {
        if (_parseCache[format]) return _parseCache[format];
        const order = [];
        let source = '';
        let last = 0;
        format.replace(FORMAT_TOKEN_REGEX, (token, _g, index) => {
            source += format.slice(last, index).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            source += TOKEN_PATTERNS[token];
            order.push(token);
            last = index + token.length;
            return token;
        });
        source += format.slice(last).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return (_parseCache[format] = { re: new RegExp('^\\s*' + source + '\\s*$'), order });
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
            +     '<span class="nds-option-text"><span class="nds-label">' + label + '</span></span>'
            +  '</button>';
    }

    // No .nds-select-value carrier on purpose — see the banner. The picks live
    // in JS; these selects are the view.
    // nds-darker: the filled form-container variant (_forms.scss:522). The units
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
            this.uid = input.id || ('nds-time-picker-' + (++_uid));

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
                : parseTyped(input.value, this.format);
            if (seeded !== null) this._adopt(seeded);
            // A pre-filled bad value stamps validity silently so it can't pass a
            // pre-open submit without painting an error on first paint.
            else if (input.value.trim()) this._validateInput(true);

            container.setAttribute('data-nds-time-picker-initialized', '');
            this.valid = true;
        }

        // ---- open / close ----------------------------------------------

        bindInitEvents() {
            const signal = this.instanceAbortController.signal;
            const openFrom = (e) => {
                if (!this.isPanelCreated) {
                    this.createPanelDOM();
                    if (!this.elements.panel) {
                        console.error('NDS TimePicker: failed to create the panel');
                        return;
                    }
                    this.setupDropmenu();
                }
                if (e) e.stopPropagation();
                this.dropmenuInstance.toggle();
            };

            // The toggle button opens; a click on the input opens too, but typing
            // must keep working, so the caret is never stolen.
            if (this.elements.toggleBtn) {
                this.elements.toggleBtn.addEventListener('click', openFrom, { signal });
            }
            this.elements.input.addEventListener('click', openFrom, { signal });

            // Fires for hand-typed edits AND our own commits. Attached on the
            // input so the validity stamp lands before forms' document-level
            // change delegation reads it.
            this.elements.input.addEventListener('change', () => {
                if (this._committing) return;
                this.readTyped();
            }, { signal });
        }

        // Adopt NDSDropmenu for the panel's open/close/escape/outside-click.
        // `data-dropmenu-no-click` — the input and toggle drive the toggle, and a
        //   native click-toggle would fight the text caret.
        // `data-dropmenu-no-keys` — the panel's keyboard belongs to the unit
        //   selects inside it; dropmenu's flat trigger keys would swallow typing.
        setupDropmenu() {
            const formControl = this.elements.formControl;
            formControl.classList.add('nds-dropmenu');
            formControl.setAttribute('data-dropmenu-no-click', '');
            formControl.setAttribute('data-dropmenu-no-keys', '');
            // The panel is content-width, and dropmenu centres on the trigger by
            // default — which reads as a mistake under a full-width field. Anchor
            // it to the field's leading edge; dropmenu resolves that per direction.
            formControl.setAttribute('data-anchor', 'start');
            this.elements.panel.classList.add('nds-dropmenu-menu', 'nds-time-picker-menu');

            this.dropmenuInstance = NDS.Dropmenu.create(formControl);

            // Guard `e.target !== formControl`: these bubble, so the unit selects'
            // own open/close events would otherwise re-run this on every pick.
            // Panel-scoped, not instance-scoped: setupDropmenu re-runs on every
            // language rebuild, so instance scope would stack another pair each time.
            const signal = this.panelAbortController.signal;
            formControl.addEventListener('nds:dropmenu:opened', (e) => {
                if (e.target !== formControl) return;
                NDS.State.add(this.elements.container, 'open');
                this.applyBounds();
                this.dropmenuInstance.applyPosition();
            }, { signal });
            formControl.addEventListener('nds:dropmenu:closed', (e) => {
                if (e.target !== formControl) return;
                NDS.State.remove(this.elements.container, 'open');
            }, { signal });
        }

        // ---- panel ------------------------------------------------------

        optionsFor(unit) {
            const L = labels();
            if (unit === 'meridiem') return optionMarkup('am', L.am) + optionMarkup('pm', L.pm);

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
            const L = labels();
            const panel = document.createElement('div');
            panel.className = 'nds-time-picker-panel';
            panel.innerHTML = '<div class="nds-time-picker-units">'
                + this.units.map((u) => unitMarkup(u, L[u], this.optionsFor(u))).join('')
                + '</div>';

            // After the input, inside the same form-control — date-picker's shape.
            this.elements.input.insertAdjacentElement('afterend', panel);
            this.elements.panel = panel;

            const signal = this.panelAbortController.signal;
            this.unitEls = {};
            this.units.forEach((u) => {
                const el = panel.querySelector('[data-time-picker-unit="' + u + '"]');
                this.unitEls[u] = el;
                // Before create(): custom-select reads the input while building.
                el.querySelector('.nds-select-input').id = this.uid + '-' + u;
                // Custom-select's delegated option-click listener installs in ITS
                // init(), which the loader skips when the page's only
                // .nds-select-inputs are the ones we just generated (it gates on a
                // live querySelector). Idempotent — it guards on its own _initDone.
                NDS.CustomSelect?.init?.();
                NDS.CustomSelect.create(el);
                // nds:customselect:change fires on the form-control and does NOT
                // bubble, so it binds per unit, never on the panel.
                el.querySelector('.nds-form-control').addEventListener('nds:customselect:change', (e) => {
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
                if (fc) NDS.Dropmenu.destroy(fc);
            });
            this.unitEls = {};
            if (this.elements.panel) this.elements.panel.remove();
            this.elements.panel = null;
            this.isPanelCreated = false;
        }

        // The options live under <body> once a unit's menu portals, so they are
        // read through the back-reference custom-select stamps.
        _optionsOf(unit) {
            const fc = this.unitEls[unit] && this.unitEls[unit].querySelector('.nds-form-control');
            if (!fc) return [];
            return (fc._customSelectDropdown || fc).querySelectorAll('.nds-select-option');
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

        // The one write path — a unit pick, a typed edit, setValue and clear all
        // funnel through it, so the panel, the input and the carrier cannot drift.
        commit() {
            if (this._committing) return;
            this._quiet(() => {
                this.applyBounds();
                this.updateInput();
            });
        }

        updateInput() {
            const secs = this._seconds();
            const display = secs === null ? '' : formatDisplay(secs, this.format);
            const stable = secs === null ? '' : format24(secs, this.hasSeconds);
            const input = this.elements.input;
            const carrier = this.elements.carrier;

            if (input.value !== display) {
                input.value = display;
                NDS.triggerEvents(input);
            }
            if (carrier && carrier.value !== stable) {
                carrier.value = stable;
                NDS.triggerEvents(carrier);
            }
            this._validateInput();
        }

        // A hand-typed edit: parse it, adopt it, and let the panel catch up.
        readTyped() {
            const raw = this.elements.input.value.trim();
            if (!raw) { this.clear(); return; }
            const secs = parseTyped(raw, this.format);
            if (secs === null || !this._inBounds(secs, secs)) { this._validateInput(); return; }
            this._adopt(secs);
            this._validateInput();
        }

        getValue() {
            const secs = this._seconds();
            return secs === null ? '' : format24(secs, this.hasSeconds);
        }

        setValue(value) {
            const secs = parse24(value);
            if (secs === null || !this._inBounds(secs, secs)) return false;
            this._adopt(secs);
            this._validateInput();
            return true;
        }

        clear() {
            this._quiet(() => {
                this.picks = { hour: null, minute: null, second: null, meridiem: null };
                this.syncUnits();
                this.updateInput();
            });
            this._validateInput();
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
            btn.innerHTML = '<span class="nds-option-text"><span class="nds-label">' + pad(value) + '</span></span>';
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
        // NDS.Forms.validateForm / checkValidity gate the submit. `silent` skips
        // the footer paint — used at construction.
        _validateInput(silent) {
            const input = this.elements.input;
            const raw = input.value.trim();
            const msg = raw ? this._validationError(raw) : '';
            input.setCustomValidity(msg);
            if (msg && !silent) {
                // Soft dependency — forms ships in the main bundle; this no-ops if
                // a consumer bundle excludes it.
                NDS.Forms?.setStatus?.({ element: this.elements.container, status: 'error', message: msg });
            }
        }

        _validationError(raw) {
            const M = messages();
            const secs = parseTyped(raw, this.format);
            if (secs === null) return M.invalid.replace('{format}', this.format);
            if (this.min !== null && secs < this.min) {
                return M.beforeMin.replace('{time}', formatDisplay(this.min, this.format));
            }
            if (this.max !== null && secs > this.max) {
                return M.afterMax.replace('{time}', formatDisplay(this.max, this.format));
            }
            return '';
        }

        // ---- lifecycle ---------------------------------------------------

        setupLanguageObserver() {
            // Release before re-registering — otherwise every re-init stacks
            // another closure on the shared observer.
            if (this._offLangChange) this._offLangChange();
            this._offLangChange = NDS.onAttrChange('html', ['lang'], () => {
                // The panel carries localized labels throughout; rebuilding it is
                // cheaper to reason about than patching six places.
                if (this.isPanelCreated) {
                    const open = NDS.State.has(this.elements.container, 'open');
                    this.cleanup();
                    this.createPanelDOM();
                    this.setupDropmenu();
                    if (open) this.dropmenuInstance.open();
                }
                this._quiet(() => this.updateInput());
            });
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
            // Un-stamp the dropmenu hooks so a later NDS.Dropmenu.reinit() does not
            // adopt the form-control as an orphaned menu.
            const fc = this.elements.formControl;
            fc.classList.remove('nds-dropmenu');
            fc.removeAttribute('data-dropmenu-no-click');
            fc.removeAttribute('data-dropmenu-no-keys');
            fc.removeAttribute('data-anchor');
            NDS.State.remove(this.elements.container, 'open');
            this.elements.container.removeAttribute('data-nds-time-picker-initialized');
            delete this.elements.input._ndsTimePicker;
        }
    }

    // Consumers hold the input, the form-control or the container.
    function inputOf(el) {
        if (!el || !el.closest) return null;
        if (el.classList.contains('nds-time-input')) return el;
        return el.querySelector ? el.querySelector('.nds-time-input') : null;
    }

    function create(input, formControl) {
        const el = inputOf(input) || (input && input.closest ? input.closest('.nds-form-container')?.querySelector('.nds-time-input') : null);
        if (!el) return null;
        if (el._ndsTimePicker) return el._ndsTimePicker;
        const fc = formControl || el.closest('.nds-form-control');
        if (!fc) {
            console.warn('NDS TimePicker: .nds-form-control not found');
            return null;
        }
        const instance = new TimePicker(el, fc);
        if (!instance.valid) return null;
        el._ndsTimePicker = instance;
        return instance;
    }

    function init() {
        document.querySelectorAll('.nds-time-input').forEach((el) => create(el));
    }

    const instanceOf = (el) => {
        const input = inputOf(el);
        return input ? input._ndsTimePicker || null : null;
    };

    NDS.TimePicker = {
        init: init,
        reinit: init,
        create: create,
        setValue: (el, value) => { const i = instanceOf(el); return i ? i.setValue(value) : false; },
        getValue: (el) => { const i = instanceOf(el); return i ? i.getValue() : ''; },
        clear: (el) => { const i = instanceOf(el); return i ? i.clear() : false; },
        TimePicker: TimePicker
    };
})();
