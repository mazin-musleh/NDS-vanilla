// Content that grows after load pushes the footer down, and pulls it back when it shrinks. The service template's content is swapped
// for the field report's shape (2026-11-04): one Side Info section, an Expandable of references,
// an aside of two cards. Show more grows the section ~3x; Chrome once kept the stretched
// .nds-content at its load height (sections are inline-size containers), so the footer stayed under
// the old bottom. Also checks a one-section short page still fills down to the footer.
//
//   node scripts/check-footer-overrun.mjs [baseUrl]    CSS=<rules> adds a style (the old bug must fail:
//   CSS=".nds-content-layout .nds-content{align-self:auto!important;min-height:auto!important}")
import { launch, log, step, STEP_MS } from './lib/browser.mjs';

const BASE = (process.argv[2] || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');
const PAGE = '/templates/service-template.html';
const para = '<p dir="auto">The research group studies supply chains, logistics networks and the design of service systems for public agencies, with field work in three regions.</p>';
const refs = Array.from({ length: 60 }, (_, i) => `<li>Reference ${i}: A study of networks in public service delivery. Journal of Systems, 2024.</li>`).join('');
const person = '<div class="nds-persona"><div class="nds-avatar"><img src="../docs-assets/img/avatar2.webp" alt=""></div><div class="nds-persona-info"><span class="nds-persona-name">Noura Al-Qahtani</span><span class="nds-persona-role nds-truncate">Researcher</span></div></div>';
const TALL = `<section id="fixture" class="nds-content-section nds-sideinfo-section"><div class="nds-section-body">
<div class="nds-info-content">
  <div class="nds-section-wrapper nds-block">${para}${para}</div>
  <div class="nds-section-wrapper nds-block"><div class="nds-grid" style="--max-col:2;--min-col:1">${person.repeat(4)}</div></div>
  <div class="nds-section-wrapper nds-block"><div class="nds-expandable"><div class="nds-expandable-content nds-prose"><ul>${refs}</ul></div></div></div>
  <div class="nds-section-wrapper nds-block"><div class="nds-card nds-stroke"><div class="nds-card-content"><div class="nds-card-text"><span class="nds-card-title">Contact</span><p class="nds-card-description">Room 12, Building 4.</p></div></div></div></div>
</div>
<aside class="nds-sideinfo" aria-label="Info">
  <dl class="nds-definition-list nds-card nds-stroke nds-shadow"><div class="nds-definition-item"><dt><span class="nds-label">Rank</span></dt><dd>Associate Professor</dd></div></dl>
  <div class="nds-card nds-stroke nds-shadow"><div class="nds-drawer nds-divided nds-breakout"><ul class="nds-drawer-list"><li><a class="nds-drawer-item" href="#">One</a></li><li><a class="nds-drawer-item" href="#">Two</a></li></ul></div></div>
</aside></div></section>`;
const SHORT = '<section id="fixture" class="nds-content-section"><div class="nds-section-body"><p>Short.</p></div></section>';

let failed = 0;
const ok = (name, pass, detail) => { if (!pass) failed++; console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}  — ${detail}`); };

const browser = await step('launch Chrome', () => launch({ timeout: STEP_MS }));

async function open(section) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.route(`**${PAGE}`, async (route) => {
        const res = await route.fetch();
        let html = (await res.text()).replace(/(id="main-content">)[\s\S]*<\/section>(\s*<\/main>)/, `$1${section}$2`);
        if (!html.includes('id="fixture"')) throw new Error(`${PAGE}: no #main-content … </section></main> to swap`);
        if (process.env.CSS) html = html.replace('</head>', `<style>${process.env.CSS}</style></head>`);
        await route.fulfill({ response: res, body: html });
    });
    await step(`load ${PAGE}`, () => page.goto(BASE + PAGE, { waitUntil: 'load' }));
    await step('NDS.init.ready', () => page.evaluate(() => NDS.init.ready));
    return page;
}

// Bottoms of the section and .nds-content, the footer's top; once two frames agree.
const measure = (page) => page.evaluate(() => new Promise((done) => {
    const y = (s, edge) => Math.round(document.querySelector(s).getBoundingClientRect()[edge] + scrollY);
    const read = () => [y('#fixture', 'bottom'), y('.nds-content', 'bottom'), y('.nds-footer', 'top')];
    let last = '';
    const tick = () => { const r = read(); if (r.join() === last) done(r); else { last = r.join(); setTimeout(tick, 150); } };
    tick();
}));

const tall = await open(TALL);
const [before] = await measure(tall);
await step('click Show more', () => tall.locator('#fixture .nds-expandable button').first().click());
await step('section grows', () => tall.waitForFunction((h) => document.querySelector('#fixture').getBoundingClientRect().bottom + scrollY > h * 1.5, before));
const [section, content, footer] = await measure(tall);
ok('grown content pushes the footer', content >= section && footer >= content, `section ${before} → ${section}, .nds-content ${content}, footer ${footer}`);

// Read at once: another section's idle draw relayouts the column and hides a stale height.
await step('click Show less', () => tall.locator('#fixture .nds-expandable button').first().click());
const [s2, c2, f2] = await tall.evaluate(() => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(() => {
    const y = (s, edge) => Math.round(document.querySelector(s).getBoundingClientRect()[edge] + scrollY);
    done([y('#fixture', 'bottom'), y('.nds-content', 'bottom'), y('.nds-footer', 'top')]);
}))));
ok('shrunk content pulls the footer back', s2 === before && c2 === s2 && f2 === c2, `section ${section} → ${s2} (load ${before}), .nds-content ${c2}, footer ${f2}`);

const short = await open(SHORT);
const [s, c, f] = await measure(short);
ok('a short page fills to the footer', s === c && c === f, `section ${s}, .nds-content ${c}, footer ${f}`);

await browser.close();
log(failed ? `${failed} failed` : 'all passed');
process.exit(failed ? 1 : 0);
