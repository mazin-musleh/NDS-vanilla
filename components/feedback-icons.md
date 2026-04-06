---
layout: page
title: Feedback Icons
hero_title: Feedback Icons - National Design System
hero_description: Status icons and inline messages for communicating validation results, system states, and contextual hints
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Feedback Icons -->
<section id="feedbackIcons" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Feedback Icons</h2>
            <p class="nds-section-description">Status-colored circular icons that automatically display the correct glyph for each status type</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
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
                                            data-toggler='["data-status=success", ".nds-feedback", "feedbackStatus", "attr"]'>
                                            <span class="nds-label">Success</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-status=info", ".nds-feedback", "feedbackStatus", "attr"]'>
                                            <span class="nds-label">Info</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-status=warning", ".nds-feedback", "feedbackStatus", "attr"]'>
                                            <span class="nds-label">Warning</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-status=error", ".nds-feedback", "feedbackStatus", "attr"]'>
                                            <span class="nds-label">Error</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-status=neutral", ".nds-feedback", "feedbackStatus", "attr"]'>
                                            <span class="nds-label">Neutral</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Size: ">
                                    <span class="nds-label">Size: Medium</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-feedback", "feedbackSize"]'>
                                            <span class="nds-label">Small (16px)</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-feedback", "feedbackSize"]'
                                            data-trigger-label="Medium">
                                            <span class="nds-label">Medium (24px)</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-ring", ".nds-feedback", "feedbackStyle"]'>
                                <span class="nds-label">Ring</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-outline", ".nds-feedback", "feedbackStyle"]'>
                                <span class="nds-label">Outline</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <span class="nds-feedback" data-status="success">
                                <span class="nds-feedback-icon">
                                    <i class="hgi hgi-stroke nds-icon"></i>
                                </span>
                            </span>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-feedback-icon-1" id="tab-feedback-icon-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-feedback-icon-js-1" id="tab-feedback-icon-js-1">
                                        <span class="nds-tab-label">JS API</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-feedback-icon-1"
                                    aria-labelledby="tab-feedback-icon-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<span class="nds-feedback" data-status="success">
  <span class="nds-feedback-icon">
    <i class="hgi hgi-stroke nds-icon"></i>
  </span>
</span>
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-feedback-icon-js-1"
                                    aria-labelledby="tab-feedback-icon-js-1" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-javascript code">NDS.Feedback.create({
    status: 'success',
    target: '#container',
    size: 'md',
    style: '',
    showIcon: true
});</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Feedback Messages -->
<section id="feedbackMessages" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Feedback Messages</h2>
            <p class="nds-section-description">Combine the status icon with a text message for inline validation results and contextual hints</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Status: ">
                                    <span class="nds-label">Status: Error</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["data-status=error", ".nds-feedback", "feedbackMsgStatus", "attr"]'>
                                            <span class="nds-label">Error</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-status=success", ".nds-feedback", "feedbackMsgStatus", "attr"]'>
                                            <span class="nds-label">Success</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-status=warning", ".nds-feedback", "feedbackMsgStatus", "attr"]'>
                                            <span class="nds-label">Warning</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-status=info", ".nds-feedback", "feedbackMsgStatus", "attr"]'>
                                            <span class="nds-label">Info</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-status=neutral", ".nds-feedback", "feedbackMsgStatus", "attr"]'>
                                            <span class="nds-label">Neutral</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Size: ">
                                    <span class="nds-label">Size: Small</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-sm", ".nds-feedback", "feedbackMsgSize"]'>
                                            <span class="nds-label">Small (16px)</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-md", ".nds-feedback", "feedbackMsgSize"]'>
                                            <span class="nds-label">Medium (24px)</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-ring", ".nds-feedback", "feedbackMsgStyle"]'>
                                <span class="nds-label">Ring</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-outline", ".nds-feedback", "feedbackMsgStyle"]'>
                                <span class="nds-label">Outline</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <span class="nds-feedback nds-sm" data-status="error">
                                <span class="nds-feedback-icon">
                                    <i class="hgi hgi-stroke nds-icon"></i>
                                </span>
                                <span class="nds-feedback-message">This field is required</span>
                            </span>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-feedback-msg-1" id="tab-feedback-msg-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-feedback-msg-js-1" id="tab-feedback-msg-js-1">
                                        <span class="nds-tab-label">JS API</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-feedback-msg-1"
                                    aria-labelledby="tab-feedback-msg-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<span class="nds-feedback nds-sm" data-status="error">
  <span class="nds-feedback-icon">
    <i class="hgi hgi-stroke nds-icon"></i>
  </span>
  <span class="nds-feedback-message">This field is required</span>
</span>
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-feedback-msg-js-1"
                                    aria-labelledby="tab-feedback-msg-js-1" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-javascript code">NDS.Feedback.create({
    message: 'This field is required',
    status: 'error',
    target: '#container',
    size: 'sm',
    style: ''
});</code>
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
<section id="feedbackFeatures" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:24px; --row-gap: 24px; --col-gap: 32px;">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-colors nds-icon"></i>
                        <span class="nds-label">Auto Icon by Status</span>
                    </span>
                    <p class="nds-item-desc">Set <code class="nds-inline-code lang-html">data-status</code> and the correct icon glyph appears automatically: checkmark for success, alert for warning, X for error, info circle for info.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-layers-01 nds-icon"></i>
                        <span class="nds-label">Parent Status Inheritance</span>
                    </span>
                    <p class="nds-item-desc">Place a feedback icon inside any element with <code class="nds-inline-code lang-html">data-status</code> and it inherits the status color and icon without needing its own attribute.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-square-circle nds-icon"></i>
                        <span class="nds-label">Three Visual Styles</span>
                    </span>
                    <p class="nds-item-desc">Solid fill by default, outline for lighter weight, and ring for extra emphasis. Combine freely with any status and size.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-code-circle nds-icon"></i>
                        <span class="nds-label">Programmatic Control</span>
                    </span>
                    <p class="nds-item-desc">Create, dismiss, and manage feedback lifecycle with <code class="nds-inline-code lang-js">NDS.Feedback.create()</code>. Permanent feedback survives status changes and restores automatically.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="feedbackGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-content-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use <code class="nds-inline-code lang-js">NDS.Feedback.create()</code> for general-purpose feedback on any element: tooltips, notifications, hints on divs, sections, or cards</li>
                    <li>For form validation, use <code class="nds-inline-code lang-js">NDS.Forms.setStatus()</code> instead, which creates feedback internally and also drives border colors and ARIA attributes. See <a class="nds-color" href="{{ 'components/forms' | relative_url }}">Forms</a></li>
                    <li>Use icon-only feedback (no message) inside components like <a class="nds-color" href="{{ 'components/alert' | relative_url }}">Alerts</a> and form headers where the status is already communicated by surrounding context</li>
                    <li>Use feedback with message for standalone inline validation below form fields or as contextual hints</li>
                    <li>Don't use feedback icons for page-level notifications. Use an <a class="nds-color" href="{{ 'components/alert' | relative_url }}">Alert</a> instead</li>
                    <li>Use <code class="nds-inline-code lang-html">nds-sm</code> for inline text and form validation. Use <code class="nds-inline-code lang-html">nds-md</code> for standalone status indicators that need more visual presence</li>
                    <li>Use <code class="nds-inline-code lang-html">nds-ring</code> for critical messages that need immediate attention. Use <code class="nds-inline-code lang-html">nds-outline</code> for hints and informational messages</li>
                    <li>Use <code class="nds-inline-code lang-js">permanent: true</code> for baseline hints that should reappear after temporary errors are cleared</li>
                    <li>Match the status to the message severity: <code class="nds-inline-code lang-html">error</code> for validation failures, <code class="nds-inline-code lang-html">success</code> for confirmations, <code class="nds-inline-code lang-html">warning</code> for caution, <code class="nds-inline-code lang-html">info</code> for tips, <code class="nds-inline-code lang-html">neutral</code> for general hints</li>
                </ul>
            </div>

            <div class="nds-content-block">
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
                            <td>Small size, 16px icon. For inline text and form validation.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-md</code></td>
                            <td>Medium size, 24px icon. Default when no size is specified.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-outline</code></td>
                            <td>Transparent background with the status icon shown as a stroke icon. Lighter visual weight.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-ring</code></td>
                            <td>Adds a colored ring around the icon for extra emphasis on critical messages.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-content-block">
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
                            <td><code class="nds-inline-code lang-html">data-status</code></td>
                            <td>Set on the <code class="nds-inline-code lang-html">.nds-feedback</code> element or any parent. Values: <code class="nds-inline-code lang-html">error</code>, <code class="nds-inline-code lang-html">success</code>, <code class="nds-inline-code lang-html">warning</code>, <code class="nds-inline-code lang-html">info</code>, <code class="nds-inline-code lang-html">neutral</code>. Sets color and auto-selects the icon.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-permanent</code></td>
                            <td>Set on a feedback element in HTML to mark it as permanent. Survives status changes and is restored when temporary feedback is dismissed.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p><strong>NDS.Feedback</strong> creates and manages feedback elements programmatically. For form validation, use <a class="nds-color" href="{{ 'components/forms' | relative_url }}">NDS.Forms.setStatus()</a> which calls Feedback internally and also sets form-specific attributes.</p>

                <h4 style="margin-top: var(--spacing-2xl); margin-bottom: var(--spacing-md); font-weight: 600;">NDS.Feedback.create(options)</h4>
                <table class="nds-table nds-responsive">
                    <thead>
                        <tr>
                            <th>Option</th>
                            <th>Type</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-js">message</code></td>
                            <td>string</td>
                            <td><code class="nds-inline-code lang-js">''</code></td>
                            <td>Feedback message text. Omit for icon-only feedback.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">status</code></td>
                            <td>string</td>
                            <td><code class="nds-inline-code lang-js">'info'</code></td>
                            <td><code class="nds-inline-code lang-js">'error'</code>, <code class="nds-inline-code lang-js">'success'</code>, <code class="nds-inline-code lang-js">'warning'</code>, <code class="nds-inline-code lang-js">'info'</code>, <code class="nds-inline-code lang-js">'neutral'</code></td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">target</code></td>
                            <td>string | Element</td>
                            <td>null</td>
                            <td>CSS selector or DOM element to attach feedback to</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">position</code></td>
                            <td>string</td>
                            <td><code class="nds-inline-code lang-js">'append'</code></td>
                            <td><code class="nds-inline-code lang-js">'before'</code>, <code class="nds-inline-code lang-js">'after'</code>, <code class="nds-inline-code lang-js">'prepend'</code>, <code class="nds-inline-code lang-js">'append'</code></td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">size</code></td>
                            <td>string</td>
                            <td><code class="nds-inline-code lang-js">'sm'</code></td>
                            <td><code class="nds-inline-code lang-js">'sm'</code>, <code class="nds-inline-code lang-js">'md'</code></td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">style</code></td>
                            <td>string</td>
                            <td><code class="nds-inline-code lang-js">''</code></td>
                            <td><code class="nds-inline-code lang-js">''</code> (solid), <code class="nds-inline-code lang-js">'ring'</code>, <code class="nds-inline-code lang-js">'outline'</code></td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">showIcon</code></td>
                            <td>boolean</td>
                            <td>true</td>
                            <td>Show or hide the status icon</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">permanent</code></td>
                            <td>boolean</td>
                            <td>false</td>
                            <td>Persist across status changes. Hidden when new non-permanent feedback appears, restored on dismiss.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">id</code></td>
                            <td>string</td>
                            <td>null</td>
                            <td>Custom ID for the feedback element</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">className</code></td>
                            <td>string</td>
                            <td><code class="nds-inline-code lang-js">''</code></td>
                            <td>Additional CSS classes</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">ariaLive</code></td>
                            <td>string</td>
                            <td>null</td>
                            <td><code class="nds-inline-code lang-js">'polite'</code> or <code class="nds-inline-code lang-js">'assertive'</code>. Auto-set based on status if omitted.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">onDismiss</code></td>
                            <td>Function</td>
                            <td>null</td>
                            <td>Callback when feedback is dismissed</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">onCreate</code></td>
                            <td>Function</td>
                            <td>null</td>
                            <td>Callback after feedback is created</td>
                        </tr>
                    </tbody>
                </table>

                <h4 style="margin-top: var(--spacing-2xl); margin-bottom: var(--spacing-md); font-weight: 600;">Other Methods</h4>
                <table class="nds-table nds-responsive">
                    <thead>
                        <tr>
                            <th>Method</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-js">NDS.Feedback.dismiss(element)</code></td>
                            <td>Dismiss a single feedback element. Restores any hidden permanent feedback.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">NDS.Feedback.dismissAll(container)</code></td>
                            <td>Dismiss all non-permanent feedback in a container. Restores permanent feedback visibility.</td>
                        </tr>
                    </tbody>
                </table>

            </div>

        </div>
    </div>
</section>
