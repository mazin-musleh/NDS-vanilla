#!/usr/bin/env node
// Renames bindings (variables, functions, classes, parameters) and the references that resolve to
// them, by the AST and its scopes: never a property of the same name (`obj._x`, `{ _x: 1 }`), never a
// string. A shorthand `{ _x }` becomes `{ _x: x }`, so an object key keeps its name. A whole-name rename
// also updates comments, when the file has no property of the old name and the name is no plain word. Plans/js-naming-rules.md step 3.
//
//   node scripts/rename-bindings.mjs --underscore [file …]   every `_x` binding → `x`
//   node scripts/rename-bindings.mjs --map <map.json>          { "nds-x.js": { "old": "new", "c@123": "cell" } }
//   add --apply to write; without it, a dry run prints the plan
// "old" renames every binding of that name in the file; "old@123" only the one declared on line 123
// ("old@123:9" when a line declares two). A rename is skipped and reported when the new name is a
// reserved word or already appears inside the binding's scope (it would capture or shadow a name).
// Default files: every _js/*.js and _js/events/*.js. Each written file is parsed again; one that
// fails is not written.

import { parse } from 'acorn';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { basename, join } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const RESERVED = new Set(`break case catch class const continue debugger default delete do else enum export extends false
finally for function if import in instanceof new null return super switch this throw true try typeof var void while with
yield let static implements interface package private protected public await arguments eval undefined NaN Infinity`.split(/\s+/));

const isFn = (n) => /^(FunctionDeclaration|FunctionExpression|ArrowFunctionExpression)$/.test(n.type);
const patternIds = (p, out = []) => {
    if (!p) return out;
    if (p.type === 'Identifier') out.push(p);
    else if (p.type === 'ObjectPattern') p.properties.forEach((q) => patternIds(q.type === 'RestElement' ? q.argument : q.value, out));
    else if (p.type === 'ArrayPattern') p.elements.forEach((q) => patternIds(q, out));
    else if (p.type === 'AssignmentPattern') patternIds(p.left, out);
    else if (p.type === 'RestElement') patternIds(p.argument, out);
    return out;
};
const children = (node) => {
    const out = [];
    for (const k in node) {
        if (k === 'loc') continue;
        const v = node[k];
        if (Array.isArray(v)) v.forEach((c) => c && typeof c.type === 'string' && out.push([c, k]));
        else if (v && typeof v.type === 'string') out.push([v, k]);
    }
    return out;
};
// An Identifier that names a property or a label, not a binding.
const notBinding = (parent, key) =>
    (parent?.type === 'MemberExpression' && key === 'property' && !parent.computed) ||
    (/^(Property|PropertyDefinition|MethodDefinition)$/.test(parent?.type) && key === 'key' && !parent.computed) ||
    /^(LabeledStatement|BreakStatement|ContinueStatement|MetaProperty)$/.test(parent?.type);

// Scopes, bindings, and every identifier with the binding it resolves to (null = a global).
function analyze(source) {
    const comments = [];
    const ast = parse(source, { ecmaVersion: 'latest', locations: true, onComment: comments });
    const scopeOf = new Map(); // node → scope it opens
    const bindings = [];
    const mk = (node, parent, fn) => { const s = { node, parent, fn: fn || null, decls: new Map() }; if (!fn) s.fn = s; scopeOf.set(node, s); return s; };
    const declare = (scope, id) => {
        if (scope.decls.has(id.name)) return; // a second `var x` is the same binding
        const b = { name: id.name, id, scope, refs: [] };
        scope.decls.set(id.name, b);
        bindings.push(b);
    };
    // Pass 1: open scopes, declare (var and functions hoist).
    (function declareIn(node, scope) {
        let inner = scope;
        if (node.type === 'Program') inner = mk(node, null);
        else if (isFn(node)) {
            if (node.type === 'FunctionDeclaration' && node.id) declare(scope, node.id);
            inner = mk(node, scope);
            if (node.type === 'FunctionExpression' && node.id) declare(inner, node.id);
            node.params.forEach((p) => patternIds(p).forEach((id) => declare(inner, id)));
            if (node.body.type === 'BlockStatement') scopeOf.set(node.body, inner);
        } else if (node.type === 'ClassDeclaration' && node.id) declare(scope, node.id);
        else if (node.type === 'ClassExpression' && node.id) { inner = mk(node, scope, scope.fn); declare(inner, node.id); }
        else if (node.type === 'CatchClause') { inner = mk(node, scope, scope.fn); patternIds(node.param).forEach((id) => declare(inner, id)); }
        else if ((node.type === 'BlockStatement' && !scopeOf.has(node)) || node.type === 'SwitchStatement' || /^For(In|Of)?Statement$/.test(node.type)) inner = mk(node, scope, scope.fn);
        else if (node.type === 'BlockStatement') inner = scopeOf.get(node);
        if (node.type === 'VariableDeclaration')
            node.declarations.forEach((d) => patternIds(d.id).forEach((id) => declare(node.kind === 'var' ? scope.fn : scope, id)));
        for (const [c] of children(node)) {
            if (isFn(node) && (c === node.id)) continue;
            declareIn(c, inner);
        }
    })(ast, null);
    // Pass 2: resolve every identifier in a binding position.
    const idents = []; // { node, binding, shorthand }
    const shorthand = new Map(); // value start → Property
    const props = new Set();
    const lookup = (scope, name) => { for (let s = scope; s; s = s.parent) if (s.decls.has(name)) return s.decls.get(name); return null; };
    (function resolveIn(node, scope, parent, key) {
        if (node.type === 'Identifier') {
            if (notBinding(parent, key)) { props.add(node.name); return; }
            const b = lookup(scope, node.name);
            const rec = { node, binding: b };
            idents.push(rec);
            if (b) b.refs.push(rec);
            return;
        }
        if (node.type === 'Property' && node.shorthand) {
            props.add(node.key.name);
            shorthand.set((node.value.type === 'AssignmentPattern' ? node.value.left : node.value).start, node);
        }
        const inner = scopeOf.get(node) || scope;
        for (const [c, k] of children(node)) {
            // A declaration's own name resolves where it was declared.
            const s = (node.type === 'FunctionDeclaration' || node.type === 'ClassDeclaration') && c === node.id ? scope : inner;
            resolveIn(c, s, node, k);
        }
    })(ast, null, null, null);
    return { bindings, idents, shorthand, props, comments };
}

const args = process.argv.slice(2);
const apply = args.includes('--apply');
const mapAt = args.indexOf('--map');
const map = mapAt >= 0 ? JSON.parse(readFileSync(args[mapAt + 1], 'utf8')) : null;
const underscore = args.includes('--underscore');
if (!map && !underscore) { console.error('usage: --underscore | --map <map.json>, then --apply to write'); process.exit(2); }
const named = args.filter((a, i) => !a.startsWith('--') && i !== mapAt + 1);
const tree = [...readdirSync(join(ROOT, '_js')).filter((f) => f.endsWith('.js')).map((f) => join(ROOT, '_js', f)),
    ...readdirSync(join(ROOT, '_js', 'events')).filter((f) => f.endsWith('.js')).map((f) => join(ROOT, '_js', 'events', f))];
const files = named.length ? named.map((a) => tree.find((f) => basename(f) === basename(a)) || a)
    : map ? tree.filter((f) => map[basename(f)]) : tree;

let changed = 0, skipped = 0, total = 0;
for (const file of files) {
    const name = basename(file);
    const source = readFileSync(file, 'utf8');
    const { bindings, idents, shorthand, props, comments } = analyze(source);
    const wanted = map ? Object.entries(map[name] || {}) : [...new Set(bindings.map((b) => b.name))].filter((n) => /^_[A-Za-z]/.test(n)).map((n) => [n, n.slice(1)]);
    const plan = []; // [binding, to, whole]
    for (const [key, to] of wanted) {
        const [from, at] = key.split('@');
        const [line, col] = (at || '').split(':').map(Number);
        const hits = bindings.filter((b) => b.name === from && (!at || (b.id.loc.start.line === line && (!col || b.id.loc.start.column === col))));
        if (!hits.length) { console.log(`skip  ${name}: \`${key}\` is not a binding here`); skipped++; continue; }
        if (at && hits.length > 1) { console.log(`skip  ${name}: \`${key}\` names ${hits.length} bindings: add :column`); skipped++; continue; }
        for (const b of hits) {
            const { start, end } = b.scope.node;
            const clash = RESERVED.has(to) ? 'is a reserved word' : idents.some((r) => r.node.name === to && r.node.start >= start && r.node.end <= end) ? 'already appears in its scope' : '';
            if (clash) { console.log(`skip  ${name}: \`${from}\` (line ${b.id.loc.start.line}) → \`${to}\` ${clash}`); skipped++; continue; }
            b.refs.forEach((r) => { r.node.name = to; }); // later renames see the new name
            plan.push([b, from, to, !at]);
        }
    }
    if (!plan.length) continue;
    const edits = [];
    for (const [b, from, to] of plan) {
        for (const r of b.refs) {
            const sh = shorthand.get(r.node.start);
            edits.push(sh ? [sh.key.start, sh.key.end, `${from}: ${to}`] : [r.node.start, r.node.end, to]);
        }
    }
    const whole = new Map(plan.filter((p) => p[3]).map(([, from, to]) => [from, to]));
    for (const c of comments) {
        for (const [from, to] of whole) {
            if (props.has(from) || /^[a-z]+$/.test(from)) continue; // the property, or a plain word (`active`)
            const re = new RegExp(`(?<![\\w$.])${from.replace(/\$/g, '\\$')}(?![\\w$])`, 'g');
            for (const m of source.slice(c.start, c.end).matchAll(re)) edits.push([c.start + m.index, c.start + m.index + from.length, to]);
        }
    }
    edits.sort((a, b) => b[0] - a[0]);
    let out = source;
    for (const [s, e, t] of edits) out = out.slice(0, s) + t + out.slice(e);
    try { parse(out, { ecmaVersion: 'latest' }); } catch (err) { console.log(`FAIL  ${name}: the result does not parse (${err.message}); not written`); process.exitCode = 1; continue; }
    total += plan.length;
    console.log(`${apply ? 'wrote' : 'plan '} ${name}: ${plan.map(([b, f, t]) => `${f}${plan.filter((p) => p[1] === f).length > 1 ? `@${b.id.loc.start.line}` : ''}→${t}`).join(' ')}  (${edits.length} edits)`);
    if (apply) { writeFileSync(file, out); changed++; }
}
console.log(`\n${total} renames${apply ? ` in ${changed} files` : ' planned'}, ${skipped} skipped`);
