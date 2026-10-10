---
layout: page
title: Hidden
hero_title: Hidden - National Design System
hero_description: CSS utilities that hide an element always, at chosen screen widths, or on screen only while screen readers still read it
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.4.0"
updated: "1.12.x"
last_edit: "10/10/2026 - 05:28 PM"
---

<section id="hidden-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Hidden is a set of CSS tools that remove an element from view. The native `hidden` attribute hides an element at every width. `data-hidden` hides it only inside the screen widths it names. The `sr` token in `data-hidden`, and the `nds-sr-only` class, hide it on screen but keep it for screen readers.

Pick another component when:

- the content shows and hides when the user clicks a heading: [Accordion](../components/accordion)
- the content changes with a tab: [Tabs](../components/tabs)
- actions that do not fit on a phone move into a menu: [Dropmenu](../components/dropmenu)
- long text stops after a number of lines: [Truncate Text](../utilities/truncate-text)

</div>
  </div>
</section>

<section id="hidden-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="hidden-button" data-canon data-variants="hidden-variants-table">
<button class="nds-btn nds-neutral" type="button">
  <i class="nds-icon nds-hgi-share-01" aria-hidden="true"></i>
  <span class="nds-label" data-hidden="sm">Share</span>
</button>
</script>
    </div>
  </div>
</section>

<section id="hidden-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

The canon is a Share button, and every option goes on its label. The label starts hidden on phones (SM). SM, MD and LG add tokens to one `data-hidden` attribute, and any mix can be on: SM and MD together write `data-hidden="sm md"`. Always writes the `hidden` attribute instead, so it is off while a width is chosen. Keep for Screen Readers adds the `sr` token to `data-hidden`, so it needs a width first.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Hide At (any) | SM (default) (hint: Hidden on phones) | `[data-hidden~="sm"]` | `.nds-label:not([hidden])` | Hides the element on screens narrower than 600px |
| Hide At (any) | MD (hint: Hidden on tablets) | `[data-hidden~="md"]` | `.nds-label:not([hidden])` | Hides the element on screens from 600px to 959px |
| Hide At (any) | LG (hint: Hidden on desktops) | `[data-hidden~="lg"]` | `.nds-label:not([hidden])` | Hides the element on screens 960px and wider |
| Hide At (any) | Always (hint: The hidden attribute: hidden at every width) | `[hidden]` | `.nds-label:not([data-hidden])` | Hides the element at every width and from screen readers. Use it for state your script turns on and off. Never on a button's only label: the button loses its name |
| Screen Readers | Keep for Screen Readers (hint: Hidden on screen only. Screen readers still read it) | `[data-hidden~="sr"]` | `.nds-label[data-hidden]` | Hides the element on screen only, and screen readers still read it. On a button label, the button shows only its icon and keeps its name |
{: #hidden-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="hidden-features" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-view-off-slash"></i>
            <span class="nds-label">The hidden Attribute Wins</span>
          </span>
          <p class="nds-item-desc">An element with <code class="nds-inline-code lang-html">hidden</code> stays hidden even when a component or a utility gives it a flex or grid display. The rule uses <code class="nds-inline-code lang-css">display: none !important</code>.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-smart-phone-01"></i>
            <span class="nds-label">Exact Width Ranges</span>
          </span>
          <p class="nds-item-desc">Each <code class="nds-inline-code lang-html">data-hidden</code> token hides the element only inside its own range. Hiding at MD does not also hide at SM.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-puzzle"></i>
            <span class="nds-label">Combined Ranges</span>
          </span>
          <p class="nds-item-desc">Tokens separated by spaces add up. <code class="nds-inline-code lang-html">data-hidden="sm md"</code> hides the element below 960px, and <code class="nds-inline-code lang-html">data-hidden="md lg"</code> shows it on phones only.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-ear"></i>
            <span class="nds-label">Screen Reader Text</span>
          </span>
          <p class="nds-item-desc">The <code class="nds-inline-code lang-html">sr</code> token and <code class="nds-inline-code lang-html">nds-sr-only</code> remove the element from the screen, but screen readers still read it. A button that shows only its icon keeps its name.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-flash"></i>
            <span class="nds-label">CSS Only</span>
          </span>
          <p class="nds-item-desc">The <code class="nds-inline-code lang-html">hidden</code> rule loads with the page's first styles, so a hidden element never shows before the main CSS arrives. There is nothing to initialize.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="hidden-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use `hidden` for state: a panel, a menu or a step that your script shows and hides. Use `data-hidden` for an element that has no place at some screen widths, such as a topbar widget or secondary details.
- One element can carry `hidden` and `data-hidden`. Either one hides it.
- Use `data-hidden` instead of your own media query. Its ranges match the NDS breakpoints.
- `hidden` and `data-hidden` without `sr` also hide the element from screen readers. Add `sr` when the text must still be read.
- To show only a button's icon on phones, write `data-hidden="sm sr"` on its label. Never hide the label without `sr`: the button loses its name.
- A label hidden with `sr` does not change the button's shape. The button keeps its text padding and does not become a square icon button.
- Use `nds-sr-only` for text that only screen readers need at every width, such as a word that tells screen readers what a number badge counts.
- Do not hide a main action on phones. Move it into a [Dropmenu](../components/dropmenu), so the user can still reach it.
- A hidden element still loads its images and frames. Leave heavy content out of the markup instead of hiding it.

</div>
  </div>
</section>

<section id="hidden-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-sr-only` | Any element | Hides the element on screen at every width. Screen readers still read it |
| `nds-hidden` | Any element | Hides the element, the same as `hidden`. NDS scripts write it to match `data-state="hidden"`: write `hidden` or `data-state` yourself, not this class |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `hidden` | Any element | Hides the element at every width and from screen readers, over any `display` value. Set it yourself, or let a component's script set it |
| `data-hidden` | Any element | Hides the element inside each width range it names: `sm` (narrower than 600px), `md` (600px to 959px), `lg` (960px and wider). Separate tokens with spaces. Add `sr` to hide it on screen only |
| `data-state` | Any element | The `hidden` token hides the element, the same as `hidden`. Component scripts write it through `NDS.State` |
{: .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="hidden-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Manage Records](../examples/manage-records): Search and Filter buttons that show only their icons on phones.
- [Search Template](../templates/search-template): the same toolbar buttons above search results.
- [FAQ Template](../templates/faq-template): the same toolbar buttons above the questions.

</div>
  </div>
</section>
