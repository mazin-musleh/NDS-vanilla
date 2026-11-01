/* NDS.Weather — public surface
 * Rides: (none — base component)
 * Methods:
 *   NDS.Weather.init()     write every weather item, then again every 15 minutes
 * Events:
 *   (none)
 * Hooks:
 *   .nds-weather                     the item: the script writes its condition icon and its text
 *   data-latitude · data-longitude   on the item: the place; default Riyadh
 *   .nds-weather-city                in the item, optional: the place's name, the page's own text
 *                                    (a data-i18n marker translates it); kept, the weather after it
 * Gotchas:
 *   - Weather comes from the public open-meteo API: no key, no account. A failed request
 *     hides the item ([hidden]).
 *   - Items on the same place share one request and one cache entry (15 minutes), and the
 *     cache serves every language, so a language switch needs no request.
 *   - Day or night is the place's, from the API, not the visitor's clock.
 *   - The cache holds primitives and the DOM is rebuilt from them: nothing stored reaches
 *     the HTML parser.
 */
(() => {
    'use strict';

    const SELECTOR = '.nds-weather';

    // English defaults; the assets/i18n/{lang}.json pack overrides them.
    const strings = NDS.i18n.getStrings('weather', {
        weather: '{desc}, {temp}°C',
        weather_city: '· {desc}, {temp}°C',
        clear: 'Clear',
        partly_cloudy: 'Partly Cloudy',
        overcast: 'Overcast',
        fog: 'Fog',
        rain: 'Rain',
        snow: 'Snow',
        storm: 'Storm',
    });

    // WMO weather code, up to and including the first number → condition, day icon, night icon.
    const conditions = [
        [1, 'clear', 'nds-hgi-sun-03', 'nds-hgi-moon-02'],
        [2, 'partly_cloudy', 'nds-hgi-sun-cloud-01', 'nds-hgi-moon-cloud'],
        [3, 'overcast', 'nds-hgi-cloud'],
        [48, 'fog', 'nds-hgi-slow-winds'],
        [67, 'rain', 'nds-hgi-cloud-angled-rain'],
        [77, 'snow', 'nds-hgi-cloud-snow'],
        [82, 'rain', 'nds-hgi-cloud-angled-rain'],
        [86, 'snow', 'nds-hgi-cloud-snow'],
        [99, 'storm', 'nds-hgi-cloud-angled-rain-zap'],
    ];
    const findCondition = (name) => conditions.find(([, condition]) => condition === name);

    const readPlace = (el) => ({ latitude: +(el.dataset.latitude || 24.7136), longitude: +(el.dataset.longitude || 46.6753) });

    // Place → its request in flight, so two items on one city make one request.
    const requests = new Map();
    function fetchWeather({ latitude, longitude }) {
        const key = `weather:${latitude},${longitude}`;
        const cached = NDS.cache.get(key);
        if (cached && findCondition(cached.condition)) return Promise.resolve(cached);
        if (!requests.has(key)) {
            requests.set(key, NDS.request(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
                { timeout: 10000, json: true }
            ).then(({ data }) => {
                const current = data?.current_weather;
                const match = current && conditions.find(([max]) => current.weathercode <= max);
                if (!match) throw new Error('NDS Weather: no current weather');
                const payload = { condition: match[1], temperature: Math.round(current.temperature), isDay: current.is_day === 1 };
                NDS.cache.set(key, payload, 15);
                return payload;
            }).finally(() => requests.delete(key)));
        }
        return requests.get(key);
    }

    // Built imperatively: every value flows through className and text, never the HTML parser.
    function renderWeather(el, { condition, temperature, isDay }) {
        const [, , dayIcon, nightIcon = dayIcon] = findCondition(condition);
        const icon = document.createElement('i');
        icon.className = 'nds-icon ' + (isDay ? dayIcon : nightIcon);
        NDS.aria.hidden(icon, true);
        // The name is the page's own text, so a marker on it keeps working.
        const city = el.querySelector(':scope > .nds-weather-city');
        const text = strings.text(city ? 'weather_city' : 'weather', { desc: strings.text(condition), temp: temperature });
        el.replaceChildren(...[icon, city, text].filter(Boolean));
        el.hidden = false;
    }

    function syncWeather() {
        if (!strings.ready()) { strings.load().then(syncWeather); return; }
        document.querySelectorAll(SELECTOR).forEach((el) => {
            fetchWeather(readPlace(el)).then((payload) => renderWeather(el, payload), () => { el.hidden = true; });
        });
    }

    let initDone = false;
    function init() {
        // On a cache miss this is a request: keep it off the hydration path.
        NDS.onIdle(syncWeather);
        if (initDone) return;
        initDone = true;
        setInterval(() => { if (!document.hidden) syncWeather(); }, 15 * 60 * 1000);
        NDS.onAttributeChange('html', ['lang'], syncWeather);
    }

    NDS.Weather = { init };
})();
