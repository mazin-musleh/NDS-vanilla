/**
 * Simple Language Switcher - Cookie-based System
 * Uses cookies for persistence, URL parameters reset cookies
 */

(() => {
    'use strict';
    
    // Local translations object
    let ndsTranslations = {};

    // Load translations from Jekyll-generated JSON
    async function loadTranslations() {
        try {
            const basePath = new URL('.', document.baseURI).pathname.replace(/\/$/, '');
            const response = await fetch(`${basePath}/translations.json`);
            ndsTranslations = await response.json();
        } catch (error) {
            console.error('Failed to load translations:', error);
        }
    }

    // Function to apply translations
    function applyTranslations(lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = getNestedTranslation(ndsTranslations[lang], key);
            if (translation) {
                element.textContent = translation;
            }
        });
    }

    // Helper function to get nested translation
    function getNestedTranslation(obj, key) {
        return key.split('.').reduce((o, k) => o && o[k], obj);
    }

    // Cookie utility functions
    function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    document.addEventListener('DOMContentLoaded', function() {
    // Get current language: URL parameter takes priority, then cookie, then default to 'en'
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    const cookieLang = getCookie('preferred-language');
    const currentLang = urlLang || cookieLang || 'en';
    
    // If URL parameter exists, update cookie and remove URL parameter
    if (urlLang) {
        setCookie('preferred-language', urlLang, 365); // Store for 1 year
        // Clean URL by removing language parameter
        const cleanUrl = new URL(window.location);
        cleanUrl.searchParams.delete('lang');
        window.history.replaceState({}, document.title, cleanUrl.pathname + cleanUrl.search);
    } else if (!cookieLang) {
        // Set default cookie if none exists
        setCookie('preferred-language', currentLang, 365);
    }
    
    // Update the language display in header
    const currentLangLabel = document.getElementById('currentLangLabel');
    if (currentLangLabel) {
        currentLangLabel.textContent = currentLang === 'ar' ? 'العربية' : 'English';
    }
    
    // Set HTML attributes for current language
    document.documentElement.setAttribute('lang', currentLang);
    document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    
    // Load and apply translations
    loadTranslations().then(() => {
        applyTranslations(currentLang);
    });
    
    // Handle language toggle button click
    const langToggleBtn = document.getElementById('langToggleBtn');
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', function() {
            // Toggle to opposite language
            const targetLang = currentLang === 'ar' ? 'en' : 'ar';
            
            // Update cookie directly
            setCookie('preferred-language', targetLang, 365);
            
            // Reload page to apply new language
            window.location.reload();
        });
    }
    });

})();