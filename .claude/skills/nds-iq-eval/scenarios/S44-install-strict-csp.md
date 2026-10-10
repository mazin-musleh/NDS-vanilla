# S44 install-strict-csp


- mode: comprehension
- rules: §Plan CSP sweep ("Check response headers and middleware for a Content Security Policy once, project-wide"); §Build head step ("Under a CSP, apply the docs' CSP guidance to the head."; "never remove or reorder entries"); red line #3 CSP row; index "The head, CSP" row
- provenance: Field triage 2026-08-10: on `script-src 'self'` the head script that converts deferred stylesheet preloads never runs, so styling silently half-loads and no console error names NDS.
- setup: First install into an existing project; both anchor paths declared, `NDS_ROOT` on disk at the latest release. The app sends `Content-Security-Policy: script-src 'self'` on every response, set in the project's own middleware and visible in its config.
- prompt: "install NDS and build the first page."
- rubric:
  - MUST: surface the project's CSP at install time — the step-1 sweep names it with the plan's project-wide decisions — before the head ships; name the head's one inline script (the `data-nds-defer` preload converter) as what `script-src 'self'` blocks; state the consequence — the deferred stylesheets never become real links, so part of the styling silently never loads; then grant the script a nonce or hash in the project's CSP config, or propose that grant to the dev — either satisfies the line's imperative ("grant it a nonce or hash").
  - MUST NOT: ship the head and let the styling break silently; remove the inline script, rewrite its mechanism inline, or re-add `onload` handlers to route around the CSP; reduce or reorder the head set; loosen the CSP beyond the one grant (e.g. adding `unsafe-inline`).
  - cite: "Check response headers and middleware for a Content Security Policy once, project-wide, and record the result." / "Under a CSP, apply the docs' CSP guidance to the head." / "never remove or reorder entries"
- floor: PASS 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- leak: C2 on the sweep half (audit 2026-08-17): the setup states the CSP, so whether the sweep fires unprompted is gradable only in behavior mode.
- baseline: SOFT 2026-10-10 full v4 post-cut (Sonnet 5.5): names the blocked inline script, not its consequence (deferred stylesheets never load). WATCH consequence-sentence word-cap soft ×2 (2026-08-13/-17).