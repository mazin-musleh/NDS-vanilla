// City & Weather - Simplified with Core Functions
(() => {
    'use strict';

    // Simple cache helper
    function getCache(key) {
        try {
            const data = localStorage.getItem(`nds_${key}`);
            if (data) {
                const parsed = JSON.parse(data);
                if (Date.now() < parsed.expires) return parsed.value;
                localStorage.removeItem(`nds_${key}`);
            }
        } catch {}
        return null;
    }

    function setCache(key, value, minutes) {
        try {
            localStorage.setItem(`nds_${key}`, JSON.stringify({
                value,
                expires: Date.now() + (minutes * 60 * 1000)
            }));
        } catch {}
    }

    // Weather function with dual-language API caching
    async function updateWeather() {
        const el = document.getElementById('nds-weatherInfo');
        if (!el) return;

        const lat = +(el.dataset.latitude || 24.7136);
        const lng = +(el.dataset.longitude || 46.6753);
        const isArabic = document.documentElement.lang?.startsWith('ar');
        const arabicKey = `weather_ar_${lat}_${lng}`;
        const englishKey = `weather_en_${lat}_${lng}`;

        // Check if we already have both languages cached
        const arabicCached = getCache(arabicKey);
        const englishCached = getCache(englishKey);

        if (arabicCached && englishCached) {
            el.innerHTML = isArabic ? arabicCached : englishCached;
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
                icon = isNight ? "hgi-moon-02" : "hgi-sun-03";
            } else if (code === 2) {
                arabicDesc = "غائم جزئيًا";
                englishDesc = "Partly Cloudy";
                icon = isNight ? "hgi-moon-cloud" : "hgi-sun-cloud-01";
            } else if (code === 3) {
                arabicDesc = "غائم";
                englishDesc = "Overcast";
                icon = "hgi-cloud";
            } else if (code >= 45 && code <= 48) {
                arabicDesc = "ضباب";
                englishDesc = "Fog";
                icon = "hgi-slow-winds";
            } else if (code >= 51 && code <= 67) {
                arabicDesc = "أمطار";
                englishDesc = "Rain";
                icon = "hgi-cloud-angled-rain";
            } else if (code >= 71 && code <= 77) {
                arabicDesc = "ثلوج";
                englishDesc = "Snow";
                icon = "hgi-cloud-snow";
            } else if (code >= 80 && code <= 99) {
                arabicDesc = "عاصفة";
                englishDesc = "Storm";
                icon = "hgi-cloud-angled-rain-zap";
            } else {
                throw new Error('Unknown weather code');
            }

            // Create both language versions from single API response
            const arabicHtml = `<i class="hgi hgi-stroke ${icon} icon"></i><span class="text">${arabicDesc}, ${temp}°C</span>`;
            const englishHtml = `<i class="hgi hgi-stroke ${icon} icon"></i><span class="text">${englishDesc}, ${temp}°C</span>`;
            
            el.innerHTML = isArabic ? arabicHtml : englishHtml;
            el.style.display = '';
            
            // Cache both languages for 15 minutes
            setCache(arabicKey, arabicHtml, 15);
            setCache(englishKey, englishHtml, 15);
            
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
        const isArabic = document.documentElement.lang?.startsWith('ar');
        const lang = isArabic ? 'ar' : 'en';
        const cacheKey = `city_${lat}_${lng}_${lang}`;

        // Check cache first (30 days)
        const cached = getCache(cacheKey);
        if (cached) {
            cityEl.innerHTML = cached;
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

            const html = `<i class="hgi hgi-stroke hgi-location-01 icon"></i><span class="text">${city}</span>`;
            
            cityEl.innerHTML = html;
            cityEl.style.display = '';
            
            // Cache for 30 days
            setCache(cacheKey, html, 30 * 24 * 60);
            
        } catch (error) {
            cityEl.style.display = 'none';
        }
    }

    // Global exposure
    if (typeof window !== 'undefined') {
        window.updateWeather = updateWeather;
        window.updateCity = updateCity;
    }

    // Auto-initialize
    function init() {
        // Weather and city are tied together - both need to exist
        const weatherEl = document.getElementById('nds-weatherInfo');
        const cityEl = document.getElementById('nds-cityName');
        
        // Only run if both weather and city elements exist (they depend on each other)
        if (weatherEl && cityEl) {
            updateWeather();
            updateCity(); // City runs once on load, cached for 30 days
            
            // Update weather every 15 minutes
            setInterval(updateWeather, 15 * 60 * 1000);
            
            // City doesn't need interval - coordinates don't change, cached for 30 days
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 50);
    }

})();