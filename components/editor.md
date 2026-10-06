---
layout: page
title: Editor
hero_title: Editor - National Design System
hero_description: A rich text field that turns a textarea into an editing surface with a toolbar, and submits clean NDS markup
hero_tags:
  - label: Beta
    style: nds-yellow
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.4.0"
updated: "1.12.x"
last_edit: "06/10/2026 - 09:57 PM"
---

<section id="editorOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

The editor is a standard textarea field with one more class, `nds-editor`, on its container. When the page loads, the script adds a toolbar and an editing surface in front of the textarea. The textarea stays the form value: it holds the HTML that the user writes, and it submits with the form.

The editor is in beta. Its API and its markup can change before it is stable.

Pick another component when:

- the value is plain text: a textarea in [Forms](../components/forms)
- the value is one line: a text field in [Forms](../components/forms)
- the value is a list of words: [Tag Input](../components/taginput)

</div>
  </div>
</section>

<section id="editorMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="editor-field" data-canon data-variants="editorVariantsTable" data-harness="form" data-demo-width="100%">
<div class="nds-form-container nds-textarea nds-editor">
  <div class="nds-form-header">
    <label for="editor-content"><span class="nds-label">Content</span></label>
  </div>
  <div class="nds-form-control">
    <textarea class="nds-textarea" name="content" id="editor-content" placeholder="Write here"></textarea>
  </div>
</div>
</script>
<script type="text/html" id="editor-upload" data-canon>
<div class="nds-form-container nds-textarea nds-editor" data-editor-upload-url="/api/images" data-editor-upload-auto-upload="true" data-editor-upload-max-file-size="2097152" data-editor-upload-allowed-types="jpg,jpeg,png,gif,webp">
  <div class="nds-form-header">
    <label for="editor-article"><span class="nds-label">Article</span></label>
  </div>
  <div class="nds-form-control">
    <textarea class="nds-textarea" name="article" id="editor-article" placeholder="Write here"></textarea>
  </div>
</div>
</script>
<script type="text/html" id="editor-embed" data-canon>
<div class="nds-form-container nds-textarea nds-editor" data-editor-upload-url="embed">
  <div class="nds-form-header">
    <label for="editor-note"><span class="nds-label">Note</span></label>
  </div>
  <div class="nds-form-control">
    <textarea class="nds-textarea" name="note" id="editor-note" placeholder="Write here"></textarea>
  </div>
</div>
</script>
    </div>
  </div>
</section>

<section id="editorVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Every state row goes on the field's `<textarea>`. The editor reads it from there when it starts.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Standard (default) | — | — | Images from a URL only. Uploads nothing |
| Structure | Image upload (id: upload) | canon `#editor-upload` | — | The image button also takes a file, and sends it to your server. See Image Upload |
| Structure | Embedded images (id: embed) (hint: Uploaded files are saved inside the text, not on a server) | canon `#editor-embed` | — | The image button also takes a file, and puts it in the value as a `data:` URL. Only for a field with no upload server. See Embedded Images |
| Toolbar | Full (default) | — | — | Every command except `h1`. Use it for long articles and page content |
| Toolbar | Short (not: upload, embed) | `[data-editor-toolbar="bold italic underline \| link \| ul ol \| source"]` | `.nds-editor` | A short set for comments and notes. See Toolbar |
| Toolbar | None (not: upload, embed) | `[data-editor-toolbar="none"]` | `.nds-editor` | No toolbar. The keyboard shortcuts and paste still work |
| State (any) | Read-only | `[readonly]` | `textarea:not([disabled])` | The user can read and copy the text, and open the source view if the toolbar has it, but cannot change it. The value submits. Not with Disabled |
| State (any) | Disabled | `[disabled]` | `textarea:not([readonly])` | The field is off and its value does not submit. Not with Read-only |
| State (any) | Required (hint: Press Validate with the field empty) | `[required]` | `textarea` | The form needs text in the field. The forms script adds the required mark |
| Field states | Label, info, feedback, required | — | — | Shared by every form field. See [Forms](../components/forms) |
{: #editorVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="editorBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Toolbar
{: .nds-block-title}

`data-editor-toolbar` on `.nds-editor` picks the toolbar buttons. Write the command names with spaces between them, and `|` to start a new button group. Without the attribute, the toolbar has the full set. The command names are in the API.

### Pasted Components
{: .nds-block-title}

NDS component markup pasted or typed in the source view stays a styled component. It keeps its `nds-` classes, `data-status`, `data-state`, ARIA attributes and knobs such as `--card-width`. The user edits the text inside it, but cannot break it apart. Backspace and Delete work inside each part of it, and stop at the part's edge. A selection that covers the whole component deletes it. Enter adds a line break inside a card or an alert, and moves the caret out of a tag, a chip or a button. The Remove button (`remove`) lists the component at the caret and each one around it, and removes the one the user picks.

<script type="text/html" id="editor-components" data-canon data-code="none">
<div class="nds-form-container nds-textarea nds-editor">
  <div class="nds-form-header">
    <label for="editor-notice"><span class="nds-label">Service notice</span></label>
  </div>
  <div class="nds-form-control">
    <textarea class="nds-textarea" name="notice" id="editor-notice" placeholder="Write here">
<p>Service status: <span class="nds-tag nds-sm" data-status="success"><span class="nds-label">Active</span></span> checked daily.</p>
<div class="nds-alert nds-card" data-status="info" role="alert"><span class="nds-feedback nds-alert-icon nds-outline"><span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span></span><div class="nds-alert-content"><div class="nds-alert-text"><span class="nds-alert-title">Planned maintenance</span><p class="nds-alert-description">The service is closed on Friday from 1 AM to 4 AM.</p></div></div></div>
<p>Text before and after a component stays free to edit.</p>
    </textarea>
  </div>
</div>
</script>

### Images
{: .nds-block-title}

The image button inserts an image from a URL, with alt text, a width and a height. Pasted images keep a safe `src`, their alt text, and their width and height when these are numbers. A click on an image selects it. The image button then edits it, and the link button links it. By default the editor uploads nothing and embeds nothing: a pasted screenshot shows a message on the field.

### Image Upload
{: .nds-block-title}

`data-editor-upload-url` with your server's URL adds a file picker to the image popover. With `data-editor-upload-auto-upload="true"`, the picker sends each file to the server, the way [File Upload](../components/upload) does. It then inserts the URL that the server returns. A file that fails a check shows its message in the picker.

### Embedded Images
{: .nds-block-title}

`data-editor-upload-url="embed"` adds a file picker that sends nothing. The file goes in the value as a `data:` URL, and a pasted screenshot does too. A screenshot that fails a check shows its message on the field. Use it only for a field with no upload server: see Best Practices.


### Read-only and Disabled
{: .nds-block-title}

`readonly` on the textarea keeps the text selectable, and the source view still opens. The commands are off, and the value submits. `disabled` turns the whole field off, and its value does not submit. To change the state after load, call `NDS.State.add(el, 'disabled')` or `NDS.State.remove(el, 'disabled')`, where `el` is `.nds-editor`. The same goes for `'readonly'`. The editor updates the textarea to match.

</div>
  </div>
</section>

<section id="editorFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-plug-socket"></i>
            <span class="nds-label">Automatic Setup</span>
          </span>
          <p class="nds-item-desc">Every <code class="nds-inline-code lang-html">nds-editor</code> field starts when the page loads. The script makes the toolbar, the editing surface and the popovers, so you write only the textarea field.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-text-check"></i>
            <span class="nds-label">Form Integration</span>
          </span>
          <p class="nds-item-desc">The textarea holds the value as formatted HTML. Saved HTML written in the textarea shows formatted when the editor starts. Its label and placeholder become the editing surface's name and placeholder. It submits with the form, takes <code class="nds-inline-code lang-html">required</code>, and fires <code class="nds-inline-code lang-js">input</code> on each edit and <code class="nds-inline-code lang-js">change</code> when the user leaves a changed field.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-clipboard"></i>
            <span class="nds-label">Paste Conversion</span>
          </span>
          <p class="nds-item-desc">Text from Word and Google Docs keeps its lists, bold, italic and underline. A pasted table becomes an NDS table. HTML source pasted as text becomes formatted content.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-shield-01"></i>
            <span class="nds-label">Safe Value</span>
          </span>
          <p class="nds-item-desc">The editor cleans every paste and every source edit. It removes scripts, styles, event attributes and unsafe URLs such as <code class="nds-inline-code lang-html">javascript:</code>. A link that opens a new tab always gets <code class="nds-inline-code lang-html">rel="noopener noreferrer"</code>.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-link-01"></i>
            <span class="nds-label">Link Popover</span>
          </span>
          <p class="nds-item-desc">The link button opens a form for the text and the URL, with Open in new tab, Hide external badge and Colored link options. On a link, it also shows Unlink.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-source-code"></i>
            <span class="nds-label">HTML Source View</span>
          </span>
          <p class="nds-item-desc">The source button shows the formatted HTML for direct edits. The text that the user selected stays selected in the source.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-arrow-turn-backward"></i>
            <span class="nds-label">Undo History</span>
          </span>
          <p class="nds-item-desc">The editor keeps its own undo history, so undo also reverses a removed component and a popover edit.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-translation"></i>
            <span class="nds-label">Arabic and English Labels</span>
          </span>
          <p class="nds-item-desc">The toolbar labels, tooltips and popover text follow the page language.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-view-off"></i>
            <span class="nds-label">Loading Placeholder</span>
          </span>
          <p class="nds-item-desc">Until the script starts, the field shows a pulsing bar for the toolbar and a pulsing box for the text, at the editor's size.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="editorPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use the editor for text that a user writes for a page: announcements, articles, service descriptions.
- Give each field only the commands it needs. A comment field needs `bold italic | ul ol`, not the full set.
- Leave `h1` out unless the field writes a whole page. The page already has its `<h1>`.
- Read and write the value on the textarea, never on the editing surface.
- Do not use the editor to write code. The source view is for small markup fixes.
- Clean the value on your server too. The editor cleans what the user enters, but a request can skip it.
- Send image uploads to your server with `data-editor-upload-url`. Use `embed` only when there is no upload server: a `data:` URL makes the value about a third larger than the file, and the browser cannot cache it.
- Set `--editor-max-size` on a tall field. The text then scrolls inside the field, and the toolbar stays in view.
- For the label, info text, feedback and the required mark, see [Forms](../components/forms). They work the same on every field.

</div>
  </div>
</section>

<section id="editorApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-editor-toolbar` | `.nds-editor` | The toolbar commands, from the Toolbar Commands table. `none` removes the toolbar |
| `data-editor-upload-url` | `.nds-editor` | Adds a file picker to the image popover. Your server's URL, or `embed` to put the file in the value as a `data:` URL. The server returns `{ "url": "…" }` or the URL as text |
| `data-editor-upload-auto-upload` | `.nds-editor` | `true` sends the file as soon as the user picks it. Set it with a server URL. Ignored with `embed` |
| `data-editor-upload-max-file-size` | `.nds-editor` | The largest file in bytes. Default `2097152` (2 MB). With `embed`, it also limits a pasted screenshot |
| `data-editor-upload-allowed-types` | `.nds-editor` | The file extensions the picker takes. Default `jpg,jpeg,png,gif,webp,svg`. List `jpg` and `jpeg` both to take either |
| `data-editor-upload-allowed-mime-types` | `.nds-editor` | The MIME types the picker takes, such as `image/*`. A second check after the extension |
| `data-dropmenu-portal` | `.nds-editor` | Moves the link, image and remove popovers to `<body>` when they open, so a parent with `overflow: hidden` does not cut them off |
| `data-state~="readonly"` | `.nds-editor` | Set by the script at load when the textarea has `readonly`. Add or remove it with `NDS.State` after load. See Read-only and Disabled |
| `data-state~="disabled"` | `.nds-editor` | Set by the script at load when the textarea has `disabled`. Add or remove it with `NDS.State` after load. See Read-only and Disabled |
{: .nds-table .nds-responsive}

### Toolbar Commands
{: .nds-block-title}

| Command | Effect |
|---|---|
| `undo`, `redo` | Steps back or forward in the editor's history |
| `bold`, `italic`, `underline`, `strike` | Turns the format on or off for the selection |
| `clear` | Removes the formats from the selection |
| `link` | Opens the link popover |
| `image` | Opens the image popover. See Images |
| `h1`, `h2`, `h3`, `h4` | Turns the line into that heading, or back into a paragraph. `h1` is not in the full set |
| `align-left`, `align-center`, `align-right`, `align-justify` | Aligns the line. Left and right stay on that side in both languages. A second click removes the alignment |
| `dir-ltr`, `dir-rtl` | Sets the text direction of the line. A second click removes it, and the line follows the page again |
| `ul`, `ol` | Turns the line into a bulleted or a numbered list |
| `remove` | Removes a pasted component. It is on only while the caret is in one. See Pasted Components |
| `source` | Opens the HTML source view. It always sits at the end of the bar |
{: .nds-table .nds-responsive}

The full set is `undo redo | bold italic underline strike clear | link image | h2 h3 h4 | align-left align-center align-right align-justify | dir-ltr dir-rtl | ul ol | remove | source`.

### Keyboard
{: .nds-block-title}

| Key | Effect |
|---|---|
| Ctrl or Cmd + B, I, U | Bold, italic, underline |
| Ctrl or Cmd + Z | Undo |
| Ctrl or Cmd + Y, or Ctrl or Cmd + Shift + Z | Redo |
| Enter | Starts a new paragraph. See Pasted Components for Enter in a component |
| Tab, Shift + Tab | In a list item: nests the item, or moves it out one level. Elsewhere, Tab moves the focus out of the field |
| Tab, Shift + Tab in the source view | Indents or outdents the line or the selected lines |
| Escape, then Tab in the source view | Moves the focus out of the field |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set these on `.nds-editor`.

| Property | Default | Controls |
|---|---|---|
| `--editor-min-size` | `12rem` | Minimum height of the editing surface and the source view |
| `--editor-max-size` | `70vh` | Maximum height. Past it, the text scrolls inside the field |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Editor.init()` | Starts every `.nds-editor` on the page that has not started. `reinit()` does the same |
| `NDS.Editor.create(el)` | Starts one editor and returns it. Returns the running editor when `el` already has one, and `null` when the field has no textarea |
| `NDS.Editor.destroy(el)` | Removes the toolbar and the editing surface. The plain textarea field stays, with its value |
| `instance.setImageUpload(config)` | Sets the image popover's file picker from code. `config` takes the `data-editor-upload-*` options in camel case: `uploadUrl`, `autoUpload`, `maxFileSize`, `allowedTypes`, `allowedMimeTypes`. `null` or `false` removes an option. Returns the instance |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `nds:editor:ready` | `.nds-editor` (bubbles) | `{ instance }`. Fires when the editor has started |
{: .nds-table .nds-responsive}

The running editor is also `el.ndsEditor`. File Upload events, such as `nds:upload:error`, bubble from the image popover.

<script type="text/html" id="editor-js" data-canon data-lang="js">
document.addEventListener('nds:editor:ready', function (e) {
  e.detail.instance.setImageUpload({ maxFileSize: 5 * 1024 * 1024 });
});

var textarea = document.querySelector('#editor-content');
textarea.addEventListener('change', function () {
  console.log(textarea.value);
});
</script>

The full API is in the banner of `_js/nds-editor.js`.

</div>
  </div>
</section>
