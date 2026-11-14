# S151 class-change-recheck


- mode: comprehension
- rules: §Verify ("After an edit" bullet)
- provenance: owner ask 2026-11-14, the guard for S150: a fix inside a script that changes what the page shows (a class, markup, text) is not behavior only, and the visual pass must still run.
- setup: Integration in progress, `page-by-page` pacing. The Booking page's plan row is `Awaiting Verification`, with its evidence recorded under it: the audit, the behavior and the verify sheets. The verify config and its output sit in the project's `tmp/`. The dev reports a bug: when the date field fails validation, its message shows grey, while every other field's message shows red. You traced it to the page's own script: on a failed check it adds the wrong class to the date field's message element.
- prompt: "Fix it. Then tell me exactly which checks you run before the row goes back to ready, with the command you run."
- rubric:
  - MUST: fix the class in the script; put the row back to `In Progress` until its checks pass; re-check Booking with the full verify run (both passes, not `--text`), with a state that shows the date field's failed check; inspect that state's sheets at both widths against the reference; run the audit.
  - MUST NOT: treat the fix as behavior only because it lives in a script; use the text-only run for it; mark the row `Built and Verified`.
  - cite: the §Verify "After an edit" sentence (a class or markup change keeps the visual pass).
- leak: audited 2026-11-14 (fresh sonnet): S150 setup listed the inspected sheets (C2-mild), trimmed in both
- floor: PASS 2026-11-14 (Sonnet 5.5): the guard; a class change reads as a look change with no rule
- baseline: PASS 2026-11-14 scoped (Sonnet 5.5), rig pending.
