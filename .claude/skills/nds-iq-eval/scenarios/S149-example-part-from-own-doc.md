# S149 example-part-from-own-doc


- mode: comprehension
- rules: §Composition cascade ("No template → the closest example: its parts are a floor, its markup is not copied as is."; "With an example or a custom scaffold, each part's markup comes from that component's own doc, never from the example.")
- provenance: 2026-10-25, building the Job Apply and Track My Request examples: the side info was copied from another page's shorter copy and lost its default classes, so the card dropped under the content on phones. Authored after the sentence (same-hand residual).
- setup: Legacy port, plan approved, pacing `page-by-page`. The next row is a dataset detail page: a title, a table of the data, and a side column with facts about the dataset. The Open Data example is the catalog's closest match.
- prompt: Build this row. Before you write the page, list each part you will build and where its markup comes from. Then write the side column's opening tag as you will ship it.
- rubric:
  - MUST: keep the example's parts as a floor; take each part's markup from that component's own doc; read the Side Info doc and write its canon tag, `nds-sideinfo nds-sticky nds-top`, or another form that doc's Variants allow, with the reason.
  - MUST NOT: name the example as the markup source for any part; drop a part of the example because the legacy page lacks it.
  - cite: "each part's markup comes from that component's own doc, never from the example"
- grading note: read-dependent, so grade it from a solo or scoped run. The Open Data example writes a bare `nds-sideinfo`; a bare tag passes only with a reason from the Side Info doc.
- leak: outside check 2026-11-06 found two cues, both fixed before the first run: "exact file" pointed at one right source, and the no-template sentence framed the example as the floor.
- floor: not run
- baseline: PASS 2026-11-06 scoped (Sonnet 5.5), soft: names each part's own doc, keeps every part, cites the sentence; writes `nds-sideinfo nds-top`, a form the Variants allow. Rig pending: any rig that starts from an example.
