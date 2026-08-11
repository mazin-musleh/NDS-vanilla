# TODO — current cycle

Standing file: it always exists. At every release commit, remove the items that release shipped and carry the open ones forward. Never delete the file itself. This is the one open list — the v7 plan (`~/.claude/plans/this-is-planning-and-misty-gem.md`) is history now; its open items moved here 2026-08-10.

## On hold until ~2026-08-12

From the 2026-08-10 Claude 5 sweep — evidence in `.claude/skills/nds-iq-eval/reports/eval-2026-08-10-sweep-claude5.md` (fable 5 = 38/40, opus 5 = 38/40, sonnet 5 = 29/40, on the shipped post-S26-fix rules file).

- [ ] **1. S31 text fix — the one CONFIRMED finding.** Dev-suggested native elements slip the catalog precondition on mid tiers (opus 4.7 + sonnet 5 both endorsed `<input type="date">`; fable 5 + opus 5 ran the check and rejected it).
  - Edit `_includes/NDS-IQ.md:179`: after "…'NDS has no X' is a claim you may only make after it." append: `A dev's own "just use a native X" gets the same check before you accept it.`
  - v7 is published → this first post-publish edit bumps the revision counter to **v8** in all three copies: the include heading, the `_includes/nds-ai-instructions.md` pointer (same commit), and the plan-stamp sentence (`Managed by NDS IQ v8`). Run `python scripts/check-release-guards.py` after.
  - Then a `scoped` nds-iq-eval run (S31 + whatever the diff's `rules:` matching pulls in).
- [ ] **2. S33 rubric fix — skill file, not rules text (needs explicit `evolve`).** Rubric expects Content Switcher; verified wrong: `NDS-IQ.md:156` ("existing shape wins … keep the legacy presentation") governs because the example HAS the filtering part, and Filter natively ships always-visible toggle surfaces (`_js/nds-filter.js:75`, `data-filter-type="switch"`). Opus 5 + fable 5 both took that route blind.
  - Rewrite rubric: MUST = Filter re-surfaced as always-visible switch/radio surfaces on the example's wiring (legacy presentation kept); sort/load-more still from catalog/custom. MUST NOT = keeping the dropmenu presentation, hand-composing a toggle. Content Switcher no longer the expected answer.
- [ ] **3. Baseline updates (same `evolve`).** All five 2026-08-10 same-file runs:
  - The sweep: fable 5 / opus 5 / sonnet 5 per the sweep report's scoreboard (incl. sonnet 5's S6, S25b, S31, S33 material misses).
  - The 4.x full runs' queued notes (S14/S25/S28 solo re-probes — listed in each report's "Baselines to update" section).
  - Overwrite `last-evaluated.md` only after the S31 edit lands (it changes the file).
- [ ] **4. Optional, cheap:** solo re-probe sonnet-tier S6 + S25b before recording them as more than batch noise (sonnet 4.6 already solo-PASSed S25 same day).

Order: 1 before 3's `last-evaluated.md` overwrite; 2 and 3 ride one `evolve`.

## Field triage 2026-08-10 — accepted items (report: `.claude/skills/nds-iq-eval/reports/field-triage-2026-08-10.md`; review verdict: 8/11 hold, R2.7 tempered, R2.6 rejected, R1.3c/R2.4-sentence parked)

**Source fixes**

- [x] **R2.1 — accordion `destroy()` leaves the container un-recreatable.** Verified exact: `_js/nds-accordion.js:322-329` clears button marks but not `container.ndsAccordion` (:372) or the init stamp (:374), so `create()` (:388) and init (:346) hand back a dead controller. Fix: 2 lines in `destroy()` — delete the backref, remove the attribute. Then audit the same shape on Filter, Pagination, Modal, Autocomplete, Upload.
- [x] **Custom Select canonical option shape — source + demo (arose from S29, 2026-08-11).** The flat `<span class="nds-option-text">Label</span>` shape had no home for a description line, leaving the doc under-determining. New canon nests `.nds-label` inside `.nds-option-text`, with optional `.nds-description` alongside. Backward-compatible via `optionLabel()` fallback to `.textContent`, so existing consumers see no change. Files: `_js/nds-customselect.js` (helper + two callsites), `_sass/components/_forms.scss` (`.nds-option-text` flex-column), `components/forms.md` (all four demo options restructured; Option 3 shows the rich shape with `hgi-tag-01`). Verified end-to-end in browser: 3 picks × 3 events, all label-only payload. Bumped `updated: 1.7.x-dev`. CHANGELOG entry batched for the next release build (Changed section).
- [x] **R2.7 CLOSED — ghost item, no work needed.** Full re-verify 2026-08-11 against `_js/nds-loader.js:986-1044`, `_js/nds-accordion.js:346-348`, and `_js/nds-loader.js:130-137`. Axis 1 (missing registrations) is mostly wrong: **Accordion = already covered** via the scanner path (init on a live root calls `container.ndsAccordion.refresh()`, adopts new items); **Tables = deliberately not covered** (`_js/nds-loader.js:130-137`: *"No refresh hook on purpose. Re-applying an active sort here was tried and REVERTED"*); **Autocomplete/Upload/Forms** have no real consumer scenario for "refresh this existing widget" (their state is per-instance — typing history, upload queue). Axis 2 (mode gaps in Filter/Pagination) is design-correct, not gap: Filter skips AJAX mode because server owns the result set (NDS-IQ mandate — no AJAX-filter re-emit); Pagination.refresh is auto-only because server pagination must not be re-sliced. Consumer-effect claim ("walks past most components silently") is overstated — on a server-driven page with swapped rows, `refresh(container)` wires new dropmenus/formatters/copy buttons/form controls, adopts new accordion items, updates Selection counts, and re-resolves Filter items. Doc-framing sub-claim is already handled: `core/refresh.md` has an explicit "Server-Driven Lists" section naming exactly the safe-by-design behaviors. Authoritative model = loader.js:986-1044's owner/scanner split — the doc/comment already accurate. **Do not re-propose without a specific component genuinely broken by refresh — the abstract "coverage" framing was born from misreading "no `refresh:` field = no participation".**

**Rules-file sentences (batch with the S31 v8 edit above — one counter bump covers all; scenario lands BEFORE each sentence)**

- [ ] **R1.1 — CSP head-script grant, one line** under "Include on every page". Install-time silent fail on `script-src 'self'`; the design already exists (CHANGELOG L42). Scenario first: **S44 install-strict-csp**.
- [ ] **R1.2 — upgrade step 3 also sweeps `### Added` / `### Changed` / `### Fixed`.** Accept the direction, TRIM the report's proposed text (no new "adoption-opportunities table" — extend the existing step, dev's call on adoption stays). Scenario first: **S45 upgrade-Added-sweep**.
- [ ] **S46 list-with-controls-toolbar — scenario as a GATE, not a sentence.** `components.yml:866` Toolbar `use_when` already names the job and the parts-inventory rule already forces the catalog match. Draft + run S46; only if it FAILS does R2.4's rules sentence land. The doc cross-refs (search-box/filter/pagination pages → toolbar) are docs work regardless.

**Banner gaps (queue with the banner cycle)**

- [ ] **R1.3a** — filter banner Gotcha: manual markup must mirror the `_buildFilterInput` DOM shape (`_js/nds-filter.js:2151`); same pattern check for `nds-tables.js`.
- [ ] **R1.3b** — filter banner: name `data-filter-submit` form-mode (server-paged native submit) with a two-line example.

**Docs batch (next doc pass)**

- [ ] **R2.2** — server-driven manage-records wiring (new example page or a Server-driven section in `components/pagination.md`). New example = source work: playground before docs.
- [x] **R2.3** — one line in `components/pagination.md`: container/item markers are canonical for both modes; `data-auto-pagination` is what triggers client slicing.
- [x] **R2.5** — cross-ref `nds-empty` / `data-empty-message` from the server-pagination section.
- [x] **R2.8 CLOSED — collapses with R2.7.** Field-triage gated R2.8 on R2.7 registering refresh hooks universally, then adding a "per-component pointer noting refresh() vs destroy() + create() vs NDS.Init.refresh()". With R2.7 CLOSED, R2.8 has no work: `NDS.Init.refresh(container)` covers in-container changes (scanner path delegates to `instance.refresh()` where present, wires new inline components everywhere). `core/refresh.md:202` already covers the destroy-before-remove case ("Tear down what you remove before you remove it"). A destroy+create recipe is speculative — no NDS component documents a real consumer case that neither refresh nor the tear-down bullet handles. **Do not re-propose without a specific case the current framing doesn't cover.**

**Rejected / parked — do not re-propose without new evidence**

- **R2.6 (NDS.request "prefer" → mandate): REJECTED.** S34 tests exactly this and passed on all five 2026-08-10 runs (Sonnet 4.6, Opus 4.7, Fable/Opus/Sonnet 5) — current wording already produces the refusal. The report's proposed S-raw-fetch-refusal scenario is S34; no new scenario, no sentence.
- **R1.3c (canonical > minimum-diff tiebreaker): PARKED.** S30 + S16 passed 3/3 on 2026-08-10; no field failure named. Revisit only on a real failure.
- **Numbering:** the report's S43-S47 collide with S43 floor-vs-mature-install (below); renumbered here to S44-S46, with two of the five dropped per the rejections.

## Backlog (carried from the v7 plan's Post-1.7.0 list, 2026-08-10 — no date attached)

**Verification debt** (context: behavior mode's first run found a capability lean comprehension can't see; full arc in the v7 plan, line ~101)

- [ ] **S1's fixture conflates two scenarios.** Adding `Dashboard.cshtml` + `Settings.cshtml` to `mini-app` (needed by S25 and S27c) gave S1's project a mature-adopted-install signal it was never designed to carry — the agent cited the mature-install rule by name to skip the plan, then demoted the floor. Give S1 its own bare fixture, or accept the conflation deliberately and say so in the scenario.
- [ ] **NEW SCENARIO worth writing: floor vs mature install.** A stale sub-floor runtime under pages that look adopted — two rules apply and the floor lost. Highest-value scenario the behavior session produced. (Was pencilled as S42, but S42 is now `setup-prompt-first-install` — this lands as S43.)

**Doc gap**

- [x] **S29 stays open.** Two sonnet runs split on whether a coloured dot plus a description line inside `.nds-select-option` is free content or invented markup. Both readings follow the text, so the scenario is under-determined by `components/forms.md`, which demos no option with anything beside the label. One demo there settles it — a doc fix at the point of copy, per the cause-removal ladder, NOT a rules edit. Re-baseline S29 after. *(Fixed 2026-08-11: canonical option shape now nests `.nds-label` inside `.nds-option-text`, with optional `.nds-description` alongside; Option 3 in the Custom Select demo shows the rich shape with an `hgi-tag-01` icon. JS reads `.nds-label` first and falls back to `.textContent`, so the flat shape stays valid — verified in browser: all three picks read the label only, no description leakage. Re-baseline S29 next eval cycle.)*

**Artifact + hygiene**

- [ ] **Behavior-mode runners are not neutral.** S25 annotated its uncertainty with `ponytail:` comments — the host session's persona reaching the runner through the shared system prompt. Every graded behavior was still an NDS-IQ one so nothing is invalidated, but `SKILL.md` assumes clean runners and does not say to check for host-persona bleed.
- [x] **Drop the version banner from docs-only bundles.** `_plugins/js_processor.rb:51-55` sends `nds-showcase.js` + both event themes to `docs-assets/`, but they still get the `_config.yml` version stamped into their banner — so every version bump dirties three files that never ship to a consumer. Skip the banner for anything in `@output_overrides` (`assets/js/nds-accessibility.min.js` keeps it — that one IS a shipped add-on).
- [x] **Release notes and CHANGELOG can diverge with nothing checking them — CLOSED, YAGNI.** Considered 2026-08-11: built `scripts/check-release-body.py`, then reverted after cost-benefit review. Releases are monthly-ish, one author, one session — the trim happens right after writing CHANGELOG with AGENTS.md's "never trim a migration step" rule in front of them. A check that has to shell out to `gh` and be manually invoked shares the same "author has to remember" failure mode as the invariant it enforces. Cost of a miss = consumer opens an issue, author fixes body in 30 seconds. Cost of the script = maintenance + a check nobody remembers to run. Full reasoning in `~/.claude/projects/…/memory/feedback_no_script_for_rare_human_error.md`. **Do not re-propose without a real drift incident naming a released version.**
