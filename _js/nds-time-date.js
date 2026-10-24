/* NDS.TimeDate — public surface
 * Rides: (none — base component)
 * Methods:
 *   NDS.TimeDate.init()                     wire the date widget and the clock, if present
 *   NDS.TimeDate.syncDate()                 re-render the date now
 *   NDS.TimeDate.syncClock()                re-render the clock now
 * Events:
 *   (none)
 * Hooks:
 *   ids, not attributes: #nds-date (the date line) · #nds-real-time-clock (the clock)
 *   data-calendar   on #nds-date or any ancestor: hijri | gregory. Default follows the page language
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
    const bandAlias = { sm: 'mobile', md: 'tablet', lg: 'desktop' };
    function isRendered(el) {
        const tokens = (el.dataset.hidden || '').split(/\s+/);
        if (tokens.includes('sr')) return true;
        const isBreakpoint = (query) => window.matchMedia(NDS.breakpoints[query]).matches;
        const band = isBreakpoint('mobile') ? 'sm' : isBreakpoint('tablet-max') ? 'md' : isBreakpoint('desktop-max') ? 'lg' : 'xl';
        return !tokens.includes(band) && !tokens.includes(bandAlias[band]);
    }
    // Built imperatively: the text flows through textContent, never the HTML parser.
    function renderDate(parent, content) {
        const icon = document.createElement('i');
        icon.className = 'nds-icon nds-hgi-calendar-03';
        NDS.aria.hidden(icon, true);
        const item = document.createElement('span');
        item.className = 'nds-meta-item';
        item.append(icon, content);
        parent.replaceChildren(item);
    }

    // English defaults; the assets/i18n/{lang}.json pack overrides them.
    const strings = NDS.i18n.getStrings('time-date', {
        hijri_date: '{month} {day}, {year} AH',
    });

    // Month names from NDS.Date: Android's ICU names Umm al-Qura months from the Gregorian set.
    function formatHijriText(day) {
        const parts = NDS.Date.toParts(day, 'hijri');
        return strings.text('hijri_date', { day: parts.day, month: NDS.Date.getMonthNames('hijri')[parts.month - 1], year: parts.year });
    }

    // The site's wall clock, [h, m, s]. No data-timezone = the visitor's.
    function getZoneTime() {
        return NDS.Date.format(new Date(), {
            locale: 'en', timeZone: NDS.Date.site.timeZone,
            hour: 'numeric', minute: 'numeric', second: 'numeric', hourCycle: 'h23'
        }).split(':').map(Number);
    }

    // Render again at the site's next midnight. A sleeping laptop fires it on wake.
    let dateTimer = null;
    function scheduleMidnight() {
        clearTimeout(dateTimer);
        const [hours, minutes, seconds] = getZoneTime();
        dateTimer = setTimeout(syncDate, 864e5 - (hours * 3600 + minutes * 60 + seconds) * 1000 + 1000);
    }

    function syncDate() {
        const el = document.getElementById('nds-date');
        if (!el || !isRendered(el)) return;
        // The authored placeholder stays until the month names land.
        if (!strings.ready()) { strings.load().then(syncDate); return; }
        scheduleMidnight();

        const isArabic = NDS.isArabic;
        const today = NDS.Date.getToday();
        const type = NDS.Date.getCalendar(el, isArabic ? 'hijri' : 'gregory');
        renderDate(el, type === 'hijri'
            ? formatHijriText(today)
            : NDS.Date.format(today, {
                locale: isArabic ? 'ar-SA' : undefined, // undefined = the page's lang
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

    function ensureClockDom() {
        // A replaced clock element strands the old text node: rebuild into the new one.
        if (clockText?.isConnected) return true;
        const el = document.getElementById('nds-real-time-clock');
        if (!el) return false;
        const icon = document.createElement('i');
        icon.className = 'nds-icon nds-hgi-clock-01';
        NDS.aria.hidden(icon, true);
        clockText = document.createTextNode('');
        const item = document.createElement('span');
        item.className = 'nds-meta-item';
        item.append(icon, clockText);
        el.replaceChildren(item);
        return true;
    }

    function syncClock() {
        if (!ensureClockDom()) return;
        const [hours, minutes] = getZoneTime();
        clockText.nodeValue = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
    }

    function scheduleNextMinute() {
        const now = new Date();
        const msUntilNext = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
        clockTimer = setTimeout(() => {
            syncClock();
            scheduleNextMinute();
        }, msUntilNext);
    }

    function startClock() {
        const el = document.getElementById('nds-real-time-clock');
        if (!el || !isRendered(el)) return;
        syncClock();
        if (!clockTimer) scheduleNextMinute();
    }

    function stopClock() {
        if (!clockTimer) return;
        clearTimeout(clockTimer);
        clockTimer = null;
    }

    // Per-branch init guards. A re-run of init (e.g. NDS.init.initialize())
    // would otherwise re-stack NDS.onAttributeChange (no dedup in core)
    // and document.addEventListener('visibilitychange')
    // (no removal path) on every re-call. The date and clock topbar widgets can
    // appear independently, so the latches are separate — a page that ships
    // only one widget can still wire the other if it's injected later.
    let dateInitDone = false;
    let clockInitDone = false;
    let resizeInitDone = false;

    function setupTimeDate() {
        const dateEl = document.getElementById('nds-date');
        const clockEl = document.getElementById('nds-real-time-clock');

        // The render runs on every init, so a widget element added or replaced later fills in;
        // the latches guard only the timers and listeners.
        if (dateEl) {
            // Defer the initial render to an idle slot so the Intl/ICU work
            // (formatter construction) doesn't compete with critical resources
            // during post-DCL hydration. The lang-change handler still runs
            // inline so it responds promptly when triggered.
            NDS.onIdle(syncDate);
            if (!dateInitDone) {
                dateInitDone = true;
                NDS.onAttributeChange('html', ['lang'], syncDate);
            }
        }

        if (clockEl) {
            // Skip the tick loop while the tab is hidden — no point burning
            // per-second DOM mutations no one can see. On resume, startClock()
            // ticks immediately so the time isn't a second stale.
            if (!document.hidden) startClock();
            if (!clockInitDone) {
                clockInitDone = true;
                document.addEventListener('visibilitychange', () => {
                    document.hidden ? stopClock() : startClock();
                });
            }
        }

        if ((dateEl || clockEl) && !resizeInitDone) {
            resizeInitDone = true;
            NDS.onResize(() => {
                syncDate();
                const el = document.getElementById('nds-real-time-clock');
                if (el && isRendered(el) && !document.hidden) startClock(); else stopClock();
            });
        }
    }

    NDS.TimeDate = {
        init: setupTimeDate,
        syncDate,
        syncClock
    };

    // Note: Initialization now handled by nds-loader.js unified system

})();