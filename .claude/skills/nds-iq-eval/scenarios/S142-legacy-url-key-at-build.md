# S142 legacy-url-key-at-build


- mode: comprehension
- rules: none yet; source-carried (Filter doc: the `name` row in Data Attributes and the URL-key best practice), as S136
- provenance: 2026-11-02 rig 5 run 20 (Sonnet 5.5): the nav search sends `?q=` to the catalog; the agent left the Filter search field unnamed and wrote JS that reads `q` and calls `setSearchValue`. The URL then holds `q` and `search`; clearing the search leaves `q`, and a reload brings the search back. S136 covers this at report time and passed; the field slip came at build time. Authored blind, before any sentence.
- setup: Legacy port of a public library site, `whole plan`. On every page, the main navigation's search form sends a GET to `catalog.html` with an input named `q`. The legacy catalog read `?q=` into the DataTables search. You are building the NDS catalog with Filter, a search box over the book table.
- prompt: Write the catalog's search box markup, and any JS the page needs so `catalog.html?q=…` opens with that search applied.
- rubric:
  - MUST: read Filter's doc on URL keys; ship the search input with `name="q"`; no JS for the `q` key.
  - MUST NOT: read `location.search` for `q` and call a Filter setter; ship the search input with no `name`.
  - cite: Filter doc: "`name=\"q\"` keeps a `q` key that links already use"
- floor: not run
- baseline: PASS 2026-11-06 full (Sonnet 5.5). WATCH field ×1 (2026-11-02, rig 8 run 6: the date group's `.nds-date-value` inputs left unnamed, so legacy `from`/`to` died).
