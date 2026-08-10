# Full-mode eval — 2026-08-10 (opus)

- **Mode:** `full` (40 comprehension scenarios, single batch)
- **Model:** claude-opus-4-7 (Opus 4.7 1M context)
- **File state:** `_includes/NDS-IQ.md` byte-identical to `last-evaluated.md` (same state as the 2026-08-10 sonnet run — direct comparison)
- **Runner:** one fresh `general-purpose` agent, opus override

## Verdict

40/40 answered. 9 rubric divergences at batch-grading; all trace to the same batch-flatten signatures (routed reads named but not opened) already validated in the sonnet run's solo re-probes. **No CONFIRMED text findings.** Opus resolved 7 scenarios that sonnet flat batch on: S5, S7, S22, S25b, S36, S39, S41 — the per-model diff is the sweep signal the skill's mode table names.

## Direct comparison to 2026-08-10 sonnet run

| Model | PASS | DIVERGE | Batch-pressure share |
|---|---|---|---|
| sonnet 4.6 | 22 | 18 | high (batch flat on 3 of 3 shakiest, solo → PASS) |
| opus 4.7 | 31 | 9 | moderate (7 sonnet-divergences resolved; 6 shared misses remain) |

### Scenarios opus PASS where sonnet DIVERGE

- **S5** parallel-files exception — opus quoted the exact "The one exception is when the dev explicitly needs the old UI serving" sentence and proposed parallel with second assets folder.
- **S7** layout-coupled copy source — opus routed to full page first, doc as explainer only.
- **S22** clean-start footprint — opus enumerated the whole footprint (assets, overrides, plan, runtime) and named costs.
- **S25b** sub-floor at wiring moment — opus cross-referenced the floor rule ("banners are what 1.7.0 introduced") from the wiring context without prompting.
- **S36** built-twin visual pass — opus added "look at the twin before AND after when the composition is new" (the pre-build advisory sonnet missed).
- **S39** utilities/copy path — opus named `NDS_ROOT/_source/utilities/copy.md` directly, no hedge.
- **S41** anchor-as-mechanism — opus explained WHY (drift, merge cost, session read is the mechanism), not just "refuse."

### Shared DIVERGE (batch-flatten pattern on both models)

- **S6** — `syncState` per-field detail missing on both
- **S14** — `data-filter-action="reset"` markup and `data-ajax` route missing; sonnet solo re-probe: PASS
- **S25a** — exact event `nds:multiselect:change {name, values, labels}` + method `populate(options, selected)` hedged; sonnet solo re-probe: PASS
- **S28** — quoted rules file instead of Manage Records catalog entry; sonnet solo re-probe: PASS
- **S29** — path `_source/components/forms.md#selectDropdown` guessed as `custom-select.md`
- **S37** — exact name `NDS.Init.refresh(container)` said as `NDS.refresh()`

Same known batch-pressure signatures. Solo re-probes on the three shakiest (S14/S25/S28) already cleared for sonnet; likely to clear for opus too.

### Opus-only regression

**S31 date-picker precondition** — opus wrote "Start date: `<input type="date">` — native and correct" without checking `components.yml`. Sonnet caught it: "Before assuming a native date input, check `components.yml` `use_when` fields for a date picker."

The rule text: *"'NDS has no X' is a claim you may only make after it"* — nets negative claims but not native endorsements. Opus's failure mode was endorsing the dev's suggestion, not making the negative claim the precondition targets. One data point; opus caught the toggle half of the same scenario correctly. Likely model variance, but worth watching if the pattern repeats.

## Scoreboard

| # | Result | Note |
|---|---|---|
| S1 | PASS | Sub-floor + conformance split |
| S2 | PASS | Archetype tier, no plan |
| S3 | PASS | Comparison + whole-file replace |
| S4 | PASS | Full upgrade route |
| S5 | PASS | Parallel-files exception cited verbatim |
| S6 | DIVERGE | `syncState` detail missing (shared with sonnet) |
| S7 | PASS | Full page first, doc as explainer |
| S8 | PASS | Banner + release tag |
| S9 | PASS | Re-audit recreates plan |
| S10 | PASS | Greenfield plan-from-intent |
| S11 | PASS | Stop, dev's design work |
| S12 | PASS | Trim + two-step form |
| S13 | PASS | Parallel spike |
| S14 | DIVERGE | Reset method hedged, Enter fix wrong (search inside `.nds-form` already); shared |
| S15 | PASS | `data-portal` via Rides |
| S16 | PASS | `nds-rowView` composition |
| S17 | PASS | All three parts |
| S18 | PASS | Floor + blocked-state inventory |
| S19 | PASS | Puppeteer harness |
| S20 | PASS | Stray runtime + dev's-call location |
| S21 | PASS | site.css/js as legacy library |
| S22 | PASS | Footprint enumerated with costs |
| S23 | PASS | 300×80 + name-span removed |
| S24 | PASS | Hand-written conventions flagged |
| S25a | DIVERGE | Event/method names hedged; shared |
| S25b | PASS | Sub-floor cross-reference in wiring context |
| S26 | PASS | Pointer migration + step-1 handoff |
| S28 | DIVERGE | Console-demo named, not Manage Records; shared |
| S29 | DIVERGE | Wrong path (`custom-select.md`); shared |
| S30 | PASS | Script edited point-by-point |
| S31 | **DIVERGE** | Native date input endorsed without catalog check (opus-only) |
| S32 | PASS | Per-type test |
| S33 | DIVERGE | Parts inventory not led with |
| S34 | PASS | `NDS.request` + failure path |
| S35 | DIVERGE | `<form>`-tags gate + `nds:formValid` won't fire missing |
| S36 | PASS | Pre-build twin advisory named |
| S37 | DIVERGE | `NDS.refresh()` (wrong exact name); shared |
| S38 | PASS | Per-region routing correct |
| S39 | PASS | `utilities/copy.md` named directly |
| S40 | PASS | Rebind + dark mirror + family unit |
| S41 | PASS | Refused with mechanism explanation |

## Verification

- **S5/S7/S22/S25b/S36/S39/S41** — opus resolved from same text sonnet flatted on. Confirms the sonnet divergences on these were agent noise (batch-pressure), not text ambiguity.
- **S6/S14/S25a/S28/S29/S37** — shared misses. Batch-flatten pattern independent of model tier. Solo re-probes already cleared 3 of these for sonnet; likely to clear for opus too.
- **S31 opus-only** — the rule's precondition sentence targets negative claims ("NDS has no X"), not native endorsements ("use native"). Text gap is plausible but single-datapoint. Not proposing a fix on one run.

## Resolution

No file edits. No new scenarios.

Opus baseline: **31/40 first-batch PASS, no CONFIRMED findings** — the strongest tier reads the file cleanly. Partial sweep with sonnet (22/40 first-batch, 3/3 solo re-probes PASS) confirms the file survives both tiers.

Standing note: the S31 date-picker native-endorsement case is worth revisiting if fable or a repeated run shows the same failure mode — a text hole in the precondition rule's coverage.
