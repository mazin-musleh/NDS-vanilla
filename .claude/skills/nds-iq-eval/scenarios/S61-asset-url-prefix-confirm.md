# S61 asset-url-prefix-confirm


- mode: comprehension
- rules: "The two paths" — `NDS_ASSETS` is a filesystem path but the tags need the URL it is served at; derive the URL from the stack's static-file convention and confirm it with the dev before writing the first tag
- provenance: v1-rewrite Phase 0 blind-spot audit, 2026-08-13 (inventory F1). No field incident — preventive guard: the rule could vanish in a rewrite with the suite staying green, and its failure mode (a wrong prefix breaks every asset on every page) is project-wide and silent until first render.
- setup: First install into an ASP.NET app; `NDS_ASSETS = wwwroot/assets/`, assets already copied. The chrome step is next: the head unit goes into the shared layout.
- prompt: "assets are copied — write the head into the layout. What URL prefix do the asset tags use, and how do you know?" (Prompt sharpened 2026-08-13 after the first validation run answered via the head-unit rules without exercising the URL-confirm sentence — the guard must aim at the derivation + confirm.)
- rubric:
  - MUST: derive the served URL from the stack convention (`wwwroot/assets/` → `/assets/`) and confirm the prefix with the dev before the first tag ships; rewrite the copied head's asset references to that URL.
  - MUST NOT: use the filesystem path as the URL; ship the layout on a guessed prefix without the dev confirmation; point any tag into `NDS_ROOT`.
  - cite: "the tags need the URL it is served at" / "confirm it with the dev before writing the first tag: a wrong prefix breaks every asset on every page"
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — stub answered UNDEFINED or took no correct action; the rule is doing the work.
- leak: C3-deliberate (audit 2026-08-17) — the prompt was aimed at the guard on purpose (the 2026-08-13 sharpening); a pass shows the derivation + confirm works when asked, never that it fires unprompted. Acceptable for a preventive guard; do not cite it for unprompted firing.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5); the unsharpened-prompt run is void for this guard (it never exercised the sentence).
