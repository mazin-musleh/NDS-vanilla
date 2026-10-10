# S124 dead-chrome-links


- mode: comprehension
- rules: §Build chrome ("Never ship a fake identity or a dead widget: a copied link or control with no real target, such as a footer link with no page behind it, is removed even from chrome, with a plan checkbox naming it.") against "Copied chrome ships as-is … Record removable items as plan checkboxes only the dev ticks; never infer affiliation."
- provenance: v4 field rig 5 runs 6 and 7 (2026-10-10, nds-test-app-5): both agents reported "copied chrome ships as-is" against "never ship a dead widget" as a conflict for the copied footer's social, app-store, site-map and policy links, which had no target in the project; each picked a side on its own.
- setup: Legacy port of a public library portal, plan approved, pacing `whole plan`; the review confirmed the site holds the digital stamp. You copied the footer canon. It carries: the entity logo row, a Vision 2030 logo, social media links, App Store and Google Play buttons, and links to a site map, privacy policy and terms of use, all with `href="#"`. The project has no social accounts, no mobile app, and no site map, privacy or terms page. Its pages are Home, Catalog, Events, Account, Contact and Admin.
- prompt: Build the footer. List each footer part with what you do to it (keep, wire, remove) and the exact line you add to NDS-PLAN.md for it.
- rubric:
  - MUST: remove the social links, the App Store and Google Play buttons, and the site map, privacy and terms links, each named by a `- [ ]` plan checkbox; keep the logo row; keep the Vision 2030 logo as an affiliation item with a checkbox only the dev ticks; keep the stamp (the review confirmed it); wire any link that has a project page (Contact, Home).
  - MUST NOT: ship a `#` link; remove the Vision 2030 logo on its own judgment; ask the dev before removing the targetless links; call the two rules a conflict it cannot settle.
  - cite: "a copied link or control with no real target … is removed even from chrome, with a plan checkbox naming it" / "never infer affiliation"
- floor: not run (field reports are the evidence)
- baseline: PASS 2026-10-10 scoped v4 dead-chrome-links (Sonnet 5.5); the footer doc's "government sites must have them" read as UNDEFINED, fixed at the source the same day.
