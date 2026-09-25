---
layout: page
title: Footer
hero_title: Footer - National Design System
hero_description: The footer closes every page with secondary links, contact details, social and app links, legal notices and partner logos
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.0"
last_edit: "25/09/2026 - 05:11 PM"
---

<section id="footerOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use one footer at the end of every page. It holds what people look for last: secondary links, contact details, social profiles, app downloads, legal notices and partner logos.
- The [Header](../ui-shell/header) holds the main navigation, and the [Side Menu](../ui-shell/sidemenu) holds the navigation inside a section. The footer does not repeat them.
- The footer is a page shell part, so it is not shown in a demo box. **The live copy is this page's own footer, at the bottom:** the Options change it.

</div>
  </div>
</section>

<section id="footerMarkup" class="nds-content-section nds-doc-markup">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="footer-canon" data-canon data-preview="none" data-variants="footerVariantsTable" data-live="footer.nds-footer" data-sheet="top">
<footer class="nds-footer nds-content-wrapper nds-brand" role="contentinfo" aria-label="Site Footer">
  <nav class="nds-footer-content" aria-label="Footer navigation">
    <div class="nds-footer-column">
      <span class="nds-footer-heading" id="footer-col-1">Services</span>
      <ul class="nds-footer-list" aria-labelledby="footer-col-1">
        <li>
          <a class="nds-link nds-footer-link" href="#">
            <span class="nds-label">Individuals</span>
          </a>
        </li>
        <li>
          <a class="nds-link nds-footer-link" href="#">
            <span class="nds-label">Businesses</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="nds-footer-column">
      <span class="nds-footer-heading" id="footer-col-2">Contact Us</span>
      <ul class="nds-footer-list" aria-labelledby="footer-col-2">
        <li>
          <a class="nds-link nds-footer-link" href="tel:920000000">
            <i class="nds-icon nds-hgi-headphones" aria-hidden="true"></i>
            <span class="nds-label">920 000 000</span>
          </a>
        </li>
        <li>
          <a class="nds-link nds-footer-link" href="mailto:info@example.gov.sa">
            <i class="nds-icon nds-hgi-mail-01" aria-hidden="true"></i>
            <span class="nds-label">info@example.gov.sa</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="nds-footer-column nds-footer-icons">
      <div class="nds-footer-icon-group">
        <span class="nds-footer-heading" id="footer-social">Follow Us</span>
        <div class="nds-footer-icon-row" role="group" aria-labelledby="footer-social">
          <a class="nds-btn nds-secondary-outline nds-icon-only nds-tooltip" data-tooltip-hover="500" href="#" target="_blank" title="Follow Us on X" aria-label="Follow Us on X">
            <i class="nds-icon nds-hgi-new-twitter" aria-hidden="true"></i>
          </a>
          <a class="nds-btn nds-secondary-outline nds-icon-only nds-tooltip" data-tooltip-hover="500" href="#" target="_blank" title="Follow Us on LinkedIn" aria-label="Follow Us on LinkedIn">
            <i class="nds-icon nds-hgi-linkedin-02" aria-hidden="true"></i>
          </a>
        </div>
      </div>
      <div class="nds-footer-icon-group">
        <span class="nds-footer-heading" id="footer-apps">Mobile App</span>
        <div class="nds-footer-icon-row" role="group" aria-labelledby="footer-apps">
          <a class="nds-btn nds-secondary-outline nds-xl nds-icon-only nds-tooltip" data-tooltip-hover="500" href="#" target="_blank" title="Apple App Store" aria-label="Apple App Store">
            <i class="nds-icon nds-icon-apple" aria-hidden="true"></i>
          </a>
          <a class="nds-btn nds-secondary-outline nds-xl nds-icon-only nds-tooltip" data-tooltip-hover="500" href="#" target="_blank" title="Google Play Store" aria-label="Google Play Store">
            <i class="nds-icon nds-icon-google-play" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </div>
  </nav>
  <hr class="nds-divider nds-lg">
  <div class="nds-footer-bottom">
    <div class="nds-footer-meta">
      <div class="nds-footer-links">
        <a class="nds-link" href="#">
          <span class="nds-label">Site Map</span>
        </a>
        <a class="nds-link" href="#">
          <span class="nds-label">FAQ</span>
        </a>
      </div>
      <div class="nds-footer-legal">
        <div class="nds-footer-copyright">
          <span>All Rights Reserved Ministry of Example &copy; 2026</span>
        </div>
        <div class="nds-footer-policy">
          <a class="nds-link" href="#">
            <span class="nds-label">Privacy Policy</span>
          </a>
          <a class="nds-link" href="#">
            <span class="nds-label">Terms and Conditions</span>
          </a>
          <a class="nds-link" href="#">
            <span class="nds-label">Accessibility</span>
          </a>
        </div>
      </div>
    </div>
    <div class="nds-footer-logos">
      <a href="#">
        <img class="nds-oncolor" src="../assets/img/palm_swords.svg" loading="lazy" width="40" height="40" alt="Authority logo">
      </a>
      <a href="https://www.vision2030.gov.sa/" target="_blank">
        <img class="nds-oncolor" src="../assets/img/2030-vision.svg" loading="lazy" width="60" height="40" alt="Saudi Vision 2030">
      </a>
    </div>
  </div>
</footer>
</script>
    </div>
  </div>
</section>

<section id="footerParts" class="nds-content-section nds-doc-parts">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Parts</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

| Part | Holds | Required |
|---|---|---|
| `footer.nds-footer` | The whole footer. Add `nds-content-wrapper` to keep its content at the page width | Yes |
| `nav.nds-footer-content` | The columns | No |
| `.nds-footer-column` | One `.nds-footer-heading` and one `ul.nds-footer-list` of `a.nds-link.nds-footer-link` links. A link can start with an icon | No |
| `.nds-footer-column.nds-footer-icons` | The social and app groups, side by side | No |
| `.nds-footer-icon-group` | One `.nds-footer-heading` and one `.nds-footer-icon-row` of icon buttons | No |
| `hr.nds-divider.nds-lg` | The line between the columns and the bottom bar | No |
| `.nds-footer-bottom` | `.nds-footer-meta` on the start side and `.nds-footer-logos` on the end side | Yes |
| `.nds-footer-links` | A row of underlined links, such as a site map | No |
| `.nds-footer-legal` | `.nds-footer-copyright`, then `.nds-footer-policy` | Yes |
| `.nds-footer-policy` | The policy links, not underlined: privacy, terms and accessibility | Yes |
| `.nds-footer-logos` | Partner and government logos, each an `<img>`, alone or in a link | No |
{: .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="footerVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Surface | Brand (default) | `.nds-brand` | `.nds-footer` | The deep primary surface with white text. Buttons, links, headings and dividers switch to their on-color versions. `.nds-green` is a deprecated alias |
| Surface | Light | — | — | Leave out `.nds-brand`: a light neutral surface, dark in dark mode |
| Logo | On color | — | — | Add `.nds-oncolor` to a one-color logo `<img>` so it turns white on the brand footer and in dark mode. It is a choice per logo: leave it off a logo whose colors must stay |
| App button | App store | — | — | An app-store button is `.nds-xl`, a larger icon button, with the mark `nds-icon-apple`, `nds-icon-google-play` or `nds-icon-huawei` |
{: #footerVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="footerFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layout-01"></i>
            <span class="nds-label">Wrapping Columns</span>
          </span>
          <p class="nds-item-desc">The columns share the row and wrap as space runs out: two to a row below 960px, one to a row on a phone.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-share-08"></i>
            <span class="nds-label">Icons Column</span>
          </span>
          <p class="nds-item-desc">The social and app groups sit side by side in one column, and take a full row below 960px.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-paint-board"></i>
            <span class="nds-label">Brand Surface</span>
          </span>
          <p class="nds-item-desc">On the brand footer, buttons, links, headings and dividers switch to their on-color versions, so no extra class is needed on them.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-moon-02"></i>
            <span class="nds-label">Dark Mode</span>
          </span>
          <p class="nds-item-desc">Both surfaces follow dark mode. A logo with <code class="nds-inline-code lang-html">nds-oncolor</code> turns white on the brand footer and in dark mode.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-smart-phone-01"></i>
            <span class="nds-label">Phone Layout</span>
          </span>
          <p class="nds-item-desc">On a phone, the bottom bar stacks and centers its links, legal notices and logos.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-puzzle"></i>
            <span class="nds-label">CSS Only</span>
          </span>
          <p class="nds-item-desc">The footer needs no script. The icon buttons' tooltips come from <a href="../components/tooltip">Tooltip</a>.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="footerPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Keep to six columns or fewer. Below 960px they drop to two a row, and more columns make the footer long.
- Put the most used links in the first column, and contact and social links last.
- Do not repeat the main navigation. The footer is for secondary pages, contact details, social profiles and legal notices.
- Start contact links with an icon (location, phone, email), so they are quick to scan.
- Always include privacy, terms and accessibility links in `.nds-footer-policy`. Government sites must have them.
- Give every icon-only button an `aria-label`, and the same text in `title` for its tooltip.
- Open social profiles, app stores and other external sites in a new tab, with `target="_blank"`.
- Keep `nds-brand` unless the design asks for the light footer. Leaving it out is a choice, not a reset.
- Add `nds-oncolor` only to one-color logos that should turn white. A logo with brand colors stays as it is.

</div>
  </div>
</section>

<section id="footerApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### CSS Custom Properties
{: .nds-block-title}

| Property | Default | Controls |
|---|---|---|
| `--background-footer` | Theme token | The brand footer's background: the deep primary surface in light mode, a primary wash in dark mode |
| `--divider-color` | Theme token | The heading underline and the divider line. The brand footer sets `--colors-alpha-white-10` |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

The footer has no script, methods or events.

</div>
  </div>
</section>

<section id="footerRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Header](../ui-shell/header), [Main Navigation](../ui-shell/mainnav) and [Side Menu](../ui-shell/sidemenu): the other parts of the page shell.
- [Tooltip](../components/tooltip): the hover labels on the icon buttons.

</div>
  </div>
</section>
