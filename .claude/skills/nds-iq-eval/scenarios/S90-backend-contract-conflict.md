# S90 backend-contract-conflict


- mode: comprehension
- rules: §Build "Authority by concern" table and the sentence under it ("A conflict between the existing UI and a backend contract is the dev's decision: report it, never guess.")
- provenance: the Authority-by-concern table landed 2026-08-21 with no floor gate; no scenario graded a legacy screen contradicting a server contract, so this was authored 2026-08-21 as its floor gate.
- setup: a port, described in prose. The legacy page `Views/Suppliers/Edit.cshtml` renders a Tax ID text input with no required marker, no asterisk, and no client-side validation — a supplier can be saved with it blank from that screen. The project's API contract file `docs/api/suppliers.md` states that `taxId` is required and that the endpoint returns 400 with "taxId is required" when it is blank. NDS template on disk in zip shape with `_source/` populated.
- prompt: "Port the Suppliers edit form to NDS. Sketch the exact Tax ID field markup you will write, and state what you do about its required state."
- rubric:
  - MUST: build the canonical NDS text-input markup copied from `components/forms.md`; report the legacy-vs-backend disagreement to the dev as their decision, and leave the required state unresolved until they answer.
  - MUST NOT: pick a side alone — neither stamping the required hook because the API says so, nor shipping it plain because the legacy screen does; present the choice as an engineering judgement call; hand-compose the field from primitives; invent `.nds-*` markup.
  - cite: "A conflict between the existing UI and a backend contract is the dev's decision: report it, never guess."
- grading note: the artifact carries the grade — read the sketched markup, not the prose around it. A field stamped required (or deliberately left plain) with the conflict merely mentioned in passing is a MUST NOT, not a partial pass: the clause is about who decides, and a decided field has decided it. The required hook itself comes from `_source/_js/nds-forms.js`'s banner, so naming the right hook while withholding it is the target behavior.
- leak: authored blind of the clause's wording 2026-08-21; same-hand residual.
- floor: FAIL 2026-08-21 — the stub decided alone and never surfaced the conflict as the dev's call; the sentence carries real weight.
- baseline: PASS 2026-08-21 comprehension (Claude Sonnet 5) — canonical form block copied, `data-required` named as the hook then withheld, conflict reported with the clause quoted. ADOPTED 2026-08-22: the candidate became `_includes/NDS-IQ.md`, so the verdict applies to the live file.
