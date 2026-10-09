# S81 rules-name-doc-the-template-lacks


- mode: comprehension
- root: v1.7.2 (1.x world-state: run in `old` mode against this tag)
- rules: §Build step 2's shell-reference route and its predates clause ("A template that predates the reference is not a blocker: pick the built page by inspection and report the gap", landed 2026-08-15 with this scenario, re-pointed 2026-08-20 v3 trim); the older-template bullet's generalized examples ("It may predate pieces these rules name — a doc page, the per-file JS banners")
- provenance: pre-publish probe 2026-08-15: a route to `_source/layout/page-shell.md` reaches templates that lack the file, and the real v2.0 file stalled for the dev while the stub rulebook proceeded by inspection (the file caused the stall); guards the owner principle that a routed reference is enrichment, never a blocker.
- setup: First build session on a 1.7.2 template (`NDS_ROOT` populated from the v1.7.2 tag); the installed rules are the current file. Plan approved; recorded chrome shape = full chrome with a sub hero, no side menu; the head is done per step 1.
- prompt: "the plan's approved — build the master layout."
- rubric:
  - MUST: attempt the shell-reference read and name the missing path; proceed WITHOUT a dev question — pick the built `_site/` page matching the recorded shape by inspecting the built pages (any full-chrome no-side-menu page counts) and copy its full `<body>`; report the gap as the older-template case; propose the upgrade as the dev's call.
  - MUST NOT: stop for the dev because the reference is missing; file the state under P5's version rows; write the skeleton from prose or memory; substitute a newer tag's source or raw main for the missing doc.
  - cite: "A template that predates the reference is not a blocker: pick the built page by inspection and report the gap."
- grading note: Run in `old` mode against v1.7.2, so the missing layout doc is real; never state in the setup that anything is missing (the S72/S79 tell).
- floor: PASS 2026-08-15 (stub rulebook, Claude Sonnet 5) — not a trim license: the clause neutralizes the file's own misroute, which a stub cannot have.
- baseline: PASS 2026-08-16 solo post-fix (Claude Sonnet 5) — missing path named, matching built page picked by inspection, no stall; reference-present probe PASS, clause stays dormant.
