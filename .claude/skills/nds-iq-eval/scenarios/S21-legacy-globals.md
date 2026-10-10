# S21 legacy-globals


- mode: comprehension
- rules: Red line #6 ("Never mix NDS and legacy UI on one page: NDS pages load the NDS runtime, exclude inherited legacy CSS, and migrate inherited JS through §JS wiring."); red line #5 style order
- provenance: field test 2026-08-04 (maintainer's team, second field incident): the agent kept the master layout's `site.css`/`site.js` as project canon, fighting the NDS cascade. Directive: remove CSS by default, migrate JS as a legacy library, no exemption for old NDS files.
- setup: Porting the Products page; rule #7 parallel files approved. The master layout loads Bootstrap, the team's own `wwwroot/css/site.css` (body font, heading sizes, input tweaks), and `wwwroot/js/site.js` (jQuery handlers: contact form, AJAX search box).
- prompt: "build the NDS layout and the Products page. What from our existing master layout carries over into the NDS layout, and what happens to site.css and site.js?"
- rubric:
  - MUST: the NDS layout loads the head unit's stylesheets only; `site.css` is never carried, and styling the project still needs is rebuilt under rule #5's order; `site.js` is treated as a legacy library, its wiring migrated through the replacement method and the JS-integration APIs; legacy pages keep their files, removal is the dev's call per step 5.
  - MUST NOT: load `site.css`, `site.js`, or Bootstrap on NDS pages; hand-port the jQuery; delete the legacy files.
  - cite: "exclude inherited legacy CSS, and migrate inherited JS through §JS wiring" / "Removing legacy libraries project-wide is the dev's decision."
- floor: PASS 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- baseline: PASS 2026-10-10 full v4 post-cut (Sonnet 5.5).