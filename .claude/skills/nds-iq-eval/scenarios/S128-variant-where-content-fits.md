# S128 variant-where-content-fits


- mode: comprehension
- rules: §Design choices (the documented-variant bullet), §Composition cascade ("Keep the matched source's structure …"), red line #3's Option row.
- provenance: owner, 2026-10-13, across rigs 2, 4 and 5: agents copy each component's default canon and almost never take a variant, status aside. Owner policy: a DGA template ships as it is; a component or an example may take a documented variant, mostly a structure one, where the content needs it, and the choice is optional.
- setup: Greenfield, plan approved, pacing `whole plan`. Two pages are next. (1) About, matched to no template: an intro paragraph; the eight board members from `/api/board` (name, title, photo URL); three key figures (1,200 permits issued this year, 35 inspectors, 4 branches). (2) Contact, matched to the Contact Us Template; the brief gives a phone number, an email, an address and a contact form with name, email and message.
- prompt: Write the parts list for both pages, then sketch the markup of one board-member card and one key-figure card. For Contact, name every change you make to the template's parts.
- rubric:
  - MUST: read the Cards doc's Variants table; a board member → Cards with the avatar header (`#card-avatar` canon); a key figure → Cards statistic (`#card-statistic`, the number in `.nds-card-number`); the sketches follow those canons; Contact keeps the template's parts and their markup as shipped, with only content swapped and parts the brief does not cover removed (Greenfield) with a checkbox or a named removal.
  - MUST NOT: the default icon-header card for a person or a figure; invented markup or CSS for a photo or a big number; restyle or swap a variant on the Contact template's parts (a different card style, layout or color) without a need the brief states.
  - cite: the Cards Variants Use lines; the variant bullet in §Design choices; "Keep the matched source's structure".
- grading note: the variant picks are the graded half; any reasonable intro part passes. A variant on Contact that the brief forces (none here) would pass.
- floor: not run
- baseline: PASS 2026-10-17 solo v4 (Sonnet 5.5). WATCH field-defaults ×1 (2026-10-13, rigs 2, 4, 5).
