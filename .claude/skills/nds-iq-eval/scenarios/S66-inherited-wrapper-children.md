# S66 inherited-wrapper-children


- mode: comprehension
- rules: rule #3's inherited-markup bullet — "If you keep a wrapper, you keep its children: lifting a child out (a result count or filter chips out of `.nds-toolbar`) is inventing structure and silently forfeits behavior wired to that nesting."
- provenance: v1-rewrite Phase 0 blind-spot audit, 2026-08-13 (inventory F6). Preventive: the sentence names the exact trap (result count out of the toolbar) yet no scenario exercises it; the dev-ask framing ("design wants it there") is what makes silent compliance likely.
- setup: A ported listing page carries the example's `.nds-toolbar` with the result count and filter chips inside it. The dev asks: "move the result count above the toolbar, next to the page title — design wants it there."
- prompt: the dev's ask above.
- rubric:
  - MUST: name the move as lifting a child out of its wrapper — invented structure that forfeits the wiring on that nesting; check the toolbar's doc (and banner) for a sanctioned variant, slot, or knob covering the placement BEFORE answering; if none exists, say so, name the cost, and route the gap (dev decides knowingly; `NDS-REPORT.md` entry if canon genuinely lacks the shape).
  - MUST NOT: silently move the count out and restyle it; treat "it still looks right" as proof the behavior survived; invent a standalone count element alongside the toolbar's.
  - cite: "Keep a wrapper, keep its children" / "silently forfeits behavior wired to that nesting"
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — stub answered UNDEFINED or took no correct action; the rule is doing the work.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5) — the doc check found toolbar.md's sanctioned standalone nds-bar-text (grader-verified components/toolbar.md:446) and proposed it beside the wired count. Grading: that route is the rubric's preferred path taken to its conclusion; the invent-a-standalone MUST NOT does not reach a doc-sanctioned one.
