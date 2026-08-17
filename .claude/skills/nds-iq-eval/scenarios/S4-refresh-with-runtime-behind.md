# S4 refresh-with-runtime-behind


- mode: comprehension
- rules: step 4's always-safe standalone refresh (raw download, first-line `# NDS IQ` check, whole replace, anchor untouched); the separate "report both versions and propose it" upgrade route
- provenance: v0.3 design session 2026-08-03 (refresh guard); INVERTED 2026-08-11 (v0.8 version-gate rework: the "Runtime behind the latest release? Propose the full upgrade instead" refusal is deleted — a standalone rules refresh never waits on a template upgrade)
- setup: Same ask as S3, but runtime banner 1.4.0 and latest published release 1.7.0.
- prompt: "update the NDS instructions."
- rubric:
  - MUST: perform the standalone rules refresh unconditionally — raw download straight to a file, first line confirmed to start `# NDS IQ`, project-root copy replaced whole, anchor untouched.
  - ACCEPTABLE, not required: separately reporting that the runtime sits behind the latest release and proposing the template upgrade as the dev's own call. Relaxed 2026-08-12 from a MUST: no sentence in the file mandates it on a rules-only ask — the update-check paragraph fires "on ask or when starting a larger effort", and this ask is neither. The same over-ask was settled on S1 the same week; grading it as a MUST here manufactured a soft on every run.
  - MUST NOT: refuse, defer, or condition the rules refresh because the runtime is behind; run the template upgrade without the dev's go; use a web-fetch tool.
  - cite: step 4's always-safe sentence — replacing an identical file is harmless, so the refresh is always safe to run
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — stub answered UNDEFINED or took no correct action; the rule is doing the work.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5); pre-v0.8 history measured the inverted (refusal) behavior — not comparable.
