---
layout: page
title: Sort
hero_title: Sort - National Design System
hero_description: A DOM-reorder engine for lists, grids, and tables. Pass an accessor, wire your triggers, and NDS.Sort handles type detection, direction cycles, accessibility attributes, and URL persistence.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Direct Mode -->
<section id="sortDirectMode" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Direct Mode</h2>
            <p class="nds-section-description">Each trigger selects a fixed key and direction. An empty key trigger resets to the original order. Use this mode for dropmenu options, pill groups, or any UI where every choice is explicitly labelled.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Sort by name or price</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div id="sortDirectRoot" class="nds-sort-demo-row" style="display: flex; justify-content: flex-end; margin-block-end: var(--spacing-md);">
                                <div class="nds-dropmenu">
                                    <button type="button" class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                        <i class="nds-icon nds-hgi-sorting-05" aria-hidden="true"></i>
                                        <span class="nds-label">Sort</span>
                                    </button>
                                    <div class="nds-dropmenu-menu" hidden>
                                        <div class="nds-dropmenu-scroll">
                                            <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-sort>
                                                <i class="nds-icon nds-hgi-sorting-05" aria-hidden="true"></i>
                                                <span class="nds-label">Default order</span>
                                            </button>
                                            <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-sort="name" data-sort-dir="asc">
                                                <i class="nds-icon nds-hgi-sort-by-up-02" aria-hidden="true"></i>
                                                <span class="nds-label">Name A to Z</span>
                                            </button>
                                            <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-sort="name" data-sort-dir="desc">
                                                <i class="nds-icon nds-hgi-sort-by-down-02" aria-hidden="true"></i>
                                                <span class="nds-label">Name Z to A</span>
                                            </button>
                                            <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-sort="price" data-sort-dir="asc">
                                                <i class="nds-icon nds-hgi-sort-by-up-02" aria-hidden="true"></i>
                                                <span class="nds-label">Price low to high</span>
                                            </button>
                                            <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-sort="price" data-sort-dir="desc">
                                                <i class="nds-icon nds-hgi-sort-by-down-02" aria-hidden="true"></i>
                                                <span class="nds-label">Price high to low</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="sortDirectItems" class="nds-grid" style="--max-col:3;--mid-col:2;--min-col:1;">
                                <div class="nds-card nds-stroke" data-sort-name="Zakat Payment" data-sort-price="75">
                                    <div class="nds-card-content">
                                        <h3 class="nds-card-title">Zakat Payment</h3>
                                        <p class="nds-card-description"><span class="nds-number-format" data-currency="SAR">75</span></p>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke" data-sort-name="Passport Renewal" data-sort-price="300">
                                    <div class="nds-card-content">
                                        <h3 class="nds-card-title">Passport Renewal</h3>
                                        <p class="nds-card-description"><span class="nds-number-format" data-currency="SAR">300</span></p>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke" data-sort-name="Birth Certificate" data-sort-price="25">
                                    <div class="nds-card-content">
                                        <h3 class="nds-card-title">Birth Certificate</h3>
                                        <p class="nds-card-description"><span class="nds-number-format" data-currency="SAR">25</span></p>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke" data-sort-name="Identity Verification" data-sort-price="0">
                                    <div class="nds-card-content">
                                        <h3 class="nds-card-title">Identity Verification</h3>
                                        <p class="nds-card-description"><span class="nds-number-format" data-currency="SAR" data-free>Free</span></p>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke" data-sort-name="Driver License" data-sort-price="150">
                                    <div class="nds-card-content">
                                        <h3 class="nds-card-title">Driver License</h3>
                                        <p class="nds-card-description"><span class="nds-number-format" data-currency="SAR">150</span></p>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke" data-sort-name="Business Registration" data-sort-price="1200">
                                    <div class="nds-card-content">
                                        <h3 class="nds-card-title">Business Registration</h3>
                                        <p class="nds-card-description"><span class="nds-number-format" data-currency="SAR">1200</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-sort-direct-1" id="tab-sort-direct-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false" aria-controls="panel-sort-direct-js" id="tab-sort-direct-js">
                                        <span class="nds-tab-label">JS API</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-sort-direct-1" aria-labelledby="tab-sort-direct-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;div id="sortDirectRoot" class="nds-sort-demo-row"&gt;
  &lt;div class="nds-dropmenu"&gt;
    &lt;button type="button" class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger"&gt;
      &lt;i class="nds-icon nds-hgi-sorting-05" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;span class="nds-label"&gt;Sort&lt;/span&gt;
    &lt;/button&gt;
    &lt;div class="nds-dropmenu-menu" hidden&gt;
      &lt;div class="nds-dropmenu-scroll"&gt;
        &lt;button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-sort&gt;
          &lt;i class="nds-icon nds-hgi-sorting-05" aria-hidden="true"&gt;&lt;/i&gt;
          &lt;span class="nds-label"&gt;Default order&lt;/span&gt;
        &lt;/button&gt;
        &lt;button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-sort="name" data-sort-dir="asc"&gt;
          &lt;i class="nds-icon nds-hgi-sort-by-up-02" aria-hidden="true"&gt;&lt;/i&gt;
          &lt;span class="nds-label"&gt;Name A to Z&lt;/span&gt;
        &lt;/button&gt;
        &lt;button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-sort="name" data-sort-dir="desc"&gt;
          &lt;i class="nds-icon nds-hgi-sort-by-down-02" aria-hidden="true"&gt;&lt;/i&gt;
          &lt;span class="nds-label"&gt;Name Z to A&lt;/span&gt;
        &lt;/button&gt;
        &lt;button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-sort="price" data-sort-dir="asc"&gt;
          &lt;i class="nds-icon nds-hgi-sort-by-up-02" aria-hidden="true"&gt;&lt;/i&gt;
          &lt;span class="nds-label"&gt;Price low to high&lt;/span&gt;
        &lt;/button&gt;
        &lt;button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-sort="price" data-sort-dir="desc"&gt;
          &lt;i class="nds-icon nds-hgi-sort-by-down-02" aria-hidden="true"&gt;&lt;/i&gt;
          &lt;span class="nds-label"&gt;Price high to low&lt;/span&gt;
        &lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;

&lt;div id="sortDirectItems" class="nds-grid"&gt;
  &lt;div class="nds-card nds-stroke" data-sort-name="Zakat Payment" data-sort-price="75"&gt;
    &lt;div class="nds-card-content"&gt;
      &lt;h3 class="nds-card-title"&gt;Zakat Payment&lt;/h3&gt;
      &lt;p class="nds-card-description"&gt;&lt;span class="nds-number-format" data-currency="SAR"&gt;75&lt;/span&gt;&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-card nds-stroke" data-sort-name="Passport Renewal" data-sort-price="300"&gt;
    &lt;div class="nds-card-content"&gt;
      &lt;h3 class="nds-card-title"&gt;Passport Renewal&lt;/h3&gt;
      &lt;p class="nds-card-description"&gt;&lt;span class="nds-number-format" data-currency="SAR"&gt;300&lt;/span&gt;&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-card nds-stroke" data-sort-name="Birth Certificate" data-sort-price="25"&gt;
    &lt;div class="nds-card-content"&gt;
      &lt;h3 class="nds-card-title"&gt;Birth Certificate&lt;/h3&gt;
      &lt;p class="nds-card-description"&gt;&lt;span class="nds-number-format" data-currency="SAR"&gt;25&lt;/span&gt;&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-card nds-stroke" data-sort-name="Identity Verification" data-sort-price="0"&gt;
    &lt;div class="nds-card-content"&gt;
      &lt;h3 class="nds-card-title"&gt;Identity Verification&lt;/h3&gt;
      &lt;p class="nds-card-description"&gt;&lt;span class="nds-number-format" data-currency="SAR" data-free&gt;Free&lt;/span&gt;&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-card nds-stroke" data-sort-name="Driver License" data-sort-price="150"&gt;
    &lt;div class="nds-card-content"&gt;
      &lt;h3 class="nds-card-title"&gt;Driver License&lt;/h3&gt;
      &lt;p class="nds-card-description"&gt;&lt;span class="nds-number-format" data-currency="SAR"&gt;150&lt;/span&gt;&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-card nds-stroke" data-sort-name="Business Registration" data-sort-price="1200"&gt;
    &lt;div class="nds-card-content"&gt;
      &lt;h3 class="nds-card-title"&gt;Business Registration&lt;/h3&gt;
      &lt;p class="nds-card-description"&gt;&lt;span class="nds-number-format" data-currency="SAR"&gt;1200&lt;/span&gt;&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
                                        </code>
                                    </div>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-sort-direct-js" aria-labelledby="tab-sort-direct-js" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-javascript code">NDS.Sort.create(document.getElementById('sortDirectRoot'), {
    items: '#sortDirectItems &gt; .nds-card',
    reorderIn: document.getElementById('sortDirectItems'),
    triggers: '[data-sort]',
    mode: 'direct',
    a11y: 'pressed',
    types: { price: 'number' }
});</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<script>
document.addEventListener('DOMContentLoaded', function () {
    var root = document.getElementById('sortDirectRoot');
    var items = document.getElementById('sortDirectItems');
    if (!root || !items || !window.NDS || !NDS.Sort) return;
    NDS.Sort.create(root, {
        items: function () { return items.querySelectorAll(':scope > .nds-card'); },
        reorderIn: items,
        triggers: '[data-sort]',
        mode: 'direct',
        a11y: 'pressed',
        types: { price: 'number' }
    });
});
</script>

<!-- Cycle Mode -->
<section id="sortCycleMode" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Cycle Mode</h2>
            <p class="nds-section-description">Each trigger owns a single key. The same trigger advances through ascending, descending, and reset across three clicks. Use this mode for column headers, pill bars, or any UI where the trigger itself signals its own sort state.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Click a trigger to cycle asc, desc, reset</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div id="sortCycleRoot" style="display: flex; gap: var(--spacing-sm); margin-block-end: var(--spacing-md);">
                                <button type="button" class="nds-btn nds-secondary-outline nds-sort-cycle-btn" data-sort-key="name">
                                    <span class="nds-label">Name</span>
                                    <i class="nds-icon nds-hgi-sorting-05" aria-hidden="true"></i>
                                </button>
                                <button type="button" class="nds-btn nds-secondary-outline nds-sort-cycle-btn" data-sort-key="price">
                                    <span class="nds-label">Price</span>
                                    <i class="nds-icon nds-hgi-sorting-05" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div id="sortCycleItems" class="nds-grid" style="--max-col:3;--mid-col:2;--min-col:1;">
                                <div class="nds-card nds-stroke" data-sort-name="Zakat Payment" data-sort-price="75">
                                    <div class="nds-card-content">
                                        <h3 class="nds-card-title">Zakat Payment</h3>
                                        <p class="nds-card-description"><span class="nds-number-format" data-currency="SAR">75</span></p>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke" data-sort-name="Passport Renewal" data-sort-price="300">
                                    <div class="nds-card-content">
                                        <h3 class="nds-card-title">Passport Renewal</h3>
                                        <p class="nds-card-description"><span class="nds-number-format" data-currency="SAR">300</span></p>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke" data-sort-name="Birth Certificate" data-sort-price="25">
                                    <div class="nds-card-content">
                                        <h3 class="nds-card-title">Birth Certificate</h3>
                                        <p class="nds-card-description"><span class="nds-number-format" data-currency="SAR">25</span></p>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke" data-sort-name="Identity Verification" data-sort-price="0">
                                    <div class="nds-card-content">
                                        <h3 class="nds-card-title">Identity Verification</h3>
                                        <p class="nds-card-description"><span class="nds-number-format" data-currency="SAR" data-free>Free</span></p>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke" data-sort-name="Driver License" data-sort-price="150">
                                    <div class="nds-card-content">
                                        <h3 class="nds-card-title">Driver License</h3>
                                        <p class="nds-card-description"><span class="nds-number-format" data-currency="SAR">150</span></p>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke" data-sort-name="Business Registration" data-sort-price="1200">
                                    <div class="nds-card-content">
                                        <h3 class="nds-card-title">Business Registration</h3>
                                        <p class="nds-card-description"><span class="nds-number-format" data-currency="SAR">1200</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-sort-cycle-1" id="tab-sort-cycle-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false" aria-controls="panel-sort-cycle-js" id="tab-sort-cycle-js">
                                        <span class="nds-tab-label">JS API</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-sort-cycle-1" aria-labelledby="tab-sort-cycle-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;div id="sortCycleRoot"&gt;
  &lt;button type="button" class="nds-btn nds-secondary-outline nds-sort-cycle-btn" data-sort-key="name"&gt;
    &lt;span class="nds-label"&gt;Name&lt;/span&gt;
    &lt;i class="nds-icon nds-hgi-sorting-05" aria-hidden="true"&gt;&lt;/i&gt;
  &lt;/button&gt;
  &lt;button type="button" class="nds-btn nds-secondary-outline nds-sort-cycle-btn" data-sort-key="price"&gt;
    &lt;span class="nds-label"&gt;Price&lt;/span&gt;
    &lt;i class="nds-icon nds-hgi-sorting-05" aria-hidden="true"&gt;&lt;/i&gt;
  &lt;/button&gt;
&lt;/div&gt;

&lt;div id="sortCycleItems" class="nds-grid"&gt;
  &lt;div class="nds-card nds-stroke" data-sort-name="Zakat Payment" data-sort-price="75"&gt;
    &lt;div class="nds-card-content"&gt;
      &lt;h3 class="nds-card-title"&gt;Zakat Payment&lt;/h3&gt;
      &lt;p class="nds-card-description"&gt;&lt;span class="nds-number-format" data-currency="SAR"&gt;75&lt;/span&gt;&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-card nds-stroke" data-sort-name="Passport Renewal" data-sort-price="300"&gt;
    &lt;div class="nds-card-content"&gt;
      &lt;h3 class="nds-card-title"&gt;Passport Renewal&lt;/h3&gt;
      &lt;p class="nds-card-description"&gt;&lt;span class="nds-number-format" data-currency="SAR"&gt;300&lt;/span&gt;&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-card nds-stroke" data-sort-name="Birth Certificate" data-sort-price="25"&gt;
    &lt;div class="nds-card-content"&gt;
      &lt;h3 class="nds-card-title"&gt;Birth Certificate&lt;/h3&gt;
      &lt;p class="nds-card-description"&gt;&lt;span class="nds-number-format" data-currency="SAR"&gt;25&lt;/span&gt;&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-card nds-stroke" data-sort-name="Identity Verification" data-sort-price="0"&gt;
    &lt;div class="nds-card-content"&gt;
      &lt;h3 class="nds-card-title"&gt;Identity Verification&lt;/h3&gt;
      &lt;p class="nds-card-description"&gt;&lt;span class="nds-number-format" data-currency="SAR" data-free&gt;Free&lt;/span&gt;&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-card nds-stroke" data-sort-name="Driver License" data-sort-price="150"&gt;
    &lt;div class="nds-card-content"&gt;
      &lt;h3 class="nds-card-title"&gt;Driver License&lt;/h3&gt;
      &lt;p class="nds-card-description"&gt;&lt;span class="nds-number-format" data-currency="SAR"&gt;150&lt;/span&gt;&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-card nds-stroke" data-sort-name="Business Registration" data-sort-price="1200"&gt;
    &lt;div class="nds-card-content"&gt;
      &lt;h3 class="nds-card-title"&gt;Business Registration&lt;/h3&gt;
      &lt;p class="nds-card-description"&gt;&lt;span class="nds-number-format" data-currency="SAR"&gt;1200&lt;/span&gt;&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
                                        </code>
                                    </div>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-sort-cycle-js" aria-labelledby="tab-sort-cycle-js" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-javascript code">const root = document.getElementById('sortCycleRoot');

NDS.Sort.create(root, {
    items: '#sortCycleItems &gt; .nds-card',
    reorderIn: document.getElementById('sortCycleItems'),
    triggers: '.nds-sort-cycle-btn',
    mode: 'cycle',
    a11y: 'pressed',
    keyFrom: (btn) =&gt; btn.dataset.sortKey,
    types: { price: 'number' },
    onChange: (state) =&gt; {
        // Swap each cycle-button's icon to reflect its current state.
        root.querySelectorAll('.nds-sort-cycle-btn').forEach((btn) =&gt; {
            const icon = btn.querySelector('i');
            if (!icon) return;
            const isActive = btn.dataset.sortKey === state.key &amp;&amp; state.dir;
            icon.className = !isActive
                ? 'nds-icon nds-hgi-sorting-05'
                : state.dir === 'asc'
                    ? 'nds-icon nds-hgi-sort-by-up-02'
                    : 'nds-icon nds-hgi-sort-by-down-02';
        });
    }
});</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<script>
document.addEventListener('DOMContentLoaded', function () {
    var root = document.getElementById('sortCycleRoot');
    var items = document.getElementById('sortCycleItems');
    if (!root || !items || !window.NDS || !NDS.Sort) return;
    NDS.Sort.create(root, {
        items: function () { return items.querySelectorAll(':scope > .nds-card'); },
        reorderIn: items,
        triggers: '.nds-sort-cycle-btn',
        mode: 'cycle',
        a11y: 'pressed',
        keyFrom: function (btn) { return btn.dataset.sortKey; },
        types: { price: 'number' },
        onChange: function (state) {
            // Swap each cycle-button's icon to reflect its own current state.
            // Inactive → neutral, asc → up, desc → down.
            root.querySelectorAll('.nds-sort-cycle-btn').forEach(function (btn) {
                var icon = btn.querySelector('i');
                if (!icon) return;
                var isActive = btn.dataset.sortKey === state.key && state.dir;
                icon.className = !isActive
                    ? 'nds-icon nds-hgi-sorting-05'
                    : state.dir === 'asc'
                        ? 'nds-icon nds-hgi-sort-by-up-02'
                        : 'nds-icon nds-hgi-sort-by-down-02';
            });
        }
    });
});
</script>

<!-- Table Column Sort -->
<section id="sortTableColumns" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Table Column Sort</h2>
            <p class="nds-section-description">Drop <code>.nds-sort-btn</code> into any <code>&lt;th&gt;</code> and the table wires itself. <a class="nds-color" href="{{ 'components/tables' | relative_url }}">NDS.Tables</a> composes NDS.Sort in cycle mode with a cell-text accessor, so rows sort by whatever text the cell renders. Numbers like <code>2,500 SAR</code> parse numerically, dates like <code>2026-03-15</code> parse chronologically, everything else falls back to locale-aware string compare.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Click any column header to sort</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <table class="nds-table nds-sortable">
                                <thead>
                                    <tr>
                                        <th>
                                            <div class="nds-col-header">
                                                <span class="nds-label">Name</span>
                                                <div class="nds-col-actions">
                                                    <button class="nds-btn nds-subtle nds-sort-btn nds-icon-only" aria-label="Sort by name"><i class="nds-icon nds-hgi-sorting-05 nds-sort-icon" aria-hidden="true"></i></button>
                                                </div>
                                            </div>
                                        </th>
                                        <th>
                                            <div class="nds-col-header">
                                                <span class="nds-label">Amount</span>
                                                <div class="nds-col-actions">
                                                    <button class="nds-btn nds-subtle nds-sort-btn nds-icon-only" aria-label="Sort by amount"><i class="nds-icon nds-hgi-sorting-05 nds-sort-icon" aria-hidden="true"></i></button>
                                                </div>
                                            </div>
                                        </th>
                                        <th>
                                            <div class="nds-col-header">
                                                <span class="nds-label">Status</span>
                                                <div class="nds-col-actions">
                                                    <button class="nds-btn nds-subtle nds-sort-btn nds-icon-only" aria-label="Sort by status"><i class="nds-icon nds-hgi-sorting-05 nds-sort-icon" aria-hidden="true"></i></button>
                                                </div>
                                            </div>
                                        </th>
                                        <th>
                                            <div class="nds-col-header">
                                                <span class="nds-label">Date</span>
                                                <div class="nds-col-actions">
                                                    <button class="nds-btn nds-subtle nds-sort-btn nds-icon-only" aria-label="Sort by date"><i class="nds-icon nds-hgi-sorting-05 nds-sort-icon" aria-hidden="true"></i></button>
                                                </div>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {% for txn in site.data.content.transactions limit: 6 %}
                                    <tr>
                                        <td>{{ txn.name }}</td>
                                        <td><span class="nds-number-format" data-currency="SAR">{{ txn.amount }}</span></td>
                                        <td><span class="nds-tag nds-sm" data-status="{% if txn.status == 'completed' %}success{% elsif txn.status == 'pending' %}warning{% else %}error{% endif %}"><span class="nds-label">{{ txn.status | capitalize }}</span></span></td>
                                        <td>{{ txn.date }}</td>
                                    </tr>
                                    {% endfor %}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-sort-table-1" id="tab-sort-table-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-sort-table-1" aria-labelledby="tab-sort-table-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;table class="nds-table nds-sortable"&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th&gt;
        &lt;div class="nds-col-header"&gt;
          &lt;span class="nds-label"&gt;Name&lt;/span&gt;
          &lt;div class="nds-col-actions"&gt;
            &lt;button class="nds-btn nds-subtle nds-sort-btn nds-icon-only" aria-label="Sort by name"&gt;&lt;i class="nds-icon nds-hgi-sorting-05 nds-sort-icon" aria-hidden="true"&gt;&lt;/i&gt;&lt;/button&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/th&gt;
      &lt;th&gt;
        &lt;div class="nds-col-header"&gt;
          &lt;span class="nds-label"&gt;Amount&lt;/span&gt;
          &lt;div class="nds-col-actions"&gt;
            &lt;button class="nds-btn nds-subtle nds-sort-btn nds-icon-only" aria-label="Sort by amount"&gt;&lt;i class="nds-icon nds-hgi-sorting-05 nds-sort-icon" aria-hidden="true"&gt;&lt;/i&gt;&lt;/button&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/th&gt;
      &lt;th&gt;
        &lt;div class="nds-col-header"&gt;
          &lt;span class="nds-label"&gt;Status&lt;/span&gt;
          &lt;div class="nds-col-actions"&gt;
            &lt;button class="nds-btn nds-subtle nds-sort-btn nds-icon-only" aria-label="Sort by status"&gt;&lt;i class="nds-icon nds-hgi-sorting-05 nds-sort-icon" aria-hidden="true"&gt;&lt;/i&gt;&lt;/button&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/th&gt;
      &lt;th&gt;
        &lt;div class="nds-col-header"&gt;
          &lt;span class="nds-label"&gt;Date&lt;/span&gt;
          &lt;div class="nds-col-actions"&gt;
            &lt;button class="nds-btn nds-subtle nds-sort-btn nds-icon-only" aria-label="Sort by date"&gt;&lt;i class="nds-icon nds-hgi-sorting-05 nds-sort-icon" aria-hidden="true"&gt;&lt;/i&gt;&lt;/button&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;td&gt;Business License Renewal&lt;/td&gt;
      &lt;td&gt;&lt;span class="nds-number-format" data-currency="SAR"&gt;2500&lt;/span&gt;&lt;/td&gt;
      &lt;td&gt;&lt;span class="nds-tag nds-sm" data-status="success"&gt;&lt;span class="nds-label"&gt;Completed&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
      &lt;td&gt;2026-03-15&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;Visa Processing Fee&lt;/td&gt;
      &lt;td&gt;&lt;span class="nds-number-format" data-currency="SAR"&gt;800&lt;/span&gt;&lt;/td&gt;
      &lt;td&gt;&lt;span class="nds-tag nds-sm" data-status="warning"&gt;&lt;span class="nds-label"&gt;Pending&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
      &lt;td&gt;2026-03-14&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;Property Transfer Tax&lt;/td&gt;
      &lt;td&gt;&lt;span class="nds-number-format" data-currency="SAR"&gt;15000&lt;/span&gt;&lt;/td&gt;
      &lt;td&gt;&lt;span class="nds-tag nds-sm" data-status="success"&gt;&lt;span class="nds-label"&gt;Completed&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
      &lt;td&gt;2026-03-12&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;Vehicle Registration Fee&lt;/td&gt;
      &lt;td&gt;&lt;span class="nds-number-format" data-currency="SAR"&gt;450&lt;/span&gt;&lt;/td&gt;
      &lt;td&gt;&lt;span class="nds-tag nds-sm" data-status="success"&gt;&lt;span class="nds-label"&gt;Completed&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
      &lt;td&gt;2026-03-10&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;Building Permit Application&lt;/td&gt;
      &lt;td&gt;&lt;span class="nds-number-format" data-currency="SAR"&gt;3200&lt;/span&gt;&lt;/td&gt;
      &lt;td&gt;&lt;span class="nds-tag nds-sm" data-status="error"&gt;&lt;span class="nds-label"&gt;Failed&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
      &lt;td&gt;2026-03-08&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;Health Insurance Premium&lt;/td&gt;
      &lt;td&gt;&lt;span class="nds-number-format" data-currency="SAR"&gt;1800&lt;/span&gt;&lt;/td&gt;
      &lt;td&gt;&lt;span class="nds-tag nds-sm" data-status="success"&gt;&lt;span class="nds-label"&gt;Completed&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
      &lt;td&gt;2026-03-06&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
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
    </div>
</section>

<!-- Built-in Features -->
<section id="sortFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-plug-socket"></i>
                        <span class="nds-label">Zero-wire from Filter and Tables</span>
                    </span>
                    <p class="nds-item-desc">Wraps automatically when you use <a class="nds-color" href="{{ 'components/filter' | relative_url }}">Filter</a> with <code class="nds-inline-code lang-html">[data-sort]</code> buttons or <a class="nds-color" href="{{ 'components/tables' | relative_url }}">Tables</a> with <code class="nds-inline-code lang-html">.nds-sort-btn</code> headers. Compose directly with <code class="nds-inline-code lang-js">NDS.Sort.create()</code> for custom widgets.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-arrow-data-transfer-vertical"></i>
                        <span class="nds-label">Type Auto-detect</span>
                    </span>
                    <p class="nds-item-desc">Samples values at sort time. Formatted numbers like <code class="nds-inline-code lang-html">"9,375 SAR"</code> sort numerically. <code class="nds-inline-code lang-html">DD/MM/YYYY</code>, <code class="nds-inline-code lang-html">YYYY-MM-DD</code>, and ISO 8601 sort chronologically. Everything else compares with <code class="nds-inline-code lang-js">localeCompare</code>, so Arabic and numeric strings order correctly.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-toggle-on"></i>
                        <span class="nds-label">Direct and Cycle Modes</span>
                    </span>
                    <p class="nds-item-desc">Direct mode pairs each trigger with a fixed key and direction, matching dropmenu option lists. Cycle mode advances one trigger through ascending, descending, and reset, matching column headers.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-link-circle-02"></i>
                        <span class="nds-label">URL Persistence</span>
                    </span>
                    <p class="nds-item-desc">Opt in with <code class="nds-inline-code lang-js">urlSync: { keyParam, dirParam }</code> and the current sort rides the query string. The default ascending direction is omitted to keep URLs tidy, other params are preserved, and history is replaced rather than pushed.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-keyboard"></i>
                        <span class="nds-label">Keyboard and ARIA</span>
                    </span>
                    <p class="nds-item-desc">Triggers respond to Enter and Space. Direct mode writes <code class="nds-inline-code lang-html">aria-pressed</code> on the active trigger. Cycle mode writes <code class="nds-inline-code lang-html">aria-sort</code> on the target element (the column header by default), flipping between ascending, descending, and none.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-api"></i>
                        <span class="nds-label">Programmatic Control</span>
                    </span>
                    <p class="nds-item-desc">Call <code class="nds-inline-code lang-js">sort.apply(key, dir)</code>, <code class="nds-inline-code lang-js">sort.reset()</code>, <code class="nds-inline-code lang-js">sort.getState()</code>, and <code class="nds-inline-code lang-js">sort.destroy()</code> on the instance returned from <code class="nds-inline-code lang-js">create()</code>. Subscribe to <code class="nds-inline-code lang-js">nds:sort:change</code> on the root for every reorder.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="sortGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Reach for <strong>NDS.Sort</strong> directly only when the host widget is neither a <a class="nds-color" href="{{ 'components/filter' | relative_url }}">Filter</a> nor a <a class="nds-color" href="{{ 'components/tables' | relative_url }}">Tables</a>. Both of those wire the engine for you, and duplicating wiring causes double-init.</li>
                    <li>Pick <strong>direct mode</strong> when every sort choice is explicitly labelled (dropmenus, pill groups, radio bars). Include a reset option with an empty <code class="nds-inline-code lang-html">data-sort</code> attribute so users can return to the original order.</li>
                    <li>Pick <strong>cycle mode</strong> when a single trigger carries the state for one key (column headers, inline toggles). Users expect three clicks to return them to where they started.</li>
                    <li>Keep <strong>accessor</strong> functions pure and cheap. They run once per item per sort, plus once per sample value for type detection. If values need formatting, compute the raw value in the accessor and let <code class="nds-inline-code lang-js">NDS.Sort</code> handle comparison.</li>
                    <li>Separate <strong>display text</strong> from the <strong>sortable value</strong> when they diverge. A card that reads <em>Free</em> but carries <code class="nds-inline-code lang-html">data-sort-price="0"</code> sorts as the cheapest item without the comparator ever seeing the string. Same pattern for <em>N/A</em>, <em>Just now</em>, localized numbers, or any label that would break numeric/date sorting.</li>
                    <li>Override type detection with the <code class="nds-inline-code lang-js">types</code> option when sample values are ambiguous (e.g. zip codes, phone numbers, IDs that look like numbers but must sort as strings).</li>
                    <li>Enable <code class="nds-inline-code lang-js">urlSync</code> for list pages where users share links or refresh mid-task. Skip it for transient widgets where persistence would feel sticky.</li>
                    <li>Use <code class="nds-inline-code lang-js">initialState</code> when the server renders pre-sorted markup. NDS.Sort will honour it without reordering, so aria attributes match the DOM immediately.</li>
                    <li>Hook consumer-specific side effects (pagination refresh, CSS state flags, analytics) through <code class="nds-inline-code lang-js">onChange</code>. Avoid listening to <code class="nds-inline-code lang-js">nds:sort:change</code> for side effects on the same component: <code class="nds-inline-code lang-js">onChange</code> fires synchronously before the event and keeps logic co-located with the <code class="nds-inline-code lang-js">create()</code> call.</li>
                    <li>Call <code class="nds-inline-code lang-js">sort.destroy()</code> in single-page app teardown. The AbortController drops every click and keydown listener in one step.</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Options</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Option</th><th>Type</th><th>Default</th><th>Purpose</th></tr></thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-js">items</code></td>
                            <td>selector, NodeList, Array, or function</td>
                            <td>none (required)</td>
                            <td>The elements to reorder. Pass a function to re-resolve on every sort for live item sets.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">reorderIn</code></td>
                            <td>Element</td>
                            <td><code class="nds-inline-code lang-js">items[0].parentElement</code></td>
                            <td>The parent to re-append items into. Override when items live in a container different from the root.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">triggers</code></td>
                            <td>selector, NodeList, Array, or function</td>
                            <td>none (required)</td>
                            <td>The clickable elements that drive sorting.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">accessor</code></td>
                            <td><code class="nds-inline-code lang-js">(item, key) =&gt; value</code></td>
                            <td><code class="nds-inline-code lang-js">(i, k) =&gt; i.getAttribute('data-sort-' + k)</code></td>
                            <td>Returns the raw sortable value for an item under a given key.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">keyFrom</code></td>
                            <td><code class="nds-inline-code lang-js">(trigger) =&gt; key</code></td>
                            <td><code class="nds-inline-code lang-js">(t) =&gt; t.getAttribute('data-sort') || ''</code></td>
                            <td>Maps a trigger element to its sort key. Return an empty string or null for a reset trigger.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">mode</code></td>
                            <td><code class="nds-inline-code lang-js">'direct'</code> or <code class="nds-inline-code lang-js">'cycle'</code></td>
                            <td><code class="nds-inline-code lang-js">'direct'</code></td>
                            <td>Trigger behaviour model.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">a11y</code></td>
                            <td><code class="nds-inline-code lang-js">'pressed'</code>, <code class="nds-inline-code lang-js">'sort'</code>, or <code class="nds-inline-code lang-js">'none'</code></td>
                            <td><code class="nds-inline-code lang-js">'pressed'</code></td>
                            <td>Which accessibility attribute to write. <code class="nds-inline-code lang-js">'pressed'</code> for toggle-like triggers, <code class="nds-inline-code lang-js">'sort'</code> for table columns, <code class="nds-inline-code lang-js">'none'</code> to suppress.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">a11yTarget</code></td>
                            <td><code class="nds-inline-code lang-js">(trigger) =&gt; Element</code></td>
                            <td><code class="nds-inline-code lang-js">(t) =&gt; t.closest('th')</code></td>
                            <td>The element that carries <code class="nds-inline-code lang-html">aria-sort</code> when <code class="nds-inline-code lang-js">a11y: 'sort'</code>.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">types</code></td>
                            <td>object</td>
                            <td><code class="nds-inline-code lang-js">{}</code></td>
                            <td>Per-key overrides for auto-detection. Values: <code class="nds-inline-code lang-js">'number'</code>, <code class="nds-inline-code lang-js">'date'</code>, <code class="nds-inline-code lang-js">'string'</code>.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">initialState</code></td>
                            <td><code class="nds-inline-code lang-js">{ key, dir }</code> or null</td>
                            <td>null</td>
                            <td>Seeds state without reordering. Use when HTML is already sorted by the server.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">urlSync</code></td>
                            <td><code class="nds-inline-code lang-js">{ keyParam, dirParam }</code> or false</td>
                            <td>false</td>
                            <td>Persists state in the query string. Reads on create, writes on every change, ascending direction is omitted.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">onChange</code></td>
                            <td><code class="nds-inline-code lang-js">({ key, dir, orderedItems, state }) =&gt; void</code></td>
                            <td>none</td>
                            <td>Called synchronously after every apply, before the <code class="nds-inline-code lang-js">nds:sort:change</code> event fires.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Events</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Event</th><th>Detail</th><th>Fires when</th></tr></thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-js">nds:sort:change</code></td>
                            <td><code class="nds-inline-code lang-js">{ key, dir, orderedItems, sort }</code></td>
                            <td>After every reorder, including programmatic <code class="nds-inline-code lang-js">apply()</code> and <code class="nds-inline-code lang-js">reset()</code>. Bubbles from the root.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDS.Sort</strong> API exposes a factory plus pure helpers. Consumers of Filter and Tables rarely need to call it directly: the widget wires itself on page load. Call <strong>NDS.Sort.create()</strong> only for custom widgets.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// ── Create an instance ───────────────────────────────
// Returns the NDSSort instance; re-creating on the same root returns the existing one.
const sort = NDS.Sort.create(rootElement, {
    items: '#myList &gt; .row',      // selector, NodeList, Array, or () =&gt; NodeList
    reorderIn: myListEl,          // optional; defaults to items[0].parentElement
    triggers: '.sort-btn',        // selector, NodeList, Array, or () =&gt; NodeList
    mode: 'direct',               // 'direct' | 'cycle'
    a11y: 'pressed',              // 'pressed' | 'sort' | 'none'
    a11yTarget: (t) =&gt; t.closest('th'),   // only used when a11y === 'sort'
    accessor: (item, key) =&gt; item.getAttribute('data-sort-' + key),
    keyFrom: (trigger) =&gt; trigger.getAttribute('data-sort') || '',
    types: { price: 'number', added: 'date' },
    initialState: { key: 'added', dir: 'desc' },   // seeds state without reordering
    urlSync: { keyParam: 'sort', dirParam: 'dir' },
    onChange: ({ key, dir, orderedItems, state }) =&gt; {
        // Consumer-specific post-processing (pagination refresh, CSS hooks, analytics)
    }
});

// ── Instance methods ─────────────────────────────────
sort.apply('price', 'desc');     // Sort programmatically
sort.apply(null, null);          // Same as sort.reset()
sort.reset();                    // Restore the DOM order captured at create()
sort.getState();                 // { key, dir } current state
sort.destroy();                  // Abort every listener bound by this instance

// ── Retrieval ────────────────────────────────────────
NDS.Sort.getInstance(rootElement);   // Existing instance or null
NDS.Sort.getInstance('#mySortRoot'); // Selector also accepted

// ── Events ───────────────────────────────────────────
// Fires on the root, bubbles. Use for cross-component coordination
// (e.g. analytics, external state stores).
document.addEventListener('nds:sort:change', (e) =&gt; {
    const { key, dir, orderedItems, sort } = e.detail;
});

// ── Pure helpers ─────────────────────────────────────
// Useful when comparing values outside the instance lifecycle (e.g. server-rendered
// initial ordering, custom virtualization).
NDS.Sort.detectType(['9,375 SAR', '1,200 SAR']);   // 'number'
NDS.Sort.detectType(['2026-01-01', '2026-02-01']); // 'date'
NDS.Sort.parseValue('9,375 SAR', 'number');        // 9375
NDS.Sort.compare('Apple', 'Banana', 'string', 'asc');  // Negative value
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
