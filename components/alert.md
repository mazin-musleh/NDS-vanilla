---
layout: page
title: Alert
hero_title: Alert Components - National Design System
hero_description: Alert notifications for displaying important messages, warnings, and feedback to users
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Alert Overview -->
<section id="alertOverview" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Alert Variants</h2>
            <p class="nds-section-description">Five status variants communicate different message types through color and icon</p>
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
                        <div class="state-demo">
                            <div class="nds-alert nds-card" data-status="success" role="alert">
                                <span class="nds-feedback nds-alert-icon nds-outline">
                                    <span class="nds-feedback-icon">
                                        <i class="hgi hgi-stroke icon"></i>
                                    </span>
                                </span>
                                <div class="nds-alert-content">
                                    <span class="nds-alert-title">Success</span>
                                    <p class="nds-alert-description">Your changes have been saved successfully.</p>
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
                                        aria-controls="panel-alert-success-1" id="tab-alert-success-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-alert-success-js" id="tab-alert-success-js">
                                        <span class="nds-tab-label">JavaScript</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-alert-success-1"
                                    aria-labelledby="tab-alert-success-1">
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
    <span class="nds-alert-title">Success</span>
    <p class="nds-alert-description">Your changes have been saved successfully.</p>
  </div>
  <button class="nds-btn nds-subtle nds-icon-only nds-md nds-alert-close" aria-label="Close alert">
    <i class="hgi hgi-stroke hgi-cancel-01"></i>
  </button>
</div>
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-alert-success-js"
                                    aria-labelledby="tab-alert-success-js" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-javascript code">NDSAlert.create({
    variant: 'success',
    title: 'Success',
    description: 'Your changes have been saved successfully.',
    target: '#alert-container'
});</code>
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
                        <div class="state-demo">
                            <div class="nds-alert nds-card" data-status="info" role="alert">
                                <span class="nds-feedback nds-alert-icon nds-outline">
                                    <span class="nds-feedback-icon">
                                        <i class="hgi hgi-stroke icon"></i>
                                    </span>
                                </span>
                                <div class="nds-alert-content">
                                    <span class="nds-alert-title">Information</span>
                                    <p class="nds-alert-description">A new software update is available for download.</p>
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
                                        aria-controls="panel-alert-info-1" id="tab-alert-info-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-alert-info-js" id="tab-alert-info-js">
                                        <span class="nds-tab-label">JavaScript</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-alert-info-1"
                                    aria-labelledby="tab-alert-info-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<div class="nds-alert nds-card" data-status="info" role="alert">
  <span class="nds-feedback nds-alert-icon nds-outline">
    <span class="nds-feedback-icon">
      <i class="hgi hgi-stroke icon"></i>
    </span>
  </span>
  <div class="nds-alert-content">
    <span class="nds-alert-title">Information</span>
    <p class="nds-alert-description">A new software update is available for download.</p>
  </div>
  <button class="nds-btn nds-subtle nds-icon-only nds-md nds-alert-close" aria-label="Close alert">
    <i class="hgi hgi-stroke hgi-cancel-01"></i>
  </button>
</div>
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-alert-info-js"
                                    aria-labelledby="tab-alert-info-js" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-javascript code">NDSAlert.create({
    variant: 'info',
    title: 'Information',
    description: 'A new software update is available for download.',
    target: '#alert-container'
});</code>
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
                        <div class="state-demo">
                            <div class="nds-alert nds-card" data-status="warning" role="alert">
                                <span class="nds-feedback nds-alert-icon nds-outline">
                                    <span class="nds-feedback-icon">
                                        <i class="hgi hgi-stroke icon"></i>
                                    </span>
                                </span>
                                <div class="nds-alert-content">
                                    <span class="nds-alert-title">Warning</span>
                                    <p class="nds-alert-description">Your session will expire in 5 minutes. Save your work to avoid losing changes.</p>
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
                                        aria-controls="panel-alert-warning-1" id="tab-alert-warning-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-alert-warning-js" id="tab-alert-warning-js">
                                        <span class="nds-tab-label">JavaScript</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-alert-warning-1"
                                    aria-labelledby="tab-alert-warning-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<div class="nds-alert nds-card" data-status="warning" role="alert">
  <span class="nds-feedback nds-alert-icon nds-outline">
    <span class="nds-feedback-icon">
      <i class="hgi hgi-stroke icon"></i>
    </span>
  </span>
  <div class="nds-alert-content">
    <span class="nds-alert-title">Warning</span>
    <p class="nds-alert-description">Your session will expire in 5 minutes.</p>
  </div>
  <button class="nds-btn nds-subtle nds-icon-only nds-md nds-alert-close" aria-label="Close alert">
    <i class="hgi hgi-stroke hgi-cancel-01"></i>
  </button>
</div>
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-alert-warning-js"
                                    aria-labelledby="tab-alert-warning-js" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-javascript code">NDSAlert.create({
    variant: 'warning',
    title: 'Warning',
    description: 'Your session will expire in 5 minutes.',
    target: '#alert-container'
});</code>
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
                        <div class="state-demo">
                            <div class="nds-alert nds-card" data-status="error" role="alert">
                                <span class="nds-feedback nds-alert-icon nds-outline">
                                    <span class="nds-feedback-icon">
                                        <i class="hgi hgi-stroke icon"></i>
                                    </span>
                                </span>
                                <div class="nds-alert-content">
                                    <span class="nds-alert-title">Error</span>
                                    <p class="nds-alert-description">There was an error processing your request. Please try again.</p>
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
                                        aria-controls="panel-alert-error-1" id="tab-alert-error-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-alert-error-js" id="tab-alert-error-js">
                                        <span class="nds-tab-label">JavaScript</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-alert-error-1"
                                    aria-labelledby="tab-alert-error-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<div class="nds-alert nds-card" data-status="error" role="alert">
  <span class="nds-feedback nds-alert-icon nds-outline">
    <span class="nds-feedback-icon">
      <i class="hgi hgi-stroke icon"></i>
    </span>
  </span>
  <div class="nds-alert-content">
    <span class="nds-alert-title">Error</span>
    <p class="nds-alert-description">There was an error processing your request.</p>
  </div>
  <button class="nds-btn nds-subtle nds-icon-only nds-md nds-alert-close" aria-label="Close alert">
    <i class="hgi hgi-stroke hgi-cancel-01"></i>
  </button>
</div>
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-alert-error-js"
                                    aria-labelledby="tab-alert-error-js" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-javascript code">NDSAlert.create({
    variant: 'error',
    title: 'Error',
    description: 'There was an error processing your request.',
    target: '#alert-container'
});</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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
                            <div class="nds-alert nds-card" data-status="neutral" role="alert">
                                <span class="nds-feedback nds-alert-icon nds-outline">
                                    <span class="nds-feedback-icon">
                                        <i class="hgi hgi-stroke icon"></i>
                                    </span>
                                </span>
                                <div class="nds-alert-content">
                                    <span class="nds-alert-title">Notification</span>
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
                                        aria-controls="panel-alert-neutral-1" id="tab-alert-neutral-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-alert-neutral-js" id="tab-alert-neutral-js">
                                        <span class="nds-tab-label">JavaScript</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-alert-neutral-1"
                                    aria-labelledby="tab-alert-neutral-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<div class="nds-alert nds-card" data-status="neutral" role="alert">
  <span class="nds-feedback nds-alert-icon nds-outline">
    <span class="nds-feedback-icon">
      <i class="hgi hgi-stroke icon"></i>
    </span>
  </span>
  <div class="nds-alert-content">
    <span class="nds-alert-title">Notification</span>
    <p class="nds-alert-description">You have 3 new messages in your inbox.</p>
  </div>
  <button class="nds-btn nds-subtle nds-icon-only nds-md nds-alert-close" aria-label="Close alert">
    <i class="hgi hgi-stroke hgi-cancel-01"></i>
  </button>
</div>
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-alert-neutral-js"
                                    aria-labelledby="tab-alert-neutral-js" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-javascript code">NDSAlert.create({
    variant: 'neutral',
    title: 'Notification',
    description: 'You have 3 new messages in your inbox.',
    target: '#alert-container'
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

<!-- Layout Variants -->
<section id="alertLayouts" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Inline Notification</h2>
            <p class="nds-section-description">Compact single-line alert with bottom stripe and solid icon</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <!-- Inline Alert -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Inline</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["data-status=neutral", ".nds-alert", "inlineVariant", "attr"]'>
                                <span class="label">Neutral</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["data-status=info", ".nds-alert", "inlineVariant", "attr"]'>
                                <span class="label">Info</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["data-status=warning", ".nds-alert", "inlineVariant", "attr"]'>
                                <span class="label">Warning</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                                data-toggler='["data-status=critical", ".nds-alert", "inlineVariant", "attr"]'>
                                <span class="label">Critical</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-alert nds-card nds-inline" data-status="critical" role="alert">
                                <span class="nds-feedback nds-alert-icon">
                                    <span class="nds-feedback-icon">
                                        <i class="hgi hgi-stroke icon"></i>
                                    </span>
                                </span>
                                <div class="nds-alert-content">
                                    <span class="nds-alert-title">Important:</span>
                                    <p class="nds-alert-description">This is a very important banner message that requires attention</p>
                                    <div class="nds-alert-actions">
                                        <button class="nds-btn nds-subtle nds-sm">
                                            <span class="label">Learn More</span>
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
                                        aria-controls="panel-alert-inline-1" id="tab-alert-inline-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-alert-inline-js" id="tab-alert-inline-js">
                                        <span class="nds-tab-label">JavaScript</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-alert-inline-1"
                                    aria-labelledby="tab-alert-inline-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<div class="nds-alert nds-card nds-inline" data-status="critical" role="alert">
  <span class="nds-feedback nds-alert-icon">
    <span class="nds-feedback-icon">
      <i class="hgi hgi-stroke icon"></i>
    </span>
  </span>
  <div class="nds-alert-content">
    <span class="nds-alert-title">Important:</span>
    <p class="nds-alert-description">This is a very important banner message that requires attention.</p>
    <div class="nds-alert-actions">
      <button class="nds-btn nds-subtle nds-sm">
        <span class="label">Learn More</span>
      </button>
    </div>
  </div>
  <button class="nds-btn nds-subtle nds-icon-only nds-md nds-alert-close" aria-label="Close alert">
    <i class="hgi hgi-stroke hgi-cancel-01"></i>
  </button>
</div>
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-alert-inline-js"
                                    aria-labelledby="tab-alert-inline-js" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-javascript code">NDSAlert.create({
    variant: 'critical',
    title: 'Important:',
    description: 'This is a very important banner message that requires attention.',
    display: 'inline',
    target: '#alert-container'
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
                                data-toggler='["nds-shadow", ".nds-alert","alertActionsStyle"]'>
                                <span class="label">Shadow</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-color", ".nds-alert","alertActionsColor"]'>
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
                            <div class="nds-alert nds-card" data-status="info" role="alert">
                                <span class="nds-feedback nds-alert-icon nds-outline">
                                    <span class="nds-feedback-icon">
                                        <i class="hgi hgi-stroke icon"></i>
                                    </span>
                                </span>
                                <div class="nds-alert-content">
                                    <span class="nds-alert-title">Update Available</span>
                                    <p class="nds-alert-description">A new version is available. Would you like to update now?</p>
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
                                        aria-controls="panel-alert-actions-1" id="tab-alert-actions-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-alert-actions-js" id="tab-alert-actions-js">
                                        <span class="nds-tab-label">JavaScript</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-alert-actions-1"
                                    aria-labelledby="tab-alert-actions-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<div class="nds-alert nds-card" data-status="info" role="alert">
  <span class="nds-feedback nds-alert-icon nds-outline">
    <span class="nds-feedback-icon">
      <i class="hgi hgi-stroke icon"></i>
    </span>
  </span>
  <div class="nds-alert-content">
    <span class="nds-alert-title">Update Available</span>
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
  <button class="nds-btn nds-subtle nds-icon-only nds-md nds-alert-close" aria-label="Close alert">
    <i class="hgi hgi-stroke hgi-cancel-01"></i>
  </button>
</div>
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-alert-actions-js"
                                    aria-labelledby="tab-alert-actions-js" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-javascript code">NDSAlert.create({
    variant: 'info',
    title: 'Update Available',
    description: 'A new version is available.',
    target: '#alert-container',
    actions: [
        { label: 'Update Now', variant: 'primary', onClick: () => handleUpdate() },
        { label: 'Later', variant: 'subtle', dismiss: true }
    ]
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
            <p class="nds-section-description">Floating notifications that appear at the top or bottom of the viewport</p>
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
                            <p style="text-align: center; color: var(--text-subdued); margin: 0;">Toggle variant and position above, then click the button to preview</p>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-alert-toast-html" id="tab-alert-toast-html">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-alert-toast-js" id="tab-alert-toast-js">
                                        <span class="nds-tab-label">JavaScript</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-alert-toast-html"
                                    aria-labelledby="tab-alert-toast-html">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<div class="nds-alert-placeholder" data-position="top">
  <div class="nds-alert nds-card nds-toast nds-shadow" data-status="success" role="alert" data-toast-state="show">
    <span class="nds-feedback nds-alert-icon nds-outline">
      <span class="nds-feedback-icon">
        <i class="hgi hgi-stroke icon"></i>
      </span>
    </span>
    <div class="nds-alert-content">
      <span class="nds-alert-title">Success</span>
      <p class="nds-alert-description">Changes saved successfully!</p>
    </div>
    <button class="nds-btn nds-subtle nds-icon-only nds-md nds-alert-close nds-progress" aria-label="Close alert" style="--progress-duration: 4000ms;">
      <i class="hgi hgi-stroke hgi-cancel-01"></i>
      <div class="nds-progress-circle">
        <svg width="100%" height="100%" viewBox="0 0 24 24">
          <circle class="progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="2"></circle>
          <circle class="progress-bar" cx="12" cy="12" r="10" fill="none" stroke-width="2" stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round"></circle>
        </svg>
      </div>
    </button>
  </div>
</div>
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-alert-toast-js"
                                    aria-labelledby="tab-alert-toast-js" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-javascript code">NDSAlert.create({
    variant: 'success',
    title: 'Success',
    description: 'Changes saved successfully!',
    display: 'toast',
    position: 'top',
    duration: 4000,
    shadow: true
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

<!-- Usage Guidelines -->
<section id="alertGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-content">

            <div class="nds-content-block">
                <h3 class="nds-block-title">Built-in Features</h3>
                <p>Auto-initializes when <strong>.nds-alert</strong> is on the page — no JavaScript setup required. The loader attaches close button handlers automatically.</p>
                <ul>
                    <li>Five status variants (success, info, warning, error, neutral) with automatic icon and color theming</li>
                    <li>Close button dismissal with smooth removal from the DOM</li>
                    <li>Toast notifications with fixed positioning, auto-dismiss timer, and progress indicator</li>
                    <li>Responsive layout — stacks vertically on mobile with stripe repositioned to top</li>
                    <li>Dark mode support through design tokens — no extra classes needed</li>
                    <li>Inline layout variant for single-line contextual messages with actions pushed to the end</li>
                    <li>Programmatic creation API for dynamic alerts and toasts</li>
                    <li>Color background variant with solid backdrop to prevent overlap bleed-through</li>
                </ul>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">When to Use</h3>
                <ul>
                    <li>Use <strong>inline alerts</strong> for contextual feedback near a form field or action — single-line layout with actions pushed to the end</li>
                    <li>Use <strong>standard alerts</strong> for important messages that need a title and description within a page section</li>
                    <li>Use <strong>toast notifications</strong> for transient feedback after an action (save, delete, submit) — auto-dismisses after a set duration</li>
                    <li>Choose the variant that matches the message severity: <strong>success</strong> for confirmations, <strong>info</strong> for neutral updates, <strong>warning</strong> for caution, <strong>error</strong> for failures</li>
                    <li>Prefer alerts over modals for non-blocking feedback — alerts let users continue working</li>
                    <li>Add action buttons when the user needs to respond (retry, undo, update) rather than just acknowledge</li>
                </ul>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDSAlert</strong> API provides methods to create, display, and dismiss alerts programmatically. For dynamically added HTML alerts, call <strong>NDSAlert.init()</strong> to re-attach close button handlers.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// ── Create an alert ──────────────────────────────────
// Returns the created HTMLElement
const alert = NDSAlert.create({
    variant: 'success',       // 'success' | 'warning' | 'error' | 'info' | 'neutral'
    title: 'Success',         // Optional heading text
    description: 'Saved.',    // Alert body text
    target: '#container',     // CSS selector or DOM element to insert into
    closable: true,           // Show close button (default: true)
    shadow: false,            // Add nds-shadow class (default: false)
    color: false,             // Add nds-color background (default: false)
    id: 'my-alert',           // Custom element ID (optional)
    prepend: false,           // Insert at start of target (default: false)
    display: 'default',       // 'default' | 'inline' | 'toast'
    actions: [                // Action buttons (optional)
        {
            label: 'Retry',
            variant: 'primary',   // Button style: 'primary', 'subtle', etc.
            size: 'sm',           // Button size: 'sm', 'md', 'lg' (default: 'sm')
            onClick: (el) => {},  // Callback, receives the alert element
            dismiss: false        // Auto-dismiss after click (default: false)
        }
    ]
});

// ── Create a toast notification ──────────────────────
NDSAlert.create({
    variant: 'success',
    description: 'Changes saved!',
    display: 'toast',          // 'default' | 'inline' | 'toast'
    position: 'top',          // 'top' | 'bottom' (default: 'top')
    duration: 4000,           // Auto-dismiss in ms, 0 = manual (default: 0)
    shadow: true
});

// ── Dismiss ──────────────────────────────────────────
NDSAlert.dismiss(alert);               // By element reference
NDSAlert.dismiss('#my-alert');          // By selector
NDSAlert.dismissAll('#container');      // All alerts in a container
NDSAlert.dismissAll(document.body);     // All alerts on page

// ── Re-initialize after dynamic HTML ─────────────────
// Attaches close handlers to any new .nds-alert elements
NDSAlert.init();
                        </code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
