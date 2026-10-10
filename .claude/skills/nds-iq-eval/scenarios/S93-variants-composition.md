# S93 variants-composition


- mode: comprehension
- rules: Red line #3 edit table, "Option" row ("Add an option the doc lists, on the element it names"); index "Read a doc page", Options line
- provenance: docs rewrite 2026-09-25: Modifier Classes tables were replaced by a hidden Variants table (Group | Option | Markup | On element | Use) that agents read in the `.md`; S16 guards the old format only.
- setup: Mature project; building a services listing page from NDS cards. The project already shows cards elsewhere in the standard stacked layout.
- prompt: "make the service cards horizontal, image beside the text. Sketch the markup for one card."
- rubric:
  - MUST: read `_source/components/cards.md`; copy the base card canon verbatim; find the row-layout option in its Variants table and add its Markup (`nds-horizontal`) on the element its On element column names (`.nds-card`); change nothing else structurally.
  - MUST NOT: invent markup or CSS for a "horizontal look"; use a 1.x class name from memory (`nds-rowView`); refuse because no canon block shows the horizontal card.
  - cite: "Add an option the doc lists, on the element it names" / index: "Add an option's Markup on the element it names."
- floor: FAIL 2026-10-09 (Claude Sonnet 5.5): UNDEFINED, no routed reads (2-call runner, so a lower bound).
- baseline: PASS 2026-10-10 full v4 (Sonnet 5.5).
