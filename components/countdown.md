---
layout: page
title: Countdown
hero_title: Countdown - National Design System
hero_description: A live count of the time left until a deadline or the end of a duration, as text or as a row of cards
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.12.x"
updated: "1.12.x"
last_edit: "08/10/2026 - 12:56 PM"
---

<section id="countdownOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A countdown shows the time left until a deadline, such as the day applications close, or until a duration ends, such as a session or a one-time code. You write the units and their boxes in the markup. The script writes the numbers, and the unit word into an empty label. A `<span>` root is a run of text, on its own or in one card. A `<div>` root lays its units out in one row, with a [Card](../components/cards) for each unit.

Pick another component when:

- a button must wait before it can be pressed again: [Cooldown Button](../components/cooldown-button)
- the page shows the current date and time: [Top Bar](../ui-shell/topbar)

</div>
  </div>
</section>

<section id="countdownMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="countdown-inline" data-canon data-variants="countdownVariantsTable">
<span class="nds-countdown" data-countdown="2027-12-31T23:59"></span>
</script>
<script type="text/html" id="countdown-units" data-canon>
<span class="nds-countdown" data-countdown="2027-12-31T23:59">
  <span class="nds-countdown-value" data-unit="h">--</span> hours and <span class="nds-countdown-value" data-unit="m">--</span> minutes
</span>
</script>
<script type="text/html" id="countdown-cards" data-canon>
<div class="nds-countdown" data-countdown="2027-12-31T23:59">
  <div class="nds-card nds-stroke nds-center" data-unit="d">
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-number"><span class="nds-countdown-value">--</span></span>
        <p class="nds-card-description nds-countdown-label"></p>
      </div>
    </div>
  </div>
  <div class="nds-card nds-stroke nds-center" data-unit="h">
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-number"><span class="nds-countdown-value">--</span></span>
        <p class="nds-card-description nds-countdown-label"></p>
      </div>
    </div>
  </div>
  <div class="nds-card nds-stroke nds-center" data-unit="m">
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-number"><span class="nds-countdown-value">--</span></span>
        <p class="nds-card-description nds-countdown-label"></p>
      </div>
    </div>
  </div>
  <div class="nds-card nds-stroke nds-center" data-unit="s">
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-number"><span class="nds-countdown-value">--</span></span>
        <p class="nds-card-description nds-countdown-label"></p>
      </div>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="countdown-card" data-canon>
<div class="nds-card nds-stroke nds-center">
  <div class="nds-card-content">
    <div class="nds-card-text">
      <span class="nds-card-number"><span class="nds-countdown" data-countdown="2027-12-31T23:59"></span></span>
      <p class="nds-card-description">until applications close</p>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="countdown-ended" data-canon>
<span class="nds-countdown-ended">Applications closed</span>
</script>
    </div>
  </div>
</section>

<section id="countdownVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

`.nds-countdown` is the root in every structure. In One card, it is the `<span>` inside the card number. Size and the card options need Cards or One card. A card option goes on every `.nds-card`. The rest of the card options are on [Cards](../components/cards). The target date is sample content: set your own deadline.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Inline (default) (id: inline) | — | — | The script writes the days with their word, then `hh:mm:ss`. The days hide under one day. Use it inside a sentence or a label |
| Structure | Own units (hint: Your own words and units) (id: units) | canon `#countdown-units` | — | You write each unit and the words around it. The largest unit takes the time above it: here 2 days show as 48 hours |
| Structure | Cards (hint: One card per unit) | canon `#countdown-cards` | — | A row of statistic cards, one per unit, in equal columns, with 8px corners (`--radius-md`). Every card variant applies. A `--card-radius` on a card beats the corners |
| Structure | One card (hint: The whole countdown in one card) | canon `#countdown-card` | — | An inline countdown in the number of one statistic card, with a line under it |
| Target | Date (default) | `[data-countdown="2027-12-31T23:59"]` | `.nds-countdown` | Counts to a deadline. A date with no offset is read in the site timezone |
| Target | Duration (id: duration) | `[data-countdown-seconds="63"]` | `.nds-countdown` | Counts down a number of seconds from the moment the countdown starts, such as a one-time code |
| Target | Passed (hint: A deadline that is already over) (id: passed) (demo: + ended) | `[data-countdown="2026-01-01T00:00"]` | `.nds-countdown` | A deadline in the past: the countdown is at zero and in its ended state from page load, such as a page that stays online after applications close. The builder adds the ended message with it |
| Size | LG (not: inline, units) | `.nds-lg` | `.nds-countdown` | Numbers `--typo-display-clamp-lg-FS`: 32px on a phone, up to 48px on a wide screen |
| Size | MD (default) (not: inline, units) | — | `.nds-countdown` | Numbers `--typo-display-sm-FS`, 30px. It needs no class |
| Size | SM (not: inline, units) | `.nds-sm` | `.nds-countdown` | Numbers `--typo-display-xs-FS`, 24px |
| Direction | Auto (default) | — | — | Follows the content, even inside a card number: digits and separators alone (`05:12`) read left to right, and Arabic unit words read right to left |
| Direction | RTL (hint: Right to left, whatever the page) | `[dir="rtl"]` | `.nds-countdown` | Fixes right to left: the first unit sits on the right |
| Direction | LTR (hint: Left to right, whatever the page) | `[dir="ltr"]` | `.nds-countdown` | Fixes left to right, such as a number left of its word on an Arabic page |
| Stroke | Stroke (default) | `.nds-stroke` | `.nds-card` | A 1px border on each card. Leave out both stroke and shadow for plain cards |
| Shadow | Shadow | `.nds-shadow` | `.nds-card` | An elevation shadow on each card. It combines with the stroke |
| Color | None (default) | — | — | The default colors |
| Color | Neutral | `.nds-neutral` | `.nds-card` | Tints the numbers. Also `.nds-gray` |
| Color | Green | `.nds-green` | `.nds-card` | Tints the numbers |
| Color | Yellow | `.nds-yellow` | `.nds-card` | Tints the numbers |
| Color | Red | `.nds-red` | `.nds-card` | Tints the numbers |
| Color | Blue | `.nds-blue` | `.nds-card` | Tints the numbers |
| Color | On color (hint: For a dark or photo background) | `.nds-oncolor` | `.nds-card` | For cards on a dark or photo background. It replaces the color classes, which do nothing on an on-color card |
| Tinted | Tinted (hint: A light tint of the card color) | `.nds-color` | `.nds-card:not(.nds-oncolor)` | Fills each card with a light tint of its color. With no color class, the tint is the brand primary |
| Warning | Warning (hint: Turns red near the end) (demo: + duration) | `[data-countdown-warn="60"]` | `.nds-countdown` | The countdown turns red when 60 seconds are left. The builder picks Duration with it, 63 seconds, so the red shows after 3 seconds |
| Ended | Ended message (hint: Text shown at zero) (id: ended) (demo: + passed) | canon `#countdown-ended` | `.nds-countdown` | The text replaces the countdown at zero. Without it, the zeros stay. The builder picks Passed with it, so the text shows at once |
{: #countdownVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="countdownBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Deadline
{: .nds-block-title}

`data-countdown` takes a date and time, such as `2027-12-31T23:59`. A value with no offset is read in the site timezone, the one `<html data-timezone>` sets. A value with an offset, such as `+03:00` or `Z`, is read as written. Either way, every visitor counts to the same moment, wherever they are.

### Duration
{: .nds-block-title}

`data-countdown-seconds` counts down from the moment the countdown starts. A reload starts it again. To resume a timer after a reload, render the seconds left on the server, or call `NDS.Countdown.set()` with them.

### Units
{: .nds-block-title}

Each `[data-unit]` element shows one unit: `d` days, `h` hours, `m` minutes or `s` seconds. Only the units you write show. Hours, minutes and seconds always show two digits, such as `05`. Days show as many digits as they need. The largest unit takes the time above it, so hours and minutes alone show 2 days as 48 hours. A unit you skip in the middle carries into the next smaller unit you wrote.

### Warning
{: .nds-block-title}

With `data-countdown-warn`, the root gets `data-state="warning"` when that many seconds are left, and the numbers turn red. Text written directly in the root turns red too. The `nds:countdown:warn` event fires once at that moment.

### Ended Message
{: .nds-block-title}

At zero, the root gets `data-state="ended"`. A `.nds-countdown-ended` element anywhere inside the root then becomes its only content: the units, your words and the separators leave the page. `set()` puts them back.

</div>
  </div>
</section>

<section id="countdownFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-plug-socket"></i>
            <span class="nds-label">Auto-initialization</span>
          </span>
          <p class="nds-item-desc">Every <code class="nds-inline-code lang-html">.nds-countdown</code> on the page starts at load, and any added later. No init call is needed.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-timer-02"></i>
            <span class="nds-label">No Drift</span>
          </span>
          <p class="nds-item-desc">One timer serves every countdown on the page, aligned to the second. Each tick computes the time left from the target, so a slow or hidden tab shows the right time when the visitor returns.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-translate"></i>
            <span class="nds-label">Unit Words</span>
          </span>
          <p class="nds-item-desc">An empty <code class="nds-inline-code lang-html">.nds-countdown-label</code> gets the unit word in the language of the nearest <code class="nds-inline-code lang-html">lang</code> attribute, with the right plural for the number. The day word of the default inline countdown comes from the same place. A label with text stays as you wrote it.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-server-stack-01"></i>
            <span class="nds-label">Server Time</span>
          </span>
          <p class="nds-item-desc">Put the server's current time in <code class="nds-inline-code lang-html">data-countdown-now</code>, on the root or on <code class="nds-inline-code lang-html">&lt;html&gt;</code> for the whole page. A wrong clock on the visitor's device then cannot move a deadline.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-text-number-sign"></i>
            <span class="nds-label">Stable Width</span>
          </span>
          <p class="nds-item-desc">Every digit takes the same width. A unit word keeps the width of its longest form, such as "seconds" when it shows "second". The largest number keeps the width it starts with, such as 10 days at 9. The text and the cards do not move as the time changes.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-arrow-left-right"></i>
            <span class="nds-label">Time Direction</span>
          </span>
          <p class="nds-item-desc">A countdown of digits alone, such as <code class="nds-inline-code lang-html">05:12</code>, reads left to right on every page, Arabic included. Arabic unit words make the countdown read right to left.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layout-grid"></i>
            <span class="nds-label">Phone Row</span>
          </span>
          <p class="nds-item-desc">On a phone, the cards in a row get a 12px padding and 12px unit words, so four cards fit a 320px screen. A <code class="nds-inline-code lang-css">--card-padding</code> on a card beats the padding.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="countdownPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Write `--` in each `.nds-countdown-value`. The placeholder shows until the script loads, so the layout does not move.
- Show seconds only when they matter, such as in the last hour or for a one-time code. A deadline weeks away reads better in days and hours.
- Put the deadline itself in the text near the countdown, such as "Applications close on 31 December". The countdown says how long is left, not when.
- Add an ended message to every countdown on a live page. A row of zeros does not tell the visitor what happened.
- Set `data-countdown-now` from the server for a deadline that has legal weight, such as a submission window.
- Add `data-countdown-hide-zero` to the days card of a countdown that is usually under one day, such as a sale that ends tonight. The row then shows no card at 0 days.
- Keep the countdown out of `aria-live` regions. A screen reader that reads a new number every second is noise. Fire your own message from `nds:countdown:warn` or `nds:countdown:end` instead.

</div>
  </div>
</section>

<section id="countdownApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Other Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `.nds-countdown-value` | a `[data-unit]`, or an element inside one | The script writes the number here. A `[data-unit]` with no `.nds-countdown-value` gets the number itself |
| `.nds-countdown-label` | an element inside a `[data-unit]` | When empty at load, the script writes the unit word here every second |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-countdown` | `.nds-countdown` | The deadline: `YYYY-MM-DD`, with an optional `THH:mm` or `THH:mm:ss` and an optional offset. No offset means the site timezone. A value that is not a date logs a console warning. Empty, the countdown shows its placeholders and waits for `NDS.Countdown.set()`: no timer and no events until then |
| `data-countdown-seconds` | `.nds-countdown` | A duration in seconds, counted from the moment the countdown starts. It wins over `data-countdown` |
| `data-countdown-warn` | `.nds-countdown` | Seconds left at which the script adds `warning` to `data-state` |
| `data-countdown-now` | `.nds-countdown`, or any element around it, such as `<html>` | The server's current time, in the format of `data-countdown`. The script reads it once, when the countdown starts |
| `dir` | `.nds-countdown` | Fixes the direction, such as `dir="ltr"` to keep the number left of the word on an Arabic page. Without it, the script sets `dir="auto"`: digits and separators alone read left to right, and Arabic unit words read right to left. A CSS `direction` on the root works too |
| `data-state="warning"` | `.nds-countdown` | The script adds it when the time left reaches `data-countdown-warn`. It removes it at zero and on `set()` |
| `data-state="ended"` | `.nds-countdown` | The script adds it at zero. It removes it on `set()` |
| `data-unit` | an element inside `.nds-countdown` | One unit: `d`, `h`, `m` or `s`. A root with no `[data-unit]` gets the default units from the script |
| `data-countdown-hide-zero` | a `[data-unit]` element | The script adds `hidden` to the unit while its value is 0, and removes it when the value is above 0 |
| `data-countdown-sizes` | an empty `.nds-countdown-label` | The script writes every form of the unit word into it, one per line, such as `seconds` and `second`. The CSS reserves the widest, so the label never resizes its card. Do not set it yourself |
| `data-countdown-sizes` | the value of the largest unit | The script writes the starting value into it, such as `10` days. The CSS reserves that width, so the value keeps it when it loses a digit. Do not set it yourself |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set them on the root of Cards or One card. Each one beats the size class.

| Property | Default | Controls |
|---|---|---|
| `--countdown-gap` | `var(--spacing-md)` | The space between the cards |
| `--countdown-value-size` | `var(--typo-display-sm-FS)` | The font size of the numbers |
| `--countdown-value-line-height` | `var(--typo-display-sm-LH)` | The line height of the numbers |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Countdown.init()` | Starts every `.nds-countdown` on the page that has not started yet. Runs at load. `reinit()` does the same |
| `NDS.Countdown.set(el, target)` | Starts the countdown again with a new target: a date string, a `Date`, or a number of seconds from now |
{: .nds-table .nds-responsive}

All events bubble.

| Event | Fired on | Detail |
|---|---|---|
| `nds:countdown:tick` | `.nds-countdown`, every second | `{ remaining }`: the seconds left |
| `nds:countdown:warn` | `.nds-countdown`, once, when the time left reaches `data-countdown-warn` | `{ remaining }`: the seconds left |
| `nds:countdown:end` | `.nds-countdown`, once, at zero | None |
{: .nds-table .nds-responsive}

<script type="text/html" id="countdown-js" data-canon data-lang="js">
const timer = document.querySelector('#otp-timer');

// Let the user ask for a new code when the old one expires.
timer.addEventListener('nds:countdown:end', () => {
  document.querySelector('#resend-btn').disabled = false;
});

// A new code was sent: count down its 5 minutes again.
NDS.Countdown.set(timer, 300);
</script>

The full API is in the banner of `_js/nds-countdown.js`.

</div>
  </div>
</section>
