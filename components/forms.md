---
layout: page
title: Forms
hero_title: Forms - National Design System
hero_description: Text, number, search, email, password, textarea, and select inputs with validation, status feedback, and interactive controls
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Text Input -->
<section id="textInput" class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Text Input</h2>
      <p class="nds-section-description">Standard single-line text field with clear button and validation feedback</p>
    </div>
    <div class="nds-section-content">
      <div class="nds-showcase">
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-action">
              <div class="nds-dropmenu demo-toggle-menu">
                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                  <span class="label">State</span>
                </button>
                <div class="nds-dropmenu-menu" hidden>
                  <div class="nds-dropmenu-scroll">
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["data-required", ".nds-form-container", "formState", "attr"]'>
                      <span class="label">Required</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["disabled", ".nds-form-container", "formState", "data-state"]'>
                      <span class="label">Disabled</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["readonly", ".nds-form-container", "formState", "data-state"]'>
                      <span class="label">Readonly</span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="nds-dropmenu demo-toggle-menu">
                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                  <span class="label">LG</span>
                </button>
                <div class="nds-dropmenu-menu" hidden>
                  <div class="nds-dropmenu-scroll">
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn selected"
                      data-toggler='["nds-lg", ".nds-form-container", "formSize"]'>
                      <span class="label">LG</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["nds-md", ".nds-form-container", "formSize"]'>
                      <span class="label">MD</span>
                    </button>
                  </div>
                </div>
              </div>
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                <span class="label">Remove bg</span>
              </button>
            </div>
          </div>
          <div class="demo-container">
            <div class="state-demo">
              <div class="nds-form-container">
                <div class="nds-form-header">
                  <label for="demo-textInput">
                    <span class="label">Full Name</span>
                  </label>
                </div>
                <div class="nds-form-control">
                  <input type="text" id="demo-textInput" class="nds-input" placeholder="Enter your full name...">
                  <div class="nds-form-action">
                    <button class="nds-btn nds-subtle nds-clear" type="button" aria-label="Clear input" hidden>
                      <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
                    </button>
                  </div>
                </div>
                <div class="nds-form-footer" data-feedback-target hidden></div>
              </div>
            </div>
          </div>
          <div class="demo-code">
            <div class="nds-tabs nds-code nds-divided" hidden>
              <div class="nds-tab-list-container">
                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                  <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                    aria-controls="panel-text-input-1" id="tab-text-input-1">
                    <span class="nds-tab-label">HTML</span>
                  </button>
                </nav>
              </div>
              <div class="nds-tab-content">
                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-text-input-1"
                  aria-labelledby="tab-text-input-1">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>
                  <div class="nds-expandable-content">
                    <code class="lang-html code">
<div class="nds-form-container">
  <div class="nds-form-header">
    <label for="text-input-1">
      <span class="label">Full Name</span>
    </label>
  </div>
  <div class="nds-form-control">
    <input type="text" id="text-input-1" class="nds-input" placeholder="Enter your full name...">
    <div class="nds-form-action">
      <button class="nds-btn nds-subtle nds-clear" type="button" aria-label="Clear input" hidden>
        <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
      </button>
    </div>
  </div>
  <div class="nds-form-footer" data-feedback-target hidden></div>
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

<!-- Prefix & Suffix -->
<section id="prefixSuffix" class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Prefix & Suffix</h2>
      <p class="nds-section-description">Text input with inline prefix and suffix labels inside the form control</p>
    </div>
    <div class="nds-section-content">
      <div class="nds-showcase">
        <div class="nds-demo-card" data-code-rebuild>
          <div class="demo-header">
            <div class="demo-action">
              <div class="nds-dropmenu demo-toggle-menu">
                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                  <span class="label">State</span>
                </button>
                <div class="nds-dropmenu-menu" hidden>
                  <div class="nds-dropmenu-scroll">
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["data-required", ".nds-form-container", "formState", "attr"]'>
                      <span class="label">Required</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["disabled", ".nds-form-container", "formState", "data-state"]'>
                      <span class="label">Disabled</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["readonly", ".nds-form-container", "formState", "data-state"]'>
                      <span class="label">Readonly</span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="nds-dropmenu demo-toggle-menu">
                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                  <span class="label">LG</span>
                </button>
                <div class="nds-dropmenu-menu" hidden>
                  <div class="nds-dropmenu-scroll">
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn selected"
                      data-toggler='["nds-lg", ".nds-form-container", "formSize"]'>
                      <span class="label">LG</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["nds-md", ".nds-form-container", "formSize"]'>
                      <span class="label">MD</span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="nds-dropmenu demo-toggle-menu">
                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Fix: ">
                  <span class="label">Fix: Subtle</span>
                </button>
                <div class="nds-dropmenu-menu" hidden>
                  <div class="nds-dropmenu-scroll">
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn selected"
                      data-toggler='["nds-subtle", ".nds-prefix > .nds-btn, .nds-suffix > .nds-btn", "fixStyle"]'>
                      <span class="label">Subtle</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["nds-secondary", ".nds-prefix > .nds-btn, .nds-suffix > .nds-btn", "fixStyle"]'>
                      <span class="label">Solid</span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="nds-dropmenu demo-toggle-menu">
                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Fix: ">
                  <span class="label">Fix: LG</span>
                </button>
                <div class="nds-dropmenu-menu" hidden>
                  <div class="nds-dropmenu-scroll">
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn selected"
                      data-toggler='["nds-lg", ".nds-prefix > .nds-btn, .nds-suffix > .nds-btn", "fixSize"]'>
                      <span class="label">LG</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["nds-md", ".nds-prefix > .nds-btn, .nds-suffix > .nds-btn", "fixSize"]'>
                      <span class="label">MD</span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="nds-dropmenu demo-toggle-menu">
                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Fix: ">
                  <span class="label">Fix: Both</span>
                </button>
                <div class="nds-dropmenu-menu" hidden>
                  <div class="nds-dropmenu-scroll">
                    <button class="nds-btn nds-subtle nds-dropmenu-item" data-form-fix="prefix">
                      <span class="label">Prefix</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item" data-form-fix="suffix">
                      <span class="label">Suffix</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item selected" data-form-fix="both">
                      <span class="label">Both</span>
                    </button>
                  </div>
                </div>
              </div>
              <button class="nds-btn nds-subtle demo-toggle-btn" data-form-fix-icon>
                <span class="label">Icon</span>
              </button>
              <button class="nds-btn nds-subtle demo-toggle-btn" data-form-fix-dropmenu>
                <span class="label">Dropmenu</span>
              </button>
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                <span class="label">Remove bg</span>
              </button>
            </div>
          </div>
          <div class="demo-container">
            <div class="state-demo">
              <div class="nds-form-container">
                <div class="nds-form-header">
                  <label for="demo-prefixSuffix">
                    <span class="label">Label</span>
                  </label>
                </div>
                <div class="nds-form-control">
                  <div class="nds-form-action nds-prefix"><span class="nds-btn nds-subtle"><span class="label">Prefix</span></span></div>
                  <input type="text" id="demo-prefixSuffix" class="nds-input" placeholder="Entered text">
                  <div class="nds-form-action nds-suffix"><span class="nds-btn nds-subtle"><span class="label">Suffix</span></span></div>
                </div>
                <div class="nds-form-footer" data-feedback-target hidden></div>
              </div>
            </div>
          </div>
          <div class="demo-code">
            <div class="nds-tabs nds-code nds-divided" hidden>
              <div class="nds-tab-list-container">
                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                  <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                    aria-controls="panel-prefix-suffix-1" id="tab-prefix-suffix-1">
                    <span class="nds-tab-label">HTML</span>
                  </button>
                </nav>
              </div>
              <div class="nds-tab-content">
                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-prefix-suffix-1"
                  aria-labelledby="tab-prefix-suffix-1">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>
                  <div class="nds-expandable-content">
                    <code class="lang-html code">
<div class="nds-form-container">
  <div class="nds-form-header">
    <label for="prefix-suffix-1">
      <span class="label">Label</span>
    </label>
  </div>
  <div class="nds-form-control">
    <div class="nds-form-action nds-prefix"><span class="nds-btn nds-subtle"><span class="label">Prefix</span></span></div>
    <input type="text" id="prefix-suffix-1" class="nds-input" placeholder="Entered text">
    <div class="nds-form-action nds-suffix"><span class="nds-btn nds-subtle"><span class="label">Suffix</span></span></div>
  </div>
  <div class="nds-form-footer" data-feedback-target hidden></div>
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

<!-- Number Input -->
<section id="numberInput" class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Number Input</h2>
      <p class="nds-section-description">Numeric field with increment and decrement buttons for precise value adjustments</p>
    </div>
    <div class="nds-section-content">
      <div class="nds-showcase">
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-action">
              <div class="nds-dropmenu demo-toggle-menu">
                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                  <span class="label">State</span>
                </button>
                <div class="nds-dropmenu-menu" hidden>
                  <div class="nds-dropmenu-scroll">
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["data-required", ".nds-form-container", "formState", "attr"]'>
                      <span class="label">Required</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["disabled", ".nds-form-container", "formState", "data-state"]'>
                      <span class="label">Disabled</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["readonly", ".nds-form-container", "formState", "data-state"]'>
                      <span class="label">Readonly</span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="nds-dropmenu demo-toggle-menu">
                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                  <span class="label">LG</span>
                </button>
                <div class="nds-dropmenu-menu" hidden>
                  <div class="nds-dropmenu-scroll">
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn selected"
                      data-toggler='["nds-lg", ".nds-form-container", "formSize"]'>
                      <span class="label">LG</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["nds-md", ".nds-form-container", "formSize"]'>
                      <span class="label">MD</span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="nds-dropmenu demo-toggle-menu">
                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Fix: ">
                  <span class="label">Fix: Solid</span>
                </button>
                <div class="nds-dropmenu-menu" hidden>
                  <div class="nds-dropmenu-scroll">
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["nds-subtle", ".nds-prefix > .nds-btn, .nds-suffix > .nds-btn", "fixStyle"]'>
                      <span class="label">Subtle</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn selected"
                      data-toggler='["nds-secondary", ".nds-prefix > .nds-btn, .nds-suffix > .nds-btn", "fixStyle"]'>
                      <span class="label">Solid</span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="nds-dropmenu demo-toggle-menu">
                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Fix: ">
                  <span class="label">Fix: LG</span>
                </button>
                <div class="nds-dropmenu-menu" hidden>
                  <div class="nds-dropmenu-scroll">
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn selected"
                      data-toggler='["nds-lg", ".nds-prefix > .nds-btn, .nds-suffix > .nds-btn", "fixSize"]'>
                      <span class="label">LG</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["nds-md", ".nds-prefix > .nds-btn, .nds-suffix > .nds-btn", "fixSize"]'>
                      <span class="label">MD</span>
                    </button>
                  </div>
                </div>
              </div>
              <button class="nds-btn nds-subtle demo-toggle-btn selected"
                data-toggler='["nds-center", ".nds-input", "inputAlign"]'>
                <span class="label">Center</span>
              </button>
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                <span class="label">Remove bg</span>
              </button>
            </div>
          </div>
          <div class="demo-container">
            <div class="state-demo">
              <div class="nds-form-container" style="--form-width: 160px">
                <div class="nds-form-header">
                  <label for="demo-numberInput">
                    <span class="label">Quantity</span>
                  </label>
                </div>
                <div class="nds-form-control">
                  <div class="nds-form-action nds-prefix"><button class="nds-btn nds-secondary nds-number-increment" type="button" aria-label="Increase value"><i class="hgi hgi-stroke hgi-add-01 icon"></i></button></div>
                  <input type="text" id="demo-numberInput" class="nds-input nds-center" inputmode="numeric" value="1" min="0" max="1000" step="1" placeholder="0">
                  <div class="nds-form-action nds-suffix"><button class="nds-btn nds-secondary nds-number-decrement" type="button" aria-label="Decrease value"><i class="hgi hgi-stroke hgi-minus-sign icon"></i></button></div>
                </div>
                <div class="nds-form-footer" data-feedback-target hidden></div>
              </div>
            </div>
          </div>
          <div class="demo-code">
            <div class="nds-tabs nds-code nds-divided" hidden>
              <div class="nds-tab-list-container">
                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                  <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                    aria-controls="panel-number-input-1" id="tab-number-input-1">
                    <span class="nds-tab-label">HTML</span>
                  </button>
                </nav>
              </div>
              <div class="nds-tab-content">
                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-number-input-1"
                  aria-labelledby="tab-number-input-1">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>
                  <div class="nds-expandable-content">
                    <code class="lang-html code">
<div class="nds-form-container" style="--form-width: 160px">
  <div class="nds-form-header">
    <label for="number-input-1">
      <span class="label">Quantity</span>
    </label>
  </div>
  <div class="nds-form-control">
    <div class="nds-form-action nds-prefix"><button class="nds-btn nds-secondary nds-number-increment" type="button" aria-label="Increase value"><i class="hgi hgi-stroke hgi-add-01 icon"></i></button></div>
    <input type="text" id="number-input-1" class="nds-input nds-center" inputmode="numeric" value="1" min="0" max="1000" step="1" placeholder="0">
    <div class="nds-form-action nds-suffix"><button class="nds-btn nds-secondary nds-number-decrement" type="button" aria-label="Decrease value"><i class="hgi hgi-stroke hgi-minus-sign icon"></i></button></div>
  </div>
  <div class="nds-form-footer" data-feedback-target hidden></div>
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

<!-- Search Input -->
<section id="searchInput" class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Search Input</h2>
      <p class="nds-section-description">Search field with leading icon, voice input, and clear button</p>
    </div>
    <div class="nds-section-content">
      <div class="nds-showcase">
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-action">
              <div class="nds-dropmenu demo-toggle-menu">
                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                  <span class="label">State</span>
                </button>
                <div class="nds-dropmenu-menu" hidden>
                  <div class="nds-dropmenu-scroll">
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["data-required", ".nds-form-container", "formState", "attr"]'>
                      <span class="label">Required</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["disabled", ".nds-form-container", "formState", "data-state"]'>
                      <span class="label">Disabled</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["readonly", ".nds-form-container", "formState", "data-state"]'>
                      <span class="label">Readonly</span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="nds-dropmenu demo-toggle-menu">
                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                  <span class="label">LG</span>
                </button>
                <div class="nds-dropmenu-menu" hidden>
                  <div class="nds-dropmenu-scroll">
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn selected"
                      data-toggler='["nds-lg", ".nds-form-container", "formSize"]'>
                      <span class="label">LG</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["nds-md", ".nds-form-container", "formSize"]'>
                      <span class="label">MD</span>
                    </button>
                  </div>
                </div>
              </div>
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                <span class="label">Remove bg</span>
              </button>
            </div>
          </div>
          <div class="demo-container">
            <div class="state-demo">
              <div class="nds-form-container">
                <div class="nds-form-header">
                  <label for="demo-searchInput">
                    <span class="label">Search Services</span>
                  </label>
                </div>
                <div class="nds-form-control">
                  <i class="hgi hgi-stroke hgi-search-01 icon"></i>
                  <input type="text" id="demo-searchInput" class="nds-search-input" name="search"
                    placeholder="Search services...">
                  <div class="nds-form-action">
                    <button class="nds-btn nds-subtle nds-clear" type="button" aria-label="Clear search" hidden>
                      <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
                    </button>
                    <button class="nds-btn nds-subtle nds-voice-input" type="button" aria-label="Voice input">
                      <i class="hgi hgi-stroke hgi-mic-01 icon"></i>
                    </button>
                  </div>
                </div>
                <div class="nds-form-footer" data-feedback-target hidden></div>
              </div>
            </div>
          </div>
          <div class="demo-code">
            <div class="nds-tabs nds-code nds-divided" hidden>
              <div class="nds-tab-list-container">
                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                  <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                    aria-controls="panel-search-input-1" id="tab-search-input-1">
                    <span class="nds-tab-label">HTML</span>
                  </button>
                </nav>
              </div>
              <div class="nds-tab-content">
                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-search-input-1"
                  aria-labelledby="tab-search-input-1">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>
                  <div class="nds-expandable-content">
                    <code class="lang-html code">
<div class="nds-form-container">
  <div class="nds-form-header">
    <label for="search-input-1">
      <span class="label">Search Services</span>
    </label>
  </div>
  <div class="nds-form-control">
    <i class="hgi hgi-stroke hgi-search-01 icon"></i>
    <input type="text" id="search-input-1" class="nds-search-input" name="search" placeholder="Search services...">
    <div class="nds-form-action">
      <button class="nds-btn nds-subtle nds-clear" type="button" aria-label="Clear search" hidden>
        <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
      </button>
      <button class="nds-btn nds-subtle nds-voice-input" type="button" aria-label="Voice input">
        <i class="hgi hgi-stroke hgi-mic-01 icon"></i>
      </button>
    </div>
  </div>
  <div class="nds-form-footer" data-feedback-target hidden></div>
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

<!-- Email Input -->
<section id="emailInput" class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Email Input</h2>
      <p class="nds-section-description">Email field with leading icon and built-in format validation</p>
    </div>
    <div class="nds-section-content">
      <div class="nds-showcase">
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-action">
              <div class="nds-dropmenu demo-toggle-menu">
                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                  <span class="label">State</span>
                </button>
                <div class="nds-dropmenu-menu" hidden>
                  <div class="nds-dropmenu-scroll">
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["data-required", ".nds-form-container", "formState", "attr"]'>
                      <span class="label">Required</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["disabled", ".nds-form-container", "formState", "data-state"]'>
                      <span class="label">Disabled</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["readonly", ".nds-form-container", "formState", "data-state"]'>
                      <span class="label">Readonly</span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="nds-dropmenu demo-toggle-menu">
                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                  <span class="label">LG</span>
                </button>
                <div class="nds-dropmenu-menu" hidden>
                  <div class="nds-dropmenu-scroll">
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn selected"
                      data-toggler='["nds-lg", ".nds-form-container", "formSize"]'>
                      <span class="label">LG</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["nds-md", ".nds-form-container", "formSize"]'>
                      <span class="label">MD</span>
                    </button>
                  </div>
                </div>
              </div>
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                <span class="label">Remove bg</span>
              </button>
            </div>
          </div>
          <div class="demo-container">
            <div class="state-demo">
              <div class="nds-form-container">
                <div class="nds-form-header">
                  <label for="demo-emailInput">
                    <span class="label">Email Address</span>
                  </label>
                </div>
                <div class="nds-form-control">
                  <i class="hgi hgi-stroke hgi-mail-01 icon"></i>
                  <input type="email" id="demo-emailInput" class="nds-input" placeholder="Enter your email...">
                  <div class="nds-form-action">
                    <button class="nds-btn nds-subtle nds-clear" type="button" aria-label="Clear email" hidden>
                      <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
                    </button>
                  </div>
                </div>
                <div class="nds-form-footer" data-feedback-target hidden></div>
              </div>
            </div>
          </div>
          <div class="demo-code">
            <div class="nds-tabs nds-code nds-divided" hidden>
              <div class="nds-tab-list-container">
                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                  <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                    aria-controls="panel-email-input-1" id="tab-email-input-1">
                    <span class="nds-tab-label">HTML</span>
                  </button>
                </nav>
              </div>
              <div class="nds-tab-content">
                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-email-input-1"
                  aria-labelledby="tab-email-input-1">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>
                  <div class="nds-expandable-content">
                    <code class="lang-html code">
<div class="nds-form-container">
  <div class="nds-form-header">
    <label for="email-input-1">
      <span class="label">Email Address</span>
    </label>
  </div>
  <div class="nds-form-control">
    <i class="hgi hgi-stroke hgi-mail-01 icon"></i>
    <input type="email" id="email-input-1" class="nds-input" placeholder="Enter your email...">
    <div class="nds-form-action">
      <button class="nds-btn nds-subtle nds-clear" type="button" aria-label="Clear email" hidden>
        <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
      </button>
    </div>
  </div>
  <div class="nds-form-footer" data-feedback-target hidden></div>
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

<!-- Password Input -->
<section id="passwordInput" class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Password Input</h2>
      <p class="nds-section-description">Password field with visibility toggle and Arabic character filtering</p>
    </div>
    <div class="nds-section-content">
      <div class="nds-showcase">
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-action">
              <div class="nds-dropmenu demo-toggle-menu">
                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                  <span class="label">State</span>
                </button>
                <div class="nds-dropmenu-menu" hidden>
                  <div class="nds-dropmenu-scroll">
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["data-required", ".nds-form-container", "formState", "attr"]'>
                      <span class="label">Required</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["disabled", ".nds-form-container", "formState", "data-state"]'>
                      <span class="label">Disabled</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["readonly", ".nds-form-container", "formState", "data-state"]'>
                      <span class="label">Readonly</span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="nds-dropmenu demo-toggle-menu">
                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                  <span class="label">LG</span>
                </button>
                <div class="nds-dropmenu-menu" hidden>
                  <div class="nds-dropmenu-scroll">
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn selected"
                      data-toggler='["nds-lg", ".nds-form-container", "formSize"]'>
                      <span class="label">LG</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["nds-md", ".nds-form-container", "formSize"]'>
                      <span class="label">MD</span>
                    </button>
                  </div>
                </div>
              </div>
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                <span class="label">Remove bg</span>
              </button>
            </div>
          </div>
          <div class="demo-container">
            <div class="state-demo">
              <div class="nds-form-container">
                <div class="nds-form-header">
                  <label for="demo-passwordInput">
                    <span class="label">Password</span>
                  </label>
                </div>
                <div class="nds-form-control">
                  <div class="nds-form-action">
                    <button class="nds-btn nds-subtle toggle-password" type="button" aria-label="Show password">
                      <i class="hgi hgi-stroke hgi-view-off icon"></i>
                    </button>
                  </div>
                  <input type="password" id="demo-passwordInput" class="nds-input" placeholder="Enter password...">
                  <div class="nds-form-action">
                    <button class="nds-btn nds-subtle nds-clear" type="button" aria-label="Clear password" hidden>
                      <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
                    </button>
                  </div>
                </div>
                <div class="nds-form-footer" data-feedback-target hidden></div>
              </div>
            </div>
          </div>
          <div class="demo-code">
            <div class="nds-tabs nds-code nds-divided" hidden>
              <div class="nds-tab-list-container">
                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                  <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                    aria-controls="panel-password-input-1" id="tab-password-input-1">
                    <span class="nds-tab-label">HTML</span>
                  </button>
                </nav>
              </div>
              <div class="nds-tab-content">
                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-password-input-1"
                  aria-labelledby="tab-password-input-1">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>
                  <div class="nds-expandable-content">
                    <code class="lang-html code">
<div class="nds-form-container">
  <div class="nds-form-header">
    <label for="password-input-1">
      <span class="label">Password</span>
    </label>
  </div>
  <div class="nds-form-control">
    <div class="nds-form-action">
      <button class="nds-btn nds-subtle toggle-password" type="button" aria-label="Show password">
        <i class="hgi hgi-stroke hgi-view-off icon"></i>
      </button>
    </div>
    <input type="password" id="password-input-1" class="nds-input" placeholder="Enter password...">
    <div class="nds-form-action">
      <button class="nds-btn nds-subtle nds-clear" type="button" aria-label="Clear password" hidden>
        <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
      </button>
    </div>
  </div>
  <div class="nds-form-footer" data-feedback-target hidden></div>
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

<!-- Textarea -->
<section id="textareaInput" class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Textarea</h2>
      <p class="nds-section-description">Multi-line text entry for longer content like messages and descriptions</p>
    </div>
    <div class="nds-section-content">
      <div class="nds-showcase">
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-action">
              <div class="nds-dropmenu demo-toggle-menu">
                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                  <span class="label">State</span>
                </button>
                <div class="nds-dropmenu-menu" hidden>
                  <div class="nds-dropmenu-scroll">
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["data-required", ".nds-form-container", "formState", "attr"]'>
                      <span class="label">Required</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["disabled", ".nds-form-container", "formState", "data-state"]'>
                      <span class="label">Disabled</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["readonly", ".nds-form-container", "formState", "data-state"]'>
                      <span class="label">Readonly</span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="nds-dropmenu demo-toggle-menu">
                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                  <span class="label">LG</span>
                </button>
                <div class="nds-dropmenu-menu" hidden>
                  <div class="nds-dropmenu-scroll">
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn selected"
                      data-toggler='["nds-lg", ".nds-form-container", "formSize"]'>
                      <span class="label">LG</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["nds-md", ".nds-form-container", "formSize"]'>
                      <span class="label">MD</span>
                    </button>
                  </div>
                </div>
              </div>
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                <span class="label">Remove bg</span>
              </button>
            </div>
          </div>
          <div class="demo-container">
            <div class="state-demo">
              <div class="nds-form-container nds-textarea">
                <div class="nds-form-header">
                  <label for="textareaInput">
                    <span class="label">Message</span>
                  </label>
                </div>
                <div class="nds-form-control">
                  <textarea id="textareaInput" class="nds-textarea" placeholder="Enter your message..."
                    rows="4"></textarea>
                </div>
                <div class="nds-form-footer" data-feedback-target hidden></div>
              </div>
            </div>
          </div>
          <div class="demo-code">
            <div class="nds-tabs nds-code nds-divided" hidden>
              <div class="nds-tab-list-container">
                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                  <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                    aria-controls="panel-textarea-1" id="tab-textarea-1">
                    <span class="nds-tab-label">HTML</span>
                  </button>
                </nav>
              </div>
              <div class="nds-tab-content">
                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-textarea-1"
                  aria-labelledby="tab-textarea-1">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>
                  <div class="nds-expandable-content">
                    <code class="lang-html code">
<div class="nds-form-container nds-textarea">
  <div class="nds-form-header">
    <label for="textarea-1">
      <span class="label">Message</span>
    </label>
  </div>
  <div class="nds-form-control">
    <textarea id="textarea-1" class="nds-textarea" placeholder="Enter your message..." rows="4"></textarea>
  </div>
  <div class="nds-form-footer" data-feedback-target hidden></div>
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

<!-- Select Dropdown -->
<section id="selectDropdown" class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Select Dropdown</h2>
      <p class="nds-section-description">Custom dropdown select with keyboard navigation and hidden input for form submission</p>
    </div>
    <div class="nds-section-content">
      <div class="nds-showcase">
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-action">
              <div class="nds-dropmenu demo-toggle-menu">
                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                  <span class="label">State</span>
                </button>
                <div class="nds-dropmenu-menu" hidden>
                  <div class="nds-dropmenu-scroll">
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["data-required", ".nds-form-container", "formState", "attr"]'>
                      <span class="label">Required</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["disabled", ".nds-form-container", "formState", "data-state"]'>
                      <span class="label">Disabled</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["readonly", ".nds-form-container", "formState", "data-state"]'>
                      <span class="label">Readonly</span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="nds-dropmenu demo-toggle-menu">
                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                  <span class="label">LG</span>
                </button>
                <div class="nds-dropmenu-menu" hidden>
                  <div class="nds-dropmenu-scroll">
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn selected"
                      data-toggler='["nds-lg", ".nds-form-container", "formSize"]'>
                      <span class="label">LG</span>
                    </button>
                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                      data-toggler='["nds-md", ".nds-form-container", "formSize"]'>
                      <span class="label">MD</span>
                    </button>
                  </div>
                </div>
              </div>
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                <span class="label">Remove bg</span>
              </button>
            </div>
          </div>
          <div class="demo-container">
            <div class="state-demo">
              <div class="nds-form-container nds-select">
                <div class="nds-form-header">
                  <label for="demo-selectInput">
                    <span class="label">Region</span>
                  </label>
                </div>
                <div class="nds-form-control">
                  <input type="text" id="demo-selectInput" class="nds-input nds-select-input"
                    placeholder="Choose an option..." readonly>
                  <input type="hidden" name="selectValue" class="nds-select-value">

                  <!-- Custom Dropdown Menu -->
                  <div class="nds-select-dropdown" hidden>
                    <div class="nds-select-options">
                      <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="">
                        <span class="nds-option-text">Choose an option...</span>
                      </button>
                      <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="option1">
                        <span class="nds-option-text">Option 1</span>
                      </button>
                      <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="option2">
                        <span class="nds-option-text">Option 2</span>
                      </button>
                      <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="option3">
                        <span class="nds-option-text">Option 3</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="nds-form-footer" data-feedback-target hidden></div>
              </div>
            </div>
          </div>
          <div class="demo-code">
            <div class="nds-tabs nds-code nds-divided" hidden>
              <div class="nds-tab-list-container">
                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                  <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                    aria-controls="panel-select-1" id="tab-select-1">
                    <span class="nds-tab-label">HTML</span>
                  </button>
                </nav>
              </div>
              <div class="nds-tab-content">
                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-select-1"
                  aria-labelledby="tab-select-1">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>
                  <div class="nds-expandable-content">
                    <code class="lang-html code">
<div class="nds-form-container nds-select">
  <div class="nds-form-header">
    <label for="select-input-1">
      <span class="label">Region</span>
    </label>
  </div>
  <div class="nds-form-control">
    <input type="text" id="select-input-1" class="nds-input nds-select-input" placeholder="Choose an option..." readonly>
    <input type="hidden" name="selectValue" class="nds-select-value">
    <div class="nds-select-dropdown" hidden>
      <div class="nds-select-options">
        <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="">
          <span class="nds-option-text">Choose an option...</span>
        </button>
        <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="option1">
          <span class="nds-option-text">Option 1</span>
        </button>
        <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="option2">
          <span class="nds-option-text">Option 2</span>
        </button>
        <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="option3">
          <span class="nds-option-text">Option 3</span>
        </button>
      </div>
    </div>
  </div>
  <div class="nds-form-footer" data-feedback-target hidden></div>
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

<!-- Form Status API -->
<section id="formStatusApi" class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Form Status API</h2>
      <p class="nds-section-description">Set error, success, warning, or info status on any form container with automatic feedback display</p>
    </div>
    <div class="nds-section-content">
      <div class="nds-showcase">
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-action">
              <button class="nds-btn nds-subtle demo-toggle-btn" id="status-error-btn">
                <span class="label">Error</span>
              </button>
              <button class="nds-btn nds-subtle demo-toggle-btn" id="status-success-btn">
                <span class="label">Success</span>
              </button>
              <button class="nds-btn nds-subtle demo-toggle-btn" id="status-warning-btn">
                <span class="label">Warning</span>
              </button>
              <button class="nds-btn nds-subtle demo-toggle-btn" id="status-info-btn">
                <span class="label">Info</span>
              </button>
              <button class="nds-btn nds-subtle demo-toggle-btn" id="status-clear-btn">
                <span class="label">Clear</span>
              </button>
            </div>
          </div>
          <div class="demo-container">
            <div class="state-demo">
              <div class="nds-form-container" id="status-demo-container">
                <div class="nds-form-header">
                  <label for="status-demo-input">
                    <span class="label">National ID</span>
                  </label>
                </div>
                <div class="nds-form-control">
                  <input type="text" id="status-demo-input" class="nds-input"
                    placeholder="Enter your national ID...">
                  <div class="nds-form-action">
                    <button class="nds-btn nds-subtle nds-clear" type="button" aria-label="Clear input" hidden>
                      <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
                    </button>
                  </div>
                </div>
                <div class="nds-form-footer" data-feedback-target hidden></div>
              </div>
            </div>
          </div>
          <div class="demo-code">
            <div class="nds-tabs nds-code nds-divided" hidden>
              <div class="nds-tab-list-container">
                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                  <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                    aria-controls="panel-status-api-html" id="tab-status-api-html">
                    <span class="nds-tab-label">HTML</span>
                  </button>
                  <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                    aria-controls="panel-status-api-js" id="tab-status-api-js">
                    <span class="nds-tab-label">JS API</span>
                  </button>
                </nav>
              </div>
              <div class="nds-tab-content">
                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-status-api-html"
                  aria-labelledby="tab-status-api-html">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>
                  <div class="nds-expandable-content">
                    <code class="lang-html code">
<div class="nds-form-container" id="national-id-field">
  <div class="nds-form-header">
    <label for="national-id">
      <span class="label">National ID</span>
    </label>
  </div>
  <div class="nds-form-control">
    <input type="text" id="national-id" class="nds-input" placeholder="Enter your national ID...">
    <div class="nds-form-action">
      <button class="nds-btn nds-subtle nds-clear" type="button" aria-label="Clear input" hidden>
        <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
      </button>
    </div>
  </div>
  <div class="nds-form-footer" data-feedback-target hidden></div>
</div>
                  </code>
                  </div>
                </div>
                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-status-api-js"
                  aria-labelledby="tab-status-api-js" hidden>
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>
                  <div class="nds-expandable-content">
                    <code class="lang-javascript code">var field = document.getElementById('national-id-field');

// Set status with message
NDS.Forms.setStatus({ element: field, status: 'error', message: 'This field is required' });
NDS.Forms.setStatus({ element: field, status: 'success', message: 'Looks good!' });
NDS.Forms.setStatus({ element: field, status: 'warning', message: 'Please review' });
NDS.Forms.setStatus({ element: field, status: 'neutral', message: 'Additional information' });

// Clear status (restores permanent feedback if present)
NDS.Forms.clearStatus(field);

// Get current status
var status = NDS.Forms.getStatus(field);
// Returns: { status: 'error', message: '...', isValid: false }</code>
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

<!-- Permanent Feedback -->
<section id="formPermanentFeedback" class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Permanent Feedback</h2>
      <p class="nds-section-description">Tips and hints that persist across validation cycles, hidden during errors and restored when cleared</p>
    </div>
    <div class="nds-section-content">
      <div class="nds-showcase">
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-action">
              <button class="nds-btn nds-subtle demo-toggle-btn" id="permanent-error-btn">
                <span class="label">Show Error</span>
              </button>
              <button class="nds-btn nds-subtle demo-toggle-btn" id="permanent-clear-btn">
                <span class="label">Clear Error</span>
              </button>
            </div>
          </div>
          <div class="demo-container">
            <div class="state-demo">
              <div class="nds-form-container" id="permanent-demo-container">
                <div class="nds-form-header">
                  <label for="permanent-demo-input">
                    <span class="label">Username</span>
                    <span class="info">Permanent tip shows again after error is cleared</span>
                  </label>
                </div>
                <div class="nds-form-control">
                  <input type="text" id="permanent-demo-input" class="nds-input" placeholder="Enter username...">
                  <div class="nds-form-action">
                    <button class="nds-btn nds-subtle nds-clear" type="button" aria-label="Clear input" hidden>
                      <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
                    </button>
                  </div>
                </div>
                <div class="nds-form-footer" data-feedback-target>
                  <span class="nds-feedback nds-outline nds-sm" data-status="neutral" data-permanent>
                    <span class="nds-feedback-icon">
                      <i class="hgi hgi-stroke icon"></i>
                    </span>
                    <span class="nds-feedback-message">Use 3-20 characters, letters and numbers only</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="demo-code">
            <div class="nds-tabs nds-code nds-divided" hidden>
              <div class="nds-tab-list-container">
                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                  <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                    aria-controls="panel-permanent-html" id="tab-permanent-html">
                    <span class="nds-tab-label">HTML</span>
                  </button>
                  <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                    aria-controls="panel-permanent-js" id="tab-permanent-js">
                    <span class="nds-tab-label">JS API</span>
                  </button>
                </nav>
              </div>
              <div class="nds-tab-content">
                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-permanent-html"
                  aria-labelledby="tab-permanent-html">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>
                  <div class="nds-expandable-content">
                    <code class="lang-html code">
<div class="nds-form-container">
  <div class="nds-form-header">
    <label for="username">
      <span class="label">Username</span>
      <span class="info">Permanent tip shows again after error is cleared</span>
    </label>
  </div>
  <div class="nds-form-control">
    <input type="text" id="username" class="nds-input" placeholder="Enter username...">
    <div class="nds-form-action">
      <button class="nds-btn nds-subtle nds-clear" type="button" aria-label="Clear input" hidden>
        <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
      </button>
    </div>
  </div>
  <div class="nds-form-footer" data-feedback-target>
    <span class="nds-feedback nds-outline nds-sm" data-status="neutral" data-permanent>
      <span class="nds-feedback-icon">
        <i class="hgi hgi-stroke icon"></i>
      </span>
      <span class="nds-feedback-message">Use 3-20 characters, letters and numbers only</span>
    </span>
  </div>
</div>
                  </code>
                  </div>
                </div>
                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-permanent-js"
                  aria-labelledby="tab-permanent-js" hidden>
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>
                  <div class="nds-expandable-content">
                    <code class="lang-javascript code">// Create permanent hint via Forms API
NDS.Forms.setStatus({
    element: container,
    status: 'neutral',
    message: 'Use 3-20 characters, letters and numbers only',
    permanent: true
});

// Show validation error: permanent feedback is hidden automatically
NDS.Forms.setStatus({ element: container, status: 'error', message: 'Username is required' });

// Clear validation: permanent feedback is restored automatically
NDS.Forms.clearStatus(container);</code>
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
<section id="formFeatures" class="nds-content-section">
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
            <span class="label">Auto-initialization</span>
          </span>
          <p class="nds-item-desc">All form inputs auto-initialize on page load. Two-way state binding syncs <code class="nds-inline-code lang-html">disabled</code> and <code class="nds-inline-code lang-html">data-required</code> between inputs and containers. For dynamic content, call <code class="nds-inline-code lang-js">NDS.Forms.init()</code>.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-checkmark-circle-02 icon"></i>
            <span class="label">Validation</span>
          </span>
          <p class="nds-item-desc">Uses HTML5 validity checks but replaces browser popups with styled inline feedback. Error messages auto-clear on blur or change once the field is corrected. Custom messages via <code class="nds-inline-code lang-html">data-error-message</code>.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-notification-03 icon"></i>
            <span class="label">Status Feedback</span>
          </span>
          <p class="nds-item-desc">Four status types: error, success, warning, info. Feedback messages render into <code class="nds-inline-code lang-html">data-feedback-target</code> elements. Permanent hints survive validation cycles with <code class="nds-inline-code lang-html">data-permanent</code>.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-cursor-02 icon"></i>
            <span class="label">Interactive States</span>
          </span>
          <p class="nds-item-desc">Focus, active, typing, filled, and disabled states are tracked automatically via <code class="nds-inline-code lang-html">data-state</code>. Clear buttons auto-show when the input has a value and hide when empty.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-view icon"></i>
            <span class="label">Password Toggle</span>
          </span>
          <p class="nds-item-desc">Add a button with <code class="nds-inline-code lang-html">toggle-password</code> class to toggle between password and text input. The icon updates automatically to show the current visibility state.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-mic-01 icon"></i>
            <span class="label">Voice Input</span>
          </span>
          <p class="nds-item-desc">Add a button with <code class="nds-inline-code lang-html">nds-voice-input</code> class to enable speech-to-text on any input. Uses the Web Speech API with automatic language detection from the page.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-language-circle icon"></i>
            <span class="label">Arabic Character Filtering</span>
          </span>
          <p class="nds-item-desc">Password fields automatically strip Arabic and RTL characters on input, ensuring passwords contain only compatible characters without manual validation logic.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-plus-minus-01 icon"></i>
            <span class="label">Number Input Controls</span>
          </span>
          <p class="nds-item-desc">Add <code class="nds-inline-code lang-html">nds-number-increment</code> and <code class="nds-inline-code lang-html">nds-number-decrement</code> buttons as prefix/suffix actions. Supports <code class="nds-inline-code lang-html">min</code>, <code class="nds-inline-code lang-html">max</code>, and <code class="nds-inline-code lang-html">step</code> attributes, with accelerated stepping on long press.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Usage Guidelines -->
<section id="formGuidelines" class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Usage Guidelines</h2>
      <p class="nds-section-description">When and how to use form inputs effectively</p>
    </div>
    <div class="nds-section-content">
      <div class="nds-content-block">
        <h3 class="nds-block-title">Best Practices</h3>
        <ul>
          <li>Use form inputs for any data collection scenario: registration flows, search interfaces, settings pages, and inline editing. Every input type shares the same container structure, so switching between text, email, password, or select requires minimal markup changes.</li>
          <li>Use <code class="nds-inline-code lang-html">nds-search-input</code> for search fields where voice input and automatic clear actions improve discoverability. The search variant includes a leading icon and optional microphone button out of the box.</li>
          <li>Use the custom select dropdown (<code class="nds-inline-code lang-html">nds-select</code>) when you need styled option lists that match the design system. For native mobile select behavior, use a standard <code class="nds-inline-code lang-html">&lt;select&gt;</code> element instead.</li>
          <li>Do not use form inputs for binary choices or toggles. Use <a href="{{ 'components/switch' | relative_url }}" class="nds-color">switches</a> for instant on/off toggles, <a href="{{ 'components/checkbox' | relative_url }}" class="nds-color">checkboxes</a> for multiple selections, or <a href="{{ 'components/radio' | relative_url }}" class="nds-color">radio buttons</a> for single selection from a set.</li>
          <li>Do not use plain text inputs for specialized data types. Use <a href="{{ 'components/date-picker' | relative_url }}" class="nds-color">date picker</a> for dates, <a href="{{ 'components/otp' | relative_url }}" class="nds-color">OTP input</a> for verification codes, and <a href="{{ 'components/autocomplete' | relative_url }}" class="nds-color">autocomplete</a> for search-as-you-type with remote data.</li>
          <li>Choose <code class="nds-inline-code lang-html">nds-lg</code> (default) for standalone forms and primary data entry. Use <code class="nds-inline-code lang-html">nds-md</code> for compact layouts like table filters, inline editing, or sidebars where space is limited.</li>
          <li>Add <code class="nds-inline-code lang-html">data-required</code> to the container rather than <code class="nds-inline-code lang-html">required</code> on the input. The system syncs the two automatically and adds the required indicator to the label.</li>
          <li>Use permanent feedback (<code class="nds-inline-code lang-html">data-permanent</code>) for format hints and character requirements. These persist across validation cycles: they hide when an error appears and restore when the error clears.</li>
          <li>Use prefix and suffix slots for units, currency symbols, or action buttons that contextualize the input. Prefix/suffix buttons support both subtle and solid styles, and can include icons or dropmenus for compound inputs.</li>
          <li>Always include a <code class="nds-inline-code lang-html">data-feedback-target</code> element in the form footer, even if initially hidden. The validation system needs this target to inject error, success, and warning messages.</li>
          <li>Set <code class="nds-inline-code lang-html">data-error-message</code> on the container to override default browser validation messages with context-specific text that guides the user toward correction.</li>
        </ul>
      </div>
      <div class="nds-content-block">
        <h3 class="nds-block-title">Modifier Classes</h3>
        <table class="nds-table nds-responsive">
          <thead><tr><th>Class</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code class="nds-inline-code lang-html">nds-md</code></td><td>Medium size with reduced height (32px) and smaller font</td></tr>
          </tbody>
        </table>
      </div>
      <div class="nds-content-block">
        <h3 class="nds-block-title">Data Attributes</h3>
        <table class="nds-table nds-responsive">
          <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code class="nds-inline-code lang-html">data-required</code></td><td>Set on <code class="nds-inline-code lang-html">nds-form-container</code> to mark the field as required. Automatically syncs to the input's <code class="nds-inline-code lang-html">required</code> attribute and adds the asterisk indicator.</td></tr>
            <tr><td><code class="nds-inline-code lang-html">data-error-message</code></td><td>Set on <code class="nds-inline-code lang-html">nds-form-container</code> to override the default browser validation message with custom text.</td></tr>
            <tr><td><code class="nds-inline-code lang-html">data-permanent</code></td><td>Set on a feedback element inside the footer. Permanent feedback hides during validation errors and restores when cleared.</td></tr>
            <tr><td><code class="nds-inline-code lang-html">min</code></td><td>Set on number inputs to define the minimum allowed value (default: 0).</td></tr>
            <tr><td><code class="nds-inline-code lang-html">max</code></td><td>Set on number inputs to define the maximum allowed value (default: 1000).</td></tr>
            <tr><td><code class="nds-inline-code lang-html">step</code></td><td>Set on number inputs to define the increment/decrement size (default: 1). Long press accelerates to 10x this value.</td></tr>
          </tbody>
        </table>
      </div>
      <div class="nds-content-block">
        <h3 class="nds-block-title">CSS Custom Properties</h3>
        <table class="nds-table nds-responsive">
          <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code class="nds-inline-code lang-html">--form-width</code></td><td>100%</td><td>Controls the width of the form container</td></tr>
            <tr><td><code class="nds-inline-code lang-html">--input-size</code></td><td>40px</td><td>Height of the input field (32px for <code class="nds-inline-code lang-html">nds-md</code>)</td></tr>
            <tr><td><code class="nds-inline-code lang-html">--input-radius</code></td><td>var(--radius-sm)</td><td>Border radius of the input field</td></tr>
          </tbody>
        </table>
      </div>
      <div class="nds-content-block">
        <h3 class="nds-block-title">JavaScript API</h3>
        <p>The <strong>NDS.Forms</strong> API manages initialization, status feedback, state management, and form validation. For dynamically added form elements, call <code class="nds-inline-code lang-js">NDS.Forms.initializeContainer(element)</code> to initialize new inputs.</p>
        <div class="nds-code nds-expandable">
              <div class="nds-code-action">
                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                  <i class="hgi hgi-stroke hgi-copy-01"></i>
                </button>
              </div>
              <div class="nds-expandable-content">
                <code class="lang-javascript code">
// ── Initialization ──────────────────────────────────
// All forms auto-initialize on page load
NDS.Forms.init();

// Initialize a specific container (for dynamic content)
NDS.Forms.initializeContainer(containerElement);

// Initialize a dynamic &lt;form&gt; element (attaches submit validation)
NDS.Forms.initForm(formElement);

// ── Status API ──────────────────────────────────────
// Set validation status with feedback message
NDS.Forms.setStatus({ element: el, status: 'error', message: 'Required field' });
NDS.Forms.setStatus({ element: el, status: 'success', message: 'Looks good!' });
NDS.Forms.setStatus({ element: el, status: 'warning', message: 'Please review' });
NDS.Forms.setStatus({ element: el, status: 'info', message: 'Hint text' });

// Permanent feedback (survives validation cycles)
NDS.Forms.setStatus({ element: el, status: 'neutral', message: 'Tip text', permanent: true });

// Clear status (restores permanent feedback if present)
NDS.Forms.clearStatus(el);

// Get current status
NDS.Forms.getStatus(el);
// Returns: { status: 'error', message: '...', isValid: false }

// ── State Management ────────────────────────────────
// Set disabled or required state programmatically
NDS.Forms.setState(el, 'disabled', true);
NDS.Forms.setState(el, 'required', true);

// ── Form Validation ─────────────────────────────────
// Validate entire form (returns { valid, invalidFields, errors })
NDS.Forms.validateForm(formElement);

// Validate specific groups (used on checkbox, radio, OTP pages)
NDS.Forms.validateCheckboxGroup(group);
NDS.Forms.validateRadioGroup(group);
NDS.Forms.validateOtpGroup(group);

// ── Events ──────────────────────────────────────────
// Status change on any .nds-form-container
element.addEventListener('nds:statusChange', function(e) {
    // e.detail: { status: 'error'|'success'|...|null, message: '...'|null }
});

// Form validation events on .nds-form elements
form.addEventListener('nds:formValidate', function(e) {
    // Fires after validation runs
    // e.detail: { valid: true|false, invalidFields: [...], errors: [...] }
});

form.addEventListener('nds:formValid', function(e) {
    // Fires when form passes validation on submit
});

form.addEventListener('nds:formInvalid', function(e) {
    // Fires when form fails validation on submit
    // e.detail: { invalidFields: [...], errors: [...] }
});

// Select dropdown change event on .nds-form-control
formControl.addEventListener('selectChange', function(e) {
    // e.detail: { value: 'option1', text: 'Option 1' }
});
                </code>
              </div>
        </div>
      </div>
    </div>
  </div>
</section>

<script>
  document.addEventListener('DOMContentLoaded', function () {
    // Form Status API demo
    var statusContainer = document.getElementById('status-demo-container');
    if (statusContainer) {
      document.getElementById('status-error-btn').addEventListener('click', function () {
        NDS.Forms.setStatus({ element: statusContainer, status: 'error', message: 'This field is required' });
      });
      document.getElementById('status-success-btn').addEventListener('click', function () {
        NDS.Forms.setStatus({ element: statusContainer, status: 'success', message: 'Looks good!' });
      });
      document.getElementById('status-warning-btn').addEventListener('click', function () {
        NDS.Forms.setStatus({ element: statusContainer, status: 'warning', message: 'Please review this field' });
      });
      document.getElementById('status-info-btn').addEventListener('click', function () {
        NDS.Forms.setStatus({ element: statusContainer, status: 'info', message: 'Additional information' });
      });
      document.getElementById('status-clear-btn').addEventListener('click', function () {
        NDS.Forms.clearStatus(statusContainer);
      });
    }

    // Permanent feedback demo
    var permanentContainer = document.getElementById('permanent-demo-container');
    if (permanentContainer) {
      document.getElementById('permanent-error-btn').addEventListener('click', function () {
        NDS.Forms.setStatus({ element: permanentContainer, status: 'error', message: 'Username is required' });
      });
      document.getElementById('permanent-clear-btn').addEventListener('click', function () {
        NDS.Forms.clearStatus(permanentContainer);
      });
    }

  });
</script>
