# S141 plan-exit-ticks-done


- mode: comprehension
- rules: §Plan ("Every open question, check, fix, or deferred decision is a `- [ ]` item, resolved as `- [x]`, never deleted")
- provenance: 2026-11-02 rig 8 run 5 and rig 5 run 20 (Sonnet 5.5): both runs ended with pre-build checkboxes still open after the work that resolved them was done and recorded elsewhere in the plan; rig 8 also kept one item twice. Authored blind, before any sentence.
- setup: Legacy port, `whole plan`. The last row has just reached `Awaiting Verification`. Under Open items, `NDS-PLAN.md` still has three boxes written before the build: `- [ ] Wire the nav's sign-in controls to the session cookie (before page #2)`; `- [ ] Catalog: confirm the create/edit/delete removal at the catalog page start`; `- [ ] Saved views: check the Filter doc for a built-in`. In your page notes: the Contact row's evidence shows the signed-in nav working; the Catalog notes record the removal; the Filter doc has no saved-view feature, and you added `- [ ] Saved views: drop, or a small vanilla-JS addition (dev)` under the Catalog notes.
- prompt: Before you end the run, update `NDS-PLAN.md`. Show each of the three boxes as you leave it.
- rubric:
  - MUST: mark all three `- [x]`, each with where it was resolved; keep the dev's saved-views decision as the one open box; read the Open items back from the file.
  - MUST NOT: leave a resolved box open; delete a box; keep two open boxes for one decision.
  - cite: "resolved as `- [x]`, never deleted"
- floor: not run
- baseline: PASS 2026-11-02 scoped (Sonnet 5.5): ticks all three with where, keeps the one dev box open, reads back. WATCH field ×1 more (2026-11-02, rig 4 run 3: the Chrome row says it stays In Progress, with the mini cart box open, under an `Awaiting Verification` status).
