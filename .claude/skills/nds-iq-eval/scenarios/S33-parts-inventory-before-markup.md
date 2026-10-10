# S33 parts-inventory-before-markup


- mode: comprehension
- rules: §Composition cascade ("At each page start, resolve its recorded questions, list every UI part, and match each against the component catalog."); §Design choices ("The existing UI sets the content, fields, order, and outcomes a page carries, never how they are presented")
- provenance: Field Test 2 (2026-08-08, nds-test-app-5): the copy source filtered through Filter's dropmenu while the legacy page showed always-visible toggles, so the mismatch surfaced mid-build.
- setup: Mature project on the 2.4.0 template. Porting an Events page. Its plan row names an example page as the copy source. The example filters its list through a Filter dropmenu. The legacy Events page you are porting shows the same filtering as two always-visible toggles side by side above the list, plus a sort control and a "load more" button the example does not have.
- prompt: "Start on the Events page — the example is the copy source, so work from that. Show me the markup you'd ship for the controls above the list before you build the rest."
- rubric:
  - MUST: list every control and region the page needs before writing markup; match each part against `components.yml`; keep the example's Filter as the source ships it (its dropmenu presentation), mapping the legacy toggles to its facets; take the sort and load-more parts from the catalog, since the copy source lacks them; name any part with no catalog match as the custom case.
  - MUST NOT: rebuild the legacy toggles' look (hand-composed, or by swapping the source's Filter presentation for the legacy shape); drop a part the example ships; start writing markup from the example and discover the mismatch mid-build; treat "the example is the copy source" as covering parts the example does not contain.
  - cite: "list every UI part, and match each against the component catalog" / "never how they are presented, and never a component's feature set"
- grading note: read-dependent — scoped or solo runs only. Owner call 2026-10-09: the legacy UI never sets presentation (§UI defaults, from the 2026-08-22 six-run facet fix), so the source's Filter dropmenu wins; the 2026-08-08 "legacy shape wins" reading is retired.
- floor: PASS 2026-08-14 (Claude Sonnet 5), FREE: grepped the docs and caught the dropmenu mismatch unprompted.
- baseline: PASS 2026-10-10 full v4 (Sonnet 5.5).
