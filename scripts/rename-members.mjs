#!/usr/bin/env node
// Renames class members: the method or field key, every `this.x` inside the class (and `self.x` where
// `self = this`), and `this.x` in the class's comments. Nothing outside the class can be told apart
// from another object's member of the same name, so the script REFUSES and prints those sites: every
// other `.x`, `x:` key and 'x' string in the file, and every `.x` in another tracked .js/.mjs/.md/.html.
// Plans/js-naming-rules.md step 3.
//
//   node scripts/rename-members.mjs <map.json> [--apply] [--sites]   (--sites: every refused site, not 8)
//   { "nds-x.js": { "old": "new", "Cls.old": "new", "old2": { "to": "new", "at": [120], "foreign": true } } }
// "Cls.old" picks the class when two in the file declare `old`. `at`: lines in this file whose `.old`
// IS this class's member (an instance read outside the class); they are renamed too. `not`: lines in this
// file whose site was read and is NOT this member (a string key, `NDS.x`); they stay. `foreign: true`:
// the other files' `.old` sites were read and belong to other objects. A `this.old` inside a nested
// `function` (not an arrow) is another `this` and refuses like any outside site. A site marked `*` is
// in a file that names this class's instance (`ndsX`, `NDS.X`): read those first.
// Comments: once no code in the file spells the old name (no binding, key or string of it), every
// comment naming it means the member and takes the new name; a plain word (`active`) never does.
//   --comments: that pass alone, for a map already applied

import { parse } from 'acorn';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { basename, join } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const args = process.argv.slice(2);
const apply = args.includes('--apply');
const allSites = args.includes('--sites');
const commentsOnly = args.includes('--comments');
const mapFile = args.find((a) => !a.startsWith('--'));
if (!mapFile) { console.error('usage: rename-members.mjs <map.json> [--apply]'); process.exit(2); }
const map = JSON.parse(readFileSync(mapFile, 'utf8'));
const tree = [...readdirSync(join(ROOT, '_js')).filter((f) => f.endsWith('.js')).map((f) => join(ROOT, '_js', f)),
    ...readdirSync(join(ROOT, '_js', 'events')).filter((f) => f.endsWith('.js')).map((f) => join(ROOT, '_js', 'events', f))];
// Every other place a member could be read: source, checks, docs. Plans are history; tmp and built output are not source.
const others = execSync('git ls-files "*.js" "*.mjs" "*.md" "*.html"', { cwd: ROOT, encoding: 'utf8' }).split('\n')
    .filter((f) => f && !/\.min\.js$|^plans\/|^tmp\/|^_site\/|^assets\/js\/|^docs-assets\/events\/.*\.js$|^CHANGELOG|\/rigs\//.test(f))
    .map((f) => ({ f, text: readFileSync(join(ROOT, f), 'utf8') }));

const children = (node) => {
    const out = [];
    for (const k in node) {
        if (k === 'loc') continue;
        const v = node[k];
        if (Array.isArray(v)) v.forEach((c) => c && typeof c.type === 'string' && out.push(c));
        else if (v && typeof v.type === 'string') out.push(v);
    }
    return out;
};
const walk = (node, fn, parent = null) => { if (fn(node, parent) !== false) children(node).forEach((c) => walk(c, fn, node)); };
const propName = (m) => (!m.computed && m.property.type === 'Identifier' ? m.property.name : null);

// Inside one class: its declared keys, and every `.x` read as the instance (`this` not rebound, or an alias of it).
function classSites(cls, name) {
    const keys = [], own = [], foreignThis = [];
    for (const m of cls.body.body) if (/^(MethodDefinition|PropertyDefinition)$/.test(m.type) && !m.computed && m.key.name === name) keys.push(m.key);
    (function visit(node, isInstance, aliases) {
        if (node.type === 'FunctionExpression' || node.type === 'FunctionDeclaration') {
            isInstance = false; aliases = new Set();
        }
        if (node.type === 'VariableDeclarator' && node.id.type === 'Identifier' && node.init?.type === 'ThisExpression' && isInstance) aliases.add(node.id.name);
        if (node.type === 'MemberExpression' && propName(node) === name) {
            const o = node.object;
            if (o.type === 'ThisExpression') (isInstance ? own : foreignThis).push(node.property);
            else if (o.type === 'Identifier' && aliases.has(o.name)) own.push(node.property);
        }
        if (node.type === 'ClassDeclaration' || node.type === 'ClassExpression') { if (node !== cls) return; }
        for (const c of children(node)) {
            // A method's own function value keeps `this` = the instance.
            if (node.type === 'MethodDefinition' || (node.type === 'PropertyDefinition' && node.value === c)) {
                if (c.type === 'FunctionExpression') { c.params.forEach((p) => visit(p, true, new Set())); visit(c.body, true, new Set()); continue; }
                visit(c, true, new Set()); continue;
            }
            visit(c, isInstance, aliases);
        }
    })(cls, true, new Set());
    return { keys, own, foreignThis };
}

function renameInComments(source, pairs) {
    const comments = [];
    const ast = parse(source, { ecmaVersion: 'latest', onComment: comments });
    const spelled = new Set();
    walk(ast, (n) => {
        if (n.type === 'Identifier' || n.type === 'PrivateIdentifier') spelled.add(n.name);
        else if (n.type === 'Literal' && typeof n.value === 'string') n.value.split(/[^\w$]+/).forEach((w) => spelled.add(w));
        else if (n.type === 'TemplateElement') n.value.raw.split(/[^\w$]+/).forEach((w) => spelled.add(w));
    });
    const edits = [];
    for (const [from, to] of pairs) {
        if (spelled.has(from) || /^[a-z]+$/.test(from)) continue;
        const re = new RegExp(`(?<![\\w$])${from.replace(/\$/g, '\\$')}(?![\\w$])`, 'g');
        for (const c of comments) for (const m of source.slice(c.start, c.end).matchAll(re)) edits.push([c.start + m.index, c.start + m.index + from.length, to]);
    }
    edits.sort((a, b) => b[0] - a[0]);
    for (const [st, en, t] of edits) source = source.slice(0, st) + t + source.slice(en);
    return { source, count: edits.length };
}

let total = 0, refused = 0, written = 0;
const lineOf = (src, i) => src.slice(0, i).split('\n').length;
for (const [fileName, entries] of Object.entries(map)) {
    const file = tree.find((f) => basename(f) === fileName);
    if (!file) { console.log(`skip  ${fileName}: not in _js/`); refused++; continue; }
    const source = readFileSync(file, 'utf8');
    const pairs = Object.entries(entries).map(([k, v]) => [k.split('.').pop(), typeof v === 'string' ? v : v.to]);
    if (commentsOnly) {
        const { source: out, count } = renameInComments(source, pairs);
        if (count) { console.log(`${apply ? 'wrote' : 'plan '} ${fileName}: ${count} comment mention(s)`); total += count; if (apply) { writeFileSync(file, out); written++; } }
        continue;
    }
    const comments = [];
    const ast = parse(source, { ecmaVersion: 'latest', locations: true, onComment: comments });
    const classes = [];
    walk(ast, (n) => { if (n.type === 'ClassDeclaration' || n.type === 'ClassExpression') classes.push(n); });
    const edits = [];
    const done = [];
    for (const [key, spec] of Object.entries(entries)) {
        const { to, at = [], not = [], foreign = false } = typeof spec === 'string' ? { to: spec } : spec;
        const [clsName, name] = key.includes('.') ? key.split('.') : [null, key];
        const hits = classes.map((c) => ({ c, s: classSites(c, name) })).filter(({ c, s }) => (!clsName || c.id?.name === clsName) && (s.keys.length || s.own.length));
        if (hits.length !== 1) { console.log(`skip  ${fileName}: \`${key}\` is a member of ${hits.length} classes${hits.length ? ': name the class (Cls.' + name + ')' : ''}`); refused++; continue; }
        const { c, s } = hits[0];
        if (classSites(c, to).keys.length || classSites(c, to).own.length) { console.log(`skip  ${fileName}: \`${key}\` → \`${to}\`: the class already has \`${to}\``); refused++; continue; }
        // Outside sites in this file.
        const mine = new Set([...s.keys, ...s.own].map((n) => n.start));
        const outside = [], extra = [];
        walk(ast, (n) => {
            let id = null;
            if (n.type === 'MemberExpression' && propName(n) === name) id = n.property;
            else if (n.type === 'Property' && !n.computed && n.key.type === 'Identifier' && n.key.name === name) id = n.key;
            else if ((n.type === 'MethodDefinition' || n.type === 'PropertyDefinition') && !n.computed && n.key.name === name) id = n.key;
            else if (n.type === 'Literal' && n.value === name) id = n;
            if (!id || mine.has(id.start)) return;
            if (n.type === 'MemberExpression' && at.includes(id.loc.start.line)) extra.push(id);
            else if (!not.includes(id.loc.start.line)) outside.push(id);
        });
        const re = new RegExp(`\\.${name.replace(/\$/g, '\\$')}(?![\\w$])`, 'g');
        // `*`: the other file names this class's instance (`el.ndsX`, `NDS.X`), so its `.old` may be this member.
        const handle = c.id?.name?.replace(/^Nds/, '') || '';
        const reaches = (text) => handle && (text.includes(`nds${handle}`) || text.includes(`NDS.${handle}`));
        const away = foreign ? [] : others.flatMap(({ f, text }) => (f.endsWith(fileName) ? [] : [...text.matchAll(re)].map((m) => `${reaches(text) ? '*' : ' '} ${f}:${lineOf(text, m.index)}`)))
            .sort((a, b) => (a[0] === '*' ? 0 : 1) - (b[0] === '*' ? 0 : 1));
        if (outside.length || away.length) {
            const here = outside.map((n) => `  ${fileName}:${n.loc.start.line}`);
            console.log(`REFUSE ${fileName}: \`${key}\` → \`${to}\`: ${here.length} other site(s) here, ${away.length} in other files`);
            const list = [...here, ...away], shown = allSites ? list.length : 8;
            list.slice(0, shown).forEach((l) => console.log(`       ${l}`));
            if (list.length > shown) console.log(`         … ${list.length - shown} more (--sites prints all)`);
            refused++; continue;
        }
        for (const id of [...s.keys, ...s.own, ...extra]) edits.push([id.start, id.end, to]);
        const cre = new RegExp(`(?<=\\bthis\\.)${name.replace(/\$/g, '\\$')}(?![\\w$])`, 'g');
        for (const cm of comments) if (cm.start >= c.start && cm.end <= c.end)
            for (const m of source.slice(cm.start, cm.end).matchAll(cre)) edits.push([cm.start + m.index, cm.start + m.index + name.length, to]);
        done.push(`${name}→${to}`);
    }
    if (!done.length) continue;
    edits.sort((a, b) => b[0] - a[0]);
    let out = source;
    for (const [st, en, t] of edits) out = out.slice(0, st) + t + out.slice(en);
    out = renameInComments(out, pairs.filter(([from]) => done.some((d) => d.startsWith(`${from}→`)))).source;
    try { parse(out, { ecmaVersion: 'latest' }); } catch (err) { console.log(`FAIL  ${fileName}: the result does not parse (${err.message}); not written`); process.exitCode = 1; continue; }
    total += done.length;
    console.log(`${apply ? 'wrote' : 'plan '} ${fileName}: ${done.join(' ')}  (${edits.length} edits)`);
    if (apply) { writeFileSync(file, out); written++; }
}
console.log(`\n${total} ${commentsOnly ? 'comment mentions' : 'renames'}${apply ? ` in ${written} files` : ' planned'}, ${refused} refused or skipped`);
if (refused) process.exitCode = 1;
