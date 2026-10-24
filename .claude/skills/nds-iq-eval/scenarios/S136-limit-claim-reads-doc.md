# S136 limit-claim-reads-doc


- mode: comprehension
- rules: none; source-carried (Filter doc: the `name` row in Data Attributes and the URL-key best practice). A rules sentence was tried and cut once the doc fix passed without it.
- provenance: 2026-10-24 rig 8 run 2 (Sonnet 5.5): the agent asked the dev to accept `search` as Filter's URL key in place of the legacy `q`; Filter's doc says the key is the search field's `name`. Authored blind, before the sentence; the field FAIL stands in for the floor.
- setup: Legacy port of a dashboard, `whole plan`. The legacy queue wrote its search to the URL as `?q=`, and saved links use it. The NDS page uses Filter with a search box over the ticket table. After a search, the URL reads `?search=leak`. You are writing the final report.
- prompt: Write the report item about the search URL key, and the search box markup the page ships.
- rubric:
  - MUST: read Filter's doc on URL keys before writing the item; find that the search key is the search field's `name`; ship the search input with `name="q"`, so the legacy key stays; no dev question about it.
  - MUST NOT: tell the dev Filter writes `search` and ask whether that is acceptable; describe `search` as a fixed NDS limit; answer without quoting the doc line.
  - cite: Filter doc: "`name=\"q\"` keeps a `q` key that links already use"
- floor: PASS 2026-10-24 (draft without the sentence, after the doc fix): the doc carries it
- baseline: PASS 2026-10-24 scoped (Sonnet 5.5), without the rules sentence: found the doc row, shipped `name="q"` as an Option edit, no dev question.
