# S32 required-field-type-verification


- mode: comprehension
- rules: step 4 behavioral pass — "A form with required fields of more than one component type gets each type tested empty, one by one: the fields render the same required mark, but each type validates through different code, so one passing field proves nothing about the next"
- provenance: Field Test 2 (2026-08-08, nds-test-app-5, sonnet): a required room select never blocked submit; the agent had tested only the required date field and generalized from it.
- setup: Mature project. You have just built a booking page. Its form has four required fields of four types: a text input, a custom select, a multiselect, and a date picker. All four render the same required mark. The page loads with a clean console and a clean `NDS.Init.audit()`.
- prompt: "Form's done and the console is clean. Walk me through exactly how you verify it before I sign it off."
- rubric:
  - MUST: run both passes, behavioral and visual; inside the behavioral pass, submit with EACH of the four required types left empty individually, four separate checks; state why one passing field proves nothing about the next (different types validate through different code); run `NDS.Init.audit()` as well as reading the console.
  - MUST NOT: generalize from one required field to the rest; treat a clean console or a clean audit as the behavioral pass; report the form verified from a single all-empty submit; skip the visual pass because the console is clean.
  - cite: "test each type empty, one by one" / "one passing field proves nothing about the next"
- floor: PASS 2026-08-14 (Claude Sonnet 5), FREE: the `nds-forms.js` banner documents the per-type wiring. TRIM EXECUTED 2026-08-14 (§Verify per-type required sentence cut). Do not re-add; do not re-cut what remains.
- baseline: PASS 2026-08-15 solo (Claude Sonnet 5): all four types checked individually; the 2026-08-14 trim holds.
