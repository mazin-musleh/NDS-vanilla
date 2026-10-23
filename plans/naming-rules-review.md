# Naming rules: where they fail (review, 2026-10-23)

Status: landed 2026-10-23. Names are declared once and never derived (PERSONA entry 9); `--names` checks shapes only,
no word lists; the internal verb table binds internal names only (public verbs are read in review). No renames.

## The owner's principle (2026-10-23, in their words)

"We need a fix, and we drop the manual maintaining like name lists: simple and clear rules and one source."

Also settled the same day:
- Naming rules exist for consistency, mainly in `_js/`, not for restriction's sake.
- Classes, hooks and CSS knobs are a consumer contract: no rename sweep; small refinements only where a name is
  clearly out of place.
- A name should say what it is about (`nds:phone:change` fires only on a phone, so `phone` is right).
- `NDS-INDEX.md` serves consumer agents and carries no naming rules (its "Names" line was removed).

## Proposed shape (not yet approved)

1. One source: every naming rule (JS, classes, tokens, hooks) in one file; PERSONA, AGENTS.md and the skills point
   at it instead of holding copies. Rules held only in the owner's auto-memory move in.
2. Each rule is one line, and either checked by shape (a regex or AST test, no word list) or read in review.
3. Names are not derived from other names: a component's namespace, events and hooks are declared once, in its
   banner, and the check confirms the code matches the banner.
4. Deleted: the word lists in `scripts/lib/js-names.mjs`, the exception tables in `scripts/check-banners.mjs`, and
   the PERSONA carve-outs they made necessary.
5. No renames of existing names in this work.

## The review

A fresh Opus agent, read-only, given the rule files and the git history but none of the session's conclusions.
Its report, as delivered:

**1. Entry 9's "one name, taken from the root class" has three competing sources of truth.**
- PERSONA entry 9 takes the name from the class. `check-banners.mjs` treats a namespace as a component if it has a
  loader entry, any `.nds-x` rule in Sass, or builds one (lines 448–455). `c1131eee` changed NDS-INDEX.md:23 to
  "Take the name from the file, never from a class". Entry 9's own Why rejects exactly that, citing `8c139004` and
  `999997de`.
- Custom Select has no `.nds-custom-select` class and no `_custom-select.scss`; its parts are `.nds-select-*`. It
  still passes, because the class is only checked when a partial exists (`check-banners.mjs:435`).
- The namespace case rule changed three times: `8c139004` (April) flat PascalCase; `96425c4e` "own UI or
  lifecycle", later rejected; `59f213f3` case follows the layer.
- Names that flipped with it: `NDS.State`/`Status`/`Init` became lowercase. `NDS.date` was born lowercase on 10-07
  (`0d42c312`) and became `NDS.Date` 13 days later, only because it has a loader entry. Its banner still says "base
  component". `NDS.Grid` (`3463bad7`) is PascalCase because `.nds-grid` exists.
- `NDS.Date` and `NDS.Selection` reuse JS/DOM global names. Entry 12's pick rule 4 says such a name loses, and its
  Why cites `Selection` as the clash to avoid.
- Exceptions now needed: prose carve-outs for `.nds-btn`, Numbers, type parts, Formatted Input and themes, plus the
  script tables `DOC_ELSEWHERE` (4), `STAMP_PARTS` (2), `EVENT_SCOPES` (3) and `PART_CLASSES` (1). The Formatted
  Input carve-out was added in the rename commit `11cf46fb` and rewritten the next day (`0d5f2d73`).

**2. Derived names cascade, so one rename becomes several, and some get renamed twice.** Event names, init stamps
and i18n sections all take the component name (entries 8 and 9). When a class or file changes, they all change.
- `selectChange` → `nds:customselect:change` (`d3981664`, 08-06) → `nds:custom-select:change`.
- `switchChange` → `nds:switchChange` (`d771e916`) → `nds:switch:change`.
- `nds-digitalStamp-opened` → `nds:digitalStamp:opened` → `nds:digital-stamp:opened`.
- `relocate`/`restore` → `markHome`/`sendHome` (`835ee54a`, 10-17), then `homeOf` → `getHome` four days later.
- `afterPaint` was promoted on 06-03 (`46f012f7`) and became `onNextPaint` in v2.
- `window.ndsIpv` was added in `a68913b7` and removed the same day (`222409e9`).
- Count: 33 event rows and 116 api rows in `_data/migrations.yml`.

**3. Bulk renames break the tools, because the checks match old names literally.** About 2,900 renames landed on
10-21 alone (1,979, then 520, then 369, then the public ones). Four confirmed breakages:
- The `ready` → `isReady` rename (`ad8db5c8`) left the loader's FAB gate reading `ready`. The FAB stayed loading
  (`01b5d3e9`), and the callers check missed it until `40cb159e`.
- `da48c424` shadowed `verify()`'s rules path, so every release run crashed (fixed in `c1131eee`).
- `initialize*` → `setupX` made a sweep skip stop matching (`01da8414`).
- The plan's trap list names more checks keyed to old names: `emitEvent(`, `.valid`, `_nds\w*Initialized`,
  `onDOMAdd`.
- A/B scripts now carry both spellings, for example `setSelection || applySelection`.

**4. Hand-kept word lists stand in for the rule, and they test something different.**
`scripts/lib/js-names.mjs` checks against `VERBS`, `SHORT_OK`, `ABBREV` and `EXACT_OK`, about 1,000 words.
- `VERBS` is supposed to hold only words that are verbs in every reading (its own header). It contains `format`,
  `order`, `control`, `test`, `sort`, `filter`, `query`, `cache` and `mask`.
- So `NDS.Date.formatFor(el)` passes, though it is a noun name like `labelFor`, which entry 10 bans.
- `reapply` and `resync` are in `VERBS`, so `reapplyUrlParamsForFilter` (nds-filter.js) passes while `apply` is
  banned.
- Real verbs (`compile`, `take`, `type`) come out as "verify".
- `SHORT_OK` treats `ipv`, `otp`, `fab` and `toc` as "standard acronyms".
- Run on 2026-10-23: 0 findings, 36 verify. 11 of those are P12.14 lines (`fileData._xhr` ×5, `stepper._*`,
  `state._navChanged`) that the plan says were "read and kept". There is nowhere to record that decision, so they
  come back on every run.

**5. Entries contradict each other on the same word.**
- "Base": entry 7 uses it for the Rides graph (`NDS.Date`'s banner says "base component"). Entry 11 says a base is
  lowercase and has no UI.
- Show/hide: entry 3.2's canonical pair is `show()`/`hide()`, but its lead example, Accordion, uses `openItem`. Its
  events went `shown`/`hidden` → `opened`/`closed` (`f2a3bfc6`).
- Console prefix: entry 4 lets only Export use the bracket form, but `[NDS.Print]` and `[NDS.Date]` use it too,
  though entry 9 makes both PascalCase components.
- Layers: entry 11 says a lower layer never names a higher one, yet the `NDS.dialog` base stamps `data-nds-modal`
  (nds-dialog.js:77).
- Whole words vs class names: entry 10 rule 8 wants whole words, entry 9 gives `NdsIpv` (was
  `NDSImagePopupViewer`). `btn` is allowed as a local, but `closeBtn` must become `closeButton`.
- Colour names: colour names are debt (AGENTS Deprecations), yet tags use colour classes as canon. `.nds-gray` and
  `.nds-neutral` are both kept, against "one name per meaning".

**6. Following the rule gives a name that tells the reader less.**

| Before | After |
|---|---|
| `NDS.TagInput` | `NDS.Taginput` |
| `_ndsSideInfo` | `el.ndsSideinfo` |
| `CooldownButton` | `Cooldown` |
| `NDSImagePopupViewer` | `NdsIpv` |
| `Multiselect.apply()` | `commit()` |
| `NDS.state.apply(el, …tokens)` | `refresh(el, …tokens)` |

- `commit()` is triggered by `data-multiselect-action="apply"`, alongside `_applyButton` and `_applyMode`, and the
  button says "Apply".
- `refresh` now means the loader hook, "measure again", and this. It is also banned as an internal prefix.
- `Stepper.prev()` sits beside `data-stepper-control="previous"`, which a carve-out keeps.

**7. Rules with no check, and kinds of name with no rule.**
- No script checks the token naming rules in AGENTS.md: 14 tokens put `oncolor` after the state
  (`--button-label-danger-primary-hovered-oncolor`); AGENTS' own example, `--text-oncolor-primary`, also breaks
  "placed last before state"; 15 `--featuredicons-*` tokens don't match `.nds-featured-icon`.
- Entry 12 rules 5 and 6 are "read, not checked". The plan counts 135 banner hooks with no component name.
- Entry 4 (console prefix) has no check. The entry 8 check tests the event name's shape, not its tense.
- About 15 internal `data-nds-*` names (`-modal`, `-under`, `-i`, `-align`, `-loaded`, `-scroll-lock`, `-print-*`)
  fit no entry 12 row, though entry 12 says every name has a rule. AGENTS gives `data-nds-scroll-lock` as an
  example of `data-{component}-{part}`, but `nds` is not a component.

**8. Carve-out growth (a symptom of 1–5).**
- PERSONA carve-out bullets went from 18 (10-19) to 32 (10-20) to 44 (HEAD).
- The file grew from 339 to 583 lines.
- PERSONA has 34 commits since 10-01, most of them in the rename window.

**What fails and what holds.** The rules that fail are the ones that derive one name from another: the class, file
and registry, then the namespace, events, stamps and tokens. They fail most when the source is itself up for
change, or when the rule needs judgment ("what counts as a component, a base, a verb") that a hand list then
imitates. Those produce the cascades, the double renames and the carve-out tables. The rules that hold have one
meaning and a mechanical test: the event regex (one exception table, untouched since rollout), "no `_` on module
scope" (P12.13), `Nds{Name}` classes, "public means on the banner" with the cross-file `_` rule (0 findings, no
carve-outs added), and the once-per-page bundle guard.
