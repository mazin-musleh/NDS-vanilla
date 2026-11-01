/* NDS.Clock — public surface
 * Rides: (none — base component)
 * Methods:
 *   NDS.Clock.init()      write every clock and start the minute tick
 * Events:
 *   (none)
 * Hooks:
 *   time.nds-clock        the clock: the script writes its datetime and its text (h:mm AM)
 * Gotchas:
 *   - The clock follows <html data-timezone>; without it, the visitor's clock.
 *   - One tick for every clock, at the turn of the minute. It stops while the tab is hidden
 *     or no clock shows, and catches up when one does.
 *   - A clock hidden by a data-hidden band is not written.
 *   - A clock added later shows at once after init() (the loader runs it on mount()), else on the
 *     next tick while one runs.
 */
(() => {
    'use strict';

    const SELECTOR = 'time.nds-clock';

    // The site's wall clock, [h, m]. No data-timezone = the visitor's.
    function getZoneTime() {
        return NDS.Date.format(new Date(), {
            locale: 'en', timeZone: NDS.Date.site.timeZone,
            hour: 'numeric', minute: 'numeric', hourCycle: 'h23',
        }).split(':').map(Number);
    }

    // Writes the shown clocks; false when none shows, so the tick can stop.
    function syncClocks() {
        const clocks = [...document.querySelectorAll(SELECTOR)].filter((clock) => !NDS.isBandHidden(clock));
        if (!clocks.length) return false;
        const [hours, minutes] = getZoneTime();
        const pad = (n) => String(n).padStart(2, '0');
        const text = `${hours % 12 || 12}:${pad(minutes)} ${hours >= 12 ? 'PM' : 'AM'}`;
        clocks.forEach((clock) => {
            if (clock.textContent !== text) clock.textContent = text;
            clock.setAttribute('datetime', `${pad(hours)}:${pad(minutes)}`);
        });
        return true;
    }

    let tickTimer = null;
    function scheduleTick() {
        const now = new Date();
        tickTimer = setTimeout(() => {
            tickTimer = null;
            startTick();
        }, (60 - now.getSeconds()) * 1000 - now.getMilliseconds());
    }

    function startTick() {
        if (document.hidden || !syncClocks()) return stopTick();
        if (!tickTimer) scheduleTick();
    }

    function stopTick() {
        clearTimeout(tickTimer);
        tickTimer = null;
    }

    let initDone = false;
    function init() {
        startTick();
        if (initDone) return;
        initDone = true;
        document.addEventListener('visibilitychange', startTick);
        // A clock hidden on a phone shows on a wider screen.
        NDS.onResize(startTick);
    }

    NDS.Clock = { init };
})();
