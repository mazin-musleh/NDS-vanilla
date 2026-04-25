---
layout: page
title: Numbers
hero_title: Numbers Formatting & Counter - National Design System
hero_description: Utilities for formatting large numbers with locale-aware separators, animating counters on scroll, and appending currency symbols automatically.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Number Formatting -->
<section id="numberFormatting" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Number Formatting</h2>
            <p class="nds-section-description">Add <code class="nds-inline-code lang-html">nds-number-format</code> to any element containing a number. The formatter applies locale-appropriate thousand separators on page load, preserving surrounding text, signs, and decimals.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">

            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Thousand Separators</div>
                </div>
                <div class="demo-container">
                    <div class="state-demo" style="display: flex; gap: var(--spacing-2xl); flex-wrap: wrap; align-items: baseline;">
                        <span class="nds-number-format" style="font-size: var(--typo-display-clamp-sm-FS); font-weight: 600;">3240000</span>
                        <span class="nds-number-format" style="font-size: var(--typo-display-clamp-sm-FS); font-weight: 600;">1850</span>
                        <span class="nds-number-format" style="font-size: var(--typo-display-clamp-sm-FS); font-weight: 600;">42850.75</span>
                        <span class="nds-number-format" style="font-size: var(--typo-display-clamp-sm-FS); font-weight: 600;">+2500</span>
                        <span class="nds-number-format" style="font-size: var(--typo-display-clamp-sm-FS); font-weight: 600;">-340</span>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container nds-scroll-more">
                        <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-numbers-format-1" id="tab-numbers-format-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-numbers-format-1"
                            aria-labelledby="tab-numbers-format-1">
                            <div class="nds-code-action">
                                <button type="button" class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
&lt;span class="nds-number-format"&gt;3240000&lt;/span&gt;
&lt;!-- Renders: 3,240,000 --&gt;

&lt;span class="nds-number-format"&gt;1850&lt;/span&gt;
&lt;!-- Renders: 1,850 --&gt;

&lt;span class="nds-number-format"&gt;42850.75&lt;/span&gt;
&lt;!-- Renders: 42,850.75 --&gt;

&lt;!-- Signs are preserved --&gt;
&lt;span class="nds-number-format"&gt;+2500&lt;/span&gt;
&lt;!-- Renders: +2,500 --&gt;

&lt;span class="nds-number-format"&gt;-340&lt;/span&gt;
&lt;!-- Renders: -340 --&gt;</code>
                        </div>
                    </div>
                </div>
                </div>
            </div>

            </div>
        </div>
    </div>
</section>

<!-- Counter Animation -->
<section id="counterAnimation" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Counter Animation</h2>
            <p class="nds-section-description">Add <code class="nds-inline-code lang-html">nds-counter-value</code> and set <code class="nds-inline-code lang-html">data-target</code> to the final value. The counter animates from zero when the element scrolls into view. Combine with <code class="nds-inline-code lang-html">nds-number-format</code> to apply thousand separators to the final value.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">

            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Basic Counter</div>
                    <div class="demo-action">
                        <button type="button" class="nds-btn nds-sm nds-subtle demo-counter-restart" aria-label="Restart counter animation">
                            <i class="nds-icon nds-hgi-refresh" aria-hidden="true"></i>
                            <span class="nds-label">Restart</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo" style="display: flex; gap: var(--spacing-2xl); flex-wrap: wrap;">
                        <div style="text-align: center;">
                            <span class="nds-counter-value nds-number-format" data-target="1850" style="font-size: var(--typo-display-clamp-sm-FS); font-weight: 700;">0</span>
                            <p style="color: var(--text-secondary-default); margin-top: var(--spacing-sm);">Government Services</p>
                        </div>
                        <div style="text-align: center;">
                            <span class="nds-counter-value nds-number-format" data-target="3240000" style="font-size: var(--typo-display-clamp-sm-FS); font-weight: 700;">0</span>
                            <p style="color: var(--text-secondary-default); margin-top: var(--spacing-sm);">Citizens Served</p>
                        </div>
                        <div style="text-align: center;">
                            <span class="nds-counter-value nds-number-format" data-target="98.5%" style="font-size: var(--typo-display-clamp-sm-FS); font-weight: 700;">0</span>
                            <p style="color: var(--text-secondary-default); margin-top: var(--spacing-sm);">Satisfaction Rate</p>
                        </div>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container nds-scroll-more">
                        <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-numbers-counter-1" id="tab-numbers-counter-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-numbers-counter-1"
                            aria-labelledby="tab-numbers-counter-1">
                            <div class="nds-code-action">
                                <button type="button" class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
&lt;span class="nds-counter-value nds-number-format"
    data-target="1850"&gt;0&lt;/span&gt;

&lt;span class="nds-counter-value nds-number-format"
    data-target="3240000"&gt;0&lt;/span&gt;

&lt;!-- Suffix in data-target is preserved --&gt;
&lt;span class="nds-counter-value nds-number-format"
    data-target="98.5%"&gt;0&lt;/span&gt;</code>
                        </div>
                    </div>
                </div>
                </div>
            </div>

            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Counter Options</div>
                    <div class="demo-action">
                        <button type="button" class="nds-btn nds-sm nds-subtle demo-counter-restart" aria-label="Restart counter animation">
                            <i class="nds-icon nds-hgi-refresh" aria-hidden="true"></i>
                            <span class="nds-label">Restart</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo" style="display: flex; gap: var(--spacing-2xl); flex-wrap: wrap;">
                        <div style="text-align: center;">
                            <span class="nds-counter-value nds-number-format" data-target="8500" data-start="5000" data-duration="2000" style="font-size: var(--typo-display-clamp-sm-FS); font-weight: 700;">0</span>
                            <p style="color: var(--text-secondary-default); margin-top: var(--spacing-sm);">Custom start — <code class="nds-inline-code lang-html">data-start="5000"</code></p>
                        </div>
                        <div style="text-align: center;">
                            <span class="nds-counter-value nds-number-format" data-target="3240000" data-duration="3000" style="font-size: var(--typo-display-clamp-sm-FS); font-weight: 700;">0</span>
                            <p style="color: var(--text-secondary-default); margin-top: var(--spacing-sm);">Custom duration — <code class="nds-inline-code lang-html">data-duration="3000"</code></p>
                        </div>
                        <div style="text-align: center;">
                            <span class="nds-counter-value nds-number-format" data-target="42850.75" data-decimals="0" style="font-size: var(--typo-display-clamp-sm-FS); font-weight: 700;">0</span>
                            <p style="color: var(--text-secondary-default); margin-top: var(--spacing-sm);">No decimals — <code class="nds-inline-code lang-html">data-decimals="0"</code></p>
                        </div>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container nds-scroll-more">
                        <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-numbers-options-1" id="tab-numbers-options-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-numbers-options-1"
                            aria-labelledby="tab-numbers-options-1">
                            <div class="nds-code-action">
                                <button type="button" class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
&lt;!-- Custom start value --&gt;
&lt;span class="nds-counter-value nds-number-format"
    data-target="8500" data-start="5000"
    data-duration="2000"&gt;0&lt;/span&gt;

&lt;!-- Custom duration (3 seconds) --&gt;
&lt;span class="nds-counter-value nds-number-format"
    data-target="3240000" data-duration="3000"&gt;0&lt;/span&gt;

&lt;!-- Force no decimal places --&gt;
&lt;span class="nds-counter-value nds-number-format"
    data-target="42850.75" data-decimals="0"&gt;0&lt;/span&gt;</code>
                        </div>
                    </div>
                </div>
                </div>
            </div>

            </div>
        </div>
    </div>
</section>

<!-- Currency -->
<section id="currencyFormat" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Currency</h2>
            <p class="nds-section-description">Add <code class="nds-inline-code lang-html">data-currency</code> to any <code class="nds-inline-code lang-html">nds-number-format</code> element to append the currency symbol automatically. SAR renders as the official Saudi Riyal SVG icon; other currencies use their Unicode symbols.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">

            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Static Amounts</div>
                </div>
                <div class="demo-container">
                    <div class="state-demo" style="display: flex; gap: var(--spacing-2xl); flex-wrap: wrap; align-items: baseline;">
                        <span class="nds-number-format" data-currency="SAR" style="font-size: var(--typo-display-clamp-sm-FS); font-weight: 600;">450000</span>
                        <span class="nds-number-format" data-currency="USD" style="font-size: var(--typo-display-clamp-sm-FS); font-weight: 600;">99999.99</span>
                        <span class="nds-number-format" data-currency="EUR" style="font-size: var(--typo-display-clamp-sm-FS); font-weight: 600;">75000</span>
                        <span class="nds-number-format" data-currency="SAR" data-free style="font-size: var(--typo-display-clamp-sm-FS); font-weight: 600;">Free</span>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container nds-scroll-more">
                        <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-numbers-currency-1" id="tab-numbers-currency-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-numbers-currency-1"
                            aria-labelledby="tab-numbers-currency-1">
                            <div class="nds-code-action">
                                <button type="button" class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
&lt;!-- SAR: official Saudi Riyal SVG icon via CSS mask --&gt;
&lt;span class="nds-number-format" data-currency="SAR"&gt;450000&lt;/span&gt;

&lt;span class="nds-number-format" data-currency="USD"&gt;99999.99&lt;/span&gt;

&lt;span class="nds-number-format" data-currency="EUR"&gt;75000&lt;/span&gt;

&lt;!-- data-free: hides the currency icon for zero-price items --&gt;
&lt;span class="nds-number-format" data-currency="SAR" data-free&gt;Free&lt;/span&gt;</code>
                        </div>
                    </div>
                </div>
                </div>
            </div>

            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Animated Amounts</div>
                    <div class="demo-action">
                        <button type="button" class="nds-btn nds-sm nds-subtle demo-counter-restart" aria-label="Restart counter animation">
                            <i class="nds-icon nds-hgi-refresh" aria-hidden="true"></i>
                            <span class="nds-label">Restart</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo" style="display: flex; gap: var(--spacing-2xl); flex-wrap: wrap;">
                        <div style="text-align: center;">
                            <span class="nds-counter-value nds-number-format" data-currency="SAR" data-target="450000" data-duration="2000" style="font-size: var(--typo-display-clamp-sm-FS); font-weight: 700;">0</span>
                            <p style="color: var(--text-secondary-default); margin-top: var(--spacing-sm);">Annual Budget</p>
                        </div>
                        <div style="text-align: center;">
                            <span class="nds-counter-value nds-number-format" data-currency="SAR" data-target="128750" data-duration="2000" style="font-size: var(--typo-display-clamp-sm-FS); font-weight: 700;">0</span>
                            <p style="color: var(--text-secondary-default); margin-top: var(--spacing-sm);">Revenue</p>
                        </div>
                        <div style="text-align: center;">
                            <span class="nds-counter-value nds-number-format" data-currency="SAR" data-target="43200" data-duration="2000" style="font-size: var(--typo-display-clamp-sm-FS); font-weight: 700;">0</span>
                            <p style="color: var(--text-secondary-default); margin-top: var(--spacing-sm);">Savings</p>
                        </div>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container nds-scroll-more">
                        <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-numbers-currency-2" id="tab-numbers-currency-2">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-numbers-currency-2"
                            aria-labelledby="tab-numbers-currency-2">
                            <div class="nds-code-action">
                                <button type="button" class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
&lt;span class="nds-counter-value nds-number-format"
    data-currency="SAR" data-target="450000"
    data-duration="2000"&gt;0&lt;/span&gt;

&lt;span class="nds-counter-value nds-number-format"
    data-currency="SAR" data-target="128750"
    data-duration="2000"&gt;0&lt;/span&gt;

&lt;span class="nds-counter-value nds-number-format"
    data-currency="SAR" data-target="43200"
    data-duration="2000"&gt;0&lt;/span&gt;</code>
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
<section id="numberFeatures" class="nds-content-section nds-demo-section">
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
                    <p class="nds-item-desc">Both number formatting and counter animations activate automatically on page load with no extra JavaScript required.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-calculator-01"></i>
                        <span class="nds-label">Locale-aware Formatting</span>
                    </span>
                    <p class="nds-item-desc">Numbers are formatted with thousand separators based on the user's browser locale, preserving any surrounding text, signs, or suffixes.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-coins-dollar"></i>
                        <span class="nds-label">Currency Symbols</span>
                    </span>
                    <p class="nds-item-desc">Add <code class="nds-inline-code lang-html">data-currency</code> for automatic currency symbols including SAR (Saudi Riyal icon), USD, EUR, GBP, JPY, CNY, INR, KRW, and TRY.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-chart-increase"></i>
                        <span class="nds-label">Scroll-triggered Counters</span>
                    </span>
                    <p class="nds-item-desc">Counter animations begin when the element scrolls into view, with configurable start value, target, duration, and decimal precision.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-pause"></i>
                        <span class="nds-label">Reduced Motion Support</span>
                    </span>
                    <p class="nds-item-desc">Users who prefer reduced motion see the final counter value immediately with no animation, respecting the <code class="nds-inline-code lang-html">prefers-reduced-motion</code> media query.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-api"></i>
                        <span class="nds-label">Programmatic Control</span>
                    </span>
                    <p class="nds-item-desc">Call <code class="nds-inline-code lang-js">NDS.Numbers.reinit()</code> after dynamically adding numbers to format and animate new elements.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="numberGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use <code class="nds-inline-code lang-html">nds-number-format</code> on any element displaying a large number (thousands or more) to improve readability with locale-appropriate separators</li>
                    <li>Use <code class="nds-inline-code lang-html">nds-counter-value</code> for hero statistics, KPI dashboards, and landing page metrics where counting animation draws attention to key figures</li>
                    <li>Combine both classes (<code class="nds-inline-code lang-html">nds-counter-value nds-number-format</code>) so that the final counter value also receives thousand separators</li>
                    <li>Do not use counter animations for frequently updated live data or values that change on user interaction — counters are designed to play once on scroll</li>
                    <li>Prefer <code class="nds-inline-code lang-html">data-currency</code> over manually adding currency symbols; the attribute handles RTL/LTR symbol placement automatically</li>
                    <li>Set <code class="nds-inline-code lang-html">data-duration</code> between 800 and 2000 ms — shorter durations feel abrupt, longer ones delay comprehension</li>
                    <li>Use <code class="nds-inline-code lang-html">data-decimals</code> to control precision; omit it to auto-detect from the target value, or set it to <code class="nds-inline-code lang-html">0</code> for whole numbers</li>
                    <li>Place the raw number as the element's text content — the formatter parses it on load, so the number remains visible even before JavaScript runs</li>
                    <li>Pair counters with <a class="nds-color" href="{{ 'components/cards' | relative_url }}">statistic cards</a> for a polished dashboard layout</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead>
                        <tr>
                            <th>Attribute</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-currency</code></td>
                            <td>none</td>
                            <td>Set on <code class="nds-inline-code lang-html">.nds-number-format</code>. Supported values: <code class="nds-inline-code lang-html">SAR</code>, <code class="nds-inline-code lang-html">USD</code>, <code class="nds-inline-code lang-html">EUR</code>, <code class="nds-inline-code lang-html">GBP</code>, <code class="nds-inline-code lang-html">JPY</code>, <code class="nds-inline-code lang-html">CNY</code>, <code class="nds-inline-code lang-html">INR</code>, <code class="nds-inline-code lang-html">KRW</code>, <code class="nds-inline-code lang-html">TRY</code></td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-free</code></td>
                            <td>absent</td>
                            <td>Set on <code class="nds-inline-code lang-html">.nds-number-format</code> to suppress the currency symbol. Pair with a text label such as "Free" or "مجاني" for zero-price items.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-target</code></td>
                            <td>Element text</td>
                            <td>Set on <code class="nds-inline-code lang-html">.nds-counter-value</code>. Target number to count to. A suffix in the value (e.g. "98.5%") is preserved and appended to the animated number.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-start</code></td>
                            <td>0</td>
                            <td>Starting number for the counter animation</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-duration</code></td>
                            <td>1000</td>
                            <td>Animation duration in milliseconds</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-decimals</code></td>
                            <td>auto</td>
                            <td>Force specific decimal places. When not set, matches decimals in <code class="nds-inline-code lang-html">data-target</code>. Set to <code class="nds-inline-code lang-html">0</code> to display whole numbers only.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--number-icon-size</code></td>
                            <td>1em</td>
                            <td>Size of currency icons and child <code class="nds-inline-code lang-html">.nds-icon</code> elements inside a formatted number</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <code class="nds-inline-code lang-js">NDS.Numbers</code> module initializes automatically on page load. Call <code class="nds-inline-code lang-js">NDS.Numbers.reinit()</code> after dynamically adding elements to the page.</p>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-javascript line-numbers">
// ── Format numbers on the page ──────────────────────
// Finds all .nds-number-format elements and applies
// locale-appropriate thousand separators
NDS.Numbers.formatNumbers();

// ── Start counter animations ─────────────────────────
// Observes all .nds-counter-value elements and animates
// them when they scroll into view
NDS.Numbers.setupCounterAnimations();

// ── Re-initialize everything ─────────────────────────
// Runs both formatNumbers() and setupCounterAnimations()
// Call after dynamically adding new number elements
NDS.Numbers.reinit();
</code>
                </div>
            </div>

        </div>
    </div>
</section>
