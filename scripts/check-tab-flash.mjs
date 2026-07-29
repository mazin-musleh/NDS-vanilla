// Does switching a code tab flash the expandable content at full height?
// Samples .nds-expandable-content height every frame across a tab switch.
//   node scripts/check-tab-flash.mjs [_site|/c/tmp/nds-base2/_site]
import puppeteer from 'puppeteer-core';
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';

const DIR = process.argv[2] || '_site';
const PORT = 4199;
const CHROME = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
].find((p) => p && existsSync(p));

const server = spawn(process.execPath, ['.claude/skills/nds-perf/gz-serve.mjs', DIR, String(PORT)], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 1200));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });
await page.goto(`http://localhost:${PORT}/NDS-vanilla/components/tokens.html`, { waitUntil: 'networkidle0' });
// let both injected bundles land and settle
await page.evaluate(() => Promise.all([window.NDS.loadBundle('delegated'), window.NDS.loadBundle('extras')]));
await new Promise((r) => setTimeout(r, 1500));

const result = await page.evaluate(async () => {
    const sample = async (content) => {
        const s = [];
        const t0 = performance.now();
        await new Promise((done) => {
            const tick = () => {
                s.push({ t: Math.round(performance.now() - t0), h: Math.round(content.getBoundingClientRect().height) });
                if (performance.now() - t0 < 350) requestAnimationFrame(tick);
                else done();
            };
            requestAnimationFrame(tick);
        });
        return s;
    };

    // Line count works while the panel is still hidden, so we can find the tall ones.
    const cands = [...document.querySelectorAll('.nds-code .nds-tab-list .nds-tab:not(.nds-show-more)')]
        .filter((t) => t.getAttribute('aria-selected') !== 'true')
        .map((t) => {
            const panel = document.getElementById(t.getAttribute('aria-controls'));
            const content = panel && panel.querySelector('.nds-expandable-content');
            const code = content && content.querySelector('code');
            return { t, content, lines: code ? (code.textContent.match(/\n/g) || []).length + 1 : 0 };
        })
        .filter((c) => c.content)
        .sort((a, b) => b.lines - a.lines);

    if (!cands.length) return { error: 'no inactive tab with expandable content' };

    const out = [];
    for (const c of cands.slice(0, 6)) {
        const inlineBefore = c.content.style.maxHeight;
        c.t.click();
        const samples = await sample(c.content);
        const hs = samples.map((x) => x.h);
        out.push({
            label: (c.t.textContent || '').trim().slice(0, 22),
            lines: c.lines,
            inlineBefore,
            inlineAfter: c.content.style.maxHeight,
            scrollHeight: c.content.scrollHeight,
            max: Math.max(...hs),
            settled: hs[hs.length - 1],
            head: samples.slice(0, 8).map((x) => `${x.t}ms:${x.h}`).join(' '),
        });
    }

    // Regression guard: a tall panel must still get a working Show-more button.
    const tall = cands[0];
    tall.t.click();
    await new Promise((r) => setTimeout(r, 250));
    const container = tall.content.closest('.nds-expandable');
    const btn = container.querySelector('.nds-expand-btn');
    const beforeExpand = Math.round(tall.content.getBoundingClientRect().height);
    if (btn) btn.click();
    await new Promise((r) => setTimeout(r, 350));
    const afterExpand = Math.round(tall.content.getBoundingClientRect().height);

    return {
        panels: out,
        expand: {
            hasState: container.getAttribute('data-state') || '(none)',
            btnFound: !!btn,
            btnVisible: btn ? getComputedStyle(btn).display !== 'none' : false,
            beforeExpand,
            afterExpand,
            grew: afterExpand > beforeExpand + 50,
        },
    };
});

await browser.close();
server.kill();

if (result.error) {
    console.log(`DIR ${DIR}: ${result.error}`);
    process.exit(0);
}
console.log(`DIR ${DIR}`);
for (const p of result.panels) {
    const over = p.max - p.settled;
    console.log(`  [${p.label}] ${p.lines} lines · scrollH ${p.scrollHeight}px · inline "${p.inlineBefore}"->"${p.inlineAfter}"`);
    console.log(`      max ${p.max} settled ${p.settled}  ${over > 50 ? `FLASH +${over}px` : 'no flash'}   ${p.head}`);
}
const worst = Math.max(...result.panels.map((p) => p.max - p.settled));
console.log(`  WORST OVERSHOOT: ${worst}px`);
const e = result.expand;
console.log(`  expand button: found=${e.btnFound} visible=${e.btnVisible} state="${e.hasState}"`);
console.log(`  expand works : ${e.beforeExpand}px -> ${e.afterExpand}px  ${e.grew ? 'OK' : 'FAILED'}`);
