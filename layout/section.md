---
layout: page
title: Section
hero_title: Section Layout - National Design System
hero_description: The section component provides a flexible, progressive structure for organizing page content with optional wrappers, actions, images, and full-width breakouts.
breadcrumb: ["Layout"]
lang: en
direction: ltr
---

<!-- Section Structure Overview -->
<section id="structure" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Section Hierarchy</h2>
            <p class="nds-section-description">The section component uses a CSS Grid for column placement and a flex wrapper for grouping head, action, image, and content.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Structure</div>
                </div>
                <div class="demo-container noBg">
<code class="lang-html code">
section.nds-content-section          (CSS Grid: full-width | breakout | content)
├── div.nds-section-wrapper          (Flex row + container queries)
│   ├── div.nds-section-image        (optional)
│   ├── div.nds-section-head         (flex:1 — title + desc + meta)
│   │   ├── h2.nds-section-title
│   │   ├── div.nds-section-meta
│   │   └── p.nds-section-description
│   ├── div.nds-section-action       (optional, auto width)
│   └── div.nds-section-content      (full row below)
└── div.nds-section-content.nds-full-width  (outside wrapper for breakout)
</code>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Tier 1: Minimal -->
<section id="tier1" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Tier 1 — Minimal (No Wrapper)</h2>
            <p class="nds-section-description">Simplest usage: title, description, and content as direct children of the section grid. No wrapper needed.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Minimal Section</div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <!-- Live demo: Tier 1 section (nested demo) -->
                        <section class="nds-content-section nds-ghost" style="padding:0;">
                            <h2 class="nds-section-title">Section Title</h2>
                            <p class="nds-section-description">Section description goes here. Used for simple sections with only a title and content.</p>
                            <div class="nds-section-content">
                                <p>Section content area.</p>
                            </div>
                        </section>
                    </div>
                </div>
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-tier1" id="tab-tier1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-tier1" aria-labelledby="tab-tier1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
<code class="lang-html code">
&lt;section class="nds-content-section"&gt;
    &lt;h2 class="nds-section-title"&gt;Section Title&lt;/h2&gt;
    &lt;p class="nds-section-description"&gt;Description text.&lt;/p&gt;
    &lt;div class="nds-section-content"&gt;
        &lt;!-- Content here --&gt;
    &lt;/div&gt;
&lt;/section&gt;
</code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Tier 2: Standard with Wrapper -->
<section id="tier2" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Tier 2 — Standard (With Wrapper)</h2>
            <p class="nds-section-description">Wrapper groups head and content with consistent gap spacing. Used for most sections.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Standard Section</div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <section class="nds-content-section nds-ghost" style="padding:0;">
                            <div class="nds-section-wrapper">
                                <div class="nds-section-head">
                                    <h2 class="nds-section-title">Section Title</h2>
                                    <p class="nds-section-description">Description text wrapped with content inside a section wrapper.</p>
                                </div>
                                <div class="nds-section-content">
                                    <p>Section content area.</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-tier2" id="tab-tier2">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-tier2" aria-labelledby="tab-tier2">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
<code class="lang-html code">
&lt;section class="nds-content-section"&gt;
    &lt;div class="nds-section-wrapper"&gt;
        &lt;div class="nds-section-head"&gt;
            &lt;h2 class="nds-section-title"&gt;Section Title&lt;/h2&gt;
            &lt;p class="nds-section-description"&gt;Description text.&lt;/p&gt;
        &lt;/div&gt;
        &lt;div class="nds-section-content"&gt;
            &lt;!-- Content here --&gt;
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
</section>

<!-- Tier 3: With Action -->
<section id="tier3" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Tier 3 — With Action</h2>
            <p class="nds-section-description">Action buttons sit beside the head on wide screens (≥769px) and drop to full-row below on narrow (≤768px). Uses container queries on the wrapper.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Section with Action</div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <section class="nds-content-section nds-ghost" style="padding:0;">
                            <div class="nds-section-wrapper">
                                <div class="nds-section-head">
                                    <h2 class="nds-section-title">Latest News</h2>
                                    <p class="nds-section-description">Stay up to date with the latest updates and announcements.</p>
                                </div>
                                <div class="nds-section-action">
                                    <a href="#" class="nds-btn nds-primary">
                                        <span class="label">View All</span>
                                    </a>
                                </div>
                                <div class="nds-section-content">
                                    <p>News cards or content goes here.</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-tier3" id="tab-tier3">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-tier3" aria-labelledby="tab-tier3">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
<code class="lang-html code">
&lt;section class="nds-content-section"&gt;
    &lt;div class="nds-section-wrapper"&gt;
        &lt;div class="nds-section-head"&gt;
            &lt;h2 class="nds-section-title"&gt;Latest News&lt;/h2&gt;
            &lt;p class="nds-section-description"&gt;Description text.&lt;/p&gt;
        &lt;/div&gt;
        &lt;div class="nds-section-action"&gt;
            &lt;a href="#" class="nds-btn nds-primary"&gt;
                &lt;span class="label"&gt;View All&lt;/span&gt;
            &lt;/a&gt;
        &lt;/div&gt;
        &lt;div class="nds-section-content"&gt;
            &lt;!-- Content here --&gt;
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
</section>

<!-- Tier 4: With Image -->
<section id="tier4" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Tier 4 — With Image</h2>
            <p class="nds-section-description">Image, head, and action form a flex row. Content takes full row below.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Section with Image</div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <section class="nds-content-section nds-ghost" style="padding:0;">
                            <div class="nds-section-wrapper">
                                <div class="nds-section-image">
                                    <div class="nds-avatar nds-xl">
                                        <i class="hgi hgi-stroke hgi-user"></i>
                                    </div>
                                </div>
                                <div class="nds-section-head">
                                    <h2 class="nds-section-title">Faculty Profile</h2>
                                    <p class="nds-section-description">Professor of Computer Science, College of Engineering.</p>
                                </div>
                                <div class="nds-section-action">
                                    <a href="#" class="nds-btn nds-primary">
                                        <span class="label">Contact</span>
                                    </a>
                                </div>
                                <div class="nds-section-content">
                                    <p>Profile details and content goes here.</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-tier4" id="tab-tier4">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-tier4" aria-labelledby="tab-tier4">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
<code class="lang-html code">
&lt;section class="nds-content-section"&gt;
    &lt;div class="nds-section-wrapper"&gt;
        &lt;div class="nds-section-image"&gt;
            &lt;img src="..." alt="..." /&gt;
        &lt;/div&gt;
        &lt;div class="nds-section-head"&gt;
            &lt;h2 class="nds-section-title"&gt;Section Title&lt;/h2&gt;
            &lt;p class="nds-section-description"&gt;Description text.&lt;/p&gt;
        &lt;/div&gt;
        &lt;div class="nds-section-action"&gt;
            &lt;a href="#" class="nds-btn nds-primary"&gt;
                &lt;span class="label"&gt;Action&lt;/span&gt;
            &lt;/a&gt;
        &lt;/div&gt;
        &lt;div class="nds-section-content"&gt;
            &lt;!-- Content here --&gt;
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
</section>

<!-- Tier 5: Full-Width Content -->
<section id="tier5" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Tier 5 — Full-Width Content</h2>
            <p class="nds-section-description">Content lives outside the wrapper and uses <code>.nds-full-width</code> to break out of the content column into edge-to-edge layout. Wrapper holds head + action only.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Full-Width Section</div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <section class="nds-content-section nds-ghost" style="padding:0;">
                            <div class="nds-section-wrapper">
                                <div class="nds-section-head">
                                    <h2 class="nds-section-title">Featured Services</h2>
                                    <p class="nds-section-description">Browse our full catalog of services.</p>
                                </div>
                                <div class="nds-section-action">
                                    <a href="#" class="nds-btn nds-primary">
                                        <span class="label">View All</span>
                                    </a>
                                </div>
                            </div>
                            <div class="nds-section-content nds-full-width" style="background: var(--background-neutral-light); padding: var(--spacing-xl);">
                                <p style="text-align:center;">Full-width content area (e.g., card carousel, swiper)</p>
                            </div>
                        </section>
                    </div>
                </div>
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-tier5" id="tab-tier5">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-tier5" aria-labelledby="tab-tier5">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
<code class="lang-html code">
&lt;section class="nds-content-section"&gt;
    &lt;div class="nds-section-wrapper"&gt;
        &lt;div class="nds-section-head"&gt;
            &lt;h2 class="nds-section-title"&gt;Section Title&lt;/h2&gt;
            &lt;p class="nds-section-description"&gt;Description text.&lt;/p&gt;
        &lt;/div&gt;
        &lt;div class="nds-section-action"&gt;
            &lt;a href="#" class="nds-btn nds-primary"&gt;
                &lt;span class="label"&gt;View All&lt;/span&gt;
            &lt;/a&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-section-content nds-full-width"&gt;
        &lt;!-- Full-width content (carousel, cards, etc.) --&gt;
    &lt;/div&gt;
&lt;/section&gt;
</code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Color Variants -->
<section id="variants" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Color Variants</h2>
            <p class="nds-section-description">Apply color classes directly on <code>.nds-content-section</code> for themed backgrounds.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Variants</div>
                </div>
                <div class="demo-container noBg">
                    <div class="state-demo" style="flex-direction: column; gap: var(--spacing-xl);">
                        <section class="nds-content-section" style="padding: var(--spacing-xl);">
                            <h3 class="nds-section-title" style="font-size: var(--nds-text-lg-FS);">Default (White)</h3>
                        </section>
                        <section class="nds-content-section nds-blue" style="padding: var(--spacing-xl);">
                            <h3 class="nds-section-title" style="font-size: var(--nds-text-lg-FS);">.nds-blue</h3>
                        </section>
                        <section class="nds-content-section nds-green" style="padding: var(--spacing-xl);">
                            <h3 class="nds-section-title" style="font-size: var(--nds-text-lg-FS);">.nds-green</h3>
                        </section>
                        <section class="nds-content-section nds-neutral" style="padding: var(--spacing-xl);">
                            <h3 class="nds-section-title" style="font-size: var(--nds-text-lg-FS);">.nds-neutral</h3>
                        </section>
                        <section class="nds-content-section nds-brand" style="padding: var(--spacing-xl);">
                            <h3 class="nds-section-title" style="font-size: var(--nds-text-lg-FS);">.nds-brand</h3>
                        </section>
                        <section class="nds-content-section nds-ghost" style="padding: var(--spacing-xl); border: 1px dashed var(--border-neutral-secondary);">
                            <h3 class="nds-section-title" style="font-size: var(--nds-text-lg-FS);">.nds-ghost / .noBg (transparent)</h3>
                        </section>
                    </div>
                </div>
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-variants" id="tab-variants">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-variants" aria-labelledby="tab-variants">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
<code class="lang-html code">
&lt;!-- Default --&gt;
&lt;section class="nds-content-section"&gt;...&lt;/section&gt;

&lt;!-- Blue --&gt;
&lt;section class="nds-content-section nds-blue"&gt;...&lt;/section&gt;

&lt;!-- Green --&gt;
&lt;section class="nds-content-section nds-green"&gt;...&lt;/section&gt;

&lt;!-- Neutral --&gt;
&lt;section class="nds-content-section nds-neutral"&gt;...&lt;/section&gt;

&lt;!-- Brand --&gt;
&lt;section class="nds-content-section nds-brand"&gt;...&lt;/section&gt;

&lt;!-- Ghost (transparent) --&gt;
&lt;section class="nds-content-section nds-ghost"&gt;...&lt;/section&gt;
</code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Grid Columns -->
<section id="grid" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Grid Columns</h2>
            <p class="nds-section-description">Every section is a CSS Grid with named columns. Direct children are placed into <code>content</code>, <code>breakout</code>, or <code>full-width</code> tracks.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Grid Placement</div>
                </div>
                <div class="demo-container noBg">
<code class="lang-html code">
[full-width] | [breakout] | [content] | [breakout] | [full-width]

Default child         → grid-column: content
.nds-breakout         → grid-column: breakout
.nds-full-width       → grid-column: full-width
</code>
                </div>
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-grid" id="tab-grid">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-grid" aria-labelledby="tab-grid">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
<code class="lang-html code">
&lt;!-- Default: content column --&gt;
&lt;div class="nds-section-content"&gt;...&lt;/div&gt;

&lt;!-- Wider: breakout column --&gt;
&lt;div class="nds-section-content nds-breakout"&gt;...&lt;/div&gt;

&lt;!-- Edge-to-edge: full-width column --&gt;
&lt;div class="nds-section-content nds-full-width"&gt;...&lt;/div&gt;
</code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Customization Tokens -->
<section id="tokens" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Customization Tokens</h2>
            <p class="nds-section-description">Override CSS custom properties to customize section appearance without modifying the source.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Visual Tokens</div>
                </div>
                <div class="demo-container noBg">
                    <table class="nds-table nds-striped">
                        <thead>
                            <tr>
                                <th>Token</th>
                                <th>Default</th>
                                <th>Scope</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td><code>--section-bg</code></td><td>var(--background-white)</td><td>.nds-content-section</td></tr>
                            <tr><td><code>--section-shadow</code></td><td>none</td><td>.nds-content-section</td></tr>
                            <tr><td><code>--section-border</code></td><td>none</td><td>.nds-content-section</td></tr>
                            <tr><td><code>--section-border-radius</code></td><td>0</td><td>.nds-content-section</td></tr>
                            <tr><td><code>--section-title-FS</code></td><td>clamp(24px, 3vw, 36px)</td><td>.nds-content-section, .nds-hero-section</td></tr>
                            <tr><td><code>--section-title-LH</code></td><td>clamp(30px, 3.67vw, 44px)</td><td>.nds-content-section, .nds-hero-section</td></tr>
                            <tr><td><code>--section-title-MB</code></td><td>clamp(7.5px, 0.9175vw, 11px)</td><td>.nds-content-section, .nds-hero-section</td></tr>
                            <tr><td><code>--section-description-FS</code></td><td>clamp(16px, 1.5vw, 18px)</td><td>.nds-content-section, .nds-hero-section</td></tr>
                            <tr><td><code>--section-description-LH</code></td><td>clamp(24px, 2.17vw, 26px)</td><td>.nds-content-section, .nds-hero-section</td></tr>
                            <tr><td><code>--section-description-MB</code></td><td>var(--spacing-2xl)</td><td>.nds-content-section, .nds-hero-section</td></tr>
                            <tr><td><code>--section-col-gap</code></td><td>var(--spacing-xl)</td><td>.nds-section-wrapper</td></tr>
                            <tr><td><code>--section-row-gap</code></td><td>var(--spacing-xl)</td><td>.nds-section-wrapper</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Horizontal Layout -->
<section id="horizontal" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Horizontal Layout</h2>
            <p class="nds-section-description">Add <code>.nds-horizontal</code> to a section to switch the wrapper from flex to a two-column grid layout on desktop (head left, content right).</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Horizontal</div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <section class="nds-content-section nds-horizontal nds-ghost" style="padding:0;">
                            <div class="nds-section-wrapper">
                                <div class="nds-section-head">
                                    <h2 class="nds-section-title">Side by Side</h2>
                                    <p class="nds-section-description">Head and content are displayed in a horizontal grid on desktop screens.</p>
                                </div>
                                <div class="nds-section-content">
                                    <p>Content area appears beside the head on desktop, below on mobile.</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-horizontal" id="tab-horizontal">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-horizontal" aria-labelledby="tab-horizontal">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
<code class="lang-html code">
&lt;section class="nds-content-section nds-horizontal"&gt;
    &lt;div class="nds-section-wrapper"&gt;
        &lt;div class="nds-section-head"&gt;
            &lt;h2 class="nds-section-title"&gt;Title&lt;/h2&gt;
            &lt;p class="nds-section-description"&gt;Description.&lt;/p&gt;
        &lt;/div&gt;
        &lt;div class="nds-section-content"&gt;
            &lt;!-- Content beside head on desktop --&gt;
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
</section>

<!-- SCSS Architecture -->
<section id="scss" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">SCSS Architecture</h2>
            <p class="nds-section-description">The section component is split across 3 focused SCSS files with clear separation of concerns.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">File Structure</div>
                </div>
                <div class="demo-container noBg">
                    <table class="nds-table nds-striped">
                        <thead>
                            <tr>
                                <th>File</th>
                                <th>Role</th>
                                <th>Contains</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code>_sass/components/_section.scss</code></td>
                                <td>Component base</td>
                                <td>Visual tokens, typography tokens, head, title, description, meta, action, content</td>
                            </tr>
                            <tr>
                                <td><code>_sass/layout/_sectionLayout.scss</code></td>
                                <td>Layout overrides</td>
                                <td>Wrapper (container queries), cardView, 404, sideInfo, horizontal, striping</td>
                            </tr>
                            <tr>
                                <td><code>_sass/layout/_contentLayout.scss</code></td>
                                <td>Page layout</td>
                                <td>CSS Grid system, .nds-content-layout variants, side menu, mobile</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>
