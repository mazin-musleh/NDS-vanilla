// Legacy-carryover report for a ported page: every Bootstrap / jQuery /
// data-table asset reference and every jQuery-style call found in the target.
// Point it at the NDS output the port produced (the new page and its JS), not
// at the whole project — the legacy files keep their own libraries on purpose.
// A REPORTER, not a verdict — clean is 0 hits, but a hit inside a comment or a
// deliberate side-by-side reference stays the grader's call.
// Usage: node no-legacy-on-nds.mjs <file-or-dir>
import fs from 'node:fs'
import path from 'node:path'

const PATTERNS = [
  ['legacy asset ', /\b(?:bootstrap|jquery|datatables?|datatable-lite)[a-z0-9._-]*\.(?:css|js)\b/i],
  ['legacy import', /(?:import|require)[^\n'"]*['"][^'"\n]*(?:bootstrap|jquery|datatable)[^'"\n]*['"]/i],
  ['jQuery call  ', /\$\(|\bjQuery\s*[.(]/],
]

const target = process.argv[2]
if (!target) { console.error('usage: node no-legacy-on-nds.mjs <file-or-dir>'); process.exit(1) }

const files = []
const collect = p => {
  const st = fs.statSync(p)
  if (st.isDirectory()) { if (!/node_modules/.test(p)) for (const e of fs.readdirSync(p)) collect(path.join(p, e)) }
  else if (/\.(m?[jt]sx?|html|cshtml|razor)$/.test(p)) files.push(p)
}
collect(target)

let hits = 0
const dirty = new Set()
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split('\n')
  const rel = path.relative(target, f) || path.basename(f)
  lines.forEach((line, i) => {
    for (const [kind, re] of PATTERNS) {
      if (!re.test(line)) continue
      hits++
      dirty.add(rel)
      const snippet = line.trim().slice(0, 90)
      console.log(`HIT  ${rel}:${i + 1}  ${kind}  ${snippet}`)
    }
  })
}

if (!hits) console.log(`no legacy asset reference or jQuery call in ${files.length} scanned file(s)`)
console.log(`${hits} hit(s) in ${dirty.size} file(s) of ${files.length} scanned — clean = 0.`)
