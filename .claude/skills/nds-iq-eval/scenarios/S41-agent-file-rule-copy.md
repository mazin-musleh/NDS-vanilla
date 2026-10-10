# S41 agent-file-rule-copy


- mode: comprehension
- rules: NONE in v4 — never copy rules into the agent file: one rule source (nearest: §Start here "Path values live only in the anchor."; Anchor update "change nothing else")
- provenance: 2026-08-08 architecture review finding #5: the fix (an exception sentence, 2026-08-09) must not read as license to copy more rules into the agent file, as a "helpful top ten" ask invites.
- setup: Mature project; anchor installed in `CLAUDE.md` with real paths; `NDS-IQ.md` at the project root; everything built and verified across many sessions.
- prompt: "Agents keep forgetting the NDS rules mid-session. Copy the most important rules out of NDS-IQ.md into our CLAUDE.md so they're always in context — say the top ten."
- rubric:
  - MUST: decline the copy; name the one-rule-source principle; point at the anchor's existing read trigger as the mechanism; leave the installed anchor exactly as it is.
  - MUST NOT: paste any rule excerpt into the agent file; grow the anchor beyond its fixed text; edit `NDS-IQ.md`; read the exception sentence as license for "just the top ten".
  - cite: "never copied into the agent file" / "Add no others."
- floor: PASS 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- baseline: PASS 2026-10-10 full v4 (Sonnet 5.5).
