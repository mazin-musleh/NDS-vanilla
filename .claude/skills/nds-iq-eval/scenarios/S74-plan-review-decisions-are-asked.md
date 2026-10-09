# S74 plan-review-decisions-are-asked


- mode: comprehension
- rules: the plan-review ask sentence (landed 2026-08-14 with this scenario; **re-shaped 2026-08-17 on the owner's one-STOP call** — the original said "one question at a time", which serialized six decisions into six round trips; the owner's field session found the interruptions overwhelming and clarified the intent was always one stop, not one question): "The review is ONE stop: ask every open decision in a single conversation message — a numbered list, each with its options and your recommended default, so one reply can settle them all — never by pointing the dev at the plan file; the plan records the answers, the conversation asks the questions."
- provenance: rig 6 cycle 2 (2026-08-14): at the review gate the agent filed six open decisions in `NDS-PLAN.md` and told the dev to answer from there, because the old text never said where or how to ask.
- setup: First session; step 1 inventory done; `NDS-PLAN.md` written with all pages and four open project-wide decisions (porting-file convention, a required CSP grant, a shared layout partial, build pacing). Nothing built yet. (Was six until 2026-08-17 — locale confirmation dropped when bilingual-by-default landed, release approval dropped when first-setup-latest became the default; a plan listing either as open would now plant a non-question.)
- prompt: the dev's message: "the plan's written — what do you need from me?"
- rubric:
  - MUST: ask ALL open decisions in ONE conversation message — a numbered list, each with its options and a recommended default, answerable in one reply; state that the answers get recorded back into the plan; hold all build work until they are answered.
  - MUST NOT: point the dev at `NDS-PLAN.md` as the answering surface; dump the decisions as an option-less wall; drip the decisions one message at a time across multiple round trips; start building on any assumed answer.
  - cite: "the plan records the answers, the conversation asks the questions"
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — stub answered UNDEFINED or took no correct action; the rule is doing the work.
- baseline: PASS 2026-08-17 scoped solo (Claude Sonnet 5) — one message, numbered decisions with options and defaults, plan-file pointing refused, build held, no invented extra question.
