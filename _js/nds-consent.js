/* NDS.consent — public surface
 * Rides: (none — a base: the consent store). Its UI is NDS.Cookies (nds-cookies.js).
 * Methods:
 *   NDS.consent.get()                 'accepted' | 'declined' | 'custom' | null
 *   NDS.consent.allowed(category)     true when the visitor allowed it; 'necessary' always is
 *   NDS.consent.save(categories)      store a choice: true (all), false (none) or an array of
 *                                     allowed categories; applies it and fires the event
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
 *   - Stored as cookieConsent (NDS.cookie): 'accepted', 'declined', or the allowed categories comma-joined.
 */
(() => {
    'use strict';

    const KEY = 'cookieConsent';
    const GTAG = {
        performance: ['analytics_storage'],
        functional: ['functionality_storage', 'personalization_storage'],
        targeting: ['ad_storage', 'ad_user_data', 'ad_personalization'],
    };
    // Name prefixes: GA4 sets _ga_<id>, Ads sets _gcl_au.
    const TRACKERS = { performance: ['_ga', '_gid', '_gat'], targeting: ['_gcl', '_fbp', '_fbc'] };

    function get() {
        const v = NDS.cookie.get(KEY);
        return !v ? null : (v === 'accepted' || v === 'declined') ? v : 'custom';
    }

    function allowed(category) {
        if (category === 'necessary') return true;
        const v = NDS.cookie.get(KEY);
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
        const names = document.cookie.split(';').map(c => c.split('=')[0].trim());
        Object.keys(TRACKERS).forEach(c => {
            if (!allowed(c)) names.filter(n => TRACKERS[c].some(p => n.startsWith(p))).forEach(NDS.cookie.delete);
        });
        if (typeof gtag === 'function') {
            const update = {};
            Object.keys(GTAG).forEach(c => GTAG[c].forEach(k => { update[k] = allowed(c) ? 'granted' : 'denied'; }));
            gtag('consent', 'update', update);
        }
    }

    function save(choice) {
        const list = Array.isArray(choice) ? choice.filter(c => c !== 'necessary') : [];
        NDS.cookie.set(KEY, choice === true ? 'accepted' : list.length ? list.join(',') : 'declined', 365);
        apply();
        const categories = { necessary: true };
        Object.keys(GTAG).concat(list).forEach(c => { categories[c] = allowed(c); });
        // The hook for anything NDS does not know (Clarity, a vendor pixel): the listener owns its SDK.
        document.dispatchEvent(new CustomEvent('nds:cookies:consent', {
            detail: { consent: get(), categories },
        }));
    }

    apply();

    NDS.consent = { get, allowed, save };
})();
