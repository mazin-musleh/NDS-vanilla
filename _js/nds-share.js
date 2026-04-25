/**
 * NDS Share — standalone share-page utility
 *
 * Binds to any `.nds-share` wrapper containing share buttons with one of
 * `.nds-share-x`, `.nds-share-linkedin`, `.nds-share-whatsapp`,
 * `.nds-share-copy`. Works with either a `.nds-dropmenu` trigger or an
 * `.nds-inline` row of buttons — the module only wires click handlers.
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

    // Walk up to a `.nds-share` wrapper, falling back via the menu's
    // `_ownerDropmenu` backref. Needed because the share buttons usually
    // live inside a `.nds-share.nds-dropmenu` whose menu portals to <body>
    // when open — at that point the buttons are no longer DOM descendants
    // of `.nds-share`, so plain `closest()` returns null.
    function shareWrapperFrom(el) {
        if (!el) return null;
        const direct = el.closest('.nds-share');
        if (direct) return direct;
        const menu = el.closest('.nds-dropmenu-menu');
        const owner = menu && menu._ownerDropmenu;
        return owner && owner.classList.contains('nds-share') ? owner : null;
    }

    async function copyLink(url, button) {
        if (!NDS.Copy) return;
        const ok = await NDS.Copy.writeText(url);
        if (!ok || !button) return;
        const wrapper = shareWrapperFrom(button);
        NDS.Copy.flash(button, {
            onRestore: () => {
                if (wrapper && wrapper.ndsDropmenu) wrapper.ndsDropmenu.close();
            }
        });
    }

    function handleClick(button) {
        const wrapper = shareWrapperFrom(button);
        if (!wrapper) return;
        const url = wrapper.getAttribute('data-share-url') || window.location.href;
        const title = wrapper.getAttribute('data-share-title') || document.title;

        if (button.classList.contains('nds-share-x')) shareOnX(url, title);
        else if (button.classList.contains('nds-share-linkedin')) shareOnLinkedIn(url);
        else if (button.classList.contains('nds-share-whatsapp')) shareOnWhatsApp(url, title);
        else if (button.classList.contains('nds-share-copy')) copyLink(url, button);
    }

    const TARGET_SELECTOR = '.nds-share-x, .nds-share-linkedin, .nds-share-whatsapp, .nds-share-copy';

    let _ac = null;
    function init() {
        if (_ac) _ac.abort();
        _ac = new AbortController();
        document.addEventListener('click', (e) => {
            const button = e.target.closest(TARGET_SELECTOR);
            if (!button) return;
            const wrapper = shareWrapperFrom(button);
            if (!wrapper) return;
            handleClick(button);
        }, { signal: _ac.signal });
    }

    NDS.Share = { init };
})();
