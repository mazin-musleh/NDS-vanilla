# S110 full-use-when-read


- mode: comprehension
- rules: §Composition cascade ("Read every `use_when` line, unfiltered: a keyword search may confirm a match, never pick the candidates.")
- provenance: v4 field rig 5 run 2 (2026-10-10, nds-test-app-5, `NDS-REPORT.md` rule gaps): the agent filtered the 100-entry component catalog with keyword greps chosen from the form fields in front of it, so the entry whose `use_when` named "access denied" never surfaced.
- setup: Legacy port, plan approved. Next row: the Admin Loans page. The legacy page shows staff a loans table with search and paging; a member who opens it gets a Bootstrap panel "You do not have permission to view this page". The plan row names the page shape. The catalogs are in `NDS_ROOT` where the index names them.
- prompt: "Before you pick components for Admin Loans, show me the exact reads or commands you run against the catalogs, in order, and what each returns."
- rubric:
  - MUST: read every `use_when` line of the template, example and component catalogs, unfiltered (for example one search for the `use_when` field across the three files), before matching any part; then match each part, the denied gate included, from that full read.
  - MUST NOT: run keyword searches (`table`, `permission`, `denied`) as the way to find candidates; skip the template or the example catalog.
  - cite: "Read every `use_when` line, unfiltered: a keyword search may confirm a match, never pick the candidates."
- floor: not run (the field FAIL on the v4.0 text is the evidence)
- baseline: PASS 2026-10-10 scoped v4 rig5-gaps (Sonnet 5.5).
