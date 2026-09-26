---
layout: page
title: Link
hero_title: Link - National Design System
hero_description: Styled links for embedding references, calls to action, and external destinations within body text, alert messages, and content areas.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "26/09/2026 - 04:24 PM"
---

<section id="linkOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A link is an `<a>` element. Every `<a>` gets the link look, with or without the `nds-link` class, except buttons, cards and avatars. A script marks each link to another website as external.

Pick another component when:

- the element starts an action instead of opening a page: [Button](../components/button), for example `nds-btn nds-subtle`
- the links show where the page sits in the site: [Breadcrumb](../components/breadcrumb)
- the links are the site's navigation: [Side Menu](../ui-shell/sidemenu) or [Tabs](../components/tabs)

</div>
  </div>
</section>

<section id="linkMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="link-single" data-canon data-variants="linkVariantsTable">
<a href="#" class="nds-link">official guidelines</a>
</script>
    </div>
  </div>
</section>

<section id="linkVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Every row goes on the link. Inside a content section, a link is also underlined. The builder preview sits outside one.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Color | Primary (default) | — | — | The brand color, for links in running text |
| Color | Neutral | `.nds-neutral` | `.nds-link` | A quiet link that does not draw the eye, such as a secondary link in a list |
| Color | On color | `.nds-oncolor` | `.nds-link` | For a link on a deep primary or dark background |
| Icon | None (default) | — | — | Text only. A link to another website gets the external icon from the script |
| Icon | Link icon | `.nds-icon` | `.nds-link` | A link icon after the text, for an internal link that needs a visual cue |
| Icon | External icon | `.nds-external` | `.nds-link` | The external icon after the text. The script adds it to links to other websites, so add it yourself only to force it |
| Underline | Underline | `.nds-underline` | `.nds-link` | Always underlined, for dense text where color alone does not mark the link |
{: #linkVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="linkFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-plug-socket"></i>
            <span class="nds-label">Auto-initialization</span>
          </span>
          <p class="nds-item-desc">The script runs on every page when it loads. It needs no selector and no call.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-colors"></i>
            <span class="nds-label">Color Variants</span>
          </span>
          <p class="nds-item-desc">Primary, neutral and on color, each with its own hover, pressed, focus and visited colors from design tokens.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-globe-02"></i>
            <span class="nds-label">External Link Detection</span>
          </span>
          <p class="nds-item-desc">The script compares each link's hostname with the page's hostname. A link to another hostname, a subdomain included, gets the external icon.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-security-check"></i>
            <span class="nds-label">Safe Navigation</span>
          </span>
          <p class="nds-item-desc">An external link opens in a new tab. Browsers already add <code class="nds-inline-code lang-html">noopener</code> to <code class="nds-inline-code lang-html">target="_blank"</code>, so the script adds no <code class="nds-inline-code lang-html">rel</code>.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-paragraph"></i>
            <span class="nds-label">Block Content</span>
          </span>
          <p class="nds-item-desc">A link that wraps a block, such as <code class="nds-inline-code lang-html">&lt;a&gt;&lt;p&gt;…&lt;/p&gt;&lt;/a&gt;</code> from an editor, gets the external icon inside its last block, so the icon stays on the text line.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-toggle-off"></i>
            <span class="nds-label">Opt-out Control</span>
          </span>
          <p class="nds-item-desc"><code class="nds-inline-code lang-html">data-no-external</code> on a link or on a container stops the external icon and the new tab for every link inside it.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-text-underline"></i>
            <span class="nds-label">Underline Modifier</span>
          </span>
          <p class="nds-item-desc">A link is underlined on hover and when pressed. <code class="nds-inline-code lang-html">nds-underline</code> keeps the underline on, and links inside a content section always have it.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="linkPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Keep the primary default for links in running text, so readers find them.
- Add `nds-neutral` to a link that should stay quiet, such as a secondary link in a list or in metadata.
- Add `nds-underline` in dense text outside a content section, where color alone does not mark the link.
- On a deep primary or dark surface, primary and neutral links lack contrast. Add `nds-oncolor` for the white look, or give the surface `data-theme="dark"`. See [Dark Areas](../components/themes#themesDarkArea).
- Write link text that names the destination, such as "official guidelines". Avoid "click here".
- Do not add `target="_blank"` to a link to another website: the script adds it. Add `rel="noreferrer"` yourself when the link must not send the page address.
- Add `data-no-external` to a link or a container for a trusted partner site or an embedded widget that must open in the same tab.
- A link that holds only an icon or an image gets no external icon from the script. Add `nds-external` to it to force the icon.

</div>
  </div>
</section>

<section id="linkApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Other Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-primary` | `.nds-link` | Primary inside a host that makes its links neutral, such as a breadcrumb or an alert |
| `nds-color` | `.nds-link` | The same as `nds-primary` |
| `nds-external-block` | `.nds-link` | The script adds it to an external link that wraps a block. The icon moves to that block |
| `nds-external-badge` | the link's last block | The script adds it to the block that shows the external icon |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-no-external` | `<a>` or any container | The script skips every link inside it: no external icon and no new tab |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set these on the link, or on a container to reach every link inside it. The color classes set the five color properties.

| Property | Default | Controls |
|---|---|---|
| `--link-color` | `var(--link-primary)` | Text color |
| `--link-hover` | `var(--link-primary-hovered)` | Text color on hover |
| `--link-pressed` | `var(--link-primary-pressed)` | Text color when pressed |
| `--link-focused` | `var(--link-primary-focused)` | Text color when focused |
| `--link-visited` | `var(--link-primary-visited)` | Text color after a visit |
| `--link-decoration` | `none` | Text decoration. Hover, press, `nds-underline` and a content section set `underline` |
{: .nds-table .nds-responsive}

The theme-wide colors are the `--link-primary-*`, `--link-neutral-*` and `--link-oncolor-*` tokens. See [Tokens](../components/tokens).

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Link.init()` | Marks every link to another hostname: adds `nds-external` and `target="_blank"`. It runs on page load. Call it again after you add links to the page |
{: .nds-table .nds-responsive}

<script type="text/html" id="link-js" data-canon data-lang="js">
document.querySelector('#results').insertAdjacentHTML('beforeend',
  '<a href="https://www.data.gov.sa/" class="nds-link">Open Data portal</a>');
NDS.Link.init();
</script>

The full API is in the banner of `_js/nds-link.js`.

</div>
  </div>
</section>

<section id="linkRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Prose](../layout/prose): links in running text, primary and underlined.
- [Faculty CV](../examples/faculty-cv): link buttons to other websites that the script marks as external.
- [Breadcrumb](../components/breadcrumb), [Footer](../ui-shell/footer) and [Alert](../components/alert): hosts that keep their links neutral.

</div>
  </div>
</section>
