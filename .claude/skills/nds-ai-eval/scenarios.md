# nds-ai-eval scenarios

Seeded 2026-08-03 from the v3 three-model comprehension test (Fable, Opus, Sonnet — 7/8 identical; S5 produced v3's "may render worse on it" fix). Setup + prompt go to runners; rubrics stay here. The block state last evaluated is snapshotted in `last-evaluated.md`.

## S1 prior-work-first-session

- mode: both
- rules: Workflow step 1 prior-NDS bullets; "Build nothing until they approve it"; Upgrading guard
- provenance: v3 design session 2026-08-03 (prior-NDS triage)
- setup: First session; block installed today with real paths (`NDS_ROOT` at 1.6.0); project has 12 pages of `.nds-*` markup; runtime banner 1.3.0; no `NDS-PLAN.md`.
- prompt: "continue building our NDS UI — add a checkout page."
- rubric:
  - MUST: enter step 1; assess the 12 pages against `NDS_ROOT` canon (conformance split, dev approves); write the plan with a checkout row; stop for review; route the stale runtime through "Upgrading NDS" as a tracked item.
  - MUST NOT: build checkout first; adopt or rebuild the prior pages silently; upgrade unprompted.
  - cite: "presence grants no authority; conformance decides, the dev approves"
- artifacts (behavior): `NDS-PLAN.md` exists with the five columns and a checkout row; no page file written; no asset copy yet.
- baseline: v3 — fable PASS, opus PASS, sonnet PASS. Scoped 2026-08-03 (v4 greenfield edits): sonnet PASS — the new plan-from-intent bullet did not confuse prior-NDS triage.

## S2 mature-install-new-page

- mode: comprehension
- rules: plan retirement ("with no plan required"); archetype tier; step 4 passes
- provenance: v3 design session 2026-08-03 (plan rescoped to migration scaffolding)
- setup: Mature project; block installed for months; every NDS page built under it and verified, including a `Built and Verified` listing-family archetype (a news listing page); no `NDS-PLAN.md` anywhere.
- prompt: "add a services listing page."
- rubric:
  - MUST: build directly with no plan ceremony; archetype first, then cascade (templates → examples → custom); step 4 behavioral + visual passes.
  - MUST NOT: create or resurrect `NDS-PLAN.md`; re-inventory the project.
  - cite: "runs under the rules and step 4's verification with no plan required"
- baseline: v3 — fable PASS, opus PASS, sonnet PASS. Scoped 2026-08-03: sonnet PASS with archetype conditional omitted; setup gained the explicit archetype since, so the rubric now bites deterministically.

## S3 block-refresh-runtime-current

- mode: comprehension
- rules: standalone block refresh (raw main URL); heading-to-marker swap; re-apply declarations
- provenance: v3 design session 2026-08-03 (dual refresh paths)
- setup: Mature project; runtime banner matches the latest published release.
- prompt: "our NDS instructions feel old — update them."
- rubric:
  - MUST: fetch the raw main include URL; compare `instructions v…`; if newer, swap heading-through-marker and re-apply the two real declarations; if not newer, report current.
  - MUST NOT: run a template upgrade; hand-merge or reword the block; lose the declarations.
  - cite: "A standalone block refresh on the dev's ask"
- baseline: v3 — fable PASS, opus PASS, sonnet PASS.

## S4 block-refresh-runtime-behind

- mode: comprehension
- rules: "Runtime behind the latest release? Propose the full upgrade instead"; upgrade steps 1–4
- provenance: v3 design session 2026-08-03 (refresh guard)
- setup: Same ask as S3, but runtime banner 1.4.0 and latest published release 1.6.0.
- prompt: "update the NDS instructions."
- rubric:
  - MUST: refuse the standalone refresh; propose the full upgrade (block rides step 4, sourced from the fresh `NDS_ROOT` guide); wait for the dev's go.
  - MUST NOT: install a raw-main block over the stale runtime; upgrade before the go.
  - cite: "this step delivers the block with it"
- baseline: v3 — fable PASS, opus PASS, sonnet PASS.

## S5 keep-old-pages-serving

- mode: comprehension
- rules: legacy-NDS bullet — clean start default, costs by name, parallel as knowing exception with second assets folder
- provenance: v3 test 2026-08-03 — Sonnet soft-missed pre-fix (claimed clean start "already keeps old pages serving"); fixed by "and may render worse on it". Watch this one on every weak-model run.
- setup: First session like S1, but the prior NDS work is broken/non-canonical. Dev says the sentence below.
- prompt: "keep the old pages working while you rebuild the new ones."
- rubric:
  - MUST: recognize the ask as the named parallel-files exception; propose it knowingly — second assets folder, NDS-on-NDS collision costs named ("which NDS?" on greps/copy sources/bugs); rule #7 approval before file #1. (A clarifying question is acceptable ONLY if it names that clean start may render old pages worse — the default cannot silently satisfy the ask.)
  - MUST NOT: claim the clean-start default keeps old pages working; adopt old assets as runtime; copy old markup.
  - cite: "may render worse on it" / "picks parallel files, knowingly, with a second assets folder"
- baseline: v3 — fable PASS, opus PASS; sonnet SOFT-MISS pre-fix, PASS after "may render worse on it" landed (scoped run 2026-08-03). Scoped 2026-08-03 (v4 greenfield edits): sonnet PASS via the clarifying-question route (render-worse + second assets folder both named).

## S6 form-region-swap

- mode: comprehension
- rules: JS integration — `initializeContainer`, `syncState`, never `form.reset()`
- provenance: control scenario (rule shipped in v1 block; rig-validated)
- setup: A page you built; another script AJAX-swaps the registration form's HTML region and sets input values from JS; validation chrome and clear buttons stale.
- prompt: "What exact NDS calls fix this, and what native call must you avoid?"
- rubric:
  - MUST: `NDS.Forms.initializeContainer(el)` on the swapped region, then `NDS.Forms.syncState(input)` per written field.
  - MUST NOT: `form.reset()`; own listeners on `.nds-*` elements.
  - cite: "or the new inputs stay inert"
- baseline: v3 — fable PASS, opus PASS, sonnet PASS.

## S7 layout-coupled-copy-source

- mode: both
- rules: rule #3 layout-coupled components — full page as copy source, doc as explainer
- provenance: control scenario (rig 1–4 recurring trap)
- setup: A new page needs the side menu; the side menu has its own doc page in the template.
- prompt: "Where do you copy its markup from?"
- rubric:
  - MUST: a full template/example page found via the catalogs; doc page used only to understand the copy.
  - MUST NOT: copy the doc page's standalone block; lift the menu from its wrapper chain.
  - cite: "only work inside their page wrapper chain"
- artifacts (behavior): copied markup byte-matches the fixture template page's wrapper chain, not the doc block.
- baseline: v3 — fable PASS, opus PASS, sonnet PASS.

## S8 update-check

- mode: comprehension
- rules: sanctioned update check; banner-lines-only exception; act only on the dev's go
- provenance: v3 design session 2026-08-03 (update-check affordance)
- setup: Mature project, any state.
- prompt: "are we on the latest NDS?"
- rubric:
  - MUST: read only the `Version:` banner lines of `NDS_ASSETS/js/nds-main.min.js`; compare against the latest release tag at the repo (not against local `NDS_ROOT`, which can itself be stale); report, including CHANGELOG highlights if behind; stop.
  - MUST NOT: read past banner lines of any `.min.js`; download/replace/upgrade anything.
  - cite: "upgrade only on the dev's go"
- baseline: v3 — fable PASS, opus PASS, sonnet PASS (sonnet did not name the stale-NDS_ROOT nuance; action still correct — not a finding). Scoped 2026-08-03: sonnet PASS.

## S9 re-audit-request

- mode: comprehension
- rules: plan section re-audit sentences ("a dev-requested re-audit... recreates the plan from the current state")
- provenance: drafted during the 2026-08-03 scoped run — the re-audit rule shipped in v3 with no coverage (scoping caught the gap)
- setup: Mature project; block installed long ago; all NDS pages built under it across many sessions; no `NDS-PLAN.md` exists.
- prompt: "audit our NDS implementation — I want to know if anything has drifted."
- rubric:
  - MUST: recreate `NDS-PLAN.md` via step 1's inventory plus the prior-NDS conformance assessment run over the block's own install; passing pages enter `Awaiting Verification` (step 4's passes decide), drifted pages enter `Planned` with deltas named; repairs run as normal plan rows under the usual pacing.
  - MUST NOT: refuse because no plan exists; deliver a drift verdict without writing the plan; judge conformance against the project's own pages; reclassify drifted pages as legacy-NDS wholesale rebuilds by default.
  - cite: "a dev-requested re-audit" / "recreates the plan from the current state"
- baseline: scoped 2026-08-03 — sonnet PASS (first exposure).

## S10 greenfield-first-session

- mode: comprehension
- rules: Workflow intro "Exists means the stack runs and serves a page"; step 1 greenfield bullet ("Plan from intent")
- provenance: v4 design session 2026-08-03 (greenfield support)
- setup: A stock-scaffolded app (default welcome page still present, runs and serves at localhost); block installed with real paths (`NDS_ROOT` at 1.6.0); `NDS_ASSETS` empty; no `NDS-PLAN.md`.
- prompt: "let's build the whole UI with NDS — we need Home, About, a Services list, and a Contact form."
- rubric:
  - MUST: proceed (a scaffolded app qualifies as exists); plan from intent — exactly the four named pages mapped through the cascade into the plan table, legacy-libraries column empty; stop for dev review before building.
  - MUST NOT: refuse or stop because the project "has no UI yet"; invent pages beyond the named four; run rule #7's porting-strategy ceremony (it never triggers).
  - cite: "Greenfield (nothing to inventory)? Plan from intent"
- baseline: scoped 2026-08-03 (v4, first exposure) — sonnet PASS.

## S11 no-project-hard-stop

- mode: comprehension
- rules: Workflow intro "No project at all? Say so and stop"
- provenance: v4 design session 2026-08-03 — guards that the "exists means" softening didn't erase the scaffold boundary. A static-site-from-nothing exception was offered and is UNDECIDED; until the dev rules on it, the stop is law and this rubric stands.
- setup: An empty folder: only a `CLAUDE.md` carrying the block with real paths, `NDS_ROOT` extracted beside it. No package.json, no server code, nothing runs or serves.
- prompt: "build me a company site with NDS, pick whatever structure you like."
- rubric:
  - MUST: say so and stop; name the stack/structure choice as the dev's design work, even against the explicit "pick whatever" invitation.
  - MUST NOT: scaffold an app or a static site; choose a stack; write a plan or any page.
  - cite: "No project at all? Say so and stop"
- baseline: scoped 2026-08-03 (v4, first exposure) — sonnet PASS.

## S12 greenfield-brief-fabrication

- mode: comprehension
- rules: porting-principle greenfield bullet ("The dev's brief takes its place"); no-fabrication rule; template trimming ("trimming sections or steps is still swapping content"); forms "or the dev's described flow"
- provenance: v4 design session 2026-08-03 (greenfield support)
- setup: S10's project after plan approval, chrome built and verified. About row brief = "intro paragraph, team photos, contact call-to-action"; closest catalog match = DGA About Entity template, which also carries org-structure and statistics sections the brief never mentions. Contact row: dev described "a simple name/email/message form, one screen".
- prompt: "build the About page next." Plus part (b): how many steps for the Contact form, and why?
- rubric:
  - MUST: copy the About Entity template as-is; fill the brief's content; REMOVE the org-structure and statistics sections (trimming is content-swapping, not skeleton rebuilding); note the drops in the plan row/report; (b) TWO steps — the described-flow clause only licenses adding steps, never dropping below the two-step floor.
  - MUST NOT: fabricate org or statistics content to fill the template; rebuild a custom skeleton around only the kept sections; ship a single-step form because the brief said "one screen".
  - cite: "a template section the brief doesn't fill gets removed, not padded"
- baseline: scoped 2026-08-03 (v4, first exposure) — sonnet PASS, spontaneously articulating the floor-not-ceiling reading of the forms clause.

## S13 cold-spike-ask

- mode: comprehension
- rules: rule #6 spike sentences ("This cuts both ways... A spike needs no plan; it needs the same ceremony any NDS page gets"); head unit "copied as a unit... Do not reduce the set"
- provenance: 2026-08-03 session probe (paste-and-go question) — pre-fix sonnet run confirmed the gap: under "quick one" framing the runner reduced the head to two hand-picked tags and edited the live Bootstrap view in place, flagging the cascade risk only after the fact. The rule #6 spike sentence is the fix. Watch the "quick one" pressure on every weak-model run: the trap is the model inventing a lighter ceremony tier the block doesn't define.
- setup: Block pasted into CLAUDE.md yesterday, paths set, `NDS_ROOT` on disk at 1.6.0; nothing else NDS has ever happened (no bundles in `NDS_ASSETS`, no NDS markup anywhere, no `NDS-PLAN.md`); the app is a working Bootstrap 4 UI, dozens of views.
- prompt: "quick one — add an NDS button style to the Save button on the Edit Profile page, I want to see how NDS looks in our app."
- rubric:
  - MUST: copy `NDS_ROOT/_site/assets/` wholesale into `NDS_ASSETS` first; build ONE parallel spike page (rule #7's naming pattern) carrying the full head unit copied as a unit (paths rewritten) and the canonical button markup; run step 4 verification or emit the checklist.
  - MUST NOT: edit the live legacy view or add `.nds-*` classes onto its button; hand-pick a reduced set of head tags; invent markup; write `NDS-PLAN.md` for a spike (the sentence under test sanctions skipping it).
  - cite: "never a reduced head or NDS markup inside a live legacy page"
- baseline: 2026-08-03 pre-fix — sonnet FAIL (reduced head + in-place legacy edit). Post-fix same day — sonnet PASS, quoting the spike sentence verbatim.

## S14 server-driven-listing-wiring

- mode: comprehension
- rules: JS-integration bullets — AJAX filter (nested criteria, `whenReady`, `data-filter-action="reset"`), server-driven pagination (`updateRecords` + `nds:pagination:change`), programmatic writes (`syncState` dispatches nothing), forms submit ownership (`data-ajax`), `NDS.request`
- provenance: 2026-08-03 session probe of composite JS wiring (the underlying rules are rig-born). Pre-fix sonnet hand-wired the clear button per-field + `syncState` on a false "filter re-emits" assumption (source: `syncState` dispatches nothing by design) and UNDEFINED'd the page-click event (the block told only the push side). Fixed by three v4 sentence extensions, each source-verified: `nds-filter.js` `data-filter-action`/`reset()` re-emits `nds:filter:change`; `nds-pagination.js` fires `nds:pagination:change` on user page change, `setPage()` silent. Both APIs were already on their doc pages; the gap was block-only.
- setup: Mature project; chrome and several pages Built and Verified. Services listing with canonical markup: NDS filter (search box inside `.nds-form`, category select, status select), paged list region, pagination nav. Backend GET /api/services (search, category, status, page) returning { items, from, to, total }; ~12,000 records, server-driven.
- prompt: "Wire the listing: fetch from /api/services whenever the filter changes, render the returned rows, keep the pagination numbers correct, and make this 'Clear filters' button reset every filter input from JS. One more thing: pressing Enter in the search box reloads the whole page — stop that. Give me the exact NDS events and calls you'd use, in order."
- rubric:
  - MUST: bind via `NDS.Filter.whenReady`; read the nested `event.detail.criteria` shape (`criteria.filters.*`, `criteria.search`); fetch via `NDS.request(url, { json: true })`; `NDS.Pagination.updateRecords(listId, { from, to, count })` after each response (mapping `total` → `count`); wire page clicks off `nds:pagination:change` (`detail.page`); Clear button routed to `data-filter-action="reset"` markup with no hand-wired JS; Enter fix via `data-ajax` on the form.
  - MUST NOT: read filter inputs directly; raw `fetch`; rebuild the nav; add an own `submit` listener; `form.reset()`; per-field clear + `syncState` as the filter-reset mechanism (repaints only, dispatches nothing); `setPage()` as the page-click hook (fires no event).
  - cite: "Resetting is markup, not JS" / "Page clicks arrive as `nds:pagination:change`"
- baseline: 2026-08-03 pre-fix — sonnet SOFT-FAIL (5.5/7: hand-wired clear on the false re-emit assumption; page event UNDEFINED with a grep plan and a correct name guess). Post-fix same day — sonnet PASS, all seven wired from block text, zero UNDEFINED.

## S15 menu-clipping-in-modal

- mode: comprehension
- rules: facts bullet "Dropmenu-driven menus render in place by default" (`data-portal` on the wrapper, knobs stay on the wrapper, never overflow/z-index fixes)
- provenance: 2026-08-03 session probe from the maintainer's own migration experience (portal clipping named the most common silent fail). Pre-fix sonnet followed the block correctly and still committed to rule #5's last-resort scoped override, the exact wrong fix (it did UNDEFINED and would have filed NDS-REPORT — disciplined process, wrong outcome, purely text-led). Mechanism source-verified in `nds-dropmenu.js` (opt-in `data-portal` escapes ancestor stacking contexts, PORTAL_VARS snapshots wrapper knobs); doc coverage was dropmenu.md only — the modal and multiselect pages never mention it, so the components an agent actually touches offer no path to the fix.
- setup: Mature project; the "New Request" page has an NDS modal containing a form with an NDS multiselect in canonical markup; everything verified at build time.
- prompt: "the category dropdown inside the New Request modal gets cut off — when you open it you can only see the first two options, the rest is clipped at the modal's edge. Fix it."
- rubric:
  - MUST: add `data-portal` to the multiselect's dropmenu wrapper; leave sizing knobs on the wrapper; cite the facts bullet.
  - MUST NOT: overflow or z-index overrides on the modal; a scoped `.nds-*` CSS override as the fix; restructuring the copied markup; inventing a portal mechanism from memory.
  - cite: "The fix is markup, not CSS" / "Never fix menu clipping with overflow or z-index overrides"
- baseline: 2026-08-03 pre-fix — sonnet FAIL (committed to a scoped `.nds-*` override after finding no knob). Post-fix same day — sonnet PASS, one-attribute fix, bullet quoted verbatim.
