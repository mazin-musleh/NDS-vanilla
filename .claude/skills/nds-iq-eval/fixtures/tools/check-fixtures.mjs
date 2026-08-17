// Fixture invariant guard — fail-closed. Run standalone or via assemble.mjs.
// A broken fixture must refuse to produce a run: three behavior runs were
// voided by fixture lies (junctions, missing .nds, absent surfaces).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const FIX = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const errs = []
const ok = (cond, msg) => { if (!cond) errs.push(msg) }
const read = p => fs.readFileSync(p, 'utf8')
const exists = p => fs.existsSync(p)

// --- NDS-IQ-STUB.md: serves floor mode, must not announce itself ---
{
  const p = path.join(FIX, 'NDS-IQ-STUB.md')
  ok(exists(p), 'NDS-IQ-STUB.md missing')
  if (exists(p)) {
    const t = read(p)
    ok(t.startsWith('# NDS IQ'), 'stub first line must start "# NDS IQ"')
    ok(!/stub/i.test(t), 'stub announces itself (contains "stub")')
    ok(!/v\d+\.\d+/.test(t), 'stub carries a version marker')
  }
}

// --- mini-root: every catalog url resolves to a stub; icons registered ---
const root = path.join(FIX, 'mini-root')
{
  const catDir = path.join(root, '_source', '_data', 'content')
  ok(exists(catDir), 'mini-root catalog dir missing')
  if (exists(catDir)) {
    for (const f of fs.readdirSync(catDir).filter(f => f.endsWith('.yml') && f !== 'icons.yml')) {
      const t = read(path.join(catDir, f))
      for (const m of t.matchAll(/^\s*url:\s*(\S+)/gm)) {
        const clean = m[1].replace(/^\//, '').replace(/#.*$/, '').replace(/\.html$/, '.md')
        ok(exists(path.join(root, '_source', clean)), `${f}: url ${m[1]} has no stub at _source/${clean}`)
      }
    }
  }
}

// --- icons: every nds-hgi-* used in fixture markup is registered ---
{
  const iconsYml = path.join(root, '_source', '_data', 'content', 'icons.yml')
  const registered = exists(iconsYml) ? new Set([...read(iconsYml).matchAll(/([a-z0-9-]+)/g)].map(m => m[1])) : new Set()
  const scan = dir => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name)
      if (e.isDirectory()) { if (e.name !== 'vendor' && e.name !== 'node_modules') scan(p) }
      else if (/\.(md|html|cshtml|jsx?|js)$/.test(e.name)) {
        for (const m of read(p).matchAll(/nds-hgi-([a-z0-9-]+)/g))
          ok(registered.has('nds-hgi-' + m[1]) || registered.has(m[1]), `icon nds-hgi-${m[1]} in ${path.relative(FIX, p)} not in icons.yml`)
      }
    }
  }
  for (const d of ['mini-root', 'mini-app', 'mini-spa']) if (exists(path.join(FIX, d))) scan(path.join(FIX, d))
}

// --- mini-app: surfaces scenarios assert must exist (S25 lesson) ---
{
  const app = path.join(FIX, 'mini-app')
  ok(exists(path.join(app, 'Views', 'Home', 'Dashboard.cshtml')), 'mini-app Dashboard.cshtml missing (S25 wiring surface)')
}

// --- mini-spa: no-build shape + hazard markers ---
{
  const spa = path.join(FIX, 'mini-spa')
  ok(exists(path.join(spa, 'vendor', 'react.development.js')) && fs.statSync(path.join(spa, 'vendor', 'react.development.js')).size > 50000, 'mini-spa vendored react missing/truncated')
  ok(exists(path.join(spa, 'vendor', 'react-dom.development.js')) && fs.statSync(path.join(spa, 'vendor', 'react-dom.development.js')).size > 500000, 'mini-spa vendored react-dom missing/truncated')
  const main = read(path.join(spa, 'src', 'main.js'))
  ok(/styles\.css/.test(main), 'mini-spa main.js lost the styles.css entry injection (S80/S83 hazard)')
  ok(/StrictMode/.test(main), 'mini-spa lost StrictMode (lifecycle double-invoke)')
  const css = read(path.join(spa, 'src', 'styles.css'))
  ok(/^\s*body\s*\{/m.test(css) && /^\s*a\s*\{/m.test(css), 'mini-spa styles.css lost its bare-element selectors')
  for (const pg of ['Home', 'Records', 'Reports', 'About', 'Contact', 'Settings'])
    ok(exists(path.join(spa, 'src', 'pages', pg + '.js')), `mini-spa page ${pg}.js missing`)
  const rec = read(path.join(spa, 'src', 'pages', 'Records.js'))
  ok(/type:\s*'search'/.test(rec), 'Records parity trap lost its live-filter search input')
  ok(!/nds-search-btn|nds-dropmenu/.test(rec), 'Records parity trap gained NDS controls — the trap is their ABSENCE')
  const html = read(path.join(spa, 'index.html'))
  ok(/id="root"/.test(html) && /vendor\/react\.development\.js/.test(html), 'mini-spa index.html shape broken')
}

// --- states: each has a manifest naming its source and leak audit ---
{
  const st = path.join(FIX, 'states')
  if (exists(st)) for (const e of fs.readdirSync(st, { withFileTypes: true })) {
    if (!e.isDirectory()) continue
    const mf = path.join(st, e.name, 'state.json')
    ok(exists(mf), `state ${e.name} has no state.json`)
    if (exists(mf)) {
      const j = JSON.parse(read(mf))
      ok(j.name && j.fixture && j.source && j.leakAudited, `state ${e.name}: state.json needs name/fixture/source/leakAudited`)
    }
  }
}

// --- no junctions/symlinks anywhere (two voided runs) ---
{
  const walk = dir => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name)
      ok(!e.isSymbolicLink(), `symlink/junction in fixtures: ${path.relative(FIX, p)}`)
      if (e.isDirectory() && !e.isSymbolicLink()) walk(p)
    }
  }
  walk(FIX)
}

if (errs.length) {
  console.error(`check-fixtures: ${errs.length} FAILURE(S)`)
  for (const e of errs) console.error('  - ' + e)
  process.exit(1)
}
console.log('check-fixtures: all invariants hold')
