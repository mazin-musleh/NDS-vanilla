#!/usr/bin/env node
// Append a single UI icon to _sass/_icons.scss.
//
//   node scripts/add-icon.mjs <name>                     # pull from @hugeicons/core-free-icons
//   node scripts/add-icon.mjs <name> --stdin             # read raw <svg>...</svg> from stdin
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
const classIdx = args.indexOf('--class');
const customClass = classIdx !== -1 ? args[classIdx + 1] : null;

if (!name || !/^[a-z0-9][a-z0-9-]*$/.test(name)) {
  console.error('usage: node scripts/add-icon.mjs <kebab-name> [--stdin] [--class <selector>]');
  process.exit(1);
}
if (customClass && !/^[a-z][a-z0-9-]*$/.test(customClass)) {
  console.error('--class value must be kebab-case (letters/digits/hyphens), without the leading dot');
  process.exit(1);
}
const aliasClass = customClass || `nds-hgi-${name}`;

function kebabToPascalIcon(n) {
  return n.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('') + 'Icon';
}

function attrsToString(attrs) {
  return Object.entries(attrs)
    .filter(([k]) => k !== 'key')
    .map(([k, v]) => `${k.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}='${v}'`)
    .join(' ');
}

function buildSvgFromPathArray(pathArray) {
  const body = pathArray.map(([tag, attrs]) => `<${tag} ${attrsToString(attrs)}/>`).join('');
  return `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>${body}</svg>`;
}

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

let svg;
if (useStdin) {
  svg = (await readStdin()).trim();
  if (!svg.startsWith('<svg')) {
    console.error('stdin did not contain an <svg>...</svg> document');
    process.exit(1);
  }
  // Normalize to match the HGI-npm output shape: clean <svg> root with only
  // xmlns/viewBox/fill, no wrapper <g id='...'>, no id= on paths, compact
  // whitespace, single-quoted attrs so the data URI nests inside url("...").
  svg = svg.replace(/>\s+</g, '><').replace(/\s+/g, ' ').replace(/"/g, "'");
  const viewBox = (svg.match(/viewBox='([^']+)'/) || [, '0 0 24 24'])[1];
  const inner = svg
    .replace(/^<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '')
    .replace(/<g\s+id='[^']*'>/g, '')
    .replace(/<\/g>/g, '')
    .replace(/\s+id='[^']*'/g, '');
  svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='${viewBox}' fill='none'>${inner}</svg>`;
} else {
  const modPath = `@hugeicons/core-free-icons/dist/esm/${kebabToPascalIcon(name)}`;
  let mod;
  try {
    mod = await import(modPath);
  } catch {
    console.error(`missing icon in @hugeicons/core-free-icons: ${name} (${kebabToPascalIcon(name)})`);
    process.exit(1);
  }
  svg = buildSvgFromPathArray(mod.default);
}

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
