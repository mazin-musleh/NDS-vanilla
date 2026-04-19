/**
 * NDS Share — standalone share-page utility
 *
 * Binds to any `.nds-share` wrapper containing a `.nds-dropmenu` trigger and
 * four item buttons (`.nds-share-x`, `.nds-share-linkedin`,
 * `.nds-share-whatsapp`, `.nds-share-copy`). Author writes the full dropmenu
 * markup; this module only wires click handlers.
 *
 * Per-instance overrides on the `.nds-share` wrapper:
 *   - data-share-url="https://…"   defaults to window.location.href
 *   - data-share-title="…"         defaults to document.title
 *
 * Public API:
 *   NDS.Share.init()   Delegate click on '.nds-share'. Called by the loader.
 *                      Repeat-safe via AbortController.
 */
(function () {
    'use strict';
    if (typeof window === 'undefined') return;
    window.NDS = window.NDS || {};

    const POPUP_FEATURES = 'width=600,height=400';

    function openPopup(url) {
        window.open(url, '_blank', POPUP_FEATURES);
    }

    function shareOnX(url, title) {
        openPopup(`https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`);
    }

    function shareOnLinkedIn(url) {
        openPopup(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
    }

    function shareOnWhatsApp(url, title) {
        openPopup(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`);
    }

    async function copyLink(url, button) {
        if (!NDS.Copy) return;
        const ok = await NDS.Copy.writeText(url);
        if (!ok || !button) return;
        const wrapper = button.closest('.nds-share, .nds-dropmenu');
        NDS.Copy.flash(button, {
            onRestore: () => {
                if (wrapper && wrapper.ndsDropmenu) wrapper.ndsDropmenu.close();
            }
        });
    }

    function handleClick(button) {
        const wrapper = button.closest('.nds-share');
        if (!wrapper) return;
        const url = wrapper.getAttribute('data-share-url') || window.location.href;
        const title = wrapper.getAttribute('data-share-title') || document.title;

        if (button.classList.contains('nds-share-x')) shareOnX(url, title);
        else if (button.classList.contains('nds-share-linkedin')) shareOnLinkedIn(url);
        else if (button.classList.contains('nds-share-whatsapp')) shareOnWhatsApp(url, title);
        else if (button.classList.contains('nds-share-copy')) copyLink(url, button);
    }

    let _ac = null;
    function init() {
        if (_ac) _ac.abort();
        _ac = new AbortController();
        document.addEventListener('click', (e) => {
            const wrapper = e.target.closest('.nds-share');
            if (!wrapper) return;
            const button = e.target.closest('.nds-dropmenu-item');
            if (!button || !wrapper.contains(button)) return;
            handleClick(button);
        }, { signal: _ac.signal });
    }

    NDS.Share = { init };
})();
