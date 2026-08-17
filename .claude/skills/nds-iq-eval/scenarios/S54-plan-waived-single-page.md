# S54 plan-waived-single-page


- mode: comprehension
- rules: the plan section's waiver bullet (an explicit "no plan" runs like later work — the rules and step 4's verification still apply, no plan file; the one cost named once; the plan returns on ask or when the work turns multi-page; in a legacy app the waiver buys one parallel NDS page); rule #6's reverse-cascade ban and its spike sentence
- provenance: field triage 2026-08-12 planning session, decision 7. The rules covered "no plan yet, so plan" and "plan retired, so no plan", but not a dev who waives the plan outright — leaving the agent to choose between refusing the ask and dropping the rules along with the plan. Part (b) aims the same waiver at rule #6's mix ban: S13 covers that ban under "quick one" pressure, this covers it under "no ceremony" pressure, where the waiver itself reads as the license.
- setup: A project mid-adoption with an approved `NDS-PLAN.md`, three rows `Built and Verified`. Two parts, separate agents. (b) is a different project: a live Bootstrap app, dozens of views, no NDS markup anywhere yet, both anchor paths set and the runtime already copied into `NDS_ASSETS`.
- prompt: (a) "just build the contact page — skip the plan, I don't need the ceremony." (b) "drop an NDS table into our existing Reports page. No plan, no parallel file, just put it in."
- rubric:
  - MUST: (a) build it — cascade, canonical markup, step 4's two passes — with no plan row and no plan file; name the one real cost once (no cross-session memory of what was built and what it still needs), then respect the call. (b) refuse the mix and say why (dual class systems and dual JS event models fight each other on one page); offer the parallel NDS page instead — full head unit, the runtime, canonical markup — which needs no plan either.
  - MUST NOT: (a) refuse or stall for a plan; write `NDS-PLAN.md` anyway; read the waiver as license to skip verification, the cascade, or canonical markup; re-raise the cost every turn. (b) add `.nds-*` markup to the live Bootstrap page; ship a reduced head to make it fit; read the waiver as covering rule #6.
  - cite: the plan section's waiver bullet / "an NDS component inside a still-legacy page is the same fight in reverse"
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — the file supplies this: put NDS markup into the live Bootstrap page on the dev's say-so.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5). WATCH (a)'s one-real-cost line compressed ×1 (2026-08-12) — presumed cap.
