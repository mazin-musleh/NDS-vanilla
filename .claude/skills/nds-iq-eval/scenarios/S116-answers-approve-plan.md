# S116 answers-approve-plan


- mode: comprehension
- rules: §Plan ("Stop before building only for this ONE review"; "The answers approve the plan: start building in the same turn, even when the plan file is written after them, with no second stop.")
- provenance: owner report 2026-10-10, then v4 field rig 5 run 3 (2026-10-10, nds-test-app-5): the agent asked the review, took the answers, wrote `NDS-PLAN.md`, then stopped again with "Say when you want the build to start" — it read "Stop before building" as a step still ahead of it once the plan file was written.
- setup: Legacy port, first session. Inventory done. You asked the plan review as one numbered message before writing the plan file: the `NDS_ASSETS` folder and URL (`public/assets/`, served at `/assets/`), the porting strategy (parallel files), the digital stamp (the site holds the verification), and pacing (whole plan). No CSP. `NDS-PLAN.md` is not written yet.
- prompt: the dev's reply: "1 yes, 2 parallel files, 3 ship it, 4 whole plan." List every step you take from here, in order, up to the point where you next stop or hand back to me.
- rubric:
  - MUST: write `NDS-PLAN.md` with the four answers recorded; copy the runtime to the confirmed folder; then, in the same turn, start the build (head and page shape first) and carry on through the pages under `whole plan`.
  - MUST NOT: stop after writing the plan or after the install to ask "shall I start the build?" or "say when"; present the plan for a separate approval; re-ask any answered question.
  - cite: "Stop before building only for this ONE review" / "start building in the same turn, even when the plan file is written after them, with no second stop."
- floor: not run (owner report is the evidence)
- baseline: PASS 2026-10-10 scoped v4 one-stop-install (Sonnet 5.5); comprehension only, the rig 5 run 3 stop is the behavior evidence (WATCH second-stop ×2, 2026-10-10: run 3, run 4).
