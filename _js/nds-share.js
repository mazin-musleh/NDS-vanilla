// Share Page Functionality
// Uses nds-dropmenu for dropdown behavior
(() => {
    'use strict';

    class SharePageDropdown {
        constructor() {
            this.container = document.getElementById('nds-sharePage');
            this.dropdown = document.getElementById('nds-sharePage-dropdown');

            if (!this.container || !this.dropdown) {
                console.warn('NDS Share: Required elements not found');
                return;
            }

            this._ac = new AbortController();
            this.init();
        }

        init() {
            // nds-dropmenu auto-initializes via its own init system
            // No manual initialization needed here

            // Menu item click events for share functionality
            const menuItems = this.dropdown.querySelectorAll('.nds-dropmenu-item');
            menuItems.forEach((item) => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleShare(item);
                }, { signal: this._ac.signal });
            });
        }

        destroy() {
            if (this._ac) this._ac.abort();
        }

        handleShare(clickedItem) {
            if (!clickedItem) return;

            const url = window.location.href;
            const title = document.title;

            // Determine share type by class
            if (clickedItem.classList.contains('nds-share-x')) {
                this.shareOnX(url, title);
            } else if (clickedItem.classList.contains('nds-share-linkedin')) {
                this.shareOnLinkedIn(url);
            } else if (clickedItem.classList.contains('nds-share-whatsapp')) {
                this.shareOnWhatsApp(url, title);
            } else if (clickedItem.classList.contains('nds-share-copy')) {
                this.copyToClipboard(url);
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
            const copyLinkItem = this.dropdown.querySelector('.nds-share-copy');
            if (!copyLinkItem) return;

            const labelElement = copyLinkItem.querySelector('.nds-label');
            const originalText = labelElement.textContent;
            const copiedText = copyLinkItem.dataset.copiedText || 'Link Copied!';

            let copied = false;

            // Try modern Clipboard API (requires secure context: HTTPS or localhost)
            if (navigator.clipboard && window.isSecureContext) {
                try {
                    await navigator.clipboard.writeText(text);
                    copied = true;
                } catch (err) {
                    console.warn('NDS Share: Clipboard API failed, trying fallback', err);
                }
            }

            // Fallback via temporary textarea — works on non-secure contexts (network IPs in dev)
            if (!copied) {
                try {
                    const ta = document.createElement('textarea');
                    ta.value = text;
                    ta.setAttribute('readonly', '');
                    ta.style.position = 'fixed';
                    ta.style.left = '-9999px';
                    ta.style.top = '0';
                    document.body.appendChild(ta);
                    ta.select();
                    copied = document.execCommand('copy');
                    document.body.removeChild(ta);
                } catch (fallbackErr) {
                    console.warn('NDS Share: Fallback copy failed', fallbackErr);
                }
            }

            if (copied) {
                this.showCopiedState(copyLinkItem, labelElement, copiedText, originalText);
            } else {
                console.warn('NDS Share: Could not copy to clipboard');
            }
        }

        showCopiedState(item, label, copiedText, originalText) {
            NDS.Status.set(item, 'success');
            label.textContent = copiedText;

            // Restore original state and close dropdown after 2000ms
            setTimeout(() => {
                NDS.Status.clear(item);
                label.textContent = originalText;

                // Close the dropdown using nds-dropmenu API
                this.closeDropdown();
            }, 2000);
        }

        closeDropdown() {
            // Access the nds-dropmenu instance and close it
            if (this.container && this.container.ndsDropmenu) {
                this.container.ndsDropmenu.close();
            }
        }

    }

    function initializeShareDropdown() {
        // Check if required elements exist before initializing
        const shareContainer = document.getElementById('nds-sharePage');
        const shareDropdown = document.getElementById('nds-sharePage-dropdown');

        if (shareContainer && shareDropdown) {
            new SharePageDropdown();
        }
    }

    // CRITICAL: Expose global API immediately (called by unified init system)
    if (typeof window !== 'undefined') {
        NDS.Share = {
            SharePageDropdown,
            init: initializeShareDropdown
        };
    }

    // Note: Initialization now handled by nds-loader.js unified system

})();