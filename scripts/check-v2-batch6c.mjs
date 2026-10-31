// v2 consistency, batch 6c (plans/v2-consistency.md 3.26, 3.28). Checked by what each part does;
// a call is written with the build's own forms, so the run passes on the old build and the new.
//   3.28  Swiper goTo()/goToFull() take { instant }; Selection.selectAll() takes { scope }
//   3.26  Rating's change event carries value beside rating and element; Filter and Sort name
//         themselves by element (detail.filter, detail.sort), Filter's ready carries { instance }
//
//   node scripts/check-v2-batch6c.mjs [baseUrl] [--new]
import { launch, log } from './lib/browser.mjs';

const BASE = (process.argv.find((a) => a.startsWith('http')) || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');
const NEW = process.argv.includes('--new');
const browser = await launch();
let failed = 0;
const check = (ok, msg) => { if (!ok) failed++; log(`${ok ? 'pass' : 'FAIL'} ${msg}`); };

async function open(path) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/${path}.html`, { waitUntil: 'load' });
    await page.waitForFunction(() => document.documentElement.hasAttribute('data-nds-loaded'));
    await page.evaluate(() => NDS.init.ready);
    await page.waitForTimeout(500);
    await page.evaluate(() => document.getElementById('nds-cookies-panel')?.remove());
    return page;
}

// The doc pages keep their demos as canons: mount one at the top of <main>.
const mount = (page, canon) => page.evaluate(async (id) => {
    const box = document.createElement('div');
    box.innerHTML = document.getElementById(id).textContent;
    document.querySelector('main').prepend(box);
    await NDS.init.mount(box);
    await new Promise((r) => setTimeout(r, 500));
}, canon);

// 3.28 Swiper: an instant move lands in the same task; a default move scrolls smoothly, so it has not landed yet.
{
    const page = await open('components/swiper');
    await mount(page, 'swiper-hero');
    const r = await page.evaluate(async (isNew) => {
        const el = [...document.querySelectorAll('.nds-swiper')].find((x) => x.ndsSwiper && !x.closest('template, [data-canon], .nds-doc-variants'));
        if (!el) return null;
        const sw = el.ndsSwiper;
        el.scrollIntoView();
        const at = () => Math.abs(sw.wrapper.scrollLeft);
        const settle = () => new Promise((r) => setTimeout(r, 900));
        const instant = isNew ? { instant: true } : false;
        sw.goTo(0, instant); await settle();
        sw.goTo(2, instant);
        const goToInstant = at() > 0;
        await settle();
        sw.goTo(0);
        const goToSmooth = at() > 0;            // still on its way back
        await settle();
        sw.goToFull(sw.currentIndex + 1, isNew ? { instant: true } : true);
        const fullInstant = at() > 0;
        await settle();
        sw.goTo(0, instant); await settle();
        return { goToInstant, goToSmooth, fullInstant, home: at() === 0 };
    }, NEW);
    check(!!r, 'swiper: found a live swiper');
    if (r) {
        check(r.goToInstant, 'swiper: goTo() with the instant form lands at once');
        check(r.goToSmooth, 'swiper: goTo() with no options scrolls smoothly');
        check(r.fullInstant, 'swiper: goToFull() with the instant form lands at once');
        check(r.home, 'swiper: back at the first slide');
    }
    await page.context().close();
}

// 3.28 Selection: selectAll on the page scope selects the shown page only.
{
    const page = await open('components/selection');
    await mount(page, 'selection-table');
    const r = await page.evaluate((isNew) => {
        const list = document.getElementById('selection-requests');
        if (!list) return null;
        NDS.Selection.clear(list);
        NDS.Selection.selectAll(list, true, isNew ? { scope: 'page' } : 'page');
        const page = NDS.Selection.getSelected(list).length;
        NDS.Selection.selectAll(list);
        const all = NDS.Selection.getSelected(list).length;
        NDS.Selection.selectAll(list, false);
        const none = NDS.Selection.getSelected(list).length;
        return { page, all, none };
    }, NEW);
    check(!!r, 'selection: found the paged list');
    if (r) {
        check(r.page === 4, `selection: the page scope selects the shown page (${r.page}/4)`);
        check(r.all === 6, `selection: no scope selects every page (${r.all}/6)`);
        check(r.none === 0, 'selection: false clears');
    }
    await page.context().close();
}

// 3.26 Rating: the change event's detail.
{
    const page = await open('components/rating');
    const d = await page.evaluate(() => {
        const el = [...document.querySelectorAll('.nds-rating')].find((x) => x.ndsRating && !x.closest('template, [data-canon], .nds-doc-variants') && !x.ndsRating.isDisabled());
        if (!el) return null;
        let detail = null;
        el.addEventListener('nds:rating:change', (e) => { detail = e.detail; }, { once: true });
        const next = NDS.Rating.getValue(el) === 2 ? 3 : 2;
        NDS.Rating.setValue(el, next);
        return detail && { rating: detail.rating, element: detail.element === el, value: detail.value, next };
    });
    check(!!d, 'rating: the change event fired');
    if (d) {
        check(d.rating === d.next && d.element, 'rating: detail.rating is the score, detail.element the rating');
        if (NEW) check(d.value === d.next, `rating: detail.value is the score (${d.value})`);
    }
    await page.context().close();
}

// 3.26 Filter: the change event names the filter; ready hands over the instance.
{
    const page = await open('components/filter');
    const r = await page.evaluate(async () => {
        const el = [...document.querySelectorAll('.nds-filter')].find((x) => x.ndsFilter && !x.closest('template, [data-canon], .nds-doc-variants'));
        if (!el) return null;
        const inst = el.ndsFilter;
        let change = null;
        el.addEventListener('nds:filter:change', (e) => { change = e.detail.filter; }, { once: true });
        inst.reset();
        await new Promise((r) => setTimeout(r, 300));
        let ready = null;
        document.addEventListener('nds:filter:ready', (e) => { ready = e.detail; }, { once: true });
        NDS.Filter.destroy(el);
        const made = await NDS.Filter.create(el);
        let viaWhenReady = null;
        NDS.Filter.whenReady(el, (f) => { viaWhenReady = f; });
        await new Promise((r) => setTimeout(r, 300));
        return {
            changeIsInstance: change === inst, changeIsElement: change === el,
            readyIsInstance: !!ready && ready === el.ndsFilter, readyHasInstance: !!ready && ready.instance === el.ndsFilter,
            whenReady: viaWhenReady === el.ndsFilter && !!made,
        };
    });
    check(!!r, 'filter: found a live filter');
    if (r) {
        check(NEW ? r.changeIsElement : r.changeIsInstance, `filter: change detail.filter is the ${NEW ? 'element' : 'instance'}`);
        check(NEW ? r.readyHasInstance : r.readyIsInstance, `filter: ready detail ${NEW ? 'carries { instance }' : 'is the instance'}`);
        check(r.whenReady, 'filter: whenReady() passes the instance');
    }
    await page.context().close();
}

// 3.26 Sort: the change event names the sort.
{
    const page = await open('components/sort');
    const r = await page.evaluate(() => {
        const el = [...document.querySelectorAll('[data-nds-sort-initialized]')].find((x) => x.ndsSort && !x.closest('template, [data-canon], .nds-doc-variants'));
        if (!el) return null;
        let got = null;
        el.addEventListener('nds:sort:change', (e) => { got = e.detail.sort; }, { once: true });
        el.ndsSort.reset();
        return { isInstance: got === el.ndsSort, isElement: got === el };
    });
    check(!!r, 'sort: found a live sort');
    if (r) check(NEW ? r.isElement : r.isInstance, `sort: change detail.sort is the ${NEW ? 'element' : 'instance'}`);
    await page.context().close();
}

await browser.close();
log(failed ? `${failed} failed` : 'all passed');
process.exit(failed ? 1 : 0);
