// Data-driven Pagination in a server flow: focus survives setTotalPages, 0/1 page hides
// the nav, the placeholder always releases, data-active-page and ?page= stay current.
//   node scripts/check-pagination-data.mjs [base]
//   OLD_JS=<dir> serves the bundles in <dir> instead, to prove a case fails on an older build
//   ENGINE=webkit runs it as Safari
import { launch } from './lib/browser.mjs';

const BASE = (process.argv[2] || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');
const OLD_JS = process.env.OLD_JS;

const browser = await launch();
const page = await browser.newPage();
const errors = [];
page.on('pageerror', (e) => { if (!/ResizeObserver loop/.test(e.message)) errors.push(e.message); });
await page.route('**/nds-cookie-consent.min.js*', (r) => r.fulfill({ body: '', contentType: 'text/javascript' }));
if (OLD_JS) await page.route('**/assets/js/*.min.js*', (r) => {
  const file = `${OLD_JS}/${new URL(r.request().url()).pathname.split('/').pop()}`;
  r.fulfill({ path: file, contentType: 'text/javascript' });
});

await page.goto(`${BASE}/components/pagination?keep=1&page=4`);
await page.waitForFunction(() => window.NDS?.Pagination?.setTotalPages && document.querySelector('[data-nds-pagination-initialized]'));

// Fixtures mount after load, the way a framework view would.
await page.evaluate(() => {
  document.querySelector('main').insertAdjacentHTML('beforeend', `
    <nav id="t-focus" class="nds-pagination" data-total-pages="12" aria-label="t"></nav>
    <nav id="t-url" class="nds-pagination" data-total-pages="12" data-page-param aria-label="t"></nav>
    <nav id="t-zero" class="nds-pagination" data-total-pages="0" aria-label="t"></nav>
    <nav id="t-one" class="nds-pagination" data-total-pages="1" aria-label="t"></nav>
    <nav id="t-late" class="nds-pagination" aria-label="t"></nav>
    <nav id="t-drop" class="nds-pagination" data-total-pages="12" aria-label="t"></nav>`);
  const nav = document.getElementById('t-focus');
  // The doc's sample pattern: the reply carries the count, so every change resets it.
  nav.addEventListener('nds:pagination:change', () => NDS.Pagination.setTotalPages(nav, 12));
  NDS.Pagination.reinit();
});

const shown = (id) => page.evaluate((id) => {
  const nav = document.getElementById(id);
  const list = nav.querySelector('.nds-pagination-list');
  return getComputedStyle(nav).display !== 'none' && !!list && getComputedStyle(list).display !== 'none';
}, id);

const results = [];
const check = (name, ok, got) => results.push({ name, ok, got });

// 1. Keyboard focus stays on the page button the user pressed.
await page.focus('#t-focus .page_2 .nds-btn');
await page.keyboard.press('Enter');
const focus = await page.evaluate(() => {
  const a = document.activeElement;
  return a.closest('#t-focus') ? a.textContent.trim() : a.tagName;
});
check('focus survives setTotalPages with the same count', focus === '2', focus);

// 2. 0 or 1 page hides the nav.
check('data-total-pages="0" at load: hidden, no placeholder',
  await page.evaluate(() => getComputedStyle(document.getElementById('t-zero')).display === 'none'), 'display');
check('data-total-pages="1" at load: hidden', !(await shown('t-one')), 'shown');
await page.evaluate(() => NDS.Pagination.setTotalPages(document.getElementById('t-drop'), 0));
check('setTotalPages(nav, 0): hidden', !(await shown('t-drop')), 'shown');
await page.evaluate(() => NDS.Pagination.setTotalPages(document.getElementById('t-drop'), 1));
check('setTotalPages(nav, 1): hidden', !(await shown('t-drop')), 'shown');
await page.evaluate(() => NDS.Pagination.setTotalPages(document.getElementById('t-drop'), 7));
check('setTotalPages(nav, 7) after 0: shown again', await shown('t-drop'), 'hidden');

// 3. Count known only after the first request: the placeholder releases.
await page.evaluate(() => NDS.Pagination.setTotalPages(document.getElementById('t-late'), 8));
check('empty nav + setTotalPages(nav, 8): buttons shown', await shown('t-late'), 'hidden');

// 4. data-active-page and ?page= stay current.
const url = await page.evaluate(() => document.getElementById('t-url').dataset.activePage);
check('?page=4 restore writes data-active-page', url === '4', url);
await page.click('#t-url .page_2 .nds-btn');
const clicked = await page.evaluate(() => document.getElementById('t-url').dataset.activePage);
check('click writes data-active-page', clicked === '2', clicked);
const reset = await page.evaluate(() => {
  const nav = document.getElementById('t-url');
  NDS.Pagination.setTotalPages(nav, 5, 3);
  return `${nav.dataset.activePage} ${new URLSearchParams(location.search).get('page')}`;
});
check('setTotalPages(nav, 5, 3) writes data-active-page and ?page=', reset === '3 3', reset);

// 5. ?per-page= on a per-page picker (data-per-page-param): read before the split, so nothing jumps.
const fixture = (p) => `<div id="${p}-wrap">
  <div class="nds-dropmenu" data-select-name="perPage" data-select-value="3" data-per-page-target="${p}-grid" data-per-page-param>
    <button type="button" class="nds-btn nds-secondary-outline nds-md nds-menu-btn nds-dropmenu-trigger" aria-label="Per page"><span class="nds-label">3</span></button>
    <div class="nds-dropmenu-menu nds-center" hidden><div class="nds-dropmenu-scroll">
      ${[3, 6, 9].map((v) => `<button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="${v}"><span class="nds-label">${v}</span></button>`).join('')}
    </div></div>
  </div>
  <ul id="${p}-grid" class="nds-paged-content" style="--per-page: 3;">
    ${Array.from({ length: 12 }, (_, i) => `<li class="nds-page-item">Item ${i + 1}</li>`).join('')}
  </ul>
  <nav class="nds-pagination" data-auto-pagination="${p}-grid" data-page-param="${p === 'pp' ? '' : 'pm-page'}" aria-label="t"></nav>
</div>`;
const pp = await browser.newPage();
pp.on('pageerror', (e) => { if (!/ResizeObserver loop/.test(e.message)) errors.push(e.message); });
await pp.route('**/nds-cookie-consent.min.js*', (r) => r.fulfill({ body: '', contentType: 'text/javascript' }));
if (OLD_JS) await pp.route('**/assets/js/*.min.js*', (r) => {
  r.fulfill({ path: `${OLD_JS}/${new URL(r.request().url()).pathname.split('/').pop()}`, contentType: 'text/javascript' });
});
// The fixture must be in the HTML at load: the early split runs before any script can add it.
await pp.route('**/components/pagination?*', async (r) => {
  const res = await r.fetch();
  // The doc sample's first read, from an app script after the NDS bundle: Pagination starts later.
  const nav = '<nav id="dd-nav" class="nds-pagination" data-total-pages="12" data-page-param="dd-page" aria-label="t"></nav>';
  const app = `<script type="module">
      const nav = document.getElementById('dd-nav');
      window.__early = nav.dataset.activePage || '1';
      NDS.Init.ready.then(() => { window.__ready = nav.dataset.activePage || '1'; });
    </script>`;
  r.fulfill({
    response: res,
    body: (await res.text()).replace('</main>', `${fixture('pp')}${nav}</main>`).replace('</body>', `${app}</body>`),
  });
});
// What the early split showed, before Pagination starts.
await pp.addInitScript(() => {
  new MutationObserver((_, mo) => {
    const grid = document.getElementById('pp-grid');
    if (!grid?.hasAttribute('data-paged-split')) return;
    window.__split = [...grid.children].filter((li) => !li.hidden).length;
    mo.disconnect();
  }).observe(document, { subtree: true, attributes: true, attributeFilter: ['data-paged-split'] });
});
const ppReady = () => pp.waitForFunction(() => document.querySelector('.nds-pagination[data-auto-pagination="pp-grid"][data-nds-auto-pagination-initialized]'));
const ppState = (p) => pp.evaluate((p) => {
  const shown = [...document.querySelectorAll(`#${p}-grid li`)].filter((li) => !li.hidden);
  const q = new URLSearchParams(location.search);
  return {
    count: shown.length, first: shown[0]?.textContent, split: window.__split,
    label: document.querySelector(`#${p}-wrap .nds-dropmenu-trigger .nds-label`).textContent.trim(),
    url: `${q.get('per-page')} ${q.get('page')}`,
  };
}, p);

await pp.goto(`${BASE}/components/pagination?per-page=6&page=2&dd-page=3`);
await ppReady();
const read = await pp.waitForFunction(() => window.__ready && `${window.__early} ${window.__ready}`).then((h) => h.jsonValue());
check(`sample: a load-time script reads ?page=3 after NDS.Init.ready (read before it: ${read.split(' ')[0]})`, read.endsWith(' 3'), `early, ready: ${read}`);
let s = await ppState('pp');
check('?per-page=6: the early split shows 6', s.split === 6, s.split);
check('?per-page=6&page=2: items 7–12 shown', s.count === 6 && s.first === 'Item 7', `${s.count} from ${s.first}`);
check('?per-page=6: the picker shows 6', s.label === '6', s.label);
const pick = async (v) => {
  await pp.click('#pp-wrap .nds-dropmenu-trigger');
  await pp.click(`#pp-wrap .nds-dropmenu-item[data-value="${v}"]`);
  // A click on the trigger while the menu still closes would not open it.
  await pp.locator(`#pp-wrap .nds-dropmenu-item[data-value="${v}"]`).waitFor({ state: 'hidden' });
  return ppState('pp');
};
s = await pick(9);
check('pick 9: ?per-page=9, page back to 1', s.url === '9 null' && s.count === 9, `${s.url}, ${s.count} shown`);
s = await pick(3);
check('pick the size the HTML wrote: param removed', s.url === 'null null', s.url);

await pp.goto(`${BASE}/components/pagination?per-page=99999`);
await ppReady();
s = await ppState('pp');
check('?per-page=99999 (not in the menu): ignored', s.count === 3 && s.label === '3', `${s.count} shown, label ${s.label}`);

await pp.goto(`${BASE}/components/pagination?per-page=9`);
await ppReady();
await pp.evaluate((html) => {
  document.querySelector('main').insertAdjacentHTML('beforeend', html);
  return NDS.Init.mount(document.getElementById('pm-wrap'));
}, fixture('pm'));
await pp.waitForFunction(() => document.querySelector('.nds-pagination[data-auto-pagination="pm-grid"][data-nds-auto-pagination-initialized]'));
s = await ppState('pm');
check('mounted view: ?per-page=9 applies', s.count === 9 && s.label === '9', `${s.count} shown, label ${s.label}`);

await browser.close();
for (const r of results) console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.ok ? '' : `  (got ${r.got})`}`);
if (errors.length) console.log('page errors:', errors);
const failed = results.filter((r) => !r.ok).length;
console.log(failed ? `${failed} failed` : 'all passed');
process.exit(failed || errors.length ? 1 : 0);
