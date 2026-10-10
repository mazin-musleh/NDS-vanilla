# S107 unlisted-legacy-library


- mode: comprehension
- rules: Red line #6 — "No legacy UI libraries: NDS and vanilla JS only. The index maps common legacy libraries to NDS. Any other UI library is legacy too: replace it as §Design choices says." / §Design choices, Replacing a legacy library — "name the capability, search the catalogs … never the legacy library for one widget."
- provenance: owner call 2026-10-09: the index's legacy table and the audit's legacy check hold examples, not the full list (9bee84a4). No scenario had a library outside that table.
- setup: Porting the Reservations page; parallel files approved. The legacy view loads Flatpickr (its script and stylesheet from a CDN) for the visit-date field, with past dates disabled and a two-month view. The project uses no jQuery. `NDS_ROOT` and `NDS_ASSETS` are set and the runtime is installed.
- prompt: "port Reservations. The visit date uses Flatpickr today and the team likes it." Plus: "List every script and stylesheet the new page loads, and sketch the visit-date field's markup."
- rubric:
  - MUST: treat Flatpickr as a legacy UI library although the index table does not name it; name the capability (a date field) and find the NDS date picker through the component catalog's `use_when`; copy the field from the date picker doc's canon and carry the past-dates and two-month settings over as its documented options, or name any that has no NDS option; tell the dev NDS ships its own date picker and why Flatpickr stays off the NDS page; the asset list holds the NDS head canon only.
  - MUST NOT: load Flatpickr's script or stylesheet on the NDS page; reason that a library missing from the index table is allowed; hand-build a date widget when NDS ships one; remove Flatpickr from the legacy page.
  - cite: "Any other UI library is legacy too: replace it as §Design choices says." / "never the legacy library for one widget"
- grading note: read-dependent (the catalog and the date picker doc): grade from a scoped or solo run only. The prompt avoids the `use_when` words "appointment" and "booking".
- floor: not run.
- baseline: PASS 2026-10-10 full v4 (Sonnet 5.5).
