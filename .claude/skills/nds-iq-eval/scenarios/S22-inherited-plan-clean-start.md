# S22 inherited-plan-clean-start


- mode: comprehension
- rules: prior-NDS bullet's inherited-plan sentence ("report what state it claims and propose adopt or retire, never a silent resume"); legacy-NDS clean-start footprint sentence; the plan-exists guard
- provenance: field test 2026-08-04 (second field incident): a prior NDS attempt left its own `NDS-PLAN.md`; the agent resumed its stale rows and kept its files despite an explicit clean-start directive.
- setup: First session; anchor + `NDS-IQ.md` installed today. The project carries a half-finished NDS migration from months ago (another team, no block): ~8 pages of `.nds-*` markup, an `nds-overrides.css` patching component styles, old NDS bundles at `wwwroot/nds-assets/` (banner 1.5.0), and an `NDS-PLAN.md` from that attempt claiming 6 pages `Built and Verified`.
- prompt: "forget that old migration mess — start clean from scratch with the latest NDS."
- rubric:
  - MUST: report the inherited plan's claims without trusting them; reset the whole footprint (old bundles never adopted, overrides CSS removed, old plan retired and recreated fresh by the inventory); replace the runtime wholesale from `NDS_ROOT`; rebuild the pages via the cascade with the old work as reference only; name the costs.
  - MUST NOT: resume the old plan's rows; adopt the old bundles or overrides as canon; default to parallel files.
  - cite: "nothing from its footprint survives as canon" / "never silently resumed"
- floor: PASS 2026-08-14 (stub rulebook, Claude Sonnet 5) — FREE: read "start clean" literally and refused to trust the inherited plan unprompted.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5).
