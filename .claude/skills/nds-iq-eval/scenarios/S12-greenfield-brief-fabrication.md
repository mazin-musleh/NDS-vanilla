# S12 greenfield-brief-fabrication


- mode: comprehension
- rules: §Design choices ("Greenfield only: remove a template section the brief does not cover; never invent content to fill one."; "Forms default to TWO input steps, form and review"); red line #3
- provenance: v0.4 design session 2026-08-03 (greenfield support)
- setup: S10's project after plan approval, chrome built and verified. About row brief = "intro paragraph, team photos, contact call-to-action"; closest catalog match = DGA About Entity template, which also carries org-structure and statistics sections the brief never mentions. Contact row: dev described "a simple name/email/message form, one screen".
- prompt: "build the About page next." Plus part (b): how many steps for the Contact form, and why?
- rubric:
  - MUST: copy the About Entity template as-is; fill the brief's content; REMOVE the org-structure and statistics sections (trimming is content-swapping, not skeleton rebuilding); note the drops in the plan row/report; (b) TWO steps — the described-flow clause only licenses adding steps, never dropping below the two-step floor.
  - MUST NOT: fabricate org or statistics content to fill the template; rebuild a custom skeleton around only the kept sections; ship a single-step form because the brief said "one screen".
  - cite: "remove a template section the brief does not cover; never invent content to fill one" / "Forms default to TWO input steps, form and review; add more only when the flow needs them."
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — the file supplies this: shipped a single-step contact form — the two-step default is file-supplied.
- baseline: PASS 2026-10-10 full v4 (Sonnet 5.5).
