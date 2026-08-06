#!/usr/bin/env node
/**
 * NDS public-surface banner checker (PERSONA entry 7, JSD-20).
 *
 *   node scripts/check-banners.mjs --verify <file>    check one file's banner
 *   node scripts/check-banners.mjs --all              check every in-scope file
 *   node scripts/check-banners.mjs --generate <file>  print a banner skeleton to stdout
 *
 * Never writes files. Exit 0 = clean, 1 = findings, 2 = usage error.
 */
// ponytail: line-regex parser, not an AST — brace/comment tracking is line-local, so a brace
// inside a multi-line string, a computed key, or an early `return {` in an IIFE can misparse.
// Upgrade path: an acorn walk over the namespace object if a surface outgrows the regexes.

import { readFileSync, existsSync } from 'node:fs';
import { basename, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');

// The single source of truth for which files carry a banner: 53 components + core, loader,
// accessibility, theme. Hard-excluded: nds-showcase.js, nds-theme-foundation-day.js,
// nds-theme-hajj.js, nds-fontLoading.js. ns = the NDS.<Name> namespace Methods verify
// against; null = multi-namespace file (core) — its banner Methods verify existence-only.
const SCOPE = [
    ['nds-accessibility.js', 'Accessibility'],
    ['nds-accordion.js', 'Accordion'],
    ['nds-alert.js', 'Alert'],
    ['nds-autocomplete.js', 'Autocomplete'],
    ['nds-backdrop.js', 'Backdrop'],
    ['nds-breadcrumb.js', 'Breadcrumb'],
    ['nds-chart.js', 'Chart'],
    ['nds-cityWeather.js', 'CityWeather'],
    ['nds-code.js', 'Code'],
    ['nds-cookies.js', 'Cookies'],
    ['nds-cooldown-button.js', 'CooldownButton'],
    ['nds-copy.js', 'Copy'],
    ['nds-core.js', null],
    ['nds-customselect.js', 'CustomSelect'],
    ['nds-date-picker.js', 'DatePicker'],
    ['nds-digitalStamp.js', 'DigitalStamp'],
    ['nds-drawer.js', 'Drawer'],
    ['nds-dropmenu.js', 'Dropmenu'],
    ['nds-editor.js', 'Editor'],
    ['nds-empty.js', 'Empty'],
    ['nds-expandable.js', 'Expandable'],
    ['nds-export.js', 'Export'],
    ['nds-fab.js', 'Fab'],
    ['nds-feedback.js', 'Feedback'],
    ['nds-filter.js', 'Filter'],
    ['nds-forms.js', 'Forms'],
    ['nds-ipv.js', 'Ipv'],
    ['nds-link.js', 'Link'],
    ['nds-loader.js', 'Init'],
    ['nds-mainnav.js', 'Mainnav'],
    ['nds-modal.js', 'Modal'],
    ['nds-multiselect.js', 'Multiselect'],
    ['nds-numbers.js', 'Numbers'],
    ['nds-otp.js', 'OTP'],
    ['nds-pagination.js', 'Pagination'],
    ['nds-panels.js', 'Panel'],
    ['nds-progress.js', 'Progress'],
    ['nds-rating.js', 'Rating'],
    ['nds-scroll-more.js', 'ScrollMore'],
    ['nds-selection.js', 'Selection'],
    ['nds-share.js', 'Share'],
    ['nds-sideinfo.js', 'Sideinfo'],
    ['nds-sidemenu.js', 'Sidemenu'],
    ['nds-slider.js', 'Slider'],
    ['nds-sort.js', 'Sort'],
    ['nds-stepper.js', 'Stepper'],
    ['nds-swiper.js', 'Swiper'],
    ['nds-tables.js', 'Tables'],
    ['nds-tabs.js', 'Tabs'],
    ['nds-taginput.js', 'TagInput'],
    ['nds-theme.js', 'Theme'],
    ['nds-timeDate.js', 'TimeDate'],
    ['nds-toc.js', 'Toc'],
    ['nds-tooltip.js', 'Tooltip'],
    ['nds-upload.js', 'Upload'],
    ['nds-user-feedback.js', 'UserFeedback'],
    ['nds-voice-input.js', 'VoiceInput'],
];

// Event literals a file dispatches that its banner deliberately omits, keyed by file name.
// Empty: legacy unprefixed events (selectChange, ratingChange, switchChange until its nds:
// rename) already fall outside the nds:* gate in verifyFile.
const EVENT_EXCEPTIONS = {};

const SECTIONS = ['Rides', 'Methods', 'Events', 'Hooks', 'Gotchas'];
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
        const m = line.match(/^\s*(?:async\s+)?(?:get\s+|set\s+)?([A-Za-z_$][\w$]*)\s*[:(]/)
            || line.match(/^\s*([A-Za-z_$][\w$]*)\s*,?\s*$/);
        if (m && !RESERVED.has(m[1])) keys.add(m[1]);
    }
    return keys;
}

// Resolves the `NDS.<ns> = …` surface: direct object literal, alias to a
// `const X = {…}`, or IIFE (keys read from its last `return {`).
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

function extractEvents(source) {
    const events = new Set();
    for (const m of source.matchAll(/(?:new CustomEvent|emitEvent)\(\s*['"]([^'"]+)['"]/g)) {
        events.add(m[1]);
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
        const m = line.match(/^\s*\*\s*(Rides|Methods|Events|Hooks|Gotchas)\s*(\([^)]*\))?\s*:(.*)$/);
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
        const m = line.trim().match(/^(nds:[\w:.-]+|[a-z][\w$]*Change)\b/);
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
    const order = labels.filter((l) => SECTIONS.includes(l));
    if (order.join() !== SECTIONS.filter((s) => labels.includes(s)).join()) {
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
                for (const m of methods.text.matchAll(/\/\s*\.([A-Za-z_$][\w$]*)\s*\(/g)) listed.add(m[1]);
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
        for (const name of listed) {
            if (!dispatched.has(name)) issues.push(`banner event ${name} never dispatched in file`);
        }
        for (const name of dispatched) {
            if (name.startsWith('nds:') && !exceptions.includes(name) && !listed.has(name)) {
                issues.push(`dispatched event ${name} missing from banner Events`);
            }
        }
    }

    return issues;
}

// ── generate ────────────────────────────────────────────────────────────────

function generate(file, ns, source) {
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

const [mode, arg] = process.argv.slice(2);

if (mode === '--all') {
    let bad = 0;
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
    console.log(`\n${SCOPE.length} files in scope, ${SCOPE.length - bad} ok, ${bad} with findings`);
    process.exit(bad ? 1 : 0);
} else if (mode === '--verify' && arg) {
    const { file, ns, source } = resolve(arg);
    const issues = verifyFile(file, ns, source);
    if (issues.length) {
        for (const issue of issues) console.log(`${file}: ${issue}`);
        process.exit(1);
    }
    console.log(`${file}: ok`);
} else if (mode === '--generate' && arg) {
    const { file, ns, source } = resolve(arg);
    console.log(generate(file, ns, source));
} else {
    console.error('usage: check-banners.mjs --verify <file> | --all | --generate <file>');
    process.exit(2);
}
