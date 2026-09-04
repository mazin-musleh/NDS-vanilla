/* NDS.TimeDate — public surface
 * Rides: (none — base component)
 * Methods:
 *   NDS.TimeDate.init()                     wire the date widget and the clock, if present
 *   NDS.TimeDate.updateDate()               re-render the date now
 *   NDS.TimeDate.updateClock()              re-render the clock now
 *   NDS.TimeDate.getHijriDate(isArabic, structured)
 *                                           → Promise. A formatted string, or
 *                                           {day, month, year} when structured is true
 * Events:
 *   (none)
 * Hooks:
 *   ids, not attributes: #nds-date (the date line) · #nds-realTimeClock (the clock)
 *   data-calendar   on #nds-date: hijri | gregorian. Default follows the page language
 * Gotchas:
 *   - Both widgets read Riyadh time (GMT+3), not the visitor's clock.
 *   - getHijriDate() stays a Promise because the date picker chains on it, even though
 *     the value is computed locally.
 *   - The clock stops while the tab is hidden and catches up when it returns.
 *   - The rendered date is cached for the day in localStorage, as primitives — the DOM is
 *     rebuilt from them, never from stored HTML.
 */
// Time & Date - Simplified with Core Functions
(() => {
    'use strict';

    // Intl.DateTimeFormat construction does the expensive ICU locale init;
    // format()/formatToParts() on an existing instance is cheap. Memoize one
    // formatter per (locale, options) so repeated renders never rebuild it.
    const _fmtCache = new Map();
    // The topbar hides the date on sm/md and the clock on sm (data-hidden), so a
    // phone paid the Hijri/ICU formatter for text it never shows. Mirror the
    // data-hidden bands of _utilities.scss from matchMedia — no layout read, so
    // the check is free in the init drain and in an idle slot. `sr` keeps the
    // text for screen readers. A breakpoint crossing re-runs via NDS.onResize.
    const BAND_ALIAS = { sm: 'mobile', md: 'tablet', lg: 'desktop' };
    function rendered(el) {
        const tokens = (el.dataset.hidden || '').split(/\s+/);
        if (tokens.includes('sr')) return true;
        const mq = (q) => window.matchMedia(NDS.breakpoints[q]).matches;
        const band = mq('mobile') ? 'sm' : mq('tablet-max') ? 'md' : mq('desktop-max') ? 'lg' : 'xl';
        return !tokens.includes(band) && !tokens.includes(BAND_ALIAS[band]);
    }
    function dtf(locale, opts) {
        const key = locale + '|' + JSON.stringify(opts);
        let f = _fmtCache.get(key);
        if (!f) _fmtCache.set(key, f = new Intl.DateTimeFormat(locale, opts));
        return f;
    }

    // Saudi Arabia (Riyadh, GMT+3) date as YYYY-MM-DD — embedded into the cache
    // key below so a tab that crosses midnight reads the new day's entry.
    function getSaudiDate() {
        return dtf('en-CA', { timeZone: 'Asia/Riyadh' }).format(new Date());
    }

    // Cached payloads live in localStorage, which any same-origin script can
    // overwrite. Cache primitives only; render imperatively at the consumer
    // so attacker-controlled bytes can't reach the HTML parser. Pattern
    // matches `_js/nds-cityWeather.js` post-fix.
    function renderDate(parent, content) {
        while (parent.firstChild) parent.removeChild(parent.firstChild);
        const icon = document.createElement('i');
        icon.className = 'nds-icon nds-hgi-calendar-03';
        NDS.aria.hidden(icon, true);
        const span = document.createElement('span');
        span.className = 'text';
        span.textContent = content;
        parent.appendChild(icon);
        parent.appendChild(span);
    }

    // Hijri month names (same spellings as the date picker). We map month
    // number → name ourselves instead of asking Intl for month:'long' because
    // Android's bundled ICU computes the correct Umm al-Qura *numeric* fields
    // but renders the en-US islamic month/era SYMBOLS from the Gregorian set
    // (month 1 → "January", era → "BC"). The numeric parts below are
    // calendar-correct on every platform.
    const HIJRI_MONTHS = {
        en: ['Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani', 'Jumada al-Ula', 'Jumada al-Akhirah', 'Rajab', 'Shaban', 'Ramadan', 'Shawwal', 'Dhu al-Qadah', 'Dhu al-Hijjah'],
        ar: ['محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة']
    };

    // Numeric Hijri Y/M/D via Intl's Umm al-Qura calendar (latin digits so
    // parseInt is safe). The formatter is memoized by dtf(), so repeat calls
    // don't rebuild the costly ICU data.
    function getHijriParts(date) {
        const parts = dtf('en-US-u-ca-islamic-umalqura', {
            day: 'numeric', month: 'numeric', year: 'numeric'
        }).formatToParts(date);
        const num = type => parseInt(parts.find(p => p.type === type).value, 10);
        return { day: num('day'), month: num('month'), year: num('year') };
    }

    // Stays async to preserve the Promise contract consumers rely on
    // (date-picker calls .then on it).
    async function getHijriDate(isArabic, returnStructured = false) {
        const parts = getHijriParts(new Date());
        if (returnStructured) return parts;

        const monthName = (isArabic ? HIJRI_MONTHS.ar : HIJRI_MONTHS.en)[parts.month - 1];
        return isArabic
            ? `${parts.day} ${monthName} ${parts.year} هـ`
            : `${monthName} ${parts.day}, ${parts.year} AH`;
    }

    // Date function with caching
    async function updateDate() {
        const el = document.getElementById('nds-date');
        if (!el || !rendered(el)) return;

        const isArabic = NDS.isArabic;
        const today = getSaudiDate();
        const type = el.dataset?.calendar || (isArabic ? 'hijri' : 'gregorian');
        // v2 key: cache shape changed from HTML string to primitive content.
        const cacheKey = `date_v2_${type}_${isArabic}_${today}`;

        // Check cache first (24 hours)
        const cached = NDS.cache.get(cacheKey);
        if (typeof cached === 'string' && cached) {
            renderDate(el, cached);
            el.style.display = '';
            return;
        }

        let content;

        if (type === 'hijri') {
            content = await getHijriDate(isArabic);
        } else {
            // Gregorian date
            const locale = isArabic ? 'ar-SA' : 'en-US';
            content = dtf(locale, {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            }).format(new Date());
        }

        if (content) {
            renderDate(el, content);
            el.style.display = '';

            // Cache for 24 hours (primitive content, not HTML)
            NDS.cache.set(cacheKey, content, 24 * 60);
        } else {
            el.style.display = 'none';
        }
    }

    // Clock — build the icon + span once, then only mutate the cached
    // text node on each tick. Displays h:mm AM/PM (no seconds): topbar
    // clocks don't need second-by-second precision, and ticking once per
    // minute (aligned to the minute boundary) cuts DOM work 60× vs a
    // per-second setInterval.
    let clockText = null;
    let clockTimer = null;

    function ensureClockDOM() {
        if (clockText) return true;
        const el = document.getElementById('nds-realTimeClock');
        if (!el) return false;
        const icon = document.createElement('i');
        icon.className = 'nds-icon nds-hgi-clock-01';
        NDS.aria.hidden(icon, true);
        clockText = document.createTextNode('');
        const span = document.createElement('span');
        span.className = 'text';
        span.appendChild(clockText);
        el.replaceChildren(icon, span);
        return true;
    }

    function updateClock() {
        if (!ensureClockDOM()) return;
        const now = new Date();
        const h = now.getHours();
        const m = now.getMinutes();
        clockText.nodeValue = `${h % 12 || 12}:${m.toString().padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
    }

    function scheduleNextMinute() {
        const now = new Date();
        const msUntilNext = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
        clockTimer = setTimeout(() => {
            updateClock();
            scheduleNextMinute();
        }, msUntilNext);
    }

    function startClock() {
        if (clockTimer) return;
        const el = document.getElementById('nds-realTimeClock');
        if (!el || !rendered(el)) return;
        updateClock();
        scheduleNextMinute();
    }

    function stopClock() {
        if (!clockTimer) return;
        clearTimeout(clockTimer);
        clockTimer = null;
    }

    // Per-branch init guards. A re-run of init (e.g. NDS.Init.initialize())
    // would otherwise re-stack setInterval + NDS.onAttrChange (no
    // dedup in core for either) and document.addEventListener('visibilitychange')
    // (no removal path) on every re-call. The date and clock topbar widgets can
    // appear independently, so the latches are separate — a page that ships
    // only one widget can still wire the other if it's injected later.
    let _dateInitDone = false;
    let _clockInitDone = false;
    let _resizeInitDone = false;

    function initializeTimeDate() {
        const dateEl = document.getElementById('nds-date');
        const clockEl = document.getElementById('nds-realTimeClock');

        if (dateEl && !_dateInitDone) {
            _dateInitDone = true;
            // Defer the initial render to an idle slot so the Intl/ICU work
            // (formatter construction) doesn't compete with critical resources
            // during post-DCL hydration. The 24h interval and lang-change
            // handler still run inline so they respond promptly when triggered.
            NDS.onIdle(updateDate);
            setInterval(updateDate, 24 * 60 * 60 * 1000);
            NDS.onAttrChange('html', ['lang'], updateDate);
        }

        if (clockEl && !_clockInitDone) {
            _clockInitDone = true;
            // Skip the tick loop while the tab is hidden — no point burning
            // per-second DOM mutations no one can see. On resume, startClock()
            // ticks immediately so the time isn't a second stale.
            if (!document.hidden) startClock();
            document.addEventListener('visibilitychange', () => {
                document.hidden ? stopClock() : startClock();
            });
        }

        if ((dateEl || clockEl) && !_resizeInitDone) {
            _resizeInitDone = true;
            NDS.onResize(() => {
                updateDate();
                if (clockEl && rendered(clockEl) && !document.hidden) startClock(); else stopClock();
            });
        }
    }

    NDS.TimeDate = {
        init: initializeTimeDate,
        getHijriDate,
        updateDate,
        updateClock
    };

    // Note: Initialization now handled by nds-loader.js unified system

})();