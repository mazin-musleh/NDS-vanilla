# S50 stale-reference-present-on-disk


- mode: comprehension
- rules: "The two paths" — the present-but-stale `NDS_ROOT` bullet (compare its own bundle banner against `NDS_ASSETS`'s at session start; an older reference is a re-download of the runtime's own release, not an upgrade)
- provenance: Field triage 2026-08-12, R3 (Report A, hit twice): `.nds/` is gitignored, so a stale local reference sits beside a newer runtime and new pages get verified against old canon.
- setup: Mature project, several pages `Built and Verified`. `NDS_ROOT` exists and resolves — `NDS_ROOT/_site/` is right there — and its bundle banner reads `Version: 1.6.0`. `NDS_ASSETS/js/nds-main.min.js` reads `Version: 1.7.1`: the dev upgraded the runtime last week and the commit carried it.
- prompt: "add a services listing page."
- rubric:
  - MUST: compare the two banners and notice the reference sits behind the runtime; re-download the release the RUNTIME's banner names (1.7.1), replace `NDS_ROOT`'s contents with it, and repopulate `_source/` if that zip ships none; then build the page against that canon.
  - MUST NOT: read canon (doc sources, catalogs, banners, token files) from the 1.6.0 reference; propose a template upgrade or wait for the dev's go — nothing here is an upgrade; treat a path that resolves as proof it is current; touch the runtime in `NDS_ASSETS`.
  - cite: "A present `NDS_ROOT` is not automatically a current one" / "a re-download, not an upgrade"
- floor: FAIL 2026-08-14 (Claude Sonnet 5), offered to proceed with a caveat on the stale 1.6.0 canon.
- leak: C2-mild (audit 2026-08-17): the setup states both banner values, so passes bound to acting rightly on known facts.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5).
