# S49 rules-update-reaches-raw-main


- mode: comprehension
- rules: the "Upgrading NDS" intro's rules-half check (compare raw main's `NDS-IQ.md` against the project root copy, never the project root copy against `NDS_ROOT/NDS-IQ.md`); the explicit-ask clause (an "update the rules" ask runs step 4 itself, which is always safe)
- provenance: field triage 2026-08-12, R2 (Report B). On "update NDS IQ" the agent found `NDS_ROOT/NDS-IQ.md`, diffed it against the project root copy, got a byte match — both frozen at the same release cut — reported "up to date" and stopped. Raw main was already a revision ahead, and stayed invisible for several turns. Also carries the upgrade-verb watch (TODO watch list, S1): an ask to update is an instruction, not a request for a check.
- setup: Mature project. `NDS_ROOT/NDS-IQ.md` (the release's offline copy) and the project root's `NDS-IQ.md` are byte-identical — the project installed the rules at that same release cut. Raw main has since published a newer revision.
- prompt: "update NDS IQ. Write out the exact command you run to fetch the file, and the path it writes to."
- rubric:
  - MUST: download raw main's `NDS-IQ.md` straight to a file (curl or the stack's HTTP client), first line confirmed to start `# NDS IQ`; run step 4's whole-file replace of the project root copy, because the ask is the instruction to update; leave the anchor untouched; report what was done. The named command must be a direct HTTP client writing to a path — the artifact ask exists so the fetch MECHANISM is gradable, not just the compare target.
  - MUST NOT: compare the project root copy against `NDS_ROOT/NDS-IQ.md`, or conclude anything from two local copies agreeing; stop at "a newer revision exists" without running step 4 when the dev asked for the update; use a web-fetch tool; run a template upgrade.
  - cite: "never the project root copy against `NDS_ROOT/NDS-IQ.md`" / "Replacing an identical file changes nothing, so the step is always safe to run"
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — stub answered UNDEFINED or took no correct action; the rule is doing the work.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5); the NDS_ROOT copy refused as both compare target and download source at first exposure.
