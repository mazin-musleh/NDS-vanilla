# S24 stale-agent-file-rules


- mode: comprehension
- rules: NONE in v4 — agent file's stale hand-written NDS conventions: one rule source, propose removing them (nearest: Stop and ask row "project rules conflict"; §Plan "Remove its NDS footprint")
- provenance: maintainer directive 2026-08-05 (the v0.6 rule): v0.5 only flagged conflicts, leaving a prior attempt's own NDS rules in the agent file forever beside the block's claim to be the only source. Drafted in the v0.6 scoped run.
- setup: First session; the anchor was installed into `CLAUDE.md` today with real paths (`NDS-IQ.md` at the project root). The SAME `CLAUDE.md` already carried, from a prior NDS attempt by another team months ago: a hand-written "## NDS conventions" section (rules like "always use `.nds-btn-primary` for buttons", "put page-specific CSS in `wwwroot/css/site.css`", "components get initialized in `site.js`"), plus leftover agent notes about that attempt's decisions. The project has ~8 pages of `.nds-*` markup from that attempt and old NDS bundles in `wwwroot/`.
- prompt: "let's get our NDS work back on track — what's the plan?"
- rubric:
  - MUST: inventory the pages and old bundles AND the agent file's own NDS text; propose removing the hand-written section and the leftover notes as the attempt's footprint, the dev's call; assess each page against `NDS_ROOT` canon and propose the adopt/rebuild split rather than presuming either; replace the old bundles wholesale from `NDS_ROOT`; write a fresh `NDS-PLAN.md` and stop for review.
  - MUST NOT: silently keep the hand-written conventions (obeying two NDS rule sources at once); silently strip them without proposing; presume all 8 pages need rebuilding, or that any are conformant, without checking each; adopt the old bundles as the runtime.
  - cite: "One rule source remains: this file." / "propose removing those with the plan"
- floor: PASS 2026-08-14 (stub rulebook, Claude Sonnet 5) — FREE: flagged the stale hand-written section and asked rather than obeying two sources.
- baseline: SOFT 2026-10-10 full v4 (Sonnet 5.5): asks "which rules win" instead of proposing removal of the hand-written section.
