# S28 catalog-routing-composed-pattern


- mode: comprehension
- rules: §Composition cascade ("Match by `use_when` across the catalog's templates, examples, and components, never by title"); index Need table, "Which component, example, or template fits" row
- provenance: 2026-08-08 session, maintainer report — catalogs described what a page contains, not its job, so agents skipped composed patterns; fixed by `use_when` on all 112 entries plus one routing sentence. Keep the prompt free of words any `use_when` uses verbatim.
- setup: Mature project; chrome and several pages Built and Verified. The dev is opening a new internal back-office area. No NDS table page exists in the project yet.
- prompt: "We need a screen to manage support tickets — about 8,000 of them. Staff need to search, filter by status and date range, sort the columns, page through the results, choose which columns are visible, select rows, and export the selection to Excel. Where do you start, and how does the screen sit in the page layout?"
- rubric:
  - MUST: reach `_source/examples/manage-records.md` as the copy source via catalog `use_when` (either path counts: the Tables entry → its Manage Records cross-reference, or the Manage Records example entry directly; `catalog.yml` from 2.0, `components.yml`/`examples.yml` before); rule out the DGA templates first; quote a CATALOG entry, not the rules file's own text; `nds-full-width` for back-office; data scale follows the existing API (fetch once when the endpoint returns the full set; wire the controls to its server parameters when it pages).
  - MUST NOT: hand-compose from Tables + Filter + Pagination + Selection + Export as separate parts; conclude NDS has no data grid; match on titles alone; pick client or server handling without reading what the API returns.
  - cite: "Match by `use_when` across the catalog's templates, examples, and components, never by title" / index: "Which component, example, or template fits" / catalog Manage Records `use_when`: "the closest fit for any data grid, data table, CRUD screen, admin list, records management, or back-office table request"
- floor: SOFT 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- baseline: PASS 2026-10-17 full v4 pre-publish (Sonnet 5.5), re-graded on the re-keyed rubric: the rules size data by the API, as the runner did.