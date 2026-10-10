# S25 banner-first-wiring


- mode: both
- rules: §JS wiring ("read the component's JS API (the index names where)"); §Start here older-release sentence ("use what it ships, report the gap, and propose the upgrade as the dev's call"); §Setup ("never from a newer one or from raw main"); index JS API line
- provenance: v0.7 design 2026-08-06 (Track A banner project): S14/S15 failures showed doc knowledge doesn't reach the wiring moment, so banners guard the route; re-shaped 2026-08-11 (v0.8) so (b) guards the bannerless route, where a source read is expected, not a FAIL.
- setup: Mature project on a 2.4.0 template; a dashboard page needs custom JS that reacts to multiselect selection changes and pre-populates the options at runtime. Plus (b): same ask, but `NDS_ROOT` is a 2.3.0 template — its `_source/_js/*.js` files carry NO banner comment block.
- prompt: "what do you read before writing this wiring, and which exact NDS surface do you use? Then (b): the older template too."
- rubric:
  - MUST: (a) read the banner at the top of `NDS_ROOT/_source/_js/nds-multiselect.js`; wire via `nds:multiselect:change` (detail `{name, values, labels}`) and `instance.populate(options, selected)`; respect Rides — dropmenu-inherited surface (portal, positioning knobs) is read from the dropmenu banner, not re-derived or re-stated; (b) treat the missing banner as a gap, not a blocker — wire the multiselect from that same version's own sources: `NDS_ROOT/_source/components/multiselect.md` at 2.3.0 (which documents the events and methods the component had then) and, where the doc stops short, the bannerless `_source/_js/nds-multiselect.js` itself, which is sanctioned reading; report the missing banner contract as the gap and propose the upgrade as the dev's call; the wiring proceeds.
  - MUST NOT: (a) dredge the full source when the banner answers; hand-write listeners or `data-*` guesses without the banner read; (b) treat the missing banner as a block or a prerequisite; read canon from a newer tag or from raw main; invent the surface from memory instead of reading the 2.3.0 doc source and JS file.
  - cite: "read the component's JS API (the index names where)" / "use what it ships, report the gap, and propose the upgrade as the dev's call" / index: "Rides, Methods, Events, Hooks, Gotchas"
- artifacts (behavior): page JS binds `nds:multiselect:change` by exact name and calls `populate(...)`; no invented `data-*` attributes; no listener on inner `.nds-*` elements the banner doesn't expose.
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — stub answered UNDEFINED or took no correct action; the rule is doing the work.
- baseline: PASS 2026-10-10 full v4 (Sonnet 5.5).
