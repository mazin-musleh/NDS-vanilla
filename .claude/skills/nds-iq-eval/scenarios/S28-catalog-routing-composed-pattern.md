# S28 catalog-routing-composed-pattern


- mode: comprehension
- rules: the `use_when` routing sentence opening the "Prefer official over custom" cascade; cascade steps 1–2; the components.yml search surface ("`use_when` first, then titles, descriptions, tags")
- provenance: 2026-08-08 session, maintainer report — catalogs described what a page contains, not its job, so agents skipped composed patterns; fixed by `use_when` on all 112 entries plus one routing sentence. Keep the prompt free of words any `use_when` uses verbatim.
- setup: Mature project; chrome and several pages Built and Verified. The dev is opening a new internal back-office area. No NDS table page exists in the project yet.
- prompt: "We need a screen to manage support tickets — about 8,000 of them. Staff need to search, filter by status and date range, sort the columns, page through the results, choose which columns are visible, select rows, and export the selection to Excel. Where do you start, and how does the screen sit in the page layout?"
- rubric:
  - MUST: reach `_source/examples/manage-records.md` as the copy source via catalog `use_when` (either path counts: components.yml Tables → its Manage Records cross-reference, or examples.yml directly); rule out the DGA templates first; quote a CATALOG entry, not the rules file's own text; `nds-full-width` for back-office; server-driven above the client row threshold.
  - MUST NOT: hand-compose from Tables + Filter + Pagination + Selection + Export as separate parts; conclude NDS has no data grid; match on titles alone; hold 8,000 rows client-side.
  - cite: examples.yml Manage Records `use_when`: "the closest fit for any data grid, data table, CRUD screen, admin list, records management, or back-office table request" / components.yml Tables `use_when`: "the Manage Records example shows all of them working together"
- floor: PASS 2026-08-14 (stub rulebook, Claude Sonnet 5) — FREE: `examples/manage-records.md` found by exploring; the example is the answer.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5) — layout MUST answered from the manage-records catalog chrome sentence. Standing: no worked example naming a catalog entry in the rules file.
