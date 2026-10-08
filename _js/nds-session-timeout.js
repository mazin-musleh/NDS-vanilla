/* NDS.SessionTimeout — public surface
 * Rides: nds-modal (the warning dialog), nds-countdown (the time left inside it)
 * Methods:
 *   NDS.SessionTimeout.init()          wire the first .nds-modal[data-session-timeout] on the page
 *   NDS.SessionTimeout.extend()        renew the session now: the event, the keep-alive request, a new deadline
 *   NDS.SessionTimeout.reset()         the server just renewed it (the page's own request did): a new deadline only
 *   NDS.SessionTimeout.destroy(root)   stop the timers and listeners when root holds the modal
 * Events (bubble from the .nds-modal):
 *   nds:session:extend   detail {reason: 'activity' | 'confirm' | 'api'} — the server session must be renewed now
 *   nds:session:end      detail (none), cancelable — preventDefault() stops the logout redirect or the ended modal
 * Hooks:
 *   data-session-timeout   on the .nds-modal — the server's idle timeout, in seconds
 *   data-session-warn      seconds before the end to open the warning (default 120, at least 20)
 *   data-session-extend    a URL to POST on every extend. A 401 or 403 ends the session; any other failure
 *                          keeps the old deadline. Leave it off and renew in nds:session:extend instead
 *   data-session-logout    a URL to go to at the end
 *   data-session-ended     the id of a modal to open at the end instead, when there is no logout URL:
 *                          a static error modal with a sign-in link (a <template> holding it works)
 *   data-session-key       the name tabs share the deadline under (default: the extend URL). Give each
 *                          service with its own sign-in its own key when they share a domain
 *   .nds-countdown         inside the modal, with data-countdown="": started at the time left when the warning
 *                          opens, so it fires no countdown events before
 * Gotchas:
 *   - The deadline is the last renewal plus the timeout, never the last click: activity renews the server
 *     at most once a minute, and only a renewal moves the deadline.
 *   - The warning focuses its box, not its first button: no focus ring until Tab. Enter still presses
 *     the primary button (Modal).
 *   - Every way the warning closes extends the session: its buttons, Escape, the overlay. A sign-out
 *     control is a plain link to the logout URL.
 *   - Tabs share the deadline through localStorage, so activity in one tab keeps every tab signed in.
 */

(() => {
    'use strict';

    let _initDone = false;
    let abortController = null;
    let modal, countdown, timeout, warn, renewEvery, extendUrl, logoutUrl, endedId, key;
    let renewed = 0;    // the last renewal the server saw, epoch ms — the session ends at renewed + timeout
    let timer = null;
    let warning = false;
    let ended = false;

    const stored = () => { try { return +localStorage.getItem(key) || 0; } catch { return 0; } };

    // One timeout to the next edge: the warning, then the end. Hidden, asleep or restored tabs re-check on return.
    function check() {
        clearTimeout(timer);
        if (ended) return;
        renewed = Math.max(renewed, stored()); // another tab may have renewed
        const left = renewed + timeout - Date.now();
        if (left <= 0) return end();
        if (left <= warn) {
            if (!warning) {
                warning = true;
                // Before the focus, so a screen reader reads the real time left.
                if (countdown) NDS.Countdown.set(countdown, Math.ceil(left / 1000));
                NDS.Modal.open(modal);
                // Opened by a timer, not the user: focus the box (no ring), so Tab is what shows one.
                modal.tabIndex = -1;
                modal.focus({ preventScroll: true });
            }
            timer = setTimeout(check, left);
            return;
        }
        // Another tab renewed while ours was warning.
        if (warning) NDS.Modal.close();
        timer = setTimeout(check, left - warn);
    }

    const store = (t) => { try { localStorage.setItem(key, String(t)); } catch {} };

    function renew(at) {
        renewed = Math.max(at, stored()); // never behind another tab's renewal
        store(renewed);
        check();
    }

    function extend(reason) {
        if (ended) return;
        const before = renewed;
        renew(Date.now());
        const at = renewed;
        modal.dispatchEvent(new CustomEvent('nds:session:extend', { bubbles: true, detail: { reason } }));
        if (!extendUrl) return;
        NDS.request(extendUrl, { method: 'POST', credentials: 'same-origin' }).catch((err) => {
            if (err.status === 401 || err.status === 403) return end();
            console.warn('NDS SessionTimeout: the extend request failed; the old deadline stands', err);
            // Not renewed after all: back to the old deadline, unless something renewed since.
            // ponytail: other tabs keep the optimistic deadline; their own extend fails or ends it.
            if (renewed === at) { renewed = before; store(before); check(); }
        });
    }

    function end() {
        if (ended) return;
        ended = true;
        clearTimeout(timer);
        const go = modal.dispatchEvent(new CustomEvent('nds:session:end', { bubbles: true, cancelable: true }));
        if (!go) return;
        if (logoutUrl) location.assign(logoutUrl);
        // A new dialog, not the warning restyled: opening it moves focus, so the change is announced.
        else if (endedId) NDS.Modal.open(endedId);
    }

    function onActivity() {
        if (!warning && !ended && Date.now() - renewed >= renewEvery) extend('activity');
    }

    function init() {
        if (_initDone) return;
        modal = document.querySelector('.nds-modal[data-session-timeout]');
        if (!modal) return;
        timeout = parseInt(modal.getAttribute('data-session-timeout'), 10) * 1000;
        warn = (parseInt(modal.getAttribute('data-session-warn'), 10) || 120) * 1000;
        if (!(timeout > warn)) {
            console.warn('NDS SessionTimeout: data-session-timeout must be a number of seconds above data-session-warn', modal);
            return;
        }
        if (warn < 20000) console.warn('NDS SessionTimeout: data-session-warn under 20 seconds fails WCAG 2.2.1', modal);
        _initDone = true;
        // Activity renews before the warning could open, so an active user never sees it.
        renewEvery = Math.min(60000, (timeout - warn) / 2);
        countdown = modal.querySelector('.nds-countdown');
        extendUrl = NDS.safeUrl(modal.getAttribute('data-session-extend'));
        logoutUrl = NDS.safeUrl(modal.getAttribute('data-session-logout'));
        endedId = modal.getAttribute('data-session-ended');
        key = 'nds-session:' + (modal.getAttribute('data-session-key') || extendUrl || '');

        abortController = new AbortController();
        const { signal } = abortController;
        for (const type of ['pointerdown', 'keydown', 'wheel']) {
            document.addEventListener(type, onActivity, { signal, passive: true, capture: true });
        }
        document.addEventListener('visibilitychange', () => { if (!document.hidden) check(); }, { signal });
        window.addEventListener('pageshow', check, { signal }); // back/forward cache restore
        window.addEventListener('storage', (e) => { if (e.key === key) check(); }, { signal });
        modal.addEventListener('nds:modal:closed', () => {
            warning = false;
            // Still inside the warning window: the user closed it. Outside it: a renewal closed it.
            if (Date.now() >= renewed + timeout - warn) extend('confirm');
        }, { signal });

        // The session starts now: the page was just served, or a view was just mounted.
        // ponytail: up to the bundle's load delay (~1-3 s) later than the server's clock; a Stay click in
        // that gap gets a 401, which ends the session. A server-rendered deadline attribute would close it.
        renew(Date.now());
    }

    function destroy(root) {
        if (!_initDone || (root && root !== document && !root.contains(modal))) return;
        clearTimeout(timer);
        abortController.abort();
        _initDone = warning = ended = false;
        renewed = 0;
    }

    NDS.SessionTimeout = {
        init,
        extend: () => _initDone && extend('api'),
        reset: () => _initDone && !ended && renew(Date.now()),
        destroy
    };
})();
