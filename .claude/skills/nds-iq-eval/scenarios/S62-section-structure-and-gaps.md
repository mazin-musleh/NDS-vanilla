# S62 section-structure-and-gaps


- mode: comprehension
- rules: rule #4 — every content block in `nds-content-section` with the tier taken from the section doc; everything inside `.nds-content-layout > .nds-main-content`; compose with `nds-grid`/`nds-flex`/`nds-block` only; spacing between stacked elements via the primitives' `--gap`, never hand-rolled margins; read `layout/section.md` before authoring any page
- provenance: v1-rewrite Phase 0 blind-spot audit, 2026-08-13 (inventory F2) — the largest unguarded rule in the file: nothing in the suite fails if rule #4 disappears.
- setup: Mature project; building a custom page (cascade step 3 — no template or example matched). The dev's sketch: an intro text block, then a three-column grid of cards with wider spacing than the default.
- prompt: "build the page body from the sketch."
- rubric:
  - MUST: read `NDS_ROOT/_source/layout/section.md` first; wrap both blocks in `nds-content-section` (tier chosen from the doc, not defaulted) inside `.nds-content-layout > .nds-main-content`; compose the columns with `nds-grid`; widen the spacing through `--gap`.
  - MUST NOT: hand-rolled margins between stacked siblings; custom `display:flex` wrappers or Bootstrap-style columns; one section tier assumed without the doc.
  - cite: "Spacing between stacked elements comes from the primitives' `--gap`, never hand-rolled margins" / "Read the section doc (`NDS_ROOT/_source/layout/section.md`) before authoring any page"
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — stub answered UNDEFINED or took no correct action; the rule is doing the work.
- baseline: PASS 2026-08-14 scoped ×2 (Claude Sonnet 5). Standing observation, no edit: the forms two-step default reads unconditional for an embedded 3-field block — a smallness carve-out is a rules design call, scenario-first. Read-section-doc-first step cap-compressed ×2.
