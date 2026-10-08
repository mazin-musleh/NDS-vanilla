# Localization

Owner decisions (2026-10-08): every component reads its text through `NDS.i18n`; no inline `{ ar, en }` dicts, no `isArabic ? … : …` text. The text lives in one pack per language, `assets/i18n/{lang}.json`, keyed by component. Accessibility keeps its own folder (`assets/i18n/accessibility/`) as an add-on; it may move into the pack later.

## Today

- ~20 files carry inline `{ ar, en }` dicts or `isArabic ? … : …` ternaries (~215 strings). Four used `NDS.i18n.load()` and per-component JSON: accessibility, cookie-consent, ipv, session-timeout.
- ~22 strings have no Arabic at all: date-picker popup labels and buttons, alert Close, dropmenu search, breadcrumb More, swiper bullets, rating stars, tooltip, chart, export, forms Loading and Show/Hide password, upload Remove file, tables Column N.
- Language comes from three places: `<html lang>` (most), `closest('[lang]')` (countdown), `data-lang` / the input's `lang` (date-picker).

## Why one pack (measured 2026-10-08)

Arabic pages, slow-4G + 6.6× CPU, mobile, 600 s cache like Pages, A/B interleaved (`tmp/i18n-ab/measure.mjs`):

| Page (visit) | Per-component files: holds, total ms | One pack |
|---|---|---|
| Pagination (warm) | 2, 311 | 0 |
| Expandable (warm) | 3, 82 | 0 |
| Empty (warm) | 3, 414 | 1, 10 |
| Forms (warm) | 5, 753 | 0 |

- 3–4 i18n requests per page → 1. All strings landed ~2× sooner (home 5.4 → 2.7 s, forms 4.0 → 1.8 s).
- Reveal unchanged: cold home 3.40 s vs 3.44 s, median of 7, inside run noise.
- Per-component files skeleton every page view, even cached: each component fetches only at its own init. The pack starts at core eval, so most components init after it landed.
- Cost: every page downloads all the text once (3.6 KB gz for 13 components; ~6 KB when the sweep ends). `check-i18n.mjs` fails a pack over 12 KB gz; past that, split the lazy bundles' sections into their own pack.

## The pattern

```js
// English defaults; assets/i18n/{lang}.json overrides them.
const S = NDS.i18n.strings('pagination', { prev: 'Previous page', page: 'Page {n}' });
S.t('page', { n: 3 });                 // text now
S.set(el, 'aria-label', 'prev');       // write now, re-write when the pack lands if unchanged
S.load(scope);                         // init: visible text — scope holds its skeleton until it lands
```

- Lookup: `window.NDS_I18N.<component>` → the pack section → the component's own `assets/i18n/<component>/<lang>.json` (accessibility, a site's own component) → the JS default. A missing language file falls back to `en`.
- The pack and own files carry the bundle's `?ver=`, so a release never serves stale text.
- The JS defaults equal the `en` section; `scripts/check-i18n.mjs` keeps them equal.
- A third language = one `assets/i18n/{lang}.json`.
- Markup that carries `data-i18n` / `data-i18n-attr` keeps working through `NDS.i18n.apply`.
- `NDS.i18n.format(str, vars)` fills `{name}`; a plural value is an object of `Intl.PluralRules` categories picked by `vars.n`.
- **Removed in v2:** `NDS.langKey`. `NDS.isArabic` stays for non-text uses (letter-spacing, default calendar).

## Text that shows at first paint: the skeleton holds it

Owner decision (2026-10-08): a component shows its loading skeleton until its strings arrive, so an Arabic page never flashes English.

- `NDS.i18n.load(component, scopes)` adds `loading` to each scope's `data-state` and removes it once the strings apply (or the fetch fails, so English shows). A scope already loading keeps it.
- Scopes only where visible text is written at init: expandable Show More, empty state, time-picker labels, filter "All", editor toolbar, the accessibility button. A hold scope with no skeleton gets one (owner, 2026-10-08), in the commit that adds its hold: empty state done; check time-picker, the filter "All" radio, the accessibility panel.
- Text built later and aria-labels need no hold: `S.t()` / `S.set()`.

## Steps

1. [x] **Core** (`4df112e3`): skeleton hold, `format()`, `check-i18n.mjs`.
2. **Sweep**, one commit per group. Each English-only string gets its Arabic in the same pass.
   - [x] forms · pagination, expandable, empty, dropmenu, alert, breadcrumb, tooltip, swiper, rating · the pack (cookies, ipv, session-timeout moved in)
   - [x] autocomplete, multiselect, taginput, password, upload, voice-input (file sizes name their unit through `Intl`)
   - [ ] date-picker, time-picker, timeDate
   - [ ] filter, tables, copy, user-feedback, export, chart, cityWeather
   - [ ] editor
3. **Carried TODO items**: [ ] Motor Impaired description (accessibility), [x] swiper bullet "Go to page N", [x] the upload check messages (templates, so word order follows the language).
4. **Docs**, one pass at the end: a new `core/i18n.md` titled Internationalization (`/nds-doc`), beside Date, Refresh and Request: the pack, the lookup order, the override, adding a language, the skeleton hold. Fold `assets/i18n/README.md` into it. The four pages that name the old folders (accessibility, cookies, ipv, session-timeout). A Core child in `_data/sidemenu/sidemenu.yml`, a `category: "Core"` card in `_data/content/components.yml` (copy Date's keys). Migration lines: `NDS.langKey` removed; `assets/i18n/{cookies,ipv,session-timeout}/` moved into `assets/i18n/{lang}.json` sections (a site that edited or added a file there moves it into the pack; `window.NDS_I18N` is unchanged).
5. **NDS IQ**: a rule line joins the end-of-rewrite IQ pass (on its branch).

## Out of scope

- Event packs (`_js/events/`): campaign text with `-ar` / `-en` attribute pairs, owned per pack.
- `cityWeather` condition words: converts in the sweep only if trivial.
- Re-rendering text already on the page when `<html lang>` changes at runtime.
- `nds-audit.js` console text, `nds-docs.js` doc chrome.
