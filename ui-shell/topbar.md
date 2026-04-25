---
layout: page
title: Top Bar
hero_title: Top Bar - National Design System
hero_description: A slim utility bar above the main navigation that establishes government identity through the DGA digital stamp, offers a theme toggle, and hosts optional live widgets for date, clock, city, and weather.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Topbar -->
<section id="topbar" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Top Bar</h2>
            <p class="nds-section-description">A slim utility bar above the main navigation that holds the DGA digital stamp trigger, date and time widgets, and a dark mode toggle.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Top Bar</div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-topbar-1" id="tab-topbar-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-topbar-1" aria-labelledby="tab-topbar-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
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
<section id="topbarWidgets" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Top Bar Widgets</h2>
            <p class="nds-section-description">Three optional widgets for the top bar: date, clock, and city/weather. Each initializes automatically when its element IDs are on the page. DGA compliance permits a maximum of two: choose the combination that best serves your audience.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Top Bar Widgets</div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-widgets-1" id="tab-widgets-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-widgets-1" aria-labelledby="tab-widgets-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
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

            <div class="nds-block" style="margin-top: var(--spacing-3xl);">
                <h3 class="nds-block-title">Widget Reference</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Element ID</th><th>JS Module</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-html">#nds-date</code></td>
                            <td><code class="nds-inline-code lang-js">NDS.TimeDate</code></td>
                            <td>Displays the current date. Set <code class="nds-inline-code lang-html">data-calendar="hijri"</code> for the Islamic calendar or <code class="nds-inline-code lang-html">data-calendar="gregorian"</code> for the Gregorian calendar. Fetches Hijri dates from the Aladhan API with a 24-hour local cache. Defaults to Hijri for Arabic pages and Gregorian for English.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">#nds-realTimeClock</code></td>
                            <td><code class="nds-inline-code lang-js">NDS.TimeDate</code></td>
                            <td>Live clock that updates every second in 12-hour AM/PM format.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">#nds-cityName</code> + <code class="nds-inline-code lang-html">#nds-weatherInfo</code></td>
                            <td><code class="nds-inline-code lang-js">NDS.CityWeather</code></td>
                            <td>Displays the city name and current weather side by side. City is reverse-geocoded via the Nominatim API (30-day cache), weather is fetched from Open-Meteo (15-minute cache). Set <code class="nds-inline-code lang-html">data-latitude</code> and <code class="nds-inline-code lang-html">data-longitude</code> on <code class="nds-inline-code lang-html">#nds-weatherInfo</code> to configure the location (defaults to Riyadh). Both elements must be present: they share coordinates and initialize together as a single widget.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>

<!-- DGA Digital Stamp -->
<section id="dgaDigitalStamp" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">DGA Digital Stamp</h2>
            <p class="nds-section-description">An expandable panel triggered from the top bar that verifies the site as an official Saudi government digital property. Displays domain verification and HTTPS security notices alongside the DGA registration number.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">DGA Digital Stamp Panel</div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-dga-stamp-1" id="tab-dga-stamp-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-dga-stamp-1" aria-labelledby="tab-dga-stamp-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
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
            href="#"
            target="_blank"&gt;00000000000&lt;/a&gt;
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

<!-- Built-in Features -->
<section id="topbarFeatures" class="nds-content-section nds-demo-section">
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
                    <p class="nds-item-desc">Widgets, the DGA stamp toggle, and the theme switch all activate as soon as their elements are on the page. No manual wiring required.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-target-02"></i>
                        <span class="nds-label">DGA Stamp Toggle</span>
                    </span>
                    <p class="nds-item-desc">The top bar button expands and collapses the digital stamp panel with animated grid-row transitions, automatically closing any open nav menus first.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-clock-02"></i>
                        <span class="nds-label">Live Date &amp; Clock</span>
                    </span>
                    <p class="nds-item-desc">Date refreshes every 24 hours, the real-time clock ticks every second, and both switch language with the page to keep the surface aligned with user locale.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-language-circle"></i>
                        <span class="nds-label">Hijri &amp; Gregorian Calendars</span>
                    </span>
                    <p class="nds-item-desc">The date widget supports both calendars via <code class="nds-inline-code lang-html">data-calendar</code>. Hijri values come from the Aladhan API with a browser <code class="nds-inline-code lang-js">Intl</code> fallback when offline.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-pin-location-01"></i>
                        <span class="nds-label">City &amp; Weather Widgets</span>
                    </span>
                    <p class="nds-item-desc">Reverse-geocoded city name pairs with live weather readings from Open-Meteo. Coordinates are configurable per page via data attributes.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-database"></i>
                        <span class="nds-label">Local Caching</span>
                    </span>
                    <p class="nds-item-desc">Hijri dates cache for 24 hours, weather for 15 minutes, and city names for 30 days, reducing API calls and keeping the top bar responsive across page loads.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="topbarGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Include the DGA digital stamp on all government websites. The top bar trigger and hidden panel are mandatory for DGA compliance. Populate the registration number and notice text from site configuration.</li>
                    <li>DGA compliance allows a maximum of two top bar widgets. Choose any two from: date, clock, or city/weather.</li>
                    <li>Pair the clock with the date when the service is time-sensitive (appointments, deadlines, submissions). Pair the date with city/weather on portals where users need general awareness (citizen services, public dashboards).</li>
                    <li>Set <code class="nds-inline-code lang-html">data-calendar="hijri"</code> on the date widget for Arabic audiences and Saudi government properties. Leave it at the default for English-only international-facing services.</li>
                    <li>Always set explicit <code class="nds-inline-code lang-html">data-latitude</code> and <code class="nds-inline-code lang-html">data-longitude</code> on the weather widget. Do not rely on the Riyadh default for services that target a specific city or region.</li>
                    <li>Do not remove the theme toggle. Dark mode is part of the NDS accessibility baseline.</li>
                    <li>Do not add custom buttons to the top bar. Utility actions belong in the navigation bar's secondary actions area, which persists across all breakpoints.</li>
                    <li>Keep the <code class="nds-inline-code lang-html">nds-digitalStamp-lg-text</code> verification copy short. Long text truncates on tablet before switching to the <code class="nds-inline-code lang-html">nds-digitalStamp-sm-text</code> fallback.</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Class</th><th>Element</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">nds-digitalStamp-tab</code></td><td>top bar button</td><td>Styles the DGA stamp trigger with flag icon and verification text</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-digitalStamp-lg-text</code></td><td>inside stamp tab</td><td>Full-length label shown on desktop, hidden on tablet and below</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-digitalStamp-sm-text</code></td><td>inside stamp tab</td><td>Short label shown on tablet and below, hidden on desktop</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-topbar-info</code></td><td>container</td><td>Groups the DGA tab contents and the right-side widget cluster</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Element</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-theme-toggle</code></td><td>top bar button</td><td>Registers the element as a dark/light mode toggle</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-calendar</code></td><td><code class="nds-inline-code lang-html">#nds-date</code></td><td>Set to <code class="nds-inline-code lang-html">hijri</code> or <code class="nds-inline-code lang-html">gregorian</code>. Defaults to Hijri for Arabic pages.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-latitude</code> / <code class="nds-inline-code lang-html">data-longitude</code></td><td><code class="nds-inline-code lang-html">#nds-weatherInfo</code></td><td>GPS coordinates for weather and city lookup. Defaults to Riyadh (24.7136, 46.6753).</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The top bar widgets initialize automatically when their element IDs exist on the page. Use these APIs to re-initialize after dynamic content changes, refresh individual widgets manually, or pull Hijri dates programmatically for use elsewhere.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// ── Widget Re-initialization ────────────────
// Each module initializes automatically when its
// element IDs are on the page. Call these after
// dynamically adding widget markup.

// Re-initialize date and clock widgets
NDS.TimeDate.init();

// Re-initialize city and weather widgets
NDS.CityWeather.init();

// ── Manual Refresh ──────────────────────────
window.updateDate();       // refresh date display
window.updateClock();      // refresh clock display
window.updateWeather();    // re-fetch weather data
window.updateCity();       // re-fetch city name

// ── DGA Stamp Toggle ────────────────────────
// Opens or closes the digital stamp panel.
// Automatically closes the navbar or open dropdowns
// first to prevent overlapping panels.
window.toggleDGA();

// ── Hijri Date API ──────────────────────────
// Pass true for Arabic, false for English.
// Cached for 24 hours, falls back to browser Intl
// if the Aladhan API is unreachable.
const hijriDate = await NDS.TimeDate.getHijriDate(true);

// Get structured Hijri data (day, month, year numbers)
const hijriData = await NDS.TimeDate.getHijriDate(true, true);
// Returns: { day: 15, month: 10, year: 1447 }
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
