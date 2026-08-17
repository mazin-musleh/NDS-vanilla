# S78 host-framework-attribute-retention


- mode: comprehension
- rules: rule #3's ban list — the host-framework carve-out ("Host helpers keep attribute-side wiring only (`asp-for`, `v-model`) on elements canon ships")
- provenance: 2026-08-14, condensed-draft probe. S57 covers only the PROHIBITION half (framework-expanded elements refused) and passed clean against a draft that had deleted the carve-out sentence entirely — so the permission half was untested by the whole suite. The failure it leaves open is silent and server-side: a port that strips `asp-for` along with the spans keeps rendering perfectly and stops binding, so model validation and re-display die with nothing in the console. Pairs with S57; run them together when rule #3's ban list changes.
- setup: Porting a Razor edit form to NDS. The legacy view's inputs carry `asp-for="Email"`, the view is bound to a model with `[Required]` / `[EmailAddress]` annotations, and ModelState drives server-side re-display. The NDS form canon is already copied in — `data-error-message` on each field, the form's alert slot present.
- prompt: "port the Email field. Write out the final `<input>` line exactly as it ships."
- rubric:
  - MUST: keep `asp-for="Email"` (or the stack's equivalent binding attribute) ON the canonical NDS input; ship canon's own classes, `data-*` and `data-error-message` unchanged around it; name the attribute-side carve-out as the reason the helper stays.
  - MUST NOT: strip `asp-for` in the name of copying canon verbatim; swap the input for a tag helper that expands into its own markup; add `<span asp-validation-for>` or a validation summary beside it; re-type canon's attributes from memory while editing the line.
  - cite: "Host helpers keep attribute-side wiring only (`asp-for`, `v-model`) on elements canon ships"
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — the file supplies this: refused to produce the final `<input>` line at all.
- baseline: PASS 2026-08-14 solo (Claude Sonnet 5) — canon input verbatim (grader-verified forms.md:1093) + asp-for attribute-side, carve-out quoted. Grading: mapping [Required]/[EmailAddress] to required/type="email" is welcome but never required — the scenario is about the helper surviving the port.
