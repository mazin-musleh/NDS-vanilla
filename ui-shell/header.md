---
layout: page
title: Header
hero_title: Header - National Design System
hero_description: The site header combines a topbar, navigation bar, and DGA digital stamp into a single responsive shell that handles branding, page links, dropdown menus, and utility actions across all screen sizes.
breadcrumb: ["UI Shell"]
lang: en
direction: ltr
---

<!-- Header Structure -->
<section id="headerStructure" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Header Structure</h2>
            <p class="nds-section-description">The header wraps three layers: a topbar for government branding and utilities, the main navigation bar, and an expandable DGA digital stamp panel.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Header Structure</div>
                    </div>
                    <div class="demo-container nds-noBg">
                        <div class="nds-code nds-expandable">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <div class="nds-expandable-content">
                                <code class="lang-html code">
header
&#9500;&#9472;&#9472; div.nds-topbar.nds-content-wrapper
&#9474;   &#9500;&#9472;&#9472; button.nds-digitalStamp-tab
&#9474;   &#9492;&#9472;&#9472; div.nds-topbar-info
&#9474;
&#9500;&#9472;&#9472; div#nds-digitalStamp (expandable panel, hidden by default)
&#9474;   &#9492;&#9472;&#9472; div.nds-content-wrapper
&#9474;       &#9492;&#9472;&#9472; div.nds-digitalStamp-notices.nds-grid
&#9474;           &#9500;&#9472;&#9472; div.nds-digitalStamp-card (notice cards)
&#9474;           &#9474;   &#9500;&#9472;&#9472; div.nds-digitalStamp-icon
&#9474;           &#9474;   &#9492;&#9472;&#9472; div.nds-digitalStamp-content
&#9474;           &#9492;&#9472;&#9472; div.nds-digitalStamp-register
&#9474;
&#9492;&#9472;&#9472; nav.nds-main-nav.nds-content-wrapper
    &#9492;&#9472;&#9472; div.nds-nav-container
        &#9500;&#9472;&#9472; a.nds-brand
        &#9474;   &#9500;&#9472;&#9472; img.nds-brand-logo
        &#9474;   &#9492;&#9472;&#9472; span.nds-brand-name
        &#9474;       &#9492;&#9472;&#9472; span.nds-brand-slogan
        &#9500;&#9472;&#9472; ul.nds-nav-minimal
        &#9474;   &#9492;&#9472;&#9472; li.nds-mainNav-toggler (hamburger button)
        &#9492;&#9472;&#9472; div.nds-collapse#ndsNavCollapse
            &#9492;&#9472;&#9472; div.nds-collapse-content
                &#9500;&#9472;&#9472; ul.nds-nav-primary
                &#9474;   &#9500;&#9472;&#9472; li.nds-nav-item
                &#9474;   &#9474;   &#9492;&#9472;&#9472; a.nds-nav-link
                &#9474;   &#9500;&#9472;&#9472; li.nds-nav-item.nds-dropdown
                &#9474;   &#9474;   &#9500;&#9472;&#9472; a.nds-nav-link
                &#9474;   &#9474;   &#9492;&#9472;&#9472; div.nds-dropdown-menu
                &#9474;   &#9474;       &#9492;&#9472;&#9472; div.nds-dropdown-content.nds-content-wrapper
                &#9474;   &#9492;&#9472;&#9472; div.nds-show-more
                &#9492;&#9472;&#9472; ul.nds-nav-secondary
                    &#9492;&#9472;&#9472; li.nds-nav-item
                        &#9492;&#9472;&#9472; a/button.nds-nav-link
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Topbar -->
<section id="topbar" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Topbar</h2>
            <p class="nds-section-description">A slim utility bar above the main navigation that holds the DGA digital stamp trigger, date and time widgets, and a dark mode toggle.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Topbar</div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-topbar-1" id="tab-topbar-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-topbar-1" aria-labelledby="tab-topbar-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;div class="nds-topbar nds-content-wrapper" role="region" aria-label="Top bar utilities"&gt;
  &lt;button class="nds-btn nds-menu-btn nds-topbar-info nds-digitalStamp-tab"
      role="button" aria-expanded="false" aria-controls="nds-digitalStamp"&gt;
    &lt;img class="nds-flag" src="flag.svg" width="20" height="14" loading="lazy" alt="Saudi Arabia Flag"&gt;
    &lt;span class="nds-digitalStamp-lg-text nds-truncate"&gt;A government website registered with the Digital Government Authority.&lt;/span&gt;
    &lt;span class="nds-digitalStamp-sm-text nds-truncate"&gt;Government website registered with DGA&lt;/span&gt;
    &lt;span id="nds-digitalStamp-verify-text" class="nds-link nds-primary"&gt;How you know?&lt;/span&gt;
  &lt;/button&gt;
  &lt;div class="nds-topbar-info"&gt;
    &lt;span id="nds-date" class="nds-text-icon" data-calendar="hijri"&gt;&lt;/span&gt;
    &lt;span id="nds-realTimeClock" class="nds-text-icon"&gt;&lt;/span&gt;
    &lt;span id="nds-cityName" class="nds-text-icon"&gt;&lt;/span&gt;
    &lt;span id="nds-weatherInfo" class="nds-text-icon"
        data-latitude="24.7136" data-longitude="46.6753"&gt;&lt;/span&gt;
    &lt;button class="nds-btn nds-subtle nds-theme-toggle-wrap" data-theme-toggle aria-label="Toggle dark mode"&gt;
      &lt;i class="nds-icon nds-hgi-moon-02" aria-hidden="true"&gt;&lt;/i&gt;
    &lt;/button&gt;
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

<!-- Topbar Widgets -->
<section id="topbarWidgets" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Topbar Widgets</h2>
            <p class="nds-section-description">Three optional widgets for the topbar: date, clock, and city/weather. Each initializes automatically when its element IDs are on the page. DGA compliance permits a maximum of two: choose the combination that best serves your audience.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Topbar Widgets</div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-widgets-1" id="tab-widgets-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-widgets-1" aria-labelledby="tab-widgets-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;!-- Hijri or Gregorian date (set via data-calendar) --&gt;
&lt;span id="nds-date" class="nds-text-icon" data-calendar="hijri"&gt;&lt;/span&gt;

&lt;!-- Real-time clock (updates every second) --&gt;
&lt;span id="nds-realTimeClock" class="nds-text-icon"&gt;&lt;/span&gt;

&lt;!-- City &amp; Weather (both required, coordinates on weatherInfo) --&gt;
&lt;span id="nds-cityName" class="nds-text-icon"&gt;&lt;/span&gt;
&lt;span id="nds-weatherInfo" class="nds-text-icon"
    data-latitude="24.7136" data-longitude="46.6753"&gt;&lt;/span&gt;
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="nds-content-block" style="margin-top: var(--spacing-3xl);">
                <h3 class="nds-block-title">Widget Reference</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Element ID</th><th>JS Module</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-html">#nds-date</code></td>
                            <td><code class="nds-inline-code lang-js">NDS.Timedate</code></td>
                            <td>Displays the current date. Set <code class="nds-inline-code lang-html">data-calendar="hijri"</code> for the Islamic calendar or <code class="nds-inline-code lang-html">data-calendar="gregorian"</code> for the Gregorian calendar. Fetches Hijri dates from the Aladhan API with a 24-hour local cache. Defaults to Hijri for Arabic pages and Gregorian for English.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">#nds-realTimeClock</code></td>
                            <td><code class="nds-inline-code lang-js">NDS.Timedate</code></td>
                            <td>Live clock that updates every second in 12-hour AM/PM format.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">#nds-cityName</code> + <code class="nds-inline-code lang-html">#nds-weatherInfo</code></td>
                            <td><code class="nds-inline-code lang-js">NDS.Cityweather</code></td>
                            <td>Displays the city name and current weather side by side. City is reverse-geocoded via the Nominatim API (30-day cache), weather is fetched from Open-Meteo (15-minute cache). Set <code class="nds-inline-code lang-html">data-latitude</code> and <code class="nds-inline-code lang-html">data-longitude</code> on <code class="nds-inline-code lang-html">#nds-weatherInfo</code> to configure the location (defaults to Riyadh). Both elements must be present: they share coordinates and initialize together as a single widget.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>

<!-- DGA Digital Stamp -->
<section id="dgaDigitalStamp" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">DGA Digital Stamp</h2>
            <p class="nds-section-description">An expandable panel triggered from the topbar that verifies the site as an official Saudi government digital property. Displays domain verification and HTTPS security notices alongside the DGA registration number.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">DGA Digital Stamp Panel</div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-dga-stamp-1" id="tab-dga-stamp-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-dga-stamp-1" aria-labelledby="tab-dga-stamp-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;div id="nds-digitalStamp" role="region" aria-label="Digital government stamp" hidden&gt;
  &lt;div class="nds-content-wrapper"&gt;
    &lt;div class="nds-digitalStamp-notices"&gt;
      &lt;!-- Domain Verification Notice --&gt;
      &lt;div class="nds-digitalStamp-card"&gt;
        &lt;div class="nds-digitalStamp-icon"&gt;
          &lt;i class="nds-icon nds-hgi-link-04" aria-hidden="true"&gt;&lt;/i&gt;
        &lt;/div&gt;
        &lt;div class="nds-digitalStamp-content"&gt;
          &lt;div class="nds-digitalStamp-heading"&gt;
            Official Saudi Government website URL ends with &lt;span class="nds-digitalStamp-highlight"&gt;gov.sa&lt;/span&gt;
          &lt;/div&gt;
          &lt;div class="nds-digitalStamp-description"&gt;
            Website belongs to an official government organization in the Kingdom of Saudi Arabia always ends with .gov.sa .
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
      &lt;!-- HTTPS Security Notice --&gt;
      &lt;div class="nds-digitalStamp-card"&gt;
        &lt;div class="nds-digitalStamp-icon"&gt;
          &lt;i class="nds-icon nds-hgi-square-lock-01" aria-hidden="true"&gt;&lt;/i&gt;
        &lt;/div&gt;
        &lt;div class="nds-digitalStamp-content"&gt;
          &lt;div class="nds-digitalStamp-heading"&gt;
            Official Secure websites use &lt;span class="nds-digitalStamp-highlight"&gt;HTTPS&lt;/span&gt;
          &lt;/div&gt;
          &lt;div class="nds-digitalStamp-description"&gt;
            Secured governments websites in the Kingdom of Saudi Arabia use Https encryption.
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;!-- DGA Registration --&gt;
    &lt;div class="nds-digitalStamp-register"&gt;
      &lt;img src="dga-logo-icon.svg" width="21" height="31" alt="Digital Government Authority" loading="lazy"&gt;
      &lt;div&gt;
        &lt;span&gt;Registered on Digital Government Authority: &lt;/span&gt;
        &lt;a class="nds-digitalStamp-registration nds-primary nds-underline"
            href="https://raqmi.dga.gov.sa/platforms/DigitalStamp/ShowCertificate/4990"
            target="_blank"&gt;20240520402&lt;/a&gt;
      &lt;/div&gt;
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

<!-- Navigation Bar -->
<section id="navBar" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Navigation Bar</h2>
            <p class="nds-section-description">The sticky navigation bar holds branding, primary links, secondary actions, and the mobile hamburger toggle.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Navigation Bar</div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-nav-bar-1" id="tab-nav-bar-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-nav-bar-1" aria-labelledby="tab-nav-bar-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;nav class="nds-main-nav nds-content-wrapper" id="ndsMainNav" aria-label="Primary navigation"&gt;
  &lt;div class="nds-nav-container"&gt;
    &lt;a class="nds-brand" href="/"&gt;
      &lt;img class="nds-brand-logo" src="logo.svg" width="120" height="40" alt="Brand Logo"&gt;
      &lt;span class="nds-brand-name"&gt;Brand Name
        &lt;span class="nds-brand-slogan"&gt;Slogan text&lt;/span&gt;
      &lt;/span&gt;
    &lt;/a&gt;
    &lt;ul class="nds-nav-minimal"&gt;
      &lt;li class="nds-mainNav-toggler nds-nav-item"&gt;
        &lt;button class="nds-nav-link nds-btn nds-subtle nds-indicator" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="ndsNavCollapse"&gt;
          &lt;i class="nds-icon nds-hgi-menu-01" aria-hidden="true"&gt;&lt;/i&gt;
        &lt;/button&gt;
      &lt;/li&gt;
    &lt;/ul&gt;
    &lt;div class="nds-collapse" id="ndsNavCollapse" hidden&gt;
      &lt;div class="nds-collapse-content"&gt;
        &lt;ul class="nds-nav-primary"&gt;
          &lt;li class="nds-nav-item"&gt;
            &lt;a href="/services" class="nds-nav-link nds-btn nds-subtle nds-indicator"&gt;
              &lt;span class="nds-label"&gt;Services&lt;/span&gt;
            &lt;/a&gt;
          &lt;/li&gt;
          &lt;li class="nds-nav-item"&gt;
            &lt;a href="/about" class="nds-nav-link nds-btn nds-subtle nds-indicator"&gt;
              &lt;span class="nds-label"&gt;About&lt;/span&gt;
            &lt;/a&gt;
          &lt;/li&gt;
        &lt;/ul&gt;
        &lt;div class="nds-nav-item nds-show-more"&gt;
          &lt;a class="nds-nav-link nds-btn nds-subtle nds-indicator nds-full"&gt;
            &lt;i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"&gt;&lt;/i&gt;
          &lt;/a&gt;
        &lt;/div&gt;
        &lt;ul class="nds-nav-secondary"&gt;
          &lt;li class="nds-nav-item"&gt;
            &lt;a href="/search" class="nds-nav-link nds-btn nds-subtle nds-indicator"&gt;
              &lt;i class="nds-icon nds-hgi-search-01" aria-hidden="true"&gt;&lt;/i&gt;
              &lt;span class="nds-label"&gt;Search&lt;/span&gt;
            &lt;/a&gt;
          &lt;/li&gt;
        &lt;/ul&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/nav&gt;
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
<section id="headerFeatures" class="nds-content-section">
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
                    <p class="nds-item-desc">Activates when <code class="nds-inline-code lang-html">.nds-main-nav</code> is on the page. Dropdowns, collapse, overflow detection, DGA stamp, and scroll behavior attach automatically.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="nds-icon nds-hgi-smart-phone-01" aria-hidden="true"></i>
                        <span class="nds-label">Responsive Collapse</span>
                    </span>
                    <p class="nds-item-desc">Switches from a horizontal nav bar to a hamburger menu at a configurable breakpoint, with animated expand and collapse transitions.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-mouse-scroll-01"></i>
                        <span class="nds-label">Overflow Detection</span>
                    </span>
                    <p class="nds-item-desc">Primary nav items that exceed the available width become scrollable, with a show-more button that scrolls through hidden items.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-layout-grid"></i>
                        <span class="nds-label">Dropdown Columns</span>
                    </span>
                    <p class="nds-item-desc">Dropdown content can be organized in column, row, or multi-column list layouts that adapt to narrower screens.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-navigation-03"></i>
                        <span class="nds-label">Scroll-to-Anchor</span>
                    </span>
                    <p class="nds-item-desc">Same-page anchor links in the nav close open menus and scroll smoothly to the target section.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-drag-drop"></i>
                        <span class="nds-label">Drag and Wheel Scrolling</span>
                    </span>
                    <p class="nds-item-desc">Primary nav supports horizontal drag scrolling and converts vertical mouse wheel input to horizontal scroll when items overflow.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-sidebar-right"></i>
                        <span class="nds-label">RTL Support</span>
                    </span>
                    <p class="nds-item-desc">Scroll direction, drag behavior, and layout flip automatically in right-to-left contexts.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-shield-01"></i>
                        <span class="nds-label">Reduced Motion</span>
                    </span>
                    <p class="nds-item-desc">All header transitions respect the <code class="nds-inline-code lang-html">prefers-reduced-motion</code> setting, skipping animations for users who have requested it.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-pin-location-01"></i>
                        <span class="nds-label">Persistent Action Buttons</span>
                    </span>
                    <p class="nds-item-desc">Nav items marked with <code class="nds-inline-code lang-html">nds-PAB</code> automatically relocate to the minimal nav bar on small screens and return to their original position on larger viewports.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-layers-01"></i>
                        <span class="nds-label">Backdrop Overlay</span>
                    </span>
                    <p class="nds-item-desc">Opening a dropdown or the mobile collapse displays a backdrop that closes the menu on outside clicks, preventing interaction with page content beneath.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-target-02"></i>
                        <span class="nds-label">DGA Stamp Toggle</span>
                    </span>
                    <p class="nds-item-desc">The topbar button expands and collapses the digital stamp panel with animated grid-row transitions, automatically closing any open nav menus first.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-layout-top"></i>
                        <span class="nds-label">Live Topbar Widgets</span>
                    </span>
                    <p class="nds-item-desc">Date, clock, city, and weather widgets populate automatically from external APIs with local caching. Each widget activates independently when its element ID is on the page and hides gracefully on smaller screens.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="headerGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-content-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Place the header at the top of every page. The topbar sits above the navigation bar, and both are rendered inside a <code class="nds-inline-code lang-html">&lt;header&gt;</code> element.</li>
                    <li>Keep primary nav items between 3 and 8 links. Overflow handling activates automatically, but excessive items reduce usability.</li>
                    <li>Use dropdown menus for grouping related pages under a single primary nav item. Organize content into columns using <code class="nds-inline-code lang-html">nds-colView</code> for category-based layouts or <code class="nds-inline-code lang-html">nds-rowView</code> for flat lists.</li>
                    <li>Reserve the secondary nav for utility actions: search, language toggle, user profile, notifications. These persist across all breakpoints as icon-only buttons on smaller screens.</li>
                    <li>Use <code class="nds-inline-code lang-html">nds-CTA</code> on a nav item to visually highlight a primary call-to-action button in the navigation bar.</li>
                    <li>Do not use the main navigation for in-page section links. Use <a class="nds-color" href="{{ 'components/tabs' | relative_url }}">Tabs</a> for switching between content panels on the same page, or anchor links within the page body.</li>
                    <li>Do not place critical actions only inside dropdown menus. Users on mobile may not discover them. Promote key actions to the primary or secondary nav level.</li>
                    <li>Do not add more than one level of dropdown nesting. The component supports single-level dropdowns only.</li>
                    <li>Set the brand logo dimensions explicitly with <code class="nds-inline-code lang-html">width</code> and <code class="nds-inline-code lang-html">height</code> attributes to prevent layout shift during page load.</li>
                    <li>Use <code class="nds-inline-code lang-html">nds-icon-only</code> on secondary nav items that should display as icon buttons. Labels are automatically hidden on smaller screens for non-CTA items.</li>
                    <li>Mark nav items that must remain visible at all breakpoints with <code class="nds-inline-code lang-html">nds-PAB</code>. These items automatically move to the minimal nav bar on small screens and return to their original position on wider viewports.</li>
                    <li>Include the DGA digital stamp on all government websites. The topbar trigger and hidden panel are mandatory for DGA compliance. Populate the registration number and notice text from site configuration.</li>
                    <li>DGA compliance allows a maximum of two topbar widgets. Choose any two from: date, clock, or city/weather.</li>
                </ul>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Class</th><th>Element</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">nds-dropdown</code></td><td>nav-item</td><td>Enables dropdown menu behavior</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-CTA</code></td><td>nav-item</td><td>Styles the item as a call-to-action button</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-icon-only</code></td><td>nav-item</td><td>Displays as icon button, hides label</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-PAB</code></td><td>nav-item</td><td>Persistent action button that relocates to the minimal nav bar on small screens</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-show-more</code></td><td>nav-item</td><td>Marks the overflow scroll button</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-oncolor</code></td><td>nav-link</td><td>Applies on-color text styling for dark backgrounds</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-menu-btn</code></td><td>nav-link</td><td>Transparent background style with indicator for primary nav items (mobile)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-fit</code></td><td>dropdown-menu</td><td>Sizes the dropdown to fit its content width</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-colView</code></td><td>dropdown-columns</td><td>Organizes content in vertical columns</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-rowView</code></td><td>dropdown-columns</td><td>Organizes content in a horizontal row layout</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-multi-column-list</code></td><td>list inside dropdown</td><td>Renders items in a 3-column grid</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-digitalStamp-tab</code></td><td>topbar button</td><td>Styles the DGA stamp trigger with flag icon and verification text</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-digitalStamp-lg-text</code></td><td>inside stamp tab</td><td>Full-length label shown on desktop, hidden on tablet and below</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-digitalStamp-sm-text</code></td><td>inside stamp tab</td><td>Short label shown on tablet and below, hidden on desktop</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Element</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-state="current"</code></td><td>nav-link</td><td>Marks the active page in the navigation</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-theme-toggle</code></td><td>topbar button</td><td>Registers the element as a dark/light mode toggle</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-calendar</code></td><td><code class="nds-inline-code lang-html">#nds-date</code></td><td>Set to <code class="nds-inline-code lang-html">hijri</code> or <code class="nds-inline-code lang-html">gregorian</code>. Defaults to Hijri for Arabic pages.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-latitude</code> / <code class="nds-inline-code lang-html">data-longitude</code></td><td><code class="nds-inline-code lang-html">#nds-weatherInfo</code></td><td>GPS coordinates for weather and city lookup. Defaults to Riyadh (24.7136, 46.6753).</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--nds-nav-height</code></td><td><code class="nds-inline-code lang-html">72px</code></td><td>Height of the navigation bar</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--nds-minimal-nav-bp</code></td><td><code class="nds-inline-code lang-html">960px</code></td><td>Breakpoint width for switching to mobile/minimal mode</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--nds-transition-speed</code></td><td><code class="nds-inline-code lang-html">0.2</code></td><td>Base transition speed in seconds</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--nds-minimal-nav-item-height</code></td><td><code class="nds-inline-code lang-html">40px</code></td><td>Height of each nav item in the mobile collapse panel</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The header initializes automatically when <code class="nds-inline-code lang-html">.nds-main-nav</code> exists on the page. It is priority 1 in the loader (first to initialize). Toggle functions are exposed globally on <code class="nds-inline-code lang-js">window</code> for use in HTML <code class="nds-inline-code lang-html">onclick</code> attributes.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// ── Toggle Functions ─────────────────────────
// All three are on `window` so they can be called
// from inline onclick handlers or external scripts.

// Toggle the mobile hamburger collapse.
// Opens the collapse panel if closed, closes it if open.
// Queues the action if an animation is already running.
window.toggleNavbar();

// Toggle a dropdown menu.
// Pass the native click event from the trigger element.
// The function finds the closest .nds-dropdown ancestor,
// closes any other open dropdown first, then opens the target.
window.toggleDropdown(event);

// Toggle the DGA digital stamp panel in the topbar.
// Automatically closes the navbar or open dropdowns first
// to prevent overlapping panels.
window.toggleDGA();

// ── Re-initialize ────────────────────────────
// Call after dynamically adding or removing nav items.
// Re-runs layout calculations, overflow detection,
// responsive breakpoint checks, and PAB placement.
NDS.Mainnav.init();

// ── Topbar Widget APIs ──────────────────────
// Each module initializes automatically when its
// element IDs are present on the page.

// Re-initialize date and clock widgets
NDS.Timedate.init();

// Re-initialize city and weather widgets
NDS.Cityweather.init();

// Manually refresh individual widgets
window.updateDate();       // refresh date display
window.updateClock();      // refresh clock display
window.updateWeather();    // re-fetch weather data
window.updateCity();       // re-fetch city name

// Get Hijri date programmatically
// Pass true for Arabic, false for English
const hijriDate = await window.getHijriDate(true);

// Get structured Hijri data (day, month, year numbers)
const hijriData = await window.getHijriDate(true, true);
// Returns: { day: 15, month: 10, year: 1447 }
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
