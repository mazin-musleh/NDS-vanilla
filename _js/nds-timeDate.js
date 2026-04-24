// Time & Date - Simplified with Core Functions
(() => {
    'use strict';

    // Helper to get Saudi Arabia date (GMT+3)
    function getSaudiDate() {
        return new Date().toLocaleDateString('en-CA', {
            timeZone: 'Asia/Riyadh'
        });
    }

    // Simple cache helper with date validation
    function getCache(key) {
        try {
            const data = localStorage.getItem(`nds_${key}`);
            if (data) {
                const parsed = JSON.parse(data);
                // Check if cache is still valid by timestamp AND date (Saudi Arabia time)
                const today = getSaudiDate();
                if (Date.now() < parsed.expires && parsed.date === today) {
                    return parsed.value;
                }
                // Remove expired or old-date cache
                localStorage.removeItem(`nds_${key}`);
            }
        } catch {}
        return null;
    }

    function setCache(key, value, minutes) {
        try {
            const today = getSaudiDate();
            localStorage.setItem(`nds_${key}`, JSON.stringify({
                value,
                expires: Date.now() + (minutes * 60 * 1000),
                date: today // Store the date when cache was created (Saudi Arabia time)
            }));
        } catch {}
    }

    // Add this function to clear specific cache
  function clearHijriCache(date = null) {
      const targetDate = date || getSaudiDate();
      localStorage.removeItem(`nds_hijri_ar_${targetDate}`);
      localStorage.removeItem(`nds_hijri_en_${targetDate}`);
      localStorage.removeItem(`nds_hijri_data_${targetDate}`);
  }

    // Hijri date with efficient dual-language caching
    async function getHijriDate(isArabic, returnStructured = false) {
        const today = getSaudiDate();
        const arabicKey = `hijri_ar_${today}`;
        const englishKey = `hijri_en_${today}`;
        const dataKey = `hijri_data_${today}`;

        // Check if we already have all three cached
        const arabicCached = getCache(arabicKey);
        const englishCached = getCache(englishKey);
        const dataCached = getCache(dataKey);

        //console.log('Cache check:', { arabicCached: !!arabicCached, englishCached: !!englishCached, dataCached: !!dataCached });

        if (arabicCached && englishCached && dataCached) {
           /*  console.log('All cached - arabicCached:', arabicCached);
            console.log('All cached - englishCached:', englishCached);
            console.log('All cached - dataCached:', dataCached); */
            return returnStructured ? dataCached : (isArabic ? arabicCached : englishCached);
        }

        try {
            const now = new Date();
            const dateStr = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear()}`;
            
            const response = await fetch(
                `https://api.aladhan.com/v1/gToH/${dateStr}`,
                { signal: AbortSignal.timeout(5000) }
            );

            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();

            if (data.code === 200) {
                const hijri = data.data.hijri;
                
                // Create both language versions from single API response
                const arabicDate = `${hijri.day} ${hijri.month.ar} ${hijri.year} هـ`;
                const englishDate = `${hijri.day} ${hijri.month.en} ${hijri.year} AH`;
                
                // Create structured data
                const hijriData = {
                    day: parseInt(hijri.day),
                    month: parseInt(hijri.month.number),
                    year: parseInt(hijri.year)
                };
                
                // Cache all three for 24 hours
                setCache(arabicKey, arabicDate, 24 * 60);
                setCache(englishKey, englishDate, 24 * 60);
                setCache(dataKey, hijriData, 24 * 60);
                
                return returnStructured ? hijriData : (isArabic ? arabicDate : englishDate);
            }
            throw new Error('Invalid API response');
        } catch (error) {
            // Fallback to browser calculation
            const date = new Date();
            if (isArabic) {
                const hijri = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {
                    day: 'numeric', month: 'long', year: 'numeric'
                }).format(date);
                return hijri.includes('هـ') ? hijri : `${hijri} هـ`;
            } else {
                const hijri = new Intl.DateTimeFormat('en-US-u-ca-islamic', {
                    day: 'numeric', month: 'long', year: 'numeric'
                }).format(date);
                return hijri.includes('AH') ? hijri : `${hijri} AH`;
            }
        }
    }

    // Date function with caching
    async function updateDate() {
        const el = document.getElementById('nds-date');
        if (!el) return;

        const isArabic = NDS.isArabic;
        const today = getSaudiDate();
        const type = el.dataset?.calendar || (isArabic ? 'hijri' : 'gregorian');
        const cacheKey = `date_${type}_${isArabic}_${today}`;

        // Check cache first (24 hours)
        const cached = getCache(cacheKey);
        if (cached) {
            el.innerHTML = cached;
            el.style.display = '';
            return;
        }

        let content;
        
        if (type === 'hijri') {
            content = await getHijriDate(isArabic);
        } else {
            // Gregorian date
            const locale = isArabic ? 'ar-SA' : 'en-US';
            content = new Intl.DateTimeFormat(locale, {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            }).format(new Date());
        }

        if (content) {
            const html = `<i class="nds-icon nds-hgi-calendar-03" aria-hidden="true"></i><span class="text">${NDS.escapeHtml(content)}</span>`;
            el.innerHTML = html;
            el.style.display = '';
            
            // Cache for 24 hours
            setCache(cacheKey, html, 24 * 60);
        } else {
            el.style.display = 'none';
        }
    }

    // Clock function (no caching needed)
    function updateClock() {
        const el = document.getElementById('nds-realTimeClock');
        if (!el) return;

        const now = new Date();
        const h = now.getHours();
        const m = now.getMinutes();
        const s = now.getSeconds();
        const time = `${h % 12 || 12}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
        
        el.innerHTML = `<i class="nds-icon nds-hgi-clock-01" aria-hidden="true"></i><span class="text">${time}</span>`;
    }



    function initializeTimeDate() {
        const dateEl = document.getElementById('nds-date');
        const clockEl = document.getElementById('nds-realTimeClock');
        
        if (dateEl) {
            updateDate();
            // Update date every 24 hours
            setInterval(updateDate, 24 * 60 * 60 * 1000);
        }
        
        if (clockEl) {
            updateClock();
            // Update clock every second
            setInterval(updateClock, 1000);
        }
    }

    // CRITICAL: Expose global functions immediately (called by unified init system)
    if (typeof window !== 'undefined') {
        window.updateDate = updateDate;
        window.updateClock = updateClock;
        NDS.TimeDate = {
            init: initializeTimeDate,
            getHijriDate: getHijriDate
        };
    }

    // Note: Initialization now handled by nds-loader.js unified system

})();