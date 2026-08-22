---
layout: page
title: Modal
hero_title: Modal - National Design System
hero_description: Focuses the user on a single task or decision by overlaying a dialog that must be addressed before continuing
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.8.x"
last_edit: "22/08/2026 - 01:19 PM"
---

<!-- Modal Dialog -->
<section id="modalOverview" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Modal Dialog</h2>
            <p class="nds-section-description">Use when the user needs to confirm an action, acknowledge a warning, or complete a short form before the app can continue</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-showcase">

                    <div class="nds-demo-card">
                        <div class="demo-header">
                            <div class="demo-action">
                                <div class="nds-dropmenu demo-toggle-menu">
                                    <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Size: ">
                                        <span class="nds-label">Size: Default</span>
                                    </button>
                                    <div class="nds-dropmenu-menu" hidden>
                                        <div class="nds-dropmenu-scroll">
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                                data-toggler='["", ".nds-modal", "modalSize"]'
                                                data-trigger-label="Default">
                                                <span class="nds-label">Default (600px)</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='["nds-sm", ".nds-modal", "modalSize"]'>
                                                <span class="nds-label">Small (400px)</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='["nds-lg", ".nds-modal", "modalSize"]'>
                                                <span class="nds-label">Large (800px)</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='["nds-full", ".nds-modal", "modalSize"]'>
                                                <span class="nds-label">Full</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="demo-container">
                            <div class="state-demo">
                                <button class="nds-btn nds-primary nds-lg" data-modal-target="modal-basic-demo">
                                    <span class="nds-label">Open Modal</span>
                                </button>
                                <div id="modal-basic-demo" class="nds-modal nds-card nds-stroke" role="dialog" aria-labelledby="modal-basic-title"
                                    aria-hidden="true" hidden>
                                    <div class="nds-card-header">
                                        <div class="nds-card-featured-icon">
                                            <span class="nds-featured-icon nds-circle">
                                                <i class="nds-icon nds-hgi-information-circle" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                        <button class="nds-close nds-modal-close nds-btn nds-subtle" aria-label="Close modal">
                                            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <span class="nds-card-title" id="modal-basic-title">Confirm Action</span>
                                            <p class="nds-card-description">Are you sure you want to proceed with this
                                                action?
                                                This cannot be undone.</p>
                                        </div>
                                        <div class="nds-form-container nds-textarea">
                                            <div class="nds-form-header">
                                                <label for="textareaInput">
                                                    <span class="nds-label">Textarea</span>
                                                </label>
                                            </div>
                                            <div class="nds-form-control">
                                                <textarea id="textareaInput" class="nds-textarea"
                                                    placeholder="Enter your message..." rows="4"></textarea>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="nds-card-actions">
                                        <button class="nds-btn nds-primary nds-lg" data-modal-close>
                                            <span class="nds-label">Confirm</span>
                                        </button>
                                        <button class="nds-btn nds-secondary-outline nds-lg" data-modal-close>
                                            <span class="nds-label">Cancel</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="demo-code">
                            <div class="nds-tabs nds-code nds-divided">
                                <div class="nds-tab-list-container nds-scroll-more">
                                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                            aria-controls="panel-modal-default-1" id="tab-modal-default-1">
                                            <span class="nds-tab-label">HTML</span>
                                        </button>
                                    </nav>
                                    <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="nds-tab-content">
                                    <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-modal-default-1"
                                        aria-labelledby="tab-modal-default-1">
                                        <div class="nds-code-action">
                                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                                <i class="nds-icon nds-hgi-copy-01"></i>
                                            </button>
                                        </div>
                                        <div class="nds-expandable-content">
                                            <code class="lang-html code">
&lt;!-- Trigger Button --&gt;
&lt;button class="nds-btn nds-primary nds-lg" data-modal-target="modal-basic-demo"&gt;
  &lt;span class="nds-label"&gt;Open Modal&lt;/span&gt;
&lt;/button&gt;

&lt;!-- Modal Dialog --&gt;
&lt;div id="modal-basic-demo" class="nds-modal nds-card nds-stroke" role="dialog" aria-labelledby="modal-basic-title"
    aria-hidden="true" hidden&gt;
  &lt;div class="nds-card-header"&gt;
    &lt;div class="nds-card-featured-icon"&gt;
      &lt;span class="nds-featured-icon nds-circle"&gt;
        &lt;i class="nds-icon nds-hgi-information-circle" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;/span&gt;
    &lt;/div&gt;
    &lt;button class="nds-close nds-modal-close nds-btn nds-subtle" aria-label="Close modal"&gt;
      &lt;i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"&gt;&lt;/i&gt;
    &lt;/button&gt;
  &lt;/div&gt;
  &lt;div class="nds-card-content"&gt;
    &lt;div class="nds-card-text"&gt;
      &lt;span class="nds-card-title" id="modal-basic-title"&gt;Confirm Action&lt;/span&gt;
      &lt;p class="nds-card-description"&gt;Are you sure you want to proceed with this action?
          This cannot be undone.&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-container nds-textarea"&gt;
      &lt;div class="nds-form-header"&gt;
        &lt;label for="textareaInput"&gt;
          &lt;span class="nds-label"&gt;Textarea&lt;/span&gt;
        &lt;/label&gt;
      &lt;/div&gt;
      &lt;div class="nds-form-control"&gt;
        &lt;textarea id="textareaInput" class="nds-textarea"
            placeholder="Enter your message..." rows="4"&gt;&lt;/textarea&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-card-actions"&gt;
    &lt;button class="nds-btn nds-primary nds-lg" data-modal-close&gt;
      &lt;span class="nds-label"&gt;Confirm&lt;/span&gt;
    &lt;/button&gt;
    &lt;button class="nds-btn nds-secondary-outline nds-lg" data-modal-close&gt;
      &lt;span class="nds-label"&gt;Cancel&lt;/span&gt;
    &lt;/button&gt;
  &lt;/div&gt;
&lt;/div&gt;
                                        </code>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="nds-demo-card">
                        <div class="demo-header">
                            <div class="demo-action">
                                <div class="nds-dropmenu demo-toggle-menu">
                                    <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Status: ">
                                        <span class="nds-label">Status: Success</span>
                                    </button>
                                    <div class="nds-dropmenu-menu" hidden>
                                        <div class="nds-dropmenu-scroll">
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                                data-toggler='[["data-status=success", "#modal-status-demo", "modalStatus", "attr"], ["nds-hgi-checkmark-circle-02", ".nds-featured-icon .nds-icon", "modalStatus"]]'>
                                                <span class="nds-label">Success</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='[["data-status=error", "#modal-status-demo", "modalStatus", "attr"], ["nds-hgi-cancel-circle", ".nds-featured-icon .nds-icon", "modalStatus"]]'>
                                                <span class="nds-label">Error</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='[["data-status=warning", "#modal-status-demo", "modalStatus", "attr"], ["nds-hgi-alert-circle", ".nds-featured-icon .nds-icon", "modalStatus"]]'>
                                                <span class="nds-label">Warning</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='[["data-status=info", "#modal-status-demo", "modalStatus", "attr"], ["nds-hgi-information-circle", ".nds-featured-icon .nds-icon", "modalStatus"]]'>
                                                <span class="nds-label">Info</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="demo-container">
                            <div class="state-demo">
                                <button class="nds-btn nds-primary nds-lg" data-modal-target="modal-status-demo">
                                    <span class="nds-label">Open Status Modal</span>
                                </button>
                                <div id="modal-status-demo" class="nds-modal nds-card nds-stroke nds-center nds-sm" data-status="success"
                                    data-modal-static role="dialog" aria-labelledby="modal-status-title" aria-hidden="true" hidden>
                                    <div class="nds-card-header">
                                        <div class="nds-card-featured-icon">
                                            <span class="nds-featured-icon nds-xl nds-circle">
                                                <i class="nds-icon nds-hgi-checkmark-circle-02" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <span class="nds-card-title" id="modal-status-title">Request submitted</span>
                                            <p class="nds-card-description">Your request reached the service. You get a message when the review is done.</p>
                                        </div>
                                    </div>
                                    <div class="nds-card-actions">
                                        <button class="nds-btn nds-primary nds-lg" data-modal-close>
                                            <span class="nds-label">Done</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="demo-code">
                            <div class="nds-tabs nds-code nds-divided">
                                <div class="nds-tab-list-container nds-scroll-more">
                                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                            aria-controls="panel-modal-status-1" id="tab-modal-status-1">
                                            <span class="nds-tab-label">HTML</span>
                                        </button>
                                    </nav>
                                    <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="nds-tab-content">
                                    <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-modal-status-1"
                                        aria-labelledby="tab-modal-status-1">
                                        <div class="nds-code-action">
                                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                                <i class="nds-icon nds-hgi-copy-01"></i>
                                            </button>
                                        </div>
                                        <div class="nds-expandable-content">
                                            <code class="lang-html code">
&lt;!-- Trigger Button --&gt;
&lt;button class="nds-btn nds-primary nds-lg" data-modal-target="modal-status-demo"&gt;
  &lt;span class="nds-label"&gt;Open Status Modal&lt;/span&gt;
&lt;/button&gt;

&lt;!-- Status modal: centred card, no close button, closes only on an action --&gt;
&lt;div id="modal-status-demo" class="nds-modal nds-card nds-stroke nds-center nds-sm" data-status="success"
    data-modal-static role="dialog" aria-labelledby="modal-status-title" aria-hidden="true" hidden&gt;
  &lt;div class="nds-card-header"&gt;
    &lt;div class="nds-card-featured-icon"&gt;
      &lt;span class="nds-featured-icon nds-xl nds-circle"&gt;
        &lt;i class="nds-icon nds-hgi-checkmark-circle-02" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;/span&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-card-content"&gt;
    &lt;div class="nds-card-text"&gt;
      &lt;span class="nds-card-title" id="modal-status-title"&gt;Request submitted&lt;/span&gt;
      &lt;p class="nds-card-description"&gt;Your request reached the service. You get a message when
          the review is done.&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-card-actions"&gt;
    &lt;button class="nds-btn nds-primary nds-lg" data-modal-close&gt;
      &lt;span class="nds-label"&gt;Done&lt;/span&gt;
    &lt;/button&gt;
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

<!-- Built-in Features -->
<section id="modalFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-plug-socket"></i>
                            <span class="nds-label">Auto-initialization</span>
                        </span>
                        <p class="nds-item-desc">Modals wire up from <code class="nds-inline-code lang-html">data-modal-target</code> and <code class="nds-inline-code lang-html">data-modal-close</code> attributes with no JavaScript init call required.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-focus-point"></i>
                            <span class="nds-label">Focus Trap</span>
                        </span>
                        <p class="nds-item-desc">Tab and Shift+Tab cycle through focusable elements inside the modal, keeping keyboard users contained until they dismiss it.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-keyboard"></i>
                            <span class="nds-label">Keyboard Dismissal</span>
                        </span>
                        <p class="nds-item-desc">Pressing Escape closes the modal and its backdrop without any extra wiring.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-paint-board"></i>
                            <span class="nds-label">Backdrop Overlay</span>
                        </span>
                        <p class="nds-item-desc">A dimmed, blurred overlay covers the page behind the modal. Clicking the backdrop closes the modal automatically.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-lock-key"></i>
                            <span class="nds-label">Body Scroll Lock</span>
                        </span>
                        <p class="nds-item-desc">Page scrolling is disabled while a modal is open and restored when it closes.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-mobile-programming-01"></i>
                            <span class="nds-label">Mobile Bottom Sheet</span>
                        </span>
                        <p class="nds-item-desc">On small screens the modal slides up from the bottom with rounded top corners, and action buttons expand to full width.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-motion-02"></i>
                            <span class="nds-label">Animated Transitions</span>
                        </span>
                        <p class="nds-item-desc">Fade and scale on desktop, slide on mobile. The closing state drives the exit animation automatically.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-code-circle"></i>
                            <span class="nds-label">Programmatic Control</span>
                        </span>
                        <p class="nds-item-desc">Open, close, and check state with <code class="nds-inline-code lang-js">NDS.Modal.open()</code>, <code class="nds-inline-code lang-js">NDS.Modal.close()</code>, and <code class="nds-inline-code lang-js">NDS.Modal.isOpen()</code>.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="modalGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block nds-prose">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use a modal when the user must confirm or decide something before the app can continue, such as approving a submission or accepting terms</li>
                    <li>Use for presenting critical warnings, compliance notices, or destructive action confirmations where the user must acknowledge before proceeding</li>
                    <li>Use for short forms or detail views that benefit from focused attention without navigating away from the current page</li>
                    <li>Don't use for success messages or non-blocking notifications. Use an Alert or Toast instead</li>
                    <li>For multi-step workflows inside a modal, use the <a class="nds-color" href="{{ 'components/stepper' | relative_url }}">Stepper</a> component to guide users through each stage. For workflows too complex for a modal, use a dedicated page instead</li>
                    <li>Don't stack modals. If one modal needs to open another, restructure the flow so a single modal handles the decision</li>
                    <li>Menu-based controls work inside a modal with no extra attribute: a <a class="nds-color" href="{{ 'components/dropmenu' | relative_url }}">Dropmenu</a>, a <a class="nds-color" href="{{ 'components/forms' | relative_url }}">select</a>, a <a class="nds-color" href="{{ 'components/multiselect' | relative_url }}">Multiselect</a>, an <a class="nds-color" href="{{ 'components/autocomplete' | relative_url }}">Autocomplete</a>, or a <a class="nds-color" href="{{ 'components/filter' | relative_url }}">Filter</a>. The modal card scrolls its own content and creates a stacking context, so each menu detects the modal on open and moves to <code class="nds-inline-code lang-html">&lt;body&gt;</code> instead of clipping at the card edge. A menu taller than the space on either side of its trigger scrolls inside the viewport. Older markup that carries <code class="nds-inline-code lang-html">data-portal</code> on the <code class="nds-inline-code lang-html">.nds-dropmenu</code> wrapper still works — the attribute forces the same move</li>
                    <li>Choose <code class="nds-inline-code lang-html">nds-sm</code> for simple confirmation prompts with one or two buttons. Use the default size when the modal includes a short form or longer description. Use <code class="nds-inline-code lang-html">nds-lg</code> for content-heavy modals like terms of service or data previews. Use <code class="nds-inline-code lang-html">nds-full</code> for immersive tasks like image editing or document previews</li>
                    <li>Keep titles clear and contextual to the required action</li>
                    <li>Limit content to a single focused message or task</li>
                    <li>Provide explicit primary and secondary actions (Confirm/Cancel)</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead>
                        <tr>
                            <th>Class</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-sm</code></td>
                            <td>Small modal, max-width 400px. Use for simple confirmation dialogs.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-md</code></td>
                            <td>Medium modal, max-width 600px. This is the default size when no class is added.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-lg</code></td>
                            <td>Large modal, max-width 800px. Use for content-heavy dialogs.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-full</code></td>
                            <td>Full-width modal with minimal side margins. Use for immersive tasks.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead>
                        <tr>
                            <th>Attribute</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-modal-target="id"</code></td>
                            <td>Set on a trigger button. Opens the modal with the matching <code class="nds-inline-code lang-html">id</code> when clicked.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-modal-close</code></td>
                            <td>Set on any element inside a modal. Closes the currently open modal when clicked.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-modal-static</code></td>
                            <td>Set on the modal. Removes both dismiss paths: no <kbd>Esc</kbd> key, no backdrop click. The modal then closes only through a <code class="nds-inline-code lang-html">data-modal-close</code> control or <code class="nds-inline-code lang-js">NDS.Modal.close()</code>. Use it when the user must pick one of the actions.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block nds-prose">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p><strong>NDS.Modal</strong> initializes automatically on page load. The modal script depends on <code class="nds-inline-code lang-js">nds-backdrop.js</code>, which must load first.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript">
// ── Open ────────────────────────────────────────────────
// By ID string
NDS.Modal.open('modal-id');

// By DOM element
const modalEl = document.getElementById('modal-id');
NDS.Modal.open(modalEl);

// ── Close ───────────────────────────────────────────────
// Closes the currently active modal
NDS.Modal.close();

// ── Check state ─────────────────────────────────────────
NDS.Modal.isOpen(); // returns true if any modal is open

// ── Re-initialize ───────────────────────────────────────
// Call after dynamically adding new modal triggers to the page
NDS.Modal.init();

// ── Release an open modal before removing its markup ────
// An open modal holds the backdrop and locks page scroll.
// Remove the markup while it is open and the overlay stays,
// the page will not scroll, and nothing is left to close it.
NDS.Modal.destroy(viewElement);
NDS.Init.destroy(viewElement);  // or this, which covers every component

// ── Events ──────────────────────────────────────────────
// Fired on the modal element, bubbles up to document
const modal = document.getElementById('modal-id');

modal.addEventListener('nds:modal:opened', (e) =&gt; {
    // Modal is now visible
});

modal.addEventListener('nds:modal:closed', (e) =&gt; {
    // Modal is now hidden, reset forms or clean up
    modal.querySelector('form')?.reset();
});

// ── Keyboard ────────────────────────────────────────────
// Escape: close modal and backdrop
// Tab/Shift+Tab: cycle through focusable elements (focus trap)
                        </code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
