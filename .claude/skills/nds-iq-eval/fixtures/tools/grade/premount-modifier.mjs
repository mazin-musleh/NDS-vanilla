// Layout-modifier timing report. Finds every nds-full-width / nds-wSideMenu in
// the target and says WHEN it lands: in the served HTML, in JS that runs as the
// module/render evaluates, or inside a mount callback that fires after first
// paint. A REPORTER, not a verdict — the caller decides whether a given
// occurrence had to be early.
// Usage: node premount-modifier.mjs <file-or-dir>
import fs from 'node:fs'
import path from 'node:path'

const MODIFIERS = /nds-full-width|nds-wSideMenu/g
const OPENERS = /\b(useEffect|useLayoutEffect|componentDidMount|componentDidUpdate|onMounted|ngOnInit|ngAfterViewInit|connectedCallback)\s*\(/g

const target = process.argv[2]
if (!target) { console.error('usage: node premount-modifier.mjs <file-or-dir>'); process.exit(1) }

const files = []
const collect = p => {
  const st = fs.statSync(p)
  if (st.isDirectory()) { if (!/node_modules|vendor/.test(p)) for (const e of fs.readdirSync(p)) collect(path.join(p, e)) }
  else if (/\.(m?[jt]sx?|html|cshtml|razor)$/.test(p)) files.push(p)
}
collect(target)

// ponytail: brace/paren counting, string- and comment-blind. A modifier inside a
// quoted brace soup would misplace a range; fixture sources do not have one.
const matchDelim = (src, from, open, close) => {
  let depth = 0
  for (let i = from; i < src.length; i++) {
    if (src[i] === open) depth++
    else if (src[i] === close && --depth === 0) return i
  }
  return src.length
}

const effectRanges = src => {
  const out = []
  for (const m of src.matchAll(OPENERS)) {
    const paren = m.index + m[0].length - 1
    const closeParen = matchDelim(src, paren, '(', ')')
    let end = closeParen
    const after = src.slice(closeParen + 1).match(/^\s*\{/)
    if (after) end = matchDelim(src, closeParen + after[0].length, '{', '}')
    out.push([m.index, end, m[1]])
  }
  return out
}

const counts = {}
let total = 0
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8')
  const html = /\.(html|cshtml|razor)$/.test(f)
  const ranges = html ? [] : effectRanges(src)
  for (const m of src.matchAll(MODIFIERS)) {
    const inside = ranges.find(([s, e]) => m.index > s && m.index < e)
    const pattern = html ? 'initial-HTML' : inside ? `mount-effect (${inside[2]})` : 'sync-JS'
    const line = src.slice(0, m.index).split('\n').length
    const bucket = pattern.split(' ')[0]
    counts[bucket] = (counts[bucket] || 0) + 1
    total++
    console.log(`${m[0]}  ${path.relative(target, f) || path.basename(f)}:${line}  ${pattern}`)
  }
}

if (!total) console.log('no nds-full-width / nds-wSideMenu occurrence found')
console.log(`${total} occurrence(s): ` + (Object.entries(counts).map(([k, v]) => `${k}=${v}`).join(', ') || 'none') +
  ' — mount-effect means the class lands after first paint.')
