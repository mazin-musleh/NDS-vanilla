// S84 mechanical grade half: member-presence report for a built Records page
// against manage-records.md's toolbar block. A REPORTER, not a verdict —
// named-vs-silent cuts stay the grader's judgment.
// Usage: node s84-members.mjs <file-or-dir>
import fs from 'node:fs'
import path from 'node:path'

const MEMBERS = [
  ['count text', /nds-bar-text|data-paged-target/],
  ['per-page menu', /data-per-page/],
  ['column visibility', /data-columns-target/],
  ['export menu', /data-export/],
  ['search submit btn', /nds-search-btn/],
  ['filter dropmenu', /nds-dropmenu[^"']*nds-filter|nds-filter["'\s]/],
  ['filter-applied chips', /nds-filter-applied/],
]

const target = process.argv[2]
if (!target) { console.error('usage: node s84-members.mjs <file-or-dir>'); process.exit(1) }
let text = ''
const collect = p => {
  const st = fs.statSync(p)
  if (st.isDirectory()) for (const e of fs.readdirSync(p)) collect(path.join(p, e))
  else if (/\.(jsx?|html|cshtml)$/.test(p)) text += fs.readFileSync(p, 'utf8')
}
collect(target)

let present = 0
for (const [name, re] of MEMBERS) {
  const hit = re.test(text)
  if (hit) present++
  console.log(`${hit ? 'PRESENT' : 'ABSENT '} ${name}`)
}
console.log(`${present}/${MEMBERS.length} members present — judge named-vs-silent for the absentees.`)
