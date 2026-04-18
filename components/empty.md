---
layout: page
title: Empty
hero_title: Empty - National Design System
hero_description: A drop-in placeholder that fills empty containers with an icon and a localized message, adapting its markup to match the parent element.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Generic Container -->
<section id="emptyOverview" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Generic Container</h2>
            <p class="nds-section-description">Add <code class="nds-inline-code lang-html">nds-empty</code> to any block element. When it has no child elements, the placeholder renders centered inside.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Empty Div</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-empty" style="min-height: 280px; border: 1px dashed var(--divider-color); border-radius: var(--radius-md);"></div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-empty-generic-1" id="tab-empty-generic-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-empty-generic-1"
                                    aria-labelledby="tab-empty-generic-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;div class="nds-empty"&gt;&lt;/div&gt;
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

<!-- Lists -->
<section id="emptyLists" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">In Lists</h2>
            <p class="nds-section-description">On <code class="nds-inline-code lang-html">&lt;ul&gt;</code> and <code class="nds-inline-code lang-html">&lt;ol&gt;</code> elements the placeholder is injected as an <code class="nds-inline-code lang-html">&lt;li&gt;</code> so the list structure stays valid.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Empty Unordered List</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <ul class="nds-empty" style="min-height: 280px; border: 1px dashed var(--divider-color); border-radius: var(--radius-md); margin: 0; padding: 0;"></ul>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-empty-list-1" id="tab-empty-list-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-empty-list-1"
                                    aria-labelledby="tab-empty-list-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;ul class="nds-empty"&gt;&lt;/ul&gt;
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

<!-- Tables -->
<section id="emptyTables" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">In Tables</h2>
            <p class="nds-section-description">Place <code class="nds-inline-code lang-html">nds-empty</code> on the <code class="nds-inline-code lang-html">&lt;table&gt;</code> itself. The placeholder row spans every column using <code class="nds-inline-code lang-html">colspan</code> derived from the header, and a <code class="nds-inline-code lang-html">&lt;tbody&gt;</code> is created automatically when one is missing.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Empty Table</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <table class="nds-empty nds-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Status</th>
                                        <th>Updated</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-empty-table-1" id="tab-empty-table-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-empty-table-1"
                                    aria-labelledby="tab-empty-table-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;table class="nds-empty nds-table"&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th&gt;Name&lt;/th&gt;
      &lt;th&gt;Status&lt;/th&gt;
      &lt;th&gt;Updated&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
&lt;/table&gt;
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

<!-- Customization -->
<section id="emptyCustom" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Custom Message &amp; Icon</h2>
            <p class="nds-section-description">Override the default text with <code class="nds-inline-code lang-html">data-empty-message</code> and the default glyph with <code class="nds-inline-code lang-html">data-empty-icon</code>. Either attribute updates its rendered element in place when the value changes at runtime.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Notifications Empty</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-empty"
                                data-empty-message="You have no new notifications"
                                data-empty-icon="hgi hgi-stroke hgi-notification-off-01"
                                style="min-height: 280px; border: 1px dashed var(--divider-color); border-radius: var(--radius-md);"></div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-empty-custom-1" id="tab-empty-custom-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-empty-custom-1"
                                    aria-labelledby="tab-empty-custom-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;div class="nds-empty"
     data-empty-message="You have no new notifications"
     data-empty-icon="hgi hgi-stroke hgi-notification-off-01"&gt;&lt;/div&gt;
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

<!-- Live Content Updates -->
<section id="emptyDynamic" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Live Content Updates</h2>
            <p class="nds-section-description">The placeholder reacts automatically to DOM changes. Adding a real child hides it; removing the last real child brings it back. No manual refresh needed.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Reactive List</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo" style="display: flex; flex-direction: column; gap: var(--spacing-lg); padding: var(--spacing-xl); align-items: stretch;">
                            <ul id="empty-demo-live-list" class="nds-empty" style="min-height: 240px; border: 1px dashed var(--divider-color); border-radius: var(--radius-md); margin: 0; padding: 0; list-style: none;"></ul>
                            <div style="display: flex; gap: var(--spacing-md); justify-content: center;">
                                <button class="nds-btn nds-primary nds-sm" type="button" data-empty-demo-action="add">
                                    <span class="nds-label">Add item</span>
                                </button>
                                <button class="nds-btn nds-secondary-outline nds-sm" type="button" data-empty-demo-action="remove">
                                    <span class="nds-label">Remove item</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-empty-dynamic-1" id="tab-empty-dynamic-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-empty-dynamic-js" id="tab-empty-dynamic-js">
                                        <span class="nds-tab-label">JS</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-empty-dynamic-1"
                                    aria-labelledby="tab-empty-dynamic-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;ul id="reactive-list" class="nds-empty"&gt;&lt;/ul&gt;
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-empty-dynamic-js"
                                    aria-labelledby="tab-empty-dynamic-js" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-javascript code">const list = document.getElementById('reactive-list');

// Add a real child. The empty placeholder disappears automatically.
const li = document.createElement('li');
li.textContent = 'New item';
list.appendChild(li);

// Remove the real child. The placeholder comes back on its own.
li.remove();</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <script>
                    (() => {
                        const list = document.getElementById('empty-demo-live-list');
                        if (!list) return;
                        let counter = 0;
                        document.querySelectorAll('[data-empty-demo-action]').forEach(btn => {
                            btn.addEventListener('click', () => {
                                if (btn.dataset.emptyDemoAction === 'add') {
                                    const li = document.createElement('li');
                                    li.textContent = `Item ${++counter}`;
                                    li.style.padding = 'var(--spacing-md) var(--spacing-lg)';
                                    li.style.borderBottom = '1px solid var(--divider-color)';
                                    list.appendChild(li);
                                } else {
                                    const real = [...list.children].filter(c => !c.hasAttribute('data-nds-empty-placeholder'));
                                    real[real.length - 1]?.remove();
                                }
                            });
                        });
                    })();
                </script>
            </div>
        </div>
    </div>
</section>

<!-- Built-in Features -->
<section id="emptyFeatures" class="nds-content-section">
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
                    <p class="nds-item-desc">Activates on any element with <code class="nds-inline-code lang-html">nds-empty</code>. New containers added to the DOM later are picked up automatically.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-layers-01"></i>
                        <span class="nds-label">Parent-Adaptive Markup</span>
                    </span>
                    <p class="nds-item-desc">Injects a valid child for the parent tag: <code class="nds-inline-code lang-html">&lt;li&gt;</code> in lists, a spanning <code class="nds-inline-code lang-html">&lt;tr&gt;</code> with <code class="nds-inline-code lang-html">&lt;td colspan&gt;</code> in tables, a <code class="nds-inline-code lang-html">&lt;div&gt;</code> elsewhere.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-translation"></i>
                        <span class="nds-label">Bilingual Defaults</span>
                    </span>
                    <p class="nds-item-desc">Renders Arabic or English text based on the page <code class="nds-inline-code lang-html">lang</code> attribute with no configuration.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-pulse-01"></i>
                        <span class="nds-label">Live Reactivity</span>
                    </span>
                    <p class="nds-item-desc">Placeholder appears when the container becomes empty and disappears the moment real content is added back.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-edit-02"></i>
                        <span class="nds-label">Custom Message Override</span>
                    </span>
                    <p class="nds-item-desc">Set <code class="nds-inline-code lang-html">data-empty-message</code> on the container to replace the default text. Updates live when the attribute changes.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-api"></i>
                        <span class="nds-label">Programmatic Control</span>
                    </span>
                    <p class="nds-item-desc">Call <code class="nds-inline-code lang-js">NDS.Empty.refresh(el)</code> to force re-evaluation of a specific container from application code.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="emptyGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-content-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use <strong>nds-empty</strong> on any container that can legitimately have zero items: search results, filtered lists, data tables, notification feeds, dashboards, user-generated collections</li>
                    <li>Prefer <strong>nds-empty</strong> over a hand-rolled placeholder so all empty states across the site look and behave consistently</li>
                    <li>Do not use it for loading or in-progress states. Use the <a class="nds-color" href="{{ 'components/loading' | relative_url }}">Loading</a> component while data is being fetched, then let <strong>nds-empty</strong> take over once the request resolves with no results</li>
                    <li>Do not use it to communicate errors. Use an <a class="nds-color" href="{{ 'components/alert' | relative_url }}">Alert</a> with <code class="nds-inline-code lang-html">data-status="error"</code> so the user understands something went wrong rather than that the result set is genuinely empty</li>
                    <li>Write <strong>data-empty-message</strong> so it answers "why is this empty and what can I do next?" For example, "No results match your search" beats "Empty" because it implies the user can adjust the query</li>
                    <li>Keep custom messages to a single short sentence. Longer guidance belongs in a paragraph outside the container or in linked help content</li>
                    <li>Make sure the container has enough height for the placeholder to breathe. A minimum height of roughly 240 to 320 pixels keeps the icon and message visually centered</li>
                    <li>Do not mix <strong>nds-empty</strong> with conditionally rendered "no results" markup in the same container. Pick one so the placeholder never appears twice</li>
                    <li>When a table column count changes after initial render, call <code class="nds-inline-code lang-js">NDS.Empty.refresh(el)</code> so the placeholder row picks up the new <code class="nds-inline-code lang-html">colspan</code></li>
                </ul>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-empty-message</code></td>
                            <td>Set on the <code class="nds-inline-code lang-html">.nds-empty</code> container to override the default text. Any non-empty string wins over the built-in Arabic or English default. Changing the value at runtime updates the rendered message in place.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-empty-icon</code></td>
                            <td>Set on the <code class="nds-inline-code lang-html">.nds-empty</code> container to override the default icon. Value is the full <code class="nds-inline-code lang-html">class</code> string applied to the placeholder's <code class="nds-inline-code lang-html">&lt;i&gt;</code>. Use any icon system: UI icon (<code class="nds-inline-code lang-html">nds-icon nds-hgi-search-01</code>) or content-font icon (<code class="nds-inline-code lang-html">hgi hgi-stroke hgi-notification-off-01</code>). Changing the value at runtime updates the rendered icon in place.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDS.Empty</strong> API auto-initializes at page load and watches the DOM for new <code class="nds-inline-code lang-html">.nds-empty</code> containers. Use <strong>NDS.Empty.refresh()</strong> when you need to force re-evaluation after an external DOM operation the observer cannot see (for example, a column-count change on a table).</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// ── Initialization ───────────────────────────────────
// The loader calls this automatically at page load.
// Call again if you add .nds-empty containers via innerHTML before
// the DOM observer has a chance to pick them up.
NDS.Empty.init();

// ── Force re-evaluation of a single container ────────
// Usage: after changing a table's column count, adding/removing
// placeholder-relevant state, or any programmatic change the
// childList observer does not surface.
const table = document.querySelector('#my-table');
NDS.Empty.refresh(table);

// ── Localization ─────────────────────────────────────
// Default message language is picked from &lt;html lang="..."&gt;
// via NDS.isArabic. To override for a single instance, set
// data-empty-message on the element itself.
//
//   &lt;div class="nds-empty" data-empty-message="No items yet"&gt;&lt;/div&gt;
//
// Changing data-empty-message at runtime updates the rendered
// placeholder automatically:
container.setAttribute('data-empty-message', 'Try a different filter');
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
