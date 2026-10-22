# Formatted Input: phone, IBAN and national ID leave nds-form.js

Owner decisions (2026-10-22): split now, before v2 · the file is `_js/nds-formatted-input.js`, namespace `NDS.FormattedInput` · the three kinds move together (they share one engine) · date and time keep their own files.

**Why.** The three kinds are about 245 lines of `nds-form.js` (1,100), and they are its busiest part (four commits on 2026-10-22). Phone work then stops touching the contract-critical form file, and the 50-branch `stampIdentifier` (the @forms audit's JSA-11 tradeoff) splits into one entry per kind. A future formatter (card number, postal code, CR number) is one more entry.

**Not the goal:** bytes. The file stays in the main bundle: `setupInput` reshapes a pre-filled value before first paint. No markup change, no behaviour change.

**Layers** (one line in the new banner says this):

| File | Job |
|---|---|
| `nds-typing.js` | the engine: shapes text as it is typed, no UI |
| `nds-date-picker.js`, `nds-time-picker.js` | a formatted field with a picker menu |
| `nds-formatted-input.js` | a formatted field with no picker: `.nds-phone`, `.nds-iban`, `.nds-national-id` |

Names rejected: `identifier` (a card or postal code is not one), `number-input` (an IBAN has letters; the +/− number field and `.nds-number-format` already own "number"), `grouped` (clashes with `nds-form-group`, `nds-btn-group`), `input-mask` ("mask" is the date/time shape in `nds-typing.js`).

---

## Step 1 — the move (one commit, behaviour identical)

**Moves out of `nds-form.js`** (by symbol): `isNationalId`, `isIban`, `IBAN_FORMAT`, `getGroupFormat`, `getPhoneSource`, `getCountryPicker`, `readCountryCode`, `getCountryCode`, `readFullNumber`, `pickingCountry` + `pickCountry`, `getPhoneNumber`, `phoneNumbers` + `reportPhone`, `KEEP_ZERO`, `stampIdentifier`; from the `digits` part: `setupInput`, `refresh`, the identifier half of `beforeinput` (the insert fast path and the delete-over-a-separator path), the `input` handler, `formdata:capture`; the `NDS.field.onReset(document, …)` restamp and the `nds:dropmenu:select` listener after the part.

**Stays in `nds-form.js`:** the `digits` part's numeric tail (Arabic digits → Latin under `inputmode="numeric"`, the `setRangeText` path). It serves every numeric field (page jump, OTP), not only these three.

**Decided:**
- **Bundle order:** `nds-formatted-input.js` goes in `@bundles` main between `nds-typing.js` and `nds-form.js` (`_plugins/js_processor.rb`). Field runs parts in registration order, so its `beforeinput` runs before Form's numeric tail, as the one handler does today. Form's tail then starts with `if (!e.isComposing && context.input.matches('.nds-phone, .nds-national-id, .nds-iban')) return;` — today every insert with data on these fields `return`s before the tail, and a delete has no `e.data`. Not `e.defaultPrevented`: the in-shape fast path returns without `preventDefault`, so the tail would block a pre-shaped paste (`55 123 4567`) wherever `e.data` carries it, and an OTP box's own `preventDefault` would start skipping the tail (the known edge below). Do not use a `:capture` part for this.
- **Part name:** `NDS.field.addType('formatted', { … })`. Form keeps `addType('digits', …)` for the tail only.
- **No loader entry** — a type part, like Checkbox, Radio and Switch (their banners: "a type part of the form field: no init() and no loader entry"). Form's `NDS.field.create(document.body)` in `init` is still the first-paint pass, and this file has evaluated by then.
- **`strippedEvents` does not move.** The `input` handler's `!strippedEvents.has(e)` guard is Form's Password-part WeakSet; it only ever holds events on a password input, where `stampIdentifier` returns at once. Drop the guard in the moved handler, and say why in the commit body.
- **Checksums:** `NDS.Form.isNationalId` / `isIban` become `NDS.FormattedInput.isNationalId` / `isIban`. Both are unreleased (not in v1.12.0's `nds-forms.js`), so no alias and no Migration row. Update `components/form.md` (the National ID and IBAN prose, and the methods table row).
- **Strings:** `invalid_national_id` and `invalid_iban` move from Form's `form` i18n section to the new file's own section (`NDS.i18n.getStrings(…)`, same shape as Form's). Packs are unreleased: no Migration row. `node scripts/check-i18n.mjs --build` (the processor runs it).
- **Strings section name:** decide it before the move; `check-i18n.mjs` keys on it.
- **Namespace object:** `NDS.FormattedInput = { isNationalId, isIban }`. Nothing else public. A light component like Checkbox (owner, 2026-10-22), not a lowercase helper: it owns three classes, shows messages, fires `nds:phone:change` and calls `NDS.Dropmenu.create`, which a base may not (JSD-15). It has no `.nds-formatted-input` class, so `check-banners.mjs` `PART_CLASSES` names its three and PERSONA entry 9 carries the carve-out.
- **Banner:** move Form's banner lines about these fields — the `isNationalId`/`isIban` method line, `nds:phone:change`, the `data-format` / `data-country-code` hooks, and the gotchas on `setCustomValidity`, groups of four, `maxlength`, the dropped leading 0, the E.164 submit — into the new banner. Form's `refresh()` gotcha keeps one clause pointing at it. Add the layers line.
- **Registrations:** `scripts/check-banners.mjs` maps `['nds-formatted-input.js', 'FormattedInput']`; `.claude/skills/nds-js-audit/GROUPS.md` @forms gains the file, and the seams `form → typing`, `form → dropmenu` and `password → form` are re-pointed (the dropmenu seam's owner becomes this file). `_data/catalog.yml` `js:` holds one path (`llms.txt` and `check-banners.mjs` read it so): "Text Inputs" keeps `nds-form.js`.
- **Docs:** its own page, `components/formatted-input.md` (owner, 2026-10-22), with a sidemenu and a catalog entry. `components/form.md` links it.

**Gate (all must say "same"):** `node scripts/check-typing.mjs` · `node scripts/check-form-validate.mjs` · `node scripts/check-form-interact.mjs` · a pre-shaped paste (`55 123 4567` into a `data-format` phone) in Chromium and `ENGINE=webkit` — Chrome leaves `e.data` empty on paste, so a Chromium-only run misses the tail guard · `TYPE=phone,iban node scripts/check-form-speed.mjs` (the per-key path moves; within noise is the bar) · `node scripts/check-js-rules.mjs` + `--names` on both files · `ruby _plugins/js_processor.rb` (banners, naming, audit bundle). Then a fresh `/nds-js-audit nds-formatted-input.js architecture`.

## Step 1b — country (owner, 2026-10-22)

`data-country` (nearest wins, `<html>` for the site, `SA` without one) picks the national ID rule and the letters an IBAN gets. `NDS.FormattedInput.addIdRule(country, { check, digits, length })` adds a country's ID rule; SA's ships. A country with no rule keeps capitals and digits, unchecked. `data-country="any"` takes any ID, a passport too, unchecked. A phone's code is the hidden input in its `.nds-prefix` (a fixed code writes it; a picker's is Dropmenu's carrier, from the item's `data-value`): `data-country-code` is gone.

## Step 2 — one entry per kind: not done (owner, 2026-10-22)

The table's reason was new ID types, and `addIdRule()` covers them from outside. The three kinds share only the tail: phone would need extra hooks (its code feeds the 15-digit cap, and it reports instead of checking), so a table adds pieces without making the function simpler. Revisit with a real new formatter in hand (card number, postal code).

## Known edges (record, do not fix in this plan)

- A `<template>`-armed country picker: `getPhoneSource` finds no items until it is stamped, and `NDS.Dropmenu.create` in `pickCountry` would double-wire it. No canon uses one.
- OTP and the numeric tail both handle `beforeinput` on an OTP box; harmless only while the box has `maxlength="1"` (GROUPS.md).
