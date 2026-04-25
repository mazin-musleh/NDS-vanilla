---
layout: page
title: Stepper
hero_title: Stepper - National Design System
hero_description: Step-by-step progress indicators for registration forms, onboarding flows, and service applications, with horizontal, vertical, and radial layouts that can switch responsively across breakpoints
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Stepper Layouts -->
<section id="stepperLayouts" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Stepper Layouts</h2>
            <p class="nds-section-description">Three layouts render from one component: horizontal (default), vertical, and radial. Toggle the variant to preview each. The markup stays identical across variants; the progress ring and look-ahead text are part of the shared DOM and surface only in radial</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Horizontal</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", "#demo-stepper-layouts", "stepperVariant"]'>
                                            <span class="nds-label">Horizontal</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-vertical", "#demo-stepper-layouts", "stepperVariant"]'>
                                            <span class="nds-label">Vertical</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-radial", "#demo-stepper-layouts", "stepperVariant"]'>
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
                                            data-toggler='["", "#demo-stepper-layouts", "stepperSize"]'>
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", "#demo-stepper-layouts", "stepperSize"]'
                                            data-demo-requires-class="nds-radial">
                                            <span class="nds-label">SM</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-lg", "#demo-stepper-layouts", "stepperSize"]'>
                                            <span class="nds-label">LG</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-xl", "#demo-stepper-layouts", "stepperSize"]'>
                                            <span class="nds-label">XL</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-dot", "#demo-stepper-layouts", "stepperDot"]'
                                data-demo-forbids-class="nds-radial">
                                <span class="nds-label">Dot</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-center", "#demo-stepper-layouts", "stepperCenter"]'
                                data-demo-forbids-class="nds-vertical nds-radial">
                                <span class="nds-label">Center</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-reverse", "#demo-stepper-layouts", "stepperReverse"]'
                                data-demo-requires-class="nds-vertical">
                                <span class="nds-label">Reverse</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-neutral", "#demo-stepper-layouts", "stepperNeutral"]'
                                data-demo-requires-class="nds-radial">
                                <span class="nds-label">Neutral</span>
                            </button>
                            <button class="nds-btn nds-subtle" data-stepper-control="previous"
                                data-stepper-target="demo-stepper-layouts">
                                <span class="nds-label">← Previous</span>
                            </button>
                            <button class="nds-btn nds-subtle" data-stepper-control="next"
                                data-stepper-target="demo-stepper-layouts">
                                <span class="nds-label">Next →</span>
                            </button>
                            <button class="nds-btn nds-subtle" data-stepper-control="goto"
                                data-stepper-target="demo-stepper-layouts" data-stepper-value="1">
                                <span class="nds-label">Go to 1</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='[["nds-oncolor", "#demo-stepper-layouts", "containerBg"],["dark-bg", ".demo-container", "containerBg"]]'>
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
                            <div class="nds-stepper" id="demo-stepper-layouts" data-current="2" data-total="4">
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
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-stepper-layouts-1" id="tab-stepper-layouts-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                    id="panel-stepper-layouts-1" aria-labelledby="tab-stepper-layouts-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;div class="nds-stepper" id="demo-stepper-layouts" data-current="2" data-total="4"&gt;
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
</section>

<!-- Responsive Stepper -->
<section id="stepperResponsive" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Responsive Stepper</h2>
            <p class="nds-section-description">A single stepper that morphs between variants as the viewport crosses breakpoints. Suited to flows that span mobile and desktop, where a compact radial on small screens should give way to a full vertical panel on desktop. Resize the window to see the transition</p>
        </div>
        <div class="nds-section-body">
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
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-stepper-responsive-1" id="tab-stepper-responsive-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
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
</section>

<!-- Usage Guidelines -->
<section id="stepperGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
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
                    <li>Always provide a unique <code class="nds-inline-code lang-html">id</code> on the stepper container so control buttons and the JS API can target it</li>
                </ul>
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
                        <tr><td><code class="nds-inline-code lang-html">nds-neutral</code></td><td>Container</td><td>Neutral gray progress circle color (radial only)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-horizontal-sm</code> / <code class="nds-inline-code lang-html">-md</code> / <code class="nds-inline-code lang-html">-lg</code></td><td>Container</td><td>Forces horizontal layout on mobile / tablet / desktop respectively. Combine with other breakpoint-scoped variants to compose a responsive layout</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-vertical-sm</code> / <code class="nds-inline-code lang-html">-md</code> / <code class="nds-inline-code lang-html">-lg</code></td><td>Container</td><td>Forces vertical layout on mobile / tablet / desktop respectively</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-radial-sm</code> / <code class="nds-inline-code lang-html">-md</code> / <code class="nds-inline-code lang-html">-lg</code></td><td>Container</td><td>Forces radial layout on mobile / tablet / desktop respectively. Example: <code class="nds-inline-code lang-html">nds-radial-sm nds-vertical-lg</code> = radial on mobile, horizontal on tablet, vertical on desktop</td></tr>
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
                        <tr><td><code class="nds-inline-code lang-html">data-stepper-control</code></td><td>Set on any button. Values: <code class="nds-inline-code lang-html">next</code>, <code class="nds-inline-code lang-html">previous</code>, or <code class="nds-inline-code lang-html">goto</code>. Buttons inside a stepper target their parent automatically.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-stepper-target</code></td><td>Set on control buttons outside a stepper. The ID of the stepper to control.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-stepper-value</code></td><td>Set on <code class="nds-inline-code lang-html">goto</code> control buttons. The step number to navigate to.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-state="completed"</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-stepper-step</code>. Marks the step as completed with a checkmark icon. Managed automatically by JS.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-state="current"</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-stepper-step</code>. Marks the step as the active step. Managed automatically by JS.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-state="upcoming"</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-stepper-step</code>. Marks the step as a future step with muted styling. Managed automatically by JS.</td></tr>
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
                        <tr><td><code class="nds-inline-code lang-html">--stepper-gap</code></td><td>token-based</td><td>Spacing between steps. Adjusts automatically with size classes</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--progress-size</code></td><td>var(--stepper-size)</td><td>Circle diameter for radial steppers. Inherits from <code class="nds-inline-code lang-html">--stepper-size</code>, which radial size classes override</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>Steppers auto-initialize on page load. Access instances via <code class="nds-inline-code lang-js">NDS.Stepper.get(id)</code> or call convenience methods directly. The <code class="nds-inline-code lang-js">nds:stepper:change</code> event fires on every step change.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
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

// ── Re-initialize after dynamic HTML ────────────────
NDS.Stepper.init();
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
