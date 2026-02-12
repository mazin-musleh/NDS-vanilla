---
layout: page
title: Date Picker
hero_title: Date Picker Component - National Design System
hero_description: Interactive calendar component for selecting dates with support for both Gregorian and Hijri calendars
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Date Picker Overview -->
<section id="datePickerOverview" class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Date Picker Component</h2>
      <p class="nds-section-description">
        Interactive calendar component with advanced features including Hijri calendar support, date ranges, and
        flexible year selection
      </p>
    </div>
    <div class="nds-section-content">
      <div class="date-picker-showcase">

        <!-- Custom Date Picker -->
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Custom Date Picker</div>
            <div class="demo-action">
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["disabled", "#demo-datePickerInput", "stateToggle", "attr"]'>
                <span class="label">Disabled</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["dateRange", ".nds-date-picker", "rangeToggle"]'>
                <span class="label">Date Range</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["hijri", ".nds-date-picker", "hijriToggle"]'>
                <span class="label">Hijri Calendar</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                <span class="label">Remove bg</span>
              </button>
            </div>
          </div>

          <div class="demo-container">
            <div class="state-demo">

              <div class="nds-form-container nds-date-picker">
                <div class="nds-form-header">
                  <label for="demo-datePickerInput">
                    <span class="label">Select Date</span>
                  </label>
                </div>
                <div class="nds-form-control">
                  <div class="nds-form-action before">
                    <button type="button" class="nds-btn nds-subtle nds-md date-picker-toggle"
                      aria-label="Calendar Toggler">
                      <i class="hgi hgi-stroke hgi-calendar-03 icon"></i>
                    </button>
                  </div>
                  <input type="text" id="demo-datePickerInput" class="nds-input nds-date-input" placeholder="DD/MM/YYYY"
                    data-year-before="40" data-year-after="5">
                </div>
                <div class="nds-form-footer">
                  <span class="nds-feedback nds-outline nds-sm">
                    <span class="nds-feedback-icon">
                      <i class="hgi hgi-stroke icon"></i>
                    </span>
                    <span class="msg"></span>
                  </span>
                </div>
              </div>

            </div>
          </div>
          <div class="nds-tabs nds-code nds-divided" hidden>
            <div class="nds-tab-list-container">
              <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                  aria-controls="panel-date-picker-1" id="tab-date-picker-1">
                  <span class="nds-tab-label">HTML</span>
                </button>
              </nav>
                <button class="nds-btn nds-subtle nds-tab showMore"><i
                    class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                </button>
            </div>
            <div class="nds-tab-content">
              <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-date-picker-1"
                aria-labelledby="tab-date-picker-1">
                <div class="nds-code-action">
                  <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                  </button>
                </div>
                <div class="nds-expandable-content">
                  <code class="lang-html code">
                    <div class="nds-form-container nds-date-picker">
                      <div class="nds-form-header">
                        <label for="datePickerInput">
                          <span class="label">Select Date</span>
                        </label>
                      </div>
                      <div class="nds-form-control">
                        <div class="nds-form-action before">
                          <button type="button" class="nds-btn nds-subtle nds-md date-picker-toggle" aria-label="Calendar Toggler">
                            <i class="hgi hgi-stroke hgi-calendar-03 icon"></i>
                          </button>
                        </div>
                        <input type="text" id="datePickerInput" class="nds-input nds-date-input" placeholder="DD/MM/YYYY"
                          data-year-before="40" data-year-after="5">
                      </div>
                      <div class="nds-form-footer">
                        <span class="nds-feedback nds-outline nds-sm">
                          <span class="nds-feedback-icon">
                            <i class="hgi hgi-stroke icon"></i>
                          </span>
                          <span class="msg"></span>
                        </span>
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
<section id="datePickerGuidelines" class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Usage Guidelines</h2>
      <p class="nds-section-description">Best practices for implementing date picker components</p>
    </div>
    <div class="nds-section-content">
      <div class="guidelines-grid">
        <div class="guideline-item">
          <h3>When to Use</h3>
          <ul>
            <li>Date selection in forms and applications</li>
            <li>Booking and scheduling interfaces</li>
            <li>Event planning and calendar features</li>
            <li>Date range selection for reports</li>
            <li>Historical date entry with flexible years</li>
          </ul>
        </div>
        <div class="guideline-item">
          <h3>Calendar Types</h3>
          <ul>
            <li><strong>Gregorian:</strong> Standard international calendar</li>
            <li><strong>Hijri:</strong> Islamic lunar calendar for Saudi Arabia</li>
            <li><strong>Dual Support:</strong> Automatic conversion between both</li>
            <li><strong>API Integration:</strong> Accurate Hijri date conversion</li>
          </ul>
        </div>
        <div class="guideline-item">
          <h3>Date Range Features</h3>
          <ul>
            <li>Single date selection (default mode)</li>
            <li>Date range selection with visual indicators</li>
            <li>Clear start/end date highlighting</li>
            <li>Range validation and error handling</li>
          </ul>
        </div>
        <div class="guideline-item">
          <h3>Configuration Options</h3>
          <ul>
            <li><strong>data-year-before:</strong> Years to show before current</li>
            <li><strong>data-year-after:</strong> Years to show after current</li>
            <li><strong>data-hijri-offset:</strong> Hijri calendar adjustment</li>
            <li><strong>dateRange class:</strong> Enable range selection</li>
            <li><strong>hijri class:</strong> Switch to Hijri calendar</li>
          </ul>
        </div>
        <div class="guideline-item">
          <h3>Accessibility</h3>
          <ul>
            <li>Keyboard navigation support</li>
            <li>Screen reader compatible</li>
            <li>Clear focus indicators</li>
            <li>Proper ARIA labels and roles</li>
            <li>Semantic button and input usage</li>
          </ul>
        </div>
        <div class="guideline-item">
          <h3>Mobile Considerations</h3>
          <ul>
            <li>Touch-friendly date selection</li>
            <li>Responsive calendar layout</li>
            <li>Optimized dropdown positioning</li>
            <li>Large tap targets for dates</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>