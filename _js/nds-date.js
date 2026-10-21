/* NDS.Date — public surface
 * Rides: (none — base component)
 * Methods:
 *   NDS.Date.parse(text, opts) · .format(date, opts) · .convert(text, from, to) · .today() · .site
 *   NDS.Date.formatFor(el)           the nearest data-date-format (<html> is the site's)
 *   NDS.Date.calendarFor(el, fb)     the nearest data-calendar: hijri | gregory (else fb, gregory)
 *   NDS.Date.monthNames(calendar, lang) · .weekdayNames(lang)   names in a language, Sunday first
 *   NDS.Date.fill(root)              write every such <time> in root, and root itself
 *   NDS.Date.init()                  fill the page (the loader calls it)
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
 *     read NDS.Date synchronously.
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
    NDS.Date = (() => {
        const TOKENS = /YYYY|YY|MMMM|MM|M|DD|D/g;
        const fmts = new Map();
        const regs = new Map();
        const warned = new Set();
        const warnOnce = (message) => { if (!warned.has(message)) { warned.add(message); console.warn('[NDS.Date] ' + message); } };
        // An Intl.DateTimeFormat costs ICU init; format() on a built one is cheap.
        const getDateFormatter = (locale, opts) => {
            const key = locale + JSON.stringify(opts);
            let formatter = fmts.get(key);
            if (!formatter) fmts.set(key, formatter = new Intl.DateTimeFormat(locale, opts));
            return formatter;
        };
        const toIntlCalendar = (calendar) => (calendar === 'hijri' ? 'islamic-umalqura' : calendar || 'gregory');
        const getDayParts = (formatter, time) => {
            const parts = {};
            for (const { type, value } of formatter.formatToParts(time)) parts[type] = +value;
            return { y: parts.year, m: parts.month, d: parts.day };
        };
        const toLocalDay = (time) => { const instant = new Date(time); return new Date(instant.getUTCFullYear(), instant.getUTCMonth(), instant.getUTCDate()); };
        const getDayFormatter = (calendar) => {
            const formatter = getDateFormatter('en', { calendar: calendar, numberingSystem: 'latn', timeZone: 'UTC', year: 'numeric', month: 'numeric', day: 'numeric' });
            // An unknown calendar silently resolves to gregory: say so.
            if (formatter.resolvedOptions().calendar !== calendar) warnOnce(`calendar "${calendar}" is not supported here`);
            return formatter;
        };

        // Local day → {y, m, d} in cal. Read at UTC noon, so no offset moves the day.
        function toCalendarParts(date, calendar) {
            if (calendar === 'gregory') return { y: date.getFullYear(), m: date.getMonth() + 1, d: date.getDate() };
            return getDayParts(getDayFormatter(calendar), Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12));
        }

        // {y, m, d} in cal → local day, or null when that day does not exist.
        // Non-gregory: estimate by the mean month, read the guess back in cal, step by the miss.
        function fromCalendarParts(y, month, day, calendar) {
            if (calendar === 'gregory') {
                const date = new Date(y, month - 1, day);
                return date.getFullYear() === y && date.getMonth() === month - 1 && date.getDate() === day ? date : null;
            }
            if (!(month >= 1 && month <= 12 && day >= 1 && day <= 31)) return null;
            const formatter = getDayFormatter(calendar);
            let time = Date.UTC(2000, 0, 1, 12);
            for (let i = 0; i < 8; i++) {
                const parts = getDayParts(formatter, time);
                const miss = Math.round(((y - parts.y) * 12 + month - parts.m) * 29.53) + day - parts.d;
                if (!miss) return parts.y === y && parts.m === month && parts.d === day ? toLocalDay(time) : null;
                time += miss * 864e5;
            }
            return null; // a day past the month's end never lands
        }

        function readTimeZone() {
            const tz = document.documentElement.dataset.timezone;
            if (!tz) return undefined;
            try { getDateFormatter('en', { timeZone: tz }); return tz; }
            catch { warnOnce(`data-timezone "${tz}" is not a timezone; using the visitor's`); return undefined; }
        }

        // The nearest data-date-format wins, like a dark area; <html> holds the site's.
        // Hijri names come from the pack: Android's ICU renders Umm al-Qura month
        // symbols from the Gregorian set (month 1 → "January").
        const names = NDS.i18n.strings('date', {
            hijri_months: ['Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani', 'Jumada al-Ula', 'Jumada al-Akhirah', 'Rajab', 'Shaban', 'Ramadan', 'Shawwal', 'Dhu al-Qadah', 'Dhu al-Hijjah'],
        });
        const getIntlNames = (lang, opts, at) => {
            const formatter = new Intl.DateTimeFormat(NDS.i18n.resolveLang(lang), { timeZone: 'UTC', ...opts });
            return Array.from({ length: opts.month ? 12 : 7 }, (_, i) => formatter.format(at(i)));
        };
        const getMonthNames = (calendar, lang) => (calendar === 'hijri'
            ? names.text('hijri_months', null, lang)
            : getIntlNames(lang, { month: 'long' }, i => Date.UTC(2000, i, 15)));
        // Sunday first: 2 Jan 2000 was a Sunday.
        const getWeekdayNames = (lang) => getIntlNames(lang, { weekday: 'short' }, i => Date.UTC(2000, 0, 2 + i));

        const formatFor = (el) => el?.closest?.('[data-date-format]:not([data-date-format=""])')?.dataset.dateFormat || 'DD/MM/YYYY';
        const resolveCalendar = (el, fallback = 'gregory') => el?.closest?.('[data-calendar]:not([data-calendar=""])')?.dataset.calendar || fallback;
        const getSiteFormat = () => formatFor(document.documentElement);

        const api = {
            // Live: a script that sets the attributes after load still applies.
            get site() { return { timeZone: readTimeZone(), format: getSiteFormat() }; },

            formatFor,
            calendarFor: resolveCalendar,
            monthNames: getMonthNames,
            weekdayNames: getWeekdayNames,

            // Today in the site's timezone (the visitor's when unset), as a local day.
            today() {
                const tz = readTimeZone();
                if (!tz) { const now = new Date(); return new Date(now.getFullYear(), now.getMonth(), now.getDate()); }
                const parts = getDayParts(getDateFormatter('en', { timeZone: tz, numberingSystem: 'latn', year: 'numeric', month: 'numeric', day: 'numeric' }), new Date());
                return new Date(parts.y, parts.m - 1, parts.d);
            },

            // The caller names the format: 03/04/2026 is ambiguous, so nothing is guessed.
            parse(text, opts = {}) {
                const format = opts.format || getSiteFormat();
                let re = regs.get(format);
                if (!re) {
                    const order = [];
                    const src = format.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(TOKENS, (token) => {
                        order.push(token);
                        // A month name is print-only: the format never matches.
                        if (token === 'MMMM') return '(?!)';
                        return token === 'YYYY' ? '(\\d{4})' : token.length === 2 ? '(\\d{2})' : '(\\d{1,2})';
                    });
                    regs.set(format, re = { rx: new RegExp('^' + src + '$'), order });
                }
                // Arabic digits to ASCII, and the bidi marks Intl writes in Arabic out.
                const normalized = NDS.latinDigits(text).replace(/[\u200e\u200f\u061c]/g, '').trim();
                const match = normalized.match(re.rx);
                if (!match) return null;
                let y = null, month = 1, day = 1;
                re.order.forEach((token, i) => {
                    const value = +match[i + 1];
                    if (token[0] === 'Y') y = token === 'YY' ? 2000 + value : value; // ponytail: YY reads 20xx; add a year window if 19xx/21xx dates need it
                    else if (token[0] === 'M') month = value;
                    else day = value;
                });
                return y === null ? null : fromCalendarParts(y, month, day, toIntlCalendar(opts.calendar));
            },

            // { format } fills the tokens (ASCII digits, or `numerals`). Without it, Intl options
            // print the day in the page language; neither → the site format.
            format(date, opts = {}) {
                if (!(date instanceof Date) || isNaN(date)) return '';
                const { format, calendar, locale, numerals, ...intl } = opts;
                const intlCalendar = toIntlCalendar(calendar);
                if (format || !Object.keys(intl).length) {
                    const { y, m: month, d: day } = toCalendarParts(date, intlCalendar);
                    const out = (format || getSiteFormat()).replace(TOKENS, (token) => {
                        if (token === 'YYYY') return String(y);
                        if (token === 'YY') return String(y).slice(-2);
                        if (token === 'MMMM') return getMonthNames(calendar === 'hijri' ? 'hijri' : 'gregory', locale)[month - 1];
                        return String(token[0] === 'M' ? month : day).padStart(token.length, '0');
                    });
                    if (!numerals || numerals === 'latn') return out;
                    // The numbering system's zero, then offset: its digits are contiguous.
                    const zero = (0).toLocaleString('en-u-nu-' + numerals).charCodeAt(0);
                    return out.replace(/\d/g, (digit) => String.fromCharCode(zero + +digit));
                }
                const intlOptions = { ...intl, calendar: intlCalendar, numberingSystem: numerals || 'latn' };
                try { return getDateFormatter(locale || document.documentElement.lang || 'en', intlOptions).format(date); }
                catch { return getDateFormatter('en', intlOptions).format(date); }
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
    function readDay(value) {
        const text = value.trim();
        const match = DATETIME.exec(text);
        if (!match) return null;
        if (!match[4]) {
            const date = new Date(+match[1], match[2] - 1, +match[3]);
            return date.getDate() === +match[3] ? date : null;   // 2026-02-31 is no date
        }
        const instant = new Date(text);
        if (isNaN(instant)) return null;
        const tz = NDS.Date.site.timeZone;   // validated: a mistyped zone falls back, never throws
        if (!tz) return new Date(instant.getFullYear(), instant.getMonth(), instant.getDate());
        const parts = {};
        new Intl.DateTimeFormat('en', { timeZone: tz, year: 'numeric', month: 'numeric', day: 'numeric' })
            .formatToParts(instant).forEach(x => { parts[x.type] = +x.value; });
        return new Date(parts.year, parts.month - 1, parts.day);
    }

    function fill(root = document) {
        const elements = root.matches?.(SEL) ? [root] : [];
        elements.push(...(root.querySelectorAll?.(SEL) || []));
        for (const el of elements) {
            const hijri = el.dataset.dateTo === 'hijri';
            // A Gregorian <time> is written only in a format of its own: else it already reads right.
            const date = (hijri || el.dataset.dateFormat) && readDay(el.getAttribute('datetime'));
            if (!date) continue;
            el.textContent = NDS.Date.format(date, { calendar: hijri ? 'hijri' : 'gregory', format: NDS.Date.formatFor(el) });
            if (hijri && el.hasAttribute('data-date-era')) {
                const era = document.createElement('span');
                strings.set(era, 'text', 'hijri_era');
                el.append(' ', era);
            }
        }
    }

    let initDone = false;
    function init() {
        fill();
        if (initDone) return;
        initDone = true;
        // Hijri month names come from the pack: write a month-name format again once it lands.
        if (!strings.ready()) strings.load().then(() => fill());
    }

    NDS.Date.init = init;
    NDS.Date.fill = fill;
})();
