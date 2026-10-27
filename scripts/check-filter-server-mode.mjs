// What does a server-driven (AJAX form-mode) filter actually send, and which
// public API calls cause it to re-fetch?
//
// The contract (2.0): the request and the URL are ONE query, in the form's own
// encoding, under names the author wrote. Every probe compares the request the
// component built with the URL it wrote, keys and shape, so a new divergence
// fails here. It stubs NDS.request, drives each surface, and prints both.
//
// Covers: authored checkbox, generated checkbox and radio, a group named
// "method" (form.method clobbering), a dual and an "up to" slider, search, a
// sort picker, links from before 2.0, and the re-fetch behaviour of
// setFilterValues / setSearchValue / removeFilterValue / clear / reset.
//
//   node scripts/check-filter-server-mode.mjs [baseUrl]
// Defaults to the dev server. Start it with `bundle exec jekyll serve` if down.
import { launch } from './lib/browser.mjs';

const BASE = (process.argv[2] || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');

const probe = await fetch(`${BASE}/components/filter.html`).catch(() => null);
if (!probe?.ok) {
    console.error(`cannot reach ${BASE} — is the dev server up? (bundle exec jekyll serve)`);
    process.exit(2);
}

const browser = await launch();
const page = await browser.newPage();
const pageErrors = [];
page.on('pageerror', (e) => pageErrors.push(String(e)));

await page.goto(`${BASE}/components/filter.html`, { waitUntil: 'networkidle' });
await page.waitForFunction(() => window.NDS?.Filter?.init, null, { timeout: 20000 });

const report = await page.evaluate(async () => {
    const findings = [];
    const sent = [];

    // Stub the transport: record the request the component built, answer with a
    // response carrying the target subtree so the success path runs to the end.
    const realRequest = NDS.request;
    NDS.request = (url, options) => {
        sent.push({ url, method: options?.method || 'GET' });
        // The id MUST match data-filter-target: _renderAjaxResponse throws when the
        // response carries no #<targetId>, and the throw routes to _rollbackApplied,
        // which silently restores the pre-submit criteria — every later reading
        // would then describe a rolled-back filter, not a working one.
        return Promise.resolve({
            isJson: false,
            data: `<html><body><div id="srv" data-filter-items>served</div></body></html>`,
        });
    };
    const errors = [];
    document.addEventListener('nds:filter:error', (e) => errors.push(e.detail.error));

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
            <div class="nds-form-container nds-checkbox">
              <div class="nds-form-control">
                <input type="checkbox" id="srv-cat-0" class="nds-check-input"
                       name="category" value="news">
              </div>
              <div class="nds-form-header"><label for="srv-cat-0"><span class="nds-label">News</span></label></div>
            </div>
          </div>
          <div data-filter="tags" data-filter-type="checkbox"
               data-filter-values='["alpha","beta"]'></div>
          <div data-filter="kind" data-filter-type="radio"
               data-filter-values='["permit","licence"]'></div>
          <div data-filter="method" data-filter-type="checkbox"
               data-filter-values='["card","cash"]'></div>
          <div data-filter="price" data-filter-type="slider"
               data-filter-min="0" data-filter-max="1000" data-filter-step="10"></div>
          <div data-filter="cap" data-filter-type="slider"
               data-filter-max="500" data-filter-step="10"></div>
        </div>
        <div class="nds-dropmenu" data-select-name="sort" data-filter-target="srv">
          <button type="button" class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger"><span class="nds-label">Sort</span></button>
          <div class="nds-dropmenu-menu" hidden><div class="nds-dropmenu-scroll">
            <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="newest"><span class="nds-label">Newest</span></button>
            <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="title"><span class="nds-label">Title</span></button>
          </div></div>
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

    NDS.Dropmenu.reinit();
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

    for (const selector of ['[data-filter="tags"] input', '[data-filter="method"] input', '[data-filter="kind"] input[value="permit"]']) {
        host.querySelectorAll(selector).forEach((input) => {
            input.checked = true;
            input.dispatchEvent(new Event('change', { bubbles: true }));
        });
    }
    const capThumb = host.querySelector('[data-filter="cap"] input[type="range"]');
    capThumb.value = '300';
    capThumb.dispatchEvent(new Event('input', { bubbles: true }));

    const rangeRoot = host.querySelector('[data-filter="price"]');
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
    search.value = 'Roads';

    // A picker pick sends the form by itself.
    const picker = host.querySelector('[data-select-name="sort"]');
    const beforePick = sent.length;
    picker.querySelector('[data-value="title"]').click();
    await settle();
    findings.push({
        id: 'ASSERT a sort pick sends one request',
        detail: `${sent.length - beforePick} request(s)`,
        fail: sent.length - beforePick !== 1,
    });

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
    const all = (k) => (req ? req.getAll(k).join('&') : '');

    // The guard: the request query and the URL query are one, keys and shape.
    // Empty values are dropped on both sides: an empty search box submits
    // `search=`, which is the absence of a filter, not a different one.
    const norm = (params) => [...params].filter(([, v]) => v).map(([k, v]) => `${k}=${v}`).sort().join('&');
    const sameQuery = () => {
        const fetched = norm(new URLSearchParams(sent[sent.length - 1]?.url.split('?')[1] || ''));
        const url = norm(new URLSearchParams(location.search));
        return { same: fetched === url, fetched, url };
    };
    const first = sameQuery();
    findings.push({
        id: 'ASSERT request query === URL query',
        detail: first.same ? 'ok' : `FAIL — request [${first.fetched}] vs URL [${first.url}]`,
        fail: !first.same,
    });
    const expect = (id, ok, detail) => findings.push({ id: `ASSERT ${id}`, detail: ok ? `ok (${detail})` : `FAIL — ${detail}`, fail: !ok });
    expect('authored checkbox keyed category', all('category') === 'news', all('category') || 'missing');
    expect('generated checkbox keyed tags, repeated', all('tags') === 'alpha&beta', all('tags') || 'missing');
    expect('generated radio keyed kind', all('kind') === 'permit', all('kind') || 'missing');
    expect('a group named method sends, GET kept', all('method') === 'card&cash' && sent[sent.length - 1]?.method === 'GET', `${all('method')} ${sent[sent.length - 1]?.method}`);
    expect('dual slider as two keys', all('price-min') === '200' && all('price-max') === '600' && !has('price'), `price-min=${all('price-min')} price-max=${all('price-max')}`);
    expect('"up to" slider sends its high end only', all('cap-max') === '300' && !has('cap-min'), `cap-max=${all('cap-max')} cap-min=${all('cap-min')}`);
    expect('search keyed search', all('search') === 'Roads', all('search') || 'missing');
    expect('sort picker keyed sort', all('sort') === 'title', all('sort') || 'missing');
    expect('no filter- key', ![...(req?.keys() || [])].some((k) => k.startsWith('filter-')), req?.toString());
    findings.push({ id: 'slider thumbs have a name attribute', detail: thumbs.length ? thumbs.map((t) => t.name || '(none)').join(' / ') : 'no slider built' });

    // --- what does each public API call leave on screen? ---
    //
    // Counting requests is not enough. What matters is whether the UI still
    // describes the results that are actually displayed. The rows on screen came
    // from the last request; the chips, badge and URL are rendered from criteria.
    // When those two drift apart the page states a filter it is not showing, so
    // each probe re-establishes a known applied state, runs one method, and
    // compares "what criteria now claims" against "what was last fetched".
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
        // The URL is written from criteria, so it is what the page claims; the request is what it shows.
        const { same, fetched, url } = sameQuery();
        const drift = !same;
        findings.push({
            id: `API ${label}`,
            detail: `${refetched ? 're-fetched' : 'no re-fetch'} | chips=${chipCount()}`
                + ` | URL [${url || '-'}] vs request [${fetched || '-'}]`
                + (drift ? (driftOk ? '  (drift expected)' : '  <-- DRIFT') : ''),
            fail: drift && !driftOk,
        });
    };

    // Must differ from what restoreApplied() just applied, or the call changes
    // nothing and the probe reports "no drift" for a method it never exercised.
    await probeApi('setFilterValues("tags", ["beta"])', () => f.setFilterValues('tags', ['beta']));
    await probeApi('setSearchValue("Bridges")', () => f.setSearchValue('Bridges'));
    await probeApi('removeFilterValue("category","news") [chip X]', () => f.removeFilterValue('category', 'news'));
    // Documented as "clear all inputs without re-showing items" — it deliberately
    // does not refresh the view, so criteria emptying ahead of the results is its
    // contract, not a defect. Chips stay standing, matching the results.
    await probeApi('clear()', () => f.clear(), true);
    await probeApi('clearDropmenuFilters() [clear BUTTON]', () => f.clearDropmenuFilters());
    await probeApi('reset()', () => f.reset());
    await probeApi('syncFilters()', () => f.syncFilters());
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

    // Links from before 2.0 still open: a comma list, a one-key range, filter-{name}.
    // A rollback re-reads the URL, the same path as a page load.
    f._rollbackApplied('?tags=alpha,beta&price=300-700&filter-kind=licence&sort=newest');
    const old = f.getCriteria().filters;
    const pickValue = picker.querySelector('input[data-nds-select-value]').value;
    expect('old link: comma list', String(old.tags) === 'alpha,beta', String(old.tags));
    expect('old link: one-key range', String(old.price) === '300-700', String(old.price));
    expect('old link: filter-{name}', String(old.kind) === 'licence', String(old.kind));
    expect('old link: picker picked again', pickValue === 'newest', pickValue);
    f.syncUrlParams();
    expect('a write replaces the old forms', !/[?&](price|filter-kind)=/.test(location.search) && /tags=alpha&tags=beta/.test(location.search), location.search);

    // --- CONTROL: client-side mode must be untouched ---
    //
    // The setters were rerouted for every mode, not just AJAX, so a client-side
    // filter is the control group: _commitCriteriaChange falls through to
    // syncFilters there, and setFilterValues must still hide rows and fire no
    // request. Without this the change could silently turn ordinary filtering
    // into a no-op and the AJAX assertions above would never notice.
    // A new instance reads the live URL in _readUrlParams(), so it would inherit
    // the search and filters the AJAX probes above left there — hiding every row
    // for a keyword this fixture never set. Reset before mounting.
    history.replaceState({}, '', location.pathname);

    const cliHost = document.createElement('div');
    cliHost.innerHTML = `
        <div class="nds-filter" data-filter-target="cli">
          <div data-filter="cat">
            <div class="nds-form-container nds-checkbox">
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
// An nds:filter:error means the run rolled back — every reading after it describes
// a reverted filter, so the numbers are not evidence of anything.
for (const e of report.errors) console.log(`RUN INVALID — submit errored: ${e}`);
for (const e of pageErrors) console.log(`page error: ${e}`);
console.log(`\n${report.requestCount} request(s) captured`);
const failed = report.findings.filter((f) => f.fail).length;
if (failed) console.log(`\n${failed} assertion(s) failing`);
process.exit(report.errors.length || pageErrors.length ? 2 : (failed ? 1 : 0));
