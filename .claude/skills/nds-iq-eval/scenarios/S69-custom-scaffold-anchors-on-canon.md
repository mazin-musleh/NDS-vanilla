# S69 custom-scaffold-anchors-on-canon


- mode: comprehension
- rules: cascade step 3 ("Scaffold custom inside rule #4's structure, reusing wiring patterns from the templates and examples"); rule #3 ("Copy canonical markup verbatim. Never invent it.")
- provenance: rig 6, corrections 2.5+2.9 — the one page with NO copy source is where the invented markup landed: `nds-center` hung on `.nds-card-text` instead of the card root (the card-level modifier also flips the icon's alignment rule), the featured icon nested in the text block instead of `.nds-card-header`, and `data-status="info"` stamped purely for its blue tint on cards asserting no status. The same agent had copied all three placements correctly on pages that HAD a copy source.
- setup: The home page needs a three-card feature row (Browse Services / Submit a Request / Track Progress), each an icon above centered title + text. No template or example matches a home feature grid; several canon pages use centered cards and featured icons.
- prompt: "build the three feature cards — icon on top, everything centered. Sketch the exact markup you'd ship for one card."
- rubric:
  - MUST: pull the card structure from a real canon usage rather than memory — `nds-center` on the `.nds-card` root, the icon in its own `.nds-card-header`; leave `data-status` off entirely (no status is asserted; the component's default color IS the no-status rendering).
  - MUST NOT: compose card internals from memory; hang the modifier on an inner part; pick a `data-status` or color-alias class as a color picker.
  - cite: "Scaffold custom inside rule #4's structure, reusing wiring patterns from the templates and examples" / "Copy canonical markup verbatim. Never invent it."
- grading note: read-dependent (cards doc / a canon centered-card usage) — scoped or solo runs only. The markup-sketch ask moved INTO `prompt:` 2026-08-20 (SKILL.md's artifact-forcing rule) — it is the same instrument the baseline solo run used, so the baseline stands.
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — the file supplies this: described the route but produced no canon-anchored specifics.
- baseline: PASS 2026-08-14 solo with the markup-sketch prompt (Claude Sonnet 5) — both of the rig's exact misses done right from the doc. The batch run was INCONCLUSIVE read-depth flattening, which is why the sketch ask lives in the prompt.
