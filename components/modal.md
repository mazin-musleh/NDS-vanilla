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
    <div class="nds-section-wrapper">
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
                                            <span class="nds-feedback">
                                                <span class="nds-feedback-icon nds-outline nds-sm">
                                                    <i class="hgi hgi-solid icon"></i>
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
                <div class="nds-tabs nds-code nds-divided" hidden>
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

                                    <!-- Modal Dialog -->
                                    <div id="modal-example" class="nds-modal nds-card nds-stroke" role="dialog" aria-labelledby="modal-title" aria-hidden="true" hidden>
                                            <!-- Card Header with Close Button -->
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
</section>

<!-- Usage Guidelines -->
<section id="usageGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
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
                        <li><strong>Focus trap:</strong> Focus cycles within the modal using Tab/Shift+Tab</li>
                        <li><strong>Keyboard support:</strong> ESC key closes the modal</li>
                        <li><strong>ARIA attributes:</strong> Set <code>role="dialog"</code>,
                            <code>aria-labelledby</code>, and <code>aria-hidden</code>
                        </li>
                        <li><strong>Close button:</strong> Include visible close control with
                            <code>aria-label="Close modal"</code>
                        </li>
                        <li><strong>Scroll preservation:</strong> Page scroll position maintained when modal
                            opens/closes</li>
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
                        <li><strong>Automatic initialization:</strong> Modals initialize automatically via nds-loader.js
                        </li>
                        <li><strong>Programmatic control:</strong> Use <code>window.NDSModal.open('modal-id')</code>
                        </li>
                        <li><strong>State checks:</strong> <code>window.NDSModal.isOpen()</code> returns boolean</li>
                        <li><strong>Custom events:</strong> Listen to <code>nds-modal-opened</code> and
                            <code>nds-modal-closed</code>
                        </li>
                        <li><strong>Focus trap:</strong> Automatically enabled when modal opens</li>
                    </ul>

                    <h4>Code Examples:</h4>
                    <div class="nds-code nds-expandable">
                        <div class="nds-code-action">
                            <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code class="lang-javascript nds-expandable-content">
// Open modal programmatically (by ID string)
window.NDSModal.open('modal-id');

// Close currently active modal
window.NDSModal.close();

// Check if any modal is open
if (window.NDSModal.isOpen()) {
    console.log('A modal is currently active');
}

// Open modal on page load
document.addEventListener('DOMContentLoaded', function() {
    window.NDSModal.open('welcome-modal');
});

// Open modal after delay
setTimeout(function() {
    window.NDSModal.open('promo-modal');
}, 3000);

// Listen for modal events
const modal = document.getElementById('modal-id');

modal.addEventListener('nds-modal-opened', function(e) {
    console.log('Modal opened');
    // Add custom logic here
});

modal.addEventListener('nds-modal-closed', function(e) {
    console.log('Modal closed');
    // Add custom logic here
});

// Open modal based on condition
if (!localStorage.getItem('visited')) {
    window.NDSModal.open('first-time-modal');
    localStorage.setItem('visited', 'true');
}
                        </code>
                    </div>
                </div>
                <div class="guideline-item">
                    <h3>Mobile Behavior</h3>
                    <ul>
                        <li><strong>Bottom sheet:</strong> Modal slides up from bottom on mobile devices</li>
                        <li><strong>Animation:</strong> Smooth 300ms slide-up/slide-down transition</li>
                        <li><strong>Layout:</strong> Full-width with rounded top corners on mobile</li>
                        <li><strong>Scroll lock:</strong> Body scroll locked while modal is open</li>
                        <li><strong>Scroll preservation:</strong> Returns to original scroll position on close</li>
                        <li><strong>Full-width actions:</strong> Action buttons expand to full width on mobile</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Features Section -->
<section id="modalFeatures" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Modal Features</h2>
            <p class="nds-section-description">Built-in functionality and behaviors</p>
        </div>
        <div class="nds-section-content">
            <div class="guidelines-grid">
                <div class="guideline-item">
                    <h3>Focus Trap</h3>
                    <p>Keyboard focus cycles within the modal when using Tab/Shift+Tab:</p>
                    <ul>
                        <li>Pressing Tab on last focusable element returns to first</li>
                        <li>Pressing Shift+Tab on first element jumps to last</li>
                        <li>Automatically enabled on modal open</li>
                        <li>Automatically removed on modal close</li>
                        <li>Dynamically detects all focusable elements</li>
                    </ul>
                </div>
                <div class="guideline-item">
                    <h3>Scroll Position Preservation</h3>
                    <p>The page scroll position is maintained when opening/closing modals:</p>
                    <ul>
                        <li>Scroll position saved before modal opens</li>
                        <li>Body fixed to prevent background scrolling</li>
                        <li>Visual position maintained with negative top offset</li>
                        <li>Scroll restored to exact position on close</li>
                        <li>Prevents jarring scroll jumps on mobile</li>
                    </ul>
                </div>
                <div class="guideline-item">
                    <h3>Animation System</h3>
                    <p>Smooth animations for opening and closing:</p>
                    <ul>
                        <li><strong>Desktop:</strong> Backdrop fade-in/fade-out (300ms)</li>
                        <li><strong>Mobile:</strong> Bottom sheet slide-up animation (300ms)</li>
                        <li>Display changed before animation for proper transitions</li>
                        <li>RequestAnimationFrame ensures smooth rendering</li>
                        <li>Display reset after animation completes</li>
                    </ul>
                </div>
                <div class="guideline-item">
                    <h3>Event System</h3>
                    <p>Custom events for integration:</p>
                    <ul>
                        <li><code>nds-modal-opened</code> - Fires when modal opens</li>
                        <li><code>nds-modal-closed</code> - Fires when modal closes</li>
                        <li>Events bubble up the DOM tree</li>
                        <li>Event detail includes modal element reference</li>
                        <li>Use for analytics, form resets, or custom behaviors</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>