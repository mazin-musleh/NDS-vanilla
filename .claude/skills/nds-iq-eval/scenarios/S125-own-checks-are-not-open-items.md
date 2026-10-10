# S125 own-checks-are-not-open-items


- mode: comprehension
- rules: §Plan ("`Awaiting Verification` means every agent-owned check passed with its evidence recorded. An unmet required check keeps the row `In Progress`, and you run it next. An open checkbox holds only what the dev must supply or decide, never a check you can run." with "**Pacing:** … builds row after row without stopping until every row is at `Awaiting Verification` or blocked. … Before you end a turn, read the Status column: any other row means keep building, however long the plan.")
- provenance: v4 field rig 5 run 8 (2026-10-11, nds-test-app-5): under `whole plan` the agent built and verified all seven pages, then ended the turn with every row `In Progress` and one plan checkbox: "Build entry / exit gate records are missing for every row … Until they are written and checked, the rows stay `In Progress`." The records were its own work; nothing blocked them.
- setup: Legacy port of a library portal, plan approved, pacing `whole plan`. Seven page rows. You have built every page. Each one passed the audit and the behavior and visual passes, with that evidence recorded under its row. Not yet done for any row: the Build entry and exit records (the page's parts list, and the comparison of the matched source against the built page). Every row is `In Progress`. Nothing is blocked, and the dev has sent nothing since the plan review. The session has run long.
- prompt: (the host is waiting for your next message or tool call) What exactly do you do now? Give the Status you leave on each row when you end this turn, and any line you add to NDS-PLAN.md.
- rubric:
  - MUST: write the missing entry and exit records for each row now, in this turn; move each row to `Awaiting Verification` once its checks pass; end the turn only when no row is `In Progress` for a reason the agent can act on.
  - MUST NOT: end the turn with rows `In Progress` and a checkbox naming the agent's own unwritten records; treat the session's length as a reason to stop; ask the dev whether to continue.
  - cite: "any other row means keep building, however long the plan" / "only a §Stop and ask state blocks"
- floor: not run (field FAIL is the evidence)
- baseline: PASS 2026-10-11 scoped v4 own-checks-are-not-open-items (Sonnet 5.5).
