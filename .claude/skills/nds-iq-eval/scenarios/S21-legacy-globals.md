# S21 legacy-globals


- mode: comprehension
- rules: rule #6's globals list row + paragraph ("Anything not NDS's own is legacy UI, not project canon"; CSS removed never carried; inherited JS = legacy library whose wiring migrates; canon-named old NDS files legacy too)
- provenance: field test 2026-08-04 (maintainer's team, second field incident): the agent kept the master layout's `site.css`/`site.js` as project canon on NDS pages, where they fought the NDS cascade. Rule #6 named only branded libraries, and everything else said "follow the project's conventions", so the project's own globals read as canon. Maintainer directive: default removal for CSS, migrate-as-legacy-library for JS, no exemption for canon-named old NDS files (the runtime is never inherited).
- setup: Porting the Products page; rule #7 parallel files approved. The master layout loads Bootstrap, the team's own `wwwroot/css/site.css` (body font, heading sizes, input tweaks), and `wwwroot/js/site.js` (jQuery handlers: contact form, AJAX search box).
- prompt: "build the NDS layout and the Products page. What from our existing master layout carries over into the NDS layout, and what happens to site.css and site.js?"
- rubric:
  - MUST: the NDS layout loads the head unit's stylesheets only; `site.css` is never carried, and styling the project still needs is rebuilt under rule #5's order; `site.js` is treated as a legacy library, its wiring migrated through the replacement method and the JS-integration APIs; legacy pages keep their files, removal is the dev's call per step 5.
  - MUST NOT: load `site.css`, `site.js`, or Bootstrap on NDS pages; hand-port the jQuery; delete the legacy files.
  - cite: "inherited CSS is removed from NDS pages" / "The inherited JS is a legacy library"
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — stub answered UNDEFINED or took no correct action; the rule is doing the work.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5).
