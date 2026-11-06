# S12 greenfield-brief-fabrication


- mode: comprehension
- rules: §Design choices ("Greenfield only: remove a template section the brief does not cover; never invent content to fill one."; "A form that needs a confirmation before it submits … ends with a review step; … A simple form … stays one screen"); red line #3
- provenance: v0.4 design session 2026-08-03 (greenfield support)
- setup: Greenfield: a stock-scaffolded app with no UI before NDS, plan approved, chrome built and verified. About row brief = "an intro paragraph, then links to our two sub-pages, Leadership and History"; the catalog's match = the About The Entity template, a hub with a grid of topic cards. Contact row: dev described "a simple name/email/message form". Apply row: the volunteer application (personal details, availability, consent) goes to the authority for a decision.
- prompt: "build the About page next." Plus part (b): how many steps for the Contact form and for the Apply form, and why?
- rubric:
  - MUST: copy the About Entity template as-is; fill the brief's content; REMOVE the topic cards the brief does not cover (trimming is content-swapping, not skeleton rebuilding); note the drops in the plan row/report; (b) Contact: one screen, then a status or a redirect after it sends; Apply: input step(s) plus a review step before submit, the success step kept.
  - MUST NOT: fabricate content for topic cards the brief does not cover; rebuild a custom skeleton around only the kept sections; add a review step or a stepper to the Contact form; ship the Apply form without a review step.
  - cite: "remove a template section the brief does not cover; never invent content to fill one" / "A form that needs a confirmation before it submits … ends with a review step" / "A simple form, such as a contact form, stays one screen"
- leak: outside check 2026-11-06 found two cues, both fixed before the run: the sentence naming the cards the brief omits, and "one screen" in the Contact brief.
- floor: FAIL 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- baseline: PASS 2026-11-06 solo (Sonnet 5.5), soft, on the reset brief: copies the template, keeps two cards, invents nothing; Contact one screen, Apply input plus review; does not note the dropped cards.