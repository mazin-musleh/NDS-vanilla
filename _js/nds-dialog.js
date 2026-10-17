/* NDS.dialog — internal core that Modal and Panel share for a <dialog>
 * Rides: <dialog> show() + popover through NDS.topLayer (the top layer, the dim layer); an inert
 *        page, set once the open animation ends. No popover support: showModal()
 * Methods:
 *   NDS.dialog.show(dlg, signal)     open it modal; the first one locks scroll. NDS owns Escape and
 *                                    every click outside it while signal lives
 *   NDS.dialog.close(dlg)            hide its menus and close it; the last one unlocks scroll
 *   NDS.dialog.top()                 the newest open modal dialog, or undefined
 *   NDS.dialog.hideMenus(dlg)        close the open popovers inside it
 *   NDS.dialog.onOutside(dlg, fn, signal)  fn on a click outside it, while it is the top one
 * Gotchas:
 *   - The page goes inert after the open animation: making ~1,000 elements inert restyles them
 *     all (~300 ms on a phone), and showModal() did that inside the click.
 *   - A popover's dim layer lets clicks through, so a capture listener holds every click outside
 *     the top dialog. data-nds-modal marks a modal one; :modal matches only the fallback.
 *   - <dialog> does not lock scroll: NDS.scrollLock is held from the first show() to the last close().
 *   - One dim layer: each modal dialog under the top carries data-nds-under, and CSS hides its ::backdrop.
 */
(function () {
  'use strict';

  const POPOVER = 'showPopover' in HTMLElement.prototype;
  const open = []; // modal dialogs, bottom to top
  let inerted = []; // what this core made inert
  const SKIP = new Set(['SCRIPT', 'TEMPLATE', 'STYLE', 'LINK', 'NOSCRIPT']);

  const top = () => open[open.length - 1];
  const mark = () => open.forEach((d, i) => d.toggleAttribute('data-nds-under', i < open.length - 1));

  // Every sibling on the way up from the top dialog goes inert; what no longer needs it comes back.
  // Skips what something else made inert.
  function syncInert() {
    const want = new Set();
    for (let n = top(); n && n !== document.body && n.parentElement; n = n.parentElement) {
      for (const sib of n.parentElement.children) {
        if (sib !== n && !SKIP.has(sib.tagName) && (!sib.inert || inerted.includes(sib))) want.add(sib);
      }
    }
    inerted.forEach((el) => { if (!want.has(el)) el.inert = false; });
    want.forEach((el) => { el.inert = true; });
    inerted = [...want];
  }

  // ponytail: Main Navigation, Side Menu and the image viewer still dim through NDS.Backdrop; a dialog
  // above hides that layer. Goes when they move (plans/top-layer.md steps 5–6).
  const backdropUnder = (on) => document.querySelector('.nds-backdrop')?.toggleAttribute('data-nds-under', on);

  // A menu inside is a popover of its own: closing the dialog leaves it open in the top layer.
  // Without popover there is none, and Safari 16 throws on the selector.
  const hideMenus = (dlg) => POPOVER && dlg.querySelectorAll(':popover-open').forEach((p) => p.hidePopover());

  // The fallback's dim layer is the dialog itself, outside its box; the popover's lets the click through.
  const outside = (dlg, e) => {
    if (e.target !== dlg) return !dlg.contains(e.target);
    const r = dlg.getBoundingClientRect();
    return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
  };
  const away = (dlg, e) => top() === dlg && outside(dlg, e);

  function show(dlg, signal) {
    if (!open.includes(dlg)) {
      if (!open.length) {
        NDS.scrollLock.lock();
        backdropUnder(true);
      }
      open.push(dlg);
      mark();
    }
    dlg.setAttribute('data-nds-modal', '');
    // An Escape a control inside stopped short of the component's own handler.
    dlg.addEventListener('cancel', (e) => e.preventDefault(), { signal });
    // Until the page is inert, nothing behind may take a click.
    document.addEventListener('click', (e) => { if (away(dlg, e)) { e.preventDefault(); e.stopPropagation(); } }, { capture: true, signal });
    // Re-opened during its fade, it is still open.
    if (dlg.open) return;
    if (!POPOVER) { dlg.showModal(); return; }
    // The dialog under it may have made this one inert; focus cannot move in until it is not.
    inerted = inerted.filter((el) => !el.contains(dlg) || (el.inert = false));
    dlg.setAttribute('popover', 'manual');
    dlg.show();
    NDS.topLayer(dlg, true);
    // After the open slide: its frames would wait on the restyle.
    NDS.onTransitionEnd(dlg, syncInert, { fallbackMs: NDS.transitionSpeed() + 150 });
  }

  function close(dlg) {
    hideMenus(dlg);
    NDS.topLayer(dlg, false);
    if (dlg.open) dlg.close();
    const i = open.indexOf(dlg);
    if (i < 0) return;
    open.splice(i, 1);
    dlg.removeAttribute('popover');
    dlg.removeAttribute('data-nds-modal');
    dlg.removeAttribute('data-nds-under');
    mark();
    if (POPOVER) syncInert();
    if (!open.length) {
      backdropUnder(false);
      NDS.scrollLock.unlock();
    }
  }

  // Down and up both outside: a text selection dragged out of the box is not a dismiss.
  function onOutside(dlg, fn, signal) {
    let down = false;
    document.addEventListener('pointerdown', (e) => { down = away(dlg, e); }, { capture: true, signal });
    document.addEventListener('click', (e) => { if (down && away(dlg, e)) fn(); }, { capture: true, signal });
  }

  NDS.dialog = {
    show,
    close,
    top,
    hideMenus,
    onOutside
  };
})();
