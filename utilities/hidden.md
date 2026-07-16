---
layout: page
title: Hidden
hero_title: Hidden - National Design System
hero_description: CSS-only visibility utilities that honor the native hidden attribute over any display value and hide elements inside exact viewport ranges with data-hidden
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.4.0"
updated: "1.4.0"
last_edit: "15/07/2026 - 11:03 PM"
---

<!-- Native hidden attribute -->
<section id="hiddenAttribute" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">The hidden Attribute</h2>
            <p class="nds-section-description">The native <code class="nds-inline-code lang-html">hidden</code> attribute is guaranteed to work on any NDS element, even ones styled with flex or grid display. The markup below ships four tags, and the one carrying <code class="nds-inline-code lang-html">hidden</code> never renders</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Four tags in the markup, three rendered</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo" style="display: flex; flex-wrap: wrap; gap: var(--spacing-md); align-items: center;">
                            <span class="nds-tag" data-status="success"><span class="nds-label">Active</span></span>
                            <span class="nds-tag" data-status="info"><span class="nds-label">Beta</span></span>
                            <span class="nds-tag" data-status="error" hidden><span class="nds-label">Deprecated</span></span>
                            <span class="nds-tag nds-gray"><span class="nds-label">Archived</span></span>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                        aria-controls="panel-hidden-attr-1" id="tab-hidden-attr-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-hidden-attr-1"
                                    aria-labelledby="tab-hidden-attr-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;span class="nds-tag" data-status="success"&gt;&lt;span class="nds-label"&gt;Active&lt;/span&gt;&lt;/span&gt;
&lt;span class="nds-tag" data-status="info"&gt;&lt;span class="nds-label"&gt;Beta&lt;/span&gt;&lt;/span&gt;
&lt;span class="nds-tag" data-status="error" hidden&gt;&lt;span class="nds-label"&gt;Deprecated&lt;/span&gt;&lt;/span&gt;
&lt;span class="nds-tag nds-gray"&gt;&lt;span class="nds-label"&gt;Archived&lt;/span&gt;&lt;/span&gt;
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

<!-- Band-exact responsive hiding -->
<section id="hiddenBands" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Responsive Hiding with data-hidden</h2>
            <p class="nds-section-description">Stamp <code class="nds-inline-code lang-html">data-hidden</code> on any element to hide it only inside a named viewport range: <code class="nds-inline-code lang-html">mobile</code> (600px and below), <code class="nds-inline-code lang-html">tablet</code> (601 to 960px), <code class="nds-inline-code lang-html">desktop</code> (961 to 1280px). Space-separate tokens to span ranges. Resize the window to watch each tag drop out of its own band</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Each tag names the range where it hides</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo" style="display: flex; flex-wrap: wrap; gap: var(--spacing-md); align-items: center;">
                            <span class="nds-tag" data-status="error" data-hidden="mobile"><span class="nds-label">mobile</span></span>
                            <span class="nds-tag" data-status="warning" data-hidden="tablet"><span class="nds-label">tablet</span></span>
                            <span class="nds-tag" data-status="info" data-hidden="desktop"><span class="nds-label">desktop</span></span>
                            <span class="nds-tag" data-status="neutral" data-hidden="mobile tablet"><span class="nds-label">mobile tablet</span></span>
                            <span class="nds-tag" data-status="success"><span class="nds-label">always visible</span></span>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                        aria-controls="panel-hidden-bands-1" id="tab-hidden-bands-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-hidden-bands-1"
                                    aria-labelledby="tab-hidden-bands-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;span class="nds-tag" data-status="error" data-hidden="mobile"&gt;&lt;span class="nds-label"&gt;mobile&lt;/span&gt;&lt;/span&gt;
&lt;span class="nds-tag" data-status="warning" data-hidden="tablet"&gt;&lt;span class="nds-label"&gt;tablet&lt;/span&gt;&lt;/span&gt;
&lt;span class="nds-tag" data-status="info" data-hidden="desktop"&gt;&lt;span class="nds-label"&gt;desktop&lt;/span&gt;&lt;/span&gt;
&lt;span class="nds-tag" data-status="neutral" data-hidden="mobile tablet"&gt;&lt;span class="nds-label"&gt;mobile tablet&lt;/span&gt;&lt;/span&gt;
&lt;span class="nds-tag" data-status="success"&gt;&lt;span class="nds-label"&gt;always visible&lt;/span&gt;&lt;/span&gt;
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

<!-- Screen-reader preserved hiding -->
<section id="hiddenSr" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Keep It Readable to Screen Readers</h2>
            <p class="nds-section-description">Add the <code class="nds-inline-code lang-html">sr</code> token to any <code class="nds-inline-code lang-html">data-hidden</code> value and the element is hidden visually but stays in the accessibility tree. Use it on button labels that collapse to icon-only, so the control never loses its accessible name. Resize below 600px: the label disappears, the button keeps its width padding, and screen readers still announce "Search"</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Label collapses on mobile, name survives</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <button class="nds-btn nds-neutral" type="button">
                                <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                                <span class="nds-label" data-hidden="mobile sr">Search</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                        aria-controls="panel-hidden-sr-1" id="tab-hidden-sr-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-hidden-sr-1"
                                    aria-labelledby="tab-hidden-sr-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;button class="nds-btn nds-neutral" type="button"&gt;
  &lt;i class="nds-icon nds-hgi-search-01" aria-hidden="true"&gt;&lt;/i&gt;
  &lt;span class="nds-label" data-hidden="mobile sr"&gt;Search&lt;/span&gt;
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
<section id="hiddenFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-view-off-slash"></i>
                        <span class="nds-label">Universal hidden Override</span>
                    </span>
                    <p class="nds-item-desc">Elements with the hidden attribute stay hidden even when a flex, grid, or utility display rule targets them.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-smart-phone-01"></i>
                        <span class="nds-label">Band-Exact Breakpoints</span>
                    </span>
                    <p class="nds-item-desc">Each data-hidden token hides an element only inside its own range, so a tablet-only gap never leaks into mobile.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-puzzle"></i>
                        <span class="nds-label">Composable Ranges</span>
                    </span>
                    <p class="nds-item-desc">Space-separate tokens to span ranges, like data-hidden="mobile tablet" for everything below the desktop breakpoint.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-ear"></i>
                        <span class="nds-label">Screen-Reader Preservation</span>
                    </span>
                    <p class="nds-item-desc">The sr token hides an element visually while assistive technology keeps announcing it, so icon-only collapses never lose their name.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="hiddenGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use the <code class="nds-inline-code lang-html">hidden</code> attribute for state your JS toggles (panels, menus, wizard steps). It wins over any display value, so no extra CSS is needed</li>
                    <li>Use <code class="nds-inline-code lang-html">data-hidden</code> for chrome that has no place at some widths (topbar widgets, secondary metadata) instead of writing one-off media queries</li>
                    <li>Think of the split as: <code class="nds-inline-code lang-html">hidden</code> is state ("not right now"), <code class="nds-inline-code lang-html">data-hidden</code> is viewport ("not at this width"). Both can sit on one element, and either condition hides it</li>
                    <li>Combine tokens to span ranges: <code class="nds-inline-code lang-html">data-hidden="mobile tablet"</code> hides up to 960px, <code class="nds-inline-code lang-html">data-hidden="tablet desktop"</code> keeps an element for mobile and very wide screens only</li>
                    <li><code class="nds-inline-code lang-html">data-hidden="desktop"</code> covers 961 to 1280px, so the element shows again on wider screens. There is no token for widths above 1280px</li>
                    <li>The <code class="nds-inline-code lang-html">hidden</code> attribute and plain <code class="nds-inline-code lang-html">data-hidden</code> remove content from screen readers too. When assistive technology should still announce it, add the <code class="nds-inline-code lang-html">sr</code> token: <code class="nds-inline-code lang-html">data-hidden="mobile sr"</code></li>
                    <li>Hiding a label with <code class="nds-inline-code lang-html">sr</code> does not restyle the control: a button keeps its text padding rather than becoming a square icon button. Sizing stays the component's job</li>
                    <li>Do not hide primary actions on small screens. Collapse them into a <a class="nds-color" href="{{ 'components/dropmenu' | relative_url }}">Dropmenu</a> so the capability stays reachable</li>
                    <li>Hidden elements still download their images and iframes. Remove heavy content from the markup rather than hiding it</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">hidden</code></td><td>Native attribute, any element. Removes it from rendering and assistive technology, and wins over any display value</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-hidden</code></td><td>Band-exact responsive hiding. Tokens: <code class="nds-inline-code lang-html">mobile</code> (600px and below), <code class="nds-inline-code lang-html">tablet</code> (601 to 960px), <code class="nds-inline-code lang-html">desktop</code> (961 to 1280px). Space-separate to combine. Add <code class="nds-inline-code lang-html">sr</code> to hide visually but keep the element readable to screen readers</td></tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</section>
