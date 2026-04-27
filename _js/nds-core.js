// NDS Core — shared namespace and utilities
(() => {
    'use strict';

    window.NDS = window.NDS || {};

    // ── Language & Direction (cached) ────────────────────────────────
    // BCP 47: 'ar', 'ar-SA', 'ar-EG' → 'ar'  |  'en', 'en-US' → 'en'
    // Usage: NDS.lang  → 'ar' | 'en' | ...
    //        NDS.isArabic → true/false
    //        NDS.isRTL → true/false
    // ── Breakpoints (matches _mixins.scss) ─────────────────────────
    // Usage: NDS.breakpoints.desktop → '(min-width: 960px)'
    //        window.matchMedia(NDS.breakpoints.mobile).matches
    NDS.breakpoints = {
        mobile:          '(max-width: 599px)',
        tablet:          '(min-width: 600px)',
        'tablet-max':    '(max-width: 960px)',
        desktop:         '(min-width: 960px)',
        'desktop-max':   '(max-width: 1280px)',
        'large-desktop': '(min-width: 1280px)'
    };

    const _lang = (document.documentElement.lang || 'en').split('-')[0].toLowerCase();
    NDS.lang = _lang;
    NDS.isArabic = _lang === 'ar';
    // Live getter so runtime direction toggles (e.g. language switcher) stay correct.
    Object.defineProperty(NDS, 'isRTL', {
        get() { return document.documentElement.dir === 'rtl'; }
    });

    // ── Debounce ─────────────────────────────────────────────────────
    // Usage: const fn = NDS.debounce(handler, 150)
    NDS.debounce = (fn, ms) => {
        let t;
        return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
    };

    // ── RAF Throttle ─────────────────────────────────────────────────
    // Single-in-flight requestAnimationFrame throttle for scroll/mousemove handlers
    // Usage: el.addEventListener('scroll', NDS.rafThrottle(handler), { passive: true })
    NDS.rafThrottle = fn => {
        let ticking = false;
        return (...args) => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => { ticking = false; fn(...args); });
        };
    };

    // ── Window Resize Bus ────────────────────────────────────────────
    // Single listener, 150ms debounce, fan-out to subscribers
    // Usage: const off = NDS.onResize(handler)
    NDS.onResize = (() => {
        const subs = [];
        let t;
        window.addEventListener('resize', () => {
            clearTimeout(t);
            t = setTimeout(() => { for (let i = 0; i < subs.length; i++) subs[i](); }, 150);
        }, { passive: true });

        return fn => {
            subs.push(fn);
            return () => { const i = subs.indexOf(fn); if (i !== -1) subs.splice(i, 1); };
        };
    })();

    // ── Element Resize Observer ──────────────────────────────────────
    // Single ResizeObserver, multiple elements
    // Usage: const off = NDS.onElementResize(el, handler)
    NDS.onElementResize = (() => {
        const map = new Map();
        const ro = typeof ResizeObserver !== 'undefined'
            ? new ResizeObserver(entries => {
                for (let i = 0; i < entries.length; i++) {
                    const fns = map.get(entries[i].target);
                    if (fns) fns.forEach(fn => fn(entries[i]));
                }
            })
            : null;

        return (el, fn) => {
            if (!ro) return () => {};
            let fns = map.get(el);
            if (!fns) { fns = new Set(); map.set(el, fns); ro.observe(el); }
            fns.add(fn);
            return () => {
                fns.delete(fn);
                if (!fns.size) { map.delete(el); ro.unobserve(el); }
            };
        };
    })();

    // ── Intersection Observer Pool ─────────────────────────────────
    // Shared viewport IntersectionObservers, grouped by options
    // Usage: const off = NDS.onIntersect(el, handler, { threshold, rootMargin })
    NDS.onIntersect = (() => {
        const pool = new Map(); // key → { io, map }

        return (el, fn, opts = {}) => {
            if (typeof IntersectionObserver === 'undefined') return () => {};
            const key = (opts.threshold || 0) + '|' + (opts.rootMargin || '0px');
            let group = pool.get(key);
            if (!group) {
                const map = new Map();
                const io = new IntersectionObserver(entries => {
                    for (let i = 0; i < entries.length; i++) {
                        const cb = map.get(entries[i].target);
                        if (cb) cb(entries[i]);
                    }
                }, { threshold: opts.threshold || 0, rootMargin: opts.rootMargin || '0px' });
                group = { io, map };
                pool.set(key, group);
            }
            group.map.set(el, fn);
            group.io.observe(el);
            return () => {
                group.map.delete(el);
                group.io.unobserve(el);
                if (!group.map.size) { group.io.disconnect(); pool.delete(key); }
            };
        };
    })();

    // ── DOM Mutation Bus ─────────────────────────────────────────────
    // Single MutationObserver on body, selector-based dispatch
    // Usage: NDS.onDOMAdd('.selector', nodes => { ... })
    //        NDS.onDOMRemove('.selector', nodes => { ... })
    //        NDS.onChildrenChange('.selector', parents => { ... })
    //          Fires when a matched element's direct children change. Matches
    //          on mutation.target (the parent, still attached), so selectors
    //          with '>' combinators work and child removals are detected
    //          cleanly (removed nodes have parentNode === null by callback time).
    const domBus = (() => {
        const addSubs = [], removeSubs = [], childrenSubs = [];
        let started = false;

        function dispatch(nodes, subs) {
            for (let s = 0; s < subs.length; s++) {
                const hits = [];
                for (let i = 0; i < nodes.length; i++) {
                    if (nodes[i].matches(subs[s].sel)) hits.push(nodes[i]);
                    const ch = nodes[i].querySelectorAll(subs[s].sel);
                    for (let c = 0; c < ch.length; c++) hits.push(ch[c]);
                }
                if (hits.length) subs[s].fn(hits);
            }
        }

        function dispatchParents(parents, subs) {
            for (let s = 0; s < subs.length; s++) {
                const hits = [];
                parents.forEach(p => { if (p.matches(subs[s].sel)) hits.push(p); });
                if (hits.length) subs[s].fn(hits);
            }
        }

        function start() {
            if (started || !document.body) return;
            started = true;
            new MutationObserver(mutations => {
                const added = [], removed = [], parents = new Set();
                for (let i = 0; i < mutations.length; i++) {
                    const m = mutations[i];
                    if (m.target && m.target.nodeType === 1) parents.add(m.target);
                    for (let j = 0; j < m.addedNodes.length; j++)
                        if (m.addedNodes[j].nodeType === 1) added.push(m.addedNodes[j]);
                    for (let j = 0; j < m.removedNodes.length; j++)
                        if (m.removedNodes[j].nodeType === 1) removed.push(m.removedNodes[j]);
                }
                // A reparent (e.g. NDS.portal → document.body.appendChild) emits
                // both a remove and an add for the same node in one batch. Treat
                // that as a move, not a lifecycle change — drop those nodes from
                // both lists so subscribers (and any descendants matching their
                // selectors) keep their instances, listeners, and internal state
                // across portals and similar reparents.
                let realAdded = added, realRemoved = removed;
                if (added.length && removed.length) {
                    const addedSet = new Set(added), removedSet = new Set(removed);
                    realAdded = added.filter(n => !removedSet.has(n));
                    realRemoved = removed.filter(n => !addedSet.has(n));
                }
                // Removes before adds: for unrelated mutations batched together,
                // tearing down old state before constructing new state is safer.
                if (realRemoved.length) dispatch(realRemoved, removeSubs);
                if (realAdded.length) dispatch(realAdded, addSubs);
                if (parents.size && childrenSubs.length) dispatchParents(parents, childrenSubs);
            }).observe(document.body, { childList: true, subtree: true });
        }

        return { addSubs, removeSubs, childrenSubs, start };
    })();

    NDS.onDOMAdd         = (sel, fn) => { domBus.addSubs.push({ sel, fn });      domBus.start(); };
    NDS.onDOMRemove      = (sel, fn) => { domBus.removeSubs.push({ sel, fn });   domBus.start(); };
    NDS.onChildrenChange = (sel, fn) => { domBus.childrenSubs.push({ sel, fn }); domBus.start(); };

    // ── Attribute Change Observer ────────────────────────────────────
    // Single MutationObserver on body for attribute changes, selector-based dispatch
    // Usage: NDS.onAttrChange('.nds-progress-circle', ['data-value', 'data-num'], els => { ... })
    const attrSubs = [];
    NDS.onAttrChange = (sel, attrs, fn) => {
        if (attrSubs.some(s => s.sel === sel && s.fn === fn)) return;
        attrSubs.push({ sel, attrs: new Set(attrs), fn });
        if (attrSubs.length === 1 && document.body) {
            new MutationObserver(mutations => {
                const changed = new Map();
                for (let i = 0; i < mutations.length; i++) {
                    const el = mutations[i].target;
                    if (!changed.has(el)) changed.set(el, new Set());
                    changed.get(el).add(mutations[i].attributeName);
                }
                for (let s = 0; s < attrSubs.length; s++) {
                    const hits = [];
                    changed.forEach((attrs, el) => {
                        if (!el.matches(attrSubs[s].sel)) return;
                        for (const a of attrs) { if (attrSubs[s].attrs.has(a)) { hits.push(el); break; } }
                    });
                    if (hits.length) attrSubs[s].fn(hits);
                }
            }).observe(document.body, { attributes: true, subtree: true });
        }
    };

    // ── State Management (data-state) ─────────────────────────────────
    // Space-separated token management for data-state attribute
    // Usage: NDS.State.add(el, 'open', 'active')
    //        NDS.State.remove(el, 'open')
    //        NDS.State.has(el, 'open')     → true/false
    //        NDS.State.set(el, 'open')     → replaces all tokens
    //        NDS.State.get(el)            → 'open active' (raw string)
    //        NDS.State.clear(el)           → removes data-state entirely
    //        NDS.State.apply(el, ...states) → fire onAdd hooks for existing states (init-time)
    //        NDS.State.onAdd(state, scope, fn)    → register hook: fn(el) fires when state added on el matching scope
    //        NDS.State.onRemove(state, scope, fn) → register hook: fn(el) fires when state removed
    NDS.State = (() => {
        const _onAdd = {};    // { 'disabled': [{ scope, fn }, ...] }
        const _onRemove = {};

        function _fire(hooks, token, el) {
            const fns = hooks[token];
            if (!fns) return;
            for (let i = 0; i < fns.length; i++) {
                if (el.matches(fns[i].scope)) fns[i].fn(el, token);
            }
        }

        const parse = el => new Set((el.getAttribute('data-state') || '').split(/\s+/).filter(Boolean));

        const add = (el, ...states) => {
            if (!el) return;
            const cur = parse(el);
            const added = [];
            for (let i = 0; i < states.length; i++) {
                if (!cur.has(states[i])) { cur.add(states[i]); added.push(states[i]); }
            }
            if (!added.length) return;
            el.setAttribute('data-state', [...cur].join(' '));
            for (let i = 0; i < added.length; i++) _fire(_onAdd, added[i], el);
        };

        const remove = (el, ...states) => {
            if (!el) return;
            const cur = parse(el);
            const removed = [];
            for (let i = 0; i < states.length; i++) {
                if (cur.has(states[i])) { cur.delete(states[i]); removed.push(states[i]); }
            }
            if (!removed.length) return;
            cur.size ? el.setAttribute('data-state', [...cur].join(' '))
                     : el.removeAttribute('data-state');
            for (let i = 0; i < removed.length; i++) _fire(_onRemove, removed[i], el);
        };

        const has = (el, state) => el ? parse(el).has(state) : false;

        const get = el => el ? (el.getAttribute('data-state') || '') : '';

        const set = (el, ...states) => {
            if (!el) return;
            states.length ? el.setAttribute('data-state', states.join(' '))
                          : el.removeAttribute('data-state');
        };

        const clear = el => { if (el) el.removeAttribute('data-state'); };

        const apply = (el, ...states) => {
            if (!el) return;
            const cur = parse(el);
            for (let i = 0; i < states.length; i++) {
                if (cur.has(states[i])) _fire(_onAdd, states[i], el);
            }
        };

        const onAdd = (state, scope, fn) => {
            (_onAdd[state] || (_onAdd[state] = [])).push({ scope, fn });
        };

        const onRemove = (state, scope, fn) => {
            (_onRemove[state] || (_onRemove[state] = [])).push({ scope, fn });
        };

        return { parse, add, remove, has, get, set, clear, apply, onAdd, onRemove };
    })();

    // ── Status Management (data-status) ─────────────────────────────
    // Single-value management for data-status attribute
    // Usage: NDS.Status.set(el, 'error')
    //        NDS.Status.get(el)            → 'error' | ''
    //        NDS.Status.clear(el)          → removes data-status
    NDS.Status = {
        set: (el, status) => { if (el && status) el.setAttribute('data-status', status); },
        get: (el) => el ? (el.getAttribute('data-status') || '') : '',
        clear: (el) => { if (el) el.removeAttribute('data-status'); }
    };

    // ── HTML Escape ──────────────────────────────────────────────────
    // Escape a string for safe insertion into an HTML context (innerHTML, template literals).
    // Uses the browser's textContent serializer so every edge case the parser cares about
    // (quotes, angle brackets, entities, mixed charsets) is handled by the engine itself —
    // no regex-based escape can match that coverage.
    // Usage: el.innerHTML = `<span>${NDS.escapeHtml(userValue)}</span>`
    NDS.escapeHtml = (str) => {
        if (str == null) return '';
        const div = document.createElement('div');
        div.textContent = String(str);
        return div.innerHTML;
    };

    // ── Unique ID ─────────────────────────────────────────────────────
    // Short collision-resistant ID for DOM-scoped needs (input names,
    // aria-controls targets, per-upload file handles). Uses crypto.randomUUID
    // when available for stronger uniqueness; falls back to time + Math.random
    // otherwise. Optional prefix keeps IDs grep-friendly when inspected.
    // Usage: NDS.uniqueId()         → 'c9d7...' or '1745232...nt3m42'
    //        NDS.uniqueId('file-')  → 'file-c9d7...'
    NDS.uniqueId = (prefix = '') => {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
            return prefix + crypto.randomUUID();
        }
        return prefix + Date.now() + '_' + Math.random().toString(36).substring(2, 11);
    };

    // ── Local-Storage TTL Cache ────────────────────────────────────────
    // Wraps localStorage with a JSON `{value, expires}` envelope. Getter
    // returns the cached value when fresh, `null` on miss / parse error /
    // expiry (stale entries are evicted on read). Setter stamps
    // `Date.now() + minutes * 60 * 1000`. All storage operations are
    // try/catch'd so callers never have to handle quota / disabled-storage
    // exceptions. Keys are namespaced under an `nds_` prefix so the
    // cache shares the origin's localStorage cleanly with non-NDS code.
    //
    // Cache safety: callers are responsible for treating cached values as
    // potentially-untrusted (any same-origin script can write to
    // localStorage). Store primitive values, not pre-rendered HTML; render
    // imperatively at the consumer. See `_js/nds-cityWeather.js` for the
    // canonical pattern.
    //
    // Usage:
    //   NDS.cache.set('weather_v2_ar_24.71', { desc, temp, icon }, 15);
    //   const cached = NDS.cache.get('weather_v2_ar_24.71');
    //   if (cached) renderWeather(el, cached);
    //   NDS.cache.clear('weather_v2_ar_24.71'); // optional manual eviction
    NDS.cache = (() => {
        const PREFIX = 'nds_';
        return {
            get(key) {
                try {
                    const data = localStorage.getItem(PREFIX + key);
                    if (!data) return null;
                    const parsed = JSON.parse(data);
                    if (Date.now() < parsed.expires) return parsed.value;
                    localStorage.removeItem(PREFIX + key);
                } catch {}
                return null;
            },
            set(key, value, minutes) {
                try {
                    localStorage.setItem(PREFIX + key, JSON.stringify({
                        value,
                        expires: Date.now() + (minutes * 60 * 1000)
                    }));
                } catch {}
            },
            clear(key) {
                try { localStorage.removeItem(PREFIX + key); } catch {}
            }
        };
    })();

    // ── Outside-scroll Close Helper ────────────────────────────────────
    // Capture-phase document scroll listener that invokes `onClose` when the
    // scroll event originates outside `scopeEl`. Scrolls inside scopeEl
    // (e.g. a scrollable dropmenu panel) are ignored. Returns an unsubscribe
    // handle the caller stores for later removal — mirrors the NDS.on*
    // subscription shape so teardown is uniform across helpers.
    // Usage: const off = NDS.onOutsideScroll(this.menu, () => this.close());
    //        // later: off();
    NDS.onOutsideScroll = (scopeEl, onClose) => {
        const handler = (e) => {
            if (e?.target?.nodeType && scopeEl.contains(e.target)) return;
            onClose();
        };
        document.addEventListener('scroll', handler, { capture: true, passive: true });
        return () => document.removeEventListener('scroll', handler, { capture: true });
    };

    // ── Portal-Aware DOM Lookup ────────────────────────────────────────
    // When a `.nds-dropmenu-menu` is portaled to <body>, its descendants
    // are no longer reachable through the original wrapper's DOM tree.
    // These helpers bridge that gap using the `_ownerDropmenu` backref
    // dropmenu sets on every menu.
    //
    //   NDS.closest(el, sel)       — like el.closest, but if `el` lives
    //                                inside a portaled menu it falls back
    //                                to the menu's owner wrapper and
    //                                continues from there.
    //   NDS.queryAll(root, sel)    — like root.querySelectorAll, but also
    //                                searches inside any portaled menu
    //                                whose owner wrapper is a descendant
    //                                of `root`.
    //   NDS.querySelector(root, sel) — first match using queryAll order.

    NDS.closest = (el, selector) => {
        if (!el) return null;
        const direct = el.closest(selector);
        if (direct) return direct;
        const menu = el.closest('.nds-dropmenu-menu');
        if (menu && menu._ownerDropmenu) {
            return menu._ownerDropmenu.closest(selector);
        }
        return null;
    };

    NDS.queryAll = (root, selector) => {
        if (!root) return [];
        const set = new Set();
        root.querySelectorAll(selector).forEach(el => set.add(el));
        if (document.body) {
            const portaled = document.body.querySelectorAll(':scope > .nds-dropmenu-menu');
            for (let i = 0; i < portaled.length; i++) {
                const menu = portaled[i];
                const owner = menu._ownerDropmenu;
                if (!owner || !root.contains(owner)) continue;
                if (menu.matches(selector)) set.add(menu);
                menu.querySelectorAll(selector).forEach(el => set.add(el));
            }
        }
        return Array.from(set);
    };

    NDS.querySelector = (root, selector) => {
        if (!root) return null;
        const direct = root.querySelector(selector);
        if (direct) return direct;
        if (document.body) {
            const portaled = document.body.querySelectorAll(':scope > .nds-dropmenu-menu');
            for (let i = 0; i < portaled.length; i++) {
                const menu = portaled[i];
                const owner = menu._ownerDropmenu;
                if (!owner || !root.contains(owner)) continue;
                if (menu.matches(selector)) return menu;
                const found = menu.querySelector(selector);
                if (found) return found;
            }
        }
        return null;
    };

    // ── Portal / Containing-Block Detection ────────────────────────────
    // A `position: fixed` element resolves `top`/`left` against the nearest
    // ancestor that establishes a containing block — and is trapped inside
    // the nearest stacking-context ancestor. The CSS spec lists many
    // properties that establish either; the most common offenders we hit
    // in this codebase are `container-type: inline-size` (on
    // `.nds-section-wrapper`) and `isolation: isolate` (on
    // `.nds-hero-section.nds-sub`). Returns true if any ancestor would
    // trap the element.
    NDS.needsPortal = (el) => {
        let n = el.parentElement;
        while (n && n !== document.documentElement) {
            const cs = getComputedStyle(n);
            const wc = cs.willChange || '';
            const cn = cs.contain || '';
            const ct = cs.containerType || '';
            if (cs.transform !== 'none' ||
                cs.perspective !== 'none' ||
                cs.filter !== 'none' ||
                (cs.backdropFilter && cs.backdropFilter !== 'none') ||
                (cs.webkitBackdropFilter && cs.webkitBackdropFilter !== 'none') ||
                cs.clipPath !== 'none' ||
                cs.contentVisibility === 'auto' ||
                cs.isolation === 'isolate' ||
                /\b(transform|filter|perspective)\b/.test(wc) ||
                /\b(paint|layout|strict|content)\b/.test(cn) ||
                /\b(inline-size|size)\b/.test(ct)) {
                return true;
            }
            n = n.parentElement;
        }
        return false;
    };

    // Move `el` to <body> when an ancestor would trap it; no-op otherwise.
    // Records the original parent + next-sibling on the element so unportal
    // can restore them. `opts.snapshotVars` lets callers preserve custom
    // properties that consumers set on the wrapper (e.g.
    // `--dropmenu-min-width: 250px` on `.nds-filter`) — those values are
    // read from the inherited cascade BEFORE the move and re-applied as
    // inline styles after, so the visual remains identical.
    // `opts.scopeClasses` accepts class tokens that get added to `el` on
    // portal (and removed on unportal). Authors use these to mirror parent
    // context — e.g. `.nds-pagination-ellipsis .nds-dropmenu-menu` styles
    // can also target `.nds-dropmenu-menu.nds-pagination-ellipsis` so the
    // visual survives the move.
    // Usage: NDS.portal(menu, { snapshotVars: ['--menu-padding'], scopeClasses: ['nds-pagination-ellipsis'] });
    //        NDS.unportal(menu); // later
    NDS.portal = (el, opts = {}) => {
        if (el._ndsPortal) return; // already portaled
        if (!NDS.needsPortal(el)) return;
        const snap = {};
        const vars = opts.snapshotVars;
        if (vars && vars.length) {
            const cs = getComputedStyle(el);
            for (let i = 0; i < vars.length; i++) {
                const val = cs.getPropertyValue(vars[i]).trim();
                if (val) snap[vars[i]] = val;
            }
        }
        const setProps = [];
        const addedClasses = [];
        el._ndsPortal = {
            parent: el.parentNode,
            nextSibling: el.nextSibling,
            setProps,
            addedClasses,
        };
        document.body.appendChild(el);
        for (const k in snap) {
            el.style.setProperty(k, snap[k]);
            setProps.push(k);
        }
        const scopes = opts.scopeClasses;
        if (scopes && scopes.length) {
            for (let i = 0; i < scopes.length; i++) {
                const cls = scopes[i];
                if (cls && !el.classList.contains(cls)) {
                    el.classList.add(cls);
                    addedClasses.push(cls);
                }
            }
        }
        // Force a style/layout flush — Safari sometimes skips style recalc
        // when an element is reparented while display:none/hidden.
        void el.offsetHeight;
    };

    NDS.unportal = (el) => {
        const state = el._ndsPortal;
        if (!state) return;
        if (state.nextSibling && state.nextSibling.parentNode === state.parent) {
            state.parent.insertBefore(el, state.nextSibling);
        } else {
            state.parent.appendChild(el);
        }
        for (let i = 0; i < state.setProps.length; i++) {
            el.style.removeProperty(state.setProps[i]);
        }
        if (state.addedClasses) {
            for (let i = 0; i < state.addedClasses.length; i++) {
                el.classList.remove(state.addedClasses[i]);
            }
        }
        delete el._ndsPortal;
    };

    // ── Place `position: fixed` element at viewport coords ─────────────
    // Writes `top`/`left` then measures and corrects. The CSS spec says
    // top/left on a `position: fixed` element resolve against the
    // viewport — but only when no ancestor establishes a containing block.
    // When one does (transform, filter, container-type, etc.), the values
    // resolve against that ancestor instead, leaving the element offset.
    // The set of triggering properties varies per engine (Safari notably
    // honors `container-type: inline-size` strictly), so a static heuristic
    // misfires. Reading the actual rect after the write reveals any
    // discrepancy; subtracting it lands the element at the intended
    // viewport coords across engines.
    // The transform back-out handles in-flight slide animations on the
    // element itself (e.g. dropmenu's opening translateY).
    // Usage: NDS.placeFixed(menu, top, leftPx);
    NDS.placeFixed = (el, top, left) => {
        el.style.top = top + 'px';
        el.style.left = left + 'px';
        const r = el.getBoundingClientRect();
        const tm = getComputedStyle(el).transform;
        let tx = 0, ty = 0;
        if (tm && tm !== 'none') {
            const m = tm.match(/matrix\(([^)]+)\)/);
            if (m) {
                const parts = m[1].split(',');
                tx = parseFloat(parts[4]) || 0;
                ty = parseFloat(parts[5]) || 0;
            }
        }
        const dx = (r.left - tx) - left;
        const dy = (r.top  - ty) - top;
        if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
            el.style.top  = (top  - dy) + 'px';
            el.style.left = (left - dx) + 'px';
        }
    };

    // ── Viewport Flip-Position Measurement ─────────────────────────────
    // Measures available space around a trigger so popup-like components
    // (dropmenus, tooltips, date pickers, custom selects) can decide
    // whether their menu fits below the trigger or should flip above.
    // Returns raw measurements only — the caller computes its own flipUp
    // heuristic (e.g. `spaceBelow < menuRect.height`) and writes final
    // top/left styles so each component keeps its own arrow offsets,
    // RTL clamp, and gap conventions.
    //
    // When `respectNav` is true (default), treats the sticky `.nds-main-nav`
    // bottom edge + `navGap` as the top viewport boundary so menus can't
    // open behind it. Pass `respectNav: false` for components inside forms
    // or other contexts where the nav overlap doesn't apply.
    //
    // Usage: const p = NDS.flipPosition(trigger, menu);
    //        const flipUp = p.spaceBelow < p.menuRect.height && p.spaceAbove > p.spaceBelow;
    //        const top = flipUp ? p.triggerRect.top - p.menuRect.height - 4 : p.triggerRect.bottom + 4;
    NDS.flipPosition = (trigger, menuEl, opts = {}) => {
        const { respectNav = true, navGap = 16 } = opts;
        const triggerRect = trigger.getBoundingClientRect();
        const doc = document.documentElement;
        const vw = doc.clientWidth;
        const vh = doc.clientHeight;

        let topEdge = 0;
        if (respectNav) {
            const nav = document.querySelector('.nds-main-nav');
            const navBottom = nav ? nav.getBoundingClientRect().bottom : 0;
            if (navBottom > 0) topEdge = navBottom + navGap;
        }

        const menuRect = menuEl.getBoundingClientRect();
        const spaceBelow = vh - triggerRect.bottom;
        const spaceAbove = triggerRect.top - topEdge;

        return {
            spaceBelow,
            spaceAbove,
            topEdge,
            triggerRect,
            menuRect,
            viewportWidth: vw,
            viewportHeight: vh,
        };
    };

    // ── Lazy Reveal ────────────────────────────────────────────────────
    // Remove hidden from [data-nds-lazy] once DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        const els = document.querySelectorAll('[data-nds-lazy]');
        for (let i = 0; i < els.length; i++) els[i].removeAttribute('hidden');
    });

    // ── Grid Last Row ────────────────────────────────────────────────
    // Marks items in the last row of a grid with .nds-last-row
    // Used by .nds-divided grids to remove bottom borders from the last visual row
    // Usage: NDS.gridLastRow.update()  — re-scan all grids on the page
    //        NDS.gridLastRow.update(container)  — re-scan grids within a container
    NDS.gridLastRow = (() => {
        const SEL = '.nds-divided.nds-grid';
        const CLS = 'nds-last-row';
        let listening = false;

        function scan(container) {
            const grids = container && container.matches?.(SEL)
                ? [container]
                : (container || document).querySelectorAll(SEL);

            for (let g = 0; g < grids.length; g++) {
                const grid = grids[g];
                const items = grid.children;
                for (let i = 0; i < items.length; i++) items[i].classList.remove(CLS);
                if (!items.length) continue;

                // Skip hidden/non-laid-out grids (offsetTop is 0 for all items)
                if (!grid.offsetParent) continue;

                const lastTop = items[items.length - 1].offsetTop;
                for (let i = items.length - 1; i >= 0; i--) {
                    if (items[i].offsetTop === lastTop) {
                        items[i].classList.add(CLS);
                    } else {
                        break;
                    }
                }
            }
        }

        function startListening() {
            if (listening) return;
            listening = true;
            NDS.onResize(() => scan());
        }

        function update(container) {
            scan(container);
            // Start resize listener on first call that finds grids
            if (!listening && document.querySelector(SEL)) startListening();
        }

        document.addEventListener('DOMContentLoaded', () => update());

        return { update };
    })();
})();
