---
layout: page
title: Cards
hero_title: Cards - National Design System
hero_description: Flexible content containers with support for images, icons, tags, ratings, and actions
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Standard Card -->
<section id="standardCard" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Standard</h2>
            <p class="nds-section-description">Toggle optional sections to build different card layouts</p>
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
                                data-toggler='["nds-center", ".nds-card", "cardCenter"]'>
                                <span class="nds-label">Center</span>
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
                                    <div class="nds-card-checkbox" hidden>
                                        <div class="nds-form-container nds-check-container">
                                            <div class="nds-form-control">
                                                <input type="checkbox" name="cardSelect" value="card-1" class="nds-check">
                                            </div>
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
                                    </div>
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
            &lt;p class="nds-card-description"&gt;Short description of this card content goes here.&lt;/p&gt;
        &lt;/div&gt;
        &lt;div class="nds-card-meta"&gt;
            &lt;div class="nds-card-tags"&gt;
                &lt;span class="nds-tag nds-blue nds-sm"&gt;
                    &lt;span class="nds-label"&gt;Category&lt;/span&gt;
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
<section id="statisticCard" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Statistic</h2>
            <p class="nds-section-description">Centered number display with icon and label</p>
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
<section id="cardGroup" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Card Group</h2>
            <p class="nds-section-description">Responsive grid layout using nds-grid with configurable columns</p>
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
                            <div class="nds-grid" style="--max-col: 4; --mid-col: 2; --min-col: 2; width: fit-content;">
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
&lt;div class="nds-grid" style="--max-col: 4; --mid-col: 2; --min-col: 2; width: fit-content;"&gt;
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
    &lt;!-- Additional cards... --&gt;
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
<section id="cardFeatures" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
            <p class="nds-section-description">What you get out of the box with zero configuration</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1;">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-customize"></i>
                        <span class="nds-label">CSS Custom Properties</span>
                    </span>
                    <p class="nds-item-desc">Override padding, gap, colors, border, and width through CSS variables on any card instance.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-layout-01"></i>
                        <span class="nds-label">Responsive Layout</span>
                    </span>
                    <p class="nds-item-desc">Card actions stack vertically on mobile. Use nds-grid for responsive multi-card layouts.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-puzzle"></i>
                        <span class="nds-label">Flexible Structure</span>
                    </span>
                    <p class="nds-item-desc">Mix and match header, content, meta, tags, rating, checkbox, and action sub-components.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-layers-01"></i>
                        <span class="nds-label">Shared Foundation</span>
                    </span>
                    <p class="nds-item-desc">Used as the base structure for alerts, modals, and other container components across the design system.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-image-02"></i>
                        <span class="nds-label">Image Control</span>
                    </span>
                    <p class="nds-item-desc">Set aspect ratio, position, and overlay opacity through CSS custom properties on the image container.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-cursor-02"></i>
                        <span class="nds-label">Interactive States</span>
                    </span>
                    <p class="nds-item-desc">Hover and active feedback on shadow and stroke variants. Works on div, anchor, or button elements.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="cardGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
            <p class="nds-section-description">When and how to use cards effectively</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <h3 class="nds-block-title">When to Use</h3>
                <ul>
                    <li>Display grouped content in grid or list layouts (services, products, articles)</li>
                    <li>Show key metrics with statistic cards in dashboards</li>
                    <li>Use stroke for flat layouts, shadow for elevated or floating cards</li>
                    <li>Use a button or anchor element for clickable cards</li>
                    <li>For simple text blocks, consider plain content sections instead</li>
                    <li>Avoid nesting cards inside other cards</li>
                </ul>
            </div>
        </div>
    </div>
</section>
