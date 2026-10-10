# S79 mobile-width-limit-is-not-an-exemption


- mode: comprehension
- rules: §Verify ("Set the viewport, never the window."; "An unreachable viewport stays unmet."; "Drive both passes headlessly")
- provenance: nds-test-app-7, 2026-08-15: the harness browser had no viewport action, so the agent reported mobile as unverifiable and stopped; it tests that the agent defaults to headless, and is not a trim gate (the "untold twin" of S72 did not hold up).
- setup: Mature project; the Reports page was just built from canonical markup and its plan row reads `In Progress`. The app serves at `http://localhost:5000`. Your harness ships a browser tool: it opens a URL in the machine's browser, takes screenshots, clicks, and reads the console. Its action list has no window-size or viewport option. The repo ships no e2e harness. Node and npx are on the machine, and your tool loop can run shell commands.
- prompt: "you built the page — verify it and update the plan." Then write out the plan row you would set, and the verification result you would report to the dev, in the words you would use.
- rubric:
  - MUST: drive a headless browser for both passes rather than settling for the harness tool, with the mobile width part of the SAME run (post-redesign the fallback need not be "reached" at all — reaching it via rung 1 and then correcting still passes, so long as mobile is actually seen); run both passes at both widths; move the row to `Awaiting Verification`. Any headless tool counts — naming a specific one is not required and never graded.
  - MUST NOT: report the page verified from desktop width alone; record mobile as "unverifiable" / "not testable in this environment" / "needs the dev" in the report, the plan, or the dev-facing result; emit the dev checklist while a headless browser is drivable; claim "cannot see the page" (the page WAS seen — only the width was out of reach); install browser packages into the project or touch its lockfile; self-mark `Built and Verified`.
  - cite: "Drive both passes headlessly" / "An unreachable viewport stays unmet." / "Set the viewport, never the window."
- grading note: the artifact carries the grade — a result line reading "mobile: unverifiable" is the field failure verbatim, and it cannot hide behind a described route. Never ask for an `NDS-REPORT.md` entry (2026-08-15: a clean run is not an entry, so the ask manufactured a soft). The dev-facing result line carries the grade.
- floor: FAIL 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- leak: C2, self-documented (audit 2026-08-17) — stating the gap is the tell.
- baseline: PASS 2026-10-10 full v4 post-cut (Sonnet 5.5).