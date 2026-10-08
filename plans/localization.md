# Localization

Owner decision (2026-10-08): every component uses `NDS.i18n` and its own `assets/i18n/<component>/{en,ar}.json`, the way accessibility does. One mechanism, no inline `{ ar, en }` dicts, no `isArabic ? … : …` text.

## Today

- ~20 files carry inline `{ ar, en }` dicts or `isArabic ? … : …` ternaries (~215 strings). Four use `NDS.i18n.load()` and JSON: accessibility, cookie-consent, ipv, session-timeout.
- ~22 strings have no Arabic at all: date-picker popup labels and buttons, alert Close, dropmenu search, breadcrumb More, swiper bullets, rating stars, tooltip, chart, export, forms Loading and Show/Hide password, upload Remove file, tables Column N.
- No third language and no override for the ~20 inline files.
- Language comes from three places: `<html lang>` (most), `closest('[lang]')` (countdown), `data-lang` / the input's `lang` (date-picker).

## The pattern (cookie-consent's, for every component)

```js
// English defaults; assets/i18n/pagination/{lang}.json overrides them.
const STR = { prev: 'Previous page', page: 'Page {n}' };
let strings = null;
const loadStrings = () => strings || (strings = NDS.i18n.load('pagination', [])
    .then(data => { NDS.i18n.safeMerge(STR, data); }));
```

- `loadStrings()` runs at init. Text is read from `STR` when it is built, so anything built later (validation messages, announcements, toasts, popups, menus) is already in the page's language.
- `en.json` holds the same English as the JS defaults. The JS copy is the fallback when the fetch fails; `scripts/check-i18n.mjs` keeps the two equal.
- A third language = drop a `<lang>.json` in each folder. `window.NDS_I18N.<component>` stays the inline override (SPAs).
- Markup that carries `data-i18n` / `data-i18n-attr` keeps working through `NDS.i18n.apply`.

## Core additions (`_js/nds-core.js`)

- **One fetch per component per page.** `load()` keeps the promise per component, so 30 pagination instances make one request.
- **`NDS.i18n.format(str, vars)`**: fills `{name}` from `vars`. A value may be an object of `Intl.PluralRules` categories (`{ one, two, few, many, other }`), picked by `vars.n`. Replaces the hand-rolled Arabic dual in forms (`nds-forms.js:520`).
- **Element language** (`closest('[lang]')`) only where a component reads it today (countdown, date-picker); the rest follow `<html lang>`.
- **Removed in v2:** `NDS.langKey` (no reader is left). `NDS.isArabic` stays for non-text uses (letter-spacing, default calendar).

## Text that shows at first paint: the skeleton holds it

Owner decision (2026-10-08): the component shows its loading skeleton until its strings arrive, so an Arabic page never flashes English.

- Core does it, once: `NDS.i18n.load(component, scopes)` adds `loading` to each scope's `data-state` and removes it after the strings apply (or the fetch fails, so English shows). A scope that already carries `loading` (the page's own data fetch) keeps it: core removes only what it added.
- Pass scopes only where visible text is written at init: expandable Show More, empty state, time-picker labels, filter "All", editor toolbar, the accessibility button. A hold scope with no skeleton gets one (owner, 2026-10-08), in the sweep commit that adds its hold. Likely missing, check each in the browser: empty state, time-picker, the filter "All" radio, the accessibility panel. Likely covered: expandable (its button rides `.nds-btn`), the accessibility button (FAB), the editor.
- Text built later (validation, announcements, toasts, popups, menus) and aria-labels need no hold: nobody sees them before the file lands. They call `load(component)` with no scope.
- The request is cached, so the hold is one round trip on the first page and near zero after.

## Steps

1. **Core**: the promise cache, `format()`, the skeleton hold, `check-i18n.mjs` (every `ar.json` has the `en.json` keys; `en.json` equals the JS defaults; no `isArabic ?` / `NDS.langKey` text pick left in `_js/`).
2. **Sweep**, main bundle first, one commit per group: forms · pagination, expandable, empty, dropmenu, alert, breadcrumb, tooltip, swiper, rating · autocomplete, multiselect, taginput, password, upload, voice-input · date-picker, time-picker, timeDate · filter, tables, copy, user-feedback, export, chart · editor. Each English-only string gets its Arabic in the same pass. Mechanical files go to a Sonnet agent; review here.
3. **Carried TODO items**: Motor Impaired description (accessibility), swiper bullet "Go to page N", the upload check messages.
4. **Docs**, one pass at the end: a new `core/i18n.md` titled Internationalization (`/nds-doc`), beside Date, Refresh and Request. It holds one table of every component and its `assets/i18n/` folder, so the component pages need no edit. Fold `assets/i18n/README.md` into it. A Core child in `_data/sidemenu/sidemenu.yml`, a `category: "Core"` card in `_data/content/components.yml` (copy Date's keys), Migration lines (`NDS.langKey`).
5. **NDS IQ**: a rule line joins the end-of-rewrite IQ pass (on its branch).

## Out of scope

- Event packs (`_js/events/`): campaign text with `-ar` / `-en` attribute pairs, owned per pack.
- `cityWeather` condition words: converts in the sweep only if trivial.
- Re-rendering text already on the page when `<html lang>` changes at runtime.
- `nds-audit.js` console text, `nds-docs.js` doc chrome.
