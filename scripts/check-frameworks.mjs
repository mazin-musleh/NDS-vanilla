// core/init.md Framework Views, run in real React, Vue, Svelte, Angular, htmx and Turbo —
// not a plain-JS imitation. Svelte compiles and Angular runs JIT in the page, so no build step.
//
//   MOUNT     mount(view) after mount, destroy(view) before unmount; React StrictMode runs
//             mount → destroy → mount, so a view must end with ONE live instance.
//   EVENTS    an NDS event reaches addEventListener through a ref, once per action.
//   TEARDOWN  unmounting a view with an open menu or an open modal leaves nothing on the
//             page: no menu in the top layer, no backdrop, no scroll lock. The view mounts again.
//   CLASSES   a changing class binding on an element NDS writes to wipes NDS's class; the
//             doc's advice (put the changing class on a wrapper) keeps it.
//   SWAPS     htmx and Turbo swaps with destroy() before and mount() after: the new view works
//             and nothing from the old one is left.
//   MORPH     idiomorph and Turbo 8 frame morphs keep the nodes: the same two calls work, and
//             refresh() alone leaves a second instance on a node (the doc's warning).
//   FAB       a FAB docks on <body>, out of the framework's tree. Unmount leaves none behind; in
//             React a sibling added before a bare FAB crashes the app, a wrapper of its own does not.
//   HYDRATION React and Vue hydrate server HTML from their own server renderers: NDS starting at
//             load breaks it; data-nds-auto-init="false" + initialize() after hydration does not.
//             React rendering <html> too (Next.js) drops the reveal stamp, so the page stays hidden.
//   INFO rows print a class-binding result the doc does not claim yet; they never fail the run.
//
//   node scripts/check-frameworks.mjs [baseUrl]
//   NO_DESTROY=1 skips every destroy() call: the TEARDOWN rows must fail, which proves they can.
// Defaults to the dev server. Start it with `bundle exec jekyll serve` if down.
import { launch } from './lib/browser.mjs';
import { REACT, VUE, SVELTE, ANGULAR, major, loadReact, loadVue, SVELTE_APP, ANGULAR_LOAD } from './lib/frameworks.mjs';

const BASE = (process.argv[2] || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');
const LIBS = {
    htmx: ['htmx.org@1.9.12/dist/htmx.min.js'],
    turbo: ['@hotwired/turbo@7.3.0/dist/turbo.es2017-umd.js']
};
const browser = await launch();
let failed = 0;
const ok = (name, pass, detail = '') => {
    if (!pass) failed++;
    console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? `  — ${detail}` : ''}`);
};

// One view per framework, from the dropmenu and modal canons; `p` prefixes the ids.
const VIEW = (p) => `<div class="nds-dropmenu" id="${p}-dm" data-select-name="${p}-country">
<button type="button" class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger"><span class="nds-label">Choose</span></button>
<div class="nds-dropmenu-menu" hidden><div class="nds-dropmenu-scroll">
<button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="SA"><span class="nds-label">Saudi Arabia</span></button>
<button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="AE"><span class="nds-label">UAE</span></button>
</div></div></div>
<dialog id="${p}-modal" class="nds-modal nds-card nds-stroke">
<div class="nds-card-content"><span class="nds-card-title">Title</span></div>
<div class="nds-card-actions"><button type="button" class="nds-btn nds-primary nds-lg" data-modal-close><span class="nds-label">Close</span></button></div>
</dialog>`;
// The custom-select canon: NDS adds nds-dropmenu to its .nds-form-control.
const SELECT = '<input type="text" class="nds-input nds-select-input" readonly>'
    + '<input type="hidden" class="nds-select-value">'
    + '<div class="nds-select-dropdown" hidden><div class="nds-select-options">'
    + '<button type="button" class="nds-btn nds-subtle nds-select-option" data-value="a"><span class="nds-option-text"><span class="nds-label">A</span></span></button>'
    + '</div></div>';

async function open(libs) {
    const page = await browser.newPage();
    const errors = [];
    // WebKit's harmless ResizeObserver loop notice: TODO.md, Watch.
    page.on('pageerror', (e) => { if (!/ResizeObserver loop/.test(e.message)) errors.push(e.message); });
    await page.goto(`${BASE}/components/forms.html`, { waitUntil: 'load' });
    await page.waitForFunction(() => window.NDS?.Init?.mount, null, { timeout: 15000 });
    // The cookie panel can open mid-run and take the clicks meant for a menu.
    await page.addStyleTag({ content: '#nds-cookies-panel { display: none !important; }' });
    if (typeof libs === 'function') await libs(page);
    else for (const lib of libs) await page.addScriptTag({ url: `https://unpkg.com/${lib}` });
    await page.evaluate(([VIEW, SELECT, noDestroy]) => {
        window.__VIEW = new Function('p', 'return `' + VIEW + '`');
        window.__SELECT = SELECT;
        window.__picks = [];
        window.__destroy = (el) => (window.__noDestroy ? 0 : NDS.Init.destroy(el));
        window.__wait = (ms = 350) => new Promise((r) => setTimeout(r, ms));
        window.__strays = () => document.querySelectorAll('.nds-dropmenu-menu:popover-open').length;
        window.__released = () => !NDS.Modal.isOpen() && !document.body.style.top && !document.querySelector('.nds-modal[open]');
        window.__noDestroy = noDestroy;
    }, [VIEW('${p}'), SELECT, !!process.env.NO_DESTROY]);
    return { page, errors };
}

// The same assertions for every host: `p` is the id prefix, `unmount`/`remount` drive the framework.
async function lifecycle(page, name, p, unmount, remount) {
    const menuOpen = () => page.evaluate((p) => {
        const menu = NDS.Dropmenu.menuOf(document.getElementById(p + '-dm'));
        return !!menu && !menu.hidden && menu.matches(':popover-open');
    }, p);
    const trigger = page.locator(`#${p}-dm .nds-dropmenu-trigger`);

    await page.evaluate(() => window.__wait(600));
    await trigger.scrollIntoViewIfNeeded();
    await trigger.click();
    await page.evaluate(() => window.__wait());
    ok(`${name}: one click opens the menu in the top layer (one live instance)`, await menuOpen());

    await page.evaluate(() => { window.__picks.length = 0; });
    await page.locator('.nds-dropmenu-item[data-value="AE"]').click();
    await page.evaluate(() => window.__wait());
    const picks = await page.evaluate(() => window.__picks.slice());
    ok(`${name}: the pick reaches a ref listener once`, picks.join() === 'AE', JSON.stringify(picks));

    await trigger.click();
    await page.evaluate(() => window.__wait());
    await unmount();
    await page.evaluate(() => window.__wait());
    ok(`${name}: unmount with the menu open leaves no menu in <body>`, (await page.evaluate(() => window.__strays())) === 0);

    await remount();
    await page.evaluate((p) => { NDS.Modal.open(p + '-modal'); return window.__wait(); }, p);
    ok(`${name}: setup, the modal locked the page`, await page.evaluate(() => NDS.Modal.isOpen() && !!document.body.style.top));
    await unmount();
    await page.evaluate(() => window.__wait());
    ok(`${name}: unmount with the modal open closes the dialog and releases the scroll lock`, await page.evaluate(() => window.__released()));

    await remount();
    await page.evaluate(() => window.__wait(600));
    // A modal left open makes the page inert: that fails here, not as a crash.
    await trigger.click({ timeout: 3000 }).catch(() => {});
    await page.evaluate(() => window.__wait());
    ok(`${name}: the view works again after a remount`, await menuOpen());
    await page.evaluate(() => NDS.Modal.isOpen() && NDS.Modal.close());
    await page.keyboard.press('Escape');
}

// ---- REACT (StrictMode) ---------------------------------------------------
for (const v of REACT) {
    const R = 'React ' + major(v);
    const { page, errors } = await open(loadReact(v));
    await page.evaluate(() => {
        const h = React.createElement;
        // Real React nodes from the markup: React owns every element, as in an app.
        const toReact = (node, key) => {
            if (node.nodeType === 3) return node.textContent.trim() ? node.textContent : null;
            if (node.nodeType !== 1) return null;
            const props = { key };
            for (const a of node.attributes) {
                const n = { class: 'className', for: 'htmlFor', readonly: 'readOnly' }[a.name] || a.name;
                props[n] = a.name === 'hidden' || a.name === 'readonly' ? true : a.value;
            }
            const kids = [...node.childNodes].map(toReact).filter((k) => k !== null);
            return h(node.tagName.toLowerCase(), props, ...kids);
        };
        const tree = (html) => [...new DOMParser().parseFromString('<div>' + html + '</div>', 'text/html').body.firstChild.childNodes]
            .map(toReact).filter((k) => k !== null);

        function View() {
            const ref = React.useRef(null);
            React.useEffect(() => {
                const el = ref.current; // the ref is empty by cleanup time
                window.NDS?.Init.mount(el);
                const dm = el.querySelector('#r-dm');
                const on = (e) => window.__picks.push(e.detail.value);
                dm.addEventListener('nds:dropmenu:selected', on);
                return () => { dm.removeEventListener('nds:dropmenu:selected', on); window.__destroy(el); };
            }, []);
            return h('div', { ref }, ...tree(window.__VIEW('r')));
        }
        function Classes() {
            const [on, setOn] = React.useState(false);
            window.__setReactClass = setOn;
            const ref = React.useRef(null);
            React.useEffect(() => { const el = ref.current; window.NDS?.Init.mount(el); return () => window.NDS?.Init.destroy(el); }, []);
            return h('div', { ref },
                h('div', { className: 'nds-form-container nds-select', id: 'rc-bound' },
                    h('div', { className: 'nds-form-control' + (on ? ' is-on' : '') }, ...tree(window.__SELECT))),
                h('div', { className: 'nds-form-container nds-select' + (on ? ' is-on' : ''), id: 'rc-wrapper' },
                    h('div', { className: 'nds-form-control' }, ...tree(window.__SELECT))));
        }
        function App() {
            const [show, setShow] = React.useState(true);
            window.__setReactShow = setShow;
            return h(React.StrictMode, null, show ? h(View) : null, h(Classes));
        }
        const host = document.querySelector('.nds-section-body').appendChild(document.createElement('div'));
        ReactDOM.createRoot(host).render(h(App));
    });
    const flip = (show) => page.evaluate((show) => { window.__setReactShow(show); return window.__wait(100); }, show);
    await lifecycle(page, R, 'r', () => flip(false), () => flip(true));

    const cls = await page.evaluate(async () => {
        for (const id of ['rc-bound', 'rc-wrapper']) await NDS.CustomSelect.create(document.getElementById(id));
        const has = () => ['rc-bound', 'rc-wrapper'].map((id) => document.querySelector('#' + id + ' .nds-form-control').classList.contains('nds-dropmenu'));
        const before = has();
        window.__setReactClass(true);
        await window.__wait(100);
        return { before, after: has() };
    });
    ok(`${R}: setup, NDS marked both fields`, cls.before.every(Boolean), JSON.stringify(cls));
    ok(`${R}: a changing className on the field wipes NDS's class (the doc's warning holds)`, cls.after[0] === false);
    ok(`${R}: the changing class on a wrapper keeps it (the doc's advice works)`, cls.after[1] === true);
    ok(`${R}: no page errors`, errors.length === 0, errors.join(' | '));
    await page.close();
}

// ---- VUE ------------------------------------------------------------------
for (const v of VUE) {
    const V = 'Vue ' + v.split('.').slice(0, 2).join('.');
    const { page, errors } = await open(loadVue(v));
    await page.evaluate(() => {
        const View = {
            template: '<div ref="root">' + window.__VIEW('v') + '</div>',
            mounted() {
                this.$refs.root.querySelector('#v-dm').addEventListener('nds:dropmenu:selected', (e) => window.__picks.push(e.detail.value));
                window.NDS?.Init.mount(this.$refs.root);
            },
            beforeUnmount() { window.__destroy(this.$refs.root); }
        };
        const host = document.querySelector('.nds-section-body').appendChild(document.createElement('div'));
        window.__vueApp = Vue.createApp({
            components: { View },
            data: () => ({ show: true, on: false }),
            template: '<View v-if="show" /><div ref="cls">'
                + '<div class="nds-form-container nds-select" id="vc-bound"><div class="nds-form-control" :class="{ \'is-on\': on }">' + window.__SELECT + '</div></div>'
                + '<div class="nds-form-container nds-select" :class="{ \'is-on\': on }" id="vc-wrapper"><div class="nds-form-control">' + window.__SELECT + '</div></div>'
                + '</div>',
            mounted() { window.NDS?.Init.mount(this.$refs.cls); }
        }).mount(host);
    });
    const flip = (show) => page.evaluate((show) => { window.__vueApp.show = show; return window.__wait(100); }, show);
    await lifecycle(page, V, 'v', () => flip(false), () => flip(true));

    const cls = await page.evaluate(async () => {
        for (const id of ['vc-bound', 'vc-wrapper']) await NDS.CustomSelect.create(document.getElementById(id));
        const has = () => ['vc-bound', 'vc-wrapper'].map((id) => document.querySelector('#' + id + ' .nds-form-control').classList.contains('nds-dropmenu'));
        const before = has();
        window.__vueApp.on = true;
        await window.__wait(100);
        return { before, after: has() };
    });
    ok(`${V}: setup, NDS marked both fields`, cls.before.every(Boolean), JSON.stringify(cls));
    ok(`${V}: a changing :class on the field wipes NDS's class (the doc's warning holds)`, cls.after[0] === false);
    ok(`${V}: the changing class on a wrapper keeps it (the doc's advice works)`, cls.after[1] === true);
    ok(`${V}: no page errors`, errors.length === 0, errors.join(' | '));
    await page.close();
}

// ---- HTMX -----------------------------------------------------------------
{
    const { page, errors } = await open(LIBS.htmx);
    await page.route('**/nds-fragment', (route) => route.fulfill({ contentType: 'text/html', body: VIEW('x') }));
    await page.evaluate((url) => {
        const host = document.querySelector('.nds-section-body').appendChild(document.createElement('div'));
        host.id = 'x-target';
        window.__released_count = 0;
        document.addEventListener('htmx:beforeSwap', (e) => { window.__released_count += window.__destroy(e.detail.target); });
        document.addEventListener('htmx:afterSwap', (e) => NDS.Init.mount(e.detail.target));
        // Delegated, since each swap brings a new dropmenu element.
        document.addEventListener('nds:dropmenu:selected', (e) => { if (e.target.id === 'x-dm') window.__picks.push(e.detail.value); });
        window.__swap = () => new Promise((r) => {
            document.addEventListener('htmx:afterSettle', () => r(), { once: true });
            htmx.ajax('GET', url, { target: '#x-target', swap: 'innerHTML' });
        });
    }, `${BASE}/nds-fragment`);
    const swap = () => page.evaluate(() => window.__swap());
    await swap();
    // A swap is the unmount and the remount in one step, so both drive it.
    await lifecycle(page, 'htmx', 'x', swap, async () => {});
    ok('htmx: each swap released the old view\'s instances', (await page.evaluate(() => window.__released_count)) > 0);
    ok('htmx: no page errors', errors.length === 0, errors.join(' | '));
    await page.close();
}

// ---- TURBO (frames) --------------------------------------------------------
{
    const { page, errors } = await open(LIBS.turbo);
    await page.route('**/nds-turbo*', (route) => route.fulfill({ contentType: 'text/html',
        body: `<html><body><turbo-frame id="t-frame">${VIEW('t')}</turbo-frame></body></html>` }));
    await page.evaluate((url) => {
        const frame = document.createElement('turbo-frame');
        frame.id = 't-frame';
        document.querySelector('.nds-section-body').appendChild(frame);
        window.__released_count = 0;
        document.addEventListener('turbo:before-frame-render', (e) => { window.__released_count += window.__destroy(e.target); });
        document.addEventListener('turbo:frame-render', (e) => NDS.Init.mount(e.target));
        document.addEventListener('nds:dropmenu:selected', (e) => { if (e.target.id === 't-dm') window.__picks.push(e.detail.value); });
        let n = 0;
        window.__swap = () => new Promise((r) => {
            frame.addEventListener('turbo:frame-load', () => r(), { once: true });
            frame.src = url + '?n=' + (++n);
        });
    }, `${BASE}/nds-turbo`);
    const swap = () => page.evaluate(() => window.__swap());
    await swap();
    await lifecycle(page, 'Turbo', 't', swap, async () => {});
    ok("Turbo: each frame render released the old view's instances", (await page.evaluate(() => window.__released_count)) > 0);
    ok('Turbo: no page errors', errors.length === 0, errors.join(' | '));
    await page.close();
}

{
    // Turbo Drive swaps the whole <body>: NDS's own DOM watchers must still see the new one.
    // A Rating added after the swap gets its instance from Rating's watcher alone.
    const { page, errors } = await open([]);
    const started = await page.evaluate(async () => {
        const bundle = Object.keys(window.__NDS_BUNDLES || {}).find((b) => window.__NDS_BUNDLES[b].ns?.includes('Rating'));
        if (bundle) await NDS.loadBundle(bundle);
        document.documentElement.replaceChild(document.createElement('body'), document.body);
        document.body.innerHTML = '<div class="nds-rating" data-rating="3"><span class="nds-rating-star"></span><span class="nds-rating-star"></span></div>';
        await window.__wait(300);
        return !!document.querySelector('.nds-rating').ndsRating;
    });
    ok('Turbo Drive: after a whole-body swap, NDS still starts markup added to the new body', started);
    ok('Turbo Drive: no page errors', errors.length === 0, errors.join(' | '));
    await page.close();
}

// ---- HYDRATION -------------------------------------------------------------
// Server HTML from the framework's own server renderer, written into the page before NDS
// starts, then hydrated: the Next.js / Nuxt shape without a server build. With NDS starting
// at load the hydration must report a mismatch (the doc's warning); with
// data-nds-auto-init="false" and START after hydration, none (its fix).
// Markup → framework nodes, so the framework owns each element. `h(tag, props, ...kids)`.
const TO_TREE = `(h, names) => function tree(html) {
    const conv = (node) => {
        if (node.nodeType === 3) return node.textContent.trim() ? node.textContent : null;
        if (node.nodeType !== 1) return null;
        const props = {};
        for (const a of node.attributes) props[names[a.name] || a.name] = a.name === 'hidden' || a.name === 'readonly' ? true : a.value;
        const kids = [...node.childNodes].map(conv).filter((k) => k !== null);
        return h(node.tagName.toLowerCase(), props, ...kids);
    };
    return [...new DOMParser().parseFromString('<div>' + html + '</div>', 'text/html').body.firstChild.childNodes]
        .map(conv).filter((k) => k !== null);
}`;
// core/init.md Hydration: drop the hold and start NDS, whichever loaded first.
const START = "document.documentElement.removeAttribute('data-nds-auto-init'); window.NDS?.Init.initialize();";
const MISMATCH = /hydrat|did not match|did not expect|extra attributes|server html/i;

async function hydrationRun(name, serverHtml, hydrate, manual) {
    const page = await browser.newPage();
    const logs = [];
    // Vue's build notice names its hydration flag; it is not a mismatch.
    page.on('console', (m) => { if (MISMATCH.test(m.text()) && !/^Feature flags/.test(m.text())) logs.push(m.text().slice(0, 140)); });
    await page.route(/components\/forms\.html/, async (route) => {
        const res = await route.fetch();
        let body = await res.text();
        body = body.replace(/<body([^>]*)>/, `<body$1><div id="ssr-root">${serverHtml}</div>`);
        if (manual) body = body.replace(/<html([^>]*)>/, '<html$1 data-nds-auto-init="false">');
        await route.fulfill({ response: res, body });
    });
    await page.goto(`${BASE}/components/forms.html`, { waitUntil: 'load' });
    await page.waitForFunction(() => window.NDS?.Init, null, { timeout: 15000 });
    if (!manual) await page.evaluate(() => window.NDS.Init.ready);
    await hydrate(page, manual);
    await page.waitForTimeout(800);
    const works = await page.evaluate(async () => {
        document.querySelector('#ssr-root .nds-dropmenu-trigger').click();
        await new Promise((r) => setTimeout(r, 350));
        const menu = NDS.Dropmenu.menuOf(document.querySelector('#ssr-root .nds-dropmenu'));
        return !!menu && !menu.hidden;
    });
    await page.close();
    return { logs, works };
}

for (const v of REACT) {
    // React: renderToString on a blank page, hydrateRoot on the real one. Dev builds log mismatches.
    const R = 'React ' + major(v);
    const APP = `(manual) => { const h = React.createElement;
        const tree = (${TO_TREE})(h, { class: 'className', for: 'htmlFor', readonly: 'readOnly' });
        return function App() {
            React.useEffect(() => { if (manual) { ${START} } }, []);
            return h('div', { id: 'h-app' }, ...tree(${JSON.stringify(VIEW('h'))}));
        };
    }`;
    const srv = await browser.newPage();
    await loadReact(v, true)(srv);
    if (v.startsWith('18.')) await srv.addScriptTag({ url: `https://unpkg.com/react-dom@${v}/umd/react-dom-server-legacy.browser.development.js` });
    else await srv.evaluate(async (v) => { window.ReactDOMServer = await import(`https://esm.sh/react-dom@${v}/server?dev`); }, v);
    const html = await srv.evaluate((APP) => ReactDOMServer.renderToString(React.createElement(eval(APP)(false))), APP);
    await srv.close();

    const hydrate = async (page, manual) => {
        await loadReact(v, true)(page);
        await page.evaluate(([APP, manual]) => {
            window.__hErr = [];
            ReactDOM.hydrateRoot(document.getElementById('ssr-root'), React.createElement(eval(APP)(manual)),
                { onRecoverableError: (e) => console.error('hydration error: ' + e.message) });
        }, [APP, manual]);
    };
    const auto = await hydrationRun(R, html, hydrate, false);
    ok(`${R} hydration: NDS starting at load breaks it (the doc's warning holds)`, auto.logs.length > 0, auto.logs[0] || 'no mismatch logged');
    const manual = await hydrationRun(R, html, hydrate, true);
    ok(`${R} hydration: data-nds-auto-init="false" + initialize() after it: no mismatch`, manual.logs.length === 0, manual.logs.join(' | '));
    ok(`${R} hydration: NDS works after the late initialize()`, manual.works);
}

// React rendering <html> too (the Next.js App Router shape) hydrates the whole document, with
// the built page's gate, inline script, CSS and main bundle. The clock NDS fills makes the
// mismatch: React renders again and drops data-nds-loaded with <html>'s other attributes.
const built = await (await fetch(`${BASE}/components/forms.html`)).text();
const HEAD = {
    gate: built.match(/<head[\s\S]*?<style>([\s\S]*?)<\/style>/)[1],
    inline: built.match(/<head[\s\S]*?<script>([\s\S]*?)<\/script>/)[1],
    css: [...built.matchAll(/<link rel="preload" href="([^"]+)"[^>]*data-nds-defer(?:="(\w+)")?/g)].map((m) => [m[1], m[2] || '']),
    js: built.match(/<script defer src="([^"]*nds-main\.min\.js[^"]*)"/)[1],
};
const DOC_APP = `(h, P, o) => {
    const view = h('main', null, h('div', { className: 'nds-content-layout' },
        h('p', { id: 'probe' }, 'hello'), h('span', { id: 'nds-real-time-clock' })));
    const doc = () => h('html', { lang: 'en', dir: 'ltr', 'data-nds-auto-init': o.manual ? 'false' : undefined },
        h('head', null, h('meta', { charSet: 'UTF-8' }), h('title', null, 't'),
            h('style', { dangerouslySetInnerHTML: { __html: P.gate } }),
            ...P.css.map(([href, d]) => h('link', { key: href, rel: 'preload', href, as: 'style', 'data-nds-defer': d })),
            h('script', { dangerouslySetInnerHTML: { __html: P.inline } })),
        h('body', null, h('div', { id: 'app' }, view), h('script', { defer: true, src: P.js })));
    return function App() { React.useEffect(() => { if (o.manual) { ${START} } }, []); return o.whole ? doc() : view; };
}`;
// No script tags: an extra node in <head> is a mismatch of its own.
const IMPORT_REACT = `async (v) => { window.React = await import('https://esm.sh/react@' + v + '?dev');
    window.ReactDOM = await import('https://esm.sh/react-dom@' + v + '/client?dev'); }`;

async function docRun(v, o) {
    const page = await browser.newPage();
    const args = [v, DOC_APP, HEAD, o, IMPORT_REACT];
    let html = await page.evaluate(async ([v, APP, P, o, imp]) => {
        await eval(imp)(v);
        const S = await import(`https://esm.sh/react-dom@${v}/server?dev`);
        return S.renderToString(React.createElement(eval(APP)(React.createElement, P, o)));
    }, args);
    html = o.whole ? '<!DOCTYPE html>' + html
        : `<!DOCTYPE html><html lang="en" dir="ltr"><head><meta charset="UTF-8"><style>${HEAD.gate}</style>`
          + HEAD.css.map(([h, d]) => `<link rel="preload" href="${h}" as="style" data-nds-defer="${d}">`).join('')
          + `<script>${HEAD.inline}</script></head><body><div id="root">${html}</div><script defer src="${HEAD.js}"></script></body></html>`;
    await page.route(`${BASE}/__hydrate.html`, (r) => r.fulfill({ contentType: 'text/html', body: html }));
    // late: NDS loads after hydration ends, as on a slow network under Next.js's async scripts.
    let release;
    const held = new Promise((r) => { release = r; });
    if (o.late) await page.route(/nds-main\.min\.js/, async (r) => { await held; await r.continue(); });
    await page.goto(`${BASE}/__hydrate.html`, { waitUntil: o.late ? 'commit' : 'load' });
    if (o.late) await page.waitForSelector('#probe', { state: 'attached' });
    else await page.waitForFunction(() => window.NDS?.Init, null, { timeout: 15000 });
    await page.waitForTimeout(500);
    const ndsFirst = await page.evaluate(async ([v, APP, P, o, imp]) => {
        await eval(imp)(v);
        document.getElementById('probe').__server = true;   // a node React renders again lacks it
        const ndsFirst = !!window.NDS;
        ReactDOM.hydrateRoot(o.whole ? document : document.getElementById('root'),
            React.createElement(eval(APP)(React.createElement, P, o)), { onRecoverableError: () => {} });
        await new Promise((r) => setTimeout(r, 1500));
        return ndsFirst;
    }, args);
    if (o.late) {
        release();
        await page.waitForFunction(() => window.NDS?.Init, null, { timeout: 15000 });
        await page.waitForTimeout(1500);
    }
    const r = await page.evaluate(() => ({ shown: getComputedStyle(document.querySelector('.nds-content-layout')).visibility === 'visible',
        renderedAgain: !document.getElementById('probe').__server,
        clock: !!document.getElementById('nds-real-time-clock').textContent.trim() }));
    await page.close();
    return { ndsFirst, ...r };
}

for (const v of REACT) {
    const R = 'React ' + major(v);
    let r = await docRun(v, { whole: true });
    ok(`${R} renders <html>: NDS starting at load leaves the page hidden (the doc's warning holds)`, r.renderedAgain && !r.shown, JSON.stringify(r));
    r = await docRun(v, { whole: true, manual: true });
    ok(`${R} renders <html>: with data-nds-auto-init="false" the page shows after hydration`, !r.renderedAgain && r.shown && r.clock, JSON.stringify(r));
    r = await docRun(v, { whole: true, manual: true, late: true });
    ok(`${R} renders <html>: NDS loading after hydration starts on its own and shows the page`, !r.ndsFirst && !r.renderedAgain && r.shown && r.clock, JSON.stringify(r));
    r = await docRun(v, { whole: false });
    ok(`${R} renders a div: NDS starting at load makes it render again, and the page still shows`, r.renderedAgain && r.shown, JSON.stringify(r));
}

for (const v of VUE) {
    // Vue: renderToString from vue/server-renderer, createSSRApp().mount() to hydrate. Dev builds log mismatches.
    const V = 'Vue ' + v.split('.').slice(0, 2).join('.');
    const VUE_URL = `https://esm.sh/vue@${v}?dev`;
    const APP = `(Vue, manual) => {
        const tree = (${TO_TREE})(Vue.h, {});
        return { mounted() { if (manual) { ${START} } },
            render: () => Vue.h('div', { id: 'h-app' }, tree(${JSON.stringify(VIEW('h'))})) };
    }`;
    const srv = await browser.newPage();
    await srv.goto(`${BASE}/404.html`).catch(() => {});
    const html = await srv.evaluate(async ([VUE_URL, APP, v]) => {
        const Vue = await import(VUE_URL);
        const { renderToString } = await import(`https://esm.sh/vue@${v}/server-renderer?dev`);
        return renderToString(Vue.createSSRApp(eval(APP)(Vue, false)));
    }, [VUE_URL, APP, v]);
    await srv.close();

    const hydrate = (page, manual) => page.evaluate(async ([VUE_URL, APP, manual]) => {
        const Vue = await import(VUE_URL);
        Vue.createSSRApp(eval(APP)(Vue, manual)).mount('#ssr-root');
    }, [VUE_URL, APP, manual]);
    const auto = await hydrationRun(V, html, hydrate, false);
    ok(`${V} hydration: NDS starting at load breaks it (the doc's warning holds)`, auto.logs.length > 0, auto.logs[0] || 'no mismatch logged');
    const manual = await hydrationRun(V, html, hydrate, true);
    ok(`${V} hydration: data-nds-auto-init="false" + initialize() after it: no mismatch`, manual.logs.length === 0, manual.logs.join(' | '));
    ok(`${V} hydration: NDS works after the late initialize()`, manual.works);
}

// A finding the doc does not claim yet: printed, never counted.
const info = (name, detail) => console.log(`INFO  ${name}  — ${detail}`);
const kept = (r) => (r ? 'keeps NDS\'s class' : 'wipes NDS\'s class');

// ---- SVELTE (compiled in the page) ------------------------------------------
for (const v of SVELTE) {
    const S = 'Svelte ' + major(v);
    const { page, errors } = await open([]);
    await page.evaluate(async ([VIEW, SELECT, SVELTE_APP, v]) => {
        const src = `<script>
  export let show = true;
  export let on = false;
  function nds(node) {
    node.querySelector('#s-dm').addEventListener('nds:dropmenu:selected', (e) => window.__picks.push(e.detail.value));
    window.NDS?.Init.mount(node);
    return { destroy() { window.__destroy(node); } };
  }
  function ndsPlain(node) { window.NDS?.Init.mount(node); return { destroy() { window.__destroy(node); } }; }
<\/script>
{#if show}<div use:nds>${VIEW}</div>{/if}
<div use:ndsPlain>
<div class="nds-form-container nds-select" id="sc-attr"><div class="nds-form-control {on ? 'is-on' : ''}">${SELECT}</div></div>
<div class="nds-form-container nds-select" id="sc-directive"><div class="nds-form-control" class:is-on={on}>${SELECT}</div></div>
<div class="nds-form-container nds-select {on ? 'is-on' : ''}" id="sc-wrapper"><div class="nds-form-control">${SELECT}</div></div>
</div>`;
        const App = await eval(SVELTE_APP)(src, v);
        const host = document.querySelector('.nds-section-body').appendChild(document.createElement('div'));
        window.__svelte = new App({ target: host });
    }, [VIEW('s'), SELECT, SVELTE_APP, v]);
    const flip = (show) => page.evaluate((show) => { window.__svelte.$set({ show }); return window.__wait(100); }, show);
    await lifecycle(page, S, 's', () => flip(false), () => flip(true));

    const cls = await page.evaluate(async () => {
        const ids = ['sc-attr', 'sc-directive', 'sc-wrapper'];
        for (const id of ids) await NDS.CustomSelect.create(document.getElementById(id));
        const has = () => ids.map((id) => document.querySelector('#' + id + ' .nds-form-control').classList.contains('nds-dropmenu'));
        const before = has();
        window.__svelte.$set({ on: true });
        await window.__wait(100);
        return { before, after: has() };
    });
    ok(`${S}: setup, NDS marked every field`, cls.before.every(Boolean), JSON.stringify(cls));
    info(`${S}: class="… {expr}" on the field`, kept(cls.after[0]));
    info(`${S}: class:name={expr} on the field`, kept(cls.after[1]));
    ok(`${S}: the changing class on a wrapper keeps it (the doc's advice works)`, cls.after[2] === true);
    ok(`${S}: no page errors`, errors.length === 0, errors.join(' | '));
    await page.close();
}

// ---- ANGULAR (JIT in the page) ----------------------------------------------
for (const [v, zone] of ANGULAR) {
    const A = 'Angular ' + major(v);
    const { page, errors } = await open([]);
    const booted = await page.evaluate(async ([VIEW, SELECT, v, zone, ANGULAR_LOAD]) => {
        const ng = await eval(ANGULAR_LOAD)(v, zone);
        const { Component, ElementRef, inject } = ng.core;
        const { bootstrapApplication } = ng.browser;

        class ViewCmp {
            el = inject(ElementRef);
            ngAfterViewInit() {
                const root = this.el.nativeElement;
                root.querySelector('#a-dm').addEventListener('nds:dropmenu:selected', (e) => window.__picks.push(e.detail.value));
                window.NDS?.Init.mount(root);
            }
            ngOnDestroy() { window.__destroy(this.el.nativeElement); }
        }
        Component({ selector: 'nds-view', standalone: true, template: VIEW })(ViewCmp);

        class AppCmp {
            show = true;
            on = false;
            el = inject(ElementRef);
            ngAfterViewInit() { window.NDS?.Init.mount(this.el.nativeElement.querySelector('#a-cls')); }
        }
        Component({ selector: 'nds-app', standalone: true, imports: [ViewCmp], template: '@if (show) { <nds-view /> }'
            + '<div id="a-cls">'
            + '<div class="nds-form-container nds-select" id="ac-classmap"><div [class]="on ? \'nds-form-control is-on\' : \'nds-form-control\'">' + SELECT + '</div></div>'
            + '<div class="nds-form-container nds-select" id="ac-classname"><div class="nds-form-control" [class.is-on]="on">' + SELECT + '</div></div>'
            + '<div class="nds-form-container nds-select" [class.is-on]="on" id="ac-wrapper"><div class="nds-form-control">' + SELECT + '</div></div>'
            + '</div>' })(AppCmp);

        document.querySelector('.nds-section-body').appendChild(document.createElement('nds-app'));
        const app = await bootstrapApplication(AppCmp);
        window.__ng = { set: (k, val) => { app.components[0].instance[k] = val; app.tick(); } };
        return true;
    }, [VIEW('a'), SELECT, v, zone, ANGULAR_LOAD]).catch((e) => e.message);
    ok(`${A}: bootstrapped`, booted === true, booted === true ? '' : String(booted));
    if (booted === true) {
        const flip = (show) => page.evaluate((show) => { window.__ng.set('show', show); return window.__wait(100); }, show);
        await lifecycle(page, A, 'a', () => flip(false), () => flip(true));
        const cls = await page.evaluate(async () => {
            const ids = ['ac-classmap', 'ac-classname', 'ac-wrapper'];
            for (const id of ids) await NDS.CustomSelect.create(document.getElementById(id));
            const has = () => ids.map((id) => document.querySelector('#' + id + ' .nds-form-control').classList.contains('nds-dropmenu'));
            const before = has();
            window.__ng.set('on', true);
            await window.__wait(100);
            return { before, after: has() };
        });
        ok(`${A}: setup, NDS marked every field`, cls.before.every(Boolean), JSON.stringify(cls));
        info(`${A}: [class]="expr" on the field`, kept(cls.after[0]));
        info(`${A}: [class.name]="expr" on the field`, kept(cls.after[1]));
        ok(`${A}: the changing class on a wrapper keeps it (the doc's advice works)`, cls.after[2] === true);
    }
    ok(`${A}: no page errors`, errors.length === 0, errors.join(' | '));
    await page.close();
}

// ---- MORPH (idiomorph, Turbo 8) ---------------------------------------------
// A morph keeps the nodes and writes the server's markup over them. Turbo 8 and htmx's morph
// swap both run idiomorph. Each run first proves the node survived, or it tests a plain swap.
const IDIOMORPH = 'idiomorph@0.7.3/dist/idiomorph.min.js';
{
    const { page, errors } = await open([IDIOMORPH]);
    await page.evaluate((html) => {
        const host = document.querySelector('.nds-section-body').appendChild(document.createElement('div'));
        host.id = 'm-host';
        host.innerHTML = html;
        NDS.Init.mount(host);
        host.querySelector('#m-dm').addEventListener('nds:dropmenu:selected', (e) => window.__picks.push(e.detail.value));
        window.__morph = () => {
            window.__destroy(host);
            Idiomorph.morph(host, html, { morphStyle: 'innerHTML' });
            return NDS.Init.mount(host);
        };
    }, VIEW('m'));
    const kept = await page.evaluate(() => {
        const before = document.getElementById('m-dm');
        window.__morph();
        return document.getElementById('m-dm') === before;
    });
    ok('idiomorph: setup, the morph kept the node', kept);
    const swap = () => page.evaluate(() => window.__morph());
    await lifecycle(page, 'idiomorph', 'm', swap, async () => {});
    ok('idiomorph: no page errors', errors.length === 0, errors.join(' | '));
    await page.close();
}

{
    // The doc's warning: a morph with refresh() alone, no destroy().
    const { page } = await open([IDIOMORPH]);
    const r = await page.evaluate(async (html) => {
        const host = document.querySelector('.nds-section-body').appendChild(document.createElement('div'));
        host.innerHTML = html;
        await NDS.Init.mount(host);
        const dm = host.querySelector('#w-dm');
        const first = dm.ndsDropmenu;
        Idiomorph.morph(host, html, { morphStyle: 'innerHTML' });
        NDS.Init.refresh(host);
        await window.__wait(300);
        const picks = [];
        dm.addEventListener('nds:dropmenu:selected', (e) => picks.push(e.detail.value));
        dm.querySelector('.nds-dropmenu-trigger').click();
        await window.__wait();
        const menu = NDS.Dropmenu.menuOf(dm);
        const opened = !!menu && !menu.hidden;
        menu?.querySelector('[data-value="AE"]')?.click();
        await window.__wait();
        return { sameNode: host.querySelector('#w-dm') === dm, newInstance: dm.ndsDropmenu !== first, opened, picks };
    }, VIEW('w'));
    ok('idiomorph, refresh() alone: a second instance on the same node fires each pick twice (the doc\'s warning holds)',
        r.sameNode && r.newInstance && r.picks.length === 2, JSON.stringify(r));
    await page.close();
}

{
    // Turbo 8: a frame with refresh="morph" morphs when it reloads.
    const { page, errors } = await open(['@hotwired/turbo@8.0.12/dist/turbo.es2017-umd.js']);
    await page.route('**/nds-turbo8*', (route) => route.fulfill({ contentType: 'text/html',
        body: `<html><body><turbo-frame id="t8-frame" refresh="morph">${VIEW('t8')}</turbo-frame></body></html>` }));
    await page.evaluate((url) => {
        const frame = document.createElement('turbo-frame');
        frame.id = 't8-frame';
        frame.setAttribute('refresh', 'morph');
        document.querySelector('.nds-section-body').appendChild(frame);
        window.__released_count = 0;
        document.addEventListener('turbo:before-frame-render', (e) => { window.__released_count += window.__destroy(e.target); });
        document.addEventListener('turbo:frame-render', (e) => NDS.Init.mount(e.target));
        document.addEventListener('nds:dropmenu:selected', (e) => { if (e.target.id === 't8-dm') window.__picks.push(e.detail.value); });
        window.__swap = () => new Promise((r) => {
            frame.addEventListener('turbo:frame-load', () => r(), { once: true });
            if (frame.src) frame.reload(); else frame.src = url;
        });
    }, `${BASE}/nds-turbo8`);
    const swap = () => page.evaluate(() => window.__swap());
    await swap();
    const kept = await page.evaluate(async () => {
        const before = document.getElementById('t8-dm');
        await window.__swap();
        return document.getElementById('t8-dm') === before;
    });
    ok('Turbo 8: setup, the frame reload morphed (kept the node)', kept);
    await lifecycle(page, 'Turbo 8 morph', 't8', swap, async () => {});
    ok("Turbo 8 morph: each frame render released the old view's instances", (await page.evaluate(() => window.__released_count)) > 0);
    ok('Turbo 8 morph: no page errors', errors.length === 0, errors.join(' | '));
    await page.close();
}

// ---- MOVED NODES ------------------------------------------------------------
// NDS moves some nodes the app wrote: a FAB into its dock, an open menu to <body>, a pinned
// nav item into the minimal bar. The framework still holds each one and may insert a
// sibling before it or remove it. NDS.markHome keeps the node's old spot answering for it.
const FAB = '<button type="button" class="nds-btn nds-fab nds-primary nds-circle nds-icon-only" id="f-fab" data-fab-pos="right" aria-label="Open" hidden><i class="nds-icon nds-hgi-menu-01" aria-hidden="true"></i></button>';
async function fabRun(page, name, errors) {
    const state = () => page.evaluate(() => {
        const fab = document.getElementById('f-fab');
        return { docked: !!fab?.parentElement?.classList.contains('nds-fab-dock'), shown: !!fab && !fab.hidden,
            extra: !!document.getElementById('f-extra'), inPage: !!fab };
    });
    const set = (k, v) => page.evaluate(([k, v]) => { window.__fabSet(k, v); return window.__wait(400); }, [k, v]);
    await page.evaluate(() => window.__wait(600));
    let s = await state();
    ok(`${name} FAB: it docks on <body> and shows`, s.docked && s.shown, JSON.stringify(s));
    let before = errors.length;
    await set('extra', true);
    s = await state();
    ok(`${name} FAB: a sibling added before it renders, and the FAB stays docked`, s.extra && s.docked && errors.length === before,
        JSON.stringify({ ...s, thrown: errors.slice(before) }));
    await set('show', false);
    s = await state();
    ok(`${name} FAB: unmount leaves no FAB on the page`, !s.inPage, JSON.stringify(s));
    await set('show', true);
    await page.evaluate(() => window.__wait(600));
    s = await state();
    ok(`${name} FAB: it docks again after a remount`, s.docked && s.shown, JSON.stringify(s));
    before = errors.length;
    await set('fab', false);
    s = await state();
    ok(`${name} FAB: the view removing the docked FAB takes it off the page`, !s.inPage && errors.length === before,
        JSON.stringify({ ...s, thrown: errors.slice(before) }));
}

for (const v of REACT) {
    const { page, errors } = await open(loadReact(v));
    await page.evaluate(([TO_TREE, FAB]) => {
        const h = React.createElement;
        const tree = eval(TO_TREE)(h, { class: 'className', for: 'htmlFor', readonly: 'readOnly' });
        function View({ extra, fab }) {
            const ref = React.useRef(null);
            React.useEffect(() => { const el = ref.current; window.NDS?.Init.mount(el); return () => window.__destroy(el); }, []);
            return h('div', { ref }, extra ? h('span', { id: 'f-extra' }, 'extra') : null, ...(fab ? tree(FAB) : []));
        }
        function App() {
            const [s, setS] = React.useState({ show: true, extra: false, fab: true });
            window.__fabSet = (k, val) => setS((o) => ({ ...o, [k]: val }));
            return h(React.StrictMode, null, s.show ? h(View, s) : null);
        }
        ReactDOM.createRoot(document.querySelector('.nds-section-body').appendChild(document.createElement('div'))).render(h(App));
    }, [TO_TREE, FAB]);
    await fabRun(page, 'React ' + major(v), errors);
    await page.close();
}

{
    const v = VUE.at(-1);
    const { page, errors } = await open(loadVue(v));
    await page.evaluate((FAB) => {
        const View = {
            props: ['extra', 'fab'],
            template: '<div ref="root"><span v-if="extra" id="f-extra">extra</span><template v-if="fab">' + FAB + '</template></div>',
            mounted() { window.NDS?.Init.mount(this.$refs.root); },
            beforeUnmount() { window.__destroy(this.$refs.root); }
        };
        const vm = Vue.createApp({ components: { View }, data: () => ({ show: true, extra: false, fab: true }),
            template: '<View v-if="show" :extra="extra" :fab="fab" />' }).mount(document.querySelector('.nds-section-body').appendChild(document.createElement('div')));
        window.__fabSet = (k, val) => { vm[k] = val; };
    }, FAB);
    await fabRun(page, 'Vue ' + v.split('.').slice(0, 2).join('.'), errors);
    await page.close();
}

{
    const v = SVELTE.at(-1);
    const { page, errors } = await open([]);
    await page.evaluate(async ([FAB, SVELTE_APP, v]) => {
        const src = `<script>
  export let show = true;
  export let extra = false;
  export let fab = true;
  function nds(node) { window.NDS?.Init.mount(node); return { destroy() { window.__destroy(node); } }; }
<\/script>
{#if show}<div use:nds>{#if extra}<span id="f-extra">extra</span>{/if}{#if fab}${FAB}{/if}</div>{/if}`;
        const App = await eval(SVELTE_APP)(src, v);
        const app = new App({ target: document.querySelector('.nds-section-body').appendChild(document.createElement('div')) });
        window.__fabSet = (k, val) => app.$set({ [k]: val });
    }, [FAB, SVELTE_APP, v]);
    await fabRun(page, 'Svelte ' + major(v), errors);
    await page.close();
}

{
    const [v, zone] = ANGULAR.at(-1);
    const { page, errors } = await open([]);
    await page.evaluate(async ([FAB, v, zone, ANGULAR_LOAD]) => {
        const ng = await eval(ANGULAR_LOAD)(v, zone);
        const { Component, ElementRef, inject } = ng.core;
        class ViewCmp {
            extra = false;
            fab = true;
            el = inject(ElementRef);
            ngAfterViewInit() { window.NDS?.Init.mount(this.el.nativeElement); }
            ngOnDestroy() { window.__destroy(this.el.nativeElement); }
        }
        Component({ selector: 'nds-fab-view', standalone: true, inputs: ['extra', 'fab'],
            template: '@if (extra) { <span id="f-extra">extra</span> }@if (fab) {' + FAB + '}' })(ViewCmp);
        class AppCmp { show = true; extra = false; fab = true; }
        Component({ selector: 'nds-fab-app', standalone: true, imports: [ViewCmp],
            template: '@if (show) { <nds-fab-view [extra]="extra" [fab]="fab" /> }' })(AppCmp);
        document.querySelector('.nds-section-body').appendChild(document.createElement('nds-fab-app'));
        const app = await ng.browser.bootstrapApplication(AppCmp);
        window.__fabSet = (k, val) => { app.components[0].instance[k] = val; app.tick(); };
    }, [FAB, v, zone, ANGULAR_LOAD]);
    await fabRun(page, 'Angular ' + major(v), errors);
    await page.close();
}

// React holds the moved node itself, so it is the framework these break. A node NDS.markHome
// marked and moved, and an open menu in the top layer: React inserts a sibling before each, then drops it.
for (const v of REACT) {
    const R = 'React ' + major(v);
    const { page, errors } = await open(loadReact(v));
    await page.evaluate(() => {
        const h = React.createElement;
        function View({ before, keep }) {
            const ref = React.useRef(null);
            React.useEffect(() => { const el = ref.current; window.NDS?.Init.mount(el); return () => window.__destroy(el); }, []);
            return h('div', { ref },
                h('div', { id: 'mv-box' }, before ? h('i', { id: 'mv-before' }) : null, keep ? h('span', { id: 'mv-node' }, 'node') : null),
                h('div', { className: 'nds-dropmenu', id: 'mv-dm' },
                    h('button', { type: 'button', className: 'nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger' },
                        h('span', { className: 'nds-label' }, 'Choose')),
                    before ? h('i', { id: 'mv-dm-before' }) : null,
                    keep ? h('div', { className: 'nds-dropmenu-menu', hidden: true }, h('div', { className: 'nds-dropmenu-scroll' },
                        h('button', { type: 'button', className: 'nds-btn nds-subtle nds-dropmenu-item', 'data-value': 'SA' },
                            h('span', { className: 'nds-label' }, 'Saudi Arabia')))) : null));
        }
        function App() {
            const [s, setS] = React.useState({ before: false, keep: true });
            window.__mvSet = (k, val) => setS((o) => ({ ...o, [k]: val }));
            return h(React.StrictMode, null, h(View, s));
        }
        ReactDOM.createRoot(document.querySelector('.nds-section-body').appendChild(document.createElement('div'))).render(h(App));
    });
    await page.evaluate(() => window.__wait(600));
    await page.evaluate(() => { const n = document.getElementById('mv-node'); NDS.markHome(n); document.body.appendChild(n); });
    await page.locator('#mv-dm .nds-dropmenu-trigger').click();
    await page.evaluate(() => window.__wait());
    const moved = await page.evaluate(() => ({
        node: document.getElementById('mv-node')?.parentElement === document.body,
        menu: !!NDS.Dropmenu.menuOf(document.getElementById('mv-dm'))?.matches(':popover-open')
    }));
    ok(`${R} moved nodes: setup, the node sits in <body>, the menu in the top layer`, moved.node && moved.menu, JSON.stringify(moved));

    let before = errors.length;
    await page.evaluate(() => { window.__mvSet('before', true); return window.__wait(); });
    const s = await page.evaluate(() => ({
        siblings: !!document.getElementById('mv-before') && !!document.getElementById('mv-dm-before'),
        // React's sibling lands where the moved node was: right before its marker.
        order: document.getElementById('mv-before')?.nextSibling?.nodeType === 8,
        menuOpen: !NDS.Dropmenu.menuOf(document.getElementById('mv-dm'))?.hidden
    }));
    ok(`${R} moved nodes: a sibling React adds before them renders, where they were`, s.siblings && s.order && s.menuOpen
        && errors.length === before, JSON.stringify({ ...s, thrown: errors.slice(before) }));

    before = errors.length;
    await page.evaluate(() => { window.__mvSet('keep', false); return window.__wait(); });
    const gone = await page.evaluate(() => ({
        node: !document.getElementById('mv-node'),
        menu: !document.querySelector('.nds-dropmenu-menu:popover-open'),
        markers: [...(document.getElementById('mv-box')?.childNodes || [])].filter((n) => n.nodeType === 8).length
    }));
    ok(`${R} moved nodes: React removing them takes them off the page`, gone.node && gone.menu && gone.markers === 0
        && errors.length === before, JSON.stringify({ ...gone, thrown: errors.slice(before) }));
    ok(`${R} moved nodes: no page errors`, errors.length === 0, errors.join(' | '));
    await page.close();
}

// A modal, panel or the cookie panel may ship inside a <template> (core/init.md, Usage); the
// first open unpacks it. React owns that <template>, then adds a node before it or drops it.
for (const v of REACT) {
    const R = 'React ' + major(v);
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', (e) => { if (!/ResizeObserver loop/.test(e.message)) errors.push(e.message); });
    // data-cookies="false": no built panel races the app's own; open() still loads the bundle.
    await page.route(/components\/forms\.html/, async (route) => {
        const res = await route.fetch();
        await route.fulfill({ response: res, body: (await res.text()).replace(/<html([^>]*)>/, '<html$1 data-cookies="false">') });
    });
    await page.goto(`${BASE}/components/forms.html`, { waitUntil: 'load' });
    await page.waitForFunction(() => window.NDS?.Init?.mount, null, { timeout: 15000 });
    await loadReact(v)(page);
    await page.evaluate(() => {
        const h = React.createElement;
        const PANEL = '<dialog id="nds-cookies-panel" class="nds-panel nds-cookies" aria-label="Cookies">'
            + '<div class="nds-cookies-view" data-cookies-view="notice"><p>Own panel</p>'
            + '<button type="button" class="nds-btn nds-primary" data-cookies-action="accept"><span class="nds-label">Accept</span></button></div></dialog>';
        const MODAL = '<dialog id="rt-modal" class="nds-modal nds-card nds-stroke">'
            + '<div class="nds-card-content"><span class="nds-card-title">Title</span></div></dialog>';
        function App() {
            const [s, setS] = React.useState({ before: false, keep: true });
            window.__tplSet = (k, val) => setS((o) => ({ ...o, [k]: val }));
            return h('div', { id: 'rt-host' },
                s.before ? h('i', { id: 'rt-before-cookies' }) : null,
                s.keep ? h('template', { dangerouslySetInnerHTML: { __html: PANEL } }) : null,
                s.before ? h('i', { id: 'rt-before-modal' }) : null,
                s.keep ? h('template', { dangerouslySetInnerHTML: { __html: MODAL } }) : null);
        }
        ReactDOM.createRoot(document.querySelector('.nds-section-body').appendChild(document.createElement('div'))).render(h(App));
    });
    await page.waitForTimeout(300);
    const opened = await page.evaluate(async () => {
        await NDS.CookieConsent.open();
        await NDS.Modal.open('rt-modal');
        await new Promise((r) => setTimeout(r, 400));
        const host = document.getElementById('rt-host');
        return { cookies: host.contains(document.getElementById('nds-cookies-panel')), modal: NDS.Modal.isOpen() };
    });
    ok(`${R} templates: setup, the own cookie panel and the modal unpack in the app's tree`, opened.cookies && opened.modal, JSON.stringify(opened));
    await page.evaluate(() => { NDS.Modal.close(); NDS.CookieConsent.close(); return new Promise((r) => setTimeout(r, 400)); });

    let before = errors.length;
    await page.evaluate(() => { window.__tplSet('before', true); return new Promise((r) => setTimeout(r, 300)); });
    const added = await page.evaluate(() => !!document.getElementById('rt-before-cookies') && !!document.getElementById('rt-before-modal'));
    ok(`${R} templates: a node React adds before an unpacked <template> renders`, added && errors.length === before,
        errors.slice(before).join(' | '));
    before = errors.length;
    await page.evaluate(() => { window.__tplSet('keep', false); return new Promise((r) => setTimeout(r, 300)); });
    const alive = await page.evaluate(() => !!document.getElementById('rt-host'));
    ok(`${R} templates: React removing an unpacked <template> does not crash the app`, alive && errors.length === before,
        errors.slice(before).join(' | '));
    await page.close();
}

// Accessibility: React renders its FAB (the _includes/accessibility-panel.html markup); the first
// press loads the bundle and builds the panel. Then React adds a node before the docked FAB and drops it.
for (const v of REACT) {
    const R = 'React ' + major(v);
    const { page, errors } = await open(loadReact(v));
    await page.evaluate(() => {
        // The page ships its own toggle: take it out, so the one under test is React's.
        document.querySelectorAll('[data-accessibility-toggle]').forEach((b) => b.remove());
        const h = React.createElement;
        function View({ before, fab }) {
            const ref = React.useRef(null);
            React.useEffect(() => { const el = ref.current; window.NDS?.Init.mount(el); return () => window.__destroy(el); }, []);
            return h('div', { ref }, before ? h('i', { id: 'a11y-before' }) : null, fab ? h('button', {
                className: 'nds-btn nds-primary nds-circle nds-icon-only nds-fab nds-accessibility-toggle', type: 'button', id: 'r-a11y',
                'aria-label': 'Accessibility settings', 'aria-expanded': 'false', 'data-fab-pos': 'auto', 'data-panel-side': 'end',
                'data-panel-toggle': 'nds-accessibility-panel', 'data-accessibility-toggle': '', hidden: true
            }, h('i', { className: 'nds-icon nds-hgi-accessibility', 'aria-hidden': 'true' })) : null);
        }
        function App() {
            const [s, setS] = React.useState({ before: false, fab: true });
            window.__a11ySet = (k, val) => setS((o) => ({ ...o, [k]: val }));
            return h(React.StrictMode, null, h(View, s));
        }
        ReactDOM.createRoot(document.querySelector('.nds-section-body').appendChild(document.createElement('div'))).render(h(App));
    });
    await page.waitForFunction(() => document.getElementById('r-a11y')?.parentElement?.classList.contains('nds-fab-dock'), null, { timeout: 10000 })
        .catch(() => {});
    const docked = await page.evaluate(() => !!document.getElementById('r-a11y')?.parentElement?.classList.contains('nds-fab-dock'));
    ok(`${R} accessibility: its FAB docks`, docked);
    await page.locator('#r-a11y').click();
    const panelOpen = await page.waitForFunction(() => {
        const p = document.getElementById('nds-accessibility-panel');
        return p && !p.hidden && NDS.State.has(p, 'open');
    }, null, { timeout: 15000 }).then(() => true, () => false);
    ok(`${R} accessibility: a press loads the bundle and opens the built panel`, panelOpen);
    await page.keyboard.press('Escape');
    await page.evaluate(() => window.__wait(400));

    let before = errors.length;
    await page.evaluate(() => { window.__a11ySet('before', true); return window.__wait(); });
    const s = await page.evaluate(() => ({ added: !!document.getElementById('a11y-before'),
        docked: !!document.getElementById('r-a11y')?.parentElement?.classList.contains('nds-fab-dock') }));
    ok(`${R} accessibility: a node React adds before the docked FAB renders`, s.added && s.docked && errors.length === before,
        JSON.stringify({ ...s, thrown: errors.slice(before) }));
    before = errors.length;
    await page.evaluate(() => { window.__a11ySet('fab', false); return window.__wait(); });
    const gone = await page.evaluate(() => !document.getElementById('r-a11y'));
    ok(`${R} accessibility: React removing the FAB takes it off the page`, gone && errors.length === before, errors.slice(before).join(' | '));
    await page.close();
}

{
    // Main nav: a pinned item moves into the minimal bar on a narrow screen and back on a wide one.
    const { page, errors } = await open([]);
    const spots = () => page.evaluate(() => [...document.querySelectorAll('.nds-main-nav .nds-nav-item.nds-pinned')].map((item) => ({
        inMinimal: !!item.closest('.nds-nav-minimal, [class*="minimal"]') && item.parentElement !== NDS.homeOf(item),
        home: !!NDS.homeOf(item),
        prev: item.previousSibling?.nodeType === 8 ? 'marker' : (item.previousElementSibling?.className || 'none')
    })));
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.evaluate(() => window.__wait());
    const wide = await spots();
    await page.setViewportSize({ width: 600, height: 800 });
    await page.evaluate(() => window.__wait(500));
    const narrow = await spots();
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.evaluate(() => window.__wait(500));
    const back = await spots();
    ok('Main nav: setup, the page has pinned items', wide.length > 0, String(wide.length));
    ok('Main nav: narrow, each pinned item moved and left a marker', narrow.every((s) => s.home && s.prev !== 'marker'), JSON.stringify(narrow));
    ok('Main nav: wide again, each is back in its own spot, no marker left', JSON.stringify(back) === JSON.stringify(wide)
        && back.every((s) => !s.home), JSON.stringify({ wide, back }));
    ok('Main nav: no page errors', errors.length === 0, errors.join(' | '));
    await page.close();
}

await browser.close();
console.log(failed ? `\n${failed} failed` : '\nall passed');
process.exit(failed ? 1 : 0);
