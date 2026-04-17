#!/usr/bin/env node
// Append a single UI icon to _sass/_icons.scss.
//
//   node scripts/add-icon.mjs <name> --stdin             # read raw <svg>...</svg> from stdin
//   node scripts/add-icon.mjs <name> --file <path>       # read raw <svg>...</svg> from a file
//   node scripts/add-icon.mjs <name> --class <selector>  # custom alias class (default: nds-hgi-<name>)
//
// The SCSS file is the source of truth — this only appends, never rewrites.

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

let file = fs.readFileSync(OUT, 'utf8');

if (file.includes(`--nds-icon-${name}:`)) {
  console.log(`already present, skipped: ${name}`);
  process.exit(0);
}

// Insert token line before the closing `}` of the :root block.
const rootEnd = file.indexOf('}', file.indexOf(':root {'));
if (rootEnd === -1) {
  console.error('could not locate :root { ... } block in _icons.scss');
  process.exit(1);
}
file = file.slice(0, rootEnd) + tokenLine + '\n' + file.slice(rootEnd);

// HGI aliases land before the "// Mirrored aliases" comment; custom aliases
// (those passing --class) land at the end of the file in the custom section.
const anchor = customClass ? '// Custom (non-HGI) icon aliases' : '// Mirrored aliases';
const anchorIdx = file.indexOf(anchor);
if (anchorIdx !== -1) {
  if (customClass) {
    file = file.replace(/\s*$/, '') + '\n' + aliasLine + '\n';
  } else {
    const lineStart = file.lastIndexOf('\n', anchorIdx) + 1;
    file = file.slice(0, lineStart) + aliasLine + '\n' + file.slice(lineStart);
  }
} else {
  file = file.replace(/\s*$/, '') + '\n' + aliasLine + '\n';
}

fs.writeFileSync(OUT, file);
console.log(`added: ${name}`);
