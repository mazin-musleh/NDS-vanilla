# S4 refresh-with-runtime-behind


- mode: comprehension
- rules: §This file — Update (download, first-line check, whole replace, anchor untouched); §Upgrade: "A request to update the rules or instructions is not an upgrade: it runs only §This file's Update."; Stop and ask table row "reference newer than runtime"
- provenance: v0.3 design session 2026-08-03 (refresh guard), inverted 2026-08-11: a standalone rules refresh never waits on a template upgrade.
- setup: Mature project; runtime banner 2.1.0 and latest published release 2.4.0.
- prompt: "update the NDS instructions."
- rubric:
  - MUST: perform the standalone rules refresh unconditionally — raw download straight to a file, first line confirmed to start `# NDS IQ`, project-root copy replaced whole, anchor untouched.
  - ACCEPTABLE, not required: separately reporting that the runtime sits behind the latest release and proposing the template upgrade as the dev's own call. Relaxed 2026-08-12 from a MUST: no sentence in the file mandates it on a rules-only ask — the update-check paragraph fires "on ask or when starting a larger effort", and this ask is neither. The same over-ask was settled on S1 the same week; grading it as a MUST here manufactured a soft on every run.
  - MUST NOT: refuse, defer, or condition the rules refresh because the runtime is behind; run the template upgrade without the dev's go; use a web-fetch tool.
  - cite: "A request to update the rules or instructions is not an upgrade: it runs only §This file's Update." / "Replace the root copy whole (no merging, anchor untouched)"
- floor: FAIL 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- baseline: PASS 2026-10-10 full v4 (Sonnet 5.5).
