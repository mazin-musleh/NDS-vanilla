/* NDS.Upload — public surface
 * Rides: nds-tooltip (the full file name on hover; soft)
 * Methods:
 *   NDS.Upload.init() / .reinit()                scan + initialize .nds-file-upload
 *   NDS.Upload.create(el, options)               instance one uploader; options override the
 *                                                data-* config, and merge into a started one.
 *                                                Selector string accepted
 *   NDS.Upload.getInstance(el)                   the existing instance, or null
 *   NDS.Upload.whenReady(el, cb)                 run cb with the instance, now or on ready
 *   instance.addFile(file, options)              stage a File — returns its id, null when full.
 *                                                options {validate, status, progress, error}
 *   instance.removeFile(id) / .clearAllFiles()   drop one / all (aborts any upload in flight)
 *   instance.getFile(id) / .getAllFiles()        {file, id, status, progress, error, response}
 *   instance.getFilesByStatus(status)            same shape, filtered
 *   instance.startUpload(id)                     upload one, or every 'ready' file with no id
 *   instance.retry(id) / .abort(id)              re-send an errored file / cancel a live one
 *   instance.setFileStatus(id, status, options)  drive a row yourself (options {progress, error})
 *   instance.setFileProgress(id, percent)        drive the progress ring yourself
 *   instance.validateFile(file)                  [] when it passes, [messages] when it fails —
 *                                                checks without staging anything
 *   instance.getConfig()                         the resolved, frozen config
 *   instance.setDisabled(bool) / .refreshUI() / .destroy()
 * Events (bubble from the .nds-file-upload container):
 *   nds:upload:ready             detail {instance}
 *   nds:upload:selected          detail {files, allFiles, fileData} — files that passed checks
 *   nds:upload:validationError   detail {errors:[{file, errors, fileData}]}
 *   nds:upload:maxFilesReached   detail {maxFiles, currentCount}
 *   nds:upload:beforeUpload      detail {fileData, formData, xhr} — CANCELABLE. Set headers on
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

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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

    const MESSAGES = {
        en: {
            sizeExceeds: 'File size exceeds',
            typeNotAllowed: 'File type not allowed',
            maxFilesReached: 'Maximum number of files reached',
            networkError: 'Network error',
            uploadTimedOut: 'Upload timed out',
            uploadCancelled: 'Upload cancelled',
            uploadFailed: 'Upload failed'
        },
        ar: {
            sizeExceeds: 'حجم الملف يتجاوز',
            typeNotAllowed: 'نوع الملف غير مسموح',
            maxFilesReached: 'تم الوصول للحد الأقصى لعدد الملفات',
            networkError: 'خطأ في الشبكة',
            uploadTimedOut: 'انتهت مهلة الرفع',
            uploadCancelled: 'تم إلغاء الرفع',
            uploadFailed: 'فشل الرفع'
        }
    };

    function msg(key) {
        return (NDS.isArabic ? MESSAGES.ar : MESSAGES.en)[key];
    }

    function warn(message) {
        console.warn('NDS Upload: ' + message);
    }

    function resolve(container) {
        return typeof container === 'string' ? document.querySelector(container) : container;
    }

    // Canonical file-item markup (mirrors components/upload.md). Cloned when a
    // consumer omits the hidden .nds-file-item-template, so a bare
    // .nds-file-upload still renders file rows. A supplied template still wins.
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
                '<div class="nds-file-error"><span class="nds-error-message"></span></div>' +
            '</div>' +
            '<div class="nds-file-actions">' +
                '<button type="button" class="nds-btn nds-subtle nds-sm nds-icon-only nds-remove-file" aria-label="Remove file">' +
                    '<i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>' +
                '</button>' +
            '</div>' +
        '</div>';

    // ==============================================
    // CLASS: NDSUpload
    // ==============================================

    class NDSUpload {
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
            this._browseBtn = container.querySelector('.nds-browse-btn');

            if (!this._fileInput || !this._dropZone || !this._fileList) return;

            this._syncAccept();

            this.abortController = new AbortController();
            const { signal } = this.abortController;

            this._fileInput.addEventListener('change', this._handleFileInput.bind(this), { signal });
            this._fileList.addEventListener('click', this._handleFileListClick.bind(this), { signal });
            // A native reset never touches the list: clear it with the form.
            container.closest('form')?.addEventListener('reset', () => this.clearAllFiles(), { signal });
            const openPicker = this._openPicker.bind(this);
            if (this._browseBtn) this._browseBtn.addEventListener('click', openPicker, { signal });

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
            const ds = this.container.dataset;
            const fromAttrs = {
                uploadUrl: ds.uploadUrl || null,
                autoUpload: ds.autoUpload === 'true',
                maxFileSize: parseInt(ds.maxFileSize) || 10 * 1024 * 1024,
                allowedTypes: ds.allowedTypes ? ds.allowedTypes.split(',').map(t => t.trim().toLowerCase()) : null,
                allowedMimeTypes: ds.allowedMimeTypes ? ds.allowedMimeTypes.split(',').map(t => t.trim().toLowerCase()) : null,
                maxFiles: parseInt(ds.maxFiles) || Infinity,
                fieldName: ds.fieldName || 'file',
                uploadTimeout: parseFloat(ds.uploadTimeout) || 0
            };
            // JS options (passed to NDS.Upload.create / the constructor) override the
            // declarative data-* attributes; _options only holds keys the caller set.
            return { ...fromAttrs, ...this._options };
        }

        // Normalize a JS options object into the _readConfig shape, keeping only the
        // keys the caller actually provided so they override attrs rather than blank
        // them. allowedTypes / allowedMimeTypes accept an array or a comma string.
        _normalizeOptions(options) {
            if (!options || typeof options !== 'object') return {};
            const list = (v) => (Array.isArray(v) ? v : String(v).split(','))
                .map(t => t.trim().toLowerCase()).filter(Boolean);
            const out = {};
            if (options.uploadUrl != null) out.uploadUrl = options.uploadUrl;
            if (options.autoUpload != null) out.autoUpload = options.autoUpload === true || options.autoUpload === 'true';
            if (options.maxFileSize != null) out.maxFileSize = parseInt(options.maxFileSize, 10);
            if (options.maxFiles != null) out.maxFiles = options.maxFiles === Infinity ? Infinity : parseInt(options.maxFiles, 10);
            if (options.allowedTypes != null) out.allowedTypes = list(options.allowedTypes);
            if (options.allowedMimeTypes != null) out.allowedMimeTypes = list(options.allowedMimeTypes);
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
            if (allowedTypes) this._fileInput.setAttribute('accept', allowedTypes.map(t => '.' + t).join(','));
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
            const isSingle = NDS.State.has(this.container, 'single');
            if (!isSingle && this._files.length >= config.maxFiles) {
                this._dispatchEvent('nds:upload:maxFilesReached', {
                    maxFiles: config.maxFiles,
                    currentCount: this._files.length
                });
                return null;
            }

            // Opt-in: run the same size/type/MIME checks dragged/selected files get.
            const fileData = this._entry(file, options.validate ? this._validateFile(file, config) : [], options);
            this._setFiles(isSingle ? [fileData] : this._files.concat(fileData));
            return fileData.id;
        }

        removeFile(fileId) {
            if (!this._files.some(f => f.id === fileId)) return false;
            this._setFiles(this._files.filter(f => f.id !== fileId));
            return true;
        }

        clearAllFiles() {
            this._setFiles([]);
        }

        getFile(fileId) {
            const found = this._files.find(f => f.id === fileId);
            return found ? this._toPublic(found) : null;
        }

        getAllFiles() {
            return this._files.map(f => this._toPublic(f));
        }

        getFilesByStatus(status) {
            return this._files.filter(f => f.status === status).map(f => this._toPublic(f));
        }

        // One shape for every staged file. A file the checks failed is _rejected and never uploads.
        _entry(file, errors, extra = {}) {
            return {
                file: file,
                id: NDS.uniqueId('file-'),
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
            const dropped = this._files.filter(f => !files.includes(f));
            dropped.forEach(f => { if (f._xhr) f._xhr.abort(); });
            this._files = files;
            this._updateFileList();
            dropped.forEach(f => this._dispatchEvent('nds:upload:removed', { fileData: this._toPublic(f), fileId: f.id }));
        }

        _toPublic(f) {
            return { file: f.file, id: f.id, status: f.status, progress: f.progress, error: f.error, response: f.response };
        }

        // ==============================================
        // UPLOAD CONTROL
        // ==============================================

        startUpload(fileId) {
            if (fileId) {
                const fileData = this._files.find(f => f.id === fileId);
                if (fileData && fileData.status === 'ready') this._uploadFile(fileData);
            } else {
                this._files.filter(f => f.status === 'ready').forEach(f => this._uploadFile(f));
            }
        }

        retry(fileId) {
            const fileData = this._files.find(f => f.id === fileId);
            // A file the checks rejected stays rejected: re-sending it would skip them.
            if (!fileData || fileData.status !== 'error' || fileData._rejected) return false;
            fileData.status = 'ready';
            fileData.progress = 0;
            fileData.error = null;
            fileData.response = null;
            fileData._xhr = null;
            this._updateFileItem(fileId);
            this._uploadFile(fileData);
            return true;
        }

        abort(fileId) {
            const fileData = this._files.find(f => f.id === fileId);
            if (!fileData || !fileData._xhr) return false;
            fileData._xhr.abort();
            fileData._xhr = null;
            fileData.status = 'error';
            fileData.error = msg('uploadCancelled');
            this._updateFileItem(fileId);
            return true;
        }

        // ==============================================
        // STATUS / PROGRESS
        // ==============================================

        setFileStatus(fileId, status, options = {}) {
            const file = this._files.find(f => f.id === fileId);
            if (!file) return false;
            file.status = status;
            if (options.progress !== undefined) file.progress = options.progress;
            if (options.error) file.error = options.error;
            this._updateFileItem(fileId);
            return true;
        }

        setFileProgress(fileId, progress) {
            const file = this._files.find(f => f.id === fileId);
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
                    this._updateFileItem(fileId);
                }
            }
            return true;
        }

        // ==============================================
        // COMPONENT CONTROL
        // ==============================================

        // Forms disables the input and buttons on the token; the drop handlers read it per event.
        setDisabled(disabled) {
            NDS.State[disabled ? 'add' : 'remove'](this.container, 'disabled');
        }

        refreshUI() {
            this._updateFileList();
        }

        destroy() {
            this.abortController?.abort();
            NDS.State.remove(this._dropZone, 'drag-over');

            // Abort in-progress uploads
            this._files.forEach(f => { if (f._xhr) f._xhr.abort(); });

            // Clean DOM
            this._fileList.innerHTML = '';
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
                errors.push(msg('sizeExceeds') + ' ' + formatFileSize(config.maxFileSize));
            }

            // Extension check
            if (config.allowedTypes) {
                const ext = file.name.split('.').pop().toLowerCase();
                if (!config.allowedTypes.includes(ext)) {
                    errors.push(msg('typeNotAllowed') + ' (.' + ext + ')');
                }
            }

            // MIME type check
            if (config.allowedMimeTypes && file.type) {
                const mime = file.type.toLowerCase();
                const allowed = config.allowedMimeTypes.some(t => {
                    if (t.endsWith('/*')) return mime.startsWith(t.slice(0, -1));
                    return mime === t;
                });
                if (!allowed) {
                    errors.push(msg('typeNotAllowed'));
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
            const isSingle = NDS.State.has(this.container, 'single');

            // Max files check
            const remaining = isSingle ? 1 : config.maxFiles - this._files.length;
            const filesToProcess = isSingle ? fileArray.slice(0, 1) : fileArray.slice(0, Math.max(0, remaining));
            const excessFiles = isSingle ? [] : fileArray.slice(Math.max(0, remaining));

            filesToProcess.forEach(file => {
                const errors = this._validateFile(file, config);
                const fileData = this._entry(file, errors);
                if (errors.length === 0) {
                    validFiles.push(fileData);
                } else {
                    validationErrors.push({ file: file, errors: errors, fileData: fileData });
                }
            });

            // Collect all rejected files (validation errors + excess)
            const rejectedFiles = validationErrors.map(e => e.fileData)
                .concat(excessFiles.map(file => this._entry(file, [msg('maxFilesReached') + ' (' + config.maxFiles + ')'])));

            if (excessFiles.length > 0) {
                this._dispatchEvent('nds:upload:maxFilesReached', {
                    maxFiles: config.maxFiles,
                    currentCount: this._files.length + validFiles.length
                });
            }

            this._setFiles(isSingle ? validFiles.concat(rejectedFiles).slice(0, 1) : this._files.concat(validFiles, rejectedFiles));

            // Dispatch events
            if (validFiles.length > 0) {
                this._dispatchEvent('nds:upload:selected', {
                    files: validFiles.map(f => f.file),
                    allFiles: this._files.map(f => f.file),
                    fileData: validFiles.map(f => this._toPublic(f))
                });

                if (config.autoUpload && config.uploadUrl) {
                    validFiles.forEach(f => this._uploadFile(f, config));
                }
            }

            if (validationErrors.length > 0) {
                this._dispatchEvent('nds:upload:validationError', {
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
            const index = this._files.findIndex(f => f.id === fileData.id);
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

            // Dispatch beforeUpload (cancelable, exposes xhr for custom headers)
            const allowed = this._dispatchEvent('nds:upload:beforeUpload', {
                fileData: this._toPublic(fileData),
                formData: formData,
                xhr: xhr
            }, true);

            if (!allowed) return;

            // Update status
            fileData.status = 'uploading';
            fileData._xhr = xhr;
            this._updateFileItem(fileData.id);

            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable) {
                    const progress = (e.loaded / e.total) * 100;
                    fileData.progress = progress;

                    // Every byte sent: the server works on it now.
                    if (progress >= 100 && fileData.status === 'uploading') {
                        fileData.status = 'processing';
                        this._updateFileItem(fileData.id);
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
                    let serverMsg = '';
                    try { serverMsg = JSON.parse(xhr.response)?.error || ''; } catch { /* non-JSON body */ }
                    fileData.error = serverMsg || xhr.statusText || msg('uploadFailed');
                    this._dispatchEvent('nds:upload:error', {
                        fileData: this._toPublic(fileData),
                        error: fileData.error,
                        status: xhr.status,
                        response: xhr.response
                    });
                }
                this._updateFileItem(fileData.id);
            });

            // No HTTP answer: a network failure, or the opt-in time limit ran out.
            const fail = (key) => {
                fileData._xhr = null;
                fileData.status = 'error';
                fileData.error = msg(key);
                this._dispatchEvent('nds:upload:error', {
                    fileData: this._toPublic(fileData),
                    error: fileData.error
                });
                this._updateFileItem(fileData.id);
            };
            xhr.addEventListener('error', () => fail('networkError'));
            xhr.addEventListener('timeout', () => fail('uploadTimedOut'));

            xhr.open('POST', config.uploadUrl);
            xhr.timeout = config.uploadTimeout * 1000;
            xhr.send(formData);
        }

        // ==============================================
        // INTERNAL: DOM / UI
        // ==============================================

        _updateFileList() {
            this._fileList.innerHTML = '';
            this._files.forEach(fileData => this._fileList.appendChild(this._createFileItem(fileData)));
        }

        // Returns the .nds-file-item node to clone for a row. A consumer-supplied
        // .nds-file-item-template wins; otherwise the built-in canonical markup is
        // parsed once (cached per instance) so a bare .nds-file-upload still renders.
        _getFileItemSource() {
            const template = this.container.querySelector('.nds-file-item-template');
            if (template) return template.querySelector('.nds-file-item');

            if (!this._fallbackTemplate) {
                this._fallbackTemplate = document.createElement('template');
                this._fallbackTemplate.innerHTML = DEFAULT_FILE_ITEM_HTML;
            }
            return this._fallbackTemplate.content.querySelector('.nds-file-item');
        }

        _createFileItem(fileData) {
            const source = this._getFileItemSource();
            if (!source) return document.createElement('div');

            const fileItem = source.cloneNode(true);
            fileItem.dataset.fileId = fileData.id;

            // Populate content
            const fileName = fileItem.querySelector('.nds-file-name');
            const removeBtn = fileItem.querySelector('.nds-remove-file');
            const errorMsg = fileItem.querySelector('.nds-error-message');

            if (fileName) {
                // The base truncates and the extension stays; a hover tooltip shows the whole name.
                const name = sanitizeFileName(fileData.file.name);
                const dot = name.lastIndexOf('.');
                const base = document.createElement('span');
                base.className = 'nds-file-base';
                base.textContent = dot > 0 ? name.slice(0, dot) : name;
                fileName.replaceChildren(base);
                if (dot > 0) {
                    const ext = document.createElement('span');
                    ext.className = 'nds-file-ext';
                    ext.textContent = name.slice(dot);
                    fileName.append(ext);
                }
                // title is the tooltip's message source; plain browser title without NDS.Tooltip.
                fileName.title = name;
                fileName.classList.add('nds-tooltip');
                fileName.setAttribute('data-tooltip-hover', '500');
                NDS.Tooltip?.create?.(fileName);
            }
            if (removeBtn) removeBtn.setAttribute('data-file-id', fileData.id);
            if (errorMsg && fileData.error) errorMsg.textContent = fileData.error;

            // Apply state and status via data attributes (CSS handles visibility)
            this._applyFileItemState(fileItem, fileData);

            // Set progress if applicable
            if ((fileData.status === 'uploading' || fileData.status === 'processing') && fileData.progress > 0) {
                this._setProgress(fileItem, fileData.progress);
            }

            return fileItem;
        }

        _updateFileItem(fileId) {
            const fileData = this._files.find(f => f.id === fileId);
            const fileItem = this._fileList.querySelector(`[data-file-id="${fileId}"]`);
            if (!fileData || !fileItem) {
                // If no element exists yet, do a full list rebuild
                if (fileData) this._updateFileList();
                return;
            }

            // Update text content
            const errorMsg = fileItem.querySelector('.nds-error-message');
            if (errorMsg) errorMsg.textContent = fileData.error || '';

            // Update state/status attributes
            this._applyFileItemState(fileItem, fileData);

            // Update progress
            if (fileData.status === 'uploading' || fileData.status === 'processing') {
                this._setProgress(fileItem, fileData.progress);
            }
        }

        _applyFileItemState(fileItem, fileData) {
            const status = fileData.status;

            // Clear all transient states
            NDS.State.remove(fileItem, 'uploading', 'processing');
            NDS.Status.clear(fileItem);

            // Clear progress circle status
            const progressCircle = fileItem.querySelector('.nds-progress-circle');
            if (progressCircle) NDS.Status.clear(progressCircle);

            // Clear feedback status
            const feedback = fileItem.querySelector('.nds-feedback');
            if (feedback) NDS.Status.clear(feedback);

            switch (status) {
                case 'uploading':
                    NDS.State.add(fileItem, 'uploading');
                    break;
                case 'processing':
                    NDS.State.add(fileItem, 'processing');
                    break;
                case 'complete':
                    NDS.Status.set(fileItem, 'success');
                    if (feedback) NDS.Status.set(feedback, 'success');
                    break;
                case 'error':
                    NDS.Status.set(fileItem, 'error');
                    if (feedback) NDS.Status.set(feedback, 'error');
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
            return !!this._uploadZone && NDS.State.has(this.container, 'dropbox') && !NDS.State.has(this.container, 'disabled');
        }

        _handleDragOver(e) {
            if (!this._dropActive()) return;
            e.preventDefault();
            NDS.State.add(this._dropZone, 'drag-over');
        }

        _handleDragLeave(e) {
            if (!this._dropZone.contains(e.relatedTarget)) {
                NDS.State.remove(this._dropZone, 'drag-over');
            }
        }

        _handleDrop(e) {
            NDS.State.remove(this._dropZone, 'drag-over');
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

    function initializeUploads() {
        document.querySelectorAll('.nds-file-upload').forEach(el => {
            if (el.closest('code')) return;
            if (el.hasAttribute('data-nds-upload-initialized')) return;
            new NDSUpload(el);
        });
    }

    // ==============================================
    // GLOBAL API: NDS.Upload
    // ==============================================

    NDS.Upload = {
        init: initializeUploads,
        reinit: initializeUploads,
        create: (container, options) => {
            container = resolve(container);
            if (!container) { warn('create: container not found'); return null; }
            if (container.ndsUpload) {                              // already built → merge, return it
                if (options) container.ndsUpload._setOptions(options);
                return container.ndsUpload;
            }
            const instance = new NDSUpload(container, options);
            return instance._initialized ? instance : null;       // null if the constructor bailed
        },

        getInstance: (container) => {
            return resolve(container)?.ndsUpload || null;
        },

        whenReady: (container, callback) => {
            container = resolve(container);
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
    NDS.onDOMAdd('.nds-file-upload', function (nodes) {
        nodes.forEach(el => {
            if (!el.hasAttribute('data-nds-upload-initialized')) {
                new NDSUpload(el);
            }
        });
    });

    // Paired teardown so a removed upload instance detaches its listeners,
    // aborts in-flight XHRs, disconnects its MutationObserver, and clears the
    // init marker — without which a re-added node would short-circuit re-init
    // behind the stale marker.
    NDS.onDOMRemove('.nds-file-upload', function (nodes) {
        nodes.forEach(el => {
            if (el.ndsUpload) el.ndsUpload.destroy();
        });
    });

})();
