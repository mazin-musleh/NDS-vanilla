// Who owns row ORDER when the server owns the rows?
//
// In AJAX form mode the server returns one page of results. The filter then
// calls _resyncSort(), which re-creates NDS.Sort on the swapped-in container
// with urlSync — and NDS.Sort's init() reads ?sort=&dir= and REORDERS. Meanwhile
// _buildAjaxRequest builds its query from FormData alone, so sort/dir never
// reach the server (updateUrlParams deliberately preserves them as NDS.Sort's).
//
// This harness reports the split as data rather than reasoning about it:
//   Q1  after an AJAX swap, does the client re-order the server's rows?
//   Q2  does a sort trigger click in AJAX mode re-fetch, or re-order in place?
//   Q3  does sort/dir ever reach the server?
//
//   node scripts/check-filter-sort-ownership.mjs [baseUrl]
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
await page.waitForFunction(() => window.NDS?.Filter?.init && window.NDS?.Sort?.create, { timeout: 20000 });

const report = await page.evaluate(async () => {
    const findings = [];
    const sent = [];

    // The server's own order for page 1. Deliberately NOT alphabetical, and the
    // names are chosen so a client-side alphabetical sort visibly disagrees with
    // it — that disagreement is the whole measurement.
    const SERVER_PAGE_1 = ['Mango', 'Apple', 'Zebra'];
    const rows = (names) =>
        names.map((n) => `<div class="nds-card" data-sort-name="${n}">${n}</div>`).join('');

    const realRequest = NDS.request;
    NDS.request = (url, options) => {
        sent.push({ url, method: options?.method || 'GET' });
        return Promise.resolve({
            isJson: false,
            data: `<html><body><div id="srt" data-filter-items>${rows(SERVER_PAGE_1)}</div></body></html>`,
        });
    };

    const host = document.createElement('div');
    host.innerHTML = `
        <form id="srtForm" data-filter-target="srt" data-filter-submit data-ajax
              method="get" action="/api/search">
          <button type="submit" class="nds-btn nds-primary" data-filter-action="apply">
            <span class="nds-label">Apply</span>
          </button>
        </form>
        <div class="nds-filter" data-filter-target="srt">
          <div data-filter="category">
            <div class="nds-form-container nds-check-container">
              <div class="nds-form-control">
                <input type="checkbox" id="srt-cat-0" class="nds-check-input"
                       name="category" value="news">
              </div>
              <div class="nds-form-header"><label for="srt-cat-0"><span class="nds-label">News</span></label></div>
            </div>
          </div>
        </div>
        <div class="nds-toolbar" data-filter-target="srt">
          <button type="button" class="nds-btn nds-subtle" data-sort="name" data-sort-dir="asc">
            <span class="nds-label">Name A-Z</span>
          </button>
          <button type="button" class="nds-btn nds-subtle" data-sort="name" data-sort-dir="desc">
            <span class="nds-label">Name Z-A</span>
          </button>
        </div>
        <div id="srtTarget" data-filter-items>${rows(SERVER_PAGE_1)}</div>`;
    document.body.appendChild(host);
    host.querySelector('#srtTarget').id = 'srt';

    const domOrder = () =>
        [...document.getElementById('srt').querySelectorAll('.nds-card')]
            .map((el) => el.getAttribute('data-sort-name'));

    // Sort state in the URL, exactly as NDS.Sort writes it.
    history.replaceState({}, '', `${location.pathname}?sort=name&dir=asc`);

    NDS.Filter.init();
    const f = NDS.Filter.getByTarget('srt');
    if (!f) return { fatal: 'no instance created for target "srt"', findings };
    if (!f.isAjaxMode) return { fatal: 'instance is not in AJAX mode', findings };

    const settle = () => new Promise((r) => setTimeout(r, 80));
    const q = () => (sent.length ? new URLSearchParams(sent[sent.length - 1].url.split('?')[1] || '') : null);

    // ── Q1 — does the client re-order the server's page after a swap? ───────
    const beforeSubmit = domOrder();
    const sentBefore = sent.length;
    f.submitForm();
    await settle();
    const afterSwap = domOrder();
    const serverOrder = SERVER_PAGE_1.join(',');
    const sortedOrder = [...SERVER_PAGE_1].sort().join(',');

    findings.push({
        q: 'Q1 client re-orders the swapped-in server page',
        serverSent: serverOrder,
        domAfterSwap: afterSwap.join(','),
        reordered: afterSwap.join(',') !== serverOrder,
        matchesClientSort: afterSwap.join(',') === sortedOrder,
        beforeSubmit: beforeSubmit.join(','),
    });

    // ── Q3 — did sort/dir reach the server on that request? ────────────────
    const params = q();
    findings.push({
        q: 'Q3 sort/dir in the request',
        requestQuery: params ? params.toString() : '(no request)',
        browserUrl: location.search,
        sortInRequest: !!params?.get('sort'),
        dirInRequest: !!params?.get('dir'),
        requests: sent.length - sentBefore,
    });

    // ── Q2 — does a sort trigger click re-fetch, or re-order in place? ─────
    const sentBeforeClick = sent.length;
    const domBeforeClick = domOrder();
    // mode: 'direct' — each trigger is a fixed (key, dir) pair, it does not
    // toggle. Click the desc option so the click asks for a real change.
    const trigger = host.querySelector('[data-sort="name"][data-sort-dir="desc"]');
    trigger.click();
    await settle();
    findings.push({
        q: 'Q2 sort click after an AJAX swap',
        requestsFired: sent.length - sentBeforeClick,
        domBefore: domBeforeClick.join(','),
        domAfter: domOrder().join(','),
        reorderedInPlace: domOrder().join(',') !== domBeforeClick.join(','),
        urlAfter: location.search,
        // Diagnostics — a click that does nothing is either a dead trigger or a
        // dead instance, and those are different defects.
        triggersFound: f.queryAll('[data-sort]').length,
        sortInstance: !!f.sort,
        sortRootIsLiveContainer: f.sort ? f.sort.root === document.getElementById('srt') : null,
        sortState: f.sort?.getState ? JSON.stringify(f.sort.getState()) : '(no getState)',
        itemsSeenBySort: f.items ? f.items.length : 0,
    });

    // ── Q4 — does the UI API already deliver server-side sorting? ──────────
    // The dev's own control, a plain named form field. No data-sort, so the
    // client engine is not involved at all: the value should ride FormData into
    // the request like any other criterion, and submitForm() is the trigger.
    const devSort = document.createElement('select');
    devSort.name = 'sort';
    devSort.setAttribute('form', 'srtForm');
    devSort.innerHTML = `<option value="">none</option><option value="price_desc">price_desc</option>`;
    host.appendChild(devSort);
    devSort.value = 'price_desc';

    const sentBeforeDev = sent.length;
    f.submitForm();
    await settle();
    const devParams = q();
    findings.push({
        q: 'Q4 dev-owned server sort via a named form control',
        requestsFired: sent.length - sentBeforeDev,
        requestQuery: devParams ? devParams.toString() : '(no request)',
        sortReachedServer: devParams?.get('sort') === 'price_desc',
        browserUrlAfter: location.search,
        sortInBrowserUrl: new URLSearchParams(location.search).get('sort'),
    });

    // ── Q5 — the clean server-sort setup: no data-sort triggers anywhere ───
    // This is what a dev who owns sorting server-side actually authors. With no
    // [data-sort], setupSort() returns early and NDS.Sort is never created, so
    // nothing client-side claims the ?sort= key. Question: does the dev's sort
    // value reach the SHAREABLE URL, or does updateUrlParams' unconditional
    // sort/dir skip drop it?
    const host2 = document.createElement('div');
    host2.innerHTML = `
        <form id="srt2Form" data-filter-target="srt2" data-filter-submit data-ajax
              method="get" action="/api/search">
          <select name="sort">
            <option value="">none</option>
            <option value="price_desc">price_desc</option>
          </select>
          <button type="submit" class="nds-btn nds-primary" data-filter-action="apply">
            <span class="nds-label">Apply</span>
          </button>
        </form>
        <div class="nds-filter" data-filter-target="srt2">
          <div data-filter="category">
            <div class="nds-form-container nds-check-container">
              <div class="nds-form-control">
                <input type="checkbox" id="srt2-cat-0" class="nds-check-input"
                       name="category" value="news">
              </div>
              <div class="nds-form-header"><label for="srt2-cat-0"><span class="nds-label">News</span></label></div>
            </div>
          </div>
        </div>
        <div id="srt2Target" data-filter-items>${rows(SERVER_PAGE_1)}</div>`;
    document.body.appendChild(host2);
    host2.querySelector('#srt2Target').id = 'srt2';
    history.replaceState({}, '', location.pathname);   // clean slate, no client sort keys

    NDS.Filter.init();
    const f2 = NDS.Filter.getByTarget('srt2');
    if (f2) {
        host2.querySelector('select[name="sort"]').value = 'price_desc';
        const cat2 = host2.querySelector('input[name="category"]');
        cat2.checked = true;
        cat2.dispatchEvent(new Event('change', { bubbles: true }));
        await settle();   // let the criteria change commit before submitting
        const sentBefore2 = sent.length;
        f2.submitForm();
        await settle();
        const p2 = q();
        findings.push({
            q: 'Q5 clean server-sort setup (no data-sort triggers)',
            clientSortEngineCreated: !!f2.sort,
            requestsFired: sent.length - sentBefore2,
            requestQuery: p2 ? p2.toString() : '(no request)',
            sortReachedServer: p2?.get('sort') === 'price_desc',
            browserUrlAfter: location.search,
            sortInBrowserUrl: new URLSearchParams(location.search).get('sort'),
            domOrderUntouched: [...document.getElementById('srt2').querySelectorAll('.nds-card')]
                .map((el) => el.getAttribute('data-sort-name')).join(','),
        });
    } else {
        findings.push({ q: 'Q5 clean server-sort setup', error: 'no instance for srt2' });
    }

    NDS.request = realRequest;
    return { findings, sent };
});

await browser.close();

if (report.fatal) {
    console.error(`FATAL: ${report.fatal}`);
    process.exit(2);
}

for (const f of report.findings) {
    console.log(`\n── ${f.q}`);
    for (const [k, v] of Object.entries(f)) if (k !== 'q') console.log(`   ${k}: ${v}`);
}
if (pageErrors.length) {
    console.log('\npage errors:');
    pageErrors.forEach((e) => console.log(`   ${e}`));
}
console.log('');
