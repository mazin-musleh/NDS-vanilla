/**
 * National Design System - Showcase JavaScript
 * Common functionality for component demonstration pages
 * 
 * Toggle Button Formats:
 * 
 * Class toggling (default):
 * data-toggler='["class1 class2", ".target", "type"]'
 * 
 * Attribute toggling:
 * data-toggler='["attr1=value1 attr2", ".target", "type", "attr"]'
 * data-toggler='["disabled checked", ".target", "type", "attr"]'  // for boolean attributes
 * 
 * Multiple operations:
 * data-toggler='[["class1", ".target1", "type1"], ["attr1=val1", ".target2", "type2", "attr"]]'
 */

(function() {
    'use strict';

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initializeCopyButtons();
        initializeDemoToggleButtons();
        initializeDirectionSwitcher();
        initializeFakeFileUpload();
    });

    // Copy functionality for code examples
    function initializeCopyButtons() {
        // Event delegation for all copy buttons
        document.addEventListener('click', function(e) {
            const copyBtn = e.target.closest('.copy-btn');
            if (copyBtn) {
                handleCopyClick(copyBtn);
            }
        });
    }

    function handleCopyClick(button) {
        const codeBlock = button.closest('.code-example').querySelector('code');
        if (!codeBlock) {
            console.error('Could not find code element for copy button');
            return;
        }

        const textToCopy = codeBlock.textContent;
        
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                showCopyFeedback(button);
            }).catch(err => {
                console.error('Failed to copy to clipboard:', err);
                fallbackCopy(textToCopy, button);
            });
        } else {
            fallbackCopy(textToCopy, button);
        }
    }

    function fallbackCopy(text, button) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showCopyFeedback(button);
        } catch (err) {
            console.error('Fallback copy failed:', err);
        }
        
        document.body.removeChild(textArea);
    }

    function showCopyFeedback(button) {
        const originalIcon = button.innerHTML;
        button.innerHTML = '<i class="hgi hgi-stroke hgi-checkmark-circle-01"></i>';
        button.classList.add('copied');

        setTimeout(() => {
            button.innerHTML = originalIcon;
            button.classList.remove('copied');
        }, 2000);
    }


    function updateButtonsForBackground(container, bgType) {
        const buttons = container.querySelectorAll('.nds-btn');
        
        buttons.forEach(button => {
            if (bgType === 'colored') {
                // Add oncolor class for colored backgrounds
                if (!button.classList.contains('nds-btn-oncolor')) {
                    button.classList.add('nds-btn-oncolor');
                }
            } else {
                // Remove oncolor class for default/none background
                button.classList.remove('nds-btn-oncolor');
            }
        });
    }


    // Demo toggle button functionality
    function initializeDemoToggleButtons() {
        // Initialize cards with default backgrounds based on data attributes
        document.querySelectorAll('.nds-demo-card').forEach(card => {
            const demoContainer = card.querySelector('.demo-container');
            const hasOncolorButtons = demoContainer && demoContainer.querySelector('.nds-btn-oncolor');
            
            // Find first background toggle button for initialization by looking for any background-related toggles
            const firstBgButton = card.querySelector('.demo-toggle-btn[data-toggler*="Bg"], .demo-toggle-btn[data-toggler*="bg"]');
            
            if (hasOncolorButtons && firstBgButton) {
                // Trigger click on first button to apply initial state
                firstBgButton.click();
            }
        });
        
        // Event delegation for all demo toggle buttons
        document.addEventListener('click', function(e) {
            const toggleBtn = e.target.closest('.demo-toggle-btn');
            if (toggleBtn) {
                handleToggleClick(toggleBtn);
            }
        });
    }

    function handleToggleClick(button) {
        // Check for new data-toggler format first
        const togglerData = button.getAttribute('data-toggler');
        let togglePairs = [];
        
        if (togglerData) {
            try {
                const parsed = JSON.parse(togglerData);
                
                if (Array.isArray(parsed) && parsed.length >= 2) {
                    // Check if it's a single operation or multiple operations
                    if (typeof parsed[0] === 'string') {
                        // Single operation: ["class1 class2" or "attr1=val1 attr2", "target", "type", "operation"]
                        togglePairs = [[parsed[0], parsed[1], parsed[2], parsed[3]]];
                    } else {
                        // Multiple operations: [["class1 class2", "target1", "type1", "operation1"], ["attr1=val1", "target2", "type2", "attr"]]
                        togglePairs = parsed;
                    }
                } else {
                    console.error('data-toggler must be ["classes/attributes", "target", "type?", "operation?"] or multiple arrays');
                    return;
                }
            } catch (e) {
                console.error('Invalid JSON in data-toggler attribute:', e);
                return;
            }
        } else {
            // Fallback to legacy data attributes for backward compatibility
            const toggleClass = button.getAttribute('data-toggle');
            const targetSelector = button.getAttribute('data-target') || button.getAttribute('data-default-target');
            
            if (!toggleClass) {
                console.error('Toggle button missing data-toggle or data-toggler attribute');
                return;
            }
            
            togglePairs = [[toggleClass, targetSelector]];
        }

        const demoCard = button.closest('.nds-demo-card');
        if (!demoCard) {
            console.error('Toggle button must be inside a demo card');
            return;
        }

        // Process each toggle operation
        togglePairs.forEach(([classNamesOrAttrs, targetSelector, type, operation]) => {
            if (!classNamesOrAttrs || !targetSelector) {
                console.error('Each toggle operation must have ["classes/attributes", "target", "type?", "operation?"]');
                return;
            }
            
            // Determine operation type: "class" (default) or "attr"
            const operationType = operation || 'class';
            
            let targetElement;
            
            // Always find the target relative to the demo card
            if (targetSelector.startsWith('#')) {
                const idSelector = targetSelector.substring(1);
                const idParts = idSelector.split(' ');
                const elementId = idParts[0];
                const subSelector = idParts.slice(1).join(' ');
                
                const elementById = demoCard.querySelector(`#${elementId}`);
                if (elementById && subSelector) {
                    targetElement = elementById.querySelector(subSelector);
                } else {
                    targetElement = elementById;
                }
            } else {
                // For complex selectors (like '.class element' or '.class[attr]'), use querySelector directly
                if (targetSelector.includes(' ') || targetSelector.includes('[') || targetSelector.includes(':')) {
                    targetElement = demoCard.querySelector(targetSelector);
                } else if (targetSelector.startsWith('.')) {
                    // For simple single class selectors, ensure exact match to avoid matching classes that contain the target class
                    const className = targetSelector.substring(1);
                    const allElements = demoCard.querySelectorAll('*');
                    targetElement = Array.from(allElements).find(el => 
                        el.classList.contains(className) && 
                        Array.from(el.classList).includes(className)
                    );
                } else {
                    targetElement = demoCard.querySelector(targetSelector);
                }
            }

            // Find ALL matching elements, not just the first one
            let targetElements = [];
            
            // Always find the target relative to the demo card
            if (targetSelector.startsWith('#')) {
                const idSelector = targetSelector.substring(1);
                const idParts = idSelector.split(' ');
                const elementId = idParts[0];
                const subSelector = idParts.slice(1).join(' ');
                
                const elementById = demoCard.querySelector(`#${elementId}`);
                if (elementById && subSelector) {
                    targetElements = Array.from(elementById.querySelectorAll(subSelector));
                } else if (elementById) {
                    targetElements = [elementById];
                }
            } else {
                // For complex selectors (like '.class element' or '.class[attr]'), use querySelectorAll directly
                if (targetSelector.includes(' ') || targetSelector.includes('[') || targetSelector.includes(':')) {
                    targetElements = Array.from(demoCard.querySelectorAll(targetSelector));
                } else if (targetSelector.startsWith('.')) {
                    // For simple single class selectors, use the exact match logic
                    const className = targetSelector.substring(1);
                    const allElements = demoCard.querySelectorAll('*');
                    targetElements = Array.from(allElements).filter(el => 
                        el.classList.contains(className) && 
                        Array.from(el.classList).includes(className)
                    );
                } else {
                    targetElements = Array.from(demoCard.querySelectorAll(targetSelector));
                }
            }

            if (!targetElements.length) {
                console.error('Target elements not found:', targetSelector, 'in demo card');
                return;
            }
            
            // Apply changes to ALL matching elements
            targetElements.forEach(targetElement => {
                if (operationType === 'attr') {
                    // Handle attribute toggling
                    handleAttributeToggling(targetElement, classNamesOrAttrs, demoCard);
                } else {
                    // Handle class toggling (default behavior)
                    const classArray = classNamesOrAttrs.trim().split(/\s+/);
                    
                    classArray.forEach(className => {
                        if (className) {
                            targetElement.classList.toggle(className);
                        }
                    });
                    
                    // Special handling for VerticalTabs: trigger scroll logic after any oneRowContent change
                    if (type === 'VerticalTabs' && classArray.includes('oneRowContent')) {
                        setTimeout(() => {
                            if (window.initializeRowScroll) {
                                window.initializeRowScroll(true); // Force update for already initialized elements
                            }
                        }, 100);
                    }
                    
                    // Handle code updates for specific class changes
                    updateCodeExampleForClasses(demoCard, targetElement, classArray);
                }
            });
        });
        
        // Simple button selection: just toggle the clicked button and handle type-based mutual exclusion
        const buttonTogglerData = button.getAttribute('data-toggler');
        if (buttonTogglerData) {
            try {
                const parsed = JSON.parse(buttonTogglerData);
                let operations = [];
                
                if (Array.isArray(parsed) && parsed.length >= 2) {
                    if (typeof parsed[0] === 'string') {
                        operations = [[parsed[0], parsed[1], parsed[2]]];
                    } else {
                        operations = parsed;
                    }
                }
                
                // Get unique types for this button
                const buttonTypes = [...new Set(operations.map(([,, type]) => type || 'default'))];
                
                // Handle type-based mutual exclusion for single-type buttons only
                if (buttonTypes.length === 1) {
                    const buttonType = buttonTypes[0];
                    
                    // First, deselect other buttons with the same type (if any are selected)
                    const allTogglers = demoCard.querySelectorAll('[data-toggler]');
                    allTogglers.forEach(otherButton => {
                        if (otherButton === button) return;
                        
                        const otherData = otherButton.getAttribute('data-toggler');
                        if (otherData) {
                            try {
                                const otherParsed = JSON.parse(otherData);
                                let otherOperations = [];
                                
                                if (Array.isArray(otherParsed) && otherParsed.length >= 2) {
                                    if (typeof otherParsed[0] === 'string') {
                                        otherOperations = [[otherParsed[0], otherParsed[1], otherParsed[2]]];
                                    } else {
                                        otherOperations = otherParsed;
                                    }
                                }
                                
                                const otherTypes = [...new Set(otherOperations.map(([,, type]) => type || 'default'))];
                                
                                // Deselect if other button is single-type, same type, and currently selected
                                if (otherTypes.length === 1 && otherTypes[0] === buttonType && otherButton.classList.contains('selected')) {
                                    otherButton.classList.remove('selected');
                                    
                                    // Also reverse the changes for the deselected button
                                    otherOperations.forEach(([classNamesOrAttrs, targetSelector, , otherOperation]) => {
                                        if (!classNamesOrAttrs || !targetSelector) return;
                                        
                                        // Determine operation type for deselection
                                        const deselectionOperationType = otherOperation || 'class';
                                        
                                        let targetElement;
                                        
                                        // Find target element same way as main logic
                                        if (targetSelector.startsWith('#')) {
                                            const idSelector = targetSelector.substring(1);
                                            const idParts = idSelector.split(' ');
                                            const elementId = idParts[0];
                                            const subSelector = idParts.slice(1).join(' ');
                                            
                                            const elementById = demoCard.querySelector(`#${elementId}`);
                                            if (elementById && subSelector) {
                                                targetElement = elementById.querySelector(subSelector);
                                            } else {
                                                targetElement = elementById;
                                            }
                                        } else {
                                            // For complex selectors (like '.class element' or '.class[attr]'), use querySelector directly
                                            if (targetSelector.includes(' ') || targetSelector.includes('[') || targetSelector.includes(':')) {
                                                targetElement = demoCard.querySelector(targetSelector);
                                            } else if (targetSelector.startsWith('.')) {
                                                // For simple single class selectors, ensure exact match to avoid matching classes that contain the target class
                                                const className = targetSelector.substring(1);
                                                const allElements = demoCard.querySelectorAll('*');
                                                targetElement = Array.from(allElements).find(el => 
                                                    el.classList.contains(className) && 
                                                    Array.from(el.classList).includes(className)
                                                );
                                            } else {
                                                targetElement = demoCard.querySelector(targetSelector);
                                            }
                                        }
                                        
                                        // Find ALL matching elements for deselection too
                                        let deselectionTargetElements = [];
                                        
                                        if (targetSelector.startsWith('#')) {
                                            const idSelector = targetSelector.substring(1);
                                            const idParts = idSelector.split(' ');
                                            const elementId = idParts[0];
                                            const subSelector = idParts.slice(1).join(' ');
                                            
                                            const elementById = demoCard.querySelector(`#${elementId}`);
                                            if (elementById && subSelector) {
                                                deselectionTargetElements = Array.from(elementById.querySelectorAll(subSelector));
                                            } else if (elementById) {
                                                deselectionTargetElements = [elementById];
                                            }
                                        } else {
                                            // For complex selectors (like '.class element' or '.class[attr]'), use querySelectorAll directly
                                            if (targetSelector.includes(' ') || targetSelector.includes('[') || targetSelector.includes(':')) {
                                                deselectionTargetElements = Array.from(demoCard.querySelectorAll(targetSelector));
                                            } else if (targetSelector.startsWith('.')) {
                                                // For simple single class selectors, use the exact match logic
                                                const className = targetSelector.substring(1);
                                                const allElements = demoCard.querySelectorAll('*');
                                                deselectionTargetElements = Array.from(allElements).filter(el => 
                                                    el.classList.contains(className) && 
                                                    Array.from(el.classList).includes(className)
                                                );
                                            } else {
                                                deselectionTargetElements = Array.from(demoCard.querySelectorAll(targetSelector));
                                            }
                                        }
                                        
                                        if (deselectionTargetElements.length) {
                                            deselectionTargetElements.forEach(targetElement => {
                                                const otherButtonType = otherTypes[0]; // We know it's single type
                                                
                                                if (deselectionOperationType === 'attr') {
                                                    // Handle attribute deselection - toggle attributes back to original state
                                                    handleAttributeToggling(targetElement, classNamesOrAttrs, demoCard);
                                                } else {
                                                    // Handle class deselection (default behavior)
                                                    const classArray = classNamesOrAttrs.trim().split(/\s+/);
                                                    
                                                    classArray.forEach(className => {
                                                        if (className && targetElement.classList.contains(className)) {
                                                            targetElement.classList.remove(className);
                                                        }
                                                    });
                                                    
                                                    // Special handling for VerticalTabs deselection: trigger scroll logic after any oneRowContent change
                                                    if (otherButtonType === 'VerticalTabs' && classArray.includes('oneRowContent')) {
                                                        setTimeout(() => {
                                                            if (window.initializeRowScroll) {
                                                                window.initializeRowScroll(true); // Force update for already initialized elements
                                                            }
                                                        }, 100);
                                                    }
                                                    
                                                    // Update code example after removing classes
                                                    updateCodeExampleForClasses(demoCard, targetElement, classArray);
                                                }
                                            });
                                        }
                                    });
                                }
                            } catch (e) {
                                // Ignore invalid JSON
                            }
                        }
                    });
                }
                
                // Now toggle the clicked button
                button.classList.toggle('selected');
                
            } catch (e) {
                // Fallback: just toggle the button
                button.classList.toggle('selected');
            }
        } else {
            // Fallback: just toggle the button
            button.classList.toggle('selected');
        }
    }

    // Handle attribute toggling for target element
    function handleAttributeToggling(targetElement, attributeString, demoCard) {
        // Parse attribute string format: "attr1=value1 attr2=value2" or "attr1 attr2" (for boolean attributes)
        const attributePairs = attributeString.trim().split(/\s+/);
        
        attributePairs.forEach(attrPair => {
            if (!attrPair) return;
            
            const [attrName, attrValue] = attrPair.split('=');
            
            if (attrValue !== undefined) {
                // Attribute with value: toggle between value and empty/null
                if (targetElement.getAttribute(attrName) === attrValue) {
                    targetElement.removeAttribute(attrName);
                } else {
                    targetElement.setAttribute(attrName, attrValue);
                }
            } else {
                // Boolean attribute: toggle presence
                if (targetElement.hasAttribute(attrName)) {
                    targetElement.removeAttribute(attrName);
                } else {
                    targetElement.setAttribute(attrName, '');
                }
            }
            
        });
        
        // Update code example for attribute changes
        updateCodeExampleForAttributes(demoCard, targetElement, attributePairs);
    }

    // Update code example for attribute changes
    function updateCodeExampleForAttributes(demoCard, changedElement, changedAttributes) {
        const codeElement = demoCard.querySelector('.code-example code');
        if (!codeElement) return;
        
        if (!changedElement || !changedAttributes) return;
        
        let updatedCode = codeElement.textContent;
        
        // Get the tag name and first class to identify the element in the code
        const tagName = changedElement.tagName.toLowerCase();
        const firstClass = Array.from(changedElement.classList)[0];
        
        if (!firstClass) return;
        
        // Find the element in the code by tag and first class
        const elementRegex = new RegExp(
            `<${tagName}([^>]*class="[^"]*\\b${firstClass.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&")}\\b[^"]*"[^>]*)>`,
            'gi'
        );
        
        updatedCode = updatedCode.replace(elementRegex, (match, attributes) => {
            let elementAttributes = attributes;
            
            // For each changed attribute, update it in the code
            changedAttributes.forEach(attrPair => {
                const [attrName, attrValue] = attrPair.split('=');
                const currentValue = changedElement.getAttribute(attrName);
                
                // Remove existing attribute from the match
                const attrRegex = new RegExp(`\\s+${attrName.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&")}(?:="[^"]*")?`, 'gi');
                elementAttributes = elementAttributes.replace(attrRegex, '');
                
                // Add attribute if it exists on the element
                if (currentValue !== null) {
                    if (currentValue === '') {
                        // Boolean attribute
                        elementAttributes += ` ${attrName}`;
                    } else {
                        // Attribute with value
                        elementAttributes += ` ${attrName}="${currentValue}"`;
                    }
                }
            });
            
            return `<${tagName}${elementAttributes}>`;
        });
        
        codeElement.textContent = updatedCode;
    }


    // Update code example for specific class changes only
    function updateCodeExampleForClasses(demoCard, changedElement, changedClasses) {
        const codeElement = demoCard.querySelector('.code-example code');
        if (!codeElement) return;
        
        if (!changedElement || !changedClasses) return;
        
        let updatedCode = codeElement.textContent;
        
        // Get the base class name (first class) of the changed element to identify it in the code
        const baseClassName = Array.from(changedElement.classList)[0];
        if (!baseClassName) return;
        
        // Find the class attribute for this element
        const classRegex = new RegExp(`class="([^"]*\\s+)?${baseClassName.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&")}(\\s[^"]*)?"`, 'g');
        
        updatedCode = updatedCode.replace(classRegex, (match) => {
            const classMatch = match.match(/class="([^"]*)"/);
            if (!classMatch) return match;
            
            let existingClasses = classMatch[1].split(/\s+/).filter(Boolean);
            const classesInMatch = [...existingClasses];
            
            // Only update if this element contains the base class
            if (!classesInMatch.includes(baseClassName)) return match;
            
            // For each changed class, toggle it in the code
            changedClasses.forEach(className => {
                if (changedElement.classList.contains(className)) {
                    // Class is present on element, add it to code if not already there
                    if (!existingClasses.includes(className)) {
                        existingClasses.push(className);
                    }
                } else {
                    // Class is not on element, remove it from code
                    existingClasses = existingClasses.filter(cls => cls !== className);
                }
            });
            
            return `class="${existingClasses.join(' ')}"`;
        });
        
        codeElement.textContent = updatedCode;
    }

    // RTL/LTR Direction Switcher - Cookie-based System
    function initializeDirectionSwitcher() {
        // Get current language: URL parameter takes priority, then cookie, then default to 'en'
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        const cookieLang = getCookie('preferred-language');
        const currentLang = urlLang || cookieLang || 'en';
        
        // If URL parameter exists, update cookie and remove URL parameter
        if (urlLang) {
            setCookie('preferred-language', urlLang, 365); // Store for 1 year
            // Clean URL by removing language parameter
            const cleanUrl = new URL(window.location);
            cleanUrl.searchParams.delete('lang');
            window.history.replaceState({}, document.title, cleanUrl.pathname + cleanUrl.search);
        } else if (!cookieLang) {
            // Set default cookie if none exists
            setCookie('preferred-language', currentLang, 365);
        }
        
        // Update the language display in header
        const currentLangLabel = document.getElementById('currentLangLabel');
        if (currentLangLabel) {
            currentLangLabel.textContent = currentLang === 'ar' ? 'العربية' : 'English';
        }
        
        // Set HTML attributes for current language
        document.documentElement.setAttribute('lang', currentLang);
        document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
        
        // Handle language toggle button click
        const langToggleBtn = document.getElementById('langToggleBtn');
        if (langToggleBtn) {
            langToggleBtn.addEventListener('click', function() {
                // Toggle to opposite language
                const targetLang = currentLang === 'ar' ? 'en' : 'ar';
                
                // Update cookie directly
                setCookie('preferred-language', targetLang, 365);
                
                // Reload page to apply new language
                window.location.reload();
            });
        }
    }

    // Cookie utility functions for RTL/LTR switcher
    function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Fake file upload for demonstration purposes
    function initializeFakeFileUpload() {
        // Set up fake upload URLs for demo containers
        document.querySelectorAll('.nds-file-upload').forEach(container => {
            if (!container.dataset.uploadUrl) {
                container.dataset.uploadUrl = '/demo/upload';
                container.dataset.autoUpload = 'true';
            }
        });

        // Listen for beforeUpload events to intercept and simulate uploads
        document.addEventListener('beforeUpload', function(e) {
            const fileData = e.detail.fileData;
            const formData = e.detail.formData;
            const uploadContainer = e.target;
            
            console.log('Before upload (demo):', fileData.file.name);
            
            // Cancel the real upload and start fake upload instead
            e.detail.cancel = true;
            
            // Add demo metadata to form data
            formData.append('demo', 'true');
            formData.append('timestamp', Date.now().toString());
            
            // Start fake upload simulation
            simulateFileUpload(uploadContainer, fileData);
        });
    }

    function simulateFileUpload(uploadContainer, fileData) {
        const file = fileData.file;
        let progress = 0;
        const uploadDuration = 2000 + Math.random() * 3000; // 2-5 seconds
        const progressInterval = 50; // Update every 50ms
        const totalSteps = uploadDuration / progressInterval;
        const progressStep = 100 / totalSteps;

        console.log(`Starting fake upload for: ${file.name}`);

        console.log('🎭 Simulation starting for file:', file.name, 'with ID:', fileData.id);
        
        // Find the file in the upload container's file list and update its status
        if (window.NDS && window.NDS.Forms && window.NDS.Forms.FileUpload) {
            const fileUploadInstance = window.NDS.Forms.FileUpload.getInstance(uploadContainer);
            if (fileUploadInstance && fileUploadInstance.uploadedFiles) {
                console.log('📋 Found', fileUploadInstance.uploadedFiles.length, 'files in upload instance');
                const fileIndex = fileUploadInstance.uploadedFiles.findIndex(f => f.id === fileData.id);
                console.log('🔍 File index found:', fileIndex);
                if (fileIndex !== -1) {
                    fileUploadInstance.uploadedFiles[fileIndex].status = 'uploading';
                    fileUploadInstance.updateFileList();
                    console.log('✅ File status updated to uploading');
                } else {
                    console.warn('❌ Could not find file with ID:', fileData.id);
                }
            } else {
                console.warn('❌ No file upload instance found');
            }
        }

        // Simulate upload progress
        const progressTimer = setInterval(() => {
            progress += progressStep + (Math.random() * 5); // Add some randomness
            progress = Math.min(progress, 100);

            // Update progress bar directly
            const fileList = uploadContainer.querySelector('.file-list');
            if (fileList) {
                const fileItems = fileList.querySelectorAll('.file-item');
                fileItems.forEach(item => {
                    const fileName = item.querySelector('.file-name')?.textContent;
                    if (fileName === file.name) {
                        const progressElement = item.querySelector('.upload-progress');
                        if (progressElement) {
                            const circle = progressElement.querySelector('.progress-fill');
                            const text = progressElement.querySelector('.progress-text');
                            if (circle && text) {
                                const circumference = 62.83; // 2 * Math.PI * 10
                                const offset = circumference - (progress / 100) * circumference;
                                circle.style.strokeDashoffset = offset;
                                text.textContent = Math.round(progress) + '%';
                            }
                        }
                    }
                });
            }

            // Dispatch progress event for external listeners
            uploadContainer.dispatchEvent(new CustomEvent('uploadProgress', {
                detail: {
                    fileData: fileData,
                    progress: progress
                }
            }));

            if (progress >= 100) {
                clearInterval(progressTimer);
                
                // Simulate upload completion with random success/failure
                const shouldSucceed = Math.random() > 0.1; // 90% success rate
                
                setTimeout(() => {
                    if (shouldSucceed) {
                        // Update file status to complete
                        if (window.NDS && window.NDS.Forms && window.NDS.Forms.FileUpload) {
                            const fileUploadInstance = window.NDS.Forms.FileUpload.getInstance(uploadContainer);
                            if (fileUploadInstance && fileUploadInstance.uploadedFiles) {
                                const fileIndex = fileUploadInstance.uploadedFiles.findIndex(f => f.id === fileData.id);
                                if (fileIndex !== -1) {
                                    fileUploadInstance.uploadedFiles[fileIndex].status = 'complete';
                                    fileUploadInstance.uploadedFiles[fileIndex].response = JSON.stringify({
                                        success: true,
                                        fileId: 'demo_' + Date.now(),
                                        fileName: file.name,
                                        fileSize: file.size,
                                        uploadTime: new Date().toISOString(),
                                        message: 'Demo file uploaded successfully'
                                    });
                                    fileUploadInstance.updateFileList();
                                }
                            }
                        }

                        // Dispatch success event
                        uploadContainer.dispatchEvent(new CustomEvent('uploadSuccess', {
                            detail: {
                                fileData: fileData,
                                response: JSON.stringify({
                                    success: true,
                                    fileId: 'demo_' + Date.now(),
                                    fileName: file.name,
                                    fileSize: file.size,
                                    uploadTime: new Date().toISOString(),
                                    message: 'Demo file uploaded successfully'
                                })
                            }
                        }));
                        console.log(`Demo upload completed successfully: ${file.name}`);
                    } else {
                        // Update file status to error
                        if (window.NDS && window.NDS.Forms && window.NDS.Forms.FileUpload) {
                            const fileUploadInstance = window.NDS.Forms.FileUpload.getInstance(uploadContainer);
                            if (fileUploadInstance && fileUploadInstance.uploadedFiles) {
                                const fileIndex = fileUploadInstance.uploadedFiles.findIndex(f => f.id === fileData.id);
                                if (fileIndex !== -1) {
                                    fileUploadInstance.uploadedFiles[fileIndex].status = 'error';
                                    fileUploadInstance.uploadedFiles[fileIndex].error = 'Demo upload failed';
                                    fileUploadInstance.updateFileList();
                                }
                            }
                        }

                        // Dispatch error event (10% chance)
                        uploadContainer.dispatchEvent(new CustomEvent('uploadError', {
                            detail: {
                                fileData: fileData,
                                error: 'Demo upload failed',
                                statusCode: 500
                            }
                        }));
                        console.log(`Demo upload failed: ${file.name}`);
                    }
                }, 100); // Small delay before completion
            }
        }, progressInterval);
    }

    // Expose global functions for backward compatibility if needed
    window.NDSShowcase = {
        handleCopyClick: handleCopyClick,
        showCopyFeedback: showCopyFeedback,
        initializeDemoToggleButtons: initializeDemoToggleButtons,
        updateButtonsForBackground: updateButtonsForBackground,
        initializeDirectionSwitcher: initializeDirectionSwitcher,
        simulateFileUpload: simulateFileUpload
    };

})();