# NDS IQ v4.0, take 2: version-agnostic rules over the docs and the audit

## Status (2026-10-09)

Done on branch `iq-v4`:
- Phase 1: `NDS-INDEX.md` ships at the zip root, and `verify()` checks it (4e18e9e9).
- Phase 2: doc fills for section and forms (fd9f0ef2). The "copy from a built page" fills were dropped: the canons carry their layout.
- Phase 3: audit rules `legacy-library`, `bundle-tag` and `inline-defer` (6f6b964e). Browser test PASSED 2026-10-09: each rule fires once on a tripped template page; none fire on 6 clean pages.
- Phase 4: NDS IQ is rules only, with no paths, classes or APIs, and `verify()` fails on any. Guards 9/9.

**Phase 5 (eval): PARKED 2026-10-09 for an architecture discussion.** Done so far (2de8b3d9, 9dbd9cb7, ef798622): suite moved to v4; floor 48/95 free (docs carry them); real run 46/48 on the rest, 0 fail; built-page copy advice removed from docs. Open:
- S101: the IQv3.1 redirect passes only when the runner is told to do its reads; real behavior unproven (behavior run on `mini-root`).
- ~~S8: the update check does not compare the rules file.~~ FIXED 2026-10-09 (owner): the update check also compares the project-root `NDS-IQ.md` with raw main and reports both.
- ~~S12, S67, S68, S76 expect trimming~~ SETTLED 2026-10-09: no conflict. v4 cuts a part only when nothing real backs it (no data, no feature, not in a greenfield brief) and names the removal to the dev; mechanism always stays. S68 cuts content, not a part. S67 and S76 rubrics now require naming the removal.
- ~~S24, S41, S70 have no v4 rule.~~ SETTLED 2026-10-09 (owner): no rule needed, all three pass the v4 floor; kept as safety nets. S41 on watch (Aug floor FAIL, Oct PASS called a guess): add one line only on a field miss.

**Architecture (2026-10-09):**
- **IQ/index line:** "Would this sentence be wrong for another release?" Yes → index; no → IQ. The index holds what and where; every never/always lives only in IQ. Applied: four duplicate rules left the index (built page, `file://`, live demos, "every page").
- **HELD: role-word glossary.** IQ speaks stable role words (sub hero, flat variant, digital stamp, language switcher, single-choice facet, migration check); the index maps each to this release's file and section. A `verify()` check fails when IQ uses a role word the index does not define. About 20–30 index lines plus one guard. Do it once the rework settles.
- **Redirect loop (found 2026-10-09).** v3.1's rules update compares raw main with the local copy and calls any difference a newer revision. After the redirect, a 1.x project sees v4 on main, installs it, is sent back to v3.1, and repeats on every check. Fix: a final old-line file, `IQv3.2`.
  - Content: v3.1 with its heading marker set to v3.2, and its standalone rules update replaced by "this is the last revision for 1.x templates; rules updates come with the upgrade to a 2.x template". Its Upgrading step 4 (fetch raw main after a template upgrade) stays: after a 2.x upgrade, main's v4 finds the index.
  - DRAFTED 2026-10-09: commit `0d0e3a10` on branch `iq-v3.2` (cut from the `IQv3.1` tag; never merged to main). Three lines: heading v3.2; a rules update installs nothing unless `NDS_ROOT/NDS-INDEX.md` exists, then step 4 runs; `Update:` points there.
  - Tag it any time before `IQv4.0` goes out: `pre-push` and the Pages workflow ignore a tag off main's published file (`plans/iq-publish.md`).
  - v4 redirects to `IQv3.2`. Check that `verify()` and `check-release-guards.py` allow that tag name.
  - **Owner call: one address (raw main), the redirect lives in v4.** Rejected: a second download path for v4 that would keep the redirect out of v4. Reasons: a rule is safer than plumbing, and a dev can copy v4 from the guides into a pre-index project, which only a rule inside v4 catches. A later revision drops the bullet once pre-index projects are gone.
- **Hard first gate: APPLIED 2026-10-09** in `_includes/NDS-IQ.md`. Start here now opens with "open `NDS_ROOT/NDS-INDEX.md`", with three branches: not installed → §Setup; one folder down → flatten; template without an index → `IQv3.2`. Red line #2 adds: never use an NDS path from memory, even when the file exists. Guards 9/9. S101 now expects `IQv3.2`.

**Earlier Phase 5 notes:**
- Harness: map `NDS_ROOT/NDS-INDEX.md` to the repo-root `NDS-INDEX.md`, and say in the prompt that `NDS_ROOT/` holds `NDS-INDEX.md` at its root.
- Floor stub variant: no rules, but the index and docs stay. This separates rules from docs.
- Re-point the `rules:` and `cite` lines; rubrics stay behaviors.
- New scenarios: the pre-2.0 → `IQv3.1` redirect (v1.12.0 root, no index); the index read first; one per new audit rule.
- Batches of 5 or fewer (read-dependent); solo re-probe any miss.
- Costs: full run ~1M tokens, redirect probe ~100K, rigs R3/R4 ~600K. Each needs the owner's go.

## Context

The first v4 pass (branch `iq-v4`, 5 commits) restructured NDS IQ and tested it: 89/89 on current docs. But it still names about 40 facts that each release can change: file paths, class names, APIs, and doc formats.

The owner's goal is different. NDS IQ is **only rules and the orchestrator**: workflow, gates, red lines, design choices and behaviors. It holds nothing that can go stale. The facts live in what ships inside each template:
- the **docs**
- **`NDS.Audit`**
- a new **NDS index** (`NDS-INDEX.md`) that maps "need → file" for that release

Pre-2.0 templates keep using the frozen `IQv3.1` tag.

**Owner calls (2026-10-09):**
- v4 targets NDS 2.0 and later. A template without `NDS-INDEX.md` gets the `IQv3.1` tag file.
- The index is named `NDS-INDEX.md`, in the same family as `NDS-IQ.md`, `NDS-PLAN.md` and `NDS-REPORT.md`. A generic name like `AGENT-INDEX.md` reads as unrelated to NDS.
- The audit becomes load-bearing. Three easy checks are built now, and anatomy checks stay parked.
- Design choices stay in IQ, written by role ("the sub hero"), never by class name.
- I write the text; the owner reviews it.

**Kept from the first pass:**
- the eval suite and its tests (they are behaviors, so they still apply)
- the 3 fixes found by testing (rules update ≠ upgrade, two-shape routes, mount root)
- the catalog fix
- the guard-script fix
- the evidence map in `tmp/iq-v4/`

## Layers: who owns what

| Layer | Owns | Changes per release |
|---|---|---|
| `_includes/NDS-IQ.md` (v4) | Workflow and gates, red lines, design choices, behaviors, the update protocol, the anchor | Never names a fact |
| `NDS-INDEX.md` (new, at the template zip root) | Need → file map; how to read a doc page (canon blocks, the Variants table); chrome shapes and their pages; what install copies; how to view `_site`; how to run the audit; the upgrade sources | Yes, written per release |
| Docs (`components/`, `layout/`, `ui-shell/`, `core/`) | Every component and layout fact | Yes |
| `NDS.Audit` (`_js/nds-audit.js`) | Mistakes it can see on a live page | Yes |

## Phase 1: the NDS index

- **New `NDS-INDEX.md` at the repo root.** It is hand-written and about 3–5 KB.
  - **Sections:**
    - **Read first:** how a doc page holds its canon (the body of a `data-canon` block, never the wrapper), the Variants table, and where the built twin is.
    - **Need → file:** catalogs, component docs, head, page layout, section, tokens, palette, icons, core APIs, JS banners, `CHANGELOG.md`.
    - **Chrome shapes:** `full`, `console`, `minimal`, with the page that shows each.
    - **Install:** copy `_site/assets/` whole; never copy `docs-assets/`; which folders go into `_source/`.
    - **Viewing the built site:** serve `_site` over HTTP, never `file://`.
    - **Audit:** `NDS.Init.audit()`, `enableLogging`, what it cannot see (icon names in JS strings).
    - **Upgrade:** the `### Migrating from` sections plus the migration audit group.
    - **Legacy → NDS map:** Select2, DataTables, Font Awesome, Bootstrap, jQuery.
  - **Sources:** it reuses existing doc lines (`ui-shell/head.md:38,234,236,284`, `layout/page-layout.md:23-32,602-603,625`, `components/tokens.md:203`, `core/audit.md:108,230`, `core/i18n.md:46`) by linking them. It never copies their text.
- **`scripts/mkrelease.py`:**
  - `stage()` copies `NDS-INDEX.md` to the zip root (next to line 89).
  - `verify()` requires it (the line 151 tuple) and checks every path it names. The existing path-ref regexes are reused.
- **`_config.yml`:** add `NDS-INDEX.md` to `exclude:`. It ships in the zip, not on the site.
- **`AGENTS.md`:** one line. Any change to a path, the doc format, or a chrome shape updates `NDS-INDEX.md` in the same commit.

## Phase 2: doc fills (facts IQ stops carrying)

7 facts are missing from the docs and 9 are partial. Fill only the ones the index cannot hold:
- `layout/section.md`: `.nds-section-body` adds no gap; compose inside it with grid, flex or block.
- ~~copy side menu, side info, hero and stepper from a full page~~ DROPPED (owner 2026-10-09): the new canons carry their layout context, so this v3 workaround is obsolete. Phase 4 also drops IQ's "copy layout-coupled components from a FULL page" rule.
- `components/forms.md`: each required field type validates through its own code, so test each one empty.
- `ui-shell/hero.md`: the slider rule is already there (main hero only on home and sub-site home).
- Partials that are design choices (two-step forms, sub hero, bilingual default, data scale) stay in IQ by role. No doc edit is needed for them.

Each edited doc follows `/nds-doc` and EDITORIAL.md, and gets its `last_edit` bumped.

## Phase 3: three audit checks

Add these to `_js/nds-audit.js`, using its `rule({id, group, severity, docs, check(ctx)})` shape:

| Rule | Group | Finds |
|---|---|---|
| `legacy-library` | page | `window.jQuery`, `$.fn.select2`, `$.fn.DataTable`, Bootstrap or Font Awesome stylesheets, `.fa-*` classes on an NDS page |
| `bundle-tag` | page | a hand-added `<script>` for a loader-injected bundle (names read from `window.__NDS_BUNDLES`, never hardcoded) |
| `inline-defer` | page | `script:not([src])[defer]`: the attribute does nothing on an inline script |

- Add rows to the Rules table in `core/audit.md`.
- Run `ruby _plugins/js_processor.rb`.
- Run `node scripts/run-audit.mjs` on a fixture page that trips each rule.
- Then confirm a clean page stays clean.
- **Parked in `TODO.md`:**
  - an anatomy check per component
  - classes added after first paint (needs an early observer)
  - the remaining field failures

## Phase 4: rewrite NDS IQ as rules only

**Owner 2026-10-09: no twin read.** The `.md` is the only copy source. Phase 4 drops every rule that sends the agent to the built page for markup (rule #3's built reference, the source map's "copy source wherever a doc generates its markup", "copy the complete `<body>` of a built page"). The built page stays only as the visual reference in Verify.

Start from today's v4 and strip every fact. The outline:
1. **Start here:**
   - the read trigger
   - the anchor
   - the bootstrap contract (the release page, the runtime banner holds the version, flat extract)
   - the template's `NDS-INDEX.md` is the map, and the docs and the audit are the truth
   - **no index → this template predates v4: install the `IQv3.1` tag file and tell the dev that rules updates stay on it until a 2.x upgrade.**
2. **Red lines:**
   - never edit the template or the runtime
   - never read minified files
   - never invent markup
   - never mix NDS and legacy UI on one page
   - never verify from code
   - never set `Built and Verified`
   - never decide what the dev owns (affiliation, backend conflicts, versions)
   - never ship fake data or identity, or drop a part silently
3. **Design choices:**
   - NDS UI outranks the legacy UI
   - defaults, not questions
   - the source is a floor, not a ceiling
   - the existing runtime version wins
   - parallel files by default
   - chrome ships as-is
   - pages without a hero get the sub hero
   - forms take two input steps
   - Arabic-first bilingual
   - a two-state field is a single-choice facet
   - data scale follows the existing API
4. **Orchestrator:** work modes, then Setup → Plan → Build → Verify → Upgrade, each with entry and exit gates. Plan-file protocol, the stop-and-ask table, `NDS-REPORT.md`. Every fact a gate needs is routed: "the index names …".
5. **This file:** the update protocol and the anchor canon (unchanged).

**New `verify()` guard (makes "no stale facts" mechanical).** Outside the anchor block, NDS IQ may name only:
- `NDS_ROOT`, `NDS_ASSETS`
- `NDS-PLAN.md`, `NDS-REPORT.md`, `NDS-IQ.md`, `NDS-INDEX.md`
- the release URL and the raw URL
- the `IQv3.1` tag

`verify()` fails the build on any `_source/` or `_site/` path, any `nds-` class, or any `NDS.` API in the text. The path-exists check for the rules is retired, since there are no paths left to check. `check-release-guards.py` gets a case for the new guard.

Size: no target. It is whatever the rules need. Expected around 15–20 KB.

## Phase 5: eval

- **Harness:** map `NDS_ROOT/NDS-INDEX.md` to the repo file, and add a stub variant for floor runs that keeps the index and docs but has no rules. This is how to tell rules from docs.
- **Scenarios:**
  - re-point `rules:` and `cite` lines at the v4 text or the index
  - rubrics stay behaviors
  - read-dependent tests run in small batches, solo when a batch misses
- **New scenarios:**
  - pre-2.0 template → the `IQv3.1` redirect (behavior on the v1.12.0 root)
  - the index is read first
  - one test per new audit rule
- **Runs:** each needs the owner's go and a named cost.
  - full Sonnet run (~1M tokens)
  - the redirect probe on the v1.12.0 root (~100K)
  - rigs R3 and R4 (~600K), since behavior now matters more than wording
- **SKILL.md:** the `old` mode becomes the redirect probe only. The policy section says IQ names no facts, and that the index, docs and audit own them.

## Phase 6: pipeline and release

- **Guides:**
  - rewrite the v4.0 row (rules only; the index; templates without an index go to v3.2)
  - Compatibility: 2.0+; older templates use the `IQv3.2` tag
  - `get-started.md`: install mentions `NDS-INDEX.md`
- **`llms.txt`:** point agents at the index.
- **`TODO.md`:** update the IQ item (it still describes the first v4 pass).
- **Before release, on `main` (owner 2026-10-09, parked):** the camelCase leftovers the class sweep (`2cbd0c6f`) missed.
  - IDs: `#nds-realTimeClock` → `#nds-real-time-clock`, `#nds-cityName` → `#nds-city-name`, `#nds-weatherInfo` → `#nds-weather-info`. Used in `_includes/topbar.html`, `ui-shell/topbar.md` (canon and tables), `_js/nds-timeDate.js`, `_js/nds-cityWeather.js`, `_js/nds-loader.js`, and the `spa-post-build` eval fixture.
  - Files: `nds-timeDate.js` → `nds-time-date.js`, `nds-cityWeather.js` → `nds-city-weather.js`. Referenced by `_data/content/components.yml`, `_plugins/js_processor.rb`, `scripts/check-banners.mjs`, a comment in `nds-core.js`, and `ui-shell/topbar.md`.
  - A `core/migration.md` row and the TODO release-notes line; then `ruby _plugins/js_processor.rb`.
  - Fix the stale status line in `plans/docs-rewrite.md`: the camelCase sweep and localization are done.
  - Merge main into `iq-v4` after.
- **Before release (any time):** merge `iq-v4` into main. The v4 rules ride along as the draft; nothing publishes (`plans/iq-publish.md`).
- **Release day:**
  1. tag `0d0e3a10` (branch `iq-v3.2`) as `IQv3.2`
  2. `python scripts/publish-iq.py`, then `--apply`: copies the draft, commits, tags `IQv4.0`
  3. `git push origin main IQv3.2 IQv4.0`
  4. `evolve`

  Each step on the owner's go.

## Critical files

- `_includes/NDS-IQ.md`
- `NDS-INDEX.md` (new)
- `scripts/mkrelease.py`
- `scripts/check-release-guards.py`
- `_config.yml`
- `AGENTS.md`
- `_js/nds-audit.js`, `core/audit.md`
- `layout/section.md`, `ui-shell/{sidemenu,sideinfo,hero}.md`, `components/{stepper,forms}.md`
- `.claude/skills/nds-iq-eval/` (SKILL.md, scenarios, harness)
- `guides/integration-quality.md`, `guides/get-started.md`, `llms.txt`, `TODO.md`

## Verification

- `python scripts/check-release-guards.py`: every case passes, including the new no-facts guard. A planted `_source/x.md` or `nds-grid` in the rules fails it.
- `grep -nE "_source/|_site/|\bnds-[a-z]|NDS\.[A-Z]" _includes/NDS-IQ.md`: hits only inside the anchor block.
- `bundle exec jekyll build`, then `python scripts/mkrelease.py` dry-run or `verify()`: the zip has `NDS-INDEX.md` at its root, and every path it names exists.
- Audit: `node scripts/run-audit.mjs` on the fixture pages; each new rule fires once, and a clean doc page shows no new findings.
- `python scripts/check-docs.py` on each edited doc page.
- Eval: full run clean, the redirect probe passes on v1.12.0, rigs R3 and R4 graded on their artifacts.
