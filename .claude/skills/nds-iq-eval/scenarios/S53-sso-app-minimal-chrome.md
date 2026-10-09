# S53 sso-app-minimal-chrome


- mode: comprehension
- rules: step 1's chrome-shape mapping (each page's row records full / console / minimal, matched through `use_when`; one app may carry several); the §Build intro + master-layout policy (build each shape the plan names once, then its pages; copy the full `<body>` from a built page whose chrome matches the recorded shape — what the shape's page lacks stays out, without asking)
- provenance: Field triage 2026-08-12, R12 + R13 (Report C, SSO app): the adoption order had no skip clause, so the agent asked the dev to choose chrome. Rubric is read-dependent: grade scoped or solo only.
- setup: First install into an SSO / auth-only ASP.NET app; both anchor paths set, `NDS_ROOT` current on disk. The whole app is sign-in, OTP, forgot-password and change-password screens. No public site, no dashboard, no marketing pages.
- prompt: "plan the UI for these screens."
- rubric:
  - MUST: reach the sign-in example through a `use_when` match in the examples catalog; record the minimal chrome shape on the plan rows; build the head from the head canon and the body from the minimal shape's canon in the page layout doc, adding no topbar, mainnav, footer or hero it does not carry, without asking; take the page markup from the example's `.md`, its built page as the visual spec only.
  - MUST NOT: hand the dev a full-vs-minimal-vs-hybrid chrome question; build a topbar, mainnav or footer these pages have no use for; copy markup from a built page; match the catalog on entry titles.
  - cite: "Match by `use_when` across the template, example, and component catalogs, never by title" / "Copied chrome ships as-is"
- floor: FAIL 2026-08-14 (Claude Sonnet 5), the rule is doing the work.
- baseline: UNMEASURED: rubric rewritten 2026-10-09 for v4 take 2 (docs are the only copy source).
