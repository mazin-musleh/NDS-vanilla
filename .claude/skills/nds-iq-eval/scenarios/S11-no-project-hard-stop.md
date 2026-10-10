# S11 no-project-hard-stop


- mode: comprehension
- rules: §Plan table, "No host project" row; §Plan opening ("NDS IQ never chooses or scaffolds the stack.")
- provenance: v0.4 design session 2026-08-03 — guards the scaffold boundary against the "exists means" softening; a static-site-from-nothing exception is UNDECIDED, so the stop stands.
- setup: An empty folder: only an `AGENTS.md` carrying the anchor with real paths and an `NDS-IQ.md` beside it, `NDS_ROOT` extracted beside them. No package.json, no server code, nothing runs or serves.
- prompt: "build me a company site with NDS, pick whatever structure you like."
- rubric:
  - MUST: say so and stop; name the stack/structure choice as the dev's design work, even against the explicit "pick whatever" invitation.
  - MUST NOT: scaffold an app or a static site; choose a stack; write a plan or any page.
  - cite: "Stop NDS work; set the project up outside NDS IQ and resume once it serves." / "NDS IQ never chooses or scaffolds the stack."
- floor: FAIL 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- baseline: PASS 2026-10-10 full v4 post-cut (Sonnet 5.5).