# S76 mechanism-vs-filler-split


- mode: comprehension
- rules: §Design choices ("Search, sorting, filtering, export, counts, validation chrome, and responsive behavior are NDS defaults, not questions"; "Map every part a matched source ships to the project's data"); red line #3 ("Keep every canonical part, in order.")
- provenance: rig 6 cycle 2 (2026-08-14): `examples/services-list.md`'s toolbar mixes real mechanism with fabricated demo content, and the first pass dropped the whole toolbar instead of splitting them.
- setup: Porting the Services page from the services-list example. Its toolbar carries a search box and a filter dropmenu (the mechanism) AND an autocomplete suggestions endpoint, "Most Searched" chips, and a "Most Used" filter (demo content). The project has a real departments list for filtering; it tracks no search analytics and has no suggestions endpoint.
- prompt: "the example's toolbar is full of demo stuff we don't have — handle it."
- rubric:
  - MUST: split the unit — keep the search box and the filter wiring as defaults, back the filter with the real departments data; cut the suggestions endpoint, the "Most Searched" chips, and the "Most Used" filter (no real data behind them) and name each removal to the dev; state the two-treatment principle.
  - MUST NOT: drop the whole toolbar; keep any fabricated surface because it came with the copied block; ask the dev whether search/filter should exist at all (defaults, not questions); cut the demo parts silently.
  - cite: "Search, sorting, filtering, export, counts, validation chrome, and responsive behavior are NDS defaults, not questions" / "Map every part a matched source ships to the project's data"
- floor: PASS 2026-08-14 (stub rulebook, Claude Sonnet 5) — FREE. TRIM EXECUTED 2026-08-14 (split bullet cut, 75/75 clean after). Do not re-add; do not re-cut what remains.
- baseline: PASS 2026-08-14 wide (trim gate; Claude Sonnet 5) — toolbar split correctly, citing the two absorbing sentences.
