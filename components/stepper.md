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

                <!-- Horizontal & Vertical Stepper -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Stepper with Custom Text & Dynamic Actions</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-vertical", ".nds-stepper", "layoutToggle"]'>
                                <span class="label">Vertical</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["error", ".nds-stepper-step.current", "stepState"]'>
                                <span class="label">Toggle Error</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle" data-stepper-control="previous">
                                <span class="label">← Previous</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle" data-stepper-control="next">
                                <span class="label">Next →</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle" data-stepper-control="goto"
                                data-stepper-value="1">
                                <span class="label">Go to 1</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle" data-stepper-control="goto"
                                data-stepper-value="3">
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
                            <div class="nds-stepper" id="demo-stepper-1" data-current="2" data-total="3">
                                <div class="nds-stepper-step completed has-line">
                                    <div class="nds-stepper-base">
                                        <div class="nds-stepper-circle" data-step-text="1"></div>
                                    </div>
                                    <div class="nds-stepper-content">
                                        <p class="nds-stepper-title">Personal Information</p>
                                        <p class="nds-stepper-description">Identity details and contact information</p>
                                    </div>
                                </div>
                                <div class="nds-stepper-step current has-line">
                                    <div class="nds-stepper-base">
                                        <div class="nds-stepper-circle" data-step-text="2"></div>
                                    </div>
                                    <div class="nds-stepper-content">
                                        <p class="nds-stepper-title">Document Upload</p>
                                        <p class="nds-stepper-description">Upload required supporting documents</p>
                                    </div>
                                </div>
                                <div class="nds-stepper-step upcoming">
                                    <div class="nds-stepper-base">
                                        <div class="nds-stepper-circle" data-step-text="3"></div>
                                    </div>
                                    <div class="nds-stepper-content">
                                        <p class="nds-stepper-title">Review & Confirmation</p>
                                        <p class="nds-stepper-description">Verify information before submission</p>
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
                                    <div class="nds-stepper" id="stepper-1" data-current="2" data-total="3">
                                        <div class="nds-stepper-step completed has-line">
                                            <div class="nds-stepper-base">
                                                <div class="nds-stepper-circle" data-step-text="1"></div>
                                            </div>
                                            <div class="nds-stepper-content">
                                                <p class="nds-stepper-title">Personal Information</p>
                                                <p class="nds-stepper-description">Identity details and contact information</p>
                                            </div>
                                        </div>
                                        <div class="nds-stepper-step current has-line">
                                            <div class="nds-stepper-base">
                                                <div class="nds-stepper-circle" data-step-text="2"></div>
                                            </div>
                                            <div class="nds-stepper-content">
                                                <p class="nds-stepper-title">Document Upload</p>
                                                <p class="nds-stepper-description">Upload required supporting documents</p>
                                            </div>
                                        </div>
                                        <div class="nds-stepper-step upcoming">
                                            <div class="nds-stepper-base">
                                                <div class="nds-stepper-circle" data-step-text="3"></div>
                                            </div>
                                            <div class="nds-stepper-content">
                                                <p class="nds-stepper-title">Review & Confirmation</p>
                                                <p class="nds-stepper-description">Verify information before submission</p>
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
                            <div class="nds-stepper nds-radial" id="demo-stepper-radial" data-current="2"
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
                                        <p class="nds-stepper-title">Personal Information</p>
                                        <p class="nds-stepper-description">Identity details and contact information</p>
                                    </div>
                                </div>
                                <div class="nds-stepper-step current has-line">
                                    <div class="nds-stepper-base">
                                        <div class="nds-stepper-circle" data-step-text="2"></div>
                                    </div>
                                    <div class="nds-stepper-content">
                                        <p class="nds-stepper-title">Document Upload</p>
                                        <p class="nds-stepper-description">Upload required supporting documents</p>
                                    </div>
                                </div>
                                <div class="nds-stepper-step upcoming has-line">
                                    <div class="nds-stepper-base">
                                        <div class="nds-stepper-circle" data-step-text="3"></div>
                                    </div>
                                    <div class="nds-stepper-content">
                                        <p class="nds-stepper-title">Review & Confirmation</p>
                                        <p class="nds-stepper-description">Verify information before submission</p>
                                    </div>
                                </div>
                                <div class="nds-stepper-step upcoming">
                                    <div class="nds-stepper-base">
                                        <div class="nds-stepper-circle" data-step-text="4"></div>
                                    </div>
                                    <div class="nds-stepper-content">
                                        <p class="nds-stepper-title">Application Submitted</p>
                                        <p class="nds-stepper-description">Confirmation and next steps</p>
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
                                    <div class="nds-stepper nds-radial" id="stepper-radial" data-current="2" data-total="4">
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
                                                <p class="nds-stepper-title">Personal Information</p>
                                                <p class="nds-stepper-description">Identity details and contact information</p>
                                            </div>
                                        </div>
                                        <div class="nds-stepper-step current has-line">
                                            <div class="nds-stepper-base">
                                                <div class="nds-stepper-circle" data-step-text="2"></div>
                                            </div>
                                            <div class="nds-stepper-content">
                                                <p class="nds-stepper-title">Document Upload</p>
                                                <p class="nds-stepper-description">Upload required supporting documents</p>
                                            </div>
                                        </div>
                                        <div class="nds-stepper-step upcoming has-line">
                                            <div class="nds-stepper-base">
                                                <div class="nds-stepper-circle" data-step-text="3"></div>
                                            </div>
                                            <div class="nds-stepper-content">
                                                <p class="nds-stepper-title">Review & Confirmation</p>
                                                <p class="nds-stepper-description">Verify information before submission</p>
                                            </div>
                                        </div>
                                        <div class="nds-stepper-step upcoming">
                                            <div class="nds-stepper-base">
                                                <div class="nds-stepper-circle" data-step-text="4"></div>
                                            </div>
                                            <div class="nds-stepper-content">
                                                <p class="nds-stepper-title">Application Submitted</p>
                                                <p class="nds-stepper-description">Confirmation and next steps</p>
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
                <li><code>.nds-stepper</code> - Main container</li>
                <li><code>.nds-stepper-step</code> - Individual step wrapper</li>
                <li><code>.nds-stepper-base</code> - Contains the circle indicator</li>
                <li><code>.nds-stepper-circle</code> - Numbered indicator</li>
                <li><code>.nds-stepper-content</code> - Title and description area</li>
            </ul>

            <h3>States</h3>
            <ul>
                <li><code>.completed</code> - Finished steps</li>
                <li><code>.current</code> - Active step</li>
                <li><code>.upcoming</code> - Future steps</li>
                <li><code>.error</code> - Error state</li>
                <li><code>.has-line</code> - Adds connecting line</li>
            </ul>

            <h3>Layouts</h3>
            <ul>
                <li><strong>Horizontal:</strong> Default layout</li>
                <li><strong>Vertical:</strong> Add <code>.nds-vertical</code> class</li>
                <li><strong>Radial:</strong> Add <code>.nds-radial</code> class (includes progress circle)</li>
            </ul>

            <h3>Data Attributes</h3>
            <ul>
                <li><code>data-current="2"</code> - Current step number</li>
                <li><code>data-total="4"</code> - Total number of steps</li>
                <li><code>data-step-text="1"</code> - Custom step text or number</li>
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
                <code class="lang-javascript nds-expandable-content">
// Navigate between steps (requires stepper ID)
NDSStepper.next('my-stepper');
NDSStepper.previous('my-stepper');
NDSStepper.goTo('my-stepper', 3);

// Set step states
NDSStepper.setState('my-stepper', 2, 'error');
NDSStepper.setState('my-stepper', 1, 'completed');

// Get stepper information
const stepper = NDSStepper.get('my-stepper');
const currentStep = stepper.getCurrentStep();
const progress = stepper.getProgressPercentage();
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
                <code class="lang-html nds-expandable-content">
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
                <li><strong>Explicit:</strong> <code>data-stepper-target="stepper-id"</code> - Target specific stepper
                    by ID</li>
                <li><strong>Automatic:</strong> Closest parent <code>.nds-stepper</code> element</li>
                <li><strong>Fallback:</strong> First <code>.nds-stepper</code> on the page</li>
            </ul>

            <h3>Event Listening</h3>
            <p>Listen for step changes:</p>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <code class="lang-javascript nds-expandable-content">
document.addEventListener('nds:stepper:change', (e) => {
    console.log('Step changed to:', e.detail.currentStep);
    console.log('Progress:', e.detail.progressPercentage + '%');
});
                </code>
            </div>

        </div>
    </div>
</section>