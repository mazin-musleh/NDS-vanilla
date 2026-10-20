// Form reset: every NDS field goes back to the value the page shipped with (64b9bb72).
// Each field is its doc page's canon block, read from the built page, so the check follows the docs.
// Pass 1 changes every field the way a user does, then clicks a reset button: each field must
// match its first snapshot (values, chips, labels, statuses, slider fill, picked items).
// Pass 2 changes them again and cancels the reset: each field must keep the change.
//   node scripts/check-form-reset.mjs [baseUrl]    ENGINE=webkit for Safari
//   OLD_JS=<dir> serves the bundles in <dir> instead, to prove a case fails on an older build
import { launch, ENGINE } from './lib/browser.mjs';
import { existsSync, readFileSync } from 'fs';
const BASE = (process.argv[2] || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');
const OLD_JS = process.env.OLD_JS;

const canonCache = {};
async function canon(doc, id) {
  const html = canonCache[doc] ??= await (await fetch(`${BASE}/components/${doc}.html`)).text();
  const m = html.match(new RegExp(`<script type="text/html" id="${id}"[^>]*>([\\s\\S]*?)</script>`));
  if (!m) throw new Error(`no canon #${id} on components/${doc}.html`);
  return m[1];
}

const type = (sel, text) => async (root) => { await root.locator(sel).first().fill(''); await root.locator(sel).first().pressSequentially(text); await root.locator(sel).first().press('Tab'); };
const keys = (sel, key, n) => async (root) => { const el = root.locator(sel).first(); await el.focus(); for (let i = 0; i < n; i++) await el.press(key); };
const pick = (trigger, option) => async (root, page) => { await root.locator(trigger).first().click(); await page.locator(option).first().click(); };

// change(root, page) must leave the field different from how it shipped.
const CASES = [
  { name: 'text', doc: 'forms', id: 'field-text', change: type('input', 'changed') },
  { name: 'required, failed check', doc: 'forms', id: 'field-email', required: true, change: async (root, page) => { await root.locator('input').fill(''); await page.evaluate(() => document.getElementById('reset-form').requestSubmit()); } },
  { name: 'phone', doc: 'forms', id: 'field-phone', change: type('input', '0551234567') },
  { name: 'national ID, invalid', doc: 'forms', id: 'field-national-id', change: type('input', '1234567890') },
  { name: 'IBAN, invalid', doc: 'forms', id: 'field-iban', change: type('input', 'SA0380000000608010167518') },
  { name: 'textarea', doc: 'forms', id: 'field-textarea', change: type('textarea', 'changed') },
  { name: 'select', doc: 'forms', id: 'field-select', change: async (root) => { const s = root.locator('select'); await s.selectOption({ index: (await s.locator('option').count()) - 1 }); } },
  { name: 'Slider', doc: 'slider', id: 'slider-single', change: keys('input[type="range"]', 'ArrowRight', 3) },
  { name: 'Slider range', doc: 'slider', id: 'slider-range', change: keys('.nds-slider-min', 'ArrowRight', 3) },
  { name: 'Custom Select', doc: 'custom-select', id: 'custom-select-field', change: pick('.nds-select-input', '[data-case="Custom Select"] .nds-select-option[data-value="makkah"]') },
  { name: 'Multiselect', doc: 'multiselect', id: 'multiselect-grouped', change: async (root, page) => {
      await root.locator('.nds-dropmenu-trigger').click();
      const menu = page.locator('[data-case="Multiselect"] .nds-dropmenu-menu');
      await menu.locator('label[for^="ms-ai-c"]').click();
      await menu.locator('label[for^="ms-cloud-c"]').click();
      await page.keyboard.press('Escape');
    } },
  { name: 'Tag Input', doc: 'taginput', id: 'taginput-field', change: async (root) => { const i = root.locator('input:not([type="hidden"])').first(); await i.click(); await i.pressSequentially('Tag one'); await i.press('Enter'); } },
  { name: 'Date Picker', doc: 'date-picker', id: 'date-picker-field', change: type('.nds-date-input', '15/10/2026') },
  { name: 'Date Picker, invalid', doc: 'date-picker', id: 'date-picker-field', change: type('.nds-date-input', '31/02/2026') },
  { name: 'Time Picker', doc: 'time-picker', id: 'time-picker-field', change: type('.nds-time-input', '1030') },
  { name: 'OTP', doc: 'otp', id: 'otp-4', change: async (root) => { await root.locator('input:not([type="hidden"])').first().click(); await root.locator('input:not([type="hidden"])').first().pressSequentially('1234'); } },
  { name: 'Password', doc: 'password', id: 'password-new', change: type('input[type="password"]', 'Abcdef12!') },
  { name: 'Autocomplete (strict)', doc: 'autocomplete', id: 'autocomplete-field', strict: true, change: async (root, page) => {
      const i = root.locator('input[name="service"]'); await i.click(); await i.pressSequentially('visa');
      await page.locator('[data-case="Autocomplete (strict)"] .nds-dropmenu-item').first().click();
    } },
  { name: 'Rating', doc: 'rating', id: 'rating-interactive', value: true, change: async (root) => { await root.locator('.nds-rating-star').last().click(); } },
  { name: 'Rating in a group', doc: 'rating', id: 'rating-interactive', group: true, change: async (root) => { await root.locator('.nds-rating-star').last().click(); } },
  { name: 'Dropmenu picker', doc: 'dropmenu', id: 'dm-picker', change: pick('.nds-dropmenu-trigger', '[data-case="Dropmenu picker"] .nds-dropmenu-item[data-value="KW"]') },
];

const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on('pageerror', (e) => { if (!/ResizeObserver loop/.test(e.message)) errors.push(e.message); });
await page.route('**/nds-cookie-consent.min.js*', (r) => r.fulfill({ body: '', contentType: 'text/javascript' }));
if (OLD_JS) await page.route('**/assets/js/*.min.js*', (r) => {
  const file = `${OLD_JS}/${new URL(r.request().url()).pathname.split('/').pop()}`;
  return existsSync(file) ? r.fulfill({ body: readFileSync(file), contentType: 'text/javascript' }) : r.continue();
});
// A page under components/ so a canon's relative data-url resolves.
await page.goto(`${BASE}/components/form.html`, { waitUntil: 'load' });
await page.waitForFunction(() => window.NDS?.Init?.mount);

const blocks = [];
for (const c of CASES) blocks.push({ name: c.name, html: await canon(c.doc, c.id), required: !!c.required, strict: !!c.strict, value: !!c.value, group: !!c.group });
await page.evaluate(async (blocks) => {
  const form = document.createElement('form');
  form.id = 'reset-form';
  form.className = 'nds-form';
  form.addEventListener('submit', (e) => e.preventDefault());
  blocks.forEach((b, n) => {
    const box = document.createElement('div');
    box.dataset.case = b.name;
    // The host page shows the same canons, and one canon may run twice: suffix every id and its references.
    box.innerHTML = b.html.replace(/\b(id|for|aria-labelledby|aria-describedby|aria-controls)="([^"]+)"/g, `$1="$2-c${n}"`);
    const root = box.firstElementChild;
    if (b.required) root.setAttribute('data-required', '');
    if (b.strict) root.setAttribute('data-strict', '');
    if (b.value) root.insertAdjacentHTML('beforeend', '<input type="hidden" name="score" value="0" data-rating-value>');
    // The Required layout, as User Feedback writes it: the input beside the rating in its group.
    if (b.group) box.innerHTML = `<fieldset class="nds-form-group"><legend>Score</legend>${box.innerHTML}<input type="hidden" name="score2" value="0" data-rating-value></fieldset>`;
    form.append(box);
  });
  form.insertAdjacentHTML('beforeend', '<button type="reset" id="reset-btn" class="nds-btn nds-secondary"><span class="nds-label">Reset</span></button>');
  document.querySelector('main').prepend(form);
  await NDS.Init.mount(form);
  window.__snap = (name) => {
    const root = document.querySelector(`[data-case="${CSS.escape(name)}"]`);
    const MENU = '.nds-dropmenu-menu, .nds-select-dropdown, .nds-date-picker-menu';
    const out = root.cloneNode(true);
    out.querySelectorAll(MENU).forEach((m) => m.remove());
    const outside = [...out.querySelectorAll('*')];
    const live = [...root.querySelectorAll('*')].filter((el) => !el.closest(MENU));
    return JSON.stringify({
      // Each value with its validation message: a stale invalid mark blocks the next submit unseen.
      // A nameless hidden input is a component's helper (Autocomplete's strict pick), made on first use: it counts once it holds a value.
      values: [...root.querySelectorAll('input, select, textarea')].filter((i) => i.type !== 'hidden' || i.name || i.value)
        .map((i) => [i.type === 'checkbox' || i.type === 'radio' ? i.checked : i.value, i.validationMessage]),
      text: out.textContent.replace(/\s+/g, ' ').trim(),
      status: outside.filter((el) => el.hasAttribute('data-status')).map((el) => el.getAttribute('data-status')),
      // Tokens of the moment, not of the value.
      state: live.filter((el) => el.hasAttribute('data-state')).map((el) => el.getAttribute('data-state').replace(/\b(focus|focused|typing|target|open|closing|preview|hovered|pressed|loading)\b/g, '').replace(/\s+/g, ' ').trim()),
      style: outside.filter((el) => el.getAttribute('style')).map((el) => el.getAttribute('style')),
      picked: [...root.querySelectorAll('[aria-pressed="true"], [aria-selected="true"], [aria-checked="true"]')].map((el) => el.textContent.trim()),
    });
  };
}, blocks);
await page.waitForTimeout(800);

let fails = 0;
const ok = (name, pass, detail = '') => { if (!pass) fails++; console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${pass || !detail ? '' : '\n      ' + detail}`); };
const snap = (name) => page.evaluate((n) => window.__snap(n), name);
const diff = (a, b) => { const x = JSON.parse(a), y = JSON.parse(b); return Object.keys(x).filter((k) => JSON.stringify(x[k]) !== JSON.stringify(y[k])).map((k) => `${k}: ${JSON.stringify(x[k])} → ${JSON.stringify(y[k])}`).join('\n      '); };
const changeAll = async () => {
  const changed = {};
  for (const c of CASES) {
    try { await c.change(page.locator(`[data-case="${c.name}"]`), page); } catch (e) { changed[c.name] = null; console.log(`      (${c.name}: change failed: ${e.message.split('\n').filter((l) => /intercepts|not visible|not stable|outside/.test(l)).pop() || e.message.split('\n')[0]})`); continue; }
    await page.keyboard.press('Escape');
    await page.evaluate(() => document.activeElement?.blur());
    await page.waitForTimeout(150);
  }
  await page.waitForTimeout(SETTLE);
  for (const c of CASES) if (changed[c.name] !== null) changed[c.name] = await snap(c.name);
  return changed;
};
// Past Password's 500 ms announce debounce.
const SETTLE = 800;

const start = {};
for (const c of CASES) start[c.name] = await snap(c.name);

console.log('— pass 1: a reset button puts each field back');
let changed = await changeAll();
await page.click('#reset-btn');
await page.waitForTimeout(SETTLE);
for (const c of CASES) {
  if (!changed[c.name] || changed[c.name] === start[c.name]) { ok(`${c.name}: the change took`, false, 'the test could not change the field'); continue; }
  const now = await snap(c.name);
  ok(`${c.name}: back to its first value`, now === start[c.name], diff(start[c.name], now));
}

console.log('— pass 2: a cancelled reset keeps each change');
changed = await changeAll();
await page.evaluate(() => {
  const f = document.getElementById('reset-form');
  f.addEventListener('reset', (e) => e.preventDefault(), { once: true });
  f.reset();
});
await page.waitForTimeout(SETTLE);
for (const c of CASES) {
  if (!changed[c.name]) continue;
  const now = await snap(c.name);
  ok(`${c.name}: keeps the change`, now === changed[c.name], diff(changed[c.name], now));
}

ok('no page errors', !errors.length, errors.join(' | '));
console.log(`${ENGINE}: ${fails ? fails + ' failed' : 'all pass'}`);
await browser.close();
process.exit(fails ? 1 : 0);
