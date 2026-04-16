---
layout: page
title: Divider
hero_title: Divider - National Design System
hero_description: A utility for separating sections of content with a horizontal or vertical rule, optionally framing a label, and adapting to the parent's writing direction.
breadcrumb: ["Utilities"]
lang: en
direction: ltr
---

<!-- Plain Divider -->
<section id="dividerPlain" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Plain Divider</h2>
            <p class="nds-section-description">A single line between blocks of content. The spacing above and below scales through size modifiers so the separator breathes with the content around it.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Spacing: ">
                                    <span class="nds-label">Spacing: Default</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-divider", "dividerSize"]'
                                            data-trigger-label="Default">
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-md", ".nds-divider", "dividerSize"]'
                                            data-trigger-label="Medium">
                                            <span class="nds-label">Medium</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-lg", ".nds-divider", "dividerSize"]'
                                            data-trigger-label="Large">
                                            <span class="nds-label">Large</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-xl", ".nds-divider", "dividerSize"]'
                                            data-trigger-label="Extra Large">
                                            <span class="nds-label">Extra Large</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-2xl", ".nds-divider", "dividerSize"]'
                                            data-trigger-label="2X Large">
                                            <span class="nds-label">2X Large</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-3xl", ".nds-divider", "dividerSize"]'
                                            data-trigger-label="3X Large">
                                            <span class="nds-label">3X Large</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-4xl", ".nds-divider", "dividerSize"]'
                                            data-trigger-label="4X Large">
                                            <span class="nds-label">4X Large</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-content-wrapper">
                                <p>Content above the divider.</p>
                                <div class="nds-divider"></div>
                                <p>Content below the divider.</p>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-divider-plain-1" id="tab-divider-plain-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-divider-plain-1"
                                    aria-labelledby="tab-divider-plain-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<p>Content above the divider.</p>
<div class="nds-divider"></div>
<p>Content below the divider.</p>
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

<!-- With HR Element -->
<section id="dividerHr" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Inside a Dropmenu</h2>
            <p class="nds-section-description">A common case for <code class="nds-inline-code lang-html">&lt;hr class="nds-divider"&gt;</code> is separating groups of actions inside a menu (for example, routine actions from destructive ones).</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Separator between action groups</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-dropmenu">
                                <button class="nds-btn nds-secondary-outline nds-dropmenu-trigger">
                                    <i class="nds-icon nds-hgi-menu-01" aria-hidden="true"></i>
                                    <span class="nds-label">Actions</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item">
                                            <i class="hgi hgi-stroke hgi-edit-02"></i>
                                            <span class="nds-label">Edit</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                            <span class="nds-label">Duplicate</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item">
                                            <i class="nds-icon nds-hgi-share-01" aria-hidden="true"></i>
                                            <span class="nds-label">Share</span>
                                        </button>
                                        <hr class="nds-divider">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item nds-destructive">
                                            <i class="hgi hgi-stroke hgi-delete-02"></i>
                                            <span class="nds-label">Delete</span>
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
                                        aria-controls="panel-divider-hr-1" id="tab-divider-hr-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-divider-hr-1"
                                    aria-labelledby="tab-divider-hr-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<div class="nds-dropmenu">
  <button class="nds-btn nds-secondary-outline nds-dropmenu-trigger">
    <i class="nds-icon nds-hgi-menu-01" aria-hidden="true"></i>
    <span class="nds-label">Actions</span>
  </button>
  <div class="nds-dropmenu-menu" hidden>
    <div class="nds-dropmenu-scroll">
      <button class="nds-btn nds-subtle nds-dropmenu-item">
        <i class="hgi hgi-stroke hgi-edit-02"></i>
        <span class="nds-label">Edit</span>
      </button>
      <button class="nds-btn nds-subtle nds-dropmenu-item">
        <i class="hgi hgi-stroke hgi-copy-01"></i>
        <span class="nds-label">Duplicate</span>
      </button>
      <button class="nds-btn nds-subtle nds-dropmenu-item">
        <i class="nds-icon nds-hgi-share-01" aria-hidden="true"></i>
        <span class="nds-label">Share</span>
      </button>
      <hr class="nds-divider">
      <button class="nds-btn nds-subtle nds-dropmenu-item nds-destructive">
        <i class="hgi hgi-stroke hgi-delete-02"></i>
        <span class="nds-label">Delete</span>
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
    </div>
</section>

<!-- Vertical Divider -->
<section id="dividerVertical" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Vertical Divider</h2>
            <p class="nds-section-description">Add <code class="nds-inline-code lang-html">nds-vertical</code> and the same class renders as a vertical rule stretched to the parent's cross axis. Useful between inline stats, meta groups, or button clusters.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Inline stats with vertical separators</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-flex nds-row" style="--gap: var(--spacing-md); --justify: center;">
                                <div>
                                    <strong>125K</strong>
                                    <span>Services</span>
                                </div>
                                <div class="nds-divider nds-vertical" style="--divider-size: 3px;"></div>
                                <div>
                                    <strong>4.8</strong>
                                    <span>Rating</span>
                                </div>
                                <div class="nds-divider nds-vertical" style="--divider-size: 3px;"></div>
                                <div>
                                    <strong>23K</strong>
                                    <span>Reviews</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-divider-vertical-1" id="tab-divider-vertical-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-divider-vertical-1"
                                    aria-labelledby="tab-divider-vertical-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<div class="nds-flex nds-row" style="--gap: var(--spacing-md); --justify: center;">
  <div>
    <strong>125K</strong>
    <span>Services</span>
  </div>
  <div class="nds-divider nds-vertical" style="--divider-size: 3px;"></div>
  <div>
    <strong>4.8</strong>
    <span>Rating</span>
  </div>
  <div class="nds-divider nds-vertical" style="--divider-size: 3px;"></div>
  <div>
    <strong>23K</strong>
    <span>Reviews</span>
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

<!-- Divider with Text -->
<section id="dividerWithText" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Divider with Text</h2>
            <p class="nds-section-description">Adding any child content flips the divider into a flex row with two flanking lines. Useful for labeling sections or introducing alternative paths like "or continue with".</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Label between two lines</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-card nds-shadow nds-stroke" style="--card-width: 400px;">
                                <div class="nds-card-content">
                                    <div class="nds-card-text nds-center">
                                        <h3 class="nds-card-title">Sign in with National Single Sign-On</h3>
                                        <p class="nds-card-description">Use the credentials from your Nafath account to access the services provided by the university.</p>
                                    </div>
                                    <div class="nds-card-actions nds-row">
                                        <a href="#" class="nds-btn nds-primary nds-lg nds-full">
                                            <span class="nds-label">Continue with Nafath</span>
                                        </a>
                                    </div>
                                    <div class="nds-divider">or</div>
                                    <div class="nds-card-actions nds-row">
                                        <button type="button" class="nds-btn nds-secondary-outline nds-lg nds-full">
                                            <span class="nds-label">Sign in with University ID</span>
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
                                        aria-controls="panel-divider-text-1" id="tab-divider-text-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-divider-text-1"
                                    aria-labelledby="tab-divider-text-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<div class="nds-card nds-shadow nds-stroke" style="--card-width: 400px;">
  <div class="nds-card-content">
    <div class="nds-card-text nds-center">
      <h3 class="nds-card-title">Sign in with National Single Sign-On</h3>
      <p class="nds-card-description">Use the credentials from your Nafath account to access the services provided by the university.</p>
    </div>
    <div class="nds-card-actions nds-row">
      <a href="#" class="nds-btn nds-primary nds-lg nds-full">
        <span class="nds-label">Continue with Nafath</span>
      </a>
    </div>
    <div class="nds-divider">or</div>
    <div class="nds-card-actions nds-row">
      <button type="button" class="nds-btn nds-secondary-outline nds-lg nds-full">
        <span class="nds-label">Sign in with University ID</span>
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
    </div>
</section>

<!-- Built-in Features -->
<section id="dividerFeatures" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:24px; --row-gap: 24px; --col-gap: 32px;">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-text-align-center"></i>
                        <span class="nds-label">Text Annotation</span>
                    </span>
                    <p class="nds-item-desc">Any child content automatically turns the divider into a centered label flanked by two balanced lines, no extra markup needed.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-ruler"></i>
                        <span class="nds-label">Spacing and Size</span>
                    </span>
                    <p class="nds-item-desc">Six spacing modifiers from <code class="nds-inline-code lang-html">nds-md</code> through <code class="nds-inline-code lang-html">nds-4xl</code> control the margin around the rule, and the <code class="nds-inline-code lang-html">--divider-size</code> token controls line thickness.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-arrow-data-transfer-horizontal"></i>
                        <span class="nds-label">Writing-mode Aware</span>
                    </span>
                    <p class="nds-item-desc">Uses logical properties, so a parent in vertical writing-mode renders the divider as a vertical line without extra rules.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-html-5"></i>
                        <span class="nds-label">Works on Any Element</span>
                    </span>
                    <p class="nds-item-desc">Apply to <code class="nds-inline-code lang-html">&lt;div&gt;</code>, <code class="nds-inline-code lang-html">&lt;span&gt;</code>, or <code class="nds-inline-code lang-html">&lt;hr&gt;</code>. Browser defaults on <code class="nds-inline-code lang-html">&lt;hr&gt;</code> are reset so the result is consistent.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="dividerGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-content-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use a plain divider to break up a long section of content when white space alone is not enough to signal a transition</li>
                    <li>Use a divider with text to introduce an alternative path (for example "or", "continue with", or section labels between form groups)</li>
                    <li>Use <code class="nds-inline-code lang-html">&lt;hr class="nds-divider"&gt;</code> when the separation marks a thematic break in the content, and <code class="nds-inline-code lang-html">&lt;div class="nds-divider"&gt;</code> when it is purely visual</li>
                    <li>Do not use a divider to separate items inside a list. Add <code class="nds-inline-code lang-html">nds-divided</code> to the list itself so the rule aligns with each row</li>
                    <li>Do not use a divider between a card and its surrounding text. Cards already carry their own boundary and an extra rule adds visual noise</li>
                    <li>Pick the smallest size that gives enough breathing room. Oversized variants (<code class="nds-inline-code lang-html">nds-3xl</code>, <code class="nds-inline-code lang-html">nds-4xl</code>) are for major section breaks, not paragraphs</li>
                    <li>Keep text inside a divider short: a single word or short phrase reads cleanly, longer sentences compete with the rules themselves</li>
                    <li>Override <code class="nds-inline-code lang-html">--divider-color</code> locally to match surrounding surfaces (dark panels, tinted cards) rather than changing the global token</li>
                </ul>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Class</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">nds-vertical</code></td><td>Flips the rule to a vertical line. Stretches to the flex parent's cross axis. Spacing modifiers apply inline instead of block</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-md</code></td><td>Medium spacing around the rule</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-lg</code></td><td>Large spacing around the rule</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-xl</code></td><td>Extra-large spacing around the rule</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-2xl</code></td><td>2X-large spacing around the rule</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-3xl</code></td><td>3X-large spacing around the rule</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-4xl</code></td><td>4X-large spacing around the rule</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--divider</code></td><td><code class="nds-inline-code lang-html">--spacing-xs</code></td><td>Block margin applied above and below the divider. Size modifiers override this value</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--divider-size</code></td><td><code class="nds-inline-code lang-html">2px</code></td><td>Thickness of the rule. Applies to the element border and the pseudo-element lines in the text variant</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--divider-color</code></td><td><code class="nds-inline-code lang-html">--alpha-black-10</code></td><td>Color of the rule. Swaps automatically to <code class="nds-inline-code lang-html">--alpha-white-10</code> in dark mode. Override per-instance to match surrounding surfaces</td></tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</section>
