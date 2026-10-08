/* NDS.SessionTimeout — public surface
 * Rides: nds-modal (the warning and ended dialogs), nds-countdown (the time left in the warning)
 * Methods:
 *   NDS.SessionTimeout.init(options)   start timing the session; once per page, from the page's own script
 *     timeout   the server's idle timeout, in seconds (required)
 *     warn      seconds before the end to open the warning (default 120, at least 20)
 *     left      seconds left when the server rendered the page (default: timeout), for a server that
 *               does not renew the session on every request
 *     extend    a URL to POST on every extend. A 401 or a redirect ends the session; any other failure
 *               keeps the old deadline. Leave it out and renew in nds:session:extend instead
 *     logout    a URL to go to at the end, and the warning's Sign out link. Without it the ended modal opens
 *     signin    the ended modal's Sign in link (default: this page, which a signed-out visitor leaves for sign-in)
 *     key       the name tabs share the deadline under (default: the extend URL). Give each service with
 *               its own sign-in its own key when they share an origin
 *   NDS.SessionTimeout.extend()        renew the session now: the event, the keep-alive request, a new deadline
 *   NDS.SessionTimeout.reset()         the server just renewed it (the page's own request did): a new deadline only.
 *                                      It also restarts an ended session, after the user signs in again in place
 *   NDS.SessionTimeout.end()           the server says the session is gone: end it now
 *   NDS.SessionTimeout.destroy()       stop the timers and listeners, and close a session modal (a sign-out)
 * Events (on document):
 *   nds:session:extend   detail {reason: 'activity' | 'confirm' | 'api'} — the server session must be renewed now
 *   nds:session:end      detail (none), cancelable — preventDefault() stops the logout redirect or the ended modal;
 *                        the warning then closes
 * Hooks:
 *   (none — the script builds both modals; their text is set through window.NDS_I18N['session-timeout'])
 * Gotchas:
 *   - The deadline is the last renewal plus the timeout, never the last click: activity renews the server
 *     at most once a minute, and only a renewal moves the deadline.
 *   - The modals' text comes from assets/i18n/session-timeout/{lang}.json, loaded at init; each modal is
 *     built when it first opens.
 *   - The warning focuses its box, not its first button: no focus ring until Tab. Enter still presses
 *     the primary button (Modal).
 *   - Every way the warning closes extends the session: its buttons, Escape, the overlay.
 *   - Tabs share the deadline through localStorage, so activity in one tab keeps every tab signed in.
 */

(() => {
    'use strict';

    const WARN_ID = 'ndsSessionWarning';
    const ENDED_ID = 'ndsSessionEnded';

    // English defaults; assets/i18n/session-timeout/{lang}.json overrides them.
    const STR = {
        warning_title: 'Your session is about to end',
        warning_description: 'You have not used the page for a while. When the time runs out, you are signed out and lose any data you have not saved.',
        stay: 'Stay signed in',
        sign_out: 'Sign out',
        ended_title: 'Your session has ended',
        ended_description: 'You were signed out because the page was not used. Sign in again to continue.',
        sign_in: 'Sign in',
    };

    let strings = null;
    const loadStrings = () => strings || (strings = NDS.i18n.load('session-timeout', [])
        .then(data => { NDS.i18n.safeMerge(STR, data); }));

    const t = (key) => NDS.escapeHtml(STR[key]);
    const icon = (name) => `<div class="nds-card-header">
    <div class="nds-card-featured-icon">
      <span class="nds-featured-icon nds-xl nds-circle">
        <i class="nds-icon nds-hgi-${name}" aria-hidden="true"></i>
      </span>
    </div>
  </div>`;

    const warningMarkup = () => `<div id="${WARN_ID}" class="nds-modal nds-card nds-stroke nds-sm nds-center" data-status="warning" role="alertdialog" aria-modal="true" aria-labelledby="${WARN_ID}-title" aria-describedby="${WARN_ID}-desc ${WARN_ID}-countdown" aria-hidden="true" hidden>
  ${icon('alert-circle')}
  <div class="nds-card-content">
    <div class="nds-card-text">
      <span class="nds-card-title" id="${WARN_ID}-title">${t('warning_title')}</span>
      <p class="nds-card-description" id="${WARN_ID}-desc">${t('warning_description')}</p>
      <span class="nds-card-number"><span class="nds-countdown" id="${WARN_ID}-countdown" data-countdown=""><span class="nds-countdown-value" data-unit="m">--</span>:<span class="nds-countdown-value" data-unit="s">--</span></span></span>
    </div>
  </div>
  <div class="nds-card-actions">
    <button type="button" class="nds-btn nds-primary nds-lg" data-modal-close><span class="nds-label">${t('stay')}</span></button>${logoutUrl ? `
    <a class="nds-btn nds-secondary-outline nds-lg" href="${NDS.escapeHtml(logoutUrl)}"><span class="nds-label">${t('sign_out')}</span></a>` : ''}
  </div>
</div>`;

    const endedMarkup = () => `<div id="${ENDED_ID}" class="nds-modal nds-card nds-stroke nds-sm nds-center" data-status="error" data-modal-static role="alertdialog" aria-modal="true" aria-labelledby="${ENDED_ID}-title" aria-describedby="${ENDED_ID}-desc" aria-hidden="true" hidden>
  ${icon('cancel-circle')}
  <div class="nds-card-content">
    <div class="nds-card-text">
      <span class="nds-card-title" id="${ENDED_ID}-title">${t('ended_title')}</span>
      <p class="nds-card-description" id="${ENDED_ID}-desc">${t('ended_description')}</p>
    </div>
  </div>
  <div class="nds-card-actions">
    <a class="nds-btn nds-primary nds-lg" href="${NDS.escapeHtml(signinUrl || location.href)}"><span class="nds-label">${t('sign_in')}</span></a>
  </div>
</div>`;

    // Built when it first opens, then kept for the next time.
    function build(id, markup) {
        if (!document.getElementById(id)) document.body.insertAdjacentHTML('beforeend', markup());
        return document.getElementById(id);
    }

    let _initDone = false;
    let abortController = null;
    let warnEl = null, endedEl = null;
    let timeout, warn, renewEvery, extendUrl, logoutUrl, signinUrl, key;
    let renewed = 0;    // the last renewal the server saw, epoch ms — the session ends at renewed + timeout
    let tried = 0;      // the last extend, epoch ms: a failed one still holds activity off for renewEvery
    let timer = null;
    let warning = false;
    let ended = false;
    let redirected = false;

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
                warnEl = build(WARN_ID, warningMarkup);
                // Before the focus, so a screen reader reads the real time left.
                const countdown = warnEl.querySelector('.nds-countdown');
                if (countdown) NDS.Countdown.set(countdown, Math.ceil(left / 1000));
                NDS.Modal.open(warnEl);
                // Opened by a timer, not the user: focus the box (no ring), so Tab is what shows one.
                warnEl.tabIndex = -1;
                warnEl.focus({ preventScroll: true });
            }
            timer = setTimeout(check, left);
            return;
        }
        // Another tab renewed while ours was warning.
        if (warning) NDS.Modal.close();
        timer = setTimeout(check, left - warn);
    }

    const store = (ms) => { try { localStorage.setItem(key, String(ms)); } catch {} };

    function renew(at) {
        renewed = Math.max(at, stored()); // never behind another tab's renewal
        store(renewed);
        check();
    }

    function extend(reason) {
        if (ended) return;
        const before = renewed;
        tried = Date.now();
        renew(tried);
        const at = renewed;
        document.dispatchEvent(new CustomEvent('nds:session:extend', { detail: { reason } }));
        if (!extendUrl) return;
        NDS.request(extendUrl, { method: 'POST', credentials: 'same-origin', redirect: 'manual' }).catch((err) => {
            // Status 0 is a redirect under redirect: 'manual', the server sending the user to sign in.
            if (err.status === 401 || err.status === 0) return end();
            console.warn('NDS SessionTimeout: the extend request failed; the old deadline stands'
                + (err.status === 403 ? '. A 403 is often a missing CSRF token: renew in nds:session:extend instead' : ''), err);
            // Not renewed after all: back to the old deadline, unless something renewed since.
            // ponytail: other tabs keep the optimistic deadline; their own extend fails or ends it.
            if (renewed === at) { renewed = before; store(before); check(); }
        });
    }

    function end() {
        if (ended) return;
        ended = true;
        clearTimeout(timer);
        const go = document.dispatchEvent(new CustomEvent('nds:session:end', { cancelable: true }));
        if (go && logoutUrl) { redirected = true; location.assign(logoutUrl); }
        // A new dialog, not the warning restyled: opening it moves focus, so the change is announced.
        else if (go) NDS.Modal.open(endedEl = build(ENDED_ID, endedMarkup));
        // Nothing replaced the warning: its Stay button would do nothing now.
        else if (warnEl && NDS.State.has(warnEl, 'open')) NDS.Modal.close();
    }

    function onActivity() {
        if (!warning && !ended && Date.now() - Math.max(renewed, tried) >= renewEvery) extend('activity');
    }

    function init(options) {
        if (_initDone) return;
        const o = options || {};
        timeout = o.timeout * 1000;
        warn = (o.warn || 120) * 1000;
        if (!(timeout > warn)) {
            console.warn('NDS SessionTimeout: init() needs timeout, a number of seconds above warn', o);
            return;
        }
        if (warn < 20000) console.warn('NDS SessionTimeout: a warn under 20 seconds fails WCAG 2.2.1', o);
        _initDone = true;
        // Activity renews before the warning could open, so an active user never sees it.
        renewEvery = Math.min(60000, (timeout - warn) / 2);
        extendUrl = NDS.safeUrl(o.extend);
        logoutUrl = NDS.safeUrl(o.logout);
        signinUrl = NDS.safeUrl(o.signin);
        key = 'nds-session:' + (o.key || extendUrl || '');
        loadStrings();
        // The warning's buttons close through Modal's delegated handlers, unwired on a page with no other modal.
        NDS.Modal.init();

        abortController = new AbortController();
        const { signal } = abortController;
        for (const type of ['pointerdown', 'keydown', 'wheel']) {
            document.addEventListener(type, onActivity, { signal, passive: true, capture: true });
        }
        document.addEventListener('visibilitychange', () => { if (!document.hidden) check(); }, { signal });
        // Back/forward cache restore. Back after the logout redirect would show the old page again: leave again.
        window.addEventListener('pageshow', (e) => { if (e.persisted && redirected) location.replace(logoutUrl); else check(); }, { signal });
        window.addEventListener('storage', (e) => { if (e.key === key) check(); }, { signal });
        document.addEventListener('nds:modal:closed', (e) => {
            if (e.target !== warnEl) return;
            warning = false;
            // Still inside the warning window: the user closed it. Outside it: a renewal closed it.
            if (Date.now() >= renewed + timeout - warn) extend('confirm');
        }, { signal });

        // The page was just served, or a view was just mounted, with `left` seconds left.
        // ponytail: up to the bundle's load delay (~1-3 s) later than the server's clock; a Stay click in
        // that gap gets a 401, which ends the session. The server can pass a smaller `left`.
        const left = parseInt(o.left, 10);
        renew(Date.now() - (left >= 0 ? timeout - Math.min(left * 1000, timeout) : 0));
    }

    function destroy() {
        if (!_initDone) return;
        clearTimeout(timer);
        abortController.abort();
        // A sign-out in a single-page app: no session modal stays up.
        if (warnEl) NDS.Modal.destroy(warnEl);
        if (endedEl) NDS.Modal.destroy(endedEl);
        _initDone = warning = ended = redirected = false;
        renewed = tried = 0;
    }

    NDS.SessionTimeout = {
        init,
        extend: () => _initDone && extend('api'),
        reset: () => {
            if (!_initDone) return;
            if (ended && endedEl && NDS.State.has(endedEl, 'open')) NDS.Modal.close();
            ended = false;
            renew(Date.now());
        },
        end: () => _initDone && end(),
        destroy
    };
})();
