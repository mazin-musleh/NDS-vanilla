---
layout: page
title: Copy
hero_title: Copy - National Design System
hero_description: A clipboard utility that turns any button into a one-click copy control with checkmark feedback, visible label swap, and screen reader announcement
breadcrumb: [["Utilities", "/utilities?category=Utilities"]]
lang: en
direction: ltr
---

<!-- Literal Copy -->
<section id="copyLiteral" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Literal Value</h2>
            <p class="nds-section-description">Set <code class="nds-inline-code lang-html">data-copy</code> on a <code class="nds-inline-code lang-html">.nds-copy</code> to copy the exact string. Use this for phone numbers, emails, tokens, codes, or any value already known at render time.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">

            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Contact Information</div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <dl class="nds-definition-list" style="max-width: 360px;">
                            <div class="nds-definition-item">
                                <dt>
                                    <i class="hgi hgi-stroke hgi-smart-phone-01"></i>
                                    <span class="nds-label">Phone</span>
                                </dt>
                                <dd>
                                    <span class="nds-label">9200343222</span>
                                    <button type="button" class="nds-btn nds-subtle nds-sm nds-icon-only nds-copy"
                                        data-copy="9200343222" aria-label="Copy phone number">
                                        <i class="nds-icon nds-hgi-copy-01"></i>
                                    </button>
                                </dd>
                            </div>
                            <div class="nds-definition-item">
                                <dt>
                                    <i class="hgi hgi-stroke hgi-mail-01"></i>
                                    <span class="nds-label">Email</span>
                                </dt>
                                <dd>
                                    <span class="nds-label">help@company.sa</span>
                                    <button type="button" class="nds-btn nds-subtle nds-sm nds-icon-only nds-copy"
                                        data-copy="help@company.sa" aria-label="Copy email">
                                        <i class="nds-icon nds-hgi-copy-01"></i>
                                    </button>
                                </dd>
                            </div>
                            <div class="nds-definition-item">
                                <dt>
                                    <i class="hgi hgi-stroke hgi-key-01"></i>
                                    <span class="nds-label">API Token</span>
                                </dt>
                                <dd>
                                    <span class="nds-label">sk-prod-9f3a8c2e</span>
                                    <button type="button" class="nds-btn nds-subtle nds-sm nds-icon-only nds-copy"
                                        data-copy="sk-prod-9f3a8c2e" aria-label="Copy API token">
                                        <i class="nds-icon nds-hgi-copy-01"></i>
                                    </button>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container nds-scroll-more">
                        <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-copy-literal-1" id="tab-copy-literal-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-copy-literal-1"
                            aria-labelledby="tab-copy-literal-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
&lt;dl class="nds-definition-list" style="max-width: 360px;"&gt;
    &lt;div class="nds-definition-item"&gt;
        &lt;dt&gt;
            &lt;i class="hgi hgi-stroke hgi-smart-phone-01"&gt;&lt;/i&gt;
            &lt;span class="nds-label"&gt;Phone&lt;/span&gt;
        &lt;/dt&gt;
        &lt;dd&gt;
            &lt;span class="nds-label"&gt;9200343222&lt;/span&gt;
            &lt;button type="button" class="nds-btn nds-subtle nds-sm nds-icon-only nds-copy"
                data-copy="9200343222" aria-label="Copy phone number"&gt;
                &lt;i class="nds-icon nds-hgi-copy-01"&gt;&lt;/i&gt;
            &lt;/button&gt;
        &lt;/dd&gt;
    &lt;/div&gt;
    &lt;div class="nds-definition-item"&gt;
        &lt;dt&gt;
            &lt;i class="hgi hgi-stroke hgi-mail-01"&gt;&lt;/i&gt;
            &lt;span class="nds-label"&gt;Email&lt;/span&gt;
        &lt;/dt&gt;
        &lt;dd&gt;
            &lt;span class="nds-label"&gt;help@company.sa&lt;/span&gt;
            &lt;button type="button" class="nds-btn nds-subtle nds-sm nds-icon-only nds-copy"
                data-copy="help@company.sa" aria-label="Copy email"&gt;
                &lt;i class="nds-icon nds-hgi-copy-01"&gt;&lt;/i&gt;
            &lt;/button&gt;
        &lt;/dd&gt;
    &lt;/div&gt;
    &lt;div class="nds-definition-item"&gt;
        &lt;dt&gt;
            &lt;i class="hgi hgi-stroke hgi-key-01"&gt;&lt;/i&gt;
            &lt;span class="nds-label"&gt;API Token&lt;/span&gt;
        &lt;/dt&gt;
        &lt;dd&gt;
            &lt;span class="nds-label"&gt;sk-prod-9f3a8c2e&lt;/span&gt;
            &lt;button type="button" class="nds-btn nds-subtle nds-sm nds-icon-only nds-copy"
                data-copy="sk-prod-9f3a8c2e" aria-label="Copy API token"&gt;
                &lt;i class="nds-icon nds-hgi-copy-01"&gt;&lt;/i&gt;
            &lt;/button&gt;
        &lt;/dd&gt;
    &lt;/div&gt;
&lt;/dl&gt;
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

<!-- Copy from Target -->
<section id="copyTarget" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Copy From Target</h2>
            <p class="nds-section-description">Set <code class="nds-inline-code lang-html">data-copy-target</code> to a CSS selector. The button copies the target element's text content at click time, which is useful when the value is rendered dynamically or sits inside a styled wrapper.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">

            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Reference ID Block</div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-card nds-stroke" style="max-width: 480px;">
                            <div class="nds-card-content">
                                <div class="nds-card-text">
                                    <p class="nds-card-description">Application reference</p>
                                    <h3 class="nds-card-title" id="copy-target-ref">REF-2026-04-19-7A3F</h3>
                                </div>
                                <div class="nds-card-actions">
                                    <button type="button" class="nds-btn nds-secondary-outline nds-sm nds-copy"
                                        data-copy-target="#copy-target-ref" aria-label="Copy reference">
                                        <i class="nds-icon nds-hgi-copy-01"></i>
                                        <span class="nds-label">Copy reference</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container nds-scroll-more">
                        <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-copy-target-1" id="tab-copy-target-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-copy-target-1"
                            aria-labelledby="tab-copy-target-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
&lt;div class="nds-card nds-stroke" style="max-width: 480px;"&gt;
    &lt;div class="nds-card-content"&gt;
        &lt;div class="nds-card-text"&gt;
            &lt;p class="nds-card-description"&gt;Application reference&lt;/p&gt;
            &lt;h3 class="nds-card-title" id="copy-target-ref"&gt;REF-2026-04-19-7A3F&lt;/h3&gt;
        &lt;/div&gt;
        &lt;div class="nds-card-actions"&gt;
            &lt;button type="button" class="nds-btn nds-secondary-outline nds-sm nds-copy"
                data-copy-target="#copy-target-ref" aria-label="Copy reference"&gt;
                &lt;i class="nds-icon nds-hgi-copy-01"&gt;&lt;/i&gt;
                &lt;span class="nds-label"&gt;Copy reference&lt;/span&gt;
            &lt;/button&gt;
        &lt;/div&gt;
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
</section>

<!-- Code Block Copy -->
<section id="copyCodeBlock" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Code Block</h2>
            <p class="nds-section-description">Place a <code class="nds-inline-code lang-html">.nds-copy</code> inside an <a class="nds-color" href="{{ 'components/code' | relative_url }}">nds-code</a> wrapper and the button copies the nested code automatically. No <code class="nds-inline-code lang-html">data-copy</code> needed.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">

            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Implicit Code Resolution</div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-code" style="width: 100%;">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-bash code">npm install @nds/core --save</code>
                        </div>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container nds-scroll-more">
                        <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-copy-codeblock-1" id="tab-copy-codeblock-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-copy-codeblock-1"
                            aria-labelledby="tab-copy-codeblock-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
&lt;div class="nds-code" style="width: 100%;"&gt;
    &lt;div class="nds-code-action"&gt;
        &lt;button class="nds-btn nds-subtle nds-copy" aria-label="Copy code"&gt;
            &lt;i class="nds-icon nds-hgi-copy-01"&gt;&lt;/i&gt;
        &lt;/button&gt;
    &lt;/div&gt;
    &lt;code class="lang-bash code"&gt;npm install @nds/core --save&lt;/code&gt;
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
</section>

<!-- Label & Message Feedback -->
<section id="copyFeedback" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Label and Message</h2>
            <p class="nds-section-description">Add <code class="nds-inline-code lang-html">data-label</code> to swap the visible button text during the success window, and <code class="nds-inline-code lang-html">data-message</code> to set the screen reader announcement. Both restore automatically after 2 seconds.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">

            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Visible Label Swap</div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <button type="button" class="nds-btn nds-secondary-outline nds-copy"
                            data-copy="https://nds.sa/components/copy"
                            data-label="Link copied!"
                            data-message="Page link copied to clipboard"
                            aria-label="Copy page link">
                            <i class="nds-icon nds-hgi-link-04"></i>
                            <span class="nds-label">Copy link</span>
                        </button>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container nds-scroll-more">
                        <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-copy-feedback-1" id="tab-copy-feedback-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-copy-feedback-1"
                            aria-labelledby="tab-copy-feedback-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
&lt;button type="button" class="nds-btn nds-secondary-outline nds-copy"
    data-copy="https://nds.sa/components/copy"
    data-label="Link copied!"
    data-message="Page link copied to clipboard"
    aria-label="Copy page link"&gt;
    &lt;i class="nds-icon nds-hgi-link-04"&gt;&lt;/i&gt;
    &lt;span class="nds-label"&gt;Copy link&lt;/span&gt;
&lt;/button&gt;
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
<section id="copyFeatures" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:24px; --row-gap: 24px; --col-gap: 32px;">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-plug-socket"></i>
                        <span class="nds-label">Auto-initialization</span>
                    </span>
                    <p class="nds-item-desc">Every <code class="nds-inline-code lang-html">.nds-copy</code> on the page is wired up automatically. No setup, no per-button event listeners to manage.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-target-02"></i>
                        <span class="nds-label">Three-Tier Text Resolution</span>
                    </span>
                    <p class="nds-item-desc">The button copies its <code class="nds-inline-code lang-html">data-copy</code> literal, the text of its <code class="nds-inline-code lang-html">data-copy-target</code> selector, or the nested <code class="nds-inline-code lang-html">&lt;code&gt;</code> when placed inside an <code class="nds-inline-code lang-html">.nds-code</code> block.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-tick-01"></i>
                        <span class="nds-label">Visible Success Feedback</span>
                    </span>
                    <p class="nds-item-desc">The icon flips to a checkmark and the optional <code class="nds-inline-code lang-html">data-label</code> text swaps in for two seconds, then everything restores.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-voice"></i>
                        <span class="nds-label">Screen Reader Announcement</span>
                    </span>
                    <p class="nds-item-desc">A shared <code class="nds-inline-code lang-html">aria-live</code> region announces <code class="nds-inline-code lang-html">data-message</code> on every successful copy so assistive tech users get the same confirmation as sighted users.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-shield-01"></i>
                        <span class="nds-label">Insecure-Context Fallback</span>
                    </span>
                    <p class="nds-item-desc">When the modern Clipboard API is unavailable (HTTP, older browsers, sandboxed iframes), the utility falls back to a temporary textarea + <code class="nds-inline-code lang-js">execCommand</code> so copy still works in development.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-api"></i>
                        <span class="nds-label">Programmatic Control</span>
                    </span>
                    <p class="nds-item-desc">Call <code class="nds-inline-code lang-js">NDS.Copy.writeText</code>, <code class="nds-inline-code lang-js">NDS.Copy.flash</code>, or <code class="nds-inline-code lang-js">NDS.Copy.copyFrom</code> from your own JS to integrate copy into custom flows.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="copyGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-content-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use <strong>literal copy</strong> (<code class="nds-inline-code lang-html">data-copy</code>) for values you already know at render time: phone numbers, emails, reference IDs, API tokens, emergency numbers</li>
                    <li>Use <strong>copy from target</strong> (<code class="nds-inline-code lang-html">data-copy-target</code>) when the value lives inside another element you have already styled, so you don't have to duplicate the string into an attribute</li>
                    <li>Place a copy button inside an <a class="nds-color" href="{{ 'components/code' | relative_url }}">nds-code</a> wrapper for any code snippet developers may want to run locally. The button copies the raw code automatically</li>
                    <li>Always set a meaningful <code class="nds-inline-code lang-html">aria-label</code> that names what is being copied ("Copy phone number", "Copy reference ID"). Generic labels like "Copy" leave screen reader users without context</li>
                    <li>Use <code class="nds-inline-code lang-html">data-label</code> when the button has visible text and the text swap reinforces the action ("Copy link" → "Link copied!"). Skip it for icon-only buttons where the checkmark already conveys success</li>
                    <li>Use <code class="nds-inline-code lang-html">data-message</code> to spell out what was copied for assistive tech ("Page link copied to clipboard" reads better than "Copied"). It defaults to <code class="nds-inline-code lang-html">data-label</code>, then to "Copied", so omit it only when the button label already makes the action unambiguous</li>
                    <li>For copy buttons inside a <a class="nds-color" href="{{ 'components/dropmenu' | relative_url }}">Dropmenu</a> item, add <code class="nds-inline-code lang-html">data-no-auto-close</code> so the dropmenu stays open during the two second flash, otherwise the user never sees the success feedback</li>
                    <li>Do not stack a copy button next to every list item if the list is long. The control becomes visual noise. Surface copy on the items that are actually useful to copy (codes, identifiers, contact info)</li>
                    <li>For dynamic values that change after page load, prefer <code class="nds-inline-code lang-html">data-copy-target</code> over <code class="nds-inline-code lang-html">data-copy</code>. The target's text content is read at click time, so the latest value is copied</li>
                </ul>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-copy</code></td><td>Literal string the button copies. Highest priority in the resolver.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-copy-target</code></td><td>CSS selector. The button copies the target element's <code class="nds-inline-code lang-js">textContent</code>, trimmed. Used only when <code class="nds-inline-code lang-html">data-copy</code> is absent.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-label</code></td><td>Text that replaces the button's <code class="nds-inline-code lang-html">.nds-label</code> during the success flash. Restored automatically after the flash window.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-message</code></td><td>Message announced through the shared <code class="nds-inline-code lang-html">aria-live</code> region. Falls back to <code class="nds-inline-code lang-html">data-label</code>, then to <code class="nds-inline-code lang-html">"Copied"</code>.</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDS.Copy</strong> API powers every <code class="nds-inline-code lang-html">.nds-copy</code> on the page and is also callable directly from your own scripts when you need to compose copy into a larger flow (for example, copying a dynamically computed URL after a network request).</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// ── Write text to the clipboard ──────────────────────
// Returns a Promise that resolves to true on success.
// Tries navigator.clipboard first, falls back to a
// temporary textarea + execCommand for HTTP / older browsers.
const ok = await NDS.Copy.writeText('hello world');

// ── Trigger the success flash on a button ────────────
// Sets data-status="success", swaps the icon to a
// checkmark, swaps .nds-label to data-label, and
// announces data-message via aria-live. Restores
// after `duration` ms (default 2000).
NDS.Copy.flash(buttonEl, {
    duration: 2000,                    // Flash window in ms
    onRestore: () => closePopover()    // Optional callback after restore
});

// ── One-shot: resolve text + write + flash ───────────
// Reads data-copy / data-copy-target / nested code, writes
// it, and flashes the button on success.
await NDS.Copy.copyFrom(buttonEl);

// ── Bind a custom selector ───────────────────────────
// Safe to call repeatedly; each call replaces the
// previous listener for that selector via AbortController.
NDS.Copy.bind('.my-custom-copy-btn', { duration: 1500 });

// ── Re-initialize after dynamic HTML ─────────────────
// Auto-binds '.nds-copy' for the page. The NDS loader
// calls this once on initial load.
NDS.Copy.init();
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
