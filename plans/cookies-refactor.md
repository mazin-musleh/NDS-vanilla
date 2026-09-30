# Cookies refactor

Owner decisions (2026-09-30): Manage slides inside one panel · non-essential switches start off · Compact dropped · categories come from markup, 4 in the canon.

## Shape

Two components, each with its own job (not the banned eager-shell/lazy-half split):

| | `NDS.Cookies` — core | `NDS.CookieConsent` — the UI |
|---|---|---|
| File | `_js/nds-cookies.js` (stays) | `_js/nds-cookie-consent.js` (new) |
| Bundle | `nds-main.min.js` | own lazy bundle `nds-cookie-consent.min.js`, like a11y |
| Why there | consent must apply before analytics; Tables and User Feedback call `get/set` synchronously | a visitor with a stored choice never needs it |
| Owns | `get/set/delete`, consent store, gtag signals, clearing trackers, the event, `show()` (forwards to the UI stub) | the panel, the notice / manage / done views, the switches, the 6 s auto-show |

**Loader entry** (`CookieConsent`, `universal` + `lazy` + `eager`): on every page, nothing in the HTML. `lazy` arms `[data-cookies-toggle]` clicks → the stub fetches the bundle and replays `open()`. `eager()` = no stored consent and no dismiss key, so a first visit loads it at idle and it opens at 6 s.

CSS: the view column only, in the main sheet. No paired sheet.

## Markup

**Built in JS, like a11y** (`panelMarkup()` in `nds-cookie-consent.js`), only when it is first needed. No include, no template in the page. Default content is minimal: title, one sentence, the three actions; Manage has one sentence and the four switches. No links, no per-category text.

**A page's own panel wins:** `#ndsCookiesPanel` in the DOM or in a `<template>` is used as-is (text, links, categories are then the page's). That is the only way to customize content.

**Text: `assets/i18n/cookies/{lang}.json`** (en, ar) via `NDS.i18n.load('cookies')`, loaded before the panel is built, so an Arabic page never shows English first. `window.NDS_I18N.cookies` overrides inline. Replaces the `isArabic ? … : …` toast pairs.

- Actions are `data-cookies-action` (accept · reject · save → the done view · manage · undo), not ids. Switches: `data-cookies-category`.
- **Done view** (owner's mockup): after a choice the panel shows "Thank you… Undo" instead of a toast (Alert no longer rides). Undo returns to the notice view; the stored choice stays until the next one replaces it (reverting would mean un-sending the gtag signal).
- Closing without a choice (×) = dismiss: hides the auto-open for 30 min. Handled on `nds:panel:closed`. The panel is `data-panel-static`, so an outside click does not close it.
- Manage view (per the owner's mockup, 2026-09-30): icon + title + close, no Back; long description; full "… Cookies" labels; outlined Reject. `hidden` swap, no slide (owner, 2026-09-30). The mockup's "click the category headings" sentence is dropped: nothing there is clickable. Switches show the stored choice, all off when there is none.

## Consent store

`cookieConsent` keeps its name. Values: `accepted` (all) · `declined` (none) · a comma list of granted categories (`functional,performance`). Old values read as-is.

- `getConsent()` → `'accepted' | 'declined' | 'custom' | null` (`'custom'` is new).
- New: `NDS.Cookies.allowed(category)` → boolean; `necessary` is always true.
- New: `NDS.Cookies.save(categories)`, used by the UI, public for a consumer's own UI.
- Event `nds:cookies:consent`: `detail.consent` as `getConsent()`, plus `detail.categories` `{ performance: true, … }`.
- gtag mapping: performance → `analytics_storage` · targeting → `ad_storage`, `ad_user_data`, `ad_personalization` · functional → `functionality_storage`, `personalization_storage`. Unknown categories only reach the event and `allowed()`.
- Deny clears per category: performance → `_ga _gid _gat` + `ga-disable-<id>`; targeting → `_fbp _fbc`.

## Panel changes needed

1. **Auto-show must not steal focus.** `open()` always focuses the first `[data-panel-close]`; a banner that grabs focus after 6 s breaks WCAG 3.2.1. Add `NDS.Panel.open(ref, { focus: false })`. A trigger press still focuses.
2. **Auto-show must not close another open panel** (single-open rule would shut the a11y panel mid-use). The UI waits: if `NDS.Panel` has an open panel, retry on its `nds:panel:closed`. No Panel change.

## Breaking — lands in v2.0.0, no legacy path

The next release is the major, so the old markup is removed, not aliased. Migration lines for the v2.0.0 notes:
- `_includes/cookie-popup.html` and the `#ndsCookiesPopup` card removed: the panel is built by JS. To customize, put your own `#ndsCookiesPanel` in the page.
- `#ndsCookiesAcceptBtn` / `DeclineBtn` / `CloseBtn` → `data-cookies-action="accept|reject"`; close is `data-panel-close`.
- `.nds-cookie-popup`, `.nds-cookie-popup-links`, `.nds-compact` removed → `.nds-cookies`; no compact layout, no default links.
- `data-accept-title/-message`, `data-decline-title/-message` removed: no toast; the done view's text is the `done` i18n key.
- `getConsent()` may return `'custom'`.
- `nds:cookies:consent` fires on `document`, not on `#ndsCookiesPopup`; a listener on the old popup element never runs.
- The cookie panel is `data-panel-static`: an outside click would otherwise close it, so it closes only through × or a choice.
- `NDS.Cookies.init()` removed from the core (the UI owns init).

## Commits

1. `fix(cookies)`: Reject clears trackers set on parent domains (`_ga` on `.example.com` survives today on `www.`).
2. `feat(panel)`: `open(ref, { focus: false })`.
3. `feat(cookies)!`: core split, categories, lazy UI bundle, template markup, Manage view. Tested in `playground.md` first.
4. `docs(cookies)`: the page rewrite. Structures Auto (default, no markup) and Manual (`<template class="nds-panel-template">`), each with an optional `[data-cookies-toggle]`.
5. TODO: tracker tick; release-notes lines (Added: Manage view, categories, `allowed()`, `save()`, lazy bundle. Migration: the list above).

## Open

- NDS IQ / consumer rules mention of cookies, if any, checked at commit 3.
- The 6 s delay stays.
