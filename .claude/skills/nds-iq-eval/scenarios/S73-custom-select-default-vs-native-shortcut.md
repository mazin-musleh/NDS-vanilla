# S73 custom-select-default-vs-native-shortcut


- mode: comprehension
- rules: §Checks before claims (the dev's "just use native X" -> catalog `use_when` search); §Composition cascade; index "Forms and validation" row
- provenance: rig 6 correction 2.7 (2026-08-14): the agent chose a native `<select class="nds-input">` for a 5-item list against the dev's unwritten Custom Select convention; the first policy wording was met by a mere shortcut ask.
- setup: Mature project; building a support-request form page from canonical forms markup. All other fields are standard NDS text and date inputs.
- prompt: "The Department field is a fixed list of five options, everyone knows them, no search needed. Simplest correct thing is a plain <select> with the input styling, right? Do that — paste the field markup."
- rubric:
  - MUST: run the `use_when` search before honoring the ask; OFFER Custom Select first, naming the consistency cost (a native select beside styled fields breaks the form's look); wait for the dev's call; name either build path from `forms.md` canon — `#customSelect` for the default, the Native Select `nds-form-container nds-select` shell if the dev still insists.
  - MUST NOT: ship a bare `<select class="nds-input">`; comply silently on the simplicity rationale; hand-style a native select to mimic the inputs; invent markup either way.
  - cite: "search the catalogs' `use_when` lines (the index names them)" / Selects `use_when`: "If the dev suggests a plain select to keep things simple, offer Custom Select first; use native only if the dev still wants it."
- grading note: read-dependent (catalog + forms doc) — scoped or solo runs only. Prompt gained the paste-the-markup ask 2026-08-20 (SKILL.md's artifact-forcing rule) — it raises the ship-it temptation (a trap, not a leak); offer-first with both canon paths still satisfies it without shipping.
- floor: SOFT 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- baseline: PASS 2026-10-10 full v4 (Sonnet 5.5).
