// NDS verify: both browser passes for every page and state, in one run.
//
//   node nds-verify.mjs <config.json> [--out <dir>] [--only <path>,…] [--jobs <n>]
//
// --only checks just the pages whose path holds one of the texts: after a fix, re-check that
// page alone (write `nds/cart`, not `/nds/cart`: Git Bash turns a leading slash into a Windows
// path). --jobs sets how many shots run at once (default: half the cores, 2 to 8). A reference
// shot is kept between runs.
//
// Needs Node 18+ and Chrome or Edge (or CHROME_PATH). Installs nothing: it drives the browser
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
//         { "name": "empty", "path": "/cart?account=empty" },
//         { "name": "failed", "fail": "/api/cart" },           every request whose URL holds it fails
//         { "name": "open menu", "run": "document.querySelector('.nds-btn').click()" }
//       ]
//     }]
//   }
//
// Writes, per page: each state at each width and theme, and per state a sheet-<state>.png that
// shows it under the reference. The reference takes the state's lang and direction, so an Arabic
// page compares with a right-to-left reference in Arabic. Prints the audit findings, console errors (a CSP one names its
// source), failed loads, sideways scroll and a wrong window.innerWidth; exits 1 when there is
// any. Inspect every sheet: the script cannot judge the look.
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { cpus, tmpdir } from 'node:os';
import { dirname, extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const flag = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
const configPath = args.find((a, i) => !a.startsWith('--') && !args[i - 1]?.startsWith('--'));
if (!configPath) { console.error('Usage: node nds-verify.mjs <config.json> [--out <dir>] [--only <path>,…] [--jobs <n>]'); process.exit(2); }
const config = JSON.parse(readFileSync(configPath, 'utf8'));
const OUT = resolve(flag('--out') || mkdtempSync(join(tmpdir(), 'nds-verify-')));
const ONLY = flag('--only')?.split(',').filter(Boolean);
const JOBS = Math.max(1, Number(flag('--jobs')) || Math.min(8, Math.max(2, cpus().length >> 1)));
const PAGES = config.pages.filter((p) => !ONLY || ONLY.some((o) => p.path.includes(o)));
if (!PAGES.length) { console.error(`No page path holds ${ONLY.join(' or ')}.`); process.exit(2); }
const SITE = resolve(process.env.NDS_SITE || join(HERE, '_site'));
if (PAGES.some((p) => p.reference) && !existsSync(SITE)) {
    console.error(`No built site at ${SITE}: run this copy from the template folder, or set NDS_SITE.`); process.exit(2);
}
const CACHE = join(tmpdir(), 'nds-verify-cache');
mkdirSync(CACHE, { recursive: true });
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
const CHROME = [process.env.CHROME_PATH,
    `${pf}/Google/Chrome/Application/chrome.exe`, `${pf86}/Google/Chrome/Application/chrome.exe`,
    `${pf86}/Microsoft/Edge/Application/msedge.exe`, `${pf}/Microsoft/Edge/Application/msedge.exe`,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/microsoft-edge',
].find((p) => p && existsSync(p));
if (!CHROME) { console.error('No Chrome or Edge found: set CHROME_PATH.'); process.exit(2); }
const profile = mkdtempSync(join(tmpdir(), 'nds-verify-profile-'));
// From an admin shell, Chrome and Edge relaunch themselves de-elevated: the relaunch drops every flag
// (headless, profile, pipe) and opens a window in the user's own profile. These two stop it.
const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-pipe', `--user-data-dir=${profile}`,
    '--disable-features=AutoDeElevate', '--edge-skip-compat-layer-relaunch',
    '--no-first-run', '--no-default-browser-check', '--hide-scrollbars', 'about:blank'],
    { stdio: ['ignore', 'ignore', 'ignore', 'pipe', 'pipe'] });

let nextId = 1, buffer = '';
const pending = new Map(), handlers = new Map();
chrome.stdio[4].on('data', (chunk) => {
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
const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
    const id = nextId++;
    pending.set(id, { resolve, reject });
    chrome.stdio[3].write(JSON.stringify({ id, method, params, sessionId }) + '\0');
});
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// One fresh tab in its own context per shot: no cookie or storage leaks into a shot running beside it.
async function shoot(url, { width, theme, cookies = [], fail, run, audit }) {
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
        else if (method === 'Log.entryAdded' && p.entry.level === 'error' && !(fail && p.entry.url?.includes(fail))) errors.push(p.entry.text + (p.entry.url ? ` (${p.entry.url})` : ''));
        else if (method === 'Fetch.requestPaused') s('Fetch.failRequest', { requestId: p.requestId, errorReason: 'Failed' });
    });
    await Promise.all(['Page.enable', 'Runtime.enable', 'Log.enable', 'Network.enable'].map((m) => s(m)));
    const viewHeight = width < 768 ? 844 : 900;
    await s('Emulation.setDeviceMetricsOverride', { width, height: viewHeight, deviceScaleFactor: 1, mobile: width < 768 });
    await s('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: theme }] });
    await s('Page.addScriptToEvaluateOnNewDocument', { source:
        `try { ${theme === 'dark' ? "localStorage.setItem('nds-theme', 'dark')" : "localStorage.removeItem('nds-theme')"} } catch (e) {}
        document.addEventListener('securitypolicyviolation', (e) => (window.__ndsCsp = window.__ndsCsp || []).push(
            \`CSP \${e.effectiveDirective} blocked \${e.blockedURI || 'inline'} (from \${e.sourceFile || 'the page'}:\${e.lineNumber})\`));` });
    for (const c of cookies) await s('Network.setCookie', { url, ...c });
    if (fail) await s('Fetch.enable', { patterns: [{ urlPattern: `*${fail}*` }] });

    const nav = await s('Page.navigate', { url });
    if (nav.errorText) errors.push(`load failed: ${nav.errorText}`);
    await Promise.race([onLoad, sleep(30000)]);
    const evaluate = async (expression) => (await s('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result.value;
    // The reveal, the fonts and every stylesheet, so the icons and the audit read the real page.
    await evaluate(`(async () => {
        for (let i = 0; i < 100 && !document.documentElement.hasAttribute('data-nds-loaded'); i++) await new Promise((r) => setTimeout(r, 100));
        for (let i = 0; i < 50 && [...document.querySelectorAll('link[rel=stylesheet]')].some((l) => !l.sheet); i++) await new Promise((r) => setTimeout(r, 100));
        await document.fonts.ready;
        // An entrance animation still running shifts the shot; endless ones (a skeleton pulse) never end.
        const finite = document.getAnimations().filter((a) => a.effect?.getTiming().iterations !== Infinity);
        await Promise.race([Promise.allSettled(finite.map((a) => a.finished)), new Promise((r) => setTimeout(r, 3000))]);
    })()`);
    await sleep(400);
    // Never captureBeyondViewport: it shifts an RTL page sideways. The viewport stretches to the page
    // instead, before the state's script: one that grows right after a menu opens can close it.
    // ponytail: a vh-sized box grows with it; scroll-and-stitch if that ever misleads.
    let height = viewHeight;
    const stretch = async () => {
        const { cssContentSize } = await s('Page.getLayoutMetrics');
        const h = Math.min(Math.ceil(cssContentSize.height), 8000);
        if (h <= height) return;
        height = h;
        await s('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 768 });
        // The whole page is in view now: what waited to be seen starts. Let it finish.
        await evaluate(`new Promise((r) => (window.requestIdleCallback || setTimeout)(r, { timeout: 3000 }))`);
        await sleep(300);
    };
    await stretch();
    if (run) {
        await evaluate(`(async () => { ${run} })()`);
        await sleep(400);
        // A first open can build its part on the click (a Filter menu, ~0.5 s): wait out the spinner.
        await evaluate(`(async () => { for (let i = 0; i < 30 && document.querySelector('[data-state~="loading"]'); i++) await new Promise((r) => setTimeout(r, 100)); })()`);
        await stretch();
    }

    const status = await evaluate(`performance.getEntriesByType('navigation')[0]?.responseStatus || 0`);
    const revealed = await evaluate(`document.documentElement.hasAttribute('data-nds-loaded')`);
    const locale = await evaluate(`({ lang: document.documentElement.lang, dir: getComputedStyle(document.documentElement).direction })`);
    const innerWidth = await evaluate('innerWidth');
    const overflow = await evaluate('document.documentElement.scrollWidth - innerWidth');
    // The console's CSP lines name no source and carry a fresh nonce per load; the event names the script.
    const csp = (await evaluate('window.__ndsCsp || []')) || [];
    const { data } = await s('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width, height, scale: 1 } });
    // After the shot: the audit loads its own bundle into the page.
    const findings = audit ? await evaluate(`(async () => {
        if (!window.NDS?.Init?.audit) return null;
        return ((await NDS.Init.audit()) || []).map((f) => \`\${f.severity} \${f.rule}: \${f.message}\`);
    })()`) : [];
    handlers.delete(sessionId);
    await send('Target.closeTarget', { targetId });
    await send('Target.disposeBrowserContext', { browserContextId }).catch(() => {});
    return { png: Buffer.from(data, 'base64'), status, revealed, innerWidth, overflow, ...locale,
        errors: [...errors.filter((e) => !/\[NDS\.Audit\]|Content Security Policy/.test(String(e))), ...csp], findings };
}

// --- run --------------------------------------------------------------------------------------
const slug = (t) => t.replace(/^\/+|\/+$/g, '').replace(/[^\w.-]+/g, '-') || 'home';
const problems = [];
const report = [];
const cols = WIDTHS.flatMap((w) => THEMES.map((t) => ({ w, t })));
// Runs the jobs JOBS at a time; results keep the jobs' order.
const pool = async (jobs) => {
    const out = [];
    let next = 0;
    await Promise.all(Array.from({ length: Math.min(JOBS, jobs.length) }, async () => {
        while (next < jobs.length) { const i = next++; out[i] = await jobs[i](); }
    }));
    return out;
};
// A reference shot is taken once per page, width and theme, and kept until that page's file changes.
// ponytail: keyed on the page file only; a changed asset under the same _site needs the cache cleared.
const refShot = new Map();
const reference = (ref, w, t, { lang, dir }) => {
    const key = `${ref}|${w}|${t}|${lang}|${dir}`;
    if (!refShot.has(key)) refShot.set(key, (async () => {
        const file = join(SITE, normalize(ref));
        const stamp = existsSync(file) ? statSync(file).mtimeMs : 0;
        const cached = join(CACHE, createHash('sha1').update(`${SITE}|${key}|${stamp}`).digest('hex') + '.png');
        if (existsSync(cached)) return { png: readFileSync(cached), status: 200, lang, dir };
        const q = new URLSearchParams({ 'nds-lang': lang, 'nds-dir': dir });
        const r = await shoot(`${LOCAL}/${ref.replace(/^\/+/, '')}?${q}`, { width: w, theme: t });
        if (r.status && r.status < 400 && r.dir === dir) writeFileSync(cached, r.png);
        return r;
    })());
    return refShot.get(key);
};
try {
    // The pages first: each state's reference takes the lang and direction its page showed.
    const states = PAGES.flatMap((pg) => (pg.states || [{ name: 'default' }]).map((st) => ({ pg, st })));
    const shots = await pool(states.flatMap(({ pg, st }) =>
        cols.map(({ w, t }) => () => shoot(BASE + (st.path || pg.path), { ...st, width: w, theme: t, audit: true }))));
    states.forEach((s, i) => { s.shots = shots.slice(i * cols.length, (i + 1) * cols.length); });
    const withRef = states.filter(({ pg }) => pg.reference);
    const refs = await pool(withRef.flatMap(({ pg, shots: [first] }) =>
        cols.map(({ w, t }) => () => reference(pg.reference, w, t, { lang: first.lang || '', dir: first.dir === 'rtl' ? 'rtl' : 'ltr' }))));
    withRef.forEach((s, i) => { s.refs = refs.slice(i * cols.length, (i + 1) * cols.length); });
    const sheets = [];
    for (const pg of PAGES) {
        const dir = join(OUT, slug(pg.path));
        mkdirSync(dir, { recursive: true });
        const rows = [];
        for (const { st, shots, refs } of states.filter((s) => s.pg === pg)) {
            const at = `${pg.path} [${st.name}]`;
            let ref = null;
            if (refs) {
                const { lang, dir: refDir } = refs[0], cells = [];
                cols.forEach(({ w, t }, i) => {
                    const r = refs[i];
                    const file = `reference-${lang || 'nolang'}-${refDir || 'ltr'}-${w}-${t}.png`;
                    writeFileSync(join(dir, file), r.png);
                    cells.push(file);
                    if (r.status >= 400 || !r.status) problems.push(`${at}: reference ${pg.reference} did not load (${r.status})`);
                    else if (r.dir !== shots[i].dir) problems.push(`${at} ${w}px ${t}: the reference is ${r.dir}, the page ${shots[i].dir}: the reference could not take the page's direction`);
                });
                ref = { name: `reference: ${pg.reference}${lang ? ` (${lang}, ${refDir})` : ` (${refDir})`}`, cells };
            }
            const cells = [], seen = new Map();
            const note = (kind, text, shot) => {
                const key = `${kind}: ${String(text).replace(/nonce-[\w+/=-]+/g, 'nonce-…').slice(0, 300)}`;
                (seen.get(key) || seen.set(key, new Set()).get(key)).add(shot);
            };
            for (const [i, { w, t }] of cols.entries()) {
                const r = shots[i];
                const file = `${slug(st.name)}-${w}-${t}.png`;
                writeFileSync(join(dir, file), r.png);
                cells.push(file);
                const shot = `${w}px ${t}`;
                report.push(`${at} ${shot}: HTTP ${r.status}, innerWidth ${r.innerWidth}, ` +
                    (r.findings === null ? 'audit unavailable (no NDS.Init.audit)' : `audit ${r.findings.length}`) +
                    `, errors ${r.errors.length}${r.revealed ? '' : ', NOT REVEALED'}`);
                if (r.innerWidth !== w) problems.push(`${at} ${shot}: innerWidth ${r.innerWidth}, not ${w}: the shot is not that width`);
                if (!r.status || r.status >= 400) problems.push(`${at} ${shot}: HTTP ${r.status}`);
                if (!r.revealed) problems.push(`${at} ${shot}: the page never revealed (no data-nds-loaded)`);
                if (r.overflow > 1) note('layout', `the page is ${r.overflow}px wider than the viewport (sideways scroll)`, shot);
                (r.findings || []).forEach((f) => note('audit', f, shot));
                r.errors.forEach((e) => note('error', e, shot));
            }
            // Each distinct finding once per state, with the shots it showed in.
            for (const [key, hits] of seen) {
                const where = hits.size === cols.length ? 'every shot' : [...hits].join(', ');
                report.push(`    ${key} (${where})`);
                problems.push(`${at} ${key.slice(0, 160)} (${where})`);
            }
            rows.push({ name: st.name, cells, ref });
        }
        // One sheet per state, the reference row above it (a sheet of every state shrinks too far
        // to read): a column per width and theme, shown at 3/8 size.
        const scale = 0.375;
        const head = cols.map(({ w, t }) => `<th>${w}px ${t}</th>`).join('');
        const row = (r) => `<tr><th>${r.name}</th>${r.cells.map((c, i) =>
            `<td><div style="width:${cols[i].w * scale}px"><img src="${c}" style="width:100%"></div></td>`).join('')}</tr>`;
        const sheetWidth = Math.ceil(cols.reduce((n, { w }) => n + w * scale + 10, 160));
        for (const r of rows) {
            const name = `sheet-${slug(r.name)}`;
            writeFileSync(join(dir, `${name}.html`), `<!doctype html><meta charset="utf-8"><style>
                body { margin: 8px; font: 13px system-ui; background: #fff } table { border-collapse: collapse }
                th, td { border: 1px solid #ccc; padding: 4px; vertical-align: top; text-align: start }
                td div { max-height: 1400px; overflow: hidden }</style>
                <h1 style="font-size:16px">${pg.path}: ${r.name}</h1><table><tr><th></th>${head}</tr>${r.ref ? row(r.ref) : ''}${row(r)}</table>`);
            sheets.push(async () => {
                const sheet = await shoot(`${LOCAL}/__out/${slug(pg.path)}/${name}.html`, { width: sheetWidth, theme: 'light' });
                writeFileSync(join(dir, `${name}.png`), sheet.png);
            });
            report.push(`${pg.path} [${r.name}]: ${join(dir, `${name}.png`)}`);
        }
    }
    await pool(sheets);
} finally {
    chrome.kill();
    server.close();
    try { rmSync(profile, { recursive: true, force: true }); } catch {}
}

writeFileSync(join(OUT, 'report.txt'), report.join('\n') + '\n\nProblems:\n' + (problems.join('\n') || 'none') + '\n');
console.log(report.join('\n'));
console.log(`\n${problems.length ? `${problems.length} problem(s):\n${problems.join('\n')}` : 'No problems found by script.'}`);
console.log(`\nOutput: ${OUT}\nNow open every sheet-*.png and compare the state with the reference row above it.`);
process.exit(problems.length ? 1 : 0);
