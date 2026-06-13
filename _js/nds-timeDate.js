// Time & Date - Simplified with Core Functions
(() => {
    'use strict';

    // Intl.DateTimeFormat construction does the expensive ICU locale init;
    // format()/formatToParts() on an existing instance is cheap. Memoize one
    // formatter per (locale, options) so repeated renders never rebuild it.
    const _fmtCache = new Map();
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

    // Hijri date via Intl's Umm al-Qura calendar — the official Saudi calendar,
    // computed locally (no network). Stays async to preserve the Promise
    // contract consumers rely on (date-picker calls .then on it). Latin digits
    // (nu-latn) match the topbar clock and the previous output. Formatters are
    // memoized by dtf(), so repeat calls don't rebuild the (costly) ICU data.
    async function getHijriDate(isArabic, returnStructured = false) {
        const date = new Date();

        if (returnStructured) {
            // numeric parts via a latin-digit locale so parseInt is safe
            const parts = dtf('en-US-u-ca-islamic-umalqura', {
                day: 'numeric', month: 'numeric', year: 'numeric'
            }).formatToParts(date);
            const num = type => parseInt(parts.find(p => p.type === type).value, 10);
            return { day: num('day'), month: num('month'), year: num('year') };
        }

        const locale = isArabic
            ? 'ar-SA-u-ca-islamic-umalqura-nu-latn'
            : 'en-US-u-ca-islamic-umalqura';
        const formatted = dtf(locale, {
            day: 'numeric', month: 'long', year: 'numeric'
        }).format(date);
        const suffix = isArabic ? 'هـ' : 'AH';
        return formatted.includes(suffix) ? formatted : `${formatted} ${suffix}`;
    }

    // Date function with caching
    async function updateDate() {
        const el = document.getElementById('nds-date');
        if (!el) return;

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
    }

    if (typeof window !== 'undefined') {
        NDS.TimeDate = {
            init: initializeTimeDate,
            getHijriDate,
            updateDate,
            updateClock
        };
    }

    // Note: Initialization now handled by nds-loader.js unified system

})();