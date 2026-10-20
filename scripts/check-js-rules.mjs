#!/usr/bin/env node
/**
 * The mechanical half of nds-js-audit: the rules whose pattern AND carve-outs a script can decide.
 * The audit runs this first and judges only what it prints; the rule rows in
 * .claude/skills/nds-js-audit/RULES-*.md keep the meaning and the fix.
 *
 *   node scripts/check-js-rules.mjs [file …]   default: every _js/nds-*.js in the audit's scope
 *
 * Rules: JSD-01 (a)(b)(c), JSD-02, JSD-12, JSP-01, JSP-03, JSP-04 (a)(b), JSP-05, JSS-02,
 * JSA-05 (registry hygiene).
 * Two kinds of line: `finding` is decided; `verify` is a candidate whose one remaining carve-out
 * needs reading, named on the line. Never writes files. Exit 0 = no finding, 1 = findings.
 *   --self-test   run the built-in cases
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

// The index of the quote that closes the string opening at `i`. A template's `${…}` may hold
// strings and templates of its own.
function stringEnd(src, i) {
    const q = src[i];
    let j = i + 1;
    while (j < src.length && src[j] !== q) {
        if (src[j] === '\\') j += 2;
        else if (q !== '`' && src[j] === '\n') return j;
        else if (q === '`' && src[j] === '$' && src[j + 1] === '{') {
            let depth = 1;
            j += 2;
            while (j < src.length && depth) {
                const c = src[j];
                if (c === '"' || c === "'" || c === '`') j = stringEnd(src, j) + 1;
                else { if (c === '{') depth++; else if (c === '}') depth--; j++; }
            }
        } else j++;
    }
    return j;
}

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
            const j = stringEnd(source, i);
            strings.push({ text: source.slice(i + 1, j), at: i });
            code += source.slice(i, j + 1); i = j + 1; prev = c; continue;
        }
        code += c;
        if (!/\s/.test(c)) prev = c;
        i++;
    }
    // String bodies blanked too, so a brace inside a string never moves the depth.
    const chars = code.split(''); // UTF-16 units, so offsets match the source
    for (const s of strings) for (let k = s.at + 1; k <= s.at + s.text.length; k++) if (chars[k] !== '\n') chars[k] = ' ';
    return { code, bare: chars.join(''), strings };
}

// The `{` of every block enclosing `at`, innermost first.
function blocksAround(bare, at) {
    const opens = [];
    let depth = 0;
    for (let i = at - 1; i >= 0; i--) {
        if (bare[i] === '}') depth++;
        else if (bare[i] === '{') { if (depth) depth--; else opens.push(i); }
    }
    return opens;
}

// The outermost function (or method) around `at`, below the module wrapper: its `{`, or 0.
// A block is a function when `)` or `=>` leads into it and the `(` before is no if/for/while/switch/catch.
function outerFn(bare, at) {
    const opens = blocksAround(bare, at).slice(0, -1); // the last is the module IIFE
    let found = 0;
    for (const o of opens) {
        const head = bare.slice(Math.max(0, o - 400), o).trimEnd();
        if (head.endsWith('=>')) { found = o; continue; }
        if (!head.endsWith(')')) continue; // class body, object literal, else, try
        let depth = 0, k = head.length - 1;
        for (; k >= 0; k--) { if (head[k] === ')') depth++; else if (head[k] === '(' && --depth === 0) break; }
        if (!/\b(if|for|while|switch|catch|with)\s*$/.test(head.slice(0, k))) found = o;
    }
    return found;
}

// The offset just past the `}` that closes the block opened at `open`.
function blockEnd(bare, open) {
    let depth = 0;
    for (let i = open; i < bare.length; i++) {
        if (bare[i] === '{') depth++;
        else if (bare[i] === '}' && --depth === 0) return i + 1;
    }
    return bare.length;
}

const lineOf = (text, at) => text.slice(0, at).split('\n').length;
// The comments in source between two offsets, joined.
const commentsIn = (source, code, from, to) => {
    let out = '';
    for (let k = Math.max(0, from); k < to; k++) if (code[k] === ' ' && source[k] !== ' ' && source[k] !== '\n') out += source[k]; else if (out.at(-1) !== ' ') out += ' ';
    return out;
};
const lineStart = (text, at, back = 0) => {
    let k = at;
    for (let n = 0; n <= back && k > 0; n++) k = text.lastIndexOf('\n', k - 1);
    return Math.max(0, k);
};

// Core and loader namespaces the loader guarantees; any other PascalCase namespace is a sibling (JSD-12).
const CORE = new Set(['State', 'Status', 'Init']);
const POOLS = 'Resize|ElementResize|Intersect|OutsideScroll|AttrChange|DOMAdd|DOMRemove|ChildrenChange';

function checkFile(file, source = readFileSync(file, 'utf8')) {
    if (typeof source !== 'string') throw new TypeError(`checkFile(${file}): source must be a string`);
    const { code, bare, strings } = scan(source);
    const name = basename(file);
    const out = [];
    const hit = (rule, at, what, verify) => out.push({ rule, file: name, line: lineOf(source, at), what, verify });

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

    // JSP-03 / JSP-04 (a) / JSP-05: a raw observer the core pools replace. Only JSP-05 has an exemption:
    // a comment naming the pool limitation that forces it.
    for (const m of code.matchAll(/\bnew\s+(Intersection|Resize|Mutation)Observer\s*\(/g)) {
        const rule = { Intersection: 'JSP-03', Resize: 'JSP-04a', Mutation: 'JSP-05' }[m[1]];
        const above = commentsIn(source, code, lineStart(source, m.index, 3), m.index);
        hit(rule, m.index, m[0].trim(), rule === 'JSP-05' && above.trim() ? 'the comment above must name the pool limitation' : undefined);
    }

    // JSP-04 (b) a pool call whose unsubscribe handle is dropped (a statement of its own).
    const removed = new Set([...code.matchAll(/NDS\.onDOMRemove\(\s*(['"`])([^'"`]+)\1/g)].map((m) => m[2]));
    for (const m of code.matchAll(new RegExp(`NDS\\.on(${POOLS})\\(`, 'g'))) {
        const before = bare.slice(0, m.index).trimEnd().at(-1);
        if (before && !';{})'.includes(before)) continue; // assigned, returned, passed or chained
        const opens = blocksAround(bare, m.index);
        if (opens.length <= 1) continue; // the module IIFE's own body runs once
        const args = code.slice(m.index + m[0].length, m.index + m[0].length + 300);
        if (/^\s*(document\.documentElement|document\.body|document)\b/.test(args)) continue; // outlives the page
        if (m[1] === 'DOMAdd' && removed.has((args.match(/^\s*(['"`])([^'"`]+)\1/) || [])[2])) continue;
        if (/^(ElementResize|Intersect)$/.test(m[1]) && /^[^,]+,\s*[A-Za-z_$][\w$.]*\s*[,)]/.test(args)) continue; // dedup pool + stable ref
        const fnOpen = outerFn(bare, m.index);
        const fnBody = bare.slice(fnOpen, blockEnd(bare, fnOpen)); // the latch may be set after the call
        if (/if\s*\(\s*!?\s*([\w$.]+)\s*\)\s*return\b[\s\S]*?\1\s*=(?!=)/.test(fnBody)
            || /if\s*\(\s*!\s*([\w$.]+)\s*\)\s*\{\s*\1\s*=\s*true/.test(fnBody)) continue; // one-shot latch
        hit('JSP-04b', m.index, `NDS.on${m[1]}(…) handle dropped`, 'a once-per-page bootstrap or an annotation exempts it');
    }

    // The header of the section `at` sits in: the nearest comment block above it holding a
    // `// ----` or `// ====` divider, the files' section marker.
    const sectionHeader = (at) => {
        const lines = source.slice(0, at).split('\n');
        for (let k = lines.length - 1; k >= 0; k--) {
            if (!/^\s*\/\/\s*[-=]{6,}\s*$/.test(lines[k])) continue;
            let a = k, b = k;
            while (a > 0 && /^\s*\/\//.test(lines[a - 1])) a--;
            while (b < lines.length - 1 && /^\s*\/\//.test(lines[b + 1])) b++;
            return lines.slice(a, b + 1).join('\n');
        }
        return '';
    };

    // JSD-12 a guard on a sibling namespace no comment in its scope explains.
    const own = name.replace(/^nds-|\.js$/g, '').split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join('');
    const guarded = new Set();
    for (const m of code.matchAll(/\bNDS\.([A-Z]\w*)\s*(?:\?\.|&&|\))|typeof\s+NDS\.([A-Z]\w*)/g)) {
        const sib = m[1] || m[2];
        if (CORE.has(sib) || sib === own) continue;
        const ctx = code.slice(Math.max(0, m.index - 12), m.index);
        if (m[0].endsWith(')') && !/(?:\bif\s*\(\s*|!\s*|&&\s*|\|\|\s*)$/.test(ctx)) continue; // a call's argument, not a test
        guarded.add(sib);
        const from = lineStart(source, outerFn(bare, m.index) || m.index, 3); // the outermost function and its leading comment
        const names = new RegExp(`\\b${sib}\\b`);
        if (names.test(commentsIn(source, code, from, m.index)) || names.test(sectionHeader(from))) continue;
        hit('JSD-12', m.index, `NDS.${sib} guard`, 'no comment in its scope names it; a cross-reference may still cover it');
    }
    for (const sib of guarded) {
        for (const m of code.matchAll(new RegExp(`(?<![?.&\\w])NDS\\.${sib}\\.[a-z]\\w*\\(`, 'g'))) {
            const opens = blocksAround(bare, m.index);
            const fnBody = bare.slice(outerFn(bare, m.index), m.index);
            const stmt = fnBody.slice(Math.max(fnBody.lastIndexOf(';'), fnBody.lastIndexOf('}'), fnBody.lastIndexOf('{')) + 1);
            if (new RegExp(`NDS\\.${sib}\\s*(?:&&|\\?|\\))`).test(stmt)) continue; // same statement: if (NDS.X [&& …]) NDS.X.y()
            if (new RegExp(`if\\s*\\([^;{]*!\\s*NDS\\.${sib}\\b[^;{]*\\)\\s*return\\b`).test(fnBody)) continue; // early return
            if (opens.some((o) => new RegExp(`if\\s*\\([^)]*\\bNDS\\.${sib}\\b[^)]*\\)\\s*$`).test(bare.slice(Math.max(0, o - 120), o)))) continue; // inside if (NDS.X) { }
            hit('JSD-12', m.index, `raw NDS.${sib} call in a file that guards it elsewhere`, 'check the path cannot run without it');
        }
    }

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
    [`(function(){ function f() { const io = new IntersectionObserver(cb); } })();`, ['JSP-03']],
    [`(function(){ function f() { new ResizeObserver(cb).observe(el); } })();`, ['JSP-04a']],
    [`(function(){ function f() { const mo = new MutationObserver(cb); } })();`, ['JSP-05']],
    [`(function(){ function f() {\n// characterData: the pool has no text-node mode\nconst mo = new MutationObserver(cb); } })();`, ['JSP-05?']],
    [`(function(){ class A { constructor() { NDS.onResize(() => this.fit()); } } })();`, ['JSP-04b?']],
    [`(function(){ class A { constructor() { this.off = NDS.onResize(() => this.fit()); } } })();`, []], // stored
    [`(function(){ NDS.onDOMAdd('.x', wire); })();`, []], // module body runs once
    [`(function(){ function init() { NDS.onResize(fit, document.body); } })();`, ['JSP-04b?']],
    [`(function(){ function init() { NDS.onAttrChange(document.documentElement, ['lang'], f); } })();`, []], // outlives the page
    [`(function(){ function init() { if (done) return; done = true; NDS.onResize(fit); } })();`, []], // latch
    [`(function(){ function init() { if (!done) { done = true; NDS.onResize(fit); } } })();`, []], // latch, block form
    [`(function(){ function init() { NDS.onElementResize(el, fit); } })();`, []], // dedup pool, stable ref
    [`(function(){ function f() { NDS.Modal?.open(m); } })();`, ['JSD-12?']],
    [`(function(){ function f() {\n// Soft dependency: no dimming if NDS.Backdrop is not bundled.\nif (NDS.Backdrop) NDS.Backdrop.show(); } })();`, []],
    [`(function(){\n// ------\n// Soft dependency: Panel is optional here.\n// ------\nfunction a() { NDS.Panel?.open(p); }\nfunction b() { NDS.Panel?.close(p); } })();`, []], // section header
    [`(function(){ function f() { NDS.State?.add(el, 'x'); } })();`, []], // core
    [`(function(){\n// Soft dependency: Copy is optional.\nfunction a() { NDS.Copy?.run(); }\nfunction b() { NDS.Copy.run(); } })();`, ['JSD-12?']], // raw where guarded elsewhere
    [`(function(){\n// Soft dependency: Copy is optional.\nfunction a() { NDS.Copy?.run(); }\nfunction b() { if (!NDS.Copy) return; NDS.Copy.run(); } })();`, []],
    [`(function(){\n// Soft dependency: Alert is optional.\nfunction a() { if (!el || !NDS.Alert) return; NDS.Alert.show(el); }\nfunction b() { NDS.Alert.dismiss(el); } })();`, ['JSD-12?']], // || !NDS.X is a guard too
    [`(function(){ function f() { log(NDS.Modal); } })();`, []], // passed as an argument, not a test
    [`(function(){ function f() {\nconst h = \`<i class="\${a ? \`x\` : \`y\`}">\`;\n// Soft dependency: Copy is optional.\nNDS.Copy?.init(); } })();`, []], // a nested template keeps the scanner in step
    [`(function(){ class A {\n// Soft dependency: Alert is optional.\nshow() { if (!NDS.Alert) return; NDS.Alert.show(); }\nhide() { NDS.Alert.dismiss(); } } })();`, ['JSD-12?']], // a guard in one method covers no other
];

const args = process.argv.slice(2);
if (args[0] === '--self-test') {
    let failed = 0;
    for (const [src, want] of CASES) {
        const got = checkFile('case.js', src).map((f) => f.rule + (f.verify ? '?' : '')).sort(); // ? = a verify line
        if (got.join() !== [...want].sort().join()) { failed++; console.log(`FAIL  ${JSON.stringify(src)}\n      want [${want}] got [${got}]`); }
    }
    console.log(`${CASES.length - failed}/${CASES.length} cases pass`);
    process.exit(failed ? 1 : 0);
}
const files = args.length
    ? args.map((a) => (a.includes('/') || a.includes('\\') ? a : join(REPO, '_js', a)))
    : readdirSync(join(REPO, '_js')).filter((f) => /^nds-.*\.js$/.test(f) && !OUT_OF_SCOPE.has(f)).map((f) => join(REPO, '_js', f));
const all = [...files.flatMap((f) => checkFile(f)), ...(args.length && !args.some((a) => a.endsWith('nds-loader.js')) ? [] : checkLoader())];
for (const f of all) console.log(`${(f.verify ? 'verify' : 'finding').padEnd(8)} ${f.rule.padEnd(8)} ${`${f.file}:${f.line}`.padEnd(30)} ${f.what}${f.verify ? `  — ${f.verify}` : ''}`);
const findings = all.filter((f) => !f.verify);
console.log(`\n${files.length} files, ${findings.length} findings, ${all.length - findings.length} to verify`);
process.exit(findings.length ? 1 : 0);
