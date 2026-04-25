---
layout: page
title: Tooltip
hero_title: Tooltip - National Design System
hero_description: A click-activated balloon that reveals contextual guidance, definitions, or hints next to the term it relates to, with a status-colored icon chip and smart viewport positioning.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Help Tooltip -->
<section id="tooltipOverview" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Help Tooltip</h2>
            <p class="nds-section-description">Click the icon trigger to reveal a balloon with a title, message, and leading icon chip. Click again, click outside, scroll, or press Escape to dismiss.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Click the help icon below</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo" style="display: flex; justify-content: center; padding: var(--spacing-4xl) var(--spacing-2xl);">
                            <span class="nds-tooltip">
                                <button type="button" class="nds-tooltip-trigger" aria-label="What is this?">
                                    <span class="nds-feedback nds-sm" data-status="help">
                                        <span class="nds-feedback-icon">
                                            <i class="nds-icon" aria-hidden="true"></i>
                                        </span>
                                    </span>
                                </button>
                                <div class="nds-tooltip-balloon" hidden>
                                    <span class="nds-feedback nds-sm" data-status="help">
                                        <span class="nds-feedback-icon">
                                            <i class="nds-icon" aria-hidden="true"></i>
                                        </span>
                                    </span>
                                    <span class="nds-tooltip-body">
                                        <span class="nds-tooltip-title">Tooltip title</span>
                                        <p class="nds-tooltip-message">Max width of tooltips is 240px - text will wrap automatically</p>
                                    </span>
                                </div>
                            </span>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-tooltip-overview-1" id="tab-tooltip-overview-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-tooltip-overview-1"
                                    aria-labelledby="tab-tooltip-overview-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;span class="nds-tooltip"&gt;
  &lt;button type="button" class="nds-tooltip-trigger" aria-label="What is this?"&gt;
    &lt;span class="nds-feedback nds-sm" data-status="help"&gt;
      &lt;span class="nds-feedback-icon"&gt;
        &lt;i class="nds-icon" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;/span&gt;
    &lt;/span&gt;
  &lt;/button&gt;
  &lt;div class="nds-tooltip-balloon" hidden&gt;
    &lt;span class="nds-feedback nds-sm" data-status="help"&gt;
      &lt;span class="nds-feedback-icon"&gt;
        &lt;i class="nds-icon" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;/span&gt;
    &lt;/span&gt;
    &lt;span class="nds-tooltip-body"&gt;
      &lt;span class="nds-tooltip-title"&gt;Tooltip title&lt;/span&gt;
      &lt;p class="nds-tooltip-message"&gt;Max width of tooltips is 240px - text will wrap automatically&lt;/p&gt;
    &lt;/span&gt;
  &lt;/div&gt;
&lt;/span&gt;
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

<!-- Declarative Markup -->
<section id="tooltipDeclarative" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Declarative Markup</h2>
            <p class="nds-section-description">Skip the inner DOM. Put <code class="nds-inline-code lang-html">data-tooltip-title</code> and <code class="nds-inline-code lang-html">data-tooltip-message</code> on a <code class="nds-inline-code lang-html">.nds-tooltip</code> element. If the element is empty, the JS generates a chip trigger. If it already has text or children, the element itself acts as the trigger and only the balloon is generated.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <!-- Empty wrapper → chip trigger -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Empty wrapper — chip trigger is generated</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo" style="display: flex; justify-content: center; padding: var(--spacing-4xl) var(--spacing-2xl);">
                            <span class="nds-tooltip"
                                  data-tooltip-title="Declarative tooltip"
                                  data-tooltip-message="This balloon was generated from data-tooltip-title/message by the JS."></span>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-tooltip-declarative-1" id="tab-tooltip-declarative-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-tooltip-declarative-1"
                                    aria-labelledby="tab-tooltip-declarative-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;span class="nds-tooltip"
      data-tooltip-title="Declarative tooltip"
      data-tooltip-message="This balloon was generated from data-tooltip-title/message by the JS."&gt;&lt;/span&gt;
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Element with content → element is the trigger -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Element with content — element itself is the trigger</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo" style="display: flex; justify-content: center; padding: var(--spacing-4xl) var(--spacing-2xl);">
                            <p style="margin: 0; font-size: var(--typo-text-md-FS); line-height: var(--typo-text-md-LH);">
                                The
                                <span class="nds-tooltip"
                                      data-tooltip-message="A 10-digit identifier issued to Saudi citizens by the Ministry of Interior.">National ID</span>
                                field is required.
                            </p>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-tooltip-declarative-2" id="tab-tooltip-declarative-2">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-tooltip-declarative-2"
                                    aria-labelledby="tab-tooltip-declarative-2">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;p&gt;
  The
  &lt;span class="nds-tooltip"
        data-tooltip-message="A 10-digit identifier issued to Saudi citizens by the Ministry of Interior."&gt;National ID&lt;/span&gt;
  field is required.
&lt;/p&gt;
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

<!-- Message Only -->
<section id="tooltipMessageOnly" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Message Only</h2>
            <p class="nds-section-description">Omit the title when a single short sentence is enough. The icon chip can also be dropped for a minimal body-only balloon.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Body-only tooltip</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo" style="display: flex; justify-content: center; padding: var(--spacing-4xl) var(--spacing-2xl);">
                            <span class="nds-tooltip">
                                <button type="button" class="nds-tooltip-trigger" aria-label="More info">
                                    <span class="nds-feedback nds-sm" data-status="help">
                                        <span class="nds-feedback-icon">
                                            <i class="nds-icon" aria-hidden="true"></i>
                                        </span>
                                    </span>
                                </button>
                                <div class="nds-tooltip-balloon" hidden>
                                    <span class="nds-tooltip-body">
                                        <p class="nds-tooltip-message">Saudi residents can enter either their National ID or their Iqama number.</p>
                                    </span>
                                </div>
                            </span>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-tooltip-message-1" id="tab-tooltip-message-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-tooltip-message-1"
                                    aria-labelledby="tab-tooltip-message-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;span class="nds-tooltip"&gt;
  &lt;button type="button" class="nds-tooltip-trigger" aria-label="More info"&gt;
    &lt;span class="nds-feedback nds-sm" data-status="help"&gt;
      &lt;span class="nds-feedback-icon"&gt;
        &lt;i class="nds-icon" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;/span&gt;
    &lt;/span&gt;
  &lt;/button&gt;
  &lt;div class="nds-tooltip-balloon" hidden&gt;
    &lt;span class="nds-tooltip-body"&gt;
      &lt;p class="nds-tooltip-message"&gt;Saudi residents can enter either their National ID or their Iqama number.&lt;/p&gt;
    &lt;/span&gt;
  &lt;/div&gt;
&lt;/span&gt;
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

<!-- Built-in Features -->
<section id="tooltipFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-plug-socket"></i>
                        <span class="nds-label">Auto-initialization</span>
                    </span>
                    <p class="nds-item-desc">Every <code class="nds-inline-code lang-html">.nds-tooltip</code> in the DOM wires itself up on page load. Click handlers, aria-describedby, and unique IDs are applied automatically.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-api"></i>
                        <span class="nds-label">Declarative Markup</span>
                    </span>
                    <p class="nds-item-desc">Add <code class="nds-inline-code lang-html">data-tooltip-title</code> and <code class="nds-inline-code lang-html">data-tooltip-message</code> to an empty <code class="nds-inline-code lang-html">.nds-tooltip</code> and the JS generates the trigger chip and balloon for you.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-layers-01"></i>
                        <span class="nds-label">Smart Positioning</span>
                    </span>
                    <p class="nds-item-desc">Balloons use fixed positioning so they escape clipping parents. They flip above the trigger when there is not enough room below and clamp horizontally to stay fully visible.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-colors"></i>
                        <span class="nds-label">Status-Driven Icon</span>
                    </span>
                    <p class="nds-item-desc">The feedback chip picks up its glyph and color from <code class="nds-inline-code lang-html">data-status</code>: help, info, success, warning, error, or neutral.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-dark-mode"></i>
                        <span class="nds-label">Theme-Aware Colors</span>
                    </span>
                    <p class="nds-item-desc">Balloon surface, heading, and body text all swap to the inverse token set when the page is in dark theme, with no markup changes required.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-keyboard"></i>
                        <span class="nds-label">Multiple Dismissal Paths</span>
                    </span>
                    <p class="nds-item-desc">Close by clicking the trigger again, clicking anywhere outside, pressing Escape, or scrolling the page. Only one tooltip stays open at a time.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-api"></i>
                        <span class="nds-label">Programmatic Control</span>
                    </span>
                    <p class="nds-item-desc">Open, close, and observe any tooltip through the <code class="nds-inline-code lang-js">NDS.Tooltip</code> API or the instance attached to each element.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-eye"></i>
                        <span class="nds-label">Auto-Linked Description</span>
                    </span>
                    <p class="nds-item-desc">Each balloon gets a unique id and the trigger's <code class="nds-inline-code lang-html">aria-describedby</code> points to it, so screen readers announce the content when focus lands on the trigger.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="tooltipGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use tooltips to <strong>clarify unfamiliar terms</strong> or offer short, optional context next to the element they explain (form field labels, table headers, policy terms)</li>
                    <li>For simple help text, prefer the <strong>declarative shortcut</strong>: put <code class="nds-inline-code lang-html">data-tooltip-title</code> and <code class="nds-inline-code lang-html">data-tooltip-message</code> on an empty <code class="nds-inline-code lang-html">.nds-tooltip</code> and let the JS build the chip and balloon. Write the full markup only when you need rich HTML or custom content inside the body</li>
                    <li>Use the <strong>help</strong> status for advisory tips, <strong>info</strong> for neutral clarification, <strong>warning</strong> or <strong>error</strong> to call attention to a caveat next to a field</li>
                    <li>Place the trigger <strong>immediately adjacent</strong> to the term it describes so the relationship is obvious, not buried in a label row</li>
                    <li>Do not put essential instructions inside a tooltip: anything a user must read to complete the task belongs in the visible label, placeholder, or hint text</li>
                    <li>Do not wrap a link or navigation element as the trigger: clicking would both follow the link and try to toggle the tooltip. Place the tooltip next to the link instead</li>
                    <li>Prefer an <a class="nds-color" href="{{ 'components/alert' | relative_url }}">Alert</a> for non-dismissable status messages and a <a class="nds-color" href="{{ 'components/modal' | relative_url }}">Modal</a> for content that requires a user decision</li>
                    <li>Keep the message to one or two sentences. The balloon clamps at 240px by default and wraps text automatically</li>
                    <li>Include a short <code class="nds-inline-code lang-html">aria-label</code> on the trigger button so screen reader users hear what the tooltip explains even before opening it</li>
                    <li>If many tooltips cluster in a dense form, consider moving the content into inline helper text: excessive clicking breaks flow for keyboard and touch users</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Structure</h3>
                <p>A tooltip has three structural parts inside a <code class="nds-inline-code lang-html">&lt;span class="nds-tooltip"&gt;</code> root.</p>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Class</th><th>Role</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">nds-tooltip</code></td><td>Inline root wrapping the trigger and the balloon. JS toggles <code class="nds-inline-code lang-html">data-state="open"</code> on this element while the balloon is visible.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-tooltip-trigger</code></td><td>The clickable element. A <code class="nds-inline-code lang-html">&lt;button&gt;</code> wrapping an <code class="nds-inline-code lang-html">.nds-feedback-icon</code> chip is the canonical pattern.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-tooltip-balloon</code></td><td>The floating panel. Marked <code class="nds-inline-code lang-html">hidden</code> by default; JS toggles the attribute on open.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-tooltip-body</code></td><td>Text container inside the balloon. Sits beside the optional leading icon chip.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-tooltip-title</code></td><td>Optional bold heading placed at the top of the body stack.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-tooltip-message</code></td><td>The body paragraph text.</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-tooltip-title</code></td><td>Declarative shortcut. Set on <code class="nds-inline-code lang-html">.nds-tooltip</code> to have the JS generate the balloon title. Skipped when an explicit <code class="nds-inline-code lang-html">.nds-tooltip-balloon</code> child is present.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-tooltip-message</code></td><td>Declarative shortcut. Set on <code class="nds-inline-code lang-html">.nds-tooltip</code> to have the JS generate the balloon message paragraph. Either title or message (or both) is required for auto-generation to run.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-tooltip-status</code></td><td>Declarative shortcut. Set on <code class="nds-inline-code lang-html">.nds-tooltip</code> to control the generated chips' status (defaults to <code class="nds-inline-code lang-html">help</code>). Values match <code class="nds-inline-code lang-html">data-status</code>.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-status</code></td><td>Set on the inner <code class="nds-inline-code lang-html">.nds-feedback</code> wrappers (inside the trigger and inside the balloon) to drive icon glyph and color. Values: <code class="nds-inline-code lang-html">help</code>, <code class="nds-inline-code lang-html">info</code>, <code class="nds-inline-code lang-html">success</code>, <code class="nds-inline-code lang-html">warning</code>, <code class="nds-inline-code lang-html">error</code>, <code class="nds-inline-code lang-html">neutral</code>. Do not put <code class="nds-inline-code lang-html">data-status</code> on <code class="nds-inline-code lang-html">.nds-tooltip</code> itself.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-state</code></td><td>Managed by JS on <code class="nds-inline-code lang-html">.nds-tooltip</code>. Set to <code class="nds-inline-code lang-html">open</code> while the balloon is visible; absent when closed. Used internally for CSS styling hooks (e.g. the idle-trigger neutral background).</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">hidden</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-tooltip-balloon</code> in source so the balloon starts closed. JS flips the attribute on open and close.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">aria-label</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-tooltip-trigger</code> to describe the tooltip purpose for screen readers (e.g. <code class="nds-inline-code lang-html">"What is this?"</code>).</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--tooltip-max-width</code></td><td><code class="nds-inline-code lang-html">240px</code></td><td>Clamp on balloon width. Text wraps automatically beyond this.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--tooltip-padding</code></td><td><code class="nds-inline-code lang-html">var(--spacing-2)</code></td><td>Inner padding around the balloon content.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--tooltip-gap</code></td><td><code class="nds-inline-code lang-html">var(--spacing-2)</code></td><td>Gap between the icon chip and the body, and between title and message.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--tooltip-arrow-size</code></td><td><code class="nds-inline-code lang-html">10px</code></td><td>Side length of the rotated arrow square.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--tooltip-background-light</code></td><td><code class="nds-inline-code lang-html">var(--colors-base-white)</code></td><td>Balloon surface color in light theme.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--tooltip-background-dark</code></td><td><code class="nds-inline-code lang-html">var(--colors-neutral-800)</code></td><td>Balloon surface color in dark theme.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--tooltip-text-heading-light</code></td><td><code class="nds-inline-code lang-html">var(--text-display)</code></td><td>Title color in light theme.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--tooltip-text-paragraph-light</code></td><td><code class="nds-inline-code lang-html">var(--text-primary-paragraph)</code></td><td>Message body color in light theme.</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDS.Tooltip</strong> namespace exposes initialization and factory methods. Every initialized tooltip also attaches an instance to its root element at <code class="nds-inline-code lang-js">el.ndsTooltip</code>, with <code class="nds-inline-code lang-js">open()</code> and <code class="nds-inline-code lang-js">close()</code> methods. Tooltips dispatch <code class="nds-inline-code lang-js">nds:tooltip:opened</code> and <code class="nds-inline-code lang-js">nds:tooltip:closed</code> events that bubble to the document.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// ── Initialize ───────────────────────────────────────
// Called automatically on DOMContentLoaded for any
// `.nds-tooltip` already in the DOM. Call again after
// injecting new tooltips dynamically.
NDS.Tooltip.init();
NDS.Tooltip.reinit();  // Alias — same as init()

// ── Create a single instance ─────────────────────────
// Useful when you know the element and want the handle
// back immediately.
const el = document.querySelector('.nds-tooltip');
const tooltip = NDS.Tooltip.create(el);

// ── Instance access from the DOM ─────────────────────
// Every initialized root has `ndsTooltip` attached.
el.ndsTooltip.open();
el.ndsTooltip.close();

// ── Listen for open/close events ─────────────────────
// Events bubble, so you can delegate from a parent.
el.addEventListener('nds:tooltip:opened', (e) =&gt; {
    const { tooltip, trigger, balloon, isOpen } = e.detail;
    // ... react to the tooltip opening
});

el.addEventListener('nds:tooltip:closed', (e) =&gt; {
    // ... react to the tooltip closing
});
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
