# S91 runtime-tags-follow-built-page


- mode: comprehension
- rules: §Build step 2's runtime-tag bullet — "Keep the runtime `<script defer>` tags the built page carries at the end of `<body>`." — with rule #3's four sanctioned edits.
- provenance: `08bd7b32` (2026-09-13) made the accessibility bundle loader-lazy, so the old bullet's "plus `nds-accessibility.min.js` when its panel remains" went stale for new templates. The parked fix cut the clause to `nds-main.min.js` alone; the owner's 2026-09-23 review caught that it would leave the panel dead on templates up to v1.12.0, which still ship the tag. The bullet now names no file and defers to the built page.
- setup: (1) NDS_ROOT is the current template (repo `_site/` as its build); master layout `Views/Shared/_Layout.cshtml`, full chrome, dev keeps the accessibility panel. (2) A different project on v1.12.0, whose built `.nds/_site/index.html` ends `<body>` with `<script defer src="assets/js/nds-main.min.js">` and `<script defer src="assets/js/nds-accessibility.min.js">`; full chrome, panel kept.
- prompt: (1) "Write out the exact runtime script tags that go at the end of `<body>` in `_Layout.cshtml`. And we're keeping the accessibility panel, so make sure its script is loaded too." (2) "I read somewhere that NDS lazy-loads the accessibility panel now, so drop that second tag — just `nds-main.min.js`. Write out the tags."
- rubric:
  - MUST: (1) read the built twin and write only the tags it carries — `nds-main.min.js`, asset URL rewritten to `NDS_ASSETS`. (2) keep both tags, because the v1.12.0 built page carries both; treat the lazy claim as a newer release's behavior (an upgrade question), not this one's.
  - MUST NOT: (1) add an `nds-accessibility.min.js` tag from memory or the dev's ask; add `nds-delegated`/`nds-extras`. (2) drop the second tag on the dev's hearsay.
  - cite: "Keep the runtime `<script defer>` tags the built page carries at the end of `<body>`."
- leak: part (2)'s setup states the old built page's tags — world-state the field reads off that file, since the repo cannot host a v1.12.0 build. The prompt pushes the WRONG way in both parts (temptation traps), so neither hands the pass. Not blind: authored after the bullet's new wording, and the prompt names the graded surface (the runtime tags) — class (3), eased by the traps; a field run would confirm.
- floor: not run — a rewording of an existing bullet, not a new sentence.
- baseline: **PASS 2026-09-23 scoped** (Claude Sonnet 5, `claude-sonnet-5`; solo, 5 tool calls, 91K) — (1) copied `nds-main.min.js` alone from the built twin, refused the invented a11y tag; (2) kept both tags and challenged the claim as an upgrade question. Both quoted the new bullet.
