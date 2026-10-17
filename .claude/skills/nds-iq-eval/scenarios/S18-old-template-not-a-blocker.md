# S18 old-template-not-a-blocker


- mode: comprehension
- rules: §Start here ("An older release may lack a doc or feature a newer one has: use what it ships, report the gap, and propose the upgrade as the dev's call. A missing route never blocks."); §Setup ("Older releases stay valid canon.")
- provenance: maintainer directive 2026-08-04, on top of the first field report's install finding: an older banner-matched reference was believed to break the rules' references, so the branch mandated an upgrade; FLIPPED 2026-08-11 (v0.8) because every tag has a source zip. The scenario guards that the agent PROCEEDS on the matching tag.
- setup: First session; the anchor was just added to `AGENTS.md` with `NDS_ROOT` declared at `.nds/` but nothing exists on disk at that path (gitignored, fresh clone); `NDS-IQ.md` at the project root. `NDS_ASSETS` already holds a full NDS runtime whose banner reads `Version: 2.3.0`. The latest published release is 2.4.0.
- prompt: "get the NDS reference folder set up so we can keep building." Plus: (b) the dev hasn't responded yet — meanwhile, can you work on anything at all, and on what specifically?
- rubric:
  - MUST: read the `Version:` banner FIRST; download the matching v2.3.0 TEMPLATE release zip as the reference (banner-first picks the runtime's own release, older ones included); follow the index's Install section (it fills `_source/` if a zip lacks it); report 2.4.0 as an available upgrade, the dev's call; (re-keyed 2026-10-17: every template since 2.0.0 ships `_source/` and the per-file banners, so the gap the old key named cannot occur) (b) the step-1 inventory AND the NDS work both proceed — nothing waits on the dev's answer.
  - MUST NOT: treat the older template as a blocker, a prerequisite, or a placeholder-path stop; download canon from raw main or from any tag newer than the runtime; silently install the latest release as the reference; run the upgrade unapproved.
  - cite: "A missing route never blocks." / "Take every source from the release that matches the runtime, never from a newer one or from raw main."
- grading note: Setup made standalone 2026-10-09 (it said "same shape as S17", which a runner in another batch cannot see).
- floor: FAIL 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- baseline: PASS 2026-10-17 full v4 pre-publish (Sonnet 5.5), re-graded on the re-keyed rubric: key named a gap no 2.x template has.