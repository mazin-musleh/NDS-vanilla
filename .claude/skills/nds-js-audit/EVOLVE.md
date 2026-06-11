# nds-js-audit — Phase 7: EVOLVE (read on demand)

Loaded from SKILL.md at the end of a run that logged Gap / SKIP / Persona-drift observations, or any full-tree run (citation hygiene). SKILL.md's contracts govern here — suggest-only is Auto-drive pause point 4; numbered-reply discipline applies to the `evolve` offer.

---

## Phase 7: EVOLVE (suggest-only — candidates at run end, applied on explicit `evolve`)

**The analysis runs automatically; the writes do not.** At the end of any run that surfaced concrete "Gaps observed", "Dead-rule candidates", or "Persona drift" entries — OR any full-tree run, which always reconciles persona citation hygiene — turn them into fully-drafted edit candidates and append a `## Catalog evolved — candidates` block to the report. **Write NOTHING to the skill files yet.** The user applies all candidates with `evolve`, one with `evolve <RULE-or-entry>`, or ignores them (an unapplied candidate costs nothing — it re-surfaces on a future run if still true). This is Auto-drive pause point 4: audit sessions run concurrently and share `.claude/skills/nds-js-audit/`, so a mid-run write from one session clobbers a parallel session's in-flight read of the same catalog — the explicit go is the write gate.

**Two kinds of candidate — different bars.** Keep them separate; blurring them is the failure mode (a persona that rewrites its *opinions* every run becomes noise):
- **Rule edits** (canonical revision, carve-out, new entry; new/narrowed/deleted catalog rule) — judgments. Become candidates only when they clear the quality bars below.
- **Bookkeeping edits** (expiring a resolved motivating finding, healing a drifted symbol-anchored citation) — measured facts from the scan the run already performed. **No quality bar** — they become candidates whenever the recorded fact is stale, and apply with the rest on the `evolve` go. Reported under a `Bookkeeping reconciled` sub-heading so the change is never silent.

**Three rule sources, two target surfaces:**
- **Gaps observed** → the matching `RULES-{group}.md` (new catalog rule, or extension of an existing rule).
- **Dead-rule candidates** → the matching `RULES-{group}.md` (narrow / delete an existing catalog rule).
- **Persona drift** → PERSONA.md (revise a canonical, add a carve-out, add a new entry). Surfaced when a JSD-15 finding's outcome is "revise the canonical" rather than "migrate the file."

**Bookkeeping source:** the JSD-15 pass itself — whatever it observes about cited examples (resolved motivating findings, moved or vanished symbols) feeds the citation-hygiene edits below.

**Quality bars (filter what becomes a candidate — sub-bar observations stay recorded Gap/Dead-rule notes for a future run):**
- **ADD rule** — requires a motivating finding with ≥2 sites or meaningful body overlap. A one-off shape stays a Gap observation, not a new rule.
- **NARROW / SEVERITY** — requires a specific cited reason (e.g. N consecutive skips in a named file).
- **DELETE rule** — requires the dead-rule evidence bar: zero true-positive matches across the session's emitted/saved runs. Rare by design; when unproven, narrow rather than delete.

A run with only hand-wavy or single-instance observations surfaces no candidates — it records them in the report's Gaps/Dead-rule sections for a future run to confirm, and omits the `## Catalog evolved — candidates` block.

### What each candidate records

For every candidate, record the exact proposed change in the `## Catalog evolved — candidates` block using these shapes (the same record becomes the applied diff after `evolve`):

```
Edit: ADD rule
  Group: JSP
  ID: JSP-11 (next free ID in group)
  Severity: MEDIUM
  Detect: IntersectionObserver created with `root: null` via a locally-pooled helper — duplicates NDS.onIntersect's viewport pool
  Fix: Route through NDS.onIntersect with matching threshold/rootMargin
  Motivating finding: _js/nds-foo.js:88 and _js/nds-bar.js:142 both wrap viewport IntersectionObservers in a local helper
```

```
Edit: NARROW rule
  ID: JSD-08
  Change: Exempt methods that run at module top level (before the loader lifecycle fires)
  Reason: 5 consecutive skips in _js/nds-foo.js — the guards protect bootstrap code that genuinely runs before nds-loader.js. Keeping the rule as-is trains the skill to ignore JSD-08 wholesale.
```

```
Edit: ADD rule
  Group: JSA
  ID: JSA-17 (next free ID in group)
  Severity: LOW
  Mode: deep-read
  Detect: Modules whose top-level state (module-scope `let`/`const` declarations) exceeds 20 mutable bindings, indicating module-level state machine that should be encapsulated in a singleton or class
  Fix: Encapsulate module state in an object literal or class instance; expose only the documented API surface; private state behind a closure or `#private` field
  Motivating finding: _js/nds-foo.js has 27 module-scope `let` declarations driving cross-method behavior — readers can't tell which functions read or mutate which variables without a top-to-bottom file scan
```

```
Edit: DELETE rule
  ID: (example) JSD-06
  Reason: Zero true-positive matches across the session's runs; read-after-write pattern is already caught by the browser devtools performance panel and does not warrant its own rule.
```

(JSA proposals always include the `Mode:` field — `greppable` or `deep-read` — since JSA rules carry mode-aware coverage that JSP/JSD/JSS don't. JSP/JSD/JSS proposals omit the Mode field.)

### Application (only after an explicit `evolve` / `evolve <RULE>` reply)

**Concurrent-session merge step first.** Re-read each target file immediately before editing — a parallel audit session may have evolved it since this run's Phase 2 read. If it changed, MERGE: keep the other session's edits and weave this run's candidate in alongside (never revert or clobber them — they are not this run's over-reach to undo); on a direct collision (both sessions touched the same rule row or persona entry), reconcile both findings into one row. Same discipline applies to a mid-edit "modified since read" error.

Then, for each approved edit, modify the appropriate file under `.claude/skills/nds-js-audit/` and only that file:

**Catalog edits → the matching `RULES-{group}.md` group file** (`RULES-JSP.md` / `RULES-JSD.md` / `RULES-JSS.md` / `RULES-JSA.md`), NOT SKILL.md — SKILL.md holds only cross-references (the Phase 1 / Phase 4 mode banners), updated alongside as noted:
- **ADD**: insert the new rule in the correct group file's table, keeping IDs sequential. JSA additions also populate the `Mode` column (`greppable` or `deep-read`) in `RULES-JSA.md`; if the new rule is deep-read, also add its ID to the JSA deep-read banner in Phase 4 and the "JSA deep-read rules in full-tree mode" section in Phase 1 (both in SKILL.md).
- **NARROW / REFINE**: edit the "What to detect" column in the group file, not the rule's identity. Do not change its ID. For JSA rules, also update the `Mode` column if the refinement changes detection method.
- **DELETE**: remove the row and renumber the remaining rules in the group within its `RULES-{group}.md`. If JSD-06 is deleted, JSD-07 becomes JSD-06 across `RULES-JSD.md` (and update the Phase 4 example references in SKILL.md accordingly). For JSA deletions, also remove the ID from the deep-read banner in Phase 4 and the "JSA deep-read rules in full-tree mode" section in Phase 1 (both in SKILL.md) if it appeared there.
- **SEVERITY CHANGE**: update the Severity column only in the group file; do not touch detection or fix text.

**Persona rule edits → PERSONA.md (gated by the quality bars):**
- **REVISE CANONICAL**: edit the entry's "Canonical" field; update "Why (and rejected alternatives)" if the principle defense or rejected forms changed; touch "Audit behavior" to match the new canonical.
- **ADD CARVE-OUT**: append to the entry's "Carve-outs" list with the file:line citation that motivated it.
- **NEW ENTRY**: append a new entry to PERSONA.md using the four-field shape (Canonical, Why (and rejected alternatives), Carve-outs, Audit behavior), citing ≥1 motivating site by symbol. Renumber subsequent entries if added mid-document.

**Persona bookkeeping edits → PERSONA.md (no quality bar — citation hygiene only):**
- **EXPIRE RESOLVED FINDING**: when an entry's check finds zero divergent sites but the entry still carries a `Motivating finding:` pointer, rewrite it to `Resolved (was the motivating finding): … migrated to <canonical>`.
- **HEAL CITATION**: citations are **symbol-anchored** — the greppable identifier/token (function, field, attribute, comment text) is the authoritative anchor; the line number is a decaying hint. Grep the symbol: still present → rewrite the line hint; gone → the citation is expired (mark it `(citation expired <date> — <symbol> refactored away)` or resolve the motivating example), never trust the bare line.

After applying, append the diff to the report as the `## Catalog evolved (applied)` block (covering both files when both were touched):

```
## Catalog evolved (applied on your `evolve`)
- RULES-JSP.md added: JSP-12 "viewport IntersectionObserver duplication" (MEDIUM)
- RULES-JSD.md narrowed: JSD-08 now exempts module-top-level bootstrap
- PERSONA.md revised: entry 4 canonical changed from "NDS <Name>:" to "[NDS.<Name>]"
- PERSONA.md added carve-out: entry 1, secondary controllers for streaming responses
- Rejected (conflicts with CLAUDE.md): {proposal} — {one-line reason}
- No deletions this round

### Bookkeeping reconciled (no quality bar — measured facts)
- PERSONA.md entry 5: expired resolved findings (voice-input _installed→_initDone, swiper data-swiper-initialized→data-nds-swiper-initialized)
- PERSONA.md entry 1: healed citation (`fetchAbortController` moved; line hint updated)
- RULES-JSP.md JSP-02: healed exemplar citation (`NDS.onOutsideScroll` moved; line hint updated)

Revert via git if you change your mind — prefer reverting the specific hunks, not a blanket `git checkout -- .claude/skills/nds-js-audit/`, which would also wipe edits a parallel audit session may have landed. The next audit run uses the updated rules and canonicals.
```

### Citation hygiene (full-tree runs)

The full-tree JSD-15 pass observes every entry's cited examples as a byproduct of its checks. Two no-bar candidates follow — **expire resolved motivating findings** and **heal symbol-anchored citations** — using the exact shapes in "Persona bookkeeping edits" above (they apply to catalog-rule citations in `RULES-*.md` the same way). Record both under the `Bookkeeping reconciled` sub-heading; an expired citation in a **carve-out** additionally surfaces a carve-out DELETION candidate (see Guardrails).

Single-file runs see one file, not the corpus — they may still produce rule edits (a JSD-15 finding on that file) and may expire a resolved finding *only* when that one file is the sole site the motivating finding named.

### Guardrails

- **Citation convention (every rule / persona edit).** A citation names `file` + a greppable symbol (function, field, attribute name, quoted comment text); the line number is an optional, decaying hint (`~L812`). A bare `file:line` with no symbol is not a valid citation — it can't be healed after a refactor. Lines drift in days; symbols break only when the code itself is removed, which is exactly when the citation SHOULD break loudly.
- Only edits that clear the quality bars above become candidates; everything else stays a recorded Gap/Dead-rule note for a future run to confirm. The bars filter the candidates; the user's explicit `evolve` reply is the WRITE gate — never edit the skill files without it (concurrent audit sessions share them). Every applied edit MUST appear in the `## Catalog evolved (applied)` block, so the change is never silent.
- Phase 7 edits SKILL.md, the `RULES-*.md` group files, and PERSONA.md only — and only after the `evolve` go. Phase 5 handles source-code fixes; Phase 7 handles the rule catalog (in the `RULES-*.md` files, plus the mode banners in SKILL.md) and the persona. Never edit other files during Phase 7.
- If a proposed evolution would conflict with the conventions in `CLAUDE.md` (e.g., "weaken JSP-01 to allow raw window resize listeners"), do NOT surface it as a candidate — record it on the `Rejected (conflicts with CLAUDE.md)` line of the `## Catalog evolved — candidates` block with the reason. `CLAUDE.md` is upstream of this skill.
- Preserve each file's structure: SKILL.md keeps frontmatter, mindset, phases, report format, non-goals, and the Rule-catalog pointer + mode banners; each `RULES-{group}.md` keeps its group's rule table + framing; PERSONA.md keeps the four-field per-entry shape (Canonical, Why (and rejected alternatives), Carve-outs, Audit behavior). Don't invent new top-level sections during an evolution.
- Persona-drift proposals MUST include the divergent file's reasoning (cited inline) so the user can argue the canonical change from data, not from authorial preference. A proposal that says only "the corpus moved" is rejected — corpus movement is a migration target, not a canonical revision.
- **Write present-tense, no backstory.** New rules, carve-outs, and lessons are written as current rules — no dates, no "was/previously/removed on", no narration of what the catalog used to say. A deleted rule gets at most one line in its group's deleted-rules/lessons note stating the anti-pattern and why it loses; git history holds the rest. Guards stay guards: a rule that detects reintroduction of a rejected mechanism is a live rule — write it as one, without the origin story.
- **Carve-outs retire.** When citation hygiene finds a carve-out whose anchoring symbol is gone from the corpus, surface a carve-out DELETION candidate (not merely an expired-citation note) — a carve-out that can no longer cite a motivating site is presumed dead until a new site re-motivates it.
- **Condense before appending.** When a candidate would push a rule row past ~25 source lines or add a fourth carve-out to one entry, surface a CONDENSE candidate for that row alongside it (fold overlapping carve-outs, compress detection prose) rather than appending another exception to an already-encyclopedic row.

