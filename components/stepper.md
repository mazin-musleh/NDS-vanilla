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
    <div class="nds-section-content-container">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Stepper Component</h2>
            <p class="nds-section-description">Interactive stepper with CSS-only dynamic text and multiple layout
                options</p>
        </div>
        <div class="nds-section-content">
            <div class="stepper-showcase">

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
                                        <span class="nds-stepper-title">Personal Information</span>
                                        <span class="nds-stepper-description">Identity details and contact
                                            information</span>
                                    </div>
                                </div>
                                <div class="nds-stepper-step current has-line">
                                    <div class="nds-stepper-base">
                                        <div class="nds-stepper-circle" data-step-text="2"></div>
                                    </div>
                                    <div class="nds-stepper-content">
                                        <span class="nds-stepper-title">Document Upload</span>
                                        <span class="nds-stepper-description">Upload required supporting
                                            documents</span>
                                    </div>
                                </div>
                                <div class="nds-stepper-step upcoming">
                                    <div class="nds-stepper-base">
                                        <div class="nds-stepper-circle" data-step-text="3"></div>
                                    </div>
                                    <div class="nds-stepper-content">
                                        <span class="nds-stepper-title">Review & Confirmation</span>
                                        <span class="nds-stepper-description">Verify information before
                                            submission</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code withDivider">
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
                                                    <span class="nds-stepper-title">Personal Information</span>
                                                    <span class="nds-stepper-description">Identity details and contact information</span>
                                                </div>
                                            </div>
                                            <div class="nds-stepper-step current has-line">
                                                <div class="nds-stepper-base">
                                                    <div class="nds-stepper-circle" data-step-text="2"></div>
                                                </div>
                                                <div class="nds-stepper-content">
                                                    <span class="nds-stepper-title">Document Upload</span>
                                                    <span class="nds-stepper-description">Upload required supporting documents</span>
                                                </div>
                                            </div>
                                            <div class="nds-stepper-step upcoming">
                                                <div class="nds-stepper-base">
                                                    <div class="nds-stepper-circle" data-step-text="3"></div>
                                                </div>
                                                <div class="nds-stepper-content">
                                                    <span class="nds-stepper-title">Review & Confirmation</span>
                                                    <span class="nds-stepper-description">Verify information before submission</span>
                                                </div>
                                            </div>
                                        </div>
                                    </code>
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
                                        <span class="nds-stepper-title">Personal Information</span>
                                        <span class="nds-stepper-description">Identity details and contact
                                            information</span>
                                    </div>
                                </div>
                                <div class="nds-stepper-step current has-line">
                                    <div class="nds-stepper-base">
                                        <div class="nds-stepper-circle" data-step-text="2"></div>
                                    </div>
                                    <div class="nds-stepper-content">
                                        <span class="nds-stepper-title">Document Upload</span>
                                        <span class="nds-stepper-description">Upload required supporting
                                            documents</span>
                                    </div>
                                </div>
                                <div class="nds-stepper-step upcoming">
                                    <div class="nds-stepper-base">
                                        <div class="nds-stepper-circle" data-step-text="3"></div>
                                    </div>
                                    <div class="nds-stepper-content">
                                        <span class="nds-stepper-title">Review & Confirmation</span>
                                        <span class="nds-stepper-description">Verify information before
                                            submission</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code withDivider">
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
                                                    <span class="nds-stepper-title">Personal Information</span>
                                                    <span class="nds-stepper-description">Identity details and contact information</span>
                                                </div>
                                            </div>
                                            <div class="nds-stepper-step current has-line">
                                                <div class="nds-stepper-base">
                                                    <div class="nds-stepper-circle" data-step-text="2"></div>
                                                </div>
                                                <div class="nds-stepper-content">
                                                    <span class="nds-stepper-title">Document Upload</span>
                                                    <span class="nds-stepper-description">Upload required supporting documents</span>
                                                </div>
                                            </div>
                                            <div class="nds-stepper-step upcoming">
                                                <div class="nds-stepper-base">
                                                    <div class="nds-stepper-circle" data-step-text="3"></div>
                                                </div>
                                                <div class="nds-stepper-content">
                                                    <span class="nds-stepper-title">Review & Confirmation</span>
                                                    <span class="nds-stepper-description">Verify information before submission</span>
                                                </div>
                                            </div>
                                        </div>
                                    </code>
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
                                        <span class="nds-stepper-title">Personal Information</span>
                                        <span class="nds-stepper-description">Identity details and contact
                                            information</span>
                                    </div>
                                </div>
                                <div class="nds-stepper-step current has-line">
                                    <div class="nds-stepper-base">
                                        <div class="nds-stepper-circle" data-step-text="2"></div>
                                    </div>
                                    <div class="nds-stepper-content">
                                        <span class="nds-stepper-title">Document Upload</span>
                                        <span class="nds-stepper-description">Upload required supporting
                                            documents</span>
                                    </div>
                                </div>
                                <div class="nds-stepper-step upcoming has-line">
                                    <div class="nds-stepper-base">
                                        <div class="nds-stepper-circle" data-step-text="3"></div>
                                    </div>
                                    <div class="nds-stepper-content">
                                        <span class="nds-stepper-title">Review & Confirmation</span>
                                        <span class="nds-stepper-description">Verify information before
                                            submission</span>
                                    </div>
                                </div>
                                <div class="nds-stepper-step upcoming">
                                    <div class="nds-stepper-base">
                                        <div class="nds-stepper-circle" data-step-text="4"></div>
                                    </div>
                                    <div class="nds-stepper-content">
                                        <span class="nds-stepper-title">Application Submitted</span>
                                        <span class="nds-stepper-description">Confirmation and next steps</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code withDivider">
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
                                                <span class="nds-stepper-title">Personal Information</span>
                                                <span class="nds-stepper-description">Identity details and contact information</span>
                                            </div>
                                        </div>
                                        <div class="nds-stepper-step current has-line">
                                            <div class="nds-stepper-base">
                                                <div class="nds-stepper-circle" data-step-text="2"></div>
                                            </div>
                                            <div class="nds-stepper-content">
                                                <span class="nds-stepper-title">Document Upload</span>
                                                <span class="nds-stepper-description">Upload required supporting documents</span>
                                            </div>
                                        </div>
                                        <div class="nds-stepper-step upcoming has-line">
                                            <div class="nds-stepper-base">
                                                <div class="nds-stepper-circle" data-step-text="3"></div>
                                            </div>
                                            <div class="nds-stepper-content">
                                                <span class="nds-stepper-title">Review & Confirmation</span>
                                                <span class="nds-stepper-description">Verify information before submission</span>
                                            </div>
                                        </div>
                                        <div class="nds-stepper-step upcoming">
                                            <div class="nds-stepper-base">
                                                <div class="nds-stepper-circle" data-step-text="4"></div>
                                            </div>
                                            <div class="nds-stepper-content">
                                                <span class="nds-stepper-title">Application Submitted</span>
                                                <span class="nds-stepper-description">Confirmation and next steps</span>
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
</section>

<!-- Usage -->
<section id="stepperUsage" class="nds-content-section">
    <div class="nds-section-content-container">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage</h2>
            <p class="nds-section-description">How to implement stepper components</p>
        </div>
        <div class="nds-section-content">

            <h3>Structure</h3>
            <ul>
                <li>
                    <div class="nds-code nds-expandable">
                        <div class="nds-code-action">
                            <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code
                            class="lang-html nds-expandable-content line-numbers"><span class="progress-text">.nds-stepper</span></code>
                    </div> - Main container
                </li>
                <li>
                    <div class="nds-code">
                        <div class="nds-code-action"><button class="nds-btn nds-subtle copy-btn"
                                aria-label="Copy code"><i class="hgi hgi-stroke hgi-copy-01"></i></button></div><code
                            class="lang-html code">.nds-stepper-step</code>
                    </div> - Individual step wrapper
                </li>
                <li>
                    <div class="nds-code">
                        <div class="nds-code-action"><button class="nds-btn nds-subtle copy-btn"
                                aria-label="Copy code"><i class="hgi hgi-stroke hgi-copy-01"></i></button></div><code
                            class="code">.nds-stepper-base</code>
                    </div> - Contains the circle indicator
                </li>
                <li>
                    <div class="nds-code">
                        <div class="nds-code-action"><button class="nds-btn nds-subtle copy-btn"
                                aria-label="Copy code"><i class="hgi hgi-stroke hgi-copy-01"></i></button></div><code
                            class="code">.nds-stepper-circle</code>
                    </div> - Numbered indicator
                </li>
                <li>
                    <div class="nds-code">
                        <div class="nds-code-action"><button class="nds-btn nds-subtle copy-btn"
                                aria-label="Copy code"><i class="hgi hgi-stroke hgi-copy-01"></i></button></div><code
                            class="code">.nds-stepper-content</code>
                    </div> - Title and description area
                </li>
            </ul>

            <h3>States</h3>
            <ul>
                <li>
                    <div class="nds-code">
                        <div class="nds-code-action"><button class="nds-btn nds-subtle copy-btn"
                                aria-label="Copy code"><i class="hgi hgi-stroke hgi-copy-01"></i></button></div><code
                            class="code">.completed</code>
                    </div> - Finished steps
                </li>
                <li>
                    <div class="nds-code">
                        <div class="nds-code-action"><button class="nds-btn nds-subtle copy-btn"
                                aria-label="Copy code"><i class="hgi hgi-stroke hgi-copy-01"></i></button></div><code
                            class="code">.current</code>
                    </div> - Active step
                </li>
                <li>
                    <div class="nds-code">
                        <div class="nds-code-action"><button class="nds-btn nds-subtle copy-btn"
                                aria-label="Copy code"><i class="hgi hgi-stroke hgi-copy-01"></i></button></div><code
                            class="code">.upcoming</code>
                    </div> - Future steps
                </li>
                <li>
                    <div class="nds-code">
                        <div class="nds-code-action"><button class="nds-btn nds-subtle copy-btn"
                                aria-label="Copy code"><i class="hgi hgi-stroke hgi-copy-01"></i></button></div><code
                            class="code">.error</code>
                    </div> - Error state
                </li>
                <li>
                    <div class="nds-code">
                        <div class="nds-code-action"><button class="nds-btn nds-subtle copy-btn"
                                aria-label="Copy code"><i class="hgi hgi-stroke hgi-copy-01"></i></button></div><code
                            class="code">.has-line</code>
                    </div> - Adds connecting line
                </li>
            </ul>

            <h3>Layouts</h3>
            <ul>
                <li><strong>Horizontal:</strong> Default layout</li>
                <li><strong>Vertical:</strong> Add <div class="nds-code">
                        <div class="nds-code-action"><button class="nds-btn nds-subtle copy-btn"
                                aria-label="Copy code"><i class="hgi hgi-stroke hgi-copy-01"></i></button></div><code
                            class="code">.nds-vertical</code>
                    </div> class</li>
                <li><strong>Radial:</strong> Add <div class="nds-code">
                        <div class="nds-code-action"><button class="nds-btn nds-subtle copy-btn"
                                aria-label="Copy code"><i class="hgi hgi-stroke hgi-copy-01"></i></button></div><code
                            class="code">.nds-radial</code>
                    </div> class (includes progress circle)</li>
            </ul>

            <h3>Data Attributes</h3>
            <ul>
                <li>
                    <div class="nds-code">
                        <div class="nds-code-action"><button class="nds-btn nds-subtle copy-btn"
                                aria-label="Copy code"><i class="hgi hgi-stroke hgi-copy-01"></i></button></div><code
                            class="code">data-current="2"</code>
                    </div> - Current step number
                </li>
                <li>
                    <div class="nds-code">
                        <div class="nds-code-action"><button class="nds-btn nds-subtle copy-btn"
                                aria-label="Copy code"><i class="hgi hgi-stroke hgi-copy-01"></i></button></div><code
                            class="code">data-total="4"</code>
                    </div> - Total number of steps
                </li>
                <li>
                    <div class="nds-code">
                        <div class="nds-code-action"><button class="nds-btn nds-subtle copy-btn"
                                aria-label="Copy code"><i class="hgi hgi-stroke hgi-copy-01"></i></button></div><code
                            class="code">data-step-text="1"</code>
                    </div> - Custom step text or number
                </li>
            </ul>

            <h3>Progress Circle</h3>
            <p>Add a progress circle inside the stepper container to show overall completion percentage.</p>

            <h3>JavaScript Control</h3>
            <p>Control stepper programmatically using the NDS Stepper API:</p>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <code class="lang-javascript nds-expandable-content line-numbers">
// Method 1: Global API (requires stepper ID)
NDSStepper.next('my-stepper');
NDSStepper.previous('my-stepper');
NDSStepper.goTo('my-stepper', 3);
NDSStepper.setState('my-stepper', 2, 'error');

// Method 2: Get instance by ID
const stepper = NDSStepper.get('my-stepper');
stepper.next();
stepper.previous();
stepper.goTo(3);
stepper.setState(2, 'warning');
console.log(stepper.current, stepper.total, stepper.progress);
                </code>
            </div>

            <h3>Data Attribute Control (NEW!)</h3>
            <p>Control stepper directly via data attributes with automatic synchronization:</p>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <code class="lang-javascript nds-expandable-content line-numbers">
const stepper = document.getElementById('my-stepper');

// Update current step (automatically updates UI)
stepper.dataset.current = '2';

// Complete stepper (linear only - marks all steps completed)
stepper.dataset.current = '4'; // On 3-step stepper = all completed

// Note: Radial steppers clamp to totalSteps
radialStepper.dataset.current = '4'; // On 3-step = clamped to 3
                </code>
            </div>

            <h3>Control Buttons</h3>
            <p>Use data attributes to create control buttons with automatic or explicit targeting:</p>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <code class="lang-html nds-expandable-content line-numbers">
<!-- Basic controls (targets closest or first stepper) -->
<button data-stepper-control="next">Next Step</button>
<button data-stepper-control="previous">Previous Step</button>
<button data-stepper-control="goto" data-stepper-value="3">Go to Step 3</button>

<!-- Explicit targeting for multiple steppers -->
<button data-stepper-control="next" data-stepper-target="stepper-1">Next for Stepper 1</button>
<button data-stepper-control="goto" data-stepper-value="2" data-stepper-target="stepper-2">Go to Step 2</button>
                </code>
            </div>

            <h3>Button Targeting</h3>
            <p>Control buttons use this targeting priority:</p>
            <ul>
                <li><strong>Explicit:</strong>
                    <div class="nds-code">
                        <div class="nds-code-action"><button class="nds-btn nds-subtle copy-btn"
                                aria-label="Copy code"><i class="hgi hgi-stroke hgi-copy-01"></i></button></div><code
                            class="code">data-stepper-target="stepper-id"</code>
                    </div> - Target specific stepper by ID
                </li>
                <li><strong>Automatic:</strong> Closest parent <div class="nds-code">
                        <div class="nds-code-action"><button class="nds-btn nds-subtle copy-btn"
                                aria-label="Copy code"><i class="hgi hgi-stroke hgi-copy-01"></i></button></div><code
                            class="code">.nds-stepper</code>
                    </div> element</li>
                <li><strong>Fallback:</strong> First <div class="nds-code">
                        <div class="nds-code-action"><button class="nds-btn nds-subtle copy-btn"
                                aria-label="Copy code"><i class="hgi hgi-stroke hgi-copy-01"></i></button></div><code
                            class="code">.nds-stepper</code>
                    </div> on the page</li>
            </ul>

            <h3>Event Listening</h3>
            <p>Listen for step changes:</p>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <code class="lang-javascript nds-expandable-content line-numbers">
document.addEventListener('nds:stepper:change', (e) => {
    console.log('Current Step:', e.detail.currentStep);
    console.log('Total Steps:', e.detail.totalSteps);
    console.log('Progress:', e.detail.progressPercentage + '%');
});
                </code>
            </div>

            <h3>Linear vs Radial Behavior</h3>
            <p>Different stepper types have different completion behaviors:</p>

            <h4>Linear Steppers (Default & Vertical)</h4>
            <ul>
                <li>Allow <div class="nds-code">
                        <div class="nds-code-action"><button class="nds-btn nds-subtle copy-btn"
                                aria-label="Copy code"><i class="hgi hgi-stroke hgi-copy-01"></i></button></div><code
                            class="code">currentStep > totalSteps</code>
                    </div> (marks all steps completed)</li>
                <li>Clicking <div class="nds-code">
                        <div class="nds-code-action"><button class="nds-btn nds-subtle copy-btn"
                                aria-label="Copy code"><i class="hgi hgi-stroke hgi-copy-01"></i></button></div><code
                            class="code">next()</code>
                    </div> on last step marks it completed</li>
                <li>Clicking <div class="nds-code">
                        <div class="nds-code-action"><button class="nds-btn nds-subtle copy-btn"
                                aria-label="Copy code"><i class="hgi hgi-stroke hgi-copy-01"></i></button></div><code
                            class="code">previous()</code>
                    </div> on completed last step un-completes it</li>
                <li>Perfect for multi-step forms and registration flows</li>
            </ul>

            <h4>Radial Steppers (<div class="nds-code">
                    <div class="nds-code-action"><button class="nds-btn nds-subtle copy-btn" aria-label="Copy code"><i
                                class="hgi hgi-stroke hgi-copy-01"></i></button></div><code
                        class="code">.nds-radial</code>
                </div>)</h4>
            <ul>
                <li>Clamp <div class="nds-code">
                        <div class="nds-code-action"><button class="nds-btn nds-subtle copy-btn"
                                aria-label="Copy code"><i class="hgi hgi-stroke hgi-copy-01"></i></button></div><code
                            class="code">currentStep</code>
                    </div> to <div class="nds-code">
                        <div class="nds-code-action"><button class="nds-btn nds-subtle copy-btn"
                                aria-label="Copy code"><i class="hgi hgi-stroke hgi-copy-01"></i></button></div><code
                            class="code">totalSteps</code>
                    </div> (cannot exceed)</li>
                <li>Normal next/previous navigation only</li>
                <li>No automatic completion behavior</li>
                <li>Maintains controlled circular progression</li>
            </ul>

            <h3>Performance Features</h3>
            <ul>
                <li>Cached radial check (no repeated DOM lookups)</li>
                <li>MutationObserver for automatic data-attribute synchronization</li>
                <li>Efficient microtask queue flag management</li>
                <li>Optimized for multiple steppers on the same page</li>
                <li>Zero infinite loops with internal update flag</li>
            </ul>

        </div>
    </div>
</section>