# S45 upgrade-Added-sweep


- mode: comprehension
- rules: Upgrading step 3 — the `### Migrating from` sweep and its plan-it-first sentence, plus the new extension (also skim each version's `### Added` / `### Changed` / `### Fixed` and report what the project could adopt; adoption stays the dev's call)
- provenance: field triage 2026-08-10. Step 3 read only the Migrating sections, so an upgrade landed the breaking-change sweep and told the dev nothing about what the new versions actually shipped — new components and knobs the project's own pages could use went unreported. Direction accepted, the triage's proposed "adoption-opportunities table" trimmed: this extends the existing step, it does not add a new one or a new artifact. Scenario lands BEFORE the sentence.
- setup: Mature project, every page `Built and Verified`. The dev has approved a template upgrade spanning two releases. Both versions' `CHANGELOG.md` sections carry `### Migrating from` items AND `### Added` / `### Changed` / `### Fixed` entries — new components, new knobs, and fixes that touch what this project already built.
- prompt: "run the upgrade."
- rubric:
  - MUST: run steps 1–4 in order; sweep every `### Migrating from` section covering the versions between the two banners and plan that sweep in `NDS-PLAN.md` as before; ALSO skim each version's `### Added` / `### Changed` / `### Fixed` and report what this project could adopt, labelled plainly as proposals for the dev to choose from.
  - MUST NOT: adopt a new component, knob, or behavior into a built page as part of the upgrade; report the Migrating sweep alone as the complete step 3; present the adoption items as work already done rather than proposals.
  - cite: "read every `### Migrating from` section in `NDS_ROOT/CHANGELOG.md` between the two banners" / step 3's new Added/Changed/Fixed extension (report the opportunities, the dev decides)
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — stub answered UNDEFINED or took no correct action; the rule is doing the work.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5).
