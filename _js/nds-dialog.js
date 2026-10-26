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
 *   data-nds-above   on a [popover] that stays above every dialog (a toast layer): never inert,
 *                    a click on it is not outside, and each dialog shown puts it back on top
 *   (data-nds-modal and data-nds-under are its own stamps, read by the dialog CSS)
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
      for (const sibling of node.parentElement.children) {
        if (sibling !== node && !skip.has(sibling.tagName) && !sibling.hasAttribute('data-nds-above')
          && (!sibling.inert || inerted.has(sibling))) want.add(sibling);
      }
    }
    inerted.forEach((el) => { if (!want.has(el)) el.inert = false; });
    want.forEach((el) => { el.inert = true; });
    inerted = want;
  }

  // ponytail: Main Navigation, Side Menu and the image viewer still dim through NDS.Backdrop; a dialog
  // above hides that layer. Goes when they move to the top layer (plans/top-layer.md: the Main
  // Navigation step was reverted and deferred past v2.0).
  const setBackdropUnder = (on) => document.querySelector('.nds-backdrop')?.toggleAttribute('data-nds-under', on);

  // A menu inside is a popover of its own: closing the dialog leaves it open in the top layer.
  // Without popover there is none, and Safari 16 throws on the selector.
  // No popover: the menus are plain fixed boxes, so close them through their instance.
  const hideMenus = (dialog) => POPOVER
    ? dialog.querySelectorAll(':popover-open').forEach((popover) => popover.hidePopover())
    : dialog.querySelectorAll('.nds-dropmenu').forEach((dropmenu) => dropmenu.ndsDropmenu?.isOpen && dropmenu.ndsDropmenu.close());

  // The fallback's dim layer is the dialog itself, outside its box; the popover's lets the click through.
  const isOutside = (dialog, e) => {
    if (e.target !== dialog) return !dialog.contains(e.target);
    const rect = dialog.getBoundingClientRect();
    return e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom;
  };
  const isAway = (dialog, e) => getTop() === dialog && !e.target.closest?.('[data-nds-above]') && isOutside(dialog, e);

  function show(dialog, signal) {
    if (!open.includes(dialog)) {
      if (!open.length) {
        NDS.scrollLock.lock();
        setBackdropUnder(true);
      }
      open.push(dialog);
      mark();
    }
    dialog.setAttribute('data-nds-modal', '');
    // An Escape a control inside stopped short of the component's own handler.
    dialog.addEventListener('cancel', (e) => e.preventDefault(), { signal });
    // Until the page is inert, nothing behind may take a click.
    document.addEventListener('click', (e) => { if (isAway(dialog, e)) { e.preventDefault(); e.stopPropagation(); } }, { capture: true, signal });
    // Re-opened during its fade, it is still open.
    if (dialog.open) return;
    if (!POPOVER) { dialog.showModal(); return; }
    // The dialog under it may have made this one inert; focus cannot move in until it is not.
    inerted.forEach((el) => { if (el.contains(dialog)) { el.inert = false; inerted.delete(el); } });
    dialog.setAttribute('popover', 'manual');
    dialog.show();
    NDS.setTopLayer(dialog, true);
    // What stays above every dialog goes back on top of this one.
    document.querySelectorAll('[data-nds-above]:popover-open').forEach((layer) => {
      NDS.setTopLayer(layer, false);
      NDS.setTopLayer(layer, true);
    });
    // After the open slide: its frames would wait on the restyle.
    NDS.onTransitionEnd(dialog, syncInert, { fallbackMs: NDS.transitionSpeed() + 150 });
  }

  function close(dialog) {
    hideMenus(dialog);
    NDS.setTopLayer(dialog, false);
    if (dialog.open) dialog.close();
    const i = open.indexOf(dialog);
    if (i < 0) return;
    open.splice(i, 1);
    dialog.removeAttribute('popover');
    dialog.removeAttribute('data-nds-modal');
    dialog.removeAttribute('data-nds-under');
    mark();
    if (POPOVER) syncInert();
    if (!open.length) {
      setBackdropUnder(false);
      NDS.scrollLock.unlock();
    }
  }

  // Down and up both outside: a text selection dragged out of the box is not a dismiss.
  function onOutside(dialog, fn, signal) {
    let down = false;
    document.addEventListener('pointerdown', (e) => { down = isAway(dialog, e); }, { capture: true, signal });
    document.addEventListener('click', (e) => { if (down && isAway(dialog, e)) fn(); }, { capture: true, signal });
  }

  NDS.dialog = {
    show,
    close,
    getTop,
    hideMenus,
    onOutside
  };
})();
