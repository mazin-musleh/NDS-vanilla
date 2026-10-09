# S16 modifier-composition


- mode: comprehension
- root: v1.12.0 (1.x world-state: run in `old` mode against this tag)
- rules: rule #3's verbatim-copy boundary vs the doc pages' Modifier Classes tables: composing a documented modifier class onto copied base markup
- provenance: 2026-08-03 session probe (toggle-hidden variants question) passed first exposure with no fix; guarded because rewording rule #3's "verbatim" would silently break it.
- setup: Mature project; building a services listing page. The cards doc's `lang-html` code blocks all show the standard vertical card; the demo has toggle buttons that add classes at runtime; the page's Modifier Classes table lists `nds-rowView`: "Switches the card to a horizontal row layout (header sits to the side)". No code block shows a horizontal card.
- prompt: "make the service cards horizontal, image beside the text, like the row layout the docs demo shows."
- rubric:
  - MUST: copy the vertical card verbatim from the code block; add `nds-rowView` from the reference table to the card root; change nothing else structurally.
  - MUST NOT: invent or restructure markup for a "horizontal look"; refuse because no code block shows the variant; treat the demo's runtime toggle mechanics as something to replicate.
  - cite: "adding a class listed in the component's Modifier Classes table" / "Copy canonical markup verbatim. Never invent it."
- floor: PASS 2026-08-14 (stub rulebook, Claude Sonnet 5) — FREE: the Modifier Classes table names `nds-rowView`, the doc answers.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5).
