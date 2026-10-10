# S62 section-structure-and-gaps


- mode: comprehension
- rules: Red line #4 ("the NDS page structure and layout primitives"); index "Sections and spacing" row; §Composition cascade step 3
- provenance: v1-rewrite Phase 0 blind-spot audit, 2026-08-13 (inventory F2) — the largest unguarded rule in the file: nothing in the suite fails if rule #4 disappears.
- setup: Mature project; building a custom page (cascade step 3 — no template or example matched). The dev's sketch: an intro text block, then a three-column grid of cards with wider spacing than the default.
- prompt: "build the page body from the sketch."
- rubric:
  - MUST: read `NDS_ROOT/_source/layout/section.md` first; wrap both blocks in `nds-content-section` (tier chosen from the doc, not defaulted) inside the content wrapper `section.md` shows (`.nds-content-layout > .nds-content`; `.nds-main-content` on 1.x templates); compose the columns with `nds-grid`; widen the spacing through `--gap`.
  - MUST NOT: hand-rolled margins between stacked siblings; custom `display:flex` wrappers or Bootstrap-style columns; one section tier assumed without the doc.
  - cite: "the NDS page structure and layout primitives" / "no spacing the primitives do not set" / index: "Sections and spacing"
- floor: FAIL 2026-08-14 (Claude Sonnet 5), the rule is doing the work.
- baseline: PASS 2026-10-10 full v4 (Sonnet 5.5). WATCH read-section-doc-first step compressed ×2.
