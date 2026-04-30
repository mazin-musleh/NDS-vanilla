// City & Weather - Simplified with Core Functions
(() => {
    'use strict';

    // Cached payloads live in localStorage, which any same-origin script (XSS in another
    // page on the origin, a malicious browser extension with `storage` access) can
    // overwrite. The cache stores primitives only; the renderer rebuilds DOM imperatively
    // so every caller-controlled value flows through `.className` / `setAttribute` /
    // `.textContent` — text-context boundaries the HTML parser never executes.
    function renderWeather(parent, payload) {
        while (parent.firstChild) parent.removeChild(parent.firstChild);
        const icon = document.createElement('i');
        icon.className = 'nds-icon ' + payload.icon;
        icon.setAttribute('aria-hidden', 'true');
        const span = document.createElement('span');
        span.className = 'text';
        span.textContent = payload.desc + ', ' + payload.temp + '°C';
        parent.appendChild(icon);
        parent.appendChild(span);
    }

    function renderCity(parent, city) {
        while (parent.firstChild) parent.removeChild(parent.firstChild);
        const icon = document.createElement('i');
        icon.className = 'nds-icon nds-hgi-location-01';
        icon.setAttribute('aria-hidden', 'true');
        const span = document.createElement('span');
        span.className = 'text';
        span.textContent = city;
        parent.appendChild(icon);
        parent.appendChild(span);
    }

    // Weather function with dual-language API caching
    async function updateWeather() {
        const el = document.getElementById('nds-weatherInfo');
        if (!el) return;

        const lat = +(el.dataset.latitude || 24.7136);
        const lng = +(el.dataset.longitude || 46.6753);
        const isArabic = NDS.isArabic;
        // v2 keys: cache shape changed from HTML string to { desc, temp, icon } primitives.
        const arabicKey = `weather_v2_ar_${lat}_${lng}`;
        const englishKey = `weather_v2_en_${lat}_${lng}`;

        const arabicCached = NDS.cache.get(arabicKey);
        const englishCached = NDS.cache.get(englishKey);

        if (arabicCached && englishCached &&
            typeof arabicCached === 'object' && typeof englishCached === 'object' &&
            arabicCached.icon && englishCached.icon) {
            renderWeather(el, isArabic ? arabicCached : englishCached);
            el.style.display = '';
            return;
        }

        try {
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&timezone=auto`,
                { signal: AbortSignal.timeout(10000) }
            );

            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();

            if (!data.current_weather) throw new Error('Invalid weather data');

            const code = data.current_weather.weathercode;
            const temp = Math.round(data.current_weather.temperature);
            const hour = new Date().getHours();
            const isNight = hour >= 18 || hour <= 6;

            // Simple weather mapping for both languages
            let arabicDesc, englishDesc, icon;
            if (code <= 1) {
                arabicDesc = "صافي";
                englishDesc = "Clear";
                icon = isNight ? "nds-hgi-moon-02" : "nds-hgi-sun-03";
            } else if (code === 2) {
                arabicDesc = "غائم جزئيًا";
                englishDesc = "Partly Cloudy";
                icon = isNight ? "nds-hgi-moon-cloud" : "nds-hgi-sun-cloud-01";
            } else if (code === 3) {
                arabicDesc = "غائم";
                englishDesc = "Overcast";
                icon = "nds-hgi-cloud";
            } else if (code >= 45 && code <= 48) {
                arabicDesc = "ضباب";
                englishDesc = "Fog";
                icon = "nds-hgi-slow-winds";
            } else if (code >= 51 && code <= 67) {
                arabicDesc = "أمطار";
                englishDesc = "Rain";
                icon = "nds-hgi-cloud-angled-rain";
            } else if (code >= 71 && code <= 77) {
                arabicDesc = "ثلوج";
                englishDesc = "Snow";
                icon = "nds-hgi-cloud-snow";
            } else if (code >= 80 && code <= 99) {
                arabicDesc = "عاصفة";
                englishDesc = "Storm";
                icon = "nds-hgi-cloud-angled-rain-zap";
            } else {
                throw new Error('Unknown weather code');
            }

            const arabicData = { desc: arabicDesc, temp, icon };
            const englishData = { desc: englishDesc, temp, icon };

            renderWeather(el, isArabic ? arabicData : englishData);
            el.style.display = '';

            // Cache both languages for 15 minutes (primitives, not HTML)
            NDS.cache.set(arabicKey, arabicData, 15);
            NDS.cache.set(englishKey, englishData, 15);
            
        } catch (error) {
            el.style.display = 'none';
        }
    }

    // City function with API caching
    async function updateCity() {
        const cityEl = document.getElementById('nds-cityName');
        const weatherEl = document.getElementById('nds-weatherInfo');
        if (!cityEl || !weatherEl) return;

        const lat = +(weatherEl.dataset.latitude || 24.7136);
        const lng = +(weatherEl.dataset.longitude || 46.6753);
        const isArabic = NDS.isArabic;
        const lang = isArabic ? 'ar' : 'en';
        // v2 key: cache shape changed from HTML string to plain city name.
        const cacheKey = `city_v2_${lat}_${lng}_${lang}`;

        // Check cache first (30 days)
        const cached = NDS.cache.get(cacheKey);
        if (typeof cached === 'string' && cached) {
            renderCity(cityEl, cached);
            cityEl.style.display = '';
            return;
        }

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=${lang}&addressdetails=1`,
                { signal: AbortSignal.timeout(8000) }
            );

            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            
            const city = data.address?.city || data.address?.town || data.address?.village ||
                        data.address?.state || data.display_name?.split(',')[0];

            if (!city) throw new Error('No city found');

            renderCity(cityEl, city);
            cityEl.style.display = '';

            // Cache for 30 days (city name only, not HTML)
            NDS.cache.set(cacheKey, city, 30 * 24 * 60);
            
        } catch (error) {
            cityEl.style.display = 'none';
        }
    }

    function initializeCityWeather() {
        const weatherEl = document.getElementById('nds-weatherInfo');
        const cityEl = document.getElementById('nds-cityName');

        // Only run if both weather and city elements exist (they depend on each other)
        if (weatherEl && cityEl) {
            updateWeather();
            updateCity(); // City runs once on load, cached for 30 days

            // Update weather every 15 minutes
            setInterval(updateWeather, 15 * 60 * 1000);

            // City doesn't need interval - coordinates don't change, cached for 30 days
            NDS.onAttrChange('html', ['lang'], () => { updateWeather(); updateCity(); });
        }
    }

    if (typeof window !== 'undefined') {
        NDS.CityWeather = {
            init: initializeCityWeather,
            updateWeather,
            updateCity
        };
    }

    // Note: Initialization now handled by nds-loader.js unified system

})();