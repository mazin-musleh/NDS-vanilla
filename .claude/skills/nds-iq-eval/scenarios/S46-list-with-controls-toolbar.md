# S46 list-with-controls-toolbar


- mode: comprehension
- rules: §Composition cascade ("list every UI part, and match each against the component catalog"; "Match by `use_when` across the template, example, and component catalogs, never by title"); index "Which component, example, or template fits" row
- provenance: Field triage 2026-08-10 proposed a rules sentence routing control bars to Toolbar; written as a gate scenario (2026-08-11) because Toolbar's `use_when` already names the job.
- setup: Mature project on the latest template; chrome and several pages `Built and Verified`. A new internal list page is next in the plan. The dev never says the word "toolbar".
- prompt: "Build the requests list page. It needs a search box, filters for status and department, the number of results showing, and paging."
- rubric:
  - MUST: run the parts inventory before writing any markup and match each part against `components.yml`; route the control bar itself to Toolbar off its `use_when` (matched on the job the entry names, not on its title); copy Toolbar's canonical markup from the folder its catalog `url` names; keep the search, filters, result count, and paging controls inside the `.nds-toolbar` nesting they land in.
  - MUST NOT: hand-compose a control-bar wrapper from grid or flex primitives; lift the count, filters, or search out of `.nds-toolbar` into a row of their own; treat the four controls as unrelated parts with no bar component between them; match on titles alone.
  - cite: "list every UI part, and match each against the component catalog" / components.yml Toolbar `use_when`: "The controls bar above a table, list, or grid: result counts and applied filters lead, search, export, and actions trail"
- floor: FAIL 2026-08-14 (Claude Sonnet 5), the rule is doing the work.
- baseline: PASS 2026-08-14 scoped (Claude Sonnet 5): Toolbar named outright. Gate CLOSED 2026-08-14 on cross-rig recurrence, so the proposed sentence stands.
