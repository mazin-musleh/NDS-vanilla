// Filter/Pagination rebuild the URL from pathname+search on every change.
// Dropping location.hash silently wipes a hash-routed app's route (found in a
// 2026-08-18 rig build, which shimmed it project-side). Asserts the three
// writers keep the hash. Run: node scripts/check-url-hash.mjs
import fs from 'node:fs'

const SITES = [
  ['_js/nds-filter.js', /const newUrl = \(params\.toString\(\)[\s\S]{0,200}?\+ window\.location\.hash;/, 'filter updateUrlParams'],
  ['_js/nds-filter.js', /replaceState\(\{\}, '', \(appliedUrl[\s\S]{0,200}?\+ window\.location\.hash\);/, 'filter _rollbackApplied'],
  ['_js/nds-pagination.js', /replaceState\(\{\}, '', \(qs \?[\s\S]{0,160}?\+ window\.location\.hash\);/, 'pagination _writePageParam'],
]

const errs = []
for (const [file, re, name] of SITES) {
  if (!re.test(fs.readFileSync(file, 'utf8'))) errs.push(`${name} (${file}) no longer appends location.hash`)
}

// Any OTHER replaceState that builds from pathname must take the hash too.
for (const file of ['_js/nds-filter.js', '_js/nds-pagination.js', '_js/nds-tables.js']) {
  if (!fs.existsSync(file)) continue
  const src = fs.readFileSync(file, 'utf8')
  for (const m of src.matchAll(/replaceState\([^;]*?window\.location\.pathname[^;]*?;/g)) {
    if (!m[0].includes('location.hash')) {
      const line = src.slice(0, m.index).split('\n').length
      errs.push(`${file}:${line} builds a URL from pathname without location.hash`)
    }
  }
}

if (errs.length) {
  console.error(`check-url-hash: ${errs.length} issue(s)\n` + errs.map(e => `  ${e}`).join('\n'))
  process.exit(1)
}
console.log(`check-url-hash: ${SITES.length} writers keep the hash, no bare pathname rebuilds`)
