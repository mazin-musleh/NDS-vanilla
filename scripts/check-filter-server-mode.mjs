// What does a server-driven (AJAX form-mode) filter actually send, and which
// public API calls cause it to re-fetch?
//
// _buildAjaxRequest builds its query from `new FormData(this.submissionForm)` —
// so the request carries exactly the form-associated NAMED inputs, and nothing
// from `this.criteria`. Any control the component renders without a `name` is
// therefore invisible to the server while still showing a chip, a badge and a
// URL param. This harness reports the gap as data rather than reasoning about
// it: it stubs NDS.request, drives each surface, and prints the query string
// the component would have sent next to the browser URL it wrote.
//
// Covers: authored checkbox, generated checkbox, slider, search, and the
// re-fetch behaviour of setFilterValues / setSearchValue / removeFilterValue /
// clear / reset.
//
//   node scripts/check-filter-server-mode.mjs [baseUrl]
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

const report = await page.evaluate(async () => {
    const findings = [];
    const sent = [];

    // Stub the transport: record the request the component built, answer with a
    // response carrying the target subtree so the success path runs to the end.
    const realRequest = NDS.request;
    NDS.request = (url, options) => {
        sent.push({ url, method: options?.method || 'GET' });
        // The id MUST match data-filter-target: _applyAjaxResponse throws when the
        // response carries no #<targetId>, and the throw routes to _rollbackApplied,
        // which silently restores the pre-submit criteria — every later reading
        // would then describe a rolled-back filter, not a working one.
        return Promise.resolve({
            isJson: false,
            data: `<html><body><div id="srv" data-filter-items>served</div></body></html>`,
        });
    };
    const errors = [];
    document.addEventListener('nds:filterFormError', (e) => errors.push(e.detail.error));

    const host = document.createElement('div');
    host.innerHTML = `
        <form id="srvForm" data-filter-target="srv" data-filter-submit data-ajax
              method="get" action="/api/search">
          <button type="submit" class="nds-btn nds-primary" data-filter-action="apply">
            <span class="nds-label">Apply</span>
          </button>
        </form>
        <div class="nds-form-container nds-search-box" data-filter-target="srv">
          <div class="nds-search-content"><div class="nds-form-control">
            <input type="text" class="nds-search-input" name="search">
          </div></div>
        </div>
        <div class="nds-filter" data-filter-target="srv">
          <div data-filter="category">
            <div class="nds-form-container nds-check-container">
              <div class="nds-form-control">
                <input type="checkbox" id="srv-cat-0" class="nds-check-input"
                       name="category" value="news">
              </div>
              <div class="nds-form-header"><label for="srv-cat-0"><span class="nds-label">News</span></label></div>
            </div>
          </div>
          <div data-filter="tags" data-filter-type="checkbox"
               data-filter-values='["alpha","beta"]'></div>
          <div data-filter="price" data-filter-type="slider"
               data-filter-min="0" data-filter-max="1000" data-filter-step="10"></div>
        </div>
        <div id="srvTarget" data-filter-items></div>`;
    document.body.appendChild(host);
    // The target id the form-mode instance swaps is its data-filter-target ("srv"),
    // so give the container that id too — mirrors a real page.
    host.querySelector('#srvTarget').id = 'srv';

    NDS.Filter.init();
    const f = NDS.Filter.getByTarget('srv');
    if (!f) return { fatal: 'no instance created for target "srv"', findings };
    if (!f.isAjaxMode) return { fatal: 'instance is not in AJAX mode', findings };

    const q = () => (sent.length ? new URLSearchParams(sent[sent.length - 1].url.split('?')[1] || '') : null);
    const settle = () => new Promise((r) => setTimeout(r, 60));

    // --- drive every surface, then submit once ---
    const authored = host.querySelector('input[name="category"]');
    authored.checked = true;
    authored.dispatchEvent(new Event('change', { bubbles: true }));

    const generated = host.querySelector('[data-filter="tags"] input[type="checkbox"]');
    if (generated) {
        generated.checked = true;
        generated.dispatchEvent(new Event('change', { bubbles: true }));
    }

    const rangeRoot = host.querySelector('.nds-filter-range');
    const thumbs = rangeRoot ? [...rangeRoot.querySelectorAll('input[type="range"]')] : [];
    if (thumbs.length === 2) {
        thumbs[0].value = '200';
        thumbs[1].value = '600';
        thumbs.forEach((t) => {
            t.dispatchEvent(new Event('input', { bubbles: true }));
            t.dispatchEvent(new Event('change', { bubbles: true }));
        });
    }

    const search = host.querySelector('input.nds-search-input');
    search.value = 'roads';

    // Put sort state in the URL the way NDS.Sort does, so the run measures
    // whether ANY out-of-form param survives into the request instead of
    // inferring it from the fact that the query is built out of FormData.
    history.replaceState({}, '', `${location.pathname}?sort=name&dir=asc`);

    f.submitForm();
    await settle();

    const req = q();
    findings.push({
        id: 'request-built',
        detail: req ? `sent ?${req.toString()}` : 'NO REQUEST SENT',
    });
    findings.push({
        id: 'browser-url-after-apply',
        detail: `location${window.location.search || ' (no params)'}`,
    });
    findings.push({
        id: 'criteria-after-apply',
        detail: JSON.stringify(f.criteria),
    });

    const has = (k) => !!req && req.has(k);

    // The contract: the request carries everything this.criteria claims. A range
    // renders two unnamed thumbs, so without the hidden-input fill it is absent
    // from the request while its chip, badge and URL all say it is applied.
    const missing = Object.entries(f.criteria.filters)
        .filter(([name, values]) => values.length && req && !req.has(name)
            // generated options legitimately submit under filter-{name}
            && !req.has(`filter-${name}`))
        .map(([name, values]) => `${name}=${values.join(',')}`);
    findings.push({
        id: 'ASSERT request carries every active criteria key',
        detail: missing.length ? `FAIL — missing ${missing.join(' ')}` : 'ok',
        fail: missing.length > 0,
    });
    findings.push({ id: 'authored checkbox in request', detail: has('category') ? `yes (category=${req.get('category')})` : 'NO' });
    findings.push({ id: 'generated checkbox in request', detail: has('filter-tags') ? `yes, but keyed "filter-tags" not "tags"` : (has('tags') ? 'yes (tags)' : 'NO') });
    findings.push({ id: 'slider in request', detail: has('price') ? `yes (price=${req.get('price')})` : 'NO' });
    findings.push({ id: 'search in request', detail: has('search') ? `yes (search=${req.get('search')})` : 'NO' });
    findings.push({ id: 'slider thumbs have a name attribute', detail: thumbs.length ? thumbs.map((t) => t.name || '(none)').join(' / ') : 'no slider built' });
    findings.push({ id: 'sort/dir from the URL in request', detail: has('sort') || has('dir') ? 'yes' : 'NO — dropped' });

    // The general rule behind every "X is missing" row above: is the request
    // exactly FormData, nothing more? If so, no out-of-form state can ever ride
    // along — measured, not reasoned from the source.
    const formKeys = [...new FormData(document.getElementById('srvForm')).keys()].sort().join(',');
    const reqKeys = req ? [...req.keys()].sort().join(',') : '';
    findings.push({
        id: 'request === FormData exactly (nothing else rides)',
        detail: formKeys === reqKeys ? `yes — both [${reqKeys}]` : `NO — form [${formKeys}] vs request [${reqKeys}]`,
    });

    // --- which public API calls re-fetch? ---
    const probeApi = async (label, fn) => {
        const before = sent.length;
        try { fn(); } catch (e) { findings.push({ id: `API ${label}`, detail: `threw: ${e.message}` }); return; }
        await settle();
        findings.push({ id: `API ${label}`, detail: sent.length > before ? 're-fetched' : 'NO re-fetch' });
    };

    await probeApi('setFilterValues("category", ["news"])', () => f.setFilterValues('category', ['news']));
    await probeApi('setSearchValue("bridges")', () => f.setSearchValue('bridges'));
    await probeApi('removeFilterValue("category","news") [chip X]', () => f.removeFilterValue('category', 'news'));
    await probeApi('clear()', () => f.clear());
    await probeApi('clearDropmenuFilters() [clear BUTTON]', () => f.clearDropmenuFilters());
    await probeApi('reset()', () => f.reset());
    await probeApi('applyFilters()', () => f.applyFilters());
    await probeApi('submitForm() [documented escape hatch]', () => f.submitForm());
    await probeApi('setRangeValues via _setRangeValues', () => f._setRangeValues('price', 100, 400));

    // Does a range survive the URL round-trip the rollback path relies on?
    if (thumbs.length === 2) {
        thumbs[0].value = '300'; thumbs[1].value = '700';
        thumbs.forEach((t) => t.dispatchEvent(new Event('input', { bubbles: true })));
        f.updateUrlParams();
        findings.push({ id: 'slider round-trips through the URL', detail: window.location.search || '(no params)' });
    }

    NDS.request = realRequest;
    return { findings, requestCount: sent.length, errors };
});

await browser.close();

if (report.fatal) {
    console.error(`FATAL  ${report.fatal}`);
    process.exit(2);
}
for (const f of report.findings) console.log(`${f.id.padEnd(46)} ${f.detail}`);
// A filterFormError means the run rolled back — every reading after it describes
// a reverted filter, so the numbers are not evidence of anything.
for (const e of report.errors) console.log(`RUN INVALID — submit errored: ${e}`);
for (const e of pageErrors) console.log(`page error: ${e}`);
console.log(`\n${report.requestCount} request(s) captured`);
const failed = report.findings.filter((f) => f.fail).length;
if (failed) console.log(`\n${failed} assertion(s) failing`);
process.exit(report.errors.length || pageErrors.length ? 2 : (failed ? 1 : 0));
