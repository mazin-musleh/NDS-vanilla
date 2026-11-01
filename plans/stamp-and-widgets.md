# Digital Stamp, Top Bar Expander and Widgets — plan (v2.0.0)

Status (2026-11-01): built, with the docs (topbar, digital-stamp, weather, date). Owner change while building: a new expander waits until the open one has slid closed (main nav's queue). Check: `scripts/check-topbar.mjs`. Open: PERSONA entry 5 still cites the deleted `nds-time-date.js` latches (needs an `evolve` go).

## Why

Both are locked to one place on the page.

1. **The stamp's push-down is stuck inside the stamp.** `nds-digital-stamp.js` finds one tab (`.nds-digital-stamp-tab`) and one panel (`#nds-digital-stamp`). The open/close (an in-flow strip that slides down under the top bar, outside click, Escape) is useful for other top bar content, and nothing else can use it.
2. **The widgets are ids.** `#nds-date`, `#nds-real-time-clock`, `#nds-weather-info`, `#nds-city-name`: one of each per page, only where the top bar puts them. Weather will not start without the city. A line of three cities' weather is impossible.
3. **No page of their own.** The stamp and the widgets live inside `ui-shell/topbar.md`.
4. **Weather is old code.** One element, the visitor's clock for day and night, inline `display: none`, a reverse-geocode call the coordinates make pointless.

## Decided (owner, 2026-10-31 and 2026-11-01)

- **The top bar gets its own expander, as an API. Not Panel.** Panel floats over the page (`position: fixed`); the expander sits in the page and pushes it down. Never ride `nds-panel` or Accordion.
- **Any number of expanders, each with its own toggle.** The stamp is the only one today.
- **One expander open at a time.** Opening one closes the other. A "stay open" option can come later without breaking anything; the reverse could not.
- **The stamp is one use of the expander,** with its own doc page.
- **A widget brings data, not a look.** The author styles it as a Meta item, plain text, a card, anything.
- **Each widget stands alone,** so each can grow on its own:
  - **Today is not a component.** Core Date already writes a `<time>` from its `datetime` (`core/date.md`, Markup Dates). Core gains a "today" value; the Today docs are a section on `core/date.md`.
  - **Clock**: its own file (it ticks, and core Date has no time tokens), its docs a section on `core/date.md` beside Today (owner, 2026-11-01).
  - **Weather**: reworked, its own file and page, `components/weather.md`.
- **City is not a widget.** The author already knows the city (they wrote the coordinates). The name moves onto the weather item. A place on its own is a plain Meta item with a pin icon. The Nominatim lookup is deleted.
- v2 renames: a Migration line, no alias.

## Shape

Hook names are a draft: check each against PERSONA entry 12 rule 5 (`data-*` hooks) before building.

### Expander (owned by the top bar)

```html
<div class="nds-topbar …">
  <button type="button" class="nds-btn … nds-digital-stamp-tab" aria-expanded="false" aria-controls="nds-digital-stamp" data-topbar-toggle>…</button>
  …
</div>
<div id="nds-digital-stamp" class="nds-topbar-expander" role="region" aria-label="…" hidden>
  <div class="nds-content-wrapper">…the stamp's content…</div>
</div>
```

- **Class `nds-topbar-expander`, not `nds-topbar-panel`:** "panel" already means Panel, the component this is not (entry 12, rule 4).
- The toggle's `aria-controls` names its expander; `data-topbar-toggle` marks the buttons the Topbar wires.
- `.nds-topbar-expander` takes the stamp's grid-rows slide and its `data-state` lifecycle (open · opening · closing), moved from `_digital-stamp.scss` to `_topbar.scss`. `_digital-stamp.scss` keeps only the stamp's content looks.
- `NDS.Topbar`: `init`, `open(idOrEl)`, `close(idOrEl)`, `toggle(idOrEl)`, `isOpen(idOrEl)` (entry 3.1: one open at a time). Events `nds:topbar:opened` / `nds:topbar:closed`, bubbling from the expander; detail keys per entry 12 rule 10 (`topbar`, `expander`).
- `open()` calls `init()` first, as the stamp does today: the loader stub replays an early `open()` on a page not wired yet.
- New content later: the author writes the markup and calls `init()`. No JS builder (YAGNI).
- Drop the tab's `role="button"`: it is a `<button>`.

### Stamp

- `nds-digital-stamp.js` keeps its strings and `pickDomain()`, which must still run on every page with a stamp.
- **`NDS.DigitalStamp` keeps `init()` only** (loader on `#nds-digital-stamp`). `open`, `close`, `toggle`, `isOpen` and the `nds:digital-stamp:*` events go; their Migration rows point to `NDS.Topbar.open('nds-digital-stamp')` and `nds:topbar:*`.

### Today (core Date)

```html
<span class="nds-meta-item"><i class="nds-icon nds-hgi-calendar-03" aria-hidden="true"></i><time data-date-today data-calendar="hijri" data-date-format="long"></time></span>
```

Core Date (`nds-date.js`, main bundle: keep it to a few lines) gains:

1. **`data-date-today`**: a `<time>` with it gets today's `datetime` (in the site's timezone), then `fill()` writes it as any Markup Date.
2. **The midnight re-render**: one timer for every `time[data-date-today]`, at the site's midnight (move `scheduleMidnight()` from `nds-time-date.js`).
3. **A long date that follows the language.** Today's top bar puts the day first in Arabic (`time-date.hijri_format`); a fixed `data-date-format` cannot. Core gains a `long` format preset from the `date` string pack, per language. Match today's output first (Hijri: no weekday; Gregorian: with weekday) or settle one shape.

Check first: does a language switch write Markup Dates again? If not, fix it in core for every `<time>`, not only Today. Today's widget skips a date hidden by `data-hidden` (a phone paid the Hijri formatter for hidden text); core does not. Measure on a phone; add the skip only if it costs.

### Clock (`_js/nds-clock.js`, delegated bundle)

```html
<span class="nds-meta-item"><i class="nds-icon nds-hgi-clock-01" aria-hidden="true"></i><time class="nds-clock"></time></span>
```

- `NDS.Clock`: every `time.nds-clock`, not one id. The script writes the `<time>`'s `datetime` and text only.
- Keep: the minute tick aligned to the minute, the pause while the tab is hidden, the skip for a clock hidden by `data-hidden`, `<html data-timezone>`.
- Keep today's `h:mm AM` format (YAGNI). Later, on its own: a time zone per clock, 24-hour, Arabic digits.

### Weather (`_js/nds-weather.js`, delegated bundle)

```html
<span class="nds-meta">
  <span class="nds-meta-item nds-weather" data-latitude="24.7136" data-longitude="46.6753" data-city="الرياض" data-city-en="Riyadh"></span>
  <span class="nds-meta-item nds-weather" data-latitude="21.4858" data-longitude="39.1925" data-city="جدة" data-city-en="Jeddah"></span>
</span>
```

- `NDS.Weather` (was `NDS.CityWeather`): every `.nds-weather`, each with its own coordinates.
- **Names:** on its own element a hook is named for what it sets (rule 5), so the attributes keep today's names and meanings: `data-latitude`, `data-longitude`, `data-city` (Arabic), `data-city-en`. The plan's first draft (`data-weather-city` + `data-weather-city-ar`) flipped the language, so old markup would show the wrong one.
- **Day or night from the API:** `current_weather.is_day`, not the visitor's clock (wrong for a city in another zone).
- **One request per coordinates:** two items on the same city share the request in flight and the cache entry. One 15-minute timer for all.
- **A failed fetch sets `hidden`**, not inline `display: none`.
- **One i18n string for the line**, such as `{city} · {temp}° {desc}`. The section `city-weather` becomes `weather` (packs unreleased: no Migration row).
- The script writes the condition icon (it follows the weather) and the text; the look is the author's.
- Delete `syncCity()` and the Nominatim call.

## Steps

1. **Expander.** `_js/nds-topbar.js` → `NDS.Topbar`. Move the open/close, outside click and Escape from `nds-digital-stamp.js`, per expander, one open at a time. Loader entry `Topbar` on `[data-topbar-toggle]`. `_topbar.scss` takes the slide.
2. **Stamp on the expander.** `_includes/topbar.html`: the tab gets `data-topbar-toggle`, the panel `.nds-topbar-expander`. `nds-digital-stamp.js` shrinks to its strings, `pickDomain()` and `init()`.
3. **Today in core.** `data-date-today`, the midnight timer, the `long` preset, the language-switch check.
4. **Clock.** `nds-time-date.js` → `nds-clock.js`, every `time.nds-clock`. The Today half of the file leaves for core; the file is gone.
5. **Weather.** `nds-city-weather.js` → `nds-weather.js`, reworked as above.
6. **Top bar markup.** `_includes/topbar.html` widgets move to the new hooks. Keep the DGA cap of 2 and `data-hidden`. Check `.nds-topbar-info > .nds-meta` styling still lands. `site.city_latitude` / `city_longitude` in `_config.yml` feed the weather item.
7. **Docs, in one pass** (nds-doc skill):
   - `ui-shell/digital-stamp.md`: new page.
   - `ui-shell/topbar.md`: the expander as its own part (API, adding one), widget chips stay (limit 2) and link out; drop the stamp detail and the Widget Ids table.
   - `core/date.md`: Today and Clock sections, `data-date-today`, `long` and `nds-clock` in its tables and builder.
   - `components/weather.md`: new page; multi-city weather as a builder structure.
   - `ui-shell/header.md`: the `#nds-digital-stamp` row.
   - Registration: `_data/catalog.yml` (Clock → `core/date`, Weather Widget → `components/weather`, DGA Digital Stamp → `ui-shell/digital-stamp`), sidemenu, `NDS-INDEX.md`, README's stamp link.
8. **Ledgers.** `_data/migrations.yml` rows (2.0.0), only names template users wrote: ids `nds-date`, `nds-real-time-clock`, `nds-weather-info`, `nds-city-name`; api `NDS.CityWeather` → `NDS.Weather`, `NDS.TimeDate` → `NDS.Clock` and `data-date-today`, `NDS.DigitalStamp.open/close/toggle/isOpen` → `NDS.Topbar`; events `nds:digital-stamp:opened` / `closed` → `nds:topbar:*`. No row for the weather attributes (same names, on `.nds-weather`), the i18n sections, or the cache keys. CHANGELOG `[Unreleased]`.
9. **Build and check.** `ruby _plugins/js_processor.rb`, `python scripts/check-css.py`, `python scripts/check-data-state-tails.py` (the expander's `[data-state]` rules), `check-docs.py` on each page, then the top bar in Chrome and WebKit: the stamp opens, closes, Esc, outside click; two expanders swap; a second expander added after load; two weather items on one city make one request; widgets on desktop, tablet, phone; language switch.

## Dependents to update

From a grep on 2026-10-31: `_js/nds-loader.js` (3 entries), `_js/nds-core.js:1547` (comment names `nds-city-weather.js`), `_plugins/js_processor.rb` (delegated bundle list), `_data/catalog.yml`, `_data/i18n.json`, `assets/i18n/*.json`, `_i18n/ar.json`, `ui-shell/topbar.md`, `ui-shell/header.md`, `core/i18n.md`, `README.md`, `SECURITY.md` (open-meteo, Nominatim), `NDS-INDEX.md`, the nds-js-audit skill files (GROUPS, PERSONA, RULES), `_includes/NDS-IQ-draft.md` if it names them (load nds-iq-eval first). Grep again before step 1: other sessions are changing these files.

## Later

- A "stay open" option on the expander, if a real page needs two strips at once.
- Clock: a time zone per clock, 24-hour, Arabic digits.
- Weather: a multi-day forecast, if asked.
