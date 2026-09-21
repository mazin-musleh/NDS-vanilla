---
layout: page
title: Time Picker
hero_title: Time Picker - National Design System
hero_description: A time field that accepts a typed value or a picked one, with hour, minute and second selectors in a dropdown panel
breadcrumb: [["Components", "/components"]]
since: "1.12.x"
updated: "1.12.x"
last_edit: "21/09/2026 - 05:58 PM"
lang: en
direction: ltr
---

<!-- Overview -->
<section id="timePickerOverview" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Time Picker</h2>
            <p class="nds-section-description">The default field takes a 24-hour value in five minute steps. Type into it directly, or open the panel and pick each part.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-showcase">
                    <div class="nds-demo-card">
                        <div class="demo-header">

                            <div class="demo-action">

                                <button class="nds-btn nds-subtle demo-toggle-btn"
                                    data-toggler='["data-required", ".nds-time-picker", "timeRequired", "attr"]'>
                                    <span class="nds-label">Required</span>
                                </button>
                                <button class="nds-btn nds-subtle demo-toggle-btn"
                                    data-toggler='["disabled", ".nds-time-picker", "timeDisabled", "data-state"]'>
                                    <span class="nds-label">Disabled</span>
                                </button>
                            </div>
                        </div>
                        <div class="demo-container">
                            <div class="state-demo">
                                <div class="nds-form-container nds-time-picker">
                                    <div class="nds-form-header">
                                        <label for="demo-timePicker">
                                            <span class="nds-label">Appointment time</span>
                                        </label>
                                    </div>
                                    <div class="nds-form-control">
                                        <div class="nds-form-action">
                                            <button type="button" class="nds-btn nds-subtle nds-md time-picker-toggle"
                                                aria-label="Time Toggler">
                                                <i class="nds-icon nds-hgi-clock-01" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                        <input type="text" id="demo-timePicker" class="nds-input nds-time-input" placeholder="HH:mm">
                                        <input type="hidden" class="nds-time-value" name="appointmentTime">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="demo-code">
                            <div class="nds-tabs nds-code nds-divided">
                                <div class="nds-tab-list-container nds-scroll-more">
                                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                            aria-controls="panel-time-picker-default-1" id="tab-time-picker-default-1">
                                            <span class="nds-tab-label">HTML</span>
                                        </button>
                                    </nav>
                                    <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="nds-tab-content">
                                    <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-time-picker-default-1"
                                        aria-labelledby="tab-time-picker-default-1">
                                        <div class="nds-code-action">
                                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                                <i class="nds-icon nds-hgi-copy-01"></i>
                                            </button>
                                        </div>
                                        <div class="nds-expandable-content">
                                            <code class="lang-html code">
&lt;div class="nds-form-container nds-time-picker"&gt;
  &lt;div class="nds-form-header"&gt;
    &lt;label for="appointment-time"&gt;
      &lt;span class="nds-label"&gt;Appointment time&lt;/span&gt;
    &lt;/label&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-control"&gt;
    &lt;div class="nds-form-action"&gt;
      &lt;button type="button" class="nds-btn nds-subtle nds-md time-picker-toggle"
        aria-label="Time Toggler"&gt;
        &lt;i class="nds-icon nds-hgi-clock-01" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;/button&gt;
    &lt;/div&gt;
    &lt;input type="text" id="appointment-time" class="nds-input nds-time-input" placeholder="HH:mm"&gt;
    &lt;input type="hidden" class="nds-time-value" name="appointmentTime"&gt;
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
    </div>
</section>

<!-- Time Formats -->
<section id="timePickerFormats" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Time Formats</h2>
            <p class="nds-section-description">One format string sets the display and the selectors the panel shows. Pick 12-hour for public-facing forms and 24-hour for operational tools.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-showcase">
                    <div class="nds-demo-card">
                        <div class="demo-header">
                            <div class="demo-label">Formats set by data-format</div>
                        </div>
                        <div class="demo-container">
                            <div class="state-demo">
                                <form class="nds-form nds-grid" style="--max-col:1" onsubmit="return false">
                                    <div class="nds-form-container nds-time-picker" data-format="HH:mm">
                                        <div class="nds-form-header">
                                            <label for="demo-timePicker24">
                                                <span class="nds-label">24-hour (HH:mm)</span>
                                            </label>
                                        </div>
                                        <div class="nds-form-control">
                                            <div class="nds-form-action">
                                                <button type="button" class="nds-btn nds-subtle nds-md time-picker-toggle"
                                                    aria-label="Time Toggler">
                                                    <i class="nds-icon nds-hgi-clock-01" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                            <input type="text" id="demo-timePicker24" class="nds-input nds-time-input" placeholder="HH:mm">
                                            <input type="hidden" class="nds-time-value" name="time24">
                                        </div>
                                    </div>
                                    <div class="nds-form-container nds-time-picker" data-format="hh:mm A">
                                        <div class="nds-form-header">
                                            <label for="demo-timePicker12">
                                                <span class="nds-label">12-hour with meridiem (hh:mm A)</span>
                                            </label>
                                        </div>
                                        <div class="nds-form-control">
                                            <div class="nds-form-action">
                                                <button type="button" class="nds-btn nds-subtle nds-md time-picker-toggle"
                                                    aria-label="Time Toggler">
                                                    <i class="nds-icon nds-hgi-clock-01" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                            <input type="text" id="demo-timePicker12" class="nds-input nds-time-input" placeholder="hh:mm A">
                                            <input type="hidden" class="nds-time-value" name="time12">
                                        </div>
                                    </div>
                                    <div class="nds-form-container nds-time-picker" data-format="HH:mm:ss">
                                        <div class="nds-form-header">
                                            <label for="demo-timePickerSeconds">
                                                <span class="nds-label">With seconds (HH:mm:ss)</span>
                                            </label>
                                        </div>
                                        <div class="nds-form-control">
                                            <div class="nds-form-action">
                                                <button type="button" class="nds-btn nds-subtle nds-md time-picker-toggle"
                                                    aria-label="Time Toggler">
                                                    <i class="nds-icon nds-hgi-clock-01" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                            <input type="text" id="demo-timePickerSeconds" class="nds-input nds-time-input" placeholder="HH:mm:ss">
                                            <input type="hidden" class="nds-time-value" name="timeSeconds">
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="demo-code">
                            <div class="nds-tabs nds-code nds-divided">
                                <div class="nds-tab-list-container nds-scroll-more">
                                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                            aria-controls="panel-time-picker-formats-1" id="tab-time-picker-formats-1">
                                            <span class="nds-tab-label">HTML</span>
                                        </button>
                                    </nav>
                                    <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="nds-tab-content">
                                    <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-time-picker-formats-1"
                                        aria-labelledby="tab-time-picker-formats-1">
                                        <div class="nds-code-action">
                                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                                <i class="nds-icon nds-hgi-copy-01"></i>
                                            </button>
                                        </div>
                                        <div class="nds-expandable-content">
                                            <code class="lang-html code">
&lt;form class="nds-form nds-grid" style="--max-col:1"&gt;

  &lt;!-- 24-hour: hour and minute selectors --&gt;
  &lt;div class="nds-form-container nds-time-picker" data-format="HH:mm"&gt;
    &lt;div class="nds-form-header"&gt;
      &lt;label for="time-24"&gt;
        &lt;span class="nds-label"&gt;24-hour (HH:mm)&lt;/span&gt;
      &lt;/label&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-control"&gt;
      &lt;div class="nds-form-action"&gt;
        &lt;button type="button" class="nds-btn nds-subtle nds-md time-picker-toggle"
          aria-label="Time Toggler"&gt;
          &lt;i class="nds-icon nds-hgi-clock-01" aria-hidden="true"&gt;&lt;/i&gt;
        &lt;/button&gt;
      &lt;/div&gt;
      &lt;input type="text" id="time-24" class="nds-input nds-time-input" placeholder="HH:mm"&gt;
      &lt;input type="hidden" class="nds-time-value" name="time24"&gt;
    &lt;/div&gt;
  &lt;/div&gt;

  &lt;!-- 12-hour: adds a meridiem selector --&gt;
  &lt;div class="nds-form-container nds-time-picker" data-format="hh:mm A"&gt;
    &lt;div class="nds-form-header"&gt;
      &lt;label for="time-12"&gt;
        &lt;span class="nds-label"&gt;12-hour with meridiem (hh:mm A)&lt;/span&gt;
      &lt;/label&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-control"&gt;
      &lt;div class="nds-form-action"&gt;
        &lt;button type="button" class="nds-btn nds-subtle nds-md time-picker-toggle"
          aria-label="Time Toggler"&gt;
          &lt;i class="nds-icon nds-hgi-clock-01" aria-hidden="true"&gt;&lt;/i&gt;
        &lt;/button&gt;
      &lt;/div&gt;
      &lt;input type="text" id="time-12" class="nds-input nds-time-input" placeholder="hh:mm A"&gt;
      &lt;input type="hidden" class="nds-time-value" name="time12"&gt;
    &lt;/div&gt;
  &lt;/div&gt;

  &lt;!-- 24-hour: adds a second selector --&gt;
  &lt;div class="nds-form-container nds-time-picker" data-format="HH:mm:ss"&gt;
    &lt;div class="nds-form-header"&gt;
      &lt;label for="time-seconds"&gt;
        &lt;span class="nds-label"&gt;With seconds (HH:mm:ss)&lt;/span&gt;
      &lt;/label&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-control"&gt;
      &lt;div class="nds-form-action"&gt;
        &lt;button type="button" class="nds-btn nds-subtle nds-md time-picker-toggle"
          aria-label="Time Toggler"&gt;
          &lt;i class="nds-icon nds-hgi-clock-01" aria-hidden="true"&gt;&lt;/i&gt;
        &lt;/button&gt;
      &lt;/div&gt;
      &lt;input type="text" id="time-seconds" class="nds-input nds-time-input" placeholder="HH:mm:ss"&gt;
      &lt;input type="hidden" class="nds-time-value" name="timeSeconds"&gt;
    &lt;/div&gt;
  &lt;/div&gt;

&lt;/form&gt;
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
    </div>
</section>

<!-- Minute Steps -->
<section id="timePickerSteps" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Minute Steps</h2>
            <p class="nds-section-description">Set the minute list to the slots the service actually offers. The default step is five minutes.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-showcase">
                    <div class="nds-demo-card">
                        <div class="demo-header">
                            <div class="demo-label">Steps set by data-step</div>
                        </div>
                        <div class="demo-container">
                            <div class="state-demo">
                                <form class="nds-form nds-grid" style="--max-col:1" onsubmit="return false">
                                    <div class="nds-form-container nds-time-picker" data-format="hh:mm A" data-step="15">
                                        <div class="nds-form-header">
                                            <label for="demo-timePickerStep15">
                                                <span class="nds-label">Quarter hour slots</span>
                                            </label>
                                        </div>
                                        <div class="nds-form-control">
                                            <div class="nds-form-action">
                                                <button type="button" class="nds-btn nds-subtle nds-md time-picker-toggle"
                                                    aria-label="Time Toggler">
                                                    <i class="nds-icon nds-hgi-clock-01" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                            <input type="text" id="demo-timePickerStep15" class="nds-input nds-time-input" placeholder="hh:mm A">
                                            <input type="hidden" class="nds-time-value" name="slot15">
                                        </div>
                                    </div>
                                    <div class="nds-form-container nds-time-picker" data-format="hh:mm A" data-step="30">
                                        <div class="nds-form-header">
                                            <label for="demo-timePickerStep30">
                                                <span class="nds-label">Half hour slots</span>
                                            </label>
                                        </div>
                                        <div class="nds-form-control">
                                            <div class="nds-form-action">
                                                <button type="button" class="nds-btn nds-subtle nds-md time-picker-toggle"
                                                    aria-label="Time Toggler">
                                                    <i class="nds-icon nds-hgi-clock-01" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                            <input type="text" id="demo-timePickerStep30" class="nds-input nds-time-input" placeholder="hh:mm A">
                                            <input type="hidden" class="nds-time-value" name="slot30">
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="demo-code">
                            <div class="nds-tabs nds-code nds-divided">
                                <div class="nds-tab-list-container nds-scroll-more">
                                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                            aria-controls="panel-time-picker-steps-1" id="tab-time-picker-steps-1">
                                            <span class="nds-tab-label">HTML</span>
                                        </button>
                                    </nav>
                                    <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="nds-tab-content">
                                    <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-time-picker-steps-1"
                                        aria-labelledby="tab-time-picker-steps-1">
                                        <div class="nds-code-action">
                                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                                <i class="nds-icon nds-hgi-copy-01"></i>
                                            </button>
                                        </div>
                                        <div class="nds-expandable-content">
                                            <code class="lang-html code">
&lt;form class="nds-form nds-grid" style="--max-col:1"&gt;

  &lt;!-- Minute list renders 00, 15, 30, 45 --&gt;
  &lt;div class="nds-form-container nds-time-picker" data-format="hh:mm A" data-step="15"&gt;
    &lt;div class="nds-form-header"&gt;
      &lt;label for="slot-15"&gt;
        &lt;span class="nds-label"&gt;Quarter hour slots&lt;/span&gt;
      &lt;/label&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-control"&gt;
      &lt;div class="nds-form-action"&gt;
        &lt;button type="button" class="nds-btn nds-subtle nds-md time-picker-toggle"
          aria-label="Time Toggler"&gt;
          &lt;i class="nds-icon nds-hgi-clock-01" aria-hidden="true"&gt;&lt;/i&gt;
        &lt;/button&gt;
      &lt;/div&gt;
      &lt;input type="text" id="slot-15" class="nds-input nds-time-input" placeholder="hh:mm A"&gt;
      &lt;input type="hidden" class="nds-time-value" name="slot15"&gt;
    &lt;/div&gt;
  &lt;/div&gt;

  &lt;!-- Minute list renders 00, 30 --&gt;
  &lt;div class="nds-form-container nds-time-picker" data-format="hh:mm A" data-step="30"&gt;
    &lt;div class="nds-form-header"&gt;
      &lt;label for="slot-30"&gt;
        &lt;span class="nds-label"&gt;Half hour slots&lt;/span&gt;
      &lt;/label&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-control"&gt;
      &lt;div class="nds-form-action"&gt;
        &lt;button type="button" class="nds-btn nds-subtle nds-md time-picker-toggle"
          aria-label="Time Toggler"&gt;
          &lt;i class="nds-icon nds-hgi-clock-01" aria-hidden="true"&gt;&lt;/i&gt;
        &lt;/button&gt;
      &lt;/div&gt;
      &lt;input type="text" id="slot-30" class="nds-input nds-time-input" placeholder="hh:mm A"&gt;
      &lt;input type="hidden" class="nds-time-value" name="slot30"&gt;
    &lt;/div&gt;
  &lt;/div&gt;

&lt;/form&gt;
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
    </div>
</section>

<!-- Time Bounds -->
<section id="timePickerBounds" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Time Bounds and Validation</h2>
            <p class="nds-section-description">Limit the field to a working window. Options outside it are disabled, and a typed value outside it blocks the submit.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-showcase">
                    <div class="nds-demo-card">
                        <div class="demo-header">
                            <div class="demo-label">Required, limited to 09:00 through 17:30</div>
                        </div>
                        <div class="demo-container">
                            <div class="state-demo">
                                <form class="nds-form nds-grid" style="--max-col:1" onsubmit="return false">
                                    <div class="nds-form-container nds-time-picker" data-format="hh:mm A" data-step="30" data-required>
                                        <div class="nds-form-header">
                                            <label for="demo-timePickerBounds">
                                                <span class="nds-label">Visit time</span>
                                            </label>
                                        </div>
                                        <div class="nds-form-control">
                                            <div class="nds-form-action">
                                                <button type="button" class="nds-btn nds-subtle nds-md time-picker-toggle"
                                                    aria-label="Time Toggler">
                                                    <i class="nds-icon nds-hgi-clock-01" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                            <input type="text" id="demo-timePickerBounds" class="nds-input nds-time-input"
                                                placeholder="hh:mm A" data-min-time="09:00" data-max-time="17:30">
                                            <input type="hidden" class="nds-time-value" name="visitTime">
                                        </div>
                                    </div>
                                    <button type="submit" class="nds-btn nds-primary">
                                        <span class="nds-label">Book visit</span>
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div class="demo-code">
                            <div class="nds-tabs nds-code nds-divided">
                                <div class="nds-tab-list-container nds-scroll-more">
                                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                            aria-controls="panel-time-picker-bounds-1" id="tab-time-picker-bounds-1">
                                            <span class="nds-tab-label">HTML</span>
                                        </button>
                                    </nav>
                                    <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="nds-tab-content">
                                    <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-time-picker-bounds-1"
                                        aria-labelledby="tab-time-picker-bounds-1">
                                        <div class="nds-code-action">
                                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                                <i class="nds-icon nds-hgi-copy-01"></i>
                                            </button>
                                        </div>
                                        <div class="nds-expandable-content">
                                            <code class="lang-html code">
&lt;div class="nds-form-container nds-time-picker" data-format="hh:mm A" data-step="30" data-required&gt;
  &lt;div class="nds-form-header"&gt;
    &lt;label for="visit-time"&gt;
      &lt;span class="nds-label"&gt;Visit time&lt;/span&gt;
    &lt;/label&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-control"&gt;
    &lt;div class="nds-form-action"&gt;
      &lt;button type="button" class="nds-btn nds-subtle nds-md time-picker-toggle"
        aria-label="Time Toggler"&gt;
        &lt;i class="nds-icon nds-hgi-clock-01" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;/button&gt;
    &lt;/div&gt;
    &lt;input type="text" id="visit-time" class="nds-input nds-time-input"
      placeholder="hh:mm A" data-min-time="09:00" data-max-time="17:30"&gt;
    &lt;input type="hidden" class="nds-time-value" name="visitTime"&gt;
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
    </div>
</section>

<!-- Built-in Features -->
<section id="timePickerFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-magic-wand-01"></i>
                            <span class="nds-label">Auto-initialization</span>
                        </span>
                        <p class="nds-item-desc">Activates on any page carrying a <code class="nds-inline-code lang-html">.nds-time-input</code>. The panel builds on first open, so a page of time fields costs nothing until one is used.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-keyboard"></i>
                            <span class="nds-label">Type or Pick</span>
                        </span>
                        <p class="nds-item-desc">The field stays typeable. Entries such as <code class="nds-inline-code lang-html">9:30</code> or <code class="nds-inline-code lang-html">2:30 PM</code> are accepted and padded on commit.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-clock-01"></i>
                            <span class="nds-label">12 or 24-Hour Display</span>
                        </span>
                        <p class="nds-item-desc">One format string sets both the visible text and which selectors the panel shows, so there is no separate mode flag to keep in sync.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-time-quarter"></i>
                            <span class="nds-label">Minute Steps</span>
                        </span>
                        <p class="nds-item-desc">Set the minute list to your real booking interval. A value that sits off the step grid keeps its own option rather than being rounded away.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-filter"></i>
                            <span class="nds-label">Time Bounds</span>
                        </span>
                        <p class="nds-item-desc">Out-of-range options are disabled as you narrow the time, and a pick that falls out of range moves to the nearest allowed option instead of clearing.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-shield-01"></i>
                            <span class="nds-label">Native Validation</span>
                        </span>
                        <p class="nds-item-desc">A typed value is checked on change, so an unreadable or out-of-range time blocks the submit through the browser's own constraint validation.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-translate"></i>
                            <span class="nds-label">Bilingual Labels</span>
                        </span>
                        <p class="nds-item-desc">Selector labels and the meridiem follow the page language and switch with it at runtime, while the submitted value stays unchanged.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-source-code"></i>
                            <span class="nds-label">Programmatic Control</span>
                        </span>
                        <p class="nds-item-desc">Read and write the field from JavaScript with <code class="nds-inline-code lang-js">getValue</code>, <code class="nds-inline-code lang-js">setValue</code> and <code class="nds-inline-code lang-js">clear</code>.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="timePickerGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-block nds-prose">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use for any <strong>time of day</strong>: appointment slots, opening hours, shift starts, submission cut-offs</li>
                    <li>For a date and a time together, place a <a class="nds-color" href="{{ 'components/date-picker' | relative_url }}">Date Picker</a> and a Time Picker as two fields. One field holding both is harder to correct when only the time is wrong</li>
                    <li>Do not use for a <strong>duration</strong> such as two hours thirty minutes. A duration is a quantity, so use <a class="nds-color" href="{{ 'components/forms' | relative_url }}">Text Inputs</a> with number fields instead</li>
                    <li>Choose <code class="nds-inline-code lang-html">hh:mm A</code> for public-facing forms and <code class="nds-inline-code lang-html">HH:mm</code> for operational or internal tools</li>
                    <li>Add seconds only when the value needs them. Most appointment and opening-hour fields do not</li>
                    <li>Set <code class="nds-inline-code lang-html">data-step</code> to the interval the service offers. The default of five minutes already shortens the list, and a step of one renders sixty options</li>
                    <li>Read the value from the hidden <code class="nds-inline-code lang-html">.nds-time-value</code> field, or from <code class="nds-inline-code lang-js">getValue</code>. The visible field holds localized display text</li>
                    <li>Write <code class="nds-inline-code lang-html">data-min-time</code> and <code class="nds-inline-code lang-html">data-max-time</code> in 24-hour form whatever the display format is</li>
                    <li>Add <code class="nds-inline-code lang-html">nds-darker</code> or <code class="nds-inline-code lang-html">nds-lighter</code> to the container for a filled field on a plain background</li>
                </ul>
            </div>
            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-format</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-form-container</code>. Tokens <code class="nds-inline-code lang-html">HH</code>, <code class="nds-inline-code lang-html">H</code>, <code class="nds-inline-code lang-html">hh</code>, <code class="nds-inline-code lang-html">h</code>, <code class="nds-inline-code lang-html">mm</code>, <code class="nds-inline-code lang-html">ss</code>, <code class="nds-inline-code lang-html">A</code>, <code class="nds-inline-code lang-html">a</code>. Any other character passes through as text. Lowercase hour tokens select 12-hour, and token presence decides which selectors the panel shows. Defaults to <code class="nds-inline-code lang-html">HH:mm</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-step</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-form-container</code>. Minute interval for the minute list, from 1 to 60. Defaults to 5. Seconds always step by one</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-required</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-form-container</code>. Marks the field required and blocks the submit while it is empty</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-min-time</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-time-input</code>. Earliest allowed time, always 24-hour <code class="nds-inline-code lang-html">HH:mm</code> or <code class="nds-inline-code lang-html">HH:mm:ss</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-max-time</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-time-input</code>. Latest allowed time, same 24-hour form</td></tr>
                    </tbody>
                </table>
            </div>
            <div class="nds-block nds-prose">
                <h3 class="nds-block-title">Value and Submission</h3>
                <p>The field has two inputs. The visible <code class="nds-inline-code lang-html">.nds-time-input</code> is display text and carries no <code class="nds-inline-code lang-html">name</code>, so it never submits. The hidden <code class="nds-inline-code lang-html">.nds-time-value</code> carries the <code class="nds-inline-code lang-html">name</code> and always holds a 24-hour value.</p>
                <p>A 12-hour field showing <code class="nds-inline-code lang-html">02:30 PM</code> submits <code class="nds-inline-code lang-html">14:30</code>. The meridiem is a display choice and is never stored on its own, so the server reads the same value whatever language the page was in.</p>
                <p>Both inputs dispatch native <code class="nds-inline-code lang-js">input</code> and <code class="nds-inline-code lang-js">change</code> events on every commit. The component dispatches no custom events, so listen on either input.</p>
            </div>
            <div class="nds-block nds-prose">
                <h3 class="nds-block-title">Keyboard</h3>
                <p>Type straight into the field. <code class="nds-inline-code lang-js">Alt</code> plus <code class="nds-inline-code lang-js">ArrowDown</code> opens the panel, where each selector behaves as a standard <a class="nds-color" href="{{ 'components/forms' | relative_url }}">form select</a>: <code class="nds-inline-code lang-js">Tab</code> moves between them, <code class="nds-inline-code lang-js">Enter</code> or <code class="nds-inline-code lang-js">Space</code> opens a list, the arrow keys move through it, and <code class="nds-inline-code lang-js">Escape</code> closes.</p>
            </div>
            <div class="nds-block nds-prose">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDS.TimePicker</strong> API reads and writes the field in 24-hour form. Fields present at load initialize on their own. Call <strong>NDS.TimePicker.init()</strong> after injecting a field into the page.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript">
// ── Initialize ───────────────────────────────────────
// Attaches a picker to every .nds-time-input. Safe to call again
// after injecting new fields: existing fields are left alone.
NDS.TimePicker.init();
NDS.TimePicker.reinit();               // same function

// Build one field now. Returns the instance, or null on bad markup.
const picker = NDS.TimePicker.create(document.getElementById('visit-time'));

// ── Read and write ──────────────────────────────────
// Every method accepts the input, the .nds-form-control,
// or the .nds-form-container.
const field = document.getElementById('visit-time');

// Always 24-hour, with seconds only when the format asks for them.
// Returns '' until every selector has a value.
NDS.TimePicker.getValue(field);        // → '14:30'

// Takes a 24-hour string. Returns false when it cannot be read or
// falls outside data-min-time / data-max-time, and writes nothing
// in that case, so the field never holds a partial value.
NDS.TimePicker.setValue(field, '14:30');   // → true
NDS.TimePicker.setValue(field, '25:00');   // → false
NDS.TimePicker.setValue(field, '18:00');   // → false when max is 17:30

// Empty the field and every selector.
NDS.TimePicker.clear(field);           // → true

// ── Observe changes ─────────────────────────────────
// No custom events. Both inputs fire native input and change,
// so listen on whichever one you need.
field.addEventListener('change', () =&gt; {
    console.log(NDS.TimePicker.getValue(field));
});

// ── Teardown ────────────────────────────────────────
// Releases listeners and removes the panel. Call before discarding
// the markup; NDS.TimePicker.create() can rebuild on it afterwards.
field._ndsTimePicker.destroy();
</code>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
