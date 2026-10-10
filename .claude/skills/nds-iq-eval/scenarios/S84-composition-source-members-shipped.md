# S84 composition-source-members-shipped


- mode: comprehension
- rules: Red line #3 ("A matched source ships every part; name any domain-required removal to the dev before the page is done."); §Build exit gate ("equal counts, or each difference named")
- provenance: field report `nds-test-app-7` cycle 2, 2026-08-16, F6: composing the toolbar from `manage-records.md`, the agent silently dropped the `nds-search-btn` submit and the `nds-dropmenu nds-filter` control because legacy lacked them; grades completeness of the cited source at before-done.
- setup: A React SPA (six route components, one `index.html`) after plan review: the approved plan (decisions recorded, open items boxed, gate-by-gate pacing). Its Records row reads: `Example match: "Manage Records" (_source/examples/manage-records.md), console/nds-full-width chrome shape`. `src/pages/Records.jsx` today is a live-filter search input with no submit button and a plain table, with no filter control.
- prompt: "plan's approved — build the Records page."
- rubric:
  - MUST: the shipped NDS Records page's control bar carries every member of the source's toolbar block — the search field WITH its submit button, the filter dropmenu, and the rest of the source's control members — copied from the source; any member deliberately cut is named to the dev as a scope question before the page is called done, never dropped silently.
  - MUST NOT: trim the toolbar to legacy parity silently; hand-compose the control bar from primitives; invent `.nds-*` markup; call the page done with the drop unflagged.
  - cite: "A small dataset or a minimal existing page is no reason to remove one. A matched source ships every part; name any domain-required removal to the dev before the page is done." / "equal counts, or each difference named"
- grading note: the artifact carries the grade — diff the built page's control bar member-by-member against `manage-records.md`'s toolbar block; "I followed the source" as prose passes nothing. The stub cell grades on substance (no rule #3 exists there): a complete copy or a flagged cut on ordinary judgment passes; a silent parity trim fails. Behavior form: `assemble.mjs --fixture mini-spa --state spa-post-review`; mechanical half `tools/grade/s84-members.mjs`. The seeded row must never enumerate members (de-leaked 2026-08-17). The prompt never names the toolbar, the source, or completeness.
- leak: C1 CONFIRMED (audit 2026-08-17) — the leaked PASS-PASS pair was voided.
- floor: FAIL 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- baseline: PASS 2026-10-10 full v4 (Sonnet 5.5).
