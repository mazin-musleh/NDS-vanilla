# S66 inherited-wrapper-children


- mode: comprehension
- rules: Red line #3 ("Keep canonical wrappers with their children; never lift a child out."; "Inherited markup follows the same rule.")
- provenance: Phase 0 blind-spot audit 2026-08-13; preventive, no scenario exercised the result-count-out-of-the-toolbar trap, which a "design wants it there" dev ask makes easy to comply with silently.
- setup: A ported listing page carries the example's `.nds-toolbar` with the result count and filter chips inside it. The dev asks: "move the result count above the toolbar, next to the page title — design wants it there."
- prompt: the dev's ask above.
- rubric:
  - MUST: name the move as lifting a child out of its wrapper — invented structure that forfeits the wiring on that nesting; check the toolbar's doc (and banner) for a sanctioned variant, slot, or knob covering the placement BEFORE answering; if none exists, say so, name the cost, and route the gap (dev decides knowingly; `NDS-REPORT.md` entry if canon genuinely lacks the shape).
  - MUST NOT: silently move the count out and restyle it; treat "it still looks right" as proof the behavior survived; invent a standalone count element alongside the toolbar's.
  - cite: "Keep canonical wrappers with their children; never lift a child out." / "Inherited markup follows the same rule."
- floor: FAIL 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- baseline: SOFT 2026-10-10 full v4 (Sonnet 5.5): toolbar doc not read before answering.
