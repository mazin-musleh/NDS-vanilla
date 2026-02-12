---
layout: page
title: File Upload
hero_title: File Upload Component - National Design System
hero_description: A comprehensive file upload component with drag-and-drop support, progress tracking, and validation
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- File Upload Component -->
<section id="fileUploadComponent" class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">File Upload</h2>
      <p class="nds-section-description">Upload files with drag-and-drop support, progress tracking, and comprehensive
        validation</p>
    </div>
    <div class="nds-section-content">
      <div class="nds-showcase">

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
                <div class="file-item-template" style="display: none;">
                  <div class="file-item">
                    <span class="nds-feedback" data-status="success">
                      <span class="nds-feedback-icon">
                        <i class="hgi hgi-stroke icon"></i>
                      </span>
                    </span>

                    <div class="nds-progress-circle nds-xs" style="display: none; --progress-value: 0;">
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <circle class="progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="3" />
                        <circle class="progress-bar" cx="12" cy="12" r="10" fill="none" stroke-width="3"
                          stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round" />
                      </svg>
                      <div class="progress-info">
                        <span class="progress-percentage">
                          <span class="progress-number"></span>
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
                </div>
              </div> <!-- /.nds-form-container -->
            </div> <!-- /.state-demo -->
          </div> <!-- /.demo-container -->

          <div class="nds-tabs nds-code nds-divided" hidden>
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
              </nav>
                <button class="nds-btn nds-subtle nds-tab showMore"><i
                    class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                </button>
            </div>
            <div class="nds-tab-content">
              <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-file-upload-1"
                aria-labelledby="tab-file-upload-1">
                <div class="nds-code-action">
                  <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                  </button>
                </div>
                <div class="nds-expandable-content">
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
                      <div class="file-item-template" style="display: none;">
                        <div class="file-item">
                          <span class="nds-feedback" data-status="success">
                            <span class="nds-feedback-icon">
                              <i class="hgi hgi-stroke icon"></i>
                            </span>
                          </span>

                          <div class="nds-progress-circle nds-xs" style="display: none; --progress-value: 0;">
                            <svg width="24" height="24" viewBox="0 0 24 24">
                              <circle class="progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="3" />
                              <circle class="progress-bar" cx="12" cy="12" r="10" fill="none" stroke-width="3"
                                stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round" />
                            </svg>
                            <div class="progress-info">
                              <span class="progress-percentage">
                                <span class="progress-number"></span>
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
                      </div>
                    </div>
                  </code>
                </div>
              </div>
              <div class="nds-tab-panel hidden" role="tabpanel" id="panel-file-upload-2"
                aria-labelledby="tab-file-upload-2">

                <h2>File Upload API Reference</h2>

                <p>The NDS File Upload component provides a comprehensive JavaScript API for programmatic file upload
                  management with drag-and-drop support, progress tracking, and validation.</p>

                <h3>Quick Start</h3>

                <div class="nds-code nds-expandable">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>
                  <div class="nds-expandable-content">
                    <code class="lang-javascript">
// Get controller instance
const uploadElement = document.querySelector('.nds-file-upload');
const fileUpload = uploadElement.ndsFileUpload;

// Add files and start upload
const fileId = fileUpload.addFile(file);
fileUpload.startUpload(fileId);
                      </code>
                  </div>
                </div>

                <h3>Configuration</h3>

                <p>Configure the component using HTML data attributes:</p>

                <div class="nds-code nds-expandable">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>
                  <div class="nds-expandable-content">
                    <code class="lang-html code">
                      <div class="nds-file-upload"
                      data-upload-url="/api/upload"
                      data-auto-upload="true"
                      data-max-files="5"
                      data-max-file-size="10485760"
                      data-accepted-types="image/*,.pdf,.docx"></div>
                    </code>
                  </div>
                </div>

                <p><strong>Configuration Options:</strong></p>
                <ul>
                  <li>data-upload-url: Server endpoint for file uploads</li>
                  <li>data-auto-upload: Upload files automatically on selection (true/false)</li>
                  <li>data-max-files: Maximum number of files allowed (default: 10)</li>
                  <li>data-max-file-size: Maximum file size in bytes (default: 5MB)</li>
                  <li>data-accepted-types: Accepted file types (MIME types or extensions)</li>
                </ul>

                <h3>Methods</h3>

                <h4>File Management</h4>

                <p><strong>addFile(file, options)</strong></p>
                <p>Adds a file to the upload queue.</p>
                <div class="nds-code nds-expandable">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>
                  <div class="nds-expandable-content">
                    <code class="lang-javascript">
const fileId = fileUpload.addFile(file, {
  status: 'ready',    // Initial status
  progress: 0,        // Initial progress (0-100)
  error: null         // Error message if status is 'error'
});
// Returns: string (unique file ID)
                      </code>
                  </div>
                </div>

                <p><strong>removeFile(fileId)</strong></p>
                <p>Removes a file from the upload queue.</p>
                <div class="nds-code nds-expandable">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>
                  <div class="nds-expandable-content">
                    <code class="lang-javascript">
const success = fileUpload.removeFile(fileId);
// Returns: boolean (true if file was removed)
                      </code>
                  </div>
                </div>

                <p><strong>clearAllFiles()</strong></p>
                <p>Removes all files from the upload queue.</p>
                <div class="nds-code nds-expandable">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>
                  <div class="nds-expandable-content">
                    <code class="lang-javascript">
fileUpload.clearAllFiles();
                      </code>
                  </div>
                </div>

                <h4>File Information</h4>

                <p><strong>getFile(fileId)</strong></p>
                <p>Get file data by ID.</p>
                <div class="nds-code nds-expandable">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>
                  <div class="nds-expandable-content">
                    <code class="lang-javascript">
const fileData = fileUpload.getFile(fileId);
// Returns: { file, id, status, progress, error, response }
                      </code>
                  </div>
                </div>

                <p><strong>getAllFiles()</strong></p>
                <p>Get all files in the upload queue.</p>
                <div class="nds-code nds-expandable">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>
                  <div class="nds-expandable-content">
                    <code class="lang-javascript">
const allFiles = fileUpload.getAllFiles();
// Returns: Array of file objects
                      </code>
                  </div>
                </div>

                <p><strong>getFilesByStatus(status)</strong></p>
                <p>Filter files by status.</p>
                <div class="nds-code nds-expandable">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>
                  <div class="nds-expandable-content">
                    <code class="lang-javascript">
const readyFiles = fileUpload.getFilesByStatus('ready');
const uploadingFiles = fileUpload.getFilesByStatus('uploading');
const completedFiles = fileUpload.getFilesByStatus('complete');
                      </code>
                  </div>
                </div>

                <h4>Status Management</h4>

                <p><strong>setFileStatus(fileId, status, options)</strong></p>
                <p>Update file status.</p>
                <div class="nds-code nds-expandable">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>
                  <div class="nds-expandable-content">
                    <code class="lang-javascript">
fileUpload.setFileStatus(fileId, 'error', {
    error: 'Upload failed',
    progress: 0
});
                      </code>
                  </div>
                </div>

                <p><strong>setFileProgress(fileId, progress)</strong></p>
                <p>Update upload progress (0-100).</p>
                <div class="nds-code nds-expandable">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>
                  <div class="nds-expandable-content">
                    <code class="lang-javascript">
fileUpload.setFileProgress(fileId, 75); // 75% complete
                      </code>
                  </div>
                </div>

                <h4>Upload Control</h4>

                <p><strong>startUpload(fileId)</strong></p>
                <p>Start upload for specific file or all ready files.</p>
                <div class="nds-code nds-expandable">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>
                  <div class="nds-expandable-content">
                    <code class="lang-javascript">
fileUpload.startUpload(fileId);  // Upload specific file
fileUpload.startUpload();        // Upload all ready files
                      </code>
                  </div>
                </div>

                <h3>Events</h3>

                <p>Listen for upload events:</p>

                <div class="nds-code nds-expandable">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>
                  <div class="nds-expandable-content">
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
                </div>

                <p><strong>Available Events:</strong></p>
                <ul>
                  <li>filesSelected: Fired when files are selected</li>
                  <li>uploadProgress: Upload progress update</li>
                  <li>uploadComplete: Upload completed successfully</li>
                  <li>uploadError: Upload failed or validation error</li>
                </ul>

                <h3>File Status Values</h3>

                <ul>
                  <li><strong>ready</strong>: File selected, ready for upload</li>
                  <li><strong>uploading</strong>: Upload in progress</li>
                  <li><strong>complete</strong>: Upload successful</li>
                  <li><strong>error</strong>: Upload failed</li>
                </ul>

                <h3>Example Usage</h3>

                <div class="nds-code nds-expandable">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                      <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                  </div>
                  <div class="nds-expandable-content">
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

        </div>

      </div>
    </div>
  </div>
</section>