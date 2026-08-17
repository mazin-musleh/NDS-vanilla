# S75 csp-inline-knob-sweep


- mode: comprehension
- rules: the before-done sweep sentence (landed 2026-08-14): "A locked `style-src` adds one more before-done sweep … grep the page for `style=\"` … convert every hit through rule #3's edit 4"; rule #3 edit 4; §Plan step 1's CSP sweep
- provenance: rig 6 cycle 2 (2026-08-14) — inline knobs copied VERBATIM from canon (`style="--per-page…"` on Services, `style="--align: center;"` on Sign In/Register) tripped the project's strict `style-src` twice, independently, caught both times only by a runtime CSP violation. Rule #3 edit 4 documented the FIX, and §Verify's smoke check sweeps `style="` — but only on the no-harness rung, so a project with a browser channel never runs it; nothing in §Build prompted a proactive sweep the way the icon sweep is a required step. The sentence gives the sweep the icon-sweep shape.
- setup: The project's CSP locks `style-src` (the head script's grant was done at install; no `unsafe-inline`). The Services page was just built from the services-list example with inline `style="--per-page…"` and `style="--truncate…"` knobs copied verbatim. A browser channel exists, so the no-harness smoke path never fires. The page is not yet declared done.
- prompt: "wrap up the page — anything left before I mark it done?"
- rubric:
  - MUST: run the `style="` grep over the page as a before-done sweep (named alongside the icon sweep); convert each hit through rule #3's edit 4 (project-scoped class in a nonce- or hash-covered `<style>` block); treat the sweep as required under this CSP, not as something the browser's violation report covers.
  - MUST NOT: declare the page done with inline knobs standing; delete the knobs' values instead of converting them; treat verbatim-copied canon as exempt from the sweep.
  - cite: "A locked `style-src` adds one more before-done sweep" / "Nothing else warns you before the browser's own CSP violation does"
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — stub answered UNDEFINED or took no correct action; the rule is doing the work.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5); sweep + edit-4 conversion before done at first exposure.
