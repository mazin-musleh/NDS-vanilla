---
layout: page
title: Prose
hero_title: Prose Layout - National Design System
hero_description: Prose styles classless text, such as the output of a rich text editor or a CMS, inside one wrapper
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.7.0"
updated: "1.12.x"
last_edit: "10/10/2026 - 05:28 PM"
---

<section id="prose-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Prose is one class, `nds-prose`, on the element that holds the text, such as an `article`. The elements inside it need no classes. Headings, links, lists and tables have their look on every page. Prose adds the space between them, and styles quotes and image captions. Prose needs no JavaScript.

Pick another component when:

- the parts are components, not text, and each needs space below it: [Block](../layout/block)
- the quote is a featured quote with a title and an author: [Quote](../components/quote)
- the table needs sorting, pages or sub-rows: [Tables](../components/tables)

</div>
  </div>
</section>

<section id="prose-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="prose-article" data-canon data-variants="prose-variants-table" data-demo-width="100%">
<!-- A classless article: no element inside has a class, except the alert component -->
<article class="nds-prose">
  <h2>Passport Renewal</h2>
  <p>Renew your passport online through <a href="#">Absher</a>. The fee is <strong>300 riyals</strong> for 5 years.</p>
  <p>The new passport is ready for pickup within <em>3 working days</em>.</p>
  <h3>Eligibility</h3>
  <ul>
    <li>Saudi citizens aged 21 or older</li>
    <li>A passport that expires within 6 months
      <ul>
        <li>Or a passport that has already expired</li>
      </ul>
    </li>
  </ul>
  <h3>Steps</h3>
  <ol>
    <li>Sign in to Absher</li>
    <li>Open Passports
      <ol>
        <li>Choose Renew Passport</li>
        <li>Pick the length
          <ol>
            <li>5 years</li>
            <li>10 years</li>
          </ol>
        </li>
      </ol>
    </li>
    <li>Pay the fee</li>
  </ol>
  <div class="nds-alert nds-card" data-status="info" role="alert">
    <span class="nds-feedback nds-alert-icon nds-outline">
      <span class="nds-feedback-icon">
        <i class="nds-icon" aria-hidden="true"></i>
      </span>
    </span>
    <div class="nds-alert-content">
      <div class="nds-alert-text">
        <span class="nds-alert-title">National address</span>
        <p class="nds-alert-description">An old address delays the delivery of the new passport.</p>
      </div>
    </div>
  </div>
  <blockquote>Bring the old passport when you pick up the new one.</blockquote>
  <figure>
    <img src="../assets/icon/SAflag.min.svg" alt="Flag of Saudi Arabia" width="120" height="84">
    <figcaption>The flag on the passport cover</figcaption>
  </figure>
  <table>
    <thead>
      <tr><th>Stage</th><th>Duration</th></tr>
    </thead>
    <tbody>
      <tr><td>Review</td><td>2 days</td></tr>
      <tr><td>Printing</td><td>1 day</td></tr>
    </tbody>
  </table>
  <hr>
  <p>For help, call 992 from Sunday to Thursday.</p>
</article>
</script>
    </div>
  </div>
</section>

<section id="prose-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Prose | Prose (default) | `.nds-prose` | `article` | Styles the classless elements inside. Turn it off to see the same markup without it |
| Card | Card | `.nds-card` | `article` | Puts the text in a card with padding and a 1px border. Write both classes |
| Card | Card | `.nds-stroke` | `article` | The card's border. Written with `nds-card` |
{: #prose-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="prose-features" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-text-font"></i>
            <span class="nds-label">Classless Markup</span>
          </span>
          <p class="nds-item-desc">The elements inside the wrapper need no classes. Editor and CMS output renders as it is.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-shield-01"></i>
            <span class="nds-label">Components Keep Their Look</span>
          </span>
          <p class="nds-item-desc">Prose rules weigh no more than one class, and they load before the components. A component inside the wrapper, such as an <code class="nds-inline-code lang-html">nds-table</code>, keeps its own styles.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layers-01"></i>
            <span class="nds-label">Vertical Rhythm</span>
          </span>
          <p class="nds-item-desc">Paragraphs, lists, quotes, figures, tables, code blocks and alerts get the same gap below them. <code class="nds-inline-code lang-html">h2</code> and <code class="nds-inline-code lang-html">h3</code> get a larger gap above them, which grows with the screen width up to 1200px. <code class="nds-inline-code lang-html">h4</code> to <code class="nds-inline-code lang-html">h6</code> get 24px.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-border-full"></i>
            <span class="nds-label">Flush Edges</span>
          </span>
          <p class="nds-item-desc">The first child has no gap above it and the last child has no gap below it, so the wrapper sits flush in a card or a section body. The last child of a quote, a list item or a table cell has no gap below it either.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-text-wrap"></i>
            <span class="nds-label">Long Words Break</span>
          </span>
          <p class="nds-item-desc">A long URL or word breaks to fit the width, so it never pushes the page sideways on a phone. A table cell that holds one can shrink too.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-left-to-right-list-number"></i>
            <span class="nds-label">List Spacing</span>
          </span>
          <p class="nds-item-desc">List items get space between them. Right-to-left pages get more, because Arabic letters fill more of the line. Nested ordered lists use 1., then a., then i.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-edit-02"></i>
            <span class="nds-label">Editor Preview</span>
          </span>
          <p class="nds-item-desc">The typing area of the <a href="../components/editor">Editor</a> uses the same spacing, so a draft looks like the published text.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="prose-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use prose for text you do not write element by element: CMS body fields, editor output, articles, help and policy text.
- Put `nds-prose` once, on the element the CMS renders into. Do not put it on each paragraph.
- Split the page with [sections](../layout/section). Put prose on the text inside a section body.
- Start the headings inside prose at `h2`. The page title is the hero's `h1`.
- Do not add `nds-section-title` or `nds-block-title` to a heading inside prose. Bare headings are already styled. Those classes give the heading a page-level size.
- Use the [Quote](../components/quote) component for a featured quote with an author. A bare `blockquote` is a quote inside the text.
- Use the [Tables](../components/tables) component for a table that needs sorting, pages or a phone layout. A bare `table` is a static table.
- Give every image an `alt` text.

</div>
  </div>
</section>

<section id="prose-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-prose` | The element that holds the text | Styles the classless elements inside it |
{: .nds-table .nds-responsive}

### Element Styles
{: .nds-block-title}

Some elements are styled on every page, with or without `nds-prose`. Others are styled only inside the wrapper.

| Element | Effect |
|---|---|
| `h1` to `h6` | Everywhere: size, weight and color. Inside prose: a larger gap above `h2` to `h6` |
| `ul`, `ol` | Everywhere: indent. Inside prose: a gap below, space between items, and 1., a., i. markers on nested `ol` |
| `img` | Everywhere: full width at most. Inside prose: a gap above and below a direct child `img` or `picture` |
| `a` | Everywhere: the [Link](../components/link) style |
| `hr` | Everywhere: the [Divider](../utilities/divider). Inside prose: a wider gap above and below |
| `table` | Everywhere: the [Tables](../components/tables) style. Inside prose: a gap below |
| `p`, `figure`, `pre` | Inside prose: a gap below |
| `blockquote` | Inside prose: a gap below, a 3px side border and secondary text color |
| `figcaption` | Inside prose: small, secondary text below the image |
{: .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="prose-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Content Template](../templates/content-template): an `article` with `nds-prose` that holds the whole page text.
- [FAQ Template](../templates/faq-template): `nds-prose` on accordion bodies.
- [Service Template](../templates/service-template): a block of text with `nds-block nds-prose`.
- [Program](../examples/program): text blocks with `nds-prose` in each section.

</div>
  </div>
</section>
