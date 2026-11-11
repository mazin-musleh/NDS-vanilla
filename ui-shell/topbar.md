---
layout: page
title: Top Bar
hero_title: Top Bar - National Design System
hero_description: A slim bar above the main navigation with the DGA digital stamp, expanders that slide open below it, today's date, the time or the weather, and the dark mode button.
breadcrumb: [["UI Shell", "/components/?shelf=UI%20Shell"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "2.0.0"
last_edit: "01/11/2026 - 10:57 PM"
---

<section id="topbar-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

The top bar is the first bar of every page. On the start side, the [Digital Stamp](../ui-shell/digital-stamp) tab tells people the site is a registered government website. On the end side, up to two items show today's date, the time or the weather, next to the dark mode button.

A toggle in the bar opens an expander: a strip that slides open below the bar. The stamp is one expander, and a site can add its own.

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
<div class="nds-topbar nds-content-wrapper" role="region" aria-label="Top bar utilities" data-i18n-aria-label="topbar.top_bar_utilities">
  <button type="button" class="nds-btn nds-menu-btn nds-digital-stamp-tab" aria-expanded="false" aria-controls="nds-digital-stamp" data-topbar-toggle>
    <img class="nds-flag" src="../assets/icon/SAflag.min.svg" width="20" height="14" loading="lazy" alt="Saudi Arabia flag" data-i18n-alt="digital-stamp.flag">
    <span class="nds-digital-stamp-lg-text nds-truncate" data-i18n="digital-stamp.tab">A government website registered with the Digital Government Authority.</span>
    <span class="nds-digital-stamp-sm-text nds-truncate" data-i18n="digital-stamp.tab_short">Government website registered with DGA</span>
    <span id="nds-digital-stamp-verify-text" class="nds-link nds-primary" data-i18n="digital-stamp.verify">How you know?</span>
  </button>
  <div class="nds-topbar-info">
    <span class="nds-meta" data-hidden="sm md">
      <span class="nds-meta-item"><i class="nds-icon nds-hgi-calendar-03" aria-hidden="true"></i><time data-date-today data-calendar="hijri" data-date-format="long" data-date-era></time></span>
    </span>
    <span class="nds-meta" data-hidden="sm">
      <span class="nds-meta-item"><i class="nds-icon nds-hgi-clock-01" aria-hidden="true"></i><time class="nds-clock"></time></span>
    </span>
    <button class="nds-btn nds-subtle nds-icon-only nds-tooltip" data-tooltip-hover="500" data-theme-toggle title="Toggle dark mode" data-i18n-title="topbar.toggle_dark_mode" aria-label="Toggle dark mode" data-i18n-aria-label="topbar.toggle_dark_mode">
      <i class="nds-icon nds-hgi-moon-02" aria-hidden="true"></i>
    </button>
  </div>
</div>
<div id="nds-digital-stamp" class="nds-topbar-expander" role="region" aria-label="Digital government stamp" data-i18n-aria-label="digital-stamp.label" hidden>
  <div class="nds-content-wrapper">
    <div class="nds-topbar-expander-content">
      <div class="nds-digital-stamp-notices">
        <div class="nds-digital-stamp-card">
          <div class="nds-digital-stamp-icon">
            <i class="nds-icon nds-hgi-link-04" aria-hidden="true"></i>
          </div>
          <div class="nds-digital-stamp-content">
            <div class="nds-digital-stamp-heading"><span data-i18n="digital-stamp.gov_title">Official Saudi Government websites URL ends with</span> <span class="nds-digital-stamp-highlight" data-i18n="digital-stamp.gov_mark">.gov.sa</span></div>
            <div class="nds-digital-stamp-description" data-i18n="digital-stamp.gov_desc">Website belongs to an official government organization in the Kingdom of Saudi Arabia always ends with .gov.sa .</div>
          </div>
        </div>
        <div class="nds-digital-stamp-card">
          <div class="nds-digital-stamp-icon">
            <i class="nds-icon nds-hgi-square-lock-01" aria-hidden="true"></i>
          </div>
          <div class="nds-digital-stamp-content">
            <div class="nds-digital-stamp-heading"><span data-i18n="digital-stamp.https_title">Official Reliable websites use</span> <span class="nds-digital-stamp-highlight">HTTPS</span></div>
            <div class="nds-digital-stamp-description" data-i18n="digital-stamp.https_desc">Ensure the website is using the HTTPS protocol.</div>
          </div>
        </div>
      </div>
      <div class="nds-digital-stamp-register">
        <img src="../assets/img/dga-logo-icon.svg" width="21" height="31" alt="Digital Government Authority" data-i18n-alt="digital-stamp.dga" loading="lazy">
        <div>
          <span class="nds-digital-stamp-register-text" data-i18n="digital-stamp.register">Registered on Digital Government Authority:</span>
          <a class="nds-digital-stamp-registration nds-primary nds-underline" href="#" target="_blank">00000000000</a>
        </div>
      </div>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="topbar-stamp-tab" data-canon>
<button type="button" class="nds-btn nds-menu-btn nds-digital-stamp-tab" aria-expanded="false" aria-controls="nds-digital-stamp" data-topbar-toggle>
  <img class="nds-flag" src="../assets/icon/SAflag.min.svg" width="20" height="14" loading="lazy" alt="Saudi Arabia flag" data-i18n-alt="digital-stamp.flag">
  <span class="nds-digital-stamp-lg-text nds-truncate" data-i18n="digital-stamp.tab">A government website registered with the Digital Government Authority.</span>
  <span class="nds-digital-stamp-sm-text nds-truncate" data-i18n="digital-stamp.tab_short">Government website registered with DGA</span>
  <span id="nds-digital-stamp-verify-text" class="nds-link nds-primary" data-i18n="digital-stamp.verify">How you know?</span>
</button>
</script>
<script type="text/html" id="topbar-stamp-panel" data-canon>
<div id="nds-digital-stamp" class="nds-topbar-expander" role="region" aria-label="Digital government stamp" data-i18n-aria-label="digital-stamp.label" hidden>
  <div class="nds-content-wrapper">
    <div class="nds-topbar-expander-content">
      <div class="nds-digital-stamp-notices">
        <div class="nds-digital-stamp-card">
          <div class="nds-digital-stamp-icon">
            <i class="nds-icon nds-hgi-link-04" aria-hidden="true"></i>
          </div>
          <div class="nds-digital-stamp-content">
            <div class="nds-digital-stamp-heading"><span data-i18n="digital-stamp.gov_title">Official Saudi Government websites URL ends with</span> <span class="nds-digital-stamp-highlight" data-i18n="digital-stamp.gov_mark">.gov.sa</span></div>
            <div class="nds-digital-stamp-description" data-i18n="digital-stamp.gov_desc">Website belongs to an official government organization in the Kingdom of Saudi Arabia always ends with .gov.sa .</div>
          </div>
        </div>
        <div class="nds-digital-stamp-card">
          <div class="nds-digital-stamp-icon">
            <i class="nds-icon nds-hgi-square-lock-01" aria-hidden="true"></i>
          </div>
          <div class="nds-digital-stamp-content">
            <div class="nds-digital-stamp-heading"><span data-i18n="digital-stamp.https_title">Official Reliable websites use</span> <span class="nds-digital-stamp-highlight">HTTPS</span></div>
            <div class="nds-digital-stamp-description" data-i18n="digital-stamp.https_desc">Ensure the website is using the HTTPS protocol.</div>
          </div>
        </div>
      </div>
      <div class="nds-digital-stamp-register">
        <img src="../assets/img/dga-logo-icon.svg" width="21" height="31" alt="Digital Government Authority" data-i18n-alt="digital-stamp.dga" loading="lazy">
        <div>
          <span class="nds-digital-stamp-register-text" data-i18n="digital-stamp.register">Registered on Digital Government Authority:</span>
          <a class="nds-digital-stamp-registration nds-primary nds-underline" href="#" target="_blank">00000000000</a>
        </div>
      </div>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="topbar-more-toggle" data-canon>
<button type="button" class="nds-btn nds-subtle" aria-expanded="false" aria-controls="topbar-more" data-topbar-toggle>
  <i class="nds-icon nds-hgi-information-circle" aria-hidden="true"></i>
  <span class="nds-label">More</span>
</button>
</script>
<script type="text/html" id="topbar-more-strip" data-canon>
<div id="topbar-more" class="nds-topbar-expander" role="region" aria-label="More about this site" hidden>
  <div class="nds-content-wrapper">
    <div class="nds-topbar-expander-content">
      <div class="nds-content-placeholder">
        <span>Swap with content component</span>
        <span>استبدل هذا العنصر بأي عنصر آخر</span>
      </div>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="topbar-today" data-canon>
<span class="nds-meta" data-hidden="sm md">
  <span class="nds-meta-item"><i class="nds-icon nds-hgi-calendar-03" aria-hidden="true"></i><time data-date-today data-calendar="hijri" data-date-format="long" data-date-era></time></span>
</span>
</script>
<script type="text/html" id="topbar-clock" data-canon>
<span class="nds-meta" data-hidden="sm">
  <span class="nds-meta-item"><i class="nds-icon nds-hgi-clock-01" aria-hidden="true"></i><time class="nds-clock"></time></span>
</span>
</script>
<script type="text/html" id="topbar-weather" data-canon>
<span class="nds-meta" data-hidden="sm">
  <span class="nds-meta-item nds-weather" data-latitude="24.7136" data-longitude="46.6753">
    <i class="nds-icon nds-weather-icon" aria-hidden="true"></i>
    <span><span class="nds-weather-city">Riyadh</span> · <span class="nds-weather-condition">--</span>, <span class="nds-weather-temp">--</span>°C</span>
  </span>
</span>
</script>
<script type="text/html" id="topbar-dark" data-canon>
<button class="nds-btn nds-subtle nds-icon-only nds-tooltip" data-tooltip-hover="500" data-theme-toggle title="Toggle dark mode" data-i18n-title="topbar.toggle_dark_mode" aria-label="Toggle dark mode" data-i18n-aria-label="topbar.toggle_dark_mode">
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
| `button.nds-digital-stamp-tab` | The stamp's toggle, first in the bar. Its parts are listed on [Digital Stamp](../ui-shell/digital-stamp) | Yes, on a government site |
| `.nds-topbar-info` | The items and the buttons, on the end side. Never put it on the stamp tab: its wide gap stretches the tab's contents apart | No |
| `span.nds-meta` | One item: [Today](../components/date#date-today-markup), [the clock](../components/clock) or [the weather](../components/weather), in a [Meta](../components/meta) line. The bar shows it at Meta's LG size; `nds-md` or `nds-sm` on the span picks a smaller one | No |
| `button[data-theme-toggle]` | The dark mode button | No |
| `button[data-topbar-toggle]` | A toggle: `aria-controls` names its expander's id. The stamp tab is one | No |
| `.nds-topbar-expander` | A strip right after the bar, `hidden` until its toggle opens it. It holds a `.nds-content-wrapper`, which keeps the content at the page width. `#nds-digital-stamp` is one | Yes, with each toggle |
| `.nds-topbar-expander-content` | The content, inside the `.nds-content-wrapper`, with space above and below it. Never put the space on the wrapper: the slide would stop short of closed | Yes |
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

Each part of the bar is one row of chips. **Show** adds or removes the part, and the parts always keep the table order. The Expanders row adds or removes each expander with its toggle. The canon carries the stamp, Today, the clock and the dark mode button.

DGA allows two items at most. Today, the clock and the weather share `(limit: 2 items)`, so with two on, the third stays off. **Hide on** adds its token to the item's `data-hidden`.

Each expander changes two places, so write both of its rows. Digital stamp adds its tab at the start of `.nds-topbar` and its expander right after the bar. More adds its toggle at the start of `.nds-topbar-info` and its expander right after the bar.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Expanders (any) | Digital stamp (default) | canon `#topbar-stamp-tab` | `.nds-topbar` (start) | The stamp tab and the stamp. A government site must show them. Turn it off only for a site that DGA has not registered. See [Digital Stamp](../ui-shell/digital-stamp) |
| Expanders (any) | Digital stamp (default) | canon `#topbar-stamp-panel` | `.nds-topbar` (after) | |
| Expanders (any) | More (hint: A second strip that slides open below the bar) | canon `#topbar-more-toggle` | `.nds-topbar-info` (start) | A toggle and its expander. Replace the placeholder with your content, such as a notice with its links or a set of services |
| Expanders (any) | More (hint: A second strip that slides open below the bar) | canon `#topbar-more-strip` | `.nds-topbar` (after) | |
| Today (any) | Show (default) (limit: 2 items) | canon `#topbar-today` | `.nds-topbar-info` | Today's date. Pair it with the clock for a time-bound service: appointments, deadlines, submissions |
| Today (any) | Hide on phone (default) (hint: Below 600px) | `[data-hidden~="sm"]` | `.nds-meta:has(time[data-date-today])` | Hides the date below 600px |
| Today (any) | Hide on tablet (default) (hint: 600px to 959px) | `[data-hidden~="md"]` | `.nds-meta:has(time[data-date-today])` | Hides the date from 600px to 959px |
| Today (any) | Gregorian | `[data-calendar="gregory"]` | `time[data-date-today]` | Replaces `hijri`: the month's name, with no weekday. Pick it for an English service for international visitors. The Hijri date suits Arabic pages and Saudi government sites |
| Clock (any) | Show (default) (limit: 2 items) | canon `#topbar-clock` | `.nds-topbar-info` | The time. Leave it out when the date shows elsewhere on the page |
| Clock (any) | Hide on phone (default) (hint: Below 600px) | `[data-hidden~="sm"]` | `.nds-meta:has(.nds-clock)` | Hides the clock below 600px |
| Clock (any) | Hide on tablet (hint: 600px to 959px) | `[data-hidden~="md"]` | `.nds-meta:has(.nds-clock)` | Hides the clock from 600px to 959px |
| Weather (any) | Show (limit: 2 items) | canon `#topbar-weather` | `.nds-topbar-info` | The place and its weather. Pick it for a portal where people want general awareness: citizen services, public dashboards |
| Weather (any) | Hide on phone (default) (hint: Below 600px) | `[data-hidden~="sm"]` | `.nds-meta:has(.nds-weather)` | Hides the weather below 600px |
| Weather (any) | Hide on tablet (hint: 600px to 959px) | `[data-hidden~="md"]` | `.nds-meta:has(.nds-weather)` | Hides the weather from 600px to 959px |
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

### Expanders
{: .nds-block-title #topbar-expanders}

A toggle opens its expander, which slides open below the bar and pushes the page down. A second press, Escape, or a click outside closes it. An Escape that closes a Modal leaves it open. When it closes with the keyboard focus inside, the focus moves to its toggle. Only one expander is open at a time. If a visitor opens another, the open one slides closed first. If a visitor presses several toggles meanwhile, the last one opens.

A click that opens the main navigation closes an open expander, and a click on a toggle closes the navigation.

### Digital Stamp
{: .nds-block-title #digital-stamp}

The stamp is an expander: its tab is the toggle, and `#nds-digital-stamp` is the expander. Its text, its address card and its markup are on [Digital Stamp](../ui-shell/digital-stamp).

### Items
{: .nds-block-title #topbar-items}

Today is on [Date](../components/date#date-today-markup), the clock on [Clock](../components/clock), and the weather on [Weather](../components/weather). Each one is a Meta item that the script fills, so it works outside the bar too, where a page can show any number of them.

### Items on Small Screens
{: .nds-block-title}

`data-hidden` on an item hides it inside the named width bands: `sm` below 600px (phones), `md` from 600px to 959px (tablets), `lg` from 960px. Combine tokens to hide across bands. Today and the clock write no text while `data-hidden` hides them. See [Date](../components/date#date-today), [Clock](../components/clock) and [Hidden](../utilities/hidden).

</div>
  </div>
</section>

<section id="topbar-features" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <ul class="nds-list nds-grid nds-flat nds-divided nds-horizontal">
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-plug-socket" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Auto Start</span>
              <p class="nds-card-description">The loader starts the top bar's script when the page has a toggle. One click listener on the document serves every toggle and expander, including ones added later.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-align-box-top-center" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Push-Down Expanders</span>
              <p class="nds-card-description">An expander takes its place in the page under the bar, so it covers nothing. The slide turns off when the visitor's system asks for reduced motion.</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</section>

<section id="topbar-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Show two items at most: two of Today, the clock and the weather. DGA allows no more. The dark mode button and the toggles are not items.
- Put `data-hidden` on every item, so the bar stays readable on a phone: `"sm md"` on Today, `"sm"` on the clock and the weather. An item without it shows at every width and crowds the stamp tab.
- Use an expander for content that needs the page's width and belongs to the whole site, such as a notice with its links or a set of services. Site navigation belongs in the [Main Navigation](../ui-shell/main-nav).
- Put small content in a [Dropmenu](../components/dropmenu) or a [Tooltip](../components/tooltip), not an expander. A short line in a full-width expander pushes the whole page down.
- Write `aria-expanded="false"` on each toggle and `hidden` on each expander. The page then reads right before the script loads.
- Give each expander `role="region"` and an `aria-label` that names its content.

</div>
  </div>
</section>

<section id="topbar-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-topbar-toggle` | A button in the bar | Written bare. Makes it a toggle for the expander that its `aria-controls` names |
| `aria-controls` | A toggle | The id of its expander |
| `aria-expanded` | A toggle | Write `false` in the markup. The script sets `true` when its expander opens, and `false` when it closes |
| `data-state="expanded"` | A toggle | The script sets it when its expander opens, and removes it when the expander closes |
| `hidden` | `.nds-topbar-expander` | Write it in the markup. The script removes it when the expander opens, and sets it again after the expander closes |
| `data-state` | `.nds-topbar-expander` | The script sets `open` and `opening` when the expander opens. It adds `closing` when the expander closes. It removes all three after the close |
| `data-hidden` | An item's `span.nds-meta` | Hides it in the named width bands: `sm`, `md`, `lg`, space-separated. See [Hidden](../utilities/hidden) |
| `data-theme-toggle` | A button | Makes it the dark mode button. See [Themes](../foundations/themes) |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

| Property | Default | Controls |
|---|---|---|
| `--background-topbar` | Theme token | The background of the bar and of every expander |
| `--topbar-expander-padding` | `var(--spacing-2xl)`, `var(--spacing-5xl)` in the stamp | The space above and below `.nds-topbar-expander-content`. Set it on the expander or on the content |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

`NDS.Topbar` loads after the page shows. Until it loads, a call to it loads it and returns a promise of the result, so `await` a call whose result you use. Each method takes an expander, as an id or as the expander element.

| Method | Effect |
|---|---|
| `NDS.Topbar.open(expander)` | Opens it. An open expander slides closed first |
| `NDS.Topbar.close(expander)` | Closes it |
| `NDS.Topbar.toggle(expander)` | Opens or closes it |
| `NDS.Topbar.isOpen(expander)` | Returns `true` while it is open and not closing |
| `NDS.Topbar.init()` | Starts the toggles, Escape and the outside click, once per page. The loader runs it |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `nds:topbar:opened` | The expander. It bubbles | `{ expander }`. Fires when it starts to open |
| `nds:topbar:closed` | The expander. It bubbles | `{ expander }`. Fires after it has closed |
{: .nds-table .nds-responsive}

<script type="text/html" id="topbar-js" data-canon data-lang="js" data-preview="none">
// Open the stamp from a link in the page
document.querySelector('#stamp-link').addEventListener('click', (e) => {
  e.preventDefault();
  NDS.Topbar.open('nds-digital-stamp');
});
</script>

The full API is in the banner of `_js/nds-topbar.js`.

</div>
  </div>
</section>

<section id="topbar-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Digital Stamp](../ui-shell/digital-stamp): the stamp's words, address card and markup.
- [Date](../components/date#date-today-markup), [Clock](../components/clock) and [Weather](../components/weather): the items the bar shows.
- [Header](../ui-shell/header), [Main Navigation](../ui-shell/main-nav) and [Footer](../ui-shell/footer): the other parts of the page shell.
- [Themes](../foundations/themes): dark mode.

</div>
  </div>
</section>
