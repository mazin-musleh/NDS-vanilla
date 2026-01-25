/**
 * NDS User Feedback Component
 * Handles user feedback interaction flow using data attributes
 */

window.NDSUserFeedback = (() => {
    'use strict';

    function init() {
        const feedbackComponents = document.querySelectorAll('.nds-user-feedback');
        if (!feedbackComponents.length) return;

        feedbackComponents.forEach(feedbackComponent => {
            // Skip if already initialized
            if (feedbackComponent.hasAttribute('data-nds-user-feedback-initialized')) return;

            const answerButtons = feedbackComponent.querySelectorAll('.nds-user-feedback-answer-btn .nds-btn');
            const closeButton = feedbackComponent.querySelector('.nds-user-feedback-close');
            const submitButton = feedbackComponent.querySelector('.nds-user-feedback-submit-btn');

            // Cache DOM elements
            const statusEl = feedbackComponent.querySelector('.nds-user-feedback-status');
            const detailsEl = feedbackComponent.querySelector('.nds-user-feedback-details');
            const submitEl = feedbackComponent.querySelector('.nds-user-feedback-submit');

            // Show details section based on answer
            function showDetails(answer) {
                // Set data-state to details (UI state)
                feedbackComponent.setAttribute('data-state', 'details');

                // Set data-answer attribute based on answer
                if (answer === 'Yes') {
                    feedbackComponent.setAttribute('data-answer', 'yes');
                } else if (answer === 'No') {
                    feedbackComponent.setAttribute('data-answer', 'no');
                }

                // Remove hidden from elements that should be visible
                if (closeButton) closeButton.removeAttribute('hidden');
                if (detailsEl) detailsEl.removeAttribute('hidden');
                if (submitEl) submitEl.removeAttribute('hidden');
            }

            // Show status state with success/error
            function showStatus(status = 'success') {
                // Set data-state to status (UI state)
                feedbackComponent.setAttribute('data-state', 'status');
                // Set data-status for success/error
                feedbackComponent.setAttribute('data-status', status);

                // Show status, hide others
                if (statusEl) statusEl.removeAttribute('hidden');
                if (closeButton) closeButton.setAttribute('hidden', '');
                if (detailsEl) detailsEl.setAttribute('hidden', '');
                if (submitEl) submitEl.setAttribute('hidden', '');
            }

            // Reset to initial state (overview)
            function resetFeedback() {
                // Remove data attributes
                feedbackComponent.removeAttribute('data-state');
                feedbackComponent.removeAttribute('data-status');
                feedbackComponent.removeAttribute('data-answer');

                // Restore hidden attributes
                if (statusEl) statusEl.setAttribute('hidden', '');
                if (closeButton) closeButton.setAttribute('hidden', '');
                if (detailsEl) detailsEl.setAttribute('hidden', '');
                if (submitEl) submitEl.setAttribute('hidden', '');

                // Reset checkboxes
                const checkboxes = feedbackComponent.querySelectorAll('input[type="checkbox"]');
                checkboxes.forEach(checkbox => {
                    checkbox.checked = false;
                });

                // Reset radio buttons
                const radios = feedbackComponent.querySelectorAll('input[type="radio"]');
                radios.forEach(radio => {
                    radio.checked = false;
                });

                // Clear textarea
                const textarea = feedbackComponent.querySelector('textarea');
                if (textarea) textarea.value = '';
            }

            // Add click handlers to answer buttons
            answerButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const answer = this.getAttribute('data-answer');
                    showDetails(answer);
                });
            });

            // Add click handler to close button
            if (closeButton) {
                closeButton.addEventListener('click', function () {
                    resetFeedback();
                });
            }

            // Handle form submission to show success message
            if (submitButton) {
                submitButton.addEventListener('click', function (e) {
                    e.preventDefault();

                    // Find the parent form and validate
                    const form = feedbackComponent.closest('.nds-form') || feedbackComponent.closest('form');
                    if (form && window.NDS && window.NDS.Forms && window.NDS.Forms.validateForm) {
                        const result = window.NDS.Forms.validateForm(form, { showMessages: true, focusFirst: true });
                        if (!result.valid) {
                            return; // Don't show success if validation fails
                        }
                    }

                    showStatus('success');
                });
            }

            // Mark as initialized
            feedbackComponent.setAttribute('data-nds-user-feedback-initialized', 'true');
        });
    }

    return { init };
})();
