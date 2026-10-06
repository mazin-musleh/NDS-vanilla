---
layout: page
title: Divider
hero_title: Divider - National Design System
hero_description: A line that separates content, horizontal or vertical, with an optional label between two lines
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "06/10/2026 - 10:12 PM"
---

<section id="dividerOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A divider is a line between two blocks of content. An empty divider draws one line. A divider with text draws the text between two lines, such as "or" between two sign-in options. `nds-vertical` turns it into a vertical line between items in a row.

Pick another component when:

- each row of a list needs a line under it: [Definition List](../components/definition-list) with `nds-divided`
- related buttons sit in one joined strip: [Button group](../components/button)

</div>
  </div>
</section>

<section id="dividerMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="divider-line" data-canon data-variants="dividerVariantsTable" data-demo-width="400px">
<div>
  <p>Your request was received on 12 March 2026.</p>
  <hr class="nds-divider">
  <p>The ministry replies by email within three working days.</p>
</div>
</script>
<script type="text/html" id="divider-label" data-canon>
<div>
  <a href="#" class="nds-btn nds-primary nds-full">
    <span class="nds-label">Continue with Nafath</span>
  </a>
  <div class="nds-divider">or</div>
  <button type="button" class="nds-btn nds-secondary-outline nds-full">
    <span class="nds-label">Sign in with National ID</span>
  </button>
</div>
</script>
<script type="text/html" id="divider-vertical" data-canon>
<div class="nds-flex nds-row">
  <div>
    <strong>125K</strong>
    <span>Services</span>
  </div>
  <div class="nds-divider nds-vertical"></div>
  <div>
    <strong>4.8</strong>
    <span>Rating</span>
  </div>
  <div class="nds-divider nds-vertical"></div>
  <div>
    <strong>23K</strong>
    <span>Reviews</span>
  </div>
</div>
</script>
    </div>
  </div>
</section>

<section id="dividerVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

A Spacing class sets the space above and below a line, or before and after a vertical line. In the Vertical structure, put it on each divider.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Line (default) | — | — | A line between two blocks of content. Use `hr` when the content changes topic, and an empty `div` when the line is only visual |
| Structure | Label | canon `#divider-label` | — | Text between two lines. Keep the text to one word or a short phrase, such as "or" |
| Structure | Vertical | canon `#divider-vertical` | — | A vertical line between items in a flex row. It stretches to the height of the row |
| Spacing | XS (default) | — | — | Tight space. Most uses |
| Spacing | MD | `.nds-md` | `.nds-divider` | A little more space |
| Spacing | LG | `.nds-lg` | `.nds-divider` | Space between groups in a form or a card |
| Spacing | XL | `.nds-xl` | `.nds-divider` | Space between parts of a page section |
| Spacing | 2XL | `.nds-2xl` | `.nds-divider` | Space between page sections |
| Spacing | 3XL | `.nds-3xl` | `.nds-divider` | A major break. Not between paragraphs |
| Spacing | 4XL | `.nds-4xl` | `.nds-divider` | The largest break. Not between paragraphs |
| Label position | Center (default) | — | `div.nds-divider:not(.nds-vertical)` | The two lines share the space equally |
| Label position | Start | `.nds-start` | `div.nds-divider:not(.nds-vertical)` | No line before the label. The label sits at the start edge |
| Label position | End | `.nds-end` | `div.nds-divider:not(.nds-vertical)` | No line after the label. The label sits at the end edge |
| Label position | Custom | `--divider-line-start: 24px` | `div.nds-divider:not(.nds-vertical)` | The line before the label is at most 24px long, and the other line takes the rest. Set any length or percentage in the `style` attribute. `--divider-line-end` does the same from the end |
| Color | Default (default) | — | — | A faint gray line. Dark mode makes it a faint white line |
| Color | Primary | `.nds-primary` | `.nds-divider` | A brand primary line |
| On color | On color (hint: For a deep primary or dark background) | `.nds-oncolor` | `.nds-divider` | For a divider on a deep primary or dark background: a faint white line and a white label. With Primary, the line is the same white as the label |
| Thick | Thick | `--divider-size: 2px` | `.nds-divider` | A 2px line instead of 1px. Set it in the `style` attribute: there is no class for it |
{: #dividerVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="dividerFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-text-align-center"></i>
            <span class="nds-label">Text Annotation</span>
          </span>
          <p class="nds-item-desc">Any content inside the divider turns it into a label between two lines. No extra class is needed.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-html-5"></i>
            <span class="nds-label">Works on Any Element</span>
          </span>
          <p class="nds-item-desc">The class works on <code class="nds-inline-code lang-html">&lt;hr&gt;</code>, <code class="nds-inline-code lang-html">&lt;div&gt;</code> and <code class="nds-inline-code lang-html">&lt;span&gt;</code>. The browser's own <code class="nds-inline-code lang-html">&lt;hr&gt;</code> look is reset. A plain <code class="nds-inline-code lang-html">&lt;hr&gt;</code> with no class gets the divider look too, so CMS content matches.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layers-01"></i>
            <span class="nds-label">Context Spacing</span>
          </span>
          <p class="nds-item-desc">Inside a dropmenu, the space around a divider matches the menu padding. Inside <code class="nds-inline-code lang-html">nds-prose</code>, an <code class="nds-inline-code lang-html">&lt;hr&gt;</code> gets 3XL space. A Spacing class still wins in both.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-arrow-data-transfer-horizontal"></i>
            <span class="nds-label">Writing-mode Aware</span>
          </span>
          <p class="nds-item-desc">Margins and lines use logical properties. In a parent with a vertical writing mode, the divider draws a vertical line with no extra class.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="dividerPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use a divider when white space alone does not show where one part ends.
- Do not put a divider between a card and the text around it. The card border already separates them.
- Use a label divider for a second path ("or", "continue with") or to name a group of form fields.
- Keep the label short. A long sentence competes with the lines.
- To make the label flush with an edge, use `nds-start` or `nds-end`. A `--divider-line-start` of `0` still leaves a gap before the label.
- Pick the smallest spacing that gives enough room. Keep `nds-3xl` and `nds-4xl` for major breaks.
- Put a vertical divider only in a flex row. Outside one it has no height to stretch to.
- Use the default color for most dividers. Use `nds-primary` only where the line is an accent.
- On a deep primary or dark surface, add `nds-oncolor`, or give the surface `data-theme="dark"`. See [Dark Areas](../components/themes#themesDarkArea).
- To change the line color on a tinted surface, set `--divider-color` on that surface, not on `:root`.

</div>
  </div>
</section>

<section id="dividerApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### CSS Custom Properties
{: .nds-block-title}

Set these on `.nds-divider`, or on a parent to change every divider inside it. A Spacing class sets `--divider` on the divider itself, so it wins over a parent value.

| Property | Default | Controls |
|---|---|---|
| `--divider` | `var(--spacing-xs)` | Space above and below the line. On `nds-vertical`, the space before and after it |
| `--divider-size` | `1px` | Line thickness, for the line and for both lines around a label |
| `--divider-line-start` | `none` | The longest the line before a label may be. Any length or percentage. The other line takes the rest of the width. It shrinks in a narrow container. Start follows the text direction: in Arabic it is the right-hand line |
| `--divider-line-end` | `none` | The same, for the line after a label |
| `--divider-color` | `var(--colors-alpha-black-10)` | Line color. A semantic token: dark mode sets it to `var(--colors-alpha-white-10)`. `nds-primary` uses `var(--border-primary)` instead, and `nds-oncolor` uses `var(--border-oncolor)`. With both, the line takes the label color |
{: .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="dividerRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Sign in](../examples/sign-in): an "or" label between two sign-in options.
- [Manage Records](../examples/manage-records): `hr` lines between the groups of a filter menu and above its footer.
- [Faculty CV](../examples/faculty-cv): date labels at the top of each step in a career timeline.
- [Contact Us Template](../templates/contact-us-template): a line between the groups of the side info.

</div>
  </div>
</section>
