---
layout: page
title: Radio Button
hero_title: Radio Button - National Design System
hero_description: Single-selection input controls for mutually exclusive options with clear visual feedback
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Radio Overview -->
<section id="radioOverview" class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Radio Button Component</h2>
      <p class="nds-section-description">
        Single-selection radio buttons for allowing users to choose one option from a group
      </p>
    </div>
    <div class="nds-section-content">
      <div class="nds-showcase">

        <!-- Single Radio Button -->
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Single Radio Button</div>
            <div class="demo-action">
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["nds-lg", ".nds-radio-container", "sizeToggle"]'>
                <span class="label">LG</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["nds-md", ".nds-radio-container", "sizeToggle"]'>
                <span class="label">MD</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                data-toggler='["nds-sm", ".nds-radio-container", "sizeToggle"]'>
                <span class="label">SM</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["nds-neutral", ".nds-radio", "variantToggle"]'>
                <span class="label">Neutral</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["disabled", "input[type=radio]", "stateToggle", "attr"]'>
                <span class="label">Disabled</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                <span class="label">Remove bg</span>
              </button>
            </div>
          </div>
          <div class="demo-container">
            <div class="state-demo">
              <div class="nds-form-container nds-radio-container">
                <div class="nds-form-header">
                  <label for="demo-radio-single">
                    <span class="label">Subscribe to newsletter</span>
                    <span class="info">Receive monthly updates about our services</span>
                  </label>
                </div>
                <div class="nds-form-control">
                  <input type="radio" id="demo-radio-single" name="newsletter" value="subscribe" class="nds-radio">
                </div>
              </div>
            </div>
          </div>
          <div class="demo-code">
          <div class="nds-tabs nds-code nds-divided" hidden>
            <div class="nds-tab-list-container">
              <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                  aria-controls="panel-radio-single-1" id="tab-radio-single-1">
                  <span class="nds-tab-label">HTML</span>
                </button>
              </nav>
                <button class="nds-btn nds-subtle nds-tab showMore" aria-label="Show more"><i
                    class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                </button>
            </div>
            <div class="nds-tab-content">
              <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-radio-single-1"
                aria-labelledby="tab-radio-single-1">
                <div class="nds-code-action">
                  <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                  </button>
                </div>
                <div class="nds-expandable-content">
                  <code class="lang-html code">
                <div class="nds-form-container nds-radio-container">
                  <div class="nds-form-header">
                    <label for="radio-single">
                      <span class="label">Subscribe to newsletter</span>
                      <span class="info">Receive monthly updates about our services</span>
                    </label>
                  </div>
                  <div class="nds-form-control">
                    <input type="radio" id="radio-single" name="newsletter" value="subscribe" class="nds-radio">
                  </div>
                </div>
                  </code>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>

        <!-- Radio Button Group -->
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Radio Button Group</div>
            <div class="demo-action">
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["data-required", ".nds-radio-group", "requiredToggle", "attr"]'>
                <span class="label">Required</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["disabled", ".nds-radio-group", "disabledToggle", "data-state"]'>
                <span class="label">Disabled</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["nds-lg", ".nds-radio-container", "sizeToggle"]'>
                <span class="label">LG</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["nds-md", ".nds-radio-container", "sizeToggle"]'>
                <span class="label">MD</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                data-toggler='["nds-sm", ".nds-radio-container", "sizeToggle"]'>
                <span class="label">SM</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["rowView", ".nds-radio-group", "layoutToggle"]'>
                <span class="label">RowView</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                <span class="label">Remove bg</span>
              </button>
            </div>
          </div>
          <div class="demo-container">
            <div class="state-demo">
              <fieldset class="nds-radio-group">
                <legend class="label">Choose your preferred contact method</legend>
                <div class="nds-form-container nds-radio-container">
                  <div class="nds-form-header">
                    <label for="demo-radio1">
                      <span class="label">Email</span>
                    </label>
                  </div>
                  <div class="nds-form-control">
                    <input type="radio" id="demo-radio1" name="contactMethod" value="email" class="nds-radio">
                  </div>
                </div>
                <div class="nds-form-container nds-radio-container">
                  <div class="nds-form-header">
                    <label for="demo-radio2">
                      <span class="label">Phone call</span>
                      <span class="info">We'll call you during business hours (9 AM - 5 PM)</span>
                    </label>
                  </div>
                  <div class="nds-form-control">
                    <input type="radio" id="demo-radio2" name="contactMethod" value="phone" checked
                      class="nds-radio primary">
                  </div>
                </div>
                <div class="nds-form-container nds-radio-container">
                  <div class="nds-form-header">
                    <label for="demo-radio3">
                      <span class="label">Text message</span>
                    </label>
                  </div>
                  <div class="nds-form-control">
                    <input type="radio" id="demo-radio3" name="contactMethod" value="sms" class="nds-radio">
                  </div>
                </div>
                <div class="nds-form-container nds-radio-container">
                  <div class="nds-form-header">
                    <label for="demo-radio4">
                      <span class="label">No contact</span>
                    </label>
                  </div>
                  <div class="nds-form-control">
                    <input type="radio" id="demo-radio4" name="contactMethod" value="none" disabled class="nds-radio">
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
          <div class="demo-code">
          <div class="nds-tabs nds-code nds-divided" hidden>
            <div class="nds-tab-list-container">
              <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                  aria-controls="panel-radio-group-1" id="tab-radio-group-1">
                  <span class="nds-tab-label">HTML</span>
                </button>
              </nav>
                <button class="nds-btn nds-subtle nds-tab showMore" aria-label="Show more"><i
                    class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                </button>
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
                <fieldset class="nds-radio-group">
                  <legend class="label">Choose your preferred contact method</legend>
                  <div class="nds-form-container nds-radio-container">
                    <div class="nds-form-header">
                      <label for="radio1">
                        <span class="label">Email</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <input type="radio" id="radio1" name="contactMethod" value="email" class="nds-radio">
                    </div>
                  </div>
                  <div class="nds-form-container nds-radio-container">
                    <div class="nds-form-header">
                      <label for="radio2">
                        <span class="label">Phone call</span>
                        <span class="info">We'll call you during business hours (9 AM - 5 PM)</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <input type="radio" id="radio2" name="contactMethod" value="phone" checked class="nds-radio primary">
                    </div>
                  </div>
                  <div class="nds-form-container nds-radio-container">
                    <div class="nds-form-header">
                      <label for="radio3">
                        <span class="label">Text message</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <input type="radio" id="radio3" name="contactMethod" value="sms" class="nds-radio">
                    </div>
                  </div>
                  <div class="nds-form-container nds-radio-container">
                    <div class="nds-form-header">
                      <label for="radio4">
                        <span class="label">No contact</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <input type="radio" id="radio4" name="contactMethod" value="none" disabled class="nds-radio">
                    </div>
                  </div>
                </fieldset>
                  </code>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>

        <!-- Radio Group Validation -->
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Group Validation</div>
            <div class="demo-action">
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["data-required", ".nds-radio-group", "requiredToggle", "attr"]'>
                <span class="label">Required</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["disabled", ".nds-radio-group", "disabledToggle", "data-state"]'>
                <span class="label">Disabled</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["rowView", ".nds-radio-group", "layoutToggle"]'>
                <span class="label">RowView</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                <span class="label">Remove bg</span>
              </button>
            </div>
          </div>
          <div class="demo-container">
            <div class="state-demo">
              <fieldset class="nds-radio-group" data-required id="demo-radio-validation">
                <legend class="label">Select your subscription plan (required)</legend>
                <div class="nds-form-container nds-radio-container">
                  <div class="nds-form-header">
                    <label for="demo-valid-radio1">
                      <span class="label">Free Plan</span>
                      <span class="info">Basic features, no cost</span>
                    </label>
                  </div>
                  <div class="nds-form-control">
                    <input type="radio" id="demo-valid-radio1" name="subscription-plan" value="free" class="nds-radio">
                  </div>
                </div>
                <div class="nds-form-container nds-radio-container">
                  <div class="nds-form-header">
                    <label for="demo-valid-radio2">
                      <span class="label">Pro Plan</span>
                      <span class="info">Advanced features, $9.99/month</span>
                    </label>
                  </div>
                  <div class="nds-form-control">
                    <input type="radio" id="demo-valid-radio2" name="subscription-plan" value="pro" class="nds-radio">
                  </div>
                </div>
                <div class="nds-form-container nds-radio-container">
                  <div class="nds-form-header">
                    <label for="demo-valid-radio3">
                      <span class="label">Enterprise Plan</span>
                      <span class="info">Full features, custom pricing</span>
                    </label>
                  </div>
                  <div class="nds-form-control">
                    <input type="radio" id="demo-valid-radio3" name="subscription-plan" value="enterprise"
                      class="nds-radio">
                  </div>
                </div>
                <!-- Group-level feedback -->
                <span class="nds-feedback nds-outline nds-sm">
                  <span class="nds-feedback-icon">
                    <i class="hgi hgi-stroke icon"></i>
                  </span>
                  <span class="msg">Please select a subscription plan</span>
                </span>
              </fieldset>
              <div style="margin-top: var(--spacing-lg);">
                <button class="nds-btn nds-primary nds-sm" id="set-radio-error-btn">
                  <span class="label">Set Error</span>
                </button>
                <button class="nds-btn nds-secondary-solid nds-sm" id="set-radio-success-btn">
                  <span class="label">Set Success</span>
                </button>
                <button class="nds-btn nds-subtle nds-sm" id="clear-radio-btn">
                  <span class="label">Clear Status</span>
                </button>
              </div>
            </div>
          </div>
          <div class="demo-code">
          <div class="nds-tabs nds-code nds-divided" hidden>
            <div class="nds-tab-list-container">
              <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                  aria-controls="panel-radio-validation-1" id="tab-radio-validation-1">
                  <span class="nds-tab-label">HTML</span>
                </button>
                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                  aria-controls="panel-radio-validation-2" id="tab-radio-validation-2">
                  <span class="nds-tab-label">JavaScript</span>
                </button>
              </nav>
                <button class="nds-btn nds-subtle nds-tab showMore" aria-label="Show more"><i
                    class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                </button>
            </div>
            <div class="nds-tab-content">
              <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-radio-validation-1"
                aria-labelledby="tab-radio-validation-1">
                <div class="nds-code-action">
                  <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                  </button>
                </div>
                <div class="nds-expandable-content">
                  <code class="lang-html code">
<fieldset class="nds-radio-group" data-status="error">
  <legend class="label">Select your subscription plan</legend>
  <div class="nds-form-container nds-radio-container">
    <div class="nds-form-header">
      <label for="radio1">
        <span class="label">Free Plan</span>
        <span class="info">Basic features, no cost</span>
      </label>
    </div>
    <div class="nds-form-control">
      <input type="radio" id="radio1" name="subscription" value="free" class="nds-radio">
    </div>
  </div>
  <!-- More radio buttons... -->

  <!-- Group-level feedback (shown when validation fails) -->
  <span class="nds-feedback nds-outline nds-sm" data-status="error">
    <span class="nds-feedback-icon">
      <i class="hgi hgi-stroke icon"></i>
    </span>
    <span class="msg">Please select a subscription plan</span>
  </span>
</fieldset>
                  </code>
                </div>
              </div>
              <div class="nds-tab-panel code-example nds-expandable hidden" role="tabpanel"
                id="panel-radio-validation-2" aria-labelledby="tab-radio-validation-2">
                <div class="nds-code-action">
                  <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                  </button>
                </div>
                <div class="nds-expandable-content">
                  <code class="lang-javascript code">
// Set error status on radio group
var group = document.querySelector('.nds-radio-group');
NDS.Forms.setStatus(group, 'error', 'Please select a subscription plan');

// Set success status
NDS.Forms.setStatus(group, 'success', 'Plan selected successfully');

// Clear status
NDS.Forms.clearStatus(group);

// Get current status
var status = NDS.Forms.getStatus(group);
// Returns: { status: 'error', message: '...', isValid: false }

// Validate radio selection manually
var radios = group.querySelectorAll('input[type="radio"]');
var isSelected = Array.from(radios).some(r => r.checked);

if (!isSelected) {
  NDS.Forms.setStatus(group, 'error', 'Please select an option');
}
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

<script>
  document.addEventListener('DOMContentLoaded', function () {
    // Radio Group Validation Demo
    var setErrorBtn = document.getElementById('set-radio-error-btn');
    var setSuccessBtn = document.getElementById('set-radio-success-btn');
    var clearBtn = document.getElementById('clear-radio-btn');
    var group = document.getElementById('demo-radio-validation');

    if (setErrorBtn && group) {
      setErrorBtn.addEventListener('click', function () {
        NDS.Forms.setStatus(group, 'error', 'Please select a subscription plan');
      });
    }

    if (setSuccessBtn && group) {
      setSuccessBtn.addEventListener('click', function () {
        NDS.Forms.setStatus(group, 'success', 'Plan selected successfully');
      });
    }

    if (clearBtn && group) {
      clearBtn.addEventListener('click', function () {
        NDS.Forms.clearStatus(group);
      });
    }
  });
</script>