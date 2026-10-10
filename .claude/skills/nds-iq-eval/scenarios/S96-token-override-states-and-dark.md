# S96 token-override-states-and-dark


- mode: comprehension
- rules: Red line #5 ("every state of a family, in light and dark mode"); index "Tokens, knobs, dark mode" row (tokens.md Override Scope)
- provenance: tokens page rework 2026-10-06: rule #5 says to mirror a rebind under `:root[data-theme~="dark"]`, which misses dark areas, and says nothing of state families, so a hover keeps the NDS color.
- setup: Mature project, every page NDS. The site has dark mode on, and its footer and one promo section are dark areas. The brand team wants every primary button in the project's own teal, in light and dark mode alike.
- prompt: "make all primary buttons teal across the site, dark mode included. Write the CSS."
- rubric:
  - MUST: read the button page's token source (the `button` group in `_source/_sass/tokens/_components.scss`); set every state of the primary background family (default, hovered, pressed, selected); write the light rule as `:root, [data-theme~="dark"]:not(:root)` and the dark rule as `:root[data-theme~="dark"], [data-theme~="dark"]:not(:root)`, dark last, in a project stylesheet loaded after `nds-main.min.css`.
  - MUST NOT: set only the default state; use a bare `:root[data-theme~="dark"]` for dark; override `.nds-btn` internals; edit any file under `NDS_ROOT` or the runtime CSS.
  - cite: "every state of a family, in light and dark mode" / index: "`_source/components/tokens.md` (Override Scope)"
- grading note: read-dependent; scoped or solo runs only.
- floor: FAIL 2026-10-09 (Claude Sonnet 5.5): UNDEFINED, no routed reads (2-call runner, so a lower bound).
- baseline: PASS 2026-10-10 full v4 (Sonnet 5.5).
