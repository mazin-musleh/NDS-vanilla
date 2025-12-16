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
    <div class="nds-section-content-container">
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
                                <span class="nds-feedback-icon nds-outline nds-alert-icon">
                                    <i class="hgi hgi-solid icon"></i>
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
                    <div class="nds-tabs nds-code withDivider">
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
    <span class="nds-feedback-icon nds-outline nds-alert-icon">
        <i class="hgi hgi-solid icon"></i>
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
                                <span class="nds-feedback-icon nds-outline nds-alert-icon">
                                    <i class="hgi hgi-solid icon"></i>
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
                    <div class="nds-tabs nds-code withDivider">
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
    <span class="nds-feedback-icon nds-outline nds-alert-icon">
        <i class="hgi hgi-solid icon"></i>
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
                                <span class="nds-feedback-icon nds-outline nds-alert-icon">
                                    <i class="hgi hgi-solid icon"></i>
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
                    <div class="nds-tabs nds-code withDivider">
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
    <span class="nds-featured-icon nds-warning nds-sm nds-outline nds-alert-icon">
        <i class="hgi hgi-stroke hgi-alert-02 icon"></i>
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
                                <span class="nds-feedback-icon nds-outline nds-alert-icon">
                                    <i class="hgi hgi-solid icon"></i>
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
                    <div class="nds-tabs nds-code withDivider">
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
    <span class="nds-featured-icon nds-error nds-sm nds-outline nds-alert-icon">
        <i class="hgi hgi-stroke hgi-cancel-circle icon"></i>
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
    <div class="nds-section-content-container">
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
                                <span class="nds-feedback-icon nds-outline nds-alert-icon">
                                    <i class="hgi hgi-solid icon"></i>
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
                    <div class="nds-tabs nds-code withDivider">
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
    <span class="nds-feedback-icon nds-outline nds-alert-icon">
        <i class="hgi hgi-solid icon"></i>
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
    <div class="nds-section-content-container">
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
                                <span class="nds-feedback-icon nds-outline nds-alert-icon">
                                    <i class="hgi hgi-solid icon"></i>
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
                    <div class="nds-tabs nds-code withDivider">
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
    <span class="nds-featured-icon nds-neutral nds-sm nds-outline nds-alert-icon">
        <i class="hgi hgi-stroke hgi-notification-03 icon"></i>
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