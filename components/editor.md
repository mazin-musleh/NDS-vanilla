---
layout: page
title: Editor
hero_title: Editor - National Design System
hero_description: A rich text field that upgrades a standard textarea into an editing surface with a generated, localized toolbar, converting pasted Word, Google Docs, and web content into clean NDS markup and keeping pasted NDS components intact while editing.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.4.0"
updated: "1.4.0"
last_edit: "17/07/2026 - 08:51 PM"
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
            <p class="nds-section-description">The markup contract is a standard textarea field wearing one extra class: the editing surface, toolbar, and popovers are generated at load, and the textarea stays the form value</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Default toolbar, generated from a plain textarea field</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-form-container nds-textarea nds-editor">
                                <div class="nds-form-header">
                                    <label for="editor-standard-field"><span class="nds-label">Content</span></label>
                                </div>
                                <div class="nds-form-control">
                                    <textarea class="nds-textarea" name="editor-standard" id="editor-standard-field" placeholder="Write here"></textarea>
                                </div>
                                <div class="nds-form-footer" data-feedback-target hidden></div>
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
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-editor-standard-1"
                                    aria-labelledby="tab-editor-standard-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;div class="nds-form-container nds-textarea nds-editor"&gt;
  &lt;div class="nds-form-header"&gt;
    &lt;label for="editor-standard-field"&gt;&lt;span class="nds-label"&gt;Content&lt;/span&gt;&lt;/label&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-control"&gt;
    &lt;textarea class="nds-textarea" name="editor-standard" id="editor-standard-field" placeholder="Write here"&gt;&lt;/textarea&gt;
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

<!-- Toolbar Composition -->
<section id="editorToolbar" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Toolbar Composition</h2>
            <p class="nds-section-description">One attribute picks the commands for the field: a comment box might ship only inline formatting while a CMS field ships everything. Server-rendered values hydrate from the textarea</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Custom command set, hydrated value</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-form-container nds-textarea nds-editor" data-editor-toolbar="bold italic underline | link | ul ol | source">
                                <div class="nds-form-header">
                                    <label for="editor-composed-field"><span class="nds-label">Announcement</span></label>
                                </div>
                                <div class="nds-form-control">
                                    <textarea class="nds-textarea" name="editor-composed" id="editor-composed-field" placeholder="Write here">
<h2>Portal update</h2>
<p>The new services portal launches <strong>next quarter</strong>. Read the <a href="https://nds.gov.sa" rel="noopener noreferrer">full announcement</a> for details.</p>
<ul>
<li>Unified sign-on across services</li>
<li>Faster request tracking</li>
</ul>
                                    </textarea>
                                </div>
                                <div class="nds-form-footer" data-feedback-target hidden></div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                        aria-controls="panel-editor-composed-1" id="tab-editor-composed-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-editor-composed-1"
                                    aria-labelledby="tab-editor-composed-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                    <code class="lang-html code">
&lt;div class="nds-form-container nds-textarea nds-editor" data-editor-toolbar="bold italic underline | link | ul ol | source"&gt;
  &lt;div class="nds-form-header"&gt;
    &lt;label for="editor-composed-field"&gt;&lt;span class="nds-label"&gt;Announcement&lt;/span&gt;&lt;/label&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-control"&gt;
    &lt;textarea class="nds-textarea" name="editor-composed" id="editor-composed-field" placeholder="Write here"&gt;
&lt;h2&gt;Portal update&lt;/h2&gt;
&lt;p&gt;The new services portal launches &lt;strong&gt;next quarter&lt;/strong&gt;. Read the &lt;a href="https://nds.gov.sa" rel="noopener noreferrer"&gt;full announcement&lt;/a&gt; for details.&lt;/p&gt;
&lt;ul&gt;
&lt;li&gt;Unified sign-on across services&lt;/li&gt;
&lt;li&gt;Faster request tracking&lt;/li&gt;
&lt;/ul&gt;
    &lt;/textarea&gt;
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

<!-- NDS Components by Paste -->
<section id="editorComponents" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">NDS Components by Paste</h2>
            <p class="nds-section-description">Copy component markup from any doc page and paste it in: it stays a styled, protected component. Deletion stops at component boundaries, Enter adds a line break inside instead of splitting the structure, and the toolbar's remove button lists the component levels at the caret</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Protected component shells: try deleting at the edges, Enter inside, and the remove button</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-form-container nds-textarea nds-editor">
                                <div class="nds-form-header">
                                    <label for="editor-components-field"><span class="nds-label">Composed document</span></label>
                                </div>
                                <div class="nds-form-control">
                                    <textarea class="nds-textarea" name="editor-components" id="editor-components-field" placeholder="Paste component markup here">
<p>Service status: <span class="nds-tag nds-sm" data-status="success"><span class="nds-label">Active</span></span> checked daily.</p>
<div class="nds-alert nds-card" data-status="info" role="alert"><span class="nds-feedback nds-alert-icon nds-outline"><span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span></span><div class="nds-alert-content"><div class="nds-alert-text"><span class="nds-alert-title">Heads up</span><p class="nds-alert-description">This alert was pasted as markup and stays an editable, protected component.</p></div></div></div>
<p>Text before and after components stays freely editable.</p>
                                    </textarea>
                                </div>
                                <div class="nds-form-footer" data-feedback-target hidden></div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                        aria-controls="panel-editor-components-1" id="tab-editor-components-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-editor-components-1"
                                    aria-labelledby="tab-editor-components-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                    <code class="lang-html code">
&lt;div class="nds-form-container nds-textarea nds-editor"&gt;
  &lt;div class="nds-form-header"&gt;
    &lt;label for="editor-components-field"&gt;&lt;span class="nds-label"&gt;Composed document&lt;/span&gt;&lt;/label&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-control"&gt;
    &lt;textarea class="nds-textarea" name="editor-components" id="editor-components-field" placeholder="Paste component markup here"&gt;
&lt;p&gt;Service status: &lt;span class="nds-tag nds-sm" data-status="success"&gt;&lt;span class="nds-label"&gt;Active&lt;/span&gt;&lt;/span&gt; checked daily.&lt;/p&gt;
&lt;div class="nds-alert nds-card" data-status="info" role="alert"&gt;&lt;span class="nds-feedback nds-alert-icon nds-outline"&gt;&lt;span class="nds-feedback-icon"&gt;&lt;i class="nds-icon" aria-hidden="true"&gt;&lt;/i&gt;&lt;/span&gt;&lt;/span&gt;&lt;div class="nds-alert-content"&gt;&lt;div class="nds-alert-text"&gt;&lt;span class="nds-alert-title"&gt;Heads up&lt;/span&gt;&lt;p class="nds-alert-description"&gt;This alert was pasted as markup and stays an editable, protected component.&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;
&lt;p&gt;Text before and after components stays freely editable.&lt;/p&gt;
    &lt;/textarea&gt;
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

<!-- States -->
<section id="editorStates" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">States</h2>
            <p class="nds-section-description">Native textarea attributes drive the initial state: readonly keeps content selectable with the source view available, disabled makes the field inert and excludes it from submission. Runtime toggles go through NDS.State</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Readonly</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-form-container nds-textarea nds-editor" data-editor-toolbar="bold italic underline | source">
                                <div class="nds-form-header">
                                    <label for="editor-readonly-field"><span class="nds-label">Review notes</span></label>
                                </div>
                                <div class="nds-form-control">
                                    <textarea class="nds-textarea" name="editor-readonly" id="editor-readonly-field" readonly>
<p>These notes are <strong>read only</strong>: content stays selectable and the source view still opens.</p>
                                    </textarea>
                                </div>
                                <div class="nds-form-footer" data-feedback-target hidden></div>
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
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-editor-readonly-1"
                                    aria-labelledby="tab-editor-readonly-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;div class="nds-form-container nds-textarea nds-editor" data-editor-toolbar="bold italic underline | source"&gt;
  &lt;div class="nds-form-header"&gt;
    &lt;label for="editor-readonly-field"&gt;&lt;span class="nds-label"&gt;Review notes&lt;/span&gt;&lt;/label&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-control"&gt;
    &lt;textarea class="nds-textarea" name="editor-readonly" id="editor-readonly-field" readonly&gt;
&lt;p&gt;These notes are &lt;strong&gt;read only&lt;/strong&gt;: content stays selectable and the source view still opens.&lt;/p&gt;
    &lt;/textarea&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-footer" data-feedback-target hidden&gt;&lt;/div&gt;
&lt;/div&gt;
                                    </code>
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
                            <div class="nds-form-container nds-textarea nds-editor" data-editor-toolbar="bold italic underline | source">
                                <div class="nds-form-header">
                                    <label for="editor-disabled-field"><span class="nds-label">Archived entry</span></label>
                                </div>
                                <div class="nds-form-control">
                                    <textarea class="nds-textarea" name="editor-disabled" id="editor-disabled-field" disabled>
<p>This entry is archived and its value does not submit.</p>
                                    </textarea>
                                </div>
                                <div class="nds-form-footer" data-feedback-target hidden></div>
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
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-editor-disabled-1"
                                    aria-labelledby="tab-editor-disabled-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;div class="nds-form-container nds-textarea nds-editor" data-editor-toolbar="bold italic underline | source"&gt;
  &lt;div class="nds-form-header"&gt;
    &lt;label for="editor-disabled-field"&gt;&lt;span class="nds-label"&gt;Archived entry&lt;/span&gt;&lt;/label&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-control"&gt;
    &lt;textarea class="nds-textarea" name="editor-disabled" id="editor-disabled-field" disabled&gt;
&lt;p&gt;This entry is archived and its value does not submit.&lt;/p&gt;
    &lt;/textarea&gt;
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
                    <p class="nds-item-desc">Add nds-editor to a standard textarea field. The editing surface, toolbar, popovers, and form wiring are generated at load.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-magic-wand-01"></i>
                        <span class="nds-label">Generated Localized Toolbar</span>
                    </span>
                    <p class="nds-item-desc">Commands are composed per field with one attribute, and button labels and tooltips ship in Arabic and English automatically.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-clipboard"></i>
                        <span class="nds-label">Foreign Paste Conversion</span>
                    </span>
                    <p class="nds-item-desc">Word and Google Docs content converts on paste: real lists, semantic bold and italic, tables restyled as NDS tables, junk stripped.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-package"></i>
                        <span class="nds-label">NDS Components by Paste</span>
                    </span>
                    <p class="nds-item-desc">Component markup pasted from any doc page stays a styled, editable component: classes, status attributes, and sizing knobs survive while unsafe markup is stripped.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-shield-01"></i>
                        <span class="nds-label">Component Shell Protection</span>
                    </span>
                    <p class="nds-item-desc">Deletes stop at component boundaries, Enter adds a line break inside a component instead of splitting it, and removal is always an explicit action.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-text-check"></i>
                        <span class="nds-label">Native Form Integration</span>
                    </span>
                    <p class="nds-item-desc">The value lives in your textarea: it submits with the form, supports required validation, and fires input and change events like any field.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-text-align-center"></i>
                        <span class="nds-label">Direction-aware Alignment</span>
                    </span>
                    <p class="nds-item-desc">Start, center, end, and justify follow text direction, so aligned content reads correctly in both RTL and LTR pages.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-source-code"></i>
                        <span class="nds-label">HTML Source View</span>
                    </span>
                    <p class="nds-item-desc">A toolbar toggle swaps to the pretty-printed markup for direct editing, carrying your text selection over so you land where you meant to edit.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-keyboard"></i>
                        <span class="nds-label">Keyboard Shortcuts</span>
                    </span>
                    <p class="nds-item-desc">Ctrl or Cmd with B, I, and U for inline formatting, Tab nests list items, and native undo and redo work throughout.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-api"></i>
                        <span class="nds-label">Programmatic Control</span>
                    </span>
                    <p class="nds-item-desc">Initialize, create, and destroy instances, and react to the ready event through the JS API. Destroy returns the plain textarea field.</p>
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
                    <li><strong>Compose the toolbar to the use case</strong> with <code class="nds-inline-code lang-html">data-editor-toolbar</code>: a comment field might ship <code class="nds-inline-code lang-html">bold italic | ul ol</code> while a CMS field ships the full default set</li>
                    <li>The default heading commands are <code class="nds-inline-code lang-html">h2 h3 h4</code> because the page already owns its h1. Add the <code class="nds-inline-code lang-html">h1</code> token only for fields that author complete pages</li>
                    <li>Add <code class="nds-inline-code lang-html">required</code> to the textarea (and <code class="nds-inline-code lang-html">data-required</code> on the container) for mandatory fields: validation works natively because the value is a real form field</li>
                    <li>Links marked "Open in new tab" get <code class="nds-inline-code lang-html">target="_blank"</code> with <code class="nds-inline-code lang-html">rel="noopener noreferrer"</code> paired automatically, and only that target survives sanitization</li>
                    <li>To remove a pasted component, use the toolbar's remove button (it lists the component levels at the caret) or select the whole component and delete. Boundary deletes never break a component apart</li>
                    <li>Cap tall fields with <code class="nds-inline-code lang-html">--editor-max-size</code>: past the cap the surface scrolls internally and the toolbar stays in reach</li>
                    <li>The whole component is <strong>beta</strong>: expect refinements while it hardens through real-project use</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Keyboard Interactions</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Keys</th><th>Action</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">Ctrl/Cmd + B / I / U</code></td><td>Bold, italic, underline</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">Enter</code></td><td>New paragraph. Inside a pasted component: a line break instead, so the component structure never splits</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">Backspace / Delete</code></td><td>Normal editing in text and inside component parts. At a component boundary the delete stops instead of merging content through it</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">Tab / Shift+Tab</code></td><td>In a list item: nest or un-nest the item. In source view: indent or outdent the line or selection</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">Escape, then Tab</code></td><td>In source view: release the tab trap and move focus out of the field</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">Ctrl/Cmd + Z / Y</code></td><td>Native undo and redo</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Toolbar Commands</h3>
                <p>Tokens for <code class="nds-inline-code lang-html">data-editor-toolbar</code>. Space-separated, <code class="nds-inline-code lang-html">|</code> starts a new button group, <code class="nds-inline-code lang-html">source</code> renders at the bar's end, <code class="nds-inline-code lang-html">none</code> opts out of the whole bar. Omit the attribute for the full default set.</p>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Token</th><th>Command</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">undo</code> / <code class="nds-inline-code lang-html">redo</code></td><td>Native history steps</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">bold</code> / <code class="nds-inline-code lang-html">italic</code> / <code class="nds-inline-code lang-html">underline</code> / <code class="nds-inline-code lang-html">strike</code></td><td>Inline formatting toggles</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">clear</code></td><td>Remove inline formatting from the selection</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">link</code></td><td>Link popover: link text, URL, an "Open in new tab" option, and unlink for existing links</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">h2</code> / <code class="nds-inline-code lang-html">h3</code> / <code class="nds-inline-code lang-html">h4</code></td><td>Heading toggles for the current block</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">h1</code></td><td>Available but not in the default set: add it only for full-page authoring fields</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">align-start</code> / <code class="nds-inline-code lang-html">align-center</code> / <code class="nds-inline-code lang-html">align-end</code> / <code class="nds-inline-code lang-html">align-justify</code></td><td>Logical block alignment that follows text direction</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">ul</code> / <code class="nds-inline-code lang-html">ol</code></td><td>Bulleted and numbered lists</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">remove</code></td><td>Destructive component removal with a confirm popover listing the component levels at the caret</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">source</code></td><td>HTML source view toggle, rendered at the end of the bar</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <p>Configuration rides the native textarea attributes: <code class="nds-inline-code lang-html">placeholder</code>, <code class="nds-inline-code lang-html">required</code>, <code class="nds-inline-code lang-html">readonly</code>, and <code class="nds-inline-code lang-html">disabled</code> all carry over to the editing surface. The editor adds one attribute of its own:</p>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-editor-toolbar</code></td><td>Set on the container to pick the toolbar commands. See the Toolbar Commands table for tokens and the grouping syntax</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-state</code></td><td>Managed on the container at runtime: <code class="nds-inline-code lang-html">readonly</code> and <code class="nds-inline-code lang-html">disabled</code> toggled through <code class="nds-inline-code lang-js">NDS.State</code>. Initial state comes from the textarea's native attributes</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--editor-min-size</code></td><td><code class="nds-inline-code lang-html">12rem</code></td><td>Minimum height of the editing surface and the source view</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--editor-max-size</code></td><td><code class="nds-inline-code lang-html">70vh</code></td><td>Height cap: past it the surface scrolls internally so the toolbar stays visible</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDS.Editor</strong> API adopts textarea fields and creates and destroys instances. The submitted value is always the textarea, so reading and listening work like any form field.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// ── Initialization ───────────────────────────────────
// Auto-initializes every .nds-editor on page load, adopting the field's textarea.
NDS.Editor.init();                    // scan for new editors (also NDS.Editor.reinit())
const inst = NDS.Editor.create(el);   // adopt one field; returns the instance, or null when no textarea is found
NDS.Editor.destroy(el);               // tear down: generated UI is removed, the plain textarea field remains
el.ndsEditor;                         // instance backref on the root element

// ── Ready event ──────────────────────────────────────
el.addEventListener('nds:editor:ready', (e) =&gt; {
    e.detail.instance;                // the editor instance
});

// ── Value access ─────────────────────────────────────
// The textarea IS the form field: sanitized, pretty-printed markup.
const value = textarea.value;
textarea.addEventListener('input', onEdit);    // fires on every edit
textarea.addEventListener('change', onCommit); // fires on blur when changed

// ── Runtime states ───────────────────────────────────
// Initial state comes from the textarea's readonly / disabled attributes.
NDS.State.add(el, 'readonly');        // or 'disabled'
NDS.State.remove(el, 'readonly');

</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
