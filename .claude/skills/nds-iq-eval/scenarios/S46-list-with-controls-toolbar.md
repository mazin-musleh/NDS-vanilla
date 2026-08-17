# S46 list-with-controls-toolbar


- mode: comprehension
- rules: Workflow step 4's parts inventory ("Before writing any markup, list the page's parts … and match each part against `components.yml`"); the `use_when` routing sentence opening the "Prefer official over custom" cascade; the Toolbar routing sentence ("A controls bar above a table, list, or grid is itself a part — Toolbar — never a row composed from primitives", landed 2026-08-14)
- provenance: field triage 2026-08-10, which proposed a rules sentence routing control bars to Toolbar. Written as a GATE instead: `_data/content/components.yml` line 866 already names exactly this job in Toolbar's `use_when`, and the parts-inventory rule already forces the catalog match, so the existing text should carry it without a new sentence. Gate scenario 2026-08-11 — the proposed sentence lands only if this fails. The doc cross-refs (search box / filter / pagination pages pointing at toolbar) are docs work either way.
- setup: Mature project on the latest template; chrome and several pages `Built and Verified`. A new internal list page is next in the plan. The dev never says the word "toolbar".
- prompt: "Build the requests list page. It needs a search box, filters for status and department, the number of results showing, and paging."
- rubric:
  - MUST: run the parts inventory before writing any markup and match each part against `components.yml`; route the control bar itself to Toolbar off its `use_when` (matched on the job the entry names, not on its title); copy Toolbar's canonical markup from the folder its catalog `url` names; keep the search, filters, result count, and paging controls inside the `.nds-toolbar` nesting they land in.
  - MUST NOT: hand-compose a control-bar wrapper from grid or flex primitives; lift the count, filters, or search out of `.nds-toolbar` into a row of their own; treat the four controls as unrelated parts with no bar component between them; match on titles alone.
  - cite: "Before writing any markup, list the page's parts" / components.yml Toolbar `use_when`: "The controls bar above a table, list, or grid: result counts and applied filters lead, search, export, and actions trail"
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — stub answered UNDEFINED or took no correct action; the rule is doing the work.
- baseline: PASS 2026-08-14 scoped (Claude Sonnet 5) — Toolbar named OUTRIGHT, sentence + use_when both quoted. Gate history: held 2026-08-11 without the sentence; CLOSED 2026-08-14 on cross-rig recurrence, the sentence's own landing condition.
