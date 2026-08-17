# S32 required-field-type-verification


- mode: comprehension
- rules: step 4 behavioral pass — "A form with required fields of more than one component type gets each type tested empty, one by one: the fields render the same required mark, but each type validates through different code, so one passing field proves nothing about the next"
- provenance: Field Test 2 (2026-08-08, nds-test-app-5, sonnet): a booking form's required room select never blocked submit. The agent had tested the required date field empty, seen it block, and generalized from it — the two render an identical required mark, so the page looked verified. The gap was a real library bug in the same family as FV (forms validated the visible input, not the value carrier), which means this protocol also live-catches library-side validation defects, not only wiring mistakes.
- setup: Mature project. You have just built a booking page. Its form has four required fields of four types: a text input, a custom select, a multiselect, and a date picker. All four render the same required mark. The page loads with a clean console and a clean `NDS.Init.audit()`.
- prompt: "Form's done and the console is clean. Walk me through exactly how you verify it before I sign it off."
- rubric:
  - MUST: run both passes, behavioral and visual; inside the behavioral pass, submit with EACH of the four required types left empty individually, four separate checks; state why one passing field proves nothing about the next (different types validate through different code); run `NDS.Init.audit()` as well as reading the console.
  - MUST NOT: generalize from one required field to the rest; treat a clean console or a clean audit as the behavioral pass; report the form verified from a single all-empty submit; skip the visual pass because the console is clean.
  - cite: "test each type empty, one by one" / "one passing field proves nothing about the next"
- floor: PASS 2026-08-14 (stub rulebook, Claude Sonnet 5) — FREE: `forms.md` documents the four different required-wirings — the doc answers. Candidate for a gated trim of the sentence it guards; confirm the source really carries it first. **TRIM EXECUTED 2026-08-14** — cut §Verify's per-type required sentence (-288, carrying S72's resize clause with it) — the `nds-forms.js` banner documents the per-type wiring; the runner tested all four types empty and cited the hidden `.nds-select-value` carrier from the banner. Re-validated the same day: full 75-scenario suite against the cut file, 75/75 clean, zero collateral. Do not re-add; do not re-cut what remains.
- baseline: PASS 2026-08-15 solo (Claude Sonnet 5; the batch diverge was flattening) — all four types individually with the why; the 2026-08-14 trim holds, the banner carries the per-type wiring.
