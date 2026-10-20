// Menus inside a Modal whose content scrolls, built from the doc canons: custom select, date picker
// (+ its month menu), time picker (+ its hour select), multiselect, autocomplete, dropmenu. Each one:
// opens next to its trigger and on top, follows the modal's scroll, closes on Escape, an outside
// click and a pick without closing the modal, stays in view low in the modal, and closes when its
// trigger scrolls out of the scroll box. Plus: a modal closed with a menu open leaves none behind.
//   node scripts/check-menus-in-modal.mjs [baseUrl]    ENGINE=webkit for Safari, PHONE=1 for a 390px sheet
//   OLD_PW=<folder>  runs that folder's older playwright-core WebKit (1.38.1 = Safari 17.0, 1.34.3 = 16.4 with no popover); see plans/top-layer.md
//   SHORT=1          a 300px modal, shorter than the menus: without popover a scroll box used to cut them off
import { launch, ENGINE as E } from './lib/browser.mjs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
const old = process.env.OLD_PW && (await import(pathToFileURL(resolve(process.env.OLD_PW, 'node_modules/playwright-core/index.mjs')).href)).webkit;
const ENGINE = old ? 'webkit (OLD_PW)' : E;
const BASE = (process.argv[2] || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');
const PHONE = !!process.env.PHONE;
const SHORT = !!process.env.SHORT;
const browser = old ? await old.launch() : await launch();
const page = await browser.newPage(PHONE ? { viewport: { width: 390, height: 844 }, isMobile: E === 'chromium' && !old ? true : undefined, hasTouch: true }
  : { viewport: { width: 1280, height: 800 } });
const errors = [];
page.on('pageerror', (e) => { if (!/ResizeObserver loop/.test(e.message)) errors.push(e.message); });
let fails = 0;
const ok = (name, pass, detail = '') => { if (!pass) fails++; console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? '  — ' + detail : ''}`); };
const wait = (ms = 400) => page.waitForTimeout(ms);

await page.goto(`${BASE}/components/modal.html`, { waitUntil: 'load' });
await page.waitForFunction(() => window.NDS?.init?.mount);
await page.addStyleTag({ content: '#nds-cookies-panel { display: none !important; }' });

// Build the modal from the doc canons, each field between filler so the content scrolls.
// flex: none — the card content is a flex column and would squash the filler to nothing.
await page.evaluate(async ([BASE, SHORT]) => {
  const canon = async (pageUrl, id) => {
    const doc = new DOMParser().parseFromString(await (await fetch(`${BASE}/components/${pageUrl}.html`)).text(), 'text/html');
    return doc.getElementById(id).textContent;
  };
  const parts = [['custom-select', 'custom-select-field'], ['date-picker', 'date-picker-field'], ['time-picker', 'time-picker-field'],
    ['multiselect', 'multiselect-grouped'], ['autocomplete', 'autocomplete-field'], ['dropmenu', 'dm-actions']];
  const filler = '<p class="pg-fill" style="height:400px;flex:none;margin:0">filler</p>';
  let body = filler;
  for (const [p, id] of parts) body += `<div data-case="${p}">${await canon(p, id)}</div>` + filler;
  const m = document.createElement('dialog');
  m.id = 'mm'; m.className = 'nds-modal nds-card nds-stroke nds-lg';
  m.innerHTML = `<div class="nds-card-header"><span class="nds-card-title" id="mm-t">Menus</span>
    <button type="button" class="nds-close nds-modal-close nds-btn nds-subtle nds-icon-only" aria-label="Close"><i class="nds-icon nds-hgi-cancel-01"></i></button></div>
    <form class="nds-form"><div class="nds-card-content">${body}</div>
    <div class="nds-card-actions"><button type="button" class="nds-btn nds-primary" data-modal-close><span class="nds-label">Done</span></button></div></form>`;
  m.setAttribute('aria-labelledby', 'mm-t');
  if (SHORT) m.style.maxHeight = '300px';
  document.body.append(m);
  NDS.init.mount(m);
}, [BASE, SHORT]);
await wait(800);
await page.evaluate(() => NDS.Modal.open('mm'));
await wait(600);

const H = await page.evaluate(() => {
  window.__content = document.querySelector('#mm .nds-card-content');
  window.__newest = () => [...document.querySelectorAll('.nds-dropmenu-menu[data-state~="open"]')].pop() || null;
  // Gap between the menu and its trigger, below or above.
  window.__probe = () => {
    const m = __newest(); if (!m) return null;
    const t = m.closest('.nds-dropmenu')?.ndsDropmenu?.trigger; if (!t) return { noTrigger: true };
    const tr = t.getBoundingClientRect(), mr = m.getBoundingClientRect();
    const up = m.getAttribute('data-position-vertical') === 'top';
    const hit = document.elementFromPoint(Math.min(Math.max(mr.left + 10, 1), innerWidth - 2), Math.min(Math.max(mr.top + 10, 1), innerHeight - 2));
    return { up, gap: +(up ? tr.top - mr.bottom : mr.top - tr.bottom).toFixed(1), inView: mr.top >= -1 && mr.bottom <= innerHeight + 1 && mr.left >= -1 && mr.right <= innerWidth + 1,
      onTop: !!hit && m.contains(hit), modal: document.getElementById('mm').open, count: document.querySelectorAll('.nds-dropmenu-menu[data-state~="open"]').length };
  };
  window.__center = (sel) => { const el = document.querySelector(sel); const c = __content; c.scrollTop += el.getBoundingClientRect().top - c.getBoundingClientRect().top - c.clientHeight / 2 + 20; };
  window.__bottom = (sel) => { const el = document.querySelector(sel); const c = __content; c.scrollTop += el.getBoundingClientRect().bottom - c.getBoundingClientRect().bottom + 4; };
  return { scrolls: __content.scrollHeight > __content.clientHeight };
});
ok('modal content scrolls (the inner scroll box case)', H.scrolls);

const probe = () => page.evaluate(() => __probe());
const opener = {
  'custom-select': () => page.locator('[data-case="custom-select"] .nds-select-input').click(),
  'date-picker': () => page.locator('[data-case="date-picker"] .date-picker-toggle').click(),
  'time-picker': () => page.locator('[data-case="time-picker"] .time-picker-toggle').click(),
  multiselect: () => page.locator('[data-case="multiselect"] .nds-dropmenu-trigger').first().click(),
  autocomplete: async () => { const i = page.locator('[data-case="autocomplete"] input.nds-input'); await i.click(); await i.fill(''); await i.type('vis', { delay: 40 }); },
  dropmenu: () => page.locator('[data-case="dropmenu"] .nds-dropmenu-trigger').click(),
};
const pick = {
  'custom-select': async () => { await page.locator('[data-case="custom-select"] .nds-select-option').nth(1).click(); return page.evaluate(() => document.querySelector('[data-case="custom-select"] .nds-select-value').value); },
  'date-picker': async () => { await page.locator('[data-case="date-picker"] .nds-date-cell:not([disabled])').nth(10).click(); await page.locator('[data-case="date-picker"] .save-btn').click(); return page.evaluate(() => document.querySelector('[data-case="date-picker"] .nds-date-input').value); },
  'time-picker': null, // its own nested case below
  multiselect: async () => { await page.locator('[data-case="multiselect"] label[for="ms-cloud"]').click(); return page.evaluate(() => document.getElementById('ms-cloud').checked && !!__newest()); },
  autocomplete: async () => { await page.locator('[data-case="autocomplete"] .nds-dropmenu-item').first().click(); return page.evaluate(() => document.querySelector('[data-case="autocomplete"] input.nds-input').value); },
  dropmenu: async () => { await page.locator('[data-case="dropmenu"] .nds-dropmenu-item').first().click(); return true; },
};
const closeAll = () => page.evaluate(() => document.querySelectorAll('.nds-dropmenu').forEach((d) => d.ndsDropmenu?.isOpen && d.ndsDropmenu.close()));

for (const c of Object.keys(opener)) {
  await closeAll(); await wait(300);
  await page.evaluate((c) => __center(`[data-case="${c}"]`), c); await wait(150);
  await opener[c](); await wait(c === 'autocomplete' ? 900 : 450);
  let p = await probe();
  ok(`${c}: opens next to its trigger, on top, in view`, p && p.gap >= 0 && p.gap <= 12 && p.onTop && p.inView && p.modal, JSON.stringify(p));
  if (!p) continue;
  await page.evaluate(() => { __content.scrollTop += 40; }); await wait(200);
  const q = await probe();
  ok(`${c}: modal content scrolls 40px, menu follows`, q && Math.abs(q.gap - p.gap) <= 1, JSON.stringify(q));
  await page.keyboard.press('Escape'); await wait();
  p = await probe();
  ok(`${c}: Escape closes the menu, modal stays`, !p && await page.evaluate(() => document.getElementById('mm').open));
  await opener[c](); await wait(c === 'autocomplete' ? 900 : 450);
  const pt = await page.evaluate(() => { const m = __newest(), t = m.closest('.nds-dropmenu').ndsDropmenu.trigger.getBoundingClientRect(), r = document.getElementById('mm').getBoundingClientRect();
    return { x: r.left + 6, y: m.getAttribute('data-position-vertical') === 'top' ? t.bottom + 8 : t.top - 8 }; });
  await page.mouse.click(pt.x, pt.y); await wait();
  ok(`${c}: click elsewhere in the modal closes the menu, modal stays`, !(await probe()) && await page.evaluate(() => document.getElementById('mm').open));
  if (pick[c]) {
    await opener[c](); await wait(c === 'autocomplete' ? 900 : 450);
    const v = await pick[c](); await wait();
    ok(`${c}: pick works, modal stays`, !!v && await page.evaluate(() => document.getElementById('mm').open), String(v));
  }
  // Trigger at the very bottom of the scroll box: flips up or fits, stays in view.
  await closeAll(); await wait(300);
  await page.evaluate((c) => __bottom(`[data-case="${c}"]`), c); await wait(150);
  await opener[c](); await wait(c === 'autocomplete' ? 900 : 450);
  p = await probe();
  ok(`${c}: low in the modal, stays in view`, p && p.inView && p.gap >= 0 && p.gap <= 12, JSON.stringify(p));
  // Scroll the trigger out of the scroll box, whichever way has room: the menu closes.
  const out = await page.evaluate(() => { const d = __newest().closest('.nds-dropmenu').ndsDropmenu, c = __content;
    const before = c.scrollTop, t = d.trigger.getBoundingClientRect(), b = c.getBoundingClientRect();
    c.scrollTop += t.bottom - b.top + 10;
    if (d.trigger.getBoundingClientRect().bottom > b.top) { c.scrollTop = before; c.scrollTop -= b.bottom - t.top + 10; }
    const r = d.trigger.getBoundingClientRect(); return r.bottom <= b.top || r.top >= b.bottom; });
  await wait(450);
  p = await probe();
  ok(`${c}: trigger scrolled out of the modal's scroll box → menu closes`, out && !p, `out=${out} ${JSON.stringify(p)}`);
}

// Nested: the date picker's month menu inside the open calendar.
await closeAll(); await wait(300);
await page.evaluate(() => __center('[data-case="date-picker"]')); await wait(150);
await opener['date-picker'](); await wait();
await page.locator('[data-case="date-picker"] .nds-month-dropmenu .nds-dropmenu-trigger').click(); await wait();
let n = await probe();
ok('date picker: month menu opens over the calendar', n && n.count === 2 && n.onTop, JSON.stringify(n));
await page.locator('[data-case="date-picker"] .nds-month-option').nth(3).click(); await wait();
n = await page.evaluate(() => document.querySelectorAll('.nds-dropmenu-menu[data-state~="open"]').length);
ok('date picker: picking a month keeps the calendar open', n === 1, `${n} open`);
await page.keyboard.press('Escape'); await wait();
ok('date picker: Escape then closes the calendar, modal stays', !(await probe()) && await page.evaluate(() => document.getElementById('mm').open));

// Nested: the time picker's hour select inside its panel.
await page.evaluate(() => __center('[data-case="time-picker"]')); await wait(150);
await opener['time-picker'](); await wait();
const unit = page.locator('[data-case="time-picker"] .nds-select-input').first();
const hasUnit = await unit.count();
if (hasUnit) {
  await unit.click(); await wait();
  n = await probe();
  ok('time picker: hour select opens over its panel', n && n.count >= 2 && n.onTop, JSON.stringify(n));
  await page.locator('[data-case="time-picker"] .nds-select-option').nth(2).click(); await wait();
  n = await page.evaluate(() => document.querySelectorAll('.nds-dropmenu-menu[data-state~="open"]').length);
  ok('time picker: picking an hour keeps the panel open', n === 1, `${n} open`);
} else ok('time picker: panel has unit selects', false, 'none found');
await closeAll(); await wait(300);

// Menu open, then the modal closes: no menu left behind in the top layer.
await opener['custom-select'](); await wait();
await page.evaluate(() => NDS.Modal.close()); await wait(600);
ok('modal closed with a menu open: no menu left open', await page.evaluate(() => !document.querySelector('.nds-dropmenu-menu[data-state~="open"]')));

ok('no page errors', !errors.length, errors.join(' | '));
console.log(`\n${ENGINE}${PHONE ? ' phone' : ''}: ${fails ? fails + ' failed' : 'all passed'}`);
await browser.close();
process.exit(fails ? 1 : 0);
