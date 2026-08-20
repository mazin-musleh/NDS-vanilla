// NDS-PLAN.md status report: every table row's Page and Status cell, with any
// row sitting at `Built and Verified` flagged — that status is the dev's
// confirmation to give, never the runner's to set (§Plan). A REPORTER, not a
// verdict — a flagged row is legitimate once the dev confirmed it in the run
// transcript, and that read stays the grader's.
// Usage: node plan-status.mjs <project-dir> [pageName]
import fs from 'node:fs'
import path from 'node:path'

const DEV_ONLY = 'Built and Verified'

const dir = process.argv[2]
const filter = process.argv[3]
if (!dir) { console.error('usage: node plan-status.mjs <project-dir> [pageName]'); process.exit(1) }

const plan = path.join(dir, 'NDS-PLAN.md')
if (!fs.existsSync(plan)) { console.log(`ABSENT  NDS-PLAN.md at ${plan}`); process.exit(0) }

// ponytail: splits on every `|`. A cell containing a literal pipe would shift
// the columns; plan tables do not have one.
const rows = []
let statusIdx = -1
for (const line of fs.readFileSync(plan, 'utf8').split('\n')) {
  if (!line.trim().startsWith('|')) { statusIdx = -1; continue }
  const cells = line.split('|').slice(1, -1).map(c => c.trim())
  if (statusIdx === -1) {
    statusIdx = cells.findIndex(c => /^status$/i.test(c))
    continue
  }
  if (/^:?-{2,}/.test(cells[0] || '')) continue
  if (cells.length <= statusIdx) continue
  rows.push([cells[0], cells[statusIdx]])
}

const shown = filter ? rows.filter(r => r[0].toLowerCase().includes(filter.toLowerCase())) : rows
if (!rows.length) console.log('no status table found in NDS-PLAN.md')
else if (!shown.length) console.log(`no row whose Page cell matches "${filter}" (${rows.length} row(s) in the table)`)

let flagged = 0
for (const [page, status] of shown) {
  const self = status === DEV_ONLY
  if (self) flagged++
  const name = page.length > 72 ? page.slice(0, 71) + '…' : page
  console.log(`${self ? 'FLAG   ' : '       '} ${(status || '(empty)').padEnd(21)} ${name}`)
}
console.log(`${shown.length} row(s) reported, ${flagged} at "${DEV_ONLY}" — judge whether the dev confirmed each flagged row.`)
