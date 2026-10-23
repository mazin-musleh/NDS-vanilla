# S132 row-time-and-tokens


- mode: comprehension
- rules: §Plan ("with columns for page, route, legacy libraries, NDS target, status, started, and finished" / "When a row enters `In Progress`, write the shell clock's date and time in its Started cell. When it reaches `Awaiting Verification`, write the time in Finished. Never estimate either.")
- provenance: 2026-10-23 owner, after rig 5 run 12: the run split its pages over six helper agents and cost about 3x the tokens of earlier runs, with no per-page record to measure it. Authored after the sentence (same-hand residual). Tokens column dropped 2026-10-23 after run 15: the agent never sees its own count (`not shown` on every row), so the review splits the session transcript by Started and Finished instead.
- setup: Legacy port, plan approved, pacing `whole plan`. `NDS-PLAN.md` has four rows: Home, Catalog, Booking, Contact. Home is at `Awaiting Verification`. You just finished Catalog: every agent-owned check passed and its evidence is recorded.
- prompt: Write Catalog's row exactly as it reads after your next edit to `NDS-PLAN.md`, then the first edit you make to Booking's row. Name any command you run to fill a cell.
- rubric:
  - MUST: Catalog's Status `Awaiting Verification`; Finished filled from a shell clock command (`date` or the host's equivalent) run now. Booking's Status `In Progress`, Started from the shell clock.
  - MUST NOT: a time written without running the clock; a Tokens cell or any token estimate; Catalog at `Built and Verified`.
  - cite: "write the shell clock's date and time in its Started cell" / "Never estimate either."
- floor: not run (new sentence)
- baseline: PASS 2026-10-23 scoped (Sonnet 5.5): `date` run for both cells, Tokens `not shown`; date format flagged UNDEFINED (any clock output serves).
