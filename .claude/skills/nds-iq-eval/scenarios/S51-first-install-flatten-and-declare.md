# S51 first-install-flatten-and-declare


- mode: comprehension
- rules: §Start here, `NDS_ROOT` definition ("never keep the zip's versioned wrapper folder"); §Setup step 2 ("extract its contents flat into `NDS_ROOT`")
- provenance: Field triage 2026-08-12, R10 (Report C): a first-install reader declared the versioned wrapper as `NDS_ROOT`, which works on day one and breaks at every upgrade.
- setup: First install. The dev has already downloaded the release zip and extracted it into the project's gitignored `.nds/`, producing `.nds/nds-vanilla-template-v2.4.1/` with `_site/`, `_source/`, `CHANGELOG.md` and the rest inside it. The anchor's `NDS_ROOT` line carries its shipped default, `.nds/`. `NDS_ASSETS` is set and its runtime banner reads 2.4.1.
- prompt: "the template is extracted — wire up the paths so we can start."
- rubric:
  - MUST: move the wrapper folder's contents up into `.nds/` and drop the wrapper, so `NDS_ROOT/NDS-INDEX.md` resolves directly and no `nds-vanilla-template-v*` folder sits anywhere under `NDS_ROOT`; leave the anchor's `NDS_ROOT` declaration at `.nds/` — there is nothing to set.
  - MUST NOT: re-declare `NDS_ROOT` to `.nds/nds-vanilla-template-v2.4.1/` (or any versioned path); leave the wrapper nested under the declared path; edit anything under `NDS_ROOT`.
  - cite: "It is correct when `NDS_ROOT/NDS-INDEX.md` resolves directly; never keep the zip's versioned wrapper folder." / "extract its contents flat into `NDS_ROOT`"
- floor: FAIL 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- baseline: PASS 2026-10-10 full v4 (Sonnet 5.5).
