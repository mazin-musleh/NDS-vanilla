---
layout: page
title: Status Section
hero_title: Status Section Layout - National Design System
hero_description: A section that reports one outcome — a page that was not found, a request that went through, a payment that failed. It centers an icon or an illustration above a title, a short message, and an action.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.9.x"
updated: "1.9.x"
last_edit: "24/08/2026 - 01:00 AM"
---

<!-- Structure -->
<section id="statusStructure" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Structure</h2>
            <p class="nds-section-description">Add <code class="nds-inline-code lang-html">nds-status-section</code> to a content section. The variant centers every part, and it fills the leftover height when it is the only section on the page. Use it as a whole page, such as an error page or a confirmation page, or place it among the other sections of a longer page. The artwork slot takes one of two blocks: <code class="nds-inline-code lang-html">nds-section-icon</code> for a status chip, or <code class="nds-inline-code lang-html">nds-section-image</code> for an illustration.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-showcase">
                    <div class="nds-demo-card">
                        <div class="demo-header">
                            <div class="demo-label">Component Tree</div>
                        </div>
                        <div class="demo-container nds-noBg">
                            <div class="nds-code nds-expandable">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                        <i class="nds-icon nds-hgi-copy-01"></i>
                                    </button>
                                </div>
                                <div class="nds-expandable-content">
                                    <code class="lang-html code">
section.nds-content-section.nds-status-section   [data-status]
&#9492;&#9472;&#9472; div.nds-section-wrapper
    &#9500;&#9472;&#9472; div.nds-section-icon      (a feedback chip)
    &#9474;   &#9492;&#9472;&#9472; span.nds-feedback.nds-ring
    &#9500;&#9472;&#9472; div.nds-section-image     (or an illustration)
    &#9500;&#9472;&#9472; div.nds-section-head
    &#9474;   &#9500;&#9472;&#9472; h1.nds-section-title
    &#9474;   &#9492;&#9472;&#9472; p.nds-section-description
    &#9492;&#9472;&#9472; div.nds-section-action
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

<!-- Status -->
<section id="statusStatuses" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Status</h2>
            <p class="nds-section-description">Set <code class="nds-inline-code lang-html">data-status</code> on the section. That one attribute colors the title and paints the feedback chip, so the icon and the heading read as one message. The chip needs no status of its own: it takes the value from the section around it.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block nds-prose">
                <div class="nds-showcase">
                    <div class="nds-demo-card">
                        <div class="demo-header">
                            <div class="demo-label">Outcome message</div>
                            <div class="demo-action">
                                <div class="nds-dropmenu demo-toggle-menu">
                                    <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Status: ">
                                        <span class="nds-label">Status: Success</span>
                                    </button>
                                    <div class="nds-dropmenu-menu" hidden>
                                        <div class="nds-dropmenu-scroll">
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                                data-toggler='["data-status=success", ".nds-status-section", "statusSectionStatus", "attr"]'>
                                                <span class="nds-label">Success</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='["data-status=info", ".nds-status-section", "statusSectionStatus", "attr"]'>
                                                <span class="nds-label">Info</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='["data-status=warning", ".nds-status-section", "statusSectionStatus", "attr"]'>
                                                <span class="nds-label">Warning</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='["data-status=error", ".nds-status-section", "statusSectionStatus", "attr"]'>
                                                <span class="nds-label">Error</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='["data-status=critical", ".nds-status-section", "statusSectionStatus", "attr"]'>
                                                <span class="nds-label">Critical</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="demo-container">
                            <div class="state-demo">
                                <section class="nds-content-section nds-status-section" data-status="success">
                                    <div class="nds-section-wrapper">
                                        <div class="nds-section-icon">
                                            <span class="nds-feedback nds-ring">
                                                <span class="nds-feedback-icon">
                                                    <i class="nds-icon" aria-hidden="true"></i>
                                                </span>
                                            </span>
                                        </div>
                                        <div class="nds-section-head">
                                            <h2 class="nds-section-title">Request submitted</h2>
                                            <p class="nds-section-description">We received your request. A confirmation message arrives within three working days.</p>
                                        </div>
                                        <div class="nds-section-action">
                                            <a href="#" class="nds-btn nds-primary">
                                                <span class="nds-label">Back to Home</span>
                                            </a>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                        <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true" aria-controls="panel-status-icon" id="tab-status-icon">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-status-icon" aria-labelledby="tab-status-icon">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;section class="nds-content-section nds-status-section" data-status="success"&gt;
    &lt;div class="nds-section-wrapper"&gt;
        &lt;div class="nds-section-icon"&gt;
            &lt;span class="nds-feedback nds-ring"&gt;
                &lt;span class="nds-feedback-icon"&gt;
                    &lt;i class="nds-icon" aria-hidden="true"&gt;&lt;/i&gt;
                &lt;/span&gt;
            &lt;/span&gt;
        &lt;/div&gt;
        &lt;div class="nds-section-head"&gt;
            &lt;h1 class="nds-section-title"&gt;Request submitted&lt;/h1&gt;
            &lt;p class="nds-section-description"&gt;We received your request. A confirmation message arrives within three working days.&lt;/p&gt;
        &lt;/div&gt;
        &lt;div class="nds-section-action"&gt;
            &lt;a href="/" class="nds-btn nds-primary"&gt;
                &lt;span class="nds-label"&gt;Back to Home&lt;/span&gt;
            &lt;/a&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/section&gt;
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

<!-- Illustration -->
<section id="statusIllustration" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Illustration</h2>
            <p class="nds-section-description">A page with artwork uses <code class="nds-inline-code lang-html">nds-section-image</code> in place of the icon block, and drops <code class="nds-inline-code lang-html">data-status</code> so the title keeps the default color. This is the shape the 404 template ships.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block nds-prose">
                <div class="nds-showcase">
                    <div class="nds-demo-card">
                        <div class="demo-header">
                            <div class="demo-label">Page not found</div>
                        </div>
                        <div class="demo-container">
                            <div class="state-demo">
                                <section class="nds-content-section nds-status-section">
                                    <div class="nds-section-wrapper">
                                        <div class="nds-section-image">
                                            <img src="{{ 'assets/img/404.svg' | relative_url }}" width="458" height="324" alt="Page not found">
                                        </div>
                                        <div class="nds-section-head">
                                            <h2 class="nds-section-title">Something went wrong</h2>
                                            <p class="nds-section-description">Sorry, we couldn't find the page you're looking for</p>
                                        </div>
                                        <div class="nds-section-action">
                                            <a href="#" class="nds-btn nds-primary">
                                                <span class="nds-label">Back to Home</span>
                                            </a>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                        <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true" aria-controls="panel-status-image" id="tab-status-image">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-status-image" aria-labelledby="tab-status-image">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;section class="nds-content-section nds-status-section"&gt;
    &lt;div class="nds-section-wrapper"&gt;
        &lt;div class="nds-section-image"&gt;
            &lt;img src="/assets/img/404.svg" width="458" height="324" alt="Page not found"&gt;
        &lt;/div&gt;
        &lt;div class="nds-section-head"&gt;
            &lt;h1 class="nds-section-title"&gt;Something went wrong&lt;/h1&gt;
            &lt;p class="nds-section-description"&gt;Sorry, we couldn't find the page you're looking for&lt;/p&gt;
        &lt;/div&gt;
        &lt;div class="nds-section-action"&gt;
            &lt;a href="/" class="nds-btn nds-primary"&gt;
                &lt;span class="nds-label"&gt;Back to Home&lt;/span&gt;
            &lt;/a&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/section&gt;
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
<section id="statusGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block nds-prose">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Put a whole-page status section inside the standard <a class="nds-color" href="{{ 'layout/page-shell' | relative_url }}">page shell</a>. The shell fills the page height for you, and it holds the region until the styles land, so the message never paints unstyled</li>
                    <li>Give the page one <strong>action</strong>, and make it the way out — back to home, back to the service, or retry. A dead end with no link is the one thing every error page must avoid</li>
                    <li>Use the <strong>section title</strong> for the outcome and the description for what happens next. Keep both short: people read this page in a hurry</li>
                    <li>On a standalone page the title is the page heading, so use <code class="nds-inline-code lang-html">h1</code>. Inside a longer page it is one heading among others, so follow the page's own heading order</li>
                    <li>Pick the status by meaning, not by color: <code class="nds-inline-code lang-html">success</code> for work that completed, <code class="nds-inline-code lang-html">error</code> for work that failed, <code class="nds-inline-code lang-html">warning</code> for work that needs attention, <code class="nds-inline-code lang-html">info</code> for a plain notice</li>
                    <li>Use an <strong>illustration</strong> for pages with their own artwork, and the chip everywhere else. Ship one block or the other, not both</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Reference</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Name</th><th>Where</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">.nds-status-section</code></td><td>On the section</td><td>Centers every part, fills the leftover page height, and keys the status colors</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">.nds-section-icon</code></td><td>In the wrapper</td><td>Centering box for a feedback chip. Same box as <code class="nds-inline-code lang-html">.nds-section-image</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-status</code></td><td>On the section</td><td><code class="nds-inline-code lang-html">success</code>, <code class="nds-inline-code lang-html">info</code>, <code class="nds-inline-code lang-html">warning</code>, <code class="nds-inline-code lang-html">error</code>, <code class="nds-inline-code lang-html">critical</code>. Colors the title and paints the chip</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">.nds-404</code></td><td>On the section</td><td>The old name of this variant, kept for pages copied from the previous 404 template. Use <code class="nds-inline-code lang-html">.nds-status-section</code> in new work</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--feedback-size</code></td><td>On the section</td><td>Chip diameter, 56px here. See <a class="nds-color" href="{{ 'components/feedback-icons' | relative_url }}">feedback icons</a></td></tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</section>
