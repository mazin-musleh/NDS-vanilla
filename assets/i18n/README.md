# NDS i18n

Per-component translation files. Each subdirectory is one component; each
`{lang}.json` file inside it is one language. The active language is read
from `<html lang="…">` (BCP-47 base — `ar-SA` → `ar`, `en-US` → `en`).

```
assets/i18n/
  accessibility/
    en.json     ← canonical reference, all keys required
    ar.json
    fr.json     ← drop in to add French; auto-detected
  …             ← any number of components
```

## Adding a language

1. Copy `{component}/en.json` to `{component}/{lang}.json`.
2. Translate every value. English is canonical; missing keys keep their
   English fallback for that one element.
3. Set `<html lang="{lang}">` on the consuming page. Done.

No bundle rebuild, no source edits, no Jekyll required.

## Override hooks

All three are read once at module load, before any fetch. Set them in the
page `<head>` BEFORE the JS bundle loads.

- `window.NDS_I18N = { '{component}': {…}, … }`
  Inline strings keyed by component name. Skips fetch entirely — useful
  for SPAs and SSR setups that prefer to inline translations rather than
  ship JSON files.

- `window.NDS_I18N_PATH = 'https://i18n.example.com/'`
  Override the i18n directory only. Highest-priority override for the
  i18n path. Trailing slash required.

- `window.NDS_ASSETS_BASE = 'https://cdn.example.com/v1/assets/'`
  Override the entire assets directory (where the bundle and its sibling
  data files live). i18n becomes `${NDS_ASSETS_BASE}i18n/`. Use this for
  CDN deployments, custom mount points, or sub-app deployments where the
  auto-derived base from the script src isn't right. Trailing slash
  required.

### Path resolution order (for i18n)

1. `window.NDS_I18N_PATH` (if set)
2. `window.NDS_ASSETS_BASE + 'i18n/'` (if set)
3. Auto-derived from the bundle's own `<script src>` (e.g. `/site/assets/js/nds-main.min.js` → `/site/assets/i18n/`)
4. `'assets/i18n/'` (page-relative fallback if the bundle was loaded inline or via an unrecognized path)

## Authoring rule

`en.json` is the **schema of record** and the **runtime fallback**. Every
other `{lang}.json` mirrors its keys. Adding a new key means: add it to
`en.json`, propagate to every sibling locale, then update the consuming
HTML/JS. Locale files don't need to stay literally identical — they may
carry `exclude_controls` (a list of locale-specific tile removals) and
other component-defined flags documented in each component's own
`README.md`.

If the active locale's file is missing or 404s, the loader falls back to
`en.json` automatically — so a consumer who ships only `en.json` for a
new component still gets a working component on every `<html lang>`,
just rendered in English.

## How a component opts in

In its JS, at module init:

```javascript
NDS.i18n.load('{component}', '{root-selector}')
    .then(data => { /* component-specific work, e.g. iterate arrays */ });
```

In its HTML, alongside baked-in English defaults:

```html
<span class="nds-label" data-i18n="some_key">English fallback</span>
<button data-i18n-attr="aria-label:close_label,title:close_label">…</button>
```

`NDS.i18n.apply` walks `[data-i18n]` (text content) and `[data-i18n-attr]`
(comma-separated `attr:key` pairs) within the passed scope(s). Anything
structured (arrays of items, conditional removals) the component handles
itself off the returned data.
