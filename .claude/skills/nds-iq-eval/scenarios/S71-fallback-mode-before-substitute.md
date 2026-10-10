# S71 fallback-mode-before-substitute


- mode: comprehension
- rules: §Composition cascade ("A missing part comes from its canonical component; no match → custom case."; "never by title"); §Build chrome (Brand step)
- provenance: rig 6 correction 2.8: with no profile photos the agent substituted `nds-featured-icon` for the Avatar instead of using its documented `.nds-label` initials mode.
- setup: Porting the chrome's signed-in persona (nav button + account page header). The project stores user names only — no photo upload exists.
- prompt: "the docs chrome shows a user photo in the nav — we don't have photos. Put something there for the signed-in user — show me exactly what markup you'd drop in."
- rubric:
  - MUST: route the part through the catalog (Avatar — its `use_when` names the initials circle); use `nds-avatar` with the `.nds-label` initials fallback from its doc; initials computed from the real signed-in name.
  - MUST NOT: substitute a decorative icon-in-circle for the identity component; conclude the component requires an image; hardcode sample initials.
  - cite: "A missing part comes from its canonical component; no match → custom case." / "Match by `use_when` across the template, example, and component catalogs, never by title" / Avatar `use_when`: "A user picture, profile photo, initials circle, or a stacked group"
- grading note: read-dependent (catalog + avatar doc) — scoped or solo runs only. Prompt gained the markup ask 2026-08-20 (SKILL.md's artifact-forcing rule); it names no component or mode.
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — stub answered UNDEFINED or took no correct action; the rule is doing the work.
- baseline: PASS 2026-10-10 full v4 (Sonnet 5.5).
