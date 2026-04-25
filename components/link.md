---
layout: page
title: Link
hero_title: Link - National Design System
hero_description: Styled links for embedding references, calls to action, and external destinations within body text, alert messages, and content areas.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Color Variants -->
<section id="linkVariants" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Color Variants</h2>
            <p class="nds-section-description">Choose a color palette that matches the link's visual context. Neutral is the default for most content; primary draws attention to key calls to action.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-primary", ".nds-link", "linkColor"]'>
                                <span class="nds-label">Primary</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-underline", ".nds-link", "linkStyle"]'>
                                <span class="nds-label">Underline</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo" style="padding: var(--spacing-2xl);">
                            <p>For complete policy details, review the <a href="#" class="nds-link">official guidelines</a> before submitting your application.</p>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-link-variants-1" id="tab-link-variants-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-link-variants-1"
                                    aria-labelledby="tab-link-variants-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;p&gt;For complete policy details, review the &lt;a href="/guidelines" class="nds-link"&gt;official guidelines&lt;/a&gt; before submitting your application.&lt;/p&gt;
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

<!-- On-Color -->
<section id="linkOnColor" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">On-Color</h2>
            <p class="nds-section-description">Use the on-color variant when placing links on primary or brand-colored backgrounds to ensure sufficient contrast.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-underline", ".nds-link", "oncolorStyle"]'>
                                <span class="nds-label">Underline</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div style="background: var(--button-background-primary-default); padding: var(--spacing-xl); border-radius: var(--radius-md);">
                                <p style="color: var(--text-oncolor-primary);">Explore <a href="#" class="nds-link nds-oncolor">available programs</a> and register your organization today.</p>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-link-oncolor-1" id="tab-link-oncolor-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-link-oncolor-1"
                                    aria-labelledby="tab-link-oncolor-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;div style="background: var(--button-background-primary-default); padding: var(--spacing-xl); border-radius: var(--radius-md);"&gt;
  &lt;p style="color: var(--text-oncolor-primary);"&gt;Explore &lt;a href="/programs" class="nds-link nds-oncolor"&gt;available programs&lt;/a&gt; and register your organization today.&lt;/p&gt;
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

<!-- External Links -->
<section id="linkExternal" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">External Links</h2>
            <p class="nds-section-description">Links pointing to a different domain get an icon indicator automatically. Add <code class="nds-inline-code lang-html">nds-external</code> manually for same-hostname links that should be treated as external.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-underline", ".nds-link", "externalStyle"]'>
                                <span class="nds-label">Underline</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo" style="padding: var(--spacing-2xl); display: flex; flex-direction: column; gap: var(--spacing-md);">
                            <p>Consult the <a href="https://www.data.gov.sa/" class="nds-link">Saudi Open Data portal</a> for published datasets.</p>
                            <p>Review the <a href="https://www.itu.int/en/Pages/default.aspx" class="nds-link nds-primary">ITU accessibility guidelines</a> before publishing your service.</p>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-link-external-1" id="tab-link-external-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-link-external-1"
                                    aria-labelledby="tab-link-external-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;!-- JS detects the external hostname and adds nds-external, target="_blank", rel="noopener noreferrer" --&gt;
&lt;p&gt;Consult the &lt;a href="https://www.data.gov.sa/" class="nds-link"&gt;Saudi Open Data portal&lt;/a&gt; for published datasets.&lt;/p&gt;
&lt;p&gt;Review the &lt;a href="https://www.itu.int/en/Pages/default.aspx" class="nds-link nds-primary"&gt;ITU accessibility guidelines&lt;/a&gt; before publishing your service.&lt;/p&gt;
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

<!-- Built-in Features -->
<section id="linkFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-plug-socket"></i>
                        <span class="nds-label">Auto-initialization</span>
                    </span>
                    <p class="nds-item-desc">Runs on every page at load time. No selector required, no manual call needed.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-colors"></i>
                        <span class="nds-label">Color Variants</span>
                    </span>
                    <p class="nds-item-desc">Neutral, primary, and on-color palettes with hover and active states driven by design tokens.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-globe-02"></i>
                        <span class="nds-label">External Link Detection</span>
                    </span>
                    <p class="nds-item-desc">Compares each link's hostname against the current page origin and marks cross-domain links with the external icon automatically.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-security-check"></i>
                        <span class="nds-label">Safe Navigation</span>
                    </span>
                    <p class="nds-item-desc">External links receive <code class="nds-inline-code lang-html">target="_blank"</code> and <code class="nds-inline-code lang-html">rel="noopener noreferrer"</code> without any manual markup.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-navigation-03"></i>
                        <span class="nds-label">Navigation Exclusions</span>
                    </span>
                    <p class="nds-item-desc">Links inside the main nav, side menu, and footer are skipped so navigation structure is never modified.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-text-underline"></i>
                        <span class="nds-label">Underline Modifier</span>
                    </span>
                    <p class="nds-item-desc">Add <code class="nds-inline-code lang-html">nds-underline</code> to reinforce link identity in dense text where color alone may not be sufficient.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="linkGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use <code class="nds-inline-code lang-html">nds-link</code> on <code class="nds-inline-code lang-html">&lt;a&gt;</code> elements for inline text links within paragraphs, alert messages, card footers, and other content areas</li>
                    <li>Use <code class="nds-inline-code lang-html">nds-primary</code> for calls to action embedded in body text where the primary color signals importance, such as "Learn more" or "Apply now" links</li>
                    <li>Use <code class="nds-inline-code lang-html">nds-oncolor</code> when placing links on primary or dark backgrounds. Neutral and primary variants do not have sufficient contrast on colored surfaces</li>
                    <li>Add <code class="nds-inline-code lang-html">nds-underline</code> in dense reading content where adjacent text without underlines could make links hard to distinguish from surrounding copy</li>
                    <li>Add <code class="nds-inline-code lang-html">nds-neutral</code> on links inside <code class="nds-inline-code lang-html">.nds-content-section nds-demo-section</code> if you need them to stay neutral. By default, all links in a content section use the primary color</li>
                    <li>Do not use <code class="nds-inline-code lang-html">nds-link</code> on standalone navigation items. Use <a class="nds-color" href="{{ 'components/breadcrumb' | relative_url }}">Breadcrumb</a>, <a class="nds-color" href="{{ 'ui-shell/sidemenu' | relative_url }}">Side Navigation</a>, or <a class="nds-color" href="{{ 'components/tabs' | relative_url }}">Tabs</a> for navigation structure</li>
                    <li>Do not use a link when an action is intended rather than navigation. Use <code class="nds-inline-code lang-html">nds-btn nds-subtle</code> for text-like interactive controls that trigger behavior</li>
                    <li>External links (different domain) are detected and marked automatically. You do not need to add <code class="nds-inline-code lang-html">target="_blank"</code> or <code class="nds-inline-code lang-html">rel="noopener noreferrer"</code> manually for cross-domain URLs</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Class</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">nds-primary</code></td><td>Primary color palette: uses the brand color for default, hover, and active states</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-color</code></td><td>Alias for <code class="nds-inline-code lang-html">nds-primary</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-oncolor</code></td><td>On-color palette for links placed on dark or branded backgrounds</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-neutral</code></td><td>Explicitly neutral color. Use inside <code class="nds-inline-code lang-html">.nds-content-section nds-demo-section</code> to opt out of the primary default</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-underline</code></td><td>Adds underline decoration to reinforce link identity in dense text</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-external</code></td><td>Shows the external-link icon after the text. Applied automatically by JS to cross-domain links</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--link-color</code></td><td><code class="nds-inline-code lang-html">--link-neutral</code></td><td>Text color in the default state. Set on the element or an ancestor to override the variant</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--link-hover</code></td><td><code class="nds-inline-code lang-html">--link-neutral-hovered</code></td><td>Text color on hover</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--link-pressed</code></td><td><code class="nds-inline-code lang-html">--link-neutral-pressed</code></td><td>Text color on active press</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--link-focused</code></td><td><code class="nds-inline-code lang-html">--link-neutral-focused</code></td><td>Text color when focused</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--link-visited</code></td><td><code class="nds-inline-code lang-html">--link-neutral-visited</code></td><td>Text color for visited links (inactive by default, commented out in source)</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p><strong>NDS.Link</strong> runs automatically at page load. Call <strong>NDS.Link.init()</strong> after injecting link elements dynamically to apply external-link detection to the new markup.</p>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-javascript line-numbers">
// Runs automatically on page load. No manual call needed.
// After inserting links dynamically, call init() to process the new elements:
NDS.Link.init();
                    </code>
                </div>
            </div>

        </div>
    </div>
</section>
