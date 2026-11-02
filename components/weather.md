---
layout: page
title: Weather
hero_title: Weather - National Design System
hero_description: The current weather for one or more places, from their coordinates.
breadcrumb: [["Components", "/components/?shelf=Components"]]
lang: en
direction: ltr
since: "1.12.x"
updated: "1.12.x"
last_edit: "02/11/2026 - 03:47 PM"
---

<section id="weather-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A `.nds-weather` element shows the current weather for one place. You write its markup, the place's coordinates and, in `.nds-weather-city`, its name. The script fills three slots: the icon, the conditions and the temperature. It changes nothing else, so the layout, the order and the words around the slots are yours. A page can show any number of places. The [Top Bar](../ui-shell/topbar) can show one as an item.

An element with no slots gets the auto line: the icon, the name, the conditions and the temperature with its unit, in the page language. The canon uses a [Meta](../components/meta) line, and the tile structure a [Card](../components/card).

Pick another component when:

- the page shows today's date: [Date](../components/date#date-today-markup)
- the page shows the time: [Clock](../components/clock)

</div>
  </div>
</section>

<section id="weather-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="weather-canon" data-canon data-variants="weather-variants-table">
<span class="nds-meta">
  <span class="nds-meta-item nds-weather" data-latitude="24.7136" data-longitude="46.6753">
    <i class="nds-icon nds-weather-icon" aria-hidden="true"></i>
    <span><span class="nds-weather-city">Riyadh</span> · <span class="nds-weather-condition">--</span>, <span class="nds-weather-temp">--</span>°C</span>
  </span>
</span>
</script>
<script type="text/html" id="weather-auto" data-canon>
<span class="nds-meta">
  <span class="nds-meta-item nds-weather" data-latitude="24.7136" data-longitude="46.6753">
    <span class="nds-weather-city">Riyadh</span>
  </span>
</span>
</script>
<script type="text/html" id="weather-places" data-canon>
<span class="nds-meta nds-col">
  <span class="nds-meta-item nds-weather" data-latitude="24.7136" data-longitude="46.6753">
    <span class="nds-weather-city">Riyadh</span>
  </span>
  <span class="nds-meta-item nds-weather" data-latitude="21.4858" data-longitude="39.1925">
    <span class="nds-weather-city">Jeddah</span>
  </span>
  <span class="nds-meta-item nds-weather" data-latitude="26.4207" data-longitude="50.0888">
    <span class="nds-weather-city">Dammam</span>
  </span>
</span>
</script>
<script type="text/html" id="weather-tile" data-canon>
<div class="nds-card nds-stroke nds-weather" data-latitude="21.4858" data-longitude="39.1925" style="--card-width: fit-content">
  <div class="nds-card-header">
    <div class="nds-card-featured-icon">
      <span class="nds-featured-icon nds-subtle"><i class="nds-icon nds-weather-icon" aria-hidden="true"></i></span>
    </div>
  </div>
  <div class="nds-card-content">
    <div class="nds-card-text">
      <span class="nds-card-title"><span class="nds-weather-temp">--</span>°C</span>
      <p class="nds-card-description"><span class="nds-weather-condition">--</span> in <span class="nds-weather-city">Jeddah</span></p>
    </div>
  </div>
</div>
</script>
    </div>
  </div>
</section>

<section id="weather-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Custom line (default) | — | — | The weather for one place, with the slots in your own line |
| Structure | Auto line | canon `#weather-auto` | — | No slots: the script writes the line in the page language, with its own punctuation and unit. Pick it when one markup serves every language |
| Structure | Several places | canon `#weather-places` | — | The weather for each place a service covers, such as its branch cities: one auto line per place, in a Meta column (`.nds-col`). Each item has its own coordinates and name |
| Structure | Tile | canon `#weather-tile` | — | The weather as a card of its own, such as on a service's home page. The same slots in a Card, as wide as its content: change the card freely |
{: #weather-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="weather-features" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <ul class="nds-list nds-grid nds-flat nds-divided nds-horizontal">
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-cloud" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Open-Meteo</span>
              <p class="nds-card-description">The weather comes from the public Open-Meteo service, with no key and no account. It renders again every 15 minutes while the tab shows.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-sun-03" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Day and Night</span>
              <p class="nds-card-description">The icon shows day or night at the place itself, as Open-Meteo reports it, not at the visitor's clock.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-database" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">One Request per Place</span>
              <p class="nds-card-description">Elements on the same place and unit share one request. The browser keeps each result for 14 minutes, so a page load or a language switch in that time sends no request.</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</section>

<section id="weather-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Set `data-latitude` and `data-longitude` to the place your service is for. The Riyadh default is wrong for a service in another region.
- Write the place's name in `.nds-weather-city`, so people know which place the weather is for. Without it, the element shows only the conditions and the temperature.
- Write a placeholder, such as `--`, in each text slot. It holds the line's width until the weather arrives.
- Write the unit after `.nds-weather-temp`, to match `data-weather-unit`: the script writes the number only.
- Your own words around the slots stay in one language. Where one markup serves every language, use the auto line, or mark your words with `data-i18n`.
- Where one markup serves every language, mark the name with `data-i18n`. Give its other languages in `window.NDS_I18N_LANGS`, as for any word of your own. See [Internationalization](../core/i18n). A page per language needs neither: write the name in that page's language.
- Show a few places at most. Each place is one request from each visitor, at most once every 14 minutes.
- In the [top bar](../ui-shell/topbar), the weather is one of the two items DGA allows.

</div>
  </div>
</section>

<section id="weather-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `.nds-weather` | Any element, such as a `span.nds-meta-item` or a `.nds-card` | The item. The script fills its slots and changes nothing else. With no slot, it writes the auto line |
| `.nds-weather-icon` | An `i.nds-icon` in `.nds-weather` | Slot. The script adds the icon class for the conditions, by day or night |
| `.nds-weather-condition` | A `span` in `.nds-weather` | Slot. The script writes the conditions, such as "Clear", in the page language |
| `.nds-weather-temp` | A `span` in `.nds-weather` | Slot. The script writes the temperature as a whole number, in the unit `data-weather-unit` picks, with no unit sign |
| `.nds-weather-city` | A `span` in `.nds-weather` | Optional. The place's name, as the page's own text. The script never writes it |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-latitude`, `data-longitude` | `.nds-weather` | The place's coordinates. The default is Riyadh (24.7136, 46.6753) |
| `data-weather-unit` | `.nds-weather` | `c` (the default) for Celsius, `f` for Fahrenheit. The weather service sends the temperature in that unit, and the auto line writes its sign |
| `hidden` | `.nds-weather` | The script sets it when the request fails, and removes it when a request works |
{: .nds-table .nds-responsive}

The words come from the `weather` section of the [string pack](../core/i18n): the conditions, and the auto line with or without the place's name. A change of `lang` on `<html>` writes every item again, from the cache.

### JavaScript
{: .nds-block-title}

`NDS.Weather` loads after the page shows. Until it loads, a call to it loads it and returns a promise.

| Method | Effect |
|---|---|
| `NDS.Weather.init()` | Writes every item on the page, from the cache or a new request. Renders them again every 15 minutes. The loader runs it when an item is on the page. `NDS.init.mount()` runs it on markup added later |
{: .nds-table .nds-responsive}

<script type="text/html" id="weather-js" data-canon data-lang="js" data-preview="none">
// Add a place after load, then let NDS fill it
const item = document.createElement('span');
item.className = 'nds-meta-item nds-weather';
Object.assign(item.dataset, { latitude: '26.4207', longitude: '50.0888' });
item.innerHTML = '<i class="nds-icon nds-weather-icon" aria-hidden="true"></i> <span><span class="nds-weather-city">Dammam</span> · <span class="nds-weather-condition">--</span>, <span class="nds-weather-temp">--</span>°C</span>';
document.querySelector('#branch-weather').append(item);
NDS.init.mount(item);
</script>

The full API is in the banner of `_js/nds-weather.js`.

</div>
  </div>
</section>

<section id="weather-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Top Bar](../ui-shell/topbar): shows the weather as one of its items.
- [Meta](../components/meta): the line the canon uses.
- [Card](../components/card): the box the tile structure uses.

</div>
  </div>
</section>
