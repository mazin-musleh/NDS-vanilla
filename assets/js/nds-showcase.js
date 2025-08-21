/**
 * National Design System - Showcase JavaScript
 * Common functionality for component demonstration pages
 */

(function() {
    'use strict';

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initializeCopyButtons();
        initializeDemoToggleButtons();
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
                        // Single operation: ["class1 class2 class3", "target", "type"]
                        togglePairs = [[parsed[0], parsed[1], parsed[2]]];
                    } else {
                        // Multiple operations: [["class1 class2", "target1", "type1"], ["class3", "target2", "type2"]]
                        togglePairs = parsed;
                    }
                } else {
                    console.error('data-toggler must be ["class1 class2", "target", "type?"] or multiple arrays');
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
        togglePairs.forEach(([classNames, targetSelector, type]) => {
            if (!classNames || !targetSelector) {
                console.error('Each toggle operation must have ["class1 class2", "target", "type?"]');
                return;
            }
            
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
                targetElement = demoCard.querySelector(targetSelector);
            }

            if (!targetElement) {
                console.error('Target element not found:', targetSelector, 'in demo card');
                return;
            }
            
            // Split class names and toggle each one
            const classArray = classNames.trim().split(/\s+/);
            classArray.forEach(className => {
                if (className) {
                    targetElement.classList.toggle(className);
                }
            });
            
            // Handle code updates for any class changes on targets
            updateCodeExample(demoCard, targetElement);
        });
        
        // Update button selected states based on whether their classes are currently active
        const allTogglers = demoCard.querySelectorAll('[data-toggler]');
        allTogglers.forEach(togglerBtn => {
            const otherTogglerData = togglerBtn.getAttribute('data-toggler');
            if (!otherTogglerData) return;
            
            try {
                const parsed = JSON.parse(otherTogglerData);
                let otherPairs = [];
                
                if (Array.isArray(parsed) && parsed.length >= 2) {
                    if (typeof parsed[0] === 'string') {
                        otherPairs = [[parsed[0], parsed[1], parsed[2]]];
                    } else {
                        otherPairs = parsed;
                    }
                }
                
                let hasAnyActiveClass = false;
                otherPairs.forEach(([otherClassNames, otherTarget]) => {
                    const otherTargetElement = demoCard.querySelector(otherTarget);
                    if (otherTargetElement) {
                        // Check if any of the classes are active
                        const classArray = otherClassNames.trim().split(/\s+/);
                        const hasActiveClass = classArray.some(className => 
                            className && otherTargetElement.classList.contains(className)
                        );
                        if (hasActiveClass) {
                            hasAnyActiveClass = true;
                        }
                    }
                });
                
                if (hasAnyActiveClass) {
                    togglerBtn.classList.add('selected');
                } else {
                    togglerBtn.classList.remove('selected');
                }
            } catch (e) {
                // Ignore invalid JSON
            }
        });
    }

    // Update code example to reflect actual element classes
    function updateCodeExample(demoCard, changedElement) {
        const codeElement = demoCard.querySelector('.code-example code');
        if (!codeElement) return;
        
        // Create a mapping of elements in the demo to their corresponding code representations
        const demoContainer = demoCard.querySelector('.demo-container');
        if (!demoContainer) return;
        
        // Get all elements that might be represented in the code
        const elementsToSync = [
            { element: demoContainer.querySelector('.nds-tabs'), codeSelector: '.nds-tabs' },
            { element: demoContainer.querySelector('.nds-tab-list'), codeSelector: '.nds-tab-list' }
        ].filter(item => item.element); // Only keep elements that exist
        
        let updatedCode = codeElement.textContent;
        
        // Update each element's class in the code to match the actual DOM
        elementsToSync.forEach(({ element, codeSelector }) => {
            const actualClasses = Array.from(element.classList).join(' ');
            
            // Find and replace the class attribute for this element in the code
            const classRegex = new RegExp(`class="${codeSelector.substring(1)}[^"]*"`, 'g');
            updatedCode = updatedCode.replace(classRegex, `class="${actualClasses}"`);
        });
        
        codeElement.textContent = updatedCode;
    }

    // Expose global functions for backward compatibility if needed
    window.NDSShowcase = {
        handleCopyClick: handleCopyClick,
        showCopyFeedback: showCopyFeedback,
        initializeDemoToggleButtons: initializeDemoToggleButtons,
        updateButtonsForBackground: updateButtonsForBackground
    };

})();