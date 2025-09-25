---
layout: page
title: Forms
hero_title: Form Components - National Design System
hero_description: A comprehensive collection of form input types with interactive controls and clear actions
breadcrumb: ["Components", "Forms"]
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
                <div class="nds-form-footer"></div>
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
                    <div class="nds-form-footer"></div>
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
                <div class="nds-form-footer"></div>
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
                    <div class="nds-form-footer"></div>
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
                <div class="nds-form-footer"></div>
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
                    <div class="nds-form-footer"></div>
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
                <div class="nds-form-footer"></div>
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
                    <div class="nds-form-footer"></div>
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
                <div class="nds-form-footer"></div>
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
                    <div class="nds-form-footer"></div>
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
                <div class="nds-form-footer"></div>
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
                    <div class="nds-form-footer"></div>
                  </div>
                    </code>
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
                data-toggler='["disabled", "input[type=radio]", "stateToggle", "attr"]'>
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
              <fieldset>
                <legend class="label">Radio Button Group</legend>
                <div class="nds-radio-group">
                  <div class="nds-form-container nds-radio-container">
                    <div class="nds-form-header">
                      <label for="radio1">
                        <span class="label">Neutral</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <input type="radio" id="radio1" name="radioGroup" value="option1" class="nds-radio">
                    </div>
                  </div>
                  <div class="nds-form-container nds-radio-container">
                    <div class="nds-form-header">
                      <label for="radio2">
                        <span class="label">Primary</span>
                        <span class="info">When a selection needs a further detailed explanation, it goes here.</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <input type="radio" id="radio2" name="radioGroup" value="option2" checked
                        class="nds-radio primary">
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
          <div class="nds-tabs nds-code withDivider">
            <div class="nds-tab-list-container">
              <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-radio-1"
                  id="tab-radio-1">
                  <span class="nds-tab-label">HTML</span>
                </button>
                <button class="nds-btn nds-subtle nds-tab showMore"><i
                    class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                </button>
              </nav>
            </div>
            <div class="nds-tab-content">
              <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-radio-1"
                aria-labelledby="tab-radio-1">
                <div class="nds-code-action">
                  <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                  </button>
                </div>
                <div class="nds-expandable-content">
                    <code class="lang-html code">
                  <fieldset class="nds-radio-group">
                    <legend class="label">Radio Button Group</legend>
                    <div class="nds-form-container nds-radio-container">
                      <div class="nds-form-header">
                        <label for="radio1">
                          <span class="label">Neutral</span>
                        </label>
                      </div>
                      <div class="nds-form-control">
                        <input type="radio" id="radio1" name="radioGroup" value="option1" class="nds-radio">
                      </div>
                    </div>
                    <div class="nds-form-container nds-radio-container">
                      <div class="nds-form-header">
                        <label for="radio2">
                          <span class="label">Primary</span>
                          <span class="info">When a selection needs a further detailed explanation, it goes here.</span>
                        </label>
                      </div>
                      <div class="nds-form-control">
                        <input type="radio" id="radio2" name="radioGroup" value="option2" class="nds-radio primary">
                      </div>
                    </div>
                  </fieldset>
                    </code>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Checkbox -->
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Checkbox</div>
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
                <legend class="label">Checkbox Group</legend>
                <div class="nds-check-group">
                  <div class="nds-form-container nds-check-container">
                    <div class="nds-form-header">
                      <label for="checkbox1">
                        <span class="label">Neutral</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <input type="checkbox" id="checkbox1" name="checkboxGroup" value="option1" class="nds-check">
                    </div>
                  </div>
                  <div class="nds-form-container nds-check-container">
                    <div class="nds-form-header">
                      <label for="checkbox2">
                        <span class="label">Primary</span>
                        <span class="info">When a selection needs a further detailed explanation, it goes here.</span>
                        <span class="error">
                          <span class="nds-feedback-icon nds-error nds-outline nds-sm">
                            <i class="hgi hgi-solid icon"></i>
                          </span>
                          <span class="msg">Error/Warning message.</span>
                        </span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <input type="checkbox" id="checkbox2" name="checkboxGroup" value="option2"
                        class="nds-check primary">
                    </div>
                  </div>
                  <div class="nds-form-container nds-check-container">
                    <div class="nds-form-header">
                      <label for="checkbox3">
                        <span class="label">Indeterminate</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <input type="checkbox" id="checkbox3" name="checkboxGroup" value="option3"
                        class="nds-check indeterminate">
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
                  aria-controls="panel-checkbox-1" id="tab-checkbox-1">
                  <span class="nds-tab-label">HTML</span>
                </button>
                <button class="nds-btn nds-subtle nds-tab showMore"><i
                    class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                </button>
              </nav>
            </div>
            <div class="nds-tab-content">
              <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-checkbox-1"
                aria-labelledby="tab-checkbox-1">
                <div class="nds-code-action">
                  <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                  </button>
                </div>
                <div class="nds-expandable-content">
                    <code class="lang-html code">
                  <fieldset class="nds-check-group">
                    <legend class="label">Checkbox Group</legend>
                    <div class="nds-form-container nds-check-container">
                      <div class="nds-form-header">
                        <label for="checkbox1">
                          <span class="label">Neutral</span>
                        </label>
                      </div>
                      <div class="nds-form-control">
                        <input type="checkbox" id="checkbox1" name="checkboxGroup" value="option1" class="nds-check">
                      </div>
                    </div>
                    <div class="nds-form-container nds-check-container">
                      <div class="nds-form-header">
                        <label for="checkbox2">
                          <span class="label">Primary</span>
                          <span class="info">When a selection needs a further detailed explanation, it goes here.</span>
                        </label>
                      </div>
                      <div class="nds-form-control">
                        <input type="checkbox" id="checkbox2" name="checkboxGroup" value="option2" class="nds-check primary">
                      </div>
                    </div>
                  </fieldset>
                    </code>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Switch -->
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Switch</div>
            <div class="demo-action">
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["nds-lg", ".nds-switch-container", "sizeToggle"]'>
                <span class="label">LG</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                data-toggler='["nds-md", ".nds-switch-container", "sizeToggle"]'>
                <span class="label">MD</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["nds-sm", ".nds-switch-container", "sizeToggle"]'>
                <span class="label">SM</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["disabled", "input.nds-switch-input", "stateToggle", "attr"]'>
                <span class="label">Disabled</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["rowView", ".nds-switch-group", "layoutToggle"]'>
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
                <legend class="label">Switch Group</legend>
                <div class="nds-switch-group">
                  <div class="nds-form-container nds-switch-container">
                    <div class="nds-form-header">
                      <label for="switch1">
                        <span class="label">Neutral Switch</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <div class="nds-switch">
                        <input type="checkbox" id="switch1" name="switchGroup" value="option1" class="nds-switch-input">
                        <div class="nds-switch-track">
                          <div class="nds-switch-thumb"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="nds-form-container nds-switch-container">
                    <div class="nds-form-header">
                      <label for="switch2">
                        <span class="label">Primary Switch</span>
                        <span class="info">When a selection needs a further detailed explanation, it goes here.</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <div class="nds-switch primary">
                        <input type="checkbox" id="switch2" name="switchGroup" value="option2" checked
                          class="nds-switch-input">
                        <div class="nds-switch-track">
                          <div class="nds-switch-thumb"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="nds-form-container nds-switch-container">
                    <div class="nds-form-header">
                      <label for="switch3">
                        <span class="label">Disabled Switch</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <div class="nds-switch disabled">
                        <input type="checkbox" id="switch3" name="switchGroup" value="option3" disabled
                          class="nds-switch-input">
                        <div class="nds-switch-track">
                          <div class="nds-switch-thumb"></div>
                        </div>
                      </div>
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
                  aria-controls="panel-switch-1" id="tab-switch-1">
                  <span class="nds-tab-label">HTML</span>
                </button>
                <button class="nds-btn nds-subtle nds-tab showMore"><i
                    class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                </button>
              </nav>
            </div>
            <div class="nds-tab-content">
              <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-switch-1"
                aria-labelledby="tab-switch-1">
                <div class="nds-code-action">
                  <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                  </button>
                </div>
                <div class="nds-expandable-content">
                    <code class="lang-html code">
                  <fieldset class="nds-switch-group">
                    <legend class="label">Switch Group</legend>
                    <div class="nds-form-container nds-switch-container">
                      <div class="nds-form-header">
                        <label for="switch1">
                          <span class="label">Neutral Switch</span>
                        </label>
                      </div>
                      <div class="nds-form-control">
                        <div class="nds-switch">
                          <input type="checkbox" id="switch1" name="switchGroup" value="option1" class="nds-switch-input">
                          <div class="nds-switch-track">
                            <div class="nds-switch-thumb"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="nds-form-container nds-switch-container">
                      <div class="nds-form-header">
                        <label for="switch2">
                          <span class="label">Primary Switch</span>
                          <span class="info">When a selection needs a further detailed explanation, it goes here.</span>
                        </label>
                      </div>
                      <div class="nds-form-control">
                        <div class="nds-switch primary">
                          <input type="checkbox" id="switch2" name="switchGroup" value="option2" checked class="nds-switch-input">
                          <div class="nds-switch-track">
                            <div class="nds-switch-thumb"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                    </code>
                </div>
              </div>
            </div>
          </div>
        </div>




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
                    data-year-before="40" data-year-after="5" data-hijri-offset="0">

                  <!-- Custom Calendar Dropdown -->
                  <div class="nds-date-picker-dropdown hidden">
                    <div class="calendar-header">
                      <div class="calendar-title">
                        <div class="month-year-selectors">
                          <div class="month-dropdown-wrapper">
                            <button class="nds-btn nds-subtle nds-menu-btn month-dropdown-btn" aria-expanded="false"
                              aria-label="Select month">
                              <span class="label"></span>
                            </button>
                            <div class="month-dropdown-menu hidden" role="menu">
                            </div>
                          </div>
                          <div class="year-dropdown-wrapper">
                            <button class="nds-btn nds-subtle nds-menu-btn year-dropdown-btn" aria-expanded="false"
                              aria-label="Select year">
                              <span class="label"></span>
                            </button>
                            <div class="year-dropdown-menu hidden" role="menu">
                            </div>
                          </div>
                        </div>
                        <div class="calendar-month-switch">
                          <button class="nds-btn nds-subtle next-month" type="button" aria-label="Next month">
                            <i class="hgi hgi-stroke hgi-arrow-right-02 icon"></i>
                          </button>
                          <button class="nds-btn nds-subtle prev-month" type="button" aria-label="Previous month">
                            <i class="hgi hgi-stroke hgi-arrow-left-02 icon"></i>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div class="calendar-body">
                      <div class="calendar-weekdays">
                      </div>
                      <div class="calendar-dates">
                      </div>
                    </div>

                    <div class="calendar-footer">
                      <div class="calendar-action-start">
                        <button class="nds-btn nds-secondary-outline today-btn" type="button">
                          <span class="label">Today</span>
                        </button>
                      </div>
                      <div class="calendar-action-end">
                        <button class="nds-btn nds-primary save-btn" type="button">
                          <span class="label">Save</span>
                        </button>
                        <button class="nds-btn nds-secondary-outline clear-btn" type="button">
                          <span class="label">Clear</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="nds-form-footer"></div>
              </div>

            </div>
          </div>
          <div class="nds-tabs nds-code withDivider">
            <div class="nds-tab-list-container">
              <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                  aria-controls="panel-date-picker-1" id="tab-date-picker-1">
                  <span class="nds-tab-label">HTML</span>
                </button>
                <button class="nds-btn nds-subtle nds-tab showMore"><i
                    class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                </button>
              </nav>
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
                        data-year-before="40" data-year-after="5" data-hijri-offset="0">
                  
                      <!-- Custom Calendar Dropdown -->
                      <div class="nds-date-picker-dropdown hidden">
                        <div class="calendar-header">
                          <div class="calendar-title">
                            <div class="month-year-selectors">
                              <div class="month-dropdown-wrapper">
                                <button class="nds-btn nds-subtle nds-menu-btn month-dropdown-btn" aria-expanded="false"
                                  aria-label="Select month">
                                  <span class="label"></span>
                                </button>
                                <div class="month-dropdown-menu hidden" role="menu">
                                </div>
                              </div>
                              <div class="year-dropdown-wrapper">
                                <button class="nds-btn nds-subtle nds-menu-btn year-dropdown-btn" aria-expanded="false"
                                  aria-label="Select year">
                                  <span class="label"></span>
                                </button>
                                <div class="year-dropdown-menu hidden" role="menu">
                                </div>
                              </div>
                            </div>
                            <div class="calendar-month-switch">
                              <button class="nds-btn nds-subtle next-month" type="button" aria-label="Next month">
                                <i class="hgi hgi-stroke hgi-arrow-right-02 icon"></i>
                              </button>
                              <button class="nds-btn nds-subtle prev-month" type="button" aria-label="Previous month">
                                <i class="hgi hgi-stroke hgi-arrow-left-02 icon"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                  
                        <div class="calendar-body">
                          <div class="calendar-weekdays">
                          </div>
                          <div class="calendar-dates">
                          </div>
                        </div>
                  
                        <div class="calendar-footer">
                          <div class="calendar-action-start">
                            <button class="nds-btn nds-secondary-outline today-btn" type="button">
                              <span class="label">Today</span>
                            </button>
                          </div>
                          <div class="calendar-action-end">
                            <button class="nds-btn nds-primary save-btn" type="button">
                              <span class="label">Save</span>
                            </button>
                            <button class="nds-btn nds-secondary-outline clear-btn" type="button">
                              <span class="label">Clear</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="nds-form-footer"></div>
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