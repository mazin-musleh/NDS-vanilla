---
layout: page
title: Modal
hero_title: Modal Component - National Design System
hero_description: Modal dialog components built on cards with backdrop overlay and close button
breadcrumb: ["Components"]
lang: en
direction: ltr
layout_class: cardView topSubMenu
---

<!-- Modal Overview -->
<section id="modalOverview" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Modal Dialog</h2>
            <p class="nds-section-description">Modal components built on the card system with backdrop overlay, close
                button, and interactive features</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">

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
                            <div id="modal-basic-demo" class="nds-modal nds-card nds-stroke" role="dialog" aria-labelledby="modal-basic-title"
                                aria-hidden="true" hidden>
                                <div class="nds-card-header">
                                    <span class="nds-featured-icon nds-neutral nds-circle">
                                        <i class="hgi hgi-stroke hgi-information-circle icon"></i>
                                    </span>
                                    <button class="nds-close nds-modal-close nds-btn nds-subtle" aria-label="Close modal">
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
                                    <div class="nds-form-container nds-textarea">
                                        <div class="nds-form-header">
                                            <label for="textareaInput">
                                                <span class="label">Textarea</span>
                                            </label>
                                        </div>
                                        <div class="nds-form-control">
                                            <textarea id="textareaInput" class="nds-textarea"
                                                placeholder="Enter your message..." rows="4"></textarea>
                                        </div>
                                        <div class="nds-form-footer">
                                            <span class="nds-feedback nds-outline nds-sm">
                                                <span class="nds-feedback-icon">
                                                    <i class="hgi hgi-stroke icon"></i>
                                                </span>
                                                <span class="msg"></span>
                                            </span>
                                        </div>
                                    </div>

                                </div>
                                <div class="nds-card-actions">
                                    <button class="nds-btn nds-primary nds-lg" data-modal-close>
                                        <span class="label">Confirm</span>
                                    </button>
                                    <button class="nds-btn nds-secondary-outline nds-lg" data-modal-close>
                                        <span class="label">Cancel</span>
                                    </button>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-modal-html-1" id="tab-modal-html-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-modal-html-1"
                                    aria-labelledby="tab-modal-html-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code"><!-- Trigger Button -->
<button class="nds-btn nds-primary nds-lg" data-modal-target="modal-example">
  <span class="label">Open Modal</span>
</button>

<!-- Modal Dialog -->
<div id="modal-example" class="nds-modal nds-card nds-stroke" role="dialog" aria-labelledby="modal-title" aria-hidden="true" hidden>
  <div class="nds-card-header">
    <span class="nds-featured-icon nds-neutral nds-circle">
      <i class="hgi hgi-stroke hgi-information-circle icon"></i>
    </span>
    <button class="nds-close nds-modal-close nds-btn nds-subtle" aria-label="Close modal">
      <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
    </button>
  </div>
  <div class="nds-card-content">
    <div class="nds-card-text">
      <h3 class="nds-card-title" id="modal-title">Confirm Action</h3>
      <p class="nds-card-description">Are you sure you want to proceed? This cannot be undone.</p>
    </div>
  </div>
  <div class="nds-card-actions">
    <button class="nds-btn nds-primary nds-lg" data-modal-close>
      <span class="label">Confirm</span>
    </button>
    <button class="nds-btn nds-secondary-outline nds-lg" data-modal-close>
      <span class="label">Cancel</span>
    </button>
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

<!-- Usage Guidelines -->
<section id="usageGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
            <p class="nds-section-description">Best practices for using modal components effectively</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-content-block">
                <h3 class="nds-block-title">When to Use</h3>
                <ul>
                    <li>Require immediate user confirmation or decision</li>
                    <li>Present critical warnings or compliance notices</li>
                    <li>Display detailed content without leaving the current view</li>
                    <li>Gate destructive or irreversible actions</li>
                </ul>
            </div>
            <div class="nds-content-block">
                <h3 class="nds-block-title">Structure</h3>
                <ul>
                    <li><strong>Card Header:</strong> Icon and close button via .nds-card-header</li>
                    <li><strong>Card Content:</strong> Main message inside .nds-card-content</li>
                    <li><strong>Card Actions:</strong> Primary and secondary buttons via .nds-card-actions</li>
                    <li><strong>Sizes:</strong> nds-sm (400px), nds-md (600px, default), nds-lg (800px), nds-full</li>
                </ul>
            </div>
            <div class="nds-content-block">
                <h3 class="nds-block-title">Accessibility</h3>
                <ul>
                    <li><strong>Focus trap:</strong> Tab/Shift+Tab cycles within the modal automatically</li>
                    <li><strong>Keyboard:</strong> ESC key closes the modal</li>
                    <li><strong>ARIA:</strong> Set role="dialog", aria-labelledby, and aria-hidden</li>
                    <li><strong>Close button:</strong> Include visible close with aria-label="Close modal"</li>
                </ul>
            </div>
            <div class="nds-content-block">
                <h3 class="nds-block-title">Mobile Behavior</h3>
                <ul>
                    <li>Slides up from bottom as a bottom sheet</li>
                    <li>Full-width with rounded top corners</li>
                    <li>Action buttons expand to full width</li>
                    <li>Body scroll locked while open, restored on close</li>
                </ul>
            </div>
            <div class="nds-content-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>Modals initialize automatically. Use data attributes for declarative control or the JS API for programmatic control.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript">// Open modal programmatically (by ID string)
NDS.Modal.open('modal-id');

// Close currently active modal
NDS.Modal.close();

// Check if any modal is open
NDS.Modal.isOpen(); // returns boolean

// Listen for modal events (fire on the modal element, bubble up)
const modal = document.getElementById('modal-id');

modal.addEventListener('nds-modal-opened', (e) => {
    // Modal is now visible — add custom logic here
});

modal.addEventListener('nds-modal-closed', (e) => {
    // Modal is now hidden — cleanup, form reset, etc.
});
                        </code>
                    </div>
                </div>
            </div>
            <div class="nds-content-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Keep titles clear and contextual to the required action</li>
                    <li>Limit content to a single focused message or task</li>
                    <li>Provide explicit primary and secondary actions (Confirm/Cancel)</li>
                    <li>Choose size classes that fit the content without overwhelming the screen</li>
                    <li>Avoid stacking modals or using them for non-critical notifications</li>
                </ul>
            </div>
        </div>
    </div>
</section>