// Top bar: the expander (the stamp and a second one added later), Today (core Date), Clock and Weather
// (plans/stamp-and-widgets.md). Weather's requests are answered here, so the run needs no network.
//
//   node scripts/check-topbar.mjs [baseUrl]      ENGINE=webkit for Safari
import { launch, log } from './lib/browser.mjs';

const BASE = (process.argv.find((a) => a.startsWith('http')) || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');
const browser = await launch();
let failed = 0;
const check = (ok, msg) => { if (!ok) failed++; log(`${ok ? 'pass' : 'FAIL'} ${msg}`); };

async function open(path, width = 1280, onRoute) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await ctx.newPage();
    if (onRoute) await page.route('https://api.open-meteo.com/**', onRoute);
    await page.goto(`${BASE}/${path}`, { waitUntil: 'load' });
    await page.waitForFunction(() => document.documentElement.hasAttribute('data-nds-loaded'));
    await page.evaluate(() => document.getElementById('nds-cookies-panel')?.remove());
    // Started, not only loaded: a bundle defines its namespace before the loader runs its init().
    await page.evaluate(() => NDS.init.ready);
    return page;
}
const state = (page, sel) => page.evaluate((s) => {
    const el = document.querySelector(s);
    return { state: el.getAttribute('data-state') || '', hidden: el.hidden };
}, sel);
const settle = (page) => page.waitForTimeout(600);

// Expander: the stamp opens, closes, Escape, outside click; a second expander added later swaps with it.
{
    const page = await open('components/button.html');
    await page.evaluate(() => {
        window.__events = [];
        ['nds:topbar:opened', 'nds:topbar:closed'].forEach((name) => document.addEventListener(name, (e) => __events.push(`${name}:${e.detail.expander.id}`)));
    });
    const tab = '[data-topbar-toggle][aria-controls="nds-digital-stamp"]';
    await page.click(tab);
    await settle(page);
    let s = await state(page, '#nds-digital-stamp');
    check(s.state.includes('open') && !s.hidden, 'stamp: a click on its tab opens it');
    check(await page.getAttribute(tab, 'aria-expanded') === 'true', 'stamp: the tab says expanded');
    await page.click(tab);
    await settle(page);
    s = await state(page, '#nds-digital-stamp');
    check(!s.state && s.hidden, 'stamp: a second click closes and hides it');

    await page.click(tab);
    await settle(page);
    await page.keyboard.press('Escape');
    await settle(page);
    check((await state(page, '#nds-digital-stamp')).hidden, 'stamp: Escape closes it');

    await page.click(tab);
    await settle(page);
    await page.mouse.click(640, 800);
    await settle(page);
    check((await state(page, '#nds-digital-stamp')).hidden, 'stamp: a click outside closes it');

    await page.evaluate(() => {
        const btn = Object.assign(document.createElement('button'), { type: 'button', className: 'nds-btn', textContent: 'More' });
        btn.setAttribute('data-topbar-toggle', '');
        btn.setAttribute('aria-controls', 'check-expander');
        btn.setAttribute('aria-expanded', 'false');
        document.querySelector('.nds-topbar-info').append(btn);
        const expander = Object.assign(document.createElement('div'), { id: 'check-expander', className: 'nds-topbar-expander', hidden: true });
        expander.innerHTML = '<div class="nds-content-wrapper"><div class="nds-topbar-expander-content"><p>Second strip</p></div></div>';
        document.getElementById('nds-digital-stamp').after(expander);
    });
    // The slide starts at 0fr: a collapsed strip is 0px tall, its content's spacing included.
    const collapsed = await page.evaluate(() => ['nds-digital-stamp', 'check-expander'].map((id) => {
        const el = document.getElementById(id);
        el.hidden = false;
        el.setAttribute('data-state', 'open opening');
        const height = el.getBoundingClientRect().height;
        el.removeAttribute('data-state');
        el.hidden = true;
        return height;
    }));
    check(collapsed.every((h) => h < 1), `slide: a collapsed strip is 0px tall (${collapsed.join(', ')})`);

    await page.click(tab);
    await settle(page);
    await page.evaluate(() => { __events = []; });
    await page.click('[aria-controls="check-expander"]');
    const mid = await page.evaluate(() => ({ queued: !NDS.Topbar.isOpen('check-expander'), stampClosing: document.getElementById('nds-digital-stamp').getAttribute('data-state')?.includes('closing') }));
    check(mid.queued && mid.stampClosing, 'queue: the second waits while the stamp slides closed');
    await settle(page);
    await settle(page);
    check((await state(page, '#check-expander')).state.includes('open'), 'second expander: added after load, it opens with no init');
    check((await state(page, '#nds-digital-stamp')).hidden, 'second expander: opening it closes the stamp');
    const order = await page.evaluate(() => __events.join(' > '));
    check(order === 'nds:topbar:closed:nds-digital-stamp > nds:topbar:opened:check-expander', `queue: closed, then opened (${order})`);

    await page.evaluate(() => NDS.Topbar.open('nds-digital-stamp'));
    await settle(page);
    await settle(page);
    check(await page.evaluate(() => NDS.Topbar.isOpen('nds-digital-stamp') && !NDS.Topbar.isOpen('check-expander')), 'api: NDS.Topbar.open swaps them too');
    const events = await page.evaluate(() => __events);
    check(events.includes('nds:topbar:opened:check-expander') && events.includes('nds:topbar:closed:nds-digital-stamp'),
        `events: opened and closed name their expander (${events.length} fired)`);
    await page.context().close();
}

// Today and Clock: written on a desktop, skipped where data-hidden hides them, written once shown.
{
    const page = await open('components/button.html');
    const read = () => page.evaluate(() => {
        const today = document.querySelector('time[data-date-today]');
        const clock = document.querySelector('time.nds-clock');
        return { lang: document.documentElement.lang, todayText: today.textContent.trim(), datetime: today.getAttribute('datetime'), clock: clock.textContent };
    });
    let r = await read();
    const iso = await page.evaluate(() => { const d = NDS.Date.getToday(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; });
    check(r.datetime === iso, `today: datetime is today (${r.datetime})`);
    check(/\d{4}/.test(r.todayText), `today: text written, ${r.lang} page ("${r.todayText}")`);
    check(/^\d{1,2}:\d{2} (AM|PM)$/.test(r.clock), `clock: h:mm AM ("${r.clock}")`);

    const other = r.lang.startsWith('ar') ? 'en' : 'ar';
    await page.evaluate((lang) => { document.documentElement.lang = lang; }, other);
    await page.waitForTimeout(1500);
    const switched = (await read()).todayText;
    check(switched && switched !== r.todayText, `today: an in-place switch to ${other} writes it again ("${switched}")`);
    await page.context().close();

    const phone = await open('components/button.html', 390);
    r = await phone.evaluate(() => ({ today: document.querySelector('time[data-date-today]').textContent, clock: document.querySelector('time.nds-clock').textContent }));
    check(!r.today && !r.clock, 'phone: the hidden date and clock are not written');
    await phone.setViewportSize({ width: 1280, height: 900 });
    await phone.waitForTimeout(800);
    r = await phone.evaluate(() => ({ today: document.querySelector('time[data-date-today]').textContent, clock: document.querySelector('time.nds-clock').textContent }));
    check(!!r.today && !!r.clock, 'phone → desktop: both are written once shown');
    await phone.context().close();
}

// Weather: two items on one place make one request; day and night come from the API; a failure hides.
{
    const requests = [];
    const page = await open('components/button.html', 1280, (route) => {
        const url = new URL(route.request().url());
        requests.push(url.searchParams.get('latitude'));
        if (url.searchParams.get('latitude') === '1') return route.fulfill({ status: 500, body: '' });
        const night = url.searchParams.get('latitude') === '21.4858';
        return route.fulfill({ contentType: 'application/json', body: JSON.stringify({ current_weather: { temperature: 30.4, weathercode: 0, is_day: night ? 0 : 1 } }) });
    });
    await page.evaluate(() => {
        Object.keys(localStorage).filter((k) => k.includes('weather')).forEach((k) => localStorage.removeItem(k));
        const box = document.createElement('div');
        box.id = 'check-weather';
        box.innerHTML = `
            <span class="nds-meta-item nds-weather" data-latitude="24.7136" data-longitude="46.6753"><span class="nds-weather-city">Riyadh</span></span>
            <span class="nds-meta-item nds-weather" data-latitude="24.7136" data-longitude="46.6753"></span>
            <span class="nds-meta-item nds-weather" data-latitude="21.4858" data-longitude="39.1925"><span class="nds-weather-city">Jeddah</span></span>
            <span class="nds-meta-item nds-weather" data-latitude="1" data-longitude="1"></span>`;
        document.querySelector('main').prepend(box);
        return NDS.init.mount(box);
    });
    await page.waitForTimeout(3000);
    const items = await page.evaluate(() => [...document.querySelectorAll('#check-weather .nds-weather')].map((el) => ({
        text: el.textContent, icon: el.querySelector('.nds-icon')?.className || '', hidden: el.hidden,
    })));
    check(requests.filter((lat) => lat === '24.7136').length === 1, `weather: two items on one place, one request (${requests.join(', ')})`);
    check(/^Riyadh· /.test(items[0].text) && /30/.test(items[0].text), `weather: the city kept, then the weather ("${items[0].text}")`);
    check(/^Clear, 30/.test(items[1].text), `weather: no city, no name ("${items[1].text}")`);
    check(items[0].icon.includes('sun') && items[2].icon.includes('moon'), 'weather: day and night icons from is_day');
    check(items[3].hidden, 'weather: a failed request hides the item');
    await page.context().close();
}

await browser.close();
log(failed ? `${failed} failed` : 'all passed');
process.exit(failed ? 1 : 0);
