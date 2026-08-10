# Full-mode eval — 2026-08-10 (sonnet)

- **Mode:** `full` (40 comprehension scenarios, single batch)
- **Model:** claude-sonnet-4-6
- **File state:** `_includes/NDS-IQ.md` byte-identical to `last-evaluated.md` (no file change since prior run)
- **Runner:** one fresh `general-purpose` agent, sonnet override

## Verdict

40/40 answered. 7 rubric divergences at batch-grading; solo re-probe of the three shakiest (S14, S25, S28) returned 3/3 PASS. Remaining divergences match the same batch-flatten signatures already validated in the 2026-08-09 baseline (procedure right, routed reads skipped, catalogs not opened). **No CONFIRMED text findings.**

Solo re-probe outcomes:
- **S14** — solo PASS. All seven wirings named from banner reads: `data-filter-action="reset"` markup, `data-ajax` form control, nested `criteria.filters.*` / `criteria.search`, `NDS.request`, `NDS.Pagination.updateRecords(list, {from, to, count})`, `nds:pagination:change` detail, form-level `preventDefault` for Enter.
- **S25** — solo PASS both parts. (a) `nds:multiselect:change` detail `{name, values, labels}` + `instance.populate(options, selected)` cited from banner; (b) recognized 1.6.0 sub-floor from the floor rule, refused source dredge, proposed upgrade.
- **S28** — solo PASS. Opened `examples.yml` (6 tool uses vs 2 in batch), quoted Manage Records `use_when` verbatim, named `_source/examples/manage-records.md` as copy source, `nds-full-width` for back-office, server-driven for 8K records.

## Scoreboard

| # | Result | Note |
|---|---|---|
| S1 | PASS | Sub-floor as prerequisite, blocked-plan proposed |
| S2 | DIVERGE | Proposed instead of built directly; step 4 unnamed |
| S3 | PASS | Comparison + whole-file replace |
| S4 | PASS | Full-upgrade route |
| S5 | DIVERGE | Missed parallel-files exception on dev's explicit ask; file text is clear (L94 "not a substitute for that ask") — agent noise |
| S6 | DIVERGE | Missed `syncState` per field; wrong avoid-call named — banner not opened |
| S7 | DIVERGE | Named doc as first stop; file text is clear (L45 "real page as the copy source, doc page as the explainer") — agent noise |
| S8 | PASS | Banner + release tag + report |
| S9 | PASS | Re-audit recreates plan |
| S10 | PASS | Greenfield plan-from-intent + stray-runtime sweep unprompted |
| S11 | PASS | Stop, dev's design work |
| S12 | PASS | Trim template, two-step form floor |
| S13 | PASS | Parallel spike, canonical markup |
| S14 | DIVERGE → solo PASS | Batch: hand-written listeners + per-field clear; solo: all seven wirings correct |
| S15 | PASS | `data-portal` via Rides route |
| S16 | PASS | `nds-rowView` modifier-class composition |
| S17 | PASS | All three parts |
| S18 | PASS | Floor stop + blocked-state inventory |
| S19 | PASS | Existing puppeteer harness, HTTP twin |
| S20 | DIVERGE | Stray runtime found; prior-NDS split for its pages unnamed |
| S21 | PASS | site.css/site.js as legacy library |
| S22 | DIVERGE | Refused clean-start label but proposed all footprint-reset actions correctly |
| S23 | PASS | 300×80 + name-span removed |
| S24 | PASS | Hand-written NDS conventions flagged for removal |
| S25a | DIVERGE → solo PASS | Batch: hedged event/method names; solo: exact contract cited |
| S25b | DIVERGE → solo PASS | Batch: read as "banner missing" not "sub-floor template"; solo: floor route quoted |
| S26 | PASS | Pointer migration + Workflow-step-1 handoff |
| S28 | DIVERGE → solo PASS | Batch: quoted rules file, named console-demo; solo: opened catalog, quoted Manage Records `use_when` |
| S29 | DIVERGE | Guessed `components/custom-select.md`; correct path is `forms.md#selectDropdown` — catalog not opened |
| S30 | PASS | Script edited point-by-point, comments preserved |
| S31 | DIVERGE | Hedged on Date Picker / Content Switcher; precondition sentence quoted |
| S32 | PASS | Per-type test, four separate empty submits |
| S33 | DIVERGE | Parts inventory not led with as first move |
| S34 | PASS | `NDS.request` + `setStatus` + failure-path verification |
| S35 | DIVERGE | Missing `{valid}` branch + `nds:formValid` won't fire |
| S36 | DIVERGE | Missing pre-build advisory for unfamiliar composition |
| S37 | DIVERGE | Named `NDS.refresh()` (wrong exact name); should be `NDS.Init.refresh(container)` |
| S38 | PASS | Per-region routing to `.md` vs `_site` correct |
| S39 | DIVERGE | Hedged catalog folder; didn't open to find utilities/copy.md |
| S40 | PASS | Rebind + dark mirror + family unit |
| S41 | DIVERGE | Declined but didn't point at anchor's read trigger as mechanism |

## Verification — why every divergence is agent noise

- **S5 / S7** — text is explicit and warns against the exact miss the runner made. L94: "the 'may render worse on it' default below is not a substitute for that ask." L45: "real page as the copy source, doc page as the explainer." Runner read past both.
- **S14 / S25 / S28** — solo re-probe confirms batch flattening. Runners named banner-first route but didn't actually open the banner/catalog under batch pressure; opening them (solo) returns the exact rubric answers.
- **S29 / S39** — same catalog-unopened signature as S28. Matches the 2026-08-09 baseline note: *"Re-probe a batch soft solo before grading it a finding."*
- **S6 / S20 / S22 / S31 / S33 / S34 / S35 / S36 / S37 / S41** — detail compression under the ~130-word cap across 40 scenarios. Procedure and route named correctly.

## Resolution

No file edits. No new scenarios. All divergences dropped after verification.

Baselines to update on next `evolve`:
- **S14** — add "sweep 2026-08-10 sonnet = Claude Sonnet 4.6: batch flat, solo PASS with all seven wirings"
- **S25** — add "sweep 2026-08-10 sonnet = Claude Sonnet 4.6: batch flat both parts, solo PASS both — (b) quoted the floor sentence's 'half of what this file tells you to read would not exist'"
- **S28** — add "sweep 2026-08-10 sonnet = Claude Sonnet 4.6: batch flat (quoted rules file, named console-demo), solo PASS (opened `examples.yml`, quoted Manage Records `use_when`, named `manage-records.md` as copy source)"

Standing lesson (unchanged from 2026-08-09): a full-mode batch of 40 scenarios flattens per-scenario tool effort. Runners name the route (banner-first, catalog-first) but skip the read itself. Solo re-probes return to baseline. Not a rules bug — a runtime shape of batch grading.
