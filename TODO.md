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

- [ ] **R2.1 — accordion `destroy()` leaves the container un-recreatable.** Verified exact: `_js/nds-accordion.js:322-329` clears button marks but not `container.ndsAccordion` (:372) or the init stamp (:374), so `create()` (:388) and init (:346) hand back a dead controller. Fix: 2 lines in `destroy()` — delete the backref, remove the attribute. Then audit the same shape on Filter, Pagination, Modal, Autocomplete, Upload.
- [ ] **R2.7 TEMPERED — refresh coverage is a docs/framing fix first, not a blanket registration.** Real gap: `core/refresh.md` + CHANGELOG say "the one call" while participation is registry-opt-in and mode-gated. Fix: name which components participate and which modes they cover, in the doc + CHANGELOG framing. Per-component registrations are case-by-case ONLY: **Tables = never** (tried & REVERTED, `_js/nds-loader.js:130-137` — server-sorted pages get re-ordered client-side); **no AJAX-filter re-emit** (server owns the result set; NDS is UI-only); Forms registration is a design discussion, and if it lands it flips S6's rubric (2026-08-10 sweep graded four models wrong for answering `Init.refresh` there).

**Rules-file sentences (batch with the S31 v8 edit above — one counter bump covers all; scenario lands BEFORE each sentence)**

- [ ] **R1.1 — CSP head-script grant, one line** under "Include on every page". Install-time silent fail on `script-src 'self'`; the design already exists (CHANGELOG L42). Scenario first: **S44 install-strict-csp**.
- [ ] **R1.2 — upgrade step 3 also sweeps `### Added` / `### Changed` / `### Fixed`.** Accept the direction, TRIM the report's proposed text (no new "adoption-opportunities table" — extend the existing step, dev's call on adoption stays). Scenario first: **S45 upgrade-Added-sweep**.
- [ ] **S46 list-with-controls-toolbar — scenario as a GATE, not a sentence.** `components.yml:866` Toolbar `use_when` already names the job and the parts-inventory rule already forces the catalog match. Draft + run S46; only if it FAILS does R2.4's rules sentence land. The doc cross-refs (search-box/filter/pagination pages → toolbar) are docs work regardless.

**Banner gaps (queue with the banner cycle)**

- [ ] **R1.3a** — filter banner Gotcha: manual markup must mirror the `_buildFilterInput` DOM shape (`_js/nds-filter.js:2151`); same pattern check for `nds-tables.js`.
- [ ] **R1.3b** — filter banner: name `data-filter-submit` form-mode (server-paged native submit) with a two-line example.

**Docs batch (next doc pass)**

- [ ] **R2.2** — server-driven manage-records wiring (new example page or a Server-driven section in `components/pagination.md`). New example = source work: playground before docs.
- [ ] **R2.3** — one line in `components/pagination.md`: container/item markers are canonical for both modes; `data-auto-pagination` is what triggers client slicing.
- [ ] **R2.5** — cross-ref `nds-empty` / `data-empty-message` from the server-pagination section.
- [ ] **R2.8** — replace-and-reinit recipe; shape depends on R2.7's outcome.

**Rejected / parked — do not re-propose without new evidence**

- **R2.6 (NDS.request "prefer" → mandate): REJECTED.** S34 tests exactly this and passed on all five 2026-08-10 runs (Sonnet 4.6, Opus 4.7, Fable/Opus/Sonnet 5) — current wording already produces the refusal. The report's proposed S-raw-fetch-refusal scenario is S34; no new scenario, no sentence.
- **R1.3c (canonical > minimum-diff tiebreaker): PARKED.** S30 + S16 passed 3/3 on 2026-08-10; no field failure named. Revisit only on a real failure.
- **Numbering:** the report's S43-S47 collide with S43 floor-vs-mature-install (below); renumbered here to S44-S46, with two of the five dropped per the rejections.

## Backlog (carried from the v7 plan's Post-1.7.0 list, 2026-08-10 — no date attached)

**Verification debt** (context: behavior mode's first run found a capability lean comprehension can't see; full arc in the v7 plan, line ~101)

- [ ] **S1's fixture conflates two scenarios.** Adding `Dashboard.cshtml` + `Settings.cshtml` to `mini-app` (needed by S25 and S27c) gave S1's project a mature-adopted-install signal it was never designed to carry — the agent cited the mature-install rule by name to skip the plan, then demoted the floor. Give S1 its own bare fixture, or accept the conflation deliberately and say so in the scenario.
- [ ] **NEW SCENARIO worth writing: floor vs mature install.** A stale sub-floor runtime under pages that look adopted — two rules apply and the floor lost. Highest-value scenario the behavior session produced. (Was pencilled as S42, but S42 is now `setup-prompt-first-install` — this lands as S43.)

**Doc gap**

- [ ] **S29 stays open.** Two sonnet runs split on whether a coloured dot plus a description line inside `.nds-select-option` is free content or invented markup. Both readings follow the text, so the scenario is under-determined by `components/forms.md`, which demos no option with anything beside the label. One demo there settles it — a doc fix at the point of copy, per the cause-removal ladder, NOT a rules edit. Re-baseline S29 after.

**Artifact + hygiene**

- [ ] **Behavior-mode runners are not neutral.** S25 annotated its uncertainty with `ponytail:` comments — the host session's persona reaching the runner through the shared system prompt. Every graded behavior was still an NDS-IQ one so nothing is invalidated, but `SKILL.md` assumes clean runners and does not say to check for host-persona bleed.
- [ ] **Drop the version banner from docs-only bundles.** `_plugins/js_processor.rb:51-55` sends `nds-showcase.js` + both event themes to `docs-assets/`, but they still get the `_config.yml` version stamped into their banner — so every version bump dirties three files that never ship to a consumer. Skip the banner for anything in `@output_overrides` (`assets/js/nds-accessibility.min.js` keeps it — that one IS a shipped add-on).
- [ ] **Release notes and CHANGELOG can diverge with nothing checking them.** The notes are the CHANGELOG structure trimmed by significance (13,752 chars → ~6K for 1.7.0); AGENTS.md records the risk and says write the notes last. A `verify()` guard asserting every `### Migrating` bullet appears in the release body would make it mechanical.
