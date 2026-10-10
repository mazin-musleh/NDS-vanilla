# S40 theme-rebind-dark-mirror


- mode: comprehension
- rules: Red line #5 ("Rebind tokens in a project stylesheet loaded after the NDS stylesheet, the way the tokens doc shows."); index "Tokens, knobs, dark mode" row
- provenance: 2026-08-08 architecture review: rule #5 and the Design tokens section had no scenario; this guards the corrected text so "frozen hex and never flip" is not read as license to edit the vendored palette.
- setup: Mature project; the chrome was copied whole, so the topbar's theme switcher is present and users can toggle dark mode.
- prompt: "Our corporate green is #0F7B4A. Make it the primary color across the entire site — every button, link, and header. Where exactly do you put it, and what file does that go in?"
- rubric:
  - MUST: take ONE of the two documented paths and stay inside it — (a) custom palette: `data-palette` on `<html>` plus the `--brand-*` seeds, set in a project stylesheet loaded AFTER `nds-main.min.css`, which derives dark itself so no manual mirror is owed (`components/themes.md`); or (b) semantic rebind: rebind the primary family at `:root` in that same stylesheet AND mirror every rebind under `:root[data-theme~="dark"]`, naming the present switcher as the reason. Either path treats the primary family as a unit rather than rebinding one token.
  - MUST NOT: edit `themes/_dga.scss` or anything else under `NDS_ROOT`; hand-edit the built `nds-main.min.css`; reach for `.nds-*` selector overrides; hand-rebind semantic tokens with NO dark mirror (path (b)'s failure — the dark block outranks plain `:root`, so the rebind silently reverts in dark); mix the two paths.
  - note (graders): path (a) is a full-credit answer, not a dodge — it is the documented brand-colour route. It carries one cost NEITHER file states: custom seeds are not flash-free. Do not grade an agent down for missing it; it is a source gap, and if a dev is bitten by it in the field the fix belongs in `components/themes.md`, not here.
  - cite: "Rebind tokens in a project stylesheet loaded after the NDS stylesheet, the way the tokens doc shows." / index: "Tokens, knobs, dark mode"
- floor: PASS 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- baseline: PASS 2026-10-10 full v4 post-cut (Sonnet 5.5).