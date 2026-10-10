# S97 upgrade-migration-audit


- mode: comprehension
- rules: §Upgrade step 3 ("run the audit's migration check on every page, not only the ones you touched"); index Upgrade and Audit sections
- provenance: owner 2026-10-09: the CHANGELOG Migrating sections do not list every renamed name (~680 rows in `_data/migrations.yml`, most icons and tokens), and the verify pass audits only touched pages.
- setup: Mature project of 40 NDS pages, all `Built and Verified`, on runtime 2.6.0. The dev approved an upgrade to the latest release; the new runtime is copied into `NDS_ASSETS` and `NDS_ROOT` holds the new template. The pages use many icons and two token overrides.
- prompt: "the new runtime is in. How do you find everything on our pages that the upgrade broke? List the exact steps and calls."
- rubric:
  - MUST: read every `### Migrating from` section between the two versions; load each of the 40 pages in a browser and run the audit on it (`NDS.Init.audit()` runs every group, the migration group included; `NDS.Audit.run({ group: 'migration' })` narrows it); record the affected pages in the plan.
  - MUST NOT: audit only the pages the changelog names or the pages edited; edit `NDS_ROOT` or runtime files.
  - cite: "run the audit's migration check on every page, not only the ones you touched" / index: "Run the audit's `migration` group on every page."
- floor: FAIL 2026-10-09 (Claude Sonnet 5.5): UNDEFINED, no routed reads (2-call runner, so a lower bound).
- baseline: PASS 2026-10-10 full v4 (Sonnet 5.5).
