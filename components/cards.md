---
layout: page
title: Cards
hero_title: Card Components - National Design System
hero_description: Card components for displaying content with featured icons, tags, ratings, buttons, and checkboxes
breadcrumb: ["Components", "Cards"]
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
                                                <input type="checkbox" id="card-select" name="cardSelection"
                                                    value="card1" class="nds-check">
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Featured Icon -->
                                    <div class="nds-card-featured-icon">
                                        <span class="nds-featured-icon nds-brand nds-circle nds-lg">
                                            <i class="hgi hgi-stroke hgi-shopping-cart-02"></i>
                                        </span>
                                    </div>
                                </div>

                                <div class="nds-card-content" style="--max-height:200px">
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
                                    </div>
                                    <div class="nds-card-actions">
                                        <button class="nds-btn nds-secondary-outline nds-lg nds-trail-icon">
                                            <i class="hgi hgi-stroke hgi-link-square-02 icon"></i>
                                            <span class="label">Details</span>
                                        </button>
                                    </div>
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
&lt;div class="nds-card"&gt;
  &lt;!-- Checkbox for selection --&gt;
  &lt;div class="nds-card-checkbox"&gt;
    &lt;div class="nds-form-container nds-check-container"&gt;
      &lt;div class="nds-form-control"&gt;
        &lt;input type="checkbox" id="card-select" name="cardSelection" value="card1" class="nds-check"&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;

  &lt;div class="nds-card-header"&gt;
    &lt;!-- Featured Icon --&gt;
    &lt;div class="nds-card-featured-icon"&gt;
      &lt;span class="nds-featured-icon nds-success nds-md"&gt;
        &lt;i class="hgi hgi-stroke hgi-check-circle"&gt;&lt;/i&gt;
      &lt;/span&gt;
    &lt;/div&gt;

    &lt;!-- Card Image --&gt;
    &lt;div class="nds-card-image"&gt;
      &lt;img src="{{ '/assets/img/riyadhcenter.webp' | relative_url }}" alt="Technology Product"&gt;
    &lt;/div&gt;
  &lt;/div&gt;

  &lt;div class="nds-card-content"&gt;
    &lt;h3 class="nds-card-title"&gt;Advanced Technology Product&lt;/h3&gt;
    &lt;p class="nds-card-description"&gt;Modern technology product that provides advanced solutions for companies and institutions.&lt;/p&gt;

    &lt;div class="nds-card-meta"&gt;
      &lt;!-- Tags --&gt;
      &lt;div class="nds-card-tags"&gt;
        &lt;span class="nds-tag nds-primary nds-md"&gt;
          &lt;span class="label"&gt;Technology&lt;/span&gt;
        &lt;/span&gt;
        &lt;span class="nds-tag nds-neutral nds-md"&gt;
          &lt;span class="label"&gt;New&lt;/span&gt;
        &lt;/span&gt;
        &lt;span class="nds-tag nds-success nds-md"&gt;
          &lt;span class="label"&gt;Updated&lt;/span&gt;
        &lt;/span&gt;
      &lt;/div&gt;

      &lt;!-- Rating using existing NDS rating component --&gt;
      &lt;div class="nds-card-rating"&gt;
        &lt;div class="nds-rating nds-md" data-rating="4.5"&gt;
          &lt;span class="nds-rating-star"&gt;&lt;/span&gt;
          &lt;span class="nds-rating-star"&gt;&lt;/span&gt;
          &lt;span class="nds-rating-star"&gt;&lt;/span&gt;
          &lt;span class="nds-rating-star"&gt;&lt;/span&gt;
          &lt;span class="nds-rating-star"&gt;&lt;/span&gt;
        &lt;/div&gt;
        &lt;span class="nds-card-rating-text"&gt;(12 reviews)&lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;

  &lt;div class="nds-card-actions"&gt;
    &lt;button class="nds-btn nds-secondary-outline nds-lg"&gt;
      &lt;i class="hgi hgi-stroke hgi-heart"&gt;&lt;/i&gt;
      &lt;span class="label"&gt;Save&lt;/span&gt;
    &lt;/button&gt;
    &lt;button class="nds-btn nds-primary nds-lg"&gt;
      &lt;i class="hgi hgi-stroke hgi-shopping-cart-01"&gt;&lt;/i&gt;
      &lt;span class="label"&gt;Buy Now&lt;/span&gt;
    &lt;/button&gt;
  &lt;/div&gt;
&lt;/div&gt;
                </code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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
                            <div class="nds-card nds-stroke nds-expandable">
                                <div class="nds-card-header">
                                    <!-- Checkbox for selection -->
                                    <div class="nds-card-checkbox">
                                        <div class="nds-form-container nds-check-container">
                                            <div class="nds-form-control">
                                                <input type="checkbox" id="card-select" name="cardSelection"
                                                    value="card1" class="nds-check">
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Card Image -->
                                    <div class="nds-card-image">
                                        <img src="{{ '/assets/img/riyadhcenter.webp' | relative_url }}"
                                            alt="Technology Product">
                                    </div>
                                </div>

                                <div class="nds-card-content nds-expandable-content" style="--max-height:200px">
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
&lt;div class="nds-card"&gt;
  &lt;!-- Checkbox for selection --&gt;
  &lt;div class="nds-card-checkbox"&gt;
    &lt;div class="nds-form-container nds-check-container"&gt;
      &lt;div class="nds-form-control"&gt;
        &lt;input type="checkbox" id="card-select" name="cardSelection" value="card1" class="nds-check"&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;

  &lt;div class="nds-card-header"&gt;
    &lt;!-- Featured Icon --&gt;
    &lt;div class="nds-card-featured-icon"&gt;
      &lt;span class="nds-featured-icon nds-success nds-md"&gt;
        &lt;i class="hgi hgi-stroke hgi-check-circle"&gt;&lt;/i&gt;
      &lt;/span&gt;
    &lt;/div&gt;

    &lt;!-- Card Image --&gt;
    &lt;div class="nds-card-image"&gt;
      &lt;img src="{{ '/assets/img/riyadhcenter.webp' | relative_url }}" alt="Technology Product"&gt;
    &lt;/div&gt;
  &lt;/div&gt;

  &lt;div class="nds-card-content"&gt;
    &lt;h3 class="nds-card-title"&gt;Advanced Technology Product&lt;/h3&gt;
    &lt;p class="nds-card-description"&gt;Modern technology product that provides advanced solutions for companies and institutions.&lt;/p&gt;

    &lt;div class="nds-card-meta"&gt;
      &lt;!-- Tags --&gt;
      &lt;div class="nds-card-tags"&gt;
        &lt;span class="nds-tag nds-primary nds-md"&gt;
          &lt;span class="label"&gt;Technology&lt;/span&gt;
        &lt;/span&gt;
        &lt;span class="nds-tag nds-neutral nds-md"&gt;
          &lt;span class="label"&gt;New&lt;/span&gt;
        &lt;/span&gt;
        &lt;span class="nds-tag nds-success nds-md"&gt;
          &lt;span class="label"&gt;Updated&lt;/span&gt;
        &lt;/span&gt;
      &lt;/div&gt;

      &lt;!-- Rating using existing NDS rating component --&gt;
      &lt;div class="nds-card-rating"&gt;
        &lt;div class="nds-rating nds-md" data-rating="4.5"&gt;
          &lt;span class="nds-rating-star"&gt;&lt;/span&gt;
          &lt;span class="nds-rating-star"&gt;&lt;/span&gt;
          &lt;span class="nds-rating-star"&gt;&lt;/span&gt;
          &lt;span class="nds-rating-star"&gt;&lt;/span&gt;
          &lt;span class="nds-rating-star"&gt;&lt;/span&gt;
        &lt;/div&gt;
        &lt;span class="nds-card-rating-text"&gt;(12 reviews)&lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;

  &lt;div class="nds-card-actions"&gt;
    &lt;button class="nds-btn nds-secondary-outline nds-lg"&gt;
      &lt;i class="hgi hgi-stroke hgi-heart"&gt;&lt;/i&gt;
      &lt;span class="label"&gt;Save&lt;/span&gt;
    &lt;/button&gt;
    &lt;button class="nds-btn nds-primary nds-lg"&gt;
      &lt;i class="hgi hgi-stroke hgi-shopping-cart-01"&gt;&lt;/i&gt;
      &lt;span class="label"&gt;Buy Now&lt;/span&gt;
    &lt;/button&gt;
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