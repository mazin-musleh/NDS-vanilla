/* NDS.CityWeather — public surface
 * Rides: (none — base component)
 * Methods:
 *   NDS.CityWeather.init()            wire the city and weather widgets, if present
 *   NDS.CityWeather.updateWeather()   re-fetch and re-render the weather
 *   NDS.CityWeather.updateCity()      re-render the city name
 * Events:
 *   (none)
 * Hooks:
 *   ids, not attributes: #nds-city-name · #nds-weather-info
 *   data-city · data-city-en   on #nds-city-name — the name per language
 *   data-latitude · data-longitude   on #nds-weather-info; default Riyadh
 * Gotchas:
 *   - Weather comes from the public open-meteo API. No key, no account — and no data at
 *     all when the request fails; the widget hides (display: none).
 *   - init() re-renders on every call, so a replaced widget element fills in again.
 *   - Both languages are cached together, so a language switch needs no new request.
 *   - The cache holds primitives and the DOM is rebuilt from them — nothing stored ever
 *     reaches the HTML parser.
 */
// City & Weather - Simplified with Core Functions
(() => {
    'use strict';

    // English defaults; the assets/i18n/{lang}.json pack overrides them.
    const strings = NDS.i18n.strings('city-weather', {
        weather: '{desc}, {temp}°C',
        clear: 'Clear',
        partly_cloudy: 'Partly Cloudy',
        overcast: 'Overcast',
        fog: 'Fog',
        rain: 'Rain',
        snow: 'Snow',
        storm: 'Storm',
    });

    // Cached payloads live in localStorage, which any same-origin script (XSS in another
    // page on the origin, a malicious browser extension with `storage` access) can
    // overwrite. The cache stores primitives only; the renderer rebuilds DOM imperatively
    // so every caller-controlled value flows through `.className` / `setAttribute` /
    // `.textContent` — text-context boundaries the HTML parser never executes.
    function renderWeather(parent, payload) {
        const icon = document.createElement('i');
        icon.className = 'nds-icon ' + payload.icon;
        NDS.aria.hidden(icon, true);
        const span = document.createElement('span');
        span.className = 'text';
        span.textContent = strings.t('weather', { desc: strings.t(payload.cond), temp: payload.temp });
        parent.replaceChildren(icon, span);
    }

    function renderCity(parent, city) {
        const icon = document.createElement('i');
        icon.className = 'nds-icon nds-hgi-location-01';
        NDS.aria.hidden(icon, true);
        const span = document.createElement('span');
        span.className = 'text';
        span.textContent = city;
        parent.replaceChildren(icon, span);
    }

    // The cache holds the condition key, not text, so one entry serves every language.
    async function updateWeather() {
        const el = document.getElementById('nds-weather-info');
        if (!el) return;

        const lat = +(el.dataset.latitude || 24.7136);
        const lng = +(el.dataset.longitude || 46.6753);
        // v3: { cond, temp, icon } — v2 cached the text per language.
        const key = `weather_v3_${lat}_${lng}`;

        const cached = NDS.cache.get(key);
        if (cached && typeof cached === 'object' && cached.icon && strings.has(cached.cond)) {
            renderWeather(el, cached);
            el.style.display = '';
            return;
        }

        try {
            const { data } = await NDS.request(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&timezone=auto`,
                { timeout: 10000, json: true }
            );

            if (!data.current_weather) throw new Error('Invalid weather data');

            const code = data.current_weather.weathercode;
            const temp = Math.round(data.current_weather.temperature);
            const hour = new Date().getHours();
            const isNight = hour >= 18 || hour <= 6;

            let cond, icon;
            if (code <= 1) {
                cond = 'clear';
                icon = isNight ? 'nds-hgi-moon-02' : 'nds-hgi-sun-03';
            } else if (code === 2) {
                cond = 'partly_cloudy';
                icon = isNight ? 'nds-hgi-moon-cloud' : 'nds-hgi-sun-cloud-01';
            } else if (code === 3) {
                cond = 'overcast';
                icon = 'nds-hgi-cloud';
            } else if (code >= 45 && code <= 48) {
                cond = 'fog';
                icon = 'nds-hgi-slow-winds';
            } else if (code >= 51 && code <= 67) {
                cond = 'rain';
                icon = 'nds-hgi-cloud-angled-rain';
            } else if (code >= 71 && code <= 77) {
                cond = 'snow';
                icon = 'nds-hgi-cloud-snow';
            } else if (code >= 80 && code <= 99) {
                cond = 'storm';
                icon = 'nds-hgi-cloud-angled-rain-zap';
            } else {
                throw new Error('Unknown weather code');
            }

            const payload = { cond, temp, icon };
            renderWeather(el, payload);
            el.style.display = '';
            NDS.cache.set(key, payload, 15);
        } catch (error) {
            el.style.display = 'none';
        }
    }

    // City function with API caching
    async function updateCity() {
        const cityEl = document.getElementById('nds-city-name');
        const weatherEl = document.getElementById('nds-weather-info');
        if (!cityEl || !weatherEl) return;

        const isArabic = NDS.isArabic;

        // Author-supplied city short-circuits the reverse-geocode: the coords
        // are already author-set, so the city is known — and OSM Nominatim's
        // usage policy forbids the per-visitor volume a topbar widget across
        // many sites generates (bulk use is IP-blocked). `data-city-en` gives
        // the English variant; `data-city` covers both when it's absent. Only
        // falls through to the geocode when no city is authored — backward
        // compatible with existing markup.
        const authored = isArabic
            ? cityEl.dataset.city
            : (cityEl.dataset.cityEn || cityEl.dataset.city);
        if (authored) {
            renderCity(cityEl, authored);
            cityEl.style.display = '';
            return;
        }

        const lat = +(weatherEl.dataset.latitude || 24.7136);
        const lng = +(weatherEl.dataset.longitude || 46.6753);
        const lang = encodeURIComponent(NDS.lang);
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
            const { data } = await NDS.request(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=${lang}&addressdetails=1`,
                { timeout: 8000, json: true }
            );

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

    // Guards the setInterval and the NDS.onAttrChange subscription: neither
    // has (selector, fn) dedup in core, so a re-run of init would re-stack them.
    let _initDone = false;

    function initializeCityWeather() {
        const weatherEl = document.getElementById('nds-weather-info');
        const cityEl = document.getElementById('nds-city-name');

        // Only run if both weather and city elements exist (they depend on each other)
        if (!weatherEl || !cityEl) return;

        // Defer the initial fetches to an idle slot — on cache miss
        // these hit open-meteo and nominatim, and we don't want them
        // racing critical resources during post-DCL hydration. Runs on
        // every init, so a replaced widget element fills in again.
        NDS.onIdle(() => {
            updateWeather();
            updateCity();
        });

        if (_initDone) return;
        _initDone = true;

        // Update weather every 15 minutes
        setInterval(updateWeather, 15 * 60 * 1000);

        // City doesn't need interval - coordinates don't change, cached for 30 days
        NDS.onAttrChange('html', ['lang'], () => { updateWeather(); updateCity(); });
    }

    NDS.CityWeather = {
        init: initializeCityWeather,
        updateWeather,
        updateCity
    };

    // Note: Initialization now handled by nds-loader.js unified system

})();