// R4 verification-evidence report: what the runner actually saved under
// `tmp/nds-verify/` (nds-verify.mjs output), or a hand-rolled `verify/`.
// Screenshot widths are read from each PNG's own IHDR header (no deps, no
// image library); reference shots and composed sheets don't count as page
// shots. The audit check is a text scan of the saved logs.
// A REPORTER, not a verdict — an absent item may mean "never run" or "run and
// not saved", and that cut stays the grader's.
// Note: widths are raw pixels. A capture at deviceScaleFactor 2 doubles them,
// so a 390-wide mobile shot lands at 780 — read the per-file widths below the
// PRESENT/ABSENT lines before calling a mobile shot missing.
// Usage: node verify-artifacts.mjs <project-dir>
import fs from 'node:fs'
import path from 'node:path'

const DESKTOP_MIN = 1100
const MOBILE_MAX = 500
// nds-verify's report.txt ends in a Problems block; a hand run logs the audit call.
const AUDIT = /^Problems:|NDS\.init\.audit/m

const dir = process.argv[2]
if (!dir) { console.error('usage: node verify-artifacts.mjs <project-dir>'); process.exit(1) }
const roots = [path.join(dir, 'tmp', 'nds-verify'), path.join(dir, 'verify')].filter(p => fs.existsSync(p))
if (!roots.length) console.log(`no tmp/nds-verify/ or verify/ folder in ${dir}`)

const files = []
const collect = p => {
  const st = fs.statSync(p)
  if (st.isDirectory()) for (const e of fs.readdirSync(p)) collect(path.join(p, e))
  else files.push(p)
}
roots.forEach(collect)

// PNG: 8-byte signature, then a length+type header, then IHDR's width/height.
const pngSize = buf =>
  buf.length >= 24 && buf.readUInt32BE(0) === 0x89504e47 && buf.toString('latin1', 12, 16) === 'IHDR'
    ? [buf.readUInt32BE(16), buf.readUInt32BE(20)]
    : null

const shots = []
const audits = []
for (const f of files) {
  const rel = path.relative(dir, f)
  const base = path.basename(f)
  if (/\.png$/i.test(f)) {
    const size = pngSize(fs.readFileSync(f))
    const page = !/^(reference|sheet)-/.test(base)
    if (size && page) shots.push([rel, size[0], size[1]])
    console.log(`  png  ${rel}  ${size ? size.join('x') : 'unreadable header — not a PNG'}${page ? '' : '  (not a page shot)'}`)
  } else if (/\.(txt|log|json)$/i.test(f)) {
    const hit = AUDIT.test(fs.readFileSync(f, 'utf8'))
    if (hit) audits.push(rel)
    console.log(`  log  ${rel}  ${hit ? 'audit evidence' : 'no audit evidence'}`)
  } else {
    console.log(`  ---  ${rel}  not graded (neither .png nor .txt/.log/.json)`)
  }
}

const ITEMS = [
  [`desktop page shot (PNG width >= ${DESKTOP_MIN})`, shots.some(s => s[1] >= DESKTOP_MIN)],
  [`mobile page shot (PNG width <= ${MOBILE_MAX})`, shots.some(s => s[1] <= MOBILE_MAX)],
  ['audit evidence (nds-verify report.txt or NDS.init.audit in a log)', audits.length > 0],
]
let present = 0
for (const [name, hit] of ITEMS) {
  if (hit) present++
  console.log(`${hit ? 'PRESENT' : 'ABSENT '} ${name}`)
}
console.log(`${present}/${ITEMS.length} evidence items present (${shots.length} page shot(s), ${files.length} file(s)) — judge not-run vs not-saved for the absentees.`)
