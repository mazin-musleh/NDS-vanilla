---
layout: page
title: Side Info
hero_title: Side Info - National Design System
hero_description: A companion column placed alongside the main article for service details, progress, tables of contents, and other context, with sticky positioning, size variants, and an opt-in alignment that lifts the column into the hero's reserved aside slot.
breadcrumb: [["UI Shell", "/ui-shell"]]
lang: en
direction: ltr
---

<!-- Side Info Structure -->
<section id="sideinfoStructure" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Structure</h2>
            <p class="nds-section-description">The side info wraps the page body in a flex row. The main article sits in <code class="nds-inline-code lang-html">.nds-info-content</code> and the companion column in <code class="nds-inline-code lang-html">.nds-sideinfo</code>. On mobile the row collapses to a column.</p>
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
section.nds-content-section nds-demo-section.nds-sideinfo-section
&#9492;&#9472;&#9472; div.nds-section-body
    &#9500;&#9472;&#9472; div.nds-info-content
    &#9474;   &#9492;&#9472;&#9472; article (main content)
    &#9492;&#9472;&#9472; aside.nds-sideinfo.nds-sticky.nds-card
        &#9492;&#9472;&#9472; (companion content: definition list, TOC, stepper, etc.)
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
<section id="sideinfoStandard" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Standard</h2>
            <p class="nds-section-description">A sticky sideinfo that tracks with the article. Toggle <code class="nds-inline-code lang-html">nds-sticky</code> to see the difference between pinned and in-flow behavior.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <button class="nds-btn nds-subtle demo-toggle-btn" data-state="selected"
                                data-toggler='["nds-sticky", ".nds-sideinfo", "sideinfoStandardSticky"]'>
                                <span class="nds-label">Sticky</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn" data-state="selected"
                                data-toggler='["nds-stroke", ".nds-sideinfo", "sideinfoStandardStroke"]'>
                                <span class="nds-label">Stroke</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn" data-state="selected"
                                data-toggler='["nds-shadow", ".nds-sideinfo", "sideinfoStandardShadow"]'>
                                <span class="nds-label">Shadow</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-content-section nds-demo-section nds-sideinfo-section" style="width: 100%;">
                                <div class="nds-section-body">
                                    <div class="nds-info-content">
                                        <h3 style="margin-top: 0;">Article Heading</h3>
                                        <p>This is an example of the article column next to a side info card. In production the article fills the remaining width while the sideinfo stays at its configured width.</p>
                                        <p>Reduce the viewport below 960px to see the columns stack.</p>
                                    </div>
                                    <aside class="nds-sideinfo nds-sticky nds-card nds-stroke nds-shadow" aria-label="Side information">
                                        <dl class="nds-definition-list">
                                            <div class="nds-definition-item">
                                                <dt><i class="hgi hgi-stroke hgi-clock-01"></i><span class="nds-label">Duration</span></dt>
                                                <dd>Immediately</dd>
                                            </div>
                                            <div class="nds-definition-item">
                                                <dt><i class="hgi hgi-stroke hgi-riyal"></i><span class="nds-label">Fee</span></dt>
                                                <dd>Free</dd>
                                            </div>
                                            <div class="nds-definition-item">
                                                <dt><i class="hgi hgi-stroke hgi-user-multiple-02"></i><span class="nds-label">Beneficiaries</span></dt>
                                                <dd>Citizens, Residents</dd>
                                            </div>
                                        </dl>
                                    </aside>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-sideinfo-standard-1" id="tab-sideinfo-standard-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-sideinfo-standard-1"
                                    aria-labelledby="tab-sideinfo-standard-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;section class="nds-content-section nds-demo-section nds-sideinfo-section"&gt;
  &lt;div class="nds-section-body"&gt;
    &lt;div class="nds-info-content"&gt;
      &lt;h3&gt;Article Heading&lt;/h3&gt;
      &lt;p&gt;This is an example of the article column next to a side info card. In production the article fills the remaining width while the sideinfo stays at its configured width.&lt;/p&gt;
      &lt;p&gt;Reduce the viewport below 960px to see the columns stack.&lt;/p&gt;
    &lt;/div&gt;
    &lt;aside class="nds-sideinfo nds-sticky nds-card nds-stroke nds-shadow" aria-label="Side information"&gt;
      &lt;dl class="nds-definition-list"&gt;
        &lt;div class="nds-definition-item"&gt;
          &lt;dt&gt;&lt;i class="hgi hgi-stroke hgi-clock-01"&gt;&lt;/i&gt;&lt;span class="nds-label"&gt;Duration&lt;/span&gt;&lt;/dt&gt;
          &lt;dd&gt;Immediately&lt;/dd&gt;
        &lt;/div&gt;
        &lt;div class="nds-definition-item"&gt;
          &lt;dt&gt;&lt;i class="hgi hgi-stroke hgi-riyal"&gt;&lt;/i&gt;&lt;span class="nds-label"&gt;Fee&lt;/span&gt;&lt;/dt&gt;
          &lt;dd&gt;Free&lt;/dd&gt;
        &lt;/div&gt;
        &lt;div class="nds-definition-item"&gt;
          &lt;dt&gt;&lt;i class="hgi hgi-stroke hgi-user-multiple-02"&gt;&lt;/i&gt;&lt;span class="nds-label"&gt;Beneficiaries&lt;/span&gt;&lt;/dt&gt;
          &lt;dd&gt;Citizens, Residents&lt;/dd&gt;
        &lt;/div&gt;
      &lt;/dl&gt;
    &lt;/aside&gt;
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
    </div>
</section>

<!-- Sizes -->
<section id="sideinfoSizes" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Sizes</h2>
            <p class="nds-section-description">Three preset widths. Default is large (400px). Choose small for compact rails like in-page navigation, medium for moderate content, or large for cards with several definition rows.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Size: ">
                                    <span class="nds-label">Size: Large</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-sideinfo", "sideinfoSize"]'
                                            data-trigger-label="Small">
                                            <span class="nds-label">Small (200px)</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-md", ".nds-sideinfo", "sideinfoSize"]'
                                            data-trigger-label="Medium">
                                            <span class="nds-label">Medium (300px)</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-lg", ".nds-sideinfo", "sideinfoSize"]'
                                            data-trigger-label="Large">
                                            <span class="nds-label">Large (400px, default)</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-content-section nds-demo-section nds-sideinfo-section" style="width: 100%;">
                                <div class="nds-section-body">
                                    <div class="nds-info-content">
                                        <p>The sideinfo width updates instantly when you switch the size. The main article fills whatever remains.</p>
                                    </div>
                                    <aside class="nds-sideinfo nds-lg nds-card nds-stroke nds-shadow" aria-label="Side information">
                                        <dl class="nds-definition-list">
                                            <div class="nds-definition-item">
                                                <dt><span class="nds-label">Support</span></dt>
                                                <dd>24/7</dd>
                                            </div>
                                            <div class="nds-definition-item">
                                                <dt><span class="nds-label">Language</span></dt>
                                                <dd>Arabic, English</dd>
                                            </div>
                                        </dl>
                                    </aside>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-sideinfo-sizes-1" id="tab-sideinfo-sizes-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-sideinfo-sizes-1"
                                    aria-labelledby="tab-sideinfo-sizes-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;!-- Small (200px) --&gt;
&lt;aside class="nds-sideinfo nds-sm nds-card nds-stroke nds-shadow"&gt;...&lt;/aside&gt;

&lt;!-- Medium (300px) --&gt;
&lt;aside class="nds-sideinfo nds-md nds-card nds-stroke nds-shadow"&gt;...&lt;/aside&gt;

&lt;!-- Large (400px, default) --&gt;
&lt;aside class="nds-sideinfo nds-lg nds-card nds-stroke nds-shadow"&gt;...&lt;/aside&gt;
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

<!-- Reverse -->
<section id="sideinfoReverse" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Reverse</h2>
            <p class="nds-section-description">Add <code class="nds-inline-code lang-html">nds-reverse</code> to flip the column to the inline-start side (left in LTR, right in RTL). The article body fills the rest.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <button class="nds-btn nds-subtle demo-toggle-btn" data-state="selected"
                                data-toggler='["nds-reverse", ".nds-sideinfo", "sideinfoReverseToggle"]'>
                                <span class="nds-label">Reverse</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-content-section nds-demo-section nds-sideinfo-section" style="width: 100%;">
                                <div class="nds-section-body">
                                    <div class="nds-info-content">
                                        <p>With reverse enabled, the sideinfo takes the start side of the row and the article fills the end. Useful when the sideinfo hosts navigation (e.g., a table of contents) that readers expect on the left.</p>
                                    </div>
                                    <aside class="nds-sideinfo nds-md nds-reverse nds-card nds-stroke nds-shadow" aria-label="Side information">
                                        <dl class="nds-definition-list">
                                            <div class="nds-definition-item">
                                                <dt><span class="nds-label">Position</span></dt>
                                                <dd>Start side</dd>
                                            </div>
                                        </dl>
                                    </aside>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-sideinfo-reverse-1" id="tab-sideinfo-reverse-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-sideinfo-reverse-1"
                                    aria-labelledby="tab-sideinfo-reverse-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;aside class="nds-sideinfo nds-md nds-reverse nds-card nds-stroke nds-shadow" aria-label="Side information"&gt;
  &lt;dl class="nds-definition-list"&gt;
    &lt;div class="nds-definition-item"&gt;
      &lt;dt&gt;&lt;span class="nds-label"&gt;Position&lt;/span&gt;&lt;/dt&gt;
      &lt;dd&gt;Start side&lt;/dd&gt;
    &lt;/div&gt;
  &lt;/dl&gt;
&lt;/aside&gt;
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
<section id="sideinfoFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:24px; --row-gap: 24px; --col-gap: 32px;">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-plug-socket"></i>
                        <span class="nds-label">Auto-initialization</span>
                    </span>
                    <p class="nds-item-desc">Activates on any <code class="nds-inline-code lang-html">.nds-sideinfo</code> on the page. Positioning, sticky, and resize hooks attach automatically.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-layout-right"></i>
                        <span class="nds-label">Hero-Aside Alignment</span>
                    </span>
                    <p class="nds-item-desc">When the hero opts in with <code class="nds-inline-code lang-html">nds-aside</code>, the column lifts into the hero's reserved slot so the card visually starts next to the page title.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-pin"></i>
                        <span class="nds-label">Smart Sticky Fallback</span>
                    </span>
                    <p class="nds-item-desc">Sticky positioning drops automatically when the card is taller than the viewport and restores when it fits, so readers never get trapped on unreachable content.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-resize-01"></i>
                        <span class="nds-label">Size Variants</span>
                    </span>
                    <p class="nds-item-desc">Three preset widths (small, medium, large) cover everything from compact navigation rails to content-rich service cards.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-mobile-programming-01"></i>
                        <span class="nds-label">Responsive Stack</span>
                    </span>
                    <p class="nds-item-desc">Below the tablet breakpoint the row collapses to a column and the sideinfo spans the full width. Pair with <code class="nds-inline-code lang-html">nds-top</code> to place it above the article on small screens.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-api"></i>
                        <span class="nds-label">Programmatic Control</span>
                    </span>
                    <p class="nds-item-desc">Create a single instance or reinitialize all sideinfos after injecting new markup through the <code class="nds-inline-code lang-js">NDS.Sideinfo</code> API.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="sideinfoGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Live Examples</h3>
                <ul>
                    <li><a class="nds-color" href="{{ 'templates/content-template' | relative_url }}">Content Template</a>: article with a <a class="nds-color" href="{{ 'components/toc' | relative_url }}">TOC</a> in the sideinfo column</li>
                    <li><a class="nds-color" href="{{ 'templates/service-template' | relative_url }}">Service Page Template</a>: government service with hero-aside alignment and a definition-list card</li>
                    <li><a class="nds-color" href="{{ 'templates/form-template' | relative_url }}">Form Template</a>: multi-step form with a sideinfo stepper on desktop, radial on mobile</li>
                    <li><a class="nds-color" href="{{ 'templates/contact-us-template' | relative_url }}">Contact Us Template</a>: contact form with an emergency-contacts sideinfo card</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use a <strong>sideinfo</strong> for supporting context that should stay visible while the reader scrolls the article: service metadata, progress, <a class="nds-color" href="{{ 'components/toc' | relative_url }}">table of contents</a>, or quick actions</li>
                    <li>Use the <strong>hero-aside</strong> (<code class="nds-inline-code lang-html">hero_style: "nds-aside"</code>) when the card represents the whole page's context (service details, contact card) so it visually anchors to the page title. Omit <code class="nds-inline-code lang-html">nds-aside</code> when the sideinfo belongs to the article body (a TOC, inline help)</li>
                    <li>Do not use a sideinfo to hold unrelated ads or cross-promotional content. The column is a continuation of the article's context, not a marketing slot. Prefer a <a class="nds-color" href="{{ 'components/cards' | relative_url }}">card grid</a> below the main content instead</li>
                    <li>Do not use it for primary site navigation. That's the <a class="nds-color" href="{{ 'ui-shell/sidemenu' | relative_url }}">Side Menu</a>'s job</li>
                    <li>Pick <code class="nds-inline-code lang-html">nds-sm</code> or <code class="nds-inline-code lang-html">nds-md</code> when the column hosts a link list (TOC). Reserve <code class="nds-inline-code lang-html">nds-lg</code> (default) for cards with several definition rows or an embedded stepper</li>
                    <li>Add <code class="nds-inline-code lang-html">nds-sticky</code> for long articles where readers benefit from always-available context. Skip it for short pages where the initial view already shows everything</li>
                    <li>Add <code class="nds-inline-code lang-html">nds-top</code> alongside <code class="nds-inline-code lang-html">nds-sticky</code> when the content should move above the article on mobile (progress trackers, step indicators)</li>
                    <li>Pair the sideinfo with <code class="nds-inline-code lang-html">nds-card</code> plus <code class="nds-inline-code lang-html">nds-stroke</code> or <code class="nds-inline-code lang-html">nds-shadow</code> to separate it visually from the article. Borderless cards work only against contrasting section backgrounds</li>
                    <li>Keep the column's content scannable. Use a <a class="nds-color" href="{{ 'components/definition-list' | relative_url }}">definition list</a> for paired labels and values, or a <a class="nds-color" href="{{ 'components/stepper' | relative_url }}">stepper</a> for progress. Avoid long paragraphs inside the column</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Class</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">nds-sm</code></td><td>Compact 200px width for navigation rails and link lists</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-md</code></td><td>Medium 300px width for moderate content</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-lg</code></td><td>Large 400px width for rich cards (default)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-sticky</code></td><td>Pin the column to the nav's lower edge as the page scrolls. Auto-disables when the card is taller than the viewport</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-top</code></td><td>On mobile, place the sideinfo above the main content when the columns stack</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-reverse</code></td><td>Flip the column to the inline-start side of the flex row</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--nds-sideinfo-width</code></td><td><code class="nds-inline-code lang-html">400px</code></td><td>Column width. Preset by the size modifiers; override for a custom width</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--nds-sideinfo-top-offset</code></td><td><code class="nds-inline-code lang-html">0px</code></td><td>Extra space above the card. Adds to the sticky <code class="nds-inline-code lang-html">top</code> threshold and, on hero-aside pages, folds into the pull-up so the card shifts down by the same amount before and after sticking</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--nds-sideinfo-top</code></td><td>computed</td><td>Set by the JS to align the card with the hero section-head when <code class="nds-inline-code lang-html">nds-aside</code> is on the hero. Not intended for manual override</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDS.Sideinfo</strong> API handles positioning and sticky fallback. Auto-init runs on <code class="nds-inline-code lang-js">DOMContentLoaded</code>; call <code class="nds-inline-code lang-js">NDS.Sideinfo.reinit()</code> after injecting new sideinfo markup.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// ── Initialize all sideinfo columns on the page ─────
// Runs automatically once. Call reinit after DOM changes.
NDS.Sideinfo.init();
NDS.Sideinfo.reinit();

// ── Create a single instance ────────────────────────
// Returns the NDSSideInfo instance
const aside = document.querySelector('.nds-sideinfo');
const instance = NDS.Sideinfo.create(aside);

// ── Manually tear down and re-wire ──────────────────
instance.destroy();         // Remove listeners, clear CSS variable
instance.updatePosition();  // Recompute the hero-alignment offset
instance.updateStickyState();// Re-check whether sticky fits the viewport
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
