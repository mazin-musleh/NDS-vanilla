---
layout: page
title: Feedback Icons
hero_title: Feedback Icon Components - National Design System
hero_description: Circular status icons with predefined content for system feedback and user interface states
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Feedback Icons Overview -->
<section id="feedbackIconsOverview" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Feedback Icon Styles</h2>
            <p class="nds-section-description">All Feedback icon styles available in the National Design System</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Success Feedback Icon</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-ring", ".nds-feedback", "iconVariant"]'>
                                <span class="label">Ring</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-outline", ".nds-feedback", "iconVariant"]'>
                                <span class="label">Outline</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-sm", ".nds-feedback", "iconSize"]'>
                                <span class="label">SM</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle selected demo-toggle-btn"
                                data-toggler='["nds-md", ".nds-feedback", "iconSize"]'>
                                <span class="label">MD</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-lg", ".nds-feedback", "iconSize"]'>
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
                            <span class="nds-feedback nds-md" data-status="success">
                                <span class="nds-feedback-icon">
                                    <i class="hgi hgi-stroke icon"></i>
                                </span>
                            </span>
                        </div>
                    </div>
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-success-html" id="tab-success-html">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                    aria-controls="panel-success-js" id="tab-success-js">
                                    <span class="nds-tab-label">JavaScript</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-success-html"
                                aria-labelledby="tab-success-html">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
<span class="nds-feedback nds-md" data-status="success">
  <span class="nds-feedback-icon">
    <i class="hgi hgi-stroke icon"></i>
  </span>
</span>
                                </code>
                            </div>
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-success-js"
                                aria-labelledby="tab-success-js" hidden>
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-javascript code">NDSFeedback.create({
    status: 'success',
    target: '#container',
    size: 'md',
    style: ''
});</code>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Info Feedback Icon</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-ring", ".nds-feedback", "iconVariant"]'>
                                <span class="label">Ring</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-outline", ".nds-feedback", "iconVariant"]'>
                                <span class="label">Outline</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-sm", ".nds-feedback", "iconSize"]'>
                                <span class="label">SM</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle selected demo-toggle-btn"
                                data-toggler='["nds-md", ".nds-feedback", "iconSize"]'>
                                <span class="label">MD</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-lg", ".nds-feedback", "iconSize"]'>
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
                            <span class="nds-feedback nds-md" data-status="info">
                                <span class="nds-feedback-icon">
                                    <i class="hgi hgi-stroke icon"></i>
                                </span>
                            </span>
                        </div>
                    </div>
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-info-html" id="tab-info-html">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                    aria-controls="panel-info-js" id="tab-info-js">
                                    <span class="nds-tab-label">JavaScript</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-info-html"
                                aria-labelledby="tab-info-html">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
<span class="nds-feedback nds-md" data-status="info">
  <span class="nds-feedback-icon">
    <i class="hgi hgi-stroke icon"></i>
  </span>
</span>
                                </code>
                            </div>
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-info-js"
                                aria-labelledby="tab-info-js" hidden>
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-javascript code">NDSFeedback.create({
    status: 'info',
    target: '#container',
    size: 'md',
    style: ''
});</code>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Warning Feedback Icon</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-ring", ".nds-feedback", "iconVariant"]'>
                                <span class="label">Ring</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-outline", ".nds-feedback", "iconVariant"]'>
                                <span class="label">Outline</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-sm", ".nds-feedback", "iconSize"]'>
                                <span class="label">SM</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle selected demo-toggle-btn"
                                data-toggler='["nds-md", ".nds-feedback", "iconSize"]'>
                                <span class="label">MD</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-lg", ".nds-feedback", "iconSize"]'>
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
                            <span class="nds-feedback nds-md" data-status="warning">
                                <span class="nds-feedback-icon">
                                    <i class="hgi hgi-stroke icon"></i>
                                </span>
                            </span>
                        </div>
                    </div>
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-warning-html" id="tab-warning-html">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                    aria-controls="panel-warning-js" id="tab-warning-js">
                                    <span class="nds-tab-label">JavaScript</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-warning-html"
                                aria-labelledby="tab-warning-html">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
<span class="nds-feedback nds-md" data-status="warning">
  <span class="nds-feedback-icon">
    <i class="hgi hgi-stroke icon"></i>
  </span>
</span>
                                </code>
                            </div>
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-warning-js"
                                aria-labelledby="tab-warning-js" hidden>
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-javascript code">NDSFeedback.create({
    status: 'warning',
    target: '#container',
    size: 'md',
    style: ''
});</code>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Error Feedback Icon</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-ring", ".nds-feedback", "iconVariant"]'>
                                <span class="label">Ring</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-outline", ".nds-feedback", "iconVariant"]'>
                                <span class="label">Outline</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-sm", ".nds-feedback", "iconSize"]'>
                                <span class="label">SM</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle selected demo-toggle-btn"
                                data-toggler='["nds-md", ".nds-feedback", "iconSize"]'>
                                <span class="label">MD</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-lg", ".nds-feedback", "iconSize"]'>
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
                            <span class="nds-feedback nds-md" data-status="error">
                                <span class="nds-feedback-icon">
                                    <i class="hgi hgi-stroke icon"></i>
                                </span>
                            </span>
                        </div>
                    </div>
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-error-html" id="tab-error-html">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                    aria-controls="panel-error-js" id="tab-error-js">
                                    <span class="nds-tab-label">JavaScript</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-error-html"
                                aria-labelledby="tab-error-html">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
<span class="nds-feedback nds-md" data-status="error">
  <span class="nds-feedback-icon">
    <i class="hgi hgi-stroke icon"></i>
  </span>
</span>
                                </code>
                            </div>
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-error-js"
                                aria-labelledby="tab-error-js" hidden>
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-javascript code">NDSFeedback.create({
    status: 'error',
    target: '#container',
    size: 'md',
    style: ''
});</code>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Neutral Feedback Icon</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-ring", ".nds-feedback", "iconVariant"]'>
                                <span class="label">Ring</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-outline", ".nds-feedback", "iconVariant"]'>
                                <span class="label">Outline</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-sm", ".nds-feedback", "iconSize"]'>
                                <span class="label">SM</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle selected demo-toggle-btn"
                                data-toggler='["nds-md", ".nds-feedback", "iconSize"]'>
                                <span class="label">MD</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-lg", ".nds-feedback", "iconSize"]'>
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
                            <span class="nds-feedback nds-md" data-status="neutral">
                                <span class="nds-feedback-icon">
                                    <i class="hgi hgi-stroke icon"></i>
                                </span>
                            </span>
                        </div>
                    </div>
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-neutral-html" id="tab-neutral-html">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                    aria-controls="panel-neutral-js" id="tab-neutral-js">
                                    <span class="nds-tab-label">JavaScript</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-neutral-html"
                                aria-labelledby="tab-neutral-html">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
<span class="nds-feedback nds-md" data-status="neutral">
  <span class="nds-feedback-icon">
    <i class="hgi hgi-stroke icon"></i>
  </span>
</span>
                                </code>
                            </div>
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-neutral-js"
                                aria-labelledby="tab-neutral-js" hidden>
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-javascript code">NDSFeedback.create({
    status: 'neutral',
    target: '#container',
    size: 'md',
    style: ''
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

<!-- Feedback Messages -->
<section id="feedbackMessages" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Feedback Messages</h2>
            <p class="nds-section-description">Complete feedback components with icons and text messages</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">

                <!-- Error Feedback Message -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Error Message</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-ring", ".nds-feedback", "iconVariant"]'>
                                <span class="label">Ring</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                                data-toggler='["nds-outline", ".nds-feedback", "iconVariant"]'>
                                <span class="label">Outline</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <span class="nds-feedback nds-outline nds-sm" data-status="error">
                                <span class="nds-feedback-icon">
                                    <i class="hgi hgi-stroke icon"></i>
                                </span>
                                <span class="nds-feedback-message">This field is required</span>
                            </span>
                        </div>
                    </div>
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-error-msg-html" id="tab-error-msg-html">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                    aria-controls="panel-error-msg-js" id="tab-error-msg-js">
                                    <span class="nds-tab-label">JavaScript</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-error-msg-html"
                                aria-labelledby="tab-error-msg-html">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
<span class="nds-feedback nds-outline nds-sm" data-status="error">
  <span class="nds-feedback-icon">
    <i class="hgi hgi-stroke icon"></i>
  </span>
  <span class="nds-feedback-message">This field is required</span>
</span>
                                </code>
                            </div>
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-error-msg-js"
                                aria-labelledby="tab-error-msg-js" hidden>
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-javascript code">NDSFeedback.create({
    message: 'This field is required',
    status: 'error',
    target: '#container',
    style: 'outline',
    size: 'sm'
});</code>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

                <!-- Success Feedback Message -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Success Message</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-ring", ".nds-feedback", "iconVariant"]'>
                                <span class="label">Ring</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                                data-toggler='["nds-outline", ".nds-feedback", "iconVariant"]'>
                                <span class="label">Outline</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <span class="nds-feedback nds-outline nds-sm" data-status="success">
                                <span class="nds-feedback-icon">
                                    <i class="hgi hgi-stroke icon"></i>
                                </span>
                                <span class="nds-feedback-message">Form submitted successfully</span>
                            </span>
                        </div>
                    </div>
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-success-msg-html" id="tab-success-msg-html">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                    aria-controls="panel-success-msg-js" id="tab-success-msg-js">
                                    <span class="nds-tab-label">JavaScript</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-success-msg-html"
                                aria-labelledby="tab-success-msg-html">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
<span class="nds-feedback nds-outline nds-sm" data-status="success">
  <span class="nds-feedback-icon">
    <i class="hgi hgi-stroke icon"></i>
  </span>
  <span class="nds-feedback-message">Form submitted successfully</span>
</span>
                                </code>
                            </div>
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-success-msg-js"
                                aria-labelledby="tab-success-msg-js" hidden>
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-javascript code">NDSFeedback.create({
    message: 'Form submitted successfully',
    status: 'success',
    target: '#container',
    style: 'outline',
    size: 'sm'
});</code>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

                <!-- Warning Feedback Message -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Warning Message</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-ring", ".nds-feedback", "iconVariant"]'>
                                <span class="label">Ring</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                                data-toggler='["nds-outline", ".nds-feedback", "iconVariant"]'>
                                <span class="label">Outline</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <span class="nds-feedback nds-outline nds-sm" data-status="warning">
                                <span class="nds-feedback-icon">
                                    <i class="hgi hgi-stroke icon"></i>
                                </span>
                                <span class="nds-feedback-message">This action cannot be undone</span>
                            </span>
                        </div>
                    </div>
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-warning-msg-html" id="tab-warning-msg-html">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                    aria-controls="panel-warning-msg-js" id="tab-warning-msg-js">
                                    <span class="nds-tab-label">JavaScript</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-warning-msg-html"
                                aria-labelledby="tab-warning-msg-html">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
<span class="nds-feedback nds-outline nds-sm" data-status="warning">
  <span class="nds-feedback-icon">
    <i class="hgi hgi-stroke icon"></i>
  </span>
  <span class="nds-feedback-message">This action cannot be undone</span>
</span>
                                </code>
                            </div>
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-warning-msg-js"
                                aria-labelledby="tab-warning-msg-js" hidden>
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-javascript code">NDSFeedback.create({
    message: 'This action cannot be undone',
    status: 'warning',
    target: '#container',
    style: 'outline',
    size: 'sm'
});</code>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

                <!-- Info Feedback Message -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Info Message</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-ring", ".nds-feedback", "iconVariant"]'>
                                <span class="label">Ring</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                                data-toggler='["nds-outline", ".nds-feedback", "iconVariant"]'>
                                <span class="label">Outline</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <span class="nds-feedback nds-outline nds-sm" data-status="info">
                                <span class="nds-feedback-icon">
                                    <i class="hgi hgi-stroke icon"></i>
                                </span>
                                <span class="nds-feedback-message">Additional information available</span>
                            </span>
                        </div>
                    </div>
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-info-msg-html" id="tab-info-msg-html">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                    aria-controls="panel-info-msg-js" id="tab-info-msg-js">
                                    <span class="nds-tab-label">JavaScript</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-info-msg-html"
                                aria-labelledby="tab-info-msg-html">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
<span class="nds-feedback nds-outline nds-sm" data-status="info">
  <span class="nds-feedback-icon">
    <i class="hgi hgi-stroke icon"></i>
  </span>
  <span class="nds-feedback-message">Additional information available</span>
</span>
                                </code>
                            </div>
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-info-msg-js"
                                aria-labelledby="tab-info-msg-js" hidden>
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-javascript code">NDSFeedback.create({
    message: 'Additional information available',
    status: 'info',
    target: '#container',
    style: 'outline',
    size: 'sm'
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

<!-- Permanent Feedback -->
<section id="permanentFeedback" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Permanent Feedback</h2>
            <p class="nds-section-description">Persistent hints and tips that survive status changes and are restored automatically</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">

                <!-- Permanent via JS API -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Permanent Feedback (JS API)</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div id="permanent-js-demo" style="min-height: 32px;"></div>
                        </div>
                        <script>
                            document.addEventListener('DOMContentLoaded', function() {
                                NDSFeedback.create({
                                    message: 'This hint persists across status changes',
                                    status: 'neutral',
                                    target: '#permanent-js-demo',
                                    size: 'sm',
                                    style: 'outline',
                                    permanent: true
                                });
                            });
                        </script>
                    </div>
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-perm-js" id="tab-perm-js">
                                    <span class="nds-tab-label">JavaScript</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                    aria-controls="panel-perm-html" id="tab-perm-html">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-perm-js"
                                aria-labelledby="tab-perm-js">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-javascript code">// Create permanent feedback via JS
NDSFeedback.create({
    message: 'This hint persists across status changes',
    status: 'neutral',
    target: '#container',
    size: 'sm',
    style: 'outline',
    permanent: true
});

// Or via Forms API
NDS.Forms.setStatus({
    element: element,
    status: 'neutral',
    message: 'Hint text',
    permanent: true
});</code>
                            </div>
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-perm-html"
                                aria-labelledby="tab-perm-html" hidden>
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
&lt;!-- Static permanent feedback in HTML --&gt;
&lt;span class="nds-feedback nds-sm nds-outline"
      data-permanent data-status="neutral"&gt;
  &lt;span class="nds-feedback-message"&gt;
    This hint persists across status changes
  &lt;/span&gt;
&lt;/span&gt;</code>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

                <!-- Permanent + Dynamic Lifecycle -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Permanent + Dynamic Lifecycle</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo" style="flex-direction: column; align-items: stretch; gap: var(--spacing-md);">
                            <div id="permanent-lifecycle-demo" style="min-height: 32px;"></div>
                            <div style="display: flex; gap: var(--spacing-sm);">
                                <button class="nds-btn nds-sm nds-destructive-outline" id="perm-error-btn">
                                    <span class="label">Show Error</span>
                                </button>
                                <button class="nds-btn nds-sm nds-success-outline" id="perm-success-btn">
                                    <span class="label">Show Success</span>
                                </button>
                                <button class="nds-btn nds-sm nds-subtle" id="perm-clear-btn">
                                    <span class="label">Clear</span>
                                </button>
                            </div>
                        </div>
                        <script>
                            document.addEventListener('DOMContentLoaded', function() {
                                var target = document.getElementById('permanent-lifecycle-demo');
                                NDSFeedback.create({
                                    message: 'Permanent hint — try adding an error, then clearing it',
                                    status: 'neutral',
                                    target: target,
                                    size: 'sm',
                                    style: 'outline',
                                    permanent: true
                                });
                                document.getElementById('perm-error-btn').addEventListener('click', function() {
                                    NDSFeedback.create({
                                        message: 'This is an error (permanent hint is hidden)',
                                        status: 'error',
                                        target: target,
                                        size: 'sm',
                                        style: 'outline'
                                    });
                                });
                                document.getElementById('perm-success-btn').addEventListener('click', function() {
                                    NDSFeedback.create({
                                        message: 'Success! (permanent hint is hidden)',
                                        status: 'success',
                                        target: target,
                                        size: 'sm',
                                        style: 'outline'
                                    });
                                });
                                document.getElementById('perm-clear-btn').addEventListener('click', function() {
                                    NDSFeedback.dismissAll(target);
                                });
                            });
                        </script>
                    </div>
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-lifecycle-js" id="tab-lifecycle-js">
                                    <span class="nds-tab-label">JavaScript</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-lifecycle-js"
                                aria-labelledby="tab-lifecycle-js">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-javascript code">// 1. Create permanent hint
NDSFeedback.create({
    message: 'Hint text',
    status: 'neutral',
    target: '#container',
    permanent: true
});

// 2. Show error — permanent is hidden automatically
NDSFeedback.create({
    message: 'Error message',
    status: 'error',
    target: '#container'
});

// 3. Clear all — permanent is restored automatically
NDSFeedback.dismissAll('#container');

// Note: Creating a new permanent replaces the old one</code>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</section>

<!-- NDSFeedback vs Forms.setStatus -->
<section id="createVsSetStatus" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">NDSFeedback.create vs NDS.Forms.setStatus</h2>
            <p class="nds-section-description">Two APIs for different use cases — low-level feedback creation vs form-aware status management</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">NDSFeedback.create — General Purpose</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo" style="flex-direction: column; align-items: stretch; gap: var(--spacing-md);">
                            <div id="create-demo-target" style="min-height: 32px;"></div>
                            <div style="display: flex; gap: var(--spacing-sm); flex-wrap: wrap;">
                                <button class="nds-btn nds-sm nds-info-outline" id="create-info-btn">
                                    <span class="label">Info</span>
                                </button>
                                <button class="nds-btn nds-sm nds-destructive-outline" id="create-error-btn">
                                    <span class="label">Error</span>
                                </button>
                                <button class="nds-btn nds-sm nds-subtle" id="create-clear-btn">
                                    <span class="label">Dismiss</span>
                                </button>
                            </div>
                            <p class="nds-sm" style="color: var(--text-neutral-secondary); margin: 0;">Creates a visual feedback element in any container. No form state, no border styling, no aria-invalid.</p>
                        </div>
                        <script>
                            document.addEventListener('DOMContentLoaded', function() {
                                var target = document.getElementById('create-demo-target');
                                document.getElementById('create-info-btn').addEventListener('click', function() {
                                    NDSFeedback.create({
                                        message: 'Just a visual message — no form state changes',
                                        status: 'info',
                                        target: target,
                                        size: 'sm',
                                        style: 'outline'
                                    });
                                });
                                document.getElementById('create-error-btn').addEventListener('click', function() {
                                    NDSFeedback.create({
                                        message: 'Visual error — no data-status or aria-invalid set',
                                        status: 'error',
                                        target: target,
                                        size: 'sm',
                                        style: 'outline'
                                    });
                                });
                                document.getElementById('create-clear-btn').addEventListener('click', function() {
                                    NDSFeedback.dismissAll(target);
                                });
                            });
                        </script>
                    </div>
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-create-api" id="tab-create-api">
                                    <span class="nds-tab-label">JavaScript</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-create-api"
                                aria-labelledby="tab-create-api">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-javascript code">// Low-level: creates a feedback element in any target
// Does NOT set data-status, data-message, or aria-invalid
NDSFeedback.create({
    message: 'Visual message only',
    status: 'error',
    target: '#any-element',
    size: 'sm',
    style: 'outline'
});

// Dismiss
NDSFeedback.dismissAll('#any-element');</code>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">NDS.Forms.setStatus — Form-Aware</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo" style="flex-direction: column; align-items: stretch; gap: var(--spacing-md);">
                            <div class="nds-form-container" id="setstatus-demo-target">
                                <div class="nds-form-control">
                                    <input type="text" placeholder="Try setting status below">
                                </div>
                            </div>
                            <div style="display: flex; gap: var(--spacing-sm); flex-wrap: wrap;">
                                <button class="nds-btn nds-sm nds-destructive-outline" id="setstatus-error-btn">
                                    <span class="label">Set Error</span>
                                </button>
                                <button class="nds-btn nds-sm nds-success-outline" id="setstatus-success-btn">
                                    <span class="label">Set Success</span>
                                </button>
                                <button class="nds-btn nds-sm nds-subtle" id="setstatus-clear-btn">
                                    <span class="label">Clear Status</span>
                                </button>
                            </div>
                            <p class="nds-sm" style="color: var(--text-neutral-secondary); margin: 0;">Sets data-status on the form container (drives border color), creates feedback, and sets aria-invalid on the input.</p>
                        </div>
                        <script>
                            document.addEventListener('DOMContentLoaded', function() {
                                var container = document.getElementById('setstatus-demo-target');
                                NDS.Forms.setStatus({ element: container, status: 'neutral', message: 'Try setting error or success status', permanent: true });
                                document.getElementById('setstatus-error-btn').addEventListener('click', function() {
                                    NDS.Forms.setStatus({ element: container, status: 'error', message: 'This field is required' });
                                });
                                document.getElementById('setstatus-success-btn').addEventListener('click', function() {
                                    NDS.Forms.setStatus({ element: container, status: 'success', message: 'Looks good!' });
                                });
                                document.getElementById('setstatus-clear-btn').addEventListener('click', function() {
                                    NDS.Forms.clearStatus(container);
                                });
                            });
                        </script>
                    </div>
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-setstatus-api" id="tab-setstatus-api">
                                    <span class="nds-tab-label">JavaScript</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-setstatus-api"
                                aria-labelledby="tab-setstatus-api">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-javascript code">// High-level: form-aware status management
// 1. Sets data-status on container (border color)
// 2. Sets data-message on container
// 3. Creates feedback via NDSFeedback.create internally
// 4. Sets aria-invalid on the input
NDS.Forms.setStatus({
    element: container,
    status: 'error',
    message: 'This field is required'
});

// Supports permanent option
NDS.Forms.setStatus({
    element: container,
    status: 'neutral',
    message: 'Hint',
    permanent: true
});

// Clears data-status, data-message, aria-invalid, and dismisses feedback
NDS.Forms.clearStatus(container);</code>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">When to Use</h3>
                <ul>
                    <li><strong>NDSFeedback.create</strong> — tooltips, notifications, hints on non-form elements (divs, sections, cards). Use when you only need a visual message without form state.</li>
                    <li><strong>NDS.Forms.setStatus</strong> — form validation, input errors, success states on nds-form-container or nds-form-group. Use when the feedback should drive border colors, aria attributes, and integrate with form validation.</li>
                </ul>
            </div>
        </div>
    </div>
</section>

<!-- JavaScript API -->
<section id="jsApi" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">JavaScript API</h2>
            <p class="nds-section-description">Programmatic feedback creation and management</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-content-block">
                <h3 class="nds-block-title">NDSFeedback.create(options)</h3>
                <table class="nds-table nds-sm nds-stroke">
                    <thead>
                        <tr>
                            <th>Option</th>
                            <th>Type</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>message</td>
                            <td>string</td>
                            <td>''</td>
                            <td>Feedback message text. Omit for icon-only feedback.</td>
                        </tr>
                        <tr>
                            <td>status</td>
                            <td>string</td>
                            <td>'info'</td>
                            <td>'error', 'success', 'warning', 'info', 'neutral'</td>
                        </tr>
                        <tr>
                            <td>target</td>
                            <td>string | Element</td>
                            <td>null</td>
                            <td>CSS selector or DOM element to attach feedback to</td>
                        </tr>
                        <tr>
                            <td>position</td>
                            <td>string</td>
                            <td>'append'</td>
                            <td>'before', 'after', 'prepend', 'append'</td>
                        </tr>
                        <tr>
                            <td>size</td>
                            <td>string</td>
                            <td>'sm'</td>
                            <td>'sm', 'md', 'lg'</td>
                        </tr>
                        <tr>
                            <td>style</td>
                            <td>string</td>
                            <td>''</td>
                            <td>'' (default), 'ring', 'outline'</td>
                        </tr>
                        <tr>
                            <td>showIcon</td>
                            <td>boolean</td>
                            <td>true</td>
                            <td>Show or hide the status icon</td>
                        </tr>
                        <tr>
                            <td>permanent</td>
                            <td>boolean</td>
                            <td>false</td>
                            <td>Persist across status changes. Hidden when new non-permanent feedback appears, restored on dismiss. New permanent replaces existing permanent.</td>
                        </tr>
                        <tr>
                            <td>id</td>
                            <td>string</td>
                            <td>null</td>
                            <td>Custom ID for the feedback element</td>
                        </tr>
                        <tr>
                            <td>className</td>
                            <td>string</td>
                            <td>''</td>
                            <td>Additional CSS classes</td>
                        </tr>
                        <tr>
                            <td>ariaLive</td>
                            <td>string</td>
                            <td>null</td>
                            <td>'polite' or 'assertive'. Auto-set based on status if omitted.</td>
                        </tr>
                        <tr>
                            <td>onDismiss</td>
                            <td>Function</td>
                            <td>null</td>
                            <td>Callback when feedback is dismissed</td>
                        </tr>
                        <tr>
                            <td>onCreate</td>
                            <td>Function</td>
                            <td>null</td>
                            <td>Callback after feedback is created</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="nds-content-block">
                <h3 class="nds-block-title">Other Methods</h3>
                <table class="nds-table nds-sm nds-stroke">
                    <thead>
                        <tr>
                            <th>Method</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>NDSFeedback.dismiss(element)</td>
                            <td>Dismiss a single feedback element. Restores any hidden permanent feedback.</td>
                        </tr>
                        <tr>
                            <td>NDSFeedback.dismissAll(container)</td>
                            <td>Dismiss all non-permanent feedback in a container. Restores permanent feedback visibility.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="nds-content-block">
                <h3 class="nds-block-title">Forms Integration</h3>
                <table class="nds-table nds-sm nds-stroke">
                    <thead>
                        <tr>
                            <th>Method</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>NDS.Forms.setStatus({ element, status, message })</td>
                            <td>Set status on a form container. Creates feedback via NDSFeedback internally.</td>
                        </tr>
                        <tr>
                            <td>NDS.Forms.setStatus({ element, status, message, permanent: true })</td>
                            <td>Set permanent status that persists across subsequent status changes.</td>
                        </tr>
                        <tr>
                            <td>NDS.Forms.clearStatus(el)</td>
                            <td>Clear status and dismiss non-permanent feedback. Restores permanent feedback.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="usageGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
            <p class="nds-section-description">Best practices for using feedback icon components</p>
        </div>
        <div class="nds-section-content">
                <div class="nds-content-block">
                    <h3 class="nds-block-title">When to Use</h3>
                    <ul>
                        <li>System status notifications and alerts</li>
                        <li>Form validation and error states</li>
                        <li>Success confirmations and completions</li>
                        <li>Information tooltips and hints</li>
                        <li>Warning messages and cautions</li>
                    </ul>
                </div>
                <div class="nds-content-block">
                    <h3 class="nds-block-title">Status Types</h3>
                    <ul>
                        <li><strong>success:</strong> Checkmark icon with green styling</li>
                        <li><strong>info:</strong> Information icon with blue styling</li>
                        <li><strong>warning:</strong> Alert icon with yellow/orange styling</li>
                        <li><strong>error:</strong> X icon with red styling</li>
                        <li><strong>neutral:</strong> General purpose icon with gray styling</li>
                    </ul>
                </div>
                <div class="nds-content-block">
                    <h3 class="nds-block-title">Size Guidelines</h3>
                    <ul>
                        <li><strong>Small (16px):</strong> Inline text and compact layouts</li>
                        <li><strong>Medium (24px):</strong> Default size for most notifications</li>
                        <li><strong>Large (32px):</strong> Prominent alerts and confirmations</li>
                    </ul>
                </div>
                <div class="nds-content-block">
                    <h3 class="nds-block-title">Ring Variant</h3>
                    <ul>
                        <li>Use ring variant for increased emphasis</li>
                        <li>Ideal for drawing immediate attention</li>
                        <li>Best for critical system messages</li>
                        <li>Provides additional visual weight</li>
                    </ul>
                </div>
        </div>
    </div>
</section>