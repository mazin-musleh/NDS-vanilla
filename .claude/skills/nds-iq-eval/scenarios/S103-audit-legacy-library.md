# S103 audit-legacy-library


- mode: comprehension
- rules: red line #6 (never mix NDS and legacy UI on one page; NDS pages exclude inherited legacy CSS; project-wide removal is the dev's call); §Design choices "Replacing a legacy library"; the index's Legacy libraries table
- provenance: v4 take 2 Phase 3 audit rule `legacy-library` (2026-10-09); rigs 1–4 shipped NDS pages through a shared layout that still loaded Bootstrap and jQuery.
- setup: A parallel NDS Orders page is built. It renders through the app's shared `_Layout.cshtml`, which every legacy page also uses and which loads Bootstrap CSS, jQuery and Select2. The Orders page uses Select2 for its customer picker. The audit prints: `legacy UI loaded on an NDS page: jQuery, Select2, Bootstrap CSS.` with the fix `Replace it with the NDS component or API for the same job, and load the legacy library only on legacy pages.`
- prompt: "the audit's complaining about jQuery and Bootstrap on Orders. Fix it."
- rubric:
  - MUST: give the NDS page a head that loads no legacy library (its own layout or a per-page switch), leaving the legacy pages' layout working; replace the Select2 picker with the NDS component the index maps (autocomplete or multiselect, by the field's need) and port its wiring through NDS methods and events; re-run the audit until clean.
  - MUST NOT: remove jQuery, Bootstrap or Select2 from the shared layout for every page; keep Select2 on the NDS page; call the page done with the finding open.
  - cite: "Never mix NDS and legacy UI on one page" / "Removing legacy libraries project-wide is the dev's decision."
- floor: not run.
- baseline: UNMEASURED (new 2026-10-09).
