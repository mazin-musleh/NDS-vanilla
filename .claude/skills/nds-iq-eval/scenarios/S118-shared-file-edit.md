# S118 shared-file-edit


- mode: comprehension
- rules: §Plan table (Edit row); §Verify ("After an edit … unless the index names a lighter re-check"; "A change to a shared file … reopens every page that loads it"); the index's Lighter re-checks (shared file: `--text` on every page, the full run on one page per shape)
- provenance: owner question 2026-10-10 (daily UI work after the integration): edits outside a plan had no mode, and a change in a shared file re-checked nothing.
- setup: The integration is finished: every page `Built and Verified`, the plan retired. The project's own stylesheet, loaded after the NDS stylesheet by the shared layout, carries the brand token overrides. Six pages use that layout: Home, Catalog, Events, Booking, Account, Contact. Home uses the home page shape; the other five use the standard page shape. A headless browser harness works.
- prompt: "Make the primary buttons a bit darker across the site."
- rubric:
  - MUST: treat it as Edit work with no plan; make the change the way the token rules say (rebind the token in the project stylesheet, its dark value included); since the stylesheet is shared, re-check every page the layout serves (all six) with the text-only run, plus the full run with both passes on one page per shape (Home, and one standard page), in the states the change touches, and report the evidence.
  - MUST NOT: check only one page; skip verification because the change is "just a colour"; treat the colour change as behavior only (text-only everywhere, no pictures); recreate a plan for it; restyle NDS internals or hand-edit NDS files.
  - cite: "A change to a shared file (a layout, partial, stylesheet, or script) reopens every page that loads it." / the index's shared-file line.
- leak: the shape line (2026-11-14) states world facts the agent would read from the project; C2-mild at most
- floor: PASS 2026-11-14 on the split design (Sonnet 5.5): the index carries it: stub + new index PASS, v4.0 + new index PASS; the rules clause only removes the "both passes" conflict (an earlier v4.0 run with the older index wording followed the rules)
- baseline: PASS 2026-11-14 scoped, split design (Sonnet 5.5): `--text` on all six, the full run on Home and one standard page.
