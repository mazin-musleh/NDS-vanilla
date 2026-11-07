// Mounts an autoplay swiper and checks that it moves, waits and stops when it should, and fails on any miss.
//   node scripts/check-swiper-autoplay.mjs [baseUrl]
// Needs the dev server up. One line per case; exit 1 on a miss.
import { launch } from './lib/browser.mjs';

const BASE = (process.argv[2] || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');
const DELAY = 400;
const AUTO = `data-swiper-autoplay="${DELAY}" data-swiper-loop`;

const fixture = (attrs, classes = '', slides = 4) => `
<button id="before" type="button">before</button>
<div id="sw" class="nds-swiper ${classes}" ${attrs} style="--max-slides: 1; --mid-slides: 1; --min-slides: 1">
  <div class="nds-swiper-wrapper">
    ${Array.from({ length: slides }, (_, i) => `<div class="nds-swiper-slide"><div class="nds-card" style="height:120px">Slide ${i}</div></div>`).join('')}
  </div>
  <div class="nds-swiper-navigation" hidden>
    <div class="nds-swiper-buttons">
      <button type="button" class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-prev" aria-label="Previous slide"></button>
      <button type="button" class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-next" aria-label="Next slide"></button>
      <button type="button" class="nds-btn nds-secondary nds-icon-only nds-circle nds-md nds-progress nds-pause" aria-label="Pause slides">
        <i class="nds-icon nds-hgi-pause" aria-hidden="true"></i>
        <span class="nds-progress-circle" aria-hidden="true"><svg width="100%" height="100%" viewBox="0 0 24 24"><circle class="nds-progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="2"></circle><circle class="nds-progress-track" cx="12" cy="12" r="10" fill="none" stroke-width="2" stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round"></circle></svg></span>
      </button>
    </div>
    <div class="nds-swiper-pagination"></div>
  </div>
</div>
<div style="height:3000px"></div><p id="far">far</p>`;

const browser = await launch();
let failed = 0;
const check = (name, ok, detail = '') => {
    if (!ok) failed++;
    console.log(`${ok ? 'pass' : 'FAIL'}  ${name}${detail ? `  (${detail})` : ''}`);
};
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function open(attrs, { classes, slides, reduced, width = 1280 } = {}) {
    const page = await browser.newPage({ viewport: { width, height: 800 }, reducedMotion: reduced ? 'reduce' : 'no-preference' });
    await page.goto(`${BASE}/playground.html`, { waitUntil: 'load' });
    await page.evaluate(() => NDS.init.ready);
    await page.evaluate((html) => {
        const host = document.createElement('div');
        host.id = 'host';
        host.innerHTML = html;
        document.querySelector('main, .nds-content, body').prepend(host);
        NDS.init.mount(host);
    }, fixture(attrs, classes, slides));
    await page.waitForSelector('#sw[data-nds-swiper-initialized]', { state: 'attached' });
    await page.evaluate(() => {
        document.getElementById('sw').scrollIntoView({ block: 'center', behavior: 'instant' });
        window.__moves = 0;
        document.getElementById('sw').addEventListener('nds:swiper:change', () => window.__moves++);
    });
    await page.mouse.move(0, 0);
    return page;
}
const moves = (page) => page.evaluate(() => window.__moves);
// The first wait lets a smooth move under way finish: it fires change events as it crosses slides.
async function movesDuring(page, ms = DELAY * 3) {
    await wait(1200);
    const start = await moves(page);
    await wait(ms);
    return (await moves(page)) - start;
}

try {
    let page = await open(AUTO);
    check('moves by itself', (await movesDuring(page)) >= 2);

    // Hover
    await page.hover('#sw .nds-swiper-wrapper');
    check('hover holds it', (await movesDuring(page)) === 0);
    await page.mouse.move(0, 0);
    check('leaving starts it again', (await movesDuring(page)) >= 1);

    // Keyboard focus
    await page.focus('#before');
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => document.activeElement.id);
    check('Tab reaches the swiper', focused === 'sw', focused);
    check('keyboard focus holds it', (await movesDuring(page)) === 0);
    await page.focus('#before');
    check('focus leaving starts it again', (await movesDuring(page)) >= 1);

    // A mouse click must not stop the row after the pointer leaves.
    await page.click('#sw .nds-swiper-wrapper');
    await page.mouse.move(0, 0);
    check('a mouse click does not stop it', (await movesDuring(page)) >= 1);
    await page.focus('#before');

    // Off screen
    await page.evaluate(() => document.getElementById('far').scrollIntoView({ behavior: 'instant' }));
    check('off screen holds it', (await movesDuring(page)) === 0);
    await page.evaluate(() => document.getElementById('sw').scrollIntoView({ block: 'center', behavior: 'instant' }));
    check('back on screen starts it again', (await movesDuring(page)) >= 1);

    // The button
    const button = (prop) => page.$eval('#sw .nds-pause', (el, p) => el.getAttribute(p === 'state' ? 'data-state' : 'aria-pressed'), prop);
    check('button starts off', (await button('pressed')) === 'false' && !(await button('state')));
    const glyph = await page.$eval('#sw .nds-pause .nds-icon', (el) => {
        const s = getComputedStyle(el, '::before');
        return { w: parseFloat(s.width), mask: s.maskImage || s.webkitMaskImage };
    });
    check('pause button paints its icon', glyph.w > 0 && /svg/.test(glyph.mask), `${glyph.w}px`);
    await page.click('#sw .nds-pause');
    await page.mouse.move(0, 0);
    check('the button stops it', (await movesDuring(page)) === 0);
    check('the button reads on while paused', (await button('pressed')) === 'true' && !(await button('state')));
    const icon = () => page.$eval('#sw .nds-pause .nds-icon', (el) => getComputedStyle(el).getPropertyValue('--nds-icon'));
    const playIcon = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--nds-icon-play'));
    check('paused shows the play icon', (await icon()) === playIcon);
    await page.locator('#sw').screenshot({ path: 'tmp/swiper-autoplay/paused.png' });
    await page.click('#sw .nds-pause');
    await page.mouse.move(0, 0);
    check('the button starts it again', (await movesDuring(page)) >= 1);
    check('the button reads off again', (await button('pressed')) === 'false' && !(await button('state')));
    check('playing shows the pause icon', (await icon()) !== playIcon);
    await page.locator('#sw').screenshot({ path: 'tmp/swiper-autoplay/playing.png' });

    // Methods
    await page.evaluate(() => document.getElementById('sw').ndsSwiper.pause());
    check('pause() stops it', (await movesDuring(page)) === 0);
    await page.evaluate(() => document.getElementById('sw').ndsSwiper.play());
    check('play() starts it', (await movesDuring(page)) >= 1);

    // Destroy
    const after = await page.evaluate(async (delay) => {
        const el = document.getElementById('sw');
        const wrapper = el.querySelector('.nds-swiper-wrapper');
        NDS.Swiper.destroy(el);
        await new Promise((r) => setTimeout(r, 1200));
        const left = wrapper.scrollLeft;
        await new Promise((r) => setTimeout(r, delay * 3));
        return { same: wrapper.scrollLeft === left, instance: !!el.ndsSwiper };
    }, DELAY);
    check('destroy stops the timer', after.same && !after.instance);
    await page.close();

    // Reduced motion
    page = await open(AUTO, { reduced: true });
    check('reduced motion starts paused', (await movesDuring(page)) === 0);
    await page.evaluate(() => document.getElementById('sw').ndsSwiper.play());
    check('play() under reduced motion is the site\'s choice', (await movesDuring(page)) >= 1);
    await page.close();

    // Keeps going past the last slide, always forward.
    page = await open(AUTO);
    await wait(1200);
    const seen = await page.evaluate((delay) => new Promise((resolve) => {
        const list = [];
        document.getElementById('sw').addEventListener('nds:swiper:change', (e) => list.push(e.detail.index));
        setTimeout(() => resolve(list), delay * 10);
    }), DELAY);
    // A repeat is fine: the loop's silent jump onto the real slide fires change again.
    const wrapped = seen.includes(3) && seen.includes(0) && seen.every((v, i) => !i || v === seen[i - 1] || v === (seen[i - 1] + 1) % 4);
    check('a loop keeps moving forward', wrapped, seen.join(','));
    await page.close();

    // No loop, no autoplay.
    page = await open(`data-swiper-autoplay="${DELAY}"`);
    check('no loop does not move', (await movesDuring(page)) === 0);
    check('no loop hides the button', !(await page.isVisible('#sw .nds-pause')));
    await page.close();

    // The button is optional.
    page = await open(AUTO);
    await page.evaluate((html) => {
        const el = document.getElementById('sw');
        NDS.Swiper.destroy(el);
        el.querySelector('.nds-pause').remove();
        NDS.Swiper.create(el);
    });
    await page.mouse.move(0, 0);
    check('no button still moves', (await movesDuring(page)) >= 1);
    await page.close();

    // The ring and the wait, on a slower row so the reads are clear of the moves.
    page = await open('data-swiper-autoplay="3000" data-swiper-loop');
    const ring = () => page.$eval('#sw .nds-progress-track', (el) => {
        const a = el.getAnimations()[0];
        return a ? { state: a.playState, time: a.currentTime, duration: a.effect.getTiming().duration } : null;
    });
    await wait(1000);
    let r = await ring();
    check('ring runs for the wait', r?.state === 'running' && r.duration === 3000 && r.time > 500 && r.time < 2000, JSON.stringify(r));
    await page.hover('#sw .nds-swiper-wrapper');
    const held = await ring();
    await wait(700);
    r = await ring();
    check('hover stops the ring', held.state === 'paused' && r.state === 'paused' && r.time === held.time, `${held.time} -> ${r.time}`);
    await wait(2500);
    check('hover holds past the wait', (await moves(page)) === 0);
    const left = 3000 - r.time;
    await page.mouse.move(0, 0);
    await wait(150);
    r = await ring();
    check('leaving goes on from where it stopped', r.state === 'running' && Math.abs(r.time - held.time) < 500, `${held.time} -> ${r.time}`);
    await wait(left + 400);
    check('the move comes when the rest of the wait ends', (await moves(page)) >= 1, `${Math.round(left)} ms left`);
    await wait(400);
    r = await ring();
    check('the next wait starts a new ring', r.state === 'running' && r.time < 1500, JSON.stringify(r));
    await page.click('#sw .nds-pause');
    await page.mouse.move(0, 0);
    const pausedRing = await ring();
    await wait(700);
    r = await ring();
    check('the button stops the ring', r.state === 'paused' && r.time === pausedRing.time);
    await page.locator('#sw').screenshot({ path: 'tmp/swiper-autoplay/ring-paused.png' });
    await page.click('#sw .nds-pause');
    await page.mouse.move(0, 0);
    await wait(900);
    check('the button starts the ring', (await ring()).state === 'running');
    await page.locator('#sw').screenshot({ path: 'tmp/swiper-autoplay/ring-playing.png' });
    await page.close();

    // A spotlight loops by itself.
    page = await open(`data-swiper-autoplay="${DELAY}"`, { classes: 'nds-spotlight' });
    check('a spotlight moves with no loop attribute', (await movesDuring(page)) >= 1);
    await page.close();

    // Default delay
    page = await open('data-swiper-autoplay data-swiper-loop');
    check('no value waits the default', (await page.evaluate(() => document.getElementById('sw').ndsSwiper._autoplayDelay)) === 5000);
    await page.close();

    // One slide: nothing to move, nothing to stop.
    page = await open(AUTO, { slides: 1 });
    check('one slide does not move', (await movesDuring(page)) === 0);
    await page.close();

    // No attribute: the methods do nothing, and a plain swiper never moves.
    page = await open('data-swiper-loop');
    check('no attribute does not move', (await movesDuring(page)) === 0);
    check('no attribute hides the button', !(await page.isVisible('#sw .nds-pause')));
    await page.evaluate(() => document.getElementById('sw').ndsSwiper.play());
    check('play() with no attribute does nothing', (await movesDuring(page)) === 0);
    await page.close();

} finally {
    await browser.close();
}
console.log(failed ? `${failed} failed` : 'all passed');
process.exit(failed ? 1 : 0);
