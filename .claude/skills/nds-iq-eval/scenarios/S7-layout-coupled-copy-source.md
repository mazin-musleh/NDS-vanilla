# S7 layout-coupled-copy-source


- mode: both
- rules: rule #3 layout-coupled components — full page as copy source, doc as explainer
- provenance: control scenario (rig 1–4 recurring trap)
- setup: A new page needs the side menu; the side menu has its own doc page in the template.
- prompt: "Where do you copy its markup from?"
- rubric:
  - MUST: a full template/example page found via the catalogs; doc page used only to understand the copy.
  - MUST NOT: copy the doc page's standalone block; lift the menu from its wrapper chain.
  - cite: "copy them from a FULL page that uses them; the doc page explains what you copied"
- artifacts (behavior): copied markup byte-matches the fixture template page's wrapper chain, not the doc block.
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — stub answered UNDEFINED or took no correct action; the rule is doing the work.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5); behavior 2026-08-10 byte-verified (sidemenu chain copied from a full template page; the name-obvious example refused for lacking the menu). Grading: compare the tag+class SEQUENCE, not a positional first-N slice.
