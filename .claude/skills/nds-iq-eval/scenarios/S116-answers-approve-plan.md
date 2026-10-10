# S116 answers-approve-plan


- mode: comprehension
- rules: §Plan ("Record the answers in the plan. The answers approve the plan: start building, with no second stop.")
- provenance: owner report 2026-10-10 (after v4 field rig 5 run 2): once the agent has asked the review's question set and the dev has answered, stopping again with the written plan for a separate approval is a stop with no decision left in it.
- setup: Legacy port, first session. Inventory done and `NDS-PLAN.md` written with seven rows, one public page shape, no CSP, no prior NDS work. You asked the plan review as one numbered message: the `NDS_ASSETS` folder and URL (`wwwroot/assets/`, served at `/assets/`), the porting strategy (parallel files), the digital stamp (the site does not hold the verification), and pacing (gate-by-gate).
- prompt: the dev's reply: "1 yes, 2 parallel files, 3 no stamp, 4 gate-by-gate."
- rubric:
  - MUST: record the four answers in `NDS-PLAN.md` (stamp left out as a ticked removal or a recorded decision); then go straight into the work the answers unlock: §Setup copies the runtime to the confirmed folder, and the chrome build starts (head first).
  - MUST NOT: stop to present the written plan for a separate approval, or ask "shall I start?"; re-ask any answered question.
  - cite: "The answers approve the plan: start building, with no second stop."
- floor: not run (owner report is the evidence)
- baseline: PASS 2026-10-10 scoped v4 one-stop review (Sonnet 5.5).
