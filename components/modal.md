---
layout: page
title: Modal
hero_title: Modal Component - National Design System
hero_description: Modal dialog components built on cards with backdrop overlay and close button
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Modal Overview -->
<section id="modalOverview" class="nds-content-section">
    <div class="nds-section-content-container">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Modal Dialog</h2>
            <p class="nds-section-description">Modal components built on the card system with backdrop overlay, close
                button, and interactive features</p>
        </div>
        <div class="nds-section-content">

            <!-- Basic Modal Demo -->
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Modal</div>
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-sm", ".nds-modal", "modalSize"]'>
                            <span class="label">SM</span>
                        </button>
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-md", ".nds-modal", "modalSize"]'>
                            <span class="label">MD</span>
                        </button>
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-lg", ".nds-modal", "modalSize"]'>
                            <span class="label">LG</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <button class="nds-btn nds-primary nds-lg" data-modal-target="modal-basic-demo">
                            <span class="label">Open Modal</span>
                        </button>
                        <!-- Demo Modal -->
                        <div class="nds-modal-backdrop" id="modal-basic-demo">
                            <div class="nds-modal nds-card nds-stroke" role="dialog" aria-labelledby="modal-basic-title"
                                aria-hidden="true">
                                <div class="nds-card-header">
                                    <span class="nds-featured-icon nds-neutral nds-circle">
                                        <i class="hgi hgi-stroke hgi-information-circle icon"></i>
                                    </span>
                                    <button class="nds-modal-close nds-btn nds-subtle" aria-label="Close modal">
                                        <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
                                    </button>
                                </div>
                                <div class="nds-card-content">
                                    <div class="nds-card-text">
                                        <h3 class="nds-card-title" id="modal-basic-title">Confirm Action</h3>
                                        <p class="nds-card-description">Are you sure you want to proceed with this
                                            action?
                                            This cannot be undone.</p>
                                    </div>
                                </div>
                                <div class="nds-card-actions">
                                    <button class="nds-btn nds-secondary-outline nds-lg" data-modal-close>
                                        <span class="label">Cancel</span>
                                    </button>
                                    <button class="nds-btn nds-primary nds-lg" data-modal-close>
                                        <span class="label">Confirm</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                <div class="nds-tabs nds-code withDivider">
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-basic-1" id="tab-basic-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-basic-1"
                            aria-labelledby="tab-basic-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <div class="nds-expandable-content">
                                <code class="lang-html code">
                                    <!-- Trigger Button -->
                                    <button class="nds-btn nds-primary nds-lg" data-modal-target="modal-example">
                                        <span class="label">Open Modal</span>
                                    </button>

                                    <!-- Modal Backdrop -->
                                    <div class="nds-modal-backdrop" id="modal-example">
                                        <div class="nds-modal nds-card nds-stroke" role="dialog" aria-labelledby="modal-title" aria-hidden="true">
                                            <!-- Card Header with Close Button -->
                                            <div class="nds-card-header">
                                                <span class="nds-featured-icon nds-neutral nds-circle">
                                                    <i class="hgi hgi-stroke hgi-information-circle icon"></i>
                                                </span>
                                                <button class="nds-modal-close nds-btn nds-subtle" aria-label="Close modal">
                                                    <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
                                                </button>
                                            </div>
                                            <div class="nds-card-content">
                                                <div class="nds-card-text">
                                                    <h3 class="nds-card-title" id="modal-basic-title">Confirm Action</h3>
                                                    <p class="nds-card-description">Are you sure you want to proceed with this
                                                        action?
                                                        This cannot be undone.</p>
                                                </div>
                                            </div>
                                            <div class="nds-card-actions">
                                                <button class="nds-btn nds-secondary-outline nds-lg" data-modal-close>
                                                    <span class="label">Cancel</span>
                                                </button>
                                                <button class="nds-btn nds-primary nds-lg" data-modal-close>
                                                    <span class="label">Confirm</span>
                                                </button>
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
<section id="usageGuidelines" class="nds-content-section">
    <div class="nds-section-content-container">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
            <p class="nds-section-description">Best practices for using modal components effectively</p>
        </div>
        <div class="nds-section-content">
            <div class="guidelines-grid">
                <div class="guideline-item">
                    <h3>When to Use</h3>
                    <ul>
                        <li>Require immediate user confirmation or decision</li>
                        <li>Present critical warnings or compliance notices</li>
                        <li>Display detailed content without leaving the current view</li>
                        <li>Gate destructive or irreversible actions</li>
                    </ul>
                </div>
                <div class="guideline-item">
                    <h3>Modal Structure</h3>
                    <ul>
                        <li><strong>Card Header:</strong> Use <code>.nds-card-header</code> for title and close button
                        </li>
                        <li><strong>Card Content:</strong> Place the main message inside <code>.nds-card-content</code>
                        </li>
                        <li><strong>Card Actions:</strong> Optional action area via <code>.nds-card-actions</code>
                        </li>
                        <li>Design sections to be scrollable when content exceeds viewport height</li>
                    </ul>
                </div>
                <div class="guideline-item">
                    <h3>Accessibility</h3>
                    <ul>
                        <li>Trap focus inside the modal and return it to the trigger on close</li>
                        <li>Support ESC key dismissal alongside close buttons</li>
                        <li>Set <code>role="dialog"</code>, <code>aria-labelledby</code>, and <code>aria-hidden</code>
                            consistently</li>
                        <li>Always include a visible close control with a descriptive <code>aria-label</code></li>
                    </ul>
                </div>
                <div class="guideline-item">
                    <h3>Best Practices</h3>
                    <ul>
                        <li>Keep titles clear and contextual to the required action</li>
                        <li>Limit content to a single focused message or task</li>
                        <li>Provide explicit primary and secondary actions (Confirm/Cancel)</li>
                        <li>Choose size classes that fit the content without overwhelming the screen</li>
                        <li>Avoid stacking modals or using them for non-critical notifications</li>
                    </ul>
                </div>
                <div class="guideline-item">
                    <h3>JavaScript Integration</h3>
                    <ul>
                        <li><strong>Programmatic control:</strong> Use <code>NDSModal.open()</code> with modal ID</li>
                        <li><strong>State checks:</strong> <code>NDSModal.isOpen()</code> returns the active state</li>
                        <li><strong>Custom logic:</strong> Listen to <code>nds-modal-opened</code> and
                            <code>nds-modal-closed</code> events
                        </li>
                        <li>Sync focus state with modal lifecycle for accessibility</li>
                    </ul>

                    <h4>Code Example:</h4>
                    <div class="nds-code nds-expandable">
                        <div class="nds-code-action">
                            <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code class="lang-javascript nds-expandable-content">
// Open modal programmatically
NDSModal.open('modal-id');

// Close active modal
NDSModal.close();

// Check if modal is open
if (NDSModal.isOpen()) {
    // Modal is currently open
}

// Listen for modal events
document.getElementById('modal-id').addEventListener('nds-modal-opened', function(e) {
    console.log('Modal opened:', e.detail.modal);
});

document.getElementById('modal-id').addEventListener('nds-modal-closed', function(e) {
    console.log('Modal closed:', e.detail.modal);
});
                        </code>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>