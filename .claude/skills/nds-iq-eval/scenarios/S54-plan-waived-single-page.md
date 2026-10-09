# S54 plan-waived-single-page


- mode: comprehension
- rules: §Plan table ("the dev may waive it for one"; "an explicit waiver permits one parallel page"); §Plan "No-plan work" bullet; red line #6 (no mixing legacy and NDS on one page)
- provenance: Field triage 2026-08-12 planning session, decision 7: a dev who waives the plan outright left the agent choosing between refusing and dropping the rules; part (b) aims the waiver at rule #6's mix ban.
- setup: A project mid-adoption with an approved `NDS-PLAN.md`, three rows `Built and Verified`. Two parts, separate agents. (b) is a different project: a live Bootstrap app, dozens of views, no NDS markup anywhere yet, both anchor paths set and the runtime already copied into `NDS_ASSETS`.
- prompt: (a) "just build the contact page — skip the plan, I don't need the ceremony." (b) "drop an NDS table into our existing Reports page. No plan, no parallel file, just put it in."
- rubric:
  - MUST: (a) build it — cascade, canonical markup, step 4's two passes — with no plan row and no plan file; name the one real cost once (no cross-session memory of what was built and what it still needs), then respect the call. (b) refuse the mix and say why (dual class systems and dual JS event models fight each other on one page); offer the parallel NDS page instead — full head unit, the runtime, canonical markup — which needs no plan either.
  - MUST NOT: (a) refuse or stall for a plan; write `NDS-PLAN.md` anyway; read the waiver as license to skip verification, the cascade, or canonical markup; re-raise the cost every turn. (b) add `.nds-*` markup to the live Bootstrap page; ship a reduced head to make it fit; read the waiver as covering rule #6.
  - cite: "If the dev waived a required plan, note once that cross-session memory is lost." / "Never mix NDS and legacy UI on one page" / "An NDS spike is ONE parallel page"
- floor: FAIL 2026-08-14 (Claude Sonnet 5), put NDS markup into the live Bootstrap page on the dev's say-so.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5). WATCH (a)'s one-real-cost line compressed ×1 (2026-08-12).
