// Icon-token registration report. Collects every nds-hgi-* token used in the
// target's HTML and JS and diffs it against the icon catalog. An unregistered
// token paints nothing — the inline set only carries registered names. A
// REPORTER, not a verdict.
// Usage: node icon-tokens.mjs <file-or-dir> [icons.yml]
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const REPO = path.resolve(HERE, '..', '..', '..', '..', '..', '..')

const target = process.argv[2]
const iconsYml = process.argv[3] || path.join(REPO, '_data', 'content', 'icons.yml')
if (!target) { console.error('usage: node icon-tokens.mjs <file-or-dir> [icons.yml]'); process.exit(1) }
if (!fs.existsSync(iconsYml)) { console.error(`icon catalog not found: ${iconsYml}`); process.exit(1) }

const registered = new Set([...fs.readFileSync(iconsYml, 'utf8').matchAll(/nds-hgi-[a-z0-9-]+/g)].map(m => m[0]))

const used = new Map()
const collect = p => {
  const st = fs.statSync(p)
  if (st.isDirectory()) { if (!/node_modules|vendor/.test(p)) for (const e of fs.readdirSync(p)) collect(path.join(p, e)) }
  else if (/\.(m?[jt]sx?|html|cshtml|razor|md)$/.test(p)) {
    for (const m of fs.readFileSync(p, 'utf8').matchAll(/nds-hgi-[a-z0-9-]+/g)) {
      if (!used.has(m[0])) used.set(m[0], [])
      const where = path.relative(target, p) || path.basename(p)
      if (!used.get(m[0]).includes(where)) used.get(m[0]).push(where)
    }
  }
}
collect(target)

let unregistered = 0
for (const token of [...used.keys()].sort()) {
  const known = registered.has(token)
  if (!known) unregistered++
  console.log(`${known ? 'PRESENT' : 'ABSENT '} ${token}  ${used.get(token).slice(0, 3).join(', ')}`)
}
if (!used.size) console.log('no nds-hgi-* token used in the target')
console.log(`${used.size - unregistered}/${used.size} tokens registered in ${path.basename(iconsYml)} (catalog holds ${registered.size}) — ${unregistered} unregistered.`)
