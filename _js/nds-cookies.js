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

    function ndsSetCookie(name, value, days) {
        if (isLocalFile) {
            const item = { value, expires: Date.now() + (days * 86400000) };
            localStorage.setItem('nds_' + name, JSON.stringify(item));
            return;
        }
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    }

    function ndsGetCookie(name) {
        if (isLocalFile) {
            const raw = localStorage.getItem('nds_' + name);
            if (!raw) return null;
            try {
                const item = JSON.parse(raw);
                if (item.expires && Date.now() > item.expires) {
                    localStorage.removeItem('nds_' + name);
                    return null;
                }
                return item.value;
            } catch (e) { return null; }
        }
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



    function ndsAcceptCookies() {
        ndsSetCookieConsent('accepted');
        ndsEnableAllCookies();
        ndsCookiesClosePopup();

        // Detect page language
        const isArabic = NDS.isArabic;

        // Get message and title from data attributes or use language-specific defaults
        const acceptBtn = document.getElementById('ndsCookiesAcceptBtn');
        const defaultTitle = isArabic ? 'تم القبول' : 'Accepted';
        const defaultMessage = isArabic ? 'تم قبول ملفات تعريف الارتباط' : 'Cookies have been accepted';
        const title = acceptBtn?.dataset.acceptTitle || defaultTitle;
        const message = acceptBtn?.dataset.acceptMessage || defaultMessage;
        ndsShowMessage(message, 'success', title);
    }

    function ndsDeclineCookies() {
        ndsSetCookieConsent('declined');
        ndsDisableNonEssentialCookies();
        ndsCookiesClosePopup();

        // Detect page language
        const isArabic = NDS.isArabic;

        // Get message and title from data attributes or use language-specific defaults
        const declineBtn = document.getElementById('ndsCookiesDeclineBtn');
        const defaultTitle = isArabic ? 'تم الرفض' : 'Declined';
        const defaultMessage = isArabic ? 'تم رفض ملفات تعريف الارتباط الاختيارية' : 'Optional cookies have been declined';
        const title = declineBtn?.dataset.declineTitle || defaultTitle;
        const message = declineBtn?.dataset.declineMessage || defaultMessage;
        ndsShowMessage(message, 'info', title);
    }

    function ndsEnableAllCookies() {
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

        cachedTrackingIds = gaTrackingIds;
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
            localStorage.removeItem('nds_' + name);
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
        if (typeof NDS.Alert !== 'undefined') {
            NDS.Alert.create({
                variant: variant,
                title: title,
                description: message,
                display: 'toast',
                position: 'bottom',
                duration: 4000,
                closable: true
            });
        } else {
            // Fallback if NDSAlert is not loaded yet
            console.log('[NDS Cookies]', title, message);
        }
    }


    function initializeCookies() {
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
            closeBtn.addEventListener('click', ndsCookiesClosePopup);
        }

        // Show popup after delay if no consent
        const consent = ndsGetCookieConsent();
        if (!consent) {
            setTimeout(() => {
                ndsShowPopup();
            }, 2000);
        }
    }

    // CRITICAL: Check consent immediately for privacy compliance (called by unified init system)
    const consent = ndsGetCookieConsent();
    if (consent === 'accepted') {
        ndsEnableAllCookies();
    } else if (consent === 'declined') {
        ndsDisableNonEssentialCookies();
    }

    // Expose initialization function and utilities for unified system
    NDS.Cookies = {
        init: initializeCookies,
        set: ndsSetCookie,
        get: ndsGetCookie,
        delete: ndsDeleteCookie,
        getConsent: ndsGetCookieConsent
    };

    // Note: Full initialization now handled by nds-loader.js unified system
})();