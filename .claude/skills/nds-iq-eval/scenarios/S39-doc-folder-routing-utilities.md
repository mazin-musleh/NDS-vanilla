# S39 doc-folder-routing-utilities


- mode: comprehension
- root: v1.12.0 (1.x world-state: run in `old` mode against this tag)
- rules: rule #3's `<folder>` path sentence ("`<folder>` is the one the catalog entry's `url` names"); the Reference index's `_source/utilities/*.md` and `_source/ui-shell/*.md` lines
- provenance: 2026-08-08 architecture review: rule #3 hardcoded `_source/components/<name>.md`, routing utilities, ui-shell and layout catalog entries to a path that does not exist.
- setup: Mature project; chrome and several pages Built and Verified. You are building the ticket detail page. Each ticket shows a long reference number that staff constantly re-type into other systems.
- prompt: "Put a one-click copy button next to the reference number. What does NDS give us, and where exactly do you copy the markup from? Give me the file path you read."
- rubric:
  - MUST: land on the Copy entry in `components.yml`; name the read path as `NDS_ROOT/_source/utilities/copy.md`; copy a canonical `lang-html` block verbatim; pick the target-based variant, since the reference number is already rendered in the page markup, and set its `data-copy-target` to a CSS selector for that element.
  - MUST NOT: report the doc source as missing or unreachable; route to `_source/components/copy.md`; substitute the built `_site` twin without saying why; hand-write clipboard JS; conclude NDS has no copy utility.
  - cite: rule #3: "`<folder>` is what the catalog entry's `url` names (`components`, `utilities`, `layout`, `ui-shell`, `core`)" / components.yml Copy `use_when`: "reference numbers, links, codes, and IDs"
- floor: PASS 2026-08-14 (Claude Sonnet 5), FREE: found `utilities/copy.md` by exploring.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5).
