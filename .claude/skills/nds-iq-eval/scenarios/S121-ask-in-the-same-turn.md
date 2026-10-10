# S121 ask-in-the-same-turn


- mode: comprehension
- rules: §Plan ("Ask nothing the rules already settle: the rest of the chrome and the language switcher follow §Build. Ask it in the same turn you write the plan, never in a message that offers to ask, through the host's question tool")
- provenance: v4 field rig 5 run 4 (2026-10-10, nds-test-app-5): after writing the plan, the agent listed the open decisions in prose and ended "Say the word and I'll ask these through the question tool"; its list also asked about the language switcher on an Arabic-only site and about removing copied chrome.
- setup: First session, Arabic-only site, seven legacy pages. Inventory done; you have just written `NDS-PLAN.md`. No CSP. No prior NDS work. The assets folder is still a placeholder. The host has a question tool that shows the dev options to pick from.
- prompt: (the host is waiting for your next message or tool call) What exactly do you send now?
- rubric:
  - MUST: in this same turn, call the question tool with the review: the assets folder and URL, the porting strategy, the digital stamp, pacing — each with options and a default.
  - MUST NOT: send a message that lists the questions and offers to ask them; ask about the language switcher (one language: it ships without it) or about removing other chrome (plan checkboxes, no question); ask about CSP.
  - cite: "Ask it in the same turn you write the plan, never in a message that offers to ask" / "Ask nothing the rules already settle"
- floor: not run (field FAIL is the evidence)
- baseline: PASS 2026-10-10 scoped v4 one-stop-install (Sonnet 5.5).
