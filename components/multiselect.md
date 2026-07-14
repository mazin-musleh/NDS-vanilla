---
layout: page
title: Multiselect
hero_title: Multiselect - National Design System
hero_description: A form field for picking multiple options from grouped lists, with selections shown as removable chips and submitted natively as a checkbox array.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Grouped Options -->
<section id="multiselectDefault" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Grouped Options</h2>
            <p class="nds-section-description">Checkboxes live inside labeled fieldsets and are the source of truth, submitting with the form as a native checkbox array. With the Apply button (shown here) toggles stage in the panel and commit on Apply — filter-style; drop the button and every toggle commits instantly.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card" data-code-rebuild>
                    <div class="demo-header">
                        <div class="demo-label">Multi-option select</div>
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">State</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-form-container.nds-multiselect", "msState"]'>
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-required", ".nds-form-container.nds-multiselect", "msState", "attr"]'>
                                            <span class="nds-label">Required</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["disabled", ".nds-form-container.nds-multiselect", "msState", "data-state"]'>
                                            <span class="nds-label">Disabled</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["readonly", ".nds-form-container.nds-multiselect", "msState", "data-state"]'>
                                            <span class="nds-label">Readonly</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-form-container nds-multiselect" data-multiselect-name="interests">
                                <div class="nds-form-header">
                                    <label><span class="nds-label">Interests</span></label>
                                </div>
                                <div class="nds-form-control">
                                    <div class="nds-form-action nds-prefix nds-dropmenu" data-multiselect-dropmenu>
                                        <button class="nds-btn nds-subtle nds-menu-btn nds-dropmenu-trigger" type="button">
                                            <i class="nds-icon nds-hgi-menu-01" aria-hidden="true"></i>
                                            <span class="nds-label">Select</span>
                                        </button>
                                        <div class="nds-dropmenu-menu" hidden>
                                            <div class="nds-dropmenu-scroll">
                                                <fieldset class="nds-form-group nds-check-group nds-dropmenu-group" data-no-auto-close>
                                                    <legend class="nds-label">Technology</legend>
                                                    <div class="nds-form-container nds-check-container">
                                                        <div class="nds-form-header">
                                                            <label for="ms-default-ai"><span class="nds-label">AI &amp; ML</span></label>
                                                        </div>
                                                        <div class="nds-form-control">
                                                            <input type="checkbox" id="ms-default-ai" class="nds-check" name="interests[]" value="ai" data-label="AI &amp; ML" checked>
                                                        </div>
                                                    </div>
                                                    <div class="nds-form-container nds-check-container">
                                                        <div class="nds-form-header">
                                                            <label for="ms-default-cloud"><span class="nds-label">Cloud</span></label>
                                                        </div>
                                                        <div class="nds-form-control">
                                                            <input type="checkbox" id="ms-default-cloud" class="nds-check" name="interests[]" value="cloud" data-label="Cloud">
                                                        </div>
                                                    </div>
                                                    <div class="nds-form-container nds-check-container">
                                                        <div class="nds-form-header">
                                                            <label for="ms-default-security"><span class="nds-label">Cybersecurity</span></label>
                                                        </div>
                                                        <div class="nds-form-control">
                                                            <input type="checkbox" id="ms-default-security" class="nds-check" name="interests[]" value="security" data-label="Cybersecurity">
                                                        </div>
                                                    </div>
                                                </fieldset>
                                                <hr class="nds-divider">
                                                <fieldset class="nds-form-group nds-check-group nds-dropmenu-group" data-no-auto-close>
                                                    <legend class="nds-label">Design</legend>
                                                    <div class="nds-form-container nds-check-container">
                                                        <div class="nds-form-header">
                                                            <label for="ms-default-ux"><span class="nds-label">UX Research</span></label>
                                                        </div>
                                                        <div class="nds-form-control">
                                                            <input type="checkbox" id="ms-default-ux" class="nds-check" name="interests[]" value="ux" data-label="UX Research" checked>
                                                        </div>
                                                    </div>
                                                    <div class="nds-form-container nds-check-container">
                                                        <div class="nds-form-header">
                                                            <label for="ms-default-brand"><span class="nds-label">Brand Identity</span></label>
                                                        </div>
                                                        <div class="nds-form-control">
                                                            <input type="checkbox" id="ms-default-brand" class="nds-check" name="interests[]" value="brand" data-label="Brand Identity">
                                                        </div>
                                                    </div>
                                                    <div class="nds-form-container nds-check-container">
                                                        <div class="nds-form-header">
                                                            <label for="ms-default-motion"><span class="nds-label">Motion</span></label>
                                                        </div>
                                                        <div class="nds-form-control">
                                                            <input type="checkbox" id="ms-default-motion" class="nds-check" name="interests[]" value="motion" data-label="Motion">
                                                        </div>
                                                    </div>
                                                </fieldset>
                                            </div>
                                            <div class="nds-dropmenu-footer">
                                                <hr class="nds-divider">
                                                <div class="nds-dropmenu-action nds-grid">
                                                    <button class="nds-btn nds-secondary nds-dropmenu-item" type="button" data-multiselect-action="reset" data-no-auto-close>
                                                        <span class="nds-label">Reset</span>
                                                    </button>
                                                    <button class="nds-btn nds-primary nds-dropmenu-item" type="button" data-multiselect-action="apply">
                                                        <span class="nds-label">Apply</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="nds-chips nds-multiselect-chips" data-multiselect-chips></div>
                                    <span class="nds-multiselect-placeholder">Select options&hellip;</span>
                                </div>
                                <div class="nds-form-footer" data-feedback-target hidden></div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-multiselect-default-1" id="tab-multiselect-default-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-multiselect-default-1"
                                    aria-labelledby="tab-multiselect-default-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;div class="nds-form-container nds-multiselect" data-multiselect-name="interests"&gt;
  &lt;div class="nds-form-header"&gt;
    &lt;label&gt;&lt;span class="nds-label"&gt;Interests&lt;/span&gt;&lt;/label&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-control"&gt;
    &lt;div class="nds-form-action nds-prefix nds-dropmenu" data-multiselect-dropmenu&gt;
      &lt;button class="nds-btn nds-subtle nds-menu-btn nds-dropmenu-trigger" type="button"&gt;
        &lt;i class="nds-icon nds-hgi-menu-01" aria-hidden="true"&gt;&lt;/i&gt;
        &lt;span class="nds-label"&gt;Select&lt;/span&gt;
      &lt;/button&gt;
      &lt;div class="nds-dropmenu-menu" hidden&gt;
        &lt;div class="nds-dropmenu-scroll"&gt;
          &lt;fieldset class="nds-form-group nds-check-group nds-dropmenu-group" data-no-auto-close&gt;
            &lt;legend class="nds-label"&gt;Technology&lt;/legend&gt;
            &lt;!-- checked = pre-selected (server-rendered restore works the same way) --&gt;
            &lt;div class="nds-form-container nds-check-container"&gt;
              &lt;div class="nds-form-header"&gt;
                &lt;label for="ms-default-ai"&gt;&lt;span class="nds-label"&gt;AI &amp;amp; ML&lt;/span&gt;&lt;/label&gt;
              &lt;/div&gt;
              &lt;div class="nds-form-control"&gt;
                &lt;input type="checkbox" id="ms-default-ai" class="nds-check" name="interests[]" value="ai" data-label="AI &amp;amp; ML" checked&gt;
              &lt;/div&gt;
            &lt;/div&gt;
            &lt;div class="nds-form-container nds-check-container"&gt;
              &lt;div class="nds-form-header"&gt;
                &lt;label for="ms-default-cloud"&gt;&lt;span class="nds-label"&gt;Cloud&lt;/span&gt;&lt;/label&gt;
              &lt;/div&gt;
              &lt;div class="nds-form-control"&gt;
                &lt;input type="checkbox" id="ms-default-cloud" class="nds-check" name="interests[]" value="cloud" data-label="Cloud"&gt;
              &lt;/div&gt;
            &lt;/div&gt;
            &lt;div class="nds-form-container nds-check-container"&gt;
              &lt;div class="nds-form-header"&gt;
                &lt;label for="ms-default-security"&gt;&lt;span class="nds-label"&gt;Cybersecurity&lt;/span&gt;&lt;/label&gt;
              &lt;/div&gt;
              &lt;div class="nds-form-control"&gt;
                &lt;input type="checkbox" id="ms-default-security" class="nds-check" name="interests[]" value="security" data-label="Cybersecurity"&gt;
              &lt;/div&gt;
            &lt;/div&gt;
          &lt;/fieldset&gt;
          &lt;hr class="nds-divider"&gt;
          &lt;fieldset class="nds-form-group nds-check-group nds-dropmenu-group" data-no-auto-close&gt;
            &lt;legend class="nds-label"&gt;Design&lt;/legend&gt;
            &lt;div class="nds-form-container nds-check-container"&gt;
              &lt;div class="nds-form-header"&gt;
                &lt;label for="ms-default-ux"&gt;&lt;span class="nds-label"&gt;UX Research&lt;/span&gt;&lt;/label&gt;
              &lt;/div&gt;
              &lt;div class="nds-form-control"&gt;
                &lt;input type="checkbox" id="ms-default-ux" class="nds-check" name="interests[]" value="ux" data-label="UX Research" checked&gt;
              &lt;/div&gt;
            &lt;/div&gt;
            &lt;div class="nds-form-container nds-check-container"&gt;
              &lt;div class="nds-form-header"&gt;
                &lt;label for="ms-default-brand"&gt;&lt;span class="nds-label"&gt;Brand Identity&lt;/span&gt;&lt;/label&gt;
              &lt;/div&gt;
              &lt;div class="nds-form-control"&gt;
                &lt;input type="checkbox" id="ms-default-brand" class="nds-check" name="interests[]" value="brand" data-label="Brand Identity"&gt;
              &lt;/div&gt;
            &lt;/div&gt;
            &lt;div class="nds-form-container nds-check-container"&gt;
              &lt;div class="nds-form-header"&gt;
                &lt;label for="ms-default-motion"&gt;&lt;span class="nds-label"&gt;Motion&lt;/span&gt;&lt;/label&gt;
              &lt;/div&gt;
              &lt;div class="nds-form-control"&gt;
                &lt;input type="checkbox" id="ms-default-motion" class="nds-check" name="interests[]" value="motion" data-label="Motion"&gt;
              &lt;/div&gt;
            &lt;/div&gt;
          &lt;/fieldset&gt;
        &lt;/div&gt;
        &lt;div class="nds-dropmenu-footer"&gt;
          &lt;hr class="nds-divider"&gt;
          &lt;div class="nds-dropmenu-action nds-grid"&gt;
            &lt;button class="nds-btn nds-secondary nds-dropmenu-item" type="button" data-multiselect-action="reset" data-no-auto-close&gt;
              &lt;span class="nds-label"&gt;Reset&lt;/span&gt;
            &lt;/button&gt;
            &lt;!-- Apply button = staged commit (filter UX). Omit it and
                 every checkbox toggle commits instantly instead. --&gt;
            &lt;button class="nds-btn nds-primary nds-dropmenu-item" type="button" data-multiselect-action="apply"&gt;
              &lt;span class="nds-label"&gt;Apply&lt;/span&gt;
            &lt;/button&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-chips nds-multiselect-chips" data-multiselect-chips&gt;&lt;/div&gt;
    &lt;span class="nds-multiselect-placeholder"&gt;Select options&amp;hellip;&lt;/span&gt;
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

<!-- Validation -->
<section id="multiselectValidation" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Validation</h2>
            <p class="nds-section-description">Min/max selection constraints set on the wrapper and enforced on submit — always against the applied set, never a staged draft. Once an error shows, it clears live as the selection changes.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Select 2&ndash;4 options</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <form class="nds-form nds-grid" style="--max-col:1" onsubmit="return false">
                                <div class="nds-form-container nds-multiselect" data-multiselect-name="valid-interests" data-min-checked="2" data-max-checked="4">
                                    <div class="nds-form-header">
                                        <label><span class="nds-label">Interests</span></label>
                                    </div>
                                    <div class="nds-form-control">
                                        <div class="nds-form-action nds-prefix nds-dropmenu" data-multiselect-dropmenu>
                                            <button class="nds-btn nds-subtle nds-menu-btn nds-dropmenu-trigger" type="button">
                                                <i class="nds-icon nds-hgi-menu-01" aria-hidden="true"></i>
                                                <span class="nds-label">Select</span>
                                            </button>
                                            <div class="nds-dropmenu-menu" hidden>
                                                <div class="nds-dropmenu-scroll">
                                                    <fieldset class="nds-form-group nds-check-group nds-dropmenu-group" data-no-auto-close>
                                                        <legend class="nds-label">Interests</legend>
                                                        <div class="nds-form-container nds-check-container">
                                                            <div class="nds-form-header">
                                                                <label for="ms-valid-ai"><span class="nds-label">AI &amp; ML</span></label>
                                                            </div>
                                                            <div class="nds-form-control">
                                                                <input type="checkbox" id="ms-valid-ai" class="nds-check" name="valid-interests[]" value="ai" data-label="AI &amp; ML">
                                                            </div>
                                                        </div>
                                                        <div class="nds-form-container nds-check-container">
                                                            <div class="nds-form-header">
                                                                <label for="ms-valid-cloud"><span class="nds-label">Cloud</span></label>
                                                            </div>
                                                            <div class="nds-form-control">
                                                                <input type="checkbox" id="ms-valid-cloud" class="nds-check" name="valid-interests[]" value="cloud" data-label="Cloud">
                                                            </div>
                                                        </div>
                                                        <div class="nds-form-container nds-check-container">
                                                            <div class="nds-form-header">
                                                                <label for="ms-valid-security"><span class="nds-label">Cybersecurity</span></label>
                                                            </div>
                                                            <div class="nds-form-control">
                                                                <input type="checkbox" id="ms-valid-security" class="nds-check" name="valid-interests[]" value="security" data-label="Cybersecurity">
                                                            </div>
                                                        </div>
                                                        <div class="nds-form-container nds-check-container">
                                                            <div class="nds-form-header">
                                                                <label for="ms-valid-ux"><span class="nds-label">UX Research</span></label>
                                                            </div>
                                                            <div class="nds-form-control">
                                                                <input type="checkbox" id="ms-valid-ux" class="nds-check" name="valid-interests[]" value="ux" data-label="UX Research">
                                                            </div>
                                                        </div>
                                                        <div class="nds-form-container nds-check-container">
                                                            <div class="nds-form-header">
                                                                <label for="ms-valid-motion"><span class="nds-label">Motion</span></label>
                                                            </div>
                                                            <div class="nds-form-control">
                                                                <input type="checkbox" id="ms-valid-motion" class="nds-check" name="valid-interests[]" value="motion" data-label="Motion">
                                                            </div>
                                                        </div>
                                                    </fieldset>
                                                </div>
                                                <div class="nds-dropmenu-footer">
                                                    <hr class="nds-divider">
                                                    <div class="nds-dropmenu-action nds-grid">
                                                        <button class="nds-btn nds-secondary nds-dropmenu-item" type="button" data-multiselect-action="reset" data-no-auto-close>
                                                            <span class="nds-label">Reset</span>
                                                        </button>
                                                        <button class="nds-btn nds-primary nds-dropmenu-item" type="button" data-multiselect-action="apply">
                                                            <span class="nds-label">Apply</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="nds-chips nds-multiselect-chips" data-multiselect-chips></div>
                                        <span class="nds-multiselect-placeholder">Select 2&ndash;4 options&hellip;</span>
                                    </div>
                                    <div class="nds-form-footer" data-feedback-target hidden></div>
                                </div>
                                <button class="nds-btn nds-primary nds-sm" type="submit">
                                    <span class="nds-label">Submit</span>
                                </button>
                            </form>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-multiselect-validation-1" id="tab-multiselect-validation-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-multiselect-validation-1"
                                    aria-labelledby="tab-multiselect-validation-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;form class="nds-form"&gt;
  &lt;!-- data-min-checked / data-max-checked bound the checked count;
       data-required alone is shorthand for min = 1 --&gt;
  &lt;div class="nds-form-container nds-multiselect" data-multiselect-name="interests"
       data-min-checked="2" data-max-checked="4"&gt;
    &lt;!-- same markup as Grouped Options above: header label, dropmenu
         trigger + panel with option checkboxes, chip track, placeholder --&gt;
    &lt;div class="nds-form-footer" data-feedback-target hidden&gt;&lt;/div&gt;
  &lt;/div&gt;
  &lt;button class="nds-btn nds-primary" type="submit"&gt;
    &lt;span class="nds-label"&gt;Submit&lt;/span&gt;
  &lt;/button&gt;
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
</section>

<!-- Built-in Features -->
<section id="multiselectFeatures" class="nds-content-section nds-demo-section">
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
                    <p class="nds-item-desc">Any <code class="nds-inline-code lang-html">.nds-multiselect</code> on the page wires up on load. The inner dropmenu boots itself so the trigger, panel, and keyboard flow work without extra JS.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-refresh"></i>
                        <span class="nds-label">Staged or Instant Commit</span>
                    </span>
                    <p class="nds-item-desc">A footer button with <code class="nds-inline-code lang-html">data-multiselect-action="apply"</code> switches the field to filter-style staging: toggles stage in the open panel, Apply commits them (chips, summary, change event), and closing without Apply discards. Without the button, every toggle commits instantly. Submitting mid-staging always posts and validates the applied set.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-source-code"></i>
                        <span class="nds-label">Declarative Options</span>
                    </span>
                    <p class="nds-item-desc"><code class="nds-inline-code lang-html">data-multiselect-options</code> builds the option rows from JSON — a flat array, a <code class="nds-inline-code lang-js">{value: label}</code> map, or a grouped <code class="nds-inline-code lang-js">{legend: {value: label}}</code> object — and <code class="nds-inline-code lang-html">data-multiselect-selected</code> pre-checks values. <code class="nds-inline-code lang-js">populate(options, selected)</code> does the same at runtime for fetched data.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-tag-01"></i>
                        <span class="nds-label">Removable Chips</span>
                    </span>
                    <p class="nds-item-desc">Selected values render as chips inside the form-control. Clicking a chip unchecks the option and fires a change event immediately, no need to reopen the panel.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-file-validation"></i>
                        <span class="nds-label">Native Form Submission</span>
                    </span>
                    <p class="nds-item-desc">Each option checkbox carries <code class="nds-inline-code lang-html">name="field[]"</code> and its own <code class="nds-inline-code lang-html">value</code>, so the browser posts the checked set as an array with zero extra wiring. <code class="nds-inline-code lang-html">data-multiselect-name</code> on the wrapper auto-fills any checkbox missing a name.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-keyboard"></i>
                        <span class="nds-label">Full Keyboard Navigation</span>
                    </span>
                    <p class="nds-item-desc">Arrow keys walk the checkboxes, Space toggles, and Escape closes the panel and returns focus to the trigger. Removing a chip hands focus to the next chip, or back to the trigger when it was the last. A visible focus ring follows each option.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-database-01"></i>
                        <span class="nds-label">Server-Rendered Restore</span>
                    </span>
                    <p class="nds-item-desc">Emit <code class="nds-inline-code lang-html">checked</code> on the persisted options — the standard checkbox restore — and the field renders their chips on init. No hidden carrier inputs, no inline JS.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-voice"></i>
                        <span class="nds-label">Screen-Reader Updates</span>
                    </span>
                    <p class="nds-item-desc">The trigger button's <code class="nds-inline-code lang-html">aria-label</code> reflects the current selection on every commit, so screen readers announce the selected values instead of the static button label. Every commit — instant toggle, Apply, chip removal, clear-all — also announces through the shared NDS live region in both English and Arabic.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-checkmark-badge-01"></i>
                        <span class="nds-label">Built-in Validation</span>
                    </span>
                    <p class="nds-item-desc">Set <code class="nds-inline-code lang-html">data-required</code>, <code class="nds-inline-code lang-html">data-min-checked</code>, or <code class="nds-inline-code lang-html">data-max-checked</code> on the wrapper and <code class="nds-inline-code lang-js">NDS.Forms.validateForm</code> enforces it, anchoring the error on the field. Once an error shows, it clears live as the selection changes.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-api"></i>
                        <span class="nds-label">Programmatic Control</span>
                    </span>
                    <p class="nds-item-desc">Every field exposes an instance on the DOM node with <code class="nds-inline-code lang-js">getSelected()</code>, <code class="nds-inline-code lang-js">apply()</code>, <code class="nds-inline-code lang-js">reset()</code>, <code class="nds-inline-code lang-js">removeValue()</code>, and <code class="nds-inline-code lang-js">populate()</code>. Listen for <code class="nds-inline-code lang-js">nds:multiselect:change</code> to react to committed selections.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="multiselectGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use multiselect for form fields where users pick <strong>several values from a list of ten or more options</strong> and benefit from seeing the applied set as chips they can remove individually</li>
                    <li>Group related options inside <code class="nds-inline-code lang-html">&lt;fieldset&gt;</code> elements with a <code class="nds-inline-code lang-html">&lt;legend&gt;</code>. Groups make long lists scannable and let assistive technology announce the category</li>
                    <li>For a short, flat list (three to six options) without a category axis, reach for a plain <a class="nds-color" href="{{ 'components/checkbox' | relative_url }}">Checkbox Group</a> instead. Multiselect's overhead (dropmenu trigger, panel, chip track) adds friction when the options fit inline</li>
                    <li>For a single-value choice, use <a class="nds-color" href="{{ 'components/radio' | relative_url }}">Radio Button</a> or the select-mode of <a class="nds-color" href="{{ 'components/dropmenu' | relative_url }}">Dropmenu</a>. Multiselect's chips-over-checkboxes pattern is wasted on single-pick fields</li>
                    <li>Give each option checkbox a <code class="nds-inline-code lang-html">name="field[]"</code> and <code class="nds-inline-code lang-html">value</code> so the browser posts the checked set natively — or set <code class="nds-inline-code lang-html">data-multiselect-name</code> once on the wrapper to auto-fill missing names. Unnamed checkboxes do not post</li>
                    <li>For long or server-driven option lists, skip the hand-written rows: declare <code class="nds-inline-code lang-html">data-multiselect-options</code> (grouped JSON) on the wrapper, or call <code class="nds-inline-code lang-js">populate()</code> with fetched data. Both build the same canonical markup</li>
                    <li>Keep the Apply button for fields where users explore many toggles before settling (matching the Filter pattern); drop it for short lists where instant chip feedback reads better</li>
                    <li>Set a meaningful <code class="nds-inline-code lang-html">data-label</code> on each checkbox so chip text stays readable when the surrounding label changes, wraps, or contains extra markup</li>
                    <li>Keep the placeholder short (two to four words). It shares the row with chips once any are applied, so a long placeholder fights for space</li>
                    <li>Add a <code class="nds-inline-code lang-html">&lt;hr class="nds-divider"&gt;</code> between fieldsets in the panel to make the grouping visually clear</li>
                    <li>For a server-rendered form re-displaying a saved selection (after a validation error, edit screen), emit <code class="nds-inline-code lang-html">checked</code> on the persisted options — the field renders their chips on init, no inline JS needed</li>
                    <li>To make the field mandatory or bound the selection size, set <code class="nds-inline-code lang-html">data-required</code>, <code class="nds-inline-code lang-html">data-min-checked</code>, or <code class="nds-inline-code lang-html">data-max-checked</code> on the wrapper — <code class="nds-inline-code lang-js">NDS.Forms.validateForm</code> enforces them like any checkbox group</li>
                    <li>When the number of selections carries meaning (quota, pricing tier), listen for <code class="nds-inline-code lang-js">nds:multiselect:change</code> and show a count or validation hint outside the field rather than overloading the placeholder</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-multiselect-name</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-multiselect</code>. Auto-fills <code class="nds-inline-code lang-html">name="name[]"</code> on any option checkbox missing a name, so the form posts the checked set as an array. Redundant when every checkbox already carries its own <code class="nds-inline-code lang-html">name</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-chip-class</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-multiselect</code>. Classes applied to generated chips. Defaults to <code class="nds-inline-code lang-html">nds-primary nds-sm</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-multiselect-dropmenu</code></td><td>Marks the wrapping <code class="nds-inline-code lang-html">.nds-form-action.nds-prefix.nds-dropmenu</code> as the host of the options panel</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-multiselect-chips</code></td><td>Marks the container that receives rendered chips. Required inside <code class="nds-inline-code lang-html">.nds-form-control</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-multiselect-options</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-multiselect</code>. JSON that builds the option rows into the (otherwise empty) menu: an array (value doubles as label), a <code class="nds-inline-code lang-js">{value: label}</code> map, or a grouped <code class="nds-inline-code lang-js">{legend: {value: label}}</code> object rendering one fieldset per key. Omit to hand-write the rows</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-multiselect-selected</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-multiselect</code> alongside <code class="nds-inline-code lang-html">data-multiselect-options</code>. JSON array of values to pre-check — the populated equivalent of the <code class="nds-inline-code lang-html">checked</code> attribute</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-multiselect-action</code></td><td>Set on footer buttons. <code class="nds-inline-code lang-html">reset</code> unchecks every option (staged-only while an Apply panel is open). <code class="nds-inline-code lang-html">apply</code> commits the staged set and switches the whole field to staged mode by its presence — toggles stage in the open panel, closing without Apply reverts them, and a form submit mid-staging posts the applied set</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-required</code> / <code class="nds-inline-code lang-html">data-min-checked</code> / <code class="nds-inline-code lang-html">data-max-checked</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-multiselect</code>. Validation rules enforced by <code class="nds-inline-code lang-js">NDS.Forms.validateForm</code>: <code class="nds-inline-code lang-html">data-required</code> means at least one option; min/max bound the checked count. The error anchors on the dropdown trigger and clears live once fixed</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-label</code></td><td>Set on each checkbox input. Overrides the visible label text when rendering chips, useful when the visible label contains extra markup or context</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-no-auto-close</code></td><td>Set on the checkbox fieldset and the Reset button so the dropmenu stays open while the user toggles options or resets</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-state~="filled"</code></td><td>Stamped on <code class="nds-inline-code lang-html">.nds-multiselect</code> by JS when at least one option is checked. Hides the placeholder via CSS. Removed when all values are cleared</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDS.Multiselect</strong> namespace initializes all <code class="nds-inline-code lang-html">.nds-multiselect</code> fields on load. Each instance lives on its DOM node as <code class="nds-inline-code lang-js">element.ndsMultiselect</code> and exposes methods for programmatic control. Listen for <code class="nds-inline-code lang-js">nds:multiselect:change</code> to react to committed selections.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// ── Initialize (auto-runs on load) ─────────────────────
// Call again after injecting multiselect HTML dynamically.
NDS.Multiselect.init();

// ── Re-initialize (alias of init) ─────────────────────
// Picks up any .nds-multiselect elements added to the DOM
// since the last init pass. Skips already-initialized roots.
NDS.Multiselect.reinit();

// ── Create an instance manually ────────────────────────
// Returns the NDSMultiselect instance. Useful for markup
// added after the initial page load.
const field = document.querySelector('.nds-multiselect');
NDS.Multiselect.create(field);

// ── Access the instance on a live field ────────────────
// Every auto-initialized root stores its instance here.
const instance = field.ndsMultiselect;

// ── Read the current selection ─────────────────────────
instance.getSelected();  // ['ai', 'ux']  // checked option values

// ── Commit, clear, or remove programmatically ──────────
instance.apply();               // commit the checked set (staged mode's
                                // Apply button calls this), emit change
instance.reset();               // uncheck every option, emit change
                                // (staged-only while an Apply panel is open)
instance.removeValue('cloud');  // uncheck one option, emit change

// ── Populate options at runtime ────────────────────────
// Same shapes as data-multiselect-options; replaces existing rows.
// Second argument pre-checks values. Emits no change event — setup,
// not input.
instance.populate(
    { riyadh: 'Riyadh', jeddah: 'Jeddah' },  // or array / grouped object
    ['riyadh']
);

// ── Tear down an instance ──────────────────────────────
// Releases listeners, clears the trigger aria-label, and unlocks
// the field for a fresh init. Call before removing the markup
// from the DOM in dynamic flows.
NDS.Multiselect.destroy(field);

// ── Listen for committed selection changes ─────────────
// Fires on every commit: each toggle in instant mode; Apply,
// chip removal, and committed reset in staged mode.
field.addEventListener('nds:multiselect:change', (e) => {
    const { name, values, labels } = e.detail;
    // name:   wrapper's data-multiselect-name ('' if unset)
    // values: array of checked option values
    // labels: array of display labels in the same order
});
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
