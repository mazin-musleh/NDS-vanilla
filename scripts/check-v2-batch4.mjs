// v2 consistency, batch 4 (plans/v2-consistency.md): the attribute renames. Each part is checked by
// what it does. Where the page ships the attribute, the page's own markup is used; a fixture writes
// the name of the build under test (--new), so the run passes on the old build and the new.
//
//   node scripts/check-v2-batch4.mjs [baseUrl] [--new]
//
// --new: fixtures use the v2 names, and the audit and the loader must name every old spelling.
import { launch, log } from './lib/browser.mjs';

const BASE = (process.argv.find((a) => a.startsWith('http')) || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');
const NEW = process.argv.includes('--new');
const NAME = NEW
    ? { ac: 'data-display-field', fab: 'data-fab-side', dock: 'data-fab-dock-side', noAuto: 'data-no-auto-init', noAll: 'data-no-init-all', noCookies: 'data-cookies-no-auto-open' }
    : { ac: 'data-name', fab: 'data-fab-pos', dock: 'data-fab-dock-pos', noAuto: 'data-nds-auto-init="false"', noAll: 'data-nds-disable-all="true"', noCookies: 'data-cookies="false"' };
const browser = await launch();
let failed = 0;
const check = (ok, msg) => { if (!ok) failed++; log(`${ok ? 'pass' : 'FAIL'} ${msg}`); };

// htmlAttr: written on the page's <html> before any script runs.
async function open(path, { width = 1280, htmlAttr = '', ready = true } = {}) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    const warnings = [];
    page.on('console', (m) => { if (m.type() === 'warning') warnings.push(m.text()); });
    if (htmlAttr) {
        await page.route(`${BASE}/${path}`, async (route) => {
            const res = await route.fetch();
            await route.fulfill({ response: res, body: (await res.text()).replace(/<html([^>]*)>/, `<html$1 ${htmlAttr}>`) });
        });
    }
    await page.goto(`${BASE}/${path}`, { waitUntil: 'load' });
    if (ready) {
        await page.waitForFunction(() => document.documentElement.hasAttribute('data-nds-loaded'));
        await page.waitForTimeout(500);
        await page.evaluate(() => document.getElementById('nds-cookies-panel')?.remove());
    } else await page.waitForTimeout(1500);
    return { page, warnings };
}

const countStarted = (page) => page.evaluate(() => [...document.querySelectorAll('*')]
    .filter((el) => [...el.attributes].some((a) => /^data-.*initialized$/.test(a.name))).length);

// 2.7 Autocomplete: a field whose results name their text "Name" shows it in each row and writes it on a pick.
{
    const { page } = await open('components/autocomplete.html');
    await page.evaluate(async (attr) => {
        const box = document.createElement('div');
        box.innerHTML = document.querySelector('script[data-canon]').textContent
            .replace(/data-url="[^"]*"/, 'data-url="../docs-assets/data/saudi-cities.json"')
            .replace(/data-(?:name|display-field)="[^"]*"/, `${attr}="Name"`).replace(/data-min-chars="[^"]*"/, '');
        box.querySelector('input').id = 'b4-ac';
        document.querySelector('main').prepend(box);
        await NDS.init.mount(box);
    }, NAME.ac);
    await page.click('#b4-ac');
    await page.keyboard.type('Riy');
    await page.waitForTimeout(1000);
    const rows = await page.evaluate(() => [...document.querySelectorAll('[role=option]')].filter((o) => o.offsetWidth).map((o) => o.textContent.trim()));
    check(rows.length > 0 && rows.every(Boolean), `autocomplete: each row shows the result's name (${rows.slice(0, 3).join(', ') || 'no rows'})`);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    const value = await page.inputValue('#b4-ac');
    check(value && value === rows[0], `autocomplete: a pick writes the name into the field (${value})`);
    await page.context().close();
}

// 3.20 FAB: a FAB with its own side docks there; a FAB for an authored dock lands in that dock.
{
    const { page } = await open('components/fab.html');
    const r = await page.evaluate(async ({ fab, dock }) => {
        const box = document.createElement('div');
        box.innerHTML = `<button type="button" class="nds-btn nds-fab nds-primary nds-circle nds-icon-only" id="b4-left" ${fab}="left" aria-label="Left" hidden><i class="nds-icon nds-hgi-menu-01" aria-hidden="true"></i></button>`
            + `<div class="nds-fab-dock" id="b4-dock" ${dock}="bottom"></div>`
            + `<button type="button" class="nds-btn nds-fab nds-primary nds-circle nds-icon-only" id="b4-bottom" ${fab}="bottom" aria-label="Bottom" hidden><i class="nds-icon nds-hgi-menu-01" aria-hidden="true"></i></button>`;
        document.querySelector('main').append(box);
        document.body.append(box.querySelector('#b4-dock'));
        await NDS.init.mount(box);
        await new Promise((res) => setTimeout(res, 300));
        const left = document.getElementById('b4-left').getBoundingClientRect();
        const bottom = document.getElementById('b4-bottom');
        const b = bottom.getBoundingClientRect();
        return {
            left: Math.round(left.left), shown: left.width > 0,
            inDock: bottom.parentElement.id === 'b4-dock',
            bottomGap: Math.round(innerHeight - b.bottom), centre: Math.round(b.left + b.width / 2 - innerWidth / 2),
        };
    }, NAME);
    check(r.shown && r.left < 100, `fab: a FAB with side left docks on the left edge (x=${r.left})`);
    check(r.inDock, 'fab: a FAB with side bottom goes into the authored bottom dock');
    check(r.bottomGap < 100 && Math.abs(r.centre) < 60, `fab: the authored bottom dock sits at the bottom centre (gap ${r.bottomGap}, off-centre ${r.centre})`);
    await page.context().close();
}

// 3.9 Auto-init off: no component starts at load; initialize() starts them.
{
    const { page } = await open('components/tabs.html', { htmlAttr: NAME.noAuto, ready: false });
    const before = await countStarted(page);
    const after = await page.evaluate(async (attr) => {
        document.documentElement.removeAttribute(attr);
        await NDS.init.initialize();
        await new Promise((res) => setTimeout(res, 500));
    }, NAME.noAuto.split('=')[0]).then(() => countStarted(page));
    check(before === 0, `auto-init off: nothing starts at load (${before} started)`);
    check(after > 0, `auto-init off: initialize() starts the components (${after})`);
    await page.context().close();
}

// 3.9 Init-all off: initialize() starts no component.
{
    const { page } = await open('components/tabs.html', { htmlAttr: NAME.noAll, ready: false });
    await page.waitForTimeout(1000);
    const started = await countStarted(page);
    check(started === 0, `init-all off: no component starts (${started} started)`);
    await page.context().close();
}

// 3.9 Cookies: with the switch the notice stays shut; without it, it opens by itself.
for (const off of [true, false]) {
    const { page } = await open('components/tabs.html', { htmlAttr: off ? NAME.noCookies : '', ready: false });
    await page.waitForTimeout(8000);
    const shown = await page.evaluate(() => !!document.querySelector('#nds-cookies-panel[open]'));
    check(shown === !off, `cookies: ${off ? 'the switch keeps the notice shut' : 'with no switch the notice opens'} (${shown ? 'open' : 'shut'})`);
    await page.context().close();
}

// v2 only: the audit names every old spelling, the <html> switches included.
if (NEW) {
    const { page } = await open('components/fab.html', { htmlAttr: 'data-nds-auto-init="false" data-nds-disable-all="true"', ready: false });
    const found = await page.evaluate(async () => {
        const box = document.createElement('div');
        box.innerHTML = '<div class="nds-form-container" data-url="x.json" data-name="Name"><input class="nds-input"></div>'
            + '<input class="nds-input" data-name="voice-target">'
            + '<button class="nds-btn nds-fab" data-fab-pos="left" hidden></button><div class="nds-fab-dock" data-fab-dock-pos="left"></div>';
        document.body.append(box);
        const findings = await NDS.init.audit();
        return findings.filter((f) => /^migration/.test(f.rule)).map((f) => f.message).join('\n');
    });
    for (const name of ['data-name', 'data-fab-pos', 'data-fab-dock-pos', 'data-nds-auto-init', 'data-nds-disable-all']) {
        check(new RegExp(`(?<![\\w-])${name}(?![\\w-])`).test(found), `audit: names the old ${name}`);
    }
    check(!/data-name[^\n]*2 elements/.test(found), 'audit: a voice target\'s data-name is not flagged');
    await page.context().close();
}

await browser.close();
log(failed ? `${failed} failed` : 'all passed');
process.exit(failed ? 1 : 0);
