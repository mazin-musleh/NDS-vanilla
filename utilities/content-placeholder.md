---
layout: page
title: Content Placeholder
hero_title: Content Placeholder - National Design System
hero_description: A dashed box that marks where a real component goes, for templates, prototypes and demos
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.5.0"
updated: "1.12.x"
last_edit: "03/10/2026 - 07:28 PM"
---

<section id="placeholderOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Content Placeholder is one class, `nds-content-placeholder`, on an element that holds your own text. Each child element is one centered line.

Pick another component when:

- the region is empty at runtime, such as a list with no results: [Empty](../components/empty)
- the content is still loading: [Loading](../components/loading)

</div>
  </div>
</section>

<section id="placeholderMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="placeholder-default" data-canon data-variants="placeholderVariantsTable">
<div class="nds-content-placeholder">
  <span>Swap with content component</span>
  <span>استبدل هذا العنصر بأي عنصر آخر</span>
</div>
</script>
    </div>
  </div>
</section>

<section id="placeholderVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Size | Default (default) | — | — | Most regions: a panel body, a card, a page section |
| Size | SM | `.nds-sm` | `.nds-content-placeholder` | Tight regions, such as a [Toolbar](../components/toolbar) slot. The text drops to the `2xs` size and the box is at least 40px tall, the height of a default button |
| Size | LG | `.nds-lg` | `.nds-content-placeholder` | Large regions, where the default text looks too small. The text grows to the `sm` size |
{: #placeholderVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="placeholderFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-code"></i>
            <span class="nds-label">CSS Only</span>
          </span>
          <p class="nds-item-desc">One class and no JavaScript. Remove the class and the element is a plain element again.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-square-arrow-expand-01"></i>
            <span class="nds-label">Fills Its Region</span>
          </span>
          <p class="nds-item-desc">It fills a parent that has a height, such as a panel body. In a parent that takes its height from its content, it is at least 120px tall.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-paint-board"></i>
            <span class="nds-label">Theme Colors</span>
          </span>
          <p class="nds-item-desc">The border, fill and text use the brand primary tokens, so the box changes with a custom theme.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-puzzle"></i>
            <span class="nds-label">Your Own Label</span>
          </span>
          <p class="nds-item-desc">The text is in your markup, so you can write it in any language.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="placeholderPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use it in a page template to mark a region that a real component replaces later. Reviewers can then check the layout before the content exists.
- Put it inside a surface that is still in design, such as a [Panel](../components/panels) body, a [Modal](../components/modal) or a [Card](../components/cards). Reviewers then see the surface at its real size.
- Name the component that goes there, not "content here". The person who fills in the template then knows what to add.
- Remove every placeholder before the page goes live.
- Keep the text to one or two lines. The layout sets the size of the box, not the text.
- For a bilingual team, add a second line in the other language.

</div>
  </div>
</section>

<section id="placeholderApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### CSS Custom Properties
{: .nds-block-title}

Set them in the `style` attribute of the placeholder. On a parent, they change only the default-size placeholders inside it: `nds-sm` and `nds-lg` set their own values on the placeholder.

| Property | Default | Controls |
|---|---|---|
| `--placeholder-FS` | `var(--typo-text-xs-FS)` | The font size of the text |
| `--placeholder-LH` | `var(--typo-text-xs-LH)` | The line height of the text. Set it with `--placeholder-FS` |
{: .nds-table .nds-responsive}

</div>
  </div>
</section>
