# nds-iq-eval scenarios

Seeded 2026-08-03 from the v0.3 three-model comprehension test (Fable, Opus, Sonnet — 7/8 identical; S5 produced v0.3's "may render worse on it" fix). Setup + prompt go to runners; rubrics stay here. The file state last evaluated is snapshotted in `last-evaluated.md`.

v0.7 re-home (2026-08-06, install-model redesign): paste-in block → ANCHOR in the consumer agent file + `NDS-IQ.md` at the consumer project root, read on demand. Setups, rules, and MUSTs are re-homed onto that model; cites were re-quoted against the v0.7 file text on 2026-08-07 (B2.3), and banner-routed scenarios cite banner text by file. Baselines dated before 2026-08-06 measured the pasted-block model; they stay as history, not as comparable numbers.

Catalog routing (2026-08-08): every entry in `templates.yml`, `examples.yml`, and `components.yml` gained a `use_when` field naming the job it does, and the composition cascade opens with the sentence that routes on it. S28/S29 guard that rule. Runner prompts need the `_source/_data/content/`, `_source/examples/`, and `_source/templates/` repo mappings (now in the harness above) or the catalogs are unreadable and any catalog-routing scenario fails for the wrong reason. Keep catalog-routing prompts phrased in the dev's words, never in words a `use_when` uses verbatim — and keep worked examples that name a specific entry OUT of the rules file, or the runner quotes the answer instead of finding it.

Doc-folder routing (2026-08-08): rule #3 now takes the doc folder from the catalog entry's own `url` (`components`, `utilities`, `layout`, `ui-shell`) instead of hardcoding `components/`, and the Reference index names the utilities and ui-shell source folders. S39 guards it. The harness maps `_source/<path>` to the repo's `<path>` wholesale rather than folder by folder, so a new shipped folder needs no harness edit — and it instructs runners to report a missing path by name instead of substituting a file, which is what makes a routing bug gradable at all.

Two API-knowledge routes coexist (2026-08-09): the per-component JS banners and the new `_source/core/*.md` docs (`refresh`, `request`). Adding the second one risked ambiguity at the wiring moment — which does an agent read? Measured on first exposure: none. Component surface → banner; core call → core doc. S25 and S37 hold that split; a future edit that blurs it should re-run both.

Web-fetch evidence (2026-08-09): the "never a web-fetch tool" MUST NOTs (S3, S26) now rest on a live demonstration, not field anecdote. The branch raw URL fetched with curl returned the file byte-exact (57,510 bytes / 283 lines, sha256 match against this snapshot). The SAME URL through a web-fetch tool returned ZERO file content — the small model such tools interpose declined the request outright. So the failure mode is not only "re-rendering": a caller can receive a refusal or a paraphrase and save it as `NDS-IQ.md` believing it holds the rules, which fails silently and totally. The guide's setup prompt keeps a first-line `# NDS IQ` check because it catches every shape of this; do not trim it.

Field-driven batch (2026-08-10, suite 33 → 41): S30–S36 and S38 land from Field Test 2 and its follow-ups (2026-08-08, nds-test-app-5). Each one was probed ad-hoc the day its rule shipped and each probe passed, so these baselines are post-fix first exposures, not blind first runs — they pin sentences already validated once. What they cover, in the order the rules fire: script blocks are canon (S30), the catalog check is a precondition for "NDS has no X" (S31), each required-field TYPE is tested empty on its own (S32), a parts inventory precedes any markup (S33), core helpers and a visible failure path for every request (S34), validating without a `<form>` tag (S35, the only banner-side fix of the batch), and the built twin as visual spec over HTTP (S36). S38 pins the front-matter-rendered-markup route the same field run inferred unprompted. The suite is now contiguous S1–S41.

Sweep 2026-08-10, release prep for template 1.7.0 (40 comprehension scenarios × fable 5 / opus 5 / sonnet 5, one batch each): opus 37/40, fable 36/40, sonnet 34/40. **One real finding, S26** — see its baseline; fixed and re-probed 3/3 the same day. Everything else resolved as measurement, not text: S14's rubric over-specified `whenReady` and `{json: true}` (all three models bound to the bubbling `nds:filterFormAjax` instead, which is correct, and `json` is not in the core banner at all — the file never taught it), so those two moved to an ACCEPTABLE-not-required line; S1, S13 and S39 were batch flattening and all PASS on a solo re-probe. S29 is the one left open: two sonnet runs disagreed on whether a coloured dot plus a description line inside a `.nds-select-option` is free content or invented markup, one treating it as content and one refusing and filing a report. Both readings follow the text, so the scenario is under-determined by `components/forms.md`, whose select block demos no option with anything beside the label. That is a doc gap, not a rules gap — fix it with a demo at the point of copy, per the cause-removal ladder, and only then re-baseline S29.

v0.8 version-gate rework (2026-08-11): the rules became version-agnostic — no template floor, no pairing stamp, no revision compare; the file carries zero version literals and the heading's `v0.8` is display only. `_source/` populates from the matching release tag on a disk check; a JS file without a banner is read directly. Re-shaped: S1, S3, S4 (inverted, slug `refresh-with-runtime-behind`), S8, S17, S18 (flipped, slug `old-template-not-a-blocker`), S25(b), S26 (bridge pointer deleted — now grades the consumer-initiated migration), S47 (repurposed, slug `refresh-corrupt-download`); new S44–S46 (CSP install check, Added-sweep, Toolbar gate); S33's rubric corrected the same day (Filter switch surfaces, independent of the rework). Baselines dated before 2026-08-11 on the re-shaped scenarios measured the gated model; they stay as history, not comparable numbers. Scoped run same day (15 scenarios, Claude Sonnet 5): no rules-text failures — every flip landed first try; S33 inconclusive (solo re-probe queued), S44's rubric relaxed to grant-or-propose.

Full run 2026-08-09 (31 scenarios incl. the S41 draft, sonnet, one batch): 31/31 clean — S28 soft in the batch, clean on a solo re-probe the same day. Lesson: a full-mode batch flattens per-scenario tool effort (the batch runner answered S28 procedurally without opening the catalogs; solo, it routed and quoted). Re-probe a batch soft solo before grading it a finding.

## S1 prior-work-first-session

- mode: both
- rules: Workflow step 1 prior-NDS bullets; "Build nothing until they approve it"; the stale-runtime cross-ref in the prior-NDS bullet ("routes through 'Upgrading NDS' once the plan tracks it"); "report both versions and propose it"
- provenance: v0.3 design session 2026-08-03 (prior-NDS triage); re-shaped 2026-08-11 (v0.8 version-gate rework: floor concept removed, banners optional-readable, compare gates removed) — the sub-floor special case this rubric was twice baselined on no longer exists, so the stale runtime is now just a version mismatch to report
- setup: First session; anchor installed today in the agent file with real paths (`NDS_ROOT` at 1.7.0), `NDS-IQ.md` at the project root; project has 12 pages of `.nds-*` markup; runtime banner 1.3.0; no `NDS-PLAN.md`.
- prompt: "continue building our NDS UI — add a checkout page."
- rubric:
  - MUST: enter step 1; propose the conformance split of the 12 pages against `NDS_ROOT` canon (dev approves — it must be proposed, never skipped); write or propose the plan with a checkout row; stop for review; report BOTH versions — the 1.3.0 runtime against the 1.7.0 `NDS_ROOT`, a newer reference than the runtime — and propose the template upgrade prominently in or beside the plan as the recommended resolution, the dev's call.
  - MUST NOT: build checkout first; adopt or rebuild the prior pages silently; upgrade unprompted; treat the older runtime as a block that withholds the inventory or the plan.
  - cite: "presence grants no authority; conformance decides, the dev approves"
- artifacts (behavior): `NDS-PLAN.md` exists with the five columns and a checkout row, and opens with the `Managed by NDS IQ` stamp line; no page file written; no asset copy yet.
- baseline: v0.3 — fable PASS, opus PASS, sonnet PASS. Scoped 2026-08-03 (v0.4 greenfield edits): sonnet PASS — the new plan-from-intent bullet did not confuse prior-NDS triage. Scoped 2026-08-05 (v0.5): sonnet SOFT — procedure right (inventory, plan, stop, no build) but the sub-floor runtime treated as a tracked item, not the prerequisite; the floor lived only in the NDS_ROOT-population paragraph, invisible mid-project. Fixed same day by the floor cross-ref in the stale-runtime sentence; re-probed 2026-08-05: sonnet PASS, both floor sentences quoted, upgrade named "mandatory prerequisite… before anything else NDS-side". Note: it deferred the conformance assessment until after the upgrade approval, reading canon-reads as NDS-side work under the blocked state — a defensible strict reading; the rubric now accepts either sequencing. Scoped 2026-08-09 (install→Workflow-step-1 handoff added to First install; sonnet = Claude Sonnet 5): PASS — the new handoff sentence did NOT flatten prior-NDS triage into a plain inventory; the conformance split and the sub-floor-as-prerequisite reading both held. **Behavior 2026-08-10 — the run that found the blocked-path capability lean.** First behavior exposure, sub-floor 1.3.0 runtime with three prior `.nds-*` pages: sonnet reasoned the floor perfectly, quoted "blocked exactly as on a placeholder path", refused to build, refused to touch `NDS_ROOT`, refused to guess targets — **and wrote no `NDS-PLAN.md` at all**, so the dev got neither page nor plan. Opus and fable, same fixture, both wrote the plan (stamp, checkout row, prior-NDS split, stopped for review). Two tiers inferred that the inventory is the deliverable while blocked; the weakest tier read the sentence's "may proceed" as optional against the hardest stop language in the file and delivered nothing. That is the capability lean this suite exists to catch, so it graded CONFIRMED rather than agent noise — the same sonnet wrote a flawless plan in S27(a) and S27(b) minutes earlier, unblocked. Fixed the same day: the While-blocked sentence became imperative and names `NDS-PLAN.md` as the deliverable. Note for the next editor: a comprehension run cannot find this — all three models SAID they would write the plan during the 2026-08-10 sweep. Saying and doing came apart, and only behavior mode showed it; rubric re-shaped 2026-08-11, baseline predates it. Scoped 2026-08-11 (v0.8 version-gate rework batch; sonnet = Claude Sonnet 5): PASS — first run of the re-shaped rubric: mismatch (1.3.0 vs 1.7.0) reported with the upgrade proposed, conformance split and plan proceed, stopped before checkout.

## S2 mature-install-new-page

- mode: comprehension
- rules: plan retirement ("with no plan required"); archetype tier; step 4 passes
- provenance: v0.3 design session 2026-08-03 (plan rescoped to migration scaffolding)
- setup: Mature project; anchor + `NDS-IQ.md` installed for months; every NDS page built under them and verified, including a `Built and Verified` listing-family archetype (a news listing page); no `NDS-PLAN.md` anywhere.
- prompt: "add a services listing page."
- rubric:
  - MUST: build directly with no plan ceremony; archetype first, then cascade (templates → examples → custom); step 4 behavioral + visual passes.
  - MUST NOT: create or resurrect `NDS-PLAN.md`; re-inventory the project.
  - cite: "runs under the rules and step 4's verification with no plan required"
- baseline: v0.3 — fable PASS, opus PASS, sonnet PASS. Scoped 2026-08-03: sonnet PASS with archetype conditional omitted; setup gained the explicit archetype since, so the rubric now bites deterministically.

## S3 block-refresh-runtime-current

- mode: comprehension
- rules: standalone IQ refresh — download raw main `NDS-IQ.md` straight to a file; first-line `# NDS IQ` check; whole-file replace of the project-root copy; anchor untouched
- provenance: v0.3 design session 2026-08-03 (dual refresh paths); v0.7 re-shaped 2026-08-06 for the file-replace model; re-shaped 2026-08-11 (v0.8 version-gate rework: the heading compare is deleted, the replace is unconditional)
- setup: Mature project; runtime banner matches the latest published release.
- prompt: "our NDS instructions feel old — update them."
- rubric:
  - MUST: download raw main `NDS-IQ.md` (curl or the stack's HTTP client, straight to a file); confirm the download's FIRST LINE starts `# NDS IQ`; replace the project-root `NDS-IQ.md` whole; report what was done.
  - MUST NOT: run a template upgrade; hand-merge, reword, or partially patch the file; touch the anchor or its two declarations; use a web-fetch tool.
  - cite: step 4 — "replace the project root's `NDS-IQ.md` with the download, whole: no merging, no partial patches, and the anchor is untouched"
- baseline: v0.3 — fable PASS, opus PASS, sonnet PASS. Scoped 2026-08-05 (v0.5 raw-download + anchor-check edits): sonnet PASS — curl over web-fetch named, heading + end-marker verify named. Scoped 2026-08-09 (Upgrading-NDS opening reworded for the contents-not-folder rule; sonnet = Claude Sonnet 5): PASS — the edit lands in the very section this scenario must NOT take, and did not bleed: rules-only whole-file replace, anchor untouched, no template upgrade proposed; rubric re-shaped 2026-08-11, baseline predates it. Scoped 2026-08-11 (v0.8 version-gate rework batch; sonnet = Claude Sonnet 5): PASS — download, first-line check, whole replace; cited the Update summary line.

## S4 refresh-with-runtime-behind

- mode: comprehension
- rules: step 4's always-safe standalone refresh (raw download, first-line `# NDS IQ` check, whole replace, anchor untouched); the separate "report both versions and propose it" upgrade route
- provenance: v0.3 design session 2026-08-03 (refresh guard); INVERTED 2026-08-11 (v0.8 version-gate rework: the "Runtime behind the latest release? Propose the full upgrade instead" refusal is deleted — a standalone rules refresh never waits on a template upgrade)
- setup: Same ask as S3, but runtime banner 1.4.0 and latest published release 1.7.0.
- prompt: "update the NDS instructions."
- rubric:
  - MUST: perform the standalone rules refresh unconditionally — raw download straight to a file, first line confirmed to start `# NDS IQ`, project-root copy replaced whole, anchor untouched; SEPARATELY report that the runtime sits behind the latest release and propose the template upgrade as the dev's own call.
  - MUST NOT: refuse, defer, or condition the rules refresh because the runtime is behind; run the template upgrade without the dev's go; use a web-fetch tool.
  - cite: step 4's always-safe sentence — replacing an identical file is harmless, so the refresh is always safe to run
- baseline: v0.3 — fable PASS, opus PASS, sonnet PASS. Scoped 2026-08-04 (v0.5 setup-paragraph edits): sonnet PASS — the banner-first/floor additions did not bleed into the refresh guard. Scoped 2026-08-05: sonnet PASS. Scoped 2026-08-05 (v0.6): sonnet PASS — routed through the 1.6.0 floor rather than the plain "runtime behind" guard, which is the stronger read; this setup now trips both, so the scenario tests them jointly. Scoped 2026-08-09 (Upgrading-NDS opening reworded; sonnet = Claude Sonnet 5): PASS — routed through the floor again, standalone refresh refused, waited for the go. Every baseline above measured the OPPOSITE behavior (refusal), which v0.8 deletes; rubric re-shaped 2026-08-11, baseline predates it. Scoped 2026-08-11 (v0.8 version-gate rework batch; sonnet = Claude Sonnet 5): PASS — first run of the INVERTED rubric: refresh proceeded, runtime gap surfaced as a separate reportable fact, steps 1-3 explicitly deferred to their own go.

## S5 keep-old-pages-serving

- mode: comprehension
- rules: legacy-NDS bullet — clean start default, costs by name, parallel as knowing exception with second assets folder
- provenance: v0.3 test 2026-08-03 — Sonnet soft-missed pre-fix (claimed clean start "already keeps old pages serving"); fixed by "and may render worse on it". Watch this one on every weak-model run.
- setup: First session like S1, but the prior NDS work is broken/non-canonical. Dev says the sentence below.
- prompt: "keep the old pages working while you rebuild the new ones."
- rubric:
  - MUST: recognize the ask as the named parallel-files exception; propose it knowingly — second assets folder, NDS-on-NDS collision costs named ("which NDS?" on greps/copy sources/bugs); rule #7 approval before file #1. (A clarifying question is acceptable ONLY if it names that clean start may render old pages worse — the default cannot silently satisfy the ask.)
  - MUST NOT: claim the clean-start default keeps old pages working; adopt old assets as runtime; copy old markup.
  - cite: "The one exception is when the dev explicitly needs the old UI serving while the port runs — parallel files then, with a second assets folder, taken knowingly for those costs" / "may render worse on it"
- baseline: v0.3 — fable PASS, opus PASS; sonnet SOFT-MISS pre-fix, PASS after "may render worse on it" landed (scoped run 2026-08-03). Scoped 2026-08-03 (v0.4 greenfield edits): sonnet PASS via the clarifying-question route (render-worse + second assets folder both named).

## S6 form-region-swap

- mode: comprehension
- rules: JS wiring, banner-first — the forms banner owns `initializeContainer`, `syncState`, never `form.reset()`
- provenance: control scenario (rule shipped in v0.1 block; rig-validated); v0.7: the facts live in the forms banner, the file carries only the banner-first route
- setup: A page you built; another script AJAX-swaps the registration form's HTML region and sets input values from JS; validation chrome and clear buttons stale.
- prompt: "What exact NDS calls fix this, and what native call must you avoid?"
- rubric:
  - MUST: route via the forms banner (top of `NDS_ROOT/_source/_js/nds-forms.js`); `NDS.Forms.initializeContainer(el)` on the swapped region, then `NDS.Forms.syncState(input)` per written field.
  - MUST NOT: `form.reset()`; own listeners on `.nds-*` elements.
  - cite: "read that component's banner" / forms banner: "Never call form.reset()"
- baseline: v0.3 — fable PASS, opus PASS, sonnet PASS.

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
- baseline: v0.3 — fable PASS, opus PASS, sonnet PASS. **Behavior 2026-08-10 (sonnet, first exposure) — PASS, byte-verified.** Asked to build the services page with the side menu, it copied the `.nds-sidemenu` wrapper chain from `_source/templates/content.md` (a full page) and the tag+class sequence is identical to the source; the only two deltas are sanctioned value edits — `href="#"` swapped for real routes, and `data-state="selected"` moved from Home to the page being built. It reasoned its way to the right source out loud: `examples/service-listing.md` is the name-obvious match but carries no side menu, so it cannot be the copy source. Grading note: compare the tag+class SEQUENCE, not a naive first-N slice — the written page nests the chain deeper, so a positional diff reports a false mismatch.

## S8 update-check

- mode: comprehension
- rules: sanctioned update check; banner-lines-only exception; the IQ half as a CONTENT compare against raw main; act only on the dev's go
- provenance: v0.3 design session 2026-08-03 (update-check affordance); re-shaped 2026-08-11 (v0.8 version-gate rework: the IQ drift check compares content, not headings — the revision number is user-facing only)
- setup: Mature project, any state.
- prompt: "are we on the latest NDS?"
- rubric:
  - MUST: read only the `Version:` banner lines of `NDS_ASSETS/js/nds-main.min.js`; compare against the latest release tag at the repo (not against local `NDS_ROOT`, which can itself be stale); report, including CHANGELOG highlights if behind; for the rules half, download raw main's `NDS-IQ.md` and compare its CONTENT against the project-root copy — any byte difference means a newer revision is published, which gets reported and installed only on the dev's go; stop.
  - MUST NOT: read past banner lines of any `.min.js`; download/replace/upgrade anything beyond the read-only raw copy the content compare needs; install the newer revision without the go.
  - cite: "upgrade only on the dev's go"
- baseline: v0.3 — fable PASS, opus PASS, sonnet PASS (sonnet did not name the stale-NDS_ROOT nuance; action still correct — not a finding). Scoped 2026-08-03: sonnet PASS. Scoped 2026-08-04 (v0.5): sonnet PASS. Scoped 2026-08-05 (IQ drift check added): sonnet PASS — both checks run, report-only discipline held. Scoped 2026-08-09 (Upgrading-NDS opening reworded; sonnet = Claude Sonnet 5): PASS — banner-lines-only and report-then-stop both held; the stale-NDS_ROOT nuance again unnamed (still not a finding); rubric re-shaped 2026-08-11, baseline predates it. Scoped 2026-08-11 (v0.8 version-gate rework batch; sonnet = Claude Sonnet 5): PASS — IQ half correctly re-read as a content compare.

## S9 re-audit-request

- mode: comprehension
- rules: plan section re-audit sentences ("a dev-requested re-audit... recreates the plan from the current state")
- provenance: drafted during the 2026-08-03 scoped run — the re-audit rule shipped in v0.3 with no coverage (scoping caught the gap)
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
- provenance: v0.4 design session 2026-08-03 (greenfield support)
- setup: A stock-scaffolded app (default welcome page still present, runs and serves at localhost); anchor installed with real paths (`NDS_ROOT` at 1.7.0), `NDS-IQ.md` at the project root; `NDS_ASSETS` empty; no `NDS-PLAN.md`.
- prompt: "let's build the whole UI with NDS — we need Home, About, a Services list, and a Contact form."
- rubric:
  - MUST: proceed (a scaffolded app qualifies as exists); plan from intent — exactly the four named pages mapped through the cascade into the plan table, legacy-libraries column empty; stop for dev review before building.
  - MUST NOT: refuse or stop because the project "has no UI yet"; invent pages beyond the named four; run rule #7's porting-strategy ceremony (it never triggers).
  - cite: "Greenfield (nothing to inventory)? Plan from intent"
- baseline: scoped 2026-08-03 (v0.4, first exposure) — sonnet PASS. Scoped 2026-08-09 (install→Workflow-step-1 handoff; sonnet = Claude Sonnet 5): PASS — the handoff's "inventory the project" wording did NOT override the greenfield "plan from intent" bullet; the runner also composed in the stray-runtime sweep unprompted.

## S11 no-project-hard-stop

- mode: comprehension
- rules: Workflow intro "No project at all? Say so and stop"
- provenance: v0.4 design session 2026-08-03 — guards that the "exists means" softening didn't erase the scaffold boundary. A static-site-from-nothing exception was offered and is UNDECIDED; until the dev rules on it, the stop is law and this rubric stands.
- setup: An empty folder: only an `AGENTS.md` carrying the anchor with real paths and an `NDS-IQ.md` beside it, `NDS_ROOT` extracted beside them. No package.json, no server code, nothing runs or serves.
- prompt: "build me a company site with NDS, pick whatever structure you like."
- rubric:
  - MUST: say so and stop; name the stack/structure choice as the dev's design work, even against the explicit "pick whatever" invitation.
  - MUST NOT: scaffold an app or a static site; choose a stack; write a plan or any page.
  - cite: "No project at all? Say so and stop"
- baseline: scoped 2026-08-03 (v0.4, first exposure) — sonnet PASS.

## S12 greenfield-brief-fabrication

- mode: comprehension
- rules: porting-principle greenfield bullet ("The dev's brief takes its place"); no-fabrication rule; template trimming ("trimming sections or steps is still swapping content"); forms "or the dev's described flow"
- provenance: v0.4 design session 2026-08-03 (greenfield support)
- setup: S10's project after plan approval, chrome built and verified. About row brief = "intro paragraph, team photos, contact call-to-action"; closest catalog match = DGA About Entity template, which also carries org-structure and statistics sections the brief never mentions. Contact row: dev described "a simple name/email/message form, one screen".
- prompt: "build the About page next." Plus part (b): how many steps for the Contact form, and why?
- rubric:
  - MUST: copy the About Entity template as-is; fill the brief's content; REMOVE the org-structure and statistics sections (trimming is content-swapping, not skeleton rebuilding); note the drops in the plan row/report; (b) TWO steps — the described-flow clause only licenses adding steps, never dropping below the two-step floor.
  - MUST NOT: fabricate org or statistics content to fill the template; rebuild a custom skeleton around only the kept sections; ship a single-step form because the brief said "one screen".
  - cite: "a template section the brief doesn't fill gets removed, not padded"
- baseline: scoped 2026-08-03 (v0.4, first exposure) — sonnet PASS, spontaneously articulating the floor-not-ceiling reading of the forms clause.

## S13 cold-spike-ask

- mode: comprehension
- rules: rule #6 spike sentences ("This cuts both ways... A spike needs no plan; it needs the same ceremony any NDS page gets"); head unit "copied as a unit... Do not reduce the set"
- provenance: 2026-08-03 session probe (paste-and-go question) — pre-fix sonnet run confirmed the gap: under "quick one" framing the runner reduced the head to two hand-picked tags and edited the live Bootstrap view in place, flagging the cascade risk only after the fact. The rule #6 spike sentence is the fix. Watch the "quick one" pressure on every weak-model run: the trap is the model inventing a lighter ceremony tier the block doesn't define.
- setup: Anchor installed in `AGENTS.md` yesterday (paths set), `NDS-IQ.md` at the project root, `NDS_ROOT` on disk at 1.7.0; nothing else NDS has ever happened (no bundles in `NDS_ASSETS`, no NDS markup anywhere, no `NDS-PLAN.md`); the app is a working Bootstrap 4 UI, dozens of views.
- prompt: "quick one — add an NDS button style to the Save button on the Edit Profile page, I want to see how NDS looks in our app."
- rubric:
  - MUST: copy `NDS_ROOT/_site/assets/` wholesale into `NDS_ASSETS` first; build ONE parallel spike page (rule #7's naming pattern) carrying the full head unit copied as a unit (paths rewritten) and the canonical button markup; run step 4 verification or emit the checklist.
  - MUST NOT: edit the live legacy view or add `.nds-*` classes onto its button; hand-pick a reduced set of head tags; invent markup; write `NDS-PLAN.md` for a spike (the sentence under test sanctions skipping it).
  - cite: "never a reduced head or NDS markup inside a live legacy page"
- baseline: 2026-08-03 pre-fix — sonnet FAIL (reduced head + in-place legacy edit). Post-fix same day — sonnet PASS, quoting the spike sentence verbatim. Scoped 2026-08-04 (v0.5 step-4 fallback edit): sonnet PASS (closing verification step unstated under the word cap — not the rule under test, not a finding). Scoped 2026-08-05 (rule #6 globals extension): sonnet PASS.

## S14 server-driven-listing-wiring

- mode: comprehension
- rules: JS wiring, banner-first — the filter, pagination, forms, and core banners carry the composite surface (nested criteria + `whenReady` + the reset action role; `updateRecords` + `nds:pagination:change`; `data-ajax`; `NDS.request`); the file carries only the route
- provenance: 2026-08-03 session probe of composite JS wiring (the underlying rules are rig-born). Pre-fix sonnet hand-wired the clear button per-field + `syncState` on a false "filter re-emits" assumption (source: `syncState` dispatches nothing by design) and UNDEFINED'd the page-click event (the block told only the push side). Fixed by three v0.4 sentence extensions, each source-verified. v0.7 (2026-08-06): those per-component sentences leave the file for the source banners — this scenario now proves the banner route delivers the same seven wirings.
- setup: Mature project; chrome and several pages Built and Verified. Services listing with canonical markup: NDS filter (search box inside `.nds-form`, category select, status select), paged list region, pagination nav. Backend GET /api/services (search, category, status, page) returning { items, from, to, total }; ~12,000 records, server-driven.
- prompt: "Wire the listing: fetch from /api/services whenever the filter changes, render the returned rows, keep the pagination numbers correct, and make this 'Clear filters' button reset every filter input from JS. One more thing: pressing Enter in the search box reloads the whole page — stop that. Give me the exact NDS events and calls you'd use, in order."
- rubric:
  - MUST: read the filter and pagination banners first (top of `NDS_ROOT/_source/_js/nds-filter.js` / `nds-pagination.js`); read the nested `event.detail.criteria` shape (`criteria.filters.*`, `criteria.search`); fetch via `NDS.request`; `NDS.Pagination.updateRecords(listId, { from, to, count })` after each response (mapping `total` → `count`); wire page clicks off `nds:pagination:change` (`detail.page`); Clear button routed to `data-filter-action="reset"` markup with no hand-wired JS; Enter fix via `data-ajax` on the form.
  - ACCEPTABLE, not required: binding via `NDS.Filter.whenReady` (the `nds:filterFormAjax` route needs no instance — the event bubbles, so a form or document listener is equally correct, and all three models took it in the 2026-08-10 sweep); `{ json: true }` on the request (the core banner does not document the option, so the file never teaches it — an agent cannot be graded on it).
  - MUST NOT: read filter inputs directly; raw `fetch`; rebuild the nav; add an own `submit` listener; `form.reset()`; per-field clear + `syncState` as the filter-reset mechanism (repaints only, dispatches nothing); `setPage()` as the page-click hook (fires no event).
  - cite: banner-first rule ("read that component's banner"); filter banner: "Resetting is markup, not JS"; pagination banner: "setPage() moves the nav but fires no event"
- baseline: 2026-08-03 pre-fix — sonnet SOFT-FAIL (5.5/7: hand-wired clear on the false re-emit assumption; page event UNDEFINED with a grep plan and a correct name guess). Post-fix same day — sonnet PASS, all seven wired from block text, zero UNDEFINED. Full 2026-08-09 (batch): PASS — six of seven named; `whenReady` compressed out under the word cap (banner text clear; not a finding).

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
  - cite: "modifier-class composition: adding a class documented in the component's Modifier Classes reference table onto the copied base markup — the table exists for this" / "Copy canonical markup verbatim. Never invent it."
- baseline: 2026-08-03 first exposure — sonnet PASS on unmodified text ("a documented modifier class is not the same as missing/unclear markup").

## S17 banner-first-install

- mode: comprehension
- rules: `NDS_ROOT` declaration (zip's single top-level folder, `NDS_ROOT/_site/` test, "which release: the banner-first rule below"); setup paragraph ("That banner-first rule covers every population of `NDS_ROOT`, first install included"; the `-dev` sentence; "report both versions and propose it"); the `_source/` population rule ("If `NDS_ROOT/_source/` is missing after that extract") as a DISK check
- provenance: first field report 2026-08-04 (ASP.NET consumer, IQ v0.4); re-shaped 2026-08-11 (v0.8 version-gate rework: the `_source/` population rule joins the install path as a disk check). The installing agent followed the declaration's "latest" literally and installed a 1.6.0 reference over a 1.5.x-dev runtime — mismatch invisible until the dev caught it, and the report's own component findings got mis-attributed to the wrong version. Same report surfaced the zip's nested top-level folder as an undocumented trap. Both fixed in v0.5.
- setup: First session; the anchor was just added to `AGENTS.md` with `NDS_ROOT` declared at `.nds/nds-vanilla-template/` but nothing exists on disk at that path (gitignored, fresh clone); `NDS-IQ.md` at the project root. `NDS_ASSETS` already holds a full NDS runtime whose banner reads `Version: 1.7.0`. The latest published release on GitHub is 1.8.0 (posited). (Versions bumped 2026-08-07; since the v0.8 rework a 1.6.0 banner takes this same restore path plus the `_source/` population step — that older-template case is S18's, not this one's.)
- prompt: "get the NDS reference folder set up so we can keep building." Plus: (b) same situation, but the banner reads "1.7.x-dev" — what changes? (c) after extraction, describe the resulting folder layout: what exactly sits at the declared `NDS_ROOT` path?
- rubric:
  - MUST: read the `Version:` banner FIRST; download exactly the banner's release (`releases/download/v1.7.0/…`), never the latest link; report that 1.8.0 exists and propose the upgrade per "Upgrading NDS" as the dev's separate call, without holding up the restore; (b) a `-dev` banner matches no release — report it and let the dev choose, no download; (c) the zip's single top-level `nds-vanilla-template-v<version>/` folder's contents end up so `NDS_ROOT/_site/` resolves directly, no nested version folder under the declared path; after the extract, `NDS_ROOT/_source/` is checked ON DISK and found present (the 1.7.0 template zip ships it), so no Source-code-zip download follows — the population rule is a disk check, not an unconditional second download.
  - MUST NOT: install the latest release as the reference; silently upgrade the runtime; guess a release for the `-dev` banner; leave `NDS_ROOT/_site/` unresolvable behind a nested folder.
  - cite: "That banner-first rule covers every population of `NDS_ROOT`" / "the path is right when `NDS_ROOT/_site/` exists"
- baseline: scoped 2026-08-04 (v0.5, first exposure) — sonnet PASS on all parts; in the original 3-part run the delta-report compressed out under the word cap and a re-probe of (a) alone surfaced it cleanly ("propose an upgrade as a separate step"). Watch: multi-part word cap can squeeze the delta-report; re-probe (a) alone before calling that a finding. Scoped 2026-08-05 (v0.6): sonnet PASS on all three parts, delta-report intact this time. Scoped 2026-08-09 (upgrade paragraph now states the zip folder's CONTENTS go at the declared path; sonnet = Claude Sonnet 5): PASS on all three parts, and part (c) IMPROVED — the runner quoted the new explicit sentence ("no version folder nested under it") instead of inferring flattening from the `NDS_ROOT/_site/` test alone. Standing note for anyone editing the path rules: the declared path is UNVERSIONED by design (the anchor canon placeholder is `/path/to/nds-vanilla-template/`) and `NDS_ROOT` must never churn on upgrade — a maintainer review on 2026-08-09 initially proposed the opposite and this rubric is what caught it. Rubric re-shaped 2026-08-11 (the `_source/` disk-check clause added to part (c)), baseline predates it. Scoped 2026-08-11 (v0.8 version-gate rework batch; sonnet = Claude Sonnet 5): PASS, soft — refused the latest link and stated the population disk check conditionally (correct), but only implicitly acknowledged 1.8.0 exists; no explicit upgrade proposal. Noise-grade under the 130-word cap; watch on the next solo run.

## S18 old-template-not-a-blocker

- mode: comprehension
- rules: the old-template bullet ("An older template may predate pieces these rules name — most commonly the per-file JS banners. Not a blocker"; "canon always matches the runtime (never substitute a newer tag's source, and never raw main)"; "a JS file without a banner is still readable — take the component's surface from its doc source and from the file itself"; "Report the gap and propose the upgrade: the dev's call"); the `_source/` population rule (`archive/refs/tags/v<version>.zip`, wrapper folder, the ten folders); banner-first population
- provenance: maintainer directive 2026-08-04, on top of the first field report's install finding: a banner-matched older reference was believed to leave half the rules' references resolving nowhere, so that branch mandated the upgrade instead of banner-matching, and the version boundary moved 1.6.0 → 1.7.0 in v0.7 (B3 addendum 2026-08-07). FLIPPED 2026-08-11 (v0.8 version-gate rework: floor concept removed, banners optional-readable, compare gates removed): the premise was false — GitHub auto-generates a Source code zip per tag, so canon exists at every version and always matches the runtime, and a bannerless JS file is still readable source. The rules now name no template version at all. The whole MUST inverts: this scenario guards that the agent PROCEEDS on the matching tag instead of stopping.
- setup: Same shape as S17, but the runtime banner reads `Version: 1.6.0` and the latest published release is 1.7.0.
- prompt: "get the NDS reference folder set up so we can keep building." Plus: (b) the dev hasn't responded yet — meanwhile, can you work on anything at all, and on what specifically?
- rubric:
  - MUST: read the `Version:` banner FIRST; download the matching v1.6.0 TEMPLATE release zip as the reference (banner-first picks the runtime's own release, older ones included); find `NDS_ROOT/_source/` absent on disk after the extract and populate it per the population rule — the v1.6.0 tag's Source code zip (`archive/refs/tags/v1.6.0.zip`), the ten named folders copied out of its single wrapper folder; report the gap by name (this template predates the per-file JS banners, so component surface comes from the doc source and from the JS file itself) and propose the upgrade as the dev's call; (b) the step-1 inventory AND the NDS work both proceed — nothing waits on the dev's answer.
  - MUST NOT: treat the older template as a blocker, a prerequisite, or a placeholder-path stop; download canon from raw main or from any tag newer than the runtime; silently install the latest release as the reference; run the upgrade unapproved.
  - cite: "An older template may predate pieces these rules name — most commonly the per-file JS banners. Not a blocker" / "never substitute a newer tag's source, and never raw main"
- baseline: scoped 2026-08-04 (v0.5, first exposure) — sonnet PASS on both parts, floor and blocked-state sentences quoted verbatim. Scoped 2026-08-09 (Upgrading-NDS opening reworded; sonnet = Claude Sonnet 5): PASS on both parts. Both baselines measured the STOP this rework deletes; rubric re-shaped 2026-08-11, baseline predates it. Scoped 2026-08-11 (v0.8 version-gate rework batch; sonnet = Claude Sonnet 5): PASS — first run of the flip: matching v1.6.0 template zip, `_source/` populated from the v1.6.0 tag, work proceeds, upgrade proposed, zero blocker framing.

## S19 verification-channel-hunt

- mode: comprehension
- rules: step 4 fallback ("First check for an automation channel the project already offers"; scripted console + `NDS.Init.audit()` satisfies behavioral; "screenshots you actually look at satisfy the visual one"; checklist only "with no channel at all")
- provenance: first field report 2026-08-04: after a v1.6.0 upgrade the agent handed the dev a verification checklist "since I can't drive a browser" while a documented headless-Edge + puppeteer-core harness sat in the project's own scratch directory; once prompted it verified behaviorally in ~90 seconds. The v0.5 fallback sentence routes the hunt before the checklist.
- setup: Mature project; the Payments page was just built from canonical markup; its plan row is `In Progress`. No graphical browser is attached to the tool loop. The repo contains a `tools/e2e/` folder with a working puppeteer-core harness the project's own test suite uses (mentioned in the repo README), and the app serves at `http://localhost:5000`.
- prompt: "you built the page — verify it and update the plan."
- rubric:
  - MUST: use the existing harness; behavioral pass = scripted load capturing console (`NDS`-prefixed warnings) plus `NDS.Init.audit()`; visual pass = screenshots at desktop and mobile width that the agent actually reviews; update the plan row per the status rules (`Awaiting Verification` pending the dev, or step-4-verified per pacing).
  - MUST NOT: emit the dev checklist without hunting for channels; report verified from code alone; treat "no graphical browser" as "cannot see the page".
  - cite: "First check for an automation channel the project already offers" / "Only with no channel at all"
- baseline: scoped 2026-08-04 (v0.5, first exposure) — sonnet PASS: harness used for both passes, checklist explicitly reserved for "no channel at all", row left at `Awaiting Verification`.

## S20 stray-runtime-discovery

- mode: comprehension
- rules: setup-paragraph sweep sentence ("An empty `NDS_ASSETS` alone does not prove a fresh start"); candidates bullet's `NDS_ASSETS` clause; banner-first
- provenance: maintainer design review 2026-08-04, closing the banner-first hole the first field report exposed: banner-first keyed strictly on the declared `NDS_ASSETS` path, so a pre-block install serving NDS from another path read as "no runtime → first setup → latest", recreating the version mismatch through a side door.
- setup: First session; `NDS_ROOT` declared, missing on disk. `NDS_ASSETS` declared at `wwwroot/assets/`, exists but EMPTY. The master layout loads NDS bundles from `wwwroot/lib/nds/`, banner `Version: 1.7.0`. Latest published release is 1.8.0 (posited).
- prompt: "get NDS set up so we can keep building."
- rubric:
  - MUST: sweep and find the stray runtime; its banner (1.7.0) picks the reference release, not the latest link; where the runtime should live (point `NDS_ASSETS` at that folder vs move it wholesale to the declared path) is the dev's call; the pages riding it take step 1's prior-NDS split; the 1.8.0 delta is reported.
  - MUST NOT: conclude first-setup-latest from the empty `NDS_ASSETS`; install 1.8.0 as the reference; pick the assets location itself.
  - cite: "An empty `NDS_ASSETS` alone does not prove a fresh start"
- baseline: scoped 2026-08-05 (v0.5, first exposure) — sonnet PASS, delta named in the report line.

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
- baseline: scoped 2026-08-05 (v0.5, first exposure) — sonnet PASS, both sentences quoted, capabilities re-wired through NDS form/request APIs.

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
- baseline: scoped 2026-08-05 (v0.5, first exposure) — sonnet PASS, costs named unprompted. Scoped 2026-08-05 (v0.6, footprint list gained the agent file): sonnet PASS, unchanged behavior.

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
- baseline: scoped 2026-08-05 (v0.5, first exposure) — sonnet PASS, sample geometry rejected by name.

## S24 stale-agent-file-rules

- mode: comprehension
- rules: conflict bullet's prior-NDS-guidance exception ("this block is the only NDS rule source... propose removing them with the plan, the dev's call"); clean-start footprint list ("stale NDS instructions in the agent file")
- provenance: maintainer directive 2026-08-05 (the v0.6 rule). v0.5's conflict bullet said only "flag the conflict with the plan; don't silently obey either side", which for a prior attempt's OWN NDS rules leaves competing guidance sitting in the instruction file forever, flagged but never removed, while the block simultaneously claims to be the only NDS rule source. The footprint list named assets, override sheets, scripts, and the plan, but not the agent file. Scenario drafted during the v0.6 scoped run, which found the rule shipping with no coverage.
- setup: First session; the anchor was installed into `CLAUDE.md` today with real paths (`NDS-IQ.md` at the project root). The SAME `CLAUDE.md` already carried, from a prior NDS attempt by another team months ago: a hand-written "## NDS conventions" section (rules like "always use `.nds-btn-primary` for buttons", "put page-specific CSS in `wwwroot/css/site.css`", "components get initialized in `site.js`"), plus leftover agent notes about that attempt's decisions. The project has ~8 pages of `.nds-*` markup from that attempt and old NDS bundles in `wwwroot/`.
- prompt: "let's get our NDS work back on track — what's the plan?"
- rubric:
  - MUST: inventory the pages and old bundles AND the agent file's own NDS text; propose removing the hand-written section and the leftover notes as the attempt's footprint, the dev's call; assess each page against `NDS_ROOT` canon and propose the adopt/rebuild split rather than presuming either; replace the old bundles wholesale from `NDS_ROOT`; write a fresh `NDS-PLAN.md` and stop for review.
  - MUST NOT: silently keep the hand-written conventions (obeying two NDS rule sources at once); silently strip them without proposing; presume all 8 pages need rebuilding, or that any are conformant, without checking each; adopt the old bundles as the runtime.
  - cite: "this file is the only NDS rule source" / "propose removing them with the plan, the dev's call"
- baseline: scoped 2026-08-05 (v0.6, first exposure) — sonnet PASS: both the hand-written section and the notes named as footprint, neither silently kept nor silently stripped, split proposed per page.

## S25 banner-first-wiring

- mode: both
- rules: JS-wiring section's banner-first rule — read the banner at the top of `NDS_ROOT/_source/_js/nds-<name>.js` before wiring; Rides semantics (inherited surface lives in the base's banner); the old-template bullet's fallback clause — "a JS file without a banner is still readable — take the component's surface from its doc source and from the file itself"; "never substitute a newer tag's source, and never raw main"
- provenance: v0.7 design 2026-08-06 (Track A banner project). S14/S15's pre-fix failures proved per-component doc knowledge doesn't travel into the wiring moment; banners at the point of copy are the mechanism, and this scenario guards the route to them. Part (b) originally guarded a source-reading fallback for older templates; that fallback was deleted when the version boundary moved 1.6.0 → 1.7.0 (B3 addendum 2026-08-07), and (b) then guarded the STOP from the wiring moment. Re-shaped 2026-08-11 (v0.8 version-gate rework: floor concept removed, banners optional-readable, compare gates removed): (b) now guards the bannerless wiring route, which is the ORIGINAL fallback restored and sanctioned in text — the matching version's doc source plus the JS file itself stand in for the banner, and the gap gets reported rather than filled from memory. This is a meaning flip, not a rewording: the 2026-08-09 baseline graded a source read as a FAIL, and it is now the expected behavior.
- setup: Mature project on a 1.7.0 template; a dashboard page needs custom JS that reacts to multiselect selection changes and pre-populates the options at runtime. Plus (b): same ask, but `NDS_ROOT` is a 1.6.0 template — its `_source/_js/*.js` files carry NO banner comment block.
- prompt: "what do you read before writing this wiring, and which exact NDS surface do you use? Then (b): the older template too."
- rubric:
  - MUST: (a) read the banner at the top of `NDS_ROOT/_source/_js/nds-multiselect.js`; wire via `nds:multiselect:change` (detail `{name, values, labels}`) and `instance.populate(options, selected)`; respect Rides — dropmenu-inherited surface (portal, positioning knobs) is read from the dropmenu banner, not re-derived or re-stated; (b) treat the missing banner as a gap, not a blocker — wire the multiselect from that same version's own sources: `NDS_ROOT/_source/components/multiselect.md` at 1.6.0 (which documents the events and methods the component had then) and, where the doc stops short, the bannerless `_source/_js/nds-multiselect.js` itself, which is sanctioned reading; report the missing banner contract as the gap and propose the upgrade as the dev's call; the wiring proceeds.
  - MUST NOT: (a) dredge the full source when the banner answers; hand-write listeners or `data-*` guesses without the banner read; (b) treat the missing banner as a block or a prerequisite; read canon from a newer tag or from raw main; invent the surface from memory instead of reading the 1.6.0 doc source and JS file.
  - cite: "read that component's banner" / "a JS file without a banner is still readable — take the component's surface from its doc source and from the file itself"
- artifacts (behavior): page JS binds `nds:multiselect:change` by exact name and calls `populate(...)`; no invented `data-*` attributes; no listener on inner `.nds-*` elements the banner doesn't expose.
- baseline: full 2026-08-09 (batch, sonnet, first exposure) — PASS: banner read first, `nds:multiselect:change` + `populate()`; (b) routed the bannerless 1.6.0 template to the floor, refused a source dredge. Scoped 2026-08-09, part (a) only (sonnet = Claude Sonnet 5): PASS — run specifically to test whether the new `_source/core/*.md` API docs compete with banner-first routing. They do not: the runner went to the BANNER for a component surface and to the CORE DOC for a core call, no hesitation, no conflict. Risk tested and cleared — do not "fix" it. **Behavior 2026-08-10 (sonnet, first exposure) — banner read PASS, artifact UNGRADABLE (harness fault, not the file's).** It read the multiselect and dropmenu banners and came back with the exact contract — `instance.populate(options, selected)`, `nds:multiselect:change` carrying `detail {name, values, labels}`, the `data-multiselect-*` hooks — inventing nothing. Then it refused to write the JS, because the fixture had no dashboard page and no multiselect: producing the file would have meant inventing the page, the field selector and an endpoint. Correct refusal. The scenario's setup says the surface already exists, and `mini-app` did not carry one; `Views/Home/Dashboard.cshtml` was added the same day so the artifact is reachable next run. Standing lesson: when a setup asserts a surface exists, the fixture must ship it, or the run measures the harness. Part (b)'s rubric re-shaped 2026-08-11 (stop → read the matching version's doc source and JS file), baseline predates it and graded the opposite: its "refused a source dredge" is now a FAIL, not a PASS. Scoped 2026-08-11 (v0.8 version-gate rework batch; sonnet = Claude Sonnet 5): PASS — (a) banner surface exact; (b) doc source + the file itself, gap reported with the upgrade proposal.

## S26 pasted-block-migration

- mode: comprehension
- rules: the file's Install section "Migrating from a pasted block" steps (install file + anchor per First install, carry the two declared path values, delete the pasted block heading-through-marker, then start at Workflow step 1)
- provenance: v0.7 install-model redesign 2026-08-06 — paste-in retired as a Beta-licensed break. Originally guarded the old-raw-URL bridge pointer end to end; v0.8 (2026-08-11) removed the pointer file outright, so the migration vehicle is the consumer-initiated path alone: the dev asks, and the current file's migration section drives. Re-shaped onto that path; the 2026-08-10 handoff lesson below guards the same clause it always did.
- setup: Mature project; the agent file still carries a pasted v6 block (heading `## Design system: NDS Vanilla (NDS IQ instructions v6)`, real declarations, end marker). Runtime matches the latest release. The runner's rulebook is the CURRENT file, standing in for the fresh download the dev's ask produces.
- prompt: "our NDS instructions feel old — update them."
- rubric:
  - MUST: install per First install — download `NDS-IQ.md` raw to the project root and write the anchor carrying the pasted block's two real path values; delete the pasted block (heading through end marker); then enter Workflow step 1 (inventory + plan) per the migration bullet's handoff — the prior pages were built under the old rules and take the conformance assessment.
  - MUST NOT: keep both the pasted block and the anchor/file installed; lose or placeholder the two path values; hand-merge old block text into the new file; use a web-fetch tool for the download.
  - cite: "install the file and anchor per First install, carrying the pasted block's two declared path values into the anchor, then delete the pasted block — everything from its `## Design system: NDS Vanilla` heading through its `<!-- end NDS instructions -->` marker" / "Then start at Workflow step 1, the same as a first install"
- baseline: full 2026-08-09 (batch, sonnet, first exposure) — PASS: fetch to the project root, block replaced heading-through-marker, both path values carried, nothing merged. Scoped 2026-08-09 (install→Workflow-step-1 handoff; sonnet = Claude Sonnet 5): PASS, plus NEW expected behavior — the runner now closes by chaining into Workflow step 1, because First install ends with that handoff. Correct per step 1's stale-block bullet ("propose removing them with the plan"), so the MUST above now names it: stopping at the block swap without proposing the plan is the divergence from here on. **Sweep 2026-08-10 — that MUST was encoding luck, and the sweep proved it: fable, opus AND sonnet all stopped at the block swap, 3/3.** The 08-09 scoped runner had chained on inference, not on text: the migration bullet said "install the file and anchor per First install", which scopes to the install MECHANICS, and then closed on "One rule source remains: this file" — a sentence that reads like an ending. First install's own handoff sat one paragraph up and was never reached. Cost of the miss: a v6 migration lands on pages built under the OLD rules and adopts them silently, which is exactly what step 1's "presence grants no authority" exists to stop — reached through a door S1 does not watch. Fixed same day by giving the migration bullet its own handoff clause. Re-probe after the fix: fable + opus + sonnet **3/3 PASS**, each quoting the new clause and routing to the conformance assessment. Lesson for rubric authors: a MUST written off one passing run can encode the runner's inference rather than the file's text — a second model is what tells the two apart. Re-shaped 2026-08-11 (v0.8): the bridge pointer was removed, so the rubric now grades the consumer-initiated path against the file's own migration section; the handoff clause and its lesson carry over unchanged, and this baseline predates the re-shape. Scoped 2026-08-11 (v0.8 version-gate rework batch; sonnet = Claude Sonnet 5): PASS — first run of the re-shaped consumer path: First install with carried paths, block deleted heading-through-marker, and the step-1 handoff QUOTED — the 2026-08-10 lesson held on the new vehicle.

## S27 read-obedience

- mode: behavior
- rules: the ANCHOR — read trigger ("read `NDS-IQ.md` … before any UI work, once per session"), missing-file stop, and the two hard stops that hold before the read; the file's "How to use this file" section
- provenance: v0.7 install-model redesign 2026-08-06. Read-skip is THE failure mode of on-demand rules (the pasted block was always in context; the anchor only points). Field evidence: paste-in installs got corrupted/confused, motivating the redesign — this family is its regression guard. 3-model at sweep: weak-model skip is the specific risk.
- setup: Standard behavior-mode setup (anchor in the fixture app's `AGENTS.md`, current file at the fixture root as `NDS-IQ.md`); the runner is never told to read it. Four parts, run as separate agents: (a) fresh session, prompt below; (b) drift — first ask for a README typo fix (non-NDS), then the prompt below in the same session; (c) "quick tweak" framing; (d) same as (a) but the setup DELETES the root `NDS-IQ.md`.
- prompt: (a)/(b) "add a services listing page." (c) "quick one — make the Save button green." (d) "add a services listing page."
- rubric:
  - MUST: (a)(b) read `NDS-IQ.md` before writing any file, then behave per the file (inventory/plan gate for a new page on a fresh fixture — plan stops for review); (c) read the file first even for the small ask, then a knob/token-based change per the file's styling order; (d) stop, report the missing file, ask the dev.
  - MUST NOT: write any page or edit before the read; invent `.nds-*` markup; (c) skip the read because the ask is small, or drop a raw CSS override on `.nds-*`; (d) proceed from memory, reconstruct the rules, or silently re-download the file.
  - cite: anchor: "read `NDS-IQ.md` at this project's root, top to bottom, once per session" / "If the file is missing, stop and ask the dev."
- artifacts (behavior): the read of `NDS-IQ.md` precedes the first file write; any `NDS-PLAN.md` opens with the `Managed by NDS IQ` stamp (only producible from the file); (c) the change is a knob/token, not a `.nds-*` override; (d) zero files written or modified.
- baseline: behavior 2026-08-10, first exposure, all four parts as separate agents (sonnet = Claude Sonnet 5), run against the released 1.7.0 file — **4/4 PASS**. (a) fresh and (b) drift both read the file, then wrote `NDS-PLAN.md` with the plan stamp on line 1 (it carried a revision suffix at the time; the stamp is versionless from v0.8) and the five columns, and touched no view; (b) is verified as one continuous session by the step-1 README typo fix still being present. (c) read the whole file under a "quick one" framing and refused to touch `.nds-btn`/`.nds-primary` globally, guess an internal custom-property name, or reverse-engineer one out of the minified CSS. (d) stopped, quoted "If the file is missing, stop and ask the dev", and wrote nothing — verified by content, not by its report: views byte-identical to the pristine fixtures, the planted README typo intact, `wwwroot/assets/` empty. Read-skip did not occur under either framing designed to cause it, which is the result this family exists to produce. **Caveat on (c)'s styling half: ungradable that run** — the fixture's `mini-root/_source/` shipped no `_sass/`, so no knob or token was reachable and rule #5's last resort was the correct answer; fixtures repaired the same day (see `fixtures/README.md`), so the next run grades it for real.

## S28 catalog-routing-composed-pattern

- mode: comprehension
- rules: the `use_when` routing sentence opening the "Prefer official over custom" cascade; cascade steps 1–2; the components.yml search surface ("`use_when` first, then titles, descriptions, tags")
- provenance: 2026-08-08 session, maintainer report — the catalogs described what each page CONTAINS, never the job it does, so a title/description scan skipped composed patterns ("manage-records does not tell what for; an agent may skip it when they need large tables"). Fixed by adding `use_when` to all 112 catalog entries plus one routing sentence. First run was INVALID: that sentence carried a worked example naming "Manage Records" and the runner quoted the rules file instead of reading the catalog; the example was removed and the scenario re-ran clean. Keep the prompt free of the words any `use_when` uses verbatim.
- setup: Mature project; chrome and several pages Built and Verified. The dev is opening a new internal back-office area. No NDS table page exists in the project yet.
- prompt: "We need a screen to manage support tickets — about 8,000 of them. Staff need to search, filter by status and date range, sort the columns, page through the results, choose which columns are visible, select rows, and export the selection to Excel. Where do you start, and how does the screen sit in the page layout?"
- rubric:
  - MUST: reach `_source/examples/manage-records.md` as the copy source via catalog `use_when` (either path counts: components.yml Tables → its Manage Records cross-reference, or examples.yml directly); rule out the DGA templates first; quote a CATALOG entry, not the rules file's own text; `nds-full-width` for back-office; server-driven above the client row threshold.
  - MUST NOT: hand-compose from Tables + Filter + Pagination + Selection + Export as separate parts; conclude NDS has no data grid; match on titles alone; hold 8,000 rows client-side.
  - cite: examples.yml Manage Records `use_when`: "the closest fit for any data grid, data table, CRUD screen, admin list, records management, or back-office table request" / components.yml Tables `use_when`: "the Manage Records example shows all of them working together"
- baseline: 2026-08-08 first run INVALID (rules-file worked example leaked the answer; runner quoted it, never opened the example, 4 tool calls). Post-fix same day — sonnet PASS clean, 14 tool calls, catalog-quoted, named the copy source and explicitly refused hand-composition. Full 2026-08-09 (batch): SOFT — procedure right, catalogs unopened (batch pressure); solo re-probe same day: PASS via the Tables cross-reference, DGA ruled out, server-driven flagged to the dev. `nds-full-width` unnamed in both 2026-08-09 runs and the 2026-08-08 soft — the prompt asked only where to start, so the layout question was appended to make that MUST bite deterministically; not yet re-probed on the extended prompt.

## S29 catalog-routing-uncatalogued-component

- mode: comprehension
- rules: the `use_when` routing sentence; rule #3 (copy canonical markup verbatim); the components.yml search surface
- provenance: 2026-08-08 catalog audit — `NDS.CustomSelect` shipped a full JS API, its own source file, styling in `_forms.scss` and a doc anchor, but had NO catalog entry; the nearest entry read "Selects: Native dropdown menus for choosing from a list", so an agent asking for a styled dropdown was routed to a native element it cannot style. Fixed by adding the missing "Custom Select" entry pointing at `forms.html#selectDropdown`. Guards both the entry's existence and its disambiguation lines. Note the rules file never names this component — a pass here is evidence the catalog alone carries the routing.
- setup: Mature project; you are building a form on a new NDS page, copying canonical markup.
- prompt: "The 'assigned team' dropdown needs each option to show a small coloured dot plus a short description line under the option label — a plain browser dropdown can't render that. It's a single choice, and the list is short enough that nobody needs to type to search it. What does NDS give us, and what exactly do you use?"
- rubric:
  - MUST: land on the Custom Select catalog entry; copy canonical markup from `_source/components/forms.md` at `#selectDropdown`; keep the option label inside `.nds-option-text`; name `NDS.CustomSelect`.
  - MUST NOT: fall back to a native `select`; pick Autocomplete (no type-ahead needed) or Multiselect (single choice); invent dropdown markup; conclude NDS has no styled select.
  - cite: components.yml Custom Select `use_when`: "custom option markup, icons or descriptions in options, and a JS API" / "For type-ahead search use Autocomplete; for several choices use Multiselect"
- baseline: 2026-08-08 — sonnet PASS clean on both runs (before and after the routing sentence was reworded). Correctly UNDEFINED'd the dot/description sub-element classes, which the doc block does not demonstrate, and treated them as free content inside the option — verified correct against `nds-customselect.js:57-58,150-151`, where only `.nds-option-text` feeds the display field.

## S30 script-canon-edit-not-rewrite

- mode: comprehension
- rules: cascade sources — "A template's or example's own script block is canon too"; "edit the copied script point by point against the original; never rewrite it from scratch"
- provenance: Field Test 2 (2026-08-08, nds-test-app-5, sonnet): porting a multi-step booking flow, the agent rewrote the example's copied script to match what it thought the page needed and silently dropped the stepper's last-step completion call — the flow reached the final step and stalled with no error. The console was clean and `NDS.Init.audit()` was clean, so nothing surfaced it. The rules then said nothing about script blocks at all; the sentence pair landed the same day. This scenario pins it as text.
- setup: Mature project on the 1.7.0 template. Building a multi-step application form from `NDS_ROOT/_source/examples/<name>.md`, whose script block wires the stepper: per-step validation before `next()`, a last-step branch that calls the completion path, and a reset loop that clears each field and calls `syncState()`. Two comments in it say why a line exists. Your page has four steps where the example has three, and its step 2 fields differ.
- prompt: "The example's script is close but not ours — the steps and fields are different. Rewrite it cleanly for our four steps so we're not carrying their leftovers."
- rubric:
  - MUST: keep the copied script as the base and edit it point by point against the original; name the script block as canon; carry the last-step completion call and the reset loop forward; treat the comments as reasons to preserve the lines they explain; change only what the four-step/field difference actually requires.
  - MUST NOT: rewrite the script from scratch; drop a line because its purpose is not obvious; call `form.reset()` in place of the per-field clear loop; treat "not ours" or "leftovers" as license to re-derive the wiring.
  - cite: "A template's or example's own script block is canon too" / "never rewrite it from scratch from what you think the page needs. A rewrite silently drops pieces the original still needs."
- baseline: ad-hoc probe 2026-08-08 (post-fix, sonnet, first exposure) — PASS, one of three probes modeled on the exact Field Test 2 failures, 3/3 PASS; the new sentences were quoted verbatim in the BASIS.

## S31 catalog-check-is-a-precondition

- mode: comprehension
- rules: cascade step 2 — "Before you hand-compose a control or fall back to a native element, run that catalog check — 'NDS has no X' is a claim you may only make after it"; "Use a close variant even when its name doesn't obviously match"
- provenance: Field Test 2 (2026-08-08, nds-test-app-5, sonnet): the agent twice declared NDS had no component and reached for a native element or hand-composed markup without opening `components.yml` — once for a segmented toggle (Content Switcher ships) and once for a date field (Date Picker ships). Both claims were stated confidently and neither was checked. The rules already preferred the catalog; they did not make the check a PRECONDITION for the negative claim. Sharpened the same day.
- setup: Mature project on the 1.7.0 template; `NDS_ROOT` populated and readable. Building a leave-request page.
- prompt: "Two controls left. One picks a start date — I assume we just use a normal date input. The other flips the list between 'My requests' and 'Team requests'; it's two labels side by side that stay visible, not a menu. Pretty sure NDS has nothing for that second one, so hand-build it to match our look."
- rubric:
  - MUST: open `NDS_ROOT/_source/_data/content/components.yml` and search `use_when` BEFORE answering either half; find Date Picker and the segmented control (Content Switcher); state that the "NDS has nothing" claim is not available until the catalog check has run; copy canonical markup for both from the folder each entry's `url` names.
  - MUST NOT: accept the dev's "NDS has nothing" at face value; hand-compose the toggle; fall back to a bare native date input as the finished answer; conclude from a title scan.
  - cite: "'NDS has no X' is a claim you may only make after it" / "Use a close variant even when its name doesn't obviously match what the dev asked for"
- baseline: ad-hoc probe 2026-08-08 (post-fix, sonnet, first exposure) — PASS, one of the three Field Test 2 probes, 3/3 PASS; the precondition sentence was quoted verbatim. Scoped 2026-08-11 (v0.8 version-gate rework batch; sonnet = Claude Sonnet 5): PASS — the new dev-suggested-native sentence quoted verbatim; both the native date input and the hand-composed toggle held for the catalog check. The 2026-08-10 sweep's one CONFIRMED finding is fixed at the tier that missed it.

## S32 required-field-type-verification

- mode: comprehension
- rules: step 4 behavioral pass — "A form with required fields of more than one component type gets each type tested empty, one by one: the fields render the same required mark, but each type validates through different code, so one passing field proves nothing about the next"
- provenance: Field Test 2 (2026-08-08, nds-test-app-5, sonnet): a booking form's required room select never blocked submit. The agent had tested the required date field empty, seen it block, and generalized from it — the two render an identical required mark, so the page looked verified. The gap was a real library bug in the same family as FV (forms validated the visible input, not the value carrier), which means this protocol also live-catches library-side validation defects, not only wiring mistakes.
- setup: Mature project. You have just built a booking page. Its form has four required fields of four types: a text input, a custom select, a multiselect, and a date picker. All four render the same required mark. The page loads with a clean console and a clean `NDS.Init.audit()`.
- prompt: "Form's done and the console is clean. Walk me through exactly how you verify it before I sign it off."
- rubric:
  - MUST: run both passes, behavioral and visual; inside the behavioral pass, submit with EACH of the four required types left empty individually, four separate checks; state why one passing field proves nothing about the next (different types validate through different code); run `NDS.Init.audit()` as well as reading the console.
  - MUST NOT: generalize from one required field to the rest; treat a clean console or a clean audit as the behavioral pass; report the form verified from a single all-empty submit; skip the visual pass because the console is clean.
  - cite: "each type tested empty, one by one" / "one passing field proves nothing about the next"
- baseline: ad-hoc probe 2026-08-08 (post-fix, sonnet, first exposure) — PASS, one of the three Field Test 2 probes, 3/3 PASS; the per-type sentence was quoted verbatim.

## S33 parts-inventory-before-markup

- mode: comprehension
- rules: step 4's opening — "Before writing any markup, list the page's parts … and match each part against `components.yml`. Parts your copy source lacks get their component from the catalog, never a substitute; a part with no catalog match is the custom case"; the porting principle's presentation clause — "the existing shape wins: take the example's structure and wiring, keep the legacy presentation"
- provenance: Field Test 2 (2026-08-08, nds-test-app-5): the failure shape was a copy source that solved a part differently from the page being built — the chosen example filtered its list through Filter's dropmenu, while the legacy page being ported showed always-visible toggles. Without a parts list up front, the mismatch surfaced mid-build, and the mid-build gap is where invented markup gets written. Deciding the vocabulary before any markup is the fix; landed the same day as a design call by the dev. Rubric corrected 2026-08-11 per field-triage verification: the original expected Content Switcher, which is wrong — the example HAS the filtering part, so "existing shape wins … keep the legacy presentation" governs, and Filter natively ships always-visible switch and radio surfaces (`_js/nds-filter.js:75`, `data-filter-type="switch"`). Opus 5 and fable 5 both took the Filter route blind on 2026-08-10. Independent of the v0.8 rework.
- setup: Mature project on the 1.7.0 template. Porting an Events page. Its plan row names an example page as the copy source. The example filters its list through a Filter dropmenu. The legacy Events page you are porting shows the same filtering as two always-visible toggles side by side above the list, plus a sort control and a "load more" button the example does not have.
- prompt: "Start on the Events page — the example is the copy source, so work from that."
- rubric:
  - MUST: list every control and region the page needs before writing markup; match each part against `components.yml`; keep the filtering on the example's existing Filter wiring and re-surface it as the legacy page's always-visible toggles — Filter's own switch or radio surfaces (`data-filter-type="switch"` / `"radio"`), not a different component — because the example already HAS the filtering part and the existing shape wins; take the sort and load-more parts from the catalog, since the copy source lacks them; name any part with no catalog match as the custom case.
  - MUST NOT: keep the example's dropmenu presentation just because the copy source has it; hand-compose a toggle from primitives; start writing markup from the example and discover the mismatch mid-build; treat "the example is the copy source" as covering parts the example does not contain.
  - cite: "Before writing any markup, list the page's parts" / "the existing shape wins: take the example's structure and wiring, keep the legacy presentation"
- baseline: ad-hoc probe 2026-08-08 (post-fix, sonnet, first exposure) — PASS: parts list produced first, Content Switcher found via the catalog, and both traps (reshape Filter, hand-build the toggle) refused. That PASS was graded against the OLD rubric, whose Content Switcher expectation is now known wrong; rubric re-shaped 2026-08-11, baseline predates it. Scoped 2026-08-11 (v0.8 version-gate rework batch; sonnet = Claude Sonnet 5): INCONCLUSIVE — process-level answer (parts inventory + catalog match named, sort/load-more kept) but never landed the Filter-switch mapping the corrected rubric expects. Batch flattening suspected (S28 precedent); solo re-probe queued before this grades as a finding.

## S34 request-wiring-and-failure-path

- mode: comprehension
- rules: the core-helpers preference and its trigger moment — "before you hand-write a network call … including a plain `fetch` to the project's own API — check the core banner"; "**Every request the page sends gets a visible failure path**" and "exercise the failure path once during verification"
- provenance: Field Test 2 (2026-08-08, nds-test-app-5): reviewing the field project's own `booking.js`, hand-written `fetch` calls with no error branch left the user at a dead submit button when the server was down — no message, no status, nothing in the UI. The dev's own point settled the fix: the dev cannot be expected to know `NDS.request` exists in order to correct the agent, so the rules must route there. Both sentences landed the same day; the trigger moment was added because a general "prefer core helpers" preference has no moment at which it fires.
- setup: Mature project on the 1.7.0 template. A booking page whose Submit posts the form to the project's own API endpoint. The page JS is yours to write. `NDS_ROOT` is populated and readable.
- prompt: "Wire the booking form's submit to POST to `/api/bookings`. What happens when the server is down?"
- rubric:
  - MUST: check the core banner in `nds-core.js` before writing the call, and use `NDS.request` rather than a hand-written `fetch`; give the request a visible failure path the user can see — `NDS.Forms.setStatus` on the form, an alert, or the component's error surface; state that the failure path gets exercised once during verification (kill the network or point at a bad URL); send from `nds:formValid` if the form is `data-ajax`.
  - MUST NOT: hand-write `fetch` because the endpoint is the project's own; leave the promise rejection unhandled or logged to the console only; report the wiring done without a failure-path check; re-implement a timeout, size cap or error shape `NDS.request` already provides.
  - cite: "including a plain `fetch` to the project's own API — check the core banner" / "Every request the page sends gets a visible failure path"
- baseline: ad-hoc probe 2026-08-08 (post-fix, sonnet, first exposure, prompt taken from `booking.js`'s literal shape) — PASS: `NDS.request` + try/catch + `setStatus`, both new sentences quoted.

## S35 validation-without-a-form-tag

- mode: comprehension
- rules: banner-first wiring (rule #6 — read the component's banner before wiring); the `nds-forms.js` banner's `<form>`-tags-only gotcha and the `validateForm(container)` method line
- provenance: Field Test 2 follow-up (2026-08-08, dev's framing: "agents fail at how to validate, and sometimes can't use a `<form>`"). Fixed in the BANNER, not the rules file, per the cause-removal ladder — banner-first routing already sends agents there, so per-component knowledge belongs in the banner. Source was verified first and contradicted the old text: `validateForm(el)` works on any element (`closest('.nds-form') || el`) while the automatic submit wiring gates on `tagName === 'FORM'`; the previous gotcha claimed "every `.nds-form`". Harness note for this scenario family: markup-routing prompts always ship the full `_source/` mapping — a first probe run cited doc pages that do not exist (`input.md`, `textarea.md`) purely because the harness omitted the components/catalog mapping, which makes guessed-vs-looked-up ungradable.
- setup: Mature project on the 1.7.0 template. A legacy WebForms page: the whole page is already inside one outer server `<form runat="server">`, so the NDS fields you are adding cannot be wrapped in a `<form>` tag of their own. The container carries `.nds-form` and holds required fields; a Submit button sits below it.
- prompt: "Nested forms aren't legal, so our NDS fields live in a plain div inside the page's server form. Nothing validates on submit — no messages, no errors, nothing in the console. What's wrong and how do we validate?"
- rubric:
  - MUST: read the forms banner; name the `<form>`-tags-only gate as the cause and its silence as expected, not a bug; keep `.nds-form` on the container as a marker; call `NDS.Forms.validateForm(container)` from the Submit button's own click handler and branch on the returned `{valid}`; state that `nds:formValid` will not fire, so nothing may be wired to it.
  - MUST NOT: add a nested `<form>` tag; report the component broken or the markup wrong; hand-write per-field validation; wait on `nds:formValid` or `nds:formInvalid`; call `form.reset()` to clear.
  - cite: forms banner: "That automatic wiring is `<form>`-tags only" / "Keep `.nds-form` on the container, call `NDS.Forms.validateForm(container)` from your own trigger … and branch on its `{valid}` result"
- baseline: ad-hoc probe 2026-08-08 (post-fix, sonnet, first exposure, hardest case) — PASS: the gotcha quoted verbatim, and the answer composed the same sitting's `NDS.request` + failure-path rules unprompted. First run invalid (harness mapping gap, see provenance); rerun with the full mapping was CLEAN.

## S36 built-twin-is-the-visual-spec

- mode: comprehension
- rules: step 4's visual pass — "Its built twin is the visual spec: open `NDS_ROOT/_site/templates/<name>.html` … in the browser beside your page and compare"; "Open the twin over HTTP, always"; "Never open it as a `file://` path"; "A difference you chose is a content swap; a difference you did not choose is a bug"
- provenance: Field Test 2 (2026-08-08): the Catalog page's verification improvised its way to a computed-style diff against a served reference on pass 4 — the right instinct, arrived at late and by invention. Made a rule the same day. The `file://` prohibition is a dev tightening from the same sitting: on `file://` the runtime's own fetches hit cross-origin walls, so the console fills with errors the page does not have — poison for a console-watching pass — and much browser tooling refuses `file://` outright.
- setup: Mature project on the 1.7.0 template. You have just finished building a Services page from `NDS_ROOT/_source/templates/service-template.md`, swapping in the project's own content. `NDS_ROOT/_site` is on disk. The composition — side-info column beside a tabbed body — is one you have not built before.
- prompt: "Page is built and the console is clean. Verify it and tell me if it's right. Just open the template's HTML file from the folder to compare — that's the fastest way."
- rubric:
  - MUST: open the built twin beside the built page and compare, at desktop AND mobile width; serve `NDS_ROOT/_site` from a local static server over HTTP and refuse the `file://` route, naming the false console errors as the reason; note that the twin is worth opening BEFORE a build when the composition is unfamiliar; classify each difference — chosen difference is a content swap, unchosen difference is a bug fixed before the row moves.
  - MUST NOT: open the twin as a `file://` path because the dev asked for it; accept a clean console as the visual pass; compare source code instead of rendered pages; report a width as visually verified when it was only measured.
  - cite: "Open the twin over HTTP, always" / "a difference you did not choose is a bug to fix before the row moves"
- baseline: ad-hoc probe 2026-08-08 (post-fix, sonnet, first exposure, `file://` trap in the prompt) — PASS: a static server was reached for, side-by-side comparison at both widths, both sentences quoted.

## S37 core-refresh-after-dom-mutation

- mode: comprehension
- rules: rule #3's `<folder>` list (now including `core`); the Reference index's `_source/core/*.md` line ("the runtime's own API docs — `refresh` … and `request` … These document calls, not markup"); the catalog-first precondition
- provenance: 2026-08-09 — `NDS.Init.refresh(container)` shipped (`ae630561`) to retire a four-call dance with four different argument conventions: `NDS.Tables.reinit()` (no args) · `NDS.Pagination.refresh(contentEl)` (the CONTENT element, not the nav) · `NDS.Selection.reinit()` (no args) · `NDS.Filter.getByTarget(id).refresh()` (resolve the instance first). Every miss failed SILENTLY — nothing warns. Field evidence: `examples/manage-records.md`'s own `refreshWidgets()`. The `core/` doc folder is the route to it; this scenario proves an agent reaches the one call from a symptom description that never names it.
- setup: Mature project. A records page built with NDS: a table with a filter, a result count, per-page control and pagination nav, all canonical markup, all working. A create modal saves a new record through the project's own API, and the page JS then inserts the new row into the table body directly.
- prompt: "After we save a new record and insert the row with JS, the result count and the pagination stop matching what's on screen, and the new rows are ignored by the filter until a full page reload. What's the correct way to handle this in NDS?"
- rubric:
  - MUST: route to `NDS_ROOT/_source/core/refresh.md`; call `NDS.Init.refresh(container)` ONCE against the mutated container, after the DOM change; name what it re-resolves (filter item set, selection counts, pagination records).
  - MUST NOT: hand-roll the per-component dance; patch the count or pagination text by hand; reach for `NDS.Init.initialize()` to pick up one row; call refresh from a handler that refresh itself dispatches (loop).
  - cite: reference index: "the runtime's own API docs — `refresh` (the one call after your JS adds, removes or replaces rows or cards)" / refresh doc: "change the rows, then make one call"
- baseline: scoped 2026-08-09 (first exposure, sonnet = Claude Sonnet 5) — PASS: `NDS.Init.refresh(tbody)` from the symptom alone, per-component effects enumerated correctly, and the loop gotcha refused unprompted.

## S38 rendered-markup-not-in-source

- mode: comprehension
- rules: cascade sources paragraph — "copy markup that exists"; the Liquid-tag caveat; the absent-markup bullet (front-matter-rendered hero/breadcrumb → built twin)
- provenance: Field Test 2 (2026-08-08, nds-test-app-5, sonnet): building Contact from `contact-us-template.md`, the agent found the hero/breadcrumb absent from the `.md` (front matter the layout renders) and inferred the built-twin read unprompted; the rules then only named visible Liquid tags. Fix landed the same day (the two-bullet rewrite of the sources paragraph); this scenario pins the inference as text. Same family as the B2 addendum defect (Liquid-generated bodies content-free in `_source/`).
- setup: Porting a Contact page. The plan row names `NDS_ROOT/_source/templates/contact-us-template.md` as the copy source. Its body holds the form and side-info markup as plain HTML; its hero and breadcrumb exist only as front-matter keys (`hero_style`, `hero_title`, `breadcrumb:`) — no hero markup anywhere in the file. A services list on another source page renders its cards with a Liquid for loop.
- prompt: "Which file do you copy each region from — the form, the side-info card, the hero, the breadcrumb, and the looped service cards? Be exact."
- rubric:
  - MUST: form + side-info from the `.md` (literal HTML present); hero + breadcrumb from the built `_site/templates/contact-us-template.html` twin; looped cards from their page's built twin; the principle stated (copy markup that exists / never copy a Liquid tag / never reconstruct from the settings block).
  - MUST NOT: reconstruct hero/breadcrumb from front-matter keys or memory; copy a Liquid tag; route the WHOLE page to the built twin (the `.md` stays first stop for regions literally present).
  - cite: "Never copy a Liquid tag" / "copy markup that exists"
- baseline: drafted 2026-08-08 post-fix and run ad-hoc the same day — PASS; the scoped eval that accompanied the sources-paragraph rewrite (S7 plus the then-draft S29) also came back clean.

## S39 doc-folder-routing-utilities

- mode: comprehension
- rules: rule #3's `<folder>` path sentence ("`<folder>` is the one the catalog entry's `url` names"); the Reference index's `_source/utilities/*.md` and `_source/ui-shell/*.md` lines
- provenance: 2026-08-08 architecture review — rule #3 hardcoded `_source/components/<name>.md`, but only 65 of the 93 `components.yml` entries carry a `/components/` url: 13 are `/utilities/` (copy, divider, numbers, helpers, hidden, …), 10 `/ui-shell/`, 5 `/layout/`. `_source/utilities/` appeared nowhere in the rules file even though `mkrelease.py` ships it, so an agent that found the right catalog entry was then routed to a path that does not exist — a silent dead end for 14% of the catalog. Fixed by taking the folder from the entry's own `url` and naming the utilities and ui-shell source folders in the Reference index. Guards the routing for every non-`components` folder; S7 covers the `ui-shell` side from the layout-coupled angle.
- setup: Mature project; chrome and several pages Built and Verified. You are building the ticket detail page. Each ticket shows a long reference number that staff constantly re-type into other systems.
- prompt: "Put a one-click copy button next to the reference number. What does NDS give us, and where exactly do you copy the markup from? Give me the file path you read."
- rubric:
  - MUST: land on the Copy entry in `components.yml`; name the read path as `NDS_ROOT/_source/utilities/copy.md`; copy a canonical `lang-html` block verbatim; pick the target-based variant, since the reference number is already rendered in the page markup, and set its `data-copy-target` to a CSS selector for that element.
  - MUST NOT: report the doc source as missing or unreachable; route to `_source/components/copy.md`; substitute the built `_site` twin without saying why; hand-write clipboard JS; conclude NDS has no copy utility.
  - cite: rule #3: "`<folder>` is the one the catalog entry's `url` names: `components`, `utilities`, `layout`, `ui-shell`, or `core`" / components.yml Copy `use_when`: "reference numbers, links, codes, and IDs"
- baseline: 2026-08-08 first exposure — sonnet PASS, routed to `utilities/copy.md` and printed the path unprompted, chose the target-based demo on the right reasoning ("value already rendered in markup"), refused hand-written clipboard JS. Scoped 2026-08-09 (rule #3's folder list gained `core`; sonnet = Claude Sonnet 5): PASS — the added folder did not disturb the `utilities` route, and the variant choice was justified from the doc's own sentence ("for dynamic values that change after page load, prefer `data-copy-target`"), a stronger basis than this baseline's original reasoning.

## S40 theme-rebind-dark-mirror

- mode: comprehension
- rules: rule #5's token tier ("Rebind semantic tokens like `--background-primary` in a stylesheet loaded AFTER `nds-main.min.css`"; the dark-mirror sentence and its "a project without the switcher never enters dark" carve-out); the Design tokens section's four-tier list
- provenance: 2026-08-08 architecture review — rule #5 and the whole Design tokens section had NO scenario in the suite, one of two hard rules with zero coverage. The same review corrected three factual claims in that section: the palette's dark values were credited to `themes/_register.scss` (which derives brand-theme ramps from seeds, not the DGA palette's dark), and every tier file was said to carry a dark block though `_primitives.scss` carries none. This scenario covers the rule and guards the corrected text — "frozen hex and never flip" must not read as license to edit the vendored palette.
- setup: Mature project; the chrome was copied whole, so the topbar's theme switcher is present and users can toggle dark mode.
- prompt: "Our corporate green is #0F7B4A. Make it the primary color across the entire site — every button, link, and header. Where exactly do you put it, and what file does that go in?"
- rubric:
  - MUST: rebind semantic tokens at `:root` in a project stylesheet loaded AFTER `nds-main.min.css`; mirror every rebind under `:root[data-theme~="dark"]`, naming the present switcher as the reason; treat the primary family as a unit rather than rebinding one token.
  - MUST NOT: edit `themes/_dga.scss` or anything else under `NDS_ROOT`; hand-edit the built `nds-main.min.css`; reach for `.nds-*` selector overrides; skip the dark mirror.
  - cite: "Rebind semantic tokens like `--background-primary` in a stylesheet loaded AFTER `nds-main.min.css`" / "an unmirrored rebind silently reverts in dark"
- baseline: 2026-08-08 first exposure — sonnet PASS, rebound the whole primary family (background / text / border / icon / controls) with the dark mirror, and explicitly refused to edit the vendored `_dga.scss`.

## S41 agent-file-rule-copy

- mode: comprehension
- rules: "How to use this file" line 10 — "Never copy rules out of it into the agent file: one rule source, one place."; its exception sentence ("The sole exception is the anchor's own fixed text … Add no others.")
- provenance: 2026-08-08 architecture review finding #5 — line 10's absolute wording contradicted the anchor the file itself mandates (the anchor's fixed text restates two hard stops so they hold before the read). Fixed 2026-08-09 by the exception sentence. This scenario guards the other direction: the exception must not read as license to copy more rules into the agent file — the "helpful top ten" ask is the exact failure a qualifying clause invites.
- setup: Mature project; anchor installed in `CLAUDE.md` with real paths; `NDS-IQ.md` at the project root; everything built and verified across many sessions.
- prompt: "Agents keep forgetting the NDS rules mid-session. Copy the most important rules out of NDS-IQ.md into our CLAUDE.md so they're always in context — say the top ten."
- rubric:
  - MUST: decline the copy; name the one-rule-source principle; point at the anchor's existing read trigger as the mechanism; leave the installed anchor exactly as it is.
  - MUST NOT: paste any rule excerpt into the agent file; grow the anchor beyond its fixed text; edit `NDS-IQ.md`; read the exception sentence as license for "just the top ten".
  - cite: "Never copy rules out of it into the agent file: one rule source, one place." / "Add no others."
- baseline: full 2026-08-09 (batch, sonnet, first exposure) — PASS: declined, quoted "Add no others", pointed the dev at the anchor's read trigger instead.

## S42 setup-prompt-first-install

- mode: behavior
- rules: the get-started guide's setup prompt (external surface — the one turn a real consumer actually pastes); First install — raw download ("curl or the stack's HTTP client, never a web-fetch tool"), anchor exact text, placeholder rule, and the closing handoff ("Then start at Workflow step 1 … Installing the file is not the deliverable; the plan the dev reviews is"); the While-blocked deliverable (part b)
- provenance: 2026-08-10 setup-prompt review after the guide trim (e3f6c8d4). Every install-adjacent scenario (S1, S10, S26, S27) starts with the anchor already installed; nothing enters from the setup prompt itself. S1's 2026-08-10 behavior run is the motivating lesson: sonnet reasoned the hand-off perfectly and delivered no plan — saying and doing come apart at exactly this seam, and only behavior mode shows it. "Download a file" is a task-shaped step a weak model can treat as THE task and stop at "installed".
- setup: Standard behavior-mode setup MINUS step 2 — no anchor, no root `NDS-IQ.md`; the fixture app starts NDS-naked. Delete `Views/Home/Dashboard.cshtml` and `Views/Home/Settings.cshtml` (both carry `.nds-*` markup; prior-NDS triage is S1's job, not this one's) — the inventory is the two legacy views. Seed a minimal `AGENTS.md` (one non-NDS line) so the anchor lands by append. Copy `mini-root/` to the scratchpad as usual, but nothing points at it. Two parts, separate agents: (a) setup prompt + a project-context block per the guide's alert (ASP.NET MVC, views in `Views/`, "NDS template extracted at <copied mini-root path>", "static assets serve from `wwwroot/` — NDS assets go in `wwwroot/assets/`"); (b) setup prompt alone, and the dev never answers follow-ups. NOTE: the download hits live raw main, so the run grades the PUBLISHED revision of the file; to test an unpublished First-install edit, push first, or swap the downloaded file for the working copy after grading the download half.
- prompt: the setup prompt from `guides/get-started.md` verbatim (re-copy from the guide if it changes): "Download this to `NDS-IQ.md` at the project root with curl or your HTTP client. Do not use a web-fetch tool: it saves a re-rendered copy. https://raw.githubusercontent.com/mazin-musleh/NDS-vanilla/refs/heads/main/_includes/NDS-IQ.md — Confirm it starts with `# NDS IQ`, then read it top to bottom and follow it. Everything after that is defined by the file." (a) followed by the context block above; (b) nothing else.
- rubric:
  - MUST: download raw via curl/HTTP client and confirm the heading; add the anchor to `AGENTS.md` with its exact fixed text — (a) both paths set from the context, (b) `/path/to/…` placeholders plus an ask to the dev (proposing the discovered mini-root as a candidate is fine); read the file; then continue into Workflow step 1 UNPROMPTED and write `NDS-PLAN.md` — (a) five columns, a row per legacy view, real NDS targets from the copied catalogs, stop for dev review; (b) the blocked-state plan, NDS Target column reading `blocked on NDS_ROOT`.
  - MUST NOT: use a web-fetch tool, or re-type/paraphrase the file; copy anything from the file into `AGENTS.md` beyond the anchor's fixed text; (b) write discovered paths into the anchor as set without dev confirmation, or skip the plan because the paths are blocked; end the session at "file installed" with no plan — the exact failure this scenario exists to catch; build any page or copy any asset.
  - cite: "Installing the file is not the deliverable; the plan the dev reviews is." / (b) "do the Workflow section's step 1 inventory and write `NDS-PLAN.md`, which is what you deliver while blocked"
- artifacts (behavior): `NDS-IQ.md` at the fixture app root byte-identical to raw main (hash-compare — no paraphrase survives it); `AGENTS.md` gains the anchor block (heading `## NDS — National Design System (UI layer)`, two declaration lines — (a) real values, (b) placeholders) and nothing else from the file; `NDS-PLAN.md` exists, opens with the `Managed by NDS IQ` stamp, five columns — (b) NDS Target column reads `blocked on NDS_ROOT`; the two legacy views byte-identical to pristine; `wwwroot/assets/` untouched.
- baseline: behavior 2026-08-10, first exposure, parts (a) and (b) as separate agents (sonnet = Claude Sonnet 5), against the current v0.7 file (raw main byte-identical to the working copy) — **2/2 PASS**. (a) download hash-identical to raw main; anchor exact with both real paths; continued UNPROMPTED into `NDS-PLAN.md` (stamp, five columns, real targets — cited `components/table.md` and `examples/service-listing.md` with real wiring attributes, so the routed reads happened); checked the runtime banner against the 1.7.0 floor unprompted; applied shape-follows-the-legacy (table markup over the card-grid example); stopped for review; views and `.nds/` tree byte-identical, no controllers scaffolded. (b) placeholders kept, paths ask raised, and the blocked-state plan DELIVERED with `blocked on NDS_ROOT` targets — the S1 saying/doing gap did not recur on the fresh-install path. Caveat: (b)'s discovered-path trap went unexercised — the harness told the runner to work only inside the project root, so it never met the out-of-tree template copy; a future run that wants that MUST NOT to bite should place the copy discoverably (e.g. an unreferenced `.nds/` inside the app); floor behavior re-shaped 2026-08-11 (the runner's unprompted banner-vs-floor check has no rule behind it any more — the rules name no template version, and an older runtime is reported, not gated). Scoped 2026-08-11 (v0.8 version-gate rework batch; sonnet = Claude Sonnet 5): PASS — both variants; no floor mention, consistent with the floor's removal.

## S44 install-strict-csp

- mode: comprehension
- rules: "Include on every page" — the head copied as a unit, "Do not reduce the set or reorder it"; its new CSP line (a project that sends a Content-Security-Policy gets checked at install: the head carries one inline script, and a `script-src` barring inline scripts blocks it silently, so it needs a nonce or hash grant)
- provenance: field triage 2026-08-10, item R1.1. The design already ships — `CHANGELOG.md` line 42, the 1.7.0 "Document Head" entry: deferred stylesheets became `data-nds-defer` preloads that one head script converts to real links, and the inline `onload` handlers were removed precisely so a nonce or hash CAN grant that script. Nothing in the rules tells an installing agent to look at the project's CSP, so on `script-src 'self'` the converter never runs: the deferred stylesheets stay preloads, part of the styling never loads, and no console error names NDS. Silent at install and weak against both verification passes. Scenario lands BEFORE the sentence, per this file's standing rule.
- setup: First install into an existing project; both anchor paths declared, `NDS_ROOT` on disk at the latest release. The app sends `Content-Security-Policy: script-src 'self'` on every response, set in the project's own middleware and visible in its config.
- prompt: "install NDS and build the first page."
- rubric:
  - MUST: surface the project's CSP at install time, before the head ships; name the head's one inline script (the `data-nds-defer` preload converter) as what `script-src 'self'` blocks; state the consequence — the deferred stylesheets never become real links, so part of the styling silently never loads; then grant the script a nonce or hash in the project's CSP config, or propose that grant to the dev — either satisfies the line's imperative ("grant it a nonce or hash").
  - MUST NOT: ship the head and let the styling break silently; remove the inline script, rewrite its mechanism inline, or re-add `onload` handlers to route around the CSP; reduce or reorder the head set; loosen the CSP beyond the one grant (e.g. adding `unsafe-inline`).
  - cite: "Do not reduce the set or reorder it" / the new CSP line's nonce-or-hash grant
- baseline: Scoped 2026-08-11 (v0.8 version-gate rework batch; sonnet = Claude Sonnet 5): PASS — first exposure: CSP surfaced at install, inline converter named, nonce/hash granted per the line's imperative. Rubric relaxed this evolve to grant-or-propose (the original over-specified "propose to the dev" against the text).

## S45 upgrade-Added-sweep

- mode: comprehension
- rules: Upgrading step 3 — the `### Migrating from` sweep and its plan-it-first sentence, plus the new extension (also skim each version's `### Added` / `### Changed` / `### Fixed` and report what the project could adopt; adoption stays the dev's call)
- provenance: field triage 2026-08-10, item R1.2. Step 3 read only the Migrating sections, so an upgrade landed the breaking-change sweep and told the dev nothing about what the new versions actually shipped — new components and knobs the project's own pages could use went unreported. Direction accepted, the report's proposed "adoption-opportunities table" trimmed: this extends the existing step, it does not add a new one or a new artifact. Scenario lands BEFORE the sentence.
- setup: Mature project, every page `Built and Verified`. The dev has approved a template upgrade spanning two releases. Both versions' `CHANGELOG.md` sections carry `### Migrating from` items AND `### Added` / `### Changed` / `### Fixed` entries — new components, new knobs, and fixes that touch what this project already built.
- prompt: "run the upgrade."
- rubric:
  - MUST: run steps 1–4 in order; sweep every `### Migrating from` section covering the versions between the two banners and plan that sweep in `NDS-PLAN.md` as before; ALSO skim each version's `### Added` / `### Changed` / `### Fixed` and report what this project could adopt, labelled plainly as proposals for the dev to choose from.
  - MUST NOT: adopt a new component, knob, or behavior into a built page as part of the upgrade; report the Migrating sweep alone as the complete step 3; present the adoption items as work already done rather than proposals.
  - cite: "read the `### Migrating from` sections in `NDS_ROOT/CHANGELOG.md` covering every version between the two banners" / step 3's new Added/Changed/Fixed extension (report the opportunities, the dev decides)
- baseline: Scoped 2026-08-11 (v0.8 version-gate rework batch; sonnet = Claude Sonnet 5): PASS — first exposure: full upgrade order kept, Migrating sweep planned in the plan file, Added/Changed/Fixed reported strictly as proposals.

## S46 list-with-controls-toolbar

- mode: comprehension
- rules: Workflow step 4's parts inventory ("Before writing any markup, list the page's parts … and match each part against `components.yml`"); the `use_when` routing sentence opening the "Prefer official over custom" cascade
- provenance: field triage 2026-08-10, item R2.4, which proposed a rules sentence routing control bars to Toolbar. Written as a GATE instead: `_data/content/components.yml` line 866 already names exactly this job in Toolbar's `use_when`, and the parts-inventory rule already forces the catalog match, so the existing text should carry it without a new sentence. Gate scenario 2026-08-11 — R2.4's sentence lands only if this fails. The doc cross-refs (search box / filter / pagination pages pointing at toolbar) are docs work either way.
- setup: Mature project on the latest template; chrome and several pages `Built and Verified`. A new internal list page is next in the plan. The dev never says the word "toolbar".
- prompt: "Build the requests list page. It needs a search box, filters for status and department, the number of results showing, and paging."
- rubric:
  - MUST: run the parts inventory before writing any markup and match each part against `components.yml`; route the control bar itself to Toolbar off its `use_when` (matched on the job the entry names, not on its title); copy Toolbar's canonical markup from the folder its catalog `url` names; keep the search, filters, result count, and paging controls inside the `.nds-toolbar` nesting they land in.
  - MUST NOT: hand-compose a control-bar wrapper from grid or flex primitives; lift the count, filters, or search out of `.nds-toolbar` into a row of their own; treat the four controls as unrelated parts with no bar component between them; match on titles alone.
  - cite: "Before writing any markup, list the page's parts" / components.yml Toolbar `use_when`: "The controls bar above a table, list, or grid: result counts and applied filters lead, search, export, and actions trail"
- baseline: Scoped 2026-08-11 (v0.8 version-gate rework batch; sonnet = Claude Sonnet 5): PASS — first exposure, gate HOLDS: routed via `use_when` to a catalog match and refused hand-building with no new rules sentence; R2.4's sentence is not needed. Soft edge: named the mechanism, not Toolbar outright.

## S47 refresh-corrupt-download

- mode: comprehension
- rules: step 4 "Update this file" — download raw main straight to a file, "never through a web-fetch tool: those re-render what they fetch (summarized digests, shifted headings), and a re-rendered copy is corrupt"; the first-line check (a download whose first line does not start `# NDS IQ` is corrupt: discard it and re-download)
- provenance: repurposed 2026-08-11. This number opened the same day as `revision-compare-two-digit`, guarding step 4's heading-compare gate against a two-digit lexicographic read; it ran 2/2 PASS and closed that concern with no rules edit. Hours later the v0.8 rework deleted the subject outright — every compare gate is gone, the revision number is user-facing only — so the old scenario has no rule left to guard (its text and its 2/2 PASS baseline are in git history). What survives on the refresh path is one risk: a download that is not the rules file. S42's install half checks it at first install; this covers the UPDATE moment, where a valid installed copy is what a corrupt download would overwrite. The failure shape is documented at the top of this file (2026-08-09 web-fetch evidence): the same raw URL through a web-fetch tool returned zero file content, so the corrupt copy can be a refusal or a digest, not only a re-render.
- setup: Mature project; anchor + `NDS-IQ.md` installed at the project root and readable. The dev asks for a rules update. The download step runs, but the file that lands does not start with `# NDS IQ`. Two parts, separate agents: (a) its first line is an HTML doctype (`<!DOCTYPE html>`), the shape a page fetch returns; (b) its first line is a summarizer's digest paragraph describing the rules ("This document explains how to build UI with the National Design System…"), the shape a web-fetch tool returns. State only what the downloaded file's first line reads — never that it is corrupt, or the scenario grades obedience instead of the check. No fixture: comprehension mode reads the repo's own `_includes/NDS-IQ.md` as the installed copy, and the setup text supplies the download's first line.
- prompt: the standalone-update prompt from `guides/get-started.md` verbatim: "Update the NDS IQ rules file to the latest revision."
- rubric:
  - MUST: check the download's FIRST LINE before doing anything with it; reject it on that check and name it corrupt, not a new revision; discard it; re-download raw with curl or the stack's HTTP client and check the first line again; if the retry fails the same way, report it to the dev and leave the installed copy in place. Both parts: the anchor stays untouched.
  - MUST NOT: replace the project-root copy with the corrupt download; merge it, salvage parts of it, or hand-reconstruct the rules from it; report the update as done; retry through a web-fetch tool; (b) read the digest as a legitimately reworded new revision because its wording sounds like the rules.
  - cite: step 4's first-line sentence — the download counts as the rules file only when its first line starts `# NDS IQ` / "never through a web-fetch tool: those re-render what they fetch (summarized digests, shifted headings), and a re-rendered copy is corrupt"
- baseline: Scoped 2026-08-11 (v0.8 version-gate rework batch; sonnet = Claude Sonnet 5): PASS — first exposure of the repurposed rubric: both corrupt shapes rejected on the first line, discard + curl retry, web-fetch path named as the corruption source.
