/* NDS.Date — public surface
 * Rides: (none — base component)
 * Methods:
 *   NDS.Date.parse(text, opts) · .format(date, opts) · .convert(text, from, to) · .getToday() · .site
 *                                    format tokens: YYYY YY MMMM MMM MM M DD D, dddd (the weekday);
 *                                    { era: true } ends a Hijri date in the pack's era word (AH)
 *   NDS.Date.getDayLabel(date, { calendar, locale })   the day in words, as a screen reader
 *                                    should hear it: "Tuesday 8 Jumada al-Ula 1448 AH"
 *   NDS.Date.toParts(date, calendar) · .fromParts({ year, month, day }, calendar)
 *                                    a day as numbers in a calendar (month 1-based), and back (null: no such day)
 *   NDS.Date.getMonthLength({ year, month }, calendar)   days in that month
 *   NDS.Date.getFormat(el)           the nearest data-date-format (<html> is the site's)
 *   NDS.Date.getCalendar(el, fb)     the nearest data-calendar: hijri | gregory (else fb, gregory)
 *   NDS.Date.getMonthNames(calendar, lang) · .getWeekdayNames(lang, weekStart)   names in a language,
 *                                    from weekStart (0 = Sunday, the default)
 *   NDS.Date.getWeekStart(el)        the nearest data-week-start, as 0 (Sunday) to 6 (Saturday)
 *   NDS.Date.getStartOfWeek(date, weekStart)   the first day of date's week
 *   NDS.Date.readDay(datetime)       a datetime value (YYYY-MM-DD, with or without a time) → its day, or null;
 *                                    with a zone, the day in the site's timezone (else the visitor's)
 *   NDS.Date.fill(root)              write every such <time> in root, and root itself
 *   NDS.Date.init()                  fill the page (the loader calls it)
 * Events:
 *   (none)
 * Hooks:
 *   on <html>:             data-timezone · data-date-format · data-calendar · data-week-start (the site's)
 *   on any element:        data-date-format · data-calendar · data-week-start (sun … sat; the dates
 *                          inside it; nearest wins)
 *   on a <time datetime>:  data-date-to="hijri": show the date in Hijri, in the nearest
 *                          data-date-format (the element's own included)
 *                          data-date-format on the <time> itself, without data-date-to:
 *                          show the Gregorian date in that format
 *                          data-date-era (optional, bare): a Hijri date ends in a span
 *                          that holds the pack's date.hijri_era word (AH in English)
 *   written by the component: the <time>'s text
 * Gotchas:
 *   - Main bundle, right after core: Calendar, Date Picker, Filter, Sort, Export, Countdown
 *     and the top bar read NDS.Date synchronously.
 *   - A <time> is read from datetime only, never its text: HTML holds a Gregorian date
 *     there. A value that is not a date (YYYY-MM-DD, with or without a time) is left as written.
 *   - A datetime with a time and a zone (Z, +03:00) counts in the site's timezone (else the visitor's).
 *   - Critical: the text changes length ("18/10/2026" → "07/05/1448 AH"), so fill() runs
 *     before the reveal. A month-name format is written again once the page's pack lands.
 *   - fill() is idempotent: it always works from datetime.
 */
(() => {
    'use strict';

    // THE date rule: Date Picker, the topbar date and Export parse and print here.
    // A date is a calendar day: a Date at local midnight, never shifted by a timezone.
    // The site's timezone (<html data-timezone>) enters only through getToday().
    // ponytail: built for Saudi Arabia's two calendars, gregory and hijri; any other calendar when a site asks.
    // Hijri names come from the pack: Android's ICU renders Umm al-Qura month
    // symbols from the Gregorian set (month 1 → "January").
    const strings = NDS.i18n.getStrings('date', {
        hijri_months: ['Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani', 'Jumada al-Ula', 'Jumada al-Akhirah', 'Rajab', 'Shaban', 'Ramadan', 'Shawwal', 'Dhu al-Qadah', 'Dhu al-Hijjah'],
        hijri_era: 'AH',
    });

    NDS.Date = (() => {
        const TOKENS = /dddd|YYYY|YY|MMMM|MMM|MM|M|DD|D/g;
        const formatters = new Map();
        const parsers = new Map();
        const warned = new Set();
        const warnOnce = (message) => { if (!warned.has(message)) { warned.add(message); console.warn('[NDS.Date] ' + message); } };
        // An Intl.DateTimeFormat costs ICU init; format() on a built one is cheap.
        const getDateFormatter = (locale, opts) => {
            const key = locale + JSON.stringify(opts);
            let formatter = formatters.get(key);
            if (!formatter) formatters.set(key, formatter = new Intl.DateTimeFormat(locale, opts));
            return formatter;
        };
        // A malformed name (1.x's `gregorian`) makes Intl throw, not fall back: warn and use gregory.
        const calendars = new Map();
        const toIntlCalendar = (calendar) => {
            if (calendar === 'hijri') return 'islamic-umalqura';
            if (!calendar || calendar === 'gregory') return 'gregory';
            if (!calendars.has(calendar)) {
                try { getDateFormatter('en', { calendar: calendar }); calendars.set(calendar, calendar); }
                catch { warnOnce(`calendar "${calendar}" is not supported here`); calendars.set(calendar, 'gregory'); }
            }
            return calendars.get(calendar);
        };
        const getDayParts = (formatter, time) => {
            const parts = {};
            for (const { type, value } of formatter.formatToParts(time)) parts[type] = +value;
            return { year: parts.year, month: parts.month, day: parts.day };
        };
        const toLocalDay = (time) => { const instant = new Date(time); return new Date(instant.getUTCFullYear(), instant.getUTCMonth(), instant.getUTCDate()); };
        const getDayFormatter = (calendar) => {
            const formatter = getDateFormatter('en', { calendar: calendar, numberingSystem: 'latn', timeZone: 'UTC', year: 'numeric', month: 'numeric', day: 'numeric' });
            // An unknown calendar silently resolves to gregory: say so.
            if (formatter.resolvedOptions().calendar !== calendar) warnOnce(`calendar "${calendar}" is not supported here`);
            return formatter;
        };

        // Local day → { year, month, day } in cal. Read at UTC noon, so no offset moves the day.
        function toCalendarParts(date, calendar) {
            if (calendar === 'gregory') return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
            return getDayParts(getDayFormatter(calendar), Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12));
        }

        // { year, month, day } in cal → local day, or null when that day does not exist.
        // Non-gregory: estimate by the mean month, read the guess back in cal, step by the miss.
        function fromCalendarParts({ year, month, day }, calendar) {
            if (calendar === 'gregory') {
                const date = new Date(year, month - 1, day);
                return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day ? date : null;
            }
            if (!(month >= 1 && month <= 12 && day >= 1 && day <= 31)) return null;
            const formatter = getDayFormatter(calendar);
            let time = Date.UTC(2000, 0, 1, 12);
            for (let i = 0; i < 8; i++) {
                const guess = getDayParts(formatter, time);
                const miss = Math.round(((year - guess.year) * 12 + month - guess.month) * 29.53) + day - guess.day;
                if (!miss) return guess.year === year && guess.month === month && guess.day === day ? toLocalDay(time) : null;
                time += miss * 864e5;
            }
            return null; // a day past the month's end never lands
        }

        // An instant's day in a timezone, as a local day.
        const getZoneDay = (instant, timeZone) => {
            const parts = getDayParts(getDateFormatter('en', { timeZone: timeZone, numberingSystem: 'latn', year: 'numeric', month: 'numeric', day: 'numeric' }), instant);
            return new Date(parts.year, parts.month - 1, parts.day);
        };
        const DATETIME = /^(\d{4})-(\d{2})-(\d{2})(?:[T ]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(Z|[+-]\d{2}:?\d{2})?)?$/;

        function readTimeZone() {
            const timeZone = document.documentElement.dataset.timezone;
            if (!timeZone) return undefined;
            try { getDateFormatter('en', { timeZone: timeZone }); return timeZone; }
            catch { warnOnce(`data-timezone "${timeZone}" is not a timezone; using the visitor's`); return undefined; }
        }

        const getIntlNames = (lang, opts, at) => {
            const formatter = getDateFormatter(NDS.i18n.resolveLang(lang), { timeZone: 'UTC', ...opts });
            return Array.from({ length: opts.month ? 12 : 7 }, (_, i) => formatter.format(at(i)));
        };
        const getMonthNames = (calendar, lang) => (calendar === 'hijri'
            ? strings.text('hijri_months', null, lang)
            : getIntlNames(lang, { month: 'long' }, i => Date.UTC(2000, i, 15)));
        // From weekStart (0 = Sunday): 2 Jan 2000 was a Sunday.
        const getWeekdayNames = (lang, weekStart = 0) => getIntlNames(lang, { weekday: 'short' }, i => Date.UTC(2000, 0, 2 + weekStart + i));
        const WEEKDAYS = Object.freeze(['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']);
        // ponytail: Sunday unless set; Intl.Locale's getWeekInfo() could follow the language once Firefox has it.
        const getWeekStart = (el) => {
            const value = el?.closest?.('[data-week-start]:not([data-week-start=""])')?.dataset.weekStart;
            if (!value) return 0;
            const index = WEEKDAYS.indexOf(value.toLowerCase());
            if (index < 0) warnOnce(`data-week-start "${value}" is not one of ${WEEKDAYS.join(' ')}; using sun`);
            return Math.max(index, 0);
        };
        const getStartOfWeek = (date, weekStart = 0) => new Date(date.getFullYear(), date.getMonth(), date.getDate() - (date.getDay() - weekStart + 7) % 7);

        // The nearest data-date-format wins, like a dark area; <html> holds the site's.
        const getFormat = (el) => el?.closest?.('[data-date-format]:not([data-date-format=""])')?.dataset.dateFormat || 'DD/MM/YYYY';
        const getCalendar = (el, fallback = 'gregory') => el?.closest?.('[data-calendar]:not([data-calendar=""])')?.dataset.calendar || fallback;
        const getSiteFormat = () => getFormat(document.documentElement);

        const api = {
            // Live: a script that sets the attributes after load still applies.
            get site() { return { timeZone: readTimeZone(), format: getSiteFormat() }; },

            getFormat,
            getCalendar,
            getMonthNames,
            getWeekdayNames,
            getWeekStart,
            getStartOfWeek,

            // Today in the site's timezone (the visitor's when unset), as a local day.
            getToday() {
                const timeZone = readTimeZone();
                if (!timeZone) { const now = new Date(); return new Date(now.getFullYear(), now.getMonth(), now.getDate()); }
                return getZoneDay(new Date(), timeZone);
            },

            // The day a datetime names, as a local date. With a zone it is an instant: its day in the
            // site's timezone, else in the visitor's.
            readDay(value) {
                const text = value.trim();
                const match = DATETIME.exec(text);
                if (!match) return null;
                // 2026-02-31 and 2026-13-05 are no date.
                if (!match[4]) return fromCalendarParts({ year: +match[1], month: +match[2], day: +match[3] }, 'gregory');
                const instant = new Date(text);
                if (isNaN(instant)) return null;
                const timeZone = readTimeZone();   // validated: a mistyped zone falls back, never throws
                if (!timeZone) return new Date(instant.getFullYear(), instant.getMonth(), instant.getDate());
                return getZoneDay(instant, timeZone);
            },

            // The caller names the format: 03/04/2026 is ambiguous, so nothing is guessed.
            parse(text, opts = {}) {
                const format = opts.format || getSiteFormat();
                let parser = parsers.get(format);
                if (!parser) {
                    const order = [];
                    const pattern = format.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(TOKENS, (token) => {
                        order.push(token);
                        // A name is print-only: the format never matches.
                        if (token === 'MMMM' || token === 'MMM' || token === 'dddd') return '(?!)';
                        return token === 'YYYY' ? '(\\d{4})' : token.length === 2 ? '(\\d{2})' : '(\\d{1,2})';
                    });
                    parsers.set(format, parser = { regex: new RegExp('^' + pattern + '$'), order });
                }
                // Arabic digits to ASCII, and the bidi marks Intl writes in Arabic out.
                const normalized = NDS.toLatinDigits(text).replace(/[\u200e\u200f\u061c]/g, '').trim();
                const match = normalized.match(parser.regex);
                if (!match) return null;
                const parts = { year: null, month: 1, day: 1 };
                parser.order.forEach((token, i) => {
                    const value = +match[i + 1];
                    if (token[0] === 'Y') parts.year = token === 'YY' ? 2000 + value : value; // ponytail: YY reads 20xx; add a year window if 19xx/21xx dates need it
                    else if (token[0] === 'M') parts.month = value;
                    else parts.day = value;
                });
                return parts.year === null ? null : fromCalendarParts(parts, toIntlCalendar(opts.calendar));
            },

            // { format } fills the tokens (ASCII digits, or `numerals`). Without it, Intl options
            // print the day in the page language; neither → the site format.
            format(date, opts = {}) {
                if (!(date instanceof Date) || isNaN(date)) return '';
                const { format, calendar, locale, numerals, era, ...intl } = opts;
                const intlCalendar = toIntlCalendar(calendar);
                if (format || !Object.keys(intl).length) {
                    const { year, month, day } = toCalendarParts(date, intlCalendar);
                    let out = (format || getSiteFormat()).replace(TOKENS, (token) => {
                        if (token === 'dddd') return getIntlNames(locale, { weekday: 'long' }, i => Date.UTC(2000, 0, 2 + i))[date.getDay()];
                        if (token === 'YYYY') return String(year);
                        if (token === 'YY') return String(year).slice(-2);
                        if (token === 'MMMM') return getMonthNames(calendar, locale)[month - 1];
                        // A Hijri month has no standard short name: MMM writes the full one.
                        if (token === 'MMM') return (calendar === 'hijri' ? getMonthNames('hijri', locale) : getIntlNames(locale, { month: 'short' }, i => Date.UTC(2000, i, 15)))[month - 1];
                        return String(token[0] === 'M' ? month : day).padStart(token.length, '0');
                    });
                    // `era`: a Hijri date ends in the pack's era word (AH); a Gregorian one takes none.
                    if (era && calendar === 'hijri') out += ' ' + strings.text('hijri_era', null, locale);
                    if (!numerals || numerals === 'latn') return out;
                    // The numbering system's zero, then offset: its digits are contiguous.
                    const zero = (0).toLocaleString('en-u-nu-' + numerals).charCodeAt(0);
                    return out.replace(/\d/g, (digit) => String.fromCharCode(zero + +digit));
                }
                const intlOptions = { ...intl, calendar: intlCalendar, numberingSystem: numerals || 'latn' };
                try { return getDateFormatter(locale || document.documentElement.lang || 'en', intlOptions).format(date); }
                catch { return getDateFormatter('en', intlOptions).format(date); }
            },

            // Pack month names, never Intl's: Android's Umm al-Qura names are Gregorian ones.
            getDayLabel(date, { calendar, locale } = {}) {
                return api.format(date, { calendar, locale, format: 'dddd D MMMM YYYY', era: true });
            },

            convert(text, from, to) {
                const date = api.parse(text, from);
                return date && api.format(date, to);
            },

            // A day as { year, month, day } in a calendar, month 1-based in both, and back.
            toParts(date, calendar) {
                return toCalendarParts(date, toIntlCalendar(calendar));
            },
            fromParts(parts, calendar) {
                return fromCalendarParts(parts, toIntlCalendar(calendar));
            },
            getMonthLength({ year, month }, calendar) {
                const intlCalendar = toIntlCalendar(calendar);
                if (intlCalendar === 'gregory') return new Date(year, month, 0).getDate();
                return fromCalendarParts({ year, month, day: 30 }, intlCalendar) ? 30 : 29;
            }
        };
        return api;
    })();

    // ── <time> text ──────────────────────────────────────────────────
    const SELECTOR = 'time[datetime][data-date-to], time[datetime][data-date-format]';
    function fill(root = document) {
        const elements = root.matches?.(SELECTOR) ? [root] : [];
        elements.push(...(root.querySelectorAll?.(SELECTOR) || []));
        for (const el of elements) {
            const hijri = el.dataset.dateTo === 'hijri';
            // A Gregorian <time> is written only in a format of its own: else it already reads right.
            const date = (hijri || el.dataset.dateFormat) && NDS.Date.readDay(el.getAttribute('datetime'));
            if (!date) continue;
            el.textContent = NDS.Date.format(date, { calendar: hijri ? 'hijri' : 'gregory', format: NDS.Date.getFormat(el) });
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
