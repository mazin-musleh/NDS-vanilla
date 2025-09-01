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
                console.error('❌ File item template not found in container!');
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
            const progressCircle = fileItem.querySelector('.upload-progress-circle');
            const removeButton = fileItem.querySelector('.remove-file');
            const fileError = fileItem.querySelector('.file-error');
            const errorMessage = fileItem.querySelector('.error-message');
            
            if (fileName) fileName.textContent = file.name;
            if (fileSize) fileSize.textContent = formatFileSize(file.size);
            if (fileType) fileType.textContent = file.type || 'Unknown';
            if (fileStatus) fileStatus.textContent = getStatusText(status);
            if (removeButton) removeButton.setAttribute('data-file-id', fileData.id);
            
            // Handle icon vs progress bar vs error display
            if (status === 'uploading') {
                if (fileIcon) fileIcon.style.display = 'none';
                if (progressCircle) progressCircle.style.display = 'flex';
                if (fileError) fileError.style.display = 'none';
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
                fileItem.classList.remove('error');
            }
            
            // Update progress if uploading
            if (status === 'uploading' && fileData.progress > 0) {
                updateProgressInItem(fileItem, fileData.progress);
            }
            
            return fileItem;
        }
        
        function getStatusText(status) {
            const statusMap = {
                'ready': '',
                'uploading': 'Uploading...',
                'complete': 'Complete',
                'error': 'Failed'
            };
            return statusMap[status] || '';
        }
        
        function updateProgressInItem(fileItem, progress) {
            const progressElement = fileItem.querySelector('.upload-progress-circle');
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
            console.log('📋 updateFileList called, uploadedFiles.length:', uploadedFiles.length);
            fileList.innerHTML = '';
            
            if (uploadedFiles.length > 0) {
                uploadedFiles.forEach((fileData, index) => {
                    console.log('📋 Creating file item for:', fileData.file.name, 'with ID:', fileData.id);
                    const fileItem = createFileItem(fileData, index);
                    fileList.appendChild(fileItem);
                });
            }
            console.log('📋 updateFileList completed');
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

            console.log('🔄 handleFiles called with', fileArray.length, 'files');

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

            console.log('✅ Valid files:', validFiles.length, '❌ Invalid files:', errors.length);

            // Handle file storage based on upload type (check dynamically)
            const isSingleFile = uploadContainer.classList.contains('single-file');
            console.log('📁 Before file handling - uploadedFiles.length:', uploadedFiles.length);
            console.log('📁 isSingleFile (dynamic check):', isSingleFile);
            console.log('📁 validFiles.length:', validFiles.length);
            if (isSingleFile) {
                console.log('📁 Single file mode: replacing existing files');
                uploadedFiles = validFiles.slice(0, 1); // Replace with only first valid file
                console.log('📁 After replacement - uploadedFiles.length:', uploadedFiles.length);
            } else {
                console.log('📁 Multi file mode: adding to existing files');
                uploadedFiles = uploadedFiles.concat(validFiles);
                console.log('📁 After adding - uploadedFiles.length:', uploadedFiles.length);
            }

            // Get current config (dynamic)
            const config = getConfig();
            console.log('🔧 Current config at file handling:', config);

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
            console.log('📤 Dispatching beforeUpload event for:', fileData.file.name);
            uploadContainer.dispatchEvent(beforeUploadEvent);
            console.log('📤 beforeUpload event dispatched, cancel status:', beforeUploadEvent.detail.cancel);

            // Check if upload was cancelled
            if (beforeUploadEvent.detail.cancel) {
                console.log('📤 Upload cancelled by external handler');
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
                    const progressElement = fileItem?.querySelector('.upload-progress-circle');
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

        // Public API for external file upload control
        const fileUploadAPI = {
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
                console.log('🗑️ removeFile called with fileId:', fileId, 'type:', typeof fileId);
                console.log('🗑️ Current uploadedFiles:', uploadedFiles);
                const index = uploadedFiles.findIndex(f => f.id === fileId);
                console.log('🗑️ File index found:', index);
                if (index !== -1) {
                    uploadedFiles.splice(index, 1);
                    console.log('🗑️ File removed, calling updateFileList');
                    updateFileList();
                    console.log('🗑️ updateFileList completed');
                    return true;
                } else {
                    console.warn('🗑️ File not found in array for removal');
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
                    if (progress >= 100) {
                        file.status = 'complete';
                    } else if (file.status !== 'uploading') {
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

        // Store API instance on the container for external access
        uploadContainer._fileUploadInstance = fileUploadAPI;

        // Event listeners
        fileInput.addEventListener('change', function(e) {
            console.log('📂 File input change detected:', e.target.files.length, 'files');
            console.log('📂 Event target:', e.target);
            console.log('📂 Upload container:', uploadContainer);
            const currentConfig = getConfig();
            console.log('📂 Auto upload setting:', currentConfig.autoUpload);
            console.log('📂 Upload URL:', currentConfig.uploadUrl);
            if (e.target.files.length > 0) {
                console.log('📁 Processing files:', Array.from(e.target.files).map(f => f.name));
                handleFiles(e.target.files);
            } else {
                console.log('❌ No files selected');
            }
        });

        // Event delegation for remove buttons
        fileList.addEventListener('click', function(e) {
            console.log('🗑️ File list clicked:', e.target);
            const removeButton = e.target.closest('.remove-file');
            console.log('🗑️ Remove button found:', removeButton);
            if (removeButton) {
                e.preventDefault();
                e.stopPropagation();
                const fileId = removeButton.getAttribute('data-file-id');
                console.log('🗑️ File ID to remove:', fileId);
                const removedFile = uploadedFiles.find(f => f.id == fileId);
                console.log('🗑️ File to remove:', removedFile);
                
                if (removedFile) {
                    console.log('🗑️ Dispatching fileRemoved event');
                    // Dispatch event before removing
                    uploadContainer.dispatchEvent(new CustomEvent('fileRemoved', {
                        detail: { fileData: removedFile, fileId: fileId }
                    }));
                    
                    console.log('🗑️ Calling fileUploadAPI.removeFile');
                    fileUploadAPI.removeFile(fileId);
                } else {
                    console.warn('🗑️ File not found in uploadedFiles array');
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