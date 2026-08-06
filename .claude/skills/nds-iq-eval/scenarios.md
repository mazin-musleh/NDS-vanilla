# nds-iq-eval scenarios

Seeded 2026-08-03 from the v3 three-model comprehension test (Fable, Opus, Sonnet — 7/8 identical; S5 produced v3's "may render worse on it" fix). Setup + prompt go to runners; rubrics stay here. The file state last evaluated is snapshotted in `last-evaluated.md`.

v7 re-home (2026-08-06, install-model redesign): paste-in block → ANCHOR in the consumer agent file + `NDS-IQ.md` at the consumer project root, read on demand. Setups, rules, and MUSTs are re-homed onto that model; cites were re-quoted against the v7 file text on 2026-08-07 (B2.3), and banner-routed scenarios cite banner text by file. Baselines dated before 2026-08-06 measured the pasted-block model; they stay as history, not as comparable numbers.

## S1 prior-work-first-session

- mode: both
- rules: Workflow step 1 prior-NDS bullets; "Build nothing until they approve it"; Upgrading guard; floor cross-ref (sub-floor runtime = upgrade prerequisite)
- provenance: v3 design session 2026-08-03 (prior-NDS triage)
- setup: First session; anchor installed today in the agent file with real paths (`NDS_ROOT` at 1.6.0), `NDS-IQ.md` at the project root; project has 12 pages of `.nds-*` markup; runtime banner 1.3.0; no `NDS-PLAN.md`.
- prompt: "continue building our NDS UI — add a checkout page."
- rubric:
  - MUST: enter step 1; propose the conformance split of the 12 pages against `NDS_ROOT` canon (dev approves; sequencing it after the upgrade approval under the floor's blocked state is equally valid — it must be proposed, never skipped); write or propose the plan with a checkout row; stop for review; name the sub-floor (1.3.0) runtime's upgrade as the PREREQUISITE for NDS-side work per the floor cross-ref, not an optional tracked item.
  - MUST NOT: build checkout first; adopt or rebuild the prior pages silently; upgrade unprompted.
  - cite: "presence grants no authority; conformance decides, the dev approves"
- artifacts (behavior): `NDS-PLAN.md` exists with the five columns and a checkout row, and opens with the `Managed by NDS IQ v7` stamp line; no page file written; no asset copy yet.
- baseline: v3 — fable PASS, opus PASS, sonnet PASS. Scoped 2026-08-03 (v4 greenfield edits): sonnet PASS — the new plan-from-intent bullet did not confuse prior-NDS triage. Scoped 2026-08-05 (v5): sonnet SOFT — procedure right (inventory, plan, stop, no build) but the sub-floor runtime treated as a tracked item, not the prerequisite; the floor lived only in the NDS_ROOT-population paragraph, invisible mid-project. Fixed same day by the floor cross-ref in the stale-runtime sentence; re-probed 2026-08-05: sonnet PASS, both floor sentences quoted, upgrade named "mandatory prerequisite… before anything else NDS-side". Note: it deferred the conformance assessment until after the upgrade approval, reading canon-reads as NDS-side work under the blocked state — a defensible strict reading; the rubric now accepts either sequencing.

## S2 mature-install-new-page

- mode: comprehension
- rules: plan retirement ("with no plan required"); archetype tier; step 4 passes
- provenance: v3 design session 2026-08-03 (plan rescoped to migration scaffolding)
- setup: Mature project; anchor + `NDS-IQ.md` installed for months; every NDS page built under them and verified, including a `Built and Verified` listing-family archetype (a news listing page); no `NDS-PLAN.md` anywhere.
- prompt: "add a services listing page."
- rubric:
  - MUST: build directly with no plan ceremony; archetype first, then cascade (templates → examples → custom); step 4 behavioral + visual passes.
  - MUST NOT: create or resurrect `NDS-PLAN.md`; re-inventory the project.
  - cite: "runs under the rules and step 4's verification with no plan required"
- baseline: v3 — fable PASS, opus PASS, sonnet PASS. Scoped 2026-08-03: sonnet PASS with archetype conditional omitted; setup gained the explicit archetype since, so the rubric now bites deterministically.

## S3 block-refresh-runtime-current

- mode: comprehension
- rules: standalone IQ refresh — fetch raw main `NDS-IQ.md`; whole-file replace of the project-root copy; anchor untouched
- provenance: v3 design session 2026-08-03 (dual refresh paths); v7 re-shaped 2026-08-06 for the file-replace model
- setup: Mature project; runtime banner matches the latest published release.
- prompt: "our NDS instructions feel old — update them."
- rubric:
  - MUST: fetch the raw main `NDS-IQ.md` URL raw (curl or the stack's HTTP client, straight to a file); compare its heading's `instructions v…` against the installed project-root copy; if newer, replace the project-root `NDS-IQ.md` whole; if not newer, report current.
  - MUST NOT: run a template upgrade; hand-merge, reword, or partially patch the file; touch the anchor or its two declarations; use a web-fetch tool.
  - cite: "replace the project root's `NDS-IQ.md` with the download, whole" (Upgrading step 4)
- baseline: v3 — fable PASS, opus PASS, sonnet PASS. Scoped 2026-08-05 (v5 raw-download + anchor-check edits): sonnet PASS — curl over web-fetch named, heading + end-marker verify named.

## S4 block-refresh-runtime-behind

- mode: comprehension
- rules: "Runtime behind the latest release? Propose the full upgrade instead"; upgrade steps 1–4
- provenance: v3 design session 2026-08-03 (refresh guard)
- setup: Same ask as S3, but runtime banner 1.4.0 and latest published release 1.6.0.
- prompt: "update the NDS instructions."
- rubric:
  - MUST: refuse the standalone refresh; propose the full upgrade (the rules file rides the upgrade's own refresh step); wait for the dev's go.
  - MUST NOT: install a raw-main file over the stale runtime; upgrade before the go.
  - cite: "this step delivers the file with it"
- baseline: v3 — fable PASS, opus PASS, sonnet PASS. Scoped 2026-08-04 (v5 setup-paragraph edits): sonnet PASS — the banner-first/floor additions did not bleed into the refresh guard. Scoped 2026-08-05: sonnet PASS. Scoped 2026-08-05 (v6): sonnet PASS — routed through the 1.6.0 floor rather than the plain "runtime behind" guard, which is the stronger read; this setup now trips both, so the scenario tests them jointly.

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
- rules: JS wiring, banner-first — the forms banner owns `initializeContainer`, `syncState`, never `form.reset()`
- provenance: control scenario (rule shipped in v1 block; rig-validated); v7: the facts live in the forms banner, the file carries only the banner-first route
- setup: A page you built; another script AJAX-swaps the registration form's HTML region and sets input values from JS; validation chrome and clear buttons stale.
- prompt: "What exact NDS calls fix this, and what native call must you avoid?"
- rubric:
  - MUST: route via the forms banner (top of `NDS_ROOT/_source/_js/nds-forms.js`); `NDS.Forms.initializeContainer(el)` on the swapped region, then `NDS.Forms.syncState(input)` per written field.
  - MUST NOT: `form.reset()`; own listeners on `.nds-*` elements.
  - cite: "read that component's banner" / forms banner: "Never call form.reset()"
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
- baseline: v3 — fable PASS, opus PASS, sonnet PASS (sonnet did not name the stale-NDS_ROOT nuance; action still correct — not a finding). Scoped 2026-08-03: sonnet PASS. Scoped 2026-08-04 (v5): sonnet PASS. Scoped 2026-08-05 (IQ drift check added): sonnet PASS — both checks run, report-only discipline held.

## S9 re-audit-request

- mode: comprehension
- rules: plan section re-audit sentences ("a dev-requested re-audit... recreates the plan from the current state")
- provenance: drafted during the 2026-08-03 scoped run — the re-audit rule shipped in v3 with no coverage (scoping caught the gap)
- setup: Mature project; anchor + `NDS-IQ.md` installed long ago; all NDS pages built under them across many sessions; no `NDS-PLAN.md` exists.
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
- setup: A stock-scaffolded app (default welcome page still present, runs and serves at localhost); anchor installed with real paths (`NDS_ROOT` at 1.6.0), `NDS-IQ.md` at the project root; `NDS_ASSETS` empty; no `NDS-PLAN.md`.
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
- setup: An empty folder: only an `AGENTS.md` carrying the anchor with real paths and an `NDS-IQ.md` beside it, `NDS_ROOT` extracted beside them. No package.json, no server code, nothing runs or serves.
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
- setup: Anchor installed in `AGENTS.md` yesterday (paths set), `NDS-IQ.md` at the project root, `NDS_ROOT` on disk at 1.6.0; nothing else NDS has ever happened (no bundles in `NDS_ASSETS`, no NDS markup anywhere, no `NDS-PLAN.md`); the app is a working Bootstrap 4 UI, dozens of views.
- prompt: "quick one — add an NDS button style to the Save button on the Edit Profile page, I want to see how NDS looks in our app."
- rubric:
  - MUST: copy `NDS_ROOT/_site/assets/` wholesale into `NDS_ASSETS` first; build ONE parallel spike page (rule #7's naming pattern) carrying the full head unit copied as a unit (paths rewritten) and the canonical button markup; run step 4 verification or emit the checklist.
  - MUST NOT: edit the live legacy view or add `.nds-*` classes onto its button; hand-pick a reduced set of head tags; invent markup; write `NDS-PLAN.md` for a spike (the sentence under test sanctions skipping it).
  - cite: "never a reduced head or NDS markup inside a live legacy page"
- baseline: 2026-08-03 pre-fix — sonnet FAIL (reduced head + in-place legacy edit). Post-fix same day — sonnet PASS, quoting the spike sentence verbatim. Scoped 2026-08-04 (v5 step-4 fallback edit): sonnet PASS (closing verification step unstated under the word cap — not the rule under test, not a finding). Scoped 2026-08-05 (rule #6 globals extension): sonnet PASS.

## S14 server-driven-listing-wiring

- mode: comprehension
- rules: JS wiring, banner-first — the filter, pagination, forms, and core banners carry the composite surface (nested criteria + `whenReady` + the reset action role; `updateRecords` + `nds:pagination:change`; `data-ajax`; `NDS.request`); the file carries only the route
- provenance: 2026-08-03 session probe of composite JS wiring (the underlying rules are rig-born). Pre-fix sonnet hand-wired the clear button per-field + `syncState` on a false "filter re-emits" assumption (source: `syncState` dispatches nothing by design) and UNDEFINED'd the page-click event (the block told only the push side). Fixed by three v4 sentence extensions, each source-verified. v7 (2026-08-06): those per-component sentences leave the file for the source banners — this scenario now proves the banner route delivers the same seven wirings.
- setup: Mature project; chrome and several pages Built and Verified. Services listing with canonical markup: NDS filter (search box inside `.nds-form`, category select, status select), paged list region, pagination nav. Backend GET /api/services (search, category, status, page) returning { items, from, to, total }; ~12,000 records, server-driven.
- prompt: "Wire the listing: fetch from /api/services whenever the filter changes, render the returned rows, keep the pagination numbers correct, and make this 'Clear filters' button reset every filter input from JS. One more thing: pressing Enter in the search box reloads the whole page — stop that. Give me the exact NDS events and calls you'd use, in order."
- rubric:
  - MUST: read the filter and pagination banners first (top of `NDS_ROOT/_source/_js/nds-filter.js` / `nds-pagination.js`); bind via `NDS.Filter.whenReady`; read the nested `event.detail.criteria` shape (`criteria.filters.*`, `criteria.search`); fetch via `NDS.request(url, { json: true })`; `NDS.Pagination.updateRecords(listId, { from, to, count })` after each response (mapping `total` → `count`); wire page clicks off `nds:pagination:change` (`detail.page`); Clear button routed to `data-filter-action="reset"` markup with no hand-wired JS; Enter fix via `data-ajax` on the form.
  - MUST NOT: read filter inputs directly; raw `fetch`; rebuild the nav; add an own `submit` listener; `form.reset()`; per-field clear + `syncState` as the filter-reset mechanism (repaints only, dispatches nothing); `setPage()` as the page-click hook (fires no event).
  - cite: banner-first rule ("read that component's banner"); filter banner: "Resetting is markup, not JS"; pagination banner: "setPage() moves the nav but fires no event"
- baseline: 2026-08-03 pre-fix — sonnet SOFT-FAIL (5.5/7: hand-wired clear on the false re-emit assumption; page event UNDEFINED with a grep plan and a correct name guess). Post-fix same day — sonnet PASS, all seven wired from block text, zero UNDEFINED.

## S15 menu-clipping-in-modal

- mode: comprehension
- rules: banner-first routing — the dropmenu banner owns the portal fact (`data-portal` on the wrapper, knobs stay on the wrapper, never overflow/z-index fixes); the multiselect banner's Rides line points at it
- provenance: 2026-08-03 session probe from the maintainer's own migration experience (portal clipping named the most common silent fail). Pre-fix sonnet followed the block correctly and still committed to rule #5's last-resort scoped override, the exact wrong fix (it did UNDEFINED and would have filed NDS-REPORT — disciplined process, wrong outcome, purely text-led). Mechanism source-verified in `nds-dropmenu.js` (opt-in `data-portal` escapes ancestor stacking contexts, PORTAL_VARS snapshots wrapper knobs); doc coverage was dropmenu.md only — the modal and multiselect pages never mention it, so the components an agent actually touches offer no path to the fix.
- setup: Mature project; the "New Request" page has an NDS modal containing a form with an NDS multiselect in canonical markup; everything verified at build time.
- prompt: "the category dropdown inside the New Request modal gets cut off — when you open it you can only see the first two options, the rest is clipped at the modal's edge. Fix it."
- rubric:
  - MUST: reach the fix through the banner route (the multiselect banner's Rides line names nds-dropmenu; the dropmenu banner's Hooks/Gotchas carry the portal); add `data-portal` to the multiselect's dropmenu wrapper; leave sizing knobs on the wrapper.
  - MUST NOT: overflow or z-index overrides on the modal; a scoped `.nds-*` CSS override as the fix; restructuring the copied markup; inventing a portal mechanism from memory.
  - cite: dropmenu banner: "The fix is data-portal on the wrapper — never overflow or z-index overrides"
- baseline: 2026-08-03 pre-fix — sonnet FAIL (committed to a scoped `.nds-*` override after finding no knob). Post-fix same day — sonnet PASS, one-attribute fix, bullet quoted verbatim.

## S16 modifier-composition

- mode: comprehension
- rules: rule #3's verbatim-copy boundary vs the doc pages' Modifier Classes tables: composing a documented modifier class onto copied base markup
- provenance: 2026-08-03 session probe (toggle-hidden variants question). First-exposure PASS on unmodified text; no fix was needed. Guarded anyway: a future rewording of rule #3's "verbatim" is exactly what would silently break this reading, and the doc system leans on it (toggle-hidden class variants are agent-reachable ONLY via base code tab + reference table composition).
- setup: Mature project; building a services listing page. The cards doc's `lang-html` code blocks all show the standard vertical card; the demo has toggle buttons that add classes at runtime; the page's Modifier Classes table lists `nds-rowView`: "Switches the card to a horizontal row layout (header sits to the side)". No code block shows a horizontal card.
- prompt: "make the service cards horizontal, image beside the text, like the row layout the docs demo shows."
- rubric:
  - MUST: copy the vertical card verbatim from the code block; add `nds-rowView` from the reference table to the card root; change nothing else structurally.
  - MUST NOT: invent or restructure markup for a "horizontal look"; refuse because no code block shows the variant; treat the demo's runtime toggle mechanics as something to replicate.
  - cite: "Copy canonical markup verbatim. Never invent it."
- baseline: 2026-08-03 first exposure — sonnet PASS on unmodified text ("a documented modifier class is not the same as missing/unclear markup").

## S17 banner-first-install

- mode: comprehension
- rules: `NDS_ROOT` declaration (zip's single top-level folder, `NDS_ROOT/_site/` test, "which release: the banner-first rule below"); setup paragraph ("That banner-first rule covers every population of `NDS_ROOT`, first install included"; the `-dev` sentence; "report both versions and propose it")
- provenance: first field report 2026-08-04 (ASP.NET consumer, IQ v4): the installing agent followed the declaration's "latest" literally and installed a 1.6.0 reference over a 1.5.x-dev runtime — mismatch invisible until the dev caught it, and the report's own component findings got mis-attributed to the wrong version. Same report surfaced the zip's nested top-level folder as an undocumented trap. Both fixed in v5.
- setup: First session; the anchor was just added to `AGENTS.md` with `NDS_ROOT` declared at `.nds/nds-vanilla-template/` but nothing exists on disk at that path (gitignored, fresh clone); `NDS-IQ.md` at the project root. `NDS_ASSETS` already holds a full NDS runtime whose banner reads `Version: 1.6.0`. The latest published release on GitHub is 1.7.0 (posited).
- prompt: "get the NDS reference folder set up so we can keep building." Plus: (b) same situation, but the banner reads "1.6.x-dev" — what changes? (c) after extraction, describe the resulting folder layout: what exactly sits at the declared `NDS_ROOT` path?
- rubric:
  - MUST: read the `Version:` banner FIRST; download exactly the banner's release (`releases/download/v1.6.0/…`), never the latest link; report that 1.7.0 exists and propose the upgrade per "Upgrading NDS" as the dev's separate call, without holding up the restore; (b) a `-dev` banner at/above the floor matches no release — report it and let the dev choose, no download; (c) the zip's single top-level `nds-vanilla-template-v<version>/` folder's contents end up so `NDS_ROOT/_site/` resolves directly, no nested version folder under the declared path.
  - MUST NOT: install the latest release as the reference; silently upgrade the runtime; guess a release for the `-dev` banner; leave `NDS_ROOT/_site/` unresolvable behind a nested folder.
  - cite: "That banner-first rule covers every population of `NDS_ROOT`" / "the path is right when `NDS_ROOT/_site/` exists"
- baseline: scoped 2026-08-04 (v5, first exposure) — sonnet PASS on all parts; in the original 3-part run the delta-report compressed out under the word cap and a re-probe of (a) alone surfaced it cleanly ("propose an upgrade as a separate step"). Watch: multi-part word cap can squeeze the delta-report; re-probe (a) alone before calling that a finding. Scoped 2026-08-05 (v6): sonnet PASS on all three parts, delta-report intact this time.

## S18 template-floor-stop

- mode: comprehension
- rules: setup-paragraph floor sentences ("releases before 1.6.0 predate these instructions and ship no `_source/` in the zip"; "below the floor the upgrade is the prerequisite for any NDS work, not an option"); While-blocked bullet
- provenance: maintainer directive 2026-08-04, on top of the first field report's install finding: 1.6.0 is the first release that shipped the block AND `_source/`; a banner-matched pre-1.6.0 reference would leave half the block's references (rule #2, the catalogs, the reference index) resolving nowhere, so the sub-floor branch mandates the upgrade instead of banner-matching.
- setup: Same shape as S17, but the runtime banner reads `Version: 1.5.0` and the latest published release is 1.6.0.
- prompt: "get the NDS reference folder set up so we can keep building." Plus: (b) the dev hasn't responded yet — meanwhile, can you work on anything at all, and on what specifically?
- rubric:
  - MUST: stop at the banner read; report the sub-floor runtime and propose the upgrade per "Upgrading NDS" as the prerequisite, not an option; wait for the dev's approval; (b) step-1 inventory (routes, layouts, partials, legacy libraries, plan table) proceeds, with the plan's NDS Target column reading `blocked on NDS_ROOT`.
  - MUST NOT: download the v1.5.0 zip as the reference; silently install the latest release; run the upgrade unapproved; write guessed NDS targets into the plan.
  - cite: "below the floor the upgrade is the prerequisite for any NDS work, not an option, and until the dev approves it you are blocked exactly as on a placeholder path"
- baseline: scoped 2026-08-04 (v5, first exposure) — sonnet PASS on both parts, floor and blocked-state sentences quoted verbatim.

## S19 verification-channel-hunt

- mode: comprehension
- rules: step 4 fallback ("First check for an automation channel the project already offers"; scripted console + `NDS.Init.audit()` satisfies behavioral; "screenshots you actually look at satisfy the visual one"; checklist only "with no channel at all")
- provenance: first field report 2026-08-04: after a v1.6.0 upgrade the agent handed the dev a verification checklist "since I can't drive a browser" while a documented headless-Edge + puppeteer-core harness sat in the project's own scratch directory; once prompted it verified behaviorally in ~90 seconds. The v5 fallback sentence routes the hunt before the checklist.
- setup: Mature project; the Payments page was just built from canonical markup; its plan row is `In Progress`. No graphical browser is attached to the tool loop. The repo contains a `tools/e2e/` folder with a working puppeteer-core harness the project's own test suite uses (mentioned in the repo README), and the app serves at `http://localhost:5000`.
- prompt: "you built the page — verify it and update the plan."
- rubric:
  - MUST: use the existing harness; behavioral pass = scripted load capturing console (`NDS`-prefixed warnings) plus `NDS.Init.audit()`; visual pass = screenshots at desktop and mobile width that the agent actually reviews; update the plan row per the status rules (`Awaiting Verification` pending the dev, or step-4-verified per pacing).
  - MUST NOT: emit the dev checklist without hunting for channels; report verified from code alone; treat "no graphical browser" as "cannot see the page".
  - cite: "First check for an automation channel the project already offers" / "Only with no channel at all"
- baseline: scoped 2026-08-04 (v5, first exposure) — sonnet PASS: harness used for both passes, checklist explicitly reserved for "no channel at all", row left at `Awaiting Verification`.

## S20 stray-runtime-discovery

- mode: comprehension
- rules: setup-paragraph sweep sentence ("An empty `NDS_ASSETS` alone does not prove a fresh start"); candidates bullet's `NDS_ASSETS` clause; banner-first
- provenance: maintainer design review 2026-08-04, closing the banner-first hole the first field report exposed: banner-first keyed strictly on the declared `NDS_ASSETS` path, so a pre-block install serving NDS from another path read as "no runtime → first setup → latest", recreating the version mismatch through a side door.
- setup: First session; `NDS_ROOT` declared, missing on disk. `NDS_ASSETS` declared at `wwwroot/assets/`, exists but EMPTY. The master layout loads NDS bundles from `wwwroot/lib/nds/`, banner `Version: 1.6.0`. Latest published release is 1.7.0 (posited).
- prompt: "get NDS set up so we can keep building."
- rubric:
  - MUST: sweep and find the stray runtime; its banner (1.6.0) picks the reference release, not the latest link; where the runtime should live (point `NDS_ASSETS` at that folder vs move it wholesale to the declared path) is the dev's call; the pages riding it take step 1's prior-NDS split; the 1.7.0 delta is reported.
  - MUST NOT: conclude first-setup-latest from the empty `NDS_ASSETS`; install 1.7.0 as the reference; pick the assets location itself.
  - cite: "An empty `NDS_ASSETS` alone does not prove a fresh start"
- baseline: scoped 2026-08-05 (v5, first exposure) — sonnet PASS, delta named in the report line.

## S21 legacy-globals

- mode: comprehension
- rules: rule #6's globals list row + paragraph ("Anything not NDS's own is legacy UI, not project canon"; CSS removed never carried; inherited JS = legacy library whose wiring migrates; canon-named old NDS files legacy too)
- provenance: field test 2026-08-04 (maintainer's team, second field incident): the agent kept the master layout's `site.css`/`site.js` as project canon on NDS pages, where they fought the NDS cascade. Rule #6 named only branded libraries, and everything else said "follow the project's conventions", so the project's own globals read as canon. Maintainer directive: default removal for CSS, migrate-as-legacy-library for JS, no exemption for canon-named old NDS files (the runtime is never inherited).
- setup: Porting the Products page; rule #7 parallel files approved. The master layout loads Bootstrap, the team's own `wwwroot/css/site.css` (body font, heading sizes, input tweaks), and `wwwroot/js/site.js` (jQuery handlers: contact form, AJAX search box).
- prompt: "build the NDS layout and the Products page. What from our existing master layout carries over into the NDS layout, and what happens to site.css and site.js?"
- rubric:
  - MUST: the NDS layout loads the head unit's stylesheets only; `site.css` is never carried, and styling the project still needs is rebuilt under rule #5's order; `site.js` is treated as a legacy library, its wiring migrated through the replacement method and the JS-integration APIs; legacy pages keep their files, removal is the dev's call per step 5.
  - MUST NOT: load `site.css`, `site.js`, or Bootstrap on NDS pages; hand-port the jQuery; delete the legacy files.
  - cite: "The CSS is removed from NDS pages, never carried" / "The inherited JS is a legacy library"
- baseline: scoped 2026-08-05 (v5, first exposure) — sonnet PASS, both sentences quoted, capabilities re-wired through NDS form/request APIs.

## S22 inherited-plan-clean-start

- mode: comprehension
- rules: prior-NDS bullet's inherited-plan sentence ("report what state it claims and propose adopt or retire, never a silent resume"); legacy-NDS clean-start footprint sentence; the plan-exists guard
- provenance: field test 2026-08-04 (second field incident, worst-case migration): a half-done prior NDS attempt left its own `NDS-PLAN.md`; the agent resumed its stale rows and preserved the attempt's files even under an explicit clean-start directive. The plan-exists sentence was written for the block's own plans and matched the inherited one literally.
- setup: First session; anchor + `NDS-IQ.md` installed today. The project carries a half-finished NDS migration from months ago (another team, no block): ~8 pages of `.nds-*` markup, an `nds-overrides.css` patching component styles, old NDS bundles at `wwwroot/nds-assets/` (banner 1.5.0), and an `NDS-PLAN.md` from that attempt claiming 6 pages `Built and Verified`.
- prompt: "forget that old migration mess — start clean from scratch with the latest NDS."
- rubric:
  - MUST: report the inherited plan's claims without trusting them; reset the whole footprint (old bundles never adopted, overrides CSS removed, old plan retired and recreated fresh by the inventory); replace the runtime wholesale from `NDS_ROOT`; rebuild the pages via the cascade with the old work as reference only; name the costs.
  - MUST NOT: resume the old plan's rows; adopt the old bundles or overrides as canon; default to parallel files.
  - cite: "The clean start covers the attempt's whole footprint" / "never a silent resume"
- baseline: scoped 2026-08-05 (v5, first exposure) — sonnet PASS, costs named unprompted. Scoped 2026-08-05 (v6, footprint list gained the agent file): sonnet PASS, unchanged behavior.

## S23 image-geometry-swap

- mode: comprehension
- rules: rule #3 content-swap bullet's `width`/`height` sentence ("they carry the sample file's geometry… set them to the new file's real pixel size"); adoption-order brand-slot sentence
- provenance: field test 2026-08-04 (second field incident): the agent swapped the logo `src` but kept the canonical sample's `width="40" height="40"`, forcing the docs logo's 1:1 geometry onto the project's wide wordmark. Rule #3 listed `href`/`alt`/`aria-label` as content-bearing attributes but not image geometry.
- setup: Building chrome step 3. The canonical topbar ships the docs logo as `<img class="nds-brand-logo" … width="40" height="40">`. The project's real logo is `logo.svg`, 300×80 intrinsic pixels, and it already carries the company name.
- prompt: "wire our logo into the topbar."
- rubric:
  - MUST: swap the `src` AND set `width`/`height` to the real file's pixel size (300×80); remove the `nds-brand-name` text span (the wordmark carries the name).
  - MUST NOT: keep the sample's 40×40; keep the name span beside a wordmark logo.
  - cite: "set them to the new file's real pixel size"
- baseline: scoped 2026-08-05 (v5, first exposure) — sonnet PASS, sample geometry rejected by name.

## S24 stale-agent-file-rules

- mode: comprehension
- rules: conflict bullet's prior-NDS-guidance exception ("this block is the only NDS rule source... propose removing them with the plan, the dev's call"); clean-start footprint list ("stale NDS instructions in the agent file")
- provenance: maintainer directive 2026-08-05 (the v6 rule). v5's conflict bullet said only "flag the conflict with the plan; don't silently obey either side", which for a prior attempt's OWN NDS rules leaves competing guidance sitting in the instruction file forever, flagged but never removed, while the block simultaneously claims to be the only NDS rule source. The footprint list named assets, override sheets, scripts, and the plan, but not the agent file. Scenario drafted during the v6 scoped run, which found the rule shipping with no coverage.
- setup: First session; the anchor was installed into `CLAUDE.md` today with real paths (`NDS-IQ.md` at the project root). The SAME `CLAUDE.md` already carried, from a prior NDS attempt by another team months ago: a hand-written "## NDS conventions" section (rules like "always use `.nds-btn-primary` for buttons", "put page-specific CSS in `wwwroot/css/site.css`", "components get initialized in `site.js`"), plus leftover agent notes about that attempt's decisions. The project has ~8 pages of `.nds-*` markup from that attempt and old NDS bundles in `wwwroot/`.
- prompt: "let's get our NDS work back on track — what's the plan?"
- rubric:
  - MUST: inventory the pages and old bundles AND the agent file's own NDS text; propose removing the hand-written section and the leftover notes as the attempt's footprint, the dev's call; assess each page against `NDS_ROOT` canon and propose the adopt/rebuild split rather than presuming either; replace the old bundles wholesale from `NDS_ROOT`; write a fresh `NDS-PLAN.md` and stop for review.
  - MUST NOT: silently keep the hand-written conventions (obeying two NDS rule sources at once); silently strip them without proposing; presume all 8 pages need rebuilding, or that any are conformant, without checking each; adopt the old bundles as the runtime.
  - cite: "this file is the only NDS rule source" / "propose removing them with the plan, the dev's call"
- baseline: scoped 2026-08-05 (v6, first exposure) — sonnet PASS: both the hand-written section and the notes named as footprint, neither silently kept nor silently stripped, split proposed per page.

## S25 banner-first-wiring

- mode: both
- rules: JS-wiring section's banner-first rule — read the banner at the top of `NDS_ROOT/_source/_js/nds-<name>.js` before wiring; Rides semantics (inherited surface lives in the base's banner); grep fallback (`NDS.<Name> = {` / `new CustomEvent('nds:`) only when the template predates banners
- provenance: v7 design 2026-08-06 (Track A banner project). S14/S15's pre-fix failures proved per-component doc knowledge doesn't travel into the wiring moment; banners at the point of copy are the mechanism, and this scenario guards the route to them — including the fallback on pre-1.7.0 templates, where the banner simply is not there.
- setup: Mature project on a 1.7.0 template; a dashboard page needs custom JS that reacts to multiselect selection changes and pre-populates the options at runtime. Plus (b): same ask, but `NDS_ROOT` is a 1.6.0 template — its `_source/_js/*.js` files carry NO banner comment block.
- prompt: "what do you read before writing this wiring, and which exact NDS surface do you use? Then (b): the older template too."
- rubric:
  - MUST: (a) read the banner at the top of `NDS_ROOT/_source/_js/nds-multiselect.js`; wire via `nds:multiselect:change` (detail `{name, values, labels}`) and `instance.populate(options, selected)`; respect Rides — dropmenu-inherited surface (portal, positioning knobs) is read from the dropmenu banner, not re-derived or re-stated; (b) name the grep fallback (`NDS.<Name> = {`, `new CustomEvent('nds:`) against the same source file.
  - MUST NOT: (a) dredge the full source when the banner answers; hand-write listeners or `data-*` guesses without the banner read; (b) treat the missing banner as a blocker, or invent one from memory.
  - cite: "read that component's banner" / "Grep the same file for `NDS.<Name> = {`"
- artifacts (behavior): page JS binds `nds:multiselect:change` by exact name and calls `populate(...)`; no invented `data-*` attributes; no listener on inner `.nds-*` elements the banner doesn't expose.
- baseline: none yet (first exposure lands with the v7 file).

## S26 pasted-block-migration

- mode: comprehension
- rules: the pointer file at the old raw path (v6-compatible migration bridge); the file's Install section v5/v6 migration steps (delete pasted block heading-through-marker, write the anchor keeping the two real path values, fetch `NDS-IQ.md` to the project root)
- provenance: v7 install-model redesign 2026-08-06 — paste-in retired as a Beta-licensed break; the old raw URL serves a v6-shaped bridge block so installed v5/v6 copies self-migrate through their own refresh step. This scenario guards that vehicle end to end.
- setup: Mature project; the agent file still carries a pasted v6 block (heading `## Design system: NDS Vanilla (NDS IQ instructions v6)`, real declarations, end marker). Runtime matches the latest release. The setup HANDS the runner the current content served at the old raw URL (the v7 pointer block) — the runner's rulebook for this scenario is the pasted v6 block it is simulated to carry, so the harness's read of the v7 file stands in for "what the fetched pointer tells you".
- prompt: "our NDS instructions feel old — update them."
- rubric:
  - MUST: follow the installed block's own refresh step to the old raw URL; recognize the fetched v7 pointer as newer; execute its migration in order — fetch `NDS-IQ.md` raw to the project root, replace the pasted block (heading through end marker) in the agent file with the anchor, keep the two real path values, read the installed file before further NDS work.
  - MUST NOT: keep both the pasted block and the anchor/file installed; lose or placeholder the two path values; hand-merge old block text into the new file; use a web-fetch tool for either download.
  - cite: pointer: "Replace this whole block in the agent instruction file — this heading through the end marker — with the anchor" / file: "then delete the pasted block"
- baseline: none yet (first exposure lands with the v7 file).

## S27 read-obedience

- mode: behavior
- rules: the ANCHOR — read trigger ("read `NDS-IQ.md` … before any UI work, once per session"), missing-file stop, and the two hard stops that hold before the read; the file's "How to use this file" section
- provenance: v7 install-model redesign 2026-08-06. Read-skip is THE failure mode of on-demand rules (the pasted block was always in context; the anchor only points). Field evidence: paste-in installs got corrupted/confused, motivating the redesign — this family is its regression guard. 3-model at sweep: weak-model skip is the specific risk.
- setup: Standard behavior-mode setup (anchor in the fixture app's `AGENTS.md`, current file at the fixture root as `NDS-IQ.md`); the runner is never told to read it. Four parts, run as separate agents: (a) fresh session, prompt below; (b) drift — first ask for a README typo fix (non-NDS), then the prompt below in the same session; (c) "quick tweak" framing; (d) same as (a) but the setup DELETES the root `NDS-IQ.md`.
- prompt: (a)/(b) "add a services listing page." (c) "quick one — make the Save button green." (d) "add a services listing page."
- rubric:
  - MUST: (a)(b) read `NDS-IQ.md` before writing any file, then behave per the file (inventory/plan gate for a new page on a fresh fixture — plan stops for review); (c) read the file first even for the small ask, then a knob/token-based change per the file's styling order; (d) stop, report the missing file, ask the dev.
  - MUST NOT: write any page or edit before the read; invent `.nds-*` markup; (c) skip the read because the ask is small, or drop a raw CSS override on `.nds-*`; (d) proceed from memory, reconstruct the rules, or silently re-download the file.
  - cite: anchor: "read `NDS-IQ.md` at this project's root, top to bottom, once per session" / "If the file is missing, stop and ask the dev."
- artifacts (behavior): the read of `NDS-IQ.md` precedes the first file write; any `NDS-PLAN.md` opens with the `Managed by NDS IQ v7` stamp (only producible from the file); (c) the change is a knob/token, not a `.nds-*` override; (d) zero files written or modified.
- baseline: none yet (first exposure lands with the v7 file).
