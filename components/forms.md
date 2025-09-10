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
      <p class="nds-section-description">All form input types available in the National Design System with clear







































        actions</p>
    </div>
    <div class="nds-section-content">
      <div class="form-showcase">

        <!-- Text Input -->
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Text Input</div>
            <div class="demo-action">
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["disabled", "input[type=text]", "stateToggle", "attr"]'>
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
              <div class="nds-tab-panel code-example" role="tabpanel" id="panel-text-input-1"
                aria-labelledby="tab-text-input-1">
                <div class="nds-code-action">
                  <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                  </button>
                </div>
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

        <!-- Search Input -->
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Search Input</div>
            <div class="demo-action">
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["disabled", "#searchInput", "stateToggle", "attr"]'>
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
              <div class="nds-tab-panel code-example" role="tabpanel" id="panel-search-input-1"
                aria-labelledby="tab-search-input-1">
                <div class="nds-code-action">
                  <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                  </button>
                </div>
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

        <!-- Email Input -->
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Email Input</div>
            <div class="demo-action">
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["disabled", "#emailInput", "stateToggle", "attr"]'>
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
              <div class="nds-tab-panel code-example" role="tabpanel" id="panel-email-input-1"
                aria-labelledby="tab-email-input-1">
                <div class="nds-code-action">
                  <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                  </button>
                </div>
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

        <!-- Password Input -->
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Password Input</div>
            <div class="demo-action">
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["disabled", "#passwordInput", "stateToggle", "attr"]'>
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
              <div class="nds-tab-panel code-example" role="tabpanel" id="panel-password-input-1"
                aria-labelledby="tab-password-input-1">
                <div class="nds-code-action">
                  <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                  </button>
                </div>
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
              <div class="nds-tab-panel code-example" role="tabpanel" id="panel-textarea-1"
                aria-labelledby="tab-textarea-1">
                <div class="nds-code-action">
                  <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                  </button>
                </div>
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

        <!-- Select Dropdown -->
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Select Dropdown</div>
            <div class="demo-action">
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["disabled", "#selectInput", "stateToggle", "attr"]'>
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
                  <label for="selectInput">
                    <span class="label">Select Dropdown</span>
                  </label>
                </div>
                <div class="nds-form-control">
                  <input type="text" id="selectInput" class="nds-input nds-select-input"
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
              <div class="nds-tab-panel code-example" role="tabpanel" id="panel-select-1"
                aria-labelledby="tab-select-1">
                <div class="nds-code-action">
                  <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                  </button>
                </div>
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

        <!-- Radio Button Group -->
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Radio Button Group</div>
            <div class="demo-action">
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["nds-lg", ".nds-radio-container", "sizeToggle"]'>
                <span class="label">LG</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                data-toggler='["nds-md", ".nds-radio-container", "sizeToggle"]'>
                <span class="label">MD</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
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
              <div class="nds-tab-panel code-example" role="tabpanel" id="panel-radio-1" aria-labelledby="tab-radio-1">
                <div class="nds-code-action">
                  <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                  </button>
                </div>
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

        <!-- Checkbox -->
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Checkbox</div>
            <div class="demo-action">
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["nds-lg", ".nds-check-container", "sizeToggle"]'>
                <span class="label">LG</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                data-toggler='["nds-md", ".nds-check-container", "sizeToggle"]'>
                <span class="label">MD</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
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
                          <i class="hgi hgi-stroke hgi-alert-circle icon"></i>Error/Warning message.</span>
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
              <div class="nds-tab-panel code-example" role="tabpanel" id="panel-checkbox-1"
                aria-labelledby="tab-checkbox-1">
                <div class="nds-code-action">
                  <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                  </button>
                </div>
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
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">File Upload</div>
            <div class="demo-action">
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='[["single-file", ".nds-form-container", "singleFileToggle"], ["multiple", ".file-input", "multipleToggle", "attr"], ["dropBox", ".nds-form-container", "dropBoxToggle"],["nds-primary nds-secondary", ".browse-btn", "buttonStyle"],["hidden", ".nds-form-header", "hideHeader"]]'>
                <span class="label">Single File</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='[["disabled", ".multi-file-upload .file-input", "stateToggle", "attr"], ["disabled", ".browse-btn", "stateToggle", "attr"]]'>
                <span class="label">Disabled</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-action-btn" data-action="populate-demo-files">
                <span class="label">Demo Files</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                <span class="label">Remove bg</span>
              </button>
            </div>
          </div>
          <div class="demo-container">
            <div class="state-demo">
              <div class="nds-form-container nds-file-upload multi-file-upload dropBox">
                <div class="nds-form-header hidden">
                  <label for="multiFileUpload">
                    <span class="label">Upload files</span>
                    <span class="info">
                      Maximum file size allowed is 2MB, supported file formats include .jpg, .png, and .pdf.
                    </span>
                  </label>
                </div>

                <div class="nds-form-control" id="multiDropZone">
                  <input type="file" id="multiFileUpload" multiple accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.txt"
                    class="file-input" />
                  <div class="upload-zone">
                    <i class="hgi hgi-stroke hgi-file-upload upload-icon icon"></i>
                    <div class="upload-text">
                      <span class="dropFileHint">Drag and drop files here to upload</span>
                    </div>
                    <div class="upload-hint">Maximum file size allowed is 2MB, supported file formats include .jpg,
                      .png, and .pdf.</div>
                  </div>

                  <div class="upload-actions">
                    <button type="button" class="nds-btn nds-secondary nds-md browse-btn">
                      <i class="hgi hgi-stroke hgi-folder-01"></i>
                      <span class="label">Browse Files</span>
                    </button>
                  </div>
                </div>

                <div class="file-list" id="multiFileList"></div>
                <div class="nds-form-footer"></div>

                <!-- Hidden template for file items -->
                <template>
                  <div class="file-item">
                    <i class="hgi hgi-stroke hgi-tick-02 file-icon"></i>
                    <div class="progress-circle" style="display: none;">
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <circle class="progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="3" />
                        <circle class="progress-bar" cx="12" cy="12" r="10" fill="none" stroke-width="3"
                          stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round" />
                      </svg>
                      <div class="progress-info">
                        <span class="progress-percentage">
                          <span class="progress-number">0</span>
                          <span class="progress-symbol">%</span>
                        </span>
                        <span class="progress-text"></span>
                      </div>
                    </div>

                    <div class="file-info">
                      <div class="file-name"></div>
                      <div class="file-details">
                        <span class="file-size"></span>
                        <span class="file-type"></span>
                        <span class="file-status"></span>
                      </div>
                      <div class="file-error" style="display: none;">
                        <span class="error-message"></span>
                      </div>
                    </div>

                    <div class="file-actions">
                      <button type="button" class="nds-btn nds-subtle nds-md remove-file" aria-label="Remove file">
                        <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
                      </button>
                    </div>
                  </div>
                </template>
              </div> <!-- /.nds-form-container -->
            </div> <!-- /.state-demo -->
          </div> <!-- /.demo-container -->

          <div class="nds-tabs nds-code withDivider">
            <div class="nds-tab-list-container">
              <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                  aria-controls="panel-file-upload-1" id="tab-file-upload-1">
                  <span class="nds-tab-label">HTML</span>
                </button>
                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                  aria-controls="panel-file-upload-2" id="tab-file-upload-2">
                  <span class="nds-tab-label">Documentation</span>
                </button>
                <button class="nds-btn nds-subtle nds-tab showMore"><i
                    class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                </button>
              </nav>
            </div>
            <div class="nds-tab-content">
              <div class="nds-tab-panel code-example" role="tabpanel" id="panel-file-upload-1"
                aria-labelledby="tab-file-upload-1">
                <div class="nds-code-action">
                  <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                  </button>
                </div>
                <code class="lang-html code">
<div class="nds-form-container nds-file-upload multi-file-upload dropBox">
    <div class="nds-form-header hidden">
        <label for="multiFileUpload">
          <span class="label">Upload files</span>
          <span class="info">
            Maximum file size allowed is 2MB, supported file formats include .jpg, .png, and .pdf.
          </span>
        </label>
    </div>

    <div class="nds-form-control" id="multiDropZone">
        <input type="file" id="multiFileUpload" multiple accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.txt"
            class="file-input" />
        <div class="upload-zone">
            <i class="hgi hgi-stroke hgi-file-upload upload-icon icon"></i>
            <div class="upload-text">
                <span class="dropFileHint">Drag and drop files here to upload</span>
            </div>
            <div class="upload-hint">Maximum file size allowed is 2MB, supported file formats include .jpg,
                .png, and .pdf.</div>
        </div>

        <div class="upload-actions">
            <button type="button" class="nds-btn nds-secondary nds-md browse-btn">
                <i class="hgi hgi-stroke hgi-folder-01"></i>
                <span class="label">Browse Files</span>
            </button>
        </div>
    </div>

    <div class="file-list" id="multiFileList"></div>
    <div class="nds-form-footer"></div>

    <!-- Hidden template for file items -->
    <template>
        <div class="file-item">
            <i class="hgi hgi-stroke hgi-file-02 file-icon"></i>

            <div class="progress-circle" style="display: none;">
                <svg width="24" height="24" viewBox="0 0 24 24">
                    <circle class="progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="3"/>
                    <circle class="progress-bar" cx="12" cy="12" r="10" fill="none" stroke-width="3" 
                            stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round"/>
                </svg>
                <span class="progress-percentage"><span class="progress-number">0</span><span class="progress-symbol">%</span></span>
            </div>

            <div class="file-info">
                <div class="file-name"></div>
                <div class="file-details">
                    <span class="file-size"></span>
                    <span class="file-type"></span>
                    <span class="file-status"></span>
                </div>
                
                <div class="file-error" style="display: none;">
                    <i class="hgi hgi-stroke hgi-alert-circle"></i>
                    <span class="error-message"></span>
                </div>
            </div>
            <div class="file-actions">
                <button type="button" class="nds-btn nds-subtle remove-file" aria-label="Remove file">
                    <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
                </button>
            </div>
        </div>
    </template>
</div>
                </code>
              </div>
              <div class="nds-tab-panel hidden" role="tabpanel" id="panel-file-upload-2"
                aria-labelledby="tab-file-upload-2">

                <h2>File Upload API Reference</h2>

                <p>The NDS File Upload component provides a comprehensive JavaScript API for programmatic file upload
                  management with drag-and-drop support, progress tracking, and validation.</p>

                <h3>Quick Start</h3>

                <div class="nds-code">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>
                  <code class="lang-javascript">
// Get controller instance
const uploadElement = document.querySelector('.nds-file-upload');
const fileUpload = uploadElement.ndsFileUpload;

// Add files and start upload
const fileId = fileUpload.addFile(file);
fileUpload.startUpload(fileId);
                  </code>
                </div>

                <h3>Configuration</h3>

                <p>Configure the component using HTML data attributes:</p>

                <div class="nds-code">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>
                  <code class="lang-html">
<div class="nds-file-upload"
     data-upload-url="/api/upload"
     data-auto-upload="true"
     data-max-files="5" 
     data-max-file-size="10485760"
     data-accepted-types="image/*,.pdf,.docx">
</div>
                  </code>
                </div>

                <p><strong>Configuration Options:</strong></p>
                <ul>
                  <li><code>data-upload-url</code>: Server endpoint for file uploads</li>
                  <li><code>data-auto-upload</code>: Upload files automatically on selection (true/false)</li>
                  <li><code>data-max-files</code>: Maximum number of files allowed (default: 10)</li>
                  <li><code>data-max-file-size</code>: Maximum file size in bytes (default: 5MB)</li>
                  <li><code>data-accepted-types</code>: Accepted file types (MIME types or extensions)</li>
                </ul>

                <h3>Methods</h3>

                <h4>File Management</h4>

                <p><strong>addFile(file, options)</strong></p>
                <p>Adds a file to the upload queue.</p>
                <div class="nds-code">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>
                  <code class="lang-javascript">
const fileId = fileUpload.addFile(file, {
  status: 'ready',    // Initial status
  progress: 0,        // Initial progress (0-100)
  error: null         // Error message if status is 'error'
});
// Returns: string (unique file ID)
                  </code>
                </div>

                <p><strong>removeFile(fileId)</strong></p>
                <p>Removes a file from the upload queue.</p>
                <div class="nds-code">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>
                  <code class="lang-javascript">
const success = fileUpload.removeFile(fileId);
// Returns: boolean (true if file was removed)
                  </code>
                </div>

                <p><strong>clearAllFiles()</strong></p>
                <p>Removes all files from the upload queue.</p>
                <div class="nds-code">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>
                  <code class="lang-javascript">
fileUpload.clearAllFiles();
                  </code>
                </div>

                <h4>File Information</h4>

                <p><strong>getFile(fileId)</strong></p>
                <p>Get file data by ID.</p>
                <div class="nds-code">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>
                  <code class="lang-javascript">
const fileData = fileUpload.getFile(fileId);
// Returns: { file, id, status, progress, error, response }
                  </code>
                </div>

                <p><strong>getAllFiles()</strong></p>
                <p>Get all files in the upload queue.</p>
                <div class="nds-code">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>
                  <code class="lang-javascript">
const allFiles = fileUpload.getAllFiles();
// Returns: Array of file objects
                  </code>
                </div>

                <p><strong>getFilesByStatus(status)</strong></p>
                <p>Filter files by status.</p>
                <div class="nds-code">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>
                  <code class="lang-javascript">
const readyFiles = fileUpload.getFilesByStatus('ready');
const uploadingFiles = fileUpload.getFilesByStatus('uploading');
const completedFiles = fileUpload.getFilesByStatus('complete');
                  </code>
                </div>

                <h4>Status Management</h4>

                <p><strong>setFileStatus(fileId, status, options)</strong></p>
                <p>Update file status.</p>
                <div class="nds-code">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>
                  <code class="lang-javascript">
fileUpload.setFileStatus(fileId, 'error', {
    error: 'Upload failed',
    progress: 0
});
                  </code>
                </div>

                <p><strong>setFileProgress(fileId, progress)</strong></p>
                <p>Update upload progress (0-100).</p>
                <div class="nds-code">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>
                  <code class="lang-javascript">
fileUpload.setFileProgress(fileId, 75); // 75% complete
                  </code>
                </div>

                <h4>Upload Control</h4>

                <p><strong>startUpload(fileId)</strong></p>
                <p>Start upload for specific file or all ready files.</p>
                <div class="nds-code">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>
                  <code class="lang-javascript">
fileUpload.startUpload(fileId);  // Upload specific file
fileUpload.startUpload();        // Upload all ready files
                  </code>
                </div>

                <h3>Events</h3>

                <p>Listen for upload events:</p>

                <div class="nds-code">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>
                  <code class="lang-javascript">
const uploadElement = document.querySelector('.nds-file-upload');

uploadElement.addEventListener('filesSelected', (e) => {
    console.log('Files selected:', e.detail.files);
});

uploadElement.addEventListener('uploadProgress', (e) => {
    console.log('Progress:', e.detail.progress + '%');
});

uploadElement.addEventListener('uploadComplete', (e) => {
    console.log('Upload complete:', e.detail.response);
});

uploadElement.addEventListener('uploadError', (e) => {
    console.error('Upload error:', e.detail.error);
});
                  </code>
                </div>

                <p><strong>Available Events:</strong></p>
                <ul>
                  <li><code>filesSelected</code>: Fired when files are selected</li>
                  <li><code>uploadProgress</code>: Upload progress update</li>
                  <li><code>uploadComplete</code>: Upload completed successfully</li>
                  <li><code>uploadError</code>: Upload failed or validation error</li>
                </ul>

                <h3>File Status Values</h3>

                <ul>
                  <li><strong>ready</strong>: File selected, ready for upload</li>
                  <li><strong>uploading</strong>: Upload in progress</li>
                  <li><strong>complete</strong>: Upload successful</li>
                  <li><strong>error</strong>: Upload failed</li>
                </ul>

                <h3>Example Usage</h3>

                <div class="nds-code">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>
                  <code class="lang-javascript">
// Get controller reference
const uploadElement = document.querySelector('.nds-file-upload');
const fileUpload = uploadElement.ndsFileUpload;

// Add custom event handlers
uploadElement.addEventListener('uploadProgress', (e) => {
    updateCustomProgressBar(e.detail.progress);
});

uploadElement.addEventListener('uploadError', (e) => {
    showNotification('Upload failed: ' + e.detail.error, 'error');
});

// Programmatically add files
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const fileId = fileUpload.addFile(file);
        fileUpload.startUpload(fileId);
    }
};

// Check upload status
const pendingUploads = fileUpload.getFilesByStatus('uploading');
console.log(pendingUploads.length + ' uploads in progress');

// Clear all files on form reset
document.getElementById('resetButton').addEventListener('click', () => {
    fileUpload.clearAllFiles();
});
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
                data-toggler='["disabled", "#datePickerInput", "stateToggle", "attr"]'>
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
                  <label for="datePickerInput">
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
              <div class="nds-tab-panel code-example" role="tabpanel" id="panel-date-picker-1"
                aria-labelledby="tab-date-picker-1">
                <div class="nds-code-action">
                  <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                  </button>
                </div>
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
              <div class="nds-tab-panel code-example" role="tabpanel" id="panel-switch-1"
                aria-labelledby="tab-switch-1">
                <div class="nds-code-action">
                  <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                  </button>
                </div>
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

        <!-- add new demo card here -->
      </div>
    </div>
  </div>
</section>