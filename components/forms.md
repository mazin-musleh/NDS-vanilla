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
              <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                data-toggler='["disabled", "input[type=text]", "stateToggle", "attr"]'>
                <span class="label">Disabled</span>
              </button>
              <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                <span class="label">Remove bg</span>
              </button>
            </div>
          </div>
          <div class="demo-container">
            <div class="state-demo">
              <div class="nds-form-container">
                <div class="nds-form-header">
                  <label class="label" for="textInput">Text Input</label>
                </div>
                <div class="nds-form-control">
                  <input type="text" id="textInput" class="nds-input" placeholder="Enter text..." value="">
                  <div class="nds-form-action">
                    <button class="nds-btn nds-btn-subtle clear hidden" type="button" aria-label="Clear input">
                      <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
                    </button>
                  </div>
                </div>
                <div class="nds-form-footer"></div>
              </div>
            </div>
          </div>
          <div class="code-example">
            <div class="usage-header">
              <span>Usage</span>
              <button class="copy-btn" aria-label="Copy code example">
                <i class="hgi hgi-stroke hgi-copy-01"></i>
              </button>
            </div>
            <pre class="text-input-code"><code>&lt;div class="nds-form-container"&gt;
    &lt;div class="nds-form-header"&gt;
        &lt;label class="label" for="textInput"&gt;Text Input&lt;/label&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-control"&gt;
        &lt;input type="text" id="textInput" class="nds-input" placeholder="Enter text..." value=""&gt;
        &lt;div class="nds-form-action"&gt;
            &lt;button class="clear hidden" type="button" aria-label="Clear input"&gt;
                &lt;i class="hgi hgi-stroke hgi-cancel-01 icon"&gt;&lt;/i&gt;
            &lt;/button&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-footer"&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>
          </div>
        </div>

        <!-- Search Input -->
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Search Input</div>
            <div class="demo-action">
              <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                data-toggler='["disabled", "#searchInput", "stateToggle", "attr"]'>
                <span class="label">Disabled</span>
              </button>
              <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                <span class="label">Remove bg</span>
              </button>
            </div>
          </div>
          <div class="demo-container">
            <div class="state-demo">
              <div class="nds-form-container">
                <div class="nds-form-header">
                  <label class="label" for="searchInput">Search Input</label>
                </div>
                <div class="nds-form-control">
                  <i class="hgi hgi-stroke hgi-search-01 icon"></i>
                  <input type="text" id="searchInput" class="nds-search-input" name="search" placeholder="Search...">
                  <div class="nds-form-action">
                    <button class="nds-btn nds-btn-subtle voiceInput" type="button" aria-label="Voice input">
                      <i class="hgi hgi-stroke hgi-mic-01 icon"></i>
                    </button>
                    <button class="nds-btn nds-btn-subtle clear hidden" type="button" aria-label="Clear search">
                      <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
                    </button>
                  </div>
                </div>
                <div class="nds-form-footer"></div>
              </div>
            </div>
          </div>
          <div class="code-example">
            <div class="usage-header">
              <span>Usage</span>
              <button class="copy-btn" aria-label="Copy code example">
                <i class="hgi hgi-stroke hgi-copy-01"></i>
              </button>
            </div>
            <pre class="search-input-code"><code>&lt;div class="nds-form-container"&gt;
    &lt;div class="nds-form-header"&gt;
        &lt;label class="label" for="searchInput"&gt;Search Input&lt;/label&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-control"&gt;
        &lt;i class="hgi hgi-stroke hgi-search-01 icon"&gt;&lt;/i&gt;
        &lt;input type="text" id="searchInput" class="nds-search-input" name="search" placeholder="Search..."&gt;
        &lt;div class="nds-form-action"&gt;
            &lt;button class="voiceInput" type="button" aria-label="Voice input"&gt;
                &lt;i class="hgi hgi-stroke hgi-mic-01 icon"&gt;&lt;/i&gt;
            &lt;/button&gt;
            &lt;button class="clear hidden" type="button" aria-label="Clear search"&gt;
                &lt;i class="hgi hgi-stroke hgi-cancel-01 icon"&gt;&lt;/i&gt;
            &lt;/button&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-footer"&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>
          </div>
        </div>

        <!-- Email Input -->
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Email Input</div>
            <div class="demo-action">
              <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                data-toggler='["disabled", "#emailInput", "stateToggle", "attr"]'>
                <span class="label">Disabled</span>
              </button>
              <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                <span class="label">Remove bg</span>
              </button>
            </div>
          </div>
          <div class="demo-container">
            <div class="state-demo">
              <div class="nds-form-container">
                <div class="nds-form-header">
                  <label class="label" for="emailInput">Email Input</label>
                </div>
                <div class="nds-form-control">
                  <i class="hgi hgi-stroke hgi-mail-01 icon"></i>
                  <input type="email" id="emailInput" class="nds-input" placeholder="Enter email address...">
                  <div class="nds-form-action">
                    <button class="nds-btn nds-btn-subtle clear hidden" type="button" aria-label="Clear email">
                      <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
                    </button>
                  </div>
                </div>
                <div class="nds-form-footer"></div>
              </div>
            </div>
          </div>
          <div class="code-example">
            <div class="usage-header">
              <span>Usage</span>
              <button class="copy-btn" aria-label="Copy code example">
                <i class="hgi hgi-stroke hgi-copy-01"></i>
              </button>
            </div>
            <pre class="email-input-code"><code>&lt;div class="nds-form-container"&gt;
    &lt;div class="nds-form-header"&gt;
        &lt;label class="label" for="emailInput"&gt;Email Input&lt;/label&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-control"&gt;
        &lt;i class="hgi hgi-stroke hgi-mail-01 icon"&gt;&lt;/i&gt;
        &lt;input type="email" id="emailInput" class="nds-input" placeholder="Enter email address..."&gt;
        &lt;div class="nds-form-action"&gt;
            &lt;button class="clear hidden" type="button" aria-label="Clear email"&gt;
                &lt;i class="hgi hgi-stroke hgi-cancel-01 icon"&gt;&lt;/i&gt;
            &lt;/button&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-footer"&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>
          </div>
        </div>

        <!-- Password Input -->
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Password Input</div>
            <div class="demo-action">
              <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                data-toggler='["disabled", "#passwordInput", "stateToggle", "attr"]'>
                <span class="label">Disabled</span>
              </button>
              <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                <span class="label">Remove bg</span>
              </button>
            </div>
          </div>
          <div class="demo-container">
            <div class="state-demo">
              <div class="nds-form-container">
                <div class="nds-form-header">
                  <label class="label" for="passwordInput">Password Input</label>
                </div>
                <div class="nds-form-control">
                  <i class="hgi hgi-stroke hgi-lock-01 icon"></i>
                  <input type="password" id="passwordInput" class="nds-input" placeholder="Enter password...">
                  <div class="nds-form-action">
                    <button class="nds-btn nds-btn-subtle toggle-password" type="button" aria-label="Show password">
                      <i class="hgi hgi-stroke hgi-view-off icon"></i>
                    </button>
                    <button class="nds-btn nds-btn-subtle clear hidden" type="button" aria-label="Clear password">
                      <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
                    </button>
                  </div>
                </div>
                <div class="nds-form-footer"></div>
              </div>
            </div>
          </div>
          <div class="code-example">
            <div class="usage-header">
              <span>Usage</span>
              <button class="copy-btn" aria-label="Copy code example">
                <i class="hgi hgi-stroke hgi-copy-01"></i>
              </button>
            </div>
            <pre class="password-input-code"><code>&lt;div class="nds-form-container"&gt;
    &lt;div class="nds-form-header"&gt;
        &lt;label class="label" for="passwordInput"&gt;Password Input&lt;/label&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-control"&gt;
        &lt;i class="hgi hgi-stroke hgi-lock-01 icon"&gt;&lt;/i&gt;
        &lt;input type="password" id="passwordInput" class="nds-input" placeholder="Enter password..."&gt;
        &lt;div class="nds-form-action"&gt;
            &lt;button class="toggle-password" type="button" aria-label="Show password"&gt;
                &lt;i class="hgi hgi-stroke hgi-eye-off icon"&gt;&lt;/i&gt;
            &lt;/button&gt;
            &lt;button class="clear hidden" type="button" aria-label="Clear password"&gt;
                &lt;i class="hgi hgi-stroke hgi-cancel-01 icon"&gt;&lt;/i&gt;
            &lt;/button&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-footer"&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>
          </div>
        </div>

        <!-- Textarea -->
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Textarea</div>
            <div class="demo-action">
              <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                data-toggler='["disabled", "#textareaInput", "stateToggle", "attr"]'>
                <span class="label">Disabled</span>
              </button>
              <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                <span class="label">Remove bg</span>
              </button>
            </div>
          </div>
          <div class="demo-container">
            <div class="state-demo">
              <div class="nds-form-container nds-textarea">
                <div class="nds-form-header">
                  <label class="label" for="textareaInput">Textarea</label>
                </div>
                <div class="nds-form-control">
                  <textarea id="textareaInput" class="nds-textarea" placeholder="Enter your message..."
                    rows="4"></textarea>
                </div>
                <div class="nds-form-footer"></div>
              </div>
            </div>
          </div>
          <div class="code-example">
            <div class="usage-header">
              <span>Usage</span>
              <button class="copy-btn" aria-label="Copy code example">
                <i class="hgi hgi-stroke hgi-copy-01"></i>
              </button>
            </div>
            <pre class="textarea-code"><code>&lt;div class="nds-form-container nds-textarea"&gt;
    &lt;div class="nds-form-header"&gt;
        &lt;label class="label" for="textareaInput"&gt;Textarea&lt;/label&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-control"&gt;
        &lt;textarea id="textareaInput" class="nds-textarea" placeholder="Enter your message..." rows="4"&gt;&lt;/textarea&gt;
        &lt;div class="nds-form-action"&gt;
            &lt;button class="clear hidden" type="button" aria-label="Clear textarea"&gt;
                &lt;i class="hgi hgi-stroke hgi-cancel-01 icon"&gt;&lt;/i&gt;
            &lt;/button&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-footer"&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>
          </div>
        </div>

        <!-- Select Dropdown -->
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Select Dropdown</div>
            <div class="demo-action">
              <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                data-toggler='["disabled", "#selectInput", "stateToggle", "attr"]'>
                <span class="label">Disabled</span>
              </button>
              <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                <span class="label">Remove bg</span>
              </button>
            </div>
          </div>
          <div class="demo-container">
            <div class="state-demo">
              <div class="nds-form-container nds-select">
                <div class="nds-form-header">
                  <label class="label" for="selectInput">Select Dropdown</label>
                </div>
                <div class="nds-form-control">
                  <input type="text" id="selectInput" class="nds-input nds-select-input"
                    placeholder="Choose an option..." readonly>
                  <input type="hidden" name="selectValue" class="nds-select-value">

                  <!-- Custom Dropdown Menu -->
                  <div class="nds-select-dropdown hidden">
                    <div class="select-options">
                      <button type="button" class="nds-btn nds-btn-subtle select-option" data-value="">
                        <span class="option-text">Choose an option...</span>
                      </button>
                      <button type="button" class="nds-btn nds-btn-subtle select-option" data-value="option1">
                        <span class="option-text">Option 1</span>
                      </button>
                      <button type="button" class="nds-btn nds-btn-subtle select-option" data-value="option2">
                        <span class="option-text">Option 2</span>
                      </button>
                      <button type="button" class="nds-btn nds-btn-subtle select-option" data-value="option3">
                        <span class="option-text">Option 3</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="nds-form-footer"></div>
              </div>
            </div>
          </div>
          <div class="code-example">
            <div class="usage-header">
              <span>Usage</span>
              <button class="copy-btn" aria-label="Copy code example">
                <i class="hgi hgi-stroke hgi-copy-01"></i>
              </button>
            </div>
            <pre class="select-code"><code>&lt;div class="nds-form-container"&gt;
    &lt;div class="nds-form-header"&gt;
        &lt;label class="label" for="selectInput"&gt;Select Dropdown&lt;/label&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-control"&gt;
        &lt;input type="text" id="selectInput" class="nds-input nds-select-input" placeholder="Choose an option..." readonly&gt;
        &lt;input type="hidden" name="selectValue" class="nds-select-value"&gt;
        
        &lt;!-- Custom Dropdown Menu --&gt;
        &lt;div class="nds-select-dropdown hidden"&gt;
            &lt;div class="select-options"&gt;
                &lt;button type="button" class="nds-btn nds-btn-subtle select-option" data-value=""&gt;
                    &lt;span class="option-text"&gt;Choose an option...&lt;/span&gt;
                &lt;/button&gt;
                &lt;button type="button" class="nds-btn nds-btn-subtle select-option" data-value="option1"&gt;
                    &lt;span class="option-text"&gt;Option 1&lt;/span&gt;
                &lt;/button&gt;
                &lt;button type="button" class="nds-btn nds-btn-subtle select-option" data-value="option2"&gt;
                    &lt;span class="option-text"&gt;Option 2&lt;/span&gt;
                &lt;/button&gt;
                &lt;button type="button" class="nds-btn nds-btn-subtle select-option" data-value="option3"&gt;
                    &lt;span class="option-text"&gt;Option 3&lt;/span&gt;
                &lt;/button&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-footer"&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>
          </div>
        </div>

        <!-- Radio Button Group -->
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Radio Button Group</div>
            <div class="demo-action">
              <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                data-toggler='["size-lg", ".nds-radio-container", "sizeToggle"]'>
                <span class="label">LG</span>
              </button>
              <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn selected"
                data-toggler='["size-md", ".nds-radio-container", "sizeToggle"]'>
                <span class="label">MD</span>
              </button>
              <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                data-toggler='["size-sm", ".nds-radio-container", "sizeToggle"]'>
                <span class="label">SM</span>
              </button>
              <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                data-toggler='["disabled", "input[type=radio]", "stateToggle", "attr"]'>
                <span class="label">Disabled</span>
              </button>
              <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                data-toggler='["rowView", ".nds-radio-group", "layoutToggle"]'>
                <span class="label">RowView</span>
              </button>
              <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
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
                      <label class="label" for="radio1">Neutral</label>
                    </div>
                    <div class="nds-form-control">
                      <input type="radio" id="radio1" name="radioGroup" value="option1" class="nds-radio">
                    </div>
                  </div>
                  <div class="nds-form-container nds-radio-container">
                    <div class="nds-form-header">
                      <label class="label" for="radio2">Primary</label>
                      <span class="info">When a selection needs a further detailed explanation, it goes here.</span>
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
          <div class="code-example">
            <div class="usage-header">
              <span>Usage</span>
              <button class="copy-btn" aria-label="Copy code example">
                <i class="hgi hgi-stroke hgi-copy-01"></i>
              </button>
            </div>
            <pre class="radio-code"><code>&lt;fieldset class="nds-radio-group"&gt;
    &lt;legend class="label"&gt;Radio Button Group&lt;/legend&gt;
    &lt;div class="nds-form-container nds-radio-container"&gt;
        &lt;div class="nds-form-header"&gt;
            &lt;label class="label" for="radio1"&gt;Neutral&lt;/label&gt;
        &lt;/div&gt;
        &lt;div class="nds-form-control"&gt;
            &lt;input type="radio" id="radio1" name="radioGroup" value="option1" class="nds-radio"&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-container nds-radio-container"&gt;
        &lt;div class="nds-form-header"&gt;
            &lt;label class="label" for="radio2"&gt;Primary&lt;/label&gt;
            &lt;span class="info"&gt;When a selection needs a further detailed explanation, it goes here.&lt;/span&gt;
        &lt;/div&gt;
        &lt;div class="nds-form-control"&gt;
            &lt;input type="radio" id="radio2" name="radioGroup" value="option2" class="nds-radio primary"&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/fieldset&gt;</code></pre>
          </div>
        </div>

        <!-- Checkbox -->
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Checkbox</div>
            <div class="demo-action">
              <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                data-toggler='["size-lg", ".nds-check-container", "sizeToggle"]'>
                <span class="label">LG</span>
              </button>
              <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn selected"
                data-toggler='["size-md", ".nds-check-container", "sizeToggle"]'>
                <span class="label">MD</span>
              </button>
              <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                data-toggler='["size-sm", ".nds-check-container", "sizeToggle"]'>
                <span class="label">SM</span>
              </button>
              <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                data-toggler='["disabled", "input[type=checkbox]", "stateToggle", "attr"]'>
                <span class="label">Disabled</span>
              </button>
              <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                data-toggler='["rowView", ".nds-check-group", "layoutToggle"]'>
                <span class="label">RowView</span>
              </button>
              <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
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
                      <label class="label" for="checkbox1">Neutral</label>
                    </div>
                    <div class="nds-form-control">
                      <input type="checkbox" id="checkbox1" name="checkboxGroup" value="option1" class="nds-check">
                    </div>
                  </div>
                  <div class="nds-form-container nds-check-container">
                    <div class="nds-form-header">
                      <label class="label" for="checkbox2">Primary</label>
                      <span class="info">When a selection needs a further detailed explanation, it goes here.</span>
                      <span class="error">
                        <i class="hgi hgi-stroke hgi-alert-circle icon"></i>Error/Warning message.</span>
                    </div>
                    <div class="nds-form-control">
                      <input type="checkbox" id="checkbox2" name="checkboxGroup" value="option2"
                        class="nds-check primary">
                    </div>
                  </div>
                  <div class="nds-form-container nds-check-container">
                    <div class="nds-form-header">
                      <label class="label" for="checkbox3">Indeterminate</label>
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
          <div class="code-example">
            <div class="usage-header">
              <span>Usage</span>
              <button class="copy-btn" aria-label="Copy code example">
                <i class="hgi hgi-stroke hgi-copy-01"></i>
              </button>
            </div>
            <pre class="checkbox-code"><code>&lt;fieldset class="nds-check-group"&gt;
    &lt;legend class="label"&gt;Checkbox Group&lt;/legend&gt;
    &lt;div class="nds-form-container nds-check-container"&gt;
        &lt;div class="nds-form-header"&gt;
            &lt;label class="label" for="checkbox1"&gt;Neutral&lt;/label&gt;
        &lt;/div&gt;
        &lt;div class="nds-form-control"&gt;
            &lt;input type="checkbox" id="checkbox1" name="checkboxGroup" value="option1" class="nds-check"&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-container nds-check-container"&gt;
        &lt;div class="nds-form-header"&gt;
            &lt;label class="label" for="checkbox2"&gt;Primary&lt;/label&gt;
            &lt;span class="info"&gt;When a selection needs a further detailed explanation, it goes here.&lt;/span&gt;
        &lt;/div&gt;
        &lt;div class="nds-form-control"&gt;
            &lt;input type="checkbox" id="checkbox2" name="checkboxGroup" value="option2" class="nds-check primary"&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/fieldset&gt;</code></pre>
          </div>
        </div>
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">File Upload</div>
            <div class="demo-action">
              <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                data-toggler='[["single-file", ".nds-form-container", "singleFileToggle"], ["multiple", ".file-input", "multipleToggle", "attr"], ["dropBox", ".nds-form-container", "dropBoxToggle"],["nds-btn-primary nds-btn-secondary", ".browse-btn", "buttonStyle"],["hidden", ".nds-form-header", "hideHeader"]]'>
                <span class="label">Single File</span>
              </button>
              <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                data-toggler='[["disabled", ".multi-file-upload .file-input", "stateToggle", "attr"], ["disabled", ".browse-btn", "stateToggle", "attr"]]'>
                <span class="label">Disabled</span>
              </button>
              <button class="nds-btn nds-btn-sm nds-btn-subtle demo-action-btn" data-action="populate-demo-files">
                <span class="label">Demo Files</span>
              </button>
              <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                <span class="label">Remove bg</span>
              </button>
            </div>
          </div>
          <div class="demo-container">
            <div class="state-demo">
              <div class="nds-form-container nds-file-upload multi-file-upload dropBox">
                <div class="nds-form-header hidden">
                  <label class="label" for="multiFileUpload">Upload files</label>
                  <span class="info">
                    Maximum file size allowed is 2MB, supported file formats include .jpg, .png, and .pdf.
                  </span>
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
                    <button type="button" class="nds-btn nds-btn-secondary nds-btn-md browse-btn">
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
                      <button type="button" class="nds-btn nds-btn-subtle nds-btn-md remove-file"
                        aria-label="Remove file">
                        <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
                      </button>
                    </div>
                  </div>
                </template>
              </div> <!-- /.nds-form-container -->
            </div> <!-- /.state-demo -->
          </div> <!-- /.demo-container -->

          <div class="nds-tabs withDivider">
            <div class="nds-tab-list-container">
              <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                <button class="nds-btn nds-btn-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-1"
                  id="tab-1">
                  <span class="nds-tab-label">Code Example</span>
                </button>
                <button class="nds-btn nds-btn-subtle nds-tab" role="tab" aria-selected="false" aria-controls="panel-2"
                  id="tab-2">
                  <span class="nds-tab-label">Documentation</span>
                </button>
                <button class="nds-btn nds-btn-subtle nds-tab" role="tab" aria-selected="false" aria-controls="panel-3"
                  id="tab-3">
                  <span class="nds-tab-label">api</span>
                </button>
                <button class="nds-btn nds-btn-subtle nds-tab showMore"><i
                    class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                </button>
              </nav>
            </div>
            <div class="nds-tab-content">
              <div class="nds-tab-panel hug" role="tabpanel" id="panel-1" aria-labelledby="tab-1">

                <div class="code-example">
                  <div class="usage-header">
                    <span>Usage</span>
                    <button class="copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>


                  <code class="multi-file-upload-code">
&lt;div class="nds-form-container nds-file-upload multi-file-upload dropBox"&gt;
    &lt;div class="nds-form-header hidden"&gt;
        &lt;label class="label" for="multiFileUpload"&gt;Upload files&lt;/label&gt;
        &lt;span class="info"&gt;
            Maximum file size allowed is 2MB, supported file formats include .jpg, .png, and .pdf.
        &lt;/span&gt;
    &lt;/div&gt;

    &lt;div class="nds-form-control" id="multiDropZone"&gt;
        &lt;input type="file" id="multiFileUpload" multiple accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.txt"
            class="file-input" /&gt;
        &lt;div class="upload-zone"&gt;
            &lt;i class="hgi hgi-stroke hgi-file-upload upload-icon icon"&gt;&lt;/i&gt;
            &lt;div class="upload-text"&gt;
                &lt;span class="dropFileHint"&gt;Drag and drop files here to upload&lt;/span&gt;
            &lt;/div&gt;
            &lt;div class="upload-hint"&gt;Maximum file size allowed is 2MB, supported file formats include .jpg,
                .png, and .pdf.&lt;/div&gt;
        &lt;/div&gt;

        &lt;div class="upload-actions"&gt;
            &lt;button type="button" class="nds-btn nds-btn-secondary nds-btn-md browse-btn"&gt;
                &lt;i class="hgi hgi-stroke hgi-folder-01"&gt;&lt;/i&gt;
                &lt;span class="label"&gt;Browse Files&lt;/span&gt;
            &lt;/button&gt;
        &lt;/div&gt;
    &lt;/div&gt;

    &lt;div class="file-list" id="multiFileList"&gt;&lt;/div&gt;
    &lt;div class="nds-form-footer"&gt;&lt;/div&gt;

    &lt;!-- Hidden template for file items --&gt;
    &lt;template&gt;
        &lt;div class="file-item"&gt;
            &lt;i class="hgi hgi-stroke hgi-file-02 file-icon"&gt;&lt;/i&gt;

            &lt;div class="progress-circle" style="display: none;"&gt;
                &lt;svg width="24" height="24" viewBox="0 0 24 24"&gt;
                    &lt;circle class="progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="3"/&gt;
                    &lt;circle class="progress-bar" cx="12" cy="12" r="10" fill="none" stroke-width="3" 
                            stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round"/&gt;
                &lt;/svg&gt;
                &lt;span class="progress-percentage"&gt;&lt;span class="progress-number"&gt;0&lt;/span&gt;&lt;span class="progress-symbol"&gt;%&lt;/span&gt;&lt;/span&gt;
            &lt;/div&gt;

            &lt;div class="file-info"&gt;
                &lt;div class="file-name"&gt;&lt;/div&gt;
                &lt;div class="file-details"&gt;
                    &lt;span class="file-size"&gt;&lt;/span&gt;
                    &lt;span class="file-type"&gt;&lt;/span&gt;
                    &lt;span class="file-status"&gt;&lt;/span&gt;
                &lt;/div&gt;
                
                &lt;div class="file-error" style="display: none;"&gt;
                    &lt;i class="hgi hgi-stroke hgi-alert-circle"&gt;&lt;/i&gt;
                    &lt;span class="error-message"&gt;&lt;/span&gt;
                &lt;/div&gt;
            &lt;/div&gt;
            &lt;div class="file-actions"&gt;
                &lt;button type="button" class="nds-btn nds-btn-subtle remove-file" aria-label="Remove file"&gt;
                    &lt;i class="hgi hgi-stroke hgi-cancel-01 icon"&gt;&lt;/i&gt;
                &lt;/button&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/template&gt;
&lt;/div&gt;
  </code>


                </div> <!-- /.code-example -->


              </div>
              <div class="nds-tab-panel hidden" role="tabpanel" id="panel-2" aria-labelledby="tab-2">

                <h2>File Upload Controller Documentation</h2>

                <p>The NDS File Upload component provides a comprehensive JavaScript controller for programmatic control
                  of file uploads.</p>

                <h3>Configuration</h3>

                <p>Configure the upload component using data attributes:</p>

                <div class="code-example">
                  <code class="language-html">
&lt;div class="nds-file-upload" 
     data-upload-url="/api/upload"
     data-auto-upload="true"
     data-max-files="5"
     data-max-file-size="10485760"
     data-accepted-types="image/*,application/pdf"&gt;
&lt;/div&gt;
                  </code>
                </div>

                <p><strong>Configuration Options:</strong></p>
                <ul>
                  <li><code>data-upload-url</code>: Server endpoint for file uploads</li>
                  <li><code>data-auto-upload</code>: Enable automatic upload on file selection
                    (<code>true</code>/<code>false</code>)</li>
                  <li><code>data-max-files</code>: Maximum number of files allowed</li>
                  <li><code>data-max-file-size</code>: Maximum file size in bytes</li>
                  <li><code>data-accepted-types</code>: Comma-separated list of accepted MIME types</li>
                </ul>

                <h3>Controller Access</h3>

                <p>Access the controller through the upload container element:</p>

                <div class="code-example">
                  <code class="language-javascript">
const uploadElement = document.querySelector('.nds-file-upload');
const ndsFileUpload = uploadElement.ndsFileUpload;
                  </code>
                </div>

                <h3>File Management Methods</h3>

                <h4><code>addFile(file, options)</code></h4>
                <p>Add a file programmatically:</p>
                <div class="code-example">
                  <code class="language-javascript">
const fileId = ndsFileUpload.addFile(file, {
    status: 'ready',     // 'ready', 'uploading', 'complete', 'error'
    progress: 0,         // Upload progress (0-100)
    error: null          // Error message if status is 'error'
});
                  </code>
                </div>

                <h4><code>removeFile(fileId)</code></h4>
                <p>Remove a specific file:</p>
                <div class="code-example">
                  <code class="language-javascript">
const success = ndsFileUpload.removeFile(fileId);
                  </code>
                </div>

                <h4><code>clearAllFiles()</code></h4>
                <p>Remove all files:</p>
                <div class="code-example">
                  <code class="language-javascript">
ndsFileUpload.clearAllFiles();
                  </code>
                </div>

                <h3>File Information Methods</h3>

                <h4><code>getFile(fileId)</code></h4>
                <p>Get file data by ID:</p>
                <div class="code-example">
                  <code class="language-javascript">
const fileData = ndsFileUpload.getFile(fileId);
// Returns: { file, id, status, progress, error, response }
                  </code>
                </div>

                <h4><code>getAllFiles()</code></h4>
                <p>Get all files:</p>
                <div class="code-example">
                  <code class="language-javascript">
const allFiles = ndsFileUpload.getAllFiles();
                  </code>
                </div>

                <h4><code>getFilesByStatus(status)</code></h4>
                <p>Get files by status:</p>
                <div class="code-example">
                  <code class="language-javascript">
const uploadingFiles = ndsFileUpload.getFilesByStatus('uploading');
const completedFiles = ndsFileUpload.getFilesByStatus('complete');
                  </code>
                </div>

                <h3>Status Management Methods</h3>

                <h4><code>setFileStatus(fileId, status, options)</code></h4>
                <p>Update file status:</p>
                <div class="code-example">
                  <code class="language-javascript">
ndsFileUpload.setFileStatus(fileId, 'error', {
    error: 'Upload failed',
    progress: 0
});
                  </code>
                </div>

                <h4><code>setFileProgress(fileId, progress)</code></h4>
                <p>Update upload progress:</p>
                <div class="code-example">
                  <code class="language-javascript">
ndsFileUpload.setFileProgress(fileId, 75); // 75% complete
                  </code>
                </div>

                <h3>Upload Control Methods</h3>

                <h4><code>startUpload(fileId)</code></h4>
                <p>Start upload for specific file or all ready files:</p>
                <div class="code-example">
                  <code class="language-javascript">
ndsFileUpload.startUpload(fileId);  // Upload specific file
ndsFileUpload.startUpload();        // Upload all ready files
                  </code>
                </div>

                <h3>Events</h3>

                <p>Listen for upload events:</p>

                <div class="code-example">
                  <code class="language-javascript">
uploadElement.addEventListener('filesSelected', (e) => {
    console.log('Files selected:', e.detail.files);
});

uploadElement.addEventListener('uploadProgress', (e) => {
    console.log(`Progress: ${e.detail.progress}%`);
});

uploadElement.addEventListener('uploadSuccess', (e) => {
    console.log('Upload complete:', e.detail.response);
});

uploadElement.addEventListener('uploadError', (e) => {
    console.log('Upload failed:', e.detail.error);
});

uploadElement.addEventListener('beforeUpload', (e) => {
    // Modify form data or cancel upload
    e.detail.formData.append('customField', 'value');
    // e.detail.cancel = true; // Cancel upload
});
                  </code>
                </div>

                <h3>File Status Values</h3>

                <ul>
                  <li><strong><code>ready</code></strong>: File selected, ready for upload</li>
                  <li><strong><code>uploading</code></strong>: Upload in progress</li>
                  <li><strong><code>complete</code></strong>: Upload successful</li>
                  <li><strong><code>error</code></strong>: Upload failed</li>
                </ul>

                <h3>Example Usage</h3>

                <div class="code-example">
                  <code class="language-javascript">
// Get controller reference
const uploadElement = document.querySelector('.nds-file-upload');
const ndsFileUpload = uploadElement.ndsFileUpload;

// Add custom event handlers
uploadElement.addEventListener('uploadProgress', (e) => {
    updateCustomProgressBar(e.detail.progress);
});

// Programmatically add files
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.onchange = (e) => {
    Array.from(e.target.files).forEach(file => {
        const fileId = ndsFileUpload.addFile(file);
        console.log('Added file with ID:', fileId);
    });
};

// Manual upload control
document.getElementById('uploadButton').onclick = () => {
    ndsFileUpload.startUpload(); // Upload all ready files
};

// Check upload status
const allFiles = ndsFileUpload.getAllFiles();
const pendingUploads = allFiles.filter(f => f.status === 'uploading');
console.log(`${pendingUploads.length} uploads in progress`);
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
              <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                data-toggler='["disabled", "#datePickerInput", "stateToggle", "attr"]'>
                <span class="label">Disabled</span>
              </button>
              <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                data-toggler='["dateRange", ".nds-date-picker", "rangeToggle"]'>
                <span class="label">Date Range</span>
              </button>
              <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                data-toggler='["hijri", ".nds-date-picker", "hijriToggle"]'>
                <span class="label">Hijri Calendar</span>
              </button>
              <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                <span class="label">Remove bg</span>
              </button>
            </div>
          </div>
          <div class="demo-container">
            <div class="state-demo">
              <div class="nds-form-container nds-date-picker">
                <div class="nds-form-header">
                  <label class="label" for="datePickerInput">Select Date</label>
                </div>
                <div class="nds-form-control">
                  <i class="hgi hgi-stroke hgi-calendar-03 icon"></i>
                  <input type="text" id="datePickerInput" class="nds-input nds-date-input" placeholder="DD/MM/YYYY"
                    readonly value="01/01/2005">

                  <!-- Custom Calendar Dropdown -->
                  <div class="nds-date-picker-dropdown hidden">
                    <div class="calendar-header">
                      <div class="calendar-title">
                        <div class="calendar-month-switch">
                          <button class="nds-btn nds-btn-subtle next-month" type="button" aria-label="Next month">
                            <i class="hgi hgi-stroke hgi-arrow-right-01 icon"></i>
                          </button>
                          <button class="nds-btn nds-btn-subtle prev-month" type="button" aria-label="Previous month">
                            <i class="hgi hgi-stroke hgi-arrow-left-01 icon"></i>
                          </button>
                        </div>
                        <div class="month-year-selectors">
                          <div class="month-dropdown-wrapper">
                            <button class="nds-btn nds-btn-subtle nds-btn-menu month-dropdown-btn" aria-expanded="false"
                              aria-label="Select month">
                              <span class="label"></span>
                            </button>
                            <div class="month-dropdown-menu hidden" role="menu">
                            </div>
                          </div>
                          <div class="year-dropdown-wrapper">
                            <button class="nds-btn nds-btn-subtle nds-btn-menu year-dropdown-btn" aria-expanded="false"
                              aria-label="Select year">
                              <span class="label"></span>
                            </button>
                            <div class="year-dropdown-menu hidden" role="menu" data-year-before="110"
                              data-year-after="5">
                            </div>
                          </div>
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
                      <button class="nds-btn nds-btn-subtle today-btn" type="button">
                        <span class="label">Today</span>
                      </button>
                      <button class="nds-btn nds-btn-primary clear-btn" type="button">
                        <span class="label">Clear</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="nds-form-footer"></div>
              </div>



              <div class="nds-form-container nds-date-picker">
                <div class="nds-form-header">
                  <label class="label" for="datePickerInput2">Select Date</label>
                </div>
                <div class="nds-form-control">
                  <i class="hgi hgi-stroke hgi-calendar-03 icon"></i>
                  <input type="text" id="datePickerInput2" class="nds-input nds-date-input" placeholder="DD/MM/YYYY"
                    readonly>

                  <!-- Custom Calendar Dropdown -->
                  <div class="nds-date-picker-dropdown hidden">
                    <div class="calendar-header">
                      <div class="calendar-title">
                        <div class="calendar-month-switch">
                          <button class="nds-btn nds-btn-subtle next-month" type="button" aria-label="Next month">
                            <i class="hgi hgi-stroke hgi-arrow-right-01 icon"></i>
                          </button>
                          <button class="nds-btn nds-btn-subtle prev-month" type="button" aria-label="Previous month">
                            <i class="hgi hgi-stroke hgi-arrow-left-01 icon"></i>
                          </button>
                        </div>
                        <div class="month-year-selectors">
                          <div class="month-dropdown-wrapper">
                            <button class="nds-btn nds-btn-subtle nds-btn-menu month-dropdown-btn" aria-expanded="false"
                              aria-label="Select month">
                              <span class="label"></span>
                            </button>
                            <div class="month-dropdown-menu hidden" role="menu">
                            </div>
                          </div>
                          <div class="year-dropdown-wrapper">
                            <button class="nds-btn nds-btn-subtle nds-btn-menu year-dropdown-btn" aria-expanded="false"
                              aria-label="Select year">
                              <span class="label"></span>
                            </button>
                            <div class="year-dropdown-menu hidden" role="menu" data-year-before="110"
                              data-year-after="5">
                            </div>
                          </div>
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
                      <button class="nds-btn nds-btn-subtle today-btn" type="button">
                        <span class="label">Today</span>
                      </button>
                      <button class="nds-btn nds-btn-primary clear-btn" type="button">
                        <span class="label">Clear</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="nds-form-footer"></div>
              </div>



            </div>
          </div>
          <div class="code-example">
            <div class="usage-header">
              <span>Usage</span>
              <button class="copy-btn" aria-label="Copy code example">
                <i class="hgi hgi-stroke hgi-copy-01"></i>
              </button>
            </div>
            <pre class="date-picker-code"><code>&lt;div class="nds-form-container nds-date-picker"&gt;
    &lt;div class="nds-form-header"&gt;
        &lt;label class="label" for="datePickerInput"&gt;Select Date&lt;/label&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-control"&gt;
        &lt;i class="hgi hgi-stroke hgi-calendar-03 icon"&gt;&lt;/i&gt;
        &lt;input type="text" id="datePickerInput" class="nds-input nds-date-input" placeholder="DD/MM/YYYY" readonly&gt;
        &lt;div class="nds-form-action"&gt;
            &lt;button class="nds-btn nds-btn-subtle date-picker-toggle" type="button" aria-label="Open calendar"&gt;
                &lt;i class="hgi hgi-stroke hgi-chevron-down icon"&gt;&lt;/i&gt;
            &lt;/button&gt;
        &lt;/div&gt;
        
        &lt;!-- Custom Calendar Dropdown --&gt;
        &lt;div class="nds-date-picker-dropdown hidden"&gt;
            &lt;div class="calendar-header"&gt;
                &lt;button class="nds-btn nds-btn-subtle prev-month" type="button" aria-label="Previous month"&gt;
                    &lt;i class="hgi hgi-stroke hgi-arrow-left-01 icon"&gt;&lt;/i&gt;
                &lt;/button&gt;
                &lt;div class="calendar-title"&gt;
                    &lt;div class="month-year-selectors"&gt;
                        &lt;div class="month-dropdown-wrapper"&gt;
                            &lt;button class="nds-btn nds-btn-subtle nds-btn-menu month-dropdown-btn" aria-expanded="false" aria-label="Select month"&gt;
                                &lt;span class="label"&gt;January&lt;/span&gt;
                                &lt;i class="hgi hgi-stroke hgi-chevron-down icon"&gt;&lt;/i&gt;
                            &lt;/button&gt;
                            &lt;div class="month-dropdown-menu hidden" role="menu"&gt;
                                &lt;!-- Month options are dynamically generated by JavaScript based on calendar mode --&gt;
                                &lt;!-- Gregorian: January, February, March... --&gt;
                                &lt;!-- Hijri: محرم، صفر، ربيع الأول... or Muharram, Safar, Rabi' al-awwal... --&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;
                        &lt;div class="year-dropdown-wrapper"&gt;
                            &lt;button class="nds-btn nds-btn-subtle nds-btn-menu year-dropdown-btn" aria-expanded="false" aria-label="Select year"&gt;
                                &lt;span class="label"&gt;2024&lt;/span&gt;
                                &lt;i class="hgi hgi-stroke hgi-chevron-down icon"&gt;&lt;/i&gt;
                            &lt;/button&gt;
                            &lt;div class="year-dropdown-menu hidden" role="menu"&gt;
                                &lt;!-- Year options are dynamically generated by JavaScript based on calendar mode --&gt;
                                &lt;!-- Gregorian: 2019, 2020, 2021, 2022, 2023, 2024, 2025... --&gt;
                                &lt;!-- Hijri: 1440 هـ, 1441 هـ, 1442 هـ, 1443 هـ, 1444 هـ, 1445 هـ, 1446 هـ... --&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
                &lt;button class="nds-btn nds-btn-subtle next-month" type="button" aria-label="Next month"&gt;
                    &lt;i class="hgi hgi-stroke hgi-arrow-right-01 icon"&gt;&lt;/i&gt;
                &lt;/button&gt;
            &lt;/div&gt;
            
            &lt;div class="calendar-body"&gt;
                &lt;div class="calendar-weekdays"&gt;
                    &lt;div class="weekday"&gt;Su&lt;/div&gt;
                    &lt;div class="weekday"&gt;Mo&lt;/div&gt;
                    &lt;div class="weekday"&gt;Tu&lt;/div&gt;
                    &lt;div class="weekday"&gt;We&lt;/div&gt;
                    &lt;div class="weekday"&gt;Th&lt;/div&gt;
                    &lt;div class="weekday"&gt;Fr&lt;/div&gt;
                    &lt;div class="weekday"&gt;Sa&lt;/div&gt;
                &lt;/div&gt;
                &lt;div class="calendar-dates"&gt;
                    &lt;!-- Date cells dynamically generated --&gt;
                    &lt;button class="nds-btn nds-btn-subtle date-cell" type="button"&gt;1&lt;/button&gt;
                    &lt;button class="nds-btn nds-btn-subtle date-cell selected" type="button"&gt;15&lt;/button&gt;
                    &lt;button class="nds-btn nds-btn-subtle date-cell today" type="button"&gt;29&lt;/button&gt;
                    &lt;!-- ... more date cells ... --&gt;
                &lt;/div&gt;
            &lt;/div&gt;
            
            &lt;div class="calendar-footer"&gt;
                &lt;button class="nds-btn nds-btn-subtle today-btn" type="button"&gt;
                    &lt;span class="label"&gt;Today&lt;/span&gt;
                &lt;/button&gt;
                &lt;button class="nds-btn nds-btn-primary clear-btn" type="button"&gt;
                    &lt;span class="label"&gt;Clear&lt;/span&gt;
                &lt;/button&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-footer"&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>
          </div>
        </div>


        <!-- add new demo card here -->
      </div>
    </div>
  </div>
</section>