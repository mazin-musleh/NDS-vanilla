// NDS verify: both browser passes for every page and state, in one run.
//
//   node nds-verify.mjs <config.json> [--out <dir>] [--only <path>,…] [--jobs <n>] [--text]
//
// --out is where the shots go: tmp/nds-verify/ in the folder you run it from by default, one
// folder per page, replaced on each run. Keep tmp/ in .gitignore.
// --only checks just the pages whose path holds one of the texts: after a fix, re-check that
// page alone (write `nds/cart`, not `/nds/cart`: Git Bash turns a leading slash into a Windows
// path). A text equal to a page's whole path picks that page only, so `--only /` is the home
// page (in Git Bash: MSYS_NO_PATHCONV=1 node nds-verify.mjs … --only /). --jobs sets how many shots run at once (default: half the cores, 2 to 8).
// --text runs every check but takes no shots and writes no sheets, and leaves the last run's sheets in
// place: the re-check after an edit that cannot change the look (an event handler, a request, data).
//
// Needs Node 18+ and Chrome, Edge or Chromium (or CHROME_PATH). Installs nothing: it drives the browser
// over its own debugging pipe, headless, with a throwaway profile.
//
// config.json:
//   {
//     "base": "http://localhost:3000",              your app
//     "widths": [1280, 390],                        optional
//     "themes": ["light", "dark"],                  optional
//     "pages": [{
//       "path": "/cart",
//       "reference": "examples/console-demo.html",  a built page under this folder's _site/
//       "states": [                                 optional; default: one "default" state
//         { "name": "default", "cookies": [{ "name": "session", "value": "…" }] },
//         { "name": "arabic", "storage": { "app-lang": "ar" } },  set in localStorage before the page loads
//         { "name": "empty", "path": "/cart?account=empty" },
//         { "name": "failed", "fail": "/api/cart" },           every request whose URL holds it fails
//         { "name": "none", "respond": { "/api/cart": [] } },  answers with this JSON; a number answers
//                                                              with that status: { "/api/cart/9": 404 }
//         { "name": "open menu", "run": "document.querySelector('.nds-btn').click()" },
//         { "name": "rows", "run": "return document.querySelectorAll('tr').length" },  a return value is printed
//         { "name": "left and back", "run": "…click to another view, then back…", "kept": true }
//                                                    "kept": a kept-alive view (Vue's KeepAlive) is off the
//                                                    page on purpose: list its parts, never fail on them
//       ]
//     }]
//   }
//
// Writes, per page: each state at each width in the first theme, and per state a sheet-<state>.png
// that shows it under the reference. A page's first state is also shot in the other themes, at the widest width.
// A page taller than a sheet gets more, one slice each: sheet-<state>-2.png and on. The reference takes the state's lang and direction, so an Arabic
// page compares with a right-to-left reference in Arabic. Prints the audit findings, console errors (a CSP one names its
// source), failed loads, sideways scroll, parts cut off past the screen edge, controls another part lies over, text below AA contrast, a wrong window.innerWidth, parts still loading after the page settled,
// a dialog open at load with no state to close it, and NDS parts still alive off the
// page (a view that left without NDS.init.destroy: give a framework view a state whose run leaves it); exits 1 when there is
// any. Prints each state's sheet and only what went wrong. Inspect every sheet: the script cannot
// judge the look.
// With an NDS-PLAN.md (in the working folder, or the folder above this script), it ends with the rows
// left under `whole plan` pacing, and, from the last open row on, a reminder to file NDS findings in NDS-REPORT.md.
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { cpus, tmpdir } from 'node:os';
import { dirname, extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// ponytail: a Node too old for top-level await fails on parse, before this line can run.
if (+process.versions.node.split('.')[0] < 18) { console.error(`Node ${process.versions.node} is too old: nds-verify needs Node 18 or later.`); process.exit(2); }
const HERE = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const flag = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
const TEXT = args.includes('--text');
// --text takes no value: the text after it is the config.
const configPath = args.find((a, i) => !a.startsWith('--') && (!args[i - 1]?.startsWith('--') || args[i - 1] === '--text'));
if (!configPath) { console.error('Usage: node nds-verify.mjs <config.json> [--out <dir>] [--only <path>,…] [--jobs <n>] [--text]'); process.exit(2); }
const config = JSON.parse(readFileSync(configPath, 'utf8'));
// The project's gitignored tmp/, not the OS temp folder, where every run left a new folder behind.
const OUT = resolve(flag('--out') || join('tmp', 'nds-verify'));
mkdirSync(OUT, { recursive: true });
const ONLY = flag('--only')?.split(',').filter(Boolean);
const JOBS = Math.max(1, Number(flag('--jobs')) || Math.min(8, Math.max(2, cpus().length >> 1)));
// A whole path picks its page only: `/` would otherwise hold every page.
const isWholePath = (o) => config.pages.some((p) => p.path === o);
const PAGES = config.pages.filter((p) => !ONLY || ONLY.some((o) => isWholePath(o) ? p.path === o : p.path.includes(o)));
if (!PAGES.length) {
    const rewritten = ONLY.some((o) => /^[A-Za-z]:[\/]/.test(o));
    console.error(`No page path holds ${ONLY.join(' or ')}.${rewritten ? ' Git Bash turned a leading slash into a Windows path: run with MSYS_NO_PATHCONV=1.' : ''}`);
    process.exit(2);
}
const SITE = resolve(process.env.NDS_SITE || join(HERE, '_site'));
if (PAGES.some((p) => p.reference) && !existsSync(SITE)) {
    console.error(`No built site at ${SITE}: run this copy from the template folder, or set NDS_SITE.`); process.exit(2);
}
const BASE = config.base.replace(/\/$/, '');
const WIDTHS = config.widths || [1280, 390];
const THEMES = config.themes || ['light', 'dark'];

// --- static server: the built reference pages and the sheets -------------------------------
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json',
    '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp',
    '.woff2': 'font/woff2', '.ico': 'image/x-icon' };
const server = createServer((req, res) => {
    const [root, rest] = req.url.startsWith('/__out/') ? [OUT, req.url.slice(6)] : [SITE, req.url];
    const [path, query] = rest.split('?');
    let file = join(root, normalize(decodeURIComponent(path)));
    if (!file.startsWith(root)) { res.writeHead(403).end(); return; }
    if (existsSync(join(file, 'index.html'))) file = join(file, 'index.html');
    if (!existsSync(file)) { res.writeHead(404).end(); return; }
    let body = readFileSync(file);
    // A reference in the page's lang and dir: written into <html> before any script reads it.
    const q = new URLSearchParams(query), lang = q.get('nds-lang') || '', dir = q.get('nds-dir');
    if (extname(file) === '.html' && /^(ltr|rtl)$/.test(dir) && /^[\w-]{0,35}$/.test(lang)) {
        body = Buffer.from(String(body).replace(/<html\b[^>]*>/i, (tag) => tag
            .replace(lang ? /\s(lang|dir)\s*=\s*("[^"]*"|'[^']*'|\S+)/gi : /\sdir\s*=\s*("[^"]*"|'[^']*'|\S+)/gi, '')
            .replace(/\s*>$/, `${lang ? ` lang="${lang}"` : ''} dir="${dir}">`)));
    }
    res.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream' }).end(body);
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const LOCAL = `http://127.0.0.1:${server.address().port}`;

// --- browser over the debugging pipe ---------------------------------------------------------
const pf = process.env['ProgramFiles'] || 'C:/Program Files', pf86 = process.env['ProgramFiles(x86)'] || 'C:/Program Files (x86)';
// A Chrome installed for one user only lives under LOCALAPPDATA.
const local = process.env.LOCALAPPDATA;
const CHROME = [process.env.CHROME_PATH,
    `${pf}/Google/Chrome/Application/chrome.exe`, `${pf86}/Google/Chrome/Application/chrome.exe`,
    local && `${local}/Google/Chrome/Application/chrome.exe`,
    `${pf86}/Microsoft/Edge/Application/msedge.exe`, `${pf}/Microsoft/Edge/Application/msedge.exe`,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge', '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser',
    '/snap/bin/chromium', '/usr/bin/microsoft-edge',
].find((p) => p && existsSync(p));
if (!CHROME) { console.error('No Chrome, Edge or Chromium found: set CHROME_PATH to the browser executable.'); process.exit(2); }
const profile = mkdtempSync(join(tmpdir(), 'nds-verify-profile-'));
// From an admin shell, Chrome and Edge relaunch themselves de-elevated and the relaunch loses the pipe.
// --do-not-de-elevate stops it (Chrome and Edge 156); the next two cover older builds.
const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-pipe', `--user-data-dir=${profile}`,
    '--do-not-de-elevate', '--disable-features=AutoDeElevate', '--edge-skip-compat-layer-relaunch',
    '--no-first-run', '--no-default-browser-check', '--hide-scrollbars', 'about:blank'],
    { stdio: ['ignore', 'ignore', 'ignore', 'pipe', 'pipe'] });

let nextId = 1, buffer = '', answered = false;
const pending = new Map(), handlers = new Map();
// A Chrome that dies mid-run would leave every pending call waiting forever.
chrome.on('exit', (code) => {
    const why = answered ? '' : ' at launch, before it answered. From an administrator shell, run from a normal one';
    for (const { reject } of pending.values()) reject(new Error(`Chrome exited (${code})${why}`));
    pending.clear();
});
chrome.stdio[4].setEncoding('utf8'); // a multi-byte char split across chunks decodes whole
chrome.stdio[4].on('data', (chunk) => {
    answered = true;
    const parts = (buffer + chunk).split('\0');
    buffer = parts.pop();
    for (const raw of parts) {
        const msg = JSON.parse(raw);
        if (msg.id && pending.has(msg.id)) {
            const { resolve, reject } = pending.get(msg.id);
            pending.delete(msg.id);
            msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
        } else handlers.get(msg.sessionId)?.(msg.method, msg.params);
    }
});
// A call Chrome never answers (an evaluate on a promise that never settles, a page frozen by a dialog)
// fails after CALL_MS instead of holding the run forever. ponytail: one limit for every call.
const CALL_MS = 60000;
const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
    const id = nextId++;
    const timer = setTimeout(() => { pending.delete(id); reject(new Error(`${method} got no answer in ${CALL_MS / 1000} s`)); }, CALL_MS);
    pending.set(id, { resolve: (v) => { clearTimeout(timer); resolve(v); }, reject: (e) => { clearTimeout(timer); reject(e); } });
    chrome.stdio[3].write(JSON.stringify({ id, method, params, sessionId }) + '\0');
});
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// Runs in the page: resolves once nothing moves. Endless animations (a skeleton pulse) never end, so they do not count.
const SETTLED = `(async () => {
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    const finite = document.getAnimations().filter((a) => a.effect?.getTiming().iterations !== Infinity);
    await Promise.race([Promise.allSettled(finite.map((a) => a.finished)), new Promise((r) => setTimeout(r, 3000))]);
})()`;

// One fresh tab in its own context per shot: no cookie or storage leaks into a shot running beside it.
// A shot that fails names its page, width and theme, so a stopped run says where it stopped.
const shoot = (url, o) => shootOnce(url, o).catch((e) => { throw new Error(`${url} at ${o.width}px ${o.theme}: ${e.message}`); });
async function shootOnce(url, { width, theme, cookies = [], storage = {}, fail, respond = {}, run, audit, shot = true }) {
    // A request the state fails or answers is expected: its console line is no error.
    const faked = [fail, ...Object.keys(respond)].filter(Boolean);
    const answer = (requestUrl) => {
        if (fail && requestUrl.includes(fail)) return { errorReason: 'Failed' };
        const key = Object.keys(respond).find((k) => requestUrl.includes(k));
        if (key === undefined) return { errorReason: 'Failed' };
        const v = respond[key];
        return typeof v === 'number' ? { responseCode: v, body: '' } : { responseCode: 200,
            responseHeaders: [{ name: 'content-type', value: 'application/json' }],
            body: Buffer.from(JSON.stringify(v)).toString('base64') };
    };
    const { browserContextId } = await send('Target.createBrowserContext');
    const { targetId } = await send('Target.createTarget', { url: 'about:blank', browserContextId });
    const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
    const s = (m, p) => send(m, p, sessionId);
    const errors = [];
    let loaded;
    const onLoad = new Promise((r) => { loaded = r; });
    handlers.set(sessionId, (method, p) => {
        if (method === 'Page.loadEventFired') loaded();
        else if (method === 'Runtime.exceptionThrown') errors.push(p.exceptionDetails.exception?.description || p.exceptionDetails.text);
        else if (method === 'Runtime.consoleAPICalled' && p.type === 'error') errors.push(p.args.map((a) => a.value ?? a.description).join(' '));
        else if (method === 'Log.entryAdded' && p.entry.level === 'error' && !faked.some((f) => p.entry.url?.includes(f))) errors.push(p.entry.text + (p.entry.url ? ` (${p.entry.url})` : ''));
        // An alert, confirm or leave-page prompt freezes the page and every call after it: accept it, name it.
        else if (method === 'Page.javascriptDialogOpening') {
            errors.push(`${p.type} dialog opened: "${p.message}"`);
            s('Page.handleJavaScriptDialog', { accept: true }).catch(() => {});
        }
        else if (method === 'Fetch.requestPaused') {
            const a = answer(p.request.url);
            s(a.errorReason ? 'Fetch.failRequest' : 'Fetch.fulfillRequest', { requestId: p.requestId, ...a }).catch(() => {}); // the request may have ended first
        }
    });
    await Promise.all(['Page.enable', 'Runtime.enable', 'Log.enable', 'Network.enable'].map((m) => s(m)));
    const viewHeight = width < 768 ? 844 : 900;
    await s('Emulation.setDeviceMetricsOverride', { width, height: viewHeight, deviceScaleFactor: 1, mobile: width < 768 });
    // Reduced motion: counters land on their number and sliders hold still, so a shot shows the final state.
    await s('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: theme }, { name: 'prefers-reduced-motion', value: 'reduce' }] });
    await s('Page.addScriptToEvaluateOnNewDocument', { source:
        `try { ${theme === 'dark' ? "localStorage.setItem('nds-theme', 'dark')" : "localStorage.removeItem('nds-theme')"}
            for (const [k, v] of Object.entries(${JSON.stringify(storage)})) localStorage.setItem(k, typeof v === 'string' ? v : JSON.stringify(v)); } catch (e) {}
        document.addEventListener('securitypolicyviolation', (e) => (window.__ndsCsp = window.__ndsCsp || []).push(
            \`CSP \${e.effectiveDirective} blocked \${e.blockedURI || 'inline'} (from \${e.sourceFile || 'the page'}:\${e.lineNumber})\`));` });
    for (const c of cookies) await s('Network.setCookie', { url, ...c });
    if (faked.length) await s('Fetch.enable', { patterns: faked.map((f) => ({ urlPattern: `*${f}*` })) });

    const nav = await s('Page.navigate', { url });
    if (nav.errorText) errors.push(`load failed: ${nav.errorText}`);
    await Promise.race([onLoad, sleep(30000)]);
    // A script that throws (a state's run, the audit) is an error of the shot, never a silent undefined.
    const evaluate = async (expression) => {
        const { result, exceptionDetails } = await s('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
        if (!exceptionDetails) return result?.value;
        errors.push(`script failed: ${exceptionDetails.exception?.description || exceptionDetails.text}`);
    };
    // The reveal, the fonts and every stylesheet, so the icons and the audit read the real page.
    await evaluate(`(async () => {
        for (let i = 0; i < 100 && !document.documentElement.hasAttribute('data-nds-loaded'); i++) await new Promise((r) => setTimeout(r, 100));
        for (let i = 0; i < 50 && [...document.querySelectorAll('link[rel=stylesheet]')].some((l) => !l.sheet); i++) await new Promise((r) => setTimeout(r, 100));
        await document.fonts.ready;
        // An entrance animation still running shifts the shot.
        await ${SETTLED};
    })()`);
    await sleep(400);
    // Never captureBeyondViewport: it shifts an RTL page sideways. The viewport stretches to the page
    // instead, before the state's script: one that grows right after a menu opens can close it.
    // ponytail: a vh-sized box grows with it (an open dialog is shot at the screen's height instead);
    // scroll-and-stitch if another one ever misleads.
    let height = viewHeight, ran;
    // Grows until two readings agree: data that lands after load (a framework's fetch) grows the page late.
    const stretch = async () => {
        for (let i = 0, last = -1; i < 15; i++) {
            const { cssContentSize } = await s('Page.getLayoutMetrics');
            const h = Math.min(Math.ceil(cssContentSize.height), 8000);
            if (h === last) return;
            last = h;
            if (h > height) {
                height = h;
                await s('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 768 });
                // The whole page is in view now: what waited to be seen starts. Let it finish.
                await evaluate(`new Promise((r) => (window.requestIdleCallback || setTimeout)(r, { timeout: 3000 }))`);
            }
            await sleep(300);
        }
    };
    await stretch();
    // What started in that wait can shrink the page (a list splits into pages): measure once more from
    // the first height, or the shot ends in blank space. Not after the state's script: a resize can close a menu.
    if (height > viewHeight) {
        await s('Emulation.setDeviceMetricsOverride', { width, height: viewHeight, deviceScaleFactor: 1, mobile: width < 768 });
        const { cssContentSize } = await s('Page.getLayoutMetrics');
        height = Math.max(viewHeight, Math.min(Math.ceil(cssContentSize.height), 8000));
        await s('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 768 });
        await sleep(300);
        await stretch();
    }
    if (run) {
        ran = await evaluate(`(async () => { ${run} })()`);
        await sleep(400);
        // A first open can build its part on the click (a Filter menu, ~0.5 s): wait out the spinner.
        await evaluate(`(async () => { for (let i = 0; i < 30 && document.querySelector('[data-state~="loading"]'); i++) await new Promise((r) => setTimeout(r, 100)); })()`);
        await stretch();
    }
    // An open Modal or Panel is fixed to the viewport: a stretched one fills the whole page. Shoot the screen.
    if (height > viewHeight && await evaluate(`!!document.querySelector('dialog[open]')`)) {
        height = viewHeight;
        await s('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 768 });
        await sleep(300);
    }

    const status =await evaluate(`performance.getEntriesByType('navigation')[0]?.responseStatus || 0`);
    const revealed = await evaluate(`document.documentElement.hasAttribute('data-nds-loaded')`);
    const locale = await evaluate(`({ lang: document.documentElement.lang, dir: getComputedStyle(document.documentElement).direction })`);
    const innerWidth = await evaluate('innerWidth');
    const overflow = await evaluate('document.documentElement.scrollWidth - innerWidth');
    // A skeleton or spinner still on once the page settled: data that never came, or a stuck state.
    const loading = await evaluate(`[...document.querySelectorAll('.nds-loading, [data-state~="loading"]')]
        .filter((el) => el.checkVisibility ? el.checkVisibility() : el.offsetParent)
        .map((el) => el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + [...el.classList].slice(0, 2).map((c) => '.' + c).join(''))`);
    // A dialog open at load (a welcome or consent prompt) covers the page: the shot shows only it.
    const covered = !run && await evaluate(`!!document.querySelector('dialog[open]')`);
    // Text below WCAG AA contrast against the solid color behind it, in any theme. A canvas reads any CSS
    // color format. Text over an image or a gradient is skipped: its background is not one color.
    const faint = await evaluate(`(() => {
        const ctx = Object.assign(document.createElement('canvas'), { width: 1, height: 1 }).getContext('2d', { willReadFrequently: true });
        const toRgba = (color) => {
            ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = '#000'; ctx.fillStyle = color; ctx.fillRect(0, 0, 1, 1);
            const d = ctx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255];
        };
        const over = (top, under) => [0, 1, 2].map((i) => top[i] * top[3] + under[i] * (1 - top[3])).concat(1);
        const luminance = (c) => { const v = c.slice(0, 3).map((x) => (x /= 255) <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; };
        // The page canvas under every transparent layer: Chrome paints it dark under a dark color scheme.
        const canvas = /dark/.test(getComputedStyle(document.documentElement).colorScheme) ? [18, 18, 18, 1] : [255, 255, 255, 1];
        const backgrounds = new Map();
        const backgroundOf = (el) => {
            if (!el) return canvas;
            if (backgrounds.has(el)) return backgrounds.get(el);
            const style = getComputedStyle(el), own = toRgba(style.backgroundColor);
            let result = null;
            if (style.backgroundImage === 'none') {
                const under = own[3] < 1 ? backgroundOf(el.parentElement) : own;
                result = under && over(own, under);
            }
            backgrounds.set(el, result);
            return result;
        };
        // A picture laid under the text (a hero photo is an <img>, not a background) hides the real background:
        // look for one in the box whose solid color the text sits on.
        const hostOf = (el) => { for (let a = el; a; a = a.parentElement) { const s = getComputedStyle(a); if (s.backgroundImage !== 'none' || toRgba(s.backgroundColor)[3] >= 1) return a; } return document.documentElement; };
        const pictures = new Map();
        const picturesIn = (host) => pictures.get(host) || pictures.set(host, [...host.querySelectorAll('*')].filter((x) =>
            /^(IMG|VIDEO|CANVAS|PICTURE|IFRAME)$/.test(x.tagName) || getComputedStyle(x).backgroundImage !== 'none')).get(host);
        const isOverPicture = (el, rect) => picturesIn(hostOf(el)).some((x) => {
            if (x.contains(el) || el.contains(x)) return false;
            const r = x.getBoundingClientRect();
            return r.width > 1 && r.left < rect.right && r.right > rect.left && r.top < rect.bottom && r.bottom > rect.top;
        });
        const name = (el) => el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + [...el.classList].slice(0, 2).map((c) => '.' + c).join('');
        const seen = new Set(), out = [];
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        for (let node; (node = walker.nextNode());) {
            const el = node.parentElement;
            if (!el || seen.has(el) || !node.nodeValue.trim()) continue;
            seen.add(el);
            // Pale on purpose: disabled, or a skeleton that hides its glyphs.
            if (el.closest('script, style, template, [disabled], [aria-disabled="true"], .nds-loading, [data-state~="loading"]')) continue;
            const rect = el.getBoundingClientRect();
            if (rect.width <= 1 || rect.height <= 1 || !el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) continue;
            const style = getComputedStyle(el), text = toRgba(style.color);
            if (!text[3] || style.textShadow !== 'none') continue;
            const back = backgroundOf(el);
            if (!back || isOverPicture(el, rect)) continue;
            const a = luminance(over(text, back)), b = luminance(back);
            const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
            // WCAG AA: 3:1 for large text (24px, or 18.66px bold), 4.5:1 for the rest.
            const size = parseFloat(style.fontSize), isLarge = size >= 24 || (size >= 18.66 && +style.fontWeight >= 700);
            if (ratio < (isLarge ? 3 : 4.5)) out.push(name(el) + ' ' + ratio.toFixed(1) + ':1 ' + JSON.stringify(node.nodeValue.trim().slice(0, 30)));
        }
        return out;
    })()`);
    // A control another part lies over, at its center or near a corner. A fixed or sticky part (the FAB, a
    // sticky bar) floats on purpose, and a point an ancestor clips (a swiper's next slide) is hidden, not covered.
    const blocked = await evaluate(`(() => {
        const name = (el) => el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + [...el.classList].slice(0, 2).map((c) => '.' + c).join('');
        const isFloating = (el) => { for (let a = el; a; a = a.parentElement) if (/fixed|sticky/.test(getComputedStyle(a).position)) return true; return false; };
        const isClipped = (el, x, y) => { for (let a = el.parentElement; a; a = a.parentElement) {
            if (getComputedStyle(a).overflow === 'visible') continue;
            const r = a.getBoundingClientRect();
            if (x < r.left || x > r.right || y < r.top || y > r.bottom) return true;
        } return false; };
        // In a box that scrolls, the user can move it out from under an overlay (Scroll More's button over the last row).
        const isInScroller = (el) => { for (let a = el.parentElement; a; a = a.parentElement) {
            const s = getComputedStyle(a);
            if ((/auto|scroll/.test(s.overflowY) && a.scrollHeight > a.clientHeight) || (/auto|scroll/.test(s.overflowX) && a.scrollWidth > a.clientWidth)) return a !== document.scrollingElement;
        } return false; };
        const out = [];
        for (const el of document.querySelectorAll('a[href], button, [role="button"], input:not([type="hidden"]), select, textarea, summary')) {
            if (out.length >= 50) break;
            if (el.closest('[inert], [disabled], [aria-hidden="true"]') || !el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) continue;
            const r = el.getBoundingClientRect(), lines = el.getClientRects();
            if (r.width < 4 || r.height < 4 || isInScroller(el)) continue;
            // A link that wraps: its box spans both lines, so test the middle of each line instead.
            const points = lines.length > 1 ? [...lines].map((l) => [l.left + l.width / 2, l.top + l.height / 2, true])
                : [[0.5, 0.5], [0.25, 0.25], [0.75, 0.25], [0.25, 0.75], [0.75, 0.75]].map(([fx, fy]) => [r.left + r.width * fx, r.top + r.height * fy, fx === 0.5]);
            for (const [x, y, isMiddle] of points) {
                if (x < 0 || y < 0 || x > innerWidth || y > innerHeight || isClipped(el, x, y)) continue;
                const top = document.elementFromPoint(x, y);
                // Its own part, an ancestor (el takes no taps), or its label all reach it.
                if (!top || el.contains(top) || top.contains(el) || top.closest('label')?.control === el || isFloating(top)) continue;
                out.push(name(el) + ' under ' + name(top) + (isMiddle ? '' : ' (in part)'));
                break;
            }
        }
        return out;
    })()`);
    // Past the screen edge with no way to scroll to it: <main> clips sideways, so the overflow check above passes.
    const clipped = await evaluate(`(() => {
        const out = [];
        const isAny = (el, test) => { for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) if (test(getComputedStyle(a))) return true; return false; };
        for (const el of document.body.querySelectorAll('*')) {
            const r = el.getBoundingClientRect(), past = Math.round(Math.max(r.right - innerWidth, -r.left));
            if (past <= 1 || r.width <= 1 || r.height <= 1 || out.length > 200) continue;
            if (!(el.checkVisibility ? el.checkVisibility({ visibilityProperty: true }) : el.offsetParent)) continue;
            // Off the edge on purpose: inside a scroller (a table, a swiper), or fixed (a closed panel waits off-screen).
            const style = getComputedStyle(el);
            if (style.position === 'fixed' || isAny(el, (s) => /auto|scroll/.test(s.overflowX) || s.position === 'fixed')) continue;
            out.push([el, past]);
        }
        const name = (el) => el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + [...el.classList].slice(0, 2).map((c) => '.' + c).join('');
        // The outermost only: what it holds is cut because it is. Its deepest part that reaches as far is the cause.
        return out.filter(([el]) => !out.some(([o]) => o !== el && o.contains(el))).map(([el, px]) => {
            const cause = out.filter(([o, p]) => p === px && el.contains(o)).pop()[0];
            return name(el) + ' by ' + px + 'px' + (cause === el ? '' : ' (widened by ' + name(cause) + ')');
        });
    })()`);
    // The console's CSP lines name no source and carry a fresh nonce per load; the event names the script.
    const csp = (await evaluate('window.__ndsCsp || []')) || [];
    // The stretch moves parts that follow the viewport (the FAB tucks or returns): a shot taken
    // mid-slide differs from run to run.
    await evaluate(SETTLED);
    const data = shot ? (await s('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width, height, scale: 1 } })).data : '';
    // After the shot: the audit loads its own bundle into the page.
    const findings = audit ? (await evaluate(`(async () => {
        const init = window.NDS?.init || window.NDS?.Init; // NDS.Init before 2.0
        if (!init?.audit) return null;
        const at = (el) => el?.tagName ? ' [' + el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + [...el.classList].slice(0, 3).map((c) => '.' + c).join('') + ']' : '';
        return ((await init.audit()) || []).map((f) => \`\${f.severity} \${f.rule}\${at(f.el)}: \${f.message}\${f.fix ? ' ' + f.fix : ''}\`);
    })()`)) ?? null : [];
    // A part still alive on an element off the page left without NDS.init.destroy: its listeners hold it.
    let leaks = [];
    if (audit) {
        await s('HeapProfiler.collectGarbage');
        const { result: proto } = await s('Runtime.evaluate', { expression: 'Element.prototype' });
        const { objects } = await s('Runtime.queryObjects', { prototypeObjectId: proto.objectId });
        const { result } = await s('Runtime.callFunctionOn', { objectId: objects.objectId, returnByValue: true, functionDeclaration: `function () {
            const out = [];
            for (const el of this) {
                let keys;
                try { if (el.isConnected) continue; keys = Object.keys(el); } catch (e) { continue; } // a prototype
                for (const k of keys) if (k.startsWith('nds') && typeof el[k]?.destroy === 'function')
                    out.push(k + ' on ' + el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + [...el.classList].slice(0, 2).map((c) => '.' + c).join(''));
            }
            return out;
        }` });
        leaks = result.value || [];
    }
    handlers.delete(sessionId);
    await send('Target.closeTarget', { targetId });
    await send('Target.disposeBrowserContext', { browserContextId }).catch(() => {});
    return { png: Buffer.from(data, 'base64'), status, revealed, innerWidth, overflow, loading, covered, clipped, faint, blocked, ...locale, ran,
        errors: [...errors.filter((e) => !/\[NDS\.[aA]udit\]|Content Security Policy/.test(String(e))), ...csp], findings, leaks };
}

// --- run --------------------------------------------------------------------------------------
const slug = (t) => t.replace(/^\/+|\/+$/g, '').replace(/[^\w.-]+/g, '-') || 'home';
const problems = [];
const report = [];
// Another theme breaks on the site's own colors, not per state or width: only a page's first state
// takes it, at the widest width.
const WIDEST = Math.max(...WIDTHS);
const colsOf = (first) => WIDTHS.flatMap((w) => THEMES.map((t) => ({ w, t }))).filter(({ w, t }) => t === THEMES[0] || (first && w === WIDEST));
// Runs the jobs JOBS at a time; results keep the jobs' order.
const pool = async (jobs) => {
    const out = [];
    let next = 0;
    await Promise.all(Array.from({ length: Math.min(JOBS, jobs.length) }, async () => {
        while (next < jobs.length) { const i = next++; out[i] = await jobs[i](); }
    }));
    return out;
};
// A reference shot is taken once per run for each page, width, theme, lang and dir: states share it.
const refShot = new Map();
const reference = (ref, w, t, { lang, dir }) => {
    const key = `${ref}|${w}|${t}|${lang}|${dir}`;
    const q = new URLSearchParams({ 'nds-lang': lang, 'nds-dir': dir });
    if (!refShot.has(key)) refShot.set(key, shoot(`${LOCAL}/${ref.replace(/^\/+/, '')}?${q}`, { width: w, theme: t }));
    return refShot.get(key);
};
try {
    // The pages first: each state's reference takes the lang and direction its page showed.
    const states = PAGES.flatMap((pg) => (pg.states || [{ name: 'default' }]).map((st, n) => ({ pg, st, cols: colsOf(n === 0) })));
    const shots = await pool(states.flatMap(({ pg, st, cols }) =>
        cols.map(({ w, t }) => () => shoot(BASE + (st.path || pg.path), { ...st, width: w, theme: t, audit: true, shot: !TEXT }))));
    // Each state takes its own count of shots, in order.
    const deal = (list, all, key) => { let at = 0; list.forEach((s) => { s[key] = all.slice(at, at += s.cols.length); }); };
    deal(states, shots, 'shots');
    // --text: no sheets, so no reference shots.
    const withRef = TEXT ? [] : states.filter(({ pg }) => pg.reference);
    const refs = await pool(withRef.flatMap(({ pg, cols, shots: [first] }) =>
        cols.map(({ w, t }) => () => reference(pg.reference, w, t, { lang: first.lang || '', dir: first.dir === 'rtl' ? 'rtl' : 'ltr' }))));
    deal(withRef, refs, 'refs');
    const sheets = [], told = new Set();
    for (const pg of PAGES) {
        const dir = join(OUT, slug(pg.path));
        // A page's last run goes; with --only, the other pages' sheets stay. --text keeps them all: they are the look it checked last.
        if (!TEXT) {
            rmSync(dir, { recursive: true, force: true });
            mkdirSync(dir, { recursive: true });
        }
        const rows = [];
        for (const { st, shots, refs, cols } of states.filter((s) => s.pg === pg)) {
            const at = `${pg.path} [${st.name}]`;
            let ref = null;
            if (refs) {
                const { lang, dir: refDir } = refs[0], cells = [];
                cols.forEach(({ w, t }, i) => {
                    const r = refs[i];
                    const file = `reference-${lang || 'nolang'}-${refDir || 'ltr'}-${w}-${t}.png`;
                    writeFileSync(join(dir, file), r.png);
                    cells.push(file);
                    // States share a reference shot: name its problem once.
                    if (told.has(r)) return;
                    told.add(r);
                    if (r.status >= 400 || !r.status) problems.push(`${at}: reference ${pg.reference} did not load (${r.status})`);
                    else if (r.revealed === false) problems.push(`${at} ${w}px ${t}: the reference never revealed (no data-nds-loaded): its assets did not load, so the sheet shows a blank reference. Point NDS_SITE at a release's _site.`);
                    else if (r.dir !== shots[i].dir) problems.push(`${at} ${w}px ${t}: the reference is ${r.dir}, the page ${shots[i].dir}: the reference could not take the page's direction`);
                });
                ref = { name: `reference: ${pg.reference}${lang ? ` (${lang}, ${refDir})` : ` (${refDir})`}`, cells };
            }
            const cells = [], seen = new Map(), returned = new Map();
            const note = (kind, text, shot, map = seen) => {
                // An audit line carries its fix: it runs longer than an error line.
                const key = `${kind}: ${String(text).replace(/nonce-[\w+/=-]+/g, 'nonce-…').slice(0, kind === 'audit' ? 700 : 300)}`;
                (map.get(key) || map.set(key, new Set()).get(key)).add(shot);
            };
            for (const [i, { w, t }] of cols.entries()) {
                const r = shots[i];
                const file = `${slug(st.name)}-${w}-${t}.png`;
                if (!TEXT) writeFileSync(join(dir, file), r.png);
                cells.push(file);
                const shot = `${w}px ${t}`;
                if (r.innerWidth !== w) problems.push(`${at} ${shot}: innerWidth ${r.innerWidth}, not ${w}: the shot is not that width`);
                if (!r.status || r.status >= 400) problems.push(`${at} ${shot}: HTTP ${r.status}`);
                if (!r.revealed) problems.push(`${at} ${shot}: the page never revealed (no data-nds-loaded)`);
                if (r.overflow > 1) note('layout', `the page is ${r.overflow}px wider than the viewport (sideways scroll)`, shot);
                if (r.loading?.length) note('loading', `${r.loading.length} part(s) still loading after the page settled: ${r.loading.slice(0, 5).join(', ')}${r.loading.length > 5 ? ', …' : ''}. Fix the data or state that holds them, or name the state if it shows loading on purpose`, shot);
                if (r.clipped?.length) note('layout', `${r.clipped.length} part(s) reach past the screen edge and are cut off, with no way to scroll to them: ${r.clipped.slice(0, 5).join(', ')}${r.clipped.length > 5 ? ', …' : ''}`, shot);
                if (r.faint?.length) note('contrast', `${r.faint.length} text(s) fall below WCAG AA contrast against the color behind them (4.5:1, or 3:1 for large text): ${r.faint.slice(0, 5).join(', ')}${r.faint.length > 5 ? ', …' : ''}`, shot);
                if (r.blocked?.length) note('layout', `${r.blocked.length} control(s) lie under another part, so it hides them and takes their taps: ${r.blocked.slice(0, 5).join(', ')}${r.blocked.length > 5 ? ', …' : ''}`, shot);
                if (r.covered) note('covered', 'a dialog is open after load, so the shot shows only it: add a state whose run closes it, to check the page under it', shot);
                if (r.findings === null) note('audit', 'unavailable (no NDS.init.audit)', shot);
                (r.findings || []).forEach((f) => note('audit', f, shot));
                r.errors.forEach((e) => note('error', e, shot));
                // A kept-alive view is off the page on purpose: "kept": true lists its parts in the report instead.
                if (r.leaks?.length) note(st.kept ? 'kept' : 'leak', `${r.leaks.length} NDS part(s) off the page but alive, so their view left without NDS.init.destroy(view): ${r.leaks.slice(0, 5).join(', ')}${r.leaks.length > 5 ? ', …' : ''}`, shot, st.kept ? returned : seen);
                if (r.ran !== undefined) note('run returned', JSON.stringify(r.ran), shot, returned);
            }
            // Each distinct line once per state, with the shots it showed in.
            const where = (hits) => hits.size === cols.length ? 'every shot' : [...hits].join(', ');
            for (const [key, hits] of returned) report.push(`${at} ${key} (${where(hits)})`);
            for (const [key, hits] of seen) problems.push(`${at} ${key} (${where(hits)})`);
            rows.push({ name: st.name, cells, ref, cols });
        }
        // One sheet per state, the reference row above it (a sheet of every state shrinks too far
        // to read): a column per shot, shown at 3/8 size. Agents skipped sheets when each held four
        // shots (rigs 4, 5, 9, 10).
        const scale = 0.375;
        // A row shows 1400px of sheet, about 3,700px of page: a taller page takes more sheets, one slice each,
        // so the bottom is never cut and no sheet grows too tall to read.
        const slice = 1400;
        const pngHeight = (file) => readFileSync(join(dir, file)).readUInt32BE(20) * scale;
        for (const r of TEXT ? [] : rows) {
            const { cols } = r, shown = [...cols.keys()];
            const head = shown.map((i) => `<th>${cols[i].w}px ${cols[i].t}</th>`).join('');
            const row = (x, part) => `<tr><th>${x.name}</th>${shown.map((i) =>
                `<td><div style="width:${cols[i].w * scale}px"><img src="${x.cells[i]}" style="width:100%; margin-top:-${part * slice}px"></div></td>`).join('')}</tr>`;
            const sheetWidth = Math.ceil(shown.reduce((sum, i) => sum + cols[i].w * scale + 10, 160));
            const tallest = Math.max(...[r, r.ref].filter(Boolean).flatMap((x) => shown.map((i) => pngHeight(x.cells[i]))));
            const parts = Math.max(1, Math.ceil(tallest / slice));
            for (let part = 0; part < parts; part++) {
                const name = `sheet-${slug(r.name)}${part ? `-${part + 1}` : ''}`;
                const title = `${pg.path}: ${r.name}${parts > 1 ? ` (part ${part + 1} of ${parts})` : ''}`;
                // data-nds-loaded up front: the shot's reveal wait would otherwise run out its 10 s.
                writeFileSync(join(dir, `${name}.html`), `<!doctype html><html data-nds-loaded><meta charset="utf-8"><style>
                    body { margin: 8px; font: 13px system-ui; background: #fff } table { border-collapse: collapse }
                    th, td { border: 1px solid #ccc; padding: 4px; vertical-align: top; text-align: start }
                    td div { max-height: ${slice}px; overflow: hidden }</style>
                    <h1 style="font-size:16px">${title}</h1><table><tr><th></th>${head}</tr>${r.ref ? row(r.ref, part) : ''}${row(r, part)}</table>`);
                sheets.push(async () => {
                    const sheet = await shoot(`${LOCAL}/__out/${slug(pg.path)}/${name}.html`, { width: sheetWidth, theme: 'light' });
                    writeFileSync(join(dir, `${name}.png`), sheet.png);
                });
                report.push(`${pg.path} [${r.name}${parts > 1 ? `, part ${part + 1} of ${parts}` : ''}] sheet: ${join(dir, `${name}.png`)}`);
            }
        }
    }
    await pool(sheets);
} catch (e) {
    // The report still gets written: a run that stops says why, never ends silent.
    problems.push(`run stopped: ${e.message}`);
} finally {
    server.close();
    // Chrome still holds profile files for a moment after kill(): on Windows the delete fails, so wait it out.
    if (chrome.exitCode === null) await new Promise((r) => { chrome.once('exit', r); chrome.kill(); });
    try { rmSync(profile, { recursive: true, force: true }); } catch {}
}

writeFileSync(join(OUT, 'report.txt'), report.join('\n') + '\n\nProblems:\n' + (problems.join('\n') || 'none') + '\n');
console.log(report.join('\n'));
console.log(`\n${problems.length ? `${problems.length} problem(s):\n${problems.join('\n')}` : 'No problems found by script.'}`);
const sheetCount = report.filter((line) => line.includes('] sheet: ')).length;
if (TEXT) console.log(`\nText only: no shots and no sheets. The sheets in ${OUT} are from the last full run.`);
else console.log(`\nOutput: ${OUT}\nNow open all ${sheetCount} sheet-*.png listed above and compare each state with the reference row above it.\n` +
    `A sheet shrinks each shot: for detail, open the state's own <state>-<width>-<theme>.png beside its reference-…-<width>-<theme>.png, never another browser.`);
// Agents stop a `whole plan` run after its first page (rigs 4 and 5), and keep NDS findings in the
// plan instead of the report (rigs 4, 8 and 3): say both where they stop.
const planPath = [process.cwd(), dirname(HERE)].map((d) => join(d, 'NDS-PLAN.md')).find(existsSync);
const plan = planPath ? readFileSync(planPath, 'utf8') : '';
const rows = plan.split('\n').filter((l) => l.startsWith('|')).map((l) => l.split('|').map((c) => c.replace(/[*`]/g, '').trim()));
const open = rows.filter((cells) => cells.includes('Planned') || cells.includes('In Progress'));
const done = rows.filter((cells) => cells.includes('Awaiting Verification') || cells.includes('Built and Verified'));
if (open.length && /pacing[^\n]*whole plan/i.test(plan)) console.log(`\nPacing is whole plan, and ${open.length} plan row(s) are still Planned or In Progress (next: ${open[0][1]}). ` +
    'Unless the dev told you to stop, finish this page, then build the next row in this same turn: whole plan stops only when every row is Awaiting Verification or blocked.');
// From the last open row on: agents mark that row done after this check, so "none open" never shows (rig 5 run 22).
if (open.length <= 1 && done.length) console.log(`\n${open.length ? 'One plan row is still open: this may be the last page.' : 'Every plan row is Awaiting Verification.'} ` +
    'Before you end the run, file each NDS finding (a missing API or event, a doc or canon contradiction, a reproducible bug, a rule gap) in NDS-REPORT.md, not only in the plan.');
process.exit(problems.length ? 1 : 0);
