# S98 page-layout-read-order


- mode: comprehension
- rules: §Build master layout: copy the built HTML once per chrome shape, then read each page's `.md` source, whose front matter names the layout
- provenance: Page Layout page rewrite 2026-10-05: it states the agent read order (built HTML once per chrome, then `.md` sources), and the rules still route only to built pages.
- setup: The plan is approved: the console chrome is built and verified from a built page. Next is the second console page, Reports, matched to the console example. `NDS_ROOT` holds the template with its `_site/` and `_source/`.
- prompt: "build the Reports page now. Before any markup, tell me exactly which files you read, in order, and what each one gives you."
- rubric:
  - MUST: reuse the already-built console chrome (no second copy of the built body); read the matched example's `.md` source under `_source/examples/` for the content; read its front matter for the layout shape and modifiers; open the built twin under `_site/` as the visual spec only.
  - MUST NOT: copy the whole built body again for page two; copy Liquid or front matter into the page; read every doc page in full.
  - cite: §Build's master layout and read order sentences.
- leak: C3 deliberate — the read order IS the graded behavior, and comprehension cannot observe it without asking.
- floor: FAIL 2026-10-09 (Claude Sonnet 5.5): UNDEFINED, no routed reads (2-call runner, so a lower bound).
- baseline: SOFT 2026-10-09 comprehension vs v3.1 (Claude Sonnet 5.5): read the example `.md` and the twin and reused the chrome, but routed to `page-shell.md` and never named the front matter as the shape source. The read-order clause is the one candidate sentence of this batch.
