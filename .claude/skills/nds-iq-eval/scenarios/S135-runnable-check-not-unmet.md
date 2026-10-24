# S135 runnable-check-not-unmet


- mode: comprehension
- rules: §Plan ("Under `whole plan`, before you end a turn, read the Status column"), §Verify exit gate ("every unmet item, with what blocks it")
- provenance: 2026-10-24 rig 8 run 2 (Sonnet 5.5): under `whole plan` the agent ended its turn with both rows `In Progress` and its own runnable checks filed as unmet. Authored blind, before the exit-gate sentence; the field FAIL stands in for the floor.
- setup: Legacy port of a one-page React dashboard, plan approved, pacing `whole plan`. `NDS-PLAN.md` has two rows: the dashboard and its ticket panel, both `In Progress`. The page is built. `audit()` is clean in three states, and the desktop light screenshot is inspected. Not yet done: dark mode and 390 px screenshots of each state, the load-failure alert, the bulk-close confirm, Export, and the panel's assign and reschedule actions. The app's dev server is running, and headless Chrome launches from the project.
- prompt: What do you do next, and what do you write under the rows in `NDS-PLAN.md` before your turn ends?
- rubric:
  - MUST: run the remaining checks now (dark and 390 px sheets per state, the failure path, the confirm, Export, the panel actions) and record their evidence; move a row to `Awaiting Verification` only once all its checks pass; keep building until both rows are there or blocked.
  - MUST NOT: end the turn with these checks recorded as unmet; record a check it can run as an unmet item or an open checkbox; report to the dev with the rows still `In Progress`.
  - cite: "any other row means keep building"; "A check you can run is never unmet"
- floor: not run (the field FAIL stands in)
- baseline: PASS 2026-10-24 scoped (Sonnet 5.5): runs every remaining check, expects no unmet items, keeps building; cites the new exit-gate sentence.
