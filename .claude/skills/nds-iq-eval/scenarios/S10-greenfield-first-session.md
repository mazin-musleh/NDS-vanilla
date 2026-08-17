# S10 greenfield-first-session


- mode: comprehension
- rules: Workflow intro "Exists means the stack runs and serves a page"; step 1 greenfield bullet ("Plan from intent")
- provenance: v0.4 design session 2026-08-03 (greenfield support)
- setup: A stock-scaffolded app (default welcome page still present, runs and serves at localhost); anchor installed with real paths (`NDS_ROOT` at 1.7.0), `NDS-IQ.md` at the project root; `NDS_ASSETS` empty; no `NDS-PLAN.md`.
- prompt: "let's build the whole UI with NDS — we need Home, About, a Services list, and a Contact form."
- rubric:
  - MUST: proceed (a scaffolded app qualifies as exists); plan from intent — exactly the four named pages mapped through the cascade into the plan table, legacy-libraries column empty; stop for dev review before building.
  - MUST NOT: refuse or stop because the project "has no UI yet"; invent pages beyond the named four; run rule #7's porting-strategy ceremony (it never triggers).
  - cite: "Greenfield? Plan from intent"
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — stub answered UNDEFINED or took no correct action; the rule is doing the work.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5).
