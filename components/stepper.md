---
layout: page
title: Stepper
hero_title: Stepper Components - National Design System
hero_description: Progress indicator components for multi-step processes and workflows
breadcrumb: ["Components", "Stepper"]
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

                <!-- Data Attribute Example -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Stepper with Custom Text & Dynamic Actions</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-vertical", ".nds-stepper", "layoutToggle"]'>
                                <span class="label">Vertical</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-radial", ".nds-stepper", "layoutToggle"]'>
                                <span class="label">Radial</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["error", ".nds-stepper-step.current", "stepState"]'>
                                <span class="label">Toggle Error</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-stepper">
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
                                    <div class="progress-circle" data-current="2" data-total="4">
                                        <svg width="64" height="64" viewBox="0 0 24 24">
                                            <circle class="progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="3" />
                                            <circle class="progress-bar" cx="12" cy="12" r="10" fill="none"
                                                stroke-width="3" stroke-dasharray="62.83" stroke-dashoffset="62.83"
                                                stroke-linecap="round" />
                                        </svg>
                                    </div>
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
                                    aria-controls="panel-data-attr-1" id="tab-data-attr-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-data-attr-1"
                                aria-labelledby="tab-data-attr-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
                                    <!-- Government service application stepper -->
                                    <div class="nds-stepper">
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
</section>

<!-- Usage Guidelines -->
<section id="stepperGuidelines" class="nds-content-section">
    <div class="nds-section-content-container">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
            <p class="nds-section-description">Best practices for implementing stepper components</p>
        </div>
        <div class="nds-section-content">
            <div class="guidelines-content">
                <h3>When to Use</h3>
                <ul>
                    <li>Multi-step forms or processes</li>
                    <li>Sequential workflows</li>
                    <li>Progress indication for complex tasks</li>
                    <li>Breaking down complicated processes into manageable steps</li>
                </ul>

                <h3>Unified Component Structure</h3>
                <ul>
                    <li><strong>Container:</strong> <code>.nds-stepper</code> - Main wrapper with optional layout
                        modifiers</li>
                    <li><strong>Step:</strong> <code>.nds-stepper-step</code> - Individual step wrapper</li>
                    <li><strong>Base:</strong> <code>.nds-stepper-base</code> - Contains the circle indicator</li>
                    <li><strong>Circle:</strong> <code>.nds-stepper-circle</code> - Numbered indicator</li>
                    <li><strong>Content:</strong> <code>.nds-stepper-content</code> - Title and description area</li>
                </ul>

                <h3>State Classes</h3>
                <ul>
                    <li><code>.completed</code> - Finished steps (shows checkmark or filled circle)</li>
                    <li><code>.current</code> - Active step (highlighted with primary color)</li>
                    <li><code>.upcoming</code> - Future steps (muted colors)</li>
                    <li><code>.has-line</code> - Adds connecting line to next step</li>
                </ul>

                <h3>Layout Options</h3>
                <ul>
                    <li><strong>Default (Horizontal):</strong> <code>.nds-stepper</code> - Horizontal step arrangement
                        with connecting lines</li>
                    <li><strong>Vertical Enhanced:</strong> <code>.nds-stepper.nds-vertical</code> - Vertical layout
                        with vertical connecting lines and side-by-side content</li>
                    <li>All layouts use the same HTML structure - only CSS classes change the appearance</li>
                    <li>Horizontal layout automatically switches to vertical on mobile devices</li>
                </ul>

                <h3>Vertical Layout Benefits</h3>
                <ul>
                    <li>Vertical connecting lines between steps for better visual flow</li>
                    <li>Side-by-side circle and content alignment for improved readability</li>
                    <li>Enhanced spacing for better visual hierarchy</li>
                    <li>Perfect for detailed multi-step processes and forms</li>
                </ul>

                <h3>CSS-Only Dynamic Text</h3>
                <ul>
                    <li><strong>CSS Counters:</strong> Add <code>.css-content</code> class for automatic step numbering
                    </li>
                    <li><strong>Data Attributes:</strong> Use <code>data-step-text="custom"</code> for custom
                        text/symbols</li>
                    <li><strong>State Overrides:</strong> Completed steps show ✓, error steps show !, warning steps show
                        ⚠</li>
                    <li><strong>No JavaScript:</strong> Pure CSS solution using <code>content</code> property and
                        <code>counter()</code>
                    </li>
                    <li><strong>Automatic Fallback:</strong> Regular HTML text still works without CSS classes</li>
                </ul>

            </div>
        </div>
    </div>
</section>