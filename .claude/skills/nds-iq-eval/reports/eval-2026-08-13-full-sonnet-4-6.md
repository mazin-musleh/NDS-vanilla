# Full-mode eval — 2026-08-13 (sonnet 4.6, v0.9)

- **Mode:** `full` (51 comprehension scenarios; three parallel batches of 17/17/17 to reduce the batch no-read pressure the 2026-08-12 full run surfaced)
- **Model:** `claude-sonnet-4-6` (runner self-report, all three batches). The `sonnet` alias served 4.6 today. Recorded per the standing note that aliases resolve differently across machines/dates.
- **File state:** `_includes/NDS-IQ.md` differs from `last-evaluated.md` by ONE sentence — the v0.9 strengthening of the "The source answers before the dev does" bullet (Workflow step 1), which now (a) covers questions the agent asks the dev AND questions the dev asks the agent (was: only agent-to-dev), and (b) states the discipline holds "at every step, not only at this review" (was: implicit). This is the edit that lands 2026-08-12's field-triage R7 ("Source answers before dev does" reads as a rule about questions, not about fixes), and it's what S52 exists to guard.
- **Runners:** three fresh `general-purpose` agents, `sonnet` model override, parallel spawn. Each batch = one turn.
- **Tool calls:** 1 per batch (the rules file itself) — zero routed reads, same shape as the 2026-08-12 full batch. The 3-batch split did not increase read-pressure enough to trigger routed reads at the batch tier.

## Verdict

51/51 answered. **Zero CONFIRMED rules-text findings.** The v0.9 target sentence held on its guard scenario (S52): runner explicitly said "Before answering, read `NDS_ROOT/_source/ui-shell/head.md`… The rules direct me to read the source before answering the dev" and named the nonce/hash pair from NDS's own position rather than opening a decision matrix. That's the exact behavior 2026-08-12's field-triage R7 was written to fix.

All divergences resolve to the same known mechanism (batch no-read on read-dependent rubrics) or one known under-determination (S29's doc gap, tracked). None warrants a file edit.

## Scoreboard

| Bucket | Count | Scenarios |
|---|---|---|
| Clean PASS | 46 | S1, S2, S3, S4, S5, S7, S8, S9, S10, S11, S12, S13, S15, S16, S17, S18, S19, S20, S21, S22, S23, S24, S25, S26, S28, S30, S31, S32, S33, S34, S36, S38, S39, S40, S41, S44, S45, S46, S47, S48, S49, S50, S51, S52, S53, S54 |
| SOFT — batch no-read (route right, fact-from-read missing) | 4 | S6, S14, S35, S37 |
| SOFT — S29 doc gap (open since 2026-08-10 sweep) | 1 | S29 |

### Batch no-read pattern (SOFT bucket)

Same mechanism the 2026-08-12 full batch surfaced and the SKILL.md step-3 grading rule now hardens: **a read-dependent rubric is gradable only from a scoped or solo run; a batch miss on one is presumed harness behavior until a solo run repeats it.** Held here across every read-gated MUST:

- **S6** — routed to `nds-forms.js` banner and cited the "forms has `initializeContainer` and no reinit at all" rule correctly. Named `initializeContainer` for the region reinit. Did not name `syncState` explicitly for the JS-set input values (rubric fact from the banner's Methods section). Route is right; the read didn't happen.
- **S14** — routed to `nds-filter.js`, `nds-pagination.js`, and `nds-core.js` banners; named `NDS.request` for the fetch wrapper; correctly refused to hand-write `fetch`. Did not name `updateRecords` / the exact `nds:filterFormAjax` event / `data-filter-action="reset"` from the banners themselves. On the Enter-key stop, proposed the raw `onsubmit="return false"` fallback if the banner offers no hook — that's the rule working (leave a comment + `NDS-REPORT.md` entry when the surface is unclear), not a defect.
- **S35** — routed to `nds-forms.js` banner and named `NDS.Forms.validateForm(container)` / `NDS.Forms.initializeContainer(el)` as the likely calls, then explicitly flagged UNDEFINED on the exact method name pending the read. Route is right; the "wire the Submit button's `click` to call the container-validation method" reasoning is exactly what the rubric asks for.
- **S37** — routed to `nds-core.js` banner and the Reference index's `_source/core/refresh.md`. Named `NDS.refresh()` rather than the routed doc's `NDS.Init.refresh(container)` shape. Same route, wrong dotted name — the routed read would deliver the exact call.

None of these need a file edit — the routes are correct, the facts live one read away.

### S29 doc gap (open since 2026-08-10)

Same shape as the 2026-08-10 sweep's finding: runner ran the catalog check correctly on `use_when`, named custom-select as the answer with an "or the select component" hedge, then noted the read of `custom-select.md` (or `forms.md#selectDropdown`) would confirm. Under-determined by the doc — `components/forms.md`'s select block demos no option with anything beside the label — not a rules gap. The recorded fix (add a demo showing rich options at the point of copy) hasn't landed yet; that keeps this a soft, not a finding.

## Findings

None. Nothing proposed for `_includes/NDS-IQ.md`.

**One positive-result callout worth stamping:**

- **S52 confirms the v0.9 edit worked as designed.** The strengthened "source answers before the dev does" sentence — which the 2026-08-12 field-triage R7 was written to prompt — took the runner directly to `_source/ui-shell/head.md` on a CSP question, and the runner explicitly said "I answer from the source's position, not from speculation." That is the behavior R7 called for, on the exact scenario type (CSP conflict) R7 was born from. Two additional firings elsewhere in the batch corroborate the strengthening propagates:
  - **S44 (install-strict-csp)** — runner named both the head unit's inline-script CSP trap AND the inline `style="--…"` knob CSP trap (rule #5's Component-knobs bullet), before proposing any pages; that dual naming is the "read the source's own CSP position" discipline firing.
  - **S31 (catalog check as precondition)** — runner refused the dev's "just use a native date input" claim AND their "pretty sure NDS has nothing" claim, citing the same principle: source answers before dev does, at every step.

Two watch items carried forward for the next Sonnet 5 comparison:

- **W1** — the batch no-read pattern is now confirmed across three runs (2026-08-12 Sonnet 5 batch, 2026-08-12 Sonnet 4.6 batch, 2026-08-13 Sonnet 4.6 3-batch split). Splitting one batch of 44 into three batches of 17 did NOT trigger routed reads at the batch tier — the split has to be smaller or the reads have to be prompted separately. This is worth naming in the harness if a future full run wants to grade read-gated MUSTs at batch scope; today's grading rule (presume harness behavior on a batch miss) stands unchanged.
- **W2** — S29's doc gap has held across three sweeps now. The recorded fix (a rich-option demo in `components/forms.md`'s select block) hasn't landed. If Sonnet 5 also softs S29 on the next comparison, the doc fix moves from "queued" to "blocking the re-baseline".

## Resolution

No file edits. No scenario edits. No baseline updates written to `scenarios.md` (no `evolve` ask). `last-evaluated.md` not overwritten (no `evolve` ask; SKILL step 6).

This report exists as the v0.9 4.6-tier data point on the first file state where the "source answers" strengthening has been evaluated. A future Sonnet 5 full run on the same v0.9 text would sit beside it as the comparison pair, and would upgrade S6/S14/S35/S37 grades to real facts (the stronger tier does not batch-flatten routed reads to the same degree).
