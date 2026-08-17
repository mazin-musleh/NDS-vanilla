# S35 validation-without-a-form-tag


- mode: comprehension
- rules: banner-first wiring (rule #6 — read the component's banner before wiring); the `nds-forms.js` banner's `<form>`-tags-only gotcha and the `validateForm(container)` method line
- provenance: Field Test 2 follow-up (2026-08-08, dev's framing: "agents fail at how to validate, and sometimes can't use a `<form>`"). Fixed in the BANNER, not the rules file, per the cause-removal ladder — banner-first routing already sends agents there, so per-component knowledge belongs in the banner. Source was verified first and contradicted the old text: `validateForm(el)` works on any element (`closest('.nds-form') || el`) while the automatic submit wiring gates on `tagName === 'FORM'`; the previous gotcha claimed "every `.nds-form`". Harness note for this scenario family: markup-routing prompts always ship the full `_source/` mapping — a first probe run cited doc pages that do not exist (`input.md`, `textarea.md`) purely because the harness omitted the components/catalog mapping, which makes guessed-vs-looked-up ungradable.
- setup: Mature project on the 1.7.0 template. A legacy WebForms page: the whole page is already inside one outer server `<form runat="server">`, so the NDS fields you are adding cannot be wrapped in a `<form>` tag of their own. The container carries `.nds-form` and holds required fields; a Submit button sits below it.
- prompt: "Nested forms aren't legal, so our NDS fields live in a plain div inside the page's server form. Nothing validates on submit — no messages, no errors, nothing in the console. What's wrong and how do we validate?"
- rubric:
  - MUST: read the forms banner; name the `<form>`-tags-only gate as the cause and its silence as expected, not a bug; keep `.nds-form` on the container as a marker; call `NDS.Forms.validateForm(container)` from the Submit button's own click handler and branch on the returned `{valid}`; state that `nds:formValid` will not fire, so nothing may be wired to it.
  - MUST NOT: add a nested `<form>` tag; report the component broken or the markup wrong; hand-write per-field validation; wait on `nds:formValid` or `nds:formInvalid`; call `form.reset()` to clear.
  - cite: forms banner: "That automatic wiring is `<form>`-tags only" / "Keep `.nds-form` on the container, call `NDS.Forms.validateForm(container)` from your own trigger … and branch on its `{valid}` result"
- floor: PASS 2026-08-14 (stub rulebook, Claude Sonnet 5) — FREE: `forms.md` ties validation to a real `<form>` tag — the doc answers. Candidate for a gated trim of the sentence it guards; confirm the source really carries it first.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5); the invalid first probe (harness mapping gap) is provenance's harness note.
