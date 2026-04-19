---
layout: page
title: Checkbox
hero_title: Checkbox - National Design System
hero_description: Multi-selection input controls with clear visual states and accessibility support
breadcrumb: [["Components", "/components"]]
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
    <div class="nds-section-body">
      <div class="nds-showcase">

        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-action">
              <div class="nds-dropmenu demo-toggle-menu">
                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                  <span class="nds-label">SM</span>
                </button>
                <div class="nds-dropmenu-menu" hidden>
                  <div class="nds-dropmenu-scroll">
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                      data-toggler='["", ".nds-check-container", "sizeToggle"]'>
                      <span class="nds-label">SM</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["nds-md", ".nds-check-container", "sizeToggle"]'>
                      <span class="nds-label">MD</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["nds-lg", ".nds-check-container", "sizeToggle"]'>
                      <span class="nds-label">LG</span>
                    </button>
                  </div>
                </div>
              </div>
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["nds-neutral", ".nds-check", "variantToggle"]'>
                <span class="nds-label">Neutral</span>
              </button>
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["indeterminate", ".nds-check", "stateToggle", "prop"]'>
                <span class="nds-label">Indeterminate</span>
              </button>
              <div class="nds-dropmenu demo-toggle-menu">
                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                  <span class="nds-label">State</span>
                </button>
                <div class="nds-dropmenu-menu" hidden>
                  <div class="nds-dropmenu-scroll">
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                      data-toggler='["", ".nds-form-container", "formState"]'>
                      <span class="nds-label">Default</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["data-required", ".nds-form-container", "formState", "attr"]'>
                      <span class="nds-label">Required</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["disabled", ".nds-form-container", "formState", "data-state"]'>
                      <span class="nds-label">Disabled</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["readonly", ".nds-form-container", "formState", "data-state"]'>
                      <span class="nds-label">Readonly</span>
                    </button>
                  </div>
                </div>
              </div>
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                <span class="nds-label">Remove bg</span>
              </button>
            </div>
          </div>
          <div class="demo-container">
            <div class="state-demo">
              <form class="nds-form nds-grid" style="--max-col:1" onsubmit="return false">
                <div class="nds-form-container nds-check-container" data-required>
                  <div class="nds-form-header" data-feedback-target>
                    <label for="demo-checkbox-single">
                      <span class="nds-label">I agree to the terms and conditions</span>
                      <span class="nds-info">You must accept our terms to continue with the registration</span>
                    </label>
                  </div>
                  <div class="nds-form-control">
                    <input type="checkbox" id="demo-checkbox-single" name="agreement" value="accepted" class="nds-check">
                  </div>
                </div>
                <button class="nds-btn nds-primary nds-sm" type="submit">
                  <span class="nds-label">Submit</span>
                </button>
              </form>
            </div>
          </div>
          <div class="demo-code">
          <div class="nds-tabs nds-code nds-divided" hidden>
            <div class="nds-tab-list-container nds-scroll-more">
              <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
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
                  <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                    <i class="nds-icon nds-hgi-copy-01"></i>
                  </button>
                </div>
                <div class="nds-expandable-content">
                  <code class="lang-html code">
&lt;div class="nds-form-container nds-check-container" data-required&gt;
  &lt;div class="nds-form-header" data-feedback-target&gt;
    &lt;label for="checkbox-single"&gt;
      &lt;span class="nds-label"&gt;I agree to the terms and conditions&lt;/span&gt;
      &lt;span class="nds-info"&gt;You must accept our terms to continue&lt;/span&gt;
    &lt;/label&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-control"&gt;
    &lt;input type="checkbox" id="checkbox-single" name="agreement" value="accepted" class="nds-check" required&gt;
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

<!-- Group Validation -->
<section id="checkboxGroup" class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Checkbox Group</h2>
      <p class="nds-section-description">Multiple checkboxes with shared validation using min/max selection constraints</p>
    </div>
    <div class="nds-section-body">
      <div class="nds-showcase">
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-action">
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["disabled", ".nds-check-group", "disabledToggle", "data-state"]'>
                <span class="nds-label">Disabled</span>
              </button>
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["nds-rowView", ".nds-check-group", "layoutToggle"]'>
                <span class="nds-label">Row View</span>
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
              <fieldset class="nds-form-group nds-check-group" data-min-checked="2" data-max-checked="4">
                <legend class="nds-label">Select 2-4 interests</legend>
                <div class="nds-form-container nds-check-container">
                  <div class="nds-form-header">
                    <label for="demo-valid-checkbox1">
                      <span class="nds-label">Technology</span>
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
                      <span class="nds-label">Sports</span>
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
                      <span class="nds-label">Entertainment</span>
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
                      <span class="nds-label">Education</span>
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
                      <span class="nds-label">Travel</span>
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
                      <span class="nds-label">Food</span>
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
                <span class="nds-label">Submit</span>
              </button>
              </form>
            </div>
          </div>
          <div class="demo-code">
          <div class="nds-tabs nds-code nds-divided" hidden>
            <div class="nds-tab-list-container nds-scroll-more">
              <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
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
                  <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                    <i class="nds-icon nds-hgi-copy-01"></i>
                  </button>
                </div>
                <div class="nds-expandable-content">
                  <code class="lang-html code">
&lt;fieldset class="nds-form-group nds-check-group" data-min-checked="2" data-max-checked="4"&gt;
  &lt;legend class="nds-label"&gt;Select 2-4 interests&lt;/legend&gt;
  &lt;div class="nds-form-container nds-check-container"&gt;
    &lt;div class="nds-form-header"&gt;
      &lt;label for="checkbox1"&gt;
        &lt;span class="nds-label"&gt;Technology&lt;/span&gt;
      &lt;/label&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-control"&gt;
      &lt;input type="checkbox" id="checkbox1" name="interests" value="technology" class="nds-check"&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-container nds-check-container"&gt;
    &lt;div class="nds-form-header"&gt;
      &lt;label for="checkbox2"&gt;
        &lt;span class="nds-label"&gt;Sports&lt;/span&gt;
      &lt;/label&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-control"&gt;
      &lt;input type="checkbox" id="checkbox2" name="interests" value="sports" class="nds-check"&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-container nds-check-container"&gt;
    &lt;div class="nds-form-header"&gt;
      &lt;label for="checkbox3"&gt;
        &lt;span class="nds-label"&gt;Entertainment&lt;/span&gt;
      &lt;/label&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-control"&gt;
      &lt;input type="checkbox" id="checkbox3" name="interests" value="entertainment" class="nds-check"&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-container nds-check-container"&gt;
    &lt;div class="nds-form-header"&gt;
      &lt;label for="checkbox4"&gt;
        &lt;span class="nds-label"&gt;Education&lt;/span&gt;
      &lt;/label&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-control"&gt;
      &lt;input type="checkbox" id="checkbox4" name="interests" value="education" class="nds-check"&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-container nds-check-container"&gt;
    &lt;div class="nds-form-header"&gt;
      &lt;label for="checkbox5"&gt;
        &lt;span class="nds-label"&gt;Travel&lt;/span&gt;
      &lt;/label&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-control"&gt;
      &lt;input type="checkbox" id="checkbox5" name="interests" value="travel" class="nds-check"&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-container nds-check-container"&gt;
    &lt;div class="nds-form-header"&gt;
      &lt;label for="checkbox6"&gt;
        &lt;span class="nds-label"&gt;Food&lt;/span&gt;
      &lt;/label&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-control"&gt;
      &lt;input type="checkbox" id="checkbox6" name="interests" value="food" class="nds-check"&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-footer" data-feedback-target hidden&gt;&lt;/div&gt;
&lt;/fieldset&gt;
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
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1;">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-plug-socket"></i>
            <span class="nds-label">Form Integration</span>
          </span>
          <p class="nds-item-desc">Auto-initializes with the forms system. Two-way binding syncs <code class="nds-inline-code lang-html">disabled</code> and <code class="nds-inline-code lang-html">required</code> states between inputs and containers.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-minus-sign"></i>
            <span class="nds-label">Indeterminate State</span>
          </span>
          <p class="nds-item-desc">Set via <code class="nds-inline-code lang-js">NDS.Forms.setIndeterminate()</code>. Auto-clears on user click. Fires <code class="nds-inline-code lang-js">nds:indeterminateChange</code> event with <code class="nds-inline-code lang-js">detail.indeterminate</code> boolean.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="nds-icon nds-hgi-checkmark-circle-02" aria-hidden="true"></i>
            <span class="nds-label">Group Validation</span>
          </span>
          <p class="nds-item-desc">Min/max constraints with <code class="nds-inline-code lang-html">data-min-checked</code> and <code class="nds-inline-code lang-html">data-max-checked</code>. Auto-revalidates on change once an error is shown. Call <code class="nds-inline-code lang-js">NDS.Forms.clearStatus()</code> to reset.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layout-01"></i>
            <span class="nds-label">Responsive Layout</span>
          </span>
          <p class="nds-item-desc">Column layout by default, row layout with <code class="nds-inline-code lang-html">nds-rowView</code> class. Gaps adjust on mobile for touch-friendly spacing.</p>
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
    <div class="nds-section-body">
      <div class="nds-content-block">
        <h3 class="nds-block-title">When to Use</h3>
        <ul>
          <li>Multiple selections from a list of options</li>
          <li>Binary choices like accepting terms or toggling a setting</li>
          <li>Use <a href="{{ 'components/radio' | relative_url }}" class="nds-color">radio buttons</a> when only one selection is allowed</li>
          <li>Use <a href="{{ 'components/switch' | relative_url }}" class="nds-color">switches</a> for instant on/off actions without form submission</li>
          <li>Keep groups to 7 or fewer options. For longer lists, consider a <a href="{{ 'components/forms' | relative_url }}" class="nds-color">multi-select dropdown</a></li>
          <li>Use indeterminate state for "select all" parent checkboxes that partially control child selections</li>
        </ul>
      </div>
      <div class="nds-content-block">
        <h3 class="nds-block-title">JavaScript API</h3>
        <div class="nds-code nds-expandable">
              <div class="nds-code-action">
                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                  <i class="nds-icon nds-hgi-copy-01"></i>
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
      <div class="nds-content-block">
        <h3 class="nds-block-title">Validation Attributes</h3>
        <ul>
          <li>Add <code class="nds-inline-code lang-html">data-required</code> to a single checkbox container to make it mandatory before form submission</li>
          <li>Add <code class="nds-inline-code lang-html">data-required</code> to a group to require at least one selection</li>
          <li>Use <code class="nds-inline-code lang-html">data-min-checked="2"</code> on a group to enforce a minimum number of selections</li>
          <li>Use <code class="nds-inline-code lang-html">data-max-checked="4"</code> on a group to cap the maximum number of selections</li>
          <li>Combine both for a range constraint (e.g. "select 2 to 4 options")</li>
          <li>Add <code class="nds-inline-code lang-html">data-error-message</code> on the group to override the default validation message</li>
          <li>Place a <code class="nds-inline-code lang-html">nds-form-footer</code> with <code class="nds-inline-code lang-html">data-feedback-target</code> inside the group for dynamic feedback placement</li>
        </ul>
      </div>
    </div>
  </div>
</section>
