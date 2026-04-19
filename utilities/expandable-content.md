---
layout: page
title: Expandable Content
hero_title: Expandable Content - National Design System
hero_description: Height-constrained containers that reveal additional content on demand, with automatic overflow detection and a toggle button that appears only when content exceeds the limit
breadcrumb: [["Utilities", "/utilities?category=Utilities"]]
lang: en
direction: ltr
---

<!-- Expandable Content Overview -->
<section id="expandableOverview" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Standard Expandable Content</h2>
            <p class="nds-section-description">Wraps any block of content in a height-constrained container. A "Show More" button appears automatically when the content overflows.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">

            <!-- Basic Expandable Example -->
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Basic Expandable Content</div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-expandable" style="--max-height: 200px;">
                            <div class="nds-expandable-content">
                                <p>The National Digital Transformation Strategy outlines a comprehensive framework for modernizing government services across all sectors. The initiative focuses on three core pillars: citizen experience, operational efficiency, and data-driven decision making.</p>
                                <p>All government entities are required to adopt the unified design system for public-facing digital platforms. This ensures a consistent and accessible experience for citizens regardless of which ministry or agency they interact with. The system supports both Arabic and English interfaces with full right-to-left layout compliance.</p>
                                <p>Integration with the national identity platform enables single sign-on across all digital services. Citizens authenticate once and gain access to their complete service portfolio, including document requests, permit applications, appointment scheduling, and payment processing.</p>
                                <p>Accessibility standards follow international WCAG 2.1 AA guidelines adapted for the Arabic language context. All components are tested for screen reader compatibility, keyboard navigation, color contrast compliance, and support for reduced motion preferences.</p>
                                <p>Performance benchmarks require all pages to achieve a Lighthouse score of 90 or above. This includes optimized asset delivery, lazy loading for below-the-fold content, and efficient caching strategies for frequently accessed service endpoints.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container nds-scroll-more">
                        <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-expandable-basic-1" id="tab-expandable-basic-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-expandable-basic-1"
                            aria-labelledby="tab-expandable-basic-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <div class="nds-expandable-content">
                                <code class="lang-html code">
&lt;div class="nds-expandable" style="--max-height: 200px;"&gt;
    &lt;div class="nds-expandable-content"&gt;
        &lt;p&gt;The National Digital Transformation Strategy outlines a comprehensive framework for modernizing government services across all sectors. The initiative focuses on three core pillars: citizen experience, operational efficiency, and data-driven decision making.&lt;/p&gt;
        &lt;p&gt;All government entities are required to adopt the unified design system for public-facing digital platforms. This ensures a consistent and accessible experience for citizens regardless of which ministry or agency they interact with. The system supports both Arabic and English interfaces with full right-to-left layout compliance.&lt;/p&gt;
        &lt;p&gt;Integration with the national identity platform enables single sign-on across all digital services. Citizens authenticate once and gain access to their complete service portfolio, including document requests, permit applications, appointment scheduling, and payment processing.&lt;/p&gt;
        &lt;p&gt;Accessibility standards follow international WCAG 2.1 AA guidelines adapted for the Arabic language context. All components are tested for screen reader compatibility, keyboard navigation, color contrast compliance, and support for reduced motion preferences.&lt;/p&gt;
        &lt;p&gt;Performance benchmarks require all pages to achieve a Lighthouse score of 90 or above. This includes optimized asset delivery, lazy loading for below-the-fold content, and efficient caching strategies for frequently accessed service endpoints.&lt;/p&gt;
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

<!-- Expandable Card -->
<section id="expandableCard" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Expandable Card</h2>
            <p class="nds-section-description">Apply expandable behavior directly to a card component to constrain long descriptions or detail blocks within a defined height</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">

            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-shadow", ".nds-card", "cardShadow"]'>
                            <span class="nds-label">Shadow</span>
                        </button>
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn" data-state="selected"
                            data-toggler='["nds-stroke", ".nds-card", "cardStroke"]'>
                            <span class="nds-label">Stroke</span>
                        </button>
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='[["nds-truncate", ".nds-card-title"],["nds-truncate", ".nds-card-description"], "truncation"]'>
                            <span class="nds-label">Truncate</span>
                        </button>
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-full", ".nds-card", "cardSize"]'>
                            <span class="nds-label">full</span>
                        </button>
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                            <span class="nds-label">Remove bg</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-card nds-stroke nds-expandable">
                            <div class="nds-expandable-content" style="--max-height:200px">
                                <div class="nds-card-content">
                                    <div class="nds-card-text">
                                        <h3 class="nds-card-title">Ministry Services Documentation</h3>
                                        <p class="nds-card-description">Complete documentation and guidelines for
                                            all ministry digital services including API references, implementation
                                            guides, best practices for developers, integration specifications,
                                            security protocols, and compliance requirements for government
                                            applications. This comprehensive resource covers everything from basic
                                            setup to advanced configurations.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container nds-scroll-more">
                        <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-expandable-card-1" id="tab-expandable-card-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-expandable-card-1"
                            aria-labelledby="tab-expandable-card-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <div class="nds-expandable-content">
                                <code class="lang-html code">
&lt;div class="nds-card nds-stroke nds-expandable"&gt;
    &lt;div class="nds-expandable-content" style="--max-height:200px"&gt;
        &lt;div class="nds-card-content"&gt;
            &lt;div class="nds-card-text"&gt;
                &lt;h3 class="nds-card-title"&gt;Ministry Services Documentation&lt;/h3&gt;
                &lt;p class="nds-card-description"&gt;Complete documentation and guidelines for
                    all ministry digital services including API references, implementation
                    guides, best practices for developers, integration specifications,
                    security protocols, and compliance requirements for government
                    applications. This comprehensive resource covers everything from basic
                    setup to advanced configurations.&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
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

<!-- Sibling Sync -->
<section id="expandableSiblingSync" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Sibling Sync</h2>
            <p class="nds-section-description">Wrap multiple expandable containers in an <code class="nds-inline-code lang-html">nds-expand-all</code> parent so expanding or collapsing one toggles all siblings in sync</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">

            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Synchronized Expandable Containers</div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-expand-all nds-grid" style="--max-col:2;">
                            <div class="nds-card nds-stroke nds-expandable">
                                <div class="nds-expandable-content" style="--max-height: 80px;">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">Digital Identity Standards</h3>
                                            <p class="nds-card-description">Comprehensive guidelines for implementing digital identity verification across government platforms, including biometric authentication protocols, single sign-on integration, and multi-factor authentication requirements for all public-facing services.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-card nds-stroke nds-expandable">
                                <div class="nds-expandable-content" style="--max-height: 80px;">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">Data Classification Policy</h3>
                                            <p class="nds-card-description">Standards for categorizing, handling, and protecting government data assets including classification levels, access control matrices, encryption requirements, and retention schedules for sensitive and public information.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container nds-scroll-more">
                        <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-expandable-sync-1" id="tab-expandable-sync-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-expandable-sync-1"
                            aria-labelledby="tab-expandable-sync-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <div class="nds-expandable-content">
                                <code class="lang-html code">
&lt;div class="nds-expand-all nds-grid" style="--max-col:2;"&gt;
    &lt;div class="nds-card nds-stroke nds-expandable"&gt;
        &lt;div class="nds-expandable-content" style="--max-height: 80px;"&gt;
            &lt;div class="nds-card-content"&gt;
                &lt;div class="nds-card-text"&gt;
                    &lt;h3 class="nds-card-title"&gt;Digital Identity Standards&lt;/h3&gt;
                    &lt;p class="nds-card-description"&gt;Comprehensive guidelines for implementing digital identity verification across government platforms, including biometric authentication protocols, single sign-on integration, and multi-factor authentication requirements for all public-facing services.&lt;/p&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-card nds-stroke nds-expandable"&gt;
        &lt;div class="nds-expandable-content" style="--max-height: 80px;"&gt;
            &lt;div class="nds-card-content"&gt;
                &lt;div class="nds-card-text"&gt;
                    &lt;h3 class="nds-card-title"&gt;Data Classification Policy&lt;/h3&gt;
                    &lt;p class="nds-card-description"&gt;Standards for categorizing, handling, and protecting government data assets including classification levels, access control matrices, encryption requirements, and retention schedules for sensitive and public information.&lt;/p&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
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
<section id="expandableFeatures" class="nds-content-section">
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
                    <p class="nds-item-desc">Activates on every <code class="nds-inline-code lang-html">.nds-expandable</code> element at page load. The toggle button is added only when the content actually overflows.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-resize-01"></i>
                        <span class="nds-label">Responsive Height Detection</span>
                    </span>
                    <p class="nds-item-desc">Continuously monitors content size and shows or hides the toggle button when the viewport or container dimensions change.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-transition-bottom"></i>
                        <span class="nds-label">Gradient Fade Indicator</span>
                    </span>
                    <p class="nds-item-desc">A configurable gradient mask fades the bottom of truncated content, signaling that more content is available below.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-translate"></i>
                        <span class="nds-label">Bilingual Labels</span>
                    </span>
                    <p class="nds-item-desc">The toggle button label switches between English ("Show More" / "Show Less") and Arabic automatically based on the page language.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-link-backward"></i>
                        <span class="nds-label">Sibling Sync</span>
                    </span>
                    <p class="nds-item-desc">Wrap multiple expandable containers in an <code class="nds-inline-code lang-html">nds-expand-all</code> parent and expanding one will expand all siblings together.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-api"></i>
                        <span class="nds-label">Programmatic Control</span>
                    </span>
                    <p class="nds-item-desc">Expand, collapse, toggle, and query state through instance methods on <code class="nds-inline-code lang-js">element.ndsExpandable</code>.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="expandableGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-content-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use expandable content to keep pages scannable when a section contains long descriptions, legal text, detailed specifications, or extended lists that most users will not need to read in full</li>
                    <li>Use inside <a class="nds-color" href="{{ 'components/cards' | relative_url }}">Cards</a> to constrain card body height while still exposing a preview of the full content</li>
                    <li>Use the <code class="nds-inline-code lang-html">nds-expand-all</code> wrapper when multiple related items should reveal their content together, such as a comparison grid or a set of policy summaries</li>
                    <li>Do not use expandable content for short text that fits within the default 300px limit. The toggle button will not appear, but the extra wrapper adds unnecessary DOM weight</li>
                    <li>Do not use expandable content to hide primary actions or critical information the user must see. Use an <a class="nds-color" href="{{ 'components/accordion' | relative_url }}">Accordion</a> for structured show/hide sections with headings</li>
                    <li>Set <code class="nds-inline-code lang-html">--max-height</code> to a value that shows enough content for the user to judge whether they want to read more. Avoid values below 80px as they may obscure the first paragraph entirely</li>
                    <li>When adding expandable content to dynamically loaded elements, call <code class="nds-inline-code lang-js">NDS.Expandable.reinit()</code> after inserting the new HTML to initialize the new containers</li>
                    <li>Place <code class="nds-inline-code lang-html">--max-height</code> on the <code class="nds-inline-code lang-html">.nds-expandable-content</code> element (not the outer wrapper) when the expandable container has its own padding or borders that should remain visible</li>
                    <li>Use <code class="nds-inline-code lang-js">recheckHeight()</code> or <code class="nds-inline-code lang-js">NDS.Expandable.recheckHeights()</code> after content changes (AJAX loads, tab switches) to re-evaluate whether the toggle button is still needed</li>
                </ul>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--max-height</code></td><td><code class="nds-inline-code lang-html">300px</code></td><td>Maximum visible height before the content is clipped and the toggle button appears. Set on <code class="nds-inline-code lang-html">.nds-expandable</code> or <code class="nds-inline-code lang-html">.nds-expandable-content</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--mask-fade-percentage</code></td><td><code class="nds-inline-code lang-html">35%</code></td><td>Percentage of the content height that fades to transparent when collapsed. Higher values create a longer gradient</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDS.Expandable</strong> API provides methods to initialize containers, control expand/collapse state, and listen for state change events. Instances are accessible via <code class="nds-inline-code lang-js">element.ndsExpandable</code>.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// ── Initialize manually ─────────────────────────────
// Useful for content added after page load
const container = document.querySelector('#myExpandable');
const instance = NDS.Expandable.create(container);

// Re-scan the page for new .nds-expandable elements
NDS.Expandable.reinit();

// Recheck all initialized containers (after AJAX, tab switch, etc.)
NDS.Expandable.recheckHeights();

// ── Instance methods ────────────────────────────────
// Access the instance from the DOM element
const expandable = document.querySelector('.nds-expandable').ndsExpandable;

expandable.expandContent();    // Expand to full height
expandable.collapseContent();  // Collapse back to --max-height
expandable.toggleContent();    // Toggle between expanded and collapsed
expandable.recheckHeight();    // Re-evaluate whether the button is needed
expandable.destroy();          // Remove button, states, and observers

// ── Query state ─────────────────────────────────────
const state = expandable.getState();
// state.isExpanded   — true when content is fully visible
// state.hasButton    — true when the toggle button is present
// state.maxHeight    — the resolved --max-height value in pixels
// state.actualHeight — the current scrollHeight of the content

// ── Events ──────────────────────────────────────────
// Both events bubble and carry the same detail shape
document.addEventListener('nds:expandable:expanded', (e) =&gt; {
    // e.detail.container  — the .nds-expandable element
    // e.detail.content    — the .nds-expandable-content element
    // e.detail.button     — the toggle button element
    // e.detail.isExpanded — true
});

document.addEventListener('nds:expandable:collapsed', (e) =&gt; {
    // e.detail.container  — the .nds-expandable element
    // e.detail.content    — the .nds-expandable-content element
    // e.detail.button     — the toggle button element
    // e.detail.isExpanded — false
});
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>