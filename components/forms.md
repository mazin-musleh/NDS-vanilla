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
                  <select id="selectInput">
                    <option value="">Choose an option...</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
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
    &lt;div class="nds-form-control nds-select"&gt;
        &lt;select id="selectInput"&gt;
            &lt;option value=""&gt;Choose an option...&lt;/option&gt;
            &lt;option value="option1"&gt;Option 1&lt;/option&gt;
            &lt;option value="option2"&gt;Option 2&lt;/option&gt;
            &lt;option value="option3"&gt;Option 3&lt;/option&gt;
        &lt;/select&gt;
        &lt;div class="nds-form-action"&gt;
            &lt;i class="hgi hgi-stroke hgi-chevron-down icon"&gt;&lt;/i&gt;
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
                data-toggler='["", ".nds-radio-container", "sizeToggle"]'>
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
                data-toggler='["", ".nds-check-container", "sizeToggle"]'>
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
              <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                <span class="label">Remove bg</span>
              </button>
              <button class="nds-btn nds-btn-sm nds-btn-subtle demo-action-btn" 
                data-action="populate-demo-files">
                <span class="label">Demo Files</span>
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
                    <i class="hgi hgi-stroke hgi-file-02 file-icon"></i>

                    <div class="upload-progress-circle" style="display: none;">
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <circle class="progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="3" />
                        <circle class="progress-bar" cx="12" cy="12" r="10" fill="none" stroke-width="3"
                          stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round" />
                      </svg>
                      <span class="progress-percentage">
                        <span class="progress-number">0</span>
                        <span class="progress-symbol">%</span>
                      </span>
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
                      <button type="button" class="nds-btn nds-btn-subtle remove-file" aria-label="Remove file">
                        <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
                      </button>
                    </div>
                  </div>
                </template>
              </div> <!-- /.nds-form-container -->
            </div> <!-- /.state-demo -->
          </div> <!-- /.demo-container -->

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

            &lt;div class="upload-progress-circle" style="display: none;"&gt;
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



        <!-- add new demo card here -->
      </div>
    </div>
  </div>
</section>