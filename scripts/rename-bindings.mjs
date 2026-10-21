#!/usr/bin/env node
// Renames bindings (variables, functions, classes, parameters) and every reference to them, by
// the AST: never a property of the same name (`obj._x`, `{ _x: 1 }`), never a string. A shorthand
// `{ _x }` becomes `{ _x: x }`, so an object key keeps its name. Comments follow the rename when the
// file has no property of the old name. Plans/js-naming-rules.md step 3; PERSONA entry 12 rule 13.
//
//   node scripts/rename-bindings.mjs --underscore [file …]   every `_x` binding → `x`
//   node scripts/rename-bindings.mjs --map <map.json>          { "nds-x.js": { "old": "new" } }
//   add --apply to write; without it, a dry run prints the plan
// Default files: every _js/*.js and _js/events/*.js. A rename whose new name the file already uses
// (any binding or reference), or that is a reserved word, is skipped and reported. Each written
// file is parsed again; one that fails is not written.
// ponytail: one name space per file, not per scope: a new name anywhere in the file blocks the
// rename, so some free renames are skipped; real scope analysis is the upgrade if that bites.

import { parse } from 'acorn';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { basename, join } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const RESERVED = new Set(`break case catch class const continue debugger default delete do else enum export extends false
finally for function if import in instanceof new null return super switch this throw true try typeof var void while with
yield let static implements interface package private protected public await arguments eval undefined NaN Infinity`.split(/\s+/));

const args = process.argv.slice(2);
const apply = args.includes('--apply');
const mapAt = args.indexOf('--map');
const map = mapAt >= 0 ? JSON.parse(readFileSync(args[mapAt + 1], 'utf8')) : null;
const underscore = args.includes('--underscore');
if (!map && !underscore) { console.error('usage: --underscore | --map <map.json>, then --apply to write'); process.exit(2); }
const named = args.filter((a, i) => !a.startsWith('--') && i !== mapAt + 1);
const tree = [...readdirSync(join(ROOT, '_js')).filter((f) => f.endsWith('.js')).map((f) => join(ROOT, '_js', f)),
    ...readdirSync(join(ROOT, '_js', 'events')).filter((f) => f.endsWith('.js')).map((f) => join(ROOT, '_js', 'events', f))];
const files = named.length ? named.map((a) => tree.find((f) => basename(f) === basename(a)) || a) : tree;

// Every identifier in a binding or reference position, with the shorthand properties that hold one.
function scan(source) {
    const comments = [];
    const ast = parse(source, { ecmaVersion: 'latest', locations: true, onComment: comments });
    const refs = []; // Identifier nodes
    const bindings = new Set();
    const props = new Set(); // names used as a property
    const shorthand = new Map(); // value start → the Property
    const bind = (p) => {
        if (!p) return;
        if (p.type === 'Identifier') bindings.add(p.name);
        else if (p.type === 'ObjectPattern') p.properties.forEach((q) => bind(q.type === 'RestElement' ? q.argument : q.value));
        else if (p.type === 'ArrayPattern') p.elements.forEach(bind);
        else if (p.type === 'AssignmentPattern') bind(p.left);
        else if (p.type === 'RestElement') bind(p.argument);
    };
    (function walk(node, parent, key) {
        if (!node || typeof node.type !== 'string') return;
        if (node.type === 'Identifier') {
            const isProp = (parent?.type === 'MemberExpression' && key === 'property' && !parent.computed) ||
                (/^(Property|PropertyDefinition|MethodDefinition)$/.test(parent?.type) && key === 'key' && !parent.computed) ||
                /^(LabeledStatement|BreakStatement|ContinueStatement)$/.test(parent?.type);
            if (isProp) { props.add(node.name); return; }
            refs.push(node);
            return;
        }
        if (node.type === 'VariableDeclarator') bind(node.id);
        if (/Function/.test(node.type)) { if (node.id) bindings.add(node.id.name); node.params.forEach(bind); }
        if (/^Class/.test(node.type) && node.id) bindings.add(node.id.name);
        if (node.type === 'CatchClause') bind(node.param);
        if (node.type === 'Property' && node.shorthand) {
            props.add(node.key.name);
            const v = node.value.type === 'AssignmentPattern' ? node.value.left : node.value;
            shorthand.set(v.start, node);
        }
        for (const k in node) {
            if (k === 'loc') continue;
            const v = node[k];
            if (Array.isArray(v)) v.forEach((c) => walk(c, node, k));
            else if (v && typeof v.type === 'string') walk(v, node, k);
        }
    })(ast, null, null);
    return { refs, bindings, props, shorthand, comments };
}

let changed = 0, skipped = 0, total = 0;
for (const file of files) {
    const name = basename(file);
    const source = readFileSync(file, 'utf8');
    const { refs, bindings, props, shorthand, comments } = scan(source);
    const used = new Set(refs.map((r) => r.name));
    const wanted = map ? Object.entries(map[name] || {}) : [...bindings].filter((n) => /^_[A-Za-z]/.test(n)).map((n) => [n, n.slice(1)]);
    const plan = new Map();
    for (const [from, to] of wanted) {
        if (!bindings.has(from)) { console.log(`skip  ${name}: \`${from}\` is not a binding here`); skipped++; continue; }
        if (RESERVED.has(to) || used.has(to) || [...plan.values()].includes(to)) {
            console.log(`skip  ${name}: \`${from}\` → \`${to}\` ${RESERVED.has(to) ? 'is a reserved word' : 'is already used in the file'}`); skipped++; continue;
        }
        plan.set(from, to);
    }
    if (!plan.size) continue;
    const edits = []; // [start, end, text]
    for (const r of refs) {
        const to = plan.get(r.name);
        if (!to) continue;
        const sh = shorthand.get(r.start);
        edits.push(sh ? [sh.key.start, sh.key.end, `${r.name}: ${to}`] : [r.start, r.end, to]);
    }
    for (const c of comments) {
        for (const [from, to] of plan) {
            if (props.has(from)) continue; // the comment may mean the property
            const re = new RegExp(`(?<![\\w$.])${from.replace(/\$/g, '\\$')}(?![\\w$])`, 'g');
            for (const m of source.slice(c.start, c.end).matchAll(re)) edits.push([c.start + m.index, c.start + m.index + from.length, to]);
        }
    }
    edits.sort((a, b) => b[0] - a[0]);
    let out = source;
    for (const [s, e, t] of edits) out = out.slice(0, s) + t + out.slice(e);
    try { parse(out, { ecmaVersion: 'latest' }); } catch (err) { console.log(`FAIL  ${name}: the result does not parse (${err.message}); not written`); process.exitCode = 1; continue; }
    total += plan.size;
    console.log(`${apply ? 'wrote' : 'plan '} ${name}: ${[...plan].map(([f, t]) => `${f}→${t}`).join(' ')}  (${edits.length} edits)`);
    if (apply) { writeFileSync(file, out); changed++; }
}
console.log(`\n${total} renames${apply ? ` in ${changed} files` : ' planned'}, ${skipped} skipped`);
