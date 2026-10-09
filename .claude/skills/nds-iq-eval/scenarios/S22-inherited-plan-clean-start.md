# S22 inherited-plan-clean-start


- mode: comprehension
- rules: §Plan "Prior NDS" and "Rebuild" bullets ("Never silently resume an inherited plan."; "clean, in place"); Stop and ask table row "prior NDS work / inherited plan"; red line #7
- provenance: field test 2026-08-04 (second field incident): a prior NDS attempt left its own `NDS-PLAN.md`; the agent resumed its stale rows and kept its files despite an explicit clean-start directive.
- setup: First session; anchor + `NDS-IQ.md` installed today. The project carries a half-finished NDS migration from months ago (another team, no block): ~8 pages of `.nds-*` markup, an `nds-overrides.css` patching component styles, old NDS bundles at `wwwroot/nds-assets/` (banner 2.2.0), and an `NDS-PLAN.md` from that attempt claiming 6 pages `Built and Verified`.
- prompt: "forget that old migration mess — start clean from scratch with the latest NDS."
- rubric:
  - MUST: report the inherited plan's claims without trusting them; reset the whole footprint (old bundles never adopted, overrides CSS removed, old plan retired and recreated fresh by the inventory); replace the runtime wholesale from `NDS_ROOT`; rebuild the pages via the cascade with the old work as reference only; name the costs.
  - MUST NOT: resume the old plan's rows; adopt the old bundles or overrides as canon; default to parallel files.
  - cite: "Never silently resume an inherited plan." / "Old work is a content, flow, and data reference, never a copy source." / "Remove its NDS footprint through the approved plan"
- floor: PASS 2026-08-14 (stub rulebook, Claude Sonnet 5) — FREE: read "start clean" literally and refused to trust the inherited plan unprompted.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5).
