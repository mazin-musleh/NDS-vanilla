/**
 * NDS User Feedback Component
 * Handles user feedback interaction flow using data attributes
 *
 * Dependencies:
 * - nds-feedback.js (NDSFeedback API for displaying feedback messages)
 * - nds-cookies.js (for persisting feedback submission status)
 * - nds-forms.js (optional, for form validation)
 *
 * Language Detection:
 * Automatically detects page language from <html lang="..."> or <body lang="..."> attribute
 * - Arabic (default): 'تم استلام ملاحظتك!' / 'حدث خطأ، يرجى المحاولة مرة أخرى'
 * - English: 'Your feedback is submitted!' / 'An error occurred, please try again'
 *
 * Cookie Persistence:
 * Saves feedback submission status to cookies (365 days) based on page path
 * Automatically restores and displays success status when user returns to the page
 *
 * Cookie Category: ESSENTIAL/FUNCTIONAL
 * Feedback cookies are classified as essential functional cookies and do NOT require user consent.
 * They are necessary for:
 * - Preventing duplicate feedback submissions
 * - Maintaining form state across page visits
 * - Improving user experience by showing submission status
 * - Storing only minimal, non-personal data (page path + "submitted" status)
 *
 * Cookie Format: nds-feedback_{encoded_page_path} = "submitted"
 * Example: nds-feedback_components_buttons = "submitted"
 *
 * Data Attributes:
 * - data-success-message: Custom success message (overrides language defaults)
 * - data-error-message: Custom error message (overrides language defaults)
 */

NDS.UserFeedback = (() => {
    'use strict';

    // Helper function to generate cookie name for current page
    function getFeedbackCookieName() {
        const pagePath = window.location.pathname;
        // Encode path to safe cookie name format
        const encodedPath = pagePath.replace(/\//g, '_').replace(/\./g, '-');
        return 'nds-feedback' + encodedPath;
    }

    // Save feedback status to cookie
    // NOTE: These are ESSENTIAL/FUNCTIONAL cookies - no consent check required
    // They prevent duplicate submissions and maintain form state
    function saveFeedbackStatus(status = 'submitted') {
        if (NDS.Cookies && NDS.Cookies.set) {
            const cookieName = getFeedbackCookieName();
            NDS.Cookies.set(cookieName, status, 365); // Save for 365 days
        }
    }

    // Get feedback status from cookie
    function getFeedbackStatus() {
        if (NDS.Cookies && NDS.Cookies.get) {
            const cookieName = getFeedbackCookieName();
            return NDS.Cookies.get(cookieName);
        }
        return null;
    }

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

            // Check if user already submitted feedback for this page
            const savedStatus = getFeedbackStatus();
            if (savedStatus === 'submitted') {
                // User already submitted feedback, show success status
                showStatus('success');
                // Mark as initialized
                feedbackComponent.setAttribute('data-nds-user-feedback-initialized', 'true');
                return; // Don't initialize interaction handlers
            }

            // Show details section based on answer
            function showDetails(answer) {
                // Set data-state to details (UI state)
                NDS.State.set(feedbackComponent, 'details');

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

            // Show status state with success/error using NDSFeedback API
            function showStatus(status = 'success') {
                // Set data-state to status (UI state)
                NDS.State.set(feedbackComponent, 'status');

                // Detect page language
                const isArabic = NDS.isArabic;

                // Get custom message from data attribute or use language-specific defaults
                const defaultSuccessMessage = isArabic ? 'تم استلام ملاحظتك!' : 'Your feedback is submitted!';
                const defaultErrorMessage = isArabic ? 'حدث خطأ، يرجى المحاولة مرة أخرى' : 'An error occurred, please try again';

                const successMessage = feedbackComponent.getAttribute('data-success-message') || defaultSuccessMessage;
                const errorMessage = feedbackComponent.getAttribute('data-error-message') || defaultErrorMessage;
                const message = status === 'success' ? successMessage : errorMessage;

                // Create feedback message using NDSFeedback API
                if (NDS.Feedback && statusEl) {
                    // Clear any existing feedback in status element
                    NDS.Feedback.dismissAll(statusEl);

                    // Create new feedback message
                    NDS.Feedback.create({
                        message: message,
                        status: status,
                        target: statusEl,
                        position: 'append',
                        size: 'md',
                        style: '',
                        onDismiss: () => {
                            // Reset feedback when dismissed
                            resetFeedback();
                        }
                    });

                    // Show status element, hide others
                    if (statusEl) statusEl.removeAttribute('hidden');
                    if (closeButton) closeButton.setAttribute('hidden', '');
                    if (detailsEl) detailsEl.setAttribute('hidden', '');
                    if (submitEl) submitEl.setAttribute('hidden', '');
                } else {
                    // Fallback if NDSFeedback is not available
                    console.warn('NDSFeedback API not available');
                    NDS.Status.set(feedbackComponent, status);
                    if (statusEl) statusEl.removeAttribute('hidden');
                    if (closeButton) closeButton.setAttribute('hidden', '');
                    if (detailsEl) detailsEl.setAttribute('hidden', '');
                    if (submitEl) submitEl.setAttribute('hidden', '');
                }

                // Save feedback status to cookie if success
                if (status === 'success') {
                    saveFeedbackStatus('submitted');
                }
            }

            // Reset to initial state (overview)
            function resetFeedback() {
                // Remove data attributes
                NDS.State.clear(feedbackComponent);
                NDS.Status.clear(feedbackComponent);
                feedbackComponent.removeAttribute('data-answer');

                // Dismiss any feedback messages created by NDSFeedback API
                if (NDS.Feedback && statusEl) {
                    NDS.Feedback.dismissAll(statusEl);
                }

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

            // Scope all listeners to an AbortController so a future destroy/reinit can detach atomically
            feedbackComponent._ndsUfAC = new AbortController();
            const _ufSignal = feedbackComponent._ndsUfAC.signal;

            // Add click handlers to answer buttons
            answerButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const answer = this.getAttribute('data-answer');
                    showDetails(answer);
                }, { signal: _ufSignal });
            });

            // Add click handler to close button
            if (closeButton) {
                closeButton.addEventListener('click', function () {
                    resetFeedback();
                }, { signal: _ufSignal });
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
                }, { signal: _ufSignal });
            }

            // Mark as initialized
            feedbackComponent.setAttribute('data-nds-user-feedback-initialized', 'true');
        });
    }

    return { init };
})();
