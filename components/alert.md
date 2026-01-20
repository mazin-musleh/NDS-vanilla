---
layout: page
title: Alert
hero_title: Alert Components - National Design System
hero_description: Alert notifications for displaying important messages, warnings, and feedback to users
breadcrumb: ["Components"]
lang: en
direction: ltr
layout_class: cardView
---

<!-- Alert Overview -->
<section id="alertOverview" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Alert Variants</h2>
            <p class="nds-section-description">Alert components built on nds-card with featured icons for different
                message types</p>
        </div>
        <div class="nds-section-content">
            <div class="tag-showcase">
                <!-- Success Alert -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Success Alert</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-shadow", ".nds-alert","alertStyle"]'>
                                <span class="label">Shadow</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-color", ".nds-alert","alertColor"]'>
                                <span class="label">Color</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo success-alert-demo">
                            <div class="nds-alert nds-card nds-success">
                                <span class="nds-feedback nds-alert-icon" data-status="success">
                                    <span class="nds-feedback-icon nds-outline">
                                        <i class="hgi hgi-solid icon"></i>
                                    </span>
                                </span>
                                <button class="nds-btn nds-subtle nds-icon-only nds-md nds-alert-close"
                                    aria-label="Close alert">
                                    <i class="hgi hgi-stroke hgi-cancel-01"></i>
                                </button>
                                <div class="nds-alert-content">
                                    <h4 class="nds-alert-title">Success</h4>
                                    <p class="nds-alert-description">Your changes have been saved successfully.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-success-1" id="tab-success-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-success-1"
                                aria-labelledby="tab-success-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
<div class="nds-alert nds-card nds-success">
  <span class="nds-feedback nds-alert-icon" data-status="success">
    <span class="nds-feedback-icon nds-outline">
      <i class="hgi hgi-solid icon"></i>
    </span>
  </span>
  <div class="nds-alert-content">
    <h4 class="nds-alert-title">Success</h4>
    <p class="nds-alert-description">Your changes have been saved successfully.</p>
  </div>
  <button class="nds-btn nds-subtle nds-icon-only nds-md nds-alert-close">
    <i class="hgi hgi-stroke hgi-cancel-01"></i>
  </button>
</div>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Info Alert -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Info Alert</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-shadow", ".nds-alert","alertStyle"]'>
                                <span class="label">Shadow</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-color", ".nds-alert","alertColor"]'>
                                <span class="label">Color</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo info-alert-demo">
                            <div class="nds-alert nds-card nds-info">
                                <span class="nds-feedback nds-alert-icon" data-status="info">
                                    <span class="nds-feedback-icon nds-outline">
                                        <i class="hgi hgi-solid icon"></i>
                                    </span>
                                </span>
                                <div class="nds-alert-content">
                                    <h4 class="nds-alert-title">Information</h4>
                                    <p class="nds-alert-description">A new software update is available for download.
                                    </p>
                                </div>
                                <button class="nds-btn nds-subtle nds-icon-only nds-md nds-alert-close"
                                    aria-label="Close alert">
                                    <i class="hgi hgi-stroke hgi-cancel-01"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-info-1" id="tab-info-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-info-1"
                                aria-labelledby="tab-info-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
<div class="nds-alert nds-card nds-info">
  <span class="nds-feedback nds-alert-icon" data-status="info">
    <span class="nds-feedback-icon nds-outline">
      <i class="hgi hgi-solid icon"></i>
    </span>
  </span>
  <div class="nds-alert-content">
    <h4 class="nds-alert-title">Information</h4>
    <p class="nds-alert-description">A new software update is available.</p>
  </div>
  <button class="nds-btn nds-subtle nds-icon-only nds-md nds-alert-close">
    <i class="hgi hgi-stroke hgi-cancel-01"></i>
  </button>
</div>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Warning Alert -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Warning Alert</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-shadow", ".nds-alert","alertStyle"]'>
                                <span class="label">Shadow</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-color", ".nds-alert","alertColor"]'>
                                <span class="label">Color</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo warning-alert-demo">
                            <div class="nds-alert nds-card nds-warning">
                                <span class="nds-feedback nds-alert-icon" data-status="warning">
                                    <span class="nds-feedback-icon nds-outline">
                                        <i class="hgi hgi-solid icon"></i>
                                    </span>
                                </span>
                                <div class="nds-alert-content">
                                    <h4 class="nds-alert-title">Warning</h4>
                                    <p class="nds-alert-description">Your session will expire in 5 minutes.</p>
                                </div>
                                <button class="nds-btn nds-subtle nds-icon-only nds-md nds-alert-close"
                                    aria-label="Close alert">
                                    <i class="hgi hgi-stroke hgi-cancel-01"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-warning-1" id="tab-warning-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-warning-1"
                                aria-labelledby="tab-warning-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
<div class="nds-alert nds-card nds-warning">
  <span class="nds-feedback nds-alert-icon" data-status="warning">
    <span class="nds-feedback-icon nds-outline">
      <i class="hgi hgi-solid icon"></i>
    </span>
  </span>
  <div class="nds-alert-content">
    <h4 class="nds-alert-title">Warning</h4>
    <p class="nds-alert-description">Your session will expire in 5 minutes.</p>
  </div>
  <button class="nds-btn nds-subtle nds-icon-only nds-md nds-alert-close">
    <i class="hgi hgi-stroke hgi-cancel-01"></i>
  </button>
</div>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Error Alert -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Error Alert</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-shadow", ".nds-alert","alertStyle"]'>
                                <span class="label">Shadow</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-color", ".nds-alert","alertColor"]'>
                                <span class="label">Color</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo error-alert-demo">
                            <div class="nds-alert nds-card nds-error">
                                <span class="nds-feedback nds-alert-icon" data-status="error">
                                    <span class="nds-feedback-icon nds-outline">
                                        <i class="hgi hgi-solid icon"></i>
                                    </span>
                                </span>
                                <div class="nds-alert-content">
                                    <h4 class="nds-alert-title">Error</h4>
                                    <p class="nds-alert-description">There was an error processing your request. Please
                                        try again.</p>
                                </div>
                                <button class="nds-btn nds-subtle nds-icon-only nds-md nds-alert-close"
                                    aria-label="Close alert">
                                    <i class="hgi hgi-stroke hgi-cancel-01"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-error-1" id="tab-error-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-error-1"
                                aria-labelledby="tab-error-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
<div class="nds-alert nds-card nds-error">
  <span class="nds-feedback nds-alert-icon" data-status="error">
    <span class="nds-feedback-icon nds-outline">
      <i class="hgi hgi-solid icon"></i>
    </span>
  </span>
  <div class="nds-alert-content">
    <h4 class="nds-alert-title">Error</h4>
    <p class="nds-alert-description">There was an error processing your request.</p>
  </div>
  <button class="nds-btn nds-subtle nds-icon-only nds-md nds-alert-close">
    <i class="hgi hgi-stroke hgi-cancel-01"></i>
  </button>
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

<!-- Alert with Actions -->
<section id="alertWithActions" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Alert with Actions</h2>
            <p class="nds-section-description">Alerts can include action buttons for user interaction</p>
        </div>
        <div class="nds-section-content">
            <div class="tag-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Alert with Actions</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-shadow", ".nds-alert","alertStyle"]'>
                                <span class="label">Shadow</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-color", ".nds-alert","alertColor"]'>
                                <span class="label">Color</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-alert nds-card nds-info">
                                <span class="nds-feedback nds-alert-icon" data-status="info">
                                    <span class="nds-feedback-icon nds-outline">
                                        <i class="hgi hgi-solid icon"></i>
                                    </span>
                                </span>
                                <div class="nds-alert-content">
                                    <h4 class="nds-alert-title">Update Available</h4>
                                    <p class="nds-alert-description">A new version is available. Would you like to
                                        update now?</p>
                                    <div class="nds-alert-actions">
                                        <button class="nds-btn nds-primary nds-sm">
                                            <span class="label">Update Now</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-sm">
                                            <span class="label">Later</span>
                                        </button>
                                    </div>
                                </div>
                                <button class="nds-btn nds-subtle nds-icon-only nds-md nds-alert-close"
                                    aria-label="Close alert">
                                    <i class="hgi hgi-stroke hgi-cancel-01"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-actions-1" id="tab-actions-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-actions-1"
                                aria-labelledby="tab-actions-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
<div class="nds-alert nds-card nds-info">
  <span class="nds-feedback nds-alert-icon" data-status="info">
    <span class="nds-feedback-icon nds-outline">
      <i class="hgi hgi-solid icon"></i>
    </span>
  </span>
  <div class="nds-alert-content">
    <h4 class="nds-alert-title">Update Available</h4>
    <p class="nds-alert-description">A new version is available.</p>
    <div class="nds-alert-actions">
      <button class="nds-btn nds-primary nds-sm">
        <span class="label">Update Now</span>
      </button>
      <button class="nds-btn nds-subtle nds-sm">
        <span class="label">Later</span>
      </button>
    </div>
  </div>
  <button class="nds-btn nds-subtle nds-icon-only nds-md nds-alert-close">
    <i class="hgi hgi-stroke hgi-cancel-01"></i>
  </button>
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

<!-- Neutral and Brand Alerts -->
<section id="neutralBrandAlerts" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Neutral Alerts</h2>
            <p class="nds-section-description">Additional color variants for general notifications</p>
        </div>
        <div class="nds-section-content">
            <div class="tag-showcase">
                <!-- Neutral Alert -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Neutral Alert</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-shadow", ".nds-alert","alertStyle"]'>
                                <span class="label">Shadow</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-color", ".nds-alert","alertColor"]'>
                                <span class="label">Color</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-alert nds-card nds-neutral">
                                <span class="nds-feedback nds-alert-icon" data-status="neutral">
                                    <span class="nds-feedback-icon nds-outline">
                                        <i class="hgi hgi-solid icon"></i>
                                    </span>
                                </span>
                                <div class="nds-alert-content">
                                    <h4 class="nds-alert-title">Notification</h4>
                                    <p class="nds-alert-description">You have 3 new messages in your inbox.</p>
                                </div>
                                <button class="nds-btn nds-subtle nds-icon-only nds-md nds-alert-close"
                                    aria-label="Close alert">
                                    <i class="hgi hgi-stroke hgi-cancel-01"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-neutral-1" id="tab-neutral-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-neutral-1"
                                aria-labelledby="tab-neutral-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
<div class="nds-alert nds-card nds-neutral">
  <span class="nds-feedback nds-alert-icon" data-status="neutral">
    <span class="nds-feedback-icon nds-outline">
      <i class="hgi hgi-solid icon"></i>
    </span>
  </span>
  <div class="nds-alert-content">
    <h4 class="nds-alert-title">Notification</h4>
    <p class="nds-alert-description">You have 3 new messages.</p>
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

<!-- Programmatic Alert Demo -->
<section id="programmaticAlert" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Programmatic Alert Creation</h2>
            <p class="nds-section-description">Create alerts dynamically using the JavaScript API</p>
        </div>
        <div class="nds-section-content">
            <div class="tag-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Dynamic Alert Demo</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo column">
                            <div class="nds-btn-group">
                                <button class="nds-btn nds-primary" onclick="createDemoAlert('success')">
                                    <span class="label">Success</span>
                                </button>
                                <button class="nds-btn nds-primary" onclick="createDemoAlert('warning')">
                                    <span class="label">Warning</span>
                                </button>
                                <button class="nds-btn nds-primary" onclick="createDemoAlert('error')">
                                    <span class="label">Error</span>
                                </button>
                                <button class="nds-btn nds-primary" onclick="createDemoAlert('info')">
                                    <span class="label">Info</span>
                                </button>
                                <button class="nds-btn nds-primary" onclick="createDemoAlert('neutral')">
                                    <span class="label">Neutral</span>
                                </button>
                                <button class="nds-btn nds-subtle"
                                    onclick="NDSAlert.dismissAll('#demo-alert-container')">
                                    <span class="label">Clear All</span>
                                </button>
                            </div>
                            <div id="demo-alert-container" class="nds-alert-container" style="width:100%;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- JavaScript API -->
<section id="alertAPI" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">JavaScript API</h2>
            <p class="nds-section-description">Programmatic alert creation and management</p>
        </div>
        <div class="nds-section-content">

            <h3>Overview</h3>

            <p>The <strong>NDSAlert</strong> API provides programmatic methods to create, display, and dismiss alerts
                dynamically. This is useful for showing feedback messages in response to user actions, form submissions,
                or application state changes.</p>

            <h3>Creating Alerts</h3>

            <p>Use <strong>NDSAlert.create()</strong> to create and insert an alert into the DOM. The method accepts an
                options object and returns the created alert element.</p>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <code class="lang-javascript nds-expandable-content line-numbers">
// Basic alert creation
const alert = NDSAlert.create({
    variant: 'success',
    title: 'Success',
    description: 'Your changes have been saved.',
    target: '#alert-container'
});

// Alert with all options
NDSAlert.create({
    variant: 'info',
    title: 'Update Available',
    description: 'A new version is available for download.',
    target: '#container',
    closable: true,
    id: 'update-alert',
    prepend: false,
    actions: [
        { label: 'Update Now', variant: 'primary', onClick: () => handleUpdate() },
        { label: 'Later', variant: 'subtle', dismiss: true }
    ]
});
                </code>
            </div>

            <h3>Options Reference</h3>

            <p>The <strong>create()</strong> method accepts the following options:</p>

            <dl class="nds-definition-list nds-divided tableView">
                <div class="nds-definition-item">
                    <dt>variant</dt>
                    <dd><code>string</code> - Alert type: <code>'success'</code>, <code>'warning'</code>,
                        <code>'error'</code>, <code>'info'</code>, or <code>'neutral'</code>. Default:
                        <code>'info'</code></dd>
                </div>
                <div class="nds-definition-item">
                    <dt>title</dt>
                    <dd><code>string</code> - Alert title text. Optional.</dd>
                </div>
                <div class="nds-definition-item">
                    <dt>description</dt>
                    <dd><code>string</code> - Alert description/message text. Required for meaningful alerts.</dd>
                </div>
                <div class="nds-definition-item">
                    <dt>target</dt>
                    <dd><code>string | Element</code> - CSS selector or DOM element where the alert will be inserted.
                    </dd>
                </div>
                <div class="nds-definition-item">
                    <dt>closable</dt>
                    <dd><code>boolean</code> - Whether to show the close button. Default: <code>true</code></dd>
                </div>
                <div class="nds-definition-item">
                    <dt>id</dt>
                    <dd><code>string</code> - Custom ID for the alert element. Optional.</dd>
                </div>
                <div class="nds-definition-item">
                    <dt>prepend</dt>
                    <dd><code>boolean</code> - If <code>true</code>, insert at the beginning of the target. Default:
                        <code>false</code> (append)</dd>
                </div>
                <div class="nds-definition-item">
                    <dt>actions</dt>
                    <dd><code>Array</code> - Array of action button objects. See Actions section below.</dd>
                </div>
            </dl>

            <h3>Action Buttons</h3>

            <p>Each action in the <strong>actions</strong> array is an object with the following properties:</p>

            <dl class="nds-definition-list nds-divided tableView">
                <div class="nds-definition-item">
                    <dt>label</dt>
                    <dd><code>string</code> - Button text label. Required.</dd>
                </div>
                <div class="nds-definition-item">
                    <dt>variant</dt>
                    <dd><code>string</code> - Button style variant: <code>'primary'</code>, <code>'subtle'</code>, etc.
                        Default: <code>'subtle'</code></dd>
                </div>
                <div class="nds-definition-item">
                    <dt>size</dt>
                    <dd><code>string</code> - Button size: <code>'sm'</code>, <code>'md'</code>, <code>'lg'</code>.
                        Default: <code>'sm'</code></dd>
                </div>
                <div class="nds-definition-item">
                    <dt>onClick</dt>
                    <dd><code>function(alertElement)</code> - Callback function when button is clicked. Receives the
                        alert element as argument.</dd>
                </div>
                <div class="nds-definition-item">
                    <dt>dismiss</dt>
                    <dd><code>boolean</code> - If <code>true</code>, automatically dismiss the alert after onClick.
                        Default: <code>false</code></dd>
                </div>
            </dl>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <code class="lang-javascript nds-expandable-content line-numbers">
// Alert with action buttons
NDSAlert.create({
    variant: 'warning',
    title: 'Confirm Delete',
    description: 'Are you sure you want to delete this item?',
    target: '#container',
    actions: [
        {
            label: 'Delete',
            variant: 'primary',
            onClick: (alert) => {
                deleteItem();
                NDSAlert.dismiss(alert);
            }
        },
        {
            label: 'Cancel',
            variant: 'subtle',
            dismiss: true  // Auto-dismiss on click
        }
    ]
});
                </code>
            </div>

            <h3>Shorthand Methods</h3>

            <p>For convenience, shorthand methods are available for each variant. These accept a description as the
                first argument and an options object as the second.</p>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <code class="lang-javascript nds-expandable-content line-numbers">
// Shorthand methods
NDSAlert.success('Changes saved successfully!', { target: '#container' });
NDSAlert.warning('Session expires in 5 minutes.', { target: '#container' });
NDSAlert.error('Failed to submit form.', { target: '#container' });
NDSAlert.info('New update available.', { target: '#container' });
NDSAlert.neutral('This is a neutral message.', { target: '#container' });

// With additional options
NDSAlert.success('Item created!', {
    target: '#container',
    title: 'Success',
    closable: true,
    prepend: true
});
                </code>
            </div>

            <h3>Dismissing Alerts</h3>

            <p>Use <strong>NDSAlert.dismiss()</strong> to remove a single alert, or
                <strong>NDSAlert.dismissAll()</strong> to remove all alerts within a container.</p>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <code class="lang-javascript nds-expandable-content line-numbers">
// Dismiss a single alert by element
const alert = NDSAlert.create({ ... });
NDSAlert.dismiss(alert);

// Dismiss by selector
NDSAlert.dismiss('#my-alert-id');

// Dismiss all alerts in a container
NDSAlert.dismissAll('#alert-container');

// Dismiss all alerts on the page
NDSAlert.dismissAll(document.body);
                </code>
            </div>

            <h3>Initializing Existing Alerts</h3>

            <p>For alerts that exist in the HTML markup, call <strong>NDSAlert.init()</strong> to attach close button
                handlers. This is automatically called on page load but can be called manually after dynamically adding
                HTML alerts.</p>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <code class="lang-javascript nds-expandable-content line-numbers">
// Re-initialize alerts after dynamic content load
document.getElementById('container').innerHTML = alertHtml;
NDSAlert.init();
                </code>
            </div>

            <h3>Complete Example</h3>

            <p>Here's a practical example showing how to use the Alert API in a form submission scenario:</p>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <code class="lang-javascript nds-expandable-content line-numbers">
async function handleFormSubmit(form) {
    const alertContainer = document.getElementById('form-alerts');

    // Clear previous alerts
    NDSAlert.dismissAll(alertContainer);

    try {
        const response = await submitForm(form);

        if (response.success) {
            NDSAlert.success('Form submitted successfully!', {
                target: alertContainer,
                title: 'Success',
                prepend: true
            });
        } else {
            NDSAlert.error(response.message, {
                target: alertContainer,
                title: 'Submission Failed',
                actions: [
                    {
                        label: 'Retry',
                        variant: 'primary',
                        onClick: () => handleFormSubmit(form)
                    }
                ]
            });
        }
    } catch (error) {
        NDSAlert.error('An unexpected error occurred.', {
            target: alertContainer,
            title: 'Error'
        });
    }
}
                </code>
            </div>

        </div>
    </div>
</section>

<script>
    function createDemoAlert(variant) {
        const messages = {
            success: 'Operation completed successfully!',
            warning: 'Please review your changes before proceeding.',
            error: 'An error occurred. Please try again.',
            info: 'This is an informational message.',
            neutral: 'This is a neutral notification.'
        };

        NDSAlert.create({
            variant: variant,
            title: variant.charAt(0).toUpperCase() + variant.slice(1),
            description: messages[variant],
            target: '#demo-alert-container',
            prepend: true
        });
    }
</script>