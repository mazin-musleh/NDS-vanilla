---
layout: page
title: Content Switcher
hero_title: Content Switcher - National Design System
hero_description: Content switcher allows users to toggle between different content sections within the same space on the screen
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.6.0"
updated: "1.6.0"
last_edit: "29/07/2026 - 09:08 PM"
---

<!-- Standard -->
<section id="switcherStandard" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Standard</h2>
            <p class="nds-section-description">The default strip. Reach for it when the choices are few, short, and equal in weight, and you want the current one to read at a glance.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block nds-prose">
                <div class="nds-showcase">
                    <div class="nds-demo-card">
                        <div class="demo-header">
                            <div class="demo-action">
                                <div class="nds-dropmenu demo-toggle-menu">
                                    <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Size: ">
                                        <span class="nds-label">Size: Medium</span>
                                    </button>
                                    <div class="nds-dropmenu-menu" hidden>
                                        <div class="nds-dropmenu-scroll">
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='["nds-sm", ".nds-content-switcher", "switcherSize"]'>
                                                <span class="nds-label">Small (32px)</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                                data-toggler='["", ".nds-content-switcher", "switcherSize"]'>
                                                <span class="nds-label">Medium (40px)</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='["nds-lg", ".nds-content-switcher", "switcherSize"]'>
                                                <span class="nds-label">Large (48px)</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button class="nds-btn nds-subtle demo-toggle-btn"
                                    data-toggler='[["nds-oncolor", ".nds-content-switcher", "containerBg"],["dark-bg", ".demo-container", "containerBg"]]'>
                                    <span class="nds-label">On Color</span>
                                </button>
                                <button class="nds-btn nds-subtle demo-toggle-btn"
                                    data-toggler='["nds-center", ".nds-tab-list", "switcherAlign"]'>
                                    <span class="nds-label">Center</span>
                                </button>
                                <button class="nds-btn nds-subtle demo-toggle-btn"
                                    data-toggler='["nds-loading", ".nds-content-switcher", "loadingState"]'>
                                    <span class="nds-label">Loading</span>
                                </button>
                                <button class="nds-btn nds-subtle demo-toggle-btn"
                                    data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                    <span class="nds-label">Remove bg</span>
                                </button>
                            </div>
                        </div>
                        <div class="demo-container">
                            <div class="state-demo">
                                <div class="nds-tabs nds-content-switcher" id="switcher-standard-1">
                                    <div class="nds-tab-list" role="tablist" aria-label="Request status">
                                        <button class="nds-btn nds-secondary nds-tab" type="button" role="tab" aria-selected="true"
                                            aria-controls="panel-switcher-standard-all" id="tab-switcher-standard-all" tabindex="0">
                                            <span class="nds-label">All</span>
                                        </button>
                                        <button class="nds-btn nds-secondary nds-tab" type="button" role="tab" aria-selected="false"
                                            aria-controls="panel-switcher-standard-review" id="tab-switcher-standard-review" tabindex="-1">
                                            <span class="nds-label">In Review</span>
                                        </button>
                                        <button class="nds-btn nds-secondary nds-tab" type="button" role="tab" aria-selected="false"
                                            aria-controls="panel-switcher-standard-done" id="tab-switcher-standard-done" tabindex="-1">
                                            <span class="nds-label">Completed</span>
                                        </button>
                                        <button class="nds-btn nds-secondary nds-tab" type="button" role="tab" aria-selected="false"
                                            aria-controls="panel-switcher-standard-archived" id="tab-switcher-standard-archived" tabindex="-1">
                                            <span class="nds-label">Archived</span>
                                        </button>
                                    </div>
                                    <div class="nds-tab-content">
                                        <div class="nds-tab-panel" role="tabpanel" id="panel-switcher-standard-all"
                                            aria-labelledby="tab-switcher-standard-all" tabindex="0">
                                            <p>Every request, unfiltered. Start here when you are scanning for anything that needs attention.</p>
                                        </div>
                                        <div class="nds-tab-panel" role="tabpanel" id="panel-switcher-standard-review"
                                            aria-labelledby="tab-switcher-standard-review" tabindex="-1" aria-hidden="true" hidden>
                                            <p>Requests still sitting with the reviewing authority. No action is required from you yet.</p>
                                        </div>
                                        <div class="nds-tab-panel" role="tabpanel" id="panel-switcher-standard-done"
                                            aria-labelledby="tab-switcher-standard-done" tabindex="-1" aria-hidden="true" hidden>
                                            <p>Requests that have been decided. The outcome and the decision date are on each record.</p>
                                        </div>
                                        <div class="nds-tab-panel" role="tabpanel" id="panel-switcher-standard-archived"
                                            aria-labelledby="tab-switcher-standard-archived" tabindex="-1" aria-hidden="true" hidden>
                                            <p>Requests closed more than a year ago, kept for reference and excluded from the other views.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="demo-code">
                            <div class="nds-tabs nds-code nds-divided">
                                <div class="nds-tab-list-container nds-scroll-more">
                                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                            aria-controls="panel-switcher-standard-code" id="tab-switcher-standard-code">
                                            <span class="nds-tab-label">HTML</span>
                                        </button>
                                    </nav>
                                    <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="nds-tab-content">
                                    <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-switcher-standard-code"
                                        aria-labelledby="tab-switcher-standard-code">
                                        <div class="nds-code-action">
                                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                                <i class="nds-icon nds-hgi-copy-01"></i>
                                            </button>
                                        </div>
                                        <div class="nds-expandable-content">
                                            <code class="lang-html code">
&lt;div class="nds-tabs nds-content-switcher" id="switcher-standard-1"&gt;
  &lt;div class="nds-tab-list" role="tablist" aria-label="Request status"&gt;
    &lt;button class="nds-btn nds-secondary nds-tab" type="button" role="tab" aria-selected="true"
      aria-controls="panel-switcher-standard-all" id="tab-switcher-standard-all" tabindex="0"&gt;
      &lt;span class="nds-label"&gt;All&lt;/span&gt;
    &lt;/button&gt;
    &lt;button class="nds-btn nds-secondary nds-tab" type="button" role="tab" aria-selected="false"
      aria-controls="panel-switcher-standard-review" id="tab-switcher-standard-review" tabindex="-1"&gt;
      &lt;span class="nds-label"&gt;In Review&lt;/span&gt;
    &lt;/button&gt;
    &lt;button class="nds-btn nds-secondary nds-tab" type="button" role="tab" aria-selected="false"
      aria-controls="panel-switcher-standard-done" id="tab-switcher-standard-done" tabindex="-1"&gt;
      &lt;span class="nds-label"&gt;Completed&lt;/span&gt;
    &lt;/button&gt;
    &lt;button class="nds-btn nds-secondary nds-tab" type="button" role="tab" aria-selected="false"
      aria-controls="panel-switcher-standard-archived" id="tab-switcher-standard-archived" tabindex="-1"&gt;
      &lt;span class="nds-label"&gt;Archived&lt;/span&gt;
    &lt;/button&gt;
  &lt;/div&gt;
  &lt;div class="nds-tab-content"&gt;
    &lt;div class="nds-tab-panel" role="tabpanel" id="panel-switcher-standard-all"
      aria-labelledby="tab-switcher-standard-all" tabindex="0"&gt;
      &lt;p&gt;Every request, unfiltered. Start here when you are scanning for anything that needs attention.&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class="nds-tab-panel" role="tabpanel" id="panel-switcher-standard-review"
      aria-labelledby="tab-switcher-standard-review" tabindex="-1" aria-hidden="true" hidden&gt;
      &lt;p&gt;Requests still sitting with the reviewing authority. No action is required from you yet.&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class="nds-tab-panel" role="tabpanel" id="panel-switcher-standard-done"
      aria-labelledby="tab-switcher-standard-done" tabindex="-1" aria-hidden="true" hidden&gt;
      &lt;p&gt;Requests that have been decided. The outcome and the decision date are on each record.&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class="nds-tab-panel" role="tabpanel" id="panel-switcher-standard-archived"
      aria-labelledby="tab-switcher-standard-archived" tabindex="-1" aria-hidden="true" hidden&gt;
      &lt;p&gt;Requests closed more than a year ago, kept for reference and excluded from the other views.&lt;/p&gt;
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
    </div>
</section>

<!-- Built-in Features -->
<section id="switcherFeatures" class="nds-content-section nds-demo-section">
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
                        <p class="nds-item-desc">Activates on any switcher in the page. No setup call, no configuration object.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-exchange-01"></i>
                            <span class="nds-label">Panel Switching</span>
                        </span>
                        <p class="nds-item-desc">Picking a segment reveals its panel and hides the rest, and fires an event you can listen for.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-keyboard"></i>
                            <span class="nds-label">Keyboard Navigation</span>
                        </span>
                        <p class="nds-item-desc">Arrow keys walk the strip, Home and End jump to the ends, Enter or Space commits the choice.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-square-arrow-expand-01"></i>
                            <span class="nds-label">Three Size Steps</span>
                        </span>
                        <p class="nds-item-desc">32, 40, and 48px strips, with label size, inline padding, and corner radius all following the step.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-moon-02"></i>
                            <span class="nds-label">Dark Surface Support</span>
                        </span>
                        <p class="nds-item-desc">The current segment turns brand green on dark backgrounds, in dark mode automatically or in light mode with one class.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-text-align-right"></i>
                            <span class="nds-label">RTL Aware</span>
                        </span>
                        <p class="nds-item-desc">Rounded ends, seams, and arrow-key direction all mirror with text direction. No extra markup.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-loading-03"></i>
                            <span class="nds-label">Loading Skeleton</span>
                        </span>
                        <p class="nds-item-desc">Labels render as animated bars while data is in flight, and before the component's own script arrives.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-api"></i>
                            <span class="nds-label">Programmatic Control</span>
                        </span>
                        <p class="nds-item-desc">Read or change the current segment from script, and re-scan the page after injecting new markup.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="switcherGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block nds-prose">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use a content switcher for <strong>two to four short, equal-weight views</strong> of the same subject: a date range, a status filter, a chart granularity</li>
                    <li>Use it when the current choice must stay obvious at a glance. The solid fill reads faster than an underline across a dense page</li>
                    <li>Do not use it for page-level navigation between unrelated areas. Use <a class="nds-color" href="{{ 'components/tabs' | relative_url }}">Tabs</a>, which handle longer labels, icons, vertical layouts, and overflow scrolling</li>
                    <li>Do not use it as a form input. Segments are tabs, not controls: no <code class="nds-inline-code lang-html">name</code>, no <code class="nds-inline-code lang-html">value</code>, nothing submitted. For a bounded choice inside a form use <a class="nds-color" href="{{ 'components/radio' | relative_url }}">Radio</a>, which looks different but is the only NDS control that submits a single choice</li>
                    <li>Do not use it as a toolbar of actions. Segments select a view, they do not run commands. Use a plain <a class="nds-color" href="{{ 'components/button' | relative_url }}">Button</a> group for that</li>
                    <li>Keep labels to one or two words. The strip does not scroll, so long labels either crowd the row or push it past its container</li>
                    <li>Keep the segment count stable. A strip whose options come and go is a filter, not a switcher</li>
                    <li>Pick the size from the surrounding density: <code class="nds-inline-code lang-html">nds-sm</code> inside cards and toolbars, the default in page content, <code class="nds-inline-code lang-html">nds-lg</code> for touch-first layouts</li>
                    <li>Mark the starting segment in your HTML with <code class="nds-inline-code lang-html">aria-selected="true"</code> and give its panel no <code class="nds-inline-code lang-html">hidden</code> attribute, so the correct view paints before scripts run</li>
                    <li>Every segment needs a panel. A switcher with no panels does not initialize; for a panel-free view toggle use a button group and handle clicks yourself</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Class</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">nds-content-switcher</code></td><td>Co-class on the <code class="nds-inline-code lang-html">.nds-tabs</code> root. Turns the tab strip into a segmented control</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-center</code></td><td>On <code class="nds-inline-code lang-html">.nds-tab-list</code>. Centers the strip in its row instead of aligning it to the inline start</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-oncolor</code></td><td>On the root. Applies the dark-surface palette in light mode, for a strip placed on a dark or brand-filled panel</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-sm</code></td><td>On the root. 32px segments with the small type step and a tighter corner radius</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-lg</code></td><td>On the root. 48px segments. The unmodified default is 40px, so the middle step needs no class</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-loading</code></td><td>On the root or the strip. Renders labels as animated bars. Equivalent to <code class="nds-inline-code lang-html">data-state="loading"</code></td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">aria-selected="true"</code></td><td>Set on one segment to mark the starting choice. Its panel must not carry <code class="nds-inline-code lang-html">hidden</code>. Every other segment takes <code class="nds-inline-code lang-html">aria-selected="false"</code> and <code class="nds-inline-code lang-html">tabindex="-1"</code>, and its panel takes <code class="nds-inline-code lang-html">hidden</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">aria-controls</code></td><td>Set on each segment to the <code class="nds-inline-code lang-html">id</code> of its panel. Panels pair back with <code class="nds-inline-code lang-html">aria-labelledby</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-state="loading"</code></td><td>Set on the root or the strip to show the skeleton while data loads. Equivalent to the <code class="nds-inline-code lang-html">nds-loading</code> class</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-nds-tabs-initialized</code></td><td>Stamped on the root by JS once wired. Until it lands the skeleton paints, so the strip is never bare</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--btn-group-radius</code></td><td><code class="nds-inline-code lang-html">var(--radius-md)</code></td><td>Corner radius of the strip's outer ends. Set on <code class="nds-inline-code lang-html">.nds-tab-list</code>. Drops to <code class="nds-inline-code lang-html">var(--radius-sm)</code> at <code class="nds-inline-code lang-html">nds-sm</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--btn-size</code></td><td><code class="nds-inline-code lang-html">40px</code></td><td>Segment height. Set on <code class="nds-inline-code lang-html">.nds-tab</code> for a size between the three steps</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--tab-button-padding-inline</code></td><td>the button's own padding</td><td>Horizontal padding inside each segment. Tracks the size step unless you override it</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--tab-panel-padding</code></td><td><code class="nds-inline-code lang-html">var(--spacing-2xl)</code></td><td>Padding around panel content. Axial <code class="nds-inline-code lang-html">--tab-panel-padding-inline</code> and <code class="nds-inline-code lang-html">--tab-panel-padding-block</code> override one side each</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block nds-prose">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The switcher is driven by <strong>NDS.Tabs</strong>, the same controller behind <a class="nds-color" href="{{ 'components/tabs' | relative_url }}">Tabs</a>. It wires itself on page load. Call <strong>NDS.Tabs.reinit()</strong> after injecting a switcher into the page.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript">
// ── Reach the instance ───────────────────────────────
// Parked on the root element once initialized
const switcher = document.querySelector('#switcher-standard-1').ndsTabs;

// ── Read the current segment ─────────────────────────
switcher.getActiveTabIndex();   // 0-based index
switcher.getActiveTab();        // the segment button element
switcher.getActivePanel();      // the visible panel element

// ── Change the current segment ───────────────────────
switcher.switchTo(2);           // reveals the third panel, fires nds:tab:change

// ── Listen for changes ───────────────────────────────
// Bubbles from the root, so one listener can cover several switchers
document.querySelector('#switcher-standard-1').addEventListener('nds:tab:change', (e) =&gt; {
    e.detail.tabIndex;        // index of the new segment
    e.detail.tab;             // the new segment button
    e.detail.panel;           // the newly visible panel
    e.detail.previousTab;     // the segment being left
    e.detail.previousPanel;   // the panel being hidden
});

// ── Re-scan after injecting markup ───────────────────
// Skips switchers that are already wired
NDS.Tabs.reinit();

// ── Tear down ────────────────────────────────────────
// Removes listeners and the init stamp, leaving markup in place
switcher.destroy();
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
