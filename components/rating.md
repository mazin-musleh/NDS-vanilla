---
layout: page
title: Rating
hero_title: Rating Components - National Design System
hero_description: Star rating components with multiple states and styles based on Figma specifications
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Rating Types Overview -->
<section id="ratingTypesOverview" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Rating Component</h2>
            <p class="nds-section-description">Star rating components with different sizes, states, and styles</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <!-- Display-Only Rating Demo -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Display Rating</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-brand", ".nds-rating", "ratingStyle"]'>
                                <span class="label">Brand</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-xs", ".nds-rating", "ratingSize"]'>
                                <span class="label">XS</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-sm", ".nds-rating", "ratingSize"]'>
                                <span class="label">SM</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-md", ".nds-rating", "ratingSize"]'>
                                <span class="label">MD</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-lg", ".nds-rating", "ratingSize"]'>
                                <span class="label">LG</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
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
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-rating-display" id="tab-rating-display">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                id="panel-rating-display" aria-labelledby="tab-rating-display">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <div class="nds-expandable-content">
                                    <code class="lang-html code">
<div class="nds-rating nds-md" data-rating="3.5">
  <span class="nds-rating-star"></span>
  <span class="nds-rating-star"></span>
  <span class="nds-rating-star"></span>
  <span class="nds-rating-star"></span>
  <span class="nds-rating-star"></span>
</div>
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

                <!-- Interactive Rating Demo -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Interactive Rating</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-brand", ".nds-rating", "ratingStyle"]'>
                                <span class="label">Brand</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-xs", ".nds-rating", "ratingSize"]'>
                                <span class="label">XS</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-sm", ".nds-rating", "ratingSize"]'>
                                <span class="label">SM</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-md", ".nds-rating", "ratingSize"]'>
                                <span class="label">MD</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-lg", ".nds-rating", "ratingSize"]'>
                                <span class="label">LG</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle" data-rating-disable>
                                <span class="label">Disable</span>
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
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-rating-interactive" id="tab-rating-interactive">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                id="panel-rating-interactive" aria-labelledby="tab-rating-interactive">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <div class="nds-expandable-content">
                                    <code class="lang-html code">
<div class="nds-rating nds-md" data-rating="0">
  <button class="nds-rating-star" type="button" aria-label="1 star"></button>
  <button class="nds-rating-star" type="button" aria-label="2 stars"></button>
  <button class="nds-rating-star" type="button" aria-label="3 stars"></button>
  <button class="nds-rating-star" type="button" aria-label="4 stars"></button>
  <button class="nds-rating-star" type="button" aria-label="5 stars"></button>
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
    </div>
</section>

<!-- Usage Guidelines -->
<section id="usageGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
            <p class="nds-section-description">Best practices for using rating components</p>
        </div>
        <div class="nds-section-content">
                <div class="nds-content-block">
                    <h3 class="nds-block-title">When to Use</h3>
                    <ul>
                        <li>User feedback and review systems</li>
                        <li>Quality indicators for products or services</li>
                        <li>Performance metrics display</li>
                        <li>User satisfaction surveys</li>
                        <li>Content evaluation interfaces</li>
                    </ul>
                </div>
                <div class="nds-content-block">
                    <h3 class="nds-block-title">Star States</h3>
                    <ul>
                        <li><strong>Normal:</strong> Default empty state (no additional class)</li>
                        <li><strong>Selected:</strong> Add selected class for filled stars</li>
                        <li><strong>Half:</strong> Add half class for partial ratings</li>
                        <li><strong>Pressed:</strong> Add pressed class for interaction feedback</li>
                    </ul>
                </div>
                <div class="nds-content-block">
                    <h3 class="nds-block-title">Decimal Rating Display</h3>
                    <ul>
                        <li><strong>Whole numbers:</strong> 1, 2, 3, 4, 5 show exact number of filled stars</li>
                        <li><strong>Half stars:</strong> Displayed when decimal part is 0.3 or higher</li>
                        <li><strong>Examples:</strong></li>
                        <li>• 3.2 → 3 stars (decimal < 0.3)</li>
                        <li>• 3.3 → 3.5 stars (decimal ≥ 0.3)</li>
                        <li>• 1.8 → 1.5 stars (decimal ≥ 0.3)</li>
                        <li>• 4.1 → 4 stars (decimal < 0.3)</li>
                        <li><strong>Threshold:</strong> 0.3+ shows half star, below 0.3 rounds down</li>
                    </ul>
                </div>
                <div class="nds-content-block">
                    <h3 class="nds-block-title">Size Options</h3>
                    <ul>
                        <li><strong>Small (24px):</strong> Use nds-sm for compact interfaces</li>
                        <li><strong>Medium (32px):</strong> Use nds-md for standard displays (default)</li>
                        <li><strong>Large (48px):</strong> Use nds-lg for emphasis and touch interfaces
                        </li>
                        <li>Mobile responsiveness automatically adjusts large ratings to 40px</li>
                    </ul>
                </div>
                <div class="nds-content-block">
                    <h3 class="nds-block-title">Style Variants</h3>
                    <ul>
                        <li><strong>Default:</strong> Golden yellow (#dba102) for general rating displays</li>
                        <li><strong>Brand:</strong> Add nds-brand class for Saudi flag green variant</li>
                        <li>Default style provides familiar rating experience</li>
                        <li>Brand style aligns with government/official contexts</li>
                    </ul>
                </div>
                <div class="nds-content-block">
                    <h3 class="nds-block-title">Interactive Ratings</h3>
                    <ul>
                        <li>Use <code>&lt;button&gt;</code> elements for interactive stars (auto-detected by JS)</li>
                        <li>Hover preview shows rating before selection</li>
                        <li>Includes scale effects and focus indicators</li>
                        <li>Full keyboard navigation (arrows, enter, space, home, end)</li>
                        <li>Dispatches ratingChange events when value changes</li>
                    </ul>
                </div>
                <div class="nds-content-block">
                    <h3 class="nds-block-title">JavaScript Integration</h3>
                    <ul>
                        <li><strong>Auto-initialization:</strong> Components initialize automatically</li>
                        <li><strong>Event handling:</strong>
                            element.addEventListener('ratingChange', callback)
                        </li>
                        <li><strong>Get value:</strong> element.ndsRating.getRating()</li>
                        <li><strong>Set value:</strong> element.ndsRating.setValue(3)</li>
                        <li><strong>Disable/Enable:</strong> element.ndsRating.setDisabled(true)</li>
                        <li>Works with dynamically added content</li>
                    </ul>

                    <h4>Code Example:</h4>
                    <div class="nds-code nds-expandable">
                        <div class="nds-code-action">
                            <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <div class="nds-expandable-content">
                            <code class="lang-javascript">
// Listen for rating change events
document.addEventListener('ratingChange', (e) => {
    console.log('Rating changed to:', e.detail.rating);
    console.log('Rating element:', e.detail.element);
});

// Get rating value programmatically
const ratingElement = document.querySelector('.nds-rating[data-state~="interactive"]');
const currentRating = ratingElement.ndsRating.getRating();

// Set rating value programmatically
ratingElement.ndsRating.setValue(4);

// Disable rating
ratingElement.ndsRating.setDisabled(true);

// Enable rating
ratingElement.ndsRating.setDisabled(false);

// Toggle disable state
const isDisabled = Math.random() > 0.5;
ratingElement.ndsRating.setDisabled(isDisabled);
                        </code>
                        </div>
                    </div>
                </div>
                <div class="nds-content-block">
                    <h3 class="nds-block-title">Implementation Best Practices</h3>
                    <ul>
                        <li>Stars are created using pure CSS with Figma-accurate SVG shape</li>
                        <li>Use consistent star counts across your application (typically 5)</li>
                        <li>Display-only ratings use data-rating attribute</li>
                        <li>Interactive ratings start with data-rating="0"</li>
                        <li>Test ratings on different background colors</li>
                        <li>Ensure proper contrast ratios for accessibility</li>
                        <li>Component works seamlessly in RTL layouts</li>
                    </ul>
                </div>
        </div>
    </div>
</section>