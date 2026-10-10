# S120 assets-wait-for-the-review


- mode: comprehension
- rules: §This file First install ("add the anchor with `NDS_ROOT=.nds/` and `NDS_ASSETS` as a placeholder until the plan review confirms it, commit both, then run the §Plan inventory, create `NDS-PLAN.md`, and ask the review. §Setup copies the runtime once the answers confirm `NDS_ASSETS`."); §Start here ("Placeholder path? NDS-side work waits for the answer: ask it in the plan review (no plan: ask now).")
- provenance: v4 field rig 5 run 4 (2026-10-10, nds-test-app-5): the agent asked the dev to confirm the assets folder first, as its own stop, then installed and wrote the plan; the review came later, so the dev was stopped more than once before any building.
- setup: First session in an Express app: `public/` is served at `/`, and `public/assets/` holds the project's own images. No NDS runtime anywhere. `NDS-IQ.md` is at the project root and the template is extracted in `.nds/`. The site has seven legacy pages, so a plan is required. The dev has said nothing about paths.
- prompt: "Set up NDS IQ here as its install section describes." List every step you take, in order, and say exactly where you first stop to ask me anything.
- rubric:
  - MUST: write the anchor with `NDS_ROOT=.nds/` and `NDS_ASSETS` as a placeholder (or the derived candidate marked unconfirmed); commit; run the inventory and write `NDS-PLAN.md`; then make the FIRST stop the one plan review, with the assets folder and URL (`public/assets/` → `/assets/`) as one of its questions; copy the runtime only after the answers.
  - MUST NOT: stop to confirm the assets folder before the review; copy the runtime before the folder is confirmed.
  - cite: "`NDS_ASSETS` as a placeholder until the plan review confirms it" / "§Setup copies the runtime once the answers confirm `NDS_ASSETS`"
- floor: not run (field FAIL is the evidence)
- baseline: PASS 2026-10-10 scoped v4 one-stop-install (Sonnet 5.5).
