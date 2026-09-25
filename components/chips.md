---
layout: page
title: Chips
hero_title: Chips - National Design System
hero_description: A chip is a small button for a choice, a filter or a value the user can remove
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "26/09/2026 - 02:00 AM"
---

<section id="chipOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A chip is a small `<button>` with the `nds-chip` class, a color class and a label, with an optional icon. Chips sit together in an `nds-chips` group, as filter choices, categories or picked values. A chip needs no script for its look; your script sets it selected when the user picks it.

Pick another component when:

- the label only describes something and cannot be clicked: [Tags](../components/tags)
- the chips are the values of a field the user types into: [Tag Input](../components/taginput)
- the choices filter a list of items: [Filter](../components/filter), which draws its own chips

</div>
  </div>
</section>

<section id="chipMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="chip-single" data-canon data-variants="chipVariantsTable">
<button type="button" class="nds-chip nds-primary">
  <span class="nds-label">Services</span>
</button>
</script>
<script type="text/html" id="chip-group" data-canon>
<div class="nds-chips">
  <button type="button" class="nds-chip nds-primary">
    <span class="nds-label">All</span>
  </button>
  <button type="button" class="nds-chip nds-primary">
    <span class="nds-label">Services</span>
  </button>
  <button type="button" class="nds-chip nds-primary">
    <span class="nds-label">News</span>
  </button>
  <button type="button" class="nds-chip nds-primary">
    <span class="nds-label">Events</span>
  </button>
</div>
</script>
<script type="text/html" id="chip-icon" data-canon>
<i class="nds-icon nds-hgi-plus-sign" aria-hidden="true"></i>
</script>
<script type="text/html" id="chip-remove" data-canon>
<i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
</script>
    </div>
  </div>
</section>

<section id="chipVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

A row on `.nds-chip` changes every chip. Selected goes on one chip: the builder uses `.nds-chip:first-child`, but on a page it goes on the chip the user picked.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Single (default) | — | — | One chip |
| Structure | Group | canon `#chip-group` | — | Several chips in a row that wraps, with an even gap |
| Color | Primary (default) | `.nds-primary` | `.nds-chip` | The brand color. Also `.nds-green` |
| Color | Neutral | `.nds-neutral` | `.nds-chip` | A quieter gray. Also `.nds-gray` |
| Size | MD (default) | — | — | 24px high. It needs no class |
| Size | SM | `.nds-sm` | `.nds-chip` | 20px high |
| Size | LG | `.nds-lg` | `.nds-chip` | 32px high, with a larger label |
| Content | Label (default) | — | — | Text only |
| Content | Icon and label | canon `#chip-icon` | `.nds-chip` (start) | An icon before the label |
| Content | Icon and label | `.nds-lead-icon` | `.nds-chip` | The same: adds the space after the icon |
| Content | Label and icon | canon `#chip-icon` | `.nds-chip` | An icon after the label |
| Content | Label and icon | `.nds-trail-icon` | `.nds-chip` | The same: adds the space before the icon |
| Content | Removable (hint: A value the user can remove) | canon `#chip-remove` | `.nds-chip` | A cancel icon after the label, for a picked value the user can remove with a click. `NDS.buildChip()` builds this chip |
| Selected | Selected | `[data-state~="selected"]` | `.nds-chip:first-child` | The chip the user picked. Your script sets it |
| Selected | Selected | `[aria-pressed="true"]` | `.nds-chip:first-child` | The same. It tells screen readers the chip is on. Give the other chips of a choice `aria-pressed="false"` |
| Disabled | Disabled | `[disabled]` | `.nds-chip` | The user cannot pick these chips now. Put it on one chip to disable one |
| Rounded | Rounded | `.nds-rounded` | `.nds-chip` | Fully round ends |
| On color | On color | `.nds-oncolor` | `.nds-chip` | For chips on a deep primary or dark background |
| Center | Center (hint: Group only) | `.nds-center` | `.nds-chips` | Centers the chips in their row |
{: #chipVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="chipFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-tag-01"></i>
            <span class="nds-label">Pure CSS</span>
          </span>
          <p class="nds-item-desc">No JavaScript needed for the look. Every color, size and state comes from classes and attributes.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-cursor-01"></i>
            <span class="nds-label">Interactive States</span>
          </span>
          <p class="nds-item-desc">Hover, pressed, selected, disabled, and a focus ring for keyboard users. On color chips keep a visible ring on a dark background.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-more-horizontal"></i>
            <span class="nds-label">Label Truncation</span>
          </span>
          <p class="nds-item-desc">A label longer than 160px ends with an ellipsis. A label that holds a formatted number, such as a price range, is never cut. <code class="nds-inline-code lang-css">--truncate</code> sets how many lines it shows first.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-puzzle"></i>
            <span class="nds-label">Composable</span>
          </span>
          <p class="nds-item-desc">Combines with icons, the rounded shape, the on color version and chip groups. Tag Input, Multiselect and Filter build their removable chips with <code class="nds-inline-code lang-js">NDS.buildChip()</code>.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="chipPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use chips for choices the user clicks: filters, categories and picked values. For a label that only describes something, use a [Tag](../components/tags).
- Use one color for every chip of a choice. The selected state shows which one is on, so do not use a second color for it.
- When a chip turns on and off, set `data-state="selected"` and `aria-pressed="true"` together, and `aria-pressed="false"` when it is off.
- Put related chips in one `nds-chips` group, so they share the gap and wrap together.
- Keep labels to one or two words. A label longer than 160px is cut with an ellipsis.
- Add an icon only when it helps the user recognize the choice.
- Give each chip `type="button"`, so a chip inside a form does not send the form.
- Add `nds-oncolor` to chips on a deep primary or dark background.

</div>
  </div>
</section>

<section id="chipApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Other Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-green` | `.nds-chip` | The same as `nds-primary` |
| `nds-gray` | `.nds-chip` | The same as `nds-neutral` |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-state~="selected"` | `.nds-chip` | The selected look |
| `data-state~="disabled"` | `.nds-chip` | The disabled look, the same as the `disabled` attribute |
| `data-state~="hover"`, `data-state~="pressed"`, `data-state~="focused"` | `.nds-chip` | Shows that look without a pointer or a keyboard, for a design review |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set these on the chip. The size classes set `--chip-size`, and the color classes set `--chip-bg` and `--chip-text`.

| Property | Default | Controls |
|---|---|---|
| `--chip-size` | `24px` | Height |
| `--chip-bg` | `var(--chip-background-neutral-default)` | Background |
| `--chip-text` | `var(--chip-text-neutral-default)` | Label color |
| `--chip-icon` | `--chip-text` | Icon color |
| `--truncate` | `1` | Lines the label shows before the ellipsis |
{: .nds-table .nds-responsive}

The theme-wide chip colors are the `--chip-background-*` and `--chip-text-*` tokens. See [Tokens](../components/tokens).

### JavaScript
{: .nds-block-title}

A chip has no script of its own. `NDS.buildChip()` builds a removable chip for your own list of values.

| Method | Effect |
|---|---|
| `NDS.buildChip(label, options)` | Returns a removable chip: a `<button>` with the label and a cancel icon. `options.chipClass` adds classes, `options.data` adds data attributes, `options.onRemove` runs on a click anywhere on the chip, and `options.disabled` disables it |
{: .nds-table .nds-responsive}

<script type="text/html" id="chip-js" data-canon data-lang="js">
var chips = document.querySelector('#picked');
chips.appendChild(NDS.buildChip('Riyadh', {
  chipClass: 'nds-neutral nds-rounded',
  data: { value: 'riyadh' },
  onRemove: function (e) { e.currentTarget.remove(); }
}));
</script>

</div>
  </div>
</section>

<section id="chipRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Filter](../components/filter), [Multiselect](../components/multiselect) and [Tag Input](../components/taginput): the removable chips that `NDS.buildChip()` builds.
- [Tags](../components/tags): labels that describe, and cannot be clicked.

</div>
  </div>
</section>
