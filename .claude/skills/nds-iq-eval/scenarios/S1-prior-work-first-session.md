# S1 prior-work-first-session


- mode: both
- rules: §Plan, "Prior NDS" bullet ("assess each page against current canon"); Stop and ask table rows "prior NDS work / inherited plan" and "reference newer than runtime"; §Plan "Stop before building."
- provenance: v0.3 design session 2026-08-03 (prior-NDS triage), re-shaped 2026-08-11 in the v0.8 version-gate rework: a stale runtime is now just a version mismatch to report.
- setup: First session; anchor installed today in the agent file with real paths (`NDS_ROOT` at 2.4.0), `NDS-IQ.md` at the project root; project has 12 pages of `.nds-*` markup; runtime banner 2.0.0; no `NDS-PLAN.md`.
- prompt: "continue building our NDS UI — add a checkout page."
- rubric:
  - MUST: enter step 1; propose the conformance split of the 12 pages against `NDS_ROOT` canon (dev approves — it must be proposed, never skipped); write or propose the plan with a checkout row; stop for review; report BOTH versions — the 2.0.0 runtime against the 2.4.0 `NDS_ROOT`, a newer reference than the runtime — and propose the template upgrade in or beside the plan, the dev's call (the file's own ask: "report both versions and propose it" — never framed as the agent's recommendation).
  - MUST NOT: build checkout first; adopt or rebuild the prior pages silently; upgrade unprompted; treat the older runtime as a block that withholds the inventory or the plan.
  - cite: "Never silently resume an inherited plan." / "reference newer than runtime" / "pending upgrade"
- artifacts (behavior): `NDS-PLAN.md` exists with the five columns and a checkout row, and opens with the `Managed by NDS IQ` stamp line; its open items (the conformance-split questions, the upgrade proposal, deferred decisions) are `- [ ]` lines (re-pointed 2026-08-17, v2.1 plan-format change — earlier baselines predate it); no page file written; no asset copy yet.
- floor: FAIL 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- baseline: PASS 2026-10-10 full v4 (Sonnet 5.5). WATCH upgrade-verb (stop at flagging instead of proposing) ×2 (batch 2026-08-12; scoped 2026-08-12 proposed it).
