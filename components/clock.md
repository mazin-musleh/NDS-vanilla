---
layout: page
title: Clock
hero_title: Clock - National Design System
hero_description: The current time, in the site's timezone, that changes on the minute.
breadcrumb: [["Components", "/components/?shelf=Components"]]
lang: en
direction: ltr
since: "1.12.x"
updated: "1.12.x"
last_edit: "01/11/2026 - 08:07 PM"
---

<section id="clock-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A `<time class="nds-clock">` shows the current time as `h:mm AM`. The script writes it, and writes it again at each new minute. A page can show any number of clocks. The [Top Bar](../ui-shell/topbar) can show one as an item.

The script writes the time only. The icon and the look are yours: the canon uses a [Meta](../components/meta) line.

Pick another component when:

- the page shows today's date: [Date](../components/date#date-today-markup)
- the page counts down to a moment: [Countdown](../components/countdown)

</div>
  </div>
</section>

<section id="clock-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="clock-canon" data-canon data-variants="clock-variants-table">
<span class="nds-meta">
  <span class="nds-meta-item"><i class="nds-icon nds-hgi-clock-01" aria-hidden="true"></i><time class="nds-clock"></time></span>
</span>
</script>
<script type="text/html" id="clock-with-today" data-canon>
<span class="nds-meta">
  <span class="nds-meta-item"><i class="nds-icon nds-hgi-calendar-03" aria-hidden="true"></i><time data-date-today data-calendar="hijri" data-date-format="long" data-date-era></time></span>
  <span class="nds-meta-item"><i class="nds-icon nds-hgi-clock-01" aria-hidden="true"></i><time class="nds-clock"></time></span>
</span>
</script>
    </div>
  </div>
</section>

<section id="clock-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Clock (default) | — | — | The time alone |
| Structure | With today's date | canon `#clock-with-today` | — | Today's date, then the time, as the top bar shows them. The date is [Date](../components/date#date-today-markup)'s `data-date-today` |
| Calendar | Hijri (default) | — | `time[data-date-today]` | The date in Umm al-Qura Hijri. See [Date](../components/date#date-today) |
| Calendar | Gregorian | `[data-calendar="gregory"]` | `time[data-date-today]` | Replaces `hijri`: the Gregorian date, with the month's name. `data-date-era` adds nothing to a Gregorian date. See [Date](../components/date#date-today) |
{: #clock-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="clock-features" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <ul class="nds-list nds-grid nds-flat nds-divided nds-horizontal">
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">One Timer</span>
              <p class="nds-card-description">One timer serves every clock on the page, at the turn of each minute. It stops while the tab is hidden, and the clocks catch up when it shows again.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-time-zone" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Site Timezone</span>
              <p class="nds-card-description">The clock shows the time in the timezone that <code class="nds-inline-code lang-html">data-timezone</code> on <code class="nds-inline-code lang-html">&lt;html&gt;</code> names, or the visitor's time without it.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-view-off" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">No Work When Hidden</span>
              <p class="nds-card-description">A clock that <code class="nds-inline-code lang-html">data-hidden</code> hides at the current width is not written. When no clock shows, the timer stops.</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</section>

<section id="clock-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Show a clock for a time-bound service: appointments, deadlines, submissions. Leave it out where the time does not matter.
- Set `data-timezone` on `<html>` when every visitor must see the service's time, such as Riyadh time for a deadline.
- Write the `<time>` empty. The script writes the time after the page shows, so the clock is empty until then.
- In the [top bar](../ui-shell/topbar), the clock is one of the two items DGA allows.

</div>
  </div>
</section>

<section id="clock-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `.nds-clock` | `<time>` | The clock. The script writes its text, such as `2:05 PM`, and its `datetime`, such as `14:05` |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-timezone` | `<html>` | The site's timezone, as an IANA name such as `Asia/Riyadh`. See [Date](../components/date#date-setup) |
| `data-hidden` | The clock, or an element around it | Hides it in the named width bands. See [Hidden](../utilities/hidden) |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

`NDS.Clock` loads after the page shows. Until it loads, a call to it loads it and returns a promise.

| Method | Effect |
|---|---|
| `NDS.Clock.init()` | Writes every clock on the page and starts the minute timer. The loader runs it when a clock is on the page, and `NDS.init.mount()` on markup added later |
{: .nds-table .nds-responsive}

The full API is in the banner of `_js/nds-clock.js`.

</div>
  </div>
</section>

<section id="clock-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Top Bar](../ui-shell/topbar): shows the clock as one of its items.
- [Date](../components/date): today's date, and the site's timezone.

</div>
  </div>
</section>
