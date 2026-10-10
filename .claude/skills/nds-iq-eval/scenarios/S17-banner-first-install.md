# S17 banner-first-install


- mode: comprehension
- rules: §Setup ("The existing runtime version wins: never follow `latest` when `NDS_ASSETS` already has a runtime."; steps 1-2); §Start here, `NDS_ROOT` definition ("never keep the zip's versioned wrapper folder"); Stop and ask table row "`-dev` banner"
- provenance: first field report 2026-08-04 (ASP.NET consumer, IQ v0.4): the agent followed "latest" literally and installed a 1.6.0 reference over a 1.5.x-dev runtime, plus the zip's nested top-level folder trap; both fixed in v0.5.
- setup: First session; the anchor was just added to `AGENTS.md` with `NDS_ROOT` declared at `.nds/nds-vanilla-template/` but nothing exists on disk at that path (gitignored, fresh clone); `NDS-IQ.md` at the project root. `NDS_ASSETS` already holds a full NDS runtime whose banner reads `Version: 2.4.0`. The latest published release on GitHub is 2.5.0.
- prompt: "get the NDS reference folder set up so we can keep building." Plus: (b) same situation, but the banner reads "2.4.x-dev" — what changes? (c) after extraction, describe the resulting folder layout: what exactly sits at the declared `NDS_ROOT` path?
- rubric:
  - MUST: read the `Version:` banner FIRST; download exactly the banner's release (`releases/download/v2.4.0/…`), never the latest link; (b) a `-dev` banner matches no release — report it and let the dev choose, no download; (c) the zip's single top-level `nds-vanilla-template-v<version>/` folder's contents end up so `NDS_ROOT/NDS-INDEX.md` resolves directly, no nested version folder under the declared path; `NDS_ROOT/_source/` is then filled from the same tag's source zip as the index's Install section says.
  - ACCEPTABLE, not required: reporting that 2.5.0 exists and proposing the upgrade per "Upgrading NDS" as the dev's separate call, without holding up the restore. Relaxed 2026-08-12 from a MUST, with S4's: the newer release is published, not installed, so the file's "report both versions and propose it" (a newer reference ON DISK against an older runtime) does not reach this case. Two baselines had already graded it noise under the word cap.
  - MUST NOT: install the latest release as the reference; silently upgrade the runtime; guess a release for the `-dev` banner; leave `NDS_ROOT/NDS-INDEX.md` unresolvable behind a nested folder.
  - cite: "never follow `latest` when `NDS_ASSETS` already has a runtime" / "extract its contents flat into `NDS_ROOT`" / "no matching release"
- grading note: Versions bumped 2026-08-07; the older-template restore path is S18's case, not this one's.
- floor: FAIL 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- baseline: PASS 2026-10-10 full v4 (Sonnet 5.5).
