// List UI icons that aren't referenced anywhere in the codebase.
// Searches for both `nds-hgi-NAME` (markup) and `--nds-icon-NAME` (token).

import fs from 'node:fs';
import { execSync } from 'node:child_process';

const src = fs.readFileSync('scripts/generate-icons-scss.mjs', 'utf8');
const arrMatch = src.match(/UI_ICONS\s*=\s*\[([\s\S]*?)\];/);
if (!arrMatch) { console.error('cannot locate UI_ICONS'); process.exit(1); }
const uiIcons = [...arrMatch[1].matchAll(/'([a-z0-9-]+)'/g)].map(m => m[1]);

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
  '--exclude=generate-icons-scss.mjs',
  '--exclude=find-unused-icons.mjs',
];

function used(name) {
  for (const pat of [`nds-hgi-${name}`, `--nds-icon-${name}`]) {
    try {
      execSync(`grep -rl ${SEARCH_OPTS.join(' ')} -- '${pat}' .`, { stdio: ['ignore', 'pipe', 'ignore'] });
      return true;
    } catch {}
  }
  return false;
}

const unused = uiIcons.filter(n => !used(n));
console.log(`UI icons total: ${uiIcons.length}`);
console.log(`unused: ${unused.length}`);
if (unused.length) console.log(unused.join('\n'));
