# S112 component-use-limits


- mode: comprehension
- rules: §Composition cascade ("followed by every line of that component's doc that limits its use (never, only, do not)")
- provenance: v4 field rig 5 run 2 (2026-10-10, nds-test-app-5, `NDS-REPORT.md` rule gaps): the agent copied the matched template's counter for figures the project API refreshes; the numbers doc says a counter is not for live data, and nothing required reading that line.
- setup: Legacy port, plan approved. Next row: the Library Stats page. Its copy source is the KPIs template, whose figures count up as they scroll into view. The project's figures come from an API the page polls every 30 seconds, so they change while the page is open.
- prompt: "Record the Library Stats parts list under its plan row, in the exact form you'd write it."
- rubric:
  - MUST: after each `part → component` line, copy the lines of that component's doc that limit its use; for the figures, the counter's limit from the numbers doc (not for live data or a value that changes: it runs once), and resolve it: the live figures take the number format without the count-up, or the conflict is named before markup.
  - MUST NOT: write the parts list as bare `part → component` lines; ship the template's counter for figures that change while the page is open.
  - cite: "followed by every line of that component's doc that limits its use (never, only, do not)"
- grading note: read-dependent (the numbers doc's limit line); grade the read half of the MUST from a solo or scoped run only.
- floor: not run (the field FAIL on the v4.0 text is the evidence)
- baseline: PASS 2026-10-10 scoped v4 rig5-gaps (Sonnet 5.5).
