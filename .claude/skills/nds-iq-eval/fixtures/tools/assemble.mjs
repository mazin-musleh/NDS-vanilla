// Deterministic behavior-run assembly. Replaces hand-assembly (where the S84
// seed leak and three fixture-lie voids were born). Fail-closed on
// check-fixtures; stamps run-manifest.json so "what was the runner shown?"
// is a file read, not an afternoon of forensics.
//
// Usage:
//   node assemble.mjs --fixture mini-spa --state spa-post-review \
//     --rulebook real|stub|<path> --out <dir> [--root repo|mini]
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const FIX = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const REPO = path.resolve(FIX, '..', '..', '..', '..')

const args = {}
for (let i = 2; i < process.argv.length; i += 2) args[process.argv[i].replace(/^--/, '')] = process.argv[i + 1]
const { fixture, out } = args
const state = args.state || 'none'
const rulebook = args.rulebook || 'real'
const rootMode = args.root || 'repo'
if (!fixture || !out) { console.error('need --fixture and --out'); process.exit(1) }

// ponytail: per-fixture knobs, extend when a new fixture lands
const ASSETS = { 'mini-spa': 'public/assets', 'mini-app': 'wwwroot/assets' }
const HEADER = {
  'mini-spa': '# Records Portal\n\nBuild-free React SPA. `npm run dev` serves it at `http://localhost:5173`.',
  'mini-app': '# Fixture App\n\nASP.NET MVC app; views in `Views/`, static root `wwwroot/`.',
}
if (!ASSETS[fixture]) { console.error(`unknown fixture ${fixture}`); process.exit(1) }

// 1. invariants, fail-closed
execSync(`node "${path.join(FIX, 'tools', 'check-fixtures.mjs')}"`, { stdio: 'inherit' })

// 2. fixture copy (real copies — never junctions)
fs.rmSync(out, { recursive: true, force: true })
fs.cpSync(path.join(FIX, fixture), out, { recursive: true })

// 3. NDS_ROOT
const nds = path.join(out, '.nds')
if (rootMode === 'mini') {
  fs.cpSync(path.join(FIX, 'mini-root'), nds, { recursive: true })
} else {
  fs.cpSync(path.join(REPO, '_site'), path.join(nds, '_site'), { recursive: true })
  for (const f of ['_js', '_sass', 'components', 'utilities', 'layout', 'ui-shell', 'core', 'templates', 'examples'])
    fs.cpSync(path.join(REPO, f), path.join(nds, '_source', f), { recursive: true })
  fs.cpSync(path.join(REPO, '_data', 'content'), path.join(nds, '_source', '_data', 'content'), { recursive: true })
  fs.cpSync(path.join(REPO, 'CHANGELOG.md'), path.join(nds, 'CHANGELOG.md'))
}

// 4. runtime into NDS_ASSETS
fs.cpSync(path.join(nds, '_site', 'assets'), path.join(out, ASSETS[fixture]), { recursive: true })

// 5. rulebook at project root AND .nds (zip shape)
const rbPath = rulebook === 'real' ? path.join(REPO, '_includes', 'NDS-IQ.md')
  : rulebook === 'stub' ? path.join(FIX, 'NDS-IQ-STUB.md') : path.resolve(rulebook)
fs.cpSync(rbPath, path.join(out, 'NDS-IQ.md'))
fs.cpSync(rbPath, path.join(nds, 'NDS-IQ.md'))

// 6. anchor — extracted from the REAL rules file's Install section so it never
// drifts from canon; NDS_ASSETS placeholder swapped for the fixture's path
if (!fs.existsSync(path.join(out, 'AGENTS.md'))) {
  const rules = fs.readFileSync(path.join(REPO, '_includes', 'NDS-IQ.md'), 'utf8')
  const fence = rules.match(/```markdown\n(## NDS — National Design System[\s\S]*?)```/)
  if (!fence) { console.error('anchor canon not found in rules file'); process.exit(1) }
  const anchor = fence[1].replace(/`NDS_ASSETS` = `[^`]+`/, '`NDS_ASSETS` = `' + ASSETS[fixture] + '/`')
  fs.writeFileSync(path.join(out, 'AGENTS.md'), `${HEADER[fixture]}\n\n${anchor}`)
}

// 7. state overlay (checked-in, leak-audited; wins over fixture + anchor)
if (state !== 'none') {
  const st = path.join(FIX, 'states', state)
  const files = path.join(st, 'files')
  if (!fs.existsSync(path.join(st, 'state.json'))) { console.error(`state ${state} missing`); process.exit(1) }
  if (fs.existsSync(files)) fs.cpSync(files, out, { recursive: true })
}

// 8. manifest
const sha = p => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex')
let head = 'unknown'
try { head = execSync('git rev-parse HEAD', { cwd: REPO }).toString().trim() } catch {}
fs.writeFileSync(path.join(out, 'run-manifest.json'), JSON.stringify({
  fixture, state, rootMode,
  rulebook: { arg: rulebook, path: rbPath, sha256: sha(rbPath) },
  repoHead: head,
  assembledAt: new Date().toISOString(),
}, null, 2))
console.log(`assembled ${fixture} + state:${state} + rulebook:${rulebook} → ${out}`)
