#!/usr/bin/env node
// Register a single UI icon in _sass/_icons.scss.
//
//   node scripts/add-icon.mjs <name> --stdin             # read raw <svg>...</svg> from stdin
//   node scripts/add-icon.mjs <name> --file <path>       # read raw <svg>...</svg> from a file
//   node scripts/add-icon.mjs <name> --class <selector>  # custom alias class (default: nds-hgi-<name>)
//
// Handles URL-encoding of the SVG for data URIs and inserts the token/alias
// at the alphabetically correct position in its section. The SCSS file is
// hand-editable — this script preserves existing structure.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, '_sass', '_icons.scss');

const args = process.argv.slice(2);
const name = args[0];
const useStdin = args.includes('--stdin');
const fileIdx = args.indexOf('--file');
const filePath = fileIdx !== -1 ? args[fileIdx + 1] : null;
const classIdx = args.indexOf('--class');
const customClass = classIdx !== -1 ? args[classIdx + 1] : null;

if (!name || !/^[a-z0-9][a-z0-9-]*$/.test(name)) {
  console.error('usage: node scripts/add-icon.mjs <kebab-name> (--stdin | --file <path>) [--class <selector>]');
  process.exit(1);
}
if (!useStdin && !filePath) {
  console.error('error: provide the SVG via --stdin or --file <path>');
  process.exit(1);
}
if (customClass && !/^[a-z][a-z0-9-]*$/.test(customClass)) {
  console.error('--class value must be kebab-case (letters/digits/hyphens), without the leading dot');
  process.exit(1);
}
const aliasClass = customClass || `nds-hgi-${name}`;

function urlEncodeSvg(svg) {
  return svg
    .replace(/%/g, '%25')
    .replace(/#/g, '%23')
    .replace(/{/g, '%7B')
    .replace(/}/g, '%7D')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E');
}

function readStdin() {
  return new Promise((resolve, reject) => {
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', chunk => { data += chunk; });
    process.stdin.on('end', () => resolve(data));
    process.stdin.on('error', reject);
  });
}

let svg = useStdin ? (await readStdin()).trim() : fs.readFileSync(filePath, 'utf8').trim();
if (!svg.startsWith('<svg')) {
  console.error('input did not contain an <svg>...</svg> document');
  process.exit(1);
}
// Normalize: strip whitespace, wrapper <g>, ids; compact whitespace;
// single-quoted attrs so the data URI nests inside url("...").
svg = svg.replace(/>\s+</g, '><').replace(/\s+/g, ' ').replace(/"/g, "'");
const viewBox = (svg.match(/viewBox='([^']+)'/) || [, '0 0 24 24'])[1];
const inner = svg
  .replace(/^<svg[^>]*>/, '')
  .replace(/<\/svg>\s*$/, '')
  .replace(/<g\s+id='[^']*'>/g, '')
  .replace(/<\/g>/g, '')
  .replace(/\s+id='[^']*'/g, '');
svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='${viewBox}' fill='none'>${inner}</svg>`;

const uri = `data:image/svg+xml;utf8,${urlEncodeSvg(svg)}`;
const tokenLine = `  --nds-icon-${name}: url("${uri}");`;
const aliasLine = `.${aliasClass} { --nds-icon: var(--nds-icon-${name}); }`;

const file = fs.readFileSync(OUT, 'utf8');
if (file.includes(`--nds-icon-${name}:`)) {
  console.log(`already present, skipped: ${name}`);
  process.exit(0);
}

const lines = file.split('\n');

// --- Insert token alphabetically inside :root { ... } ---
const tokenRe = /^  --nds-icon-([a-z0-9-]+):/;
const rootIdx = lines.findIndex(l => l.trim() === ':root {');
let rootEnd = rootIdx;
while (rootEnd < lines.length && lines[rootEnd].trim() !== '}') rootEnd++;

let tokenInsertAt = -1;
for (let i = rootIdx + 1; i < rootEnd; i++) {
  const m = lines[i].match(tokenRe);
  if (m && m[1].localeCompare(name) > 0) { tokenInsertAt = i; break; }
}
if (tokenInsertAt === -1) tokenInsertAt = rootEnd;
lines.splice(tokenInsertAt, 0, tokenLine);

// --- Insert alias alphabetically in HGI or custom section ---
// HGI section: contiguous .nds-hgi-* lines before the "// Mirrored aliases" comment.
// Custom section: contiguous .nds-*-* lines after the "// Custom (non-HGI) icon aliases" comment,
//                 before the "// DIRECTION-AWARE" block or EOF.
const mirroredIdx = lines.findIndex(l => l.trim().startsWith('// Mirrored aliases'));
const customHeaderIdx = lines.findIndex(l => l.trim().startsWith('// Custom (non-HGI) icon aliases'));
const arrowFlipIdx = lines.findIndex((l, i) => l.trim().startsWith('// ==') && lines[i + 1]?.includes('DIRECTION-AWARE'));

let sectionStart, sectionEnd, sortKey, lineRe;
if (customClass) {
  sortKey = aliasClass;
  lineRe = /^\.([a-z][a-z0-9-]*)\s*\{\s*--nds-icon:/;
  sectionStart = customHeaderIdx !== -1 ? customHeaderIdx + 1 : lines.length;
  sectionEnd = arrowFlipIdx !== -1 ? arrowFlipIdx : lines.length;
  // Skip consecutive comment lines at the top of the section
  while (sectionStart < sectionEnd && lines[sectionStart].trim().startsWith('//')) sectionStart++;
} else {
  sortKey = name;
  lineRe = /^\.nds-hgi-([a-z0-9-]+)\s*\{\s*--nds-icon:/;
  // HGI section starts at the first .nds-hgi-* line in the file
  sectionStart = lines.findIndex(l => /^\.nds-hgi-/.test(l));
  if (sectionStart === -1) sectionStart = 0;
  sectionEnd = mirroredIdx !== -1 ? mirroredIdx : lines.length;
}

let aliasInsertAt = -1;
for (let i = sectionStart; i < sectionEnd; i++) {
  const m = lines[i].match(lineRe);
  if (m && m[1].localeCompare(sortKey) > 0) { aliasInsertAt = i; break; }
}
if (aliasInsertAt === -1) {
  // No later alias found; insert after the last matching line in this section
  for (let i = sectionEnd - 1; i >= sectionStart; i--) {
    if (lineRe.test(lines[i])) { aliasInsertAt = i + 1; break; }
  }
  if (aliasInsertAt === -1) aliasInsertAt = sectionEnd;
}
lines.splice(aliasInsertAt, 0, aliasLine);

fs.writeFileSync(OUT, lines.join('\n'));
console.log(`added: ${name}`);
