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