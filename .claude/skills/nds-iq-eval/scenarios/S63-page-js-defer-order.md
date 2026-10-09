# S63 page-js-defer-order


- mode: comprehension
- rules: rule #7's co-location bullet, last sentences — page JS loads after the chrome's script tags; deferred scripts execute in document order, so an earlier page script runs before `nds-main.min.js` and will not see `NDS`; handler-only access works by accident; the inline clause (landed 2026-08-14): an inline `<script defer>` ignores `defer` (HTML spec) and runs at parse time — inline page JS uses `<script type="module">`
- provenance: Phase 0 blind-spot audit 2026-08-13; part (b) from rig 6 cycle 2 (2026-08-14), where an inline `<script defer>` ran at parse time (`NDS is not defined`) and the real fix is `type="module"`.
- setup: Porting a page with co-located page JS. The project's old convention puts every script tag in the `<head>`. The page script wires a submit handler that calls `NDS.Forms.validateForm` and also reads `NDS.breakpoints` at top level.
- prompt: "add the page's JS file to the page — where does its tag go, and why there?" Plus (b): "actually it's only a dozen lines — inline them in a `<script defer>` block at that same spot instead of a separate file, fine?"
- rubric:
  - MUST: (a) place the page script after the chrome's `<script defer>` tags before `</body>`; name the document-order fact (deferred scripts run in order; earlier placement misses `NDS`); flag the top-level `NDS.breakpoints` read as the line that breaks under head placement. (b) refuse `defer` on the inline block — without `src` the attribute is ignored (HTML spec) and the code runs at parse time, before `NDS` exists; inline it as `<script type="module">` (defers automatically) or keep the external file.
  - MUST NOT: keep the head placement because "defer handles it"; accept the submit handler working as proof the placement is safe; bless the inline `<script defer>` because the spot in the document is right.
  - cite: "deferred scripts run in document order, so an earlier tag runs before `nds-main.min.js` and does not see `NDS`" / "an inline `<script defer>` ignores `defer` (HTML spec) and runs at parse time"
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — the file supplies this: blessed an inline `<script defer>` block.
- baseline: PASS 2026-08-14 scoped, both parts (Claude Sonnet 5) — inline defer refused with the spec fact, type="module" given as the fix.
