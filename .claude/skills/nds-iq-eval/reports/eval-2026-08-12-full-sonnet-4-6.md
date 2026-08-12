# Full-mode eval — 2026-08-12 (sonnet 4.6)

- **Mode:** `full` (44 comprehension scenarios, single batch)
- **Model:** `claude-sonnet-4-6` (runner self-report). The `sonnet` alias served 4.6 today, not Sonnet 5. Recorded per the standing note that aliases resolve differently across machines/dates.
- **File state:** `_includes/NDS-IQ.md` byte-identical to `last-evaluated.md` (no file change since the 2026-08-12 Sonnet 5 baseline run — same shipped v0.8 / template 1.7.1 text).
- **Runner:** one fresh `general-purpose` agent, sonnet override; batch (one turn).
- **Tool calls:** 1 total (the rules file itself) — zero routed reads, same shape as the 2026-08-12 Sonnet 5 batch.

## Verdict

44/44 answered. **Zero CONFIRMED rules-text findings.** All divergences resolve to one of three known mechanisms and none warrants a file edit.

Companion to the 2026-08-12 Sonnet 5 baseline (scenarios.md paragraph 25) — not a replacement. Sonnet 4.6 is a weaker tier (2026-08-10 sweep: 22/40 vs Sonnet 5's 29/40 pre-v0.8), so a 4.6-only miss on a scenario Sonnet 5 clears is expected tier variance, not a text defect.

## Scoreboard

| Bucket | Count | Scenarios |
|---|---|---|
| Clean PASS | ~29 | S5, S7, S9, S10, S11, S12, S15, S16, S17, S19, S21, S22, S23, S24, S26, S30, S32, S33, S34, S35, S36, S38, S40, S41, S44, S45, S46, S47 |
| SOFT — batch no-read (route right, fact-from-read missing) | ~12 | S1, S2, S6, S8, S14, S20, S25, S28, S29, S31, S37, S39 |
| SOFT — 4.6 tier judgment on ambiguous prose | 4 | S3, S4, S13, S18(b) |

### Batch no-read pattern (SOFT bucket)

Same mechanism the 2026-08-12 Sonnet 5 batch surfaced and the SKILL.md step-3 grading rule now hardens: **a read-dependent rubric is gradable only from a scoped or solo run; a batch miss on one is presumed harness behavior until a solo run repeats it.** Held here across every read-gated MUST:

- S6: routed to forms banner, did not name `syncState`.
- S14: routed to filter/pagination/core banners, did not name `updateRecords` / `nds:pagination:change` / `data-filter-action="reset"` / `data-ajax`.
- S25: routed to multiselect banner, did not name `nds:multiselect:change` or `populate()`.
- S28: routed to catalogs, landed on `console-demo.md` from memory rather than `manage-records.md`.
- S29: routed to components.yml, picked `custom-select` correctly but named `_source/components/custom-select.md` rather than `forms.md#selectDropdown`.
- S31: routed to catalog, did not name Date Picker / Content Switcher explicitly.
- S37: routed to `_source/core/refresh.md`, said `NDS.refresh()` rather than `NDS.Init.refresh(container)`.
- S39: routed to `utilities/copy.md`, did not pick the `data-copy-target` variant.

None of these need a file edit — the routes are correct, the facts live one read away.

### 4.6 tier judgment (SOFT — solo-verified two)

- **S3** — SOLO REPRODUCED. Compare-only against the prompt "our NDS instructions feel old — update them", stopped at "already current" without running step 4. Cited line 225's update-check sentence rather than line 230's step-4 refresh. **Text supports both readings** (line 225 sanctions "update check alone"; line 230 says step 4 is "always safe"), 4.6 chose the conservative check-only path. Sonnet 5 in the 2026-08-12 batch cleared this. Not a text defect on face — a stronger-tier interpretation.
- **S4** — SOLO PASS. Refresh ran unconditionally: raw download → first-line check → whole-file replace; runtime gap reported separately as dev's call. The batch miss WAS batch pressure from S3's compare-first framing bleeding forward. Grading rule held.
- **S13** — added a step-1 inventory to the spike despite quoting the "A spike needs no plan" sentence verbatim. Contradiction within the same answer; agent noise, not rules defect.
- **S18(b)** — treated NDS work as blocked pending upgrade approval when part (a) had just installed v1.6.0. Internal inconsistency within the same answer; agent noise.

## Findings

None. Nothing proposed for `_includes/NDS-IQ.md`.

Two watch items carried forward for the next Sonnet 5 run:

- **W1** — if a Sonnet 5 solo also reproduces the S3 compare-first routing, the "update them" ask is bleeding into the check path; fix would be scenario-first (disambiguate the prompt) or a one-line tightening on line 225 to route explicit update asks straight to step 4.
- **W2** — the batch no-read pattern is now confirmed across two model tiers (Sonnet 5, Sonnet 4.6) on the same shipped v0.8 text. The 2026-08-12 grading rule holds — no further reinforcement needed, but this run is corroborating evidence.

## Resolution

No file edits. No scenario edits. No baseline updates written to `scenarios.md` (no `evolve` ask).

This report exists as a 4.6-tier data point beside the 2026-08-12 Sonnet 5 baseline, so a future comparison across tiers on the same file state has both numbers to work from.
