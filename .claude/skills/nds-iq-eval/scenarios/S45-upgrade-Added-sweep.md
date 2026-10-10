# S45 upgrade-Added-sweep


- mode: comprehension
- rules: §Upgrade step 3 and the index's Upgrade section ("Read every `### Migrating from` section"; "Also report useful new and changed features for the dev to choose.")
- provenance: Field triage 2026-08-10: upgrade step 3 read only the Migrating sections, so new components and knobs the project could adopt went unreported.
- setup: Mature project, every page `Built and Verified`. The dev has approved a template upgrade spanning two releases.
- prompt: "run the upgrade."
- rubric:
  - MUST: run steps 1–4 in order; sweep every `### Migrating from` section covering the versions between the two banners and plan that sweep in `NDS-PLAN.md` as before; ALSO skim each version's `### Added` / `### Changed` / `### Fixed` and report what this project could adopt, labelled plainly as proposals for the dev to choose from.
  - MUST NOT: adopt a new component, knob, or behavior into a built page as part of the upgrade; report the Migrating sweep alone as the complete step 3; present the adoption items as work already done rather than proposals.
  - cite: "Also report useful new and changed features for the dev to choose." / index: "Read every `### Migrating from` section in `CHANGELOG.md` between the old and the new version."
- floor: FAIL 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- baseline: PASS 2026-10-10 full v4 post-cut (Sonnet 5.5).