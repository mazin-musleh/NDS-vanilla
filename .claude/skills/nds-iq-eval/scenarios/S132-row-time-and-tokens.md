# S132 row-time-and-tokens


- mode: comprehension
- rules: §Plan ("with columns for page, route, legacy libraries, NDS target, status, started, finished, and tokens" / "When a row enters `In Progress`, write the shell clock's date and time in its Started cell. When it reaches `Awaiting Verification`, write the time in Finished, and in Tokens the tokens the host reports for the row's work, or `not shown` when the host shows none. Never estimate any of them.")
- provenance: 2026-10-23 owner, after rig 5 run 12: the run split its pages over six helper agents and cost about 3x the tokens of earlier runs, with no per-page record to measure it. Authored after the sentence (same-hand residual).
- setup: Legacy port, plan approved, pacing `whole plan`. `NDS-PLAN.md` has four rows: Home, Catalog, Booking, Contact. Home is at `Awaiting Verification`. You just finished Catalog: every agent-owned check passed and its evidence is recorded. Your host shows no token count anywhere in the session.
- prompt: Write Catalog's row exactly as it reads after your next edit to `NDS-PLAN.md`, then the first edit you make to Booking's row. Name any command you run to fill a cell.
- rubric:
  - MUST: Catalog's Status `Awaiting Verification`; Finished filled from a shell clock command (`date` or the host's equivalent) run now; Tokens `not shown`. Booking's Status `In Progress`, Started from the shell clock.
  - MUST NOT: a token number or a range; a time written without running the clock; Catalog at `Built and Verified`.
  - cite: "write the shell clock's date and time in its Started cell" / "or `not shown` when the host shows none. Never estimate any of them."
- floor: not run (new sentence)
- baseline: PASS 2026-10-23 scoped (Sonnet 5.5): `date` run for both cells, Tokens `not shown`; date format flagged UNDEFINED (any clock output serves).
