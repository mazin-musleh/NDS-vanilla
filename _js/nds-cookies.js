// Cookie Management
(() => {
    'use strict';

    const ndsGetCookieConsent = () => ndsGetCookie('cookieConsent');
    const ndsSetCookieConsent = (value) => ndsSetCookie('cookieConsent', value, 365);

    function ndsSetCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }

    function ndsGetCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }



    function ndsAcceptCookies() {
        ndsSetCookieConsent('accepted');
        ndsEnableAllCookies();
        ndsCookiesClosePopup();

        // Get message and title from data attributes or use defaults
        const acceptBtn = document.getElementById('ndsCookiesAcceptBtn');
        const title = acceptBtn?.dataset.acceptTitle || 'Accepted';
        const message = acceptBtn?.dataset.acceptMessage || 'Cookies have been accepted';
        ndsShowMessage(message, 'success', title);
    }

    function ndsDeclineCookies() {
        ndsSetCookieConsent('declined');
        ndsDisableNonEssentialCookies();
        ndsCookiesClosePopup();

        // Get message and title from data attributes or use defaults
        const declineBtn = document.getElementById('ndsCookiesDeclineBtn');
        const title = declineBtn?.dataset.declineTitle || 'Declined';
        const message = declineBtn?.dataset.declineMessage || 'Optional cookies have been declined';
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

    function ndsDisableNonEssentialCookies() {
        window['ga-disable-GA_TRACKING_ID'] = true;
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
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname;
    }

    function ndsShowPopup() {
        const popup = document.getElementById('ndsCookiesPopup');
        popup.classList.add('cookie-popup-show');
    }

    function ndsCookiesClosePopup() {
        const popup = document.getElementById('ndsCookiesPopup');
        popup.classList.add('cookie-popup-hidden');
    }

    function ndsShowMessage(message, variant = 'success', title = '') {
        // Use NDSAlert toast API for notifications
        if (typeof window.NDSAlert !== 'undefined') {
            window.NDSAlert.create({
                variant: variant,
                title: title,
                description: message,
                toast: true,
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
        // CRITICAL: Check consent immediately for privacy compliance
        const consent = ndsGetCookieConsent();
        if (consent === 'accepted') {
            ndsEnableAllCookies();
        } else if (consent === 'declined') {
            ndsDisableNonEssentialCookies();
        }

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

    // Expose initialization function for unified system
    window.NDSCookies = {
        init: initializeCookies
    };

    // Note: Full initialization now handled by nds-init.js unified system
})();