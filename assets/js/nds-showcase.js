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

    function handleCodeUpdate(demoCard, updateType, isActive) {
        const codeElement = demoCard.querySelector('.code-example code');
        if (!codeElement) return;
        
        const currentCode = codeElement.textContent;
        
        if (updateType === 'cardView') {
            // Handle cardView class updates for tabs
            if (isActive) {
                const updatedCode = currentCode.replace(
                    'class="nds-tabs"',
                    'class="nds-tabs cardView"'
                ).replace(
                    'class="nds-tabs nds-tabs-vertical"',
                    'class="nds-tabs nds-tabs-vertical cardView"'
                );
                codeElement.textContent = updatedCode;
            } else {
                const updatedCode = currentCode.replace(
                    'class="nds-tabs cardView"',
                    'class="nds-tabs"'
                ).replace(
                    'class="nds-tabs nds-tabs-vertical cardView"',
                    'class="nds-tabs nds-tabs-vertical"'
                );
                codeElement.textContent = updatedCode;
            }
        }
    }

    // Demo toggle button functionality
    function initializeDemoToggleButtons() {
        // Initialize cards with default backgrounds based on data attributes
        document.querySelectorAll('.nds-demo-card').forEach(card => {
            const demoContainer = card.querySelector('.demo-container');
            const hasOncolorButtons = demoContainer && demoContainer.querySelector('.nds-btn-oncolor');
            
            // Find default background button (marked with data-default="true")
            const defaultBgButton = card.querySelector('[data-bg-group][data-default="true"]');
            
            if (hasOncolorButtons && defaultBgButton) {
                const defaultClass = defaultBgButton.getAttribute('data-toggle');
                const bgType = defaultBgButton.getAttribute('data-bg-type');
                
                if (defaultClass) {
                    demoContainer.classList.add(defaultClass);
                    defaultBgButton.classList.add('selected');
                    updateButtonsForBackground(demoContainer, bgType || 'colored');
                }
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
        const toggleClass = button.getAttribute('data-toggle');
        let targetSelector = button.getAttribute('data-target');
        
        if (!toggleClass) {
            console.error('Toggle button missing data-toggle attribute');
            return;
        }

        const demoCard = button.closest('.nds-demo-card');
        if (!demoCard) {
            console.error('Toggle button must be inside a demo card');
            return;
        }

        let targetElement;
        
        // If no target is specified, use default from data attribute or fallback
        if (!targetSelector) {
            targetSelector = button.getAttribute('data-default-target');
            
            if (!targetSelector) {
                console.error('No target specified for toggle button. Add data-target or data-default-target attribute.');
                return;
            }
        }
        
        // Always find the target relative to the demo card, regardless of selector type
        if (targetSelector.startsWith('#')) {
            // Remove the # and find by ID within the demo card
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
            // Use the selector directly within the demo card
            targetElement = demoCard.querySelector(targetSelector);
        }

        if (!targetElement) {
            console.error('Target element not found:', targetSelector, 'in demo card');
            return;
        }

        // Check if this is a background toggle button
        const isBackgroundToggle = button.hasAttribute('data-bg-group');
        const bgGroup = button.getAttribute('data-bg-group');
        
        if (isBackgroundToggle) {
            // For background toggles, find all buttons in the same group and clear their classes
            const groupButtons = demoCard.querySelectorAll(`[data-bg-group="${bgGroup}"]`);
            const classesToRemove = [];
            
            // Collect all possible background classes from the group
            groupButtons.forEach(btn => {
                const btnToggleClass = btn.getAttribute('data-toggle');
                if (btnToggleClass && btnToggleClass !== toggleClass) {
                    classesToRemove.push(btnToggleClass);
                }
            });
            
            // Remove all background classes from target
            targetElement.classList.remove(...classesToRemove);
            
            // Add the new class
            targetElement.classList.add(toggleClass);
            
            // Update button states in the group
            groupButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            
            // Handle special functionality based on data attributes
            const bgType = button.getAttribute('data-bg-type');
            if (bgType === 'colored') {
                // For colored backgrounds, add oncolor class to buttons
                updateButtonsForBackground(targetElement, 'colored');
            } else if (bgType === 'none') {
                // For no background, remove oncolor classes
                updateButtonsForBackground(targetElement, 'none');
            }
            
            // Handle special functionality for tabs (cardView toggle)
            const tabsElement = button.getAttribute('data-tabs-target');
            if (tabsElement) {
                const tabsEl = demoCard.querySelector(tabsElement);
                if (tabsEl) {
                    const tabsClass = button.getAttribute('data-tabs-class') || 'cardView';
                    // For background groups, cardView should match the toggle state
                    if (button.classList.contains('selected')) {
                        tabsEl.classList.add(tabsClass);
                    } else {
                        tabsEl.classList.remove(tabsClass);
                    }
                }
            }
            
            // Handle special code updates
            const codeUpdate = button.getAttribute('data-code-update');
            if (codeUpdate) {
                handleCodeUpdate(demoCard, codeUpdate, button.classList.contains('selected'));
            }
            
        } else {
            // For other toggles (like center), use the normal toggle behavior
            targetElement.classList.toggle(toggleClass);
        }
        
        // Handle special toggle functionality
        if (toggleClass === 'center') {
            // Update code example for center class
            const codeElement = demoCard ? demoCard.querySelector('.code-example code') : null;
            
            if (codeElement) {
                const currentCode = codeElement.textContent;
                const hasClass = targetElement.classList.contains(toggleClass);
                
                if (hasClass) {
                    // Add center class to the code - handle both regular and icon tab lists
                    let updatedCode = currentCode.replace(
                        'class="nds-tab-list"',
                        'class="nds-tab-list center"'
                    ).replace(
                        'class="nds-tab-list" role="tablist" aria-label="Icon tab navigation"',
                        'class="nds-tab-list center" role="tablist" aria-label="Icon tab navigation"'
                    );
                    codeElement.textContent = updatedCode;
                } else {
                    // Remove center class from the code - handle both regular and icon tab lists
                    let updatedCode = currentCode.replace(
                        'class="nds-tab-list center"',
                        'class="nds-tab-list"'
                    ).replace(
                        'class="nds-tab-list center" role="tablist" aria-label="Icon tab navigation"',
                        'class="nds-tab-list" role="tablist" aria-label="Icon tab navigation"'
                    );
                    codeElement.textContent = updatedCode;
                }
            }
        }
        
        // Update button state to show active/inactive for non-background toggles
        if (toggleClass !== 'green-bg' && toggleClass !== 'black-bg' && toggleClass !== 'noBg') {
            button.classList.toggle('selected');
        }
    }

    // Expose global functions for backward compatibility if needed
    window.NDSShowcase = {
        handleCopyClick: handleCopyClick,
        showCopyFeedback: showCopyFeedback,
        initializeDemoToggleButtons: initializeDemoToggleButtons,
        updateButtonsForBackground: updateButtonsForBackground
    };

})();