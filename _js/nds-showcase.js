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
        initializeDirectionSwitcher();
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
                // For class selectors, ensure exact match to avoid matching classes that contain the target class
                if (targetSelector.startsWith('.')) {
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
                // For class selectors, find all matching elements
                if (targetSelector.startsWith('.')) {
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
            
            // Apply class changes to ALL matching elements
            targetElements.forEach(targetElement => {
                // Split class names and toggle each one
                const classArray = classNames.trim().split(/\s+/);
                
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
                                    
                                    // Also reverse the class changes for the deselected button
                                    otherOperations.forEach(([classNames, targetSelector]) => {
                                        if (!classNames || !targetSelector) return;
                                        
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
                                            if (targetSelector.startsWith('.')) {
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
                                            if (targetSelector.startsWith('.')) {
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
                                                // Remove classes that were added by the deselected button
                                                const classArray = classNames.trim().split(/\s+/);
                                                const otherButtonType = otherTypes[0]; // We know it's single type
                                                
                                                
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

    // Expose global functions for backward compatibility if needed
    window.NDSShowcase = {
        handleCopyClick: handleCopyClick,
        showCopyFeedback: showCopyFeedback,
        initializeDemoToggleButtons: initializeDemoToggleButtons,
        updateButtonsForBackground: updateButtonsForBackground,
        initializeDirectionSwitcher: initializeDirectionSwitcher
    };

})();