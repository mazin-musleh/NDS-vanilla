---
layout: page
title: Block
hero_title: Block Layout - National Design System
hero_description: A lightweight content grouping primitive used inside a section body to separate titled sub-groups of paragraphs, lists, tables, and other flow content without starting a new section.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Block Structure -->
<section id="blockStructure" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Structure</h2>
            <p class="nds-section-description">Blocks live inside <code class="nds-inline-code lang-html">.nds-section-body</code> and hold flow content directly. An optional <code class="nds-inline-code lang-html">.nds-block-title</code> heading sits at the top of the block.</p>
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
                                <code class="lang-html code">
section.nds-content-section nds-demo-section
&#9492;&#9472;&#9472; div.nds-section-body
    &#9492;&#9472;&#9472; div.nds-block
        &#9500;&#9472;&#9472; h3.nds-block-title   (optional)
        &#9492;&#9472;&#9472; p, ul, ol, table, img...   (direct flow content)
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Standard -->
<section id="blockStandard" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Standard</h2>
            <p class="nds-section-description">Group related paragraphs, lists, or tables under a shared heading. Blocks stack vertically inside the section body with consistent spacing.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Titled and Untitled Blocks</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <section class="nds-content-section nds-demo-section" style="width: 100%;">
                                <div class="nds-section-body">
                                    <div class="nds-block">
                                        <h3 class="nds-block-title">Block Title</h3>
                                        <p>First paragraph of content inside the block. Paragraphs, lists, and media get automatic styling when inside <code class="nds-inline-code lang-html">.nds-block</code>.</p>
                                        <p>Second paragraph to demonstrate spacing between content elements.</p>
                                    </div>
                                    <div class="nds-block">
                                        <h3 class="nds-block-title">Another Block</h3>
                                        <ul>
                                            <li>List items work inside blocks</li>
                                            <li>With automatic padding and spacing</li>
                                        </ul>
                                    </div>
                                    <div class="nds-block">
                                        <p>Blocks without a title work too. The title is optional.</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-block-standard-1" id="tab-block-standard-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-block-standard-1"
                                    aria-labelledby="tab-block-standard-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;section class="nds-content-section nds-demo-section"&gt;
    &lt;div class="nds-section-body"&gt;
        &lt;div class="nds-block"&gt;
            &lt;h3 class="nds-block-title"&gt;Block Title&lt;/h3&gt;
            &lt;p&gt;First paragraph of content inside the block.&lt;/p&gt;
            &lt;p&gt;Second paragraph to demonstrate spacing.&lt;/p&gt;
        &lt;/div&gt;
        &lt;div class="nds-block"&gt;
            &lt;h3 class="nds-block-title"&gt;Another Block&lt;/h3&gt;
            &lt;ul&gt;
                &lt;li&gt;List items work inside blocks&lt;/li&gt;
                &lt;li&gt;With automatic padding and spacing&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/div&gt;
        &lt;div class="nds-block"&gt;
            &lt;p&gt;Blocks without a title work too. The title is optional.&lt;/p&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/section&gt;
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
<section id="blockFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:24px; --row-gap: 24px; --col-gap: 32px;">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-text-align-left"></i>
                        <span class="nds-label">Auto Flow Styling</span>
                    </span>
                    <p class="nds-item-desc">Paragraphs, images, and video nested inside a block pick up primary paragraph color, pretty wrapping, and responsive media caps automatically.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-menu-square"></i>
                        <span class="nds-label">Optional Titled Heading</span>
                    </span>
                    <p class="nds-item-desc">Add <code class="nds-inline-code lang-html">.nds-block-title</code> when the block needs a heading. Every title token is overridable through CSS custom properties.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-distribute-vertical-center"></i>
                        <span class="nds-label">Consistent Vertical Rhythm</span>
                    </span>
                    <p class="nds-item-desc">Blocks carry a 2rem bottom margin that collapses on the last child, so stacks of blocks inside a section body breathe without extra classes.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-layout-grid"></i>
                        <span class="nds-label">Works Anywhere</span>
                    </span>
                    <p class="nds-item-desc">Drop blocks inside any section body — default, color-themed, horizontal, or full-width. Positioning and spacing stay consistent across layouts.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-frame"></i>
                        <span class="nds-label">Container Query Anchor</span>
                    </span>
                    <p class="nds-item-desc">Each block establishes a named <code class="nds-inline-code lang-html">block</code> CSS container. Descendants like <a class="nds-color" href="{{ 'layout/grid' | relative_url }}">grids</a> and <a class="nds-color" href="{{ 'components/quote' | relative_url }}">quotes</a> respond to the block's actual width, not the viewport — correct sizing in multi-column layouts where the block is narrower than the section.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="blockGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use <strong>blocks</strong> to subdivide content inside a single <a class="nds-color" href="{{ 'layout/section' | relative_url }}">section</a> instead of starting a new section — they share the same visual container but group related paragraphs under their own heading</li>
                    <li>Prefer <strong>one section per topic</strong>, with multiple blocks inside when the topic has distinct sub-groups (best practices, modifier tables, API references, etc.)</li>
                    <li>Keep block titles short and descriptive. They render at <code class="nds-inline-code lang-html">--typo-text-xl-FS</code> by default, sitting below the section title in visual hierarchy</li>
                    <li>Do not wrap cards, grids, or other full components in a block. Place them directly under <code class="nds-inline-code lang-html">.nds-section-body</code> so the block-title hierarchy stays reserved for flow content</li>
                    <li>Do not nest blocks. If a sub-group needs its own heading level, consider whether it belongs in a new section instead</li>
                    <li>Skip the title on a single-block section where the section title already carries the heading — the wrapper is still useful for the automatic flow styling</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--block-title-FS</code></td><td>var(--typo-text-xl-FS)</td><td>Block title font size</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--block-title-LH</code></td><td>var(--typo-text-xl-LH)</td><td>Block title line height</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--block-title-FW</code></td><td>600</td><td>Block title font weight</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--block-title-MB</code></td><td>var(--spacing-lg)</td><td>Spacing below the title (when exposed via the shared token)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--block-title-color</code></td><td>var(--text-display)</td><td>Block title color</td></tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</section>
