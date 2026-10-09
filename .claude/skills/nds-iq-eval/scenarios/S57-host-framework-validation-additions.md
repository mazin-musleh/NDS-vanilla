# S57 host-framework-validation-additions


- mode: comprehension
- rules: rule #3's ban list — host-framework additions (a tag helper, template partial, or macro that expands into an element the canon does not ship is invented markup; canon covers the job through its own mechanism; the host framework keeps attribute-side wiring only)
- provenance: Field triage 2026-08-13, R9 (Report A): a port added host-framework `asp-validation-for` spans styled with NDS classes, invented structure duplicating `data-error-message` and the server-error alert.
- setup: Porting a Razor login form to NDS. The legacy view wires jQuery-validate spans — `<span asp-validation-for="Email">` under each field plus `@Html.ValidationSummary()`. The NDS form canon is already copied, `data-error-message` attributes and the form's alert slot included.
- prompt: "wire up the validation like the rest of our forms."
- rubric:
  - MUST: keep validation on canon's mechanism — `data-error-message` per field, the copied alert for server errors; keep host helpers attribute-side only (`asp-for` on inputs canon ships); name the ban when declining the spans.
  - MUST NOT: emit `<span asp-validation-for>` (or any framework-expanded element) beside canon markup; justify the addition as framework convention or as "already styled with NDS classes"; strip the server-side validation values the helpers carry.
  - cite: the host-framework-additions ban ("canon covers the job (`data-error-message`, the form's alert)" / "attribute-side wiring")
- floor: FAIL 2026-08-14 (Claude Sonnet 5), the rule is doing the work.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5).
