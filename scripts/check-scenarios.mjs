// Scenario-record guard for .claude/skills/nds-iq-eval/scenarios/.
// SKILL.md:121 already states the rules — a new run REPLACES the verdict, one
// open story, index row updated. Those are bolted to a mental moment and drift
// anyway (2026-08-18: an appended second baseline, four stale "lands BEFORE"
// markers, two pointers into a TODO.md that is cleared every release). This
// fires on the mechanical moment instead: scenario files staged for commit.
import fs from 'node:fs'
import path from 'node:path'

const DIR = '.claude/skills/nds-iq-eval/scenarios'
const INDEX = '.claude/skills/nds-iq-eval/scenarios.md'
const errs = []
const bad = (file, msg) => errs.push(`${file}: ${msg}`)

const files = fs.readdirSync(DIR).filter(f => /^S\d+-.+\.md$/.test(f))
const index = fs.readFileSync(INDEX, 'utf8')

// Index rows: | S87 | slug | mode | gist | verdict | flags |
const rows = new Map()
for (const line of index.split('\n')) {
  const m = line.match(/^\|\s*(S\d+)\s*\|\s*([A-Za-z0-9-]+)\s*\|[^|]*\|[^|]*\|\s*([^|]*?)\s*\|/)
  if (m) rows.set(m[1], { slug: m[2], verdict: m[3] })
}

for (const file of files) {
  const id = file.match(/^(S\d+)-/)[1]
  const slug = file.replace(/^S\d+-/, '').replace(/\.md$/, '')
  const text = fs.readFileSync(path.join(DIR, file), 'utf8')

  // 1. Every scenario has an index row, with a matching slug.
  const row = rows.get(id)
  if (!row) bad(file, `no row in scenarios.md`)
  else if (row.slug !== slug) bad(file, `index slug "${row.slug}" != filename slug "${slug}"`)

  // 2. Required durable fields.
  for (const f of ['mode', 'rules', 'provenance', 'setup', 'prompt', 'rubric', 'baseline'])
    if (!new RegExp(`^- ${f}:`, 'm').test(text)) bad(file, `missing "- ${f}:" field`)

  // 3. Appended-instead-of-replaced. Compares 15-word windows over text with
  //    markdown and whitespace normalised away — sentence splitting does NOT
  //    work here, because "call).** Real cell" has no space after the period,
  //    so an appended copy reads as a different string than its original.
  //    Quoted spans are dropped first: `rules:` and `cite:` quoting the same
  //    rule sentence is the format working as designed. Duplicated PROSE is the bug.
  const words = text.replace(/"[^"]*"/g, ' ').replace(/[*`_>|#-]/g, ' ')
    .replace(/\s+/g, ' ').trim().split(' ')
  const seen = new Map()
  for (let i = 0; i + 15 <= words.length; i++) {
    const gram = words.slice(i, i + 15).join(' ')
    if (seen.has(gram) && i - seen.get(gram) > 15)
      { bad(file, `repeated passage (append instead of replace): "${gram.slice(0, 60)}…"`); break }
    if (!seen.has(gram)) seen.set(gram, i)
  }

  // 4. TODO.md is cleared at every release, so a pointer into it is a dangling
  //    pointer on a schedule. A decision lives in the scenario or it is not durable.
  if (/TODO\.md/.test(text)) bad(file, `points at TODO.md — inline the decision instead`)

  // 5. "lands BEFORE the sentence" is honest until the scenario has a verdict.
  //    After that it is stale: the run happened and the question was answered.
  const pending = /lands BEFORE|No text moves before this measures|floor:\s*PENDING/i.test(text)
  const settled = row && !/^(UNRUN|UNMEASURED|—|\s*)$/i.test(row.verdict)
  if (pending && settled) bad(file, `pre-run marker ("lands BEFORE" / "No text moves") but index verdict is "${row.verdict}"`)
}

// 6. Orphan index rows, and the numbering line.
for (const id of rows.keys())
  if (!files.some(f => f.startsWith(`${id}-`))) bad(INDEX, `row ${id} has no scenario file`)

const nums = files.map(f => Number(f.match(/^S(\d+)/)[1]))
const nextFree = Math.max(...nums) + 1
const declared = index.match(/\*\*Next free is S(\d+)\.\*\*/)
if (!declared) bad(INDEX, 'numbering line missing')
else if (Number(declared[1]) !== nextFree) bad(INDEX, `says next free is S${declared[1]}, highest file is S${Math.max(...nums)}`)

if (errs.length) {
  console.error(`check-scenarios: ${errs.length} issue(s)\n` + errs.map(e => `  ${e}`).join('\n'))
  process.exit(1)
}
console.log(`check-scenarios: ${files.length} scenarios, 0 issues`)
