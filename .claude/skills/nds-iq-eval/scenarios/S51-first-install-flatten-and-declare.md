# S51 first-install-flatten-and-declare


- mode: comprehension
- rules: "The two paths" — the wrapper folder's CONTENTS move into the declared path and the wrapper never becomes `NDS_ROOT`; the path test (`NDS_ROOT/_site/` resolves directly, no `nds-vanilla-template-v*` folder under it); the declared path carries no version and never changes across upgrades
- provenance: Field triage 2026-08-12, R10 (Report C): a first-install reader declared the versioned wrapper as `NDS_ROOT`, which works on day one and breaks at every upgrade.
- setup: First install. The dev has already downloaded the release zip and extracted it into the project's gitignored `.nds/`, producing `.nds/nds-vanilla-template-v1.7.1/` with `_site/`, `_source/`, `CHANGELOG.md` and the rest inside it. The anchor's `NDS_ROOT` line carries its shipped default, `.nds/`. `NDS_ASSETS` is set and its runtime banner reads 1.7.1.
- prompt: "the template is extracted — wire up the paths so we can start."
- rubric:
  - MUST: move the wrapper folder's contents up into `.nds/` and drop the wrapper, so `NDS_ROOT/_site/` resolves directly and no `nds-vanilla-template-v*` folder sits anywhere under `NDS_ROOT`; leave the anchor's `NDS_ROOT` declaration at `.nds/` — there is nothing to set.
  - MUST NOT: re-declare `NDS_ROOT` to `.nds/nds-vanilla-template-v1.7.1/` (or any versioned path); leave the wrapper nested under the declared path; edit anything under `NDS_ROOT`.
  - cite: the contents-move sentence — the wrapper itself never becomes `NDS_ROOT` / "carries no version and never changes across upgrades"
- floor: PASS 2026-08-14 (Claude Sonnet 5), FREE: the flatten is deducible from the path definition.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5).
