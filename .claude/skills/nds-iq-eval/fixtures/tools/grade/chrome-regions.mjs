// Chrome-region presence report for a built page or a framework shell's source.
// Markers are the real class names the docs site's own shell renders. A
// REPORTER, not a verdict — a region left out on purpose (the dev scoped it
// away, the shell splits across files not in the target) stays the grader's
// call.
// Usage: node chrome-regions.mjs <file-or-dir>
import fs from 'node:fs'
import path from 'node:path'

const REGIONS = [
  ['topbar', /nds-topbar/],
  ['main navigation', /nds-main-nav|ndsMainNav/],
  ['footer', /nds-footer/],
  ['accessibility panel', /nds-accessibility/],
  ['cookie popup', /nds-cookie/],
  ['DGA digital stamp', /nds-digitalStamp/],
]

const target = process.argv[2]
if (!target) { console.error('usage: node chrome-regions.mjs <file-or-dir>'); process.exit(1) }
let text = ''
const collect = p => {
  const st = fs.statSync(p)
  if (st.isDirectory()) { if (!/node_modules|vendor/.test(p)) for (const e of fs.readdirSync(p)) collect(path.join(p, e)) }
  else if (/\.(m?jsx?|html|cshtml|razor)$/.test(p)) text += fs.readFileSync(p, 'utf8')
}
collect(target)

let present = 0
for (const [name, re] of REGIONS) {
  const hit = re.test(text)
  if (hit) present++
  console.log(`${hit ? 'PRESENT' : 'ABSENT '} ${name}`)
}
console.log(`${present}/${REGIONS.length} chrome regions present — judge scoped-out vs missed for the absentees.`)
