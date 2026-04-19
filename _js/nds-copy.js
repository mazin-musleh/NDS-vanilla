/**
 * NDS Copy — shared clipboard utility with copy-button success state
 *
 * One code path for every "copy this text to the clipboard" button in the
 * project. Replaces the per-file implementations that previously lived in
 * nds-code.js (code blocks) and nds-share.js (share dropdown), and is used
 * inline by content like the Contact example's phone / email / emergency
 * numbers. The button's `data-status` is flipped to "success" for a short
 * flash after a successful copy, matching the existing visual pattern.
 *
 * Public API:
 *   NDS.Copy.writeText(text) → Promise<boolean>
 *     Tries navigator.clipboard, falls back to a temporary textarea +
 *     execCommand('copy') for non-secure contexts (e.g. dev over network IP).
 *
 *   NDS.Copy.flash(button, duration = 2000)
 *     Sets data-status="success" on the button, clears after `duration` ms.
 *
 *   NDS.Copy.copyFrom(button, duration)
 *     Reads the text the button wants to copy (see resolver below), writes
 *     it, and flashes on success.
 *
 *   NDS.Copy.bind(selector = '.copy-btn', { duration })
 *     Delegates click on `selector` to copyFrom. Safe to call repeatedly —
 *     each call replaces the previous listener for that selector.
 *
 *   NDS.Copy.init()
 *     Auto-binds '.copy-btn' for the page. Called by the NDS loader.
 *
 * Button resolution (first match wins):
 *   1. `data-copy="literal text"`            — copy the literal string
 *   2. `data-copy-target="#id-or-selector"`  — copy target element's textContent
 *   3. Button inside a `.nds-code` block     — copy the nested <code> textContent
 */
(function () {
    'use strict';
    if (typeof window === 'undefined') return;
    window.NDS = window.NDS || {};

    const DEFAULT_FLASH_MS = 2000;

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

    function flash(button, duration) {
        if (!button || !NDS.Status) return;

        // Swap the button's icon to the mask-based `.nds-icon-checkmark` for
        // the flash window, then restore. Replacing the class (instead of
        // relying on the old HGI font-glyph rule) works uniformly for
        // HGI-font `<i class="hgi ...">` and mask-based `.nds-icon` children.
        const icon = button.querySelector('i, .nds-icon');
        const originalClass = icon ? icon.getAttribute('class') : null;
        if (icon) icon.setAttribute('class', 'nds-icon nds-icon-checkmark');

        NDS.Status.set(button, 'success');
        setTimeout(() => {
            NDS.Status.clear(button);
            if (icon) {
                if (originalClass == null) icon.removeAttribute('class');
                else icon.setAttribute('class', originalClass);
            }
        }, duration || DEFAULT_FLASH_MS);
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

    async function copyFrom(button, duration) {
        const text = resolveText(button);
        if (!text) return false;
        const ok = await writeText(text);
        if (ok) flash(button, duration);
        return ok;
    }

    const _controllers = new Map();
    function bind(selector, options) {
        const sel = selector || '.copy-btn';
        const duration = options && options.duration;

        if (_controllers.has(sel)) _controllers.get(sel).abort();
        const ac = new AbortController();
        _controllers.set(sel, ac);

        document.addEventListener('click', (e) => {
            const btn = e.target.closest(sel);
            if (btn) copyFrom(btn, duration);
        }, { signal: ac.signal });
    }

    function init() {
        bind('.copy-btn');
    }

    NDS.Copy = {
        init,
        bind,
        writeText,
        flash,
        copyFrom
    };
})();
