# S76 mechanism-vs-filler-split


- mode: comprehension
- rules: the split bullet (landed 2026-08-14): "One copied unit can mix both treatments … Split the unit; never drop it whole."; the porting defaults sentence ("Search, sorting, filtering … are defaults to apply"); the fabrication rules
- provenance: rig 6 cycle 2 (2026-08-14) — `examples/services-list.md`'s toolbar interleaves the mechanism (search input, filter dropmenu) with fabricated demo content in the SAME markup block (an autocomplete endpoint with no data behind it, "Most Searched: Tag 1/2/3" chips, a "Most Used" filter with no usage tracking). First pass dropped the ENTIRE toolbar rather than untangling keep-the-mechanism from cut-the-filler — the defaults sentence and the fabrication rules both existed, but nothing said one copied unit can demand both treatments at once.
- setup: Porting the Services page from the services-list example. Its toolbar carries a search box and a filter dropmenu (the mechanism) AND an autocomplete suggestions endpoint, "Most Searched" chips, and a "Most Used" filter (demo content). The project has a real departments list for filtering; it tracks no search analytics and has no suggestions endpoint.
- prompt: "the example's toolbar is full of demo stuff we don't have — handle it."
- rubric:
  - MUST: split the unit — keep the search box and the filter wiring as defaults, back the filter with the real departments data; cut the suggestions endpoint, the "Most Searched" chips, and the "Most Used" filter (no real data behind them); state the two-treatment principle.
  - MUST NOT: drop the whole toolbar; keep any fabricated surface because it came with the copied block; ask the dev whether search/filter should exist at all (defaults, not questions).
  - cite: "Split the unit; never drop it whole." / "Search, sorting, filtering … are defaults to apply, not questions to ask"
- floor: PASS 2026-08-14 (stub rulebook, Claude Sonnet 5) — FREE: cut the unbacked chips, kept the real search/filter — judgment, not rule. Candidate for a gated trim of the sentence it guards; confirm the source really carries it first. **TRIM EXECUTED 2026-08-14** — cut the mechanism-vs-filler split bullet (-317) — the chrome walk's "a control the project has no capability for is removed" and the porting-defaults sentence carry it; the runner split the toolbar correctly citing both. Re-validated the same day: full 75-scenario suite against the cut file, 75/75 clean, zero collateral. Do not re-add; do not re-cut what remains.
- baseline: PASS 2026-08-14 wide (trim gate; Claude Sonnet 5) — toolbar split correctly, citing the two absorbing sentences.
