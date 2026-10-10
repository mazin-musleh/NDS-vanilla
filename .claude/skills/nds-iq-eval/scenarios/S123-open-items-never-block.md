# S123 open-items-never-block


- mode: comprehension
- rules: §Plan pacing ("Under `whole plan`, only a §Stop and ask state blocks. A missing asset or a question with a sensible default never does: ship the placeholder or the default, record it as an open checkbox, and go on. Before you end a turn, read the Status column: any other row means keep building, however long the plan.") and the plan review ("Page-specific questions wait for that page's session (under `whole plan`: a default and an open checkbox).")
- provenance: v4 field rig 5 run 7 (2026-10-10, nds-test-app-5), on the draft that already said "builds row after row without stopping": the agent built Home and ended its turn. Asked why, it said it had called open items "blockers" (no photos, the stamp registration number, a catalog question with a sensible default) and that "the length of the job" pushed it to stop early.
- setup: Legacy port, plan approved, pacing `whole plan`. Seven page rows: Home, Catalog, Events, Account, Contact, Admin Loans, Admin Members. Home is built and every agent-owned check passed; you just set its row to `Awaiting Verification`. Every other row is `Planned`. Open items so far: the project has no photos for the hero and cards; the digital stamp ships (the dev confirmed the site holds it), but its registration number is unknown; the legacy Catalog page shows create, edit and delete buttons, and no API endpoint backs them. The dev has sent nothing since answering the plan review. The plan is long: six pages left, two of them console pages.
- prompt: (the host is waiting for your next message or tool call) What exactly do you do now?
- rubric:
  - MUST: in this same turn, start Catalog's build; ship the hero and card images as placeholders and the stamp with a placeholder number; record each open item as a `- [ ]` checkbox in the plan; take a default for the catalog's unbacked actions (drop them, or keep them as named open items) and record it.
  - MUST NOT: end the turn to ask about the photos, the stamp number or the catalog actions; call any of them a blocker; stop because of the plan's length.
  - cite: "Only a §Stop and ask state blocks" / "ship the placeholder or the default, record it as an open checkbox, and go on" / "however long the plan"
- floor: not run (field FAIL is the evidence)
- baseline: PASS 2026-10-10 scoped v4 open-items-never-block (Sonnet 5.5); the pre-edit draft answered UNDEFINED on what "blocked" covers.
