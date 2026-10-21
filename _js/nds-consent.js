/* NDS.consent — public surface
 * Rides: (none — a base: the consent store). Its UI is NDS.Cookies (nds-cookies.js).
 * Methods:
 *   NDS.consent.get()                 'accepted' | 'declined' | 'custom' | null
 *   NDS.consent.isAllowed(category)   true when the visitor allowed it; 'necessary' always is
 *   NDS.consent.set(categories)       store a choice: true (all), false (none) or an array of
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
 *     Any other category only reaches isAllowed() and the event.
 *   - Denying performance sets window['ga-disable-<id>'] for every tracking id and clears
 *     _ga, _gid, _gat. Denying targeting clears _fbp, _fbc.
 *   - Stored as nds-consent (NDS.cookie): 'accepted', 'declined', or the allowed categories comma-joined.
 */
(() => {
    'use strict';

    const KEY = 'nds-consent';
    const gtagSignals = {
        performance: ['analytics_storage'],
        functional: ['functionality_storage', 'personalization_storage'],
        targeting: ['ad_storage', 'ad_user_data', 'ad_personalization'],
    };
    // Name prefixes: GA4 sets _ga_<id>, Ads sets _gcl_au.
    const trackers = { performance: ['_ga', '_gid', '_gat'], targeting: ['_gcl', '_fbp', '_fbc'] };

    function get() {
        const value = NDS.cookie.get(KEY);
        return !value ? null : (value === 'accepted' || value === 'declined') ? value : 'custom';
    }

    function isAllowed(category) {
        if (category === 'necessary') return true;
        const value = NDS.cookie.get(KEY);
        return value === 'accepted' || (!!value && value !== 'declined' && value.split(',').includes(category));
    }

    // Read on every call: an id registered after the bundle must still be disabled.
    function getTrackingIds() {
        const ids = [].concat(window.GA_TRACKING_ID || []);
        document.querySelectorAll('[data-ga-tracking-id]').forEach(el => {
            if (el.dataset.gaTrackingId && !ids.includes(el.dataset.gaTrackingId)) ids.push(el.dataset.gaTrackingId);
        });
        return ids;
    }

    function syncConsent() {
        const performanceAllowed = isAllowed('performance');
        // The flag is in-memory only, so it is set again on every load.
        getTrackingIds().forEach(id => { window['ga-disable-' + id] = !performanceAllowed; });
        const names = document.cookie.split(';').map(cookie => cookie.split('=')[0].trim());
        Object.keys(trackers).forEach(category => {
            if (!isAllowed(category)) names.filter(cookieName => trackers[category].some(prefix => cookieName.startsWith(prefix))).forEach(NDS.cookie.delete);
        });
        if (typeof gtag === 'function') {
            const update = {};
            Object.keys(gtagSignals).forEach(category => gtagSignals[category].forEach(signal => { update[signal] = isAllowed(category) ? 'granted' : 'denied'; }));
            gtag('consent', 'update', update);
        }
    }

    function set(choice) {
        const list = Array.isArray(choice) ? choice.filter(category => category !== 'necessary') : [];
        NDS.cookie.set(KEY, choice === true ? 'accepted' : list.length ? list.join(',') : 'declined', 365);
        syncConsent();
        const categories = { necessary: true };
        Object.keys(gtagSignals).concat(list).forEach(category => { categories[category] = isAllowed(category); });
        // The hook for anything NDS does not know (Clarity, a vendor pixel): the listener owns its SDK.
        document.dispatchEvent(new CustomEvent('nds:cookies:consent', {
            detail: { consent: get(), categories },
        }));
    }

    syncConsent();

    NDS.consent = { get, isAllowed, set };
})();
