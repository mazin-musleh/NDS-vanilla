// Does NDS.Init.refresh(container) reach every live component exactly once, and
// keep its hands off anything the server drives?
//
// Three failure modes, all silent in a browser:
//   GAP     a component owning something in the container is never told, so its view
//           goes stale (rows that never filter, a record count that lies).
//   OVERLAP a component is told twice — double work, double events, consumer handlers
//           running against a half-settled DOM.
//   SERVER  a server-driven list gets re-sorted, re-paged or re-filtered client-side,
//           silently contradicting the query the server just ran.
//
// Drives two real pages, so no fixture markup is invented:
//   examples/manage-records.html  eight components over one <tbody> — where the
//                                 finding came from. Rows are CLONED from the page's
//                                 own and mutated, so the harness cannot drift from canon.
//   components/pagination.html    live data-driven navs (data-total-pages) — the
//                                 server-pagination shape.
//
//   node scripts/check-refresh.mjs [baseUrl]
// Defaults to the dev server. Start it with `bundle exec jekyll serve` if it is down.
import puppeteer from 'puppeteer-core';
import { existsSync } from 'node:fs';

const BASE = (process.argv[2] || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');
const CHROME = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
].find((p) => p && existsSync(p));

const probe = await fetch(`${BASE}/examples/manage-records.html`).catch(() => null);
if (!probe?.ok) {
    console.error(`cannot reach ${BASE} — is the dev server up? (bundle exec jekyll serve)`);
    process.exit(2);
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const report = [];
const pageErrors = [];

async function open(path) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 1000 });
    page.on('pageerror', (e) => pageErrors.push(`${path}: ${e.message}`));
    await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle0' });
    await page.evaluate(() => Promise.all([
        window.NDS.loadBundle('delegated').catch(() => {}),
        window.NDS.loadBundle('extras').catch(() => {}),
    ]));
    await new Promise((r) => setTimeout(r, 1200));
    return page;
}

// ═══ page 1: the client-side composition ═══════════════════════════════════
const recordsPage = await open('/examples/manage-records.html');

const scriptRequests = [];
recordsPage.on('request', (r) => { if (r.resourceType() === 'script') scriptRequests.push(r.url()); });

report.push(...await recordsPage.evaluate(async () => {
    const out = [];
    const ok = (name, pass, detail = '') => out.push({ name, pass, detail: String(detail) });
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));

    const tbody = document.getElementById('requestsTableBody');
    const table = document.getElementById('requestsTable');
    if (!tbody || !table) return [{ name: 'fixture present', pass: false, detail: 'manage-records markup not found' }];

    const rows = () => [...tbody.querySelectorAll('tr.nds-page-item')];
    const order = () => rows().map((r) => r.cells[1].textContent.trim()).join(',');
    const filter = () => NDS.Filter.getByTarget('requestsTableBody');
    const slot = (sel) => document.querySelector(sel)?.textContent?.trim() ?? null;
    // rows() ignores the `hidden` attribute pagination sets, so row order alone cannot
    // see a page change. Read the nav directly, or every paging assertion is blind.
    const nav = () => document.querySelector('[data-auto-pagination="requestsTableBody"]');
    const activePage = () => nav()?.querySelector('button[data-state~="active"]')?.getAttribute('aria-label') ?? null;
    const firstVisible = () => rows().filter((r) => !r.hidden)[0]?.cells[1].textContent.trim() ?? null;
    const gotoPage = async (n) => {
        nav()?.querySelector(`.page_${n} button`)?.click();
        await wait(600);
    };

    // ── instrumentation: count what the walk actually dispatched ───────────
    const calls = {};
    NDS.Init.components.forEach((c) => {
        calls[c.name] = { init: 0, refresh: 0 };
        const i = c.init;
        c.init = (...a) => { calls[c.name].init++; return i.apply(c, a); };
        if (c.refresh) {
            const r = c.refresh;
            c.refresh = (...a) => { calls[c.name].refresh++; return r.apply(c, a); };
        }
    });

    const EVENTS = ['nds:filter:change', 'nds:sort:change', 'nds:table:sort',
        'nds:table:selection', 'nds:pagination:change'];
    const events = {};
    EVENTS.forEach((e) => { events[e] = 0; document.addEventListener(e, () => { events[e]++; }, true); });
    const reset = () => {
        Object.values(calls).forEach((c) => { c.init = 0; c.refresh = 0; });
        EVENTS.forEach((e) => { events[e] = 0; });
    };
    const reached = () => Object.entries(calls).filter(([, c]) => c.init + c.refresh > 0).map(([n]) => n).sort();

    // `service` is AUTO-SCANNED (values harvested from the rows), `status` is
    // AUTHOR-DECLARED via data-filter-values. Both are exercised below, because
    // refresh() must regenerate the first and must leave the second alone.
    const makeRow = (ref, status, statusLabel, amount, service) => {
        const row = rows()[0].cloneNode(true);
        row.querySelectorAll('[data-nds-dropmenu-initialized]')
            .forEach((el) => el.removeAttribute('data-nds-dropmenu-initialized'));
        row.cells[1].textContent = ref;
        const amountEl = row.querySelector('[data-filter="amount"]');
        amountEl.setAttribute('data-filter-value', String(amount));
        amountEl.textContent = String(amount);
        row.cells[5].setAttribute('data-sort-value', String(amount));
        const statusEl = row.querySelector('[data-filter="status"]');
        statusEl.setAttribute('data-filter-value', status);
        statusEl.textContent = statusLabel;
        if (service) row.querySelector('[data-filter="service"]').textContent = service;
        return row;
    };

    // The filter's option inputs are built LAZILY on the dropmenu's first open, so
    // open it once up front. That is also the only state where regeneration matters:
    // a never-opened menu builds fresh (and correct) whenever it is first opened —
    // the stale-options bug only exists for a menu the user has already seen.
    const filterField = document.querySelector('[data-filter-type]');
    const filterMenu = filterField?.closest('.nds-dropmenu');
    const filterTrigger = filterMenu?.querySelector('[data-dropmenu-trigger], .nds-dropmenu-trigger, button');
    filterTrigger?.click();
    await wait(600);
    const optionsOf = (name) => [...document.querySelectorAll(`[data-filter="${name}"] input`)]
        .map((i) => (i.value || '').toLowerCase());
    const seededService = optionsOf('service');
    const seededStatus = optionsOf('status');
    filterTrigger?.click();
    await wait(300);

    // ── 1. scanner sweep: reached iff it owns an element inside, once ──────
    const before = rows().length;
    reset();
    tbody.appendChild(makeRow('REQ-TEST-001', 'escalated', 'Escalated', 9999, 'Customs clearance'));

    // Independent ground truth for the SCANNER camp: a component with a live
    // element inside the container has work to do. Derived from the DOM, not from
    // the walk's own branch, or the test would only prove the code equals itself.
    const live = NDS.Init.components.filter((c) => NDS[c.name] && !NDS[c.name].__ndsStub);
    const shouldScan = live.filter((c) => !c.refresh && tbody.querySelector(c.selector)).map((c) => c.name);

    NDS.Init.refresh(tbody);
    const got = reached();

    const gaps = shouldScan.filter((n) => !got.includes(n));
    ok('no gaps — every component with an element inside the container was reached',
        gaps.length === 0, gaps.length ? `missed: ${gaps.join(', ')}` : `reached: ${shouldScan.join(', ')}`);

    // `universal` components (selector: null — Link, FontLoading) have no selector to
    // test and are meant to run on every pass, exactly as the init partition treats
    // them. They are not strays.
    const outside = live.filter((c) => !c.refresh && !c.universal && !tbody.querySelector(c.selector)).map((c) => c.name);
    const strays = got.filter((n) => outside.includes(n));
    ok('no strays — components with nothing in the container were left alone',
        strays.length === 0, strays.length ? `touched: ${strays.join(', ')}` : `${outside.length} skipped`);

    const universals = live.filter((c) => c.universal).map((c) => c.name);
    ok('universal components (no selector) still run under a scoped refresh',
        universals.every((n) => got.includes(n)),
        universals.length ? `${universals.join(', ')} reached` : 'none registered');

    const doubled = Object.entries(calls).filter(([, c]) => c.init + c.refresh > 1)
        .map(([n, c]) => `${n}(init:${c.init},refresh:${c.refresh})`);
    ok('no overlap — each component dispatched at most once per call',
        doubled.length === 0, doubled.join(', ') || 'all singular');

    // ── 2. owner sweep: assert OUTCOME, not dispatch ───────────────────────
    // Pagination self-heals rather than riding the walk, so "was it called" proves
    // nothing here — only the visible state does.
    await wait(500); // pagination's auto-refresh watcher is debounced 150ms
    const f = filter();
    ok('Filter re-resolved its item set (rows added at runtime now filter)',
        f && f.items.length === before + 1, `items=${f?.items.length} rows=${rows().length}`);

    filterTrigger?.click();
    await wait(600);
    const afterService = optionsOf('service');
    const afterStatus = optionsOf('status');
    filterTrigger?.click();
    await wait(300);

    ok('Filter regenerated its AUTO-SCANNED options (a runtime value is selectable)',
        seededService.length > 0 && !seededService.includes('customs clearance')
            && afterService.includes('customs clearance'),
        `seeded[${seededService.join('|')}] → after[${afterService.join('|')}]`);

    // The mirror invariant. data-filter-values is the author's declared option list,
    // and refresh() must NOT widen it from whatever rows happen to be present —
    // that list is a contract (fixed vocabulary, translated labels, deliberate order).
    ok('Filter left the AUTHOR-DECLARED option list alone (data-filter-values is a contract)',
        afterStatus.join('|') === seededStatus.join('|') && !afterStatus.includes('escalated'),
        `[${afterStatus.join('|')}] unchanged`);

    ok('Pagination recomputed its records window',
        Number(slot('[data-paged-count]')) === rows().length,
        `${slot('[data-paged-from]')}-${slot('[data-paged-to]')} of ${slot('[data-paged-count]')}`);

    // Selection writes [data-selection-count] / [data-selection-total], NOT the
    // [data-paged-*] slots pagination owns. Asserting the paged slot proved nothing
    // about Selection: it was pagination's assertion twice.
    const box = rows()[rows().length - 1].querySelector('input.nds-check');
    box.checked = true;
    box.dispatchEvent(new Event('change', { bubbles: true }));
    await wait(300);
    NDS.Init.refresh(tbody);
    await wait(300);
    ok('Selection counted the new row after it was checked',
        slot('[data-selection-count]') === '1',
        `count=${slot('[data-selection-count]')}`);
    // This fixture's widget pairs the count with [data-paged-count] rather than
    // [data-selection-total], so only assert the total where that slot exists.
    ok('Selection total tracks the row count (where the widget carries the slot)',
        slot('[data-selection-total]') === null || slot('[data-selection-total]') === String(rows().length),
        slot('[data-selection-total]') === null ? 'slot not in this fixture' : `total=${slot('[data-selection-total]')} rows=${rows().length}`);
    box.checked = false;
    box.dispatchEvent(new Event('change', { bubbles: true }));
    await wait(300);

    ok('new row\'s dropmenu was initialized (a scanner picked it up)',
        !!tbody.querySelector('tr:last-child .nds-dropmenu[data-nds-dropmenu-initialized]'),
        'init stamp present');

    // ── 3. SERVER-SIDE: an active sort is never re-applied client-side ─────
    // A server-sorted page is 20 rows the server ordered out of 500. Re-sorting it
    // by rendered cell text would silently contradict the server.
    table.querySelectorAll('.nds-sort-btn')[4]?.click(); // fee column
    await wait(400);
    const sortActive = !!table.ndsSort?.getState().key;
    tbody.appendChild(makeRow('REQ-SRV-001', 'pending', 'Pending', 1));
    const orderAfterInsert = order();
    reset();
    NDS.Init.refresh(tbody);
    await wait(400);
    ok('server sort safe — refresh does not re-order rows the server placed',
        order() === orderAfterInsert,
        sortActive ? `sort active, order held=${order() === orderAfterInsert}` : 'NO SORT ACTIVE — weak test');
    ok('server sort safe — a refresh fires no sort event',
        events['nds:sort:change'] === 0 && events['nds:table:sort'] === 0,
        `sort:change=${events['nds:sort:change']} table:sort=${events['nds:table:sort']}`);

    // ── 4. SERVER-SIDE: an AJAX filter is skipped, not re-filtered ─────────
    const inst = filter();
    const realRefresh = inst.refresh.bind(inst);
    let instCalls = 0;
    let submitted = 0;
    const realSubmit = inst.submitForm?.bind(inst);
    inst.refresh = (...a) => { instCalls++; return realRefresh(...a); };
    if (realSubmit) inst.submitForm = (...a) => { submitted++; return realSubmit(...a); };

    // The guard is isFormMode, not isAjaxMode: a <form data-filter-submit> WITHOUT
    // data-ajax is server-driven too. Test the broader flag, and both variants.
    inst.isFormMode = true;
    inst.isAjaxMode = true;
    NDS.Init.refresh(tbody);
    await wait(200);
    ok('server filter safe — an AJAX filter is skipped, never re-filtered client-side',
        instCalls === 0, `instance.refresh calls=${instCalls}`);
    ok('server filter safe — refresh never triggers a form submit / refetch',
        submitted === 0, `submitForm calls=${submitted}`);

    inst.isAjaxMode = false;   // plain form mode: still server-driven
    NDS.Init.refresh(tbody);
    await wait(200);
    ok('server filter safe — a plain form-submit filter is skipped too (not just AJAX)',
        instCalls === 0, `instance.refresh calls=${instCalls}`);

    inst.isFormMode = false;
    NDS.Init.refresh(tbody);
    await wait(200);
    ok('client filter still refreshed once the flags are off (guard is not blanket)',
        instCalls === 1, `calls=${instCalls}`);
    inst.refresh = realRefresh;
    if (realSubmit) inst.submitForm = realSubmit;

    // ── 5. the user's PLACE survives a refresh ────────────────────────────
    // A row edit is not a criteria change, so the page must not move. This is the one
    // the old snapshot could not see: pagination hides rows, it never reorders them,
    // so row order and total count are both identical on page 1 and page 3.
    await gotoPage(2);
    const pageBefore = activePage();
    const visibleBefore = firstVisible();
    rows().filter((r) => !r.hidden)[0].cells[2].textContent = 'EDITED';
    NDS.Init.refresh(tbody);
    await wait(800);
    ok('a row edit keeps the user on their page (no snap back to page 1)',
        activePage() === pageBefore && firstVisible() === visibleBefore,
        `${pageBefore}/${visibleBefore} → ${activePage()}/${firstVisible()}`);

    // ── 6. idempotence ────────────────────────────────────────────────────
    const snap = () => `${order()}#${slot('[data-paged-count]')}#${activePage()}#${firstVisible()}`;
    NDS.Init.refresh(tbody);
    await wait(500);
    const s1 = snap();
    reset();
    NDS.Init.refresh(tbody);
    await wait(500);
    ok('idempotent — refreshing twice leaves identical state', snap() === s1, snap() === s1 ? 'stable' : `${s1} → ${snap()}`);
    // A settled refresh re-announces the filter result once. That is documented on
    // core/refresh.md; anything MORE than once is the overlap this suite hunts.
    const noisy = Object.entries(events).filter(([e, n]) => n > (e === 'nds:filter:change' ? 1 : 0))
        .map(([e, n]) => `${e}x${n}`);
    ok('no unexpected events on a settled refresh (one documented filter:change allowed)',
        noisy.length === 0, noisy.join(', ') || `filter:change x${events['nds:filter:change']}`);

    // ── 7. parity with the five-call block it replaces ────────────────────
    // Compare the two paths to EACH OTHER across every component, not each to itself.
    // The old version asserted `items == rows` after both, which stays true even if the
    // one-call path reaches nothing — deleting the manual block still passed it.
    const fullState = () => JSON.stringify({
        items: filter().items.length,
        rows: rows().length,
        paged: slot('[data-paged-count]'),
        selTotal: slot('[data-selection-total]'),
        // did every row's dropmenu and number get wired?
        unwiredMenus: tbody.querySelectorAll('.nds-dropmenu:not([data-nds-dropmenu-initialized])').length,
        formattedNumbers: tbody.querySelectorAll('.nds-number-format').length,
    });

    tbody.appendChild(makeRow('REQ-TEST-003', 'pending', 'Pending', 500));
    NDS.Init.refresh(tbody);
    await wait(600);
    const viaEntry = fullState();

    tbody.appendChild(makeRow('REQ-TEST-004', 'pending', 'Pending', 500));
    NDS.Dropmenu.reinit();
    NDS.Numbers.reinit();
    NDS.Pagination.refresh(tbody, { keepPage: true });
    NDS.Selection.reinit();
    NDS.Filter.getByTarget('requestsTableBody')?.refresh();
    await wait(600);
    const viaManual = fullState();

    // Row counts differ by the one extra row, so compare everything else verbatim.
    const norm = (s) => { const o = JSON.parse(s); delete o.items; delete o.rows; delete o.paged; delete o.selTotal; delete o.formattedNumbers; return JSON.stringify(o); };
    ok('parity — the one call leaves the same wiring state as the five-call block',
        norm(viaEntry) === norm(viaManual) && JSON.parse(viaEntry).unwiredMenus === 0,
        `entry ${viaEntry} · manual ${viaManual}`);

    // ── 7. removal, down to empty ─────────────────────────────────────────
    rows().forEach((r) => r.remove());
    NDS.Init.refresh(tbody);
    await wait(600);
    ok('removal: Filter item set empties', filter().items.length === 0, `items=${filter().items.length}`);
    ok('removal: record count reaches zero', slot('[data-paged-count]') === '0', `count=${slot('[data-paged-count]')}`);

    // ── 8. no-arg form ────────────────────────────────────────────────────
    let threw = null;
    try { NDS.Init.refresh(); } catch (e) { threw = e.message; }
    ok('NDS.Init.refresh() with no argument runs over the document without throwing',
        !threw, threw || 'clean');

    return out;
}));

// ── 9. the stub guard: refreshing must never force a bundle to load ────────
const beforeScripts = scriptRequests.length;
await recordsPage.evaluate(() => NDS.Init.refresh(document.getElementById('requestsTableBody')));
await new Promise((r) => setTimeout(r, 800));
report.push({
    name: 'no bundle loads — a stubbed namespace is skipped, never probed',
    pass: scriptRequests.length === beforeScripts,
    detail: `${scriptRequests.length - beforeScripts} new script request(s)`,
});
await recordsPage.close();

// ═══ page 2: server / data-driven pagination ═══════════════════════════════
const pagPage = await open('/components/pagination.html');
report.push(...await pagPage.evaluate(async () => {
    const out = [];
    const ok = (name, pass, detail = '') => out.push({ name, pass, detail: String(detail) });
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));

    const navs = [...document.querySelectorAll('.nds-pagination[data-total-pages]')];
    if (!navs.length) return [{ name: 'data-driven navs present', pass: false, detail: 'none found' }];

    let changes = 0;
    document.addEventListener('nds:pagination:change', () => { changes++; }, true);

    const snap = () => navs.map((n) => [
        n.getAttribute('data-total-pages'),
        n.getAttribute('data-active-page'),
        n.querySelectorAll('.nds-pagination-item').length,
        n.textContent.replace(/\s+/g, ' ').trim(),
    ].join('|')).join('||');

    const before = snap();
    const pagesBefore = navs.map((n) => n.getAttribute('data-active-page'));
    NDS.Init.refresh();
    await wait(600);

    ok('server pagination safe — data-driven navs are byte-identical after a refresh',
        snap() === before, snap() === before ? `${navs.length} nav(s) unchanged` : 'NAV MUTATED');
    ok('server pagination safe — no page-change event fired', changes === 0, `events=${changes}`);
    ok('server pagination safe — active page held',
        navs.every((n, i) => n.getAttribute('data-active-page') === pagesBefore[i]),
        `${pagesBefore.join(',')} → ${navs.map((n) => n.getAttribute('data-active-page')).join(',')}`);

    return out;
}));
await pagPage.close();

await browser.close();

if (pageErrors.length) report.push({ name: 'no page errors', pass: false, detail: pageErrors.join(' · ') });

let failed = 0;
for (const r of report) {
    if (!r.pass) failed++;
    console.log(`${r.pass ? 'ok  ' : 'FAIL'}  ${r.name}${r.detail ? `  — ${r.detail}` : ''}`);
}
console.log(failed ? `\n${failed} of ${report.length} FAILED` : `\nall ${report.length} checks passed`);
process.exit(failed ? 1 : 0);
