---
layout: page
title: Cards
hero_title: Cards - National Design System
hero_description: A composable container for grouping content, metrics, or actions with stroke, shadow, color-fill, and on-color treatments for any surface
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Standard Card -->
<section id="standardCard" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Standard</h2>
            <p class="nds-section-description">Build product, article, or service cards by combining header, content, tags, rating, and action sub-components</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Mode: ">
                                    <span class="nds-label">Mode: Default</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected" data-card-mode="default">
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-card-mode="expandable">
                                            <span class="nds-label">Expandable</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-card-mode="selectable">
                                            <span class="nds-label">Selectable</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-card-mode="actions">
                                            <span class="nds-label">Actions</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Icon</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected" data-card-header="icon">
                                            <span class="nds-label">Icon</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-card-header="image">
                                            <span class="nds-label">Image</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-card-header="avatar">
                                            <span class="nds-label">Avatar</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-card-header="none">
                                            <span class="nds-label">None</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="State: ">
                                    <span class="nds-label">State: Default</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected" data-card-state="default">
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-card-state="interactive">
                                            <span class="nds-label">Interactive</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-card-state="disabled">
                                            <span class="nds-label">Disabled</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Color: ">
                                    <span class="nds-label">Color: None</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected" data-card-color="none">
                                            <span class="nds-label">None</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-card-color="gold">
                                            <span class="nds-label">Gold</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-card-color="neutral">
                                            <span class="nds-label">Neutral</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-card-color="lavendar">
                                            <span class="nds-label">Lavendar</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-card-color="yellow">
                                            <span class="nds-label">Yellow</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-card-color="red">
                                            <span class="nds-label">Red</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-card-color="blue">
                                            <span class="nds-label">Blue</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-card-color="oncolor">
                                            <span class="nds-label">Oncolor</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Layout: ">
                                    <span class="nds-label">Layout: Default</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected" data-card-layout="default">
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-card-layout="rowView">
                                            <span class="nds-label">Row view</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-card-layout="center">
                                            <span class="nds-label">Center</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-color", ".nds-card", "cardColor"]'>
                                <span class="nds-label">Color fill</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn" data-state="selected"
                                data-toggler='["nds-stroke", ".nds-card", "cardStroke"]'>
                                <span class="nds-label">Stroke</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-shadow", ".nds-card", "cardShadow"]'>
                                <span class="nds-label">Shadow</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='[["nds-truncate", ".nds-card-title", "cardTruncate"],["nds-truncate", ".nds-card-description", "cardTruncate"]]'>
                                <span class="nds-label">Truncate</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn" data-state="selected" data-card-toggle="tags">
                                <span class="nds-label">Tags</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn" data-card-toggle="rating">
                                <span class="nds-label">Rating</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-card nds-stroke">
                                <div class="nds-card-header">
                                    <div class="nds-card-image" style="--img-pos-x:50%; --img-pos-y:10%;" hidden>
                                        <img src="{{ 'assets/img/riyadhcenter.webp' | relative_url }}" alt="Card image">
                                    </div>
                                    <div class="nds-card-featured-icon">
                                        <span class="nds-featured-icon nds-circle nds-lg">
                                            <i class="hgi hgi-stroke hgi-stars"></i>
                                        </span>
                                    </div>
                                    <div class="nds-avatar nds-xl" hidden>
                                        <i class="nds-icon nds-icon-avatar" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div class="nds-card-checkbox" hidden>
                                    <div class="nds-form-container nds-check-container">
                                        <div class="nds-form-control">
                                            <input type="checkbox" name="cardSelect" value="card-1" class="nds-check">
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-card-content">
                                    <div class="nds-card-text">
                                        <h3 class="nds-card-title">Card Title</h3>
                                        <p class="nds-card-description">Short description of this card content goes here for demonstration.</p>
                                    </div>
                                    <div class="nds-card-meta">
                                        <div class="nds-card-tags">
                                            <span class="nds-tag nds-blue nds-sm">
                                                <span class="nds-label">Category</span>
                                            </span>
                                            <span class="nds-tag nds-gray nds-sm">
                                                <span class="nds-label">Topic</span>
                                            </span>
                                            <span class="nds-tag nds-green nds-sm">
                                                <span class="nds-label">Active</span>
                                            </span>
                                        </div>
                                        <div class="nds-card-rating" hidden>
                                            <div class="nds-rating nds-sm" data-rating="4.5">
                                                <span class="nds-rating-star"></span>
                                                <span class="nds-rating-star"></span>
                                                <span class="nds-rating-star"></span>
                                                <span class="nds-rating-star"></span>
                                                <span class="nds-rating-star"></span>
                                            </div>
                                            <span class="nds-card-rating-text">(12 reviews)</span>
                                        </div>
                                        <div class="nds-card-actions" hidden>
                                            <a href="#" class="nds-btn nds-secondary-outline nds-lg nds-trail-icon">
                                                <i class="nds-icon nds-hgi-link-square-02" aria-hidden="true"></i>
                                                <span class="nds-label">Learn More</span>
                                            </a>
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
                                    aria-controls="panel-card-standard-1" id="tab-card-standard-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-card-standard-1"
                                aria-labelledby="tab-card-standard-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                        <i class="nds-icon nds-hgi-copy-01"></i>
                                    </button>
                                </div>
                                <div class="nds-expandable-content">
                                    <code class="lang-html code">
&lt;div class="nds-card nds-stroke"&gt;
    &lt;div class="nds-card-header"&gt;
        &lt;div class="nds-card-featured-icon"&gt;
            &lt;span class="nds-featured-icon nds-circle nds-lg"&gt;
                &lt;i class="hgi hgi-stroke hgi-stars"&gt;&lt;/i&gt;
            &lt;/span&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-card-content"&gt;
        &lt;div class="nds-card-text"&gt;
            &lt;h3 class="nds-card-title"&gt;Card Title&lt;/h3&gt;
            &lt;p class="nds-card-description"&gt;Short description of this card content goes here for demonstration.&lt;/p&gt;
        &lt;/div&gt;
        &lt;div class="nds-card-meta"&gt;
            &lt;div class="nds-card-tags"&gt;
                &lt;span class="nds-tag nds-blue nds-sm"&gt;
                    &lt;span class="nds-label"&gt;Category&lt;/span&gt;
                &lt;/span&gt;
                &lt;span class="nds-tag nds-gray nds-sm"&gt;
                    &lt;span class="nds-label"&gt;Topic&lt;/span&gt;
                &lt;/span&gt;
                &lt;span class="nds-tag nds-green nds-sm"&gt;
                    &lt;span class="nds-label"&gt;Active&lt;/span&gt;
                &lt;/span&gt;
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

<!-- Statistic Card -->
<section id="statisticCard" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Statistic</h2>
            <p class="nds-section-description">A centered metric layout for headline numbers in dashboards and stats grids</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Color: ">
                                    <span class="nds-label">Color: None</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected" data-card-color="none">
                                            <span class="nds-label">None</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-card-color="gold">
                                            <span class="nds-label">Gold</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-card-color="neutral">
                                            <span class="nds-label">Neutral</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-card-color="lavendar">
                                            <span class="nds-label">Lavendar</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-card-color="yellow">
                                            <span class="nds-label">Yellow</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-card-color="red">
                                            <span class="nds-label">Red</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-card-color="blue">
                                            <span class="nds-label">Blue</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-card-color="oncolor">
                                            <span class="nds-label">Oncolor</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-color", ".nds-card", "cardColor"]'>
                                <span class="nds-label">Color fill</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn" data-state="selected"
                                data-toggler='["nds-stroke", ".nds-card", "cardStroke"]'>
                                <span class="nds-label">Stroke</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-shadow", ".nds-card", "cardShadow"]'>
                                <span class="nds-label">Shadow</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-card nds-stroke nds-statistic">
                                <div class="nds-card-header">
                                    <div class="nds-card-featured-icon">
                                        <span class="nds-featured-icon nds-circle nds-xl">
                                            <i class="nds-icon nds-icon-avatar" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                </div>
                                <div class="nds-card-content">
                                    <div class="nds-card-text">
                                        <span class="nds-card-number nds-counter-value nds-number-format" data-target="125847">0</span>
                                        <p class="nds-card-description">Active Users</p>
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
                                    aria-controls="panel-card-statistic-1" id="tab-card-statistic-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-card-statistic-1"
                                aria-labelledby="tab-card-statistic-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                        <i class="nds-icon nds-hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
&lt;div class="nds-card nds-stroke nds-statistic"&gt;
    &lt;div class="nds-card-header"&gt;
        &lt;div class="nds-card-featured-icon"&gt;
            &lt;span class="nds-featured-icon nds-circle nds-xl"&gt;
                &lt;i class="nds-icon nds-icon-avatar" aria-hidden="true"&gt;&lt;/i&gt;
            &lt;/span&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-card-content"&gt;
        &lt;div class="nds-card-text"&gt;
            &lt;span class="nds-card-number nds-counter-value nds-number-format" data-target="125847"&gt;0&lt;/span&gt;
            &lt;p class="nds-card-description"&gt;Active Users&lt;/p&gt;
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
</section>

<!-- Card Group -->
<section id="cardGroup" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Card Group</h2>
            <p class="nds-section-description">Pair cards with <code class="nds-inline-code lang-html">nds-grid</code> for responsive column-shifting layouts</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <button class="nds-btn nds-subtle demo-toggle-btn" data-state="selected"
                                data-toggler='["nds-stroke", ".nds-card", "cardStroke"]'>
                                <span class="nds-label">Stroke</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-shadow", ".nds-card", "cardShadow"]'>
                                <span class="nds-label">Shadow</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-grid" style="--max-col: 4; --mid-col: 2; --min-col: 2;">
                                <div class="nds-card nds-stroke nds-statistic">
                                    <div class="nds-card-header">
                                        <div class="nds-card-featured-icon">
                                            <span class="nds-featured-icon nds-circle nds-xl">
                                                <i class="hgi hgi-stroke hgi-user-multiple"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <span class="nds-card-number nds-counter-value nds-number-format" data-target="125847">0</span>
                                            <p class="nds-card-description">Active Users</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke nds-statistic">
                                    <div class="nds-card-header">
                                        <div class="nds-card-featured-icon">
                                            <span class="nds-featured-icon nds-circle nds-xl">
                                                <i class="nds-icon nds-hgi-checkmark-circle-02" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <span class="nds-card-number nds-counter-value nds-number-format" data-target="8542">0</span>
                                            <p class="nds-card-description">Completed</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke nds-statistic">
                                    <div class="nds-card-header">
                                        <div class="nds-card-featured-icon">
                                            <span class="nds-featured-icon nds-circle nds-xl">
                                                <i class="hgi hgi-stroke hgi-star"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <span class="nds-card-number nds-counter-value nds-number-format" data-target="92%">0</span>
                                            <p class="nds-card-description">Success Rate</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke nds-statistic">
                                    <div class="nds-card-header">
                                        <div class="nds-card-featured-icon">
                                            <span class="nds-featured-icon nds-circle nds-xl">
                                                <i class="hgi hgi-stroke hgi-queue-01"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <span class="nds-card-number nds-counter-value nds-number-format" data-target="+1247">0</span>
                                            <p class="nds-card-description">Pending</p>
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
                                    aria-controls="panel-card-group-1" id="tab-card-group-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-card-group-1"
                                aria-labelledby="tab-card-group-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                        <i class="nds-icon nds-hgi-copy-01"></i>
                                    </button>
                                </div>
                                <div class="nds-expandable-content">
                                    <code class="lang-html code">
&lt;div class="nds-grid" style="--max-col: 4; --mid-col: 2; --min-col: 2;"&gt;
    &lt;div class="nds-card nds-stroke nds-statistic"&gt;
        &lt;div class="nds-card-header"&gt;
            &lt;div class="nds-card-featured-icon"&gt;
                &lt;span class="nds-featured-icon nds-circle nds-xl"&gt;
                    &lt;i class="hgi hgi-stroke hgi-user-multiple"&gt;&lt;/i&gt;
                &lt;/span&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="nds-card-content"&gt;
            &lt;div class="nds-card-text"&gt;
                &lt;span class="nds-card-number nds-counter-value nds-number-format" data-target="125847"&gt;0&lt;/span&gt;
                &lt;p class="nds-card-description"&gt;Active Users&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-card nds-stroke nds-statistic"&gt;
        &lt;div class="nds-card-header"&gt;
            &lt;div class="nds-card-featured-icon"&gt;
                &lt;span class="nds-featured-icon nds-circle nds-xl"&gt;
                    &lt;i class="nds-icon nds-hgi-checkmark-circle-02" aria-hidden="true"&gt;&lt;/i&gt;
                &lt;/span&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="nds-card-content"&gt;
            &lt;div class="nds-card-text"&gt;
                &lt;span class="nds-card-number nds-counter-value nds-number-format" data-target="8542"&gt;0&lt;/span&gt;
                &lt;p class="nds-card-description"&gt;Completed&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-card nds-stroke nds-statistic"&gt;
        &lt;div class="nds-card-header"&gt;
            &lt;div class="nds-card-featured-icon"&gt;
                &lt;span class="nds-featured-icon nds-circle nds-xl"&gt;
                    &lt;i class="hgi hgi-stroke hgi-star"&gt;&lt;/i&gt;
                &lt;/span&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="nds-card-content"&gt;
            &lt;div class="nds-card-text"&gt;
                &lt;span class="nds-card-number nds-counter-value nds-number-format" data-target="92%"&gt;0&lt;/span&gt;
                &lt;p class="nds-card-description"&gt;Success Rate&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-card nds-stroke nds-statistic"&gt;
        &lt;div class="nds-card-header"&gt;
            &lt;div class="nds-card-featured-icon"&gt;
                &lt;span class="nds-featured-icon nds-circle nds-xl"&gt;
                    &lt;i class="hgi hgi-stroke hgi-queue-01"&gt;&lt;/i&gt;
                &lt;/span&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="nds-card-content"&gt;
            &lt;div class="nds-card-text"&gt;
                &lt;span class="nds-card-number nds-counter-value nds-number-format" data-target="+1247"&gt;0&lt;/span&gt;
                &lt;p class="nds-card-description"&gt;Pending&lt;/p&gt;
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
<section id="cardFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
            <p class="nds-section-description">What you get out of the box with zero configuration</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-puzzle"></i>
                        <span class="nds-label">Composable Anatomy</span>
                    </span>
                    <p class="nds-item-desc">Mix header, content, tags, rating, checkbox, status, and actions to build product, article, service, or user cards.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-colors"></i>
                        <span class="nds-label">Seven Color Variants</span>
                    </span>
                    <p class="nds-item-desc">Default, gold, neutral, lavender, yellow, red, and blue treatments adjust title, border, and icon tints together. Combine with <code class="nds-inline-code lang-html">nds-color</code> for a tinted fill.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-chart-bar-line"></i>
                        <span class="nds-label">Statistic Mode</span>
                    </span>
                    <p class="nds-item-desc">Centered metric layout with display-sized numbers and an icon for dashboards and stats grids.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-image-02"></i>
                        <span class="nds-label">Image with Overlay</span>
                    </span>
                    <p class="nds-item-desc">Aspect ratio, focal point, and gradient overlay are tunable per card through CSS variables on the image container.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-paint-bucket"></i>
                        <span class="nds-label">On-Color Treatment</span>
                    </span>
                    <p class="nds-item-desc">Add <code class="nds-inline-code lang-html">nds-oncolor</code> to adapt text, borders, and icon tints for dark sections, hero backgrounds, or photographic surfaces.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-cursor-02"></i>
                        <span class="nds-label">Interactive States</span>
                    </span>
                    <p class="nds-item-desc">Use the card as <code class="nds-inline-code lang-html">&lt;a&gt;</code> or <code class="nds-inline-code lang-html">&lt;button&gt;</code> to get hover and active feedback on stroke and shadow variants.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-customize"></i>
                        <span class="nds-label">CSS-Driven Theming</span>
                    </span>
                    <p class="nds-item-desc">Override padding, gap, radius, colors, and width per instance via <code class="nds-inline-code lang-html">--card-*</code> custom properties.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-layout-01"></i>
                        <span class="nds-label">Responsive Layout</span>
                    </span>
                    <p class="nds-item-desc">Card actions stack on mobile. Pair with <code class="nds-inline-code lang-html">nds-grid</code> for column-shifting card groups.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="cardGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
            <p class="nds-section-description">When and how to use cards effectively</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use <strong>cards</strong> to group related content into scannable units: service tiles, product listings, article previews, and dashboard widgets</li>
                    <li>Use <code class="nds-inline-code lang-html">nds-statistic</code> for headline metrics in dashboards: a single number, a label, and an optional icon. Pair multiple statistic cards inside a <a class="nds-color" href="{{ 'layout/grid' | relative_url }}">grid</a> for KPI rows</li>
                    <li>Choose <code class="nds-inline-code lang-html">nds-stroke</code> for flat or content-heavy layouts. Use <code class="nds-inline-code lang-html">nds-shadow</code> for elevated, floating, or modal-adjacent cards</li>
                    <li>Use <code class="nds-inline-code lang-html">nds-color</code> together with a color variant (<code class="nds-inline-code lang-html">nds-blue</code>, <code class="nds-inline-code lang-html">nds-yellow</code>, etc.) to category-code or status-code groups of cards in dashboards</li>
                    <li>Use <code class="nds-inline-code lang-html">nds-oncolor</code> when placing cards on dark sections, hero backgrounds, or imagery so text and borders stay readable</li>
                    <li>Make the entire card clickable by using <code class="nds-inline-code lang-html">&lt;a&gt;</code> or <code class="nds-inline-code lang-html">&lt;button&gt;</code> as the root element, not by wrapping a card in a separate link</li>
                    <li>Don't use a card for a transient status message: use an <a class="nds-color" href="{{ 'components/alert' | relative_url }}">Alert</a> instead. Don't use a card to block the user for a decision: use a <a class="nds-color" href="{{ 'components/modal' | relative_url }}">Modal</a></li>
                    <li>Don't nest cards inside cards. If you need internal structure, use <code class="nds-inline-code lang-html">nds-card-meta</code>, <code class="nds-inline-code lang-html">nds-card-tags</code>, or a <a class="nds-color" href="{{ 'components/definition-list' | relative_url }}">definition list</a> inside the content area</li>
                    <li>Add a featured icon or avatar in the header for quick visual recognition. Size up (<code class="nds-inline-code lang-html">nds-lg</code>, <code class="nds-inline-code lang-html">nds-xl</code>) on statistic cards and grid contexts where the icon carries the meaning</li>
                    <li>Keep card descriptions to one or two lines. For longer copy, add <code class="nds-inline-code lang-html">nds-truncate</code> on the title and description, or link out to a detail page from the actions area</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Class</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">nds-stroke</code></td><td>Adds a 1px outline border around the card</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-shadow</code></td><td>Adds an elevation shadow; deepens on hover when the card is interactive</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-color</code></td><td>Tinted background fill that matches the active color variant</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-rowView</code></td><td>Switches the card to a horizontal row layout (header sits to the side)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-center</code></td><td>Centers header, content, tags, rating, and actions horizontally</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-statistic</code></td><td>Centered metric layout with a large display number; size with <code class="nds-inline-code lang-html">nds-md</code> or <code class="nds-inline-code lang-html">nds-sm</code> on the number element</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-user</code></td><td>Compact user-card preset with a 224px default width</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-full-width</code> / <code class="nds-inline-code lang-html">nds-full</code></td><td>Removes the max-width cap so the card fills its container</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-oncolor</code></td><td>Adapts text, borders, and icon tints for dark or photographic surfaces</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-gold</code>, <code class="nds-inline-code lang-html">nds-neutral</code>, <code class="nds-inline-code lang-html">nds-lavendar</code>, <code class="nds-inline-code lang-html">nds-yellow</code>, <code class="nds-inline-code lang-html">nds-red</code>, <code class="nds-inline-code lang-html">nds-blue</code></td><td>Color variants that retint title, border-hover, and icon. Combine with <code class="nds-inline-code lang-html">nds-color</code> for a matching tinted fill</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-disabled</code> / <code class="nds-inline-code lang-html">[disabled]</code></td><td>Mutes colors, dims sub-content, and removes pointer interactions</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--card-bg</code></td><td><code class="nds-inline-code lang-html">--background-card</code></td><td>Card background color</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--card-bg-hover</code></td><td><code class="nds-inline-code lang-html">--background-card-hovered</code></td><td>Background when the card is interactive and hovered</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--card-border</code></td><td><code class="nds-inline-code lang-html">--border-neutral-primary</code></td><td>Stroke color for the <code class="nds-inline-code lang-html">nds-stroke</code> variant</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--card-border-hover</code></td><td><code class="nds-inline-code lang-html">--border-primary</code></td><td>Stroke color when the card is hovered</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--card-border-active</code></td><td><code class="nds-inline-code lang-html">--border-neutral-primary</code></td><td>Stroke color when the card is pressed</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--card-padding</code></td><td><code class="nds-inline-code lang-html">--spacing-xl</code></td><td>Inner padding of the card</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--card-gap</code></td><td><code class="nds-inline-code lang-html">--spacing-3xl</code></td><td>Vertical gap between header, content, meta, and actions</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--card-radius</code></td><td><code class="nds-inline-code lang-html">--components-card-radius</code></td><td>Corner radius</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--card-width</code></td><td><code class="nds-inline-code lang-html">100%</code></td><td>Card width inside its container</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--card-width-min</code></td><td><code class="nds-inline-code lang-html">0</code></td><td>Minimum width</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--card-width-max</code></td><td><code class="nds-inline-code lang-html">360px</code></td><td>Maximum width cap</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--card-title</code></td><td><code class="nds-inline-code lang-html">--text-display</code></td><td>Title color</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--card-subtitle</code></td><td><code class="nds-inline-code lang-html">--text-primary</code></td><td>Subtitle color</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--card-text</code></td><td><code class="nds-inline-code lang-html">--text-display</code></td><td>Description and body text color</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--card-number</code></td><td><code class="nds-inline-code lang-html">--text-primary-sa-flag</code></td><td>Statistic number color</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--card-rating</code></td><td><code class="nds-inline-code lang-html">--text-secondary-paragraph</code></td><td>Rating helper text color</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--icon-color</code></td><td><code class="nds-inline-code lang-html">--featuredicons-icon-primary</code></td><td>Featured-icon color (also drives the avatar color)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--icon-bg-color</code></td><td><code class="nds-inline-code lang-html">--featuredicons-background-brand-light</code></td><td>Featured-icon background color</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--img-ratio</code></td><td><code class="nds-inline-code lang-html">2 / 1</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-card-image</code> to control aspect ratio</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--img-pos-x</code></td><td><code class="nds-inline-code lang-html">50%</code></td><td>Horizontal focal point of the image</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--img-pos-y</code></td><td><code class="nds-inline-code lang-html">50%</code></td><td>Vertical focal point of the image</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--overlay</code></td><td><code class="nds-inline-code lang-html">0</code></td><td>Opacity of the dark gradient overlay on the image (0 to 1)</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>
