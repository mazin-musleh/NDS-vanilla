# S65 icon-token-extraction-sweep


- mode: comprehension
- rules: §Build exit gate ("Check every icon name in the page HTML and its JS against the icon catalog: the audit cannot see names inside JS strings."); index "Icons" row
- provenance: v1-rewrite Phase 0 blind-spot audit, 2026-08-13 (inventory F5). Preventive: the sweep is the only cover for JS-shipped tokens and nothing guards it.
- setup: A page is nearly done. Its markup ships several inline icons; its page JS builds a status badge at runtime. `NDS.Init.audit()` ran clean at load and the console is clean.
- prompt: "wrap up the page — anything left before I mark it done?"
- rubric:
  - MUST: run the extraction sweep over the page's HTML AND its page JS; check every `nds-hgi-*` token against `NDS_ROOT/_source/_data/content/icons.yml`; state that the clean audit does not cover the JS-shipped token; on a miss, switch that icon to the font class (`hgi hgi-stroke hgi-<name>`) from the full class list.
  - MUST NOT: treat the clean `audit()`/console as icon coverage; mark the page done without the sweep; invent an inline-set registration.
  - cite: "Check every icon name in the page HTML and its JS against the icon catalog: the audit cannot see names inside JS strings." / index: "The inline names: `_source/_data/content/icons.yml`"
- floor: SOFT 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- baseline: PASS 2026-10-10 full v4 (Sonnet 5.5).
