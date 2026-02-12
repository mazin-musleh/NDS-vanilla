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
                data-toggler='["nds-primary", ".nds-progress-circle", "progressVariant"]'>
                <span class="label">Primary</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["nds-neutral", ".nds-progress-circle", "progressVariant"]'>
                <span class="label">Neutral</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["nds-success", ".nds-progress-circle", "progressVariant"]'>
                <span class="label">Success</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["nds-error", ".nds-progress-circle", "progressVariant"]'>
                <span class="label">Error</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='[["nds-oncolor", ".nds-progress-circle", "progressVariant"],["dark-bg", ".demo-container", "containerBg"]]'>
                <span class="label">On Color</span>
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
                  <span class="progress-percentage">
                    <span class="progress-number"></span>
                    <span class="progress-symbol">%</span>
                  </span>
                  <span class="progress-text">Complete</span>
                </div>
              </div>
            </div>
          </div>
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
                      <span class="progress-percentage">
                        <span class="progress-number"></span>
                        <span class="progress-symbol">%</span>
                      </span>
                      <span class="progress-text">Complete</span>
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
</section>

<!-- Progress Bar Component -->
<section id="progressBar" class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Progress Bar</h2>
      <p class="nds-section-description">Linear progress bars with CSS custom properties</p>
    </div>
    <div class="nds-section-content">
      <div class="nds-showcase">

        <!-- Progress Bar Sizes -->
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Progress Bar - Sizes</div>
            <div class="demo-action">
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["nds-xs", ".nds-progress-bar", "progressBarSize"]'>
                <span class="label">XS</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                data-toggler='["nds-md", ".nds-progress-bar", "progressBarSize"]'>
                <span class="label">MD</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["nds-lg", ".nds-progress-bar", "progressBarSize"]'>
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
              <div class="nds-progress-bar nds-md" style="--progress-value: 60;">
                <div class="progress-fill"></div>
              </div>
            </div>
          </div>
          <div class="nds-tabs nds-code nds-divided" hidden>
            <div class="nds-tab-list-container">
              <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                  aria-controls="panel-bar-sizes-1" id="tab-bar-sizes-1">
                  <span class="nds-tab-label">HTML</span>
                </button>
              </nav>
            </div>
            <div class="nds-tab-content">
              <div class="nds-tab-panel code-example" role="tabpanel" id="panel-bar-sizes-1"
                aria-labelledby="tab-bar-sizes-1">
                <div class="nds-code-action">
                  <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                  </button>
                </div>
                <code class="lang-html code">
                  <!-- Extra Small (4px) -->
                  <div class="nds-progress-bar nds-xs" style="--progress-value: 60;">
                    <div class="progress-fill"></div>
                  </div>
                </code>
              </div>
            </div>
          </div>
        </div>

        <!-- Progress Bar Variants -->
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Progress Bar - Variants</div>
            <div class="demo-action">
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["nds-primary", ".nds-progress-bar", "progressBarVariant"]'>
                <span class="label">Primary</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["nds-neutral", ".nds-progress-bar", "progressBarVariant"]'>
                <span class="label">Neutral</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='[["nds-oncolor", ".nds-progress-bar", "progressBarVariant"],["dark-bg", ".demo-container", "containerBg"]]'>
                <span class="label">On Color</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                <span class="label">Remove bg</span>
              </button>
            </div>
          </div>
          <div class="demo-container">
            <div class="state-demo">
              <div class="nds-progress-bar nds-lg nds-primary" style="--progress-value: 70;">
                <div class="progress-fill"></div>
              </div>
            </div>
          </div>
          <div class="nds-tabs nds-code nds-divided" hidden>
            <div class="nds-tab-list-container">
              <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                  aria-controls="panel-bar-variants-1" id="tab-bar-variants-1">
                  <span class="nds-tab-label">HTML</span>
                </button>
              </nav>
            </div>
            <div class="nds-tab-content">
              <div class="nds-tab-panel code-example" role="tabpanel" id="panel-bar-variants-1"
                aria-labelledby="tab-bar-variants-1">
                <div class="nds-code-action">
                  <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                  </button>
                </div>
                <code class="lang-html code">
                  <div class="nds-progress-bar nds-lg nds-primary" style="--progress-value: 70;">
                    <div class="progress-fill"></div>
                  </div>
                </code>
              </div>
            </div>
          </div>
        </div>

        <!-- Progress Bar with Label -->
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Progress Bar - With Label</div>
            <div class="demo-action">
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["nds-primary", ".nds-progress-bar", "progressBarVariant"]'>
                <span class="label">Primary</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["nds-neutral", ".nds-progress-bar", "progressBarVariant"]'>
                <span class="label">Neutral</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["nds-striped", ".nds-progress-bar", "progressBarPattern"]'>
                <span class="label">Striped</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["nds-animated", ".nds-progress-bar", "progressBarAnimation"]'>
                <span class="label">Animated</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='[["nds-oncolor", ".nds-progress-bar", "progressBarVariant"],["dark-bg", ".demo-container", "containerBg"]]'>
                <span class="label">On Color</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                <span class="label">Remove bg</span>
              </button>
            </div>
          </div>
          <div class="demo-container">
            <div class="state-demo">

              <div class="nds-progress-bar nds-md" style="--progress-value: 65;">
                <div class="nds-progress-header">
                  <span class="progress-label">Uploading document.pdf</span>
                  <span class="progress-percentage">65%</span>
                </div>
                <div class="progress-fill"></div>
              </div>
            </div>
          </div>
          <div class="nds-tabs nds-code nds-divided" hidden>
            <div class="nds-tab-list-container">
              <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                  aria-controls="panel-bar-label-1" id="tab-bar-label-1">
                  <span class="nds-tab-label">HTML</span>
                </button>
              </nav>
            </div>
            <div class="nds-tab-content">
              <div class="nds-tab-panel code-example" role="tabpanel" id="panel-bar-label-1"
                aria-labelledby="tab-bar-label-1">
                <div class="nds-code-action">
                  <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                  </button>
                </div>
                <code class="lang-html code">
                  <div class="nds-progress-bar nds-md" style="--progress-value: 65;">
                    <div class="nds-progress-header">
                      <span class="progress-label">Uploading document.pdf</span>
                      <span class="progress-percentage">65%</span>
                    </div>
                    <div class="progress-fill"></div>
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