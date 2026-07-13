// List UI icons that nothing in the codebase references.
//
//   node scripts/find-unused-icons.mjs
//
// Registered set: _data/content/icons.yml (kept in sync by add-icon.mjs).
// An icon counts as used when its class (`nds-hgi-NAME` / `nds-icon-NAME`) or its
// token (`--nds-icon-NAME`) appears anywhere outside the files that list every
// icon by definition: the icon sheet, the catalog data, and the catalog page.

import fs from 'node:fs';
import { execSync } from 'node:child_process';

const yml = fs.readFileSync('_data/content/icons.yml', 'utf8');
const classes = [...yml.matchAll(/^\s*-\s*(nds-[a-z0-9-]+)/gm)].map(m => m[1]);
if (!classes.length) { console.error('no icons found in _data/content/icons.yml'); process.exit(1); }

const SEARCH_OPTS = [
  '--include=*.html',
  '--include=*.md',
  '--include=*.liquid',
  '--include=*.yml',
  '--include=*.scss',
  '--include=*.js',
  '--exclude-dir=_site',
  '--exclude-dir=node_modules',
  '--exclude-dir=.git',
  '--exclude=_icons.scss',
  '--exclude=icons.yml',
  '--exclude=icons.md',
];

function used(cls) {
  const name = cls.replace(/^nds-(hgi|icon)-/, '');
  for (const pat of [cls, `--nds-icon-${name}`]) {
    try {
      execSync(`grep -rl ${SEARCH_OPTS.join(' ')} -- '${pat}' .`, { stdio: ['ignore', 'pipe', 'ignore'] });
      return true;
    } catch {}
  }
  return false;
}

const unused = classes.filter(c => !used(c));
console.log(`UI icons registered: ${classes.length}`);
console.log(`unused: ${unused.length}`);
if (unused.length) console.log(unused.join('\n'));
