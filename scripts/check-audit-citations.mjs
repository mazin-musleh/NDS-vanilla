#!/usr/bin/env node
// Mechanical citation-drift check for the js/css audit skill catalogs.
// Citations are symbol-anchored (EVOLVE.md "Citation convention"): the file path
// must exist, the greppable symbol must still be in it, and a line hint must not
// exceed the file's length. Report-only — healing stays an `evolve` candidate.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const SKILL_DIRS = ['.claude/skills/nds-js-audit', '.claude/skills/nds-css-audit'];

const PATH_RE = /(_js\/[\w.-]+\.js|_sass\/[\w/.-]+\.scss)(?::(\d+))?/g;
const SYM_RE = /^[$A-Za-z_][\w$.-]*(\(\))?$/;
const sources = new Map(); // path -> {text, lines} | null
const problems = [];

function source(p) {
  if (!sources.has(p)) {
    const abs = join(ROOT, p);
    sources.set(p, existsSync(abs)
      ? (t => ({ text: t, lines: t.split('\n').length }))(readFileSync(abs, 'utf8'))
      : null);
  }
  return sources.get(p);
}

// Symbols chained right after a backticked path cite: `x.js` `a()`/`b`, `x.js`'s `Y`
function symbolsAfter(text, from) {
  const syms = [];
  let pos = from;
  for (;;) {
    const tick = text.indexOf('`', pos);
    if (tick < 0 || tick - pos > 4 || !/^('s)?[\s(/]*$/.test(text.slice(pos, tick))) break;
    const end = text.indexOf('`', tick + 1);
    if (end < 0) break;
    const tok = text.slice(tick + 1, end);
    if (!SYM_RE.test(tok)) break;
    syms.push(tok.replace(/\(\)$/, ''));
    pos = end + 1;
  }
  return syms;
}

let cites = 0, symChecks = 0, lineChecks = 0;
for (const dir of SKILL_DIRS) {
  for (const name of readdirSync(join(ROOT, dir)).filter(f => f.endsWith('.md'))) {
    const doc = `${dir}/${name}`;
    const text = readFileSync(join(ROOT, doc), 'utf8');
    for (const m of text.matchAll(PATH_RE)) {
      const [, p, lineHint] = m;
      if (/(^|[-_/])(foo|bar|baz|x|name)\.(js|scss)$/.test(p)) continue; // placeholder examples, not citations
      if (text.slice(m.index + m[0].length, m.index + m[0].length + 40).includes('cite-ok')) continue; // marked intentional
      cites++;
      const at = `${doc} @ offset ${m.index}`;
      const src = source(p);
      if (!src) { problems.push(`DEAD PATH   ${p}  (${at})`); continue; }
      const tail = text.slice(m.index + m[0].length, m.index + m[0].length + 40);
      const hint = lineHint || (tail.match(/^[^`\n]{0,20}~L(\d+)/) || [])[1];
      if (hint) { lineChecks++; if (+hint > src.lines) problems.push(`STALE LINE  ${p}:${hint} (file has ${src.lines} lines)  (${at})`); }
      if (text[m.index - 1] === '`' && text[m.index + m[0].length] === '`') {
        for (const sym of symbolsAfter(text, m.index + m[0].length + 1)) {
          symChecks++;
          const last = sym.split('.').pop(); // NDS.foo may be defined as `foo:` in the file
          if (!src.text.includes(sym) && !src.text.includes(last)) problems.push(`DEAD SYMBOL ${p} \`${sym}\`  (${at})`);
        }
      }
    }
  }
}

if (problems.length) {
  console.error(`Citation drift — ${problems.length} problem(s):\n` + problems.map(p => '  ' + p).join('\n'));
  console.error('\nHeal via the audit skill\'s evolve flow (symbol is the anchor; line numbers are hints).');
  process.exit(1);
}
console.log(`OK — ${cites} path citations, ${symChecks} symbol anchors, ${lineChecks} line hints verified.`);
