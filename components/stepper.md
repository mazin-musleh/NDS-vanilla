---
layout: page
title: Stepper
hero_title: Stepper - National Design System
hero_description: Step-by-step progress indicators for registration forms, onboarding flows, and service applications, with horizontal, vertical, and radial layouts that can switch responsively across breakpoints
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.9.0"
last_edit: "22/08/2026 - 04:26 AM"
---

<!-- Horizontal Layout -->
<section id="stepperHorizontal" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Horizontal Layout</h2>
            <p class="nds-section-description">The default layout. Steps run start to end with the connecting line between circles. Best for short wizards on wide screens, where every step label fits on one row.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
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
                                                data-toggler='["", "#demo-stepper-horizontal", "stepperSize"]'>
                                                <span class="nds-label">Default</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='["nds-lg", "#demo-stepper-horizontal", "stepperSize"]'>
                                                <span class="nds-label">LG</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='["nds-xl", "#demo-stepper-horizontal", "stepperSize"]'>
                                                <span class="nds-label">XL</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button class="nds-btn nds-subtle demo-toggle-btn"
                                    data-toggler='["nds-dot", "#demo-stepper-horizontal", "stepperDot"]'>
                                    <span class="nds-label">Dot</span>
                                </button>
                                <button class="nds-btn nds-subtle demo-toggle-btn"
                                    data-toggler='["nds-center", "#demo-stepper-horizontal", "stepperCenter"]'>
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
                                <button class="nds-btn nds-subtle demo-toggle-btn"
                                    data-toggler='[["nds-oncolor", "#demo-stepper-horizontal", "containerBg"],["dark-bg", ".demo-container", "containerBg"]]'>
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
                                <div class="nds-stepper" id="demo-stepper-horizontal" data-current="2" data-total="4">
                                    <div class="nds-stepper-step">
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
                                    <div class="nds-stepper-step">
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
                                    <div class="nds-stepper-step">
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
                                    <div class="nds-stepper-step">
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
                            <div class="nds-tabs nds-code nds-divided">
                                <div class="nds-tab-list-container nds-scroll-more">
                                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                            aria-controls="panel-stepper-horizontal-1" id="tab-stepper-horizontal-1">
                                            <span class="nds-tab-label">HTML</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="false"
                                            aria-controls="panel-stepper-horizontal-js" id="tab-stepper-horizontal-js">
                                            <span class="nds-tab-label">JS API</span>
                                        </button>
                                    </nav>
                                    <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="nds-tab-content">
                                    <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                        id="panel-stepper-horizontal-1" aria-labelledby="tab-stepper-horizontal-1">
                                        <div class="nds-code-action">
                                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                                <i class="nds-icon nds-hgi-copy-01"></i>
                                            </button>
                                        </div>
                                        <div class="nds-expandable-content">
                                            <code class="lang-html code">
&lt;div class="nds-stepper" id="demo-stepper-horizontal" data-current="2" data-total="4"&gt;
  &lt;div class="nds-stepper-step"&gt;
    &lt;div class="nds-stepper-base"&gt;
      &lt;div class="nds-stepper-circle" data-step-text="1"&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-stepper-content"&gt;
      &lt;div class="nds-stepper-text"&gt;
        &lt;span class="nds-stepper-title"&gt;Personal Information&lt;/span&gt;
        &lt;span class="nds-stepper-description"&gt;Identity details and contact information&lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-stepper-step"&gt;
    &lt;div class="nds-stepper-base"&gt;
      &lt;div class="nds-stepper-circle" data-step-text="2"&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-stepper-content"&gt;
      &lt;div class="nds-stepper-text"&gt;
        &lt;span class="nds-stepper-title"&gt;Document Upload&lt;/span&gt;
        &lt;span class="nds-stepper-description"&gt;Upload required supporting documents&lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-stepper-step"&gt;
    &lt;div class="nds-stepper-base"&gt;
      &lt;div class="nds-stepper-circle" data-step-text="3"&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-stepper-content"&gt;
      &lt;div class="nds-stepper-text"&gt;
        &lt;span class="nds-stepper-title"&gt;Review &amp; Confirmation&lt;/span&gt;
        &lt;span class="nds-stepper-description"&gt;Verify information before submission&lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-stepper-step"&gt;
    &lt;div class="nds-stepper-base"&gt;
      &lt;div class="nds-stepper-circle" data-step-text="4"&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-stepper-content"&gt;
      &lt;div class="nds-stepper-text"&gt;
        &lt;span class="nds-stepper-title"&gt;Application Submitted&lt;/span&gt;
        &lt;span class="nds-stepper-description"&gt;Confirmation and next steps&lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
</code>
                                        </div>
                                    </div>
                                    <div class="nds-tab-panel code-example" role="tabpanel"
                                        id="panel-stepper-horizontal-js" aria-labelledby="tab-stepper-horizontal-js" hidden>
                                        <div class="nds-code-action">
                                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                                <i class="nds-icon nds-hgi-copy-01"></i>
                                            </button>
                                        </div>
                                        <code class="lang-javascript code">// Inject a stepper dynamically and initialize it
const el = document.getElementById('demo-stepper-horizontal');
const stepper = NDS.Stepper.create(el);

// Navigate programmatically
NDS.Stepper.next('demo-stepper-horizontal');
NDS.Stepper.previous('demo-stepper-horizontal');
NDS.Stepper.goTo('demo-stepper-horizontal', 3);</code>
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

<!-- Vertical Layout -->
<section id="stepperVertical" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Vertical Layout</h2>
            <p class="nds-section-description">Steps run top to bottom. Reach for it when a step carries detailed content or action buttons, or when the column is narrow, such as a sidebar or a drawer.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
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
                                                data-toggler='["", "#demo-stepper-vertical", "stepperSize"]'>
                                                <span class="nds-label">Default</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='["nds-lg", "#demo-stepper-vertical", "stepperSize"]'>
                                                <span class="nds-label">LG</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='["nds-xl", "#demo-stepper-vertical", "stepperSize"]'>
                                                <span class="nds-label">XL</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button class="nds-btn nds-subtle demo-toggle-btn"
                                    data-toggler='["nds-dot", "#demo-stepper-vertical", "stepperDot"]'>
                                    <span class="nds-label">Dot</span>
                                </button>
                                <button class="nds-btn nds-subtle demo-toggle-btn"
                                    data-toggler='["nds-reverse", "#demo-stepper-vertical", "stepperReverse"]'>
                                    <span class="nds-label">Reverse</span>
                                </button>
                                <button class="nds-btn nds-subtle demo-toggle-btn"
                                    data-toggler='["nds-cardView", "#demo-stepper-vertical", "stepperCardView"]'>
                                    <span class="nds-label">Card view</span>
                                </button>
                                <button class="nds-btn nds-subtle" data-stepper-control="previous"
                                    data-stepper-target="demo-stepper-vertical">
                                    <span class="nds-label">← Previous</span>
                                </button>
                                <button class="nds-btn nds-subtle" data-stepper-control="next"
                                    data-stepper-target="demo-stepper-vertical">
                                    <span class="nds-label">Next →</span>
                                </button>
                                <button class="nds-btn nds-subtle demo-toggle-btn"
                                    data-toggler='[["nds-oncolor", "#demo-stepper-vertical", "containerBg"],["dark-bg", ".demo-container", "containerBg"]]'>
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
                                <div class="nds-stepper nds-vertical" id="demo-stepper-vertical" data-current="2" data-total="4">
                                    <div class="nds-stepper-step">
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
                                    <div class="nds-stepper-step">
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
                                    <div class="nds-stepper-step">
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
                                    <div class="nds-stepper-step">
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
                            <div class="nds-tabs nds-code nds-divided">
                                <div class="nds-tab-list-container nds-scroll-more">
                                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                            aria-controls="panel-stepper-vertical-1" id="tab-stepper-vertical-1">
                                            <span class="nds-tab-label">HTML</span>
                                        </button>
                                    </nav>
                                    <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="nds-tab-content">
                                    <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                        id="panel-stepper-vertical-1" aria-labelledby="tab-stepper-vertical-1">
                                        <div class="nds-code-action">
                                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                                <i class="nds-icon nds-hgi-copy-01"></i>
                                            </button>
                                        </div>
                                        <div class="nds-expandable-content">
                                            <code class="lang-html code">
&lt;div class="nds-stepper nds-vertical" id="demo-stepper-vertical" data-current="2" data-total="4"&gt;
  &lt;div class="nds-stepper-step"&gt;
    &lt;div class="nds-stepper-base"&gt;
      &lt;div class="nds-stepper-circle" data-step-text="1"&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-stepper-content"&gt;
      &lt;div class="nds-stepper-text"&gt;
        &lt;span class="nds-stepper-title"&gt;Personal Information&lt;/span&gt;
        &lt;span class="nds-stepper-description"&gt;Identity details and contact information&lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-stepper-step"&gt;
    &lt;div class="nds-stepper-base"&gt;
      &lt;div class="nds-stepper-circle" data-step-text="2"&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-stepper-content"&gt;
      &lt;div class="nds-stepper-text"&gt;
        &lt;span class="nds-stepper-title"&gt;Document Upload&lt;/span&gt;
        &lt;span class="nds-stepper-description"&gt;Upload required supporting documents&lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-stepper-step"&gt;
    &lt;div class="nds-stepper-base"&gt;
      &lt;div class="nds-stepper-circle" data-step-text="3"&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-stepper-content"&gt;
      &lt;div class="nds-stepper-text"&gt;
        &lt;span class="nds-stepper-title"&gt;Review &amp; Confirmation&lt;/span&gt;
        &lt;span class="nds-stepper-description"&gt;Verify information before submission&lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-stepper-step"&gt;
    &lt;div class="nds-stepper-base"&gt;
      &lt;div class="nds-stepper-circle" data-step-text="4"&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-stepper-content"&gt;
      &lt;div class="nds-stepper-text"&gt;
        &lt;span class="nds-stepper-title"&gt;Application Submitted&lt;/span&gt;
        &lt;span class="nds-stepper-description"&gt;Confirmation and next steps&lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
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
    </div>
</section>

<!-- Radial Layout -->
<section id="stepperRadial" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Radial Layout</h2>
            <p class="nds-section-description">One step at a time inside a progress ring, with the next step named underneath. Use it where vertical space is tight. This layout needs the progress ring markup, which the other two hide.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
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
                                                data-toggler='["", "#demo-stepper-radial", "stepperSize"]'>
                                                <span class="nds-label">Default</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='["nds-sm", "#demo-stepper-radial", "stepperSize"]'>
                                                <span class="nds-label">SM</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='["nds-lg", "#demo-stepper-radial", "stepperSize"]'>
                                                <span class="nds-label">LG</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='["nds-xl", "#demo-stepper-radial", "stepperSize"]'>
                                                <span class="nds-label">XL</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button class="nds-btn nds-subtle demo-toggle-btn"
                                    data-toggler='["nds-neutral", "#demo-stepper-radial", "stepperNeutral"]'>
                                    <span class="nds-label">Neutral</span>
                                </button>
                                <button class="nds-btn nds-subtle demo-toggle-btn"
                                    data-toggler='["nds-cardView", "#demo-stepper-radial", "stepperCardView"]'>
                                    <span class="nds-label">Card view</span>
                                </button>
                                <button class="nds-btn nds-subtle" data-stepper-control="previous"
                                    data-stepper-target="demo-stepper-radial">
                                    <span class="nds-label">← Previous</span>
                                </button>
                                <button class="nds-btn nds-subtle" data-stepper-control="next"
                                    data-stepper-target="demo-stepper-radial">
                                    <span class="nds-label">Next →</span>
                                </button>
                                <button class="nds-btn nds-subtle demo-toggle-btn"
                                    data-toggler='[["nds-oncolor", "#demo-stepper-radial", "containerBg"],["dark-bg", ".demo-container", "containerBg"]]'>
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
                                            <circle class="nds-progress-track" cx="12" cy="12" r="10" fill="none" stroke-width="3"
                                                stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round" />
                                        </svg>
                                        <div class="nds-progress-info">
                                            <span class="nds-progress-steps"></span>
                                        </div>
                                    </div>
                                    <div class="nds-stepper-step">
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
                                    <div class="nds-stepper-step">
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
                                    <div class="nds-stepper-step">
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
                                    <div class="nds-stepper-step">
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
                            <div class="nds-tabs nds-code nds-divided">
                                <div class="nds-tab-list-container nds-scroll-more">
                                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                            aria-controls="panel-stepper-radial-1" id="tab-stepper-radial-1">
                                            <span class="nds-tab-label">HTML</span>
                                        </button>
                                    </nav>
                                    <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="nds-tab-content">
                                    <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                        id="panel-stepper-radial-1" aria-labelledby="tab-stepper-radial-1">
                                        <div class="nds-code-action">
                                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                                <i class="nds-icon nds-hgi-copy-01"></i>
                                            </button>
                                        </div>
                                        <div class="nds-expandable-content">
                                            <code class="lang-html code">
&lt;div class="nds-stepper nds-radial" id="demo-stepper-radial" data-current="2" data-total="4"&gt;
  &lt;div class="nds-progress-circle"&gt;
    &lt;svg width="64" height="64" viewBox="0 0 24 24"&gt;
      &lt;circle class="nds-progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="3" /&gt;
      &lt;circle class="nds-progress-track" cx="12" cy="12" r="10" fill="none" stroke-width="3"
        stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round" /&gt;
    &lt;/svg&gt;
    &lt;div class="nds-progress-info"&gt;
      &lt;span class="nds-progress-steps"&gt;&lt;/span&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-stepper-step"&gt;
    &lt;div class="nds-stepper-base"&gt;
      &lt;div class="nds-stepper-circle" data-step-text="1"&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-stepper-content"&gt;
      &lt;div class="nds-stepper-text"&gt;
        &lt;span class="nds-stepper-title"&gt;Personal Information&lt;/span&gt;
        &lt;span class="nds-stepper-description"&gt;Identity details and contact information&lt;/span&gt;
        &lt;span class="nds-stepper-next"&gt;Next: Document Upload&lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-stepper-step"&gt;
    &lt;div class="nds-stepper-base"&gt;
      &lt;div class="nds-stepper-circle" data-step-text="2"&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-stepper-content"&gt;
      &lt;div class="nds-stepper-text"&gt;
        &lt;span class="nds-stepper-title"&gt;Document Upload&lt;/span&gt;
        &lt;span class="nds-stepper-description"&gt;Upload required supporting documents&lt;/span&gt;
        &lt;span class="nds-stepper-next"&gt;Next: Review &amp; Confirmation&lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-stepper-step"&gt;
    &lt;div class="nds-stepper-base"&gt;
      &lt;div class="nds-stepper-circle" data-step-text="3"&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-stepper-content"&gt;
      &lt;div class="nds-stepper-text"&gt;
        &lt;span class="nds-stepper-title"&gt;Review &amp; Confirmation&lt;/span&gt;
        &lt;span class="nds-stepper-description"&gt;Verify information before submission&lt;/span&gt;
        &lt;span class="nds-stepper-next"&gt;Next: Application Submitted&lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-stepper-step"&gt;
    &lt;div class="nds-stepper-base"&gt;
      &lt;div class="nds-stepper-circle" data-step-text="4"&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-stepper-content"&gt;
      &lt;div class="nds-stepper-text"&gt;
        &lt;span class="nds-stepper-title"&gt;Application Submitted&lt;/span&gt;
        &lt;span class="nds-stepper-description"&gt;Confirmation and next steps&lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
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
    </div>
</section>

<!-- Timeline with Divider Labels -->
<section id="stepperTimeline" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Timeline with Divider Labels</h2>
            <p class="nds-section-description">A past-to-present record: each step opens with a <a class="nds-color" href="{{ 'utilities/divider' | relative_url }}">divider</a> carrying its date, and the rule doubles as the separator between entries. Add <code class="nds-inline-code lang-html">nds-reverse</code> so the newest entry sits on top, and write the steps oldest first.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-showcase">
                    <div class="nds-demo-card">
                        <div class="demo-header">
                            <div class="demo-action">
                                <button class="nds-btn nds-subtle demo-toggle-btn"
                                    data-toggler='["nds-cardView", "#demo-stepper-timeline", "timelineCardView"]'>
                                    <span class="nds-label">Card view</span>
                                </button>
                                <button class="nds-btn nds-subtle demo-toggle-btn"
                                    data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                    <span class="nds-label">Remove bg</span>
                                </button>
                            </div>
                        </div>
                        <div class="demo-container">
                            <div class="state-demo">
                                <!-- nds-reverse renders the last step at the top, so steps run oldest first -->
                                <div class="nds-stepper nds-vertical nds-dot nds-reverse" id="demo-stepper-timeline"
                                    data-current="4" data-total="4">
                                <div class="nds-stepper-step">
                                    <div class="nds-stepper-base">
                                        <div class="nds-stepper-circle" data-step-text="1"></div>
                                    </div>
                                    <div class="nds-stepper-content">
                                        <div class="nds-divider">2013 — 2018</div>
                                        <div class="nds-stepper-text">
                                            <span class="nds-stepper-title">Assistant Professor</span>
                                            <span class="nds-stepper-description">Department of Industrial Engineering</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-stepper-step">
                                    <div class="nds-stepper-base">
                                        <div class="nds-stepper-circle" data-step-text="2"></div>
                                    </div>
                                    <div class="nds-stepper-content">
                                        <div class="nds-divider">2018 — 2020</div>
                                        <div class="nds-stepper-text">
                                            <span class="nds-stepper-title">Associate Professor</span>
                                            <span class="nds-stepper-description">Department of Industrial Engineering</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-stepper-step">
                                    <div class="nds-stepper-base">
                                        <div class="nds-stepper-circle" data-step-text="3"></div>
                                    </div>
                                    <div class="nds-stepper-content">
                                        <div class="nds-divider">2020 — 2022</div>
                                        <div class="nds-stepper-text">
                                            <span class="nds-stepper-title">Supervisor, Entrepreneurship Center</span>
                                            <span class="nds-stepper-description">Office of the Vice Rector for Research</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-stepper-step">
                                    <div class="nds-stepper-base">
                                        <div class="nds-stepper-circle" data-step-text="4"></div>
                                    </div>
                                    <div class="nds-stepper-content">
                                        <div class="nds-divider">2023 — Present</div>
                                        <div class="nds-stepper-text">
                                            <span class="nds-stepper-title">Head, Department of Industrial Engineering</span>
                                            <span class="nds-stepper-description">College of Engineering</span>
                                        </div>
                                        <ul>
                                            <li>Led the 2024 program accreditation review.</li>
                                            <li>Opened two research labs with industry funding.</li>
                                        </ul>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div class="demo-code">
                            <div class="nds-tabs nds-code nds-divided">
                                <div class="nds-tab-list-container nds-scroll-more">
                                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                            aria-controls="panel-stepper-timeline-1" id="tab-stepper-timeline-1">
                                            <span class="nds-tab-label">HTML</span>
                                        </button>
                                    </nav>
                                    <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="nds-tab-content">
                                    <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                        id="panel-stepper-timeline-1" aria-labelledby="tab-stepper-timeline-1">
                                        <div class="nds-code-action">
                                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                                <i class="nds-icon nds-hgi-copy-01"></i>
                                            </button>
                                        </div>
                                        <div class="nds-expandable-content">
                                            <code class="lang-html code">
&lt;div class="nds-stepper nds-vertical nds-dot nds-reverse" data-current="4" data-total="4"&gt;
  &lt;div class="nds-stepper-step"&gt;
    &lt;div class="nds-stepper-base"&gt;
      &lt;div class="nds-stepper-circle" data-step-text="1"&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-stepper-content"&gt;
      &lt;div class="nds-divider"&gt;2013 — 2018&lt;/div&gt;
      &lt;div class="nds-stepper-text"&gt;
        &lt;span class="nds-stepper-title"&gt;Assistant Professor&lt;/span&gt;
        &lt;span class="nds-stepper-description"&gt;Department of Industrial Engineering&lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-stepper-step"&gt;
    &lt;div class="nds-stepper-base"&gt;
      &lt;div class="nds-stepper-circle" data-step-text="2"&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-stepper-content"&gt;
      &lt;div class="nds-divider"&gt;2018 — 2020&lt;/div&gt;
      &lt;div class="nds-stepper-text"&gt;
        &lt;span class="nds-stepper-title"&gt;Associate Professor&lt;/span&gt;
        &lt;span class="nds-stepper-description"&gt;Department of Industrial Engineering&lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-stepper-step"&gt;
    &lt;div class="nds-stepper-base"&gt;
      &lt;div class="nds-stepper-circle" data-step-text="3"&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-stepper-content"&gt;
      &lt;div class="nds-divider"&gt;2020 — 2022&lt;/div&gt;
      &lt;div class="nds-stepper-text"&gt;
        &lt;span class="nds-stepper-title"&gt;Supervisor, Entrepreneurship Center&lt;/span&gt;
        &lt;span class="nds-stepper-description"&gt;Office of the Vice Rector for Research&lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-stepper-step"&gt;
    &lt;div class="nds-stepper-base"&gt;
      &lt;div class="nds-stepper-circle" data-step-text="4"&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-stepper-content"&gt;
      &lt;div class="nds-divider"&gt;2023 — Present&lt;/div&gt;
      &lt;div class="nds-stepper-text"&gt;
        &lt;span class="nds-stepper-title"&gt;Head, Department of Industrial Engineering&lt;/span&gt;
        &lt;span class="nds-stepper-description"&gt;College of Engineering&lt;/span&gt;
      &lt;/div&gt;
    &lt;ul&gt;
      &lt;li&gt;Led the 2024 program accreditation review.&lt;/li&gt;
      &lt;li&gt;Opened two research labs with industry funding.&lt;/li&gt;
    &lt;/ul&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
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
    </div>
</section>

<!-- Responsive Stepper -->
<section id="stepperResponsive" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Responsive Stepper</h2>
            <p class="nds-section-description">A single stepper that morphs between variants as the viewport crosses breakpoints. Suited to flows that span mobile and desktop, where a compact radial on small screens should give way to a full vertical panel on desktop. Resize the window to see the transition</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-showcase">

                    <div class="nds-demo-card">
                        <div class="demo-header">
                            <div class="demo-action">
                                <div class="nds-dropmenu demo-toggle-menu">
                                    <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Fallback: ">
                                        <span class="nds-label">Fallback: Horizontal</span>
                                    </button>
                                    <div class="nds-dropmenu-menu" hidden>
                                        <div class="nds-dropmenu-scroll">
                                            <button class="nds-btn nds-subtle nds-dropmenu-item" data-state="selected"
                                                data-stepper-fallback="horizontal" data-stepper-target="demo-stepper-responsive">
                                                <span class="nds-label">Horizontal</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item"
                                                data-stepper-fallback="vertical" data-stepper-target="demo-stepper-responsive">
                                                <span class="nds-label">Vertical</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item"
                                                data-stepper-fallback="radial" data-stepper-target="demo-stepper-responsive">
                                                <span class="nds-label">Radial</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-dropmenu demo-toggle-menu">
                                    <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="LG: ">
                                        <span class="nds-label">LG: Fallback</span>
                                    </button>
                                    <div class="nds-dropmenu-menu" hidden>
                                        <div class="nds-dropmenu-scroll">
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='["", "#demo-stepper-responsive", "stepperLayoutLg"]'>
                                                <span class="nds-label">Fallback</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='["nds-horizontal-lg", "#demo-stepper-responsive", "stepperLayoutLg"]'>
                                                <span class="nds-label">Horizontal</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='["nds-vertical-lg", "#demo-stepper-responsive", "stepperLayoutLg"]'>
                                                <span class="nds-label">Vertical</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='["nds-radial-lg", "#demo-stepper-responsive", "stepperLayoutLg"]'>
                                                <span class="nds-label">Radial</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-dropmenu demo-toggle-menu">
                                    <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="MD: ">
                                        <span class="nds-label">MD: Fallback</span>
                                    </button>
                                    <div class="nds-dropmenu-menu" hidden>
                                        <div class="nds-dropmenu-scroll">
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                                data-toggler='["", "#demo-stepper-responsive", "stepperLayoutMd"]'>
                                                <span class="nds-label">Fallback</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='["nds-horizontal-md", "#demo-stepper-responsive", "stepperLayoutMd"]'>
                                                <span class="nds-label">Horizontal</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='["nds-vertical-md", "#demo-stepper-responsive", "stepperLayoutMd"]'>
                                                <span class="nds-label">Vertical</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='["nds-radial-md", "#demo-stepper-responsive", "stepperLayoutMd"]'>
                                                <span class="nds-label">Radial</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-dropmenu demo-toggle-menu">
                                    <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="SM: ">
                                        <span class="nds-label">SM: Fallback</span>
                                    </button>
                                    <div class="nds-dropmenu-menu" hidden>
                                        <div class="nds-dropmenu-scroll">
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                                data-toggler='["", "#demo-stepper-responsive", "stepperLayoutSm"]'>
                                                <span class="nds-label">Fallback</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='["nds-horizontal-sm", "#demo-stepper-responsive", "stepperLayoutSm"]'>
                                                <span class="nds-label">Horizontal</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='["nds-vertical-sm", "#demo-stepper-responsive", "stepperLayoutSm"]'>
                                                <span class="nds-label">Vertical</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='["nds-radial-sm", "#demo-stepper-responsive", "stepperLayoutSm"]'>
                                                <span class="nds-label">Radial</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-dropmenu demo-toggle-menu">
                                    <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                        <span class="nds-label">Default</span>
                                    </button>
                                    <div class="nds-dropmenu-menu" hidden>
                                        <div class="nds-dropmenu-scroll">
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                                data-toggler='["", "#demo-stepper-responsive", "stepperSize"]'>
                                                <span class="nds-label">Default</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='["nds-lg", "#demo-stepper-responsive", "stepperSize"]'>
                                                <span class="nds-label">LG</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='["nds-xl", "#demo-stepper-responsive", "stepperSize"]'>
                                                <span class="nds-label">XL</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button class="nds-btn nds-subtle demo-toggle-btn"
                                    data-toggler='["nds-dot", "#demo-stepper-responsive", "stepperDot"]'
                                    data-demo-forbids-class="nds-radial">
                                    <span class="nds-label">Dot</span>
                                </button>
                                <button class="nds-btn nds-subtle" data-stepper-control="previous"
                                    data-stepper-target="demo-stepper-responsive">
                                    <span class="nds-label">← Previous</span>
                                </button>
                                <button class="nds-btn nds-subtle" data-stepper-control="next"
                                    data-stepper-target="demo-stepper-responsive">
                                    <span class="nds-label">Next →</span>
                                </button>
                                <button class="nds-btn nds-subtle" data-stepper-control="goto"
                                    data-stepper-target="demo-stepper-responsive" data-stepper-value="1">
                                    <span class="nds-label">Go to 1</span>
                                </button>
                                <button class="nds-btn nds-subtle demo-toggle-btn"
                                    data-toggler='[["nds-oncolor", "#demo-stepper-responsive", "containerBg"],["dark-bg", ".demo-container", "containerBg"]]'>
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
                                <div class="nds-stepper"
                                    id="demo-stepper-responsive"
                                    data-current="2" data-total="4"
                                    data-stepper-auto-simplify>
                                    <div class="nds-progress-circle">
                                        <svg width="64" height="64" viewBox="0 0 24 24">
                                            <circle class="nds-progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="3" />
                                            <circle class="nds-progress-track" cx="12" cy="12" r="10" fill="none" stroke-width="3"
                                                stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round" />
                                        </svg>
                                        <div class="nds-progress-info">
                                            <span class="nds-progress-steps"></span>
                                        </div>
                                    </div>
                                    <div class="nds-stepper-step">
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
                                    <div class="nds-stepper-step">
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
                                    <div class="nds-stepper-step">
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
                                    <div class="nds-stepper-step">
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
                            <div class="nds-tabs nds-code nds-divided">
                                <div class="nds-tab-list-container nds-scroll-more">
                                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                            aria-controls="panel-stepper-responsive-1" id="tab-stepper-responsive-1">
                                            <span class="nds-tab-label">HTML</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="false"
                                            aria-controls="panel-stepper-responsive-js" id="tab-stepper-responsive-js">
                                            <span class="nds-tab-label">JS API</span>
                                        </button>
                                    </nav>
                                    <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="nds-tab-content">
                                    <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                        id="panel-stepper-responsive-1" aria-labelledby="tab-stepper-responsive-1">
                                        <div class="nds-code-action">
                                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                                <i class="nds-icon nds-hgi-copy-01"></i>
                                            </button>
                                        </div>
                                        <div class="nds-expandable-content">
                                            <code class="lang-html code">
&lt;div class="nds-stepper"
  id="demo-stepper-responsive"
  data-current="2" data-total="4"&gt;
  &lt;div class="nds-progress-circle"&gt;
    &lt;svg width="64" height="64" viewBox="0 0 24 24"&gt;
      &lt;circle class="nds-progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="3" /&gt;
      &lt;circle class="nds-progress-track" cx="12" cy="12" r="10" fill="none" stroke-width="3"
        stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round" /&gt;
    &lt;/svg&gt;
    &lt;div class="nds-progress-info"&gt;
      &lt;span class="nds-progress-steps"&gt;&lt;/span&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-stepper-step"&gt;
    &lt;div class="nds-stepper-base"&gt;
      &lt;div class="nds-stepper-circle" data-step-text="1"&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-stepper-content"&gt;
      &lt;div class="nds-stepper-text"&gt;
        &lt;span class="nds-stepper-title"&gt;Personal Information&lt;/span&gt;
        &lt;span class="nds-stepper-description"&gt;Identity details and contact information&lt;/span&gt;
        &lt;span class="nds-stepper-next"&gt;Next: Document Upload&lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-stepper-step"&gt;
    &lt;div class="nds-stepper-base"&gt;
      &lt;div class="nds-stepper-circle" data-step-text="2"&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-stepper-content"&gt;
      &lt;div class="nds-stepper-text"&gt;
        &lt;span class="nds-stepper-title"&gt;Document Upload&lt;/span&gt;
        &lt;span class="nds-stepper-description"&gt;Upload required supporting documents&lt;/span&gt;
        &lt;span class="nds-stepper-next"&gt;Next: Review &amp; Confirmation&lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-stepper-step"&gt;
    &lt;div class="nds-stepper-base"&gt;
      &lt;div class="nds-stepper-circle" data-step-text="3"&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-stepper-content"&gt;
      &lt;div class="nds-stepper-text"&gt;
        &lt;span class="nds-stepper-title"&gt;Review &amp; Confirmation&lt;/span&gt;
        &lt;span class="nds-stepper-description"&gt;Verify information before submission&lt;/span&gt;
        &lt;span class="nds-stepper-next"&gt;Next: Application Submitted&lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-stepper-step"&gt;
    &lt;div class="nds-stepper-base"&gt;
      &lt;div class="nds-stepper-circle" data-step-text="4"&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-stepper-content"&gt;
      &lt;div class="nds-stepper-text"&gt;
        &lt;span class="nds-stepper-title"&gt;Application Submitted&lt;/span&gt;
        &lt;span class="nds-stepper-description"&gt;Confirmation and next steps&lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
                                        </code>
                                        </div>
                                    </div>
                                    <div class="nds-tab-panel code-example" role="tabpanel"
                                        id="panel-stepper-responsive-js" aria-labelledby="tab-stepper-responsive-js" hidden>
                                        <div class="nds-code-action">
                                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                                <i class="nds-icon nds-hgi-copy-01"></i>
                                            </button>
                                        </div>
                                        <code class="lang-javascript code">// Inject a stepper dynamically and initialize it
const el = document.getElementById('demo-stepper-responsive');
const stepper = NDS.Stepper.create(el);

// Read or change the fallback layout variant at runtime
const fallback = NDS.Stepper.getFallback('demo-stepper-responsive'); // 'horizontal'
NDS.Stepper.setFallback('demo-stepper-responsive', 'vertical');

// Navigate programmatically
NDS.Stepper.next('demo-stepper-responsive');
NDS.Stepper.previous('demo-stepper-responsive');
NDS.Stepper.goTo('demo-stepper-responsive', 3);</code>
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
<section id="stepperFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-loading-03"></i>
                            <span class="nds-label">Auto-initialization</span>
                        </span>
                        <p class="nds-item-desc">Activates when <code class="nds-inline-code lang-html">.nds-stepper</code> is on the page. Step states, progress display, and control button handlers attach automatically.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-layout-grid"></i>
                            <span class="nds-label">Three Layout Modes</span>
                        </span>
                        <p class="nds-item-desc">Horizontal, vertical, and radial layouts cover wide forms, narrow sidebars, and compact dashboard widgets respectively.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-workflow-circle-06"></i>
                            <span class="nds-label">Automatic State Management</span>
                        </span>
                        <p class="nds-item-desc">Set <code class="nds-inline-code lang-html">data-current</code> and all steps update their completed, current, or upcoming states automatically.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-cursor-pointer-01"></i>
                            <span class="nds-label">Declarative Control Buttons</span>
                        </span>
                        <p class="nds-item-desc">Add <code class="nds-inline-code lang-html">data-stepper-control</code> to any button to navigate steps without writing JavaScript.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-notification-03"></i>
                            <span class="nds-label">Step Change Events</span>
                        </span>
                        <p class="nds-item-desc">The <code class="nds-inline-code lang-js">nds:stepper:change</code> event fires on every navigation with current step, total, and percentage in the detail.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-device-access"></i>
                            <span class="nds-label">Responsive Layout</span>
                        </span>
                        <p class="nds-item-desc">A single stepper adapts across breakpoints via modifier classes like <code class="nds-inline-code lang-html">nds-radial-sm</code> and <code class="nds-inline-code lang-html">nds-vertical-lg</code> (same pattern as <code class="nds-inline-code lang-html">nds-tableView-sm</code>). One DOM tree renders as horizontal, vertical, or radial depending on viewport.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-next"></i>
                            <span class="nds-label">Look-Ahead Preview</span>
                        </span>
                        <p class="nds-item-desc">Add <code class="nds-inline-code lang-html">.nds-stepper-next</code> inside any step to show the upcoming step name. Automatically hidden on horizontal and vertical layouts; surfaces only in radial.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-target-01"></i>
                            <span class="nds-label">Programmatic Control</span>
                        </span>
                        <p class="nds-item-desc">Navigate with <code class="nds-inline-code lang-js">NDS.Stepper.next(id)</code>, <code class="nds-inline-code lang-js">NDS.Stepper.previous(id)</code>, and <code class="nds-inline-code lang-js">NDS.Stepper.goTo(id, step)</code>.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="stepperGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block nds-prose">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use steppers for <strong>multi-step forms</strong> like registration, applications, and onboarding flows where the user completes discrete stages in order</li>
                    <li>Use the <strong>horizontal layout</strong> when you have enough width and want all steps visible at once. This is the default and works best with 3 to 5 steps</li>
                    <li>Use the <strong>vertical layout</strong> when steps need detailed content, action buttons, or the interface is narrow (sidebars, mobile drawers). Add <code class="nds-inline-code lang-html">nds-reverse</code> to flip progress direction from bottom-to-top, useful for timelines or chat-like flows</li>
                    <li>Use the <strong>radial layout</strong> for compact spaces like dashboard cards or mobile headers where only the current step needs to be visible</li>
                    <li>Use the <strong>responsive modifier classes</strong> (<code class="nds-inline-code lang-html">nds-{horizontal|vertical|radial}-{sm|md|lg}</code>) when one flow spans multiple breakpoints. Same convention as <code class="nds-inline-code lang-html">nds-tableView-sm</code>. The single DOM tree carrying the combined radial + linear markup morphs via JS; no parallel steppers or manual visibility switching needed</li>
                    <li>Do not use a stepper for indeterminate or percentage-based progress. Use the <a class="nds-color" href="{{ 'components/progress' | relative_url }}">Progress</a> component instead</li>
                    <li>Do not use a stepper for navigation menus or tab-like interfaces. Use <a class="nds-color" href="{{ 'components/tabs' | relative_url }}">Tabs</a> for switching between independent content panels</li>
                    <li>Use the <strong>dot variant</strong> when step labels are not needed and visual progress alone is sufficient, such as onboarding slides or image carousels</li>
                    <li>Connecting lines between steps are shown by default on all steps except the last</li>
                    <li>Keep step titles short (2 to 4 words). Use the description for additional context</li>
                    <li>In radial steppers, add <code class="nds-inline-code lang-html">.nds-stepper-next</code> inside the step text to preview the upcoming step name. Omit it on the final step</li>
                    <li>Radial steppers work best with 3 to 6 steps. Fewer than 3 makes the circle progress hard to read; more than 6 makes step titles too compressed</li>
                    <li>A horizontal stepper runs out of room on small screens. Pair it with the radial variant there: <code class="nds-inline-code lang-html">nds-radial nds-horizontal-lg</code> is radial by default and turns horizontal from the <code class="nds-inline-code lang-html">lg</code> breakpoint up. The same pairing works for vertical</li>
                    <li>Use <code class="nds-inline-code lang-js">NDS.Stepper.next()</code> for form steps, not <code class="nds-inline-code lang-html">data-stepper-control</code>. A form step is gated by validation or by a request, and the attribute moves the stepper on every click. See Advancing the Stepper above</li>
                    <li>Always provide a unique <code class="nds-inline-code lang-html">id</code> on the stepper container so control buttons and the JS API can target it</li>
                </ul>
            </div>

            <div class="nds-block nds-prose">
                <h3 class="nds-block-title">Advancing the Stepper</h3>
                <p>There are three ways to move a stepper. Pick by one question: can anything refuse the move?</p>
                <ul>
                    <li><strong>Nothing can refuse it</strong> &mdash; use <code class="nds-inline-code lang-html">data-stepper-control</code> on a button. The click moves the stepper, always. This fits a Back button, a demo, a walkthrough, and a <code class="nds-inline-code lang-html">goto</code> that starts the flow over. It needs no JavaScript.</li>
                    <li><strong>Something can refuse it</strong> &mdash; call <code class="nds-inline-code lang-js">NDS.Stepper.next(id)</code> from the code that knows the answer. Validation, a request, a server check: the thing that decides is the thing that moves the stepper. <strong>Every form step is this case.</strong></li>
                    <li><strong>The step number lives in your own state</strong> &mdash; write <code class="nds-inline-code lang-html">data-current</code> on the <code class="nds-inline-code lang-html">.nds-stepper</code>. The component watches the attribute and re-renders. This fits a server-rendered page or a framework view that already holds the step number.</li>
                </ul>
                <p>The stepper is a progress display. It never validates, never blocks, and never sends a request. A submit-typed button inside a form is handed to that form untouched: the stepper does not cancel the submit and does not move. Move it yourself once the form reports success.</p>
                <div class="nds-block">
                    <code class="lang-html code">
&lt;!-- Back: nothing can refuse it --&gt;
&lt;button type="button" class="nds-btn nds-secondary-outline"
    data-stepper-control="previous" data-stepper-target="myStepper"&gt;
  &lt;span class="nds-label"&gt;Back&lt;/span&gt;
&lt;/button&gt;

&lt;!-- Continue: validation can refuse it --&gt;
&lt;button type="button" class="nds-btn nds-primary" id="myContinue"&gt;
  &lt;span class="nds-label"&gt;Continue&lt;/span&gt;
&lt;/button&gt;
                    </code>
                    <code class="lang-js code">
// Continue: move only if the visible step validates. validateForm() skips
// fields inside a hidden panel, so it checks the step on screen.
document.getElementById('myContinue').addEventListener('click', (e) =&gt; {
  if (NDS.Forms.validateForm(e.currentTarget).valid) NDS.Stepper.next('myStepper');
});

// Final step: move only once the request succeeds. The form carries data-ajax,
// so Forms validates, stops the POST and fires nds:formValid.
document.getElementById('myForm').addEventListener('nds:formValid', () =&gt; {
  sendApplication().then(() =&gt; NDS.Stepper.next('myStepper'));
});
                    </code>
                </div>
            </div>

            <div class="nds-block">
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
                        <tr><td><code class="nds-inline-code lang-html">nds-reverse</code></td><td>Container</td><td>Reverses vertical stepper direction so progress flows bottom-to-top (vertical only)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-cardView</code></td><td>Container</td><td>Gives the step a card surface: padding, border, rounded corners, and card background. Vertical cards each step's content and lifts the box so its first row sits level with the circle. Radial cards the whole stepper, because it shows one step at a time beside the progress ring. Has no effect in the horizontal layout. Combine with <code class="nds-inline-code lang-html">nds-oncolor</code> and the surface switches to the same translucent white a card uses on a colored background. Use it for timelines and history lists. Do not nest a <a class="nds-color" href="{{ 'components/cards' | relative_url }}">card</a> inside the step as well</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-neutral</code></td><td>Container</td><td>Neutral gray progress circle color (radial only)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-horizontal-sm</code> / <code class="nds-inline-code lang-html">-md</code> / <code class="nds-inline-code lang-html">-lg</code></td><td>Container</td><td>Forces horizontal layout on mobile / tablet / desktop respectively. Combine with other breakpoint-scoped variants to compose a responsive layout</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-vertical-sm</code> / <code class="nds-inline-code lang-html">-md</code> / <code class="nds-inline-code lang-html">-lg</code></td><td>Container</td><td>Forces vertical layout on mobile / tablet / desktop respectively</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-radial-sm</code> / <code class="nds-inline-code lang-html">-md</code> / <code class="nds-inline-code lang-html">-lg</code></td><td>Container</td><td>Forces radial layout on mobile / tablet / desktop respectively. Example: <code class="nds-inline-code lang-html">nds-radial-sm nds-vertical-lg</code> = radial on mobile, horizontal on tablet, vertical on desktop</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-loading</code></td><td>Container</td><td>Renders all steps as animated skeleton placeholders. Use while step data is being loaded. Equivalent to setting <code class="nds-inline-code lang-html">data-state="loading"</code> on the root</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-stepper-action</code></td><td><code class="nds-inline-code lang-html">.nds-stepper-content</code></td><td>Flex row container for action buttons (<code class="nds-inline-code lang-html">.nds-btn</code> children) placed inside a step's content area. Each button stretches to fill equal width</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead>
                        <tr><th>Attribute</th><th>Description</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-current</code></td><td>Set on the <code class="nds-inline-code lang-html">.nds-stepper</code> container. The active step number (starting from 1). Updating this attribute triggers an automatic UI refresh.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-total</code></td><td>Set on the <code class="nds-inline-code lang-html">.nds-stepper</code> container. Total number of steps. Updated automatically on init but can be set manually.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-step-text</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-stepper-circle</code>. Overrides the auto-generated step number with custom text.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-stepper-control</code></td><td>Set on any button. Values: <code class="nds-inline-code lang-html">next</code>, <code class="nds-inline-code lang-html">previous</code>, or <code class="nds-inline-code lang-html">goto</code>. Buttons inside a stepper target their parent automatically. The move is unconditional: the click always moves the stepper. A submit-typed button inside a form is handed to that form instead, so the stepper neither cancels the submit nor moves &mdash; see Advancing the Stepper above.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-stepper-target</code></td><td>Set on control buttons outside a stepper. The ID of the stepper to control.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-stepper-value</code></td><td>Set on <code class="nds-inline-code lang-html">goto</code> control buttons. The step number to navigate to.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-state="completed"</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-stepper-step</code>. Marks the step as completed with a checkmark icon. Managed automatically by JS.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-state="current"</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-stepper-step</code>. Marks the step as the active step. Managed automatically by JS.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-state="upcoming"</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-stepper-step</code>. Marks the step as a future step with muted styling. Managed automatically by JS.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-state="loading"</code></td><td>Set on the <code class="nds-inline-code lang-html">.nds-stepper</code> container. Renders all steps as animated skeleton placeholders. Equivalent to adding <code class="nds-inline-code lang-html">nds-loading</code>.</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead>
                        <tr><th>Property</th><th>Default</th><th>Description</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--stepper-size</code></td><td>32px</td><td>Circle diameter for linear steppers. Overridden by size classes</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--stepper-gap</code></td><td>Derived from the layout and size</td><td>Spacing between steps. Left unset it follows the layout: <code class="nds-inline-code lang-html">calc(var(--stepper-size) * 1.5)</code> vertical, <code class="nds-inline-code lang-html">calc(var(--stepper-size) / 2)</code> for a vertical <code class="nds-inline-code lang-html">nds-cardView</code> without <code class="nds-inline-code lang-html">nds-dot</code>, and the indicator gap scaled by the size classes when horizontal. Set it to override any of them</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--stepper-indicator-gap</code></td><td><code class="nds-inline-code lang-html">var(--spacing-md)</code></td><td>Base spacing between steps that <code class="nds-inline-code lang-html">--stepper-gap</code> derives from; the size classes scale it by 1.2 and 1.5</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--divider-lift</code></td><td><code class="nds-inline-code lang-html">calc(var(--stepper-size) / 4)</code></td><td>Drops a label <a class="nds-color" href="{{ 'utilities/divider' | relative_url }}">divider</a> inside a step so its rule meets the centre of the step circle. Scales with the circle, so the size classes carry it. Set <code class="nds-inline-code lang-html">0</code> to leave the divider where it falls</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--stepper-content-width</code></td><td><code class="nds-inline-code lang-html">var(--paragraph-max-width)</code></td><td>Maximum width of a step's content, so a step stays readable in a wide column and its text and any label divider end on the same edge. Set <code class="nds-inline-code lang-html">none</code> on a step that holds something wide, such as a table or a full-bleed image</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--stepper-text-padding</code></td><td><code class="nds-inline-code lang-html">var(--spacing-xl)</code></td><td>Gap between the step indicator and its text block</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--stepper-card-lift</code></td><td><code class="nds-inline-code lang-html">calc(var(--stepper-size) / 4)</code>, or <code class="nds-inline-code lang-html">var(--stepper-size)</code> with <code class="nds-inline-code lang-html">nds-dot</code></td><td>How far <code class="nds-inline-code lang-html">nds-cardView</code> raises each card so its first row meets the circle (vertical only). Scales with the circle, so the size classes carry it. Set it when your content starts with something taller or shorter than a title</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--gap</code></td><td>var(--spacing-xl)</td><td>Vertical gap between the step's text block and any <code class="nds-inline-code lang-html">.nds-stepper-action</code> buttons. Set on the <code class="nds-inline-code lang-html">.nds-stepper</code> container</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--progress-size</code></td><td>var(--stepper-size)</td><td>Circle diameter for radial steppers. Inherits from <code class="nds-inline-code lang-html">--stepper-size</code>, which radial size classes override</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block nds-prose">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>Steppers auto-initialize on page load. Access instances via <code class="nds-inline-code lang-js">NDS.Stepper.get(id)</code> or call convenience methods directly. The <code class="nds-inline-code lang-js">nds:stepper:change</code> event fires on every step change.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript">
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
document.addEventListener('nds:stepper:change', (e) =&gt; {
    e.detail.currentStep;          // Active step number
    e.detail.totalSteps;           // Total steps
    e.detail.progressPercentage;   // Completion percentage
});

// ── Data attribute control (alternative) ────────────
// Updating data attributes triggers automatic UI refresh
const el = document.getElementById('my-stepper');
el.dataset.current = '2';  // Moves to step 2
el.dataset.total = '5';    // Updates total steps

// ── Create a stepper instance dynamically ───────────
// Stamps responsive layout + data-state + progress on the element,
// then registers it so get(id) / control(id, …) work.
const stepper = NDS.Stepper.create(el);

// ── Fallback layout variant ──────────────────────────
// The fallback is the authored variant used when no breakpoint-scoped
// class (nds-{variant}-{sm|md|lg}) matches the current viewport.
NDS.Stepper.getFallback('my-stepper');              // Returns 'horizontal' | 'vertical' | 'radial'
NDS.Stepper.setFallback('my-stepper', 'vertical'); // Change at runtime

// ── Re-initialize after dynamic HTML ────────────────
NDS.Stepper.init();
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
