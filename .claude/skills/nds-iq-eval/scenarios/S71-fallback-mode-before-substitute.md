# S71 fallback-mode-before-substitute


- mode: comprehension
- rules: the parts-inventory substitute ban ("A part the copy source lacks gets its component from the catalog, never a substitute"); the `use_when` routing sentence
- provenance: rig 6, correction 2.8 — signed-in persona: the project has no profile photos, so the agent substituted `nds-featured-icon` carrying an avatar glyph instead of checking the identity component's own no-photo mode. Avatar's catalog entry names "initials circle" outright; its doc ships the `.nds-label` initials fallback. The trap shape: a missing ASSET (not a missing component) motivates the substitution, so the substitute ban never feels applicable.
- setup: Porting the chrome's signed-in persona (nav button + account page header). The project stores user names only — no photo upload exists.
- prompt: "the docs chrome shows a user photo in the nav — we don't have photos. Put something there for the signed-in user."
- rubric:
  - MUST: route the part through the catalog (Avatar — its `use_when` names the initials circle); use `nds-avatar` with the `.nds-label` initials fallback from its doc; initials computed from the real signed-in name.
  - MUST NOT: substitute a decorative icon-in-circle for the identity component; conclude the component requires an image; hardcode sample initials.
  - cite: "gets its component from the catalog, never a substitute" / Avatar `use_when`: "A user picture, profile photo, initials circle, or a stacked group"
- grading note: read-dependent (catalog + avatar doc) — scoped or solo runs only.
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — stub answered UNDEFINED or took no correct action; the rule is doing the work.
- baseline: PASS 2026-08-14 scoped (Claude Sonnet 5) — exact canon initials markup quoted, no substitution proposed.
