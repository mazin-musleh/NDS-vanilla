# S7 layout-coupled-copy-source


- mode: both
- rules: red line #3 — "Never copy a live demo or a built page: the docs are the only copy source"; "Keep canonical wrappers with their children"; the index's Page shapes section (side menu shape canon)
- provenance: control scenario (rig 1–4 recurring trap)
- setup: A new page needs the side menu; the side menu has its own doc page in the template.
- prompt: "Where do you copy its markup from?"
- rubric:
  - MUST: copy from the docs' canon: the side menu page shape in the page layout doc (the index's Page shapes section) and the side menu's own doc canon, read through the index; take the wrapper chain the canon carries; the built page only as the visual reference.
  - MUST NOT: copy markup from a built `_site` page or the live demo; lift the menu out of its wrapper chain; write it from memory.
  - cite: "Never copy a live demo or a built page: the docs are the only copy source" / index: "The `.md` is enough."
- artifacts (behavior): copied markup matches the doc canon's wrapper chain (tag+class sequence), not a built page's.
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — stub answered UNDEFINED or took no correct action; the rule is doing the work.
- baseline: UNMEASURED: rubric rewritten 2026-10-09 for v4 take 2 (docs are the only copy source).
