/**
 * National Design System - Showcase JavaScript
 * Common functionality for component demonstration pages
 */

(function() {
    'use strict';

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initializeCopyButtons();
        initializeDemoCardSwitchers();
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

    // Background switcher functionality for oncolor button demos
    function initializeDemoCardSwitchers() {
        const demoCards = document.querySelectorAll('.nds-demo-card');
        
        demoCards.forEach(card => {
            const demoAction = card.querySelector('.demo-action');
            const demoContainer = card.querySelector('.demo-container');
            
            if (demoAction && demoContainer) {
                const bgButtons = demoAction.querySelectorAll('.demo-bg-btn');
                
                // Check if this card contains oncolor buttons
                const hasOncolorButtons = demoContainer.querySelector('.nds-btn-oncolor');
                
                if (bgButtons.length > 0 && hasOncolorButtons) {
                    initializeSingleCardSwitcher(card, bgButtons, demoContainer);
                }
            }
        });
    }

    function initializeSingleCardSwitcher(card, bgButtons, demoContainer) {
        bgButtons.forEach(button => {
            button.addEventListener('click', () => {
                const bgColor = button.getAttribute('data-bg');
                
                // Remove existing background classes
                demoContainer.classList.remove('green-bg', 'black-bg');
                
                // Add new background class
                if (bgColor === 'green') {
                    demoContainer.classList.add('green-bg');
                    updateButtonsForBackground(demoContainer, 'green');
                } else if (bgColor === 'black') {
                    demoContainer.classList.add('black-bg');
                    updateButtonsForBackground(demoContainer, 'black');
                }
                
                // Update button states
                bgButtons.forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
            });
        });
        
        // Initialize with green background by default only for oncolor cards
        demoContainer.classList.add('green-bg');
        if (bgButtons[0]) {
            bgButtons[0].classList.add('selected');
        }
    }

    function updateButtonsForBackground(container, bgColor) {
        const buttons = container.querySelectorAll('.nds-btn');
        
        buttons.forEach(button => {
            if (bgColor === 'black' || bgColor === 'green') {
                // Add oncolor class for colored backgrounds
                if (!button.classList.contains('nds-btn-oncolor')) {
                    button.classList.add('nds-btn-oncolor');
                }
            } else {
                // Remove oncolor class for default background
                button.classList.remove('nds-btn-oncolor');
            }
        });
    }

    // Demo toggle button functionality
    function initializeDemoToggleButtons() {
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
        const targetSelector = button.getAttribute('data-target');
        
        if (!toggleClass || !targetSelector) {
            console.error('Toggle button missing required data attributes');
            return;
        }

        let targetElement;
        
        // If target is just a class (like .demo-container), find it relative to the button
        if (targetSelector.startsWith('.')) {
            const demoCard = button.closest('.nds-demo-card');
            targetElement = demoCard ? demoCard.querySelector(targetSelector) : null;
        } else {
            // Otherwise use global selector
            targetElement = document.querySelector(targetSelector);
        }

        if (!targetElement) {
            console.error('Target element not found:', targetSelector);
            return;
        }

        // Toggle the class
        targetElement.classList.toggle(toggleClass);
        
        // Update button state to show active/inactive
        button.classList.toggle('selected');
    }

    // Expose global functions for backward compatibility if needed
    window.NDSShowcase = {
        handleCopyClick: handleCopyClick,
        showCopyFeedback: showCopyFeedback,
        initializeDemoCardSwitchers: initializeDemoCardSwitchers,
        initializeDemoToggleButtons: initializeDemoToggleButtons
    };

})();