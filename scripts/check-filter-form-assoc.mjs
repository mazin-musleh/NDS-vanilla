// Form-mode filters submit nothing when their controls sit outside the form.
//
// A filter's surfaces are linked by data-filter-target, not by nesting, so the
// search box, the dropmenu and the submission <form> are routinely siblings.
// Only the form's own descendants are in its FormData — everything else needs
// HTML's `form="<id>"` attribute. The apply button always got it; the inputs
// did not, so chips and the URL updated from internal criteria while the
// request carried no filter parameters at all. Silent: the page navigates, the
// server just sees an unfiltered query.
//
// Asserts, on a real page with the real bundles:
//   OUTSIDE  every filter control the component owns is form-associated, and a
//            checked box plus a typed search string reach FormData(form).
//   INSIDE   controls already inside the form get no redundant attribute, and
//            still submit.
//
// Option markup is not invented — it is generated once by the component itself
// and reused as the hand-authored fixture, so this cannot drift from canon.
//
//   node scripts/check-filter-form-assoc.mjs [baseUrl]
// Defaults to the dev server. Start it with `bundle exec jekyll serve` if down.
import puppeteer from 'puppeteer-core';
import { existsSync } from 'node:fs';

const BASE = (process.argv[2] || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');
const CHROME = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
].find((p) => p && existsSync(p));

const probe = await fetch(`${BASE}/components/filter.html`).catch(() => null);
if (!probe?.ok) {
    console.error(`cannot reach ${BASE} — is the dev server up? (bundle exec jekyll serve)`);
    process.exit(2);
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const page = await browser.newPage();
const pageErrors = [];
page.on('pageerror', (e) => pageErrors.push(String(e)));

await page.goto(`${BASE}/components/filter.html`, { waitUntil: 'networkidle2' });
await page.waitForFunction(() => window.NDS?.Filter?.init, { timeout: 20000 });

const report = await page.evaluate(() => {
    const checks = [];
    const check = (name, pass, detail) => checks.push({ name, pass, detail });

    const mount = (html) => {
        const host = document.createElement('div');
        host.innerHTML = html;
        document.body.appendChild(host);
        return host;
    };

    // 1. Let the component generate its own options, then reuse that markup as
    //    the hand-authored fixture — the regression was authored inputs, and
    //    guessing their shape would test the guess instead of the component.
    const genHost = mount(`
        <div class="nds-filter" data-filter-target="assocGen">
          <div data-filter="category" data-filter-type="checkbox"
               data-filter-values='["news","events"]'></div>
        </div>
        <div id="assocGen" data-filter-items></div>`);
    NDS.Filter.init();
    // Scoped to the host: the page has its own [data-filter] elements, and the
    // generator may replaceWith a <fieldset>, so re-query inside the mount.
    const optionHtml = genHost.querySelector('[data-filter="category"]')?.innerHTML || '';
    if (!optionHtml.includes('<input')) {
        return { fatal: 'generator produced no inputs — fixture source is wrong', checks };
    }

    // 2. OUTSIDE: form holds only the submit button; every filter surface is a
    //    sibling. No data-filter-type on the group, so it takes the authored
    //    (setupManualFilter) path — the one that was broken.
    mount(`
        <form id="assocOutForm" data-filter-target="assocOut" data-filter-submit
              method="get" action="#">
          <button type="submit" class="nds-btn nds-primary">
            <span class="nds-label">Search</span>
          </button>
        </form>
        <div class="nds-form-container nds-search-box" data-filter-target="assocOut">
          <div class="nds-search-content">
            <div class="nds-form-control">
              <input type="text" class="nds-search-input" name="search">
            </div>
          </div>
        </div>
        <div class="nds-filter" data-filter-target="assocOut">
          <div data-filter="category">${optionHtml}</div>
        </div>
        <div id="assocOut" data-filter-items></div>`);

    // 3. INSIDE: the same filter, fully nested — the control case.
    mount(`
        <form id="assocInForm" data-filter-target="assocIn" data-filter-submit
              method="get" action="#">
          <div class="nds-form-container nds-search-box" data-filter-target="assocIn">
            <div class="nds-search-content">
              <div class="nds-form-control">
                <input type="text" class="nds-search-input" name="search">
              </div>
            </div>
          </div>
          <div class="nds-filter" data-filter-target="assocIn">
            <div data-filter="category">${optionHtml}</div>
          </div>
          <button type="submit" class="nds-btn nds-primary">
            <span class="nds-label">Search</span>
          </button>
        </form>
        <div id="assocIn" data-filter-items></div>`);

    NDS.Filter.init();

    const probeFixture = (id) => {
        const form = document.getElementById(`${id}Form`);
        const group = document.querySelector(`.nds-filter[data-filter-target="${id}"] [data-filter="category"]`);
        const boxes = [...group.querySelectorAll('input[type="checkbox"]')];
        const search = document.querySelector(`[data-filter-target="${id}"] input.nds-search-input`);
        return { form, boxes, search };
    };

    // --- OUTSIDE ---
    const out = probeFixture('assocOut');
    check('outside: instance is in form mode',
        NDS.Filter.getByTarget('assocOut')?.isFormMode === true);
    check('outside: every checkbox is owned by the form',
        out.boxes.length > 0 && out.boxes.every((b) => b.form === out.form),
        `${out.boxes.filter((b) => b.form === out.form).length}/${out.boxes.length} associated`);
    check('outside: search input is owned by the form',
        out.search.form === out.form,
        out.search.getAttribute('form'));

    out.boxes[0].checked = true;
    out.boxes[0].dispatchEvent(new Event('change', { bubbles: true }));
    out.search.value = 'roads';
    const outData = new FormData(out.form);
    check('outside: checked value reaches FormData',
        outData.get('filter-category') === out.boxes[0].value,
        `filter-category=${outData.get('filter-category')} want ${out.boxes[0].value}`);
    check('outside: search string reaches FormData',
        outData.get('search') === 'roads',
        `search=${outData.get('search')}`);

    // --- INSIDE ---
    const inside = probeFixture('assocIn');
    check('inside: no redundant form attribute stamped',
        inside.boxes.every((b) => !b.hasAttribute('form')) && !inside.search.hasAttribute('form'),
        inside.boxes.map((b) => b.getAttribute('form')).join(','));
    inside.boxes[0].checked = true;
    inside.boxes[0].dispatchEvent(new Event('change', { bubbles: true }));
    const inData = new FormData(inside.form);
    check('inside: checked value still reaches FormData',
        inData.get('filter-category') === inside.boxes[0].value,
        `filter-category=${inData.get('filter-category')}`);

    return { checks };
});

await browser.close();

if (report.fatal) {
    console.error(`FATAL  ${report.fatal}`);
    process.exit(2);
}

let failed = 0;
for (const c of report.checks) {
    if (!c.pass) failed++;
    console.log(`${c.pass ? 'ok  ' : 'FAIL'}  ${c.name}${c.detail ? `  (${c.detail})` : ''}`);
}
for (const e of pageErrors) console.log(`page error: ${e}`);

console.log(failed ? `\n${failed} failing` : '\nall clear');
process.exit(failed || pageErrors.length ? 1 : 0);
