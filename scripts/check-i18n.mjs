// NDS words: check them, and with --build write the packs NDS ships.
// English is built in: a script's words are its NDS.i18n.getStrings() defaults, a marker's word is its
// markup. Each pack in _i18n/<lang>.json (NDS maintainers edit these) holds every English word and
// no other. A marker names a plain word its markup matches. No _js/ file carries Arabic or reads NDS.langKey.
// --build writes assets/i18n/<lang>.json (minified, banner key "_"), assets/i18n/en.json (the English,
// for a site to translate) and _data/i18n.json, the word list core/i18n.md prints; without it, a
// built file that is out of date fails.
// No browser. Usage: node scripts/check-i18n.mjs [--build]   (js_processor.rb runs --build)
import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { runInNewContext } from 'node:vm';
import { gzipSync } from 'node:zlib';

const ROOT = join(import.meta.dirname, '..');
const SRC = join(ROOT, '_i18n');
const OUT = join(ROOT, 'assets', 'i18n');
const JS = join(ROOT, '_js');
const DATA = join(ROOT, '_data', 'i18n.json');
const BUILD = process.argv.includes('--build');
// ponytail: one pack per language; past this, split the lazy bundles' sections into their own pack.
const PACK_BUDGET_GZ = 12 * 1024;
const fails = [];
const read = (p) => readFileSync(p, 'utf-8');
const jsFiles = readdirSync(JS).filter(f => f.endsWith('.js') && !f.endsWith('.min.js'));
// A plural is an object of Intl.PluralRules categories; any other object is component data.
const PLURAL = new Set(['zero', 'one', 'two', 'few', 'many', 'other']);
const kind = (v) => (Array.isArray(v) ? 'array'
    : v && typeof v === 'object' ? (Object.keys(v).every(k => PLURAL.has(k)) ? 'plural' : 'object')
    : typeof v);

// The object literal starting at the first `{` from index `from`, by brace depth, skipping quoted text.
function literalAt(src, from) {
    const start = src.indexOf('{', from);
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

// 1. English from the scripts: every NDS.i18n.getStrings('section', { … }) default.
const english = {};
for (const f of jsFiles) {
    const src = read(join(JS, f));
    for (const m of src.matchAll(/NDS\.i18n\.getStrings\(\s*'([\w-]+)'\s*,/g)) {
        english[m[1]] = Object.assign(english[m[1]] || {}, runInNewContext('(' + literalAt(src, m.index) + ')'));
    }
}

// 2. Markers in canons, includes, layouts and the markup scripts build. A word a script declares:
// the markup matches it. A word only markers use: the markup is its English, the same everywhere.
const MARK = /\b(data-i18n(?:-(?:aria-label|aria-description|title|alt|placeholder|label))?)="([^"]*)"/g;
const REF = /^([a-z][a-z0-9-]*)\.([A-Za-z0-9_]+)$/;
const ENTITY = { amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", nbsp: ' ' };
const squash = (s) => s.replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (_, e) => ENTITY[e]).replace(/\s+/g, ' ').trim();
const MARKUP_DIRS = ['foundations', 'components', 'ui-shell', 'utilities', 'layout', 'core', 'guides', 'templates', 'examples'];
const markupFiles = [
    ...MARKUP_DIRS.flatMap(d => readdirSync(join(ROOT, d)).filter(f => f.endsWith('.md')).map(f => join(d, f))),
    ...['_includes', '_layouts'].flatMap(d => readdirSync(join(ROOT, d)).filter(f => f.endsWith('.html')).map(f => join(d, f))),
    ...jsFiles.map(f => join('_js', f)),
];
const markerWord = {};   // ref → [word, where]
for (const rel of markupFiles) {
    const src = read(join(ROOT, rel)).replace(/<!--[\s\S]*?-->/g, '');   // a comment is not markup
    // Lookahead for the next tag, so it stays matchable when it follows directly.
    for (const tag of src.matchAll(/<([a-zA-Z][\w-]*)\b([^<>]*)>([^<]*)(?=(<\/?)?)/g)) {
        const [, , attrs, after, next] = tag;
        if (/\sdata-i18n-(?:attr|name|desc)\b|\sdata-i18n-label(?=[\s/>]|$)/.test(attrs)) fails.push(`${rel}: a 1.x marker (data-i18n-attr, -name, -desc, or data-i18n-label with no value): use data-i18n and data-i18n-{attribute}`);
        for (const [, name, ref] of attrs.matchAll(MARK)) {
            if (/[${]/.test(ref)) continue;              // built from a variable in a script
            const m = REF.exec(ref);
            if (!m) { fails.push(`${rel}: ${name}="${ref}" is not section.key`); continue; }
            let word;
            if (name === 'data-i18n') {
                if (next === '<') { fails.push(`${rel}: ${ref} is on an element with child elements; data-i18n holds only the word`); continue; }
                word = squash(after);
            } else {
                const attr = name.slice('data-i18n-'.length);
                const have = new RegExp(`\\s${attr}="([^"]*)"`).exec(attrs);
                if (!have) { fails.push(`${rel}: ${ref} marks ${attr}, which the element does not have`); continue; }
                word = squash(have[1]);
            }
            if (/\$\{/.test(word)) continue;               // a script fills it from a variable
            const declared = english[m[1]]?.[m[2]];
            if (declared !== undefined) {
                if (typeof declared !== 'string' || /\{\w+\}/.test(declared)) fails.push(`${rel}: ${ref} has {vars} or plural forms: write it with set(), not a marker`);
                else if (word !== declared) fails.push(`${rel}: ${ref} reads "${word}", its script has "${declared}"`);
            } else if (!word) {
                fails.push(`${rel}: ${ref} has no English: write the word in the markup`);
            } else if (markerWord[ref] && markerWord[ref][0] !== word) {
                fails.push(`${rel}: ${ref} reads "${word}", ${markerWord[ref][1]} has "${markerWord[ref][0]}"`);
            } else {
                markerWord[ref] ??= [word, rel];
            }
        }
    }
}
for (const [ref, [word]] of Object.entries(markerWord)) {
    const [, section, key] = REF.exec(ref);
    (english[section] ??= {})[key] = word;
}

// 3. Each pack holds every English word, of the same kind, and no other.
function mirror(c, en, loc, where) {
    for (const k of Object.keys(en)) {
        if (!(k in loc)) fails.push(`${where}: ${c}.${k} missing`);
        else if (kind(loc[k]) !== kind(en[k])) fails.push(`${where}: ${c}.${k} is ${kind(loc[k])}, the English is ${kind(en[k])}`);
    }
    for (const k of Object.keys(loc)) if (!(k in en)) fails.push(`${where}: ${c}.${k} has no English (no script or marker uses it)`);
}
const langs = readdirSync(SRC).filter(f => /^[a-z]{2,3}\.json$/.test(f)).map(f => f.slice(0, -5));
const packs = Object.fromEntries(langs.map(l => [l, JSON.parse(read(join(SRC, l + '.json')))]));
for (const [l, pack] of Object.entries(packs)) {
    const where = `_i18n/${l}.json`;
    for (const c of Object.keys(english)) {
        if (!(c in pack)) fails.push(`${where}: no ${c} section`);
        else mirror(c, english[c], pack[c], where);
    }
    for (const c of Object.keys(pack)) if (!(c in english)) fails.push(`${where}: ${c} has no English (no script or marker uses it)`);
}
for (const [c, en] of Object.entries(english)) for (const [k, v] of Object.entries(en)) {
    if (kind(v) === 'plural' && typeof v.other !== 'string') fails.push(`${c}.${k}: plural without "other"`);
}

// 4. No hardcoded language text left in the scripts.
// Arabic the components READ, not write: typed input accepted on every page.
const INPUT_TOKENS = {
    'nds-time-picker.js': ['const MERIDIEM =', 'const isPm =', 'const meridiemKeys =', 'const getMeridiemWords ='],   // "2:30 م" parses on an English page too
    'nds-date-picker.js': ['(هـ|ه|AH)', '(?:to|إلى)'],   // a pasted Hijri date's هـ, a range's إلى
    'nds-typing.js': ['const SLOTS =', 'const SLOT_CHARACTER =', 'format.split('],   // the ح slot and the Arabic letters it takes
    'nds-formatted-input.js': ['var PLATE_LETTERS =', 'var PLATE_ALIASES =', 'var letter = [pair[0] ==='],   // a Saudi plate's letters
};
const ARABIC_LETTER = /[ء-ي]/;   // letters only: Arabic-Indic digit ranges in regexes pass
for (const f of jsFiles) {
    const hits = [];
    read(join(JS, f)).split('\n').forEach((line, i) => {
        if (/^\s*(\/\/|\/?\*)/.test(line)) return;   // comments may quote Arabic
        if ((INPUT_TOKENS[f] || []).some(t => line.includes(t))) return;
        if (ARABIC_LETTER.test(line) || (f !== 'nds-core.js' && line.includes('NDS.langKey'))) hits.push(i + 1);
    });
    if (hits.length) fails.push(`${f}: hardcoded language text on ${hits.length} line(s): ${hits.slice(0, 8).join(', ')}${hits.length > 8 ? ', …' : ''}`);
}

// 5. The built files: the packs NDS ships, and the word list the docs print.
const version = (read(join(ROOT, '_config.yml')).match(/^version:\s*([^\s#]+)/m) || [])[1] || '';
const languageName = (l) => new Intl.DisplayNames('en', { type: 'language' }).of(l);
const outputs = {};
for (const [l, pack] of Object.entries(packs)) {
    const banner = `NDS ${version} · ${languageName(l)} words for NDS components · built from _i18n/${l}.json by `
        + `node scripts/check-i18n.mjs --build · do not edit: an update replaces this file; change words with window.NDS_I18N`;
    outputs[join(OUT, l + '.json')] = JSON.stringify({ _: banner, ...pack });
}
// en.json: never fetched (English is built in). A site translates a copy into window.NDS_I18N_LANGS.
const sorted = Object.fromEntries(Object.entries(english).sort(([a], [b]) => a.localeCompare(b)));
outputs[join(OUT, 'en.json')] = JSON.stringify({ _: `NDS ${version} · every English word of NDS components, by section and key · `
    + `to add a language, copy it into window.NDS_I18N_LANGS.<lang> and translate the words`, ...sorted }, null, 1) + '\n';
const show = (v) => (v === undefined ? '' : typeof v === 'string' ? v
    : Array.isArray(v) ? v.join(' · ') : Object.entries(v).map(([k, w]) => `${k}: ${w}`).join(' · '));
const rows = Object.entries(english).sort(([a], [b]) => a.localeCompare(b)).flatMap(([section, words]) =>
    Object.entries(words).map(([key, en]) => ({ section, key, en: show(en), ...Object.fromEntries(langs.map(l => [l, show(packs[l][section]?.[key])])) })));
outputs[DATA] = JSON.stringify(rows, null, 1) + '\n';

for (const [path, text] of Object.entries(outputs)) {
    const name = path.slice(ROOT.length + 1);
    if (path !== DATA) {
        const gz = gzipSync(Buffer.from(text), { level: 9 }).length;
        if (gz > PACK_BUDGET_GZ) fails.push(`${name}: ${gz} B gzipped, over the ${PACK_BUDGET_GZ} B budget`);
    }
    // autocrlf may check a built file out with CRLF: compare the text, not the line endings.
    const now = existsSync(path) ? read(path).replace(/\r\n/g, '\n') : null;
    if (now === text) continue;
    if (BUILD && !fails.length) writeFileSync(path, text);
    else if (!BUILD) fails.push(`${name} is out of date: run node scripts/check-i18n.mjs --build`);
}

if (fails.length) {
    console.log(fails.join('\n'));
    console.log(`\n${fails.length} problem(s).${BUILD ? ' Nothing built.' : ''}`);
    process.exit(1);
}
const sizes = langs.map(l => `${l}.json ${gzipSync(Buffer.from(outputs[join(OUT, l + '.json')]), { level: 9 }).length} B gz`).join(', ');
console.log(`check-i18n: ${Object.keys(english).length} sections, ${rows.length} words clean; ${sizes}${BUILD ? '; built' : ''}.`);
