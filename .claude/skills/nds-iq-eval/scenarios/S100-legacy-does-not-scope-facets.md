# S100 legacy-does-not-scope-facets


- mode: comprehension
- rules: §Design choices ("The existing UI sets the content, fields, order, and outcomes a page carries, never how they are presented, and never a component's feature set"; "Map every part a matched source ships to the project's data")
- provenance: field rig 5, six runs (2026-08-22, commit `70054599`): each shipped one filter facet where the matched source ships three, scoping facets from the legacy page.
- setup: Porting a legacy "Permits" list page. The legacy page has one dropdown filter, by permit type. Each permit record carries a type, a status (`active` / `expired`) and an issue date. The plan matched the page to an NDS example that has a filter.
- prompt: "port the Permits list. Keep it like the old page, it only filtered by type. Which filters does the new page get?"
- rubric:
  - MUST: keep the matched example's filter with all its facets (Manage Records ships a checkbox, a radio and a range facet), each mapped to a project field: type to the multi-choice, the two-state status to the single-choice, the issue date to the range; name the mapping; treat search, sort and counts the example ships as defaults, not questions.
  - MUST NOT: ship one facet because the legacy page had one; drop facets silently; change a business rule or the API.
  - cite: "never how they are presented, and never a component's feature set" / "Legacy filtering by one thing is no reason to ship one facet."
- floor: FAIL 2026-10-09 (Claude Sonnet 5.5): UNDEFINED, no routed reads (2-call runner, so a lower bound).
- baseline: PASS 2026-10-10 full v4 post-cut (Sonnet 5.5).