---
layout: page
title: Prose
hero_title: Prose Layout - National Design System
hero_description: Default styling for classless flowing content, so the headings, paragraphs, lists, quotes, and tables emitted by text editors and CMSs read correctly inside one wrapper with no classes on the markup.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.7.0"
updated: "1.10.0"
last_edit: "25/08/2026 - 12:00 AM"
---

<!-- Prose Structure -->
<section id="proseStructure" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Structure</h2>
            <p class="nds-section-description">One wrapper class on the content region. Everything inside stays classless: the markup a rich-text editor or CMS body field produces is the markup you render.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
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
div.nds-prose   (or article.nds-prose)
&#9500;&#9472;&#9472; h2, h3, h4...   (classless headings)
&#9500;&#9472;&#9472; p, ul, ol, blockquote, figure, table, hr, img
&#9492;&#9472;&#9472; any NDS component   (keeps its own look untouched)
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

<!-- Flowing Content -->
<section id="proseDemo" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Flowing Content</h2>
            <p class="nds-section-description">A complete classless article: every element below is styled by the system with no classes in the markup.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block nds-prose">
                <div class="nds-showcase">
                    <div class="nds-demo-card">
                        <div class="demo-header">
                            <div class="demo-label">Classless Article</div>
                        </div>
                        <div class="demo-container">
                            <div class="state-demo">
                                <div class="nds-prose">
                                    <h2>Service Overview</h2>
                                    <p>This paragraph carries a <a href="#">regular link</a>, <strong>strong text</strong>, and <em>emphasized text</em>, all styled without a single class attribute.</p>
                                    <p>A second paragraph demonstrates the vertical rhythm between consecutive blocks of flowing text.</p>
                                    <h3>Eligibility</h3>
                                    <ul>
                                        <li>First requirement</li>
                                        <li>Second requirement
                                            <ul>
                                                <li>Nested detail</li>
                                                <li>Another nested detail</li>
                                            </ul>
                                        </li>
                                        <li>Third requirement</li>
                                    </ul>
                                    <ol>
                                        <li>Submit the application</li>
                                        <li>Track the request</li>
                                    </ol>
                                    <blockquote>A flowing citation renders with a side bar and secondary tone; for a featured pull-quote card, use the Quote component instead.</blockquote>
                                    <figure>
                                        <img src="{{ 'assets/icon/SAflag.min.svg' | relative_url }}" alt="Flag of Saudi Arabia" width="120" height="84">
                                        <figcaption>A caption in smaller, secondary type below the image</figcaption>
                                    </figure>
                                    <table>
                                        <thead><tr><th>Stage</th><th>Duration</th></tr></thead>
                                        <tbody>
                                            <tr><td>Review</td><td>3 days</td></tr>
                                            <tr><td>Approval</td><td>1 day</td></tr>
                                        </tbody>
                                    </table>
                                    <hr>
                                    <p>A closing paragraph after the divider ends the article with no trailing margin.</p>
                                </div>
                            </div>
                        </div>
                        <div class="demo-code">
                            <div class="nds-code nds-expandable">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                        <i class="nds-icon nds-hgi-copy-01"></i>
                                    </button>
                                </div>
                                <div class="nds-expandable-content">
                                    <code class="lang-html code">
&lt;div class="nds-prose"&gt;
    &lt;h2&gt;Service Overview&lt;/h2&gt;
    &lt;p&gt;This paragraph carries a &lt;a href="#"&gt;regular link&lt;/a&gt;, &lt;strong&gt;strong text&lt;/strong&gt;, and &lt;em&gt;emphasized text&lt;/em&gt;, all styled without a single class attribute.&lt;/p&gt;
    &lt;p&gt;A second paragraph demonstrates the vertical rhythm between consecutive blocks of flowing text.&lt;/p&gt;
    &lt;h3&gt;Eligibility&lt;/h3&gt;
    &lt;ul&gt;
        &lt;li&gt;First requirement&lt;/li&gt;
        &lt;li&gt;Second requirement
            &lt;ul&gt;
                &lt;li&gt;Nested detail&lt;/li&gt;
                &lt;li&gt;Another nested detail&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/li&gt;
        &lt;li&gt;Third requirement&lt;/li&gt;
    &lt;/ul&gt;
    &lt;ol&gt;
        &lt;li&gt;Submit the application&lt;/li&gt;
        &lt;li&gt;Track the request&lt;/li&gt;
    &lt;/ol&gt;
    &lt;blockquote&gt;A flowing citation renders with a side bar and secondary tone; for a featured pull-quote card, use the Quote component instead.&lt;/blockquote&gt;
    &lt;figure&gt;
        &lt;img src="path/to/image.jpg" alt="Flag of Saudi Arabia" width="120" height="84"&gt;
        &lt;figcaption&gt;A caption in smaller, secondary type below the image&lt;/figcaption&gt;
    &lt;/figure&gt;
    &lt;table&gt;
        &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Stage&lt;/th&gt;&lt;th&gt;Duration&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;
        &lt;tbody&gt;
            &lt;tr&gt;&lt;td&gt;Review&lt;/td&gt;&lt;td&gt;3 days&lt;/td&gt;&lt;/tr&gt;
            &lt;tr&gt;&lt;td&gt;Approval&lt;/td&gt;&lt;td&gt;1 day&lt;/td&gt;&lt;/tr&gt;
        &lt;/tbody&gt;
    &lt;/table&gt;
    &lt;hr&gt;
    &lt;p&gt;A closing paragraph after the divider ends the article with no trailing margin.&lt;/p&gt;
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

<!-- Ownership Map -->
<section id="proseOwnership" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Where Each Default Lives</h2>
            <p class="nds-section-description">Classless styling is layered: some elements are styled everywhere, some only inside the wrapper, and richer treatments stay opt-in components.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Elements</th><th>Scope</th><th>Richer tier</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">h1</code> to <code class="nds-inline-code lang-html">h6</code>, list indent, <code class="nds-inline-code lang-html">img</code></td><td>Global: styled everywhere</td><td>Section and Block titles for composed layouts</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">a</code></td><td>Global: every bare link</td><td><code class="nds-inline-code lang-html">.nds-link</code> variants</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">hr</code></td><td>Global: renders as the system divider</td><td><code class="nds-inline-code lang-html">.nds-divider</code> with text content</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">table</code></td><td>Global: renders as the system table</td><td><code class="nds-inline-code lang-html">.nds-table</code> with sorting, sub-rows, responsive modes</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">p</code>, list rhythm, <code class="nds-inline-code lang-html">blockquote</code>, <code class="nds-inline-code lang-html">figcaption</code></td><td>Prose only: inside the wrapper</td><td>Quote component for featured pull-quotes</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>

<!-- Built-in Features -->
<section id="proseFeatures" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
            <p class="nds-section-description">What the wrapper provides before you write any CSS.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-text-font"></i>
                            <span class="nds-label">Classless by Default</span>
                        </span>
                        <p class="nds-item-desc">Editor and CMS output renders correctly as-is, with no classes added to the markup.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-shield-01"></i>
                            <span class="nds-label">Components Keep Their Look</span>
                        </span>
                        <p class="nds-item-desc">Any NDS component dropped inside the region renders untouched; prose rules never outrank component styling.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-edit-02"></i>
                            <span class="nds-label">Editor Preview Parity</span>
                        </span>
                        <p class="nds-item-desc">The NDS editor's typing surface shares the same rhythm, so drafts preview the way published content renders.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-border-full"></i>
                            <span class="nds-label">Strictly Scoped</span>
                        </span>
                        <p class="nds-item-desc">Everything applies inside the wrapper only: pages and markup outside a prose region render exactly as they did before.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-layers-01"></i>
                            <span class="nds-label">Edge-Trimmed Rhythm</span>
                        </span>
                        <p class="nds-item-desc">Consistent spacing between blocks, with first and last margins trimmed so the region sits flush inside cards, section bodies, and the editor.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-quote-down"></i>
                            <span class="nds-label">Linked Rich Tiers</span>
                        </span>
                        <p class="nds-item-desc">Quotes, tables, and dividers share tokens with their full components, so upgrading an element to its component keeps the design consistent.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="proseGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
            <p class="nds-section-description">When to reach for prose, and how to combine it with the rest of the layout system.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block nds-prose">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use prose for content you do not author element by element: CMS body fields, rich-text editor output, long-form articles, and help or policy text.</li>
                    <li>Wrap once at the region root (the <code class="nds-inline-code lang-html">article</code> or the container your CMS renders into), not around individual elements.</li>
                    <li>Sections structure the page; prose fills a section body with flowing text. Keep composed layouts (cards, grids, forms) outside the wrapper or accept that they simply keep their own styling inside it.</li>
                    <li>Do not add <code class="nds-inline-code lang-html">.nds-section-title</code> or <code class="nds-inline-code lang-html">.nds-block-title</code> to headings inside flowing content: bare headings are already styled, and the component classes override the content hierarchy with page-structure sizing.</li>
                    <li>Bare <code class="nds-inline-code lang-html">table</code> and <code class="nds-inline-code lang-html">hr</code> elements render as the system table and divider everywhere, prose or not; inside prose they also pick up editorial spacing.</li>
                    <li>For a featured quotation with attribution, use the <a class="nds-color" href="{{ 'components/quote' | relative_url }}">Quote</a> component; the classless <code class="nds-inline-code lang-html">blockquote</code> is the in-text citation tier.</li>
                    <li>For sortable, paginated, or responsive data, upgrade the bare table to the <a class="nds-color" href="{{ 'components/tables' | relative_url }}">Table</a> component; the classless table is a readable static default.</li>
                    <li>Content headings start at <code class="nds-inline-code lang-html">h2</code>: the page title is the hero's <code class="nds-inline-code lang-html">h1</code>, and in-content headings sit one visual rung below section titles by design.</li>
                </ul>
            </div>
        </div>
    </div>
</section>
