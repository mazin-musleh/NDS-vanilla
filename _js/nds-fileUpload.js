// NDS File Upload Controller - File Upload Logic
// File: nds-fileUpload.js

(function () {
    'use strict';

    // File Upload functionality
    function initializeFileUploads() {
        const fileUploadElements = document.querySelectorAll('.nds-file-upload');
        if (fileUploadElements.length === 0) {
            return;
        }
        fileUploadElements.forEach((element, index) => {
            initFileUpload(element);
        });
    }

    function initFileUpload(uploadContainer) {
        
        const fileInput = uploadContainer.querySelector('input[type="file"]');
        const dropZone = uploadContainer.querySelector('.nds-form-control');
        const fileList = uploadContainer.querySelector('.file-list');
        const uploadZone = uploadContainer.querySelector('.upload-zone');
        const browseBtn = uploadContainer.querySelector('.browse-btn');
        
        if (!fileInput) {
            return;
        }
        if (!dropZone) {
            return;
        }
        if (!fileList) {
            return;
        }
        // Note: isSingleFile is now checked dynamically in functions
        const isMultiple = fileInput.hasAttribute('multiple');
        let uploadedFiles = [];

        // Function to get current configuration (dynamic reading)
        function getConfig() {
            return {
                uploadUrl: uploadContainer.dataset.uploadUrl || null,
                autoUpload: uploadContainer.dataset.autoUpload === 'true',
                maxFileSize: parseInt(uploadContainer.dataset.maxFileSize) || 10 * 1024 * 1024, // 10MB default
                allowedTypes: uploadContainer.dataset.allowedTypes?.split(',') || null
            };
        }

        // Utility functions
        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }

        // Icon generation removed - using template icons instead

        function updateProgress(progressElement, percentage) {
            const circle = progressElement.querySelector('.progress-bar');
            const text = progressElement.querySelector('.progress-number');
            const circumference = 62.83; // 2 * Math.PI * 10
            const offset = circumference - (percentage / 100) * circumference;
            
            if (circle) circle.style.strokeDashoffset = offset;
            if (text) text.textContent = Math.round(percentage);
        }

        function createFileItem(fileData, index) {
            const file = fileData.file;
            const status = fileData.status || 'ready';
            
            // Find template within the current container
            const template = uploadContainer.querySelector('template');
            if (!template) {
                return document.createElement('div');
            }
            
            const fileItem = template.content.cloneNode(true).querySelector('.file-item');
            
            // Set appropriate classes and attributes
            if (status === 'uploading') {
                fileItem.className = 'file-item uploading';
            } else {
                fileItem.className = `file-item ${status}`;
            }
            
            fileItem.dataset.index = index;
            fileItem.dataset.fileId = fileData.id;
            
            // Update content
            const fileName = fileItem.querySelector('.file-name');
            const fileSize = fileItem.querySelector('.file-size');
            const fileType = fileItem.querySelector('.file-type');
            const fileStatus = fileItem.querySelector('.file-status');
            const fileIcon = fileItem.querySelector('.file-icon');
            const progressCircle = fileItem.querySelector('.progress-circle');
            const removeButton = fileItem.querySelector('.remove-file');
            const fileError = fileItem.querySelector('.file-error');
            const errorMessage = fileItem.querySelector('.error-message');
            
            if (fileName) fileName.textContent = file.name;
            if (fileSize) fileSize.textContent = formatFileSize(file.size);
            if (fileType) fileType.textContent = file.type || 'Unknown';
            if (fileStatus) fileStatus.textContent = getStatusText(status);
            if (removeButton) removeButton.setAttribute('data-file-id', fileData.id);
            
            // Handle icon vs progress bar vs error display
            if (status === 'uploading' || status === 'processing') {
                if (fileIcon) fileIcon.style.display = 'none';
                if (progressCircle) progressCircle.style.display = 'flex';
                if (fileError) fileError.style.display = 'none';
                
                // Add processing class to file item for processing status
                if (status === 'processing') {
                    fileItem.classList.add('processing');
                } else {
                    fileItem.classList.remove('processing');
                }
            } else if (status === 'error') {
                if (fileIcon) fileIcon.style.display = '';
                if (progressCircle) progressCircle.style.display = 'none';
                if (fileError && errorMessage) {
                    fileError.style.display = 'flex';
                    errorMessage.textContent = fileData.error || 'Upload failed';
                }
                fileItem.classList.add('error');
            } else {
                if (fileIcon) fileIcon.style.display = '';
                if (progressCircle) progressCircle.style.display = 'none';
                if (fileError) fileError.style.display = 'none';
                fileItem.classList.remove('error', 'processing');
            }
            
            // Update progress if uploading or processing
            if ((status === 'uploading' || status === 'processing') && fileData.progress > 0) {
                updateProgressInItem(fileItem, fileData.progress);
            }
            
            return fileItem;
        }
        
        function getStatusText(status) {
            const statusMap = {
                'ready': '',
                'uploading': 'Uploading...',
                'processing': 'Processing...',
                'complete': 'Complete',
                'error': 'Failed'
            };
            return statusMap[status] || '';
        }
        
        function updateProgressInItem(fileItem, progress) {
            const progressElement = fileItem.querySelector('.progress-circle');
            if (progressElement) {
                const circle = progressElement.querySelector('.progress-bar');
                const text = progressElement.querySelector('.progress-number');
                if (circle && text) {
                    const circumference = 62.83;
                    const offset = circumference - (progress / 100) * circumference;
                    circle.style.strokeDashoffset = offset;
                    text.textContent = Math.round(progress);
                }
            }
        }

        function updateFileList() {
            fileList.innerHTML = '';
            
            if (uploadedFiles.length > 0) {
                uploadedFiles.forEach((fileData, index) => {
                    const fileItem = createFileItem(fileData, index);
                    fileList.appendChild(fileItem);
                });
            }
        }

        function validateFile(file) {
            const config = getConfig();
            const errors = [];

            // Check file size
            if (file.size > config.maxFileSize) {
                errors.push(`File size exceeds ${formatFileSize(config.maxFileSize)}`);
            }

            // Check file type
            if (config.allowedTypes) {
                const fileExtension = file.name.split('.').pop().toLowerCase();
                if (!config.allowedTypes.includes(fileExtension)) {
                    errors.push(`File type .${fileExtension} not allowed`);
                }
            }

            return errors;
        }

        function handleFiles(files) {
            const fileArray = Array.from(files);
            const validFiles = [];
            const errors = [];

            // Validate files
            fileArray.forEach(file => {
                const fileErrors = validateFile(file);
                if (fileErrors.length === 0) {
                    validFiles.push({
                        file: file,
                        status: 'ready',
                        progress: 0,
                        id: Date.now() + '_' + Math.random().toString().substr(2, 6)
                    });
                } else {
                    errors.push({ file: file, errors: fileErrors });
                }
            });

            // Handle file storage based on upload type (check dynamically)
            const isSingleFile = uploadContainer.classList.contains('single-file');
            if (isSingleFile) {
                uploadedFiles = validFiles.slice(0, 1); // Replace with only first valid file
            } else {
                uploadedFiles = uploadedFiles.concat(validFiles);
            }

            // Get current config (dynamic)
            const config = getConfig();

            // Don't immediately show files in list if auto-upload is enabled
            // Let the upload process handle the display
            if (!(config.autoUpload && config.uploadUrl)) {
                updateFileList();
            }

            // Dispatch events
            if (validFiles.length > 0) {
                uploadContainer.dispatchEvent(new CustomEvent('filesSelected', {
                    detail: { 
                        files: validFiles.map(f => f.file),
                        allFiles: uploadedFiles.map(f => f.file),
                        fileData: validFiles
                    }
                }));

                // Auto-upload if configured
                if (config.autoUpload && config.uploadUrl) {
                    validFiles.forEach(fileData => uploadFile(fileData));
                }
            }

            if (errors.length > 0) {
                uploadContainer.dispatchEvent(new CustomEvent('fileValidationError', {
                    detail: { errors: errors }
                }));
            }
        }

        function uploadFile(fileData) {
            const index = uploadedFiles.findIndex(f => f.id === fileData.id);
            if (index === -1) return;

            const formData = new FormData();
            formData.append('file', fileData.file);

            // Allow modification of form data before upload
            const beforeUploadEvent = new CustomEvent('beforeUpload', {
                bubbles: true,
                cancelable: true,
                detail: { 
                    fileData: fileData, 
                    formData: formData,
                    cancel: false
                }
            });
            uploadContainer.dispatchEvent(beforeUploadEvent);

            // Check if upload was cancelled
            if (beforeUploadEvent.detail.cancel) {
                return;
            }

            // Update status to uploading and show in list (only if not cancelled)
            uploadedFiles[index].status = 'uploading';
            updateFileList();

            const xhr = new XMLHttpRequest();

            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable) {
                    const percentComplete = (e.loaded / e.total) * 100;
                    uploadedFiles[index].progress = percentComplete;
                    
                    // Update progress bar
                    const fileItem = fileList.querySelector(`[data-index="${index}"]`);
                    const progressElement = fileItem?.querySelector('.progress-circle');
                    if (progressElement) {
                        updateProgress(progressElement, percentComplete);
                    }

                    uploadContainer.dispatchEvent(new CustomEvent('uploadProgress', {
                        detail: { 
                            fileData: fileData,
                            progress: percentComplete
                        }
                    }));
                }
            });

            xhr.addEventListener('load', () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    uploadedFiles[index].status = 'complete';
                    uploadedFiles[index].response = xhr.response;
                    
                    uploadContainer.dispatchEvent(new CustomEvent('uploadSuccess', {
                        detail: { 
                            fileData: fileData,
                            response: xhr.response
                        }
                    }));
                } else {
                    uploadedFiles[index].status = 'error';
                    uploadedFiles[index].error = xhr.statusText;
                    
                    uploadContainer.dispatchEvent(new CustomEvent('uploadError', {
                        detail: { 
                            fileData: fileData,
                            error: xhr.statusText,
                            status: xhr.status
                        }
                    }));
                }
                updateFileList();
            });

            xhr.addEventListener('error', () => {
                uploadedFiles[index].status = 'error';
                uploadedFiles[index].error = 'Network error';
                
                uploadContainer.dispatchEvent(new CustomEvent('uploadError', {
                    detail: { 
                        fileData: fileData,
                        error: 'Network error'
                    }
                }));
                updateFileList();
            });

            const config = getConfig();
            xhr.open('POST', config.uploadUrl);
            xhr.send(formData);
        }

        // Public API for manual upload
        uploadContainer.uploadFiles = function(files = null) {
            const filesToUpload = files || uploadedFiles.filter(f => f.status === 'ready');
            filesToUpload.forEach(fileData => uploadFile(fileData));
        };

        // Public controller for external file upload control
        const ndsFileUpload = {
            // File Management
            addFile: function(file, options = {}) {
                const fileData = {
                    file: file,
                    id: Date.now() + '_' + Math.random().toString().substr(2, 6),
                    status: options.status || 'ready',
                    progress: options.progress || 0,
                    error: options.error || null
                };
                
                const isSingleFile = uploadContainer.classList.contains('single-file');
                if (isSingleFile) {
                    uploadedFiles = [fileData];
                } else {
                    uploadedFiles.push(fileData);
                }
                
                updateFileList();
                return fileData.id;
            },
            
            removeFile: function(fileId) {
                const index = uploadedFiles.findIndex(f => f.id === fileId);
                if (index !== -1) {
                    uploadedFiles.splice(index, 1);
                    updateFileList();
                    return true;
                }
                return false;
            },
            
            clearAllFiles: function() {
                uploadedFiles = [];
                updateFileList();
            },
            
            // Status Management
            setFileStatus: function(fileId, status, options = {}) {
                const file = uploadedFiles.find(f => f.id === fileId);
                if (file) {
                    file.status = status;
                    if (options.progress !== undefined) file.progress = options.progress;
                    if (options.error) file.error = options.error;
                    updateFileList();
                    return true;
                }
                return false;
            },
            
            setFileProgress: function(fileId, progress) {
                const file = uploadedFiles.find(f => f.id === fileId);
                if (file) {
                    file.progress = progress;
                    if (progress >= 100 && file.status === 'uploading') {
                        file.status = 'processing';
                    } else if (file.status !== 'uploading' && file.status !== 'processing') {
                        file.status = 'uploading';
                    }
                    
                    // Update UI efficiently - just update this file's progress
                    const fileItem = fileList.querySelector(`[data-file-id="${fileId}"]`);
                    if (fileItem) {
                        updateProgressInItem(fileItem, progress);
                        
                        // Update status if complete
                        if (progress >= 100) {
                            // Trigger full UI refresh for completion
                            updateFileList();
                        }
                    }
                    return true;
                }
                return false;
            },
            
            // File Information
            getFile: function(fileId) {
                return uploadedFiles.find(f => f.id === fileId) || null;
            },
            
            getAllFiles: function() {
                return [...uploadedFiles];
            },
            
            getFilesByStatus: function(status) {
                return uploadedFiles.filter(f => f.status === status);
            },
            
            // UI Control
            refreshUI: function() {
                updateFileList();
            },
            
            // Upload Control
            startUpload: function(fileId = null) {
                if (fileId) {
                    const fileData = uploadedFiles.find(f => f.id === fileId);
                    if (fileData) uploadFile(fileData);
                } else {
                    const readyFiles = uploadedFiles.filter(f => f.status === 'ready');
                    readyFiles.forEach(fileData => uploadFile(fileData));
                }
            },
            
            // Event Dispatching
            dispatchEvent: function(eventName, detail) {
                uploadContainer.dispatchEvent(new CustomEvent(eventName, { 
                    bubbles: true, 
                    detail: detail 
                }));
            }
        };

        // Store controller instance on the container for external access
        uploadContainer.ndsFileUpload = ndsFileUpload;

        // Event listeners
        fileInput.addEventListener('change', function(e) {
            const currentConfig = getConfig();
            if (e.target.files.length > 0) {
                handleFiles(e.target.files);
            }
        });

        // Event delegation for remove buttons
        fileList.addEventListener('click', function(e) {
            const removeButton = e.target.closest('.remove-file');
            if (removeButton) {
                e.preventDefault();
                e.stopPropagation();
                const fileId = removeButton.getAttribute('data-file-id');
                const removedFile = uploadedFiles.find(f => f.id == fileId);
                
                if (removedFile) {
                    // Dispatch event before removing
                    uploadContainer.dispatchEvent(new CustomEvent('fileRemoved', {
                        detail: { fileData: removedFile, fileId: fileId }
                    }));
                    
                    ndsFileUpload.removeFile(fileId);
                }
            }
        });

        // Drag and drop functionality
        let dragOverHandler, dragLeaveHandler, dropHandler, uploadZoneClickHandler;
        let dragListenersActive = false;

        function initDragAndDrop() {
            if (dropZone && uploadZone && uploadContainer.classList.contains('dropBox') && !dragListenersActive) {
                if (!dragOverHandler) {
                    dragOverHandler = function(e) {
                        e.preventDefault();
                        dropZone.classList.add('drag-over');
                        uploadContainer.classList.add('dropBoxActive');
                    };
                    
                    dragLeaveHandler = function(e) {
                        e.preventDefault();
                        if (!dropZone.contains(e.relatedTarget)) {
                            dropZone.classList.remove('drag-over');
                            uploadContainer.classList.remove('dropBoxActive');
                        }
                    };
                    
                    dropHandler = function(e) {
                        e.preventDefault();
                        dropZone.classList.remove('drag-over');
                        uploadContainer.classList.remove('dropBoxActive');
                        
                        const files = e.dataTransfer.files;
                        if (files.length > 0) {
                            handleFiles(files);
                        }
                    };
                    
                    uploadZoneClickHandler = function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        fileInput.click();
                    };
                }

                dropZone.addEventListener('dragover', dragOverHandler);
                dropZone.addEventListener('dragleave', dragLeaveHandler);
                dropZone.addEventListener('drop', dropHandler);
                uploadZone.addEventListener('click', uploadZoneClickHandler);
                dragListenersActive = true;
            }
        }

        function removeDragAndDrop() {
            if (dropZone && uploadZone && dragListenersActive) {
                dropZone.removeEventListener('dragover', dragOverHandler);
                dropZone.removeEventListener('dragleave', dragLeaveHandler);
                dropZone.removeEventListener('drop', dropHandler);
                uploadZone.removeEventListener('click', uploadZoneClickHandler);
                dropZone.classList.remove('drag-over');
                uploadContainer.classList.remove('dropBoxActive');
                dragListenersActive = false;
            }
        }

        function updateDragAndDrop() {
            removeDragAndDrop();
            initDragAndDrop();
        }

        // Initialize drag and drop
        initDragAndDrop();

        // Monitor dropBox class changes
        let lastDropBoxState = uploadContainer ? uploadContainer.classList.contains('dropBox') : false;
        
        setInterval(function() {
            if (uploadContainer) {
                const currentDropBoxState = uploadContainer.classList.contains('dropBox');
                if (currentDropBoxState !== lastDropBoxState) {
                    updateDragAndDrop();
                    lastDropBoxState = currentDropBoxState;
                }
            }
        }, 100);

        // Browse button functionality
        if (browseBtn) {
            browseBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                fileInput.click();
            });
        }
    }

    // Initialize all file uploads when DOM is ready
    function init() {
        try {
            initializeFileUploads();
        } catch (error) {
            console.warn('NDS File Upload initialization error:', error);
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            init();
        });
    } else {
        init();
    }

    // Global exports for external access
    window.NDS = window.NDS || {};
    window.NDS.Forms = window.NDS.Forms || {};
    window.NDS.Forms.FileUpload = {
        initializeFileUploads: initializeFileUploads,
        initFileUpload: initFileUpload,
        getInstance: function(element) {
            const uploadContainer = element.closest('.nds-file-upload');
            if (uploadContainer && uploadContainer.ndsFileUpload) {
                return uploadContainer.ndsFileUpload;
            }
            return null;
        },
        reinit: function() {
            initializeFileUploads();
        }
    };

    // Mark file upload script as loaded
    window.NDS.Forms.FileUpload._loaded = true;

})();