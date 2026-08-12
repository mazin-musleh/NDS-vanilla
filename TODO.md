# TODO — current cycle

Standing file: it always exists. At every release commit, remove the items that release shipped and carry the open ones forward. Never delete the file itself. This is the one open list.

Cleared at the 1.7.1 release (2026-08-12). That release shipped the whole v0.8 rules rework, the full 2026-08-10 field-triage batch (source fixes, rules sentences, docs, both banner gaps), and the eval-suite work that validated them — all of it detailed in `CHANGELOG.md` and in each scenario's baseline in `.claude/skills/nds-iq-eval/scenarios.md`. Nothing from that cycle is carried forward.

## Open

- [ ] **Baseline compaction in `scenarios.md` — targeted, boundary-sanctioned (queued 2026-08-12, post-1.7.1).** Per-scenario baselines never compact, so old arcs bury the current state (S1's is a small essay). Squash ONLY the pre-v0.8 history on the nine re-shaped/flipped scenarios — S1, S3, S4, S8, S17, S18, S25(b), S26, S47 — whose old numbers the header already declares "not comparable" (they measured the gated/opposite behavior). Each squashes to one summary sentence; KEEP: the latest result per model, standing do-not-repeat notes (e.g. S36's reverted re-order), and open watches (S1 upgrade verb, S36 `file://` rationale). Git keeps the full text. No behavior change, no rubric edits, no runs needed. Full-suite compaction (all 46) deliberately NOT chosen — riskier of losing a load-bearing nuance for little extra read-cost gain.
- [ ] **Review the 2026-08-12 field triage (six items from two consumer projects' upgrades).** Detail in the triage report.

## Standing decisions — do not re-propose without the named evidence

These are settled calls, kept so they are not re-litigated. Each names what would reopen it.

- **R2.6 — `NDS.request` "prefer" → mandate: REJECTED.** S34 tests exactly this and passed on all five 2026-08-10 runs (Sonnet 4.6, Opus 4.7, Fable/Opus/Sonnet 5). The current wording already produces the refusal. Reopen only on a field failure where an agent hand-rolled a request despite the rule.
- **R1.3c — canonical > minimum-diff tiebreaker: PARKED.** S30 + S16 passed 3/3 on 2026-08-10, no field failure named. Reopen on a real failure.
- **R2.7 / R2.8 — universal `refresh()` hooks and a destroy+create recipe: CLOSED.** The loader's owner/scanner split already covers in-container changes, and the components without a `refresh:` field are deliberate, not gaps (`_js/nds-loader.js:130-137` records the Tables decision explicitly). Reopen only with a specific component genuinely broken by `refresh()` — the abstract "coverage" framing came from misreading "no `refresh:` field = no participation".
- **R2.2 — server-driven manage-records example: DROPPED 2026-08-12, owner call.** `components/pagination.md` documents the server-driven mode with its container/item markers and cross-references `nds-empty`; `core/refresh.md` has a Server-Driven Lists section. Reopen only on a real integration failure where a dev could not wire a server-driven list from what ships, never on the abstract "there is no example" framing that produced it.
- **S36 paragraph re-order: DO NOT RE-ATTEMPT.** Moving the `file://` block inside the visual-pass paragraph was applied, re-run, and reverted — no improvement, and the run additionally stopped naming why `file://` is banned. The constraint was the answer word cap, not sentence shape; the scenario was split into parts instead and passes.
- **A release-notes vs CHANGELOG drift check: CLOSED, YAGNI.** `scripts/check-release-body.py` was built then reverted after review: one author, one session, monthly-ish releases, and a check nobody remembers to run shares the failure mode of the invariant it enforces. Reopen only on a real drift incident naming a released version.
- **Eval scenario numbering:** S1–S47 are written. **Next free is S48.**

## Watch list — not tasks, things a later run should notice

- **S1, upgrade verb.** The 2026-08-12 behavior run reported the version mismatch as "informational only, not acting on it". That is reporting, not the file's "report both versions and propose it". One run is thin, so the rubric moved to the file's verb and this stayed a watch. Firm the file's verb only if a later run repeats the stop-at-flagging.
- **S20 and S36 lesson, generalized.** When a soft repeats across model tiers, check for a tail-rider — a rule sitting behind a clause that reads as the sentence's ending. That was S20's actual defect, and it is the first thing to test before assuming batch noise.
