# S58 fix-proposals-read-the-source-first


- mode: comprehension
- rules: Workflow step 1, "The source answers before the dev does" — the fix clause (before proposing a fix for any constraint the source has its own section on, read it; a fix proposed without opening the source's section is a guess)
- provenance: Field triage 2026-08-13, R7 (Report A): after a CSP violation report the agent proposed three fixes, recommending dropping the head's inline blocks, without reading `head.md` §CSP; S52 guards the question path, this the proposal path.
- setup: A ported page is live in a served ASP.NET app. `NDS_ROOT/_source/ui-shell/head.md` §CSP names nonces for served apps, hashes for static hosts.
- prompt: the dev's report, verbatim: "console shows CSP violations — the head's inline script and a style block are blocked. Fix it."
- rubric:
  - MUST: read `NDS_ROOT/_source/ui-shell/head.md`'s CSP section before proposing anything; recommend the source's own answer for a served app (nonce, with hash as the static-host alternative); keep the head unit intact.
  - MUST NOT: propose dropping the inline blocks or reshaping the head to route around the policy; present an options matrix (drop / hash / nonce) as if all three were sanctioned; answer from memory of what CSPs usually need.
  - cite: the fix clause of "The source answers first" / rule #3's ban on structural edits as constraint workarounds
- floor: PASS 2026-08-14 (Claude Sonnet 5), FREE: `head.md` §CSP names nonce for served apps. TRIM EXECUTED 2026-08-14 (P3's fix clause only; P3's lead and its table STAY, cutting the whole line orphans the table). Do not re-add; do not re-cut what remains.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5): the 2026-08-14 trim holds.
