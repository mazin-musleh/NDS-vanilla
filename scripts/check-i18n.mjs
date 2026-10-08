// Component strings: every assets/i18n/<component>/<lang>.json has exactly en.json's keys,
// a component's English seed (`const STR = {…}`) equals its en.json, and no _js/ file still
// carries hardcoded Arabic text or reads NDS.langKey — that text belongs in the JSON.
// No build, no browser. Usage: node scripts/check-i18n.mjs
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { runInNewContext } from 'node:vm';

const ROOT = join(import.meta.dirname, '..');
const I18N = join(ROOT, 'assets', 'i18n');
const JS = join(ROOT, '_js');
const fails = [];
const read = (p) => readFileSync(p, 'utf-8');
// A plural is an object of Intl.PluralRules categories; any other object is component data.
const PLURAL = new Set(['zero', 'one', 'two', 'few', 'many', 'other']);
const kind = (v) => (Array.isArray(v) ? 'array'
    : v && typeof v === 'object' ? (Object.keys(v).every(k => PLURAL.has(k)) ? 'plural' : 'object')
    : typeof v);

// 1. Locale files mirror en.json.
const tables = {};
for (const c of readdirSync(I18N, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name)) {
    const enPath = join(I18N, c, 'en.json');
    if (!existsSync(enPath)) { fails.push(`${c}: no en.json`); continue; }
    const en = tables[c] = JSON.parse(read(enPath));
    for (const [k, v] of Object.entries(en)) {
        if (kind(v) === 'plural' && typeof v.other !== 'string') fails.push(`${c}/en.json ${k}: plural without "other"`);
    }
    for (const f of readdirSync(join(I18N, c)).filter(f => f.endsWith('.json') && f !== 'en.json')) {
        const loc = JSON.parse(read(join(I18N, c, f)));
        for (const k of Object.keys(en)) {
            if (!(k in loc)) fails.push(`${c}/${f}: missing ${k}`);
            else if (kind(loc[k]) !== kind(en[k])) fails.push(`${c}/${f} ${k}: ${kind(loc[k])}, en.json has ${kind(en[k])}`);
        }
        for (const k of Object.keys(loc)) if (!(k in en)) fails.push(`${c}/${f}: ${k} is not in en.json`);
    }
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

const ARABIC_LETTER = /[ء-ي]/;   // letters only: Arabic-Indic digit ranges in regexes pass
for (const f of readdirSync(JS).filter(f => f.endsWith('.js') && !f.endsWith('.min.js'))) {
    const src = read(join(JS, f));

    // 2. The English seed matches en.json.
    const name = (src.match(/NDS\.i18n\.load\(\s*'([\w-]+)'/) || [])[1];
    if (name && tables[name] && src.includes('const STR = {')) {
        const seed = runInNewContext('(' + literalAfter(src, 'const STR = {') + ')');
        for (const [k, v] of Object.entries(tables[name])) {
            if (JSON.stringify(seed[k]) !== JSON.stringify(v)) fails.push(`${f}: STR.${k} differs from ${name}/en.json`);
        }
        for (const k of Object.keys(seed)) if (!(k in tables[name])) fails.push(`${f}: STR.${k} is not in ${name}/en.json`);
    }

    // 3. No hardcoded language text left.
    const hits = [];
    src.split('\n').forEach((line, i) => {
        if (/^\s*(\/\/|\/?\*)/.test(line)) return;   // comments may quote Arabic
        if (ARABIC_LETTER.test(line) || (f !== 'nds-core.js' && line.includes('NDS.langKey'))) hits.push(i + 1);
    });
    if (hits.length) fails.push(`${f}: hardcoded language text on ${hits.length} line(s): ${hits.slice(0, 8).join(', ')}${hits.length > 8 ? ', …' : ''}`);
}

if (fails.length) {
    console.log(fails.join('\n'));
    console.log(`\n${fails.length} problem(s).`);
    process.exit(1);
}
console.log(`check-i18n: ${Object.keys(tables).length} components clean.`);
