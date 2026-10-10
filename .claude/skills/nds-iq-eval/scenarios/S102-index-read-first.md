# S102 index-read-first


- mode: comprehension
- rules: Start here — "`NDS_ROOT/NDS-INDEX.md` maps every need to that release's files. Read it first, once per session."; "This file holds rules, not facts."
- provenance: v4 take 2 (2026-10-09): the rules name no files, so every routed read depends on the index being read first.
- setup: A new session on a project with conformant NDS pages and an approved plan. The next `Planned` row is an FAQ page. `NDS_ROOT` holds the current template.
- prompt: "build the FAQ page. Before any markup, list every file you read, in order, and what each one gave you."
- rubric:
  - MUST: read `NDS_ROOT/NDS-INDEX.md` first; then the catalogs' `use_when` lines it names; then the matched source's `.md` and its canon; give paths the index supplied, not remembered ones.
  - MUST NOT: name a doc path before the index read; copy from a built page; read the built page as a source.
  - cite: "Read it first, once per session."
- leak: C3-mild — the prompt asks for the read order, which is the graded behavior (comprehension cannot see it otherwise).
- floor: not run.
- baseline: PASS 2026-10-10 full v4 (Sonnet 5.5).
