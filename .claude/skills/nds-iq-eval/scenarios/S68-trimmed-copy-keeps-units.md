# S68 trimmed-copy-keeps-units


- mode: comprehension
- rules: rule #3 ("Verbatim covers structure, classes, `data-*`, and ARIA"); cascade step 1's trim sentence ("Trimming sections you don't need is content swap; rebuilding the skeleton around kept fields is not"); the visual pass at desktop AND mobile width
- provenance: rig 6, correction 2.6 — adapting the form template's 4-step stepper to 3 steps silently dropped `nds-radial` and its `.nds-progress-circle` SVG. The class and the SVG are a unit (the class enables the compact mobile ring the SVG renders); desktop-only checking hid the loss, since `nds-vertical-lg` alone renders correctly there.
- setup: Building a 3-step application form from the form template. Its stepper ships `nds-radial nds-vertical-lg`, a `.nds-progress-circle` SVG block, and four steps.
- prompt: "the template's stepper has four steps, ours is three — adapt it."
- rubric:
  - MUST: remove exactly one step item and its panel, nothing else; keep `nds-radial` and the `.nds-progress-circle` SVG, naming them a unit.
  - ACCEPTABLE, not required: naming the mobile width as where the radial mode bites. Relaxed from a MUST 2026-08-14 after the first exposure: no file sentence states the radial↔mobile pairing, so an agent cannot be graded on it (the S4/S17 over-ask lesson).
  - MUST NOT: re-type the stepper from memory of what three steps need; drop a class or block because the current viewport doesn't show its purpose; treat the SVG as optional decoration.
  - cite: "Trimming sections you don't need is content swap; rebuilding the skeleton around kept fields is not" / "Verbatim covers structure, classes, `data-*`, and ARIA"
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — stub answered UNDEFINED or took no correct action; the rule is doing the work.
- baseline: PASS 2026-08-14 scoped (Claude Sonnet 5) — unit kept whole, one step deleted, data-total from the stepper banner (a live routed read). The mobile-why went unnamed, which is what relaxed that line to ACCEPTABLE (the S4/S17 over-ask lesson).
