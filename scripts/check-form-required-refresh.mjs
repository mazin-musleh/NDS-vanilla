// NDS.Form.refresh() keeps a field required. The input takes `required` when the field is set up, so a
// refresh before that, or on an input setup never stamps, once read "not required" and took the mark off:
// an empty required field then submitted (field report, 2026-11-05).
//
//   node scripts/check-form-required-refresh.mjs [baseUrl]
import { launch, log, step, STEP_MS } from './lib/browser.mjs';

const BASE = (process.argv[2] || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');
const PAGE = '/templates/service-template.html';
const field = (id, extra = '') => `<form class="nds-form" id="${id}-form"><div class="nds-form-container" data-required id="${id}">
<div class="nds-form-header"><label for="${id}-input"><span class="nds-label">Name</span></label></div>
<div class="nds-form-control"><input type="text" id="${id}-input" name="${id}" class="nds-input">${extra}</div>
</div></form>`;
const nested = '<div class="nds-form-action"><input type="text" class="nds-input" aria-label="Search"></div>';
const FIXTURE = `<section id="fixture" class="nds-content-section"><div class="nds-section-body">
${field('at-load')}${field('plain')}${field('nested', nested)}<div id="later"></div></div></section>`;
// After the page's own defer tag: module scripts run in document order with it.
const AT_LOAD = `<script type="module">NDS.Form.refresh(document.getElementById('at-load-input'));</script>`;

let failed = 0;
const ok = (name, pass, detail) => { if (!pass) failed++; console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}  — ${detail}`); };

const browser = await step('launch Chrome', () => launch({ timeout: STEP_MS * 6 }), STEP_MS * 6);
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.route(`**${PAGE}`, async (route) => {
    const res = await route.fetch();
    const html = (await res.text()).replace(/(id="main-content">)[\s\S]*<\/section>(\s*<\/main>)/, `$1${FIXTURE}$2`).replace('</body>', `${AT_LOAD}</body>`);
    if (!html.includes('id="fixture"')) throw new Error(`${PAGE}: no #main-content … </section></main> to swap`);
    await route.fulfill({ response: res, body: html });
});
await step(`load ${PAGE}`, () => page.goto(BASE + PAGE, { waitUntil: 'load' }), STEP_MS * 6);
await step('NDS.init.ready', () => page.evaluate(() => NDS.init.ready), STEP_MS * 6);

// The mark, the input's attribute, and whether an empty submit gets through.
const read = (id) => page.evaluate(async (fieldId) => {
    const container = document.getElementById(fieldId);
    const form = container.closest('form');
    let posted = false;
    const onSubmit = (e) => { posted = !e.defaultPrevented; e.preventDefault(); };
    form.addEventListener('submit', onSubmit);
    form.requestSubmit();
    await new Promise((done) => setTimeout(done, 100));
    form.removeEventListener('submit', onSubmit);
    return { mark: container.hasAttribute('data-required'), input: document.getElementById(`${fieldId}-input`).required, posted };
}, id);
const report = (name, r) => ok(name, r.mark && r.input && !r.posted, JSON.stringify(r));

report('refresh in a module script at load', await read('at-load'));

// A view that writes a field and refreshes it in one task, before the DOM sweep sets it up.
await page.evaluate((html) => {
    const later = document.getElementById('later');
    later.innerHTML = html;
    NDS.Form.refresh(document.getElementById('added-input'));
}, field('added'));
await page.waitForTimeout(100);
report('refresh of a field just added, before its setup', await read('added'));

await page.evaluate(() => NDS.Form.refresh(document.getElementById('nested')));
report('refresh of a set-up field holding a nested input', await read('nested'));

await page.evaluate(() => document.getElementById('nested-form').reset());
await page.waitForTimeout(100);
report('form reset over a nested input', await read('nested'));

// The input still leads once set up: this is the documented way to change the mark.
const led = await page.evaluate(() => {
    const input = document.getElementById('plain-input');
    const container = document.getElementById('plain');
    input.required = false;
    NDS.Form.refresh(input);
    const off = container.hasAttribute('data-required');
    input.required = true;
    NDS.Form.refresh(input);
    return { off, on: container.hasAttribute('data-required') };
});
ok('after setup, the input\'s required still leads', !led.off && led.on, JSON.stringify(led));

await browser.close();
log(failed ? `${failed} failed` : 'all passed');
process.exit(failed ? 1 : 0);
