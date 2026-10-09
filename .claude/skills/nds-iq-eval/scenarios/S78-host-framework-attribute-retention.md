# S78 host-framework-attribute-retention


- mode: comprehension
- rules: Red line #3 ("Put host-framework bindings on canonical elements as attributes. Never insert framework-generated UI elements.")
- provenance: condensed-draft probe 2026-08-14: S57 covers only the prohibition half, so a port that strips `asp-for` and silently stops binding went untested; pairs with S57, run together when rule #3's ban list changes.
- setup: Porting a Razor edit form to NDS. The legacy view's inputs carry `asp-for="Email"`, the view is bound to a model with `[Required]` / `[EmailAddress]` annotations, and ModelState drives server-side re-display. The NDS form canon is already copied in — `data-error-message` on each field, the form's alert slot present.
- prompt: "port the Email field. Write out the final `<input>` line exactly as it ships."
- rubric:
  - MUST: keep `asp-for="Email"` (or the stack's equivalent binding attribute) ON the canonical NDS input; ship canon's own classes, `data-*` and `data-error-message` unchanged around it; name the attribute-side carve-out as the reason the helper stays.
  - MUST NOT: strip `asp-for` in the name of copying canon verbatim; swap the input for a tag helper that expands into its own markup; add `<span asp-validation-for>` or a validation summary beside it; re-type canon's attributes from memory while editing the line.
  - cite: "Put host-framework bindings on canonical elements as attributes."
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — the file supplies this: refused to produce the final `<input>` line at all.
- baseline: PASS 2026-08-14 solo (Claude Sonnet 5) — canon input verbatim plus asp-for kept, carve-out quoted. Grading: mapping [Required]/[EmailAddress] to required/type="email" is welcome, never required.
