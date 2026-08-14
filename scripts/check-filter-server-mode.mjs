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
        <div class="nds-filter-applied" data-filter-target="srv" hidden>
          <span class="nds-label">Applied Filters:</span>
          <div class="nds-chips"></div>
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

    // --- what does each public API call leave on screen? ---
    //
    // Counting requests is not enough. What matters is whether the UI still
    // describes the results that are actually displayed. The rows on screen came
    // from the last request; the chips, badge and URL are rendered from criteria.
    // When those two drift apart the page states a filter it is not showing, so
    // each probe re-establishes a known applied state, runs one method, and
    // compares "what criteria now claims" against "what was last fetched".
    const claimOf = (crit) => {
        const p = new URLSearchParams();
        for (const [name, values] of Object.entries(crit.filters)) {
            if (values.length) p.set(name, values.join(','));
        }
        if (crit.search) p.set('search', crit.search);
        p.sort();
        return p.toString();
    };
    // Same shape, read back from the request the server actually answered.
    // Empty-valued params are dropped on both sides: an empty search box submits
    // `search=`, which is the absence of a filter, not a different one.
    const fetchedClaim = () => {
        const u = new URLSearchParams(sent[sent.length - 1]?.url.split('?')[1] || '');
        const p = new URLSearchParams();
        for (const [k, v] of u.entries()) if (v) p.set(k.replace(/^filter-/, ''), v);
        p.sort();
        return p.toString();
    };
    const chipCount = () => document.querySelectorAll('[data-filter-target="srv"] .nds-chips > *').length;

    // The search box was typed into directly earlier to prove it reaches
    // FormData. Left set, it would inject a keyword criteria never knows about
    // and every comparison below would read as drift.
    search.value = '';

    const restoreApplied = async () => {
        f.setFilterValues('category', ['news']);
        f.submitForm();
        await settle();
    };

    // driftOk: this method is documented not to refresh the view, or is private.
    const probeApi = async (label, fn, driftOk = false) => {
        await restoreApplied();
        const before = sent.length;
        try { fn(); } catch (e) { findings.push({ id: `API ${label}`, detail: `threw: ${e.message}`, fail: true }); return; }
        await settle();
        const refetched = sent.length > before;
        const claims = claimOf(f.criteria);
        const showing = fetchedClaim();
        const drift = claims !== showing;
        findings.push({
            id: `API ${label}`,
            detail: `${refetched ? 're-fetched' : 'no re-fetch'} | chips=${chipCount()}`
                + ` | claims [${claims || '-'}] vs showing [${showing || '-'}]`
                + (drift ? (driftOk ? '  (drift expected)' : '  <-- DRIFT') : ''),
            fail: drift && !driftOk,
        });
    };

    // Must differ from what restoreApplied() just applied, or the call changes
    // nothing and the probe reports "no drift" for a method it never exercised.
    await probeApi('setFilterValues("tags", ["beta"])', () => f.setFilterValues('tags', ['beta']));
    await probeApi('setSearchValue("bridges")', () => f.setSearchValue('bridges'));
    await probeApi('removeFilterValue("category","news") [chip X]', () => f.removeFilterValue('category', 'news'));
    // Documented as "clear all inputs without re-showing items" — it deliberately
    // does not refresh the view, so criteria emptying ahead of the results is its
    // contract, not a defect. Chips stay standing, matching the results.
    await probeApi('clear()', () => f.clear(), true);
    await probeApi('clearDropmenuFilters() [clear BUTTON]', () => f.clearDropmenuFilters());
    await probeApi('reset()', () => f.reset());
    await probeApi('applyFilters()', () => f.applyFilters());
    await probeApi('submitForm() [documented escape hatch]', () => f.submitForm());
    // Private (underscore) — listed for completeness, not a consumer surface.
    await probeApi('_setRangeValues (internal)', () => f._setRangeValues('price', 100, 400), true);

    // The migration cost of routing setters through _commitCriteriaChange: a
    // consumer following the docs (setter, then submitForm) now issues two
    // requests. Counted here rather than assumed — and _buildAjaxRequest aborts
    // the in-flight controller before starting the next, so the question is
    // whether the first is merely wasted or actually renders.
    const combo = async (label, fn) => {
        await restoreApplied();
        const before = sent.length;
        fn();
        await settle();
        const n = sent.length - before;
        findings.push({
            id: `ASSERT ${label}`,
            detail: `${n} request(s)` + (n === 1 ? '' : ' — expected 1'),
            fail: n !== 1,
        });
    };

    await combo('setter + submitForm() = one request', () => {
        f.setFilterValues('tags', ['beta']);
        f.submitForm();
    });
    await combo('three setters in a row = one request', () => {
        f.setFilterValues('tags', ['beta']);
        f.setFilterValues('category', ['news']);
        f.setSearchValue('bridges');
    });

    // Does a range survive the URL round-trip the rollback path relies on?
    if (thumbs.length === 2) {
        thumbs[0].value = '300'; thumbs[1].value = '700';
        thumbs.forEach((t) => t.dispatchEvent(new Event('input', { bubbles: true })));
        f.updateUrlParams();
        findings.push({ id: 'slider round-trips through the URL', detail: window.location.search || '(no params)' });
    }

    // --- CONTROL: client-side mode must be untouched ---
    //
    // The setters were rerouted for every mode, not just AJAX, so a client-side
    // filter is the control group: _commitCriteriaChange falls through to
    // applyFilters there, and setFilterValues must still hide rows and fire no
    // request. Without this the change could silently turn ordinary filtering
    // into a no-op and the AJAX assertions above would never notice.
    // A new instance reads the live URL in applyUrlParams(), so it would inherit
    // the search and filters the AJAX probes above left there — hiding every row
    // for a keyword this fixture never set. Reset before mounting.
    history.replaceState({}, '', location.pathname);

    const cliHost = document.createElement('div');
    cliHost.innerHTML = `
        <div class="nds-filter" data-filter-target="cli">
          <div data-filter="cat">
            <div class="nds-form-container nds-check-container">
              <div class="nds-form-control">
                <input type="checkbox" id="cli-0" class="nds-check-input" name="cat" value="news">
              </div>
              <div class="nds-form-header"><label for="cli-0"><span class="nds-label">News</span></label></div>
            </div>
          </div>
        </div>
        <div id="cli" data-filter-items="nds-card">
          <div class="nds-card"><span data-filter="cat" data-filter-value="news">News item</span></div>
          <div class="nds-card"><span data-filter="cat" data-filter-value="events">Events item</span></div>
        </div>`;
    document.body.appendChild(cliHost);
    NDS.Filter.init();

    const cli = NDS.Filter.getByTarget('cli');
    const cards = [...cliHost.querySelectorAll('#cli .nds-card')];
    const hidden = () => cards.filter((c) => c.hasAttribute('data-filtered')).length;
    const beforeCli = sent.length;

    findings.push({
        id: 'CONTROL client-side instance is not in form mode',
        detail: cli && !cli.isFormMode ? 'ok' : 'FAIL',
        fail: !cli || cli.isFormMode,
    });

    cli?.setFilterValues('cat', ['news']);
    await settle();
    findings.push({
        id: 'ASSERT client-side setFilterValues still filters',
        detail: `${hidden()}/2 hidden (want 1), ${sent.length - beforeCli} request(s) (want 0)`,
        fail: hidden() !== 1 || sent.length !== beforeCli,
    });

    cli?.setFilterValues('cat', []);
    await settle();
    findings.push({
        id: 'ASSERT client-side clearing re-shows every row',
        detail: `${hidden()}/2 hidden (want 0)`,
        fail: hidden() !== 0,
    });

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
