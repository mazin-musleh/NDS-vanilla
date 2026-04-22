---
layout: page
title: Progress
hero_title: Progress - National Design System
hero_description: Circular and linear indicators for visualizing completion rates, upload status, and task progress across dashboards, forms, and workflows
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Progress Circle -->
<section id="progressCircle" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Progress Circle</h2>
            <p class="nds-section-description">Circular indicator that scales from compact inline counters to large hero displays</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">LG</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["", ".nds-progress-circle", "progressSize"]'>
                                            <span class="nds-label">SM</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-md", ".nds-progress-circle", "progressSize"]'>
                                            <span class="nds-label">MD</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-lg", ".nds-progress-circle", "progressSize"]'>
                                            <span class="nds-label">LG</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-xl", ".nds-progress-circle", "progressSize"]'>
                                            <span class="nds-label">XL</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-2xl", ".nds-progress-circle", "progressSize"]'>
                                            <span class="nds-label">2XL</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Default</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-progress-circle", "progressVariant"]'>
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-neutral", ".nds-progress-circle", "progressVariant"]'>
                                            <span class="nds-label">Neutral</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-status=success", ".nds-progress-circle", "progressVariant", "attr"]'>
                                            <span class="nds-label">Success</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-status=error", ".nds-progress-circle", "progressVariant", "attr"]'>
                                            <span class="nds-label">Error</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
<button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-progress-circle nds-lg" data-value="75">
                                <svg width="120" height="120" viewBox="0 0 24 24">
                                    <circle class="nds-progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="2" />
                                    <circle class="nds-progress-track" cx="12" cy="12" r="10" fill="none" stroke-width="2"
                                        stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round" />
                                </svg>
                                <div class="nds-progress-info">
                                    <span class="nds-feedback nds-sm">
                                        <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
                                    </span>
                                    <span class="nds-progress-percentage">
                                        <span class="nds-progress-number"></span>
                                        <span class="nds-progress-symbol">%</span>
                                    </span>
                                    <span class="nds-progress-text">Active users</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-progress-circle-1" id="tab-progress-circle-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-progress-circle-1"
                                    aria-labelledby="tab-progress-circle-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;div class="nds-progress-circle nds-lg" data-value="75"&gt;
  &lt;svg width="120" height="120" viewBox="0 0 24 24"&gt;
    &lt;circle class="nds-progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="2" /&gt;
    &lt;circle class="nds-progress-track" cx="12" cy="12" r="10" fill="none" stroke-width="2"
      stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round" /&gt;
  &lt;/svg&gt;
  &lt;div class="nds-progress-info"&gt;
    &lt;span class="nds-feedback nds-sm"&gt;
      &lt;span class="nds-feedback-icon"&gt;&lt;i class="nds-icon" aria-hidden="true"&gt;&lt;/i&gt;&lt;/span&gt;
    &lt;/span&gt;
    &lt;span class="nds-progress-percentage"&gt;
      &lt;span class="nds-progress-number"&gt;&lt;/span&gt;
      &lt;span class="nds-progress-symbol"&gt;%&lt;/span&gt;
    &lt;/span&gt;
    &lt;span class="nds-progress-text"&gt;Active users&lt;/span&gt;
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

<!-- Progress Circle — Out of -->
<section id="progressOutOf" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Progress Circle — Out of</h2>
            <p class="nds-section-description">Displays a value as a fraction (e.g. 3.75/5) instead of a percentage, ideal for GPA, ratings, and score displays</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">LG</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["", ".nds-progress-circle", "progressOutOfSize"]'>
                                            <span class="nds-label">SM</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-md", ".nds-progress-circle", "progressOutOfSize"]'>
                                            <span class="nds-label">MD</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-lg", ".nds-progress-circle", "progressOutOfSize"]'>
                                            <span class="nds-label">LG</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-xl", ".nds-progress-circle", "progressOutOfSize"]'>
                                            <span class="nds-label">XL</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-2xl", ".nds-progress-circle", "progressOutOfSize"]'>
                                            <span class="nds-label">2XL</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Default</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-progress-circle", "progressOutOfVariant"]'>
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-neutral", ".nds-progress-circle", "progressOutOfVariant"]'>
                                            <span class="nds-label">Neutral</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-status=success", ".nds-progress-circle", "progressOutOfVariant", "attr"]'>
                                            <span class="nds-label">Success</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-status=error", ".nds-progress-circle", "progressOutOfVariant", "attr"]'>
                                            <span class="nds-label">Error</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-progress-circle nds-lg" data-num="3.75" data-max="5">
                                <svg width="120" height="120" viewBox="0 0 24 24">
                                    <circle class="nds-progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="2" />
                                    <circle class="nds-progress-track" cx="12" cy="12" r="10" fill="none" stroke-width="2"
                                        stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round" />
                                </svg>
                                <div class="nds-progress-info">
                                    <span class="nds-progress-out-of">
                                        <span class="nds-progress-number"></span>
                                        <span class="nds-progress-of"></span>
                                    </span>
                                    <span class="nds-progress-text">SGPA</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-progress-outof-1" id="tab-progress-outof-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-progress-outof-1"
                                    aria-labelledby="tab-progress-outof-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;div class="nds-progress-circle nds-lg" data-num="3.75" data-max="5"&gt;
  &lt;svg width="120" height="120" viewBox="0 0 24 24"&gt;
    &lt;circle class="nds-progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="2" /&gt;
    &lt;circle class="nds-progress-track" cx="12" cy="12" r="10" fill="none" stroke-width="2"
      stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round" /&gt;
  &lt;/svg&gt;
  &lt;div class="nds-progress-info"&gt;
    &lt;span class="nds-progress-out-of"&gt;
      &lt;span class="nds-progress-number"&gt;&lt;/span&gt;
      &lt;span class="nds-progress-of"&gt;&lt;/span&gt;
    &lt;/span&gt;
    &lt;span class="nds-progress-text"&gt;SGPA&lt;/span&gt;
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

<!-- Progress Bar -->
<section id="progressBar" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Progress Line</h2>
            <p class="nds-section-description">Linear indicator with label, fill percentage, and feedback message for file uploads, form completion, and multi-step workflows</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">LG</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-progress-bar", "progressBarSize"]'>
                                            <span class="nds-label">SM</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-md", ".nds-progress-bar", "progressBarSize"]'>
                                            <span class="nds-label">MD</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-lg", ".nds-progress-bar", "progressBarSize"]'>
                                            <span class="nds-label">LG</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Default</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-progress-bar", "progressBarVariant"]'>
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-neutral", ".nds-progress-bar", "progressBarVariant"]'>
                                            <span class="nds-label">Neutral</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-status=success", ".nds-progress-bar", "progressBarVariant", "attr"]'>
                                            <span class="nds-label">Success</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-status=error", ".nds-progress-bar", "progressBarVariant", "attr"]'>
                                            <span class="nds-label">Error</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-progress-bar nds-lg" data-value="65">
                                <span class="nds-progress-label">Uploading document.pdf</span>
                                <div class="nds-progress-track">
                                    <div class="nds-progress-fill"></div>
                                </div>
                                <span class="nds-feedback nds-sm">
                                    <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
                                    <span class="nds-feedback-message">Processing your file...</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-progress-bar-1" id="tab-progress-bar-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-progress-bar-1"
                                    aria-labelledby="tab-progress-bar-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;div class="nds-progress-bar nds-lg" data-value="65"&gt;
  &lt;span class="nds-progress-label"&gt;Uploading document.pdf&lt;/span&gt;
  &lt;div class="nds-progress-track"&gt;
    &lt;div class="nds-progress-fill"&gt;&lt;/div&gt;
  &lt;/div&gt;
  &lt;span class="nds-feedback nds-sm"&gt;
    &lt;span class="nds-feedback-icon"&gt;&lt;i class="nds-icon" aria-hidden="true"&gt;&lt;/i&gt;&lt;/span&gt;
    &lt;span class="nds-feedback-message"&gt;Processing your file...&lt;/span&gt;
  &lt;/span&gt;
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
<section id="progressFeatures" class="nds-content-section nds-demo-section">
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
                    <p class="nds-item-desc">Reads <code class="nds-inline-code lang-html">data-value</code>, <code class="nds-inline-code lang-html">data-num</code>, and <code class="nds-inline-code lang-html">data-max</code> on page load and sets CSS custom properties automatically.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-percent-circle"></i>
                        <span class="nds-label">Data-Driven Values</span>
                    </span>
                    <p class="nds-item-desc">Set <code class="nds-inline-code lang-html">data-value</code> on any circle or bar and the fill, percentage text, and CSS properties update reactively through a shared attribute observer.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-divide-sign-circle"></i>
                        <span class="nds-label">Out-of Display</span>
                    </span>
                    <p class="nds-item-desc">Show values as fractions like 3.75/5 using <code class="nds-inline-code lang-html">data-num</code> and <code class="nds-inline-code lang-html">data-max</code>. The progress fill auto-calculates from the ratio.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-resize-01"></i>
                        <span class="nds-label">Scalable Sizes</span>
                    </span>
                    <p class="nds-item-desc">Five circle sizes from compact inline counters to large hero displays, plus three bar heights, with text and icons that scale proportionally.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-colors"></i>
                        <span class="nds-label">Status Feedback</span>
                    </span>
                    <p class="nds-item-desc">Success and error statuses swap the percentage for a feedback icon and apply the matching color automatically.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-chart-bar-line"></i>
                        <span class="nds-label">Inline Bar Percentage</span>
                    </span>
                    <p class="nds-item-desc">The large progress bar displays the current percentage inside the fill track, keeping the value visible without extra labels.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-motion-02"></i>
                        <span class="nds-label">Smooth Transitions</span>
                    </span>
                    <p class="nds-item-desc">Both circle and bar fills animate smoothly when the progress value changes, giving users clear visual feedback during updates.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-api"></i>
                        <span class="nds-label">Programmatic Control</span>
                    </span>
                    <p class="nds-item-desc">Update values at runtime with <code class="nds-inline-code lang-js">NDS.Progress.setValue()</code> and <code class="nds-inline-code lang-js">NDS.Progress.setOutOf()</code>. Changes propagate through the attribute observer automatically.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="progressGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use <strong>progress circles</strong> for KPI displays, dashboard stats, and completion summaries where the value itself is the focus</li>
                    <li>Use <strong>progress bars</strong> for file uploads, form completion, and any operation where the user is waiting for a process to finish</li>
                    <li>Use the <strong>out-of display</strong> (<code class="nds-inline-code lang-html">data-num</code> + <code class="nds-inline-code lang-html">data-max</code>) for GPA, ratings, or scores where showing the fraction is more meaningful than a percentage</li>
                    <li>Choose the <strong>large bar</strong> (<code class="nds-inline-code lang-html">nds-lg</code>) when you want the percentage visible inside the track without additional labels</li>
                    <li>Use <strong>small or medium bars</strong> when the progress indicator sits alongside other content and should not dominate the layout</li>
                    <li>Prefer <code class="nds-inline-code lang-html">data-value</code> over inline <code class="nds-inline-code lang-html">style="--progress-value"</code> for setting progress. Data attributes enable reactive updates and work with the JS API</li>
                    <li>Set <code class="nds-inline-code lang-html">data-status="success"</code> only when the operation completes. The value automatically locks to 100% and shows a feedback icon</li>
                    <li>Add a <code class="nds-inline-code lang-html">.nds-progress-label</code> and <code class="nds-inline-code lang-html">.nds-feedback-message</code> to the bar so users understand what is progressing and its current state</li>
                    <li>Do not use progress components for indeterminate loading states. Use the <a class="nds-color" href="{{ 'components/loading' | relative_url }}">Loading</a> component instead</li>
                    <li>For multi-step workflows with discrete stages, prefer the <a class="nds-color" href="{{ 'components/stepper' | relative_url }}">Stepper</a> component over a progress bar</li>
                    <li>Use <code class="nds-inline-code lang-js">NDS.Progress.setValue()</code> or update <code class="nds-inline-code lang-html">data-value</code> directly to animate the fill at runtime. The CSS transition handles smooth movement automatically</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead>
                        <tr><th>Class</th><th>Applies to</th><th>Description</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">nds-xs</code></td><td>Circle</td><td>24px, hides percentage symbol and label text</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-sm</code></td><td>Circle / Bar</td><td>Circle: 40px, hides label text. Bar: 4px track height, hides inline percentage</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-md</code></td><td>Circle / Bar</td><td>Circle: 64px (default). Bar: 8px track height (default)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-lg</code></td><td>Circle / Bar</td><td>Circle: 120px. Bar: 16px track height with percentage inside the fill</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-xl</code></td><td>Circle</td><td>160px large display</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-2xl</code></td><td>Circle</td><td>200px hero display</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-neutral</code></td><td>Circle / Bar</td><td>Neutral gray color variant</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead>
                        <tr><th>Attribute</th><th>Description</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-value</code></td><td>Progress percentage (0–100). Sets <code class="nds-inline-code lang-html">--progress-value</code> via JS. Has priority over inline style</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-num</code></td><td>Numerator for "out of" display (e.g. 3.75). Populates <code class="nds-inline-code lang-html">.nds-progress-number</code> text and auto-calculates progress value</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-max</code></td><td>Denominator for "out of" display (e.g. 5). Populates <code class="nds-inline-code lang-html">.nds-progress-of</code> text. Used with <code class="nds-inline-code lang-html">data-num</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-status="success"</code></td><td>Locks value to 100%, applies success color, and shows a feedback icon instead of the percentage</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-status="error"</code></td><td>Applies error color and shows the feedback icon. Value stays at its current position</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead>
                        <tr><th>Property</th><th>Default</th><th>Description</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--progress-value</code></td><td>0</td><td>Current progress (0 to 100). Values above 100 are clamped. Update via JS to animate the fill</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--progress-size</code></td><td>64px</td><td>Circle diameter. Overridden by size classes (nds-xs through nds-xl)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--progress-color</code></td><td>var(--background-primary)</td><td>Fill and stroke color for both circle and bar</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--progress-track-color</code></td><td>var(--colors-neutral-100)</td><td>Background track color for the circle</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--progress-height</code></td><td>8px</td><td>Bar track height. Overridden by size classes</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDS.Progress</strong> API reads <code class="nds-inline-code lang-html">data-value</code>, <code class="nds-inline-code lang-html">data-num</code>, and <code class="nds-inline-code lang-html">data-max</code> attributes on initialization and observes changes reactively. For dynamically added elements, call <code class="nds-inline-code lang-js">NDS.Progress.init()</code> to pick them up.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// ── Set progress value (circle or bar) ──────────────
const el = document.querySelector('.nds-progress-circle');
NDS.Progress.setValue(el, 80);       // Sets data-value="80", fill animates to 80%

// ── Set out-of display (circle only) ────────────────
NDS.Progress.setOutOf(el, 4.2, 5);  // Sets data-num="4.2" data-max="5"
                                     // Fill auto-calculates to 84%
                                     // Text shows "4.2" and "/5"

// ── Direct attribute updates also work ──────────────
// The shared observer picks up any data-* change
el.dataset.value = 90;              // Fill animates to 90%
el.dataset.num = 3.5;               // Recalculates from num/max

// ── Initialize after dynamic HTML ───────────────────
NDS.Progress.init();                // Scans for new elements

// ── Initialize a single element ─────────────────────
NDS.Progress.initCircle(el);        // Process one element directly
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
