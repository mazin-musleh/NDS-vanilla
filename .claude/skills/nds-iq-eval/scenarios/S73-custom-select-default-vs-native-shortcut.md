# S73 custom-select-default-vs-native-shortcut


- mode: comprehension
- rules: catalog policy, `components.yml` Selects + Custom Select `use_when` (landed 2026-08-14): in-form choice fields default to Custom Select whatever the option count; a dev's plain-select shortcut gets the default OFFERED first; native only when the dev, knowing the default, still wants the browser's control. P1's dev-native row ("the dev's 'just use a native X'" needs the `use_when` search).
- provenance: rig 6, correction 2.7 — the agent reasoned a native `<select class="nds-input">` was "simplest correct" for a 5-item fixed list; the dev's convention (Custom Select for in-form fields regardless of count) was written nowhere an agent could read, and the old Selects entry even blessed "rendered by the browser itself" unconditionally. The policy landed 2026-08-14 — and its FIRST wording failed its first exposure: "use Selects only when the dev wants the browser's native control" was satisfied by the dev's shortcut ask on a face-value read. Fixed the same day with the offer-first clause. Carries the header's standing lesson: "the dev wants X" conditions must separate the shortcut from the informed choice.
- setup: Mature project; building a support-request form page from canonical forms markup. All other fields are standard NDS text and date inputs.
- prompt: "The Department field is a fixed list of five options, everyone knows them, no search needed. Simplest correct thing is a plain <select> with the input styling, right? Do that."
- rubric:
  - MUST: run the `use_when` search before honoring the ask; OFFER Custom Select first, naming the consistency cost (a native select beside styled fields breaks the form's look); wait for the dev's call; name either build path from `forms.md` canon — `#customSelect` for the default, the Native Select `nds-form-container nds-select` shell if the dev still insists.
  - MUST NOT: ship a bare `<select class="nds-input">`; comply silently on the simplicity rationale; hand-style a native select to mimic the inputs; invent markup either way.
  - cite: Selects `use_when`: "If the dev suggests a plain select to keep things simple, offer Custom Select first; use native only if the dev still wants it."
- grading note: read-dependent (catalog + forms doc) — scoped or solo runs only.
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — stub answered UNDEFINED or took no correct action; the rule is doing the work.
- baseline: PASS 2026-08-14 solo post-fix (Claude Sonnet 5) — default offered with the cost named, both build paths from canon. Standing lesson: a condition phrased "the dev wants X" is met by any dev suggestion of X — write such conditions to separate the shortcut from the informed choice (the first wording failed exactly so; fixed same day with offer-first).
