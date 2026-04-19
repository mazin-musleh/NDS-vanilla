/**
 * NDS Copy — shared clipboard utility with copy-button success state
 *
 * One code path for every "copy this text to the clipboard" button in the
 * project. Used by:
 *   - .nds-code blocks (delegated by nds-code.js)
 *   - the share dropmenu (driven by nds-share.js, which composes
 *     writeText + flash so the URL stays dynamic)
 *   - inline content like the Contact example's phone / email / emergency
 *     numbers (auto-bound via .nds-copy)
 *
 * Public API:
 *   NDS.Copy.writeText(text) → Promise<boolean>
 *     Tries navigator.clipboard, falls back to a temporary textarea +
 *     execCommand('copy') for non-secure contexts (e.g. dev over network IP).
 *
 *   NDS.Copy.flash(button, { duration, onRestore })
 *     Sets data-status="success", swaps the icon to a checkmark, swaps the
 *     .nds-label to data-label, announces data-message via the shared
 *     aria-live region, then restores everything after `duration`
 *     (default 2000 ms) and fires `onRestore`.
 *
 *   NDS.Copy.copyFrom(button, options)
 *     Reads the text the button wants to copy (see resolver below), writes
 *     it, and flashes on success. `options` is forwarded to flash().
 *
 *   NDS.Copy.bind(selector = '.nds-copy', { duration })
 *     Delegates click on `selector` to copyFrom. Safe to call repeatedly —
 *     each call replaces the previous listener for that selector.
 *
 *   NDS.Copy.init()
 *     Auto-binds '.nds-copy' for the page. Called by the NDS loader.
 *
 * Button text resolution (first match wins):
 *   1. `data-copy="literal text"`            — copy the literal string
 *   2. `data-copy-target="#id-or-selector"`  — copy target element's textContent
 *   3. Button inside a `.nds-code` block     — copy the nested <code> textContent
 *
 * Button success-state attributes (read by flash()):
 *   - `data-label="Link Copied!"`            — visible label swap (uses .nds-label)
 *   - `data-message="Page link copied…"`     — aria-live announcement (falls back
 *                                              to data-label, then "Copied")
 */
(function () {
    'use strict';
    if (typeof window === 'undefined') return;
    window.NDS = window.NDS || {};

    const DEFAULT_FLASH_MS = 2000;
    const CHECKMARK_CLASS = 'nds-icon-checkmark';
    let _liveRegion = null;

    async function writeText(text) {
        if (text == null || text === '') return false;

        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(text);
                return true;
            } catch (_) {
                // Fall through to execCommand fallback
            }
        }

        try {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.setAttribute('readonly', '');
            ta.style.position = 'fixed';
            ta.style.left = '-9999px';
            ta.style.top = '0';
            document.body.appendChild(ta);
            ta.select();
            const ok = document.execCommand('copy');
            document.body.removeChild(ta);
            return ok;
        } catch (_) {
            return false;
        }
    }

    function getLiveRegion() {
        if (_liveRegion && document.body.contains(_liveRegion)) return _liveRegion;
        _liveRegion = document.createElement('div');
        _liveRegion.className = 'sr-only nds-copy-live';
        _liveRegion.setAttribute('aria-live', 'polite');
        _liveRegion.setAttribute('aria-atomic', 'true');
        document.body.appendChild(_liveRegion);
        return _liveRegion;
    }

    function announce(message) {
        if (!message) return;
        const region = getLiveRegion();
        // Clear-then-set so AT re-announces even if the message text repeats
        region.textContent = '';
        setTimeout(() => { region.textContent = message; }, 30);
    }

    function flash(button, options) {
        if (!button) return;
        const opts = options || {};
        const duration = opts.duration || DEFAULT_FLASH_MS;

        const labelText = button.getAttribute('data-label');
        const messageText = button.getAttribute('data-message') || labelText || 'Copied';

        // Icon swap: snapshot the className and replace with the mask
        // checkmark for the flash window. Wholesale replace is needed because
        // the source icon may be an HGI font glyph (`hgi hgi-stroke hgi-…`)
        // that requires its font classes removed for the mask to take over.
        const icon = button.querySelector('i, .nds-icon');
        let originalIconClass = null;
        if (icon) {
            originalIconClass = icon.getAttribute('class');
            icon.setAttribute('class', 'nds-icon ' + CHECKMARK_CLASS);
        }

        // Label swap
        let labelEl = null;
        let originalLabel = null;
        if (labelText) {
            labelEl = button.querySelector('.nds-label');
            if (labelEl) {
                originalLabel = labelEl.textContent;
                labelEl.textContent = labelText;
            }
        }

        if (NDS.Status) NDS.Status.set(button, 'success');
        announce(messageText);

        setTimeout(() => {
            if (NDS.Status) NDS.Status.clear(button);
            if (icon) {
                if (originalIconClass == null) icon.removeAttribute('class');
                else icon.setAttribute('class', originalIconClass);
            }
            if (labelEl && originalLabel != null) labelEl.textContent = originalLabel;
            if (typeof opts.onRestore === 'function') opts.onRestore();
        }, duration);
    }

    function resolveText(button) {
        if (!button) return '';

        if (button.hasAttribute('data-copy')) {
            return button.getAttribute('data-copy') || '';
        }

        const targetSel = button.getAttribute('data-copy-target');
        if (targetSel) {
            const target = document.querySelector(targetSel);
            if (target) return target.textContent.trim();
        }

        const codeWrap = button.closest('.nds-code');
        const codeBlock = codeWrap && codeWrap.querySelector('code');
        if (codeBlock) return codeBlock.textContent;

        return '';
    }

    async function copyFrom(button, options) {
        const text = resolveText(button);
        if (!text) return false;
        const ok = await writeText(text);
        if (ok) flash(button, options);
        return ok;
    }

    const _controllers = new Map();
    function bind(selector, options) {
        const sel = selector || '.nds-copy';
        const opts = options || {};

        if (_controllers.has(sel)) _controllers.get(sel).abort();
        const ac = new AbortController();
        _controllers.set(sel, ac);

        document.addEventListener('click', (e) => {
            const btn = e.target.closest(sel);
            if (btn) copyFrom(btn, opts);
        }, { signal: ac.signal });
    }

    function init() {
        bind('.nds-copy');
    }

    NDS.Copy = {
        init,
        bind,
        writeText,
        flash,
        copyFrom
    };
})();
