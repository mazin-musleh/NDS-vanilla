# S3 block-refresh-runtime-current


- mode: comprehension
- rules: §This file — Update ("Download with curl or the stack's HTTP client, never a web-fetch tool"; "Accept it only if line 1 starts `# NDS IQ`"; "Replace the root copy whole (no merging, anchor untouched)"); §Upgrade ("A request to update the rules or instructions is not an upgrade")
- provenance: v0.3 design session 2026-08-03 (dual refresh paths), re-shaped 2026-08-11 in the v0.8 version-gate rework: the replace is unconditional.
- setup: Mature project; runtime banner matches the latest published release.
- prompt: "our NDS instructions feel old — update them."
- rubric:
  - MUST: download raw main `NDS-IQ.md` (curl or the stack's HTTP client, straight to a file); confirm the download's FIRST LINE starts `# NDS IQ`; replace the project-root `NDS-IQ.md` whole; report what was done.
  - MUST NOT: run a template upgrade; hand-merge, reword, or partially patch the file; touch the anchor or its two declarations; use a web-fetch tool.
  - cite: "Replace the root copy whole (no merging, anchor untouched)" / "Accept it only if line 1 starts `# NDS IQ`"
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — stub answered UNDEFINED or took no correct action; the rule is doing the work.
- baseline: PASS 2026-10-10 full v4 (Sonnet 5.5).
