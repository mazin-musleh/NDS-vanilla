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
last_edit: "01/11/2026 - 08:07 PM"
---

<section id="weather-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A `.nds-weather` element shows the current weather for one place: an icon, the place's name, the conditions and the temperature in °C. You write the place's coordinates and, in `.nds-weather-city`, its name. The script writes the rest. A page can show any number of places. The [Top Bar](../ui-shell/topbar) can show one as an item.

The look is yours: the canon uses a [Meta](../components/meta) line, and any style of your own wins.

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
    <span class="nds-weather-city">Riyadh</span>
  </span>
</span>
</script>
<script type="text/html" id="weather-places" data-canon>
<span class="nds-meta">
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
| Structure | One place (default) | — | — | The weather for the place the service is for |
| Structure | Several places | canon `#weather-places` | — | The weather for each place a service covers, such as its branch cities. Each item has its own coordinates and name |
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
              <p class="nds-card-description">Elements on the same place share one request.</p>
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
- Where one markup serves every language, mark the name with `data-i18n`. Give its other languages in `window.NDS_I18N_LANGS`, as for any word of your own. See [Internationalization](../core/i18n). A page per language needs neither: write the name in that page's language.
- Show a few places at most. Each place is one request from each visitor.
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
| `.nds-weather` | Any inline element, such as a `span.nds-meta-item` | The item. The script writes the condition icon before the name, and the conditions and temperature after it |
| `.nds-weather-city` | A `span` in `.nds-weather` | Optional. The place's name, as the page's own text. The script keeps it, and puts `·` before the conditions |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-latitude`, `data-longitude` | `.nds-weather` | The place's coordinates. The default is Riyadh (24.7136, 46.6753) |
| `hidden` | `.nds-weather` | The script sets it when the request fails, and removes it when a request works |
{: .nds-table .nds-responsive}

The words come from the `weather` section of the [string pack](../core/i18n): the conditions, and the line with or without the place's name. A change of `lang` on `<html>` writes every item again, from the cache.

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
item.innerHTML = '<span class="nds-weather-city">Dammam</span>';
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

</div>
  </div>
</section>
