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
        <div class="nds-section-content">
            <div class="nds-showcase">

            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Thousand Separators</div>
                    <div class="demo-action">
                        <button type="button" class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                            <span class="label">Remove bg</span>
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
                            <span class="label">Remove bg</span>
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
        <div class="nds-section-content">
            <div class="nds-showcase">

            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Basic Counter</div>
                    <div class="demo-action">
                        <button type="button" class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                            <span class="label">Remove bg</span>
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
                                <!-- Basic counter: counts from 0 to target -->
                                <span class="nds-counter-value nds-number-format"
                                    data-target="1250">0</span>

                                <!-- With percentage suffix in data-target -->
                                <span class="nds-counter-value nds-number-format"
                                    data-target="98.6%">0</span>
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
                            <span class="label">Remove bg</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo" style="display: flex; gap: var(--spacing-2xl); flex-wrap: wrap;">
                        <div style="text-align: center;">
                            <span class="nds-counter-value nds-number-format" data-target="$75,000" data-duration="2000" style="font-size: var(--nds-display-clamp-sm-FS); font-weight: 700;">0</span>
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
                                <!-- Prefix extracted from data-target -->
                                <span class="nds-counter-value nds-number-format"
                                    data-target="$75,000"
                                    data-duration="2000">0</span>

                                <!-- Custom start value -->
                                <span class="nds-counter-value nds-number-format"
                                    data-target="500"
                                    data-start="100"
                                    data-duration="1500">0</span>

                                <!-- Explicit decimal places -->
                                <span class="nds-counter-value nds-number-format"
                                    data-target="3.14159"
                                    data-decimals="2">0</span>
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
                            <span class="label">Shadow</span>
                        </button>
                        <button type="button" class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                            <span class="label">Remove bg</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-grid" style="--max-col: 3; --mid-col: 2; --min-col: 1;">
                            <div class="nds-card nds-statistic nds-stroke">
                                <div class="nds-card-header">
                                    <div class="nds-card-featured-icon">
                                        <span class="nds-featured-icon nds-brand nds-circle nds-xl">
                                            <i class="hgi hgi-stroke hgi-award-03 icon"></i>
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
                                        <span class="nds-featured-icon nds-brand nds-circle nds-xl">
                                            <i class="hgi hgi-stroke hgi-user-group icon"></i>
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
                                        <span class="nds-featured-icon nds-brand nds-circle nds-xl">
                                            <i class="hgi hgi-stroke hgi-chart-line-data-02 icon"></i>
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
                                <div class="nds-card nds-statistic nds-stroke">
                                    <div class="nds-card-header">
                                        <div class="nds-card-featured-icon">
                                            <span class="nds-featured-icon nds-brand nds-circle nds-xl">
                                                <i class="hgi hgi-stroke hgi-award-03 icon"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <span class="nds-card-number nds-counter-value nds-number-format"
                                                data-target="128">0</span>
                                            <p class="nds-card-description">Projects completed</p>
                                        </div>
                                    </div>
                                </div>

                                <!-- With percentage suffix in data-target -->
                                <div class="nds-card nds-statistic nds-stroke">
                                    ...
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <span class="nds-card-number nds-counter-value nds-number-format"
                                                data-target="98.2%" data-decimals="1">0</span>
                                            <p class="nds-card-description">System uptime</p>
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

<!-- Usage Guidelines -->
<section id="numberGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
            <p class="nds-section-description">How to use number formatting and counter utilities</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-content-block">
                <h3 class="nds-block-title">Number Formatting</h3>
                <p>Add the class <strong>nds-number-format</strong> to any element containing a number. On page load, the number is automatically formatted with locale-appropriate thousand separators. Prefixes (currency symbols, signs) and suffixes (units) surrounding the number are preserved.</p>
            </div>
            <div class="nds-content-block">
                <h3 class="nds-block-title">Counter Animation</h3>
                <p>Add the class <strong>nds-counter-value</strong> to animate a number counting up when it scrolls into view. Combine with <strong>nds-number-format</strong> to also format the final value with separators. The counter respects the prefers-reduced-motion media query — users with reduced motion see the final value immediately.</p>
            </div>
            <div class="nds-content-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <div class="nds-table-wrapper" style="--max-width: 100%;">
                    <table class="nds-table">
                        <thead>
                            <tr>
                                <th>Attribute</th>
                                <th>Default</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>data-target</td>
                                <td>Element text</td>
                                <td>Target number to count to. Supports embedded prefix/suffix (e.g. "$75,000")</td>
                            </tr>
                            <tr>
                                <td>data-start</td>
                                <td>0</td>
                                <td>Starting number for the animation</td>
                            </tr>
                            <tr>
                                <td>data-duration</td>
                                <td>1000</td>
                                <td>Animation duration in milliseconds</td>
                            </tr>
                            <tr>
                                <td>data-decimals</td>
                                <td>—</td>
                                <td>Force specific decimal places. When not set, matches decimals in data-target. Set to 0 to remove decimals</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>
