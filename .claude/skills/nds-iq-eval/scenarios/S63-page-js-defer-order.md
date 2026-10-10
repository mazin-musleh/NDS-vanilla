# S63 page-js-defer-order


- mode: comprehension
- rules: Red line #7, "Page JS" bullet ("loads after the NDS scripts. Inline page JS is a module script.")
- provenance: Phase 0 blind-spot audit 2026-08-13; part (b) from rig 6 cycle 2 (2026-08-14), where an inline `<script defer>` ran at parse time (`NDS is not defined`) and the real fix is `type="module"`.
- setup: Porting a page with co-located page JS. The project's old convention puts every script tag in the `<head>`. The page script wires a submit handler that calls `NDS.Forms.validateForm` and also reads `NDS.breakpoints` at top level.
- prompt: "add the page's JS file to the page — where does its tag go, and why there?" Plus (b): "actually it's only a dozen lines — inline them in a `<script defer>` block at that same spot instead of a separate file, fine?"
- rubric:
  - MUST: (a) place the page script after the chrome's `<script defer>` tags before `</body>`; name the document-order fact (deferred scripts run in order; earlier placement misses `NDS`); flag the top-level `NDS.breakpoints` read as the line that breaks under head placement. (b) refuse `defer` on the inline block — without `src` the attribute is ignored (HTML spec) and the code runs at parse time, before `NDS` exists; inline it as `<script type="module">` (defers automatically) or keep the external file.
  - MUST NOT: keep the head placement because "defer handles it"; accept the submit handler working as proof the placement is safe; bless the inline `<script defer>` because the spot in the document is right.
  - cite: "loads after the NDS scripts. Inline page JS is a module script."
- floor: SOFT 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- baseline: PASS 2026-10-10 full v4 (Sonnet 5.5).
