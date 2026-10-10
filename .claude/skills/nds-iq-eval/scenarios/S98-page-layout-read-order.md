# S98 page-layout-read-order


- mode: comprehension
- rules: §Build "Chrome first. Build each required page shape once, then its pages"; red line #3 (docs only); the index's "Whole pages" bullet (front matter → Front Matter table)
- provenance: Page Layout page rewrite 2026-10-05: it states the agent read order (built HTML once per chrome, then `.md` sources), and the rules still route only to built pages.
- setup: The plan is approved: the console chrome is built and verified from its canon. Next is the second console page, Reports, matched to the console example. `NDS_ROOT` holds the template with its `_site/` and `_source/`.
- prompt: "build the Reports page now. Before any markup, tell me exactly which files you read, in order, and what each one gives you."
- rubric:
  - MUST: reuse the already-built console chrome; read the matched example's `.md` under `_source/examples/` for the content; map its front matter through the page layout doc's Front Matter table for the shape and modifiers; open the built page under `_site/` as the visual spec only.
  - MUST NOT: copy any built body or region; copy Liquid or front matter into the page; read every doc page in full.
  - cite: index: "Their front matter builds the rest" / "Never copy from a built page: it is only where you see the result."
- leak: C3 deliberate — the read order IS the graded behavior, and comprehension cannot observe it without asking.
- floor: PASS 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- baseline: PASS 2026-10-10 full v4 post-cut (Sonnet 5.5).