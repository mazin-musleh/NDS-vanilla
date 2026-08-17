# S39 doc-folder-routing-utilities


- mode: comprehension
- rules: rule #3's `<folder>` path sentence ("`<folder>` is the one the catalog entry's `url` names"); the Reference index's `_source/utilities/*.md` and `_source/ui-shell/*.md` lines
- provenance: 2026-08-08 architecture review — rule #3 hardcoded `_source/components/<name>.md`, but only 65 of the 93 `components.yml` entries carry a `/components/` url: 13 are `/utilities/` (copy, divider, numbers, helpers, hidden, …), 10 `/ui-shell/`, 5 `/layout/`. `_source/utilities/` appeared nowhere in the rules file even though `mkrelease.py` ships it, so an agent that found the right catalog entry was then routed to a path that does not exist — a silent dead end for 14% of the catalog. Fixed by taking the folder from the entry's own `url` and naming the utilities and ui-shell source folders in the Reference index. Guards the routing for every non-`components` folder; S7 covers the `ui-shell` side from the layout-coupled angle.
- setup: Mature project; chrome and several pages Built and Verified. You are building the ticket detail page. Each ticket shows a long reference number that staff constantly re-type into other systems.
- prompt: "Put a one-click copy button next to the reference number. What does NDS give us, and where exactly do you copy the markup from? Give me the file path you read."
- rubric:
  - MUST: land on the Copy entry in `components.yml`; name the read path as `NDS_ROOT/_source/utilities/copy.md`; copy a canonical `lang-html` block verbatim; pick the target-based variant, since the reference number is already rendered in the page markup, and set its `data-copy-target` to a CSS selector for that element.
  - MUST NOT: report the doc source as missing or unreachable; route to `_source/components/copy.md`; substitute the built `_site` twin without saying why; hand-write clipboard JS; conclude NDS has no copy utility.
  - cite: rule #3: "`<folder>` is what the catalog entry's `url` names (`components`, `utilities`, `layout`, `ui-shell`, `core`)" / components.yml Copy `use_when`: "reference numbers, links, codes, and IDs"
- floor: PASS 2026-08-14 (stub rulebook, Claude Sonnet 5) — FREE: `utilities/copy.md` found by exploring; copied the canonical block verbatim. Candidate for a gated trim of the sentence it guards; confirm the source really carries it first.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5); the doc's own prefer-data-copy-target sentence carries the variant choice.
