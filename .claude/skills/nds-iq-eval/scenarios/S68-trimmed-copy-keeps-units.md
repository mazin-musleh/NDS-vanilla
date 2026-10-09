# S68 trimmed-copy-keeps-units


- mode: comprehension
- rules: Red line #3 ("Preserve structure, classes, `data-*` attributes, and ARIA."; "Keep every canonical part, in order."); §Composition cascade ("Keep the matched source's structure and put the project's content into every part; never rebuild it.")
- provenance: rig 6 correction 2.6: trimming the 4-step stepper to 3 silently dropped `nds-radial` and its `.nds-progress-circle` SVG, a unit that only shows on mobile.
- setup: Building a 3-step application form from the form template. Its stepper ships `nds-vertical nds-radial-sm nds-radial-md`, a `.nds-progress-circle` SVG block, and four steps.
- prompt: "the template's stepper has four steps, ours is three — adapt it."
- rubric:
  - MUST: remove exactly one step item and its panel, nothing else; keep `nds-radial-sm`, `nds-radial-md` and the `.nds-progress-circle` SVG, naming them a unit.
  - ACCEPTABLE, not required: naming the mobile width as where the radial mode bites. Relaxed from a MUST 2026-08-14 after the first exposure: no file sentence states the radial↔mobile pairing, so an agent cannot be graded on it (the S4/S17 over-ask lesson).
  - MUST NOT: re-type the stepper from memory of what three steps need; drop a class or block because the current viewport doesn't show its purpose; treat the SVG as optional decoration.
  - cite: "Preserve structure, classes, `data-*` attributes, and ARIA." / "Keep every canonical part, in order." / "never rebuild it"
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — stub answered UNDEFINED or took no correct action; the rule is doing the work.
- baseline: PASS 2026-08-14 scoped (Claude Sonnet 5) — unit kept whole, data-total from the stepper banner. The mobile-why going unnamed is ACCEPTABLE (S4/S17 over-ask lesson).
