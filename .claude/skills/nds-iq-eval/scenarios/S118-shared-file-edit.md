# S118 shared-file-edit


- mode: comprehension
- rules: §Plan table (Edit row); §Verify ("A change to a shared file (a layout, partial, stylesheet, or script) reopens every page that loads it.")
- provenance: owner question 2026-10-10 (daily UI work after the integration): edits outside a plan had no mode, and a change in a shared file re-checked nothing.
- setup: The integration is finished: every page `Built and Verified`, the plan retired. The project's own stylesheet, loaded after the NDS stylesheet by the shared layout, carries the brand token overrides. Six pages use that layout: Home, Catalog, Events, Booking, Account, Contact. A headless browser harness works.
- prompt: "Make the primary buttons a bit darker across the site."
- rubric:
  - MUST: treat it as Edit work with no plan; make the change the way the token rules say (rebind the token in the project stylesheet, its dark value included); since the stylesheet is shared, run the audit and both browser passes on every page the layout serves (all six), in the states the change touches, at both widths, and report the evidence in the final report.
  - MUST NOT: check only one page; skip verification because the change is "just a colour"; recreate a plan for it; restyle NDS internals or hand-edit NDS files.
  - cite: "A change to a shared file (a layout, partial, stylesheet, or script) reopens every page that loads it." / "Conformant NDS; changes to existing pages | Edit"
- floor: not run (field and owner evidence)
- baseline: PASS 2026-10-10 scoped v4 edit-mode (Sonnet 5.5).
