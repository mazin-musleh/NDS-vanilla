/* NDS.dialog — public surface (internal: the core Modal and Panel share for a <dialog>)
 * Rides: <dialog> show() + popover through NDS.setTopLayer (the top layer, the dim layer); an inert
 *        page, set once the open animation ends. No popover support: showModal()
 * Methods:
 *   NDS.dialog.show(dlg, signal)     open it modal; the first one locks scroll. NDS owns Escape and
 *                                    every click outside it while signal lives
 *   NDS.dialog.close(dlg)            hide its menus and close it; the last one unlocks scroll
 *   NDS.dialog.getTop()              the newest open modal dialog, or undefined
 *   NDS.dialog.hideMenus(dlg)        close the open popovers inside it
 *   NDS.dialog.onOutside(dlg, fn, signal)  fn on a click outside it, while it is the top one
 * Events:
 *   (none — Modal and Panel fire their own)
 * Hooks:
 *   (none — data-nds-modal and data-nds-under are its own stamps, read by the dialog CSS)
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
  let inerted = new Set(); // what this core made inert
  const skip = new Set(['SCRIPT', 'TEMPLATE', 'STYLE', 'LINK', 'NOSCRIPT']);

  const getTop = () => open[open.length - 1];
  const mark = () => open.forEach((dialog, i) => dialog.toggleAttribute('data-nds-under', i < open.length - 1));

  // Every sibling on the way up from the top dialog goes inert; what no longer needs it comes back.
  // Skips what something else made inert.
  function syncInert() {
    const want = new Set();
    for (let node = getTop(); node && node !== document.body && node.parentElement; node = node.parentElement) {
      for (const sib of node.parentElement.children) {
        if (sib !== node && !skip.has(sib.tagName) && (!sib.inert || inerted.has(sib))) want.add(sib);
      }
    }
    inerted.forEach((el) => { if (!want.has(el)) el.inert = false; });
    want.forEach((el) => { el.inert = true; });
    inerted = want;
  }

  // ponytail: Main Navigation, Side Menu and the image viewer still dim through NDS.Backdrop; a dialog
  // above hides that layer. Goes when they move (plans/top-layer.md steps 5–6).
  const setBackdropUnder = (on) => document.querySelector('.nds-backdrop')?.toggleAttribute('data-nds-under', on);

  // A menu inside is a popover of its own: closing the dialog leaves it open in the top layer.
  // Without popover there is none, and Safari 16 throws on the selector.
  // No popover: the menus are plain fixed boxes, so close them through their instance.
  const hideMenus = (dlg) => POPOVER
    ? dlg.querySelectorAll(':popover-open').forEach((popover) => popover.hidePopover())
    : dlg.querySelectorAll('.nds-dropmenu').forEach((dropmenu) => dropmenu.ndsDropmenu?.isOpen && dropmenu.ndsDropmenu.close());

  // The fallback's dim layer is the dialog itself, outside its box; the popover's lets the click through.
  const isOutside = (dlg, e) => {
    if (e.target !== dlg) return !dlg.contains(e.target);
    const rect = dlg.getBoundingClientRect();
    return e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom;
  };
  const isAway = (dlg, e) => getTop() === dlg && isOutside(dlg, e);

  function show(dlg, signal) {
    if (!open.includes(dlg)) {
      if (!open.length) {
        NDS.scrollLock.lock();
        setBackdropUnder(true);
      }
      open.push(dlg);
      mark();
    }
    dlg.setAttribute('data-nds-modal', '');
    // An Escape a control inside stopped short of the component's own handler.
    dlg.addEventListener('cancel', (e) => e.preventDefault(), { signal });
    // Until the page is inert, nothing behind may take a click.
    document.addEventListener('click', (e) => { if (isAway(dlg, e)) { e.preventDefault(); e.stopPropagation(); } }, { capture: true, signal });
    // Re-opened during its fade, it is still open.
    if (dlg.open) return;
    if (!POPOVER) { dlg.showModal(); return; }
    // The dialog under it may have made this one inert; focus cannot move in until it is not.
    inerted.forEach((el) => { if (el.contains(dlg)) { el.inert = false; inerted.delete(el); } });
    dlg.setAttribute('popover', 'manual');
    dlg.show();
    NDS.setTopLayer(dlg, true);
    // After the open slide: its frames would wait on the restyle.
    NDS.onTransitionEnd(dlg, syncInert, { fallbackMs: NDS.transitionSpeed() + 150 });
  }

  function close(dlg) {
    hideMenus(dlg);
    NDS.setTopLayer(dlg, false);
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
      setBackdropUnder(false);
      NDS.scrollLock.unlock();
    }
  }

  // Down and up both outside: a text selection dragged out of the box is not a dismiss.
  function addOutsideListeners(dlg, fn, signal) {
    let down = false;
    document.addEventListener('pointerdown', (e) => { down = isAway(dlg, e); }, { capture: true, signal });
    document.addEventListener('click', (e) => { if (down && isAway(dlg, e)) fn(); }, { capture: true, signal });
  }

  NDS.dialog = {
    show,
    close,
    getTop,
    hideMenus,
    onOutside: addOutsideListeners
  };
})();
