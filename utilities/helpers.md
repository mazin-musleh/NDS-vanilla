---
layout: page
title: Helper Classes
hero_title: Helper Classes - National Design System
hero_description: Single-purpose CSS classes for the markup you write around NDS components, covering centering, spacing resets, direction isolation, brand-colored text, and small notes
breadcrumb: [["Utilities", "/components/?shelf=Utilities"]]
lang: en
direction: ltr
since: "1.7.0"
updated: "1.12.x"
last_edit: "13/10/2026 - 09:30 PM"
---

<section id="helpers-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Helper classes are seven CSS classes for the markup you write yourself: a wrapper, a custom panel, a line of text. Each class does one thing. `nds-center` centers, and `nds-flush` removes spacing, `nds-flush-inline` and `nds-flush-block` remove only the side or the top and bottom padding. `nds-ltr` sets left-to-right text, and `nds-color-primary` sets the brand text color. `nds-note` makes a small line of secondary text.

Pick another component when:

- the items sit in a row or a column: [Flex](../layout/flex)
- the items sit in columns that change with the screen width: [Grid](../layout/grid)
- the element hides at one screen size: [Hidden](../utilities/hidden)
- long text stops after a number of lines: [Truncate Text](../utilities/truncate-text)
- the message needs an icon, a box or a close button: [Feedback Icons](../components/feedback) or [Alert](../components/alert)

</div>
  </div>
</section>

<section id="helpers-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="helpers-all" data-canon data-variants="helpers-variants-table">
<div dir="rtl" lang="ar">
  <div class="nds-flex nds-center">
    <div class="nds-card nds-stroke" id="helpers-card">
      <div class="nds-card-content">
        <div class="nds-card-text">
          <span class="nds-card-title">تم استلام طلبك</span>
          <p class="nds-card-description">رقم الطلب <span id="helpers-number">REQ-2026-4417</span>، وسيصلك رد خلال يومي عمل.</p>
          <p class="nds-card-description">للاستفسار اتصل على <span id="helpers-phone">+966 11 456 7890</span></p>
        </div>
      </div>
      <p class="nds-note">احتفظ برقم الطلب لمتابعة حالته.</p>
    </div>
  </div>
</div>
</script>
    </div>
  </div>
</section>

<section id="helpers-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

The canon is a request confirmation on an Arabic page. Each Class chip adds its class where this screen needs it, and any mix can be on. Rows that share an Option are one choice: write the class on each element. Note Status applies to the note.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Class (any) | Center | `.nds-center` | `#helpers-card` | Centers the text in an element and everything inside it. On a card it centers the content, not the card |
| Class (any) | Flush (hint: Removes padding, margin, border and corner radius) (limit: 1 flush) | `.nds-flush` | `#helpers-card` | Removes a component's own padding, margin, border and corner radius when the frame around it gives them. Here the card loses its border and padding, so its content sits straight on the page |
| Class (any) | Flush sides (hint: Removes only the padding at the start and the end) (limit: 1 flush) | `.nds-flush-inline` | `#helpers-card` | Removes only the padding at the start and the end, so the content lines up with the edge around it. On [Tabs](../components/tabs), write it on each panel |
| Class (any) | Flush top and bottom (hint: Removes only the padding above and below) (limit: 1 flush) | `.nds-flush-block` | `#helpers-card` | Removes only the padding above and below. |
| Class (any) | LTR | `.nds-ltr` | `#helpers-number` | A request number, phone number, IBAN, email address or URL inside Arabic text. Without it, the hyphens and the plus sign move to the wrong end |
| Class (any) | LTR | `.nds-ltr` | `#helpers-phone` | The phone number. Written with the first |
| Class (any) | Brand Color | `.nds-color-primary` | `#helpers-number` | Text that is not a link, in the brand text color: a figure, a term, a status word |
| Note Status | None (default) | — | — | Secondary text color |
| Note Status | Error | `[data-status="error"]` | `.nds-note` | The required-fields line above a form, or a note about a cost or a limit |
| Note Status | Warning | `[data-status="warning"]` | `.nds-note` | A note the user must read before they continue |
| Note Status | Success | `[data-status="success"]` | `.nds-note` | A note that confirms a condition is met |
| Note Status | Info | `[data-status="info"]` | `.nds-note` | A neutral fact the user may want |
{: #helpers-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="helpers-features" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <ul class="nds-feature-list nds-grid nds-divided-rows nds-icons-subtle">
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-text-align-center" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">One Centering Class</span>
              <p class="nds-card-description"><code class="nds-inline-code lang-html">nds-center</code> works on your markup and on components. A card centers its content, a flex or a grid centers its items, and a section centers its head.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-eraser" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Priority Over Component Styles</span>
              <p class="nds-card-description"><code class="nds-inline-code lang-html">nds-center</code>, <code class="nds-inline-code lang-html">nds-flush</code>, <code class="nds-inline-code lang-html">nds-flush-inline</code>, <code class="nds-inline-code lang-html">nds-flush-block</code> and <code class="nds-inline-code lang-html">nds-ltr</code> use <code class="nds-inline-code lang-css">!important</code>, so they apply on any element, even one a component styles, with no extra selector.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-language-skill" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">LTR Inside a Sentence</span>
              <p class="nds-card-description"><code class="nds-inline-code lang-html">nds-ltr</code> works on a <code class="nds-inline-code lang-html">span</code> in running text. It isolates the value, so its signs stay in place and the Arabic text around it keeps its order.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-colors" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Palette Colors</span>
              <p class="nds-card-description">Brand text and the four note statuses read the text color tokens, so a custom palette changes them with the rest of the page.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-note-01" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Note in Any Place</span>
              <p class="nds-card-description">A note sets only its color and text size, with no margin. It fits in a label or a legend as a hint, or stands alone as a paragraph.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-flash" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">CSS Only</span>
              <p class="nds-card-description">Every helper class is CSS only. There is nothing to initialize.</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</section>

<section id="helpers-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use a component's own options first. Use a helper class where no option does what you need.
- Put one `nds-center` on a wrapper, not on every child. Text alignment inherits.
- `nds-center` centers the element itself only when it is narrower than its parent, such as an element with a `max-width`.
- A card with `nds-center` centers its content, not the card. To center the card, center its container: `nds-flex nds-center`.
- Use `nds-ltr` on every left-to-right value inside Arabic text: phone numbers, IBANs, tracking codes, email addresses and URLs. Without it, a leading plus sign, a slash or a question mark moves to the wrong end.
- There is no class for the other direction. For right-to-left text in a left-to-right page, write `dir="rtl"` and `lang` on the element. Browsers, screen readers and translation tools read the attributes.
- Do not use `nds-flush` for small spacing changes. It clears four properties with `!important`, so a later change is harder. Set the component's own custom property instead.
- Do not build a layout from these classes. Use [Flex](../layout/flex) or [Grid](../layout/grid).
- There are no margin or padding classes. Set `--gap` on the flex or grid that holds the items, or use a [spacing token](../foundations/tokens) in your own CSS.
- For a note under a table or a form, put `nds-block` on the element above it. The block's gap separates them.
- Keep a required-fields note to one line above the first field. `data-required` on each field container marks the field.
- Links are primary already. Use `nds-color-primary` only on text that is not a link.

</div>
  </div>
</section>

<section id="helpers-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-center` | Any element | Centers the text with `!important`, and sets `margin-inline: auto` |
| `nds-flush` | Any element | Sets padding, margin, border and corner radius to 0, with `!important` |
| `nds-flush-inline` | Any element | Sets the start and end padding to 0, with `!important`. |
| `nds-flush-block` | Any element | Sets the top and bottom padding to 0, with `!important`. |
| `nds-ltr` | Any element | Sets left-to-right direction with `!important` on the element and everything inside it, and isolates it from the text around it |
| `nds-color-primary` | Any element | Sets the brand text color, `--text-primary` |
| `nds-note` | A text element | Small text in the secondary paragraph color. No margin |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-status` | `.nds-note` | Sets the note color: `error`, `warning`, `success` or `info`. Set it yourself |
{: .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="helpers-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Form Template](../templates/form-template): an error note with `nds-block` above a multi-step form.
- [Registration](../examples/registration): centered notes, and `nds-flush` on a section.
- [Sign In](../examples/sign-in): `nds-flush` on a section.
- [FAQ Template](../templates/faq-template): `nds-flush` on tab panels.
- [Contact Us Template](../templates/contact-us-template): `nds-ltr` on a phone field.
- [Help and Support Template](../templates/help-support-template): `nds-color-primary` on definition list titles.

</div>
  </div>
</section>
