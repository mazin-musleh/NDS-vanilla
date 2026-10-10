---
layout: page
title: Quote
hero_title: Quote - National Design System
hero_description: A quote shows one quoted statement in a card, with an optional title and the name of the person who said it
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.2.0"
last_edit: "10/10/2026 - 05:28 PM"
---

<section id="quote-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A quote is a `figure` that holds a `blockquote` and a `figcaption`. The blockquote holds an optional title and the quoted text, between two large quote marks. The figcaption names the author with a small [Persona](../components/persona).

Pick another component when:

- the quote is part of running text, such as an article or a CMS page: a plain `blockquote` in [Prose](../layout/prose)
- the text is a message from the system to the user: [Alert](../components/alert)

</div>
  </div>
</section>

<section id="quote-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="quote-base" data-canon data-variants="quote-variants-table">
<figure class="nds-quote">
  <blockquote class="nds-quote-body">
    <span class="nds-quote-title">The Power of Design</span>
    <p class="nds-quote-text">A well-crafted design system transforms how teams build products, creating consistency that users feel without necessarily seeing.</p>
  </blockquote>
  <figcaption class="nds-quote-author">
    <div class="nds-persona nds-sm">
      <div class="nds-avatar">
        <img src="../docs-assets/img/avatar5.webp" alt="">
      </div>
      <div class="nds-persona-info">
        <cite class="nds-persona-name">Fatima Al-Harbi</cite>
        <span class="nds-persona-desc">Head of Design</span>
      </div>
    </div>
  </figcaption>
</figure>
</script>
    </div>
  </div>
</section>

<section id="quote-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Background | Card (default) | — | — | A card with a background and a border. For a quote on a plain page |
| Background | Transparent | `.nds-transparent` | `.nds-quote` | No background, no border and no side padding. For a quote inside a colored section or another card |
| No title | No title | `remove` | `.nds-quote-title` | Leave out the title when a few words cannot sum up the quote |
| No author | No author | `remove` | `.nds-quote-author` | Leave out the author for a quote from a document, a publication or an unnamed source. Name the source in the title instead |
| No avatar | No avatar | `remove` | `.nds-avatar` | Show the name and the role only, when there is no photo of the author |
{: #quote-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="quote-features" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-code"></i>
            <span class="nds-label">Semantic Markup</span>
          </span>
          <p class="nds-item-desc"><code class="nds-inline-code lang-html">&lt;figure&gt;</code>, <code class="nds-inline-code lang-html">&lt;blockquote&gt;</code>, <code class="nds-inline-code lang-html">&lt;figcaption&gt;</code> and <code class="nds-inline-code lang-html">&lt;cite&gt;</code> mark up the quote the way the HTML standard describes a quote with its source.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-quote-up"></i>
            <span class="nds-label">Quote Marks</span>
          </span>
          <p class="nds-item-desc">CSS draws the opening and closing marks, so screen readers skip them and they never block text selection. In English, the marks move to the other corners and mirror.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-profile"></i>
            <span class="nds-label">Persona Author</span>
          </span>
          <p class="nds-item-desc">The author is a small <a class="nds-color" href="../components/persona">Persona</a>, so it shows the same avatar, name and role as everywhere else on the site.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-smart-phone-01"></i>
            <span class="nds-label">Phone Sizing</span>
          </span>
          <p class="nds-item-desc">On phones, the marks, the padding and the quoted text get smaller.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-variable"></i>
            <span class="nds-label">CSS Knobs</span>
          </span>
          <p class="nds-item-desc">Twelve custom properties set the background, the border, the radius, the padding, the marks, and the title and text type.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="quote-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use a quote for one statement that supports the page: a testimonial, a research finding or a policy citation.
- Put the quote next to the text it supports. A quote with no context is hard to judge.
- Add `cite="URL"` on the `blockquote` when the source has a web address. It does not show, but it names the source for search engines and assistive tools.
- Keep the title to one to six words. Leave it out rather than write a long one.
- Do not use a quote for help text or for the words of the interface. Write them as plain text.
- Keep the Persona at `nds-sm`. A larger Persona takes attention from the quote.
- Do not stack quotes one under another. For several testimonials, use a [Swiper](../components/swiper) or a grid of [Cards](../components/cards).

</div>
  </div>
</section>

<section id="quote-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### CSS Custom Properties
{: .nds-block-title}

Set these on `.nds-quote`. On phones the quote sets `--quote-mark-size`, `--quote-padding`, `--quote-text-FS` and `--quote-text-LH` itself. To keep your value on phones, set those four in a `style` attribute, or in a rule that loads after the NDS stylesheet.

| Property | Default | Controls |
|---|---|---|
| `--quote-background-default` | `var(--background-card)` | Card background |
| `--quote-border` | `var(--border-neutral-primary)` | Card border color |
| `--quote-radius` | `var(--radius-lg)` | Card corner radius |
| `--quote-padding` | `var(--spacing-2xl)` (`var(--spacing-xl)` on phones) | Side padding. The top and bottom padding is this plus `--spacing-sm`. It also sets how far the marks reach into the padding |
| `--quote-mark-color` | `var(--text-primary-strong)` | Quote mark color |
| `--quote-mark-size` | `48px` (`28px` on phones) | Width and height of each quote mark |
| `--quote-title-FS` | `var(--typo-display-xs-FS)` | Title font size |
| `--quote-title-LH` | `var(--typo-display-xs-LH)` | Title line height |
| `--quote-title-color` | `var(--text-default)` | Title color |
| `--quote-text-FS` | `var(--typo-text-xl-FS)` (`var(--typo-text-lg-FS)` on phones) | Quoted text font size |
| `--quote-text-LH` | `var(--typo-text-xl-LH)` (`var(--typo-text-lg-LH)` on phones) | Quoted text line height |
| `--quote-text-color` | `var(--text-primary-paragraph)` | Quoted text color |
{: .nds-table .nds-responsive}

</div>
  </div>
</section>
