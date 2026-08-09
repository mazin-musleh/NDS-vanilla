# Full-mode eval — 2026-08-09 (sonnet)

- **Mode:** `full` (31 comprehension scenarios, single batch)
- **Model:** sonnet v4.6
- **File state:** `_includes/NDS-IQ.md` byte-identical to `last-evaluated.md` (no file change since prior full run this same day)
- **Runner:** one fresh `general-purpose` agent, sonnet override

## Verdict

31/31 answered. 8 rubric divergences on grading; after solo re-probe of S5/S16/S28/S29, verification classifies 6 as agent noise (batch-flatten: routed reads skipped, catalogs not opened) and 2 as CONFIRMED text-clarity issues (S5, S16).

Solo re-probe outcomes:
- **S5** — repeated FAIL; runner quoted the exception sentence and still read it as a general prohibition. **CONFIRMED text issue.**
- **S16** — repeated FAIL; runner planned to hunt built twin for a horizontal-card code block, refused to compose the modifier from the reference table. **CONFIRMED text issue.**
- **S28** — soft on solo too (catalog not opened, named console-demo from rules text instead of manage-records from catalog). Procedure right. Watch, not fix.
- **S29** — solo PASS, full path named. Batch-flatten noise confirmed.

## Scoreboard

| # | Result | Note |
|---|---|---|
| S1 | PASS | Floor named as prerequisite, inventory proposed |
| S2 | PASS | Archetype tier picked |
| S3 | PASS | Comparison, no action |
| S4 | PASS | Full upgrade proposed |
| S5 | **DIVERGE** | Went to clean-start-with-warning; missed parallel-files exception |
| S6 | DIVERGE | Didn't perform banner read → didn't name `syncState` / `form.reset()` |
| S7 | DIVERGE | Copied from `sidemenu.md`; rule #3 layout-coupled bullet was clear |
| S8 | PASS | |
| S9 | PASS | Re-audit recreates plan |
| S10 | PASS | Greenfield plan-from-intent |
| S11 | PASS | Stop, dev's design work |
| S12 | PASS | Trim template, two-step form |
| S13 | PASS | Parallel spike |
| S14 | DIVERGE | Banner read skipped → `preventDefault` not `data-ajax`, JS reset not `data-filter-action="reset"`, no `updateRecords` |
| S15 | PASS | `data-portal` via banner route |
| S16 | **DIVERGE** | Went to `_site` twin instead of composing `nds-rowView` onto vertical card |
| S17 | PASS | All three parts |
| S18 | PASS | Floor stop + blocked-state inventory |
| S19 | PASS | Harness used |
| S20 | DIVERGE | Assets dev's-call covered, `NDS_ROOT` restore + prior-NDS split not named |
| S21 | PASS | |
| S22 | PASS | Clean start with costs |
| S23 | PASS | 300×80 + name span removed |
| S24 | PASS | Conflict flagged with plan |
| S25a | DIVERGE | Banner read skipped → API names not cited |
| S25b | PASS | Floor route |
| S26 | PASS | Migration executed |
| S28 | DIVERGE | Landed on `console-demo`, not `manage-records`; hand-composed feature map |
| S29 | DIVERGE | Guessed `components/custom-select.md`; correct path is `forms.md#selectDropdown` |
| S39 | PASS | Utility routed correctly |
| S40 | PASS | Family rebind + dark mirror |
| S41 | PASS | Declined |

## Verification — why most divergences are agent noise

- **S6, S7, S14, S25a** — the file routes correctly (`read that component's banner`; `Copy these from a full page…`). The runner declared it would read but did not perform the routed read, so it could not name the exact API surface. Same batch-flatten pattern the S28 note in `scenarios.md` names.
- **S28, S29** — catalog-not-opened. Both previously PASS solo; both soft in this batch. Scenario guidance: *"Re-probe a batch soft solo before grading it a finding."*
- **S20** — runner covered the assets dev's-call branch but missed the `NDS_ROOT` restore branch that lines 22–25 make explicit. Text is clear.

## Findings worth discussing

### F1 — S5 parallel-files exception missed (CONFIRMED)

Runner defaulted to clean-start with the sub-floor upgrade blocker. Dev's ask ("keep old pages working while you rebuild new ones") is the exact trigger for the parallel-files knowing exception at line 94:

> Only a dev who needs the old UI serving mid-port picks parallel files, knowingly, with a second assets folder.

Both batch and solo runs quoted this exact sentence and still ruled parallel out. The exception is buried at the tail of a long paragraph that mostly says "no parallel." Read linearly, the "Only a dev who…" sentence reads like a further restriction on the default, not the branch that fits the ask.

**Proposed fix — surface the trigger before the paragraph turns on cost.** Move the exception up so the "needs the old UI serving mid-port" wording sits near the paragraph's top, before the clean-start costs, and phrase it as a routing sentence rather than a caveat. E.g. after "Legacy NDS rebuilds clean, not parallel," insert:

> The one exception is when the dev explicitly needs the old UI serving while the port runs — a live parallel copy, with a second assets folder, taken knowingly for those costs. Otherwise, propose the clean start:

Rest of the paragraph stays. Suite still passes S22 (default clean-start with plan-exists prior work), gains routing for S5's ask.

### F2 — S16 modifier-composition (CONFIRMED)

Runner refused to compose `nds-rowView` from the Modifier Classes reference table onto the copied vertical card. Both batch and solo runs treated the reference table as "not a copy source" and planned to hunt the built twin for a horizontal-card code block. Rule #3's sanctioned-edits list (asset-URL rewrites + content swaps) does not name modifier-class composition, so sonnet reads it as inventing markup.

**Proposed fix — add a third sanctioned edit in rule #3.** After the two existing sanctioned edits (asset-URL rewrites, content swaps), add:

> (3) modifier-class composition: adding a class documented in the component's own Modifier Classes reference table onto the copied base markup is not invention — the class is documented, and the composition is what the reference table exists for. The demo's runtime toggle produces the same result.

That specifically covers the "table lists it, no code block shows it" case and does not license adding undocumented classes.

## Resolution

Both fixes applied to `_includes/NDS-IQ.md`:

- **F1** — Rule-of-legacy-NDS paragraph reshaped. The parallel-files exception now sits after the "don't default to parallel" explanation, before the clean-start machinery kicks in, phrased as a branch that names the "may render worse" default as insufficient for the ask. The tail restatement was removed to avoid duplication.
- **F2** — Rule #3 sanctioned-edits list expanded from two kinds to three: modifier-class composition using a class documented in the component's Modifier Classes reference table is now explicitly named as a permitted edit.

**Scoped re-run 2026-08-09 (S5 + S16 + S22 as regression guard, sonnet):**

- **S5 PASS** — runner asked the branching question, named parallel files with second assets folder as one branch and clean-start with "may render worse" as the other; quoted the new "The one exception is when the dev explicitly needs the old UI serving" sentence verbatim.
- **S16 PASS** — routed through rule #3's new sanctioned edit (3) verbatim: *"sanctioned modifier-class composition (rule 3's third permitted edit type)."*
- **S22 PASS** — default clean-start path preserved; footprint listed, costs named, sub-floor upgrade flagged. F1 did not regress it.

Rubric cites in `scenarios.md` updated for S5 and S16 to match the new sentence text. `last-evaluated.md` snapshot updated to the post-fix file state.
