/* NDS.date — public surface
 * Rides: (none — base component)
 * Methods:
 *   NDS.date.parse(text, opts) · .format(date, opts) · .convert(text, from, to) · .today() · .site
 *   NDS.date.formatFor(el)           the nearest data-date-format (<html> is the site's)
 *   NDS.date.calendarFor(el, fb)     the nearest data-calendar: hijri | gregory (else fb, gregory)
 *   NDS.date.monthNames(calendar, lang) · .weekdayNames(lang)   names in a language, Sunday first
 *   NDS.date.fill(root)              write every such <time> in root, and root itself
 *   NDS.date.init()                  fill the page (the loader calls it)
 * Events:
 *   (none)
 * Hooks:
 *   on <html>:             data-timezone · data-date-format · data-calendar (the site's)
 *   on any element:        data-date-format · data-calendar (the dates inside it; nearest wins)
 *   on a <time datetime>:  data-date-to="hijri": show the date in Hijri, in the nearest
 *                          data-date-format (the element's own included)
 *                          data-date-format on the <time> itself, without data-date-to:
 *                          show the Gregorian date in that format
 *                          data-date-era (optional, bare): a Hijri date ends in a span
 *                          that holds the pack's date.hijri_era word (AH in English)
 *   written by the component: the <time>'s text
 * Gotchas:
 *   - Main bundle, right after core: Date Picker, Sort, Export, Countdown and the top bar
 *     read NDS.date synchronously.
 *   - A <time> is read from datetime only, never its text: HTML holds a Gregorian date
 *     there. A value that is not a date (YYYY-MM-DD, with or without a time) is left as written.
 *   - A datetime with a time and a zone (Z, +03:00) counts in the site's timezone.
 *   - Critical: the text changes length ("18/10/2026" → "07/05/1448 AH"), so fill() runs
 *     before the reveal. A month-name format is written again once the page's pack lands.
 *   - fill() is idempotent: it always works from datetime.
 */
(() => {
    'use strict';

    // THE date rule: Date Picker, the topbar date and Export parse and print here.
    // A date is a calendar day: a Date at local midnight, never shifted by a timezone.
    // The site's timezone (<html data-timezone>) enters only through today().
    // ponytail: built for Saudi Arabia's two calendars, gregory and hijri; any other calendar when a site asks.
    NDS.date = (() => {
        const TOKENS = /YYYY|YY|MMMM|MM|M|DD|D/g;
        const fmts = new Map();
        const regs = new Map();
        const warned = new Set();
        const warnOnce = (msg) => { if (!warned.has(msg)) { warned.add(msg); console.warn('[NDS.date] ' + msg); } };
        // An Intl.DateTimeFormat costs ICU init; format() on a built one is cheap.
        const dtf = (locale, opts) => {
            const key = locale + JSON.stringify(opts);
            let f = fmts.get(key);
            if (!f) fmts.set(key, f = new Intl.DateTimeFormat(locale, opts));
            return f;
        };
        const calOf = (c) => (c === 'hijri' ? 'islamic-umalqura' : c || 'gregory');
        const partsOf = (f, t) => {
            const p = {};
            for (const { type, value } of f.formatToParts(t)) p[type] = +value;
            return { y: p.year, m: p.month, d: p.day };
        };
        const local = (t) => { const g = new Date(t); return new Date(g.getUTCFullYear(), g.getUTCMonth(), g.getUTCDate()); };
        const ymdIn = (cal) => {
            const f = dtf('en', { calendar: cal, numberingSystem: 'latn', timeZone: 'UTC', year: 'numeric', month: 'numeric', day: 'numeric' });
            // An unknown calendar silently resolves to gregory: say so.
            if (f.resolvedOptions().calendar !== cal) warnOnce(`calendar "${cal}" is not supported here`);
            return f;
        };

        // Local day → {y, m, d} in cal. Read at UTC noon, so no offset moves the day.
        function toCal(date, cal) {
            if (cal === 'gregory') return { y: date.getFullYear(), m: date.getMonth() + 1, d: date.getDate() };
            return partsOf(ymdIn(cal), Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12));
        }

        // {y, m, d} in cal → local day, or null when that day does not exist.
        // Non-gregory: estimate by the mean month, read the guess back in cal, step by the miss.
        function fromCal(y, m, d, cal) {
            if (cal === 'gregory') {
                const t = new Date(y, m - 1, d);
                return t.getFullYear() === y && t.getMonth() === m - 1 && t.getDate() === d ? t : null;
            }
            if (!(m >= 1 && m <= 12 && d >= 1 && d <= 31)) return null;
            const f = ymdIn(cal);
            let t = Date.UTC(2000, 0, 1, 12);
            for (let i = 0; i < 8; i++) {
                const p = partsOf(f, t);
                const miss = Math.round(((y - p.y) * 12 + m - p.m) * 29.53) + d - p.d;
                if (!miss) return p.y === y && p.m === m && p.d === d ? local(t) : null;
                t += miss * 864e5;
            }
            return null; // a day past the month's end never lands
        }

        function zone() {
            const tz = document.documentElement.dataset.timezone;
            if (!tz) return undefined;
            try { dtf('en', { timeZone: tz }); return tz; }
            catch { warnOnce(`data-timezone "${tz}" is not a timezone; using the visitor's`); return undefined; }
        }

        // The nearest data-date-format wins, like a dark area; <html> holds the site's.
        // Hijri names come from the pack: Android's ICU renders Umm al-Qura month
        // symbols from the Gregorian set (month 1 → "January").
        const names = NDS.i18n.strings('date', {
            hijri_months: ['Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani', 'Jumada al-Ula', 'Jumada al-Akhirah', 'Rajab', 'Shaban', 'Ramadan', 'Shawwal', 'Dhu al-Qadah', 'Dhu al-Hijjah'],
        });
        const intlNames = (lang, opts, at) => {
            const f = new Intl.DateTimeFormat(NDS.i18n._lang(lang), { timeZone: 'UTC', ...opts });
            return Array.from({ length: opts.month ? 12 : 7 }, (_, i) => f.format(at(i)));
        };
        const monthNames = (calendar, lang) => (calendar === 'hijri'
            ? names.text('hijri_months', null, lang)
            : intlNames(lang, { month: 'long' }, i => Date.UTC(2000, i, 15)));
        // Sunday first: 2 Jan 2000 was a Sunday.
        const weekdayNames = (lang) => intlNames(lang, { weekday: 'short' }, i => Date.UTC(2000, 0, 2 + i));

        const formatFor = (el) => el?.closest?.('[data-date-format]:not([data-date-format=""])')?.dataset.dateFormat || 'DD/MM/YYYY';
        const calendarFor = (el, fallback = 'gregory') => el?.closest?.('[data-calendar]:not([data-calendar=""])')?.dataset.calendar || fallback;
        const siteFormat = () => formatFor(document.documentElement);

        const api = {
            // Live: a script that sets the attributes after load still applies.
            get site() { return { timeZone: zone(), format: siteFormat() }; },

            formatFor,
            calendarFor,
            monthNames,
            weekdayNames,

            // Today in the site's timezone (the visitor's when unset), as a local day.
            today() {
                const tz = zone();
                if (!tz) { const n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); }
                const p = partsOf(dtf('en', { timeZone: tz, numberingSystem: 'latn', year: 'numeric', month: 'numeric', day: 'numeric' }), new Date());
                return new Date(p.y, p.m - 1, p.d);
            },

            // The caller names the format: 03/04/2026 is ambiguous, so nothing is guessed.
            parse(text, opts = {}) {
                const format = opts.format || siteFormat();
                let re = regs.get(format);
                if (!re) {
                    const order = [];
                    const src = format.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(TOKENS, (t) => {
                        order.push(t);
                        // A month name is print-only: the format never matches.
                        if (t === 'MMMM') return '(?!)';
                        return t === 'YYYY' ? '(\\d{4})' : t.length === 2 ? '(\\d{2})' : '(\\d{1,2})';
                    });
                    regs.set(format, re = { rx: new RegExp('^' + src + '$'), order });
                }
                // Arabic digits to ASCII, and the bidi marks Intl writes in Arabic out.
                const s = NDS.latinDigits(text).replace(/[\u200e\u200f\u061c]/g, '').trim();
                const match = s.match(re.rx);
                if (!match) return null;
                let y = null, m = 1, d = 1;
                re.order.forEach((t, i) => {
                    const v = +match[i + 1];
                    if (t[0] === 'Y') y = t === 'YY' ? 2000 + v : v; // ponytail: YY reads 20xx; add a year window if 19xx/21xx dates need it
                    else if (t[0] === 'M') m = v;
                    else d = v;
                });
                return y === null ? null : fromCal(y, m, d, calOf(opts.calendar));
            },

            // { format } fills the tokens (ASCII digits, or `numerals`). Without it, Intl options
            // print the day in the page language; neither → the site format.
            format(date, opts = {}) {
                if (!(date instanceof Date) || isNaN(date)) return '';
                const { format, calendar, locale, numerals, ...intl } = opts;
                const cal = calOf(calendar);
                if (format || !Object.keys(intl).length) {
                    const { y, m, d } = toCal(date, cal);
                    const out = (format || siteFormat()).replace(TOKENS, (t) =>
                        t === 'YYYY' ? String(y) : t === 'YY' ? String(y).slice(-2)
                        : t === 'MMMM' ? monthNames(calendar === 'hijri' ? 'hijri' : 'gregory', locale)[m - 1]
                        : String(t[0] === 'M' ? m : d).padStart(t.length, '0'));
                    if (!numerals || numerals === 'latn') return out;
                    // The numbering system's zero, then offset: its digits are contiguous.
                    const zero = (0).toLocaleString('en-u-nu-' + numerals).charCodeAt(0);
                    return out.replace(/\d/g, (c) => String.fromCharCode(zero + +c));
                }
                const o = { ...intl, calendar: cal, numberingSystem: numerals || 'latn' };
                try { return dtf(locale || document.documentElement.lang || 'en', o).format(date); }
                catch { return dtf('en', o).format(date); }
            },

            convert(text, from, to) {
                const date = api.parse(text, from);
                return date && api.format(date, to);
            }
        };
        return api;
    })();

    // ── <time> text ──────────────────────────────────────────────────
    const SEL = 'time[datetime][data-date-to], time[datetime][data-date-format]';
    const strings = NDS.i18n.strings('date', { hijri_era: 'AH' });
    const DATETIME = /^(\d{4})-(\d{2})-(\d{2})(?:[T ]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(Z|[+-]\d{2}:?\d{2})?)?$/;

    // The day a datetime names, as a local date. With a zone it is an instant: its day in the
    // site's timezone, else in the visitor's.
    function dayOf(value) {
        const v = value.trim();
        const m = DATETIME.exec(v);
        if (!m) return null;
        if (!m[4]) {
            const d = new Date(+m[1], m[2] - 1, +m[3]);
            return d.getDate() === +m[3] ? d : null;   // 2026-02-31 is no date
        }
        const t = new Date(v);
        if (isNaN(t)) return null;
        const tz = document.documentElement.dataset.timezone;
        if (!tz) return new Date(t.getFullYear(), t.getMonth(), t.getDate());
        const p = {};
        new Intl.DateTimeFormat('en', { timeZone: tz, year: 'numeric', month: 'numeric', day: 'numeric' })
            .formatToParts(t).forEach(x => { p[x.type] = +x.value; });
        return new Date(p.year, p.month - 1, p.day);
    }

    function fill(root = document) {
        const els = root.matches?.(SEL) ? [root] : [];
        els.push(...(root.querySelectorAll?.(SEL) || []));
        for (const el of els) {
            const hijri = el.dataset.dateTo === 'hijri';
            // A Gregorian <time> is written only in a format of its own: else it already reads right.
            const date = (hijri || el.dataset.dateFormat) && dayOf(el.getAttribute('datetime'));
            if (!date) continue;
            el.textContent = NDS.date.format(date, { calendar: hijri ? 'hijri' : 'gregory', format: NDS.date.formatFor(el) });
            if (hijri && el.hasAttribute('data-date-era')) {
                const era = document.createElement('span');
                strings.set(era, 'text', 'hijri_era');
                el.append(' ', era);
            }
        }
    }

    let _initDone = false;
    function init() {
        fill();
        if (_initDone) return;
        _initDone = true;
        // Hijri month names come from the pack: write a month-name format again once it lands.
        if (!strings.ready()) strings.load().then(() => fill());
    }

    NDS.date.init = init;
    NDS.date.fill = fill;
})();
