/* NDS.Cookies — public surface
 * Rides: nds-alert (the confirmation toast after accept or decline)
 * Methods:
 *   NDS.Cookies.init()                wire the consent popup buttons; show the popup after
 *                                     6 seconds when no choice has been made yet
 *   NDS.Cookies.set(name, value, days) write a cookie — no consent check, so essential
 *                                     values only
 *   NDS.Cookies.get(name)             read one
 *   NDS.Cookies.delete(name)          remove one
 *   NDS.Cookies.getConsent()          'accepted' | 'declined' | null
 *   NDS.Cookies.show()                open the consent popup now
 * Events:
 *   nds:cookies:consent   on #ndsCookiesPopup, bubbles — detail.consent is 'accepted' or
 *                         'declined'. Closing the popup is not a choice and fires nothing
 * Hooks:
 *   ids, not attributes:  #ndsCookiesPopup · #ndsCookiesAcceptBtn · #ndsCookiesDeclineBtn
 *                         · #ndsCookiesCloseBtn
 *   data-accept-title · data-accept-message     on the accept button — toast text
 *   data-decline-title · data-decline-message   on the decline button — toast text
 *   data-ga-tracking-id                         on any element; adds an id to disable on
 *                                               decline (window.GA_TRACKING_ID works too)
 * Gotchas:
 *   - Consent is applied when the FILE LOADS, before init() — anything but a stored
 *     'accepted' denies, so a visitor who has not chosen yet is treated as declined.
 *   - NDS only SIGNALS. It reaches gtag and the ids it was given; it cannot block a
 *     tracker, and it runs deferred, after the consumer's head snippet has fired.
 *   - Closing the popup denies too, and hides it for 30 minutes under
 *     cookieConsentDismissed. That key is never read as consent.
 *   - Declining sets window['ga-disable-<id>'] for every tracking id it finds and clears
 *     _ga, _gid, _gat, _fbp and _fbc.
 *   - Under file:// there are no cookies: values fall back to NDS.cache (localStorage).
 */
/**
 * NDS Cookie Management System
 *
 * Cookie Categories:
 *
 * 1. ESSENTIAL/FUNCTIONAL COOKIES (No consent required):
 *    - cookieConsent: Stores user's cookie preference
 *    - nds-feedback_*: User feedback submission status per page
 *    These cookies are necessary for the website to function properly
 *
 * 2. ANALYTICS COOKIES (Consent required):
 *    - _ga, _gid, _gat: Google Analytics tracking
 *    - _fbp, _fbc: Facebook Pixel tracking
 *    These are disabled when user declines cookies
 *
 * Usage:
 * - Essential cookies can be set anytime using NDSCookies.set()
 * - Analytics cookies are controlled by consent state
 * - Check consent with NDSCookies.getConsent()
 */
// Cookie Management
(() => {
    'use strict';

    // Use localStorage fallback when opened as local file (file:// protocol)
    const isLocalFile = window.location.protocol === 'file:';

    const ndsGetCookieConsent = () => ndsGetCookie('cookieConsent');
    const ndsSetCookieConsent = (value) => ndsSetCookie('cookieConsent', value, 365);

    // Dismissing without choosing isn't consent — it only silences the popup for a
    // while, so non-essential cookies stay off until the user actually accepts.
    const DISMISS_KEY = 'cookieConsentDismissed';
    const DISMISS_MINUTES = 30;

    function ndsSetCookie(name, value, days) {
        if (isLocalFile) {
            // NDS.cache uses the same nds_ prefix + {value, expires} envelope,
            // so entries stored by earlier builds stay readable.
            NDS.cache.set(name, value, days * 1440);
            return;
        }
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    }

    function ndsGetCookie(name) {
        if (isLocalFile) return NDS.cache.get(name);
        const cookiePrefix = name + "=";
        const cookieArray = document.cookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i].trim();
            if (cookie.indexOf(cookiePrefix) === 0) {
                return cookie.substring(cookiePrefix.length);
            }
        }
        return null;
    }



    // The consent hook for anything NDS doesn't know about (Clarity, Hotjar, a
    // vendor pixel): NDS only signals the choice, the listener owns its own SDK.
    function ndsEmitConsent(consent) {
        (document.getElementById('ndsCookiesPopup') || document)
            .dispatchEvent(new CustomEvent('nds:cookies:consent', {
                detail: { consent }, bubbles: true
            }));
    }

    function ndsAcceptCookies() {
        ndsSetCookieConsent('accepted');
        ndsEnableAllCookies();
        ndsEmitConsent('accepted');
        ndsCookiesClosePopup();

        // Detect page language
        const isArabic = NDS.isArabic;

        // Get message and title from data attributes or use language-specific defaults
        const acceptBtn = document.getElementById('ndsCookiesAcceptBtn');
        const defaultTitle = isArabic ? 'تم القبول' : 'Accepted';
        const defaultMessage = isArabic ? 'تم قبول ملفات تعريف الارتباط' : 'Cookies accepted';
        const title = acceptBtn?.dataset.acceptTitle || defaultTitle;
        const message = acceptBtn?.dataset.acceptMessage || defaultMessage;
        ndsShowMessage(message, 'success', title);
    }

    function ndsDeclineCookies() {
        ndsSetCookieConsent('declined');
        ndsDisableNonEssentialCookies();
        ndsEmitConsent('declined');
        ndsCookiesClosePopup();

        // Detect page language
        const isArabic = NDS.isArabic;

        // Get message and title from data attributes or use language-specific defaults
        const declineBtn = document.getElementById('ndsCookiesDeclineBtn');
        const defaultTitle = isArabic ? 'تم رفض غير الضرورية' : 'Non-essential rejected';
        const defaultMessage = isArabic ? 'تم رفض ملفات تعريف الارتباط غير الضرورية' : 'Non-essential cookies rejected';
        const title = declineBtn?.dataset.declineTitle || defaultTitle;
        const message = declineBtn?.dataset.declineMessage || defaultMessage;
        ndsShowMessage(message, 'info', title);
    }

    function ndsEnableAllCookies() {
        // Clear the in-memory kill switch the deny-by-default path sets, or accepting
        // would not take effect until the next page load.
        getGATrackingIds().forEach(id => { window['ga-disable-' + id] = false; });

        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted',
                'ad_storage': 'granted'
            });
        }
    }

    // Cache tracking IDs to avoid repeated DOM searches
    let cachedTrackingIds = null;

    function getGATrackingIds() {
        if (cachedTrackingIds) return cachedTrackingIds;

        let gaTrackingIds = [];

        // Check window.GA_TRACKING_ID (string or array)
        if (window.GA_TRACKING_ID) {
            if (Array.isArray(window.GA_TRACKING_ID)) {
                gaTrackingIds = window.GA_TRACKING_ID;
            } else {
                gaTrackingIds = [window.GA_TRACKING_ID];
            }
        }

        // Check data-ga-tracking-id attributes (multiple elements supported)
        const elementsWithTrackingId = document.querySelectorAll('[data-ga-tracking-id]');
        elementsWithTrackingId.forEach(el => {
            const id = el.dataset.gaTrackingId;
            if (id && !gaTrackingIds.includes(id)) {
                gaTrackingIds.push(id);
            }
        });

        // Deny-by-default calls this on every load, so an empty result must not stick:
        // an id registered after the bundle would otherwise never be disabled.
        if (gaTrackingIds.length) cachedTrackingIds = gaTrackingIds;
        return gaTrackingIds;
    }

    function ndsDisableNonEssentialCookies() {
        // Disable Google Analytics if tracking ID(s) configured
        // Note: This must run on every page load because window['ga-disable-X'] flag
        // is in-memory only and doesn't persist across page refreshes
        const gaTrackingIds = getGATrackingIds();

        // Disable all found tracking IDs
        gaTrackingIds.forEach(trackingId => {
            window['ga-disable-' + trackingId] = true;
        });

        ndsClearNonEssentialCookies();

        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied'
            });
        }
    }

    function ndsClearNonEssentialCookies() {
        ndsDeleteCookie('_ga');
        ndsDeleteCookie('_gid');
        ndsDeleteCookie('_gat');
        ndsDeleteCookie('_fbp');
        ndsDeleteCookie('_fbc');
    }

    function ndsDeleteCookie(name) {
        if (isLocalFile) {
            NDS.cache.clear(name);
            return;
        }
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname;
    }

    function ndsShowPopup() {
        const popup = document.getElementById('ndsCookiesPopup');
        if (popup) {
            popup.removeAttribute('hidden');
        }
    }

    function ndsCookiesClosePopup() {
        const popup = document.getElementById('ndsCookiesPopup');
        if (popup) {
            popup.setAttribute('hidden', '');
        }
    }

    function ndsShowMessage(message, variant = 'success', title = '') {
        // Use NDSAlert toast API for notifications
        NDS.Alert.create({
            variant: variant,
            title: title,
            description: message,
            display: 'toast',
            position: 'bottom',
            duration: 4000,
            closable: true
        });
    }


    let _initDone = false;

    function initializeCookies() {
        if (_initDone) return;
        _initDone = true;
        // Note: Consent is already checked on script load (lines 167-173)
        // This function only handles UI setup and event listeners

        // UI setup and popup display
        const acceptBtn = document.getElementById('ndsCookiesAcceptBtn');
        if (acceptBtn) {
            acceptBtn.addEventListener('click', ndsAcceptCookies);
        }

        const declineBtn = document.getElementById('ndsCookiesDeclineBtn');
        if (declineBtn) {
            declineBtn.addEventListener('click', ndsDeclineCookies);
        }

        const closeBtn = document.getElementById('ndsCookiesCloseBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                ndsSetCookie(DISMISS_KEY, '1', DISMISS_MINUTES / 1440);
                // No consent behaves exactly like declined; only the re-ask window differs.
                ndsDisableNonEssentialCookies();
                ndsCookiesClosePopup();
            });
        }

        // Show popup after delay if no consent
        const consent = ndsGetCookieConsent();
        if (!consent && !ndsGetCookie(DISMISS_KEY)) {
            setTimeout(() => {
                ndsShowPopup();
            }, 6000);
        }
    }

    // CRITICAL: Check consent immediately for privacy compliance (called by unified init system)
    const consent = ndsGetCookieConsent();
    if (consent === 'accepted') {
        ndsEnableAllCookies();
    } else {
        // Denied until accepted — a visitor who has not chosen yet is not consent.
        ndsDisableNonEssentialCookies();
    }

    // Expose initialization function and utilities for unified system
    NDS.Cookies = {
        init: initializeCookies,
        set: ndsSetCookie,
        get: ndsGetCookie,
        delete: ndsDeleteCookie,
        getConsent: ndsGetCookieConsent,
        show: ndsShowPopup
    };

    // Note: Full initialization now handled by nds-loader.js unified system
})();