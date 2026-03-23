---
layout: page
title: Checkbox
hero_title: Checkbox - National Design System
hero_description: Multi-selection input controls with clear visual states and accessibility support
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Single Checkbox -->
<section id="checkboxSingle" class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Single Checkbox</h2>
      <p class="nds-section-description">Standalone checkbox with label and optional description</p>
    </div>
    <div class="nds-section-content">
      <div class="nds-showcase">

        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-action">
              <div class="nds-dropmenu demo-toggle-menu">
                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                  <span class="label">SM</span>
                </button>
                <div class="nds-dropmenu-menu" hidden>
                  <div class="nds-dropmenu-scroll">
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn selected"
                      data-toggler='["", ".nds-check-container", "sizeToggle"]'>
                      <span class="label">SM</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["nds-md", ".nds-check-container", "sizeToggle"]'>
                      <span class="label">MD</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["nds-lg", ".nds-check-container", "sizeToggle"]'>
                      <span class="label">LG</span>
                    </button>
                  </div>
                </div>
              </div>
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["nds-neutral", ".nds-check", "variantToggle"]'>
                <span class="label">Neutral</span>
              </button>
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["indeterminate", ".nds-check", "stateToggle", "prop"]'>
                <span class="label">Indeterminate</span>
              </button>
              <button class="nds-btn nds-subtle demo-toggle-btn selected"
                data-toggler='["data-required", ".nds-check-container", "requiredToggle", "attr"]'>
                <span class="label">Required</span>
              </button>
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["disabled", "input[type=checkbox]", "disabledToggle", "attr"]'>
                <span class="label">Disabled</span>
              </button>
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                <span class="label">Remove bg</span>
              </button>
            </div>
          </div>
          <div class="demo-container">
            <div class="state-demo">
              <form class="nds-form nds-grid" style="--max-col:1" onsubmit="return false">
                <div class="nds-form-container nds-check-container" data-required>
                  <div class="nds-form-header" data-feedback-target>
                    <label for="demo-checkbox-single">
                      <span class="label">I agree to the terms and conditions</span>
                      <span class="info">You must accept our terms to continue with the registration</span>
                    </label>
                  </div>
                  <div class="nds-form-control">
                    <input type="checkbox" id="demo-checkbox-single" name="agreement" value="accepted" class="nds-check">
                  </div>
                </div>
                <button class="nds-btn nds-primary nds-sm" type="submit">
                  <span class="label">Submit</span>
                </button>
              </form>
            </div>
          </div>
          <div class="demo-code">
          <div class="nds-tabs nds-code nds-divided" hidden>
            <div class="nds-tab-list-container">
              <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                  aria-controls="panel-checkbox-single-1" id="tab-checkbox-single-1">
                  <span class="nds-tab-label">HTML</span>
                </button>
              </nav>
            </div>
            <div class="nds-tab-content">
              <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-checkbox-single-1"
                aria-labelledby="tab-checkbox-single-1">
                <div class="nds-code-action">
                  <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                  </button>
                </div>
                <div class="nds-expandable-content">
                  <code class="lang-html code">
<div class="nds-form-container nds-check-container" data-required>
  <div class="nds-form-header" data-feedback-target>
    <label for="checkbox-single">
      <span class="label">I agree to the terms and conditions</span>
      <span class="info">You must accept our terms to continue</span>
    </label>
  </div>
  <div class="nds-form-control">
    <input type="checkbox" id="checkbox-single" name="agreement" value="accepted" class="nds-check">
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
  </div>
</section>

<!-- Group Validation -->
<section id="checkboxGroup" class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Checkbox Group</h2>
      <p class="nds-section-description">Multiple checkboxes with shared validation using min/max selection constraints</p>
    </div>
    <div class="nds-section-content">
      <div class="nds-showcase">
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-action">
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["disabled", ".nds-check-group", "disabledToggle", "data-state"]'>
                <span class="label">Disabled</span>
              </button>
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["rowView", ".nds-check-group", "layoutToggle"]'>
                <span class="label">Row View</span>
              </button>
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                <span class="label">Remove bg</span>
              </button>
            </div>
          </div>
          <div class="demo-container">
            <div class="state-demo">
              <form class="nds-form nds-grid" style="--max-col:1" onsubmit="return false">
              <fieldset class="nds-form-group nds-check-group" data-min-checked="2" data-max-checked="4">
                <legend class="label">Select 2-4 interests</legend>
                <div class="nds-form-container nds-check-container">
                  <div class="nds-form-header">
                    <label for="demo-valid-checkbox1">
                      <span class="label">Technology</span>
                    </label>
                  </div>
                  <div class="nds-form-control">
                    <input type="checkbox" id="demo-valid-checkbox1" name="valid-interests" value="technology"
                      class="nds-check">
                  </div>
                </div>
                <div class="nds-form-container nds-check-container">
                  <div class="nds-form-header">
                    <label for="demo-valid-checkbox2">
                      <span class="label">Sports</span>
                    </label>
                  </div>
                  <div class="nds-form-control">
                    <input type="checkbox" id="demo-valid-checkbox2" name="valid-interests" value="sports"
                      class="nds-check">
                  </div>
                </div>
                <div class="nds-form-container nds-check-container">
                  <div class="nds-form-header">
                    <label for="demo-valid-checkbox3">
                      <span class="label">Entertainment</span>
                    </label>
                  </div>
                  <div class="nds-form-control">
                    <input type="checkbox" id="demo-valid-checkbox3" name="valid-interests" value="entertainment"
                      class="nds-check">
                  </div>
                </div>
                <div class="nds-form-container nds-check-container">
                  <div class="nds-form-header">
                    <label for="demo-valid-checkbox4">
                      <span class="label">Education</span>
                    </label>
                  </div>
                  <div class="nds-form-control">
                    <input type="checkbox" id="demo-valid-checkbox4" name="valid-interests" value="education"
                      class="nds-check">
                  </div>
                </div>
                <div class="nds-form-container nds-check-container">
                  <div class="nds-form-header">
                    <label for="demo-valid-checkbox5">
                      <span class="label">Travel</span>
                    </label>
                  </div>
                  <div class="nds-form-control">
                    <input type="checkbox" id="demo-valid-checkbox5" name="valid-interests" value="travel"
                      class="nds-check">
                  </div>
                </div>
                <div class="nds-form-container nds-check-container">
                  <div class="nds-form-header">
                    <label for="demo-valid-checkbox6">
                      <span class="label">Food</span>
                    </label>
                  </div>
                  <div class="nds-form-control">
                    <input type="checkbox" id="demo-valid-checkbox6" name="valid-interests" value="food"
                      class="nds-check">
                  </div>
                </div>
                <div class="nds-form-footer" data-feedback-target hidden></div>
              </fieldset>
              <button class="nds-btn nds-primary nds-sm" type="submit">
                <span class="label">Submit</span>
              </button>
              </form>
            </div>
          </div>
          <div class="demo-code">
          <div class="nds-tabs nds-code nds-divided" hidden>
            <div class="nds-tab-list-container">
              <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                  aria-controls="panel-checkbox-validation-1" id="tab-checkbox-validation-1">
                  <span class="nds-tab-label">HTML</span>
                </button>
              </nav>
            </div>
            <div class="nds-tab-content">
              <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-checkbox-validation-1"
                aria-labelledby="tab-checkbox-validation-1">
                <div class="nds-code-action">
                  <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                  </button>
                </div>
                <div class="nds-expandable-content">
                  <code class="lang-html code">
<fieldset class="nds-form-group nds-check-group" data-min-checked="2" data-max-checked="4">
  <legend class="label">Select 2-4 interests</legend>
  <div class="nds-form-container nds-check-container">
    <div class="nds-form-header">
      <label for="checkbox1">
        <span class="label">Technology</span>
      </label>
    </div>
    <div class="nds-form-control">
      <input type="checkbox" id="checkbox1" name="interests" value="technology" class="nds-check">
    </div>
  </div>
  <!-- More checkboxes... -->

  <div class="nds-form-footer" data-feedback-target hidden></div>
</fieldset>
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
<section id="checkboxFeatures" class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
      <p class="nds-section-description">What you get out of the box with zero configuration</p>
    </div>
    <div class="nds-section-content">
      <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1;">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-plug-socket icon"></i>
            <span class="label">Form Integration</span>
          </span>
          <p class="nds-item-desc">Auto-initializes with the forms system. Two-way binding syncs disabled and required states between inputs and containers.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-minus-sign icon"></i>
            <span class="label">Indeterminate State</span>
          </span>
          <p class="nds-item-desc">Set via NDS.Forms.setIndeterminate(). Auto-clears on user click. Fires nds:indeterminateChange event with detail.indeterminate boolean.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-checkmark-circle-02 icon"></i>
            <span class="label">Group Validation</span>
          </span>
          <p class="nds-item-desc">Min/max constraints with data-min-checked and data-max-checked. Auto-revalidates on change once an error is shown. Call NDS.Forms.clearStatus() to reset.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layout-01 icon"></i>
            <span class="label">Responsive Layout</span>
          </span>
          <p class="nds-item-desc">Column layout by default, row layout with rowView class. Gaps adjust on mobile for touch-friendly spacing.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Usage Guidelines -->
<section id="checkboxGuidelines" class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Usage Guidelines</h2>
      <p class="nds-section-description">When and how to use checkboxes effectively</p>
    </div>
    <div class="nds-section-content">
      <div class="nds-content-block">
        <h3 class="nds-block-title">When to Use</h3>
        <ul>
          <li>Multiple selections from a list of options</li>
          <li>Binary choices like accepting terms or toggling a setting</li>
          <li>Use radio buttons when only one selection is allowed</li>
          <li>Use switches for instant on/off actions without form submission</li>
          <li>Keep groups to 7 or fewer options. For longer lists, consider a multi-select dropdown</li>
          <li>Use indeterminate state for "select all" parent checkboxes that partially control child selections</li>
        </ul>
      </div>
      <div class="nds-content-block">
        <h3 class="nds-block-title">JavaScript API</h3>
        <div class="nds-tabs nds-code nds-expandable">
          <div class="nds-tab-content">
            <div class="nds-tab-panel code-example">
              <div class="nds-code-action">
                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                  <i class="hgi hgi-stroke hgi-copy-01"></i>
                </button>
              </div>
              <div class="nds-expandable-content">
                <code class="lang-javascript code">
// Set indeterminate state on a checkbox
var checkbox = document.querySelector('#my-checkbox');
NDS.Forms.setIndeterminate(checkbox, true);

// Listen for indeterminate changes
checkbox.addEventListener('nds:indeterminateChange', function(e) {
  console.log('Indeterminate:', e.detail.indeterminate);
});

// Validate a checkbox group manually
var group = document.querySelector('.nds-check-group');
var result = NDS.Forms.validateCheckboxGroup(group);
// result: { valid: false, checked: 1, min: 2, max: 4, message: '...' }

// Validate without showing feedback
NDS.Forms.validateCheckboxGroup(group, { showMessage: false });

// Clear validation status
NDS.Forms.clearStatus(group);
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="nds-content-block">
        <h3 class="nds-block-title">Validation Attributes</h3>
        <ul>
          <li>Add data-required to a single checkbox container to make it mandatory before form submission</li>
          <li>Add data-required to a group to require at least one selection</li>
          <li>Use data-min-checked="2" on a group to enforce a minimum number of selections</li>
          <li>Use data-max-checked="4" on a group to cap the maximum number of selections</li>
          <li>Combine both for a range constraint (e.g. "select 2 to 4 options")</li>
          <li>Add data-error-message on the group to override the default validation message</li>
          <li>Place a nds-form-footer with data-feedback-target inside the group for dynamic feedback placement</li>
        </ul>
      </div>
    </div>
  </div>
</section>
