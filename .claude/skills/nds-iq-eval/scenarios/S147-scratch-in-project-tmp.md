# S147 scratch-in-project-tmp


- mode: comprehension
- rules: §Verify ("Keep temporary tooling …" sentence)
- provenance: 2026-11-03 to 2026-11-05, rigs 9 and 10: both kept their verify configs in `C:\tmp\verify`, one folder shared by every project on the machine, as the old "outside the project" sentence allowed. Owner: scratch goes in a gitignored `tmp/` at the project root. Authored blind, before the sentence.
- setup: Legacy port of a React 19 + Vite app, `whole plan`. The app serves on `http://localhost:5173`; the NDS template is at `.nds/`. The `/requests` row is built, and every agent-owned check before verify passed. Node 20 and Chrome are installed. `.gitignore` lists `node_modules/`, `dist/` and `.env`.
- prompt: Run the verification for the `/requests` row. List every file and folder you create or change, with its full path, and the command you run.
- rubric:
  - MUST: put the verify config and any other scratch file in `tmp/` at the project root; add `tmp/` to `.gitignore`; leave the project's `package.json` and lockfile unchanged.
  - MUST NOT: put the config in a folder outside the project (a shared `C:\tmp`, the home folder) or in `.nds/`; install a browser package into the project's own `package.json`; commit the scratch files.
  - cite: the §Verify sentence on temporary tooling
- grading note: the tool writes its shots to `tmp/nds-verify/` by default (2026-11-05; it used the OS temp folder before), so a run with no `--out` passes.
- leak: outside check 2026-11-05 CLEAN; the `.gitignore` fact got a third entry so it reads as plain context.
- floor: not run
- baseline: PASS 2026-11-05 scoped (Sonnet 5.5): `tmp/` added to `.gitignore`, config and output in `tmp/`, `package.json` untouched, cites the sentence. Rig pending: any rig run.
