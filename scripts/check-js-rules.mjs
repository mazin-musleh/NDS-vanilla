#!/usr/bin/env node
/**
 * The mechanical half of nds-js-audit: the rules whose pattern AND carve-outs a script can decide.
 * The audit runs this first and judges only what it prints; the rule rows in
 * .claude/skills/nds-js-audit/RULES-*.md keep the meaning and the fix.
 *
 *   node scripts/check-js-rules.mjs [file …]   default: every _js/nds-*.js in the audit's scope
 *
 * Rules: JSD-01 (a)(b)(c), JSD-02, JSP-01, JSS-02, JSA-05 (registry hygiene).
 * Never writes files. Exit 0 = clean, 1 = findings.
 */
// ponytail: a char scanner, not a parser. A `/` after `)` reads as division, so a regex literal
// right after a closing paren can mis-strip one line; an acorn walk is the upgrade if that bites.

import { readFileSync, readdirSync } from 'node:fs';
import { basename, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
// The audit's `js` scope (SKILL.md): core owns State/Status, the loader and docs are out of scope.
const OUT_OF_SCOPE = new Set(['nds-core.js', 'nds-loader.js', 'nds-docs.js']);

// JSD-01's vocabulary gate: any other data-state token is the component's private classification.
const VOCAB = new Set(['open', 'closing', 'opening', 'closed', 'show', 'hide', 'shown', 'hidden',
    'active', 'inactive', 'selected', 'expanded', 'collapsed']);

// JSD-01 (c) skips the rule row names, each a selector its writer list cannot decide.
const ALLOW = [
    // Mixed writers: Custom Select stamps `selected` on the items Dropmenu marks; one selector reads both.
    { file: 'nds-dropmenu.js', near: 'getCurrentItem()' },
    // The nav's flag must hold through the close, and _openDropdowns drops a menu when it STARTS closing.
    { file: 'nds-main-nav.js', near: 'function syncOpenFlags()' },
];

// Blanks comments to spaces (newlines kept, so line numbers hold) and returns the code plus its strings.
function scan(source) {
    let code = '';
    const strings = []; // { text, at }
    let i = 0;
    let prev = ''; // last non-space code char, to tell a regex literal from division
    while (i < source.length) {
        const c = source[i], n = source[i + 1];
        if (c === '/' && n === '/') {
            const end = source.indexOf('\n', i);
            const stop = end === -1 ? source.length : end;
            code += ' '.repeat(stop - i); i = stop; continue;
        }
        if (c === '/' && n === '*') {
            const end = source.indexOf('*/', i + 2);
            const stop = end === -1 ? source.length : end + 2;
            code += source.slice(i, stop).replace(/[^\n]/g, ' '); i = stop; continue;
        }
        if (c === '/' && (prev === '' || '(,=:[!&|?{};+-*%<>~^'.includes(prev))) {
            let j = i + 1, cls = false;
            while (j < source.length && source[j] !== '\n') {
                if (source[j] === '\\') { j += 2; continue; }
                if (source[j] === '[') cls = true; else if (source[j] === ']') cls = false;
                else if (source[j] === '/' && !cls) break;
                j++;
            }
            code += source.slice(i, j + 1); i = j + 1; prev = '/'; continue;
        }
        if (c === '"' || c === "'" || c === '`') {
            let j = i + 1;
            while (j < source.length && source[j] !== c) {
                if (source[j] === '\\') j++;
                else if (c !== '`' && source[j] === '\n') break;
                j++;
            }
            strings.push({ text: source.slice(i + 1, j), at: i });
            code += source.slice(i, j + 1); i = j + 1; prev = c; continue;
        }
        code += c;
        if (!/\s/.test(c)) prev = c;
        i++;
    }
    return { code, strings };
}

const lineOf = (text, at) => text.slice(0, at).split('\n').length;

function checkFile(file, source = readFileSync(file, 'utf8')) {
    const { code, strings } = scan(source);
    const name = basename(file);
    const out = [];
    const hit = (rule, at, what) => out.push({ rule, file: name, line: lineOf(source, at), what });

    // The calls that write a State token here: NDS.State.x and any destructured alias of x.
    const writers = ['NDS\\.State\\.(?:set|add|toggle|apply)'];
    for (const m of code.matchAll(/\{([^}]*)\}\s*=\s*NDS\.State\b/g)) {
        for (const part of m[1].split(',')) {
            const [key, alias] = part.split(':').map((s) => s.trim());
            if (['set', 'add', 'toggle', 'apply'].includes(key)) writers.push(alias || key);
        }
    }
    const writesToken = (token) => new RegExp(`(?:${writers.join('|')})\\s*\\([^;]*?['"\`][^'"\`]*\\b${token}\\b`).test(code);
    const gated = (value) => value.split(/\s+/).filter(Boolean).some((t) => VOCAB.has(t));

    // JSD-01 (a) direct data-state access, (b) a data-*-state twin; a literal value outside the vocabulary passes.
    for (const m of code.matchAll(/\.(set|get|remove|has)Attribute\(\s*(['"])data-((?:[a-z]+-)*)state\2\s*(?:,\s*(['"])([^'"]*)\4)?/g)) {
        if (m[1] === 'set' && m[5] !== undefined && !gated(m[5])) continue;
        hit(m[3] ? 'JSD-01b' : 'JSD-01a', m.index, m[0]);
    }
    for (const m of code.matchAll(/\.dataset\.([a-z]+State|state)\s*=(?!=)\s*(?:(['"])([^'"]*)\2)?/g)) {
        if (m[3] !== undefined && !gated(m[3])) continue;
        hit(m[1] === 'state' ? 'JSD-01a' : 'JSD-01b', m.index, m[0].trim());
    }
    // JSD-01 (c) a selector or an HTML template naming a vocabulary token. A token this file never
    // writes through NDS.State is another component's (carve-out 2): a selector reads its state,
    // a template ships its canon (Accordion's default-open data-state="open").
    for (const s of strings) {
        for (const m of s.text.matchAll(/(\[)?data-state\s*[~*|^$]?=\s*\\?["']?([a-z][a-z -]*)/g)) {
            const tokens = m[2].trim().split(/\s+/).filter((t) => VOCAB.has(t));
            if (!tokens.length || !tokens.some(writesToken)) continue;
            if (!m[1] && !s.text.includes('<')) continue; // prose in a message, not markup
            const at = s.at + 1 + m.index;
            const before = source.slice(0, at).split('\n').slice(-6).join('\n'); // the hit's line and 5 above
            if (ALLOW.some((a) => a.file === name && before.includes(a.near))) continue;
            hit('JSD-01c', at, (m[1] ? 'selector ' : 'template ') + m[0]);
        }
    }

    // JSD-02 data-status outside NDS.Status, read or write.
    for (const m of code.matchAll(/\.(?:set|get|remove|has)Attribute\(\s*(['"])data-status\1|\.dataset\.status\b/g)) hit('JSD-02', m.index, m[0]);

    // JSP-01 a raw window resize listener (NDS.onResize pools and debounces).
    for (const m of code.matchAll(/\bwindow\.addEventListener\(\s*(['"])resize\1/g)) hit('JSP-01', m.index, m[0]);

    // JSS-02 dynamic code: eval, new Function, a timer handed a string.
    // ponytail: a string-valued VARIABLE handed to a timer needs a type; the deep read owns it.
    for (const m of code.matchAll(/\beval\s*\(|\bnew\s+Function\s*\(|\bset(?:Timeout|Interval)\(\s*['"`]/g)) hit('JSS-02', m.index, m[0]);

    return out;
}

// JSA-05 registry hygiene: every critical: true entry defends itself in a comment.
function checkLoader() {
    const file = join(REPO, '_js', 'nds-loader.js');
    const source = readFileSync(file, 'utf8');
    const out = [];
    for (const m of source.matchAll(/\{([^{}]*?\bname:\s*'([^']+)'[^{}]*?)\}/g)) {
        if (!/\bcritical:\s*true/.test(m[1]) || m[1].includes('//')) continue;
        out.push({ rule: 'JSA-05', file: 'nds-loader.js', line: lineOf(source, m.index), what: `${m[2]}: critical: true with no rationale comment` });
    }
    return out;
}

// Each case: source, and the rules it must raise (empty = must pass).
const CASES = [
    [`el.setAttribute('data-state', 'open');`, ['JSD-01a']],
    [`el.setAttribute('data-state', 'today');`, []], // outside the vocabulary
    [`el.getAttribute('data-state');`, ['JSD-01a']],
    [`el.dataset.state = 'active';`, ['JSD-01a']],
    [`if (el.dataset.state === 'active') go();`, []], // a read of dataset.state is not (a)
    [`t.setAttribute('data-toast-state', 'show');`, ['JSD-01b']],
    [`NDS.State.add(el, 'open'); root.querySelector('[data-state~="open"]');`, ['JSD-01c']], // own token
    [`addState(el, 'open'); root.querySelector('[data-state~="open"]');`, []], // addState is no State alias here
    [`const { add: addState } = NDS.State; addState(el, 'open'); root.querySelectorAll('.x[data-state~="open"]');`, ['JSD-01c']],
    [`root.querySelectorAll('li[data-state~="active"]');`, []], // never written here: foreign
    [`// root.querySelector('[data-state~="open"]')\nNDS.State.add(el, 'open');`, []], // comment
    [`NDS.State.add(b, 'open'); el.innerHTML = '<button data-state="open">';`, ['JSD-01c']],
    [`el.innerHTML = '<div data-state="open">';`, []], // another component's canon
    [`NDS.State.add(a, 'active'); report('uses data-state="active" here');`, []], // prose
    [`el.setAttribute('data-status', 'error');`, ['JSD-02']],
    [`if (el.dataset.status === 'success') x();`, ['JSD-02']],
    [`window.addEventListener('resize', fn);`, ['JSP-01']],
    [`NDS.onResize(fn);`, []],
    [`eval(code);`, ['JSS-02']],
    [`const f = new Function('a', body);`, ['JSS-02']],
    [`setTimeout('go()', 10);`, ['JSS-02']],
    [`setTimeout(go, 10);`, []],
    [`const re = /data-state="open"/; NDS.State.add(el, 'open');`, []], // a regex literal is not a string
];

const args = process.argv.slice(2);
if (args[0] === '--self-test') {
    let failed = 0;
    for (const [src, want] of CASES) {
        const got = checkFile('case.js', src).map((f) => f.rule).sort();
        if (got.join() !== [...want].sort().join()) { failed++; console.log(`FAIL  ${JSON.stringify(src)}\n      want [${want}] got [${got}]`); }
    }
    console.log(`${CASES.length - failed}/${CASES.length} cases pass`);
    process.exit(failed ? 1 : 0);
}
const files = args.length
    ? args.map((a) => (a.includes('/') || a.includes('\\') ? a : join(REPO, '_js', a)))
    : readdirSync(join(REPO, '_js')).filter((f) => /^nds-.*\.js$/.test(f) && !OUT_OF_SCOPE.has(f)).map((f) => join(REPO, '_js', f));
const findings = [...files.flatMap(checkFile), ...(args.length && !args.some((a) => a.endsWith('nds-loader.js')) ? [] : checkLoader())];
for (const f of findings) console.log(`${f.rule.padEnd(8)} ${`${f.file}:${f.line}`.padEnd(30)} ${f.what}`);
console.log(`\n${files.length} files, ${findings.length} findings`);
process.exit(findings.length ? 1 : 0);
