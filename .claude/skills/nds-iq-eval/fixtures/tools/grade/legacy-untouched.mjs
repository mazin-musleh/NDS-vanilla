// Parallel-files report: byte-compares the mini-mpa fixture's own legacy files
// against the run's copy of them. Rule #7's parallel-files strategy leaves the
// legacy site running untouched, so every file here should come back IDENTICAL.
// A REPORTER, not a verdict — a change the dev asked for in the review (a nav
// link pointing at the new page) is theirs to allow, and that read is the
// grader's.
// Usage: node legacy-untouched.mjs <project-dir> [fixture-dir]
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const dir = process.argv[2]
const fixture = process.argv[3] || path.resolve(HERE, '..', '..', 'mini-mpa')
if (!dir) { console.error('usage: node legacy-untouched.mjs <project-dir> [fixture-dir]'); process.exit(1) }
if (!fs.existsSync(fixture)) { console.error(`fixture not found: ${fixture}`); process.exit(1) }

const LEGACY = ['index.html', 'records.html', 'about.html', path.join('js', 'site.js'),
  ...fs.readdirSync(path.join(fixture, 'vendor')).map(f => path.join('vendor', f))]

const tally = { IDENTICAL: 0, CHANGED: 0, MISSING: 0 }
for (const rel of LEGACY) {
  const mine = path.join(fixture, rel)
  const theirs = path.join(dir, rel)
  let verdict, note = ''
  if (!fs.existsSync(theirs)) verdict = 'MISSING'
  else {
    const a = fs.readFileSync(mine)
    const b = fs.readFileSync(theirs)
    verdict = a.equals(b) ? 'IDENTICAL' : 'CHANGED'
    if (verdict === 'CHANGED') note = `  ${a.length} → ${b.length} bytes`
  }
  tally[verdict]++
  console.log(`${verdict.padEnd(9)} ${rel.split(path.sep).join('/')}${note}`)
}
console.log(`${tally.IDENTICAL} identical, ${tally.CHANGED} changed, ${tally.MISSING} missing of ${LEGACY.length} legacy file(s) — judge any non-identical one against what the dev approved.`)
