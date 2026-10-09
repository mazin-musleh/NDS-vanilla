---
layout: page
title: Numbers
hero_title: Numbers - National Design System
hero_description: A class that formats a number with separators, a currency symbol or a unit, and an attribute that counts up to a number when it scrolls into view
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "09/10/2026 - 03:10 AM"
---

<section id="numbersOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Numbers is a class and an attribute. `nds-number-format` formats the number in an element's text, and can add a currency symbol or a unit. `data-counter` counts up to a number.

Pick another component when:

- the user types a number: [Number Input](../components/forms#numberInput)
- the user picks a number in a range: [Slider](../components/slider)

</div>
  </div>
</section>

<section id="numbersMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="numbers-number" data-canon data-variants="numbersVariantsTable">
<span class="nds-number-format">3240000</span>
</script>

<script type="text/html" id="numbers-counter" data-canon>
<span data-counter="42850.75">0</span>
</script>

    </div>
  </div>
</section>

<section id="numbersVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Currency and Unit go on `.nds-number-format`, so they need the Number structure. Start and Duration go on `[data-counter]`, so they need the Counter structure. A currency and a unit do not combine: use one.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Number (default) | — | — | Any number on the page: totals, counts, prices |
| Structure | Counter (hint: Counts up when it scrolls into view) | canon `#numbers-counter` | — | A headline figure that counts up once. Use it for a few key figures, never for live data |
| Currency | None (default) | — | — | A number with no currency |
| Currency | SAR | `[data-currency="SAR"]` | `.nds-number-format:not([data-unit])` | Saudi riyals. Draws the Riyal sign as an icon |
| Currency | USD | `[data-currency="USD"]` | `.nds-number-format:not([data-unit])` | US dollars ($) |
| Currency | EUR | `[data-currency="EUR"]` | `.nds-number-format:not([data-unit])` | Euros (€) |
| Currency | GBP | `[data-currency="GBP"]` | `.nds-number-format:not([data-unit])` | Pounds sterling (£) |
| Currency | JPY | `[data-currency="JPY"]` | `.nds-number-format:not([data-unit])` | Japanese yen (¥) |
| Currency | CNY | `[data-currency="CNY"]` | `.nds-number-format:not([data-unit])` | Chinese yuan (¥) |
| Currency | INR | `[data-currency="INR"]` | `.nds-number-format:not([data-unit])` | Indian rupees (₹) |
| Currency | KRW | `[data-currency="KRW"]` | `.nds-number-format:not([data-unit])` | Korean won (₩) |
| Currency | TRY | `[data-currency="TRY"]` | `.nds-number-format:not([data-unit])` | Turkish lira (₺) |
| Unit | Unit (hint: Any text after the number) | `[data-unit="km"]` | `.nds-number-format:not([data-currency])` | A unit such as km, kg, MB or years. Not with a currency |
| Start | Start From (hint: Counts from 40,000, not from 0) | `[data-counter-start="40000"]` | `[data-counter]` | For a large number: the count shows only its last part |
| Duration | 1000 ms (default) | — | `[data-counter]` | One second. Fits most numbers |
| Duration | 2000 ms | `[data-counter-duration="2000"]` | `[data-counter]` | A slower count, for a large number |
{: #numbersVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="numbersBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Counter Animation
{: #counterAnimation}

A counter counts from `data-counter-start` to the `data-counter` value when half of it is in view. It runs once, and then the script sets `data-animated` on it. A user who asks the system for reduced motion sees the end value at once. The counter adds separators itself, so it needs `nds-number-format` only for a currency or a unit.

### Currency Symbol
{: #currencyFormat}

`data-currency` adds the currency symbol beside the number. The symbol sits before the number in English and after it in Arabic. `SAR` draws the Riyal sign as an icon in the text color. The other codes add their Unicode symbol.

### Unit

`data-unit` adds its text after the number, in English and in Arabic. CSS draws the unit, so it stays when a script changes the number, as the [Slider](../components/slider) does. After the change, call `NDS.Numbers.format(el)` to add the separators.

</div>
  </div>
</section>

<section id="numbersFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-plug-socket"></i>
            <span class="nds-label">Automatic Start</span>
          </span>
          <p class="nds-item-desc">The loader starts Numbers on any page that has <code class="nds-inline-code lang-html">nds-number-format</code> or <code class="nds-inline-code lang-html">data-counter</code>. You write no script.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-calculator-01"></i>
            <span class="nds-label">Locale Separators</span>
          </span>
          <p class="nds-item-desc">Separators follow the <code class="nds-inline-code lang-html">lang</code> of the page, and digits are always Latin (0 to 9), whatever the language of the browser. Text before and after the number, the sign and the decimals stay.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layers-01"></i>
            <span class="nds-label">Child Elements Kept</span>
          </span>
          <p class="nds-item-desc">Only the first text in the element that holds a digit changes. Icons and other child elements stay in place.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-repeat"></i>
            <span class="nds-label">Safe to Run Again</span>
          </span>
          <p class="nds-item-desc">The script remembers the text it wrote and reads the original number again. A number formatted twice reads the same as one formatted once, in every language.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-code"></i>
            <span class="nds-label">Code Blocks Skipped</span>
          </span>
          <p class="nds-item-desc">A number inside <code class="nds-inline-code lang-html">&lt;code&gt;</code> stays as written.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="numbersPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Write the number in plain digits, with commas or no separators. It shows before the script runs. The script cannot read other separators, such as `3.240.000`.
- Write `0` as a counter's text. It shows until the count starts.
- Write the number with the decimals you want shown. `1250.50` shows as `1,250.50`, and a counter with `data-counter="98.6"` counts with one decimal.
- Use `data-currency`, not a symbol in the text. See [Currency Symbol](#currencyFormat).
- A screen reader does not read the SAR icon. Where the currency matters, add it as hidden text after the number: `<span class="nds-number-format" data-currency="SAR">1250 <span class="nds-sr-only">riyals</span></span>`.
- Use `data-unit` for a unit on a number that a script changes. For a fixed suffix, write it in the text, such as `98.5%`.
- Use a counter for a few headline figures, such as the statistics on a home page or KPI cards. Do not use it for live data or for a value the user changes: it runs once.
- Keep `data-counter-duration` between 800 and 2000 ms. A shorter count is too fast to see, and a longer one delays the figure.
- For a free price, write the label, such as "Free" or "مجاني", with no `data-currency`.
- Give a counter with a currency or a unit the `nds-number-format` class too: `<span class="nds-number-format" data-currency="SAR" data-counter="1250">0</span>`.
- Put a counter in a [statistic card](../components/cards) for a headline number with a label: a centered card, with the counter on its `nds-card-number`.

</div>
  </div>
</section>

<section id="numbersApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-currency` | `.nds-number-format` | Adds the currency symbol: `SAR`, `USD`, `EUR`, `GBP`, `JPY`, `CNY`, `INR`, `KRW` or `TRY`. Any other value adds nothing |
| `data-unit` | `.nds-number-format` | Adds its text after the number as a unit. Do not combine it with `data-currency` |
| `data-counter` | any element | Makes the element a counter. Its value is the end value. Text before and after the number stays: `$75,000`, `98.6%`, `1.5M`. Empty, the counter counts to the number in its own text |
| `data-counter-start` | `[data-counter]` | The start value. Default `0` |
| `data-counter-duration` | `[data-counter]` | The length of the count in milliseconds. Default `1000` |
| `data-animated` | `[data-counter]` | The script sets it to `true` when the count ends, and never removes it. A counter with it does not run. To run a counter again, remove it, then call `NDS.Numbers.reinit()`. The counter starts from `data-counter-start` again |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

| Property | Default | Controls |
|---|---|---|
| `--number-icon-size` | `1em` | The size of the SAR icon and of an `.nds-icon` child. Set it on `.nds-number-format` or on a parent |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Numbers.init()` | Formats every number and gets every counter ready to count when it scrolls into view. The loader calls it |
| `NDS.Numbers.reinit()` | The same as `init()`. Call it after you add numbers or counters to the page |
| `NDS.Numbers.format(el)` | Formats one `.nds-number-format` element |
| `NDS.Numbers.formatNumbers()` | Formats every `.nds-number-format` on the page |
| `NDS.Numbers.setupCounterAnimations()` | Gets every counter ready to count when it scrolls into view. It skips a counter with `data-animated` |
{: .nds-table .nds-responsive}

Numbers fires no events. To format a number in your own script, use `NDS.formatNumber(n, options)`: it uses the `lang` of the page and Latin digits. The full API is in the banner of `_js/nds-numbers.js`.

<script type="text/html" id="numbers-api-js" data-canon data-lang="js">
var total = document.querySelector('#order-total');
total.textContent = '18450';
NDS.Numbers.format(total);

// After you add counters to the page
NDS.Numbers.reinit();
</script>

</div>
  </div>
</section>

<section id="numbersRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [KPIs Template](../templates/kpis-template): counters in KPI cards.
- [Home Template](../templates/home-template): counters with a suffix in `data-counter`, such as `1.5M`.
- [Console Demo](../examples/console-demo): counters in statistic cards on a dashboard.
- [Manage Records](../examples/manage-records): amounts in riyals with `data-currency="SAR"` in a filtered list.

</div>
  </div>
</section>
