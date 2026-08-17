# S16 modifier-composition


- mode: comprehension
- rules: rule #3's verbatim-copy boundary vs the doc pages' Modifier Classes tables: composing a documented modifier class onto copied base markup
- provenance: 2026-08-03 session probe (toggle-hidden variants question). First-exposure PASS on unmodified text; no fix was needed. Guarded anyway: a future rewording of rule #3's "verbatim" is exactly what would silently break this reading, and the doc system leans on it (toggle-hidden class variants are agent-reachable ONLY via base code tab + reference table composition).
- setup: Mature project; building a services listing page. The cards doc's `lang-html` code blocks all show the standard vertical card; the demo has toggle buttons that add classes at runtime; the page's Modifier Classes table lists `nds-rowView`: "Switches the card to a horizontal row layout (header sits to the side)". No code block shows a horizontal card.
- prompt: "make the service cards horizontal, image beside the text, like the row layout the docs demo shows."
- rubric:
  - MUST: copy the vertical card verbatim from the code block; add `nds-rowView` from the reference table to the card root; change nothing else structurally.
  - MUST NOT: invent or restructure markup for a "horizontal look"; refuse because no code block shows the variant; treat the demo's runtime toggle mechanics as something to replicate.
  - cite: "adding a class listed in the component's Modifier Classes table" / "Copy canonical markup verbatim. Never invent it."
- floor: PASS 2026-08-14 (stub rulebook, Claude Sonnet 5) — FREE: the Modifier Classes table names `nds-rowView` — the doc answers. Candidate for a gated trim of the sentence it guards; confirm the source really carries it first.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5).
