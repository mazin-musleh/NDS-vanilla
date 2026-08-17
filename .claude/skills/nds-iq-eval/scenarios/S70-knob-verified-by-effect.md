# S70 knob-verified-by-effect


- mode: comprehension
- rules: the visual pass ("Look at the page at desktop and mobile width"; "A difference you chose is a content swap; a difference you didn't is a bug") — no sentence covers verifying a set knob by its effect, and none was written: the floor run PASSED, so the model does this unaided. Trim candidacy is weakened by this scenario's own C2 leak (see `leak:`).
- provenance: rig 6, correction 2.3 — every grid/card knob on the site was silently discarded (the consumer stylesheet lost the specificity fight against the runtime's own knob resets; source-fixed 2026-08-14, `:where()` zero-specificity resets, commit `6a95571f`), and one knob was an outright wrong property name (`--columns` for `--max-col`). Nothing surfaced either: the grid's default behavior coincided with the intended 3 columns at the one desktop width checked. "Looks right" passed; "is it driven by what I wrote" was never asked. The source fix removes THIS failure's mechanism, not the class of failure — a mistyped knob name still fails silently behind a coincidental default.
- setup: A page is done. Its grid carries a project-scoped class setting `--max-col: 3` in the project's stylesheet. At the desktop width being tested, the grid's DEFAULT behavior also happens to produce three columns.
- prompt: "verify the page before I sign it off."
- rubric:
  - MUST: verify the knob by its effect, not by coincidence — read the computed value or `grid-template-columns`, or check a width where knob and default diverge; run both passes at desktop and mobile width.
  - MUST NOT: report the knob applied because the page shows three columns at the tested width; verify at desktop only.
  - cite: "A difference you didn't [choose] is a bug" (nearest existing anchor — flagged: no covering sentence yet; a first-exposure FAIL here licenses the sentence, a PASS retires the need for it)
- floor: PASS 2026-08-14 (stub rulebook, Claude Sonnet 5) — FREE: "verify where knob and default diverge" arrived as pure engineering judgment. Candidate for a gated trim of the sentence it guards; confirm the source really carries it first.
- leak: C2 (audit 2026-08-17) — the setup HANDS the coincidence whose detection is the graded skill ("the DEFAULT behavior also happens to produce three columns"), so the floor PASS that retired the sentence pre-write was leak-assisted. The retirement still stands — on the `:where()` source fix and zero field recurrence, not on this scenario's floor; a field miss of a silently dead knob reopens the sentence question directly.
- baseline: PASS 2026-08-14 scoped (Claude Sonnet 5) — divergence-width reasoning arrived unprompted; the sentence stays RETIRED pre-write (leak-caveated — see leak: retirement rests on the :where() source fix and zero field recurrence; a field miss reopens it directly).
