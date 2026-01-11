/**
 * NDS User Feedback Component
 * Handles user feedback interaction flow using data attributes
 */

(function () {
    'use strict';

    function initUserFeedback() {
        const feedbackComponent = document.querySelector('.nds-user-feedback');
        if (!feedbackComponent) return;

        const answerButtons = feedbackComponent.querySelectorAll('.nds-user-feedback-answer-btn .nds-btn');
        const closeButton = feedbackComponent.querySelector('.nds-user-feedback-close');
        const submitButton = feedbackComponent.querySelector('.nds-user-feedback-submit-btn');

        // Show details section based on answer
        function showDetails(answer) {
            // Set data-status attribute to details
            feedbackComponent.setAttribute('data-status', 'details');

            // Set data-answer attribute based on answer
            if (answer === 'Yes') {
                feedbackComponent.setAttribute('data-answer', 'yes');
            } else if (answer === 'No') {
                feedbackComponent.setAttribute('data-answer', 'no');
            }
        }

        // Show success state
        function showSuccess() {
            // Set data-status attribute to success
            feedbackComponent.setAttribute('data-status', 'success');
        }

        // Reset to initial state
        function resetFeedback() {
            // Remove data attributes
            feedbackComponent.removeAttribute('data-status');
            feedbackComponent.removeAttribute('data-answer');

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
                showSuccess();
            });
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initUserFeedback);
    } else {
        initUserFeedback();
    }
})();
