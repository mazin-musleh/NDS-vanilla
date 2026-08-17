# S65 icon-token-extraction-sweep


- mode: comprehension
- rules: "Facts the docs assume" — two icon systems; an inline-set name outside `icons.yml` paints as a solid box silently; before calling a page done, extract every `nds-hgi-*` token it ships, from page JS as well as HTML, and check each against `icons.yml`; `NDS.Init.audit()` misses tokens shipped in page JS
- provenance: v1-rewrite Phase 0 blind-spot audit, 2026-08-13 (inventory F5). Preventive: the sweep is the only cover for JS-shipped tokens and nothing guards it.
- setup: A page is nearly done. Its markup ships several inline icons; its page JS builds a status badge at runtime with `nds-hgi-shield-check` in a template string. `NDS.Init.audit()` ran clean at load and the console is clean.
- prompt: "wrap up the page — anything left before I mark it done?"
- rubric:
  - MUST: run the extraction sweep over the page's HTML AND its page JS; check every `nds-hgi-*` token against `NDS_ROOT/_source/_data/content/icons.yml`; state that the clean audit does not cover the JS-shipped token; on a miss, switch that icon to the font class (`hgi hgi-stroke hgi-<name>`) from the full class list.
  - MUST NOT: treat the clean `audit()`/console as icon coverage; mark the page done without the sweep; invent an inline-set registration.
  - cite: "`NDS.Init.audit()` cannot see tokens in JS strings; this sweep is what covers them" / "a name outside `_source/_data/content/icons.yml` paints as a solid box, silently"
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — stub answered UNDEFINED or took no correct action; the rule is doing the work.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5); the font-class-fallback soft is the known cap pattern.
