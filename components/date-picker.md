---
layout: page
title: Date Picker
hero_title: Date Picker - National Design System
hero_description: Interactive calendar component for selecting dates with support for both Gregorian and Hijri calendars
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Date Picker -->
<section id="datePickerOverview" class="nds-content-section nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Date Picker Input</h2>
      <p class="nds-section-description">Text input with calendar dropdown for single date or date range selection</p>
    </div>
    <div class="nds-section-body">
      <div class="nds-showcase">
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-action">
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["dateRange", ".nds-date-picker", "rangeToggle"]'>
                <span class="nds-label">Date Range</span>
              </button>
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["nds-hijri", ".nds-date-picker", "hijriToggle"]'>
                <span class="nds-label">Hijri Calendar</span>
              </button>
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["data-required", ".nds-date-picker", "requiredToggle", "attr"]'>
                <span class="nds-label">Required</span>
              </button>
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["disabled", ".nds-date-picker", "disabledToggle", "data-state"]'>
                <span class="nds-label">Disabled</span>
              </button>
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                <span class="nds-label">Remove bg</span>
              </button>
            </div>
          </div>
          <div class="demo-container">
            <div class="state-demo">
              <form class="nds-form nds-grid" style="--max-col:1" onsubmit="return false">
                <div class="nds-form-container nds-date-picker">
                  <div class="nds-form-header">
                    <label for="demo-datePickerInput">
                      <span class="nds-label">Select date</span>
                    </label>
                  </div>
                  <div class="nds-form-control">
                    <div class="nds-form-action">
                      <button type="button" class="nds-btn nds-subtle nds-md date-picker-toggle"
                        aria-label="Calendar Toggler">
                        <i class="nds-icon nds-hgi-calendar-03" aria-hidden="true"></i>
                      </button>
                    </div>
                    <input type="text" id="demo-datePickerInput" class="nds-input nds-date-input" placeholder="DD/MM/YYYY"
                      data-year-before="40" data-year-after="5">
                  </div>
                  <div class="nds-form-footer" data-feedback-target hidden></div>
                </div>
                <div class="nds-flex">
                  <button class="nds-btn nds-primary nds-sm" type="submit">
                    <span class="nds-label">Submit</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div class="demo-code">
          <div class="nds-tabs nds-code nds-divided">
            <div class="nds-tab-list-container nds-scroll-more">
              <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                  aria-controls="panel-date-picker-1" id="tab-date-picker-1">
                  <span class="nds-tab-label">HTML</span>
                </button>
              </nav>
            </div>
            <div class="nds-tab-content">
              <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-date-picker-1"
                aria-labelledby="tab-date-picker-1">
                <div class="nds-code-action">
                  <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                    <i class="nds-icon nds-hgi-copy-01"></i>
                  </button>
                </div>
                <div class="nds-expandable-content">
                  <code class="lang-html code">
&lt;div class="nds-form-container nds-date-picker"&gt;
  &lt;div class="nds-form-header"&gt;
    &lt;label for="date-picker-1"&gt;
      &lt;span class="nds-label"&gt;Select date&lt;/span&gt;
    &lt;/label&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-control"&gt;
    &lt;div class="nds-form-action"&gt;
      &lt;button type="button" class="nds-btn nds-subtle nds-md date-picker-toggle"
        aria-label="Calendar Toggler"&gt;
        &lt;i class="nds-icon nds-hgi-calendar-03" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;/button&gt;
    &lt;/div&gt;
    &lt;input type="text" id="date-picker-1" class="nds-input nds-date-input"
      placeholder="DD/MM/YYYY" data-year-before="40" data-year-after="5"&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-footer" data-feedback-target hidden&gt;&lt;/div&gt;
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
<section id="datePickerFeatures" class="nds-content-section nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
      <p class="nds-section-description">What you get out of the box with zero configuration</p>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1;">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-plug-socket"></i>
            <span class="nds-label">Auto-initialization</span>
          </span>
          <p class="nds-item-desc">Loaded from <code class="nds-inline-code lang-html">nds-extras.min.js</code> and registered as <code class="nds-inline-code lang-js">NDS.DatePicker</code> by the loader. Scans for <code class="nds-inline-code lang-html">.nds-date-input</code> inside <code class="nds-inline-code lang-html">.nds-form-control</code>. Calendar dropdown is created lazily on first click. For dynamic content, call <code class="nds-inline-code lang-js">NDS.DatePicker.reinit()</code>.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-exchange-01"></i>
            <span class="nds-label">Dual Calendar System</span>
          </span>
          <p class="nds-item-desc">Supports both Gregorian and Hijri (Islamic lunar) calendars. Add the <code class="nds-inline-code lang-html">nds-hijri</code> class to the container to switch. Conversion uses an accurate API reference with browser Intl and mathematical fallbacks.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-calendar-check-in-01"></i>
            <span class="nds-label">Date Range Selection</span>
          </span>
          <p class="nds-item-desc">Add the <code class="nds-inline-code lang-html">dateRange</code> class to enable start/end date selection. Visual indicators highlight the range with connected cells between start and end dates.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-calendar-setting-01"></i>
            <span class="nds-label">Flexible Year Range</span>
          </span>
          <p class="nds-item-desc">Control the year dropdown range with <code class="nds-inline-code lang-html">data-year-before</code> and <code class="nds-inline-code lang-html">data-year-after</code> attributes on the input. Defaults work for most use cases.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-globe-02"></i>
            <span class="nds-label">Bilingual Support</span>
          </span>
          <p class="nds-item-desc">Month names, weekday labels, and button text render in Arabic or English based on the page language. Add <code class="nds-inline-code lang-html">data-lang="ar"</code> on the input to override. Supports RTL and LTR layouts with correct dropdown positioning.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-arrow-shrink-02"></i>
            <span class="nds-label">Smart Positioning</span>
          </span>
          <p class="nds-item-desc">Calendar dropdown automatically flips above the input when there is not enough space below. On mobile, the dropdown centers horizontally for better visibility.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Usage Guidelines -->
<section id="datePickerGuidelines" class="nds-content-section nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Usage Guidelines</h2>
      <p class="nds-section-description">When and how to use the date picker effectively</p>
    </div>
    <div class="nds-section-body">
      <div class="nds-block">
        <h3 class="nds-block-title">When to Use</h3>
        <ul>
          <li>Date selection in forms where the user needs a calendar view to pick a date</li>
          <li>Booking, scheduling, and event planning interfaces</li>
          <li>Use date range mode for report filters, travel dates, or any start/end date pair</li>
          <li>Use Hijri mode for government forms and services that require Islamic calendar dates</li>
          <li>For simple known dates (birth date, ID expiry), a plain <a href="{{ 'components/forms' | relative_url }}" class="nds-color">text input</a> with a date mask may be simpler</li>
          <li>Pre-populate the input with a value in DD/MM/YYYY format to set an initial date</li>
        </ul>
      </div>

      <div class="nds-block">
        <h3 class="nds-block-title">Best Practices</h3>
        <ul>
          <li>Always pair the date input with a visible label using <code class="nds-inline-code lang-html">&lt;label for&gt;</code> so the field is accessible</li>
          <li>Set <code class="nds-inline-code lang-html">data-year-before</code> and <code class="nds-inline-code lang-html">data-year-after</code> to meaningful ranges for the context (a birth date picker needs a wide past range, a booking picker needs a wider future range)</li>
          <li>Use <code class="nds-inline-code lang-html">data-year-after="0"</code> on input fields where future dates are not allowed: the year dropdown will stop at the current year</li>
          <li>Listen on the <code class="nds-inline-code lang-html">change</code> event of the input to react to selection and clear actions, both fire a native bubbling change event</li>
          <li>For server-rendered forms that may be re-inserted into the DOM after a route change, call <code class="nds-inline-code lang-js">NDS.DatePicker.reinit()</code> to wire new inputs</li>
          <li>To remove a calendar from a specific input (for example in a dynamic list row), call <code class="nds-inline-code lang-js">instance.destroy()</code> on the value returned by <code class="nds-inline-code lang-js">NDS.DatePicker.create()</code></li>
          <li>Do not nest a date picker inside another dropmenu or portal: the calendar dropdown uses the dropmenu positioning system and expects to anchor to its own <code class="nds-inline-code lang-html">.nds-form-control</code> parent</li>
        </ul>
      </div>

      <div class="nds-block">
        <h3 class="nds-block-title">Keyboard Navigation</h3>
        <p>The calendar grid follows the WAI-ARIA Date Picker Dialog pattern with roving tabindex. Tab moves into the grid and lands on the selected day, today, or the first day of the month.</p>
        <table class="nds-table nds-responsive">
          <thead><tr><th>Key</th><th>Action</th></tr></thead>
          <tbody>
            <tr><td><code class="nds-inline-code">Arrow keys</code></td><td>Move focus one day at a time within the calendar grid. Wraps to the adjacent month when crossing a boundary</td></tr>
            <tr><td><code class="nds-inline-code">Home</code></td><td>Move focus to the first day of the current week (Sunday)</td></tr>
            <tr><td><code class="nds-inline-code">End</code></td><td>Move focus to the last day of the current week (Saturday)</td></tr>
            <tr><td><code class="nds-inline-code">PageUp</code></td><td>Navigate to the previous month and focus the first day of that month</td></tr>
            <tr><td><code class="nds-inline-code">PageDown</code></td><td>Navigate to the next month and focus the first day of that month</td></tr>
            <tr><td><code class="nds-inline-code">Shift + PageUp</code></td><td>Navigate back one year (12 months) and focus the first day</td></tr>
            <tr><td><code class="nds-inline-code">Shift + PageDown</code></td><td>Navigate forward one year (12 months) and focus the first day</td></tr>
            <tr><td><code class="nds-inline-code">Enter / Space</code></td><td>Select the focused day</td></tr>
            <tr><td><code class="nds-inline-code">Escape</code></td><td>Close the calendar dropdown (handled by the dropmenu system)</td></tr>
          </tbody>
        </table>
      </div>

      <div class="nds-block">
        <h3 class="nds-block-title">Data Attributes</h3>
        <table class="nds-table nds-responsive">
          <thead><tr><th>Attribute</th><th>Element</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code class="nds-inline-code lang-html">data-year-before</code></td><td><code class="nds-inline-code lang-html">.nds-date-input</code></td><td>Number of years before today to include in the year dropdown. Default: <code class="nds-inline-code">5</code></td></tr>
            <tr><td><code class="nds-inline-code lang-html">data-year-after</code></td><td><code class="nds-inline-code lang-html">.nds-date-input</code></td><td>Number of years after today to include in the year dropdown. Default: <code class="nds-inline-code">5</code>. Set to <code class="nds-inline-code">0</code> (or omit) to cap the year list at the current year, preventing future year selection</td></tr>
            <tr><td><code class="nds-inline-code lang-html">data-lang</code></td><td><code class="nds-inline-code lang-html">.nds-date-input</code></td><td>Override the calendar language. Values: <code class="nds-inline-code">ar</code>, <code class="nds-inline-code">en</code>. Defaults to the <code class="nds-inline-code lang-html">&lt;html lang&gt;</code> attribute</td></tr>
          </tbody>
        </table>
      </div>

      <div class="nds-block">
        <h3 class="nds-block-title">Events</h3>
        <table class="nds-table nds-responsive">
          <thead><tr><th>Event</th><th>Target</th><th>When</th></tr></thead>
          <tbody>
            <tr><td><code class="nds-inline-code lang-js">change</code></td><td><code class="nds-inline-code lang-html">.nds-date-input</code></td><td>Fires on every day selection (bubbling, native). Also fires when the user clicks Clear, setting the input value to an empty string</td></tr>
          </tbody>
        </table>
      </div>

      <div class="nds-block">
        <h3 class="nds-block-title">CSS Custom Properties</h3>
        <p>Set on <code class="nds-inline-code lang-html">.nds-date-picker-dropdown</code> to control the calendar panel dimensions.</p>
        <table class="nds-table nds-responsive">
          <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code class="nds-inline-code lang-html">--dropmenu-width</code></td><td><code class="nds-inline-code">100%</code></td><td>Calendar panel width relative to the form control</td></tr>
            <tr><td><code class="nds-inline-code lang-html">--dropmenu-min-width</code></td><td><code class="nds-inline-code">350px</code></td><td>Minimum width of the calendar panel</td></tr>
            <tr><td><code class="nds-inline-code lang-html">--dropmenu-max-width</code></td><td><code class="nds-inline-code">500px</code></td><td>Maximum width of the calendar panel</td></tr>
            <tr><td><code class="nds-inline-code lang-html">--menu-padding</code></td><td><code class="nds-inline-code">0</code></td><td>Padding override for the dropmenu container. Internal calendar sections supply their own padding</td></tr>
            <tr><td><code class="nds-inline-code lang-html">--btn-size</code></td><td><code class="nds-inline-code">40px</code> (<code class="nds-inline-code">32px</code> mobile)</td><td>Size of each day cell button in the calendar grid</td></tr>
          </tbody>
        </table>
      </div>

      <div class="nds-block">
        <h3 class="nds-block-title">JavaScript API</h3>
        <p>Exposed as <strong>window.NDS.DatePicker</strong> by <code class="nds-inline-code lang-html">nds-extras.min.js</code>. Use <code class="nds-inline-code lang-js">NDS.DatePicker.create()</code> to attach a calendar instance to an existing input, and call <code class="nds-inline-code lang-js">instance.destroy()</code> to tear it down cleanly.</p>
        <div class="nds-code nds-expandable">
              <div class="nds-code-action">
                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                  <i class="nds-icon nds-hgi-copy-01"></i>
                </button>
              </div>
              <div class="nds-expandable-content">
                <code class="lang-javascript code">
// Auto-initialized by nds-loader.js (NDS.DatePicker namespace, nds-extras.min.js bundle).
// No manual init needed. For dynamic content:
NDS.DatePicker.reinit();

// Attach a calendar to a specific input and its .nds-form-control parent.
// Returns the DatePickerCalendar instance (or the existing one if already wired).
var instance = NDS.DatePicker.create(input, formControl);

// Tear down a specific calendar instance (removes listeners, DOM, dropmenu).
instance.destroy();

// Listen for date selection and clear events on the input.
input.addEventListener('change', function (e) {
    console.log('Selected value:', e.target.value); // 'DD/MM/YYYY' or ''
});

// Format a Gregorian date as DD/MM/YYYY
NDS.DatePicker.CalendarConfig.gregorian.formatDate(new Date());

// Convert between Gregorian and Hijri
NDS.DatePicker.CalendarConfig.hijri.gregorianToHijri(new Date());
// Returns: { day, month, year }

NDS.DatePicker.CalendarConfig.hijri.hijriToGregorian(1447, 9, 1);
// Returns: Date object

// Create a Hijri date object
NDS.DatePicker.createHijriDate(1, 9, 1447);

// Read the converted date (opposite calendar) from the input
var input = document.querySelector('.nds-date-input');
var converted = input.dataset.convertedDate;

// Disable or require the date picker programmatically
NDS.Forms.setState(input, 'disabled', true);
NDS.Forms.setState(input, 'required', true);
                </code>
              </div>
        </div>
      </div>
    </div>
  </div>
</section>
