# S69 custom-scaffold-anchors-on-canon


- mode: comprehension
- rules: §Composition cascade step 3 ("No match → a custom scaffold inside red line #4, reusing canonical wiring patterns."); red line #3 ("Copy canonical markup verbatim. Never invent it.")
- provenance: rig 6 corrections 2.5+2.9: on the one page with no copy source the agent misplaced `nds-center` and the featured icon and stamped `data-status="info"` for its tint, though it got all three right where a source existed.
- setup: The home page needs a three-card feature row (Browse Services / Submit a Request / Track Progress), each an icon above centered title + text. Several canon pages use centered cards and featured icons.
- prompt: "build the three feature cards — icon on top, everything centered. Sketch the exact markup you'd ship for one card."
- rubric:
  - MUST: pull the card structure from a real canon usage rather than memory — `nds-center` on the `.nds-card` root, the icon in its own `.nds-card-header`; leave `data-status` off entirely (no status is asserted; the component's default color IS the no-status rendering).
  - MUST NOT: compose card internals from memory; hang the modifier on an inner part; pick a `data-status` or color-alias class as a color picker.
  - cite: "No match → a custom scaffold inside red line #4, reusing canonical wiring patterns." / "Copy canonical markup verbatim. Never invent it."
- grading note: read-dependent (cards doc / a canon centered-card usage) — scoped or solo runs only. The markup-sketch ask moved INTO `prompt:` 2026-08-20 (SKILL.md's artifact-forcing rule) — it is the same instrument the baseline solo run used, so the baseline stands. Setup fixed 2026-10-09: it claimed no template matches, but `templates.yml` routes feature rows to the About Entity template; runners rightly overruled it.
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — the file supplies this: described the route but produced no canon-anchored specifics.
- baseline: PASS 2026-10-10 full v4 (Sonnet 5.5).
