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
 *   - The date renders again at the site's midnight, so a tab left open changes day on time.
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
    // Built imperatively: the text flows through textContent, never the HTML parser.
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

    // English defaults; the assets/i18n/{lang}.json pack overrides them.
    const strings = NDS.i18n.strings('time-date', {
        hijri_date: '{month} {day}, {year} AH',
    });

    // Month names from NDS.date: Android's ICU names Umm al-Qura months from the Gregorian set.
    function hijriText(day) {
        const [d, m, y] = NDS.date.format(day, { calendar: 'hijri', format: 'D M YYYY' }).split(' ');
        return strings.t('hijri_date', { day: d, month: NDS.date.monthNames('hijri')[m - 1], year: y });
    }

    // The site's wall clock, [h, m, s]. No data-timezone = the visitor's.
    function zoneTime() {
        return NDS.date.format(new Date(), {
            locale: 'en', timeZone: NDS.date.site.timeZone,
            hour: 'numeric', minute: 'numeric', second: 'numeric', hourCycle: 'h23'
        }).split(':').map(Number);
    }

    // Render again at the site's next midnight. A sleeping laptop fires it on wake.
    let dateTimer = null;
    function scheduleMidnight() {
        clearTimeout(dateTimer);
        const [h, m, s] = zoneTime();
        dateTimer = setTimeout(updateDate, 864e5 - (h * 3600 + m * 60 + s) * 1000 + 1000);
    }

    function updateDate() {
        const el = document.getElementById('nds-date');
        if (!el || !rendered(el)) return;
        // The authored placeholder stays until the month names land.
        if (!strings.ready()) { strings.load().then(updateDate); return; }
        scheduleMidnight();

        const isArabic = NDS.isArabic;
        const today = NDS.date.today();
        const type = el.dataset?.calendar || (isArabic ? 'hijri' : 'gregorian');
        renderDate(el, type === 'hijri'
            ? hijriText(today)
            : NDS.date.format(today, {
                locale: isArabic ? 'ar-SA' : 'en-US',
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            }));
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
        const [h, m] = zoneTime();
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
    // would otherwise re-stack NDS.onAttrChange (no dedup in core)
    // and document.addEventListener('visibilitychange')
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
            // during post-DCL hydration. The lang-change handler still runs
            // inline so it responds promptly when triggered.
            NDS.onIdle(updateDate);
            if (!_dateInitDone) {
                _dateInitDone = true;
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