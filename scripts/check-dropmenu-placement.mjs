// Does a dropmenu land INSIDE the viewport, whatever container it sits in?
// Written against the 2026-08-22 placement work (TODO "date-picker calendar
// clipped off the viewport bottom"). Three separate defects met in that bug and
// each gets a case here, because each one alone still produces a clipped menu:
//
//   PORTAL   needsPortal() never looked at `overflow`, and shouldPortal was
//            frozen at construct time, so a menu built before its modal existed
//            could not re-evaluate. Now decided per open.
//   FLIP     flipPosition reserved the sticky nav's height off the TOP side for
//            a menu stacked ABOVE the nav (a modal is z-index 1101, the nav
//            1000). The up side measured ~120px smaller than it was, so
//            `spaceAbove > spaceBelow` came out false and a tall panel stayed
//            down and ran off the edge with room to spare above it.
//   CLAMP    a menu that fits NEITHER side used to overflow deliberately, on
//            the reasoning that page scroll reveals it. False once portaled:
//            position:fixed carries the menu along with its trigger.
//
// The date picker is the probe because its calendar is the tallest menu in the
// system AND has no inner .nds-dropmenu-scroll, so it is the only component
// that exercises the whole-menu clamp branch. Fields are CLONES of the built
// date-picker page's own demo, so the harness cannot drift from canon.
//
//   node scripts/check-dropmenu-placement.mjs [baseUrl]
// Defaults to the dev server. Start it with `bundle exec jekyll serve` if down.
import puppeteer from 'puppeteer-core';
import { existsSync } from 'node:fs';

const BASE = (process.argv[2] || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');
const CHROME = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
].find((p) => p && existsSync(p));

const PAGE = `${BASE}/components/date-picker.html`;
const probe = await fetch(PAGE).catch(() => null);
if (!probe?.ok) {
    console.error(`cannot reach ${PAGE} — is the dev server up? (bundle exec jekyll serve)`);
    process.exit(2);
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const results = [];
const ok = (name, pass, detail = '') => {
    results.push({ name, pass });
    console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? `  — ${detail}` : ''}`);
};

// Build N canonical date fields inside a scrolling modal, open the modal, then
// open the picker on `row`. Returns everything the assertions need in one trip.
const inModal = async (page, { rows = 8, row = 3 } = {}) => page.evaluate(async (rows, row) => {
    document.getElementById('probe-modal')?.remove();
    const tpl = document.querySelector('.nds-form-container.nds-date-picker');
    const modal = document.createElement('div');
    modal.id = 'probe-modal';
    modal.className = 'nds-modal nds-card nds-stroke';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-hidden', 'true');
    modal.hidden = true;
    modal.innerHTML = '<div class="nds-card-header"></div>'
        + '<div class="nds-card-content"></div>'
        + '<div class="nds-card-actions"></div>';
    const content = modal.querySelector('.nds-card-content');
    for (let i = 0; i < rows; i++) {
        const clone = tpl.cloneNode(true);
        clone.querySelectorAll('[id]').forEach((el) => { el.id = `probe-${i}-${el.id}`; });
        clone.querySelectorAll('label[for]').forEach((el) => { el.htmlFor = `probe-${i}-${el.htmlFor}`; });
        // A clone taken after the source picker has been opened carries its
        // init sentinels and dropmenu wiring; create() would bail and build no
        // menu. Strip every stamp and any lazily-built dropdown.
        clone.querySelectorAll('*').forEach((el) => {
            [...el.attributes].filter((a) => /^data-nds-.*-initialized$/.test(a.name))
                .forEach((a) => el.removeAttribute(a.name));
            el.classList.remove('nds-dropmenu');
            el.removeAttribute('data-dropmenu-no-click');
            el.removeAttribute('data-dropmenu-no-keys');
        });
        clone.querySelectorAll('.nds-dropmenu-menu, .nds-date-picker-dropdown')
            .forEach((el) => el.remove());
        content.appendChild(clone);
    }
    document.body.appendChild(modal);
    NDS.DatePicker.reinit();
    NDS.Modal.open('probe-modal');
    await new Promise((r) => setTimeout(r, 400));

    const field = content.children[row];
    const input = field.querySelector('.nds-date-input');
    input.scrollIntoView({ block: 'center' });
    await new Promise((r) => setTimeout(r, 100));
    input.click();
    await new Promise((r) => setTimeout(r, 400));

    const control = field.querySelector('.nds-form-control');
    const menu = NDS.Dropmenu.menuOf(control);
    const r = menu.getBoundingClientRect();
    return {
        portaled: menu.parentElement === document.body,
        flippedUp: menu.getAttribute('data-position-vertical') === 'top',
        top: r.top, bottom: r.bottom, height: r.height,
        vh: window.innerHeight,
        scrolls: menu.scrollHeight > menu.clientHeight + 1,
        navBottom: document.querySelector('.nds-main-nav')?.getBoundingClientRect().bottom ?? 0,
    };
}, rows, row);

const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });
await page.goto(PAGE, { waitUntil: 'networkidle2' });
await page.waitForFunction('window.NDS?.DatePicker && window.NDS?.Modal');

// ── PORTAL ─────────────────────────────────────────────────────────
// No data-portal anywhere: the modal's scrolling .nds-card-content and its
// transform are what the ancestor walk must notice.
const m = await inModal(page, { row: 3 });
ok('modal: calendar portals with no data-portal', m.portaled);
ok('modal: calendar is inside the viewport', m.top >= 0 && m.bottom <= m.vh,
    `top ${Math.round(m.top)}, bottom ${Math.round(m.bottom)}, vh ${m.vh}`);

// ── FLIP ───────────────────────────────────────────────────────────
// A field low in the modal has to flip. Before the respectNav fix the nav's
// ~120px was subtracted from the up side only, so this stayed down.
const low = await inModal(page, { row: 7 });
ok('modal: low field flips up instead of overflowing', low.flippedUp || low.bottom <= low.vh,
    `flippedUp ${low.flippedUp}, bottom ${Math.round(low.bottom)}, vh ${low.vh}`);
ok('modal: flip ignores the nav it paints over',
    !low.flippedUp || low.top >= 0,
    `top ${Math.round(low.top)}, navBottom ${Math.round(low.navBottom)}`);

// ── CLAMP ──────────────────────────────────────────────────────────
// Short viewport: the calendar fits neither side, so it must scroll rather
// than run off the edge. This is the branch only a scroll-region-less menu
// reaches.
await page.setViewport({ width: 1280, height: 560 });
const tight = await inModal(page, { row: 3 });
ok('short viewport: calendar stays inside the viewport',
    tight.top >= 0 && tight.bottom <= tight.vh,
    `top ${Math.round(tight.top)}, bottom ${Math.round(tight.bottom)}, vh ${tight.vh}`);
ok('short viewport: calendar scrolls instead of overflowing', tight.scrolls,
    `height ${Math.round(tight.height)}`);

// ── NESTED SUB-MENU ────────────────────────────────────────────────
// The month/year pickers live INSIDE the calendar menu, which now sits at
// <body>. A plain contains() check would read them as unrelated and close the
// calendar under them.
await page.setViewport({ width: 1280, height: 900 });
await inModal(page, { row: 3 });
const nested = await page.evaluate(async () => {
    const control = document.querySelectorAll('#probe-modal .nds-form-control')[3];
    const menu = NDS.Dropmenu.menuOf(control);
    const subWrapper = menu.querySelector('.nds-dropmenu.nds-month-dropmenu');
    subWrapper.querySelector('.nds-dropmenu-trigger').click();
    await new Promise((r) => setTimeout(r, 300));
    // menuOf, not querySelector: the sub-menu may portal out on its own.
    const subMenu = NDS.Dropmenu.menuOf(subWrapper);
    return {
        calendarStillOpen: !menu.hasAttribute('hidden'),
        subOpen: !!subMenu && !subMenu.hasAttribute('hidden'),
    };
});
ok('portaled calendar survives its own month picker opening', nested.calendarStillOpen);
ok('month sub-picker opens', nested.subOpen);

// ── NO CLIPPING ANCESTOR ───────────────────────────────────────────
// Nothing traps the page's own demo field, so it must NOT portal — the walk
// has to stay specific or every menu on every page reparents.
await page.reload({ waitUntil: 'networkidle2' });
await page.waitForFunction('window.NDS?.DatePicker && window.NDS?.Modal');
const plain = await page.evaluate(async () => {
    const field = document.querySelector('.nds-form-container.nds-date-picker');
    const input = field.querySelector('.nds-date-input');
    input.scrollIntoView({ block: 'center' });
    await new Promise((r) => setTimeout(r, 100));
    input.click();
    await new Promise((r) => setTimeout(r, 400));
    const control = field.querySelector('.nds-form-control');
    const menu = NDS.Dropmenu.menuOf(control);
    const r = menu.getBoundingClientRect();
    return {
        portaled: menu.parentElement === document.body,
        inViewport: r.top >= 0 && r.bottom <= window.innerHeight,
    };
});
ok('plain page: calendar stays in place', !plain.portaled);
ok('plain page: calendar is inside the viewport', plain.inViewport);

// ── TABLE WRAPPER ──────────────────────────────────────────────────
// .nds-table-wrapper sets `overflow-x: auto; overflow-y: visible`, and the
// spec computes that overflow-y to `auto` — which is why the vertical-axis
// check catches a table without testing overflow-x. Proven, not assumed.
const tablePage = await browser.newPage();
await tablePage.setViewport({ width: 1280, height: 900 });
await tablePage.goto(`${BASE}/components/dropmenu.html`, { waitUntil: 'networkidle2' });
await tablePage.waitForFunction('window.NDS?.Dropmenu');
const table = await tablePage.evaluate(async () => {
    const pair = [...document.querySelectorAll('.nds-table-wrapper')]
        .map((c) => [c, c.querySelector('.nds-dropmenu')]).find(([, w]) => w);
    if (!pair) return { skip: true };
    const [container, wrapper] = pair;
    const cs = getComputedStyle(container);
    wrapper.removeAttribute('data-portal');           // prove the auto path, not the attribute
    const trigger = wrapper.querySelector('.nds-dropmenu-trigger');
    trigger.scrollIntoView({ block: 'center' });
    await new Promise((r) => setTimeout(r, 150));
    trigger.click();
    await new Promise((r) => setTimeout(r, 300));
    const menu = NDS.Dropmenu.menuOf(wrapper);
    const r = menu.getBoundingClientRect();
    return {
        computed: `${cs.overflowX}/${cs.overflowY}`,
        portaled: menu.parentElement === document.body,
        inViewport: r.top >= 0 && r.bottom <= window.innerHeight,
    };
});
if (table.skip) {
    ok('table: row menu portals without the attribute', false, 'no dropmenu found in a table container');
} else {
    ok('table: row menu portals without the attribute', table.portaled,
        `container overflow ${table.computed}`);
    ok('table: row menu is inside the viewport', table.inViewport);
}
await tablePage.close();

// ── OPT-OUT ────────────────────────────────────────────────────────
// data-no-portal keeps the menu a descendant of the wrapper even inside the
// modal that would otherwise move it — the escape hatch for CSS and DOM walks
// scoped under the wrapper. It beats data-portal too.
await inModal(page, { row: 0 });                      // the reload above dropped the modal
const optOut = await page.evaluate(async () => {
    const control = document.querySelectorAll('#probe-modal .nds-form-control')[2];
    control.setAttribute('data-no-portal', '');
    control.setAttribute('data-portal', '');          // opt-out must still win
    const input = control.querySelector('.nds-date-input');
    input.click();
    await new Promise((r) => setTimeout(r, 400));
    const menu = NDS.Dropmenu.menuOf(control);
    return { stayed: menu.parentElement === control, portaled: control.ndsDropmenu.shouldPortal };
});
ok('data-no-portal keeps a clipped menu in place', optOut.stayed && !optOut.portaled);

// ── MANUAL OVERRIDE ────────────────────────────────────────────────
// data-portal still forces the move where no ancestor demands it, and the
// author's attribute survives a close (only the menu's mirror is removed).
const forced = await page.evaluate(async () => {
    const field = document.querySelectorAll('.nds-form-container.nds-date-picker')[1]
        || document.querySelector('.nds-form-container.nds-date-picker');
    const control = field.querySelector('.nds-form-control');
    control.setAttribute('data-portal', '');
    const input = field.querySelector('.nds-date-input');
    input.click();
    await new Promise((r) => setTimeout(r, 400));
    const menu = NDS.Dropmenu.menuOf(control);
    const portaled = menu.parentElement === document.body;
    input.click();
    await new Promise((r) => setTimeout(r, 500));
    return { portaled, wrapperKeptAttr: control.hasAttribute('data-portal') };
});
ok('data-portal still forces the move', forced.portaled);
ok('close leaves the author attribute on the wrapper', forced.wrapperKeptAttr);

await browser.close();
const failed = results.filter((r) => !r.pass).length;
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
