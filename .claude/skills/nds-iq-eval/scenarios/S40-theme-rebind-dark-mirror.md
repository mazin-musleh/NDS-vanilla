# S40 theme-rebind-dark-mirror


- mode: comprehension
- rules: rule #5's token tier ("Rebind semantic tokens like `--background-primary` in a stylesheet loaded AFTER `nds-main.min.css`"; the dark-mirror sentence and its "a project without the switcher never enters dark" carve-out); the Design tokens section's four-tier list
- provenance: 2026-08-08 architecture review — rule #5 and the whole Design tokens section had NO scenario in the suite, one of two hard rules with zero coverage. The same review corrected three factual claims in that section: the palette's dark values were credited to `themes/_register.scss` (which derives brand-theme ramps from seeds, not the DGA palette's dark), and every tier file was said to carry a dark block though `_primitives.scss` carries none. This scenario covers the rule and guards the corrected text — "frozen hex and never flip" must not read as license to edit the vendored palette.
- setup: Mature project; the chrome was copied whole, so the topbar's theme switcher is present and users can toggle dark mode.
- prompt: "Our corporate green is #0F7B4A. Make it the primary color across the entire site — every button, link, and header. Where exactly do you put it, and what file does that go in?"
- rubric:
  - MUST: take ONE of the two documented paths and stay inside it — (a) custom palette: `data-palette` on `<html>` plus the `--brand-*` seeds, set in a project stylesheet loaded AFTER `nds-main.min.css`, which derives dark itself so no manual mirror is owed (`components/themes.md`); or (b) semantic rebind: rebind the primary family at `:root` in that same stylesheet AND mirror every rebind under `:root[data-theme~="dark"]`, naming the present switcher as the reason. Either path treats the primary family as a unit rather than rebinding one token.
  - MUST NOT: edit `themes/_dga.scss` or anything else under `NDS_ROOT`; hand-edit the built `nds-main.min.css`; reach for `.nds-*` selector overrides; hand-rebind semantic tokens with NO dark mirror (path (b)'s failure — the dark block outranks plain `:root`, so the rebind silently reverts in dark); mix the two paths.
  - note (graders): path (a) is a full-credit answer, not a dodge — it is the documented brand-colour route. It carries one cost NEITHER file states: custom seeds are not flash-free. Do not grade an agent down for missing it; it is a source gap, and if a dev is bitten by it in the field the fix belongs in `components/themes.md`, not here.
  - cite: "rebind semantic tokens (set: `_source/_sass/tokens/_semantic.scss`) in a stylesheet loaded AFTER `nds-main.min.css`" / "an unmirrored rebind silently reverts in dark"
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — stub answered UNDEFINED or took no correct action; the rule is doing the work.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5).
