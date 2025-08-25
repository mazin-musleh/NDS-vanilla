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
            <p class="nds-section-description">All form input types available in the National Design System with clear actions</p>
        </div>
        <div class="nds-section-content">
            <div class="form-showcase">
                
                <!-- Text Input -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Text Input</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-form-control">
                                <input type="text" class="nds-input" placeholder="Enter text..." value="">
                                <div class="nds-form-action">
                                    <button class="nds-btn nds-btn-subtle clear hidden" type="button" aria-label="Clear input">
                                        <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="code-example">
                        <button class="copy-btn" data-copy-target=".text-input-code">
                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                            Copy
                        </button>
                        <pre class="text-input-code"><code>&lt;div class="nds-form-control"&gt;
    &lt;input type="text" class="nds-input" placeholder="Enter text..." value=""&gt;
    &lt;div class="nds-form-action"&gt;
        &lt;button class="clear hidden" type="button" aria-label="Clear input"&gt;
            &lt;i class="hgi hgi-stroke hgi-cancel-01 icon"&gt;&lt;/i&gt;
        &lt;/button&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre>
                    </div>
                </div>

                <!-- Search Input -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Search Input</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-form-control">
                                <i class="hgi hgi-stroke hgi-search-01 icon"></i>
                                <input type="text" class="nds-search-input" name="search" placeholder="Search...">
                                <div class="nds-form-action">
                                    <button class="nds-btn nds-btn-subtle voiceInput" type="button" aria-label="Voice input">
                                        <i class="hgi hgi-stroke hgi-mic-01 icon"></i>
                                    </button>
                                    <button class="nds-btn nds-btn-subtle clear hidden" type="button" aria-label="Clear search">
                                        <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="code-example">
                        <button class="copy-btn" data-copy-target=".search-input-code">
                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                            Copy
                        </button>
                        <pre class="search-input-code"><code>&lt;div class="nds-form-control"&gt;
    &lt;i class="hgi hgi-stroke hgi-search-01 icon"&gt;&lt;/i&gt;
    &lt;input type="text" class="nds-search-input" name="search" placeholder="Search..."&gt;
    &lt;div class="nds-form-action"&gt;
        &lt;button class="voiceInput" type="button" aria-label="Voice input"&gt;
            &lt;i class="hgi hgi-stroke hgi-mic-01 icon"&gt;&lt;/i&gt;
        &lt;/button&gt;
        &lt;button class="clear hidden" type="button" aria-label="Clear search"&gt;
            &lt;i class="hgi hgi-stroke hgi-cancel-01 icon"&gt;&lt;/i&gt;
        &lt;/button&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre>
                    </div>
                </div>

                <!-- Email Input -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Email Input</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-form-control">
                                <i class="hgi hgi-stroke hgi-mail-01 icon"></i>
                                <input type="email" class="nds-input" placeholder="Enter email address...">
                                <div class="nds-form-action">
                                    <button class="nds-btn nds-btn-subtle clear hidden" type="button" aria-label="Clear email">
                                        <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="code-example">
                        <button class="copy-btn" data-copy-target=".email-input-code">
                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                            Copy
                        </button>
                        <pre class="email-input-code"><code>&lt;div class="nds-form-control"&gt;
    &lt;i class="hgi hgi-stroke hgi-mail-01 icon"&gt;&lt;/i&gt;
    &lt;input type="email" class="nds-input" placeholder="Enter email address..."&gt;
    &lt;div class="nds-form-action"&gt;
        &lt;button class="clear hidden" type="button" aria-label="Clear email"&gt;
            &lt;i class="hgi hgi-stroke hgi-cancel-01 icon"&gt;&lt;/i&gt;
        &lt;/button&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre>
                    </div>
                </div>

                <!-- Password Input -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Password Input</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-form-control">
                                <i class="hgi hgi-stroke hgi-lock-01 icon"></i>
                                <input type="password" class="nds-input" placeholder="Enter password...">
                                <div class="nds-form-action">
                                    <button class="nds-btn nds-btn-subtle toggle-password" type="button" aria-label="Show password">
                                        <i class="hgi hgi-stroke hgi-view-off icon"></i>
                                    </button>
                                    <button class="nds-btn nds-btn-subtle clear hidden" type="button" aria-label="Clear password">
                                        <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="code-example">
                        <button class="copy-btn" data-copy-target=".password-input-code">
                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                            Copy
                        </button>
                        <pre class="password-input-code"><code>&lt;div class="nds-form-control"&gt;
    &lt;i class="hgi hgi-stroke hgi-lock-01 icon"&gt;&lt;/i&gt;
    &lt;input type="password" class="nds-input" placeholder="Enter password..."&gt;
    &lt;div class="nds-form-action"&gt;
        &lt;button class="toggle-password" type="button" aria-label="Show password"&gt;
            &lt;i class="hgi hgi-stroke hgi-eye-off icon"&gt;&lt;/i&gt;
        &lt;/button&gt;
        &lt;button class="clear hidden" type="button" aria-label="Clear password"&gt;
            &lt;i class="hgi hgi-stroke hgi-cancel-01 icon"&gt;&lt;/i&gt;
        &lt;/button&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre>
                    </div>
                </div>

                <!-- Textarea -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Textarea</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-form-control">
                                <textarea class="nds-textarea" placeholder="Enter your message..." rows="4"></textarea>
                                <div class="nds-form-action">
                                    <button class="nds-btn nds-btn-subtle clear hidden" type="button" aria-label="Clear textarea">
                                        <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="code-example">
                        <button class="copy-btn" data-copy-target=".textarea-code">
                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                            Copy
                        </button>
                        <pre class="textarea-code"><code>&lt;div class="nds-form-control"&gt;
    &lt;textarea class="nds-textarea" placeholder="Enter your message..." rows="4"&gt;&lt;/textarea&gt;
    &lt;div class="nds-form-action"&gt;
        &lt;button class="clear hidden" type="button" aria-label="Clear textarea"&gt;
            &lt;i class="hgi hgi-stroke hgi-cancel-01 icon"&gt;&lt;/i&gt;
        &lt;/button&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre>
                    </div>
                </div>

                <!-- Select Dropdown -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Select Dropdown</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-form-control">
                                <select class="nds-select">
                                    <option value="">Choose an option...</option>
                                    <option value="option1">Option 1</option>
                                    <option value="option2">Option 2</option>
                                    <option value="option3">Option 3</option>
                                </select>
                                <div class="nds-form-action">
                                    <i class="hgi hgi-stroke hgi-chevron-down icon"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="code-example">
                        <button class="copy-btn" data-copy-target=".select-code">
                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                            Copy
                        </button>
                        <pre class="select-code"><code>&lt;div class="nds-form-control"&gt;
    &lt;select class="nds-select"&gt;
        &lt;option value=""&gt;Choose an option...&lt;/option&gt;
        &lt;option value="option1"&gt;Option 1&lt;/option&gt;
        &lt;option value="option2"&gt;Option 2&lt;/option&gt;
        &lt;option value="option3"&gt;Option 3&lt;/option&gt;
    &lt;/select&gt;
    &lt;div class="nds-form-action"&gt;
        &lt;i class="hgi hgi-stroke hgi-chevron-down icon"&gt;&lt;/i&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre>
                    </div>
                </div>

                <!-- Radio Button Group -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Radio Button Group</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-radio-group">
                                <div class="nds-form-control">
                                    <input type="radio" id="radio1" name="radioGroup" value="option1" class="nds-radio">
                                    <label for="radio1" class="nds-radio-label">Option 1</label>
                                </div>
                                <div class="nds-form-control">
                                    <input type="radio" id="radio2" name="radioGroup" value="option2" class="nds-radio">
                                    <label for="radio2" class="nds-radio-label">Option 2</label>
                                </div>
                                <div class="nds-form-control">
                                    <input type="radio" id="radio3" name="radioGroup" value="option3" class="nds-radio">
                                    <label for="radio3" class="nds-radio-label">Option 3</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="code-example">
                        <button class="copy-btn" data-copy-target=".radio-code">
                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                            Copy
                        </button>
                        <pre class="radio-code"><code>&lt;div class="nds-radio-group"&gt;
    &lt;div class="nds-form-control"&gt;
        &lt;input type="radio" id="radio1" name="radioGroup" value="option1" class="nds-radio"&gt;
        &lt;label for="radio1" class="nds-radio-label"&gt;Option 1&lt;/label&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-control"&gt;
        &lt;input type="radio" id="radio2" name="radioGroup" value="option2" class="nds-radio"&gt;
        &lt;label for="radio2" class="nds-radio-label"&gt;Option 2&lt;/label&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-control"&gt;
        &lt;input type="radio" id="radio3" name="radioGroup" value="option3" class="nds-radio"&gt;
        &lt;label for="radio3" class="nds-radio-label"&gt;Option 3&lt;/label&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre>
                    </div>
                </div>

                <!-- Checkbox -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Checkbox</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-checkbox-group">
                                <div class="nds-form-control">
                                    <input type="checkbox" id="checkbox1" value="option1" class="nds-checkbox">
                                    <label for="checkbox1" class="nds-checkbox-label">Checkbox Option 1</label>
                                </div>
                                <div class="nds-form-control">
                                    <input type="checkbox" id="checkbox2" value="option2" class="nds-checkbox">
                                    <label for="checkbox2" class="nds-checkbox-label">Checkbox Option 2</label>
                                </div>
                                <div class="nds-form-control">
                                    <input type="checkbox" id="checkbox3" value="option3" class="nds-checkbox" checked>
                                    <label for="checkbox3" class="nds-checkbox-label">Checkbox Option 3 (Checked)</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="code-example">
                        <button class="copy-btn" data-copy-target=".checkbox-code">
                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                            Copy
                        </button>
                        <pre class="checkbox-code"><code>&lt;div class="nds-checkbox-group"&gt;
    &lt;div class="nds-form-control"&gt;
        &lt;input type="checkbox" id="checkbox1" value="option1" class="nds-checkbox"&gt;
        &lt;label for="checkbox1" class="nds-checkbox-label"&gt;Checkbox Option 1&lt;/label&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-control"&gt;
        &lt;input type="checkbox" id="checkbox2" value="option2" class="nds-checkbox"&gt;
        &lt;label for="checkbox2" class="nds-checkbox-label"&gt;Checkbox Option 2&lt;/label&gt;
    &lt;/div&gt;
    &lt;div class="nds-form-control"&gt;
        &lt;input type="checkbox" id="checkbox3" value="option3" class="nds-checkbox" checked&gt;
        &lt;label for="checkbox3" class="nds-checkbox-label"&gt;Checkbox Option 3&lt;/label&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre>
                    </div>
                </div>

                <!-- File Upload -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">File Upload</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-form-control file-upload">
                                <input type="file" id="fileUpload" class="nds-file-input" multiple>
                                <label for="fileUpload" class="nds-file-label">
                                    <i class="hgi hgi-stroke hgi-upload-01 icon"></i>
                                    <span class="upload-text">Choose files or drag and drop</span>
                                </label>
                                <div class="nds-form-action">
                                    <button class="nds-btn nds-btn-subtle clear hidden" type="button" aria-label="Clear files">
                                        <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="code-example">
                        <button class="copy-btn" data-copy-target=".file-upload-code">
                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                            Copy
                        </button>
                        <pre class="file-upload-code"><code>&lt;div class="nds-form-control file-upload"&gt;
    &lt;input type="file" id="fileUpload" class="nds-file-input" multiple&gt;
    &lt;label for="fileUpload" class="nds-file-label"&gt;
        &lt;i class="hgi hgi-stroke hgi-upload-01 icon"&gt;&lt;/i&gt;
        &lt;span class="upload-text"&gt;Choose files or drag and drop&lt;/span&gt;
    &lt;/label&gt;
    &lt;div class="nds-form-action"&gt;
        &lt;button class="clear hidden" type="button" aria-label="Clear files"&gt;
            &lt;i class="hgi hgi-stroke hgi-cancel-01 icon"&gt;&lt;/i&gt;
        &lt;/button&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre>
                    </div>
                </div>

            </div>
        </div>
    </div>
</section>

