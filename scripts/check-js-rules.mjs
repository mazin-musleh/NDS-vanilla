#!/usr/bin/env node
/**
 * The mechanical half of nds-js-audit: the rules whose pattern AND carve-outs a script can decide.
 * The audit runs this first and judges only what it prints; the rule rows in
 * .claude/skills/nds-js-audit/RULES-*.md keep the meaning and the fix.
 *
 *   node scripts/check-js-rules.mjs [file …]   default: every _js/nds-*.js in the audit's scope
 *
 * Rules, decided or listed for the reader:
 *   JSP  01, 02, 03, 04 (a)(b), 05, 06 (a)(c), 07, 08, 09, 10, 11, 12
 *   JSS  01, 02, 04, 05, 06
 *   JSD  01, 02, 03, 04, 05 (a)(b), 06, 07, 08, 09, 10, 11, 12, 13, 14 (a)-(e), 15 (PERSONA entry 11), 16, 17, 18, 19, 20 (b) soft Rides
 *   JSA  01, 02, 03, 04, 05 (registry hygiene), 06, 07, 09, 11 (length + concerns), 13, 21 (a), 22, 23 (a)
 * Left to the reader whole: JSD-15's other PERSONA entries, the rest of JSD-20 (check-banners.mjs), and the JSA rules that are judgment only.
 * Two kinds of line: `finding` is decided; `verify` is a candidate whose one remaining carve-out
 * needs reading, named on the line. Never writes files. Exit 0 = no finding, 1 = findings.
 *   --self-test   run the built-in cases, and PERSONA's `js` blocks through the naming rules
 *   --names [file …]   only the naming rules (PERSONA entries 1, 10, 12; scripts/lib/js-names.mjs), over the
 *                 whole of _js/ with the event packs; the rule id is P<entry>.<rule>, then a count per rule.
 *                 A run of its own (its scope is all of _js/, the default's is the audit's); the audit and the release run both.
 */
// ponytail: a char scanner, not a parser. A `/` after `)` reads as division, so a regex literal
// right after a closing paren can mis-strip one line; an acorn walk is the upgrade if that bites.
// The self-test holds one case per blind spot found so far (nested templates, `return /re/`).

import { readFileSync, readdirSync } from 'node:fs';
import { basename, join } from 'node:path';
import { REPO, PAGE_DIRS, loaderNames } from './lib/nds-source.mjs';
import { checkNames } from './lib/js-names.mjs';

// The audit's `js` scope (SKILL.md): core owns state/status, the loader and docs are out of scope.
const OUT_OF_SCOPE = new Set(['nds-core.js', 'nds-loader.js', 'nds-docs.js']);

// JSD-01's vocabulary gate: any other data-state token is the component's private classification.
const VOCAB = new Set(['open', 'closing', 'opening', 'closed', 'show', 'hide', 'shown', 'hidden',
    'active', 'inactive', 'selected', 'expanded', 'collapsed']);

// JSD-01 (c) skips the rule row names, each a selector its writer list cannot decide.
const ALLOW = [
    // Mixed writers: Custom Select stamps `selected` on the items Dropmenu marks; one selector reads both.
    { file: 'nds-dropmenu.js', near: '_getCurrentItem()' },
    // The nav's flag must hold through the close, and openDropdowns drops a menu when it STARTS closing.
    { file: 'nds-main-nav.js', near: 'function syncOpenFlags()' },
];

// JSA-22 skips the row's own carve-out: input tolerance that keeps no name alive.
const COMPAT_OK = [
    { file: 'nds-filter.js', near: 'Selectors with punctuation pass through' },
    { file: 'nds-code.js', near: 'Class wins (explicit override' },
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

// JSD-04: functions that need the whole lang tag (region or script), which NDS.lang drops.
const FULL_TAG = [
    { file: 'nds-voice-input.js', fn: 'getLanguage' }, // SpeechRecognition.lang wants ar-SA, not ar
    { file: 'nds-date.js', fn: 'format' }, // Intl locales read the region
    { file: 'nds-accessibility.js', fn: 'isLetterSpacingBlocked' }, // the script subtag decides cursive
];

// Blanks comments to spaces (newlines kept, so line numbers hold) and returns the code plus its strings.
function scan(source) {
    let code = '';
    const strings = []; // { text, at }
    const regexps = []; // { at, end }: blanked in `bare` like string bodies
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
        if (c === '/' && (prev === '' || '(,=:[!&|?{};+-*%<>~^'.includes(prev)
            || /\b(?:return|typeof|case|in|of|delete|void|throw|new|else|do|yield|await)\s*$/.test(code.slice(-12)))) {
            let j = i + 1, cls = false;
            while (j < source.length && source[j] !== '\n') {
                if (source[j] === '\\') { j += 2; continue; }
                if (source[j] === '[') cls = true; else if (source[j] === ']') cls = false;
                else if (source[j] === '/' && !cls) break;
                j++;
            }
            regexps.push({ at: i, end: j });
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
    for (const r of regexps) for (let k = r.at + 1; k < r.end; k++) chars[k] = ' ';
    return { code, bare: chars.join(''), strings };
}

// The `{` of every block enclosing `at`, innermost first.
function blocksAround(bare, at) {
    const { opens, close, parent } = blockIndex(bare);
    let lo = 0, hi = opens.length - 1, o = -1;
    while (lo <= hi) { const mid = (lo + hi) >> 1; if (opens[mid] < at) { o = opens[mid]; lo = mid + 1; } else hi = mid - 1; }
    while (o !== -1 && close.get(o) <= at) o = parent.get(o); // a sibling that ended before `at`: climb
    const chain = [];
    for (; o !== -1; o = parent.get(o)) chain.push(o);
    return chain;
}

// Every block of one file, indexed once: its `{` offsets in order, where each closes, its parent.
let indexed, index;
function blockIndex(bare) {
    if (indexed === bare) return index;
    const opens = [], close = new Map(), parent = new Map(), stack = [];
    for (let i = 0; i < bare.length; i++) {
        if (bare[i] === '{') { parent.set(i, stack.at(-1) ?? -1); stack.push(i); opens.push(i); }
        else if (bare[i] === '}' && stack.length) close.set(stack.pop(), i + 1);
    }
    for (const o of stack) close.set(o, bare.length);
    indexed = bare;
    index = { opens, close, parent };
    return index;
}

// `expr` split at its top-level `+` (outside strings, templates and brackets), each term trimmed.
function plusTerms(expr) {
    const terms = [];
    let depth = 0, from = 0;
    for (let i = 0; i < expr.length; i++) {
        const c = expr[i];
        if (c === '"' || c === "'" || c === '`') { i = stringEnd(expr, i); continue; }
        if ('([{'.includes(c)) depth++;
        else if (')]}'.includes(c)) depth--;
        else if (c === '+' && depth === 0 && expr[i + 1] !== '+' && expr[i - 1] !== '+' && expr[i + 1] !== '=') { terms.push(expr.slice(from, i)); from = i + 1; }
    }
    terms.push(expr.slice(from));
    return terms.map((t) => t.trim()).filter(Boolean);
}

// The `{` of every function (or method) around `at` below the module wrapper, innermost first.
// A block is a function when `)` or `=>` leads into it and the `(` before is no if/for/while/switch/catch.
function fnBlocks(bare, at) {
    const found = [];
    for (const o of blocksAround(bare, at).slice(0, -1)) { // the last is the module IIFE
        const head = bare.slice(Math.max(0, o - 400), o).trimEnd();
        if (head.endsWith('=>')) { found.push(o); continue; }
        if (!head.endsWith(')')) continue; // class body, object literal, else, try
        let depth = 0, k = head.length - 1;
        for (; k >= 0; k--) { if (head[k] === ')') depth++; else if (head[k] === '(' && --depth === 0) break; }
        if (!/\b(if|for|while|switch|catch|with)\s*$/.test(head.slice(0, k))) found.push(o);
    }
    return found;
}
// The name of the function whose body opens at `open`: `init` for `init() {`, `function init(`,
// `init: function (`, `init = () =>`; '' for an anonymous callback.
function fnName(bare, open) {
    const head = bare.slice(Math.max(0, open - 300), open).trimEnd();
    const m = head.match(/(?:\bfunction\s+([\w$]+)\s*\([^()]*\)|([\w$]+)\s*\([^()]*\)|([\w$]+)\s*[:=]\s*(?:async\s+)?(?:function\b[^(]*)?\([^()]*\)\s*=>?|([\w$]+)\s*[:=]\s*(?:async\s+)?[\w$]+\s*=>)$/);
    const name = m && (m[1] || m[2] || m[3] || m[4]);
    return name && !/^(if|for|while|switch|catch|function)$/.test(name) ? name : '';
}
const outerFn = (bare, at) => fnBlocks(bare, at).at(-1) ?? 0;
const innerFn = (bare, at) => fnBlocks(bare, at)[0] ?? 0;

// The arguments of the call whose `(` is at `open`: [{ text, at }], split at top-level commas.
function argsAt(code, bare, open) {
    const args = [];
    let depth = 0, from = open + 1;
    for (let i = open; i < bare.length; i++) {
        const c = bare[i];
        if ('([{'.includes(c)) depth++;
        else if (')]}'.includes(c)) { if (--depth === 0) { args.push({ text: code.slice(from, i).trim(), at: from }); break; } }
        else if (c === ',' && depth === 1) { args.push({ text: code.slice(from, i).trim(), at: from }); from = i + 1; }
    }
    return args;
}

// The offset just past the `}` that closes the block opened at `open`.
function blockEnd(bare, open) {
    if (bare[open] === '{') return blockIndex(bare).close.get(open);
    let depth = 0;
    for (let i = open; i < bare.length; i++) {
        if (bare[i] === '{') depth++;
        else if (bare[i] === '}' && --depth === 0) return i + 1;
    }
    return bare.length;
}

const lineOf = (text, at) => text.slice(0, at).split('\n').length;
const lineEnd = (text, at) => { const n = text.indexOf('\n', at); return n < 0 ? text.length : n; };
// `s` with every regex metacharacter escaped, for building a pattern from a name.
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// The last non-space character before `at`, '' at the start (a cheap stand-in for a variable-length lookbehind).
const before = (text, at) => { let k = at - 1; while (k >= 0 && /\s/.test(text[k])) k--; return k < 0 ? '' : text[k]; };
const startsStatement = (text, at) => { const c = before(text, at); return c === '' || ';{}'.includes(c); };
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

const DEPRECATIONS = readFileSync(join(REPO, 'DEPRECATIONS.md'), 'utf8');
// The namespaces the loader registers (JSP-10 scopes to them).
const REGISTERED = new Set(loaderNames());

// Where each file ships ('main', 'delegated', …) and which file defines each namespace (PERSONA entry 11).
const BUNDLE = {};
for (const m of readFileSync(join(REPO, '_plugins', 'js_processor.rb'), 'utf8').matchAll(/'nds-([\w-]+)\.min\.js'\s*=>\s*\[([^\]]*)\]/g)) {
    for (const f of m[2].matchAll(/'([^']+\.js)'/g)) BUNDLE[f[1]] = m[1];
}
const HOME = {};
for (const f of readdirSync(join(REPO, '_js')).filter((x) => /^nds-.*\.js$/.test(x))) {
    const src = readFileSync(join(REPO, '_js', f), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
    for (const m of src.matchAll(/(?<![\w.$])(?:window\.)?NDS\.([A-Za-z]\w*)\s*=(?!=)/g)) HOME[m[1]] ??= f;
}
const inMain = (ns) => BUNDLE[HOME[ns]] === 'main';
const POOLS = 'Resize|ElementResize|Intersect|OutsideScroll|AttributeChange|DomAdd|DomRemove|ChildrenChange';
// JSD-08's core-utility allowlist; the values among them are read, not called, so only `?.` guards them.
const CORE_UTILS = ['state', 'status', 'breakpoints', 'lang', 'isRtl', 'isArabic', 'langKey', 'escapeHtml', 'debounce',
    'throttleToFrame', 'onResize', 'onElementResize', 'onIntersect', 'onDomAdd', 'onDomRemove', 'onChildrenChange',
    'onAttributeChange', 'onOutsideScroll', 'trapFocus', 'scrollLock', 'cache', 'i18n', 'setTopLayer',
    'getUniqueId', 'transitionSpeed', 'focusableSel', 'onIdle'];
// JSD-10: core functions a component must not re-declare.
const CORE_FNS = new Set(['escapeHtml', 'debounce', 'throttleToFrame', 'getUniqueId', 'transitionSpeed', 'onIdle', 'trapFocus', 'toSafeUrl', 'mergeOwnKeys', 'setValue', 'announce']);
const CORE_VALUES = new Set(['lang', 'isRtl', 'isArabic', 'langKey', 'focusableSel']);
// JSD-13: the CSS transition durations NDS uses, and the tokens a transition writes.
const DURATIONS = new Set([150, 200, 250, 300, 400]);
const TRANSITION = new Set(['closing', 'opening', 'show', 'hide', 'shown', 'hidden', 'entering', 'exiting', 'collapsing', 'expanding']);

function checkFile(file, source = readFileSync(file, 'utf8')) {
    if (typeof source !== 'string') throw new TypeError(`checkFile(${file}): source must be a string`);
    const { code, bare, strings } = scan(source);
    const name = basename(file);
    const out = [];
    const hit = (rule, at, what, verify) => out.push({ rule, file: name, line: lineOf(source, at), what, verify });

    // A regex source matching a call to any of `methods` on NDS.state, or a destructured alias of one.
    const aliases = {};
    for (const m of code.matchAll(/\{([^}]*)\}\s*=\s*NDS\.state\b/g)) {
        for (const part of m[1].split(',')) {
            const [key, alias] = part.split(':').map((s) => s.trim());
            if (key) (aliases[key] ||= []).push(alias || key);
        }
    }
    const stateCall = (methods) => `(?:NDS\\.state\\.(?:${methods.join('|')})|${methods.flatMap((k) => aliases[k] || []).join('|') || '(?!)'})`;
    const writers = [stateCall(['set', 'add', 'toggle', 'refresh'])];
    const writesToken = (token) => new RegExp(`(?:${writers.join('|')})\\s*\\([^;]*?['"\`][^'"\`]*\\b${token}\\b`).test(code);
    const gated = (value) => value.split(/\s+/).filter(Boolean).some((t) => VOCAB.has(t));
    // A per-element guard is a module WeakSet (entry 12 rule 14): `wired.add(el)`.
    const weakSets = [...code.matchAll(/\b(?:const|let|var)\s+([\w$]+)\s*=\s*new\s+WeakSet\b/g)].map((m) => m[1]);
    const addsTo = (target) => weakSets.length ? `\\b(?:${weakSets.join('|')})\\.add\\s*\\(\\s*${target}` : '(?!)';

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
    // writes through NDS.state is another component's (carve-out 2): a selector reads its state,
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

    // JSD-01 (d) an onAdd and an onRemove on one token: one effect written twice.
    const hooksOn = (method) => [...code.matchAll(new RegExp(`${stateCall([method])}\\s*\\(\\s*([^,]+?)\\s*,`, 'g'))];
    const removes = new Set(hooksOn('onRemove').map((m) => m[1]));
    for (const m of hooksOn('onAdd')) {
        if (removes.has(m[1])) hit('JSD-01d', m.index, m[0], 'register one NDS.state.onToggle unless the two hooks run different work');
    }

    // JSD-02 data-status outside NDS.status, read or write.
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
    const removed = new Set([...code.matchAll(/NDS\.onDomRemove\(\s*(['"`])([^'"`]+)\1/g)].map((m) => m[2]));
    for (const m of code.matchAll(new RegExp(`NDS\\.on(${POOLS})\\(`, 'g'))) {
        const before = bare.slice(0, m.index).trimEnd().at(-1);
        if (before && !';{})'.includes(before)) continue; // assigned, returned, passed or chained
        const opens = blocksAround(bare, m.index);
        if (opens.length <= 1) continue; // the module IIFE's own body runs once
        const args = code.slice(m.index + m[0].length, m.index + m[0].length + 300);
        if (/^\s*(document\.documentElement|document\.body|document)\b/.test(args)) continue; // outlives the page
        if (m[1] === 'DomAdd' && removed.has((args.match(/^\s*(['"`])([^'"`]+)\1/) || [])[2])) continue;
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
    const own = new Set([...code.matchAll(/\bNDS\.([A-Z]\w*)\s*=(?!=)/g)].map((m) => m[1])); // the namespaces this file defines
    const guarded = new Set();
    for (const m of code.matchAll(/\bNDS\.([A-Z]\w*)\s*(?:\?\.|&&|\|\||\))|typeof\s+NDS\.([A-Z]\w*)/g)) {
        const sib = m[1] || m[2];
        if (own.has(sib)) continue;
        const ctx = code.slice(Math.max(0, m.index - 12), m.index);
        if (m[0].endsWith(')') && !/(?:\bif\s*\(\s*|!\s*|&&\s*|\|\|\s*)$/.test(ctx)) continue; // a call's argument, not a test
        if (inMain(sib)) { hit('JSD-12', m.index, `NDS.${sib} guard: main always loads it, so remove it (PERSONA entry 11)`); continue; }
        if (BUNDLE[name] && BUNDLE[HOME[sib]] === BUNDLE[name]) { hit('JSD-12', m.index, `NDS.${sib} guard: it ships in this file's bundle, so remove it (PERSONA entry 11)`); continue; }
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

    // JSD-15 (PERSONA entry 11) a call from one injected bundle into another: they land in no order.
    const mine = BUNDLE[name];
    if (mine && mine !== 'main') {
        const seenNs = new Set();
        for (const m of code.matchAll(/\bNDS\.([A-Z]\w*)\b/g)) {
            const theirs = BUNDLE[HOME[m[1]]];
            if (!theirs || theirs === 'main' || theirs === mine || seenNs.has(m[1])) continue;
            seenNs.add(m[1]);
            hit('JSD-15', m.index, `NDS.${m[1]} ships in ${theirs}, this file in ${mine}`, 'entry 11: its result must be unused or awaited, or carry the commented stub check');
        }
    }
    // JSD-15 (entry 11) core or a base naming a component: a lower layer never names a higher one.
    const defined = Object.keys(HOME).filter((ns) => HOME[ns] === name);
    // The audit is a lowercase module, not a base: its messages name components on purpose.
    if (name === 'nds-core.js' || (name !== 'nds-audit.js' && defined.some((ns) => /^[a-z]/.test(ns)) && !defined.some((ns) => /^[A-Z]/.test(ns)))) {
        for (const m of code.matchAll(/\bNDS\.([A-Z]\w*)\b/g)) {
            if (HOME[m[1]] === name) continue;
            hit('JSD-15', m.index, `a base names NDS.${m[1]}, a component (entry 11): serve it through arguments, callbacks or a registry`);
        }
    }

    // A handler argument's body: inline, or the same-file function it names. `wrap` is the callee
    // when the name is bound to a call (`const h = NDS.throttleToFrame(fn)`).
    const bodyAt = (open) => code.slice(open, blockEnd(bare, open));
    const bodyOf = (arg) => {
        const t = arg.text.replace(/\.bind\([^)]*\)$/, '');
        const arrow = t.match(/^(?:async\s+)?(?:function\b[^(]*\([^)]*\)|\([^)]*\)|[\w$]+)\s*(=>)?\s*/);
        if (arrow && (arrow[1] || t.startsWith('function') || t.startsWith('async function'))) {
            const rest = arg.at + arg.text.indexOf(t) + arrow[0].length;
            return code[rest] === '{' ? { text: bodyAt(rest) } : { text: t.slice(arrow[0].length) };
        }
        const call = t.match(/^([\w$.]+)\s*\(/);
        if (call) return { wrap: call[1], text: t };
        const fn = t.split('.').at(-1);
        if (!/^[\w$]+$/.test(fn)) return null;
        for (const re of [`\\bfunction\\s+${fn}\\s*\\([^)]*\\)\\s*\\{`, `^\\s*(?:async\\s+)?${fn}\\s*\\([^)]*\\)\\s*\\{`, `\\b${fn}\\s*[:=]\\s*(?:async\\s+)?(?:function\\b[^(]*)?\\([^)]*\\)\\s*(?:=>\\s*)?\\{`]) {
            const d = new RegExp(re, 'm').exec(bare);
            if (d) return { text: bodyAt(d.index + d[0].length - 1) };
        }
        const expr = new RegExp(`\\b${fn}\\s*=\\s*(?:async\\s+)?(?:\\([^)]*\\)|[\\w$]+)\\s*=>\\s*([^;\\n]+)`).exec(code);
        if (expr) return { text: expr[1] }; // const off = () => target.removeEventListener(…)
        const bound = new RegExp(`\\b${fn}\\s*=\\s*([\\w$.]+)\\s*\\(`).exec(code);
        return bound ? { wrap: bound[1], text: code.slice(bound.index, bound.index + 200) } : null;
    };
    const annotated = (at) => commentsIn(source, code, lineStart(source, at, 3), at).trim();

    // True when `at` runs as the module IIFE's own straight-line code: no function block around it
    // and no `=>` or `function` earlier in its statement (an expression-bodied arrow has no block).
    const topLevel = (at) => {
        if (blocksAround(bare, at).length > 1 && outerFn(bare, at)) return false;
        const start = Math.max(bare.lastIndexOf(';', at), bare.lastIndexOf('{', at), bare.lastIndexOf('}', at));
        return !/=>|\bfunction\b/.test(bare.slice(start + 1, at));
    };
    // JSD-08 a guard on what the loader guarantees: NDS itself, a core utility, NDS.init, or the
    // file's own namespace, inside a function (module top level runs before the loader and passes).
    const coreGuard = new RegExp(`typeof\\s+(?:window\\.)?NDS\\b(?:\\.(${[...CORE_UTILS, 'init', ...own].join('|')})\\b)?`
        + `|(?<![\\w.])(?:window\\.)?NDS\\s*(?:\\?\\.|&&)`
        + `|\\bNDS\\.(${[...CORE_UTILS, 'init', ...own].join('|')})\\s*(\\?\\.|&&|\\))`, 'g');
    for (const m of code.matchAll(coreGuard)) {
        if (topLevel(m.index)) continue;
        const ns = m[1] || m[2];
        if (m[3] && m[3] !== '?.' && CORE_VALUES.has(ns)) continue; // NDS.isRtl && x reads a value
        if (m[3] === ')' && !/(?:\bif\s*\(\s*|!\s*|&&\s*|\|\|\s*)$/.test(code.slice(Math.max(0, m.index - 12), m.index))) continue;
        hit('JSD-08', m.index, m[0].trim(), annotated(m.index) ? 'the comment above must name it and say why it is optional' : undefined);
    }

    // JSD-13 a transition-end timer with a hardcoded duration: the timer sits in the function that
    // wrote a transition token, and its callback clears that element.
    const consts = Object.fromEntries([...code.matchAll(/\bconst\s+([\w$]+)\s*=\s*(\d+)\s*;/g)].map((m) => [m[1], +m[2]]));
    for (const m of code.matchAll(/\bsetTimeout\s*\(/g)) {
        const [cb, ms] = argsAt(code, bare, m.index + m[0].length - 1);
        if (!cb || !ms) continue;
        const mm = ms.text.match(/^([\w$]+(?:\.[\w$]+)?|\d+)(?:\s*\+\s*(\d+))?$/);
        if (!mm) continue;
        const [obj, prop] = mm[1].split('.');
        const base = /^\d+$/.test(mm[1]) ? +mm[1]
            : prop ? +((code.match(new RegExp(`\\bconst\\s+${obj}\\s*=\\s*\\{[^}]*\\b${prop}\\s*:\\s*(\\d+)`)) || [])[1])
            : consts[mm[1]];
        if (!DURATIONS.has(base) || (mm[2] && +mm[2] > 100)) continue;
        const fn = innerFn(bare, m.index);
        const scope = code.slice(fn, blockEnd(bare, fn));
        const write = new RegExp(`${stateCall(['set', 'add', 'remove'])}\\s*\\(\\s*([^,]+?)\\s*,\\s*['"\`]([a-z-]*)['"\`]`, 'g');
        const targets = [...scope.matchAll(write)].filter((w) => TRANSITION.has(w[2].split('-').at(-1))).map((w) => w[1]); // toast-hide counts
        if (!targets.length) continue;
        const body = bodyOf(cb)?.text || '';
        const clears = targets.some((t) => new RegExp(`${stateCall(['clear', 'remove', 'set'])}\\s*\\(\\s*${esc(t)}\\s*[,)]|${esc(t)}\\s*\\.\\s*(?:setAttribute\\(\\s*['"]hidden|removeAttribute\\(\\s*['"]hidden|remove\\(\\s*\\))`).test(body));
        if (!clears) continue;
        hit('JSD-13', m.index, `setTimeout(…, ${ms.text})`, annotated(m.index) ? 'the comment above may justify a fixed duration' : undefined);
    }

    // JSP-02 a scroll listener with no rate limit in its handler.
    for (const m of code.matchAll(/\.addEventListener\s*\(\s*(['"])scroll\1\s*,/g)) {
        const [, handler] = argsAt(code, bare, code.indexOf('(', m.index));
        const b = handler && bodyOf(handler);
        if (!b) { hit('JSP-02', m.index, 'scroll listener', 'its handler is not defined in this file: trace it'); continue; }
        if (b.wrap) {
            if (/^NDS\.(throttleToFrame|debounce)$/.test(b.wrap)) continue;
            const w = bodyOf({ text: b.wrap, at: 0 });
            if (w && /requestAnimationFrame\s*\(/.test(w.text)) continue;
        }
        const t = b.text;
        if (/requestAnimationFrame\s*\(|NDS\.(?:debounce|throttleToFrame|onResize)\s*\(|removeEventListener\s*\(/.test(t)) continue;
        if (/^\{\s*if\s*\(\s*![\w$.]+\.hasAttribute\([^)]*\)(?:\s*&&\s*[^(){};&|]+)*\s*\)\s*[\w$.]+\.setAttribute\([^)]*\)\s*;?\s*\}$/.test(t.trim())) continue; // one-time flag, plain reads may guard it
        const called = [...t.matchAll(/(?:this\.)?([\w$]+)\s*\(/g)].map((c) => bodyOf({ text: c[1], at: 0 }) || {});
        if (called.some((c) => /removeEventListener\s*\(/.test(c.text || ''))) continue; // a single-shot dismiss
        if (called.some((c) => c.wrap && /^NDS\.(throttleToFrame|debounce)$/.test(c.wrap))) continue; // calls a throttled function
        hit('JSP-02', m.index, 'scroll handler with no rAF / NDS.throttleToFrame / NDS.debounce');
    }

    // JSA-21 (a) an explicit smooth scroll the reduced-motion preference never reaches.
    for (const m of code.matchAll(/\.(scrollTo|scrollBy|scrollIntoView)\s*\(/g)) {
        const args = argsAt(code, bare, m.index + m[0].length - 1).map((a) => a.text).join(',');
        if (!/behavior\s*:\s*['"]smooth['"]/.test(args)) continue;
        const fn = outerFn(bare, m.index);
        if (/prefersReducedMotion|reduce-motion/.test(code.slice(fn, blockEnd(bare, fn)))) continue;
        hit('JSA-21a', m.index, `${m[1]}({ behavior: 'smooth' })`, annotated(m.index) ? 'the comment above may name why the motion is essential' : undefined);
    }

    // JSS-04 a message listener that never checks event.origin.
    for (const m of code.matchAll(/([\w$.]+)\.addEventListener\s*\(\s*(['"])message\2\s*,|([\w$.]+)\.onmessage\s*=/g)) {
        const target = m[1] || m[3];
        const b = m[1] ? bodyOf(argsAt(code, bare, code.indexOf('(', m.index))[1] || { text: '', at: 0 }) : { text: code.slice(m.index, m.index + 400) };
        if (b && /\borigin\b/.test(b.text)) continue;
        const port = /\.port[12]$/.test(target) || new RegExp(`\\b${target.split('.')[0]}\\s*=\\s*new\\s+MessageChannel`).test(code);
        hit('JSS-04', m.index, `${target} message handler reads no origin`, port ? 'a same-realm MessageChannel port no one else holds is exempt' : undefined);
    }

    const optsOf = (m) => argsAt(code, bare, code.indexOf('(', m.index)).slice(2).map((a) => a.text).join(',');
    const inFn = (at, re) => fnBlocks(bare, at).some((o) => re.test(fnName(bare, o)));

    // JSP-06 (a) per-element listeners in a loop with no signal; (c) a document / window listener
    // a constructor or init() adds with no signal and no removeEventListener.
    const loopsHit = new Set();
    for (const m of code.matchAll(/([\w$.]+)\.addEventListener\s*\(\s*(['"])([\w:-]+)\2/g)) {
        if (/\bsignal\b|\bonce\s*:\s*true/.test(optsOf(m))) continue;
        const fn = outerFn(bare, m.index);
        if (!fn) continue; // the module body runs once
        const scope = code.slice(fn, blockEnd(bare, fn));
        if (/if\s*\(\s*!?\s*([\w$.]+)\s*\)\s*return\b[\s\S]*?\1\s*=(?!=)|if\s*\(\s*!\s*([\w$.]+)\s*\)\s*\{\s*\2\s*=\s*true/.test(bare.slice(fn, blockEnd(bare, fn)))) continue; // latch
        const removed = new RegExp(`removeEventListener\\s*\\(\\s*['"]${m[3]}['"]`).test(code);
        if (/^(document|window)$/.test(m[1])) {
            if (!removed && inFn(m.index, /^(constructor|init|setup\w*)$/)) hit('JSP-06c', m.index, `${m[1]}.addEventListener('${m[3]}') per instance, no signal`);
            continue;
        }
        const loop = blocksAround(bare, m.index).find((o) => /(?:\.forEach|\.map)\s*\(\s*(?:\(?[\w$, ]*\)?\s*=>|function\b[^(]*\([^)]*\))\s*$|\bfor\s*\([^)]*\)\s*$/.test(bare.slice(Math.max(0, o - 120), o).trimEnd()));
        if (loop === undefined || removed) continue;
        if (/\.innerHTML\s*=\s*['"`]{2}|replaceChildren\s*\(|\.remove\s*\(\s*\)/.test(scope.slice(0, m.index - fn))) continue; // old nodes left with their listeners
        if (loopsHit.has(loop)) continue; // one line per loop
        loopsHit.add(loop);
        const guard = /data-nds-[\w-]+-initialized/.test(scope) || new RegExp(addsTo('')).test(scope);
        hit('JSP-06a', m.index, `${m[1]}.addEventListener('${m[3]}') in a loop, no signal`, guard || !/\bdestroy\b/.test(code) ? 'element-bound listeners behind a per-element guard self-clean' : 'one finding per loop: count its listeners');
    }

    // JSP-07 a hand-rolled trailing-edge debounce: clearTimeout(t) then t = setTimeout(…, N).
    for (const m of code.matchAll(/clearTimeout\s*\(\s*([\w$.]+)\s*\)\s*;?\s*\1\s*=\s*setTimeout\s*\(/g)) {
        const [, ms] = argsAt(code, bare, m.index + m[0].length - 1);
        if (!ms || !/^\d+$/.test(ms.text)) continue; // a variable delay is a scheduler, not a debounce
        const v = m[1].replace(/[.$]/g, '\\$&');
        const cancels = [...code.matchAll(new RegExp(`clearTimeout\\s*\\(\\s*${v}\\s*\\)`, 'g'))].length > 1; // a separate cancel: a latch
        if (cancels) continue;
        hit('JSP-07', m.index, `clearTimeout(${m[1]}) + setTimeout(…, ${ms.text})`, 'check it runs per event, not as orchestration');
    }

    // JSP-08 a MutationObserver never disconnected (document-root observers live for the page).
    for (const m of code.matchAll(/(?:(?:const|let|var)\s+([\w$]+)|([\w$.]+))\s*=\s*new\s+MutationObserver\s*\(/g)) {
        const name = (m[1] || m[2]).split('.').at(-1);
        if (new RegExp(`\\b${name}\\s*\\.\\s*disconnect\\s*\\(|\\.push\\(\\s*${name}\\s*\\)`).test(code)) continue;
        if (new RegExp(`\\b${name}\\.observe\\(\\s*document\\.(?:body|documentElement)\\b`).test(code)) continue;
        hit('JSP-08', m.index, `MutationObserver ${name} never disconnected`);
    }

    // JSP-09 per-element listeners wired in an onDomAdd callback with no matching onDomRemove.
    for (const m of code.matchAll(/NDS\.onDomAdd\s*\(\s*(['"`])([^'"`]+)\1\s*,/g)) {
        if (removed.has(m[2])) continue;
        const [, cb] = argsAt(code, bare, code.indexOf('(', m.index));
        const body = cb && bodyOf(cb)?.text;
        if (!body || !/\.addEventListener\s*\(/.test(body)) continue; // only refreshes or restyles: nothing to tear down
        const delegated = [...body.matchAll(/([\w$.]+)\.addEventListener\s*\(/g)].every((l) => /^(document|window|document\.body)$/.test(l[1]));
        if (delegated) continue;
        hit('JSP-09', m.index, `onDomAdd('${m[2]}') wires listeners, no onDomRemove`, 'a stable parent (delegation) or a self-guarding routine exempts it');
    }

    // JSP-10 a DOM walk at the top of a loader-registered module's IIFE, inside bundle eval.
    if (REGISTERED.has(own)) {
        for (const m of code.matchAll(/(?:document\.)?(querySelectorAll|getElementsByClassName|getElementsByTagName)\s*\(/g)) {
            if (blocksAround(bare, m.index).length !== 1 || !topLevel(m.index)) continue; // only the IIFE's own straight-line code
            const stmtEnd = code.indexOf(';', m.index);
            const stmt = code.slice(m.index, stmtEnd < 0 ? m.index + 400 : Math.max(stmtEnd, blockEnd(bare, code.indexOf('{', m.index))));
            if (!/forEach|for\s*\(/.test(stmt)) continue;
            hit('JSP-10', m.index, `${m[1]} walk in the module body`, annotated(m.index) ? 'the comment above may name why it must run at load' : undefined);
        }
    }

    // JSP-11 a forced layout read on the synchronous init() / constructor path (one helper deep).
    const READS = /\.getBoundingClientRect\s*\(|\.(?:offset|client|scroll)(?:Width|Height|Top|Left)\b(?!\s*=[^=])|\bgetComputedStyle\s*\(/g;
    const initBodies = [];
    for (const d of bare.matchAll(/(?:^|[\s;{}])(constructor|init)\s*\([^)]*\)\s*\{|\bfunction\s+init\s*\([^)]*\)\s*\{|\binit\s*[:=]\s*(?:function\s*)?\([^)]*\)\s*(?:=>\s*)?\{/gm)) {
        const open = d.index + d[0].length - 1;
        initBodies.push([open, d[1] || 'init']);
        for (const c of code.slice(open, blockEnd(bare, open)).matchAll(/(?<![\w$.])(?:this\.)?([\w$]+)\s*\(/g)) {
            const h = new RegExp(`(?:^|[\\s;{}])(?:function\\s+)?${c[1]}\\s*\\([^)]*\\)\\s*\\{`, 'm').exec(bare);
            if (h && !/^(if|for|while|switch|catch|function|init|constructor)$/.test(c[1])) initBodies.push([h.index + h[0].length - 1, `${d[1] || 'init'} → ${c[1]}`]);
        }
    }
    const seenRead = new Set();
    for (const [open, via] of initBodies) {
        const end = blockEnd(bare, open);
        for (const r of code.slice(open, end).matchAll(READS)) {
            const at = open + r.index;
            if (innerFn(bare, at) !== open || seenRead.has(at)) continue; // a nested callback runs later
            seenRead.add(at);
            hit('JSP-11', at, `${r[0].replace(/\s*\($/, '()')} on the ${via} path`, 'a read on an element not yet in the page, or one JSA-02 already flags, is exempt');
        }
    }

    // JSP-12 a stored onTransitionEnd handle overwritten without cancelling the prior one.
    for (const m of code.matchAll(/([\w$]+(?:\.[\w$]+)+)\s*=\s*NDS\.onTransitionEnd\s*\(/g)) {
        const h = m[1].replace(/[.$]/g, '\\$&');
        const before = code.slice(lineStart(code, m.index, 3), m.index);
        if (new RegExp(`${h}\\s*(?:\\?\\.)?\\(\\s*\\)`).test(before)) continue; // the prior handle runs first
        const fn = innerFn(bare, m.index);
        if (/^\{\s*if\s*\([^)]*\)\s*return\b/.test(code.slice(fn, fn + 300))) continue; // early return on state
        hit('JSP-12', m.index, `${m[1]} re-armed without cancelling the prior handle`, annotated(m.index) ? 'the comment above may say why a second run is harmless' : undefined);
    }

    // ── DRY / consistency ───────────────────────────────────────────────────

    // JSD-03 a breakpoint pixel literal in JS: (a) a viewport comparison, (b) a CSS-variable
    // fallback, (c) a matchMedia width or height.
    const inBp = (n) => +n >= 400 && +n <= 2000;
    for (const m of code.matchAll(/(?:window\.innerWidth|document\.(?:documentElement|body)\.clientWidth)\s*(?:<=?|>=?|[!=]==?)\s*(\d+)|(\d+)\s*(?:<=?|>=?|[!=]==?)\s*(?:window\.innerWidth|document\.(?:documentElement|body)\.clientWidth)/g)) {
        if (inBp(m[1] || m[2])) hit('JSD-03a', m.index, m[0]);
    }
    for (const m of code.matchAll(/getPropertyValue\([^)]*\)\)?\s*\|\|\s*(768|1024|1280|1440)\b/g)) hit('JSD-03b', m.index, `CSS variable fallback ${m[1]}`);
    for (const s of strings) {
        if (!/\((?:min|max)-(?:width|height)\s*:\s*\d+/.test(s.text) || !/matchMedia\s*\(\s*$/.test(code.slice(Math.max(0, s.at - 30), s.at))) continue;
        for (const n of s.text.matchAll(/(?:min|max)-(?:width|height)\s*:\s*(\d+)/g)) if (inBp(n[1])) { hit('JSD-03c', s.at, `matchMedia('${s.text}')`); break; }
    }

    // JSD-04 a document-level dir / lang read that re-derives NDS.isRtl / NDS.lang. A full tag
    // handed to Intl or speech is exempt: NDS.lang keeps only the primary subtag.
    const rootAlias = [...code.matchAll(/(?:const|let|var)\s+([\w$]+)\s*=\s*document\.(?:documentElement|body)\s*[;,\n]/g)].map((a) => esc(a[1]));
    const ROOT = `(?:document\\.(?:documentElement|body)${rootAlias.map((a) => `|(?<![\\w$.])${a}`).join('')})`;
    for (const m of code.matchAll(new RegExp(`\\bdocument\\.dir\\b|${ROOT}\\.(?:dir|lang)\\b|${ROOT}\\.getAttribute\\(\\s*['"](dir|lang)['"]\\s*\\)|\\bdocument\\.lang\\b`, 'g'))) {
        const stmt = code.slice(Math.max(code.lastIndexOf(';', m.index), code.lastIndexOf('{', m.index), code.lastIndexOf('}', m.index)) + 1, code.indexOf(';', m.index));
        if (/\bIntl\.|Locale\(|SpeechRecognition|\.lang\s*=(?!=)|recognition/.test(stmt)) continue;
        if (/^\s*=(?!=)/.test(code.slice(m.index + m[0].length))) continue; // a write sets the direction, it reads nothing
        if (FULL_TAG.some((a) => a.file === name && a.fn === fnName(bare, innerFn(bare, m.index)))) continue;
        hit('JSD-04', m.index, m[0], 'a full-tag read passed to an API that needs the region or script is exempt');
    }

    // JSD-06 a layout read after a style write inside one loop body (thrash per iteration).
    const W = /\.style\.[\w$]+\s*=(?!=)|\.style\.setProperty\s*\(|\.classList\.(?:add|remove|toggle)\s*\(/g;
    const R = /\.getBoundingClientRect\s*\(|\.(?:offset|client|scroll)(?:Width|Height|Top|Left)\b(?!\s*=[^=])|\bgetComputedStyle\s*\(/g;
    for (const o of [...bare.matchAll(/(?:\.forEach|\.map)\s*\(\s*(?:\(?[\w$, ]*\)?\s*=>|function\b[^(]*\([^)]*\))\s*\{|\b(?:for|while)\s*\([^)]*\)\s*\{/g)]) {
        const open = o.index + o[0].length - 1;
        const body = code.slice(open, blockEnd(bare, open));
        const w = [...body.matchAll(W)][0];
        if (!w) continue;
        const r = [...body.matchAll(R)].find((x) => x.index > w.index && !/^\s*(?:void\s+)?[\w$.]+\.offset(?:Height|Width)\s*;/m.test(body.slice(body.lastIndexOf('\n', x.index) + 1, body.indexOf('\n', x.index))));
        if (!r) continue;
        hit('JSD-06', open + r.index, `layout read after a style write in a loop`, commentsIn(source, code, open, open + w.index + 120).trim() ? 'a commented staged measurement is exempt' : undefined);
    }

    // JSD-16 a falsy const guarding code that can never run.
    for (const m of code.matchAll(/(?:^|(?<=[;{}]))\s*const\s+([\w$]+)\s*=\s*(?:''|""|0|false|null)\s*;/gm)) {
        const g = new RegExp(`if\\s*\\(\\s*${m[1]}\\s*&&`).exec(code);
        if (!g || new RegExp(`NDS\\.[\\w$.]+\\s*=\\s*${m[1]}\\b|export\\s+const\\s+${m[1]}\\b`).test(code)) continue;
        hit('JSD-16', g.index, `if (${m[1]} && …) can never run`, annotated(m.index) ? 'the comment must say why it is off and how to turn it on' : undefined);
    }

    // JSD-17 a bare element-arity function handed to a DOM-bus subscription, which passes an array.
    for (const m of code.matchAll(/NDS\.on(?:DomAdd|DomRemove|ChildrenChange)\s*\(/g)) {
        const [, cb] = argsAt(code, bare, m.index + m[0].length - 1);
        if (!cb || !/^[\w$.]+$/.test(cb.text)) continue; // an inline callback shows its own shape
        const fn = cb.text.split('.').at(-1);
        const d = new RegExp(`(?:\\bfunction\\s+${fn}\\s*\\(\\s*([\\w$]+)|\\b${fn}\\s*[:=]\\s*(?:function\\s*\\(\\s*([\\w$]+)|\\(?\\s*([\\w$]+)\\s*\\)?\\s*=>)|^\\s*${fn}\\s*\\(\\s*([\\w$]+))`, 'm').exec(code);
        const p = d && (d[1] || d[2] || d[3] || d[4]);
        if (!p) continue;
        const body = code.slice(d.index, d.index + 1500);
        if (new RegExp(`\\b${p}\\s*\\.\\s*(?:forEach|length|map|filter)\\b|for\\s*\\([^)]*\\bof\\s+${p}\\b`).test(body)) continue;
        if (new RegExp(`\\b${p}\\s*\\.\\s*(?:getAttribute|setAttribute|querySelector\\w*|matches|closest|classList|style|dataset)\\b`).test(body)) hit('JSD-17', m.index, `${cb.text} takes one element; the bus passes an array`);
    }

    // JSD-09 teardown that releases what was never stored: (a)(b) a handler or observer property
    // no line assigns, (c) a stored NDS.on* handle never called, (d) a collection never filled.
    const assigned = (owner, prop) => new RegExp(`${owner.replace(/[.$]/g, '\\$&')}\\s*\\.\\s*${prop}\\s*=(?!=)|${owner.replace(/[.$]/g, '\\$&')}\\s*\\[\\s*['"]${prop}['"]\\s*\\]\\s*=(?!=)`).test(code);
    for (const m of code.matchAll(/removeEventListener\s*\(\s*['"][\w:-]+['"]\s*,\s*([\w$]+(?:\.[\w$]+)*)\.([\w$]+)\s*[,)]/g)) {
        if (!assigned(m[1], m[2]) && !/^(NDS|window|document)$/.test(m[1])) hit('JSD-09', m.index, `removeEventListener(…, ${m[1]}.${m[2]}) — never assigned`);
    }
    for (const m of code.matchAll(/\b((?:this|[\w$]+))\.([\w$]+)\.disconnect\s*\(\s*\)/g)) {
        if (!/^(cleanup|destroy|teardown|dispose)$/.test(fnName(bare, innerFn(bare, m.index)))) continue;
        if (!assigned(m[1], m[2])) hit('JSD-09', m.index, `${m[1]}.${m[2]}.disconnect() — never assigned`);
    }
    for (const m of code.matchAll(/\b((?:this|[\w$]+)\.(_?off\w*))\s*=\s*NDS\.on\w+\s*\(/g)) {
        // Any later read of the property (called, passed, pushed), on whatever owner holds it then.
        const refs = [...code.matchAll(new RegExp(`\\.${m[2]}\\b(?!\\s*=[^=])`, 'g'))].length;
        if (!refs) hit('JSD-09', m.index, `${m[1]} stored, never called`);
    }
    for (const m of code.matchAll(/(?<![\w$.])(_?off\w*)\s*=\s*NDS\.on\w+\s*\(/g)) { // a closure variable
        const decl = new RegExp(`\\b(?:let|var)\\s+${m[1]}\\b`).exec(code);
        if (!decl || blocksAround(bare, decl.index).length > 1) continue; // module scope only
        const reads = [...code.matchAll(new RegExp(`(?<![\\w$.])${m[1]}\\b(?!\\s*=[^=])`, 'g'))].filter((r) => !/(?:let|var)\s+$/.test(code.slice(Math.max(0, r.index - 8), r.index)));
        // Released when it is called, handed to a pool, or bridged to an abort.
        if (!reads.some((r) => /^\s*(?:\(|\?\.\()/.test(code.slice(r.index + m[1].length)) || /\.push\(\s*$|abort['"]\s*,\s*$/.test(code.slice(Math.max(0, r.index - 30), r.index)))) {
            hit('JSD-09', m.index, `${m[1]} stored, never called`, 'one page-lifetime subscription behind an init latch leaks nothing on re-init');
        }
    }
    for (const m of code.matchAll(/\b((?:this|[\w$]+)\.([\w$]+))\s*=\s*(?:\[\s*\]|new\s+(?:Set|Map|Array)\s*\(\s*\))/g)) {
        const f = m[1].replace(/[.$]/g, '\\$&');
        if (!new RegExp(`${f}\\s*\\.\\s*forEach\\s*\\(`).test(code)) continue;
        if (new RegExp(`${f}\\s*\\.\\s*(?:push|add|set|unshift|splice)\\s*\\(|${f}\\s*=\\s*[^\\[n]|${f}\\s*\\[[^\\]]+\\]\\s*=`).test(code.replace(m[0], ''))) continue;
        hit('JSD-09', m.index, `${m[1]} iterated in teardown, never filled`);
    }

    // JSD-10 a local helper shadowing a core utility: its name, or the escape idiom core ships.
    for (const m of code.matchAll(/\bfunction\s+([\w$]+)\s*\(|(?:const|let)\s+([\w$]+)\s*=\s*(?:\([^)]*\)|[\w$]+)\s*=>/g)) {
        const fname = m[1] || m[2];
        const body = code.slice(m.index, m.index + 600);
        if (CORE_FNS.has(fname)) { hit('JSD-10', m.index, `local ${fname}() has a core name`, 'a finding when its body copies NDS.' + fname + ' (65% overlap); a different job under the same name is not'); continue; }
        if (/\.replace\(\s*\/&\/g[\s\S]{0,200}\.replace\(\s*\/</.test(body) || /createElement\([^)]*\)[\s\S]{0,120}\.textContent\s*=[\s\S]{0,120}\.innerHTML/.test(body)) {
            hit('JSD-10', m.index, `local ${fname}() re-implements the HTML escape`, 'use NDS.escapeHtml unless the file runs before the loader');
        }
    }
    // JSD-10 (2b) an inline id lookup: NDS.resolveElement also takes `#id` and a selector, and gives null on a bad one.
    for (const m of code.matchAll(/typeof\s+([\w$.]+)\s*===\s*['"]string['"]\s*\?\s*document\.(?:getElementById|querySelector)\(\s*\1\s*\)/g)) {
        hit('JSD-10', m.index, `inline lookup of ${m[1]}`, 'NDS.resolveElement does this job; a finding unless the narrower lookup is the documented contract');
    }

    // JSD-20 (b) a Rides edge called soft whose base always loads with this file: main, or this file's bundle.
    const rides = /^[ \t]*\*[ \t]*Rides:([\s\S]*?)^[ \t]*\*[ \t]*(?:Requires|Methods):/m.exec(source.slice(0, 4000));
    for (const m of rides ? rides[1].replace(/^[ \t]*\*/gm, ' ').matchAll(/nds-([\w-]+)\s*\(([^()]*\bsoft\b[^()]*)\)/g) : []) {
        const base = BUNDLE[`nds-${m[1]}.js`];
        if (!base || (base !== 'main' && base !== BUNDLE[name]) || /\bsoft\s*—\s*\S/.test(m[2])) continue; // "soft — <why>" states it
        hit('JSD-20', source.indexOf(`nds-${m[1]}`, rides.index), `Rides calls nds-${m[1]} soft, yet it always loads with this file`, 'true only when soft means the markup is optional; otherwise drop it');
    }

    // JSD-14 (a) nesting past 4 levels in one function, (c) a ternary chain 3 deep, (d) code after an
    // unconditional terminator, (e) an unused side-effect-free local.
    const CONTROL = /(?:\b(?:if|for|while|switch|catch|with)\s*\([^]*\)|\b(?:else|try|do|finally)|=>|\bfunction\b[^(]*\([^)]*\)|\)\s*)$/;
    const depthAt = new Map();
    for (const b of bare.matchAll(/\{/g)) {
        const head = bare.slice(Math.max(0, b.index - 200), b.index).trimEnd();
        if (!CONTROL.test(head)) continue;
        if (/(?:forEach|map|filter|some|every|find)\s*\(\s*(?:\(?[\w$, ]*\)?\s*=>|function\b[^(]*\([^)]*\))$/.test(head)
            && (code.slice(b.index, blockEnd(bare, b.index)).match(/;/g) || []).length <= 3) continue; // a small array callback is idiom
        const fn = outerFn(bare, b.index + 1);
        if (!fn || fn === b.index) continue;
        const depth = blocksAround(bare, b.index + 1).filter((o) => o >= fn && o !== fn && CONTROL.test(bare.slice(Math.max(0, o - 200), o).trimEnd())).length;
        if (depth > (depthAt.get(fn)?.depth || 4)) depthAt.set(fn, { depth, at: b.index });
    }
    for (const [fn, d] of depthAt) hit('JSD-14a', d.at, `${d.depth} levels deep in ${fnName(bare, fn) || 'a callback'}`);
    // An expression ends at `;`, or at `,` `{` `}` outside parentheses (object properties, arguments).
    const exprs = [];
    for (let i = 0, from = 0, paren = 0, saved = []; i <= bare.length; i++) {
        const c = bare[i];
        if (c === '(' || c === '[') paren++; else if (c === ')' || c === ']') paren = Math.max(0, paren - 1);
        else if (c === '{') { saved.push(paren); paren = 0; } else if (c === '}') paren = saved.pop() ?? 0; // a block restarts the count
        if (i === bare.length || c === ';' || c === '{' || c === '}' || (paren === 0 && c === ',')) { exprs.push([from, i]); from = i + 1; }
    }
    // How deep ternaries nest in `t`: a `?` opens one, a `)` below its level closes it.
    const ternaryDepth = (t) => {
        let paren = 0, max = 0;
        const open = [];
        for (let i = 0; i < t.length; i++) {
            const c = t[i];
            if (c === '(' || c === '[') paren++;
            else if (c === ')' || c === ']') { paren--; while (open.length && open.at(-1) > paren) open.pop(); }
            else if (c === '?' && t[i + 1] !== '.' && t[i + 1] !== '?' && t[i - 1] !== '?') { open.push(paren); max = Math.max(max, open.length); }
        }
        return max;
    };
    for (const [from, to] of exprs) {
        const t = bare.slice(from, to);
        if (ternaryDepth(t) < 3) continue;
        // The branch values only: what follows each `?` up to its `:`, and the final else.
        const parts = code.slice(from, to).split(/\?(?![.?])/).slice(1);
        const values = [...parts.map((p) => p.split(':')[0]), parts.at(-1).split(':').at(-1)].map((v) => v.trim().replace(/[)\s]+$/, ''));
        if (values.every((v) => /^(?:'[^']*'|"[^"]*"|-?\d[\d.]*|true|false|null)$/.test(v)) && values.join('').length < 60) continue; // a small lookup
        hit('JSD-14c', from + t.search(/\?(?![.?])/), 'ternary chain 3+ deep');
    }
    for (const m of bare.matchAll(/\b(return|throw|break|continue)\b/g)) {
        if (!startsStatement(bare, m.index) || !before(bare, m.index)) continue; // a statement of its own
        let i = m.index, depth = 0;
        for (; i < bare.length; i++) {
            const c = bare[i];
            if ('([{'.includes(c)) depth++; else if (')]}'.includes(c)) { if (--depth < 0) break; } else if (c === ';' && depth === 0) { i++; break; }
            else if (c === '\n' && depth === 0 && /^(break|continue)$/.test(m[1])) break;
        }
        const next = bare.slice(i).match(/^\s*(\S+)/);
        if (!next || /^[}]/.test(next[1]) || /^(case|default)\b/.test(next[1])) continue;
        if (m[1] === 'throw' && blocksAround(bare, m.index).some((o) => /\btry\s*$/.test(bare.slice(Math.max(0, o - 20), o)))) continue;
        hit('JSD-14d', i + next.index, `unreachable after ${m[1]}`);
    }
    for (const m of code.matchAll(/\b(?:const|let)\s+([\w$]+)\s*=\s*([^;\n]*)/g)) {
        if (!startsStatement(code, m.index) && !/\n[ \t]*$/.test(code.slice(Math.max(0, m.index - 40), m.index))) continue;
        if (/[(.]|\bnew\b/.test(m[2])) continue; // a call, a construction or a property read may have an effect
        const open = blocksAround(bare, m.index)[0] ?? -1;
        const scope = code.slice(m.index + m[0].length, open >= 0 ? blockEnd(bare, open) : code.length);
        if (new RegExp(`(?:(?<![\\w$.])|(?<=\\.\\.\\.))${m[1]}(?![\\w$])`).test(scope)) continue; // a read, a spread included
        if (annotated(m.index)) continue;
        hit('JSD-14e', m.index, `${m[1]} is never read`);
    }

    // JSD-14 (b) a truthiness check the one before it dominates: after `if (!x) return`, or inside
    // `if (x) { … }`. A reassignment or an await between re-opens it; on a property path a call may too.
    // The operand must stand alone: `a === x && …` compares x, it does not test it.
    const alone = `(?<![\\w$.])(?<![=!<>]=?=?\\s*)`;
    const recheck = (x) => new RegExp(`(?:\\bif\\s*\\(\\s*!?\\s*${esc(x)}\\s*\\)|${alone}${esc(x)}\\s*(?:&&|\\?\\.)|${alone}${esc(x)}\\s*[!=]==?\\s*(?:null|undefined)\\b)`, 'g');
    const dominated = (x, from, to, kind) => {
        const region = bare.slice(from, to);
        for (const r of region.matchAll(recheck(x))) {
            const between = region.slice(0, r.index);
            if (new RegExp(`(?<![\\w$.])${esc(x)}\\s*(?:[+\\-*/|&]?=(?!=)|\\+\\+|--)`).test(between) || /\bawait\b/.test(between)) return;
            const prop = x.includes('.');
            if (prop && /[\w$)\]]\s*\(/.test(between)) return; // a call may have changed a property
            hit('JSD-14b', from + r.index, `${x} checked again after ${kind}`, prop ? 'a call between could have changed the property' : undefined);
            return;
        }
    };
    for (const g of bare.matchAll(/\bif\s*\(\s*!\s*([\w$]+(?:\.[\w$]+)*)\s*\)\s*(?:\{\s*)?(return|throw|continue|break)\b/g)) {
        if (!startsStatement(bare, g.index) || !before(bare, g.index)) continue;
        const open = blocksAround(bare, g.index)[0];
        if (open === undefined) continue;
        const end = blockEnd(bare, open);
        let i = g.index + g[0].length; // past the terminator's statement
        while (i < end && bare[i] !== ';' && bare[i] !== '}') i++;
        dominated(g[1], i + 1, end - 1, `if (!${g[1]}) ${g[2]}`);
    }
    for (const g of bare.matchAll(/\bif\s*\(\s*([\w$]+(?:\.[\w$]+)*)\s*\)\s*\{/g)) {
        const open = g.index + g[0].length - 1;
        dominated(g[1], open + 1, blockEnd(bare, open) - 1, `if (${g[1]}) {`);
    }

    // JSD-18 a sweep stamps its sentinel after a constructor that can bail.
    const bails = new Set([...code.matchAll(/class\s+([\w$]+)[^{]*\{/g)].filter((c) => {
        const ctor = code.indexOf('constructor', c.index);
        if (ctor < 0) return false;
        const open = code.indexOf('{', ctor);
        const body = code.slice(open, blockEnd(bare, open));
        return /\breturn\s*;|\breturn\s*\}/.test(body.replace(/=>\s*\{[\s\S]*?\}/g, ''));
    }).map((c) => c[1]));
    for (const m of code.matchAll(/new\s+([\w$]+)\s*\(\s*([\w$]+)[^)]*\)\s*;?([\s\S]{0,200})/g)) {
        if (!bails.has(m[1])) continue;
        const stamp = m[3].match(new RegExp(`${m[2]}\\s*\\.\\s*(?:setAttribute\\(\\s*['"]data-nds-[\\w-]+-initialized|nds[A-Z]\\w*\\s*=(?!=))|${addsTo(`${m[2]}\\s*\\)`)}`));
        if (!stamp || /\bif\s*\(/.test(m[3].slice(0, stamp.index))) continue;
        hit('JSD-18', m.index, `${m[2]} stamped after new ${m[1]}(), whose constructor can bail`, 'gate the stamp on the instance being valid');
    }

    // JSD-19 (dud) create() returns `new X(el)` from a constructor that can bail, without checking it.
    for (const m of code.matchAll(/\bcreate\s*(?::\s*(?:function\s*)?\(\s*([\w$]+)[^)]*\)\s*(?:=>)?|\(\s*([\w$]+)[^)]*\))\s*\{?/g)) {
        const open = code.indexOf('{', m.index);
        const body = m[0].endsWith('{') ? code.slice(open, blockEnd(bare, open)) : code.slice(m.index, lineEnd(code, m.index));
        // Only a `new X()` in the returned value hands back the dud; `new X(el); return el.ndsX || null` does not.
        const viaVar = body.match(/\b(?:const|let|var)\s+([\w$]+)\s*=\s*new\s+([\w$]+)\s*\(/);
        const made = m[0].endsWith('{')
            ? body.match(/\breturn\b[^;]*?\bnew\s+([\w$]+)\s*\(/) || (viaVar && new RegExp(`\\breturn\\s+${viaVar[1]}\\s*;`).test(body) ? [null, viaVar[2]] : null)
            : body.match(/\bnew\s+([\w$]+)\s*\(/);
        if (!made || !bails.has(made[1])) continue;
        if (/\._?valid\b|\binstanceof\b|\?\s*inst|return\s+[\w$]+\._?valid/.test(body)) continue; // it checks the build
        hit('JSD-19', m.index, `create returns new ${made[1]}() unchecked, and its constructor can bail: return null or the live instance`);
    }

    // JSD-19 a bare create() that skips the expando the sweep registers.
    const bareCreate = code.match(/\bcreate\s*:\s*(?:\(\s*([\w$]+)\s*\)|([\w$]+))\s*=>\s*new\s+([\w$]+)\s*\(\s*\1?\2?\s*\)\s*[,}\n]/);
    if (bareCreate) {
        const cls = bareCreate[3];
        const ctorAt = code.search(new RegExp(`class\\s+${cls}\\b`));
        const ctorBody = ctorAt < 0 ? '' : code.slice(ctorAt, blockEnd(bare, code.indexOf('{', ctorAt)));
        if (/\.nds[A-Z]\w*\s*=(?!=)/.test(code) && !/\.nds[A-Z]\w*\s*=\s*this\b/.test(ctorBody)) hit('JSD-19', bareCreate.index, `create returns new ${cls}() without the expando`);
    }

    // ── architecture ────────────────────────────────────────────────────────

    const kebabOwn = name.replace(/^nds-|\.js$/g, '');
    const loops = (at) => blocksAround(bare, at).some((o) => /(?:\.forEach|\.map)\s*\(\s*(?:\(?[\w$, ]*\)?\s*=>|function\b[^(]*\([^)]*\))\s*$|\b(?:for|while)\s*\([^)]*\)\s*$/.test(bare.slice(Math.max(0, o - 120), o).trimEnd()));

    // JSA-01 a document-wide walk iterated on the init() path with no yield (the component's own
    // root sweep is the loader's to schedule).
    for (const [open] of initBodies.filter(([, v]) => v === 'init')) {
        const body = code.slice(open, blockEnd(bare, open));
        if (/NDS\.onIdle|requestIdleCallback|requestAnimationFrame|postMessage/.test(body)) continue;
        for (const w of body.matchAll(/document\.(?:querySelectorAll|getElementsByClassName|getElementsByTagName)\s*\(\s*(['"`])([^'"`]+)\1\s*\)\s*\.forEach\s*\(\s*(?:\(?[\w$]+\)?\s*=>\s*)?([\w$.]+)?/g)) {
            if (new RegExp(`^\\.nds-${kebabOwn}\\b`).test(w[2]) || /^(create|this\.create|[\w$]*[Ii]nit\w*)$/.test(w[3] || '')) continue;
            hit('JSA-01', open + w.index, `init() walks ${w[2]}`, 'flag only when it can pass ~50 elements and need not settle before first paint');
        }
    }

    // JSA-02 three or more read/write alternations in one function's straight-line code.
    const RW = /\.getBoundingClientRect\s*\(|\.(?:offset|client|scroll)(?:Width|Height|Top|Left)\b(?!\s*=[^=])|\bgetComputedStyle\s*\(|\.style\.[\w$]+\s*=(?!=)|\.style\.setProperty\s*\(|\.classList\.(?:add|remove|toggle)\s*\(|\.setAttribute\(\s*['"](?:class|style)['"]/g;
    const seq = new Map(); // function open → R/W string
    for (const r of code.matchAll(RW)) {
        const fn = innerFn(bare, r.index);
        if (!fn || loops(r.index) && fnBlocks(bare, r.index)[0] === fn && blocksAround(bare, r.index).indexOf(fn) > 0) continue; // the loop form is JSD-06's
        const kind = /^\.(?:getBounding|offset|client|scroll)|getComputedStyle/.test(r[0].trimStart()) ? 'R' : 'W';
        const s = seq.get(fn) || { s: '', at: r.index };
        if (s.s.at(-1) !== kind) s.s += kind;
        seq.set(fn, s);
    }
    for (const [fn, s] of seq) if (s.s.length - 1 >= 3) hit('JSA-02', s.at, `${s.s.length - 1} read/write alternations in ${fnName(bare, fn) || 'a callback'}`, 'count only what runs in sequence: if/else arms and a staged measurement do not');

    // JSA-04 setTimeout(fn, 0) used as a yield.
    for (const m of code.matchAll(/\bsetTimeout\s*\(/g)) {
        const args = argsAt(code, bare, m.index + m[0].length - 1);
        if (args.length > 2 || (args[1] && args[1].text !== '0')) continue;
        const from = lineStart(source, Math.min(m.index, innerFn(bare, m.index) || m.index), 3); // its line, or its function's leading comment
        const said = commentsIn(source, code, from, lineEnd(code, m.index)).trim();
        hit('JSA-04', m.index, 'setTimeout(…, 0)', said ? 'exempt only if the comment names what the yield outlasts (a reset restore, a focus pass, a layout)' : undefined);
    }

    // JSA-06 a fetch with no signal in a file that never aborts one.
    if (!/\.abort\s*\(/.test(code)) {
        for (const m of code.matchAll(/(?<![\w$.])fetch\s*\(/g)) {
            const args = argsAt(code, bare, m.index + m[0].length - 1);
            if (args.slice(1).some((a) => /\bsignal\b/.test(a.text)) || /Promise\.all\s*\(\s*\[[^\]]*$/.test(code.slice(Math.max(0, m.index - 200), m.index))) continue;
            hit('JSA-06', m.index, 'fetch with no signal', 'only a handler a newer event supersedes needs an AbortController');
        }
    }

    // JSA-13 an rAF that gates the whole init (module body or init()) with no setTimeout racing it.
    for (const m of code.matchAll(/\brequestAnimationFrame\s*\(/g)) {
        const fn = innerFn(bare, m.index);
        const gate = topLevel(m.index) || /^init$/.test(fnName(bare, fn));
        if (!gate) continue;
        const scope = fn ? code.slice(fn, blockEnd(bare, fn)) : code;
        if (/\bsetTimeout\s*\(/.test(scope)) continue;
        hit('JSA-13', m.index, 'requestAnimationFrame gates init', 'a sub-step, animation or measurement is exempt unless it writes the reveal stamp');
    }

    // ── deep-read rules: the script runs the mechanical filter, the reader the judgment ──

    // JSA-03 a module-scope cache that is written and never pruned.
    for (const m of code.matchAll(/^\s{4}(?:const|let)\s+([\w$]+)\s*=\s*(new\s+(?:Map|Set)\s*\(\s*\)|\{\s*\})\s*;/gm)) {
        const v = esc(m[1]);
        const writes = new RegExp(`\\b${v}\\s*\\.\\s*(?:set|add)\\s*\\(|\\b${v}\\s*\\[[^\\]]+\\]\\s*=(?!=)`).exec(code);
        if (!writes || !outerFn(bare, writes.index)) continue;
        if (new RegExp(`\\b${v}\\s*\\.\\s*(?:delete|clear)\\s*\\(|delete\\s+${v}\\s*\\[|\\b${v}\\s*=(?!=)\\s*(?!${esc(m[2])})`).test(code.replace(m[0], ''))) continue;
        if (annotated(m.index)) continue; // a comment names the page-lifetime intent
        hit('JSA-03', m.index, `${m[1]} grows and is never pruned`, 'a finding only if the write runs per event, render or instance');
    }

    // JSA-07 a DOM-collection loop with a second walk or a linear search inside it.
    const collections = new Set([...code.matchAll(/(?:const|let|var)\s+([\w$]+)\s*=\s*(?:Array\.from\(\s*|\[\s*\.\.\.\s*)?[\w$.]*querySelectorAll\(/g)].map((m) => m[1]));
    for (const o of bare.matchAll(/([\w$.]+(?:\([^()]*\))?)\s*\.forEach\s*\(\s*(?:\(?[\w$, ]*\)?\s*=>|function\b[^(]*\([^)]*\))\s*\{|\bfor\s*\(\s*(?:const|let|var)\s+[\w$]+\s+of\s+([^)]+)\)\s*\{/g)) {
        const over = (o[1] || o[2] || '').trim();
        if (!/querySelectorAll|\.children\b/.test(over) && !collections.has(over.split('.')[0])) continue;
        const open = o.index + o[0].length - 1;
        const body = code.slice(open, blockEnd(bare, open));
        const inner = body.match(/querySelectorAll\([^)]*\)\s*\.forEach|\bfor\s*\([^)]*\bof\s+[^)]*querySelectorAll|([\w$]+)\s*\.\s*(?:find|some|filter|indexOf|includes)\s*\(/);
        if (!inner || (inner[1] && !collections.has(inner[1]))) continue;
        hit('JSA-07', open, `a nested walk inside a loop over ${over.slice(0, 40)}`, 'a finding when both sides can grow (rows × rows), not rows × a bounded few');
    }

    // JSA-09 two ten-line blocks with one shape (names, strings and numbers masked). Read from `bare`:
    // markup in a template literal is data, and a helper would hide its data-i18n markers from check-i18n.
    const norm = bare.split('\n').map((l) => l.replace(/(['"`])(?:\\.|(?!\1).)*\1/g, 'S').replace(/\b\d+\b/g, 'N').replace(/\b[A-Za-z_$][\w$]*\b/g, (w) => (/^(if|else|for|while|return|const|let|var|function|new|this|await|of|in)$/.test(w) ? w : 'I')).trim());
    const seen = new Map();
    let lastPair = -20;
    for (let i = 0; i + 10 <= norm.length; i++) {
        const win = norm.slice(i, i + 10);
        if (win.filter((l) => l.length > 15).length < 6) continue; // mostly braces: no shape to share
        const key = win.join('\n');
        const first = seen.get(key);
        if (first === undefined) { seen.set(key, i); continue; }
        if (i - first >= 10 && i - lastPair > 10) { hit('JSA-09', source.split('\n').slice(0, i).join('\n').length + (i ? 1 : 0),`10 lines repeat the shape at line ${first + 1}`, 'a finding when one helper would read better than two copies'); lastPair = i; }
    }

    // JSA-11 a function over 80 lines mixing render, state, IO and event binding. (The branch-outlier
    // trigger stays a deep read: medians over this tree's many small helpers flag every real function.)
    for (const b of bare.matchAll(/\{/g)) {
        const end = blockEnd(bare, b.index);
        const body = code.slice(b.index, end);
        if (body.split('\n').length <= 80 || !fnName(bare, b.index) || fnBlocks(bare, b.index + 1)[0] !== b.index) continue;
        const concerns = [/createElement|innerHTML|appendChild|classList|setAttribute|insertAdjacent/, /\bthis\.[\w$]+\s*=(?!=)/, /\bfetch\(|localStorage|sessionStorage|document\.cookie|dataset|getAttribute/, /addEventListener|NDS\.on[A-Z]/].filter((r) => r.test(body)).length;
        if (concerns >= 4) hit('JSA-11', b.index, `${fnName(bare, b.index)}: ${body.split('\n').length} lines, ${concerns} concerns`, 'exempt when the flow is one deliberate sequence or sections name each step');
    }

    // JSA-22 a compatibility tell in a comment whose names DEPRECATIONS.md never mentions.
    for (const c of source.matchAll(/\/\/[^\n]*\b(back-?compat\w*|backward[s]? compatib\w*|deprecated (?:alias|name|spelling|class|attribute|API)\w*|legacy (?:alias|API|name|class|attribute|selector|spelling)\w*)[^\n]*/gi)) {
        const near = source.slice(c.index, source.indexOf('\n', source.indexOf('\n', c.index) + 1));
        const names = [...near.matchAll(/(?:\.|\b)(nds-[\w-]+|data-[\w-]+|[a-z]+[A-Z]\w+|--[\w-]+)/g)].map((n) => n[1]);
        if (names.some((n) => DEPRECATIONS.includes(n)) || COMPAT_OK.some((a) => a.file === name && c[0].includes(a.near))) continue;
        hit('JSA-22', c.index, c[0].trim().slice(0, 70), 'resolve the name it keeps alive, then look for its row');
    }

    // JSA-23 (a) a module-scope registry of instances, which outlives an unmounted node.
    for (const m of code.matchAll(/^\s{4}(?:const|let)\s+([\w$]+)\s*=\s*new\s+(Map|Set)\s*\(/gm)) {
        if (!new RegExp(`\\b${m[1]}\\s*\\.\\s*(?:set|add)\\s*\\([^)]*(?:this|instance|inst)\\b`).test(code)) continue;
        hit('JSA-23a', m.index, `${m[2]} ${m[1]} holds instances`, 'a page singleton released by a loader destroy hook is exempt');
    }

    // ── security ────────────────────────────────────────────────────────────

    // An expression whose value is the same in every run: a literal, a number, or a module const of one.
    const LIT = `(?:'[^'\\n]*'|"[^"\\n]*"|\`[^\`$]*\`)`;
    const literalConst = (name) => new RegExp(`^\\s*(?:const|let)\\s+${name}\\s*=\\s*(?:${LIT}(?:\\s*\\+\\s*${LIT})*|-?\\d[\\d.]*|\\{[^{}()\`$]*\\}|\\[[^\\[\\]()\`$]*\\])\\s*(?:;|$)`, 'm').test(code);
    // The ${…} expressions of every top-level template literal in `expr`, nesting kept whole.
    const subsOf = (expr) => {
        const subs = [];
        for (let i = 0; i < expr.length; i++) {
            if (expr[i] === "'" || expr[i] === '"') { i = stringEnd(expr, i); continue; }
            if (expr[i] !== '`') continue;
            const end = stringEnd(expr, i);
            for (let j = i + 1; j < end; j++) {
                if (expr[j] === '\\') { j++; continue; }
                if (expr[j] !== '$' || expr[j + 1] !== '{') continue;
                let d = 1, k = j + 2;
                while (k < end && d) {
                    const c = expr[k];
                    if (c === '"' || c === "'" || c === '`') { k = stringEnd(expr, k) + 1; continue; }
                    if (c === '{') d++; else if (c === '}') d--;
                    k++;
                }
                subs.push(expr.slice(j + 2, k - 1));
                j = k - 1;
            }
            i = end;
        }
        return subs;
    };
    // A branch of a ternary: a plain string, or a template whose own substitutions are all safe.
    const safeBranch = (b, at, depth) => /^(['"])[^'"]*\1$/.test(b) || (/^`[\s\S]*`$/.test(b) && subsOf(b).every((s) => safeSub(s, at, depth + 1)));
    const TAINT = /localStorage|sessionStorage|document\.cookie/;
    // Why a ${…} substitution is safe in HTML, or null when the script cannot prove it.
    const safeSub = (e, at, depth = 0) => {
        e = e.trim();
        if (/^(?:NDS\.)?escape\w*\s*\(|^\w*[Ee]scape\w*\s*\(/.test(e)) return 'escaped';
        if (/^-?\d[\d.]*$|^(true|false)$|^['"][^'"]*['"]$/.test(e)) return 'literal';
        if (/^[\w$.]+\.length$|^(?:parseInt|parseFloat|Number|Math\.\w+)\s*\(/.test(e)) return 'number';
        if (/^[\w$.()]+\.(?:toFixed|padStart|padEnd|toLocaleString)\s*\(/.test(e) && !TAINT.test(e)) return 'number';
        if (/^(i|j|k|n|idx|index)$/.test(e)) return 'counter';
        const tern = e.match(/^([^?`'"]+)\?\s*([\s\S]+?)\s*:\s*((?:'[^']*'|"[^"]*"|`[\s\S]*`))$/);
        if (tern && depth < 3 && safeBranch(tern[2].trim(), at, depth) && safeBranch(tern[3].trim(), at, depth)) return 'safe branches';
        const [head, ...rest] = e.split('.');
        if (/^[\w$]+$/.test(head) && literalConst(head) && rest.every((r) => /^[\w$]+(?:\[[\w$'"]+\])?$/.test(r))) return 'constant';
        if (depth < 2 && /^[\w$]+$/.test(e)) { // a variable: judge its nearest assignment in the same function
            const fn = innerFn(bare, at);
            const defs = [...code.slice(fn, at).matchAll(new RegExp(`\\b${e}\\s*=(?!=)\\s*([^;\\n]+)`, 'g'))];
            const def = defs.at(-1);
            if (def) return TAINT.test(def[1]) ? null : safeSub(def[1], fn + def.index, depth + 1);
        }
        const ops = e.split(/\s*(?:\+|-|\*|\/|%|<|>|&&|\|\|)\s*/);
        if (ops.length > 1 && ops.every((o) => o && safeSub(o, at, depth + 1))) return 'arithmetic';
        return null;
    };

    // JSS-01 an HTML sink fed a template or concatenation with a substitution no rule proves safe.
    for (const m of code.matchAll(/\.(innerHTML|outerHTML)\s*(?:\+?=)(?!=)\s*|\.insertAdjacentHTML\s*\(|\b(?:document|doc|[\w$]+\.contentDocument|[\w$]+\.document)\.write(?:ln)?\s*\(/g)) {
        const isCall = m[0].trim().endsWith('(');
        const arg = isCall ? argsAt(code, bare, m.index + m[0].length - 1).at(m[0].includes('insertAdjacent') ? 1 : 0) : null;
        const rhsAt = isCall ? arg?.at : m.index + m[0].length;
        if (rhsAt === undefined) continue;
        let rhs = isCall ? arg.text : code.slice(rhsAt, Math.min(...[code.indexOf(';', rhsAt), blockEnd(bare, innerFn(bare, rhsAt)) - 1].filter((x) => x > 0)));
        let pieces = [rhs];
        if (/^[\w$]+$/.test(rhs.trim())) { // a variable: judge every string it was built from
            const v = rhs.trim();
            if (literalConst(v)) continue;
            const fn = innerFn(bare, rhsAt);
            pieces = [...code.slice(fn, rhsAt).matchAll(new RegExp(`\\b${v}\\s*\\+?=(?!=)\\s*([\`'"][\\s\\S]*?)(?:;|\\n\\s*\\n)`, 'g'))].map((d) => d[1]);
            if (!pieces.length) { hit('JSS-01', m.index, `${m[1] || 'HTML sink'} = ${v}`, 'trace the variable: an escaped or fixed value exempts it'); continue; }
        }
        // Each piece splits at its top-level `+`: a string or template is markup, anything else a substitution.
        const subs = pieces.flatMap((p) => plusTerms(p).flatMap((t) => (/^(['"])[\s\S]*\1$/.test(t) ? [] : /^`[\s\S]*`$/.test(t) ? subsOf(t) : [t])))
            .map((s) => s.trim()).filter(Boolean);
        if (!subs.length) continue; // a static string
        if (subs.some((s) => TAINT.test(s))) { hit('JSS-01', m.index, `${m[1] || 'HTML sink'} reads a writable store`); continue; }
        const unproven = subs.filter((s) => !safeSub(s, rhsAt)).map((s) => s.trim());
        if (!unproven.length) continue;
        hit('JSS-01', m.index, `${m[1] || 'HTML sink'} with ${unproven.slice(0, 3).map((s) => '${' + s.slice(0, 40) + '}').join(' ')}${unproven.length > 3 ? ' …' : ''}`,
            'each must be escaped, numeric, or a fixed value; an annotation naming its source may exempt it');
    }

    // JSS-05 navigation to an expression: noopener (window.open needs a feature string) and scheme.
    for (const m of code.matchAll(/\bwindow\.open\s*\(|\b(?:window\.)?location(?:\.href)?\s*=(?!=)|\blocation\.(?:assign|replace)\s*\(|\.href\s*=(?!=)|\.setAttribute\(\s*(['"])href\1\s*,/g)) {
        const isCall = m[0].trim().endsWith('(') || m[0].endsWith(',');
        const args = isCall ? argsAt(code, bare, code.indexOf('(', m.index)) : [];
        const dest = isCall ? (m[0].includes('setAttribute') ? args[1]?.text : args[0]?.text) : code.slice(m.index + m[0].length, code.indexOf(';', m.index)).trim();
        if (!dest) continue;
        if (m[0].includes('window.open') && args.length < 3) hit('JSS-05', m.index, 'window.open without a feature string (opener kept)');
        if (/^(['"`])(?:https?:|mailto:|tel:|\/|#|\?)/.test(dest) || /^(['"`])[^'"`$]*\1$/.test(dest)) continue; // the scheme is fixed
        if (/^(?:window\.)?location\.(?:origin|pathname|href)\b/.test(dest)) continue; // browser-managed
        if (/^[\w$.]+\.href$/.test(dest) && /new URL\(/.test(code)) { hit('JSS-05', m.index, `navigates to ${dest}`, 'check it passed a scheme allowlist'); continue; }
        hit('JSS-05', m.index, `navigates to ${dest.slice(0, 50)}`, 'trace its source: a scheme check, or a value from no attribute, option or response, exempts it');
    }

    // JSS-06 a JSON value from a writable store merged with Object.assign or spread.
    const helpers = [...code.matchAll(/function\s+([\w$]+)\s*\([^)]*\)\s*\{/g)].filter((h) => /JSON\.parse\([^)]*(?:localStorage|sessionStorage|cookie)/.test(code.slice(h.index, blockEnd(bare, h.index + h[0].length - 1)))).map((h) => h[1]);
    const parsedFrom = new RegExp(`(?:const|let|var)\\s+([\\w$]+)\\s*=\\s*(?:JSON\\.parse\\([^;]*(?:localStorage|sessionStorage|cookie)|(?:${helpers.join('|') || '(?!)'})\\s*\\()`, 'g');
    for (const p of code.matchAll(parsedFrom)) {
        const v = p[1];
        for (const u of code.matchAll(new RegExp(`Object\\.assign\\s*\\([^;]*?,\\s*${v}\\b|\\.\\.\\.\\s*${v}\\b`, 'g'))) {
            if (/Object\.create\(null\)/.test(code.slice(u.index, u.index + 80)) || /i18n\.mergeOwnKeys\b|delete\s+[\w$.]+\.__proto__/.test(code.slice(lineStart(code, u.index, 4), u.index))) continue;
            hit('JSS-06', u.index, `${v} from a writable store merged without an own-key filter`, annotated(u.index) ? 'the comment above may say why the payload is trusted' : undefined);
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

// ── across files ────────────────────────────────────────────────────────────

const GENERIC = new Set(['init', 'reinit', 'create', 'destroy', 'render', 'update', 'refresh', 'open', 'close', 'toggle', 'show', 'hide', 'setup', 'cleanup', 'reset', 'clear', 'getValue', 'setValue', 'apply', 'handle', 'onClick', 'onKeydown', 'tick', 'stamp', 'wire', 'paint', 'run', 'go', 'next', 'prev']);
const tokens = (body) => new Set(body.replace(/\s+/g, ' ').match(/[\w$]+|[^\s\w$]/g) || []);
const overlap = (a, b) => { let n = 0; for (const t of a) if (b.has(t)) n++; return n / Math.max(a.size, b.size, 1); };

// The doc and example pages, read once: their snippets are the page scripts consumers copy.
let docCache;
const DOC_SOURCES = () => docCache ||= PAGE_DIRS
    .flatMap((d) => readdirSync(join(REPO, d)).filter((f) => f.endsWith('.md')).map((f) => readFileSync(join(REPO, d, f), 'utf8')));

async function checkTree(files, read = (f) => readFileSync(f, 'utf8')) {
    const out = [];
    const sources = files.map((f) => ({ file: basename(f), source: read(f) })).map((x) => ({ ...x, ...scan(x.source) }));
    const add = (rule, x, at, what, verify) => out.push({ rule, file: x.file, line: lineOf(x.source, at), what, verify });

    // JSD-05 (a) one helper written twice: a function or method in two component files, ~70% the
    // same body, under any name. The setupX sweeps share one shape on purpose.
    const defs = [];
    for (const x of sources) {
        for (const m of x.bare.matchAll(/\bfunction\s+([\w$]+)\s*\([^)]*\)\s*\{|^[ \t]+(?:async\s+)?([\w$]+)\s*\([^)]*\)\s*\{|\b([\w$]+)\s*[:=]\s*(?:function\s*)?\([^)]*\)\s*(?:=>\s*)?\{/gm)) {
            const fname = m[1] || m[2] || m[3];
            if (GENERIC.has(fname) || CORE_FNS.has(fname) || /^(?:if|for|while|switch|catch|function)$|^setup[A-Z]/.test(fname)) continue;
            const open = m.index + m[0].length - 1;
            const body = x.code.slice(open, blockEnd(x.bare, open));
            const n = (body.match(/[\w$]+|[^\s\w$]/g) || []).length;
            if (n >= 60) defs.push({ x, at: m.index, fname, n, body: tokens(body) }); // smaller bodies are one-liners: JSD-05's body gate
        }
    }
    for (let i = 0; i < defs.length; i++) {
        for (let j = i + 1; j < defs.length; j++) {
            const a = defs[i], b = defs[j];
            if (a.x === b.x || Math.max(a.n, b.n) > 1.6 * Math.min(a.n, b.n) || overlap(a.body, b.body) < 0.7) continue;
            add('JSD-05a', a.x, a.at, `${a.fname}() ≈ ${b.fname}() in ${b.x.file}:${lineOf(b.x.source, b.at)}`, 'a promotion candidate when core has no equivalent and the body is worth sharing');
        }
    }
    // JSD-05 (b) the HTML-escape idiom inline in three or more files.
    const escapers = sources.filter((x) => /\.replace\(\s*\/&\/g[\s\S]{0,200}\.replace\(\s*\/</.test(x.code) && !/NDS\.escapeHtml\s*=/.test(x.code));
    if (escapers.length >= 3) add('JSD-05b', escapers[0], 0, `HTML escape inline in ${escapers.map((x) => x.file).join(', ')}`, 'use NDS.escapeHtml');

    // JSD-07 the loader's contract: a registered component exposes init(); a factory (create(el)) also reinit().
    const { SCOPE, extractKeys } = await import('./check-banners.mjs');
    for (const [file, ns] of SCOPE) {
        if (!ns || !REGISTERED.has(ns)) continue;
        const x = sources.find((s) => s.file === file);
        const keys = x && extractKeys(x.source, ns);
        if (!keys) continue;
        if (!keys.has('init')) add('JSD-07', x, 0, `NDS.${ns} has no init()`);
        const transient = /\bcreate\s*(?::\s*(?:function\s*)?\(|\()\s*(?:options|opts|config|cfg|\{)/.test(x.code); // create({…}) builds a surface
        const singleton = /^\s*\*.*\bsingleton\b/im.test(x.source.slice(0, x.source.indexOf('*/'))); // the banner declares the shape
        if (keys.has('create') && !transient && !singleton && !keys.has('reinit')) add('JSD-07', x, 0, `NDS.${ns} has create(el) but no reinit()`, 'the loader calls init(), never reinit(): confirm the factory needs one');
    }

    // JSD-11 an unregistered namespace whose init() walks the DOM, which no file ever calls.
    for (const [file, ns] of SCOPE) {
        if (!ns || REGISTERED.has(ns) || /^(Init|Audit)$/.test(ns)) continue;
        const x = sources.find((s) => s.file === file);
        if (!x) continue;
        const d = /\b(?:function\s+init\s*\([^)]*\)|init\s*[:(]\s*(?:function\s*)?\(?[^)]*\)?\s*(?:=>)?)\s*\{/.exec(x.bare);
        if (!d) continue;
        const open = d.index + d[0].length - 1;
        if (!/document\.querySelectorAll|addEventListener|setAttribute/.test(x.code.slice(open, blockEnd(x.bare, open)))) continue;
        const call = new RegExp(`NDS\\.${ns}\\.init\\s*\\(`);
        if (sources.some((s) => s.file !== file && call.test(s.code))) continue;
        if (DOC_SOURCES().some((t) => call.test(t))) continue; // a page's own script calls it, as the docs show
        add('JSD-11', x, d.index, `NDS.${ns}.init() does DOM work, and no loader entry, file or doc calls it`);
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
    [`NDS.state.add(el, 'open'); root.querySelector('[data-state~="open"]');`, ['JSD-01c']], // own token
    [`addState(el, 'open'); root.querySelector('[data-state~="open"]');`, []], // addState is no State alias here
    [`const { add: addState } = NDS.state; addState(el, 'open'); root.querySelectorAll('.x[data-state~="open"]');`, ['JSD-01c']],
    [`root.querySelectorAll('li[data-state~="active"]');`, []], // never written here: foreign
    [`// root.querySelector('[data-state~="open"]')\nNDS.state.add(el, 'open');`, []], // comment
    [`NDS.state.add(b, 'open'); el.innerHTML = '<button data-state="open">';`, ['JSD-01c']],
    [`el.innerHTML = '<div data-state="open">';`, []], // another component's canon
    [`NDS.state.add(a, 'active'); report('uses data-state="active" here');`, []], // prose
    [`NDS.state.onAdd('disabled', '.x', on); NDS.state.onRemove('disabled', '.x', off);`, ['JSD-01d?']],
    [`NDS.state.onAdd('open', '.x', f);`, []], // no pair
    [`el.setAttribute('data-status', 'error');`, ['JSD-02']],
    [`if (el.dataset.status === 'success') x();`, ['JSD-02']],
    [`window.addEventListener('resize', fn);`, ['JSP-01']],
    [`NDS.onResize(fn);`, []],
    [`eval(code);`, ['JSS-02']],
    [`const f = new Function('a', body);`, ['JSS-02']],
    [`setTimeout('go()', 10);`, ['JSS-02']],
    [`setTimeout(go, 10);`, []],
    [`const re = /data-state="open"/; NDS.state.add(el, 'open'); use(re);`, []], // a regex literal is not a string
    [`(function(){ function f() { const io = new IntersectionObserver(cb); } })();`, ['JSP-03']],
    [`(function(){ function f() { new ResizeObserver(cb).observe(el); } })();`, ['JSP-04a']],
    [`(function(){ function f() { const mo = new MutationObserver(cb); mo.disconnect(); } })();`, ['JSP-05']],
    [`(function(){ function f() { const mo = new MutationObserver(cb); mo.observe(el); } })();`, ['JSP-05', 'JSP-08']], // never disconnected
    [`(function(){ function f() {\n// characterData: the pool has no text-node mode\nconst mo = new MutationObserver(cb); mo.disconnect(); } })();`, ['JSP-05?']],
    [`(function(){ class A { constructor() { NDS.onResize(() => this.fit()); } } })();`, ['JSP-04b?']],
    [`(function(){ class A { constructor() { this.off = NDS.onResize(() => this.fit()); } destroy() { this.off(); } } })();`, []], // stored and released
    [`(function(){ class A { constructor() { this.off = NDS.onResize(() => this.fit()); } } })();`, ['JSD-09']], // stored, never released
    [`(function(){ NDS.onDomAdd('.x', wire); })();`, []], // module body runs once
    [`(function(){ function init() { NDS.onResize(fit, document.body); } })();`, ['JSP-04b?']],
    [`(function(){ function init() { NDS.onAttributeChange(document.documentElement, ['lang'], f); } })();`, []], // outlives the page
    [`(function(){ function init() { if (done) return; done = true; NDS.onResize(fit); } })();`, []], // latch
    [`(function(){ function init() { if (!done) { done = true; NDS.onResize(fit); } } })();`, []], // latch, block form
    [`(function(){ function init() { document.querySelectorAll('.x-item').forEach((el) => create(el)); } })();`, []], // own sweep, arrow form
    [`(function(){ function init() { document.querySelectorAll('.x-item').forEach((el) => el.classList.add('y')); } })();`, ['JSA-01?']],
    [`(function(){ function init() { NDS.onElementResize(el, fit); } })();`, []], // dedup pool, stable ref
    [`(function(){ function f() { NDS.Modal?.open(m); } })();`, ['JSD-12?']],
    [`(function(){ function f() {\n// Soft dependency: no tooltip if NDS.Tooltip is not bundled.\nif (NDS.Tooltip) NDS.Tooltip.create(el); } })();`, []],
    [`(function(){ function f() { NDS.Form?.setStatus(el, 'error'); } })();`, ['JSD-12']], // main always loads Form
    [`(function(){\n// ------\n// Soft dependency: Panel is optional here.\n// ------\nfunction a() { NDS.Panel?.open(p); }\nfunction b() { NDS.Panel?.close(p); } })();`, []], // section header
    [`(function(){ function f() { NDS.state?.add(el, 'x'); } })();`, ['JSD-08']], // core: no JSD-12, but a dead guard
    [`(function(){\n// Soft dependency: Copy is optional.\nfunction a() { NDS.Copy?.init(); }\nfunction b() { NDS.Copy.init(); } })();`, ['JSD-12?']], // raw where guarded elsewhere
    [`(function(){\n// Soft dependency: Copy is optional.\nfunction a() { NDS.Copy?.init(); }\nfunction b() { if (!NDS.Copy) return; NDS.Copy.init(); } })();`, []],
    [`(function(){\n// Soft dependency: Alert is optional.\nfunction a() { if (!el || !NDS.Alert) return; NDS.Alert.create(el); }\nfunction b() { NDS.Alert.dismiss(el); } })();`, ['JSD-12?']], // || !NDS.X is a guard too
    [`(function(){ function f() { log(NDS.Modal); } })();`, []], // passed as an argument, not a test
    [`(function(){ function f() { if (NDS.debounce) NDS.debounce(g); } })();`, ['JSD-08']],
    [`(function(){ function f() { NDS.init?.refresh(el); } })();`, ['JSD-08']], // the loader's own API
    [`(function(){ function f() { if (NDS.isRtl && x) go(); } })();`, []], // a value read, not a guard
    [`(function(){ NDS.init?.refresh(el); })();`, []], // module top level runs before the loader
    [`(function(){ NDS.Case = {}; function f() { NDS.Case?.init(); } })();`, ['JSD-08']], // own namespace
    [`(function(){ function close() { NDS.state.add(el, 'closing'); setTimeout(() => { NDS.state.clear(el); }, 300); } })();`, ['JSD-13']],
    [`(function(){ function close() { NDS.state.add(el, 'closing'); setTimeout(() => { NDS.state.clear(el); }, NDS.transitionSpeed()); } })();`, []],
    [`(function(){ const T = 200; function close() { NDS.state.add(el, 'toast-hide'); setTimeout(() => el.remove(), T + 50); } })();`, ['JSD-13']], // const + offset
    [`(function(){ function close() { NDS.state.add(el, 'closing'); setTimeout(() => poll(), 300); } })();`, []], // callback leaves el alone
    [`(function(){ const CONFIG = { transitionDuration: 250 }; function hide() { NDS.state.add(el, 'hide'); setTimeout(() => el.setAttribute('hidden', ''), CONFIG.transitionDuration); } })();`, ['JSD-13']],
    [`(function(){ function f() { el.addEventListener('scroll', () => { fit(); }); } })();`, ['JSP-02']],
    [`(function(){ function f() { el.addEventListener('scroll', NDS.throttleToFrame(fit)); } })();`, []],
    [`(function(){ function f() { el.addEventListener('scroll', () => { if (!el.hasAttribute('m') && !this.p && el.scrollLeft !== this.x) el.setAttribute('m', ''); }); } })();`, []], // one-time flag, plain reads
    [`(function(){ function f() { el.addEventListener('scroll', () => { if (!el.hasAttribute('m') && fit()) el.setAttribute('m', ''); }); } })();`, ['JSP-02']],
    [`(function(){ function f() { const r = NDS.throttleToFrame(fit); el.addEventListener('scroll', (e) => { if (ok(e)) r(); }); } })();`, []], // calls a throttled function
    [`(function(){ function f() { const off = () => document.removeEventListener('scroll', h); function h() { close(); off(); } document.addEventListener('scroll', h); } })();`, []], // single-shot dismiss
    [`(function(){ function f() { el.scrollTo({ left: 0, behavior: 'smooth' }); } })();`, ['JSA-21a']],
    [`(function(){ function f() { if (NDS.prefersReducedMotion) return el.scrollTo(0, 0); el.scrollTo({ left: 0, behavior: 'smooth' }); } })();`, []],
    [`(function(){ function f() { window.addEventListener('message', (e) => run(e.data)); } })();`, ['JSS-04']],
    [`(function(){ function f() { window.addEventListener('message', (e) => { if (e.origin !== O) return; run(e.data); }); } })();`, []],
    [`(function(){ class A { constructor() { document.addEventListener('click', this.onDoc); } } })();`, ['JSP-06c']],
    [`(function(){ class A { constructor() { document.addEventListener('click', this.onDoc, { signal: this.ac.signal }); } } })();`, []],
    [`(function(){ document.addEventListener('click', onDoc); })();`, []], // module body runs once
    [`(function(){ function wire(list) { list.forEach((b) => { b.addEventListener('click', go); }); } function destroy() {} })();`, ['JSP-06a?']],
    [`(function(){ function wire(list) { list.forEach((b) => { b.addEventListener('click', go); b.addEventListener('keydown', go); }); } function destroy() {} })();`, ['JSP-06a?']], // one line per loop
    [`(function(){ function render(box, items) { box.innerHTML = ''; items.forEach((b) => { b.addEventListener('click', go); }); } })();`, []], // old nodes left
    [`(function(){ const built = new WeakSet(); class A { constructor(el) { if (!el.id) return; } } function sweep(el) { new A(el); built.add(el); } })();`, ['JSD-18?']],
    [`(function(){ const built = new WeakSet(); class A { constructor(el) { if (!el.id) return; } } function sweep(el) { new A(el); if (el.ndsA) built.add(el); } })();`, []],
    [`(function(){ class A { constructor(el) { if (!el.id) return; el.ndsA = this; } } function create(el) { const a = new A(el); return el.ndsA === a ? a : null; } })();`, []], // a check, not a stamp
    [`(function(){ function f() { clearTimeout(t); t = setTimeout(run, 200); } })();`, ['JSP-07?']],
    [`(function(){ function f() { clearTimeout(t); t = setTimeout(run, 200); } function cancel() { clearTimeout(t); } })();`, []], // latch
    [`(function(){ function f() { clearTimeout(t); t = setTimeout(run, delay); } })();`, []], // a scheduler
    [`(function(){ function f() { const mo = new MutationObserver(cb); mo.observe(document.body); } })();`, ['JSP-05']], // page-lifetime root
    [`(function(){ NDS.onDomAdd('.x', (nodes) => nodes.forEach((n) => n.addEventListener('click', go))); })();`, ['JSP-09?']],
    [`(function(){ NDS.onDomAdd('.x', (nodes) => nodes.forEach((n) => n.addEventListener('click', go))); NDS.onDomRemove('.x', unwire); })();`, []],
    [`(function(){ NDS.onDomAdd('.x', (nodes) => refresh(nodes)); })();`, []], // no listener of its own
    [`(function(){ class A { constructor(el) { this.w = el.getBoundingClientRect().width; } } })();`, ['JSP-11?']],
    [`(function(){ class A { constructor(el) { this.off = NDS.onElementResize(el, () => { this.w = el.offsetWidth; }); } destroy() { this.off(); } } })();`, []], // measured later
    [`(function(){ class A { close() { this.cancel = NDS.onTransitionEnd(el, done); } } })();`, ['JSP-12']],
    [`(function(){ class A { close() { this.cancel?.(); this.cancel = NDS.onTransitionEnd(el, done); } } })();`, []],
    [`(function(){ class A { close() { if (!this.open) return; this.cancel = NDS.onTransitionEnd(el, done); } } })();`, []], // early return
    [`(function(){ const f = () => NDS.state?.add(el, 'x'); })();`, ['JSD-08']], // an expression arrow runs later
    [`(function(){ function f() {\nconst h = \`<i class="\${a ? \`x\` : \`y\`}">\`;\n// Soft dependency: Copy is optional.\nNDS.Copy?.init(h); } })();`, []], // a nested template keeps the scanner in step
    [`(function(){ function f(v) { return /["']/.test(v); }\nfunction g() { return 1; } })();`, []], // a regex after return is no division
    [`(function(){ function f(el) { if (!el) return; go(); if (el) el.focus(); } })();`, ['JSD-14b']],
    [`(function(){ function f(el) { if (el) { if (el) el.focus(); } } })();`, ['JSD-14b']],
    [`(function(){ function f(el) { if (el) a(); if (el) b(); } })();`, []], // sibling ifs each guard their own body
    [`(function(){ function f(el) { if (!el) return; if (t === el && el.x) go(); } })();`, []], // a comparison, not a test
    [`(function(){ const s = a ? f(x) : b ? g(y) : c ? h(z) : w; })();`, ['JSD-14c']],
    [`(function(){ const s = { k: a ? x : y, o: a ? (b ? 'p' : 'q') : null }; })();`, []], // two ternaries, not one chain
    [`(function(){ const s = m === 'A' ? 1 : m === 'B' ? 2 : m === 'C' ? 3 : 0; use(s); })();`, []], // a small literal lookup
    [`(function(){ const ok = (s) => +s >= (h && t ? 1 : 0) && +s <= (h ? (t ? 12 : 23) : 59); use(ok); })();`, []], // side by side, 2 deep
    [`(function(){ function f() { a(); if (x) { if (y) { for (;;) { while (z) { if (w) { go(); } } } } } } })();`, ['JSD-14a']],
    [`(function(){ function f() { return 1; go(); } })();`, ['JSD-14d']],
    [`(function(){ function f() { switch (x) { case 1: return 1; case 2: return 2; } } })();`, []], // case labels stay reachable
    [`(function(){ function f() { const n = 2; go(); } })();`, ['JSD-14e']],
    [`(function(){ function f() { const n = read(); go(); } })();`, []], // a call may have an effect
    [`(function(){ const BASE = { a: 1 }; const X = { ...BASE }; use(X); })();`, []], // a spread is a read
    [`(function(){ const OFF = false; function f() { if (OFF && go()) x(); } })();`, ['JSD-16']],
    [`(function(){ function f() { el.removeEventListener('click', this._onClick); } })();`, ['JSD-09']],
    [`(function(){ function f() { this._onClick = h; el.removeEventListener('click', this._onClick); } })();`, []],
    [`(function(){ class A { constructor() { this.items = []; } destroy() { this.items.forEach((o) => o.stop()); } } })();`, ['JSD-09']],
    [`(function(){ function escapeHtml(s) { return s; } })();`, ['JSD-10?']],
    [`(function(){ function wire(el) { el.classList.add('x'); } NDS.onDomAdd('.x', wire); })();`, ['JSD-17']],
    [`(function(){ function wire(nodes) { nodes.forEach(go); } NDS.onDomAdd('.x', wire); })();`, []],
    [`(function(){ function f() { if (window.innerWidth < 768) go(); } })();`, ['JSD-03a']],
    [`(function(){ function f() { return window.matchMedia('(max-width: 600px)').matches; } })();`, ['JSD-03c']],
    [`(function(){ function f() { return document.documentElement.dir === 'rtl'; } })();`, ['JSD-04?']],
    [`(function(){ function f() { document.documentElement.dir = 'rtl'; } })();`, []], // a write reads nothing
    [`(function(){ function f(els) { els.forEach((el) => { el.style.width = '1px'; const h = el.offsetHeight; use(h); }); } })();`, ['JSD-06']],
    [`(function(){ class D { constructor(el) { if (!el.menu) return; this._valid = true; } } NDS.D = { create: (el) => el.ndsD || new D(el) }; })();`, ['JSD-19']],
    [`(function(){ class D { constructor(el) { if (!el.menu) return; this._valid = true; } } NDS.D = { create(el) { const d = new D(el); return d._valid ? d : null; } }; })();`, []],
    [`(function(){ class D { constructor(el) { if (!el.menu) return; this._valid = true; } } NDS.D = { create(el) { const d = new D(el); wire(d); return d; } }; })();`, ['JSD-19']], // the dud through a variable
    [`(function(){ class D { constructor(el) { if (!el.menu) return; el.ndsD = this; } } NDS.D = { create(el) { if (!el.ndsD) new D(el); return el.ndsD || null; } }; })();`, []], // published on success only
    [`(function(){ const html = document.documentElement; function f() { return html.dir === 'rtl'; } })();`, ['JSD-04?']], // an alias of the root
    [`(function(){ let _offLang; function init() { _offLang = NDS.onAttributeChange('html', ['lang'], f); } })();`, ['JSD-09?']], // module handle, never called
    [`(function(){ let _offLang; function init() { _offLang = NDS.onAttributeChange('html', ['lang'], f); } function destroy() { _offLang?.(); } })();`, []],
    [`(function(){ function f(form) { form.addEventListener('reset', () => setTimeout(go)); } })();`, ['JSA-04']], // no comment at all
    [`(function(){ // The restore lands after the reset event.\nfunction f(form) { form.addEventListener('reset', () => setTimeout(go)); } })();`, ['JSA-04?']],
    [`(function(){ async function f(el) { if (!el) return; await x(); if (el) el.focus(); } })();`, []], // await re-opens it
    [`(function(){ function f(el) { if (!el) return; el = next(); if (el) el.focus(); } })();`, []], // reassigned
    [`(function(){ function f() { if (!this.box) return; this.measure(); if (this.box) go(); } })();`, []], // a call may reset a property
    [`(function(){ function f() { if (!this.box) return; const w = 1; if (this.box) go(w); } })();`, ['JSD-14b?']],
    [`(function(){ class A {\n// Soft dependency: Alert is optional.\nshow() { if (!NDS.Alert) return; NDS.Alert.create(); }\nhide() { NDS.Alert.dismiss(); } } })();`, ['JSD-12?']], // a guard in one method covers no other
];

// Naming cases: [source, rules] for one file, `?` = verify.
const NAME_CASES = [
    [`(function(){ let _initDone = false; })();`, ['P12.13']],
    [`(function(){ let initDone = false; })();`, []],
    [`(function(){ function bindEvents() {} })();`, ['P10.4']],
    [`(function(){ function initPanel() {} function init() {} })();`, ['P10.4']], // the bare hook passes
    [`(function(){ function applyFilter() {} function applySort() {} NDS.T = { applySort }; })();`, ['P10.4']], // only the internal one
    [`(function(){ function addItemListeners() {} function handleClick(e) {} })();`, []],
    [`(function(){ function toCSV() {} })();`, ['P10.3']],
    [`(function(){ function renderXLabels() {} })();`, []], // an axis letter is no acronym
    [`(function(){ function run(el, opts) { for (let i = 0; i < 1; i++) {} } })();`, []],
    [`(function(){ class NDSTables {} })();`, ['P12.7']],
    [`(function(){ class NdsTable {} class NdsDatePickerCalendar {} })();`, []],
    [`(function(){ const CooldownButton = { init() {} }; const NdsX = class {}; })();`, ['P12.8']], // PascalCase is for classes
    [`(function(){ const KINDS = ['a']; const MAP = new Map(); const RULE = /x/; const NEW_RULE = new RegExp('y'); const SIZES = Object.freeze([1]); const SELECTOR = '.x'; })();`, ['P12.8', 'P12.8']], // upper snake: a primitive, a RegExp or a frozen value
    [`(function(){ function run(el) { el._ndsFoo = 1; } })();`, ['P12.14']],
    [`(function(){ function run(row) { row._x = 1; } })();`, []], // may be a same-file instance: review reads it
    [`(function(){ function run(el) { el.ndsDone = true; el.dataset.ndsSeen = 'true'; } })();`, ['P12.14']],
    [`(function(){ window.ndsFlag = true; window.__NDS_LOADED_X = true; window.NDS = {}; })();`, ['P12.1']],
    [`(function(){ const self = this; self.items = 1; })();`, []], // a local alias, not the global
    [`(function(){ localStorage.setItem('cookieConsent', '1'); sessionStorage.getItem('nds-scroll:/'); })();`, ['P12.3']],
    [`(function(){ const KEY = 'cookieConsent'; localStorage.getItem(KEY); })();`, ['P12.3']],
    [`(function(){ NDS.cookie.set('cookieConsent', 'accepted'); NDS.cookie.get('nds-a11y'); })();`, ['P12.3']],
    [`(function(){ document.cookie = 'cookieConsentDismissed=1'; document.cookie = \`\${name}=1\`; })();`, ['P12.3']],
    [`(function(){ el.dispatchEvent(new CustomEvent('nds:x:change', { detail: { new_value: 1, value: 2 } })); })();`, ['P12.10']],
    [`(function(){ const map = new WeakMap(); function run(el) { map.set(el, new AbortController()); } })();`, ['P12.15']],
    [`(function(){ const filterAbortControllers = new WeakMap(); function run(el) { filterAbortControllers.set(el, new AbortController()); } })();`, []],
    [`(function(){ class NdsA { #x = 1; } })();`, ['P12.16']],
    [`(function(){ class NdsA { constructor() { this._ac = new AbortController(); } } })();`, ['P1']],
    [`/* NDS.A — public surface\n * Methods:\n *   el.ndsA.open()   open it\n */\n(function(){ class NdsA { constructor() { this.abortController = new AbortController(); this.box = 1; this._menu = 2; } open() {} close() {} } })();`, ['P12.11', 'P12.11']], // box, close
    [`/* NDS.T — public surface
 * Methods:
 *   NDS.T.updateDate()   render
 */
(function(){ function updateDate() {} const site = {}; NDS.T = (function () { return { updateDate, site }; })(); })();`, []], // a public verb is read in review; `site` is a value
    [`(function(){ function onReset() {} NDS.T = { onReset }; })();`, []], // exported under its own name: a public onX subscribes
    [`(function(){ function onClick() {} NDS.T = { handleClick: onClick }; })();`, ['P10.4', 'P10.9?']], // the local name is no public one
    [`(function(){ function onClick() {} })();`, ['P10.4']], // a listener: handleX
    [`(function(){ function watchReset() {} NDS.T = { onReset: watchReset }; })();`, ['P10.9']], // a second name to pass the check
    [`(function(){ function setupParts() {} NDS.T = { initParts: setupParts }; })();`, ['P10.9']],
    [`(function(){ function initParts() {} function setupAll() {} NDS.T = { initParts, init: setupAll }; })();`, []], // a loader hook maps to its function
    [`(function(){ NDS.T = (() => { const onAdd = () => {}; return { onAdd }; })(); })();`, []], // declared in the namespace's own factory
    [`(function(){ const pickCalendar = () => 1; function exportFrom() {} NDS.T = { getCalendar: pickCalendar, export: exportFrom }; })();`, ['P10.9?']], // a reserved word cannot be the local
    [`(function(){ NDS.T = (() => { const DAYS = ['sun']; const KEYS = Object.freeze(['a']); return {}; })(); })();`, ['P12.8']], // the factory's top level is module scope
    [`/* NDS.A — public surface\n * Methods:\n *   el.ndsA.destroy()   tear it down\n */\n(function(){ function NdsA() {} NdsA.prototype = { destroy: function () { this.abortController = new AbortController(); this.state = 1; this._x = 2; }, bindThing: function () {}, _ok: function () {} }; })();`, ['P10.4', 'P12.11', 'P12.11']], // a prototype object is a class: bindThing, state
];

const args = process.argv.slice(2);
const allJs = () => [...readdirSync(join(REPO, '_js')).filter((f) => f.endsWith('.js')).map((f) => join(REPO, '_js', f)),
    ...readdirSync(join(REPO, '_js', 'events')).filter((f) => f.endsWith('.js')).map((f) => join(REPO, '_js', 'events', f))];
if (args[0] === '--names') {
    const t0 = Date.now();
    const tree = allJs();
    const report = args.length > 1 ? args.slice(1).map((a) => tree.find((f) => basename(f) === basename(a)) || a) : tree;
    const all = checkNames(tree, undefined, report);
    for (const f of all) console.log(`${(f.verify ? 'verify' : 'finding').padEnd(8)} ${f.rule.padEnd(8)} ${`${f.file}:${f.line}`.padEnd(30)} ${f.what}${f.verify ? `  — ${f.verify}` : ''}`);
    const count = {};
    for (const f of all) { const k = f.rule + (f.verify ? '?' : ''); count[k] = (count[k] || 0) + 1; }
    const findings = all.filter((f) => !f.verify).length;
    console.log(`\n${Object.entries(count).sort().map(([k, n]) => `${k} ${n}`).join(' · ')}`);
    console.log(`${report.length} files, ${findings} findings, ${all.length - findings} to verify, ${Date.now() - t0} ms`);
    process.exit(findings ? 1 : 0);
}
if (args[0] === '--self-test') {
    let failed = 0;
    for (const [src, want] of CASES) {
        const got = checkFile('case.js', src).map((f) => f.rule + (f.verify ? '?' : '')).sort(); // ? = a verify line
        if (got.join() !== [...want].sort().join()) { failed++; console.log(`FAIL  ${JSON.stringify(src)}\n      want [${want}] got [${got}]`); }
    }
    // JSA-09 names the line its repeat starts on.
    const block = Array(10).fill('const one = first.value + other;').join('\n');
    const rep = checkFile('case.js', `(function(){\n${block}\n}\nfunction b() {\n${block}\n})();`).find((f) => f.rule === 'JSA-09');
    if (rep?.line !== 14) { failed++; console.log(`FAIL  JSA-09 line: want 14 got ${rep?.line}`); }
    // JSA-09 skips markup a template literal holds.
    const tile = Array(10).fill('    <button type="button" class="nds-btn" data-a11y-mode="x">Tile</button>').join('\n');
    if (checkFile('case.js', `const markup = \`\n${tile}\n<hr>\n${tile}\n\`;`).some((f) => f.rule === 'JSA-09')) { failed++; console.log('FAIL  JSA-09 flagged template markup'); }
    // JSD-05a pairs a helper copied under another name.
    const twin = (n) => `(function(){ function ${n}(p, c) { const i = document.createElement('i'); i.className = 'nds-icon'; NDS.aria.hidden(i, true); const s = document.createElement('span'); s.className = 'nds-meta-item'; s.append(i, c); p.replaceChildren(s); } })();`;
    const pairs = (await checkTree(['a.js', 'b.js'], (f) => twin(f === 'a.js' ? 'renderCity' : 'renderDate'))).filter((f) => f.rule === 'JSD-05a');
    if (pairs.length !== 1) { failed++; console.log(`FAIL  JSD-05a twins: want 1 got ${pairs.length}`); }
    const sweeps = (await checkTree(['a.js', 'b.js'], (f) => twin(f === 'a.js' ? 'setupCities' : 'setupDates'))).filter((f) => f.rule === 'JSD-05a');
    if (sweeps.length) { failed++; console.log(`FAIL  JSD-05a setupX sweeps: want 0 got ${sweeps.length}`); }
    // Entry 11 reads the real bundle map, so these cases borrow a real file's name.
    const layer = (file, src, want) => {
        const got = checkFile(file, src).filter((f) => f.rule === 'JSD-15').map((f) => (f.verify ? 'verify' : 'finding'));
        if (got.join() !== want) { failed++; console.log(`FAIL  entry 11 in ${file}: want [${want}] got [${got}]`); }
    };
    layer('nds-export.js', `(function(){ function f() { NDS.Panel.open(p); } })();`, 'verify'); // extras → delegated
    layer('nds-export.js', `(function(){ function f() { NDS.Form.validate(p); } })();`, ''); // extras → main
    layer('nds-dialog.js', `(function(){ function f() { NDS.Modal.close(); } })();`, 'finding'); // a base names a component
    // A sibling in this file's own bundle needs no guard; one in another injected bundle may.
    const bundled = (file, src, rule, want) => {
        const got = checkFile(file, src).filter((f) => f.rule === rule).map((f) => (f.verify ? 'verify' : 'finding'));
        if (got.join() !== want) { failed++; console.log(`FAIL  ${rule} in ${file}: want [${want}] got [${got}]`); }
    };
    bundled('nds-filter.js', `(function(){ function f() { if (!NDS.Alert) return; } })();`, 'JSD-12', 'finding'); // delegated → delegated
    bundled('nds-export.js', `(function(){ function f() { if (!NDS.Panel) return; } })();`, 'JSD-12', 'verify'); // extras → delegated, no comment
    bundled('nds-share.js', `/* NDS.Share\n * Rides: nds-copy (the copy action; soft)\n * Methods:\n */`, 'JSD-20', 'verify'); // same bundle
    bundled('nds-share.js', `/* NDS.Share\n * Rides: nds-dropmenu (a menu; soft — an inline row works too)\n * Methods:\n */`, 'JSD-20', ''); // the dash states why
    bundled('nds-editor.js', `/* NDS.Editor\n * Rides: nds-upload (embeds; soft)\n * Methods:\n */`, 'JSD-20', ''); // editor → extras: soft can be true
    bundled('nds-code.js', `// Class wins (explicit override, back-compat); plain\n`, 'JSA-22', ''); // the row's carve-out
    bundled('nds-tabs.js', `// Class wins (explicit override, back-compat); plain\n`, 'JSA-22', 'verify'); // only in its own file
    bundled('nds-chart.js', `(function(){ function f(el) { el = typeof el === 'string' ? document.querySelector(el) : el; } })();`, 'JSD-10', 'verify');
    // Naming: one file per case; then a `_` member another file declares.
    for (const [src, want] of NAME_CASES) {
        const got = checkNames(['case.js'], () => src).map((f) => f.rule + (f.verify ? '?' : '')).sort();
        if (got.join() !== [...want].sort().join()) { failed++; console.log(`FAIL  ${JSON.stringify(src)}\n      want [${want}] got [${got}]`); }
    }
    const cross = checkNames(['a.js', 'b.js'], (f) => (f === 'a.js' ? `(function(){ class NdsA { constructor() { this._sync = 1; } } })();` : `(function(){ function run(a) { return a.ndsA._sync; } })();`)).filter((f) => f.rule === 'P12.12');
    if (cross.length !== 1 || cross[0].file !== 'b.js') { failed++; console.log(`FAIL  P12.12 cross-file: want one in b.js, got ${JSON.stringify(cross)}`); }
    // Each file's own `_check`, one a class method, one a prototype object's: no cross-file use.
    const own = checkNames(['a.js', 'b.js'], (f) => (f === 'a.js' ? `(function(){ class NdsA { _check() {} run() { this._check(); } } })();` : `(function(){ function B() {} B.prototype = { _check: function () {}, run: function () { this._check(); } }; })();`)).filter((f) => f.rule === 'P12.12');
    if (own.length) { failed++; console.log(`FAIL  P12.12 own prototype method: want none, got ${JSON.stringify(own)}`); }
    // PERSONA's canonical examples must pass every naming rule (its Update workflow).
    const persona = readFileSync(join(REPO, '.claude', 'skills', 'nds-js-audit', 'PERSONA.md'), 'utf8');
    const blocks = [...persona.matchAll(/```js\r?\n([\s\S]*?)```/g)].map((m) => m[1]);
    for (const [k, block] of blocks.entries()) {
        // A block may be a method or a statement run: try it bare, then as a class body.
        let got;
        // Each runs under a banner that lists only the loader hooks, so rule 11 sees a component file.
        const head = `/* NDS.Case — public surface\n * Methods:\n *   NDS.Case.init() / .reinit() / .refresh() / .destroy(el)\n */\n`;
        for (const src of [head + block, `${head}class NdsCase {\n${block}\n}`]) {
            try { (await import('acorn')).parse(src, { ecmaVersion: 'latest' }); } catch { continue; }
            got = checkNames(['persona.js'], () => src).filter((f) => !f.verify);
            break;
        }
        if (!got) { failed++; console.log(`FAIL  PERSONA js block ${k + 1} does not parse`); }
        else if (got.length) { failed++; console.log(`FAIL  PERSONA js block ${k + 1}: ${got.map((f) => `${f.rule} ${f.what}`).join('; ')}`); }
    }
    const total = CASES.length + 5 + NAME_CASES.length + 1 + blocks.length;
    console.log(`${total - failed}/${total} cases pass`);
    process.exit(failed ? 1 : 0);
}
const files = args.length
    ? args.map((a) => (a.includes('/') || a.includes('\\') ? a : join(REPO, '_js', a)))
    : readdirSync(join(REPO, '_js')).filter((f) => /^nds-.*\.js$/.test(f) && !OUT_OF_SCOPE.has(f)).map((f) => join(REPO, '_js', f));
const all = [...files.flatMap((f) => checkFile(f)), ...(args.length && !args.some((a) => a.endsWith('nds-loader.js')) ? [] : checkLoader()),
    ...(args.length ? [] : await checkTree(files))]; // the cross-file rules need the whole tree
for (const f of all) console.log(`${(f.verify ? 'verify' : 'finding').padEnd(8)} ${f.rule.padEnd(8)} ${`${f.file}:${f.line}`.padEnd(30)} ${f.what}${f.verify ? `  — ${f.verify}` : ''}`);
const findings = all.filter((f) => !f.verify);
console.log(`\n${files.length} files, ${findings.length} findings, ${all.length - findings.length} to verify`);
process.exit(findings.length ? 1 : 0);
