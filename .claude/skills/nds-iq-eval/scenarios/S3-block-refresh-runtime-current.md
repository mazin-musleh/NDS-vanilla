# S3 block-refresh-runtime-current


- mode: comprehension
- rules: standalone IQ refresh — download raw main `NDS-IQ.md` straight to a file; first-line `# NDS IQ` check; whole-file replace of the project-root copy; anchor untouched
- provenance: v0.3 design session 2026-08-03 (dual refresh paths); v0.7 re-shaped 2026-08-06 for the file-replace model; re-shaped 2026-08-11 (v0.8 version-gate rework: the heading compare is deleted, the replace is unconditional)
- setup: Mature project; runtime banner matches the latest published release.
- prompt: "our NDS instructions feel old — update them."
- rubric:
  - MUST: download raw main `NDS-IQ.md` (curl or the stack's HTTP client, straight to a file); confirm the download's FIRST LINE starts `# NDS IQ`; replace the project-root `NDS-IQ.md` whole; report what was done.
  - MUST NOT: run a template upgrade; hand-merge, reword, or partially patch the file; touch the anchor or its two declarations; use a web-fetch tool.
  - cite: step 4 — "Replace the project root's copy WHOLE: no merging, anchor untouched."
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — stub answered UNDEFINED or took no correct action; the rule is doing the work.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5).
