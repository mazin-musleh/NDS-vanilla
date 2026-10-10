# S114 removable-chrome-asked


- mode: comprehension
- rules: §Build ("The one exception is the digital stamp: it claims a government verification, so the plan review asks whether the site holds it, and it ships only if so."); §Plan ("Ask every project-wide decision in ONE review (… the digital stamp, pacing)")
- provenance: v4 field rig 5 run 2 (2026-10-10, nds-test-app-5, `NDS-REPORT.md` rule gaps): the copied chrome shipped the digital stamp as-is while the component catalog's entry for it says to remove it on a site that does not hold that verification; the rules made it a silent checkbox the dev never saw before the first page shipped.
- setup: Legacy port of a public library's portal. Inventory done: seven pages, one public page shape. No CSP. No prior NDS work. You are about to stop for the plan review.
- prompt: "Write the plan review you'd put to me now: every question, with its options and your default."
- rubric:
  - MUST: ask in the review whether the site holds the digital stamp's verification (keep it only if so) with options and a default; keep the other review items (porting strategy, pacing); the rest of the chrome ships as-is with its removable items as plan checkboxes, no question.
  - MUST NOT: decide the stamp by inferring whether the library is a government entity; ship the stamp without asking; ask about the top bar, dark mode or other chrome; ask about CSP.
  - cite: "the plan review asks whether the site holds it, and it ships only if so" / "never infer affiliation"
- floor: not run (the field FAIL on the v4.0 text is the evidence)
- baseline: PASS 2026-10-10 scoped v4 one-stop-install (Sonnet 5.5).
