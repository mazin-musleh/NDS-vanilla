---
layout: page
title: Quote
hero_title: Quote - National Design System
hero_description: A semantic quotation block for surfacing attributed content with decorative icon marks, an optional title, and persona-based attribution.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---


<!-- Quote Builder -->
<section id="quoteBuilder" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Quote Builder</h2>
            <p class="nds-section-description">Toggle optional parts to build the layout you need. Use the default background for standalone surface cards, or transparent to embed inside an existing section.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">

                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Background: ">
                                    <span class="nds-label">Background: Default</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item" data-state="selected" data-quote-bg="default">
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item" data-quote-bg="transparent">
                                            <span class="nds-label">Transparent</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button class="nds-btn nds-subtle" data-state="selected" data-quote-toggle="title">
                                <span class="nds-label">Title</span>
                            </button>

                            <button class="nds-btn nds-subtle" data-state="selected" data-quote-toggle="avatar">
                                <span class="nds-label">Avatar</span>
                            </button>

                            <button class="nds-btn nds-subtle" data-state="selected" data-quote-toggle="author">
                                <span class="nds-label">Author</span>
                            </button>

                        </div>
                    </div>

                    <div class="demo-container nds-noBg">
                        <div class="state-demo">
                            <figure class="nds-quote">
                                <blockquote class="nds-quote-body">
                                    <span class="nds-quote-title">The Power of Design</span>
                                    <p class="nds-quote-text">A well-crafted design system transforms how teams build products, creating consistency that users feel without necessarily seeing.</p>
                                </blockquote>
                                <figcaption class="nds-quote-author">
                                    <div class="nds-persona nds-sm">
                                        <div class="nds-avatar">
                                            <i class="nds-icon nds-icon-avatar" aria-hidden="true"></i>
                                        </div>
                                        <div class="nds-persona-info">
                                            <cite class="nds-persona-name">Ahmed Al-Harbi</cite>
                                            <span class="nds-persona-desc">Head of Design</span>
                                        </div>
                                    </div>
                                </figcaption>
                            </figure>
                        </div>
                    </div>

                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-quote-builder-1" id="tab-quote-builder-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                    id="panel-quote-builder-1" aria-labelledby="tab-quote-builder-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;figure class="nds-quote"&gt;
    &lt;blockquote class="nds-quote-body"&gt;
        &lt;span class="nds-quote-title"&gt;The Power of Design&lt;/span&gt;
        &lt;p class="nds-quote-text"&gt;A well-crafted design system transforms how teams build products, creating consistency that users feel without necessarily seeing.&lt;/p&gt;
    &lt;/blockquote&gt;
    &lt;figcaption class="nds-quote-author"&gt;
        &lt;div class="nds-persona nds-sm"&gt;
            &lt;div class="nds-avatar"&gt;
                &lt;i class="nds-icon nds-icon-avatar" aria-hidden="true"&gt;&lt;/i&gt;
            &lt;/div&gt;
            &lt;div class="nds-persona-info"&gt;
                &lt;cite class="nds-persona-name"&gt;Ahmed Al-Harbi&lt;/cite&gt;
                &lt;span class="nds-persona-desc"&gt;Head of Design&lt;/span&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/figcaption&gt;
&lt;/figure&gt;
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
<section id="quoteFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:24px; --row-gap: 24px; --col-gap: 32px;">

                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-code"></i>
                        <span class="nds-label">Spec-correct Semantic Markup</span>
                    </span>
                    <p class="nds-item-desc">Rendered with <code class="nds-inline-code lang-html">&lt;figure&gt;</code>, <code class="nds-inline-code lang-html">&lt;blockquote&gt;</code>, <code class="nds-inline-code lang-html">&lt;figcaption&gt;</code>, and <code class="nds-inline-code lang-html">&lt;cite&gt;</code> as recommended by the HTML Living Standard for a quoted excerpt with attribution.</p>
                </div>

                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-mask"></i>
                        <span class="nds-label">Icon-based Quote Marks</span>
                    </span>
                    <p class="nds-item-desc">Opening and closing marks render as SVG mask images via CSS <code class="nds-inline-code lang-html">::before</code> and <code class="nds-inline-code lang-html">::after</code>, keeping them out of the accessibility tree and never blocking text selection.</p>
                </div>

                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-globe"></i>
                        <span class="nds-label">RTL and LTR Adaptive</span>
                    </span>
                    <p class="nds-item-desc">Quote marks automatically swap corners and mirror orientation between Arabic RTL and English LTR using CSS logical properties and transform-only overrides. No additional markup is required.</p>
                </div>

                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-moon"></i>
                        <span class="nds-label">Dark Mode Adaptive</span>
                    </span>
                    <p class="nds-item-desc">The mark color resolves through <code class="nds-inline-code lang-html">--text-primary-sa-flag</code>, a semantic token that automatically shifts to a lighter green in dark themes without any component-level overrides.</p>
                </div>

                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-profile"></i>
                        <span class="nds-label">Persona Integration</span>
                    </span>
                    <p class="nds-item-desc">The author block embeds <a class="nds-color" href="{{ 'components/persona' | relative_url }}">Persona</a> at the <code class="nds-inline-code lang-html">nds-sm</code> size tier, inheriting all persona token overrides and dark-mode behavior automatically.</p>
                </div>

                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-variable"></i>
                        <span class="nds-label">CSS Token Overrides</span>
                    </span>
                    <p class="nds-item-desc">Twelve scoped custom properties expose every visual dimension: background, border, radius, padding, mark size, mark color, title and body typography, and text colors. Set any on the <code class="nds-inline-code lang-html">.nds-quote</code> element to restyle without touching SCSS.</p>
                </div>

            </div>
        </div>
    </div>
</section>


<!-- Usage Guidelines -->
<section id="quoteGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body nds-stack">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use Quote to surface a single attributed statement that reinforces a point on the page: testimonials, editorial highlights, research findings, or policy citations.</li>
                    <li>Place Quote in a content section alongside related body text rather than in isolation. The component draws attention to a specific claim, so surrounding context helps readers evaluate it.</li>
                    <li>Always include the <code class="nds-inline-code lang-html">cite</code> attribute on <code class="nds-inline-code lang-html">&lt;blockquote&gt;</code> when the source has a URL. This does not render visually but signals provenance to search engines and assistive tools.</li>
                    <li>Use the transparent variant when embedding inside a colored section or over a tinted background. Use the default variant (white card surface) when the quote sits on a neutral page background and needs its own visual boundary.</li>
                    <li>Keep the title short: one to six words that frame the quotation. If you cannot summarize the quote in a few words, omit the title rather than writing a long heading.</li>
                    <li>Omit the author block when the source is a document, publication, or anonymous. Attributing to a name without a face or context can feel misleading. Use the title field to name the source instead.</li>
                    <li>Do not use Quote for system feedback, inline help text, or UI copy. For those cases, use <a class="nds-color" href="{{ 'components/alert' | relative_url }}">Alert</a> or a plain paragraph instead.</li>
                    <li>Avoid stacking multiple Quote blocks consecutively. If you need to display several testimonials, consider a slider or a grid of compact cards rather than a vertical list of full-sized quotes.</li>
                    <li>The persona inside the author block uses <code class="nds-inline-code lang-html">nds-sm</code> size by default. Do not replace it with a larger persona tier as it will visually overpower the quotation.</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead>
                        <tr>
                            <th>Class</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-transparent</code></td>
                            <td>Removes the card background and border. Use when embedding the quote over an existing colored or textured surface.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--quote-background-default</code></td>
                            <td><code class="nds-inline-code lang-html">--background-card</code></td>
                            <td>Card surface color in the default variant.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--quote-border</code></td>
                            <td><code class="nds-inline-code lang-html">--border-default</code></td>
                            <td>Border color around the card.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--quote-radius</code></td>
                            <td><code class="nds-inline-code lang-html">--radius-lg</code></td>
                            <td>Corner radius of the card.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--quote-padding</code></td>
                            <td><code class="nds-inline-code lang-html">--spacing-2xl</code></td>
                            <td>Inner padding on all sides. Also controls how far the marks bleed toward the card edges.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--quote-mark-color</code></td>
                            <td><code class="nds-inline-code lang-html">--text-primary-sa-flag</code></td>
                            <td>Fill color of the opening and closing icon marks.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--quote-mark-size</code></td>
                            <td><code class="nds-inline-code lang-html">48px</code></td>
                            <td>Width and height of each icon mark.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--quote-title-FS</code></td>
                            <td><code class="nds-inline-code lang-html">--typo-display-xs-FS</code></td>
                            <td>Font size of the title paragraph.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--quote-title-LH</code></td>
                            <td><code class="nds-inline-code lang-html">--typo-display-xs-LH</code></td>
                            <td>Line height of the title paragraph.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--quote-title-color</code></td>
                            <td><code class="nds-inline-code lang-html">--text-default</code></td>
                            <td>Text color of the title.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--quote-text-FS</code></td>
                            <td><code class="nds-inline-code lang-html">--typo-text-xl-FS</code></td>
                            <td>Font size of the quotation body.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--quote-text-LH</code></td>
                            <td><code class="nds-inline-code lang-html">--typo-text-xl-LH</code></td>
                            <td>Line height of the quotation body.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--quote-text-color</code></td>
                            <td><code class="nds-inline-code lang-html">--text-primary-paragraph</code></td>
                            <td>Text color of the quotation body.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</section>
