---
layout: page
title: File Upload
hero_title: File Upload - National Design System
hero_description: Drag-and-drop file upload with built-in validation, progress tracking, and a full JavaScript API for custom upload workflows
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- File Upload -->
<section id="fileUploadComponent" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">File Upload</h2>
            <p class="nds-section-description">Two modes for collecting files: a drag-and-drop zone for prominent upload areas, or a compact browse button for inline forms</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">State</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-required", ".nds-form-container", "formState", "attr"]'>
                                            <span class="nds-label">Required</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["disabled", ".nds-form-container", "formState", "data-state"]'>
                                            <span class="nds-label">Disabled</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Drop Zone</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["single", ".nds-form-container", "uploadType", "data-state"], ["multiple", ".nds-file-input", "uploadType", "attr"]]'>
                                            <span class="nds-label">Single File</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["dropbox", ".nds-form-container", "uploadType", "data-state"]'>
                                            <span class="nds-label">Drop Zone</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-action-btn" data-action="populate-demo-files">
                                <span class="nds-label">Demo Files</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-form-container nds-file-upload" data-state="dropbox">
                                <div class="nds-form-header">
                                    <label for="fileUploadInput">
                                        <span class="nds-label">Upload files</span>
                                        <span class="nds-info">Maximum file size allowed is 2MB, supported file formats include .jpg, .png, and .pdf.</span>
                                    </label>
                                </div>

                                <div class="nds-form-control">
                                    <input type="file" id="fileUploadInput" multiple accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.txt" class="nds-file-input" />
                                    <div class="nds-upload-zone">
                                        <i class="hgi hgi-stroke hgi-file-upload nds-upload-icon"></i>
                                        <div class="nds-upload-text">
                                            <span class="nds-drop-hint">Drag and drop files here to upload</span>
                                        </div>
                                        <div class="nds-upload-hint">Maximum file size allowed is 2MB, supported file formats include .jpg, .png, and .pdf.</div>
                                    </div>

                                    <div class="nds-form-action">
                                        <button type="button" class="nds-btn nds-neutral nds-md nds-browse-btn">
                                            <i class="hgi hgi-stroke hgi-folder-01"></i>
                                            <span class="nds-label">Browse Files</span>
                                        </button>
                                    </div>
                                </div>

                                <div class="nds-file-list"></div>
                                <div class="nds-form-footer"></div>

                                <!-- Hidden template for file items -->
                                <div class="nds-file-item-template" style="display: none;">
                                    <div class="nds-file-item">
                                        <span class="nds-feedback">
                                            <span class="nds-feedback-icon">
                                                <i class="nds-icon" aria-hidden="true"></i>
                                            </span>
                                        </span>

                                        <div class="nds-progress-circle" style="--progress-size: 24px; --progress-value: 0;">
                                            <svg width="24" height="24" viewBox="0 0 24 24">
                                                <circle class="nds-progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="3" />
                                                <circle class="nds-progress-track" cx="12" cy="12" r="10" fill="none" stroke-width="3"
                                                    stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round" />
                                            </svg>
                                            <div class="nds-progress-info">
                                                <span class="nds-progress-percentage">
                                                    <span class="nds-progress-number"></span>
                                                </span>
                                            </div>
                                        </div>

                                        <div class="nds-file-info">
                                            <div class="nds-file-name nds-truncate"></div>
                                            <div class="nds-file-error">
                                                <span class="nds-error-message"></span>
                                            </div>
                                        </div>

                                        <div class="nds-file-actions">
                                            <button type="button" class="nds-btn nds-subtle nds-md nds-icon-only nds-remove-file" aria-label="Remove file">
                                                <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-upload-default-1" id="tab-upload-default-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-upload-default-1"
                                    aria-labelledby="tab-upload-default-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;div class="nds-form-container nds-file-upload" data-state="dropbox"&gt;
  &lt;div class="nds-form-header"&gt;
    &lt;label for="fileUploadInput"&gt;
      &lt;span class="nds-label"&gt;Upload files&lt;/span&gt;
      &lt;span class="nds-info"&gt;Maximum file size allowed is 2MB, supported file formats include .jpg, .png, and .pdf.&lt;/span&gt;
    &lt;/label&gt;
  &lt;/div&gt;

  &lt;div class="nds-form-control"&gt;
    &lt;input type="file" id="fileUploadInput" multiple accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.txt" class="nds-file-input" /&gt;
    &lt;div class="nds-upload-zone"&gt;
      &lt;i class="hgi hgi-stroke hgi-file-upload nds-upload-icon"&gt;&lt;/i&gt;
      &lt;div class="nds-upload-text"&gt;
        &lt;span class="nds-drop-hint"&gt;Drag and drop files here to upload&lt;/span&gt;
      &lt;/div&gt;
      &lt;div class="nds-upload-hint"&gt;Maximum file size allowed is 2MB, supported file formats include .jpg, .png, and .pdf.&lt;/div&gt;
    &lt;/div&gt;

    &lt;div class="nds-form-action"&gt;
      &lt;button type="button" class="nds-btn nds-neutral nds-md nds-browse-btn"&gt;
        &lt;i class="hgi hgi-stroke hgi-folder-01"&gt;&lt;/i&gt;
        &lt;span class="nds-label"&gt;Browse Files&lt;/span&gt;
      &lt;/button&gt;
    &lt;/div&gt;
  &lt;/div&gt;

  &lt;div class="nds-file-list"&gt;&lt;/div&gt;
  &lt;div class="nds-form-footer"&gt;&lt;/div&gt;

  &lt;!-- Hidden template for file items --&gt;
  &lt;div class="nds-file-item-template" style="display: none;"&gt;
    &lt;div class="nds-file-item"&gt;
      &lt;span class="nds-feedback"&gt;
        &lt;span class="nds-feedback-icon"&gt;
          &lt;i class="nds-icon" aria-hidden="true"&gt;&lt;/i&gt;
        &lt;/span&gt;
      &lt;/span&gt;

      &lt;div class="nds-progress-circle" style="--progress-size: 24px; --progress-value: 0;"&gt;
        &lt;svg width="24" height="24" viewBox="0 0 24 24"&gt;
          &lt;circle class="nds-progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="3" /&gt;
          &lt;circle class="nds-progress-track" cx="12" cy="12" r="10" fill="none" stroke-width="3"
            stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round" /&gt;
        &lt;/svg&gt;
        &lt;div class="nds-progress-info"&gt;
          &lt;span class="nds-progress-percentage"&gt;
            &lt;span class="nds-progress-number"&gt;&lt;/span&gt;
          &lt;/span&gt;
        &lt;/div&gt;
      &lt;/div&gt;

      &lt;div class="nds-file-info"&gt;
        &lt;div class="nds-file-name nds-truncate"&gt;&lt;/div&gt;
        &lt;div class="nds-file-error"&gt;
          &lt;span class="nds-error-message"&gt;&lt;/span&gt;
        &lt;/div&gt;
      &lt;/div&gt;

      &lt;div class="nds-file-actions"&gt;
        &lt;button type="button" class="nds-btn nds-subtle nds-sm nds-icon-only nds-remove-file" aria-label="Remove file"&gt;
          &lt;i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"&gt;&lt;/i&gt;
        &lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
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
<section id="uploadFeatures" class="nds-content-section nds-demo-section">
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
                    <p class="nds-item-desc">Activates when <code class="nds-inline-code lang-html">.nds-file-upload</code> is on the page. Dynamic elements added later are picked up automatically.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-drag-drop"></i>
                        <span class="nds-label">Drag and Drop</span>
                    </span>
                    <p class="nds-item-desc">Files can be dragged onto the drop zone with visual feedback on hover. Toggled on and off with <code class="nds-inline-code lang-html">data-state="dropbox"</code>.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-file-validation"></i>
                        <span class="nds-label">Client-side Validation</span>
                    </span>
                    <p class="nds-item-desc">Validates file size, extension, and MIME type before upload. Rejected files appear in the list with an error message in Arabic or English.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-shield-01"></i>
                        <span class="nds-label">Security</span>
                    </span>
                    <p class="nds-item-desc">File names are sanitized to strip path traversal sequences, null bytes, and control characters before display and upload.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="nds-icon nds-hgi-refresh" aria-hidden="true"></i>
                        <span class="nds-label">Upload Lifecycle</span>
                    </span>
                    <p class="nds-item-desc">Five status stages (ready, uploading, processing, complete, error) with progress tracking, retry for failures, and abort for in-progress uploads.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-api"></i>
                        <span class="nds-label">Programmatic Control</span>
                    </span>
                    <p class="nds-item-desc">Full JavaScript API to add, remove, upload, retry, and abort files. Intercept uploads via the cancelable <code class="nds-inline-code lang-js">beforeUpload</code> event to set custom headers.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="nds-icon nds-hgi-translation" aria-hidden="true"></i>
                        <span class="nds-label">Bilingual Messages</span>
                    </span>
                    <p class="nds-item-desc">Error and validation messages display in Arabic or English based on the page language setting.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-code"></i>
                        <span class="nds-label">Event-driven Integration</span>
                    </span>
                    <p class="nds-item-desc">Nine custom events cover the full upload lifecycle, letting you hook into file selection, progress updates, success, and error handling.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="uploadGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use the <strong>drop zone mode</strong> (<code class="nds-inline-code lang-html">data-state="dropbox"</code>) for dedicated upload areas where file selection is the primary action on the page</li>
                    <li>Use the <strong>browse button mode</strong> (no dropbox state) when file upload is one field among many in a form</li>
                    <li>Use <strong>single file mode</strong> (<code class="nds-inline-code lang-html">data-state="single"</code>) for profile photos, document replacements, or anywhere only one file is expected</li>
                    <li>Always set <code class="nds-inline-code lang-html">data-max-file-size</code> and <code class="nds-inline-code lang-html">data-allowed-types</code> to give users immediate validation feedback rather than waiting for server rejection</li>
                    <li>Set <code class="nds-inline-code lang-html">data-max-files</code> when the server has a file count limit. Excess files appear in the list with an error so users understand why they were rejected</li>
                    <li>Use the <code class="nds-inline-code lang-js">nds:upload:beforeUpload</code> event to add authorization headers, CSRF tokens, or extra form fields. The component does not handle authentication.</li>
                    <li>Do not use this component for large file transfers (500MB+) that need chunked upload or resumable protocols. Build a custom solution with the events API as a starting point</li>
                    <li>Server-side validation must duplicate all client-side checks. Client validation improves UX but cannot be trusted for security</li>
                    <li>Combine <code class="nds-inline-code lang-html">data-allowed-types</code> (extension) with <code class="nds-inline-code lang-html">data-allowed-mime-types</code> for defense in depth: extensions can be spoofed, MIME types add a second check</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead>
                        <tr><th>Attribute</th><th>Description</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-state="dropbox"</code></td><td>Enables the drag-and-drop zone UI with dashed border and upload icon</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-state="single"</code></td><td>Single file mode: new selection replaces the current file</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-upload-url</code></td><td>Server endpoint for XHR file uploads (POST)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-auto-upload="true"</code></td><td>Automatically upload files on selection instead of waiting for <code class="nds-inline-code lang-js">startUpload()</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-max-file-size</code></td><td>Maximum file size in bytes. Default: 10485760 (10 MB)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-max-files</code></td><td>Maximum number of files allowed. Default: unlimited</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-allowed-types</code></td><td>Comma-separated file extensions: <code class="nds-inline-code lang-html">jpg,png,pdf</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-allowed-mime-types</code></td><td>Comma-separated MIME types, supports wildcards: <code class="nds-inline-code lang-html">image/*,application/pdf</code></td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Events</h3>
                <table class="nds-table nds-responsive">
                    <thead>
                        <tr><th>Event</th><th>Detail</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-js">nds:upload:ready</code></td><td><code class="nds-inline-code lang-js">{ instance }</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-js">nds:upload:selected</code></td><td><code class="nds-inline-code lang-js">{ files, allFiles, fileData }</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-js">nds:upload:validationError</code></td><td><code class="nds-inline-code lang-js">{ errors }</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-js">nds:upload:beforeUpload</code> (cancelable)</td><td><code class="nds-inline-code lang-js">{ fileData, formData, xhr }</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-js">nds:upload:progress</code></td><td><code class="nds-inline-code lang-js">{ fileData, progress }</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-js">nds:upload:success</code></td><td><code class="nds-inline-code lang-js">{ fileData, response }</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-js">nds:upload:error</code></td><td><code class="nds-inline-code lang-js">{ fileData, error, status }</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-js">nds:upload:removed</code></td><td><code class="nds-inline-code lang-js">{ fileData, fileId }</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-js">nds:upload:maxFilesReached</code></td><td><code class="nds-inline-code lang-js">{ maxFiles, currentCount }</code></td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDS.Upload</strong> API provides static methods to access instances and instance methods to manage files, trigger uploads, and control the component state.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// ── Static methods ──────────────────────────────────
NDS.Upload.init();                             // Initialize all .nds-file-upload on page
NDS.Upload.reinit();                           // Re-scan DOM after dynamic changes
NDS.Upload.create(element);                    // Manually create instance on element
NDS.Upload.getInstance('.nds-file-upload');     // Get instance by selector or element
NDS.Upload.whenReady('.nds-file-upload', fn);  // Call fn(instance) when ready

// ── File management ─────────────────────────────────
const upload = NDS.Upload.getInstance('.nds-file-upload');

const fileId = upload.addFile(file, {   // Add file to queue
    status: 'ready',                    // 'ready' | 'uploading' | 'processing' | 'complete' | 'error'
    progress: 0,                        // 0-100
    error: null                         // Error message string
});                                     // Returns fileId or null if max files reached

upload.removeFile(fileId);              // Remove file, abort if uploading
upload.clearAllFiles();                 // Remove all files, abort all uploads
upload.getFile(fileId);                 // Returns { file, id, status, progress, error }
upload.getAllFiles();                    // Returns array of all file objects
upload.getFilesByStatus('error');       // Filter by status

// ── Upload control ──────────────────────────────────
upload.startUpload(fileId);             // Upload specific file
upload.startUpload();                   // Upload all 'ready' files
upload.retry(fileId);                   // Reset error file and re-upload
upload.abort(fileId);                   // Cancel in-progress upload

// ── Status and progress ─────────────────────────────
upload.setFileStatus(fileId, 'error', { error: 'Server rejected file' });
upload.setFileProgress(fileId, 75);     // Auto-transitions to 'processing' at 100%

// ── Component control ───────────────────────────────
upload.setDisabled(true);               // Disable input, drag-and-drop, and buttons
upload.refreshUI();                     // Force full UI rebuild
upload.getConfig();                     // Returns frozen copy of current config
upload.destroy();                       // Remove listeners, abort uploads, clean DOM

// ── Intercept uploads for custom headers ────────────
const el = document.querySelector('.nds-file-upload');
el.addEventListener('nds:upload:beforeUpload', (e) =&gt; {
    e.detail.xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    e.detail.formData.append('folder', 'documents');
    // e.preventDefault() cancels the upload
});
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
