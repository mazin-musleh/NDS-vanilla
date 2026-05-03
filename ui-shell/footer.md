---
layout: page
title: Footer
hero_title: Footer - National Design System
hero_description: A site-wide footer that organizes secondary navigation, contact links, social media, mobile app downloads, legal notices, and partner logos into a responsive multi-column layout.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Footer Structure -->
<section id="footerStructure" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Footer Structure</h2>
            <p class="nds-section-description">The footer sits at the bottom of every page and is split into two regions: a flex-wrap multi-column content area, and a bottom bar that stacks general links above the copyright and policy links below it, alongside partner logos.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Component Tree</div>
                    </div>
                    <div class="demo-container nds-noBg">
                        <div class="nds-code nds-expandable">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <div class="nds-expandable-content">
                                <code class="code">
footer.nds-footer.nds-content-wrapper
├── nav.nds-footer-content
│   ├── div.nds-footer-column (link column)
│   │   ├── h3.nds-footer-heading
│   │   └── ul.nds-footer-list
│   │       └── li > a.nds-link.nds-footer-link
│   └── div.nds-footer-column.nds-footer-icons (merged icons column)
│       ├── div.nds-footer-icon-group (social)
│       │   ├── h3.nds-footer-heading
│       │   └── div.nds-footer-icon-row
│       │       └── a.nds-btn.nds-secondary-outline.nds-icon-only
│       └── div.nds-footer-icon-group (mobile apps)
│           ├── h3.nds-footer-heading
│           └── div.nds-footer-icon-row
│               └── a.nds-btn.nds-secondary-outline.nds-xl.nds-icon-only
│
├── hr.nds-divider.nds-lg
│
└── div.nds-footer-bottom
    ├── div.nds-footer-meta
    │   ├── div.nds-footer-links (top row — underlined generic links)
    │   └── div.nds-footer-legal (legal block)
    │       ├── div.nds-footer-copyright (copyright text)
    │       └── div.nds-footer-policy (policy/terms links — no underline)
    └── div.nds-footer-logos
        └── a > img (partner/government logos)
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Footer Content Columns -->
<section id="footerColumns" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Content Columns</h2>
            <p class="nds-section-description">The footer content area uses a flex-wrap layout. Each column has a heading and a list of links. On desktop columns display side by side; on tablet they drop to two per row; on mobile they stack to one per row.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Link Column</div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-footer-column-1" id="tab-footer-column-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-footer-column-1" aria-labelledby="tab-footer-column-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;footer class="nds-footer nds-content-wrapper" role="contentinfo" aria-label="Site Footer"&gt;
  &lt;nav class="nds-footer-content" aria-label="Footer navigation"&gt;
    &lt;!-- Link column --&gt;
    &lt;div class="nds-footer-column"&gt;
      &lt;h3 class="nds-footer-heading"&gt;Services&lt;/h3&gt;
      &lt;ul class="nds-footer-list"&gt;
        &lt;li&gt;&lt;a class="nds-link nds-footer-link" href="/services/individuals"&gt;&lt;span class="nds-label"&gt;Individuals&lt;/span&gt;&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a class="nds-link nds-footer-link" href="/services/businesses"&gt;&lt;span class="nds-label"&gt;Businesses&lt;/span&gt;&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a class="nds-link nds-footer-link" href="/services/government"&gt;&lt;span class="nds-label"&gt;Government Entities&lt;/span&gt;&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a class="nds-link nds-footer-link" href="/open-data"&gt;&lt;span class="nds-label"&gt;Open Data&lt;/span&gt;&lt;/a&gt;&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/div&gt;

    &lt;!-- Contact column with leading icons --&gt;
    &lt;div class="nds-footer-column"&gt;
      &lt;h3 class="nds-footer-heading"&gt;Contact Us&lt;/h3&gt;
      &lt;ul class="nds-footer-list"&gt;
        &lt;li&gt;&lt;a class="nds-link nds-footer-link" href="#"&gt;&lt;i class="nds-icon nds-hgi-location-01" aria-hidden="true"&gt;&lt;/i&gt;&lt;span class="nds-label"&gt;Riyadh, King Fahd Road&lt;/span&gt;&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a class="nds-link nds-footer-link" href="tel:920000000"&gt;&lt;i class="nds-icon nds-hgi-headphones" aria-hidden="true"&gt;&lt;/i&gt;&lt;span class="nds-label"&gt;920 000 000&lt;/span&gt;&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a class="nds-link nds-footer-link" href="mailto:info@example.gov.sa"&gt;&lt;i class="nds-icon nds-hgi-mail-01" aria-hidden="true"&gt;&lt;/i&gt;&lt;span class="nds-label"&gt;info@example.gov.sa&lt;/span&gt;&lt;/a&gt;&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/div&gt;
  &lt;/nav&gt;
&lt;/footer&gt;
                                        </code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Social and App Links -->
<section id="footerSocial" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Social and App Links</h2>
            <p class="nds-section-description">Social and mobile-app icon groups share a single merged column (<code class="nds-inline-code lang-html">nds-footer-icons</code>) so the two clusters sit side-by-side and wrap together. Social icons use outline icon buttons; app store links use the larger <code class="nds-inline-code lang-html">nds-xl</code> variant with inline SVG brand marks.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <!-- Social Icons -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Social Icons Column</div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-footer-social-1" id="tab-footer-social-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-footer-social-1" aria-labelledby="tab-footer-social-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;!-- Merged icons column with social + mobile-app groups --&gt;
&lt;div class="nds-footer-column nds-footer-icons"&gt;
  &lt;div class="nds-footer-icon-group"&gt;
    &lt;h3 class="nds-footer-heading"&gt;Follow Us&lt;/h3&gt;
    &lt;div class="nds-footer-icon-row"&gt;
      &lt;a class="nds-btn nds-secondary-outline nds-icon-only" href="#" target="_blank" aria-label="Twitter"&gt;
        &lt;i class="nds-icon nds-hgi-new-twitter" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;/a&gt;
      &lt;a class="nds-btn nds-secondary-outline nds-icon-only" href="#" target="_blank" aria-label="Facebook"&gt;
        &lt;i class="nds-icon nds-hgi-facebook-02" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;/a&gt;
      &lt;a class="nds-btn nds-secondary-outline nds-icon-only" href="#" target="_blank" aria-label="YouTube"&gt;
        &lt;i class="nds-icon nds-hgi-youtube" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;/a&gt;
      &lt;a class="nds-btn nds-secondary-outline nds-icon-only" href="#" target="_blank" aria-label="LinkedIn"&gt;
        &lt;i class="nds-icon nds-hgi-linkedin-02" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;/a&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;!-- Mobile-app group lives in the same column --&gt;
&lt;/div&gt;
                                        </code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Mobile Apps -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Mobile App Column</div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-footer-apps-1" id="tab-footer-apps-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-footer-apps-1" aria-labelledby="tab-footer-apps-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;!-- Mobile-app group (sibling of social inside .nds-footer-icons) --&gt;
&lt;div class="nds-footer-icon-group"&gt;
  &lt;h3 class="nds-footer-heading"&gt;Mobile App&lt;/h3&gt;
  &lt;div class="nds-footer-icon-row"&gt;
    &lt;a class="nds-btn nds-secondary-outline nds-xl nds-icon-only" href="#" target="_blank" aria-label="Apple App Store"&gt;
      &lt;svg&gt;...&lt;/svg&gt;
    &lt;/a&gt;
    &lt;a class="nds-btn nds-secondary-outline nds-xl nds-icon-only" href="#" target="_blank" aria-label="Google Play Store"&gt;
      &lt;svg&gt;...&lt;/svg&gt;
    &lt;/a&gt;
  &lt;/div&gt;
&lt;/div&gt;
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Footer Bottom -->
<section id="footerBottom" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Footer Bottom Bar</h2>
            <p class="nds-section-description">A horizontal bar below the divider. The meta block stacks two regions: <code class="nds-inline-code lang-html">.nds-footer-links</code> (top, underlined generic links), and <code class="nds-inline-code lang-html">.nds-footer-legal</code> (the legal block, holding <code class="nds-inline-code lang-html">.nds-footer-copyright</code> above <code class="nds-inline-code lang-html">.nds-footer-policy</code>). Partner logos sit on the opposite side. On mobile the layout stacks vertically and centers.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Bottom Bar</div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-footer-bottom-1" id="tab-footer-bottom-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-footer-bottom-1" aria-labelledby="tab-footer-bottom-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;hr class="nds-divider nds-lg"&gt;
&lt;div class="nds-footer-bottom"&gt;
  &lt;div class="nds-footer-meta"&gt;
    &lt;div class="nds-footer-links"&gt;
      &lt;a href="#"&gt;&lt;span class="nds-label"&gt;Footer Link&lt;/span&gt;&lt;/a&gt;
      &lt;a href="#"&gt;&lt;span class="nds-label"&gt;Footer Link&lt;/span&gt;&lt;/a&gt;
      &lt;a href="#"&gt;&lt;span class="nds-label"&gt;Footer Link&lt;/span&gt;&lt;/a&gt;
      &lt;a href="#"&gt;&lt;span class="nds-label"&gt;Footer Link&lt;/span&gt;&lt;/a&gt;
      &lt;a href="#"&gt;&lt;span class="nds-label"&gt;Footer Link&lt;/span&gt;&lt;/a&gt;
    &lt;/div&gt;
    &lt;div class="nds-footer-legal"&gt;
      &lt;div class="nds-footer-copyright"&gt;
        &lt;span&gt;All Rights Reserved Ministry of Digital Affairs &amp;copy; 2026&lt;/span&gt;
      &lt;/div&gt;
      &lt;div class="nds-footer-policy"&gt;
        &lt;a href="/terms-and-conditions"&gt;&lt;span class="nds-label"&gt;Terms &amp; Conditions&lt;/span&gt;&lt;/a&gt;
        &lt;a href="/privacy-policy"&gt;&lt;span class="nds-label"&gt;Privacy Policy&lt;/span&gt;&lt;/a&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-footer-logos"&gt;
    &lt;a href="#"&gt;
      &lt;img src="assets/img/logo.svg" loading="lazy" width="40" height="40" alt="Authority Logo"&gt;
    &lt;/a&gt;
    &lt;a href="https://www.vision2030.gov.sa/" target="_blank"&gt;
      &lt;img src="assets/img/vision-2030.svg" loading="lazy" width="60" height="40" alt="Saudi Vision 2030"&gt;
    &lt;/a&gt;
  &lt;/div&gt;
&lt;/div&gt;
                                        </code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Built-in Features -->
<section id="footerFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-layout-03"></i>
                        <span class="nds-label">Multi-Column Layout</span>
                    </span>
                    <p class="nds-item-desc">Content columns flow across 4 columns on desktop, 2 on tablet, and stack to 1 on mobile with no extra configuration.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-share-01"></i>
                        <span class="nds-label">Merged Icons Column</span>
                    </span>
                    <p class="nds-item-desc">Social-media and mobile-app groups share one column (<code class="nds-inline-code lang-html">nds-footer-icons</code>) with flex-wrap content, so the two clusters sit side-by-side at wider widths and stack as space narrows. The column spans the full row on mobile. Social icons use outline icon buttons; app store links use the larger <code class="nds-inline-code lang-html">nds-xl</code> variant with inline SVG brand marks.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-image-01"></i>
                        <span class="nds-label">Logo Bar</span>
                    </span>
                    <p class="nds-item-desc">A flexible logo strip in the bottom bar. Add <code class="nds-inline-code lang-html">nds-oncolor</code> to individual images to invert them to white on dark backgrounds.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-mobile-programming-01"></i>
                        <span class="nds-label">Responsive Stacking</span>
                    </span>
                    <p class="nds-item-desc">The bottom bar switches from horizontal (links left, logos right) to centered vertical stacking on mobile.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-dark-mode"></i>
                        <span class="nds-label">Light and Green Variants</span>
                    </span>
                    <p class="nds-item-desc">Default light neutral background adapts to dark mode automatically. Add <code class="nds-inline-code lang-html">nds-green</code> for a dark green footer with white text and on-color button tokens.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="footerGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use the footer on every page to provide consistent secondary navigation, legal links, and contact information</li>
                    <li>Use the footer alongside the <a class="nds-color" href="{{ 'ui-shell/header' | relative_url }}">Header</a> and <a class="nds-color" href="{{ 'ui-shell/sidemenu' | relative_url }}">Side Menu</a> to complete the UI shell. The header handles primary navigation, the side menu handles section navigation, and the footer handles secondary and legal content</li>
                    <li>Keep footer columns to <strong>6 or fewer</strong>. More columns crowd the layout on tablet where it drops to 2 columns</li>
                    <li>Put the most important links (home, about, main sections) in the first column. Contact and social columns work best at the end</li>
                    <li>Do not duplicate primary navigation links in the footer. The footer is for secondary access: legal pages, contact info, social profiles, and sitemap</li>
                    <li>Add leading icons to contact links (location, email, phone) to make them scannable. Use icon classes from the HGI Stroke Rounded set</li>
                    <li>Always include at minimum: privacy policy, terms and conditions, and accessibility links in the bottom bar for government compliance</li>
                    <li>Use <code class="nds-inline-code lang-html">target="_blank"</code> on external links and social media to keep users on the site</li>
                    <li>App store links use inline SVG for the Apple, Google Play, and Huawei logos rather than icon fonts, since these are brand marks not available in the icon set</li>
                    <li>The default footer uses a light neutral background that adapts to dark mode automatically. Add <code class="nds-inline-code lang-html">nds-green</code> to <code class="nds-inline-code lang-html">.nds-footer</code> for the dark green variant with white text</li>
                    <li>Add <code class="nds-inline-code lang-html">nds-oncolor</code> to individual logo <code class="nds-inline-code lang-html">&lt;img&gt;</code> elements that should invert to white on dark backgrounds (dark mode and green variant). Logos without the class keep their original colors in all modes</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Class</th><th>Applied To</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-green</code></td>
                            <td><code class="nds-inline-code lang-html">.nds-footer</code></td>
                            <td>Dark green background with white text, inverted logos, and on-color button/link tokens</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-oncolor</code></td>
                            <td>Logo <code class="nds-inline-code lang-html">&lt;img&gt;</code> elements</td>
                            <td>Inverts the image to white on dark backgrounds (dark mode and green variant)</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-footer-icons</code></td>
                            <td><code class="nds-inline-code lang-html">.nds-footer-column</code></td>
                            <td>Marks a column as the merged social + mobile-app container. Lays out <code class="nds-inline-code lang-html">.nds-footer-icon-group</code> children with flex-wrap.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-icon-only</code></td>
                            <td>Social and app link buttons</td>
                            <td>Renders buttons as square icon-only buttons without labels</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-xl</code></td>
                            <td>App store buttons</td>
                            <td>Larger button size for the mobile app store SVG icons</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--background-footer</code></td>
                            <td>Theme token</td>
                            <td>Background color for the <code class="nds-inline-code lang-html">nds-green</code> variant. Resolves to dark green in light mode and a semi-transparent green in dark mode.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--divider-color</code></td>
                            <td>Theme token</td>
                            <td>Color of the heading underline and the legal-link separators. Inherits from the global divider token; the <code class="nds-inline-code lang-html">nds-green</code> variant overrides it locally to <code class="nds-inline-code lang-html">--alpha-white-10</code>.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</section>
