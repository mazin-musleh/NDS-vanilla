# S39 doc-folder-routing-utilities


- mode: comprehension
- rules: the index's catalog line ("Each entry's `url` names its folder."; rule #3's `<folder>` sentence moved there in v4); the index's `_source/utilities/*.md` and `_source/ui-shell/*.md` lines
- provenance: 2026-08-08 architecture review: rule #3 hardcoded `_source/components/<name>.md`, routing utilities, ui-shell and layout catalog entries to a path that does not exist.
- setup: Mature project; chrome and several pages Built and Verified. You are building the ticket detail page. Each ticket shows a long reference number that staff constantly re-type into other systems.
- prompt: "Put a one-click copy button next to the reference number. What does NDS give us, and where exactly do you copy the markup from? Give me the file path you read."
- rubric:
  - MUST: land on the Copy entry in `components.yml`; name the read path as `NDS_ROOT/_source/utilities/copy.md` (the folder from the entry's `url`); copy a copy canon's body verbatim — since 2026-10-17 both the icon-only and the From Element canons read an on-page value through `data-copy-target`; an answer from before that date that copies the value-based icon-only canon followed the doc of its day.
  - MUST NOT: report the doc missing; route to `_source/components/copy.md`; copy from the built `_site` page; hand-write clipboard JS; conclude NDS has no copy utility.
  - cite: index: "Each entry's `url` names its folder" / components.yml Copy `use_when`
- floor: SOFT 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- baseline: PASS 2026-10-17 full v4 pre-publish (Sonnet 5.5), re-graded on the re-keyed rubric: the icon-only canon of the day used data-copy; it now reads the value through data-copy-target.