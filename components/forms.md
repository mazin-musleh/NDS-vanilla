---
layout: page
title: Forms
hero_title: Form Components - National Design System
hero_description: A comprehensive collection of form input types with interactive controls and clear actions
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Form Types Overview -->
<section id="formTypesOverview" class="nds-content-section">
  <div class="nds-section-content-container">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Form Input Types</h2>
      <p class="nds-section-description">
        All form input types available in the National Design System with clear actions
      </p>
    </div>
    <div class="nds-section-content">
      <div class="form-showcase">

        <!-- Text Input -->
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Text Input</div>
            <div class="demo-action">
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='[["nds-required", ".nds-form-container", "requiredClass"], ["required", "#demo-textInput", "requiredAttr", "attr"]]'>
                <span class="label">Required</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["error", ".nds-form-control", "errorToggle"]'>
                <span class="label">Error</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["disabled", "#demo-textInput", "stateToggle", "attr"]'>
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
              <div class="nds-form-container">
                <div class="nds-form-header">
                  <label for="demo-textInput">
                    <span class="label">Text Input</span>
                  </label>
                </div>
                <div class="nds-form-control">
                  <input type="text" id="demo-textInput" class="nds-input" placeholder="Enter text..." value="">
                  <div class="nds-form-action">
                    <button class="nds-btn nds-subtle clear hidden" type="button" aria-label="Clear input">
                      <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
                    </button>
                  </div>
                </div>
                <span class="nds-feedback">
                  <span class="nds-feedback-icon nds-neutral nds-info nds-outline nds-sm">
                    <i class="hgi hgi-solid icon"></i>
                  </span>
                  <span class="msg">More Info</span>
                </span>
              </div>
            </div>
          </div>
          <div class="nds-tabs nds-code withDivider">
            <div class="nds-tab-list-container">
              <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                  aria-controls="panel-text-input-1" id="tab-text-input-1">
                  <span class="nds-tab-label">HTML</span>
                </button>
                <button class="nds-btn nds-subtle nds-tab showMore"><i
                    class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
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
                      <label for="textInput">
                        <span class="label">Text Input</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <input type="text" id="textInput" class="nds-input" placeholder="Enter text..." value="">
                      <div class="nds-form-action">
                        <button class="nds-btn nds-subtle clear hidden" type="button" aria-label="Clear input">
                          <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
                        </button>
                      </div>
                    </div>
                    <div class="nds-form-footer">
                      <span class="nds-feedback">
                        <span class="nds-feedback-icon nds-outline nds-sm">
                          <i class="hgi hgi-solid icon"></i>
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

        <!-- Search Input -->
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Search Input</div>
            <div class="demo-action">
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='[["nds-required", ".nds-form-container", "requiredClass"], ["required", "#demo-searchInput", "requiredAttr", "attr"]]'>
                <span class="label">Required</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["error", ".nds-form-control", "errorToggle"]'>
                <span class="label">Error</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["disabled", "#demo-searchInput", "stateToggle", "attr"]'>
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
              <div class="nds-form-container">
                <div class="nds-form-header">
                  <label for="demo-searchInput">
                    <span class="label">Search Input</span>
                  </label>
                </div>
                <div class="nds-form-control">
                  <i class="hgi hgi-stroke hgi-search-01 icon"></i>
                  <input type="text" id="demo-searchInput" class="nds-search-input" name="search"
                    placeholder="Search...">
                  <div class="nds-form-action">
                    <button class="nds-btn nds-subtle voiceInput" type="button" aria-label="Voice input">
                      <i class="hgi hgi-stroke hgi-mic-01 icon"></i>
                    </button>
                    <button class="nds-btn nds-subtle clear hidden" type="button" aria-label="Clear search">
                      <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
                    </button>
                  </div>
                </div>
                <div class="nds-form-footer">
                  <span class="nds-feedback">
                    <span class="nds-feedback-icon nds-outline nds-sm">
                      <i class="hgi hgi-solid icon"></i>
                    </span>
                    <span class="msg"></span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="nds-tabs nds-code withDivider">
            <div class="nds-tab-list-container">
              <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                  aria-controls="panel-search-input-1" id="tab-search-input-1">
                  <span class="nds-tab-label">HTML</span>
                </button>
                <button class="nds-btn nds-subtle nds-tab showMore"><i
                    class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
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
                      <label for="searchInput">
                        <span class="label">Search Input</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <i class="hgi hgi-stroke hgi-search-01 icon"></i>
                      <input type="text" id="searchInput" class="nds-search-input" name="search" placeholder="Search...">
                      <div class="nds-form-action">
                        <button class="nds-btn nds-subtle voiceInput" type="button" aria-label="Voice input">
                          <i class="hgi hgi-stroke hgi-mic-01 icon"></i>
                        </button>
                        <button class="nds-btn nds-subtle clear hidden" type="button" aria-label="Clear search">
                          <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
                        </button>
                      </div>
                    </div>
                    <div class="nds-form-footer">
                      <span class="nds-feedback">
                        <span class="nds-feedback-icon nds-outline nds-sm">
                          <i class="hgi hgi-solid icon"></i>
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

        <!-- Email Input -->
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Email Input</div>
            <div class="demo-action">
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='[["nds-required", ".nds-form-container", "requiredClass"], ["required", "#demo-emailInput", "requiredAttr", "attr"]]'>
                <span class="label">Required</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["error", ".nds-form-control", "errorToggle"]'>
                <span class="label">Error</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["disabled", "#demo-emailInput", "stateToggle", "attr"]'>
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
              <div class="nds-form-container">
                <div class="nds-form-header">
                  <label for="demo-emailInput">
                    <span class="label">Email Input</span>
                  </label>
                </div>
                <div class="nds-form-control">
                  <i class="hgi hgi-stroke hgi-mail-01 icon"></i>
                  <input type="email" id="demo-emailInput" class="nds-input" placeholder="Enter email address...">
                  <div class="nds-form-action">
                    <button class="nds-btn nds-subtle clear hidden" type="button" aria-label="Clear email">
                      <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
                    </button>
                  </div>
                </div>
                <div class="nds-form-footer">
                  <span class="nds-feedback">
                    <span class="nds-feedback-icon nds-outline nds-sm">
                      <i class="hgi hgi-solid icon"></i>
                    </span>
                    <span class="msg"></span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="nds-tabs nds-code withDivider">
            <div class="nds-tab-list-container">
              <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                  aria-controls="panel-email-input-1" id="tab-email-input-1">
                  <span class="nds-tab-label">HTML</span>
                </button>
                <button class="nds-btn nds-subtle nds-tab showMore"><i
                    class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
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
                      <label for="emailInput">
                        <span class="label">Email Input</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <i class="hgi hgi-stroke hgi-mail-01 icon"></i>
                      <input type="email" id="emailInput" class="nds-input" placeholder="Enter email address...">
                      <div class="nds-form-action">
                        <button class="nds-btn nds-subtle clear hidden" type="button" aria-label="Clear email">
                          <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
                        </button>
                      </div>
                    </div>
                    <div class="nds-form-footer">
                      <span class="nds-feedback">
                        <span class="nds-feedback-icon nds-outline nds-sm">
                          <i class="hgi hgi-solid icon"></i>
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

        <!-- Password Input -->
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Password Input</div>
            <div class="demo-action">
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='[["nds-required", ".nds-form-container", "requiredClass"], ["required", "#demo-passwordInput", "requiredAttr", "attr"]]'>
                <span class="label">Required</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["error", ".nds-form-control", "errorToggle"]'>
                <span class="label">Error</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["disabled", "#demo-passwordInput", "stateToggle", "attr"]'>
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
              <div class="nds-form-container">
                <div class="nds-form-header">
                  <label for="demo-passwordInput">
                    <span class="label">Password Input</span>
                  </label>
                </div>
                <div class="nds-form-control">
                  <div class="nds-form-action before">
                    <button class="nds-btn nds-subtle toggle-password" type="button" aria-label="Show password">
                      <i class="hgi hgi-stroke hgi-view-off icon"></i>
                    </button>
                  </div>
                  <input type="password" id="demo-passwordInput" class="nds-input" placeholder="Enter password...">
                  <div class="nds-form-action">
                    <button class="nds-btn nds-subtle clear hidden" type="button" aria-label="Clear password">
                      <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
                    </button>
                  </div>
                </div>
                <div class="nds-form-footer">
                  <span class="nds-feedback">
                    <span class="nds-feedback-icon nds-outline nds-sm">
                      <i class="hgi hgi-solid icon"></i>
                    </span>
                    <span class="msg"></span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="nds-tabs nds-code withDivider">
            <div class="nds-tab-list-container">
              <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                  aria-controls="panel-password-input-1" id="tab-password-input-1">
                  <span class="nds-tab-label">HTML</span>
                </button>
                <button class="nds-btn nds-subtle nds-tab showMore"><i
                    class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
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
                      <label for="passwordInput">
                        <span class="label">Password Input</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <div class="nds-form-action before">
                        <button class="nds-btn nds-subtle toggle-password" type="button" aria-label="Show password">
                          <i class="hgi hgi-stroke hgi-view-off icon"></i>
                        </button>
                      </div>
                      <input type="password" id="passwordInput" class="nds-input" placeholder="Enter password...">
                      <div class="nds-form-action">
                        <button class="nds-btn nds-subtle clear hidden" type="button" aria-label="Clear password">
                          <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
                        </button>
                      </div>
                    </div>
                    <div class="nds-form-footer">
                      <span class="nds-feedback">
                        <span class="nds-feedback-icon nds-outline nds-sm">
                          <i class="hgi hgi-solid icon"></i>
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

        <!-- Textarea -->
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Textarea</div>
            <div class="demo-action">
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='[["nds-required", ".nds-form-container", "requiredClass"], ["required", "#textareaInput", "requiredAttr", "attr"]]'>
                <span class="label">Required</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["error", ".nds-form-control", "errorToggle"]'>
                <span class="label">Error</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["disabled", "#textareaInput", "stateToggle", "attr"]'>
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
              <div class="nds-form-container nds-textarea">
                <div class="nds-form-header">
                  <label for="textareaInput">
                    <span class="label">Textarea</span>
                  </label>
                </div>
                <div class="nds-form-control">
                  <textarea id="textareaInput" class="nds-textarea" placeholder="Enter your message..."
                    rows="4"></textarea>
                </div>
                <div class="nds-form-footer">
                  <span class="nds-feedback">
                    <span class="nds-feedback-icon nds-outline nds-sm">
                      <i class="hgi hgi-solid icon"></i>
                    </span>
                    <span class="msg"></span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="nds-tabs nds-code withDivider">
            <div class="nds-tab-list-container">
              <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                  aria-controls="panel-textarea-1" id="tab-textarea-1">
                  <span class="nds-tab-label">HTML</span>
                </button>
                <button class="nds-btn nds-subtle nds-tab showMore"><i
                    class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
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
                      <label for="textareaInput">
                        <span class="label">Textarea</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <textarea id="textareaInput" class="nds-textarea" placeholder="Enter your message..." rows="4"></textarea>
                    </div>
                    <div class="nds-form-footer">
                      <span class="nds-feedback">
                        <span class="nds-feedback-icon nds-outline nds-sm">
                          <i class="hgi hgi-solid icon"></i>
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

        <!-- Select Dropdown -->
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Select Dropdown</div>
            <div class="demo-action">
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='[["nds-required", ".nds-form-container", "requiredClass"], ["required", "#demo-selectInput", "requiredAttr", "attr"]]'>
                <span class="label">Required</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["error", ".nds-form-control", "errorToggle"]'>
                <span class="label">Error</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["disabled", "#demo-selectInput", "stateToggle", "attr"]'>
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
              <div class="nds-form-container nds-select">
                <div class="nds-form-header">
                  <label for="demo-selectInput">
                    <span class="label">Select Dropdown</span>
                  </label>
                </div>
                <div class="nds-form-control">
                  <input type="text" id="demo-selectInput" class="nds-input nds-select-input"
                    placeholder="Choose an option..." readonly>
                  <input type="hidden" name="selectValue" class="nds-select-value">

                  <!-- Custom Dropdown Menu -->
                  <div class="nds-select-dropdown hidden">
                    <div class="select-options">
                      <button type="button" class="nds-btn nds-subtle select-option" data-value="">
                        <span class="option-text">Choose an option...</span>
                      </button>
                      <button type="button" class="nds-btn nds-subtle select-option" data-value="option1">
                        <span class="option-text">Option 1</span>
                      </button>
                      <button type="button" class="nds-btn nds-subtle select-option" data-value="option2">
                        <span class="option-text">Option 2</span>
                      </button>
                      <button type="button" class="nds-btn nds-subtle select-option" data-value="option3">
                        <span class="option-text">Option 3</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="nds-form-footer">
                  <span class="nds-feedback">
                    <span class="nds-feedback-icon nds-outline nds-sm">
                      <i class="hgi hgi-solid icon"></i>
                    </span>
                    <span class="msg"></span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="nds-tabs nds-code withDivider">
            <div class="nds-tab-list-container">
              <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                  aria-controls="panel-select-1" id="tab-select-1">
                  <span class="nds-tab-label">HTML</span>
                </button>
                <button class="nds-btn nds-subtle nds-tab showMore"><i
                    class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
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
                  <div class="nds-form-container">
                    <div class="nds-form-header">
                      <label for="selectInput">
                        <span class="label">Select Dropdown</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <input type="text" id="selectInput" class="nds-input nds-select-input" placeholder="Choose an option..." readonly>
                      <input type="hidden" name="selectValue" class="nds-select-value">
                      
                      <!-- Custom Dropdown Menu -->
                      <div class="nds-select-dropdown hidden">
                        <div class="select-options">
                          <button type="button" class="nds-btn nds-subtle select-option" data-value="">
                            <span class="option-text">Choose an option...</span>
                          </button>
                          <button type="button" class="nds-btn nds-subtle select-option" data-value="option1">
                            <span class="option-text">Option 1</span>
                          </button>
                          <button type="button" class="nds-btn nds-subtle select-option" data-value="option2">
                            <span class="option-text">Option 2</span>
                          </button>
                          <button type="button" class="nds-btn nds-subtle select-option" data-value="option3">
                            <span class="option-text">Option 3</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="nds-form-footer">
                      <span class="nds-feedback">
                        <span class="nds-feedback-icon nds-outline nds-sm">
                          <i class="hgi hgi-solid icon"></i>
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







        <!-- add new demo card here -->
      </div>
    </div>
  </div>
</section>