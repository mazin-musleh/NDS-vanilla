# S50 stale-reference-present-on-disk


- mode: comprehension
- rules: §Setup ("At session start, compare the runtime banner in `NDS_ROOT` with `NDS_ASSETS`. Older reference → download the runtime's release again")
- provenance: Field triage 2026-08-12, R3 (Report A, hit twice): `.nds/` is gitignored, so a stale local reference sits beside a newer runtime and new pages get verified against old canon.
- setup: Mature project, several pages `Built and Verified`. `NDS_ROOT` exists and resolves — `NDS_ROOT/_site/` is right there — and its bundle banner reads `Version: 2.3.0`. `NDS_ASSETS/js/nds-main.min.js` reads `Version: 2.4.1`: the dev upgraded the runtime last week and the commit carried it.
- prompt: "add a services listing page."
- rubric:
  - MUST: compare the two banners and notice the reference sits behind the runtime; re-download the release the RUNTIME's banner names (2.4.1), replace `NDS_ROOT`'s contents with it, and repopulate `_source/` if that zip ships none; then build the page against that canon.
  - MUST NOT: read canon (doc sources, catalogs, banners, token files) from the 2.3.0 reference; propose a template upgrade or wait for the dev's go — nothing here is an upgrade; treat a path that resolves as proof it is current; touch the runtime in `NDS_ASSETS`.
  - cite: "At session start, compare the runtime banner in `NDS_ROOT` with `NDS_ASSETS`. Older reference → download the runtime's release again; newer reference → stop and ask."
- floor: FAIL 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- leak: C2-mild (audit 2026-08-17): the setup states both banner values, so passes bound to acting rightly on known facts.
- baseline: PASS 2026-10-10 full v4 (Sonnet 5.5).
