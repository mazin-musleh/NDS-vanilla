---
layout: page
title: Stepper
hero_title: Stepper - National Design System
hero_description: Step-by-step progress indicators for registration forms, onboarding flows, and service applications in horizontal, vertical, and radial layouts
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Horizontal Stepper -->
<section id="stepperHorizontal" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Horizontal Stepper</h2>
            <p class="nds-section-description">Steps arranged left-to-right for wide layouts like registration forms and service applications</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Default</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-stepper:not(.nds-vertical):not(.nds-radial)", "stepperHSize"]'>
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-lg", ".nds-stepper:not(.nds-vertical):not(.nds-radial)", "stepperHSize"]'>
                                            <span class="nds-label">LG</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-xl", ".nds-stepper:not(.nds-vertical):not(.nds-radial)", "stepperHSize"]'>
                                            <span class="nds-label">XL</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-dot", ".nds-stepper:not(.nds-vertical):not(.nds-radial)", "stepperHSize"]'>
                                            <span class="nds-label">Dot</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-center", ".nds-stepper:not(.nds-vertical):not(.nds-radial)", "stepperCenter"]'>
                                <span class="nds-label">Center</span>
                            </button>
                            <button class="nds-btn nds-subtle" data-stepper-control="previous"
                                data-stepper-target="demo-stepper-horizontal">
                                <span class="nds-label">← Previous</span>
                            </button>
                            <button class="nds-btn nds-subtle" data-stepper-control="next"
                                data-stepper-target="demo-stepper-horizontal">
                                <span class="nds-label">Next →</span>
                            </button>
                            <button class="nds-btn nds-subtle" data-stepper-control="goto"
                                data-stepper-target="demo-stepper-horizontal" data-stepper-value="1">
                                <span class="nds-label">Go to 1</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='[["nds-oncolor", ".nds-stepper:not(.nds-vertical):not(.nds-radial)", "containerBg"],["dark-bg", ".demo-container", "containerBg"]]'>
                                <span class="nds-label">On Color</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-stepper" id="demo-stepper-horizontal" data-current="2" data-total="3">
                                <div class="nds-stepper-step" data-state="completed">
                                    <div class="nds-stepper-base">
                                        <div class="nds-stepper-circle" data-step-text="1"></div>
                                    </div>
                                    <div class="nds-stepper-content">
                                        <div class="nds-stepper-text">
                                            <span class="nds-stepper-title">Personal Information</span>
                                            <span class="nds-stepper-description">Identity details and contact information</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-stepper-step" data-state="current">
                                    <div class="nds-stepper-base">
                                        <div class="nds-stepper-circle" data-step-text="2"></div>
                                    </div>
                                    <div class="nds-stepper-content">
                                        <div class="nds-stepper-text">
                                            <span class="nds-stepper-title">Document Upload</span>
                                            <span class="nds-stepper-description">Upload required supporting documents</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-stepper-step" data-state="upcoming">
                                    <div class="nds-stepper-base">
                                        <div class="nds-stepper-circle" data-step-text="3"></div>
                                    </div>
                                    <div class="nds-stepper-content">
                                        <div class="nds-stepper-text">
                                            <span class="nds-stepper-title">Review &amp; Confirmation</span>
                                            <span class="nds-stepper-description">Verify information before submission</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-stepper-horizontal-1" id="tab-stepper-horizontal-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                    id="panel-stepper-horizontal-1" aria-labelledby="tab-stepper-horizontal-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
<div class="nds-stepper" id="demo-stepper-horizontal" data-current="2" data-total="3">
  <div class="nds-stepper-step" data-state="completed">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle" data-step-text="1"></div>
    </div>
    <div class="nds-stepper-content">
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Personal Information</span>
        <span class="nds-stepper-description">Identity details and contact information</span>
      </div>
    </div>
  </div>
  <div class="nds-stepper-step" data-state="current">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle" data-step-text="2"></div>
    </div>
    <div class="nds-stepper-content">
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Document Upload</span>
        <span class="nds-stepper-description">Upload required supporting documents</span>
      </div>
    </div>
  </div>
  <div class="nds-stepper-step" data-state="upcoming">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle" data-step-text="3"></div>
    </div>
    <div class="nds-stepper-content">
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Review &amp; Confirmation</span>
        <span class="nds-stepper-description">Verify information before submission</span>
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
                </div>

            </div>
        </div>
    </div>
</section>

<!-- Vertical Stepper -->
<section id="stepperVertical" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Vertical Stepper</h2>
            <p class="nds-section-description">Top-to-bottom layout for narrow interfaces, sidebars, or when steps need detailed content blocks</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Default</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-stepper.nds-vertical", "stepperVSize"]'>
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-lg", ".nds-stepper.nds-vertical", "stepperVSize"]'>
                                            <span class="nds-label">LG</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-xl", ".nds-stepper.nds-vertical", "stepperVSize"]'>
                                            <span class="nds-label">XL</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-dot", ".nds-stepper.nds-vertical", "stepperVSize"]'>
                                            <span class="nds-label">Dot</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle" data-stepper-control="previous"
                                data-stepper-target="demo-stepper-vertical">
                                <span class="nds-label">← Previous</span>
                            </button>
                            <button class="nds-btn nds-subtle" data-stepper-control="next"
                                data-stepper-target="demo-stepper-vertical">
                                <span class="nds-label">Next →</span>
                            </button>
                            <button class="nds-btn nds-subtle" data-stepper-control="goto"
                                data-stepper-target="demo-stepper-vertical" data-stepper-value="1">
                                <span class="nds-label">Go to 1</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='[["nds-oncolor", ".nds-stepper.nds-vertical", "containerBg"],["dark-bg", ".demo-container", "containerBg"]]'>
                                <span class="nds-label">On Color</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-stepper nds-vertical" id="demo-stepper-vertical" data-current="2" data-total="3">
                                <div class="nds-stepper-step" data-state="completed">
                                    <div class="nds-stepper-base">
                                        <div class="nds-stepper-circle" data-step-text="1"></div>
                                    </div>
                                    <div class="nds-stepper-content">
                                        <div class="nds-stepper-text">
                                            <span class="nds-stepper-title">Personal Information</span>
                                            <span class="nds-stepper-description">Identity details and contact information</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-stepper-step" data-state="current">
                                    <div class="nds-stepper-base">
                                        <div class="nds-stepper-circle" data-step-text="2"></div>
                                    </div>
                                    <div class="nds-stepper-content">
                                        <div class="nds-stepper-text">
                                            <span class="nds-stepper-title">Document Upload</span>
                                            <span class="nds-stepper-description">Upload required supporting documents</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-stepper-step" data-state="upcoming">
                                    <div class="nds-stepper-base">
                                        <div class="nds-stepper-circle" data-step-text="3"></div>
                                    </div>
                                    <div class="nds-stepper-content">
                                        <div class="nds-stepper-text">
                                            <span class="nds-stepper-title">Review &amp; Confirmation</span>
                                            <span class="nds-stepper-description">Verify information before submission</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-stepper-vertical-1" id="tab-stepper-vertical-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                    id="panel-stepper-vertical-1" aria-labelledby="tab-stepper-vertical-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
<div class="nds-stepper nds-vertical" id="demo-stepper-vertical" data-current="2" data-total="3">
  <div class="nds-stepper-step" data-state="completed">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle" data-step-text="1"></div>
    </div>
    <div class="nds-stepper-content">
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Personal Information</span>
        <span class="nds-stepper-description">Identity details and contact information</span>
      </div>
    </div>
  </div>
  <div class="nds-stepper-step" data-state="current">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle" data-step-text="2"></div>
    </div>
    <div class="nds-stepper-content">
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Document Upload</span>
        <span class="nds-stepper-description">Upload required supporting documents</span>
      </div>
    </div>
  </div>
  <div class="nds-stepper-step" data-state="upcoming">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle" data-step-text="3"></div>
    </div>
    <div class="nds-stepper-content">
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Review &amp; Confirmation</span>
        <span class="nds-stepper-description">Verify information before submission</span>
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
                </div>

            </div>
        </div>
    </div>
</section>

<!-- Radial Stepper -->
<section id="stepperRadial" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Radial Stepper</h2>
            <p class="nds-section-description">Compact circular progress indicator that shows one step at a time, suited to dashboards and mobile interfaces</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Default</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-stepper.nds-radial", "stepperRSize"]'>
                                            <span class="nds-label">SM</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-stepper.nds-radial", "stepperRSize"]'>
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-lg", ".nds-stepper.nds-radial", "stepperRSize"]'>
                                            <span class="nds-label">LG</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-xl", ".nds-stepper.nds-radial", "stepperRSize"]'>
                                            <span class="nds-label">XL</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-neutral", ".nds-stepper.nds-radial", "stepperRVariant"]'>
                                <span class="nds-label">Neutral</span>
                            </button>
                            <button class="nds-btn nds-subtle" data-stepper-control="previous"
                                data-stepper-target="demo-stepper-radial">
                                <span class="nds-label">← Previous</span>
                            </button>
                            <button class="nds-btn nds-subtle" data-stepper-control="next"
                                data-stepper-target="demo-stepper-radial">
                                <span class="nds-label">Next →</span>
                            </button>
                            <button class="nds-btn nds-subtle" data-stepper-control="goto" data-stepper-value="1"
                                data-stepper-target="demo-stepper-radial">
                                <span class="nds-label">Go to 1</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='[["nds-oncolor", ".nds-stepper.nds-radial", "containerBg"],["dark-bg", ".demo-container", "containerBg"]]'>
                                <span class="nds-label">On Color</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-stepper nds-radial" id="demo-stepper-radial" data-current="2" data-total="4">
                                <div class="nds-progress-circle">
                                    <svg width="64" height="64" viewBox="0 0 24 24">
                                        <circle class="nds-progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="3" />
                                        <circle class="nds-progress-bar" cx="12" cy="12" r="10" fill="none" stroke-width="3"
                                            stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round" />
                                    </svg>
                                    <div class="nds-progress-info">
                                        <span class="nds-progress-steps"></span>
                                    </div>
                                </div>
                                <div class="nds-stepper-step" data-state="completed">
                                    <div class="nds-stepper-base">
                                        <div class="nds-stepper-circle" data-step-text="1"></div>
                                    </div>
                                    <div class="nds-stepper-content">
                                        <div class="nds-stepper-text">
                                            <span class="nds-stepper-title">Personal Information</span>
                                            <span class="nds-stepper-description">Identity details and contact information</span>
                                            <span class="nds-stepper-next">Next: Document Upload</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-stepper-step" data-state="current">
                                    <div class="nds-stepper-base">
                                        <div class="nds-stepper-circle" data-step-text="2"></div>
                                    </div>
                                    <div class="nds-stepper-content">
                                        <div class="nds-stepper-text">
                                            <span class="nds-stepper-title">Document Upload</span>
                                            <span class="nds-stepper-description">Upload required supporting documents</span>
                                            <span class="nds-stepper-next">Next: Review &amp; Confirmation</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-stepper-step" data-state="upcoming">
                                    <div class="nds-stepper-base">
                                        <div class="nds-stepper-circle" data-step-text="3"></div>
                                    </div>
                                    <div class="nds-stepper-content">
                                        <div class="nds-stepper-text">
                                            <span class="nds-stepper-title">Review &amp; Confirmation</span>
                                            <span class="nds-stepper-description">Verify information before submission</span>
                                            <span class="nds-stepper-next">Next: Application Submitted</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-stepper-step" data-state="upcoming">
                                    <div class="nds-stepper-base">
                                        <div class="nds-stepper-circle" data-step-text="4"></div>
                                    </div>
                                    <div class="nds-stepper-content">
                                        <div class="nds-stepper-text">
                                            <span class="nds-stepper-title">Application Submitted</span>
                                            <span class="nds-stepper-description">Confirmation and next steps</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-stepper-radial-1" id="tab-stepper-radial-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                    id="panel-stepper-radial-1" aria-labelledby="tab-stepper-radial-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
<div class="nds-stepper nds-radial" id="demo-stepper-radial" data-current="2" data-total="4">
  <div class="nds-progress-circle">
    <svg width="64" height="64" viewBox="0 0 24 24">
      <circle class="nds-progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="3" />
      <circle class="nds-progress-bar" cx="12" cy="12" r="10" fill="none" stroke-width="3"
        stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round" />
    </svg>
    <div class="nds-progress-info">
      <span class="nds-progress-steps"></span>
    </div>
  </div>
  <div class="nds-stepper-step" data-state="completed">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle" data-step-text="1"></div>
    </div>
    <div class="nds-stepper-content">
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Personal Information</span>
        <span class="nds-stepper-description">Identity details and contact information</span>
        <span class="nds-stepper-next">Next: Document Upload</span>
      </div>
    </div>
  </div>
  <div class="nds-stepper-step" data-state="current">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle" data-step-text="2"></div>
    </div>
    <div class="nds-stepper-content">
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Document Upload</span>
        <span class="nds-stepper-description">Upload required supporting documents</span>
        <span class="nds-stepper-next">Next: Review &amp; Confirmation</span>
      </div>
    </div>
  </div>
  <div class="nds-stepper-step" data-state="upcoming">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle" data-step-text="3"></div>
    </div>
    <div class="nds-stepper-content">
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Review &amp; Confirmation</span>
        <span class="nds-stepper-description">Verify information before submission</span>
        <span class="nds-stepper-next">Next: Application Submitted</span>
      </div>
    </div>
  </div>
  <div class="nds-stepper-step" data-state="upcoming">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle" data-step-text="4"></div>
    </div>
    <div class="nds-stepper-content">
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Application Submitted</span>
        <span class="nds-stepper-description">Confirmation and next steps</span>
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
                </div>

            </div>
        </div>
    </div>
</section>

<!-- Built-in Features -->
<section id="stepperFeatures" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-content">
            <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:24px; --row-gap: 24px; --col-gap: 32px;">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-loading-03 nds-icon"></i>
                        <span class="nds-label">Auto-initialization</span>
                    </span>
                    <p class="nds-item-desc">Activates when <code class="nds-inline-code lang-html">.nds-stepper</code> is on the page. Step states, progress display, and control button handlers attach automatically.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-layout-grid nds-icon"></i>
                        <span class="nds-label">Three Layout Modes</span>
                    </span>
                    <p class="nds-item-desc">Horizontal, vertical, and radial layouts cover wide forms, narrow sidebars, and compact dashboard widgets respectively.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-workflow-circle-06 nds-icon"></i>
                        <span class="nds-label">Automatic State Management</span>
                    </span>
                    <p class="nds-item-desc">Set <code class="nds-inline-code lang-html">data-current</code> and all steps update their completed, current, or upcoming states automatically.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-cursor-pointer-01 nds-icon"></i>
                        <span class="nds-label">Declarative Control Buttons</span>
                    </span>
                    <p class="nds-item-desc">Add <code class="nds-inline-code lang-html">data-stepper-control</code> to any button to navigate steps without writing JavaScript.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-notification-03 nds-icon"></i>
                        <span class="nds-label">Step Change Events</span>
                    </span>
                    <p class="nds-item-desc">The <code class="nds-inline-code lang-js">nds:stepper:change</code> event fires on every navigation with current step, total, and percentage in the detail.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-target-01 nds-icon"></i>
                        <span class="nds-label">Programmatic Control</span>
                    </span>
                    <p class="nds-item-desc">Navigate with <code class="nds-inline-code lang-js">NDS.Stepper.next(id)</code>, <code class="nds-inline-code lang-js">NDS.Stepper.previous(id)</code>, and <code class="nds-inline-code lang-js">NDS.Stepper.goTo(id, step)</code>.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="stepperGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-content">

            <div class="nds-content-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use steppers for <strong>multi-step forms</strong> like registration, applications, and onboarding flows where the user completes discrete stages in order</li>
                    <li>Use the <strong>horizontal layout</strong> when you have enough width and want all steps visible at once. This is the default and works best with 3 to 5 steps</li>
                    <li>Use the <strong>vertical layout</strong> when steps need detailed content, action buttons, or the interface is narrow (sidebars, mobile drawers)</li>
                    <li>Use the <strong>radial layout</strong> for compact spaces like dashboard cards or mobile headers where only the current step needs to be visible</li>
                    <li>Do not use a stepper for indeterminate or percentage-based progress. Use the <a class="nds-color" href="{{ 'components/progress' | relative_url }}">Progress</a> component instead</li>
                    <li>Do not use a stepper for navigation menus or tab-like interfaces. Use <a class="nds-color" href="{{ 'components/tabs' | relative_url }}">Tabs</a> for switching between independent content panels</li>
                    <li>Use the <strong>dot variant</strong> when step labels are not needed and visual progress alone is sufficient, such as onboarding slides or image carousels</li>
                    <li>Connecting lines between steps are shown by default on all steps except the last</li>
                    <li>Keep step titles short (2 to 4 words). Use the description for additional context</li>
                    <li>In radial steppers, add <code class="nds-inline-code lang-html">.nds-stepper-next</code> inside the step text to preview the upcoming step name. Omit it on the final step</li>
                    <li>Radial steppers work best with 3 to 6 steps. Fewer than 3 makes the circle progress hard to read; more than 6 makes step titles too compressed</li>
                    <li>Always provide a unique <code class="nds-inline-code lang-html">id</code> on the stepper container so control buttons and the JS API can target it</li>
                </ul>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead>
                        <tr><th>Class</th><th>Applies to</th><th>Description</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">nds-vertical</code></td><td>Container</td><td>Switches to top-to-bottom layout with vertical connecting lines</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-radial</code></td><td>Container</td><td>Circular progress indicator showing one step at a time</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-dot</code></td><td>Container</td><td>Replaces numbered circles with 16px dots (horizontal and vertical)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-sm</code></td><td>Container</td><td>Smaller radial circle (48px, radial only)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-lg</code></td><td>Container</td><td>Larger circle size (40px linear, 96px radial)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-xl</code></td><td>Container</td><td>Extra-large circle size (48px linear, 120px radial)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-center</code></td><td>Container</td><td>Centers step content beneath each circle (horizontal only)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-oncolor</code></td><td>Container</td><td>Adapts colors for dark or branded backgrounds</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-neutral</code></td><td>Container</td><td>Neutral gray progress circle color (radial only)</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead>
                        <tr><th>Attribute</th><th>Description</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-current</code></td><td>Set on the <code class="nds-inline-code lang-html">.nds-stepper</code> container. The active step number (starting from 1). Updating this attribute triggers an automatic UI refresh.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-total</code></td><td>Set on the <code class="nds-inline-code lang-html">.nds-stepper</code> container. Total number of steps. Updated automatically on init but can be set manually.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-step-text</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-stepper-circle</code>. Overrides the auto-generated step number with custom text.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-stepper-control</code></td><td>Set on any button. Values: <code class="nds-inline-code lang-html">next</code>, <code class="nds-inline-code lang-html">previous</code>, or <code class="nds-inline-code lang-html">goto</code>. Buttons inside a stepper target their parent automatically.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-stepper-target</code></td><td>Set on control buttons outside a stepper. The ID of the stepper to control.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-stepper-value</code></td><td>Set on <code class="nds-inline-code lang-html">goto</code> control buttons. The step number to navigate to.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-state="completed"</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-stepper-step</code>. Marks the step as completed with a checkmark icon. Managed automatically by JS.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-state="current"</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-stepper-step</code>. Marks the step as the active step. Managed automatically by JS.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-state="upcoming"</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-stepper-step</code>. Marks the step as a future step with muted styling. Managed automatically by JS.</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead>
                        <tr><th>Property</th><th>Default</th><th>Description</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--stepper-size</code></td><td>32px</td><td>Circle diameter for linear steppers. Overridden by size classes</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--stepper-gap</code></td><td>token-based</td><td>Spacing between steps. Adjusts automatically with size classes</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--progress-size</code></td><td>var(--stepper-size)</td><td>Circle diameter for radial steppers. Inherits from <code class="nds-inline-code lang-html">--stepper-size</code>, which radial size classes override</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>Steppers auto-initialize on page load. Access instances via <code class="nds-inline-code lang-js">NDS.Stepper.get(id)</code> or call convenience methods directly. The <code class="nds-inline-code lang-js">nds:stepper:change</code> event fires on every step change.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// ── Global convenience methods ──────────────────────
NDS.Stepper.next('my-stepper');        // Advance to next step
NDS.Stepper.previous('my-stepper');    // Go back one step
NDS.Stepper.goTo('my-stepper', 3);     // Jump to step 3

// ── Instance methods ────────────────────────────────
const stepper = NDS.Stepper.get('my-stepper');
stepper.next();       // Advance (marks last step completed on linear steppers)
stepper.previous();   // Go back (un-completes last step if completed)
stepper.goTo(2);      // Jump to specific step
stepper.destroy();    // Disconnect observer and clean up

// ── Instance properties ─────────────────────────────
stepper.current;      // Current step number
stepper.total;        // Total number of steps
stepper.progress;     // Completion percentage (0 to 100)

// ── Listen for step changes ─────────────────────────
document.addEventListener('nds:stepper:change', (e) => {
    e.detail.currentStep;          // Active step number
    e.detail.totalSteps;           // Total steps
    e.detail.progressPercentage;   // Completion percentage
});

// ── Data attribute control (alternative) ────────────
// Updating data attributes triggers automatic UI refresh
const el = document.getElementById('my-stepper');
el.dataset.current = '2';  // Moves to step 2
el.dataset.total = '5';    // Updates total steps

// ── Re-initialize after dynamic HTML ────────────────
NDS.Stepper.init();
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
