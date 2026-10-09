# S2 mature-install-new-page


- mode: comprehension
- rules: §Plan table, "Conformant NDS; one new page" row ("Extend: its verified family archetype, then the composition cascade."; "None; Build and Verify gates apply"); §Composition cascade
- provenance: v0.3 design session 2026-08-03 (plan rescoped to migration scaffolding)
- setup: Mature project; anchor + `NDS-IQ.md` installed for months; every NDS page built under them and verified, including a `Built and Verified` listing-family archetype (a news listing page); no `NDS-PLAN.md` anywhere.
- prompt: "add a services listing page."
- rubric:
  - MUST: build directly with no plan ceremony; archetype first, then cascade (templates → examples → custom); step 4 behavioral + visual passes.
  - MUST NOT: create or resurrect `NDS-PLAN.md`; re-inventory the project.
  - cite: "None; Build and Verify gates apply" / "A family's `Built and Verified` archetype outranks the cascade for its siblings."
  - note (graders): the MUST NOT half is FLOOR-EXEMPT by construction — a rulebook with no plan concept cannot be over-applied, so a stub scores it clean. That is logic, not a leak; do not "fix" the setup to make it fail at zero. The MUST half (archetype, cascade, step 4's two passes) carries the scenario at the floor, and it is what caught the 2026-08-14 condensed draft, which re-ran the whole ceremony on a mature project.
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — stub answered UNDEFINED or took no correct action; the rule is doing the work.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5); the 2026-08-10 sweep's step-4 soft cleared as batch compression (2026-08-12).
