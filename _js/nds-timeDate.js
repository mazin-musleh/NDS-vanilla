/* NDS.TimeDate — public surface
 * Rides: (none — base component)
 * Methods:
 *   NDS.TimeDate.init()                     wire the date widget and the clock, if present
 *   NDS.TimeDate.updateDate()               re-render the date now
 *   NDS.TimeDate.updateClock()              re-render the clock now
 * Events:
 *   (none)
 * Hooks:
 *   ids, not attributes: #nds-date (the date line) · #nds-realTimeClock (the clock)
 *   data-calendar   on #nds-date: hijri | gregorian. Default follows the page language
 * Gotchas:
 *   - The date and the clock follow <html data-timezone>; without it, the visitor's clock.
 *   - init() re-renders on every call, so a replaced widget element fills in again.
 *   - The clock stops while the tab is hidden and catches up when it returns.
 *   - The rendered date is cached for the day in localStorage, as primitives — the DOM is
 *     rebuilt from them, never from stored HTML.
 */
// Time & Date - Simplified with Core Functions
(() => {
    'use strict';

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

    function hijriText(day, isArabic) {
        const [d, m, y] = NDS.date.format(day, { calendar: 'hijri', format: 'D M YYYY' }).split(' ');
        const monthName = (isArabic ? HIJRI_MONTHS.ar : HIJRI_MONTHS.en)[m - 1];
        return isArabic ? `${d} ${monthName} ${y} هـ` : `${monthName} ${d}, ${y} AH`;
    }

    // Date function with caching
    function updateDate() {
        const el = document.getElementById('nds-date');
        if (!el || !rendered(el)) return;

        const isArabic = NDS.isArabic;
        const today = NDS.date.today();
        const type = el.dataset?.calendar || (isArabic ? 'hijri' : 'gregorian');
        // v3 key: Arabic Gregorian text moved to Latin digits. The day in the key
        // fixes the text, whatever the timezone, so a tab that crosses midnight re-renders.
        const cacheKey = `date_v3_${type}_${isArabic}_${NDS.date.format(today, { format: 'YYYY-MM-DD' })}`;

        // Check cache first (24 hours)
        const cached = NDS.cache.get(cacheKey);
        if (typeof cached === 'string' && cached) {
            renderDate(el, cached);
            el.style.display = '';
            return;
        }

        let content;

        if (type === 'hijri') {
            content = hijriText(today, isArabic);
        } else {
            content = NDS.date.format(today, {
                locale: isArabic ? 'ar-SA' : 'en-US',
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            });
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
        // A replaced clock element strands the old text node: rebuild into the new one.
        if (clockText?.isConnected) return true;
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
        const [h, m] = NDS.date.format(new Date(), {
            locale: 'en', timeZone: NDS.date.site.timeZone, hour: 'numeric', minute: 'numeric', hourCycle: 'h23'
        }).split(':').map(Number);
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
        const el = document.getElementById('nds-realTimeClock');
        if (!el || !rendered(el)) return;
        updateClock();
        if (!clockTimer) scheduleNextMinute();
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

        // The render runs on every init, so a widget element added or replaced later fills in;
        // the latches guard only the timers and listeners.
        if (dateEl) {
            // Defer the initial render to an idle slot so the Intl/ICU work
            // (formatter construction) doesn't compete with critical resources
            // during post-DCL hydration. The 24h interval and lang-change
            // handler still run inline so they respond promptly when triggered.
            NDS.onIdle(updateDate);
            if (!_dateInitDone) {
                _dateInitDone = true;
                setInterval(updateDate, 24 * 60 * 60 * 1000);
                NDS.onAttrChange('html', ['lang'], updateDate);
            }
        }

        if (clockEl) {
            // Skip the tick loop while the tab is hidden — no point burning
            // per-second DOM mutations no one can see. On resume, startClock()
            // ticks immediately so the time isn't a second stale.
            if (!document.hidden) startClock();
            if (!_clockInitDone) {
                _clockInitDone = true;
                document.addEventListener('visibilitychange', () => {
                    document.hidden ? stopClock() : startClock();
                });
            }
        }

        if ((dateEl || clockEl) && !_resizeInitDone) {
            _resizeInitDone = true;
            NDS.onResize(() => {
                updateDate();
                const el = document.getElementById('nds-realTimeClock');
                if (el && rendered(el) && !document.hidden) startClock(); else stopClock();
            });
        }
    }

    NDS.TimeDate = {
        init: initializeTimeDate,
        updateDate,
        updateClock
    };

    // Note: Initialization now handled by nds-loader.js unified system

})();