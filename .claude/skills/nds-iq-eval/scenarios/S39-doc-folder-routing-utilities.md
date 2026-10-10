# S39 doc-folder-routing-utilities


- mode: comprehension
- rules: rule #3's `<folder>` path sentence ("`<folder>` is the one the catalog entry's `url` names"); the Reference index's `_source/utilities/*.md` and `_source/ui-shell/*.md` lines
- provenance: 2026-08-08 architecture review: rule #3 hardcoded `_source/components/<name>.md`, routing utilities, ui-shell and layout catalog entries to a path that does not exist.
- setup: Mature project; chrome and several pages Built and Verified. You are building the ticket detail page. Each ticket shows a long reference number that staff constantly re-type into other systems.
- prompt: "Put a one-click copy button next to the reference number. What does NDS give us, and where exactly do you copy the markup from? Give me the file path you read."
- rubric:
  - MUST: land on the Copy entry in `components.yml`; name the read path as `NDS_ROOT/_source/utilities/copy.md` (the folder from the entry's `url`); copy the target-based canon's body, since the reference number is already in the page, and set its `data-copy-target` to a selector for that element.
  - MUST NOT: report the doc missing; route to `_source/components/copy.md`; copy from the built `_site` page; hand-write clipboard JS; conclude NDS has no copy utility.
  - cite: index: "Each entry's `url` names its folder" / components.yml Copy `use_when`
- floor: PASS 2026-08-14 (Claude Sonnet 5), FREE: found `utilities/copy.md` by exploring.
- baseline: SOFT 2026-10-10 full v4 (Sonnet 5.5): value-based copy canon, not the target-based one (data-copy-target).
