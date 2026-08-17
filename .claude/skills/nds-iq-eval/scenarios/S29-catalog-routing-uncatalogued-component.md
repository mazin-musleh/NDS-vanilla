# S29 catalog-routing-uncatalogued-component


- mode: comprehension
- rules: the `use_when` routing sentence; rule #3 (copy canonical markup verbatim); the components.yml search surface
- provenance: 2026-08-08 catalog audit — `NDS.CustomSelect` shipped a full JS API, its own source file, styling in `_forms.scss` and a doc anchor, but had NO catalog entry; the nearest entry read "Selects: Native dropdown menus for choosing from a list", so an agent asking for a styled dropdown was routed to a native element it cannot style. Fixed by adding the missing "Custom Select" entry pointing at `forms.html#customSelect`. Guards both the entry's existence and its disambiguation lines. Note the rules file never names this component — a pass here is evidence the catalog alone carries the routing.
- setup: Mature project; you are building a form on a new NDS page, copying canonical markup.
- prompt: "The 'assigned team' dropdown needs each option to show a small coloured dot plus a short description line under the option label — a plain browser dropdown can't render that. It's a single choice, and the list is short enough that nobody needs to type to search it. What does NDS give us, and what exactly do you use?"
- rubric:
  - MUST: land on the Custom Select catalog entry; copy canonical markup from `_source/components/forms.md` at `#customSelect`; keep the label in `.nds-label` nested inside `.nds-option-text`, with the description line as `.nds-description` alongside it (canon since the 2026-08-11 doc fix); take the coloured dot as free decoration inside the option, which the doc now demos; name the component — the `NDS.CustomSelect` JS API only if the answer needs programmatic control, since this task is markup placement.
  - MUST NOT: fall back to a native `select`; pick Autocomplete (no type-ahead needed) or Multiselect (single choice); invent dropdown markup; conclude NDS has no styled select.
  - cite: components.yml Custom Select `use_when`: "custom option markup, icons or descriptions in options, and a JS API" / "For type-ahead search use Autocomplete; for several choices use Multiselect"
- floor: PASS 2026-08-14 (stub rulebook, Claude Sonnet 5) — FREE: `forms.md` states the `nds-select` default in prose — the doc answers. Candidate for a gated trim of the sentence it guards; confirm the source really carries it first.
- baseline: PASS 2026-08-14 scoped (Claude Sonnet 5; the reworded use_when did not disturb the routing). The dot/description split was settled by the 2026-08-11 doc fix (point-of-copy rung). Note: optionLabel() reads .nds-label first, then textContent — the flat shape stays valid.
