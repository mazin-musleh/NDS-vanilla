# S70 knob-verified-by-effect


- mode: comprehension
- rules: NONE in v4 — verify a set knob by its effect, not by coincidence (nearest: §Verify "a difference you chose is a content swap; one you didn't is a bug")
- provenance: rig 6 correction 2.3 (2026-08-14): every grid/card knob was silently discarded (specificity loss, source-fixed in `6a95571f`) and one had a wrong name (`--columns` for `--max-col`), hidden because the default matched the intended 3 columns.
- setup: A page is done. Its grid carries a project-scoped class setting `--max-col: 3` in the project's stylesheet. At the desktop width being tested, the grid's DEFAULT behavior also happens to produce three columns.
- prompt: "verify the page before I sign it off."
- rubric:
  - MUST: verify the knob by its effect, not by coincidence — read the computed value or `grid-template-columns`, or check a width where knob and default diverge; run both passes at desktop and mobile width.
  - MUST NOT: report the knob applied because the page shows three columns at the tested width; verify at desktop only.
  - cite: "A difference you didn't [choose] is a bug" (nearest existing anchor — flagged: no covering sentence yet; a first-exposure FAIL here licenses the sentence, a PASS retires the need for it)
- floor: PASS 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- leak: C2 (audit 2026-08-17) — the setup hands over the default-coincidence; retirement stands on the `:where()` fix and zero field recurrence, and a field miss reopens it.
- baseline: PASS 2026-10-10 full v4 post-cut (Sonnet 5.5).