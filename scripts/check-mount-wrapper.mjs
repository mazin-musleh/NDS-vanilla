// Does a wrapper element between <body> and the page content conflict with NDS's CSS?
//
// A framework mounts into a box of its own (`<div id="root">`), so every NDS chrome
// region ends up one level deeper than the shell ships it. This measures a real page
// before and after that wrapper is introduced, on the properties the shell owns:
// chrome width, content width, section width, side-menu visibility, striping parity,
// and the sticky footer. Anything that moves is a conflict; anything that does not is
// proof the shell tolerates the wrapper.
//
// Two content lengths, because they fail differently: a LONG page (content taller than
// the viewport) and a SHORT page (one section), where the body flex chain is the only
// thing holding the footer down.
//
//   node scripts/check-mount-wrapper.mjs [baseUrl]
// Defaults to the dev server. Start it with `bundle exec jekyll serve` if it is down.
import puppeteer from 'puppeteer-core';
import { existsSync } from 'node:fs';

const BASE = (process.argv[2] || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');
const CHROME = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
].find((p) => p && existsSync(p));

// A side menu turns striping off, so the striped case needs a page without one.
const PAGES = [
    ['side menu', '/layout/page-shell.html'],
    ['console (full width)', '/examples/manage-records.html'],
    ['striped, no side menu', '/examples/services-list.html'],
    // The minimal shape centers on its OWN min-height, not on the body chain — the one
    // shape that should be immune, which is worth proving rather than assuming.
    ['minimal (sign-in)', '/examples/sign-in.html'],
];

const probe = await fetch(`${BASE}${PAGES[0][1]}`).catch(() => null);
if (!probe?.ok) {
    console.error(`cannot reach ${BASE} — is the dev server up? (bundle exec jekyll serve)`);
    process.exit(2);
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const rows = [];
const consoleErrors = [];

// Everything the shell positions or sizes. Rounded: sub-pixel noise is not a conflict.
const MEASURE = () => {
    const r = (el) => (el ? el.getBoundingClientRect() : null);
    const px = (n) => (n === null || n === undefined ? null : Math.round(n));
    const bg = (el) => (el ? getComputedStyle(el).backgroundColor : null);
    const footer = document.querySelector('.nds-footer');
    const main = document.querySelector('main');
    // Descendant, not direct child: the inner-wrapper case moves them one level down,
    // and a metric that stops finding them cannot compare anything.
    const sections = [...document.querySelectorAll('.nds-main-content .nds-content-section')];
    const aside = document.querySelector('aside.nds-sidemenu');
    return {
        topbarW: px(r(document.querySelector('.nds-topbar'))?.width),
        mainW: px(r(main)?.width),
        contentW: px(r(document.querySelector('.nds-main-content'))?.width),
        // The minimal shape centers on the layout's own min-height, so its box position
        // is the metric that would move if the wrapper reached it.
        layoutTop: px(r(document.querySelector('.nds-content-layout'))?.top),
        layoutH: px(r(document.querySelector('.nds-content-layout'))?.height),
        section0W: px(r(sections[0])?.width),
        section1W: px(r(sections[1])?.width),
        asideW: px(r(aside)?.width) ?? 0,
        asideShown: aside ? getComputedStyle(aside).display !== 'none' : null,
        // Striping is parity-driven, so the first two backgrounds prove the sequence.
        stripe0: bg(sections[0]),
        stripe1: bg(sections[1]),
        // The sticky footer: its bottom edge against the viewport when the page is short.
        footerBottom: px(r(footer)?.bottom),
        viewportH: window.innerHeight,
        docH: px(document.documentElement.scrollHeight),
    };
};

// Two wrapper positions, because a framework produces both. MOUNT is the mount root:
// every body child moves one level down, which is what `<div id="root">` does. INNER is
// the single-root component reflex: the page's sections come back wrapped in a plain
// div inside .nds-main-content.
const WRAP = (where) => {
    const root = document.createElement('div');
    root.id = 'root';
    const host = where === 'inner' ? document.querySelector('.nds-main-content')
        : where === 'layout' ? document.querySelector('.nds-content-layout')
            : document.body;
    if (!host) return false;
    while (host.firstChild) root.appendChild(host.firstChild);
    host.appendChild(root);
    return true;
};

// The two remedies the doc offers for a mount root. Applied AFTER the wrapper exists,
// which is the order a real project has them in, and measured against the same baseline
// as the unfixed run — a remedy that only half-restores the shell is not a remedy.
const FIX = (kind) => {
    if (kind === 'none') return;
    const style = document.createElement('style');
    style.textContent = kind === 'contents'
        ? '#root { display: contents; }'
        : '#root { flex: 1; display: flex; flex-direction: column; }';
    document.head.appendChild(style);
};

// Strip the page down to one small section and drop the hero, so the content is
// genuinely shorter than the viewport — the only state where the body flex chain is
// what holds the footer at the bottom. Paired with a tall viewport below.
const SHORTEN = () => {
    document.querySelectorAll('.nds-hero-section').forEach((h) => h.remove());
    document.querySelectorAll('.nds-main-content > *').forEach((s, i) => {
        if (i > 0) s.remove();
    });
    const first = document.querySelector('.nds-main-content > *');
    if (first) first.innerHTML = '<div class="nds-section-wrapper"><p>short page</p></div>';
};

// mount×long and mount×short answer the asked question; inner×long checks the second
// wrapper position the same finding raised, on the shapes where it can show.
const RUNS = PAGES.flatMap(([label, path]) => [
    ...['none', 'contents', 'flex'].flatMap((fix) => [
        { label, path, where: 'mount', short: false, fix },
        { label, path, where: 'mount', short: true, fix },
    ]),
    { label, path, where: 'inner', short: false, fix: 'none' },
    { label, path, where: 'layout', short: false, fix: 'none' },
]);

for (const { label, path, where, short, fix } of RUNS) {
    const page = await browser.newPage();
    page.on('pageerror', (e) => consoleErrors.push(`${label}: ${e.message}`));
    // Tall viewport for the short runs: the footer must be held by the flex chain,
    // not by content that happens to overflow.
    await page.setViewport({ width: 1400, height: short ? 2000 : 900 });
    await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 900));

    if (short) await page.evaluate(SHORTEN);
    const before = await page.evaluate(MEASURE);
    const wrapped = await page.evaluate(WRAP, where);
    await page.evaluate(FIX, fix);
    await new Promise((r) => setTimeout(r, 400));
    const after = await page.evaluate(MEASURE);

    const POS = { inner: 'wrapper inside main-content', layout: 'wrapper inside content-layout', mount: 'mount root' };
    const FIXNAME = { none: 'no fix', contents: 'fix: display:contents', flex: 'fix: flex pass-through' };
    const name = `${label} — ${POS[where]}${short ? ', short page' : ''} — ${FIXNAME[fix]}`;
    rows.push({ label: name, before, after, wrapped, short, fix });
    await page.close();
}
await browser.close();

let conflicts = 0;
for (const { label, before, after, wrapped } of rows) {
    console.log(`\n── ${label} ──`);
    if (!wrapped) {
        console.log('SKIP     no host element on this page — case does not apply');
        continue;
    }
    for (const key of Object.keys(before)) {
        if (key === 'viewportH') continue;
        const same = String(before[key]) === String(after[key]);
        if (!same) conflicts++;
        console.log(`${same ? 'SAME    ' : 'CHANGED '} ${key.padEnd(13)} ${before[key]} → ${after[key]}`);
    }
    // The footer is only held by the flex chain when the content is shorter than the
    // viewport; a taller page pushes it down on its own and proves nothing. The minimal
    // shape ships no footer at all, so there is nothing to hold.
    if (before.footerBottom !== null && before.docH <= before.viewportH + 1) {
        const pinned = after.footerBottom >= after.viewportH - 1;
        console.log(`${pinned ? 'OK      ' : 'BROKEN  '} footer pinned to the viewport bottom after wrapping`);
        if (!pinned) conflicts++;
    }
}
console.log(`\n${conflicts === 0 ? 'no conflicts' : `${conflicts} changed value(s)`}`);
if (consoleErrors.length) console.log(`page errors:\n  ${consoleErrors.join('\n  ')}`);
