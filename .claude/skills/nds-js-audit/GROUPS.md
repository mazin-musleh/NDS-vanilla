# nds-js-audit — Group runs (read on demand)

Loaded from SKILL.md when `$1` is `@name` or a comma list. A group run is the single-file deep read on each related file, plus one **seams agent** that reads the joins between them: the contracts a single-file run cannot see, because each side looks correct alone. SKILL.md's contracts govern here (Response style, Auto-drive, the shared rule conventions); this file adds the group procedure and the group definitions.

---

## Procedure

1. **Resolve.** `@name` → the group's `Files` below. A comma list → each entry resolved as a filename, with no listed seams (the seams agent finds them). More than 6 files → Auto-drive pause point 5: print `N files, N+1 agents` and wait for a go.
2. **Mechanical half.** One run over the whole group: `node scripts/check-js-rules.mjs <files>` and `node scripts/check-js-rules.mjs --names <files>`.
3. **Inline greppable pass**, per file, exactly as single-file mode.
4. **Spawn in ONE message, all in the background:** one deep-read agent per file (the single-file brief template, SKILL.md Phase 3), plus the seams agent (brief below). While they run, do nothing that duplicates their reads.
5. **Triage before you accept.** Confirm each claimed defect in the code (read the cited lines), and rule out by-design behavior, before it goes in the report. A finding that changes behavior in a browser is real only once the old code fails the same check.
6. **Report** — one consolidated report (below).

## Seams agent brief

Self-contained; the agent has no audit context. Paste:

1. **Files** — the group's file list. "Read the parts of each file that touch another file in the list; you do not need to re-audit each file alone — per-file agents do that."
2. **Known seams** — the group's `Seams` list below, verbatim (none for a comma list).
3. **Seam kinds to check, in both directions:** events (one file dispatches, another listens) · direct calls (`NDS.X.method`, `el.ndsX`) · shared DOM state (a `data-*`, class or `NDS.state` token one writes and another reads) · order (the loader `components` array in `_js/nds-loader.js`, the `@bundles` lists in `_plugins/js_processor.rb`) · a base helper several files call.
4. **What to look for at each seam:** the two sides disagree today (a name, a value format, a detail field, a timing); one side assumes an order the other does not guarantee (an injected bundle lands in no fixed order — a call between two injected bundles needs the stub check); one side reports a state the other cannot restore (JSA-23 (c) across components); a queued event from one side acts on stale state in the other (JSA-24); an index from one side addresses the other's collection (JSA-17); two files derive the same facts and must agree (JSA-09 third trigger across files — also a JSD-05 candidate).
5. **Rules** — tag a finding with the catalog rule that fits (Read `.claude/skills/nds-js-audit/RULES-JSA.md` for the rows named above); a break no rule names takes the rule cell `SEAM`. Paste the three shared rule conventions from SKILL.md verbatim.
6. **Output contract** — a findings table `| Sev | Rule | Seam (a → b) | Finding → one-line fix | Type |`; every finding names the symbol on BOTH sides and a concrete failure (HIGH needs the scenario step by step). Then `Seams checked:` one line per known seam: `holds` / `changed: …` / `gone`. Then `New seams:` any confirmed seam the list lacks, in the list's format. No prose; a clean result is a real result.

**`SEAM` severity:** HIGH when wrong state reaches a public surface (a documented event, return value, `data-*` a consumer reads, or what the user sees); MEDIUM when a real trigger exists but the harm stays internal or needs an uncommon order; LOW for drift risk only (two copies that agree today). `Type:` follows the observable-change gate like any JSA finding.

## Report

Same template as SKILL.md Phase 4, with these differences:

- Header: `# Code Audit — @name (group: N files, {rule-group})`, or the comma list.
- Under the Summary: a `## Per-file results` table (`| File | Findings |`), and one line `Seams: N checked, M findings, K new`.
- `SEAM` findings sit in their severity section under `### seam: a ↔ b`, after the per-file blocks. Their fix runs as one slot (FIX.md).
- A changed, gone or new seam, and a file with no seam to the rest of its group, is a **bookkeeping** candidate for this file (EVOLVE.md: no quality bar, applied on the `evolve` go).

## Adding or changing a group

A group earns its place by its seams: every file needs a confirmed seam to at least one other file in it, or it belongs elsewhere. Format: `## @name`, a `Files:` line, a `Seams:` list anchored by symbol (never by line number), one line per seam, the joins a change is most likely to break first. Keep a group at 6 files or fewer where the seams allow. `nds-core.js` and `nds-loader.js` are never members (SKILL.md, Group resolution); name loader order as a seam instead.

---

## @forms

Files: nds-validation.js, nds-field.js, nds-typing.js, nds-formatted-input.js, nds-form.js, nds-checkbox.js, nds-radio.js, nds-switch.js, nds-otp.js, nds-password.js

Seams:
- formatted-input, form, switch, radio, checkbox → field: register parts with `NDS.field.addType(name, part)`; field runs each part's `on` / `around` / `setupInput` / `create` / `refresh`. Form's `NDS.field.create(document.body)` in `init` is the first-paint pass.
- form ↔ validation: form calls `NDS.validation.check` / `checkAll` / `getMessage` / `isOwned` / `rules`; `NDS.validation.onRule(fn)` makes form add one document listener per `rule.on`, re-checking only while `NDS.status.get(holder) !== ''`; `checkAll` returns `pending: true` while a rule's bundle is unloaded (`NDS.init.isPending`).
- checkbox, radio, otp → validation + form: `NDS.validation.addRule(selector, fn, {on, owns})`; `validate` routes to `NDS.Form.validateField` (otp: `checkField`); checkbox uses `checkCount`, radio `isRequired`; otp and form share `NDS.Form.clearStatus`. Validation's native pass skips owned containers, and field skips the required stamp when `NDS.validation.isOwned(container)`; no file here passes `owns`, and the native pass skips `.nds-otp-container` by class. A rule's `focus` decides disabled: `isDisabled(el, focus)` passes a field whose focus is disabled, so a group rule hands back an enabled box.
- password → form: form's password part strips Arabic letters on `input:capture` (`NDS.setValue(…, {change:false})`, `strippedEvents` WeakSet) before NdsPassword's `check()` runs (formatted-input's `input` part does not check it: a password field is never a formatted one); password uses `NDS.field.onReset(form, fn, {signal})` and `NDS.status` on its rule chips.
- switch, radio, otp → field refresh: `toggle()` / `repaint` call `NDS.setValue` then `NDS.field.refresh(input, {validate:true})`; otp resyncs its hidden value through `NDS.field.onReset`.
- formatted-input → typing: `stampIdentifier` lays a phone (`data-format` of `getPhoneSource`) or an IBAN (`IBAN_FORMAT`) out with `NDS.typing.group(text, caret, format)`; the formatted part's `beforeinput` runs a `dry` stamp first and lets the browser insert when the shape holds, else `preventDefault` + `NDS.setValue(…, {change:false})`. The `formdata:capture` part strips the groups and puts `data-country-code` first (`getPhoneNumber`), and `reportPhone` fires `nds:phone:change`.
- typing → form: `addTypingListeners` writes through `NDS.setValue(input, value, {change:false})` with no `inputType`, so its own `input` handler skips the write while form's field states still hear it (its end-of-value shaping inside that handler writes through the prototype setter, no event, so a React binding sees it); it sets `inputmode="decimal"`, never `numeric`, because form's digits part blocks every non-digit under `numeric`. Its callers sit in other groups: date-picker (@dates) and time-picker (@menus) through `compile` + `addTypingListeners`.
- formatted-input → dropmenu (in @menus): a phone's country picker is the `.nds-dropmenu[data-select-name]` in its control; `getPickedItem` finds the picked item by the value in Dropmenu's hidden input, and before Dropmenu builds that input, Dropmenu's own first pick (`data-select-value` beats `selected`; `setSelection` never updates `data-select-value`). The item's `data-value` is the code (`getCountryCode`) and holds its `data-format` (`getPhoneSource`); a fixed code is the hidden input in the prefix. It re-stamps on `nds:dropmenu:select`, and a full number of another listed country (a paste, or the page's own value at setup, before the loader reaches Dropmenu) builds the picker with `NDS.Dropmenu.create` and calls `setSelection(item)` with `pickingCountry` set, so that select event does not re-stamp the old value.
- formatted-input → form digits part: the formatted part registers first, so its `beforeinput` runs before form's numeric tail, which skips a non-composing `.nds-phone, .nds-national-id, .nds-iban` by class. Not by `defaultPrevented`: the in-shape fast path inserts without it.
- order: main lists validation, field, typing, formatted-input, form, then checkbox / radio / switch / otp, which call `NDS.validation`, `NDS.field` and `NDS.Form` at eval time. Password rides delegated and needs only `NDS.field`; its loader entry carries `rule: 'loaded'`, so `checkAll` holds a submit until its bundle lands (not `true`: a field with no chips and no match never builds `ndsPassword`).
- otp ↔ form digits part: both handle `beforeinput` on one OTP box (`inputmode="numeric"`). OTP's own handler `preventDefault`s and spreads a paste; form's document handler does not check `defaultPrevented`, and stays harmless only because the canon box carries `maxlength="1"`.
- typing → date-picker / time-picker → form: typing's synthetic blur `change` lets the picker stamp validity before form's `focusout` (`validateInput`) reads it, since `blur` precedes `focusout`.

## @menus

Files: nds-dropmenu.js, nds-custom-select.js, nds-multiselect.js, nds-taginput.js, nds-autocomplete.js, nds-time-picker.js

Seams:
- custom-select → dropmenu: stamps `nds-dropmenu-trigger` / `nds-dropmenu-item`, then `NDS.Dropmenu.create(formControl, {menu, menuClass:'nds-select-menu'})` (consumed by Dropmenu's `stampField`); mirrors `nds:dropmenu:opened` / `closed` into the `open` state on its container; teardown calls `NDS.Dropmenu.destroy(formControl)`.
- multiselect → dropmenu: writes `data-anchor="start"` only when absent; creates the dropmenu only when `!ndsDropmenu`, and `_ownDropmenu` decides whether its `destroy()` destroys it; reads `NDS.state.has(dropmenu, 'open')` and calls `ndsDropmenu.close()`. Loader: Dropmenu before Multiselect.
- autocomplete → dropmenu: `NDS.Dropmenu.create(formControl, {click:false})`; listens to `nds:dropmenu:opened` / `closed`; picks through its own delegated `.nds-dropmenu-item` click, not `nds:dropmenu:select`.
- autocomplete → taginput: a taginput with `data-url` is also an autocomplete (`.nds-form-container[data-url]`, loader `rule:'loaded'`) on the same input; `nds:autocomplete:select` (`detail.text`) → taginput `addTag`; taginput's Enter / blur reads `NDS.state.has(formControl, 'open')` and `aria-activedescendant`; autocomplete's validation rule returns null for `.nds-taginput`. Taginput is main, autocomplete extras: taginput only listens.
- time-picker → custom-select: `NDS.CustomSelect.init()` synchronously, then `create` / `setValue` / `clear` / `destroy` per unit; listens to `nds:custom-select:change` on each unit's `.nds-form-control`.
- dropmenu template arming: `armTemplateDropmenu` / `stampMenuTemplate` call `NDS.init.refresh(menu)`, so multiselect content inside a template menu starts.

## @dates

Files: nds-date.js, nds-date-picker.js, nds-time-date.js

Seams:
- date → date-picker: `NDS.Date.format` / `parse` / `getToday` / `getCalendar` / `formatFor` / `getMonthNames` / `getWeekdayNames`; `data-calendar` and `data-date-format` read through `formatFor` / `getCalendar`. Date is main ("right after core"), the picker extras: it reads `NDS.Date` synchronously.
- date → time-date: `NDS.Date.format` / `getToday` / `getCalendar` / `getMonthNames`, and `NDS.Date.site.timeZone` (`<html data-timezone>`).
- loader: the `Date` entry is `critical:true` with `refresh: root => NDS.Date.fill(root)`.

## @lists

Files: nds-filter.js, nds-pagination.js, nds-sort.js, nds-table.js, nds-selection.js, nds-export.js

Seams:
- filter → pagination: Filter writes `data-filtered` (`_applyItem`), Pagination's `getPagedItems` skips it; Filter's `_syncPagination` calls `NDS.Pagination.refresh(content, {keepPage})`. Loader: Filter "MUST stay before Pagination".
- filter → sort: `NDS.Sort.create(target, {items, reorderIn, triggers, accessor, urlSync, onChange})`, whose `onChange` ends in `_syncPagination` + the filter event; Sort dedups through `root.ndsSort`, and its own scan skips a claimed list. Loader: Sort after Filter and Tables.
- table → sort, pagination, selection: `_setupSort` → `NDS.Sort.create(table, {…, a11y:'sort'})`, whose `onChange` runs `repairSubPairing` then `NDS.Pagination.refresh`; `_setupSelectAll` stamps `data-selection-target` and calls `NDS.Selection.init()` + `refresh(tbody)`.
- selection ← filter, pagination: `getScope` reads `data-filtered` and Pagination's `item.hidden`, resynced through `NDS.onAttributeChange` on `data-filtered` and on `.nds-page-item` `hidden`. Loader: Selection recounts before Filter.
- export → selection, filter: reads `NDS.Selection.isSelected(row)` behind the `__ndsStub` check (extras and delegated land in no fixed order) and calls `NDS.Selection.init()` at its own init; excludes `data-filtered` rows and ignores `hidden`, so every page exports.
- pagination `refresh(content, {keepPage})`: the one entry for Filter, Table and its own `onDomAdd` / `onDomRemove('.nds-page-item')` watchers.

## @dialogs

Files: nds-dialog.js, nds-modal.js, nds-panel.js, nds-backdrop.js

Seams:
- modal, panel → dialog (base): `NDS.dialog.show(el, signal)` / `close` / `onOutside` / `hideMenus` / `getTop`. Bundle: dialog listed before modal and panel in delegated.
- modal ↔ panel Escape: Modal's `handleEscape` calls `preventDefault()` and closes only when `getTop() === modal`; Panel's keydown returns on `e.defaultPrevented || !isTop(panel)`.
- panel stacking: `opensModal(panel)` decides modal for both the open path and the swap — `data-panel-modal`, or a user-opened panel while `NDS.dialog.getTop()` is set; the swap skips every panel in `modalPanels`; a plain panel's outside click skips `.nds-modal, .nds-backdrop, [data-modal-target]`.
- panel ← modal fade: `openPanel` / `isTop` read `NDS.dialog.getTop()`, which still returns a modal for its whole fade (Modal's `close()` clears `activeModal` first), so a panel opened in that window goes modal.
- dialog → backdrop: `setBackdropUnder` toggles `data-nds-under` on the `.nds-backdrop` element that Backdrop's `show()` builds; dialog also writes `data-nds-modal` / `data-nds-under` that CSS reads.
- backdrop ↔ dialog, the `NDS.scrollLock` counter: Backdrop locks from its `showTimer` and unlocks in `hide()`; dialog locks on the first `show()` and unlocks on the last `close()`. A lock either side leaks blocks the other's final unlock.
- backdrop ↔ modal Escape: both are document keydown listeners; Backdrop's `handleEscape` yields only on `e.defaultPrevented`, which Modal sets only when focus is inside the modal.

## @nav

Files: nds-main-nav.js, nds-sidemenu.js, nds-drawer.js, nds-toc.js

Seams:
- sidemenu → drawer: queries `.nds-drawer` / `.nds-drawer-list`, sets `--drawer-max-height`, and relies on Drawer for expand and collapse (the first open throws without `.nds-drawer`). Loader: Sidemenu then Drawer, both critical.
- toc ← main-nav: `_getNavOffset()` reads `.nds-main-nav` `offsetHeight` as the scroll-spy and click-scroll offset.
- main-nav, sidemenu → the shared Backdrop stack (outside the group): one `hide()` per `show()`; main-nav tracks `navBackdropOwner`, passes `replace:true` for sibling flyouts and checks `NDS.Backdrop.isActive()` before hiding; sidemenu calls plain `show` / `hide` with `preventScroll`.
- main-nav ← modal (outside the group): `nds:modal:opened` closes the drawer or `dropdown.closeAll()`.
