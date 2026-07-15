---
layout: page
title: Tag Input
hero_title: Tag Input - National Design System
hero_description: A free-text field that turns typed values into removable chip tags, committing on Enter or comma and submitting natively as an array.
breadcrumb: [["Components", "/components"]]
since: "1.4.0"
updated: "1.4.0"
last_edit: "15/07/2026 - 03:13 AM"
lang: en
direction: ltr
---

<!-- Tag Entry -->
<section id="taginputDefault" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Tag Entry</h2>
            <p class="nds-section-description">Type a value and press Enter or comma to commit it as a chip. Chips share the row with the input and wrap onto new rows as they accumulate.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card" data-code-rebuild>
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">State</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-form-container.nds-taginput", "tagState"]'>
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["disabled", ".nds-form-container.nds-taginput", "tagState", "data-state"]'>
                                            <span class="nds-label">Disabled</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["readonly", ".nds-form-container.nds-taginput", "tagState", "data-state"]'>
                                            <span class="nds-label">Readonly</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-form-container nds-taginput" data-taginput-name="skills">
                                <div class="nds-form-header">
                                    <label for="taginput-default-input"><span class="nds-label">Skills</span></label>
                                </div>
                                <div class="nds-form-control">
                                    <input type="text" id="taginput-default-input" placeholder="Add a skill&hellip;">
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
                                        aria-controls="panel-taginput-default-1" id="tab-taginput-default-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-taginput-default-1"
                                    aria-labelledby="tab-taginput-default-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;div class="nds-form-container nds-taginput" data-taginput-name="skills"&gt;
  &lt;div class="nds-form-header"&gt;
    &lt;label for="taginput-default-input"&gt;&lt;span class="nds-label"&gt;Skills&lt;/span&gt;&lt;/label&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-control"&gt;
    &lt;input type="text" id="taginput-default-input" placeholder="Add a skill&amp;hellip;"&gt;
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
</section>

<!-- Server-Rendered Restore -->
<section id="taginputRestore" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Server-Rendered Restore</h2>
            <p class="nds-section-description">Emit one hidden input per saved tag and the field renders their chips on load. The field name is adopted from the hidden inputs, so no wrapper attribute is needed. This demo also shows the neutral chip variant via <code class="nds-inline-code lang-html">data-chip-class</code>.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Restored from a previous submit</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-form-container nds-taginput" data-chip-class="nds-neutral nds-sm">
                                <div class="nds-form-header">
                                    <label for="taginput-restore-input"><span class="nds-label">Interests</span></label>
                                </div>
                                <div class="nds-form-control">
                                    <input type="hidden" name="interests[]" value="Design">
                                    <input type="hidden" name="interests[]" value="Development">
                                    <input type="text" id="taginput-restore-input" placeholder="Add an interest&hellip;">
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
                                        aria-controls="panel-taginput-restore-1" id="tab-taginput-restore-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-taginput-restore-1"
                                    aria-labelledby="tab-taginput-restore-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;div class="nds-form-container nds-taginput" data-chip-class="nds-neutral nds-sm"&gt;
  &lt;div class="nds-form-header"&gt;
    &lt;label for="taginput-restore-input"&gt;&lt;span class="nds-label"&gt;Interests&lt;/span&gt;&lt;/label&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-control"&gt;
    &lt;!-- One hidden input per saved tag: seeds the chips and donates the field name --&gt;
    &lt;input type="hidden" name="interests[]" value="Design"&gt;
    &lt;input type="hidden" name="interests[]" value="Development"&gt;
    &lt;input type="text" id="taginput-restore-input" placeholder="Add an interest&amp;hellip;"&gt;
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
</section>

<!-- Tag Limit -->
<section id="taginputMax" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Tag Limit</h2>
            <p class="nds-section-description">Cap the number of tags with a wrapper attribute. Adds past the limit are rejected with an error in the field footer, clearing as soon as a tag is removed.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Maximum 3 tags</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-form-container nds-taginput" data-taginput-name="topics" data-max-tags="3">
                                <div class="nds-form-header">
                                    <label for="taginput-max-input"><span class="nds-label">Topics</span></label>
                                </div>
                                <div class="nds-form-control">
                                    <input type="text" id="taginput-max-input" placeholder="Add up to 3 topics&hellip;">
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
                                        aria-controls="panel-taginput-max-1" id="tab-taginput-max-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-taginput-max-1"
                                    aria-labelledby="tab-taginput-max-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;div class="nds-form-container nds-taginput" data-taginput-name="topics" data-max-tags="3"&gt;
  &lt;div class="nds-form-header"&gt;
    &lt;label for="taginput-max-input"&gt;&lt;span class="nds-label"&gt;Topics&lt;/span&gt;&lt;/label&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-control"&gt;
    &lt;input type="text" id="taginput-max-input" placeholder="Add up to 3 topics&amp;hellip;"&gt;
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
</section>

<!-- Autocomplete Assist -->
<section id="taginputAssist" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Autocomplete Assist</h2>
            <p class="nds-section-description">Add <code class="nds-inline-code lang-html">data-url</code> to the wrapper and the field surfaces server-backed suggestions as the user types. Picked suggestions commit as tags, free typing still works, so existing tags get reused instead of retyped. The inert spinner in the action slot shows while suggestions fetch. Add <code class="nds-inline-code lang-html">data-strict</code> and only suggestions commit: the right shape for bounded vocabularies like assigning people or categories.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Type 2+ characters to search services</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-form-container nds-taginput" data-taginput-name="services"
                                data-url="{{ '/assets/data/services-autocomplete.json' | relative_url }}"
                                data-fetch="once" data-min-chars="2">
                                <div class="nds-form-header">
                                    <label for="taginput-assist-input"><span class="nds-label">Services</span></label>
                                </div>
                                <div class="nds-form-control">
                                    <input type="text" id="taginput-assist-input" autocomplete="on" placeholder="Search services&hellip;">
                                    <div class="nds-form-action">
                                        <span class="nds-btn nds-subtle nds-icon-only nds-loading" hidden aria-hidden="true"></span>
                                    </div>
                                </div>
                                <div class="nds-form-footer" data-feedback-target>
                                    <span class="nds-feedback nds-outline nds-sm" data-status="neutral" data-permanent>
                                        <span class="nds-feedback-icon">
                                            <i class="nds-icon" aria-hidden="true"></i>
                                        </span>
                                        <span class="nds-feedback-message">Try "request", "license", or "permit"</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-taginput-assist-1" id="tab-taginput-assist-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-taginput-assist-1"
                                    aria-labelledby="tab-taginput-assist-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;div class="nds-form-container nds-taginput" data-taginput-name="services"
     data-url="/api/services" data-fetch="once" data-min-chars="2"&gt;
  &lt;div class="nds-form-header"&gt;
    &lt;label for="taginput-assist-input"&gt;&lt;span class="nds-label"&gt;Services&lt;/span&gt;&lt;/label&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-control"&gt;
    &lt;input type="text" id="taginput-assist-input" autocomplete="on" placeholder="Search services&amp;hellip;"&gt;
    &lt;div class="nds-form-action"&gt;
      &lt;!-- Inert fetch spinner: shown by Autocomplete while suggestions load --&gt;
      &lt;span class="nds-btn nds-subtle nds-icon-only nds-loading" hidden aria-hidden="true"&gt;&lt;/span&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;!-- Permanent hint: hidden while a rejection shows, restored after --&gt;
  &lt;div class="nds-form-footer" data-feedback-target&gt;
    &lt;span class="nds-feedback nds-outline nds-sm" data-status="neutral" data-permanent&gt;
      &lt;span class="nds-feedback-icon"&gt;
        &lt;i class="nds-icon" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;/span&gt;
      &lt;span class="nds-feedback-message"&gt;Try "request", "license", or "permit"&lt;/span&gt;
    &lt;/span&gt;
  &lt;/div&gt;
&lt;/div&gt;
                                        </code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Strict: only suggestions commit</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-form-container nds-taginput" data-taginput-name="assignees"
                                data-url="{{ '/assets/data/users-autocomplete.json' | relative_url }}"
                                data-name="Name" data-fetch="once" data-min-chars="2" data-strict
                                data-empty-message="No matching people">
                                <div class="nds-form-header">
                                    <label for="taginput-strict-input"><span class="nds-label">Assignees</span></label>
                                </div>
                                <div class="nds-form-control">
                                    <input type="text" id="taginput-strict-input" autocomplete="on" placeholder="Search the directory&hellip;">
                                    <div class="nds-form-action">
                                        <span class="nds-btn nds-subtle nds-icon-only nds-loading" hidden aria-hidden="true"></span>
                                    </div>
                                </div>
                                <div class="nds-form-footer" data-feedback-target>
                                    <span class="nds-feedback nds-outline nds-sm" data-status="neutral" data-permanent>
                                        <span class="nds-feedback-icon">
                                            <i class="nds-icon" aria-hidden="true"></i>
                                        </span>
                                        <span class="nds-feedback-message">Try "Ahmed" or "Sara"</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-taginput-strict-1" id="tab-taginput-strict-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-taginput-strict-1"
                                    aria-labelledby="tab-taginput-strict-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;div class="nds-form-container nds-taginput" data-taginput-name="assignees"
     data-url="/api/users" data-name="Name" data-min-chars="2" data-strict
     data-empty-message="No matching people"&gt;
  &lt;div class="nds-form-header"&gt;
    &lt;label for="taginput-strict-input"&gt;&lt;span class="nds-label"&gt;Assignees&lt;/span&gt;&lt;/label&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-control"&gt;
    &lt;input type="text" id="taginput-strict-input" autocomplete="on" placeholder="Search the directory&amp;hellip;"&gt;
    &lt;div class="nds-form-action"&gt;
      &lt;span class="nds-btn nds-subtle nds-icon-only nds-loading" hidden aria-hidden="true"&gt;&lt;/span&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-footer" data-feedback-target&gt;
    &lt;span class="nds-feedback nds-outline nds-sm" data-status="neutral" data-permanent&gt;
      &lt;span class="nds-feedback-icon"&gt;
        &lt;i class="nds-icon" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;/span&gt;
      &lt;span class="nds-feedback-message"&gt;Try "Ahmed" or "Sara"&lt;/span&gt;
    &lt;/span&gt;
  &lt;/div&gt;
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

<!-- Built-in Features -->
<section id="taginputFeatures" class="nds-content-section nds-demo-section">
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
                    <p class="nds-item-desc">Any <code class="nds-inline-code lang-html">.nds-taginput</code> on the page wires up on load. Clicking anywhere on the field puts the caret in the input.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-keyboard"></i>
                        <span class="nds-label">Flexible Commit Keys</span>
                    </span>
                    <p class="nds-item-desc">Enter or a comma commits the typed text, including the Arabic comma from Arabic keyboard layouts. Pasted text splits on separators into multiple tags, and leaving the field commits pending text instead of losing it.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-edit-02"></i>
                        <span class="nds-label">Backspace to Edit</span>
                    </span>
                    <p class="nds-item-desc">Backspace on an empty input pops the last tag back into the input as editable text rather than deleting it, so a typo never means retyping the whole value.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-file-validation"></i>
                        <span class="nds-label">Form Submission and Restore</span>
                    </span>
                    <p class="nds-item-desc">Each tag ships as an <code class="nds-inline-code lang-html">&lt;input type="hidden" name="field[]"&gt;</code>, so a wrapping <code class="nds-inline-code lang-html">&lt;form&gt;</code> posts the tags as an array. The same hidden inputs, server-rendered, restore a saved submission on load with no inline JS.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-search-01"></i>
                        <span class="nds-label">Autocomplete Assist</span>
                    </span>
                    <p class="nds-item-desc">Add <code class="nds-inline-code lang-html">data-url</code> to the wrapper and typing surfaces server-backed suggestions: picking one commits it as a tag, while free typing keeps working. Add <code class="nds-inline-code lang-html">data-strict</code> to accept only suggestions, turning the field into a searchable picker for bounded vocabularies.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-alert-circle"></i>
                        <span class="nds-label">Rejection Feedback</span>
                    </span>
                    <p class="nds-item-desc">Duplicates (case-insensitive) and adds past <code class="nds-inline-code lang-html">data-max-tags</code> are rejected with an error in the field footer, clearing on the next successful commit or removal.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-voice"></i>
                        <span class="nds-label">Screen-Reader Updates</span>
                    </span>
                    <p class="nds-item-desc">Every add, removal, edit, and rejection announces through the shared NDS live region in both English and Arabic, and removing a chip hands keyboard focus to the next chip instead of dropping it.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-api"></i>
                        <span class="nds-label">Programmatic Control</span>
                    </span>
                    <p class="nds-item-desc">Every field exposes an instance on the DOM node with <code class="nds-inline-code lang-js">getValues()</code>, <code class="nds-inline-code lang-js">addTag()</code>, <code class="nds-inline-code lang-js">removeTag()</code>, and <code class="nds-inline-code lang-js">clear()</code>. Listen for <code class="nds-inline-code lang-js">nds:taginput:change</code> to react to changes.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="taginputGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use tag input for open-ended, user-defined values: skills, keywords, topics, reference numbers. The vocabulary belongs to the user, not to a predefined list</li>
                    <li>When the options are a fixed set the user picks from, use <a class="nds-color" href="{{ 'components/multiselect' | relative_url }}">Multiselect</a> instead: it validates against known values and supports grouped options</li>
                    <li>For a single free-text value, use a plain <a class="nds-color" href="{{ 'components/forms' | relative_url }}">text input</a>. The chip ceremony adds friction when only one value is expected</li>
                    <li>Name the field with <code class="nds-inline-code lang-html">data-taginput-name</code>, or let server-rendered hidden inputs donate the name. An unnamed field is UI-only and posts nothing</li>
                    <li>Set <code class="nds-inline-code lang-html">data-max-tags</code> when the backend caps the list. The limit is enforced at entry with visible feedback, so users never lose work at submit time</li>
                    <li>Keep expected tags short, one to three words. Long values wrap awkwardly as chips and are usually a sign the field should be a textarea</li>
                    <li>Duplicates are rejected case-insensitively at entry. Normalize casing server-side if the stored values must be canonical</li>
                    <li>When tag consistency matters, enable autocomplete assist with <code class="nds-inline-code lang-html">data-url</code>: suggestions steer users to existing tags instead of coining variants. See <a class="nds-color" href="{{ 'components/autocomplete' | relative_url }}">Autocomplete</a> for the fetch options (<code class="nds-inline-code lang-html">data-fetch</code>, <code class="nds-inline-code lang-html">data-min-chars</code>, <code class="nds-inline-code lang-html">data-name</code>)</li>
                    <li>When the tag count carries meaning (quota, pricing), listen for <code class="nds-inline-code lang-js">nds:taginput:change</code> and show a counter outside the field rather than overloading the placeholder</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-taginput-name</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-taginput</code>. Names the hidden carriers, posted as <code class="nds-inline-code lang-html">name[]</code>. When omitted, the name is adopted from server-rendered hidden inputs; with neither, the selection does not post</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-max-tags</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-taginput</code>. Caps the tag count; adds past the limit are rejected with footer feedback naming the limit</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-chip-class</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-taginput</code>. Classes applied to generated chips: color variants <code class="nds-inline-code lang-html">nds-primary</code> / <code class="nds-inline-code lang-html">nds-neutral</code>, sizes <code class="nds-inline-code lang-html">nds-sm</code> / <code class="nds-inline-code lang-html">nds-md</code> / <code class="nds-inline-code lang-html">nds-lg</code>, plus <code class="nds-inline-code lang-html">nds-rounded</code>. Defaults to <code class="nds-inline-code lang-html">nds-primary nds-sm</code>. See <a class="nds-color" href="{{ 'components/chips' | relative_url }}">Chips</a></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-url</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-taginput</code> to enable autocomplete assist (the input also needs <code class="nds-inline-code lang-html">autocomplete="on"</code>). Picked suggestions commit as tags. The fetch behavior is configured with <a class="nds-color" href="{{ 'components/autocomplete' | relative_url }}">Autocomplete</a>'s own attributes</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-strict</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-taginput</code> alongside <code class="nds-inline-code lang-html">data-url</code>. Typed text never commits: Enter and comma show "choose from the suggestions" feedback, and only picked suggestions become tags. The programmatic <code class="nds-inline-code lang-js">addTag()</code> API is not restricted</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-taginput-value</code></td><td>Stamped on each chip by JS with the tag's value. Use it to target specific chips from consumer code or end-to-end tests</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-state~="filled"</code></td><td>Stamped on <code class="nds-inline-code lang-html">.nds-taginput</code> by JS when at least one tag exists. A styling hook for consumers; removed when the last tag is cleared</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDS.TagInput</strong> namespace initializes all <code class="nds-inline-code lang-html">.nds-taginput</code> fields on load. Each instance lives on its DOM node as <code class="nds-inline-code lang-js">element.ndsTagInput</code> and exposes methods for programmatic control.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// ── Initialize (auto-runs on load) ─────────────────────
// Call again after injecting taginput HTML dynamically.
NDS.TagInput.init();

// ── Re-initialize (alias of init) ──────────────────────
// Picks up .nds-taginput elements added since the last pass.
NDS.TagInput.reinit();

// ── Create an instance manually ────────────────────────
const field = document.querySelector('.nds-taginput');
NDS.TagInput.create(field);

// ── Access the instance on a live field ────────────────
const instance = field.ndsTagInput;

// ── Read the current tags ──────────────────────────────
instance.getValues();  // ['Design', 'Development']

// ── Add, remove, or clear programmatically ─────────────
// addTag trims separators and whitespace, rejects duplicates
// and over-limit adds with the same feedback typing gets.
instance.addTag('Accessibility');
instance.removeTag('Design');
instance.clear();               // remove every tag, emit change

// ── Tear down an instance ──────────────────────────────
// Releases listeners and unlocks the field for a fresh init.
NDS.TagInput.destroy(field);

// ── Listen for tag changes ─────────────────────────────
// Fires on every add, removal, backspace-edit, and clear.
field.addEventListener('nds:taginput:change', (e) => {
    const { name, values } = e.detail;
    // name:   field name ('' when the field is UI-only)
    // values: array of current tag strings
});

// ── Keyboard interactions (built in) ───────────────────
// Enter / comma  commit the typed text as a tag
// Backspace      on an empty input pops the last tag for editing
// Tab + Enter    chips are buttons; Enter on a chip removes it
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
