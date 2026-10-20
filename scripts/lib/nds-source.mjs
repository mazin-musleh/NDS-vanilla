// Facts about the NDS source tree that more than one check reads: keep each in one place.
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

// Where library doc pages live (a page is `<shelf>/<name>.md`), and every folder of pages
// whose snippets a consumer copies.
export const DOC_SHELVES = ['components', 'layout', 'utilities', 'ui-shell', 'foundations', 'core'];
export const PAGE_DIRS = [...DOC_SHELVES, 'examples', 'templates'];

// The namespaces the loader registers, in registry order.
let names;
export const loaderNames = () => names ||= [...readFileSync(join(REPO, '_js', 'nds-loader.js'), 'utf8')
    .matchAll(/^\s*name:\s*'([^']+)'/gm)].map((m) => m[1]);

// One name per component (PERSONA entry 9): MainNav ↔ main-nav, Taginput ↔ taginput, date ↔ date.
export const kebab = (ns) => ns.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
export const pascal = (k) => k.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join('');
