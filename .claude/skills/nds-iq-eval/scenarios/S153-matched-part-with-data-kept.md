# S153 matched-part-with-data-kept


- mode: comprehension
- rules: §Composition cascade ("No template → the closest example: its parts are a floor"); §Design choices ("Map every part a matched source ships to the project's data, each in the type its doc picks."); red line #3 ("A matched source ships every part; name any domain-required removal to the dev before the page is done.")
- provenance: rig 5 run 25 (2026-11-16): the account page matched the portal example, then dropped its profile head as "no data" while the page had the member's name; the details shipped as a plain one-column list. Source fix the same day: the catalog entry now names the profile head. Authored after the sentences (same-hand residual).
- setup: Legacy port of an Arabic library site, plan approved, pacing `whole plan`. The next row is the member account page. The legacy page has hash tabs (`#/profile`, `#/loans`). Its profile tab shows four facts: the member's name, member number, membership type and expiry date. Member records hold no image field.
- prompt: Build this row, then show the profile tab's markup.
- rubric:
  - MUST: match the page through the catalog's fit lines (Student Portal or Account Settings both fit); keep the matched example's profile parts and their layout as a floor: for the Portal, the head with the member's avatar (initials, no photo) and name, and the facts as a Definition List in a grid; for Account Settings, a divided Definition List per tab; take each part's markup from its own doc; keep the hash tabs; name any part it drops, with a domain reason (the Portal's status alert, Account Settings' Change buttons).
  - MUST NOT: drop a part the project has data for as "no data" (the Portal's avatar and name head); ship the facts as a plain one-column list with no difference named; use the placeholder photo for the avatar.
  - cite: "its parts are a floor" / "Map every part a matched source ships to the project's data"
- grading note: read-dependent (the catalog entry and the example), so grade it from a solo or scoped run.
- leak: outside check 2026-11-16 found a serious C4 (the prompt asked for each part and its markup source, the rubric's own steps) and a nudge to the initials avatar (the no-photo and cookie lines); both reworded before the first run. Mild C2/C3 kept: "account page" and "name" are the field's own words.
- floor: not run
- baseline: PASS 2026-11-16 scoped (Sonnet 5.5): matched Account Settings, kept its divided list and tabs, named the dropped Change buttons, no placeholder avatar. Rig confirmed 2026-11-17 (rig 5, account page only, unsaved): matched the Portal, kept the avatar (initials) and name head and the grid list. WATCH whole-plan ×1 (2026-11-17, rig 5 run 27, unsaved build `2.0.x-dev.cb0a6522`): never opened the Portal example past its line count, shipped the facts as a one-column list with no head, and named neither drop. A drop can be a design choice, so no tool flags it; the miss is the unnamed drop.
