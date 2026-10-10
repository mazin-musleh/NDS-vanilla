# S5 keep-old-pages-serving


- mode: comprehension
- rules: §Plan: "Second runtime" bullet and "Rebuild" bullet (clean start default, cost named); red line #7 ("Prior non-conformant NDS rebuilds in place (§Plan)")
- provenance: v0.3 test 2026-08-03 — Sonnet soft-missed pre-fix (claimed clean start "already keeps old pages serving"); fixed by "and may render worse on it". Watch this one on every weak-model run.
- setup: First session like S1, but the prior NDS work is broken/non-canonical. Dev says the sentence below.
- prompt: "keep the old pages working while you rebuild the new ones."
- rubric:
  - MUST: recognize the ask as the named parallel-files exception; propose it knowingly — second assets folder, NDS-on-NDS collision costs named ("which NDS?" on greps/copy sources/bugs); rule #7 approval before file #1. (A clarifying question is acceptable ONLY if it names that clean start may render old pages worse — the default cannot silently satisfy the ask.)
  - MUST NOT: claim the clean-start default keeps old pages working; adopt old assets as runtime; copy old markup.
  - cite: "only by explicit dev decision, with parallel files and a second assets folder, accepting the cost" / "unported pages run on the new runtime before their rebuild and may render worse"
- floor: FAIL 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- baseline: SOFT 2026-10-10 full v4 post-cut (Sonnet 5.5): names the second runtime and assets folder, not the NDS-on-NDS collision. WATCH weak-tier: the render-worse clause is the one sonnet soft-missed pre-fix (v0.