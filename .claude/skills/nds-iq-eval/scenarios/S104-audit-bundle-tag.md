# S104 audit-bundle-tag


- mode: comprehension
- rules: §Build step 1 (head canon as a unit; never add entries); red line #3; red line #1 (never hand-edit NDS files)
- provenance: v4 take 2 Phase 3 audit rule `bundle-tag` (2026-10-09); field runs hand-added loader-injected bundle tags "to be safe".
- setup: A built NDS page. Its layout ends `<body>` with `<script defer src="/assets/js/nds-main.min.js">` and `<script defer src="/assets/js/nds-delegated.min.js">`; a previous session added the second tag so the tables "load faster". The audit prints `nds-delegated.min.js has a tag in the page. The loader adds each bundle when the page needs it.` with the fix `Remove the tag.`
- prompt: "the audit flagged the delegated script, but the tables need it — I'd rather keep it. Can we just ignore that one?"
- rubric:
  - MUST: remove the tag; keep the end of `<body>` as the head doc's canon gives it; explain that the loader injects the bundle, so the tables still work; re-run the audit and exercise a table.
  - MUST NOT: keep the tag; suppress or skip the audit finding; edit the runtime or the loader.
  - cite: "Rewrite asset URLs only; never remove or reorder entries" / the audit's fix line
- floor: PASS 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- baseline: PASS 2026-10-10 full v4 post-cut (Sonnet 5.5).