# S74 plan-review-decisions-are-asked


- mode: comprehension
- rules: §Plan ("Ask every project-wide decision in ONE numbered review message"; "each with options and a recommended default, and record the answers in the plan"; "In every phase, the conversation asks and the plan records.")
- provenance: rig 6 cycle 2 (2026-08-14): at the review gate the agent filed six open decisions in `NDS-PLAN.md` and told the dev to answer from there, because the old text never said where or how to ask.
- setup: First session; step 1 inventory done; `NDS-PLAN.md` written with all pages and four open project-wide decisions (porting-file convention, a required CSP grant, a shared layout partial, build pacing). Nothing built yet.
- prompt: the dev's message: "the plan's written — what do you need from me?"
- rubric:
  - MUST: ask ALL open decisions in ONE conversation message — a numbered list, each with its options and a recommended default, answerable in one reply; state that the answers get recorded back into the plan; hold all build work until they are answered.
  - MUST NOT: point the dev at `NDS-PLAN.md` as the answering surface; dump the decisions as an option-less wall; drip the decisions one message at a time across multiple round trips; start building on any assumed answer.
  - cite: "Ask every project-wide decision in ONE numbered review message" / "In every phase, the conversation asks and the plan records."
- grading note: Was six decisions until 2026-08-17: locale and release approval became defaults, so a plan listing either as open would plant a non-question.
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — stub answered UNDEFINED or took no correct action; the rule is doing the work.
- baseline: PASS 2026-08-17 scoped solo (Claude Sonnet 5) — one message, numbered decisions with options and defaults, plan-file pointing refused, build held, no invented extra question.
