// Component strings: every locale pack (assets/i18n/<lang>.json) and every own file
// (assets/i18n/<component>/<lang>.json) has exactly en's keys, a pack stays under its size
// budget, a component's English seed equals its en section, and no _js/ file still carries
// hardcoded Arabic text or reads NDS.langKey — that text belongs in the JSON.
// No build, no browser. Usage: node scripts/check-i18n.mjs
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { runInNewContext } from 'node:vm';
import { gzipSync } from 'node:zlib';

const ROOT = join(import.meta.dirname, '..');
const I18N = join(ROOT, 'assets', 'i18n');
const JS = join(ROOT, '_js');
// ponytail: one pack per language; past this, split the lazy bundles' sections into their own pack.
const PACK_BUDGET_GZ = 12 * 1024;
const fails = [];
const read = (p) => readFileSync(p, 'utf-8');
// A plural is an object of Intl.PluralRules categories; any other object is component data.
const PLURAL = new Set(['zero', 'one', 'two', 'few', 'many', 'other']);
const kind = (v) => (Array.isArray(v) ? 'array'
    : v && typeof v === 'object' ? (Object.keys(v).every(k => PLURAL.has(k)) ? 'plural' : 'object')
    : typeof v);

// 1. Locales mirror en, per component.
const tables = {};
function mirror(c, en, loc, where) {
    for (const k of Object.keys(en)) {
        if (!(k in loc)) fails.push(`${where}: ${c}.${k} missing`);
        else if (kind(loc[k]) !== kind(en[k])) fails.push(`${where}: ${c}.${k} is ${kind(loc[k])}, en has ${kind(en[k])}`);
    }
    for (const k of Object.keys(loc)) if (!(k in en)) fails.push(`${where}: ${c}.${k} is not in en`);
}
const langs = readdirSync(I18N).filter(f => /^[a-z]{2,3}\.json$/.test(f));
const packs = Object.fromEntries(langs.map(f => [f, JSON.parse(read(join(I18N, f)))]));
if (!packs['en.json']) fails.push('assets/i18n/en.json missing');
else Object.assign(tables, packs['en.json']);
for (const [f, pack] of Object.entries(packs)) {
    const gz = gzipSync(readFileSync(join(I18N, f)), { level: 9 }).length;
    if (gz > PACK_BUDGET_GZ) fails.push(`${f}: ${gz} B gzipped, over the ${PACK_BUDGET_GZ} B budget`);
    if (f === 'en.json') continue;
    for (const c of Object.keys(tables)) {
        if (!(c in pack)) fails.push(`${f}: no ${c} section`);
        else mirror(c, tables[c], pack[c], f);
    }
    for (const c of Object.keys(pack)) if (!(c in tables)) fails.push(`${f}: ${c} is not in en.json`);
}
for (const c of readdirSync(I18N, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name)) {
    const enPath = join(I18N, c, 'en.json');
    if (!existsSync(enPath)) { fails.push(`${c}: no en.json`); continue; }
    if (c in tables) fails.push(`${c}: in the pack and in its own folder`);
    const en = tables[c] = JSON.parse(read(enPath));
    for (const f of readdirSync(join(I18N, c)).filter(f => f.endsWith('.json') && f !== 'en.json')) {
        mirror(c, en, JSON.parse(read(join(I18N, c, f))), `${c}/${f}`);
    }
}
for (const [c, en] of Object.entries(tables)) for (const [k, v] of Object.entries(en)) {
    if (kind(v) === 'plural' && typeof v.other !== 'string') fails.push(`en: ${c}.${k} plural without "other"`);
}

// The object literal after `marker`, by brace depth, skipping quoted text.
function literalAfter(src, marker) {
    const start = src.indexOf('{', src.indexOf(marker));
    let depth = 0, quote = null;
    for (let i = start; i < src.length; i++) {
        const ch = src[i];
        if (quote) { if (ch === '\\') i++; else if (ch === quote) quote = null; continue; }
        if (ch === '"' || ch === "'" || ch === '`') quote = ch;
        else if (ch === '{') depth++;
        else if (ch === '}' && --depth === 0) return src.slice(start, i + 1);
    }
    return null;
}

// Arabic the components READ, not write: typed input accepted on every page.
const INPUT_TOKENS = {
    'nds-time-picker.js': ['const MERIDIEM =', 'const isPM ='],   // "2:30 م" parses on an English page too
};
const ARABIC_LETTER = /[ء-ي]/;   // letters only: Arabic-Indic digit ranges in regexes pass
for (const f of readdirSync(JS).filter(f => f.endsWith('.js') && !f.endsWith('.min.js'))) {
    const src = read(join(JS, f));

    // 2. The English seed matches en.json.
    const name = (src.match(/NDS\.i18n\.(?:load|strings)\(\s*'([\w-]+)'/) || [])[1];
    const marker = src.includes(`NDS.i18n.strings('${name}'`) ? `NDS.i18n.strings('${name}'` : / STR = \{/.test(src) ? ' STR = {' : null;
    if (name && tables[name] && marker) {
        const seed = runInNewContext('(' + literalAfter(src, marker) + ')');
        for (const [k, v] of Object.entries(tables[name])) {
            if (JSON.stringify(seed[k]) !== JSON.stringify(v)) fails.push(`${f}: default ${k} differs from en ${name}.${k}`);
        }
        for (const k of Object.keys(seed)) if (!(k in tables[name])) fails.push(`${f}: default ${k} is not in en ${name}`);
    }

    // 3. No hardcoded language text left.
    const hits = [];
    src.split('\n').forEach((line, i) => {
        if (/^\s*(\/\/|\/?\*)/.test(line)) return;   // comments may quote Arabic
        if ((INPUT_TOKENS[f] || []).some(t => line.includes(t))) return;
        if (ARABIC_LETTER.test(line) || (f !== 'nds-core.js' && line.includes('NDS.langKey'))) hits.push(i + 1);
    });
    if (hits.length) fails.push(`${f}: hardcoded language text on ${hits.length} line(s): ${hits.slice(0, 8).join(', ')}${hits.length > 8 ? ', …' : ''}`);
}

if (fails.length) {
    console.log(fails.join('\n'));
    console.log(`\n${fails.length} problem(s).`);
    process.exit(1);
}
console.log(`check-i18n: ${Object.keys(tables).length} components clean; ${Object.keys(packs).map(f => f + ' ' + gzipSync(readFileSync(join(I18N, f)), { level: 9 }).length + ' B gz').join(', ')}.`);
