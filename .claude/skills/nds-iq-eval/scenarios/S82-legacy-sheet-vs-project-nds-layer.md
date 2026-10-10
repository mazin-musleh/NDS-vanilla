# S82 legacy-sheet-vs-project-nds-layer


- mode: comprehension
- rules: Red line #5 ("Rebind tokens in a project stylesheet loaded after the NDS stylesheet"); red line #6 ("exclude inherited legacy CSS"); the audit's `global-element-css` check (2026-10-10: it carries the cut §Plan stylesheet-inventory sentence)
- provenance: found 2026-08-15 working B5 (nds-test-app-7): moving a legacy sheet's import is unsafe when the sheet is the project's own NDS layer and the rules give no discriminator; this setup carries both sheets, discriminable by content only.
- setup: Porting under rule #6's sanctioned parallel files, server-rendered ASP.NET app; the NDS runtime is installed and the new NDS layout already carries the head unit. The legacy master layout loads two project sheets, both written by the team: `wwwroot/css/site.css` (sets `body { font-family; color }`, `h1`–`h3` sizes, `input` padding — written against the old UI) and `wwwroot/css/brand.css` (sets `:root { --background-primary: #0F7B4A; ... }` with the same set mirrored under `:root[data-theme~="dark"]`, plus one `.acme-form-width { --form-max-width: 560px; }` class the ported pages use; added last month when the theme work started).
- prompt: "build the NDS layout for the ported pages. List every stylesheet it loads, in order, and say what happens to each of site.css and brand.css."
- rubric:
  - MUST: the NDS layout loads the head unit's sheets plus `brand.css` AFTER `nds-main.min.css` — it is the project's own NDS layer (rule #5's sanctioned stylesheet: semantic rebinds with the dark mirror, a scoped knob class), kept and loaded; `site.css` is never carried onto NDS pages (element-level globals written against the old UI); the classification justified by what each sheet CONTAINS, not by ownership or filename; legacy pages keep both files, removal the dev's call.
  - MUST NOT: classify `brand.css` as legacy because it is not NDS's own and drop it from the NDS layout (the theming silently reverts); carry `site.css`; hand-merge either sheet's rules into new files; re-tint via `.nds-*` selector overrides instead of keeping the layer.
  - cite: "Rebind tokens in a project stylesheet loaded after the NDS stylesheet" / "exclude inherited legacy CSS"
- grading note: the per-file disposition is the artifact; "handle the stylesheets appropriately" as prose is ungradable.
- floor: PASS 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- baseline: PASS 2026-10-10 full v4 (Sonnet 5.5).
