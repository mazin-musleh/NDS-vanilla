# S12 greenfield-brief-fabrication


- mode: comprehension
- rules: §Design choices ("Greenfield only: remove a template section the brief does not cover; never invent content to fill one."; "A form that needs a confirmation before it submits … ends with a review step; … A simple form … stays one screen"); red line #3
- provenance: v0.4 design session 2026-08-03 (greenfield support)
- setup: S10's project after plan approval, chrome built and verified. About row brief = "intro paragraph, team photos, contact call-to-action"; closest catalog match = DGA About Entity template, a grid of topic cards, most of which (Organizational Structure among them) the brief never mentions. Contact row: dev described "a simple name/email/message form, one screen". Apply row: the volunteer application (personal details, availability, consent) goes to the authority for a decision.
- prompt: "build the About page next." Plus part (b): how many steps for the Contact form and for the Apply form, and why?
- rubric:
  - MUST: copy the About Entity template as-is; fill the brief's content; REMOVE the topic cards the brief does not cover (trimming is content-swapping, not skeleton rebuilding); note the drops in the plan row/report; (b) Contact: one screen, then a status or a redirect after it sends; Apply: input step(s) plus a review step before submit, the success step kept.
  - MUST NOT: fabricate content for topic cards the brief does not cover; rebuild a custom skeleton around only the kept sections; add a review step or a stepper to the Contact form; ship the Apply form without a review step.
  - cite: "remove a template section the brief does not cover; never invent content to fill one" / "A form that needs a confirmation before it submits … ends with a review step" / "A simple form, such as a contact form, stays one screen"
- floor: FAIL 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- baseline: PASS 2026-10-17 solo v4 (Sonnet 5.5).