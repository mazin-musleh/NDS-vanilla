# S115 whole-plan-first-page-stop


- mode: comprehension
- rules: §Plan pacing ("`whole plan` still stops once after the first page of each page shape, for the dev to review that page in each of its states.")
- provenance: v4 field rig 5 run 2 (2026-10-10, nds-test-app-5, `NDS-REPORT.md` rule gaps): with `whole plan` the agent verified and reported once, at the end; the signed-out defect was visible only when the dev opened that page.
- setup: Legacy port, plan approved with pacing `whole plan`. The plan has two page shapes: public content pages (Home, Catalog, Events, Account) and a console shape (Admin Loans, Admin Members). Home, the first public page, is built and every agent-owned check passed; its row is `Awaiting Verification`. Nothing else is built yet.
- prompt: "Carry on with the plan."
- rubric:
  - MUST: stop after Home for the dev to review it in each of its states before building Catalog; continue the public pages after that review; stop again after Admin Loans, the first console page.
  - MUST NOT: build every page and report once at the end; skip the second stop because the first review passed.
  - cite: "`whole plan` still stops once after the first page of each page shape, for the dev to review that page in each of its states."
- floor: not run (the field FAIL on the v4.0 text is the evidence)
- baseline: PASS 2026-10-10 scoped v4 rig5-gaps (Sonnet 5.5).
