# Code Audit — `_js/` (js dry, full tree) — 2026-10-05

**3 HIGH / 11 MED / ~90 LOW → Recommended: `fix all` (the 3 HIGH are small, verifiable selector swaps; promote waits on reach)**

## Summary
- Files scanned: 60 (6 Sonnet subagents; core, loader and showcase excluded)
- Rule groups hit: JSD-01, -08, -10, -12, -14, -15, -19, plus the ponytail lens
- Clean tree-wide: JSD-02, -03, -04, -06, -13, -16, -17, -18
- Findings are subagent output, not re-read by the parent. Verify HIGH items before applying.
- JSD-05 candidates are merged from per-batch lists and not verified tree-wide.

## HIGH
### `nds-customselect.js`
- L130 [JSD-01c] Queries `[data-state~="selected"]` for a token the file writes itself (L122, L179).
  Fix: `Array.from(options).find(o => NDS.State.has(o,'selected')) || options[0]`.

### `nds-docs.js`
- L323 [JSD-01c] Same shape; the file writes `selected` at L501 and L621. Borderline, since the initial state is server-rendered.
  Fix: `controls().forEach(btn => NDS.State.has(btn,'selected') && …)`.

### `nds-mainnav.js`
- L409 [JSD-01c] `openIn` queries `.nds-has-menu[data-state~="open"]`, but `_openDropdowns` already tracks the open set.
  Fix: `[..._openDropdowns].some(dd => root.contains(dd))`.
  Caveat: `dropdown.toggle` deletes from the Set at close start, while `data-state` keeps `open` until the transition ends. Check `syncOpenFlags` timing first.

## MEDIUM
| Rule | Location | Finding → fix |
|---|---|---|
| JSD-19 | `nds-sideinfo.js:191` | `create` never returns `el._ndsSideInfo`, so a second call double-wires the resize subscriptions → return the existing instance |
| JSD-19 | `nds-swiper.js:999` | Bare `new NDSSwiper(el)`; a second `create` re-clones loop slides and stacks listeners → return `el._ndsSwiper` first |
| JSD-19 | `nds-tabs.js:365` | `create` returns an unusable instance when the constructor bails → `inst.valid ? inst : null` (shape at `nds-taginput.js:326`) |
| JSD-19 | `nds-tables.js:998, 1000` | `create` and `createColumnToggle` return an unusable instance on a bail → `inst.valid ? inst : null` |
| JSD-19 | `nds-tables.js:978-1000` | Programmatic column-toggle create is never stamped, so the next `init()` builds a second toggle → stamp the sentinel in the constructor |
| JSD-19 | `nds-pagination.js:1611` | `create` returns the instance and wires clicks even when the constructor bailed → `if (!inst.valid) return null` |
| JSD-19 | `nds-tooltip.js:456` | `create: el => new NDSTooltip(el)` builds an unusable instance → `el.ndsTooltip \|\| …`, null if `init()` never ran |
| JSD-12 | `nds-cookies.js:121` | `NDS.CookieConsent?.open?.()` has no rationale comment → add the soft-dependency comment, or drop the `?.` |
| JSD-12 | `nds-tables.js:111-112` | `NDS.Selection?.init?.()` is unannotated (the comment names the file but not why it is optional) → same |
| JSD-10 | `nds-toc.js:168` | `navOffset()` reads `.nds-main-nav` only; `NDS.stickyHeaderBottom()` also covers `.nds-topbar` → use it |
| JSD-10 | `nds-chart.js:94` | `_compactFmt` uses the browser locale, while `NDS.formatNumber` uses the page lang → use core, or add a fork comment (owner call) |

## LOW (~90, grouped)
- **Dead guards (JSD-08 / JSD-14b, mechanical):**
  - `window.NDS = window.NDS || {}` in `nds-editor.js:2867`, `nds-empty.js:217`, `nds-slider.js:37`.
  - `NDS.Init?.mount?.` and `NDS.fromTemplate?.` in `nds-accessibility.js:1417, 1427`.
  - Dead `?.` / `if` guards in `nds-ipv.js`, `nds-upload.js`, `nds-taginput.js`, `nds-filter.js`, `nds-timeDate.js`, `nds-export.js`, `nds-date-picker.js:2268`.
- **Dead code (PONY-DEL, grep readers first):**
  - `nds-modal.js:229` ESC handler duplicates the backdrop's.
  - `nds-date-picker.js` unused `gregorianToJulian`, redundant `el.ndsDropmenu =` lines.
  - `nds-accessibility.js` unreachable `ensureArmed` branch, dead `||` fallbacks.
  - `nds-time-picker.js:656` dead `_offLangChange` call.
  - `nds-voice-input.js:289` dead string branch.
  - `nds-feedback.js` unused return value.
  - `nds-ipv.js:511` `static create()` with zero readers.
- **Legacy `'Esc'` key (PONY-NAT):** `nds-accessibility.js:472`, `nds-panels.js:107`, `nds-digitalStamp.js:118`, `nds-modal.js`.
- **Nested ternaries / depth (JSD-14):** `nds-editor.js:2314`, `nds-docs.js:413`, `nds-forms.js:571`; depth-5 in `nds-chart.js:901`, `nds-feedback.js:260`, `nds-forms.js:1378`.
- **Duplicated blocks (shrink), the bulk of the LOWs:**
  - `nds-editor.js`: 12× `sel.removeAllRanges(); sel.addRange(r)`, 12× the sync/toolbar tail, 3× the hydrate trio.
  - `nds-forms.js`: six near-identical validity blocks (~80 lines).
  - Also `nds-filter.js`, `nds-upload.js`, `nds-pagination.js`, `nds-date-picker.js`, `nds-swiper.js`, `nds-autocomplete.js`, `nds-multiselect.js`, `nds-alert.js`, `nds-dropmenu.js`, `nds-cityWeather.js`, `nds-accordion.js`, `nds-audit.js`, `nds-rating.js`, `nds-otp.js`, `nds-stepper.js`.
- **Smaller items:**
  - `nds-code.js:58` re-subscribes `onIntersect` per block on a repeat `init()`.
  - `nds-toc.js:235` instance `destroy()` leaves `el._ndsToc` set.
  - `nds-pagination.js:1301` `destroy` leaves auto-pagination clicks live (verify).
  - `nds-tables.js:467` should use `NDS.isArabic`.

## Promotion candidates (JSD-05)
- **`NDS.State.toggle(el, token, force)`**
  Sites: ~10 files, ~25 sites (`nds-selection.js`, `nds-docs.js`, `nds-tables.js`, `nds-pagination.js`, `nds-forms.js`, `nds-scroll-more.js`, `nds-sort.js`, `nds-mainnav.js`, `nds-upload.js`, `nds-taginput.js`).
  Reach: ~10 files plus `nds-core.js`, a broad-surface change. Coordinate via per-candidate `promote` approval, not a plain `fix`.
  Body gate: each site is one branch, so it only barely clears the gate.
- **`NDS.onOutsideClick(roots, fn, {signal})`**, outside-click plus Escape dismiss. 3 sites (`nds-tooltip.js`, `nds-panels.js`, `nds-digitalStamp.js`); clears the 3-file bar, new API with a multi-statement body.

## Gaps (no finding)
- `closest('code, .code-example')` in ~29 files: single expression, fails the body gate. `NDS.inDemo(el)` is an owner call.
- Single-expression repeats failing the body gate: `{ar,en}[NDS.langKey]` tables, string-or-element resolver, `emitEvent`.
- The string-or-element resolver differs from `NDS.resolveEl` (id-first), so swapping would change behaviour.
- Banner wording vs code mismatches ("soft" dependencies called raw) in `nds-export.js`, `nds-editor.js`, `nds-filter.js`.
- `nds-showcase.js:1909, 1958, 2001` call `Stepper.setFallback` / `getFallback`, removed in commit 19ece844. Probable TypeErrors in the demo; check separately.
- `nds-drawer.js:71` legacy `open` class has no row in `DEPRECATIONS.md`.

## Catalog evolved — candidates (applied only on `evolve`)
- Stale RULES-JSD citations: the `nds-cooldown-button.js ~L105` "Soft dependency" cite is gone; the `nds-dropmenu.js _stampMenuTemplate` cite is gone (now `NDS.Init.refresh(menu)`); JSD-07 names `nds-modal.js` as the "factory example" but modal is a singleton.
- Stale PERSONA entry 6 cite: upload's `dragAbortController` symbols no longer exist.
- JSD-10: the `nds-alert.js` `stickyHeaderBottom` motivating pointer can expire, since it is fixed.

## Next Step
1. `fix all` (recommended)
2. `promote NDS.State.toggle`
3. `evolve`
4. `skip`
