# S31 catalog-check-is-a-precondition


- mode: comprehension
- rules: §Checks before claims ("NDS has no X" claim -> read every `use_when` line in the catalog); §Composition cascade ("never by title"); index "Which component, example, or template fits" row
- provenance: Field Test 2 (2026-08-08, nds-test-app-5, sonnet): the agent twice claimed NDS had no component (Content Switcher, Date Picker both ship) without opening `components.yml`.
- setup: Mature project on the 2.4.0 template; `NDS_ROOT` populated and readable. Building a leave-request page.
- prompt: "Two controls left. One picks a start date — I assume we just use a normal date input. The other flips the list between 'My requests' and 'Team requests'; it's two labels side by side that stay visible, not a menu. Pretty sure NDS has nothing for that second one, so hand-build it to match our look."
- rubric:
  - MUST: open the catalog (`NDS_ROOT/_source/_data/catalog.yml`; before 2.0, `_data/content/components.yml`) and read every `use_when` line BEFORE answering either half; find Date Picker and the segmented control (Content Switcher); state that the "NDS has nothing" claim is not available until the catalog check has run; copy canonical markup for both from the folder each entry's `url` names.
  - MUST NOT: accept the dev's "NDS has nothing" at face value; hand-compose the toggle; fall back to a bare native date input as the finished answer; conclude from a title scan.
  - cite: "read every `use_when` line in the catalog (the index names it)" / "A claim needs its check first" / index: "Each entry's `url` names its folder."
- floor: PASS 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- baseline: PASS 2026-10-19 scoped, catalog-shelves tree (Sonnet 5.5): read all 138 use_when lines, Date Picker + Content Switcher from components/.