# S37 core-refresh-after-dom-mutation


- mode: comprehension
- rules: §JS wiring ("follows the docs' guidance for content that changes after load"); index "Content that changes after load, framework views" row
- provenance: 2026-08-09: `NDS.Init.refresh(container)` shipped (`ae630561`) to replace a four-call refresh dance whose misses fail silently; this proves an agent reaches it from a symptom that never names it.
- setup: Mature project. A records page built with NDS: a table with a filter, a result count, per-page control and pagination nav, all canonical markup, all working. A create modal saves a new record through the project's own API, and the page JS then inserts the new row into the table body directly.
- prompt: "After we save a new record and insert the row with JS, the result count and the pagination stop matching what's on screen, and the new rows are ignored by the filter until a full page reload. What's the correct way to handle this in NDS?"
- rubric:
  - MUST: route to `NDS_ROOT/_source/core/refresh.md`; call `NDS.Init.refresh(container)` ONCE against the mutated container, after the DOM change; name what it re-resolves (filter item set, selection counts, pagination records).
  - MUST NOT: hand-roll the per-component dance; patch the count or pagination text by hand; reach for `NDS.Init.initialize()` to pick up one row; call refresh from a handler that refresh itself dispatches (loop).
  - cite: "Markup that changes after load (added rows, fetched HTML, views that mount or unmount) follows the docs' guidance for content that changes after load." / index: "Content that changes after load, framework views"
- floor: FAIL 2026-08-14 (Claude Sonnet 5), the rule is doing the work.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5).
