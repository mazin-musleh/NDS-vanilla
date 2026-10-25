/* NDS.Upload — public surface
 * Rides: nds-tooltip (the full file name on hover; soft)
 * Requires:
 *   .nds-upload needs input[type="file"] — the upload is not built
 *   .nds-upload needs .nds-form-control — the upload is not built
 *   .nds-upload needs .nds-file-list — the upload is not built
 * Methods:
 *   NDS.Upload.init() / .reinit()                scan + initialize .nds-upload
 *   NDS.Upload.create(el, options)               instance one uploader; options override the
 *                                                data-* config, and merge into a started one.
 *                                                Selector string accepted
 *   NDS.Upload.validate(el, opts)  its check → {valid, message, count, pending}; opts {showMessage}
 *   NDS.Upload.getInstance(el)                   the existing instance, or null
 *   NDS.Upload.destroy(el)                       undo create() before you discard the uploader
 *   NDS.Upload.whenReady(el, cb)                 run cb with the instance, now or on ready
 *   instance.addFile(file, options)              stage a File — returns its id, null when full.
 *                                                options {validate, status, progress, error}
 *   instance.removeFile(id) / .clearAllFiles()   drop one / all (aborts any upload in flight)
 *   instance.getFile(id) / .getAllFiles()        {file, id, status, progress, error, response}
 *   instance.getFilesByStatus(status)            same shape, filtered
 *   instance.startUpload(id)                     upload one, or every 'ready' file with no id
 *   instance.retry(id) / .abort(id)              re-send an errored file / cancel a live one
 *   instance.setFileStatus(id, status, options)  drive a row yourself (options {progress, error});
 *                                                a move to 'complete' or 'error' fires success or error
 *   instance.setFileProgress(id, percent)        drive the progress ring yourself
 *   instance.validateFile(file)                  [] when it passes, [messages] when it fails —
 *                                                checks without staging anything
 *   instance.getConfig()                         the resolved, frozen config
 *   instance.enable() / .disable() / .refresh() / .destroy()
 *   instance.container                           the .nds-upload root, read-only
 * Events (bubble from the .nds-upload container):
 *   nds:upload:ready             detail {instance}
 *   nds:upload:select            detail {files, allFiles, fileData} — files that passed checks
 *   nds:upload:invalid           detail {errors:[{file, errors, fileData}]}
 *   nds:upload:max-files         detail {maxFiles, currentCount}
 *   nds:upload:start             detail {fileData, formData, xhr} — CANCELABLE. Set headers on
 *                                detail.xhr, or preventDefault() to send it yourself
 *   nds:upload:progress          detail {fileData, progress}
 *   nds:upload:success           detail {fileData, response}
 *   nds:upload:error             detail {fileData, error, status, response}
 *   nds:upload:removed           detail {fileData, fileId} — every way a file leaves: remove,
 *                                clear, form reset, Single replacing it
 * Hooks:
 *   data-upload-url · data-auto-upload · data-field-name (default 'file') · data-upload-timeout (seconds)
 *   data-max-file-size (bytes) · data-max-files
 *   data-allowed-types (extensions) · data-allowed-mime-types (image/* accepted)
 *   data-file-id (stamped on each rendered row and its remove button)
 * Gotchas:
 *   - Options passed to create() WIN over the data-* attributes.
 *   - data-allowed-types is mirrored onto the file input's `accept` — never hand-author it.
 *   - Status flow is ready → uploading → processing → complete, or error. retry() only
 *     accepts a file at 'error' after a failed upload, never one the checks rejected.
 *   - XHR, not NDS.request: only xhr.upload reports progress. data-upload-timeout ends an
 *     upload as an error after that many seconds; without it (the default, 0) a dead
 *     connection leaves a file at 'uploading' and retry() refuses it — call abort(id).
 *   - With no upload URL the component only stages files (it warns once).
 *   - A row is cloned from .nds-file-item-template when you ship one; otherwise from the
 *     component's own canonical markup.
 */
// NDS File Upload Component
// File: nds-upload.js

(function () {
    'use strict';

    // ==============================================
    // UTILITY FUNCTIONS
    // ==============================================

    // Intl names the unit in the page's language.
    function formatFileSize(bytes) {
        const i = bytes > 0 ? Math.min(3, Math.floor(Math.log(bytes) / Math.log(1024))) : 0;
        return NDS.formatNumber(bytes / Math.pow(1024, i),
            { style: 'unit', unit: ['byte', 'kilobyte', 'megabyte', 'gigabyte'][i], unitDisplay: 'short', maximumFractionDigits: 2 });
    }

    function sanitizeFileName(name) {
        if (!name) return 'unnamed';
        return name
            .replace(/\.\.\//g, '')       // path traversal
            .replace(/\.\.\\/g, '')       // path traversal (windows)
            .replace(/[\x00-\x1f]/g, '')  // control characters
            .replace(/^\.+/, '')          // leading dots
            .slice(0, 255);               // truncate
    }

    // English defaults; the assets/i18n/{lang}.json pack overrides them.
    const strings = NDS.i18n.getStrings('upload', {
        size_exceeds: 'File size exceeds {size}',
        type_not_allowed: 'File type not allowed',
        type_not_allowed_ext: 'File type not allowed (.{ext})',
        max_files: 'Maximum number of files reached ({n})',
        network_error: 'Network error',
        timed_out: 'Upload timed out',
        cancelled: 'Upload cancelled',
        failed: 'Upload failed',
        remove_file: 'Remove file',
        file_required: 'Please add a file',
        upload_pending: 'Please wait for the upload to finish',
    });

    function warn(message) {
        console.warn('NDS Upload: ' + message);
    }

    // Canonical file-item markup (mirrors components/upload.md). Cloned when a
    // consumer omits the hidden .nds-file-item-template, so a bare
    // .nds-upload still renders file rows. A supplied template still wins.
    const DEFAULT_FILE_ITEM_HTML =
        '<div class="nds-file-item">' +
            '<span class="nds-feedback">' +
                '<span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>' +
            '</span>' +
            '<div class="nds-progress-circle">' +
                '<svg width="24" height="24" viewBox="0 0 24 24">' +
                    '<circle class="nds-progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="3" />' +
                    '<circle class="nds-progress-track" cx="12" cy="12" r="10" fill="none" stroke-width="3" ' +
                        'stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round" />' +
                '</svg>' +
                '<div class="nds-progress-info">' +
                    '<span class="nds-progress-percentage"><span class="nds-progress-number"></span></span>' +
                '</div>' +
            '</div>' +
            '<div class="nds-file-info">' +
                '<div class="nds-file-name nds-truncate"></div>' +
                '<div class="nds-file-size"></div>' +
                '<div class="nds-file-error"><span class="nds-error-message"></span></div>' +
            '</div>' +
            '<div class="nds-file-actions">' +
                '<button type="button" class="nds-btn nds-subtle nds-sm nds-icon-only nds-remove-file">' +
                    '<i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>' +
                '</button>' +
            '</div>' +
        '</div>';

    // ==============================================
    // CLASS: NdsUpload
    // ==============================================

    class NdsUpload {
        constructor(container, options = {}) {
            if (!container || container.hasAttribute('data-nds-upload-initialized')) return;
            if (container.closest('code')) return;

            this.container = container;
            this._options = this._normalizeOptions(options);
            this._files = [];

            // Cache DOM references
            this._fileInput = container.querySelector('input[type="file"]');
            this._dropZone = container.querySelector('.nds-form-control');
            this._fileList = container.querySelector('.nds-file-list');
            this._uploadZone = container.querySelector('.nds-upload-zone');
            this._browseButton = container.querySelector('.nds-browse-btn');

            if (!this._fileInput || !this._dropZone || !this._fileList) return;

            this._syncAccept();

            this.abortController = new AbortController();
            const { signal } = this.abortController;

            this._fileInput.addEventListener('change', this._handleFileInput.bind(this), { signal });
            this._fileList.addEventListener('click', this._handleFileListClick.bind(this), { signal });
            // A native reset never touches the list: clear it with the form.
            NDS.field.onReset(container.closest('form'), () => this.clearAllFiles(), { signal });
            const openPicker = this._openPicker.bind(this);
            if (this._browseButton) this._browseButton.addEventListener('click', openPicker, { signal });

            // Drag and drop: wired once, gated per event, so dropbox/disabled can flip at any time.
            this._dropZone.addEventListener('dragover', this._handleDragOver.bind(this), { signal });
            this._dropZone.addEventListener('dragleave', this._handleDragLeave.bind(this), { signal });
            this._dropZone.addEventListener('drop', this._handleDrop.bind(this), { signal });
            if (this._uploadZone) {
                this._uploadZone.addEventListener('click', (e) => { if (this._dropActive()) openPicker(e); }, { signal });
            }

            // Mark initialized and store instance
            container.setAttribute('data-nds-upload-initialized', '');
            container.ndsUpload = this;
            this._initialized = true;

            // Dispatch ready event
            this._dispatchEvent('nds:upload:ready', { instance: this });
        }

        // ==============================================
        // CONFIGURATION
        // ==============================================

        _readConfig() {
            const dataset = this.container.dataset;
            const attributeConfig = {
                uploadUrl: dataset.uploadUrl || null,
                autoUpload: dataset.autoUpload === 'true',
                maxFileSize: parseInt(dataset.maxFileSize) || 10 * 1024 * 1024,
                allowedTypes: dataset.allowedTypes ? dataset.allowedTypes.split(',').map(type => type.trim().toLowerCase()) : null,
                allowedMimeTypes: dataset.allowedMimeTypes ? dataset.allowedMimeTypes.split(',').map(type => type.trim().toLowerCase()) : null,
                maxFiles: parseInt(dataset.maxFiles) || Infinity,
                fieldName: dataset.fieldName || 'file',
                uploadTimeout: parseFloat(dataset.uploadTimeout) || 0
            };
            // JS options (passed to NDS.Upload.create / the constructor) override the
            // declarative data-* attributes; _options only holds keys the caller set.
            return { ...attributeConfig, ...this._options };
        }

        // Normalize a JS options object into the _readConfig shape, keeping only the
        // keys the caller actually provided so they override attrs rather than blank
        // them. allowedTypes / allowedMimeTypes accept an array or a comma string.
        _normalizeOptions(options) {
            if (!options || typeof options !== 'object') return {};
            const toList = (value) => (Array.isArray(value) ? value : String(value).split(','))
                .map(token => token.trim().toLowerCase()).filter(Boolean);
            const out = {};
            if (options.uploadUrl != null) out.uploadUrl = options.uploadUrl;
            if (options.autoUpload != null) out.autoUpload = options.autoUpload === true || options.autoUpload === 'true';
            if (options.maxFileSize != null) out.maxFileSize = parseInt(options.maxFileSize, 10);
            if (options.maxFiles != null) out.maxFiles = options.maxFiles === Infinity ? Infinity : parseInt(options.maxFiles, 10);
            if (options.allowedTypes != null) out.allowedTypes = toList(options.allowedTypes);
            if (options.allowedMimeTypes != null) out.allowedMimeTypes = toList(options.allowedMimeTypes);
            if (options.fieldName != null) out.fieldName = String(options.fieldName);
            if (options.uploadTimeout != null) out.uploadTimeout = parseFloat(options.uploadTimeout) || 0;
            return out;
        }

        getConfig() {
            return Object.freeze({ ...this._readConfig() });
        }

        // create() on a started field merges its options here, so they never go missing.
        _setOptions(options) {
            Object.assign(this._options, this._normalizeOptions(options));
            this._syncAccept();
        }

        // data-allowed-types is the source of truth for the picker filter: mirror it onto
        // the input's accept so authors never hand-write it and it can't drift.
        _syncAccept() {
            const { allowedTypes } = this._readConfig();
            if (allowedTypes) this._fileInput.setAttribute('accept', allowedTypes.map(type => '.' + type).join(','));
        }

        // Public: run size/extension/MIME checks against the live config
        // WITHOUT staging the file. Returns [] on pass, [messages] on fail.
        // Consumers (e.g. rich text editors) need paste parity without adding
        // a file chip.
        validateFile(file) {
            return this._validateFile(file, this._readConfig());
        }

        // ==============================================
        // FILE MANAGEMENT
        // ==============================================

        addFile(file, options = {}) {
            const config = this._readConfig();
            const isSingle = NDS.state.has(this.container, 'single');
            if (!isSingle && this._files.length >= config.maxFiles) {
                this._dispatchEvent('nds:upload:max-files', {
                    maxFiles: config.maxFiles,
                    currentCount: this._files.length
                });
                return null;
            }

            // Opt-in: run the same size/type/MIME checks dragged/selected files get.
            const fileData = this._buildEntry(file, options.validate ? this._validateFile(file, config) : [], options);
            this._setFiles(isSingle ? [fileData] : this._files.concat(fileData));
            return fileData.id;
        }

        removeFile(fileId) {
            if (!this._files.some(entry => entry.id === fileId)) return false;
            this._setFiles(this._files.filter(entry => entry.id !== fileId));
            return true;
        }

        clearAllFiles() {
            this._setFiles([]);
        }

        getFile(fileId) {
            const found = this._files.find(entry => entry.id === fileId);
            return found ? this._toPublic(found) : null;
        }

        getAllFiles() {
            return this._files.map(entry => this._toPublic(entry));
        }

        getFilesByStatus(status) {
            return this._files.filter(entry => entry.status === status).map(entry => this._toPublic(entry));
        }

        // One shape for every staged file. A file the checks failed is _rejected and never uploads.
        _buildEntry(file, errors, extra = {}) {
            return {
                file: file,
                id: NDS.getUniqueId('file-'),
                status: errors.length ? 'error' : (extra.status || 'ready'),
                progress: extra.progress || 0,
                error: errors.length ? errors.join(', ') : (extra.error || null),
                response: null,
                _rejected: errors.length > 0,
                _xhr: null
            };
        }

        // Every way a file leaves the list (remove, clear, reset, Single replacing it)
        // stops its upload and fires removed, so a page that tracks server copies stays in step.
        _setFiles(files) {
            const dropped = this._files.filter(entry => !files.includes(entry));
            dropped.forEach(entry => { if (entry._xhr) entry._xhr.abort(); });
            this._files = files;
            this._syncFileList();
            dropped.forEach(entry => this._dispatchEvent('nds:upload:removed', { fileData: this._toPublic(entry), fileId: entry.id }));
        }

        _toPublic(entry) {
            return { file: entry.file, id: entry.id, status: entry.status, progress: entry.progress, error: entry.error, response: entry.response };
        }

        // ==============================================
        // UPLOAD CONTROL
        // ==============================================

        startUpload(fileId) {
            if (fileId) {
                const fileData = this._files.find(entry => entry.id === fileId);
                if (fileData && fileData.status === 'ready') this._uploadFile(fileData);
            } else {
                this._files.filter(entry => entry.status === 'ready').forEach(entry => this._uploadFile(entry));
            }
        }

        retry(fileId) {
            const fileData = this._files.find(entry => entry.id === fileId);
            // A file the checks rejected stays rejected: re-sending it would skip them.
            if (!fileData || fileData.status !== 'error' || fileData._rejected) return false;
            fileData.status = 'ready';
            fileData.progress = 0;
            fileData.error = null;
            fileData.response = null;
            fileData._xhr = null;
            this._syncFileItem(fileId);
            this._uploadFile(fileData);
            return true;
        }

        abort(fileId) {
            const fileData = this._files.find(entry => entry.id === fileId);
            if (!fileData || !fileData._xhr) return false;
            fileData._xhr.abort();
            fileData._xhr = null;
            fileData.status = 'error';
            fileData.error = strings.text('cancelled');
            this._syncFileItem(fileId);
            return true;
        }

        // ==============================================
        // STATUS / PROGRESS
        // ==============================================

        setFileStatus(fileId, status, options = {}) {
            const file = this._files.find(entry => entry.id === fileId);
            if (!file) return false;
            const changed = file.status !== status;
            file.status = status;
            if (options.progress !== undefined) file.progress = options.progress;
            if (options.error) file.error = options.error;
            this._syncFileItem(fileId);
            // An upload your code sends ends as the built-in one does: the field's check reruns on these events, after the row.
            if (changed && status === 'complete') {
                this._dispatchEvent('nds:upload:success', { fileData: this._toPublic(file), response: file.response });
            } else if (changed && status === 'error') {
                this._dispatchEvent('nds:upload:error', { fileData: this._toPublic(file), error: file.error });
            }
            return true;
        }

        setFileProgress(fileId, progress) {
            const file = this._files.find(entry => entry.id === fileId);
            if (!file) return false;

            file.progress = progress;

            if (progress >= 100 && file.status === 'uploading') {
                file.status = 'processing';
            } else if (file.status !== 'uploading' && file.status !== 'processing') {
                file.status = 'uploading';
            }

            // Efficient: update progress in-place without full rebuild
            const fileItem = this._fileList.querySelector(`[data-file-id="${fileId}"]`);
            if (fileItem) {
                this._setProgress(fileItem, progress);
                // Full update only on status transition to processing
                if (progress >= 100) {
                    this._syncFileItem(fileId);
                }
            }
            return true;
        }

        // ==============================================
        // COMPONENT CONTROL
        // ==============================================

        // Forms disables the input and buttons on the token; the drop handlers read it per event.
        enable() {
            NDS.state.remove(this.container, 'disabled');
        }

        disable() {
            NDS.state.add(this.container, 'disabled');
        }

        refresh() {
            this._syncFileList();
        }

        // Tooltips first: one open on a row holds document listeners its removal would strand.
        _clearList() {
            this._fileList.querySelectorAll('.nds-tooltip').forEach(el => el.ndsTooltip?.destroy());
            this._fileList.innerHTML = '';
        }

        destroy() {
            this.abortController?.abort();
            NDS.state.remove(this._dropZone, 'drag-over');

            // Abort in-progress uploads
            this._files.forEach(entry => { if (entry._xhr) entry._xhr.abort(); });

            // Clean DOM
            this._clearList();
            this.container.removeAttribute('data-nds-upload-initialized');
            delete this.container.ndsUpload;
        }

        // ==============================================
        // INTERNAL: Validation
        // ==============================================

        _validateFile(file, config) {
            const errors = [];

            // Size check
            if (file.size > config.maxFileSize) {
                errors.push(strings.text('size_exceeds', { size: formatFileSize(config.maxFileSize) }));
            }

            // Extension check
            if (config.allowedTypes) {
                const extension = file.name.split('.').pop().toLowerCase();
                if (!config.allowedTypes.includes(extension)) {
                    errors.push(strings.text('type_not_allowed_ext', { ext: extension }));
                }
            }

            // MIME type check
            if (config.allowedMimeTypes && file.type) {
                const mime = file.type.toLowerCase();
                const allowed = config.allowedMimeTypes.some(type => {
                    if (type.endsWith('/*')) return mime.startsWith(type.slice(0, -1));
                    return mime === type;
                });
                if (!allowed) {
                    errors.push(strings.text('type_not_allowed'));
                }
            }

            return errors;
        }

        // ==============================================
        // INTERNAL: File handling
        // ==============================================

        _handleFiles(files) {
            const config = this._readConfig();
            const fileArray = Array.from(files);
            const validFiles = [];
            const validationErrors = [];
            const isSingle = NDS.state.has(this.container, 'single');

            // Max files check
            const remaining = isSingle ? 1 : config.maxFiles - this._files.length;
            const filesToProcess = isSingle ? fileArray.slice(0, 1) : fileArray.slice(0, Math.max(0, remaining));
            const excessFiles = isSingle ? [] : fileArray.slice(Math.max(0, remaining));

            filesToProcess.forEach(file => {
                const errors = this._validateFile(file, config);
                const fileData = this._buildEntry(file, errors);
                if (errors.length === 0) {
                    validFiles.push(fileData);
                } else {
                    validationErrors.push({ file: file, errors: errors, fileData: fileData });
                }
            });

            // Collect all rejected files (validation errors + excess)
            const rejectedFiles = validationErrors.map(e => e.fileData)
                .concat(excessFiles.map(file => this._buildEntry(file, [strings.text('max_files', { n: config.maxFiles })])));

            if (excessFiles.length > 0) {
                this._dispatchEvent('nds:upload:max-files', {
                    maxFiles: config.maxFiles,
                    currentCount: this._files.length + validFiles.length
                });
            }

            this._setFiles(isSingle ? validFiles.concat(rejectedFiles).slice(0, 1) : this._files.concat(validFiles, rejectedFiles));

            // Dispatch events
            if (validFiles.length > 0) {
                this._dispatchEvent('nds:upload:select', {
                    files: validFiles.map(entry => entry.file),
                    allFiles: this._files.map(entry => entry.file),
                    fileData: validFiles.map(entry => this._toPublic(entry))
                });

                if (config.autoUpload && config.uploadUrl) {
                    validFiles.forEach(entry => this._uploadFile(entry, config));
                }
            }

            if (validationErrors.length > 0) {
                this._dispatchEvent('nds:upload:invalid', {
                    errors: validationErrors.map(e => ({
                        file: e.file,
                        errors: e.errors,
                        fileData: this._toPublic(e.fileData)
                    }))
                });
            }
        }

        _uploadFile(fileData, config) {
            if (!config) config = this._readConfig();
            const index = this._files.findIndex(entry => entry.id === fileData.id);
            if (index === -1) return;

            if (!config.uploadUrl) {
                // Warn once per instance so a startUpload() over many files doesn't spam.
                if (!this._warnedNoUrl) {
                    warn('no upload URL configured (set data-upload-url or the uploadUrl option) — cannot upload');
                    this._warnedNoUrl = true;
                }
                return;
            }

            const formData = new FormData();
            formData.append(config.fieldName, fileData.file, sanitizeFileName(fileData.file.name));

            const xhr = new XMLHttpRequest();
            // Open first: setRequestHeader() throws on an unopened request.
            xhr.open('POST', config.uploadUrl);

            // Dispatch nds:upload:start (cancelable, exposes xhr for custom headers)
            const allowed = this._dispatchEvent('nds:upload:start', {
                fileData: this._toPublic(fileData),
                formData: formData,
                xhr: xhr
            }, true);

            if (!allowed) return;

            // Update status
            fileData.status = 'uploading';
            fileData._xhr = xhr;
            this._syncFileItem(fileData.id);

            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable) {
                    const progress = (e.loaded / e.total) * 100;
                    fileData.progress = progress;

                    // Every byte sent: the server works on it now.
                    if (progress >= 100 && fileData.status === 'uploading') {
                        fileData.status = 'processing';
                        this._syncFileItem(fileData.id);
                    }
                    const fileItem = this._fileList.querySelector(`[data-file-id="${fileData.id}"]`);
                    if (fileItem) this._setProgress(fileItem, progress);

                    this._dispatchEvent('nds:upload:progress', {
                        fileData: this._toPublic(fileData),
                        progress: progress
                    });
                }
            });

            xhr.addEventListener('load', () => {
                fileData._xhr = null;
                fileData.response = xhr.response;
                if (xhr.status >= 200 && xhr.status < 300) {
                    fileData.status = 'complete';
                    this._dispatchEvent('nds:upload:success', {
                        fileData: this._toPublic(fileData),
                        response: xhr.response
                    });
                } else {
                    fileData.status = 'error';
                    // Chip message: server's JSON {error} convention, else
                    // statusText (empty over HTTP/2), else localized generic.
                    let serverMessage = '';
                    try { serverMessage = JSON.parse(xhr.response)?.error || ''; } catch { /* non-JSON body */ }
                    fileData.error = serverMessage || xhr.statusText || strings.text('failed');
                    this._dispatchEvent('nds:upload:error', {
                        fileData: this._toPublic(fileData),
                        error: fileData.error,
                        status: xhr.status,
                        response: xhr.response
                    });
                }
                this._syncFileItem(fileData.id);
            });

            // No HTTP answer: a network failure, or the opt-in time limit ran out.
            const fail = (key) => {
                fileData._xhr = null;
                fileData.status = 'error';
                fileData.error = strings.text(key);
                this._dispatchEvent('nds:upload:error', {
                    fileData: this._toPublic(fileData),
                    error: fileData.error
                });
                this._syncFileItem(fileData.id);
            };
            xhr.addEventListener('error', () => fail('network_error'));
            xhr.addEventListener('timeout', () => fail('timed_out'));

            xhr.timeout = config.uploadTimeout * 1000;
            xhr.send(formData);
        }

        // ==============================================
        // INTERNAL: DOM / UI
        // ==============================================

        _syncFileList() {
            this._clearList();
            this._files.forEach(fileData => this._fileList.appendChild(this._buildFileItem(fileData)));
        }

        // Returns the .nds-file-item node to clone for a row. A consumer-supplied
        // .nds-file-item-template wins; otherwise the built-in canonical markup is
        // parsed once (cached per instance) so a bare .nds-upload still renders.
        _getFileItemSource() {
            const template = this.container.querySelector('.nds-file-item-template');
            if (template) return template.querySelector('.nds-file-item');

            if (!this._fallbackTemplate) {
                this._fallbackTemplate = document.createElement('template');
                this._fallbackTemplate.innerHTML = DEFAULT_FILE_ITEM_HTML;
            }
            return this._fallbackTemplate.content.querySelector('.nds-file-item');
        }

        _buildFileItem(fileData) {
            const source = this._getFileItemSource();
            if (!source) return document.createElement('div');

            const fileItem = source.cloneNode(true);
            fileItem.dataset.fileId = fileData.id;

            // Populate content
            const fileName = fileItem.querySelector('.nds-file-name');
            const removeBtn = fileItem.querySelector('.nds-remove-file');
            if (removeBtn && !removeBtn.hasAttribute('aria-label')) strings.set(removeBtn, 'aria-label', 'remove_file');
            const errorMessage = fileItem.querySelector('.nds-error-message');

            if (fileName) {
                // The base truncates and the extension stays; a hover tooltip shows the whole name.
                const name = sanitizeFileName(fileData.file.name);
                const dot = name.lastIndexOf('.');
                const base = document.createElement('span');
                base.className = 'nds-file-base';
                base.textContent = dot > 0 ? name.slice(0, dot) : name;
                fileName.replaceChildren(base);
                if (dot > 0) {
                    const extensionElement = document.createElement('span');
                    extensionElement.className = 'nds-file-ext';
                    extensionElement.textContent = name.slice(dot);
                    fileName.append(extensionElement);
                }
                // title is the tooltip's message source; plain browser title without NDS.Tooltip.
                fileName.title = name;
                fileName.classList.add('nds-tooltip');
                fileName.setAttribute('data-tooltip-hover', '500');
                NDS.Tooltip.create(fileName);
            }
            // A saved file added as new File([], name) has no size to show.
            const fileSize = fileItem.querySelector('.nds-file-size');
            if (fileSize && fileData.file.size) fileSize.textContent = formatFileSize(fileData.file.size);
            if (removeBtn) removeBtn.setAttribute('data-file-id', fileData.id);
            if (errorMessage && fileData.error) errorMessage.textContent = fileData.error;

            // Apply state and status via data attributes (CSS handles visibility)
            this._syncFileItemState(fileItem, fileData);

            // Set progress if applicable
            if ((fileData.status === 'uploading' || fileData.status === 'processing') && fileData.progress > 0) {
                this._setProgress(fileItem, fileData.progress);
            }

            return fileItem;
        }

        _syncFileItem(fileId) {
            const fileData = this._files.find(entry => entry.id === fileId);
            const fileItem = this._fileList.querySelector(`[data-file-id="${fileId}"]`);
            if (!fileData || !fileItem) {
                // If no element exists yet, do a full list rebuild
                if (fileData) this._syncFileList();
                return;
            }

            // Update text content
            const errorMessage = fileItem.querySelector('.nds-error-message');
            if (errorMessage) errorMessage.textContent = fileData.error || '';

            // Update state/status attributes
            this._syncFileItemState(fileItem, fileData);

            // Update progress
            if (fileData.status === 'uploading' || fileData.status === 'processing') {
                this._setProgress(fileItem, fileData.progress);
            }
        }

        _syncFileItemState(fileItem, fileData) {
            const status = fileData.status;

            // Clear all transient states
            NDS.state.remove(fileItem, 'uploading', 'processing');
            NDS.status.clear(fileItem);

            // Clear progress circle status
            const progressCircle = fileItem.querySelector('.nds-progress-circle');
            if (progressCircle) NDS.status.clear(progressCircle);

            // Clear feedback status
            const feedback = fileItem.querySelector('.nds-feedback');
            if (feedback) NDS.status.clear(feedback);

            switch (status) {
                case 'uploading':
                    NDS.state.add(fileItem, 'uploading');
                    break;
                case 'processing':
                    NDS.state.add(fileItem, 'processing');
                    break;
                case 'complete':
                    NDS.status.set(fileItem, 'success');
                    if (feedback) NDS.status.set(feedback, 'success');
                    break;
                case 'error':
                    NDS.status.set(fileItem, 'error');
                    if (feedback) NDS.status.set(feedback, 'error');
                    break;
                // 'ready' - no state/status needed, CSS defaults apply
            }
        }

        _setProgress(fileItem, value) {
            const el = fileItem.querySelector('.nds-progress-circle');
            if (el) el.style.setProperty('--progress-value', value);
        }

        // ==============================================
        // INTERNAL: Event handlers
        // ==============================================

        _handleFileInput(e) {
            if (e.target.files.length > 0) {
                this._handleFiles(e.target.files);
            }
            e.target.value = '';
        }

        _handleFileListClick(e) {
            const removeBtn = e.target.closest('.nds-remove-file');
            if (!removeBtn) return;

            e.preventDefault();
            e.stopPropagation();
            this.removeFile(removeBtn.getAttribute('data-file-id'));
        }

        _openPicker(e) {
            e.preventDefault();
            e.stopPropagation();
            this._fileInput.click();
        }

        // The drop zone works only with the dropbox token, its zone markup, and not disabled.
        _dropActive() {
            return !!this._uploadZone && NDS.state.has(this.container, 'dropbox') && !NDS.state.has(this.container, 'disabled');
        }

        _handleDragOver(e) {
            if (!this._dropActive()) return;
            e.preventDefault();
            NDS.state.add(this._dropZone, 'drag-over');
        }

        _handleDragLeave(e) {
            if (!this._dropZone.contains(e.relatedTarget)) {
                NDS.state.remove(this._dropZone, 'drag-over');
            }
        }

        _handleDrop(e) {
            NDS.state.remove(this._dropZone, 'drag-over');
            if (!this._dropActive()) return;
            e.preventDefault();
            if (e.dataTransfer.files.length > 0) {
                this._handleFiles(e.dataTransfer.files);
            }
        }

        // ==============================================
        // INTERNAL: Event dispatching
        // ==============================================

        _dispatchEvent(name, detail, cancelable = false) {
            const event = new CustomEvent(name, {
                bubbles: true,
                cancelable: cancelable,
                detail: detail
            });
            return this.container.dispatchEvent(event);
        }
    }

    // ==============================================
    // AUTO-INITIALIZATION
    // ==============================================

    function setupUploads() {
        document.querySelectorAll('.nds-upload').forEach(el => {
            if (el.closest('code')) return;
            if (el.hasAttribute('data-nds-upload-initialized')) return;
            new NdsUpload(el);
        });
    }

    // ==============================================
    // GLOBAL API: NDS.Upload
    // ==============================================

    // The field's check: NDS.validation runs it at submit, validate(el) is its public face.
    // The file input is emptied after each pick: required counts the staged rows, a rejected one not counted.
    // A row still uploading blocks every upload field: the submit would go without that file.
    const checkField = (up) => {
        const count = up.querySelectorAll('.nds-file-list .nds-file-item:not([data-status="error"])').length;
        const pending = !!up.querySelector('.nds-file-list .nds-file-item:is([data-state~="uploading"], [data-state~="processing"])');
        const valid = !pending && (!NDS.validation.isRequired(up) || count > 0);
        return { valid, message: valid ? '' : strings.text(pending ? 'upload_pending' : 'file_required'),
            empty: !pending && count === 0, count, pending };
    };
    NDS.validation.addRule('.nds-upload',
        (up) => Object.assign(checkField(up), { focus: up.querySelector('.nds-browse-btn') || up.querySelector('input[type="file"]') }),
        { owns: (el) => el.classList.contains('nds-upload'), on: ['nds:upload:select', 'nds:upload:success', 'nds:upload:error', 'nds:upload:removed'] });

    NDS.Upload = {
        init: setupUploads,
        reinit: setupUploads,
        validate: (el, opts) => NDS.Form.validateField(el.closest('.nds-upload') || el, checkField, opts),
        create: (container, options) => {
            container = NDS.resolveElement(container);
            if (!container) { warn('create: container not found'); return null; }
            if (container.ndsUpload) {                              // already built → merge, return it
                if (options) container.ndsUpload._setOptions(options);
                return container.ndsUpload;
            }
            const instance = new NdsUpload(container, options);
            return instance._initialized ? instance : null;       // null if the constructor bailed
        },
        destroy: (container) => NDS.resolveElement(container)?.ndsUpload?.destroy(),

        getInstance: (container) => {
            return NDS.resolveElement(container)?.ndsUpload || null;
        },

        whenReady: (container, callback) => {
            container = NDS.resolveElement(container);
            if (!container) return;

            if (container.ndsUpload) {
                callback(container.ndsUpload);
                return;
            }

            container.addEventListener('nds:upload:ready', (e) => {
                callback(e.detail.instance);
            }, { once: true });
        }
    };

    // Self-register for dynamic elements
    NDS.onDomAdd('.nds-upload', function (nodes) {
        nodes.forEach(el => {
            if (!el.hasAttribute('data-nds-upload-initialized')) {
                new NdsUpload(el);
            }
        });
    });

    // Paired teardown so a removed upload instance detaches its listeners,
    // aborts in-flight XHRs and clears the
    // init marker — without which a re-added node would short-circuit re-init
    // behind the stale marker.
    NDS.onDomRemove('.nds-upload', function (nodes) {
        nodes.forEach(el => {
            if (el.ndsUpload) el.ndsUpload.destroy();
        });
    });

})();
