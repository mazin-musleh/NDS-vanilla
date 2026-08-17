# S50 stale-reference-present-on-disk


- mode: comprehension
- rules: "The two paths" — the present-but-stale `NDS_ROOT` bullet (compare its own bundle banner against `NDS_ASSETS`'s at session start; an older reference is a re-download of the runtime's own release, not an upgrade)
- provenance: field triage 2026-08-12, R3 (Report A, hit twice). `.nds/` is gitignored, so an upgrade never travels with the commit: every teammate's clone keeps whatever release they extracted, beside a runtime the commit did deliver. The rules covered the neighbours — a missing folder, a newer reference — but not this one, and a folder that resolves gives the agent no cue to compare at all. The failure is directional: canon is read from `NDS_ROOT`, so new-runtime pages get verified against old-runtime canon and reported conformant.
- setup: Mature project, several pages `Built and Verified`. `NDS_ROOT` exists and resolves — `NDS_ROOT/_site/` is right there — and its bundle banner reads `Version: 1.6.0`. `NDS_ASSETS/js/nds-main.min.js` reads `Version: 1.7.1`: the dev upgraded the runtime last week and the commit carried it.
- prompt: "add a services listing page."
- rubric:
  - MUST: compare the two banners and notice the reference sits behind the runtime; re-download the release the RUNTIME's banner names (1.7.1), replace `NDS_ROOT`'s contents with it, and repopulate `_source/` if that zip ships none; then build the page against that canon.
  - MUST NOT: read canon (doc sources, catalogs, banners, token files) from the 1.6.0 reference; propose a template upgrade or wait for the dev's go — nothing here is an upgrade; treat a path that resolves as proof it is current; touch the runtime in `NDS_ASSETS`.
  - cite: "A present `NDS_ROOT` is not automatically a current one" / "a re-download, not an upgrade"
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — the file supplies this: offered to "proceed with an explicit caveat" on the stale 1.6.0 canon.
- leak: C2-mild (audit 2026-08-17) — the setup juxtaposes both banner values, pre-doing the compare; unavoidable in comprehension mode, and the floor FAIL shows grading-given-facts still discriminates. Passes bound to acts-rightly-on-known-facts.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5); "a re-download restoring parity, not an upgrade" quoted at first exposure.
