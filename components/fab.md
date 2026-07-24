---
layout: page
title: Floating Action Button
hero_title: Floating Action Button - National Design System
hero_description: Pins to a bottom corner of the viewport for a primary or persistent action, stacking with others in the same corner and, when it opens a panel, following that panel to its edge.
breadcrumb: [["Components", "/components"]]
since: "1.4.x"
updated: "1.4.x"
last_edit: "24/07/2026 - 08:10 PM"
lang: en
direction: ltr
---

<!-- Single FAB -->
<section id="fabOverview" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Floating Action Button</h2>
            <p class="nds-section-description">Mark any button <code class="nds-inline-code lang-html">nds-fab</code> and give it a corner with <code class="nds-inline-code lang-html">data-fab-pos</code>. It lifts out of the document to a fixed dock in that corner; buttons sharing a corner stack automatically, ordered by <code class="nds-inline-code lang-html">data-fab-order</code>. No dock element to author.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Corner: ">
                                    <span class="nds-label">Corner: End</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["data-fab-pos=end", ".nds-demo", "fabPos", "attr"]'>
                                            <span class="nds-label">End</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-fab-pos=start", ".nds-demo", "fabPos", "attr"]'>
                                            <span class="nds-label">Start</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-fab-pos=left", ".nds-demo", "fabPos", "attr"]'>
                                            <span class="nds-label">Left</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-fab-pos=right", ".nds-demo", "fabPos", "attr"]'>
                                            <span class="nds-label">Right</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-fab-pos=center", ".nds-demo", "fabPos", "attr"]'>
                                            <span class="nds-label">Center</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Variant: ">
                                    <span class="nds-label">Variant: Primary</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-primary", ".nds-demo", "fabVariant"]'>
                                            <span class="nds-label">Primary</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-neutral", ".nds-demo", "fabVariant"]'>
                                            <span class="nds-label">Neutral</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-secondary", ".nds-demo", "fabVariant"]'>
                                            <span class="nds-label">Secondary</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-secondary-outline", ".nds-demo", "fabVariant"]'>
                                            <span class="nds-label">Secondary Outline</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-subtle", ".nds-demo", "fabVariant"]'>
                                            <span class="nds-label">Subtle</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Size: ">
                                    <span class="nds-label">Size: LG</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-demo", "fabSize"]'>
                                            <span class="nds-label">LG</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-md", ".nds-demo", "fabSize"]'>
                                            <span class="nds-label">MD</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-demo", "fabSize"]'>
                                            <span class="nds-label">SM</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn" data-state="selected"
                                data-toggler='["nds-circle", ".nds-demo", "fabCircle"]'>
                                <span class="nds-label">Circle</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-fab-thumb", ".nds-demo", "fabThumb"]'>
                                <span class="nds-label">Thumb</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo" style="flex-direction: column; gap: var(--spacing-lg); padding: var(--spacing-2xl);">
                            <div style="display: flex; gap: var(--spacing-md);">
                                <button class="nds-btn nds-primary nds-lg demo-action-btn" type="button" data-action="fab-add">
                                    <i class="hgi hgi-stroke hgi-plus-sign"></i>
                                    <span class="nds-label">Add FAB</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-lg demo-action-btn" type="button" data-action="fab-clear">
                                    <span class="nds-label">Clear all</span>
                                </button>
                            </div>
                            <span class="nds-feedback nds-sm nds-outline" data-status="neutral">
                                <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
                                Pick a corner above, then add one — it lands at the real viewport corner. Click a FAB to remove it
                            </span>
                            <!-- The toggles above mutate this; the button clones it. Kept out of
                                 sight because a FAB only reads right at a corner, and it stays
                                 off .nds-fab so routing leaves it here. -->
                            <button class="nds-btn nds-primary nds-circle nds-icon-only nds-demo" type="button"
                                data-fab-pos="end" aria-label="Compose" hidden>
                                <i class="hgi hgi-stroke hgi-plus-sign"></i>
                            </button>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                        aria-controls="panel-fab-single-html" id="tab-fab-single-html">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="false"
                                        aria-controls="panel-fab-single-js" id="tab-fab-single-js">
                                        <span class="nds-tab-label">JS API</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-fab-single-html"
                                    aria-labelledby="tab-fab-single-html">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;button class="nds-btn nds-fab nds-primary nds-circle nds-icon-only" type="button"
        data-fab-pos="end" aria-label="Compose" hidden&gt;
  &lt;i class="hgi hgi-stroke hgi-plus-sign"&gt;&lt;/i&gt;
&lt;/button&gt;

                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-fab-single-js"
                                    aria-labelledby="tab-fab-single-js" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-javascript">
// Route a FAB built at runtime — what the demo button above does
const fab = document.createElement('button');
fab.className = 'nds-btn nds-fab nds-primary nds-circle nds-icon-only';
fab.setAttribute('aria-label', 'Compose');
fab.innerHTML = '&lt;i class="hgi hgi-stroke hgi-plus-sign"&gt;&lt;/i&gt;';

NDS.Fab.register(fab, 'end');   // 'left' | 'right' | 'center' | 'start' | 'end' | 'auto'
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

<!-- Grouped FAB -->
<section id="fabGroup" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Grouped FAB</h2>
            <p class="nds-section-description">A FAB can be a container, not only a button. Mark an <code class="nds-inline-code lang-html">nds-btn-group</code> and its actions travel and stack as a single dock item, at the buttons' own size and variant — add <code class="nds-inline-code lang-html">nds-vertical</code> to run it down the corner instead of across.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Corner: ">
                                    <span class="nds-label">Corner: End</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["data-fab-pos=end", ".nds-demo", "grpPos", "attr"]'>
                                            <span class="nds-label">End</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-fab-pos=start", ".nds-demo", "grpPos", "attr"]'>
                                            <span class="nds-label">Start</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-fab-pos=left", ".nds-demo", "grpPos", "attr"]'>
                                            <span class="nds-label">Left</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-fab-pos=right", ".nds-demo", "grpPos", "attr"]'>
                                            <span class="nds-label">Right</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-fab-pos=center", ".nds-demo", "grpPos", "attr"]'>
                                            <span class="nds-label">Center</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Variant: ">
                                    <span class="nds-label">Variant: Subtle</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-primary", ".nds-demo .nds-btn", "grpVariant"]'>
                                            <span class="nds-label">Primary</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-neutral", ".nds-demo .nds-btn", "grpVariant"]'>
                                            <span class="nds-label">Neutral</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-secondary", ".nds-demo .nds-btn", "grpVariant"]'>
                                            <span class="nds-label">Secondary</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-secondary-outline", ".nds-demo .nds-btn", "grpVariant"]'>
                                            <span class="nds-label">Secondary Outline</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-subtle", ".nds-demo .nds-btn", "grpVariant"]'>
                                            <span class="nds-label">Subtle</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Size: ">
                                    <span class="nds-label">Size: LG</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-demo .nds-btn", "grpSize"]'>
                                            <span class="nds-label">LG</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-md", ".nds-demo .nds-btn", "grpSize"]'>
                                            <span class="nds-label">MD</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-demo .nds-btn", "grpSize"]'>
                                            <span class="nds-label">SM</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn" data-state="selected"
                                data-toggler='["nds-vertical", ".nds-demo", "grpAxis"]'>
                                <span class="nds-label">Vertical</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-fab-thumb", ".nds-demo", "grpThumb"]'>
                                <span class="nds-label">Thumb</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo" style="flex-direction: column; gap: var(--spacing-lg); padding: var(--spacing-2xl);">
                            <div style="display: flex; gap: var(--spacing-md);">
                                <button class="nds-btn nds-primary nds-lg demo-action-btn" type="button" data-action="fab-add">
                                    <i class="hgi hgi-stroke hgi-plus-sign"></i>
                                    <span class="nds-label">Add group</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-lg demo-action-btn" type="button" data-action="fab-clear">
                                    <span class="nds-label">Clear all</span>
                                </button>
                            </div>
                            <span class="nds-feedback nds-sm nds-outline" data-status="neutral">
                                <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
                                The whole group is one dock item, so it stacks as one. Click it to remove it
                            </span>
                            <div class="nds-btn-group nds-vertical nds-demo" data-fab-pos="end" hidden>
                                <button class="nds-btn nds-subtle nds-icon-only" type="button" aria-label="Share"><i class="hgi hgi-stroke hgi-share-01"></i></button>
                                <button class="nds-btn nds-subtle nds-icon-only" type="button" aria-label="Copy link"><i class="hgi hgi-stroke hgi-link-01"></i></button>
                                <button class="nds-btn nds-subtle nds-icon-only" type="button" aria-label="Email"><i class="hgi hgi-stroke hgi-mail-01"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                        aria-controls="panel-fab-group-html" id="tab-fab-group-html">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="false"
                                        aria-controls="panel-fab-group-js" id="tab-fab-group-js">
                                        <span class="nds-tab-label">JS API</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-fab-group-html"
                                    aria-labelledby="tab-fab-group-html">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;div class="nds-fab nds-btn-group nds-vertical" data-fab-pos="end" hidden&gt;
  &lt;button class="nds-btn nds-subtle nds-icon-only" type="button" aria-label="Share"&gt;
    &lt;i class="hgi hgi-stroke hgi-share-01"&gt;&lt;/i&gt;
  &lt;/button&gt;
  &lt;button class="nds-btn nds-subtle nds-icon-only" type="button" aria-label="Copy link"&gt;
    &lt;i class="hgi hgi-stroke hgi-link-01"&gt;&lt;/i&gt;
  &lt;/button&gt;
  &lt;button class="nds-btn nds-subtle nds-icon-only" type="button" aria-label="Email"&gt;
    &lt;i class="hgi hgi-stroke hgi-mail-01"&gt;&lt;/i&gt;
  &lt;/button&gt;
&lt;/div&gt;
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-fab-group-js"
                                    aria-labelledby="tab-fab-group-js" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-javascript">
// register() takes a CONTAINER as readily as a button — the whole
// group routes as one dock item, exactly like the demo above
const fab = document.createElement('div');
fab.className = 'nds-fab nds-btn-group nds-vertical';
fab.innerHTML = `
  &lt;button class="nds-btn nds-subtle nds-icon-only" type="button" aria-label="Share"&gt;
    &lt;i class="hgi hgi-stroke hgi-share-01"&gt;&lt;/i&gt;
  &lt;/button&gt;
  &lt;button class="nds-btn nds-subtle nds-icon-only" type="button" aria-label="Email"&gt;
    &lt;i class="hgi hgi-stroke hgi-mail-01"&gt;&lt;/i&gt;
  &lt;/button&gt;`;

NDS.Fab.register(fab, 'end');   // 'left' | 'right' | 'center' | 'start' | 'end' | 'auto'
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
<section id="fabFeatures" class="nds-content-section nds-demo-section">
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
                    <p class="nds-item-desc">Every .nds-fab is routed to its corner on load. Nothing to call, no dock element to author.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-maximize-screen"></i>
                        <span class="nds-label">Two Corner Docks</span>
                    </span>
                    <p class="nds-item-desc">FABs resolve to one of two fixed bottom corners (plus an optional center), so logical and physical positions never overlap.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-arrow-all-direction"></i>
                        <span class="nds-label">Direction-Aware Routing</span>
                    </span>
                    <p class="nds-item-desc">Logical start and end resolve by text direction, and a runtime direction flip re-routes them; physical left and right stay put.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-target-02"></i>
                        <span class="nds-label">Panel Following</span>
                    </span>
                    <p class="nds-item-desc">An auto FAB lands in the corner of the panel it toggles, so the trigger sits where the panel slides in from.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-layers-01"></i>
                        <span class="nds-label">Automatic Stacking</span>
                    </span>
                    <p class="nds-item-desc">FABs sharing a corner stack in a column, ordered by data-fab-order, with the lowest sitting closest to the corner.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-transition-left"></i>
                        <span class="nds-label">Page-End Tuck</span>
                    </span>
                    <p class="nds-item-desc">Near the bottom of a scrollable page each dock slides out to its edge so a fixed FAB never covers footer content.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-drag-drop"></i>
                        <span class="nds-label">Mixed Shapes and Sizes</span>
                    </span>
                    <p class="nds-item-desc">Circles, edge thumbs, and multi-button groups share a corner without being resized; each keeps its own size and shape.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-api"></i>
                        <span class="nds-label">Programmatic Control</span>
                    </span>
                    <p class="nds-item-desc">Register a FAB built at runtime, or by another component, straight into its corner through the JS API.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="fabGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use a <strong>FAB</strong> for one primary or persistent action that should stay reachable as the user scrolls: compose, add, open filters, or start a chat</li>
                    <li>Keep FABs few. A corner crowded with actions loses the "primary action" meaning; move secondary actions into a <a class="nds-color" href="{{ 'components/panels' | relative_url }}">Panel</a> the FAB opens</li>
                    <li>Do not use a FAB for an action tied to a specific place in the content. Put an inline <a class="nds-color" href="{{ 'components/button' | relative_url }}">Button</a> next to what it acts on instead</li>
                    <li>Prefer logical <code class="nds-inline-code lang-html">start</code> and <code class="nds-inline-code lang-html">end</code> (or <code class="nds-inline-code lang-html">auto</code>) so the corner follows reading direction. Reserve <code class="nds-inline-code lang-html">left</code> and <code class="nds-inline-code lang-html">right</code> for an action that must stay in the same physical corner in any language</li>
                    <li>Give a FAB that opens a panel <code class="nds-inline-code lang-html">data-fab-pos="auto"</code> so it sits in the same corner the panel slides from</li>
                    <li>Order a stack with <code class="nds-inline-code lang-html">data-fab-order</code>: the lowest number sits closest to the corner. Put the primary action lowest</li>
                    <li>Group related actions (a share cluster, for example) in a single <code class="nds-inline-code lang-html">nds-btn-group nds-vertical</code> so they travel and stack as one item. It is the ordinary button group — do not restyle it for the corner; pick the button variant and size you want and let the group be</li>
                    <li>Add <code class="nds-inline-code lang-html">nds-fab-thumb</code> to a FAB — a button or a whole group — that should sit against the viewport edge. Do not hand-write the squared corners; the dock the FAB lands in decides them, and a hard-coded radius breaks the moment the FAB moves corner</li>
                    <li>Ship each FAB with the <code class="nds-inline-code lang-html">hidden</code> attribute so it never flashes at its authored spot before routing lifts it to the corner</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Class</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">nds-fab</code></td><td>Marks an element (a button or a container) as a FAB. Routing moves it into its corner dock, and it gains a shadow so it reads as detached from the page. On a button it also sets the footprint — <code class="nds-inline-code lang-html">16px</code> larger than the same button inline (<code class="nds-inline-code lang-html">8px</code> on small screens), so every size class still applies: LG 56, MD 48, SM 40. It also gives <code class="nds-inline-code lang-html">nds-secondary-outline</code> and <code class="nds-inline-code lang-html">nds-subtle</code> an opaque fill so page content cannot read through them</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-fab-thumb</code></td><td>Turns a FAB into an edge thumb: it gives up the dock's inset and sits against the viewport edge. The corners on that edge are squared off automatically, picked from the corner the FAB docks in — a logical <code class="nds-inline-code lang-html">start</code>/<code class="nds-inline-code lang-html">end</code> FAB gets the right side in both directions. The centre dock has no side edge, so it meets the bottom edge instead</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-btn-group</code></td><td>Not a FAB class — the <a class="nds-color" href="{{ 'components/button' | relative_url }}">Button</a> group. Mark one <code class="nds-inline-code lang-html">nds-fab</code> and several actions travel and stack as a single dock item, at the buttons' own size and variant. Add <code class="nds-inline-code lang-html">nds-vertical</code> to stack it down a corner instead of across</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-fab-pos</code></td><td>Set on a <code class="nds-inline-code lang-html">.nds-fab</code> to pick its corner. Values: <code class="nds-inline-code lang-html">left</code>, <code class="nds-inline-code lang-html">right</code>, <code class="nds-inline-code lang-html">center</code> (physical, fixed); <code class="nds-inline-code lang-html">start</code>, <code class="nds-inline-code lang-html">end</code> (logical, resolve by direction); <code class="nds-inline-code lang-html">auto</code> (default, follow the toggled panel's side)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-fab-order</code></td><td>Set on a <code class="nds-inline-code lang-html">.nds-fab</code> to order the stack in its corner. Lower numbers sit closer to the corner. Default <code class="nds-inline-code lang-html">0</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-panel-toggle</code></td><td>Set on a FAB to open a <a class="nds-color" href="{{ 'components/panels' | relative_url }}">Panel</a> by <code class="nds-inline-code lang-html">id</code>. With <code class="nds-inline-code lang-html">data-fab-pos="auto"</code>, the FAB follows that panel to its corner</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-fab-dock-pos</code></td><td>Set on a hand-authored <code class="nds-inline-code lang-html">.nds-fab-dock</code> to fix its corner. Docks are usually created automatically, so this is rarely needed</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--fab-dock-offset</code></td><td><code class="nds-inline-code lang-html">calc(--nds-viewport-padding / 2)</code></td><td>Distance from the viewport edges to the dock. Half the page gutter, so it narrows with the page on mobile</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--fab-dock-gap</code></td><td><code class="nds-inline-code lang-html">--spacing-md</code></td><td>Gap between stacked FABs in a corner</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--fab-dock-z</code></td><td><code class="nds-inline-code lang-html">899</code></td><td>Stacking order of the docks, below modals and backdrops</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>Authored <code class="nds-inline-code lang-js">.nds-fab</code> elements route automatically, so most pages never call this API. Use <strong>NDS.Fab.register</strong> for a FAB built at runtime or injected by another component.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// ── Register a FAB built at runtime ──────────────────
// Routes by the element's own data-fab-pos (default auto)
NDS.Fab.register(fabElement);

// ...or force a corner, ignoring its data-fab-pos
NDS.Fab.register(fabElement, 'left');   // 'left' | 'right' | 'center' | 'start' | 'end'

// ── Resolve where a FAB would land ───────────────────
NDS.Fab.resolvePos(fabElement);         // → 'left' | 'right' | 'center'

// ── Find or create a corner dock ─────────────────────
const dock = NDS.Fab.dock('right');     // the .nds-fab-dock at that corner

// ── Re-scan authored FABs (e.g. after injecting HTML) ─
NDS.Fab.init();
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
