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
            mimeNotAllowed: 'File type not allowed',
            maxFilesReached: 'Maximum number of files reached',
            networkError: 'Network error',
            uploadCancelled: 'Upload cancelled'
        },
        ar: {
            sizeExceeds: 'حجم الملف يتجاوز',
            typeNotAllowed: 'نوع الملف غير مسموح',
            mimeNotAllowed: 'نوع الملف غير مسموح',
            maxFilesReached: 'تم الوصول للحد الأقصى لعدد الملفات',
            networkError: 'خطأ في الشبكة',
            uploadCancelled: 'تم إلغاء الرفع'
        }
    };

    function msg(key) {
        return (NDS.isArabic ? MESSAGES.ar : MESSAGES.en)[key];
    }

    function generateFileId() {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
            return crypto.randomUUID();
        }
        return Date.now() + '_' + Math.random().toString(36).substring(2, 11);
    }

    // ==============================================
    // CLASS: NDSUpload
    // ==============================================

    class NDSUpload {
        constructor(container) {
            if (!container || container.hasAttribute('data-nds-upload-initialized')) return;
            if (container.closest('code, .code-example')) return;

            this.container = container;
            this._files = [];
            this._observer = null;
            this._dragListenersActive = false;

            // Cache DOM references
            this._fileInput = container.querySelector('input[type="file"]');
            this._dropZone = container.querySelector('.nds-form-control');
            this._fileList = container.querySelector('.nds-file-list');
            this._uploadZone = container.querySelector('.nds-upload-zone');
            this._browseBtn = container.querySelector('.nds-browse-btn');

            if (!this._fileInput || !this._dropZone || !this._fileList) return;

            // Sync accept attribute from config
            const { allowedTypes } = this._readConfig();
            if (allowedTypes && !this._fileInput.hasAttribute('accept')) {
                this._fileInput.setAttribute('accept', allowedTypes.map(t => '.' + t).join(','));
            }

            // Bind event handlers (for cleanup in destroy)
            this._onFileChange = this._handleFileInput.bind(this);
            this._onFileListClick = this._handleFileListClick.bind(this);
            this._onBrowseClick = this._handleBrowseClick.bind(this);
            this._onDragOver = this._handleDragOver.bind(this);
            this._onDragLeave = this._handleDragLeave.bind(this);
            this._onDrop = this._handleDrop.bind(this);
            this._onUploadZoneClick = this._handleUploadZoneClick.bind(this);

            // Wire up listeners
            this._fileInput.addEventListener('change', this._onFileChange);
            this._fileList.addEventListener('click', this._onFileListClick);
            if (this._browseBtn) {
                this._browseBtn.addEventListener('click', this._onBrowseClick);
            }

            // Drag and drop
            this._initDragAndDrop();
            this._setupMutationObserver();

            // Mark initialized and store instance
            container.setAttribute('data-nds-upload-initialized', '');
            container.ndsUpload = this;

            // Dispatch ready event
            this._dispatchEvent('nds:upload:ready', { instance: this });
        }

        // ==============================================
        // CONFIGURATION
        // ==============================================

        _readConfig() {
            const ds = this.container.dataset;
            return {
                uploadUrl: ds.uploadUrl || null,
                autoUpload: ds.autoUpload === 'true',
                maxFileSize: parseInt(ds.maxFileSize) || 10 * 1024 * 1024,
                allowedTypes: ds.allowedTypes ? ds.allowedTypes.split(',').map(t => t.trim().toLowerCase()) : null,
                allowedMimeTypes: ds.allowedMimeTypes ? ds.allowedMimeTypes.split(',').map(t => t.trim().toLowerCase()) : null,
                maxFiles: parseInt(ds.maxFiles) || Infinity
            };
        }

        getConfig() {
            return Object.freeze({ ...this._readConfig() });
        }

        // ==============================================
        // FILE MANAGEMENT
        // ==============================================

        addFile(file, options = {}) {
            // Check max files
            const config = this._readConfig();
            if (this._files.length >= config.maxFiles) {
                this._dispatchEvent('nds:upload:maxFilesReached', {
                    maxFiles: config.maxFiles,
                    currentCount: this._files.length
                });
                return null;
            }

            const isSingle = NDS.State.has(this.container, 'single');
            const fileData = {
                file: file,
                id: generateFileId(),
                status: options.status || 'ready',
                progress: options.progress || 0,
                error: options.error || null,
                _xhr: null
            };

            if (isSingle) {
                this._files = [fileData];
            } else {
                this._files.push(fileData);
            }

            this._updateFileList();
            return fileData.id;
        }

        removeFile(fileId) {
            const index = this._files.findIndex(f => f.id === fileId);
            if (index === -1) return false;

            const fileData = this._files[index];

            // Abort in-progress upload
            if (fileData._xhr) fileData._xhr.abort();

            this._files.splice(index, 1);

            // Remove DOM element directly
            const el = this._fileList.querySelector(`[data-file-id="${fileId}"]`);
            if (el) el.remove();

            this._dispatchEvent('nds:upload:removed', {
                fileData: { file: fileData.file, id: fileData.id, status: fileData.status },
                fileId: fileId
            });

            return true;
        }

        clearAllFiles() {
            // Abort all in-progress uploads
            this._files.forEach(f => { if (f._xhr) f._xhr.abort(); });
            this._files = [];
            this._fileList.innerHTML = '';
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

        _toPublic(f) {
            return { file: f.file, id: f.id, status: f.status, progress: f.progress, error: f.error };
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
            if (!fileData || fileData.status !== 'error') return false;
            fileData.status = 'ready';
            fileData.progress = 0;
            fileData.error = null;
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

        setDisabled(disabled) {
            if (disabled) {
                NDS.State.add(this.container, 'disabled');
                this._removeDragAndDrop();
            } else {
                NDS.State.remove(this.container, 'disabled');
                this._initDragAndDrop();
            }
        }

        refreshUI() {
            this._updateFileList();
        }

        destroy() {
            // Remove event listeners
            this._fileInput.removeEventListener('change', this._onFileChange);
            this._fileList.removeEventListener('click', this._onFileListClick);
            if (this._browseBtn) {
                this._browseBtn.removeEventListener('click', this._onBrowseClick);
            }

            // Tear down drag and observer
            this._removeDragAndDrop();
            if (this._observer) {
                this._observer.disconnect();
                this._observer = null;
            }

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
                    errors.push(msg('mimeNotAllowed'));
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
                const fileData = {
                    file: file,
                    id: generateFileId(),
                    status: errors.length === 0 ? 'ready' : 'error',
                    progress: 0,
                    error: errors.length > 0 ? errors.join(', ') : null,
                    _xhr: null
                };
                if (errors.length === 0) {
                    validFiles.push(fileData);
                } else {
                    validationErrors.push({ file: file, errors: errors, fileData: fileData });
                }
            });

            // Collect all rejected files (validation errors + excess)
            const rejectedFiles = validationErrors.map(e => e.fileData);

            excessFiles.forEach(file => {
                rejectedFiles.push({
                    file: file,
                    id: generateFileId(),
                    status: 'error',
                    progress: 0,
                    error: msg('maxFilesReached') + ' (' + config.maxFiles + ')',
                    _xhr: null
                });
            });

            if (excessFiles.length > 0) {
                this._dispatchEvent('nds:upload:maxFilesReached', {
                    maxFiles: config.maxFiles,
                    currentCount: this._files.length + validFiles.length
                });
            }

            if (isSingle) {
                this._files = validFiles.concat(rejectedFiles).slice(0, 1);
            } else {
                this._files = this._files.concat(validFiles, rejectedFiles);
            }

            this._updateFileList();

            // Dispatch events
            if (validFiles.length > 0) {
                this._dispatchEvent('nds:upload:selected', {
                    files: validFiles.map(f => f.file),
                    allFiles: this._files.map(f => f.file),
                    fileData: validFiles.map(f => ({ file: f.file, id: f.id, status: f.status }))
                });

                if (config.autoUpload && config.uploadUrl) {
                    validFiles.forEach(f => this._uploadFile(f, config));
                }
            }

            if (validationErrors.length > 0) {
                this._dispatchEvent('nds:upload:validationError', { errors: validationErrors });
            }
        }

        _uploadFile(fileData, config) {
            if (!config) config = this._readConfig();
            const index = this._files.findIndex(f => f.id === fileData.id);
            if (index === -1) return;

            const formData = new FormData();
            formData.append('file', fileData.file, sanitizeFileName(fileData.file.name));

            const xhr = new XMLHttpRequest();

            // Dispatch beforeUpload (cancelable, exposes xhr for custom headers)
            const allowed = this._dispatchEvent('nds:upload:beforeUpload', {
                fileData: { file: fileData.file, id: fileData.id },
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

                    const fileItem = this._fileList.querySelector(`[data-file-id="${fileData.id}"]`);
                    if (fileItem) this._setProgress(fileItem, progress);

                    this._dispatchEvent('nds:upload:progress', {
                        fileData: { file: fileData.file, id: fileData.id },
                        progress: progress
                    });
                }
            });

            xhr.addEventListener('load', () => {
                fileData._xhr = null;
                if (xhr.status >= 200 && xhr.status < 300) {
                    fileData.status = 'complete';
                    fileData.response = xhr.response;
                    this._dispatchEvent('nds:upload:success', {
                        fileData: { file: fileData.file, id: fileData.id },
                        response: xhr.response
                    });
                } else {
                    fileData.status = 'error';
                    fileData.error = xhr.statusText;
                    this._dispatchEvent('nds:upload:error', {
                        fileData: { file: fileData.file, id: fileData.id },
                        error: xhr.statusText,
                        status: xhr.status
                    });
                }
                this._updateFileItem(fileData.id);
            });

            xhr.addEventListener('error', () => {
                fileData._xhr = null;
                fileData.status = 'error';
                fileData.error = msg('networkError');
                this._dispatchEvent('nds:upload:error', {
                    fileData: { file: fileData.file, id: fileData.id },
                    error: msg('networkError')
                });
                this._updateFileItem(fileData.id);
            });

            xhr.open('POST', config.uploadUrl);
            xhr.send(formData);
        }

        // ==============================================
        // INTERNAL: DOM / UI
        // ==============================================

        _updateFileList() {
            this._fileList.innerHTML = '';
            this._files.forEach((fileData, index) => {
                const el = this._createFileItem(fileData, index);
                this._fileList.appendChild(el);
            });
        }

        _createFileItem(fileData, index) {
            const template = this.container.querySelector('.nds-file-item-template');
            if (!template) return document.createElement('div');

            const fileItem = template.querySelector('.nds-file-item').cloneNode(true);
            fileItem.dataset.index = index;
            fileItem.dataset.fileId = fileData.id;

            // Populate content
            const fileName = fileItem.querySelector('.nds-file-name');
            const removeBtn = fileItem.querySelector('.nds-remove-file');
            const errorMsg = fileItem.querySelector('.nds-error-message');

            if (fileName) fileName.textContent = sanitizeFileName(fileData.file.name);
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

        _handleBrowseClick(e) {
            e.preventDefault();
            e.stopPropagation();
            this._fileInput.click();
        }

        _handleDragOver(e) {
            e.preventDefault();
            NDS.State.add(this._dropZone, 'drag-over');
        }

        _handleDragLeave(e) {
            e.preventDefault();
            if (!this._dropZone.contains(e.relatedTarget)) {
                NDS.State.remove(this._dropZone, 'drag-over');
            }
        }

        _handleDrop(e) {
            e.preventDefault();
            NDS.State.remove(this._dropZone, 'drag-over');
            if (e.dataTransfer.files.length > 0) {
                this._handleFiles(e.dataTransfer.files);
            }
        }

        _handleUploadZoneClick(e) {
            e.preventDefault();
            e.stopPropagation();
            this._fileInput.click();
        }

        // ==============================================
        // INTERNAL: Drag and drop
        // ==============================================

        _initDragAndDrop() {
            if (!this._dropZone || !this._uploadZone) return;
            if (!NDS.State.has(this.container, 'dropbox')) return;
            if (this._dragListenersActive) return;

            this._dropZone.addEventListener('dragover', this._onDragOver);
            this._dropZone.addEventListener('dragleave', this._onDragLeave);
            this._dropZone.addEventListener('drop', this._onDrop);
            this._uploadZone.addEventListener('click', this._onUploadZoneClick);
            this._dragListenersActive = true;
        }

        _removeDragAndDrop() {
            if (!this._dragListenersActive) return;

            this._dropZone.removeEventListener('dragover', this._onDragOver);
            this._dropZone.removeEventListener('dragleave', this._onDragLeave);
            this._dropZone.removeEventListener('drop', this._onDrop);
            if (this._uploadZone) {
                this._uploadZone.removeEventListener('click', this._onUploadZoneClick);
            }
            NDS.State.remove(this._dropZone, 'drag-over');
            this._dragListenersActive = false;
        }

        _setupMutationObserver() {
            let lastDropboxState = NDS.State.has(this.container, 'dropbox');

            this._observer = new MutationObserver(() => {
                const currentDropboxState = NDS.State.has(this.container, 'dropbox');
                if (currentDropboxState !== lastDropboxState) {
                    this._removeDragAndDrop();
                    this._initDragAndDrop();
                    lastDropboxState = currentDropboxState;
                }
            });

            this._observer.observe(this.container, {
                attributes: true,
                attributeFilter: ['data-state']
            });
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
            if (el.closest('code, .code-example')) return;
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
        create: (container) => {
            if (typeof container === 'string') container = document.querySelector(container);
            if (!container) return null;
            return new NDSUpload(container);
        },

        getInstance: (container) => {
            if (typeof container === 'string') container = document.querySelector(container);
            return container?.ndsUpload || null;
        },

        whenReady: (container, callback) => {
            if (typeof container === 'string') container = document.querySelector(container);
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

})();
