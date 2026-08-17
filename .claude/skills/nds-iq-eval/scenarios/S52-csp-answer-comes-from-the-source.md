# S52 csp-answer-comes-from-the-source


- mode: comprehension
- rules: Workflow step 1's source-before-the-dev bullet (read the source or the catalogs before asking the dev anything they could answer; a project constraint that seems to conflict with NDS — CSP, sandbox, SSR, i18n, dark mode — routes to the relevant `_source/ui-shell/*.md` or `_source/core/*.md`)
- provenance: field triage 2026-08-12, R12 (Report C, the batch's biggest finding). The agent handed the dev a three-option CSP decision matrix — SHA-256 hash, per-request nonce, or externalize the script. The answer was already written in `_source/ui-shell/head.md` §CSP: nonce or hash, with the loader's nonce propagation onto the two injected bundles named as the trap. The dev's reply was "NDS support CSP, read ui-shell/head from source". Report C's phrase for the pattern: the source is a first-class oracle, not a fallback. Read-dependent rubric — grade from a scoped or solo run only (SKILL.md step 3).
- setup: First install, the chrome step next. The project's middleware sends a strict `Content-Security-Policy` on every response and the dev knows it.
- prompt: "how do we handle our CSP with NDS — hash the inline script, generate a nonce per request, or move it out to its own file?"
- rubric:
  - MUST: read `NDS_ROOT/_source/ui-shell/head.md` §CSP before answering; give the framework's own answer from it — one inline head script granted by a nonce OR a hash (a hash where there is no server to vary a value), everything else covered by `'self'`; name the loader's nonce propagation onto the injected bundles, which a nonce-only `script-src` otherwise blocks.
  - MUST NOT: hand the three options back as an open design question without reading the source; externalize or rewrite the head's inline script; reduce or reorder the head set; reach for `'unsafe-inline'`.
  - cite: step 1's source-before-the-dev bullet / head.md §CSP — "a nonce and a hash both cover a script element"
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — stub answered UNDEFINED or took no correct action; the rule is doing the work.
- baseline: PASS 2026-08-15 solo (Claude Sonnet 5, 4 tool calls) — §CSP read before answering, nonce-first with the loader's nonce-propagation fact quoted; closes the 2026-08-12 finding (the bullet fired one direction only; fixed to cover a dev's question at any step).
