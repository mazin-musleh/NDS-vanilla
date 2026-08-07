---
layout: page
title: Helper Classes
hero_title: Helper Classes - National Design System
hero_description: Single-purpose CSS classes for the markup you write around NDS components, covering centering, spacing resets, direction isolation, brand-colored text, and small notes
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.6.x"
updated: "1.6.x"
last_edit: "07/08/2026 - 05:37 AM"
---

<!-- Centering -->
<section id="helpersCenter" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Centering</h2>
            <p class="nds-section-description">These classes are for the layouts you build yourself. NDS pages are composed from sections, blocks, and components, so this documentation uses them sparingly: they exist for your own markup, not as the structure of the system.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-showcase">
                    <div class="nds-demo-card">
                        <div class="demo-header">
                            <div class="demo-action">
                                <button class="nds-btn nds-subtle demo-toggle-btn" data-state="selected"
                                    data-toggler='["nds-center", ".nds-demo", "helperCenter"]'>
                                    <span class="nds-label">Center</span>
                                </button>
                            </div>
                        </div>
                        <div class="demo-container">
                            <div class="nds-card nds-stroke nds-demo nds-center">
                                <div class="nds-card-content">
                                    <div class="nds-card-text">
                                        <span class="nds-card-title">Service request received</span>
                                        <p class="nds-card-description">A reference number will reach you by text message within one working day.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="demo-code">
                            <div class="nds-tabs nds-code nds-divided">
                                <div class="nds-tab-list-container nds-scroll-more">
                                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                            aria-controls="panel-helpers-center-1" id="tab-helpers-center-1">
                                            <span class="nds-tab-label">HTML</span>
                                        </button>
                                    </nav>
                                    <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="nds-tab-content">
                                    <div class="nds-tab-panel code-example" role="tabpanel" id="panel-helpers-center-1"
                                        aria-labelledby="tab-helpers-center-1">
                                        <div class="nds-code-action">
                                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                                <i class="nds-icon nds-hgi-copy-01"></i>
                                            </button>
                                        </div>
                                        <code class="lang-html code">
&lt;div class="nds-card nds-stroke nds-center"&gt;
  &lt;div class="nds-card-content"&gt;
    &lt;div class="nds-card-text"&gt;
      &lt;span class="nds-card-title"&gt;Service request received&lt;/span&gt;
      &lt;p class="nds-card-description"&gt;A reference number will reach you by text message within one working day.&lt;/p&gt;
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
    </div>
</section>

<!-- Spacing Reset -->
<section id="helpersFlush" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Spacing Reset</h2>
            <p class="nds-section-description">Strips padding, margin, border, and corner radius in one class. Reach for it when a component sits inside a frame you already styled and its own spacing would double up.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-showcase">
                    <div class="nds-demo-card">
                        <div class="demo-header">
                            <div class="demo-action">
                                <button class="nds-btn nds-subtle demo-toggle-btn" data-state="selected"
                                    data-toggler='["nds-flush", ".nds-demo", "helperFlush"]'>
                                    <span class="nds-label">Flush</span>
                                </button>
                            </div>
                        </div>
                        <div class="demo-container">
                            <div class="nds-card nds-stroke nds-demo nds-flush">
                                <div class="nds-card-content">
                                    <div class="nds-card-text">
                                        <span class="nds-card-title">Opening hours</span>
                                        <p class="nds-card-description">Sunday to Thursday, 8:00 to 16:00.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="demo-code">
                            <div class="nds-tabs nds-code nds-divided">
                                <div class="nds-tab-list-container nds-scroll-more">
                                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                            aria-controls="panel-helpers-flush-1" id="tab-helpers-flush-1">
                                            <span class="nds-tab-label">HTML</span>
                                        </button>
                                    </nav>
                                    <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="nds-tab-content">
                                    <div class="nds-tab-panel code-example" role="tabpanel" id="panel-helpers-flush-1"
                                        aria-labelledby="tab-helpers-flush-1">
                                        <div class="nds-code-action">
                                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                                <i class="nds-icon nds-hgi-copy-01"></i>
                                            </button>
                                        </div>
                                        <code class="lang-html code">
&lt;div class="nds-card nds-stroke nds-flush"&gt;
  &lt;div class="nds-card-content"&gt;
    &lt;div class="nds-card-text"&gt;
      &lt;span class="nds-card-title"&gt;Opening hours&lt;/span&gt;
      &lt;p class="nds-card-description"&gt;Sunday to Thursday, 8:00 to 16:00.&lt;/p&gt;
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
    </div>
</section>

<!-- Direction Isolation -->
<section id="helpersDirection" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Direction Isolation</h2>
            <p class="nds-section-description">Arabic text mixed with a Latin value is the most common direction bug: the leading plus sign, slash, or question mark drifts to the wrong end of the value. This class pins that value to left-to-right and keeps it from reordering the sentence around it.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-showcase">
                    <div class="nds-demo-card">
                        <div class="demo-header">
                            <div class="demo-action">
                                <button class="nds-btn nds-subtle demo-toggle-btn" data-state="selected"
                                    data-toggler='["nds-ltr", ".nds-label", "helperLtr"]'>
                                    <span class="nds-label">LTR</span>
                                </button>
                            </div>
                        </div>
                        <div class="demo-container">
                            <div dir="rtl" lang="ar">
                                <p>للاستفسار اتصل على <span class="nds-label nds-ltr">+966 11 456 7890</span></p>
                                <p>تابع طلبك على <span class="nds-label nds-ltr">nds.gov.sa/track?id=4417</span></p>
                            </div>
                        </div>
                        <div class="demo-code">
                            <div class="nds-tabs nds-code nds-divided">
                                <div class="nds-tab-list-container nds-scroll-more">
                                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                            aria-controls="panel-helpers-ltr-1" id="tab-helpers-ltr-1">
                                            <span class="nds-tab-label">HTML</span>
                                        </button>
                                    </nav>
                                    <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="nds-tab-content">
                                    <div class="nds-tab-panel code-example" role="tabpanel" id="panel-helpers-ltr-1"
                                        aria-labelledby="tab-helpers-ltr-1">
                                        <div class="nds-code-action">
                                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                                <i class="nds-icon nds-hgi-copy-01"></i>
                                            </button>
                                        </div>
                                        <code class="lang-html code">
&lt;div dir="rtl" lang="ar"&gt;
  &lt;p&gt;للاستفسار اتصل على &lt;span class="nds-label nds-ltr"&gt;+966 11 456 7890&lt;/span&gt;&lt;/p&gt;
  &lt;p&gt;تابع طلبك على &lt;span class="nds-label nds-ltr"&gt;nds.gov.sa/track?id=4417&lt;/span&gt;&lt;/p&gt;
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
</section>

<!-- Brand Text Color -->
<section id="helpersColor" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Brand Text Color</h2>
            <p class="nds-section-description">Paints any element in the brand text color. Links already carry it through <code class="nds-inline-code lang-html">nds-color</code>, so this covers the non-link cases: a figure in a summary line, a term in a list, an emphasized word.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-showcase">
                    <div class="nds-demo-card">
                        <div class="demo-header">
                            <div class="demo-action">
                                <button class="nds-btn nds-subtle demo-toggle-btn" data-state="selected"
                                    data-toggler='["nds-color-primary", ".nds-demo", "helperColor"]'>
                                    <span class="nds-label">Brand color</span>
                                </button>
                            </div>
                        </div>
                        <div class="demo-container">
                            <p>Your request is <span class="nds-label nds-demo nds-color-primary">under review</span> and moves to the next stage within two working days.</p>
                        </div>
                        <div class="demo-code">
                            <div class="nds-tabs nds-code nds-divided">
                                <div class="nds-tab-list-container nds-scroll-more">
                                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                            aria-controls="panel-helpers-color-1" id="tab-helpers-color-1">
                                            <span class="nds-tab-label">HTML</span>
                                        </button>
                                    </nav>
                                    <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="nds-tab-content">
                                    <div class="nds-tab-panel code-example" role="tabpanel" id="panel-helpers-color-1"
                                        aria-labelledby="tab-helpers-color-1">
                                        <div class="nds-code-action">
                                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                                <i class="nds-icon nds-hgi-copy-01"></i>
                                            </button>
                                        </div>
                                        <code class="lang-html code">
&lt;p&gt;Your request is &lt;span class="nds-label nds-color-primary"&gt;under review&lt;/span&gt; and moves to the next stage within two working days.&lt;/p&gt;
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

<!-- Note -->
<section id="helpersNote" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Note</h2>
            <p class="nds-section-description">A short line of secondary text: the required-fields explainer above a form, a fee disclaimer, a footnote under a table, or a hint beside a label. Add a status to tint it.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-showcase">
                    <div class="nds-demo-card">
                        <div class="demo-header">
                            <div class="demo-action">
                                <div class="nds-dropmenu demo-toggle-menu">
                                    <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                        <span class="nds-label">Error</span>
                                    </button>
                                    <div class="nds-dropmenu-menu" hidden>
                                        <div class="nds-dropmenu-scroll">
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='["", ".nds-demo", "noteStatus"]'>
                                                <span class="nds-label">Default</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                                data-toggler='["data-status=error", ".nds-demo", "noteStatus", "attr"]'>
                                                <span class="nds-label">Error</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='["data-status=warning", ".nds-demo", "noteStatus", "attr"]'>
                                                <span class="nds-label">Warning</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='["data-status=success", ".nds-demo", "noteStatus", "attr"]'>
                                                <span class="nds-label">Success</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='["data-status=info", ".nds-demo", "noteStatus", "attr"]'>
                                                <span class="nds-label">Info</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="demo-container">
                            <form class="nds-form">
                                <p class="nds-note nds-demo" data-status="error">* Required information</p>
                                <div class="nds-form-container" data-required>
                                    <div class="nds-form-header">
                                        <label for="helpers-national-id">
                                            <span class="nds-label">National ID</span>
                                        </label>
                                    </div>
                                    <div class="nds-form-control">
                                        <input type="text" id="helpers-national-id" class="nds-input" placeholder="10 digits" required>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="demo-code">
                            <div class="nds-tabs nds-code nds-divided">
                                <div class="nds-tab-list-container nds-scroll-more">
                                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                            aria-controls="panel-helpers-note-1" id="tab-helpers-note-1">
                                            <span class="nds-tab-label">HTML</span>
                                        </button>
                                    </nav>
                                    <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="nds-tab-content">
                                    <div class="nds-tab-panel code-example" role="tabpanel" id="panel-helpers-note-1"
                                        aria-labelledby="tab-helpers-note-1">
                                        <div class="nds-code-action">
                                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                                <i class="nds-icon nds-hgi-copy-01"></i>
                                            </button>
                                        </div>
                                        <code class="lang-html code">
&lt;form class="nds-form"&gt;
  &lt;p class="nds-note" data-status="error"&gt;* Required information&lt;/p&gt;
  &lt;div class="nds-form-container" data-required&gt;
    &lt;div class="nds-form-header"&gt;
      &lt;label for="national-id"&gt;
        &lt;span class="nds-label"&gt;National ID&lt;/span&gt;
      &lt;/label&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-control"&gt;
      &lt;input type="text" id="national-id" class="nds-input" placeholder="10 digits" required&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/form&gt;
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

<!-- Built-in Features -->
<section id="helpersFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-text-align-center"></i>
                            <span class="nds-label">Direction-Safe Centering</span>
                        </span>
                        <p class="nds-item-desc">Centering uses logical spacing, so the same class behaves identically in Arabic and English pages.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-alert-circle"></i>
                            <span class="nds-label">Four Note Statuses</span>
                        </span>
                        <p class="nds-item-desc">A note takes an error, warning, success, or info status, tinted from the same tokens the rest of the system uses.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-eraser"></i>
                            <span class="nds-label">One-Class Reset</span>
                        </span>
                        <p class="nds-item-desc">Padding, margin, border, and radius clear together, so an embedded component stops fighting your own frame.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-language-skill"></i>
                            <span class="nds-label">Isolated LTR Content</span>
                        </span>
                        <p class="nds-item-desc">Numbers, codes, and URLs read correctly inside Arabic text without changing the page direction.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-colors"></i>
                            <span class="nds-label">Theme-Aware Color</span>
                        </span>
                        <p class="nds-item-desc">Brand text reads from the same token as the rest of the system, so it re-tints in dark mode and under a custom palette.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-flash"></i>
                            <span class="nds-label">No JavaScript</span>
                        </span>
                        <p class="nds-item-desc">Every class here is CSS only. Nothing to initialize, and nothing added to your page weight.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="helpersGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block nds-prose">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Reach for these in <strong>your own markup</strong>: a wrapper you wrote, a custom panel, a one-off layout. Component appearance is controlled by that component's own modifier classes</li>
                    <li>Use <code class="nds-inline-code lang-html">nds-center</code> when a block needs both its text centered and the block itself centered in its parent. It sets the inline margins as well as the text alignment</li>
                    <li>Use <code class="nds-inline-code lang-html">nds-ltr</code> for any left-to-right value inside Arabic text: phone numbers, IBANs, tracking codes, email addresses, URLs. Without it, punctuation and signs jump to the wrong end</li>
                    <li>There is no matching class for the other direction. For content that is genuinely right-to-left inside a left-to-right page, write <code class="nds-inline-code lang-html">dir="rtl"</code> with <code class="nds-inline-code lang-html">lang</code> on the element. The attributes tell browsers, screen readers, and translation tools what the content is, which a class cannot</li>
                    <li>Use <code class="nds-inline-code lang-html">nds-flush</code> when you place a component inside a container that already provides padding and a border, such as a card inside your own bordered panel</li>
                    <li>Do not use <code class="nds-inline-code lang-html">nds-flush</code> to make small spacing corrections. It clears four properties at once with high priority, which makes later adjustments harder. Set the component's own spacing property instead</li>
                    <li>Do not build a layout from these classes. Use <a class="nds-color" href="{{ 'layout/flex' | relative_url }}">Flex</a> for one-dimensional arrangements and <a class="nds-color" href="{{ 'layout/grid' | relative_url }}">Grid</a> for columns that respond to width</li>
                    <li>There are no margin or padding classes on purpose. For spacing, set <code class="nds-inline-code lang-html">--gap</code> on the flex or grid container that holds the items, or apply a value from the <a class="nds-color" href="{{ 'components/tokens' | relative_url }}">spacing token</a> ladder in your own CSS. Spacing belongs to the container, not to a class on every child</li>
                    <li>Prefer a single <code class="nds-inline-code lang-html">nds-center</code> on a wrapper over the same class repeated on every child. Text alignment inherits</li>
                    <li>Keep a required-fields note to one line above the first field. Marking each input is the job of <code class="nds-inline-code lang-html">data-required</code> on the field container</li>
                    <li>Use <code class="nds-inline-code lang-html">nds-note</code> for plain secondary text. When the message needs an icon, a border, or a dismiss action, use <a class="nds-color" href="{{ 'components/feedback-icons' | relative_url }}">Feedback</a> or <a class="nds-color" href="{{ 'components/alert' | relative_url }}">Alert</a> instead</li>
                    <li>For hiding an element at one screen size, use the <a class="nds-color" href="{{ 'utilities/hidden' | relative_url }}">Hidden</a> utility. For clipping long text, use <a class="nds-color" href="{{ 'utilities/truncate-text' | relative_url }}">Truncate Text</a></li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Class Reference</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Class</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">nds-center</code></td><td>Centers the text inside the element and the element itself within its parent, at every screen width</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-flush</code></td><td>Clears padding, margin, border, and corner radius</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-ltr</code></td><td>Forces left-to-right direction on the element and everything inside it</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-color-primary</code></td><td>Applies the brand text color to any element, including non-link content</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-note</code></td><td>Small secondary-colored line of text. Carries no spacing of its own, so it is safe beside a label</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-note</code> + <code class="nds-inline-code lang-html">data-status</code></td><td>Tints the note. Values: <code class="nds-inline-code lang-html">error</code>, <code class="nds-inline-code lang-html">warning</code>, <code class="nds-inline-code lang-html">success</code>, <code class="nds-inline-code lang-html">info</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-required-notice</code></td><td>Legacy alias for <code class="nds-inline-code lang-html">nds-note</code> with the error status, plus bottom spacing. Prefer the two together on new pages</td></tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</section>
