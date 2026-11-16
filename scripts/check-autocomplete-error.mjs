// Autocomplete: a failed data-url request shows "Could not load suggestions" in the menu and fires a cancelable
// nds:autocomplete:error; a cancelled one stays closed; the next focus tries again (field report, 2026-11-16).
//
//   node scripts/check-autocomplete-error.mjs [baseUrl]
import { launch, log, step, STEP_MS } from './lib/browser.mjs';

const BASE = (process.argv[2] || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');
const PAGE = '/templates/service-template.html';
const SLOW = STEP_MS * 6;

const field = (id, attrs) => `<div class="nds-form-container" id="${id}" data-url="/api/${id}" data-display-field="Title" data-min-chars="1" ${attrs}>
<div class="nds-form-header"><label for="${id}-input"><span class="nds-label">Service</span></label></div>
<div class="nds-form-control"><input type="text" id="${id}-input" class="nds-input" autocomplete="on">
<div class="nds-form-action"><button class="nds-btn nds-subtle nds-clear nds-icon-only" type="button" aria-label="Clear" hidden><i class="nds-icon nds-hgi-cancel-01"></i></button></div></div></div>`;
const FIXTURE = `<section id="fixture" class="nds-content-section"><div class="nds-section-body"><form class="nds-form">
${field('each', 'data-fetch="each"')}${field('once', 'data-fetch="once" data-strict')}${field('own', 'data-fetch="each"')}
</form></div></section>`;
const SETUP = `<script>
window.errors = [];
document.addEventListener('nds:autocomplete:error', (e) => { window.errors.push({ id: e.target.id, ...e.detail }); });
document.getElementById('own').addEventListener('nds:autocomplete:error', (e) => e.preventDefault());
</script>`;

let failed = 0;
const ok = (name, pass, detail) => { if (!pass) failed++; console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}  — ${JSON.stringify(detail)}`); };

const browser = await step('launch Chrome', () => launch({ timeout: SLOW }), SLOW);
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.route(`**${PAGE}`, async (route) => {
    const res = await route.fetch();
    const html = (await res.text()).replace(/(id="main-content">)[\s\S]*<\/section>(\s*<\/main>)/, `$1${FIXTURE}$2`).replace('</body>', `${SETUP}</body>`);
    if (!html.includes('id="fixture"')) throw new Error(`${PAGE}: no #main-content … </section></main> to swap`);
    await route.fulfill({ response: res, body: html });
});
let serverUp = false;
await page.route('**/api/**', (route) => (serverUp
    ? route.fulfill({ contentType: 'application/json', body: JSON.stringify([{ Title: 'Alpha' }, { Title: 'Beta' }]) })
    : route.fulfill({ status: 500, body: 'down' })));
await step(`load ${PAGE}`, () => page.goto(BASE + PAGE, { waitUntil: 'load' }), SLOW);
await step('NDS ready', () => page.waitForFunction(() => document.documentElement.hasAttribute('data-nds-loaded')), SLOW);

// The menu's state: open or not, and the text and icon of its empty slot.
const menu = (id) => page.evaluate((fieldId) => {
    const scroll = document.querySelector(`#${fieldId} .nds-dropmenu-scroll`);
    return scroll && { open: !scroll.parentElement.hidden && scroll.getClientRects().length > 0, text: scroll.textContent.trim(),
        icon: scroll.getAttribute('data-empty-icon') };
}, id);
const type = async (id, text) => {
    await page.keyboard.press('Escape');
    await page.focus(`#${id}-input`);
    await page.fill(`#${id}-input`, '');
    await page.keyboard.type(text);
};
const settle = (id) => step(`${id}: request settles`, () => page.waitForFunction((fieldId) =>
    !document.getElementById(fieldId).matches('[data-state~="loading"]') && document.querySelector(`#${fieldId} .nds-dropmenu-scroll`), id, { timeout: STEP_MS }));

for (const id of ['each', 'once']) {
    await type(id, 'al');
    await page.waitForTimeout(400);
    await settle(id);
    const m = await menu(id);
    ok(`${id}: a failed request opens the menu on the failure text`, m.open && /Could not load suggestions/.test(m.text) && /alert-circle/.test(m.icon), m);
    const e = await page.evaluate((fieldId) => window.errors.filter((x) => x.id === fieldId), id);
    ok(`${id}: nds:autocomplete:error fires once with the query`, e.length === 1 && e[0].query === 'al' && typeof e[0].error === 'string', e);
}

await type('own', 'al');
await page.waitForTimeout(400);
await settle('own');
let m = await menu('own');
ok('own: a cancelled error leaves the menu closed', !m.open, m);

serverUp = true;
await page.evaluate(() => document.activeElement.blur());
await page.focus('#each-input');
await page.waitForTimeout(400);
await settle('each');
m = await menu('each');
ok('each: the next focus tries again and shows results', m.open && /Alpha/.test(m.text) && !/Could not load/.test(m.text), m);

await type('once', 'zz');
await page.waitForTimeout(400);
await settle('once');
m = await menu('once');
ok('once (strict): no match after a failure says "No results" again', m.open && /No results/.test(m.text) && /search-01/.test(m.icon), m);

await browser.close();
log(failed ? `${failed} failed` : 'all passed');
process.exit(failed ? 1 : 0);
