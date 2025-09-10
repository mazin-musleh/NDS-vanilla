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
        storeOriginalCodeContent();
        initializeDemoToggleButtons();
        initializeDirectionSwitcher();
        initializeFakeFileUpload();
        initializeDemoActionButtons();
    });

    // Store original code content in hidden copies before highlighting is applied
    function storeOriginalCodeContent() {
        document.querySelectorAll('.code-example code').forEach(codeElement => {
            // Create a hidden copy to store original content
            const hiddenCopy = document.createElement('div');
            hiddenCopy.style.display = 'none';
            hiddenCopy.className = 'original-code-content';
            hiddenCopy.textContent = codeElement.textContent;
            
            // Insert hidden copy right after the code element
            codeElement.parentNode.insertBefore(hiddenCopy, codeElement.nextSibling);
        });
    }

    // Get the hidden copy for a code element
    function getHiddenCodeCopy(codeElement) {
        return codeElement.parentNode.querySelector('.original-code-content');
    }

    // Update the hidden copy and apply to visible code element
    function updateCodeFromHiddenCopy(codeElement, updatedContent) {
        const hiddenCopy = getHiddenCodeCopy(codeElement);
        if (!hiddenCopy) return;

        // Update the hidden copy
        hiddenCopy.textContent = updatedContent;

        // Copy to visible code element
        codeElement.textContent = updatedContent;

        // Reapply syntax highlighting
        if (window.NDSCode && codeElement.classList.contains('lang-html')) {
            codeElement.dataset.processed = 'false';
            codeElement.dataset.lineNumbers = 'false';

            if (window.NDSCode.highlightHTMLSafe) {
                window.NDSCode.highlightHTMLSafe(codeElement);
            }

            if (window.NDSCode.addLineNumbers) {
                const lines = codeElement.textContent.split('\n');
                if (lines.length > 1 && !(lines.length === 2 && lines[1].trim() === '')) {
                    window.NDSCode.addLineNumbers();
                }
            }
        }
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
                    return;
                }
            } catch (e) {
                return;
            }
        } else {
            // Fallback to legacy data attributes for backward compatibility
            const toggleClass = button.getAttribute('data-toggle');
            const targetSelector = button.getAttribute('data-target') || button.getAttribute('data-default-target');
            
            if (!toggleClass) {
                return;
            }
            
            togglePairs = [[toggleClass, targetSelector]];
        }

        const demoCard = button.closest('.nds-demo-card');
        if (!demoCard) {
            return;
        }

        // Process each toggle operation
        togglePairs.forEach(([classNamesOrAttrs, targetSelector, type, operation]) => {
            if (!classNamesOrAttrs || !targetSelector) {
                return;
            }
            
            // Determine operation type: "class" (default), "attr", "content-prepend", or "content-append"
            const operationType = operation || 'class';
            
            let targetElement;
            
            // Find target elements within .demo-container, .code-example, or target the containers themselves
            const searchContainers = [
                ...demoCard.querySelectorAll('.demo-container'),
                ...demoCard.querySelectorAll('.code-example')
            ];
            
            if (targetSelector.startsWith('#')) {
                const idSelector = targetSelector.substring(1);
                const idParts = idSelector.split(' ');
                const elementId = idParts[0];
                const subSelector = idParts.slice(1).join(' ');
                
                // Search in each allowed container
                for (const container of searchContainers) {
                    const elementById = container.querySelector(`#${elementId}`);
                    if (elementById) {
                        if (subSelector) {
                            targetElement = elementById.querySelector(subSelector);
                        } else {
                            targetElement = elementById;
                        }
                        break;
                    }
                }
            } else {
                // Check if targeting the containers themselves first
                if (targetSelector === '.demo-container') {
                    targetElement = demoCard.querySelector('.demo-container');
                } else if (targetSelector === '.code-example') {
                    targetElement = demoCard.querySelector('.code-example');
                } else {
                    // Search in each allowed container
                    for (const container of searchContainers) {
                        if (targetSelector.includes(' ') || targetSelector.includes('[') || targetSelector.includes(':')) {
                            targetElement = container.querySelector(targetSelector);
                        } else if (targetSelector.startsWith('.')) {
                            // For simple single class selectors, ensure exact match
                            const className = targetSelector.substring(1);
                            const allElements = container.querySelectorAll('*');
                            targetElement = Array.from(allElements).find(el => 
                                el.classList.contains(className) && 
                                Array.from(el.classList).includes(className)
                            );
                        } else {
                            targetElement = container.querySelector(targetSelector);
                        }
                        
                        if (targetElement) break;
                    }
                }
            }

            // Find ALL matching elements, not just the first one
            let targetElements = [];
            
            // Find target elements within .demo-container, .code-example, or target the containers themselves
            if (targetSelector.startsWith('#')) {
                const idSelector = targetSelector.substring(1);
                const idParts = idSelector.split(' ');
                const elementId = idParts[0];
                const subSelector = idParts.slice(1).join(' ');
                
                // Search in each allowed container
                for (const container of searchContainers) {
                    const elementById = container.querySelector(`#${elementId}`);
                    if (elementById) {
                        if (subSelector) {
                            targetElements.push(...elementById.querySelectorAll(subSelector));
                        } else {
                            targetElements.push(elementById);
                        }
                    }
                }
            } else {
                // Check if targeting the containers themselves first
                if (targetSelector === '.demo-container') {
                    const containers = demoCard.querySelectorAll('.demo-container');
                    targetElements.push(...containers);
                } else if (targetSelector === '.code-example') {
                    const codeExamples = demoCard.querySelectorAll('.code-example');
                    targetElements.push(...codeExamples);
                } else {
                    // Search in each allowed container
                    for (const container of searchContainers) {
                        if (targetSelector.includes(' ') || targetSelector.includes('[') || targetSelector.includes(':')) {
                            targetElements.push(...container.querySelectorAll(targetSelector));
                        } else if (targetSelector.startsWith('.')) {
                            // For simple single class selectors, use the exact match logic
                            const className = targetSelector.substring(1);
                            const allElements = container.querySelectorAll('*');
                            const exactMatches = Array.from(allElements).filter(el => 
                                el.classList.contains(className) && 
                                Array.from(el.classList).includes(className)
                            );
                            targetElements.push(...exactMatches);
                        } else {
                            targetElements.push(...container.querySelectorAll(targetSelector));
                        }
                    }
                }
            }

            if (!targetElements.length) {
                return;
            }
            
            // Apply changes to ALL matching elements
            targetElements.forEach(targetElement => {
                if (operationType === 'attr') {
                    // Handle attribute toggling
                    handleAttributeToggling(targetElement, classNamesOrAttrs, demoCard);
                } else if (operationType === 'content-prepend' || operationType === 'content-append') {
                    // Handle content toggling (append/prepend)
                    handleContentToggling(targetElement, classNamesOrAttrs, operationType);
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
            
            // Update code example for content changes (only once per toggle action)
            if ((operationType === 'content-prepend' || operationType === 'content-append') && targetElements.length > 0) {
                updateCodeExampleForContent(demoCard, targetElements[0], classNamesOrAttrs, operationType);
            }
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
                                        
                                        // Find target element same way as main logic - only in .demo-container and .code-example
                                        const deselectionSearchContainers = [
                                            ...demoCard.querySelectorAll('.demo-container'),
                                            ...demoCard.querySelectorAll('.code-example')
                                        ];
                                        
                                        if (targetSelector.startsWith('#')) {
                                            const idSelector = targetSelector.substring(1);
                                            const idParts = idSelector.split(' ');
                                            const elementId = idParts[0];
                                            const subSelector = idParts.slice(1).join(' ');
                                            
                                            // Search in each allowed container
                                            for (const container of deselectionSearchContainers) {
                                                const elementById = container.querySelector(`#${elementId}`);
                                                if (elementById) {
                                                    if (subSelector) {
                                                        targetElement = elementById.querySelector(subSelector);
                                                    } else {
                                                        targetElement = elementById;
                                                    }
                                                    break;
                                                }
                                            }
                                        } else {
                                            // Check if targeting the containers themselves first
                                            if (targetSelector === '.demo-container') {
                                                targetElement = demoCard.querySelector('.demo-container');
                                            } else if (targetSelector === '.code-example') {
                                                targetElement = demoCard.querySelector('.code-example');
                                            } else {
                                                // Search in each allowed container
                                                for (const container of deselectionSearchContainers) {
                                                    if (targetSelector.includes(' ') || targetSelector.includes('[') || targetSelector.includes(':')) {
                                                        targetElement = container.querySelector(targetSelector);
                                                    } else if (targetSelector.startsWith('.')) {
                                                        // For simple single class selectors, ensure exact match
                                                        const className = targetSelector.substring(1);
                                                        const allElements = container.querySelectorAll('*');
                                                        targetElement = Array.from(allElements).find(el => 
                                                            el.classList.contains(className) && 
                                                            Array.from(el.classList).includes(className)
                                                        );
                                                    } else {
                                                        targetElement = container.querySelector(targetSelector);
                                                    }
                                                    
                                                    if (targetElement) break;
                                                }
                                            }
                                        }
                                        
                                        // Find ALL matching elements for deselection too - only in .demo-container and .code-example
                                        let deselectionTargetElements = [];
                                        
                                        if (targetSelector.startsWith('#')) {
                                            const idSelector = targetSelector.substring(1);
                                            const idParts = idSelector.split(' ');
                                            const elementId = idParts[0];
                                            const subSelector = idParts.slice(1).join(' ');
                                            
                                            // Search in each allowed container
                                            for (const container of deselectionSearchContainers) {
                                                const elementById = container.querySelector(`#${elementId}`);
                                                if (elementById) {
                                                    if (subSelector) {
                                                        deselectionTargetElements.push(...elementById.querySelectorAll(subSelector));
                                                    } else {
                                                        deselectionTargetElements.push(elementById);
                                                    }
                                                }
                                            }
                                        } else {
                                            // Check if targeting the containers themselves first
                                            if (targetSelector === '.demo-container') {
                                                const containers = demoCard.querySelectorAll('.demo-container');
                                                deselectionTargetElements.push(...containers);
                                            } else if (targetSelector === '.code-example') {
                                                const codeExamples = demoCard.querySelectorAll('.code-example');
                                                deselectionTargetElements.push(...codeExamples);
                                            } else {
                                                // Search in each allowed container
                                                for (const container of deselectionSearchContainers) {
                                                    if (targetSelector.includes(' ') || targetSelector.includes('[') || targetSelector.includes(':')) {
                                                        deselectionTargetElements.push(...container.querySelectorAll(targetSelector));
                                                    } else if (targetSelector.startsWith('.')) {
                                                        // For simple single class selectors, use the exact match logic
                                                        const className = targetSelector.substring(1);
                                                        const allElements = container.querySelectorAll('*');
                                                        const exactMatches = Array.from(allElements).filter(el => 
                                                            el.classList.contains(className) && 
                                                            Array.from(el.classList).includes(className)
                                                        );
                                                        deselectionTargetElements.push(...exactMatches);
                                                    } else {
                                                        deselectionTargetElements.push(...container.querySelectorAll(targetSelector));
                                                    }
                                                }
                                            }
                                        }
                                        
                                        if (deselectionTargetElements.length) {
                                            deselectionTargetElements.forEach(targetElement => {
                                                const otherButtonType = otherTypes[0]; // We know it's single type
                                                
                                                if (deselectionOperationType === 'attr') {
                                                    // Handle attribute deselection - toggle attributes back to original state
                                                    handleAttributeToggling(targetElement, classNamesOrAttrs, demoCard);
                                                } else if (deselectionOperationType === 'content-prepend' || deselectionOperationType === 'content-append') {
                                                    // Handle content deselection - toggle content back to original state
                                                    handleContentToggling(targetElement, classNamesOrAttrs, deselectionOperationType);
                                                    // Update code example for content changes
                                                    updateCodeExampleForContent(demoCard, targetElement, classNamesOrAttrs, deselectionOperationType);
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

    // Handle content toggling (append/prepend) for target element
    function handleContentToggling(targetElement, contentHTML, operationType) {
        // Parse the HTML content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = contentHTML;
        const contentToToggle = tempDiv.firstElementChild || tempDiv.firstChild;
        
        if (!contentToToggle) {
            return;
        }
        
        // Check if content already exists in the target element
        let existingContent = null;
        
        // Simple content detection - look for elements with the same tag and classes
        if (contentToToggle.tagName && contentToToggle.className) {
            const selector = `${contentToToggle.tagName.toLowerCase()}.${contentToToggle.className.split(' ').join('.')}`;
            existingContent = targetElement.querySelector(selector);
        } else if (contentToToggle.tagName) {
            existingContent = targetElement.querySelector(contentToToggle.tagName.toLowerCase());
        }
        
        if (existingContent) {
            // Remove the content
            existingContent.remove();
        } else {
            // Add the content
            const newElement = contentToToggle.cloneNode(true);
            
            if (operationType === 'content-prepend') {
                targetElement.insertBefore(newElement, targetElement.firstChild);
            } else {
                // Default to append
                targetElement.appendChild(newElement);
            }
        }
    }

    // Update code example for attribute changes
    function updateCodeExampleForAttributes(demoCard, changedElement, changedAttributes) {
        const codeElement = demoCard.querySelector('.code-example code');
        if (!codeElement) return;
        
        if (!changedElement || !changedAttributes) return;
        
        // Get content from hidden copy
        const hiddenCopy = getHiddenCodeCopy(codeElement);
        if (!hiddenCopy) return;
        let updatedCode = hiddenCopy.textContent;
        
        // Get the tag name and first class to identify the element in the code
        const tagName = changedElement.tagName.toLowerCase();
        const firstClass = Array.from(changedElement.classList)[0];
        
        if (!firstClass) return;
        
        // Find the element in the code by tag and first class, handling both regular and self-closing tags
        const elementRegex = new RegExp(
            `<${tagName}([^>]*class="[^"]*\\b${firstClass.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&")}\\b[^"]*"[^>]*?)(\\s*\\/?)>`,
            'gi'
        );
        
        updatedCode = updatedCode.replace(elementRegex, (match, attributes, selfClosing) => {
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
            
            return `<${tagName}${elementAttributes}${selfClosing}>`;
        });
        
        // Update using the hidden copy system
        updateCodeFromHiddenCopy(codeElement, updatedCode);
    }


    // Update code example for specific class changes only
    function updateCodeExampleForClasses(demoCard, changedElement, changedClasses) {
        const codeElement = demoCard.querySelector('.code-example code');
        if (!codeElement) return;
        
        if (!changedElement || !changedClasses) return;
        
        // Get content from hidden copy
        const hiddenCopy = getHiddenCodeCopy(codeElement);
        if (!hiddenCopy) return;
        let updatedCode = hiddenCopy.textContent;
        
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
        
        // Update using the hidden copy system
        updateCodeFromHiddenCopy(codeElement, updatedCode);
    }

    // Update code example for content changes - simple approach
    function updateCodeExampleForContent(demoCard, targetElement, contentHTML, operationType) {
        const codeElement = demoCard.querySelector('.code-example code');
        if (!codeElement) return;
        
        // Get content from hidden copy
        const hiddenCopy = getHiddenCodeCopy(codeElement);
        if (!hiddenCopy) return;
        let updatedCode = hiddenCopy.textContent;
        
        // Get the target element info to find it in the code
        const tagName = targetElement.tagName.toLowerCase();
        const firstClass = Array.from(targetElement.classList)[0];
        if (!firstClass) return;
        
        // Parse the content to add/remove
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = contentHTML;
        const contentToToggle = tempDiv.firstElementChild || tempDiv.firstChild;
        if (!contentToToggle) return;
        
        // Check if content exists in target element BEFORE the DOM change to determine the action
        // We need to check the code content, not the current DOM state
        let hasContent = false;
        if (contentToToggle.tagName && contentToToggle.className) {
            // Check for any class from the content to toggle
            const contentClasses = contentToToggle.className.split(' ');
            hasContent = contentClasses.some(cls => updatedCode.includes(cls));
        } else if (contentToToggle.tagName) {
            // If no classes, check for the tag name
            hasContent = updatedCode.includes(`<${contentToToggle.tagName.toLowerCase()}`);
        }
        
        // Find the element in the raw HTML and update it
        const escapedFirstClass = firstClass.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
        const elementRegex = new RegExp(`(<${tagName}[^>]*class="[^"]*\\b${escapedFirstClass}\\b[^"]*"[^>]*>)([\\s\\S]*?)(<\\/${tagName}>)`, 'gi');
        
        updatedCode = updatedCode.replace(elementRegex, (match, openTag, content, closeTag) => {
            let updatedContent = content;
            
            if (hasContent) {
                // Remove the content from the code
                if (contentToToggle.tagName && contentToToggle.className) {
                    // Remove by any of the classes
                    const contentClasses = contentToToggle.className.split(' ');
                    for (const cls of contentClasses) {
                        if (cls) {
                            const contentRegex = new RegExp(`\\s*<${contentToToggle.tagName.toLowerCase()}[^>]*class="[^"]*${cls}[^"]*"[^>]*>[\\s\\S]*?<\\/${contentToToggle.tagName.toLowerCase()}>`, 'gi');
                            updatedContent = updatedContent.replace(contentRegex, '');
                        }
                    }
                } else if (contentToToggle.tagName) {
                    // Remove by tag name if no classes
                    const contentRegex = new RegExp(`\\s*<${contentToToggle.tagName.toLowerCase()}[^>]*>[\\s\\S]*?<\\/${contentToToggle.tagName.toLowerCase()}>`, 'gi');
                    updatedContent = updatedContent.replace(contentRegex, '');
                }
            } else {
                // Add the content to the code
                const contentHTML = contentToToggle.outerHTML;
                
                // Detect the existing indentation from the content
                const lines = updatedContent.split('\n');
                let indent = '';
                for (let line of lines) {
                    if (line.trim()) {
                        const match = line.match(/^(\s*)/);
                        if (match) {
                            indent = match[1];
                            break;
                        }
                    }
                }
                
                if (operationType === 'content-prepend') {
                    // For prepend, add newline first, then indented content
                    updatedContent = '\n' + indent + contentHTML + updatedContent;
                } else {
                    updatedContent = updatedContent + '\n' + indent + contentHTML;
                }
            }
            
            return openTag + updatedContent + closeTag;
        });
        
        // Update using the hidden copy system
        updateCodeFromHiddenCopy(codeElement, updatedCode);
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
            } else {
            }
        });

        // Listen for beforeUpload events to intercept and simulate uploads
        document.addEventListener('beforeUpload', function(e) {
            const fileData = e.detail.fileData;
            const uploadContainer = e.target;
            
            // Cancel the real upload and start simulation
            e.detail.cancel = true;
            
            // Start simulation using UI API
            startUploadSimulation(uploadContainer, fileData);
        });
    }

    // Simple upload simulation using UI API
    function startUploadSimulation(uploadContainer, fileData) {
        // Get the file upload API instance
        const api = window.NDS.Forms.FileUpload.getInstance(uploadContainer);
        if (!api) {
            return;
        }
        
        // Calculate upload duration based on file size
        const file = fileData.file;
        const fileSizeKB = file.size / 1024;
        const baseSpeedKBps = 100; // 100 KB/s for slow connection
        const baseDuration = (fileSizeKB / baseSpeedKBps) * 1000;
        const randomFactor = 0.5 + Math.random(); // ±50% variation
        const uploadDuration = Math.max(3000, Math.min(60000, baseDuration * randomFactor));
        
        
        // Update existing file status to uploading and start progress simulation
        api.setFileStatus(fileData.id, 'uploading', { progress: 0 });
        simulateProgress(api, fileData.id, uploadDuration);
    }
    
    // Clean progress simulation using UI API
    function simulateProgress(api, fileId, duration) {
        let progress = 0;
        const interval = 150; // Update every 150ms
        const progressStep = 100 / (duration / interval);
        
        const progressTimer = setInterval(() => {
            // Simulate network variations
            const networkCondition = Math.random();
            let speedMultiplier = 1;
            
            if (networkCondition < 0.2) speedMultiplier = 0.05; // 20% chance of stall
            else if (networkCondition < 0.5) speedMultiplier = 0.2; // 30% chance of slow
            else if (networkCondition < 0.8) speedMultiplier = 0.6; // 30% chance of medium
            // else normal speed (20% chance)
            
            progress += (progressStep * speedMultiplier) + (Math.random() * 1);
            progress = Math.min(progress, 100);
            
            // Update progress using API
            api.setFileProgress(fileId, progress);
            
            // Complete when 100%
            if (progress >= 100) {
                clearInterval(progressTimer);
                
                // Set processing status first
                api.setFileStatus(fileId, 'processing');
                
                // 90% success rate after processing delay
                setTimeout(() => {
                    const shouldSucceed = Math.random() > 0.1;
                    if (shouldSucceed) {
                        api.setFileStatus(fileId, 'complete');
                        
                        // Dispatch success event
                        const container = document.querySelector('.nds-file-upload');
                        api.dispatchEvent('uploadSuccess', {
                            fileId: fileId,
                            file: api.getFile(fileId)?.file
                        });
                    } else {
                        api.setFileStatus(fileId, 'error', { error: 'Demo upload failed' });
                        
                        // Dispatch error event
                        const container = document.querySelector('.nds-file-upload');
                        api.dispatchEvent('uploadError', {
                            fileId: fileId,
                            error: 'Demo upload failed'
                        });
                    }
                }, 2000); // 2 second processing delay
            }
        }, interval);
    }

    // Demo action buttons functionality
    function initializeDemoActionButtons() {
        
        // Event delegation for demo action buttons
        document.addEventListener('click', function(e) {
            const actionBtn = e.target.closest('.demo-action-btn');
            if (actionBtn) {
                e.preventDefault();
                const action = actionBtn.getAttribute('data-action');
                
                if (action === 'populate-demo-files') {
                    populateDemoFiles(actionBtn);
                }
            }
        });
    }
    
    function populateDemoFiles(button) {
        
        // Find the file upload container in the same demo card
        const demoCard = button.closest('.nds-demo-card');
        if (!demoCard) {
            return;
        }
        
        const uploadContainer = demoCard.querySelector('.nds-file-upload');
        if (!uploadContainer) {
            return;
        }
        
        // Get the file upload API instance
        const api = window.NDS.Forms.FileUpload.getInstance(uploadContainer);
        if (!api) {
            return;
        }
        
        // Clear existing files first
        api.clearAllFiles();
        
        // Check if single file mode is active
        const isSingleFile = uploadContainer.classList.contains('single-file');
        
        // Create mock files with different statuses
        const allDemoFiles = [
            {
                name: 'progress-report.pdf',
                size: 1024 * 512, // 512KB
                type: 'application/pdf',
                status: 'uploading',
                progress: 45
            },
            {
                name: 'processing-file.xlsx',
                size: 1024 * 384, // 384KB
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                status: 'processing',
                progress: 100
            },
            {
                name: 'completed-document.docx',
                size: 1024 * 256, // 256KB  
                type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                status: 'complete',
                progress: 100
            },
            {
                name: 'failed-upload.jpg',
                size: 1024 * 1024 * 2.5, // 2.5MB
                type: 'image/jpeg',
                status: 'error',
                progress: 0,
                error: 'File size exceeds limit'
            }
        ];
        
        // Select files based on mode
        let demoFiles;
        if (isSingleFile) {
            // Single file mode: pick one random file
            const randomIndex = Math.floor(Math.random() * allDemoFiles.length);
            demoFiles = [allDemoFiles[randomIndex]];
        } else {
            // Multi file mode: use all files
            demoFiles = allDemoFiles;
        }
        
        // Add each demo file using the API
        demoFiles.forEach(fileData => {
            // Create a mock File object
            const mockFile = new File([''], fileData.name, { 
                type: fileData.type,
                lastModified: Date.now()
            });
            
            // Override the size property (File objects are read-only, but we can try)
            Object.defineProperty(mockFile, 'size', { 
                value: fileData.size,
                writable: false 
            });
            
            // Add the file using the API
            const fileId = api.addFile(mockFile, {
                status: fileData.status,
                progress: fileData.progress,
                error: fileData.error
            });
            
            
            // If it's uploading status, simulate progress
            if (fileData.status === 'uploading') {
                simulateProgressForDemo(api, fileId, fileData.progress);
            }
        });
        
    }
    
    function simulateProgressForDemo(api, fileId, startProgress) {
        let progress = startProgress;
        const targetProgress = Math.min(startProgress + 30, 85); // Don't complete, just show progress
        
        const interval = setInterval(() => {
            progress += Math.random() * 3;
            if (progress >= targetProgress) {
                progress = targetProgress;
                clearInterval(interval);
            }
            
            api.setFileProgress(fileId, progress);
        }, 200);
    }

    // Expose global functions for backward compatibility if needed
    window.NDSShowcase = {
        initializeDemoToggleButtons: initializeDemoToggleButtons,
        updateButtonsForBackground: updateButtonsForBackground,
        initializeDirectionSwitcher: initializeDirectionSwitcher,
        startUploadSimulation: startUploadSimulation,
        populateDemoFiles: populateDemoFiles
    };

})();