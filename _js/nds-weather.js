/* NDS.Weather — public surface
 * Rides: (none — base component)
 * Methods:
 *   NDS.Weather.init()     write every weather item, then again every 15 minutes
 * Events:
 *   (none)
 * Hooks:
 *   .nds-weather                     the item; its layout is the author's, the script fills its slots
 *   data-latitude · data-longitude   on the item: the place; default Riyadh
 *   data-weather-unit                on the item: c (default) or f, the unit the service sends
 *   .nds-weather-icon                slot: the script adds the condition's icon class
 *   .nds-weather-condition           slot: the script writes the condition, in the page language
 *   .nds-weather-temp                slot: the script writes the number only; the unit is the author's
 *   .nds-weather-city                optional: the place's name, the page's own text (a data-i18n
 *                                    marker translates it); never written
 * Gotchas:
 *   - An item with no slot gets the auto line: the pack's (icon, name, condition, temperature, unit),
 *     built again on each render so a language switch re-words it.
 *   - A slot's own text, such as a "--" placeholder, stays until the script writes it.
 *   - Weather comes from the public open-meteo API: no key, no account. A failed request
 *     hides the item ([hidden]).
 *   - Items on the same place and unit share one request and one cache entry (15 minutes), and the
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
        weather: '{desc}, {temp}{unit}',
        weather_city: '· {desc}, {temp}{unit}',
        celsius: '°C',
        fahrenheit: '°F',
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

    const readUnit = (el) => (el.dataset.weatherUnit?.toLowerCase() === 'f' ? 'fahrenheit' : 'celsius');
    const readQuery = (el) => ({ latitude: +(el.dataset.latitude || 24.7136), longitude: +(el.dataset.longitude || 46.6753), unit: readUnit(el) });

    // Place and unit → the request in flight, so two items on one city make one request.
    const requests = new Map();
    function fetchWeather({ latitude, longitude, unit }) {
        const key = `weather:${latitude},${longitude},${unit}`;
        const cached = NDS.cache.get(key);
        if (cached && findCondition(cached.condition)) return Promise.resolve(cached);
        if (!requests.has(key)) {
            requests.set(key, NDS.request(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=${unit}`,
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

    const SLOTS = '.nds-weather-icon, .nds-weather-condition, .nds-weather-temp';
    const iconClasses = [...new Set(conditions.flatMap(([, , dayIcon, nightIcon]) => [dayIcon, nightIcon]).filter(Boolean))];
    // Items with no slot of their own: the layout is the pack's, so it is built again in each language.
    const autoItems = new WeakSet();

    // The auto line: the pack's, its {desc} and {temp} as slots. The name is the page's own node, so a marker on it keeps working.
    function renderAutoLine(el, unit) {
        const icon = document.createElement('i');
        icon.className = 'nds-icon nds-weather-icon';
        NDS.aria.hidden(icon, true);
        const city = el.querySelector('.nds-weather-city');
        const text = document.createElement('span');
        if (city) text.append(city, ' ');
        strings.text(city ? 'weather_city' : 'weather', { unit: strings.text(unit) }).split(/(\{desc\}|\{temp\})/).filter(Boolean).forEach((piece) => {
            if (piece !== '{desc}' && piece !== '{temp}') return text.append(piece);
            const slot = document.createElement('span');
            slot.className = piece === '{desc}' ? 'nds-weather-condition' : 'nds-weather-temp';
            text.append(slot);
        });
        el.replaceChildren(icon, ' ', text);
        autoItems.add(el);
    }

    // Fills the slots only: every value flows through className and text, never the HTML parser.
    function setWeather(el, { condition, temperature, isDay }) {
        if (autoItems.has(el) || !el.querySelector(SLOTS)) renderAutoLine(el, readUnit(el));
        const [, , dayIcon, nightIcon = dayIcon] = findCondition(condition);
        el.querySelectorAll('.nds-weather-icon').forEach((icon) => {
            icon.classList.remove(...iconClasses);
            icon.classList.add(isDay ? dayIcon : nightIcon);
        });
        el.querySelectorAll('.nds-weather-condition').forEach((slot) => { slot.textContent = strings.text(condition); });
        el.querySelectorAll('.nds-weather-temp').forEach((slot) => { slot.textContent = temperature; });
        el.hidden = false;
    }

    function syncWeather() {
        if (!strings.ready()) { strings.load().then(syncWeather); return; }
        document.querySelectorAll(SELECTOR).forEach((el) => {
            fetchWeather(readQuery(el)).then((payload) => setWeather(el, payload), () => { el.hidden = true; });
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
