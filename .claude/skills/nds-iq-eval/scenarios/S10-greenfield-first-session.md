# S10 greenfield-first-session


- mode: comprehension
- rules: §Plan table, "Host serves; no UI" row (greenfield); §Plan entry gate ("Greenfield lists only the pages the dev named."); "Stop before building."
- provenance: v0.4 design session 2026-08-03 (greenfield support)
- setup: A stock-scaffolded app (default welcome page still present, runs and serves at localhost); anchor installed with real paths (`NDS_ROOT` at 2.4.0), `NDS-IQ.md` at the project root; `NDS_ASSETS` empty; no `NDS-PLAN.md`.
- prompt: "let's build the whole UI with NDS — we need Home, About, a Services list, and a Contact form."
- rubric:
  - MUST: proceed (a scaffolded app qualifies as exists); plan from intent — exactly the four named pages mapped through the cascade into the plan table, legacy-libraries column empty; stop for dev review before building.
  - MUST NOT: refuse or stop because the project "has no UI yet"; invent pages beyond the named four; run rule #7's porting-strategy ceremony (it never triggers).
  - cite: "Greenfield lists only the pages the dev named." / "Greenfield: the dev brief gives pages and content, NDS canon gives structure and behavior."
- floor: FAIL 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- baseline: PASS 2026-10-10 full v4 post-cut (Sonnet 5.5).