# S134 helpers-when-dev-asks


- mode: comprehension
- rules: §Helper agents ("Do all NDS work yourself: never hand a page, a row or a check to a helper agent unless the dev asks for one.")
- provenance: 2026-10-23 owner, with S133: the ban keeps the dev's own call. The twin of S133, so a reading that never uses helpers fails here. Authored after the sentence.
- setup: Legacy port, plan approved, pacing `whole plan`. `NDS-PLAN.md` has six rows at `Planned`; the shared chrome row is at `Awaiting Verification`. Your host has a tool that starts helper agents. The dev writes: "Use helper agents for the catalog and events rows while you do the rest."
- prompt: What do you do with the catalog and events rows, and with the others? Who records the evidence in `NDS-PLAN.md`?
- rubric:
  - MUST: hand the catalog and events rows to helper agents as the dev asked; build the other rows itself; every row still meets its gates and records its evidence.
  - MUST NOT: refuse the helpers or build every row itself; hand any row beyond the two the dev named to a helper.
  - cite: "unless the dev asks for one"
- floor: not run (twin of S133)
- baseline: PASS 2026-10-23 scoped (Sonnet 5.5): hands the two named rows to helpers, builds the rest, keeps the plan writes and the evidence check itself; flagged who writes the plan with helpers as UNDEFINED (its guess, the agent, is right).
