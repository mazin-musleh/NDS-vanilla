// v2 consistency, batch 5 (plans/v2-consistency.md 3.23): Main Nav's menu triggers and Show More are
// buttons. Checked by what they do, through the nav the page ships, so the run passes on the old build
// (links) and the new (buttons). check-mainnav drives the mouse; this drives the keyboard and Show More.
//
//   node scripts/check-v2-batch5.mjs [baseUrl] [--new]      ENGINE=webkit for Safari
//
// --new: Space opens a menu too (a link takes only Enter), and each trigger is a <button type="button">.
import { launch, log } from './lib/browser.mjs';

const BASE = (process.argv.find((a) => a.startsWith('http')) || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');
const NEW = process.argv.includes('--new');
const browser = await launch();
let failed = 0;
const check = (ok, msg) => { if (!ok) failed++; log(`${ok ? 'pass' : 'FAIL'} ${msg}`); };
const TRIGGER = '.nds-nav-primary .nds-has-menu > .nds-nav-link';

async function open(path, width = 1280) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/${path}`, { waitUntil: 'load' });
    await page.waitForFunction(() => document.documentElement.hasAttribute('data-nds-loaded'));
    await page.waitForTimeout(500);
    await page.evaluate(() => document.getElementById('nds-cookies-panel')?.remove());
    return page;
}
const expanded = (page) => page.evaluate((sel) => document.querySelector(sel).getAttribute('aria-expanded'), TRIGGER);

// Keyboard: Enter opens a menu, Escape closes it and gives focus back to the trigger.
{
    const page = await open('components/button.html');
    await page.focus(TRIGGER);
    check(await page.evaluate((sel) => document.activeElement === document.querySelector(sel), TRIGGER), 'keyboard: a menu trigger takes focus');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(400);
    check(await expanded(page) === 'true', 'keyboard: Enter opens its menu');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
    check(await expanded(page) === 'false', 'keyboard: Escape closes it');
    check(await page.evaluate((sel) => document.activeElement === document.querySelector(sel), TRIGGER), 'keyboard: focus goes back to the trigger');
    if (NEW) {
        await page.keyboard.press(' ');
        await page.waitForTimeout(400);
        check(await expanded(page) === 'true', 'keyboard: Space opens it too');
        await page.keyboard.press('Escape');
        const tags = await page.evaluate(() => [...document.querySelectorAll('.nds-main-nav .nds-has-menu > .nds-nav-link, .nds-main-nav .nds-show-more > .nds-nav-link')]
            .filter((el) => !(el.tagName === 'BUTTON' && el.type === 'button')).map((el) => el.outerHTML.slice(0, 80)));
        check(!tags.length, `markup: every trigger is a <button type="button"> (${tags.join(' | ') || 'all'})`);
    }
    // A click leaves the URL and the scroll alone (the old href="#" relied on preventDefault).
    await page.evaluate(() => scrollTo(0, 300));
    // el.click(), not page.click(): Playwright would scroll the trigger into view first.
    await page.evaluate((sel) => document.querySelector(sel).click(), TRIGGER);
    await page.waitForTimeout(400);
    // The open menu locks the page scroll, so read it once the menu closes.
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
    const r = await page.evaluate(() => ({ hash: location.hash, y: Math.round(scrollY) }));
    check(r.hash === '' && r.y === 300, `click: the URL and the scroll stay (${JSON.stringify(r)})`);
    await page.context().close();
}

// Show More: on a bar too narrow for its links, the button scrolls them.
{
    let done = false;
    for (const width of [1100, 1000, 960]) {
        const page = await open('components/button.html', width);
        const r = await page.evaluate(async () => {
            const btn = document.querySelector('.nds-main-nav .nds-show-more > .nds-nav-link');
            const list = document.querySelector('.nds-main-nav .nds-nav-primary');
            if (!btn || !btn.offsetWidth || !list) return null;
            const before = list.scrollLeft;
            btn.click();
            await new Promise((res) => setTimeout(res, 600));
            return { before: Math.round(before), after: Math.round(list.scrollLeft), hash: location.hash };
        });
        await page.context().close();
        if (!r) continue;
        check(r.after !== r.before && r.hash === '', `show more at ${width}px: scrolls the links (${r.before} → ${r.after})`);
        done = true;
        break;
    }
    check(done, 'show more: found a width where it shows');
}

await browser.close();
log(failed ? `${failed} failed` : 'all passed');
process.exit(failed ? 1 : 0);
