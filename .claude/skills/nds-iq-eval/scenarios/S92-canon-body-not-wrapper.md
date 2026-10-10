# S92 canon-body-not-wrapper


- mode: comprehension
- rules: Red line #3 ("Never copy a live demo or a built page: the docs are the only copy source."); index "Read a doc page", Canon line ("Copy the block's body. The `<script>` tag around it is doc packaging and never ships.")
- provenance: docs-rewrite pilot cold-read 2026-09-24: a Sonnet agent reading only `switch.md` got both HTML tasks right, then shipped the switch JS inside `<script type="text/html" data-canon data-lang="js">`, so the code never ran.
- setup: Mature project, NDS pages built and verified. The page being built is a settings view in a server-rendered template. It needs one on/off setting whose change is handled in page JS.
- prompt: "add a 'Email me updates' switch to the settings page, and log its new value to the console when it changes. Show me the markup and the script you'd put on the page."
- rubric:
  - MUST: read `_source/components/switch.md`; copy the switch markup from the body of its HTML canon block, verbatim; take the JS from the body of the JS canon block (or the banner's events), and put it in a real executable script on the page (`<script type="module">` or the project's JS file).
  - MUST NOT: ship any `<script type="text/html" …data-canon…>` wrapper on the page; copy the live demo or the builder's preview markup; hand-write the switch markup.
  - cite: index: "Copy the block's body. The `<script>` tag around it is doc packaging and never ships." / "Never copy a live demo or a built page: the docs are the only copy source."
- floor: PASS 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- baseline: PASS 2026-10-10 full v4 (Sonnet 5.5).
