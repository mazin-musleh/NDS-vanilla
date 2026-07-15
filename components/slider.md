---
layout: page
title: Slider
hero_title: Slider - National Design System
hero_description: A range input for selecting a single value or a continuous min–max range from a numeric scale, with proportional sizes and full keyboard control.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.2.0"
updated: "1.3.0"
last_edit: "30/06/2026 - 11:50 PM"
---

<!-- Single Slider -->
<section id="sliderDefault" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Single Slider</h2>
            <p class="nds-section-description">One thumb for selecting a single value along the track. Drag, arrow keys, Home, End, and Page Up/Down all adjust the value</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Small</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-sm", ".nds-slider-container", "sliderSize", "remove:nds-md"]'>
                                            <span class="nds-label">Small</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-md", ".nds-slider-container", "sliderSize", "remove:nds-sm"]'>
                                            <span class="nds-label">Medium</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">State</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-form-container", "sliderState"]'>
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-required", ".nds-form-container", "sliderState", "attr"]'>
                                            <span class="nds-label">Required</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["disabled", ".nds-form-container", "sliderState", "data-state"]'>
                                            <span class="nds-label">Disabled</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["readonly", ".nds-form-container", "sliderState", "data-state"]'>
                                            <span class="nds-label">Readonly</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["data-loading=true", ".nds-slider-container", "sliderLoading", "attr"]'>
                                <span class="nds-label">Loading</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-stacked", ".nds-slider-container", "sliderStacked"]'>
                                <span class="nds-label">Stacked</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-slider-container nds-form-container">
                                <div class="nds-form-header">
                                    <label for="slider-default-1">
                                        <span class="nds-label">Volume</span>
                                        <span class="nds-info">Drag the thumb or use the arrow keys</span>
                                    </label>
                                </div>
                                <div class="nds-form-control">
                                    <div class="nds-slider-track">
                                        <input type="range" id="slider-default-1" class="nds-slider" min="0" max="100" value="50">
                                    </div>
                                    <output for="slider-default-1" class="nds-slider-value">50</output>
                                </div>
                                <div class="nds-form-footer" data-feedback-target>
                                    <span class="nds-feedback nds-outline nds-sm" data-status="neutral" data-permanent>
                                        <span class="nds-feedback-icon">
                                            <i class="nds-icon" aria-hidden="true"></i>
                                        </span>
                                        <span class="nds-feedback-message">Changes apply instantly</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-slider-default-1" id="tab-slider-default-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-slider-default-1"
                                    aria-labelledby="tab-slider-default-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;div class="nds-slider-container nds-form-container"&gt;
  &lt;div class="nds-form-header"&gt;
    &lt;label for="slider-default-1"&gt;
      &lt;span class="nds-label"&gt;Volume&lt;/span&gt;
      &lt;span class="nds-info"&gt;Drag the thumb or use the arrow keys&lt;/span&gt;
    &lt;/label&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-control"&gt;
    &lt;div class="nds-slider-track"&gt;
      &lt;input type="range" id="slider-default-1" class="nds-slider" min="0" max="100" value="50"&gt;
    &lt;/div&gt;
    &lt;output for="slider-default-1" class="nds-slider-value"&gt;50&lt;/output&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-footer" data-feedback-target&gt;
    &lt;span class="nds-feedback nds-outline nds-sm" data-status="neutral" data-permanent&gt;
      &lt;span class="nds-feedback-icon"&gt;
        &lt;i class="nds-icon" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;/span&gt;
      &lt;span class="nds-feedback-message"&gt;Changes apply instantly&lt;/span&gt;
    &lt;/span&gt;
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

<!-- Range Slider -->
<section id="sliderRange" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Range Slider</h2>
            <p class="nds-section-description">Two thumbs for selecting a min and max value. Use when the user picks a continuous span, like a price or date range</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Small</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-sm", ".nds-slider-range", "rangeSize", "remove:nds-md"]'>
                                            <span class="nds-label">Small</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-md", ".nds-slider-range", "rangeSize", "remove:nds-sm"]'>
                                            <span class="nds-label">Medium</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">State</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-form-container", "rangeState"]'>
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-required", ".nds-form-container", "rangeState", "attr"]'>
                                            <span class="nds-label">Required</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["disabled", ".nds-form-container", "rangeState", "data-state"]'>
                                            <span class="nds-label">Disabled</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["readonly", ".nds-form-container", "rangeState", "data-state"]'>
                                            <span class="nds-label">Readonly</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["data-loading=true", ".nds-slider-container", "rangeLoading", "attr"]'>
                                <span class="nds-label">Loading</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-stacked", ".nds-slider-container", "rangeStacked"]'>
                                <span class="nds-label">Stacked</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-slider-container nds-form-container nds-slider-range">
                                <div class="nds-form-header">
                                    <label>
                                        <span class="nds-label">Age range</span>
                                        <span class="nds-info">Tab to either thumb and adjust independently</span>
                                    </label>
                                </div>
                                <div class="nds-form-control">
                                    <output class="nds-slider-value nds-slider-value-min">25</output>
                                    <div class="nds-slider-track">
                                        <input type="range" class="nds-slider nds-slider-min" min="18" max="80" value="25" aria-label="Minimum age">
                                        <input type="range" class="nds-slider nds-slider-max" min="18" max="80" value="55" aria-label="Maximum age">
                                    </div>
                                    <output class="nds-slider-value nds-slider-value-max">55</output>
                                </div>
                                <div class="nds-form-footer" data-feedback-target>
                                    <span class="nds-feedback nds-outline nds-sm" data-status="neutral" data-permanent>
                                        <span class="nds-feedback-icon">
                                            <i class="nds-icon" aria-hidden="true"></i>
                                        </span>
                                        <span class="nds-feedback-message">Whole years only</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-slider-range-1" id="tab-slider-range-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-slider-range-1"
                                    aria-labelledby="tab-slider-range-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;div class="nds-slider-container nds-form-container nds-slider-range"&gt;
  &lt;div class="nds-form-header"&gt;
    &lt;label&gt;
      &lt;span class="nds-label"&gt;Age range&lt;/span&gt;
      &lt;span class="nds-info"&gt;Tab to either thumb and adjust independently&lt;/span&gt;
    &lt;/label&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-control"&gt;
    &lt;output class="nds-slider-value nds-slider-value-min"&gt;25&lt;/output&gt;
    &lt;div class="nds-slider-track"&gt;
      &lt;input type="range" class="nds-slider nds-slider-min" min="18" max="80" value="25" aria-label="Minimum age"&gt;
      &lt;input type="range" class="nds-slider nds-slider-max" min="18" max="80" value="55" aria-label="Maximum age"&gt;
    &lt;/div&gt;
    &lt;output class="nds-slider-value nds-slider-value-max"&gt;55&lt;/output&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-footer" data-feedback-target&gt;
    &lt;span class="nds-feedback nds-outline nds-sm" data-status="neutral" data-permanent&gt;
      &lt;span class="nds-feedback-icon"&gt;
        &lt;i class="nds-icon" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;/span&gt;
      &lt;span class="nds-feedback-message"&gt;Whole years only&lt;/span&gt;
    &lt;/span&gt;
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

<!-- Price Range with SAR Currency -->
<section id="sliderPriceRange" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Price Range with SAR Currency</h2>
            <p class="nds-section-description">Combine a range slider with the <a class="nds-color" href="{{ 'utilities/numbers' | relative_url }}">Numbers</a> utility to show thousand-separated values and the official Saudi Riyal symbol next to each thumb. Add <code class="nds-inline-code lang-html">nds-number-format</code> and <code class="nds-inline-code lang-html">data-currency="SAR"</code> to each output — the slider applies <code class="nds-inline-code lang-js">toLocaleString()</code> automatically on every update and the currency icon is rendered as a CSS pseudo-element.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Small</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-sm", ".nds-slider-container", "priceSize", "remove:nds-md"]'>
                                            <span class="nds-label">Small</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-md", ".nds-slider-container", "priceSize", "remove:nds-sm"]'>
                                            <span class="nds-label">Medium</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">State</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-form-container", "priceState"]'>
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-required", ".nds-form-container", "priceState", "attr"]'>
                                            <span class="nds-label">Required</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["disabled", ".nds-form-container", "priceState", "data-state"]'>
                                            <span class="nds-label">Disabled</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["readonly", ".nds-form-container", "priceState", "data-state"]'>
                                            <span class="nds-label">Readonly</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["data-loading=true", ".nds-slider-container", "priceLoading", "attr"]'>
                                <span class="nds-label">Loading</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn" data-state="selected"
                                data-toggler='["nds-stacked", ".nds-slider-container", "priceStacked"]'>
                                <span class="nds-label">Stacked</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-slider-container nds-form-container nds-slider-range nds-stacked" id="price-range-1">
                                <div class="nds-form-header">
                                    <label>
                                        <span class="nds-label">Budget</span>
                                        <span class="nds-info">Drag either thumb to set the minimum and maximum spend</span>
                                    </label>
                                </div>
                                <div class="nds-form-control">
                                    <output class="nds-slider-value nds-slider-value-min nds-number-format" data-currency="SAR">5000</output>
                                    <div class="nds-slider-track">
                                        <input type="range" class="nds-slider nds-slider-min" min="0" max="100000" step="500" value="5000" aria-label="Minimum price">
                                        <input type="range" class="nds-slider nds-slider-max" min="0" max="100000" step="500" value="65000" aria-label="Maximum price">
                                    </div>
                                    <output class="nds-slider-value nds-slider-value-max nds-number-format" data-currency="SAR">65000</output>
                                </div>
                                <div class="nds-form-footer" data-feedback-target>
                                    <span class="nds-feedback nds-outline nds-sm" data-status="neutral" data-permanent>
                                        <span class="nds-feedback-icon">
                                            <i class="nds-icon" aria-hidden="true"></i>
                                        </span>
                                        <span class="nds-feedback-message">Prices include VAT</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-slider-price-1" id="tab-slider-price-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-slider-price-1"
                                    aria-labelledby="tab-slider-price-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;div class="nds-slider-container nds-form-container nds-slider-range nds-stacked" id="price-range-1"&gt;
  &lt;div class="nds-form-header"&gt;
    &lt;label&gt;
      &lt;span class="nds-label"&gt;Budget&lt;/span&gt;
      &lt;span class="nds-info"&gt;Drag either thumb to set the minimum and maximum spend&lt;/span&gt;
    &lt;/label&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-control"&gt;
    &lt;output class="nds-slider-value nds-slider-value-min nds-number-format" data-currency="SAR"&gt;5000&lt;/output&gt;
    &lt;div class="nds-slider-track"&gt;
      &lt;input type="range" class="nds-slider nds-slider-min" min="0" max="100000" step="500" value="5000" aria-label="Minimum price"&gt;
      &lt;input type="range" class="nds-slider nds-slider-max" min="0" max="100000" step="500" value="65000" aria-label="Maximum price"&gt;
    &lt;/div&gt;
    &lt;output class="nds-slider-value nds-slider-value-max nds-number-format" data-currency="SAR"&gt;65000&lt;/output&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-footer" data-feedback-target&gt;
    &lt;span class="nds-feedback nds-outline nds-sm" data-status="neutral" data-permanent&gt;
      &lt;span class="nds-feedback-icon"&gt;
        &lt;i class="nds-icon" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;/span&gt;
      &lt;span class="nds-feedback-message"&gt;Prices include VAT&lt;/span&gt;
    &lt;/span&gt;
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

<!-- Built-in Features -->
<section id="sliderFeatures" class="nds-content-section nds-demo-section">
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
                    <p class="nds-item-desc">Activates when <code class="nds-inline-code lang-html">.nds-slider-container</code> appears on the page. A single delegated listener handles every slider, including those added later through DOM updates.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-circle-arrow-horizontal"></i>
                        <span class="nds-label">Single and Range Modes</span>
                    </span>
                    <p class="nds-item-desc">One markup pattern for picking a value, a second for picking a min–max span. Add <code class="nds-inline-code lang-html">nds-slider-range</code> to switch from single to dual thumbs.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-keyboard"></i>
                        <span class="nds-label">Keyboard Control</span>
                    </span>
                    <p class="nds-item-desc">Arrow keys step the value, Home and End jump to min and max, Page Up and Page Down move by larger increments. The focused thumb gets a visible bullseye ring on keyboard focus only.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-text-align-right"></i>
                        <span class="nds-label">RTL-aware Fill</span>
                    </span>
                    <p class="nds-item-desc">The fill direction flips with the page direction: in Arabic the bar fills from the right toward the thumb, in English from the left. Thumb position, fill window, and value display all align without extra markup.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-loading-03"></i>
                        <span class="nds-label">Skeleton State</span>
                    </span>
                    <p class="nds-item-desc">The track paints as a shimmer placeholder until init lands and during any <code class="nds-inline-code lang-html">data-loading</code> period, so a value pulled from an async source does not flash an incorrect fill.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-api"></i>
                        <span class="nds-label">Programmatic Control</span>
                    </span>
                    <p class="nds-item-desc">Reinit, destroy, and create methods on <code class="nds-inline-code lang-js">NDS.Slider</code> let you wire sliders inside dynamically added containers without a full page rescan.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="sliderGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use a <strong>single slider</strong> when the user picks one value from a continuous numeric range where the exact number is less important than the approximate position (volume, brightness, zoom, opacity)</li>
                    <li>Use a <strong>range slider</strong> when the user filters a list or report by a min–max window (price range, age range, date range)</li>
                    <li>Do not use a slider when the user needs an exact integer or when the valid set is short (under ten options). Use a <a class="nds-color" href="{{ 'components/forms' | relative_url }}">Number Input</a> for precise integers or a <a class="nds-color" href="{{ 'components/radio' | relative_url }}">Radio Button</a> group for a small discrete set</li>
                    <li>Do not use a slider for binary on/off settings. Use a <a class="nds-color" href="{{ 'components/switch' | relative_url }}">Switch</a> instead</li>
                    <li>Pair the slider with a visible value display so users can confirm the exact number. The <code class="nds-inline-code lang-html">&lt;output&gt;</code> element next to the input updates automatically as the thumb moves</li>
                    <li>Choose <code class="nds-inline-code lang-html">nds-md</code> on touch-first surfaces where a 12 px thumb is hard to grab. The default 12 px reads cleanly on desktop and inside dense forms</li>
                    <li>Set a meaningful <code class="nds-inline-code lang-html">step</code> attribute when the underlying value should snap (whole hours, increments of five). Without it, the input snaps to integer steps</li>
                    <li>Add the <code class="nds-inline-code lang-html">data-loading</code> attribute on the container while fetching bounds or an initial value from a remote source, so the skeleton holds the space and no incorrect fill flashes when the response lands</li>
                    <li>Always provide an accessible name. A standard label is enough; for a range slider, add <code class="nds-inline-code lang-html">aria-label</code> to each input ("Minimum" and "Maximum") so screen readers can distinguish them</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Class</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">nds-md</code></td><td>Medium size on <code class="nds-inline-code lang-html">.nds-slider-container</code>: 16 px thumb and 8 px bar. Default is 12 px thumb and 4 px bar</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-slider-range</code></td><td>Switches the container from single to dual-thumb mode. Requires the range markup with <code class="nds-inline-code lang-html">.nds-slider-track</code>, two inputs (<code class="nds-inline-code lang-html">.nds-slider-min</code>, <code class="nds-inline-code lang-html">.nds-slider-max</code>), and two value outputs</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-stacked</code></td><td>Moves the value output(s) to a row above the bar so the bar spans the full width. Use for wide or formatted values (currency, large numbers) where the default beside-the-bar layout would crush the bar on narrow screens/containers</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-loading</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-slider-container</code> to force the skeleton state during an async value update. Remove when the new value is ready</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">min</code>, <code class="nds-inline-code lang-html">max</code>, <code class="nds-inline-code lang-html">step</code>, <code class="nds-inline-code lang-html">value</code></td><td>Native <code class="nds-inline-code lang-html">&lt;input type="range"&gt;</code> attributes that control the numeric range, step granularity, and starting value. The component reads <code class="nds-inline-code lang-html">value</code> on init to paint the initial fill</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--slider-track-bg</code></td><td><code class="nds-inline-code lang-html">--colors-neutral-100</code> (dark: <code class="nds-inline-code lang-html">--colors-neutral-800</code>)</td><td>Background color of the unfilled portion of the track</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--slider-track-fill</code></td><td><code class="nds-inline-code lang-html">--background-primary</code></td><td>Color of the filled portion of the track</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--slider-thumb-bg</code></td><td><code class="nds-inline-code lang-html">--background-primary</code></td><td>Background color of the thumb at rest</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--slider-thumb-bg-hovered</code></td><td><code class="nds-inline-code lang-html">--controls-primary-hovered</code></td><td>Background color of the thumb on hover and focus</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--slider-fill-start</code>, <code class="nds-inline-code lang-html">--slider-fill-end</code></td><td><code class="nds-inline-code lang-html">0%</code>, <code class="nds-inline-code lang-html">100%</code></td><td>Track bar fill endpoints, set on <code class="nds-inline-code lang-html">.nds-slider-track</code> by the component on every input event. Single mode sets only <code class="nds-inline-code lang-html">--slider-fill-end</code> (start stays 0%); range sets both. Consumers should not set these directly</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDS.Slider</strong> API initializes sliders, repaints the fill after value changes, and tears down state. Auto-initialization activates on page load; call <strong>NDS.Slider.reinit()</strong> after dynamically inserting a slider or after writing to <code class="nds-inline-code lang-js">input.value</code> from script.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// ── Initialize all sliders on the page ───────────────
// Called automatically on DOM ready by the loader.
// Idempotent: re-entry is a no-op.
NDS.Slider.init();

// ── Repaint a single container or every container ────
// Use after writing to input.value from script, or after
// inserting a slider into the DOM.
NDS.Slider.reinit(document.querySelector('#mySlider'));
NDS.Slider.reinit();

// ── Initialize one container imperatively ────────────
// Equivalent to reinit for a single element; returns the element.
const slider = NDS.Slider.create(document.querySelector('#mySlider'));

// ── Tear down init state ─────────────────────────────
// Removes the init sentinel so a subsequent reinit re-runs
// initial paint. The shared input listener stays bound for
// the page lifetime.
NDS.Slider.destroy(document.querySelector('#mySlider'));
NDS.Slider.destroy();

// ── Reading and writing the value ────────────────────
// The native input is the source of truth. After writing,
// dispatch an 'input' event OR call reinit to repaint the fill.
const input = document.querySelector('#mySlider .nds-slider');
input.value = 75;
input.dispatchEvent(new Event('input', { bubbles: true }));

// ── Range mode ───────────────────────────────────────
// Read both endpoints from the two inputs.
const container = document.querySelector('.nds-slider-range');
const min = +container.querySelector('.nds-slider-min').value;
const max = +container.querySelector('.nds-slider-max').value;
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
