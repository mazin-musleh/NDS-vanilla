---
layout: page
title: Rating
hero_title: Rating - National Design System
hero_description: A star-based input and display component for collecting user feedback or showing aggregate scores across reviews, products, and services
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Display Rating -->
<section id="displayRating" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Display Rating</h2>
            <p class="nds-section-description">Read-only stars that show an existing score. Use span elements for non-interactive display.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Medium</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-xs", ".nds-rating", "ratingDisplaySize"]'>
                                            <span class="nds-label">Extra Small</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-rating", "ratingDisplaySize"]'>
                                            <span class="nds-label">Small</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-md", ".nds-rating", "ratingDisplaySize"]'>
                                            <span class="nds-label">Medium</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-lg", ".nds-rating", "ratingDisplaySize"]'>
                                            <span class="nds-label">Large</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-brand", ".nds-rating", "ratingDisplayStyle"]'>
                                <span class="nds-label">Brand</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-rating nds-md" data-rating="3.5">
                                <span class="nds-rating-star"></span>
                                <span class="nds-rating-star"></span>
                                <span class="nds-rating-star"></span>
                                <span class="nds-rating-star"></span>
                                <span class="nds-rating-star"></span>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-rating-display-1" id="tab-rating-display-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel"
                                    id="panel-rating-display-1" aria-labelledby="tab-rating-display-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;div class="nds-rating nds-md" data-rating="3.5"&gt;
    &lt;span class="nds-rating-star"&gt;&lt;/span&gt;
    &lt;span class="nds-rating-star"&gt;&lt;/span&gt;
    &lt;span class="nds-rating-star"&gt;&lt;/span&gt;
    &lt;span class="nds-rating-star"&gt;&lt;/span&gt;
    &lt;span class="nds-rating-star"&gt;&lt;/span&gt;
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

<!-- Interactive Rating -->
<section id="interactiveRating" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Interactive Rating</h2>
            <p class="nds-section-description">Clickable stars that let users submit their own rating. Use button elements to enable interaction automatically.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Medium</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-xs", ".nds-rating", "ratingInteractiveSize"]'>
                                            <span class="nds-label">Extra Small</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-rating", "ratingInteractiveSize"]'>
                                            <span class="nds-label">Small</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-md", ".nds-rating", "ratingInteractiveSize"]'>
                                            <span class="nds-label">Medium</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-lg", ".nds-rating", "ratingInteractiveSize"]'>
                                            <span class="nds-label">Large</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-brand", ".nds-rating", "ratingInteractiveStyle"]'>
                                <span class="nds-label">Brand</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle" data-rating-disable>
                                <span class="nds-label">Disable</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-rating nds-md" data-rating="2.5">
                                <button class="nds-rating-star" type="button" aria-label="1 star"></button>
                                <button class="nds-rating-star" type="button" aria-label="2 stars"></button>
                                <button class="nds-rating-star" type="button" aria-label="3 stars"></button>
                                <button class="nds-rating-star" type="button" aria-label="4 stars"></button>
                                <button class="nds-rating-star" type="button" aria-label="5 stars"></button>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-rating-interactive-1" id="tab-rating-interactive-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel"
                                    id="panel-rating-interactive-1" aria-labelledby="tab-rating-interactive-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;div class="nds-rating nds-md" data-rating="2.5"&gt;
    &lt;button class="nds-rating-star" type="button" aria-label="1 star"&gt;&lt;/button&gt;
    &lt;button class="nds-rating-star" type="button" aria-label="2 stars"&gt;&lt;/button&gt;
    &lt;button class="nds-rating-star" type="button" aria-label="3 stars"&gt;&lt;/button&gt;
    &lt;button class="nds-rating-star" type="button" aria-label="4 stars"&gt;&lt;/button&gt;
    &lt;button class="nds-rating-star" type="button" aria-label="5 stars"&gt;&lt;/button&gt;
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

<!-- Dropmenu Rating -->
<section id="dropmenuRating" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Dropmenu Rating</h2>
            <p class="nds-section-description">A compact rating trigger that expands into an interactive voting panel. Used in hero sections and content headers to collect feedback without leaving the page.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-brand", ".nds-rating", "ratingDropmenuStyle"]'>
                                <span class="nds-label">Brand</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-dropmenu nds-rating-dropmenu">
                                <button class="nds-btn nds-subtle nds-menu-btn nds-dropmenu-trigger nds-md" type="button">
                                    <div class="nds-rating nds-xs" data-rating="4.5">
                                        <span class="nds-rating-star" aria-hidden="true"></span>
                                        <span class="nds-rating-star" aria-hidden="true"></span>
                                        <span class="nds-rating-star" aria-hidden="true"></span>
                                        <span class="nds-rating-star" aria-hidden="true"></span>
                                        <span class="nds-rating-star" aria-hidden="true"></span>
                                    </div>
                                    <span class="nds-label"><span class="nds-total-rate">4.5</span> - (<span class="nds-total-votes">18</span>) Votes</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden="">
                                    <div class="nds-dropmenu-item" data-no-auto-close>
                                        <span class="nds-label">Rate this service</span>
                                        <div class="nds-rating" data-rating="0">
                                            <button class="nds-rating-star" type="button" aria-label="1 star"></button>
                                            <button class="nds-rating-star" type="button" aria-label="2 stars"></button>
                                            <button class="nds-rating-star" type="button" aria-label="3 stars"></button>
                                            <button class="nds-rating-star" type="button" aria-label="4 stars"></button>
                                            <button class="nds-rating-star" type="button" aria-label="5 stars"></button>
                                        </div>
                                    </div>
                                    <div class="nds-dropmenu-footer">
                                        <hr class="nds-divider nds-lg">
                                        <div class="nds-dropmenu-action nds-grid">
                                            <button class="nds-btn nds-primary nds-dropmenu-item" data-no-auto-close>
                                                <span class="nds-label">Vote</span>
                                            </button>
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
                                        aria-controls="panel-rating-dropmenu-1" id="tab-rating-dropmenu-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                    id="panel-rating-dropmenu-1" aria-labelledby="tab-rating-dropmenu-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;div class="nds-dropmenu nds-rating-dropmenu"&gt;
    &lt;button class="nds-btn nds-subtle nds-menu-btn nds-dropmenu-trigger nds-md" type="button"&gt;
        &lt;div class="nds-rating nds-xs" data-rating="4.5"&gt;
            &lt;span class="nds-rating-star" aria-hidden="true"&gt;&lt;/span&gt;
            &lt;span class="nds-rating-star" aria-hidden="true"&gt;&lt;/span&gt;
            &lt;span class="nds-rating-star" aria-hidden="true"&gt;&lt;/span&gt;
            &lt;span class="nds-rating-star" aria-hidden="true"&gt;&lt;/span&gt;
            &lt;span class="nds-rating-star" aria-hidden="true"&gt;&lt;/span&gt;
        &lt;/div&gt;
        &lt;span class="nds-label"&gt;&lt;span class="nds-total-rate"&gt;4.5&lt;/span&gt; - (&lt;span class="nds-total-votes"&gt;18&lt;/span&gt;) Votes&lt;/span&gt;
    &lt;/button&gt;
    &lt;div class="nds-dropmenu-menu" hidden=""&gt;
        &lt;div class="nds-dropmenu-item" data-no-auto-close&gt;
            &lt;span class="nds-label"&gt;Rate this service&lt;/span&gt;
            &lt;div class="nds-rating" data-rating="0"&gt;
                &lt;button class="nds-rating-star" type="button" aria-label="1 star"&gt;&lt;/button&gt;
                &lt;button class="nds-rating-star" type="button" aria-label="2 stars"&gt;&lt;/button&gt;
                &lt;button class="nds-rating-star" type="button" aria-label="3 stars"&gt;&lt;/button&gt;
                &lt;button class="nds-rating-star" type="button" aria-label="4 stars"&gt;&lt;/button&gt;
                &lt;button class="nds-rating-star" type="button" aria-label="5 stars"&gt;&lt;/button&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="nds-dropmenu-footer"&gt;
            &lt;hr class="nds-divider nds-lg"&gt;
            &lt;div class="nds-dropmenu-action nds-grid"&gt;
                &lt;button class="nds-btn nds-primary nds-dropmenu-item" data-no-auto-close&gt;
                    &lt;span class="nds-label"&gt;Vote&lt;/span&gt;
                &lt;/button&gt;
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
<section id="ratingFeatures" class="nds-content-section nds-demo-section">
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
                    <p class="nds-item-desc">Activates when <code class="nds-inline-code lang-html">.nds-rating</code> is on the page. Components added dynamically are detected and initialized automatically.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-tap-01"></i>
                        <span class="nds-label">Automatic Mode Detection</span>
                    </span>
                    <p class="nds-item-desc">Stars built with <code class="nds-inline-code lang-html">&lt;button&gt;</code> elements become interactive with hover preview and click selection. Stars built with <code class="nds-inline-code lang-html">&lt;span&gt;</code> elements render as display-only.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-favourite"></i>
                        <span class="nds-label">Half-Star Precision</span>
                    </span>
                    <p class="nds-item-desc">Decimal ratings display half stars automatically. Values with a decimal of 0.3 or higher show a half star; below 0.3 rounds down to the nearest whole.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-keyboard"></i>
                        <span class="nds-label">Keyboard Navigation</span>
                    </span>
                    <p class="nds-item-desc">Full arrow key traversal (RTL-aware), Enter and Space to select, Home and End to jump, and Escape to blur focus.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="nds-icon nds-hgi-smart-phone-01" aria-hidden="true"></i>
                        <span class="nds-label">Responsive Sizing</span>
                    </span>
                    <p class="nds-item-desc">Large stars scale down from 48px to 40px on mobile viewports, keeping proportions balanced on smaller screens.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-api"></i>
                        <span class="nds-label">Programmatic Control</span>
                    </span>
                    <p class="nds-item-desc">Get, set, disable, and enable ratings through the instance API. Listen for <code class="nds-inline-code lang-js">ratingChange</code> events to react to user selections.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="ratingGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use <strong>display ratings</strong> to show aggregate scores, average reviews, or any read-only quality indicator alongside products, services, or content</li>
                    <li>Use <strong>interactive ratings</strong> inside feedback forms, review submissions, and satisfaction surveys where users provide their own score</li>
                    <li>Place interactive ratings inside a <a class="nds-color" href="{{ 'components/dropmenu' | relative_url }}">Dropmenu</a> when collecting feedback from a compact trigger, such as a "Rate this" button. The component includes a <code class="nds-inline-code lang-html">nds-rating-dropmenu</code> layout for this pattern</li>
                    <li>Do not use a rating component for binary choices (like/dislike). Use a <a class="nds-color" href="{{ 'components/switch' | relative_url }}">Switch</a> or toggle button instead</li>
                    <li>Do not use ratings to represent progress or completion. Use a <a class="nds-color" href="{{ 'components/progress' | relative_url }}">Progress</a> component instead</li>
                    <li>Choose the <strong>brand</strong> variant for government and official contexts where the default golden color does not align with the visual identity</li>
                    <li>Pick <strong>extra small</strong> or <strong>small</strong> sizes for inline display next to titles or list items, <strong>medium</strong> for standard layouts, and <strong>large</strong> for featured reviews or hero placements</li>
                    <li>Keep star counts consistent across your application. Five stars is the standard and matches user expectations</li>
                    <li>Set <code class="nds-inline-code lang-html">data-rating</code> to the initial value for display ratings. For interactive ratings collecting a fresh score, set it to <code class="nds-inline-code lang-html">0</code></li>
                    <li>Always include <code class="nds-inline-code lang-html">aria-label</code> on each star button with the numeric value (e.g., "3 stars") so screen readers announce the rating position</li>
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
                            <td><code class="nds-inline-code lang-html">nds-xs</code></td>
                            <td>Extra small stars (16px)</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-sm</code></td>
                            <td>Small stars (24px)</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-md</code></td>
                            <td>Medium stars (32px, default)</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-lg</code></td>
                            <td>Large stars (48px, scales to 40px on mobile)</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-brand</code></td>
                            <td>Switches star colors from golden yellow to the brand green palette</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-rating-dropmenu</code></td>
                            <td>Layout wrapper for placing a rating inside a dropmenu with proper spacing</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead>
                        <tr>
                            <th>Attribute</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-rating="3.5"</code></td>
                            <td>Set on <code class="nds-inline-code lang-html">.nds-rating</code> to define the initial score. Accepts whole numbers and decimals (0 to 5).</td>
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
                            <td><code class="nds-inline-code lang-html">--star-size</code></td>
                            <td>32px</td>
                            <td>Width and height of each star</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--star-color</code></td>
                            <td>--rating-star-normal-default</td>
                            <td>Color of unselected (empty) stars</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--star-selected</code></td>
                            <td>--rating-star-selected-default</td>
                            <td>Color of filled stars</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--star-pressed</code></td>
                            <td>--rating-star-pressed-default</td>
                            <td>Color applied on active/press state</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--star-hovered</code></td>
                            <td>--rating-star-hovered-default</td>
                            <td>Color applied on hover (brand variant only)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDS.Rating</strong> API initializes rating components and exposes instance methods on <code class="nds-inline-code lang-js">element.ndsRating</code>. For dynamically added ratings, call <code class="nds-inline-code lang-js">NDS.Rating.init()</code> or rely on automatic MutationObserver detection.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// ── Instance methods (element.ndsRating) ────────────
const el = document.querySelector('.nds-rating');

// Get the current rating value
el.ndsRating.getRating();              // Returns number (e.g. 3.5)

// Set a new rating value (0 to star count)
el.ndsRating.setValue(4);              // Updates visuals and fires ratingChange event

// Disable the rating (prevents clicks and keyboard)
el.ndsRating.setDisabled(true);

// Enable a disabled rating
el.ndsRating.setDisabled(false);
el.ndsRating.enable();                 // Shorthand for setDisabled(false)

// Check if the rating is currently disabled
el.ndsRating.isDisabled();             // Returns boolean

// ── Events ──────────────────────────────────────────
// Fires on the .nds-rating element when the value changes
// Bubbles, so you can listen on a parent container
document.addEventListener('ratingChange', (e) =&gt; {
    e.detail.rating;    // New rating value (number)
    e.detail.element;   // The .nds-rating element
});

// ── Namespace methods (NDS.Rating) ──────────────────
NDS.Rating.init();                     // Initialize all .nds-rating elements on the page
NDS.Rating.reinit();                   // Re-initialize (same as init)
NDS.Rating.enableRating(element);      // Initialize and enable a specific rating element
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
