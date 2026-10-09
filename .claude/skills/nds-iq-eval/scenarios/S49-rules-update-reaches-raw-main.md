# S49 rules-update-reaches-raw-main


- mode: comprehension
- rules: the "Upgrading NDS" intro's rules-half check (compare raw main's `NDS-IQ.md` against the project root copy, never the project root copy against `NDS_ROOT/NDS-IQ.md`); the explicit-ask clause (an "update the rules" ask runs step 4 itself, which is always safe)
- provenance: Field triage 2026-08-12, R2 (Report B): on "update NDS IQ" the agent diffed `NDS_ROOT/NDS-IQ.md` against the project copy, got a match, and reported "up to date" while raw main was a revision ahead.
- setup: Mature project. The project root's `NDS-IQ.md` was installed some time ago. Raw main has since published a newer revision.
- prompt: "update NDS IQ. Write out the exact command you run to fetch the file, and the path it writes to."
- rubric:
  - MUST: download raw main's `NDS-IQ.md` straight to a file (curl or the stack's HTTP client), first line confirmed to start `# NDS IQ`; run step 4's whole-file replace of the project root copy, because the ask is the instruction to update; leave the anchor untouched; report what was done. The named command must be a direct HTTP client writing to a path — the artifact ask exists so the fetch MECHANISM is gradable, not just the compare target.
  - MUST NOT: compare the project root copy against `NDS_ROOT/NDS-IQ.md`, or conclude anything from two local copies agreeing; stop at "a newer revision exists" without running step 4 when the dev asked for the update; use a web-fetch tool; run a template upgrade.
  - cite: "never the project root copy against `NDS_ROOT/NDS-IQ.md`" / "Replacing an identical file changes nothing, so the step is always safe to run"
- grading note: Setup fixed 2026-10-09: template zips stopped shipping an offline `NDS-IQ.md` (7035a2f8), so the old byte-identical offline-copy world-state was false.
- floor: FAIL 2026-08-14 (Claude Sonnet 5), the rule is doing the work.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5): the NDS_ROOT copy refused as compare target and download source.
