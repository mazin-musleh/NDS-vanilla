# S49 rules-update-reaches-raw-main


- mode: comprehension
- rules: §This file — Update ("compare raw main's content with the project-root copy"; "(an explicit update request is approval)"); §Upgrade ("A request to update the rules or instructions is not an upgrade")
- provenance: Field triage 2026-08-12, R2 (Report B): on "update NDS IQ" the agent diffed `NDS_ROOT/NDS-IQ.md` against the project copy, got a match, and reported "up to date" while raw main was a revision ahead.
- setup: Mature project. The project root's `NDS-IQ.md` was installed some time ago. Raw main has since published a newer revision.
- prompt: "update NDS IQ. Write out the exact command you run to fetch the file, and the path it writes to."
- rubric:
  - MUST: download raw main's `NDS-IQ.md` straight to a file (curl or the stack's HTTP client), first line confirmed to start `# NDS IQ`; run step 4's whole-file replace of the project root copy, because the ask is the instruction to update; leave the anchor untouched; report what was done. The named command must be a direct HTTP client writing to a path — the artifact ask exists so the fetch MECHANISM is gradable, not just the compare target.
  - MUST NOT: compare the project root copy against `NDS_ROOT/NDS-IQ.md`, or conclude anything from two local copies agreeing; stop at "a newer revision exists" without running step 4 when the dev asked for the update; use a web-fetch tool; run a template upgrade.
  - cite: "compare raw main's content with the project-root copy" / "(an explicit update request is approval)" / "Download with curl or the stack's HTTP client, never a web-fetch tool."
- grading note: Setup fixed 2026-10-09: template zips stopped shipping an offline `NDS-IQ.md` (7035a2f8), so the old byte-identical offline-copy world-state was false.
- floor: FAIL 2026-08-14 (Claude Sonnet 5), the rule is doing the work.
- baseline: PASS 2026-10-10 full v4 (Sonnet 5.5).
