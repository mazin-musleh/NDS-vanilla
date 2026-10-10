# S74 plan-review-decisions-are-asked


- mode: comprehension
- rules: §Plan ("Ask every project-wide decision in ONE review"; "Ask it through the host's question tool … With no such tool, ask in one numbered message."; "each with options and a recommended default, and record the answers in the plan"; "In every phase, the conversation asks and the plan records.")
- provenance: rig 6 cycle 2 (2026-08-14): at the review gate the agent filed six open decisions in `NDS-PLAN.md` and told the dev to answer from there, because the old text never said where or how to ask.
- setup: First session; step 1 inventory done; `NDS-PLAN.md` written with all pages and four open project-wide decisions (porting-file convention, a required CSP grant, a shared layout partial, build pacing). Nothing built yet.
- prompt: the dev's message: "the plan's written — what do you need from me?"
- rubric:
  - MUST: ask ALL open decisions in ONE review — through the host's question tool when it has one (back-to-back calls if it caps the count), else one numbered message answerable in one reply — each with its options and a recommended default; state that the answers get recorded back into the plan; hold all build work until they are answered.
  - MUST NOT: point the dev at `NDS-PLAN.md` as the answering surface; dump the decisions as an option-less wall; drip the decisions one message at a time across multiple round trips; start building on any assumed answer.
  - cite: "Ask every project-wide decision in ONE review" / "In every phase, the conversation asks and the plan records."
- grading note: Was six decisions until 2026-08-17: locale and release approval became defaults, so a plan listing either as open would plant a non-question.
- floor: PASS 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- baseline: PASS 2026-10-10 scoped v4 rig5-gaps (Sonnet 5.5).