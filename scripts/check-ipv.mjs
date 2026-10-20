// Image Popup Viewer: the namespace drives one private viewer, and data-ipv-gallery groups thumbnails.
//
//   API       no window global and no create(); open, close, next, prev, resetZoom,
//             toggleControls and destroy work, and open() rebuilds after destroy()
//   GALLERY   untagged thumbnails form one gallery; thumbnails tagged a, a, b page
//             through their own gallery only
//
//   node scripts/check-ipv.mjs [baseUrl]
// Defaults to the dev server. Start it with `bundle exec jekyll serve` if down.
import { launch } from './lib/browser.mjs';

const BASE = (process.argv[2] || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');
const browser = await launch();
let failed = 0;
const ok = (name, pass, detail = '') => {
    if (!pass) failed++;
    console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? `  — ${detail}` : ''}`);
};

const page = await browser.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.goto(`${BASE}/components/ipv.html`, { waitUntil: 'load' });
await page.addStyleTag({ content: '#nds-cookies-panel { display: none !important; }' });
await page.waitForFunction(() => window.NDS && NDS.init, null, { timeout: 30000 });
await page.evaluate(() => NDS.init.ready);
await page.waitForTimeout(1000);

const api = await page.evaluate(() => ({
    global: 'ndsIpv' in window || 'ndsIPV' in window,
    create: 'create' in NDS.Ipv,
    missing: ['open', 'close', 'next', 'prev', 'resetZoom', 'toggleControls', 'destroy'].filter((m) => typeof NDS.Ipv[m] !== 'function'),
}));
ok('no window global, no create()', !api.global && !api.create, JSON.stringify(api));
ok('namespace methods present', api.missing.length === 0, `missing: ${api.missing}`);

const counter = () => page.evaluate(() => document.getElementById('nds-ipv-image-counter')?.textContent.trim());
const active = () => page.evaluate(() => !!document.querySelector('#nds-ipv-popup-overlay.nds-ipv-active'));
const thumbs = page.locator('.nds-ipv-thumbnail:not(code *)');
ok('the demo has 3+ thumbnails', (await thumbs.count()) >= 3, String(await thumbs.count()));

// Untagged: one gallery across the page.
await thumbs.nth(0).scrollIntoViewIfNeeded();
await thumbs.nth(0).click();
await page.waitForTimeout(500);
ok('a click opens the viewer', await active());
ok('untagged thumbnails form one gallery', /^1 \/ ([3-9]|\d\d)$/.test(await counter()), await counter());
await page.evaluate(() => NDS.Ipv.next());
await page.waitForTimeout(300);
ok('next() moves on', /^2 \//.test(await counter()), await counter());
await page.evaluate(() => { NDS.Ipv.prev(); NDS.Ipv.resetZoom(); NDS.Ipv.toggleControls(); NDS.Ipv.toggleControls(); });
await page.waitForTimeout(300);
ok('prev(), resetZoom(), toggleControls()', /^1 \//.test(await counter()), await counter());
await page.evaluate(() => NDS.Ipv.close());
await page.waitForTimeout(500);
ok('close() closes', !(await active()));

// Two galleries: a, a, b.
await page.evaluate(() => {
    const t = [...document.querySelectorAll('.nds-ipv-thumbnail')].filter((e) => !e.closest('code'));
    t[0].dataset.ipvGallery = 'a'; t[1].dataset.ipvGallery = 'a'; t[2].dataset.ipvGallery = 'b';
});
await page.evaluate(() => NDS.Ipv.open([...document.querySelectorAll('.nds-ipv-thumbnail')].filter((e) => !e.closest('code'))[1]));
await page.waitForTimeout(500);
ok('gallery a: second of two', (await counter()) === '2 / 2', await counter());
await page.evaluate(() => NDS.Ipv.next());
await page.waitForTimeout(300);
ok('next() stays inside gallery a', /\/ 2$/.test(await counter()), await counter());
await page.evaluate(() => NDS.Ipv.close());
await page.waitForTimeout(500);
await thumbs.nth(2).click();
await page.waitForTimeout(500);
ok('gallery b: one image', (await counter()) === '1 / 1', await counter());
await page.evaluate(() => NDS.Ipv.close());
await page.waitForTimeout(500);

// destroy(), then open() builds a fresh viewer.
await page.evaluate(() => NDS.Ipv.destroy());
const gone = await page.evaluate(() => !document.getElementById('nds-ipv-popup-overlay'));
await page.evaluate(() => NDS.Ipv.open(document.querySelector('.nds-ipv-thumbnail:not(code *)')));
await page.waitForTimeout(500);
ok('destroy() removes the overlay; open() rebuilds it', gone && (await active()), `gone=${gone}`);
ok('no page errors', errors.length === 0, errors.join(' | '));

await browser.close();
console.log(failed ? `\n${failed} failed` : '\nall passed');
process.exit(failed ? 1 : 0);
