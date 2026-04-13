---
layout: page
title: Numbers
hero_title: Numbers Formatting & Counter - National Design System
hero_description: Utilities for formatting large numbers with locale separators and animating counter values on scroll
breadcrumb: ["Utilities", "Numbers"]
lang: en
direction: ltr
---

<!-- Number Formatting -->
<section id="numberFormatting" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Number Formatting</h2>
            <p class="nds-section-description">Automatically formats numbers with locale-appropriate thousand separators</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">

            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Thousand Separators</div>
                    <div class="demo-action">
                        <button type="button" class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                            <span class="nds-label">Remove bg</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo" style="display: flex; gap: var(--spacing-2xl); flex-wrap: wrap; align-items: baseline;">
                        <span class="nds-number-format" style="font-size: var(--nds-display-clamp-sm-FS); font-weight: 600;">1500000</span>
                        <span class="nds-number-format" style="font-size: var(--nds-display-clamp-sm-FS); font-weight: 600;">42850.75</span>
                        <span class="nds-number-format" style="font-size: var(--nds-display-clamp-sm-FS); font-weight: 600;">+2500</span>
                        <span class="nds-number-format" style="font-size: var(--nds-display-clamp-sm-FS); font-weight: 600;">-1200</span>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
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
                                <button type="button" class="nds-btn nds-subtle copy-btn"
                                    aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
<span class="nds-number-format">1500000</span>
<!-- Renders: 1,500,000 -->

<span class="nds-number-format">42850.75</span>
<!-- Renders: 42,850.75 -->

<!-- Signs are preserved -->
<span class="nds-number-format">+2500</span>
<!-- Renders: +2,500 -->

<span class="nds-number-format">-1200</span>
<!-- Renders: -1,200 -->
                            </code>
                        </div>
                    </div>
                </div>
                </div>
            </div>

            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">With Prefix & Suffix</div>
                    <div class="demo-action">
                        <button type="button" class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                            <span class="nds-label">Remove bg</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo" style="display: flex; gap: var(--spacing-2xl); flex-wrap: wrap; align-items: baseline;">
                        <span class="nds-number-format" data-currency="SAR" style="font-size: var(--nds-display-clamp-sm-FS); font-weight: 600;">25000</span>
                        <span class="nds-number-format" data-currency="USD" style="font-size: var(--nds-display-clamp-sm-FS); font-weight: 600;">99999.99</span>
                        <span class="nds-number-format" data-currency="EUR" style="font-size: var(--nds-display-clamp-sm-FS); font-weight: 600;">75000</span>
                        <span class="nds-number-format" style="font-size: var(--nds-display-clamp-sm-FS); font-weight: 600;">1500000 users</span>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-numbers-prefix-1" id="tab-numbers-prefix-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-numbers-prefix-1"
                            aria-labelledby="tab-numbers-prefix-1">
                            <div class="nds-code-action">
                                <button type="button" class="nds-btn nds-subtle copy-btn"
                                    aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
                                <!-- With currency via data attribute -->
                                <span class="nds-number-format" data-currency="SAR">25000</span>
                                <!-- Renders: [SAR icon] 25,000 -->

                                <span class="nds-number-format" data-currency="USD">99999.99</span>
                                <!-- Renders: $ 99,999.99 -->

                                <span class="nds-number-format" data-currency="EUR">75000</span>
                                <!-- Renders: € 75,000 -->

                                <span class="nds-number-format">1500000 users</span>
                                <!-- Renders: 1,500,000 users -->
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

<!-- Counter Animation -->
<section id="counterAnimation" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Counter Animation</h2>
            <p class="nds-section-description">Animated number counters that count up when scrolled into view</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">

            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Basic Counter</div>
                    <div class="demo-action">
                        <button type="button" class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                            <span class="nds-label">Remove bg</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo" style="display: flex; gap: var(--spacing-2xl); flex-wrap: wrap;">
                        <div style="text-align: center;">
                            <span class="nds-counter-value nds-number-format" data-target="1250" style="font-size: var(--nds-display-clamp-sm-FS); font-weight: 700;">0</span>
                            <p style="color: var(--text-secondary-default); margin-top: var(--spacing-sm);">Projects</p>
                        </div>
                        <div style="text-align: center;">
                            <span class="nds-counter-value nds-number-format" data-target="98.6%" style="font-size: var(--nds-display-clamp-sm-FS); font-weight: 700;">0</span>
                            <p style="color: var(--text-secondary-default); margin-top: var(--spacing-sm);">Satisfaction</p>
                        </div>
                        <div style="text-align: center;">
                            <span class="nds-counter-value nds-number-format" data-target="50000" style="font-size: var(--nds-display-clamp-sm-FS); font-weight: 700;">0</span>
                            <p style="color: var(--text-secondary-default); margin-top: var(--spacing-sm);">Users</p>
                        </div>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
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
                                <button type="button" class="nds-btn nds-subtle copy-btn"
                                    aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
<span class="nds-counter-value nds-number-format"
    data-target="1250">0</span>

<span class="nds-counter-value nds-number-format"
    data-target="98.6%">0</span>

<span class="nds-counter-value nds-number-format"
    data-target="50000">0</span>
                            </code>
                        </div>
                    </div>
                </div>
                </div>
            </div>

            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Counter with Data Attributes</div>
                    <div class="demo-action">
                        <button type="button" class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                            <span class="nds-label">Remove bg</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo" style="display: flex; gap: var(--spacing-2xl); flex-wrap: wrap;">
                        <div style="text-align: center;">
                            <span class="nds-counter-value nds-number-format" data-currency="SAR" data-target="75,000" data-duration="2000" style="font-size: var(--nds-display-clamp-sm-FS); font-weight: 700;">0</span>
                            <p style="color: var(--text-secondary-default); margin-top: var(--spacing-sm);">Revenue (2s duration)</p>
                        </div>
                        <div style="text-align: center;">
                            <span class="nds-counter-value nds-number-format" data-target="500" data-start="100" data-duration="1500" style="font-size: var(--nds-display-clamp-sm-FS); font-weight: 700;">0</span>
                            <p style="color: var(--text-secondary-default); margin-top: var(--spacing-sm);">Start from 100</p>
                        </div>
                        <div style="text-align: center;">
                            <span class="nds-counter-value nds-number-format" data-target="3.14159" data-decimals="2" style="font-size: var(--nds-display-clamp-sm-FS); font-weight: 700;">0</span>
                            <p style="color: var(--text-secondary-default); margin-top: var(--spacing-sm);">2 decimal places</p>
                        </div>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-numbers-attrs-1" id="tab-numbers-attrs-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-numbers-attrs-1"
                            aria-labelledby="tab-numbers-attrs-1">
                            <div class="nds-code-action">
                                <button type="button" class="nds-btn nds-subtle copy-btn"
                                    aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
<!-- With currency and custom duration -->
<span class="nds-counter-value nds-number-format"
    data-currency="SAR" data-target="75,000"
    data-duration="2000">0</span>

<!-- Custom start value -->
<span class="nds-counter-value nds-number-format"
    data-target="500" data-start="100"
    data-duration="1500">0</span>

<!-- Explicit decimal places -->
<span class="nds-counter-value nds-number-format"
    data-target="3.14159" data-decimals="2">0</span>
                            </code>
                        </div>
                    </div>
                </div>
                </div>
            </div>

            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Statistics Cards</div>
                    <div class="demo-action">
                        <button type="button" class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-shadow", ".nds-card", "cardStyle"]'>
                            <span class="nds-label">Shadow</span>
                        </button>
                        <button type="button" class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                            <span class="nds-label">Remove bg</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-grid" style="--max-col: 3; --mid-col: 2; --min-col: 1;">
                            <div class="nds-card nds-statistic nds-stroke">
                                <div class="nds-card-header">
                                    <div class="nds-card-featured-icon">
                                        <span class="nds-featured-icon nds-circle nds-xl">
                                            <i class="hgi hgi-stroke hgi-award-03"></i>
                                        </span>
                                    </div>
                                </div>
                                <div class="nds-card-content">
                                    <div class="nds-card-text">
                                        <span class="nds-card-number nds-counter-value nds-number-format" data-target="128">0</span>
                                        <p class="nds-card-description">Projects completed this quarter</p>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-card nds-statistic nds-stroke">
                                <div class="nds-card-header">
                                    <div class="nds-card-featured-icon">
                                        <span class="nds-featured-icon nds-circle nds-xl">
                                            <i class="hgi hgi-stroke hgi-user-group"></i>
                                        </span>
                                    </div>
                                </div>
                                <div class="nds-card-content">
                                    <div class="nds-card-text">
                                        <span class="nds-card-number nds-counter-value nds-number-format" data-target="15400">0</span>
                                        <p class="nds-card-description">Active users this month</p>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-card nds-statistic nds-stroke">
                                <div class="nds-card-header">
                                    <div class="nds-card-featured-icon">
                                        <span class="nds-featured-icon nds-circle nds-xl">
                                            <i class="hgi hgi-stroke hgi-chart-line-data-02"></i>
                                        </span>
                                    </div>
                                </div>
                                <div class="nds-card-content">
                                    <div class="nds-card-text">
                                        <span class="nds-card-number nds-counter-value nds-number-format" data-target="98.2%" data-decimals="1">0</span>
                                        <p class="nds-card-description">System uptime</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-numbers-cards-1" id="tab-numbers-cards-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-numbers-cards-1"
                            aria-labelledby="tab-numbers-cards-1">
                            <div class="nds-code-action">
                                <button type="button" class="nds-btn nds-subtle copy-btn"
                                    aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
<div class="nds-grid" style="--max-col: 3; --mid-col: 2; --min-col: 1;">
    <div class="nds-card nds-statistic nds-stroke">
        <div class="nds-card-header">
            <div class="nds-card-featured-icon">
                <span class="nds-featured-icon nds-circle nds-xl">
                    <i class="hgi hgi-stroke hgi-award-03"></i>
                </span>
            </div>
        </div>
        <div class="nds-card-content">
            <div class="nds-card-text">
                <span class="nds-card-number nds-counter-value nds-number-format"
                    data-target="128">0</span>
                <p class="nds-card-description">Projects completed this quarter</p>
            </div>
        </div>
    </div>
    <div class="nds-card nds-statistic nds-stroke">
        <div class="nds-card-header">
            <div class="nds-card-featured-icon">
                <span class="nds-featured-icon nds-circle nds-xl">
                    <i class="hgi hgi-stroke hgi-user-group"></i>
                </span>
            </div>
        </div>
        <div class="nds-card-content">
            <div class="nds-card-text">
                <span class="nds-card-number nds-counter-value nds-number-format"
                    data-target="15400">0</span>
                <p class="nds-card-description">Active users this month</p>
            </div>
        </div>
    </div>
    <div class="nds-card nds-statistic nds-stroke">
        <div class="nds-card-header">
            <div class="nds-card-featured-icon">
                <span class="nds-featured-icon nds-circle nds-xl">
                    <i class="hgi hgi-stroke hgi-chart-line-data-02"></i>
                </span>
            </div>
        </div>
        <div class="nds-card-content">
            <div class="nds-card-text">
                <span class="nds-card-number nds-counter-value nds-number-format"
                    data-target="98.2%" data-decimals="1">0</span>
                <p class="nds-card-description">System uptime</p>
            </div>
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
<section id="numberFeatures" class="nds-content-section">
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
                        <i class="nds-icon nds-hgi-slow-winds" aria-hidden="true"></i>
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
<section id="numberGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-content-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use <code class="nds-inline-code lang-html">nds-number-format</code> on any element displaying a large number (thousands or more) to improve readability with locale-appropriate separators</li>
                    <li>Use <code class="nds-inline-code lang-html">nds-counter-value</code> for hero statistics, KPI dashboards, and landing page metrics where counting animation draws attention to key figures</li>
                    <li>Combine both classes (<code class="nds-inline-code lang-html">nds-counter-value nds-number-format</code>) so that the final counter value also receives thousand separators</li>
                    <li>Do not use counter animations for frequently updated live data or values that change on user interaction. Counters are designed to play once on scroll</li>
                    <li>Prefer <code class="nds-inline-code lang-html">data-currency</code> over manually adding currency symbols. The attribute handles RTL/LTR placement automatically</li>
                    <li>Set <code class="nds-inline-code lang-html">data-duration</code> between 800 and 2000 ms. Shorter durations feel abrupt; longer ones delay comprehension</li>
                    <li>Use <code class="nds-inline-code lang-html">data-decimals</code> to control precision. Omit it to auto-detect from the target value, or set it to <code class="nds-inline-code lang-html">0</code> for whole numbers</li>
                    <li>Pair counters with <a class="nds-color" href="{{ 'components/cards' | relative_url }}">statistic cards</a> for a polished dashboard layout, as shown in the Statistics Cards demo above</li>
                    <li>Place the raw number as the element's text content. The formatter parses it on load, so the number remains visible even before JavaScript runs</li>
                </ul>
            </div>

            <div class="nds-content-block">
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
                            <td><code class="nds-inline-code lang-html">data-target</code></td>
                            <td>Element text</td>
                            <td>Set on <code class="nds-inline-code lang-html">.nds-counter-value</code>. Target number to count to. Supports embedded prefix/suffix (e.g. "98.6%")</td>
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
                            <td>Force specific decimal places. When not set, matches decimals in data-target. Set to 0 to remove decimals</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-content-block">
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

            <div class="nds-content-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <code class="nds-inline-code lang-js">NDS.Numbers</code> API provides methods to format numbers and trigger counter animations. Call <code class="nds-inline-code lang-js">NDS.Numbers.reinit()</code> after dynamically adding elements to the page.</p>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-javascript line-numbers">
// ── Format numbers on the page ──────────────────────
// Finds all .nds-number-format elements and applies
// locale-appropriate thousand separators
NDS.Numbers.formatNumbers();

// ── Start counter animations ────────────────────────
// Observes all .nds-counter-value elements and animates
// them when they scroll into view
NDS.Numbers.setupCounterAnimations();

// ── Re-initialize everything ────────────────────────
// Runs both formatNumbers() and setupCounterAnimations()
// Call after dynamically adding new number elements
NDS.Numbers.reinit();
</code>
                </div>
            </div>

        </div>
    </div>
</section>
