---
layout: page
title: Top Bar
hero_title: Top Bar - National Design System
hero_description: A slim bar above the main navigation with the DGA digital stamp, optional date, clock and weather widgets, and the dark mode toggle.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "10/10/2026 - 05:28 PM"
---

<section id="topbar-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

The top bar is the first strip of every page. On the start side, the digital stamp tab tells people the site is a registered government website. The tab opens the stamp panel below the bar, which explains how to check the site and shows its DGA registration number. On the end side, up to two widgets show the date, the time or the weather, next to the dark mode button.

The top bar is a page shell part. The preview shows it in a frame of its own, so it does not clash with this page's own top bar.

The main navigation belongs in the [Header](../ui-shell/header), and the links at the end of the page in the [Footer](../ui-shell/footer).

</div>
  </div>
</section>

<section id="topbar-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="topbar-canon" data-canon data-preview="page" data-preview-height="304" data-variants="topbar-variants-table">
<div class="nds-topbar nds-content-wrapper" role="region" aria-label="Top bar utilities">
  <button class="nds-btn nds-menu-btn nds-digital-stamp-tab" role="button" aria-expanded="false" aria-controls="nds-digital-stamp">
    <img class="nds-flag" src="../assets/icon/SAflag.min.svg" width="20" height="14" loading="lazy" alt="Saudi Arabia flag">
    <span class="nds-digital-stamp-lg-text nds-truncate">A government website registered with the Digital Government Authority.</span>
    <span class="nds-digital-stamp-sm-text nds-truncate">Government website registered with DGA</span>
    <span id="nds-digital-stamp-verify-text" class="nds-link nds-primary">How you know?</span>
  </button>
  <div class="nds-topbar-info">
    <span id="nds-date" class="nds-text-icon" data-calendar="hijri" data-hidden="sm md"></span>
    <span id="nds-real-time-clock" class="nds-text-icon" data-hidden="sm"></span>
    <button class="nds-btn nds-subtle nds-icon-only nds-tooltip" data-tooltip-hover="500" data-theme-toggle title="Toggle dark mode" aria-label="Toggle dark mode">
      <i class="nds-icon nds-hgi-moon-02" aria-hidden="true"></i>
    </button>
  </div>
</div>
<div id="nds-digital-stamp" role="region" aria-label="Digital government stamp" hidden>
  <div class="nds-content-wrapper">
    <div class="nds-digital-stamp-notices">
      <div class="nds-digital-stamp-card">
        <div class="nds-digital-stamp-icon">
          <i class="nds-icon nds-hgi-link-04" aria-hidden="true"></i>
        </div>
        <div class="nds-digital-stamp-content">
          <div class="nds-digital-stamp-heading">
            Official Saudi Government website URL ends with <span class="nds-digital-stamp-highlight">gov.sa</span>
          </div>
          <div class="nds-digital-stamp-description">
            Website belongs to an official government organization in the Kingdom of Saudi Arabia always ends with .gov.sa .
          </div>
        </div>
      </div>
      <div class="nds-digital-stamp-card">
        <div class="nds-digital-stamp-icon">
          <i class="nds-icon nds-hgi-square-lock-01" aria-hidden="true"></i>
        </div>
        <div class="nds-digital-stamp-content">
          <div class="nds-digital-stamp-heading">
            Official Secure websites use <span class="nds-digital-stamp-highlight">HTTPS</span>
          </div>
          <div class="nds-digital-stamp-description">
            Secured governments websites in the Kingdom of Saudi Arabia use Https encryption.
          </div>
        </div>
      </div>
    </div>
    <div class="nds-digital-stamp-register">
      <img src="../assets/img/dga-logo-icon.svg" width="21" height="31" alt="Digital Government Authority" loading="lazy">
      <div>
        <span>Registered on Digital Government Authority:</span>
        <a class="nds-digital-stamp-registration nds-primary nds-underline" href="#" target="_blank">00000000000</a>
      </div>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="topbar-stamp-tab" data-canon>
<button class="nds-btn nds-menu-btn nds-digital-stamp-tab" role="button" aria-expanded="false" aria-controls="nds-digital-stamp">
  <img class="nds-flag" src="../assets/icon/SAflag.min.svg" width="20" height="14" loading="lazy" alt="Saudi Arabia flag">
  <span class="nds-digital-stamp-lg-text nds-truncate">A government website registered with the Digital Government Authority.</span>
  <span class="nds-digital-stamp-sm-text nds-truncate">Government website registered with DGA</span>
  <span id="nds-digital-stamp-verify-text" class="nds-link nds-primary">How you know?</span>
</button>
</script>
<script type="text/html" id="topbar-stamp-panel" data-canon>
<div id="nds-digital-stamp" role="region" aria-label="Digital government stamp" hidden>
  <div class="nds-content-wrapper">
    <div class="nds-digital-stamp-notices">
      <div class="nds-digital-stamp-card">
        <div class="nds-digital-stamp-icon">
          <i class="nds-icon nds-hgi-link-04" aria-hidden="true"></i>
        </div>
        <div class="nds-digital-stamp-content">
          <div class="nds-digital-stamp-heading">
            Official Saudi Government website URL ends with <span class="nds-digital-stamp-highlight">gov.sa</span>
          </div>
          <div class="nds-digital-stamp-description">
            Website belongs to an official government organization in the Kingdom of Saudi Arabia always ends with .gov.sa .
          </div>
        </div>
      </div>
      <div class="nds-digital-stamp-card">
        <div class="nds-digital-stamp-icon">
          <i class="nds-icon nds-hgi-square-lock-01" aria-hidden="true"></i>
        </div>
        <div class="nds-digital-stamp-content">
          <div class="nds-digital-stamp-heading">
            Official Secure websites use <span class="nds-digital-stamp-highlight">HTTPS</span>
          </div>
          <div class="nds-digital-stamp-description">
            Secured governments websites in the Kingdom of Saudi Arabia use Https encryption.
          </div>
        </div>
      </div>
    </div>
    <div class="nds-digital-stamp-register">
      <img src="../assets/img/dga-logo-icon.svg" width="21" height="31" alt="Digital Government Authority" loading="lazy">
      <div>
        <span>Registered on Digital Government Authority:</span>
        <a class="nds-digital-stamp-registration nds-primary nds-underline" href="#" target="_blank">00000000000</a>
      </div>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="topbar-date" data-canon>
<span id="nds-date" class="nds-text-icon" data-calendar="hijri" data-hidden="sm md"></span>
</script>
<script type="text/html" id="topbar-clock" data-canon>
<span id="nds-real-time-clock" class="nds-text-icon" data-hidden="sm"></span>
</script>
<script type="text/html" id="topbar-weather" data-canon>
<span id="nds-city-name" class="nds-text-icon" data-hidden="sm" data-city="الرياض" data-city-en="Riyadh"></span>
<span id="nds-weather-info" class="nds-text-icon" data-hidden="sm" data-latitude="24.7136" data-longitude="46.6753"></span>
</script>
<script type="text/html" id="topbar-dark" data-canon>
<button class="nds-btn nds-subtle nds-icon-only nds-tooltip" data-tooltip-hover="500" data-theme-toggle title="Toggle dark mode" aria-label="Toggle dark mode">
  <i class="nds-icon nds-hgi-moon-02" aria-hidden="true"></i>
</button>
</script>
    </div>
  </div>
</section>

<section id="topbar-parts" class="nds-content-section nds-doc-parts">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Parts</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

| Part | Holds | Required |
|---|---|---|
| `.nds-topbar` | The whole bar. Add `nds-content-wrapper` to keep its content at the page width | Yes |
| `button.nds-digital-stamp-tab` | The stamp tab: the flag, the long text (`.nds-digital-stamp-lg-text`), the short text (`.nds-digital-stamp-sm-text`) and `#nds-digital-stamp-verify-text`. `aria-controls` names the panel | Yes, on a government site |
| `.nds-topbar-info` | The widgets and the buttons, on the end side. Never put it on the stamp tab: its wide gap stretches the tab's contents apart | No |
| `span.nds-text-icon` with a widget id | One widget, empty in the markup. The script writes its icon and text | No |
| `button[data-theme-toggle]` | The dark mode button | No |
| `#nds-digital-stamp` | The stamp panel, right after the bar. It ships `hidden` | Yes, with the tab |
| `.nds-digital-stamp-notices` | Two `.nds-digital-stamp-card` notices: the `gov.sa` address and HTTPS | Yes, with the tab |
| `.nds-digital-stamp-card` | `.nds-digital-stamp-icon`, then `.nds-digital-stamp-content` with a `.nds-digital-stamp-heading` and a `.nds-digital-stamp-description`. `.nds-digital-stamp-highlight` marks the key word in a heading | Yes, with the tab |
| `.nds-digital-stamp-register` | The DGA logo and the registration number, a link `a.nds-digital-stamp-registration` | Yes, with the tab |
{: .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="topbar-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Each part of the bar is one row of chips. **Show** adds or removes the part, and the parts always keep the table order. The canon carries the stamp, the date, the clock and the dark mode button.

DGA allows two widgets at most. The date, the clock and the weather share `(limit: 2 widgets)`, so with two on, the third stays off. **Hide on** adds its token to the widget's `data-hidden`.

Two choices change two places, so write both of their rows. Weather changes the city element and the weather element. The stamp adds the tab at the start of `.nds-topbar` and the panel right after the bar.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Digital stamp (any) | Show (default) | canon `#topbar-stamp-tab` | `.nds-topbar` (start) | The stamp tab and the stamp panel. A government site must show them. Turn it off only for a site that DGA has not registered |
| Digital stamp (any) | Show (default) | canon `#topbar-stamp-panel` | `.nds-topbar` (after) | |
| Date (any) | Show (default) (limit: 2 widgets) | canon `#topbar-date` | `.nds-topbar-info` | The date. Pair it with the clock for a time-bound service: appointments, deadlines, submissions |
| Date (any) | Hide on phone (default) (hint: Below 600px) | `[data-hidden~="sm"]` | `#nds-date` | Hides the date below 600px |
| Date (any) | Hide on tablet (default) (hint: 600px to 959px) | `[data-hidden~="md"]` | `#nds-date` | Hides the date from 600px to 959px |
| Date (any) | Gregorian | `[data-calendar="gregory"]` | `#nds-date` | Replaces `hijri`: the Gregorian date with the weekday. Pick it for an English service for international visitors. The Hijri date suits Arabic pages and Saudi government sites |
| Clock (any) | Show (default) (limit: 2 widgets) | canon `#topbar-clock` | `.nds-topbar-info` | The time. Leave it out when the date shows elsewhere on the page |
| Clock (any) | Hide on phone (default) (hint: Below 600px) | `[data-hidden~="sm"]` | `#nds-real-time-clock` | Hides the clock below 600px |
| Clock (any) | Hide on tablet (hint: 600px to 959px) | `[data-hidden~="md"]` | `#nds-real-time-clock` | Hides the clock from 600px to 959px |
| Weather (any) | Show (limit: 2 widgets) | canon `#topbar-weather` | `.nds-topbar-info` | The city and the weather. Pick it for a portal where people want general awareness: citizen services, public dashboards |
| Weather (any) | Hide on phone (default) (hint: Below 600px) | `[data-hidden~="sm"]` | `#nds-city-name` | Hides the city and the weather below 600px |
| Weather (any) | Hide on phone (default) (hint: Below 600px) | `[data-hidden~="sm"]` | `#nds-weather-info` |  |
| Weather (any) | Hide on tablet (hint: 600px to 959px) | `[data-hidden~="md"]` | `#nds-city-name` | Hides the city and the weather from 600px to 959px |
| Weather (any) | Hide on tablet (hint: 600px to 959px) | `[data-hidden~="md"]` | `#nds-weather-info` |  |
| Theme button (any) | Show (default) (hint: The dark mode button in the bar) | canon `#topbar-dark` | `.nds-topbar-info` | The dark mode button, last in the row |
{: #topbar-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="topbar-behavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Digital Stamp
{: .nds-block-title #digital-stamp}

The stamp tab opens the stamp panel, which slides open below the bar. A second press, Escape, or a click outside the tab and the panel closes it. Opening the main navigation closes the panel too, and opening the panel closes the navigation. A press while the panel closes opens it again.

### Widgets
{: .nds-block-title #topbar-widgets}

The script writes each widget's icon and text. The date changes with the page language and renders again at midnight. The clock shows hours and minutes and changes on the minute. The date and the clock follow the site's timezone, `data-timezone` on `<html>`, or the visitor's clock without it. See [Date](../core/date). The weather renders again every 15 minutes. City and weather work as one widget: both elements must be on the page.

### Widgets on Small Screens
{: .nds-block-title}

`data-hidden` on a widget hides it inside the named width bands: `sm` below 600px (phones), `md` from 600px to 959px (tablets), `lg` from 960px. Combine tokens to hide across bands. A date or clock hidden at the current width renders no text. It renders when the width changes into a band where it shows. See [Hidden](../utilities/hidden).

</div>
  </div>
</section>

<section id="topbar-features" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-plug-socket"></i>
            <span class="nds-label">Auto Start</span>
          </span>
          <p class="nds-item-desc">The widgets, the stamp tab and the dark mode button start when their markup is on the page. A widget added or replaced later fills in too.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-shield-01"></i>
            <span class="nds-label">Short Stamp Text</span>
          </span>
          <p class="nds-item-desc">The stamp tab shows its long text at 960px and up, and its short text below that.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-language-circle"></i>
            <span class="nds-label">Hijri and Gregorian Calendars</span>
          </span>
          <p class="nds-item-desc">The date shows the Hijri date or the Gregorian date with the weekday. The Hijri date uses the Umm al-Qura calendar, computed in the browser with no network call.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-pin-location-01"></i>
            <span class="nds-label">City and Weather</span>
          </span>
          <p class="nds-item-desc">The weather comes from Open-Meteo for the coordinates you set, with an icon for day or night. The city name comes from <code class="nds-inline-code lang-html">data-city</code>, or from a Nominatim lookup of the coordinates when it is not set.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-database"></i>
            <span class="nds-label">Local Cache</span>
          </span>
          <p class="nds-item-desc">A looked-up city name is cached for 30 days. The weather is cached for 15 minutes in both languages, so a language switch needs no new weather request.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-view-off"></i>
            <span class="nds-label">Failed Requests</span>
          </span>
          <p class="nds-item-desc">When the weather or city request fails, the script hides that widget.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="topbar-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Include the stamp tab and the stamp panel on every government website. DGA requires them.
- Take the registration number and its link from your DGA registration.
- Show two widgets at most: two of the date, the clock, and city and weather. DGA allows no more. The dark mode button is not a widget.
- Set `data-latitude` and `data-longitude` to the place your service is for. The Riyadh default is wrong for a service in another region.
- Set `data-city` and `data-city-en`. The Nominatim lookup is rate-limited and is not meant for traffic from every visitor.
- Put `data-hidden` on every widget, so the bar stays readable on a phone: `"sm md"` on the date, `"sm"` on the clock, and `"sm"` on both the city and the weather. A widget without it shows at every width and crowds the stamp tab.
- Keep the long stamp text short. It truncates on a narrow desktop before the short text takes over.
- Do not add other buttons to the top bar. Site actions belong in the [Main Navigation](../ui-shell/mainnav).

</div>
  </div>
</section>

<section id="topbar-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Widget Ids
{: .nds-block-title}

| Id | Widget | Effect |
|---|---|---|
| `#nds-date` | Date | The script writes a calendar icon and the date |
| `#nds-real-time-clock` | Clock | The script writes a clock icon and the time, as `h:mm AM` |
| `#nds-city-name` | City | The script writes a location icon and the city name. Needs `#nds-weather-info` |
| `#nds-weather-info` | Weather | The script writes a weather icon, the conditions and the temperature in °C. Needs `#nds-city-name` |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-hidden` | A widget | Hides it in the named width bands: `sm`, `md`, `lg`, space-separated. See [Hidden](../utilities/hidden) |
| `data-calendar` | `#nds-date`, or any element around it | `hijri` or `gregory`. The nearest one wins. Without one, the date follows `<html lang>`: Hijri for `ar`, Gregorian for any other language |
| `data-city` | `#nds-city-name` | The Arabic city name, shown when `<html lang>` is `ar`, and on any other page when `data-city-en` is not set. With it, the script makes no lookup |
| `data-city-en` | `#nds-city-name` | The English city name, shown when `<html lang>` is not `ar` |
| `data-latitude`, `data-longitude` | `#nds-weather-info` | The coordinates for the weather, and for the city lookup. The default is Riyadh (24.7136, 46.6753) |
| `data-theme-toggle` | A button | Makes it the dark mode button. See [Themes](../components/themes) |
| `aria-expanded` | `.nds-digital-stamp-tab` | Write `false` in the markup. The script sets `true` when the panel opens, and `false` when it closes |
| `data-state="expanded"` | `.nds-digital-stamp-tab` | The script sets it when the panel opens, and removes it when the panel closes |
| `hidden` | `#nds-digital-stamp` | Write it in the markup. The script removes it when the panel opens, and sets it again after the panel closes |
| `data-state` | `#nds-digital-stamp` | The script sets `open` and `opening` when the panel opens, adds `closing` when it closes, and removes all three after the close |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

| Property | Default | Controls |
|---|---|---|
| `--background-topbar` | Theme token | The background of the bar and the stamp panel |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.DigitalStamp.open()` | Opens the stamp panel |
| `NDS.DigitalStamp.close()` | Closes the stamp panel |
| `NDS.DigitalStamp.toggle()` | Opens or closes the stamp panel |
| `NDS.DigitalStamp.isOpen()` | Returns `true` while the panel is open and not closing |
| `NDS.TimeDate.init()` | Starts the date and the clock, and renders them again. Call it after you add or replace a widget |
| `NDS.TimeDate.updateDate()` | Renders the date now |
| `NDS.TimeDate.updateClock()` | Renders the clock now |
| `NDS.CityWeather.init()` | Starts the city and the weather, and renders them again. Call it after you add or replace a widget |
| `NDS.CityWeather.updateWeather()` | Fetches the weather and renders it |
| `NDS.CityWeather.updateCity()` | Renders the city name |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `nds:digital-stamp:opened` | `#nds-digital-stamp` | None. Fires when the panel starts to open |
| `nds:digital-stamp:closed` | `#nds-digital-stamp` | None. Fires after the panel has closed |
{: .nds-table .nds-responsive}

<script type="text/html" id="topbar-js" data-canon data-lang="js" data-preview="none">
// Open the stamp panel from a link in the page
document.querySelector('#stamp-link').addEventListener('click', (e) => {
  e.preventDefault();
  NDS.DigitalStamp.open();
});
</script>

For today's Hijri date in your own code, use [Date](../core/date).

The full API is in the banners of `_js/nds-digital-stamp.js`, `_js/nds-time-date.js` and `_js/nds-city-weather.js`.

</div>
  </div>
</section>

<section id="topbar-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Header](../ui-shell/header), [Main Navigation](../ui-shell/mainnav) and [Footer](../ui-shell/footer): the other parts of the page shell.
- [Themes](../components/themes): dark mode.
- [Date](../core/date): the date and the clock use it, and its `data-timezone` sets their day.

</div>
  </div>
</section>
