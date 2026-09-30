/* NDS.Cookies — public surface
 * Rides: (none — base utility). The consent UI is NDS.CookieConsent (nds-cookie-consent.js).
 * Methods:
 *   NDS.Cookies.set(name, value, days)  write a cookie — no consent check, so essential values only
 *   NDS.Cookies.get(name)               read one
 *   NDS.Cookies.delete(name)            remove one, on this host and every parent domain
 *   NDS.Cookies.getConsent()            'accepted' | 'declined' | 'custom' | null
 *   NDS.Cookies.allowed(category)       true when the visitor allowed it; 'necessary' always is
 *   NDS.Cookies.save(categories)        store a choice: true (all), false (none) or an array of
 *                                       allowed categories; applies it and fires the event
 *   NDS.Cookies.show(view?)             open the consent panel — 'notice' (default) or 'manage'
 * Events:
 *   nds:cookies:consent   on document — detail { consent, categories: { necessary, performance, … } }
 * Hooks:
 *   data-ga-tracking-id   on any element — a GA id to disable while performance is denied
 *                         (window.GA_TRACKING_ID, a string or an array, works too)
 * Gotchas:
 *   - Consent is applied when the FILE LOADS: anything but an allowed category is denied, so a
 *     visitor who has not chosen yet is treated as declined.
 *   - NDS only SIGNALS. It reaches gtag and the tracking ids it was given; it cannot block a
 *     tracker, and it runs deferred, after the consumer's head snippet has fired.
 *   - gtag keys: performance → analytics_storage · functional → functionality_storage,
 *     personalization_storage · targeting → ad_storage, ad_user_data, ad_personalization.
 *     Any other category only reaches allowed() and the event.
 *   - Denying performance sets window['ga-disable-<id>'] for every tracking id and clears
 *     _ga, _gid, _gat. Denying targeting clears _fbp, _fbc.
 *   - Stored as cookieConsent: 'accepted', 'declined', or the allowed categories comma-joined.
 *   - Under file:// there are no cookies: values fall back to NDS.cache (localStorage).
 */
(() => {
    'use strict';

    const isLocalFile = window.location.protocol === 'file:';
    const KEY = 'cookieConsent';
    const GTAG = {
        performance: ['analytics_storage'],
        functional: ['functionality_storage', 'personalization_storage'],
        targeting: ['ad_storage', 'ad_user_data', 'ad_personalization'],
    };
    const TRACKERS = { performance: ['_ga', '_gid', '_gat'], targeting: ['_fbp', '_fbc'] };

    function set(name, value, days) {
        // NDS.cache keeps the nds_ prefix + {value, expires} envelope of earlier builds.
        if (isLocalFile) return NDS.cache.set(name, value, days * 1440);
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = `${name}=${value};expires=${expires};path=/;SameSite=Lax`;
    }

    function get(name) {
        if (isLocalFile) return NDS.cache.get(name);
        const prefix = name + '=';
        const hit = document.cookie.split(';').map(c => c.trim()).find(c => c.startsWith(prefix));
        return hit ? hit.slice(prefix.length) : null;
    }

    function del(name) {
        if (isLocalFile) return NDS.cache.clear(name);
        const expired = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
        document.cookie = expired;
        // Trackers set theirs on the root domain (_ga on .example.com), which a delete on
        // www. alone misses. The browser ignores the bare public suffix.
        const labels = window.location.hostname.split('.');
        for (let i = 0; i < labels.length - 1; i++) {
            document.cookie = expired + '; domain=' + labels.slice(i).join('.');
        }
    }

    function getConsent() {
        const v = get(KEY);
        return !v ? null : (v === 'accepted' || v === 'declined') ? v : 'custom';
    }

    function allowed(category) {
        if (category === 'necessary') return true;
        const v = get(KEY);
        return v === 'accepted' || (!!v && v !== 'declined' && v.split(',').includes(category));
    }

    // Read on every call: an id registered after the bundle must still be disabled.
    function trackingIds() {
        const ids = [].concat(window.GA_TRACKING_ID || []);
        document.querySelectorAll('[data-ga-tracking-id]').forEach(el => {
            if (el.dataset.gaTrackingId && !ids.includes(el.dataset.gaTrackingId)) ids.push(el.dataset.gaTrackingId);
        });
        return ids;
    }

    function apply() {
        const perf = allowed('performance');
        // The flag is in-memory only, so it is set again on every load.
        trackingIds().forEach(id => { window['ga-disable-' + id] = !perf; });
        Object.keys(TRACKERS).forEach(c => { if (!allowed(c)) TRACKERS[c].forEach(del); });
        if (typeof gtag === 'function') {
            const update = {};
            Object.keys(GTAG).forEach(c => GTAG[c].forEach(k => { update[k] = allowed(c) ? 'granted' : 'denied'; }));
            gtag('consent', 'update', update);
        }
    }

    function save(choice) {
        const list = Array.isArray(choice) ? choice.filter(c => c !== 'necessary') : [];
        set(KEY, choice === true ? 'accepted' : list.length ? list.join(',') : 'declined', 365);
        apply();
        const categories = { necessary: true };
        Object.keys(GTAG).concat(list).forEach(c => { categories[c] = allowed(c); });
        // The hook for anything NDS does not know (Clarity, a vendor pixel): the listener owns its SDK.
        document.dispatchEvent(new CustomEvent('nds:cookies:consent', {
            detail: { consent: getConsent(), categories },
        }));
    }

    apply();

    NDS.Cookies = {
        set,
        get,
        delete: del,
        getConsent,
        allowed,
        save,
        show: (view) => NDS.CookieConsent?.open?.(view),
    };
})();
