#!/usr/bin/env node
/**
 * NDS public-surface banner checker (PERSONA entry 7, JSD-20).
 *
 *   node scripts/check-banners.mjs --verify <file>    check one file's banner
 *   node scripts/check-banners.mjs --all              check every in-scope file, one name per component
 *                                                     (entry 9), and every NDS.X.method / nds:x:y caller
 *   node scripts/check-banners.mjs --generate <file>  print a banner skeleton to stdout
 *
 * Never writes files. Exit 0 = clean, 1 = findings, 2 = usage error.
 * Imported, it runs nothing and exports SCOPE and extractKeys (check-js-rules.mjs reads the surfaces).
 */
// ponytail: line-regex parser, not an AST — brace/comment tracking is line-local, so a brace
// inside a multi-line string, a computed key, or an early `return {` in an IIFE can misparse.
// Upgrade path: an acorn walk over the namespace object if a surface outgrows the regexes.

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { basename, join, resolve as resolvePath } from 'node:path';
import { fileURLToPath } from 'node:url';
import { REPO, DOC_SHELVES, PAGE_DIRS, loaderNames, kebab } from './lib/nds-source.mjs';

// The single source of truth for which files carry a banner: every component, plus core, loader,
// accessibility, theme and the shared internals (backdrop, dialog, date). ns = the NDS.<Name> namespace Methods verify against; null =
// multi-namespace file (core) — its banner Methods verify existence-only.
// Exclusions live in EXCLUDED below, not in this comment: --all asserts SCOPE ∪ EXCLUDED
// covers _js/ exactly, so a new component cannot be silently skipped (nds-password.js was,
// for three days — it shipped after the rollout and nothing noticed).
const SCOPE = [
    ['nds-accessibility.js', 'Accessibility'],
    ['nds-accordion.js', 'Accordion'],
    ['nds-alert.js', 'Alert'],
    ['nds-audit.js', 'audit'],
    ['nds-autocomplete.js', 'Autocomplete'],
    ['nds-backdrop.js', 'Backdrop'],
    ['nds-breadcrumb.js', 'Breadcrumb'],
    ['nds-chart.js', 'Chart'],
    ['nds-city-weather.js', 'CityWeather'],
    ['nds-code.js', 'Code'],
    ['nds-consent.js', 'consent'],
    ['nds-cookies.js', 'Cookies'],
    ['nds-cooldown.js', 'Cooldown'],
    ['nds-copy.js', 'Copy'],
    ['nds-countdown.js', 'Countdown'],
    ['nds-core.js', null],
    ['nds-custom-select.js', 'CustomSelect'],
    ['nds-date.js', 'Date'],
    ['nds-date-picker.js', 'DatePicker'],
    ['nds-dialog.js', 'dialog'],
    ['nds-digital-stamp.js', 'DigitalStamp'],
    ['nds-drawer.js', 'Drawer'],
    ['nds-dropmenu.js', 'Dropmenu'],
    ['nds-editor.js', 'Editor'],
    ['nds-empty.js', 'Empty'],
    ['nds-grid.js', 'Grid'],
    ['nds-expandable.js', 'Expandable'],
    ['nds-export.js', 'Export'],
    ['nds-fab.js', 'Fab'],
    ['nds-feedback.js', 'Feedback'],
    ['nds-filter.js', 'Filter'],
    ['nds-form.js', 'Form'],
    ['nds-ipv.js', 'Ipv'],
    ['nds-link.js', 'Link'],
    ['nds-loader.js', 'init'],
    ['nds-main-nav.js', 'MainNav'],
    ['nds-modal.js', 'Modal'],
    ['nds-multiselect.js', 'Multiselect'],
    ['nds-numbers.js', 'Numbers'],
    ['nds-otp.js', 'Otp'],
    ['nds-pagination.js', 'Pagination'],
    ['nds-panel.js', 'Panel'],
    ['nds-password.js', 'Password'],
    ['nds-print.js', 'Print'],
    ['nds-progress.js', 'Progress'],
    ['nds-rating.js', 'Rating'],
    ['nds-scroll-more.js', 'ScrollMore'],
    ['nds-selection.js', 'Selection'],
    ['nds-session-timeout.js', 'SessionTimeout'],
    ['nds-share.js', 'Share'],
    ['nds-sideinfo.js', 'Sideinfo'],
    ['nds-sidemenu.js', 'Sidemenu'],
    ['nds-slider.js', 'Slider'],
    ['nds-sort.js', 'Sort'],
    ['nds-stepper.js', 'Stepper'],
    ['nds-swiper.js', 'Swiper'],
    ['nds-table.js', 'Table'],
    ['nds-tabs.js', 'Tabs'],
    ['nds-taginput.js', 'Taginput'],
    ['nds-theme.js', 'Theme'],
    ['nds-time-picker.js', 'TimePicker'],
    ['nds-time-date.js', 'TimeDate'],
    ['nds-toc.js', 'Toc'],
    ['nds-tooltip.js', 'Tooltip'],
    ['nds-upload.js', 'Upload'],
    ['nds-user-feedback.js', 'UserFeedback'],
    ['nds-voice-input.js', 'VoiceInput'],
];

// Deliberately bannerless: the docs builder (docs-site wiring, no public surface).
// The event packs live in _js/events/, which --all does not read.
const EXCLUDED = new Set([
    'nds-docs.js',
]);

// Event literals the scan counts as dispatched that the banner rightly omits, keyed by file name.
// Every shipped event now carries the nds: prefix, so verifyFile's gate covers them all.
const EVENT_EXCEPTIONS = {
    // Listened for through a name array, so clause 1 of extractEvents can't see the listener.
    'nds-form.js': ['nds:upload:select', 'nds:upload:success', 'nds:upload:error'],
};

// A dispatched literal ending in ':' is a concatenation prefix, not an event name —
// Table builds its sub-row events as 'nds:table:' + verb. It stands in for every banner
// name starting with it, and needs at least one of them to exist.
const isPrefix = (name) => name.endsWith(':');

// The event grammar, PERSONA entry 8.
const EVENT_NAME = /^nds:[a-z]+(-[a-z]+)*:[a-z]+(-[a-z]+)*$/;

// One name per component (PERSONA entry 9): carve-outs, each a surface the component documents elsewhere.
const DOC_ELSEWHERE = {
    'theme': 'foundations/themes.md',
    'digital-stamp': 'ui-shell/topbar.md',
    'city-weather': 'ui-shell/topbar.md',
    'time-date': 'ui-shell/topbar.md',
};
// A part stamps its own name, not its component's.
const STAMP_PARTS = new Set(['columns', 'auto-pagination']);
// Classless: nds:session:* names what ends (Session Timeout), nds:template:ready is core's NDS.fromTemplate.
const EVENT_SCOPES = new Set(['session', 'template']);

const SECTIONS = ['Rides', 'Methods', 'Events', 'Hooks', 'Gotchas'];
// Optional, after Rides: the markup the script needs to work, baked into the audit's required-part rule.
const ORDER = ['Rides', 'Requires', 'Methods', 'Events', 'Hooks', 'Gotchas'];
const RESERVED = new Set(['null', 'true', 'false', 'undefined', 'return']);

// ── source parsing ──────────────────────────────────────────────────────────

// Strips strings and comments so brace counting and key matching see code only.
// `state.inBlock` carries an open /* */ across lines.
function stripLine(raw, state) {
    let line = raw;
    if (state.inBlock) {
        const end = line.indexOf('*/');
        if (end === -1) return '';
        line = line.slice(end + 2);
        state.inBlock = false;
    }
    line = line
        .replace(/'(?:[^'\\]|\\.)*'/g, "''")
        .replace(/"(?:[^"\\]|\\.)*"/g, '""')
        .replace(/`(?:[^`\\]|\\.)*`/g, '``');
    while (true) {
        const start = line.indexOf('/*');
        if (start === -1) break;
        const end = line.indexOf('*/', start + 2);
        if (end === -1) {
            state.inBlock = true;
            line = line.slice(0, start);
            break;
        }
        line = line.slice(0, start) + line.slice(end + 2);
    }
    const slashes = line.indexOf('//');
    if (slashes !== -1) line = line.slice(0, slashes);
    return line;
}

function stripSource(source) {
    const state = { inBlock: false };
    return source.split(/\r?\n/).map((l) => stripLine(l, state));
}

function keysFromInline(text) {
    const open = text.indexOf('{');
    const close = text.lastIndexOf('}');
    const keys = new Set();
    for (const part of text.slice(open + 1, close).split(',')) {
        const m = part.match(/^\s*(?:get\s+|set\s+)?([A-Za-z_$][\w$]*)/);
        if (m && !RESERVED.has(m[1])) keys.add(m[1]);
    }
    return keys;
}

// Collects the keys of the object literal whose opening `{` is on lines[start],
// reading only lines at nesting depth 1.
function keysFromBlock(lines, start) {
    const keys = new Set();
    let depth = 0;
    for (let i = start; i < lines.length; i++) {
        const line = lines[i];
        const opens = (line.match(/\{/g) || []).length;
        const closes = (line.match(/\}/g) || []).length;
        const depthAtStart = depth;
        depth += opens - closes;
        if (i === start) {
            if (depth <= 0) return keysFromInline(line); // one-liner
            continue;
        }
        if (depth <= 0) break;
        if (depthAtStart !== 1) continue;
        // Every key on the line, one or several: `reset,` · `init, reinit: x, refresh: () => {…},`.
        // Inner (…) and {…} are blanked first so their commas don't split a value.
        const flat = line.replace(/\([^()]*\)/g, '()').replace(/\{[^{}]*\}/g, '{}');
        for (const part of flat.split(',')) {
            const m = part.match(/^\s*(?:async\s+)?(?:get\s+|set\s+)?([A-Za-z_$][\w$]*)\s*(?:[:(]|$)/);
            if (m && !RESERVED.has(m[1])) keys.add(m[1]);
        }
    }
    return keys;
}

// Resolves the `NDS.<ns> = …` surface: direct object literal, alias to a
// `const X = {…}`, or IIFE (keys read from its last `return {` or `return X;`).
function extractKeys(source, ns) {
    const lines = stripSource(source);
    const assignRe = new RegExp(`(?:window\\.)?NDS\\.${ns}\\s*=\\s*(.*)`);
    let keys = null;
    for (let i = 0; i < lines.length; i++) {
        const m = lines[i].match(assignRe);
        if (!m) continue;
        const rhs = m[1].trim();
        if (rhs.startsWith('{')) {
            keys = keysFromBlock(lines, i);
        } else if (/^[A-Za-z_$][\w$]*\s*;?\s*$/.test(rhs)) {
            const alias = rhs.replace(/\s*;\s*$/, '');
            const aliasRe = new RegExp(`(?:const|let|var)\\s+${alias}\\s*=\\s*\\{`);
            const at = lines.findIndex((l) => aliasRe.test(l));
            if (at !== -1) keys = keysFromBlock(lines, at);
        } else if (rhs.startsWith('(')) {
            let at = -1;
            for (let j = i; j < lines.length; j++) {
                if (/^\s*return\s*\{/.test(lines[j])) at = j; // last return wins
                const alias = lines[j].match(/^\s*return\s+([A-Za-z_$][\w$]*)\s*;?\s*$/);
                if (alias) {
                    const def = lines.findIndex((l) => new RegExp(`(?:const|let|var)\\s+${alias[1]}\\s*=\\s*\\{`).test(l));
                    if (def !== -1) at = def;
                }
            }
            if (at !== -1) {
                keys = /\}/.test(lines[at])
                    ? keysFromInline(lines[at])
                    : keysFromBlock(lines, at);
            }
        }
        if (keys) break;
    }
    if (!keys) return null;
    const direct = new RegExp(`NDS\\.${ns}\\.([A-Za-z_$][\\w$]*)\\s*=`, 'g');
    for (const m of source.matchAll(direct)) keys.add(m[1]);
    for (const key of keys) if (key.startsWith('_')) keys.delete(key); // private by convention
    return keys;
}

// Four clauses, one per shape that exists in _js/:
//   1. listener registrations — consumed here so a name a file only LISTENS for is never
//      mistaken for a dispatch;
//   2. a name handed straight to CustomEvent — the common shape, and the one that would
//      still catch an unprefixed or dashed name if one ever reappeared;
//   3. an interpolated template — drawer builds `nds:drawer:${type}`; the captured stem
//      ends in ':' and stands in as a prefix (see isPrefix);
//   4. every other nds:* literal — files reach the bus through too many wrappers to
//      enumerate (emitEvent, _dispatchEvent, dispatch(el, name), fire(el, name)) and
//      accordion routes its pair through a variable, so matching the NAME beats listing
//      the callers.
function extractEvents(source) {
    const events = new Set();
    const re = /(?:add|remove)EventListener\(\s*([`'"])[^`'"]*\1|(?:new CustomEvent|emitEvent)\(\s*(['"])([^'"]+)\2|`(nds:[\w:.-]*)\$\{|([`'"])(nds:[\w:.-]+)\5/g;
    for (const m of source.matchAll(re)) {
        const name = m[3] || m[4] || m[6];
        if (name) events.add(name);
    }
    return events;
}

function extractHookCandidates(source) {
    const hooks = new Set();
    for (const m of source.matchAll(/data-[a-z][a-z0-9-]*/g)) {
        const attr = m[0];
        if (attr.startsWith('data-nds-') || attr === 'data-state' || attr === 'data-status') continue;
        hooks.add(attr);
    }
    return [...hooks].sort();
}

// ── banner parsing ──────────────────────────────────────────────────────────

function parseBanner(source) {
    const lines = source.split(/\r?\n/);
    if (!/^\/\*\s*NDS.*public surface/.test(lines[0])) return null;
    const banner = [];
    for (const line of lines) {
        banner.push(line);
        if (line.includes('*/')) break;
    }
    const sections = [];
    let current = null;
    for (const line of banner) {
        const m = line.match(/^\s*\*\s*(Rides|Requires|Methods|Events|Hooks|Gotchas)\s*(\([^)]*\))?\s*:(.*)$/);
        if (m) {
            current = { label: m[1], text: m[3] };
            sections.push(current);
        } else if (current) {
            current.text += '\n' + line.replace(/^\s*\*\s?/, '');
        }
    }
    return { lines: banner, sections };
}

function bannerEventNames(text) {
    const names = new Set();
    for (const line of text.split('\n')) {
        const m = line.trim().match(/^(nds:[\w:.-]+|nds-[\w-]+|[a-z][\w$]*Change)\b/);
        if (m) names.add(m[1]);
    }
    return names;
}

// ── verify ──────────────────────────────────────────────────────────────────

function verifyFile(file, ns, source) {
    const issues = [];
    const banner = parseBanner(source);
    if (!banner) return ['no banner'];

    const labels = banner.sections.map((s) => s.label);
    for (const want of SECTIONS) {
        if (!labels.includes(want)) issues.push(`missing section: ${want}`);
    }
    const order = labels.filter((l) => ORDER.includes(l));
    if (order.join() !== ORDER.filter((s) => labels.includes(s)).join()) {
        issues.push(`sections out of order (${labels.join(' → ')})`);
    }

    const section = (label) => banner.sections.find((s) => s.label === label);

    const methods = section('Methods');
    if (methods) {
        if (ns) {
            const keys = extractKeys(source, ns);
            if (!keys) {
                issues.push(`NDS.${ns} surface unparseable — Methods check skipped`);
            } else {
                const listed = new Set();
                for (const m of methods.text.matchAll(new RegExp(`NDS\\.${ns}\\.([A-Za-z_$][\\w$]*)`, 'g'))) listed.add(m[1]);
                // "NDS.X.init() / .reinit()" shorthand — only on a line that names the
                // namespace, so an instance line ("instance.open() / .close()") stays out.
                for (const line of methods.text.split('\n')) {
                    if (!line.includes(`NDS.${ns}.`)) continue;
                    for (const m of line.matchAll(/\/\s*\.([A-Za-z_$][\w$]*)\s*\(/g)) listed.add(m[1]);
                }
                for (const name of listed) {
                    if (!keys.has(name)) issues.push(`banner method NDS.${ns}.${name} not found on surface`);
                }
                for (const key of keys) {
                    if (!new RegExp(`\\b${key}\\b`).test(methods.text)) {
                        issues.push(`surface key ${key} missing from banner Methods`);
                    }
                }
            }
        } else {
            // Multi-namespace file: every NDS.<x> the banner names must exist in source.
            for (const m of methods.text.matchAll(/NDS\.([A-Za-z_$][\w$]*)/g)) {
                if (SCOPE.some(([f, n]) => n === m[1] && f !== file)) continue; // checked in its own file
                const root = new RegExp(`NDS\\.${m[1]}\\s*=|NDS\\.${m[1]}\\.[\\w$]+\\s*=|Object\\.defineProperty\\(\\s*NDS\\s*,\\s*['"]${m[1]}['"]`);
                if (!root.test(source)) issues.push(`banner names NDS.${m[1]} but no such assignment in source`);
            }
        }
    }

    const events = section('Events');
    if (events) {
        const dispatched = extractEvents(source);
        const listed = bannerEventNames(events.text);
        const exceptions = EVENT_EXCEPTIONS[file] || [];
        const prefixes = [...dispatched].filter(isPrefix);
        for (const name of listed) {
            if (dispatched.has(name)) continue;
            if (prefixes.some((p) => name.startsWith(p))) continue;
            issues.push(`banner event ${name} never dispatched in file`);
        }
        for (const name of dispatched) {
            if (!/^nds[:-]/.test(name) || exceptions.includes(name) || listed.has(name)) continue;
            if (isPrefix(name) && [...listed].some((l) => l.startsWith(name))) continue;
            issues.push(`dispatched event ${name} missing from banner Events`);
        }
        for (const name of new Set([...listed, ...dispatched])) {
            if (name.startsWith('nds:') && !isPrefix(name) && !EVENT_NAME.test(name)) {
                issues.push(`event ${name} is not nds:{component}:{action} in kebab case (PERSONA entry 8)`);
            }
        }
    }

    return issues;
}

// ── one name per component ──────────────────────────────────────────────────

// Names that break the case rule until their plans/shared-logic.md step lands (section 3).
const CASE_PENDING = {};

const sassText = () => {
    const out = [];
    const read = (dir) => readdirSync(dir, { withFileTypes: true }).forEach((d) => {
        const p = join(dir, d.name);
        if (d.isDirectory()) read(p); else if (d.name.endsWith('.scss')) out.push(readFileSync(p, 'utf8'));
    });
    read(join(REPO, '_sass'));
    return out.join('\n');
};

function checkNames() {
    const issues = [];
    const registered = loaderNames();
    const stems = new Set(SCOPE.map(([f]) => f.replace(/^nds-|\.js$/g, '')));
    const partials = new Set(readdirSync(join(REPO, '_sass', 'components')).map((f) => f.replace(/^_|\.scss$/g, '')));

    for (const ns of registered) {
        const x = kebab(ns);
        const file = `nds-${x}.js`;
        const entry = SCOPE.find(([f]) => f === file);
        if (!entry) { issues.push(`NDS.${ns}: no _js/${file}`); continue; }
        if (entry[1] !== ns) issues.push(`NDS.${ns}: _js/${file} is in SCOPE as NDS.${entry[1]}`);
        const scss = join(REPO, '_sass', 'components', `_${x}.scss`);
        if (existsSync(scss) && !new RegExp(`\\.nds-${x}(?![\\w])`).test(readFileSync(scss, 'utf8'))) {
            issues.push(`NDS.${ns}: _${x}.scss has no .nds-${x} class`);
        }
        const doc = DOC_ELSEWHERE[x];
        if (doc ? !existsSync(join(REPO, doc)) : !DOC_SHELVES.some((s) => existsSync(join(REPO, s, `${x}.md`)))) {
            issues.push(`NDS.${ns}: no doc page ${doc || `<shelf>/${x}.md`}`);
        }
    }

    // The case tells the layer (entry 9): a component, which has a root class or a loader entry, is
    // PascalCase; everything else is lowercase. Core's own PascalCase objects are checked too.
    const sass = sassText();
    const core = readFileSync(join(REPO, '_js', 'nds-core.js'), 'utf8');
    const namespaces = [...SCOPE.filter(([, ns]) => ns), ...[...core.matchAll(/\bNDS\.([A-Z]\w*)\s*=(?!=)/g)].map((m) => ['nds-core.js', m[1]])];
    for (const [file, ns] of namespaces) {
        const x = kebab(ns);
        const builds = file !== 'nds-core.js' && new RegExp(`['"\`\\s]nds-${x}['"\`\\s]`).test(readFileSync(join(REPO, '_js', file), 'utf8'));
        const component = registered.includes(ns) || new RegExp(`\\.nds-${x}(?![\\w-])`).test(sass) || builds;
        const ok = /^[A-Z]/.test(ns) === component;
        if (CASE_PENDING[ns]) {
            if (ok) issues.push(`NDS.${ns}: passes the case rule now, so drop it from CASE_PENDING`);
            continue;
        }
        if (!ok) issues.push(`NDS.${ns}: ${component ? 'a component, so PascalCase' : 'no root class and no loader entry, so lowercase'} (PERSONA entry 9)`);
    }
    for (const name of Object.keys(CASE_PENDING)) {
        if (!namespaces.some(([, ns]) => ns === name)) issues.push(`NDS.${name}: gone, so drop it from CASE_PENDING`);
    }

    // Every catalog js: names a file that exists.
    for (const m of readFileSync(join(REPO, '_data', 'catalog.yml'), 'utf8').matchAll(/^\s+js:\s*["']?([^"'\s#]+)/gm)) {
        if (!existsSync(join(REPO, m[1]))) issues.push(`catalog.yml: js ${m[1]} does not exist`);
    }

    // A file may fire or stamp for another component, never for a name no component has.
    const known = new Set([...registered.map(kebab), ...stems, ...partials]);
    for (const [file] of SCOPE) {
        const source = readFileSync(join(REPO, '_js', file), 'utf8');
        for (const m of source.matchAll(/data-nds-([a-z-]+)-initialized/g)) {
            if (!known.has(m[1]) && !STAMP_PARTS.has(m[1])) issues.push(`${file}: stamp data-nds-${m[1]}-initialized names no component`);
        }
        const events = parseBanner(source)?.sections.find((s) => s.label === 'Events');
        for (const name of events ? bannerEventNames(events.text) : []) {
            const x = name.split(':')[1];
            if (name.startsWith('nds:') && x && !known.has(x) && !EVENT_SCOPES.has(x)) issues.push(`${file}: event ${name} names no component`);
        }
    }
    return [...new Set(issues)];
}

// ── callers: nothing calls a name no component defines ─────────────────────

// Every place that calls NDS: the code, the docs a consumer copies from, and the browser checks.
const CALLER_DIRS = ['_js', ...PAGE_DIRS, 'guides', '_includes', '_layouts', 'scripts'];
// Old names on purpose: the migration guide, and the IQ rules every 1.x template still reads.
const CALLER_SKIP = /guides[\\/]migration\.md$|_includes[\\/]NDS-IQ/;

function walk(dir) {
    return readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
        const p = join(dir, d.name);
        if (d.isDirectory()) return d.name === 'node_modules' ? [] : walk(p);
        return /\.(js|mjs|md|html)$/.test(d.name) && !/\.min\.js$/.test(d.name) ? [p] : [];
    });
}

// ponytail: NDS.X.method and nds:x:y only; an instance call (el.ndsTabs.goTo) has no parsed
// surface, so the browser checks still own it. Add it if banners grow a parsable instance list.
function checkCallers() {
    const surfaces = {};
    const dispatched = new Set();
    for (const [file, ns] of SCOPE) {
        const source = readFileSync(join(REPO, '_js', file), 'utf8');
        if (ns) {
            const keys = extractKeys(source, ns);
            if (keys) surfaces[ns] = keys;
        }
        // A built name ('nds:table:' + verb) is live only as the full names its banner lists.
        for (const e of extractEvents(source)) if (!isPrefix(e)) dispatched.add(e);
        const events = parseBanner(source)?.sections.find((s) => s.label === 'Events');
        for (const e of events ? bannerEventNames(events.text) : []) dispatched.add(e);
    }
    const found = new Map();
    const note = (what, file, text, at) => {
        const where = `${file.slice(REPO.length + 1)}:${text.slice(0, at).split('\n').length}`;
        (found.get(what) || found.set(what, []).get(what)).push(where);
    };
    for (const file of CALLER_DIRS.flatMap((d) => walk(join(REPO, d)))) {
        if (CALLER_SKIP.test(file)) continue;
        const text = readFileSync(file, 'utf8');
        for (const m of text.matchAll(/NDS\.([A-Z]\w*)\.([A-Za-z$][\w$]*)/g)) {
            if (surfaces[m[1]] && !surfaces[m[1]].has(m[2])) note(`NDS.${m[1]}.${m[2]}`, file, text, m.index);
        }
        for (const m of text.matchAll(/nds:[a-z]+(?:-[a-z]+)*:[a-z]+(?:-[a-z]+)*/g)) {
            if (!m[0].startsWith('nds:x:') && !dispatched.has(m[0])) note(m[0], file, text, m.index); // nds:x: is the docs' placeholder
        }
    }
    return [...found].map(([what, at]) => `${what} is defined by no component (${at.length}x: ${at.slice(0, 3).join(', ')})`);
}

// ── generate ────────────────────────────────────────────────────────────────

function generate(ns, source) {
    const keys = ns ? extractKeys(source, ns) : null;
    const events = [...extractEvents(source)].sort();
    const hooks = extractHookCandidates(source);
    const name = ns ? `NDS.${ns}` : 'NDS core utilities';
    const out = [];
    out.push(`/* ${name} — public surface`);
    out.push(' * Rides: (none — base component)  TODO: rider? Rides: nds-<base> (<inherited surface>) · soft edges "(soft — works without it)"');
    out.push(' * Methods:');
    if (keys && keys.size) {
        for (const key of [...keys].sort()) out.push(` *   ${name}.${key}()  TODO describe`);
    } else {
        out.push(' *   (none)  TODO: enumerate by hand — surface not auto-extracted');
    }
    out.push(' * Events:');
    if (events.length) {
        for (const e of events) out.push(` *   ${e}   detail {TODO} — TODO when it fires`);
    } else {
        out.push(' *   (none)');
    }
    out.push(' * Hooks:');
    if (hooks.length) {
        out.push(' *   TODO hand-enumerate — drop base-owned attrs and non-consumer internals. Candidates:');
        out.push(` *   ${hooks.join(' · ')}`);
    } else {
        out.push(' *   (none)');
    }
    out.push(' * Gotchas:');
    out.push(' *   - TODO one-liners, only what THIS file owns; use (none) if empty');
    out.push(' */');
    return out.join('\n');
}

// ── main ────────────────────────────────────────────────────────────────────

function resolve(arg) {
    const file = basename(arg);
    const entry = SCOPE.find(([f]) => f === file);
    if (!entry) {
        console.error(`${file} is not in the banner scope (see SCOPE in this script)`);
        process.exit(2);
    }
    const path = existsSync(arg) ? arg : join(REPO, '_js', file);
    return { file, ns: entry[1], source: readFileSync(path, 'utf8') };
}

export { SCOPE, extractKeys };
// Imported (check-js-rules.mjs reads the surfaces), it runs nothing.
const isMain = !!process.argv[1] && fileURLToPath(import.meta.url) === resolvePath(process.argv[1]);
const [mode, arg] = isMain ? process.argv.slice(2) : [];

if (!isMain) {
    // imported
} else if (mode === '--all') {
    let bad = 0;
    // Coverage first: a file in neither list is an unreviewed public surface, and every
    // check below would pass by never looking at it.
    const known = new Set([...SCOPE.map(([f]) => f), ...EXCLUDED]);
    const unlisted = readdirSync(join(REPO, '_js')).filter((f) => f.endsWith('.js') && !known.has(f));
    if (unlisted.length) {
        console.error(`_js/ holds files in neither SCOPE nor EXCLUDED: ${unlisted.join(', ')}`);
        console.error('Add each to SCOPE (with its NDS.<Name> namespace) or to EXCLUDED.');
        process.exit(1);
    }
    for (const [file, ns] of SCOPE) {
        const source = readFileSync(join(REPO, '_js', file), 'utf8');
        const issues = verifyFile(file, ns, source);
        if (issues.length) {
            bad++;
            for (const issue of issues) console.log(`${file.padEnd(28)} ${issue}`);
        } else {
            console.log(`${file.padEnd(28)} ok`);
        }
    }
    const names = checkNames();
    for (const issue of names) console.log(`names                        ${issue}`);
    const callers = checkCallers();
    for (const issue of callers) console.log(`callers                      ${issue}`);
    console.log(`\n${SCOPE.length} files in scope, ${SCOPE.length - bad} ok, ${bad} with findings`);
    console.log(names.length ? `one name per component: ${names.length} findings` : 'one name per component: ok');
    console.log(callers.length ? `callers: ${callers.length} dead names` : 'callers: ok');
    process.exit(bad || names.length || callers.length ? 1 : 0);
} else if (mode === '--verify' && arg) {
    const { file, ns, source } = resolve(arg);
    const issues = verifyFile(file, ns, source);
    if (issues.length) {
        for (const issue of issues) console.log(`${file}: ${issue}`);
        process.exit(1);
    }
    console.log(`${file}: ok`);
} else if (mode === '--generate' && arg) {
    const { ns, source } = resolve(arg);
    console.log(generate(ns, source));
} else {
    console.error('usage: check-banners.mjs --verify <file> | --all | --generate <file>');
    process.exit(2);
}
