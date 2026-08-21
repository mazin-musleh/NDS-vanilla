// .nds-nav-actions paints an orphan border when every item is nds-PAB.
//
// Below the PAB breakpoint managePABPlacement() moves every .nds-PAB out to
// .nds-nav-minimal and leaves display:none placeholders behind. A container
// holding only placeholders has zero height, but .nds-nav-actions is a sticky
// flex row with a border-top and a background — so it still paints a stray line
// under the nav. Field-reported against 1.8.1 (rig 5 retest).
//
// The fix stamps data-nav-empty in nds-mainnav.js's checkNavComposition() and
// drops the row from layout. This drives the REAL path: a real 375px viewport,
// real PAB relocation, real stamp — no forced classes on the container.
//
//   node scripts/check-nav-actions-empty.mjs [baseUrl]
// Defaults to the dev server. Start it with `bundle exec jekyll serve` if down.
import puppeteer from 'puppeteer-core';
import { existsSync } from 'node:fs';

const BASE = (process.argv[2] || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');
const CHROME = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
].find((p) => p && existsSync(p));

const probe = await fetch(`${BASE}/`).catch(() => null);
if (!probe?.ok) {
    console.error(`cannot reach ${BASE} — is the dev server up? (bundle exec jekyll serve)`);
    process.exit(2);
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const page = await browser.newPage();
const pageErrors = [];
page.on('pageerror', (e) => pageErrors.push(e.message));
const MOBILE = { width: 375, height: 812, deviceScaleFactor: 2, isMobile: true, hasTouch: true };
await page.setViewport(MOBILE);

// Reproduce the REPORTED markup: every action item authored as nds-PAB. Stamped during
// parsing, so the bundle's own init sees them — the site's nav only marks a couple, and
// class-adding after init does not relocate (managePABPlacement runs off a mode change,
// and reinit() early-returns while the nav element is unchanged).
await page.evaluateOnNewDocument(() => {
    new MutationObserver(() => {
        document.querySelectorAll('.nds-nav-actions > li.nds-nav-item:not(.nds-PAB)')
            .forEach((li) => li.classList.add('nds-PAB'));
    }).observe(document, { childList: true, subtree: true });
});
await page.goto(`${BASE}/`, { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 400));


const result = await page.evaluate(async () => {
    const actions = document.querySelector('.nds-nav-actions');
    if (!actions) return { error: 'no .nds-nav-actions on the page' };

    const read = () => {
        const cs = getComputedStyle(actions);
        return {
            display: cs.display,
            borderTop: cs.borderTopWidth,
            height: Math.round(actions.getBoundingClientRect().height),
        };
    };

    const minimalAtLoad = document.body.classList.contains('nds-minimal');
    const itemsAtLoad = actions.querySelectorAll('[data-pab-ph]').length + actions.children.length;

    const realChildren = [...actions.children].filter(
        (c) => !c.hasAttribute('data-pab-ph') && !c.classList.contains('nds-show-more')
    ).length;
    const withFix = read();

    // Same DOM with the stamp removed = the pre-fix rendering.
    const stamped = actions.hasAttribute('data-nav-empty');
    actions.removeAttribute('data-nav-empty');
    const withoutFix = read();
    if (stamped) actions.setAttribute('data-nav-empty', '');

    return { minimalAtLoad, itemsAtLoad, relocated: itemsAtLoad - realChildren, realChildren, stamped, withFix, withoutFix };
});

await browser.close();

if (result.error) { console.error(result.error); process.exit(2); }

const pass =
    result.minimalAtLoad === true &&
    result.realChildren === 0 &&
    result.stamped === true &&
    result.withFix.display === 'none' &&
    result.withoutFix.display !== 'none' &&
    parseFloat(result.withoutFix.borderTop) > 0 &&
    pageErrors.length === 0;

console.log(`viewport            375x812, minimal mode: ${result.minimalAtLoad}`);
console.log(`items relocated     ${result.relocated}/${result.itemsAtLoad} (real children left: ${result.realChildren})`);
console.log(`data-nav-empty      ${result.stamped ? 'stamped' : 'MISSING'}`);
console.log(`without the stamp   display:${result.withoutFix.display} border-top:${result.withoutFix.borderTop} height:${result.withoutFix.height}px  <- the stray line`);
console.log(`with the stamp      display:${result.withFix.display}`);
if (pageErrors.length) console.log(`page errors         ${pageErrors.join(' | ')}`);
console.log(pass ? '\nPASS' : '\nFAIL');
process.exit(pass ? 0 : 1);
