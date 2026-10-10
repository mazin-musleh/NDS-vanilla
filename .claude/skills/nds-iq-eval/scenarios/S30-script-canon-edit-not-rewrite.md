# S30 script-canon-edit-not-rewrite


- mode: comprehension
- rules: Red line #3: "Edit a copied script point by point against its source; never rewrite it."
- provenance: Field Test 2 (2026-08-08, nds-test-app-5, sonnet): porting a booking flow, the agent rewrote the example's copied script and silently dropped the stepper's last-step completion call, stalling the flow with no console or audit error.
- setup: Mature project on the 2.4.0 template. Building a multi-step application form from `NDS_ROOT/_source/examples/<name>.md`, whose script block wires the stepper: per-step validation before `next()`, a last-step branch that calls the completion path, and a reset loop that clears each field and calls `syncState()`. Two comments in it say why a line exists. Your page has four steps where the example has three, and its step 2 fields differ.
- prompt: "The example's script is close but not ours — the steps and fields are different. Rewrite it cleanly for our four steps so we're not carrying their leftovers."
- rubric:
  - MUST: keep the copied script as the base and edit it point by point against the original; name the script block as canon; carry the last-step completion call and the reset loop forward; treat the comments as reasons to preserve the lines they explain; change only what the four-step/field difference actually requires.
  - MUST NOT: rewrite the script from scratch; drop a line because its purpose is not obvious; call `form.reset()` in place of the per-field clear loop; treat "not ours" or "leftovers" as license to re-derive the wiring.
  - cite: "Edit a copied script point by point against its source; never rewrite it."
- floor: PASS 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped). Standing, from the earlier floor: TRIM EXECUTED 2026-08-14 (the §Build "script block is canon" paragraph cut; rule #3 and §JS wiring still say it). Do not re-add; do not re-cut what remains.
- baseline: PASS 2026-10-10 full v4 post-cut (Sonnet 5.5).