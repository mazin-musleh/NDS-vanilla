// Does a hero swiper below the fold still page past slide 2?
//
// detectCurrentSlide caches its scroll step once, as
// |slides[1].offsetLeft - slides[0].offsetLeft|. A hero ships its non-first
// slides [hidden] (the lazy-reveal contract) and a display:none slide reports
// offsetLeft 0, so the cached step collapses to slides[0].offsetLeft — the
// wrapper's inline padding. That value is NONZERO, so the
// `_measuredStep || (offsetWidth + gap)` fallback never fires.
//
// The poisoner is the wrapper's ResizeObserver initial callback, which measures
// at init while a below-fold hero's slides are still hidden. Revealing them
// changes slide spacing but not the wrapper's own box, so the observer never
// re-fires and the bad step sticks. round(scrollPos / 32) then explodes, clamps
// to maxIndex, and the nav reads at-end one slide early — stuck at slide 2 of 3.
//
// An above-fold hero escapes: its IntersectionObserver fires at init and the rAF
// strips [hidden] BEFORE ResizeObserver notifications land in the same frame, so
// the init measurement sees visible slides. That asymmetry is case 3.
//
//   node scripts/check-swiper-hero-step.mjs [baseUrl] [--before <bundle.js>]
// --before swaps in another nds-delegated.min.js (e.g. the pre-fix one from
// `git show HEAD:assets/js/nds-delegated.min.js`) to prove the test can fail.
import puppeteer from 'puppeteer-core';
import { existsSync, readFileSync } from 'node:fs';

const argv = process.argv.slice(2);
const beforeIdx = argv.indexOf('--before');
const BEFORE = beforeIdx !== -1 ? argv[beforeIdx + 1] : null;
const BASE = (argv.find((a) => a.startsWith('http')) || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');
const CHROME = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
].find((p) => p && existsSync(p));

const probe = await fetch(`${BASE}/components/swiper.html`).catch(() => null);
if (!probe?.ok) {
    console.error(`cannot reach ${BASE} — is the dev server up? (bundle exec jekyll serve)`);
    process.exit(2);
}
const beforeBundle = BEFORE ? readFileSync(BEFORE, 'utf8') : null;

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const results = [];
const ok = (name, pass, detail = '') => {
    results.push({ name, pass });
    console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? `  — ${detail}` : ''}`);
};

const open = async (url) => {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    if (beforeBundle) {
        await page.setRequestInterception(true);
        page.on('request', (r) => r.url().includes('nds-delegated.min.js')
            ? r.respond({ status: 200, contentType: 'application/javascript', body: beforeBundle })
            : r.continue());
    }
    await page.goto(url, { waitUntil: 'networkidle0' });
    return page;
};

// Scroll the nth initialized swiper matching `sel` into view, let the reveal +
// any observers settle, then click next until it stops moving. Returns the
// at-end flag after EVERY click, so an early at-end is visible, not just a
// final tally.
const walk = (page, sel, nth) => page.evaluate(async (sel, nth) => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const el = document.querySelectorAll(`${sel}[data-nds-swiper-initialized]`)[nth];
    if (!el) return { error: `no initialized ${sel} at index ${nth}` };

    el.scrollIntoView({ block: 'center', behavior: 'instant' });
    await sleep(600); // IO one-shot + rAF reveal + ResizeObserver settle

    const next = el.querySelector('.nds-next');
    const slides = el.querySelectorAll('.nds-swiper-slide');
    const stillHidden = [...slides].filter((s) => s.hasAttribute('hidden')).length;

    const atEnd = [];
    const clicks = slides.length + 2; // over-click: a healthy swiper just parks at the end
    for (let i = 0; i < clicks; i++) {
        if (next.disabled) break;
        // The nav activates on pointerdown, not click (_attachActivation).
        next.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, pointerType: 'mouse', button: 0 }));
        await sleep(500); // smooth scroll + rafThrottled scroll handler
        atEnd.push(el.getAttribute('data-state')?.includes('at-end') ?? false);
    }
    const wrap = el.querySelector('.nds-swiper-wrapper');
    return {
        slideCount: slides.length, stillHidden, atEnd, clicksTaken: atEnd.length,
        // The invariant that holds for every swiper regardless of slidesPerView:
        // when it says at-end, it must actually BE at the end of its scroll range.
        scrolled: Math.round(Math.abs(wrap.scrollLeft)),
        maxScroll: Math.round(wrap.scrollWidth - wrap.clientWidth),
    };
}, sel, nth);

// A swiper is healthy when at-end appears ONLY on the final click AND that
// final position is the real end of the scroll range. The click count is not
// asserted: a hero pages one slide, a card deck pages slidesPerView, so a
// 2-slide hero and a 6-slide deck can both finish in one click. The scroll
// check is what catches the bug — a poisoned step reports at-end while the
// wrapper is still parked short of max scroll.
const healthy = (r) => !r.error
    && r.clicksTaken > 0
    && r.atEnd.slice(0, -1).every((v) => v === false)
    && r.atEnd.at(-1) === true
    && Math.abs(r.scrolled - r.maxScroll) <= Math.max(20, r.maxScroll * 0.02);

const fmt = (r) => r.error || `${r.slideCount} slides, ${r.clicksTaken} clicks, at-end=[${r.atEnd}], scroll ${r.scrolled}/${r.maxScroll}${r.stillHidden ? `, ${r.stillHidden} still hidden` : ''}`;

// --- case 1+2: below-fold heroes on the swiper doc page (the repro) ---
{
    const page = await open(`${BASE}/components/swiper.html`);
    const heroes = await page.$$eval('.nds-swiper.nds-hero[data-nds-swiper-initialized]', (els) => els.length);
    ok('swiper.html has initialized hero swipers to test', heroes >= 2, `found ${heroes}`);

    for (let i = 0; i < heroes; i++) {
        const r = await walk(page, '.nds-swiper.nds-hero', i);
        ok(`below-fold hero #${i} pages to the end`, healthy(r), fmt(r));
    }

    // --- case 4: non-hero swipers on the same page must be untouched ---
    const decks = await page.$$eval('.nds-swiper:not(.nds-hero)[data-nds-swiper-initialized]', (els) => els.length);
    for (let i = 0; i < Math.min(decks, 3); i++) {
        const r = await walk(page, '.nds-swiper:not(.nds-hero)', i);
        // A deck whose slides all fit has no nav to walk; skip those.
        if (r.clicksTaken === 0) continue;
        ok(`card deck #${i} pages to the end`, healthy(r), fmt(r));
    }
    await page.close();
}

// --- case 5: the actual repro ---
// Two conditions must meet, and the doc page's own heroes meet neither:
//   (a) the hero must INIT while off-screen, so the ResizeObserver's first
//       callback measures while the non-first slides are still [hidden];
//   (b) slides[0].offsetLeft must be NONZERO, i.e. the wrapper carries inline
//       padding. With no padding the step measures 0 — falsy — and the
//       `|| offsetWidth + gap` fallback quietly saves it.
// So force both on the real page: prepend a tall spacer before the bundle runs
// (pushing the real hero below the fold at init) and set --swiper-padding, a
// documented public knob. Real markup, real CSS, real init path.
{
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    if (beforeBundle) {
        await page.setRequestInterception(true);
        page.on('request', (r) => r.url().includes('nds-delegated.min.js')
            ? r.respond({ status: 200, contentType: 'application/javascript', body: beforeBundle })
            : r.continue());
    }
    // DOMContentLoaded, not evaluateOnNewDocument's own tick: at injection time
    // document.documentElement is still null. DCL is early enough — the delegated
    // bundle that owns swiper is injected after the reveal, well after DCL.
    await page.evaluateOnNewDocument(() => {
        document.addEventListener('DOMContentLoaded', () => {
            const css = document.createElement('style');
            css.textContent = '.nds-swiper.nds-hero { --padding: 32px; }';
            document.head.appendChild(css);
            const spacer = document.createElement('div');
            spacer.id = 'probe-spacer';
            spacer.style.cssText = 'height:400vh';
            document.body.prepend(spacer);
        });
    });
    await page.goto(`${BASE}/components/swiper.html`, { waitUntil: 'networkidle0' });

    const r = await page.evaluate(async () => {
        const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
        const el = document.querySelector('.nds-swiper.nds-hero[data-nds-swiper-initialized]');
        if (!el) return { error: 'hero never initialized' };
        const inst = el._ndsSwiper;
        const slides = el.querySelectorAll('.nds-swiper-slide');
        const hiddenAtInit = [...slides].filter((s) => s.hasAttribute('hidden')).length;
        const stepAtInit = inst?._measuredStep ?? null;
        const rig = {
            spacer: !!document.getElementById('probe-spacer'),
            offscreen: el.getBoundingClientRect().top > innerHeight,
            wrapPad: getComputedStyle(el.querySelector('.nds-swiper-wrapper')).paddingInlineStart,
        };

        el.scrollIntoView({ block: 'center', behavior: 'instant' });
        await sleep(700); // IO one-shot + rAF reveal
        const stepAfterReveal = inst?._measuredStep ?? null;

        const next = el.querySelector('.nds-next');
        const wrap = el.querySelector('.nds-swiper-wrapper');
        const atEnd = [];
        for (let i = 0; i < slides.length + 2; i++) {
            if (next.disabled) break;
            next.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, pointerType: 'mouse', button: 0 }));
            await sleep(500);
            atEnd.push(el.getAttribute('data-state')?.includes('at-end') ?? false);
        }
        return {
            rig, slideCount: slides.length, hiddenAtInit, stepAtInit, stepAfterReveal, atEnd,
            clicksTaken: atEnd.length,
            scrolled: Math.round(Math.abs(wrap.scrollLeft)),
            maxScroll: Math.round(wrap.scrollWidth - wrap.clientWidth),
            stillHidden: [...slides].filter((s) => s.hasAttribute('hidden')).length,
        };
    });

    ok('rig: hero is off-screen at init with padding applied',
        !r.error && r.rig.spacer && r.rig.offscreen && r.rig.wrapPad !== '0px',
        r.error || `spacer=${r.rig?.spacer} offscreen=${r.rig?.offscreen} wrapperPadding=${r.rig?.wrapPad}`);
    ok('off-screen hero inits with its slides still hidden (precondition a)',
        !r.error && r.hiddenAtInit > 0, r.error || `${r.hiddenAtInit} hidden at init`);
    ok('off-screen hero caches a padding-sized step (precondition b)',
        !r.error && r.stepAtInit > 0 && r.stepAtInit < 200,
        r.error || `step at init = ${r.stepAtInit}px (wrapper padding, not the slide stride)`);
    ok('reveal clears the poisoned step',
        !r.error && (r.stepAfterReveal === null || r.stepAfterReveal > 200),
        r.error || `step after reveal = ${r.stepAfterReveal}`);
    ok('off-screen padded hero pages to the end', healthy(r), fmt(r));
    await page.close();
}

// --- case 3: above-fold hero (front page) never regressed and still works ---
{
    const page = await open(`${BASE}/`);
    const has = await page.$$eval('.nds-swiper.nds-hero[data-nds-swiper-initialized]', (els) => els.length);
    if (has) {
        const r = await walk(page, '.nds-swiper.nds-hero', 0);
        ok('above-fold hero pages to the end', healthy(r), fmt(r));
    } else {
        ok('above-fold hero present on front page', false, 'none found — case skipped');
    }
    await page.close();
}

await browser.close();
const failed = results.filter((r) => !r.pass);
console.log(`\n${results.length - failed.length}/${results.length} passed${BEFORE ? '  (--before: failures here are EXPECTED)' : ''}`);
process.exit(failed.length ? 1 : 0);
