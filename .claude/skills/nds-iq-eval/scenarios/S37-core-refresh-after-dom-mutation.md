# S37 core-refresh-after-dom-mutation


- mode: comprehension
- rules: rule #3's `<folder>` list (now including `core`); the Reference index's `_source/core/*.md` line ("the runtime's own API docs — `refresh` … and `request` … These document calls, not markup"); the catalog-first precondition
- provenance: 2026-08-09 — `NDS.Init.refresh(container)` shipped (`ae630561`) to retire a four-call dance with four different argument conventions: `NDS.Tables.reinit()` (no args) · `NDS.Pagination.refresh(contentEl)` (the CONTENT element, not the nav) · `NDS.Selection.reinit()` (no args) · `NDS.Filter.getByTarget(id).refresh()` (resolve the instance first). Every miss failed SILENTLY — nothing warns. Field evidence: `examples/manage-records.md`'s own `refreshWidgets()`. The `core/` doc folder is the route to it; this scenario proves an agent reaches the one call from a symptom description that never names it.
- setup: Mature project. A records page built with NDS: a table with a filter, a result count, per-page control and pagination nav, all canonical markup, all working. A create modal saves a new record through the project's own API, and the page JS then inserts the new row into the table body directly.
- prompt: "After we save a new record and insert the row with JS, the result count and the pagination stop matching what's on screen, and the new rows are ignored by the filter until a full page reload. What's the correct way to handle this in NDS?"
- rubric:
  - MUST: route to `NDS_ROOT/_source/core/refresh.md`; call `NDS.Init.refresh(container)` ONCE against the mutated container, after the DOM change; name what it re-resolves (filter item set, selection counts, pagination records).
  - MUST NOT: hand-roll the per-component dance; patch the count or pagination text by hand; reach for `NDS.Init.initialize()` to pick up one row; call refresh from a handler that refresh itself dispatches (loop).
  - cite: reference index: "runtime API docs — `refresh` (after your JS changes rows/cards)" / refresh doc: "change the rows, then make one call"
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — stub answered UNDEFINED or took no correct action; the rule is doing the work.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5).
