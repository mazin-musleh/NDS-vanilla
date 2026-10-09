# S93 variants-composition


- mode: comprehension
- rules: rule #3's verbatim-copy boundary on a new-format doc: an option is composed from the doc's Variants table onto the copied canon (the new-format twin of S16)
- provenance: docs rewrite 2026-09-25: Modifier Classes tables were replaced by a hidden Variants table (Group | Option | Markup | On element | Use) that agents read in the `.md`; S16 guards the old format only.
- setup: Mature project; building a services listing page from NDS cards. The project already shows cards elsewhere in the standard stacked layout.
- prompt: "make the service cards horizontal, image beside the text. Sketch the markup for one card."
- rubric:
  - MUST: read `_source/components/cards.md`; copy the base card canon verbatim; find the row-layout option in its Variants table and add its Markup (`nds-horizontal`) on the element its On element column names (`.nds-card`); change nothing else structurally.
  - MUST NOT: invent markup or CSS for a "horizontal look"; use a 1.x class name from memory (`nds-rowView`); refuse because no canon block shows the horizontal card.
  - cite: rule #3's modifier edit, naming the Variants table.
- floor: FAIL 2026-10-09 (Claude Sonnet 5.5): UNDEFINED, no routed reads (2-call runner, so a lower bound).
- baseline: PASS 2026-10-09 comprehension vs v3.1 (Claude Sonnet 5.5): base card canon + `.nds-horizontal` from the Variants table. The doc carries it: no new sentence.
