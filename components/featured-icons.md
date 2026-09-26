---
layout: page
title: Featured Icons
hero_title: Featured Icons - National Design System
hero_description: Colored icon containers that draw attention to features, statuses, and categories across cards, lists, and page sections
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "26/09/2026 - 03:26 PM"
---

<section id="featuredIconOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A featured icon is a `<span>` with the `nds-featured-icon` class around one icon. It marks a card, a list item or a page section, and its color can report a status.

Pick another component when:

- the icon reports the result of a form field or a message: [Feedback Icons](../components/feedback-icons)
- the image is a person or an organization: [Avatar](../components/avatar)

</div>
  </div>
</section>

<section id="featuredIconMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="featured-icon-single" data-canon data-variants="featuredIconVariantsTable">
<span class="nds-featured-icon">
  <i class="hgi hgi-stroke hgi-stars" aria-hidden="true"></i>
</span>
</script>
    </div>
  </div>
</section>

<section id="featuredIconVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Every row goes on the `.nds-featured-icon` element. Pick one option from each group.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Color | Brand (default) | — | — | The brand color, for an icon with no status to report |
| Color | Green | `.nds-green` | `.nds-featured-icon` | Success and confirmation. `data-status="success"` gives the same color and says the icon reports an outcome |
| Color | Blue | `.nds-blue` | `.nds-featured-icon` | Information and tips. `data-status="info"` gives the same color |
| Color | Yellow | `.nds-yellow` | `.nds-featured-icon` | A warning. `data-status="warning"` gives the same color |
| Color | Red | `.nds-red` | `.nds-featured-icon` | An error or a failure. `data-status="error"` gives the same color |
| Color | Neutral | `.nds-neutral` | `.nds-featured-icon` | General use, with no meaning of its own. `data-status="neutral"` gives the same color |
| Size | SM | `.nds-sm` | `.nds-featured-icon` | 32px, for dense layouts such as table rows and side menus |
| Size | MD (default) | — | — | 40px. It needs no class |
| Size | LG | `.nds-lg` | `.nds-featured-icon` | 48px, for section headers |
| Size | XL | `.nds-xl` | `.nds-featured-icon` | 56px, for hero sections and landing pages |
| Shape | Rounded (default) | — | — | A square with rounded corners, for card headers and list items |
| Shape | Circle | `.nds-circle` | `.nds-featured-icon` | A circle, beside round parts such as avatars. It changes nothing on the Subtle style |
| Style | Light (default) | — | — | A light fill in the icon's color |
| Style | Outline | `.nds-outline` | `.nds-featured-icon` | No fill and a border in the icon's color, for a lighter look |
| Style | Dark | `.nds-dark` | `.nds-featured-icon` | A solid fill and a white icon, for the strongest emphasis |
| Style | Subtle | `.nds-subtle` | `.nds-featured-icon` | No container: the icon alone, drawn at the full size |
{: #featuredIconVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="featuredIconFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-colors"></i>
            <span class="nds-label">Six Color Variants</span>
          </span>
          <p class="nds-item-desc">Brand, success, info, warning, error and neutral. Each one sets the fill and the icon color through design tokens.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-hierarchy"></i>
            <span class="nds-label">Status from a Parent</span>
          </span>
          <p class="nds-item-desc">A <code class="nds-inline-code lang-html">data-status</code> on a parent, such as a card or a drawer item, colors the featured icon inside it. An icon with its own color keeps it.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-resize-01"></i>
            <span class="nds-label">Four Sizes</span>
          </span>
          <p class="nds-item-desc">From 32px to 56px. The icon, the padding and the corner radius scale with <code class="nds-inline-code lang-css">--featuredicon-size</code>.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-square-circle"></i>
            <span class="nds-label">Shape and Style Modifiers</span>
          </span>
          <p class="nds-item-desc">A rounded square or a circle, with a light, outline, dark or subtle style. Each shape and style works with every color and size.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-paint-board"></i>
            <span class="nds-label">Custom Color Override</span>
          </span>
          <p class="nds-item-desc">Set <code class="nds-inline-code lang-css">--featuredicon-bg</code> and <code class="nds-inline-code lang-css">--featuredicon-color</code> on an icon with no color class to get a color pair beyond the six variants.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="featuredIconPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use a featured icon to mark a key item in a card, a definition list or a page section, where a plain icon would not stand out.
- Leave out the container for an icon that only decorates. A plain icon is lighter.
- Put one icon inside: any HGI font icon, `<i class="hgi hgi-stroke hgi-NAME">`, or a UI icon, `<i class="nds-icon nds-hgi-NAME">`.
- Give the icon `aria-hidden="true"`. The text next to the featured icon names the item for screen readers.
- Pick the color by meaning. Use brand for main features and neutral for general items. Use success, info, warning or error for a status.
- Use `data-status` when the icon reports an outcome, and a color class when you want only the color.
- In a modal, match the icon's color to the message, such as red before the user deletes something.
- Use `nds-sm` in dense layouts such as table rows. Use `nds-lg` or `nds-xl` in hero sections and on landing pages.
- Use `nds-circle` beside round parts such as avatars. Keep the rounded square in card headers and list items.
- Use `nds-dark` for the strongest emphasis, and `nds-outline` for a lighter, secondary look.

</div>
  </div>
</section>

<section id="featuredIconApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Other Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-gray` | `.nds-featured-icon` | The same as `nds-neutral` |
| `nds-md` | `.nds-featured-icon` | The same as no size class: 40px |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-status` | `.nds-featured-icon` or any parent | `success`, `info`, `warning`, `error` or `neutral` gives the matching color. `critical` gives the error color: keep it for system-level alerts |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set these on the icon, in a `style` attribute or in your stylesheet. On a parent, they reach every featured icon inside it. The size classes set `--featuredicon-size`, and the color classes and statuses set the three color properties.

| Property | Default | Controls |
|---|---|---|
| `--featuredicon-size` | `40px` | Width and height. The icon, the padding and the corner radius scale with it |
| `--featuredicon-bg` | `var(--featuredicons-background-primary-light)` | Fill |
| `--featuredicon-color` | `var(--featuredicons-icon-primary)` | Icon color |
| `--featuredicon-dark-bg` | `var(--background-primary)` | Fill of the `nds-dark` style |
| `--featuredicon-radius` | `calc(var(--featuredicon-size) / 4 - 2px)` | Corner radius. `nds-circle` sets 50% |
| `--featuredicon-bg-forced`, `--featuredicon-color-forced`, `--featuredicon-dark-bg-forced` | — | The same three colors, set on a parent that must win over a color class on the icon. A plain knob set on a parent loses to the icon's own class |
{: .nds-table .nds-responsive}

The theme-wide colors are the `--featuredicons-background-*` and `--featuredicons-icon-*` tokens. See [Tokens](../components/tokens).

</div>
  </div>
</section>

<section id="featuredIconRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Home Page Template](../templates/home-template): extra-large circle icons on the statistic cards.
- [Form Template](../templates/form-template): a dark success icon on the confirmation card after the form is sent.
- [Admin Console Demo](../examples/console-demo): circle icons on the figure cards.
- [Cards](../components/cards), [Drawer](../components/drawer), [Metric](../components/metric) and [Modal](../components/modal): the components that place a featured icon in their own parts.

</div>
  </div>
</section>
