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

    // Read the share URL from the wrapper, validating the scheme. The
    // `data-share-url` attribute is caller-controlled markup; without
    // validation, `data-share-url="javascript:alert(1)"` would pollute the
    // clipboard via the copy path (and any future direct-navigation caller).
    // Falls back to the page URL when the attribute is missing or its
    // scheme is outside the navigation allowlist.
    function getShareUrl(wrapper) {
        return NDS.safeUrl(wrapper.getAttribute('data-share-url')) || window.location.href;
    }

    async function copyLink(url, button) {
        // Soft dependency — share's copy-link action no-ops if NDS.Copy isn't bundled.
        if (!NDS.Copy) return;
        const ok = await NDS.Copy.writeText(url);
        if (!ok || !button) return;
        // NDS.closest is portal-aware — reaches .nds-share even after the
        // dropmenu menu portals to <body>.
        const wrapper = NDS.closest(button, '.nds-share');
        NDS.Copy.flash(button, {
            onRestore: () => {
                if (wrapper && wrapper.ndsDropmenu) wrapper.ndsDropmenu.close();
            }
        });
    }

    function handleClick(button) {
        const wrapper = NDS.closest(button, '.nds-share');
        if (!wrapper) return;
        const url = getShareUrl(wrapper);
        const title = wrapper.getAttribute('data-share-title') || document.title;

        if (button.classList.contains('nds-share-x')) shareOnX(url, title);
        else if (button.classList.contains('nds-share-linkedin')) shareOnLinkedIn(url);
        else if (button.classList.contains('nds-share-whatsapp')) shareOnWhatsApp(url, title);
        else if (button.classList.contains('nds-share-copy')) copyLink(url, button);
    }

    const TARGET_SELECTOR = '.nds-share-x, .nds-share-linkedin, .nds-share-whatsapp, .nds-share-copy';

    let _abortController = null;
    function init() {
        if (_abortController) _abortController.abort();
        _abortController = new AbortController();
        // Portal-safe identifier on each share menu (rule: a component-owned
        // menu names itself so styling/hooks survive the menu portaling to
        // <body>). Share items are plain buttons — no nested dropmenu to
        // mis-stamp — so a scoped sweep is unambiguous.
        document.querySelectorAll('.nds-share .nds-dropmenu-menu')
            .forEach(m => m.classList.add('nds-share-menu'));
        document.addEventListener('click', (e) => {
            const button = e.target.closest(TARGET_SELECTOR);
            if (!button) return;
            const wrapper = NDS.closest(button, '.nds-share');
            if (!wrapper) return;
            handleClick(button);
        }, { signal: _abortController.signal });
    }

    NDS.Share = { init };
})();
