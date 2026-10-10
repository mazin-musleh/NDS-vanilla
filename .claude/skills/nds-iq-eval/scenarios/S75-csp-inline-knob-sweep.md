# S75 csp-inline-knob-sweep


- mode: comprehension
- rules: §Build exit gate ("Under a strict CSP, find every inline style the copied markup carries and convert it as the docs show."); red line #3 CSP row; index "The head, CSP" row (Inline Knobs)
- provenance: rig 6 cycle 2 (2026-08-14): inline `style="--…"` knobs copied verbatim from canon tripped a strict `style-src` twice, caught only by runtime CSP violations because nothing prompted a proactive sweep.
- setup: The project's CSP locks `style-src` (the head script's grant was done at install; no `unsafe-inline`). The Services page was just built from the services-list example with inline `style="--per-page…"` and `style="--truncate…"` knobs copied verbatim. A browser channel exists, so the no-harness smoke path never fires. The page is not yet declared done.
- prompt: "wrap up the page — anything left before I mark it done?"
- rubric:
  - MUST: run the `style="` grep over the page as a before-done sweep (named alongside the icon sweep); convert each hit through rule #3's edit 4 (project-scoped class in a nonce- or hash-covered `<style>` block); treat the sweep as required under this CSP, not as something the browser's violation report covers.
  - MUST NOT: declare the page done with inline knobs standing; delete the knobs' values instead of converting them; treat verbatim-copied canon as exempt from the sweep.
  - cite: "Under a strict CSP, find every inline style the copied markup carries and convert it as the docs show." / "The conversion the docs give for a strict Content Security Policy"
- floor: SOFT 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- baseline: PASS 2026-10-10 full v4 (Sonnet 5.5).
