---
layout: page
title: Checkbox
hero_title: Checkbox - National Design System
hero_description: Multi-selection input controls with clear visual states and accessibility support
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Checkbox Overview -->
<section id="checkboxOverview" class="nds-content-section">
  <div class="nds-section-content-container">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Checkbox Component</h2>
      <p class="nds-section-description">
        Multi-selection checkboxes for allowing users to select multiple options from a list
      </p>
    </div>
    <div class="nds-section-content">
      <div class="form-showcase">

        <!-- Single Checkbox -->
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Single Checkbox</div>
            <div class="demo-action">
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["nds-lg", ".nds-check-container", "sizeToggle"]'>
                <span class="label">LG</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["nds-md", ".nds-check-container", "sizeToggle"]'>
                <span class="label">MD</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                data-toggler='["nds-sm", ".nds-check-container", "sizeToggle"]'>
                <span class="label">SM</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["nds-neutral", ".nds-check", "variantToggle"]'>
                <span class="label">Neutral</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["indeterminate", ".nds-check", "stateToggle"]'>
                <span class="label">Indeterminate</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["disabled", "input[type=checkbox]", "stateToggle", "attr"]'>
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
              <div class="nds-form-container nds-check-container">
                <div class="nds-form-header">
                  <label for="demo-checkbox-single">
                    <span class="label">I agree to the terms and conditions</span>
                    <span class="info">You must accept our terms to continue with the registration</span>
                  </label>
                </div>
                <div class="nds-form-control">
                  <input type="checkbox" id="demo-checkbox-single" name="agreement" value="accepted" class="nds-check">
                </div>
              </div>
            </div>
          </div>
          <div class="nds-tabs nds-code withDivider">
            <div class="nds-tab-list-container">
              <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                  aria-controls="panel-checkbox-single-1" id="tab-checkbox-single-1">
                  <span class="nds-tab-label">HTML</span>
                </button>
                <button class="nds-btn nds-subtle nds-tab showMore"><i
                    class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
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
                <div class="nds-form-container nds-check-container">
                  <div class="nds-form-header">
                    <label for="checkbox-single">
                      <span class="label">I agree to the terms and conditions</span>
                      <span class="info">You must accept our terms to continue with the registration</span>
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

        <!-- Checkbox Group -->
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Checkbox Group</div>
            <div class="demo-action">
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["nds-lg", ".nds-check-container", "sizeToggle"]'>
                <span class="label">LG</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["nds-md", ".nds-check-container", "sizeToggle"]'>
                <span class="label">MD</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                data-toggler='["nds-sm", ".nds-check-container", "sizeToggle"]'>
                <span class="label">SM</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["disabled", "input[type=checkbox]", "stateToggle", "attr"]'>
                <span class="label">Disabled</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["rowView", ".nds-check-group", "layoutToggle"]'>
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
              <fieldset>
                <legend class="label">Select your interests</legend>
                <div class="nds-check-group">
                  <div class="nds-form-container nds-check-container">
                    <div class="nds-form-header">
                      <label for="demo-checkbox1">
                        <span class="label">Technology</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <input type="checkbox" id="demo-checkbox1" name="interests" value="technology" class="nds-check">
                    </div>
                  </div>
                  <div class="nds-form-container nds-check-container">
                    <div class="nds-form-header">
                      <label for="demo-checkbox2">
                        <span class="label">Sports</span>
                        <span class="info">Include all sports and fitness activities</span>
                        <span class="nds-feedback error">
                          <span class="nds-feedback-icon nds-error nds-outline nds-sm">
                            <i class="hgi hgi-solid icon"></i>
                          </span>
                          <span class="msg">Please select at least one interest</span>
                        </span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <input type="checkbox" id="demo-checkbox2" name="interests" value="sports"
                        class="nds-check primary">
                    </div>
                  </div>
                  <div class="nds-form-container nds-check-container">
                    <div class="nds-form-header">
                      <label for="demo-checkbox3">
                        <span class="label">Entertainment</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <input type="checkbox" id="demo-checkbox3" name="interests" value="entertainment"
                        class="nds-check indeterminate">
                    </div>
                  </div>
                  <div class="nds-form-container nds-check-container">
                    <div class="nds-form-header">
                      <label for="demo-checkbox4">
                        <span class="label">Education</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <input type="checkbox" id="demo-checkbox4" name="interests" value="education" checked
                        class="nds-check">
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
          <div class="nds-tabs nds-code withDivider">
            <div class="nds-tab-list-container">
              <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                  aria-controls="panel-checkbox-group-1" id="tab-checkbox-group-1">
                  <span class="nds-tab-label">HTML</span>
                </button>
                <button class="nds-btn nds-subtle nds-tab showMore"><i
                    class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                </button>
              </nav>
            </div>
            <div class="nds-tab-content">
              <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-checkbox-group-1"
                aria-labelledby="tab-checkbox-group-1">
                <div class="nds-code-action">
                  <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                  </button>
                </div>
                <div class="nds-expandable-content">
                  <code class="lang-html code">
                <fieldset class="nds-check-group">
                  <legend class="label">Select your interests</legend>
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
                  <div class="nds-form-container nds-check-container">
                    <div class="nds-form-header">
                      <label for="checkbox2">
                        <span class="label">Sports</span>
                        <span class="info">Include all sports and fitness activities</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <input type="checkbox" id="checkbox2" name="interests" value="sports" class="nds-check primary">
                    </div>
                  </div>
                  <div class="nds-form-container nds-check-container">
                    <div class="nds-form-header">
                      <label for="checkbox3">
                        <span class="label">Entertainment</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <input type="checkbox" id="checkbox3" name="interests" value="entertainment" class="nds-check indeterminate">
                    </div>
                  </div>
                  <div class="nds-form-container nds-check-container">
                    <div class="nds-form-header">
                      <label for="checkbox4">
                        <span class="label">Education</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <input type="checkbox" id="checkbox4" name="interests" value="education" checked class="nds-check">
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
    </div>
  </div>
</section>