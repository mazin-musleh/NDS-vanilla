---
layout: page
title: File Upload
hero_title: File Upload - National Design System
hero_description: A file upload lets the user pick or drop files, checks each one, and sends them to your server or with a form
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "09/10/2026 - 02:24 PM"
---

<section id="uploadOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A file upload is a form field for files. The user picks files with a Browse button, or drops them on a drop zone. The script checks each file and lists it in a row with its name, its size, its status and a remove button. The files then go to your server one by one, or with the rest of the form.

Pick another component when:

- the image goes inside formatted text: [Editor](../components/editor), which has its own image upload

</div>
  </div>
</section>

<section id="uploadMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="upload-field" data-canon data-variants="uploadVariantsTable" data-harness="form" data-demo-width="400px">
<div class="nds-form-container nds-file-upload" data-state="dropbox" data-max-file-size="2097152" data-allowed-types="jpg,jpeg,png,pdf">
  <div class="nds-form-header">
    <label for="upload-files">
      <span class="nds-label">Supporting documents</span>
      <span class="nds-info">Up to 2 MB each, in JPG, PNG or PDF</span>
    </label>
  </div>
  <div class="nds-form-control">
    <input type="file" id="upload-files" multiple class="nds-file-input">
    <div class="nds-upload-zone">
      <i class="hgi hgi-stroke hgi-file-upload nds-upload-icon" aria-hidden="true"></i>
      <div class="nds-upload-text">
        <span class="nds-drop-hint">Drag and drop files here to upload</span>
      </div>
      <div class="nds-upload-hint">Up to 2 MB each, in JPG, PNG or PDF</div>
    </div>
    <div class="nds-form-action">
      <button type="button" class="nds-btn nds-neutral nds-md nds-browse-btn">
        <i class="hgi hgi-stroke hgi-folder-01" aria-hidden="true"></i>
        <span class="nds-label">Browse Files</span>
      </button>
    </div>
  </div>
  <div class="nds-file-list" aria-live="polite"></div>
</div>
</script>
    </div>
  </div>
</section>

<section id="uploadVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Button mode removes `.nds-upload-zone` and the `dropbox` token. Single adds the `single` token and removes `multiple` from the file input. Write both changes.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Mode | Drop zone (default) | `[data-state~="dropbox"]` | `.nds-file-upload` | A large dashed area that takes dropped files. Use it when the upload is the main task of the page. See Drop Zone |
| Mode | Button | `remove` | `.nds-upload-zone` | A Browse button only. Use it when the upload is one field in a longer form |
| Files | Many (default) | `[multiple]` | `.nds-file-input` | The user can add many files |
| Files | Single | `[data-state~="single"]` | `.nds-file-upload` | The list holds one file, and a new file replaces it. See Single File |
| State (any) | Disabled | `[data-state~="disabled"]` | `.nds-file-upload` | The user cannot add or remove files. See Disabled |
| State (any) | Required (hint: Press Validate with no file) | `[data-required]` | `.nds-file-upload` | The form needs at least one file that passed the checks. See File Checks |
| Max files | Max files | `[data-max-files="3"]` | `.nds-file-upload:not([data-state~="single"])` | The list takes 3 files at most. Not with Single. See File Checks |
| Field states | Label, info, feedback, required | — | — | Shared by every form field. See [Forms](../components/forms) |
{: #uploadVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="uploadBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Drop Zone
{: .nds-block-title}

The token `dropbox` in `data-state` on `.nds-file-upload` turns the field into a dashed drop zone. The zone shows `.nds-upload-zone` in place of the label: an icon, the drop text and the hint. A click on the zone opens the file picker, and a file dragged over it colors the zone in the success color. Without `dropbox`, the zone is hidden and the field takes no dropped files. You can add or remove the token after the page loads.

### Single File
{: .nds-block-title}

The token `single` in `data-state` on `.nds-file-upload` keeps one file in the list. A new pick or drop replaces it and stops its upload. When the user picks several files, only the first is kept. Remove `multiple` from the file input, so the picker lets the user choose one file. `data-max-files` does nothing with `single`.

### File Checks
{: .nds-block-title}

The script checks each file when the user adds it. `data-max-file-size` sets the largest size in bytes, and the default is 10 MB. `data-allowed-types` lists the file extensions, and `data-allowed-mime-types` lists the MIME types, such as `image/png`. A file that fails shows in the list with the reason, in Arabic or English. It is never uploaded, and `retry()` refuses it.

`data-max-files` sets how many files the list holds. The files past the limit show in the list with an error too. `data-required` on `.nds-file-upload` makes the form need at least one file that passed the checks. The error clears when the user adds a file. A form reset empties the list.

### Send with the Form
{: .nds-block-title}

With no `data-upload-url`, the files stay in the field until the form is sent. This fits small attachments that go in one request with the other fields. The script empties the file input after each pick, so a native form submit sends no files. Add `data-ajax` to the form, so Forms stops the native submit. Then, at `nds:formValid`, add the files from `getAllFiles()` to the form data and send it yourself. The JavaScript example below does this.

### Upload as You Go
{: .nds-block-title}

`data-upload-url` on `.nds-file-upload` makes the script send each file to that address in its own POST request. The file goes in the field that `data-field-name` names, and the default is `file`. This fits large files, where the user needs the progress and a retry for each file. With `data-auto-upload="true"`, each file goes as soon as it passes the checks. Without it, call `startUpload()`. On a failure, the row shows the `error` text of a JSON response, then the HTTP status text, then a general message. The server's reply goes in the file's `response`, so the form can send what the server returned, such as an id.

The script sends no login or CSRF header. Set them on the `xhr` of `nds:upload:beforeUpload`, and add extra fields to its `formData`. To send the file yourself, cancel that event.

While a file uploads, the form does not submit, whether the field is required or not. `data-upload-timeout` sets a time limit in seconds for each upload. When it runs out, the file goes to `error` with the message "Upload timed out", and `retry()` can send it again. Without it, a dead connection leaves the file uploading until your code calls `abort()`.

### File Rows
{: .nds-block-title}

Each file gets a row. A file the user just added is `ready`. During an upload, the row shows a progress ring. When every byte is sent, the row goes to `processing` and pulses until the server answers. Then it shows a check mark when the upload is `complete`, or a cross and the reason on an `error`. Pick a file in the demo to see a full upload.

<script type="text/html" id="upload-rows" data-canon data-code="none" data-demo-width="400px">
<div class="nds-form-container nds-file-upload" id="upload-rows-demo" data-upload-url="/demo/upload" data-auto-upload="true">
  <div class="nds-form-header">
    <label for="upload-rows-input">
      <span class="nds-label">Attachments</span>
    </label>
  </div>
  <div class="nds-form-control">
    <input type="file" id="upload-rows-input" multiple class="nds-file-input">
    <div class="nds-form-action">
      <button type="button" class="nds-btn nds-neutral nds-md nds-browse-btn">
        <i class="hgi hgi-stroke hgi-folder-01" aria-hidden="true"></i>
        <span class="nds-label">Browse Files</span>
      </button>
    </div>
  </div>
  <div class="nds-file-list" aria-live="polite"></div>
</div>
</script>
<script>
// A fake server for this demo only: each upload runs to 100%, then processes for a moment.
document.addEventListener('nds:upload:ready', function (e) {
  if (e.target.id !== 'upload-rows-demo') return;
  var up = e.detail.instance;
  e.target.addEventListener('nds:upload:beforeUpload', function (ev) {
    ev.preventDefault();
    ev.stopPropagation();
    var id = ev.detail.fileData.id, progress = 0;
    up.setFileStatus(id, 'uploading', { progress: 0 });
    var timer = setInterval(function () {
      progress += 10;
      if (!up.setFileProgress(id, progress)) return clearInterval(timer);
      if (progress < 100) return;
      clearInterval(timer);
      setTimeout(function () { up.setFileStatus(id, 'complete'); }, 1500);
    }, 300);
  });
  var file = function (name) { return new File(['x'], name); };
  up.addFile(file('national-id.pdf'));
  up.addFile(file('salary-certificate.pdf'), { status: 'complete' });
  up.addFile(file('bank-statement.pdf'), { status: 'error', error: 'File size exceeds 2 MB' });
  up.startUpload(up.addFile(file('lease-contract.pdf')));
});
</script>

The script draws each row from the built-in row. To customize the row, put a hidden `.nds-file-item-template` inside `.nds-file-upload`: the script copies its `.nds-file-item` for each file. Keep the class names of the parts, because the script fills and shows them by class. This template is the built-in row:

<script type="text/html" id="upload-row-template" data-canon data-preview="none">
<div class="nds-file-item-template" hidden>
  <div class="nds-file-item">
    <span class="nds-feedback">
      <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
    </span>
    <div class="nds-progress-circle">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <circle class="nds-progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="3" />
        <circle class="nds-progress-track" cx="12" cy="12" r="10" fill="none" stroke-width="3" stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round" />
      </svg>
      <div class="nds-progress-info">
        <span class="nds-progress-percentage"><span class="nds-progress-number"></span></span>
      </div>
    </div>
    <div class="nds-file-info">
      <div class="nds-file-name nds-truncate"></div>
      <div class="nds-file-size"></div>
      <div class="nds-file-error"><span class="nds-error-message"></span></div>
    </div>
    <div class="nds-file-actions">
      <button type="button" class="nds-btn nds-subtle nds-sm nds-icon-only nds-remove-file" aria-label="Remove file">
        <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</div>
</script>

### Saved Files
{: .nds-block-title}

To show the files the server already holds, such as in an edit form, add each one as a complete file: `instance.addFile(new File([], 'lease-contract.pdf'), { status: 'complete' })`. The row shows the name and a check mark, with no size, since the file is empty, and the script never uploads it. To delete the server copy when the user removes the row, listen for `nds:upload:removed`.

### Disabled
{: .nds-block-title}

The token `disabled` in `data-state` on `.nds-file-upload` stops the user from adding or removing files. Forms disables the file input and the buttons, and the drop zone ignores clicks and dropped files. `setDisabled(true)` and `setDisabled(false)` add and remove the token.

</div>
  </div>
</section>

<section id="uploadFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-plug-socket"></i>
            <span class="nds-label">Auto-initialization</span>
          </span>
          <p class="nds-item-desc">Every <code class="nds-inline-code lang-html">.nds-file-upload</code> starts on load, and so does one added to the page later. A field removed from the page stops its uploads and its listeners.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-shield-01"></i>
            <span class="nds-label">Security</span>
          </span>
          <p class="nds-item-desc">The script removes path parts, control characters and leading dots from each file name before it shows or sends it. It cuts the name to 255 characters.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-api"></i>
            <span class="nds-label">Programmatic Control</span>
          </span>
          <p class="nds-item-desc">Methods add, remove, upload, retry and stop files. Your code can also set a file's status and progress, for an upload it sends itself.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-translation"></i>
            <span class="nds-label">Bilingual Messages</span>
          </span>
          <p class="nds-item-desc">The check and upload errors show in Arabic or English, from the page language.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-code"></i>
            <span class="nds-label">Event-driven Integration</span>
          </span>
          <p class="nds-item-desc">Nine events report each step: the field started, a file added, a file rejected, the list full, an upload started, its progress, its success or error, and a file removed.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="uploadPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Set `data-max-file-size` and `data-allowed-types`, and state the same limits in the info and hint text. The user then sees why a file fails before any upload.
- Check every file again on the server. A user can get past the checks in the browser.
- Add `data-allowed-mime-types` too. A renamed file passes the extension check, but not the type check.
- Do not write `accept` on the file input. The script writes it from `data-allowed-types`.
- Keep the Browse button in the drop zone. The zone takes no keyboard focus, so keyboard users need the button.
- Keep `aria-live="polite"` on `.nds-file-list`, so a screen reader announces each new row and its error.
- Do not use the upload for files that need a resumable or a chunked upload. It sends each file in one request.
- For the label, info text, feedback and the required mark, see [Forms](../components/forms). They work the same on every field.

</div>
  </div>
</section>

<section id="uploadApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-state~="dropbox"` | `.nds-file-upload` | Set it yourself. Turns on the drop zone. See Drop Zone |
| `data-state~="single"` | `.nds-file-upload` | Set it yourself. The list holds one file. See Single File |
| `data-state~="disabled"` | `.nds-file-upload` | Set it yourself, or call `setDisabled()`. See Disabled |
| `data-required` | `.nds-file-upload` | The form needs at least one file that passed the checks |
| `data-max-file-size` | `.nds-file-upload` | The largest file, in bytes. The default is `10485760` (10 MB) |
| `data-allowed-types` | `.nds-file-upload` | The allowed extensions, with commas and no dots: `jpg,png,pdf`. The script writes the matching `accept` on the file input when it starts |
| `data-allowed-mime-types` | `.nds-file-upload` | The allowed file types, with commas: `image/*,application/pdf`. `image/*` takes every image type. A file whose type the browser does not report passes this check |
| `data-max-files` | `.nds-file-upload` | How many files the list holds. The default is no limit. Ignored with `single` |
| `data-upload-url` | `.nds-file-upload` | The address each file is sent to, one POST request per file. See Upload as You Go |
| `data-field-name` | `.nds-file-upload` | The name of the form field that holds the file in each upload request. The default is `file` |
| `data-upload-timeout` | `.nds-file-upload` | The time limit for each upload, in seconds. The default is `0`, no limit. See Upload as You Go |
| `data-auto-upload="true"` | `.nds-file-upload` | Sends each file as soon as it passes the checks. Needs `data-upload-url` |
| `data-state~="drag-over"` | `.nds-form-control` | The script sets it while a file is dragged over the drop zone. It removes it when the file leaves, on the drop, and on `destroy()` |
| `accept` | `.nds-file-input` | The script writes it from `data-allowed-types`. Do not write it yourself |
| `data-file-id` | `.nds-file-item` | The script writes the file's id when it draws the row. The row's `.nds-remove-file` gets the same id |
| `data-state~="uploading"`, `data-state~="processing"` | `.nds-file-item` | The script sets the token that matches the file's status, and removes it when the status changes. Both show the progress ring |
| `data-status="success"`, `data-status="error"` | `.nds-file-item` and its `.nds-feedback` | The script sets `success` when the file is complete and `error` when it fails. It removes it when the status changes. `error` also shows the reason |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

| Property | Default | Controls |
|---|---|---|
| `--progress-size` | `24px` | The size of the progress ring in a row. Set it on `.nds-file-upload` |
{: .nds-table .nds-responsive}

### Tokens
{: .nds-block-title}

Set a token at `:root`, or on a wrapper to reach every upload inside it. Give a token with a Dark mode value a dark override too: see [Tokens](../components/tokens). The active drop zone background shows while a file is dragged over it.

Source: the `upload` group in `_sass/tokens/_components.scss`.

{{ site.data.tokens.components.upload.html }}

### JavaScript
{: .nds-block-title}

A file is an object `{ file, id, status, progress, error, response }`. `file` is the browser's `File`, and `status` is `ready`, `uploading`, `processing`, `complete` or `error`. `response` is the server's reply once an upload ends, and `null` before.

| Method | Effect |
|---|---|
| `NDS.Upload.init()` | Starts every `.nds-file-upload` that has not started. The loader calls it on load |
| `NDS.Upload.reinit()` | The same as `init()` |
| `NDS.Upload.create(el, options)` | Starts one field and returns its instance. `el` is the element or a selector. On a field that has started, it adds `options` to it and returns the same instance. It returns `null` when the field has no file input, `.nds-form-control` or `.nds-file-list` |
| `NDS.Upload.getInstance(el)` | Returns the instance of the field, or `null` |
| `NDS.Upload.whenReady(el, callback)` | Calls `callback(instance)` now, or when the field starts |
| `instance.addFile(file, options)` | Adds a `File` to the list and returns its id, or `null` when the list is full. Options: `validate` (`true` runs the checks, default `false`), `status` (default `ready`), `progress` (default `0`) and `error` |
| `instance.removeFile(id)` | Removes one file and stops its upload |
| `instance.clearAllFiles()` | Removes every file and stops every upload |
| `instance.getFile(id)`, `instance.getAllFiles()` | Returns one file, or an array of every file |
| `instance.getFilesByStatus(status)` | Returns an array of the files at that status |
| `instance.startUpload(id)` | Uploads one `ready` file. With no id, it uploads every `ready` file |
| `instance.retry(id)` | Sends a file again after its upload failed. It returns `false` for a file the checks rejected |
| `instance.abort(id)` | Stops an upload. The file goes to `error`, with the message "Upload cancelled" |
| `instance.setFileStatus(id, status, options)` | Sets the status of a file. Options: `progress` and `error` |
| `instance.setFileProgress(id, percent)` | Sets the progress ring. At `100`, an uploading file goes to `processing` |
| `instance.validateFile(file)` | Runs the checks on a `File` without adding it. Returns `[]` when it passes, or an array of messages |
| `instance.getConfig()` | Returns the settings in use, from the attributes and the `create()` options, as a frozen object |
| `instance.setDisabled(disabled)` | `true` disables the field, and `false` enables it |
| `instance.refreshUI()` | Draws every row again |
| `instance.destroy()` | Removes the listeners, stops the uploads and empties the list |
{: .nds-table .nds-responsive}

The `create()` options override the attributes of the same name.

| Option | Default | Effect |
|---|---|---|
| `uploadUrl` | `data-upload-url` | The address each file is sent to |
| `autoUpload` | `data-auto-upload` | `true` sends each file as soon as it passes the checks |
| `maxFileSize` | `data-max-file-size` | The largest file, in bytes |
| `maxFiles` | `data-max-files` | How many files the list holds |
| `allowedTypes` | `data-allowed-types` | An array of extensions, or a string with commas |
| `allowedMimeTypes` | `data-allowed-mime-types` | An array of file types, or a string with commas |
| `fieldName` | `data-field-name` | The name of the form field that holds the file |
| `uploadTimeout` | `data-upload-timeout` | The time limit for each upload, in seconds |
{: .nds-table .nds-responsive}

Every event fires on `.nds-file-upload` and bubbles.

| Event | Fires when | Detail |
|---|---|---|
| `nds:upload:ready` | the field starts | `{ instance }` |
| `nds:upload:selected` | the user adds files that pass the checks | `{ files, allFiles, fileData }`: the new `File`s, every `File` in the list, and the new files |
| `nds:upload:validationError` | the user adds files that fail the checks | `{ errors }`: an array of `{ file, errors, fileData }` |
| `nds:upload:maxFilesReached` | a file does not fit in the list | `{ maxFiles, currentCount }` |
| `nds:upload:beforeUpload` | before each upload. Cancelable | `{ fileData, formData, xhr }`. Set headers on `xhr`, add fields to `formData`, or call `preventDefault()` and send the file yourself |
| `nds:upload:progress` | during an upload | `{ fileData, progress }` |
| `nds:upload:success` | the server answers with a 2xx status | `{ fileData, response }` |
| `nds:upload:error` | the upload fails | `{ fileData, error, status, response }`. A network error or a timeout has no `status` and no `response` |
| `nds:upload:removed` | a file leaves the list: `removeFile()`, `clearAllFiles()`, a form reset, or a new file in Single | `{ fileData, fileId }` |
{: .nds-table .nds-responsive}

<script type="text/html" id="upload-js" data-canon data-lang="js">
// Send the files with the form, in one request. The form carries data-ajax.
var form = document.querySelector('#request-form');
form.addEventListener('nds:formValid', function () {
  var data = new FormData(form);
  NDS.Upload.getInstance('#request-form .nds-file-upload').getAllFiles().forEach(function (f) {
    data.append('attachments[]', f.file);
  });
  fetch(form.action, { method: 'POST', body: data });
});

// Or upload each file on its own. The field carries data-upload-url and data-auto-upload="true".
var accessToken = 'your-access-token';
document.querySelector('#documents-upload').addEventListener('nds:upload:beforeUpload', function (e) {
  e.detail.xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
});
</script>

The full API is in the banner of `_js/nds-upload.js`.

</div>
  </div>
</section>

<section id="uploadRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Contact Us Template](../templates/contact-us-template): an optional upload in Button mode. The page marks each file complete when the user adds it, because the field has no upload address.
- [Editor](../components/editor): the image form holds a Single upload with no drop zone.

</div>
  </div>
</section>
