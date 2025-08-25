// NDS Extras - Performance Optimized with Font Loading and Accurate Hijri Date - UPDATED
// File: nds-extras.js

(() => {
    'use strict';

    // Cache DOM elements to avoid repeated queries
    const DOM = {
        date: null,
        cityName: null,
        weatherInfo: null,
        clock: null,
        get dateEl() { return this.date ??= document.getElementById('nds-date'); },
        get cityEl() { return this.cityName ??= document.getElementById('nds-cityName'); },
        get weatherEl() { return this.weatherInfo ??= document.getElementById('nds-weatherInfo'); },
        get clockEl() { return this.clock ??= document.getElementById('nds-realTimeClock'); }
    };

    // Performance optimized variables
    let intervalIds = { clock: null, weather: null, city: null, date: null };
    let isUpdating = { weather: false, city: false, date: false };
    let batchUpdateTimeout = null;

    // Font loading state
    let fontLoadingState = {
        isLoaded: false,
        isChecking: false,
        callbacks: []
    };

    // Unified HTML generator for topbar icons
    function generateExtraHTML(iconClass, text) {
        return `<i class="hgi hgi-stroke ${iconClass} icon"></i><span class="text">${text}</span>`;
    }

    const visibilityCache = new Map();
    function isVisible(element) {
        if (!element) return false;

        // Use element reference as key for better performance
        if (visibilityCache.has(element)) {
            const cached = visibilityCache.get(element);
            if (Date.now() - cached.time < 200) return cached.visible;
        }

        // Simple check - element exists and is connected to DOM
        const visible = element.offsetParent !== null;
        visibilityCache.set(element, { visible, time: Date.now() });

        // Clean cache periodically to prevent memory leaks
        if (visibilityCache.size > 10) {
            const entries = Array.from(visibilityCache.entries());
            const cutoff = Date.now() - 1000;
            entries.forEach(([key, value]) => {
                if (value.time < cutoff) visibilityCache.delete(key);
            });
        }

        return visible;
    }

    // Wait for element to be ready (visible) with 500ms polling
    function waitForElementReady(element, timeout = 10000) {
        return new Promise((resolve) => {
            // If element is already visible, resolve immediately
            if (isVisible(element)) {
                resolve(true);
                return;
            }
            
            const startTime = Date.now();
            
            function check() {
                if (isVisible(element)) {
                    resolve(true);
                    return;
                }
                
                if (Date.now() - startTime > timeout) {
                    resolve(false);
                    return;
                }
                
                setTimeout(check, 500);
            }
            
            check();
        });
    }

    // Font loading detection function
    function waitForFontFile(fontName, callback, timeout = 20000) {
        // If font is already loaded, call callback immediately
        if (fontLoadingState.isLoaded) {
            callback(true);
            return;
        }

        // Add callback to queue
        fontLoadingState.callbacks.push(callback);

        // If already checking, don't start another check
        if (fontLoadingState.isChecking) return;

        fontLoadingState.isChecking = true;
        const startTime = Date.now();

        function check() {
            // Check Performance API for actual font file loading
            const resources = performance.getEntriesByType('resource');
            const fontLoaded = resources.some(resource => {
                const url = resource.name.toLowerCase();
                return url.includes(fontName.toLowerCase()) && 
                       (url.includes('.woff2') || url.includes('.woff') || url.includes('.ttf') || url.includes('.otf')) &&
                       resource.responseEnd > 0;
            });

            if (fontLoaded) {
                fontLoadingState.isLoaded = true;
                fontLoadingState.isChecking = false;

                // Add class to body only after font file is confirmed loaded
                document.body.classList.add('hgi-loaded');

                // Execute all queued callbacks
                fontLoadingState.callbacks.forEach(cb => cb(true));
                fontLoadingState.callbacks = [];
                return;
            }

            // Check if timeout exceeded
            if (Date.now() - startTime > timeout) {
                fontLoadingState.isChecking = false;

                // Execute all queued callbacks with false
                fontLoadingState.callbacks.forEach(cb => cb(false));
                fontLoadingState.callbacks = [];
                return;
            }

            // Check again in 500ms for slow connections
            setTimeout(check, 500);
        }

        check();
    }

    // Dynamic language detection (no caching to allow language switching)
    function getLanguageInfo() {
        const docLang = document.documentElement.lang || 'en';
        const isArabic = docLang.startsWith('ar');
        const dateLocale = isArabic ? 'ar-SA' : 'en-US';

        return { isArabic, dateLocale };
    }

    // Persistent local cache with smart expiration
    const cache = (() => {
        const memoryCache = new Map();
        const maxMemorySize = 50;

        // Get from localStorage first, fallback to memory
        function get(key) {
            // Check memory cache first (fastest)
            if (memoryCache.has(key)) {
                const item = memoryCache.get(key);
                if (Date.now() < item.expiry) return item.value;
                memoryCache.delete(key);
            }

            // Check localStorage (persistent)
            try {
                const stored = localStorage.getItem(`nds_${key}`);
                if (stored) {
                    const item = JSON.parse(stored);
                    if (Date.now() < item.expiry) {
                        // Add to memory cache for faster future access
                        if (memoryCache.size < maxMemorySize) {
                            memoryCache.set(key, item);
                        }
                        return item.value;
                    }
                    localStorage.removeItem(`nds_${key}`);
                }
            } catch { }

            return null;
        }

        function set(key, value, minutes = 30) {
            const item = { value, expiry: Date.now() + minutes * 60000 };

            // Always store in memory for speed
            if (memoryCache.size >= maxMemorySize) {
                const firstKey = memoryCache.keys().next().value;
                memoryCache.delete(firstKey);
            }
            memoryCache.set(key, item);

            // Store in localStorage for persistence
            try {
                localStorage.setItem(`nds_${key}`, JSON.stringify(item));
            } catch { }
        }

        function clear(specificKey = null) {
            if (specificKey) {
                memoryCache.delete(specificKey);
                try {
                    localStorage.removeItem(`nds_${specificKey}`);
                } catch { }
            } else {
                memoryCache.clear();
                try {
                    Object.keys(localStorage)
                        .filter(key => key.startsWith('nds_'))
                        .forEach(key => localStorage.removeItem(key));
                } catch { }
            }
        }

        return { get, set, clear };
    })();

    // Accurate Hijri date from Islamic Network API
    async function getAccurateHijriDate(isArabic = true) {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 5000); // 5s timeout

        // Create cache keys for both languages using ISO date format
        const today = new Date().toISOString().slice(0, 10); // e.g., '2025-07-13'
        const arabicCacheKey = `hijri_ar_${today}`;
        const englishCacheKey = `hijri_en_${today}`;

        // Check if we already have both languages cached
        const arabicCached = cache.get(arabicCacheKey);
        const englishCached = cache.get(englishCacheKey);

        if (arabicCached && englishCached) {
            return isArabic ? arabicCached : englishCached;
        }

        try {
            // Use direct date endpoint to avoid redirect (DD-MM-YYYY format)
            const now = new Date();
            const dateStr = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear()}`;

            const response = await fetch(`https://api.aladhan.com/v1/gToH/${dateStr}`, {
                signal: controller.signal
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const data = await response.json();

            if (data.code === 200) {
                const hijri = data.data.hijri;

                // Create both language versions from single API response
                const arabicDate = `${hijri.day} ${hijri.month.ar} ${hijri.year} هـ`;
                const englishDate = `${hijri.day} ${hijri.month.en} ${hijri.year} AH`;

                // Cache both languages for 24 hours
                cache.set(arabicCacheKey, arabicDate, 24 * 60);
                cache.set(englishCacheKey, englishDate, 24 * 60);

                // Return the requested language
                return isArabic ? arabicDate : englishDate;
            }

            throw new Error('Invalid API response');
        } catch (error) {
            return null;
        }
    }

    // Alternative API option - HijriDate API
    async function getHijriFromAlternativeAPI(isArabic = true) {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 5000);

        try {
            const response = await fetch('https://api.hijridate.com/v1/today', {
                signal: controller.signal
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const data = await response.json();

            if (data.status === 'success') {
                const hijri = data.hijri;

                if (isArabic) {
                    return `${hijri.day} ${hijri.month_name} ${hijri.year} هـ`;
                } else {
                    // Use English month if available
                    const monthEn = hijri.month_name_en || hijri.month_name;
                    return `${hijri.day} ${monthEn} ${hijri.year} AH`;
                }
            }

            throw new Error('Invalid API response');
        } catch (error) {
            return null;
        }
    }

    // Fallback Hijri date using Intl.DateTimeFormat
    function getFallbackHijriDate(isArabic = true) {
        const date = new Date();

        if (isArabic) {
            const hijri = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }).format(date);

            return hijri.includes('هـ') ? hijri : `${hijri} هـ`;
        } else {
            const hijri = new Intl.DateTimeFormat('en-US-u-ca-islamic', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }).format(date);

            return hijri.includes('AH') ? hijri : `${hijri} AH`;
        }
    }

    // Enhanced version with multiple API fallbacks
    async function getAccurateHijriWithFallbacks(isArabic = true) {
        // Try primary API first
        let hijriDate = await getAccurateHijriDate(isArabic);
        if (hijriDate) return hijriDate;

        // Try alternative API
        hijriDate = await getHijriFromAlternativeAPI(isArabic);
        if (hijriDate) return hijriDate;

        // Final fallback to browser's built-in formatter
        return getFallbackHijriDate(isArabic);
    }

    // Enhanced date with accurate Hijri API integration
    async function updateDate() {
        const el = DOM.dateEl;
        if (!el) return;
        
        // Wait for element to be visible with 500ms polling for up to 10s
        const elementReady = await waitForElementReady(el, 10000);
        if (!elementReady || isUpdating.date) return;

        const { isArabic, dateLocale } = getLanguageInfo();
        const type = el.dataset.calendar || (isArabic ? 'hijri' : 'gregorian');
        const today = new Date().toISOString().slice(0, 10); // e.g., '2025-07-13'
        const cacheKey = `date_${type}_${isArabic}_${today}`;

        // Check cache first
        const cached = cache.get(cacheKey);
        if (cached) {
            el.innerHTML = generateExtraHTML('hgi-calendar-03', cached);
            el.style.display = '';
            return;
        }

        let content;

        if (type === 'hijri') {
            isUpdating.date = true;

            // Show loading state
            const loadingText = isArabic ? 'جاري التحميل...' : 'Loading...';
            el.innerHTML = generateExtraHTML('hgi-calendar-03', loadingText);
            el.style.display = '';

            try {
                // Get accurate Hijri date from API (respects page language)
                content = await getAccurateHijriWithFallbacks(isArabic);

                if (!content) {
                    // Hide element if no valid date available
                    el.style.display = 'none';
                    return;
                }
            } catch (error) {
                content = getFallbackHijriDate(isArabic);
                if (!content) {
                    el.style.display = 'none';
                    return;
                }
            } finally {
                isUpdating.date = false;
            }
        } else {
            // Gregorian date
            content = new Intl.DateTimeFormat(dateLocale, {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            }).format(new Date());
        }

        // Update element with final content
        if (isVisible(el) && content) {
            el.innerHTML = generateExtraHTML('hgi-calendar-03', content);
            el.style.display = '';
            cache.set(cacheKey, content, 24 * 60); // Cache for 24 hours
        } else {
            el.style.display = 'none';
        }
    }

    // City name with long-term persistent cache - NOW WITH ICON + TEXT
    async function updateCityName() {
        const cityEl = DOM.cityEl;
        const weatherEl = DOM.weatherEl;
        if (!cityEl || !weatherEl) return;
        
        // Wait for element to be visible with 500ms polling for up to 10s
        const elementReady = await waitForElementReady(cityEl, 10000);
        if (!elementReady || isUpdating.city) return;

        const lat = +(weatherEl.dataset.latitude || 24.7136);
        const lng = +(weatherEl.dataset.longitude || 46.6753);
        const { isArabic } = getLanguageInfo();
        const lang = isArabic ? 'ar' : 'en';
        const cacheKey = `city_${lat}_${lng}_${lang}`;

        // Always check cache first - city names rarely change
        const cached = cache.get(cacheKey);
        if (cached) {
            cityEl.innerHTML = generateExtraHTML('hgi-location-01', cached);
            cityEl.style.display = '';
            return; // Don't make API call if we have cached data
        }

        // Only make API call if no cache exists
        isUpdating.city = true;
        try {
            const controller = new AbortController();
            setTimeout(() => controller.abort(), 8000); // 8s timeout

            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=${lang}&addressdetails=1`,
                { signal: controller.signal }
            );

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const data = await response.json();
            const city = data.address?.city || data.address?.town || data.address?.village ||
                data.address?.state || data.display_name?.split(',')[0];

            if (city && isVisible(cityEl)) {
                // Use generateExtraHTML to create proper structure
                cityEl.innerHTML = generateExtraHTML('hgi-location-01', city);
                cityEl.style.display = '';
                // Cache city names for a very long time (30 days) since they rarely change
                cache.set(cacheKey, city, 30 * 24 * 60);
            } else {
                // Hide element if no valid city name found
                cityEl.style.display = 'none';
            }
        } catch (error) {
            if (error.name !== 'AbortError') {
                // Hide element on error instead of showing coordinates
                cityEl.style.display = 'none';
            }
        } finally {
            isUpdating.city = false;
        }
    }

    // Efficient range-based weather system (replaces large lookup objects)
    function getWeatherInfo(code, isArabic, isNight) {
        let description, dayIcon, nightIcon;

        if (code >= 0 && code <= 1) {
            // Merge codes 0-1 as "Clear"
            description = isArabic ? "صافي" : "Clear";
            dayIcon = "hgi-sun-03";
            nightIcon = "hgi-moon-02";
        } else if (code === 2) {
            description = isArabic ? "غائم جزئيًا" : "Partly Cloudy";
            dayIcon = "hgi-sun-cloud-01";
            nightIcon = "hgi-moon-cloud";
        } else if (code === 3) {
            description = isArabic ? "غائم" : "Overcast";
            dayIcon = nightIcon = "hgi-cloud";
        } else if (code >= 45 && code <= 48) {
            description = isArabic ? "ضباب" : "Fog";
            dayIcon = nightIcon = "hgi-slow-winds";
        } else if (code >= 51 && code <= 57) {
            description = isArabic ? "رذاذ" : "Drizzle";
            dayIcon = nightIcon = "hgi-cloud-little-rain";
        } else if (code >= 61 && code <= 67) {
            description = isArabic ? "أمطار" : "Rain";
            dayIcon = nightIcon = "hgi-cloud-angled-rain";
        } else if (code >= 71 && code <= 77) {
            description = isArabic ? "ثلوج" : "Snow";
            dayIcon = nightIcon = "hgi-cloud-snow";
        } else if (code >= 80 && code <= 82) {
            description = isArabic ? "زخات مطرية" : "Rain Showers";
            dayIcon = nightIcon = "hgi-cloud-angled-rain";
        } else if (code >= 85 && code <= 86) {
            description = isArabic ? "زخات ثلجية" : "Snow Showers";
            dayIcon = nightIcon = "hgi-cloud-snow";
        } else if (code >= 95 && code <= 99) {
            description = isArabic ? "عاصفة رعدية" : "Thunderstorm";
            dayIcon = nightIcon = "hgi-cloud-angled-rain-zap";
        } else {
            // Unknown code fallback - element will be hidden by caller
            description = isArabic ? "غير معروف" : "Unknown";
            dayIcon = "hgi-sun-03";
            nightIcon = "hgi-moon-02";
        }

        return {
            description,
            icon: isNight ? nightIcon : dayIcon
        };
    }

    // Helper function to determine if it's night time
    function isNightTime() {
        const hour = new Date().getHours();
        return hour >= 18 || hour <= 6; // Night time: 6 PM to 6 AM
    }

    // Weather with smart cache and staleness tolerance - NOW WITH ICON + TEXT
    async function fetchWeather() {
        const el = DOM.weatherEl;
        if (!el) return;
        
        // Wait for element to be visible with 500ms polling for up to 10s
        const elementReady = await waitForElementReady(el, 10000);
        if (!elementReady) return;

        const lat = +(el.dataset.latitude || 24.7136);
        const lng = +(el.dataset.longitude || 46.6753);
        const { isArabic } = getLanguageInfo();
        const cacheKey = `weather_${lat}_${lng}_${isArabic}`;

        // Check for fresh cache first
        const cached = cache.get(cacheKey);
        if (cached && cached.text && cached.icon) {
            el.innerHTML = generateExtraHTML(cached.icon, cached.text);
            el.style.display = '';
            return; // Use cached data, don't make API call
        }

        // Check for stale cache (up to 2 hours old) to avoid API calls
        const staleCacheKey = `weather_stale_${lat}_${lng}_${isArabic}`;
        const staleData = cache.get(staleCacheKey);
        if (staleData && staleData.text && staleData.icon && !isUpdating.weather) {
            // Use stale data immediately
            el.innerHTML = generateExtraHTML(staleData.icon, staleData.text);
            el.style.display = '';

            // Update in background without blocking UI
            setTimeout(() => fetchWeatherInBackground(lat, lng, isArabic, cacheKey, staleCacheKey), 100);
            return;
        }

        // No cache at all - show loading and fetch immediately
        const { isArabic: arabicLang } = getLanguageInfo();
        const loadingText = arabicLang ? "جاري التحميل..." : "Loading...";
        const loadingIcon = isNightTime() ? "hgi-moon-02" : "hgi-sun-03";
        el.innerHTML = generateExtraHTML(loadingIcon, loadingText);
        el.style.display = '';

        await fetchWeatherInBackground(lat, lng, isArabic, cacheKey, staleCacheKey);
    }

    // Background weather fetch to avoid blocking UI
    async function fetchWeatherInBackground(lat, lng, isArabic, cacheKey, staleCacheKey) {
        if (isUpdating.weather) return;

        isUpdating.weather = true;
        try {
            const controller = new AbortController();
            setTimeout(() => controller.abort(), 10000); // 10s timeout

            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&timezone=auto`,
                { signal: controller.signal }
            );

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const data = await response.json();

            // Ensure we have valid weather data
            if (!data.current_weather) {
                throw new Error('Invalid weather data structure');
            }

            const code = data.current_weather?.weathercode ?? -1;
            const temp = Math.round(data.current_weather?.temperature ?? 0);

            // Use efficient range-based weather info
            const weatherInfo = getWeatherInfo(code, isArabic, isNightTime());

            // Hide element if unknown weather code (includes -1 from errors)
            if (code === -1 || code < 0 || code > 99) {
                const el = DOM.weatherEl;
                if (isVisible(el)) {
                    el.style.display = 'none';
                }
                return;
            }

            const weatherText = `${weatherInfo.description}, ${temp}°C`;
            const weatherIcon = weatherInfo.icon;
            const weatherData = { text: weatherText, icon: weatherIcon };

            const el = DOM.weatherEl;
            if (isVisible(el)) {
                // Use generateExtraHTML to create proper structure
                el.innerHTML = generateExtraHTML(weatherIcon, weatherText);
                el.style.display = '';

                // Cache fresh data for 15 minutes
                cache.set(cacheKey, weatherData, 15);
                // Cache as stale data for 1 hour (longer fallback)
                cache.set(staleCacheKey, weatherData, 60);
            }
        } catch (error) {
            if (error.name !== 'AbortError') {
                const el = DOM.weatherEl;
                if (isVisible(el)) {
                    // Hide element on error instead of showing "Unavailable"
                    el.style.display = 'none';
                }
            }
        } finally {
            isUpdating.weather = false;
        }
    }

    // Clock with unified HTML generator
    async function updateClock() {
        const el = DOM.clockEl;
        if (!el) return;
        
        // Wait for element to be visible with 500ms polling for up to 10s
        const elementReady = await waitForElementReady(el, 10000);
        if (!elementReady) return;

        const now = new Date();
        const h = now.getHours();
        const m = now.getMinutes();
        const s = now.getSeconds();
        const content = `${h % 12 || 12}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;

        el.innerHTML = generateExtraHTML('hgi-clock-01', content);
    }

    // Smart batch update with debouncing to prevent excessive API calls
    async function batchUpdate(options = { date: true, clock: true, city: true, weather: true }) {
        // Debounce to prevent multiple rapid calls
        if (batchUpdateTimeout) {
            clearTimeout(batchUpdateTimeout);
        }

        batchUpdateTimeout = setTimeout(async () => {
            try {
                if (options.date && DOM.dateEl) await updateDate();
                if (options.clock && DOM.clockEl) await updateClock();
                if (options.city && DOM.cityEl) updateCityName();
                if (options.weather && DOM.weatherEl) fetchWeather();
            } catch (error) {
                console.error('Batch update error:', error);
            }
            batchUpdateTimeout = null;
        }, 100);
    }

    // Force update function to bypass cache and visibility checks
    async function forceUpdateExtras() {
        // Clear temporary caches but keep API cache for performance
        visibilityCache.clear();

        // Reset updating flags
        Object.keys(isUpdating).forEach(key => isUpdating[key] = false);

        // Force update all elements with proper HTML structure
        if (DOM.dateEl) {
            await updateDate();
        }

        if (DOM.clockEl) {
            updateClock();
        }

        if (DOM.cityEl) {
            updateCityName();
        }

        if (DOM.weatherEl) {
            fetchWeather();
        }
    }

    // Smart resize handler - updates layout-dependent elements and populates newly visible ones
    function handleResize() {
        visibilityCache.clear();

        setTimeout(() => {
            // Always update clock and weather on resize (layout-dependent)
            batchUpdate({
                date: false,    // Skip date for resize
                clock: true,    // Update clock - might change visibility
                city: false,    // Skip city for resize
                weather: true   // Update weather - might change visibility
            });

            // Check if date/city became visible but are empty - populate them
            const dateEl = DOM.dateEl;
            const cityEl = DOM.cityEl;

            if (dateEl && !dateEl.innerHTML.trim()) {
                updateDate();
            }

            if (cityEl && !cityEl.innerHTML.trim()) {
                updateCityName();
            }

        }, 100);
    }

    // Simple initialization
    function initExtras() {
        // Start font loading detection immediately
        waitForFontFile('hgi-stroke-rounded', (loaded) => {
            // Font loading completed - no logging needed
        });

        batchUpdate();

        intervalIds.clock = setInterval(() => {
            try {
                updateClock();
            } catch (error) {
                console.error('Clock update error:', error);
            }
        }, 1000);

        intervalIds.weather = setInterval(() => {
            try {
                if (DOM.weatherEl) {
                    const lat = +(DOM.weatherEl.dataset.latitude || 24.7136);
                    const lng = +(DOM.weatherEl.dataset.longitude || 46.6753);
                    const { isArabic } = getLanguageInfo();
                    const cacheKey = `weather_${lat}_${lng}_${isArabic}`;
                    if (!cache.get(cacheKey)) fetchWeather();
                }
            } catch (error) {
                console.error('Weather update error:', error);
            }
        }, 15 * 60 * 1000);

        intervalIds.city = setInterval(() => {
            try {
                if (DOM.cityEl && DOM.weatherEl) {
                    const lat = +(DOM.weatherEl.dataset.latitude || 24.7136);
                    const lng = +(DOM.weatherEl.dataset.longitude || 46.6753);
                    const { isArabic } = getLanguageInfo();
                    const cacheKey = `city_${lat}_${lng}_${isArabic ? 'ar' : 'en'}`;
                    if (!cache.get(cacheKey)) updateCityName();
                }
            } catch (error) {
                console.error('City update error:', error);
            }
        }, 7 * 24 * 60 * 60 * 1000);

        intervalIds.date = setInterval(async () => {
            try {
                if (DOM.dateEl) await updateDate();
            } catch (error) {
                console.error('Date update error:', error);
            }
        }, 24 * 60 * 60 * 1000);

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                try {
                    handleResize();
                } catch (error) {
                    console.error('Resize handler error:', error);
                }
            }, 100);
        }, { passive: true });

        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                visibilityCache.clear();
                // Debounce visibility change updates
                setTimeout(() => batchUpdate(), 200);
            } else {
                // Pause updates when page is hidden to save resources
                Object.keys(isUpdating).forEach(key => isUpdating[key] = false);
                if (batchUpdateTimeout) {
                    clearTimeout(batchUpdateTimeout);
                    batchUpdateTimeout = null;
                }
            }
        }, { passive: true });

        // Add cleanup on page unload (beforeunload is more reliable and allowed)
        window.addEventListener('beforeunload', cleanup, { passive: true });
    }

    // Clean shutdown
    function cleanup() {
        // Clear all intervals safely
        Object.values(intervalIds).forEach(id => {
            if (id !== null) clearInterval(id);
        });
        intervalIds = { clock: null, weather: null, city: null, date: null };

        // Clear only temporary caches, keep API cache for performance
        visibilityCache.clear();

        // Reset updating flags
        Object.keys(isUpdating).forEach(key => isUpdating[key] = false);

        // Reset font loading state
        fontLoadingState = {
            isLoaded: false,
            isChecking: false,
            callbacks: []
        };

        // Clear any pending batch update timeout
        if (batchUpdateTimeout) {
            clearTimeout(batchUpdateTimeout);
            batchUpdateTimeout = null;
        }
    }

    // Enhanced API for performance
    const NDSExtras = {
        // Core functions
        updateDate, updateCityName, fetchWeather, updateClock,
        initExtras, batchUpdate, cleanup,

        // Font loading functions
        waitForFontFile,
        getFontLoadingState: () => fontLoadingState,

        // Hijri date functions
        getAccurateHijriDate,
        getHijriFromAlternativeAPI,
        getFallbackHijriDate,
        getAccurateHijriWithFallbacks,

        // Cache management
        cache: {
            get: cache.get,
            set: cache.set,
            clear: cache.clear
        },

        // Force refresh functions
        forceRefresh: {
            weather: () => {
                const el = DOM.weatherEl;
                if (el) {
                    const lat = +(el.dataset.latitude || 24.7136);
                    const lng = +(el.dataset.longitude || 46.6753);
                    const { isArabic } = getLanguageInfo();
                    const cacheKey = `weather_${lat}_${lng}_${isArabic}`;
                    const staleCacheKey = `weather_stale_${lat}_${lng}_${isArabic}`;
                    cache.clear(cacheKey);
                    cache.clear(staleCacheKey);
                    fetchWeather();
                }
            },
            city: () => {
                const weatherEl = DOM.weatherEl;
                if (weatherEl) {
                    const lat = +(weatherEl.dataset.latitude || 24.7136);
                    const lng = +(weatherEl.dataset.longitude || 46.6753);
                    const { isArabic } = getLanguageInfo();
                    const cacheKey = `city_${lat}_${lng}_${isArabic ? 'ar' : 'en'}`;
                    cache.clear(cacheKey);
                    updateCityName();
                }
            },
            date: async () => {
                const el = DOM.dateEl;
                if (el) {
                    const today = new Date().toISOString().slice(0, 10);
                    cache.clear(`hijri_ar_${today}`);
                    cache.clear(`hijri_en_${today}`);
                    await updateDate();
                }
            },
            all: async () => {
                cache.clear();
                visibilityCache.clear();
                await forceUpdateExtras();
            }
        }
    };

    // Global exposure with clean namespace
    if (typeof window !== 'undefined') {
        window.NDSExtras = NDSExtras;

        // Expose only essential functions for backward compatibility
        Object.assign(window, {
            updateDate, updateCityName, fetchWeather, updateClock, initExtras, waitForFontFile,
            getAccurateHijriDate, getAccurateHijriWithFallbacks
        });
    }

    // Auto-initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initExtras);
    } else {
        setTimeout(initExtras, 50);
    }

    // Module export
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = NDSExtras;
    }

})();

//NDSExtras.cache.clear();

// form controller
(function () {
    'use strict';

    // Voice Recognition Module
    var VoiceRecognition = {
        audioFeedback: {
            context: null,

            init: function () {
                try {
                    this.context = new (window.AudioContext || window.webkitAudioContext)();
                } catch (e) {
                    this.context = null;
                }
            },

            playTone: function (frequency, duration) {
                if (!this.context) this.init();
                if (!this.context) return;

                try {
                    if (this.context.state === 'suspended') {
                        this.context.resume();
                    }

                    var osc = this.context.createOscillator();
                    var gain = this.context.createGain();
                    var now = this.context.currentTime;

                    osc.connect(gain).connect(this.context.destination);
                    osc.frequency.setValueAtTime(frequency, now);
                    osc.type = 'sine';

                    gain.gain.setValueAtTime(0.1, now);
                    gain.gain.exponentialRampToValueAtTime(0.01, now + duration / 1000);

                    osc.start(now);
                    osc.stop(now + duration / 1000);
                } catch (e) {
                    // Silent fail
                }
            },

            start: function () { this.playTone(800, 200); },
            end: function () { this.playTone(400, 300); },
            error: function () { this.playTone(200, 400); }
        },

        isSupported: function () {
            return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
        },

        getLanguage: function () {
            var lang = document.documentElement.lang || 'ar';
            return { ar: 'ar-SA', en: 'en-US' }[lang.split('-')[0]] || 'ar-SA';
        },

        create: function (options) {
            if (!this.isSupported()) return null;

            var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            var settings = Object.assign({
                continuous: false,
                interimResults: true,
                lang: this.getLanguage(),
                maxAlternatives: 1
            }, options);

            Object.assign(recognition, settings);
            return recognition;
        },

        startListening: function (recognition, callbacks) {
            if (!recognition) return;

            var finalTranscript = '';
            callbacks = callbacks || {};

            recognition.onstart = function () {
                VoiceRecognition.audioFeedback.start();
                if (callbacks.onStart) callbacks.onStart();
            };

            recognition.onresult = function (event) {
                var interimTranscript = '';

                for (var i = event.resultIndex; i < event.results.length; i++) {
                    var transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript;
                    } else {
                        interimTranscript += transcript;
                    }
                }

                if (callbacks.onResult) {
                    callbacks.onResult({
                        final: finalTranscript,
                        interim: interimTranscript,
                        isFinal: event.results[event.results.length - 1].isFinal
                    });
                }
            };

            recognition.onerror = function (event) {
                VoiceRecognition.audioFeedback.error();
                if (callbacks.onError) {
                    callbacks.onError(event.error);
                } else {
                    console.error('Speech recognition error:', event.error);
                }
            };

            recognition.onend = function () {
                VoiceRecognition.audioFeedback.end();
                if (callbacks.onEnd) callbacks.onEnd(finalTranscript);
            };

            recognition.start();
        },

        stopListening: function (recognition) {
            if (recognition) recognition.stop();
        }
    };

    // Utility functions
    function updateFormState(input, formControl) {
        var hasValue = (input.type === 'checkbox' || input.type === 'radio')
            ? input.checked
            : input.value.trim() !== '';

        formControl.classList.toggle('filled', hasValue);

        // Show/hide clear button based on input value
        var clearButton = formControl.querySelector('.clear');
        if (clearButton) {
            clearButton.classList.toggle('hidden', !hasValue);
        }
    }

    function findPrimaryInput(container) {
        return container.querySelector('input[type="text"], input[type="email"], input[type="search"], textarea') ||
            container.querySelector('input, textarea');
    }

    function triggerEvents(element) {
        element.dispatchEvent(new Event('input', { bubbles: true }));
        element.dispatchEvent(new Event('change', { bubbles: true }));
    }

    // Auto-fill functionality
    function initAutoFillTags() {
        document.querySelectorAll('.nds-autoFill[data-target]').forEach(function (container) {
            var targetId = container.getAttribute('data-target');

            container.querySelectorAll('.nds-tag').forEach(function (tag) {
                if (tag._autoFillHandler) {
                    tag.removeEventListener('click', tag._autoFillHandler);
                }

                tag._autoFillHandler = function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    var tagText = (tag.textContent || tag.innerText).trim();
                    // Clean up excessive whitespace and normalize spaces
                    tagText = tagText.replace(/\s+/g, ' ');

                    var targetInput = document.getElementById(targetId) ||
                        document.querySelector('[name="' + targetId + '"]') ||
                        document.querySelector('[data-name="' + targetId + '"]');

                    if (targetInput && tagText) {
                        targetInput.value = tagText;
                        targetInput.focus();
                        triggerEvents(targetInput);

                        var formControl = targetInput.closest('.nds-form-control');
                        if (formControl) {
                            updateFormState(targetInput, formControl);
                        }
                    }
                };

                tag.addEventListener('click', tag._autoFillHandler);
            });
        });
    }

    // Form control functionality
    function initFormControlClasses() {
        document.querySelectorAll('.nds-form-control').forEach(function (formControl) {
            var inputElements = formControl.querySelectorAll('input, textarea, select');

            inputElements.forEach(function (input) {
                // Mouse interaction
                input.addEventListener('mousedown', function () {
                    formControl.classList.add('active');
                });

                ['mouseup', 'mouseleave'].forEach(function (event) {
                    input.addEventListener(event, function () {
                        formControl.classList.remove('active');
                    });
                });

                // Focus states
                input.addEventListener('focus', function () {
                    formControl.classList.add('focus');
                });

                input.addEventListener('blur', function () {
                    formControl.classList.remove('focus');
                });

                // Value changes
                ['input', 'change'].forEach(function (event) {
                    input.addEventListener(event, function () {
                        updateFormState(input, formControl);
                    });
                });

                // Initialize state
                updateFormState(input, formControl);
            });

            // Voice input button
            var voiceButton = formControl.querySelector('.nds-form-action .voiceInput');
            if (voiceButton && VoiceRecognition.isSupported()) {
                var isListening = false;
                var currentRecognition = null;

                voiceButton.addEventListener('click', function () {
                    if (isListening) {
                        VoiceRecognition.stopListening(currentRecognition);
                        return;
                    }

                    var primaryInput = findPrimaryInput(formControl);
                    if (!primaryInput) return;

                    currentRecognition = VoiceRecognition.create();
                    if (!currentRecognition) return;

                    primaryInput.focus();

                    VoiceRecognition.startListening(currentRecognition, {
                        onStart: function () {
                            isListening = true;
                            voiceButton.classList.add('listening');
                            formControl.classList.add('voice-active');
                        },

                        onResult: function (result) {
                            primaryInput.value = result.isFinal ? result.final.trim() : result.interim;
                            if (result.isFinal) {
                                triggerEvents(primaryInput);
                            }
                        },

                        onError: function () {
                            isListening = false;
                            voiceButton.classList.remove('listening');
                            formControl.classList.remove('voice-active');
                        },

                        onEnd: function () {
                            isListening = false;
                            voiceButton.classList.remove('listening');
                            formControl.classList.remove('voice-active');
                        }
                    });
                });
            } else if (voiceButton) {
                voiceButton.style.display = 'none';
            }

            // Clear button
            var clearButton = formControl.querySelector('.nds-form-action .clear');
            if (clearButton) {
                clearButton.addEventListener('click', function () {
                    inputElements.forEach(function (input) {
                        if (input.type === 'checkbox' || input.type === 'radio') {
                            input.checked = false;
                        } else {
                            input.value = '';
                        }
                        triggerEvents(input);
                    });
                    formControl.classList.remove('filled');
                });
            }
        });
    }

    // Initialize
    function init() {
        VoiceRecognition.audioFeedback.init();
        initFormControlClasses();
        initAutoFillTags();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Global exports
    window.VoiceRecognition = VoiceRecognition;
    window.reinitFormControlClasses = init;

})();

// Side Menu
(function () {
    'use strict';
    // Accordion Menu - Vanilla JS version
    document.addEventListener("DOMContentLoaded", function () {
        const accMenu = document.querySelector(".nds-sideMenu");

        if (!accMenu) return; // ✅ Exit safely if .nds-sideMenu doesn't exist

        // Initialize .open for active path
        accMenu.querySelectorAll("li.active").forEach(activeItem => {
            let current = activeItem;
            while (current && current !== accMenu) {
                if (current.classList.contains("has-sub")) {
                    current.classList.add("open");
                }
                current = current.parentElement.closest("li");
            }
        });

        // Accordion submenu toggle
        accMenu.addEventListener("click", function (e) {
            const anchor = e.target.closest("li.has-sub > a");
            if (!anchor) return;

            e.preventDefault();
            const li = anchor.parentElement;
            const submenu = li.querySelector(":scope > ul");
            if (!submenu) return;

            const isOpen = li.classList.contains("open");

            if (!isOpen) {
                // Close all sibling items
                const siblings = [...li.parentElement.children].filter(el => el !== li && el.classList.contains("has-sub"));

                siblings.forEach(sibling => {
                    const siblingSub = sibling.querySelector(":scope > ul");
                    if (sibling.classList.contains("open") && siblingSub) {
                        siblingSub.style.height = siblingSub.scrollHeight + "px";
                        siblingSub.offsetHeight;
                        siblingSub.style.height = "0px";

                        setTimeout(() => {
                            sibling.classList.remove("open");
                            siblingSub.style.height = "";
                        }, 250);
                    }
                });

                // Open current item
                li.classList.add("open");
                submenu.style.height = "0px";
                submenu.offsetHeight;
                submenu.style.height = submenu.scrollHeight + "px";

                submenu.addEventListener("transitionend", function handler() {
                    submenu.style.height = "";
                    submenu.removeEventListener("transitionend", handler);
                });

            } else {
                // Close current item
                submenu.style.height = submenu.scrollHeight + "px";
                submenu.offsetHeight;
                submenu.style.height = "0px";

                setTimeout(() => {
                    li.classList.remove("open");
                    submenu.style.height = "";
                }, 250);
            }
        });

        // ✅ Toggle .open on .nds-sideMenu when #sideMenuToggle is clicked
        const toggleBtn = document.getElementById("sideMenuToggle");
        if (toggleBtn) {
            toggleBtn.addEventListener("click", (e) => {
                e.stopPropagation(); // Prevent immediate closure from document click
                accMenu.classList.toggle("open");
            });
        }

        // ✅ Close side menu when clicking outside with 50px safe zone
        document.addEventListener("click", function (e) {
            // Only proceed if menu is open
            if (!accMenu.classList.contains("open")) return;

            // Don't close if clicking inside the menu or toggle button
            if (accMenu.contains(e.target) || (toggleBtn && toggleBtn.contains(e.target))) {
                return;
            }

            // Get menu boundaries
            const menuRect = accMenu.getBoundingClientRect();
            const safeZone = 50;

            // Check if click is within the safe zone around the menu
            const clickX = e.clientX;
            const clickY = e.clientY;

            const inSafeZone = (
                clickX >= menuRect.left - safeZone &&
                clickX <= menuRect.right + safeZone &&
                clickY >= menuRect.top - safeZone &&
                clickY <= menuRect.bottom + safeZone
            );

            // Close menu if click is outside the safe zone
            if (!inSafeZone) {
                accMenu.classList.remove("open");
            }
        });

        // ✅ Close menu on Escape key
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && accMenu.classList.contains("open")) {
                accMenu.classList.remove("open");
            }
        });
    });
})();

// Share page
(function () {
    'use strict';

    // Language translations
    const translations = {
        ar: {
            shareButton: 'مشاركة الصفحة',
            x: 'إكس',
            linkedin: 'لينكدإن',
            whatsapp: 'واتساب',
            copyLink: 'نسخ الرابط',
            linkCopied: 'تم نسخ الرابط!'
        },
        en: {
            shareButton: 'Share Page',
            x: 'X',
            linkedin: 'LinkedIn',
            whatsapp: 'WhatsApp',
            copyLink: 'Copy Link',
            linkCopied: 'Link Copied!'
        }
    };

    class SharePageDropdown {
        constructor() {
            this.container = document.getElementById('nds-sharePage');
            this.button = document.getElementById('nds-sharePageBtn');
            this.dropdown = document.getElementById('nds-sharePage-dropdown');
            this.isOpen = false;

            this.init();
            this.updateLanguage();
        }

        init() {
            // Add ARIA attributes
            this.button.setAttribute('aria-expanded', 'false');
            this.button.setAttribute('aria-haspopup', 'true');
            this.button.setAttribute('aria-controls', 'nds-sharePage-dropdown');

            // Button click event
            this.button.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggle();
            });

            // Menu item click events
            const menuItems = this.dropdown.querySelectorAll('li');
            menuItems.forEach((item, index) => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleShare(index);
                });
            });

            // Close on outside click
            document.addEventListener('click', (e) => {
                if (!e.target.closest('#nds-sharePage')) {
                    this.close();
                }
            });
        }

        toggle() {
            if (this.isOpen) {
                this.close();
            } else {
                this.open();
            }
        }

        open() {
            this.isOpen = true;
            this.container.classList.add('open');
            this.button.setAttribute('aria-expanded', 'true');
        }

        close() {
            this.isOpen = false;
            this.container.classList.remove('open');
            this.button.setAttribute('aria-expanded', 'false');
        }

        handleShare(index) {
            const url = window.location.href;
            const title = document.title;
            const menuItems = this.dropdown.querySelectorAll('li');
            const clickedItem = menuItems[index];

            // Check if the menu item exists
            if (!clickedItem) {
                return;
            }

            // Determine share type by class
            if (clickedItem.classList.contains('share-x')) {
                this.shareOnX(url, title);
                this.close();
            } else if (clickedItem.classList.contains('share-linkedin')) {
                this.shareOnLinkedIn(url);
                this.close();
            } else if (clickedItem.classList.contains('share-whatsapp')) {
                this.shareOnWhatsApp(url, title);
                this.close();
            } else if (clickedItem.classList.contains('share-copy')) {
                this.copyToClipboard(url);
                // Close dropdown after copied text is restored
            }
        }

        shareOnX(url, title) {
            const shareUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }

        shareOnLinkedIn(url) {
            const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }

        shareOnWhatsApp(url, title) {
            const shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }

        async copyToClipboard(text) {
            const copyLinkItem = this.dropdown.querySelector('.share-copy');

            // Check if copy link element exists
            if (!copyLinkItem) {
                return;
            }

            const currentLang = document.documentElement.getAttribute('lang') || 'ar';
            const texts = translations[currentLang] || translations.ar;
            const originalText = copyLinkItem.querySelector('.text').textContent;

            try {
                await navigator.clipboard.writeText(text);
                copyLinkItem.classList.add('copied');

                // Update text to show copied state
                copyLinkItem.querySelector('.text').textContent = texts.linkCopied;

                // Remove copied class, restore original text, and close dropdown after 2 seconds
                setTimeout(() => {
                    copyLinkItem.classList.remove('copied');
                    copyLinkItem.querySelector('.text').textContent = originalText;
                }, 1500);
                /* setTimeout(() => {
                    this.close();
                }, 2000); */
            } catch (err) {
                copyLinkItem.classList.add('copied');

                // Update text to show copied state
                copyLinkItem.querySelector('.text').textContent = texts.linkCopied;

                // Remove copied class, restore original text, and close dropdown after 2 seconds
                setTimeout(() => {
                    copyLinkItem.classList.remove('copied');
                    copyLinkItem.querySelector('.text').textContent = originalText;
                    this.close();
                }, 2000);
            }
        }

        updateLanguage() {
            const currentLang = document.documentElement.getAttribute('lang') || 'ar';
            const texts = translations[currentLang] || translations.ar;

            // Update button text
            const buttonText = this.button.querySelector('.text');
            if (buttonText) {
                buttonText.textContent = texts.shareButton;
            }

            // Update menu items text
            const platforms = ['x', 'linkedin', 'whatsapp', 'copyLink'];
            const menuItems = this.dropdown.querySelectorAll('li');
            menuItems.forEach((item, index) => {
                const textSpan = item.querySelector('.text');
                if (textSpan && platforms[index]) {
                    textSpan.textContent = texts[platforms[index]];
                }
            });
        }
    }

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        // Check if required elements exist before initializing
        const shareButton = document.getElementById('nds-sharePageBtn');
        const shareDropdown = document.getElementById('nds-sharePage-dropdown');

        if (shareButton && shareDropdown) {
            new SharePageDropdown();
        }
    });

})();

// Cookies
(function () {
    'use strict';
    let arabicSite = false;

    function ndsDetectLanguageFromHtml() {
        const htmlLang = document.documentElement.lang || document.documentElement.getAttribute('lang');
        if (htmlLang) {
            arabicSite = htmlLang.toLowerCase().startsWith('ar');
        }
    }

    const translations = {
        en: {
            title: 'Cookies',
            content: 'This website uses cookies to ensure ease of use and guarantee an improved browsing experience. By continuing to browse this site, you acknowledge acceptance of the use of cookies.',
            terms: 'Terms and Conditions',
            privacy: 'Privacy Policy',
            accept: 'Accept',
            decline: 'Decline',
            acceptMessage: 'Cookies have been accepted',
            declineMessage: 'Optional cookies have been declined',
            termsUrl: 'https://seu.edu.sa/en/terms-and-conditions/',
            privacyUrl: 'https://seu.edu.sa/en/policy-and-privacy/'
        },
        ar: {
            title: 'ملفات تعريف الارتباط',
            content: 'هذا الموقع يستخدم ملفات تعريف الارتباط الخاصة للتأكد من سهولة الاستخدام وضمان تحسين تجربتك أثناء التصفح. من خلال الاستمرار في تصفح هذا الموقع، فإنك تقر بقبول استخدام ملفات تعريف الارتباط.',
            terms: 'الشروط والأحكام',
            privacy: 'سياسة الخصوصية',
            accept: 'قبول',
            decline: 'رفض',
            acceptMessage: 'تم قبول ملفات تعريف الارتباط',
            declineMessage: 'تم رفض ملفات تعريف الارتباط الاختيارية',
            termsUrl: 'https://seu.edu.sa/ar/terms-and-conditions/',
            privacyUrl: 'https://seu.edu.sa/ar/policy-and-privacy/'
        }
    };

    function ndsGetCookieConsent() {
        return ndsGetCookie('cookieConsent');
    }

    function ndsSetCookieConsent(value) {
        ndsSetCookie('cookieConsent', value, 365);
    }

    function ndsSetCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = name + '=' + value + ';expires=' + expires.toUTCString() + ';path=/';
    }

    function ndsGetCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function ndsUpdateContent() {
        const lang = arabicSite ? 'ar' : 'en';
        const t = translations[lang];

        const titleEl = document.getElementById('ndsCookiesTitle');
        if (titleEl) titleEl.textContent = t.title;

        const contentEl = document.getElementById('ndsCookiesContent');
        if (contentEl) contentEl.textContent = t.content;

        const termsLinkEl = document.getElementById('ndsCookiesTermsLink');
        if (termsLinkEl) {
            termsLinkEl.textContent = t.terms;
            termsLinkEl.href = t.termsUrl;
        }

        const privacyLinkEl = document.getElementById('ndsCookiesPrivacyLink');
        if (privacyLinkEl) {
            privacyLinkEl.textContent = t.privacy;
            privacyLinkEl.href = t.privacyUrl;
        }

        const acceptBtnEl = document.getElementById('ndsCookiesAcceptBtn');
        if (acceptBtnEl) acceptBtnEl.textContent = t.accept;

        const declineBtnEl = document.getElementById('ndsCookiesDeclineBtn');
        if (declineBtnEl) declineBtnEl.textContent = t.decline;

        // Update close button if it exists
        const closeBtnEl = document.getElementById('ndsCookiesCloseBtn');
        if (closeBtnEl) {
            closeBtnEl.textContent = '×'; // or any close symbol you prefer
        }
    }

    function ndsAcceptCookies() {
        ndsSetCookieConsent('accepted');
        ndsEnableAllCookies();
        ndsCookiesClosePopup();
        const lang = arabicSite ? 'ar' : 'en';
        ndsShowMessage(translations[lang].acceptMessage);
    }

    function ndsDeclineCookies() {
        ndsSetCookieConsent('declined');
        ndsDisableNonEssentialCookies();
        ndsCookiesClosePopup();
        const lang = arabicSite ? 'ar' : 'en';
        ndsShowMessage(translations[lang].declineMessage);
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

    function ndsShowMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'cookie-popup-message';
        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    // Remove the global scope exposure since we're using event listeners
    // window.ndsAcceptCookies = ndsAcceptCookies;
    // window.ndsDeclineCookies = ndsDeclineCookies;
    // window.ndsCookiesClosePopup = ndsCookiesClosePopup;

    window.addEventListener('load', () => {
        ndsDetectLanguageFromHtml();
        ndsUpdateContent();

        // Add event listeners
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

        const consent = ndsGetCookieConsent();
        if (!consent) {
            setTimeout(() => {
                ndsShowPopup();
            }, 2000);
        } else if (consent === 'accepted') {
            ndsEnableAllCookies();
        } else if (consent === 'declined') {
            ndsDisableNonEssentialCookies();
        }
    });
})();


// Thousands Separators
(function () {
    'use strict';
    const ThousandsNumbers = document.querySelectorAll('.nds-number-format');
    if (ThousandsNumbers.length > 0) {
        ThousandsNumbers.forEach(el => {
            const num = parseInt(el.textContent.replace(/,/g, ''), 10);
            if (!isNaN(num)) {
                el.textContent = num.toLocaleString();
            }
        });
    }
})();

// Counter Aninmation
(function () {
    'use strict';
    document.addEventListener('DOMContentLoaded', () => {
        const counters = document.querySelectorAll('.nds-counter-value');

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.textContent.replace(/[^\d]/g, ''), 10) || 0;
                    const duration = 1000;
                    const startTime = performance.now();

                    function updateCounter(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const currentValue = Math.ceil(progress * target);
                        el.textContent = currentValue.toLocaleString();

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        }
                    }

                    requestAnimationFrame(updateCounter);

                    observer.unobserve(el); // Stop observing after animation starts
                }
            });
        }, {
            threshold: 0.5 // 50% of the element must be visible
        });

        counters.forEach(counter => {
            observer.observe(counter);
        });
    });
})();

// Horizontal row scroll functionality
(() => {
    'use strict';
    
    const initializeRowScroll = (forceUpdate = false) => {
        const containers = document.querySelectorAll('.oneRowContent');
        if (!containers.length) return;

        containers.forEach(container => {
            // Skip if already initialized unless forcing update
            if (container.hasAttribute('data-onerow-initialized') && !forceUpdate) return;
            
            if (!container.hasAttribute('data-onerow-initialized')) {
                container.setAttribute('data-onerow-initialized', 'true');
                initializeSingleContainer(container);
            } else if (forceUpdate) {
                // For already initialized containers, just update indicators
                // Find the updateScrollIndicators function for this container
                setTimeout(() => {
                    // The updateScrollIndicators function is closure-scoped, so we need to trigger it
                    // We can do this by dispatching a resize event to trigger the existing handlers
                    window.dispatchEvent(new Event('resize'));
                }, 10);
            }
        });
    };

    const initializeSingleContainer = (container) => {

        // Set initial scroll behavior
        container.style.scrollBehavior = 'smooth';
        
        // Initial indicator state - delay to ensure CSS is applied
        setTimeout(() => updateScrollIndicators(), 100);

        function scrollToTarget(target) {
            if (!container || !target) return;

            target.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest',
                scrollMode: 'if-needed'
            });
            
            // Update indicators after scroll animation completes
            setTimeout(() => updateScrollIndicators(), 300);
        }

        function needsScroll() {
            // If container doesn't have oneRowContent class, no scrolling is needed
            if (!container.classList.contains('oneRowContent')) {
                return false;
            }
            
            // Force layout calculation
            container.offsetHeight;
            
            // Calculate content width excluding .showMore elements
            const children = Array.from(container.children);
            const contentWidth = children
                .filter(child => !child.classList.contains('showMore'))
                .reduce((total, child) => total + child.offsetWidth, 0);
            
            return contentWidth > container.clientWidth;
        }
        
        function updateScrollIndicators() {
            // If container doesn't have oneRowContent class, remove all scroll-related classes
            if (!container.classList.contains('oneRowContent')) {
                container.classList.remove('hasMore', 'atStart', 'atEnd');
                return;
            }
            
            const hasOverflow = needsScroll();
            container.classList.toggle('hasMore', hasOverflow);
            
            if (hasOverflow) {
                const { scrollLeft, scrollWidth, clientWidth } = container;
                const maxScroll = scrollWidth - clientWidth;
                const isRTL = document.documentElement.dir === 'rtl';
                
                let atStart, atEnd;
                
                if (isRTL) {
                    // RTL: start is at 0, end is at max scroll (reversed from visual perspective)
                    atStart = Math.abs(scrollLeft) <= 2;
                    atEnd = Math.abs(scrollLeft) >= maxScroll - 2;
                } else {
                    // LTR: start is at 0, end is at max scroll
                    atStart = scrollLeft <= 2;
                    atEnd = scrollLeft >= maxScroll - 2;
                }
                
                container.classList.toggle('atStart', atStart);
                container.classList.toggle('atEnd', atEnd);
            } else {
                container.classList.remove('atStart', 'atEnd');
            }
        }

        // On click - scope to this container only
        Array.from(container.children).forEach(item => {
            item.addEventListener('click', function (e) {
                // Check if parent still has the class
                if (!this.parentElement?.classList.contains('oneRowContent')) return;
                
                // Prevent click if we just finished dragging
                if (dragState.hasDragged) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }
                
                // Only scroll if scrolling is needed
                if (!needsScroll()) return;
                
                // If at end and clicked on showMore, scroll back to start
                if (container.classList.contains('atEnd') && this.classList.contains('showMore')) {
                    e.preventDefault();
                    e.stopPropagation();
                    container.scrollTo({ left: 0, behavior: 'smooth' });
                    setTimeout(() => updateScrollIndicators(), 300);
                    return;
                }
                
                scrollToTarget(this);
            });
        });

        // Mouse wheel horizontal scroll - only if scrolling is needed
        let isScrolling = false;
        container.addEventListener('wheel', (e) => {
            // Check if element still has the class
            if (!container.classList.contains('oneRowContent')) {
                // Reset styles and return
                Object.assign(container.style, {
                    cursor: '',
                    userSelect: '',
                    scrollBehavior: ''
                });
                return;
            }
            
            // Only handle wheel if scrolling is needed
            if (!needsScroll()) return;
            
            if (Math.abs(e.deltaX) >= Math.abs(e.deltaY)) return;
            
            e.preventDefault();
            if (isScrolling) return;
            
            isScrolling = true;
            container.style.scrollBehavior = 'auto';
            
            // Check RTL direction for proper scroll direction
            const isRTL = document.documentElement.dir === 'rtl';
            const scrollMultiplier = isRTL ? -0.8 : 0.8;
            const scrollAmount = e.deltaY * scrollMultiplier;
            const startScroll = container.scrollLeft;
            let frame = 0;
            const duration = 150;
            
            const animate = () => {
                frame += 16;
                const progress = Math.min(frame / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                
                container.scrollLeft = startScroll + (scrollAmount * easeOut);
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    isScrolling = false;
                    container.style.scrollBehavior = 'smooth';
                    updateScrollIndicators();
                }
            };
            requestAnimationFrame(animate);
        }, { passive: false });

        // Drag scroll functionality - only if scrolling is needed
        let dragState = { active: false, startX: 0, scrollLeft: 0, hasDragged: false };
        
        container.addEventListener('mousedown', (e) => {
            // Check if element still has the class
            if (!container.classList.contains('oneRowContent')) {
                Object.assign(container.style, {
                    cursor: '',
                    userSelect: '',
                    scrollBehavior: ''
                });
                return;
            }
            
            // Only enable drag if scrolling is needed
            if (!needsScroll()) return;
            
            dragState = {
                active: true,
                startX: e.pageX,
                scrollLeft: container.scrollLeft,
                hasDragged: false
            };
            
            Object.assign(container.style, {
                cursor: 'grabbing',
                userSelect: 'none',
                scrollBehavior: 'auto'
            });
        });
        
        const handleMouseUp = () => {
            if (dragState.active) {
                dragState.active = false;
                Object.assign(container.style, {
                    cursor: '',
                    userSelect: '',
                    scrollBehavior: container.classList.contains('oneRowContent') ? 'smooth' : ''
                });
                
                // Prevent clicks briefly after dragging
                if (dragState.hasDragged) {
                    setTimeout(() => {
                        dragState.hasDragged = false;
                    }, 100);
                }
            }
        };
        
        const handleMouseMove = (e) => {
            if (!dragState.active) return;
            // Check if element still has the class
            if (!container.classList.contains('oneRowContent')) {
                handleMouseUp();
                return;
            }
            e.preventDefault();
            
            // Mark as dragged if moved more than 3 pixels
            if (Math.abs(e.pageX - dragState.startX) > 3) {
                dragState.hasDragged = true;
            }
            
            container.scrollLeft = dragState.scrollLeft - (e.pageX - dragState.startX) * 1.0;
            updateScrollIndicators();
        };
        
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousemove', handleMouseMove);
        
        // Update indicators on window resize
        window.addEventListener('resize', () => {
            setTimeout(() => updateScrollIndicators(), 100);
        });
    }; // end initializeSingleContainer

    // Auto-initialize row scroll
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeRowScroll);
    } else {
        setTimeout(initializeRowScroll, 50);
    }

    // Expose globally
    window.initializeRowScroll = initializeRowScroll;
})();