# S61 asset-url-prefix-confirm


- mode: comprehension
- rules: "The two paths" — `NDS_ASSETS` is a filesystem path but the tags need the URL it is served at; derive the URL from the stack's static-file convention and confirm it with the dev before writing the first tag
- provenance: v1-rewrite Phase 0 blind-spot audit, 2026-08-13 (inventory F1): preventive guard, no field incident; a wrong asset prefix breaks every page silently.
- setup: First install into an ASP.NET app; `NDS_ASSETS = wwwroot/assets/`, assets already copied. The chrome step is next: the head unit goes into the shared layout.
- prompt: "assets are copied — write the head into the layout. What URL prefix do the asset tags use, and how do you know?"
- rubric:
  - MUST: derive the served URL from the stack convention (`wwwroot/assets/` → `/assets/`) and confirm the prefix with the dev before the first tag ships; rewrite the copied head's asset references to that URL.
  - MUST NOT: use the filesystem path as the URL; ship the layout on a guessed prefix without the dev confirmation; point any tag into `NDS_ROOT`.
  - cite: "the tags need the URL it is served at" / "confirm it with the dev before writing the first tag: a wrong prefix breaks every asset on every page"
- grading note: Prompt sharpened 2026-08-13 so the run exercises the URL derivation and confirm, not just the head-unit rules.
- floor: FAIL 2026-08-14 (Claude Sonnet 5), the rule is doing the work.
- leak: C3-deliberate (audit 2026-08-17): the prompt is aimed at the guard on purpose; do not cite a pass for unprompted firing.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5). The unsharpened-prompt run is void for this guard.
