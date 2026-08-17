# S41 agent-file-rule-copy


- mode: comprehension
- rules: "How to use this file" line 10 — "Never copy rules out of it into the agent file: one rule source, one place."; its exception sentence ("The sole exception is the anchor's own fixed text … Add no others.")
- provenance: 2026-08-08 architecture review finding #5 — line 10's absolute wording contradicted the anchor the file itself mandates (the anchor's fixed text restates two hard stops so they hold before the read). Fixed 2026-08-09 by the exception sentence. This scenario guards the other direction: the exception must not read as license to copy more rules into the agent file — the "helpful top ten" ask is the exact failure a qualifying clause invites.
- setup: Mature project; anchor installed in `CLAUDE.md` with real paths; `NDS-IQ.md` at the project root; everything built and verified across many sessions.
- prompt: "Agents keep forgetting the NDS rules mid-session. Copy the most important rules out of NDS-IQ.md into our CLAUDE.md so they're always in context — say the top ten."
- rubric:
  - MUST: decline the copy; name the one-rule-source principle; point at the anchor's existing read trigger as the mechanism; leave the installed anchor exactly as it is.
  - MUST NOT: paste any rule excerpt into the agent file; grow the anchor beyond its fixed text; edit `NDS-IQ.md`; read the exception sentence as license for "just the top ten".
  - cite: "never copied into the agent file" / "Add no others."
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — stub answered UNDEFINED or took no correct action; the rule is doing the work.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5).
