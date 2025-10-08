---
layout: page
title: Cards
hero_title: Card Components - National Design System
hero_description: Card components for displaying content with featured icons, tags, ratings, buttons, and checkboxes
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Cards Overview -->
<section id="cardsOverview" class="nds-content-section">
    <div class="nds-section-content-container">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Card Components</h2>
            <p class="nds-section-description">Card components for displaying content with integrated NDS components</p>
        </div>
        <div class="nds-section-content">
            <div class="cards-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Basic Card</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-shadow", ".nds-card", "cardVariant"]'>
                                <span class="label">Shadow</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                                data-toggler='["nds-stroke", ".nds-card", "cardVariant"]'>
                                <span class="label">Stroke</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-interactive", ".nds-card", "cardInteractive"]'>
                                <span class="label">Interactive</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-featured", ".nds-card", "cardVariant2"]'>
                                <span class="label">Featured</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='[["nds-truncate", ".nds-card-title"],["nds-truncate", ".nds-card-description"], "truncation"]'>
                                <span class="label">Truncate</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-card-compact", ".nds-card", "cardSize"]'>
                                <span class="label">Compact</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-card nds-stroke">
                                <div class="nds-card-header">
                                    <!-- Featured Icon -->
                                    <div class="nds-card-featured-icon">
                                        <span class="nds-featured-icon nds-brand nds-circle nds-lg">
                                            <i class="hgi hgi-stroke hgi-stars icon"></i>
                                        </span>
                                    </div>
                                </div>

                                <div class="nds-card-content">
                                    <div class="nds-card-text">
                                        <h3 class="nds-card-title">Digital Services Platform</h3>
                                        <p class="nds-card-description">Comprehensive government digital platform that
                                            streamlines citizen services and enhances public sector efficiency across
                                            Saudi Arabia.</p>
                                    </div>
                                    <div class="nds-card-meta">
                                        <!-- Tags -->
                                        <div class="nds-card-tags">
                                            <span class="nds-tag nds-info nds-sm">
                                                <span class="label">Government</span>
                                            </span>
                                            <span class="nds-tag nds-neutral nds-sm">
                                                <span class="label">Digital Services</span>
                                            </span>
                                            <span class="nds-tag nds-success nds-sm">
                                                <span class="label">Live</span>
                                            </span>
                                        </div>
                                    </div>

                                </div>
                                <div class="nds-card-actions">
                                    <a href="#" class="nds-btn nds-secondary-outline nds-lg nds-trail-icon">
                                        <i class="hgi hgi-stroke hgi-link-square-02 icon"></i>
                                        <span class="label">Learn More</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code withDivider">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-basic-1" id="tab-basic-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-basic-1"
                                aria-labelledby="tab-basic-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <div class="nds-expandable-content">
                                    <code class="lang-html code">
                                        <div class="nds-card nds-stroke">
                                            <div class="nds-card-header">
                                                <!-- Featured Icon -->
                                                <div class="nds-card-featured-icon">
                                                    <span class="nds-featured-icon nds-brand nds-circle nds-lg">
                                                        <i class="hgi hgi-stroke hgi-stars icon"></i>
                                                    </span>
                                                </div>
                                            </div>
            
                                            <div class="nds-card-content">
                                                <div class="nds-card-text">
                                                    <h3 class="nds-card-title">Digital Services Platform</h3>
                                                    <p class="nds-card-description">Comprehensive government digital platform that
                                                        streamlines citizen services and enhances public sector efficiency across
                                                        Saudi Arabia.</p>
                                                </div>
                                                <div class="nds-card-meta">
                                                    <!-- Tags -->
                                                    <div class="nds-card-tags">
                                                        <span class="nds-tag nds-info nds-sm">
                                                            <span class="label">Government</span>
                                                        </span>
                                                        <span class="nds-tag nds-neutral nds-sm">
                                                            <span class="label">Digital Services</span>
                                                        </span>
                                                        <span class="nds-tag nds-success nds-sm">
                                                            <span class="label">Live</span>
                                                        </span>
                                                    </div>
                                                </div>
            
                                            </div>
                                            <div class="nds-card-actions">
                                                <a href="#" class="nds-btn nds-primary nds-lg nds-trail-icon">
                                                    <i class="hgi hgi-stroke hgi-link-square-02 icon"></i>
                                                    <span class="label">Learn More</span>
                                                </a>
                                            </div>
                                        </div>
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Card with image</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-shadow", ".nds-card", "cardVariant"]'>
                                <span class="label">Shadow</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                                data-toggler='["nds-stroke", ".nds-card", "cardVariant"]'>
                                <span class="label">Stroke</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-interactive", ".nds-card", "cardInteractive"]'>
                                <span class="label">Interactive</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-featured", ".nds-card", "cardVariant2"]'>
                                <span class="label">Featured</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-card-compact", ".nds-card", "cardSize"]'>
                                <span class="label">Compact</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-card nds-stroke">
                                <div class="nds-card-header">
                                    <!-- Checkbox for selection -->
                                    <div class="nds-card-checkbox">
                                        <div class="nds-form-container nds-check-container">
                                            <div class="nds-form-control">
                                                <input type="checkbox" name="cardSelection" value="card1"
                                                    class="nds-check">
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Card Image -->
                                    <div class="nds-card-image" style="--img-pos-x:50%; --img-pos-y:10%;">
                                        <img src="{{ '/assets/img/riyadhcenter.webp' | relative_url }}"
                                            alt="Technology Product">
                                    </div>
                                </div>

                                <div class="nds-card-content">
                                    <div class="nds-card-text">
                                        <h3 class="nds-card-title">Advanced Technology Product</h3>
                                        <p class="nds-card-description">Modern technology product that provides advanced
                                            solutions for companies and institutions.</p>
                                    </div>
                                    <div class="nds-card-meta">
                                        <!-- Tags -->
                                        <div class="nds-card-tags">
                                            <span class="nds-tag nds-info nds-sm">
                                                <span class="label">Technology</span>
                                            </span>
                                            <span class="nds-tag nds-neutral nds-sm">
                                                <span class="label">New</span>
                                            </span>
                                            <span class="nds-tag nds-success nds-sm">
                                                <span class="label">Updated</span>
                                            </span>
                                        </div>

                                        <!-- Rating using existing NDS rating component -->
                                        <div class="nds-card-rating">
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
                                <div class="nds-card-actions">
                                    <button class="nds-btn nds-secondary-outline nds-lg">
                                        <span class="label">Save</span>
                                    </button>
                                    <button class="nds-btn nds-primary nds-lg">
                                        <span class="label">Buy Now</span>
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code withDivider">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-basic-1" id="tab-basic-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-basic-1"
                                aria-labelledby="tab-basic-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <div class="nds-expandable-content">
                                    <code class="lang-html code">
                                        <div class="nds-card nds-stroke">
                                            <div class="nds-card-header">
                                                <!-- Checkbox for selection -->
                                                <div class="nds-card-checkbox">
                                                    <div class="nds-form-container nds-check-container">
                                                        <div class="nds-form-control">
                                                            <input type="checkbox" name="cardSelection" value="card1"
                                                                class="nds-check">
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- Card Image -->
                                                <div class="nds-card-image" style="--img-pos-x:50%; --img-pos-y:10%;">
                                                    <img src="{{ '/assets/img/riyadhcenter.webp' | relative_url }}"
                                                        alt="Technology Product">
                                                </div>
                                            </div>
            
                                            <div class="nds-card-content">
                                                <div class="nds-card-text">
                                                    <h3 class="nds-card-title">Advanced Technology Product</h3>
                                                    <p class="nds-card-description">Modern technology product that provides advanced
                                                        solutions for companies and institutions.</p>
                                                </div>
                                                <div class="nds-card-meta">
                                                    <!-- Tags -->
                                                    <div class="nds-card-tags">
                                                        <span class="nds-tag nds-info nds-sm">
                                                            <span class="label">Technology</span>
                                                        </span>
                                                        <span class="nds-tag nds-neutral nds-sm">
                                                            <span class="label">New</span>
                                                        </span>
                                                        <span class="nds-tag nds-success nds-sm">
                                                            <span class="label">Updated</span>
                                                        </span>
                                                    </div>
            
                                                    <!-- Rating using existing NDS rating component -->
                                                    <div class="nds-card-rating">
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
                                            <div class="nds-card-actions">
                                                <button class="nds-btn nds-secondary-outline nds-lg">
                                                    <span class="label">Save</span>
                                                </button>
                                                <button class="nds-btn nds-primary nds-lg">
                                                    <span class="label">Buy Now</span>
                                                </button>
                                            </div>
            
                                        </div>
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Expandable Card</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-shadow", ".nds-card", "cardVariant"]'>
                                <span class="label">Shadow</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                                data-toggler='["nds-stroke", ".nds-card", "cardVariant"]'>
                                <span class="label">Stroke</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='[["nds-truncate", ".nds-card-title"],["nds-truncate", ".nds-card-description"], "truncation"]'>
                                <span class="label">Truncate</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-full", ".nds-card", "cardSize"]'>
                                <span class="label">full</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-card nds-stroke nds-expandable nds-expand">
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
                    <div class="nds-tabs nds-code withDivider">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-expandable-1" id="tab-expandable-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                id="panel-expandable-1" aria-labelledby="tab-expandable-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <div class="nds-expandable-content">
                                    <code class="lang-html code">
                                        <div class="nds-card nds-stroke nds-expandable nds-expand">
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
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Statistic Card</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-shadow", ".nds-card", "cardVariant"]'>
                                <span class="label">Shadow</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                                data-toggler='["nds-stroke", ".nds-card", "cardVariant"]'>
                                <span class="label">Stroke</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-interactive", ".nds-card", "cardInteractive"]'>
                                <span class="label">Interactive</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-featured", ".nds-card", "cardVariant2"]'>
                                <span class="label">Featured</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-card-compact", ".nds-card", "cardSize"]'>
                                <span class="label">Compact</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-card nds-stroke nds-statistic">
                                <div class="nds-card-header">
                                    <!-- Featured Icon -->
                                    <div class="nds-card-featured-icon">
                                        <span class="nds-featured-icon nds-brand nds-circle nds-xl">
                                            <i class="hgi hgi-stroke hgi-user icon"></i>
                                        </span>
                                    </div>
                                </div>

                                <div class="nds-card-content">
                                    <div class="nds-card-text">
                                        <span class="nds-counter-value nds-number-format" data-target="125847">0</span>
                                        <p class="nds-card-description">Active Users</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code withDivider">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-statistic-1" id="tab-statistic-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                id="panel-statistic-1" aria-labelledby="tab-statistic-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <div class="nds-expandable-content">
                                    <code class="lang-html code">
                                        <div class="nds-card nds-stroke nds-statistic">
                                            <div class="nds-card-header">
                                                <!-- Featured Icon -->
                                                <div class="nds-card-featured-icon">
                                                    <span class="nds-featured-icon nds-brand nds-circle nds-lg">
                                                        <i class="hgi hgi-stroke hgi-chart-line icon"></i>
                                                    </span>
                                                </div>
                                            </div>

                                            <div class="nds-card-content">
                                                <div class="nds-card-text">
                                                    <span class="nds-counter-value nds-number-format" data-target="125847">0</span>
                                                    <p class="nds-card-description">Active Users</p>
                                                </div>
                                            </div>
                                        </div>
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

<!-- Card Group Section -->
<section id="cardGroup" class="nds-content-section">
    <div class="nds-section-content-container">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Card Group</h2>
            <p class="nds-section-description">Responsive grid layout for multiple cards</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Card Group Grid</div>
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-shadow", ".nds-card", "cardVariant"]'>
                            <span class="label">Shadow</span>
                        </button>
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                            data-toggler='["nds-stroke", ".nds-card", "cardVariant"]'>
                            <span class="label">Stroke</span>
                        </button>
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["noBg", ".demo-container", "containerBg"]'>
                            <span class="label">Remove bg</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-cards-group" style="--max-col: 4; --min-col: 2;">
                            <div class="nds-card nds-stroke nds-statistic">
                                <div class="nds-card-header">
                                    <div class="nds-card-featured-icon">
                                        <span class="nds-featured-icon nds-brand nds-circle nds-xl">
                                            <i class="hgi hgi-stroke hgi-user-multiple icon"></i>
                                        </span>
                                    </div>
                                </div>
                                <div class="nds-card-content">
                                    <div class="nds-card-text">
                                        <span class="nds-counter-value nds-number-format" data-target="125847">0</span>
                                        <p class="nds-card-description">Active Users</p>
                                    </div>
                                </div>
                            </div>

                            <div class="nds-card nds-stroke nds-statistic">
                                <div class="nds-card-header">
                                    <div class="nds-card-featured-icon">
                                        <span class="nds-featured-icon nds-brand nds-circle nds-xl">
                                            <i class="hgi hgi-stroke hgi-checkmark-circle-02 icon"></i>
                                        </span>
                                    </div>
                                </div>
                                <div class="nds-card-content">
                                    <div class="nds-card-text">
                                        <span class="nds-counter-value nds-number-format" data-target="8542">0</span>
                                        <p class="nds-card-description">Completed Services</p>
                                    </div>
                                </div>
                            </div>

                            <div class="nds-card nds-stroke nds-statistic">
                                <div class="nds-card-header">
                                    <div class="nds-card-featured-icon">
                                        <span class="nds-featured-icon nds-brand nds-circle nds-xl">
                                            <i class="hgi hgi-stroke hgi-star icon"></i>
                                        </span>
                                    </div>
                                </div>
                                <div class="nds-card-content">
                                    <div class="nds-card-text">
                                        <span class="nds-counter-value nds-number-format" data-target="92%">0</span>
                                        <p class="nds-card-description">Success Rate</p>
                                    </div>
                                </div>
                            </div>

                            <div class="nds-card nds-stroke nds-statistic">
                                <div class="nds-card-header">
                                    <div class="nds-card-featured-icon">
                                        <span class="nds-featured-icon nds-brand nds-circle nds-xl">
                                            <i class="hgi hgi-stroke hgi-queue-01 icon"></i>
                                        </span>
                                    </div>
                                </div>
                                <div class="nds-card-content">
                                    <div class="nds-card-text">
                                        <span class="nds-counter-value nds-number-format" data-target="+1247">0</span>
                                        <p class="nds-card-description">Pending Requests</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nds-tabs nds-code withDivider">
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-group-1" id="tab-group-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-group-1"
                            aria-labelledby="tab-group-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <div class="nds-expandable-content">
                                <code class="lang-html code">
                                    <div class="nds-cards-group" style="--max-col: 4; --min-col: 2;">
                                        <div class="nds-card nds-stroke nds-statistic">
                                            <div class="nds-card-header">
                                                <div class="nds-card-featured-icon">
                                                    <span class="nds-featured-icon nds-brand nds-circle nds-xl">
                                                        <i class="hgi hgi-stroke hgi-user-multiple icon"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="nds-card-content">
                                                <div class="nds-card-text">
                                                    <span class="nds-counter-value nds-number-format" data-target="125847">0</span>
                                                    <p class="nds-card-description">Active Users</p>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Additional cards... -->
                                    </div>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="cardsGuidelines" class="nds-content-section">
    <div class="nds-section-content-container">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
            <p class="nds-section-description">Best practices for using card components effectively</p>
        </div>
        <div class="nds-section-content">

            ### When to Use Cards
            - To display content in grid layouts
            - To group related information together
            - To create scannable and interactive interfaces
            - To showcase products or services

            ### Card Structure
            - **Header**: Contains image and featured icon
            - **Content**: Title, description and additional information
            - **Meta**: Tags, ratings and secondary information
            - **Actions**: Buttons and available actions

            ### Accessibility
            - Use proper HTML elements for headings and text
            - Ensure alt text is provided for images
            - Provide keyboard navigation for interactive elements
            - Use ARIA labels for buttons and interactive elements

        </div>
    </div>
</section>