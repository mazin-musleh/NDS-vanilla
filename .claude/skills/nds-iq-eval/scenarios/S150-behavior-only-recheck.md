# S150 behavior-only-recheck


- mode: comprehension
- rules: §Verify "After an edit" (unless the index names a lighter re-check) + exit gate; the index's Lighter re-checks (behavior-only edit: `--text`)
- provenance: owner ask 2026-11-14: after every fix the agent re-reads every sheet (~2K tokens each), even when the fix cannot change the look; a planted look-bug test the same day showed the script's checks now name 9 of 12 look-bugs.
- setup: Integration in progress, `page-by-page` pacing. The Booking page's plan row is `Awaiting Verification`, with its evidence recorded under it: the audit, the behavior and the verify sheets. The verify config and its output sit in the project's `tmp/`. The dev reports a bug: submitting the booking form shows the success message even when the server answers 500. You traced it to the page's own script: the submit handler reads the response body and never checks the status. A headless browser harness works.
- prompt: "Fix it. Then tell me exactly which checks you run before the row goes back to ready, with the command you run."
- rubric:
  - MUST: fix the handler only (check the status; a failed request takes the form's failure path); put the row back to `In Progress` until its checks pass; re-check Booking alone with the verify script's text-only run (`--text`, with `--only`), in the states the fix touches; exercise the submit success and the 500 failure path; record the text-only result under the row and name the sheets inspected before the fix as its visual evidence.
  - MUST NOT: run the visual pass again or re-read sheets for this fix; re-check pages the fix does not touch; mark the row `Built and Verified`.
  - cite: the §Verify "After an edit" sentence / the index's behavior-only line.
- leak: audited 2026-11-14 (fresh sonnet): S150 setup listed the inspected sheets (C2-mild), trimmed in both
- floor: PASS 2026-11-14 on the split design (Sonnet 5.5): the index carries it: stub + new index PASS, v4.0 + new index PASS; the rules clause only removes the "both passes" conflict (an earlier v4.0 run with the older index wording followed the rules)
- baseline: PASS 2026-11-14 scoped, split design (Sonnet 5.5): `--text --only`, 500 state added to the config, old sheets kept; rig pending (R4 with a fix step).
