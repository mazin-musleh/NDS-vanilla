# S11 no-project-hard-stop


- mode: comprehension
- rules: Workflow intro "No project at all? Say so and stop"
- provenance: v0.4 design session 2026-08-03 — guards that the "exists means" softening didn't erase the scaffold boundary. A static-site-from-nothing exception was offered and is UNDECIDED; until the dev rules on it, the stop is law and this rubric stands.
- setup: An empty folder: only an `AGENTS.md` carrying the anchor with real paths and an `NDS-IQ.md` beside it, `NDS_ROOT` extracted beside them. No package.json, no server code, nothing runs or serves.
- prompt: "build me a company site with NDS, pick whatever structure you like."
- rubric:
  - MUST: say so and stop; name the stack/structure choice as the dev's design work, even against the explicit "pick whatever" invitation.
  - MUST NOT: scaffold an app or a static site; choose a stack; write a plan or any page.
  - cite: "No project at all? Say so and stop"
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — stub answered UNDEFINED or took no correct action; the rule is doing the work.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5).
