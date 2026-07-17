---
layout: page
title: Editor
hero_title: Editor - National Design System
hero_description: A rich text editing field for user-authored content that submits clean NDS markup, converting pasted Word, Google Docs, and web content on the way in and inserting NDS components as editable blocks.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.4.0"
updated: "1.4.0"
last_edit: "17/07/2026 - 04:23 AM"
---

<!-- Beta notice -->
<section class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-body">
            <div class="nds-alert nds-card nds-inline" data-status="warning" role="alert">
                <span class="nds-feedback nds-alert-icon">
                    <span class="nds-feedback-icon">
                        <i class="nds-icon" aria-hidden="true"></i>
                    </span>
                </span>
                <div class="nds-alert-content">
                    <div class="nds-alert-text">
                        <span class="nds-alert-title">Beta</span>
                        <p class="nds-alert-description">The editor ships as beta in v1.4.0 and is still going through heavy testing and real-project use. Its API and markup contract may change before it is declared stable.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Overview -->
<section id="editorOverview" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Rich Text Editor</h2>
            <p class="nds-section-description">A contenteditable writing surface mirrored into a hidden textarea, so the value submits and validates like any native form field</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Full toolbar</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-form-container nds-textarea nds-editor">
                                <div class="nds-form-header">
                                    <label id="editor-standard-label" for="editor-standard-field"><span class="nds-label">Content</span></label>
                                </div>
                                <div class="nds-toolbar">
                                    <div class="nds-bar-start">
                                        <div class="nds-btn-group">
                                            <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="undo" aria-label="Undo"><i class="hgi hgi-stroke hgi-arrow-turn-backward" aria-hidden="true"></i></button>
                                            <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="redo" aria-label="Redo"><i class="hgi hgi-stroke hgi-arrow-turn-forward" aria-hidden="true"></i></button>
                                        </div>
                                        <div class="nds-btn-group">
                                            <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="bold" aria-pressed="false" aria-label="Bold"><i class="hgi hgi-stroke hgi-text-bold" aria-hidden="true"></i></button>
                                            <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="italic" aria-pressed="false" aria-label="Italic"><i class="hgi hgi-stroke hgi-text-italic" aria-hidden="true"></i></button>
                                            <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="underline" aria-pressed="false" aria-label="Underline"><i class="hgi hgi-stroke hgi-text-underline" aria-hidden="true"></i></button>
                                            <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="strike" aria-pressed="false" aria-label="Strikethrough"><i class="hgi hgi-stroke hgi-text-strikethrough" aria-hidden="true"></i></button>
                                            <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="clear" aria-label="Clear formatting"><i class="hgi hgi-stroke hgi-text-clear" aria-hidden="true"></i></button>
                                        </div>
                                        <div class="nds-dropmenu" data-nds-editor-link-dropmenu>
                                            <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only nds-dropmenu-trigger" data-cmd="link" aria-pressed="false" aria-label="Insert link"><i class="hgi hgi-stroke hgi-link-01" aria-hidden="true"></i></button>
                                            <div class="nds-dropmenu-menu" hidden>
                                                <div class="nds-dropmenu-scroll nds-editor-link-form">
                                                    <div class="nds-form-container nds-input">
                                                        <div class="nds-form-header"><label><span class="nds-label">URL</span></label></div>
                                                        <div class="nds-form-control">
                                                            <input type="url" class="nds-input" placeholder="https://" autocomplete="off" data-nds-editor-link-url />
                                                        </div>
                                                    </div>
                                                    <div class="nds-editor-link-actions">
                                                        <button type="button" class="nds-btn nds-secondary-outline" data-nds-editor-link-unlink hidden><span class="nds-label">Unlink</span></button>
                                                        <button type="button" class="nds-btn nds-primary" data-nds-editor-link-confirm data-dropmenu-primary><span class="nds-label">Insert</span></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="nds-btn-group">
                                            <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="h1" aria-pressed="false" aria-label="Heading 1"><i class="hgi hgi-stroke hgi-heading-01" aria-hidden="true"></i></button>
                                            <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="h2" aria-pressed="false" aria-label="Heading 2"><i class="hgi hgi-stroke hgi-heading-02" aria-hidden="true"></i></button>
                                            <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="h3" aria-pressed="false" aria-label="Heading 3"><i class="hgi hgi-stroke hgi-heading-03" aria-hidden="true"></i></button>
                                        </div>
                                        <div class="nds-btn-group">
                                            <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="ul" aria-pressed="false" aria-label="Bulleted list"><i class="hgi hgi-stroke hgi-left-to-right-list-bullet" aria-hidden="true"></i></button>
                                            <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="ol" aria-pressed="false" aria-label="Numbered list"><i class="hgi hgi-stroke hgi-left-to-right-list-number" aria-hidden="true"></i></button>
                                        </div>
                                    </div>
                                    <div class="nds-bar-end">
                                        <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-source-toggle aria-pressed="false" aria-label="View HTML source"><i class="hgi hgi-stroke hgi-source-code" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                                <div class="nds-form-control">
                                    <div class="nds-editor-editable is-empty"
                                        contenteditable="true"
                                        role="textbox"
                                        aria-multiline="true"
                                        aria-labelledby="editor-standard-label"
                                        data-placeholder="Write here"><p><br></p></div>
                                    <textarea class="nds-textarea nds-editor-source" name="editor-standard" id="editor-standard-field" tabindex="-1"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                        aria-controls="panel-editor-standard-1" id="tab-editor-standard-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-editor-standard-1"
                                    aria-labelledby="tab-editor-standard-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                    <code class="lang-html code">
&lt;div class="nds-form-container nds-textarea nds-editor"&gt;
  &lt;div class="nds-form-header"&gt;
    &lt;label id="editor-standard-label" for="editor-standard-field"&gt;&lt;span class="nds-label"&gt;Content&lt;/span&gt;&lt;/label&gt;
  &lt;/div&gt;
  &lt;div class="nds-toolbar"&gt;
    &lt;div class="nds-bar-start"&gt;
      &lt;div class="nds-btn-group"&gt;
        &lt;button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="undo" aria-label="Undo"&gt;&lt;i class="hgi hgi-stroke hgi-arrow-turn-backward" aria-hidden="true"&gt;&lt;/i&gt;&lt;/button&gt;
        &lt;button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="redo" aria-label="Redo"&gt;&lt;i class="hgi hgi-stroke hgi-arrow-turn-forward" aria-hidden="true"&gt;&lt;/i&gt;&lt;/button&gt;
      &lt;/div&gt;
      &lt;div class="nds-btn-group"&gt;
        &lt;button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="bold" aria-pressed="false" aria-label="Bold"&gt;&lt;i class="hgi hgi-stroke hgi-text-bold" aria-hidden="true"&gt;&lt;/i&gt;&lt;/button&gt;
        &lt;button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="italic" aria-pressed="false" aria-label="Italic"&gt;&lt;i class="hgi hgi-stroke hgi-text-italic" aria-hidden="true"&gt;&lt;/i&gt;&lt;/button&gt;
        &lt;button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="underline" aria-pressed="false" aria-label="Underline"&gt;&lt;i class="hgi hgi-stroke hgi-text-underline" aria-hidden="true"&gt;&lt;/i&gt;&lt;/button&gt;
        &lt;button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="strike" aria-pressed="false" aria-label="Strikethrough"&gt;&lt;i class="hgi hgi-stroke hgi-text-strikethrough" aria-hidden="true"&gt;&lt;/i&gt;&lt;/button&gt;
        &lt;button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="clear" aria-label="Clear formatting"&gt;&lt;i class="hgi hgi-stroke hgi-text-clear" aria-hidden="true"&gt;&lt;/i&gt;&lt;/button&gt;
      &lt;/div&gt;
      &lt;div class="nds-dropmenu" data-nds-editor-link-dropmenu&gt;
        &lt;button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only nds-dropmenu-trigger" data-cmd="link" aria-pressed="false" aria-label="Insert link"&gt;&lt;i class="hgi hgi-stroke hgi-link-01" aria-hidden="true"&gt;&lt;/i&gt;&lt;/button&gt;
        &lt;div class="nds-dropmenu-menu" hidden&gt;
          &lt;div class="nds-dropmenu-scroll nds-editor-link-form"&gt;
            &lt;div class="nds-form-container nds-input"&gt;
              &lt;div class="nds-form-header"&gt;&lt;label&gt;&lt;span class="nds-label"&gt;URL&lt;/span&gt;&lt;/label&gt;&lt;/div&gt;
              &lt;div class="nds-form-control"&gt;
                &lt;input type="url" class="nds-input" placeholder="https://" autocomplete="off" data-nds-editor-link-url /&gt;
              &lt;/div&gt;
            &lt;/div&gt;
            &lt;div class="nds-editor-link-actions"&gt;
              &lt;button type="button" class="nds-btn nds-secondary-outline" data-nds-editor-link-unlink hidden&gt;&lt;span class="nds-label"&gt;Unlink&lt;/span&gt;&lt;/button&gt;
              &lt;button type="button" class="nds-btn nds-primary" data-nds-editor-link-confirm data-dropmenu-primary&gt;&lt;span class="nds-label"&gt;Insert&lt;/span&gt;&lt;/button&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
      &lt;div class="nds-btn-group"&gt;
        &lt;button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="h1" aria-pressed="false" aria-label="Heading 1"&gt;&lt;i class="hgi hgi-stroke hgi-heading-01" aria-hidden="true"&gt;&lt;/i&gt;&lt;/button&gt;
        &lt;button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="h2" aria-pressed="false" aria-label="Heading 2"&gt;&lt;i class="hgi hgi-stroke hgi-heading-02" aria-hidden="true"&gt;&lt;/i&gt;&lt;/button&gt;
        &lt;button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="h3" aria-pressed="false" aria-label="Heading 3"&gt;&lt;i class="hgi hgi-stroke hgi-heading-03" aria-hidden="true"&gt;&lt;/i&gt;&lt;/button&gt;
      &lt;/div&gt;
      &lt;div class="nds-btn-group"&gt;
        &lt;button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="ul" aria-pressed="false" aria-label="Bulleted list"&gt;&lt;i class="hgi hgi-stroke hgi-left-to-right-list-bullet" aria-hidden="true"&gt;&lt;/i&gt;&lt;/button&gt;
        &lt;button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="ol" aria-pressed="false" aria-label="Numbered list"&gt;&lt;i class="hgi hgi-stroke hgi-left-to-right-list-number" aria-hidden="true"&gt;&lt;/i&gt;&lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-bar-end"&gt;
      &lt;button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-source-toggle aria-pressed="false" aria-label="View HTML source"&gt;&lt;i class="hgi hgi-stroke hgi-source-code" aria-hidden="true"&gt;&lt;/i&gt;&lt;/button&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-control"&gt;
    &lt;div class="nds-editor-editable is-empty"
      contenteditable="true"
      role="textbox"
      aria-multiline="true"
      aria-labelledby="editor-standard-label"
      data-placeholder="Write here"&gt;&lt;p&gt;&lt;br&gt;&lt;/p&gt;&lt;/div&gt;
    &lt;textarea class="nds-textarea nds-editor-source" name="editor-standard" id="editor-standard-field" tabindex="-1"&gt;&lt;/textarea&gt;
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

<!-- Pre-filled -->
<section id="editorFilled" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Pre-filled Content</h2>
            <p class="nds-section-description">Server-rendered values hydrate from the textarea, and the toolbar is composable: ship only the commands your use case needs</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Compact toolbar, hydrated value</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-form-container nds-textarea nds-editor">
                                <div class="nds-form-header">
                                    <label id="editor-filled-label" for="editor-filled-field"><span class="nds-label">Announcement</span></label>
                                </div>
                                <div class="nds-toolbar">
                                    <div class="nds-bar-start">
                                        <div class="nds-btn-group">
                                            <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="bold" aria-pressed="false" aria-label="Bold"><i class="hgi hgi-stroke hgi-text-bold" aria-hidden="true"></i></button>
                                            <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="italic" aria-pressed="false" aria-label="Italic"><i class="hgi hgi-stroke hgi-text-italic" aria-hidden="true"></i></button>
                                            <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="underline" aria-pressed="false" aria-label="Underline"><i class="hgi hgi-stroke hgi-text-underline" aria-hidden="true"></i></button>
                                        </div>
                                        <div class="nds-btn-group">
                                            <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="ul" aria-pressed="false" aria-label="Bulleted list"><i class="hgi hgi-stroke hgi-left-to-right-list-bullet" aria-hidden="true"></i></button>
                                            <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="ol" aria-pressed="false" aria-label="Numbered list"><i class="hgi hgi-stroke hgi-left-to-right-list-number" aria-hidden="true"></i></button>
                                        </div>
                                    </div>
                                    <div class="nds-bar-end">
                                        <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-source-toggle aria-pressed="false" aria-label="View HTML source"><i class="hgi hgi-stroke hgi-source-code" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                                <div class="nds-form-control">
                                    <div class="nds-editor-editable"
                                        contenteditable="true"
                                        role="textbox"
                                        aria-multiline="true"
                                        aria-labelledby="editor-filled-label"
                                        data-placeholder="Write here"><p><br></p></div>
                                    <textarea class="nds-textarea nds-editor-source" name="editor-filled" id="editor-filled-field" tabindex="-1">
<h2>Portal update</h2>
<p>The new services portal launches <strong>next quarter</strong>. Read the <a href="https://nds.gov.sa" rel="noopener noreferrer">full announcement</a> for details.</p>
<ul>
<li>Unified sign-on across services</li>
<li>Faster request tracking</li>
</ul>
                                    </textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                        aria-controls="panel-editor-filled-1" id="tab-editor-filled-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-editor-filled-1"
                                    aria-labelledby="tab-editor-filled-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                    <code class="lang-html code">
&lt;div class="nds-form-container nds-textarea nds-editor"&gt;
  &lt;div class="nds-form-header"&gt;
    &lt;label id="editor-filled-label" for="editor-filled-field"&gt;&lt;span class="nds-label"&gt;Announcement&lt;/span&gt;&lt;/label&gt;
  &lt;/div&gt;
  &lt;div class="nds-toolbar"&gt;
    &lt;div class="nds-bar-start"&gt;
      &lt;div class="nds-btn-group"&gt;
        &lt;button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="bold" aria-pressed="false" aria-label="Bold"&gt;&lt;i class="hgi hgi-stroke hgi-text-bold" aria-hidden="true"&gt;&lt;/i&gt;&lt;/button&gt;
        &lt;button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="italic" aria-pressed="false" aria-label="Italic"&gt;&lt;i class="hgi hgi-stroke hgi-text-italic" aria-hidden="true"&gt;&lt;/i&gt;&lt;/button&gt;
        &lt;button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="underline" aria-pressed="false" aria-label="Underline"&gt;&lt;i class="hgi hgi-stroke hgi-text-underline" aria-hidden="true"&gt;&lt;/i&gt;&lt;/button&gt;
      &lt;/div&gt;
      &lt;div class="nds-btn-group"&gt;
        &lt;button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="ul" aria-pressed="false" aria-label="Bulleted list"&gt;&lt;i class="hgi hgi-stroke hgi-left-to-right-list-bullet" aria-hidden="true"&gt;&lt;/i&gt;&lt;/button&gt;
        &lt;button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="ol" aria-pressed="false" aria-label="Numbered list"&gt;&lt;i class="hgi hgi-stroke hgi-left-to-right-list-number" aria-hidden="true"&gt;&lt;/i&gt;&lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-bar-end"&gt;
      &lt;button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-source-toggle aria-pressed="false" aria-label="View HTML source"&gt;&lt;i class="hgi hgi-stroke hgi-source-code" aria-hidden="true"&gt;&lt;/i&gt;&lt;/button&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-control"&gt;
    &lt;div class="nds-editor-editable"
      contenteditable="true"
      role="textbox"
      aria-multiline="true"
      aria-labelledby="editor-filled-label"
      data-placeholder="Write here"&gt;&lt;p&gt;&lt;br&gt;&lt;/p&gt;&lt;/div&gt;
    &lt;textarea class="nds-textarea nds-editor-source" name="editor-filled" id="editor-filled-field" tabindex="-1"&gt;
&lt;h2&gt;Portal update&lt;/h2&gt;
&lt;p&gt;The new services portal launches &lt;strong&gt;next quarter&lt;/strong&gt;. Read the &lt;a href="https://nds.gov.sa" rel="noopener noreferrer"&gt;full announcement&lt;/a&gt; for details.&lt;/p&gt;
&lt;ul&gt;
&lt;li&gt;Unified sign-on across services&lt;/li&gt;
&lt;li&gt;Faster request tracking&lt;/li&gt;
&lt;/ul&gt;
    &lt;/textarea&gt;
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

<!-- Blocks (Beta) -->
<section id="editorBlocks" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Insertable Blocks (Beta)</h2>
            <p class="nds-section-description">Insert NDS components (alert, quote, table) as atomic blocks with editable text slots. Select a block to reorder or delete it from the toolbar, and switch an alert's status or manage table rows and columns from the same controls. This system is in beta and still being refined</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Insert menu and block controls</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-form-container nds-textarea nds-editor">
                                <div class="nds-form-header">
                                    <label id="editor-blocks-label" for="editor-blocks-field"><span class="nds-label">Report</span></label>
                                </div>
                                <div class="nds-toolbar">
                                    <div class="nds-bar-start">
                                        <div class="nds-btn-group">
                                            <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="undo" aria-label="Undo"><i class="hgi hgi-stroke hgi-arrow-turn-backward" aria-hidden="true"></i></button>
                                            <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="redo" aria-label="Redo"><i class="hgi hgi-stroke hgi-arrow-turn-forward" aria-hidden="true"></i></button>
                                        </div>
                                        <div class="nds-btn-group">
                                            <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="bold" aria-pressed="false" aria-label="Bold"><i class="hgi hgi-stroke hgi-text-bold" aria-hidden="true"></i></button>
                                            <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="italic" aria-pressed="false" aria-label="Italic"><i class="hgi hgi-stroke hgi-text-italic" aria-hidden="true"></i></button>
                                            <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="underline" aria-pressed="false" aria-label="Underline"><i class="hgi hgi-stroke hgi-text-underline" aria-hidden="true"></i></button>
                                        </div>
                                        <div class="nds-btn-group">
                                            <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="ul" aria-pressed="false" aria-label="Bulleted list"><i class="hgi hgi-stroke hgi-left-to-right-list-bullet" aria-hidden="true"></i></button>
                                            <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="ol" aria-pressed="false" aria-label="Numbered list"><i class="hgi hgi-stroke hgi-left-to-right-list-number" aria-hidden="true"></i></button>
                                        </div>
                                        <div class="nds-dropmenu" data-nds-editor-insert-dropmenu>
                                            <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only nds-dropmenu-trigger" data-cmd="insert" aria-label="Insert component"><i class="hgi hgi-stroke hgi-add-01" aria-hidden="true"></i></button>
                                            <div class="nds-dropmenu-menu" hidden>
                                                <div class="nds-dropmenu-scroll"></div>
                                            </div>
                                        </div>
                                        <div class="nds-btn-group" data-nds-editor-block-ops hidden></div>
                                        <div class="nds-btn-group" data-nds-editor-block-controls hidden>
                                            <button type="button" class="nds-btn nds-neutral nds-md nds-icon-only" data-block-cmd="move-up" aria-label="Move block up"><i class="hgi hgi-stroke hgi-arrow-up-01" aria-hidden="true"></i></button>
                                            <button type="button" class="nds-btn nds-neutral nds-md nds-icon-only" data-block-cmd="move-down" aria-label="Move block down"><i class="hgi hgi-stroke hgi-arrow-down-01" aria-hidden="true"></i></button>
                                            <button type="button" class="nds-btn nds-primary nds-destructive nds-md nds-icon-only" data-block-cmd="delete" aria-label="Remove block"><i class="hgi hgi-stroke hgi-delete-02" aria-hidden="true"></i></button>
                                        </div>
                                    </div>
                                    <div class="nds-bar-end">
                                        <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-source-toggle aria-pressed="false" aria-label="View HTML source"><i class="hgi hgi-stroke hgi-source-code" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                                <div class="nds-form-control">
                                    <div class="nds-editor-editable"
                                        contenteditable="true"
                                        role="textbox"
                                        aria-multiline="true"
                                        aria-labelledby="editor-blocks-label"
                                        data-placeholder="Write here"><p><br></p></div>
                                    <textarea class="nds-textarea nds-editor-source" name="editor-blocks" id="editor-blocks-field" tabindex="-1">
<p>Quarterly figures are ready for review.</p>
<div class="nds-editor-block" data-nds-block="alert" data-variant="info"><div class="nds-alert nds-card" data-status="info" role="alert"><span class="nds-feedback nds-alert-icon nds-outline"><span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span></span><div class="nds-alert-content"><div class="nds-alert-text"><span class="nds-alert-title" data-nds-slot="title">Heads up</span><p class="nds-alert-description" data-nds-slot="description">Figures are provisional until the audit completes.</p></div></div></div></div>
<p>Final numbers follow after sign-off.</p>
                                    </textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                        aria-controls="panel-editor-blocks-1" id="tab-editor-blocks-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-editor-blocks-1"
                                    aria-labelledby="tab-editor-blocks-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                    <code class="lang-html code">
&lt;!-- Add to the toolbar: the insert menu plus the two block-control groups.
     Ops buttons (table rows/columns, alert status) are built by the editor
     per block type; the universal move/delete buttons are authored here. --&gt;
&lt;div class="nds-dropmenu" data-nds-editor-insert-dropmenu&gt;
  &lt;button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only nds-dropmenu-trigger" data-cmd="insert" aria-label="Insert component"&gt;&lt;i class="hgi hgi-stroke hgi-add-01" aria-hidden="true"&gt;&lt;/i&gt;&lt;/button&gt;
  &lt;div class="nds-dropmenu-menu" hidden&gt;
    &lt;div class="nds-dropmenu-scroll"&gt;&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
&lt;div class="nds-btn-group" data-nds-editor-block-ops hidden&gt;&lt;/div&gt;
&lt;div class="nds-btn-group" data-nds-editor-block-controls hidden&gt;
  &lt;button type="button" class="nds-btn nds-neutral nds-md nds-icon-only" data-block-cmd="move-up" aria-label="Move block up"&gt;&lt;i class="hgi hgi-stroke hgi-arrow-up-01" aria-hidden="true"&gt;&lt;/i&gt;&lt;/button&gt;
  &lt;button type="button" class="nds-btn nds-neutral nds-md nds-icon-only" data-block-cmd="move-down" aria-label="Move block down"&gt;&lt;i class="hgi hgi-stroke hgi-arrow-down-01" aria-hidden="true"&gt;&lt;/i&gt;&lt;/button&gt;
  &lt;button type="button" class="nds-btn nds-primary nds-destructive nds-md nds-icon-only" data-block-cmd="delete" aria-label="Remove block"&gt;&lt;i class="hgi hgi-stroke hgi-delete-02" aria-hidden="true"&gt;&lt;/i&gt;&lt;/button&gt;
&lt;/div&gt;

&lt;!-- A block in the submitted value: a wrapper with the component's
     canonical markup inside. data-nds-slot elements hold the user's text. --&gt;
&lt;div class="nds-editor-block" data-nds-block="alert" data-variant="info"&gt;
  &lt;div class="nds-alert nds-card" data-status="info" role="alert"&gt;
    &lt;span class="nds-feedback nds-alert-icon nds-outline"&gt;&lt;span class="nds-feedback-icon"&gt;&lt;i class="nds-icon" aria-hidden="true"&gt;&lt;/i&gt;&lt;/span&gt;&lt;/span&gt;
    &lt;div class="nds-alert-content"&gt;&lt;div class="nds-alert-text"&gt;
      &lt;span class="nds-alert-title" data-nds-slot="title"&gt;Heads up&lt;/span&gt;
      &lt;p class="nds-alert-description" data-nds-slot="description"&gt;Figures are provisional until the audit completes.&lt;/p&gt;
    &lt;/div&gt;&lt;/div&gt;
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

<!-- States -->
<section id="editorStates" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">States</h2>
            <p class="nds-section-description">Readonly keeps content selectable with the source view available, disabled makes the field inert and excludes it from submission. Both apply from server-rendered markup or at runtime through NDS.State</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Readonly</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-form-container nds-textarea nds-editor" data-state="readonly">
                                <div class="nds-form-header">
                                    <label id="editor-readonly-label" for="editor-readonly-field"><span class="nds-label">Review notes</span></label>
                                </div>
                                <div class="nds-toolbar">
                                    <div class="nds-bar-start">
                                        <div class="nds-btn-group">
                                            <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="bold" aria-pressed="false" aria-label="Bold"><i class="hgi hgi-stroke hgi-text-bold" aria-hidden="true"></i></button>
                                            <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="italic" aria-pressed="false" aria-label="Italic"><i class="hgi hgi-stroke hgi-text-italic" aria-hidden="true"></i></button>
                                            <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="underline" aria-pressed="false" aria-label="Underline"><i class="hgi hgi-stroke hgi-text-underline" aria-hidden="true"></i></button>
                                        </div>
                                    </div>
                                    <div class="nds-bar-end">
                                        <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-source-toggle aria-pressed="false" aria-label="View HTML source"><i class="hgi hgi-stroke hgi-source-code" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                                <div class="nds-form-control">
                                    <div class="nds-editor-editable"
                                        contenteditable="false"
                                        role="textbox"
                                        aria-multiline="true"
                                        aria-readonly="true"
                                        aria-labelledby="editor-readonly-label"
                                        data-placeholder="Write here"><p><br></p></div>
                                    <textarea class="nds-textarea nds-editor-source" name="editor-readonly" id="editor-readonly-field" tabindex="-1" readonly>
<p>These notes are <strong>read only</strong>: content stays selectable and the source view still opens.</p>
                                    </textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                        aria-controls="panel-editor-readonly-1" id="tab-editor-readonly-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-editor-readonly-1"
                                    aria-labelledby="tab-editor-readonly-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                    <code class="lang-html code">
&lt;div class="nds-form-container nds-textarea nds-editor" data-state="readonly"&gt;
  &lt;div class="nds-form-header"&gt;
    &lt;label id="editor-readonly-label" for="editor-readonly-field"&gt;&lt;span class="nds-label"&gt;Review notes&lt;/span&gt;&lt;/label&gt;
  &lt;/div&gt;
  &lt;div class="nds-toolbar"&gt;
    &lt;div class="nds-bar-start"&gt;
      &lt;div class="nds-btn-group"&gt;
        &lt;button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="bold" aria-pressed="false" aria-label="Bold"&gt;&lt;i class="hgi hgi-stroke hgi-text-bold" aria-hidden="true"&gt;&lt;/i&gt;&lt;/button&gt;
        &lt;button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="italic" aria-pressed="false" aria-label="Italic"&gt;&lt;i class="hgi hgi-stroke hgi-text-italic" aria-hidden="true"&gt;&lt;/i&gt;&lt;/button&gt;
        &lt;button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="underline" aria-pressed="false" aria-label="Underline"&gt;&lt;i class="hgi hgi-stroke hgi-text-underline" aria-hidden="true"&gt;&lt;/i&gt;&lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-bar-end"&gt;
      &lt;button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-source-toggle aria-pressed="false" aria-label="View HTML source"&gt;&lt;i class="hgi hgi-stroke hgi-source-code" aria-hidden="true"&gt;&lt;/i&gt;&lt;/button&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-control"&gt;
    &lt;div class="nds-editor-editable"
      contenteditable="false"
      role="textbox"
      aria-multiline="true"
      aria-readonly="true"
      aria-labelledby="editor-readonly-label"
      data-placeholder="Write here"&gt;&lt;p&gt;&lt;br&gt;&lt;/p&gt;&lt;/div&gt;
    &lt;textarea class="nds-textarea nds-editor-source" name="editor-readonly" id="editor-readonly-field" tabindex="-1" readonly&gt;
&lt;p&gt;These notes are &lt;strong&gt;read only&lt;/strong&gt;: content stays selectable and the source view still opens.&lt;/p&gt;
    &lt;/textarea&gt;
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
                        <div class="demo-label">Disabled</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-form-container nds-textarea nds-editor" data-state="disabled">
                                <div class="nds-form-header">
                                    <label id="editor-disabled-label" for="editor-disabled-field"><span class="nds-label">Archived entry</span></label>
                                </div>
                                <div class="nds-toolbar">
                                    <div class="nds-bar-start">
                                        <div class="nds-btn-group">
                                            <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="bold" aria-pressed="false" aria-label="Bold"><i class="hgi hgi-stroke hgi-text-bold" aria-hidden="true"></i></button>
                                            <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="italic" aria-pressed="false" aria-label="Italic"><i class="hgi hgi-stroke hgi-text-italic" aria-hidden="true"></i></button>
                                            <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="underline" aria-pressed="false" aria-label="Underline"><i class="hgi hgi-stroke hgi-text-underline" aria-hidden="true"></i></button>
                                        </div>
                                    </div>
                                    <div class="nds-bar-end">
                                        <button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-source-toggle aria-pressed="false" aria-label="View HTML source"><i class="hgi hgi-stroke hgi-source-code" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                                <div class="nds-form-control">
                                    <div class="nds-editor-editable"
                                        contenteditable="false"
                                        role="textbox"
                                        aria-multiline="true"
                                        aria-labelledby="editor-disabled-label"
                                        data-placeholder="Write here"><p><br></p></div>
                                    <textarea class="nds-textarea nds-editor-source" name="editor-disabled" id="editor-disabled-field" tabindex="-1" disabled>
<p>This entry is archived and its value does not submit.</p>
                                    </textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                        aria-controls="panel-editor-disabled-1" id="tab-editor-disabled-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-editor-disabled-1"
                                    aria-labelledby="tab-editor-disabled-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                    <code class="lang-html code">
&lt;div class="nds-form-container nds-textarea nds-editor" data-state="disabled"&gt;
  &lt;div class="nds-form-header"&gt;
    &lt;label id="editor-disabled-label" for="editor-disabled-field"&gt;&lt;span class="nds-label"&gt;Archived entry&lt;/span&gt;&lt;/label&gt;
  &lt;/div&gt;
  &lt;div class="nds-toolbar"&gt;
    &lt;div class="nds-bar-start"&gt;
      &lt;div class="nds-btn-group"&gt;
        &lt;button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="bold" aria-pressed="false" aria-label="Bold"&gt;&lt;i class="hgi hgi-stroke hgi-text-bold" aria-hidden="true"&gt;&lt;/i&gt;&lt;/button&gt;
        &lt;button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="italic" aria-pressed="false" aria-label="Italic"&gt;&lt;i class="hgi hgi-stroke hgi-text-italic" aria-hidden="true"&gt;&lt;/i&gt;&lt;/button&gt;
        &lt;button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-cmd="underline" aria-pressed="false" aria-label="Underline"&gt;&lt;i class="hgi hgi-stroke hgi-text-underline" aria-hidden="true"&gt;&lt;/i&gt;&lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-bar-end"&gt;
      &lt;button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only" data-source-toggle aria-pressed="false" aria-label="View HTML source"&gt;&lt;i class="hgi hgi-stroke hgi-source-code" aria-hidden="true"&gt;&lt;/i&gt;&lt;/button&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-control"&gt;
    &lt;div class="nds-editor-editable"
      contenteditable="false"
      role="textbox"
      aria-multiline="true"
      aria-labelledby="editor-disabled-label"
      data-placeholder="Write here"&gt;&lt;p&gt;&lt;br&gt;&lt;/p&gt;&lt;/div&gt;
    &lt;textarea class="nds-textarea nds-editor-source" name="editor-disabled" id="editor-disabled-field" tabindex="-1" disabled&gt;
&lt;p&gt;This entry is archived and its value does not submit.&lt;/p&gt;
    &lt;/textarea&gt;
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
<section id="editorFeatures" class="nds-content-section nds-demo-section">
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
                    <p class="nds-item-desc">Activates when .nds-editor is on the page. Toolbar commands, form sync, and states wire up automatically.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-clipboard"></i>
                        <span class="nds-label">NDS-Native Paste</span>
                    </span>
                    <p class="nds-item-desc">Word and Google Docs content converts to clean markup on paste: real lists, semantic bold and italic, tables restyled as NDS tables, junk stripped. Pasted HTML source code renders instead of showing tags.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-text-check"></i>
                        <span class="nds-label">Native Form Integration</span>
                    </span>
                    <p class="nds-item-desc">The value lives in a real textarea: it submits with the form, supports required validation, and fires input and change events like any field.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-source-code"></i>
                        <span class="nds-label">HTML Source View</span>
                    </span>
                    <p class="nds-item-desc">A toolbar toggle swaps to the pretty-printed markup for direct editing, carrying your text selection over so you land where you meant to edit. Tab indents, Escape then Tab leaves the field.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-package"></i>
                        <span class="nds-label">Insertable Blocks (Beta)</span>
                    </span>
                    <p class="nds-item-desc">Insert alerts, quotes, and tables as atomic blocks with editable text slots, managed from the toolbar while selected. Extensible with custom blocks through the JS API.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-keyboard"></i>
                        <span class="nds-label">Keyboard Shortcuts</span>
                    </span>
                    <p class="nds-item-desc">Ctrl or Cmd with B, I, and U for inline formatting, Tab and Shift+Tab nest list items, and native undo and redo work throughout.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-square-lock-02"></i>
                        <span class="nds-label">Readonly and Disabled</span>
                    </span>
                    <p class="nds-item-desc">Full field states: readonly keeps content selectable with the source view available, disabled excludes the value from submission.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-api"></i>
                        <span class="nds-label">Programmatic Control</span>
                    </span>
                    <p class="nds-item-desc">Initialize, create, and destroy instances, register custom blocks, and react to the ready event through the JS API.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="editorGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use the editor for <strong>user-authored rich content</strong> destined for NDS pages: announcements, article bodies, service descriptions, review notes</li>
                    <li>Use it for <strong>paste-heavy workflows</strong> where authors draft in Word or Google Docs: the paste pipeline converts their formatting instead of losing it or letting junk through</li>
                    <li>Do not use it for short single-line values or plain text. Use <a class="nds-color" href="{{ 'components/forms' | relative_url }}">Text Fields</a> instead</li>
                    <li>Do not use it as a code editor. The source view exists for occasional markup fixes, not as a primary authoring surface</li>
                    <li><strong>Compose the toolbar to your use case</strong>: every command button is optional markup, so a comment field might ship only bold, italic, and lists while a CMS field ships everything</li>
                    <li>The whole component is <strong>beta</strong>: expect refinements while it hardens through real-project use, with the blocks system the most likely to change</li>
                    <li>Add <code class="nds-inline-code lang-html">required</code> to the textarea (and <code class="nds-inline-code lang-html">data-required</code> on the container) for mandatory fields: validation works natively because the value is a real form field</li>
                    <li>Keep the heading commands consistent with your page outline. If editor content renders inside a section with an h2 title, consider offering only h3 in the toolbar</li>
                    <li>Translate the toolbar <code class="nds-inline-code lang-html">aria-label</code> attributes when the page language is not English. The command wiring keys on <code class="nds-inline-code lang-html">data-cmd</code>, not the labels</li>
                    <li>Register custom blocks <strong>before the editor initializes</strong> when pages ship pre-filled block content, so hydration recognizes them</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Keyboard Interactions</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Keys</th><th>Action</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">Ctrl/Cmd + B / I / U</code></td><td>Bold, italic, underline</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">Tab / Shift+Tab</code></td><td>In a list item: nest or un-nest the item. In a table block cell: move between cells. In source view: indent or outdent the line or selection</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">Escape, then Tab</code></td><td>In source view: release the tab trap and move focus out of the field</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">Enter</code></td><td>New paragraph. Inside a block text slot: line break, blocks stay single-level</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">Ctrl/Cmd + Z / Y</code></td><td>Native undo and redo, including block insertion</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-cmd</code></td><td>Set on toolbar buttons to wire a command. Values: <code class="nds-inline-code lang-html">bold</code>, <code class="nds-inline-code lang-html">italic</code>, <code class="nds-inline-code lang-html">underline</code>, <code class="nds-inline-code lang-html">strike</code>, <code class="nds-inline-code lang-html">clear</code>, <code class="nds-inline-code lang-html">undo</code>, <code class="nds-inline-code lang-html">redo</code>, <code class="nds-inline-code lang-html">h1</code>, <code class="nds-inline-code lang-html">h2</code>, <code class="nds-inline-code lang-html">h3</code>, <code class="nds-inline-code lang-html">ul</code>, <code class="nds-inline-code lang-html">ol</code>, <code class="nds-inline-code lang-html">link</code>, <code class="nds-inline-code lang-html">insert</code>. Toggle commands carry <code class="nds-inline-code lang-html">aria-pressed</code>, action commands do not</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-source-toggle</code></td><td>Set on the toolbar button that switches between the editing surface and the HTML source view</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-placeholder</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-editor-editable</code>: placeholder text shown while the editor is empty</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-state</code></td><td>Set on the container: <code class="nds-inline-code lang-html">readonly</code> or <code class="nds-inline-code lang-html">disabled</code>, applied at initialization</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-nds-editor-link-dropmenu</code></td><td>Marks the link popover dropmenu. Inside it: <code class="nds-inline-code lang-html">data-nds-editor-link-url</code> on the URL input, <code class="nds-inline-code lang-html">data-nds-editor-link-confirm</code> and <code class="nds-inline-code lang-html">data-nds-editor-link-unlink</code> on the action buttons</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-nds-editor-insert-dropmenu</code></td><td>Marks the block insert menu (Beta). The editor fills its <code class="nds-inline-code lang-html">.nds-dropmenu-scroll</code> with one row per registered block</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-nds-editor-block-controls</code></td><td>Marks the universal block command group (Beta), shown while a block is selected. Its buttons carry <code class="nds-inline-code lang-html">data-block-cmd</code>: <code class="nds-inline-code lang-html">move-up</code>, <code class="nds-inline-code lang-html">move-down</code>, <code class="nds-inline-code lang-html">delete</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-nds-editor-block-ops</code></td><td>Marks the per-type block operations group (Beta). The editor builds its buttons from the active block's definition: table rows and columns, alert status</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-nds-block</code>, <code class="nds-inline-code lang-html">data-variant</code>, <code class="nds-inline-code lang-html">data-nds-slot</code></td><td>The serialized block format in the value (Beta): the wrapper names the block and its variant, slot elements hold the user's editable text</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--editor-min-size</code></td><td><code class="nds-inline-code lang-html">12rem</code></td><td>Minimum height of the editing surface and the source view</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDS.Editor</strong> API initializes editors, creates and destroys instances, and registers custom blocks. The submitted value is always the hidden textarea, so reading and listening work like any form field.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// ── Initialization ───────────────────────────────────
// Auto-initializes every .nds-editor on page load.
NDS.Editor.init();                    // scan for new editors (also NDS.Editor.reinit())
const inst = NDS.Editor.create(el);   // initialize one root, returns the instance
NDS.Editor.destroy(el);               // tear an instance down
el.ndsEditor;                         // instance backref on the root element

// ── Ready event ──────────────────────────────────────
el.addEventListener('nds:editor:ready', (e) =&gt; {
    e.detail.instance;                // the editor instance
});

// ── Value access ─────────────────────────────────────
// The hidden textarea IS the form field: sanitized, pretty-printed markup.
const value = textarea.value;
textarea.addEventListener('input', onEdit);    // fires on every edit
textarea.addEventListener('change', onCommit); // fires on blur when changed

// ── Runtime states ───────────────────────────────────
NDS.State.add(el, 'readonly');        // or 'disabled'
NDS.State.remove(el, 'readonly');

// ── Register a custom block (Beta) ───────────────────
// Blocks are CONTENT, not widgets: render canonical component markup,
// mark editable text with data-nds-slot, and never attach listeners or
// state inside the block. The value is always re-rendered from this
// template, so runtime state cannot leak into submissions.
NDS.Editor.registerBlock({
    name: 'callout',                       // registry key = data-nds-block
    label: 'Callout',                      // insert menu row text
    icon: 'hgi-idea-01',                   // insert menu row icon
    variants: { note: 'Note', tip: 'Tip' },// optional enum, first = default
    slots: ['title', 'body'],              // prop keys holding user text
    slotContent: { body: 'rich' },         // 'inline' (default) | 'rich' | 'text'
    defaults: { title: 'Callout', body: 'Callout text' },
    render: (p) =&gt; `
        &lt;div class="nds-callout" data-status="${p.variant}"&gt;
            &lt;span class="nds-callout-title" data-nds-slot="title"&gt;${p.title}&lt;/span&gt;
            &lt;p class="nds-callout-body" data-nds-slot="body"&gt;${p.body}&lt;/p&gt;
        &lt;/div&gt;`,
    // parse(blockEl): optional, read props back from variable structure
    // ops: optional toolbar commands while the block is selected, e.g.
    ops: {
        'make-tip': {
            icon: 'hgi-idea-01',
            label: 'Tip',
            pressed: (p) =&gt; p.variant === 'tip',      // shows as active
            run: (p) =&gt; p.variant === 'tip' ? null : (p.variant = 'tip', p)
        }
    }
});
// Register BEFORE editors initialize when pages ship pre-filled block
// content. Built-in blocks (alert, quote, table) live in
// nds-editor-blocks.js, which doubles as the extension blueprint.
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
