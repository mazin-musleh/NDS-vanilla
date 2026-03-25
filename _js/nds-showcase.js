/**
 * National Design System - Showcase JavaScript
 * Common functionality for component demonstration pages
 *
 * Toggle Button Formats:
 *
 * Class toggling (default):
 * data-toggler='["class1 class2", ".target", "type"]'
 *
 * Class with explicit action (add/remove instead of toggle):
 * data-toggler='["class1", ".target", "type", "add"]'
 * data-toggler='["class1", ".target", "type", "remove"]'
 *
 * Attribute toggling:
 * data-toggler='["attr1=value1 attr2", ".target", "type", "attr"]'
 * data-toggler='["disabled checked", ".target", "type", "attr"]'  // for boolean attributes
 *
 * Multiple operations:
 * data-toggler='[["class1", ".target1", "type1"], ["class2", ".target2", "type2", "add"]]'
 */

(function() {
    'use strict';

    // Alert demo content — single source of truth
    const ALERT_TITLES = {};
    const INLINE_TITLES = { critical: 'Important:', success: 'Success:', info: 'Information:', warning: 'Warning:', neutral: 'Notification:' };
    const ALERT_MESSAGES = {
        success: 'Operation completed successfully!',
        warning: 'Please review your changes before proceeding.',
        error: 'An error occurred. Please try again.',
        info: 'This is an informational message.',
        neutral: 'This is a neutral notification.',
        critical: 'This is a very important banner message that requires attention'
    };
    const TOAST_MESSAGES = {
        success: 'Changes saved successfully!',
        warning: 'Your session will expire soon.',
        error: 'Failed to complete the action.',
        info: 'New update available for download.'
    };
    const FEEDBACK_MESSAGES = {
        success: 'Operation completed successfully',
        warning: 'Please review before proceeding',
        error: 'This field is required',
        info: 'This is an informational hint',
        neutral: 'General note for reference'
    };

    // Main initialization function
    function initializeShowcase() {
        storeOriginalCodeContent();
        initializeDemoToggleButtons();
        initializeDirectionSwitcher();
        initializeFakeFileUpload();
        initializeAutocompleteDemoData();
        initializeDemoActionButtons();
        initializeCardModeToggles();
        initializeCardStateToggles();
        initializeCardHeaderToggles();
        initializeCardContentToggles();
    }

    // CRITICAL: Expose global API immediately (called by unified init system)
    if (typeof window !== 'undefined') {
        NDS.Showcase = {
            initializeDemoToggleButtons: initializeDemoToggleButtons,
            updateButtonsForBackground: updateButtonsForBackground,
            initializeDirectionSwitcher: initializeDirectionSwitcher,
            startUploadSimulation: startUploadSimulation,
            populateDemoFiles: populateDemoFiles,
            init: initializeShowcase
        };
    }

    // Note: Initialization now handled by nds-loader.js unified system
    // EXCEPTION: Language switcher must run on ALL pages (not just demo pages)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeDirectionSwitcher);
    } else {
        initializeDirectionSwitcher();
    }

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

        // Update original content for reprocessing
        codeElement.dataset.originalContent = updatedContent;
        codeElement.innerHTML = updatedContent;

        // Reprocess using new simplified API
        if (NDS.Code && NDS.Code.reprocessCodeElement) {
            NDS.Code.reprocessCodeElement(codeElement);
        }
    }



    function updateButtonsForBackground(container, bgType) {
        const buttons = container.querySelectorAll('.nds-btn');
        
        buttons.forEach(button => {
            if (bgType === 'colored') {
                // Add oncolor class for colored backgrounds
                if (!button.classList.contains('nds-oncolor')) {
                    button.classList.add('nds-oncolor');
                }
            } else {
                // Remove oncolor class for default/none background
                button.classList.remove('nds-oncolor');
            }
        });
    }


    // Demo toggle button functionality
    function initializeDemoToggleButtons() {
        // Initialize cards with default backgrounds based on data attributes
        document.querySelectorAll('.nds-demo-card').forEach(card => {
            const demoContainer = card.querySelector('.demo-container');
            const hasOncolorButtons = demoContainer && demoContainer.querySelector('.nds-oncolor');
            
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
                        // Single operation: ["class1 class2", "target", "type", "operation"]
                        togglePairs = [[parsed[0], parsed[1], parsed[2], parsed[3]]];
                    } else {
                        // Multiple operations: [["class1", "target1", "type1", "operation"], ...]
                        togglePairs = parsed;
                    }

                    // Normalize 4th param: detect "add"/"remove" as action (not operation type)
                    const ACTION_KEYWORDS = ['add', 'remove'];
                    togglePairs = togglePairs.map(pair => {
                        const op = pair[3];
                        if (op && ACTION_KEYWORDS.includes(op)) {
                            // 4th param is an action → operation defaults to "class"
                            return [pair[0], pair[1], pair[2], 'class', op];
                        }
                        // Otherwise keep as-is: [value, target, type, operation, action?]
                        return pair;
                    });
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

        // --- Mutual exclusion: deselect other buttons BEFORE applying new toggle ---
        const buttonTypes = [...new Set(togglePairs.map(([,, type]) => type || 'default'))];

        if (buttonTypes.length === 1) {
            const buttonType = buttonTypes[0];
            const ACTION_KW = ['add', 'remove'];

            const allTogglers = demoCard.querySelectorAll('[data-toggler]');
            allTogglers.forEach(otherButton => {
                if (otherButton === button) return;

                const otherData = otherButton.getAttribute('data-toggler');
                if (!otherData) return;
                try {
                    const otherParsed = JSON.parse(otherData);
                    let otherOps = [];

                    if (Array.isArray(otherParsed) && otherParsed.length >= 2) {
                        if (typeof otherParsed[0] === 'string') {
                            otherOps = [[otherParsed[0], otherParsed[1], otherParsed[2], otherParsed[3]]];
                        } else {
                            otherOps = otherParsed;
                        }
                    }

                    // Normalize action keywords for other button too
                    otherOps = otherOps.map(pair => {
                        const op = pair[3];
                        if (op && ACTION_KW.includes(op)) {
                            return [pair[0], pair[1], pair[2], 'class', op];
                        }
                        return pair;
                    });

                    const otherTypes = [...new Set(otherOps.map(([,, type]) => type || 'default'))];

                    // Deselect if other button is single-type, same type, and currently selected
                    if (otherTypes.length === 1 && otherTypes[0] === buttonType && otherButton.classList.contains('selected')) {
                        otherButton.classList.remove('selected');

                        // Reverse inline styles from data-toggle-style on the deselected button
                        applyToggleStyles(otherButton, demoCard);

                        // Reverse the changes for the deselected button
                        otherOps.forEach(([classNamesOrAttrs, targetSelector, , otherOperation, otherAction]) => {
                            if (!classNamesOrAttrs || !targetSelector) return;

                            const deselectionOperationType = otherOperation || 'class';

                            // Find ALL matching elements for deselection - only in .demo-container and .code-example
                            let deselectionTargetElements = [];
                            const deselectionSearchContainers = [
                                ...demoCard.querySelectorAll('.demo-container'),
                                ...demoCard.querySelectorAll('.code-example')
                            ];

                            if (targetSelector.startsWith('#')) {
                                const idSelector = targetSelector.substring(1);
                                const idParts = idSelector.split(' ');
                                const elementId = idParts[0];
                                const subSelector = idParts.slice(1).join(' ');

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
                                if (targetSelector === '.demo-container') {
                                    deselectionTargetElements.push(...demoCard.querySelectorAll('.demo-container'));
                                } else if (targetSelector === '.code-example') {
                                    deselectionTargetElements.push(...demoCard.querySelectorAll('.code-example'));
                                } else {
                                    for (const container of deselectionSearchContainers) {
                                        if (targetSelector.includes(' ') || targetSelector.includes('[') || targetSelector.includes(':')) {
                                            deselectionTargetElements.push(...container.querySelectorAll(targetSelector));
                                        } else if (targetSelector.startsWith('.')) {
                                            if (targetSelector.includes('.') && targetSelector.lastIndexOf('.') > 0) {
                                                deselectionTargetElements.push(...container.querySelectorAll(targetSelector));
                                            } else {
                                                const className = targetSelector.substring(1);
                                                const allElements = container.querySelectorAll('*');
                                                const exactMatches = Array.from(allElements).filter(el =>
                                                    el.classList.contains(className) &&
                                                    Array.from(el.classList).includes(className)
                                                );
                                                deselectionTargetElements.push(...exactMatches);
                                            }
                                        } else {
                                            deselectionTargetElements.push(...container.querySelectorAll(targetSelector));
                                        }
                                    }
                                }
                            }

                            if (deselectionTargetElements.length) {
                                deselectionTargetElements.forEach(targetElement => {
                                    const otherButtonType = otherTypes[0];

                                    if (deselectionOperationType === 'attr') {
                                        handleAttributeToggling(targetElement, classNamesOrAttrs, demoCard);
                                    } else if (deselectionOperationType === 'data-state') {
                                        handleDataStateToggling(targetElement, classNamesOrAttrs, demoCard);
                                    } else if (deselectionOperationType === 'prop') {
                                        handlePropertyDeselection(targetElement, classNamesOrAttrs);
                                    } else if (deselectionOperationType === 'content-prepend' || deselectionOperationType === 'content-append') {
                                        handleContentToggling(targetElement, classNamesOrAttrs, deselectionOperationType);
                                        updateCodeExampleForContent(demoCard, targetElement, classNamesOrAttrs, deselectionOperationType);
                                    } else {
                                        // Class deselection: reverse based on action
                                        const classArray = classNamesOrAttrs.trim().split(/\s+/);

                                        classArray.forEach(className => {
                                            if (!className) return;
                                            if (otherAction === 'add') {
                                                // Reverse of "add" → remove
                                                targetElement.classList.remove(className);
                                            } else if (otherAction === 'remove') {
                                                // Reverse of "remove" → add
                                                targetElement.classList.add(className);
                                            } else {
                                                // Reverse of "toggle" → remove if present
                                                if (targetElement.classList.contains(className)) {
                                                    targetElement.classList.remove(className);
                                                }
                                            }
                                        });

                                        if (otherButtonType === 'VerticalTabs' && classArray.includes('oneRowContent')) {
                                            setTimeout(() => {
                                                if (window.initializeRowScroll) {
                                                    window.initializeRowScroll(true);
                                                }
                                            }, 100);
                                        }

                                        updateCodeExampleForClasses(demoCard, targetElement, classArray);
                                    }
                                });
                            }
                        });
                    }
                } catch (e) {
                    // Ignore invalid JSON
                }
            });
        }

        // --- Process each toggle operation ---
        // If button is already selected, we're deselecting → reverse explicit actions
        const isDeselecting = button.classList.contains('selected');

        // Prevent deselection for dropmenu items — they are always one-of-many,
        // so clicking the already-selected value should do nothing
        if (isDeselecting && button.closest('.demo-toggle-menu')) return;

        // Prevent deselection for attr toggles when other buttons share the same group
        // (e.g., variant selectors must always have one active)
        const hasAttrOp = togglePairs.some(([,,,op]) => (op || 'class') === 'attr');
        const toggleType = togglePairs[0]?.[2] || 'default';
        if (isDeselecting && hasAttrOp && toggleType !== 'default') {
            const siblingsInGroup = Array.from(demoCard.querySelectorAll('[data-toggler]')).filter(btn =>
                btn !== button && btn.getAttribute('data-toggler').includes(toggleType)
            );
            if (siblingsInGroup.length > 0) return;
        }

        togglePairs.forEach(([classNamesOrAttrs, targetSelector, type, operation, action]) => {
            if (!targetSelector || (!classNamesOrAttrs && (!operation || operation === 'class'))) {
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
                            // Handle both simple single class selectors and compound class selectors
                            if (targetSelector.includes('.') && targetSelector.lastIndexOf('.') > 0) {
                                // Compound class selector like .class1.class2
                                targetElement = container.querySelector(targetSelector);
                            } else {
                                // Simple single class selector - ensure exact match
                                const className = targetSelector.substring(1);
                                const allElements = container.querySelectorAll('*');
                                targetElement = Array.from(allElements).find(el =>
                                    el.classList.contains(className) &&
                                    Array.from(el.classList).includes(className)
                                );
                            }
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
                            // Handle both simple single class selectors and compound class selectors
                            if (targetSelector.includes('.') && targetSelector.lastIndexOf('.') > 0) {
                                // Compound class selector like .class1.class2
                                targetElements.push(...container.querySelectorAll(targetSelector));
                            } else {
                                // Simple single class selector - use exact match logic
                                const className = targetSelector.substring(1);
                                const allElements = container.querySelectorAll('*');
                                const exactMatches = Array.from(allElements).filter(el =>
                                    el.classList.contains(className) &&
                                    Array.from(el.classList).includes(className)
                                );
                                targetElements.push(...exactMatches);
                            }
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
                } else if (operationType === 'data-state') {
                    // Handle data-state attribute toggling (space-separated values like classes)
                    handleDataStateToggling(targetElement, classNamesOrAttrs, demoCard);
                } else if (operationType === 'prop') {
                    // Handle native JS property toggling (e.g. indeterminate)
                    handlePropertyToggling(targetElement, classNamesOrAttrs);
                } else if (operationType === 'chart') {
                    // Handle chart option toggling via NDSChart API
                    handleChartToggling(targetElement, button, isDeselecting);
                } else if (operationType === 'content-prepend' || operationType === 'content-append') {
                    // Handle content toggling (append/prepend)
                    handleContentToggling(targetElement, classNamesOrAttrs, operationType);
                } else {
                    // Handle class toggling (default), add, or remove
                    const classArray = classNamesOrAttrs.trim().split(/\s+/);

                    // Reverse explicit actions when deselecting
                    const effectiveAction = isDeselecting
                        ? (action === 'add' ? 'remove' : action === 'remove' ? 'add' : action)
                        : action;

                    classArray.forEach(className => {
                        if (!className) return;
                        if (effectiveAction === 'add') {
                            targetElement.classList.add(className);
                        } else if (effectiveAction === 'remove') {
                            targetElement.classList.remove(className);
                        } else {
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

                    // Special handling for nds-color class on alerts: update JS code example
                    if (classArray.includes('nds-color') && targetElement.classList.contains('nds-alert')) {
                        updateAlertColorInJsCode(targetElement, demoCard);
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
        
        // Toggle the clicked button's selected state
        button.classList.toggle('selected');

        // Apply/remove inline styles from data-toggle-style when button is selected/deselected
        // Format: data-toggle-style=".target { --prop:val; width:fit-content; }"
        // When selected: sets each property on matching targets in .demo-container and .code-example
        // When deselected (mutual exclusion): removes those properties
        applyToggleStyles(button, demoCard);

        // Sync dropmenu trigger label when item is selected
        // Supports data-label-prefix on the trigger for prefixed labels (e.g., "Layout: Default")
        const dropmenu = button.closest('.nds-dropmenu');
        if (dropmenu && button.classList.contains('selected')) {
            const trigger = dropmenu.querySelector('.nds-dropmenu-trigger');
            const triggerLabel = trigger?.querySelector('.label');
            const itemLabel = button.querySelector('.label');
            if (triggerLabel && itemLabel) {
                const prefix = trigger.getAttribute('data-label-prefix') || '';
                const customLabel = button.getAttribute('data-trigger-label');
                triggerLabel.textContent = prefix + (customLabel || itemLabel.textContent);
            }
        }

        // Update alert/toast code examples directly from toggle states
        if (buttonTypes.length === 1) {
            updateAlertCodeFromToggles(demoCard, buttonTypes[0]);
            updateFeedbackCodeFromToggles(demoCard, buttonTypes[0]);
        }

        // Update chart JS code example from current toggle states
        if (togglePairs.some(([,,, op]) => op === 'chart')) {
            updateChartCodeFromToggles(demoCard);
        }

        // Clean up and re-scan grid last-row borders after any toggle change
        // When switching layouts (especially from grid view), manually remove nds-last-row first
        if (NDS.gridLastRow) {
            // Remove nds-last-row from all items in divided lists before rescanning
            togglePairs.forEach(([classNames, targetSelector, type]) => {
                if (type === 'dlLayout' || classNames.includes('nds-grid')) {
                    const targets = demoCard.querySelectorAll(targetSelector);
                    targets.forEach(target => {
                        const items = target.querySelectorAll('.nds-definition-item');
                        items.forEach(item => item.classList.remove('nds-last-row'));
                    });
                }
            });
            NDS.gridLastRow.update(demoCard);
        }
    }

    // Update alert/toast code examples directly from toggle button states
    function updateAlertCodeFromToggles(demoCard, toggleType) {
        // Only handle alert-related toggles
        if (!toggleType || !['alertVariant', 'toastVariant', 'toastPosition', 'toastColor', 'alertColor', 'alertStyle'].includes(toggleType)) {
            return;
        }

        const isToast = toggleType.startsWith('toast');

        // Get current state from selected toggle buttons
        const variantType = isToast ? 'toastVariant' : 'alertVariant';
        let variant = 'success';
        const variantToggle = demoCard.querySelector(`[data-toggler*="${variantType}"].selected`);
        if (variantToggle) {
            try {
                const data = JSON.parse(variantToggle.getAttribute('data-toggler'));
                variant = data[0].split('=')[1] || 'success';
            } catch (e) {}
        }

        // Get position (toast only)
        let position = 'top';
        if (isToast) {
            const positionToggle = demoCard.querySelector('[data-toggler*="toastPosition"].selected');
            if (positionToggle) {
                position = 'bottom';
            }
        }

        // Get color and shadow
        const colorType = isToast ? 'toastColor' : 'alertColor';
        const colorToggle = demoCard.querySelector(`[data-toggler*="${colorType}"].selected`);
        const hasColor = !!colorToggle;
        const shadowToggle = demoCard.querySelector('[data-toggler*="alertStyle"].selected');
        const hasShadow = !!shadowToggle;

        const capitalizedVariant = variant.charAt(0).toUpperCase() + variant.slice(1);

        const messages = isToast ? TOAST_MESSAGES : ALERT_MESSAGES;
        const alertEl = demoCard.querySelector('.nds-alert');
        const isInline = alertEl && alertEl.classList.contains('nds-inline');
        const titles = isInline ? INLINE_TITLES : ALERT_TITLES;
        const title = titles[variant] || capitalizedVariant;

        // Update JS code example
        const jsCodeElement = demoCard.querySelector('.code-example code.lang-javascript, .code-example code[class*="javascript"]');
        if (jsCodeElement) {
            const hiddenCopy = getHiddenCodeCopy(jsCodeElement);
            if (hiddenCopy) {
                let updatedCode = hiddenCopy.textContent;

                // Update variant
                updatedCode = updatedCode.replace(/variant:\s*['"][^'"]+['"]/, `variant: '${variant}'`);
                // Update title
                updatedCode = updatedCode.replace(/title:\s*['"][^'"]+['"]/, `title: '${title}'`);
                // Update description
                if (messages[variant]) {
                    updatedCode = updatedCode.replace(/description:\s*['"][^'"]+['"]/, `description: '${messages[variant]}'`);
                }
                // Update color and shadow
                updatedCode = updatedCode.replace(/color:\s*(true|false)/, `color: ${hasColor}`);
                updatedCode = updatedCode.replace(/shadow:\s*(true|false)/, `shadow: ${hasShadow}`);
                // Update position (toast only)
                if (isToast) {
                    updatedCode = updatedCode.replace(/position:\s*['"][^'"]+['"]/, `position: '${position}'`);
                }

                updateCodeFromHiddenCopy(jsCodeElement, updatedCode);
            }
        }

        // Update HTML code example
        const htmlCodeElement = demoCard.querySelector('.code-example code.lang-html, .code-example code[class*="html"]');
        if (htmlCodeElement) {
            const hiddenCopy = getHiddenCodeCopy(htmlCodeElement);
            if (hiddenCopy) {
                let updatedCode = hiddenCopy.textContent;

                // Update data-status
                updatedCode = updatedCode.replace(/data-status="[^"]*"/, `data-status="${variant}"`);

                // Update title
                updatedCode = updatedCode.replace(/(<span class="nds-alert-title">)[^<]+(<\/span>)/, `$1${title}$2`);

                // Update description
                if (messages[variant]) {
                    updatedCode = updatedCode.replace(/(<p class="nds-alert-description">)[^<]+(<\/p>)/, `$1${messages[variant]}$2`);
                }

                // Toggle nds-color class
                if (hasColor && !updatedCode.includes('nds-color')) {
                    updatedCode = updatedCode.replace(/class="nds-alert nds-card/, 'class="nds-alert nds-card nds-color');
                } else if (!hasColor) {
                    updatedCode = updatedCode.replace(/ nds-color/, '');
                }

                // Toggle nds-shadow class
                if (hasShadow && !updatedCode.includes('nds-shadow')) {
                    updatedCode = updatedCode.replace(/class="nds-alert nds-card/, 'class="nds-alert nds-card nds-shadow');
                } else if (!hasShadow) {
                    updatedCode = updatedCode.replace(/ nds-shadow/, '');
                }

                // Toast-specific updates
                if (isToast) {
                    // Update data-position
                    updatedCode = updatedCode.replace(/data-position="[^"]*"/, `data-position="${position}"`);
                }

                updateCodeFromHiddenCopy(htmlCodeElement, updatedCode);
            }
        }
    }

    // Update feedback code examples directly from toggle button states

    // Apply/remove inline styles from data-toggle-style on toggler buttons
    // Format: data-toggle-style=".selector { --prop:val; width:fit-content }"
    // Applies styles to live DOM elements in .demo-container AND updates <code> text in code tabs
    // Reverses styles from deselected buttons in the same toggle group
    function applyToggleStyles(button, demoCard) {
        const styleRule = button.getAttribute('data-toggle-style');
        const isSelected = button.classList.contains('selected');

        if (!styleRule) return;

        const match = styleRule.match(/^([^\{]+)\{([^}]+)\}$/);
        if (!match) return;

        const selector = match[1].trim();
        const styleValue = match[2].trim().replace(/;$/, '');

        // 1. Apply to live DOM elements in .demo-container
        const demoContainers = demoCard.querySelectorAll('.demo-container');
        demoContainers.forEach(container => {
            container.querySelectorAll(selector).forEach(el => {
                if (isSelected) {
                    el.setAttribute('style', styleValue);
                } else {
                    el.removeAttribute('style');
                }
            });
        });

        // 2. Update <code> text content to add/remove style attribute
        const codeElement = demoCard.querySelector('.code-example code');
        if (!codeElement) return;

        const hiddenCopy = getHiddenCodeCopy(codeElement);
        if (!hiddenCopy) return;
        let code = hiddenCopy.textContent;

        // Build a regex to find the element by its class in the code text
        // Extract the class name from the selector (e.g., ".nds-definition-list" -> "nds-definition-list")
        const classMatch = selector.match(/^\.([a-zA-Z0-9_-]+)/);
        if (!classMatch) return;
        const className = classMatch[1].replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');

        // Match the opening tag that contains this class
        const tagRegex = new RegExp(`(<[a-z][a-z0-9]*\\s[^>]*class="[^"]*${className}[^"]*")( style="[^"]*")?([^>]*>)`, 'g');

        if (isSelected) {
            // Add or replace style attribute
            code = code.replace(tagRegex, (match, before, existingStyle, after) => {
                return before + ` style="${styleValue}"` + after;
            });
        } else {
            // Remove style attribute
            code = code.replace(tagRegex, (match, before, existingStyle, after) => {
                return before + after;
            });
        }

        updateCodeFromHiddenCopy(codeElement, code);
    }

    // Handle attribute toggling for target element
    function handleAttributeToggling(targetElement, attributeString, demoCard) {
        // Parse attribute string format: "attr1=value1 attr2=value2" or "attr1 attr2" (for boolean attributes)
        const attributePairs = attributeString.trim().split(/\s+/);

        attributePairs.forEach(attrPair => {
            if (!attrPair) return;

            const [attrName, attrValue] = attrPair.split('=');
            const isAdding = !targetElement.hasAttribute(attrName);

            if (attrValue !== undefined) {
                // Attribute with value: toggle between value and removing
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

            // Propagate data-required to inputs (live demo)
            if (attrName === 'data-required') {
                if (window.NDS && NDS.Forms && NDS.Forms.setState) {
                    NDS.Forms.setState(targetElement, 'required', isAdding);
                }
            }

            // Special handling for data-status variant changes
            if (attrName === 'data-status' && targetElement.classList.contains('nds-alert')) {
                const currentStatus = targetElement.getAttribute('data-status');
                if (currentStatus) {
                    updateAlertVariantContent(targetElement, currentStatus, demoCard);
                }
            }

            // Update feedback message text when status changes
            if (attrName === 'data-status' && targetElement.classList.contains('nds-feedback')) {
                const currentStatus = targetElement.getAttribute('data-status');
                if (currentStatus) {
                    const msgEl = targetElement.querySelector('.nds-feedback-message');
                    if (msgEl && FEEDBACK_MESSAGES[currentStatus]) {
                        msgEl.textContent = FEEDBACK_MESSAGES[currentStatus];
                    }
                }
            }

            // Special handling for data-position changes
            if (attrName === 'data-position' && targetElement.classList.contains('nds-alert')) {
                updateAlertPositionInJsCode(targetElement, demoCard);
            }
        });

        // Update code example for attribute changes
        updateCodeExampleForAttributes(demoCard, targetElement, attributePairs);

        // Sync required on inputs in code when data-required toggles (skip groups)
        if (attributePairs.some(p => p.startsWith('data-required')) && !targetElement.classList.contains('nds-form-group')) {
            updateCodeInputAttribute(demoCard, 'required', targetElement.hasAttribute('data-required'));
        }
    }

    // Handle native JS property toggling (boolean properties like indeterminate)
    function handlePropertyToggling(targetElement, propsString) {
        var props = propsString.trim().split(/\s+/);

        props.forEach(function(prop) {
            if (!prop) return;
            var newValue = !targetElement[prop];
            targetElement[prop] = newValue;

            // Sync with forms system if available
            if (prop === 'indeterminate' && window.NDS && window.NDS.Forms && window.NDS.Forms.setIndeterminate) {
                window.NDS.Forms.setIndeterminate(targetElement, newValue);
            }
        });
    }

    // Handle property deselection - explicitly sets properties to false
    function handlePropertyDeselection(targetElement, propsString) {
        var props = propsString.trim().split(/\s+/);

        props.forEach(function(prop) {
            if (!prop) return;
            targetElement[prop] = false;

            // Sync with forms system if available
            if (prop === 'indeterminate' && window.NDS && window.NDS.Forms && window.NDS.Forms.setIndeterminate) {
                window.NDS.Forms.setIndeterminate(targetElement, false);
            }
        });
    }

    // Handle data-state attribute toggling (space-separated values)
    function handleDataStateToggling(targetElement, statesString, demoCard) {
        const states = statesString.trim().split(/\s+/);

        states.forEach(state => {
            if (!state) return;
            const currentDataState = targetElement.getAttribute('data-state') || '';
            const isAdding = currentDataState.split(' ').indexOf(state) === -1;

            // Live demo: Forms API handles data-state + input propagation
            if (window.NDS && NDS.Forms && NDS.Forms.setState) {
                NDS.Forms.setState(targetElement, state, isAdding);
            } else {
                toggleDataState(targetElement, state, isAdding);
            }

            // Sync code example text
            if (demoCard) {
                updateCodeExampleForDataState(demoCard, targetElement, state, isAdding);
            }
        });
    }

    function toggleDataState(el, state, add) {
        let states = (el.getAttribute('data-state') || '').split(' ').filter(s => s.length > 0);
        const idx = states.indexOf(state);
        if (add && idx === -1) states.push(state);
        else if (!add && idx !== -1) states.splice(idx, 1);

        if (states.length > 0) el.setAttribute('data-state', states.join(' '));
        else el.removeAttribute('data-state');
    }

    function updateCodeExampleForDataState(demoCard, changedElement, state, isAdding) {
        const codeElement = demoCard.querySelector('.code-example code');
        if (!codeElement) return;

        const hiddenCopy = getHiddenCodeCopy(codeElement);
        if (!hiddenCopy) return;
        let code = hiddenCopy.textContent;

        // Find the element in code text by its first class
        const baseClass = Array.from(changedElement.classList)[0];
        if (!baseClass) return;
        const escaped = baseClass.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');

        // Update data-state on the container tag
        const tagRegex = new RegExp(`(<[^>]*class="[^"]*${escaped}[^"]*"[^>]*?)(/?>)`, 'g');
        code = code.replace(tagRegex, (match, before, close) => {
            let tag = before.replace(/\s*data-state="[^"]*"/, '');
            const liveState = changedElement.getAttribute('data-state');
            if (liveState) {
                tag += ` data-state="${liveState}"`;
            }
            return tag + close;
        });

        updateCodeFromHiddenCopy(codeElement, code);

        // Sync disabled on inputs in code
        if (state === 'disabled') {
            updateCodeInputAttribute(demoCard, 'disabled', isAdding);
        }
    }

    function updateCodeInputAttribute(demoCard, attrName, add) {
        const codeElement = demoCard.querySelector('.code-example code');
        if (!codeElement) return;

        const hiddenCopy = getHiddenCodeCopy(codeElement);
        if (!hiddenCopy) return;
        let code = hiddenCopy.textContent;

        const escapedAttr = attrName.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
        code = code.replace(/(<(?:input|textarea|select)\b[^>]*?)(\/?>)/g, (match, before, close) => {
            let tag = before.replace(new RegExp(`\\s*${escapedAttr}(?:="[^"]*")?`), '');
            if (add) tag += ` ${attrName}`;
            return tag + close;
        });

        updateCodeFromHiddenCopy(codeElement, code);
    }

    // Update feedback code examples (JS + HTML) from toggle button states
    function updateFeedbackCodeFromToggles(demoCard, toggleType) {
        if (!toggleType || !['feedbackStatus', 'feedbackMsgStatus', 'feedbackSize', 'feedbackMsgSize', 'feedbackStyle', 'feedbackRing', 'feedbackMsgStyle'].includes(toggleType)) {
            return;
        }

        const feedbackEl = demoCard.querySelector('.demo-container .nds-feedback');
        if (!feedbackEl) return;

        // Read current state from the live element
        const status = feedbackEl.getAttribute('data-status') || 'info';

        let size = 'sm';
        if (feedbackEl.classList.contains('nds-lg')) size = 'lg';
        else if (feedbackEl.classList.contains('nds-md')) size = 'md';

        let style = '';
        if (feedbackEl.classList.contains('nds-outline')) style = 'outline';
        else if (feedbackEl.classList.contains('nds-ring')) style = 'ring';

        const msgEl = feedbackEl.querySelector('.nds-feedback-message');
        const hasMessage = !!msgEl;
        const message = hasMessage ? (FEEDBACK_MESSAGES[status] || msgEl.textContent) : null;

        // Update JS code example
        const jsCode = demoCard.querySelector('.code-example code.lang-javascript, .code-example code[class*="javascript"]');
        if (jsCode) {
            const hiddenCopy = getHiddenCodeCopy(jsCode);
            if (hiddenCopy) {
                let updated = hiddenCopy.textContent;
                updated = updated.replace(/status:\s*['"][^'"]+['"]/, `status: '${status}'`);
                updated = updated.replace(/size:\s*['"][^'"]+['"]/, `size: '${size}'`);
                if (hasMessage && message) {
                    updated = updated.replace(/message:\s*['"][^'"]+['"]/, `message: '${message}'`);
                }
                // Update style — handle both existing style line and missing style line
                if (updated.match(/style:\s*['"][^'"]*['"]/)) {
                    updated = updated.replace(/style:\s*['"][^'"]*['"]/, `style: '${style}'`);
                }
                updateCodeFromHiddenCopy(jsCode, updated);
            }
        }

        // Update HTML code example
        const htmlCode = demoCard.querySelector('.code-example code.lang-html, .code-example code[class*="html"]');
        if (htmlCode) {
            const hiddenCopy = getHiddenCodeCopy(htmlCode);
            if (hiddenCopy) {
                let updated = hiddenCopy.textContent;

                // Update data-status
                updated = updated.replace(/data-status="[^"]*"/, `data-status="${status}"`);

                // Update message text
                if (hasMessage && message) {
                    updated = updated.replace(/(nds-feedback-message">)[^<]+(<)/, `$1${message}$2`);
                }

                // Update classes on .nds-feedback element
                updated = updated.replace(
                    /(<span class="nds-feedback)([^"]*)"/,
                    function(match, prefix, currentClasses) {
                        let classes = currentClasses
                            .replace(/\s*nds-ring/g, '')
                            .replace(/\s*nds-outline/g, '')
                            .replace(/\s*nds-sm/g, '')
                            .replace(/\s*nds-md/g, '')
                            .replace(/\s*nds-lg/g, '');
                        if (style) classes += ' nds-' + style;
                        classes += ' nds-' + size;
                        return prefix + classes + '"';
                    }
                );

                updateCodeFromHiddenCopy(htmlCode, updated);
            }
        }
    }

    // Update alert content and code examples when variant changes
    function updateAlertVariantContent(alertElement, variant, demoCard) {
        const capitalizedVariant = variant.charAt(0).toUpperCase() + variant.slice(1);

        // Determine if this is a toast or regular alert
        const isToast = alertElement.classList.contains('nds-toast');
        const isInline = alertElement.classList.contains('nds-inline');
        const messages = isToast ? TOAST_MESSAGES : ALERT_MESSAGES;
        const titles = isInline ? INLINE_TITLES : ALERT_TITLES;
        const title = titles[variant] || capitalizedVariant;

        // Update title text
        const titleElement = alertElement.querySelector('.nds-alert-title');
        if (titleElement) {
            titleElement.textContent = title;
        }

        // Update description text
        const descElement = alertElement.querySelector('.nds-alert-description');
        if (descElement && messages[variant]) {
            descElement.textContent = messages[variant];
        }

        // Update HTML code example
        const htmlCodeElement = demoCard.querySelector('.code-example code.lang-html, .code-example code[class*="html"]');
        if (htmlCodeElement) {
            const hiddenCopy = getHiddenCodeCopy(htmlCodeElement);
            if (hiddenCopy) {
                let updatedCode = hiddenCopy.textContent;
                // Update title
                updatedCode = updatedCode.replace(
                    /(<span class="nds-alert-title">)[^<]+(<\/span>)/,
                    `$1${title}$2`
                );
                // Update description
                if (messages[variant]) {
                    updatedCode = updatedCode.replace(
                        /(<p class="nds-alert-description">)[^<]+(<\/p>)/,
                        `$1${messages[variant]}$2`
                    );
                }
                updateCodeFromHiddenCopy(htmlCodeElement, updatedCode);
            }
        }

        // Update JS code example with all current options
        updateAlertJsCodeExample(alertElement, demoCard, variant, title, messages[variant]);
    }

    // Update JS code example with all current alert options
    function updateAlertJsCodeExample(alertElement, demoCard, variant, title, description) {
        const jsCodeElement = demoCard.querySelector('.code-example code.lang-javascript, .code-example code[class*="javascript"]');
        if (!jsCodeElement) return;

        const hiddenCopy = getHiddenCodeCopy(jsCodeElement);
        if (!hiddenCopy) return;

        let updatedCode = hiddenCopy.textContent;

        // Update variant
        updatedCode = updatedCode.replace(
            /variant:\s*['"][^'"]+['"]/,
            `variant: '${variant}'`
        );

        // Update title
        updatedCode = updatedCode.replace(
            /title:\s*['"][^'"]+['"]/,
            `title: '${title}'`
        );

        // Update description
        if (description) {
            updatedCode = updatedCode.replace(
                /description:\s*['"][^'"]+['"]/,
                `description: '${description}'`
            );
        }

        // Update position if present in code
        const position = alertElement.getAttribute('data-position') || 'top';
        updatedCode = updatedCode.replace(
            /position:\s*['"][^'"]+['"]/,
            `position: '${position}'`
        );

        // Update color if present in code
        const hasColor = alertElement.classList.contains('nds-color');
        updatedCode = updatedCode.replace(
            /color:\s*(true|false)/,
            `color: ${hasColor}`
        );

        updateCodeFromHiddenCopy(jsCodeElement, updatedCode);
    }

    // Update JS code for position changes
    function updateAlertPositionInJsCode(alertElement, demoCard) {
        const jsCodeElement = demoCard.querySelector('.code-example code.lang-javascript, .code-example code[class*="javascript"]');
        if (!jsCodeElement) return;

        const hiddenCopy = getHiddenCodeCopy(jsCodeElement);
        if (!hiddenCopy) return;

        let updatedCode = hiddenCopy.textContent;
        const position = alertElement.getAttribute('data-position') || 'top';

        updatedCode = updatedCode.replace(
            /position:\s*['"][^'"]+['"]/,
            `position: '${position}'`
        );

        updateCodeFromHiddenCopy(jsCodeElement, updatedCode);
    }

    // Update JS code for color changes
    function updateAlertColorInJsCode(alertElement, demoCard) {
        const jsCodeElement = demoCard.querySelector('.code-example code.lang-javascript, .code-example code[class*="javascript"]');
        if (!jsCodeElement) return;

        const hiddenCopy = getHiddenCodeCopy(jsCodeElement);
        if (!hiddenCopy) return;

        let updatedCode = hiddenCopy.textContent;
        const hasColor = alertElement.classList.contains('nds-color');

        updatedCode = updatedCode.replace(
            /color:\s*(true|false)/,
            `color: ${hasColor}`
        );

        updateCodeFromHiddenCopy(jsCodeElement, updatedCode);
    }

    // Handle chart option toggling — calls NDSChart update() API
    function handleChartToggling(targetElement, button, isDeselecting) {
        if (!targetElement || !targetElement.ndsChart) return;
        var optsAttr = isDeselecting ? button.getAttribute('data-chart-opt-off') : button.getAttribute('data-chart-opt');
        if (!optsAttr) return;
        try {
            var opts = JSON.parse(optsAttr);
            targetElement.ndsChart.update(opts);
        } catch (e) { /* invalid JSON */ }
    }

    // Update chart JS code example based on current toggle button states
    function updateChartCodeFromToggles(demoCard) {
        var jsCodeElement = demoCard.querySelector('.code-example code.lang-js');
        if (!jsCodeElement) return;

        var hiddenCopy = getHiddenCodeCopy(jsCodeElement);
        if (!hiddenCopy) return;

        var updatedCode = hiddenCopy.textContent;

        // Read all chart toggle buttons and apply their current state to the code
        demoCard.querySelectorAll('[data-toggler*="chart"]').forEach(function (btn) {
            var isOn = btn.classList.contains('selected');
            var codeReplace = btn.getAttribute('data-code-on');
            var codeReplaceOff = btn.getAttribute('data-code-off');
            if (!codeReplace || !codeReplaceOff) return;

            // Replace the off pattern with on pattern or vice versa
            if (isOn) {
                updatedCode = updatedCode.split(codeReplaceOff).join(codeReplace);
            } else {
                updatedCode = updatedCode.split(codeReplace).join(codeReplaceOff);
            }
        });

        updateCodeFromHiddenCopy(jsCodeElement, updatedCode);
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

        // Find the element in the code by tag and exact class match
        // Class must be after " or space, and followed by space or "
        const escapedClass = firstClass.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
        const elementRegex = new RegExp(
            `<${tagName}([^>]*class="(?:[^"]*\\s)?${escapedClass}(?:\\s[^"]*)?"[^>]*?)(\\s*\\/?)>`,
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
        // Use the base path from current location to ensure cookie works across all pages
        const basePath = window.location.pathname.split('/').slice(0, 2).join('/') || '/';
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=${basePath}`;
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

    // Simulated server search for autocomplete demo
    // Pre-fetches services-autocomplete.json, then intercepts subsequent fetches to filter by query
    function initializeAutocompleteDemoData() {
        // Find autocomplete demo containers
        var demoContainer = document.querySelector('.nds-form-container[data-url*="services-autocomplete"]');
        if (!demoContainer) return;

        var dataUrl = demoContainer.getAttribute('data-url');
        var nameField = demoContainer.getAttribute('data-name') || 'Title';
        var queryParam = demoContainer.getAttribute('data-query-param') || 'q';
        var demoData = null;

        // Pre-fetch the full dataset
        fetch(dataUrl).then(function(res) { return res.json(); }).then(function(data) {
            demoData = Array.isArray(data) ? data : [];
        });

        // Intercept subsequent fetches to simulate server-side search
        var originalFetch = window.fetch;
        window.fetch = function(url) {
            if (demoData && typeof url === 'string' && url.includes('services-autocomplete')) {
                var queryMatch = url.match(new RegExp('[?&]' + queryParam + '=([^&]*)'));
                var query = queryMatch ? decodeURIComponent(queryMatch[1]) : '';

                var filtered = query
                    ? demoData.filter(function(item) {
                        return String(item[nameField] || '').toLowerCase().includes(query.toLowerCase());
                    })
                    : demoData;

                return new Promise(function(resolve) {
                    setTimeout(function() {
                        resolve(new Response(JSON.stringify(filtered), {
                            status: 200,
                            headers: { 'Content-Type': 'application/json' }
                        }));
                    }, 150 + Math.random() * 350);
                });
            }
            return originalFetch.apply(this, arguments);
        };
    }

    // Card mode dropmenu — mutually exclusive card modes (default, expandable, selectable)
    function initializeCardModeToggles() {
        document.querySelectorAll('[data-card-mode]').forEach(btn => {
            btn.addEventListener('click', function() {
                const demoCard = this.closest('.nds-demo-card');
                if (!demoCard) return;

                const mode = this.dataset.cardMode;
                const card = demoCard.querySelector('.demo-container .nds-card');
                if (!card) return;

                // Deselect all mode buttons in this dropmenu
                const dropmenu = this.closest('.nds-dropmenu');
                dropmenu.querySelectorAll('[data-card-mode]').forEach(b => b.classList.remove('selected'));
                this.classList.add('selected');
                const triggerEl = dropmenu.querySelector('.nds-dropmenu-trigger');
                const trigger = triggerEl?.querySelector('.label');
                if (trigger) {
                    const prefix = triggerEl.getAttribute('data-label-prefix') || '';
                    trigger.textContent = prefix + this.querySelector('.label').textContent;
                }

                // Reset all mode sections
                card.querySelector('.nds-card-checkbox')?.setAttribute('hidden', '');
                card.querySelector('.nds-card-actions')?.setAttribute('hidden', '');
                // Clean expandable state
                if (card.ndsExpandableInstance) {
                    card.ndsExpandableInstance.destroy();
                    delete card.ndsExpandableInstance;
                }
                card.classList.remove('nds-expandable');
                card.removeAttribute('data-nds-expandable-initialized');
                const cardContent = card.querySelector('.nds-card-content');
                if (cardContent) cardContent.classList.remove('nds-expandable-content');

                // Ensure header visibility matches state
                const headerMode = demoCard.querySelector('[data-card-header].selected')?.dataset.cardHeader || 'icon';
                const cardHeader = card.querySelector('.nds-card-header');
                if (headerMode === 'none' && mode !== 'selectable') {
                    cardHeader?.setAttribute('hidden', '');
                } else {
                    cardHeader?.removeAttribute('hidden');
                }

                // Swap description for expandable mode
                const desc = card.querySelector('.nds-card-description');
                if (desc) {
                    if (!desc.dataset.shortDesc) desc.dataset.shortDesc = desc.textContent;
                    desc.textContent = mode === 'expandable'
                        ? 'This card demonstrates the flexible structure of the NDS card component. It supports featured icons, images, tags, ratings, action buttons, and selection checkboxes. Toggle the options above to preview different configurations. The expandable mode collapses long content behind a show-more button, keeping layouts compact while preserving access to the full content when needed.'
                        : desc.dataset.shortDesc;
                }

                // Apply mode
                if (mode === 'selectable') {
                    card.querySelector('.nds-card-checkbox')?.removeAttribute('hidden');
                } else if (mode === 'actions') {
                    card.querySelector('.nds-card-actions')?.removeAttribute('hidden');
                } else if (mode === 'expandable') {
                    // Reset state to default if interactive/disabled
                    if (card.tagName === 'BUTTON') {
                        const defaultStateBtn = demoCard.querySelector('[data-card-state="default"]');
                        if (defaultStateBtn) defaultStateBtn.click();
                        card = demoCard.querySelector('.demo-container .nds-card');
                        if (!card) return;
                    }

                    // Remove truncate if active (conflicts with expandable)
                    card.querySelectorAll('.nds-truncate').forEach(el => el.classList.remove('nds-truncate'));
                    const truncateBtn = demoCard.querySelector('[data-toggler*="cardTruncate"]');
                    if (truncateBtn) truncateBtn.classList.remove('selected');

                    card.classList.add('nds-expandable', 'nds-expand');
                    if (cardContent) {
                        cardContent.classList.add('nds-expandable-content');
                        cardContent.style.setProperty('--max-height', '200px');
                    }
                }

                if (NDS.Expandable && NDS.Expandable.reinit) NDS.Expandable.reinit();
                rebuildCardCode(demoCard);
            });
        });
    }

    // Card state dropmenu — default/interactive/disabled/interactive-disabled
    function initializeCardStateToggles() {
        document.querySelectorAll('[data-card-state]').forEach(btn => {
            btn.addEventListener('click', function() {
                const demoCard = this.closest('.nds-demo-card');
                if (!demoCard) return;

                const state = this.dataset.cardState;
                const dropmenu = this.closest('.nds-dropmenu');
                dropmenu.querySelectorAll('[data-card-state]').forEach(b => b.classList.remove('selected'));
                this.classList.add('selected');
                const triggerEl = dropmenu.querySelector('.nds-dropmenu-trigger');
                const trigger = triggerEl?.querySelector('.label');
                if (trigger) {
                    const prefix = triggerEl.getAttribute('data-label-prefix') || '';
                    trigger.textContent = prefix + this.querySelector('.label').textContent;
                }

                let card = demoCard.querySelector('.demo-container .nds-card');
                if (!card) return;

                // Reset mode to default if expandable is active
                if (state !== 'default' && card.classList.contains('nds-expandable')) {
                    const defaultModeBtn = demoCard.querySelector('[data-card-mode="default"]');
                    if (defaultModeBtn) defaultModeBtn.click();
                    card = demoCard.querySelector('.demo-container .nds-card');
                    if (!card) return;
                }

                const needsButton = state !== 'default';
                const isButton = card.tagName === 'BUTTON';

                // Swap element if needed
                if (needsButton && !isButton) {
                    const newEl = document.createElement('button');
                    for (const attr of card.attributes) newEl.setAttribute(attr.name, attr.value);
                    newEl.innerHTML = card.innerHTML;
                    card.parentNode.replaceChild(newEl, card);
                    card = newEl;
                } else if (!needsButton && isButton) {
                    const newEl = document.createElement('div');
                    for (const attr of card.attributes) newEl.setAttribute(attr.name, attr.value);
                    newEl.innerHTML = card.innerHTML;
                    card.parentNode.replaceChild(newEl, card);
                    card = newEl;
                }

                // Toggle disabled
                if (state === 'disabled') {
                    card.setAttribute('disabled', '');
                    // Disable form controls via data-state (forms.js two-way binding)
                    card.querySelectorAll('.nds-form-container').forEach(el => {
                        const ds = el.getAttribute('data-state') || '';
                        if (!ds.includes('disabled')) el.setAttribute('data-state', (ds + ' disabled').trim());
                    });
                    card.querySelectorAll('input, button, a').forEach(el => el.setAttribute('disabled', ''));
                } else {
                    card.removeAttribute('disabled');
                    card.querySelectorAll('.nds-form-container').forEach(el => {
                        const ds = (el.getAttribute('data-state') || '').replace('disabled', '').trim();
                        el.setAttribute('data-state', ds);
                    });
                    card.querySelectorAll('input, button, a').forEach(el => el.removeAttribute('disabled'));
                }

                rebuildCardCode(demoCard);
            });
        });
    }

    // Card header dropmenu — icon/image/none
    function initializeCardHeaderToggles() {
        document.querySelectorAll('[data-card-header]').forEach(btn => {
            btn.addEventListener('click', function() {
                const demoCard = this.closest('.nds-demo-card');
                if (!demoCard) return;

                const headerType = this.dataset.cardHeader;

                const dropmenu = this.closest('.nds-dropmenu');
                dropmenu.querySelectorAll('[data-card-header]').forEach(b => b.classList.remove('selected'));
                this.classList.add('selected');
                const triggerEl = dropmenu.querySelector('.nds-dropmenu-trigger');
                const trigger = triggerEl?.querySelector('.label');
                if (trigger) {
                    const prefix = triggerEl.getAttribute('data-label-prefix') || '';
                    trigger.textContent = prefix + this.querySelector('.label').textContent;
                }

                // Hide both, then show selected
                const iconSection = demoCard.querySelector('.demo-container .nds-card-featured-icon');
                const imageSection = demoCard.querySelector('.demo-container .nds-card-image:not(.nds-avatar)');
                const avatarSection = demoCard.querySelector('.demo-container .nds-avatar');
                const cardHeader = demoCard.querySelector('.demo-container .nds-card-header');
                if (iconSection) iconSection.setAttribute('hidden', '');
                if (imageSection) imageSection.setAttribute('hidden', '');
                if (avatarSection) avatarSection.setAttribute('hidden', '');

                const checkboxVisible = cardHeader?.querySelector('.nds-card-checkbox:not([hidden])');
                if (headerType === 'none' && !checkboxVisible) {
                    if (cardHeader) cardHeader.setAttribute('hidden', '');
                } else {
                    if (cardHeader) cardHeader.removeAttribute('hidden');
                    if (headerType === 'icon' && iconSection) iconSection.removeAttribute('hidden');
                    if (headerType === 'avatar' && avatarSection) avatarSection.removeAttribute('hidden');
                    if (headerType === 'image' && imageSection) imageSection.removeAttribute('hidden');
                }

                rebuildCardCode(demoCard);
            });
        });
    }

    // Card content toggle — show/hide optional card sections and rebuild code
    function initializeCardContentToggles() {
        document.querySelectorAll('[data-card-toggle]').forEach(btn => {
            btn.addEventListener('click', function() {
                const demoCard = this.closest('.nds-demo-card');
                if (!demoCard) return;

                const section = this.dataset.cardToggle;
                const card = demoCard.querySelector('.demo-container .nds-card');

                const selectorMap = {
                    tags: '.nds-card-tags',
                    rating: '.nds-card-rating'
                };
                const selector = selectorMap[section];
                if (!selector) return;
                const target = demoCard.querySelector(`.demo-container ${selector}`);
                if (!target) return;

                // Toggle hidden attribute
                const isHidden = target.hasAttribute('hidden');
                if (isHidden) {
                    target.removeAttribute('hidden');
                } else {
                    target.setAttribute('hidden', '');
                }

                // Toggle button selected state
                this.classList.toggle('selected', isHidden);



                // Rebuild code from visible demo HTML
                rebuildCardCode(demoCard);
            });
        });
    }

    function rebuildCardCode(demoCard) {
        const codeEl = demoCard.querySelector('.code-example code.lang-html');
        if (!codeEl) return;

        const card = demoCard.querySelector('.demo-container .nds-card');
        if (!card) return;

        // Clone and strip hidden elements + demo-only data attributes
        const clone = card.cloneNode(true);
        clone.querySelectorAll('[hidden]').forEach(el => el.remove());
        clone.querySelectorAll('[data-short-desc]').forEach(el => el.removeAttribute('data-short-desc'));

        // Clean expandable inline style to use attribute format
        const expContent = clone.querySelector('.nds-expandable-content');
        if (expContent) {
            expContent.removeAttribute('style');
            expContent.setAttribute('style', '--max-height:200px');
        }

        let html = clone.outerHTML;

        // Format and indent the HTML
        html = formatCardHtml(html);
        updateCodeFromHiddenCopy(codeEl, html);
    }

    function formatCardHtml(html) {
        // Basic HTML formatting with consistent indentation
        let formatted = '';
        let indent = 0;
        const lines = html
            .replace(/></g, '>\n<')
            .replace(/([^>])\n/g, '$1')
            .split('\n');

        lines.forEach(line => {
            line = line.trim();
            if (!line) return;

            // Decrease indent for closing tags
            if (line.match(/^<\//) && !line.match(/^<\/.*<\//)) {
                indent = Math.max(0, indent - 1);
            }

            formatted += '    '.repeat(indent) + line + '\n';

            // Increase indent for opening tags (not self-closing or void)
            if (line.match(/^<[^\/!]/) && !line.match(/\/>$/) && !line.match(/<\//) && !line.match(/^<(img|input|br|hr|meta|link)\b/)) {
                indent++;
            }
        });

        return formatted.trim();
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
                else if (action === 'reset-progress-duration') {
                    resetProgressDuration(actionBtn);
                }
                else if (action === 'random-progress-value') {
                    randomProgressValue(actionBtn);
                }
                else if (action === 'toast-show') {
                    createAlertFromDemo(actionBtn, true);
                }
                else if (action === 'alert-create') {
                    createAlertFromDemo(actionBtn, false);
                }
            }
        });
    }

    // Reset progress duration animation
    function resetProgressDuration(button) {
        const demoCard = button.closest('.nds-demo-card');
        if (!demoCard) return;

        const progressButtons = demoCard.querySelectorAll('.nds-progress:not(.nds-progress-static)');
        progressButtons.forEach(btn => {
            const circle = btn.querySelector('.nds-progress-circle');
            if (circle) {
                const clone = circle.cloneNode(true);
                circle.replaceWith(clone);
            }
        });
    }

    // Set random progress values
    function randomProgressValue(button) {
        const demoCard = button.closest('.nds-demo-card');
        if (!demoCard) return;

        const progressButtons = demoCard.querySelectorAll('.nds-progress-static');
        progressButtons.forEach(btn => {
            // Generate random value between 0 and 100
            const randomValue = Math.floor(Math.random() * 101);
            btn.style.setProperty('--progress-value', randomValue);
        });
    }

    // Create alert or toast from demo toggle states
    function createAlertFromDemo(button, isToast) {
        const demoCard = button.closest('.nds-demo-card');
        if (!demoCard) return;

        // Determine toggle type prefixes based on alert type
        const variantType = isToast ? 'toastVariant' : 'alertVariant';
        const colorType = isToast ? 'toastColor' : 'alertColor';

        // Get variant from selected toggle button
        let variant = 'success';
        const variantToggle = demoCard.querySelector(`[data-toggler*="${variantType}"].selected`);
        if (variantToggle) {
            try {
                const toggleData = JSON.parse(variantToggle.getAttribute('data-toggler'));
                variant = toggleData[0].split('=')[1] || 'success';
            } catch (e) {}
        }

        // Get color from toggle button
        const colorToggle = demoCard.querySelector(`[data-toggler*="${colorType}"].selected`);
        const hasColor = !!colorToggle;

        // Get position (toast only)
        let position = 'top';
        if (isToast) {
            const positionToggle = demoCard.querySelector('[data-toggler*="toastPosition"].selected');
            if (positionToggle) position = 'bottom';
        }

        const messages = isToast ? TOAST_MESSAGES : ALERT_MESSAGES;

        if (NDS.Alert) {
            const options = {
                variant: variant,
                title: ALERT_TITLES[variant] || variant.charAt(0).toUpperCase() + variant.slice(1),
                description: messages[variant],
                color: hasColor
            };

            if (isToast) {
                options.display = 'toast';
                options.position = position;
                options.duration = 4000;
                options.shadow = true;
                options.closable = true;
            } else {
                options.target = '#demo-alert-container';
                options.prepend = true;
            }

            NDS.Alert.create(options);
        }
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



})();