// Share Page Dropdown
(() => {
    'use strict';

    class SharePageDropdown {
        constructor() {
            this.container = document.getElementById('nds-sharePage');
            this.button = document.getElementById('nds-sharePageBtn');
            this.dropdown = document.getElementById('nds-sharePage-dropdown');
            this.isOpen = false;

            this.init();
        }

        init() {
            // Add ARIA attributes
            this.button.setAttribute('aria-expanded', 'false');
            this.button.setAttribute('aria-haspopup', 'true');
            this.button.setAttribute('aria-controls', 'nds-sharePage-dropdown');

            // Button click event
            this.button.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggle();
            });

            // Menu item click events
            const menuItems = this.dropdown.querySelectorAll('button[role="menuitem"]');
            menuItems.forEach((item) => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleShare(item);
                });
            });

            // Close on outside click
            document.addEventListener('click', (e) => {
                if (!e.target.closest('#nds-sharePage')) {
                    this.close();
                }
            });
        }

        toggle() {
            if (this.isOpen) {
                this.close();
            } else {
                this.open();
            }
        }

        open() {
            this.isOpen = true;
            this.container.classList.add('open');
            this.button.setAttribute('aria-expanded', 'true');
        }

        close() {
            this.isOpen = false;
            this.container.classList.remove('open');
            this.button.setAttribute('aria-expanded', 'false');
        }

        handleShare(clickedItem) {
            if (!clickedItem) return;
            
            const url = window.location.href;
            const title = document.title;

            // Determine share type by class
            if (clickedItem.classList.contains('share-x')) {
                this.shareOnX(url, title);
                this.close();
            } else if (clickedItem.classList.contains('share-linkedin')) {
                this.shareOnLinkedIn(url);
                this.close();
            } else if (clickedItem.classList.contains('share-whatsapp')) {
                this.shareOnWhatsApp(url, title);
                this.close();
            } else if (clickedItem.classList.contains('share-copy')) {
                this.copyToClipboard(url);
                // Close dropdown after copied text is restored
            }
        }

        shareOnX(url, title) {
            const shareUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }

        shareOnLinkedIn(url) {
            const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }

        shareOnWhatsApp(url, title) {
            const shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }

        async copyToClipboard(text) {
            const copyLinkItem = this.dropdown.querySelector('.share-copy');
            if (!copyLinkItem) return;

            const labelElement = copyLinkItem.querySelector('.label');
            const originalText = labelElement.textContent;
            const copiedText = copyLinkItem.dataset.copiedText || 'Link Copied!';

            try {
                await navigator.clipboard.writeText(text);
                this.showCopiedState(copyLinkItem, labelElement, copiedText, originalText, 1500);
            } catch (err) {
                this.showCopiedState(copyLinkItem, labelElement, copiedText, originalText, 2000, true);
            }
        }

        showCopiedState(item, label, copiedText, originalText, duration, shouldClose = false) {
            item.classList.add('copied');
            label.textContent = copiedText;

            setTimeout(() => {
                item.classList.remove('copied');
                label.textContent = originalText;
                if (shouldClose) this.close();
            }, duration);
        }

    }

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        // Check if required elements exist before initializing
        const shareButton = document.getElementById('nds-sharePageBtn');
        const shareDropdown = document.getElementById('nds-sharePage-dropdown');

        if (shareButton && shareDropdown) {
            new SharePageDropdown();
        }
    });

})();