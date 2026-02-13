---
layout: page
title: Stepper
hero_title: Stepper Components - National Design System
hero_description: Progress indicator components for multi-step processes and workflows
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Stepper Demo -->
<section id="stepperDemo" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Stepper Component</h2>
            <p class="nds-section-description">Interactive stepper with CSS-only dynamic text and multiple layout
                options</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">

                <!-- Horizontal Stepper -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Stepper with Custom Text & Dynamic Actions</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-center", ".nds-stepper", "centerToggle"]'>
                                <span class="label">Center</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                                data-toggler='["nds-md", ".nds-stepper", "stepperSize"]'>
                                <span class="label">MD</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-lg", ".nds-stepper", "stepperSize"]'>
                                <span class="label">LG</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-xl", ".nds-stepper", "stepperSize"]'>
                                <span class="label">XL</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle" data-stepper-control="previous"
                                data-stepper-target="demo-stepper-horizontal">
                                <span class="label">← Previous</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle" data-stepper-control="next"
                                data-stepper-target="demo-stepper-horizontal">
                                <span class="label">Next →</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle" data-stepper-control="goto"
                                data-stepper-target="demo-stepper-horizontal" data-stepper-value="1">
                                <span class="label">Go to 1</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle" data-stepper-control="goto"
                                data-stepper-target="demo-stepper-horizontal" data-stepper-value="3">
                                <span class="label">Go to 3</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='[["nds-oncolor", ".nds-stepper", "containerBg"],["dark-bg", ".demo-container", "containerBg"]]'>
                                <span class="label">On Color</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-stepper nds-md" id="demo-stepper-horizontal" data-current="2"
                                data-total="3">
                                <div class="nds-stepper-step completed has-line">
                                    <div class="nds-stepper-base">
                                        <div class="nds-stepper-circle" data-step-text="1"></div>
                                    </div>
                                    <div class="nds-stepper-content">
                                        <div class="nds-stepper-text">
                                            <span class="nds-stepper-title">Personal Information</span>
                                            <span class="nds-stepper-description">Identity details and contact
                                                information</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-stepper-step current has-line">
                                    <div class="nds-stepper-base">
                                        <div class="nds-stepper-circle" data-step-text="2"></div>
                                    </div>
                                    <div class="nds-stepper-content">
                                        <div class="nds-stepper-text">
                                            <span class="nds-stepper-title">Document Upload</span>
                                            <span class="nds-stepper-description">Upload required supporting
                                                documents</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-stepper-step upcoming">
                                    <div class="nds-stepper-base">
                                        <div class="nds-stepper-circle" data-step-text="3"></div>
                                    </div>
                                    <div class="nds-stepper-content">
                                        <div class="nds-stepper-text">
                                            <span class="nds-stepper-title">Review & Confirmation</span>
                                            <span class="nds-stepper-description">Verify information before
                                                submission</span>
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
                                    aria-controls="panel-data-attr-1" id="tab-data-attr-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                id="panel-data-attr-1" aria-labelledby="tab-data-attr-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <div class="nds-expandable-content">
                                    <code class="lang-html code">
                                    <!-- Government service application stepper -->
                                        <div class="nds-stepper nds-md" id="demo-stepper-horizontal-2" data-current="2" data-total="3">
                                            <div class="nds-stepper-step completed has-line">
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
                                            <div class="nds-stepper-step current has-line">
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
                                            <div class="nds-stepper-step upcoming">
                                                <div class="nds-stepper-base">
                                                    <div class="nds-stepper-circle" data-step-text="3"></div>
                                                </div>
                                                <div class="nds-stepper-content">
                                                    <div class="nds-stepper-text">
                                                        <span class="nds-stepper-title">Review & Confirmation</span>
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


                <!-- Vertical Stepper -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Stepper with Custom Text & Dynamic Actions</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                                data-toggler='["nds-md", ".nds-stepper", "stepperSize"]'>
                                <span class="label">MD</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-lg", ".nds-stepper", "stepperSize"]'>
                                <span class="label">LG</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-xl", ".nds-stepper", "stepperSize"]'>
                                <span class="label">XL</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle" data-stepper-control="previous"
                                data-stepper-target="demo-stepper-vertical">
                                <span class="label">← Previous</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle" data-stepper-control="next"
                                data-stepper-target="demo-stepper-vertical">
                                <span class="label">Next →</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle" data-stepper-control="goto"
                                data-stepper-target="demo-stepper-vertical" data-stepper-value="1">
                                <span class="label">Go to 1</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle" data-stepper-control="goto"
                                data-stepper-target="demo-stepper-vertical" data-stepper-value="3">
                                <span class="label">Go to 3</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='[["nds-oncolor", ".nds-stepper", "containerBg"],["dark-bg", ".demo-container", "containerBg"]]'>
                                <span class="label">On Color</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-stepper nds-vertical nds-md" id="demo-stepper-vertical" data-current="2"
                                data-total="3">
                                <div class="nds-stepper-step completed has-line">
                                    <div class="nds-stepper-base">
                                        <div class="nds-stepper-circle" data-step-text="1"></div>
                                    </div>
                                    <div class="nds-stepper-content">
                                        <div class="nds-stepper-text">
                                            <span class="nds-stepper-title">Personal Information</span>
                                            <span class="nds-stepper-description">Identity details and contact
                                                information</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-stepper-step current has-line">
                                    <div class="nds-stepper-base">
                                        <div class="nds-stepper-circle" data-step-text="2"></div>
                                    </div>
                                    <div class="nds-stepper-content">
                                        <div class="nds-stepper-text">
                                            <span class="nds-stepper-title">Document Upload</span>
                                            <span class="nds-stepper-description">Upload required supporting
                                                documents</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-stepper-step upcoming">
                                    <div class="nds-stepper-base">
                                        <div class="nds-stepper-circle" data-step-text="3"></div>
                                    </div>
                                    <div class="nds-stepper-content">
                                        <div class="nds-stepper-text">
                                            <span class="nds-stepper-title">Review & Confirmation</span>
                                            <span class="nds-stepper-description">Verify information before
                                                submission</span>
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
                                    aria-controls="panel-data-attr-1" id="tab-data-attr-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                id="panel-data-attr-1" aria-labelledby="tab-data-attr-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <div class="nds-expandable-content">
                                    <code class="lang-html code">
                                    <!-- Government service application stepper -->
                                        <div class="nds-stepper nds-vertical nds-md" id="demo-stepper-vertical-2" data-current="2" data-total="3">
                                            <div class="nds-stepper-step completed has-line">
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
                                            <div class="nds-stepper-step current has-line">
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
                                            <div class="nds-stepper-step upcoming">
                                                <div class="nds-stepper-base">
                                                    <div class="nds-stepper-circle" data-step-text="3"></div>
                                                </div>
                                                <div class="nds-stepper-content">
                                                    <div class="nds-stepper-text">
                                                        <span class="nds-stepper-title">Review & Confirmation</span>
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

                <!-- Radial Stepper -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Radial Stepper with Progress Circle</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-sm", ".nds-stepper.nds-radial", "stepperSize"]'>
                                <span class="label">SM</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                                data-toggler='["nds-md", ".nds-stepper.nds-radial", "stepperSize"]'>
                                <span class="label">MD</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-lg", ".nds-stepper.nds-radial", "stepperSize"]'>
                                <span class="label">LG</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-xl", ".nds-stepper.nds-radial", "stepperSize"]'>
                                <span class="label">XL</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle" data-stepper-control="previous"
                                data-stepper-target="demo-stepper-radial">
                                <span class="label">← Previous</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle" data-stepper-control="next"
                                data-stepper-target="demo-stepper-radial">
                                <span class="label">Next →</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle" data-stepper-control="goto" data-stepper-value="1"
                                data-stepper-target="demo-stepper-radial">
                                <span class="label">Go to 1</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle" data-stepper-control="goto" data-stepper-value="3"
                                data-stepper-target="demo-stepper-radial">
                                <span class="label">Go to 3</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='[["nds-oncolor", ".nds-stepper.nds-radial", "containerBg"],["dark-bg", ".demo-container", "containerBg"]]'>
                                <span class="label">On Color</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-stepper nds-radial nds-md" id="demo-stepper-radial" data-current="2"
                                data-total="4">
                                <div class="progress-circle">
                                    <svg width="64" height="64" viewBox="0 0 24 24">
                                        <circle class="progress-bg" cx="12" cy="12" r="10" fill="none"
                                            stroke-width="3" />
                                        <circle class="progress-bar" cx="12" cy="12" r="10" fill="none" stroke-width="3"
                                            stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round" />
                                    </svg>
                                    <div class="progress-info">
                                        <span class="progress-percentage">
                                            <span class="progress-number">0</span>
                                        </span>
                                        <span class="progress-text"></span>
                                    </div>
                                </div>
                                <div class="nds-stepper-step completed has-line">
                                    <div class="nds-stepper-base">
                                        <div class="nds-stepper-circle" data-step-text="1"></div>
                                    </div>
                                    <div class="nds-stepper-content">
                                        <div class="nds-stepper-text">
                                            <span class="nds-stepper-title">Personal Information</span>
                                            <span class="nds-stepper-description">Identity details and contact
                                                information</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-stepper-step current has-line">
                                    <div class="nds-stepper-base">
                                        <div class="nds-stepper-circle" data-step-text="2"></div>
                                    </div>
                                    <div class="nds-stepper-content">
                                        <div class="nds-stepper-text">
                                            <span class="nds-stepper-title">Document Upload</span>
                                            <span class="nds-stepper-description">Upload required supporting
                                                documents</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-stepper-step upcoming has-line">
                                    <div class="nds-stepper-base">
                                        <div class="nds-stepper-circle" data-step-text="3"></div>
                                    </div>
                                    <div class="nds-stepper-content">
                                        <div class="nds-stepper-text">
                                            <span class="nds-stepper-title">Review & Confirmation</span>
                                            <span class="nds-stepper-description">Verify information before
                                                submission</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-stepper-step upcoming">
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
                                    aria-controls="panel-radial-1" id="tab-radial-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-radial-1"
                                aria-labelledby="tab-radial-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <div class="nds-expandable-content">
                                    <code class="lang-html code">
                                    <!-- Radial stepper with progress circle -->
                                    <div class="nds-stepper nds-radial nds-md" id="stepper-radial" data-current="2" data-total="4">
                                        <div class="progress-circle">
                                            <svg width="64" height="64" viewBox="0 0 24 24">
                                                <circle class="progress-bg" cx="12" cy="12" r="10" fill="none"
                                                    stroke-width="3" />
                                                <circle class="progress-bar" cx="12" cy="12" r="10" fill="none" stroke-width="3"
                                                    stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round" />
                                            </svg>
                                            <div class="progress-info">
                                                <span class="progress-percentage">
                                                    <span class="progress-number">0</span>
                                                </span>
                                                <span class="progress-text"></span>
                                            </div>
                                        </div>
                                        <div class="nds-stepper-step completed has-line">
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
                                        <div class="nds-stepper-step current has-line">
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
                                        <div class="nds-stepper-step upcoming has-line">
                                            <div class="nds-stepper-base">
                                                <div class="nds-stepper-circle" data-step-text="3"></div>
                                            </div>
                                            <div class="nds-stepper-content">
                                                <div class="nds-stepper-text">
                                                    <span class="nds-stepper-title">Review & Confirmation</span>
                                                    <span class="nds-stepper-description">Verify information before submission</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="nds-stepper-step upcoming">
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

<!-- Usage -->
<section id="stepperUsage" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage</h2>
            <p class="nds-section-description">How to implement stepper components</p>
        </div>
        <div class="nds-section-content">

            <h3>Component Structure</h3>

            <p>The stepper component uses a hierarchical DOM structure that starts with the <strong>.nds-stepper</strong> container, which requires an ID for programmatic control. Each step is wrapped in <strong>.nds-stepper-step</strong>, containing <strong>.nds-stepper-base</strong> for the visual circle indicator. Inside the base, <strong>.nds-stepper-circle</strong> displays the step number via the <strong>data-step-text</strong> attribute. The <strong>.nds-stepper-content</strong> section contains a <strong>.nds-stepper-text</strong> wrapper that holds the step title using <strong>.nds-stepper-title</strong> and optional description with <strong>.nds-stepper-description</strong>.</p>

            <h3>Layout Variations</h3>

            <p>Choose from three layout types based on your interface needs. The default <strong>horizontal layout</strong> arranges steps left-to-right and works best for wide screens. Add <strong>.nds-vertical</strong> for a top-to-bottom layout suitable for narrow interfaces or sidebars. For compact spaces and mobile interfaces, use <strong>.nds-radial</strong> which includes a circular progress indicator showing completion percentage.</p>

            <h3>Step States</h3>

            <p>The component automatically manages three primary states that are applied based on the current step position. Steps before the current step receive <strong>.completed</strong>, the active step gets <strong>.current</strong>, and future steps are marked with <strong>.upcoming</strong>. The <strong>.has-line</strong> class adds connecting lines between steps in horizontal and vertical layouts.</p>

            <h3>Required Data Attributes</h3>

            <p>Configure your stepper by adding <strong>data-current</strong> and <strong>data-total</strong> attributes to the main container. The <strong>data-current</strong> attribute defines which step is currently active (starting from 1), while <strong>data-total</strong> specifies the total number of steps. These attributes are automatically synchronized by a MutationObserver, meaning you can update them directly on the DOM element and the UI will reflect changes instantly without manual method calls.</p>

            <h3>Progress Circle for Radial Layout</h3>

            <p>Radial steppers require a <strong>.progress-circle</strong> element inside the container. This includes an SVG with two circle elements: <strong>.progress-bg</strong> for the background track and <strong>.progress-bar</strong> for the animated progress indicator. Inside the progress circle, add <strong>.progress-info</strong> containing <strong>.progress-number</strong> to display the percentage and <strong>.progress-text</strong> to show the "X of Y" step counter. The component automatically updates these elements as users navigate.</p>

            <h3>JavaScript API Methods</h3>

            <p>Access stepper instances through the global <strong>NDSStepper</strong> object. Use <strong>NDSStepper.get(id)</strong> to retrieve a specific stepper instance, then call navigation methods directly. The <strong>next()</strong> method moves to the next step or marks the last step as completed on linear steppers. Use <strong>previous()</strong> to go back one step or un-complete a completed final step. Jump to any specific step with <strong>goTo(stepNumber)</strong>.</p>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <div class="nds-expandable-content">
                    <code class="lang-javascript line-numbers">
// Get stepper instance by ID
const stepper = NDSStepper.get('my-stepper');

// Navigate between steps
stepper.next();
stepper.previous();
stepper.goTo(3);

// Access current properties
console.log(stepper.current, stepper.total, stepper.progress);
                </code>
                </div>
            </div>

            <h3>Global API Convenience Methods</h3>

            <p>For quick operations without retrieving instances, use the convenience methods on the global API. Call <strong>NDSStepper.next(id)</strong>, <strong>NDSStepper.previous(id)</strong>, or <strong>NDSStepper.goTo(id, stepNumber)</strong> to control steppers directly. These methods are shortcuts that internally look up the stepper instance by ID and call the corresponding instance methods. Use this approach when you need stepper-specific functionality like navigation and accessing properties.</p>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <div class="nds-expandable-content">
                    <code class="lang-javascript line-numbers">
// Using global convenience methods
NDSStepper.next('my-stepper');        // Calls instance.next() method
NDSStepper.previous('my-stepper');    // Calls instance.previous() method
NDSStepper.goTo('my-stepper', 3);     // Calls instance.goTo(3) method
                </code>
                </div>
            </div>

            <h3>Data Attribute Control</h3>

            <p>Alternatively, control steppers by directly manipulating DOM element data attributes using standard JavaScript DOM methods. Get the element with <strong>document.getElementById()</strong> or any DOM selector, then modify <strong>dataset.current</strong> or <strong>dataset.total</strong>. The component's MutationObserver automatically detects these changes and updates the visual state, progress indicators, and dispatches events. This approach is simpler for basic step changes and works well with reactive frameworks, but doesn't provide access to property getters like <strong>progress</strong> or navigation methods.</p>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <div class="nds-expandable-content">
                    <code class="lang-javascript line-numbers">
// Direct DOM element data attribute manipulation
const stepper = document.getElementById('my-stepper');
stepper.dataset.current = '2'; // MutationObserver triggers automatic update
stepper.dataset.total = '5';   // Updates total steps count

// This is simpler for basic step changes, but cannot:
// - Access .progress, .current, .total properties
// - Call navigation methods like next() or previous()
                </code>
                </div>
            </div>

            <h3>Control Buttons</h3>

            <p>Create interactive controls using data attributes without writing JavaScript. Add <strong>data-stepper-control</strong> with values "next", "previous", or "goto" to any button. For goto controls, include <strong>data-stepper-value</strong> to specify the target step. The component uses smart targeting: buttons inside a stepper container automatically target their parent stepper, while buttons outside can specify a target using <strong>data-stepper-target</strong> with the stepper's ID.</p>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <div class="nds-expandable-content">
                    <code class="lang-html line-numbers">
<!-- Automatic targeting (inside stepper) -->
<button data-stepper-control="next">Next Step</button>
<button data-stepper-control="previous">Previous Step</button>

<!-- Explicit targeting (outside stepper) -->
<button data-stepper-control="next" data-stepper-target="stepper-1">
    Next for Stepper 1
</button>
<button data-stepper-control="goto" data-stepper-value="3" data-stepper-target="stepper-2">
    Go to Step 3
</button>
                </code>
                </div>
            </div>

            <h3>Custom Events</h3>

            <p>The component dispatches a <strong>nds:stepper:change</strong> event whenever the active step changes through any method (API calls, data attributes, or control buttons). The event bubbles up from the stepper element and includes a detail object with <strong>currentStep</strong>, <strong>totalSteps</strong>, and <strong>progressPercentage</strong>. Listen for this event to synchronize your application state, trigger analytics, or perform side effects when users navigate.</p>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <div class="nds-expandable-content">
                    <code class="lang-javascript line-numbers">
document.addEventListener('nds:stepper:change', (e) => {
    console.log('Step:', e.detail.currentStep);
    console.log('Total:', e.detail.totalSteps);
    console.log('Progress:', e.detail.progressPercentage + '%');
});
                </code>
                </div>
            </div>

            <h3>Linear vs Radial Behavior</h3>

            <p>The component detects whether a stepper is radial by checking for the <strong>.nds-radial</strong> class and caches this check for performance. Linear steppers (default and vertical) allow the current step to exceed the total number of steps, which triggers a completion state where all steps are marked as completed. When you call <strong>next()</strong> on the final step of a linear stepper, it marks that step as completed without advancing further. Calling <strong>previous()</strong> on a completed final step un-completes it and makes it current again.</p>

            <p>Radial steppers clamp the current step value to never exceed the total steps, preventing the completion state entirely. This means <strong>next()</strong> on the final step does nothing, and <strong>previous()</strong> simply moves back. When updating via <strong>data-current</strong>, values are automatically clamped to the valid range. This controlled behavior is ideal for dashboards and circular progress indicators.</p>

            <h3>Automatic Initialization</h3>

            <p>The component automatically initializes on DOMContentLoaded by finding all elements with the <strong>.nds-stepper</strong> class that aren't inside code examples. Each stepper is marked with <strong>data-initialized="true"</strong> to prevent double initialization. The instance is stored in the <strong>ndsStepperInstance</strong> property on the DOM element, and if the stepper has an ID, it's also added to the global registry accessible via <strong>NDSStepper.get()</strong>. Control button event delegation is set up once globally, making the system efficient even with multiple steppers on the page.</p>

            <h3>Performance Features</h3>

            <p>The implementation includes several performance optimizations. The radial check is cached during construction to avoid repeated <strong>classList.contains()</strong> calls. The MutationObserver uses <strong>isInternalUpdate</strong> flag management with Promise microtask queuing to prevent infinite loops when the component updates its own data attributes. The observer only watches specific attributes (<strong>data-current</strong>, <strong>data-total</strong>) rather than all attribute changes, reducing overhead. Control buttons use a single global event delegation listener instead of individual listeners per button, making the system scale efficiently with any number of steppers and controls.</p>

        </div>
    </div>
</section>