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
- baseline: v3 — fable PASS, opus PASS, sonnet PASS.

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
- baseline: v3 — fable PASS, opus PASS; sonnet SOFT-MISS pre-fix, PASS after "may render worse on it" landed (scoped run 2026-08-03).

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
