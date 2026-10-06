---
layout: page
title: Helper Classes
hero_title: Helper Classes - National Design System
hero_description: Single-purpose CSS classes for the markup you write around NDS components, covering centering, spacing resets, direction isolation, brand-colored text, and small notes
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.7.0"
updated: "1.12.x"
last_edit: "06/10/2026 - 10:12 PM"
---

<section id="helpersOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Helper classes are five CSS classes for the markup you write yourself: a wrapper, a custom panel, a line of text. Each class does one thing. `nds-center` centers, and `nds-flush` removes spacing. `nds-ltr` sets left-to-right text, and `nds-color-primary` sets the brand text color. `nds-note` makes a small line of secondary text.

Pick another component when:

- the items sit in a row or a column: [Flex](../layout/flex)
- the items sit in columns that change with the screen width: [Grid](../layout/grid)
- the element hides at one screen size: [Hidden](../utilities/hidden)
- long text stops after a number of lines: [Truncate Text](../utilities/truncate-text)
- the message needs an icon, a box or a close button: [Feedback Icons](../components/feedback-icons) or [Alert](../components/alert)

</div>
  </div>
</section>

<section id="helpersMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="helpers-all" data-canon data-variants="helpersVariantsTable">
<section class="nds-content-section nds-ghost" dir="rtl" lang="ar">
  <div class="nds-section-wrapper">
    <div class="nds-section-body">
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
  </div>
</section>
</script>
    </div>
  </div>
</section>

<section id="helpersVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

The canon is a request confirmation on an Arabic page. Each Class chip adds its class where this screen needs it, and any mix can be on. Rows that share an Option are one choice: write the class on each element. Note Status applies to the note.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Class (any) | Center | `.nds-center` | `#helpers-card` | Centers the text in an element and everything inside it. On a card it centers the content, not the card |
| Class (any) | Flush (hint: Removes padding, margin, border and corner radius) | `.nds-flush` | `#helpers-card` | Removes a component's own padding, margin, border and corner radius when the frame around it gives them. Here the card loses its border and padding, so its content sits straight on the page |
| Class (any) | LTR | `.nds-ltr` | `#helpers-number` | A request number, phone number, IBAN, email address or URL inside Arabic text. Without it, the hyphens and the plus sign move to the wrong end |
| Class (any) | LTR | `.nds-ltr` | `#helpers-phone` | The phone number. Written with the first |
| Class (any) | Brand Color | `.nds-color-primary` | `#helpers-number` | Text that is not a link, in the brand text color: a figure, a term, a status word |
| Note Status | None (default) | — | — | Secondary text color |
| Note Status | Error | `[data-status="error"]` | `.nds-note` | The required-fields line above a form, or a note about a cost or a limit |
| Note Status | Warning | `[data-status="warning"]` | `.nds-note` | A note the user must read before they continue |
| Note Status | Success | `[data-status="success"]` | `.nds-note` | A note that confirms a condition is met |
| Note Status | Info | `[data-status="info"]` | `.nds-note` | A neutral fact the user may want |
{: #helpersVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="helpersFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-text-align-center"></i>
            <span class="nds-label">One Centering Class</span>
          </span>
          <p class="nds-item-desc"><code class="nds-inline-code lang-html">nds-center</code> works on your markup and on components. A card centers its content, a flex or a grid centers its items, and a section centers its head.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-eraser"></i>
            <span class="nds-label">Priority Over Component Styles</span>
          </span>
          <p class="nds-item-desc"><code class="nds-inline-code lang-html">nds-center</code>, <code class="nds-inline-code lang-html">nds-flush</code> and <code class="nds-inline-code lang-html">nds-ltr</code> use <code class="nds-inline-code lang-css">!important</code>, so they apply on any element, even one a component styles, with no extra selector.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-language-skill"></i>
            <span class="nds-label">LTR Inside a Sentence</span>
          </span>
          <p class="nds-item-desc"><code class="nds-inline-code lang-html">nds-ltr</code> works on a <code class="nds-inline-code lang-html">span</code> in running text. It isolates the value, so its signs stay in place and the Arabic text around it keeps its order.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-colors"></i>
            <span class="nds-label">Palette Colors</span>
          </span>
          <p class="nds-item-desc">Brand text and the four note statuses read the text color tokens, so a custom palette changes them with the rest of the page.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-note-01"></i>
            <span class="nds-label">Note in Any Place</span>
          </span>
          <p class="nds-item-desc">A note sets only its color and text size, with no margin. It fits in a label or a legend as a hint, or stands alone as a paragraph.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-flash"></i>
            <span class="nds-label">CSS Only</span>
          </span>
          <p class="nds-item-desc">Every helper class is CSS only. There is nothing to initialize.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="helpersPractices" class="nds-content-section nds-doc-practices">
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
- There are no margin or padding classes. Set `--gap` on the flex or grid that holds the items, or use a [spacing token](../components/tokens) in your own CSS.
- For a note under a table or a form, put `nds-block` on the element above it. The block's gap separates them.
- Keep a required-fields note to one line above the first field. `data-required` on each field container marks the field.
- Links are primary already. Use `nds-color-primary` only on text that is not a link.

</div>
  </div>
</section>

<section id="helpersApi" class="nds-content-section nds-doc-api">
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

<section id="helpersRelated" class="nds-content-section nds-doc-related">
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
