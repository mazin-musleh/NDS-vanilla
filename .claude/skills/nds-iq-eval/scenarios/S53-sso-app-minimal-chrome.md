# S53 sso-app-minimal-chrome


- mode: comprehension
- rules: step 1's chrome-shape mapping (each page's row records full / console / minimal, matched through `use_when`; one app may carry several); the §Build intro + master-layout policy (build each shape the plan names once, then its pages; copy the full `<body>` from a built page whose chrome matches the recorded shape — what the shape's page lacks stays out, without asking)
- provenance: Field triage 2026-08-12, R12 + R13 (Report C, SSO app): the adoption order had no skip clause, so the agent asked the dev to choose chrome. Rubric is read-dependent: grade scoped or solo only.
- setup: First install into an SSO / auth-only ASP.NET app; both anchor paths set, `NDS_ROOT` current on disk. The whole app is sign-in, OTP, forgot-password and change-password screens. No public site, no dashboard, no marketing pages.
- prompt: "plan the UI for these screens."
- rubric:
  - MUST: reach `NDS_ROOT/_source/examples/sign-in.md` — either route counts, the Adoption order paragraph's own pointer or a `use_when` match in `examples.yml`; record the minimal chrome shape on the plan rows; build the head and the master layout from the minimal shape's built page, adding no topbar, mainnav, footer or hero it does not carry, without asking; take the markup from `NDS_ROOT/_source/examples/sign-in.md`, its built twin as the visual spec.
  - MUST NOT: hand the dev a full-vs-minimal-vs-hybrid chrome question; build a topbar, mainnav or footer these pages have no use for; read the chrome walk as a mandate to add chrome the shape lacks; match the catalog on entry titles.
  - NOT under test: catalog routing. The v0.9 Adoption order paragraph names `sign-in.md` outright, so a runner quotes the entry instead of finding it — the known cost of a worked example living in the rules file (2026-08-08 note at the top), accepted here because routing the consumer straight there is the whole point of the R13 fix. `use_when` routing stays covered by S28, S29 and S46. What this scenario guards is the chrome-shape skip and the absent decision matrix.
  - cite: the master-layout policy's "what the shape's page lacks stays out, without asking" / "match the request against `use_when`, never against titles"
- floor: FAIL 2026-08-14 (Claude Sonnet 5), the rule is doing the work.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5): no chrome question raised, nothing the shape lacks built.
