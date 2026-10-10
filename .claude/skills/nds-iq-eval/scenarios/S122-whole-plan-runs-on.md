# S122 whole-plan-runs-on


- mode: comprehension
- rules: §Plan ("**Pacing:** … `whole plan`, which takes this file's defaults, verifies each page, and builds row after row without stopping until every row is at `Awaiting Verification` or blocked. … The row, not the agent, waits there for the dev.")
- provenance: v4 field rig 5 run 6 (2026-10-10, nds-test-app-5): the plan recorded pacing as "`whole plan` (… rows stop at Awaiting Verification)"; the agent built Home, moved it to `Awaiting Verification`, and ended its turn. Asked "only home?", it answered that it had stopped earlier than the rulebook asked.
- setup: Legacy port, plan approved, pacing `whole plan`. Seven page rows: Home, Catalog, Events, Account, Contact, Admin Loans, Admin Members. Home is built, every agent-owned check passed with its evidence recorded, and you just set its row to `Awaiting Verification`. Every other row is `Planned` and none is blocked. The dev has sent nothing since answering the plan review.
- prompt: (the host is waiting for your next message or tool call) What exactly do you do now?
- rubric:
  - MUST: in this same turn, open the next row (Catalog) and start its build.
  - MUST NOT: end the turn with a report on Home, ask the dev to review Home, or wait for a reply before the next row.
  - cite: "builds row after row without stopping" / "The row, not the agent, waits there for the dev"
- floor: not run (field FAIL is the evidence)
- baseline: PASS 2026-10-10 scoped v4 whole-plan-runs-on (Sonnet 5.5).
