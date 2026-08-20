# nds-iq-eval micro-fixtures

Skeletal stand-ins for behavior-mode runs. Every file is a stub with just enough
structure for the rules file's references to resolve — grading compares agent
output against these files, so internal consistency matters, realism does not.
Do not grow them toward realism.

`NDS-IQ-STUB.md` is the exception to "behavior-mode" — it serves `floor` mode
(SKILL.md), which is a COMPREHENSION run. It stands in for the rules file
itself: the empty condition a scenario is measured against, so a scenario that
passes with it as the rulebook is measuring the model rather than NDS IQ. It
carries the two path meanings and the mandate and nothing procedural. Growing
it raises the floor and makes the real rules file look less necessary than it
is — missing context belongs in a scenario's `setup:`, not here.

**Keep the file free of anything that announces what it is** — no explanatory
comment, no "stub" in the heading, no version marker. A runner reads it with
`Read`, which returns raw text, so an HTML comment is as visible as prose. This
matters in one direction: a runner that knows its rulebook is deliberately
empty answers UNDEFINED where it would otherwise reason, which SUPPRESSES floor
passes and makes NDS IQ look more load-bearing than it is. The 2026-08-14 run
hit exactly that — the heading then read `(instructions v0.0-stub)` and runners
quoted it back ("UNDEFINED per the 3-line stub"), so that run's 24/75 is an
undercount. Both tells were removed after. Keep the explanation here, in this
README, where no runner reads it.

- `mini-root/` = a fake extracted `NDS_ROOT` (template zip). Version banner in
  the bundle stubs is the mutable knob scenarios stamp (e.g. 1.3.0 for stale).
  It defaults to the rules' floor so runs start unblocked; sub-floor states are
  a scenario `setup:` stamp, never the default.
  - `_source/_js/` = banner stubs (real banner comment + one stub line) for the
    banner-first scenarios (S6/S14/S15/S25). Frozen copies from the 1.7.0 cycle;
    refresh a stub if its real banner changes materially.
  - `_source/{components,layout,ui-shell,utilities,core,templates,examples}/*.md`
    = doc `.md` source twins of the `_site` pages — v7 routes markup reads to
    `.md` first. Mirror the real zip's folder set: rule #3 takes the folder from
    the catalog entry's own `url`, so a folder the zip ships and this tree lacks
    sends a runner to a path that does not exist, and the run fails for a reason
    that has nothing to do with the rules.
  - `_source/_sass/tokens/*.scss` = semantic and component tier stubs, real
    names and placeholder values. Without them a styling scenario has no knob or
    token to reach, and a runner correctly falls to rule #5's last resort — a
    pass that grades as a fail.
  - **Every `url:` in the catalog must resolve to a stub in this tree.** Add the
    entry and the stub together; a catalogued entry with no doc file is the same
    fake failure as a missing folder.
  - **Every `nds-hgi-*` used in fixture markup must be listed in `icons.yml`.**
    Only registered names paint in the inline set, so a missing one is a silent
    solid box that `NDS.Init.audit()` reports — an agent then correctly flags a
    page that is actually fine, and the run pays attention to a harness fault.
  - `NDS-IQ.md` (top level) = heading + pairing-stamp stub of the zip's copy of
    the rules file; the upgrade flow compares against it.
- `mini-app/` = a fake consumer ASP.NET MVC app mid-legacy: two legacy `.cshtml`
  pages (Bootstrap + jQuery-table flavored) plus `Home/Dashboard.cshtml`, an
  NDS-built page carrying a canonical department multiselect for the wiring
  scenarios to attach JS to. Scenario setups may add broken `.nds-*` pages or old
  NDS assets under `wwwroot/`. A scenario whose setup says a surface already
  exists needs that surface HERE — otherwise the runner is asked to wire
  something it would have to invent, and refusing is the correct answer.

- `mini-spa/` = a fake consumer React SPA ("Records Portal"), the
  client-rendered sibling of `mini-app/` — and it RUNS: no build step, no
  `npm install`, ever. React 18.3.1 UMD is vendored under `vendor/` (the DEV
  builds on purpose — StrictMode's mount/unmount/remount double-invoke, which
  the lifecycle scenarios need, exists only there); pages are plain
  `React.createElement` ES modules; routing is hash-based so every route
  change is a real mount/unmount. Serve with any static server
  (`python -m http.server 5173` in the assembled copy). The hazard markers
  the scenarios grade against, preserved exactly: `src/main.js` injects
  `styles.css` from the shared JS entry (invisible in `index.html` — the
  S80/S83 discovery shape), the sheet keeps its bare-element globals (`body`,
  `h1`, `h2`, `a`), and `src/pages/Records.js` ships the S84 parity trap
  (live-filter search input with no submit button, plain table, no filter
  control). `check-fixtures.mjs` guards all of these — do not remove a marker
  without updating it.

- `mini-mpa/` = a fake consumer static multi-page site ("Records Desk"), the
  server-rendered sibling of `mini-spa/` — no framework, no build step, no
  `npm install`, ever. Three hand-written pages (`index.html`, `records.html`,
  `about.html`) repeat the header/nav/footer markup per page, which is how a
  legacy static site is actually shaped; its own JS is the single
  `js/site.js`, jQuery-flavored. `vendor/` holds trimmed stand-ins the pages
  really load — `bootstrap.min.css` (rules for the classes the markup uses),
  `jquery.min.js` (a `$`/`jQuery` factory with the four methods the site
  calls), `datatable-lite.js` (a legacy table enhancer registered on `$.fn`,
  which `site.js` initializes on `#records-table`). Serve with any static
  server (`python -m http.server 5174` in the assembled copy). `NDS_ASSETS`
  assembles to `assets/`, a folder the fixture does not ship — the legacy
  site keeps its own files in `js/` and `vendor/`, so the runtime lands in a
  fresh folder rather than on top of legacy assets. The graded markers
  are the legacy files themselves: `legacy-untouched.mjs` byte-compares them,
  so an edit here changes what every past R7 run is measured against.
  `check-fixtures.mjs` guards their presence, the `#records-table` init, and
  that `records.html` carries no `nds-` markup.

- `states/` = checked-in run states, one folder per state a scenario names:
  `state.json` (name, fixture, source, leakAudited) plus optional `files/`
  overlaid onto the assembled copy. States are authored from FIELD artifacts
  verbatim and leak-audited once — never re-narrated per run; the S84 leak
  was born in hand-seeding (`spa-post-review`'s Records row carries the field
  plan's own text, no member enumeration).

- `tools/` = the trust chain. `check-fixtures.mjs`: fail-closed invariants
  (catalog urls resolve, icons registered, hazard markers present, no
  junctions/symlinks — a runner's directory listing does not traverse them
  and reports the tree empty, which voided two runs 2026-08-16/17).
  `assemble.mjs`: deterministic run assembly — fixture copy + `.nds/` as
  REAL copies of the repo `_site` + `_source` set (or `--root mini` for
  `mini-root/`), runtime into the fixture's assets path, rulebook (`real` |
  `stub`) at root and `.nds/`, anchor extracted from the rules file's own
  canon, state overlay, and a `run-manifest.json` stamping exactly what the
  runner was shown (rulebook sha256, repo HEAD, state). `grade/`: mechanical
  grade-half reporters (`s84-members.mjs`); judgment sits on top.

Behavior runs always work on scratchpad COPIES built by `assemble.mjs`
(see SKILL.md), never on these originals.
