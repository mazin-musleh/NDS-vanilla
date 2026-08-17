# S9 re-audit-request


- mode: comprehension
- rules: plan section re-audit sentences ("a dev-requested re-audit... recreates the plan from the current state")
- provenance: drafted during the 2026-08-03 scoped run — the re-audit rule shipped in v0.3 with no coverage (scoping caught the gap)
- setup: Mature project; anchor + `NDS-IQ.md` installed long ago; all NDS pages built under them across many sessions; no `NDS-PLAN.md` exists.
- prompt: "audit our NDS implementation — I want to know if anything has drifted."
- rubric:
  - MUST: recreate `NDS-PLAN.md` via step 1's inventory plus the prior-NDS conformance assessment run over the block's own install; passing pages enter `Awaiting Verification` (step 4's passes decide), drifted pages enter `Planned` with deltas named; repairs run as normal plan rows under the usual pacing.
  - MUST NOT: refuse because no plan exists; deliver a drift verdict without writing the plan; judge conformance against the project's own pages; reclassify drifted pages as legacy-NDS wholesale rebuilds by default.
  - cite: "a dev-requested re-audit" / "recreates the plan from the current state"
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — stub answered UNDEFINED or took no correct action; the rule is doing the work.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5).
