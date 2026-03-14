---
layout: page
title: Progress
hero_title: Progress Components - National Design System
hero_description: Visual indicators for showing progress of tasks and operations using CSS custom properties
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Progress Circle Component -->
<section id="progressCircle" class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Progress Circle</h2>
      <p class="nds-section-description">Circular progress indicators with dynamic CSS custom properties</p>
    </div>
    <div class="nds-section-content">
      <div class="nds-showcase">

        <!-- Progress Circle Sizes -->
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Progress Circle - Sizes</div>
            <div class="demo-action">
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["nds-neutral", ".nds-progress-circle", "progressVariant"]'>
                <span class="label">Neutral</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["data-status=success", ".nds-progress-circle", "progressVariant", "attr"]'>
                <span class="label">Success</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["data-status=error", ".nds-progress-circle", "progressVariant", "attr"]'>
                <span class="label">Error</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["nds-xs", ".nds-progress-circle", "progressSize"]'>
                <span class="label">XS</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["nds-sm", ".nds-progress-circle", "progressSize"]'>
                <span class="label">SM</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["nds-md", ".nds-progress-circle", "progressSize"]'>
                <span class="label">MD</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                data-toggler='["nds-lg", ".nds-progress-circle", "progressSize"]'>
                <span class="label">LG</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["nds-xl", ".nds-progress-circle", "progressSize"]'>
                <span class="label">XL</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                <span class="label">Remove bg</span>
              </button>
            </div>
          </div>
          <div class="demo-container">
            <div class="state-demo">
              <div class="nds-progress-circle nds-lg" style="--progress-value: 75;">
                <svg width="120" height="120" viewBox="0 0 24 24">
                  <circle class="progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="2" />
                  <circle class="progress-bar" cx="12" cy="12" r="10" fill="none" stroke-width="2"
                    stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round" />
                </svg>
                <div class="progress-info">
                  <span class="nds-feedback nds-sm">
                    <span class="nds-feedback-icon"><i class="hgi hgi-stroke icon"></i></span>
                  </span>
                  <span class="progress-percentage">
                    <span class="progress-number"></span>
                    <span class="progress-symbol">%</span>
                  </span>
                  <span class="progress-text">Active users</span>
                </div>
              </div>
            </div>
          </div>
          <div class="demo-code">
          <div class="nds-tabs nds-code nds-divided" hidden>
            <div class="nds-tab-list-container">
              <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                  aria-controls="panel-circle-sizes-1" id="tab-circle-sizes-1">
                  <span class="nds-tab-label">HTML</span>
                </button>
              </nav>
            </div>
            <div class="nds-tab-content">
              <div class="nds-tab-panel code-example" role="tabpanel" id="panel-circle-sizes-1"
                aria-labelledby="tab-circle-sizes-1">
                <div class="nds-code-action">
                  <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                  </button>
                </div>
                <code class="lang-html code">
                  <div class="nds-progress-circle nds-lg" style="--progress-value: 75;">
                    <svg width="120" height="120" viewBox="0 0 24 24">
                      <circle class="progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="2" />
                      <circle class="progress-bar" cx="12" cy="12" r="10" fill="none" stroke-width="2"
                        stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round" />
                    </svg>
                    <div class="progress-info">
                      <span class="nds-feedback-icon"><i class="hgi hgi-stroke icon"></i></span>
                      <span class="progress-percentage">
                        <span class="progress-number"></span>
                        <span class="progress-symbol">%</span>
                      </span>
                      <span class="progress-text">Active users</span>
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

<!-- Progress Bar Component -->
<section id="progressBar" class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Progress Bar</h2>
      <p class="nds-section-description">Linear progress bars with label, percentage, and feedback</p>
    </div>
    <div class="nds-section-content">
      <div class="nds-showcase">

        <!-- Progress Bar -->
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Progress Bar</div>
            <div class="demo-action">
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["nds-neutral", ".nds-progress-group", "progressBarVariant"]'>
                <span class="label">Neutral</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["data-status=success", ".nds-progress-group", "progressBarVariant", "attr"]'>
                <span class="label">Success</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["data-status=error", ".nds-progress-group", "progressBarVariant", "attr"]'>
                <span class="label">Error</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["nds-sm", ".nds-progress-group", "progressBarSize"]'>
                <span class="label">SM</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["nds-md", ".nds-progress-group", "progressBarSize"]'>
                <span class="label">MD</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                data-toggler='["nds-lg", ".nds-progress-group", "progressBarSize"]'>
                <span class="label">LG</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                <span class="label">Remove bg</span>
              </button>
            </div>
          </div>
          <div class="demo-container">
            <div class="state-demo">
              <div class="nds-progress-group nds-lg" style="--progress-value: 65;">
                <span class="progress-label">Uploading document.pdf</span>
                <div class="nds-progress-bar">
                  <div class="progress-fill"></div>
                </div>
                <span class="nds-feedback nds-sm">
                  <span class="nds-feedback-icon"><i class="hgi hgi-stroke icon"></i></span>
                  <span class="nds-feedback-message">Processing your file...</span>
                </span>
              </div>
            </div>
          </div>
          <div class="demo-code">
          <div class="nds-tabs nds-code nds-divided" hidden>
            <div class="nds-tab-list-container">
              <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                  aria-controls="panel-bar-1" id="tab-bar-1">
                  <span class="nds-tab-label">HTML</span>
                </button>
              </nav>
            </div>
            <div class="nds-tab-content">
              <div class="nds-tab-panel code-example" role="tabpanel" id="panel-bar-1"
                aria-labelledby="tab-bar-1">
                <div class="nds-code-action">
                  <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                  </button>
                </div>
                <code class="lang-html code">
                  <div class="nds-progress-group nds-lg" style="--progress-value: 65;">
                    <span class="progress-label">Uploading document.pdf</span>
                    <div class="nds-progress-bar">
                      <div class="progress-fill"></div>
                    </div>
                    <span class="nds-feedback nds-sm nds-outline">
                      <span class="nds-feedback-icon"><i class="hgi hgi-stroke icon"></i></span>
                      <span class="nds-feedback-message">Processing your file...</span>
                    </span>
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