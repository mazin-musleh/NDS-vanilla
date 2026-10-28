// Does a dropmenu land INSIDE the viewport, whatever container it sits in?
// Written against the 2026-08-22 placement work (TODO "date-picker calendar
// clipped off the viewport bottom") and moved to the top layer in 2026-10
// (plans/top-layer.md step 1). Each case below once produced a clipped menu:
//
//   TOP LAYER  the open menu is a popover in the top layer, still a DOM child of
//            its wrapper: nothing clips it, and closest(), bubbling and a dark
//            area reach it.
//   FLIP     NDS.popup.getSpace reserved the sticky nav's height off the TOP side for
//            a menu stacked ABOVE the nav (a modal is in the top layer, over
//            the nav). The up side measured ~120px smaller than it was, so
//            `spaceAbove > spaceBelow` came out false and a tall panel stayed
//            down and ran off the edge with room to spare above it.
//   CLAMP    a menu that fits NEITHER side used to overflow deliberately, on
//            the reasoning that page scroll reveals it. False for a fixed menu:
//            position:fixed carries the menu along with its trigger.
//   NAV      a page scroll carries the open menu over the sticky nav (the top
//            layer paints it there); it stays open, so a Filter keeps its ticks.
//
// The date picker is the probe because its calendar is the tallest menu in the
// system AND has no inner .nds-dropmenu-scroll, so it is the only component
// that exercises the whole-menu clamp branch. Fields are CLONES of the built
// date-picker page's own demo, so the harness cannot drift from canon.
//
//   node scripts/check-dropmenu-placement.mjs [baseUrl]
// Defaults to the dev server. Start it with `bundle exec jekyll serve` if down.
import { launch } from './lib/browser.mjs';

const BASE = (process.argv[2] || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');

const PAGE = `${BASE}/components/date-picker.html`;
const probe = await fetch(PAGE).catch(() => null);
if (!probe?.ok) {
    console.error(`cannot reach ${PAGE} — is the dev server up? (bundle exec jekyll serve)`);
    process.exit(2);
}

const browser = await launch();
const results = [];
const ok = (name, pass, detail = '') => {
    results.push({ name, pass });
    console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? `  — ${detail}` : ''}`);
};

// Build N canonical date fields inside a scrolling modal, open the modal, then
// open the picker on `row`. Returns everything the assertions need in one trip.
const inModal = async (page, { rows = 8, row = 3 } = {}) => page.evaluate(async ([rows, row]) => {
    document.getElementById('probe-modal')?.remove();
    const tpl = document.querySelector('.nds-form-container.nds-date-picker');
    const modal = document.createElement('dialog');
    modal.id = 'probe-modal';
    modal.className = 'nds-modal nds-card nds-stroke';
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
        clone.querySelectorAll('.nds-dropmenu-menu, .nds-date-picker-menu')
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
    // A field with a calendar button opens from the button only.
    (field.querySelector('.date-picker-toggle') || input).click();
    await new Promise((r) => setTimeout(r, 400));

    const control = field.querySelector('.nds-form-control');
    const menu = NDS.Dropmenu.getMenu(control);
    const r = menu.getBoundingClientRect();
    return {
        inTopLayer: menu.matches(':popover-open') && control.contains(menu),
        flippedUp: menu.getAttribute('data-position-vertical') === 'top',
        top: r.top, bottom: r.bottom, height: r.height,
        vh: window.innerHeight,
        scrolls: menu.scrollHeight > menu.clientHeight + 1,
        navBottom: document.querySelector('.nds-main-nav')?.getBoundingClientRect().bottom ?? 0,
    };
}, [rows, row]);

const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 900 });
await page.goto(PAGE, { waitUntil: 'networkidle' });
await page.waitForFunction('window.NDS?.DatePicker && window.NDS?.Modal');

// ── TOP LAYER ──────────────────────────────────────────────────────
// The modal's scrolling .nds-card-content clips anything in place: the menu
// must be in the top layer and still inside its field.
const m = await inModal(page, { row: 3 });
ok('modal: calendar opens in the top layer, still inside its field', m.inTopLayer);
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
await page.setViewportSize({ width: 1280, height: 560 });
const tight = await inModal(page, { row: 3 });
ok('short viewport: calendar stays inside the viewport',
    tight.top >= 0 && tight.bottom <= tight.vh,
    `top ${Math.round(tight.top)}, bottom ${Math.round(tight.bottom)}, vh ${tight.vh}`);
ok('short viewport: calendar scrolls instead of overflowing', tight.scrolls,
    `height ${Math.round(tight.height)}`);

// ── NESTED SUB-MENU ────────────────────────────────────────────────
// The month/year pickers live INSIDE the calendar menu. Opening one must not
// close the calendar; closing the calendar must close it too, or it stays in
// the top layer on its own.
await page.setViewportSize({ width: 1280, height: 900 });
await inModal(page, { row: 3 });
const nested = await page.evaluate(async () => {
    const control = document.querySelectorAll('#probe-modal .nds-form-control')[3];
    const menu = NDS.Dropmenu.getMenu(control);
    const subWrapper = menu.querySelector('.nds-dropmenu.nds-month-dropmenu');
    subWrapper.querySelector('.nds-dropmenu-trigger').click();
    await new Promise((r) => setTimeout(r, 300));
    const subMenu = NDS.Dropmenu.getMenu(subWrapper);
    const out = {
        calendarStillOpen: !menu.hasAttribute('hidden'),
        subOpen: !!subMenu && subMenu.matches(':popover-open'),
    };
    control.ndsDropmenu.close();
    await new Promise((r) => setTimeout(r, 500));
    out.subClosedWithIt = !subMenu.matches(':popover-open') && subMenu.hasAttribute('hidden');
    return out;
});
ok('calendar survives its own month picker opening', nested.calendarStillOpen);
ok('month sub-picker opens in the top layer', nested.subOpen);
ok('closing the calendar closes its month picker', nested.subClosedWithIt);

// ── PLAIN PAGE ─────────────────────────────────────────────────────
await page.reload({ waitUntil: 'networkidle' });
await page.waitForFunction('window.NDS?.DatePicker && window.NDS?.Modal');
const plain = await page.evaluate(async () => {
    const field = document.querySelector('.nds-form-container.nds-date-picker');
    const input = field.querySelector('.nds-date-input');
    input.scrollIntoView({ block: 'center' });
    await new Promise((r) => setTimeout(r, 100));
    // A field with a calendar button opens from the button only.
    (field.querySelector('.date-picker-toggle') || input).click();
    await new Promise((r) => setTimeout(r, 400));
    const control = field.querySelector('.nds-form-control');
    const menu = NDS.Dropmenu.getMenu(control);
    const r = menu.getBoundingClientRect();
    return { inPlace: control.contains(menu), inViewport: r.top >= 0 && r.bottom <= window.innerHeight };
});
ok('plain page: calendar stays inside its field', plain.inPlace);
ok('plain page: calendar is inside the viewport', plain.inViewport);

// ── TABLE WRAPPER, NAV, DARK AREA, BUBBLING ────────────────────────
const tablePage = await browser.newPage();
await tablePage.setViewportSize({ width: 1280, height: 900 });
await tablePage.goto(`${BASE}/components/dropmenu.html`, { waitUntil: 'networkidle' });
await tablePage.waitForFunction('window.NDS?.Dropmenu');
const table = await tablePage.evaluate(async () => {
    // The page shows no table: put the row-menu canon in a table wrapper, once
    // more in a dark area, both with a listener on the box around them.
    const canon = document.getElementById('dm-row')?.textContent;
    if (!canon) return { skip: true };
    const host = document.createElement('div');
    host.innerHTML = `<div class="nds-table-wrapper"><table class="nds-table"><tbody><tr><td>20481</td><td>${canon}</td></tr></tbody></table></div>`
        + `<div data-theme="dark" style="padding:16px">${canon}</div>`
        + '<div style="height:200vh"></div>';
    document.querySelector('main, .nds-content, body').append(host);
    await NDS.init.mount(host);
    let heard = 0;
    host.addEventListener('click', (e) => { if (e.target.closest('.nds-dropmenu-item')) heard++; });
    const [wrapper, darkWrapper] = host.querySelectorAll('.nds-dropmenu');
    const trigger = wrapper.querySelector('.nds-dropmenu-trigger');
    trigger.scrollIntoView({ block: 'center' });
    await new Promise((r) => setTimeout(r, 150));
    trigger.click();
    await new Promise((r) => setTimeout(r, 300));
    const menu = NDS.Dropmenu.getMenu(wrapper);
    const r = menu.getBoundingClientRect();
    const out = {
        inTopLayer: menu.matches(':popover-open') && wrapper.contains(menu),
        inViewport: r.top >= 0 && r.bottom <= window.innerHeight,
    };
    // Page scroll carries the absolute menu: the gap holds and no script rewrote its top.
    const gapOf = () => menu.getBoundingClientRect().top - trigger.getBoundingClientRect().bottom;
    const g0 = gapOf(), top0 = menu.style.top;
    scrollBy({ top: 40, behavior: 'instant' });
    await new Promise((r) => setTimeout(r, 150));
    out.carried = { held: Math.abs(gapOf() - g0) < 1, untouched: menu.style.top === top0 };
    // Scroll the menu up over the sticky nav: it stays open.
    const nav = document.querySelector('.nds-main-nav');
    // Twice: the topbar scrolls away on the first move, which moves the nav's bottom.
    for (let i = 0; i < 2; i++) {
        scrollBy({ top: menu.getBoundingClientRect().top - nav.getBoundingClientRect().bottom + 10, behavior: 'instant' });
        await new Promise((r) => setTimeout(r, 200));
    }
    await new Promise((r) => setTimeout(r, 400));
    out.navStays = menu.matches(':popover-open') && wrapper.ndsDropmenu.isOpen;
    wrapper.ndsDropmenu.close();
    await new Promise((r) => setTimeout(r, 400));
    trigger.scrollIntoView({ block: 'center' });
    await new Promise((r) => setTimeout(r, 150));
    trigger.click();
    await new Promise((r) => setTimeout(r, 300));
    menu.querySelector('.nds-dropmenu-item').click();
    await new Promise((r) => setTimeout(r, 400));
    out.heard = heard;
    // Dark area: the menu keeps the area's theme.
    const dTrigger = darkWrapper.querySelector('.nds-dropmenu-trigger');
    dTrigger.scrollIntoView({ block: 'center' });
    await new Promise((r) => setTimeout(r, 150));
    dTrigger.click();
    await new Promise((r) => setTimeout(r, 300));
    const darkBg = getComputedStyle(NDS.Dropmenu.getMenu(darkWrapper)).backgroundColor;
    out.darkDiffers = darkBg !== getComputedStyle(menu).backgroundColor;
    out.darkBg = darkBg;
    return out;
});
if (table.skip) {
    ok('table: row menu found', false, 'no dropmenu canon on the page');
} else {
    ok('table: row menu opens in the top layer, still in its row', table.inTopLayer);
    ok('table: row menu is inside the viewport', table.inViewport);
    ok('page scroll: the menu moves with its trigger, no script writes', table.carried.held && table.carried.untouched,
        JSON.stringify(table.carried));
    ok('nav: the menu stays open over the sticky nav', table.navStays);
    ok('bubbling: the box around the menu hears the item click', table.heard === 1, `heard ${table.heard}`);
    ok('dark area: the open menu stays dark', table.darkDiffers, table.darkBg);
}
await tablePage.close();

await browser.close();
const failed = results.filter((r) => !r.pass).length;
console.log(`
${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
