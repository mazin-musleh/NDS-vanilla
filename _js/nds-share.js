/* NDS.Share — public surface
 * Rides: nds-copy (the copy-link action; soft — the other buttons work without it)
 *      · nds-dropmenu (when the buttons sit in a menu; soft — an inline row works too)
 * Requires:
 *   .nds-share needs .nds-share-x, .nds-share-linkedin, .nds-share-whatsapp, .nds-share-copy, [data-share-href] — no button shares
 * Methods:
 *   NDS.Share.init()   delegate clicks on .nds-share — safe to call again
 * Events:
 *   (none)
 * Hooks:
 *   data-share-url     on the .nds-share wrapper; defaults to the page URL. A URL whose
 *                      scheme is not http(s), mailto or tel is rejected and the page URL is used
 *   data-share-title   on the wrapper; defaults to document.title
 *   data-share-href    on any other button in the wrapper: a link pattern for a target the
 *                      classes don't cover; {url} and {title} are filled in, encoded
 * Gotchas:
 *   - The built-in targets are identified by CLASS: .nds-share-x, .nds-share-linkedin,
 *     .nds-share-whatsapp, .nds-share-copy. A class wins over data-share-href.
 *   - X, LinkedIn, WhatsApp and data-share-href open a 600×400 popup window; a mailto: or
 *     tel: pattern opens in the same tab, so no empty window stays behind.
 *   - init() stamps .nds-share-menu on each share dropmenu, so styling survives the menu
 *     portaling to <body>.
 */
(function () {
    'use strict';
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
        else shareOnHref(button.getAttribute('data-share-href'), url, title);
    }

    function shareOnHref(template, url, title) {
        const href = NDS.safeUrl(template && template.replace(/\{(url|title)\}/g, (_, key) => encodeURIComponent(key === 'url' ? url : title)));
        if (!href) return;
        // A mail or phone link opens its app; in a popup it would leave an empty window
        if (/^(mailto|tel):/.test(href)) window.location.href = href;
        else openPopup(href);
    }

    const TARGET_SELECTOR = '.nds-share-x, .nds-share-linkedin, .nds-share-whatsapp, .nds-share-copy, [data-share-href]';

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
