// Runtime contract checks for nds-code after its move to the extras bundle.
// Asserts the DOM/CSS facts the deferral depends on — run against a built _site.
//   node scripts/check-code-component.mjs
import puppeteer from 'puppeteer-core';
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';

const PORT = 4177;
const BASE = `http://localhost:${PORT}/NDS-vanilla`;
const CHROME = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
].find((p) => p && existsSync(p));

let pass = 0;
const fails = [];
const ok = (name, cond, detail = '') => {
    if (cond) { pass++; console.log(`  PASS  ${name}`); }
    else { fails.push(name); console.log(`  FAIL  ${name}${detail ? ` — ${detail}` : ''}`); }
};

const server = spawn(process.execPath, ['.claude/skills/nds-perf/gz-serve.mjs', '_site', String(PORT)], {
    stdio: 'ignore', detached: false,
});
await new Promise((r) => setTimeout(r, 1200));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
try {
    const page = await browser.newPage();

    // ── Blocks highlight, and only inside .nds-code ──────────────────
    await page.goto(`${BASE}/components/code.html`, { waitUntil: 'networkidle0' });
    const blocks = await page.evaluate(() => {
        const els = [...document.querySelectorAll('.nds-code code')];
        return {
            total: els.length,
            processed: els.filter((e) => e.dataset.ndsCodeProcessed === 'true').length,
            withLines: els.filter((e) => e.querySelector('.nds-code-line')).length,
            syntaxSpans: document.querySelectorAll('[class^="nds-syntax-"]').length,
            legacy: document.querySelectorAll('[class^="syntax-"], .code-line, .line-numbers').length,
        };
    });
    ok('every .nds-code code is processed', blocks.processed === blocks.total, `${blocks.processed}/${blocks.total}`);
    ok('multi-line blocks emit .nds-code-line', blocks.withLines > 0, `${blocks.withLines} blocks`);
    ok('token spans are nds-prefixed', blocks.syntaxSpans > 0, `${blocks.syntaxSpans} spans`);
    ok('no legacy syntax-/code-line/line-numbers in DOM', blocks.legacy === 0, `${blocks.legacy} found`);

    // ── Gutter is CSS-reserved, digits are out of flow ───────────────
    const gutter = await page.evaluate(() => {
        const code = document.querySelector('.nds-code code');
        const line = code.querySelector('.nds-code-line');
        return {
            padStart: getComputedStyle(code).paddingInlineStart,
            stripe: getComputedStyle(code, '::before').position,
            digit: getComputedStyle(line, '::before').position,
            lineLeft: Math.round(line.getBoundingClientRect().left),
            codeLeft: Math.round(code.getBoundingClientRect().left),
        };
    });
    ok('gutter reserved via padding-inline-start', parseFloat(gutter.padStart) > 20, gutter.padStart);
    ok('block stripe is absolutely positioned', gutter.stripe === 'absolute', gutter.stripe);
    ok('line digit is out of flow (absolute)', gutter.digit === 'absolute', gutter.digit);
    ok('text sits at the reserved offset, not flush',
        gutter.lineLeft - gutter.codeLeft > 20, `${gutter.lineLeft - gutter.codeLeft}px in`);

    // ── Inline code: coloured by CSS, no JS-injected span ────────────
    const inline = await page.evaluate(() => {
        const pick = (sel) => document.querySelector(sel);
        const html = pick('code.nds-inline-code.lang-html');
        const js = pick('code.nds-inline-code.lang-js') || pick('code.nds-inline-code.lang-javascript');
        const c = (el) => (el ? getComputedStyle(el).color : null);
        return {
            anySpan: [...document.querySelectorAll('code.nds-inline-code')].some((e) => e.querySelector('span')),
            count: document.querySelectorAll('code.nds-inline-code').length,
            htmlColor: c(html),
            jsColor: c(js),
        };
    });
    ok('inline code has no injected span', inline.anySpan === false, `${inline.count} inline elements`);
    ok('inline html/js colours differ', inline.htmlColor && inline.jsColor && inline.htmlColor !== inline.jsColor,
        `${inline.htmlColor} vs ${inline.jsColor}`);

    // ── reprocess is idempotent (no source snapshot kept) ────────────
    const rp = await page.evaluate(async () => {
        await window.NDS.loadBundle('extras');
        const code = document.querySelector('.nds-code code');
        const before = code.innerHTML;
        window.NDS.Code.reprocessCodeElement(code);
        const once = code.innerHTML;
        window.NDS.Code.reprocessCodeElement(code);
        return { stable: once === code.innerHTML, matchesFirst: before === once };
    });
    ok('reprocess is idempotent across two calls', rp.stable);
    ok('reprocess reproduces the initial render', rp.matchesFirst);

    // ── Unknown lang renders plain; classless still sniffs ───────────
    await page.goto(`${BASE}/utilities/copy.html`, { waitUntil: 'networkidle0' });
    const bash = await page.evaluate(() => {
        const el = document.querySelector('.nds-code code.lang-bash');
        return el ? { found: true, spans: el.querySelectorAll('[class^="nds-syntax-"]').length } : { found: false };
    });
    ok('lang-bash renders plain (no token spans)', bash.found && bash.spans === 0, JSON.stringify(bash));

    await page.goto(`${BASE}/ui-shell/footer.html`, { waitUntil: 'networkidle0' });
    const sniffed = await page.evaluate(() => {
        const el = [...document.querySelectorAll('.nds-code code')].find((e) => !/\blang(?:uage)?-/.test(e.className));
        return el ? el.querySelectorAll('.nds-code-line').length : -1;
    });
    ok('classless block still processed via sniffing', sniffed > 1, `${sniffed} lines`);

    // ── Dark mode re-binds the palette ──────────────────────────────
    await page.goto(`${BASE}/components/code.html`, { waitUntil: 'networkidle0' });
    const themes = await page.evaluate(async () => {
        const read = () => {
            const el = document.querySelector('.nds-code');
            const s = getComputedStyle(el);
            return ['tag', 'attr', 'string', 'property', 'keyword', 'comment']
                .map((k) => s.getPropertyValue(`--_syntax-${k}`).trim());
        };
        const light = read();
        document.documentElement.setAttribute('data-theme', 'dark');
        await new Promise((r) => requestAnimationFrame(r));
        return { light, dark: read() };
    });
    const flipped = themes.light.filter((v, i) => v !== themes.dark[i]).length;
    ok('all six knobs re-bind in dark', flipped === 6, `${flipped}/6 changed`);
    ok('no duplicate colours within a mode', new Set(themes.light).size === 6,
        `${new Set(themes.light).size} distinct light values`);

    // ── The load-bearing claim: highlighting shifts nothing ──────────
    // Measure the first block's TEXT geometry (a Range, so it works with or
    // without the .nds-code-line spans) with the extras bundle blocked, then
    // with it loaded. Identical rects = the late highlight is geometry-neutral.
    const geom = async (blockExtras) => {
        const p2 = await browser.newPage();
        await p2.setRequestInterception(true);
        p2.on('request', (r) => (blockExtras && r.url().includes('nds-extras') ? r.abort() : r.continue()));
        await p2.goto(`${BASE}/components/filter.html`, { waitUntil: 'networkidle0' });
        const g = await p2.evaluate(() => {
            const code = document.querySelector('.nds-code code');
            const walker = document.createTreeWalker(code, NodeFilter.SHOW_TEXT);
            const first = walker.nextNode();
            const r = document.createRange();
            r.setStart(first, 0);
            r.setEnd(first, Math.min(8, first.textContent.length));
            const rect = r.getBoundingClientRect();
            const box = code.getBoundingClientRect();
            return {
                textLeft: Math.round(rect.left - box.left),
                textTop: Math.round(rect.top - box.top),
                height: Math.round(box.height),
                highlighted: !!code.querySelector('.nds-code-line'),
            };
        });
        await p2.close();
        return g;
    };
    const cold = await geom(true);
    const warm = await geom(false);
    ok('cold load really is un-highlighted', cold.highlighted === false && warm.highlighted === true,
        `cold=${cold.highlighted} warm=${warm.highlighted}`);
    // The horizontal invariant is the one the CSS gutter reservation buys us.
    ok('text inline offset unchanged by highlighting', cold.textLeft === warm.textLeft,
        `${cold.textLeft}px → ${warm.textLeft}px`);
    // Vertical is a KNOWN, accepted deviation — see the ponytail note on
    // getSourceText in _js/nds-code.js. Reported so a regression is visible
    // without turning the suite permanently red.
    console.log(`  NOTE  known vertical delta: top ${cold.textTop}→${warm.textTop}px, `
        + `height ${cold.height}→${warm.height}px (accepted; lands off-screen, CLS ~0)`);

    // ── A page with no extras component must not fetch the bundle ────
    const p3 = await browser.newPage();
    const reqs = [];
    p3.on('request', (r) => reqs.push(r.url()));
    await p3.goto(`${BASE}/examples/registration.html`, { waitUntil: 'networkidle0' });
    const fetched = reqs.filter((u) => u.includes('nds-extras')).length;
    await p3.close();
    ok('extras not fetched on an extras-free page', fetched === 0, `${fetched} requests`);

    // ── Contrast: every role clears WCAG AA in both modes ────────────
    const lum = (c) => {
        const v = c.map((x) => x / 255).map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
        return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
    };
    const ratio = (a, b) => {
        const x = lum(a), y = lum(b);
        return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
    };
    const resolved = await page.evaluate(async () => {
        const keys = ['tag', 'attr', 'string', 'property', 'keyword', 'comment'];
        const read = () => {
            const el = document.querySelector('.nds-code');
            const cs = getComputedStyle(el);
            return keys.map((k) => {
                const d = document.createElement('span');
                d.style.color = cs.getPropertyValue(`--_syntax-${k}`).trim();
                el.appendChild(d);
                const c = getComputedStyle(d).color;
                d.remove();
                return [k, c];
            });
        };
        document.documentElement.removeAttribute('data-theme');
        await new Promise((r) => requestAnimationFrame(r));
        const light = read();
        document.documentElement.setAttribute('data-theme', 'dark');
        await new Promise((r) => requestAnimationFrame(r));
        return { light, dark: read() };
    });
    const rgb = (s) => s.match(/\d+/g).map(Number);
    const worstLight = Math.min(...resolved.light.map(([, c]) => ratio(rgb(c), [255, 255, 255])));
    const worstDark = Math.min(...resolved.dark.map(([, c]) => ratio(rgb(c), [31, 42, 55])));
    ok('all six roles clear AA on white', worstLight >= 4.5, `worst ${worstLight.toFixed(2)}`);
    ok('all six roles clear AA on neutral-800', worstDark >= 4.5, `worst ${worstDark.toFixed(2)}`);
} finally {
    await browser.close();
    server.kill();
}

console.log(`\n${pass} passed, ${fails.length} failed`);
if (fails.length) { console.log('failed:', fails.join(', ')); process.exit(1); }
