// Filter date group across picker formats, calendars and modes, in the menu (Apply) and outside it
// (a committed date applies, once): apply, then reload from the URL (also with the Date Picker's
// bundle late; a load applies nothing of its own). Expected items come from NDS.Date in the page.
// Then a form (server mode) and a panel with Apply: the date waits, and the request carries it.
import { launch } from './lib/browser.mjs';

const ITEMS = ['2026-09-25', '2026-10-02', '2026-10-12', '2026-10-19', '2026-10-31', '2026-11-05', '2026-11-12', '2027-01-05'];
const CASES = [
    { name: 'range DD/MM/YYYY', range: true, format: 'DD/MM/YYYY', pick: ['2026-10-12', '2026-10-31'] },
    { name: 'range MM/DD/YYYY', range: true, format: 'MM/DD/YYYY', pick: ['2026-10-12', '2026-10-31'] },
    { name: 'range YYYY/MM/DD', range: true, format: 'YYYY/MM/DD', pick: ['2026-10-12', '2026-10-31'] },
    { name: 'range Hijri', range: true, format: 'DD/MM/YYYY', hijri: true, pick: ['2026-10-12', '2026-10-31'] },
    { name: 'one day', format: 'DD/MM/YYYY', pick: ['2026-10-19'] },
    { name: 'month', format: 'MM/YYYY', pick: ['2026-10-19'] },
    { name: 'month Hijri', format: 'MM/YYYY', hijri: true, pick: ['2026-10-19'] },
    { name: 'year', format: 'YYYY', pick: ['2026-10-19'] },
    { name: 'year Hijri', format: 'YYYY', hijri: true, pick: ['2026-10-19'] },
    // Outside the menu, in the toolbar as its own surface: no Apply, a committed date applies.
    { name: 'outside, range', outside: true, range: true, format: 'DD/MM/YYYY', pick: ['2026-10-12', '2026-10-31'] },
    { name: 'outside, Hijri month', outside: true, format: 'MM/YYYY', hijri: true, pick: ['2026-10-19'] },
];

const group = (c) => `
        <fieldset class="nds-form-group${c.outside ? '' : ' nds-dropmenu-group'}" data-filter="day"${c.outside ? ' data-filter-target="dm-items"' : ''}>
          <legend class="nds-label">Day</legend>
          <div class="nds-form-container nds-date-picker${c.range ? ' nds-date-range' : ''}" data-format="${c.format}"${c.hijri ? ' data-calendar="hijri"' : ''}>
            <div class="nds-form-control">
              <input type="text" id="dm-day" class="nds-input nds-date-input" aria-label="Day">
            </div>
            <input type="hidden" class="nds-date-value" data-date-format="YYYY-MM-DD" data-calendar="gregory">
            ${c.range ? '<input type="hidden" class="nds-date-value" data-date-format="YYYY-MM-DD" data-calendar="gregory">' : ''}
          </div>
        </fieldset>`;
const html = (c) => `
<div class="nds-toolbar">
  ${c.outside ? group(c) : ''}
  <div class="nds-dropmenu nds-filter" data-filter-target="dm-items">
    <button class="nds-btn nds-neutral nds-menu-btn nds-filter-btn nds-dropmenu-trigger" type="button"><span class="nds-label">Filter</span></button>
    <div class="nds-dropmenu-menu" hidden>
      <div class="nds-dropmenu-scroll">
        ${c.outside ? `<div data-filter="kind" data-filter-type="checkbox" data-filter-legend="Kind" data-filter-values='["one"]'></div>` : group(c)}
      </div>
      <div class="nds-dropmenu-footer"><div class="nds-dropmenu-action">
        <button class="nds-btn nds-primary nds-dropmenu-item" type="button" data-filter-action="apply"><span class="nds-label">Apply</span></button>
      </div></div>
    </div>
  </div>
  <div class="nds-filter-applied" data-filter-target="dm-items" hidden><div class="nds-chips"></div></div>
</div>
<div id="dm-items" data-filter-items="dm-item">${ITEMS.map((d) => `<div class="dm-item"><time data-filter="day" data-filter-value="${d}">${d}</time></div>`).join('')}</div>`;

const browser = await launch();
const page = await browser.newPage();
const warnings = [];
page.on('console', (m) => /NDS Filter/.test(m.text()) && warnings.push(m.text().slice(0, 140)));
page.on('pageerror', (e) => warnings.push('pageerror ' + e.message));
let lateExtras = false;
await page.route(/nds-extras\.min\.js/, async (r) => { if (lateExtras) await new Promise((ok) => setTimeout(ok, 1500)); r.continue(); });

const mount = async (c, q = '') => {
    await page.goto('http://localhost:4002/NDS-vanilla/playground' + q, { waitUntil: 'load' });
    await page.waitForFunction(() => document.documentElement.hasAttribute('data-nds-loaded'), null, { timeout: 10000 });
    await page.evaluate(async (h) => { const box = document.createElement('section'); box.id = 'dm-box'; box.innerHTML = h; document.body.prepend(box); await NDS.init.mount(box); }, html(c));
    await page.waitForTimeout(lateExtras ? 2500 : 700);
    // Count the passes a commit runs from here on: a load from the URL adds none of its own.
    await page.evaluate(() => { const f = document.querySelector('#dm-box .nds-filter').ndsFilter; window.__passes = 0; const sync = f.syncFilters; f.syncFilters = function () { window.__passes++; return sync.apply(this, arguments); }; });
};
const shown = () => page.evaluate(() => [...document.querySelectorAll('#dm-items .dm-item')].filter((i) => !i.hidden && getComputedStyle(i).display !== 'none').map((i) => i.textContent.slice(2)).join(' '));
const chip = () => page.evaluate(() => document.querySelector('#dm-box .nds-chips')?.innerText.replace(/\s+/g, ' ').trim() || '-');

let bad = 0;
for (const c of CASES) {
    await mount(c);
    // Type the pick in the field's own format and calendar, as a user would.
    const expect = await page.evaluate(({ c, items }) => {
        const cal = c.hijri ? 'hijri' : 'gregory';
        const date = (iso) => { const [y, m, d] = iso.split('-').map(Number); return new Date(y, m - 1, d); };
        const text = c.pick.map((iso) => NDS.Date.format(date(iso), { format: c.format, calendar: cal })).join(' - ');
        NDS.setValue(document.getElementById('dm-day'), text);
        // Independent expectation: the same unit of the calendar as the pick, or inside the range.
        const unit = c.format.includes('D') ? null : c.format;
        return { text, items: items.filter((iso) => unit
            ? NDS.Date.format(date(iso), { format: unit, calendar: cal }) === NDS.Date.format(date(c.pick[0]), { format: unit, calendar: cal })
            : c.pick.length > 1 ? iso >= c.pick[0] && iso <= c.pick[1] : iso === c.pick[0]).map((iso) => iso.slice(2)).join(' ') };
    }, { c, items: ITEMS });
    if (!c.outside) {
        await page.click('#dm-box .nds-filter-btn');
        await page.click('#dm-box [data-filter-action="apply"]');
    }
    await page.waitForTimeout(400);
    const applied = await shown(), url = await page.evaluate(() => location.search), label = await chip();
    const passes = await page.evaluate(() => window.__passes);
    await mount(c, url);
    const reloaded = await shown();
    const loadPasses = await page.evaluate(() => window.__passes);
    lateExtras = true; await mount(c, url); const late = await shown(); lateExtras = false;
    const ok = applied === expect.items && reloaded === expect.items && late === expect.items && passes === 1 && loadPasses === 0;
    if (!ok) bad++;
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${c.name.padEnd(17)} typed "${expect.text}"  chip "${label}"  ${decodeURIComponent(url)}`);
    if (!ok) console.log(`      want ${expect.items} | applied ${applied} | reload ${reloaded} | late picker ${late} | passes ${passes} (want 1), on load ${loadPasses} (want 0)`);
}

// An item whose day is not YYYY-MM-DD never matches, and says so once.
await mount(CASES[0]);
await page.evaluate(() => { const t = document.querySelector('#dm-items time'); t.dataset.filterValue = '19/10/2026'; });
await page.evaluate(() => NDS.setValue(document.getElementById('dm-day'), '01/09/2026 - 31/12/2026'));
await page.click('#dm-box .nds-filter-btn'); await page.click('#dm-box [data-filter-action="apply"]'); await page.waitForTimeout(400);
const warned = warnings.filter((w) => /never matches/.test(w));
console.log(`${warned.length === 1 ? 'PASS' : 'FAIL'}  bad item format warns once: ${warned[0] || 'no warning'}`);
// A form (server mode) or a panel with Apply: a picked date waits for the submit or the Apply, and
// the request the form sends carries it, keyed like the URL.
await page.goto('http://localhost:4002/NDS-vanilla/playground', { waitUntil: 'load' });
await page.waitForFunction(() => document.documentElement.hasAttribute('data-nds-loaded'));
const field = (id, extra = '') => `<fieldset class="nds-form-group" data-filter="day"${extra}><legend class="nds-label">Day</legend>
  <div class="nds-form-container nds-date-picker nds-date-range"><div class="nds-form-control"><input type="text" id="${id}" class="nds-input nds-date-input" aria-label="Day"></div>
  <input type="hidden" class="nds-date-value" data-date-format="YYYY-MM-DD" data-calendar="gregory"><input type="hidden" class="nds-date-value" data-date-format="YYYY-MM-DD" data-calendar="gregory"></div></fieldset>`;
const waits = await page.evaluate(async ({ form, panel }) => {
    const sent = [];
    NDS.request = (url) => { sent.push(url); return Promise.resolve({ isJson: false, data: '<div id="ds" data-filter-items>served</div>' }); };
    const host = document.createElement('div');
    host.innerHTML = form + panel;
    document.body.prepend(host);
    await NDS.init.mount(host);
    await new Promise((r) => setTimeout(r, 600));
    const settle = () => new Promise((r) => setTimeout(r, 300));
    NDS.setValue(document.getElementById('ds-day'), '12/10/2026 - 31/10/2026');
    await settle();
    const beforeSubmit = sent.length;
    NDS.Filter.getByTarget('ds').submitForm();
    await settle();
    const day = sent.length ? new URLSearchParams(sent.at(-1).split('?')[1] || '').get('day') : null;
    const shown = () => [...document.querySelectorAll('#pa-items .pa-item')].filter((i) => getComputedStyle(i).display !== 'none' && !i.hidden).length;
    NDS.setValue(document.getElementById('pa-day'), '12/10/2026 - 31/10/2026');
    await settle();
    const panelBefore = shown();
    document.querySelector('#pa-panel [data-filter-action="apply"]').click();
    await settle();
    return { beforeSubmit, sent: sent.length, day, panelBefore, panelAfter: shown() };
}, {
    form: `<form id="dsForm" data-filter-target="ds" data-filter-submit data-ajax method="get" action="/api/search">
        <button type="submit" class="nds-btn nds-primary" data-filter-action="apply"><span class="nds-label">Search</span></button></form>
      <div class="nds-filter" data-filter-target="ds">${field('ds-day')}</div><div id="ds" data-filter-items></div>`,
    panel: `<div id="pa-panel" class="nds-filter" data-filter-target="pa-items">${field('pa-day')}
        <button type="button" class="nds-btn nds-primary" data-filter-action="apply"><span class="nds-label">Apply</span></button></div>
      <div id="pa-items" data-filter-items="pa-item">${ITEMS.map((d) => `<div class="pa-item"><time data-filter="day" data-filter-value="${d}">${d}</time></div>`).join('')}</div>`,
});
const formOk = waits.beforeSubmit === 0 && waits.sent === 1 && waits.day === '2026-10-12..2026-10-31';
const panelOk = waits.panelBefore === ITEMS.length && waits.panelAfter === 3;
console.log(`${formOk ? 'PASS' : 'FAIL'}  form (server mode): ${waits.beforeSubmit} request(s) on the pick (want 0), then ${waits.sent} on submit carrying day=${waits.day}`);
console.log(`${panelOk ? 'PASS' : 'FAIL'}  panel with Apply: ${waits.panelBefore} of ${ITEMS.length} shown after the pick (want all), ${waits.panelAfter} after Apply (want 3)`);
if (!formOk || !panelOk) bad++;

const other = warnings.filter((w) => !/never matches/.test(w));
if (other.length) console.log('other warnings: ' + other.join(' | '));
await browser.close();
process.exit(bad || warned.length !== 1 ? 1 : 0);
