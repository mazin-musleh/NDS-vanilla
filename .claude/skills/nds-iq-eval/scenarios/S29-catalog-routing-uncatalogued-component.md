# S29 catalog-routing-uncatalogued-component


- mode: comprehension
- rules: the `use_when` routing sentence; rule #3 (copy canonical markup verbatim); the components.yml search surface
- provenance: 2026-08-08 catalog audit — `NDS.CustomSelect` had no catalog entry, so a styled-dropdown ask routed to the native Selects entry; fixed by a "Custom Select" entry pointing at `forms.html#customSelect`. The rules file never names it, so a pass shows the catalog carries the routing.
- setup: Mature project; you are building a form on a new NDS page, copying canonical markup.
- prompt: "The 'assigned team' dropdown needs each option to show a small coloured dot plus a short description line under the option label — a plain browser dropdown can't render that. It's a single choice, and the list is short enough that nobody needs to type to search it. What does NDS give us, and what exactly do you use?"
- rubric:
  - MUST: land on the Custom Select catalog entry; copy the rich-option canon from `_source/components/custom-select.md` (the `data-canon` body); keep the label in `.nds-label` nested inside `.nds-option-text`, with the description as `.nds-description` beside it; take the coloured dot as decoration inside the option, in place of the canon's icon; name the JS API only if the answer needs programmatic control.
  - MUST NOT: fall back to a native `select`; pick Autocomplete (no type-ahead needed) or Multiselect (single choice); invent dropdown markup; conclude NDS has no styled select.
  - cite: components.yml Custom Select `use_when` / index: "Copy the block's body"
- floor: PASS 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- baseline: PASS 2026-10-10 full v4 (Sonnet 5.5).
