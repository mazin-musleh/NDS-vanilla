// NDS Forms Controller - Form Control Logic
// File: nds-forms.js

(function () {
    'use strict';
    console.log('🔵 NDS Forms: Script loading and IIFE executing');
    console.log('🔵 Current URL:', window.location.href);
    console.log('🔵 Document title:', document.title);

    // Voice Recognition Module
    var VoiceRecognition = {
        audioFeedback: {
            context: null,

            init: function () {
                try {
                    this.context = new (window.AudioContext || window.webkitAudioContext)();
                } catch (e) {
                    this.context = null;
                }
            },

            playTone: function (frequency, duration) {
                if (!this.context) this.init();
                if (!this.context) return;

                try {
                    if (this.context.state === 'suspended') {
                        this.context.resume();
                    }

                    var osc = this.context.createOscillator();
                    var gain = this.context.createGain();
                    var now = this.context.currentTime;

                    osc.connect(gain).connect(this.context.destination);
                    osc.frequency.setValueAtTime(frequency, now);
                    osc.type = 'sine';

                    gain.gain.setValueAtTime(0.1, now);
                    gain.gain.exponentialRampToValueAtTime(0.01, now + duration / 1000);

                    osc.start(now);
                    osc.stop(now + duration / 1000);
                } catch (e) {
                    // Silent fail
                }
            },

            start: function () { this.playTone(800, 200); },
            end: function () { this.playTone(400, 300); },
            error: function () { this.playTone(200, 400); }
        },

        isSupported: function () {
            return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
        },

        getLanguage: function () {
            var lang = document.documentElement.lang || 'ar';
            return { ar: 'ar-SA', en: 'en-US' }[lang.split('-')[0]] || 'ar-SA';
        },

        create: function (options) {
            if (!this.isSupported()) return null;

            var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            var settings = Object.assign({
                continuous: false,
                interimResults: true,
                lang: this.getLanguage(),
                maxAlternatives: 1
            }, options);

            Object.assign(recognition, settings);
            return recognition;
        },

        startListening: function (recognition, callbacks) {
            if (!recognition) return;

            var finalTranscript = '';
            callbacks = callbacks || {};

            recognition.onstart = function () {
                VoiceRecognition.audioFeedback.start();
                if (callbacks.onStart) callbacks.onStart();
            };

            recognition.onresult = function (event) {
                var interimTranscript = '';

                for (var i = event.resultIndex; i < event.results.length; i++) {
                    var transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript;
                    } else {
                        interimTranscript += transcript;
                    }
                }

                if (callbacks.onResult) {
                    callbacks.onResult({
                        final: finalTranscript,
                        interim: interimTranscript,
                        isFinal: event.results[event.results.length - 1].isFinal
                    });
                }
            };

            recognition.onerror = function (event) {
                VoiceRecognition.audioFeedback.error();
                if (callbacks.onError) {
                    callbacks.onError(event.error);
                } else {
                    console.error('Speech recognition error:', event.error);
                }
            };

            recognition.onend = function () {
                VoiceRecognition.audioFeedback.end();
                if (callbacks.onEnd) callbacks.onEnd(finalTranscript);
            };

            recognition.start();
        },

        stopListening: function (recognition) {
            if (recognition) recognition.stop();
        }
    };

    // Utility functions
    function updateFormState(input, formControl) {
        var hasValue;
        
        if (input.type === 'checkbox' || input.type === 'radio') {
            hasValue = input.checked;
        } else {
            hasValue = input.value.trim() !== '';
        }

        formControl.classList.toggle('filled', hasValue);
        formControl.classList.toggle('disabled', input.disabled);

        // Show/hide clear button for text-based inputs only
        var clearButton = formControl.querySelector('.clear');
        if (clearButton && input.type !== 'radio' && input.type !== 'checkbox') {
            clearButton.classList.toggle('hidden', !hasValue);
        }
    }
    
    function updateRadioGroup(changedRadio, formControl) {
        if (changedRadio.type !== 'radio' || !changedRadio.name) return;
        
        var radioGroupContainer = changedRadio.closest('.nds-radio-group');
        if (!radioGroupContainer) return;
        
        var radioGroup = radioGroupContainer.querySelectorAll('input[type="radio"][name="' + changedRadio.name + '"]');
        radioGroup.forEach(function(radio) {
            if (radio !== changedRadio) {
                var radioFormControl = radio.closest('.nds-form-control');
                if (radioFormControl) {
                    updateFormState(radio, radioFormControl);
                }
            }
        });
    }

    function findPrimaryInput(container) {
        return container.querySelector('input[type="text"], input[type="email"], input[type="search"], textarea') ||
            container.querySelector('input, textarea');
    }

    function triggerEvents(element) {
        element.dispatchEvent(new Event('input', { bubbles: true }));
        element.dispatchEvent(new Event('change', { bubbles: true }));
    }

    // Auto-fill functionality
    function initAutoFillTags() {
        document.querySelectorAll('.nds-autoFill[data-target]').forEach(function (container) {
            var targetId = container.getAttribute('data-target');

            container.querySelectorAll('.nds-tag').forEach(function (tag) {
                if (tag._autoFillHandler) {
                    tag.removeEventListener('click', tag._autoFillHandler);
                }

                tag._autoFillHandler = function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    var tagText = (tag.textContent || tag.innerText).trim();
                    // Clean up excessive whitespace and normalize spaces
                    tagText = tagText.replace(/\s+/g, ' ');

                    var targetInput = document.getElementById(targetId) ||
                        document.querySelector('[name="' + targetId + '"]') ||
                        document.querySelector('[data-name="' + targetId + '"]');

                    if (targetInput && tagText) {
                        targetInput.value = tagText;
                        targetInput.focus();
                        triggerEvents(targetInput);

                        var formControl = targetInput.closest('.nds-form-control');
                        if (formControl) {
                            updateFormState(targetInput, formControl);
                        }
                    }
                };

                tag.addEventListener('click', tag._autoFillHandler);
            });
        });
    }


    // Form control functionality
    function initFormControlClasses() {
        document.querySelectorAll('.nds-form-control').forEach(function (formControl) {
            var inputElements = formControl.querySelectorAll('input, textarea, select');

            inputElements.forEach(function (input) {
                // Prevent duplicate event listeners
                if (input._ndsInitialized) return;
                input._ndsInitialized = true;

                // Mouse interaction
                input.addEventListener('mousedown', function () {
                    formControl.classList.add('active');
                });

                ['mouseup', 'mouseleave'].forEach(function (event) {
                    input.addEventListener(event, function () {
                        formControl.classList.remove('active');
                    });
                });

                // Focus states
                input.addEventListener('focus', function () {
                    formControl.classList.add('focus');
                });

                input.addEventListener('blur', function () {
                    formControl.classList.remove('focus');
                });

                // Value changes - use input for immediate feedback
                input.addEventListener('input', function () {
                    updateFormState(input, formControl);
                });

                // Also listen for change for form validation compatibility 
                input.addEventListener('change', function () {
                    updateFormState(input, formControl);
                    updateRadioGroup(input, formControl);
                });

                // Initialize state
                updateFormState(input, formControl);
                
                // Watch for all field status changes
                if (window.MutationObserver) {
                    var observer = new MutationObserver(function(mutations) {
                        mutations.forEach(function(mutation) {
                            if (mutation.type === 'attributes') {
                                var attr = mutation.attributeName;
                                if (attr === 'disabled' || attr === 'checked' || attr === 'value') {
                                    updateFormState(input, formControl);
                                    
                                    // Handle radio group updates for checked changes
                                    if (attr === 'checked') {
                                        updateRadioGroup(input, formControl);
                                    }
                                }
                            }
                        });
                    });
                    observer.observe(input, { 
                        attributes: true, 
                        attributeFilter: ['disabled', 'checked', 'value']
                    });
                }
                
                // Enhanced property change detection for programmatic updates
                try {
                    var originalValueDescriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(input), 'value');
                    var originalCheckedDescriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(input), 'checked');
                    
                    if (originalValueDescriptor && originalValueDescriptor.set) {
                        Object.defineProperty(input, 'value', {
                            get: originalValueDescriptor.get,
                            set: function(val) {
                                originalValueDescriptor.set.call(this, val);
                                updateFormState(this, formControl);
                            },
                            configurable: true
                        });
                    }
                    
                    if (originalCheckedDescriptor && originalCheckedDescriptor.set && (input.type === 'radio' || input.type === 'checkbox')) {
                        Object.defineProperty(input, 'checked', {
                            get: originalCheckedDescriptor.get,
                            set: function(val) {
                                var wasChecked = this.checked;
                                originalCheckedDescriptor.set.call(this, val);
                                updateFormState(this, formControl);
                                
                                // Handle radio group updates for programmatic changes
                                if (val && !wasChecked) {
                                    updateRadioGroup(this, formControl);
                                }
                            },
                            configurable: true
                        });
                    }
                } catch (e) {
                    console.warn('Property descriptor enhancement not supported:', e);
                }

                // Select dropdown open state handling
                if (input.tagName.toLowerCase() === 'select') {
                    initSelectDropdown(input, formControl);
                }
            });

            // Initialize form controls
            initVoiceInput(formControl);
            initPasswordToggle(formControl);
            initClearButton(formControl, inputElements);
        });
    }

    // Select dropdown functionality
    function initSelectDropdown(selectElement, formControl) {
        var isOpen = false;
        
        function updateOpenState() {
            formControl.classList.toggle('open', isOpen);
        }
        
        // Mouse interaction
        selectElement.addEventListener('mousedown', function (e) {
            isOpen = !isOpen;
            updateOpenState();
        });
        
        // Keyboard navigation
        selectElement.addEventListener('keydown', function (e) {
            var openKeys = ['ArrowDown', 'ArrowUp', 'Enter', ' '];
            var closeKeys = ['Escape', 'Tab'];
            
            if (openKeys.includes(e.key) && !isOpen) {
                isOpen = true;
                updateOpenState();
            } else if (closeKeys.includes(e.key)) {
                isOpen = false;
                updateOpenState();
            }
        });
        
        // Auto-close events
        ['blur', 'change'].forEach(function(event) {
            selectElement.addEventListener(event, function () {
                isOpen = false;
                updateOpenState();
            });
        });
    }

    // Voice input functionality
    function initVoiceInput(formControl) {
        var voiceButton = formControl.querySelector('.nds-form-action .voiceInput');
        if (!voiceButton) return;

        if (VoiceRecognition.isSupported()) {
            var isListening = false;
            var currentRecognition = null;

            voiceButton.addEventListener('click', function () {
                if (isListening) {
                    VoiceRecognition.stopListening(currentRecognition);
                    return;
                }

                var primaryInput = findPrimaryInput(formControl);
                if (!primaryInput) return;

                currentRecognition = VoiceRecognition.create();
                if (!currentRecognition) return;

                primaryInput.focus();

                VoiceRecognition.startListening(currentRecognition, {
                    onStart: function () {
                        isListening = true;
                        voiceButton.classList.add('listening');
                        formControl.classList.add('voice-active');
                    },

                    onResult: function (result) {
                        primaryInput.value = result.isFinal ? result.final.trim() : result.interim;
                        if (result.isFinal) {
                            triggerEvents(primaryInput);
                            updateFormState(primaryInput, formControl);
                        }
                    },

                    onError: function (error) {
                        console.warn('Voice recognition error:', error);
                        isListening = false;
                        voiceButton.classList.remove('listening');
                        formControl.classList.remove('voice-active');
                    },

                    onEnd: function () {
                        isListening = false;
                        voiceButton.classList.remove('listening');
                        formControl.classList.remove('voice-active');
                    }
                });
            });
        } else {
            voiceButton.style.display = 'none';
        }
    }

    // Password toggle functionality
    function initPasswordToggle(formControl) {
        var passwordToggle = formControl.querySelector('.nds-form-action .toggle-password');
        if (!passwordToggle) return;

        passwordToggle.addEventListener('click', function (e) {
            e.preventDefault();
            
            var passwordInput = formControl.querySelector('input[type="password"], input[type="text"]');
            if (!passwordInput) return;
            
            var isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            passwordToggle.classList.toggle('show', isPassword);
            passwordToggle.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
        });
    }


    // Clear button functionality
    function initClearButton(formControl, inputElements) {
        var clearButton = formControl.querySelector('.nds-form-action .clear');
        if (!clearButton) return;

        clearButton.addEventListener('click', function (e) {
            e.preventDefault();
            
            inputElements.forEach(function (input) {
                if (input.type === 'checkbox' || input.type === 'radio') {
                    input.checked = false;
                } else {
                    input.value = '';
                }
                triggerEvents(input);
                updateFormState(input, formControl);
            });
        });
    }

    // Initialize all form functionality
    function init() {
        console.log('🟢 NDS Forms: Main init() function called');
        try {
            VoiceRecognition.audioFeedback.init();
            initFormControlClasses();
            initAutoFillTags();
            console.log('🔄 NDS Forms: About to call initializeFileUploads()');
            initializeFileUploads();
            console.log('✅ NDS Forms: init() completed successfully');
        } catch (error) {
            console.error('❌ NDS Forms initialization error:', error);
        }
    }

    // Initialize when DOM is ready
    console.log('🚀 NDS Forms: Script loaded, document.readyState =', document.readyState);
    if (document.readyState === 'loading') {
        console.log('🚀 NDS Forms: Adding DOMContentLoaded listener');
        document.addEventListener('DOMContentLoaded', function() {
            console.log('🚀 NDS Forms: DOMContentLoaded fired, calling init()');
            init();
        });
    } else {
        console.log('🚀 NDS Forms: DOM already ready, calling init() immediately');
        init();
    }

    // Global exports for external access
    window.NDS = window.NDS || {};
    window.NDS.Forms = {
        VoiceRecognition: VoiceRecognition,
        reinit: init,
        updateFormState: updateFormState
    };
    
    // File Upload functionality
    function initializeFileUploads() {
        console.log('🚀 NDS Forms: Starting file upload initialization...');
        const fileUploadElements = document.querySelectorAll('.nds-file-upload');
        console.log(`📁 NDS Forms: Found ${fileUploadElements.length} file upload elements on page`);
        if (fileUploadElements.length === 0) {
            console.warn('⚠️ NDS Forms: No file upload elements found! Looking for elements with class "nds-file-upload"');
        }
        fileUploadElements.forEach((element, index) => {
            console.log(`✅ NDS Forms: Initializing file upload ${index + 1}:`, element);
            initFileUpload(element);
        });
        console.log('✨ NDS Forms: File upload initialization complete!');
    }

    function initFileUpload(uploadContainer) {
        console.log('🔧 Initializing file upload container:', uploadContainer);
        console.log('🔧 Container classes:', uploadContainer.className);
        console.log('🔧 Container ID:', uploadContainer.id);
        
        const fileInput = uploadContainer.querySelector('input[type="file"]');
        const dropZone = uploadContainer.querySelector('.nds-form-control');
        const fileList = uploadContainer.querySelector('.file-list');
        const uploadZone = uploadContainer.querySelector('.upload-zone');
        const browseBtn = uploadContainer.querySelector('.browse-btn');
        
        console.log('📋 Found elements:', {
            fileInput: !!fileInput,
            fileInputId: fileInput ? fileInput.id : 'none',
            dropZone: !!dropZone,
            dropZoneId: dropZone ? dropZone.id : 'none', 
            fileList: !!fileList,
            fileListId: fileList ? fileList.id : 'none',
            uploadZone: !!uploadZone,
            browseBtn: !!browseBtn
        });
        
        if (!fileInput) {
            console.error('❌ No file input found in upload container');
            return;
        }
        if (!dropZone) {
            console.error('❌ No drop zone found in upload container');
            return;
        }
        if (!fileList) {
            console.error('❌ No file list found in upload container');
            return;
        }
        const isSingleFile = uploadContainer.classList.contains('single-file');
        const isMultiple = fileInput.hasAttribute('multiple');
        let uploadedFiles = [];

        // Configuration from data attributes
        const config = {
            uploadUrl: uploadContainer.dataset.uploadUrl || null,
            autoUpload: uploadContainer.dataset.autoUpload === 'true',
            maxFileSize: parseInt(uploadContainer.dataset.maxFileSize) || 10 * 1024 * 1024, // 10MB default
            allowedTypes: uploadContainer.dataset.allowedTypes?.split(',') || null
        };

        // Utility functions
        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }

        function getFileIcon(fileName) {
            const extension = fileName.split('.').pop().toLowerCase();
            const icons = {
                'pdf': 'hgi-file-pdf',
                'doc': 'hgi-file-text',
                'docx': 'hgi-file-text',
                'txt': 'hgi-file-text',
                'jpg': 'hgi-image-01',
                'jpeg': 'hgi-image-01',
                'png': 'hgi-image-01',
                'gif': 'hgi-image-01'
            };
            return icons[extension] || 'hgi-file-unknown-01';
        }

        function createProgressBar() {
            const progressBar = document.createElement('div');
            progressBar.className = 'upload-progress';
            progressBar.innerHTML = `
                <svg class="progress-circle" width="24" height="24" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="var(--border-neutral-primary)" stroke-width="2"/>
                    <circle class="progress-fill" cx="12" cy="12" r="10" fill="none" stroke="var(--button-background-primary-default)" 
                            stroke-width="2" stroke-dasharray="62.83" stroke-dashoffset="62.83" 
                            transform="rotate(-90 12 12)" stroke-linecap="round"/>
                </svg>
                <span class="progress-text">0%</span>
            `;
            return progressBar;
        }

        function updateProgress(progressElement, percentage) {
            const circle = progressElement.querySelector('.progress-fill');
            const text = progressElement.querySelector('.progress-text');
            const circumference = 62.83; // 2 * Math.PI * 10
            const offset = circumference - (percentage / 100) * circumference;
            
            circle.style.strokeDashoffset = offset;
            text.textContent = Math.round(percentage) + '%';
        }

        function createFileItem(file, index, uploadStatus = 'ready') {
            const fileItem = document.createElement('div');
            fileItem.className = `file-item ${uploadStatus}`;
            fileItem.dataset.index = index;
            
            const iconHtml = uploadStatus === 'uploading' 
                ? createProgressBar().outerHTML
                : `<i class="hgi hgi-stroke ${getFileIcon(file.name)} file-icon"></i>`;

            fileItem.innerHTML = `
                ${iconHtml}
                <div class="file-info">
                    <div class="file-name">${file.name}</div>
                    <div class="file-details">
                        <span class="file-size">${formatFileSize(file.size)}</span>
                        <span class="file-type">${file.type || 'Unknown'}</span>
                        <span class="file-status"></span>
                    </div>
                </div>
                <div class="file-actions">
                    <button type="button" class="remove-file" aria-label="Remove file" data-index="${index}">
                        <i class="hgi hgi-stroke hgi-trash-01"></i>
                    </button>
                </div>
            `;
            return fileItem;
        }

        function updateFileList() {
            fileList.innerHTML = '';
            
            if (uploadedFiles.length > 0) {
                uploadedFiles.forEach((fileData, index) => {
                    const fileItem = createFileItem(fileData.file, index, fileData.status);
                    fileList.appendChild(fileItem);
                });

                // Add event listeners for remove buttons
                fileList.querySelectorAll('.remove-file').forEach(button => {
                    button.addEventListener('click', function() {
                        const index = parseInt(this.getAttribute('data-index'));
                        const removedFile = uploadedFiles[index];
                        
                        // Dispatch event before removing
                        uploadContainer.dispatchEvent(new CustomEvent('fileRemoved', {
                            detail: { file: removedFile, index: index }
                        }));
                        
                        uploadedFiles.splice(index, 1);
                        updateFileList();
                    });
                });
            }
        }

        function validateFile(file) {
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

            console.log('🔄 handleFiles called with', fileArray.length, 'files');

            // Validate files
            fileArray.forEach(file => {
                const fileErrors = validateFile(file);
                if (fileErrors.length === 0) {
                    validFiles.push({
                        file: file,
                        status: 'ready',
                        progress: 0,
                        id: Date.now() + Math.random()
                    });
                } else {
                    errors.push({ file: file, errors: fileErrors });
                }
            });

            console.log('✅ Valid files:', validFiles.length, '❌ Invalid files:', errors.length);

            // Handle file storage based on upload type
            if (isSingleFile) {
                uploadedFiles = validFiles.slice(0, 1); // Take only first valid file
            } else {
                uploadedFiles = uploadedFiles.concat(validFiles);
            }

            // Don't immediately show files in list if auto-upload is enabled
            // Let the upload simulation handle the display
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
                    console.log('🚀 Starting auto-upload for', validFiles.length, 'files');
                    validFiles.forEach(fileData => uploadFile(fileData));
                } else {
                    console.log('⏸️ Auto-upload disabled, files ready for manual upload');
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

            console.log('📤 Starting upload for:', fileData.file.name, 'with ID:', fileData.id);

            // Update status to uploading and show in list
            uploadedFiles[index].status = 'uploading';
            updateFileList();

            const formData = new FormData();
            formData.append('file', fileData.file);

            // Allow modification of form data before upload
            const beforeUploadEvent = new CustomEvent('beforeUpload', {
                detail: { 
                    fileData: fileData, 
                    formData: formData,
                    cancel: false
                }
            });
            uploadContainer.dispatchEvent(beforeUploadEvent);

            // Check if upload was cancelled
            if (beforeUploadEvent.detail.cancel) {
                uploadedFiles[index].status = 'ready';
                updateFileList();
                return;
            }

            const xhr = new XMLHttpRequest();

            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable) {
                    const percentComplete = (e.loaded / e.total) * 100;
                    uploadedFiles[index].progress = percentComplete;
                    
                    // Update progress bar
                    const fileItem = fileList.querySelector(`[data-index="${index}"]`);
                    const progressElement = fileItem?.querySelector('.upload-progress');
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

            xhr.open('POST', config.uploadUrl);
            xhr.send(formData);
        }

        // Public API for manual upload
        uploadContainer.uploadFiles = function(files = null) {
            const filesToUpload = files || uploadedFiles.filter(f => f.status === 'ready');
            filesToUpload.forEach(fileData => uploadFile(fileData));
        };

        // Store instance data on the container for external access
        uploadContainer._fileUploadInstance = {
            uploadedFiles: uploadedFiles,
            updateFileList: updateFileList,
            uploadFiles: function(files = null) {
                const filesToUpload = files || uploadedFiles.filter(f => f.status === 'ready');
                filesToUpload.forEach(fileData => uploadFile(fileData));
            }
        };

        // Event listeners
        fileInput.addEventListener('change', function(e) {
            console.log('📂 File input change detected:', e.target.files.length, 'files');
            console.log('📂 Event target:', e.target);
            console.log('📂 Upload container:', uploadContainer);
            console.log('📂 Auto upload setting:', config.autoUpload);
            console.log('📂 Upload URL:', config.uploadUrl);
            if (e.target.files.length > 0) {
                console.log('📁 Processing files:', Array.from(e.target.files).map(f => f.name));
                handleFiles(e.target.files);
            } else {
                console.log('❌ No files selected');
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
                        console.log('🎯 Upload zone clicked');
                        console.log('🎯 Event target:', e.target);
                        console.log('🎯 File input:', fileInput);
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
            console.log('🔘 Setting up browse button event listener');
            browseBtn.addEventListener('click', function(e) {
                console.log('🔘 Browse button clicked, triggering file input click');
                console.log('🔘 Event details:', e);
                console.log('🔘 File input element:', fileInput);
                console.log('🔘 File input disabled?', fileInput.disabled);
                e.preventDefault();
                e.stopPropagation();
                fileInput.click();
            });
        } else {
            console.log('⚠️ No browse button found in file upload container');
        }
    }

    // Backward compatibility
    window.VoiceRecognition = VoiceRecognition;
    window.reinitFormControlClasses = init;

    // Enhanced global exports
    window.NDS.Forms.FileUpload = {
        initializeFileUploads: initializeFileUploads,
        getInstance: function(element) {
            const uploadContainer = element.closest('.nds-file-upload');
            if (uploadContainer && uploadContainer._fileUploadInstance) {
                return uploadContainer._fileUploadInstance;
            }
            return null;
        },
        // Manual re-initialization for debugging
        reinit: function() {
            console.log('🔄 Manual re-initialization requested');
            initializeFileUploads();
        }
    };

    // Mark forms script as loaded
    window.NDS.Forms._loaded = true;
    console.log('✅ NDS Forms script fully loaded and exported');

    // File uploads are now initialized as part of the main init() function

})();