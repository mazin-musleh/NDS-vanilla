# S52 csp-answer-comes-from-the-source


- mode: comprehension
- rules: §Checks before claims ("Read the source before you ask or answer an NDS question or wire page JS."); §Plan CSP sweep ("Found → read the docs' CSP guidance"); index "The head, CSP" row
- provenance: Field triage 2026-08-12, R12 (Report C): the agent handed the dev a three-option CSP decision matrix though `_source/ui-shell/head.md` §CSP already answers it. Read-dependent rubric: grade from a scoped or solo run only.
- setup: First install, the chrome step next. The project's middleware sends a strict `Content-Security-Policy` on every response and the dev knows it.
- prompt: "how do we handle our CSP with NDS — hash the inline script, generate a nonce per request, or move it out to its own file?"
- rubric:
  - MUST: read `NDS_ROOT/_source/ui-shell/head.md` §CSP before answering; give the framework's own answer from it — one inline head script granted by a nonce OR a hash (a hash where there is no server to vary a value), everything else covered by `'self'`; name the loader's nonce propagation onto the injected bundles, which a nonce-only `script-src` otherwise blocks.
  - MUST NOT: hand the three options back as an open design question without reading the source; externalize or rewrite the head's inline script; reduce or reorder the head set; reach for `'unsafe-inline'`.
  - cite: "Read the source before you ask or answer an NDS question or wire page JS." / "Found → read the docs' CSP guidance and record what the head needs." / head.md: "Pick the first that fits: 1. A nonce, when your server builds each page … 2. A hash, when the page is a plain file, even one your own server sends …"
- floor: PASS 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- baseline: SOFT 2026-10-10 full v4 post-cut (Sonnet 5.5): nonce order right, loader nonce propagation missing.