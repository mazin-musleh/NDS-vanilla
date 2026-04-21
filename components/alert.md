---
layout: page
title: Alert
hero_title: Alert - National Design System
hero_description: Alert notifications for displaying important messages, warnings, and feedback to users
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Variants -->
<section id="alertOverview" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Variants</h2>
            <p class="nds-section-description">Five status variants communicate different message types through color and icon</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">

                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Success</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["data-status=success", ".nds-alert", "alertVariant", "attr"]'>
                                            <span class="nds-label">Success</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-status=info", ".nds-alert", "alertVariant", "attr"]'>
                                            <span class="nds-label">Info</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-status=warning", ".nds-alert", "alertVariant", "attr"]'>
                                            <span class="nds-label">Warning</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-status=error", ".nds-alert", "alertVariant", "attr"]'>
                                            <span class="nds-label">Error</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-status=neutral", ".nds-alert", "alertVariant", "attr"]'>
                                            <span class="nds-label">Neutral</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-shadow", ".nds-alert", "alertStyle"]'>
                                <span class="nds-label">Shadow</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-color", ".nds-alert", "alertColor"]'>
                                <span class="nds-label">Color</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-alert nds-card" data-status="success" role="alert">
                                <span class="nds-feedback nds-alert-icon nds-outline">
                                    <span class="nds-feedback-icon">
                                        <i class="nds-icon" aria-hidden="true"></i>
                                    </span>
                                </span>
                                <div class="nds-alert-content">
                                    <div class="nds-alert-text">
                                        <span class="nds-alert-title">Success</span>
                                        <p class="nds-alert-description">Operation completed successfully!</p>
                                    </div>
                                </div>
                                <button class="nds-btn nds-subtle nds-icon-only nds-md nds-alert-close"
                                    aria-label="Close alert">
                                    <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-alert-variants-1" id="tab-alert-variants-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-alert-variants-js" id="tab-alert-variants-js">
                                        <span class="nds-tab-label">JS API</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-alert-variants-1"
                                    aria-labelledby="tab-alert-variants-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;div class="nds-alert nds-card" data-status="success" role="alert"&gt;
  &lt;span class="nds-feedback nds-alert-icon nds-outline"&gt;
    &lt;span class="nds-feedback-icon"&gt;
      &lt;i class="nds-icon" aria-hidden="true"&gt;&lt;/i&gt;
    &lt;/span&gt;
  &lt;/span&gt;
  &lt;div class="nds-alert-content"&gt;
    &lt;div class="nds-alert-text"&gt;
      &lt;span class="nds-alert-title"&gt;Success&lt;/span&gt;
      &lt;p class="nds-alert-description"&gt;Operation completed successfully!&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;button class="nds-btn nds-subtle nds-icon-only nds-md nds-alert-close" aria-label="Close alert"&gt;
    &lt;i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"&gt;&lt;/i&gt;
  &lt;/button&gt;
&lt;/div&gt;
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-alert-variants-js"
                                    aria-labelledby="tab-alert-variants-js" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-javascript code">NDS.Alert.create({
    variant: 'success',
    title: 'Success',
    description: 'Operation completed successfully!',
    target: '#alert-container',
    shadow: false,
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

<!-- Layout Variants -->
<section id="alertLayouts" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Inline</h2>
            <p class="nds-section-description">Compact single-line layout with bottom stripe and solid icon</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <!-- Inline Alert -->
                <div class="nds-demo-card">
                    <div class="demo-header">

                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Critical</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-status=success", ".nds-alert", "inlineVariant", "attr"]'>
                                            <span class="nds-label">Success</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-status=neutral", ".nds-alert", "inlineVariant", "attr"]'>
                                            <span class="nds-label">Neutral</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-status=info", ".nds-alert", "inlineVariant", "attr"]'>
                                            <span class="nds-label">Info</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-status=warning", ".nds-alert", "inlineVariant", "attr"]'>
                                            <span class="nds-label">Warning</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-status=error", ".nds-alert", "inlineVariant", "attr"]'>
                                            <span class="nds-label">Error</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["data-status=critical", ".nds-alert", "inlineVariant", "attr"]'>
                                            <span class="nds-label">Critical</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-alert nds-card nds-inline" data-status="critical" role="alert">
                                <span class="nds-feedback nds-alert-icon">
                                    <span class="nds-feedback-icon">
                                        <i class="nds-icon" aria-hidden="true"></i>
                                    </span>
                                </span>
                                <div class="nds-alert-content">
                                    <div class="nds-alert-text">
                                        <span class="nds-alert-title">Important:</span>
                                        <p class="nds-alert-description">This is a very important banner message that requires attention</p>
                                    </div>
                                    <div class="nds-alert-actions">
                                        <a href="#" class="nds-link">Learn More</a>
                                    </div>
                                </div>
                                <button class="nds-btn nds-subtle nds-icon-only nds-md nds-alert-close"
                                    aria-label="Close alert">
                                    <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-alert-inline-1" id="tab-alert-inline-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-alert-inline-js" id="tab-alert-inline-js">
                                        <span class="nds-tab-label">JS API</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-alert-inline-1"
                                    aria-labelledby="tab-alert-inline-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;div class="nds-alert nds-card nds-inline" data-status="critical" role="alert"&gt;
  &lt;span class="nds-feedback nds-alert-icon"&gt;
    &lt;span class="nds-feedback-icon"&gt;
      &lt;i class="nds-icon" aria-hidden="true"&gt;&lt;/i&gt;
    &lt;/span&gt;
  &lt;/span&gt;
  &lt;div class="nds-alert-content"&gt;
    &lt;div class="nds-alert-text"&gt;
      &lt;span class="nds-alert-title"&gt;Important:&lt;/span&gt;
      &lt;p class="nds-alert-description"&gt;This is a very important banner message that requires attention.&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class="nds-alert-actions"&gt;
      &lt;a href="#" class="nds-link"&gt;Learn More&lt;/a&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;button class="nds-btn nds-subtle nds-icon-only nds-md nds-alert-close" aria-label="Close alert"&gt;
    &lt;i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"&gt;&lt;/i&gt;
  &lt;/button&gt;
&lt;/div&gt;
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-alert-inline-js"
                                    aria-labelledby="tab-alert-inline-js" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-javascript code">NDS.Alert.create({
    variant: 'critical',
    title: 'Important:',
    description: 'This is a very important banner message that requires attention.',
    display: 'inline',
    target: '#alert-container',
    actions: [
        { label: 'Learn More', href: '#', class: 'nds-link' }
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

<!-- Alert with Actions -->
<section id="alertWithActions" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">With Actions</h2>
            <p class="nds-section-description">Action buttons let users respond directly from the notification</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">

                        <div class="demo-action">
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-shadow", ".nds-alert","alertActionsStyle"]'>
                                <span class="nds-label">Shadow</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-color", ".nds-alert","alertActionsColor"]'>
                                <span class="nds-label">Color</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-alert nds-card" data-status="info" role="alert">
                                <span class="nds-feedback nds-alert-icon nds-outline">
                                    <span class="nds-feedback-icon">
                                        <i class="nds-icon" aria-hidden="true"></i>
                                    </span>
                                </span>
                                <div class="nds-alert-content">
                                    <div class="nds-alert-text">
                                        <span class="nds-alert-title">Update Available</span>
                                        <p class="nds-alert-description">A new version is available. Would you like to update now?</p>
                                    </div>
                                    <div class="nds-alert-actions">
                                        <button class="nds-btn nds-primary nds-sm">
                                            <span class="nds-label">Update Now</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-sm">
                                            <span class="nds-label">Later</span>
                                        </button>
                                    </div>
                                </div>
                                <button class="nds-btn nds-subtle nds-icon-only nds-md nds-alert-close"
                                    aria-label="Close alert">
                                    <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-alert-actions-1" id="tab-alert-actions-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-alert-actions-js" id="tab-alert-actions-js">
                                        <span class="nds-tab-label">JS API</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-alert-actions-1"
                                    aria-labelledby="tab-alert-actions-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;div class="nds-alert nds-card" data-status="info" role="alert"&gt;
  &lt;span class="nds-feedback nds-alert-icon nds-outline"&gt;
    &lt;span class="nds-feedback-icon"&gt;
      &lt;i class="nds-icon" aria-hidden="true"&gt;&lt;/i&gt;
    &lt;/span&gt;
  &lt;/span&gt;
  &lt;div class="nds-alert-content"&gt;
    &lt;div class="nds-alert-text"&gt;
      &lt;span class="nds-alert-title"&gt;Update Available&lt;/span&gt;
      &lt;p class="nds-alert-description"&gt;A new version is available. Would you like to update now?&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class="nds-alert-actions"&gt;
      &lt;button class="nds-btn nds-primary nds-sm"&gt;
        &lt;span class="nds-label"&gt;Update Now&lt;/span&gt;
      &lt;/button&gt;
      &lt;button class="nds-btn nds-subtle nds-sm"&gt;
        &lt;span class="nds-label"&gt;Later&lt;/span&gt;
      &lt;/button&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;button class="nds-btn nds-subtle nds-icon-only nds-md nds-alert-close" aria-label="Close alert"&gt;
    &lt;i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"&gt;&lt;/i&gt;
  &lt;/button&gt;
&lt;/div&gt;
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-alert-actions-js"
                                    aria-labelledby="tab-alert-actions-js" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-javascript code">NDS.Alert.create({
    variant: 'info',
    title: 'Update Available',
    description: 'A new version is available. Would you like to update now?',
    target: '#alert-container',
    actions: [
        { label: 'Update Now', class: 'nds-btn nds-primary nds-sm', onClick: () =&gt; handleUpdate() },
        { label: 'Later', class: 'nds-btn nds-subtle nds-sm', dismiss: true }
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
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">

                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Success</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["data-status=success", ".nds-alert", "toastVariant", "attr"]'>
                                            <span class="nds-label">Success</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-status=warning", ".nds-alert", "toastVariant", "attr"]'>
                                            <span class="nds-label">Warning</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-status=error", ".nds-alert", "toastVariant", "attr"]'>
                                            <span class="nds-label">Error</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-status=info", ".nds-alert", "toastVariant", "attr"]'>
                                            <span class="nds-label">Info</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["data-position=bottom", ".nds-alert", "toastPosition", "attr"]'>
                                <span class="nds-label">Bottom</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-color", ".nds-alert", "toastColor"]'>
                                <span class="nds-label">Color</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo"
                            style="display: flex; flex-direction: column; align-items: center; gap: var(--spacing-lg); padding: var(--spacing-2xl);">
                            <button class="nds-btn nds-primary nds-lg demo-action-btn" data-action="toast-show">
                                <span class="nds-label">Show Toast</span>
                            </button>
                            <span class="nds-feedback nds-sm nds-outline" data-status="neutral">
                                <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
                                Select a variant and position above, then click the button to preview
                            </span>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-alert-toast-html" id="tab-alert-toast-html">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-alert-toast-js" id="tab-alert-toast-js">
                                        <span class="nds-tab-label">JS API</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-alert-toast-html"
                                    aria-labelledby="tab-alert-toast-html">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;div class="nds-alert-placeholder" data-position="top"&gt;
  &lt;div class="nds-alert nds-card nds-toast nds-shadow" data-status="success" role="alert" data-toast-state="show"&gt;
    &lt;span class="nds-feedback nds-alert-icon nds-outline"&gt;
      &lt;span class="nds-feedback-icon"&gt;
        &lt;i class="nds-icon" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;/span&gt;
    &lt;/span&gt;
    &lt;div class="nds-alert-content"&gt;
      &lt;div class="nds-alert-text"&gt;
        &lt;span class="nds-alert-title"&gt;Success&lt;/span&gt;
        &lt;p class="nds-alert-description"&gt;Changes saved successfully!&lt;/p&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;button class="nds-btn nds-subtle nds-icon-only nds-md nds-alert-close nds-progress" aria-label="Close alert" style="--progress-duration: 4000ms;"&gt;
      &lt;i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;div class="nds-progress-circle"&gt;
        &lt;svg width="100%" height="100%" viewBox="0 0 24 24"&gt;
          &lt;circle class="nds-progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="2"&gt;&lt;/circle&gt;
          &lt;circle class="nds-progress-track" cx="12" cy="12" r="10" fill="none" stroke-width="2" stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round"&gt;&lt;/circle&gt;
        &lt;/svg&gt;
      &lt;/div&gt;
    &lt;/button&gt;
  &lt;/div&gt;
&lt;/div&gt;
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-alert-toast-js"
                                    aria-labelledby="tab-alert-toast-js" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-javascript code">NDS.Alert.create({
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

<!-- Built-in Features -->
<section id="alertFeatures" class="nds-content-section">
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
                    <p class="nds-item-desc">Activates when .nds-alert is on the page. Close button handlers attach automatically.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-colors"></i>
                        <span class="nds-label">Six Status Variants</span>
                    </span>
                    <p class="nds-item-desc">Success, info, warning, error, critical, and neutral with automatic icon and color theming.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-notification-square"></i>
                        <span class="nds-label">Toast Notifications</span>
                    </span>
                    <p class="nds-item-desc">Fixed positioning with auto-dismiss timer and progress indicator.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-minus-sign"></i>
                        <span class="nds-label">Inline Layout</span>
                    </span>
                    <p class="nds-item-desc">Single-line variant for contextual messages with actions pushed to the end.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-api"></i>
                        <span class="nds-label">Programmatic Control</span>
                    </span>
                    <p class="nds-item-desc">Create, dismiss, and bulk-clear alerts through the JS API without writing HTML.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-mobile-programming-01"></i>
                        <span class="nds-label">Responsive Layout</span>
                    </span>
                    <p class="nds-item-desc">Stacks vertically on mobile with stripe repositioned to the top.</p>
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
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use <strong>standard alerts</strong> for important messages that need a title and description within a page section</li>
                    <li>Use <strong>inline alerts</strong> for contextual feedback near a form field or action where space is limited</li>
                    <li>Use <strong>toast notifications</strong> for transient feedback after an action (save, delete, submit) that does not require the user to stay on the page</li>
                    <li>Choose the variant that matches the message severity: <strong>success</strong> for confirmations, <strong>info</strong> for neutral updates, <strong>warning</strong> for caution, <strong>error</strong> for failures, <strong>critical</strong> for system-level emergencies, <strong>neutral</strong> for general notices</li>
                    <li>Do not use alerts for blocking decisions that require user input. Use a <a class="nds-color" href="{{ 'components/modal' | relative_url }}">Modal</a> instead</li>
                    <li>Do not use toast notifications for critical errors or messages that require user action. Toasts can auto-dismiss before the user reads them</li>
                    <li>Prefer alerts over modals for non-blocking feedback. Alerts let users continue working without interruption</li>
                    <li>Add action buttons when the user needs to respond (retry, undo, update) rather than just acknowledge the message</li>
                    <li>Add <code class="nds-inline-code lang-html">nds-color</code> to reinforce severity in high-density layouts where the stripe alone may not stand out</li>
                    <li>Keep alert descriptions to one or two sentences. For longer content, link to a detail page with an action link</li>
                    <li>Set a reasonable <code class="nds-inline-code lang-js">duration</code> for toast notifications (3000-5000 ms). Avoid durations under 2000 ms as users may not have time to read the message</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Class</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">nds-inline</code></td><td>Compact single-line layout with bottom stripe and solid icon</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-toast</code></td><td>Floating notification style with opacity transitions for toast display</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-shadow</code></td><td>Adds elevation shadow to the alert card</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-color</code></td><td>Applies a tinted background matching the status variant</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-status</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-alert</code> to control the variant. Values: <code class="nds-inline-code lang-html">success</code>, <code class="nds-inline-code lang-html">info</code>, <code class="nds-inline-code lang-html">warning</code>, <code class="nds-inline-code lang-html">error</code>, <code class="nds-inline-code lang-html">critical</code>, <code class="nds-inline-code lang-html">neutral</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-position</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-alert-placeholder</code> to position toast containers. Values: <code class="nds-inline-code lang-html">top</code>, <code class="nds-inline-code lang-html">bottom</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-toast-state</code></td><td>Controls toast visibility transitions. Values: <code class="nds-inline-code lang-html">show</code>, <code class="nds-inline-code lang-html">hide</code>. Managed automatically by the JS API</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--alert-stripe</code></td><td><code class="nds-inline-code lang-html">--border-neutral-primary</code></td><td>Color of the side stripe indicator</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--alert-icon-bg</code></td><td><code class="nds-inline-code lang-html">--background-neutral-light</code></td><td>Background color of the feedback icon circle</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDS.Alert</strong> API provides methods to create, display, and dismiss alerts programmatically. For dynamically added HTML alerts, call <strong>NDS.Alert.init()</strong> to re-attach close button handlers.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// ── Create an alert ──────────────────────────────────
// Returns the created HTMLElement
const alert = NDS.Alert.create({
    variant: 'success',       // 'success' | 'warning' | 'error' | 'critical' | 'info' | 'neutral'
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
            class: 'nds-btn nds-primary nds-sm',  // Custom classes (overrides variant/size)
            onClick: (el) =&gt; {},  // Callback, receives the alert element
            dismiss: false,       // Auto-dismiss after click (default: false)
            href: '/url',         // Render as &lt;a&gt; link instead of &lt;button&gt; (optional)
            target: '_blank'      // Link target attribute (optional, requires href)
        }
    ]
});

// ── Create a toast notification ──────────────────────
NDS.Alert.create({
    variant: 'success',
    description: 'Changes saved!',
    display: 'toast',          // 'default' | 'inline' | 'toast'
    position: 'top',          // 'top' | 'bottom' (default: 'top')
    duration: 4000,           // Auto-dismiss in ms, 0 = manual (default: 0)
    shadow: true
});

// ── Dismiss ──────────────────────────────────────────
NDS.Alert.dismiss(alert);               // By element reference
NDS.Alert.dismiss('#my-alert');          // By selector
NDS.Alert.dismissAll('#container');      // All alerts in a container
NDS.Alert.dismissAll(document.body);     // All alerts on page

// ── Re-initialize after dynamic HTML ─────────────────
// Attaches close handlers to any new .nds-alert elements
NDS.Alert.init();
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
