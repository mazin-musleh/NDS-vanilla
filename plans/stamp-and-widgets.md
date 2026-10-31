# Digital Stamp and Top Bar Widgets — plan (v2.0.0)

Status (2026-10-31): planned, nothing built. Wait until the sessions working on the same files are done.

## Why

Both are locked to one place on the page.

1. **The stamp's push-down is stuck inside the stamp.** `nds-digital-stamp.js` finds one tab (`.nds-digital-stamp-tab`) and one panel (`#nds-digital-stamp`). The open/close itself (an in-flow panel that slides down under the top bar, outside click, Escape) is useful for other top bar content, and nothing else can use it.
2. **The widgets are ids.** `#nds-date`, `#nds-real-time-clock`, `#nds-weather-info`, `#nds-city-name`: one of each per page, only where the top bar puts them. Weather will not start without the city. A line of three cities' weather is impossible.
3. **No page of their own.** The stamp and the widgets live inside `ui-shell/topbar.md`.

## Decided (owner, 2026-10-31)

- **The top bar gets its own expander. Not Panel.** Panel floats over the page (`position: fixed`); the expander sits in the page and pushes it down. Different UI: never ride `nds-panel` or Accordion.
- **One expander open at a time.** Opening one closes the other. A "stay open" option can come later without breaking anything; the reverse could not.
- **The stamp is one use of the expander,** with its own doc page.
- **A widget brings data, not a look.** Meta is one look, not a rule: the author styles a widget as a Meta item, plain text, a card, anything.
- **No Widgets page.** Each widget goes where its kind already lives:
  - Date and Clock → `core/date.md` (the `<time>` that page already covers, shown live).
  - Weather → its own small page, `components/weather.md`, like Date Tile.
- **City is not a widget.** Its only job was naming the weather's city, and the author already knows the city (they wrote the coordinates). The name moves onto the weather item. A place on its own (an office, a venue) is a plain Meta item with a pin icon. The Nominatim lookup is deleted.
- v2 renames: a Migration line, no alias.

## Shape

**Expander** (owned by the top bar):

```html
<div class="nds-topbar …">
  <button class="nds-btn … nds-digital-stamp-tab" aria-expanded="false" aria-controls="nds-digital-stamp" data-topbar-toggle>…</button>
  …
</div>
<div id="nds-digital-stamp" class="nds-topbar-panel" role="region" aria-label="…" hidden>
  <div class="nds-content-wrapper">…the stamp's content…</div>
</div>
```

- `.nds-topbar-panel` takes the stamp's grid-rows slide and its `data-state` lifecycle (open · opening · closing), moved from `_digital-stamp.scss` to `_topbar.scss`.
- `_digital-stamp.scss` keeps only the stamp's content looks (cards, icon, register row, tab text).

**Date and Clock** (on `core/date.md`):

```html
<span class="nds-meta-item"><i class="nds-icon nds-hgi-calendar-03" aria-hidden="true"></i><time data-date-today data-calendar="hijri"></time></span>
<span class="nds-meta-item"><i class="nds-icon nds-hgi-clock-01" aria-hidden="true"></i><time data-date-clock></time></span>
```

- The script writes the `<time>`'s `datetime` and text only. The icon and the look are the author's.
- The clock keeps today's fixed `h:mm AM` format: no new hour tokens in `NDS.Date.format` (YAGNI).

**Weather** (`components/weather.md`):

```html
<span class="nds-meta">
  <span class="nds-meta-item nds-weather" data-weather-latitude="24.7136" data-weather-longitude="46.6753" data-weather-city="Riyadh" data-weather-city-ar="الرياض"></span>
  <span class="nds-meta-item nds-weather" data-weather-latitude="21.4858" data-weather-longitude="39.1925" data-weather-city="Jeddah" data-weather-city-ar="جدة"></span>
</span>
```

- The script writes the condition icon and "Riyadh · 30° Clear" into each `.nds-weather`. The icon follows the weather, so the script owns it; the look does not.
- Every `.nds-weather` on the page, each with its own coordinates. The cache key is already per coordinates.

**Hook names above are a draft.** Check each against `_js/js.md` (`data-{component}-{part}`) before building.

## Steps

1. **Expander.** New `_js/nds-topbar.js` → `NDS.Topbar` (`init`, `open(idOrEl)`, `close(idOrEl)`, `toggle(idOrEl)`, `isOpen(idOrEl)`; events `nds:topbar:opened` / `nds:topbar:closed`, detail `{panel}`). Move the open/close, outside click and Escape from `nds-digital-stamp.js`, made per panel with one-open-at-a-time. Loader entry `Topbar` on `[data-topbar-toggle]`, replacing `DigitalStamp`.
2. **Stamp on the expander.** `_includes/topbar.html`: the tab gets `data-topbar-toggle`, the panel gets `.nds-topbar-panel`. `nds-digital-stamp.js` shrinks to its strings and `pickDomain()`; check whether it still needs its own init or can run from the Topbar's. Drop `NDS.DigitalStamp` and the `nds:digital-stamp:*` events.
3. **Date and Clock.** Move them from `nds-time-date.js` into `nds-date.js` (or keep the file, with the hooks changed: pick by size). Every `time[data-date-today]` / `time[data-date-clock]`, not one id. Keep: midnight re-render, minute tick, pause while hidden, skip a widget hidden by `data-hidden`.
4. **Weather.** Rename `nds-city-weather.js` → `nds-weather.js`, `NDS.CityWeather` → `NDS.Weather`. Loop every `.nds-weather`. Delete `syncCity()` and the Nominatim call. i18n section `city-weather` → `weather` (packs unreleased: no Migration row).
5. **Top bar markup.** `_includes/topbar.html` widgets move to the new hooks. Keep the DGA cap of 2 and `data-hidden`. Check `.nds-topbar-info > .nds-meta` styling still lands.
6. **Docs, in one pass** (nds-doc skill):
   - `ui-shell/digital-stamp.md`: new page.
   - `ui-shell/topbar.md`: the expander (its own part), widget chips stay (limit 2) and link out to Date and Weather; drop the stamp detail and the Widget Ids table.
   - `core/date.md`: a Today and Clock section, options in its builder.
   - `components/weather.md`: new page, with multi-city weather as a builder structure.
   - `ui-shell/header.md`: the `#nds-digital-stamp` row.
   - Registration: `_data/catalog.yml` (Clock → `core/date`, Weather Widget → `components/weather`, DGA Digital Stamp → `ui-shell/digital-stamp`), sidemenu, `NDS-INDEX.md`, README's stamp link.
7. **Ledgers.** `_data/migrations.yml` rows (2.0.0): ids `nds-date`, `nds-real-time-clock`, `nds-weather-info`, `nds-city-name`; attributes `data-latitude`, `data-longitude`, `data-city`, `data-city-en`; api `NDS.CityWeather`, `NDS.TimeDate`, `NDS.DigitalStamp`; events `nds:digital-stamp:opened` / `closed`; storage `city_v2_*`. CHANGELOG `[Unreleased]`.
8. **Build and check.** `ruby _plugins/js_processor.rb`, `python scripts/check-css.py`, `python scripts/check-data-state-tails.py` (the expander's `[data-state]` rules), `check-docs.py` on each page, then the top bar in a browser: stamp opens, closes, Esc, outside click; two expanders swap; widgets on desktop, tablet, phone; language switch.

## Dependents to update

From a grep on 2026-10-31: `_js/nds-loader.js` (3 entries), `_js/nds-core.js:1547` (comment names `nds-city-weather.js`), `_data/catalog.yml`, `_data/i18n.json`, `assets/i18n/*.json`, `_i18n/ar.json`, `ui-shell/topbar.md`, `ui-shell/header.md`, `core/i18n.md`, `README.md`, `SECURITY.md`, `NDS-INDEX.md`, the nds-js-audit skill files (GROUPS, PERSONA, RULES), `_includes/NDS-IQ-draft.md` if it names them (load nds-iq-eval first). Grep again before step 1: other sessions are changing these files.

## Later

- A "stay open" option on the expander, if a real page needs two strips at once.
- A multi-day forecast on Weather, if asked.
