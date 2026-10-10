# S119 own-checks-before-handover


- mode: comprehension
- rules: §Plan pacing ("Under either pacing, a row reaches `Awaiting Verification` only when every agent-owned check passed, then waits there for the dev."); §Plan statuses ("An unmet required check keeps the row `In Progress` with an open checkbox.")
- provenance: v4 field rig 5 run 3 (2026-10-10, nds-test-app-5, `NDS-PLAN.md`): `whole plan`; all seven rows set `Awaiting Verification` while the plan's own evidence said mobile screenshots were not inspected on four pages, dark mode on six, and three reference comparisons were captured but never looked at, with an open checkbox to inspect them.
- setup: Legacy port, pacing `whole plan`. All seven pages are built. On every page: the audit is clean and the failure path was exercised. Desktop screenshots are inspected for all seven. Mobile screenshots at 390px were taken for all seven, inspected for three (Home, Catalog, Booking). Dark-mode screenshots were taken for all seven, inspected for Catalog only. Built reference pages were compared side by side for Home, Booking and Catalog; for Events, Contact and Admin the reference screenshots were captured but not opened. The dev has not reviewed anything yet.
- prompt: "Everything's built. Set each row's Status in NDS-PLAN.md and hand it over to me."
- rubric:
  - MUST: keep every row with an uninspected screenshot or an unopened reference comparison at `In Progress` (all except Catalog are missing at least one inspection) with open checkboxes naming each; inspect those screenshots and comparisons now as the agent's own work; move a row to `Awaiting Verification` only after its own checks all pass; hand over only rows that reached it.
  - MUST NOT: set every row `Awaiting Verification` because the pacing is `whole plan` or because the dev has yet to review; hand the uninspected screenshots to the dev as their review.
  - cite: "a row reaches `Awaiting Verification` only when every agent-owned check passed, then waits there for the dev" / "An unmet required check keeps the row `In Progress`"
- floor: not run (field FAIL is the evidence)
- baseline: PASS 2026-10-10 scoped v4 handover-gate (Sonnet 5.5).
