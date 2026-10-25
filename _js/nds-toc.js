/* NDS.Toc — public surface
 * Rides: nds-drawer (the list itself is a .nds-drawer, so expand/collapse and the
 *        responsive open rules come from there)
 * Requires:
 *   .nds-toc:not([data-toc-source]) needs li a[href^="#"] — the TOC has no entries
 *   .nds-toc[data-toc-source] needs .nds-drawer-list — the list is not built
 * Methods:
 *   NDS.Toc.init() / .reinit()   scan + initialize .nds-toc
 *   NDS.Toc.create(el)           instance one table of contents — null when no link has a
 *                                target; the live one if started
 *   NDS.Toc.destroy(el)          tear one down — the NDS.init.destroy entry point
 *   instance.refresh()           re-pick the active entry now
 *   instance.destroy()
 * Events:
 *   (none)
 * Hooks:
 *   data-toc-source   selector of the container to read headings from. Set it and the
 *                     list is BUILT from those headings
 *   data-toc-levels   which levels to include, default "h2,h3,h4"
 * Gotchas:
 *   - With data-toc-source the authored list is REPLACED, and a heading with no id gets
 *     a slug written onto it so the anchor resolves.
 *   - The scrollspy owns the active state: any data-state="active" you author is cleared
 *     at init.
 *   - A link click scrolls manually so the heading lands below the sticky nav, and
 *     replaces the URL hash without a history entry.
 *   - Headings inside a scrolling box (a panel or modal body) track and scroll that box,
 *     with the box's top in place of the nav.
 *   - The instance lives on the element as el.ndsToc.
 */
/**
 * NDS TOC (Table of Contents)
 * Scrollspy for `.nds-drawer.nds-toc`: sets `data-state="active"` on the
 * <li> whose anchor target is currently at the top of the viewport, and
 * on the clicked link before the scroll settles.
 */

(function () {
    'use strict';

    class NdsToc {
        constructor(toc) {
            this._toc = toc;
            this._renderList();
            this._links = Array.from(toc.querySelectorAll('a[href^="#"]'));
            this._entries = this._links
                .map(link => {
                    const id = link.getAttribute('href').slice(1);
                    const target = id ? document.getElementById(id) : null;
                    const item = link.closest('li');
                    return target && item ? { link, li: item, target } : null;
                })
                .filter(Boolean);

            // Stamp even with no entries — the pre-init skeleton (_toc.scss)
            // keys on the stamp and must release either way.
            if (!this._entries.length) {
                toc.setAttribute('data-nds-toc-initialized', 'true');
                return;
            }

            this._active = null;
            this._box = null;
            this._valid = true;
            this.init();
        }

        // Auto-populate the drawer list from headings in a source container
        // when `data-toc-source` is set. `data-toc-levels` (default "h2,h3,h4")
        // chooses which heading levels to include; missing IDs are slugified
        // from the heading's text so anchors resolve.
        _renderList() {
            const sourceSelector = this._toc.dataset.tocSource;
            if (!sourceSelector) return;

            const source = document.querySelector(sourceSelector);
            const list = this._toc.querySelector('.nds-drawer-list');
            if (!source || !list) return;

            const levels = (this._toc.dataset.tocLevels || 'h2,h3,h4')
                .split(',').map(level => level.trim()).filter(Boolean);
            const headings = Array.from(source.querySelectorAll(levels.join(',')));
            if (!headings.length) return;

            list.replaceChildren();
            // Smallest level, not the first heading's: a shallower heading later would go negative and drop the rest.
            const minLevel = Math.min(...headings.map(heading => parseInt(heading.tagName[1], 10)));
            // Stack indexed by depth — stack[0] is the root <ul>, stack[1] is
            // the <ul> nested in the most recent top-level <li>, and so on.
            const stack = [list];

            for (const heading of headings) {
                if (!heading.id) {
                    // Two headings with one text need two ids, or both links go to the first.
                    const base = this._slugify(heading.textContent);
                    let id = base;
                    for (let suffix = 2; document.getElementById(id); suffix++) id = base + '-' + suffix;
                    heading.id = id;
                }

                const depth = parseInt(heading.tagName[1], 10) - minLevel;
                stack.length = depth + 1;

                if (!stack[depth]) {
                    const parentUl = stack[depth - 1];
                    const parentItem = parentUl && parentUl.lastElementChild;
                    if (!parentItem) continue; // orphan heading — skip
                    const ul = document.createElement('ul');
                    parentItem.appendChild(ul);
                    stack[depth] = ul;
                }

                stack[depth].appendChild(this._buildItem(heading));
            }
        }

        _buildItem(heading) {
            const item = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#${heading.id}`;
            link.className = 'nds-btn nds-subtle nds-indicator';
            const label = document.createElement('span');
            label.className = 'nds-label nds-truncate';
            label.textContent = heading.textContent.trim();
            link.appendChild(label);
            item.appendChild(link);
            return item;
        }

        // Keep Arabic/Latin letters and digits, collapse everything else to '-'.
        _slugify(text) {
            return text.trim().toLowerCase()
                .replace(/[^a-z0-9\u0600-\u06FF]+/g, '-')
                .replace(/^-+|-+$/g, '') || 'section';
        }

        init() {
            this._handleClick = this._handleClick.bind(this);
            this.refresh = this.refresh.bind(this);
            this.abortController = new AbortController();
            const { signal } = this.abortController;

            // Drop any static active state so the scrollspy is the single source of truth.
            this._entries.forEach(e => {
                NDS.state.remove(e.li, 'active');
                NDS.state.remove(e.link, 'active');
            });

            this._links.forEach(link => link.addEventListener('click', this._handleClick, { signal }));

            // Scroll + resize both change which section is at the top;
            // throttleToFrame keeps the scroll handler off the layout thread.
            // Capture sees element scrolls too: the headings may scroll in a panel or a modal, not the page.
            const onScroll = NDS.throttleToFrame(this.refresh);
            document.addEventListener('scroll', (e) => {
                const target = e.target;
                if (target === document) this._box = null;
                else if (target.contains(this._entries[0].target)) this._box = target;
                else return;
                onScroll();
            }, { capture: true, passive: true, signal });
            // Pooled handle takes no signal — bridge it onto the same teardown.
            const offResize = NDS.onResize(this.refresh);
            signal.addEventListener('abort', offResize);

            // The first highlight pass measures heading positions
            // (getBoundingClientRect + nav.offsetHeight). Deferring it to an
            // idle slot keeps that read out of the component-init burst, where
            // the DOM is dirty and the read would force a synchronous reflow.
            // The scrollspy itself is already live via the scroll listener.
            NDS.onIdle(() => {
                if (this.abortController.signal.aborted) return; // destroyed while waiting: no marks on a dead instance
                this._box = this._findBox();
                this.refresh();
            }, 2000);
            this._toc.setAttribute('data-nds-toc-initialized', 'true');
        }

        // Top of the scroll area (the live nav height, or the scrolling box's top) + breathing
        // room, in viewport px. Scrollspy threshold and click scroll-to share this offset so
        // clicking a link lands on the exact line where the section becomes "active".
        _getNavOffset() {
            if (this._box) return this._box.getBoundingClientRect().top + 40;
            const nav = document.querySelector('.nds-main-nav');
            return (nav ? nav.offsetHeight : 0) + 40;
        }

        // Nearest ancestor that scrolls the headings, or null for the page. Click-time only:
        // before the first scroll event there is no event target to learn it from.
        _findBox() {
            for (let el = this._entries[0].target.parentElement; el && el !== document.body; el = el.parentElement) {
                const overflow = getComputedStyle(el).overflowY;
                if ((overflow === 'auto' || overflow === 'scroll') && el.scrollHeight > el.clientHeight) return el;
            }
            return null;
        }

        // Pick the last entry whose section top has crossed the nav band.
        // 1px tolerance absorbs sub-pixel rounding from smooth scroll so a
        // just-landed heading still counts as "reached". Null until the first
        // heading is actually reached — on mobile the TOC sits ABOVE the content,
        // so defaulting to entry[0] highlighted a section still off-screen.
        _findActive() {
            const threshold = this._getNavOffset() + 1;
            let active = null;
            for (const e of this._entries) {
                // A hidden heading (an inactive tab) has no box and reads top 0.
                if (!e.target.getClientRects().length) continue;
                if (e.target.getBoundingClientRect().top <= threshold) {
                    active = e;
                } else {
                    break;
                }
            }
            return active;
        }

        _setActive(entry) {
            if (this._active === entry) return;
            if (this._active) {
                NDS.state.remove(this._active.li, 'active');
                NDS.state.remove(this._active.link, 'active');
            }
            this._active = entry;
            if (entry) {
                NDS.state.add(entry.li, 'active');
                NDS.state.add(entry.link, 'active');
            }
        }

        refresh() {
            this._setActive(this._findActive());
        }

        // Click sets the active state immediately, then manually scrolls so
        // the target lands at _getNavOffset below the viewport top.
        _handleClick(e) {
            const link = e.currentTarget;
            const entry = this._entries.find(x => x.link === link);
            if (!entry || !entry.target.getClientRects().length) return;

            e.preventDefault();
            this._setActive(entry);

            this._box = this._findBox();
            const top = entry.target.getBoundingClientRect().top - this._getNavOffset();
            (this._box || window).scrollBy({ top, behavior: NDS.prefersReducedMotion ? 'auto' : 'smooth' });
            history.replaceState(history.state, '', link.getAttribute('href'));   // a router keeps its state
        }

        destroy() {
            this.abortController?.abort();
            // The current-section mark is measured: a re-create marks it again.
            if (this._active) {
                NDS.state.remove(this._active.li, 'active');
                NDS.state.remove(this._active.link, 'active');
            }
            this._toc.removeAttribute('data-nds-toc-initialized');
            // A surviving backref would hand create() this dead instance.
            if (this._toc.ndsToc === this) delete this._toc.ndsToc;
        }
    }

    function setupComponents() {
        document.querySelectorAll('.nds-toc').forEach(toc => {
            if (toc.closest('code')) return;
            // The instance, not the stamp: an empty TOC is stamped to release its skeleton,
            // and builds on a later refresh once its headings arrive.
            if (toc.ndsToc) return;
            const instance = new NdsToc(toc);
            // Expando only on successful construction (sentinel is stamped post-guard by init()).
            if (instance._valid) toc.ndsToc = instance;
        });
    }

    NDS.Toc = {
        init: setupComponents,
        reinit: setupComponents,
        create: (el) => {
            if (el.ndsToc) return el.ndsToc;
            const instance = new NdsToc(el);
            if (!instance._valid) return null;
            el.ndsToc = instance;
            return instance;
        },
        destroy: (el) => el?.ndsToc?.destroy()
    };

})();
