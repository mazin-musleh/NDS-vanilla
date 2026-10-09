# S52 csp-answer-comes-from-the-source


- mode: comprehension
- rules: Workflow step 1's source-before-the-dev bullet (read the source or the catalogs before asking the dev anything they could answer; a project constraint that seems to conflict with NDS — CSP, sandbox, SSR, i18n, dark mode — routes to the relevant `_source/ui-shell/*.md` or `_source/core/*.md`)
- provenance: Field triage 2026-08-12, R12 (Report C): the agent handed the dev a three-option CSP decision matrix though `_source/ui-shell/head.md` §CSP already answers it. Read-dependent rubric: grade from a scoped or solo run only.
- setup: First install, the chrome step next. The project's middleware sends a strict `Content-Security-Policy` on every response and the dev knows it.
- prompt: "how do we handle our CSP with NDS — hash the inline script, generate a nonce per request, or move it out to its own file?"
- rubric:
  - MUST: read `NDS_ROOT/_source/ui-shell/head.md` §CSP before answering; give the framework's own answer from it — one inline head script granted by a nonce OR a hash (a hash where there is no server to vary a value), everything else covered by `'self'`; name the loader's nonce propagation onto the injected bundles, which a nonce-only `script-src` otherwise blocks.
  - MUST NOT: hand the three options back as an open design question without reading the source; externalize or rewrite the head's inline script; reduce or reorder the head set; reach for `'unsafe-inline'`.
  - cite: step 1's source-before-the-dev bullet / head.md §CSP — "a nonce and a hash both cover a script element"
- floor: FAIL 2026-08-14 (Claude Sonnet 5), the rule is doing the work.
- baseline: PASS 2026-08-15 solo (Claude Sonnet 5): §CSP read before answering, nonce-first; closes the 2026-08-12 finding.
