/* NDS.Print — public surface
 * Rides: (none — base component)
 * Methods:
 *   NDS.Print.init()           wire the delegated [data-print-target] click
 *   NDS.Print.print(target)    print one element alone; target: Element, id or selector.
 *                              Returns false when it names no element
 * Events:
 *   (none)
 * Hooks:
 *   on the button:   data-print-target (the id of the element to print alone)
 *   written by the component for the print, removed on afterprint:
 *                    data-nds-print-self + --nds-print-width (its width on screen) on the
 *                    target · data-nds-print-path on its parents · data-nds-print-skip on
 *                    every element beside them
 *   written for any print, removed on afterprint: data-theme loses its dark token on
 *                    every element except the target and what is inside it
 * Gotchas:
 *   - Main bundle on purpose: the light print of dark areas runs on every page. Only the
 *     click listener waits for init, on a page with a [data-print-target].
 *   - The print rules and data-hidden="print" are CSS (_utilities.scss).
 *   - Ctrl+P prints the whole page. Only the button or print() prints the target alone.
 *   - A browser that never fires afterprint keeps the marks until the next print.
 */
(function () {
    'use strict';

    let initDone = false;

    // Paper is white: the page and every dark area on it print in their light
    // variant (other theme tokens stay), then dark comes back. A print target's own
    // data-theme stays: it is that document's design. Wired at load, on every page:
    // a visitor can turn dark on after load, and it costs nothing until a print.
    let printThemes = [];
    addEventListener('beforeprint', () => {
        document.querySelectorAll('[data-theme~="dark"]').forEach(el => {
            if (el.closest('[data-nds-print-self]')) return;
            const theme = el.getAttribute('data-theme');
            printThemes.push([el, theme]);
            const light = theme.split(/\s+/).filter(x => x && x !== 'dark').join(' ');
            if (light) el.setAttribute('data-theme', light); else el.removeAttribute('data-theme');
        });
    });
    addEventListener('afterprint', () => {
        printThemes.forEach(([el, theme]) => el.setAttribute('data-theme', theme));
        printThemes = [];
    });

    function clearMarks() {
        document.querySelectorAll('[data-nds-print-skip], [data-nds-print-path]').forEach(el => {
            el.removeAttribute('data-nds-print-skip');
            el.removeAttribute('data-nds-print-path');
        });
        document.querySelectorAll('[data-nds-print-self]').forEach(el => {
            el.removeAttribute('data-nds-print-self');
            el.style.removeProperty('--nds-print-width');
        });
    }

    // Everything that is neither the target nor a parent of it is skipped (display: none
    // on paper, so no blank pages); the parents print as plain boxes, so their frames stay off.
    function print(ref) {
        const target = NDS.resolveEl(ref);
        if (!target) {
            console.warn('[NDS.Print] no element resolved for', ref);
            return false;
        }
        clearMarks();
        // Its width on screen: the plain parents would stretch it to the sheet.
        target.style.setProperty('--nds-print-width', target.getBoundingClientRect().width + 'px');
        target.setAttribute('data-nds-print-self', '');
        for (let el = target; el.parentElement && el !== document.body; el = el.parentElement) {
            if (el !== target) el.setAttribute('data-nds-print-path', '');
            for (const sib of el.parentElement.children) if (sib !== el) sib.setAttribute('data-nds-print-skip', '');
        }
        addEventListener('afterprint', clearMarks, { once: true });
        window.print();
        return true;
    }

    function handlePrintClick(e) {
        const btn = e.target.closest?.('[data-print-target]');
        if (btn && print(btn.getAttribute('data-print-target'))) e.preventDefault();
    }

    // Loader-driven (registered on selector [data-print-target]).
    function init() {
        if (initDone) return;
        initDone = true;
        document.addEventListener('click', handlePrintClick);
    }

    NDS.Print = { init, print };
})();
