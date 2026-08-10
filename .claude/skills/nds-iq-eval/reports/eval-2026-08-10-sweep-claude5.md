# Sweep — 2026-08-10 (Claude 5 family, post-S26-fix file)

- **Mode:** `sweep` (40 comprehension scenarios, one batch per model, three models in parallel)
- **Models (self-reported):** `Fable 5 (claude-fable-5)` / `Opus 5 (1M context) — claude-opus-5[1m]` / `Claude Sonnet 5, model ID: claude-sonnet-5`
- **File state:** `_includes/NDS-IQ.md` byte-identical to `last-evaluated.md` — same state as the 2026-08-10 full runs on Sonnet 4.6 and Opus 4.7, so all five same-day data points compare directly. NOTE: the release-prep sweep recorded in `scenarios.md`'s header (opus 37/40, fable 36/40, sonnet 34/40) ran on the PRE-S26-fix text; this sweep supersedes it as the 5-family baseline for the shipped file.
- **Runners:** three fresh `general-purpose` agents, model overrides, one parallel batch. Harness prompt carried scenario setup+prompt only (no rubrics, no slugs).

## Verdict

| Model | First-batch PASS | Divergences |
|---|---|---|
| fable 5 | **38/40** | S14, S39 (both soft compression) |
| opus 5 | **38/40** | S20, S36 (both soft compression) |
| sonnet 5 | **29/40** | S6, S25b, S31, S33 material + 7 soft |
| (same file) opus 4.7 | 31/40 | see `eval-2026-08-10-full-opus.md` |
| (same file) sonnet 4.6 | 22/40 | see `eval-2026-08-10-full-sonnet.md` |

**One CONFIRMED text finding (S31), one rubric defect (S33), rest is the known batch-flatten pattern.** Every scenario the 4.x runs fumbled — S6, S14, S25a, S28, S29, S35, S37 — at least two of the three 5-family models resolved cleanly, confirming those as agent noise, not text bugs.

## Findings

### 1. S31 — dev-suggested native element slips the catalog precondition. CONFIRMED.

Second occurrence of the exact failure mode the opus 4.7 report flagged as watch-worthy. Sonnet 5: "a native `<input type='date'>` field is fine … (or use Date Picker per catalog if Hijri/Gregorian matters — dev didn't say)" — native endorsed as the finished answer, Date Picker demoted to a conditional aside. It ran the catalog check correctly for the same prompt's toggle half (found Content Switcher) and even cited the precondition sentence. Opus 4.7 failed identically this morning; fable 5 and opus 5 both ran the check and rejected the native input.

- **File sentence** (`_includes/NDS-IQ.md:179`): "Before you hand-compose a control or fall back to a native element, run that catalog check — 'NDS has no X' is a claim you may only make after it."
- **Why it's a text gap:** the trigger clause does name native fallback, but the quotable rule at the end binds only the negative claim. When the DEV proposes the native element ("I assume we just use a normal date input"), mid-tier models don't parse accepting it as "falling back" — they apply the check to the "NDS has nothing" half and skip it for the endorsement half. Two occurrences, two model generations, mid tier only, strong tiers clean = capability lean.
- **Proposed minimal fix** (extends the existing sentence, no new rule): append `A dev's own "just use a native X" gets the same check before you accept it.`
- **Mechanics of applying:** v7 is published, so this first post-publish edit also bumps the revision counter to v8 in its three copies (include heading, `_includes/nds-ai-instructions.md` pointer, plan-stamp sentence), then scoped re-eval on S31.
- **Status: DEFERRED** (token budget, ~2 days). Tracked in the Post-1.7.0 backlog.

### 2. S33 — rubric defect: the Filter re-surface route is correct; Content Switcher expectation is wrong.

Opus 5 and fable 5 independently kept the example's Filter engine and re-surfaced it as the legacy's always-visible toggles, both citing the same sentence; fable named the concrete mechanism `data-filter-type="switch"`.

- Verified against source: `_includes/NDS-IQ.md:156` — "the existing shape wins: take the example's structure and wiring, keep the legacy presentation" — governs, because the example HAS the filtering part (presented differently); the rule the rubric cites ("Parts your copy source lacks get their component from the catalog, never a substitute", L101) only covers parts the source LACKS (sort, load-more — which all three models correctly took from the catalog / custom case).
- Verified mechanism: `_js/nds-filter.js:75` — `data-filter-type="switch"` — "Toggle switches (OR logic, same as checkbox)". Always-visible toggle filter surfaces are a native Filter capability; no reshaping happens.
- Content Switcher toggles content sections; these toggles FILTER a list on the example's own wiring. The Filter route is the more faithful reading.
- **Fix at evolve:** rubric MUST accepts the Filter re-surface route (switch/radio surfaces on the example's wiring, legacy presentation kept); MUST NOT = keeping the dropmenu presentation (drops the legacy shape) OR hand-composing a toggle. Content Switcher demoted from expected answer.
- Sonnet 5 remains a REAL divergence under either reading: it kept the dropmenu and discarded the legacy presentation, quoting the porting principle's headline while skipping L156's bullet.

### 3. Sonnet-5 batch-flatten cluster — agent noise, solo re-probe before any grading.

- **S6** — answered `NDS.Init.refresh(container)` where the forms banner names `NDS.Forms.initializeContainer(el)`; banner not opened (same signature as sonnet 4.6 / opus 4.7 this morning; fable 5 clean, opus 5 named it).
- **S25b** — did not connect the 1.6.0 template to the floor; declared UNDEFINED and proposed source-dredge + `NDS-REPORT.md`. Sonnet 4.6 solo-PASSed the same part today (quoted the floor sentence), so the text is proven followable at this tier solo.
- Softs: S2 (step 4 unnamed), S14 (nested `criteria.filters.*` shape unnamed — also fable's soft), S17 (1.8.0 delta unreported), S20 (prior-NDS split unnamed — also opus 5's soft), S36 (widths/pre-build advisory/difference classification), S39 (picked `data-copy` literal variant over `data-copy-target`), S41 (read trigger not named as the mechanism).

## Scoreboard

| # | fable 5 | opus 5 | sonnet 5 | Note |
|---|---|---|---|---|
| S1 | PASS | PASS | PASS | All three: floor = prerequisite, blocked-state plan deliverable |
| S2 | PASS | PASS | soft | sonnet: step 4 passes unnamed |
| S3 | PASS | PASS | PASS | |
| S4 | PASS | PASS | PASS | |
| S5 | PASS | PASS | PASS | Exception sentence quoted by all three |
| S6 | PASS | PASS | DIVERGE | sonnet: `Init.refresh` for `initializeContainer`; opus led with refresh but named it |
| S7 | PASS | PASS | PASS | |
| S8 | PASS | PASS | PASS | |
| S9 | PASS | PASS | PASS | |
| S10 | PASS | PASS | PASS | |
| S11 | PASS | PASS | PASS | |
| S12 | PASS | PASS | PASS | Two-step floor held on all three |
| S13 | PASS | PASS | PASS | |
| S14 | soft | PASS | soft | opus: all seven wirings exact; fable/sonnet: nested criteria shape unnamed |
| S15 | PASS | PASS | PASS | |
| S16 | PASS | PASS | PASS | |
| S17 | PASS | PASS | soft | sonnet: 1.8.0 delta unreported |
| S18 | PASS | PASS | PASS | |
| S19 | PASS | PASS | PASS | |
| S20 | PASS | soft | soft | fable alone named the stray runtime's pages taking the prior-NDS split |
| S21 | PASS | PASS | PASS | |
| S22 | PASS | PASS | PASS | |
| S23 | PASS | PASS | PASS | |
| S24 | PASS | PASS | PASS | |
| S25a | PASS | PASS | PASS | Exact event + method on all three |
| S25b | PASS | PASS | DIVERGE | sonnet: floor unconnected, declared UNDEFINED |
| S26 | PASS | PASS | PASS | Post-fix text holds on all three |
| S28 | PASS | PASS | PASS | Manage Records + server-driven + `nds-full-width` on all three |
| S29 | PASS | PASS | PASS | All three routed to `forms.md` (both 4.x guessed `custom-select.md`) |
| S30 | PASS | PASS | PASS | |
| S31 | PASS | PASS | **DIVERGE** | Finding 1 — native endorsed; 2nd occurrence after opus 4.7 |
| S32 | PASS | PASS | PASS | |
| S33 | PASS* | PASS* | DIVERGE | *Filter re-surface route, correct per L156 — Finding 2 rubric fix; sonnet kept dropmenu |
| S34 | PASS | PASS | PASS | |
| S35 | PASS | PASS | PASS | Both 4.x diverged here; all three 5s clean |
| S36 | PASS | soft | soft | opus/sonnet: pre-build advisory + difference classification compressed |
| S37 | PASS | PASS | PASS | `NDS.Init.refresh(container)` exact on all three (both 4.x said `NDS.refresh()`) |
| S38 | PASS | PASS | PASS | |
| S39 | soft | PASS | soft | fable: variant unnamed; sonnet: wrong variant (`data-copy` literal) |
| S40 | PASS | PASS | PASS | |
| S41 | PASS | PASS | soft | sonnet: read trigger not named as the mechanism |

## Resolution

No file edits this session (token budget; deferred ~2 days). Queued in the Post-1.7.0 backlog (`this-is-planning-and-misty-gem.md`) and for the next `evolve`:

1. **S31 text fix** + v8 counter bump (three copies) + scoped re-eval. The one CONFIRMED finding.
2. **S33 rubric fix** (skill file, not rules text).
3. **Baseline updates** for all five 2026-08-10 same-file runs: this sweep's three results, plus the 4.6/4.7 full-run notes already listed in their reports' "Baselines to update" sections (S14/S25/S28 solo re-probes).

Standing lesson holds: full-mode batches flatten sonnet-tier tool effort (routes named, reads skipped); solo re-probe before grading any sonnet-tier batch soft as a finding. New lesson: a divergence shared by BOTH strong tiers citing the same sentence points at the rubric or the text, not the models — S33 proved the rubric wrong via a real mechanism (`data-filter-type="switch"`) the rubric's author didn't know existed.
