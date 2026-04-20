---
layout: page
title: Share
hero_title: Share - National Design System
hero_description: A social sharing utility that opens X, LinkedIn, and WhatsApp share dialogs and copies the page link to the clipboard. Works as a dropmenu or an inline row of buttons, with per-instance URL and title overrides
breadcrumb: [["Utilities", "/utilities?category=Utilities"]]
lang: en
direction: ltr
---

<!-- Default Share -->
<section id="shareDefault" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Current Page</h2>
            <p class="nds-section-description">Drop a <code class="nds-inline-code lang-html">.nds-share</code> wrapper anywhere on the page with a <a class="nds-color" href="{{ 'components/dropmenu' | relative_url }}">Dropmenu</a> trigger and four share items. With no data attributes, the utility shares <code class="nds-inline-code lang-js">window.location.href</code> and <code class="nds-inline-code lang-js">document.title</code>.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">

            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Share This Page</div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-share nds-dropmenu">
                            <button class="nds-btn nds-secondary-outline nds-dropmenu-trigger" aria-label="Share Page">
                                <i class="nds-icon nds-hgi-share-01" aria-hidden="true"></i>
                                <span class="nds-label">Share Page</span>
                            </button>
                            <div class="nds-dropmenu-menu" hidden>
                                <button class="nds-btn nds-subtle nds-dropmenu-item nds-share-x" type="button" aria-label="Share on X">
                                    <i class="nds-icon nds-hgi-new-twitter" aria-hidden="true"></i>
                                    <span class="nds-label">X</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-dropmenu-item nds-share-linkedin" type="button" aria-label="Share on LinkedIn">
                                    <i class="nds-icon nds-hgi-linkedin-02" aria-hidden="true"></i>
                                    <span class="nds-label">LinkedIn</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-dropmenu-item nds-share-whatsapp" type="button" aria-label="Share on WhatsApp">
                                    <i class="nds-icon nds-hgi-whatsapp" aria-hidden="true"></i>
                                    <span class="nds-label">WhatsApp</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-dropmenu-item nds-share-copy" type="button" aria-label="Copy Link"
                                    data-label="Link Copied!" data-message="Page link copied to clipboard" data-no-auto-close>
                                    <i class="nds-icon nds-hgi-link-04" aria-hidden="true"></i>
                                    <span class="nds-label">Copy Link</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container nds-scroll-more">
                        <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-share-default-1" id="tab-share-default-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-share-default-1"
                            aria-labelledby="tab-share-default-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
&lt;div class="nds-share nds-dropmenu"&gt;
    &lt;button class="nds-btn nds-secondary-outline nds-dropmenu-trigger" aria-label="Share Page"&gt;
        &lt;i class="nds-icon nds-hgi-share-01" aria-hidden="true"&gt;&lt;/i&gt;
        &lt;span class="nds-label"&gt;Share Page&lt;/span&gt;
    &lt;/button&gt;
    &lt;div class="nds-dropmenu-menu" hidden&gt;
        &lt;button class="nds-btn nds-subtle nds-dropmenu-item nds-share-x" type="button" aria-label="Share on X"&gt;
            &lt;i class="nds-icon nds-hgi-new-twitter" aria-hidden="true"&gt;&lt;/i&gt;
            &lt;span class="nds-label"&gt;X&lt;/span&gt;
        &lt;/button&gt;
        &lt;button class="nds-btn nds-subtle nds-dropmenu-item nds-share-linkedin" type="button" aria-label="Share on LinkedIn"&gt;
            &lt;i class="nds-icon nds-hgi-linkedin-02" aria-hidden="true"&gt;&lt;/i&gt;
            &lt;span class="nds-label"&gt;LinkedIn&lt;/span&gt;
        &lt;/button&gt;
        &lt;button class="nds-btn nds-subtle nds-dropmenu-item nds-share-whatsapp" type="button" aria-label="Share on WhatsApp"&gt;
            &lt;i class="nds-icon nds-hgi-whatsapp" aria-hidden="true"&gt;&lt;/i&gt;
            &lt;span class="nds-label"&gt;WhatsApp&lt;/span&gt;
        &lt;/button&gt;
        &lt;button class="nds-btn nds-subtle nds-dropmenu-item nds-share-copy" type="button" aria-label="Copy Link"
            data-label="Link Copied!" data-message="Page link copied to clipboard" data-no-auto-close&gt;
            &lt;i class="nds-icon nds-hgi-link-04" aria-hidden="true"&gt;&lt;/i&gt;
            &lt;span class="nds-label"&gt;Copy Link&lt;/span&gt;
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
</section>

<!-- Custom URL and Title -->
<section id="shareCustom" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Custom URL and Title</h2>
            <p class="nds-section-description">Add <code class="nds-inline-code lang-html">data-share-url</code> and <code class="nds-inline-code lang-html">data-share-title</code> to the wrapper to share something other than the current page. Useful for article cards, search results, and downloadable resources.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">

            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Share a Specific Article</div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-share nds-dropmenu"
                            data-share-url="https://nds.sa/components/button"
                            data-share-title="NDS Button Component">
                            <button class="nds-btn nds-secondary-outline nds-dropmenu-trigger" aria-label="Share Article">
                                <i class="nds-icon nds-hgi-share-01" aria-hidden="true"></i>
                                <span class="nds-label">Share Article</span>
                            </button>
                            <div class="nds-dropmenu-menu" hidden>
                                <button class="nds-btn nds-subtle nds-dropmenu-item nds-share-x" type="button" aria-label="Share on X">
                                    <i class="nds-icon nds-hgi-new-twitter" aria-hidden="true"></i>
                                    <span class="nds-label">X</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-dropmenu-item nds-share-linkedin" type="button" aria-label="Share on LinkedIn">
                                    <i class="nds-icon nds-hgi-linkedin-02" aria-hidden="true"></i>
                                    <span class="nds-label">LinkedIn</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-dropmenu-item nds-share-whatsapp" type="button" aria-label="Share on WhatsApp">
                                    <i class="nds-icon nds-hgi-whatsapp" aria-hidden="true"></i>
                                    <span class="nds-label">WhatsApp</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-dropmenu-item nds-share-copy" type="button" aria-label="Copy Link"
                                    data-label="Link Copied!" data-message="Article link copied to clipboard" data-no-auto-close>
                                    <i class="nds-icon nds-hgi-link-04" aria-hidden="true"></i>
                                    <span class="nds-label">Copy Link</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container nds-scroll-more">
                        <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-share-custom-1" id="tab-share-custom-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-share-custom-1"
                            aria-labelledby="tab-share-custom-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
&lt;div class="nds-share nds-dropmenu"
    data-share-url="https://nds.sa/components/button"
    data-share-title="NDS Button Component"&gt;
    &lt;button class="nds-btn nds-secondary-outline nds-dropmenu-trigger" aria-label="Share Article"&gt;
        &lt;i class="nds-icon nds-hgi-share-01" aria-hidden="true"&gt;&lt;/i&gt;
        &lt;span class="nds-label"&gt;Share Article&lt;/span&gt;
    &lt;/button&gt;
    &lt;div class="nds-dropmenu-menu" hidden&gt;
        &lt;button class="nds-btn nds-subtle nds-dropmenu-item nds-share-x" type="button" aria-label="Share on X"&gt;
            &lt;i class="nds-icon nds-hgi-new-twitter" aria-hidden="true"&gt;&lt;/i&gt;
            &lt;span class="nds-label"&gt;X&lt;/span&gt;
        &lt;/button&gt;
        &lt;button class="nds-btn nds-subtle nds-dropmenu-item nds-share-linkedin" type="button" aria-label="Share on LinkedIn"&gt;
            &lt;i class="nds-icon nds-hgi-linkedin-02" aria-hidden="true"&gt;&lt;/i&gt;
            &lt;span class="nds-label"&gt;LinkedIn&lt;/span&gt;
        &lt;/button&gt;
        &lt;button class="nds-btn nds-subtle nds-dropmenu-item nds-share-whatsapp" type="button" aria-label="Share on WhatsApp"&gt;
            &lt;i class="nds-icon nds-hgi-whatsapp" aria-hidden="true"&gt;&lt;/i&gt;
            &lt;span class="nds-label"&gt;WhatsApp&lt;/span&gt;
        &lt;/button&gt;
        &lt;button class="nds-btn nds-subtle nds-dropmenu-item nds-share-copy" type="button" aria-label="Copy Link"
            data-label="Link Copied!" data-message="Article link copied to clipboard" data-no-auto-close&gt;
            &lt;i class="nds-icon nds-hgi-link-04" aria-hidden="true"&gt;&lt;/i&gt;
            &lt;span class="nds-label"&gt;Copy Link&lt;/span&gt;
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
</section>

<!-- Inline Buttons -->
<section id="shareInline" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Inline Buttons</h2>
            <p class="nds-section-description">Drop the same four share buttons directly inside <code class="nds-inline-code lang-html">.nds-share</code> (no <code class="nds-inline-code lang-html">.nds-dropmenu</code>, no trigger) to render them as an inline row. Use any button variant you like, and add <code class="nds-inline-code lang-html">.nds-icon-only</code> to hide the label when space is tight.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">

            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-icon-only", ".nds-share .nds-btn", "iconOnly"]'>
                            <span class="nds-label">Icon Only</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-share">
                            <button class="nds-btn nds-secondary-outline nds-share-x" type="button" aria-label="Share on X">
                                <i class="nds-icon nds-hgi-new-twitter" aria-hidden="true"></i>
                                <span class="nds-label">X</span>
                            </button>
                            <button class="nds-btn nds-secondary-outline nds-share-linkedin" type="button" aria-label="Share on LinkedIn">
                                <i class="nds-icon nds-hgi-linkedin-02" aria-hidden="true"></i>
                                <span class="nds-label">LinkedIn</span>
                            </button>
                            <button class="nds-btn nds-secondary-outline nds-share-whatsapp" type="button" aria-label="Share on WhatsApp">
                                <i class="nds-icon nds-hgi-whatsapp" aria-hidden="true"></i>
                                <span class="nds-label">WhatsApp</span>
                            </button>
                            <button class="nds-btn nds-secondary-outline nds-share-copy" type="button" aria-label="Copy Link"
                                data-label="Link Copied!" data-message="Page link copied to clipboard">
                                <i class="nds-icon nds-hgi-link-04" aria-hidden="true"></i>
                                <span class="nds-label">Copy Link</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container nds-scroll-more">
                        <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-share-inline-1" id="tab-share-inline-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-share-inline-1"
                            aria-labelledby="tab-share-inline-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
&lt;!-- Add .nds-icon-only to any button to hide its label --&gt;
&lt;div class="nds-share"&gt;
    &lt;button class="nds-btn nds-secondary-outline nds-share-x" type="button" aria-label="Share on X"&gt;
        &lt;i class="nds-icon nds-hgi-new-twitter" aria-hidden="true"&gt;&lt;/i&gt;
        &lt;span class="nds-label"&gt;X&lt;/span&gt;
    &lt;/button&gt;
    &lt;button class="nds-btn nds-secondary-outline nds-share-linkedin" type="button" aria-label="Share on LinkedIn"&gt;
        &lt;i class="nds-icon nds-hgi-linkedin-02" aria-hidden="true"&gt;&lt;/i&gt;
        &lt;span class="nds-label"&gt;LinkedIn&lt;/span&gt;
    &lt;/button&gt;
    &lt;button class="nds-btn nds-secondary-outline nds-share-whatsapp" type="button" aria-label="Share on WhatsApp"&gt;
        &lt;i class="nds-icon nds-hgi-whatsapp" aria-hidden="true"&gt;&lt;/i&gt;
        &lt;span class="nds-label"&gt;WhatsApp&lt;/span&gt;
    &lt;/button&gt;
    &lt;button class="nds-btn nds-secondary-outline nds-share-copy" type="button" aria-label="Copy Link"
        data-label="Link Copied!" data-message="Page link copied to clipboard"&gt;
        &lt;i class="nds-icon nds-hgi-link-04" aria-hidden="true"&gt;&lt;/i&gt;
        &lt;span class="nds-label"&gt;Copy Link&lt;/span&gt;
    &lt;/button&gt;
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

<!-- Built-in Features -->
<section id="shareFeatures" class="nds-content-section">
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
                    <p class="nds-item-desc">Every <code class="nds-inline-code lang-html">.nds-share</code> wrapper on the page is wired up automatically by the NDS loader. Drop the markup in, no JS to write.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-share-04"></i>
                        <span class="nds-label">Four Social Targets</span>
                    </span>
                    <p class="nds-item-desc">X, LinkedIn, WhatsApp, and Copy Link are wired by class (<code class="nds-inline-code lang-html">nds-share-x</code>, <code class="nds-inline-code lang-html">nds-share-linkedin</code>, <code class="nds-inline-code lang-html">nds-share-whatsapp</code>, <code class="nds-inline-code lang-html">nds-share-copy</code>). Each opens a sized popup for the platform's native share dialog.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-link-04"></i>
                        <span class="nds-label">Copy Link Composition</span>
                    </span>
                    <p class="nds-item-desc">The Copy Link action reuses the <a class="nds-color" href="{{ 'utilities/copy' | relative_url }}">Copy</a> utility for clipboard write, checkmark flash, label swap, and screen reader announcement. In the dropmenu variant it also closes the menu after the flash restores.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                        <span class="nds-label">Multiple Instances</span>
                    </span>
                    <p class="nds-item-desc">Any number of <code class="nds-inline-code lang-html">.nds-share</code> wrappers can co-exist on a single page. Each reads its own <code class="nds-inline-code lang-html">data-share-url</code> and <code class="nds-inline-code lang-html">data-share-title</code> independently.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-menu-01"></i>
                        <span class="nds-label">Dropmenu or Inline</span>
                    </span>
                    <p class="nds-item-desc">Add <code class="nds-inline-code lang-html">nds-dropmenu</code> to get a collapsible menu with <a class="nds-color" href="{{ 'components/dropmenu' | relative_url }}">Dropmenu</a> handling open/close and outside-click. Omit it to render the buttons as an inline row &mdash; same JS, same data attributes.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="shareGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-content-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use the default form (no data attributes) for <strong>page-level sharing</strong>, typically in the hero action bar. It always reflects the current URL and title, so it works on every page without per-page configuration</li>
                    <li>Use <code class="nds-inline-code lang-html">data-share-url</code> and <code class="nds-inline-code lang-html">data-share-title</code> for <strong>item-level sharing</strong>: an article card, a news story, a downloadable resource. Keeps the utility reusable without duplicating JS</li>
                    <li>Always set a meaningful <code class="nds-inline-code lang-html">aria-label</code> on the trigger ("Share Page", "Share Article", "Share Report") so screen reader users know what is being shared</li>
                    <li>Keep <code class="nds-inline-code lang-html">data-no-auto-close</code> on the Copy Link item <strong>in the dropmenu variant</strong>. Without it the dropmenu closes before the 2 second success flash finishes, and users never see the confirmation. The inline variant does not need this attribute</li>
                    <li>Pick the <strong>inline variant</strong> for article footers, cards, and anywhere you want the share targets visible at rest. Pick the <strong>dropmenu variant</strong> for toolbar-style placements where the trigger needs to collapse</li>
                    <li>Pair <code class="nds-inline-code lang-html">data-label</code> with <code class="nds-inline-code lang-html">data-message</code> on the Copy Link item so sighted users and screen reader users get equivalent feedback. The defaults ("Link Copied!" / "Page link copied to clipboard") are a good starting point</li>
                    <li>Avoid stacking more than one Share wrapper in the same visual block. If a list has a share button per row, put the trigger inside the row, not next to a page-level share</li>
                    <li>Do not remove share targets silently to "simplify" the UI. Either show all four or drop the Share utility on that page entirely; partial sets confuse returning users</li>
                </ul>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Placement</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-share-url</code></td><td>Wrapper</td><td>URL to share. Falls back to <code class="nds-inline-code lang-js">window.location.href</code>.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-share-title</code></td><td>Wrapper</td><td>Title passed to X and WhatsApp share dialogs. Falls back to <code class="nds-inline-code lang-js">document.title</code>.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-label</code></td><td>Copy Link item</td><td>Visible label swap during the 2 second success flash. Read by the Copy utility.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-message</code></td><td>Copy Link item</td><td>Screen reader announcement on successful copy. Falls back to <code class="nds-inline-code lang-html">data-label</code>, then to "Copied".</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-no-auto-close</code></td><td>Copy Link item</td><td>Keeps the Dropmenu open during the success flash so the user sees the confirmation.</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDS.Share</strong> module exposes a single method, <code class="nds-inline-code lang-js">NDS.Share.init()</code>, which the NDS loader calls once on page load to attach the delegated click listener. Call it again after injecting new <code class="nds-inline-code lang-html">.nds-share</code> markup into the page; the listener is rebound via <code class="nds-inline-code lang-js">AbortController</code> so repeat calls do not stack handlers.</p>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-javascript code">
// Re-initialize after injecting dynamic .nds-share markup
NDS.Share.init();
</code>
                </div>
            </div>

        </div>
    </div>
</section>
