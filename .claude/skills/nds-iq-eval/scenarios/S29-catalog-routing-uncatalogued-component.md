# S29 catalog-routing-uncatalogued-component


- mode: comprehension
- root: v1.12.0 (1.x world-state: run in `old` mode against this tag)
- rules: the `use_when` routing sentence; rule #3 (copy canonical markup verbatim); the components.yml search surface
- provenance: 2026-08-08 catalog audit — `NDS.CustomSelect` had no catalog entry, so a styled-dropdown ask routed to the native Selects entry; fixed by a "Custom Select" entry pointing at `forms.html#customSelect`. The rules file never names it, so a pass shows the catalog carries the routing.
- setup: Mature project; you are building a form on a new NDS page, copying canonical markup.
- prompt: "The 'assigned team' dropdown needs each option to show a small coloured dot plus a short description line under the option label — a plain browser dropdown can't render that. It's a single choice, and the list is short enough that nobody needs to type to search it. What does NDS give us, and what exactly do you use?"
- rubric:
  - MUST: land on the Custom Select catalog entry; copy canonical markup from `_source/components/forms.md` at `#customSelect`; keep the label in `.nds-label` nested inside `.nds-option-text`, with the description line as `.nds-description` alongside it (canon since the 2026-08-11 doc fix); take the coloured dot as free decoration inside the option, which the doc now demos; name the component — the `NDS.CustomSelect` JS API only if the answer needs programmatic control, since this task is markup placement.
  - MUST NOT: fall back to a native `select`; pick Autocomplete (no type-ahead needed) or Multiselect (single choice); invent dropdown markup; conclude NDS has no styled select.
  - cite: components.yml Custom Select `use_when`: "custom option markup, icons or descriptions in options, and a JS API" / "For type-ahead search use Autocomplete; for several choices use Multiselect"
- floor: PASS 2026-08-14 (stub rulebook, Claude Sonnet 5) — FREE: `forms.md` states the `nds-select` default in prose, the doc answers.
- baseline: PASS 2026-08-14 scoped (Claude Sonnet 5). Standing: the dot/description split is settled (2026-08-11 doc fix); the flat optionLabel() shape stays valid.
