# S28 catalog-routing-composed-pattern


- mode: comprehension
- rules: §Composition cascade ("Match by `use_when` across the template, example, and component catalogs, never by title"); index Need table, "Which component, example, or template fits" row
- provenance: 2026-08-08 session, maintainer report — catalogs described what a page contains, not its job, so agents skipped composed patterns; fixed by `use_when` on all 112 entries plus one routing sentence. Keep the prompt free of words any `use_when` uses verbatim.
- setup: Mature project; chrome and several pages Built and Verified. The dev is opening a new internal back-office area. No NDS table page exists in the project yet.
- prompt: "We need a screen to manage support tickets — about 8,000 of them. Staff need to search, filter by status and date range, sort the columns, page through the results, choose which columns are visible, select rows, and export the selection to Excel. Where do you start, and how does the screen sit in the page layout?"
- rubric:
  - MUST: reach `_source/examples/manage-records.md` as the copy source via catalog `use_when` (either path counts: components.yml Tables → its Manage Records cross-reference, or examples.yml directly); rule out the DGA templates first; quote a CATALOG entry, not the rules file's own text; `nds-full-width` for back-office; server-driven above the client row threshold.
  - MUST NOT: hand-compose from Tables + Filter + Pagination + Selection + Export as separate parts; conclude NDS has no data grid; match on titles alone; hold 8,000 rows client-side.
  - cite: "Match by `use_when` across the template, example, and component catalogs, never by title" / index: "Which component, example, or template fits" / examples.yml Manage Records `use_when`: "the closest fit for any data grid, data table, CRUD screen, admin list, records management, or back-office table request"
- floor: SOFT 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- baseline: PASS 2026-10-10 full v4 (Sonnet 5.5).
