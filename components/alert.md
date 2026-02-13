---
layout: page
title: Alert
hero_title: Alert Components - National Design System
hero_description: Alert notifications for displaying important messages, warnings, and feedback to users
breadcrumb: ["Components"]
lang: en
direction: ltr
layout_class: cardView topSubMenu
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
            <div class="nds-showcase">
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
                            <div class="nds-alert nds-card" data-status="success">
                                <span class="nds-feedback nds-alert-icon nds-outline">
                                    <span class="nds-feedback-icon">
                                        <i class="hgi hgi-stroke icon"></i>
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
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
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
<div class="nds-alert nds-card" data-status="success">
  <span class="nds-feedback nds-alert-icon nds-outline">
    <span class="nds-feedback-icon">
      <i class="hgi hgi-stroke icon"></i>
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
                            <div class="nds-alert nds-card" data-status="info">
                                <span class="nds-feedback nds-alert-icon nds-outline">
                                    <span class="nds-feedback-icon">
                                        <i class="hgi hgi-stroke icon"></i>
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
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
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
<div class="nds-alert nds-card" data-status="info">
  <span class="nds-feedback nds-alert-icon nds-outline">
    <span class="nds-feedback-icon">
      <i class="hgi hgi-stroke icon"></i>
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
                            <div class="nds-alert nds-card" data-status="warning">
                                <span class="nds-feedback nds-alert-icon nds-outline">
                                    <span class="nds-feedback-icon">
                                        <i class="hgi hgi-stroke icon"></i>
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
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
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
<div class="nds-alert nds-card" data-status="warning">
  <span class="nds-feedback nds-alert-icon nds-outline">
    <span class="nds-feedback-icon">
      <i class="hgi hgi-stroke icon"></i>
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
                            <div class="nds-alert nds-card" data-status="error">
                                <span class="nds-feedback nds-alert-icon nds-outline">
                                    <span class="nds-feedback-icon">
                                        <i class="hgi hgi-stroke icon"></i>
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
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
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
<div class="nds-alert nds-card" data-status="error">
  <span class="nds-feedback nds-alert-icon nds-outline">
    <span class="nds-feedback-icon">
      <i class="hgi hgi-stroke icon"></i>
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
            <div class="nds-showcase">
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
                            <div class="nds-alert nds-card" data-status="info">
                                <span class="nds-feedback nds-alert-icon nds-outline">
                                    <span class="nds-feedback-icon">
                                        <i class="hgi hgi-stroke icon"></i>
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
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
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
<div class="nds-alert nds-card" data-status="info">
  <span class="nds-feedback nds-alert-icon nds-outline">
    <span class="nds-feedback-icon">
      <i class="hgi hgi-stroke icon"></i>
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
            <div class="nds-showcase">
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
                            <div class="nds-alert nds-card" data-status="neutral">
                                <span class="nds-feedback nds-alert-icon nds-outline">
                                    <span class="nds-feedback-icon">
                                        <i class="hgi hgi-stroke icon"></i>
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
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
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
<div class="nds-alert nds-card" data-status="neutral">
  <span class="nds-feedback nds-alert-icon nds-outline">
    <span class="nds-feedback-icon">
      <i class="hgi hgi-stroke icon"></i>
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
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Dynamic Alert Demo</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                                data-toggler='["data-status=success", ".nds-demo-alert", "alertVariant", "attr"]'>
                                <span class="label">Success</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["data-status=warning", ".nds-demo-alert", "alertVariant", "attr"]'>
                                <span class="label">Warning</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["data-status=error", ".nds-demo-alert", "alertVariant", "attr"]'>
                                <span class="label">Error</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["data-status=info", ".nds-demo-alert", "alertVariant", "attr"]'>
                                <span class="label">Info</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["data-status=neutral", ".nds-demo-alert", "alertVariant", "attr"]'>
                                <span class="label">Neutral</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-color", ".nds-demo-alert", "alertColor"]'>
                                <span class="label">Color</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo"
                            style="display: flex; flex-direction: column; align-items: center; gap: var(--spacing-lg); padding: var(--spacing-2xl);">
                            <button class="nds-btn nds-primary nds-lg demo-action-btn" data-action="alert-create">
                                <span class="label">Create Alert</span>
                            </button>
                            <button class="nds-btn nds-subtle nds-md"
                                onclick="NDSAlert.dismissAll('#demo-alert-container')">
                                <span class="label">Clear All</span>
                            </button>
                            <div id="demo-alert-container" class="nds-alert-container" style="width:100%;"></div>
                        </div>
                    </div>
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-programmatic-html" id="tab-programmatic-html">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                    aria-controls="panel-programmatic-js" id="tab-programmatic-js">
                                    <span class="nds-tab-label">JavaScript</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-programmatic-html"
                                aria-labelledby="tab-programmatic-html">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
<div class="nds-alert nds-card" data-status="success" role="alert">
    <span class="nds-feedback nds-alert-icon nds-outline">
        <span class="nds-feedback-icon">
            <i class="hgi hgi-stroke icon"></i>
        </span>
    </span>
    <div class="nds-alert-content">
        <h4 class="nds-alert-title">Success</h4>
        <p class="nds-alert-description">Operation completed successfully!</p>
    </div>
    <button class="nds-btn nds-subtle nds-icon-only nds-md nds-alert-close" aria-label="Close">
        <i class="hgi hgi-stroke hgi-cancel-01"></i>
    </button>
</div>
                                </code>
                            </div>
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-programmatic-js"
                                aria-labelledby="tab-programmatic-js" hidden>
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-javascript code">NDSAlert.create({
    variant: 'success',
    title: 'Success',
    description: 'Operation completed successfully!',
    target: '#alert-container',
    color: false,
    prepend: true
});</code>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Toast Notification Demo -->
<section id="toastDemo" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Toast Notifications</h2>
            <p class="nds-section-description">Floating notifications that appear at the top or bottom of the viewport
            </p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Toast Demo</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                                data-toggler='["data-status=success", ".nds-alert", "toastVariant", "attr"]'>
                                <span class="label">Success</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["data-status=warning", ".nds-alert", "toastVariant", "attr"]'>
                                <span class="label">Warning</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["data-status=error", ".nds-alert", "toastVariant", "attr"]'>
                                <span class="label">Error</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["data-status=info", ".nds-alert", "toastVariant", "attr"]'>
                                <span class="label">Info</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["data-position=bottom", ".nds-alert", "toastPosition", "attr"]'>
                                <span class="label">Bottom</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-color", ".nds-alert", "toastColor"]'>
                                <span class="label">Color</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo"
                            style="display: flex; flex-direction: column; align-items: center; gap: var(--spacing-lg); padding: var(--spacing-2xl);">
                            <button class="nds-btn nds-primary nds-lg demo-action-btn" data-action="toast-show">
                                <span class="label">Show Toast</span>
                            </button>
                            <p style="text-align: center; color: var(--text-subdued); margin: 0;">Toggle variant and
                                position above, then click the button to preview</p>
                        </div>
                    </div>
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-toast-html" id="tab-toast-html">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                    aria-controls="panel-toast-js" id="tab-toast-js">
                                    <span class="nds-tab-label">JavaScript</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-toast-html"
                                aria-labelledby="tab-toast-html">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
                                    <div class="nds-alert nds-card nds-toast nds-shadow"  data-status="success" role="alert" data-position="top" data-toast-state="show" hidden>
                                        <span class="nds-feedback nds-alert-icon nds-outline">
                                            <span class="nds-feedback-icon">
                                                <i class="hgi hgi-stroke icon"></i>
                                            </span>
                                        </span>
                                        <div class="nds-alert-content">
                                            <h4 class="nds-alert-title">Success</h4>
                                            <p class="nds-alert-description">Changes saved successfully!</p>
                                        </div>
                                        <button class="nds-btn nds-subtle nds-icon-only nds-md nds-alert-close nds-progress" aria-label="Close" style="--progress-duration: 4000ms;">
                                            <i class="hgi hgi-stroke hgi-cancel-01"></i>
                                            <div class="nds-progress-circle">
                                                <svg width="100%" height="100%" viewBox="0 0 24 24">
                                                    <circle class="progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="2"></circle>
                                                    <circle class="progress-bar" cx="12" cy="12" r="10" fill="none" stroke-width="2" stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round"></circle>
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                </code>
                            </div>
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-toast-js"
                                aria-labelledby="tab-toast-js" hidden>
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-javascript code">NDSAlert.create({
    variant: 'success',
    title: 'Success',
    description: 'Changes saved successfully!',
    toast: true,
    position: 'top',
    duration: 4000,
    shadow: true,
    color: false
});</code>
                            </div>
                        </div>
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
                <div class="nds-expandable-content">
                    <code class="lang-javascript line-numbers">
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
    shadow: true,
    color: true,
    id: 'update-alert',
    prepend: false,
    actions: [
        { label: 'Update Now', variant: 'primary', onClick: () => handleUpdate() },
        { label: 'Later', variant: 'subtle', dismiss: true }
    ]
});
                </code>
                </div>
            </div>

            <h3>Options Reference</h3>

            <p>The <strong>create()</strong> method accepts the following options:</p>

            <table class="nds-table nds-responsive" style="--min-width:800px;">
                <thead>
                    <tr>
                        <th>Option</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Default</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>variant</td>
                        <td>string</td>
                        <td>Alert type: 'success', 'warning', 'error', 'info', or 'neutral'</td>
                        <td>'info'</td>
                    </tr>
                    <tr>
                        <td>title</td>
                        <td>string</td>
                        <td>Alert title text</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>description</td>
                        <td>string</td>
                        <td>Alert description/message text. Required for meaningful alerts</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>target</td>
                        <td>string | Element</td>
                        <td>CSS selector or DOM element where the alert will be inserted</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>closable</td>
                        <td>boolean</td>
                        <td>Whether to show the close button</td>
                        <td>true</td>
                    </tr>
                    <tr>
                        <td>shadow</td>
                        <td>boolean</td>
                        <td>Add shadow effect to the alert (adds nds-shadow class)</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>color</td>
                        <td>boolean</td>
                        <td>Add color variant styling (adds nds-color class)</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>id</td>
                        <td>string</td>
                        <td>Custom ID for the alert element</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>prepend</td>
                        <td>boolean</td>
                        <td>If true, insert at the beginning of the target; if false, append</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>toast</td>
                        <td>boolean</td>
                        <td>Display as toast notification with fixed positioning</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>position</td>
                        <td>string</td>
                        <td>Toast position: 'top' or 'bottom'. Only applies when toast is true</td>
                        <td>'top'</td>
                    </tr>
                    <tr>
                        <td>duration</td>
                        <td>number</td>
                        <td>Auto-dismiss duration in milliseconds. Set to 0 for no auto-dismiss</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>actions</td>
                        <td>Array</td>
                        <td>Array of action button objects. See Actions section below</td>
                        <td>-</td>
                    </tr>
                </tbody>
            </table>

            <h3>Action Buttons</h3>

            <p>Each action in the <strong>actions</strong> array is an object with the following properties:</p>

            <table class="nds-table nds-responsive" style="--min-width:800px;">
                <thead>
                    <tr>
                        <th>Property</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Default</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>label</td>
                        <td>string</td>
                        <td>Button text label. Required</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>variant</td>
                        <td>string</td>
                        <td>Button style variant: 'primary', 'subtle', etc.</td>
                        <td>'subtle'</td>
                    </tr>
                    <tr>
                        <td>size</td>
                        <td>string</td>
                        <td>Button size: 'sm', 'md', 'lg'</td>
                        <td>'sm'</td>
                    </tr>
                    <tr>
                        <td>onClick</td>
                        <td>function</td>
                        <td>Callback function when button is clicked. Receives the alert element as argument</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>dismiss</td>
                        <td>boolean</td>
                        <td>If true, automatically dismiss the alert after onClick</td>
                        <td>false</td>
                    </tr>
                </tbody>
            </table>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <div class="nds-expandable-content">
                    <code class="lang-javascript line-numbers">
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
                <div class="nds-expandable-content">
                    <code class="lang-javascript line-numbers">
// Basic alert creation
NDSAlert.create({
    variant: 'success',
    description: 'Changes saved successfully!',
    target: '#container'
});

NDSAlert.create({
    variant: 'warning',
    description: 'Session expires in 5 minutes.',
    target: '#container'
});

NDSAlert.create({
    variant: 'error',
    description: 'Failed to submit form.',
    target: '#container'
});

NDSAlert.create({
    variant: 'info',
    description: 'New update available.',
    target: '#container'
});

NDSAlert.create({
    variant: 'neutral',
    description: 'This is a neutral message.',
    target: '#container'
});

// With additional options
NDSAlert.create({
    variant: 'success',
    description: 'Item created!',
    target: '#container',
    title: 'Success',
    closable: true,
    prepend: true
});
                </code>
                </div>
            </div>

            <h3>Toast Notifications</h3>

            <p>Use the <strong>toast</strong> option to display alerts as floating toast notifications. Toasts are
                fixed-positioned, centered horizontally, and appear below the navigation bar at the top or at the bottom
                of the viewport. They can auto-dismiss after a specified duration.</p>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <div class="nds-expandable-content">
                    <code class="lang-javascript line-numbers">
// Basic toast at top (default)
NDSAlert.create({
    variant: 'success',
    description: 'Changes saved!',
    toast: true,
    duration: 3000  // Auto-dismiss after 3 seconds
});

// Toast at bottom
NDSAlert.create({
    variant: 'error',
    description: 'Connection failed',
    toast: true,
    position: 'bottom',
    duration: 5000
});

// Toast without auto-dismiss
NDSAlert.create({
    variant: 'info',
    description: 'New message received',
    toast: true,
    title: 'Notification',
    closable: true
});

// Toast with shadow and color
NDSAlert.create({
    variant: 'warning',
    description: 'Your session will expire soon',
    toast: true,
    position: 'top',
    shadow: true,
    color: true,
    duration: 4000
});
                </code>
                </div>
            </div>

            <h3>Dismissing Alerts</h3>

            <p>Use <strong>NDSAlert.dismiss()</strong> to remove a single alert, or
                <strong>NDSAlert.dismissAll()</strong> to remove all alerts within a container.
            </p>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <div class="nds-expandable-content">
                    <code class="lang-javascript line-numbers">
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
                <div class="nds-expandable-content">
                    <code class="lang-javascript line-numbers">
// Re-initialize alerts after dynamic content load
document.getElementById('container').innerHTML = alertHtml;
NDSAlert.init();
                </code>
                </div>
            </div>

            <h3>Complete Example</h3>

            <p>Here's a practical example showing how to use the Alert API in a form submission scenario:</p>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <div class="nds-expandable-content">
                    <code class="lang-javascript line-numbers">
async function handleFormSubmit(form) {
    const alertContainer = document.getElementById('form-alerts');

    // Clear previous alerts
    NDSAlert.dismissAll(alertContainer);

    try {
        const response = await submitForm(form);

        if (response.success) {
            NDSAlert.create({
                variant: 'success',
                description: 'Form submitted successfully!',
                target: alertContainer,
                title: 'Success',
                prepend: true
            });
        } else {
            NDSAlert.create({
                variant: 'error',
                description: response.message,
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
        NDSAlert.create({
            variant: 'error',
            description: 'An unexpected error occurred.',
            target: alertContainer,
            title: 'Error'
        });
    }
}
                </code>
                </div>
            </div>

        </div>
    </div>
</section>