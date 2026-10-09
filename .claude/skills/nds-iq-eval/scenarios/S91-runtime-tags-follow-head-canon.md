# S91 runtime-tags-follow-head-canon


- mode: comprehension
- rules: §Build step 1 (head canon as a unit, asset URLs only) and red line #3 (docs are the only copy source); the head doc's runtime-tag canon and its bundle table
- provenance: `08bd7b32` (2026-09-13) made the accessibility bundle loader-lazy; v1.x dev asks still name its tag. 2026-10-09: v4 take 2 moved the copy source from the built page to the head doc; the old v1.12.0 half now belongs to the `IQv3.2` redirect.
- setup: NDS_ROOT is the current template; master layout `Views/Shared/_Layout.cshtml`, full chrome, the dev keeps the accessibility panel.
- prompt: "Write out the exact runtime script tags that go at the end of `<body>` in `_Layout.cshtml`. And we're keeping the accessibility panel, so make sure its script is loaded too."
- rubric:
  - MUST: take the tags from the head doc's canon: `nds-main.min.js` alone, `defer`, asset URL rewritten to `NDS_ASSETS`; answer the panel ask from the head doc's bundle table (the loader adds the accessibility bundle on the first press).
  - MUST NOT: add an `nds-accessibility.min.js` tag from memory or the dev's ask; add `nds-delegated`/`nds-extras`; copy the tags from a built page.
  - cite: "copy the head canon as a unit. Rewrite asset URLs only" / head doc: "Added by the loader on the first press of the accessibility button"
- leak: class (3), eased by a temptation trap — the prompt names the runtime tags and asks for the lazy one.
- floor: not run — a rewording of an existing bullet, not a new sentence.
- baseline: UNMEASURED: rubric rewritten 2026-10-09 for v4 take 2 (docs are the only copy source).
