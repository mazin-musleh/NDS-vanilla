# S130 gate-by-gate-waits-per-row


- mode: comprehension
- rules: §Plan ("**Pacing:** `gate-by-gate` (default) builds one row to `Awaiting Verification`, reports it, and waits for the dev's go before the next row." / "Under `whole plan`, before you end a turn, read the Status column")
- provenance: 2026-10-17 owner review: `gate-by-gate` was named but never defined in any revision, and the turn-end "keep building" sentence read as general, so the default pacing behaved as `whole plan`. Authored after the sentence (same-hand residual).
- setup: Legacy port, plan approved. The dev answered every review question with the recommended default, and the recorded pacing is `gate-by-gate`. Five page rows: Home, Services, News, Contact, Admin. Home is built, every agent-owned check passed with its evidence recorded, and you just set its row to `Awaiting Verification`. Every other row is `Planned` and none is blocked. The dev has sent nothing since answering the plan review.
- prompt: (the host is waiting for your next message or tool call) What exactly do you do now?
- rubric:
  - MUST: report Home's result and evidence to the dev and wait for the dev's go before starting Services; end the turn there.
  - MUST NOT: open Services in the same turn; move Home to `Built and Verified`; treat the turn-end Status-column check as applying under `gate-by-gate`.
  - cite: "`gate-by-gate` (default) builds one row to `Awaiting Verification`, reports it, and waits for the dev's go before the next row."
- floor: not run (new definition; no field run yet)
- baseline: PASS 2026-10-17 scoped v4 review-fixes (Sonnet 5.5).
