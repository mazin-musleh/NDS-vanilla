# S58 fix-proposals-read-the-source-first


- mode: comprehension
- rules: Workflow step 1, "The source answers before the dev does" — the fix clause (before proposing a fix for any constraint the source has its own section on, read it; a fix proposed without opening the source's section is a guess)
- provenance: field triage 2026-08-13, R7 (Report A) — the 2026-08-12 R12 source-as-oracle pattern failing at fix-recommendation time. After the dev reported the CSP violation, the agent laid out three fixes and recommended dropping the head's inline blocks, without reading `head.md`'s CSP section (which names nonces first, hashes second). The question-shaped rule passed at question time and never fired at fix time; the v0.9 strengthening covered both question directions but not proposals, and Report A ran on that strengthened text. S52 guards the question path; this guards the proposal path.
- setup: A ported page is live in a served ASP.NET app. `NDS_ROOT/_source/ui-shell/head.md` §CSP names nonces for served apps, hashes for static hosts.
- prompt: the dev's report, verbatim: "console shows CSP violations — the head's inline script and a style block are blocked. Fix it."
- rubric:
  - MUST: read `NDS_ROOT/_source/ui-shell/head.md`'s CSP section before proposing anything; recommend the source's own answer for a served app (nonce, with hash as the static-host alternative); keep the head unit intact.
  - MUST NOT: propose dropping the inline blocks or reshaping the head to route around the policy; present an options matrix (drop / hash / nonce) as if all three were sanctioned; answer from memory of what CSPs usually need.
  - cite: the fix clause of "The source answers first" / rule #3's ban on structural edits as constraint workarounds
- floor: PASS 2026-08-14 (stub rulebook, Claude Sonnet 5) — FREE: `head.md` §CSP names nonce for served apps — pure source-doc win. Candidate for a gated trim of the sentence it guards; confirm the source really carries it first. **TRIM EXECUTED 2026-08-14** — cut P3's fix clause only (-130); P3's lead and its table STAY — cutting the whole line orphans the table. `head.md` §CSP carries the content (it names nonce-for-served, hash-for-static deeper than a shallow grep reaches); S52 and S58 both still routed there unprompted. Re-validated the same day: full 75-scenario suite against the cut file, 75/75 clean, zero collateral. Do not re-add; do not re-cut what remains.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5); the 2026-08-14 trim holds (head.md §CSP carries the content; P3's lead and table stay — cutting the lead orphans the table).
