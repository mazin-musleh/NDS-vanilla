/**
 * NDS TOC (Table of Contents)
 * Scrollspy for `.nds-drawer.nds-toc`: sets `data-state="active"` on the
 * <li> whose anchor target is currently at the top of the viewport, and
 * on the clicked link before the scroll settles.
 */

(function () {
    'use strict';

    class NDSToc {
        constructor(toc) {
            this.toc = toc;
            this.populate();
            this.links = Array.from(toc.querySelectorAll('a[href^="#"]'));
            this.entries = this.links
                .map(link => {
                    const id = link.getAttribute('href').slice(1);
                    const target = id ? document.getElementById(id) : null;
                    const li = link.closest('li');
                    return target && li ? { link, li, target } : null;
                })
                .filter(Boolean);

            if (!this.entries.length) return;

            this.active = null;
            this.init();
        }

        // Auto-populate the drawer list from headings in a source container
        // when `data-toc-source` is set. `data-toc-levels` (default "h2,h3,h4")
        // chooses which heading levels to include; missing IDs are slugified
        // from the heading's text so anchors resolve.
        populate() {
            const sourceSel = this.toc.dataset.tocSource;
            if (!sourceSel) return;

            const source = document.querySelector(sourceSel);
            const list = this.toc.querySelector('.nds-drawer-list');
            if (!source || !list) return;

            const levels = (this.toc.dataset.tocLevels || 'h2,h3,h4')
                .split(',').map(s => s.trim()).filter(Boolean);
            const headings = Array.from(source.querySelectorAll(levels.join(',')));
            if (!headings.length) return;

            list.replaceChildren();
            const minLevel = parseInt(headings[0].tagName[1], 10);
            // Stack indexed by depth — stack[0] is the root <ul>, stack[1] is
            // the <ul> nested in the most recent top-level <li>, and so on.
            const stack = [list];

            for (const heading of headings) {
                if (!heading.id) heading.id = this.slugify(heading.textContent);

                const depth = parseInt(heading.tagName[1], 10) - minLevel;
                stack.length = depth + 1;

                if (!stack[depth]) {
                    const parentUl = stack[depth - 1];
                    const parentLi = parentUl && parentUl.lastElementChild;
                    if (!parentLi) continue; // orphan heading — skip
                    const ul = document.createElement('ul');
                    parentLi.appendChild(ul);
                    stack[depth] = ul;
                }

                stack[depth].appendChild(this.buildItem(heading));
            }
        }

        buildItem(heading) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `#${heading.id}`;
            a.className = 'nds-btn nds-subtle nds-indicator';
            const label = document.createElement('span');
            label.className = 'nds-label nds-truncate';
            label.textContent = heading.textContent.trim();
            a.appendChild(label);
            li.appendChild(a);
            return li;
        }

        // Keep Arabic/Latin letters and digits, collapse everything else to '-'.
        slugify(text) {
            return text.trim().toLowerCase()
                .replace(/[^a-z0-9\u0600-\u06FF]+/g, '-')
                .replace(/^-+|-+$/g, '') || 'section';
        }

        init() {
            this.onClick = this.onClick.bind(this);
            this.update = this.update.bind(this);

            // Drop any static active state so the scrollspy is the single source of truth.
            this.entries.forEach(e => {
                NDS.State.remove(e.li, 'active');
                NDS.State.remove(e.link, 'active');
            });

            this.links.forEach(link => link.addEventListener('click', this.onClick));

            // Scroll + resize both change which section is at the top;
            // rafThrottle keeps the scroll handler off the layout thread.
            this._onScroll = NDS.rafThrottle(this.update);
            window.addEventListener('scroll', this._onScroll, { passive: true });
            this._offResize = NDS.onResize(this.update);

            this.update();
            this.toc.setAttribute('data-toc-initialized', 'true');
        }

        // Live nav height + breathing room. scrollspy threshold and click
        // scroll-to share this offset so clicking a link lands on the exact
        // line where the section becomes "active".
        navOffset() {
            const nav = document.querySelector('.nds-main-nav');
            return (nav ? nav.offsetHeight : 0) + 40;
        }

        // Pick the last entry whose section top has crossed the nav band.
        // 1px tolerance absorbs sub-pixel rounding from smooth scroll so a
        // just-landed heading still counts as "reached".
        findActive() {
            const threshold = window.scrollY + this.navOffset() + 1;
            let active = this.entries[0];
            for (const e of this.entries) {
                if (e.target.getBoundingClientRect().top + window.scrollY <= threshold) {
                    active = e;
                } else {
                    break;
                }
            }
            return active;
        }

        setActive(entry) {
            if (this.active === entry) return;
            if (this.active) {
                NDS.State.remove(this.active.li, 'active');
                NDS.State.remove(this.active.link, 'active');
            }
            this.active = entry;
            if (entry) {
                NDS.State.add(entry.li, 'active');
                NDS.State.add(entry.link, 'active');
            }
        }

        update() {
            this.setActive(this.findActive());
        }

        // Click sets the active state immediately, then manually scrolls so
        // the target lands at navOffset below the viewport top.
        onClick(e) {
            const link = e.currentTarget;
            const entry = this.entries.find(x => x.link === link);
            if (!entry) return;

            e.preventDefault();
            this.setActive(entry);

            const top = entry.target.getBoundingClientRect().top + window.scrollY - this.navOffset();
            const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
            history.replaceState(null, '', link.getAttribute('href'));
        }

        destroy() {
            this.links.forEach(link => link.removeEventListener('click', this.onClick));
            if (this._onScroll) window.removeEventListener('scroll', this._onScroll);
            if (this._offResize) this._offResize();
            this.toc.removeAttribute('data-toc-initialized');
        }
    }

    function initializeComponents() {
        document.querySelectorAll('.nds-toc').forEach(toc => {
            if (toc.closest('code, .code-example')) return;
            if (toc.hasAttribute('data-toc-initialized')) return;
            toc._ndsToc = new NDSToc(toc);
        });
    }

    NDS.Toc = {
        init: initializeComponents,
        reinit: initializeComponents,
        create: (el) => { el._ndsToc = new NDSToc(el); return el._ndsToc; }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeComponents);
    } else {
        initializeComponents();
    }
})();
