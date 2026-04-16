---
layout: page
title: Radio Button
hero_title: Radio Button - National Design System
hero_description: Single-selection input controls for mutually exclusive options with clear visual feedback
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Radio Button Group -->
<section id="radioGroup" class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Radio Button Group</h2>
      <p class="nds-section-description">Mutually exclusive options with shared validation and required state</p>
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
                      data-toggler='["", ".nds-radio-container", "sizeToggle"]'>
                      <span class="nds-label">SM</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["nds-md", ".nds-radio-container", "sizeToggle"]'>
                      <span class="nds-label">MD</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["nds-lg", ".nds-radio-container", "sizeToggle"]'>
                      <span class="nds-label">LG</span>
                    </button>
                  </div>
                </div>
              </div>
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["nds-neutral", ".nds-radio", "variantToggle"]'>
                <span class="nds-label">Neutral</span>
              </button>
              <button class="nds-btn nds-subtle demo-toggle-btn" data-state="selected"
                data-toggler='["data-required", ".nds-radio-group", "requiredToggle", "attr"]'>
                <span class="nds-label">Required</span>
              </button>
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["disabled", ".nds-radio-group", "disabledToggle", "data-state"]'>
                <span class="nds-label">Disabled</span>
              </button>
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["nds-rowView", ".nds-radio-group", "layoutToggle"]'>
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
                <fieldset class="nds-form-group nds-radio-group" data-required>
                  <legend class="nds-label">Select your plan</legend>
                  <div class="nds-form-container nds-radio-container">
                    <div class="nds-form-header">
                      <label for="demo-radio1">
                        <span class="nds-label">Basic</span>
                        <span class="nds-info">Core features for individuals</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <input type="radio" id="demo-radio1" name="plan" value="basic" class="nds-radio">
                    </div>
                  </div>
                  <div class="nds-form-container nds-radio-container">
                    <div class="nds-form-header">
                      <label for="demo-radio2">
                        <span class="nds-label">Professional</span>
                        <span class="nds-info">Advanced tools for teams</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <input type="radio" id="demo-radio2" name="plan" value="pro" class="nds-radio">
                    </div>
                  </div>
                  <div class="nds-form-container nds-radio-container">
                    <div class="nds-form-header">
                      <label for="demo-radio3">
                        <span class="nds-label">Enterprise</span>
                        <span class="nds-info">Full access with dedicated support</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <input type="radio" id="demo-radio3" name="plan" value="enterprise" class="nds-radio">
                    </div>
                  </div>
                  <div class="nds-form-footer" data-feedback-target hidden></div>
                </fieldset>
                <div class="nds-flex">
                  <button class="nds-btn nds-primary nds-sm" type="submit">
                    <span class="nds-label">Submit</span>
                  </button>
                  <button class="nds-btn nds-subtle nds-sm" type="button" onclick="this.closest('form').querySelectorAll('input[type=radio]').forEach(r => r.checked = false)">
                    <span class="nds-label">Clear Selection</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div class="demo-code">
          <div class="nds-tabs nds-code nds-divided" hidden>
            <div class="nds-tab-list-container nds-scroll-more">
              <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                  aria-controls="panel-radio-group-1" id="tab-radio-group-1">
                  <span class="nds-tab-label">HTML</span>
                </button>
              </nav>
            </div>
            <div class="nds-tab-content">
              <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-radio-group-1"
                aria-labelledby="tab-radio-group-1">
                <div class="nds-code-action">
                  <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                  </button>
                </div>
                <div class="nds-expandable-content">
                  <code class="lang-html code">
<fieldset class="nds-form-group nds-radio-group" data-required>
  <legend class="nds-label">Select your plan</legend>
  <div class="nds-form-container nds-radio-container">
    <div class="nds-form-header">
      <label for="radio1">
        <span class="nds-label">Basic</span>
        <span class="nds-info">Core features for individuals</span>
      </label>
    </div>
    <div class="nds-form-control">
      <input type="radio" id="radio1" name="plan" value="basic" class="nds-radio">
    </div>
  </div>
  <div class="nds-form-container nds-radio-container">
    <div class="nds-form-header">
      <label for="radio2">
        <span class="nds-label">Professional</span>
        <span class="nds-info">Advanced tools for teams</span>
      </label>
    </div>
    <div class="nds-form-control">
      <input type="radio" id="radio2" name="plan" value="pro" class="nds-radio">
    </div>
  </div>
  <div class="nds-form-container nds-radio-container">
    <div class="nds-form-header">
      <label for="radio3">
        <span class="nds-label">Enterprise</span>
        <span class="nds-info">Full access with dedicated support</span>
      </label>
    </div>
    <div class="nds-form-control">
      <input type="radio" id="radio3" name="plan" value="enterprise" class="nds-radio">
    </div>
  </div>
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
<section id="radioFeatures" class="nds-content-section">
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
            <i class="nds-icon nds-hgi-checkmark-circle-02" aria-hidden="true"></i>
            <span class="nds-label">Group Validation</span>
          </span>
          <p class="nds-item-desc">Required selection enforced on form submit. Auto-revalidates on change once an error is shown. Call <code class="nds-inline-code lang-js">NDS.Forms.clearStatus()</code> to reset.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-cursor-02"></i>
            <span class="nds-label">Visual Feedback</span>
          </span>
          <p class="nds-item-desc">Ripple effect on hover, smooth state transitions, and three sizes (SM, MD, LG) with proportional scaling.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layout-01"></i>
            <span class="nds-label">Responsive Layout</span>
          </span>
          <p class="nds-item-desc">Column layout by default, row layout with nds-rowView class. Gaps adjust on mobile for touch-friendly spacing.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Usage Guidelines -->
<section id="radioGuidelines" class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Usage Guidelines</h2>
      <p class="nds-section-description">When and how to use radio buttons effectively</p>
    </div>
    <div class="nds-section-body">
      <div class="nds-content-block">
        <h3 class="nds-block-title">When to Use</h3>
        <ul>
          <li>Selecting exactly one option from a mutually exclusive set</li>
          <li>Use <a href="{{ 'components/checkbox' | relative_url }}" class="nds-color">checkboxes</a> when multiple selections are allowed</li>
          <li>Use a <a href="{{ 'components/forms' | relative_url }}" class="nds-color">select dropdown</a> when there are more than 7 options</li>
          <li>Use <a href="{{ 'components/switch' | relative_url }}" class="nds-color">switches</a> for instant on/off actions without form submission</li>
          <li>Always provide a default selection when possible to avoid empty submissions</li>
          <li>Wrap options in a fieldset with a legend that describes what the user is choosing</li>
        </ul>
      </div>
      <div class="nds-content-block">
        <h3 class="nds-block-title">JavaScript API</h3>
        <div class="nds-code nds-expandable">
              <div class="nds-code-action">
                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                  <i class="hgi hgi-stroke hgi-copy-01"></i>
                </button>
              </div>
              <div class="nds-expandable-content">
                <code class="lang-javascript code">
// Validate a radio group manually
var group = document.querySelector('.nds-radio-group');
var result = NDS.Forms.validateRadioGroup(group);
// result: { valid: false, selected: false, message: 'Please select an option' }

// Validate without showing feedback
NDS.Forms.validateRadioGroup(group, { showMessage: false });

// Set status manually (error, success, warning, info)
NDS.Forms.setStatus({ element: group, status: 'error', message: 'Please select an option' });

// Clear validation status
NDS.Forms.clearStatus(group);
                </code>
              </div>
        </div>
      </div>
      <div class="nds-content-block">
        <h3 class="nds-block-title">Validation Attributes</h3>
        <ul>
          <li>Add <code class="nds-inline-code lang-html">data-required</code> to the group to require a selection before form submission</li>
          <li>Add <code class="nds-inline-code lang-html">data-error-message</code> on the group to override the default validation message</li>
          <li>Place a <code class="nds-inline-code lang-html">nds-form-footer</code> with <code class="nds-inline-code lang-html">data-feedback-target</code> inside the group for dynamic feedback placement</li>
          <li>Use <code class="nds-inline-code lang-html">data-state="disabled"</code> on the group to disable all radio buttons at once</li>
        </ul>
      </div>
    </div>
  </div>
</section>
