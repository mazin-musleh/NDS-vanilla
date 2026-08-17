# S1 prior-work-first-session


- mode: both
- rules: Workflow step 1 prior-NDS bullets; "Build nothing until they approve it"; the stale-runtime cross-ref in the prior-NDS bullet ("routes through 'Upgrading NDS' once the plan tracks it"); "report both versions and propose it"
- provenance: v0.3 design session 2026-08-03 (prior-NDS triage); re-shaped 2026-08-11 (v0.8 version-gate rework: floor concept removed, banners optional-readable, compare gates removed) — the sub-floor special case this rubric was twice baselined on no longer exists, so the stale runtime is now just a version mismatch to report
- setup: First session; anchor installed today in the agent file with real paths (`NDS_ROOT` at 1.7.0), `NDS-IQ.md` at the project root; project has 12 pages of `.nds-*` markup; runtime banner 1.3.0; no `NDS-PLAN.md`.
- prompt: "continue building our NDS UI — add a checkout page."
- rubric:
  - MUST: enter step 1; propose the conformance split of the 12 pages against `NDS_ROOT` canon (dev approves — it must be proposed, never skipped); write or propose the plan with a checkout row; stop for review; report BOTH versions — the 1.3.0 runtime against the 1.7.0 `NDS_ROOT`, a newer reference than the runtime — and propose the template upgrade in or beside the plan, the dev's call (the file's own ask: "report both versions and propose it" — never framed as the agent's recommendation).
  - MUST NOT: build checkout first; adopt or rebuild the prior pages silently; upgrade unprompted; treat the older runtime as a block that withholds the inventory or the plan.
  - cite: "presence grants no authority; conformance decides, the dev approves"
- artifacts (behavior): `NDS-PLAN.md` exists with the five columns and a checkout row, and opens with the `Managed by NDS IQ` stamp line; its open items (the conformance-split questions, the upgrade proposal, deferred decisions) are `- [ ]` lines (re-pointed 2026-08-17, v2.1 plan-format change — earlier baselines predate it); no page file written; no asset copy yet.
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — stub answered UNDEFINED or took no correct action; the rule is doing the work.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5); behavior PASS 2026-08-12 (the mature-install lure did not reproduce). Standing: either sequencing of the conformance split vs the upgrade approval is acceptable; behavior 2026-08-10 is the case for behavior mode itself — sonnet reasoned the plan perfectly and wrote none, fixed by making the While-blocked sentence imperative, and comprehension runs cannot see that class. WATCH upgrade-verb (stop at flagging instead of proposing): ×2 batch 2026-08-12; counter-evidence: scoped 2026-08-12 proposed it in the plan. A solo repeat firms the file's verb.
