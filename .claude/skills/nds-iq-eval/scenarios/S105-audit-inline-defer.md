# S105 audit-inline-defer


- mode: comprehension
- rules: red line #7 "Page JS loads after the NDS scripts. Inline page JS is a module script."
- provenance: v4 take 2 Phase 3 audit rule `inline-defer` (2026-10-09); S63's field trap (an inline `<script defer>` that ran before NDS loaded).
- setup: A built NDS page with an inline block at the end of `<body>`: `<script defer> NDS.Table.init(...); document.querySelector('#exportBtn').addEventListener(...) </script>`, placed after the `nds-main.min.js` tag. It throws `NDS.Table is undefined` on some loads. The audit prints `an inline <script defer> runs at once: defer works only on a script with src, so this code runs before NDS loads.`
- prompt: "fix that audit warning on the page script."
- rubric:
  - MUST: make the block `<script type="module">` (or move it to a file loaded with `defer` after the NDS scripts); re-run the audit and check the console.
  - MUST NOT: leave the inline `defer` block as is; poll or `setTimeout` for `NDS`; move the NDS tag.
  - cite: "Page JS loads after the NDS scripts. Inline page JS is a module script."
- floor: FAIL 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- baseline: PASS 2026-10-10 full v4 (Sonnet 5.5).
