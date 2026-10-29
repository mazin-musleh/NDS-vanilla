---
layout: page
title: Quote
hero_title: Quote - National Design System
hero_description: A quote shows one quoted statement in a card, with an optional title and the name of the person who said it
breadcrumb: [["Components", "/components/?shelf=Components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "25/10/2026 - 10:41 PM"
---

<section id="quote-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A quote is a `figure` that holds a `blockquote` and a `figcaption`. The blockquote holds an optional title and the quoted text, between two large quote marks. The figcaption names the author with a small [Persona](../components/persona).

Pick another component when:

- a short quote with no author, inside running text: a plain `blockquote` in [Prose](../layout/prose)
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
| Size | LG (default) | — | — | 48px marks and large text. Makes the quote a highlight of the page. On a phone it steps down to MD. Write `nds-lg` to keep LG on a phone |
| Size | MD | `.nds-md` | `.nds-quote` | 40px marks, a smaller title, text and padding. For a quote in a narrow column. It stays MD on a phone |
| Size | SM | `.nds-sm` | `.nds-quote` | 32px marks, a smaller title, body-size text and the least padding. For a quote inside an article, at the size of its text, or in a card or a side column |
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
      <ul class="nds-feature-list nds-grid nds-divided-rows nds-icons-subtle">
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-code" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Semantic Markup</span>
              <p class="nds-card-description"><code class="nds-inline-code lang-html">&lt;figure&gt;</code>, <code class="nds-inline-code lang-html">&lt;blockquote&gt;</code>, <code class="nds-inline-code lang-html">&lt;figcaption&gt;</code> and <code class="nds-inline-code lang-html">&lt;cite&gt;</code> mark up the quote the way the HTML standard describes a quote with its source.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-quote-up" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Quote Marks</span>
              <p class="nds-card-description">CSS draws the opening and closing marks, so screen readers skip them and they never block text selection. In English, the marks move to the other corners and mirror.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-profile" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Persona Author</span>
              <p class="nds-card-description">The author is a small <a class="nds-color" href="../components/persona">Persona</a>, so it shows the same avatar, name and role as everywhere else on the site.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-smart-phone-01" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Phone Layout</span>
              <p class="nds-card-description">On phones, the marks move above and below the text, so the text takes the full width. A quote with no size class also steps down one size, to MD. A size you wrote stays as written.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-variable" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">CSS Knobs</span>
              <p class="nds-card-description">Twelve custom properties set the background, the border, the radius, the padding, the marks, and the title and text type.</p>
            </div>
          </div>
        </li>
      </ul>
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
- Pick the size by the place: LG makes the quote a highlight of the page, MD fits a narrow column, and SM sits inside an article at the size of its text, or in a card or a side column.
- Add `cite="URL"` on the `blockquote` when the source has a web address. It does not show, but it names the source for search engines and assistive tools.
- Keep the title to one to six words. Leave it out rather than write a long one.
- Do not use a quote for help text or for the words of the interface. Write them as plain text.
- Keep the Persona at `nds-sm`. A larger Persona takes attention from the quote.
- Do not stack quotes one under another. For several testimonials, use a [Swiper](../components/swiper) or a grid of [Cards](../components/card).

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

Set these on `.nds-quote`, or on a parent. A value you set wins over the size classes and the phone step.

| Property | Default | Controls |
|---|---|---|
| `--quote-background-default` | `var(--background-card)` | Card background |
| `--quote-border` | `var(--border-neutral-primary)` | Card border color |
| `--quote-radius` | `var(--radius-lg)` | Card corner radius |
| `--quote-padding` | `var(--spacing-2xl)` (`xl` on MD, `lg` on SM) | Side padding. The top and bottom padding is this plus `--spacing-sm`. It also sets how far the marks reach into the padding |
| `--quote-mark-color` | `var(--text-primary-strong)` | Quote mark color |
| `--quote-mark-size` | `48px` (`40px` on MD, `32px` on SM) | Width and height of each quote mark |
| `--quote-title-FS` | `var(--typo-display-xs-FS)` (`text-xl` on MD, `text-lg` on SM) | Title font size |
| `--quote-title-LH` | `var(--typo-display-xs-LH)` (`text-xl` on MD, `text-lg` on SM) | Title line height |
| `--quote-title-color` | `var(--text-display)` | Title color |
| `--quote-text-FS` | `var(--typo-text-xl-FS)` (`lg` on MD, `md` on SM) | Quoted text font size |
| `--quote-text-LH` | `var(--typo-text-xl-LH)` (`lg` on MD, `md` on SM) | Quoted text line height |
| `--quote-text-color` | `var(--text-primary-paragraph)` | Quoted text color |
{: .nds-table .nds-responsive}

</div>
  </div>
</section>
